"use client";
import React from "react";

const Features = () => {
  return (
    <div>
      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div class="grid md:grid-cols-2 gap-12">
          <div class="lg:w-3/4">
            <h2 class="text-3xl text-gray-800 font-bold lg:text-4xl dark:text-white">
            Empowering Blockchain with AI: Proof of Useful Work
            </h2>
            <p class="mt-3 text-gray-800 dark:text-gray-400">
            Proof of Useful Work (POUW) is a paradigm shift in the world of blockchain and cryptocurrency, designed to address the sustainability concerns of traditional Proof of Work (PoW) systems. Where PoW requires miners to use high amounts of computational power to mine blocks, often criticized for its intensive energy use without direct productive output, POUW redirects this computational capacity towards meaningful AI tasks. In the AIPG ecosystem, POUW incentivizes node operators to provide inference on localized large language models (LLM) and host AI art model generation via technology like Stable Diffusion. This convergence of blockchain and AI tasks not only validates transactions but also produces valuable AI services, thereby utilizing the energy consumed in a manner that contributes constructively to the community and the broader field of AI.
            </p>
          </div>

          <div class="space-y-6 lg:space-y-10">
            <div class="flex">
              <span class="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-slate-900 dark:border-gray-700 dark:text-gray-200">
                <svg
                  class="flex-shrink-0 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </span>
              <div class="ms-5 sm:ms-8">
                <h3 class="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Empowering Meaningful Contributions
                </h3>
                <p class="mt-1 text-gray-600 dark:text-gray-400">
                We will leverage PoUW to go beyond the usual 'mining' activities associated with cryptocurrencies. 
                Instead of consuming colossal amounts of energy for arbitrary calculations, the AIPG network 
                utilizes a validation mechanism that supports and rewards constructive computational tasks.
                </p>
              </div>
            </div>

            <div class="flex">
              <span class="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-slate-900 dark:border-gray-700 dark:text-gray-200">
                <svg
                  class="flex-shrink-0 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
              </span>
              <div class="ms-5 sm:ms-8">
                <h3 class="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Creating an Inclusive AI Ecosystem
                </h3>
                <p class="mt-1 text-gray-600 dark:text-gray-400">
                AIPG not only positions itself as an innovator in blockchain technology but also as a contributor 
                to the global AI landscape. By democratizing access to computational resources, we enable a vast 
                community of researchers, developers, and enthusiasts to partake in and contribute towards cutting-edge 
                AI development, regardless of their individual computational capacity.
                </p>
              </div>
            </div>

            <div class="flex">
              <span class="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-slate-900 dark:border-gray-700 dark:text-gray-200">
                <svg
                  class="flex-shrink-0 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
              </span>
              <div class="ms-5 sm:ms-8">
                <h3 class="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                Access to AI for everyone
                </h3>
                <p class="mt-1 text-gray-600 dark:text-gray-400">
                AI Power Grid (AIPG) envisions a future where access to cutting-edge AI is free and open to all. 
                Our platform leverages a Proof-of-Useful-Work (POUW) protocol to align blockchain security with valuable 
                AI processes. By participating in the network, users contribute to computational tasks that advance AI technology, 
                and in turn, they are incentivized with AIPG tokens. This model encourages a collaborative and energy-efficient approach to AI advancement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
