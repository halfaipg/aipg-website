// SPDX-License-Identifier: AGPL-3.0-or-later
import { expect, test } from '@playwright/test';

const pages = [
  { path: '/', image: 'home-v1.png', title: 'AI Power Grid - Community-Powered AI Generation' },
  { path: '/run', image: 'run-v1.png', title: 'Run an AI Power Grid Worker' },
  { path: '/validate', image: 'validate-v1.png', title: 'Run an AI Power Grid Validator' },
];

test.use({ javaScriptEnabled: false });

for (const entry of pages) {
  test(`${entry.path} serves route-specific social metadata without JavaScript`, async ({ page, request }) => {
    await page.goto(entry.path);
    const image = `https://aipowergrid.io/social/${entry.image}`;
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', image);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', image);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', entry.title);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', `https://aipowergrid.io${entry.path}`);
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute('content', /\S+/);
    const response = await request.get(`/social/${entry.image}`);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/png');
    const bytes = await response.body();
    expect(bytes.length).toBeLessThan(5_000_000);
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', String(bytes.readUInt32BE(16)));
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', String(bytes.readUInt32BE(20)));
  });
}

test('/use retains the canonical developer-guide redirect', async ({ request }) => {
  const response = await request.get('/use', { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe('https://aipowergrid.io/docs/integrations');
});
