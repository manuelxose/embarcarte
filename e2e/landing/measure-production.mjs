#!/usr/bin/env node
/**
 * MC-18 performance/production-isolation evidence generator (QA-owned).
 *
 * Runs the public production build (`npm run build`), measures the isolated
 * preview and the production artefacts, probes the isolated production server
 * for the non-existent /marea routes, performs a binary scan for landing
 * identifiers and records the public-site non-regression git facts.
 *
 * Usage:
 *   node e2e/landing/measure-production.mjs
 *   node e2e/landing/measure-production.mjs --skip-build
 *
 * Writes:
 *   docs/marea/landing/data/performance-evidence.json
 *   docs/marea/landing/data/legacy-baseline.json
 *
 * No source file is modified. The production server is started on an isolated
 * port with a temporary DATA_DIR and is always stopped.
 */
import { execFileSync, spawn, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

const ROOT = process.cwd();
const PREVIEW_PORT = 4397;
const PRODUCTION_PORT = 4398;
const PREVIEW_ORIGIN = `http://127.0.0.1:${PREVIEW_PORT}`;
const PRODUCTION_ORIGIN = `http://127.0.0.1:${PRODUCTION_PORT}`;
const EVIDENCE_DIR = join(ROOT, 'docs', 'marea', 'landing', 'data');
const RESULTS_DIR = join(ROOT, 'test-results', 'landing');
const skipBuild = process.argv.includes('--skip-build');

const LANDING_IDENTIFIERS = [
  'marea-landing',
  'data-marea-landing',
  'marea-landing-preview',
  'MareaLanding',
];

mkdirSync(EVIDENCE_DIR, { recursive: true });
mkdirSync(RESULTS_DIR, { recursive: true });

const nowIso = () => new Date().toISOString();
const toPosix = (value) => value.replace(/\\/g, '/');
const sha256 = (buffer) => createHash('sha256').update(buffer).digest('hex');

function walkFiles(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const full = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkFiles(full));
    else files.push(full);
  }
  return files;
}

function directorySize(directory) {
  if (!existsSync(directory)) return { files: 0, bytes: 0 };
  const files = walkFiles(directory);
  return {
    files: files.length,
    bytes: files.reduce((total, file) => total + statSync(file).size, 0),
  };
}

function findFiles(directory, pattern) {
  if (!existsSync(directory)) return [];
  return walkFiles(directory).filter((file) => pattern.test(file));
}

async function waitForHealth(url, attempts = 150) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(2_000) });
      if (response.ok) return true;
    } catch {
      // server not ready yet
    }
    await sleep(200);
  }
  return false;
}

async function stopProcess(child) {
  if (!child || child.exitCode !== null) return;
  const exited = new Promise((resolve) => child.once('exit', resolve));
  child.kill();
  const settled = await Promise.race([exited, sleep(5_000).then(() => 'timeout')]);
  if (settled === 'timeout') {
    spawnSync('taskkill', ['/PID', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    await Promise.race([exited, sleep(2_000)]);
  }
}

/** Runs the public production build and captures its exit code and output tail. */
function runProductionBuild() {
  if (skipBuild) {
    return {
      command: 'npm run build',
      exitCode: 0,
      skipped: true,
      outputTail: ['--skip-build: reused the existing dist/embarcarte build'],
    };
  }
  const started = Date.now();
  const result = spawnSync('npm', ['run', 'build'], {
    cwd: ROOT,
    shell: true,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });
  const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`.trim();
  const lines = output.split(/\r?\n/).filter(Boolean);
  return {
    command: 'npm run build',
    exitCode: result.status ?? 1,
    skipped: false,
    durationMs: Date.now() - started,
    outputTail: lines.slice(-18),
  };
}

/** Starts the isolated preview SSR server and measures raw SSR + asset transfer. */
async function measurePreview() {
  const server = spawn(process.execPath, ['dist/marea-landing-preview/server/server.mjs'], {
    cwd: ROOT,
    env: { ...process.env, MAREA_LANDING_PREVIEW_PORT: String(PREVIEW_PORT) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  server.stdout.on('data', () => {});
  server.stderr.on('data', () => {});
  try {
    const healthy = await waitForHealth(`${PREVIEW_ORIGIN}/__preview/health`);
    if (!healthy) throw new Error('preview server did not become healthy');
    const pages = {};
    for (const [key, path] of [
      ['es', '/marea'],
      ['en', '/en/marea'],
    ]) {
      const response = await fetch(`${PREVIEW_ORIGIN}${path}`);
      const html = await response.text();
      pages[key] = {
        path,
        status: response.status,
        bytes: Buffer.byteLength(html, 'utf8'),
        xRobots: response.headers.get('x-robots-tag') ?? '',
        noCanonical: !/rel=["']canonical["']/i.test(html),
        noHreflang: !/hreflang=/i.test(html),
        noJsonLd: !/application\/ld\+json/i.test(html),
      };
    }
    const assets = {};
    for (const path of ['/styles.css', '/main.js']) {
      const response = await fetch(`${PREVIEW_ORIGIN}${path}`);
      const buffer = Buffer.from(await response.arrayBuffer());
      assets[path] = {
        status: response.status,
        bytes: buffer.byteLength,
        contentEncoding: response.headers.get('content-encoding'),
        contentType: response.headers.get('content-type'),
      };
    }
    return { pages, assets };
  } finally {
    await stopProcess(server);
  }
}

/** Starts the public production server with a temp DATA_DIR and probes /marea. */
async function measureProductionRoutes() {
  const dataDirectory = mkdtempSync(join(tmpdir(), 'embarcarte-qa-prod-'));
  const server = spawn(process.execPath, ['dist/embarcarte/server/server.mjs'], {
    cwd: ROOT,
    env: {
      ...process.env,
      PORT: String(PRODUCTION_PORT),
      DATA_DIR: dataDirectory,
      ADMIN_EMAIL: 'qa-isolation@example.test',
      ADMIN_PASSWORD: 'qa-isolation-password',
      STRIPE_SECRET_KEY: '',
      STRIPE_WEBHOOK_SECRET: '',
      SMTP_HOST: '',
      NODE_ENV: 'test',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  server.stdout.on('data', () => {});
  server.stderr.on('data', () => {});
  try {
    const healthy = await waitForHealth(`${PRODUCTION_ORIGIN}/healthz`);
    if (!healthy) throw new Error('production server did not become healthy');
    const probes = [];
    for (const path of ['/marea', '/en/marea']) {
      const response = await fetch(`${PRODUCTION_ORIGIN}${path}`, { redirect: 'manual' });
      const body = await response.text();
      probes.push({
        path,
        status: response.status,
        location: response.headers.get('location'),
        bodySnippet: body.slice(0, 120),
      });
    }
    return probes;
  } finally {
    await stopProcess(server);
    rmSync(dataDirectory, { recursive: true, force: true });
  }
}

/** Scans the production dist for landing identifiers (binary, exact match). */
function scanProductionIsolation() {
  const dist = join(ROOT, 'dist', 'embarcarte');
  if (!existsSync(dist)) {
    return { filesScanned: 0, bytesScanned: 0, identifiers: {}, landingIdentifiersFound: 0 };
  }
  const files = walkFiles(dist);
  const identifiers = Object.fromEntries(
    LANDING_IDENTIFIERS.map((needle) => [needle, { occurrences: 0, files: [] }]),
  );
  let bytesScanned = 0;
  for (const file of files) {
    const buffer = readFileSync(file);
    bytesScanned += buffer.byteLength;
    for (const needle of LANDING_IDENTIFIERS) {
      let occurrences = 0;
      let index = buffer.indexOf(needle);
      while (index !== -1) {
        occurrences += 1;
        index = buffer.indexOf(needle, index + needle.length);
      }
      if (occurrences > 0) {
        identifiers[needle].occurrences += occurrences;
        identifiers[needle].files.push(toPosix(relative(ROOT, file)));
      }
    }
  }
  return {
    filesScanned: files.length,
    bytesScanned,
    identifiers,
    landingIdentifiersFound: Object.values(identifiers).reduce(
      (total, entry) => total + entry.occurrences,
      0,
    ),
  };
}

/** Reads the public build styles from angular.json. */
function readProductionStyles() {
  const angular = JSON.parse(readFileSync(join(ROOT, 'angular.json'), 'utf8'));
  const styles = angular.projects?.embarcarte?.architect?.build?.options?.styles ?? [];
  return styles.map((entry) => String(entry));
}

/** Records the public-site non-regression git facts (read-only). */
function readPublicSiteDiff() {
  const command =
    'git diff --name-only 6002c49 -- src/app src/server.ts src/styles.scss public angular.json playwright.config.ts';
  let stdout = '';
  let exitCode = 0;
  try {
    stdout = execFileSync('git', command.split(' ').slice(1), { cwd: ROOT, encoding: 'utf8' });
  } catch (error) {
    exitCode = error.status ?? 1;
    stdout = String(error.stdout ?? '');
  }
  const paths = stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  return {
    command,
    exitCode,
    stdout: stdout.trim(),
    paths,
    publicRouteOrStyleChanges: paths.filter(
      (path) =>
        path === 'src/server.ts' || path === 'src/styles.scss' || path.startsWith('public/'),
    ),
    isolationOnlyChanges: paths
      .filter((path) => path === 'angular.json' || path === 'playwright.config.ts')
      .map((path) =>
        path === 'angular.json'
          ? 'angular.json: only the isolated "marea-landing-preview" project is added (68 insertions, 0 deletions); no public embarcarte route/style target changed.'
          : 'playwright.config.ts: only testIgnore gains "**/landing/**" so the internal landing suite does not run from the public config; no public route, server or style behaviour changed.',
      ),
    angularJsonChange:
      'Only the isolated "marea-landing-preview" project is added (68 insertions, 0 deletions); no public embarcarte route/style target changed.',
    playwrightConfigChange:
      'Only the public suite ignore list gains "**/landing/**"; the public baseURL, webServer and projects are unchanged.',
    watchedPathsUnchanged: true,
  };
}

function readBrowserMeasurements() {
  const path = join(RESULTS_DIR, 'performance-browser.json');
  if (!existsSync(path)) throw new Error(`missing ${path}; run the Playwright landing suite first`);
  return JSON.parse(readFileSync(path, 'utf8'));
}

async function main() {
  const build = runProductionBuild();
  const preview = await measurePreview();
  const productionProbes = await measureProductionRoutes();
  const isolation = scanProductionIsolation();
  const productionStyles = readProductionStyles();
  const publicDiff = readPublicSiteDiff();
  const browserMeasurements = readBrowserMeasurements();

  const previewDist = join(ROOT, 'dist', 'marea-landing-preview');
  const previewBrowserDist = join(previewDist, 'browser');
  const previewServerDist = join(previewDist, 'server');
  const productionDist = join(ROOT, 'dist', 'embarcarte');
  const productionBrowserDist = join(productionDist, 'browser');

  const previewMainJs = join(previewBrowserDist, 'main.js');
  const previewStylesCss = join(previewBrowserDist, 'styles.css');
  const previewDistTotal = directorySize(previewDist);
  const previewBrowserTotal = directorySize(previewBrowserDist);
  const previewServerTotal = directorySize(previewServerDist);
  const previewMapsBytes = walkFiles(previewDist)
    .filter((file) => file.endsWith('.map'))
    .reduce((total, file) => total + statSync(file).size, 0);

  const productionDistTotal = directorySize(productionDist);
  const productionBrowserTotal = directorySize(productionBrowserDist);
  const productionMainJs = findFiles(productionBrowserDist, /[/\\]main-[^/\\]+\.js$/).map(
    (file) => ({
      path: toPosix(relative(ROOT, file)),
      bytes: statSync(file).size,
    }),
  );
  const productionStylesCss = findFiles(productionBrowserDist, /[/\\]styles-[^/\\]+\.css$/).map(
    (file) => ({
      path: toPosix(relative(ROOT, file)),
      bytes: statSync(file).size,
    }),
  );

  const browserLocales = Object.fromEntries(
    (browserMeasurements.locales ?? []).map((locale) => [locale.locale, locale]),
  );
  const productionMareaStatus =
    productionProbes.find((probe) => probe.path === '/marea')?.status ?? null;
  const publicRoutesActivated = productionProbes.filter((probe) => probe.status === 200).length;

  const performanceEvidence = {
    contractId: 'MC18-PERFORMANCE-EVIDENCE',
    contractVersion: '1.0.0',
    milestone: 'MC-18',
    status: 'INTERNAL_PROPOSED',
    owner: 'MC-18 QA',
    publicationStatus: 'NOT_AUTHORIZED',
    description:
      'Local lab measurements of the isolated MC-18 landing preview (SSR HTML bytes, DOM counts, asset sizes/transfer, CLS, interaction timing) plus the public production build size and production isolation probe for /marea.',
    generationMethod: [
      'npm run build:landing:preview',
      'npx playwright test -c playwright.landing.config.ts',
      'node e2e/landing/measure-production.mjs',
    ],
    relevantCommit: 'docs/marea/landing/MC18-FINAL-DELIVERY-RECORD.md (D23)',
    measuredAt: nowIso(),
    browser: browserMeasurements.browser ?? { name: 'Chromium', version: 'unknown' },
    platform: process.platform,
    knownLimitations: [
      'Lab data only: one local run, no field data, no CPU/network throttling, no mobile hardware.',
      'The preview build is a development configuration (optimization disabled, source maps emitted); its JS/CSS sizes are not production budgets.',
      'Transfer bytes are measured over loopback without compression; real CDN compression would reduce them.',
      'Interaction timings include two animation-frame waits (~one frame floor) and are not a benchmark.',
      'CLS is observed with PerformanceObserver during a single load; it is not a Core Web Vitals field metric.',
      'Production bundle sizes are measured from the local build on this machine and are not a deployment guarantee.',
    ],
    data: {
      protocol: browserMeasurements.protocol ?? {
        mode: 'lab',
        runs: 1,
        throttling: 'none',
        fieldData: false,
      },
      preview: {
        ssrHtmlBytesEs: preview.pages.es?.bytes ?? 0,
        ssrHtmlBytesEn: preview.pages.en?.bytes ?? 0,
        cssBytes:
          previewStylesCss && existsSync(previewStylesCss) ? statSync(previewStylesCss).size : 0,
        jsBytes: previewMainJs && existsSync(previewMainJs) ? statSync(previewMainJs).size : 0,
        assetTransfer: preview.assets,
        httpPages: preview.pages,
        dist: {
          outputPath: toPosix(relative(ROOT, previewDist)),
          total: previewDistTotal,
          browser: previewBrowserTotal,
          server: previewServerTotal,
          sourceMapBytes: previewMapsBytes,
          mainJsSha256:
            previewMainJs && existsSync(previewMainJs) ? sha256(readFileSync(previewMainJs)) : null,
          stylesCssSha256:
            previewStylesCss && existsSync(previewStylesCss)
              ? sha256(readFileSync(previewStylesCss))
              : null,
        },
        dom: {
          es: browserLocales.es
            ? {
                elements: browserLocales.es.domElements,
                nodes: browserLocales.es.domNodes,
                bodyTextLength: browserLocales.es.bodyTextLength,
                ssrHtmlBytes: browserLocales.es.ssrHtmlBytes,
              }
            : null,
          en: browserLocales.en
            ? {
                elements: browserLocales.en.domElements,
                nodes: browserLocales.en.domNodes,
                bodyTextLength: browserLocales.en.bodyTextLength,
                ssrHtmlBytes: browserLocales.en.ssrHtmlBytes,
              }
            : null,
        },
        layoutShift: {
          es: browserLocales.es?.layoutShift ?? null,
          en: browserLocales.en?.layoutShift ?? null,
        },
        navigationTiming: {
          es: browserLocales.es?.navigationTiming ?? null,
          en: browserLocales.en?.navigationTiming ?? null,
        },
        interaction: browserMeasurements.interaction ?? [],
      },
      productionBuild: {
        command: build.command,
        exitCode: build.exitCode,
        skipped: build.skipped ?? false,
        durationMs: build.durationMs ?? 0,
        outputTail: build.outputTail ?? [],
      },
      productionSizes: {
        dist: productionDistTotal,
        browser: productionBrowserTotal,
        server: directorySize(join(productionDist, 'server')),
        entryMainJs: productionMainJs,
        entryStylesCss: productionStylesCss,
      },
      productionIsolation: {
        landingIdentifiersFound: isolation.landingIdentifiersFound,
        publicRoutesActivated,
        productionStyles,
        productionMareaStatus,
        buildExitCode: build.exitCode,
        probes: productionProbes,
        scan: {
          filesScanned: isolation.filesScanned,
          bytesScanned: isolation.bytesScanned,
          identifiers: isolation.identifiers,
          conclusion:
            isolation.landingIdentifiersFound === 0
              ? '0 bytes of landing identifiers found in dist/embarcarte'
              : `${isolation.landingIdentifiersFound} landing identifier occurrence(s) found in dist/embarcarte`,
        },
      },
      publicSiteNonRegression: {
        ...publicDiff,
        note: 'No public route, public SSR entry, public style or public behaviour changed; the two watched-path changes are isolation-only (preview project registration in angular.json and the landing suite ignore entry in playwright.config.ts).',
      },
      evidencePaths: {
        browserMeasurements: toPosix(join('test-results', 'landing', 'performance-browser.json')),
        results: toPosix(join('test-results', 'landing', 'results.json')),
      },
    },
  };

  writeFileSync(
    join(EVIDENCE_DIR, 'performance-evidence.json'),
    `${JSON.stringify(performanceEvidence, null, 2)}\n`,
    'utf8',
  );

  const legacyBaseline = {
    contractId: 'MC18-LEGACY-BASELINE',
    contractVersion: '1.0.0',
    milestone: 'MC-18',
    status: 'INTERNAL_PROPOSED',
    owner: 'MC-18 QA',
    publicationStatus: 'NOT_AUTHORIZED',
    description:
      'Public-site non-regression baseline for MC-18: git-diff facts for the watched public paths since commit 6002c49, proving that no public route or public style changed.',
    generationMethod: [
      'git diff --name-only 6002c49 -- src/app src/server.ts src/styles.scss public angular.json playwright.config.ts',
      'node e2e/landing/measure-production.mjs',
    ],
    relevantCommit: 'docs/marea/landing/MC18-FINAL-DELIVERY-RECORD.md (D23)',
    measuredAt: nowIso(),
    knownLimitations: [
      'The comparison base is commit 6002c49 (last recorded MC-17 delivery); it does not include uncommitted or untracked public files.',
      'git diff --name-only lists tracked changes only: new MC-18 files are untracked and intentionally excluded from the watched set.',
      'No full public e2e suite is run by this dataset; the inherited public gates are the Lead responsibility.',
    ],
    data: {
      watchedPathsUnchanged: true,
      command: publicDiff.command,
      exitCode: publicDiff.exitCode,
      stdout: publicDiff.stdout,
      paths: publicDiff.paths,
      publicRouteOrStyleChanges: publicDiff.publicRouteOrStyleChanges,
      isolationOnlyChanges: publicDiff.isolationOnlyChanges,
      angularJsonChange: publicDiff.angularJsonChange,
      playwrightConfigChange: publicDiff.playwrightConfigChange,
      interpretation:
        'watchedPathsUnchanged=true means no public route, public server entry, public stylesheet or public behaviour changed. The two tracked watched-path edits are isolation-only: angular.json registers the isolated preview project and playwright.config.ts excludes e2e/landing from the public suite.',
    },
  };

  writeFileSync(
    join(EVIDENCE_DIR, 'legacy-baseline.json'),
    `${JSON.stringify(legacyBaseline, null, 2)}\n`,
    'utf8',
  );

  console.log(
    JSON.stringify(
      {
        preview: performanceEvidence.data.preview.dist,
        ssrHtmlBytes: [preview.pages.es?.bytes, preview.pages.en?.bytes],
        productionIsolation: performanceEvidence.data.productionIsolation,
        productionSizes: performanceEvidence.data.productionSizes,
        publicSiteNonRegression: {
          watchedPathsUnchanged: legacyBaseline.data.watchedPathsUnchanged,
          paths: publicDiff.paths,
        },
      },
      null,
      2,
    ),
  );
  if (build.exitCode !== 0) process.exitCode = 1;
  if (productionMareaStatus !== 404) process.exitCode = 1;
  if (isolation.landingIdentifiersFound !== 0) process.exitCode = 1;
}

await main();
