# Docs Proxy

`/docs` and `/docs/*` proxy the separate documentation deployment through the
marketing site. Validate the public URL as well as the direct docs preview:
the main site's response headers also apply to the rewritten content.

Builder links through `/use` must use normal document navigation. Next client
prefetch follows that redirect into a different application and tries to load
its RSC JavaScript from the marketing app's `/_next` namespace. The navbar
anchor and `tests/e2e/docs-handoff.spec.ts` preserve this boundary. The test was
confirmed to reject the old client-link behavior before applying the fix.

## Pagefind Policy

Pagefind search compiles WebAssembly. Production docs responses need
`'wasm-unsafe-eval'` in `script-src`, but never JavaScript `'unsafe-eval'`.
`next.config.js` defines this as the last matching docs-only CSP. The default
policy, other security headers, media sources and script origins stay unchanged.

The maintainer-approved Cloudflare response-header rule **Docs Pagefind WASM
CSP**, ID `fdde0733d8fe47b6a5ab674630d97ade`, is **disabled** after the
2026-11-09 source rollout. It is retained as a scoped rollback option with
this exact match:

```text
(http.host eq "aipowergrid.io" and (http.request.uri.path eq "/docs" or starts_with(http.request.uri.path, "/docs/")))
```

If re-enabled for rollback, it sets (not appends) `Content-Security-Policy`
to the matching production docs policy from `next.config.js`. Review the edge
value against source before re-enabling it. Do not modify unrelated rules.

The source policy shipped through
[PR #86](https://github.com/halfaipg/aipg-website/pull/86), merged source
`62bc2984cb829cbe913a601d0096cf1c0f414653`, initial production artifact
`dpl_Q4Woe6QH4xRRdRrnADV3XcJNnjpF` on Node 22. The dependency remediation,
compatibility limits and release evidence are in `WALLET_DEPENDENCIES.md`.
There is no documentation content/database migration in this website release.

Before disabling the edge rule, an actual browser connected directly to the
verified Vercel origin with ordinary TLS validation, confirmed no Cloudflare
response headers, and found/followed a real Pagefind result. The origin's CSP
included `'wasm-unsafe-eval'` and excluded JavaScript `'unsafe-eval'`.
After disabling only the named rule, all 53 public website browser checks
passed, including the docs WASM/eval test and cross-application navigation.
All six public security headers on `/`, `/run`, `/staking` and `/docs`
matched the pre-release baseline. The API's separate urllib BIC exception
and the unrelated web-wallet CORS transform were not changed.

The separate docs release
[PR #50](https://github.com/AIPowerGrid/aipg-documentation/pull/50), source
`a0b49c6950807e017c89cf72e7e0ad2f45cc3424`, deployed as
`dpl_2kj3p5Rnn2MpFimHiSDkkCCAhjQX` on Node 22. All seven public docs checks
then passed: 44 public routes, private-path 404s, search navigation, metadata,
API/funding discovery, Mermaid and responsive/mobile layouts.

## Verification And Rollback

Run `tests/unit/security-headers.test.mjs`, then the production-browser
`tests/e2e/security-headers.spec.ts`. Run the documentation repository's complete
browser suite with `DOCS_TEST_URL=https://aipowergrid.io` after promotion. It
must find and follow a real Pagefind result, not only fetch the search assets.
Confirm `/` and `/run` still reject both WASM and JavaScript string evaluation.

To reverse only the edge change, disable the named rule. Do not remove the CSP
or weaken WAF/TLS settings. Disabling it before the source policy is deployed
will block docs search again; it will not roll back documentation content.
