import { test, expect } from '@playwright/test';

/**
 * Smoke test for /staking.
 *
 * The bug this would have caught: 2026-06-04, a leftover `STAKING_DISABLED`
 * reference survived a refactor that removed the const declaration. The page
 * crashed to a blank screen the moment any wallet provider tried to render.
 * `next build` doesn't catch undefined references — only running the page does.
 */
test.describe('/staking smoke', () => {
  test('renders without console errors and shows withdraw UI', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      consoleErrors.push(`pageerror: ${err.message}`);
    });

    await page.goto('/staking', { waitUntil: 'networkidle' });

    // The header copy must be present — proves React tree mounted.
    await expect(page.getByText(/withdraw your AIPG/i)).toBeVisible({ timeout: 15_000 });

    // The wallet connect button must render (RainbowKit) — the most common
    // crash surface for the staking page historically.
    await expect(page.getByRole('button', { name: /connect/i }).first()).toBeVisible();

    // Hard fail on any uncaught runtime error.
    // Filter out known noisy warnings that aren't real failures: web3 wallet
    // provider injections sometimes log harmless errors at boot.
    const realErrors = consoleErrors.filter(
      (e) => !e.includes('MetaMask') && !e.includes('inpage.js') && !e.includes('chrome-extension'),
    );
    expect(realErrors, `console errors on /staking:\n${realErrors.join('\n')}`).toEqual([]);
  });

  test('homepage renders without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => {
      consoleErrors.push(`pageerror: ${err.message}`);
    });

    await page.goto('/', { waitUntil: 'networkidle' });

    // Hero headline ("AI shouldn't have a doorman.") implies React tree mounted.
    // We match the most stable substring rather than the full sentence in case
    // it gets edited.
    await expect(page.getByRole('heading', { name: /doorman|free ai/i }).first()).toBeVisible({
      timeout: 15_000,
    });

    const realErrors = consoleErrors.filter(
      (e) => !e.includes('MetaMask') && !e.includes('inpage.js') && !e.includes('chrome-extension'),
    );
    expect(realErrors, `console errors on /:\n${realErrors.join('\n')}`).toEqual([]);
  });
});
