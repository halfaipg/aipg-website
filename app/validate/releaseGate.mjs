const REQUIRED_ENDPOINTS = ["assignments", "targeted_probe", "attest"];

export function assessValidatorCoreCapability(payload) {
  const reasons = [];
  const features = payload?.features || {};
  const policy = payload?.quorum_policy || {};
  const endpoints = payload?.endpoints || {};

  if (payload?.validator_api_version !== "v1-preview") {
    reasons.push("validator API version is not v1-preview");
  }
  if (payload?.mode !== "shared_quorum_preview") {
    reasons.push("validator mode is not shared_quorum_preview");
  }
  if (payload?.economic_effect !== "none") {
    reasons.push("preview evidence is not explicitly non-economic");
  }
  if (payload?.targeted_probe_enabled !== true) {
    reasons.push("targeted probing is not enabled");
  }

  for (const feature of ["assignments", "targeted_probe", "quorum"]) {
    if (features[feature] !== true) {
      reasons.push(`${feature} capability is not enabled`);
    }
  }
  if (features.validator_rewards !== false) {
    reasons.push("validator rewards are not explicitly disabled");
  }
  if (features.staking_required !== false) {
    reasons.push("validator staking is not explicitly disabled");
  }

  if (policy.threshold !== 3 || policy.target_validators !== 5) {
    reasons.push("quorum policy is not 3-of-5");
  }
  if (typeof policy.operator_independence_proven !== "boolean") {
    reasons.push("operator-independence state is missing");
  }

  for (const endpoint of REQUIRED_ENDPOINTS) {
    const contract = endpoints[endpoint] || {};
    if (
      contract.enabled !== true ||
      contract.auth !== "v2_account_key" ||
      contract.economic_effect !== "none"
    ) {
      reasons.push(`${endpoint} endpoint contract is incomplete`);
    }
  }

  return { ready: reasons.length === 0, reasons };
}
