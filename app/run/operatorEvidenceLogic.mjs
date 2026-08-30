const DAY_MS = 24 * 60 * 60 * 1000;
const FUTURE_SKEW_MS = 5 * 60 * 1000;

function finiteNonNegative(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

function roundAipg(value) {
  return Math.round(value * 10_000) / 10_000;
}

export function summarizePayoutEvidence(payload, now = Date.now()) {
  if (!payload || !Array.isArray(payload.periods)) return null;

  const cutoff = now - DAY_MS;
  const seen = new Set();
  let settledAipg24h = 0;
  let observedHours = 0;

  for (const period of payload.periods) {
    const paidAt = Date.parse(period?.at || "");
    const amount = finiteNonNegative(period?.aipg);
    const periodId = typeof period?.period_id === "string" ? period.period_id : "";
    if (
      !periodId.startsWith("hour-") ||
      seen.has(periodId) ||
      !Number.isFinite(paidAt) ||
      paidAt < cutoff ||
      paidAt > now + FUTURE_SKEW_MS ||
      amount === null
    ) {
      continue;
    }
    seen.add(periodId);
    settledAipg24h += amount;
    observedHours += 1;
  }

  if (!observedHours) return null;

  const totalPaid = finiteNonNegative(payload.totals?.aipg_paid);
  const workersPaid = finiteNonNegative(payload.totals?.workers_paid);
  const lastPaid = Date.parse(payload.totals?.last_paid || "");

  return {
    settledAipg24h: roundAipg(settledAipg24h),
    observedHours,
    totalAipgPaid: totalPaid === null ? null : roundAipg(totalPaid),
    workersPaid: workersPaid === null ? null : Math.floor(workersPaid),
    lastPaid: Number.isFinite(lastPaid)
      ? new Date(lastPaid).toISOString()
      : null,
  };
}

export function estimatePayoutScenario(settledAipg24h, acceptedDenSharePct) {
  const pool = finiteNonNegative(settledAipg24h);
  const share = finiteNonNegative(acceptedDenSharePct);
  if (pool === null || share === null) return null;
  return roundAipg(pool * (Math.min(100, share) / 100));
}

export function findOnlineWorker(payload, identity) {
  const query = String(identity || "").trim().toLowerCase();
  if (!query || !payload || !Array.isArray(payload.workers)) return null;

  const worker = payload.workers.find((candidate) => {
    if (!candidate || candidate.online !== true) return false;
    const id = typeof candidate.id === "string" ? candidate.id.toLowerCase() : "";
    const name =
      typeof candidate.name === "string" ? candidate.name.toLowerCase() : "";
    return query === id || query === name;
  });
  if (!worker) return null;

  return {
    id: typeof worker.id === "string" ? worker.id : "",
    name: typeof worker.name === "string" ? worker.name : "",
    models: Array.isArray(worker.models)
      ? worker.models.filter((model) => typeof model === "string").slice(0, 20)
      : [],
    jobTypes: Array.isArray(worker.job_types)
      ? worker.job_types.filter((type) => typeof type === "string").slice(0, 10)
      : [],
  };
}
