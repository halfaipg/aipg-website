# components — page sections + web3 staking UI

## Purpose

Reusable React components: the marketing page sections composed by `app/page.js`, the chrome
(Navbar/Footer/TopBar), and the wallet-connected staking UI.

## Ownership

- **Marketing sections:** `Hero`, `Problem`, `Products`, `RunNode`, `Infrastructure`, `Features`,
  `Services`, `Timeline`, `Stats`, `Team`, `FAQ`, `Ticker`, `Modal` (+ co-located `*.css`).
- **Chrome:** `Navbar.js`, `Footer.js`, `TopBar.js` (TopBar currently commented out in layout),
  `VoiceAgentWidget.js`.
- **Charts:** `BTCChart.js` — lightweight-charts client consuming `/api/btc-chart`.
- **Staking UI:** `StakingInterface.jsx` — withdrawal-only staking surface. Uses RainbowKit
  `ConnectButton` + the `useStaking` hook (`hooks/useStaking.js`); renders withdraw + claim only.
- **`ui/`** — shadcn-style primitives (`label`, `switch`, `navigation-menu`). Generated from
  `components.json`; treat as a low-churn primitives layer.

## Local Contracts

- Components using wallet/hooks/framer-motion/scroll must be `"use client"`.
- `StakingInterface.jsx` must NOT expose stake/approve actions (program wound down) even though
  `useStaking` still exports `stake`/`approveToken`. On-chain reads/writes go through `useStaking`
  only — never call contracts directly from a component.
- Contract addresses/ABIs come from `lib/stakingContracts.js`; do not hardcode them here.

## Work Guidance

- New marketing section → default-export a component, then wire it into `app/page.js`.
- Wallet errors: swallow user-rejection (code 4001 / "User rejected") quietly; surface real errors.

## Verification

—

## Child DOX Index

- None — leaf (`ui/` is generated primitives, not a DOX boundary).
