# Operator Outreach Playbook

## Goal

Bring independently operated GPU workers and CPU-only validator preview nodes
online. Success means a new operator is visible in the public network data and
remains healthy, not that a post receives impressions or moves a token market.

All outreach is review-first. This document provides drafts; it does not
authorize automated posting, unsolicited direct messages, or posting where a
community's rules prohibit self-promotion.

## Product Truth

Keep these two offers separate:

| Offer | Current purpose | Hardware | Economic effect |
| --- | --- | --- | --- |
| Text worker | Serve real Grid inference jobs | Linux x64/ARM64 plus an existing Ollama or OpenAI-compatible GPU backend | Work is recorded and the current payout rail distributes AIPG; never promise a rate or return |
| Media qualification | Prove the first managed media profile on one required GPU class | NVIDIA GPU in the manager-derived minimum, midrange, or datacenter class | Benchmark-only release testing; no enrollment, jobs, den, rewards, or future-earnings promise |
| Validator preview | Receive assignments and sign worker-quality evidence | CPU and internet connection | No rewards, staking, slashing, routing authority, or worker penalties |

Media workers remain qualification-gated. Do not advertise their benchmark
tool as an installable production worker or imply that arbitrary workflows can
join without review.

## Evidence Gate

Refresh every claim immediately before publishing. If a source is unavailable,
remove the claim instead of substituting an old number.

| Claim | Authoritative source |
| --- | --- |
| Online workers, models, redundancy gaps, validator state | <https://api.aipowergrid.io/v1/status/network> |
| Jobs completed by modality | <https://api.aipowergrid.io/v1/stats/totals> |
| Worker payout totals and recent Base transfers | <https://api.aipowergrid.io/v1/payouts/public?limit=200> |
| Human-readable network state | <https://aipowergrid.io/status> |
| Verified worker artifact and current version | <https://github.com/AIPowerGrid/grid-text-worker/releases/latest> |
| Accepted media qualification counts and required classes | <https://raw.githubusercontent.com/AIPowerGrid/grid-media-worker/main/docs/qualification-status.json> |
| Media qualification cohort | <https://github.com/AIPowerGrid/grid-media-worker/issues/8> |
| Worker onboarding | <https://aipowergrid.io/run> |
| Validator onboarding and limitations | <https://aipowergrid.io/validate> |
| Public payout verification | <https://console.aipowergrid.io/transparency> |

Before using payout evidence, say what it proves: recorded transfers from the
current custodial payout rail. It is not a forecast, fixed rate, ROI, or claim
that a specific machine will earn enough to cover its costs.

## Channel Rules

| Channel | Use it for | Required framing | Avoid |
| --- | --- | --- | --- |
| AIPG site, X, Discord, GitHub | Direct worker and validator recruitment | State current capacity gaps and link to the correct onboarding path | Token-price language, fixed earnings, or presenting validator preview as authoritative |
| Vast.ai host community | A short technical invitation for experienced Linux GPU hosts | Disclose that this is our project, ask moderators before posting outside an appropriate host channel, and link to the verified Linux release | Soliciting active rented machines, promising better returns than Vast, or unsolicited DMs |
| r/LocalLLaMA | A technical build report after genuine community participation | Lead with architecture, release provenance, supported local backends, and the redundancy problem; disclose affiliation | A recruitment ad, referral language, token pitch, or repeated project-only posting |
| r/selfhosted | Defer unless moderators confirm the network-connected worker fits the community's self-hosted definition | If approved, include install docs, source, features, benefit, and clear project affiliation | Treating the subreddit as an advertising or product-testing channel |
| Hugging Face community | A specific open-model integration, benchmark, or runnable demo | Discuss the exact model/runtime result and reproducible setup | A generic request for GPU owners |
| Unaffiliated Discord/Telegram communities | Only a moderator-approved technical post | Ask permission first and post once in the designated channel | Cross-server spam, scraped member lists, or cold DMs |

Current rule references:

- LocalLLaMA's 2026 rule update explicitly tightened low-effort and affiliate/self-promotion enforcement: <https://www.reddit.com/r/LocalLLaMA/comments/1su3ao4/rlocalllama_rule_updates/>
- r/selfhosted requires a promoted project to be self-hostable, released, documented, and useful to self-hosters; moderator approval is prudent for a network-connected worker.
- Vast documents a host-only Discord available to linked host accounts: <https://docs.vast.ai/host/hosting-overview>

Rules change. Recheck each community immediately before posting.

## Ready-To-Review Drafts

Replace bracketed evidence from the live sources above. Keep the disclosure.

### Owned Channels: GPU Operators

> We need more independent GPU operators on AI Power Grid. The network currently
> has [WORKERS] workers serving [MODELS] model routes, with [GAPS] routes below
> the three-worker redundancy target. The stable Linux text worker can connect
> to an existing Ollama or OpenAI-compatible backend, and its release includes
> checksums, an SBOM, and GitHub build provenance. Work and Base payouts are
> publicly inspectable, but there is no fixed earnings promise. Check your
> hardware and the live capacity gaps: https://aipowergrid.io/run

### Technical Community: Text Worker Build Report

> Disclosure: I maintain AI Power Grid. We have been hardening a Linux worker
> that connects an operator-owned Ollama or OpenAI-compatible backend to a
> multi-model inference network. The current release is immutable and ships
> SHA-256 checksums, an SPDX SBOM, and build provenance. The interesting problem
> now is not another frontend; it is independent redundancy. The public status
> endpoint currently shows [GAPS] of [MODELS] routes below our three-worker
> target. I would value technical criticism of the worker boundary, reconnect
> behavior, and release contract. Source and install path:
> https://aipowergrid.io/run

### Experienced GPU Hosts

> I maintain an open-source distributed inference network and am looking for a
> few experienced Linux GPU operators to test the stable text-worker path with
> their existing Ollama or OpenAI-compatible backend. The worker release is
> checksummed, includes an SBOM and build provenance, and the public network page
> shows exactly which model routes lack redundancy. Work accounting and past
> Base payouts are public; I am not offering a fixed rate or income guarantee.
> Setup and current gaps: https://aipowergrid.io/run

### Media Qualification Cohort

> We need independent NVIDIA GPU operators to help qualify AI Power Grid's
> first managed media profile. Check the live status before posting: only name
> classes still marked `needed`. The current qualification tool is
> benchmark-only, cannot enroll a worker or advertise capabilities, and creates
> no jobs, den, rewards, or promise of future earnings. It produces a
> privacy-safe public report after three local canary runs; exact GPU inventory
> stays private. Current requirements and verified tool:
> https://aipowergrid.io/run

### Validator Preview Cohort

> We are recruiting independent operators for AI Power Grid's CPU-only
> validator preview. It receives Grid-issued assignments, evaluates worker
> responses, and signs evidence. This release has no rewards, staking, slashing,
> routing authority, or worker penalties; the purpose is to prove independent
> operation before any economic authority is discussed. The qualification is a
> 72-hour supervised preview: https://aipowergrid.io/validate

## Execution Order

Run one seven-day campaign, starting only after the consumer demo passes:

**Make something on the Grid. Or help power it with the AI setup you already run.**

1. Verify one strong image or music result through the actual consumer app.
   Keep the prompt, settings, model, output, end-to-end time, and quoted cost.
   Record actual charged credits separately: a preview quote is not a payment.
   Repeat the same flow to catch intermittent failures before inviting people.
2. Publish that creation with a short recording and direct product link.
   State sign-in requirements and current access policy. Do not lead with docs.
3. Invite five willing operators already running a supported backend. Start
   with the verified Linux text path; qualify ComfyUI separately. Existing
   community volunteers first, no scraped leads or unsolicited mass messages.
4. Personally help each operator select a genuinely served model, connect,
   and finish a real job. An enrollment ack or a self-canary is not a paid job.
   Record blockers and fix repeated problems before expanding recruitment.
5. With permission, publish one operator setup story. Report actual steps and
   experience, not earnings extrapolations.
6. Publish one working integration example using an already-shipped package.
   Pick n8n or Open WebUI for this week; do not launch more integration projects.
   Check upstream acceptance before calling anything native or officially listed.
7. Review first successful generations, returning users, first-job workers,
   and seven-day worker retention. Share results and failures, not impressions
   as a substitute for usage. Keep validator recruitment separate.

### Campaign Status

Status below is an execution record, not authorization to publish.

| Deliverable | State / required evidence |
| --- | --- |
| Compact homepage and worker funnel | Local homepage implementation; production deployment pending |
| Consumer demo | Pending signed-in end-to-end run, repeat run, output review, elapsed time, quote and actual debit |
| Creation post | Draft after verified demo; not published |
| Five worker onboarding slots | 0 campaign participants verified; identify willing operators, track first real completed job |
| Operator story | Pending completed setup and permission |
| Working integration example | Selected published n8n 0.1.3; local single-image game-scene workflow and guide in canonical n8n repo; request-mapping tests pass, live import/generation/recording pending |
| Seven-day outcome review | Starts from campaign publication, not document creation |

Baseline observed from the public network status endpoint on
2026-09-05 at 11:58 UTC: 8 workers, 12 model routes, all 12 below the
three-worker target with one serving worker each. Charging mode was
`allowlist`, not global. This is a dated operational snapshot, not campaign
attribution and not proof of successful consumer generation.

Integration preflight on 2026-09-05: npm confirms the dedicated
`@aipowergrid/n8n-nodes-aipg@0.1.3` package. The image node, transport, and
request-contract build files match that public tarball byte-for-byte. The new
`n8n-nodes-aipg/examples/game-scene.json` is a local campaign artifact, not yet
a published example or live-tested demo. Its guide reuses the exact same prompt
in the image studio so the creation post and integration post can share a
useful result.

Open WebUI's public check passed model discovery, missing-auth rejection, and
Direct Connection CORS. Grid's public conformance runner also passed discovery
and auth rejection at 12:08 UTC. Neither check performs real inference.
[LiteLLM #38725](https://github.com/BerriAI/litellm/pull/38725) remains open,
not merged; do not market it as an upstream-shipped provider.

### Five Personal Onboarding Slots

Keep only consented public handles and non-sensitive evidence in this file.
Never copy keys, account IDs, prompts from real customers, or private logs.

| Slot | Opt-in contact | Supported backend / platform | First real job verified | Seven-day check | Friction |
| --- | --- | --- | --- | --- | --- |
| 1 | Not recruited | Pending | Pending | Pending | Pending |
| 2 | Not recruited | Pending | Pending | Pending | Pending |
| 3 | Not recruited | Pending | Pending | Pending | Pending |
| 4 | Not recruited | Pending | Pending | Pending | Pending |
| 5 | Not recruited | Pending | Pending | Pending | Pending |

Short invitation for an appropriate owned-channel conversation:

> Already running Ollama or vLLM on Linux? You can connect spare capacity to
> AI Power Grid without replacing your setup. Choose which models you serve
> and when. I'm helping five operators get through their first real job:
> https://aipowergrid.io/run
> AIPG rewards follow accepted work; there is no guaranteed earning rate.

## Outcome Tracking

Review this table weekly. Do not record credentials, private IP addresses,
wallet details, or account identifiers.

| Metric | Definition |
| --- | --- |
| Qualified worker leads | Operators who supplied coarse hardware and availability through the public intake |
| First successful connection | New independently operated worker visible in the public registry |
| First completed worker job | First real, accepted job for a participating worker; exclude enrollment acknowledgments and setup canaries |
| Seven-day worker retention | Participating worker has observed activity at least seven days after its first real job; do not infer continuous uptime |
| First successful generation | Unique consenting user with a completed consumer generation, not a page view or submitted request |
| Repeat users | Those users completing another generation on a later day within the campaign window |
| 72-hour worker retention | New worker still healthy after 72 hours |
| Route redundancy improved | Model route moves from one worker to two, or two to the three-worker target |
| Validator qualification | Independently operated preview node completes the 72-hour cohort requirements |
| Setup blocker rate | Qualified leads unable to connect, grouped by non-sensitive failure category |

Stop or revise a channel when it generates complaints, unqualified traffic, or
support load without healthy operators. Never compensate for weak conversion by
increasing posting frequency.

The public operator funnel currently measures manager enrollment acknowledgments
and last-seen retention, not first paid jobs or consumer return rate. Keep those
metrics separate. Until consent-respecting product attribution exists, record a
small manual cohort and report unknown campaign-wide counts as unknown.
