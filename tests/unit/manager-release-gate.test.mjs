import assert from "node:assert/strict";
import test from "node:test";

import {
  assessManagerRelease,
  assessQualificationRelease,
} from "../../app/run/releaseGate.mjs";

const payloads = {
  qualification: [
    "grid-media-manager-linux-x86_64",
    "grid-media-manager-windows-x86_64.exe",
    "grid-media-manager-qualification.spdx.json",
  ],
  manager: [
    "grid-media-manager-linux-x86_64",
    "grid-media-manager-windows-x86_64.exe",
    "grid-media-manager-release.spdx.json",
  ],
};

function fixture(kind) {
  const isQualification = kind === "qualification";
  const names = payloads[kind];
  const tag = isQualification
    ? "manager-qualification-v0.1.0-preview.1"
    : "manager-v0.1.0";
  const assets = names.map((name, index) => ({
    name,
    sha256: String(index + 1).repeat(64),
    bytes: 100 + index,
  }));
  const release = {
    draft: false,
    prerelease: isQualification,
    immutable: true,
    tag_name: tag,
    assets: [
      ...assets.map((item) => ({
        name: item.name,
        digest: `sha256:${item.sha256}`,
        size: item.bytes,
      })),
      { name: "SHA256SUMS", digest: `sha256:${"a".repeat(64)}`, size: 300 },
      {
        name: isQualification
          ? "manager-qualification.json"
          : "manager-release.json",
        digest: `sha256:${"b".repeat(64)}`,
        size: 1200,
      },
    ],
  };
  const profile = isQualification
    ? {
        status: "draft",
        signature_verified: false,
        signing_key_id: null,
        qualification_scope: "public",
        qualification_required_classes: ["minimum", "midrange", "datacenter"],
        qualification_manifest_sha256: null,
      }
    : {
        status: "active",
        signature_verified: true,
        signing_key_id: "reviewed-release-key",
        qualification_scope: "public",
        qualification_required_classes: ["minimum", "midrange", "datacenter"],
        recipe_onchain_root: "c".repeat(64),
        qualification_manifest_sha256: "d".repeat(64),
      };
  const manifest = {
    schema: isQualification
      ? "aipg-manager-qualification-v1"
      : "aipg-manager-release-v1",
    tag,
    commit: "e".repeat(40),
    profile,
    assets,
    ...(isQualification
      ? {
          restrictions: {
            capability_advertisement: false,
            grid_enrollment: false,
            purpose: "hardware_qualification_only",
          },
        }
      : {}),
  };
  const checksums = `${assets
    .map((item) => `${item.sha256}  ${item.name}`)
    .join("\n")}\n`;
  return { release, manifest, checksums };
}

test("accepts the exact immutable benchmark-only qualification contract", () => {
  const value = fixture("qualification");
  assert.deepEqual(
    assessQualificationRelease(value.release, value.manifest, value.checksums),
    { ready: true, reasons: [] },
  );
});

test("rejects qualification artifacts that can enroll or advertise", () => {
  const value = fixture("qualification");
  value.manifest.restrictions.grid_enrollment = true;
  assert.equal(
    assessQualificationRelease(value.release, value.manifest, value.checksums)
      .ready,
    false,
  );
});

test("rejects a mutable qualification release", () => {
  const value = fixture("qualification");
  value.release.immutable = false;
  const result = assessQualificationRelease(
    value.release,
    value.manifest,
    value.checksums,
  );
  assert.equal(result.ready, false);
  assert.ok(result.reasons.includes("release is not immutable"));
});

test("rejects a release asset whose GitHub digest disagrees", () => {
  const value = fixture("qualification");
  value.release.assets[0].digest = `sha256:${"f".repeat(64)}`;
  assert.equal(
    assessQualificationRelease(value.release, value.manifest, value.checksums)
      .ready,
    false,
  );
});

test("rejects an extra unverified media release asset", () => {
  const value = fixture("qualification");
  value.release.assets.push({
    name: "install-unverified.sh",
    digest: `sha256:${"f".repeat(64)}`,
    size: 10,
  });
  const result = assessQualificationRelease(
    value.release,
    value.manifest,
    value.checksums,
  );
  assert.equal(result.ready, false);
  assert.ok(
    result.reasons.includes(
      "GitHub release assets do not exactly match the media payload",
    ),
  );
});

test("rejects media metadata without a valid GitHub identity", () => {
  const value = fixture("manager");
  const manifest = value.release.assets.find(
    (asset) => asset.name === "manager-release.json",
  );
  manifest.digest = null;
  const result = assessManagerRelease(
    value.release,
    value.manifest,
    value.checksums,
  );
  assert.equal(result.ready, false);
  assert.ok(
    result.reasons.includes(
      "release metadata asset has no valid identity: manager-release.json",
    ),
  );
});

test("accepts only an immutable signed and fully-qualified manager contract", () => {
  const value = fixture("manager");
  assert.deepEqual(
    assessManagerRelease(value.release, value.manifest, value.checksums),
    { ready: true, reasons: [] },
  );

  value.manifest.profile.signature_verified = false;
  assert.equal(
    assessManagerRelease(value.release, value.manifest, value.checksums).ready,
    false,
  );
});
