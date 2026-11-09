# Wallet Dependency Qualification

## Status

Deployed through [PR #86](https://github.com/halfaipg/aipg-website/pull/86)
on 2026-11-09 for
[security remediation #85](https://github.com/halfaipg/aipg-website/issues/85).
The maintainer explicitly approved the tested compatibility patches and their
ongoing maintenance. Wallet choices, Base chain, contract addresses, staking
hooks and withdrawal-only behavior are unchanged.

## Decision

Use Node 22, Next 15.5.29, sharp 0.35.5 and compatible transitive security
updates. Do not use `npm audit fix --force` or suppress advisories.

The remaining wallet advisory is
[GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5).
Zod 3 has no patched release. Upgrading Coinbase or Reown alone does not fix
their Zod 3 dependency; upstream tracks this in
[Coinbase #863](https://github.com/coinbase/cdp-sdk/issues/863) and
[Reown #5828](https://github.com/reown-com/appkit/issues/5828).
As checked on 2026-11-09, the proposed fixes
[Coinbase #867](https://github.com/coinbase/cdp-sdk/pull/867) and
[Reown #5830](https://github.com/reown-com/appkit/pull/5830) remain unmerged;
the official latest npm releases still require Zod 3. Do not replace the
runtime ports with an unreviewed dependency-range-only override.

The deployed graph uses native Zod 4.6.7, not its unpatched `zod/v3` subpath.
Two version-bound `patch-package` patches explicitly port the runtime:

- Coinbase CDP 1.51.2: supply the string key schema for the EIP-712 types
  record in source, ESM and CommonJS; align dependency metadata.
- Reown AppKit Wallet 1.8.19: explicitly preserve three formerly optional
  `any` fields. Keep all other event validation intact.
- Resolve abitype to 1.2.3, already used by viem, whose native schemas accept
  Zod 4. Porto already consumes native Zod 4 and needs no source patch.

This is an application-local runtime port, not an upstream-supported SDK
release. The SDKs' generated declarations still contain Zod 3 types. This
JavaScript site does not consume those declaration contracts, but the patches
must not be reused in a TypeScript SDK or published as generally compatible.
Reassess this decision before converting the wallet surface to TypeScript.

## Evidence And Limits

`scripts/capture-wallet-schema-baseline.mjs` captured 1,299 synthetic cases
across 176 original SDK schemas. The checked-in fixture records original
package versions and source SHA-256 hashes. The capture script refuses a
migrated dependency graph. Never regenerate the baseline to accept a change.

Unit checks replay accepted/rejected inputs and parsed output, exercise
nonempty EIP-712 records in ESM/CommonJS, reject malformed addresses/events,
and prove an oversized constrained array is rejected before element visits.
This is bounded regression coverage, not exhaustive protocol equivalence.

`scripts/compare-wallet-schema-contracts.mjs` independently mutates up to 20
nested paths in each valid baseline example and compares the original and
candidate parsers. It checks acceptance, parsed output and thrown-error class,
not human-readable validation messages or Zod's internal error layout.
It refuses originals whose source hashes or Zod versions do not match the
recorded baseline. To reproduce in an isolated scratch directory:

```sh
original="$(mktemp -d)"
npm install --prefix "$original" --ignore-scripts --no-audit --no-fund \
  @coinbase/cdp-sdk@1.51.2 @reown/appkit-wallet@1.8.19
node scripts/compare-wallet-schema-contracts.mjs "$original"
```

Use no credentials or real wallet data. This command installs known-vulnerable
original validators only for offline comparison; never run it in production or
use that scratch dependency graph to build/deploy the website.

The browser qualification uses actual RainbowKit/wagmi with a clearly labelled
synthetic injected wallet and mocked public RPC reads. It must verify the
existing wallet choices, connect, reload without a prompt, disconnect, and a
second reload without reconnection. No signing or send method is supported.
It is not a real Coinbase popup, mobile pairing, hardware-wallet signature or
transaction test. Report these untested paths explicitly in the release review.

## Local Qualification, 2026-11-09

- Clean Node 22 installation: both version-bound patches applied; dependency
  tree valid, all installed Zod copies resolve to 4.6.7 and abitype to 1.2.3.
- Dependency audit: zero known vulnerabilities at every severity.
- Unit suite: 125 passed, including real isolated Redis concurrency checks
  and the 1,299-case wallet fixture replay.
- Independent nested-field comparison: 16,920 variations, including 1,374
  accepted by the original parsers, with zero acceptance/output differences.
  Coverage by module: frame 8,784; EVM 4,932; Solana 2,664; policy 540.
- Production build and browser suite: 53 passed, including read-only wallet
  connect/reload/disconnect/reload at 390px and 1280px. Screenshots inspected.
- Lint: exit 0, with 11 existing warnings. Build retains the existing MetaMask
  optional React Native storage-module warning; this is not native/mobile SDK
  qualification.
- Secret scans: source export clean; reachable history clean before this
  candidate commit. Run the history scan again after committing.
- Docs boundary regression: the test rejected the old RSC-prefetch link;
  normal document navigation passes without changing the destination.

The pre-release production site's wallet lifecycle reached its final assertion,
but background `/use` prefetch loaded docs chunks from the wrong namespace and
returned 404s. That run was not clean; the deployed navbar fix passed the public
browser recheck below. No wallet transactions, signatures, paid inference or
Core/worker changes were performed.

## Production Qualification, 2026-11-09

- Reviewed source: `245c5ca5c1bb11010904041541cb57316a725cb5`; merged main:
  `62bc2984cb829cbe913a601d0096cf1c0f414653`, with an identical Git tree.
- Initial production artifact: `dpl_Q4Woe6QH4xRRdRrnADV3XcJNnjpF`, Node 22.
  This identifies the security rollout, not later documentation-only rebuilds.
- [Required CI](https://github.com/halfaipg/aipg-website/actions/runs/42686202421)
  passed. The exact-source, protected Node 22 Vercel QA preview passed all
  53 original browser checks with only Vercel toolbar instrumentation disabled.
- The public website then passed all 53 checks without a QA credential or
  toolbar override, including read-only wallet lifecycle tests at both sizes.
  Real wallet signing and mobile/hardware pairing remain outside this coverage.
- Production build: 124 unit checks passed, one Redis-tool-availability skip,
  zero failures. The local 125-pass run above included real isolated Redis.
- Merged dependency graph: `npm audit --audit-level=low` reports zero known
  vulnerabilities. Existing lint/optional-module warnings remain as noted above.
- Both temporary project-scoped QA bypasses were revoked immediately after
  their suites. Website and docs SSO settings stayed unchanged.
- Direct-origin Pagefind search/navigation passed with TLS validation and no
  Cloudflare in the path. Only then was the temporary docs CSP transform
  disabled. All six public security headers on `/`, `/run`, `/staking` and
  `/docs` matched the pre-release snapshot afterward.

## Release Gates

1. Explicit maintainer approval of the ongoing compatibility-patch maintenance
   (received 2026-11-09).
2. Clean Node 22 `npm ci`, successful patch application, valid `npm ls zod
   abitype --all`, and zero vulnerabilities from `npm audit --audit-level=low`.
3. Full unit suite, production build, lint, browser suite and secret scans.
4. Reviewed exact PR SHA, normal protected merge, successful Vercel preview
   and matching Node 22 production deployment. Do not bypass protections.
5. Verify production wallet rendering and docs search; only then retire the
   temporary edge CSP rule as described in `DOCS_PROXY.md`.

`postinstall` uses `--error-on-fail`; a changed upstream package must break
installation instead of silently losing its port. Requalify on every pinned
SDK update. Remove the patches and overrides when official compatible
releases replace them, then rerun the same baseline and browser checks.

## Rollback

The pre-rollout production artifact was `dpl_yrhrEvpapBfc4MpdoH8e48qRrBfR`
(source `56995ce2f2d7dcdbe7fc86150a49a64d15ef6391`). If wallet
behavior regresses, promote that exact artifact, not a fresh build of old
dependencies. It temporarily restores the previously vulnerable graph, so
treat rollback as an incident measure and keep #85 open. Do not disable the
audit gate or mix old SDK validators with the new Zod major.

The docs edge CSP rule is now disabled after source verification. A
website rollback may require restoring that rule; it does not require rolling
back the separate, already-patched documentation deployment.
