import {
  FiArrowRight,
  FiCpu,
  FiExternalLink,
  FiLock,
  FiSliders,
} from "react-icons/fi";

const backends = [
  {
    runtime: "Ollama",
    workload: "Text",
    path: "Detected automatically",
    status: "Open",
    guide: "/docs/backends/ollama",
  },
  {
    runtime: "vLLM / SGLang / LMDeploy",
    workload: "Text",
    path: "OpenAI-compatible endpoint",
    status: "Open",
    guide: "/docs/backends/vllm",
  },
  {
    runtime: "LM Studio / KoboldCpp",
    workload: "Text",
    path: "Detected or entered locally",
    status: "Open",
    guide: "/docs/backends/lm-studio",
  },
  {
    runtime: "Other OpenAI-compatible APIs",
    workload: "Text",
    path: "Operator-entered endpoint",
    status: "Advanced",
    guide: "/docs/backends/openai-compatible",
  },
  {
    runtime: "ComfyUI",
    workload: "Image / video",
    path: "Reviewed model and recipe profiles",
    status: "Qualification",
    guide: "/docs/backends/comfyui",
  },
  {
    runtime: "ACE-Step",
    workload: "Audio",
    path: "Reviewed direct-runtime profile",
    status: "Qualification",
    guide: "/docs/backends/ace-step",
  },
];

function Status({ children }) {
  const open = children === "Open";
  return (
    <span
      className={`inline-flex min-h-7 items-center border px-2.5 text-xs font-bold uppercase ${
        open
          ? "border-green-400/40 bg-green-400/10 text-green-200"
          : children === "Advanced"
            ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200"
            : "border-orange-400/40 bg-orange-400/10 text-orange-200"
      }`}
    >
      {children}
    </span>
  );
}

export default function OperatorPaths() {
  return (
    <section className="border-y border-white/10 bg-[#0c0d0f]">
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase text-orange-400">
            Bring your own runtime
          </p>
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            Keep the AI stack you already run.
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            The worker runs beside your inference service. It does not replace
            your runtime, upload your model files, or silently advertise every
            model it discovers.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-2">
          <div className="bg-[#111214] p-7 md:p-8">
            <div className="mb-5 flex h-11 w-11 items-center justify-center border border-orange-400/40 bg-orange-400/10 text-orange-300">
              <FiCpu aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold">I already run AI models</h3>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Start your existing backend, let the local worker detect it or
              enter its endpoint, choose the model you want to expose, test it,
              and connect.
            </p>
            <a
              href="#worker-downloads"
              className="mt-6 inline-flex min-h-11 items-center gap-2 bg-orange-500 px-5 font-bold text-black hover:bg-orange-400"
            >
              Connect a text backend <FiArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className="bg-[#111214] p-7 md:p-8">
            <div className="mb-5 flex h-11 w-11 items-center justify-center border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
              <FiSliders aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold">I&apos;m starting fresh</h3>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Enter your operating system, GPU, VRAM, and availability. The
              planner recommends a path, while the downloaded worker makes the
              final compatibility decision locally.
            </p>
            <a
              href="#hardware-planner"
              className="mt-6 inline-flex min-h-11 items-center gap-2 border border-white/20 px-5 font-semibold text-white hover:bg-white/10"
            >
              Check my hardware <FiArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-bold uppercase text-cyan-400">
                Compatibility
              </p>
              <h2 className="text-2xl font-bold md:text-3xl">
                What can connect today
              </h2>
            </div>
            <a
              href="/docs/connect-existing-stack"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white"
            >
              Backend setup guides <FiExternalLink aria-hidden="true" />
            </a>
          </div>

          <div className="mt-6 overflow-x-auto border border-white/10">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead className="bg-black/60 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Runtime</th>
                  <th className="px-4 py-3 font-semibold">Workload</th>
                  <th className="px-4 py-3 font-semibold">Connection path</th>
                  <th className="px-4 py-3 font-semibold">Availability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-[#111214]">
                {backends.map((backend) => (
                  <tr key={backend.runtime}>
                    <td className="px-4 py-4 font-semibold text-white">
                      <a
                        href={backend.guide}
                        className="inline-flex items-center gap-1.5 hover:text-orange-300"
                      >
                        {backend.runtime}
                        <FiExternalLink className="text-xs" aria-hidden="true" />
                      </a>
                    </td>
                    <td className="px-4 py-4 text-gray-300">
                      {backend.workload}
                    </td>
                    <td className="px-4 py-4 text-gray-400">
                      {backend.path}
                    </td>
                    <td className="px-4 py-4">
                      <Status>{backend.status}</Status>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-5 text-gray-500">
            Open means operators can connect through the current public text
            worker. Qualification means the runtime needs a reviewed Grid
            profile and canary before it may advertise that capability.
          </p>
        </div>

        <div className="mt-12 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-3">
          <div>
            <FiSliders className="mb-3 text-orange-300" aria-hidden="true" />
            <h3 className="font-bold">You choose capacity</h3>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Text operators control the advertised model, response limits,
              concurrency, and operating schedule. Pause without uninstalling.
            </p>
          </div>
          <div>
            <FiLock className="mb-3 text-cyan-300" aria-hidden="true" />
            <h3 className="font-bold">Your model stays yours</h3>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Model weights stay in your runtime. The worker needs a scoped
              Grid credential, never a wallet private key.
            </p>
          </div>
          <div>
            <FiExternalLink className="mb-3 text-green-300" aria-hidden="true" />
            <h3 className="font-bold">Workloads are not private yet</h3>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              Community workers process plaintext prompts and outputs. Do not
              send secrets or regulated data until confidential execution is
              independently verified and available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
