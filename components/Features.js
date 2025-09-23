"use client";
import React from "react";

const Features = () => {
  return (
    <div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="lg:w-3/4 px-4 sm:px-6 md:pl-8 md:pr-4 lg:pl-12 lg:pr-0">
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

          <div className="space-y-6 lg:space-y-10 px-4 sm:px-6 md:px-0">
            <div>
              <div className="flex items-center gap-x-2 mb-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                </svg>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                  No Vendor Lock-In
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
              Complete transparency in our models and infrastructure means you're never locked into proprietary systems. Inspect our code, run your own instances, and maintain full control over your AI workflows without depending on corporate gatekeepers.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-x-2 mb-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Accelerated Innovation
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
              Open source development creates a multiplier effect where every contribution benefits the entire ecosystem. Bug fixes, performance improvements, and feature enhancements spread instantly across the network, accelerating progress for everyone.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-x-2 mb-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                Collective Ownership
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
              The AI commons belongs to everyone who contributes. Unlike proprietary systems controlled by a few, our open development model ensures that the community collectively owns and shapes the future of AI technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;