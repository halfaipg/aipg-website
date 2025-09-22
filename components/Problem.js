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
                <div className="inline-flex justify-center items-center w-[46px] h-[46px]">
                  <svg className="flex-shrink-0 w-6 h-6 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="8" width="20" height="10" rx="2"/>
                    <path d="M8 8V6a4 4 0 0 1 8 0v2"/>
                    <path d="M12 13v3"/>
                    <circle cx="12" cy="13" r="1"/>
                    <path d="M6 8h12"/>
                    <path d="M7 6l10-2"/>
                    <path d="M7 10v8"/>
                    <path d="M17 10v8"/>
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
                <div className="inline-flex justify-center items-center w-[46px] h-[46px]">
                  <svg className="flex-shrink-0 w-6 h-6 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <circle cx="5" cy="12" r="1"/>
                    <circle cx="19" cy="12" r="1"/>
                    <circle cx="12" cy="5" r="1"/>
                    <circle cx="12" cy="19" r="1"/>
                    <path d="M8 12h8"/>
                    <path d="M12 8v8"/>
                    <path d="M9 9l6 6"/>
                    <path d="M15 9l-6 6"/>
                    <circle cx="8" cy="8" r="0.5"/>
                    <circle cx="16" cy="8" r="0.5"/>
                    <circle cx="8" cy="16" r="0.5"/>
                    <circle cx="16" cy="16" r="0.5"/>
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