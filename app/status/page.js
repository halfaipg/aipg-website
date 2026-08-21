import {
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
  FiCpu,
  FiDollarSign,
  FiServer,
  FiShield,
  FiUsers,
} from "react-icons/fi";

const GRID_API = (
  process.env.GRID_API_URL || "https://api.aipowergrid.io"
).replace(/\/$/, "");

export const metadata = {
  title: "Network Status | AI Power Grid",
  description:
    "Current AI Power Grid worker capacity, validator preview health, payouts, charging mode, and operational incidents.",
};

function finite(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function text(value, fallback = "Unknown") {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function statusShape(value) {
  if (!value || typeof value !== "object") return null;
  if (value.schema !== "aipg.network.status.v1") return null;
  if (!value.capacity || !Array.isArray(value.capacity.models)) return null;
  return value;
}

async function getNetworkStatus() {
  try {
    const response = await fetch(`${GRID_API}/v1/status/network`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    return statusShape(await response.json());
  } catch {
    return null;
  }
}

function dateTime(value) {
  if (!value) return "Not available";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(date);
}

function percent(value) {
  if (value === null || value === undefined) return "Not enough data";
  return `${Math.round(finite(value) * 100)}%`;
}

function chargingLabel(mode) {
  if (mode === "on") return "Global charging";
  if (mode === "allowlist") return "Canary allowlist";
  return "Metering preview";
}

function Summary({ icon: Icon, label, value, note, tone = "text-cyan-300" }) {
  return (
    <div className="border border-white/10 bg-[#111214] p-5">
      <div className={`mb-4 flex items-center gap-2 text-sm font-semibold ${tone}`}>
        <Icon aria-hidden="true" /> {label}
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-gray-400">{note}</p>
    </div>
  );
}

export default async function StatusPage() {
  const network = await getNetworkStatus();

  if (!network) {
    return (
      <main className="min-h-[70vh] bg-black px-6 py-20 text-white md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-orange-300">
            <FiActivity aria-hidden="true" /> Network status
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Live status feed unavailable
          </h1>
          <p className="mt-5 max-w-2xl leading-7 text-gray-400">
            The aggregate status endpoint is not responding yet. This does not
            by itself mean generation is offline. Check the products directly
            or return shortly while the feed reconnects.
          </p>
          <a
            href="https://discord.gg/W9D8j6HCtC"
            className="mt-8 inline-flex min-h-12 items-center border border-white/20 px-5 font-semibold hover:bg-white/10"
          >
            Check community updates
          </a>
        </div>
      </main>
    );
  }

  const capacity = network.capacity;
  const validators = network.validators;
  const payouts = network.payouts;
  const incidents = Array.isArray(network.incidents) ? network.incidents : [];
  const advisories = Array.isArray(network.advisories) ? network.advisories : [];
  const operational = network.status === "operational";

  return (
    <main className="bg-black text-white">
      <section className="border-b border-white/10 bg-[#0b0c0e] px-6 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-300">
                <FiActivity aria-hidden="true" /> Network status
              </p>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                AI Power Grid is {operational ? "operational" : "degraded"}
              </h1>
              <p className="mt-4 max-w-2xl leading-7 text-gray-400">
                Current coordinator health, serving capacity, validator preview
                evidence, charging posture, and public worker payouts.
              </p>
            </div>
            <div className="flex items-center gap-3 border border-white/10 bg-black px-4 py-3 text-sm">
              {operational ? (
                <FiCheckCircle className="text-green-400" aria-hidden="true" />
              ) : (
                <FiAlertTriangle className="text-orange-400" aria-hidden="true" />
              )}
              <span>
                Updated {dateTime(network.generated_at)} UTC
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 px-6 py-12 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Summary
            icon={FiServer}
            label="Workers online"
            value={finite(capacity.workers_online)}
            note={`${finite(capacity.models_online)} serving model entries`}
          />
          <Summary
            icon={FiCpu}
            label="Model redundancy"
            value={`${Math.max(0, finite(capacity.models_online) - (capacity.models_below_target?.length || 0))}/${finite(capacity.models_online)}`}
            note={`At or above the ${finite(capacity.redundancy_target, 3)}-worker target`}
            tone="text-orange-300"
          />
          <Summary
            icon={FiUsers}
            label="Validator preview"
            value={validators ? finite(validators.heartbeat_fresh) : "Unavailable"}
            note={
              validators?.independence_proven
                ? "Independent operator threshold proven"
                : "Independent operator threshold not yet proven"
            }
            tone="text-green-300"
          />
          <Summary
            icon={FiDollarSign}
            label="Worker payouts"
            value={payouts ? `${finite(payouts.aipg_paid).toLocaleString()} AIPG` : "Unavailable"}
            note={payouts ? `${finite(payouts.payouts)} verified payout transfers` : "Public totals unavailable"}
            tone="text-yellow-300"
          />
        </div>
      </section>

      <section className="border-b border-white/10 px-6 py-14 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-bold uppercase text-cyan-400">Capacity</p>
              <h2 className="text-3xl font-bold">Serving models</h2>
            </div>
            <p className="text-sm text-gray-400">
              Redundancy target: {finite(capacity.redundancy_target, 3)} independent serving workers
            </p>
          </div>
          <div className="overflow-x-auto border border-white/10">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead className="bg-[#111214] text-gray-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">Model</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Workers</th>
                  <th className="px-4 py-3 font-semibold">Readiness</th>
                  <th className="px-4 py-3 font-semibold">Capabilities</th>
                </tr>
              </thead>
              <tbody>
                {capacity.models.map((model) => {
                  const workers = finite(model.workers);
                  const ready = workers >= finite(capacity.redundancy_target, 3);
                  return (
                    <tr key={`${model.name}-${model.type}`} className="border-t border-white/10">
                      <td className="px-4 py-4 font-semibold text-white">{text(model.name)}</td>
                      <td className="px-4 py-4 capitalize text-gray-300">{text(model.type)}</td>
                      <td className="px-4 py-4 tabular-nums text-gray-200">{workers}</td>
                      <td className={`px-4 py-4 font-semibold ${ready ? "text-green-400" : "text-orange-300"}`}>
                        {ready ? "Redundant" : "Needs operators"}
                      </td>
                      <td className="px-4 py-4 text-gray-400">
                        {Array.isArray(model.capabilities) && model.capabilities.length
                          ? model.capabilities.join(", ")
                          : "standard"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b0c0e] px-6 py-14 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-bold uppercase text-green-400">Validators</p>
            <h2 className="text-3xl font-bold">Evidence preview</h2>
            <dl className="mt-7 divide-y divide-white/10 border-y border-white/10 text-sm">
              {[
                ["Registered active", validators ? finite(validators.registered_active) : "Unavailable"],
                ["Fresh heartbeats", validators ? finite(validators.heartbeat_fresh) : "Unavailable"],
                ["Assignments completed", validators ? finite(validators.assignments_completed) : "Unavailable"],
                ["Agreement rate", validators ? percent(validators.agreement_rate) : "Unavailable"],
                ["Disputed rate", validators ? percent(validators.disputed_rate) : "Unavailable"],
                ["Economic effect", text(validators?.economic_effect, "None")],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-6 py-4">
                  <dt className="text-gray-400">{label}</dt>
                  <dd className="text-right font-semibold text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="mb-2 text-sm font-bold uppercase text-yellow-400">Economy</p>
            <h2 className="text-3xl font-bold">Current posture</h2>
            <dl className="mt-7 divide-y divide-white/10 border-y border-white/10 text-sm">
              {[
                ["Charging", chargingLabel(network.charging?.mode)],
                ["Global charging", network.charging?.global ? "Enabled" : "Not enabled"],
                ["Workers paid", payouts ? finite(payouts.workers_paid) : "Unavailable"],
                ["Last payout", payouts ? `${dateTime(payouts.last_paid)} UTC` : "Unavailable"],
                ["Coordinator federation", network.architecture?.coordinator_federated ? "Live" : "Not live"],
                ["Validator staking", network.architecture?.staking_required ? "Required" : "Not required"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-6 py-4">
                  <dt className="text-gray-400">{label}</dt>
                  <dd className="text-right font-semibold text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <FiAlertTriangle className="text-orange-400" aria-hidden="true" /> Incidents
            </h2>
            <div className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {incidents.length ? (
                incidents.map((incident) => (
                  <div key={text(incident.code)} className="py-4">
                    <p className="font-semibold text-white">{text(incident.summary)}</p>
                    <p className="mt-1 text-sm capitalize text-gray-400">
                      {text(incident.component)} · {text(incident.severity)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="py-4 text-sm text-gray-400">No current component incidents reported.</p>
              )}
            </div>
            {!network.incident_history_available ? (
              <p className="mt-3 text-xs leading-5 text-gray-500">
                This feed reports current component state; historical incident reporting is not live yet.
              </p>
            ) : null}
          </div>
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <FiShield className="text-cyan-400" aria-hidden="true" /> Advisories
            </h2>
            <div className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {advisories.length ? (
                advisories.map((advisory) => (
                  <div key={text(advisory.code)} className="py-4">
                    <p className="font-semibold text-white">{text(advisory.summary)}</p>
                    <p className="mt-1 text-sm text-gray-400">
                      {Array.isArray(advisory.affected_models) && advisory.affected_models.length
                        ? `${advisory.affected_models.length} model entries affected`
                        : "Network maturity notice"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="py-4 text-sm text-gray-400">No current network advisories.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
