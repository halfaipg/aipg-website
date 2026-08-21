import RunDownloads from "./RunDownloads";
import OperatorPlanner from "./OperatorPlanner";

const MEDIA_RELEASES_API =
  "https://api.github.com/repos/AIPowerGrid/grid-media-worker/releases?per_page=20";
const TEXT_RELEASES_API =
  "https://api.github.com/repos/AIPowerGrid/grid-text-worker/releases?per_page=20";
const GRID_API = "https://api.aipowergrid.io";

export const metadata = {
  title: "Run an AI Power Grid Worker",
  description:
    "Download the signed AI Power Grid worker manager, validate your NVIDIA GPU locally, connect a payout wallet, and serve decentralized AI jobs.",
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

async function getTextRelease() {
  try {
    const releases = await getReleaseList(TEXT_RELEASES_API);
    const release = releases.find((item) => !item.draft && !item.prerelease);
    if (!release) return null;
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
  const [mediaRelease, textRelease, opportunities] = await Promise.all([
    getManagerRelease(),
    getTextRelease(),
    getOperatorOpportunities(),
  ]);

  return (
    <main className="bg-black text-white">
      <RunDownloads mediaRelease={mediaRelease} textRelease={textRelease} />

      <OperatorPlanner
        opportunities={opportunities}
        mediaReady={Boolean(mediaRelease)}
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
