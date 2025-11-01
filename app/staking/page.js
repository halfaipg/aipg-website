'use client';

import { StakingInterface } from '@/components/StakingInterface';

export default function StakingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Background/image_1.png')] opacity-10 bg-cover bg-center" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Stake</span>{' '}
              <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">AIPG</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Earn rewards by staking your AIPG tokens. No lockup period, claim anytime.
            </p>
          </div>

          {/* Staking Interface */}
          <StakingInterface />
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
            <div className="text-cyan-400 text-3xl mb-4">🔓</div>
            <h3 className="text-xl font-bold text-white mb-2">No Lock Period</h3>
            <p className="text-gray-400">
              Unstake your AIPG anytime. Your tokens are never locked.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
            <div className="text-cyan-400 text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Real-Time Rewards</h3>
            <p className="text-gray-400">
              Rewards accrue every second. Claim whenever you want.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
            <div className="text-cyan-400 text-3xl mb-4">💰</div>
            <h3 className="text-xl font-bold text-white mb-2">High APY</h3>
            <p className="text-gray-400">
              Earn competitive rewards on your staked AIPG.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16 bg-gray-800/30 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-8">
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
              <p className="text-gray-400 text-sm">Enter amount and approve transaction</p>
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
              <p className="text-gray-400 text-sm">Claim rewards or unstake whenever you want</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

