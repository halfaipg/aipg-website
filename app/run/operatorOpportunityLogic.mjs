const DEFAULT_REDUNDANCY_TARGET = 3;

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
    }))
    .filter(
      (item) =>
        item.name &&
        Number.isInteger(item.workers) &&
        item.workers > 0 &&
        item.workers < target &&
        Number.isFinite(item.jobs30d) &&
        item.jobs30d >= 0,
    )
    .map((item) => ({
      ...item,
      missingReplicas: target - item.workers,
    }))
    .sort(
      (left, right) =>
        right.jobs30d * right.missingReplicas -
          left.jobs30d * left.missingReplicas ||
        right.missingReplicas - left.missingReplicas ||
        right.jobs30d - left.jobs30d ||
        left.name.localeCompare(right.name),
    );

  return candidates[0] || null;
}
