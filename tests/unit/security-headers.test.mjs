// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2026 AI Power Grid

import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';

const require = createRequire(import.meta.url);
const config = require('../../next.config.js');
const { getPathMatch } = require('next/dist/shared/lib/router/utils/path-match');

test('production WASM permission is scoped to the docs rewrite only', async () => {
  const previous = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
  let rules;
  try {
    rules = await config.headers();
  } finally {
    if (previous === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previous;
  }
  const headersFor = pathname => Object.fromEntries(rules
    .filter(rule => getPathMatch(rule.source)(pathname))
    .flatMap(rule => rule.headers.map(header => [header.key, header.value])));
  const base = headersFor('/');
  const csp = base['Content-Security-Policy'];
  assert.ok(!csp.includes("'unsafe-eval'"));
  assert.ok(!csp.includes("'wasm-unsafe-eval'"));
  for (const route of ['/staking', '/run', '/api/demo/chat', '/docs-other']) {
    assert.equal(headersFor(route)['Content-Security-Policy'], csp, route);
  }
  for (const route of ['/docs', '/docs/', '/docs/backends/ollama', '/docs/_pagefind/pagefind.js']) {
    const headers = headersFor(route);
    assert.ok(headers['Content-Security-Policy'].includes("'wasm-unsafe-eval'"), route);
    assert.ok(!headers['Content-Security-Policy'].includes("'unsafe-eval'"), route);
    assert.equal(headers['Content-Security-Policy'].replace(" 'wasm-unsafe-eval'", ''), csp);
    for (const [key, value] of Object.entries(base).filter(([key]) => key !== 'Content-Security-Policy')) {
      assert.equal(headers[key], value, `${route}: ${key}`);
    }
  }
});
