/**
 * MC-17 design-system unit tests (deterministic artefacts, no DOM).
 *
 * Run: npm run test:design-system:unit
 */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const readRaw = (path) => readFileSync(new URL(`../${path}`, import.meta.url));
// Git stores text blobs with LF endings; normalise CRLF for text files only so a
// Windows checkout does not look like a modification. Binary files are hashed raw.
const canonical = (buffer) => {
  const text = buffer.toString('latin1');
  return text.includes('\u0000') ? buffer : Buffer.from(text.replace(/\r\n/g, '\n'), 'latin1');
};
const readJson = (path) => JSON.parse(read(path));
const sha256 = (value) => createHash('sha256').update(value).digest('hex');

const source = readJson('src/app/marea-design-system/tokens/marea-design-tokens.source.json');
const modes = Object.keys(source.modes);

function luminance(hex) {
  const clean = hex.replace('#', '');
  const channels = [0, 2, 4].map((index) => parseInt(clean.slice(index, index + 2), 16) / 255);
  const linear = channels.map((value) => (value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(a, b) {
  const first = luminance(a);
  const second = luminance(b);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

test('token contract keeps internal/provisional status', () => {
  assert.equal(source.status, 'INTERNAL_PROPOSED');
  assert.equal(source.adoption, 'NOT_ADOPTED');
  assert.equal(source.publicUse, 'NO_GO');
  assert.equal(source.milestone, 'MC-17');
});

test('four modes with complete colour values', () => {
  assert.deepEqual(modes, ['web-light', 'instrument-day', 'instrument-sunlight', 'instrument-night']);
  for (const mode of modes) {
    for (const [role, def] of Object.entries(source.tokens.color)) {
      assert.match(def.values[mode].value, /^#[0-9a-f]{6}$/i, `${role}/${mode}`);
      assert.match(def.values[mode].sourceTokenId, /^(MC04|MC16|MC17|WCAG22|DERIVED):/);
    }
  }
});

test('custom properties are namespaced, unique and never target :root', () => {
  const vars = new Set();
  const collect = (group) => {
    for (const def of Object.values(group.values ?? {})) vars.add(def.cssVar);
    for (const [role, def] of Object.entries(group.roles ?? {})) {
      const prefix = `--marea-type-${role.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`;
      for (const suffix of ['family', 'size', 'line-height', 'weight', 'tracking']) vars.add(`${prefix}-${suffix}`);
      if (def.textTransform) vars.add(`${prefix}-transform`);
      if (def.numeric) vars.add(`${prefix}-numeric`);
    }
  };
  for (const group of Object.values(source.tokens)) collect(group);
  for (const role of Object.values(source.tokens.color)) vars.add(role.cssVar);
  assert.ok(vars.size > 120);
  for (const name of vars) assert.match(name, /^--marea-[a-z0-9-]+$/, name);
  const generated = read('src/app/marea-design-system/tokens/generated/marea-tokens.generated.css');
  assert.ok(!/^\\s*:root\\s*\\{/m.test(generated), 'generated CSS must not target :root even if a comment mentions it');
  assert.match(generated, /^marea-theme \{/m);
  for (const name of vars) assert.ok(generated.includes(`${name}:`), `generated CSS missing ${name}`);
});

test('night mode avoids pure black and pure white', () => {
  for (const [role, def] of Object.entries(source.tokens.color)) {
    const night = def.values['instrument-night'].value.toLowerCase();
    assert.ok(!['#000000', '#ffffff'].includes(night), `${role} = ${night}`);
  }
});

test('contrast formula matches known references', () => {
  assert.equal(Number(contrast('#000000', '#ffffff').toFixed(0)), 21);
  assert.ok(contrast('#777777', '#ffffff') > 4.4 && contrast('#777777', '#ffffff') < 4.6);
});

test('declared contrast pairs all pass in every mode', () => {
  const failures = [];
  for (const pair of source.contrastPairs) {
    for (const mode of modes) {
      const targets = pair.backgroundsByRole
        ? Object.entries(pair.backgroundsByRole).map(([foreground, background]) => [foreground, background])
        : pair.foregrounds.flatMap((foreground) => (pair.backgrounds ?? []).map((background) => [foreground, background]));
      for (const [foreground, background] of targets) {
        const a = source.tokens.color[foreground]?.values[mode].value;
        const b = source.tokens.color[background]?.values[mode].value;
        assert.ok(a && b, `${pair.id} unresolved ${foreground}/${background}`);
        const ratio = contrast(a, b);
        if (ratio < pair.minRatio) failures.push(`${pair.id}:${foreground}-on-${background} ${ratio.toFixed(2)} < ${pair.minRatio} (${mode})`);
      }
    }
  }
  assert.deepEqual(failures, []);
});

test('generated TypeScript layer is consistent with the source map', () => {
  const map = readJson('docs/marea/design-system/data/token-source-map.json');
  const ids = new Set(map.rows.map((row) => row.tokenId));
  const ts = read('src/app/marea-design-system/tokens/generated/marea-tokens.generated.ts');
  for (const id of [...ids].slice(0, 25)) assert.ok(ts.includes(`'${id}'`), `TS layer missing ${id}`);
  assert.ok(map.rows.length > 200);
});

test('MC-16 identities are preserved in synthetic fixtures', () => {
  const fixtures = read('src/app/marea-design-system/data/fixtures/marea-fixtures.generated.ts');
  assert.equal((fixtures.match(/"familyId": "([A-Z]+)"/g) ?? []).length >= 9, true);
  assert.equal((fixtures.match(/"editionType": "/g) ?? []).length, 26);
  assert.equal((fixtures.match(/"bundleId": "/g) ?? []).length, 6);
  assert.match(fixtures, /SYNTHETIC_INTERNAL_FIXTURE/);
  assert.ok(!/"merchantSkuCode"|"priceAmount"|"stockQuantity"|"customerId"|"vesselId"/.test(fixtures));
  assert.match(fixtures, /SAFETY_GATE_BLOCKED/);
  assert.match(fixtures, /RECEIVE_ONLY_NO_TRANSMISSION/);
  assert.ok(!/"hardwareIncludedByDefault": true/.test(fixtures));
});

test('shared entitlement ledgers are represented', () => {
  const fixtures = read('src/app/marea-design-system/data/fixtures/marea-fixtures.generated.ts');
  const ledgers = [...fixtures.matchAll(/"sharedLedgerKey": "([^"]+)"/g)].map((match) => match[1]);
  const counts = new Map();
  for (const ledger of ledgers) counts.set(ledger, (counts.get(ledger) ?? 0) + 1);
  assert.ok([...counts.values()].some((count) => count >= 2), 'no shared ledger exercised');
});

test('ES/EN copy entries are complete and non-empty', () => {
  const copy = read('src/app/marea-design-system/core/i18n.ts');
  const pairPattern = /^\s{2}([A-Za-z_]\w*):\s*\{\s*es:\s*'([^']*)',\s*en:\s*'([^']*)'\s*\},?$/gm;
  const multiline = /^\s{2}([A-Za-z_]\w*):\s*\{\s*\n\s*es:\s*'([^']*)',\n\s*en:\s*'([^']*)',?\n\s*\},?$/gm;
  const entries = [...copy.matchAll(pairPattern), ...copy.matchAll(multiline)];
  assert.ok(entries.length > 60, `parsed ${entries.length} copy keys`);
  for (const [, key, es, en] of entries) {
    assert.ok(es.trim().length > 0, `${key} ES empty`);
    assert.ok(en.trim().length > 0, `${key} EN empty`);
  }
  const declared = (copy.match(/^\s{2}[A-Za-z_]\w*:\s*\{/gm) ?? []).length;
  assert.equal(entries.length, declared, 'some copy entries were not parsed as bilingual pairs');
});

test('legacy UI baseline hashes match the working tree', () => {
  const baseline = readJson('docs/marea/design-system/data/legacy-ui-baseline.json');
  assert.equal(baseline.baselineCommit, '6d8287c8507038c4f90fd6e35471f78081ca4676');
  for (const [path, record] of Object.entries(baseline.files)) {
    if (!record.sha256) continue;
    assert.equal(sha256(canonical(readRaw(path))), record.sha256, `${path} drifted from baseline`);
  }
});

test('public directory gained no MAREA asset', () => {
  const baseline = readJson('docs/marea/design-system/data/legacy-ui-baseline.json');
  const walk = (dir, out = []) => {
    const abs = new URL(`../${dir}/`, import.meta.url);
    if (!existsSync(abs)) return out;
    for (const entry of readdirSync(abs, { withFileTypes: true })) {
      const rel = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(rel, out);
      else out.push(rel);
    }
    return out;
  };
  const current = walk('public').sort();
  assert.deepEqual(current, baseline.publicFiles);
  assert.ok(!current.some((file) => /marea/i.test(file)));
});

test('generated token, fixture and baseline artefacts are current', async () => {
  const { execFileSync } = await import('node:child_process');
  for (const script of ['scripts/build-marea-design-tokens.mjs', 'scripts/build-marea-design-system-fixtures.mjs', 'scripts/build-marea-design-system-baseline.mjs']) {
    execFileSync(process.execPath, [script, '--check'], { stdio: 'pipe' });
  }
});

test('design-system sources contain no browser globals or nondeterminism', () => {
  const walkSources = (dir, out = []) => {
    const abs = new URL(`../${dir}/`, import.meta.url);
    if (!existsSync(abs)) return out;
    for (const entry of readdirSync(abs, { withFileTypes: true })) {
      const rel = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walkSources(rel, out);
      else if (/\.(ts|css)$/.test(entry.name)) out.push(rel);
    }
    return out;
  };
  const files = walkSources('src/app/marea-design-system');
  const offenders = [];
  for (const file of files) {
    const content = read(file);
    if (/\bMath\.random\s*\(|\bDate\.now\s*\(|new Date\s*\(/.test(content)) offenders.push(`${file}: nondeterministic value`);
    if (/\blocalStorage\b|\bsessionStorage\b|\bmatchMedia\b/.test(content)) offenders.push(`${file}: browser storage/media`);
    if (/\bdocument\.|\bwindow\./.test(content)) offenders.push(`${file}: browser global`);
  }
  assert.deepEqual(offenders, []);
});

test('no purchase path or currency literal exists in design-system or preview code', () => {
  const files = ['src/app/marea-design-system', 'preview'];
  const walkAll = (dir, out = []) => {
    const abs = new URL(`../${dir}/`, import.meta.url);
    if (!existsSync(abs)) return out;
    for (const entry of readdirSync(abs, { withFileTypes: true })) {
      const rel = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walkAll(rel, out);
      else if (/\.(ts|html|css|scss)$/.test(entry.name)) out.push(rel);
    }
    return out;
  };
  const all = files.flatMap((dir) => walkAll(dir));
  const forbidden = [/€/, /\bEUR\b/, /\bUSD\b/, /\badd to cart\b/i, /\bbuy now\b/i, /\bañadir al carrito\b/i, /\bpre-?order\b/i, /\bwaiting list\b/i];
  const offenders = [];
  for (const file of all) {
    // The bilingual dictionary legitimately contains honest negations ("no pre-order,
    // reservation or waiting list"); positive purchase wording is checked in components.
    if (file.endsWith('core/i18n.ts')) continue;
    const content = read(file);
    for (const pattern of forbidden) {
      const match = content.match(pattern);
      if (match) offenders.push(`${file}: ${match[0]}`);
    }
  }
  assert.deepEqual(offenders, []);
});

test('registry and state datasets are coherent when present', () => {
  if (!existsSync(new URL('../docs/marea/design-system/data/component-registry.json', import.meta.url))) return;
  const registry = readJson('docs/marea/design-system/data/component-registry.json');
  const states = readJson('docs/marea/design-system/data/component-states.json');
  assert.ok(registry.components.length >= 40, `registry has ${registry.components.length} components`);
  assert.equal(states.components.length, registry.components.length);
  const required = ['DEFAULT', 'HOVER', 'FOCUS_VISIBLE', 'PRESSED', 'DISABLED', 'LOADING', 'EMPTY', 'ERROR', 'WARNING', 'READ_ONLY', 'BLOCKED'];
  for (const entry of states.components) for (const state of required) assert.ok(entry.states[state], `${entry.componentId}/${state}`);
});
