import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { api } from './server/api';
import { ensureAdmin, purgeExpiredSessions } from './server/auth';
import { UPLOADS_DIR, db } from './server/db';

const browserDistFolder = join(import.meta.dirname, '../browser');
const SITE_URL = process.env['SITE_URL'] ?? 'https://embarcarte.com';

const app = express();
const angularApp = new AngularNodeAppEngine({ trustProxyHeaders: ['x-forwarded-for', 'x-forwarded-proto'] });

// Detrás de Caddy: confiar en X-Forwarded-For para la IP real del cliente.
app.set('trust proxy', 1);
app.disable('x-powered-by');

app.get('/healthz', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api', api);
app.use('/uploads', express.static(UPLOADS_DIR, { maxAge: '30d', index: false, redirect: false }));

/** Páginas prerenderizadas (una carpeta con index.html por ruta) + productos activos de la tienda. */
const prerenderedPaths = (() => {
  const paths: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (entry === 'index.html') paths.push('/' + relative(browserDistFolder, dir).split(sep).join('/'));
    }
  };
  try {
    walk(browserDistFolder);
  } catch {
    // En el servidor de desarrollo no existe dist/browser.
  }
  return paths.map((p) => (p === '/' ? '/' : p.replace(/\/$/, '')));
})();

app.get('/sitemap.xml', (_req, res) => {
  const products = db.prepare('SELECT slug, updated_at, name_en, summary_en, description_en FROM products WHERE active = 1').all() as {
    slug: string;
    updated_at: string;
    name_en: string;
    summary_en: string;
    description_en: string;
  }[];
  const urls = [
    ...prerenderedPaths.map((path) => ({ path, lastmod: '' })),
    { path: '/tienda', lastmod: '' },
    { path: '/en/shop', lastmod: '' },
    ...products.map((p) => ({ path: `/tienda/${p.slug}`, lastmod: p.updated_at.slice(0, 10) })),
    ...products.filter((p) => p.name_en && p.summary_en && p.description_en).map((p) => ({ path: `/en/shop/${p.slug}`, lastmod: p.updated_at.slice(0, 10) })),
  ];
  res.type('application/xml').setHeader('Cache-Control', 'public, max-age=3600');
  res.send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls
        .sort((a, b) => a.path.localeCompare(b.path))
        .map((u) => `  <url><loc>${(SITE_URL.replace(/\/$/, '') + u.path).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
        .join('\n') +
      '\n</urlset>\n',
  );
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
    setHeaders: (res, path) => {
      // Los ficheros con hash pueden cachearse para siempre; el resto, poco tiempo.
      if (!/-[0-9A-Z]{8,}\.(js|css|woff2?)$/i.test(path)) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }
    },
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  await ensureAdmin();
  purgeExpiredSessions();
  setInterval(purgeExpiredSessions, 6 * 3_600_000).unref();

  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
