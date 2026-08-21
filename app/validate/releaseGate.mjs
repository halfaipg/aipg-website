const REQUIRED_ENDPOINTS = ["assignments", "targeted_probe", "attest"];
const HEX_SHA256 = /^[0-9a-f]{64}$/;
const HEX_COMMIT = /^[0-9a-f]{40}$/;
const VALIDATOR_TAG = /^v[0-9]+\.[0-9]+\.[0-9]+-preview(?:\.[0-9]+)?$/;
const VALIDATOR_PAYLOADS = [
  "aipg-validator-linux-x64.zip",
  "aipg-validator-linux-arm64.zip",
  "aipg-validator-macos-arm64.zip",
  "aipg-validator-windows-x64.zip",
  "aipg-validator-release.spdx.json",
  "install-validator.sh",
];
const VALIDATOR_CHECKSUMMED = [...VALIDATOR_PAYLOADS, "validator-release.json"];
const VALIDATOR_RELEASE_ASSETS = [...VALIDATOR_CHECKSUMMED, "SHA256SUMS"];

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

export function assessValidatorRelease(release, manifest, checksumText) {
  const reasons = [];
  if (release?.draft !== false) reasons.push("release is still a draft");
  if (release?.prerelease !== true) {
    reasons.push("validator preview is not classified as a prerelease");
  }
  if (release?.immutable !== true) reasons.push("release is not immutable");
  if (!VALIDATOR_TAG.test(release?.tag_name || "")) {
    reasons.push("validator preview tag is invalid");
  }
  if (!HEX_COMMIT.test(release?.target_commitish || "")) {
    reasons.push("release target is not an exact commit");
  }

  if (manifest?.schema !== "aipg-validator-release-v1") {
    reasons.push("validator manifest schema is invalid");
  }
  if (manifest?.tag !== release?.tag_name) {
    reasons.push("validator manifest tag does not match the release");
  }
  if (
    typeof manifest?.version !== "string" ||
    !release?.tag_name?.startsWith(`v${manifest.version}-preview`)
  ) {
    reasons.push("validator manifest version does not match the release tag");
  }
  if (
    !HEX_COMMIT.test(manifest?.commit || "") ||
    manifest?.commit !== release?.target_commitish
  ) {
    reasons.push("validator manifest commit does not match the release");
  }

  const signing = manifest?.platform_signing || {};
  if (
    signing.macos?.verified !== true ||
    signing.macos?.identity !== "developer_id_application" ||
    signing.macos?.notarized !== true ||
    typeof signing.macos?.team_id !== "string" ||
    !signing.macos.team_id
  ) {
    reasons.push("macOS Developer ID and notarization are not verified");
  }
  if (
    signing.windows?.verified !== true ||
    signing.windows?.identity !== "authenticode" ||
    typeof signing.windows?.subject !== "string" ||
    !signing.windows.subject
  ) {
    reasons.push("Windows Authenticode identity is not verified");
  }

  const checksums = parseChecksums(checksumText);
  if (
    !checksums ||
    checksums.size !== VALIDATOR_CHECKSUMMED.length ||
    VALIDATOR_CHECKSUMMED.some((name) => !checksums.has(name))
  ) {
    reasons.push("validator checksums do not cover the exact payload");
    return { ready: false, reasons };
  }

  const releaseAssets = Array.isArray(release?.assets) ? release.assets : [];
  const releaseAssetNames = releaseAssets.map((asset) => asset?.name);
  if (
    releaseAssets.length !== VALIDATOR_RELEASE_ASSETS.length ||
    new Set(releaseAssetNames).size !== releaseAssets.length ||
    VALIDATOR_RELEASE_ASSETS.some((name) => !releaseAssetNames.includes(name))
  ) {
    reasons.push(
      "GitHub release assets do not exactly match the validator payload",
    );
    return { ready: false, reasons };
  }

  const manifestAssets = manifest?.assets;
  if (
    !Array.isArray(manifestAssets) ||
    manifestAssets.length !== VALIDATOR_PAYLOADS.length ||
    manifestAssets.some((item) => !item || typeof item !== "object") ||
    VALIDATOR_PAYLOADS.some(
      (name) => !manifestAssets.some((item) => item.name === name),
    )
  ) {
    reasons.push("validator manifest does not describe the exact payload");
    return { ready: false, reasons };
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
      reasons.push(
        `validator payload identity mismatch: ${item.name || "unknown"}`,
      );
    }
  }

  const manifestReleaseAsset = releaseAssetMap.get("validator-release.json");
  if (
    !HEX_SHA256.test(checksums.get("validator-release.json") || "") ||
    manifestReleaseAsset?.digest !==
      `sha256:${checksums.get("validator-release.json")}` ||
    !Number.isSafeInteger(manifestReleaseAsset?.size) ||
    manifestReleaseAsset.size <= 0
  ) {
    reasons.push(
      "validator manifest asset identity does not match its checksum",
    );
  }
  const checksumAsset = releaseAssetMap.get("SHA256SUMS");
  if (
    !/^sha256:[0-9a-f]{64}$/.test(checksumAsset?.digest || "") ||
    !Number.isSafeInteger(checksumAsset?.size) ||
    checksumAsset.size <= 0
  ) {
    reasons.push("validator checksum asset has no valid GitHub identity");
  }

  return { ready: reasons.length === 0, reasons };
}

export function assessValidatorCoreCapability(payload) {
  const reasons = [];
  const features = payload?.features || {};
  const policy = payload?.quorum_policy || {};
  const endpoints = payload?.endpoints || {};

  if (payload?.validator_api_version !== "v1-preview") {
    reasons.push("validator API version is not v1-preview");
  }
  if (payload?.mode !== "shared_quorum_preview") {
    reasons.push("validator mode is not shared_quorum_preview");
  }
  if (payload?.economic_effect !== "none") {
    reasons.push("preview evidence is not explicitly non-economic");
  }
  if (payload?.targeted_probe_enabled !== true) {
    reasons.push("targeted probing is not enabled");
  }

  for (const feature of ["assignments", "targeted_probe", "quorum"]) {
    if (features[feature] !== true) {
      reasons.push(`${feature} capability is not enabled`);
    }
  }
  if (features.validator_rewards !== false) {
    reasons.push("validator rewards are not explicitly disabled");
  }
  if (features.staking_required !== false) {
    reasons.push("validator staking is not explicitly disabled");
  }

  if (policy.threshold !== 3 || policy.target_validators !== 5) {
    reasons.push("quorum policy is not 3-of-5");
  }
  if (typeof policy.operator_independence_proven !== "boolean") {
    reasons.push("operator-independence state is missing");
  }

  for (const endpoint of REQUIRED_ENDPOINTS) {
    const contract = endpoints[endpoint] || {};
    if (
      contract.enabled !== true ||
      contract.auth !== "v2_account_key" ||
      contract.economic_effect !== "none"
    ) {
      reasons.push(`${endpoint} endpoint contract is incomplete`);
    }
  }

  return { ready: reasons.length === 0, reasons };
}
