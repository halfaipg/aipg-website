import Image from "next/image";
import {
  FiCheck,
  FiDownload,
  FiExternalLink,
  FiRefreshCw,
  FiShield,
  FiTerminal,
  FiUsers,
} from "react-icons/fi";
import { normalizeValidatorCohortStatus } from "./cohortStatus.mjs";
import {
  linuxCohortCommands,
  SYSTEMD_HELPER_COMMIT,
  VALIDATOR_RELEASE_TAG,
} from "./linuxServiceContract.mjs";
import { assessValidatorCoreCapability } from "./releaseGate.mjs";
import ValidatorStatusLookup from "./ValidatorStatusLookup";

const RELEASE_TAG = VALIDATOR_RELEASE_TAG;
const RELEASE_API =
  `https://api.github.com/repos/AIPowerGrid/grid-validator/releases/tags/${RELEASE_TAG}`;
const VALIDATOR_CAPABILITIES_API =
  "https://api.aipowergrid.io/v1/validator/capabilities";
const NETWORK_STATUS_API =
  "https://api.aipowergrid.io/v1/status/network";
const COHORT_ISSUE_URL =
  "https://github.com/AIPowerGrid/grid-validator/issues/5";
const COHORT_RUNBOOK_URL =
  "https://github.com/AIPowerGrid/grid-validator/blob/master/PREVIEW_COHORT.md";

export const metadata = {
  title: "Run an AI Power Grid Validator",
  description:
    "Install the verified unsigned CPU-only validator preview, create a dedicated local signing identity, and contribute independent worker evidence.",
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

async function getValidatorCohortStatus() {
  try {
    const response = await fetch(NETWORK_STATUS_API, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    return normalizeValidatorCohortStatus(await response.json(), RELEASE_TAG);
  } catch {
    return null;
  }
}

const DOWNLOADS = [
  ["Linux x64", "linuxX64"],
  ["Linux ARM64", "linuxArm64"],
  ["macOS Apple Silicon", "macArm64"],
  ["Windows x64", "windowsX64"],
];

export default async function ValidatePage() {
  const [releaseCandidate, coreReadiness, cohortStatus] = await Promise.all([
    getValidatorRelease(),
    getValidatorCoreReadiness(),
    getValidatorCohortStatus(),
  ]);
  const release = coreReadiness.ready ? releaseCandidate : null;
  const linuxCommands = linuxCohortCommands();

  return (
    <main className="bg-black text-white">
      <section className="relative min-h-[600px] overflow-hidden border-b border-white/10">
        <Image
          src="/operator-validator-hero.png"
          alt="Independent network appliances running AI Power Grid validators"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] opacity-90 md:object-center"
        />
        <div className="absolute inset-0 bg-black/55 md:bg-black/45" aria-hidden="true" />
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
                Two Linux operators needed for the initial gate
              </h3>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                One independent candidate is qualifying now. The first gate
                requires three unrelated operators, and one person or
                organization counts once even if it runs several nodes. Volunteer
                through the tracked cohort issue, then complete a 72-hour
                no-reward qualification.
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
          <div className="mt-8 border border-white/10 bg-[#111214]">
            <div className="flex flex-col gap-3 border-b border-white/10 p-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase text-cyan-300">
                  Live preview cohort
                </p>
                <h3 className="mt-2 text-xl font-bold text-white">
                  Registration is not qualification
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-400">
                  These are current public operational counts. A validator only
                  adds independent quorum weight after its operator and 72-hour
                  run are reviewed. Preview evidence still has no economic or
                  routing effect.
                </p>
              </div>
              <a
                href="https://aipowergrid.io/status"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-white"
              >
                Network status <FiExternalLink aria-hidden="true" />
              </a>
            </div>
            {cohortStatus ? (
              <>
                <dl className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["Fresh heartbeats", cohortStatus.heartbeatFresh],
                    ["Participating", cohortStatus.participating],
                    ["Verified independent", cohortStatus.verifiedIndependent],
                    ["Assignments completed", cohortStatus.assignmentsCompleted],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-[#0b0c0e] p-5">
                      <dt className="text-xs font-semibold uppercase text-gray-500">
                        {label}
                      </dt>
                      <dd className="mt-2 text-3xl font-black tabular-nums text-white">
                        {value.toLocaleString("en-US")}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                  <div>
                    <p className="flex items-center gap-2 font-semibold text-white">
                      <FiRefreshCw className="text-orange-300" aria-hidden="true" />
                      Current release adoption
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      {cohortStatus.currentVersionCount} fresh validator
                      {cohortStatus.currentVersionCount === 1 ? " reports " : "s report "}
                      <strong className="text-gray-200">{RELEASE_TAG}</strong>
                      {cohortStatus.olderVersionCount > 0
                        ? `; ${cohortStatus.olderVersionCount} still report an older preview.`
                        : "."}
                    </p>
                    {cohortStatus.olderVersionCount > 0 ? (
                      <p className="mt-2 text-sm leading-6 text-orange-200">
                        Existing operators should replace the executable with
                        the current release and keep their configuration and
                        node identity. Do not re-enroll to upgrade.
                      </p>
                    ) : null}
                  </div>
                  <a
                    href="#downloads"
                    className="inline-flex min-h-12 items-center justify-center gap-2 bg-orange-400 px-5 text-sm font-bold text-black hover:bg-orange-300"
                  >
                    Get {RELEASE_TAG} <FiDownload aria-hidden="true" />
                  </a>
                </div>
              </>
            ) : (
              <p className="p-5 text-sm leading-6 text-gray-400">
                Live cohort telemetry is temporarily unavailable. This does not
                prove that validators are offline; use the network status page
                for the latest public report.
              </p>
            )}
          </div>
          <ValidatorStatusLookup currentVersion={RELEASE_TAG} />
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
              <div className="min-w-0 border border-cyan-400/30 bg-cyan-400/5 p-5">
                <p className="flex items-center gap-2 font-semibold text-white">
                  <FiTerminal aria-hidden="true" /> Linux server: keep it alive
                  for 72 hours
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  This is the recommended cohort path. It installs the frozen
                  preview.13 binary, creates a dedicated validator identity,
                  and runs it as a hardened systemd service. Setup prompts
                  locally; no private key belongs in these commands.
                </p>
                <ol className="mt-5 space-y-5 text-sm text-gray-300">
                  <li>
                    <p className="mb-2 font-semibold text-white">
                      1. Install, enroll, and check the node
                    </p>
                    <pre className="max-w-full overflow-x-auto border border-white/10 bg-black p-4 text-xs leading-6 text-cyan-200">
                      <code>{linuxCommands.install}</code>
                    </pre>
                  </li>
                  <li>
                    <p className="mb-2 font-semibold text-white">
                      2. Verify and install the pinned service helper
                    </p>
                    <pre className="max-w-full overflow-x-auto border border-white/10 bg-black p-4 text-xs leading-6 text-cyan-200">
                      <code>{linuxCommands.service}</code>
                    </pre>
                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      Helper source is pinned to reviewed commit{" "}
                      <a
                        href={`https://github.com/AIPowerGrid/grid-validator/commit/${SYSTEMD_HELPER_COMMIT}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-cyan-300 hover:text-white"
                      >
                        {SYSTEMD_HELPER_COMMIT.slice(0, 7)}
                      </a>
                      {" "}and checked before execution. It never follows a
                      moving branch or pipes a download into a shell.
                    </p>
                  </li>
                  <li>
                    <p className="mb-2 font-semibold text-white">
                      3. Confirm the service and accepted evidence
                    </p>
                    <pre className="max-w-full overflow-x-auto border border-white/10 bg-black p-4 text-xs leading-6 text-cyan-200">
                      <code>{linuxCommands.verify}</code>
                    </pre>
                  </li>
                </ol>
                <p className="mt-4 text-xs leading-5 text-gray-400">
                  Stop any validator child started by the local app before
                  enabling systemd. Keep the same <code>.env</code> and validator
                  ID for the entire qualification; do not re-enroll during an
                  upgrade or restart.
                </p>
              </div>
              <div className="border border-white/10 bg-[#101113] p-5 font-mono text-sm text-gray-200">
                <p className="mb-3 flex items-center gap-2 font-sans font-semibold text-white">
                  <FiTerminal /> First-time setup
                </p>
                <p>aipg-validator app</p>
                <p className="mt-2 font-sans text-xs text-gray-400">
                  Desktop path: on Windows, extract the download and double-click
                  aipg-validator.exe. Choose 8 to open the local operator app,
                  then choose Set up node, confirm Create node account, and
                  choose Start validator. Published preview.13 keeps setup and
                  start as separate actions. Existing operators skip setup and
                  keep their configuration.
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
