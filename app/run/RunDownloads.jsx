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
  windows: { label: "Windows", detail: "Windows 11 x86_64" },
};

function formatBytes(value) {
  if (!value) return null;
  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

export default function RunDownloads({ release }) {
  const [platform, setPlatform] = useState("linux");

  useEffect(() => {
    const platformHint = navigator.userAgentData?.platform || navigator.platform || "";
    const userAgent = navigator.userAgent || "";
    if (/^win/i.test(platformHint) || /windows/i.test(userAgent)) {
      setPlatform("windows");
    }
  }, []);

  const selected = useMemo(() => release?.[platform] || null, [release, platform]);
  const releaseReady = Boolean(release && selected && release.checksums && release.manifest);

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
        <div className="relative mx-auto flex min-h-[620px] max-w-6xl items-center px-6 py-20 md:px-8 lg:min-h-[680px]">
          <div className="w-full max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-300">
              <FiShield aria-hidden="true" />
              Signed worker manager
            </div>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.04] sm:text-6xl lg:text-7xl">
              Run AI Power Grid
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
              Put a supported NVIDIA GPU to work serving decentralized audio jobs.
              One manager validates the machine, installs exact artifacts, tests the
              runtime, connects your payout wallet, and starts the worker.
            </p>

            <div className="mt-9 max-w-xl border border-white/15 bg-black/75 p-5 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Choose your operating system</p>
                  <p className="mt-1 text-xs text-gray-400">
                    Final compatibility is checked locally.
                  </p>
                </div>
                {release?.version && (
                  <span className="text-xs font-mono text-gray-400">v{release.version}</span>
                )}
              </div>

              <div className="mb-4 grid grid-cols-2 border border-white/15 bg-[#111214] p-1">
                {Object.entries(PLATFORMS).map(([value, item]) => (
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
                  Download for {PLATFORMS[platform].label}
                  {formatBytes(selected.bytes) && (
                    <span className="font-normal text-black/65">
                      {formatBytes(selected.bytes)}
                    </span>
                  )}
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="min-h-12 w-full cursor-not-allowed bg-white/10 px-5 font-semibold text-gray-400"
                >
                  Release qualification in progress
                </button>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-400">
                <span className="inline-flex items-center gap-1.5">
                  <FiMonitor aria-hidden="true" />
                  {PLATFORMS[platform].detail}
                </span>
                {releaseReady && (
                  <>
                    <a
                      href={release.checksums.url}
                      className="inline-flex items-center gap-1.5 hover:text-white"
                    >
                      SHA256SUMS <FiExternalLink aria-hidden="true" />
                    </a>
                    <a
                      href={release.releaseUrl}
                      className="inline-flex items-center gap-1.5 hover:text-white"
                    >
                      Release notes <FiExternalLink aria-hidden="true" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#090a0c]">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[1fr_auto] md:items-center md:px-8">
          <div>
            <h2 className="text-xl font-bold">ACE-Step audio profile</h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Minimum: 6 GiB NVIDIA VRAM, 16 GiB RAM, and 24 GiB free disk.
              Recommended: 12 GiB VRAM, 32 GiB RAM, and 32 GiB free disk.
            </p>
          </div>
          <ul className="grid gap-2 text-sm text-gray-300 sm:grid-cols-3 md:grid-cols-1">
            <li className="flex items-center gap-2"><FiCheck className="text-green-400" />Resumable install</li>
            <li className="flex items-center gap-2"><FiCheck className="text-green-400" />Local audio canary</li>
            <li className="flex items-center gap-2"><FiCheck className="text-green-400" />Wallet delegation</li>
          </ul>
        </div>
      </section>
    </>
  );
}
