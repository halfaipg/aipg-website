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
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-blue-600 dark:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
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
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-green-50 bg-green-100 dark:border-green-900 dark:bg-green-800">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-green-600 dark:text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
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
              <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-green-50 bg-green-100 dark:border-green-900 dark:bg-green-800">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-green-600 dark:text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3V2"/>
                  <path d="M12 22v-1"/>
                  <path d="M17 7l1-1"/>
                  <path d="M6 18l1-1"/>
                  <path d="M7 6L6 5"/>
                  <path d="M18 17l1 1"/>
                  <path d="M22 12h-1"/>
                  <path d="M3 12H2"/>
                  <circle cx="12" cy="12" r="5"/>
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
