import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { createServer } from 'node:net';
import { DatabaseSync } from 'node:sqlite';

const temp = await mkdtemp(join(tmpdir(), 'embarcarte-commerce-'));
const legacy = new DatabaseSync(join(temp, 'embarcarte.sqlite'));
legacy.exec(`CREATE TABLE products (id INTEGER PRIMARY KEY, slug TEXT NOT NULL UNIQUE, name TEXT NOT NULL, category TEXT NOT NULL DEFAULT 'Tecnología', summary TEXT NOT NULL DEFAULT '', description TEXT NOT NULL DEFAULT '', price_cents INTEGER NOT NULL CHECK (price_cents >= 0), stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0), image TEXT NOT NULL DEFAULT '', active INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT (datetime('now')), updated_at TEXT NOT NULL DEFAULT (datetime('now'))); INSERT INTO products (slug, name, price_cents) VALUES ('legacy-item', 'Existing item', 2500);`);
legacy.close();
const probe = createServer();
await new Promise((resolve) => probe.listen(0, '127.0.0.1', resolve));
const port = probe.address().port;
await new Promise((resolve) => probe.close(resolve));
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, [join(process.env['EMBARCARTE_TEST_BUILD'] ?? 'dist/embarcarte', 'server/server.mjs')], {
  env: { ...process.env, PORT: String(port), DATA_DIR: temp, ADMIN_EMAIL: 'admin@example.test', ADMIN_PASSWORD: 'test-password-123', STRIPE_SECRET_KEY: '', STRIPE_WEBHOOK_SECRET: '' },
  stdio: ['ignore', 'ignore', 'inherit'],
});

async function request(path, { cookie, body, method = body ? 'POST' : 'GET' } = {}) {
  const response = await fetch(base + path, { method, headers: { ...(body ? { 'content-type': 'application/json' } : {}), ...(cookie ? { cookie } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
  return { response, data: response.status === 204 ? null : await response.json(), cookie: response.headers.get('set-cookie')?.split(';')[0] };
}

try {
  let ready = false;
  for (let i = 0; i < 100; i++) {
    try { if ((await fetch(base + '/healthz')).ok) { ready = true; break; } } catch {}
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  assert.ok(ready, 'server started');
  const admin = await request('/api/auth/login', { body: { email: 'admin@example.test', password: 'test-password-123' } });
  assert.equal(admin.response.status, 200);
  const existing = await request('/api/admin/products', { cookie: admin.cookie });
  assert.equal(existing.data.find((p) => p.slug === 'legacy-item').name_en, '');
  const product = await request('/api/admin/products', { cookie: admin.cookie, body: { slug: 'integration-product', name: 'Producto de prueba', category: 'Prueba', summary: 'Resumen', description: 'Descripción', name_en: 'Test product', category_en: 'Test', summary_en: 'Summary', description_en: 'Description', price_cents: 2000, stock: 2, image: '', active: true } });
  assert.equal(product.response.status, 201);
  const listing = await request('/api/shop/products');
  assert.equal(listing.data.length, 1);
  assert.equal(listing.data[0].name_en, 'Test product');
  const sample = await fetch(base + '/en/shop/sample/anemometro');
  assert.equal(sample.status, 200);
  const sampleHtml = await sample.text();
  assert.match(sampleHtml, /Marine anemometer/);
  assert.match(sampleHtml, /noindex/);
  assert.match(sampleHtml, /cannot be purchased/);
  const sitemap = await (await fetch(base + '/sitemap.xml')).text();
  assert.match(sitemap, /\/en\/shop\/integration-product/);
  assert.doesNotMatch(sitemap, /\/shop\/sample\//);
  const customer = await request('/api/auth/register', { body: { name: 'Test', email: 'customer@example.test', password: 'test-password-123' } });
  assert.equal(customer.response.status, 201);
  const details = { shippingName: 'Test', shippingPhone: '123456', shippingAddress: 'Test address', payment: 'transferencia', terms: true };
  const missingTerms = await request('/api/orders', { cookie: customer.cookie, body: { ...details, terms: false, items: [{ slug: 'integration-product', qty: 1, price_cents: 2000 }] } });
  assert.equal(missingTerms.response.status, 400);
  const duplicate = await request('/api/orders', { cookie: customer.cookie, body: { ...details, items: [{ slug: 'integration-product', qty: 2, price_cents: 2000 }, { slug: 'integration-product', qty: 2, price_cents: 2000 }] } });
  assert.equal(duplicate.response.status, 409);
  const disabledCard = await request('/api/orders', { cookie: customer.cookie, body: { ...details, payment: 'tarjeta', items: [{ slug: 'integration-product', qty: 1, price_cents: 2000 }] } });
  assert.equal(disabledCard.response.status, 400);
  const changed = await request('/api/orders', { cookie: customer.cookie, body: { ...details, items: [{ slug: 'integration-product', qty: 1, price_cents: 1000 }] } });
  assert.equal(changed.response.status, 409);
  assert.equal(changed.data.error, 'price_changed');
  const order = await request('/api/orders', { cookie: customer.cookie, body: { ...details, items: [{ slug: 'integration-product', qty: 2, price_cents: 2000 }] } });
  assert.equal(order.response.status, 201);
  const detail = await request(`/api/orders/${order.data.id}`, { cookie: customer.cookie });
  assert.equal(detail.data.total_cents, 4000);
  assert.equal(detail.data.status, 'pendiente');
  assert.equal((await request('/api/shop/products/integration-product')).data.stock, 0);
  assert.equal((await request(`/api/orders/${order.data.id}`)).response.status, 401);
  assert.equal((await request(`/api/admin/orders/${order.data.id}`, { method: 'PUT', cookie: admin.cookie, body: { status: 'cancelado' } })).response.status, 200);
  const second = await request('/api/orders', { cookie: customer.cookie, body: { ...details, language: 'en', items: [{ slug: 'integration-product', qty: 2, price_cents: 2000 }] } });
  assert.equal(second.response.status, 201);
  assert.equal((await request(`/api/orders/${second.data.id}`, { cookie: customer.cookie })).data.items[0].name, 'Test product');
  assert.equal((await request(`/api/admin/orders/${order.data.id}`, { method: 'PUT', cookie: admin.cookie, body: { status: 'pendiente' } })).response.status, 409);
  assert.equal((await request(`/api/orders/${order.data.id}`, { cookie: customer.cookie })).data.status, 'cancelado');
  console.log('Commerce integration checks passed: translations, stock, duplicate items, payment validation and order access.');
} finally {
  if (server.exitCode === null && server.signalCode === null) {
    const exited = new Promise((resolve) => server.once('exit', resolve));
    server.kill();
    await exited;
  }
  if (!resolve(temp).startsWith(resolve(tmpdir()) + sep)) throw new Error('Unexpected temporary directory');
  await rm(temp, { recursive: true, force: true });
}
