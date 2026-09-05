# components — page sections + web3 staking UI

## Purpose

Reusable React components: the marketing page sections composed by `app/page.js`, the chrome
(Navbar/Footer/TopBar), and the wallet-connected staking UI.

## Ownership

- **Marketing sections:** `Hero`, `GridStatement`, `Products`, `CryptoNativeLayer`, `Problem`,
  `RunNode`, `Infrastructure`, `Features`, `Services`, `Timeline`, `Stats`, `Team`, `FAQ`,
  `Ticker`, `Modal` (+ co-located `*.css`).
- **Chrome:** `Navbar.js`, `Footer.js`, `TopBar.js` (TopBar currently commented out in layout),
  `VoiceAgentWidget.js`.
- **Charts:** `BTCChart.js` — lightweight-charts client consuming `/api/btc-chart`.
- **Staking UI:** `StakingInterface.jsx` — withdrawal-only staking surface. Uses RainbowKit
  `ConnectButton` + the `useStaking` hook (`hooks/useStaking.js`); renders withdraw + claim only.
- **`ui/`** — shadcn-style primitives (`label`, `switch`, `navigation-menu`). Generated from
  `components.json`; treat as a low-churn primitives layer.

## Local Contracts

- The homepage composes `Hero`, `GridChat`, `Products`, and `GridParticipation`: direct
  product use, existing-backend worker onboarding, developer integration, and
  current trust boundaries. Older long-form sections stay in source rather
  than being stacked into the acquisition page.
- The primary consumer hero action is `Try the Grid`, anchored to inline chat.
  Music and chat have direct product links. The gallery screenshot is a
  labelled preview, not proof of a fresh generation, benchmark, or cost.
- Homepage content is visible on server render without scroll-triggered or
  timed reveals. User, worker, and builder actions must fit in standard mobile
  and desktop first viewports. Navigation collapses before its links crowd.
- Preserve the logo-led, centered black/orange homepage identity. No server-rack
  hero or hosting-provider treatment. Worker/user clarity must not erase the
  established brand. `GridChat` uses only the same-origin bounded demo route,
  with an explicit unavailable state until server configuration is ready.
  Never fabricate streamed answers or expose the dedicated service credential.
  Images/video/music remain adjacent product options. No prompts in telemetry
  or browser persistence; clear transcript never resets server allowance.
  Gallery browser-window chrome is decorative around a real public screenshot.
  The chat starts as a compact composer, not an empty transcript panel; the
  conversation expands only after a submission. Completed replies retain their
  own model and Core-reported public worker/timing/usage details. Missing fields
  stay absent, and metadata must never be described as independently verified
  hardware, cryptographic provenance, or a benchmark. Display at most one
  decimal place for timing/throughput, with wrapping for long public names.

- Components using wallet/hooks/framer-motion/scroll must be `"use client"`.
- `StakingInterface.jsx` must NOT expose stake/approve actions (program wound down) even though
  `useStaking` still exports `stake`/`approveToken`. On-chain reads/writes go through `useStaking`
  only — never call contracts directly from a component.
- Contract addresses/ABIs come from `lib/stakingContracts.js`; do not hardcode them here.
- `RunNode` must distinguish live paid workers from the validator preview:
  validators are CPU-only evidence nodes with no stake, rewards, slashing, or
  routing authority until real probe-group quorum ships. Current validator
  setup creates a dedicated local signing identity and does not require a
  funded wallet, wallet extension, or account login.
- The highlighted desktop navigation action points to the live `/run` operator
  funnel. The ended staking program remains reachable as an explicitly labelled
  legacy-withdrawal link in the footer, never as an earning opportunity.
- The footer links directly to `/validate` as the durable validator-recruitment
  entry point; do not crowd the primary navbar with a duplicate validator item.
- Builder-facing hero, navigation, API-card, and footer actions converge on
  `/use`, the short redirect to the canonical 60-second integration guide.
- Marketing copy must distinguish the live text-worker download from the
  release-gated managed media installer. Do not claim universal GPU support,
  guaranteed earnings, confidential inference, autonomous Core operation, or
  shutdown resistance as present-tense production capabilities.
- Describe the open-source surface specifically (contracts, SDKs, worker and
  validator clients, models, workflow/protocol specifications). Do not claim
  every operational component or deployment is public.
- Daily access, paid credits, and worker rewards must be described as current
  account/payout policy, not permanent guarantees or automatic earmarking.
  Multi-asset and worker-claim payout rails remain explicitly planned.
- Metadata and embedded assistant prompts are marketing surfaces and inherit
  the same capability, privacy, payment, and decentralization boundaries.

## Work Guidance

- New marketing section → default-export a component, then wire it into `app/page.js`.
- Wallet errors: swallow user-rejection (code 4001 / "User rejected") quietly; surface real errors.

## Verification

- Run `npm run build` for component changes.
- Run `npm run test:e2e` for page composition, mount-path, or staking changes.
- Manually verify wallet-disconnected, wrong-network, pending, rejection, and
  transaction-error states for `StakingInterface.jsx` changes.

## Child DOX Index

- None — leaf (`ui/` is generated primitives, not a DOX boundary).
