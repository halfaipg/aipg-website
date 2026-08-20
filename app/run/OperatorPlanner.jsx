"use client";

import { useMemo, useState } from "react";
import {
  FiActivity,
  FiAlertTriangle,
  FiCpu,
  FiHardDrive,
  FiMonitor,
  FiServer,
} from "react-icons/fi";

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

function demandLabel(workers) {
  if (workers <= 1) return { text: "Highest capacity need", color: "text-orange-300" };
  if (workers === 2) return { text: "Needs another replica", color: "text-yellow-300" };
  return { text: "Replicated", color: "text-green-300" };
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

function recommendation({ os, accelerator, vram, ram, disk }) {
  const nvidia = accelerator === "nvidia";
  const managerPlatform = os === "linux" || os === "windows";
  const audioCandidate = managerPlatform && nvidia && vram >= 12 && ram >= 32 && disk >= 49;
  const manualMediaCandidate = managerPlatform && nvidia && vram >= 24 && ram >= 32;

  if (audioCandidate) {
    return {
      title: "Managed audio is your clearest profile match",
      body: "Your entered hardware clears the draft ACE-Step minimums. The public media manager is still qualification-gated, so this is a candidate result, not permission to serve yet.",
      accent: "border-cyan-400/50 bg-cyan-400/5",
      secondary: manualMediaCandidate
        ? "You are also a strong candidate for the operator-managed ComfyUI image/video path; exact workflows and checkpoints still need a local test."
        : "The live text worker remains available when you already have a compatible local inference backend.",
    };
  }

  if (manualMediaCandidate) {
    return {
      title: "Start with the operator-managed media worker",
      body: "This looks like a capable NVIDIA media host, but image and video compatibility is workflow-specific. The local ComfyUI bridge must verify the exact checkpoints before advertising them.",
      accent: "border-orange-400/50 bg-orange-400/5",
      secondary: "The text worker is another option when this machine already exposes a supported OpenAI-compatible or Ollama backend.",
    };
  }

  if (accelerator === "cpu") {
    return {
      title: "Run a validator preview, not a GPU worker",
      body: "A CPU-only host is useful for independent validator evidence. The current flagship generation models need an accelerator-backed runtime.",
      accent: "border-white/20 bg-white/5",
      secondary: "Validator rewards are not live, and the preview cannot affect routing, payouts, strikes, or slashing.",
    };
  }

  return {
    title: "Start with the text worker and your existing backend",
    body: "The text worker can connect to Ollama or an OpenAI-compatible local server. Model fit depends on the backend, quantization, context length, and topology, so this browser does not claim an exact model match.",
    accent: "border-white/20 bg-white/5",
    secondary:
      accelerator === "nvidia"
        ? "For the managed ACE-Step profile, enter at least 12 GB VRAM, 32 GB RAM, and 49 GB free disk on Linux or Windows."
        : "The first managed media profile is NVIDIA-only; AMD and Apple profiles need separate qualification evidence.",
  };
}

export default function OperatorPlanner({ opportunities }) {
  const [os, setOs] = useState("linux");
  const [accelerator, setAccelerator] = useState("nvidia");
  const [vram, setVram] = useState(24);
  const [ram, setRam] = useState(64);
  const [disk, setDisk] = useState(100);

  const result = useMemo(
    () => recommendation({ os, accelerator, vram, ram, disk }),
    [accelerator, disk, os, ram, vram],
  );

  return (
    <section className="border-y border-white/10 bg-[#0b0c0e]">
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-8 lg:py-20">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase text-cyan-400">Operator planner</p>
          <h2 className="text-3xl font-bold md:text-4xl">Find the useful path for your machine</h2>
          <p className="mt-4 leading-7 text-gray-400">
            Enter coarse hardware details locally. Nothing is submitted. This planner narrows the
            worker path; only a signed profile and local canary can approve an exact capability.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <fieldset>
              <legend className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <FiMonitor aria-hidden="true" /> Operating system
              </legend>
              <div className="grid grid-cols-3 border border-white/15 bg-[#111214] p-1">
                {OPERATING_SYSTEMS.map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setOs(value)}
                    aria-pressed={os === value}
                    className={`min-h-11 px-2 text-sm font-semibold transition-colors ${
                      os === value ? "bg-white text-black" : "text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <span className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <FiCpu aria-hidden="true" /> Accelerator
              </span>
              <select
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

            <div className="grid gap-4 sm:grid-cols-3">
              <NumberField label="GPU VRAM" unit="GB" value={vram} setValue={setVram} />
              <NumberField label="System RAM" unit="GB" value={ram} setValue={setRam} />
              <NumberField label="Free disk" unit="GB" value={disk} setValue={setDisk} />
            </div>
          </div>

          <div className={`border p-6 ${result.accent}`} aria-live="polite">
            <p className="text-xs font-bold uppercase text-gray-400">Likely starting point</p>
            <h3 className="mt-3 text-xl font-bold">{result.title}</h3>
            <p className="mt-3 text-sm leading-6 text-gray-300">{result.body}</p>
            <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-6 text-gray-400">
              {result.secondary}
            </p>
          </div>
        </div>

        <div className="mt-16">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase text-orange-400">
                <FiActivity aria-hidden="true" /> Live network opportunity
              </p>
              <h3 className="text-2xl font-bold">Capacity and actual 30-day work</h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-gray-400">
              Throughput is observed across the existing Grid worker set. It is not a forecast for
              your GPU, and job history is not a promise of future work or earnings.
            </p>
          </div>

          {opportunities.length ? (
            <>
              <div className="divide-y divide-white/10 border border-white/10 md:hidden">
                {opportunities.map((model) => {
                  const need = demandLabel(model.workers);
                  return (
                    <div key={`${model.type}:${model.name}`} className="bg-black/30 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="break-words font-semibold text-white">{model.name}</p>
                          <p className="mt-1 text-xs capitalize text-gray-400">{model.type}</p>
                        </div>
                        <span className={`text-right text-xs font-semibold ${need.color}`}>
                          {need.text}
                        </span>
                      </div>
                      <dl className="mt-4 grid grid-cols-3 gap-3 text-xs">
                        <div>
                          <dt className="text-gray-500">Workers</dt>
                          <dd className="mt-1 font-mono text-white">{model.workers}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Jobs, 30d</dt>
                          <dd className="mt-1 font-mono text-white">{formatCount(model.jobs30d)}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Observed</dt>
                          <dd className="mt-1 text-gray-300">{formatObserved(model)}</dd>
                        </div>
                      </dl>
                    </div>
                  );
                })}
              </div>
              <div className="hidden overflow-x-auto border border-white/10 md:block">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-[#111214] text-xs uppercase text-gray-400">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Model</th>
                      <th className="px-4 py-3 font-semibold">Type</th>
                      <th className="px-4 py-3 font-semibold">Workers</th>
                      <th className="px-4 py-3 font-semibold">Jobs, 30d</th>
                      <th className="px-4 py-3 font-semibold">Observed</th>
                      <th className="px-4 py-3 font-semibold">Capacity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {opportunities.map((model) => {
                      const need = demandLabel(model.workers);
                      return (
                        <tr key={`${model.type}:${model.name}`} className="bg-black/30">
                          <td className="px-4 py-4 font-medium text-white">{model.name}</td>
                          <td className="px-4 py-4 capitalize text-gray-400">{model.type}</td>
                          <td className="px-4 py-4 font-mono">{model.workers}</td>
                          <td className="px-4 py-4 font-mono">{formatCount(model.jobs30d)}</td>
                          <td className="px-4 py-4 text-gray-400">{formatObserved(model)}</td>
                          <td className={`px-4 py-4 font-semibold ${need.color}`}>{need.text}</td>
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
              Live capacity telemetry is temporarily unavailable. The local hardware planner still
              works, but do not infer model demand from this state.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function NumberField({ label, unit, value, setValue }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-semibold">
        {label === "Free disk" ? <FiHardDrive aria-hidden="true" /> : <FiServer aria-hidden="true" />}
        {label}
      </span>
      <span className="flex min-h-11 border border-white/15 bg-[#111214] focus-within:border-cyan-400">
        <input
          type="number"
          min="0"
          max="4096"
          step="1"
          value={value}
          onChange={(event) => setValue(Math.max(0, Number(event.target.value) || 0))}
          className="min-w-0 flex-1 bg-transparent px-3 text-white outline-none"
        />
        <span className="flex items-center border-l border-white/10 px-3 text-xs text-gray-400">
          {unit}
        </span>
      </span>
    </label>
  );
}
