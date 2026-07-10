"use client";

const pillars = [
  {
    title: "Text, image, video, workflows",
    body:
      "One network for chat, agents, image generation, video generation, and reproducible creative pipelines.",
    accent: "text-orange-400",
    border: "border-orange-500/25",
    bg: "from-orange-500/10 to-amber-500/5",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16M4 12h7M4 19h4" />
        <rect x="13" y="9" width="7" height="7" rx="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m16 19 3-3 3 3" />
      </svg>
    ),
  },
  {
    title: "Familiar APIs at the edge",
    body:
      "Builders use OpenAI-compatible endpoints and the SDKs they already know, without becoming GPU operators.",
    accent: "text-cyan-400",
    border: "border-cyan-500/25",
    bg: "from-cyan-500/10 to-blue-500/5",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8 9-4 3 4 3M16 9l4 3-4 3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m14 5-4 14" />
      </svg>
    ),
  },
  {
    title: "Crypto-native underneath",
    body:
      "Base settlement, worker rewards, model and workflow registries, validator evidence, and a path toward trustless claims.",
    accent: "text-emerald-400",
    border: "border-emerald-500/25",
    bg: "from-emerald-500/10 to-teal-500/5",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 4 7v6c0 4 3 7 8 8 5-1 8-4 8-8V7l-8-4Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6M12 9v6" />
      </svg>
    ),
  },
];

const CryptoNativeLayer = () => {
  return (
    <section className="bg-gradient-to-b from-black via-[#111111] to-black">
      <div className="max-w-[85rem] mx-auto px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
          <div>
            <p className="text-[#f8991d] text-sm font-semibold uppercase tracking-[0.16em] mb-4">
              For onchain builders
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              The AI generation layer crypto is missing.
            </h2>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              Onchain apps need generative AI for agents, games, wallets, NFT tools,
              social apps, creator markets, and autonomous services. Today they either
              call a closed AI vendor, run their own GPU stack, or stitch together
              fragile one-off providers.
            </p>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">
              AI Power Grid gives them a crypto-native alternative: familiar generation
              APIs, distributed GPU supply, transparent worker payments, and a path
              toward validator-backed quality.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://docs.aipowergrid.io/why-crypto-needs-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-200 font-bold px-5 py-3 rounded-lg transition-colors"
              >
                Read the thesis
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="https://docs.aipowergrid.io/streaming-api"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-3 rounded-lg border border-white/15 transition-colors"
              >
                Build with the API
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className={`rounded-lg border ${pillar.border} bg-gradient-to-br ${pillar.bg} p-6`}
              >
                <div className="flex items-start gap-4">
                  <div className={`${pillar.accent} flex-shrink-0 mt-1`}>
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-bold">{pillar.title}</h3>
                    <p className="mt-2 text-gray-300 leading-relaxed">{pillar.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoNativeLayer;
