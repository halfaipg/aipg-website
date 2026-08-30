const DEFAULT_REDUNDANCY_TARGET = 3;
const RUN_URL = "https://aipowergrid.io/run";

export function buildTextRouteShare(route) {
  const name = typeof route?.name === "string" ? route.name.trim() : "";
  const workers = Number(route?.workers);
  const missingReplicas = Number(route?.missingReplicas);
  if (
    !name ||
    name.length > 80 ||
    !Number.isInteger(workers) ||
    workers < 1 ||
    !Number.isInteger(missingReplicas) ||
    missingReplicas < 1
  ) {
    return null;
  }

  const target = workers + missingReplicas;
  return `Independent GPU operators wanted for AI Power Grid. Current text route: ${name} (${workers} serving, target ${target}). Historical workload is not an earnings forecast. Start: ${RUN_URL}`;
}

export function selectTextRoutePriority(
  opportunities,
  redundancyTarget = DEFAULT_REDUNDANCY_TARGET,
) {
  const target = Number(redundancyTarget);
  if (!Array.isArray(opportunities) || !Number.isInteger(target) || target < 1) {
    return null;
  }

  const candidates = opportunities
    .filter((item) => item?.type === "text" && typeof item.name === "string")
    .map((item) => ({
      name: item.name.trim(),
      workers: Number(item.workers),
      jobs30d: Number(item.jobs30d),
      acceptedDen30d: Number(item.acceptedDen30d),
    }))
    .filter(
      (item) =>
        item.name &&
        Number.isInteger(item.workers) &&
        item.workers > 0 &&
        item.workers < target &&
        Number.isFinite(item.jobs30d) &&
        item.jobs30d >= 0 &&
        Number.isFinite(item.acceptedDen30d) &&
        item.acceptedDen30d >= 0,
    )
    .map((item) => ({
      ...item,
      missingReplicas: target - item.workers,
    }))
    .sort(
      (left, right) =>
        right.acceptedDen30d * right.missingReplicas -
          left.acceptedDen30d * left.missingReplicas ||
        right.missingReplicas - left.missingReplicas ||
        right.acceptedDen30d - left.acceptedDen30d ||
        right.jobs30d - left.jobs30d ||
        left.name.localeCompare(right.name),
    );

  return candidates[0] || null;
}
