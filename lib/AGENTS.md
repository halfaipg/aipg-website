# lib — web3 config + on-chain contract definitions

## Purpose

The on-chain integration layer: wagmi/RainbowKit config and the canonical Base-mainnet contract
addresses + ABIs the staking UI talks to. This is the single source of truth for what addresses
the site reads/writes.

## Ownership

- `wagmiConfig.js` — wagmi `createConfig`: connectors (injected/MetaMask/Coinbase/Rainbow/
  WalletConnect), `chains: [base]`, http transport, `ssr: true`. WalletConnect projectId from
  `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`. Consumed by `context/Providers.js`.
- `stakingContracts.js` — `STAKING_VAULT_ADDRESS`, `AIPG_TOKEN_ADDRESS` (Base mainnet) + minimal
  `ERC20_ABI` and `STAKING_VAULT_ABI`. Consumed by `hooks/useStaking.js`.
- `utils.js` — `cn()` Tailwind class-merge helper.

## Local Contracts

- **Single source of on-chain addresses.** All staking/token addresses live here; nothing else may
  hardcode them. Changing an address here repoints the whole staking UI.
- ABIs are intentionally minimal (only the functions the UI calls) — extend in place when the UI
  needs a new method; do not pull a full artifact ABI.
- Base mainnet only. Adding a chain means editing `wagmiConfig.js` `chains`/`transports` here.

## Work Guidance

—

## Verification

—

## Child DOX Index

- None — leaf.
