# Website Tests

## Purpose

Unit and Playwright smoke coverage for production-built marketing, worker
onboarding, and staking-withdrawal surfaces.

## Ownership

- `e2e/staking.spec.ts` - page mount, withdrawal UI, and browser-error checks.
- `e2e/run.spec.ts` - release-gated worker and validator onboarding plus the
  public network-status surface, local hardware-path recommendation, telemetry
  disclaimers, trust-boundary copy, browser-error, and horizontal-overflow
  checks.
- `unit/validator-release-gate.test.mjs` - pure release and capability-contract
  tests that require an immutable, source-bound, platform-signed preview and
  prevent GitHub artifacts from unlocking downloads against an old,
  weak-quorum, unscoped, or economically authoritative Core.
- `unit/text-release-gate.test.mjs` - exact immutable text-worker release,
  checksum, manifest, SBOM, GitHub digest, and size contract.
- `unit/release-contract-download.test.mjs` - downloaded manifest/checksum byte
  hashing, bounded metadata sizes, resolved Git-tag commit lookup, length
  binding, strict UTF-8 parsing, and tamper rejection.

## Local Contracts

- Tests must never sign or broadcast a real transaction, use private keys, or
  depend on a funded wallet.
- Fail on uncaught page errors and unexpected console errors, not only HTTP 200.
- Cover disconnected and read-only states; wallet-provider mocks stay explicit.
- Navigate to `domcontentloaded` and then assert route-specific readiness.
  Wallet providers maintain background traffic, so global `networkidle` is not
  a stable application-ready signal and must not gate these parallel smokes.

## Work Guidance

- Add a route smoke when a new first-viewport or wallet product surface lands.
- Prefer semantic locators and user-visible outcomes over implementation details.

## Verification

- Run `npm run test:e2e`; it builds and serves the production app.
- Run `npm run test:unit` for capability and release-policy logic.
- Review screenshots/traces on failures before updating expectations.

## Child DOX Index

No child guides are currently required; this file owns `tests/`.
