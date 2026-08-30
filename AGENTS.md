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

- **`app/`** — App Router routes (home, `/about`, `/run`, `/validate`, `/status`,
  `/staking`, `/wallet`) plus one API route
  (`/api/btc-chart`). Owned in its own AGENTS.md.
- **`components/`** — page sections and the web3 staking UI. Owned in its own AGENTS.md.
- **`lib/`** — web3 config + on-chain contract addresses/ABIs (Base). Owned in its own AGENTS.md.
- **`hooks/useStaking.js`** — the single staking read/write hook (wagmi/viem); reads contracts
  from `lib/`. Couples `lib/` to `components/StakingInterface.jsx`.
- **`context/Providers.js`** — global client providers (Wagmi → React Query → RainbowKit →
  next-themes); wraps the whole tree in `app/layout.js`.
- **`tests/e2e/`** — Playwright smoke tests (config `playwright.config.ts`).
- **`.github/workflows/`, `.gitleaks.toml`, `.gitleaksignore`** — CI and secret-release
  gates. Gitleaks scans the tracked tree and complete reachable Git history;
  reviewed historical findings are acknowledged only by exact fingerprints.
- **`public/`** — static assets (images, logos) plus `llms.txt`, the curated machine-readable
  entry point for agents. **`*.csv`** at root are BTC price history read by the btc-chart API
  route. **Not** DOX boundaries.
- **`scripts/weekly-proof.mjs`** — fail-closed public-evidence collector that
  generates a five-post weekly thread draft, including immutable worker-release
  and exact npm-package/version evidence plus one matching, recent seven-day
  npm download window labelled as registry requests rather than unique users;
  exact LiteLLM/Dify/Vercel AI SDK/ElizaOS/
  LangChain upstream PR identity and state, plus the profile-bound media
  qualification needs. Omission or identity drift in any required upstream
  submission fails closed; the scheduled workflow opens one review issue and
  never posts to social accounts automatically.
- **`OPERATOR_OUTREACH.md`** — review-first worker and validator recruitment
  playbook. It defines channel boundaries, evidence requirements, approved
  claims, reusable drafts, and outcome metrics; it never authorizes automated
  posting or earnings promises.

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
- `/run` verifies the complete immutable text-worker release envelope before
  exposing any artifact. Linux x64/ARM64 may download from a provenance- and
  checksum-verified release without depending on unrelated desktop signing;
  `v0.3.7+` additionally requires and prefers the release-stamped,
  checksum-covered Linux installer while preserving direct binary access;
  macOS remains hidden until Developer ID notarization is verified and Windows
  remains hidden until Authenticode is verified.
  Media-manager availability follows the same platform-scoped rule after its
  signed profile, hardware qualification, RecipeVault, immutable payload,
  SBOM, provenance, and supervised-staging gates pass: Linux may open while
  Windows remains hidden until Authenticode is verified.
  It also exposes a fail-closed rolling payout scenario and an exact public
  worker-registry check; neither may turn hardware, job counts, or token price
  into an earnings promise.
  The open paid Linux text-worker cohort is tracked in
  `AIPowerGrid/grid-text-worker#10`; `/run` links to it as the primary operator
  action while the generic operator-interest handoff remains owned by
  `.github/ISSUE_TEMPLATE/operator-interest.yml`. Both public paths collect
  coarse hardware, region, and availability only and must reject credentials,
  wallet details, network addresses, private logs, and account identifiers.
- Agent discovery is intentionally thin: `/llms.txt` links to the canonical docs and
  `/.well-known/skills/grid/SKILL.md` redirects to the `grid-skill` repository. Do not copy the
  skill body into this repo; one canonical copy prevents endpoint and authentication drift.

## Work Guidance

- Most pages/components are `"use client"` (wallet + framer-motion + scroll observers). Keep server
  components server-only; do not import client-only libs into them.
- Public env vars must be `NEXT_PUBLIC_*` (see `wagmiConfig.js` WalletConnect projectId).
- A blank-screen crash from an undefined reference passes `next build` but fails on real `next start`
  — add/keep a Playwright smoke assertion when touching a page's mount path.

## Verification

- `npm run build` must succeed.
- `npm run lint` (Next.js lint).
- `npm run test:unit` — deterministic release-policy checks. `prebuild` runs
  this suite automatically so Vercel cannot bypass the validator release gate.
- `npm audit` must report zero known vulnerabilities before deploy.
- `npm run test:e2e` — Playwright smoke (builds + serves prod, loads `/` and `/staking`, fails on
  any non-wallet console/page error).
- Copy `git ls-files --cached --others --exclude-standard` to a temporary directory and run
  `gitleaks detect --source <temp> --no-git --config "$PWD/.gitleaks.toml"
  --gitleaks-ignore-path "$PWD" --redact --verbose` — scan tracked and untracked source without
  ignored build caches.
- `gitleaks git . --log-opts=HEAD --config .gitleaks.toml --redact --verbose` — scan complete
  reachable history against exact reviewed fingerprints. The CI gate also
  proves that a committed synthetic EVM key is rejected even when labelled as
  an example.

## Child DOX Index

- [app/AGENTS.md](app/AGENTS.md) — App Router routes + the btc-chart API route.
- [components/AGENTS.md](components/AGENTS.md) — page sections + web3 staking UI.
- [lib/AGENTS.md](lib/AGENTS.md) — wagmi config + on-chain contract addresses/ABIs.
- [tests/AGENTS.md](tests/AGENTS.md) — Playwright production-build smoke tests.
