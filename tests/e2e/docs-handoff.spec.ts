// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2026 AI Power Grid

import { expect, test } from '@playwright/test';

test('Build crosses into the separate docs app as a document, never an RSC prefetch', async ({ page }) => {
  const requests: { navigation: boolean; rsc: string | undefined }[] = [];
  await page.route('**/use{,?*}', async route => {
    const request = route.request();
    requests.push({ navigation: request.isNavigationRequest(), rsc: request.headers().rsc });
    await route.fulfill({ contentType: 'text/html', body: '<!doctype html><h1>Separate docs app fixture</h1>' });
  });
  await page.goto('/');
  const build = page.getByRole('navigation', { name: 'Global' }).getByRole('link', { name: 'Build', exact: true });
  await build.hover();
  await build.click();
  await expect(page.getByRole('heading', { name: 'Separate docs app fixture' })).toBeVisible();
  expect(requests).toEqual([{ navigation: true, rsc: undefined }]);
});
