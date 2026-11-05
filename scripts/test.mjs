#!/usr/bin/env node
/**
 * MC-23 confined verification runner (ENGINE-03 allow-listed entry point).
 *
 * The ENGINE-03 confined worktree tool may only execute the exact command
 * `node scripts/test.mjs`, so this script takes no arguments. It runs every
 * applicable stage IN-PROCESS: inside the Windows ACL sandbox a spawnSync of
 * `node` or `git` fails with EPERM, so the stages are imported rather than
 * spawned and the validator reads git through scripts/mc23-git-reader.mjs.
 *
 * Stages: mc20, data, then mc23 + unit when those scripts exist on the branch.
 */
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { register } from 'node:module';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
register('./marea-landing-ts-loader.mjs', import.meta.url);
process.env.MC23_CONFINED = '1';

const stages = [
  { id: 'mc20', file: 'scripts/check-mc20-catalog.mjs' },
  { id: 'data', file: 'scripts/build-mc20-catalog-data.mjs' },
  { id: 'mc23', file: 'scripts/check-mc23-bundles.mjs', optional: true },
  { id: 'unit', file: 'scripts/check-mc23-bundles.test.mjs', optional: true, tests: true },
];

const results = [];
for (const stage of stages) {
  const target = resolve(root, stage.file);
  if (!existsSync(target)) {
    if (stage.optional) {
      console.log(`SKIP ${stage.id} - ${stage.file} not present on this branch`);
      continue;
    }
    console.log(`FAIL ${stage.id} - missing ${stage.file}`);
    results.push({ id: stage.id, pass: false });
    continue;
  }
  console.log(`\n=== stage ${stage.id}: ${stage.file} ===`);
  let pass = true;
  try {
    if (stage.tests) {
      // node:test reports through its own runner, which cannot reuse this
      // process's registered loader and cannot be spawned inside the ACL
      // sandbox. The test module therefore exposes runConfined(), which awaits
      // its own node:test run and returns a boolean. A green stage means the
      // assertions actually executed.
      const mod = await import(pathToFileURL(target).href);
      if (typeof mod.runConfined !== 'function') {
        throw new Error('test module must export runConfined()');
      }
      pass = (await mod.runConfined()) === true;
    } else {
      const exitBefore = process.exitCode;
      const mod = await import(pathToFileURL(target).href);
      if (typeof mod.runConfined === 'function' && mod.runConfined() === false) pass = false;
      if (process.exitCode !== undefined && process.exitCode !== exitBefore) {
        pass = false;
        process.exitCode = exitBefore;
      }
    }
  } catch (error) {
    console.log(`FAIL ${stage.id} - ${error instanceof Error ? error.message : String(error)}`);
    pass = false;
  }
  console.log(`=== stage ${stage.id} ${pass ? 'PASS' : 'FAIL'} ===`);
  results.push({ id: stage.id, pass });
}

const failed = results.filter((r) => !r.pass).length;
console.log(`\nMC-23 confined runner: ${failed === 0 ? 'PASS' : 'FAIL'} (${results.length - failed}/${results.length} stages green)`);
process.exit(failed === 0 ? 0 : 1);
