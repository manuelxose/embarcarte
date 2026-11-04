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
 *   3. if a production build exists, its browser bundle contains no MC-19
 *      identifier at all, and the production route files do not reference them.
 */

const PREVIEW = 'http://127.0.0.1:4302';

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
    else files.push(path);
  }
  return files;
}

test('a non-loopback Host header is rejected', async () => {
  const response = await get(PAGES[0].path, 'evil.example');
  expect(response.status).toBe(403);
  expect(response.body).toContain('Forbidden');
});

test('unknown internal paths return 404', async () => {
  const response = await get('/internal/segments/not-a-page', '127.0.0.1:4302');
  expect(response.status).toBe(404);
});

test('the production routes and bundle contain no MC-19 identifier', async () => {
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

  const bundleRoot = resolve(process.cwd(), 'dist/embarcarte/browser');
  const bundleExists = existsSync(bundleRoot);
  const contaminated: string[] = [];
  if (bundleExists) {
    for (const file of walk(bundleRoot)) {
      if (!/\.(js|mjs|css|html|json)$/.test(file)) continue;
      if (!statSync(file).isFile()) continue;
      const text = readFileSync(file, 'utf8');
      if (text.includes('internal/segments') || text.includes('data-marea-segment')) {
        contaminated.push(file.replace(resolve(process.cwd()), '').replace(/\\/g, '/'));
      }
    }
    expect(contaminated, 'production bundle contains MC-19 identifiers').toEqual([]);
  }

  writeEvidence('production-isolation-evidence.json', {
    contractId: 'MC19-PRODUCTION-ISOLATION-EVIDENCE',
    milestone: 'MC-19',
    measuredAt: measuredAt(),
    hostAllowlistRejection: 403,
    unknownPath: 404,
    productionBundleScanned: bundleExists,
    contaminatedFiles: contaminated,
    productionSources,
  });

  if (!bundleExists)
    test.info().annotations.push({
      type: 'production-bundle',
      description:
        'dist/embarcarte/browser not present during this run; the static route-file check still ran.',
    });
});
