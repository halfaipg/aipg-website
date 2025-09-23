"use client";
import { useEffect } from "react";

const Services = () => {
  useEffect(() => {
    import("preline");
  }, []);
  return (
    <div className="bg-black">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 items-center gap-6 md:gap-10">
          <div style={{backgroundColor: '#1F1F1F'}} className="w-full h-full shadow-lg rounded-3xl p-12">
            <div className="flex items-center gap-x-2 mb-2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Global Access
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
            Creators worldwide tap into high-end AI capabilities without asking permission from corporate gatekeepers. Whether you're building in Buenos Aires or Bangalore, AIPG provides the same frontier model access that was previously reserved for big tech companies and their preferred partners.
            </p>
          </div>

          <div style={{backgroundColor: '#1F1F1F'}} className="w-full h-full shadow-lg rounded-3xl p-12">
            <div className="flex items-center gap-x-2 mb-2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              New Economics
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
            Token rewards create entirely new income streams for GPU owners and AI contributors. Instead of wasteful cryptocurrency mining, community members earn meaningful rewards by providing actual AI inference services that people need and use every day.
            </p>
          </div>

          <div style={{backgroundColor: '#1F1F1F'}} className="w-full h-full shadow-lg rounded-3xl p-12">
            <div className="flex items-center gap-x-2 mb-2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Sustainability
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
            Repurposed hardware slashes proof-of-work waste by channeling computational power into useful AI inference instead of arbitrary hash calculations. Every GPU cycle serves actual human creativity and productivity rather than burning energy for digital scarcity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
