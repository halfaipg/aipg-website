import RunDownloads from "./RunDownloads";
import OperatorPlanner from "./OperatorPlanner";
import {
  decodeReleaseContract,
  getReleaseTagCommit,
  releaseContractAssetSizesAllowed,
} from "../releaseContract.mjs";
import {
  assessManagerRelease,
  assessQualificationRelease,
  assessTextRelease,
} from "./releaseGate.mjs";

const MEDIA_RELEASES_API =
  "https://api.github.com/repos/AIPowerGrid/grid-media-worker/releases?per_page=20";
const TEXT_RELEASES_API =
  "https://api.github.com/repos/AIPowerGrid/grid-text-worker/releases?per_page=20";
const GRID_API = "https://api.aipowergrid.io";
const MEDIA_REPOSITORY = "AIPowerGrid/grid-media-worker";
const TEXT_REPOSITORY = "AIPowerGrid/grid-text-worker";

export const metadata = {
  title: "Run an AI Power Grid Worker",
  description:
    "Find verified AI Power Grid worker releases, validate hardware locally, and inspect current network capacity needs.",
};

async function getReleaseList(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: { revalidate: 300 },
  });
  if (!response.ok) return [];
  return response.json();
}

async function getReleaseContract(release, manifestName) {
  const manifest = release.assets.find((item) => item.name === manifestName);
  const checksums = release.assets.find((item) => item.name === "SHA256SUMS");
  if (
    !manifest ||
    !checksums ||
    !releaseContractAssetSizesAllowed(manifest, checksums)
  ) {
    return null;
  }
  const [manifestResponse, checksumResponse] = await Promise.all([
    fetch(manifest.browser_download_url, { next: { revalidate: 300 } }),
    fetch(checksums.browser_download_url, { next: { revalidate: 300 } }),
  ]);
  if (!manifestResponse.ok || !checksumResponse.ok) return null;
  try {
    const [manifestBytes, checksumBytes] = await Promise.all([
      manifestResponse.arrayBuffer(),
      checksumResponse.arrayBuffer(),
    ]);
    return decodeReleaseContract(
      manifest,
      checksums,
      manifestBytes,
      checksumBytes,
    );
  } catch {
    return null;
  }
}

async function getManagerRelease() {
  try {
    const releases = await getReleaseList(MEDIA_RELEASES_API);
    const release = releases.find(
      (item) =>
        !item.draft &&
        !item.prerelease &&
        typeof item.tag_name === "string" &&
        item.tag_name.startsWith("manager-v"),
    );
    if (!release) return null;
    const [contract, resolvedTagCommit] = await Promise.all([
      getReleaseContract(release, "manager-release.json"),
      getReleaseTagCommit(MEDIA_REPOSITORY, release.tag_name),
    ]);
    const verifiedRelease = {
      ...release,
      resolved_tag_commit: resolvedTagCommit,
    };
    if (
      !contract ||
      !assessManagerRelease(
        verifiedRelease,
        contract.manifest,
        contract.checksums,
      ).ready
    ) {
      return null;
    }
    const asset = (name) => {
      const found = release.assets.find((item) => item.name === name);
      return found
        ? {
            name: found.name,
            url: found.browser_download_url,
            bytes: found.size,
          }
        : null;
    };
    return {
      version: release.tag_name.replace("manager-v", ""),
      publishedAt: release.published_at,
      releaseUrl: release.html_url,
      linux: asset("grid-media-manager-linux-x86_64"),
      windows: asset("grid-media-manager-windows-x86_64.exe"),
      checksums: asset("SHA256SUMS"),
      manifest: asset("manager-release.json"),
      sbom: asset("grid-media-manager-release.spdx.json"),
    };
  } catch {
    return null;
  }
}

async function getManagerQualificationRelease() {
  try {
    const releases = await getReleaseList(MEDIA_RELEASES_API);
    const release = releases.find(
      (item) =>
        !item.draft &&
        item.prerelease &&
        typeof item.tag_name === "string" &&
        item.tag_name.startsWith("manager-qualification-v"),
    );
    if (!release) return null;
    const [contract, resolvedTagCommit] = await Promise.all([
      getReleaseContract(release, "manager-qualification.json"),
      getReleaseTagCommit(MEDIA_REPOSITORY, release.tag_name),
    ]);
    const verifiedRelease = {
      ...release,
      resolved_tag_commit: resolvedTagCommit,
    };
    if (
      !contract ||
      !assessQualificationRelease(
        verifiedRelease,
        contract.manifest,
        contract.checksums,
      ).ready
    ) {
      return null;
    }
    const asset = (name) => {
      const found = release.assets.find((item) => item.name === name);
      return found
        ? {
            name: found.name,
            url: found.browser_download_url,
            bytes: found.size,
          }
        : null;
    };
    const candidate = {
      version: release.tag_name.replace("manager-qualification-v", ""),
      publishedAt: release.published_at,
      releaseUrl: release.html_url,
      linux: asset("grid-media-manager-linux-x86_64"),
      windows: asset("grid-media-manager-windows-x86_64.exe"),
      checksums: asset("SHA256SUMS"),
      manifest: asset("manager-qualification.json"),
      sbom: asset("grid-media-manager-qualification.spdx.json"),
    };
    return candidate.linux &&
      candidate.windows &&
      candidate.checksums &&
      candidate.manifest &&
      candidate.sbom
      ? candidate
      : null;
  } catch {
    return null;
  }
}

async function getTextRelease() {
  try {
    const releases = await getReleaseList(TEXT_RELEASES_API);
    const release = releases.find(
      (item) =>
        !item.draft &&
        !item.prerelease &&
        typeof item.tag_name === "string" &&
        /^v[0-9]+\.[0-9]+\.[0-9]+$/.test(item.tag_name),
    );
    if (!release) return null;
    const [contract, resolvedTagCommit] = await Promise.all([
      getReleaseContract(release, "worker-release.json"),
      getReleaseTagCommit(TEXT_REPOSITORY, release.tag_name),
    ]);
    const verifiedRelease = {
      ...release,
      resolved_tag_commit: resolvedTagCommit,
    };
    if (
      !contract ||
      !assessTextRelease(verifiedRelease, contract.manifest, contract.checksums)
        .ready
    ) {
      return null;
    }
    const asset = (name) => {
      const found = release.assets.find((item) => item.name === name);
      return found
        ? {
            name: found.name,
            url: found.browser_download_url,
            bytes: found.size,
          }
        : null;
    };
    return {
      version: release.tag_name.replace(/^v/, ""),
      publishedAt: release.published_at,
      releaseUrl: release.html_url,
      linux: asset("grid-inference-worker-linux-x64"),
      linuxArm64: asset("grid-inference-worker-linux-arm64"),
      macos: asset("grid-inference-worker-macos-arm64.zip"),
      windows: asset("grid-inference-worker-windows-x64.exe"),
      checksums: asset("SHA256SUMS"),
      manifest: asset("worker-release.json"),
      sbom: asset("grid-inference-worker-release.spdx.json"),
    };
  } catch {
    return null;
  }
}

async function getOperatorOpportunities() {
  try {
    const [statusResponse, statsResponse] = await Promise.all([
      fetch(`${GRID_API}/v1/status/models`, { next: { revalidate: 300 } }),
      fetch(`${GRID_API}/v1/stats/models?period=month`, {
        next: { revalidate: 300 },
      }),
    ]);
    if (!statusResponse.ok || !statsResponse.ok) return [];
    const [status, stats] = await Promise.all([
      statusResponse.json(),
      statsResponse.json(),
    ]);
    if (!Array.isArray(status) || !Array.isArray(stats?.models)) return [];

    const history = new Map(
      stats.models.map((item) => [`${item.type}:${item.name}`, item]),
    );
    return status
      .filter(
        (item) =>
          item &&
          typeof item.name === "string" &&
          typeof item.type === "string" &&
          Number.isFinite(Number(item.count)),
      )
      .map((item) => {
        const measured = history.get(`${item.type}:${item.name}`) || {};
        return {
          name: item.name,
          type: item.type,
          workers: Math.max(0, Number(item.count) || 0),
          jobs30d: Math.max(0, Number(measured.jobs) || 0),
          tokensPerSecond: Number.isFinite(Number(measured.tokens_per_s))
            ? Number(measured.tokens_per_s)
            : null,
          averageLatencySeconds: Number.isFinite(Number(measured.avg_latency_s))
            ? Number(measured.avg_latency_s)
            : null,
        };
      })
      .sort(
        (left, right) =>
          left.workers - right.workers || right.jobs30d - left.jobs30d,
      );
  } catch {
    return [];
  }
}

export default async function RunPage() {
  const [mediaRelease, mediaQualificationRelease, textRelease, opportunities] =
    await Promise.all([
      getManagerRelease(),
      getManagerQualificationRelease(),
      getTextRelease(),
      getOperatorOpportunities(),
    ]);

  return (
    <main className="bg-black text-white">
      <RunDownloads
        mediaRelease={mediaRelease}
        mediaQualificationRelease={mediaQualificationRelease}
        textRelease={textRelease}
      />

      <OperatorPlanner
        opportunities={opportunities}
        mediaReady={Boolean(mediaRelease)}
        textReady={Boolean(textRelease)}
      />

      <section className="border-y border-white/10 bg-[#111214]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[0.8fr_1.2fr] md:px-8 lg:py-20">
          <div>
            <p className="mb-3 text-sm font-bold uppercase text-orange-400">
              Local decision
            </p>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              The browser does not decide what your GPU can run.
            </h2>
          </div>
          <div className="grid gap-7 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                Private hardware check
              </h3>
              <p className="text-sm leading-6 text-gray-400">
                The manager detects GPU, VRAM, driver, RAM, disk, and
                architecture locally. The Grid receives a capability tier and
                measured performance, not your complete hardware inventory.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                Fail-closed profiles
              </h3>
              <p className="text-sm leading-6 text-gray-400">
                Exact source, dependencies, model files, and recipes are
                verified before installation and again before serving. A
                capability stays unavailable until its local canary passes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-8 lg:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase text-orange-400">
              One path
            </p>
            <h2 className="text-3xl font-bold md:text-4xl">
              From download to paid work
            </h2>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-3">
            <li className="bg-[#101113] p-7">
              <span className="mb-5 block text-sm font-bold text-orange-400">
                01
              </span>
              <h3 className="mb-2 text-xl font-semibold">Verify and install</h3>
              <p className="text-sm leading-6 text-gray-400">
                The manager chooses a supported signed profile, resumes
                downloads, and verifies every committed byte.
              </p>
            </li>
            <li className="bg-[#101113] p-7">
              <span className="mb-5 block text-sm font-bold text-cyan-400">
                02
              </span>
              <h3 className="mb-2 text-xl font-semibold">Test and connect</h3>
              <p className="text-sm leading-6 text-gray-400">
                A real local generation proves the profile works. Then Google or
                wallet sign-in links the rig to a payout wallet delegation.
              </p>
            </li>
            <li className="bg-[#101113] p-7">
              <span className="mb-5 block text-sm font-bold text-green-400">
                03
              </span>
              <h3 className="mb-2 text-xl font-semibold">Serve and earn</h3>
              <p className="text-sm leading-6 text-gray-400">
                The worker accepts compatible Grid jobs, signs output receipts,
                and earns through the public Base payout rail.
              </p>
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
