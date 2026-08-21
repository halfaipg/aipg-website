import { createHash } from "node:crypto";

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
