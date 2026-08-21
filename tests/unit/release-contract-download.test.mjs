import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";

import { decodeReleaseContract } from "../../app/releaseContract.mjs";

const encoder = new TextEncoder();

function asset(name, bytes) {
  return {
    name,
    digest: `sha256:${createHash("sha256").update(bytes).digest("hex")}`,
    size: bytes.byteLength,
  };
}

function fixture() {
  const manifest = { schema: "example", commit: "a".repeat(40) };
  const manifestBytes = encoder.encode(`${JSON.stringify(manifest)}\n`);
  const checksumText = `${"b".repeat(64)}  worker.bin\n`;
  const checksumBytes = encoder.encode(checksumText);
  return {
    manifest,
    manifestBytes,
    checksumText,
    checksumBytes,
    manifestAsset: asset("worker-release.json", manifestBytes),
    checksumAsset: asset("SHA256SUMS", checksumBytes),
  };
}

test("parses only manifest and checksum bytes bound to GitHub metadata", () => {
  const value = fixture();
  assert.deepEqual(
    decodeReleaseContract(
      value.manifestAsset,
      value.checksumAsset,
      value.manifestBytes,
      value.checksumBytes,
    ),
    { manifest: value.manifest, checksums: value.checksumText },
  );
});

test("rejects tampered manifest and checksum bytes", () => {
  const value = fixture();
  const tamperedManifest = encoder.encode(
    `${JSON.stringify({ ...value.manifest, schema: "tampered" })}\n`,
  );
  const tamperedChecksums = encoder.encode(
    `${"c".repeat(64)}  worker.bin\n`,
  );
  assert.equal(
    decodeReleaseContract(
      value.manifestAsset,
      value.checksumAsset,
      tamperedManifest,
      value.checksumBytes,
    ),
    null,
  );
  assert.equal(
    decodeReleaseContract(
      value.manifestAsset,
      value.checksumAsset,
      value.manifestBytes,
      tamperedChecksums,
    ),
    null,
  );
});

test("rejects metadata length mismatch and invalid UTF-8", () => {
  const value = fixture();
  assert.equal(
    decodeReleaseContract(
      { ...value.manifestAsset, size: value.manifestAsset.size + 1 },
      value.checksumAsset,
      value.manifestBytes,
      value.checksumBytes,
    ),
    null,
  );

  const invalidUtf8 = Uint8Array.from([0xff]);
  assert.equal(
    decodeReleaseContract(
      asset("worker-release.json", invalidUtf8),
      value.checksumAsset,
      invalidUtf8,
      value.checksumBytes,
    ),
    null,
  );
});
