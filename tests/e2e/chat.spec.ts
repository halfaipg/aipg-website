// SPDX-License-Identifier: AGPL-3.0-or-later
import { test, expect } from '@playwright/test';

test('demo streams, shows the model, keeps quota on clear, and hands off after three turns', async ({ page }) => {
  let remaining = 3;
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({
    contentType: 'application/javascript',
    body: 'window.turnstile={render(el,o){window.__verify=o.callback;o.callback("browser-test-only");return "fixture"},reset(){window.__verify("browser-test-only")},remove(){}};',
  }));
  await page.route('**/api/demo/chat', async route => {
    if (route.request().method() === 'GET') return route.fulfill({ json: { available: true, remaining, siteKey: 'fixture' } });
    const body = route.request().postDataJSON();
    expect(Object.keys(body).sort()).toEqual(['messages', 'token']);
    expect(body.messages.at(-1).role).toBe('user');
    remaining -= 1;
    await route.fulfill({ contentType: 'application/x-ndjson', body: [
      { type: 'meta', remaining }, { type: 'model', model: 'fixture-model' },
      { type: 'delta', text: 'Browser test response, not live inference.' }, { type: 'done', truncated: false, stats: { worker: 'fixture-community-worker', tokens_per_s: 42.5678, gen_time: 2.345, ttft: 0.123, output_tokens: 93 } },
    ].map(item => JSON.stringify(item) + '\n').join('') });
  });
  await page.goto('/');
  await page.getByRole('link', { name: 'Try the Grid', exact: true }).click();
  const input = page.getByRole('textbox', { name: 'Your message' });
  for (let i = 0; i < 3; i++) {
    await input.fill('A test question');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByText(`${2-i} / 3 free turns left today`)).toBeVisible();
    await expect(page.getByText('Browser test response, not live inference.')).toBeVisible();
    await expect(page.getByText('fixture-model', { exact: true })).toBeVisible();
    await expect(page.getByText('fixture-community-worker', { exact: true })).toBeVisible();
    await expect(page.getByText('42.6 tok/s', { exact: true })).toBeVisible();
    await expect(page.getByText('93 output tokens', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Clear conversation' }).click();
  }
  await expect(input).toBeDisabled();
  await expect(page.getByRole('link', { name: 'Continue in Chat' })).toHaveAttribute('href', 'https://aipg.chat');
  await page.reload();
  await expect(page.getByText('0 / 3 free turns left today')).toBeVisible();
  await expect(input).toBeDisabled();
});

for (const width of [320, 390, 1280]) {
  test(`compact composer and long response provenance fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: 'window.turnstile={render(el,o){window.__verify=o.callback;o.callback("fixture");return "fixture"},reset(){window.__verify("fixture")},remove(){}};' }));
    await page.route('**/api/demo/chat', route => route.request().method() === 'GET'
      ? route.fulfill({ json: { available: true, remaining: 3, siteKey: 'fixture' } })
      : route.fulfill({ contentType: 'application/x-ndjson', body: [
        { type: 'model', model: 'fixture-long-model-name-including-precision-and-quantization' },
        { type: 'delta', text: 'Explicit browser fixture. Here is a short answer to your question.' },
        { type: 'done', stats: { worker: 'fixture-community-worker-with-a-long-public-name-for-layout-testing', tokens_per_s: 123.4567, gen_time: 1.23, ttft: 0.45, output_tokens: 120 } },
      ].map(e => JSON.stringify(e) + '\n').join('') }));
    await page.goto('/');
    await page.getByRole('heading', { name: 'Chat with the Grid' }).scrollIntoViewIfNeeded();
    const section = page.getByRole('region', { name: 'Chat with the Grid' });
    expect((await section.boundingBox())!.height).toBeLessThan(500);
    await section.screenshot({ path: `test-results/chat-empty-${width}.png` });
    await page.getByRole('textbox', { name: 'Your message' }).fill('Explain an idea');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByText('123.5 tok/s', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await section.screenshot({ path: `test-results/chat-response-${width}.png` });
  });
}

test('demo reports interrupted output and never replays a failed turn', async ({ page }) => {
  const payloads: { messages: { role: string; content: string }[] }[] = [];
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: 'window.turnstile={render(el,o){window.__verify=o.callback;o.callback("fixture");return "fixture"},reset(){window.__verify("fixture")},remove(){}};' }));
  await page.route('**/api/demo/chat', async route => {
    if (route.request().method() === 'GET') return route.fulfill({ json: { available: true, remaining: 3, siteKey: 'fixture' } });
    payloads.push(route.request().postDataJSON());
    return route.fulfill({ contentType: 'application/x-ndjson', body: JSON.stringify({ type: 'delta', text: 'Incomplete fixture' }) + '\n' });
  });
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Your message' }).fill('First attempt');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByText('The response was interrupted. Please try again or open Chat.')).toBeVisible();
  await page.getByRole('textbox', { name: 'Your message' }).fill('Second attempt');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect.poll(() => payloads.length).toBe(2);
  expect(payloads[1].messages).toEqual([{ role: 'user', content: 'Second attempt' }]);
});

test('unconfigured demo is honest and offers a working product link', async ({ page }) => {
  await page.route('**/api/demo/chat', route => route.fulfill({ json: { available: false } }));
  await page.goto('/');
  await expect(page.getByText('Demo not open yet', { exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Your message' })).toBeDisabled();
  await expect(page.getByRole('link', { name: 'Continue in Chat' })).toHaveAttribute('href', 'https://aipg.chat');
  await expect(page.getByRole('link', { name: 'Video', exact: true })).toHaveAttribute('href', 'https://aipg.art/create/director');
});
