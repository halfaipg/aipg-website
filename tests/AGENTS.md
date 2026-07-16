# Website Tests

## Purpose

Playwright smoke coverage for production-built marketing, worker onboarding,
and staking-withdrawal surfaces.

## Ownership

- `e2e/staking.spec.ts` - page mount, withdrawal UI, and browser-error checks.
- `e2e/run.spec.ts` - release-gated worker download surface, browser-error, and
  horizontal-overflow checks.

## Local Contracts

- Tests must never sign or broadcast a real transaction, use private keys, or
  depend on a funded wallet.
- Fail on uncaught page errors and unexpected console errors, not only HTTP 200.
- Cover disconnected and read-only states; wallet-provider mocks stay explicit.

## Work Guidance

- Add a route smoke when a new first-viewport or wallet product surface lands.
- Prefer semantic locators and user-visible outcomes over implementation details.

## Verification

- Run `npm run test:e2e`; it builds and serves the production app.
- Review screenshots/traces on failures before updating expectations.

## Child DOX Index

No child guides are currently required; this file owns `tests/`.
