// SPDX-License-Identifier: AGPL-3.0-or-later
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { socialMetadata, socialPages } from "../../app/socialMetadata.mjs";

for (const [key, page] of Object.entries(socialPages)) {
  test(`${key} social metadata matches its shipped PNG and route`, async () => {
    const bytes = await readFile(new URL(`../../public/social/${page.image}`, import.meta.url));
    assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
    assert.equal(bytes.readUInt32BE(16), page.width);
    assert.equal(bytes.readUInt32BE(20), page.height);
    assert.ok(bytes.length < 5_000_000);
    const metadata = socialMetadata(key);
    assert.equal(metadata.openGraph.url, new URL(page.path, "https://aipowergrid.io").href);
    assert.equal(metadata.openGraph.images[0].url, metadata.twitter.images[0].url);
    assert.equal(metadata.twitter.card, "summary_large_image");
    assert.ok(metadata.openGraph.images[0].alt);
  });
}
