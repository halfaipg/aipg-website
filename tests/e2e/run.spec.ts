import { expect, test } from '@playwright/test';

for (const width of [320, 390, 768, 1440]) {
  test(`/run simple endpoint onboarding at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'userAgentData', { get: () => ({ platform: 'macOS' }) });
      Object.defineProperty(navigator, 'platform', { get: () => 'MacIntel' });
      Object.defineProperty(navigator, 'userAgent', { get: () => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' });
    });
    await page.goto('/run');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Earn AIPG');
    await expect(page.getByRole('button', { name: 'macOS', exact: true }).first()).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('link', { name: 'Download for macOS', exact: true })).toHaveAttribute('href', /grid-inference-worker-macos-arm64.zip$/);
    await expect(page.getByText(/Not Apple-notarized/)).toBeVisible();
    await expect(page.getByText(/not Intel Macs/)).toBeVisible();
    await expect(page.getByText(/Unzip the download and open/)).toBeVisible();
    await expect(page.getByLabel('GPU or accelerator model')).not.toBeVisible();
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: `test-results/run-macos-${width}.png`, fullPage: true });

    for (const [value, label] of [['lm-studio', 'LM Studio'], ['ollama', 'Ollama'], ['vllm', 'vLLM'], ['sglang', 'SGLang'], ['lmdeploy', 'LMDeploy'], ['koboldcpp', 'KoboldCpp'], ['openai-compatible', 'OpenAI-compatible endpoint']]) {
      await page.getByLabel('1. Connect your inference endpoint').selectOption(value);
      await expect(page.getByRole('heading', { name: 'Get connected with ' + label, exact: true })).toBeVisible();
      await expect(page.getByRole('link', { name: label + ' setup guide', exact: true })).toHaveAttribute('href', /^\/docs\/backends\//);
    }
    await page.getByText('Anthropic / Messages endpoints', { exact: true }).click();
    await expect(page.getByText(/Anthropic-only endpoints are not supported yet/)).toBeVisible();

    await page.getByRole('button', { name: 'Windows', exact: true }).first().click();
    await expect(page.getByRole('link', { name: 'Download for Windows', exact: true })).toHaveAttribute('href', /grid-inference-worker-windows-x64.exe$/);
    await expect(page.getByText(/Unsigned Windows app/)).toBeVisible();
    await expect(page.getByText(/Open the downloaded grid-inference-worker-windows/)).toBeVisible();
    await expect(page.getByText(/chmod/)).not.toBeVisible();

    await page.getByRole('button', { name: 'Linux', exact: true }).first().click();
    const installer = page.getByRole('link', { name: 'Download Linux installer', exact: true });
    await expect(installer).toHaveAttribute('href', /releases\/download\/v\d+\.\d+\.\d+\/install-worker.sh$/);
    await expect(page.getByText(/chmod \+x install-worker.sh/)).toBeVisible();
    await expect(page.getByText(/--verify-runtime/)).toBeVisible();
    await page.getByText('Release details & checksums', { exact: true }).click();
    await expect(page.getByRole('link', { name: 'Download Linux binary directly' })).toHaveAttribute('href', (await installer.getAttribute('href'))!.replace('install-worker.sh', 'grid-inference-worker-linux-x64'));
    await page.getByRole('button', { name: 'Linux ARM64', exact: true }).first().click();
    await expect(page.getByRole('link', { name: 'Download Linux ARM64 binary directly' })).toHaveAttribute('href', (await installer.getAttribute('href'))!.replace('install-worker.sh', 'grid-inference-worker-linux-arm64'));
    await page.getByRole('button', { name: 'Linux', exact: true }).first().click();
    await expect(page.getByRole('link', { name: 'Need setup help?' })).toBeVisible();
    await expect(page.getByText(/never needs a wallet private key/)).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: `test-results/run-simple-${width}.png`, fullPage: true });

    await page.getByRole('button', { name: 'Images & video', exact: true }).click();
    await expect(page.getByRole('link', { name: 'Open ComfyUI setup guide' })).toHaveAttribute('href', 'https://github.com/AIPowerGrid/grid-media-worker#comfyui-worker');
    await expect(page.getByRole('link', { name: /Download for|Download Linux installer/ })).toHaveCount(0);
    await page.getByRole('button', { name: 'Audio', exact: true }).click();
    await expect(page.getByRole('link', { name: 'Open ACE-Step setup guide' })).toHaveAttribute('href', '/docs/backends/ace-step');
    await page.getByText('Managed installer & qualification', { exact: true }).click();
    await expect(page.getByText(/Qualification benchmarks are unpaid/)).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    expect(errors).toEqual([]);
  });
}

test('/run optional planner and worker check remain usable', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'userAgentData', { get: () => ({ platform: 'macOS' }) });
    Object.defineProperty(navigator, 'platform', { get: () => 'MacIntel' });
    Object.defineProperty(navigator, 'userAgent', { get: () => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' });
  });
  await page.route('https://api.aipowergrid.io/v1/workers', route => route.fulfill({
    json: { count: 1, workers: [{ id: 'worker-e2e-123', name: 'E2E Worker', online: true, models: ['gpt-oss-120b'], job_types: ['text'] }] },
  }));
  await page.goto('/run');
  await page.getByText('Not running a model yet? Plan your setup', { exact: true }).click();
  await expect(page.getByLabel('Accelerator type', { exact: true })).toHaveValue('apple');
  await page.getByLabel('What do you want to run?').selectOption('audio');
  await expect(page.getByRole('link', { name: 'Read the ACE-Step setup guide' })).toBeVisible();
  await page.getByLabel('What do you want to run?').selectOption('media');
  await expect(page.getByRole('link', { name: 'Read the ComfyUI setup guide' })).toBeVisible();
  await page.getByText('See current capacity needs and workload history', { exact: true }).click();
  await expect(page.getByText(/Jobs per worker is a rough workload-share signal/)).toBeVisible();
  await page.getByText('Payout history & check my worker', { exact: true }).click();
  await page.getByPlaceholder('Worker name or ID').fill('E2E Worker');
  await page.getByRole('button', { name: 'Check now' }).click();
  await expect(page.getByText('Online in the public registry')).toBeVisible();
  await expect(page.getByText(/arithmetic on settled history, not a payout forecast/).or(page.getByText('Public payout evidence is unavailable, so no estimate is shown.'))).toBeVisible();
});

test.describe('/validate smoke', () => {
  test('states the preview trust boundary and renders verified preview downloads', async ({ page }) => {
    const validatorId = 'val_06a1567ccc3b46a48515cb47e6fdd8cb';
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'share', {
        configurable: true,
        value: undefined,
      });
    });
    await page.route(`**/api/validator-status/${validatorId}`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          schema: 'aipg.validator.public-status.v1',
          validatorId,
          summary: 'online',
          registrationStatus: 'active',
          online: true,
          lastHeartbeat: '2026-09-01T23:34:00+00:00',
          softwareVersion: 'v0.1.0-preview.13',
          activity: { assigned: 267, completed: 261, attested: 240 },
          qualification: {
            status: 'unreviewed',
            elapsedSeconds: 0,
            minimumSeconds: 259200,
            remainingSeconds: 259200,
            sampleCoverage: 0,
            minimumSampleCoverage: 0.8,
            timeReady: false,
            coverageReady: false,
            heartbeatFresh: true,
            reviewCurrent: false,
            independentVoteEligible: false,
          },
          nextAction: 'Request cohort review using only this public validator ID.',
          economicEffect: 'none',
        }),
      });
    });
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
    await page.getByRole('button', { name: 'Share opening' }).click();
    await expect(page.getByRole('status')).toHaveText('Opening copied.');
    await expect
      .poll(() => page.evaluate(() => navigator.clipboard.readText()))
      .toMatch(/two independently controlled Linux\/systemd operators.*72-hour CPU-only.*No GPU, stake, rewards, routing authority, slashing.*https:\/\/aipowergrid\.io\/validate/);
    await expect(page.getByText('aipg-validator app', { exact: true })).toBeVisible();
    await expect(page.getByText(/Choose 8 to open the local operator app/)).toBeVisible();
    await expect(page.getByText(/confirm Create node account/)).toBeVisible();
    await expect(page.getByText(/The node starts automatically with the saved configuration/)).toBeVisible();
    await expect(page.getByText(/Exit app stops its node and closes the local server/)).toBeVisible();
    await expect(page.getByRole('link', { name: 'Full setup and headless server guide' })).toHaveAttribute(
      'href', 'https://aipowergrid.io/docs/validator-node',
    );
    await expect(page.getByText(/Existing-account pairing is not available yet/)).toBeVisible();
    await expect(page.getByRole('link', { name: /Link wallet and create key/i })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Download Linux installer' })).toHaveAttribute(
      'href',
      /releases\/download\/v0\.1\.0-preview\.20\/install-validator\.sh$/,
    );
    await expect(page.getByRole('link', { name: 'Linux x64' })).toHaveAttribute(
      'href',
      /releases\/download\/v0\.1\.0-preview\.20\/aipg-validator-linux-x64\.zip$/,
    );
    await expect(page.getByRole('link', { name: 'Windows x64' })).toHaveAttribute(
      'href',
      /releases\/download\/v0\.1\.0-preview\.20\/aipg-validator-windows-x64\.zip$/,
    );
    await expect(
      page.getByText('docker pull ghcr.io/aipowergrid/validator:v0.1.0-preview.20'),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Open Docker quickstart' })).toHaveAttribute(
      'href',
      'https://github.com/AIPowerGrid/grid-validator/blob/master/QUICKSTART.md#docker',
    );
    await expect(page.getByText(/mounts credentials read-only after setup/)).toBeVisible();
    await expect(page.getByText(/preserves the assignment and evidence journal across restarts/)).toBeVisible();
    await expect(page.getByText(/Check for updates, then Update and restart/)).toBeVisible();

    await page.getByPlaceholder('val_...').fill(validatorId);
    await page.getByRole('button', { name: 'Check status' }).click();
    await expect(page.getByText('Join the independent cohort', { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Request cohort review' })).toHaveAttribute(
      'href',
      'https://github.com/AIPowerGrid/grid-validator/issues/5',
    );
    await expect(page.getByText(/registration alone does not prove independent control/i)).toBeVisible();

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
