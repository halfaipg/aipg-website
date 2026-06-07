import { defineConfig, devices } from '@playwright/test';

/**
 * Smoke-test configuration. CI runs against a freshly-built production server
 * to catch the kind of bug that hit us on 2026-06-04 (an undefined reference
 * that only surfaced on real `next start`, not in dev mode).
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: process.env.BASE_URL ?? 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Spawn the production build for smoke. Dev mode is more permissive about
  // missing refs; only `next start` reproduces the prod environment.
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'npm run build && npm run start -- -p 3000',
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
});
