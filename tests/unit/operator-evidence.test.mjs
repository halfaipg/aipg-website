import assert from "node:assert/strict";
import test from "node:test";

import {
  estimatePayoutScenario,
  findOnlineWorker,
  summarizePayoutEvidence,
} from "../../app/run/operatorEvidenceLogic.mjs";

const NOW = Date.parse("2026-08-30T00:30:00.000Z");

test("summarizes unique, recent, settled hourly payout evidence", () => {
  const summary = summarizePayoutEvidence(
    {
      totals: {
        aipg_paid: 12000.12345,
        workers_paid: 7,
        last_paid: "2026-08-30T00:00:00.000Z",
      },
      periods: [
        { period_id: "hour-a", aipg: 100, at: "2026-08-30T00:00:00.000Z" },
        { period_id: "hour-b", aipg: 50.55555, at: "2026-08-29T12:00:00.000Z" },
        { period_id: "hour-b", aipg: 900, at: "2026-08-29T12:00:00.000Z" },
        { period_id: "hour-old", aipg: 999, at: "2026-08-28T23:00:00.000Z" },
        { period_id: "day-invalid", aipg: 999, at: "2026-08-30T00:00:00.000Z" },
      ],
    },
    NOW,
  );

  assert.deepEqual(summary, {
    settledAipg24h: 150.5555,
    observedHours: 2,
    totalAipgPaid: 12000.1234,
    workersPaid: 7,
    lastPaid: "2026-08-30T00:00:00.000Z",
  });
});

test("fails closed when payout evidence has no valid recent periods", () => {
  assert.equal(summarizePayoutEvidence({ periods: [] }, NOW), null);
  assert.equal(summarizePayoutEvidence(null, NOW), null);
});

test("computes only a bounded same-window den-share scenario", () => {
  assert.equal(estimatePayoutScenario(5000, 1), 50);
  assert.equal(estimatePayoutScenario(5000, 0.1), 5);
  assert.equal(estimatePayoutScenario(5000, 200), 5000);
  assert.equal(estimatePayoutScenario(-1, 10), null);
});

test("matches only exact, currently online worker identities", () => {
  const payload = {
    workers: [
      {
        id: "worker-123",
        name: "My Rig",
        online: true,
        models: ["gpt-oss-120b", 9],
        job_types: ["text"],
      },
      { id: "worker-456", name: "Old Rig", online: false, models: [] },
    ],
  };

  assert.deepEqual(findOnlineWorker(payload, " my rig "), {
    id: "worker-123",
    name: "My Rig",
    models: ["gpt-oss-120b"],
    jobTypes: ["text"],
  });
  assert.equal(findOnlineWorker(payload, "My"), null);
  assert.equal(findOnlineWorker(payload, "Old Rig"), null);
});
