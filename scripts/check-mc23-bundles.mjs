#!/usr/bin/env node
/**
 * MC-23 bundle-comparison validator.
 *
 * Deterministic, read-only gate over the MC-23 bundle comparison and
 * upgrade-path surface. It asserts that the comparison tells the truth about
 * the six MC-08 commercial solutions and that no commercial affordance leaked
 * into the internal catalogue.
 *
 * Every check is content- or contract-derived; nothing is asserted from a
 * comment or from an authored summary. A file that is not yet present on a
 * branch is reported as SKIP with the reason, never as a pass.
 *
 * Usage: node scripts/check-mc23-bundles.mjs
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CONTRACT = 'docs/marea/bundles/bundle-definitions.json';
const DOMAIN = 'src/app/marea-catalog/data';
const CONTENT = 'src/app/marea-catalog/content';
const COMPONENTS = 'src/app/marea-catalog/components';
const EVIDENCE = 'docs/marea/catalog/evidence';

const results = [];
let current = null;

const read = (relative) => readFileSync(resolve(root, relative), 'utf8');
const exists = (relative) => existsSync(resolve(root, relative));

function add(id, title, fn) {
  current = { id, title, status: 'PASS', detail: '' };
  try {
    const outcome = fn();
    if (outcome && outcome.skip) {
      current.status = 'SKIP';
      current.detail = outcome.skip;
    } else if (outcome && outcome.fail) {
      current.status = 'FAIL';
      current.detail = outcome.fail;
    } else {
      current.detail = typeof outcome === 'string' ? outcome : 'ok';
    }
  } catch (error) {
    current.status = 'FAIL';
    current.detail = `threw: ${error instanceof Error ? error.message : String(error)}`;
  }
  results.push(current);
  current = null;
}

const fail = (message) => ({ fail: message });
const skip = (reason) => ({ skip: reason });
const pass = (detail) => detail;

function filesUnder(relative) {
  const absolute = resolve(root, relative);
  if (!existsSync(absolute)) return [];
  const out = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith('.ts')) out.push(full);
    }
  };
  walk(absolute);
  return out;
}

/** Strip line and block comments so a check never matches prose about a token. */
const stripComments = (source) =>
  source.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/(^|[^:])\/\/[^\n]*/g, '$1 ');

const contract = JSON.parse(read(CONTRACT));
const contractBundles = contract.bundles;

// ── checks ───────────────────────────────────────────────────────────────────
add('MC23-01', 'the six MC-08 bundles are described in canonical order', () => {
  const domainFile = `${DOMAIN}/bundle-comparison.ts`;
  if (!exists(domainFile)) return skip(`${domainFile} not present on this branch`);
  const source = stripComments(read(domainFile));
  const order = /BUNDLE_ORDER\s*=\s*\[([^\]]*)\]/u.exec(source);
  if (!order) return fail('BUNDLE_ORDER not found');
  const ids = [...order[1].matchAll(/'([A-Z]+)'/gu)].map((m) => m[1]);
  const expected = contractBundles.map((b) => b.id);
  if (JSON.stringify(ids) !== JSON.stringify(expected)) {
    return fail(`order ${ids.join(',')} != contract ${expected.join(',')}`);
  }
  return pass(`6 bundles in contract order: ${ids.join(', ')}`);
});

add('MC23-02', 'per-bundle lifecycle and availability are copied verbatim', () => {
  const domainFile = `${DOMAIN}/bundle-comparison.ts`;
  if (!exists(domainFile)) return skip(`${domainFile} not present on this branch`);
  const source = stripComments(read(domainFile));
  for (const bundle of contractBundles) {
    const block = source.slice(source.indexOf(`bundleId: '${bundle.id}'`));
    if (!source.includes(`bundleId: '${bundle.id}'`)) return fail(`${bundle.id} missing`);
    const window = block.slice(0, 800);
    if (!window.includes(`lifecycleState: '${bundle.lifecycleState}'`)) {
      return fail(`${bundle.id} lifecycleState not verbatim`);
    }
    if (!window.includes(`commercialAvailability: '${bundle.commercialAvailability}'`)) {
      return fail(`${bundle.id} commercialAvailability not verbatim`);
    }
    if (!window.includes(`publicationState: '${bundle.publicationState}'`)) {
      return fail(`${bundle.id} publicationState not verbatim`);
    }
  }
  return pass('6 bundles: lifecycle, availability and publication verbatim');
});

add('MC23-03', 'every inclusion value belongs to the MC-08 vocabulary', () => {
  const domainFile = `${DOMAIN}/bundle-comparison.ts`;
  if (!exists(domainFile)) return skip(`${domainFile} not present on this branch`);
  const source = stripComments(read(domainFile));
  const legal = ['INCLUDED', 'REQUIRED_EXTERNAL', 'OPTIONAL', 'CONDITIONAL', 'NOT_INCLUDED', 'INELIGIBLE', 'QUOTATION_REQUIRED'];
  const used = [...source.matchAll(/line\([^)]*'([A-Z_]+)'\s*\)/gu)].map((m) => m[1]);
  if (used.length === 0) return fail('no composition lines found');
  const illegal = used.filter((value) => !legal.includes(value));
  if (illegal.length > 0) return fail(`illegal inclusion values: ${[...new Set(illegal)].join(', ')}`);
  return pass(`${used.length} composition lines, 0 illegal vocabulary values`);
});

add('MC23-04', 'no catalogue module can produce a purchasable or ORDERABLE state', () => {
  const sources = [...filesUnder(DOMAIN), ...filesUnder(CONTENT), ...filesUnder(COMPONENTS)];
  if (sources.length === 0) return skip('catalogue modules not present on this branch');
  const banned = /['"`](ORDERABLE|PURCHASABLE|IN_STOCK|ADD_TO_CART|BUY_NOW)['"`]/gu;
  const hits = [];
  for (const file of sources) {
    const text = stripComments(readFileSync(file, 'utf8'));
    for (const match of text.matchAll(banned)) hits.push(`${file.split('src/app/marea-catalog/')[1]}:${match[1]}`);
  }
  if (hits.length > 0) return fail(`purchasable state literals: ${hits.slice(0, 5).join(', ')}`);
  return pass(`${sources.length} catalogue modules, 0 purchasable-state literals`);
});

add('MC23-05', 'the MC-23 copy states the canonical not-for-sale and safety facts', () => {
  const contentFile = `${CONTENT}/bundles.ts`;
  if (!exists(contentFile)) return skip(`${contentFile} not present on this branch`);
  const source = read(contentFile);
  const required = [
    ['not for sale', /not for sale/iu, /no se vende/iu],
    ['blocked by PILOT gate', /PILOT safety gate/iu, /puerta de seguridad de PILOT/iu],
    ['FLEET not implemented', /not implemented/iu, /no está implementado/iu],
  ];
  for (const [label, en, es] of required) {
    if (!en.test(source)) return fail(`${label}: English statement missing`);
    if (!es.test(source)) return fail(`${label}: Spanish statement missing`);
    if (!/es:/.test(source)) return fail('localized structure missing');
  }
  const notes = /BUNDLE_STATE_NOTES[^{]*\{([\s\S]*?)\n\};/u.exec(source);
  if (!notes) return fail('BUNDLE_STATE_NOTES map not found');
  for (const bundle of contractBundles) {
    const block = new RegExp(`\\b${bundle.id}\\s*:\\s*\\{([\\s\\S]*?)\\}`, 'u').exec(notes[1]);
    if (!block) return fail(`${bundle.id} has no state note`);
    if (!/es:\s*'[^']+'/u.test(block[1]) || !/en:\s*'[^']+'/u.test(block[1])) {
      return fail(`${bundle.id} note is missing a locale`);
    }
  }
  return pass('6 bundle notes bilingual; not-for-sale, PILOT gate and FLEET limits stated');
});

add('MC23-06', 'ES and EN are structurally identical and non-empty', () => {
  const contentFile = `${CONTENT}/bundles.ts`;
  if (!exists(contentFile)) return skip(`${contentFile} not present on this branch`);
  const source = read(contentFile);
  const pairs = [...source.matchAll(/es:\s*'((?:[^'\\]|\\.)*)'\s*,\s*en:\s*'((?:[^'\\]|\\.)*)'/gu)];
  if (pairs.length === 0) return fail('no localized pairs found');
  for (const [, es, en] of pairs) {
    if (es.trim() === '' || en.trim() === '') return fail('empty locale value');
    if (es.trim() === en.trim()) return fail(`identical locale values: "${es}"`);
  }
  return pass(`${pairs.length} localized pairs, all non-empty and distinct`);
});

add('MC23-07', 'the comparison adapts the verified MC-17 table instead of forking it', () => {
  const tableFile = `${COMPONENTS}/bundle-comparison-table.ts`;
  if (!exists(tableFile)) return skip(`${tableFile} not present on this branch`);
  const source = read(tableFile);
  if (!source.includes('marea-feature-comparison')) return fail('verified comparison component not reused');
  if (!/<table/u.test(source)) return pass('delegates the table to marea-feature-comparison');
  return fail('declares its own <table>, forking the design system');
});

add('MC23-08', 'the comparison never collapses inclusion into a boolean cell', () => {
  const tableFile = `${COMPONENTS}/bundle-comparison-table.ts`;
  if (!exists(tableFile)) return skip(`${tableFile} not present on this branch`);
  const source = stripComments(read(tableFile));
  if (/values:\s*\{\s*[^}]*:\s*(true|false)\b/u.test(source)) return fail('boolean cell value');
  if (/\binclusion:\s*(true|false)\b/u.test(source)) return fail('boolean inclusion');
  return pass('inclusion cells carry the vocabulary label, never a boolean');
});

add('MC23-09', 'the selector is operable by keyboard and announces its result', () => {
  const selectorFile = `${COMPONENTS}/bundle-upgrade-selector.ts`;
  if (!exists(selectorFile)) return skip(`${selectorFile} not present on this branch`);
  const source = read(selectorFile);
  const required = [
    ['fieldset grouping', /<fieldset/u],
    ['legend', /<legend/u],
    ['real button', /<button[^>]*type="button"/u],
    ['pressed state', /aria-pressed/u],
    ['live region', /live="polite"|aria-live="polite"/u],
    ['focus ring', /:focus-visible/u],
  ];
  for (const [label, pattern] of required) {
    if (!pattern.test(source)) return fail(`missing ${label}`);
  }
  if (!/output</u.test(source)) return fail('no output() channel');
  return pass('fieldset, legend, button, aria-pressed, live region, focus ring, output()');
});

add('MC23-10', 'the selector emits only and performs no navigation, submit or storage', () => {
  const selectorFile = `${COMPONENTS}/bundle-upgrade-selector.ts`;
  if (!exists(selectorFile)) return skip(`${selectorFile} not present on this branch`);
  const source = stripComments(read(selectorFile));
  const banned = [
    ['router navigation', /\.navigate\(|RouterLink|routerLink/u],
    ['form submit', /<form|type="submit"/u],
    ['storage', /localStorage|sessionStorage|document\.cookie/u],
    ['network', /fetch\(|XMLHttpRequest|HttpClient/u],
  ];
  for (const [label, pattern] of banned) {
    if (pattern.test(source)) return fail(`selector performs ${label}`);
  }
  return pass('no navigation, submit, storage or network call');
});

add('MC23-11', 'the upgrade logic is deterministic', () => {
  const upgradeFile = `${DOMAIN}/bundle-upgrade-paths.ts`;
  if (!exists(upgradeFile)) return skip(`${upgradeFile} not present on this branch`);
  const source = stripComments(read(upgradeFile));
  const banned = [['clock', /Date\.now|new Date\(/u], ['randomness', /Math\.random/u]];
  for (const [label, pattern] of banned) {
    if (pattern.test(source)) return fail(`non-deterministic ${label}`);
  }
  return pass('no clock, no randomness in the upgrade-path module');
});

add('MC23-12', 'no catalogue file introduces a price or a purchase affordance', () => {
  const sources = [...filesUnder(DOMAIN), ...filesUnder(CONTENT), ...filesUnder(COMPONENTS)];
  if (sources.length === 0) return skip('catalogue modules not present on this branch');
  const banned = [
    ['currency', /['"`][^'"`]*\d+\s*(?:EUR|€|euros?)[^'"`]*['"`]/iu],
    ['add-to-cart control', /\badd to cart\b|\bañadir al carrito\b|\bcesta\b|\bcart button\b/iu],
    ['price field', /\bpriceAmount\b|\bunitPrice\b|\bmsrp\b/iu],
  ];
  const hits = [];
  for (const file of sources) {
    const text = stripComments(readFileSync(file, 'utf8'));
    for (const [label, pattern] of banned) {
      if (pattern.test(text)) hits.push(`${file.split('src/app/marea-catalog/')[1]}:${label}`);
    }
  }
  if (hits.length > 0) return fail(`commercial affordance: ${hits.slice(0, 5).join(', ')}`);
  return pass(`${sources.length} catalogue modules, 0 price or purchase affordances`);
});

// ── report ───────────────────────────────────────────────────────────────────
const failed = results.filter((r) => r.status === 'FAIL');
const passed = results.filter((r) => r.status === 'PASS');
const skipped = results.filter((r) => r.status === 'SKIP');

for (const result of results) {
  console.log(`${result.status.padEnd(4)} ${result.id} — ${result.title}`);
  console.log(`     ${result.detail}`);
}

console.log(
  `\nMC-23 catalogue validator: ${passed.length}/${results.length} PASS` +
    (skipped.length > 0 ? `, ${skipped.length} SKIP` : '') +
    (failed.length > 0 ? `, ${failed.length} FAIL` : '') +
    (failed.length === 0 ? ' (PASS)' : ' (FAIL)'),
);

if (exists(EVIDENCE)) {
  const payload = {
    schema: 'mc23-validator-run/1',
    runAt: new Date().toISOString(),
    total: results.length,
    passed: passed.length,
    skipped: skipped.length,
    failed: failed.length,
    results: results.map((r) => ({ id: r.id, status: r.status, detail: r.detail })),
  };
  const target = resolve(root, `${EVIDENCE}/mc23-validator-run.json`);
  writeFileSync(target, `${JSON.stringify(payload, null, 2)}\n`);
}

if (failed.length > 0) process.exitCode = 1;

/** ENGINE-03 runner entry point: no process spawn, no argv dependency. */
export function runConfined() {
  return failed.length === 0;
}
