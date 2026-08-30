"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  FiCheck,
  FiDownload,
  FiExternalLink,
  FiMonitor,
  FiShield,
} from "react-icons/fi";

const PLATFORMS = {
  linux: { label: "Linux", detail: "Ubuntu 22.04+ x86_64" },
  linuxArm64: { label: "Linux ARM64", detail: "Linux aarch64" },
  macos: { label: "macOS", detail: "Apple Silicon" },
  windows: { label: "Windows", detail: "Windows 11 x86_64" },
};

function formatBytes(value) {
  if (!value) return null;
  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

export default function RunDownloads({
  mediaRelease,
  mediaQualificationRelease,
  textRelease,
}) {
  const [workerType, setWorkerType] = useState("text");
  const [platform, setPlatform] = useState("linux");

  useEffect(() => {
    const platformHint =
      navigator.userAgentData?.platform || navigator.platform || "";
    const userAgent = navigator.userAgent || "";
    if (/^win/i.test(platformHint) || /windows/i.test(userAgent)) {
      setPlatform("windows");
    } else if (/mac/i.test(platformHint) || /macintosh/i.test(userAgent)) {
      setPlatform("macos");
    } else if (/aarch64|arm64/i.test(platformHint)) {
      setPlatform("linuxArm64");
    }
  }, []);

  useEffect(() => {
    if (workerType === "media" && !["linux", "windows"].includes(platform)) {
      setPlatform("linux");
    }
  }, [platform, workerType]);

  const release = workerType === "text" ? textRelease : mediaRelease;
  const platformStatus =
    workerType === "text" ? release?.platforms?.[platform] : null;
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
  const qualificationSelected =
    workerType === "media"
      ? mediaQualificationRelease?.[platform] || null
      : null;
  const platformEntries = Object.entries(PLATFORMS).filter(
    ([value]) => workerType === "text" || ["linux", "windows"].includes(value),
  );

  return (
    <>
      <section className="relative min-h-[620px] overflow-hidden border-b border-white/10 lg:min-h-[680px]">
        <Image
          src="/Banner-Backgrounds/aipg Wallpaper V3 (67).png"
          alt="AI Power Grid network"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[620px] max-w-6xl items-start px-6 pb-16 pt-28 md:items-center md:px-8 md:py-20 lg:min-h-[680px]">
          <div className="w-full max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-300">
              <FiShield aria-hidden="true" />
              Worker software
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.04] sm:text-6xl lg:text-7xl">
              Run AI Power Grid
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
              Put a supported GPU to work serving decentralized text, image,
              video, and audio jobs. Downloads open only for immutable releases
              whose manifests, checksums, SBOMs, and GitHub asset identities
              pass the public release gate.
            </p>

            <div className="mt-9 max-w-xl border border-white/15 bg-black/75 p-5 backdrop-blur-sm">
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
                    onClick={() => setPlatform(value)}
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

              {releaseReady ? (
                <a
                  href={selected.url}
                  className="flex min-h-12 w-full items-center justify-center gap-2 bg-orange-500 px-5 font-bold text-black transition-colors hover:bg-orange-400"
                >
                  <FiDownload aria-hidden="true" />
                  Download{" "}
                  {workerType === "text"
                    ? "text worker"
                    : "media manager"} for {PLATFORMS[platform].label}
                  {formatBytes(selected.bytes) && (
                    <span className="font-normal text-black/65">
                      {formatBytes(selected.bytes)}
                    </span>
                  )}
                </a>
              ) : (
                <div>
                  <button
                    type="button"
                    disabled
                    className="min-h-12 w-full cursor-not-allowed bg-white/10 px-5 font-semibold text-gray-400"
                  >
                    {workerType === "media"
                      ? "Media qualification in progress"
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
                  ) : null}
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
                  ? "One verified binary opens the local setup wizard; no Python environment or separate Grid installer is required. Your inference backend remains a separate local service."
                  : "The unified media manager is still qualification-gated. Benchmark tools do not enroll a worker or advertise capabilities."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#090a0c]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1fr_auto] md:items-center md:px-8">
          <div>
            <h2 className="text-xl font-bold">
              {textRelease
                ? "Verified Linux text worker · desktop signing pending"
                : "Text candidate in validation · qualified media next"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              The verified Linux worker connects to an existing Ollama, vLLM,
              SGLang, LMDeploy, LM Studio, or KoboldCpp backend. macOS remains
              blocked until Developer ID notarization and Windows remains
              blocked until Authenticode signing. The first managed media
              profile targets ACE-Step audio and stays unavailable until its
              signed qualification evidence is complete.
            </p>
          </div>
          <ul className="grid gap-2 text-sm text-gray-300 sm:grid-cols-3 md:grid-cols-1">
            <li className="flex items-center gap-2">
              {textRelease ? (
                <FiCheck className="text-green-400" />
              ) : (
                <FiShield className="text-gray-400" />
              )}
              {textRelease ? "Linux release verified" : "Text release gated"}
            </li>
            <li className="flex items-center gap-2">
              <FiCheck className="text-green-400" />
              WebSocket dispatch
            </li>
            <li className="flex items-center gap-2">
              <FiCheck className="text-green-400" />
              Media fail-closed
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
