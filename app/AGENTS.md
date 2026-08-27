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
- `run/` — worker download and onboarding surface. It exposes the current text
  worker release independently, while media-manager downloads require a public,
  non-prerelease `manager-v*` release with both the aggregate checksum and
  signed release manifest plus SPDX SBOM assets present. Its local operator
  planner uses coarse browser-only OS, accelerator model, VRAM, RAM, disk, and
  expected/measured throughput inputs to recommend a worker path;
  exact capability approval remains local to signed profiles. Live opportunity rows combine
  public worker counts with 30-day job and observed-performance telemetry.
  While the media release is gated, the download panel links to the public
  qualification cohort runbook so suitable GPU owners can contribute only
  privacy-safe evidence.
  Jobs per worker is only a historical workload-share signal; capacity risk and
  workload must remain separate and neither may be described as a hardware
  benchmark, payout forecast, or earnings promise.
- `validate/` — validator preview onboarding. It release-gates all four binaries
  and the checksum-covered installer on the presence of `SHA256SUMS` and the
  SPDX SBOM plus the live Core `shared_quorum_preview`, 3-of-5, non-economic
  capability contract with exact validator-purpose endpoint scopes. It targets
  the immutable `v0.1.0-preview.12` release and exposes its exact public GHCR
  tag for Linux x64/ARM64; GitHub artifacts alone must never
  unlock downloads.
  Its desktop onboarding uses the local operator app (Windows menu option 8)
  for consent-based dedicated-account setup, start/stop, and acknowledged status.
  The linked runbook retains `enroll` and headless commands. No private keys are pasted
  into setup or handled on the marketing site. Existing-account pairing remains
  a separate, unshipped flow; never direct users to replace an existing identity.
  Recruitment links to the tracked public cohort issue for
  expressions of interest and the public cohort runbook for qualification;
  neither surface collects secrets on the marketing site.
  Keep the headline and download grid contained at 320px as well as standard
  mobile widths; grid children must be allowed to shrink around code snippets.
- `status/` — public, read-only network posture. It renders Core's privacy-safe
  `aipg.network.status.v1` contract and distinguishes current incidents from
  non-outage decentralization advisories; an unavailable feed must not be
  presented as proof that generation is offline.
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
