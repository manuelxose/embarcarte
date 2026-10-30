import express, { NextFunction, Request, Response, Router } from 'express';
import { randomBytes } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  createSession,
  currentUser,
  destroySession,
  hashPassword,
  requireAdmin,
  requireUser,
  revokeOtherSessions,
  verifyPassword,
} from './auth';
import { UPLOADS_DIR, db, transaction } from './db';
import { verifyGoogleCredential } from './google';
import { adminInbox, sendMail } from './mail';
import { createCheckoutSession, stripeEnabled, verifyWebhook } from './stripe';

const SITE_URL = process.env['SITE_URL'] ?? 'https://embarcarte.com';
const ORDER_STATUSES = ['pendiente', 'pagado', 'enviado', 'completado', 'cancelado'] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const api = Router();

// Sesiones, pedidos y administración no se cachean nunca.
api.use((req, res, next) => {
  if (/^\/(?:auth|account|orders|admin)\b/.test(req.path)) res.setHeader('Cache-Control', 'no-store');
  next();
});

// --- utilidades -------------------------------------------------------------

const text = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const int = (value: unknown): number | null =>
  typeof value === 'number' && Number.isInteger(value) ? value : null;

const hits = new Map<string, number[]>();
/** Limita a `max` peticiones por IP y clave en una ventana de 10 minutos. */
const rateLimit = (key: string, max: number) => (req: Request, res: Response, next: NextFunction) => {
  const id = `${key}:${req.ip}`;
  const now = Date.now();
  const recent = (hits.get(id) ?? []).filter((t) => now - t < 600_000);
  recent.push(now);
  hits.set(id, recent);
  if (recent.length > max) {
    res.status(429).json({ error: 'too_many_requests' });
    return;
  }
  next();
};
// Las IPs que dejan de enviar peticiones no deben quedar en memoria indefinidamente.
setInterval(() => {
  const now = Date.now();
  for (const [id, times] of hits) {
    const recent = times.filter((t) => now - t < 600_000);
    if (recent.length) hits.set(id, recent);
    else hits.delete(id);
  }
}, 600_000).unref();

/** Hash scrypt válido con el que se gasta el mismo tiempo cuando el email no existe. */
const DUMMY_PASSWORD_HASH = `scrypt$${'0'.repeat(32)}$${'0'.repeat(128)}`;

const hostOf = (url: string): string | null => {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
};

const euros = (cents: number, language: 'es' | 'en' = 'es') =>
  (cents / 100).toLocaleString(language === 'en' ? 'en-GB' : 'es-ES', { style: 'currency', currency: 'EUR' });

/** Repone el stock de un pedido que deja de estar activo. */
const restoreOrderStock = (orderId: number): void => {
  const items = db.prepare('SELECT product_id, qty FROM order_items WHERE order_id = ?').all(orderId) as {
    product_id: number | null;
    qty: number;
  }[];
  for (const item of items) {
    if (item.product_id) db.prepare('UPDATE products SET stock = stock + ? WHERE id = ?').run(item.qty, item.product_id);
  }
};

/** Cancela un pedido pendiente y repone su stock; idempotente. */
const cancelPendingOrder = (orderId: number, stripeSessionId?: string): boolean =>
  transaction(() => {
    const order = db
      .prepare(
        `SELECT status FROM orders WHERE id = ?${stripeSessionId ? ' AND stripe_session_id = ?' : ''}`,
      )
      .get(...(stripeSessionId ? [orderId, stripeSessionId] : [orderId])) as { status: string } | undefined;
    if (!order || order.status !== 'pendiente') return false;
    db.prepare("UPDATE orders SET status = 'cancelado', updated_at = datetime('now') WHERE id = ?").run(orderId);
    restoreOrderStock(orderId);
    return true;
  });

// Webhook de Stripe: necesita el cuerpo sin parsear, así que va antes de express.json().
api.post('/stripe/webhook', express.raw({ type: 'application/json', limit: '1mb' }), (req, res) => {
  if (!verifyWebhook(req.body as Buffer, req.header('stripe-signature'))) {
    res.status(400).end();
    return;
  }
  let event: { type?: string; data?: { object?: { payment_status?: string; id?: string; metadata?: { order_id?: string } } } };
  try {
    event = JSON.parse((req.body as Buffer).toString('utf8'));
  } catch {
    // Un cuerpo firmado pero no JSON es inválido; no se registra su contenido.
    res.status(400).end();
    return;
  }
  const session = event.data?.object;
  if (event.type === 'checkout.session.completed' && session?.payment_status === 'paid' && session.id) {
    db.prepare(
      `UPDATE orders SET status = 'pagado', updated_at = datetime('now')
       WHERE id = ? AND stripe_session_id = ? AND status = 'pendiente'`,
    ).run(Number(session.metadata?.order_id), session.id);
  }
  // Una sesión de Checkout caducada libera el stock que el pedido había reservado.
  if (event.type === 'checkout.session.expired' && session?.id) {
    const order = db
      .prepare("SELECT id FROM orders WHERE stripe_session_id = ? AND status = 'pendiente'")
      .get(session.id) as { id: number } | undefined;
    if (order) cancelPendingOrder(order.id, session.id);
  }
  res.json({ received: true });
});

api.use(express.json({ limit: '50kb' }));

// Protección CSRF adicional a SameSite=Lax: las peticiones que modifican datos deben venir del propio sitio.
api.use((req, res, next) => {
  if (req.method === 'GET' || req.method === 'HEAD') return next();
  const origin = req.header('origin');
  if (origin && hostOf(origin) !== req.header('host')) {
    res.status(403).json({ error: 'bad_origin' });
    return;
  }
  next();
});

// --- autenticación ----------------------------------------------------------

api.post('/auth/register', rateLimit('register', 10), async (req, res) => {
  const name = text(req.body.name, 120);
  const email = text(req.body.email, 200).toLowerCase();
  const password = typeof req.body.password === 'string' ? req.body.password : '';
  if (!name || !EMAIL_RE.test(email) || password.length < 8 || password.length > 200) {
    res.status(400).json({ error: 'invalid' });
    return;
  }
  const existing = db.prepare('SELECT google_id FROM users WHERE email = ?').get(email) as
    | { google_id: string | null }
    | undefined;
  if (existing) {
    res.status(409).json({ error: existing.google_id ? 'email_taken_google' : 'email_taken' });
    return;
  }
  const result = db
    .prepare('INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)')
    .run(email, name, await hashPassword(password));
  createSession(res, Number(result.lastInsertRowid));
  res.status(201).json(currentUserById(Number(result.lastInsertRowid)));
});

api.post('/auth/login', rateLimit('login', 10), async (req, res) => {
  const email = text(req.body.email, 200).toLowerCase();
  const password = typeof req.body.password === 'string' ? req.body.password : '';
  const row = db.prepare('SELECT id, password_hash FROM users WHERE email = ?').get(email) as
    | { id: number; password_hash: string }
    | undefined;
  // Se verifica siempre, incluso sin usuario, para no revelar por tiempo si el email existe.
  const valid = await verifyPassword(password, row?.password_hash ?? DUMMY_PASSWORD_HASH);
  if (!row || !valid) {
    res.status(401).json({ error: 'invalid_credentials' });
    return;
  }
  createSession(res, row.id);
  res.json(currentUserById(row.id));
});

api.post('/auth/logout', (req, res) => {
  destroySession(req, res);
  res.status(204).end();
});

/**
 * Inicio de sesión y alta con Google Identity Services.
 *
 * El navegador envía el `credential` (ID token) y el servidor valida firma,
 * emisor, audiencia, caducidad y `email_verified` antes de crear la sesión.
 * Una cuenta local con el mismo email NO se vincula automáticamente: como el
 * registro local no verifica el email, hacerlo permitiría reclamar una cuenta
 * ajena. El usuario debe acceder con su contraseña; vincular Google requiere un
 * flujo autenticado aparte.
 */
api.post('/auth/google', rateLimit('google', 10), async (req, res) => {
  const credential =
    typeof req.body?.credential === 'string'
      ? req.body.credential
      : typeof req.body?.idToken === 'string'
        ? req.body.idToken
        : '';
  if (!credential || credential.length > 5000) {
    res.status(400).json({ error: 'invalid' });
    return;
  }

  let identity;
  try {
    identity = await verifyGoogleCredential(credential);
  } catch {
    res.status(401).json({ error: 'invalid_google_token' });
    return;
  }

  const byGoogle = db.prepare('SELECT id FROM users WHERE google_id = ?').get(identity.googleId) as
    | { id: number }
    | undefined;
  let userId: number;

  if (byGoogle) {
    userId = byGoogle.id;
  } else {
    const byEmail = db
      .prepare('SELECT id, google_id FROM users WHERE email = ?')
      .get(identity.email) as { id: number; google_id: string | null } | undefined;
    if (byEmail) {
      res.status(409).json({
        error: byEmail.google_id ? 'google_account_conflict' : 'google_email_exists',
      });
      return;
    }

    const passwordHash = await hashPassword(randomBytes(32).toString('base64url'));
    try {
      const created = db
        .prepare('INSERT INTO users (email, name, password_hash, google_id) VALUES (?, ?, ?, ?)')
        .run(identity.email, identity.name || identity.email.split('@')[0], passwordHash, identity.googleId);
      userId = Number(created.lastInsertRowid);
    } catch (err) {
      // Dos peticiones simultáneas pueden competir por el email o el google_id.
      const raced = db
        .prepare('SELECT id, google_id FROM users WHERE email = ? OR google_id = ?')
        .get(identity.email, identity.googleId) as { id: number; google_id: string | null } | undefined;
      if (!raced) throw err;
      if (raced.google_id === identity.googleId) {
        userId = raced.id;
      } else {
        res.status(409).json({
          error: raced.google_id ? 'google_account_conflict' : 'google_email_exists',
        });
        return;
      }
    }
  }

  createSession(res, userId);
  res.json(currentUserById(userId));
});

api.get('/auth/me', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.json(currentUser(req) ?? null);
});

const currentUserById = (id: number) =>
  db.prepare('SELECT id, email, name, role, phone, address, created_at FROM users WHERE id = ?').get(id);

// --- cuenta de cliente ------------------------------------------------------

api.put('/account', requireUser, (req, res) => {
  const name = text(req.body.name, 120);
  if (!name) {
    res.status(400).json({ error: 'invalid' });
    return;
  }
  db.prepare('UPDATE users SET name = ?, phone = ?, address = ? WHERE id = ?').run(
    name,
    text(req.body.phone, 40),
    text(req.body.address, 500),
    req.user!.id,
  );
  res.json(currentUserById(req.user!.id));
});

api.put('/account/password', requireUser, rateLimit('password', 10), async (req, res) => {
  const { current, next } = req.body ?? {};
  const row = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(req.user!.id) as { password_hash: string };
  if (typeof next !== 'string' || next.length < 8 || next.length > 200) {
    res.status(400).json({ error: 'invalid' });
    return;
  }
  if (typeof current !== 'string' || !(await verifyPassword(current, row.password_hash))) {
    res.status(401).json({ error: 'invalid_credentials' });
    return;
  }
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(await hashPassword(next), req.user!.id);
  // Si la contraseña se cambió porque la cuenta estaba comprometida, las demás
  // sesiones dejan de ser válidas inmediatamente.
  revokeOtherSessions(req, req.user!.id);
  res.status(204).end();
});

// --- tienda -----------------------------------------------------------------

const PUBLIC_PRODUCT = 'id, slug, name, category, summary, description, price_cents, stock, image, name_en, category_en, summary_en, description_en';

api.get('/shop/products', (_req, res) => {
  res.json(db.prepare(`SELECT ${PUBLIC_PRODUCT} FROM products WHERE active = 1 ORDER BY name`).all());
});

api.get('/shop/products/:slug', (req, res) => {
  const product = db.prepare(`SELECT ${PUBLIC_PRODUCT} FROM products WHERE slug = ? AND active = 1`).get(req.params['slug']);
  if (!product) {
    res.status(404).json({ error: 'not_found' });
    return;
  }
  res.json(product);
});

api.get('/shop/config', (_req, res) => {
  res.json({ stripe: stripeEnabled() });
});

// --- pedidos ----------------------------------------------------------------

class OrderError extends Error {}

api.post('/orders', requireUser, rateLimit('orders', 20), async (req, res) => {
  const items = Array.isArray(req.body.items) ? req.body.items.slice(0, 50) : [];
  const shippingName = text(req.body.shippingName, 120);
  const shippingAddress = text(req.body.shippingAddress, 500);
  const shippingPhone = text(req.body.shippingPhone, 40);
  const payment = req.body.payment;
  const language = req.body.language === 'en' ? 'en' : 'es';
  if (!items.length || !shippingName || !shippingAddress || !shippingPhone || req.body.terms !== true ||
      (payment !== 'transferencia' && payment !== 'tarjeta') || (payment === 'tarjeta' && !stripeEnabled())) {
    res.status(400).json({ error: 'invalid' });
    return;
  }

  let orderId: number;
  let lines: { name: string; unit_cents: number; qty: number }[];
  try {
    ({ orderId, lines } = transaction(() => {
      const lines: { id: number; name: string; unit_cents: number; qty: number }[] = [];
      const seen = new Set<number>();
      for (const item of items) {
        const qty = int(item?.qty);
        const product = db
          .prepare('SELECT id, name, name_en, price_cents, stock FROM products WHERE slug = ? AND active = 1')
          .get(text(item?.slug, 120)) as { id: number; name: string; name_en: string; price_cents: number; stock: number } | undefined;
        if (!product || !qty || qty < 1 || qty > 99) throw new OrderError('invalid_item');
        if (int(item?.price_cents) !== product.price_cents) throw new OrderError('price_changed');
        if (seen.has(product.id)) throw new OrderError('invalid_item');
        seen.add(product.id);
        if (product.stock < qty) throw new OrderError('out_of_stock');
        lines.push({ id: product.id, name: language === 'en' && product.name_en ? product.name_en : product.name, unit_cents: product.price_cents, qty });
      }
      const total = lines.reduce((sum, l) => sum + l.unit_cents * l.qty, 0);
      const order = db
        .prepare(
          `INSERT INTO orders (user_id, total_cents, payment_method, shipping_name, shipping_address, shipping_phone, notes)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
        )
        .run(req.user!.id, total, payment, shippingName, shippingAddress, shippingPhone, text(req.body.notes, 1000));
      const orderId = Number(order.lastInsertRowid);
      for (const l of lines) {
        db.prepare('INSERT INTO order_items (order_id, product_id, name, unit_cents, qty) VALUES (?, ?, ?, ?, ?)').run(
          orderId,
          l.id,
          l.name,
          l.unit_cents,
          l.qty,
        );
        db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?').run(l.qty, l.id);
      }
      return { orderId, lines };
    }));
  } catch (err) {
    if (err instanceof OrderError) {
      res.status(409).json({ error: err.message });
      return;
    }
    throw err;
  }

  const total = lines.reduce((sum, l) => sum + l.unit_cents * l.qty, 0);
  const summary = lines.map((l) => `${l.qty} × ${l.name} (${euros(l.unit_cents, language)})`).join('\n');
  void sendMail(
    adminInbox(),
    `[embarcarte.com] Nuevo pedido #${orderId}`,
    `Cliente: ${req.user!.name} <${req.user!.email}>\nPago: ${payment}\n\n${summary}\n\nTotal: ${euros(total, language)}`,
  );
  void sendMail(
    req.user!.email,
    language === 'en' ? `We received your order #${orderId}` : `Hemos recibido tu pedido #${orderId}`,
    language === 'en'
      ? `Hello ${req.user!.name},\n\nThank you for your order with Embarcarte.\n\n${summary}\n\nTotal: ${euros(total, language)}\n\n${payment === 'transferencia' ? 'We will send the bank transfer details and confirm delivery timing.\n' : ''}Track your order at ${SITE_URL}/en/account/orders/${orderId}\n`
      : `Hola ${req.user!.name},\n\nGracias por tu pedido en Embarcarte.\n\n${summary}\n\nTotal: ${euros(total, language)}\n\n${payment === 'transferencia' ? 'Te enviaremos los datos para la transferencia y confirmaremos el plazo de entrega.\n' : ''}Puedes seguirlo en ${SITE_URL}/cuenta/pedidos/${orderId}\n`,
  );

  if (payment === 'tarjeta') {
    try {
      const session = await createCheckoutSession(orderId, req.user!.email, lines, SITE_URL, language);
      db.prepare('UPDATE orders SET stripe_session_id = ? WHERE id = ?').run(session.id, orderId);
      res.status(201).json({ id: orderId, checkoutUrl: session.url });
      return;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'unknown error';
      console.error(JSON.stringify({ level: 'error', event: 'stripe_checkout_error', message }));
      // Sin sesión de Stripe no hay webhook de expiración: se libera la reserva
      // de stock y se pide al cliente que lo intente de nuevo.
      try {
        cancelPendingOrder(orderId);
      } catch {
        console.error(JSON.stringify({ level: 'error', event: 'order_cancel_after_payment_error', order_id: orderId }));
      }
      res.status(502).json({ error: 'payment_unavailable' });
      return;
    }
  }
  res.status(201).json({ id: orderId });
});

const orderWithItems = (id: number) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id) as Record<string, unknown> | undefined;
  if (!order) return undefined;
  delete order['stripe_session_id'];
  order['items'] = db.prepare('SELECT product_id, name, unit_cents, qty FROM order_items WHERE order_id = ?').all(id);
  return order;
};

api.get('/orders', requireUser, (req, res) => {
  res.json(
    db
      .prepare('SELECT id, status, total_cents, payment_method, created_at FROM orders WHERE user_id = ? ORDER BY id DESC')
      .all(req.user!.id),
  );
});

api.get('/orders/:id', requireUser, (req, res) => {
  const order = orderWithItems(Number(req.params['id']));
  if (!order || (order['user_id'] !== req.user!.id && req.user!.role !== 'admin')) {
    res.status(404).json({ error: 'not_found' });
    return;
  }
  res.json(order);
});

// --- contacto ---------------------------------------------------------------

api.post('/contact', rateLimit('contact', 5), (req, res) => {
  const body = req.body ?? {};
  // Campo trampa: los bots lo rellenan, las personas no lo ven.
  if (text(body.website, 200)) {
    res.status(204).end();
    return;
  }
  const name = text(body.name, 120);
  const email = text(body.email, 200);
  const phone = text(body.phone, 40);
  const topic = text(body.topic, 80);
  const message = text(body.message, 5000);
  if (!name || !EMAIL_RE.test(email) || !message || body.consent !== true) {
    res.status(400).json({ error: 'invalid' });
    return;
  }
  db.prepare('INSERT INTO messages (name, email, phone, topic, message) VALUES (?, ?, ?, ?, ?)').run(
    name,
    email,
    phone,
    topic,
    message,
  );
  void sendMail(
    adminInbox(),
    `[embarcarte.com] Consulta de ${name}`,
    `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || '-'}\nTema: ${topic || '-'}\n\n${message}`,
    email,
  );
  res.status(202).json({ ok: true });
});

// --- administración ---------------------------------------------------------

const admin = Router();
admin.use(requireAdmin);
api.use('/admin', admin);

admin.get('/stats', (_req, res) => {
  const one = (sql: string) => Object.values(db.prepare(sql).get() as Record<string, number>)[0] ?? 0;
  res.json({
    revenueCents: one("SELECT COALESCE(SUM(total_cents), 0) FROM orders WHERE status IN ('pagado', 'enviado', 'completado')"),
    pendingOrders: one("SELECT COUNT(*) FROM orders WHERE status IN ('pendiente', 'pagado')"),
    customers: one("SELECT COUNT(*) FROM users WHERE role = 'customer'"),
    unreadMessages: one('SELECT COUNT(*) FROM messages WHERE read = 0'),
    activeProducts: one('SELECT COUNT(*) FROM products WHERE active = 1'),
  });
});

admin.get('/products', (_req, res) => {
  res.json(db.prepare('SELECT * FROM products ORDER BY active DESC, name').all());
});

admin.get('/products/:id', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(Number(req.params['id']));
  if (!product) {
    res.status(404).json({ error: 'not_found' });
    return;
  }
  res.json(product);
});

const productInput = (body: Record<string, unknown>) => {
  const p = {
    slug: text(body['slug'], 120),
    name: text(body['name'], 160),
    category: text(body['category'], 60) || 'Tecnología',
    summary: text(body['summary'], 300),
    description: text(body['description'], 10_000),
    name_en: typeof body['name_en'] === 'string' ? text(body['name_en'], 160) : null,
    category_en: typeof body['category_en'] === 'string' ? text(body['category_en'], 60) : null,
    summary_en: typeof body['summary_en'] === 'string' ? text(body['summary_en'], 300) : null,
    description_en: typeof body['description_en'] === 'string' ? text(body['description_en'], 10_000) : null,
    price_cents: int(body['price_cents']),
    stock: int(body['stock']),
    image: text(body['image'], 500),
    active: body['active'] ? 1 : 0,
  };
  const valid =
    SLUG_RE.test(p.slug) &&
    p.name &&
    p.price_cents !== null &&
    p.price_cents >= 0 &&
    p.stock !== null &&
    p.stock >= 0 &&
    (!p.image || /^(https:\/\/|\/)/.test(p.image));
  return valid ? p : null;
};

admin.post('/products', (req, res) => {
  const p = productInput(req.body);
  if (!p) {
    res.status(400).json({ error: 'invalid' });
    return;
  }
  if (db.prepare('SELECT 1 FROM products WHERE slug = ?').get(p.slug)) {
    res.status(409).json({ error: 'slug_taken' });
    return;
  }
  const r = db
    .prepare(
      `INSERT INTO products (slug, name, category, summary, description, price_cents, stock, image, active, name_en, category_en, summary_en, description_en)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(p.slug, p.name, p.category, p.summary, p.description, p.price_cents!, p.stock!, p.image, p.active, p.name_en ?? '', p.category_en ?? '', p.summary_en ?? '', p.description_en ?? '');
  res.status(201).json(db.prepare('SELECT * FROM products WHERE id = ?').get(Number(r.lastInsertRowid)));
});

admin.put('/products/:id', (req, res) => {
  const id = Number(req.params['id']);
  const p = productInput(req.body);
  if (!p) {
    res.status(400).json({ error: 'invalid' });
    return;
  }
  if (db.prepare('SELECT 1 FROM products WHERE slug = ? AND id != ?').get(p.slug, id)) {
    res.status(409).json({ error: 'slug_taken' });
    return;
  }
  const r = db
    .prepare(
      `UPDATE products SET slug = ?, name = ?, category = ?, summary = ?, description = ?, price_cents = ?,
       stock = ?, image = ?, active = ?, name_en = COALESCE(?, name_en), category_en = COALESCE(?, category_en), summary_en = COALESCE(?, summary_en), description_en = COALESCE(?, description_en), updated_at = datetime('now') WHERE id = ?`,
    )
    .run(p.slug, p.name, p.category, p.summary, p.description, p.price_cents!, p.stock!, p.image, p.active, p.name_en, p.category_en, p.summary_en, p.description_en, id);
  if (!r.changes) {
    res.status(404).json({ error: 'not_found' });
    return;
  }
  res.json(db.prepare('SELECT * FROM products WHERE id = ?').get(id));
});

admin.delete('/products/:id', (req, res) => {
  db.prepare('DELETE FROM products WHERE id = ?').run(Number(req.params['id']));
  res.status(204).end();
});

const IMAGE_TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };

/** Comprueba la firma real del fichero: el `Content-Type` del cliente no es suficiente. */
const hasImageSignature = (body: Buffer, ext: string): boolean => {
  if (ext === 'jpg') return body.length > 3 && body[0] === 0xff && body[1] === 0xd8 && body[2] === 0xff;
  if (ext === 'png') {
    return body.length > 8 && body.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  }
  return body.length > 12 && body.subarray(0, 4).toString('ascii') === 'RIFF' && body.subarray(8, 12).toString('ascii') === 'WEBP';
};

// Subida de imágenes de producto: se guardan en DATA_DIR/uploads y se sirven en /uploads.
admin.post('/uploads', express.raw({ type: Object.keys(IMAGE_TYPES), limit: '8mb' }), (req, res) => {
  const ext = IMAGE_TYPES[req.header('content-type') ?? ''];
  const body = req.body as Buffer;
  if (!ext || !Buffer.isBuffer(body) || !body.length || !hasImageSignature(body, ext)) {
    res.status(400).json({ error: 'invalid' });
    return;
  }
  mkdirSync(UPLOADS_DIR, { recursive: true });
  const name = `${Date.now().toString(36)}-${randomBytes(6).toString('hex')}.${ext}`;
  writeFileSync(join(UPLOADS_DIR, name), body);
  res.status(201).json({ url: `/uploads/${name}` });
});

admin.get('/orders', (_req, res) => {
  res.json(
    db
      .prepare(
        `SELECT o.id, o.status, o.total_cents, o.payment_method, o.created_at, u.name AS customer, u.email
         FROM orders o JOIN users u ON u.id = o.user_id ORDER BY o.id DESC LIMIT 500`,
      )
      .all(),
  );
});

admin.get('/orders/:id', (req, res) => {
  const order = orderWithItems(Number(req.params['id']));
  if (!order) {
    res.status(404).json({ error: 'not_found' });
    return;
  }
  order['customer'] = db.prepare('SELECT id, name, email, phone FROM users WHERE id = ?').get(order['user_id'] as number);
  res.json(order);
});

admin.put('/orders/:id', (req, res) => {
  const id = Number(req.params['id']);
  const status = req.body.status;
  if (!ORDER_STATUSES.includes(status)) {
    res.status(400).json({ error: 'invalid' });
    return;
  }
  try {
    const found = transaction(() => {
      // La lectura debe estar dentro de la transacción: dos cancelaciones
      // concurrentes no pueden ver ambas el estado anterior y reponer dos veces.
      const current = db.prepare('SELECT status FROM orders WHERE id = ?').get(id) as { status: string } | undefined;
      if (!current) return false;
      // Al cancelar se repone el stock; al reactivar un pedido cancelado se vuelve a descontar.
      const delta =
        status === 'cancelado' && current.status !== 'cancelado'
          ? 1
          : current.status === 'cancelado' && status !== 'cancelado'
            ? -1
            : 0;
      if (delta) {
        for (const item of db.prepare('SELECT product_id, qty FROM order_items WHERE order_id = ?').all(id) as {
          product_id: number | null;
          qty: number;
        }[]) {
          if (item.product_id) {
            const change = db
              .prepare('UPDATE products SET stock = stock + ? WHERE id = ? AND stock + ? >= 0')
              .run(delta * item.qty, item.product_id, delta * item.qty);
            if (delta < 0 && !change.changes) throw new OrderError('out_of_stock');
          }
        }
      }
      db.prepare("UPDATE orders SET status = ?, updated_at = datetime('now') WHERE id = ?").run(status, id);
      return true;
    });
    if (!found) {
      res.status(404).json({ error: 'not_found' });
      return;
    }
  } catch (err) {
    if (err instanceof OrderError) {
      res.status(409).json({ error: err.message });
      return;
    }
    throw err;
  }
  res.json(orderWithItems(id));
});

admin.get('/customers', (_req, res) => {
  res.json(
    db
      .prepare(
        `SELECT u.id, u.name, u.email, u.phone, u.role, u.created_at,
                COUNT(o.id) AS orders, COALESCE(SUM(CASE WHEN o.status != 'cancelado' THEN o.total_cents END), 0) AS spent_cents
         FROM users u LEFT JOIN orders o ON o.user_id = u.id
         GROUP BY u.id ORDER BY u.id DESC LIMIT 1000`,
      )
      .all(),
  );
});

admin.get('/messages', (_req, res) => {
  res.json(db.prepare('SELECT * FROM messages ORDER BY id DESC LIMIT 500').all());
});

admin.put('/messages/:id', (req, res) => {
  db.prepare('UPDATE messages SET read = ? WHERE id = ?').run(req.body.read ? 1 : 0, Number(req.params['id']));
  res.status(204).end();
});

admin.delete('/messages/:id', (req, res) => {
  db.prepare('DELETE FROM messages WHERE id = ?').run(Number(req.params['id']));
  res.status(204).end();
});

api.use((_req, res) => {
  res.status(404).json({ error: 'not_found' });
});

api.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const message = err instanceof Error ? err.message : 'unknown error';
  console.error(JSON.stringify({ level: 'error', event: 'api_error', message }));
  res.status(500).json({ error: 'server_error' });
});
