"use client";

const products = [
  {
    title: "Generate Images",
    description: "Create AI art with z-image-turbo, FLUX.2 Klein, and Krea 2 Turbo. Curated open image models.",
    href: "https://aipg.art",
    label: "aipg.art",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    ),
  },
  {
    title: "Run Agents & Workflows",
    description: "Open-source LLMs powering your agents, automations, and AI workflows. gpt-oss, Qwen3, DeepSeek — no corporate worldview baked in.",
    href: "https://aipg.chat",
    label: "aipg.chat",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v6m0 10v6m11-11h-6m-10 0H1m17.07-7.07l-4.24 4.24M7.17 16.83l-4.24 4.24m0-18.14l4.24 4.24m9.66 9.66l4.24 4.24"/>
      </svg>
    ),
  },
  {
    title: "Build with the API",
    description: "Drop-in for OpenAI and Anthropic. Same SDKs, real-time streaming, community-powered backend. Free daily quota.",
    href: "https://docs.aipowergrid.io/streaming-api",
    label: "API Docs",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Earn with your GPU",
    description: "Run an LLM, image, or video worker. Earn USDC and AIPG for every request you serve. No bond required to start (on-chain bonding planned).",
    href: "https://docs.aipowergrid.io/run-a-node",
    label: "Run a Worker",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
  },
];

const Products = () => {
  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-4xl font-semibold text-white">
          Build on The Grid
        </h2>
        <p className="mt-3 text-gray-400 text-lg">
          Agents, automations, art, video — running on community GPUs today. Pick one and ship.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <a
            key={i}
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 rounded-2xl bg-[#1F1F1F] border border-white/10 hover:border-[#f8991d]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(248,153,29,0.1)]"
          >
            <div className="text-[#f8991d] mb-4 group-hover:scale-110 transition-transform duration-300">
              {product.icon}
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              {product.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              {product.description}
            </p>
            <span className="text-[#f8991d] text-sm font-medium group-hover:underline">
              {product.label} →
            </span>
          </a>
        ))}
      </div>

      {/* Code snippet */}
      <div className="mt-12 max-w-2xl mx-auto">
        <p className="text-center text-gray-400 text-sm mb-4">
          Works with any OpenAI SDK. Three lines to get started:
        </p>
        <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 font-mono text-sm leading-relaxed overflow-x-auto">
          <div className="text-gray-500">
            <span className="text-[#c586c0]">from</span>{" "}
            <span className="text-[#4ec9b0]">openai</span>{" "}
            <span className="text-[#c586c0]">import</span>{" "}
            <span className="text-white">OpenAI</span>
          </div>
          <div className="mt-2 text-gray-500">
            <span className="text-white">client</span>{" "}
            <span className="text-gray-500">=</span>{" "}
            <span className="text-[#4ec9b0]">OpenAI</span>
            <span className="text-gray-400">(</span>
          </div>
          <div className="text-gray-500 pl-8">
            <span className="text-[#9cdcfe]">base_url</span>
            <span className="text-gray-500">=</span>
            <span className="text-[#ce9178]">"https://api.aipowergrid.io/v1"</span>
            <span className="text-gray-400">,</span>
          </div>
          <div className="text-gray-500 pl-8">
            <span className="text-[#9cdcfe]">api_key</span>
            <span className="text-gray-500">=</span>
            <span className="text-[#ce9178]">"your-key"</span>
          </div>
          <div className="text-gray-400">)</div>
        </div>
        <p className="text-center mt-4">
          <a href="https://console.aipowergrid.io" target="_blank" className="text-[#f8991d] text-sm font-medium hover:underline">
            Get a free API key →
          </a>
        </p>
      </div>
    </div>
  );
};

export default Products;
