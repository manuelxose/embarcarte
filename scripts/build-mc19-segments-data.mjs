#!/usr/bin/env node
/**
 * Deterministic dataset builder for MC-19.
 *
 * Writes two datasets from the source of truth (content + identities + files):
 *   docs/marea/segments/data/mc19-content-projection.json
 *   docs/marea/segments/data/mc19-implementation-inventory.json
 *
 * `--check` recomputes both in memory and fails if the committed bytes differ,
 * so a change to content or to an implementation file cannot leave a stale
 * dataset behind. No timestamp is written: the output is byte-deterministic.
 *
 * Run:
 *   npm run build:mc19:data
 *   npm run check:mc19:data
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildProjection } from './mc19-segments-projection.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = 'docs/marea/segments/data';
const CHECK = process.argv.includes('--check');

const CODE_ROOTS = [
  'src/app/marea-segments',
  'preview/landing',
  'e2e/segments',
  'scripts/mc19-segments-projection.mjs',
  'scripts/build-mc19-segments-data.mjs',
  'scripts/check-mc19-implementation.mjs',
  'scripts/check-mc19-implementation.test.mjs',
  'playwright.segments.config.ts',
];
const CODE_EXTENSIONS = new Set(['.ts', '.mjs', '.json', '.css', '.html']);

function walk(path, out) {
  const absolute = resolve(root, path);
  if (!existsSync(absolute)) return;
  const stats = statSync(absolute);
  if (stats.isFile()) {
    out.push(path);
    return;
  }
  for (const entry of readdirSync(absolute, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    walk(join(path, entry.name), out);
  }
}

function inventory() {
  const files = [];
  for (const codeRoot of CODE_ROOTS) walk(codeRoot, files);
  const filtered = [...new Set(files.map((file) => file.replace(/\\/g, '/')))]
    .filter((file) => CODE_EXTENSIONS.has(file.slice(file.lastIndexOf('.'))))
    .sort();

  const entries = filtered.map((file) => {
    const bytes = readFileSync(resolve(root, file));
    return {
      path: file,
      bytes: bytes.byteLength,
      sha256: createHash('sha256').update(bytes).digest('hex'),
    };
  });

  const designSystemReferences = new Set();
  const landingReferences = new Set();
  for (const file of filtered) {
    if (!file.endsWith('.ts')) continue;
    const source = readFileSync(resolve(root, file), 'utf8');
    for (const match of source.matchAll(/from\s+'([^']*marea-design-system\/[^']*)'/g)) {
      const resolved = match[1].startsWith('.')
        ? relative(root, resolve(dirname(resolve(root, file)), match[1])).replace(/\\/g, '/')
        : match[1];
      designSystemReferences.add(resolved);
    }
    for (const match of source.matchAll(/from\s+'([^']*marea-landing\/[^']*)'/g)) {
      const resolved = match[1].startsWith('.')
        ? relative(root, resolve(dirname(resolve(root, file)), match[1])).replace(/\\/g, '/')
        : match[1];
      landingReferences.add(resolved);
    }
  }

  return {
    contractId: 'MC19-IMPLEMENTATION-INVENTORY',
    contractVersion: '1.0.0',
    milestone: 'MC-19',
    generatedBy: 'scripts/build-mc19-segments-data.mjs',
    publicationStatus: 'NOT_AUTHORIZED',
    files: entries,
    totals: {
      files: entries.length,
      bytes: entries.reduce((sum, entry) => sum + entry.bytes, 0),
    },
    reusedDesignSystemModules: [...designSystemReferences].sort(),
    reusedLandingModules: [...landingReferences].sort(),
  };
}

function serialize(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

const datasets = {
  [`${DATA}/mc19-content-projection.json`]: serialize(buildProjection()),
  [`${DATA}/mc19-implementation-inventory.json`]: serialize(inventory()),
};

if (CHECK) {
  const problems = [];
  for (const [file, expected] of Object.entries(datasets)) {
    const absolute = resolve(root, file);
    if (!existsSync(absolute)) {
      problems.push(`missing dataset: ${file}`);
      continue;
    }
    if (readFileSync(absolute, 'utf8') !== expected) problems.push(`stale dataset: ${file}`);
  }
  if (problems.length) {
    console.error(`FAIL MC-19 datasets: ${problems.join(' | ')}`);
    console.error('Run: npm run build:mc19:data');
    process.exit(1);
  }
  console.log(`PASS MC-19 datasets are current (${Object.keys(datasets).length} files)`);
  process.exit(0);
}

for (const [file, content] of Object.entries(datasets)) {
  writeFileSync(resolve(root, file), content, 'utf8');
  console.log(`wrote ${file}`);
}
const projection = buildProjection();
console.log(
  `MC-19 projection: ${projection.counts.pages} pages, ${projection.counts.resolvedRecords} resolved records`,
);
