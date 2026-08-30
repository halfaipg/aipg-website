import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import {
  assessTextRelease,
  assessTextReleaseAvailability,
} from "../../app/run/releaseGate.mjs";

const basePayloadNames = [
  "grid-inference-worker-linux-x64",
  "grid-inference-worker-linux-arm64",
  "grid-inference-worker-macos-arm64.zip",
  "grid-inference-worker-windows-x64.exe",
  "grid-inference-worker-release.spdx.json",
];

test("the text release builder exposes the verified installer asset", () => {
  const source = fs.readFileSync("app/run/page.js", "utf8");
  const textBuilder = source.slice(
    source.indexOf("async function getTextRelease()"),
    source.indexOf("async function getOperatorOpportunities()"),
  );
  const managerBuilder = source.slice(
    source.indexOf("async function getManagerRelease()"),
    source.indexOf("async function getManagerQualificationRelease()"),
  );

  assert.match(textBuilder, /installer: asset\("install-worker\.sh"\)/);
  assert.doesNotMatch(managerBuilder, /installer:/);
});

function fixture({ version = "0.3.5", installer = false } = {}) {
  const payloadNames = installer
    ? [...basePayloadNames, "install-worker.sh"]
    : basePayloadNames;
  const payloads = payloadNames.map((name, index) => ({
    name,
    sha256: String(index + 1).repeat(64),
    bytes: 100 + index,
  }));
  const manifestChecksum = "a".repeat(64);
  const checksumDigest = "b".repeat(64);
  const release = {
    draft: false,
    prerelease: false,
    immutable: true,
    tag_name: `v${version}`,
    resolved_tag_commit: "c".repeat(40),
    assets: [
      ...payloads.map((item) => ({
        name: item.name,
        digest: `sha256:${item.sha256}`,
        size: item.bytes,
      })),
      {
        name: "worker-release.json",
        digest: `sha256:${manifestChecksum}`,
        size: 1200,
      },
      {
        name: "SHA256SUMS",
        digest: `sha256:${checksumDigest}`,
        size: 700,
      },
    ],
  };
  const manifest = {
    schema: "aipg-text-worker-release-v1",
    tag: `v${version}`,
    version,
    commit: "c".repeat(40),
    platform_signing: {
      macos: {
        verified: true,
        identity: "developer_id_application",
        notarized: true,
        team_id: "TEAM123456",
      },
      windows: {
        verified: true,
        identity: "authenticode",
        subject: "AI Power Grid",
      },
    },
    assets: payloads,
  };
  const checksums = `${[
    ...payloads.map((item) => `${item.sha256}  ${item.name}`),
    `${manifestChecksum}  worker-release.json`,
  ].join("\n")}\n`;
  return { release, manifest, checksums };
}

test("accepts the exact immutable text-worker release contract", () => {
  const value = fixture();
  assert.deepEqual(
    assessTextRelease(value.release, value.manifest, value.checksums),
    { ready: true, reasons: [] },
  );
});

test("requires the checksum-bound installer from v0.3.7 onward", () => {
  const ready = fixture({ version: "0.3.7", installer: true });
  assert.equal(
    assessTextReleaseAvailability(
      ready.release,
      ready.manifest,
      ready.checksums,
    ).integrityReady,
    true,
  );

  const missing = fixture({ version: "0.3.7" });
  const result = assessTextReleaseAvailability(
    missing.release,
    missing.manifest,
    missing.checksums,
  );
  assert.equal(result.integrityReady, false);
  assert.ok(
    result.integrityReasons.includes(
      "text checksums do not cover the exact release payload",
    ),
  );
});

test("keeps pre-installer releases bound to their original exact payload", () => {
  const value = fixture({ installer: true });
  assert.equal(
    assessTextReleaseAvailability(
      value.release,
      value.manifest,
      value.checksums,
    ).integrityReady,
    false,
  );
});

test("rejects the mutable legacy release shape", () => {
  const value = fixture();
  value.release.immutable = false;
  assert.equal(
    assessTextRelease(value.release, value.manifest, value.checksums).ready,
    false,
  );
});

test("rejects missing checksum coverage", () => {
  const value = fixture();
  value.checksums = `${value.checksums
    .trimEnd()
    .split("\n")
    .filter((line) => !line.endsWith("worker-release.json"))
    .join("\n")}\n`;
  const result = assessTextRelease(
    value.release,
    value.manifest,
    value.checksums,
  );
  assert.equal(result.ready, false);
  assert.ok(
    result.reasons.includes(
      "text checksums do not cover the exact release payload",
    ),
  );
});

test("rejects an extra unverified GitHub release asset", () => {
  const value = fixture();
  value.release.assets.push({
    name: "unverified-helper.sh",
    digest: `sha256:${"d".repeat(64)}`,
    size: 10,
  });
  assert.equal(
    assessTextRelease(value.release, value.manifest, value.checksums).ready,
    false,
  );
});

test("rejects a GitHub digest that differs from the manifest", () => {
  const value = fixture();
  value.release.assets[0].digest = `sha256:${"e".repeat(64)}`;
  assert.equal(
    assessTextRelease(value.release, value.manifest, value.checksums).ready,
    false,
  );
});

test("rejects tag and manifest version drift", () => {
  const value = fixture();
  value.manifest.version = "0.3.4";
  const result = assessTextRelease(
    value.release,
    value.manifest,
    value.checksums,
  );
  assert.equal(result.ready, false);
  assert.ok(
    result.reasons.includes(
      "text manifest version does not match the release tag",
    ),
  );
});

test("rejects text releases without verified platform signing", () => {
  const value = fixture();
  value.manifest.platform_signing.macos.notarized = false;
  value.manifest.platform_signing.windows.verified = false;
  const result = assessTextRelease(
    value.release,
    value.manifest,
    value.checksums,
  );
  assert.equal(result.ready, false);
  assert.ok(
    result.reasons.includes(
      "text macOS Developer ID/notarization is not verified",
    ),
  );
  assert.ok(
    result.reasons.includes("text Windows Authenticode is not verified"),
  );
});

test("keeps verified Linux downloads available when desktop signing is absent", () => {
  const value = fixture();
  value.manifest.platform_signing.macos = {
    verified: false,
    identity: "adhoc",
    notarized: false,
    team_id: null,
  };
  value.manifest.platform_signing.windows = {
    verified: false,
    identity: "unsigned",
    subject: null,
  };

  const result = assessTextReleaseAvailability(
    value.release,
    value.manifest,
    value.checksums,
  );

  assert.equal(result.integrityReady, true);
  assert.equal(result.platforms.linux.ready, true);
  assert.equal(result.platforms.linuxArm64.ready, true);
  assert.equal(result.platforms.macos.ready, false);
  assert.equal(result.platforms.windows.ready, false);
  assert.match(result.platforms.macos.reason, /not Developer ID signed/i);
  assert.match(result.platforms.windows.reason, /not Authenticode signed/i);
});

test("blocks every platform when the release payload fails integrity", () => {
  const value = fixture();
  value.release.assets[0].digest = `sha256:${"f".repeat(64)}`;

  const result = assessTextReleaseAvailability(
    value.release,
    value.manifest,
    value.checksums,
  );

  assert.equal(result.integrityReady, false);
  assert.equal(result.platforms.linux.ready, false);
  assert.equal(result.platforms.linuxArm64.ready, false);
  assert.equal(result.platforms.macos.ready, false);
  assert.equal(result.platforms.windows.ready, false);
});
