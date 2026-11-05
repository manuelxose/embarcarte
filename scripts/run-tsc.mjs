#!/usr/bin/env node
/**
 * MC-23 confined typecheck (ENGINE-03 allow-listed entry point).
 *
 * Runs the repository's declared TypeScript projects without a wider command
 * surface. Exits non-zero on any diagnostic.
 *
 * NOTE: the TypeScript compiler is itself a child process. This script therefore
 * works OUTSIDE the ACL sandbox (captain-side, or via parallel-dev shell); inside
 * it the runner reports the typecheck as not run, never as passed.
 */
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const projects = ['tsconfig.app.json', 'preview/landing/tsconfig.json'];
let failed = 0;

for (const project of projects) {
  console.log(`\n=== tsc -p ${project} --noEmit ===`);
  const run = spawnSync(
    process.execPath,
    ['node_modules/typescript/bin/tsc', '-p', project, '--noEmit'],
    { cwd: root, stdio: 'inherit', timeout: 300_000 },
  );
  const status = run.status ?? 1;
  console.log(`=== ${project} exit=${status} ===`);
  if (status !== 0) failed += 1;
}

console.log(`\nMC-23 typecheck: ${failed === 0 ? 'PASS' : 'FAIL'}`);
process.exit(failed === 0 ? 0 : 1);
