#!/usr/bin/env node
/**
 * Static server for the internal MC-17 component catalogue.
 *
 * The catalogue is a separate Angular project (`marea-design-system-catalogue`)
 * built into dist/marea-ds-catalogue. It is never served by the production SSR
 * server and it is not part of `npm run build`.
 *
 * Usage:
 *   npm run build:design-system-preview
 *   npm run serve:design-system-preview        # http://127.0.0.1:4301
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const base = resolve(root, 'dist/marea-ds-catalogue/browser');
const port = Number(process.env['MAREA_DS_PREVIEW_PORT'] ?? 4301);
const host = '127.0.0.1';
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', `http://${host}:${port}`);
    const requested = decodeURIComponent(url.pathname);
    // path traversal guard: normalise inside the browser output directory
    const candidate = normalize(join(base, requested === '/' ? 'index.html' : requested));
    if (!candidate.startsWith(base)) {
      response.writeHead(403).end('Forbidden');
      return;
    }
    let file = candidate;
    try {
      const info = await stat(file);
      if (info.isDirectory()) file = join(file, 'index.html');
    } catch {
      file = join(base, 'index.html');
    }
    const data = await readFile(file);
    response.writeHead(200, {
      'content-type': MIME[extname(file)] ?? 'application/octet-stream',
      'cache-control': 'no-store',
    });
    response.end(data);
  } catch (error) {
    response
      .writeHead(500)
      .end(
        `Internal catalogue server error: ${error instanceof Error ? error.message : 'unknown'}`,
      );
  }
});

server.listen(port, host, () => {
  console.log(`MC-17 internal catalogue (NOT PUBLISHED): http://${host}:${port}`);
  console.log(`Serving ${base}`);
});
