import assert from "node:assert/strict";
import test from "node:test";

import { assessTextRelease } from "../../app/run/releaseGate.mjs";

const payloadNames = [
  "grid-inference-worker-linux-x64",
  "grid-inference-worker-linux-arm64",
  "grid-inference-worker-macos-arm64.zip",
  "grid-inference-worker-windows-x64.exe",
  "grid-inference-worker-release.spdx.json",
];

function fixture() {
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
    tag_name: "v0.3.5",
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
    tag: "v0.3.5",
    version: "0.3.5",
    commit: "c".repeat(40),
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
