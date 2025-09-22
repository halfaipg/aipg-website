"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Modal from "@/components/Modal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isArtModalOpen, setIsArtModalOpen] = useState(false);

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
    <div className="pt-0 bg-black min-h-screen">
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
            <h2 className="font-bold text-2xl md:text-3xl text-white">
              A New Kind of Power Grid
            </h2>
            <p className="mt-2 md:mt-4 text-gray-300">
              Electricity changed the industrial world—an open AI grid can change the digital one. AI Power Grid (AIPG) transforms idle GPUs into a permissionless, censorship-resistant AI utility that lights up open-source creativity everywhere.
            </p>
            <p className="mt-4 text-gray-300">
              By turning community hardware into a distributed AI infrastructure, AIPG breaks down the walls that big tech has built around frontier models. Instead of renting AI from corporate landlords, developers tap directly into a people-powered network where GPU owners earn tokens for providing real inference work—no wasteful hashing, only useful AI.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
            <div className="flex gap-x-5">
                <svg
                  className="flex-shrink-0 mt-1 w-6 h-6 text-gray-400"
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
                  <path d="M8 12h8"/>
                  <path d="M12 8v8"/>
                </svg>
                <div className="grow">
                  <h3 className="text-lg font-semibold text-white">
                  Global Access Without Permission
                  </h3>
                  <p className="mt-1 text-gray-300">
                  Creators worldwide tap into high-end AI capabilities without asking permission from corporate gatekeepers. Whether you're building in Buenos Aires or Bangalore, AIPG provides the same frontier model access that was previously reserved for big tech companies.
                  </p>
                </div>
              </div>
              <div className="flex gap-x-5">
                <svg
                  className="flex-shrink-0 mt-1 w-6 h-6 text-gray-400"
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
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  <path d="M12 2L8 6l4 4 4-4-4-4z"/>
                </svg>
                <div className="grow">
                  <h3 className="text-lg font-semibold text-white">
                    People-Powered Economics
                  </h3>
                  <p className="mt-1 text-gray-300">
                    Token rewards create entirely new income streams for GPU owners and AI contributors. Instead of wasteful cryptocurrency mining, community members earn meaningful rewards by providing actual AI inference services that people need and use.
                  </p>
                </div>
              </div>
              <div className="flex gap-x-5">
                <svg
                  className="flex-shrink-0 mt-1 w-6 h-6 text-gray-400"
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
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M9 9h6v6H9z"/>
                  <path d="M9 1v4"/>
                  <path d="M15 1v4"/>
                  <path d="M9 19v4"/>
                  <path d="M15 19v4"/>
                  <path d="M1 9h4"/>
                  <path d="M1 15h4"/>
                  <path d="M19 9h4"/>
                  <path d="M19 15h4"/>
                </svg>
                <div className="grow">
                  <h3 className="text-lg font-semibold text-white">
                    Open Source, Open Doors
                  </h3>
                  <p className="mt-1 text-gray-300">
                  All code, models, and workflows live in the open, killing vendor lock-in and accelerating innovation. Complete transparency means you're never locked into proprietary systems—inspect our code, run your own instances, and maintain full control.
                  </p>
                </div>
              </div>
              <div className="flex gap-x-5">
                <svg
                  className="flex-shrink-0 mt-1 w-6 h-6 text-gray-400"
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
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
                <div className="grow">
                  <h3 className="text-lg font-semibold text-white">
                    Sustainability
                  </h3>
                  <p className="mt-1 text-gray-300">
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
            <div className="bg-gray-800 p-4 text-center">
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
            <div className="bg-gray-800 p-4 text-center">
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
            <div className="bg-gray-800 p-4 text-center">
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
            <div className="bg-gray-800 p-4 text-center">
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
            <div className="bg-gray-800 p-4 text-center">
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
            <div className="bg-gray-800 p-4 text-center">
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
            <div className="bg-gray-800 p-4 text-center">
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
                <h2 className="font-bold text-3xl lg:text-4xl text-white">
                  The Community-Powered AI Network
                </h2>
                <p className="text-gray-300">
                  AIPG transforms the relationship between compute and AI by creating a permissionless network where GPU owners contribute idle hardware to run state-of-the-art models. Our smart routing engine matches every prompt to the optimal worker node, while AIPG tokens flow to contributors based on actual inference work performed—no wasteful hashing, only useful AI that serves real human creativity and productivity.
                </p>
              </div>
              <ul role="list" className="space-y-2 sm:space-y-4">
                <li>
                  <div className="flex items-start gap-x-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="2 4 20 16">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                    </svg>
                    <span className="text-sm sm:text-base text-gray-300">
                      <span className="font-bold text-white">Distributed Worker Network</span> - Community GPUs running real AI inference
                    </span>
                  </div>
                </li>

                <li>
                  <div className="flex items-start gap-x-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="2 2 20 20">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    <span className="text-sm sm:text-base text-gray-300">
                      <span className="font-bold text-white">Smart Routing Engine</span> - Optimal prompt matching to best worker nodes
                    </span>
                  </div>
                </li>

                <li>
                  <div className="flex items-start gap-x-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="4 6 16 12">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                    </svg>
                    <span className="text-sm sm:text-base text-gray-300">
                      <span className="font-bold text-white">Token Incentives</span> - Contributors earn rewards for useful computation
                    </span>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-x-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="1 3 22 18">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                    </svg>
                    <span className="text-sm sm:text-base text-gray-300">
                      <span className="font-bold text-white">Open Source Transparency</span> - All code and models publicly auditable
                    </span>
                  </div>
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

      {/* Interactive Demos Section */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-3xl font-bold md:text-4xl md:leading-tight dark:text-white">
            Experience the Grid in Action
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Test our distributed worker network with powerful, developer-friendly frontends that showcase the full capabilities of the AIPG ecosystem.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Chat Interface */}
          <div>
            <div 
              className="aspect-video bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center mb-6 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setIsModalOpen(true)}
            >
              <img 
                src="/chat-ss.png" 
                alt="Chat Interface Screenshot" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="text-center mb-4">
              <a
                href="https://chat.aipowergrid.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-2 bg-gray-600 text-white text-sm font-medium rounded-full px-6 py-3 hover:bg-gray-700 transition-colors"
              >
                Try Chat Demo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Four Versatile Modes:</strong> Story Mode for creative fiction, Adventure Mode for interactive fiction, Chat Mode for AI personas, and Instruct Mode for ChatGPT-style responses.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Full Features:</strong> Model selection, worker management, export/share stories, text-to-speech, memory support, and advanced sampling configurations.
              </p>
            </div>
          </div>

          {/* Art Gallery */}
          <div>
            <div 
              className="aspect-video bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center mb-6 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setIsArtModalOpen(true)}
            >
              <img 
                src="/art-ss.png" 
                alt="Art Gallery Screenshot" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="text-center mb-4">
              <a
                href="https://aipg.art"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-2 bg-gray-600 text-white text-sm font-medium rounded-full px-6 py-3 hover:bg-gray-700 transition-colors"
              >
                Try Art Generator
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Advanced Features:</strong> Text2img, img2img, and inpainting capabilities powered by Grid workers running Stable Diffusion models.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Coming Soon:</strong> NFT minting with deterministic metadata—mint the actual AI generation parameters instead of just links to images!
              </p>
            </div>
          </div>
        </div>

        {/* Discord Integration */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 lg:p-8">
          <div className="flex flex-col items-center text-center gap-4 mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 a8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Discord Grid Bots
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Experience AIPG workers directly in our community Discord
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <div className="text-2xl mb-2">🖼️</div>
              <h4 className="font-semibold text-gray-800 dark:text-white">Image Gen Bot</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Generate images directly in Discord</p>
              <a
                href="https://github.com/AIPowerGrid/grid-discord-image-bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-1 text-xs text-gray-500 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Code
              </a>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <div className="text-2xl mb-2">📰</div>
              <h4 className="font-semibold text-gray-800 dark:text-white">AI News Bot</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Latest AI developments and updates</p>
              <a
                href="https://github.com/AIPowerGrid/grid-discord-news-bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-1 text-xs text-gray-500 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Code
              </a>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <div className="text-2xl mb-2">🧠</div>
              <h4 className="font-semibold text-gray-800 dark:text-white">AI Knowledge Bot</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Answer questions about AI and tech</p>
              <a
                href="https://github.com/AIPowerGrid/grid-discord-rag-bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-1 text-xs text-gray-500 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Code
              </a>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <a
              href="https://discord.gg/W9D8j6HCtC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-x-2 bg-indigo-600 text-white text-sm font-medium rounded-full px-6 py-3 hover:bg-indigo-700 transition-colors"
            >
              Join Discord Community
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <img 
          src="/chat-ss.png" 
          alt="Chat Interface Screenshot Full Resolution" 
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
        />
      </Modal>

      <Modal isOpen={isArtModalOpen} onClose={() => setIsArtModalOpen(false)}>
        <img 
          src="/art-ss.png" 
          alt="Art Gallery Screenshot Full Resolution" 
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
        />
      </Modal>
    </div>
  );
};

export default About;

