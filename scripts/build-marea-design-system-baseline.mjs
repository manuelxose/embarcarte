#!/usr/bin/env node
/**
 * Records the MC-17 legacy UI baseline from the verified MC-16 commit, using the
 * Git object database (not the working tree) so the baseline cannot be
 * "self-validated" by later edits.
 *
 * Output: docs/marea/design-system/data/legacy-ui-baseline.json
 *
 * Usage:
 *   node scripts/build-marea-design-system-baseline.mjs           # write
 *   node scripts/build-marea-design-system-baseline.mjs --check   # verify
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = 'docs/marea/design-system/data/legacy-ui-baseline.json';
const BASE_COMMIT = '6d8287c8507038c4f90fd6e35471f78081ca4676';

const WATCHED = [
  'src/styles.scss',
  'src/app/app.routes.ts',
  'src/app/core/seo.service.ts',
  'src/server.ts',
  'src/main.ts',
  'src/main.server.ts',
  'src/index.html',

  'public/robots.txt',
  'public/site.webmanifest',
  'public/favicon.svg',
  'public/favicon.ico',
  'public/apple-touch-icon.png',
  'public/icon-192.png',
  'public/icon-512.png',
  'public/og-image.png',
];

function git(args) {
  return execFileSync('git', args, { cwd: root, encoding: 'buffer', maxBuffer: 64 * 1024 * 1024 });
}

const sha256 = (buffer) => createHash('sha256').update(buffer).digest('hex');
const head = execFileSync('git', ['rev-parse', BASE_COMMIT], { cwd: root, encoding: 'utf8' }).trim();

// Directory-level baselines: every tracked file under these prefixes at the MC-16 commit.
const WATCHED_TREES = ['src/app/layout', 'src/app/features/home', 'src/app/features/shop', 'src/app/features/legal', 'src/app/core/i18n'];
const tree = git(['ls-tree', '-r', '--name-only', BASE_COMMIT]).toString('utf8').split('\n').filter(Boolean);
const treeFiles = tree.filter((file) => WATCHED_TREES.some((prefix) => file.startsWith(prefix + '/')));

const files = {};
let missing = 0;
for (const path of [...WATCHED, ...treeFiles].sort()) {
  try {
    const blob = git(['show', `${BASE_COMMIT}:${path}`]);
    files[path] = {
      gitBlobSha1: execFileSync('git', ['rev-parse', `${BASE_COMMIT}:${path}`], { cwd: root, encoding: 'utf8' }).trim(),
      sha256: sha256(blob),
      bytes: blob.length,
    };
  } catch {
    missing++;
    files[path] = { gitBlobSha1: null, sha256: null, bytes: null, note: 'not present at baseline commit' };
  }
}

const publicTree = tree.filter((file) => file.startsWith('public/')).sort();
const dataset = {
  contractId: 'MC17-LEGACY-UI-BASELINE',
  contractVersion: '1.0.0',
  milestone: 'MC-17',
  status: 'INTERNAL_PROPOSED',
  owner: 'lead',
  generationMethod: 'git rev-parse <MC-16 commit>:<path> blob id + git show | sha256 (node scripts/build-marea-design-system-baseline.mjs)',
  scope: 'Byte-level baseline of the public website, routing, metadata, static assets and localization architecture at the verified MC-16 HEAD.',
  knownLimitations: [
    'Baseline proves the watched files were not modified; it does not by itself prove runtime visual equivalence.',
    'Playwright visual and accessibility evidence for the public site is recorded separately.',
  ],
  sourceRefs: ['https://github.com/manuelxose/embarcarte/pull/23'],
  baselineCommit: BASE_COMMIT,
  baselineCommitResolved: head,
  watchedTrees: WATCHED_TREES,
  fileCount: Object.keys(files).length,
  publicFileCount: publicTree.length,
  publicFiles: publicTree,
  files,
};
if (process.argv.includes('--check')) {
  if (!existsSync(resolve(root, OUT))) {
    console.error(`MISSING ${OUT}`);
    process.exit(1);
  }
  const current = JSON.parse(readFileSync(resolve(root, OUT), 'utf8'));
  if (JSON.stringify(current) !== JSON.stringify(dataset)) {
    console.error(`STALE ${OUT} (run node scripts/build-marea-design-system-baseline.mjs)`);
    process.exit(1);
  }
  console.log(`Baseline current: ${dataset.fileCount} watched files at ${BASE_COMMIT}.`);
} else {
  writeFileSync(resolve(root, OUT), JSON.stringify(dataset, null, 2) + '\n');
  console.log(`wrote ${OUT}: ${dataset.fileCount} watched files, ${publicTree.length} public files at ${BASE_COMMIT}`);
  if (missing) console.log(`(${missing} watched paths absent at baseline; recorded as such)`);
}
