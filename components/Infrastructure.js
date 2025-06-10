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
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 md:p-9 dark:bg-slate-900 dark:border-gray-700">
            <div className="flex justify-center items-center w-12 h-12 bg-blue-600 rounded-lg mb-4">
              <svg className="flex-shrink-0 w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <circle cx="6" cy="6" r="3"/>
                <circle cx="18" cy="6" r="3"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="18" r="3"/>
                <path d="M9 9L15 15"/>
                <path d="M9 15L15 9"/>
                <path d="M12 9V15"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Distributed Worker Network
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Community members contribute idle GPU power to run state-of-the-art image and text models. Each worker node processes real AI inference requests, earning tokens for useful computation.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 md:p-9 dark:bg-slate-900 dark:border-gray-700">
            <div className="flex justify-center items-center w-12 h-12 bg-green-600 rounded-lg mb-4">
              <svg className="flex-shrink-0 w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
                <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
                <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
                <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
                <path d="M8 12L16 12"/>
                <path d="M12 8L16 12L12 16"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Smart Routing Engine
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Intelligent load balancing matches every prompt to the optimal worker node based on model specialization, current load, and performance metrics. This ensures maximum efficiency and minimum latency while distributing workload fairly across the network.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 md:p-9 dark:bg-slate-900 dark:border-gray-700">
            <div className="flex justify-center items-center w-12 h-12 bg-purple-600 rounded-lg mb-4">
              <svg className="flex-shrink-0 w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="8" r="6"/>
                <path d="M18.09 10.37A6 6 0 1 1 10.37 18.09"/>
                <path d="M7 6h.01"/>
                <path d="M10 9h.01"/>
                <path d="M13 12h.01"/>
                <path d="M16 15h.01"/>
                <circle cx="19" cy="19" r="2"/>
                <path d="M20.2 20.2L22 22"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Token Incentive System
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              AIPG tokens flow directly to contributors based on actual inference work performed. No wasteful proof-of-work mining—every computation serves real AI requests and earns meaningful rewards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure; 