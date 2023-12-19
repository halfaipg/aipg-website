"use client";

import Link from "next/link";
import React, { useEffect } from "react";

const WhitePaper = () => {
  useEffect(() => {
    import("preline");
  }, []);
  return (
    <div>
      <section className="w-full h-96 flex flex-row items-end justify-end sm:justify-start p-4 sm:py-12 sm:px-32 relative">
        <video
          src="/video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
        <div className="bg-white p-6 text-black w-full sm:h-full h-auto sm:w-[30%]">
          <h1 className="text-3xl sm:text-4xl  font-extrabold">Whitepaper</h1>
          <p className="my-4 text-sm font-medium">
            Our ecosystem thrives on open-source collaboration, fostering
            innovation and creativity, while our marketplace and NFT AI Gallery
            enable artists and AI enthusiasts to monetize their work and
            contribute to the rapidly evolving AI landscape.
          </p>
          <Link
            href="/faqs"
            className="my-4 px-6 py-2 sm:py-4 font-semibold flex flex-row space-x-2 border-b-2 border-cyan-300 max-w-[80%] hover:scale-90 duration-300 ease-in-out"
          >
            View our FAQs
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 ml-2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </span>
          </Link>
        </div>
      </section>
      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* <div class="aspect-w-16 aspect-h-7">
    <img class="w-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1624571409412-1f253e1ecc89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" alt="Image Description" />
  </div> */}

        <div class="mt-5 lg:mt-16 grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div class="lg:col-span-1">
            <h2 class="font-bold text-2xl md:text-3xl text-gray-800 dark:text-gray-200">
              What is AI Power Grid?
            </h2>
            <p class="mt-2 md:mt-4 text-gray-500">
              AI Power Grid (AIPG) is pioneering a revolutionary approach by
              offering free access to cutting-edge Large Language Model (LLM)
              inference and AI Art generation, validated on an immutable
              blockchain to ensure authenticity and security. As a beacon of
              democratization in AI, AIPG empowers developers by providing an
              efficient platform to deploy, share, and enhance their models with
              real-time user feedback.
            </p>
          </div>

          <div class="lg:col-span-2">
            <div class="grid sm:grid-cols-2 gap-8 md:gap-12">
              <div class="flex gap-x-5">
                <svg
                  class="flex-shrink-0 mt-1 w-6 h-6 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect width="18" height="10" x="3" y="11" rx="2" />
                  <circle cx="12" cy="5" r="2" />
                  <path d="M12 7v4" />
                  <line x1="8" x2="8" y1="16" y2="16" />
                  <line x1="16" x2="16" y1="16" y2="16" />
                </svg>
                <div class="grow">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                    ASIC resistant algo
                  </h3>
                  <p class="mt-1 text-gray-600 dark:text-gray-400">
                    AIPG uses the KAWPOW hashing algorithm to discourage the
                    use of ASIC hardware. ASIC resistance is vital for ensuring that no 
                    single participant or group can monopolize the mining process, which 
                    aligns with AIPG's mission to democratize AI and maintain a level playing field for all.
                    </p>
                </div>
              </div>
              <div class="flex gap-x-5">
                <svg
                  class="flex-shrink-0 mt-1 w-6 h-6 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M7 10v12" />
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                </svg>
                <div class="grow">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                    Simple and affordable
                  </h3>
                  <p class="mt-1 text-gray-600 dark:text-gray-400">
                    From boarding passes to movie tickets, there's pretty much
                    nothing you can't store with Preline.
                  </p>
                </div>
              </div>
              <div class="flex gap-x-5">
                <svg
                  class="flex-shrink-0 mt-1 w-6 h-6 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <div class="grow">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                    Fair launch
                  </h3>
                  <p class="mt-1 text-gray-600 dark:text-gray-400">
                    Everyone has equal opportunity to mine or purchase HVQ since
                    day one.
                  </p>
                </div>
              </div>
              <div class="flex gap-x-5">
                <svg
                  class="flex-shrink-0 mt-1 w-6 h-6 text-blue-600 dark:text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <div class="grow">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                    No ICO
                  </h3>
                  <p class="mt-1 text-gray-600 dark:text-gray-400">
                    No pre-mine
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="text-3xl font-semibold text-center py-4">
          Whitepaper
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 py-4">
          <span className="text-3xl font-semibold">
            AI Power Grid Whitepaper: Executive Summary
          </span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            21 November 2023
          </span>
        </div>
        <div>
          <span className="text-2xl font-semibold tracking-tight">
            Introduction:
          </span>
          <p className="py-2">
            AI Power Grid is a blockchain-based platform designed to democratize
            access to advanced AI technologies. It leverages open-source LLMs
            and Stable Diffusion for AI art to revolutionize industries and
            empower developers, creators, and end-users.
          </p>
        </div>
        <span className="text-2xl font-semibold tracking-tight">Mission:</span>
        <p className="py-2">
          Our mission is to make AI technology accessible and beneficial for
          all, promoting innovation, supporting open-source ecosystems, and
          contributing to the global AI community's growth through collaboration
          and shared knowledge.
        </p>
        <span className="text-2xl font-semibold tracking-tight">
          Core Offerings:
        </span>
        <p className="py-2">
          Free LLM Inference & AI Art Generation: Users can access LLM and AI
          art generation services at no cost, fostering an environment ripe for
          innovation and growth without the barriers of entry typically
          associated with such technologies.
        </p>
        <span className="text-2xl font-semibold tracking-tight">
          Blockchain Validation:
        </span>{" "}
        <p className="py-2">
          The platform ensures that all AI-generated content and services are
          validated and recorded on the blockchain for transparency, trust, and
          security.
        </p>
        <span className="text-2xl font-semibold tracking-tight">
          NFT AI Gallery & Marketplace:
        </span>{" "}
        <p className="py-2">
          A creative and commercial space for artists to mint, showcase, and
          trade their AI-generated art as NFTs, utilizing the blockchain to
          authenticate and secure transactions.
        </p>
        <h3>Technical Architecture:</h3>
        <span className="text-2xl font-semibold tracking-tight">
          Decentralized Infrastructure:
        </span>
        <p className="py-2">
          {" "}
          AIPG is built on a decentralized network that distributes AI service
          workloads, ensuring scalability and robustness.
        </p>
        <span className="text-2xl font-semibold tracking-tight">
          Blockchain Framework:
        </span>{" "}
        <p className="py-2">
          Integrates a custom blockchain solution optimized for high throughput,
          low latency, and enhanced smart contract capabilities to handle
          complex operations.
        </p>
        <span className="text-2xl font-semibold tracking-tight">
          Open-Source AI Models:
        </span>
        <p className="py-2">
          {" "}
          Utilizes the latest open-source LLMs and Stable Diffusion models,
          ensuring that the platform's AI capabilities remain at the forefront
          of the field.
        </p>
      </div>
    </div>
  );
};

export default WhitePaper;
