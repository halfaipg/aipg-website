"use client";

const products = [
  {
    title: "Generate Images",
    description: "Create AI art with Flux, SDXL, and Stable Diffusion. Thousands of models and workflows.",
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
    title: "Chat with AI",
    description: "Talk to open-source LLMs. Llama, Mistral, Qwen, and more. No corporate middleman.",
    href: "https://aipg.chat",
    label: "aipg.chat",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Build with the API",
    description: "Drop-in replacement for OpenAI. Same SDKs, real-time streaming, decentralized.",
    href: "https://docs.aipowergrid.io/generate",
    label: "Streaming API Docs",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Earn with your GPU",
    description: "Run the worker, point it at The Grid, earn AIPG tokens for every job you complete.",
    href: "https://github.com/AIPowerGrid/grid-inference-worker/releases",
    label: "Download Worker",
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
          Use The Grid
        </h2>
        <p className="mt-3 text-gray-400 text-lg">
          Everything works today. Pick one and try it.
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
          <a href="https://api.aipowergrid.io/register" target="_blank" className="text-[#f8991d] text-sm font-medium hover:underline">
            Get a free API key →
          </a>
        </p>
      </div>
    </div>
  );
};

export default Products;
