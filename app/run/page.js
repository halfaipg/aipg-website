import RunDownloads from "./RunDownloads";

const RELEASES_API =
  "https://api.github.com/repos/AIPowerGrid/grid-media-worker/releases?per_page=20";

export const metadata = {
  title: "Run an AI Power Grid Worker",
  description:
    "Download the signed AI Power Grid worker manager, validate your NVIDIA GPU locally, connect a payout wallet, and serve decentralized AI jobs.",
};

async function getManagerRelease() {
  try {
    const response = await fetch(RELEASES_API, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    const releases = await response.json();
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
    };
  } catch {
    return null;
  }
}

export default async function RunPage() {
  const release = await getManagerRelease();

  return (
    <main className="bg-black text-white">
      <RunDownloads release={release} />

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
              <h3 className="mb-2 text-lg font-semibold">Private hardware check</h3>
              <p className="text-sm leading-6 text-gray-400">
                The manager detects GPU, VRAM, driver, RAM, disk, and architecture
                locally. The Grid receives a capability tier and measured performance,
                not your complete hardware inventory.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Fail-closed profiles</h3>
              <p className="text-sm leading-6 text-gray-400">
                Exact source, dependencies, model files, and recipes are verified before
                installation and again before serving. A capability stays unavailable
                until its local canary passes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-8 lg:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase text-orange-400">One path</p>
            <h2 className="text-3xl font-bold md:text-4xl">From download to paid work</h2>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-3">
            <li className="bg-[#101113] p-7">
              <span className="mb-5 block text-sm font-bold text-orange-400">01</span>
              <h3 className="mb-2 text-xl font-semibold">Verify and install</h3>
              <p className="text-sm leading-6 text-gray-400">
                The manager chooses a supported signed profile, resumes downloads, and
                verifies every committed byte.
              </p>
            </li>
            <li className="bg-[#101113] p-7">
              <span className="mb-5 block text-sm font-bold text-cyan-400">02</span>
              <h3 className="mb-2 text-xl font-semibold">Test and connect</h3>
              <p className="text-sm leading-6 text-gray-400">
                A real local generation proves the profile works. Then Google or wallet
                sign-in links the rig to a payout wallet delegation.
              </p>
            </li>
            <li className="bg-[#101113] p-7">
              <span className="mb-5 block text-sm font-bold text-green-400">03</span>
              <h3 className="mb-2 text-xl font-semibold">Serve and earn</h3>
              <p className="text-sm leading-6 text-gray-400">
                The worker accepts compatible Grid jobs, signs output receipts, and earns
                through the public Base payout rail.
              </p>
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
