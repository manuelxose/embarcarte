#!/usr/bin/env node
/**
 * Isolated SSR server for the MC-18 landing + MC-20 catalogue previews.
 *
 * Isolation and security:
 *   - binds to 127.0.0.1 only (loopback); no publicly hosted preview exists;
 *   - rejects requests whose Host header is not loopback (DNS-rebinding defence);
 *   - never serves the production build, never contacts an external service and
 *     collects no personal data (no forms, no cookies, no analytics);
 *   - returns `X-Robots-Tag: noindex, nofollow, noarchive` on every response.
 *
 * Usage:
 *   npm run build:landing:preview
 *   npm run serve:landing:preview       # http://127.0.0.1:4302/marea
 *                                       # http://127.0.0.1:4302/internal/catalog/nav
 */
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { CATALOG_PREVIEW_ROUTES } from '../../src/app/marea-catalog/models/catalog-identity';

const browserDistFolder = join(import.meta.dirname, '../browser');
const host = '127.0.0.1';
const port = Number(process.env['MAREA_LANDING_PREVIEW_PORT'] ?? 4302);
const angularApp = new AngularNodeAppEngine();

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', false);

// Only loopback hosts may address this preview, even if the binding changes.
const ALLOWED_HOSTS = new Set([`127.0.0.1:${port}`, `localhost:${port}`, '127.0.0.1', 'localhost']);

app.use((req, res, next) => {
  const hostHeader = String(req.headers['host'] ?? '').toLowerCase();
  if (!ALLOWED_HOSTS.has(hostHeader)) {
    res.status(403).type('text/plain').send('Forbidden: internal loopback preview only');
    return;
  }
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "img-src 'self' data:",
      "font-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline'",
      "connect-src 'self'",
      "form-action 'none'",
    ].join('; '),
  );
  next();
});

app.get('/__preview/health', (_req, res) => {
  res.json({
    status: 'ok',
    preview: 'MC-18 internal landing + MC-20/MC-21 internal catalogue',
    publication: 'NOT_AUTHORIZED',
    indexation: 'noindex, nofollow, noarchive',
    host,
    cataloguePaths: CATALOG_PREVIEW_ROUTES.map((route) => `/${route.path}`),
  });
});

app.use(
  express.static(browserDistFolder, {
    index: false,
    maxAge: 0,
    etag: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

app.use((_req, res) => {
  res.status(404).type('text/plain').send('Not found: internal preview');
});

/**
 * The listener only starts when this file is the process entry point. Angular
 * build tooling imports the SSR entry during analysis; starting a listener at
 * import time would print the preview banner and could collide on the port in
 * CI or on another platform.
 */
const server = isMainModule(import.meta.url)
  ? app.listen(port, host, () => {
      console.log(`MC-18/MC-21 internal preview (NOT PUBLISHED): http://${host}:${port}/marea`);
      console.log('Publication NOT_AUTHORIZED · indexation disabled · loopback only');
      for (const route of CATALOG_PREVIEW_ROUTES) {
        console.log(`  catalogue: http://${host}:${port}/${route.path} (${route.familyId})`);
      }
    })
  : null;

export const reqHandler = createNodeRequestHandler(app);
export { server };
