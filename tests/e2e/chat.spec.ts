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

for (const width of [320, 390, 768, 1280, 1920]) {
  test(`compact composer and long response provenance fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: 'window.turnstile={render(el,o){window.__verify=o.callback;o.callback("fixture");return "fixture"},reset(){window.__verify("fixture")},remove(){}};' }));
    await page.route('**/api/demo/chat', route => route.request().method() === 'GET'
      ? route.fulfill({ json: { available: true, remaining: 3, siteKey: 'fixture' } })
      : route.fulfill({ contentType: 'application/x-ndjson', body: [
        { type: 'model', model: 'fixture-long-model-name-including-precision-and-quantization' },
        { type: 'delta', text: 'Explicit browser fixture, not live inference.\n\n**Your GPU can help power the Grid.**\n\n1. Connect your existing inference backend.\n2. Choose what capacity to share.\n\nUse `auto` to let the Grid select a model.\n\n```js\nconst model = "auto";\n```\n\n[Read the docs](https://aipowergrid.io/docs)' },
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
    const answer = page.getByRole('article', { name: 'Grid response' });
    await expect(answer.locator('strong')).toHaveText('Your GPU can help power the Grid.');
    await expect(answer.getByRole('listitem')).toHaveCount(2);
    await expect(answer.locator('pre code')).toHaveText('const model = "auto";\n');
    expect(await page.getByRole('log').evaluate(el => getComputedStyle(el).overflowY)).toBe('auto');
    const composerBox = (await page.getByRole('textbox', { name: 'Your message' }).boundingBox())!;
    expect((await page.getByRole('log').boundingBox())!.y).toBeGreaterThan(composerBox.y + composerBox.height);
    expect(await page.getByRole('article', { name: 'Your message' }).evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgba(0, 0, 0, 0)');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.getByRole('log').evaluate(el => { el.scrollTop = 0; });
    await section.screenshot({ path: `test-results/chat-response-${width}.png` });
  });
}

test('model Markdown cannot embed tracking images, HTML, or executable links', async ({ page }) => {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: 'window.turnstile={render(el,o){o.callback("fixture");return "fixture"},reset(){},remove(){}};' }));
  await page.route('**/api/demo/chat', route => route.request().method() === 'GET'
    ? route.fulfill({ json: { available: true, remaining: 3, siteKey: 'fixture' } })
    : route.fulfill({ contentType: 'application/x-ndjson', body: [
      { type: 'delta', text: '![tracker](https://tracker.invalid/pixel)\n\n<script>alert(1)</script>\n\n[bad link](javascript:alert%281%29)\n\n**Safe text**' },
      { type: 'done' },
    ].map(e => JSON.stringify(e) + '\n').join('') }));
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Your message' }).fill('Security fixture');
  await page.getByRole('button', { name: 'Send message' }).click();
  const answer = page.getByRole('article', { name: 'Grid response' });
  await expect(answer.locator('strong')).toHaveText('Safe text');
  await expect(answer.locator('img, script, iframe')).toHaveCount(0);
  await expect(answer.getByRole('link', { name: 'bad link' })).not.toHaveAttribute('href', /javascript:/i);
});

test('favicon metadata and fallback serve the same Chat artwork', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('link[rel="icon"][href="/aipg-favicon-v2.ico"]')).toHaveCount(1);
  const icon = await request.get('/aipg-favicon-v2.ico');
  const fallback = await request.get('/favicon.ico');
  expect(icon.ok()).toBeTruthy();
  expect(fallback.ok()).toBeTruthy();
  expect(await fallback.body()).toEqual(await icon.body());
});

test('waiting response has a stable unframed label and a working stop control', async ({ page }) => {
  let release!: () => void;
  const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: 'window.turnstile={render(el,o){o.callback("fixture");return "fixture"},reset(){},remove(){}};' }));
  await page.route('**/api/demo/chat', async route => {
    if (route.request().method() === 'GET') return route.fulfill({ json: { available: true, remaining: 3, siteKey: 'fixture' } });
    await gate;
    await route.fulfill({ contentType: 'application/x-ndjson', body: JSON.stringify({ type: 'done' }) + '\n' });
  });
  try {
    await page.goto('/');
    await page.getByRole('textbox', { name: 'Your message' }).fill('Waiting-state fixture');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByText('Connecting to a Grid worker...', { exact: true })).toBeVisible();
    await expect(page.getByRole('log')).toHaveAttribute('aria-busy', 'true');
    await page.getByRole('region', { name: 'Chat with the Grid' }).screenshot({ path: 'test-results/chat-waiting.png' });
    await page.getByRole('button', { name: 'Stop response' }).click();
    await expect(page.getByText('Response stopped.', { exact: true })).toBeVisible();
    await expect(page.getByRole('log')).toHaveAttribute('aria-busy', 'false');
    await expect(page.getByRole('textbox', { name: 'Your message' })).toBeFocused();
  } finally { release(); }
});

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
  await expect(page.getByRole('textbox', { name: 'Your message' })).toBeFocused();
  await page.getByRole('textbox', { name: 'Your message' }).fill('Second attempt');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect.poll(() => payloads.length).toBe(2);
  expect(payloads[1].messages).toEqual([{ role: 'user', content: 'Second attempt' }]);
});

for (const width of [320, 1280]) {
  test(`composer grows, submits with Enter, and regains focus at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const payloads: { messages: { role: string; content: string }[] }[] = [];
    await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: 'window.turnstile={render(el,o){window.__verify=o.callback;o.callback("fixture");return "fixture"},reset(){window.__verify("fixture")},remove(){}};' }));
    await page.route('**/api/demo/chat', async route => {
      if (route.request().method() === 'GET') return route.fulfill({ json: { available: true, remaining: 3, siteKey: 'fixture' } });
      payloads.push(route.request().postDataJSON());
      await route.fulfill({ contentType: 'application/x-ndjson', body: [
        { type: 'meta', remaining: 3 - payloads.length },
        { type: 'delta', text: 'Explicit layout fixture.\n\n'.repeat(50) },
        { type: 'done' },
      ].map(e => JSON.stringify(e) + '\n').join('') });
    });
    await page.goto('/');
    const input = page.getByRole('textbox', { name: 'Your message' });
    await expect(input).toBeEnabled();
    await expect(input).not.toBeFocused();
    expect((await input.boundingBox())!.height).toBe(48);
    await input.fill('Word '.repeat(150));
    await expect.poll(async () => (await input.boundingBox())!.height).toBeGreaterThan(48);
    await input.fill('Line\n'.repeat(40));
    await expect.poll(async () => (await input.boundingBox())!.height).toBe(192);
    await input.fill('First line');
    await expect.poll(async () => (await input.boundingBox())!.height).toBe(48);
    await input.press('Shift+Enter');
    await input.pressSequentially('Second line');
    await expect(input).toHaveValue('First line\nSecond line');
    expect(payloads).toHaveLength(0);
    await expect.poll(async () => (await input.boundingBox())!.height).toBe(72);
    await input.dispatchEvent('keydown', { key: 'Enter', code: 'Enter', isComposing: true });
    await input.dispatchEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 229 });
    expect(payloads).toHaveLength(0);
    await input.press('Enter');
    await expect.poll(() => payloads.length).toBe(1);
    await expect(input).toBeFocused();
    await expect(input).toHaveValue('');
    expect(payloads[0].messages[0].content).toBe('First line\nSecond line');
    const log = page.getByRole('log');
    const stageHeight = (await log.boundingBox())!.height;
    expect(await log.evaluate(el => el.scrollHeight > el.clientHeight)).toBeTruthy();
    const inputY = (await input.boundingBox())!.y;
    await input.press('Enter');
    expect(payloads).toHaveLength(1);
    await input.fill('Another question');
    await input.press('Enter');
    await expect.poll(() => payloads.length).toBe(2);
    await expect(input).toBeFocused();
    expect((await log.boundingBox())!.height).toBe(stageHeight);
    expect((await input.boundingBox())!.y).toBe(inputY);
  });
}

test('unconfigured demo is honest and offers a working product link', async ({ page }) => {
  await page.route('**/api/demo/chat', route => route.fulfill({ json: { available: false } }));
  await page.goto('/');
  await expect(page.getByText('Demo not open yet', { exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Your message' })).toBeDisabled();
  await expect(page.getByRole('link', { name: 'Continue in Chat' })).toHaveAttribute('href', 'https://aipg.chat');
  await expect(page.getByRole('link', { name: 'Video', exact: true })).toHaveAttribute('href', 'https://aipg.art/create/director');
});
