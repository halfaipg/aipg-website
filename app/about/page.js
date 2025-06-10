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
    <div className="pt-0">
      {/* Video Banner */}
      <div className="overflow-hidden">
        <video autoPlay loop muted className="w-full h-[190px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover">
          <source src="/videos/AIPG_About_Banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="mt-5 lg:mt-16 grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <h2 className="font-bold text-2xl md:text-3xl text-gray-800 dark:text-gray-200">
              A New Kind of Power Grid
            </h2>
            <p className="mt-2 md:mt-4 text-gray-500">
              Electricity changed the industrial world—an open AI grid can change the digital one. AI Power Grid (AIPG) transforms idle GPUs into a permissionless, censorship-resistant AI utility that lights up open-source creativity everywhere.
            </p>
            <p className="mt-4 text-gray-500">
              By turning community hardware into a distributed AI infrastructure, AIPG breaks down the walls that big tech has built around frontier models. Instead of renting AI from corporate landlords, developers tap directly into a people-powered network where GPU owners earn tokens for providing real inference work—no wasteful hashing, only useful AI.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
            <div className="flex gap-x-5">
                <svg
                  className="flex-shrink-0 mt-1 w-6 h-6 text-blue-600 dark:text-blue-500"
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
                  <path d="M2 12l10 5"/>
                </svg>
                <div className="grow">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Global Access Without Permission
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                  Creators worldwide tap into high-end AI capabilities without asking permission from corporate gatekeepers. Whether you're building in Buenos Aires or Bangalore, AIPG provides the same frontier model access that was previously reserved for big tech companies.
                  </p>
                </div>
              </div>
              <div className="flex gap-x-5">
                <svg
                  className="flex-shrink-0 mt-1 w-6 h-6 text-blue-600 dark:text-blue-500"
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
                <div className="grow">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    People-Powered Economics
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Token rewards create entirely new income streams for GPU owners and AI contributors. Instead of wasteful cryptocurrency mining, community members earn meaningful rewards by providing actual AI inference services that people need and use.
                  </p>
                </div>
              </div>
              <div className="flex gap-x-5">
                <svg
                  className="flex-shrink-0 mt-1 w-6 h-6 text-blue-600 dark:text-blue-500"
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
                <div className="grow">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Open Source, Open Doors
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                  All code, models, and workflows live in the open, killing vendor lock-in and accelerating innovation. Complete transparency means you're never locked into proprietary systems—inspect our code, run your own instances, and maintain full control.
                  </p>
                </div>
              </div>
              <div className="flex gap-x-5">
                <svg
                  className="flex-shrink-0 mt-1 w-6 h-6 text-blue-600 dark:text-blue-500"
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
                <div className="grow">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Environmental Sustainability
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                  Repurposed hardware slashes proof-of-work waste by channeling computational power into useful AI inference instead of arbitrary hash calculations. Every GPU cycle serves actual human creativity and productivity rather than burning energy for digital scarcity.
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

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
          <div className="mt-5 sm:mt-10 lg:mt-0">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 md:space-y-4">
                <h2 className="font-bold text-3xl lg:text-4xl text-gray-800 dark:text-gray-200">
                  The Community-Powered AI Network
                </h2>
                <p className="text-gray-500">
                  AIPG transforms the relationship between compute and AI by creating a permissionless network where GPU owners contribute idle hardware to run state-of-the-art models. Our smart routing engine matches every prompt to the optimal worker node, while AIPG tokens flow to contributors based on actual inference work performed—no wasteful hashing, only useful AI that serves real human creativity and productivity.
                </p>
              </div>
              <ul role="list" className="space-y-2 sm:space-y-4">
                <li className="flex space-x-3">
                  <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      className="flex-shrink-0 h-3.5 w-3.5"
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
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>

                  <span className="text-sm sm:text-base text-gray-500">
                    <span className="font-bold">Distributed Worker Network</span> - Community GPUs running real AI inference
                  </span>
                </li>

                <li className="flex space-x-3">
                  <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      className="flex-shrink-0 h-3.5 w-3.5"
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
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>

                  <span className="text-sm sm:text-base text-gray-500">
                    <span className="font-bold">Smart Routing Engine</span> - Optimal prompt matching to best worker nodes
                  </span>
                </li>

                <li className="flex space-x-3">
                  <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      className="flex-shrink-0 h-3.5 w-3.5"
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
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>

                  <span className="text-sm sm:text-base text-gray-500">
                    <span className="font-bold">Token Incentives</span> - Contributors earn rewards for useful computation
                  </span>
                </li>
                <li className="flex space-x-3">
                  <span className="mt-0.5 h-5 w-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500">
                    <svg
                      className="flex-shrink-0 h-3.5 w-3.5"
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
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>

                  <span className="text-sm sm:text-base text-gray-500">
                    <span className="font-bold">Open Source Transparency</span> - All code and models publicly auditable
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className={`${isLoading ? "" : "mt-6 sm:mt-0"}`}>
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

