// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2026 AI Power Grid

import { expect, test } from '@playwright/test';

test('docs can compile WASM but cannot evaluate JavaScript strings', async ({ page, request }) => {
  const response = await request.get('/docs');
  const policy = response.headers()['content-security-policy'];
  expect(policy).toContain("'wasm-unsafe-eval'");
  expect(policy).not.toContain("'unsafe-eval'");
  await page.route('https://docs-policy.invalid/**', route => route.fulfill({
    contentType: 'text/html',
    headers: { 'Content-Security-Policy': policy },
    body: '<!doctype html><title>Local CSP fixture</title>',
  }));
  await page.goto('https://docs-policy.invalid/');
  const result = await page.evaluate(async () => {
    const wasm = await WebAssembly.compile(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0]));
    let evalBlocked = false;
    try {
      new Function('return 1')();
    } catch (error) {
      evalBlocked = error instanceof EvalError;
    }
    return { wasm: wasm instanceof WebAssembly.Module, evalBlocked };
  });
  expect(result).toEqual({ wasm: true, evalBlocked: true });
  expect((await request.get('/')).headers()['content-security-policy']).not.toContain("'wasm-unsafe-eval'");
});
