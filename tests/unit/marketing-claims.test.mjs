import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const ROOT = new URL("../../", import.meta.url);
const MARKETING_FILES = [
  "components/Hero.js",
  "components/GridStatement.js",
  "components/Problem.js",
  "components/Products.js",
  "components/RunNode.js",
  "components/Infrastructure.js",
  "components/Features.js",
  "components/Services.js",
  "components/VoiceAgentWidget.js",
  "app/about/page.js",
  "app/layout.js",
];

async function marketingCopy() {
  return (
    await Promise.all(
      MARKETING_FILES.map(async (path) =>
        readFile(new URL(path, ROOT), "utf8"),
      ),
    )
  ).join("\n");
}

test("marketing copy does not promote gated capabilities as live", async () => {
  const copy = await marketingCopy();
  const retiredClaims = [
    "No one can turn it off",
    "no one owns the off switch",
    "the network can never be shut down",
    "All code, models, and workflows are public",
    "All code is public",
    "any GPU can join the network",
    "matched to your card automatically",
    "operator running the GPU can't read your prompts",
    "Free, and it stays free",
    "The free tier is the product",
    "Paid users fund the free tier",
    "permissionless AI generation layer",
    "<span>Worker-claimed rewards through audited smart contracts</span>",
    "earn USDC and AIPG",
  ];

  for (const claim of retiredClaims) {
    assert.equal(copy.includes(claim), false, `retired claim returned: ${claim}`);
  }
});

test("marketing copy preserves explicit launch boundaries", async () => {
  const copy = await marketingCopy();

  for (const boundary of [
    "managed media installer stays gated",
    "earnings are not guaranteed",
    "current community workers are not a private-inference guarantee",
    "Core routing is coordinated today",
    "Core coordination is still moving toward trusted partner nodes",
    "Planned worker-claimed rewards through audited smart contracts",
    "multi-asset worker payouts are planned, not live",
    "community-powered generation layer",
    "daily allowance",
  ]) {
    assert.equal(copy.includes(boundary), true, `missing boundary: ${boundary}`);
  }
});
