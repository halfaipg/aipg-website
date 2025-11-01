'use client';

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  rainbowWallet,
  injectedWallet,
} from '@rainbow-me/rainbowkit/wallets';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Popular',
      wallets: [
        injectedWallet, // Auto-detects ALL installed wallets (MetaMask, Coinbase, etc.)
        metaMaskWallet,
        coinbaseWallet,
        rainbowWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: 'AIPG Staking',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'c5c31afe428becb9a80167e07ebb235e',
  }
);

export const wagmiConfig = createConfig({
  connectors,
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});

