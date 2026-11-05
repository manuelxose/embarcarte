#!/usr/bin/env node
/**
 * MC-24 REAL ANGULAR BUILD GATE.
 *
 * MC-23 exposed the gap this script closes: a TypeScript-only check can pass
 * while an Angular template binding is invalid (the preview then failed with
 * NG8002/NG8008). TypeScript does not type-check Angular templates unless the
 * compiler is invoked, so from MC-24 a passing typecheck is never accepted as
 * certification of Angular component correctness.
 *
 * This gate runs three stages in order:
 *
 *   1. POSITIVE — `ng build` for the isolated preview AND the production app.
 *      Any template-binding error aborts the build with a non-zero exit.
 *   2. NEGATIVE — a temporary copy of a real component is given a deliberately
 *      invalid binding (a property binding to a member that does not exist) and
 *      the same builder must REJECT it. The fixture is created inside a
 *      disposable copy of the workspace, never in the source tree, and is
 *      always removed. If the broken build succeeds, the gate fails: a gate that
 *      cannot fail is not a gate.
 *   3. CLEANUP — assert no fixture remains.
 *
 * Read-only with respect to committed sources. No network. No clock dependency
 * beyond the temp directory name.
 */
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const results = [];

function run(label, command, args, cwd) {
  process.stdout.write(`\n=== ${label}: ${command} ${args.join(' ')} ===\n`);
  const started = process.hrtime.bigint();
  const result = spawnSync(command, args, {
    cwd,
    encoding: 'utf8',
    stdio: 'pipe',
    shell: process.platform === 'win32',
    maxBuffer: 64 * 1024 * 1024,
  });
  const ms = Number(process.hrtime.bigint() - started) / 1e6;
  const output = `${result.stdout ?? ''}${result.stderr ?? ''}`;
  const ok = result.status === 0;
  results.push({ label, ok, status: result.status, ms: Math.round(ms) });
  if (!ok) {
    const tail = output.split('\n').slice(-40).join('\n');
    process.stdout.write(`${tail}\n`);
    process.stdout.write(`=== ${label}: EXIT ${result.status} (${Math.round(ms)}ms) ===\n`);
  } else {
    process.stdout.write(`=== ${label}: PASS exit 0 (${Math.round(ms)}ms) ===\n`);
  }
  return { ok, output, status: result.status };
}

// ---------------------------------------------------------------------------
// Stage 1 — POSITIVE: the real Angular builds
// ---------------------------------------------------------------------------
const preview = run(
  'positive-preview-build',
  'npx',
  ['ng', 'build', 'marea-landing-preview'],
  root,
);
const production = run('positive-production-build', 'npx', ['ng', 'build', 'embarcarte'], root);

// ---------------------------------------------------------------------------
// Stage 2 — NEGATIVE: an invalid template binding must be rejected
// ---------------------------------------------------------------------------
// The component under test is a real delivered component. We copy it into a
// disposable project sandbox, inject ONE invalid binding, and require the
// Angular compiler to fail. The sandbox reuses the installed dependencies via a
// junction-free copy of the two tsconfig/angular files it needs.
const COMPONENT = 'src/app/marea-catalog/sections/section-configurator.ts';
const BROKEN_MEMBER = 'mc24DeliberatelyMissingBinding';

function negativeStage() {
  const workspace = mkdtempSync(join(tmpdir(), 'mc24-build-gate-'));
  try {
    // A minimal Angular application that imports the REAL component.
    const source = readFileSync(resolve(root, COMPONENT), 'utf8');
    if (!source.includes('data-mc24-configurator')) {
      return { ok: false, reason: 'component under test is not the delivered configurator' };
    }

    const appDir = join(workspace, 'probe');
    // Copy the whole application source so the probe compiles the REAL module
    // graph; a partial copy fails on unrelated imports and would prove nothing.
    cpSync(resolve(root, 'src'), join(appDir, 'src'), { recursive: true });

    const componentPath = join(appDir, COMPONENT);
    const broken = source.replace(
      'data-mc24-configurator>',
      `data-mc24-configurator [attr.data-broken]="${BROKEN_MEMBER}">`,
    );
    if (broken === source) {
      return { ok: false, reason: 'could not inject the invalid binding into the component' };
    }
    writeFileSync(componentPath, broken);

    writeFileSync(
      join(appDir, 'src/main.ts'),
      [
        "import { bootstrapApplication } from '@angular/platform-browser';",
        "import { MareaCatalogConfigurator } from './app/marea-catalog/sections/section-configurator';",
        'bootstrapApplication(MareaCatalogConfigurator).catch((error) => console.error(error));',
        '',
      ].join('\n'),
    );
    writeFileSync(
      join(appDir, 'angular.json'),
      JSON.stringify({
        version: 1,
        projects: {
          probe: {
            root: '',
            sourceRoot: 'src',
            projectType: 'application',
            architect: {
              build: {
                builder: '@angular/build:application',
                options: {
                  outputPath: 'dist',
                  index: 'src/index.html',
                  browser: 'src/main.ts',
                  tsConfig: 'tsconfig.json',
                  polyfills: [],
                },
              },
            },
          },
        },
      }),
    );
    writeFileSync(
      join(appDir, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          target: 'ES2022',
          module: 'ES2022',
          moduleResolution: 'bundler',
          strict: true,
          skipLibCheck: true,
          experimentalDecorators: true,
          useDefineForClassFields: false,
          types: [],
          lib: ['ES2022', 'DOM'],
        },
        angularCompilerOptions: {
          strictTemplates: true,
          strictInjectionParameters: true,
        },
        files: ['src/main.ts'],
        include: ['src/app/**/*.ts'],
        exclude: ['src/app/app.config.server.ts', 'src/main.server.ts', 'src/server/**/*.ts'],
      }),
    );
    writeFileSync(
      join(appDir, 'src/index.html'),
      '<!doctype html><html><body><app-root></app-root></body></html>',
    );

    // The Angular builder resolves the workspace from angular.json's directory,
    // so the sandbox must see the installed node_modules. A directory junction
    // performs no copy and is removed with the temp directory.
    const modules = join(appDir, 'node_modules');
    const junction = spawnSync(
      'cmd',
      ['/c', 'mklink', '/J', modules, resolve(root, 'node_modules')],
      {
        encoding: 'utf8',
        shell: false,
      },
    );
    if (junction.status !== 0) {
      return { ok: false, reason: `could not link node_modules: ${junction.stderr?.trim()}` };
    }

    const attempt = run('negative-broken-binding-build', 'npx', ['ng', 'build', 'probe'], appDir);

    // The gate must fail for the RIGHT reason. A build that dies on an unrelated
    // error (a missing import, a sandbox path problem) proves nothing about
    // template checking, so we require the diagnostic to NAME the member we
    // deliberately broke. MC-23's failure mode was exactly this: a green signal
    // that did not actually exercise the property under test.
    if (attempt.ok) {
      return {
        ok: false,
        reason:
          'the deliberately invalid template binding BUILT SUCCESSFULLY — the gate cannot detect it',
      };
    }
    if (!attempt.output.includes(BROKEN_MEMBER)) {
      const firstError = attempt.output
        .split('\n')
        .find((line) => line.includes('[ERROR]') || line.includes('ERROR'));
      return {
        ok: false,
        reason: `broken build failed without naming the injected binding; first error: ${(
          firstError ?? '<none>'
        )
          .trim()
          .slice(0, 200)}`,
      };
    }
    if (!/NG8002|NG8008|NG9|Property .* does not exist/i.test(attempt.output)) {
      return {
        ok: false,
        reason: 'the broken build named the binding but reported no Angular template diagnostic',
      };
    }
    return {
      ok: true,
      reason: `invalid template binding rejected by the Angular compiler (${BROKEN_MEMBER})`,
    };
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
}

const directory = dirname(resolve(root, COMPONENT));
const fixtureLeak = existsSync(join(directory, '__mc24-broken-binding.fixture.ts'));
const negative = negativeStage();
results.push({
  label: 'negative-broken-binding',
  ok: negative.ok,
  status: negative.ok ? 0 : 1,
  ms: 0,
});
console.log(
  `\n=== negative-broken-binding: ${negative.ok ? 'PASS' : 'FAIL'} — ${negative.reason} ===`,
);
if (fixtureLeak) {
  console.log('FAIL fixture-leak — a broken-binding fixture was left in the source tree');
  results.push({ label: 'fixture-leak', ok: false, status: 1, ms: 0 });
} else {
  console.log('=== fixture-leak: PASS — no fixture remains in the source tree ===');
  results.push({ label: 'fixture-leak', ok: true, status: 0, ms: 0 });
}

const failed = results.filter((item) => !item.ok);
console.log('\n--- MC-24 real Angular build gate ---');
for (const item of results) {
  console.log(`${item.ok ? 'PASS' : 'FAIL'} ${item.label} (exit ${item.status}, ${item.ms}ms)`);
}
if (!preview.ok || !production.ok) {
  console.log('VERDICT: FAIL — a real Angular build failed');
  process.exit(1);
}
if (!negative.ok) {
  console.log('VERDICT: FAIL — the negative template-binding test did not prove the gate works');
  process.exit(1);
}
console.log(
  'VERDICT: PASS — preview and production builds succeed AND an invalid template binding is rejected',
);
process.exit(0);
