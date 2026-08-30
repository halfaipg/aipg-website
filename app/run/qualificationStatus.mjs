const STATUS_SCHEMA = "aipg-media-manager-qualification-status-v1";
const REQUIRED_CLASSES = ["minimum", "midrange", "datacenter"];
const SHA256 = /^[0-9a-f]{64}$/;
const RELEASE_TAG = /^manager-qualification-v\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/;
const TRUSTED_PREFIX = "https://github.com/AIPowerGrid/grid-media-worker/";

function count(value) {
  return Number.isInteger(value) && value >= 0 ? value : null;
}

function trustedUrl(value) {
  return typeof value === "string" && value.startsWith(TRUSTED_PREFIX)
    ? value
    : null;
}

export function normalizeMediaQualificationStatus(payload) {
  if (
    payload?.schema !== STATUS_SCHEMA ||
    typeof payload?.profile?.id !== "string" ||
    !payload.profile.id ||
    typeof payload.profile.version !== "string" ||
    !payload.profile.version ||
    !SHA256.test(payload.profile.digest || "") ||
    !RELEASE_TAG.test(payload?.qualification_release?.tag || "") ||
    !Number.isInteger(payload.runs_per_evidence_set) ||
    payload.runs_per_evidence_set <= 0 ||
    !Array.isArray(payload.classes) ||
    payload.classes.length !== REQUIRED_CLASSES.length
  ) {
    return null;
  }

  const classes = payload.classes.map((item, index) => {
    const accepted = count(item?.accepted_evidence_sets);
    const required = count(item?.required_evidence_sets);
    const expectedStatus =
      accepted !== null && required !== null && required > 0 && accepted >= required
        ? "complete"
        : "needed";
    if (
      item?.id !== REQUIRED_CLASSES[index] ||
      accepted === null ||
      required === null ||
      required === 0 ||
      item.status !== expectedStatus
    ) {
      return null;
    }
    return { id: item.id, accepted, required, status: item.status };
  });

  if (classes.some((item) => item === null)) return null;

  const releaseUrl = trustedUrl(payload.qualification_release.url);
  const participationUrl = trustedUrl(payload.participation_url);
  const cohortUrl = trustedUrl(payload.cohort_url);
  const runbookUrl = trustedUrl(payload.runbook_url);
  const allComplete = classes.every((item) => item.status === "complete");
  if (
    !releaseUrl ||
    !releaseUrl.endsWith(`/${payload.qualification_release.tag}`) ||
    !participationUrl ||
    !cohortUrl ||
    !runbookUrl ||
    payload.release_ready !== allComplete
  ) {
    return null;
  }

  const updatedAt = Date.parse(payload.updated_at || "");
  if (!Number.isFinite(updatedAt)) return null;

  return {
    profileId: payload.profile.id,
    profileVersion: payload.profile.version,
    profileDigest: payload.profile.digest,
    qualificationTag: payload.qualification_release.tag,
    releaseUrl,
    runsPerEvidenceSet: payload.runs_per_evidence_set,
    classes,
    releaseReady: allComplete,
    updatedAt: new Date(updatedAt).toISOString(),
    participationUrl,
    cohortUrl,
    runbookUrl,
  };
}
