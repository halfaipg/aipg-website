"use client";

import { useMemo, useState } from "react";
import {
  FiActivity,
  FiCheckCircle,
  FiExternalLink,
  FiRefreshCw,
  FiTrendingUp,
} from "react-icons/fi";
import {
  estimatePayoutScenario,
  findOnlineWorker,
} from "./operatorEvidenceLogic.mjs";

const GRID_WORKERS_URL = "https://api.aipowergrid.io/v1/workers";

function formatAipg(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
  }).format(value);
}

function formatTime(value) {
  if (!value) return "Unavailable";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function OperatorEvidence({ payoutEvidence }) {
  const [share, setShare] = useState(1);
  const [identity, setIdentity] = useState("");
  const [workerState, setWorkerState] = useState({ status: "idle" });
  const scenario = useMemo(
    () =>
      payoutEvidence
        ? estimatePayoutScenario(payoutEvidence.settledAipg24h, share)
        : null,
    [payoutEvidence, share],
  );

  async function checkWorker(event) {
    event.preventDefault();
    const query = identity.trim();
    if (!query || query.length > 120) {
      setWorkerState({
        status: "invalid",
        message: "Enter the exact worker name or ID printed by the worker app.",
      });
      return;
    }

    setWorkerState({ status: "checking" });
    try {
      const response = await fetch(GRID_WORKERS_URL, { cache: "no-store" });
      if (!response.ok) throw new Error("registry unavailable");
      const match = findOnlineWorker(await response.json(), query);
      setWorkerState(
        match
          ? { status: "online", worker: match }
          : {
              status: "offline",
              message:
                "Not visible in the current public online registry. Check the local worker log and try again after its Grid connection succeeds.",
            },
      );
    } catch {
      setWorkerState({
        status: "error",
        message:
          "The public worker registry could not be reached. This does not prove your worker is offline.",
      });
    }
  }

  return (
    <section className="border-y border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-8 lg:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase text-green-400">
            Public operator proof
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            Check the rail before you commit a GPU
          </h2>
          <p className="mt-4 leading-7 text-gray-400">
            Verify that workers are visible and payouts are settling. The Grid
            does not turn hardware specs or historical demand into guaranteed
            earnings.
          </p>
        </div>

        <div className="grid border border-white/10 lg:grid-cols-2">
          <div className="border-b border-white/10 p-6 md:p-8 lg:border-b-0 lg:border-r">
            <p className="flex items-center gap-2 text-sm font-bold uppercase text-orange-300">
              <FiTrendingUp aria-hidden="true" /> Payout scenario
            </p>
            {payoutEvidence ? (
              <>
                <dl className="mt-6 grid grid-cols-2 gap-5">
                  <div>
                    <dt className="text-xs text-gray-500">
                      Settled pool, rolling 24h
                    </dt>
                    <dd className="mt-2 text-2xl font-bold text-white">
                      {formatAipg(payoutEvidence.settledAipg24h)} AIPG
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-500">Observed periods</dt>
                    <dd className="mt-2 text-2xl font-bold text-white">
                      {payoutEvidence.observedHours} hourly settlements
                    </dd>
                  </div>
                </dl>

                <label className="mt-7 block">
                  <span className="flex items-center justify-between gap-4 text-sm font-semibold">
                    Hypothetical share of accepted den
                    <span className="font-mono text-orange-300">
                      {share.toFixed(1)}%
                    </span>
                  </span>
                  <input
                    aria-label="Hypothetical share of accepted den"
                    type="range"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={share}
                    onChange={(event) => setShare(Number(event.target.value))}
                    className="mt-4 w-full accent-orange-500"
                  />
                </label>

                <div className="mt-6 border-l-2 border-orange-400 bg-orange-400/5 px-5 py-4">
                  <p className="text-xs font-bold uppercase text-orange-300">
                    Same-window scenario
                  </p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {scenario === null ? "Unavailable" : formatAipg(scenario)} AIPG
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    If a worker had earned {share.toFixed(1)}% of all accepted den
                    during this exact window. This is arithmetic on settled
                    history, not a payout forecast.
                  </p>
                </div>

                <p className="mt-5 text-xs leading-5 text-gray-500">
                  Den depends on completed work, model weighting, availability,
                  competition, and successful settlement. Raw job count, GPU
                  name, and token price are deliberately excluded. Last payment:
                  {" "}
                  {formatTime(payoutEvidence.lastPaid)}.
                </p>
              </>
            ) : (
              <p className="mt-6 text-sm leading-6 text-gray-400">
                Public payout evidence is unavailable, so no estimate is shown.
              </p>
            )}
            <a
              href="https://console.aipowergrid.io/transparency"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-300 hover:text-orange-200"
            >
              Verify payouts on Base <FiExternalLink aria-hidden="true" />
            </a>
          </div>

          <div className="p-6 md:p-8">
            <p className="flex items-center gap-2 text-sm font-bold uppercase text-cyan-300">
              <FiActivity aria-hidden="true" /> Live worker check
            </p>
            <h3 className="mt-5 text-2xl font-bold">
              Is your worker visible to the Grid?
            </h3>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Paste the exact worker name or worker ID printed after connection.
              The check reads the public online registry and sends no hardware
              details.
            </p>

            <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={checkWorker}>
              <label className="min-w-0 flex-1">
                <span className="sr-only">Worker name or ID</span>
                <input
                  value={identity}
                  onChange={(event) => setIdentity(event.target.value.slice(0, 120))}
                  placeholder="Worker name or ID"
                  autoComplete="off"
                  className="min-h-12 w-full border border-white/15 bg-[#111214] px-4 text-white outline-none placeholder:text-gray-600 focus:border-cyan-400"
                />
              </label>
              <button
                type="submit"
                disabled={workerState.status === "checking"}
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-cyan-400 px-5 font-bold text-black hover:bg-cyan-300 disabled:cursor-wait disabled:opacity-60"
              >
                <FiRefreshCw aria-hidden="true" />
                {workerState.status === "checking" ? "Checking" : "Check now"}
              </button>
            </form>

            <div className="mt-5 min-h-24 border border-white/10 bg-[#0b0c0e] p-5" aria-live="polite">
              {workerState.status === "idle" ? (
                <p className="text-sm leading-6 text-gray-500">
                  Start the worker first, then use the identity from its local
                  dashboard or connection log.
                </p>
              ) : workerState.status === "online" ? (
                <div>
                  <p className="flex items-center gap-2 font-bold text-green-300">
                    <FiCheckCircle aria-hidden="true" /> Online in the public registry
                  </p>
                  <p className="mt-2 break-words text-sm text-gray-300">
                    {workerState.worker.name || workerState.worker.id}
                  </p>
                  <p className="mt-2 break-words text-xs leading-5 text-gray-500">
                    Models: {workerState.worker.models.join(", ") || "none advertised"}
                  </p>
                </div>
              ) : (
                <p className="text-sm leading-6 text-orange-200">
                  {workerState.message}
                </p>
              )}
            </div>

            <a
              href="/status"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Open public network status <FiExternalLink aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
