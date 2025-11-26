"use client";

import React from "react";
import Image from "next/image";
import BTCChart from "@/components/BTCChart";

// Archived copy of the AIPG Autonomous Fund page (previously app/strategic-reserve/page.js)
// Kept here so it can be easily restored in the future.
export default function StrategicReservePage() {
  return (
    <div className="bg-black relative min-h-screen">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-100"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.1),transparent_50%)]"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10">
         {/* Hero Title Section */}
         <div className="w-full pt-20 pb-12 md:pt-24 md:pb-16">
           <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
             <div className="max-w-4xl mx-auto text-center">
               <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl text-white tracking-tight">
                 AIPG Autonomous Fund
               </h1>
             </div>
           </div>
         </div>

        {/* Main Content */}
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
          
          {/* What It Is - Hero Card */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 lg:p-12 shadow-2xl">
                <h2 className="text-4xl font-bold text-white mb-8 text-center">What is the AI Autonomous Fund?</h2>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p className="text-xl">
                    Think of the AI Autonomous Fund as an <strong className="text-white font-semibold">automated financial manager</strong> for AI Power Grid's treasury. Instead of humans making trading decisions, we use <strong className="text-white font-semibold">machine learning algorithms</strong> that analyze Bitcoin's price movements to make smart, long-term investment decisions.
                  </p>
                  <p className="text-xl">
                    The system runs <strong className="text-white font-semibold">completely automatically</strong> — when our AI model detects a significant trend change in Bitcoin, it automatically adjusts exposure through <strong className="text-white font-semibold">Web3 smart contract execution</strong>. There are <strong className="text-white font-semibold">no manual trades</strong> and no discretionary overrides, except in the case of a technical or infrastructure emergency. Every decision is executed on-chain, making the process transparent, verifiable, and free from human emotion or bias.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works - Modern Cards */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">How It Works</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              <div className="relative group h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-8 lg:p-10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] shadow-2xl h-full flex flex-col">
                  <div className="flex items-center gap-x-5 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/40 flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      AI-Powered Analysis
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Our machine learning model continuously analyzes Bitcoin's price and trading volume patterns, with no sentiment analysis or news feeds. It looks for long-horizon directional shifts and makes predictions about future price movements, focusing on long-term trends rather than short-term volatility. The model is trained on historical market data and adapts to changing market conditions while maintaining a disciplined, systematic approach to risk management.
                  </p>
                </div>
              </div>

              <div className="relative group h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 lg:p-10 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] shadow-2xl h-full flex flex-col">
                  <div className="flex items-center gap-x-5 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-500/40 flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Automated Execution
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    When the AI model signal changes, the system <strong className="text-white font-semibold">automatically adjusts exposure through smart-contract execution</strong> on the blockchain. This fully automated Web3 flow means every decision is transparent, verifiable, and immutable — it's all recorded on-chain for everyone to see. The system operates with <strong className="text-white font-semibold">no manual trades</strong> and executes autonomously based solely on ML model signals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Allocation - Stats Dashboard */}
          <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto mb-16">
            <div className="max-w-[85rem] mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-8 lg:p-10 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  <span className="bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">Current Allocation</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div className="relative group/card">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl blur opacity-0 group-hover/card:opacity-30 transition"></div>
                    <div className="relative rounded-2xl border border-green-500/30 bg-black/60 backdrop-blur-sm p-6 text-center hover:border-green-500/50 transition-all hover:scale-105">
                      <div className="text-gray-400 text-sm mb-2 font-medium">Price Average</div>
                      <div className="text-white text-4xl font-bold mb-1">$106.6k</div>
                      <div className="text-gray-400 text-xs">USD/BTC</div>
                    </div>
                  </div>
                  <div className="relative group/card">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-2xl blur opacity-0 group-hover/card:opacity-30 transition"></div>
                    <div className="relative rounded-2xl border border-orange-500/30 bg-black/60 backdrop-blur-sm p-6 text-center hover:border-orange-500/50 transition-all hover:scale-105">
                      <div className="text-gray-400 text-sm mb-2 font-medium">Allocation</div>
                      <div className="text-white text-4xl font-bold mb-1">1%</div>
                      <div className="text-gray-400 text-xs">of treasury</div>
                    </div>
                  </div>
                  <div className="relative group/card">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur opacity-0 group-hover/card:opacity-30 transition"></div>
                    <div className="relative rounded-2xl border border-purple-500/30 bg-black/60 backdrop-blur-sm p-6 text-center hover:border-purple-500/50 transition-all hover:scale-105">
                      <div className="text-gray-400 text-sm mb-2 font-medium">Stance</div>
                      <div className="text-white text-4xl font-bold mb-1">Short</div>
                      <div className="text-gray-400 text-xs">directional exposure</div>
                    </div>
                  </div>
                  <div className="relative group/card">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur opacity-0 group-hover/card:opacity-30 transition"></div>
                    <div className="relative rounded-2xl border border-cyan-500/30 bg-black/60 backdrop-blur-sm p-6 text-center hover:border-cyan-500/50 transition-all hover:scale-105">
                      <div className="text-gray-400 text-sm mb-2 font-medium">Leverage</div>
                      <div className="text-white text-4xl font-bold mb-1">1.0x</div>
                      <div className="text-gray-400 text-xs">cap 4x</div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <p className="inline-block bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl px-6 py-3 text-gray-300 text-sm">
                    Controls at a glance: Utilization cap 50% (current 1%) • Leverage cap 4x • Smart‑contract execution • Full on‑chain transparency
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BTC Chart Section */}
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="relative group w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-4 lg:p-6 shadow-2xl w-full">
                <BTCChart />
              </div>
            </div>
          </div>

          {/* Technical Overview - Modern Grid */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Technical Overview</span>
            </h2>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-10 lg:p-12 shadow-2xl">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                  <div className="relative group/card">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-500/5 to-amber-500/5 rounded-xl blur opacity-0 group-hover/card:opacity-30 transition"></div>
                    <div className="relative text-center bg-black/40 backdrop-blur-sm rounded-xl p-8 hover:bg-black/60 transition-all duration-300 border border-orange-500/20 hover:border-orange-500/40 hover:scale-105">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 flex items-center justify-center">
                          <Image 
                            src="/bitcoin-logo.svg" 
                            alt="Bitcoin" 
                            width={32} 
                            height={32}
                            className="w-8 h-8"
                          />
                        </div>
                      </div>
                      <h4 className="font-bold text-white mb-2 text-lg">Asset</h4>
                      <p className="text-sm text-gray-300">Bitcoin only</p>
                    </div>
                  </div>
                  <div className="relative group/card">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl blur opacity-0 group-hover/card:opacity-30 transition"></div>
                    <div className="relative text-center bg-black/40 backdrop-blur-sm rounded-xl p-8 hover:bg-black/60 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 hover:scale-105">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                          <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </div>
                      </div>
                      <h4 className="font-bold text-white mb-2 text-lg">Timeframe</h4>
                      <p className="text-sm text-gray-300">Long-term, low-frequency</p>
                    </div>
                  </div>
                  <div className="relative group/card">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl blur opacity-0 group-hover/card:opacity-30 transition"></div>
                    <div className="relative text-center bg-black/40 backdrop-blur-sm rounded-xl p-8 hover:bg-black/60 transition-all duration-300 border border-cyan-500/20 hover:border-cyan-500/40 hover:scale-105">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                          <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                          </svg>
                        </div>
                      </div>
                      <h4 className="font-bold text-white mb-2 text-lg">Directional Exposure</h4>
                      <p className="text-sm text-gray-300">Long or short BTC</p>
                    </div>
                  </div>
                  <div className="relative group/card">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-xl blur opacity-0 group-hover/card:opacity-30 transition"></div>
                    <div className="relative text-center bg-black/40 backdrop-blur-sm rounded-xl p-8 hover:bg-black/60 transition-all duration-300 border border-green-500/20 hover:border-green-500/40 hover:scale-105">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center">
                          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                          </svg>
                        </div>
                      </div>
                      <h4 className="font-bold text-white mb-2 text-lg">Utilization Cap</h4>
                      <p className="text-sm text-gray-300">Max 50% of treasury</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-5 gap-4 pt-8 border-t border-orange-500/20">
                  {[
                    { title: "Leverage Cap", desc: "Max 4x", color: "orange" },
                    { title: "Fully Automated", desc: "No manual trades", color: "purple" },
                    { title: "Web3 Smart Contracts", desc: "Automated execution", color: "cyan" },
                    { title: "Data-Driven", desc: "Price & volume only", color: "blue" },
                    { title: "Transparent", desc: "All on-chain", color: "green" }
                  ].map((item, idx) => (
                    <div key={idx} className="text-center p-4 rounded-xl bg-black/30 border border-white/5 hover:border-white/10 transition-all hover:scale-105">
                      <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                      <p className="text-gray-400 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Treasury Impact & Market Behavior */}
          <div className="max-w-[85rem] px-4 mx-auto mb-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-10 lg:p-12 shadow-2xl text-center">
                <h2 className="text-4xl font-bold text-white mb-12 text-center">
                  <span className="bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">Treasury Impact & Market Behavior</span>
                </h2>
                <div className="grid grid-cols-1 gap-8 lg:gap-10 max-w-5xl mx-auto">
                  <div className="relative group/card">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl blur opacity-0 group-hover/card:opacity-30 transition"></div>
                    <div className="relative rounded-2xl border border-indigo-500/30 bg-black/60 backdrop-blur-sm p-8 lg:p-10 text-center hover:border-indigo-500/50 transition-all hover:scale-[1.02]">
                      <h3 className="text-2xl font-bold text-white mb-4">Minimal AIPG Selling</h3>
                      <ul className="text-gray-300 space-y-3 list-none text-left max-w-2xl mx-auto">
                        <li className="flex items-start">
                          <span className="text-indigo-400 mr-2">•</span>
                          <span>Funded in USDC on Base; AIPG remains in core treasury.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-400 mr-2">•</span>
                          <span>PnL settles in USDC from BTC perps; no need to sell AIPG for runway.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-400 mr-2">•</span>
                          <span>If conversion is ever required: OTC/RFQ preferred or TWAP micro‑slices to avoid impact.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="relative group/card">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur opacity-0 group-hover/card:opacity-30 transition"></div>
                    <div className="relative rounded-2xl border border-purple-500/30 bg-black/60 backdrop-blur-sm p-8 lg:p-10 text-center hover:border-purple-500/50 transition-all hover:scale-[1.02]">
                      <h3 className="text-2xl font-bold text-white mb-4">Direction‑Agnostic Hedging</h3>
                      <ul className="text-gray-300 space-y-3 list-none text-left max-w-2xl mx-auto">
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          <span>Captures trends up or down via symmetric long/short posture.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          <span>Designed to hedge large market moves and harvest volatility.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 mr-2">•</span>
                          <span>Low‑frequency, policy‑based adjustments; no discretionary overrides.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <p className="text-center text-gray-400 text-sm mt-8">
                  This module is an internal, automated treasury risk tool. It is not an investment product and creates no holder entitlements.
                </p>
              </div>
            </div>
          </div>

          {/* Why It Matters */}
          <div className="max-w-[85rem] mx-auto mb-20 px-4 sm:px-6 lg:px-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-green-500/30 rounded-3xl p-10 lg:p-12 shadow-2xl">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-white mb-8 text-center">
                  <span className="bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">Why This Matters</span>
                </h2>
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                  <p className="text-xl">
                    The AI Autonomous Fund helps AI Power Grid maintain <strong className="text-white font-semibold">financial stability</strong> by intelligently managing a portion of our treasury. This isn't about making quick profits or gambling — it's about <strong className="text-white font-semibold">protecting and growing our operational funds</strong> over the long term.
                  </p>
                  <p className="text-xl">
                    By using AI and <strong className="text-white font-semibold">Web3 smart contract automation</strong>, we eliminate human emotion and bias from financial decisions. Every move is based on data, executed automatically through smart contracts on the blockchain, and designed to support the long-term health of the AI Power Grid network. The system operates with <strong className="text-white font-semibold">operational discipline and risk stability</strong> — not speculation or yield distribution.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Disclaimers */}
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/30 to-orange-600/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-red-950/95 via-gray-900/95 to-black/95 backdrop-blur-xl border-2 border-red-500/50 rounded-3xl p-10 lg:p-12 shadow-2xl">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/30 to-orange-500/30 border-2 border-red-500/50 flex items-center justify-center animate-pulse">
                    <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-8 text-center">
                  <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">⚠️ Important Information</span>
                </h3>
                <div className="space-y-6">
                  <div className="relative group/card">
                    <div className="absolute -inset-1 bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-xl blur opacity-50"></div>
                    <div className="relative bg-red-950/60 backdrop-blur-sm rounded-xl p-6 lg:p-8 border-2 border-red-500/50">
                      <p className="text-red-100 font-bold text-center text-lg lg:text-xl leading-relaxed">
                        AIPG tokens do not represent ownership, claims on treasury assets, or entitlement to performance.
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-200 text-center leading-relaxed text-lg">
                    The AI Autonomous Fund is an <strong className="text-red-300 font-semibold">internal risk management tool</strong> designed for operational stability. It's not a profit-sharing mechanism or investment product. All operations are automated, transparent, and focused on maintaining the long-term health of the AI Power Grid ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


