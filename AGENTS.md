# DOX framework

- DOX is a hierarchy of AGENTS.md files that carry the durable contracts for this repo.
- Agents must follow the DOX chain on every edit.

## Core Contract

- AGENTS.md files are binding work contracts for their subtrees.
- Any work product must stay understandable from the nearest AGENTS.md plus every parent above it.

## Read Before Editing

1. Read this root AGENTS.md.
2. Identify every path you expect to touch.
3. Walk from repo root to each target, reading every AGENTS.md on the way.
4. The nearest AGENTS.md is the local contract; parents hold repo-wide rules.
5. If docs conflict, the closer doc controls local detail, but no child may weaken DOX.

Do not rely on memory — re-read the applicable chain in-session before editing.

## Update After Editing

Every meaningful change requires a DOX pass before the task is done. Update the closest
owning AGENTS.md when a change affects: purpose/scope/ownership; durable structure,
contracts, or workflows; inputs/outputs/permissions/side-effects; or the Child DOX Index.
Remove stale text immediately. Refresh affected parent and child indexes.

## Style

Concise, current, operational. Stable contracts, not diary entries. Broad rules in parents,
concrete detail in children. Delete stale notes instead of explaining history.

---

# aipg-website — the AI Power Grid marketing site

## Purpose

The public marketing site for AI Power Grid (aipowergrid.io): explains the network, links to
docs, and hosts the wallet-connected on-chain UI (token info + staking withdrawal). Next.js 15
App Router + Tailwind, with RainbowKit/wagmi/viem for Base-mainnet wallet interaction. Deployed
on Vercel.

## Ownership

- **`app/`** — App Router routes (home, `/about`, `/staking`, `/wallet`) plus one API route
  (`/api/btc-chart`). Owned in its own AGENTS.md.
- **`components/`** — page sections and the web3 staking UI. Owned in its own AGENTS.md.
- **`lib/`** — web3 config + on-chain contract addresses/ABIs (Base). Owned in its own AGENTS.md.
- **`hooks/useStaking.js`** — the single staking read/write hook (wagmi/viem); reads contracts
  from `lib/`. Couples `lib/` to `components/StakingInterface.jsx`.
- **`context/Providers.js`** — global client providers (Wagmi → React Query → RainbowKit →
  next-themes); wraps the whole tree in `app/layout.js`.
- **`tests/e2e/`** — Playwright smoke tests (config `playwright.config.ts`).
- **`public/`** — static assets (images, logos). **`*.csv`** at root are BTC price history read
  by the btc-chart API route. **Not** DOX boundaries.

## Local Contracts

- **Inherit org engineering standards:** `aipg-documentation/engineering-standards/`
  (core + git + the matching language file).
- This is primarily a marketing site, but `/staking` is a real withdrawal product surface. No
  private keys, secrets, or local server state belong here. The only application backend route
  is btc-chart (public CoinGecko + bundled CSV); wallet writes go directly to reviewed Base
  contracts through wagmi/viem.
- **Chain = Base mainnet only** (`wagmi/chains` `base`, id 8453). On-chain addresses live ONLY in
  `lib/stakingContracts.js` — never hardcode contract addresses in components/pages.
- **Staking is withdrawal-only.** The staking program has wound down; the UI must not offer new
  stakes. Keep stake/approve paths out of rendered flows even though the hook still exports them.
- Security headers (CSP, HSTS, etc.) are defined in `next.config.js` `headers()` — any new
  external script/media origin must be added to the CSP there or it will be blocked in prod.
- `/docs` and `/docs/*` are Vercel rewrites to the separate aipg-documentation deployment
  (`vercel.json`) — not routes in this repo.

## Work Guidance

- Most pages/components are `"use client"` (wallet + framer-motion + scroll observers). Keep server
  components server-only; do not import client-only libs into them.
- Public env vars must be `NEXT_PUBLIC_*` (see `wagmiConfig.js` WalletConnect projectId).
- A blank-screen crash from an undefined reference passes `next build` but fails on real `next start`
  — add/keep a Playwright smoke assertion when touching a page's mount path.

## Verification

- `npm run build` must succeed.
- `npm run lint` (Next.js lint).
- `npm run test:e2e` — Playwright smoke (builds + serves prod, loads `/` and `/staking`, fails on
  any non-wallet console/page error).

## Child DOX Index

- [app/AGENTS.md](app/AGENTS.md) — App Router routes + the btc-chart API route.
- [components/AGENTS.md](components/AGENTS.md) — page sections + web3 staking UI.
- [lib/AGENTS.md](lib/AGENTS.md) — wagmi config + on-chain contract addresses/ABIs.
- [tests/AGENTS.md](tests/AGENTS.md) — Playwright production-build smoke tests.
