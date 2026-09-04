const DEFAULT_REDUNDANCY_TARGET = 3;
const RUN_URL = "https://aipowergrid.io/run";

export function summarizeRouteCoverage(opportunities, workerType) {
  const allowedTypes =
    workerType === "text"
      ? new Set(["text"])
      : workerType === "media"
        ? new Set(["image", "video", "audio"])
        : null;
  if (!allowedTypes || !Array.isArray(opportunities)) {
    return "Live route coverage is unavailable; no demand claim is being made.";
  }

  const routes = opportunities
    .filter(
      (item) =>
        allowedTypes.has(item?.type) &&
        typeof item.name === "string" &&
        item.name.trim() &&
        Number.isInteger(Number(item.workers)) &&
        Number(item.workers) > 0,
    )
    .map((item) => ({
      name: item.name.trim(),
      workers: Number(item.workers),
      jobs30d: Number(item.jobs30d),
      acceptedDen30d: Number(item.acceptedDen30d),
      type: item.type,
    }));
  if (!routes.length) {
    return "No active compatible routes were present in the latest network snapshot.";
  }

  if (workerType === "text") {
    const priority = selectTextRoutePriority(routes);
    if (priority) {
      return `${priority.name}: ${priority.workers} serving, target 3; ${Math.round(
        priority.jobs30d,
      ).toLocaleString("en-US")} completed jobs in the last 30 days.`;
    }
  }

  const underTarget = routes.filter((item) => item.workers < 3).length;
  return `${routes.length} active ${workerType} route${
    routes.length === 1 ? "" : "s"
  }; ${underTarget} below the 3-worker redundancy target.`;
}

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
