'use client';

import { StakingInterface } from '@/components/StakingInterface';

export default function StakingPage() {
  return (
    <div className="bg-black relative min-h-screen">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-100"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.1),transparent_50%)]"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10">
        {/* Staking Section */}
        <div className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Staking Interface */}
            <StakingInterface />
          </div>
        </div>

        {/* Info Section */}
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Buy AIPG CTA */}
          <div className="mb-12 max-w-md mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition duration-500"></div>
            <div className="relative bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6">
          <div className="flex flex-col items-center text-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Need AIPG to stake?</h3>
              <p className="text-gray-400">Buy AIPG on Uniswap and start earning rewards</p>
            </div>
            <a 
              href="https://app.uniswap.org/swap?outputCurrency=0xa1c0deCaFE3E9Bf06A5F29B7015CD373a9854608&chain=base"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold px-8 py-3 rounded-xl transition-all whitespace-nowrap shadow-lg hover:shadow-pink-500/50"
            >
              <span>🦄</span>
              Buy on Uniswap
            </a>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur opacity-0 group-hover:opacity-30 transition"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 text-center">
            <div className="text-cyan-400 text-3xl mb-4">🔓</div>
            <h3 className="text-xl font-bold text-white mb-2">No Lock Period</h3>
            <p className="text-gray-400">
              Unstake your AIPG anytime. Your tokens are never locked.
            </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur opacity-0 group-hover:opacity-30 transition"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 text-center">
              <div className="text-cyan-400 text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Real-Time Rewards</h3>
              <p className="text-gray-400">
                Rewards accrue every second. Claim whenever you want.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur opacity-0 group-hover:opacity-30 transition"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 text-center">
              <div className="text-cyan-400 text-3xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-2">High APY</h3>
              <p className="text-gray-400">
                Earn competitive rewards on your staked AIPG.
              </p>
            </div>
          </div>
        </div>

        {/* Contract Info & Security */}
        <div className="mb-12 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
          <div className="relative bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-2xl font-bold text-white mb-3">Verified Smart Contract</h3>
          <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
            Our staking contract is verified on BaseScan and audited for security. Your funds are protected by battle-tested OpenZeppelin libraries.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://basescan.org/address/0x3ED14A6D5A48614D77f313389611410d38fd8277#code"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-xl transition-all font-semibold"
            >
              <span>✓</span>
              View Contract on BaseScan
            </a>
            <div className="inline-flex items-center gap-2 bg-gray-700/50 text-gray-300 px-4 py-2 rounded-xl">
              <span className="text-xs">📍</span>
              <span className="text-sm font-mono">0x3ED1...8277</span>
            </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12 max-w-5xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
          <div className="relative bg-gray-800/30 backdrop-blur-sm border border-cyan-500/10 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-gray-900/30 rounded-xl p-4 text-center">
              <div className="bg-cyan-500/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 border border-cyan-500/30">
                <span className="text-cyan-400 font-bold text-xl">1</span>
              </div>
              <h4 className="text-white font-semibold mb-2 text-base">Connect Wallet</h4>
              <p className="text-gray-400 text-sm">Connect your wallet using RainbowKit</p>
            </div>

            <div className="bg-gray-900/30 rounded-xl p-4 text-center">
              <div className="bg-cyan-500/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 border border-cyan-500/30">
                <span className="text-cyan-400 font-bold text-xl">2</span>
              </div>
              <h4 className="text-white font-semibold mb-2 text-base">Stake AIPG</h4>
              <p className="text-gray-400 text-sm">Enter amount and approve transaction (100 min)</p>
            </div>

            <div className="bg-gray-900/30 rounded-xl p-4 text-center">
              <div className="bg-cyan-500/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 border border-cyan-500/30">
                <span className="text-cyan-400 font-bold text-xl">3</span>
              </div>
              <h4 className="text-white font-semibold mb-2 text-base">Earn Rewards</h4>
              <p className="text-gray-400 text-sm">Watch your rewards grow every second</p>
            </div>

            <div className="bg-gray-900/30 rounded-xl p-4 text-center">
              <div className="bg-cyan-500/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 border border-cyan-500/30">
                <span className="text-cyan-400 font-bold text-xl">4</span>
              </div>
              <h4 className="text-white font-semibold mb-2 text-base">Claim Anytime</h4>
              <p className="text-gray-400 text-sm">No lockup period - unstake whenever you want</p>
            </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-12 max-w-4xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
          <div className="relative bg-gray-800/30 backdrop-blur-sm border border-cyan-500/10 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-5">
            <div className="bg-gray-900/30 rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-2">How are rewards calculated?</h4>
              <p className="text-gray-400 text-sm">Rewards accrue every second based on your share of the total staked pool. The more AIPG staked globally, the more stable the APY becomes.</p>
            </div>

            <div className="bg-gray-900/30 rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-2">Is there a minimum stake?</h4>
              <p className="text-gray-400 text-sm">Yes, the minimum stake is 100 AIPG to prevent spam and ensure meaningful participation.</p>
            </div>

            <div className="bg-gray-900/30 rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-2">Can I lose my staked tokens?</h4>
              <p className="text-gray-400 text-sm">No. Your staked AIPG is always yours and can be withdrawn at any time. The contract is non-custodial and verified on BaseScan.</p>
            </div>

            <div className="bg-gray-900/30 rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-2">How often should I claim rewards?</h4>
              <p className="text-gray-400 text-sm">You can claim anytime! Rewards continue accruing whether you claim daily, weekly, or let them accumulate. Gas fees are the only consideration.</p>
            </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

