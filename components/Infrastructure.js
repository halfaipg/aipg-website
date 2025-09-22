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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-6">
          <div style={{backgroundColor: '#1F1F1F'}} className="rounded-3xl shadow-sm p-8 md:p-9">
            <div className="flex gap-x-4">
              <svg className="flex-shrink-0 w-6 h-6 mt-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="2"/>
                <circle cx="6" cy="6" r="2"/>
                <circle cx="18" cy="6" r="2"/>
                <circle cx="6" cy="18" r="2"/>
                <circle cx="18" cy="18" r="2"/>
                <path d="M8.5 8.5L15.5 15.5"/>
                <path d="M8.5 15.5L15.5 8.5"/>
              </svg>
              <div className="grow">
                <h3 className="text-lg font-bold text-white">
                  Distributed Worker Network
                </h3>
                <p className="mt-2 text-gray-300">
              Community members contribute idle GPU power to run state-of-the-art image and text models. Each worker node processes real AI inference requests, earning tokens for useful computation.
                </p>
              </div>
            </div>
          </div>

          <div style={{backgroundColor: '#1F1F1F'}} className="rounded-3xl shadow-sm p-8 md:p-9">
            <div className="flex gap-x-4">
              <svg className="flex-shrink-0 w-6 h-6 mt-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
              <div className="grow">
                <h3 className="text-lg font-bold text-white">
                  Smart Routing Engine
                </h3>
                <p className="mt-2 text-gray-300">
              Intelligent load balancing matches every prompt to the optimal worker node based on model specialization, current load, and performance metrics. This ensures maximum efficiency and minimum latency while distributing workload fairly across the network.
                </p>
              </div>
            </div>
          </div>

          <div style={{backgroundColor: '#1F1F1F'}} className="rounded-3xl shadow-sm p-8 md:p-9">
            <div className="flex gap-x-4">
              <svg className="flex-shrink-0 w-6 h-6 mt-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8"/>
                <path d="M12 8v8"/>
                <path d="M8 12h8"/>
              </svg>
              <div className="grow">
                <h3 className="text-lg font-bold text-white">
                  Token Incentive System
                </h3>
                <p className="mt-2 text-gray-300">
              AIPG tokens flow directly to contributors based on actual inference work performed. No wasteful proof-of-work mining—every computation serves real AI requests and earns meaningful rewards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure; 