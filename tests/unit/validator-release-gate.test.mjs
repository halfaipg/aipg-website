import assert from "node:assert/strict";
import test from "node:test";

import { assessValidatorCoreCapability } from "../../app/validate/releaseGate.mjs";

function readyCapability() {
  return {
    validator_api_version: "v1-preview",
    mode: "shared_quorum_preview",
    economic_effect: "none",
    targeted_probe_enabled: true,
    features: {
      assignments: true,
      targeted_probe: true,
      quorum: true,
      validator_rewards: false,
      staking_required: false,
    },
    quorum_policy: {
      threshold: 3,
      target_validators: 5,
      operator_independence_proven: false,
    },
    endpoints: {
      assignments: {
        enabled: true,
        auth: "validator.assignments",
        economic_effect: "none",
      },
      targeted_probe: {
        enabled: true,
        auth: "validator.probe",
        economic_effect: "none",
      },
      attest: {
        enabled: true,
        auth: "validator.attest",
        economic_effect: "none",
      },
    },
  };
}

test("accepts the reviewed non-economic shared-quorum contract", () => {
  assert.deepEqual(assessValidatorCoreCapability(readyCapability()), {
    ready: true,
    reasons: [],
  });
});

test("rejects the older assignment-bound production contract", () => {
  const capability = readyCapability();
  capability.mode = "assignment_bound_evidence";
  delete capability.quorum_policy;

  const result = assessValidatorCoreCapability(capability);

  assert.equal(result.ready, false);
  assert.ok(result.reasons.includes("validator mode is not shared_quorum_preview"));
  assert.ok(result.reasons.includes("quorum policy is not 3-of-5"));
});

test("rejects economic authority in the preview", () => {
  const capability = readyCapability();
  capability.economic_effect = "routing";
  capability.features.validator_rewards = true;

  const result = assessValidatorCoreCapability(capability);

  assert.equal(result.ready, false);
  assert.ok(result.reasons.includes("preview evidence is not explicitly non-economic"));
  assert.ok(result.reasons.includes("validator rewards are not explicitly disabled"));
});

test("rejects weak quorum and unscoped endpoint contracts", () => {
  const capability = readyCapability();
  capability.quorum_policy.threshold = 2;
  capability.endpoints.attest.auth = "any_api_key";

  const result = assessValidatorCoreCapability(capability);

  assert.equal(result.ready, false);
  assert.ok(result.reasons.includes("quorum policy is not 3-of-5"));
  assert.ok(result.reasons.includes("attest endpoint contract is incomplete"));
});

test("accepts the exact production capability contract", () => {
  const capability = readyCapability();
  capability.features.sealed_assignments = true;
  capability.probe_policy = {
    assignment_disclosure: "after_probe_completion",
  };

  assert.deepEqual(assessValidatorCoreCapability(capability), {
    ready: true,
    reasons: [],
  });
});
