const HEX_SHA256 = /^[0-9a-f]{64}$/;
const HEX_COMMIT = /^[0-9a-f]{40}$/;
const MANAGER_TAG = /^manager-v[0-9]+\.[0-9]+\.[0-9]+(?:[-+][0-9A-Za-z.-]+)?$/;
const QUALIFICATION_TAG =
  /^manager-qualification-v[0-9]+\.[0-9]+\.[0-9]+(?:[-+][0-9A-Za-z.-]+)?$/;
const TEXT_TAG = /^v[0-9]+\.[0-9]+\.[0-9]+$/;

const REQUIRED_CLASSES = ["minimum", "midrange", "datacenter"];
const MANAGER_PAYLOADS = [
  "grid-media-manager-linux-x86_64",
  "grid-media-manager-windows-x86_64.exe",
  "grid-media-manager-release.spdx.json",
];
const MANAGER_MANIFEST = "manager-release.json";
const QUALIFICATION_PAYLOADS = [
  "grid-media-manager-linux-x86_64",
  "grid-media-manager-windows-x86_64.exe",
  "grid-media-manager-qualification.spdx.json",
];
const QUALIFICATION_MANIFEST = "manager-qualification.json";
const TEXT_PAYLOADS = [
  "grid-inference-worker-linux-x64",
  "grid-inference-worker-linux-arm64",
  "grid-inference-worker-macos-arm64.zip",
  "grid-inference-worker-windows-x64.exe",
  "grid-inference-worker-release.spdx.json",
];
const TEXT_CHECKSUMMED = [...TEXT_PAYLOADS, "worker-release.json"];
const TEXT_RELEASE_ASSETS = [...TEXT_CHECKSUMMED, "SHA256SUMS"];

function sameStrings(actual, expected) {
  return (
    Array.isArray(actual) &&
    actual.length === expected.length &&
    actual.every((value, index) => value === expected[index])
  );
}

function parseChecksums(value) {
  if (typeof value !== "string" || !value.endsWith("\n")) return null;
  const result = new Map();
  for (const line of value.trimEnd().split("\n")) {
    const match = line.match(/^([0-9a-f]{64})[ \t]+\*?([A-Za-z0-9._-]+)$/);
    if (!match || result.has(match[2])) return null;
    result.set(match[2], match[1]);
  }
  return result;
}

function validatePayload(
  release,
  manifest,
  checksumText,
  expectedNames,
  manifestName,
  reasons,
) {
  const checksums = parseChecksums(checksumText);
  if (
    !checksums ||
    checksums.size !== expectedNames.length ||
    expectedNames.some((name) => !checksums.has(name))
  ) {
    reasons.push("aggregate checksums do not cover the exact payload");
    return;
  }

  const manifestAssets = manifest?.assets;
  if (
    !Array.isArray(manifestAssets) ||
    manifestAssets.length !== expectedNames.length ||
    manifestAssets.some((item) => !item || typeof item !== "object") ||
    expectedNames.some(
      (name) => !manifestAssets.some((item) => item.name === name),
    )
  ) {
    reasons.push("release manifest does not describe the exact payload");
    return;
  }

  const releaseAssetList = Array.isArray(release?.assets) ? release.assets : [];
  const releaseAssetNames = releaseAssetList.map((asset) => asset?.name);
  const expectedReleaseNames = [...expectedNames, manifestName, "SHA256SUMS"];
  if (
    releaseAssetList.length !== expectedReleaseNames.length ||
    new Set(releaseAssetNames).size !== releaseAssetList.length ||
    expectedReleaseNames.some((name) => !releaseAssetNames.includes(name))
  ) {
    reasons.push("GitHub release assets do not exactly match the media payload");
    return;
  }

  const releaseAssets = new Map(
    releaseAssetList.map((asset) => [asset.name, asset]),
  );
  for (const item of manifestAssets) {
    const releaseAsset = releaseAssets.get(item.name);
    if (
      !HEX_SHA256.test(item.sha256 || "") ||
      !Number.isSafeInteger(item.bytes) ||
      item.bytes <= 0 ||
      checksums.get(item.name) !== item.sha256 ||
      releaseAsset?.digest !== `sha256:${item.sha256}` ||
      releaseAsset?.size !== item.bytes
    ) {
      reasons.push(`payload identity mismatch: ${item.name || "unknown"}`);
    }
  }

  for (const name of [manifestName, "SHA256SUMS"]) {
    const asset = releaseAssets.get(name);
    if (
      !/^sha256:[0-9a-f]{64}$/.test(asset?.digest || "") ||
      !Number.isSafeInteger(asset?.size) ||
      asset.size <= 0
    ) {
      reasons.push(`release metadata asset has no valid identity: ${name}`);
    }
  }
}

function validateTextPayload(release, manifest, checksumText, reasons) {
  const checksums = parseChecksums(checksumText);
  if (
    !checksums ||
    checksums.size !== TEXT_CHECKSUMMED.length ||
    TEXT_CHECKSUMMED.some((name) => !checksums.has(name))
  ) {
    reasons.push("text checksums do not cover the exact release payload");
    return;
  }

  const manifestAssets = manifest?.assets;
  if (
    !Array.isArray(manifestAssets) ||
    manifestAssets.length !== TEXT_PAYLOADS.length ||
    manifestAssets.some((item) => !item || typeof item !== "object") ||
    TEXT_PAYLOADS.some(
      (name) => !manifestAssets.some((item) => item.name === name),
    )
  ) {
    reasons.push("text manifest does not describe the exact release payload");
    return;
  }

  const releaseAssets = Array.isArray(release?.assets) ? release.assets : [];
  const releaseAssetNames = releaseAssets.map((asset) => asset?.name);
  if (
    releaseAssets.length !== TEXT_RELEASE_ASSETS.length ||
    new Set(releaseAssetNames).size !== releaseAssets.length ||
    TEXT_RELEASE_ASSETS.some((name) => !releaseAssetNames.includes(name))
  ) {
    reasons.push("GitHub release assets do not exactly match the text payload");
    return;
  }

  const releaseAssetMap = new Map(
    releaseAssets.map((asset) => [asset.name, asset]),
  );
  for (const item of manifestAssets) {
    const releaseAsset = releaseAssetMap.get(item.name);
    if (
      !HEX_SHA256.test(item.sha256 || "") ||
      !Number.isSafeInteger(item.bytes) ||
      item.bytes <= 0 ||
      checksums.get(item.name) !== item.sha256 ||
      releaseAsset?.digest !== `sha256:${item.sha256}` ||
      releaseAsset?.size !== item.bytes
    ) {
      reasons.push(`text payload identity mismatch: ${item.name || "unknown"}`);
    }
  }

  const manifestReleaseAsset = releaseAssetMap.get("worker-release.json");
  if (
    !HEX_SHA256.test(checksums.get("worker-release.json") || "") ||
    manifestReleaseAsset?.digest !==
      `sha256:${checksums.get("worker-release.json")}` ||
    !Number.isSafeInteger(manifestReleaseAsset?.size) ||
    manifestReleaseAsset.size <= 0
  ) {
    reasons.push("text manifest asset identity does not match its checksum");
  }

  const checksumAsset = releaseAssetMap.get("SHA256SUMS");
  if (
    !/^sha256:[0-9a-f]{64}$/.test(checksumAsset?.digest || "") ||
    !Number.isSafeInteger(checksumAsset?.size) ||
    checksumAsset.size <= 0
  ) {
    reasons.push("text checksum asset has no valid GitHub identity");
  }
}

function validateReleaseEnvelope(release, manifest, tagPattern, reasons) {
  if (release?.draft !== false) reasons.push("release is still a draft");
  if (release?.immutable !== true) reasons.push("release is not immutable");
  if (!tagPattern.test(release?.tag_name || "")) {
    reasons.push("release tag is invalid");
  }
  if (manifest?.tag !== release?.tag_name) {
    reasons.push("manifest tag does not match the release");
  }
  if (!HEX_COMMIT.test(manifest?.commit || "")) {
    reasons.push("manifest commit is invalid");
  }
}

export function assessManagerRelease(release, manifest, checksumText) {
  const reasons = [];
  validateReleaseEnvelope(release, manifest, MANAGER_TAG, reasons);
  if (release?.prerelease !== false)
    reasons.push("manager release is a prerelease");
  if (manifest?.schema !== "aipg-manager-release-v1") {
    reasons.push("manager manifest schema is invalid");
  }

  const profile = manifest?.profile || {};
  if (profile.status !== "active")
    reasons.push("manager profile is not active");
  if (profile.signature_verified !== true) {
    reasons.push("manager profile signature is not verified");
  }
  if (typeof profile.signing_key_id !== "string" || !profile.signing_key_id) {
    reasons.push("manager profile has no signing key");
  }
  if (profile.qualification_scope !== "public") {
    reasons.push("manager profile is not public-qualified");
  }
  if (!sameStrings(profile.qualification_required_classes, REQUIRED_CLASSES)) {
    reasons.push("manager profile is missing required hardware classes");
  }
  if (!HEX_SHA256.test(profile.recipe_onchain_root || "")) {
    reasons.push("manager profile has no valid RecipeVault root");
  }
  if (!HEX_SHA256.test(profile.qualification_manifest_sha256 || "")) {
    reasons.push("manager profile has no valid qualification commitment");
  }
  validatePayload(
    release,
    manifest,
    checksumText,
    MANAGER_PAYLOADS,
    MANAGER_MANIFEST,
    reasons,
  );
  return { ready: reasons.length === 0, reasons };
}

export function assessQualificationRelease(release, manifest, checksumText) {
  const reasons = [];
  validateReleaseEnvelope(release, manifest, QUALIFICATION_TAG, reasons);
  if (release?.prerelease !== true) {
    reasons.push("qualification release is not a prerelease");
  }
  if (manifest?.schema !== "aipg-manager-qualification-v1") {
    reasons.push("qualification manifest schema is invalid");
  }

  const profile = manifest?.profile || {};
  if (profile.status !== "draft")
    reasons.push("qualification profile is not a draft");
  if (profile.signature_verified !== false) {
    reasons.push("qualification profile is unexpectedly signed");
  }
  if (profile.signing_key_id !== null) {
    reasons.push("qualification profile unexpectedly names a signer");
  }
  if (profile.qualification_scope !== "public") {
    reasons.push("qualification scope is not public");
  }
  if (!sameStrings(profile.qualification_required_classes, REQUIRED_CLASSES)) {
    reasons.push("qualification profile is missing required hardware classes");
  }
  if (profile.qualification_manifest_sha256 !== null) {
    reasons.push("qualification profile already claims final evidence");
  }

  const restrictions = manifest?.restrictions || {};
  if (
    Object.keys(restrictions).length !== 3 ||
    restrictions.capability_advertisement !== false ||
    restrictions.grid_enrollment !== false ||
    restrictions.purpose !== "hardware_qualification_only"
  ) {
    reasons.push("qualification restrictions are incomplete");
  }
  validatePayload(
    release,
    manifest,
    checksumText,
    QUALIFICATION_PAYLOADS,
    QUALIFICATION_MANIFEST,
    reasons,
  );
  return { ready: reasons.length === 0, reasons };
}

export function assessTextRelease(release, manifest, checksumText) {
  const reasons = [];
  validateReleaseEnvelope(release, manifest, TEXT_TAG, reasons);
  if (release?.prerelease !== false)
    reasons.push("text release is a prerelease");
  if (manifest?.schema !== "aipg-text-worker-release-v1") {
    reasons.push("text manifest schema is invalid");
  }
  if (
    typeof manifest?.version !== "string" ||
    `v${manifest.version}` !== release?.tag_name
  ) {
    reasons.push("text manifest version does not match the release tag");
  }
  const signing = manifest?.platform_signing || {};
  const macos = signing.macos || {};
  const windows = signing.windows || {};
  if (
    !(
      macos.verified === true &&
      macos.identity === "developer_id_application" &&
      macos.notarized === true &&
      typeof macos.team_id === "string" &&
      macos.team_id
    )
  ) {
    reasons.push("text macOS Developer ID/notarization is not verified");
  }
  if (
    !(
      windows.verified === true &&
      windows.identity === "authenticode" &&
      typeof windows.subject === "string" &&
      windows.subject
    )
  ) {
    reasons.push("text Windows Authenticode is not verified");
  }
  validateTextPayload(release, manifest, checksumText, reasons);
  return { ready: reasons.length === 0, reasons };
}
