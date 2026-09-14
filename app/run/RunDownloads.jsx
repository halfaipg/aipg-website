"use client";

import Image from "next/image";
import { useState } from "react";
import { FiDownload, FiExternalLink, FiCheckCircle } from "react-icons/fi";
import { useDetectedOperatorPlatform } from "./operatorPlatformStore";
import { OPERATOR_INTAKE_URL, TEXT_OPERATOR_COHORT_URL } from "./operatorLinks";

const PLATFORMS = {
  macos: { label: "macOS", detail: "Apple Silicon only, not Intel Macs" },
  windows: { label: "Windows", detail: "Windows x64" },
  linux: { label: "Linux", detail: "Ubuntu 22.04+ x86_64" },
  linuxArm64: { label: "Linux ARM64", detail: "Ubuntu 24.04+ ARM64" },
};
const ENGINES = {
  "openai-compatible": { label: "OpenAI-compatible endpoint", step: "Start your inference server. Its chat endpoint and exact model must pass the worker's local checks." },
  "lm-studio": { label: "LM Studio", step: "Load your model, then start the local server in LM Studio's Developer tab." },
  ollama: { label: "Ollama", step: "Keep Ollama running with the model you want to serve installed." },
  vllm: { label: "vLLM", step: "Start your vLLM OpenAI-compatible server with the exact model you want to serve." },
  sglang: { label: "SGLang", step: "Start your SGLang OpenAI-compatible server with the exact model you want to serve." },
  lmdeploy: { label: "LMDeploy", guide: "openai-compatible", step: "Start LMDeploy's API server with the exact model you want to serve." },
  koboldcpp: { label: "KoboldCpp", step: "Load your model and enable KoboldCpp's OpenAI-compatible endpoint." },
};
const actionClass = "inline-flex min-h-12 items-center justify-center gap-2 rounded px-5 py-3 text-center font-semibold bg-yellow-400 text-black hover:bg-yellow-300";
const linkClass = "inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200";

export default function RunDownloads({ textRelease, mediaRelease, mediaQualificationRelease }) {
  const [workload, setWorkload] = useState("text");
  const [engine, setEngine] = useState("openai-compatible");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const detected = useDetectedOperatorPlatform();
  const platform = selectedPlatform || detected.downloadPlatform;
  const runtime = ENGINES[engine];
  const artifact = textRelease?.[platform];
  const ready = Boolean(artifact && textRelease?.checksums && textRelease?.manifest && textRelease?.sbom);
  const installer = ["linux", "linuxArm64"].includes(platform) ? textRelease?.installer : null;
  const download = installer || artifact;
  const warning = textRelease?.platforms?.[platform]?.warning;

  return (
    <>
      <header className="border-b border-white/10 bg-[#101114]">
        <div className="mx-auto max-w-6xl px-6 py-9 md:px-8 md:py-12">
          <div className="mb-4 flex items-center gap-3 text-sm font-semibold text-gray-300">
            <Image src="/AIPGsimplelogo.png" alt="" width={36} height={36} /> AI Power Grid Workers
          </div>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">Put your local models to work. <span className="text-yellow-400">Earn AIPG.</span></h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-300">Keep your existing setup. Connect a worker, choose when it runs, and earn AIPG for completed, accepted jobs.</p>
          <p className="mt-2 text-sm text-gray-400">Work availability and earnings vary. No signup bonus or guaranteed rate.</p>
        </div>
      </header>

      <section id="worker-downloads" aria-label="Worker setup" className="scroll-mt-20 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-8 md:px-8 md:py-10">
          <div aria-label="Workload" className="mb-8 grid max-w-xl grid-cols-3 border-b border-white/20">
            {[["text", "Text / LLMs"], ["media", "Images & video"], ["audio", "Audio"]].map(([value, label]) => (
              <button key={value} aria-pressed={workload === value} onClick={() => setWorkload(value)} className={`min-h-12 border-b-2 px-2 py-3 text-sm font-semibold ${workload === value ? "border-yellow-400 text-yellow-300" : "border-transparent text-gray-400 hover:text-white"}`}>{label}</button>
            ))}
          </div>

          {workload === "text" ? (
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div className="min-w-0 space-y-6">
                <div>
                  <label className="block text-base font-semibold" htmlFor="worker-engine">1. Connect your inference endpoint</label>
                  <p className="mt-2 text-sm leading-6 text-gray-400">LM Studio, Ollama, vLLM, SGLang, LMDeploy, or another OpenAI-compatible server. The endpoint matters, not the engine.</p>
                  <select id="worker-engine" value={engine} onChange={event => setEngine(event.target.value)} className="mt-3 min-h-12 w-full rounded border border-white/25 bg-[#191b20] px-3 text-base text-white">
                    {Object.entries(ENGINES).map(([value, item]) => <option key={value} value={value}>{item.label}</option>)}
                  </select>
                  <details className="mt-2 text-xs leading-5 text-gray-400">
                    <summary className="cursor-pointer py-2">Anthropic / Messages endpoints</summary>
                    The worker also serves Anthropic-format requests when the backend passes its protocol probe. This release still requires a working OpenAI chat endpoint to register; Anthropic-only endpoints are not supported yet.
                  </details>
                </div>
                <fieldset>
                  <legend className="mb-3 text-base font-semibold">2. Choose your operating system</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(PLATFORMS).map(([value, item]) => <button key={value} aria-pressed={platform === value} onClick={() => setSelectedPlatform(value)} className={`min-h-11 rounded border px-3 text-sm font-medium ${platform === value ? "border-white bg-white text-black" : "border-white/20 text-gray-300 hover:bg-white/10"}`}>{item.label}</button>)}
                  </div>
                  <p className="mt-2 text-xs text-gray-400">{PLATFORMS[platform].detail}. Select the machine that will run the worker.</p>
                </fieldset>
                <div>
                  <h2 className="mb-3 text-base font-semibold">3. Download your worker</h2>
                  {warning && <p className="mb-3 border-l-2 border-yellow-400 pl-3 text-sm leading-6 text-yellow-100">{warning}</p>}
                  {ready ? <a href={download.url} className={`${actionClass} w-full`}><FiDownload aria-hidden="true" />{installer ? "Download Linux installer" : `Download for ${PLATFORMS[platform].label}`}</a> : <p role="status" className="rounded border border-white/20 p-4 text-sm leading-6 text-gray-300">{textRelease?.platforms?.[platform]?.reason || "Downloads are temporarily unavailable while release integrity is checked. Please try again later or ask for setup help."}</p>}
                  {ready && <p className="mt-2 text-xs text-gray-400">v{textRelease.version} · Release checksums and artifact identity checked.</p>}
                  {["macos", "windows"].includes(platform) && <p className="mt-3 text-xs leading-5 text-gray-400">Desktop builds pass automated build/runtime checks. The supervised production test for this release was on Linux; Mac and Windows end-to-end setup is still being verified.</p>}
                </div>
                {textRelease && <details className="border-t border-white/15 pt-3">
                  <summary className="cursor-pointer py-2 text-sm text-gray-300">Release details &amp; checksums</summary>
                  <div className="mt-2 flex flex-wrap gap-x-5">
                    <a className={linkClass} href={textRelease.checksums?.url}>SHA256SUMS</a>
                    <a className={linkClass} href={textRelease.sbom?.url}>SPDX SBOM</a>
                    <a className={linkClass} href={textRelease.releaseUrl}>Release notes</a>
                    {ready && installer && <a className={linkClass} href={artifact.url}>Download {PLATFORMS[platform].label} binary directly</a>}
                  </div>
                </details>}
              </div>

              <div className="min-w-0 border-t border-white/15 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                <h2 className="text-xl font-semibold">Get connected with {runtime.label}</h2>
                <ol className="mt-5 list-decimal space-y-5 pl-5 text-sm leading-6 text-gray-300">
                  <li>{runtime.step} <a className="text-cyan-300 underline" href={`/docs/backends/${runtime.guide || engine}`}>{runtime.label} setup guide</a></li>
                  <li>
                    {platform === "macos" ? "Unzip the download and open Grid Inference Worker.app." : platform === "windows" ? "Open the downloaded grid-inference-worker-windows-x64.exe." : "Run the downloaded installer, then start the worker:"}
                    {ready && ["linux", "linuxArm64"].includes(platform) && <pre className="mt-3 overflow-x-auto rounded border border-white/15 bg-[#101114] p-3 text-xs"><code>{installer ? "cd ~/Downloads\nchmod +x install-worker.sh\n./install-worker.sh\n~/.local/bin/grid-inference-worker --verify-runtime\n~/.local/bin/grid-inference-worker" : `cd ~/Downloads\nchmod +x ${artifact.name}\n./${artifact.name}`}</code></pre>}
                    <span className="mt-2 block">The local setup wizard opens at <code className="break-all text-white">http://localhost:7861</code>.</span>
                  </li>
                  <li>Select your backend and the exact model it serves in the wizard. Follow its Console approval step. Do not expose your local inference server to the internet.</li>
                  <li>Wait for <strong className="text-white">Online</strong> and the connection check to pass. Add your payout wallet in Console settings to receive AIPG.</li>
                </ol>
                <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-gray-300"><FiCheckCircle className="mt-1 shrink-0 text-cyan-300" aria-hidden="true" />Your model files stay local. Control your schedule, concurrency and pause from the worker.</p>
                <p className="mt-3 text-xs leading-5 text-gray-400">The worker never needs a wallet private key. Enter credentials only in the local setup wizard, never in public posts or shell commands. Workers process plaintext prompts and outputs.</p>
                <a className={`${linkClass} mt-4`} href={TEXT_OPERATOR_COHORT_URL}>Need setup help? <FiExternalLink aria-hidden="true" /></a>
              </div>
            </div>
          ) : (
            <MediaPath workload={workload} platform={platform} mediaRelease={mediaRelease} qualification={mediaQualificationRelease} />
          )}
        </div>
      </section>
    </>
  );
}

function MediaPath({ workload, platform, mediaRelease, qualification }) {
  const audio = workload === "audio";
  const guide = audio ? "ace-step" : "comfyui";
  const name = audio ? "ACE-Step" : "ComfyUI";
  const benchmark = qualification?.[platform];
  // The managed release is an audio profile, not a generic ComfyUI installer.
  const manager = audio && mediaRelease?.[platform];
  return <div className="max-w-3xl">
    <h2 className="text-2xl font-semibold">{audio ? "Run an audio worker" : "Connect your ComfyUI setup"}</h2>
    <p className="mt-4 text-base leading-7 text-gray-300">{audio ? "The ACE-Step worker handles music generation. Its managed installer is still being qualified for public onboarding." : "The ComfyUI bridge handles image and video jobs using supported Grid models and workflows. It does not accept every installed model or custom workflow."}</p>
    <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-6 text-gray-300">
      <li>Check the {name} guide for supported models, workflows and hardware.</li>
      <li>{audio ? "Follow the audio profile requirements and local compatibility checks." : "Connect your existing ComfyUI instance using the bridge setup instructions."}</li>
      <li>Confirm your exact model and workflow can serve Grid jobs before advertising it.</li>
    </ol>
    <div className="mt-6 flex flex-wrap gap-4">
      <a className={actionClass} href={audio ? `/docs/backends/${guide}` : "https://github.com/AIPowerGrid/grid-media-worker#comfyui-worker"}>Open {name} setup guide <FiExternalLink aria-hidden="true" /></a>
      <a className={linkClass} href={OPERATOR_INTAKE_URL}>Ask about my hardware</a>
    </div>
    <p className="mt-4 text-xs leading-5 text-gray-400">Share only your app, OS and coarse GPU specs in public support requests. No credentials, wallet details, network addresses or private logs.</p>
    <details className="mt-6 border-t border-white/15 pt-3">
      <summary className="cursor-pointer py-2 text-sm text-gray-300">Managed installer &amp; qualification</summary>
      <p className="mt-3 text-sm leading-6 text-gray-400">Qualification benchmarks are unpaid and cannot enroll a worker. Managed profiles run one job at a time. Signed profiles, hardware checks and release-integrity checks remain required.</p>
      {manager && <a className={linkClass} href={manager.url}>Download qualified audio manager</a>}
      {benchmark && <a className={linkClass} href={benchmark.url}>Download benchmark-only qualification tool</a>}
      {benchmark && <a className={`${linkClass} ml-4`} href={qualification.checksums.url}>Qualification SHA256SUMS</a>}
      <a className={`${linkClass} block`} href="https://github.com/AIPowerGrid/grid-media-worker/blob/main/docs/MANAGER_QUALIFICATION.md">Qualification instructions</a>
    </details>
  </div>;
}
