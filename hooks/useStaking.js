'use client';

import { useState, useEffect } from 'react';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { STAKING_VAULT_ADDRESS, AIPG_TOKEN_ADDRESS, STAKING_VAULT_ABI, ERC20_ABI } from '@/lib/stakingContracts';

export function useStaking() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [stakingData, setStakingData] = useState({
    tokenBalance: 0n,
    stakedBalance: 0n,
    pendingRewards: 0n,
    totalStaked: 0n,
    apy: 0,
    allowance: 0n
  });

  const [isLoading, setIsLoading] = useState(false);
  const [needsApproval, setNeedsApproval] = useState(false);

  // Fetch staking data
  const fetchStakingData = async () => {
    if (!publicClient) {
      return;
    }

    try {
      // Always fetch global data
      const globalDataPromises = [
        publicClient.readContract({
          address: STAKING_VAULT_ADDRESS,
          abi: STAKING_VAULT_ABI,
          functionName: 'totalSupply',
          args: []
        }),
        publicClient.readContract({
          address: STAKING_VAULT_ADDRESS,
          abi: STAKING_VAULT_ABI,
          functionName: 'rewardRate',
          args: []
        }),
        publicClient.readContract({
          address: STAKING_VAULT_ADDRESS,
          abi: STAKING_VAULT_ABI,
          functionName: 'rewardsDuration',
          args: []
        })
      ];

      // Only fetch user-specific data if wallet is connected
      const userDataPromises = address ? [
        publicClient.readContract({
          address: AIPG_TOKEN_ADDRESS,
          abi: ERC20_ABI,
          functionName: 'balanceOf',
          args: [address]
        }),
        publicClient.readContract({
          address: STAKING_VAULT_ADDRESS,
          abi: STAKING_VAULT_ABI,
          functionName: 'balanceOf',
          args: [address]
        }),
        publicClient.readContract({
          address: STAKING_VAULT_ADDRESS,
          abi: STAKING_VAULT_ABI,
          functionName: 'earned',
          args: [address]
        }),
        publicClient.readContract({
          address: AIPG_TOKEN_ADDRESS,
          abi: ERC20_ABI,
          functionName: 'allowance',
          args: [address, STAKING_VAULT_ADDRESS]
        })
      ] : [];

      const [totalStaked, rewardRate, rewardsDuration, ...userData] = await Promise.all([
        ...globalDataPromises,
        ...userDataPromises
      ]);

      const [tokenBalance, stakedBalance, pendingRewards, allowance] = address ? userData : [0n, 0n, 0n, 0n];

      // Calculate Weekly Percentage Yield (WPY)
      let wpy = 0;
      if (totalStaked > 0n && rewardRate > 0n) {
        const weeklyRewards = rewardRate * 604800n; // seconds in a week (7 * 24 * 60 * 60)
        wpy = (Number(weeklyRewards) / Number(totalStaked)) * 100;
      }

      setStakingData({
        tokenBalance,
        stakedBalance,
        pendingRewards,
        totalStaked,
        apy: wpy, // Keep apy key for backward compatibility but store weekly yield
        allowance
      });
    } catch (error) {
      console.error('❌ Error fetching staking data:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        data: error.data
      });
    }
  };

  useEffect(() => {
    fetchStakingData();
    const interval = setInterval(fetchStakingData, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, [address, publicClient]);

  // Approve token
  const approveToken = async (amount) => {
    if (!walletClient || !address) throw new Error('Wallet not connected');

    setIsLoading(true);
    try {
      const amountWei = parseEther(amount);
      
      const hash = await walletClient.writeContract({
        address: AIPG_TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [STAKING_VAULT_ADDRESS, amountWei],
        account: address
      });

      await publicClient.waitForTransactionReceipt({ hash });
      await fetchStakingData();
      setNeedsApproval(false);
    } catch (error) {
      console.error('Approve error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Stake tokens
  const stake = async (amount) => {
    if (!walletClient || !address) throw new Error('Wallet not connected');

    const amountWei = parseEther(amount);
    
    // Check if approval is needed and auto-approve
    if (stakingData.allowance < amountWei) {
      setNeedsApproval(true);
      setIsLoading(true);
      try {
        // Auto-approve first
        const approveHash = await walletClient.writeContract({
          address: AIPG_TOKEN_ADDRESS,
          abi: ERC20_ABI,
          functionName: 'approve',
          args: [STAKING_VAULT_ADDRESS, amountWei],
          account: address
        });
        
        await publicClient.waitForTransactionReceipt({ hash: approveHash });
        await fetchStakingData();
        setNeedsApproval(false);
      } catch (error) {
        setIsLoading(false);
        // Check if user cancelled
        if (error.message?.includes('User rejected') || 
            error.message?.includes('denied') || 
            error.message?.includes('User denied') ||
            error.code === 4001 ||
            error.code === 'ACTION_REJECTED') {
          throw new Error('Transaction cancelled');
        }
        throw new Error('Approval rejected or failed');
      }
    }

    setIsLoading(true);
    try {
      const hash = await walletClient.writeContract({
        address: STAKING_VAULT_ADDRESS,
        abi: STAKING_VAULT_ABI,
        functionName: 'stake',
        args: [amountWei],
        account: address
      });

      await publicClient.waitForTransactionReceipt({ hash });
      await fetchStakingData();
    } catch (error) {
      console.error('Stake error:', error);
      // Check if user cancelled
      if (error.message?.includes('User rejected') || 
          error.message?.includes('denied') || 
          error.message?.includes('User denied') ||
          error.code === 4001 ||
          error.code === 'ACTION_REJECTED') {
        throw new Error('Transaction cancelled');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Unstake tokens
  const unstake = async (amount) => {
    if (!walletClient || !address) throw new Error('Wallet not connected');

    setIsLoading(true);
    try {
      const amountWei = parseEther(amount);
      
      const hash = await walletClient.writeContract({
        address: STAKING_VAULT_ADDRESS,
        abi: STAKING_VAULT_ABI,
        functionName: 'withdraw',
        args: [amountWei],
        account: address
      });

      await publicClient.waitForTransactionReceipt({ hash });
      await fetchStakingData();
    } catch (error) {
      console.error('Unstake error:', error);
      // Check if user cancelled
      if (error.message?.includes('User rejected') || 
          error.message?.includes('denied') || 
          error.message?.includes('User denied') ||
          error.code === 4001 ||
          error.code === 'ACTION_REJECTED') {
        throw new Error('Transaction cancelled');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Claim rewards
  const claimRewards = async () => {
    if (!walletClient || !address) throw new Error('Wallet not connected');

    setIsLoading(true);
    try {
      const hash = await walletClient.writeContract({
        address: STAKING_VAULT_ADDRESS,
        abi: STAKING_VAULT_ABI,
        functionName: 'getReward',
        args: [],
        account: address
      });

      await publicClient.waitForTransactionReceipt({ hash });
      await fetchStakingData();
    } catch (error) {
      console.error('Claim error:', error);
      // Check if user cancelled
      if (error.message?.includes('User rejected') || 
          error.message?.includes('denied') || 
          error.message?.includes('User denied') ||
          error.code === 4001 ||
          error.code === 'ACTION_REJECTED') {
        throw new Error('Transaction cancelled');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    stakingData,
    stake,
    unstake,
    claimRewards,
    approveToken,
    isLoading,
    needsApproval
  };
}

