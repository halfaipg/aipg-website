# Website Tests

## Purpose

Unit and Playwright smoke coverage for production-built marketing, worker
onboarding, and staking-withdrawal surfaces.

## Ownership

- `unit/demo-chat*.test.mjs` - disabled/configuration gates, request bounds,
  cookies, trusted IPs, bot checks, cap rejection, sanitized terminal streaming,
  and real isolated Redis Lua concurrency when Redis tools are installed.
- `e2e/chat.spec.ts` - explicitly mocked streaming, allowance, clearing, error
  and unavailable states, compact empty composer, plus long worker/model names
  and rounded per-response statistics on mobile/desktop. These fixtures are
  not evidence of live inference.
  It also verifies bounded Markdown answers inside the panel above the composer, HTML/image/unsafe
  URL rejection, and identical versioned/fallback favicon assets.
  Composer coverage includes auto-growth/shrink, viewport reflow, Enter versus
  Shift+Enter/IME, submit guards, and focus restoration after terminal responses.
  Turnstile fixtures exercise execution only on Send, mandatory interactive
  challenges separate from replies, expiry/cancellation without losing drafts,
  and no challenge reset/reappearance after success. Fifteen-turn browser and
  handler tests prove context forwarding; UTF-8 tests prove whole-pair recycling.
  Real Redis tests prove 15-guest/30-IP limits independently of concurrency caps.

- `e2e/staking.spec.ts` - page mount, withdrawal UI, and browser-error checks.
- `e2e/run.spec.ts` - release-gated worker and validator onboarding, including
  the preview.15 operator app, consent-based setup, Windows menu option 8,
  explicit exit behavior, and exact versioned downloads without personal
  private-key entry or Console key juggling, plus the
  canonical persistent Docker enrollment handoff, read-only credential mount,
  durable evidence-journal requirement, and
  public network-status surface, existing-stack worker onramp, pre-download
  compatibility and maturity facts, local hardware-path recommendation, telemetry
  disclaimers, evidence-bound payout scenario, exact public worker-status
  lookup, unreviewed-validator cohort-review handoff, artifact-specific Linux
  first-run and secret-boundary guidance,
  trust-boundary copy, bounded validator-opening share text, browser-error, and
  horizontal-overflow checks, including validator onboarding at 320px and
  390px widths.
- `unit/validator-release-gate.test.mjs` - pure capability-contract tests that
  prevent GitHub artifacts from unlocking validator downloads against an old,
  weak-quorum, unscoped, or economically authoritative Core.
- `unit/validator-public-status.test.mjs` - strict public-ID and response
  normalization that prevents the `/validate` lookup from forwarding malformed,
  mismatched, or economically authoritative validator data.
- `unit/validator-review-handoff.test.mjs` - keeps the cohort-review action
  limited to unreviewed validators, bound to the tracked public issue, and
  explicit about which credentials and private diagnostics must not be posted.
- `unit/text-release-gate.test.mjs` - exact immutable text-worker release,
  checksum, manifest, SBOM, GitHub digest, and size contract, including the
  versioned `v0.3.7+` installer requirement without invalidating older exact
  release envelopes.
- `unit/release-contract-download.test.mjs` - downloaded manifest/checksum byte
  hashing, length binding, strict UTF-8 parsing, and tamper rejection.
- `unit/marketing-claims.test.mjs` - static release-policy guard preventing
  gated media, confidential inference, universal hardware support, autonomous
  Core, blanket open-source, permanent-free, permissionless-Core, and live
  multi-asset/worker-claim payout claims from being marketed as current. It
  also keeps the highlighted operator action on `/run`, labels ended staking as
  legacy withdrawal, keeps validator recruitment discoverable in the footer
  without duplicating it into the primary navbar, keeps runtime rows linked to
  their backend-specific quickstarts, and prevents the dedicated
  validator identity from being described as a funded or account-linked wallet
  requirement.
- `unit/weekly-proof.test.mjs` - evidence-shape, seven-day payout coverage,
  immutable worker-release, exact npm-package/version plus fresh matching npm
  download windows that remain explicitly distinct from unique users, active
  PyPI Python SDK wheel/source identity bound to the canonical repository, exact repository/number/URL and
  truthful state reporting for every current upstream integration submission,
  fresh same-model pricing comparisons whose arithmetic and AIPG side match
  Core's versioned public price book,
  media-qualification validation, social-length, and validator-caveat
  contracts for the weekly proof draft.
- `unit/operator-evidence.test.mjs` - rolling payout-window validation,
  bounded den-share arithmetic, and exact online-worker matching.
- `unit/operator-opportunity.test.mjs` - deterministic text-route priority
  ranking using accepted den and missing replicas while excluding media,
  offline, malformed, and fully redundant routes; also bounds the shareable
  operator-opening copy and preserves its no-earnings-promise boundary.
- `unit/operator-intake.test.mjs` - public operator-interest form contract,
  required coarse planning fields, and forbidden sensitive-field boundary.
- `unit/operator-platform.test.mjs` - shared conservative platform detection
  that keeps download availability and planner recommendations synchronized;
  the mobile `/run` smoke forces macOS and rejects hydration/page errors.
- `unit/operator-recommendation.test.mjs` - workload-directed recommendations,
  platform-local availability, and separate hardware/profile qualification.
  `/run` smoke also checks the hero anchor, disclosure controls, and the
  audio, image/video, and CPU-only guide handoffs.
- `unit/media-qualification-status.test.mjs` - strict normalization of the
  profile-bound public media qualification counts and trusted recruitment
  links.

## Local Contracts

- Homepage acquisition tests cover 320/390/768/1280/1920px, direct consumer
  handoffs, first-screen user/worker/API actions, a visible next-section hint,
  gallery asset loading, no horizontal overflow, and no-JavaScript readability.

- Tests must never sign or broadcast a real transaction, use private keys, or
  depend on a funded wallet.
- Fail on uncaught page errors and unexpected console errors, not only HTTP 200.
- CI release lookups use the ephemeral read-only Actions token server-side so
  smoke results do not depend on GitHub's anonymous shared-runner rate limit.
  Tests must never expose that token to browser code or output.
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
