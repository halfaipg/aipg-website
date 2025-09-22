"use client";
import React from "react";

const Features = () => {
  return (
    <div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="lg:w-3/4">
            <h2 className="text-3xl text-gray-800 font-bold lg:text-4xl dark:text-white">
            Open Source, Open Doors
            </h2>
            <p className="mt-3 text-gray-800 dark:text-gray-400">
            All code, models, and workflows live in the open, killing vendor lock-in and accelerating innovation. When AI development happens in the light, the entire community benefits from shared knowledge, collaborative debugging, and collective wisdom. No black boxes, no corporate secrets—just transparent technology that anyone can inspect, improve, and build upon.
            </p>
            <p className="mt-3 text-gray-800 dark:text-gray-400">
            This radical transparency doesn't just build trust—it unleashes innovation. Developers can see exactly how models make decisions, identify potential improvements, and contribute meaningful enhancements. Together, we're not just using AI tools; we're collectively building the future of artificial intelligence through open collaboration and shared expertise.
            </p>
          </div>

          <div className="space-y-6 lg:space-y-10">
            <div className="flex">
              <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px]">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-gray-700 dark:text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="16" rx="2"/>
                  <path d="M7 8h10"/>
                  <path d="M7 12h8"/>
                  <path d="M7 16h6"/>
                  <circle cx="12" cy="2" r="1"/>
                  <path d="M12 3v1"/>
                  <path d="M9 20l3 2 3-2"/>
                </svg>
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                  No Vendor Lock-In
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                Complete transparency in our models and infrastructure means you're never locked into proprietary systems. Inspect our code, run your own instances, and maintain full control over your AI workflows without depending on corporate gatekeepers.
                </p>
              </div>
            </div>

            <div className="flex">
              <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px]">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-gray-700 dark:text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  <circle cx="12" cy="12" r="2"/>
                  <path d="M8 12l2 2 4-4"/>
                  <path d="M12 8v8"/>
                  <path d="M8 12h8"/>
                </svg>
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Accelerated Innovation
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                Open source development creates a multiplier effect where every contribution benefits the entire ecosystem. Bug fixes, performance improvements, and feature enhancements spread instantly across the network, accelerating progress for everyone.
                </p>
              </div>
            </div>

            <div className="flex">
              <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px]">
                <svg
                  className="flex-shrink-0 w-6 h-6 text-gray-700 dark:text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="8"/>
                  <path d="M8 12l2 2 4-4"/>
                  <circle cx="5" cy="12" r="1"/>
                  <circle cx="19" cy="12" r="1"/>
                  <circle cx="12" cy="5" r="1"/>
                  <circle cx="12" cy="19" r="1"/>
                  <path d="M7.5 7.5l9 9"/>
                  <path d="M16.5 7.5l-9 9"/>
                </svg>
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                Collective Ownership
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                The AI commons belongs to everyone who contributes. Unlike proprietary systems controlled by a few, our open development model ensures that the community collectively owns and shapes the future of AI technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;