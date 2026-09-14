# Worker onboarding

## Main path

Text / LLMs: choose an inference endpoint or familiar engine, choose the worker
machine's OS, download, then follow the platform-specific local wizard steps.
The engine dropdown is a guide selector, not an eligibility allowlist. The
current worker requires OpenAI chat to register; Anthropic Messages passthrough
is advertised only after its own probe passes. Do not promise Anthropic-only
registration without changing and testing the worker/Core contract.

Images & video: existing ComfyUI bridge, with supported models and workflows.
The primary setup link goes directly to the bridge README's ComfyUI instructions,
not the older docs handoff that loops back to qualification on `/run`.
Audio: ACE-Step profile and its separate managed-install qualification path.
Never label a benchmark tool or audio-manager artifact as a generic image worker.

Hardware planning, runtime matrix, qualification evidence and payout/worker
lookup remain available in optional disclosures. No GitHub signup is required
just to download. Support issues are optional and public.

## Desktop publication policy

Owner requested the desktop-download mismatch be fixed on September 14, 2026.
The text-worker v0.3.9 release publishes Windows x64, Apple Silicon macOS,
Linux x64 and ARM64, and explicitly permits unsigned desktop publication with
warnings. The website now follows that policy, without changing worker binaries.

All immutable release, exact tag commit, downloaded manifest/checksum hashes,
payload digests, sizes and installer coverage checks remain mandatory.
Only fully verified signing or explicit known unsigned states can expose a
desktop artifact. Missing or inconsistent signing metadata stays blocked.
Warnings are adjacent to downloads; never instruct users to disable Gatekeeper
or Windows protections globally. Mac downloads are not for Intel Macs.

Automated native build/runtime checks are not a supervised desktop install.
v0.3.9 has Linux production-canary evidence, not Mac/Windows end-to-end proof.
The page says so. Managed media release/signature gates are unchanged.

## Verification and rollback

Run npm run test:unit, npm run lint, npm audit, and the production-build browser
suite. Inspect mobile/desktop screenshots and verify all four text artifact
paths, adjacent warnings, engine-specific instructions, optional disclosures,
and ComfyUI/audio guide links. Do not download or execute binaries in UI tests.

Deploy through reviewed main and Vercel. The pre-change production baseline is
477462bd2192dba3391218aed8bc19261fc3dcde. Roll back the website deployment if
download identity, rendering, or navigation fails; do not alter worker releases,
Core, quotas, credits or payouts as part of this website change.
