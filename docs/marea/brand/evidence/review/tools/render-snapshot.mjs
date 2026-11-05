#!/usr/bin/env node
/** Snapshot sha256/bytes of every file the AssetProduction pipeline may write, plus the manifest,
 * so a re-run of scripts/render-assets.mjs can be compared byte-for-byte for determinism. */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../../..');
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'raw', process.argv[2] ?? 'render-snapshot-before.json');
function walk(dir, acc) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}
const dirs = ['docs/marea/brand/assets', 'docs/marea/assets/manifest'];
const files = {};
for (const d of dirs) {
  for (const p of walk(join(ROOT, d), []).sort()) {
    const rel = relative(ROOT, p).split('\\').join('/');
    const b = readFileSync(p);
    files[rel] = { bytes: b.length, sha256: createHash('sha256').update(b).digest('hex') };
  }
}
writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), fileCount: Object.keys(files).length, files }, null, 2));
console.log('snapshot files:', Object.keys(files).length, '->', OUT);
