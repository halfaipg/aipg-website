const NETWORK_STATUS_SCHEMA = "aipg.network.status.v1";

function count(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : 0;
}

export function normalizeValidatorCohortStatus(payload, currentVersion) {
  if (
    payload?.schema !== NETWORK_STATUS_SCHEMA ||
    !payload?.validators ||
    typeof currentVersion !== "string" ||
    !currentVersion
  ) {
    return null;
  }

  const validators = payload.validators;
  const versions = Array.isArray(validators.software_versions)
    ? validators.software_versions
        .filter(
          (item) =>
            typeof item?.version === "string" &&
            item.version &&
            Number.isFinite(Number(item.validators)) &&
            Number(item.validators) > 0,
        )
        .map((item) => ({
          version: item.version,
          validators: count(item.validators),
        }))
        .sort((left, right) =>
          left.version === currentVersion
            ? -1
            : right.version === currentVersion
              ? 1
              : left.version.localeCompare(right.version),
        )
    : [];

  return {
    generatedAt:
      typeof payload.generated_at === "string" ? payload.generated_at : null,
    registeredActive: count(validators.registered_active),
    heartbeatFresh: count(validators.heartbeat_fresh),
    participating: count(validators.participating),
    verifiedIndependent: count(validators.verified_independent),
    independenceProven: validators.independence_proven === true,
    assignmentsCompleted: count(validators.assignments_completed),
    economicEffect:
      validators.economic_effect === "none"
        ? "none"
        : "unavailable",
    versions,
    currentVersion,
    currentVersionCount:
      versions.find((item) => item.version === currentVersion)?.validators || 0,
    olderVersionCount: versions
      .filter((item) => item.version !== currentVersion)
      .reduce((total, item) => total + item.validators, 0),
  };
}
