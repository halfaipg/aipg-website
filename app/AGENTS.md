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
- `about/page.js` — about page. `use/page.js` — permanent redirect to the
  canonical `/docs/integrations` guide. `wallet/page.js` — AIPG token info + "add to wallet" (Base).
- `staking/page.js` — withdrawal-only staking page; renders `components/StakingInterface`.
- `run/` — worker download and onboarding surface. Text-worker downloads require
  an immutable, stable `v*` release whose exact four-platform binary set, SPDX
  SBOM, release manifest, aggregate checksums, GitHub digests, and sizes agree;
  the server hashes the manifest and checksum bytes it actually downloads and
  requires those byte lengths and digests to match GitHub's immutable asset
  metadata before parsing either file; it also resolves the immutable Git tag
  to an exact commit and requires the manifest to name that same commit.
  Linux x64/ARM64 availability depends on that complete release-integrity
  contract, not on unrelated desktop identities. macOS remains hidden until
  Developer ID/notarization is verified and Windows remains hidden until
  Authenticode is verified. Mutable, unverified, and legacy releases fail
  closed per platform. Starting with `v0.3.7`, the exact payload must also
  include `install-worker.sh` in the manifest, aggregate checksums, and GitHub
  asset identities. `/run` prefers that non-executing, architecture-detecting
  installer for Linux while retaining the exact platform binary as a direct
  fallback; earlier immutable releases remain bound to their original payload.
  Media-manager downloads require a public,
  non-prerelease `manager-v*` release with both the aggregate checksum and
  machine-readable release manifest plus SPDX SBOM assets present. The server
  must verify immutable-release state, manifest profile gates, GitHub asset
  digests and sizes, and exact aggregate-checksum coverage before exposing a
  media download. Linux availability depends on those shared gates, not an
  unrelated Windows identity. Windows remains hidden until the final manager
  manifest records verified Authenticode. Its local operator planner uses
  coarse browser-only OS, accelerator model, VRAM, RAM, disk, and
  expected/measured throughput inputs to recommend a worker path. The download
  panel and planner must derive their initial OS from the same conservative
  browser-platform detector through a hydration-safe external-store snapshot,
  so a gated desktop build is never presented as available through a mismatched
  Linux recommendation and desktop detection cannot replace the server tree;
  exact capability approval remains local to signed profiles. Live opportunity rows combine
  public worker counts with 30-day job and observed-performance telemetry. The planner's
  network-priority text route ranks under-target routes by accepted 30-day den multiplied by
  missing replicas; raw request count remains display evidence, not the priority input. It is a
  supply-priority signal, not a hardware-compatibility verdict. An
  operator must never advertise that route unless the detected backend genuinely serves the
  named model.
  Its share action derives a bounded operator-opening message from that same
  normalized priority row, preserves the redundancy target, links only to
  `/run`, and explicitly refuses an earnings forecast.
  While the media release is gated, the download panel links to the public
  qualification cohort runbook. A complete `manager-qualification-v*`
  prerelease may expose a separately labelled benchmark-only binary, checksum,
  and SBOM only after the same payload-identity checks plus explicit
  no-enrollment/no-advertisement restrictions pass; it must never be presented
  as a worker release.
  The page also consumes the worker repo's versioned
  `docs/qualification-status.json` contract to show accepted evidence counts
  for the required hardware classes. Invalid or unavailable status data must
  fail soft while keeping the media release gated and linking only to the
  tracked cohort issue.
  Jobs per worker is only a historical workload-share signal; capacity risk and
  workload must remain separate and neither may be described as a hardware
  benchmark, payout forecast, or earnings promise.
  The operator evidence panel may model a user-selected share of accepted den
  against the rolling 24-hour pool returned by `GET /v1/payouts/public`; it
  must label the result as same-window arithmetic, exclude token price and GPU
  assumptions, and show nothing when evidence is invalid. Server-rendered payout
  timestamps must use an explicit UTC formatter so browser locale cannot break
  hydration. Its worker check
  matches an exact name or ID against the public `GET /v1/workers` online feed;
  a missing match is not proof of a local failure.
  The recruitment section links first to the open paid Linux text-worker cohort
  in `AIPowerGrid/grid-text-worker#10`, then to this repository's generic public
  operator-interest issue form for other hardware. The page and both GitHub
  paths must state that only coarse hardware and availability belong there;
  private setup details stay out of public GitHub issues.
  Recruitment belongs immediately after the verified download surface, before
  the long planner/evidence sections. A gated macOS or Windows selection must
  offer both a switch to the verified Linux artifact and the generic hardware
  intake; a successful text download must link to cohort setup support.
  A verified Linux text download must be followed immediately by the exact
  artifact-specific first-run commands, local wizard URL, scoped-key boundary,
  and online/public-worker verification steps. Never teach operators to place a
  Grid key or wallet secret in a shell command.
- `validate/` — validator preview onboarding. It release-gates all four binaries
  and the checksum-covered installer on the presence of `SHA256SUMS` and the
  SPDX SBOM plus the live Core `shared_quorum_preview`, 3-of-5, non-economic
  capability contract with exact validator-purpose endpoint scopes. It targets
  the immutable `v0.1.0-preview.13` release and exposes its exact public GHCR
  tag for Linux x64/ARM64; GitHub artifacts alone must never
  unlock downloads.
  Its desktop onboarding uses the local operator app (Windows menu option 8)
  for consent-based dedicated-account setup, start/stop, and acknowledged status.
  The linked runbook retains `enroll` and headless commands. No private keys are pasted
  into setup or handled on the marketing site. Existing-account pairing remains
  a separate, unshipped flow; never direct users to replace an existing identity.
  Recruitment links to the tracked public cohort issue for
  expressions of interest and the public cohort runbook for qualification;
  neither surface collects secrets on the marketing site. The page also
  renders fail-soft public cohort counts from `GET /v1/status/network`, keeps
  registration separate from reviewed operator independence, and tells stale
  preview operators to upgrade in place without replacing their node identity.
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

- `npm run test:unit` for worker release-policy contracts.
- `npm run build` for the production route and server-side release fetches.

## Child DOX Index

- None — leaf.
