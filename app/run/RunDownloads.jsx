"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  FiDownload,
  FiExternalLink,
  FiMonitor,
  FiShield,
} from "react-icons/fi";
import { useDetectedOperatorPlatform } from "./operatorPlatformStore";
import {
  OPERATOR_INTAKE_URL,
  TEXT_OPERATOR_COHORT_URL,
} from "./operatorLinks";
import { summarizeRouteCoverage } from "./operatorOpportunityLogic.mjs";

const PLATFORMS = {
  linux: { label: "Linux", detail: "Ubuntu 22.04+ x86_64" },
  linuxArm64: { label: "Linux ARM64", detail: "Linux aarch64" },
  macos: { label: "macOS", detail: "Apple Silicon" },
  windows: { label: "Windows", detail: "Windows 11 x86_64" },
};

function formatBytes(value) {
  if (!value) return null;
  if (value < 1024 * 1024) return `${Math.max(1, Math.round(value / 1024))} KB`;
  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

export default function RunDownloads({
  mediaRelease,
  mediaQualificationRelease,
  opportunities,
  textRelease,
}) {
  const [workerType, setWorkerType] = useState("text");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const detectedPlatform = useDetectedOperatorPlatform();
  const requestedPlatform =
    selectedPlatform || detectedPlatform.downloadPlatform;
  const platform =
    workerType === "media" && !["linux", "windows"].includes(requestedPlatform)
      ? "linux"
      : requestedPlatform;

  const release = workerType === "text" ? textRelease : mediaRelease;
  const platformStatus = release?.platforms?.[platform] || null;
  const selected = useMemo(
    () => release?.[platform] || null,
    [release, platform],
  );
  const releaseReady = Boolean(
    release &&
    selected &&
    release.checksums &&
    release.manifest &&
    release.sbom,
  );
  const textInstaller =
    workerType === "text" && ["linux", "linuxArm64"].includes(platform)
      ? release?.installer || null
      : null;
  const primaryDownload = textInstaller || selected;
  const qualificationSelected =
    workerType === "media"
      ? mediaQualificationRelease?.[platform] || null
      : null;
  const platformEntries = Object.entries(PLATFORMS).filter(
    ([value]) => workerType === "text" || ["linux", "windows"].includes(value),
  );
  const networkSnapshot = useMemo(
    () => summarizeRouteCoverage(opportunities, workerType),
    [opportunities, workerType],
  );

  return (
    <>
      <section
        className="relative overflow-hidden border-b border-white/10"
      >
        <Image
          src="/operator-worker-hero.png"
          alt="Open-frame GPU servers contributing compute to AI Power Grid"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] opacity-90 md:object-center"
        />
        <div className="absolute inset-0 bg-black/55 md:bg-black/45" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
          <div className="w-full max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-300">
              <FiShield aria-hidden="true" />
              Worker software
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              AI Power Grid Workers
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
              Keep the models and runtime you already operate. Add a Grid
              worker beside them, choose what capacity to expose, and serve
              compatible jobs from the network.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-300">
              {textRelease ? "Linux text workers are available now." : "Text downloads are temporarily unavailable."}
              {" "}Image, video, and audio onboarding is in qualification.
            </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
                <a
                  href="#worker-downloads"
                  className="flex min-h-11 items-center justify-center bg-orange-500 px-5 text-black hover:bg-orange-400"
                >
                  I already run AI
                </a>
                <a
                  href="#hardware-planner"
                  className="flex min-h-11 items-center justify-center border border-white/40 bg-black/40 px-5 text-white hover:bg-black/60"
                >
                  I&apos;m starting fresh
                </a>
              </div>
          </div>
        </div>
      </section>

      <section id="worker-downloads" className="scroll-mt-20 border-b border-white/10 bg-[#0c0d0f]">
        <div className="mx-auto max-w-6xl px-6 py-10 md:px-8 md:py-14">
          <h2 className="mb-6 text-2xl font-bold">Connect your backend</h2>
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <div className="mb-4 grid grid-cols-2 border border-white/15 bg-[#111214] p-1">
                {[
                  ["text", "Text worker"],
                  ["media", "Media manager"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setWorkerType(value)}
                    className={`min-h-12 px-3 text-sm font-semibold transition-colors ${
                      workerType === value
                        ? "bg-orange-500 text-black"
                        : "text-gray-300 hover:bg-white/10"
                    }`}
                    aria-pressed={workerType === value}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">
                    Choose your operating system
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Final compatibility is checked locally.
                  </p>
                </div>
                {release?.version && (
                  <span className="text-xs font-mono text-gray-400">
                    v{release.version}
                  </span>
                )}
              </div>

              <div className="mb-4 grid grid-cols-2 border border-white/15 bg-[#111214] p-1">
                {platformEntries.map(([value, item]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSelectedPlatform(value)}
                    className={`min-h-12 px-3 text-sm font-semibold transition-colors ${
                      platform === value
                        ? "bg-white text-black"
                        : "text-gray-300 hover:bg-white/10"
                    }`}
                    aria-pressed={platform === value}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <DownloadFacts
                workerType={workerType}
                platform={platform}
                releaseReady={releaseReady}
                platformReason={platformStatus?.reason}
                networkSnapshot={networkSnapshot}
              />

              {releaseReady ? (
                <div className="grid gap-2">
                  <a
                    href={primaryDownload.url}
                    className="flex min-h-12 w-full flex-wrap items-center justify-center gap-2 bg-orange-500 px-4 py-3 text-center font-bold text-black transition-colors hover:bg-orange-400"
                  >
                    <FiDownload aria-hidden="true" />
                    {textInstaller ? (
                      <>Download verified Linux installer</>
                    ) : (
                      <>
                        Download{" "}
                        {workerType === "text"
                          ? "text worker"
                          : "media manager"}{" "}
                        for {PLATFORMS[platform].label}
                      </>
                    )}
                    {formatBytes(primaryDownload.bytes) && (
                      <span className="font-normal text-black/65">
                        {formatBytes(primaryDownload.bytes)}
                      </span>
                    )}
                  </a>
                  {textInstaller ? (
                    <a
                      href={selected.url}
                      className="flex min-h-11 w-full items-center justify-center gap-2 border border-white/15 px-4 text-sm font-semibold text-gray-300 hover:bg-white/10"
                    >
                      Download {PLATFORMS[platform].label} binary directly
                      <FiExternalLink aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    disabled
                    className="min-h-12 w-full cursor-not-allowed bg-white/10 px-5 font-semibold text-gray-400"
                  >
                    {workerType === "media"
                      ? platformStatus?.reason || "Media qualification in progress"
                      : platformStatus?.reason || "Text release unavailable"}
                  </button>
                  {workerType === "media" ? (
                    <div className="mt-3 grid gap-2">
                      {qualificationSelected ? (
                        <a
                          href={qualificationSelected.url}
                          className="flex min-h-11 items-center justify-center gap-2 border border-cyan-400/60 px-4 text-sm font-semibold text-cyan-200 hover:bg-cyan-400/10"
                        >
                          <FiDownload aria-hidden="true" />
                          Download benchmark-only qualification tool
                        </a>
                      ) : null}
                      <a
                        href="https://github.com/AIPowerGrid/grid-media-worker/blob/main/docs/MANAGER_QUALIFICATION.md"
                        target="_blank"
                        rel="noreferrer"
                        className="flex min-h-11 items-center justify-center gap-2 border border-white/15 px-4 text-sm font-semibold text-gray-300 hover:bg-white/10"
                      >
                        Qualification instructions
                        <FiExternalLink aria-hidden="true" />
                      </a>
                      {qualificationSelected ? (
                        <a
                          href="https://github.com/AIPowerGrid/grid-media-worker/issues/8"
                          target="_blank"
                          rel="noreferrer"
                          className="flex min-h-11 items-center justify-center gap-2 border border-white/15 px-4 text-sm font-semibold text-gray-300 hover:bg-white/10"
                        >
                          Volunteer a GPU for qualification
                          <FiExternalLink aria-hidden="true" />
                        </a>
                      ) : null}
                      {qualificationSelected ? (
                        <p className="text-xs leading-5 text-gray-400">
                          Local benchmark only. It cannot connect a worker or
                          earn rewards. Verify the SHA-256 manifest and GitHub
                          provenance before running it.
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {release?.linux && platform !== "linux" ? (
                        <button
                          type="button"
                          onClick={() => setSelectedPlatform("linux")}
                          className="flex min-h-11 items-center justify-center gap-2 border border-orange-400/60 px-4 text-sm font-semibold text-orange-200 hover:bg-orange-400/10"
                        >
                          Use verified Linux worker
                        </button>
                      ) : null}
                      <a
                        href={OPERATOR_INTAKE_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="flex min-h-11 items-center justify-center gap-2 border border-white/15 px-4 text-sm font-semibold text-gray-300 hover:bg-white/10"
                      >
                        Register this hardware
                        <FiExternalLink aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-400">
                <span className="inline-flex items-center gap-1.5">
                  <FiMonitor aria-hidden="true" />
                  {PLATFORMS[platform].detail}
                </span>
                {release && (releaseReady || workerType === "text") && (
                  <>
                    {release.checksums ? (
                      <a
                        href={release.checksums.url}
                        className="inline-flex items-center gap-1.5 hover:text-white"
                      >
                        SHA256SUMS <FiExternalLink aria-hidden="true" />
                      </a>
                    ) : null}
                    {release.sbom ? (
                      <a
                        href={release.sbom.url}
                        className="inline-flex items-center gap-1.5 hover:text-white"
                      >
                        SPDX SBOM <FiExternalLink aria-hidden="true" />
                      </a>
                    ) : null}
                    <a
                      href={release.releaseUrl}
                      className="inline-flex items-center gap-1.5 hover:text-white"
                    >
                      Release notes <FiExternalLink aria-hidden="true" />
                    </a>
                  </>
                )}
                {!releaseReady && qualificationSelected ? (
                  <>
                    <a
                      href={mediaQualificationRelease.checksums.url}
                      className="inline-flex items-center gap-1.5 hover:text-white"
                    >
                      Qualification SHA256SUMS
                      <FiExternalLink aria-hidden="true" />
                    </a>
                    <a
                      href={mediaQualificationRelease.sbom.url}
                      className="inline-flex items-center gap-1.5 hover:text-white"
                    >
                      Qualification SBOM
                      <FiExternalLink aria-hidden="true" />
                    </a>
                  </>
                ) : null}
              </div>
              <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-5 text-gray-400">
                {workerType === "text"
                  ? textInstaller
                    ? "The verified installer detects Linux x64 or ARM64, checks the release manifest and binary, and installs without starting the worker. Your inference backend remains a separate local service."
                    : "One verified binary opens the local setup wizard; no Python environment or separate Grid installer is required. Your inference backend remains a separate local service."
                  : "The unified media manager is still qualification-gated. Benchmark tools do not enroll a worker or advertise capabilities."}
              </p>
              {workerType === "text" && releaseReady ? (
                <>
                  <a
                    href={TEXT_OPERATOR_COHORT_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 flex min-h-11 items-center justify-center gap-2 border border-orange-400/50 px-4 text-sm font-semibold text-orange-200 hover:bg-orange-400/10"
                  >
                    Join the operator cohort for setup support
                    <FiExternalLink aria-hidden="true" />
                  </a>
                </>
              ) : null}
            </div>
            <div className="min-w-0 border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {workerType === "text" && releaseReady ? (
                <FirstRunSteps
                  artifactName={selected.name}
                  installerName={textInstaller?.name || null}
                  version={release.version}
                />
              ) : (
                <>
                  <h3 className="text-xl font-bold">Keep your existing setup</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-300">
                    {workerType === "text"
                      ? "Your backend stays separate. Choose a supported worker platform, then follow the local setup wizard to select and test your model."
                      : "An existing ComfyUI or ACE-Step installation needs a reviewed model and workflow profile before serving Grid jobs. A qualification download tests compatibility; it does not start earning rewards."}
                  </p>
                </>
              )}
              <a href="/docs/connect-existing-stack" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                Backend setup guides <FiExternalLink aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function DownloadFacts({
  workerType,
  platform,
  releaseReady,
  platformReason,
  networkSnapshot,
}) {
  const text = workerType === "text";
  const facts = [
    ["Backend", text ? "Ollama or a tested compatible API" : "Reviewed ComfyUI or direct-runtime profile"],
    ["Platform", `${PLATFORMS[platform].label} · ${releaseReady ? "verified artifact" : platformReason || "release gated"}`],
    ["Compatibility", text ? "The selected model must be served by your backend" : "Exact model, recipe, dependencies, and canary must pass"],
    ["Controls", text ? "Model, limits, concurrency, schedule, pause" : "Profile capabilities, output bounds, schedule, pause and drain; one job at a time"],
    ["Network need", networkSnapshot],
    ["Worker sees", "Plaintext request inputs and outputs"],
    ["Rewards", text ? "Accepted work contributes to the current AIPG period split" : "Qualification benchmarks are unpaid; approved worker jobs use the current split"],
    ["Maturity", text ? "Public text worker" : "Managed media qualification"],
  ];

  return (
    <div className="mb-4">
      <p className="border-b border-white/10 py-2 text-xs font-bold uppercase text-gray-400">
        Before you download
      </p>
      <dl className="grid text-sm leading-5">
        {facts.map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-[88px_minmax(0,1fr)] gap-3 border-b border-white/5 py-2 last:border-b-0"
          >
            <dt className="font-semibold text-gray-400">{label}</dt>
            <dd className="min-w-0 text-gray-300">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function FirstRunSteps({ artifactName, installerName, version }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white">First run on Linux</h2>
      <ol className="mt-4 grid grid-cols-1 gap-5 text-sm leading-6 text-gray-300">
        <li>
          <span className="mr-2 font-mono text-orange-300">1.</span>
          Start the Ollama or OpenAI-compatible backend that already serves
          your model.
        </li>
        <li>
          <span className="mr-2 font-mono text-orange-300">2.</span>
          {installerName
            ? "Run the checksum-enforcing installer. It installs the worker but does not start it:"
            : "Make the downloaded binary executable and launch it:"}
          <pre className="mt-2 overflow-x-auto border border-white/10 bg-black/70 p-3 text-[11px] leading-5 text-gray-200">
            <code>
              {installerName
                ? "cd ~/Downloads\nchmod +x " +
                  installerName +
                  "\n./" +
                  installerName +
                  "\n~/.local/bin/grid-inference-worker --verify-runtime\n~/.local/bin/grid-inference-worker"
                : "cd ~/Downloads\nchmod +x " +
                  artifactName +
                  "\n./" +
                  artifactName}
            </code>
          </pre>
        </li>
        <li>
          <span className="mr-2 font-mono text-orange-300">3.</span>
          Complete the local wizard at{" "}
          <code className="break-all text-gray-100">
            http://localhost:7861
          </code>
          .{" "}
          {["0.3.6", "0.3.7", "0.3.8"].includes(version) ? (
            <>
              Version {version} uses a scoped Grid API key from the developer
              <a href="https://console.aipowergrid.io/dashboard/api-key" className="text-cyan-300 underline">Console</a>. Enter it only in the local wizard, never in a shell
              command or public issue.
            </>
          ) : (
            <>
              Follow the credential step shown by this release&apos;s local
              wizard and release notes. Never put the credential in a shell
              command or public issue.
            </>
          )}
        </li>
        <li>
          <span className="mr-2 font-mono text-orange-300">4.</span>
          Wait for the dashboard to report <strong>Online</strong>, then confirm
          the exact worker name or ID with the public worker check below.
        </li>
      </ol>
      <p className="mt-4 border border-cyan-400/25 bg-cyan-400/5 p-3 text-[11px] leading-5 text-cyan-100">
        The worker never needs a wallet private key. Configure the payout wallet
        separately in Console settings after the worker is healthy.
      </p>
    </div>
  );
}
