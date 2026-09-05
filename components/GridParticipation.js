import { FiArrowRight } from "react-icons/fi";

export default function GridParticipation() {
  return (
    <>
      <section className="border-b border-white/15 py-12 sm:py-16" aria-labelledby="participate-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-sm font-semibold text-orange-300">For people already running AI</p>
          <h2 id="participate-title" className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-white">Keep your stack. Connect its spare capacity.</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-300">Your Ollama, vLLM, or compatible backend stays yours. The Grid worker runs alongside it. Choose the models you serve, set your limits, and decide when to participate.</p>
          <ol className="my-8 grid gap-6 sm:grid-cols-3">
            {[
              ["Connect your backend", "Use the Linux text worker with your existing runtime. Check supported platforms before downloading."],
              ["Choose what you serve", "Select models your backend actually runs. Keep your model files and capacity controls local."],
              ["Complete your first job", "Verify the connection, then check recorded work. Current AIPG payouts follow accepted work; earnings are not guaranteed."],
            ].map(([title, detail], index) => (
              <li key={title} className="border-t border-white/20 pt-4">
                <span className="text-sm font-medium text-cyan-300">0{index + 1}</span>
                <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 leading-relaxed text-gray-300">{detail}</p>
              </li>
            ))}
          </ol>
          <a href="/run" className="inline-flex items-center gap-2 rounded-lg bg-orange-400 px-5 py-3 font-semibold text-black hover:bg-orange-300">Connect your AI setup <FiArrowRight aria-hidden="true" /></a>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-400">Running ComfyUI? Media workflows have separate compatibility and qualification requirements. <a href="/run#media-qualification" className="text-gray-200 underline underline-offset-4">Check the media path</a>.</p>
        </div>
      </section>
      <section className="bg-[#101114] py-12 sm:py-16" aria-labelledby="builders-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 id="builders-title" className="max-w-3xl text-3xl font-semibold leading-tight text-white">An AI service layer for apps, agents, and Web3.</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-300">Build with open models without operating your own GPU backend. Connect through familiar text APIs, and add image, video, or audio generation through Grid endpoints.</p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-orange-300">
            <a href="/use" className="inline-flex items-center gap-2 py-2 font-semibold hover:text-orange-200">API quickstart <FiArrowRight aria-hidden="true" /></a>
            <a href="/docs/integrations" className="py-2 font-semibold underline underline-offset-4 hover:text-orange-200">SDKs and integrations</a>
          </div>
          <div className="mt-10 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-white">Check the network</h3>
              <p className="mt-2 leading-relaxed text-gray-300">Inspect current availability and recorded payouts. Historical activity is not a performance or earnings promise.</p>
              <a href="/status" className="mt-3 inline-block py-2 text-cyan-300 underline underline-offset-4">Network status</a><br />
              <a href="https://console.aipowergrid.io/transparency" className="inline-block py-2 text-cyan-300 underline underline-offset-4">Payout records</a>
            </div>
            <div>
              <h3 className="font-semibold text-white">Know the boundaries</h3>
              <p className="mt-2 leading-relaxed text-gray-300">Core routing is coordinated today. Community workers process plaintext prompts and outputs. Do not send secrets or sensitive data.</p>
              <a href="/docs/integrations" className="mt-3 inline-block py-2 text-cyan-300 underline underline-offset-4">Read the integration guide</a>
            </div>
            <div>
              <h3 className="font-semibold text-white">Help test the network</h3>
              <p className="mt-2 leading-relaxed text-gray-300">Validator preview nodes collect evidence without a GPU. No staking, rewards, routing authority, or slashing in the preview.</p>
              <a href="/validate" className="mt-3 inline-block py-2 text-cyan-300 underline underline-offset-4">Explore validator preview</a>
            </div>
          </div>
          <p className="mt-8 border-t border-white/15 pt-6 text-sm leading-relaxed text-gray-400">Generation access follows current account policy. Check your daily allowance, available credits, and quoted cost in the app before generating. <a href="https://console.aipowergrid.io/dashboard/funding" className="text-gray-200 underline underline-offset-4">Manage credits</a>.</p>
        </div>
      </section>
    </>
  );
}
