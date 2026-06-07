"use client";
import React from "react";

const Infrastructure = () => {
  return (
    <div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-3xl font-bold md:text-4xl md:leading-tight dark:text-white">
            How The Grid Works
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Community GPUs run AI models. Smart routing sends your request to the best available worker. Workers earn AIPG for every job they complete.
          </p>
        </div>

        <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
          <div className="mt-2 sm:mt-3 lg:mt-0">
            <img
              className="rounded-3xl w-full scale-[0.56] sm:scale-[0.68] md:scale-75 lg:scale-[0.83] xl:scale-100"
              src="/AIPG_grid.png"
              alt="AIPG Grid Infrastructure"
            />
          </div>
          
          <div className="space-y-6 lg:space-y-10">
            <div style={{backgroundColor: '#1F1F1F'}} className="rounded-3xl shadow-sm p-12 text-center">
            <div className="flex items-center justify-center gap-x-2 mb-2">
              <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="2"/>
                <circle cx="6" cy="6" r="2"/>
                <circle cx="18" cy="6" r="2"/>
                <circle cx="6" cy="18" r="2"/>
                <circle cx="18" cy="18" r="2"/>
                <path d="M8.5 8.5L15.5 15.5"/>
                <path d="M8.5 15.5L15.5 8.5"/>
              </svg>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                GPU Workers
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Gaming rigs to data centers — any GPU can join the network and start earning by running AI models.
            </p>
          </div>

          <div style={{backgroundColor: '#1F1F1F'}} className="rounded-3xl shadow-sm p-12 text-center">
            <div className="flex items-center justify-center gap-x-2 mb-2">
              <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                Smart Routing
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Requests automatically route to the best available worker based on model, load, and latency.
            </p>
          </div>

          <div style={{backgroundColor: '#1F1F1F'}} className="rounded-3xl shadow-sm p-12 text-center">
            <div className="flex items-center justify-center gap-x-2 mb-2">
              <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8"/>
                <path d="M12 8v8"/>
                <path d="M8 12h8"/>
              </svg>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                Token Rewards
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Workers earn AIPG for every job completed. Each token represents real inference work done.
            </p>
          </div>
        </div>
        </div>

        {/* Future: Autonomous Network & Privacy */}
        <div className="mt-16 grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Autonomous Network */}
          <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-purple-500/15 border border-purple-500/40 flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">A network nobody can shut down</h3>
                <span className="text-purple-400 text-sm font-medium">In Development</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Every centralized AI you've used can be unplugged by a company, a regulator, or a Stripe ban.
              AIPG is moving entirely on-chain — smart contracts handle routing, payments, and verification.
              The team builds the protocol. The protocol runs itself. Once it's done, even we can't turn it off.
            </p>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">◆</span>
                <span>On-chain job anchoring with cryptographic proofs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">◆</span>
                <span>Bonded validators verify inference results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">◆</span>
                <span>Automatic payments via smart contracts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">◆</span>
                <span>P2P network with no single point of failure</span>
              </li>
            </ul>
          </div>

          {/* Confidential Computing */}
          <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Privacy at the hardware level</h3>
                <span className="text-emerald-400 text-sm font-medium">Coming with Blackwell</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Your medical notes, your legal docs, your agent's API keys — they shouldn't be readable by
              the stranger running the GPU. NVIDIA Confidential Computing on Blackwell (B200/B300) encrypts
              your workload in GPU memory and proves cryptographically it ran in a secure enclave.
            </p>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">◆</span>
                <span>Hardware-isolated Trusted Execution Environment (TEE)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">◆</span>
                <span>GPU memory encrypted end-to-end during inference</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">◆</span>
                <span>Cryptographic attestation proves genuine secure enclave</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">◆</span>
                <span>Run sensitive workloads on untrusted infrastructure</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure; 