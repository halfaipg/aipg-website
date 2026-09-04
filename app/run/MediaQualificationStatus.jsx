import {
  FiCheckCircle,
  FiCpu,
  FiExternalLink,
  FiServer,
} from "react-icons/fi";

const FALLBACK_COHORT =
  "https://github.com/AIPowerGrid/grid-media-worker/issues/8";
const CLASS_LABELS = {
  minimum: ["Minimum", "12 GB to under 20 GB VRAM"],
  midrange: ["Midrange", "20 GB to under 80 GB VRAM"],
  datacenter: ["Datacenter", "80 GB or more VRAM"],
};

export default function MediaQualificationStatus({ status }) {
  const classes = status?.classes || [];
  const cohortUrl = status?.cohortUrl || FALLBACK_COHORT;

  return (
    <section id="media-qualification" className="scroll-mt-20 border-y border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase text-cyan-400">
              <FiCpu aria-hidden="true" /> Needed right now
            </p>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              Help qualify the media worker.
            </h2>
            <p className="mt-4 text-sm leading-6 text-gray-300 md:text-base">
              The first managed media profile stays closed until accepted
              evidence covers every required GPU class. Each evidence set runs
              three local canaries and cannot enroll a worker or earn rewards.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {status ? (
              <a
                href={status.participationUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 bg-cyan-400 px-5 font-bold text-black transition-colors hover:bg-cyan-300"
              >
                Submit qualification evidence
                <FiExternalLink aria-hidden="true" />
              </a>
            ) : null}
            <a
              href={cohortUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 border border-white/20 px-5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              View cohort status
              <FiExternalLink aria-hidden="true" />
            </a>
          </div>
        </div>

        {status ? (
          <div className="mt-9 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
            {classes.map((item) => {
              const [label, requirement] = CLASS_LABELS[item.id];
              const complete = item.status === "complete";
              return (
                <article key={item.id} className="bg-[#101113] p-6">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    {complete ? (
                      <FiCheckCircle
                        className="text-green-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <FiServer className="text-orange-400" aria-hidden="true" />
                    )}
                    <span
                      className={`text-xs font-bold uppercase ${
                        complete ? "text-green-300" : "text-orange-300"
                      }`}
                    >
                      {complete ? "Complete" : "Evidence needed"}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">{label}</h3>
                  <p className="mt-2 text-sm text-gray-400">{requirement}</p>
                  <p className="mt-5 text-sm font-semibold text-white">
                    {item.accepted}/{item.required} accepted evidence sets
                  </p>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-9 border border-white/15 bg-[#101113] p-6 text-sm leading-6 text-gray-300">
            Live qualification counts are temporarily unavailable. The media
            worker remains gated; use the tracked cohort issue for current
            needs.
          </div>
        )}

        {status ? (
          <p className="mt-4 text-xs leading-5 text-gray-500">
            Profile {status.profileId} v{status.profileVersion} · status updated{" "}
            {new Date(status.updatedAt).toLocaleDateString("en-US", {
              timeZone: "UTC",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            UTC
          </p>
        ) : null}
      </div>
    </section>
  );
}
