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
const SECTIONS = 'src/app/marea-catalog/sections';
const PREVIEW = 'preview/landing';
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

/**
 * The generated module is emitted with JSON.stringify, so every literal is
 * double-quoted. Normalise both quotes to a single marker before comparing, so
 * the checks assert VALUES and not the generator's quoting style.
 */
const normaliseLiterals = (source) => source.replace(/"/gu, "'");

const contract = JSON.parse(read(CONTRACT));
const contractBundles = contract.bundles;

// ── checks ───────────────────────────────────────────────────────────────────
add('MC23-01', 'the six MC-08 bundles are described in canonical order', () => {
  const domainFile = `${DOMAIN}/bundle-comparison.ts`;
  if (!exists(domainFile)) return skip(`${domainFile} not present on this branch`);
  const source = normaliseLiterals(stripComments(read(domainFile)));
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
  const source = normaliseLiterals(stripComments(read(domainFile)));
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
  const source = normaliseLiterals(stripComments(read(domainFile)));
  const legal = ['INCLUDED', 'REQUIRED_EXTERNAL', 'OPTIONAL', 'CONDITIONAL', 'NOT_INCLUDED', 'INELIGIBLE', 'QUOTATION_REQUIRED'];
  const used = [...source.matchAll(/inclusion:\s*'([A-Z_]+)'/gu)].map((m) => m[1]);
  if (used.length === 0) return fail('no composition lines found');
  const illegal = used.filter((value) => !legal.includes(value));
  if (illegal.length > 0) return fail(`illegal inclusion values: ${[...new Set(illegal)].join(', ')}`);
  return pass(`${used.length} composition lines, 0 illegal vocabulary values`);
});

add('MC23-03b', 'every contract line is present verbatim, including external and installation lines', () => {
  const domainFile = `${DOMAIN}/bundle-comparison.ts`;
  if (!exists(domainFile)) return skip(`${domainFile} not present on this branch`);
  const source = normaliseLiterals(stripComments(read(domainFile)));
  const expected = contractBundles.flatMap((b) => [
    ...(b.components ?? []).map((c) => ({ b: b.id, ...c })),
    ...(b.optionalComponents ?? []).map((c) => ({ b: b.id, ...c })),
  ]);
  const missing = [];
  for (const line of expected) {
    const edition = line.editionId === null ? 'null' : `'${line.editionId}'`;
    const needle = `lineId: '${line.lineId}'`;
    const idx = source.indexOf(needle);
    if (idx < 0) { missing.push(`${line.b}/${line.lineId}`); continue; }
    const window = source.slice(idx, idx + 220);
    if (!window.includes(`inclusion: '${line.inclusion}'`)) missing.push(`${line.b}/${line.lineId}(inclusion)`);
    if (!window.includes(`editionId: ${line.editionId === null ? 'null' : `'${line.editionId}'`}`)) missing.push(`${line.b}/${line.lineId}(edition)`);
  }
  if (missing.length > 0) return fail(`missing or altered contract lines: ${missing.slice(0, 6).join(', ')}`);
  return pass(`${expected.length} contract lines present with matching edition and inclusion`);
});

add('MC23-03c', 'blockers, gates and configuration outcomes are complete per bundle', () => {
  const domainFile = `${DOMAIN}/bundle-comparison.ts`;
  if (!exists(domainFile)) return skip(`${domainFile} not present on this branch`);
  const source = normaliseLiterals(stripComments(read(domainFile)));
  for (const bundle of contractBundles) {
    const start = source.indexOf(`bundleId: '${bundle.id}'`);
    if (start < 0) return fail(`${bundle.id} missing`);
    const block = source.slice(start, source.indexOf('bundleId:', start + 10) > 0 ? source.indexOf('bundleId:', start + 10) : undefined);
    for (const key of ['blockers', 'gates', 'outcomes']) {
      const declared = /\b(blockers|gates|outcomes):\s*\[([^\]]*)\]/gu;
      declared.lastIndex = 0;
      const all = [...block.matchAll(declared)].find((m) => m[1] === key);
      if (!all) return fail(`${bundle.id} has no ${key} array`);
      const inCode = [...all[2].matchAll(/'([^']+)'/gu)].map((m) => m[1]);
      const inContract = key === 'blockers' ? (bundle.releaseReadiness.blockers ?? [])
        : key === 'gates' ? (bundle.releaseReadiness.gates ?? [])
        : (bundle.configurationOutcomes ?? []);
      const missing = inContract.filter((v) => !inCode.includes(v));
      const extra = inCode.filter((v) => !inContract.includes(v));
      if (missing.length > 0) return fail(`${bundle.id} ${key} missing: ${missing.slice(0, 4).join(', ')}`);
      if (extra.length > 0) return fail(`${bundle.id} ${key} invented: ${extra.slice(0, 4).join(', ')}`);
    }
  }
  return pass('6 bundles: blockers, gates and outcomes match the contract exactly');
});

add('MC23-03d', 'every upgrade path and cross-sell rule in the contract is present', () => {
  const domainFile = `${DOMAIN}/bundle-comparison.ts`;
  if (!exists(domainFile)) return skip(`${domainFile} not present on this branch`);
  const source = normaliseLiterals(stripComments(read(domainFile)));
  const upgrades = contractBundles.flatMap((b) => b.upgradeMigration ?? []);
  const missingUpgrade = upgrades.filter((u) => !source.includes(`upgradeId: '${u.id}'`));
  if (missingUpgrade.length > 0) return fail(`missing upgrade paths: ${missingUpgrade.map((u) => u.id).slice(0, 8).join(', ')}`);
  const rules = contract.crossSellRules ?? [];
  const missingRules = rules.filter((r) => !source.includes(`ruleId: '${r.id}'`));
  if (missingRules.length > 0) return fail(`missing cross-sell rules: ${missingRules.map((r) => r.id).join(', ')}`);
  const declaresUnsupported = source.includes('UM-CR-03');
  return pass(`${upgrades.length} upgrade paths and ${rules.length} cross-sell rules present${declaresUnsupported ? ' (incl. non-supported UM-CR-03)' : ''}`);
});

add('MC23-04', 'no catalogue module can produce a purchasable or ORDERABLE state', () => {
  const sources = [
    ...filesUnder(DOMAIN),
    ...filesUnder(CONTENT),
    ...filesUnder(COMPONENTS),
    ...filesUnder(SECTIONS),
    ...filesUnder(PREVIEW),
  ];
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
  // Each note must state not-for-sale; the PILOT gate must appear in SAIL and
  // COMPLETE specifically, and the FLEET limit in FLEET specifically.
  const noteBlocks = {};
  for (const bundle of contractBundles) {
    const block = new RegExp('\\b' + bundle.id + '\\s*:\\s*\\{([\\s\\S]*?)\\}', 'u').exec(notes[1]);
    noteBlocks[bundle.id] = block ? block[1] : '';
  }
  for (const bundle of contractBundles) {
    if (!/not for sale/iu.test(noteBlocks[bundle.id])) return fail(bundle.id + ' note does not state not for sale');
  }
  for (const bundle of ['SAIL', 'COMPLETE']) {
    if (!/PILOT safety gate/iu.test(noteBlocks[bundle]) || !/puerta de seguridad de PILOT/iu.test(noteBlocks[bundle])) {
      return fail(bundle + ' note does not state the PILOT safety gate in both locales');
    }
  }
  if (!/not implemented/iu.test(noteBlocks['FLEET']) || !/no está implementado/iu.test(noteBlocks['FLEET'])) {
    return fail('FLEET note does not state not implemented in both locales');
  }
  return pass('6 notes bilingual; every note says not for sale; SAIL/COMPLETE cite the PILOT gate; FLEET cites the limit');
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
  const sources = [
    ...filesUnder(DOMAIN),
    ...filesUnder(CONTENT),
    ...filesUnder(COMPONENTS),
    ...filesUnder(SECTIONS),
    ...filesUnder(PREVIEW),
  ];
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
// A skip means a required artefact was absent, so the gate could not measure it.
// In CI that is a failure, not a pass: MC23_ALLOW_SKIP=1 is the only way to opt out.
const skipFails = process.env.MC23_ALLOW_SKIP !== '1';

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
    // No timestamp: the evidence file must be byte-stable for a given tree.
    total: results.length,
    passed: passed.length,
    skipped: skipped.length,
    failed: failed.length,
    results: results.map((r) => ({ id: r.id, status: r.status, detail: r.detail })),
  };
  const target = resolve(root, `${EVIDENCE}/mc23-validator-run.json`);
  writeFileSync(target, `${JSON.stringify(payload, null, 2)}\n`);
}

if (failed.length > 0 || (skipFails && skipped.length > 0)) process.exitCode = 1;

/** ENGINE-03 runner entry point: no process spawn, no argv dependency. */
export function runConfined() {
  return failed.length === 0;
}
