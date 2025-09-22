"use client";
import React from "react";

const Problem = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl text-gray-800 font-bold lg:text-4xl dark:text-white">
              Why the World Needs an Open AI Movement
            </h2>
            <p className="mt-3 text-gray-800 dark:text-gray-300">
              Big tech giants are building walls around the most powerful AI models, locking them behind expensive pay-per-token APIs and corporate gatekeepers. This creates a world where only the biggest players control access to frontier AI capabilities, while independent developers and creators are left paying premium prices for restricted access.
            </p>
            <p className="mt-3 text-gray-800 dark:text-gray-300">
              AIPG breaks down these barriers by turning the community's idle GPUs into a permissionless, censorship-resistant AI utility. Instead of renting AI from corporate landlords, developers tap directly into a distributed network of compute contributors who earn tokens for providing real inference work—no wasteful hashing, only useful AI.
            </p>
          </div>

          <div className="space-y-6 lg:space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-x-4 mb-4">
                <div className="inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border border-red-200 bg-red-50 text-red-600 dark:border-red-700 dark:bg-red-800/30 dark:text-red-500">
                  <svg className="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="8" width="18" height="12" rx="2"/>
                    <path d="M7 8V6a5 5 0 0 1 10 0v2"/>
                    <path d="M12 12v4"/>
                    <path d="M10 16h4"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Corporate Gatekeepers
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Frontier models locked behind expensive APIs, controlled by a handful of tech giants who decide who gets access and at what price.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-x-4 mb-4">
                <div className="inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border border-green-200 bg-green-50 text-green-600 dark:border-green-700 dark:bg-green-800/30 dark:text-green-500">
                  <svg className="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="5" cy="12" r="2"/>
                    <circle cx="19" cy="12" r="2"/>
                    <circle cx="12" cy="5" r="2"/>
                    <circle cx="12" cy="19" r="2"/>
                    <path d="M7 12h10"/>
                    <path d="M12 7v10"/>
                    <path d="M7 12l3-5"/>
                    <path d="M14 17l3-5"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Community-Powered Alternative
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                AIPG creates a permissionless network where GPU owners earn tokens for useful AI inference, keeping frontier AI power in the hands of the community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem; 