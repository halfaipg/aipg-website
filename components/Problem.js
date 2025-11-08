"use client";
import React from "react";

const Problem = () => {
  return (
    <div style={{backgroundColor: '#1F1F1F'}}>
      <div className="max-w-[85rem] px-6 py-16 sm:px-8 lg:px-10 lg:py-20 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="xl:pl-6">
            <h2 className="text-3xl text-white font-bold lg:text-4xl">
              Why the World Needs an Open AI Movement
            </h2>
            <p className="mt-3 text-gray-300">
              Big tech giants are building walls around the most powerful AI models, locking them behind expensive pay-per-token APIs and corporate gatekeepers. This creates a world where only the biggest players control access to frontier AI capabilities, while independent developers and creators are left paying premium prices for restricted access.
            </p>
            <p className="mt-3 text-gray-300">
              AIPG breaks down these barriers by turning the community's idle GPUs into a permissionless, censorship-resistant AI utility. Instead of renting AI from corporate landlords, developers tap directly into a distributed network of compute contributors who earn tokens for providing real inference work—no wasteful hashing, only useful AI.
            </p>
          </div>

          <div className="space-y-6 lg:space-y-10">
            <div>
              <div className="flex items-center gap-x-2 mb-2">
                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="8" width="20" height="10" rx="2"/>
                  <path d="M8 8V6a4 4 0 0 1 8 0v2"/>
                </svg>
                <h3 className="text-base sm:text-lg font-semibold text-gray-200">
                  Corporate Gatekeepers
                </h3>
              </div>
              <p className="text-gray-400">
                Frontier models locked behind expensive APIs, controlled by a handful of tech giants who decide who gets access and at what price. This creates artificial scarcity around powerful AI capabilities.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-x-2 mb-2">
                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <circle cx="5" cy="12" r="1"/>
                  <circle cx="19" cy="12" r="1"/>
                  <circle cx="12" cy="5" r="1"/>
                  <circle cx="12" cy="19" r="1"/>
                  <path d="M8 12h8"/>
                  <path d="M12 8v8"/>
                </svg>
                <h3 className="text-base sm:text-lg font-semibold text-gray-200">
                  Community-Powered Alternative
                </h3>
              </div>
              <p className="text-gray-400">
                AIPG creates a permissionless, decentralized network where GPU owners earn tokens for providing useful AI inference compute, democratizing access and keeping frontier AI power directly in the hands of the global community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem; 