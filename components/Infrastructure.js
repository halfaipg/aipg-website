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
          <div className="mt-2 sm:mt-3 lg:mt-0">
            <img
              className="rounded-3xl w-full scale-[1.3]"
              src="/AIPG_grid.png"
              alt="AIPG Grid Infrastructure"
            />
          </div>
          
          <div className="space-y-6 lg:space-y-10">
            <div style={{backgroundColor: '#1F1F1F'}} className="rounded-3xl shadow-sm p-12 text-center">
            <div className="flex items-center justify-center gap-x-2 mb-2">
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
              Transform your idle GPU into a powerful AI node. Join thousands of contributors earning tokens by running cutting-edge models—from gaming rigs to data centers, every machine strengthens our decentralized network.
            </p>
          </div>

          <div style={{backgroundColor: '#1F1F1F'}} className="rounded-3xl shadow-sm p-12 text-center">
            <div className="flex items-center justify-center gap-x-2 mb-2">
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
              Intelligent algorithms instantly match your AI requests to the perfect worker node. Our smart routing considers model type, current load, and performance metrics to deliver lightning-fast results every time.
            </p>
          </div>

          <div style={{backgroundColor: '#1F1F1F'}} className="rounded-3xl shadow-sm p-12 text-center">
            <div className="flex items-center justify-center gap-x-2 mb-2">
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
              Earn meaningful rewards for powering real AI workloads. No wasteful mining—every AIPG token represents actual value created through AI inference that serves real users and builds the future of decentralized intelligence.
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure; 