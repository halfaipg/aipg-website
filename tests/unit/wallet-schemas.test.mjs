// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2026 AI Power Grid

import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const require = createRequire(import.meta.url);
const fixture = JSON.parse(readFileSync(new URL('../fixtures/wallet-schema-baseline.json', import.meta.url), 'utf8'));
const paths = {
  frame: '@reown/appkit-wallet/dist/esm/src/W3mFrameSchema.js',
  evm: '@coinbase/cdp-sdk/_esm/policies/evmSchema.js',
  solana: '@coinbase/cdp-sdk/_esm/policies/solanaSchema.js',
  policy: '@coinbase/cdp-sdk/_esm/policies/types.js',
};

const modules = {};
for (const [group, relative] of Object.entries(paths)) {
  modules[group] = await import(new URL('../../node_modules/' + relative, import.meta.url));
}

test('wallet validators preserve the captured valid/invalid contract', () => {
  assert.equal(fixture.fixtures.length, 1299);
  assert.equal(new Set(fixture.fixtures.map(f => `${f.group}/${f.name}`)).size, 176);
  for (const example of fixture.fixtures) {
    const schema = example.name.split('.').reduce((value, key) => value[key], modules[example.group]);
    const input = example.missing ? undefined : structuredClone(example.input);
    const label = `${example.group}/${example.name}: ${JSON.stringify(example.input)}`;
    let result;
    try { result = schema.safeParse(input); }
    catch (error) {
      assert.equal(example.success, false, label);
      assert.equal(error.constructor.name, example.throws, label);
      continue;
    }
    assert.equal(result.success, example.success, label);
    if (result.success) {
      if (example.dataMissing) assert.equal(result.data, undefined, label);
      else assert.deepEqual(JSON.parse(JSON.stringify(result.data)), example.data, label);
    }
  }
});

const typedDataCriterion = {
  type: 'evmTypedDataField',
  types: { types: { Message: [{ name: 'message', type: 'string' }] }, primaryType: 'Message' },
  conditions: [{ path: 'message', match: '^hello' }],
};

test('nonempty EIP-712 records validate identically in ESM and CommonJS', () => {
  const common = require('../../node_modules/@coinbase/cdp-sdk/_cjs/policies/evmSchema.js');
  for (const schema of [modules.evm.SignEvmTypedDataFieldCriterionSchema, common.SignEvmTypedDataFieldCriterionSchema]) {
    assert.deepEqual(schema.parse(structuredClone(typedDataCriterion)), typedDataCriterion);
    const malformed = structuredClone(typedDataCriterion);
    malformed.types.types.Message[0].type = 3;
    assert.equal(schema.safeParse(malformed).success, false);
  }
});

test('EVM policy bounds and Reown malformed-event rejection remain enforced', () => {
  const address = '0x1111111111111111111111111111111111111111';
  const schema = modules.evm.EvmAddressCriterionSchema;
  assert.equal(schema.safeParse({ type: 'evmAddress', operator: 'in', addresses: [address] }).success, true);
  assert.equal(schema.safeParse({ type: 'evmAddress', operator: 'in', addresses: Array(301).fill(address) }).success, false);
  assert.equal(schema.safeParse({ type: 'evmAddress', operator: 'in', addresses: ['not-an-address'] }).success, false);
  assert.equal(modules.frame.W3mFrameSchema.frameEvent.safeParse({ type: 'FRAME_SWITCH_NETWORK_SUCCESS', payload: { chainId: [] } }).success, false);
});

test('both SDKs use native patched Zod 4, with no Zod 3 compatibility path', () => {
  for (const name of ['@coinbase/cdp-sdk', '@reown/appkit-wallet']) {
    const resolve = createRequire(new URL('../../node_modules/' + name + '/package.json', import.meta.url));
    assert.equal(resolve('zod/package.json').version, '4.6.7');
    assert.ok(resolve('zod').z.object({})._zod);
  }
  assert.ok(modules.evm.EvmAddressCriterionSchema._zod);
  assert.ok(modules.frame.FrameGetUserResponse._zod);
});

test('oversized EVM address collections fail before visiting their elements', () => {
  let visits = 0;
  const addresses = new Proxy(Array(301), {
    get(target, key, receiver) {
      if (typeof key === 'string' && /^\d+$/.test(key)) visits++;
      return Reflect.get(target, key, receiver);
    },
  });
  const result = modules.evm.EvmAddressCriterionSchema.safeParse({ type: 'evmAddress', operator: 'in', addresses });
  assert.equal(result.success, false);
  assert.equal(visits, 0);
  assert.equal(result.error.issues.length, 1);
  assert.equal(result.error.issues[0].code, 'too_big');
});
