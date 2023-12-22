"use client";
import { useEffect } from "react";

const Services = () => {
  useEffect(() => {
    import("preline");
  }, []);
  return (
    <div className="bg-white dark:bg-transparent">
      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div class="grid sm:grid-cols-2 lg:grid-cols-2 items-center gap-6 md:gap-10">
          <div class="w-full h-full bg-white shadow-lg rounded-lg p-5 dark:bg-slate-900">
            <div class="flex items-center gap-x-4 mb-3">
              <div class="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                <svg
                  class="flex-shrink-0 w-6 h-6 text-blue-600 dark:text-blue-400"
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
                  <circle cx="13.5" cy="6.5" r=".5" />
                  <circle cx="17.5" cy="10.5" r=".5" />
                  <circle cx="8.5" cy="7.5" r=".5" />
                  <circle cx="6.5" cy="12.5" r=".5" />
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
              </div>
              <div class="flex-shrink-0">
                <h3 class="block text-lg font-semibold text-gray-800 dark:text-white">
                Open Source AI Models
                </h3>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Central to AIPG's approach is the utilization of open source Large Language Models (LLMs) and Stable Diffusion models, 
              providing a robust foundation for AI-powered applications in text generation and image creation. This ensures a 
              collaborative and transparent environment where improvements and innovations can be shared and leveraged community-wide.
            </p>
          </div>

          <div class="w-full h-full bg-white shadow-lg rounded-lg p-5 dark:bg-slate-900">
            <div class="flex items-center gap-x-4 mb-3">
              <div class="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                <svg
                  class="flex-shrink-0 w-6 h-6 text-blue-600 dark:text-blue-400"
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
                  <path d="M2 3h20" />
                  <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
                  <path d="m7 21 5-5 5 5" />
                </svg>
              </div>
              <div class="flex-shrink-0">
                <h3 class="block text-lg font-semibold text-gray-800 dark:text-white">
                   Democratized AI
                </h3>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
            AIPG is committed to democratizing access to AI technologies. By providing tools 
            and resources openly, the platform empowers developers, artists, and individuals from diverse 
            backgrounds to engage with AI without the need for extensive resources or proprietary knowledge.
            </p>
          </div>

          <div class="w-full h-full bg-white shadow-lg rounded-lg p-5 dark:bg-slate-900">
            <div class="flex items-center gap-x-4 mb-3">
              <div class="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                <svg
                  class="flex-shrink-0 w-6 h-6 text-blue-600 dark:text-blue-400"
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
                  <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                  <path d="M2 7h20" />
                  <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
                </svg>
              </div>
              <div class="flex-shrink-0">
                <h3 class="block text-lg font-semibold text-gray-800 dark:text-white">
                Earn with AI Power Grid
                </h3>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
            AIPG coin is a cornerstone of the ecosystem, serving as the primary medium of exchange, 
            incentivization, and governance. It aligns the various stakeholders within the AIPG ecosystem 
            by enabling participation, rewarding contributions, and guiding the evolution of the platform.
            </p>
          </div>

          <div class="w-full h-full bg-white shadow-lg rounded-lg p-5 dark:bg-slate-900">
            <div class="flex items-center gap-x-4 mb-3">
              <div class="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                <svg
                  class="flex-shrink-0 w-6 h-6 text-blue-600 dark:text-blue-400"
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
                  <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" />
                  <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" />
                  <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" />
                  <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" />
                </svg>
              </div>
              <div class="flex-shrink-0">
                <h3 class="block text-lg font-semibold text-gray-800 dark:text-white overflow-auto">
                 Elevating NFT's with AI
                </h3>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              While the initial hype around non-fungible tokens (NFTs) may have waned from its peak, the underlying technology 
              remains a potent tool for certifying and monetizing digital assets. In the realm of Artificial Intelligence, 
              particularly, NFTs continue to offer a perfect use case that can rejuvenate their relevance and utility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
