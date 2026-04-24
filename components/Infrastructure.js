"use client";
import React from "react";

const Infrastructure = () => {
  return (
    <div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-3xl font-bold md:text-4xl md:leading-tight dark:text-white">
            How The Grid Works
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Community GPUs run AI models. Smart routing sends your request to the best available worker. Workers earn AIPG for every job they complete.
          </p>
        </div>

        <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
          <div className="mt-2 sm:mt-3 lg:mt-0">
            <img
              className="rounded-3xl w-full scale-75 sm:scale-90 md:scale-100 lg:scale-110 xl:scale-[1.3]"
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
                GPU Workers
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Gaming rigs to data centers — any GPU can join the network and start earning by running AI models.
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
                Smart Routing
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Requests automatically route to the best available worker based on model, load, and latency.
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
                Token Rewards
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Workers earn AIPG for every job completed. Each token represents real inference work done.
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure; 