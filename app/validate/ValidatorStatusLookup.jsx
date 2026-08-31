"use client";

import { useEffect, useState } from "react";
import {
  FiActivity,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiSearch,
} from "react-icons/fi";

function duration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "Complete";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.ceil((seconds % 3600) / 60);
  return hours > 0 ? `${hours}h ${minutes}m remaining` : `${minutes}m remaining`;
}

function heartbeatLabel(value) {
  if (!value) return "No heartbeat recorded";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(value));
}

export default function ValidatorStatusLookup({ currentVersion }) {
  const [validatorId, setValidatorId] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function lookup(event) {
    event.preventDefault();
    const normalized = validatorId.trim();
    setLoading(true);
    setError("");
    setStatus(null);
    try {
      const response = await fetch(
        `/api/validator-status/${encodeURIComponent(normalized)}`,
        { cache: "no-store" },
      );
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Unable to check validator.");
      setStatus(body);
    } catch (lookupError) {
      setError(lookupError.message || "Unable to check validator.");
    } finally {
      setLoading(false);
    }
  }

  const qualification = status?.qualification;
  const timeProgress = qualification?.minimumSeconds
    ? Math.min(100, (qualification.elapsedSeconds / qualification.minimumSeconds) * 100)
    : 0;
  const coverageProgress = qualification
    ? Math.min(100, qualification.sampleCoverage * 100)
    : 0;
  const requiredVersion = status?.requiredSoftwareVersion || currentVersion;
  const versionSupported = status
    ? status.softwareVersionSupported ??
      status.softwareVersion === requiredVersion
    : false;
  const setupChecks = status
    ? [
        {
          label: "Registered",
          complete: status.registrationStatus === "active",
          detail: "Core recognizes this validator ID",
        },
        {
          label: "Current release",
          complete: versionSupported,
          detail: versionSupported
            ? requiredVersion
            : `${status.softwareVersion} · requires ${requiredVersion}`,
        },
        {
          label: "Heartbeat",
          complete: qualification.heartbeatFresh,
          detail: qualification.heartbeatFresh
            ? "Grid acknowledged"
            : "Start the validator and keep the app open",
        },
        {
          label: "Assignment received",
          complete: status.activity.assigned > 0,
          detail: `${status.activity.assigned.toLocaleString("en-US")} received`,
        },
        {
          label: "Evidence accepted",
          complete: status.activity.attested > 0,
          detail: `${status.activity.attested.toLocaleString("en-US")} accepted`,
        },
      ]
    : [];
  const setupVerified =
    setupChecks.length > 0 && setupChecks.every((check) => check.complete);
  const statusValidatorId = status?.validatorId;

  useEffect(() => {
    if (!statusValidatorId || setupVerified) return undefined;

    let active = true;
    const refreshStatus = async () => {
      try {
        const response = await fetch(
          `/api/validator-status/${encodeURIComponent(statusValidatorId)}`,
          { cache: "no-store" },
        );
        if (!response.ok) return;
        const body = await response.json();
        if (active) setStatus(body);
      } catch {
        // Keep the last valid view across a transient refresh fault.
      }
    };
    const timer = window.setInterval(refreshStatus, 15_000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [setupVerified, statusValidatorId]);

  return (
    <div className="mt-8 border border-white/10 bg-[#111214]">
      <div className="border-b border-white/10 p-5">
        <p className="text-sm font-bold uppercase text-orange-300">
          Check your validator
        </p>
        <h3 className="mt-2 text-xl font-bold text-white">
          One ID, one clear status
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-400">
          Enter the public ID printed by the validator. This lookup never asks
          for an API key, wallet address, or private key.
        </p>
      </div>
      <form
        onSubmit={lookup}
        className="grid min-w-0 gap-3 p-5 sm:grid-cols-[minmax(0,1fr)_auto]"
      >
        <label className="min-w-0">
          <span className="sr-only">Validator ID</span>
          <input
            value={validatorId}
            onChange={(event) => setValidatorId(event.target.value)}
            placeholder="val_..."
            autoComplete="off"
            spellCheck="false"
            required
            minLength={20}
            maxLength={92}
            className="min-h-12 w-full min-w-0 border border-white/20 bg-black px-4 font-mono text-sm text-white outline-none placeholder:text-gray-600 focus:border-cyan-400"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-12 items-center justify-center gap-2 bg-cyan-400 px-5 font-bold text-black hover:bg-cyan-300 disabled:cursor-wait disabled:bg-gray-500"
        >
          <FiSearch aria-hidden="true" />
          {loading ? "Checking" : "Check status"}
        </button>
      </form>

      {error ? (
        <p className="mx-5 mb-5 flex items-start gap-2 border-l-2 border-red-400 bg-red-400/10 p-4 text-sm text-red-100">
          <FiAlertCircle className="mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}

      {status ? (
        <div className="border-t border-white/10">
          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="break-all font-mono text-sm text-gray-400">
                {status.validatorId}
              </p>
              <p className="mt-2 flex items-center gap-2 text-xl font-bold text-white">
                {status.online ? (
                  <FiCheckCircle className="text-green-400" aria-hidden="true" />
                ) : (
                  <FiAlertCircle className="text-orange-300" aria-hidden="true" />
                )}
                <span>
                  {status.online ? "Online" : "Offline"}
                  <span className="text-gray-500"> · </span>
                  <span className="capitalize">
                    {status.summary.replaceAll("_", " ")}
                  </span>
                </span>
              </p>
            </div>
            <p className="text-sm text-gray-400">
              Version <strong className="text-white">{status.softwareVersion}</strong>
              {status.softwareVersion !== currentVersion ? (
                <span className="mt-1 block text-orange-200">
                  Current cohort release: {currentVersion}
                </span>
              ) : null}
            </p>
          </div>

          <dl className="grid gap-px bg-white/10 sm:grid-cols-3">
            {[
              ["Assignments completed", status.activity.completed],
              ["Evidence submitted", status.activity.attested],
              ["Qualification", qualification.status],
            ].map(([label, value]) => (
              <div key={label} className="min-w-0 bg-[#0b0c0e] p-5">
                <dt className="text-xs font-semibold uppercase text-gray-500">
                  {label}
                </dt>
                <dd className="mt-2 break-words text-xl font-bold capitalize text-white">
                  {typeof value === "number" ? value.toLocaleString("en-US") : value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="border-t border-white/10 p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-cyan-300">
                  Post-setup verification
                </p>
                <h4 className="mt-1 text-lg font-bold text-white">
                  {setupVerified
                    ? "This node is working end to end"
                    : "Waiting for every node check"}
                </h4>
              </div>
              <p className="text-xs text-gray-500">
                Refreshes automatically every 15 seconds
              </p>
            </div>
            <ul className="mt-4 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
              {setupChecks.map((check) => (
                <li key={check.label} className="min-w-0 bg-[#0b0c0e] p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-white">
                    {check.complete ? (
                      <FiCheckCircle
                        className="shrink-0 text-green-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <FiClock
                        className="shrink-0 text-orange-300"
                        aria-hidden="true"
                      />
                    )}
                    {check.label}
                  </p>
                  <p className="mt-2 break-words text-xs leading-5 text-gray-500">
                    {check.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 p-5 lg:grid-cols-2">
            <div>
              <p className="flex items-center justify-between gap-4 text-sm font-semibold text-white">
                <span className="flex items-center gap-2">
                  <FiClock className="text-cyan-300" aria-hidden="true" />
                  Qualification time
                </span>
                <span className="text-gray-400">
                  {duration(qualification.remainingSeconds)}
                </span>
              </p>
              <div className="mt-3 h-2 bg-black" aria-hidden="true">
                <div
                  className="h-full bg-cyan-400"
                  style={{ width: `${timeProgress}%` }}
                />
              </div>
            </div>
            <div>
              <p className="flex items-center justify-between gap-4 text-sm font-semibold text-white">
                <span className="flex items-center gap-2">
                  <FiActivity className="text-orange-300" aria-hidden="true" />
                  Heartbeat coverage
                </span>
                <span className="text-gray-400">
                  {Math.round(qualification.sampleCoverage * 100)}% / {Math.round(qualification.minimumSampleCoverage * 100)}%
                </span>
              </p>
              <div className="mt-3 h-2 bg-black" aria-hidden="true">
                <div
                  className="h-full bg-orange-400"
                  style={{ width: `${coverageProgress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-white/10 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <p className="text-sm leading-6 text-gray-400">
              <strong className="block text-white">Last heartbeat</strong>
              {heartbeatLabel(status.lastHeartbeat)}
            </p>
            <p className="text-sm leading-6 text-gray-400">
              <strong className="block text-white">Next action</strong>
              {status.nextAction}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
