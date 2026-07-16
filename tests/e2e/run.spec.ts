import { expect, test } from '@playwright/test';

test.describe('/run smoke', () => {
  test('renders the release-gated worker download surface', async ({ page }) => {
    const browserErrors: string[] = [];

    page.on('console', (message) => {
      if (message.type() === 'error') browserErrors.push(message.text());
    });
    page.on('pageerror', (error) => {
      browserErrors.push(`pageerror: ${error.message}`);
    });

    const response = await page.goto('/run', { waitUntil: 'networkidle' });

    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole('heading', { name: 'Run AI Power Grid' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Linux' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Windows' })).toBeVisible();

    const download = page.getByRole('link', { name: /Download for/ });
    const releaseGate = page.getByRole('button', {
      name: 'Release qualification in progress',
    });
    expect((await download.count()) + (await releaseGate.count())).toBe(1);

    const overflow = await page.evaluate(() =>
      Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) >
      window.innerWidth,
    );
    expect(overflow).toBe(false);
    expect(browserErrors, `browser errors on /run:\n${browserErrors.join('\n')}`).toEqual([]);
  });
});

test.describe('/run mobile smoke', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('keeps the download path readable without horizontal overflow', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'userAgentData', {
        get: () => ({ platform: 'Darwin' }),
      });
      Object.defineProperty(navigator, 'platform', { get: () => 'Darwin' });
      Object.defineProperty(navigator, 'userAgent', {
        get: () => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      });
    });
    await page.goto('/run', { waitUntil: 'networkidle' });

    await expect(page.getByRole('heading', { name: 'Run AI Power Grid' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Linux' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    const overflow = await page.evaluate(() =>
      Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) >
      window.innerWidth,
    );
    expect(overflow).toBe(false);

    await page.screenshot({ path: 'test-results/run-mobile.png', fullPage: true });
  });
});
