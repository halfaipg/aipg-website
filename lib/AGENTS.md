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
- `demoChatPolicy.mjs` - public shared limits: 15 guest turns/day, 30 IP turns/day,
  29 alternating messages, 48 KB UTF-8 context. The browser recycles whole oldest
  exchanges only when bounds require it; server validation independently rejects
  oversized/non-alternating context. No secrets or server imports in this module.
- `demoChat.mjs` - server-only homepage demo configuration, signed day cookies,
  trusted client-IP normalization, atomic shared limits, bot verification,
  bounded Grid requests and sanitized streaming. Imported only by
  the API route and tests, never a client component. Core ceilings and live
  activation are mandatory prerequisites in `DEMO_CHAT.md`.
  Auto dispatch requires Core's version-1 authenticated `service_budget` with
  `all_models_charged=true` and positive request/day caps no larger than the
  website's exposure reservations. Both `on` and scoped `allowlist` are accepted;
  account-only eligibility never proves resolved models enforce budgets.
  Never widen global charging to satisfy the demo activation gate.
  Prefer Vercel's managed `DEMO_KV_REST_API_URL`/`DEMO_KV_REST_API_TOKEN`
  pair. Reject incomplete managed pairs; never substitute TCP or read-only
  credentials. Manual REST configuration is only used when neither managed
  variable exists.
  Stream metadata is a strict allowlist of public worker name, generation time,
  first-token time, decode speed, and bounded completion tokens. It reaches the
  browser only with a successful terminal frame; internal routing/IDs never do.
  Request JSON is capped at 320 KB to allow JSON escaping of bounded text;
  decoded context remains capped at 48 KB. Other JSON reads retain a 16 KB cap.
  Existing Redis counters are preserved across allowance increases; guest/IP
  remaining values reflect the smaller allowance. Spending and concurrency caps
  are independent of the turn count and must not be widened implicitly.
- `demoImagePolicy.mjs` - public-safe structured `generate_image(prompt)` schema,
  strict Z-Image Turbo/Klein allowlist, canonical Grid raster-URL validation,
  and atomic image reservations. Images are off unless `DEMO_IMAGES_ENABLED=1`.
  One completed tool call may dispatch one 1024px image, with no retries or model
  fallback. Reserve a second full per-operation exposure from the SAME daily
  budget under the existing owned lease; cap images at two/guest and four/IP/day.
  Text-generated Markdown or prose never triggers generation. Browser-supplied
  tool calls, models and generation settings remain forbidden. Only sanitized
  Core-returned image URLs reach clients. Verify real auto tool selection and
  the selected image model before public activation; see `DEMO_CHAT.md`.

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
