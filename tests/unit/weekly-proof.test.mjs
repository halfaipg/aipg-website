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
    litellm: { state: "open", merged_at: null },
    workerRelease: {
      draft: false,
      prerelease: false,
      immutable: true,
      tag_name: "v0.3.6",
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
        version: "0.1.2",
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
  assert.match(proof, /AI SDK 0\.1\.0, ElizaOS 0\.1\.0, n8n 0\.1\.2, and MCP 0\.1\.1/);
  assert.match(proof, /verified Linux text worker v0\.3\.6/);
  assert.match(proof, /2 online models are below the 3-worker redundancy target/);
  const posts = [...proof.matchAll(/^### \d\/5\n\n(.+)$/gm)].map((match) => match[1]);
  assert.equal(posts.length, 5);
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
