"use client";
import React from "react";

const Infrastructure = () => {
  return (
    <div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-3xl font-bold md:text-4xl md:leading-tight dark:text-white">
            People-Powered Infrastructure
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Crowd-sourced workers run state-of-the-art models while smart routing matches every prompt to the best node. AIPG tokens flow to compute contributors—no wasteful hashing, only useful inference.
          </p>
        </div>

        <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
          <div className="mt-5 sm:mt-10 lg:mt-0">
            <div className="space-y-6 lg:space-y-10">
              <div>
                <div className="flex items-center gap-x-2 mb-2">
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
                    Distributed Worker Network
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Community members contribute idle GPU power to run state-of-the-art image and text models. Each worker node processes real AI inference requests, earning tokens for useful computation.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-x-2 mb-2">
                  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Smart Routing Engine
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Intelligent load balancing matches every prompt to the optimal worker node based on model specialization, current load, and performance metrics. This ensures maximum efficiency and minimum latency while distributing workload fairly across the network.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-x-2 mb-2">
                  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="8"/>
                    <path d="M12 8v8"/>
                    <path d="M8 12h8"/>
                  </svg>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Token Incentive System
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  AIPG tokens flow directly to contributors based on actual inference work performed. No wasteful proof-of-work mining—every computation serves real AI requests and earns meaningful rewards.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            {/* Add content for the right column if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure; 