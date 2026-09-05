# Homepage Chat

## Status

Implemented on the reviewed preview branch, **off by default**. No production
Grid key, Redis service, funding, or live inference has been provisioned.
The page explicitly says when the demo is unavailable and links to AIPG Chat;
it never substitutes simulated answers. Browser tests use labelled fixtures only.

Production preflight on September 5 found Core in `allowlist` charging mode,
with only `z-image-turbo` in its model allowlist and the proposed demo service
absent. Do not activate this auto-text demo under that configuration: resolved
text models bypass charging and therefore the service ceilings. The route now
rejects any credit summary whose `charging_mode` is not `on`, even when the
account-level `charging_enabled` is true. Never globally enable charging just
to satisfy this demo. A scoped Core contract that guarantees charging and
ceilings for every model routed by this service needs a separate reviewed
change and tests before this restriction can be relaxed.

Cloudflare widget `AIPG homepage demo - production` was created September 5
for `aipowergrid.io`, with Managed verification and pre-clearance disabled.
Its keys remain in Cloudflare; copying them to Vercel deployment settings is
pending browser two-factor authentication. No keys are stored in this repository.
Do not recreate the widget or reuse its credentials for preview/local testing.
Redis provisioning and the dedicated Core service remain pending. Widget
creation alone is not a verified server-side Siteverify integration.

## Experience

`Try the Grid` scrolls to the inline chat. Images, Video, and Music have direct
product links. Guests get up to three submitted turns per UTC day, subject to
shared availability and anti-abuse limits. Replies stream, expose the returned
model name, and support stopping. Clear conversation does not reset the quota.
The full Chat link opens the product; it does not transfer the demo transcript.
The empty state is a compact composer. A completed answer displays its model,
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
`POST`: same-origin JSON `{messages, token}` only. At most five alternating
user/assistant messages, 1,000 characters per user message, 12 KB total content,
16 KB body. No browser-selected models, system messages, URLs, tools, or uploads.
Fixed upstream: Grid `/v1/chat/completions`, `model=auto`, 1,024 maximum output
tokens, low reasoning effort. Only answer deltas, model names and allowlisted
completed-response public worker/timing/usage metadata reach clients;
reasoning fields, upstream diagnostics and credentials do not. A valid terminal
frame is required for a success state. Request timeout is 45 seconds inside
the hosting plan's 60-second function limit, leaving time for limiter cleanup; aborting
the browser cancels the upstream request, but is not a promise of a Core refund.

The Redis Lua reservation atomically enforces guest turns (3/day), IP or IPv6
/64 turns (6/day), shared exposure budget, four active requests globally and one
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
   The route checks `charging_enabled` and requires `charging_mode=on` before
   each submission; an allowlisted summary cannot prove auto-model coverage.
   That summary does
   **not** attest to the service's configured ceilings. Core must enforce them.
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
| `DEMO_TURNSTILE_SITE_KEY` | Public widget identifier, returned only by status route |
| `DEMO_TURNSTILE_SECRET` | Server-side Siteverify credential |
| `DEMO_REQUEST_MICRO` | Defaults to `10000`; must be >= actual Core per-request ceiling |
| `DEMO_DAILY_MICRO` | Defaults to `500000`, validation maximum `1000000` ($1) |
| `VERCEL` | Platform-managed `1`; required for non-loopback hosting |

## Verification

`npm run test:unit`, `npm run lint`, `npm run build`, Playwright homepage and
chat smoke. The real Lua concurrency test starts its own temporary UNIX-socket
Redis without persistence or a TCP port, then shuts it down and removes its
temporary directory. It skips explicitly when Redis tools are not installed;
do not describe that skipped run as a concurrency proof.

Primary contracts: [Vercel request headers](https://vercel.com/docs/headers/request-headers),
[Turnstile server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).
