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
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'share', {
        configurable: true,
        value: undefined,
      });
    });

    await page.route('https://api.aipowergrid.io/v1/workers', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          count: 1,
          workers: [
            {
              id: 'worker-e2e-123',
              name: 'E2E Worker',
              online: true,
              models: ['gpt-oss-120b'],
              job_types: ['text'],
            },
          ],
        }),
      });
    });

    const response = await page.goto('/run', { waitUntil: 'domcontentloaded' });

    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole('heading', { name: 'Run AI Power Grid' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Text worker' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Media manager' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Linux', exact: true }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Windows', exact: true }).first()).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Find the useful path for your machine' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Help qualify the media worker.' }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'View cohort status' })).toHaveAttribute(
      'href',
      'https://github.com/AIPowerGrid/grid-media-worker/issues/8',
    );
    await expect(page.locator('[data-operator-planner-ready="true"]')).toBeAttached();
    await expect(page.getByLabel('GPU or accelerator model')).toBeVisible();
    await expect(page.getByLabel('GPU VRAM')).toHaveValue('24');
    await expect(page.getByLabel('Expected text speed')).toHaveValue('0');
    await expect(page.getByText('Network-priority text route')).toBeVisible();
    const shareOpening = page.getByRole('button', { name: 'Share opening' });
    await expect(shareOpening).toBeVisible();
    await shareOpening.click();
    await expect(page.getByRole('status')).toHaveText('Opening copied.');
    await expect
      .poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toMatch(/Independent GPU operators wanted.*Historical workload is not an earnings forecast.*https:\/\/aipowergrid\.io\/run/);
    await expect(
      page.getByText(/Priority uses accepted den and missing replicas/i),
    ).toBeVisible();
    await expect(
      page.getByText(/Jobs per worker is a rough workload-share signal, not a payout forecast/i),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Check the rail before you commit a GPU' })).toBeVisible();
    await expect(page.getByText(/arithmetic on settled history, not a payout forecast/i)).toBeVisible();
    await expect(page.getByText(/One verified binary opens the local setup wizard/i)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Join the text cohort' })).toHaveAttribute(
      'href',
      'https://github.com/AIPowerGrid/grid-text-worker/issues/10',
    );
    await expect(page.getByRole('link', { name: 'Register other hardware' })).toHaveAttribute(
      'href',
      'https://github.com/halfaipg/aipg-website/issues/new?template=operator-interest.yml',
    );

    await page.getByPlaceholder('Worker name or ID').fill('E2E Worker');
    await page.getByRole('button', { name: 'Check now' }).click();
    await expect(page.getByText('Online in the public registry')).toBeVisible();
    await expect(page.getByText('Models: gpt-oss-120b')).toBeVisible();

    await page.getByLabel('GPU or accelerator model').fill('RTX 3090');
    await page.getByLabel('Expected text speed').fill('42');
    await expect(
      page.getByRole('heading', {
        name: /Start with the verified text worker|Prepare for the hardened text-worker release/,
      }),
    ).toBeVisible();
    await expect(page.getByText('RTX 3090', { exact: true })).toBeVisible();

    const download = page.getByRole('link', { name: /Download .* for/ });
    const releaseGate = page.getByRole('button', {
      name: /release unavailable|qualification in progress|not .*signed/i,
    });
    expect((await download.count()) + (await releaseGate.count())).toBe(1);

    await page.getByRole('button', { name: 'Linux', exact: true }).first().click();
    await expect(
      page.getByRole('link', { name: /Download text worker for Linux/ }),
    ).toHaveAttribute(
      'href',
      /grid-text-worker\/releases\/download\/v0\.3\.6\/grid-inference-worker-linux-x64$/,
    );
    await expect(page.getByRole('heading', { name: 'First run on Linux' })).toBeVisible();
    await expect(
      page.getByText(/chmod \+x grid-inference-worker-linux-x64/),
    ).toBeVisible();
    await expect(page.getByText(/Enter it only in the local wizard/)).toBeVisible();
    await expect(page.getByText(/never needs a wallet private key/i)).toBeVisible();

    await page.getByRole('button', { name: 'macOS', exact: true }).first().click();
    await expect(
      page.getByRole('button', { name: /macOS build is not Developer ID signed/i }),
    ).toBeVisible();

    await page.getByRole('button', { name: 'Windows', exact: true }).first().click();
    await expect(
      page.getByRole('button', { name: /Windows build is not Authenticode signed/i }),
    ).toBeVisible();

    await page
      .getByRole('group', { name: 'Operating system' })
      .getByRole('button', { name: 'Linux' })
      .click();
    await expect(
      page.getByRole('heading', { name: 'Start with the verified text worker' }),
    ).toBeVisible();

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
    const browserErrors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') browserErrors.push(message.text());
    });
    page.on('pageerror', (error) => {
      browserErrors.push(`pageerror: ${error.message}`);
    });
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'userAgentData', {
        get: () => ({ platform: 'Darwin' }),
      });
      Object.defineProperty(navigator, 'platform', { get: () => 'Darwin' });
      Object.defineProperty(navigator, 'userAgent', {
        get: () => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      });
    });
    await page.goto('/run', { waitUntil: 'domcontentloaded' });

    await expect(page.getByRole('heading', { name: 'Run AI Power Grid' })).toBeVisible();
    await expect(page.locator('[data-operator-planner-ready="true"]')).toBeAttached();
    await expect(page.getByRole('button', { name: 'macOS' }).first()).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(
      page
        .getByRole('group', { name: 'Operating system' })
        .getByRole('button', { name: 'macOS' }),
    ).toHaveAttribute('aria-pressed', 'true');
    await page.getByLabel('Accelerator type', { exact: true }).selectOption('apple');
    await expect(
      page.getByRole('heading', {
        name: /Start with the text worker and your existing backend|Prepare an existing backend for the text-worker candidate/,
      }),
    ).toBeVisible();

    const overflow = await page.evaluate(() =>
      Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) >
      window.innerWidth,
    );
    expect(overflow).toBe(false);
    expect(browserErrors, `browser errors on mobile /run:\n${browserErrors.join('\n')}`).toEqual([]);

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
    await expect(page.getByText('aipg-validator app', { exact: true })).toBeVisible();
    await expect(page.getByText(/Choose 8 to open the local operator app/)).toBeVisible();
    await expect(page.getByText(/Set up node, confirm, and Start validator/)).toBeVisible();
    await expect(page.getByText(/Exit app stops its node and closes the local server/)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Full setup and headless server guide' })).toHaveAttribute(
      'href', 'https://aipowergrid.io/docs/validator-node',
    );
    await expect(page.getByText(/Existing-account pairing is not available yet/)).toBeVisible();
    await expect(page.getByRole('link', { name: /Link wallet and create key/i })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Download verified installer' })).toHaveAttribute(
      'href',
      /releases\/download\/v0\.1\.0-preview\.13\/install-validator\.sh$/,
    );
    await expect(page.getByRole('link', { name: 'Linux x64' })).toHaveAttribute(
      'href',
      /releases\/download\/v0\.1\.0-preview\.13\/aipg-validator-linux-x64\.zip$/,
    );
    await expect(page.getByRole('link', { name: 'Windows x64' })).toHaveAttribute(
      'href',
      /releases\/download\/v0\.1\.0-preview\.13\/aipg-validator-windows-x64\.zip$/,
    );
    await expect(
      page.getByText('docker pull ghcr.io/aipowergrid/validator:v0.1.0-preview.13'),
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
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 });
      const heading = page.getByRole('heading', { name: 'Check the Grid independently.' });
      await expect(heading).toBeVisible();
      const overflow = await page.evaluate(() =>
        Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) >
        window.innerWidth,
      );
      expect(overflow, `page overflow at ${width}px`).toBe(false);
      const headingFits = await heading.evaluate((element) => {
        const text = document.createRange();
        text.selectNodeContents(element);
        return [...text.getClientRects()].every(rect => rect.left >= 0 && rect.right <= window.innerWidth);
      });
      expect(headingFits, `clipped headline at ${width}px`).toBe(true);
      await page.screenshot({ path: `test-results/validate-mobile-${width}.png`, fullPage: true });
    }
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
