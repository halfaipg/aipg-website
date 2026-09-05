import { test, expect } from '@playwright/test';

for (const [width, height] of [[320, 740], [390, 844], [768, 1024], [1280, 720], [1920, 1080]]) {
  test(`homepage gives users and workers a first-screen action at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('img', { name: 'AI Power Grid emblem' })).toBeVisible();
    await expect(page.locator('main img[src*="operator-worker-hero"]')).toHaveCount(0);
    for (const name of ['Try the Grid', 'Provide compute', 'Build with the API']) {
      const link = page.getByRole('link', { name, exact: true });
      await expect(link).toBeVisible();
      const box = await link.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.y + box!.height).toBeLessThan(height);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const nextSection = page.getByRole('heading', { name: 'Chat with the Grid' });
    expect((await nextSection.boundingBox())!.y).toBeLessThan(height);
    await expect(page.getByRole('link', { name: 'Open music studio' })).toHaveAttribute('href', 'https://aipg.music');
    await expect(page.getByText(/Core routing is coordinated today/)).toBeVisible();
    await expect(page.getByText(/No staking, rewards, routing authority, or slashing in the preview/)).toBeVisible();
    const preview = page.getByRole('img', { name: /AIPG gallery preview/ });
    await preview.scrollIntoViewIfNeeded();
    await expect.poll(() => preview.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0), { timeout: 15000 }).toBe(true);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await page.screenshot({ path: `test-results/home-${width}.png`, fullPage: true });
    await page.screenshot({ path: `test-results/home-viewport-${width}.png` });
    if (width < 1280) {
      const toggle = page.getByRole('button', { name: 'Toggle navigation' });
      const navRun = page.getByRole('navigation', { name: 'Global' }).getByRole('link', { name: 'Run', exact: true });
      await toggle.click();
      await expect(navRun).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      await toggle.click();
      await expect(navRun).toBeHidden();
    }
    expect(errors).toEqual([]);
  });
}

test('homepage core offer is readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'AI Power Grid', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Try the Grid', exact: true })).toBeVisible();
  await context.close();
});
