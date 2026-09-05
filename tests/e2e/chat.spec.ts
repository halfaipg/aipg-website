// SPDX-License-Identifier: AGPL-3.0-or-later
import { test, expect } from '@playwright/test';

const automaticVerification = `window.turnstile={render(el,o){window.__verify=o.callback;return "fixture"},execute(){window.__verify("browser-test-only")},remove(){}};`;

test('simulated chat preview is unavailable in production', async ({ request }) => {
  const response = await request.get('/chat-preview');
  expect(response.status()).toBe(404);
});

for (const width of [320, 1280]) {
  for (const edge of ['top', 'bottom']) {
    test(`opening near the ${edge} keeps the expanded chat visible at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 720 });
      await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: automaticVerification }));
      await page.route('**/api/demo/chat', route => route.request().method() === 'GET'
        ? route.fulfill({ json: { available: true, remaining: 15, limit: 15 } })
        : route.fulfill({ contentType: 'application/x-ndjson', body: '{"type":"delta","text":"Local fixture reply"}\n{"type":"done"}\n' }));
      await page.goto('/');
      const input = page.getByRole('textbox', { name: 'Your message' });
      await input.fill('Test opening the chat');
      await input.evaluate((el, edge) => {
        window.scrollBy({ top: el.getBoundingClientRect().top - (edge === 'top' ? 120 : window.innerHeight - 150), behavior: 'instant' });
      }, edge);
      await input.press('Enter');
      await expect(page.getByText('Local fixture reply')).toBeVisible();
      const bounds = await input.evaluate(el => ({
        top: el.closest('form')!.getBoundingClientRect().top,
        bottom: el.closest('form')!.getBoundingClientRect().bottom,
        header: document.querySelector('header')!.getBoundingClientRect().bottom,
        viewport: window.innerHeight,
      }));
      expect(bounds.top).toBeGreaterThanOrEqual(bounds.header + 15);
      expect(bounds.bottom).toBeLessThanOrEqual(bounds.viewport - 15);
    });
  }
}

for (const width of [320, 1280]) {
  test(`streaming holds the input still and respects scroll-up at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: automaticVerification }));
    await page.route('**/api/demo/chat', route => route.fulfill({ json: { available: true, remaining: 15, limit: 15 } }));
    await page.addInitScript(() => {
      const original = window.fetch.bind(window);
      window.fetch = (url, options) => {
        if (url !== '/api/demo/chat' || options?.method !== 'POST') return original(url, options);
        return Promise.resolve(new Response(new ReadableStream({ start(controller) {
          const encode = (value: object) => new TextEncoder().encode(JSON.stringify(value) + '\n');
          (window as unknown as { chatFixture: { append: (text: string) => void; finish: () => void } }).chatFixture = {
            append: text => controller.enqueue(encode({ type: 'delta', text })),
            finish: () => { controller.enqueue(encode({ type: 'done' })); controller.close(); },
          };
          controller.enqueue(encode({ type: 'meta', remaining: 14 }));
        } }), { headers: { 'content-type': 'application/x-ndjson' } }));
      };
    });
    await page.goto('/');
    const input = page.getByRole('textbox', { name: 'Your message' });
    await input.fill('A controlled streaming fixture');
    await input.press('Enter');
    await expect(page.getByText('14 / 15 free turns left today')).toBeVisible();
    const position = () => input.evaluate(el => ({ y: el.getBoundingClientRect().top, scroll: window.scrollY }));
    const initial = await position();
    const append = (text: string) => page.evaluate(text => (window as unknown as { chatFixture: { append: (text: string) => void } }).chatFixture.append(text), text);
    await append('Explicit streaming fixture.\n\n'.repeat(50));
    const log = page.getByRole('log');
    await expect.poll(() => log.evaluate(el => el.scrollHeight - el.clientHeight - el.scrollTop)).toBeLessThan(2);
    expect(await position()).toEqual(initial);
    await log.evaluate(el => { el.scrollTop = 0; });
    const jump = page.getByRole('button', { name: 'Jump to latest' });
    await expect(jump).toBeVisible();
    await append('More fixture output.\n\n'.repeat(10));
    await expect.poll(() => log.evaluate(el => el.scrollTop)).toBe(0);
    expect(await position()).toEqual(initial);
    await jump.click();
    await expect(jump).toHaveCount(0);
    await expect.poll(() => log.evaluate(el => el.scrollHeight - el.clientHeight - el.scrollTop)).toBeLessThan(2);
    await page.evaluate(() => (window as unknown as { chatFixture: { finish: () => void } }).chatFixture.finish());
    await expect(input).toBeFocused();
    await page.getByRole('region', { name: 'Chat with the Grid' }).screenshot({ path: `test-results/chat-anchored-${width}.png` });
  });
}

test('fifteen turns preserve context and quota survives clearing and refresh', async ({ page }) => {
  let remaining = 15;
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({
    contentType: 'application/javascript',
    body: automaticVerification,
  }));
  await page.route('**/api/demo/chat', async route => {
    if (route.request().method() === 'GET') return route.fulfill({ json: { available: true, remaining, siteKey: 'fixture' } });
    const body = route.request().postDataJSON();
    expect(Object.keys(body).sort()).toEqual(['messages', 'token']);
    expect(body.messages.at(-1).role).toBe('user');
    expect(body.messages).toHaveLength((15 - remaining) * 2 + 1);
    expect(body.messages[0].content).toBe('Remember my project is called Sunflower');
    if (remaining < 15) expect(body.messages[1].content).toBe('Browser test response, not live inference.');
    remaining -= 1;
    await route.fulfill({ contentType: 'application/x-ndjson', body: [
      { type: 'meta', remaining }, { type: 'model', model: 'fixture-model' },
      { type: 'delta', text: 'Browser test response, not live inference.' }, { type: 'done', truncated: false, stats: { worker: 'fixture-community-worker', tokens_per_s: 42.5678, gen_time: 2.345, ttft: 0.123, output_tokens: 93 } },
    ].map(item => JSON.stringify(item) + '\n').join('') });
  });
  await page.goto('/');
  await page.getByRole('link', { name: 'Try the Grid', exact: true }).click();
  const input = page.getByRole('textbox', { name: 'Your message' });
  for (let i = 0; i < 15; i++) {
    await input.fill(i === 0 ? 'Remember my project is called Sunflower' : `Follow-up ${i}: what is my project called?`);
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByText(`${14-i} / 15 free turns left today`)).toBeVisible();
    await expect(page.getByText('Browser test response, not live inference.')).toBeVisible();
    await expect(page.getByText('fixture-model', { exact: true })).toBeVisible();
    await expect(page.getByText('fixture-community-worker', { exact: true })).toBeVisible();
    await expect(page.getByText('42.6 tok/s', { exact: true })).toBeVisible();
    await expect(page.getByText('93 output tokens', { exact: true })).toBeVisible();
  }
  await page.getByRole('button', { name: 'Clear conversation' }).click();
  await expect(input).toBeDisabled();
  await expect(page.getByRole('link', { name: 'Continue in Chat' })).toHaveAttribute('href', 'https://aipg.chat');
  await page.reload();
  await expect(page.getByText('0 / 15 free turns left today')).toBeVisible();
  await expect(input).toBeDisabled();
});

for (const width of [320, 390, 768, 1280, 1920]) {
  test(`compact composer and long response provenance fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: automaticVerification }));
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
    const logBox = (await page.getByRole('log').boundingBox())!;
    expect(logBox.y + logBox.height).toBeLessThanOrEqual(composerBox.y);
    expect(logBox.height).toBeLessThanOrEqual(256);
    await expect(page.locator('#try-grid form').getByRole('log')).toBeVisible();
    await expect(page.getByRole('article', { name: 'Your message' })).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.getByRole('log').evaluate(el => { el.scrollTop = 0; });
    await section.screenshot({ path: `test-results/chat-response-${width}.png` });
  });
}

test('model Markdown cannot embed tracking images, HTML, or executable links', async ({ page }) => {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: automaticVerification }));
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
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: automaticVerification }));
  await page.route('**/api/demo/chat', async route => {
    if (route.request().method() === 'GET') return route.fulfill({ json: { available: true, remaining: 3, siteKey: 'fixture' } });
    await gate;
    await route.fulfill({ contentType: 'application/x-ndjson', body: JSON.stringify({ type: 'done' }) + '\n' });
  });
  try {
    await page.goto('/');
    await page.getByRole('textbox', { name: 'Your message' }).fill('Waiting-state fixture');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.getByRole('status').filter({ hasText: 'Thinking...' })).toBeVisible();
    await expect(page.getByText('Connecting to a Grid worker...', { exact: true })).toHaveCount(0);
    await expect(page.getByText('No response received.', { exact: true })).toHaveCount(0);
    await expect(page.getByRole('log')).toHaveAttribute('aria-busy', 'true');
    await page.getByRole('region', { name: 'Chat with the Grid' }).screenshot({ path: 'test-results/chat-waiting.png' });
    await page.getByRole('button', { name: 'Stop response' }).click();
    await expect(page.getByText('Response stopped.', { exact: true })).toBeVisible();
    await expect(page.getByText('Thinking...', { exact: true })).toHaveCount(0);
    await expect(page.getByRole('log')).toHaveAttribute('aria-busy', 'false');
    await expect(page.getByRole('textbox', { name: 'Your message' })).toBeFocused();
  } finally { release(); }
});

for (const width of [320, 1280]) {
  test(`follow-up thinking stays quiet and keeps the composer anchored at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    let release!: () => void;
    const gate = new Promise<void>(resolve => { release = resolve; });
    let requests = 0;
    await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: automaticVerification }));
    await page.route('**/api/demo/chat', async route => {
      if (route.request().method() === 'GET') return route.fulfill({ json: { available: true, remaining: 15, siteKey: 'fixture' } });
      requests++;
      if (requests === 2) {
        expect(route.request().postDataJSON().messages).toHaveLength(3);
        await gate;
      }
      return route.fulfill({ contentType: 'application/x-ndjson', body: [
        { type: 'model', model: 'fixture-model' },
        { type: 'delta', text: `Fixture answer ${requests}` },
        { type: 'done' },
      ].map(item => JSON.stringify(item) + '\n').join('') });
    });
    try {
      await page.goto('/');
      const input = page.getByRole('textbox', { name: 'Your message' });
      await input.fill('First question');
      await input.press('Enter');
      await expect(input).toBeEnabled();
      await expect(page.getByText('Fixture answer 1', { exact: true })).toBeVisible();
      await input.fill('Follow-up question');
      const position = () => input.evaluate(el => ({ y: el.getBoundingClientRect().top, scroll: window.scrollY }));
      const before = await position();
      await input.press('Enter');
      await expect(page.getByText('Thinking...', { exact: true })).toBeVisible();
      await expect(page.getByRole('article', { name: 'Grid response' })).toHaveText('GridThinking...');
      expect(await position()).toEqual(before);
      await page.screenshot({ path: `test-results/chat-thinking-${width}.png` });
      release();
      await expect(page.getByText('Fixture answer 2', { exact: true })).toBeVisible();
      await expect(page.getByText('Thinking...', { exact: true })).toHaveCount(0);
      await expect(input).toBeFocused();
      expect(await position()).toEqual(before);
    } finally { release(); }
  });
}

test('demo reports interrupted output and never replays a failed turn', async ({ page }) => {
  const payloads: { messages: { role: string; content: string }[] }[] = [];
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: automaticVerification }));
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
    await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: automaticVerification }));
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
    // Compare panel coordinates; Playwright's scroll-into-view may still settle.
    const inputOffset = () => input.evaluate(el => el.getBoundingClientRect().top - el.closest('form')!.getBoundingClientRect().top);
    const inputY = await inputOffset();
    await input.press('Enter');
    expect(payloads).toHaveLength(1);
    await input.fill('Another question');
    await input.press('Enter');
    await expect.poll(() => payloads.length).toBe(2);
    await expect(input).toBeFocused();
    expect(payloads[1].messages.map(m => m.role)).toEqual(['user', 'assistant', 'user']);
    await expect(page.getByRole('article', { name: 'Grid response' })).toHaveCount(1);
    expect((await log.boundingBox())!.height).toBe(stageHeight);
    expect(await inputOffset()).toBe(inputY);
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

for (const width of [320, 1280]) {
  test(`verification runs only on send and never replaces the reply at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    let submissions = 0;
    await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({
      contentType: 'application/javascript',
      body: `window.turnstile={render(el,o){
        if(o.appearance!=="interaction-only"||o.execution!=="execute")throw Error("Expected deferred verification");
        window.__fixtureSolve=()=>{el.replaceChildren();o.callback("fixture-token");};
        window.__fixtureChallenge=()=>{const b=document.createElement("button");b.type="button";b.textContent="Complete verification (fixture)";b.onclick=window.__fixtureSolve;el.replaceChildren(b);};
        window.__fixtureExpire=()=>o["expired-callback"]();
        window.__fixtureRemove=()=>el.replaceChildren();return "fixture";
      },execute(){window.__fixtureChallenge();},reset(){throw Error("Must not reset after a reply");},remove(){window.__fixtureRemove();}};`,
    }));
    await page.route('**/api/demo/chat', route => {
      if (route.request().method() === 'GET') return route.fulfill({ json: { available: true, remaining: 3, siteKey: 'fixture' } });
      submissions++;
      expect(route.request().postDataJSON().token).toBe('fixture-token');
      return route.fulfill({ contentType: 'application/x-ndjson', body: [
        { type: 'meta', remaining: 14 }, { type: 'delta', text: 'Explicit fixture: the reply stays inside the composer.' }, { type: 'done' },
      ].map(e => JSON.stringify(e) + '\n').join('') });
    });
    await page.goto('/');
    const input = page.getByRole('textbox', { name: 'Your message' });
    const verify = page.getByRole('button', { name: 'Complete verification (fixture)' });
    const log = page.locator('[role="log"]');
    const slot = page.locator('[aria-label="Message verification"]');
    await expect(verify).toHaveCount(0);
    await input.fill('A test prompt');
    await input.press('Enter');
    await expect(verify).toBeVisible();
    expect(submissions).toBe(0);
    await expect(page.getByText('Verifying...', { exact: true })).toBeVisible();
    await verify.click();
    await expect(verify).toHaveCount(0);
    await expect.poll(async () => (await slot.boundingBox())!.height).toBe(0);
    await expect(page.getByText('Explicit fixture: the reply stays inside the composer.')).toBeVisible();
    await expect(input).toBeFocused();
    const logBox = (await log.boundingBox())!;
    expect(logBox.height).toBeLessThanOrEqual(256);
    const formBox = (await page.locator('#try-grid form').boundingBox())!;
    expect(logBox.y).toBeGreaterThan(formBox.y);
    expect(logBox.y + logBox.height).toBeLessThanOrEqual((await input.boundingBox())!.y);
    await page.getByRole('region', { name: 'Chat with the Grid' }).screenshot({ path: `test-results/chat-integrated-${width}.png` });
    await input.fill('Another test prompt');
    await input.press('Enter');
    await expect(verify).toBeVisible();
    await expect(log).toBeVisible();
    await expect(page.getByText('Explicit fixture: the reply stays inside the composer.')).toBeVisible();
    // An expired challenge cannot dispatch or erase the draft/completed context.
    await page.evaluate(() => (window as unknown as { __fixtureExpire: () => void }).__fixtureExpire());
    await expect(page.getByText('Verification expired. Please try again.')).toBeVisible();
    await expect(input).toHaveValue('Another test prompt');
    await expect(input).toBeFocused();
    expect(submissions).toBe(1);
    await input.press('Enter');
    await expect(verify).toBeVisible();
    await page.getByRole('button', { name: 'Stop response' }).click();
    await expect(input).toBeFocused();
    await expect(verify).toHaveCount(0);
    expect(submissions).toBe(1);
    await input.press('Enter');
    await verify.click();
    await expect.poll(() => submissions).toBe(2);
    await expect(verify).toHaveCount(0);
  });
}
