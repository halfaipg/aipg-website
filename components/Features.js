"use client";
import React from "react";

const Features = () => {
  return (
    <div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="lg:w-3/4">
            <h2 className="text-3xl text-gray-800 font-bold lg:text-4xl dark:text-white">
            Revolutionizing Blockchain with DePIN
            </h2>
            <p className="mt-3 text-gray-800 dark:text-gray-400">
            The Decentralized Physical Infrastructure Network (DePIN) represents a groundbreaking evolution in blockchain and cryptocurrency, addressing the sustainability challenges of traditional Proof of Work (PoW) systems. Unlike PoW, which demands significant computational power for block mining and is often criticized for its high energy consumption without direct productive output, DePIN repurposes this computational capacity for meaningful AI tasks. Within the AIPG ecosystem, DePIN incentivizes node operators to perform inference on localized large language models (LLM) and host AI art model generation using technologies like Stable Diffusion. This integration of blockchain and AI tasks not only validates transactions but also generates valuable AI services, thereby ensuring that the energy consumed contributes positively to the community and the broader AI field.
            </p>
          </div>

          <div className="space-y-6 lg:space-y-10">
            <div className="flex">
              <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-slate-900 dark:border-gray-700 dark:text-gray-200">
                <svg
                  className="flex-shrink-0 w-5 h-5"
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
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Empowering Meaningful Contributions
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                We will leverage DePIN to go beyond the usual 'mining' activities associated with cryptocurrencies.
                Instead of consuming colossal amounts of energy for arbitrary calculations, the AIPG network 
                utilizes a validation mechanism that supports and rewards constructive computational tasks.
                </p>
              </div>
            </div>

            <div className="flex">
              <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-slate-900 dark:border-gray-700 dark:text-gray-200">
                <svg
                  className="flex-shrink-0 w-5 h-5"
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
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Creating an Inclusive AI Ecosystem
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                AIPG not only positions itself as an innovator in blockchain technology but also as a contributor 
                to the global AI landscape. By democratizing access to computational resources, we enable a vast 
                community of researchers, developers, and enthusiasts to partake in and contribute towards cutting-edge 
                AI development, regardless of their individual computational capacity.
                </p>
              </div>
            </div>

            <div className="flex">
              <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-slate-900 dark:border-gray-700 dark:text-gray-200">
                <svg
                  className="flex-shrink-0 w-5 h-5"
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
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                Access to AI for everyone
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                AI Power Grid (AIPG) envisions a future where access to cutting-edge AI is free and open to all. 
                Our platform leverages a Decentralized Physical Infrastructure Network (DePIN) protocol to align blockchain security with valuable
                AI processes. By participating in the network, users contribute to computational tasks that advance AI technology, 
                and in turn, they are incentivized with AIPG tokens. This model encourages a collaborative and energy-efficient approach to AI advancement.
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