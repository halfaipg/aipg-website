# app — App Router routes + btc-chart API

## Purpose

The site's routes (Next.js App Router) and public API routes. `layout.js` wraps every page in
the global providers + Navbar/Footer; `page.js` is the marketing home (stacked section components
with server-visible product, worker, and API entry points).

## Ownership

- `layout.js` — root layout: metadata/OpenGraph, agent-discovery links, fonts,
  `context/Providers` wrapper, Navbar/Footer.
  Favicon sources (`app/favicon.ico`, `public/favicon.ico`, and the versioned
  metadata icon) must match the deployed aipg.chat favicon bytes. The PNG
  touch icon is the largest embedded PNG from that ICO. Bump the metadata URL
  when replacing the icon so returning browsers do not reuse the old artwork.
  `globals.css` — global styles incl. the `fadeInSection`/`visible` reveal classes used by `page.js`.
- `page.js` — home page; composes `components/` sections.
- `chat-preview/page.js` - development-only interactive scrolling demo using
  `GridChatPreview` simulated streams. Production returns notFound; no real
  inference, keys, budget changes, or verification bypass at the server.
- `api/demo/chat/route.js` - Node-only, no-cache GET/POST for the opt-in
  sponsored homepage demo. `lib/demoChat.mjs` owns validation, signed guest
  cookies, shared Redis limits, Turnstile verification, fixed Grid `auto`
  requests, and sanitized answer streaming. `DEMO_CHAT.md` is the activation
  contract. Off by default; no existing app credential may be repurposed.
  Its 60-second function duration fits the current Vercel plan; upstream work
  aborts after 45 seconds to leave room for shared-limit cleanup.
- `about/page.js` — about page. `use/page.js` — permanent redirect to the
  canonical `/docs/integrations` guide. `wallet/page.js` — AIPG token info + "add to wallet" (Base).
- `staking/page.js` — withdrawal-only staking page; renders `components/StakingInterface`.
- `run/` - worker onboarding: endpoint selection, OS, download, matching
  first-run steps. Popular engines are examples of compatible endpoints.
  OpenAI chat is required by the current text worker's registration probe;
  Anthropic Messages is an additionally probed passthrough format, not a
  standalone enrollment promise.
  The server binds exact immutable stable releases to their Git commit,
  downloaded manifest/checksum byte digests and lengths, and the complete
  platform payload with GitHub digests and sizes. From v0.3.7 the installer is
  part of that exact checksummed payload. Never replace this with guessed
  latest-release URLs.
  Explicit Windows unsigned and macOS ad-hoc/unnotarized manifest states may
  expose integrity-checked downloads with adjacent warnings. Unknown or
  contradictory signing states remain closed. macOS is Apple Silicon only.
  Keep integrity verification distinct from platform signing and supervised
  native end-to-end qualification. The strict `assessTextRelease` helper still
  reports fully signed readiness; the download surface uses the platform
  availability helper with warning metadata.
  ComfyUI image/video uses the existing bridge and supported workflows.
  Managed audio releases retain their existing signed profile, RecipeVault,
  hardware qualification, immutable payload and Windows Authenticode gates.
  Qualification binaries remain benchmark-only, no enrollment or rewards.
  Never present an audio-manager artifact as a generic ComfyUI installer.
  The optional planner uses hydration-safe OS detection shared with downloads;
  macOS defaults to Apple silicon unless the operator explicitly chooses a
  different accelerator. Browser specs do not prove model compatibility.
  Optional capacity recommendations use accepted den and missing replicas,
  never earnings forecasts. Payout scenarios remain same-window arithmetic
  on validated evidence, and the worker lookup remains an exact public
  registry match. Missing evidence cannot imply success or zero activity.
  Setup-help links stay alongside installation. Public intake must exclude
  credentials, wallet details, network addresses and private logs. Models stay
  local; worker inputs and outputs are plaintext. No private wallet key is
  entered during setup. See ../RUN_ONBOARDING.md.
- `validate/` — validator preview onboarding. It release-gates all four binaries
  and the checksum-covered installer on the presence of `SHA256SUMS` and the
  SPDX SBOM plus the live Core `shared_quorum_preview`, 3-of-5, non-economic
  capability contract with exact validator-purpose endpoint scopes. It targets
  the immutable `v0.1.0-preview.20` release and exposes its exact public GHCR
  tag for Linux x64/ARM64; GitHub artifacts alone must never
  unlock downloads.
  Its desktop onboarding uses the local operator app (Windows menu option 8)
  for consent-based dedicated-account setup and automatic start in a fresh child,
  plus explicit stop/start and acknowledged status. Promote the pinned
  download only after immutable artifacts and a first-party canary are verified;
  Core `d606e4d8` / Alembic `0042` admits preview.13 and .15-.20 with preserved
  qualification history. Preview.20 (`c73a284f`) passed native workflow
  `34736178270`, all four clean installs and exact-source downloaded artifact
  provenance. Three owned Linux nodes upgraded with configuration, identities
  and journals preserved. Fresh v2 reports at 04:48 UTC and fully empty replies
  without worker-error flags at 04:56 UTC September 13 passed independent
  signature, assignment, disclosure/response commitment and zero-economic-row
  verification. Failed worker verdicts were preserved, not treated as cheating.
  See the validator repo's `PREVIEW20_ROLLOUT.md`; public promotion grants no
  payout, independence or model-identity authority. Preview.17 passed release workflow
  `34136400434`, four native handoff/recovery and clean-install lanes, published
  payload/provenance verification, and an owned Linux upgrade with fresh signed
  evidence. The second owned Linux canary passed at 17:04:11 UTC on September 7:
  a lost accepted response left the signed report pending across .15-to-.17,
  then the same committed-record duplicate receipt drained it. Independent
  Core signature/binding and zero-economic-row checks passed; configuration
  was unchanged and the temporary proxy/watchdog were removed. This qualifies
  the pending-report service-upgrade path, not a human desktop one-click test.
  Preview promotion does not declare the paid beta
  complete: that separately requires the bounded independent-operator pilot
  and approved compensation. Neither grants penalty authority or model identity.
  Existing app users on .17+ get the verified Check for updates / Update and
  restart path beside downloads; older apps need one manual upgrade. Managed
  systemd/container updates stay external, preserving config, journal and ID.
  The linked runbook retains `enroll` and headless commands. No private keys are pasted
  into setup or handled on the marketing site. Existing-account pairing remains
  a separate, unshipped flow; never direct users to replace an existing identity.
  Recruitment links to the tracked public cohort issue for
  expressions of interest and the public cohort runbook for qualification;
  neither surface collects secrets on the marketing site. Recruitment is framed
  around the initial three-independent-operator gate instead
  of conflating registrations, machines, or the longer-term operator target.
  Its share action carries the same bounded opening, links only to `/validate`,
  and must not promise rewards, authority, or qualification.
  The Linux cohort path must show the complete headless install, enrollment,
  no-probe check, systemd persistence, and service-health sequence directly on
  the page. It pins the service helper to a reviewed immutable commit and
  verifies its SHA-256 separately from the frozen preview.20 binary; never use
  a mutable branch download, curl-to-shell, or credentials in command arguments.
  Its versioned Docker card links to the canonical first-run enrollment path,
  which runs as the host user, mounts credentials read-only after setup, and
  persists the assignment/evidence journal and existing identity across
  container recreation.
  Label the shell installer as Linux-specific, keep desktop archives separate,
  and link directly to the systemd guide. The global footer links to `/validate`
  so recruitment does not require another crowded primary-navigation item.
  Current campaign counts must match the tracked cohort issue. The page also
  renders fail-soft public cohort counts from `GET /v1/status/network`, keeps
  registration separate from reviewed operator independence, and tells stale
  preview operators to upgrade in place without replacing their node identity.
  After one public-ID lookup, the redacted post-setup verifier polls every 15
  seconds until Core confirms active registration, the frozen release, a fresh
  heartbeat, at least one assignment, and accepted authoritative evidence. It
  may retain the last valid view across transient refresh faults, but it must
  never infer success from local browser state or expose private operator data.
  Its full-bleed hero uses purpose-specific CPU/network validator hardware
  imagery so the page remains visually distinct from GPU worker onboarding.
  Keep the headline and download grid contained at 320px as well as standard
  mobile widths; grid children must be allowed to shrink around code snippets.
- `api/validator-status/[validatorId]/` — unauthenticated same-origin proxy for
  Core's redacted public validator lookup. It accepts only bounded `val_...`
  identifiers and allowlists the normalized response; no account, wallet,
  signing, operator-control, assignment, or evidence data may pass through.
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
- `api/validator-status` must fail closed on malformed IDs, upstream errors, or
  response-contract drift and must never cache one operator's live status.

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
