const PUBLIC_STATUS_SCHEMA = "aipg.validator.public-status.v1";
const VALIDATOR_ID_RE = /^val_[A-Za-z0-9_-]{16,88}$/;
const QUALIFICATION_STATUSES = new Set([
  "unreviewed",
  "candidate",
  "verified",
  "rejected",
]);

function count(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : 0;
}

function ratio(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(1, Math.max(0, parsed)) : 0;
}

function boundedString(value, maximum = 160) {
  return typeof value === "string" && value.length <= maximum ? value : null;
}

export function isPublicValidatorId(value) {
  return typeof value === "string" && VALIDATOR_ID_RE.test(value.trim());
}

export function normalizePublicValidatorStatus(payload, requestedId) {
  const validatorId = typeof requestedId === "string" ? requestedId.trim() : "";
  if (
    payload?.schema !== PUBLIC_STATUS_SCHEMA ||
    !isPublicValidatorId(validatorId) ||
    payload?.validator_id !== validatorId ||
    payload?.economic_effect !== "none" ||
    typeof payload?.online !== "boolean"
  ) {
    return null;
  }

  const qualification = payload.qualification;
  if (
    !qualification ||
    !QUALIFICATION_STATUSES.has(qualification.status)
  ) {
    return null;
  }

  const lastHeartbeat = boundedString(payload.last_heartbeat, 40);
  if (lastHeartbeat && Number.isNaN(Date.parse(lastHeartbeat))) return null;

  return {
    schema: PUBLIC_STATUS_SCHEMA,
    validatorId,
    summary: boundedString(payload.summary, 32) || "unknown",
    registrationStatus:
      boundedString(payload.registration_status, 32) || "unknown",
    online: payload.online,
    lastHeartbeat,
    softwareVersion: boundedString(payload.software_version, 64) || "unknown",
    activity: {
      assigned: count(payload.activity?.assigned),
      completed: count(payload.activity?.completed),
      attested: count(payload.activity?.attested),
    },
    qualification: {
      status: qualification.status,
      elapsedSeconds: count(qualification.elapsed_seconds),
      minimumSeconds: count(qualification.minimum_seconds),
      remainingSeconds: count(qualification.remaining_seconds),
      sampleCoverage: ratio(qualification.sample_coverage),
      minimumSampleCoverage: ratio(qualification.minimum_sample_coverage),
      timeReady: qualification.time_ready === true,
      coverageReady: qualification.coverage_ready === true,
      heartbeatFresh: qualification.heartbeat_fresh === true,
      reviewCurrent: qualification.review_current === true,
      independentVoteEligible:
        qualification.independent_vote_eligible === true,
    },
    nextAction:
      boundedString(payload.next_action, 240) ||
      "Check the validator from its local manager.",
    economicEffect: "none",
  };
}
