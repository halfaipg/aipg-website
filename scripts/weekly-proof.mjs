#!/usr/bin/env node

import { pathToFileURL } from "node:url";

import { normalizeMediaQualificationStatus } from "../app/run/qualificationStatus.mjs";

const GRID_API = "https://api.aipowergrid.io";
export const INTEGRATION_PULL_REQUESTS = [
  { id: "litellm", name: "LiteLLM", repo: "BerriAI/litellm", number: 38725 },
  { id: "dify", name: "Dify", repo: "langgenius/dify-plugins", number: 2986 },
  { id: "vercel-ai", name: "Vercel AI SDK", repo: "vercel/ai", number: 20003 },
  { id: "elizaos", name: "ElizaOS", repo: "elizaOS/eliza", number: 29964 },
  { id: "langchain", name: "LangChain", repo: "langchain-ai/docs", number: 5770 },
].map((item) => ({
  ...item,
  apiUrl: `https://api.github.com/repos/${item.repo}/pulls/${item.number}`,
  url: `https://github.com/${item.repo}/pull/${item.number}`,
}));
const WORKER_RELEASE_API =
  "https://api.github.com/repos/AIPowerGrid/grid-text-worker/releases/latest";
const WORKER_RELEASES_URL =
  "https://github.com/AIPowerGrid/grid-text-worker/releases";
const MEDIA_QUALIFICATION_STATUS_URL =
  "https://raw.githubusercontent.com/AIPowerGrid/grid-media-worker/main/docs/qualification-status.json";
const MEDIA_QUALIFICATION_COHORT_URL =
  "https://github.com/AIPowerGrid/grid-media-worker/issues/8";
const RUN_URL = "https://aipowergrid.io/run";
const NPM_PACKAGES = [
  "@aipowergrid/ai-sdk-provider",
  "@aipowergrid/plugin-aipg",
  "@aipowergrid/n8n-nodes-aipg",
  "@aipowergrid/mcp",
];

const INTEGER = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const DECIMAL = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

async function fetchJson(url, fetcher = fetch) {
  const response = await fetcher(url, {
    headers: { Accept: "application/json", "User-Agent": "aipg-weekly-proof" },
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`${new URL(url).pathname} returned ${response.status}`);
  return response.json();
}

function finite(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) throw new Error(`${label} is invalid`);
  return number;
}

function jobsIn(bucket, label) {
  if (!bucket || typeof bucket !== "object" || Array.isArray(bucket)) {
    throw new Error(`${label} totals are invalid`);
  }
  return Object.values(bucket).reduce((sum, row) => {
    if (!row || typeof row !== "object") throw new Error(`${label} row is invalid`);
    return sum + finite(row.jobs, `${label} jobs`);
  }, 0);
}

function payoutWindow(periods, now) {
  if (!Array.isArray(periods)) throw new Error("payout periods are invalid");
  const since = now.getTime() - 7 * 24 * 60 * 60 * 1_000;
  return periods.reduce(
    (total, period) => {
      const at = Date.parse(period?.at || "");
      if (!Number.isFinite(at) || at < since || at > now.getTime()) return total;
      total.aipg += finite(period.aipg, "period AIPG");
      total.transfers += finite(period.payouts, "period payouts");
      total.periods += 1;
      return total;
    },
    { aipg: 0, transfers: 0, periods: 0 },
  );
}

function integrationState(pull, expected) {
  const mergedAt = pull?.merged_at;
  const validMergedAt =
    mergedAt === null ||
    (typeof mergedAt === "string" && Number.isFinite(Date.parse(mergedAt)));
  if (
    !pull ||
    typeof pull !== "object" ||
    pull.number !== expected.number ||
    pull.base?.repo?.full_name !== expected.repo ||
    pull.html_url !== expected.url ||
    !["open", "closed"].includes(pull.state) ||
    !validMergedAt ||
    (pull.state === "open" && mergedAt !== null)
  ) {
    throw new Error(`${expected.name} upstream PR evidence is invalid`);
  }
  if (mergedAt) return { key: "merged", label: "merged" };
  if (pull.state === "open") return { key: "open", label: "open for maintainer review" };
  return { key: "closed", label: "closed without merge" };
}

function listNames(names) {
  if (names.length === 1) return names[0];
  if (names.length === 2) return names.join(" and ");
  return `${names.slice(0, -1).join(", ")}, and ${names.at(-1)}`;
}

function integrationSummary(rows) {
  const labels = {
    merged: "merged",
    open: "open",
    closed: "closed without merge",
  };
  return ["merged", "open", "closed"]
    .map((key) => {
      const names = rows.filter((row) => row.state.key === key).map((row) => row.name);
      return names.length ? `${listNames(names)} ${labels[key]}` : null;
    })
    .filter(Boolean)
    .join("; ");
}

function packageVersion(payload, expectedName) {
  if (
    payload?.name !== expectedName ||
    typeof payload.version !== "string" ||
    !/^[0-9]+\.[0-9]+\.[0-9]+(?:[-+][0-9A-Za-z.-]+)?$/.test(payload.version)
  ) {
    throw new Error(`${expectedName} npm release is invalid`);
  }
  return payload.version;
}

function workerReleaseTag(release) {
  if (
    release?.draft !== false ||
    release?.prerelease !== false ||
    release?.immutable !== true ||
    !/^v[0-9]+\.[0-9]+\.[0-9]+$/.test(release?.tag_name || "")
  ) {
    throw new Error("text-worker release is not immutable and stable");
  }
  return release.tag_name;
}

export function buildWeeklyProof(
  {
    network,
    totals,
    payouts,
    integrations,
    workerRelease,
    mediaQualification,
    packages,
  },
  now = new Date(),
) {
  if (network?.schema !== "aipg.network.status.v1") {
    throw new Error("network status schema is invalid");
  }
  const capacity = network.capacity;
  const validators = network.validators;
  const payoutTotals = payouts?.totals;
  if (!capacity || !validators || !payoutTotals) throw new Error("proof source is incomplete");

  const workers = finite(capacity.workers_online, "workers online");
  const models = finite(capacity.models_online, "models online");
  const jobs24h = jobsIn(totals?.day, "24-hour");
  const jobs30d = jobsIn(totals?.month, "30-day");
  const allAipg = finite(payoutTotals.aipg_paid, "all-time AIPG paid");
  const allTransfers = finite(payoutTotals.payouts, "all-time payouts");
  const paidWallets = finite(payoutTotals.workers_paid, "paid wallets");
  const week = payoutWindow(payouts.periods, now);
  if (week.periods < 7 * 24 - 2) {
    throw new Error("public payout window does not cover the past seven days");
  }

  const registered = finite(validators.registered_active, "registered validators");
  const fresh = finite(validators.heartbeat_fresh, "fresh validators");
  const assignments = finite(validators.assignments_completed, "validator assignments");
  const agreement = finite(validators.agreement_rate, "validator agreement") * 100;
  const independent = finite(validators.verified_independent, "independent validators");
  const modelRows = Array.isArray(capacity.models) ? capacity.models : [];
  const modalities = [...new Set(modelRows.map((row) => row?.type).filter(Boolean))].sort();
  if (!modalities.length) throw new Error("live modalities are unavailable");
  if (!Array.isArray(capacity.models_below_target)) {
    throw new Error("redundancy evidence is unavailable");
  }
  const belowTarget = capacity.models_below_target.length;
  const workerTag = workerReleaseTag(workerRelease);
  const mediaStatus = normalizeMediaQualificationStatus(mediaQualification);
  if (!mediaStatus) throw new Error("media qualification status is invalid");
  const mediaNeeds = mediaStatus.classes
    .filter((item) => item.status === "needed")
    .map((item) => item.id);
  const mediaSupply = mediaNeeds.length
    ? `Media qualification still needs ${mediaNeeds.join(", ")} evidence; the tool is benchmark-only and earns no rewards.`
    : "Media hardware evidence is complete, but the managed release remains subject to its signing and staging gates.";
  const packageRows = Object.fromEntries(
    NPM_PACKAGES.map((name) => [name, packageVersion(packages?.[name], name)]),
  );
  const integrationRows = INTEGRATION_PULL_REQUESTS.map((expected) => ({
    ...expected,
    state: integrationState(integrations?.[expected.id], expected),
  }));

  const date = now.toISOString().slice(0, 10);
  const upstreamSummary = integrationSummary(integrationRows);
  const posts = [
    `AIPG weekly proof: ${INTEGER.format(workers)} workers are serving ${INTEGER.format(models)} live models across ${modalities.join(", ")}. The public ledger recorded ${INTEGER.format(jobs24h)} jobs in 24h and ${INTEGER.format(jobs30d)} in 30d. Live status: ${network.status}. https://aipowergrid.io/status`,
    `Worker payouts: ${DECIMAL.format(week.aipg)} AIPG across ${INTEGER.format(week.transfers)} Base transfers in the past 7 days. All time: ${DECIMAL.format(allAipg)} AIPG, ${INTEGER.format(allTransfers)} transfers, ${INTEGER.format(paidWallets)} payout wallets. Verify: https://console.aipowergrid.io/transparency`,
    `Validator preview: ${INTEGER.format(fresh)}/${INTEGER.format(registered)} active validators are fresh, with ${INTEGER.format(assignments)} completed assignments and ${DECIMAL.format(agreement)}% agreement. Honest caveat: ${INTEGER.format(independent)} independently verified operators and no routing, reward, strike, or slashing authority yet.`,
    `Integration proof: AI SDK ${packageRows["@aipowergrid/ai-sdk-provider"]}, ElizaOS ${packageRows["@aipowergrid/plugin-aipg"]}, n8n ${packageRows["@aipowergrid/n8n-nodes-aipg"]}, and MCP ${packageRows["@aipowergrid/mcp"]} live on npm. Upstream PRs: ${upstreamSummary}. https://aipowergrid.io/docs/integrations`,
    `GPU supply: verified Linux text worker ${workerTag} is live; ${INTEGER.format(belowTarget)} routes are below the 3-worker target. ${mediaSupply} ${RUN_URL}`,
  ];
  for (const [index, post] of posts.entries()) {
    if (post.length > 280) throw new Error(`post ${index + 1} exceeds 280 characters`);
  }

  return `# AIPG weekly proof draft - ${date}

> Generated from public, read-only sources. Review the wording and live links before publishing. Do not remove the validator caveat.

## Post thread

${posts.map((post, index) => `### ${index + 1}/${posts.length}\n\n${post}`).join("\n\n")}

## Evidence snapshot

| Metric | Public value |
| --- | ---: |
| Workers online | ${INTEGER.format(workers)} |
| Models online | ${INTEGER.format(models)} |
| Modalities | ${modalities.join(", ")} |
| Jobs, rolling 24h | ${INTEGER.format(jobs24h)} |
| Jobs, rolling 30d | ${INTEGER.format(jobs30d)} |
| AIPG paid, rolling 7d | ${DECIMAL.format(week.aipg)} |
| Base payout transfers, rolling 7d | ${INTEGER.format(week.transfers)} |
| AIPG paid, all time | ${DECIMAL.format(allAipg)} |
| Validator heartbeats fresh | ${INTEGER.format(fresh)} / ${INTEGER.format(registered)} |
| Validator assignments completed | ${INTEGER.format(assignments)} |
| Validator agreement | ${DECIMAL.format(agreement)}% |
| Independently verified validator operators | ${INTEGER.format(independent)} |
| Validator economic effect | ${validators.economic_effect || "unknown"} |
${integrationRows.map((row) => `| ${row.name} upstream PR | ${row.state.label} |`).join("\n")}
| Verified Linux text worker | ${workerTag} |
| Models below redundancy target | ${INTEGER.format(belowTarget)} |
| Media qualification classes still needed | ${mediaNeeds.length ? mediaNeeds.join(", ") : "none"} |
| Media qualification release ready | ${mediaStatus.releaseReady ? "yes" : "no"} |
| Vercel AI SDK package | ${packageRows["@aipowergrid/ai-sdk-provider"]} |
| ElizaOS package | ${packageRows["@aipowergrid/plugin-aipg"]} |
| n8n package | ${packageRows["@aipowergrid/n8n-nodes-aipg"]} |
| MCP package | ${packageRows["@aipowergrid/mcp"]} |

## Sources

- [Network status](${GRID_API}/v1/status/network)
- [Generation totals](${GRID_API}/v1/stats/totals)
- [Public Base payouts](${GRID_API}/v1/payouts/public?limit=200)
${integrationRows.map((row) => `- [${row.name} upstream PR](${row.url})`).join("\n")}
- [Integration quickstarts](https://aipowergrid.io/docs/integrations)
- [Text-worker releases](${WORKER_RELEASES_URL})
- [Media qualification status](${MEDIA_QUALIFICATION_STATUS_URL})
- [Media qualification cohort](${MEDIA_QUALIFICATION_COHORT_URL})
- [Worker onboarding](${RUN_URL})
`;
}

export async function generateWeeklyProof(fetcher = fetch, now = new Date()) {
  const [
    network,
    totals,
    payouts,
    workerRelease,
    mediaQualification,
    integrationPayloads,
    packagePayloads,
  ] = await Promise.all([
      fetchJson(`${GRID_API}/v1/status/network`, fetcher),
      fetchJson(`${GRID_API}/v1/stats/totals`, fetcher),
      fetchJson(`${GRID_API}/v1/payouts/public?limit=200`, fetcher),
      fetchJson(WORKER_RELEASE_API, fetcher),
      fetchJson(MEDIA_QUALIFICATION_STATUS_URL, fetcher),
      Promise.all(
        INTEGRATION_PULL_REQUESTS.map((item) => fetchJson(item.apiUrl, fetcher)),
      ),
      Promise.all(NPM_PACKAGES.map((name) =>
        fetchJson(
          `https://registry.npmjs.org/${name.replace("/", "%2F")}/latest`,
          fetcher,
        ),
      )),
    ]);
  const integrations = Object.fromEntries(
    INTEGRATION_PULL_REQUESTS.map((item, index) => [item.id, integrationPayloads[index]]),
  );
  const packages = Object.fromEntries(
    NPM_PACKAGES.map((name, index) => [name, packagePayloads[index]]),
  );
  return buildWeeklyProof(
    {
      network,
      totals,
      payouts,
      integrations,
      workerRelease,
      mediaQualification,
      packages,
    },
    now,
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  generateWeeklyProof()
    .then((proof) => process.stdout.write(proof))
    .catch((error) => {
      console.error(`weekly proof generation failed: ${error.message}`);
      process.exitCode = 1;
    });
}
