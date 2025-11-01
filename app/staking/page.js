'use client';

import { StakingInterface } from '@/components/StakingInterface';

export default function StakingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Staking Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Background/image_1.png')] opacity-10 bg-cover bg-center" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Staking Interface */}
          <StakingInterface />
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Buy AIPG CTA */}
        <div className="mb-8 max-w-md mx-auto bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6">
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

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 text-center">
            <div className="text-cyan-400 text-3xl mb-4">🔓</div>
            <h3 className="text-xl font-bold text-white mb-2">No Lock Period</h3>
            <p className="text-gray-400">
              Unstake your AIPG anytime. Your tokens are never locked.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 text-center">
            <div className="text-cyan-400 text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Real-Time Rewards</h3>
            <p className="text-gray-400">
              Rewards accrue every second. Claim whenever you want.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 text-center">
            <div className="text-cyan-400 text-3xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-white mb-2">High APY</h3>
            <p className="text-gray-400">
              Earn competitive rewards on your staked AIPG.
            </p>
          </div>
        </div>

        {/* Contract Info & Security */}
        <div className="mt-8 bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8 text-center">
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

        {/* How It Works */}
        <div className="mt-8 bg-gray-800/30 backdrop-blur-sm border border-cyan-500/10 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-cyan-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-cyan-400 font-bold text-xl">1</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Connect Wallet</h4>
              <p className="text-gray-400 text-sm">Connect your wallet using RainbowKit</p>
            </div>

            <div className="text-center">
              <div className="bg-cyan-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-cyan-400 font-bold text-xl">2</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Stake AIPG</h4>
              <p className="text-gray-400 text-sm">Enter amount and approve transaction (100 min)</p>
            </div>

            <div className="text-center">
              <div className="bg-cyan-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-cyan-400 font-bold text-xl">3</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Earn Rewards</h4>
              <p className="text-gray-400 text-sm">Watch your rewards grow every second</p>
            </div>

            <div className="text-center">
              <div className="bg-cyan-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-cyan-400 font-bold text-xl">4</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Claim Anytime</h4>
              <p className="text-gray-400 text-sm">No lockup period - unstake whenever you want</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 bg-gray-800/30 backdrop-blur-sm border border-cyan-500/10 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">How are rewards calculated?</h4>
              <p className="text-gray-400">Rewards accrue every second based on your share of the total staked pool. The more AIPG staked globally, the more stable the APY becomes.</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Is there a minimum stake?</h4>
              <p className="text-gray-400">Yes, the minimum stake is 100 AIPG to prevent spam and ensure meaningful participation.</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Can I lose my staked tokens?</h4>
              <p className="text-gray-400">No. Your staked AIPG is always yours and can be withdrawn at any time. The contract is non-custodial and verified on BaseScan.</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-2">How often should I claim rewards?</h4>
              <p className="text-gray-400">You can claim anytime! Rewards continue accruing whether you claim daily, weekly, or let them accumulate. Gas fees are the only consideration.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

