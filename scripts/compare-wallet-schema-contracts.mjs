// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2026 AI Power Grid

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { isDeepStrictEqual } from 'node:util';

assert.ok(process.argv[2], 'Usage: node scripts/compare-wallet-schema-contracts.mjs ORIGINAL_INSTALL_ROOT');
const originalRoot = path.resolve(process.argv[2]);
const currentRoot = fileURLToPath(new URL('../', import.meta.url));
const fixture = JSON.parse(readFileSync(new URL('../tests/fixtures/wallet-schema-baseline.json', import.meta.url), 'utf8'));
const sources = {
  frame: '@reown/appkit-wallet/dist/esm/src/W3mFrameSchema.js',
  evm: '@coinbase/cdp-sdk/_esm/policies/evmSchema.js',
  solana: '@coinbase/cdp-sdk/_esm/policies/solanaSchema.js',
  policy: '@coinbase/cdp-sdk/_esm/policies/types.js',
};

for (const [name, zodVersion] of [['@coinbase/cdp-sdk', '3.25.76'], ['@reown/appkit-wallet', '3.22.4']]) {
  const file = path.join(originalRoot, 'node_modules', name, 'package.json');
  const resolve = createRequire(file);
  assert.equal(JSON.parse(readFileSync(file, 'utf8')).version, fixture.versions[name]);
  assert.equal(resolve('zod/package.json').version, zodVersion, 'Comparison requires the original, unpatched validators');
  if (name === '@coinbase/cdp-sdk') assert.equal(resolve('abitype/package.json').version, '1.0.6');
}
const original = {}, current = {};
for (const [group, relative] of Object.entries(sources)) {
  const file = path.join(originalRoot, 'node_modules', relative);
  assert.equal(createHash('sha256').update(readFileSync(file)).digest('hex'), fixture.sourceSha256[group]);
  original[group] = await import(pathToFileURL(file));
  current[group] = await import(pathToFileURL(path.join(currentRoot, 'node_modules', relative)));
}

function paths(value, prefix = []) {
  if (value === null || typeof value !== 'object') return [prefix];
  return [prefix, ...Object.entries(value).flatMap(([key, child]) => paths(child, [...prefix, key]))];
}

function mutate(input, keys, value) {
  if (!keys.length) return structuredClone(value);
  const result = structuredClone(input);
  let owner = result;
  for (const key of keys.slice(0, -1)) owner = owner[key];
  owner[keys.at(-1)] = structuredClone(value);
  return result;
}

function parse(schema, input) {
  try {
    const result = schema.safeParse(structuredClone(input));
    return result.success ? { success: true, data: result.data } : { success: false };
  } catch (error) { return { success: false, throws: error.constructor.name }; }
}

const values = [undefined, null, false, true, 0, -1, 1.5, [], {}, '', 'x',
  '0x1111111111111111111111111111111111111111', 'user+tag@example.invalid',
  'a..b@example.invalid', 'a@localhost', 'user@sub.example.invalid', { extra: 'value' }, [null]];
let checked = 0, acceptedByOriginal = 0, different = 0;
const counts = {}, disagreements = [];
for (const example of fixture.fixtures.filter(item => item.success && !item.missing)) {
  const before = example.name.split('.').reduce((value, key) => value[key], original[example.group]);
  const after = example.name.split('.').reduce((value, key) => value[key], current[example.group]);
  for (const keys of paths(example.input).slice(0, 20)) for (const value of values) {
    const input = mutate(example.input, keys, value);
    const first = parse(before, input), second = parse(after, input);
    checked++;
    counts[example.group] = (counts[example.group] || 0) + 1;
    if (first.success) acceptedByOriginal++;
    if (!isDeepStrictEqual(first, second)) {
      different++;
      if (disagreements.length < 20) disagreements.push({ group: example.group, name: example.name,
        path: keys, value, original: first, current: second });
    }
  }
}
console.log(JSON.stringify({ checked, acceptedByOriginal, different, counts, disagreements }, null, 2));
process.exitCode = different ? 1 : 0;
