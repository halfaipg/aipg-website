"use client";
import { useEffect } from "react";

const Services = () => {
  useEffect(() => {
    import("preline");
  }, []);
  return (
    <div className="bg-white dark:bg-transparent">
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 items-center gap-6 md:gap-10">
          <div className="w-full h-full bg-white shadow-lg rounded-lg p-5 dark:bg-slate-900">
            <div className="flex items-center gap-x-4 mb-3">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px]">
                <svg
                  className="flex-shrink-0 w-8 h-8 text-gray-700 dark:text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3"/>
                  <circle cx="12" cy="3" r="1"/>
                  <circle cx="12" cy="21" r="1"/>
                  <circle cx="3" cy="12" r="1"/>
                  <circle cx="21" cy="12" r="1"/>
                  <circle cx="18.36" cy="5.64" r="1"/>
                  <circle cx="18.36" cy="18.36" r="1"/>
                  <circle cx="5.64" cy="5.64" r="1"/>
                  <circle cx="5.64" cy="18.36" r="1"/>
                  <path d="M12 15v3"/>
                  <path d="M12 6V3"/>
                  <path d="M15 12h6"/>
                  <path d="M3 12h6"/>
                  <path d="M15.54 8.46l4.24-4.24"/>
                  <path d="M4.22 19.78l4.24-4.24"/>
                  <path d="M8.46 8.46L4.22 4.22"/>
                  <path d="M19.78 19.78l-4.24-4.24"/>
                </svg>
              </div>
              <div className="flex-shrink-0">
                <h3 className="block text-lg font-semibold text-gray-800 dark:text-white">
                Global Access
                </h3>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
            Creators worldwide tap into high-end AI capabilities without asking permission from corporate gatekeepers. Whether you're building in Buenos Aires or Bangalore, AIPG provides the same frontier model access that was previously reserved for big tech companies and their preferred partners.
            </p>
          </div>

          <div className="w-full h-full bg-white shadow-lg rounded-lg p-5 dark:bg-slate-900">
            <div className="flex items-center gap-x-4 mb-3">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px]">
                <svg
                  className="flex-shrink-0 w-8 h-8 text-gray-700 dark:text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                  <circle cx="12" cy="12" r="2"/>
                  <path d="M12 7v2"/>
                  <path d="M12 15v2"/>
                  <path d="M7 12h2"/>
                  <path d="M15 12h2"/>
                </svg>
              </div>
              <div className="flex-shrink-0">
                <h3 className="block text-lg font-semibold text-gray-800 dark:text-white">
                New Economics
                </h3>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
            Token rewards create entirely new income streams for GPU owners and AI contributors. Instead of wasteful cryptocurrency mining, community members earn meaningful rewards by providing actual AI inference services that people need and use every day.
            </p>
          </div>

          <div className="w-full h-full bg-white shadow-lg rounded-lg p-5 dark:bg-slate-900">
            <div className="flex items-center gap-x-4 mb-3">
              <div className="inline-flex justify-center items-center w-[62px] h-[62px]">
                <svg
                  className="flex-shrink-0 w-8 h-8 text-gray-700 dark:text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
                  <line x1="16" y1="8" x2="2" y2="22"/>
                  <line x1="17.5" y1="15" x2="9" y2="15"/>
                  <path d="M3 3l1.5 1.5"/>
                  <circle cx="7.5" cy="7.5" r="1.5"/>
                </svg>
              </div>
              <div className="flex-shrink-0">
                <h3 className="block text-lg font-semibold text-gray-800 dark:text-white">
                Environmental Sustainability
                </h3>
              </div>
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
