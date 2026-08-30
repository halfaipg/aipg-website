import assert from "node:assert/strict";
import test from "node:test";

import { normalizeValidatorCohortStatus } from "../../app/validate/cohortStatus.mjs";

test("normalizes the public validator cohort without claiming independence", () => {
  const status = normalizeValidatorCohortStatus(
    {
      schema: "aipg.network.status.v1",
      generated_at: "2026-08-30T03:15:08Z",
      validators: {
        registered_active: 9,
        heartbeat_fresh: 6,
        participating: 7,
        verified_independent: 0,
        independence_proven: false,
        assignments_completed: 590,
        economic_effect: "none",
        software_versions: [
          { version: "v0.1.0-preview.9", validators: 4 },
          { version: "v0.1.0-preview.13", validators: 2 },
        ],
      },
    },
    "v0.1.0-preview.13",
  );

  assert.deepEqual(status, {
    generatedAt: "2026-08-30T03:15:08Z",
    registeredActive: 9,
    heartbeatFresh: 6,
    participating: 7,
    verifiedIndependent: 0,
    independenceProven: false,
    assignmentsCompleted: 590,
    economicEffect: "none",
    versions: [
      { version: "v0.1.0-preview.13", validators: 2 },
      { version: "v0.1.0-preview.9", validators: 4 },
    ],
    currentVersion: "v0.1.0-preview.13",
    currentVersionCount: 2,
    olderVersionCount: 4,
  });
});

test("rejects responses outside the public network status contract", () => {
  assert.equal(
    normalizeValidatorCohortStatus(
      { schema: "unexpected", validators: {} },
      "v0.1.0-preview.13",
    ),
    null,
  );
  assert.equal(
    normalizeValidatorCohortStatus(
      { schema: "aipg.network.status.v1" },
      "v0.1.0-preview.13",
    ),
    null,
  );
});

test("bounds malformed counts and ignores invalid version rows", () => {
  const status = normalizeValidatorCohortStatus(
    {
      schema: "aipg.network.status.v1",
      validators: {
        registered_active: -2,
        heartbeat_fresh: "3.8",
        participating: "not-a-number",
        verified_independent: null,
        assignments_completed: 12.9,
        economic_effect: "unknown",
        software_versions: [
          { version: "v0.1.0-preview.13", validators: "2" },
          { version: "", validators: 4 },
          { version: "v0.1.0-preview.9", validators: -1 },
        ],
      },
    },
    "v0.1.0-preview.13",
  );

  assert.equal(status.registeredActive, 0);
  assert.equal(status.heartbeatFresh, 3);
  assert.equal(status.participating, 0);
  assert.equal(status.assignmentsCompleted, 12);
  assert.equal(status.economicEffect, "unavailable");
  assert.deepEqual(status.versions, [
    { version: "v0.1.0-preview.13", validators: 2 },
  ]);
});
