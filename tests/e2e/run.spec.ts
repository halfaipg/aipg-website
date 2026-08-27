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
    await expect(page.getByRole('button', { name: 'Linux', exact: true }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Windows', exact: true }).first()).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Find the useful path for your machine' }),
    ).toBeVisible();
    await expect(page.getByLabel('GPU or accelerator model')).toBeVisible();
    await expect(page.getByLabel('GPU VRAM')).toHaveValue('24');
    await expect(page.getByLabel('Expected text speed')).toHaveValue('0');
    await expect(page.getByText(/not a payout forecast/i)).toBeVisible();

    await page.getByLabel('GPU or accelerator model').fill('RTX 3090');
    await page.getByLabel('Expected text speed').fill('42');
    await expect(
      page.getByRole('heading', { name: 'Start with the live text worker' }),
    ).toBeVisible();
    await expect(page.getByText('RTX 3090', { exact: true })).toBeVisible();

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
    await expect(page.getByRole('button', { name: 'macOS' }).first()).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await page
      .getByRole('group', { name: 'Operating system' })
      .getByRole('button', { name: 'macOS' })
      .click();
    await page.getByLabel('Accelerator type', { exact: true }).selectOption('apple');
    await expect(
      page.getByRole('heading', { name: 'Start with the text worker and your existing backend' }),
    ).toBeVisible();

    const overflow = await page.evaluate(() =>
      Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) >
      window.innerWidth,
    );
    expect(overflow).toBe(false);

    await page.screenshot({ path: 'test-results/run-mobile.png', fullPage: true });
  });
});

test.describe('/validate smoke', () => {
  test('states the preview trust boundary and renders verified preview downloads', async ({ page }) => {
    const response = await page.goto('/validate', { waitUntil: 'networkidle' });

    expect(response?.ok()).toBeTruthy();
    await expect(
      page.getByRole('heading', { name: 'Check the Grid independently.' }),
    ).toBeVisible();
    await expect(page.getByText(/no validator rewards, staking, slashing/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Install validator/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Join preview cohort/i })).toHaveAttribute(
      'href',
      'https://github.com/AIPowerGrid/grid-validator/issues/5',
    );
    await expect(page.getByRole('link', { name: /Volunteer to run a node/i })).toHaveAttribute(
      'href',
      'https://github.com/AIPowerGrid/grid-validator/issues/5',
    );
    await expect(page.getByRole('link', { name: /Cohort runbook/i })).toHaveAttribute(
      'href',
      'https://github.com/AIPowerGrid/grid-validator/blob/master/PREVIEW_COHORT.md',
    );
    await expect(page.getByText('aipg-validator prepare-wallet')).toBeVisible();
    await expect(page.getByRole('link', { name: /Link wallet and create key/i })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Download verified installer' })).toHaveAttribute(
      'href',
      /releases\/download\/v0\.1\.0-preview\.8\/install-validator\.sh$/,
    );
    await expect(page.getByRole('link', { name: 'Linux x64' })).toHaveAttribute(
      'href',
      /releases\/download\/v0\.1\.0-preview\.8\/aipg-validator-linux-x64\.zip$/,
    );
    await expect(page.getByRole('link', { name: 'Windows x64' })).toHaveAttribute(
      'href',
      /releases\/download\/v0\.1\.0-preview\.8\/aipg-validator-windows-x64\.zip$/,
    );
    await expect(
      page.getByText('docker pull ghcr.io/aipowergrid/validator:v0.1.0-preview.8'),
    ).toBeVisible();

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

test.describe('/status smoke', () => {
  test('renders an honest aggregate status or feed-unavailable state', async ({ page }) => {
    const browserErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') browserErrors.push(message.text());
    });
    page.on('pageerror', (error) => browserErrors.push(`pageerror: ${error.message}`));

    const response = await page.goto('/status', { waitUntil: 'networkidle' });
    expect(response?.ok()).toBeTruthy();
    await expect(page.getByText('Network status', { exact: true }).first()).toBeVisible();
    const live = page.getByRole('heading', { name: /AI Power Grid is (operational|degraded)/i });
    const unavailable = page.getByRole('heading', { name: 'Live status feed unavailable' });
    expect((await live.count()) + (await unavailable.count())).toBe(1);
    const overflow = await page.evaluate(() =>
      Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) >
      window.innerWidth,
    );
    expect(overflow).toBe(false);
    expect(browserErrors, `browser errors on /status:\n${browserErrors.join('\n')}`).toEqual([]);
  });
});

test.describe('/status mobile smoke', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('keeps network status readable without page overflow', async ({ page }) => {
    await page.goto('/status', { waitUntil: 'networkidle' });
    await expect(page.getByText('Network status', { exact: true }).first()).toBeVisible();
    const overflow = await page.evaluate(() =>
      Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) >
      window.innerWidth,
    );
    expect(overflow).toBe(false);
    await page.screenshot({ path: 'test-results/status-mobile.png', fullPage: true });
  });
});
