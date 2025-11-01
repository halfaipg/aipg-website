'use client';

import { useState, useEffect } from 'react';
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

function formatAPY(apy) {
  if (apy >= 1000000) {
    return (apy / 1000000).toFixed(2) + 'M%';
  } else if (apy >= 1000) {
    return (apy / 1000).toFixed(2) + 'K%';
  }
  return apy.toFixed(2) + '%';
}

export function StakingInterface() {
  const { address, isConnected } = useAccount();
  const {
    stakingData,
    stake,
    unstake,
    claimRewards,
    approveToken,
    isLoading,
    needsApproval
  } = useStaking();

  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [activeTab, setActiveTab] = useState('stake');
  const [isTransacting, setIsTransacting] = useState(false);

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;
    
    // Check minimum stake amount
    if (parseFloat(stakeAmount) < 100) {
      alert('⚠️ Minimum stake amount is 100 AIPG');
      return;
    }
    
    try {
      setIsTransacting(true);
      if (needsApproval) {
        await approveToken(stakeAmount);
      }
      await stake(stakeAmount);
      setStakeAmount('');
      
      // Keep loading state for 5 seconds to show animation
      setTimeout(() => setIsTransacting(false), 5000);
    } catch (error) {
      setIsTransacting(false);
      console.error('Stake error:', error);
      
      // Don't show alert for user cancellations
      if (error.message === 'Transaction cancelled') {
        return;
      }
      
      if (error.message === 'Approval needed') {
        alert('Please approve the transaction in your wallet first, then try staking again.');
      } else {
        alert(`Error: ${error.message || 'Transaction failed'}`);
      }
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

  const handleClaim = async () => {
    try {
      setIsTransacting(true);
      await claimRewards();
      
      // Keep loading state for 5 seconds to show animation
      setTimeout(() => setIsTransacting(false), 5000);
    } catch (error) {
      setIsTransacting(false);
      console.error('Claim error:', error);
      
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
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6 text-center transition-all duration-500">
          <div className="text-gray-400 text-sm mb-1">Global APY</div>
          <div className="text-4xl font-bold text-orange-400">
            {stakingData.apy ? formatAPY(stakingData.apy) : '--'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 text-center transition-all duration-500">
          <div className="text-gray-400 text-sm mb-1">Total Value Staked</div>
          <div className="text-4xl font-bold text-green-400">
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
          <div className="text-5xl mb-4">🔐</div>
          <h3 className="text-xl font-bold text-white mb-3">Connect Your Wallet</h3>
          <p className="text-gray-400 mb-6">
            Connect your wallet to start staking AIPG and earning rewards
          </p>
          <div className="flex justify-center">
            <ConnectButton />
          </div>
        </div>
      )}

      {/* User Stats Dashboard - Only when connected */}
      {isConnected && (
        <>
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 transition-all duration-500">
          <div className="text-gray-400 text-sm mb-1">Current APY</div>
          <div className="text-3xl font-bold text-cyan-400">
            {stakingData.apy ? formatAPY(stakingData.apy) : '--'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 transition-all duration-500">
          <div className="text-gray-400 text-sm mb-1">Your Staked</div>
          <div className="text-3xl font-bold text-purple-400">
            {stakingData.stakedBalance !== undefined
              ? parseFloat(formatEther(stakingData.stakedBalance)).toLocaleString(undefined, { maximumFractionDigits: 2 })
              : '--'
            }
          </div>
          <div className="text-gray-500 text-xs">AIPG</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6 transition-all duration-500">
          <div className="text-gray-400 text-sm mb-1">Pending Rewards</div>
          <div className="text-3xl font-bold text-green-400">
            {stakingData.pendingRewards !== undefined
              ? parseFloat(formatEther(stakingData.pendingRewards)).toLocaleString(undefined, { maximumFractionDigits: 4 })
              : '--'
            }
          </div>
          <div className="text-gray-500 text-xs">AIPG</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6 transition-all duration-500">
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

      {/* Main Interface */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setActiveTab('stake')}
              className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                activeTab === 'stake'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Stake
            </button>
            <button
              onClick={() => setActiveTab('unstake')}
              className={`px-6 py-2 rounded-xl font-semibold transition-all ${
                activeTab === 'unstake'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Unstake
            </button>
          </div>

          <ConnectButton showBalance={false} />
        </div>

        {activeTab === 'stake' ? (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2 text-center md:text-left">Amount to Stake</label>
              <div className="relative">
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  placeholder="100 minimum"
                  min="100"
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-4 text-white text-xl focus:outline-none focus:border-cyan-500 text-center md:text-left"
                />
                <button
                  onClick={() => setStakeAmount(stakingData.tokenBalance ? formatEther(stakingData.tokenBalance) : '0')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 px-3 py-1 rounded-lg text-sm font-semibold transition-all"
                >
                  MAX
                </button>
              </div>
              <div className="text-gray-500 text-sm mt-1 text-center md:text-left">
                Available: {stakingData.tokenBalance ? parseFloat(formatEther(stakingData.tokenBalance)).toLocaleString() : '0'} AIPG
              </div>
              <div className="text-yellow-500 text-sm mt-1 text-center md:text-left">
                ⚠️ Minimum: 100 AIPG
              </div>
            </div>

            <button
              onClick={handleStake}
              disabled={isLoading || !stakeAmount || parseFloat(stakeAmount) <= 0}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-4 rounded-xl transition-all disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/50"
            >
              {isLoading ? 'Processing...' : needsApproval ? 'Approve & Stake' : 'Stake AIPG'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2 text-center md:text-left">Amount to Unstake</label>
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
              {isLoading ? 'Processing...' : 'Unstake AIPG'}
            </button>
          </div>
        )}

        {/* Claim Rewards Section */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col items-center text-center gap-4">
            <div>
              <div className="text-gray-400 text-sm mb-2">Claimable Rewards</div>
              <div className="text-3xl font-bold text-green-400">
                {stakingData.pendingRewards 
                  ? parseFloat(formatEther(stakingData.pendingRewards)).toLocaleString(undefined, { maximumFractionDigits: 6 })
                  : '0'
                } AIPG
              </div>
            </div>
            <button
              onClick={handleClaim}
              disabled={isLoading || !stakingData.pendingRewards || stakingData.pendingRewards === 0n}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold px-8 py-3 rounded-xl transition-all disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/50"
            >
              {isLoading ? 'Processing...' : 'Claim Rewards'}
            </button>
          </div>
        </div>
      </div>

      </>
      )}
    </div>
  );
}

