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
CSP**, ID `fdde0733d8fe47b6a5ab674630d97ade`, is active with this exact match:

```text
(http.host eq "aipowergrid.io" and (http.request.uri.path eq "/docs" or starts_with(http.request.uri.path, "/docs/")))
```

It sets (not appends) `Content-Security-Policy` to the matching production
docs policy from `next.config.js`. Keep the edge value synchronized when the
source policy changes. Do not modify the existing unrelated transform rules.

The source change is not yet deployed. A website rebuild remains gated on
[dependency remediation #85](https://github.com/halfaipg/aipg-website/issues/85).
The edge rule restores search without redeploying that dependency graph; it
does not remediate the dependencies. Remove this transitional deployment note
after the source policy has safely shipped and the public checks pass.

## Verification And Rollback

Run `tests/unit/security-headers.test.mjs`, then the production-browser
`tests/e2e/security-headers.spec.ts`. Run the documentation repository's complete
browser suite with `DOCS_TEST_URL=https://aipowergrid.io` after promotion. It
must find and follow a real Pagefind result, not only fetch the search assets.
Confirm `/` and `/run` still reject both WASM and JavaScript string evaluation.

To reverse only the edge change, disable the named rule. Do not remove the CSP
or weaken WAF/TLS settings. Disabling it before the source policy is deployed
will block docs search again; it will not roll back documentation content.
