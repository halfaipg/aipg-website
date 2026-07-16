# app — App Router routes + btc-chart API

## Purpose

The site's routes (Next.js App Router) and the single API route. `layout.js` wraps every page in
the global providers + Navbar/Footer; `page.js` is the marketing home (stacked section components
with a scroll-reveal IntersectionObserver).

## Ownership

- `layout.js` — root layout: metadata/OpenGraph, agent-discovery links, fonts,
  `context/Providers` wrapper, Navbar/Footer.
  `globals.css` — global styles incl. the `fadeInSection`/`visible` reveal classes used by `page.js`.
- `page.js` — home page; composes `components/` sections.
- `about/page.js` — about page. `wallet/page.js` — AIPG token info + "add to wallet" (Base).
- `staking/page.js` — withdrawal-only staking page; renders `components/StakingInterface`.
- `run/` — worker-manager download and onboarding surface. It enables downloads
  only from a public, non-prerelease `manager-v*` GitHub release with both the
  aggregate checksum and signed release manifest assets present.
- `api/btc-chart/route.js` — GET endpoint merging bundled CSV history with live CoinGecko daily
  prices into OHLC; feeds `components/BTCChart`.
- `strategic-reserve/AutonomousFundPageArchive.js` — archived page component, not a live route
  (no `page.js`); kept for reference only.

## Local Contracts

- Pages that touch the wallet/animation are `"use client"`. Keep route metadata/`revalidate` in the
  server-rendered `layout.js`.
- `staking/page.js` is **withdrawal-only** — no stake/approve UI (see root contract).
- `api/btc-chart` must degrade gracefully: if CoinGecko fails, still return CSV history; never throw
  past the structured `{ error }` 500. CSV is read from `process.cwd()` (repo-root `*.csv`).

## Work Guidance

- New section on the home page → add the component under `components/`, import here, and (if it
  should reveal on scroll) wrap it in a `fadeInSection` ref like the existing sections.
- New external script/media origin used by a page must be added to the CSP in `next.config.js`.
- `/run` may recommend an OS in the browser, but only the downloaded manager may
  decide hardware compatibility or unlock a worker capability.

## Verification

—

## Child DOX Index

- None — leaf.
