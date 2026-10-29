import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import nodemailer from 'nodemailer';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Detrás de Caddy: confiar en X-Forwarded-For para la IP real del cliente.
app.set('trust proxy', 1);
app.disable('x-powered-by');

app.get('/healthz', (_req, res) => {
  res.json({ ok: true });
});

const mailer = process.env['SMTP_HOST']
  ? nodemailer.createTransport({
      host: process.env['SMTP_HOST'],
      port: Number(process.env['SMTP_PORT'] ?? 587),
      secure: process.env['SMTP_SECURE'] === 'true',
      auth: process.env['SMTP_USER']
        ? { user: process.env['SMTP_USER'], pass: process.env['SMTP_PASS'] }
        : undefined,
    })
  : null;

const recentByIp = new Map<string, number[]>();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const hits = (recentByIp.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  recentByIp.set(ip, hits);
  return hits.length > RATE_MAX;
};

const text = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

app.post('/api/contact', express.json({ limit: '20kb' }), async (req, res) => {
  const body = req.body ?? {};
  // Campo trampa: los bots lo rellenan, las personas no lo ven.
  if (text(body.website, 200)) {
    res.status(204).end();
    return;
  }
  if (isRateLimited(req.ip ?? 'unknown')) {
    res.status(429).json({ error: 'too_many_requests' });
    return;
  }

  const name = text(body.name, 120);
  const email = text(body.email, 200);
  const phone = text(body.phone, 40);
  const product = text(body.product, 60);
  const message = text(body.message, 5000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || body.consent !== true) {
    res.status(400).json({ error: 'invalid' });
    return;
  }

  const summary = `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || '-'}\nInterés: ${product || '-'}\n\n${message}`;
  if (!mailer) {
    console.warn('[contact] SMTP no configurado; mensaje recibido:\n' + summary);
    res.status(202).json({ ok: true });
    return;
  }
  try {
    await mailer.sendMail({
      from: process.env['CONTACT_FROM'] ?? process.env['SMTP_USER'],
      to: process.env['CONTACT_TO'] ?? 'info@embarcarte.com',
      replyTo: email,
      subject: `[embarcarte.com] Consulta de ${name}`,
      text: summary,
    });
    res.status(202).json({ ok: true });
  } catch (err) {
    console.error('[contact] error enviando email', err);
    res.status(502).json({ error: 'mail_failed' });
  }
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
      if (!/\.[0-9A-Z]{8,}\.(js|css)$/i.test(path)) {
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
