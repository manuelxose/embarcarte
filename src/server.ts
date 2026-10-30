import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express, { type NextFunction, type Request, type Response } from 'express';
import { randomUUID } from 'node:crypto';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import type { RouteId } from './app/core/i18n/locale-routes';
import { LOCALE_INFO } from './app/core/i18n/locale.config';
import { localizedUrl, matchRoute } from './app/core/i18n/locale-routes';
import { LOCALES } from './app/core/i18n/locale.types';
import { api } from './server/api';
import { ensureAdmin, purgeExpiredSessions } from './server/auth';
import { UPLOADS_DIR, db } from './server/db';

const browserDistFolder = join(import.meta.dirname, '../browser');
const SITE_URL = process.env['SITE_URL'] ?? 'https://embarcarte.com';

const app = express();
const angularApp = new AngularNodeAppEngine({ trustProxyHeaders: ['x-forwarded-for', 'x-forwarded-proto'] });

// Detrás de Caddy o nginx: confiar en X-Forwarded-For para la IP real del cliente.
app.set('trust proxy', 1);
app.disable('x-powered-by');

/** Rutas privadas que Angular renderiza en el navegador (`RenderMode.Client`). */
const CLIENT_ROUTES = new Set<RouteId>(['cart', 'login', 'account', 'orderDetail']);

/**
 * Shell CSR localizado. Se sirve antes de Angular para que la primera respuesta
 * de `/en/cart` ya declare `lang="en"`, sin renderizar datos privados ni tocar la
 * sesión. `noindex` se emite también como cabecera: el shell no debe indexarse
 * aunque un rastreador no ejecute JavaScript.
 */
const csrShells = (() => {
  try {
    const shell = readFileSync(join(browserDistFolder, 'index.csr.html'), 'utf8');
    return {
      es: shell,
      en: shell
        .replace('<html lang="es"', '<html lang="en"')
        .replace(
          /<title>[^<]*<\/title>/,
          '<title>Embarcarte · Open marine technology</title>',
        )
        .replace(
          /<meta name="description" content="[^"]*">/,
          '<meta name="description" content="Embarcarte designs and sells open marine technology: navigation electronics, charts, instrumentation and autopilot with Open Marine.">',
        ),
    } satisfies Record<'es' | 'en', string>;
  } catch {
    return null;
  }
})();

/**
 * Cabeceras de seguridad para todas las respuestas de la aplicación.
 *
 * `script-src` conserva `'unsafe-inline'`: Angular SSR inserta scripts de
 * arranque/event-replay en el HTML y el shell CSR los necesita para hidratar.
 * El resto de directivas sí son restrictivas. Se documenta como riesgo residual
 * en `docs/security/M04-SECURITY-REVIEW.md`.
 */
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' https://checkout.stripe.com",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "manifest-src 'self'",
  ...(process.env['NODE_ENV'] === 'production' ? ["upgrade-insecure-requests"] : []),
].join('; ');

app.use((req, res, next) => {
  const requestId = randomUUID();
  res.setHeader('X-Request-Id', requestId);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Content-Security-Policy', CSP);
  if (process.env['NODE_ENV'] === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  const started = process.hrtime.bigint();
  // `req.path` cambia al entrar en un router montado; se captura la ruta completa
  // y sin query antes de que Express la reescriba.
  const requestPath = req.originalUrl.split('?')[0];
  res.once('finish', () => {
    // Los assets con hash no aportan señal operativa; sí se registran páginas y API.
    if (/\.(?:js|css|woff2?|png|jpe?g|webp|svg|ico|map)$/i.test(requestPath) && res.statusCode < 400) return;
    // Solo método, ruta y estado: nunca cookies, cuerpos ni datos de cliente.
    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
    console.log(
      JSON.stringify({
        level,
        event: 'http_request',
        request_id: requestId,
        method: req.method,
        path: requestPath,
        status: res.statusCode,
        duration_ms: Number(process.hrtime.bigint() - started) / 1_000_000,
      }),
    );
  });
  next();
});

app.get('/healthz', (_req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.json({ ok: true, uptime_s: Math.round(process.uptime()) });
});

app.get('/readyz', (_req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    db.prepare('SELECT 1').get();
    res.json({ ok: true, checks: { database: 'ok' } });
  } catch {
    res.status(503).json({ ok: false, checks: { database: 'unavailable' } });
  }
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

const xmlUrl = (path: string) =>
  (SITE_URL.replace(/\/$/, '') + path).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * `xhtml:link` alternates for a published URL, taken from the same route
 * registry the pages use. A pair is emitted only when both locales are actually
 * in the sitemap, so an alternate can never point at a page that is not served.
 */
const sitemapAlternates = (path: string, published: ReadonlySet<string>): string => {
  const match = matchRoute(path);
  if (!match) return '';
  const counterparts = LOCALES.map((locale) => ({
    lang: LOCALE_INFO[locale].htmlLang,
    path: localizedUrl(match.id, locale, match.params),
  }));
  if (!counterparts.every((counterpart) => published.has(counterpart.path))) return '';
  const links = counterparts.map(
    (counterpart) => `<xhtml:link rel="alternate" hreflang="${counterpart.lang}" href="${xmlUrl(counterpart.path)}"/>`,
  );
  // Only the home page is a language-neutral entry point; it points at the default locale.
  if (match.id === 'home') {
    links.push(`<xhtml:link rel="alternate" hreflang="x-default" href="${xmlUrl(localizedUrl('home', 'es'))}"/>`);
  }
  return links.join('');
};

app.get('/sitemap.xml', (_req, res) => {
  const products = db.prepare('SELECT slug, updated_at, name_en, category_en, summary_en, description_en FROM products WHERE active = 1').all() as {
    slug: string;
    updated_at: string;
    name_en: string;
    category_en: string;
    summary_en: string;
    description_en: string;
  }[];
  const translated = products
    .filter((p) => p.name_en && p.category_en && p.summary_en && p.description_en)
    .map((p) => ({ path: `/en/shop/${p.slug}`, lastmod: p.updated_at.slice(0, 10) }));
  const entries = [
    ...prerenderedPaths.map((path) => ({ path, lastmod: '' })),
    { path: '/tienda', lastmod: '' },
    { path: '/en/shop', lastmod: '' },
    ...products.map((p) => ({ path: `/tienda/${p.slug}`, lastmod: p.updated_at.slice(0, 10) })),
    ...translated,
  ];
  const published = new Set(entries.map((entry) => entry.path));
  res.type('application/xml').setHeader('Cache-Control', 'public, max-age=3600');
  res.send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
      entries
        .sort((a, b) => a.path.localeCompare(b.path))
        .map(
          (u) =>
            `  <url><loc>${xmlUrl(u.path)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}${sitemapAlternates(u.path, published)}</url>`,
        )
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
 * Rutas privadas: Angular las renderiza en el navegador. Servir el shell CSR
 * localizado evita que la primera respuesta declare español bajo `/en` y evita
 * que el HTML inicial contenga datos de sesión o de cliente.
 */
app.use((req, res, next) => {
  if ((req.method !== 'GET' && req.method !== 'HEAD') || !csrShells) return next();
  if (!req.accepts('html')) return next();

  const match = matchRoute(req.path);
  const admin = req.path === '/admin' || req.path.startsWith('/admin/');
  if (!admin && (!match || !CLIENT_ROUTES.has(match.id))) return next();

  const locale = match?.locale ?? 'es';
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.send(csrShells[locale]);
});

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

// Errores no controlados de Express o del render SSR: respuesta genérica y log
// estructurado, sin cuerpo de petición ni trazas con datos de cliente.
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err);
  const message = err instanceof Error ? err.message : 'unknown error';
  console.error(
    JSON.stringify({
      level: 'error',
      event: 'request_error',
      method: req.method,
      path: req.path,
      message,
    }),
  );
  if (!res.headersSent) res.status(500).type('text/plain').send('Internal Server Error');
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
