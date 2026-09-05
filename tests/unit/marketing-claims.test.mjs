import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const ROOT = new URL("../../", import.meta.url);
const MARKETING_FILES = [
  "components/Hero.js",
  "components/GridStatement.js",
  "components/Problem.js",
  "components/Products.js",
  "components/GridParticipation.js",
  "components/GridChat.jsx",
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
    "Every paid generation funds free access",
    "no corporate worldview baked in",
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

test("operator entry points match the live onboarding model", async () => {
  const [navbar, footer, runNode] = await Promise.all([
    readFile(new URL("components/Navbar.js", ROOT), "utf8"),
    readFile(new URL("components/Footer.js", ROOT), "utf8"),
    readFile(new URL("components/RunNode.js", ROOT), "utf8"),
  ]);

  assert.match(navbar, /href="\/run"[\s\S]*?>\s*Run\s*<\/Link>/);
  assert.doesNotMatch(navbar, /href="\/validate"/);
  assert.doesNotMatch(navbar, /href="\/staking"[\s\S]*?>\s*Earn\s*<\/Link>/);
  assert.match(footer, /href="\/staking"[\s\S]*?>\s*Withdraw Legacy Stake\s*<\/a>/);
  assert.match(footer, /href="\/validate"[\s\S]*?>\s*Run a validator\s*<\/a>/);
  assert.match(
    runNode,
    /dedicated local signing identity; no funded wallet or account login/,
  );
  assert.equal(
    runNode.includes("Sign evidence with a wallet linked to your Grid account"),
    false,
  );
});

test("builder entry points converge on the canonical 60-second guide", async () => {
  const [hero, products, navbar, footer, usePage] = await Promise.all([
    readFile(new URL("components/Hero.js", ROOT), "utf8"),
    readFile(new URL("components/Products.js", ROOT), "utf8"),
    readFile(new URL("components/Navbar.js", ROOT), "utf8"),
    readFile(new URL("components/Footer.js", ROOT), "utf8"),
    readFile(new URL("app/use/page.js", ROOT), "utf8"),
  ]);

  assert.match(hero, /href="\/use"[\s\S]*Build with the API/);
  assert.match(hero, /href="#try-grid"[\s\S]*Try the Grid/);
  assert.match(hero, /href="\/run"[\s\S]*Provide compute/);
  assert.match(products, /href: "https:\/\/aipowergrid\.io\/use"/);
  assert.match(navbar, /href="\/use"[\s\S]*?>\s*Build\s*<\/Link>/);
  assert.match(footer, /href="\/use"[\s\S]*?>\s*60-second setup\s*<\/a>/);
  assert.match(
    usePage,
    /permanentRedirect\(INTEGRATION_GUIDE\)/,
  );
  assert.match(
    usePage,
    /https:\/\/aipowergrid\.io\/docs\/integrations/,
  );
});

test("operator onboarding preserves sidecar and maturity boundaries", async () => {
  const [paths, downloads] = await Promise.all([
    readFile(new URL("app/run/OperatorPaths.jsx", ROOT), "utf8"),
    readFile(new URL("app/run/RunDownloads.jsx", ROOT), "utf8"),
  ]);

  assert.match(paths, /Keep the AI stack you already run/);
  assert.match(paths, /does not replace[\s\S]*upload your model files/);
  assert.match(paths, /Community workers process plaintext prompts and outputs/);
  assert.match(paths, /ComfyUI[\s\S]*Qualification/);
  for (const guide of [
    "ollama",
    "vllm",
    "sglang",
    "lm-studio",
    "koboldcpp",
    "openai-compatible",
    "comfyui",
    "ace-step",
  ]) {
    assert.match(paths, new RegExp(`/docs/backends/${guide}`));
  }
  assert.match(downloads, /Before you download/);
  assert.match(downloads, /Network need/);
  assert.match(downloads, /Qualification benchmarks are unpaid/);
  assert.match(downloads, /one job at a time/);
});
