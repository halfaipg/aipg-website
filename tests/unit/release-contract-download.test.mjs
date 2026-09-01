import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";

import {
  decodeReleaseContract,
  getReleaseTagCommit,
  githubApiHeaders,
  releaseContractAssetSizesAllowed,
} from "../../app/releaseContract.mjs";

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

test("rejects oversized release metadata before download", () => {
  const value = fixture();
  assert.equal(
    releaseContractAssetSizesAllowed(value.manifestAsset, value.checksumAsset),
    true,
  );
  assert.equal(
    releaseContractAssetSizesAllowed(
      { ...value.manifestAsset, size: 256 * 1024 + 1 },
      value.checksumAsset,
    ),
    false,
  );
  assert.equal(
    releaseContractAssetSizesAllowed(
      value.manifestAsset,
      { ...value.checksumAsset, size: 64 * 1024 + 1 },
    ),
    false,
  );
});

test("resolves only a valid GitHub tag commit", async () => {
  const calls = [];
  const commit = "d".repeat(40);
  const fetcher = async (url, options) => {
    calls.push({ url, options });
    return { ok: true, json: async () => ({ sha: commit }) };
  };
  assert.equal(
    await getReleaseTagCommit(
      "AIPowerGrid/grid-text-worker",
      "v0.3.5",
      fetcher,
    ),
    commit,
  );
  assert.match(calls[0].url, /\/commits\/v0\.3\.5$/);
  assert.equal(calls[0].options.headers.Authorization, undefined);
  assert.equal(
    await getReleaseTagCommit("invalid repository", "v0.3.5", fetcher),
    null,
  );
});

test("uses a server-only GitHub token when one is supplied", () => {
  assert.deepEqual(githubApiHeaders("  test-token  "), {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    Authorization: "Bearer test-token",
  });
  assert.equal(githubApiHeaders("").Authorization, undefined);
});
