// SPDX-License-Identifier: AGPL-3.0-or-later
import { test, expect } from '@playwright/test';
import path from 'node:path';

const asset = 'https://media.aipg.art/image/browser-fixture/0.webp';
const prompt = 'Explicit browser fixture: a futuristic city';
const verification = `window.turnstile={render(el,o){window.__verify=o.callback;return "fixture"},execute(){window.__verify("browser-test-only")},remove(){}};`;
const lines = (events: object[]) => events.map(e => JSON.stringify(e) + '\n').join('');

for (const width of [320, 390, 1280]) test(`image result, quota and follow-up context fit at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 900 });
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: verification }));
  // A local raster fixture, not a live generated result.
  await page.route(asset, route => route.fulfill({ path: path.resolve('public/AIPG_grid.png'), contentType: 'image/png' }));
  const payloads: { messages: {role: string; content: string}[] }[] = [];
  await page.route('**/api/demo/chat', route => {
    if (route.request().method() === 'GET') return route.fulfill({ json: { available: true, remaining: 15 - payloads.length, limit: 15, images: { limit: 2, remaining: payloads.length ? 1 : 2, model: 'z-image-turbo' } } });
    payloads.push(route.request().postDataJSON());
    return route.fulfill({ contentType: 'application/x-ndjson', body: lines(payloads.length === 1 ? [
      { type: 'meta', remaining: 14 },
      { type: 'image_start', model: 'z-image-turbo', remaining: 1 },
      { type: 'image', url: asset, prompt, model: 'z-image-turbo' },
      { type: 'done', stats: { worker: 'fixture-worker', gen_time: 2.3 } },
    ] : [{ type: 'delta', text: 'Fixture follow-up: I have the description, not visual access to the image.' }, { type: 'done' }]) });
  });
  await page.goto('/');
  const input = page.getByRole('textbox', { name: 'Your message' });
  await input.fill('Generate a city image');
  await input.press('Enter');
  const image = page.getByRole('img', { name: prompt });
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await expect(page.getByText('1 / 2 images left today')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open image', exact: true })).toHaveAttribute('href', asset);
  await expect(input).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  const log = page.getByRole('log');
  const imageBox = (await image.boundingBox())!;
  const logBox = (await log.boundingBox())!;
  expect(imageBox.y).toBeGreaterThanOrEqual(logBox.y);
  expect(imageBox.y + imageBox.height).toBeLessThanOrEqual(logBox.y + logBox.height);
  await page.getByRole('region', { name: 'Chat with the Grid' }).screenshot({ path: `test-results/chat-image-${width}.png` });
  await input.fill('What did we generate?');
  await input.press('Enter');
  await expect(page.getByText('Fixture follow-up: I have the description, not visual access to the image.')).toBeVisible();
  expect(payloads[1].messages.map(m => m.role)).toEqual(['user', 'assistant', 'user']);
  expect(payloads[1].messages[1].content).toContain(prompt);
  expect(JSON.stringify(payloads[1])).not.toContain(asset);
  await page.getByRole('button', { name: 'Clear conversation' }).click();
  await expect(page.getByText('1 / 2 images left today')).toBeVisible();
  await page.reload();
  await expect(page.getByText('1 / 2 images left today')).toBeVisible();
});

test('image quota or invalid asset does not block later text or replay a failed image', async ({ page }) => {
  await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*', route => route.fulfill({ contentType: 'application/javascript', body: verification }));
  let calls = 0;
  await page.route('**/api/demo/chat', route => {
    if (route.request().method() === 'GET') return route.fulfill({ json: { available: true, remaining: 15, images: { remaining: 1 } } });
    calls++;
    expect(route.request().postDataJSON().messages).toHaveLength(1);
    return route.fulfill({ contentType: 'application/x-ndjson', body: lines(calls === 1 ? [
      { type: 'image', url: 'https://tracker.invalid/secret', prompt, model: 'z-image-turbo' }, { type: 'done' },
    ] : calls === 2 ? [
      { type: 'image_quota', remaining: 0 }, { type: 'error', message: 'Your free image allowance is used. You can keep chatting.' },
    ] : [{ type: 'delta', text: 'Normal text still works (fixture).' }, { type: 'done' }]) });
  });
  await page.goto('/');
  const input = page.getByRole('textbox', { name: 'Your message' });
  await input.fill('First image'); await input.press('Enter');
  await expect(page.getByText('The image could not be displayed.')).toBeVisible();
  await expect(page.getByRole('article', { name: 'Grid response' }).locator('img')).toHaveCount(0);
  await input.fill('Second image'); await input.press('Enter');
  await expect(page.getByText('0 / 2 images left today')).toBeVisible();
  await expect(input).toBeEnabled();
  await input.fill('Tell me a joke'); await input.press('Enter');
  await expect(page.getByText('Normal text still works (fixture).')).toBeVisible();
});
