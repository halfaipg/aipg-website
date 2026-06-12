'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useStaking } from '@/hooks/useStaking';
import { formatEther, parseEther } from 'viem';

// Helper to format large numbers
function formatBalance(value) {
  const num = parseFloat(value);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export function StakingInterface() {
  const { isConnected } = useAccount();
  const {
    stakingData,
    unstake,
    claimRewards,
    isLoading
  } = useStaking();

  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [isTransacting, setIsTransacting] = useState(false);

  const handleClaim = async () => {
    try {
      setIsTransacting(true);
      await claimRewards();
      setTimeout(() => setIsTransacting(false), 5000);
    } catch (error) {
      setIsTransacting(false);
      console.error('Claim error:', error);
      if (error.message === 'Transaction cancelled') return;
      alert(`Error: ${error.message || 'Claim failed'}`);
    }
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || parseFloat(unstakeAmount) <= 0) return;
    
    try {
      setIsTransacting(true);
      await unstake(unstakeAmount);
      setUnstakeAmount('');
      
      // Keep loading state for 5 seconds to show animation
      setTimeout(() => setIsTransacting(false), 5000);
    } catch (error) {
      setIsTransacting(false);
      console.error('Unstake error:', error);
      
      // Don't show alert for user cancellations
      if (error.message === 'Transaction cancelled') {
        return;
      }
      
      // User-friendly error messages
      if (error.message?.includes('Ledger device') || error.message?.includes('0x6511')) {
        alert('Ledger error: Please make sure your Ledger is unlocked, the Ethereum app is open, and you approve the transaction.');
      } else {
        alert(`Error: ${error.message || 'Transaction failed'}`);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto relative">
      {/* Loading Overlay */}
      {isTransacting && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <div className="bg-gray-800 border border-cyan-500/50 rounded-2xl p-8 text-center shadow-2xl">
            <div className="text-6xl mb-4">⏳</div>
            <h3 className="text-2xl font-bold text-white mb-2">Processing Transaction</h3>
            <p className="text-gray-400">Please wait while your balances update...</p>
            <div className="mt-4 flex justify-center gap-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Global Stats - Always Visible */}
      <div className="mb-6">
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 text-center transition-all duration-500">
          <div className="flex justify-center mb-3">
            <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/40 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
          </div>
          <div className="text-gray-400 text-sm mb-1">Total Still Staked</div>
          <div className="text-4xl font-bold text-purple-400">
            {stakingData.totalStaked !== undefined
              ? formatBalance(parseFloat(formatEther(stakingData.totalStaked)))
              : '--'
            }
          </div>
          <div className="text-gray-500 text-xs">AIPG</div>
        </div>
      </div>

      {/* Connect Wallet Prompt */}
      {!isConnected && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Connect Your Wallet</h3>
          <p className="text-gray-400 mb-6">
            Connect your wallet to withdraw your staked AIPG
          </p>
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>
      )}

      {/* User Stats Dashboard - Only when connected */}
      {isConnected && (
        <>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 transition-all duration-500 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/40 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
              </svg>
            </div>
          </div>
          <div className="text-gray-400 text-sm mb-1">Your Staked Balance</div>
          <div className="text-3xl font-bold text-purple-400">
            {stakingData.stakedBalance !== undefined
              ? parseFloat(formatEther(stakingData.stakedBalance)).toLocaleString(undefined, { maximumFractionDigits: 2 })
              : '--'
            }
          </div>
          <div className="text-gray-500 text-xs">AIPG</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6 transition-all duration-500 text-center">
          <div className="flex justify-center mb-3">
            <div className="w-11 h-11 rounded-xl bg-orange-500/15 border border-orange-500/40 flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"/>
              </svg>
            </div>
          </div>
          <div className="text-gray-400 text-sm mb-1">Wallet Balance</div>
          <div className="text-3xl font-bold text-orange-400">
            {stakingData.tokenBalance !== undefined
              ? formatBalance(formatEther(stakingData.tokenBalance))
              : '--'
            }
          </div>
          <div className="text-gray-500 text-xs">AIPG</div>
        </div>
      </div>

      {/* Unclaimed Rewards — earned during the staking program, claimable anytime */}
      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/40 rounded-2xl p-6 mb-8 text-center">
        <div className="text-gray-400 text-sm mb-1">Unclaimed Staking Rewards</div>
        <div className="text-4xl font-bold text-green-400 mb-1">
          {stakingData.pendingRewards !== undefined
            ? parseFloat(formatEther(stakingData.pendingRewards)).toLocaleString(undefined, { maximumFractionDigits: 2 })
            : '--'
          }
        </div>
        <div className="text-gray-500 text-xs mb-4">AIPG</div>
        <button
          onClick={handleClaim}
          disabled={isLoading || !stakingData.pendingRewards || stakingData.pendingRewards === 0n}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold px-10 py-3 rounded-xl transition-all disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/50"
        >
          {isLoading ? 'Processing...' : 'Claim Rewards'}
        </button>
        <p className="text-gray-500 text-xs mt-3">
          Rewards accrued during the staking program are recorded on-chain and never expire.
          Withdrawing your stake does not affect them — claim whenever you like.
        </p>
      </div>

      {/* Main Interface */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Withdraw Your AIPG</h3>
          <ConnectButton showBalance={false} />
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2 text-center md:text-left">Amount to Withdraw</label>
            <div className="relative">
              <input
                type="number"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-4 text-white text-xl focus:outline-none focus:border-cyan-500 text-center md:text-left"
              />
              <button
                onClick={() => setUnstakeAmount(stakingData.stakedBalance ? formatEther(stakingData.stakedBalance) : '0')}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-3 py-1 rounded-lg text-sm font-semibold transition-all"
              >
                MAX
              </button>
            </div>
            <div className="text-gray-500 text-sm mt-1 text-center md:text-left">
              Staked: {stakingData.stakedBalance ? parseFloat(formatEther(stakingData.stakedBalance)).toLocaleString() : '0'} AIPG
            </div>
          </div>

          <button
            onClick={handleUnstake}
            disabled={isLoading || !unstakeAmount || parseFloat(unstakeAmount) <= 0}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-4 rounded-xl transition-all disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
          >
            {isLoading ? 'Processing...' : 'Withdraw AIPG'}
          </button>
        </div>
      </div>

      </>
      )}
    </div>
  );
}

