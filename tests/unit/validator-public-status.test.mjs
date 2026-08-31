import assert from "node:assert/strict";
import test from "node:test";

import {
  isPublicValidatorId,
  normalizePublicValidatorStatus,
} from "../../app/validate/publicStatus.mjs";

const VALIDATOR_ID = "val_3ded127ef6b84efca3c397f313a100ae";

function payload(overrides = {}) {
  return {
    schema: "aipg.validator.public-status.v1",
    validator_id: VALIDATOR_ID,
    summary: "qualifying",
    registration_status: "active",
    online: true,
    last_heartbeat: "2026-08-31T14:27:00+00:00",
    software_version: "v0.1.0-preview.13",
    activity: { assigned: 137, completed: 136, attested: 126 },
    qualification: {
      status: "candidate",
      elapsed_seconds: 3600,
      minimum_seconds: 259200,
      remaining_seconds: 255600,
      sample_coverage: 1,
      minimum_sample_coverage: 0.8,
      time_ready: false,
      coverage_ready: true,
      heartbeat_fresh: true,
      review_current: false,
      independent_vote_eligible: false,
    },
    next_action: "Keep this validator online.",
    economic_effect: "none",
    ...overrides,
  };
}

test("normalizes the redacted public validator contract", () => {
  assert.deepEqual(normalizePublicValidatorStatus(payload(), VALIDATOR_ID), {
    schema: "aipg.validator.public-status.v1",
    validatorId: VALIDATOR_ID,
    summary: "qualifying",
    registrationStatus: "active",
    online: true,
    lastHeartbeat: "2026-08-31T14:27:00+00:00",
    softwareVersion: "v0.1.0-preview.13",
    activity: { assigned: 137, completed: 136, attested: 126 },
    qualification: {
      status: "candidate",
      elapsedSeconds: 3600,
      minimumSeconds: 259200,
      remainingSeconds: 255600,
      sampleCoverage: 1,
      minimumSampleCoverage: 0.8,
      timeReady: false,
      coverageReady: true,
      heartbeatFresh: true,
      reviewCurrent: false,
      independentVoteEligible: false,
    },
    nextAction: "Keep this validator online.",
    economicEffect: "none",
  });
});

test("rejects mismatched IDs, economic authority, and invalid timestamps", () => {
  assert.equal(
    normalizePublicValidatorStatus(payload(), "val_0000000000000000"),
    null,
  );
  assert.equal(
    normalizePublicValidatorStatus(
      payload({ economic_effect: "rewards" }),
      VALIDATOR_ID,
    ),
    null,
  );
  assert.equal(
    normalizePublicValidatorStatus(
      payload({ last_heartbeat: "not-a-date" }),
      VALIDATOR_ID,
    ),
    null,
  );
});

test("accepts only bounded public validator IDs", () => {
  assert.equal(isPublicValidatorId(VALIDATOR_ID), true);
  assert.equal(isPublicValidatorId("val_short"), false);
  assert.equal(isPublicValidatorId("0x12345678901234567890"), false);
  assert.equal(isPublicValidatorId("val_1234567890abcdef/../secret"), false);
});
