import Image from "next/image";
import {
  FiCheck,
  FiDownload,
  FiExternalLink,
  FiShield,
  FiTerminal,
  FiUsers,
} from "react-icons/fi";
import { assessValidatorCoreCapability } from "./releaseGate.mjs";

const RELEASE_TAG = "v0.1.0-preview.12";
const RELEASE_API =
  `https://api.github.com/repos/AIPowerGrid/grid-validator/releases/tags/${RELEASE_TAG}`;
const VALIDATOR_CAPABILITIES_API =
  "https://api.aipowergrid.io/v1/validator/capabilities";
const COHORT_ISSUE_URL =
  "https://github.com/AIPowerGrid/grid-validator/issues/5";
const COHORT_RUNBOOK_URL =
  "https://github.com/AIPowerGrid/grid-validator/blob/master/PREVIEW_COHORT.md";

export const metadata = {
  title: "Run an AI Power Grid Validator",
  description:
    "Install the verified unsigned CPU-only validator preview, register a wallet-bound identity, and contribute independent worker evidence.",
};

async function getValidatorRelease() {
  try {
    const response = await fetch(RELEASE_API, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    const release = await response.json();
    if (release.draft || release.tag_name !== RELEASE_TAG) return null;
    const asset = (name) =>
      release.assets.find((item) => item.name === name)?.browser_download_url ||
      null;
    const assets = {
      linuxX64: asset("aipg-validator-linux-x64.zip"),
      linuxArm64: asset("aipg-validator-linux-arm64.zip"),
      macArm64: asset("aipg-validator-macos-arm64.zip"),
      windowsX64: asset("aipg-validator-windows-x64.zip"),
      checksums: asset("SHA256SUMS"),
      sbom: asset("aipg-validator-release.spdx.json"),
      installer: asset("install-validator.sh"),
    };
    return Object.values(assets).every(Boolean)
      ? {
          ...assets,
          releaseUrl: release.html_url,
          publishedAt: release.published_at,
        }
      : null;
  } catch {
    return null;
  }
}

async function getValidatorCoreReadiness() {
  try {
    const response = await fetch(VALIDATOR_CAPABILITIES_API, {
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      return {
        ready: false,
        reasons: [`capability endpoint returned ${response.status}`],
      };
    }
    return assessValidatorCoreCapability(await response.json());
  } catch {
    return { ready: false, reasons: ["capability endpoint unavailable"] };
  }
}

const DOWNLOADS = [
  ["Linux x64", "linuxX64"],
  ["Linux ARM64", "linuxArm64"],
  ["macOS Apple Silicon", "macArm64"],
  ["Windows x64", "windowsX64"],
];

export default async function ValidatePage() {
  const [releaseCandidate, coreReadiness] = await Promise.all([
    getValidatorRelease(),
    getValidatorCoreReadiness(),
  ]);
  const release = coreReadiness.ready ? releaseCandidate : null;

  return (
    <main className="bg-black text-white">
      <section className="relative min-h-[600px] overflow-hidden border-b border-white/10">
        <Image
          src="/Banner-Backgrounds/aipg Wallpaper V3 (67).png"
          alt="AI Power Grid network"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-black/65" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[600px] max-w-6xl items-center px-6 py-20 md:px-8">
          <div className="min-w-0 max-w-3xl">
            <p className="mb-5 flex items-center gap-2 text-sm font-semibold text-cyan-300">
              <FiShield aria-hidden="true" /> Validator preview
            </p>
            <h1 className="text-3xl font-black leading-tight sm:text-6xl lg:text-7xl">
              Check the Grid independently.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
              Run a lightweight node that receives targeted assignments,
              evaluates worker responses, and signs compact evidence. It needs a
              CPU and an internet connection, not a GPU.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#downloads"
                className="inline-flex min-h-12 items-center gap-2 bg-cyan-400 px-6 font-bold text-black hover:bg-cyan-300"
              >
                <FiDownload aria-hidden="true" /> Install validator
              </a>
              <a
                href="https://github.com/AIPowerGrid/grid-validator"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 border border-white/20 bg-black/50 px-6 font-semibold hover:bg-white/10"
              >
                Source <FiExternalLink aria-hidden="true" />
              </a>
              <a
                href={COHORT_ISSUE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 border border-white/20 bg-black/50 px-6 font-semibold hover:bg-white/10"
              >
                <FiUsers aria-hidden="true" /> Join preview cohort
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#0b0c0e]">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-8 lg:py-20">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase text-orange-400">
              Before you run it
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">
              Preview means evidence, not authority
            </h2>
            <p className="mt-4 leading-7 text-gray-400">
              There are no validator rewards, staking, slashing, or worker
              penalties in this release. Until independently operated nodes and
              shared 3-of-5 probe groups are proven, this is distributed testing
              rather than decentralized validation.
            </p>
          </div>
          <ul className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
            {[
              "Grid-issued assignments only",
              "Wallet-signed registration and evidence",
              "No inference, funding, or account-management scope",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 bg-[#111214] p-5 text-sm text-gray-300"
              >
                <FiCheck className="mt-0.5 shrink-0 text-green-400" /> {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-4 border-l-2 border-cyan-400 bg-[#111214] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold text-white">
                We are recruiting 5-10 independent operators
              </h3>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                One person or organization counts once, even if it runs several
                nodes. Volunteer through the tracked cohort issue, then complete
                a 72-hour no-reward qualification.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href={COHORT_ISSUE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 bg-cyan-400 px-5 text-sm font-bold text-black hover:bg-cyan-300"
              >
                Volunteer to run a node <FiUsers aria-hidden="true" />
              </a>
              <a
                href={COHORT_RUNBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 border border-cyan-400/60 px-5 text-sm font-bold text-cyan-300 hover:bg-cyan-400/10"
              >
                Cohort runbook <FiExternalLink aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="downloads" className="scroll-mt-20 bg-black">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-8 lg:py-20">
          <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="min-w-0">
              <p className="mb-3 text-sm font-bold uppercase text-cyan-400">
                Install
              </p>
              <h2 className="text-3xl font-bold md:text-4xl">
                Verified downloads
              </h2>
              <p className="mt-4 leading-7 text-gray-400">
                Every archive ships with a SHA-256 manifest, SPDX SBOM, and
                GitHub build provenance. The installer checks the archive before
                executing it.
              </p>
            </div>
            <div className="min-w-0 space-y-5">
              {release ? (
                <>
                  <a
                    href={release.installer}
                    className="mb-2 flex min-h-12 items-center justify-between bg-cyan-400 px-4 text-sm font-bold text-black hover:bg-cyan-300"
                  >
                    Download verified installer{" "}
                    <FiDownload aria-hidden="true" />
                  </a>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {DOWNLOADS.map(([label, key]) => (
                      <a
                        key={key}
                        href={release[key]}
                        className="flex min-h-12 items-center justify-between border border-white/15 bg-[#111214] px-4 text-sm font-semibold hover:border-cyan-400/60"
                      >
                        {label} <FiDownload aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <div className="border border-orange-400/30 bg-orange-400/5 p-5 text-sm text-orange-200">
                  {coreReadiness.ready
                    ? "The preview release is still being qualified. Downloads stay closed until all four binaries, installer, checksums, SBOM, and provenance are present."
                    : "Downloads remain closed until production Core advertises the reviewed shared-quorum preview contract. Source installation remains available for no-probe checks."}
                </div>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                {release ? (
                  <>
                    <a href={release.checksums} className="hover:text-white">
                      SHA256SUMS
                    </a>
                    <a href={release.sbom} className="hover:text-white">
                      SPDX SBOM
                    </a>
                    <a href={release.releaseUrl} className="hover:text-white">
                      Release notes
                    </a>
                  </>
                ) : null}
              </div>
              <div className="border border-white/10 bg-[#101113] p-5 font-mono text-sm text-gray-200">
                <p className="mb-3 flex items-center gap-2 font-sans font-semibold text-white">
                  <FiTerminal /> First-time setup
                </p>
                <p>aipg-validator app</p>
                <p className="mt-2 font-sans text-xs text-gray-400">
                  On Windows, extract the download and double-click
                  aipg-validator.exe. Choose 8 to open the local operator app,
                  then Set up node, confirm, and Start validator. Existing
                  operators skip setup and keep their configuration.
                </p>
                <p className="my-3 font-sans text-xs text-gray-400">
                  Setup creates a dedicated node account and saves its signing
                  key locally. No personal private key, funded wallet, Google,
                  or GitHub login is needed. Existing-account pairing is not
                  available yet; keep your existing node configuration if you
                  already run a validator.
                </p>
                <p className="font-sans text-xs leading-6 text-gray-400">
                  Confirm acknowledged heartbeats and accepted evidence in the
                  app. Closing the browser tab leaves it running; Exit app
                  stops its node and closes the local server. Never share its
                  private localhost URL.
                </p>
                <a
                  href="https://aipowergrid.io/docs/validator-node"
                  className="mt-3 inline-block font-sans text-xs text-cyan-300 hover:text-white"
                >
                  Full setup and headless server guide
                </a>
              </div>
              <div className="border border-white/10 bg-[#101113] p-5 text-sm text-gray-300">
                <p className="font-semibold text-white">Docker on Linux x64 / ARM64</p>
                <code className="mt-3 block overflow-x-auto text-cyan-300">
                  docker pull ghcr.io/aipowergrid/validator:{RELEASE_TAG}
                </code>
                <p className="mt-3 leading-6 text-gray-400">
                  The preview image is public and version-pinned. Prereleases do
                  not publish <code>latest</code>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
