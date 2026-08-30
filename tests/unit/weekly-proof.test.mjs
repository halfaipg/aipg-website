import assert from "node:assert/strict";
import test from "node:test";

import {
  buildWeeklyProof,
  INTEGRATION_PULL_REQUESTS,
} from "../../scripts/weekly-proof.mjs";

const NOW = new Date("2026-08-29T20:00:00Z");

function fixture() {
  return {
    network: {
      schema: "aipg.network.status.v1",
      status: "operational",
      capacity: {
        workers_online: 8,
        models_online: 4,
        models_below_target: ["model-a", "model-b"],
        models: [
          { type: "text" },
          { type: "image" },
          { type: "video" },
          { type: "audio" },
        ],
      },
      validators: {
        registered_active: 8,
        heartbeat_fresh: 6,
        assignments_completed: 573,
        agreement_rate: 0.953,
        verified_independent: 0,
        economic_effect: "none",
      },
    },
    totals: {
      day: { text: { jobs: 100 }, image: { jobs: 5 } },
      month: { text: { jobs: 2_000 }, image: { jobs: 50 } },
    },
    payouts: {
      totals: { aipg_paid: 66_514.7581, payouts: 1_300, workers_paid: 8 },
      periods: Array.from({ length: 200 }, (_, index) => ({
        at: new Date(NOW.getTime() - index * 60 * 60 * 1_000).toISOString(),
        aipg: 10,
        payouts: 2,
      })),
    },
    pricing: {
      schema: "aipg.pricing.v1",
      currency: "USD",
      price_book: {
        version: "2026-08-29-a",
        models: [
          {
            model: "gpt-oss-120b",
            rates: { input_per_mtok_usd: 0.075, output_per_mtok_usd: 0.3 },
          },
          {
            model: "z-image-turbo",
            rates: { per_image_usd: 0.003 },
          },
        ],
      },
      comparison_evidence: {
        status: "current",
        as_of: "2026-08-29T00:00:00Z",
        valid_until: "2026-09-29T00:00:00Z",
        items: [
          {
            id: "gpt-oss-120b-standard-token-rates",
            model: "gpt-oss-120b",
            modality: "text",
            provider: "Groq",
            source_url: "https://console.groq.com/docs/model/openai/gpt-oss-120b",
            basis: "same model; 1M input tokens plus 1M output tokens",
            workload: { input_tokens: 1_000_000, output_tokens: 1_000_000 },
            competitor_rates: {
              input_per_mtok_usd: 0.15,
              output_per_mtok_usd: 0.6,
            },
            aipg_usd: 0.375,
            competitor_usd: 0.75,
            savings_percent: 50,
          },
          {
            id: "z-image-turbo-one-megapixel",
            model: "z-image-turbo",
            modality: "image",
            provider: "fal",
            source_url: "https://fal.ai/models/fal-ai/z-image/turbo",
            basis: "same model; one 1-megapixel image",
            workload: { images: 1, megapixels: 1 },
            competitor_rates: { per_megapixel_usd: 0.005 },
            aipg_usd: 0.003,
            competitor_usd: 0.005,
            savings_percent: 40,
          },
        ],
      },
    },
    integrations: Object.fromEntries(
      INTEGRATION_PULL_REQUESTS.map((item) => [
        item.id,
        {
          number: item.number,
          base: { repo: { full_name: item.repo } },
          html_url: item.url,
          state: "open",
          merged_at: null,
        },
      ]),
    ),
    workerRelease: {
      draft: false,
      prerelease: false,
      immutable: true,
      tag_name: "v0.3.6",
    },
    mediaQualification: {
      schema: "aipg-media-manager-qualification-status-v1",
      profile: {
        id: "ace-step-v1.5-xl-turbo",
        version: "0.2.4",
        digest: "a".repeat(64),
      },
      qualification_release: {
        tag: "manager-qualification-v0.1.0-preview.1",
        url: "https://github.com/AIPowerGrid/grid-media-worker/releases/tag/manager-qualification-v0.1.0-preview.1",
      },
      runs_per_evidence_set: 3,
      classes: ["minimum", "midrange", "datacenter"].map((id) => ({
        id,
        accepted_evidence_sets: 0,
        required_evidence_sets: 1,
        status: "needed",
      })),
      release_ready: false,
      updated_at: "2026-08-29T19:00:00Z",
      participation_url:
        "https://github.com/AIPowerGrid/grid-media-worker/issues/new?template=media-manager-qualification.yml",
      cohort_url: "https://github.com/AIPowerGrid/grid-media-worker/issues/8",
      runbook_url:
        "https://github.com/AIPowerGrid/grid-media-worker/blob/main/docs/MANAGER_QUALIFICATION.md",
    },
    packages: {
      "@aipowergrid/ai-sdk-provider": {
        name: "@aipowergrid/ai-sdk-provider",
        version: "0.1.0",
      },
      "@aipowergrid/plugin-aipg": {
        name: "@aipowergrid/plugin-aipg",
        version: "0.1.0",
      },
      "@aipowergrid/n8n-nodes-aipg": {
        name: "@aipowergrid/n8n-nodes-aipg",
        version: "0.1.3",
      },
      "@aipowergrid/mcp": {
        name: "@aipowergrid/mcp",
        version: "0.1.1",
      },
    },
    packageDownloads: {
      "@aipowergrid/ai-sdk-provider": {
        package: "@aipowergrid/ai-sdk-provider",
        downloads: 55,
        start: "2026-08-22",
        end: "2026-08-28",
      },
      "@aipowergrid/plugin-aipg": {
        package: "@aipowergrid/plugin-aipg",
        downloads: 60,
        start: "2026-08-22",
        end: "2026-08-28",
      },
      "@aipowergrid/n8n-nodes-aipg": {
        package: "@aipowergrid/n8n-nodes-aipg",
        downloads: 149,
        start: "2026-08-22",
        end: "2026-08-28",
      },
      "@aipowergrid/mcp": {
        package: "@aipowergrid/mcp",
        downloads: 211,
        start: "2026-08-22",
        end: "2026-08-28",
      },
    },
  };
}

test("builds an evidence-linked thread without overstating validators", () => {
  const proof = buildWeeklyProof(fixture(), NOW);
  assert.match(proof, /105 jobs in 24h/);
  assert.match(proof, /2,050 in 30d/);
  assert.match(proof, /1,690 AIPG across 338 Base transfers in the past 7 days/);
  assert.match(proof, /0 independently verified operators/);
  assert.match(proof, /no routing, reward, strike, or slashing authority yet/);
  assert.match(
    proof,
    /PRs: LiteLLM, Dify, Vercel AI SDK, ElizaOS, and LangChain open/,
  );
  for (const item of INTEGRATION_PULL_REQUESTS) {
    assert.match(proof, new RegExp(`\\| ${item.name} upstream PR \\| open for maintainer review \\|`));
    assert.match(proof, new RegExp(`\\[${item.name} upstream PR\\]\\(${item.url}\\)`));
  }
  assert.match(proof, /npm recorded 475 downloads for our four packages/);
  assert.match(proof, /Aug 22-28 window \(requests, not users\)/);
  assert.match(
    proof,
    /\$5-\$20 builder credits: https:\/\/aipowergrid\.io\/docs\/builder-credits/,
  );
  assert.match(proof, /Vercel AI SDK package \| 0\.1\.0; 55 npm requests/);
  assert.match(proof, /MCP package \| 0\.1\.1; 211 npm requests/);
  assert.match(
    proof,
    /gpt-oss-120b AIPG \$0\.375 vs Groq \$0\.75 \(50% less\)/,
  );
  assert.match(
    proof,
    /z-image-turbo AIPG \$0\.003 vs fal \$0\.005 \(40% less\)/,
  );
  assert.match(proof, /Versioned Grid pricing and same-model comparisons/);
  assert.match(proof, /gpt-oss-120b comparison source/);
  assert.match(
    proof,
    /npm download window \| 2026-08-22 through 2026-08-28; registry requests, not unique users/,
  );
  assert.match(proof, /verified Linux text worker v0\.3\.6/);
  assert.match(proof, /2 routes are below the 3-worker target/);
  assert.match(
    proof,
    /Media qualification still needs minimum, midrange, datacenter evidence/,
  );
  assert.match(proof, /the tool is benchmark-only and earns no rewards/);
  assert.match(proof, /Media qualification release ready \| no/);
  const posts = [...proof.matchAll(/^### \d\/6\n\n(.+)$/gm)].map((match) => match[1]);
  assert.equal(posts.length, 6);
  assert.ok(posts.every((post) => post.length <= 280));
});

test("fails closed when same-model pricing evidence is stale or drifts", () => {
  const stale = fixture();
  stale.pricing.comparison_evidence.valid_until = "2026-08-29T19:59:59Z";
  assert.throws(
    () => buildWeeklyProof(stale, NOW),
    /pricing comparison evidence is stale/,
  );

  const arithmetic = fixture();
  arithmetic.pricing.comparison_evidence.items[0].savings_percent = 49;
  assert.throws(
    () => buildWeeklyProof(arithmetic, NOW),
    /comparison arithmetic drifted/,
  );

  const book = fixture();
  book.pricing.price_book.models[0].rates.output_per_mtok_usd = 0.4;
  assert.throws(
    () => buildWeeklyProof(book, NOW),
    /does not match the price book/,
  );

  const competitor = fixture();
  competitor.pricing.comparison_evidence.items[0].competitor_rates.output_per_mtok_usd =
    0.7;
  assert.throws(
    () => buildWeeklyProof(competitor, NOW),
    /does not match competitor rates/,
  );
});

test("fails closed when the payout response cannot prove a seven-day window", () => {
  const value = fixture();
  value.payouts.periods = value.payouts.periods.slice(0, 20);
  assert.throws(
    () => buildWeeklyProof(value, NOW),
    /does not cover the past seven days/,
  );
});

test("rejects an unknown network status schema", () => {
  const value = fixture();
  value.network.schema = "future.schema";
  assert.throws(() => buildWeeklyProof(value, NOW), /schema is invalid/);
});

test("rejects mutable worker releases and malformed npm evidence", () => {
  const mutable = fixture();
  mutable.workerRelease.immutable = false;
  assert.throws(
    () => buildWeeklyProof(mutable, NOW),
    /release is not immutable and stable/,
  );

  const malformed = fixture();
  malformed.packages["@aipowergrid/mcp"].name = "lookalike";
  assert.throws(
    () => buildWeeklyProof(malformed, NOW),
    /@aipowergrid\/mcp npm release is invalid/,
  );

  const staleDownloads = fixture();
  staleDownloads.packageDownloads["@aipowergrid/mcp"].start = "2026-08-01";
  staleDownloads.packageDownloads["@aipowergrid/mcp"].end = "2026-08-07";
  assert.throws(
    () => buildWeeklyProof(staleDownloads, NOW),
    /@aipowergrid\/mcp npm download window is invalid or stale/,
  );

  const mismatchedDownloads = fixture();
  mismatchedDownloads.packageDownloads["@aipowergrid/mcp"].start = "2026-08-21";
  mismatchedDownloads.packageDownloads["@aipowergrid/mcp"].end = "2026-08-27";
  assert.throws(
    () => buildWeeklyProof(mismatchedDownloads, NOW),
    /npm download windows do not match/,
  );
});

test("binds every upstream submission to its exact repository, PR, and URL", () => {
  assert.deepEqual(
    INTEGRATION_PULL_REQUESTS.map(({ name, repo, number }) => ({ name, repo, number })),
    [
      { name: "LiteLLM", repo: "BerriAI/litellm", number: 38725 },
      { name: "Dify", repo: "langgenius/dify-plugins", number: 2986 },
      { name: "Vercel AI SDK", repo: "vercel/ai", number: 20003 },
      { name: "ElizaOS", repo: "elizaOS/eliza", number: 29964 },
      { name: "LangChain", repo: "langchain-ai/docs", number: 5770 },
    ],
  );

  const wrongRepo = fixture();
  wrongRepo.integrations.dify.base.repo.full_name = "lookalike/dify-plugins";
  assert.throws(
    () => buildWeeklyProof(wrongRepo, NOW),
    /Dify upstream PR evidence is invalid/,
  );
});

test("reports mixed upstream states without calling a closed PR open", () => {
  const value = fixture();
  value.integrations.litellm.state = "closed";
  value.integrations.litellm.merged_at = "2026-08-30T10:00:00Z";
  value.integrations.langchain.state = "closed";
  const proof = buildWeeklyProof(value, NOW);
  assert.match(proof, /PRs: LiteLLM merged; Dify, Vercel AI SDK, and ElizaOS open; LangChain closed without merge/);
});

test("rejects inconsistent media qualification evidence", () => {
  const value = fixture();
  value.mediaQualification.classes[0].accepted_evidence_sets = 1;
  assert.throws(
    () => buildWeeklyProof(value, NOW),
    /media qualification status is invalid/,
  );
});
