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

        <div className="space-y-6 lg:space-y-10 max-w-4xl mx-auto">
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
              Our global community of GPU contributors forms the backbone of AIPG's decentralized infrastructure. From gaming rigs to enterprise servers, any compatible hardware can join the network and earn tokens by running cutting-edge AI models. This distributed approach ensures resilience, reduces costs, and democratizes access to powerful AI capabilities while creating a sustainable economy for compute providers.
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
              Advanced algorithms automatically route AI requests to the most suitable worker nodes in real-time. Our intelligent system considers factors like model compatibility, current workload, geographical proximity, and historical performance to ensure optimal response times. This dynamic load balancing maximizes network efficiency while providing users with consistent, high-quality AI generation experiences across all supported models and use cases.
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
              AIPG tokens create a fair and transparent reward system that directly compensates contributors for valuable work. Unlike traditional cryptocurrency mining that wastes energy on meaningless calculations, every AIPG token earned represents actual AI inference completed for real users. This creates a virtuous cycle where the network grows stronger as more people participate, while contributors earn meaningful rewards for powering the future of decentralized artificial intelligence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure; 