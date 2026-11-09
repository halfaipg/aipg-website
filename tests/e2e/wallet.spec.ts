// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2026 AI Power Grid

import { expect, test, type Page } from '@playwright/test';
import { decodeFunctionData, encodeFunctionResult, multicall3Abi, type Hex } from 'viem';

async function walletLifecycle(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.addInitScript(() => {
    const account = '0x1111111111111111111111111111111111111111';
    const listeners = new Map<string, Set<(...args: unknown[]) => void>>();
    const emit = (event: string, value: unknown) => {
      // Wallet notifications arrive over an asynchronous provider transport.
      setTimeout(() => [...(listeners.get(event) || [])].forEach(callback => callback(value)), 0);
    };
    const provider = {
      isMetaMask: true,
      isConnected: () => true,
      on(event: string, callback: (...args: unknown[]) => void) {
        if (!listeners.has(event)) listeners.set(event, new Set());
        listeners.get(event)!.add(callback);
      },
      removeListener(event: string, callback: (...args: unknown[]) => void) {
        listeners.get(event)?.delete(callback);
      },
      async request({ method }: { method: string }) {
        const requests = JSON.parse(sessionStorage.getItem('fixture-wallet-requests') || '[]') as string[];
        requests.push(method);
        sessionStorage.setItem('fixture-wallet-requests', JSON.stringify(requests));
        const connected = () => localStorage.getItem('fixture-wallet-connected') === 'true';
        switch (method) {
          case 'eth_chainId': return '0x2105';
          case 'net_version': return '8453';
          case 'eth_accounts': return connected() ? [account] : [];
          case 'eth_requestAccounts':
            localStorage.setItem('fixture-wallet-connected', 'true');
            emit('accountsChanged', [account]);
            return [account];
          case 'wallet_requestPermissions':
            localStorage.setItem('fixture-wallet-connected', 'true');
            return [{ parentCapability: 'eth_accounts' }];
          case 'wallet_getPermissions': return connected() ? [{ parentCapability: 'eth_accounts' }] : [];
          case 'wallet_revokePermissions':
            localStorage.removeItem('fixture-wallet-connected');
            emit('accountsChanged', []);
            return null;
          case 'wallet_switchEthereumChain': return null;
          case 'eth_getBalance': return '0x0';
          default: throw new Error(`Unexpected fixture wallet RPC: ${method}`);
        }
      },
    };
    Object.defineProperty(window, 'ethereum', { value: provider, configurable: true });
    const announce = () => window.dispatchEvent(new CustomEvent('eip6963:announceProvider', {
      detail: { provider, info: {
        uuid: '00000000-0000-4000-8000-000000000001',
        name: 'MetaMask', rdns: 'io.metamask',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E',
      } },
    }));
    window.addEventListener('eip6963:requestProvider', announce);
    announce();
  });

  await page.route('https://mainnet.base.org/**', async route => {
    type Rpc = { id: number; method: string; params: [{ data: Hex }] };
    const payload = route.request().postDataJSON() as Rpc | Rpc[];
    const respond = (rpc: Rpc) => {
      let result: string;
      switch (rpc.method) {
        case 'eth_call': {
          const zero = ('0x' + '0'.repeat(64)) as Hex;
          const data = rpc.params[0].data;
          if (data.startsWith('0x82ad56cb')) {
            const call = decodeFunctionData({ abi: multicall3Abi, data });
            if (call.functionName !== 'aggregate3') throw new Error('Unexpected batched read');
            result = encodeFunctionResult({ abi: multicall3Abi, functionName: 'aggregate3',
              result: call.args[0].map(() => ({ success: true, returnData: zero })) });
          } else result = zero;
          break;
        }
        case 'eth_chainId': result = '0x2105'; break;
        case 'eth_blockNumber': result = '0x1'; break;
        case 'eth_getBalance': result = '0x0'; break;
        case 'eth_getCode': result = '0x'; break;
        default: throw new Error(`Unexpected public RPC in read-only test: ${rpc.method}`);
      }
      return { jsonrpc: '2.0', id: rpc.id, result };
    };
    await route.fulfill({ json: Array.isArray(payload) ? payload.map(respond) : respond(payload) });
  });

  await page.goto('/staking');
  await page.getByRole('button', { name: /connect wallet/i }).first().click();
  for (const name of [/MetaMask/, /Coinbase/, /^Rainbow$/, /WalletConnect/]) {
    await expect(page.getByRole('button', { name }).first()).toBeVisible();
  }
  await page.getByRole('button', { name: /MetaMask/ }).first().click();
  await expect(page.getByText('Your Staked Balance', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Claim Rewards', exact: true })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Withdraw AIPG', exact: true })).toBeDisabled();
  await page.screenshot({ path: test.info().outputPath('wallet-connected.png'), fullPage: true });

  const prompts = () => page.evaluate(() => (JSON.parse(sessionStorage.getItem('fixture-wallet-requests') || '[]') as string[])
    .filter(method => ['eth_requestAccounts', 'wallet_requestPermissions'].includes(method)).length);
  const initialPrompts = await prompts();
  expect(initialPrompts).toBeGreaterThan(0);
  await page.reload();
  await expect(page.getByText('Your Staked Balance', { exact: true })).toBeVisible();
  expect(await prompts()).toBe(initialPrompts);
  await page.getByRole('button', { name: /0x11.*1111.*Dropdown/i }).click();
  await page.getByRole('button', { name: /disconnect/i }).click();
  await expect(page.getByText('Connect Your Wallet', { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText('Connect Your Wallet', { exact: true })).toBeVisible();
  expect(await prompts()).toBe(initialPrompts);
  const requests = await page.evaluate(() => JSON.parse(sessionStorage.getItem('fixture-wallet-requests') || '[]') as string[]);
  expect(requests.filter(method => /sendTransaction|sign|sendCalls|grantPermissions/i.test(method))).toEqual([]);
  expect(errors).toEqual([]);
}

for (const width of [390, 1280]) {
  test(`wallet choices and the read-only injected lifecycle work at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await walletLifecycle(page);
  });
}
