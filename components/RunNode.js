"use client";
import React from "react";

const RunNode = () => {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-[85rem] px-6 py-16 sm:px-8 lg:px-10 lg:py-20 mx-auto">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl text-white font-bold lg:text-5xl mb-4 leading-tight">
            Plug in your GPU. Power the Grid. Earn.
          </h2>
          <p className="text-xl text-gray-300">
            The network runs on real hardware that real people plug in. Two ways to take part:
            run a <span className="text-white font-semibold">Generator</span> to contribute compute
            and earn, or a <span className="text-white font-semibold">Sentinel</span> to help secure
            it. Any modern GPU works — the software figures out what your card can do.
          </p>
        </div>

        {/* Node Types */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Generator */}
          <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              LIVE NOW
            </div>
            <div className="mb-5">
              <div className="w-14 h-14 rounded-xl bg-orange-500/15 border border-orange-500/40 flex items-center justify-center">
                <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="12" rx="2"/>
                  <path d="M8 20h8M12 16v4"/>
                  <path d="M7 9h4M7 12h2"/>
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Generator</h3>
            <p className="text-gray-300 mb-6">
              Contribute compute and earn from the current AIPG worker payout rail. Text, image, video,
              upscaling and more — the software auto-detects your GPU and serves what it can handle.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                <span>Any modern GPU earns — bigger cards take bigger jobs</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                <span>Text · Image · Video · upscaling — matched to your card automatically</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                <span>Works with ComfyUI, vLLM, Ollama, or your own backend</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-green-400">✓</span>
                <span>Connect a GPU · earn per request served</span>
              </div>
            </div>

            <a
              href="https://docs.aipowergrid.io/worker-llm"
              target="_blank"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              Run a Generator
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Sentinel */}
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              COMING SOON
            </div>
            <div className="mb-5">
              <div className="w-14 h-14 rounded-xl bg-blue-500/15 border border-blue-500/40 flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Sentinel</h3>
            <p className="text-gray-300 mb-6">
              Secure the Grid: re-check that Generators were honest, run safety screening, and host
              part of the model library — with your stake behind it. Real economic security, not vibes.
              A consumer 24GB card (a used 3090) is plenty.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-blue-400">◇</span>
                <span>Verify Generator outputs (proof-of-inference) on-chain</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-blue-400">◇</span>
                <span>Run safety screening + host a shard of the model library</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-blue-400">◇</span>
                <span>Stake AIPG · slashable for false attestations</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="text-blue-400">◇</span>
                <span>Earn verification fees + storage rewards</span>
              </div>
            </div>

            <a
              href="https://discord.gg/W9D8j6HCtC"
              target="_blank"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all border border-white/20"
            >
              Join Waitlist
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400">
            Got questions? Join our <a href="https://discord.gg/W9D8j6HCtC" target="_blank" className="text-orange-400 hover:underline">Discord</a> and talk to the community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RunNode;
