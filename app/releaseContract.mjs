import { createHash } from "node:crypto";

const HEX_COMMIT = /^[0-9a-f]{40}$/;
const REPOSITORY = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
const MAX_MANIFEST_BYTES = 256 * 1024;
const MAX_CHECKSUM_BYTES = 64 * 1024;
export const IMMUTABLE_RELEASE_REVALIDATE_SECONDS = 24 * 60 * 60;

export function githubApiHeaders(token = process.env.GITHUB_TOKEN) {
  const normalizedToken = typeof token === "string" ? token.trim() : "";
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(normalizedToken
      ? { Authorization: `Bearer ${normalizedToken}` }
      : {}),
  };
}

export function releaseContractAssetSizesAllowed(manifestAsset, checksumAsset) {
  return (
    Number.isSafeInteger(manifestAsset?.size) &&
    manifestAsset.size > 0 &&
    manifestAsset.size <= MAX_MANIFEST_BYTES &&
    Number.isSafeInteger(checksumAsset?.size) &&
    checksumAsset.size > 0 &&
    checksumAsset.size <= MAX_CHECKSUM_BYTES
  );
}

export async function getReleaseTagCommit(repository, tag, fetcher = fetch) {
  if (!REPOSITORY.test(repository) || typeof tag !== "string" || !tag) {
    return null;
  }
  const response = await fetcher(
    `https://api.github.com/repos/${repository}/commits/${encodeURIComponent(tag)}`,
    {
      headers: githubApiHeaders(),
      next: { revalidate: IMMUTABLE_RELEASE_REVALIDATE_SECONDS },
    },
  );
  if (!response.ok) return null;
  const payload = await response.json();
  return HEX_COMMIT.test(payload?.sha || "") ? payload.sha : null;
}

function releaseAssetBytesMatch(asset, value) {
  const bytes =
    value instanceof ArrayBuffer
      ? new Uint8Array(value)
      : ArrayBuffer.isView(value)
        ? new Uint8Array(value.buffer, value.byteOffset, value.byteLength)
        : null;
  if (
    !bytes ||
    !Number.isSafeInteger(asset?.size) ||
    asset.size <= 0 ||
    bytes.byteLength !== asset.size
  ) {
    return false;
  }
  const digest = createHash("sha256").update(bytes).digest("hex");
  return asset.digest === `sha256:${digest}`;
}

export function decodeReleaseContract(
  manifestAsset,
  checksumAsset,
  manifestBytes,
  checksumBytes,
) {
  if (
    !releaseAssetBytesMatch(manifestAsset, manifestBytes) ||
    !releaseAssetBytesMatch(checksumAsset, checksumBytes)
  ) {
    return null;
  }
  try {
    const decoder = new TextDecoder("utf-8", { fatal: true });
    return {
      manifest: JSON.parse(decoder.decode(manifestBytes)),
      checksums: decoder.decode(checksumBytes),
    };
  } catch {
    return null;
  }
}
