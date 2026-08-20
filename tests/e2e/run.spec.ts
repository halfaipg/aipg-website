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
    await expect(page.getByRole('button', { name: 'Text worker' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Media manager' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Linux', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Windows', exact: true })).toBeVisible();

    const download = page.getByRole('link', { name: /Download .* for/ });
    const releaseGate = page.getByRole('button', {
      name: /release unavailable|qualification in progress/i,
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
    await expect(page.getByRole('button', { name: 'macOS' })).toHaveAttribute(
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

test.describe('/validate smoke', () => {
  test('states the preview trust boundary and renders a gated release path', async ({ page }) => {
    const response = await page.goto('/validate', { waitUntil: 'networkidle' });

    expect(response?.ok()).toBeTruthy();
    await expect(
      page.getByRole('heading', { name: 'Check the Grid independently.' }),
    ).toBeVisible();
    await expect(page.getByText(/no validator rewards, staking, slashing/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Create validator key/i })).toBeVisible();

    const overflow = await page.evaluate(() =>
      Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) >
      window.innerWidth,
    );
    expect(overflow).toBe(false);
  });
});

test.describe('/validate mobile smoke', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('keeps validator onboarding readable without horizontal overflow', async ({ page }) => {
    await page.goto('/validate', { waitUntil: 'networkidle' });
    await expect(
      page.getByRole('heading', { name: 'Check the Grid independently.' }),
    ).toBeVisible();
    const overflow = await page.evaluate(() =>
      Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) >
      window.innerWidth,
    );
    expect(overflow).toBe(false);
    await page.screenshot({ path: 'test-results/validate-mobile.png', fullPage: true });
  });
});
