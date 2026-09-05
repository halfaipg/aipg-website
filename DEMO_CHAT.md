# Homepage Chat

## Status

Live at `https://aipowergrid.io/#try-grid` as of September 5, 2026. The source
default remains off; production explicitly enables the dedicated capped demo.
The page explicitly says when the demo is unavailable and links to AIPG Chat;
it never substitutes simulated answers. Browser tests use labelled fixtures only.

Production Core remains in `allowlist` charging mode, with only `z-image-turbo`
in the ordinary model cohort. Only `website-homepage-demo` is opted into the
separate bounded all-model direct-service cohort. The route
requires Core's version-1 authenticated `service_budget`: all models charged,
positive per-request/day ceilings no larger than the website's own limits, and
active `on` or scoped `allowlist` charging. Account-level eligibility alone is
insufficient. Core's default-empty `GRID_CHARGING_ALL_MODEL_SERVICES` JSON list
selects only exact bounded direct services; delegated users retain their current
policy. Never globally enable charging just to satisfy this demo.

Cloudflare widget `AIPG homepage demo - production` was created September 5
for `aipowergrid.io`, with Managed verification and pre-clearance disabled.
Its keys are stored as production-only Vercel Secret variables. No keys are
stored in this repository.
Do not recreate the widget or reuse its credentials for preview/local testing.
The dedicated `aipg-homepage-demo-prod` Upstash database is provisioned on the
Free plan (500,000 monthly commands), primary region `iad1`, no read replicas,
eviction disabled. It is connected only to website production with sensitive
variables and the `DEMO` prefix. No existing database was reused or changed.
The dedicated Core service key is stored only in production secrets, with
`account.read`, `inference.submit`, and `inference.service_submit` scopes.
Production has `DEMO_CHAT_ENABLED=1`, canonical origin, generated cookie secret,
and $0.01/request and $0.50/day limits in both Core and the website. A one-time
$0.03 canary credit plus a finite $0.50 operator-sponsored launch grant fund the
account; no automatic top-up exists. Replenishment is a deliberate operator action.

## Deployment Evidence

- Website: `277697c2f2b593bffd34ef114f2d6acc5fd3103c` (PR #65), enabled Vercel
  deployment `dpl_F4iyqhHKLfLXqMwjhQcmDYunfu9p`. Prior disabled deployment:
  `dpl_71oo29GHdArj1CjinDRHFpBvz5kD`. Validator preview.15 changes are preserved.
- Core: `8380dfdf7ed3ac92ab32bac72a6999dc0183513a` (PR #114), schema `0034`,
  PostgreSQL backup/restore and parity passed; rollback `6f12de6f`. No global
  charging, existing user cohort, validator authority, or payout settings changed.
- Core CI: 965 tests passed, 6 skipped; focused policy/auth/billing tests passed.
  Website: 98 local unit tests including real Redis, 23 browser tests, CI and
  hosted builds passed. Hosted builds lack Redis tooling; that proof ran locally
  and Core limits were separately exercised on production Redis.
- Real Core limit proof: 51 concurrent $0.01 exposure reservations admitted 50,
  rejected one; oversized reservation rejected. All proof-only holds released;
  no inference ran for those reservations.
- Real `auto` API canary: `qwen3-27b`, successful SSE `stop` and `[DONE]`,
  held 155 micro-USD, refunded 121, settled 34. Public homepage browser canary:
  real Turnstile success, streamed answer with worker/model/statistics,
  held 157 micro-USD, refunded 142, settled 15. Both reservations are settled.
- Browser allowance went from 3 to 2 and remained 2 after reopening the page.
  Public cross-origin and invalid-Turnstile POSTs returned 403 without dispatch.
- Hosting reports Node 20 deprecation ahead of October 1, 2026. Upgrade to a
  supported Node version in a separately tested runtime change before then.

## Experience

`Try the Grid` scrolls to the inline chat. Images, Video, and Music have direct
product links. Guests get up to 15 submitted turns per UTC day, subject to
shared availability and anti-abuse limits. Replies stream, expose the returned
model name, and support stopping. Clear conversation does not reset the quota.
The full Chat link opens the product; it does not transfer the demo transcript.
The empty state is a single-line, growing composer. Enter submits and Shift+Enter
adds a newline. The latest AI reply is inside the same panel above the input;
completed conversation history remains in memory for follow-ups. Short answers
use natural height; longer ones scroll within 256px/40svh. The compact empty
state reserves no transcript space. Normal 15-turn conversations retain their
full history; above 48 KB UTF-8, whole oldest exchanges are recycled, preserving
the newest question and recent context. This is a rolling window, not a summary
or permanent memory. Failed/partial exchanges are excluded from later requests.
Turnstile uses `interaction-only` appearance with `execution: execute`. A fresh
widget runs only on Send and is removed after verification or cancellation;
there is no automatic reset after a response. Required human checks appear
separately beneath the controls, never in place of a reply. Failed verification
preserves the draft and completed history. Every POST still requires a fresh,
server-validated token. See [Cloudflare's execution configuration](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configurations/#execution-modes).
A completed answer displays its model,
public worker name, generation time, first-token time, decode tokens/second and
output tokens when supplied by Core. Speeds/times are rounded to one decimal.
These are reported request statistics, not independent hardware attestation or
benchmark results. Decode speed excludes first-token time; output token usage
may include reasoning. Missing values are omitted, not fabricated.
Prompts and responses stay in page memory, not browser storage or analytics.
The adjacent gallery preview is a real signed-out capture of the public gallery
with a `landscape` search, taken September 5, 2026, framed with decorative browser
chrome. It is not a fresh generation or performance claim.

## Server Contract

`GET /api/demo/chat`: no-cache availability, public Turnstile site key, remaining
allowance, and a signed HttpOnly SameSite=Strict day-bound guest cookie.
`POST`: same-origin JSON `{messages, token}` only. At most 29 alternating
user/assistant messages, 1,000 characters per user message, 5,000 per assistant,
48 KB UTF-8 content, 320 KB raw body (allowing JSON escapes). Other JSON reads
remain bounded to 16 KB. No browser-selected models, system messages, tools, or uploads.
Fixed upstream: Grid `/v1/chat/completions`, `model=auto`, 1,024 maximum output
tokens, low reasoning effort. Only answer deltas, model names and allowlisted
completed-response public worker/timing/usage metadata reach clients;
reasoning fields, upstream diagnostics and credentials do not. A valid terminal
frame is required for a success state. Request timeout is 45 seconds inside
the hosting plan's 60-second function limit, leaving time for limiter cleanup; aborting
the browser cancels the upstream request, but is not a promise of a Core refund.

The Redis Lua reservation atomically enforces guest turns (15/day), IP or IPv6
/64 turns (30/day), shared exposure budget, four active requests globally and one
per IP. Ten POST attempts/minute/IP are allowed before bot verification.
Limits work across instances. Keys share the `{chat}` Redis hash tag, expire,
and contain only day-bucketed guest IDs and HMAC IP identifiers, never prompts.
Lease release is ownership-bound and idempotent. Each admitted attempt consumes
the full configured per-request exposure, including failed/interrupted requests;
no guessed refunds. This is intentionally conservative, not usage-based billing.
Redis outages fail closed. Do not evict/reset its counters during an active day.

Turnstile tokens are validated server-side for success, configured hostname and
`homepage_chat` action. There is no bot-check bypass, even on localhost.
Public hosting requires Vercel's overwritten `x-vercel-forwarded-for` header;
other hosting fails closed until a reviewed trusted-proxy contract is added.
An upstream proxy may group users under its IP, reducing allowance, not safety.

## Activation Checklist

1. Create a **dedicated** Core service identity for this sponsored demo, with
   `inference.submit`, explicit `inference.service_submit`, and the minimum scope
   required for its own credit summary. Do not reuse a person's API key or another
   application's service identity. Never use delegated-user bypasses.
2. Set Core's per-request service ceiling **at or below 10,000 micro-USD ($0.01)**
   and its daily ceiling **at or below 500,000 micro-USD ($0.50)**. Enable charging
   for this service account and every text model eligible for `auto`. Verify
   real cap rejection, concurrency and model routing before public activation.
   The route checks `charging_enabled` and the versioned `service_budget` before
   each submission. The latter must attest to model-independent charging and
   the actual positive direct-service ceilings. It is not remaining capacity;
   Core still atomically enforces the limits at request authorization.
   The website's exposure counter is only an upper bound when this per-request
   ceiling is configured correctly. Account-wide charging alone is insufficient.
3. Provide a dedicated non-evicting Upstash Redis database and a Turnstile widget
   restricted to the deployment hostname. Keep production and preview keys,
   counters, Core service identities and widget hostnames separate.
4. Set the server environment below through deployment secrets. Run a supervised
   small real `auto` generation and validate charged usage, hard-cap rejection,
   Turnstile, stream termination and quota survival across instances/reloads.
   No public activation until these checks pass; no marketing claims before then.
5. Set `DEMO_CHAT_ENABLED=1` only on the verified deployment. Roll back by setting
   it to `0`; revoke the dedicated key if compromise is suspected. Do not change
   global charging flags, other app credentials, or worker payouts for this demo.

## Environment

All names are server-only; **none** use `NEXT_PUBLIC_`.

| Variable | Value / boundary |
| --- | --- |
| `DEMO_CHAT_ENABLED` | `0` by default; explicit `1` enables the configured route |
| `DEMO_CHAT_ORIGIN` | Exact canonical origin, no trailing slash; loopback for local testing |
| `DEMO_GRID_KEY` | Dedicated bounded Core service credential |
| `DEMO_COOKIE_SECRET` | Cryptographically random secret, at least 32 characters |
| `DEMO_REDIS_URL` | HTTPS REST root of dedicated `*.upstash.io` database |
| `DEMO_REDIS_TOKEN` | Server-side REST credential, never sent to the browser |
| `DEMO_KV_REST_API_URL` | Vercel-managed production REST URL; preferred over the manual pair |
| `DEMO_KV_REST_API_TOKEN` | Vercel-managed production REST write token; required with its URL |
| `DEMO_TURNSTILE_SITE_KEY` | Public widget identifier, returned only by status route |
| `DEMO_TURNSTILE_SECRET` | Server-side Siteverify credential |
| `DEMO_REQUEST_MICRO` | Defaults to `10000`; must be >= actual Core per-request ceiling |
| `DEMO_DAILY_MICRO` | Defaults to `500000`, validation maximum `1000000` ($1) |
| `VERCEL` | Platform-managed `1`; required for non-loopback hosting |

The managed integration also supplies `DEMO_REDIS_URL` as a TCP URL,
`DEMO_KV_URL`, and a read-only token. The route ignores those when the managed
REST pair is present. Do not overwrite integration-managed values or combine
a managed URL with a manually copied token. Manual `DEMO_REDIS_URL` and
`DEMO_REDIS_TOKEN` must both be REST credentials and are used only when the
managed REST pair is absent.

## Verification

`npm run test:unit`, `npm run lint`, `npm run build`, Playwright homepage and
chat smoke. The real Lua concurrency test starts its own temporary UNIX-socket
Redis without persistence or a TCP port, then shuts it down and removes its
temporary directory. It skips explicitly when Redis tools are not installed;
do not describe that skipped run as a concurrency proof.

Primary contracts: [Vercel request headers](https://vercel.com/docs/headers/request-headers),
[Turnstile server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).
