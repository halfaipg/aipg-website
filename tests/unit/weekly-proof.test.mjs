import assert from "node:assert/strict";
import test from "node:test";

import { buildWeeklyProof } from "../../scripts/weekly-proof.mjs";

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
      comparison_evidence: {
        status: "current",
        as_of: "2026-08-29T00:00:00Z",
        valid_until: "2026-09-29T00:00:00Z",
        items: [
          {
            id: "gpt-oss-120b-standard-token-rates",
            provider: "Groq",
            source_url: "https://console.groq.com/docs/model/openai/gpt-oss-120b",
            aipg_usd: 0.375,
            competitor_usd: 0.75,
            savings_percent: 50,
          },
          {
            id: "z-image-turbo-one-megapixel",
            provider: "fal",
            source_url: "https://fal.ai/models/fal-ai/z-image/turbo",
            aipg_usd: 0.003,
            competitor_usd: 0.005,
            savings_percent: 40,
          },
        ],
      },
    },
    litellm: { state: "open", merged_at: null },
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
  };
}

test("builds an evidence-linked thread without overstating validators", () => {
  const proof = buildWeeklyProof(fixture(), NOW);
  assert.match(proof, /105 jobs in 24h/);
  assert.match(proof, /2,050 in 30d/);
  assert.match(proof, /1,690 AIPG across 338 Base transfers in the past 7 days/);
  assert.match(proof, /0 independently verified operators/);
  assert.match(proof, /no routing, reward, strike, or slashing authority yet/);
  assert.match(proof, /LiteLLM is open for maintainer review/);
  assert.match(proof, /AI SDK 0\.1\.0, ElizaOS 0\.1\.0, n8n 0\.1\.3, and MCP 0\.1\.1/);
  assert.match(proof, /verified Linux text worker v0\.3\.6/);
  assert.match(proof, /2 routes are below the 3-worker target/);
  assert.match(
    proof,
    /Media qualification still needs minimum, midrange, datacenter evidence/,
  );
  assert.match(proof, /the tool is benchmark-only and earns no rewards/);
  assert.match(proof, /Media qualification release ready \| no/);
  assert.match(proof, /same GPT-OSS-120B workload is \$0\.375 on AIPG vs \$0\.75 on Groq/);
  assert.match(proof, /1 MP Z-Image Turbo image is \$0\.003 vs \$0\.005 on fal/);
  const posts = [...proof.matchAll(/^### \d\/6\n\n(.+)$/gm)].map((match) => match[1]);
  assert.equal(posts.length, 6);
  assert.ok(posts.every((post) => post.length <= 280));
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
});

test("rejects inconsistent media qualification evidence", () => {
  const value = fixture();
  value.mediaQualification.classes[0].accepted_evidence_sets = 1;
  assert.throws(
    () => buildWeeklyProof(value, NOW),
    /media qualification status is invalid/,
  );
});

test("fails closed on stale, incomplete, or inconsistent pricing evidence", () => {
  const stale = fixture();
  stale.pricing.comparison_evidence.status = "stale";
  assert.throws(() => buildWeeklyProof(stale, NOW), /comparisons are not current/);

  const incomplete = fixture();
  incomplete.pricing.comparison_evidence.items.pop();
  assert.throws(
    () => buildWeeklyProof(incomplete, NOW),
    /comparisons are incomplete or duplicated/,
  );

  const inconsistent = fixture();
  inconsistent.pricing.comparison_evidence.items[0].aipg_usd = 0.7;
  assert.throws(
    () => buildWeeklyProof(inconsistent, NOW),
    /comparison evidence is inconsistent/,
  );
});

test("requires official comparison sources and a live review window", () => {
  const wrongSource = fixture();
  wrongSource.pricing.comparison_evidence.items[1].source_url =
    "https://example.com/z-image";
  assert.throws(
    () => buildWeeklyProof(wrongSource, NOW),
    /comparison evidence is inconsistent/,
  );

  const expired = fixture();
  expired.pricing.comparison_evidence.valid_until = "2026-08-29T19:59:59Z";
  assert.throws(
    () => buildWeeklyProof(expired, NOW),
    /comparison window is invalid/,
  );
});
