"use client";

import { useMemo, useState } from "react";
import { recommendWorker } from "./operatorRecommendation.mjs";
import {
  FiActivity,
  FiAlertTriangle,
  FiCpu,
  FiDownload,
  FiHardDrive,
  FiMonitor,
  FiServer,
  FiShare2,
} from "react-icons/fi";
import {
  buildTextRouteShare,
  selectTextRoutePriority,
} from "./operatorOpportunityLogic.mjs";
import {
  useDetectedOperatorPlatform,
  useOperatorPlatformHydrated,
} from "./operatorPlatformStore";

const OPERATING_SYSTEMS = [
  ["linux", "Linux"],
  ["windows", "Windows"],
  ["macos", "macOS"],
];

const ACCELERATORS = [
  ["nvidia", "NVIDIA"],
  ["amd", "AMD"],
  ["apple", "Apple silicon"],
  ["cpu", "CPU only"],
];

function resilienceLabel(workers) {
  if (workers <= 1)
    return { text: "Single-worker risk", color: "text-orange-300" };
  if (workers === 2)
    return { text: "One replica short", color: "text-yellow-300" };
  return { text: "3+ workers", color: "text-green-300" };
}

function formatObserved(model) {
  if (model.type === "text" && model.tokensPerSecond) {
    return `${model.tokensPerSecond.toFixed(1)} tok/s`;
  }
  if (model.averageLatencySeconds) {
    return `${model.averageLatencySeconds.toFixed(1)}s average`;
  }
  return "No recent timing sample";
}

function formatCount(value) {
  return new Intl.NumberFormat("en-US").format(value);
}


export default function OperatorPlanner({
  opportunities,
  mediaPlatforms,
  textPlatforms,
}) {
  const [selectedOs, setSelectedOs] = useState(null);
  const [workload, setWorkload] = useState("text");
  const [accelerator, setAccelerator] = useState("nvidia");
  const [gpuModel, setGpuModel] = useState("");
  const [vram, setVram] = useState(24);
  const [ram, setRam] = useState(64);
  const [disk, setDisk] = useState(100);
  const [throughput, setThroughput] = useState(0);
  const [shareStatus, setShareStatus] = useState("idle");
  const detectedPlatform = useDetectedOperatorPlatform();
  const hydrated = useOperatorPlatformHydrated();
  const os = selectedOs || detectedPlatform.os;
  const mediaReady = Boolean(mediaPlatforms?.[os]?.ready);
  const textReady = Boolean(
    os === "linux"
      ? textPlatforms?.linux?.ready || textPlatforms?.linuxArm64?.ready
      : textPlatforms?.[os]?.ready,
  );

  const result = useMemo(
    () =>
      recommendWorker({
        os,
        accelerator,
        vram,
        ram,
        disk,
        workload,
        mediaReady,
        textReady,
      }),
    [accelerator, disk, mediaReady, os, ram, textReady, workload, vram],
  );
  const textRoutePriority = useMemo(
    () => selectTextRoutePriority(opportunities),
    [opportunities],
  );
  const routeShareText = useMemo(
    () => buildTextRouteShare(textRoutePriority),
    [textRoutePriority],
  );

  async function shareRouteOpening() {
    if (!routeShareText) return;
    setShareStatus("idle");
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({
          title: "AI Power Grid operator opening",
          text: routeShareText,
        });
        setShareStatus("shared");
        return;
      }
      if (!navigator.clipboard?.writeText) throw new Error("clipboard unavailable");
      await navigator.clipboard.writeText(routeShareText);
      setShareStatus("copied");
    } catch (error) {
      if (error?.name === "AbortError") return;
      setShareStatus("failed");
    }
  }

  return (
    <section
      id="hardware-planner"
      className="scroll-mt-20 border-y border-white/10 bg-[#0b0c0e]"
      data-operator-planner-ready={hydrated ? "true" : "false"}
    >
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-8 lg:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase text-cyan-400">
            Operator planner
          </p>
          <h2 className="text-3xl font-bold md:text-4xl">
            Find the useful path for your machine
          </h2>
          <p className="mt-4 leading-7 text-gray-400">
            Choose the workload you want to offer and adjust the example specs
            to match your machine. Nothing is submitted. Your local backend
            must still pass a generation test.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <label className="block text-sm font-semibold">
              What do you want to run?
              <select value={workload} onChange={(event) => setWorkload(event.target.value)} className="mt-3 min-h-11 w-full border border-white/15 bg-[#111214] px-3 text-white">
                <option value="text">Text generation</option>
                <option value="media">Image and video</option>
                <option value="audio">Music and audio</option>
              </select>
            </label>
            <fieldset>
              <legend className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <FiMonitor aria-hidden="true" /> Operating system
              </legend>
              <div className="grid grid-cols-3 border border-white/15 bg-[#111214] p-1">
                {OPERATING_SYSTEMS.map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSelectedOs(value)}
                    aria-pressed={os === value}
                    className={`min-h-11 px-2 text-sm font-semibold transition-colors ${
                      os === value
                        ? "bg-white text-black"
                        : "text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <span className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <FiCpu aria-hidden="true" /> Accelerator type
              </span>
              <select
                aria-label="Accelerator type"
                value={accelerator}
                onChange={(event) => setAccelerator(event.target.value)}
                className="min-h-11 w-full border border-white/15 bg-[#111214] px-3 text-white outline-none focus:border-cyan-400"
              >
                {ACCELERATORS.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <FiCpu aria-hidden="true" /> GPU or accelerator model
              </span>
              <input
                type="text"
                value={gpuModel}
                onChange={(event) =>
                  setGpuModel(event.target.value.slice(0, 80))
                }
                placeholder="For example, RTX 3090 or MI300X"
                autoComplete="off"
                className="min-h-11 w-full border border-white/15 bg-[#111214] px-3 text-white outline-none placeholder:text-gray-600 focus:border-cyan-400"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <NumberField
                label="GPU VRAM"
                unit="GB"
                value={vram}
                setValue={setVram}
              />
              <NumberField
                label="System RAM"
                unit="GB"
                value={ram}
                setValue={setRam}
              />
              <NumberField
                label="Free disk"
                unit="GB"
                value={disk}
                setValue={setDisk}
              />
              <NumberField
                label="Expected text speed"
                unit="tok/s"
                value={throughput}
                setValue={setThroughput}
              />
            </div>
          </div>

          <div className="min-w-0 border-l-2 border-cyan-400 pl-6" aria-live="polite">
            <p className="text-xs font-bold uppercase text-gray-400">
              Likely starting point
            </p>
            <h3 className="mt-3 text-xl font-bold">{result.title}</h3>
            <p className="mt-3 text-sm leading-6 text-gray-300">
              {result.body}
            </p>
            <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-6 text-gray-400">
              {result.secondary}
            </p>
            <a
              href={result.href}
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 bg-cyan-400 px-4 text-sm font-bold text-black transition-colors hover:bg-cyan-300"
            >
              <FiDownload aria-hidden="true" />
              {result.action}
            </a>
            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="text-xs font-bold uppercase text-gray-500">
                Network-priority text route
              </p>
              {textRoutePriority ? (
                <>
                  <p className="mt-2 break-words font-mono text-sm text-white">
                    {textRoutePriority.name}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-gray-400">
                    {textRoutePriority.workers} serving worker
                    {textRoutePriority.workers === 1 ? "" : "s"} and{" "}
                    {formatCount(textRoutePriority.jobs30d)} jobs producing{" "}
                    {formatCount(textRoutePriority.acceptedDen30d)} accepted den
                    in 30 days. Priority uses accepted den and missing replicas,
                    not raw request count or hardware compatibility. Advertise
                    it only when your backend genuinely serves that model.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={shareRouteOpening}
                      className="inline-flex min-h-10 items-center gap-2 border border-white/20 bg-white/5 px-3 text-xs font-semibold text-white transition-colors hover:border-cyan-400 hover:text-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                    >
                      <FiShare2 aria-hidden="true" /> Share opening
                    </button>
                    <p
                      className={`text-xs ${
                        shareStatus === "failed"
                          ? "text-orange-300"
                          : "text-gray-400"
                      }`}
                      role="status"
                      aria-live="polite"
                    >
                      {shareStatus === "shared"
                        ? "Opening shared."
                        : shareStatus === "copied"
                          ? "Opening copied."
                          : shareStatus === "failed"
                            ? "Sharing is unavailable in this browser."
                            : ""}
                    </p>
                  </div>
                </>
              ) : (
                <p className="mt-2 text-xs leading-5 text-gray-400">
                  No under-target text route has enough live evidence for a
                  recommendation.
                </p>
              )}
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 text-xs">
              <div>
                <dt className="text-gray-500">Entered accelerator</dt>
                <dd className="mt-1 break-words text-gray-200">
                  {gpuModel.trim() ||
                    ACCELERATORS.find(([value]) => value === accelerator)?.[1]}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Expected text speed</dt>
                <dd className="mt-1 text-gray-200">
                  {throughput > 0 ? `${throughput} tok/s` : "Not entered"}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <details className="mt-12 border-t border-white/15 pt-5">
          <summary className="cursor-pointer py-3 text-lg font-semibold">See current capacity needs and workload history</summary>
        <div className="mt-6">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase text-orange-400">
                <FiActivity aria-hidden="true" /> Live network opportunity
              </p>
              <h3 className="text-2xl font-bold">
                Capacity and actual 30-day work
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-gray-400">
              Jobs per worker is a rough workload-share signal, not a payout
              forecast. Throughput is observed across the existing Grid and is
              not a benchmark for your GPU.
            </p>
          </div>

          {opportunities.length ? (
            <>
              <div className="divide-y divide-white/10 border border-white/10 md:hidden">
                {opportunities.map((model) => {
                  const resilience = resilienceLabel(model.workers);
                  const jobsPerWorker =
                    model.workers > 0 ? model.jobs30d / model.workers : null;
                  return (
                    <div
                      key={`${model.type}:${model.name}`}
                      className="bg-black/30 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="break-words font-semibold text-white">
                            {model.name}
                          </p>
                          <p className="mt-1 text-xs capitalize text-gray-400">
                            {model.type}
                          </p>
                        </div>
                        <span
                          className={`text-right text-xs font-semibold ${resilience.color}`}
                        >
                          {resilience.text}
                        </span>
                      </div>
                      <dl className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
                        <div>
                          <dt className="text-gray-500">Workers</dt>
                          <dd className="mt-1 font-mono text-white">
                            {model.workers}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Jobs, 30d</dt>
                          <dd className="mt-1 font-mono text-white">
                            {formatCount(model.jobs30d)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Jobs / worker</dt>
                          <dd className="mt-1 font-mono text-white">
                            {jobsPerWorker === null
                              ? "—"
                              : jobsPerWorker.toFixed(1)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Observed</dt>
                          <dd className="mt-1 text-gray-300">
                            {formatObserved(model)}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  );
                })}
              </div>
              <div className="hidden overflow-x-auto border border-white/10 md:block">
                <table className="w-full min-w-[860px] text-left text-sm">
                  <thead className="bg-[#111214] text-xs uppercase text-gray-400">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Model</th>
                      <th className="px-4 py-3 font-semibold">Type</th>
                      <th className="px-4 py-3 font-semibold">Workers</th>
                      <th className="px-4 py-3 font-semibold">Jobs, 30d</th>
                      <th className="px-4 py-3 font-semibold">Jobs / worker</th>
                      <th className="px-4 py-3 font-semibold">Observed</th>
                      <th className="px-4 py-3 font-semibold">Resilience</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {opportunities.map((model) => {
                      const resilience = resilienceLabel(model.workers);
                      const jobsPerWorker =
                        model.workers > 0
                          ? model.jobs30d / model.workers
                          : null;
                      return (
                        <tr
                          key={`${model.type}:${model.name}`}
                          className="bg-black/30"
                        >
                          <td className="px-4 py-4 font-medium text-white">
                            {model.name}
                          </td>
                          <td className="px-4 py-4 capitalize text-gray-400">
                            {model.type}
                          </td>
                          <td className="px-4 py-4 font-mono">
                            {model.workers}
                          </td>
                          <td className="px-4 py-4 font-mono">
                            {formatCount(model.jobs30d)}
                          </td>
                          <td className="px-4 py-4 font-mono">
                            {jobsPerWorker === null
                              ? "—"
                              : jobsPerWorker.toFixed(1)}
                          </td>
                          <td className="px-4 py-4 text-gray-400">
                            {formatObserved(model)}
                          </td>
                          <td
                            className={`px-4 py-4 font-semibold ${resilience.color}`}
                          >
                            {resilience.text}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="flex items-start gap-3 border border-orange-400/30 bg-orange-400/5 p-5 text-sm text-orange-200">
              <FiAlertTriangle className="mt-0.5 shrink-0" aria-hidden="true" />
              Live capacity telemetry is temporarily unavailable. The local
              hardware planner still works, but do not infer model demand from
              this state.
            </div>
          )}
        </div>
        </details>
      </div>
    </section>
  );
}

function NumberField({ label, unit, value, setValue }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-semibold">
        {label === "Free disk" ? (
          <FiHardDrive aria-hidden="true" />
        ) : (
          <FiServer aria-hidden="true" />
        )}
        {label}
      </span>
      <span className="flex min-h-11 border border-white/15 bg-[#111214] focus-within:border-cyan-400">
        <input
          type="number"
          min="0"
          max="4096"
          step="1"
          value={value}
          onChange={(event) =>
            setValue(Math.max(0, Number(event.target.value) || 0))
          }
          className="min-w-0 flex-1 bg-transparent px-3 text-white outline-none"
        />
        <span className="flex items-center border-l border-white/10 px-3 text-xs text-gray-400">
          {unit}
        </span>
      </span>
    </label>
  );
}
