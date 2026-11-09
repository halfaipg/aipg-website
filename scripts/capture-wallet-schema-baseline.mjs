// SPDX-License-Identifier: AGPL-3.0-or-later
// SPDX-FileCopyrightText: 2026 AI Power Grid

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(process.argv[2] || '.');
const output = path.resolve(process.argv[3] || 'tests/fixtures/wallet-schema-baseline.json');
const sources = {
  frame: '@reown/appkit-wallet/dist/esm/src/W3mFrameSchema.js',
  evm: '@coinbase/cdp-sdk/_esm/policies/evmSchema.js',
  solana: '@coinbase/cdp-sdk/_esm/policies/solanaSchema.js',
  policy: '@coinbase/cdp-sdk/_esm/policies/types.js',
};
const versions = Object.fromEntries(['@reown/appkit-wallet', '@coinbase/cdp-sdk'].map(name => [
  name, JSON.parse(readFileSync(path.join(root, 'node_modules', name, 'package.json'), 'utf8')).version,
]));
assert.equal(versions['@reown/appkit-wallet'], '1.8.19');
assert.equal(versions['@coinbase/cdp-sdk'], '1.51.2');
for (const [group, expected] of [['@reown/appkit-wallet', '3.22.4'], ['@coinbase/cdp-sdk', '3.25.76']]) {
  const require = createRequire(path.join(root, 'node_modules', group, 'package.json'));
  assert.equal(require('zod/package.json').version, expected, 'Capture only from the original Zod 3 graph');
}
const address = '0x1111111111111111111111111111111111111111';
const strings = ['example', address, '11111111111111111111111111111111', 'user@example.invalid', 'https://example.invalid', '1', '', 'field', 'uint256'];

function sample(schema, depth = 0) {
  assert.ok(depth < 16, 'Unexpected schema recursion');
  const d = schema._def;
  switch (d.typeName) {
    case 'ZodLiteral': return d.value;
    case 'ZodEnum': return d.values[0];
    case 'ZodNativeEnum': return Object.values(d.values).find(value => typeof value === 'string');
    case 'ZodString': {
      const candidates = [...strings];
      for (const check of d.checks || []) {
        if (check.kind === 'startsWith') candidates.unshift(`${check.value}example`);
        if (check.kind === 'min') candidates.push('a'.repeat(Math.min(check.value, 128)));
      }
      return candidates.find(value => schema.safeParse(value).success) ?? '';
    }
    case 'ZodNumber': return [0, 1, 10, 100].find(value => schema.safeParse(value).success) ?? 0;
    case 'ZodBoolean': return true;
    case 'ZodNull': return null;
    case 'ZodUndefined':
    case 'ZodVoid':
    case 'ZodAny':
    case 'ZodUnknown':
    case 'ZodOptional': return undefined;
    case 'ZodNullable': return null;
    case 'ZodDefault': return d.defaultValue();
    case 'ZodArray': return Array.from({ length: d.exactLength?.value ?? d.minLength?.value ?? 0 }, () => sample(d.type, depth + 1));
    case 'ZodObject': return Object.fromEntries(Object.entries(d.shape()).map(([key, child]) => [key, sample(child, depth + 1)]).filter(([, value]) => value !== undefined));
    case 'ZodRecord': return {};
    case 'ZodTuple': return d.items.map(child => sample(child, depth + 1));
    case 'ZodUnion': {
      for (const option of variants(schema)) {
        const value = sample(option, depth + 1);
        if (schema.safeParse(structuredClone(value)).success) return value;
      }
      throw new Error('No valid union sample');
    }
    case 'ZodDiscriminatedUnion': return sample(d.options[0], depth + 1);
    case 'ZodIntersection': return { ...sample(d.left, depth + 1), ...sample(d.right, depth + 1) };
    case 'ZodLazy': return sample(d.getter(), depth + 1);
    case 'ZodReadonly': return sample(d.innerType, depth + 1);
    case 'ZodEffects': {
      const candidates = [sample(d.schema, depth + 1), ...strings];
      for (const value of candidates) {
        try { if (schema.safeParse(structuredClone(value)).success) return value; }
        catch (error) { if (!(error instanceof TypeError)) throw error; }
      }
      throw new Error('No valid effect sample');
    }
    default: throw new Error(`Unsupported schema ${d.typeName}`);
  }
}

function variants(schema) {
  if (schema._def.typeName === 'ZodUnion') return schema._def.options.flatMap(variants);
  return [schema];
}

const fixtures = [];
const hashes = {};
for (const [group, relative] of Object.entries(sources)) {
  const file = path.join(root, 'node_modules', relative);
  hashes[group] = createHash('sha256').update(readFileSync(file)).digest('hex');
  const exports = await import(pathToFileURL(file));
  const schemas = Object.entries(exports).flatMap(([name, value]) => typeof value?.safeParse === 'function'
    ? [[name, value]]
    : name === 'W3mFrameSchema' ? Object.entries(value).map(([key, child]) => [`${name}.${key}`, child]) : []);
  for (const [name, schema] of schemas) {
    const valid = variants(schema).map(option => {
      try { return sample(option); }
      catch (error) { throw new Error(`${group}/${name}: ${error.message}`, { cause: error }); }
    });
    for (const input of [...valid, undefined, null, false, [], {}, { type: 'invalid', method: 'invalid' }]) {
      let parsed;
      try { parsed = schema.safeParse(structuredClone(input)); }
      catch (error) {
        fixtures.push({ group, name, missing: input === undefined,
          ...(input === undefined ? {} : { input }), success: false, throws: error.constructor.name });
        continue;
      }
      fixtures.push({ group, name, missing: input === undefined, ...(input === undefined ? {} : { input }), success: parsed.success,
        ...(parsed.success && parsed.data !== undefined ? { data: parsed.data } : {}),
        ...(parsed.success && parsed.data === undefined ? { dataMissing: true } : {}),
      });
    }
    for (const input of valid) assert.ok(schema.safeParse(structuredClone(input)).success, `${group}/${name}: generated sample must be valid`);
  }
}
mkdirSync(path.dirname(output), { recursive: true });
writeFileSync(output, JSON.stringify({ versions, sourceSha256: hashes, fixtures }, null, 2) + '\n');
console.log(`Captured ${fixtures.length} baseline cases across ${new Set(fixtures.map(f => `${f.group}/${f.name}`)).size} schemas`);
