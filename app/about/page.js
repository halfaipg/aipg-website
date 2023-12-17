"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const About = () => {
  const images = [
    "aigp (48).png",
    "aigp (49).png",
    "aigp (50).png",
    "aigp (51).png",
    "aigp (52).png",
    "aigp (53).png",
    "aigp (54).png",
    "aigp (55).png",
  ];

  const [randomImage, setRandomImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    import("preline");
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
    setIsLoading(false);
  }, []);

  return (
    <div>
      <section className="w-full h-96 flex flex-row items-end justify-end sm:justify-start p-4 sm:py-12 sm:px-32 relative">
        <video
          src="/aipg6.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
        <div className="bg-transparent p-6 text-white w-full sm:h-full h-auto sm:w-[30%] flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold">About</h1>
        </div>
      </section>
      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* <div class="aspect-w-16 aspect-h-7">
    <img class="w-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1624571409412-1f253e1ecc89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" alt="Image Description" />
  </div> */}

        <div class="mt-5 lg:mt-16 grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div class="lg:col-span-1">
            <h2 class="font-bold text-2xl md:text-3xl text-gray-800 dark:text-gray-200">
              What is AI Power Grid (AIPG)?
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
                    ASIC resistant
                  </h3>
                  <p class="mt-1 text-gray-600 dark:text-gray-400">
                    Uses the KAWPOW hashing algorithm to discourage the
                    development of ASIC hardware.
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
                    Decentralization and Accessibility
                  </h3>
                  <p class="mt-1 text-gray-600 dark:text-gray-400">
                    One of AIPG's core values is the democratization of access to AI. The project aims to make AI technologies widely accessible and equitable, 
                    empowering users across different sectors to harness AI's capabilities for innovation and growth.
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
                    Everyone has equal opportunity to mine or purchase AIPG from
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
                    Community and Collaboration
                  </h3>
                  <p class="mt-1 text-gray-600 dark:text-gray-400">
                  AIPG is dedicated to fostering an active, engaging community and establishing partnerships with entities in the open-source AI space and related industries. This collaborative approach is intended to 
                  gather diverse insights, drive innovation, and ensure AIPG remains at the cutting edge of AI and blockchain technology integration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div class="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
          <div class="mt-5 sm:mt-10 lg:mt-0">
            <div class="space-y-6 sm:space-y-8">
              <div class="space-y-2 md:space-y-4">
                <h2 class="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-gray-200">
                  The AIPG coin is the native cryptocurrency of the AI Power
                  Grid platform.
                </h2>
                <p class="text-gray-500">
                  Our ecosystem will thrive on open-source collaboration, fostering
                  innovation and creativity, while our marketplace and NFT AI
                  Gallery enable artists and AI enthusiasts to monetize their
                  work and contribute to the rapidly evolving AI landscape. With
                  AIPG, we're not just building technology; we're nurturing a
                  community where every participant is an integral part of
                  shaping the future of AI. The AIPG NFT AI Gallery will
                  allow users to create, display, and trade AI-generated art. 
                  This feature will leverage Stable Diffusion models to craft unique and 
                  high-quality artworks that are tokenized as NFTs on the blockchain.
                </p>
              </div>
              <ul role="list" class="space-y-2 sm:space-y-4">
                <li class="flex space-x-3">
                  <span class="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      class="flex-shrink-0 h-3.5 w-3.5"
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
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>

                  <span class="text-sm sm:text-base text-gray-500">
                    <span class="font-bold">Decentralized</span> AI services
                  </span>
                </li>

                <li class="flex space-x-3">
                  <span class="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      class="flex-shrink-0 h-3.5 w-3.5"
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
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>

                  <span class="text-sm sm:text-base text-gray-500">
                    NFT <span class="font-bold">Art Gallery</span>
                  </span>
                </li>

                <li class="flex space-x-3">
                  <span class="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      class="flex-shrink-0 h-3.5 w-3.5"
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
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>

                  <span class="text-sm sm:text-base text-gray-500">
                    Blockchain-Validated Outputs
                  </span>
                </li>
                <li class="flex space-x-3">
                  <span class="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      class="flex-shrink-0 h-3.5 w-3.5"
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
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>

                  <span class="text-sm sm:text-base text-gray-500">
                    Rapid Deployment and Community Feedback Loop
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            {isLoading ? (
              <div>Loading...</div> // replace this with your loading spinner or placeholder
            ) : (
              <img
                className="rounded-xl"
                src={`/${randomImage}`}
                alt="Image Description"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
