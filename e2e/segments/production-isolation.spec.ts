import { expect, test } from '@playwright/test';
import { request as httpRequest } from 'node:http';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { PAGES, measuredAt, writeEvidence } from './helpers';

/**
 * AC-05 — the internal pages stay unreachable from the public application.
 *
 * Three independent checks:
 *   1. the preview rejects a non-loopback Host header (DNS-rebinding defence);
 *   2. unknown internal paths return 404;
 *   3. the production build exists, its browser AND server bundles contain no
 *      MC-19 identifier, and the production route files do not reference them.
 */

const PREVIEW = 'http://127.0.0.1:4302';
const PREVIEW_HOST = '127.0.0.1:4302';
const PRODUCTION_TOKENS = [
  'internal/segments',
  'data-marea-segment',
  'marea-segments',
  'shipowners',
];

function get(path: string, hostHeader: string): Promise<{ status: number; body: string }> {
  return new Promise((resolvePromise, reject) => {
    const request = httpRequest(
      `${PREVIEW}${path}`,
      { method: 'GET', headers: { host: hostHeader } },
      (response) => {
        let body = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
          body += chunk;
        });
        response.on('end', () => resolvePromise({ status: response.statusCode ?? 0, body }));
      },
    );
    request.on('error', reject);
    request.end();
  });
}

function walk(directory: string, files: string[] = []): string[] {
  if (!existsSync(directory)) return files;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path, files);
    else if (statSync(path).isFile()) files.push(path);
  }
  return files;
}

test('a non-loopback Host header is rejected', async () => {
  const response = await get(PAGES[0].path, 'evil.example');
  expect(response.status).toBe(403);
  expect(response.body).toContain('Forbidden');
});

test('unknown internal paths return 404', async () => {
  const response = await get('/internal/segments/not-a-page', PREVIEW_HOST);
  expect(response.status).toBe(404);
});

test('the production build exists and contains no MC-19 identifier', async () => {
  const productionRoot = resolve(process.cwd(), 'dist/embarcarte');
  expect(
    existsSync(productionRoot),
    'production build missing: run `npm run build` before the isolation suite',
  ).toBe(true);

  const productionSources = [
    'src/app/app.routes.ts',
    'src/app/app.routes.server.ts',
    'src/app/core/i18n/locale-routes.ts',
    'src/server.ts',
  ];
  for (const file of productionSources) {
    const text = readFileSync(resolve(process.cwd(), file), 'utf8');
    expect(text, `${file} references the internal namespace`).not.toContain('internal/segments');
    expect(text, `${file} imports the segment module`).not.toContain('marea-segments');
  }

  const contaminated: string[] = [];
  const scanned: string[] = [];
  for (const bundle of ['browser', 'server']) {
    for (const file of walk(join(productionRoot, bundle))) {
      if (!/\.(js|mjs|css|html|json)$/.test(file)) continue;
      scanned.push(file.replace(process.cwd(), '').replace(/\\/g, '/'));
      const text = readFileSync(file, 'utf8');
      for (const token of PRODUCTION_TOKENS) {
        if (text.includes(token)) {
          contaminated.push(`${file.replace(process.cwd(), '')} :: ${token}`);
        }
      }
    }
  }
  expect(contaminated, 'production bundle contains MC-19 identifiers').toEqual([]);

  // Re-measure the two preview probes so the evidence file stores observed
  // statuses, not literals copied from an assertion.
  const hostProbe = await get(PAGES[0].path, 'evil.example');
  const unknownProbe = await get('/internal/segments/not-a-page', PREVIEW_HOST);
  expect(hostProbe.status).toBe(403);
  expect(unknownProbe.status).toBe(404);

  writeEvidence('production-isolation-evidence.json', {
    contractId: 'MC19-PRODUCTION-ISOLATION-EVIDENCE',
    milestone: 'MC-19',
    measuredAt: measuredAt(),
    measured: {
      nonLoopbackHostStatus: hostProbe.status,
      unknownInternalPathStatus: unknownProbe.status,
    },
    productionBundle: {
      root: 'dist/embarcarte',
      bundlesScanned: ['browser', 'server'],
      filesScanned: scanned.length,
      tokens: PRODUCTION_TOKENS,
      contaminatedFiles: contaminated,
    },
    productionSources,
  });
});
