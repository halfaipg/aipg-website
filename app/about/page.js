"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const About = () => {
  const images = [
    "aipg (1).png",
    "aipg (2).png",
    "aipg (3).png",
    "aipg (4).png",
    "aipg (5).png",
    "aipg (6).png",
  ];

  const [randomImage, setRandomImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    price: null,
    supply: null,
    marketCap: null,
  });

  useEffect(() => {
    setIsLoading(true);
    import("preline");
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
    setIsLoading(false);

    fetch("https://api.coingecko.com/api/v3/coins/ai-power-grid")
      .then((response) => response.json())
      .then((data) => {
        const marketData = data.market_data;
        setMetrics({
          price: marketData.current_price.usd,
          supply: marketData.total_supply,
          marketCap: marketData.current_price.usd * marketData.total_supply,
        });
      })
      .catch((error) => console.error('Error fetching metrics:', error));
  }, []);

  // Helper function to format numbers without decimals
  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(number);
  };

  // Helper function to format price with 4 decimal places
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(price);
  };

  return (
    <div className="pt-10">
      {/* Video Banner */}
      <div className="overflow-hidden">
        <video autoPlay loop muted className="w-full h-[190px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover">
          <source src="/videos/AIPG_About_Banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
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
              real-time user feedback.<br/>

              AIPG also aims to transform AI-generated art into tradable 
              NFT assets and catapulting AIPG to be a key player in the NFT marketplace.
              It will be An immersive virtual space dedicated to the exhibition of AI-generated artwork, 
              highlighting the creative possibilities of generative AI models.
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
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <div class="grow">
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                  AI Democratization
                  </h3>
                  <p class="mt-1 text-gray-600 dark:text-gray-400">
                  The platform aims to make AI accessible to all by lowering the barriers to entry. 
                  This democratization allows contributors from various backgrounds to participate 
                  equally in the future of AI development and application, aligning with the open-source and democratizing philosophy of AIPG.
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
                    single participant or group can monopolize the mining process, and 
                    the resulting GPU miners will come with us into the new AI network.
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
                  ensure AIPG remains at the cutting edge of AI and blockchain technology integration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Section - Adapted with Timeline Box Styling */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <h2 className="font-bold text-2xl md:text-3xl text-gray-800 dark:text-gray-200 mb-8 text-center">
          Stats
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {/* Current Price Box */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="bg-blue-800 p-4 text-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Price
              </h3>
            </div>
            <div className="bg-gray-900 p-4 text-center h-24 flex items-center justify-center">
              <p className="text-xl font-mono text-white">
                ${formatPrice(metrics.price)}
              </p>
            </div>
          </div>
          {/* Supply Box */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="bg-blue-800 p-4 text-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Supply
              </h3>
            </div>
            <div className="bg-gray-900 p-4 text-center h-24 flex items-center justify-center">
              <p className="text-xl font-mono text-white">
                {formatNumber(metrics.supply)} <span className="text-xs align-top">AIPG</span>
              </p>
            </div>
          </div>
          {/* Market Cap Box */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="bg-blue-800 p-4 text-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Market Cap
              </h3>
            </div>
            <div className="bg-gray-900 p-4 text-center h-24 flex items-center justify-center">
              <p className="text-xl font-mono text-white">
                ${formatNumber(metrics.marketCap)}
              </p>
            </div>
          </div>
          {/* Launch Type Box */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="bg-blue-800 p-4 text-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Launch Type
              </h3>
            </div>
            <div className="bg-gray-900 p-4 text-center h-24 flex items-center justify-center">
              <p className="text-xl font-mono text-white">
                Fair<br />Launch
              </p>
            </div>
          </div>
          {/* Launch Date Box */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="bg-blue-800 p-4 text-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Launch Date
              </h3>
            </div>
            <div className="bg-gray-900 p-4 text-center h-24 flex items-center justify-center">
              <p className="text-xl font-mono text-white">
                12/10/2023
              </p>
            </div>
          </div>
          {/* Network Box */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="bg-blue-800 p-4 text-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Network
              </h3>
            </div>
            <div className="bg-gray-900 p-4 text-center h-24 flex items-center justify-center">
              <p className="text-xl font-mono text-white">
                UTXO +<br />PoW
              </p>
            </div>
          </div>
          {/* Max Supply Box */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="bg-blue-800 p-4 text-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Max Supply
              </h3>
            </div>
            <div className="bg-gray-900 p-4 text-center h-24 flex items-center justify-center">
              <p className="text-xl font-mono text-white">
                150M <span className="text-xs align-top">AIPG</span>
              </p>
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
          <div class={`${isLoading ? "" : "mt-6 sm:mt-0"}`}>
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

