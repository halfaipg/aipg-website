import assert from "node:assert/strict";
import test from "node:test";

import {
  assessValidatorCoreCapability,
  assessValidatorRelease,
} from "../../app/validate/releaseGate.mjs";

const COMMIT = "a".repeat(40);
const PAYLOADS = [
  "aipg-validator-linux-x64.zip",
  "aipg-validator-linux-arm64.zip",
  "aipg-validator-macos-arm64.zip",
  "aipg-validator-windows-x64.zip",
  "aipg-validator-release.spdx.json",
  "install-validator.sh",
];

function readyRelease() {
  const assets = PAYLOADS.map((name, index) => ({
    name,
    sha256: `${index + 1}`.repeat(64),
    bytes: index + 100,
  }));
  const manifestDigest = "e".repeat(64);
  return {
    release: {
      draft: false,
      prerelease: true,
      immutable: true,
      tag_name: "v0.1.0-preview",
      target_commitish: COMMIT,
      resolved_tag_commit: COMMIT,
      assets: [
        ...assets.map((item) => ({
          name: item.name,
          digest: `sha256:${item.sha256}`,
          size: item.bytes,
        })),
        {
          name: "validator-release.json",
          digest: `sha256:${manifestDigest}`,
          size: 900,
        },
        { name: "SHA256SUMS", digest: `sha256:${"f".repeat(64)}`, size: 700 },
      ],
    },
    manifest: {
      schema: "aipg-validator-release-v1",
      tag: "v0.1.0-preview",
      version: "0.1.0",
      commit: COMMIT,
      platform_signing: {
        macos: {
          verified: true,
          identity: "developer_id_application",
          notarized: true,
          team_id: "AIPGTEAM01",
        },
        windows: {
          verified: true,
          identity: "authenticode",
          subject: "AI Power Grid",
        },
      },
      assets,
    },
    checksums:
      [
        ...assets.map((item) => `${item.sha256}  ${item.name}`),
        `${manifestDigest}  validator-release.json`,
      ].join("\n") + "\n",
  };
}

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
        auth: "v2_account_key",
        economic_effect: "none",
      },
      targeted_probe: {
        enabled: true,
        auth: "v2_account_key",
        economic_effect: "none",
      },
      attest: {
        enabled: true,
        auth: "v2_account_key",
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
  assert.ok(
    result.reasons.includes("validator mode is not shared_quorum_preview"),
  );
  assert.ok(result.reasons.includes("quorum policy is not 3-of-5"));
});

test("rejects economic authority in the preview", () => {
  const capability = readyCapability();
  capability.economic_effect = "routing";
  capability.features.validator_rewards = true;

  const result = assessValidatorCoreCapability(capability);

  assert.equal(result.ready, false);
  assert.ok(
    result.reasons.includes("preview evidence is not explicitly non-economic"),
  );
  assert.ok(
    result.reasons.includes("validator rewards are not explicitly disabled"),
  );
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

test("accepts an immutable, signed, source-bound validator preview", () => {
  const value = readyRelease();

  assert.deepEqual(
    assessValidatorRelease(value.release, value.manifest, value.checksums),
    { ready: true, reasons: [] },
  );
});

test("rejects mutable or non-preview validator releases", () => {
  const value = readyRelease();
  value.release.immutable = false;
  value.release.prerelease = false;

  const result = assessValidatorRelease(
    value.release,
    value.manifest,
    value.checksums,
  );

  assert.equal(result.ready, false);
  assert.ok(result.reasons.includes("release is not immutable"));
  assert.ok(
    result.reasons.includes(
      "validator preview is not classified as a prerelease",
    ),
  );
});

test("rejects unsigned platform binaries", () => {
  const value = readyRelease();
  value.manifest.platform_signing.macos.notarized = false;
  value.manifest.platform_signing.windows.verified = false;

  const result = assessValidatorRelease(
    value.release,
    value.manifest,
    value.checksums,
  );

  assert.equal(result.ready, false);
  assert.ok(
    result.reasons.includes(
      "macOS Developer ID and notarization are not verified",
    ),
  );
  assert.ok(
    result.reasons.includes("Windows Authenticode identity is not verified"),
  );
});

test("rejects commit, digest, and exact-asset mismatches", () => {
  const value = readyRelease();
  value.manifest.commit = "b".repeat(40);
  value.release.assets[0].digest = `sha256:${"c".repeat(64)}`;
  value.release.assets.push({
    name: "unexpected.bin",
    digest: `sha256:${"d".repeat(64)}`,
    size: 1,
  });

  const result = assessValidatorRelease(
    value.release,
    value.manifest,
    value.checksums,
  );

  assert.equal(result.ready, false);
  assert.ok(
    result.reasons.includes(
      "validator manifest commit does not match the release",
    ),
  );
  assert.ok(
    result.reasons.includes(
      "GitHub release assets do not exactly match the validator payload",
    ),
  );
});
