"use client";
import React from "react";

const Problem = () => {
  return (
    <div style={{backgroundColor: '#1F1F1F'}}>
      <div className="max-w-[85rem] px-6 py-16 sm:px-8 lg:px-10 lg:py-20 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="xl:pl-6">
            <h2 className="text-3xl text-white font-bold lg:text-4xl">
              Why Open AI Infrastructure Matters
            </h2>
            <div className="mt-4 space-y-3">
              <p className="text-gray-300 font-medium">The problem:</p>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Powerful AI models locked behind expensive APIs</li>
                <li>Independent developers pay premium prices</li>
                <li>Access controlled by a handful of companies</li>
              </ul>
            </div>
            <div className="mt-4 space-y-3">
              <p className="text-gray-300 font-medium">The solution:</p>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>AIPG turns idle GPUs into AI infrastructure</li>
                <li>Developers get OpenAI-compatible access</li>
                <li>GPU owners earn tokens for real work</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6 lg:space-y-10">
            <div>
              <div className="flex items-center gap-x-2 mb-2">
                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="8" width="20" height="10" rx="2"/>
                  <path d="M8 8V6a4 4 0 0 1 8 0v2"/>
                </svg>
                <h3 className="text-base sm:text-lg font-semibold text-gray-200">
                  Centralized AI
                </h3>
              </div>
              <p className="text-gray-400">
                Today's AI APIs are controlled by a few large providers. Pricing, access, and availability are all decided centrally.
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
                  Distributed AI
                </h3>
              </div>
              <p className="text-gray-400">
                AIPG is an open network where anyone can contribute compute and earn. Access is permissionless. The network is owned by everyone who participates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problem; 