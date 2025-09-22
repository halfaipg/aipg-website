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
            <div className="flex justify-center items-center w-12 h-12 mb-4">
              <svg className="flex-shrink-0 w-8 h-8 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="2"/>
                <circle cx="6" cy="6" r="2"/>
                <circle cx="18" cy="6" r="2"/>
                <circle cx="6" cy="18" r="2"/>
                <circle cx="18" cy="18" r="2"/>
                <path d="M8.5 8.5L15.5 15.5"/>
                <path d="M8.5 15.5L15.5 8.5"/>
                <path d="M12 10V14"/>
                <path d="M10 12h4"/>
                <circle cx="3" cy="12" r="1"/>
                <circle cx="21" cy="12" r="1"/>
                <circle cx="12" cy="3" r="1"/>
                <circle cx="12" cy="21" r="1"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Distributed Worker Network
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Community members contribute idle GPU power to run state-of-the-art image and text models. Each worker node processes real AI inference requests, earning tokens for useful computation.
            </p>
          </div>

          <div style={{backgroundColor: '#1F1F1F'}} className="rounded-3xl shadow-sm p-8 md:p-9">
            <div className="flex justify-center items-center w-12 h-12 mb-4">
              <svg className="flex-shrink-0 w-8 h-8 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                <path d="M8 12l2 2 4-4"/>
                <circle cx="12" cy="12" r="8"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Smart Routing Engine
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Intelligent load balancing matches every prompt to the optimal worker node based on model specialization, current load, and performance metrics. This ensures maximum efficiency and minimum latency while distributing workload fairly across the network.
            </p>
          </div>

          <div style={{backgroundColor: '#1F1F1F'}} className="rounded-3xl shadow-sm p-8 md:p-9">
            <div className="flex justify-center items-center w-12 h-12 mb-4">
              <svg className="flex-shrink-0 w-8 h-8 text-gray-700 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8"/>
                <path d="M12 2v20"/>
                <path d="M2 12h20"/>
                <path d="M7.5 7.5l9 9"/>
                <path d="M16.5 7.5l-9 9"/>
                <circle cx="8" cy="8" r="1.5"/>
                <circle cx="16" cy="8" r="1.5"/>
                <circle cx="8" cy="16" r="1.5"/>
                <circle cx="16" cy="16" r="1.5"/>
                <path d="M10 6l4 12"/>
                <path d="M6 10l12 4"/>
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