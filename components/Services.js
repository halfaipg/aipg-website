"use client";
import { useEffect } from "react";

const Services = () => {
  useEffect(() => {
    import("preline");
  }, []);
  return (
    <div className="bg-gray-50 dark:bg-transparent">
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
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                </svg>
              </div>
              <div class="flex-shrink-0">
                <h3 class="block text-lg font-semibold text-gray-800 dark:text-white">
                  Decentralized AI Services
                </h3>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              AIPG integrates decentralized AI services directly into the
              blockchain, offering seamless access to powerful LLMs and AI art
              generation tools.
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
                  Blockchain-Validated Outputs:
                </h3>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Every interaction with our AI services, including LLM inferences
              and AI-generated artworks, is validated and recorded on the
              blockchain.
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
                  NFT AI Gallery and Marketplace
                </h3>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              AIPG introduces an exclusive NFT AI Gallery and a corresponding
              marketplace, designed to showcase AI-generated art.
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
                  Community Feedback Loop
                </h3>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Developers can rapidly deploy their AI models onto the AIPG
              platform, where they are immediately accessible to the community
              for testing and feedback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
