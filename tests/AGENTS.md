# Website Tests

## Purpose

Unit and Playwright smoke coverage for production-built marketing, worker
onboarding, and staking-withdrawal surfaces.

## Ownership

- `e2e/staking.spec.ts` - page mount, withdrawal UI, and browser-error checks.
- `e2e/run.spec.ts` - release-gated worker and validator onboarding, including
  the preview.13 operator app, consent-based setup, Windows menu option 8,
  explicit exit behavior, and exact versioned downloads without personal
  private-key entry or Console key juggling, plus the
  public network-status surface, local hardware-path recommendation, telemetry
  disclaimers, trust-boundary copy, browser-error, and horizontal-overflow
  checks, including validator onboarding at 320px and 390px widths.
- `unit/validator-release-gate.test.mjs` - pure capability-contract tests that
  prevent GitHub artifacts from unlocking validator downloads against an old,
  weak-quorum, unscoped, or economically authoritative Core.
- `unit/text-release-gate.test.mjs` - exact immutable text-worker release,
  checksum, manifest, SBOM, GitHub digest, and size contract.
- `unit/release-contract-download.test.mjs` - downloaded manifest/checksum byte
  hashing, length binding, strict UTF-8 parsing, and tamper rejection.
- `unit/marketing-claims.test.mjs` - static release-policy guard preventing
  gated media, confidential inference, universal hardware support, autonomous
  Core, blanket open-source, permanent-free, permissionless-Core, and live
  multi-asset/worker-claim payout claims from being marketed as current.

## Local Contracts

- Tests must never sign or broadcast a real transaction, use private keys, or
  depend on a funded wallet.
- Fail on uncaught page errors and unexpected console errors, not only HTTP 200.
- Cover disconnected and read-only states; wallet-provider mocks stay explicit.
- Prefer route-specific readiness assertions over global network idleness for
  pages that keep wallet-provider background connections open.

## Work Guidance

- Add a route smoke when a new first-viewport or wallet product surface lands.
- Prefer semantic locators and user-visible outcomes over implementation details.

## Verification

- Run `npm run test:e2e`; it builds and serves the production app.
- Run `npm run test:unit` for capability and release-policy logic.
- Review screenshots/traces on failures before updating expectations.

## Child DOX Index

No child guides are currently required; this file owns `tests/`.
