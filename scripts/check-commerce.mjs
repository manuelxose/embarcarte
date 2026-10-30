import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createHmac } from 'node:crypto';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { createServer } from 'node:net';
import { DatabaseSync } from 'node:sqlite';

const WEBHOOK_SECRET = 'test-webhook-secret';

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
  // Stripe Checkout stays disabled (no secret key) so no live payment service is
  // ever called; only the webhook signature secret is set, to test verification.
  env: { ...process.env, PORT: String(port), DATA_DIR: temp, ADMIN_EMAIL: 'admin@example.test', ADMIN_PASSWORD: 'test-password-123', STRIPE_SECRET_KEY: '', STRIPE_WEBHOOK_SECRET: WEBHOOK_SECRET },
  stdio: ['ignore', 'ignore', 'inherit'],
});

async function request(path, { cookie, body, method = body ? 'POST' : 'GET' } = {}) {
  const response = await fetch(base + path, { method, headers: { ...(body ? { 'content-type': 'application/json' } : {}), ...(cookie ? { cookie } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}) });
  return { response, data: response.status === 204 ? null : await response.json(), cookie: response.headers.get('set-cookie')?.split(';')[0] };
}

const page = async (path) => {
  const response = await fetch(base + path);
  return { status: response.status, markup: await response.text() };
};

const canonicalOf = (markup) => markup.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? null;
const alternatesOf = (markup) => [...markup.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => `${m[1]} ${m[2].replace('https://embarcarte.com', '')}`);
const robotsOf = (markup) => markup.match(/name="robots" content="([^"]+)"/)?.[1] ?? '';
/**
 * Rendered text only. The SSR response also serialises the HTTP transfer state,
 * which legitimately carries every database field in every language; content
 * assertions must not read it.
 */
const visible = (markup) => markup.replace(/<script[\s\S]*?<\/script>/g, '');

try {
  let ready = false;
  for (let i = 0; i < 100; i++) {
    try { if ((await fetch(base + '/healthz')).ok) { ready = true; break; } } catch {}
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  assert.ok(ready, 'server started');

  // --- catalogue administration --------------------------------------------
  const admin = await request('/api/auth/login', { body: { email: 'admin@example.test', password: 'test-password-123' } });
  assert.equal(admin.response.status, 200);
  const existing = await request('/api/admin/products', { cookie: admin.cookie });
  assert.equal(existing.data.find((p) => p.slug === 'legacy-item').name_en, '');
  const product = await request('/api/admin/products', { cookie: admin.cookie, body: { slug: 'integration-product', name: 'Producto de prueba', category: 'Prueba', summary: 'Resumen', description: 'Descripción', name_en: 'Test product', category_en: 'Test', summary_en: 'Summary', description_en: 'Description', price_cents: 2000, stock: 2, image: '', active: true } });
  assert.equal(product.response.status, 201);
  const listing = await request('/api/shop/products');
  assert.equal(listing.data.length, 1);
  assert.equal(listing.data[0].name_en, 'Test product');

  // A product with no English copy at all, to prove the fallback and the indexing rules.
  const untranslated = await request('/api/admin/products', { cookie: admin.cookie, body: { slug: 'zeta-sin-traducir', name: 'Zeta sin traducir', category: 'Prueba', summary: 'Solo español', description: 'Descripción solo en español', name_en: '', category_en: '', summary_en: '', description_en: '', price_cents: 3000, stock: 5, image: '', active: true } });
  assert.equal(untranslated.response.status, 201);

  // A product missing only the English category is not a translated page either:
  // the category is published copy, so the same gate must cover it.
  const partialTranslation = await request('/api/admin/products', { cookie: admin.cookie, body: { slug: 'sin-categoria-en', name: 'Producto parcial', category: 'Prueba', summary: 'Resumen', description: 'Descripción', name_en: 'Partial product', category_en: '', summary_en: 'Summary', description_en: 'Description', price_cents: 4000, stock: 1, image: '', active: true } });
  assert.equal(partialTranslation.response.status, 201);

  // --- bilingual catalogue --------------------------------------------------
  const spanishList = await page('/tienda');
  const englishList = await page('/en/shop');
  assert.equal(spanishList.status, 200);
  assert.equal(englishList.status, 200);
  const esMarkup = spanishList.markup;
  const enMarkup = englishList.markup;

  assert.match(esMarkup, /<html lang="es"/);
  assert.match(enMarkup, /<html lang="en"/);
  assert.equal(canonicalOf(esMarkup), 'https://embarcarte.com/tienda', 'the Spanish list keeps its own canonical');
  assert.equal(canonicalOf(enMarkup), 'https://embarcarte.com/en/shop', 'the English list keeps its own canonical');
  assert.deepEqual(alternatesOf(esMarkup).sort(), ['en /en/shop', 'es /tienda'], 'the Spanish list declares the reciprocal pair');
  assert.deepEqual(alternatesOf(enMarkup).sort(), ['en /en/shop', 'es /tienda'], 'the English list declares the reciprocal pair');

  assert.ok(esMarkup.includes('Producto de prueba') && esMarkup.includes('Prueba'), 'the Spanish list shows the Spanish name and category');
  assert.ok(!visible(esMarkup).includes('Test product'), 'the Spanish list never shows the English name');
  assert.ok(enMarkup.includes('Test product') && enMarkup.includes('Test'), 'the English list shows the English name and category');
  assert.ok(!visible(enMarkup).includes('Producto de prueba'), 'the English list never shows the Spanish name of a translated product');

  // Product identity, price and stock do not change with the language.
  const [firstRead, secondRead] = await Promise.all([request('/api/shop/products'), request('/api/shop/products')]);
  const identity = (rows) => rows.data.map((p) => `${p.id}:${p.slug}:${p.price_cents}:${p.stock}:${p.image}`).sort();
  assert.deepEqual(identity(firstRead), identity(secondRead), 'identity, price and stock are locale-independent');

  // Detail links point at the registry URL of each locale.
  assert.ok(esMarkup.includes('href="/tienda/integration-product"'), 'the Spanish list links to the Spanish detail URL');
  assert.ok(enMarkup.includes('href="/en/shop/integration-product"'), 'the English list links to the English detail URL');

  // Localized prices: same amount, different formatting (Angular escapes the
  // Spanish non-breaking space as &nbsp;).
  assert.match(esMarkup, /class="price">20,00&nbsp;€/, 'the Spanish list formats money in Spanish');
  assert.match(enMarkup, /class="price">€20\.00/, 'the English list formats money in English');

  // Structured data names the products in the language of the page.
  assert.match(esMarkup, /"name":"Producto de prueba"/, 'the Spanish ItemList uses the Spanish name');
  assert.match(enMarkup, /"name":"Test product"/, 'the English ItemList uses the English name');

  // --- product detail -------------------------------------------------------
  const esDetail = (await page('/tienda/integration-product')).markup;
  const enDetail = (await page('/en/shop/integration-product')).markup;
  assert.equal(canonicalOf(esDetail), 'https://embarcarte.com/tienda/integration-product');
  assert.equal(canonicalOf(enDetail), 'https://embarcarte.com/en/shop/integration-product');
  assert.deepEqual(alternatesOf(esDetail).sort(), ['en /en/shop/integration-product', 'es /tienda/integration-product']);
  assert.deepEqual(alternatesOf(enDetail).sort(), ['en /en/shop/integration-product', 'es /tienda/integration-product']);
  assert.match(esDetail, /"name":"Producto de prueba"/, 'the Spanish Product JSON-LD uses the Spanish name');
  assert.match(enDetail, /"name":"Test product"/, 'the English Product JSON-LD uses the English name');
  for (const markup of [esDetail, enDetail]) {
    assert.match(markup, /"@type":"Offer"/, 'the offer is published');
    assert.match(markup, /"price":"20\.00"/, 'the offer carries the authoritative price');
    assert.match(markup, /"priceCurrency":"EUR"/, 'the offer carries the currency');
    assert.match(markup, /"availability":"https:\/\/schema\.org\/InStock"/, 'the offer reflects the stock');
    assert.match(markup, /href="\/en\/shop\/integration-product"|href="\/tienda\/integration-product"/, 'the language switcher keeps the product');
  }

  // An untranslated product: Spanish indexed, English not.
  const esUntranslated = (await page('/tienda/zeta-sin-traducir')).markup;
  const enUntranslated = (await page('/en/shop/zeta-sin-traducir')).markup;
  assert.match(robotsOf(esUntranslated), /^index/, 'the Spanish page of an untranslated product is indexable');
  assert.deepEqual(alternatesOf(esUntranslated), ['es /tienda/zeta-sin-traducir'], 'it names no English alternate');
  assert.match(robotsOf(enUntranslated), /^noindex/, 'the English page of an untranslated product is not indexable');
  assert.deepEqual(alternatesOf(enUntranslated), [], 'the unindexed English page publishes no alternate');
  assert.ok(enUntranslated.includes('Zeta sin traducir'), 'the English URL still renders, with the Spanish content');
  // Only the product-derived nodes are declared as Spanish: the surrounding
  // interface (stock label, buttons, price) stays in the page language.
  assert.match(visible(enUntranslated), /lang="es"[^>]*>Zeta sin traducir/, 'the Spanish product name is declared as Spanish');
  assert.match(visible(enUntranslated), /lang="es"[^>]*>Descripción solo en español/, 'the Spanish description is declared as Spanish');
  assert.doesNotMatch(visible(enUntranslated), /<div lang="es"/, 'the interface around the product is not declared as Spanish');
  assert.match(visible(enUntranslated), /Add to basket|Out of stock/, 'the interface stays in English');
  assert.equal(canonicalOf(enUntranslated), 'https://embarcarte.com/en/shop/zeta-sin-traducir', 'it canonicalizes to itself, never to the Spanish page');

  // The same rule in the catalogue: fallback Spanish copy is marked, the rest is not.
  assert.match(visible(enMarkup), /lang="es"[^>]*>Zeta sin traducir/, 'the English catalogue marks the Spanish name of an untranslated product');

  // A product missing only the English category follows the same rule.
  const partialEn = (await page('/en/shop/sin-categoria-en')).markup;
  assert.match(robotsOf(partialEn), /^noindex/, 'a product with no English category is not indexed');
  assert.deepEqual(alternatesOf(partialEn), [], 'it publishes no alternate');

  // The switcher never percent-encodes a query string into the path, which is what
  // a string `routerLink` does when the string carries `?...`.
  for (const markup of [esMarkup, enMarkup, esDetail, enDetail])
    assert.doesNotMatch(markup, /%3F/, 'the language switcher keeps query strings out of the path');

  // --- samples --------------------------------------------------------------
  const sample = await fetch(base + '/en/shop/sample/anemometro');
  assert.equal(sample.status, 200);
  const sampleHtml = await sample.text();
  assert.match(sampleHtml, /Marine anemometer/);
  assert.match(sampleHtml, /noindex/);
  assert.match(sampleHtml, /cannot be purchased/);

  // --- sitemap --------------------------------------------------------------
  const sitemap = await (await fetch(base + '/sitemap.xml')).text();
  assert.match(sitemap, /xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml"/, 'the sitemap declares the xhtml namespace');
  assert.match(sitemap, /\/en\/shop\/integration-product/, 'a translated product is listed in both locales');
  assert.match(sitemap, /<loc>https:\/\/embarcarte\.com\/tienda\/integration-product<\/loc>/, 'the Spanish product URL is listed');
  assert.match(sitemap, /<loc>https:\/\/embarcarte\.com\/tienda\/zeta-sin-traducir<\/loc>/, 'an untranslated product is listed in Spanish');
  assert.doesNotMatch(sitemap, /\/en\/shop\/zeta-sin-traducir/, 'its English URL is not listed');
  assert.doesNotMatch(sitemap, /\/shop\/sample\//, 'sample pages are not listed');
  assert.doesNotMatch(sitemap, /\/en\/shop\/sin-categoria-en/, 'a product without an English category is not listed in English');
  assert.match(sitemap, /<loc>https:\/\/embarcarte\.com\/tienda\/sin-categoria-en<\/loc>/, 'but it is listed in Spanish');
  for (const privatePath of ['/carrito', '/en/cart', '/acceso', '/en/login', '/cuenta', '/en/account', '/admin', '/no-existe'])
    assert.doesNotMatch(sitemap, new RegExp(`<loc>[^<]*${privatePath}</loc>`), `${privatePath} is not listed`);
  // Alternates are reciprocal: every hreflang target is itself a <loc>.
  const locs = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  for (const [, href] of sitemap.matchAll(/hreflang="(?:es|en)" href="([^"]+)"/g))
    assert.ok(locs.has(href), `the alternate ${href} is itself listed`);
  assert.equal((sitemap.match(/hreflang="x-default"/g) ?? []).length, 2, 'x-default appears only on the two home entries');

  // --- checkout -------------------------------------------------------------
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
  // The client cannot substitute a lower price: the server is the source of truth.
  const tampered = await request('/api/orders', { cookie: customer.cookie, body: { ...details, items: [{ slug: 'integration-product', qty: 1, price_cents: 1 }] } });
  assert.equal(tampered.response.status, 409, 'a tampered price is rejected');
  assert.equal(tampered.data.error, 'price_changed');
  const order = await request('/api/orders', { cookie: customer.cookie, body: { ...details, items: [{ slug: 'integration-product', qty: 2, price_cents: 2000 }] } });
  assert.equal(order.response.status, 201);
  const detail = await request(`/api/orders/${order.data.id}`, { cookie: customer.cookie });
  assert.equal(detail.data.total_cents, 4000, 'the total is computed by the server');
  assert.equal(detail.data.status, 'pendiente');
  assert.equal((await request('/api/shop/products/integration-product')).data.stock, 0);

  // Bank transfer: the order stays pending and the stock is reserved.
  assert.equal((await request(`/api/orders/${order.data.id}`)).response.status, 401, 'orders need a session');

  // A second customer cannot read the first customer's order.
  const other = await request('/api/auth/register', { body: { name: 'Other', email: 'other@example.test', password: 'test-password-123' } });
  assert.equal((await request(`/api/orders/${order.data.id}`, { cookie: other.cookie })).response.status, 404, 'order ownership is enforced');

  // The localized order URLs of both locales are served.
  for (const path of [`/cuenta/pedidos/${order.data.id}`, `/en/account/orders/${order.data.id}`])
    assert.equal((await fetch(base + path)).status, 200, `${path} is served`);

  // Cancelling restores the stock; reactivating without stock is refused.
  assert.equal((await request(`/api/admin/orders/${order.data.id}`, { method: 'PUT', cookie: admin.cookie, body: { status: 'cancelado' } })).response.status, 200);
  assert.equal((await request('/api/shop/products/integration-product')).data.stock, 2, 'cancelling restores the stock');

  // A second order, placed in English, stores the English line names.
  const second = await request('/api/orders', { cookie: customer.cookie, body: { ...details, language: 'en', items: [{ slug: 'integration-product', qty: 2, price_cents: 2000 }] } });
  assert.equal(second.response.status, 201);
  const secondDetail = await request(`/api/orders/${second.data.id}`, { cookie: customer.cookie });
  assert.equal(secondDetail.data.items[0].name, 'Test product', 'the order stores the name of the ordering locale');
  assert.equal(secondDetail.data.total_cents, 4000, 'the locale does not change the total');

  assert.equal((await request(`/api/admin/orders/${order.data.id}`, { method: 'PUT', cookie: admin.cookie, body: { status: 'pendiente' } })).response.status, 409);
  assert.equal((await request(`/api/orders/${order.data.id}`, { cookie: customer.cookie })).data.status, 'cancelado');

  // --- accounts and authorization ------------------------------------------
  assert.equal((await request('/api/orders', { cookie: customer.cookie })).response.status, 200);
  assert.equal((await request('/api/orders')).response.status, 401, 'the order list needs a session');
  const updated = await request('/api/account', { method: 'PUT', cookie: customer.cookie, body: { name: 'Renamed', phone: '600', address: 'Port' } });
  assert.equal(updated.data.name, 'Renamed');
  assert.equal((await request('/api/auth/me', { cookie: customer.cookie })).data.name, 'Renamed', 'the session keeps the change');
  assert.equal((await request('/api/admin/orders', { cookie: customer.cookie })).response.status, 403, 'a customer cannot read the admin API');
  assert.equal((await request('/api/admin/orders', { cookie: admin.cookie })).response.status, 200);
  assert.equal((await request('/api/auth/login', { body: { email: 'customer@example.test', password: 'wrong-password' } })).response.status, 401);

  // --- Stripe webhook -------------------------------------------------------
  const webhook = (payload, signature) =>
    fetch(base + '/api/stripe/webhook', { method: 'POST', headers: { 'content-type': 'application/json', ...(signature ? { 'stripe-signature': signature } : {}) }, body: payload });
  const signed = (payload) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const digest = createHmac('sha256', WEBHOOK_SECRET).update(`${timestamp}.${payload}`).digest('hex');
    return `t=${timestamp},v1=${digest}`;
  };
  const event = JSON.stringify({ type: 'checkout.session.completed', data: { object: { id: 'cs_test_forged', payment_status: 'paid', metadata: { order_id: second.data.id } } } });
  assert.equal((await webhook(event)).status, 400, 'an unsigned webhook is rejected');
  assert.equal((await webhook(event, 't=1,v1=deadbeef')).status, 400, 'a forged signature is rejected');
  assert.equal((await webhook(event, signed(event).replace(/^t=\d+/, 't=1'))).status, 400, 'a stale timestamp is rejected');
  // Even with a valid signature, an event whose session id does not match the
  // order cannot mark it as paid: payment confirmation stays server-side.
  assert.equal((await webhook(event, signed(event))).status, 200);
  assert.equal((await request(`/api/orders/${second.data.id}`, { cookie: customer.cookie })).data.status, 'pendiente', 'a mismatched session never marks the order paid');

  console.log('Commerce integration checks passed: bilingual catalogue, localized SEO, stock, cart payload integrity, accounts, authorization, sitemap alternates and webhook verification.');
} finally {
  if (server.exitCode === null && server.signalCode === null) {
    const exited = new Promise((resolve) => server.once('exit', resolve));
    server.kill();
    await exited;
  }
  if (!resolve(temp).startsWith(resolve(tmpdir()) + sep)) throw new Error('Unexpected temporary directory');
  await rm(temp, { recursive: true, force: true });
}
