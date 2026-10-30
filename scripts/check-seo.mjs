import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

/**
 * Auditoría automática de la superficie indexable:
 * sitemap, canonical, hreflang recíproco, robots, JSON-LD y rutas privadas.
 * Se ejecuta contra el servidor SSR real y una base temporal.
 */
const root = process.cwd();
const site = 'https://embarcarte.com';
const data = await mkdtemp(join(tmpdir(), 'embarcarte-seo-'));
const port = 4323;
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, [join(root, 'dist/embarcarte/server/server.mjs')], {
  env: {
    ...process.env,
    PORT: String(port),
    DATA_DIR: data,
    ADMIN_EMAIL: 'admin@seo.test',
    ADMIN_PASSWORD: 'seo-password-123',
    STRIPE_SECRET_KEY: '',
    STRIPE_WEBHOOK_SECRET: '',
    SMTP_HOST: '',
  },
  stdio: ['ignore', 'ignore', 'inherit'],
});

const request = async (path, { cookie, body, method = body ? 'POST' : 'GET' } = {}) => {
  const response = await fetch(base + path, {
    method,
    headers: {
      ...(body ? { 'content-type': 'application/json' } : {}),
      ...(cookie ? { cookie } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return {
    response,
    data: response.status === 204 ? null : await response.json(),
    cookie: response.headers.get('set-cookie')?.split(';')[0],
  };
};

const meta = (markup, name) =>
  markup.match(new RegExp(`<meta name="${name}" content="([^"]+)"`))?.[1] ??
  markup.match(new RegExp(`<meta content="([^"]+)" name="${name}"`))?.[1] ??
  '';
const canonicalOf = (markup) => markup.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? null;
const alternatesOf = (markup) =>
  [...markup.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => ({
    lang: m[1],
    href: m[2],
  }));
const jsonLdOf = (markup) =>
  [...markup.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) =>
    JSON.parse(m[1]),
  );

async function main() {
  let ready = false;
  for (let i = 0; i < 120; i++) {
    try {
      if ((await fetch(base + '/healthz')).ok) {
        ready = true;
        break;
      }
    } catch {}
    await sleep(200);
  }
  assert.ok(ready, 'server started');

  const admin = await request('/api/auth/login', {
    body: { email: 'admin@seo.test', password: 'seo-password-123' },
  });
  assert.equal(admin.response.status, 200);
  const products = [
    {
      slug: 'seo-translated',
      name: 'Producto SEO',
      category: 'Prueba',
      summary: 'Resumen SEO',
      description: 'Descripción SEO',
      name_en: 'SEO product',
      category_en: 'Test',
      summary_en: 'SEO summary',
      description_en: 'SEO description',
      price_cents: 1999,
      stock: 3,
      image: '',
      active: true,
    },
    {
      slug: 'seo-solo-es',
      name: 'Solo español SEO',
      category: 'Prueba',
      summary: 'Resumen',
      description: 'Descripción',
      name_en: '',
      category_en: '',
      summary_en: '',
      description_en: '',
      price_cents: 2500,
      stock: 2,
      image: '',
      active: true,
    },
  ];
  for (const product of products) {
    const created = await request('/api/admin/products', { cookie: admin.cookie, body: product });
    assert.equal(created.response.status, 201, `seed ${product.slug}`);
  }

  const robots = await (await fetch(base + '/robots.txt')).text();
  assert.match(robots, /^User-agent: \*/m);
  assert.match(robots, /^Disallow: \/api\/$/m);
  assert.match(robots, /^Sitemap: https:\/\/embarcarte\.com\/sitemap\.xml$/m);

  const sitemapResponse = await fetch(base + '/sitemap.xml');
  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemapResponse.headers.get('content-type') ?? '', /application\/xml/);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(sitemap, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/);
  assert.match(sitemap, /xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml"/);
  assert.match(sitemap, /<\/urlset>\s*$/);

  const blocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  assert.ok(blocks.length >= 100, `sitemap has the static surface and products (${blocks.length})`);
  const entries = blocks.map((block) => ({
    loc: block.match(/<loc>([^<]+)<\/loc>/)?.[1],
    lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
    alternates: [
      ...block.matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)"\/>/g),
    ].map((m) => ({
      lang: m[1],
      href: m[2],
    })),
  }));
  assert.ok(
    entries.every((entry) => entry.loc?.startsWith(`${site}/`) || entry.loc === `${site}/`),
    'absolute locs',
  );
  assert.equal(new Set(entries.map((e) => e.loc)).size, entries.length, 'loc entries are unique');
  assert.ok(
    entries.every((entry) => !/[?#]/.test(entry.loc ?? '')),
    'no query strings or fragments in the sitemap',
  );
  for (const forbidden of [
    '/carrito',
    '/en/cart',
    '/acceso',
    '/en/login',
    '/cuenta',
    '/en/account',
    '/admin',
    '/muestra/',
    '/no-existe',
  ])
    assert.ok(!sitemap.includes(`${site}${forbidden}`), `${forbidden} is not in the sitemap`);
  assert.ok(
    sitemap.includes(`${site}/tienda/seo-translated`) &&
      sitemap.includes(`${site}/en/shop/seo-translated`),
  );
  assert.ok(
    sitemap.includes(`${site}/tienda/seo-solo-es`) &&
      !sitemap.includes(`${site}/en/shop/seo-solo-es`),
  );

  const xDefault = entries.flatMap((entry) =>
    entry.alternates.filter((alternate) => alternate.lang === 'x-default'),
  );
  assert.equal(xDefault.length, 2, 'x-default only on the two home entries');
  assert.ok(
    xDefault.every((alternate) => alternate.href === `${site}/`),
    'x-default points at the Spanish home',
  );

  const locs = new Set(entries.map((entry) => entry.loc));
  for (const entry of entries) {
    for (const alternate of entry.alternates) {
      assert.ok(locs.has(alternate.href), `${alternate.href} is itself a sitemap loc`);
    }
    if (entry.lastmod) assert.match(entry.lastmod, /^\d{4}-\d{2}-\d{2}$/);
  }

  // Fetch the whole indexable surface and verify its metadata.
  const concurrency = 8;
  let cursor = 0;
  const failures = [];
  const worker = async () => {
    while (cursor < entries.length) {
      const entry = entries[cursor++];
      const path = entry.loc === `${site}/` ? '/' : entry.loc.slice(site.length);
      const response = await fetch(base + path);
      const markup = await response.text();
      if (response.status !== 200) failures.push(`${path} status ${response.status}`);
      if (canonicalOf(markup) !== entry.loc)
        failures.push(`${path} canonical ${canonicalOf(markup)}`);
      if (/noindex/i.test(meta(markup, 'robots')))
        failures.push(`${path} is noindex but sitemapped`);
      if (response.headers.get('x-robots-tag')?.includes('noindex'))
        failures.push(`${path} has noindex header`);
      if (
        !markup.includes(`<html lang="${path.startsWith('/en/') || path === '/en' ? 'en' : 'es'}"`)
      )
        failures.push(`${path} lang mismatch`);

      const pageAlternates = alternatesOf(markup);
      for (const alternate of entry.alternates) {
        if (
          !pageAlternates.some(
            (candidate) => candidate.lang === alternate.lang && candidate.href === alternate.href,
          )
        )
          failures.push(`${path} missing HTML alternate ${alternate.lang} ${alternate.href}`);
      }
      if (path === '/') {
        const homeAlternates = alternatesOf(markup);
        if (
          !homeAlternates.some(
            (alternate) => alternate.lang === 'es' && alternate.href === `${site}/`,
          )
        )
          failures.push('home misses self alternate');
        if (
          !homeAlternates.some(
            (alternate) => alternate.lang === 'x-default' && alternate.href === `${site}/`,
          )
        )
          failures.push('home misses x-default');
      }

      let structured;
      try {
        structured = jsonLdOf(markup);
      } catch {
        failures.push(`${path} has invalid JSON-LD`);
        continue;
      }
      const allowed = new Set([
        'Organization',
        'WebSite',
        'BreadcrumbList',
        'Product',
        'Offer',
        'SoftwareApplication',
        'Article',
        'ItemList',
        'Service',
      ]);
      for (const item of structured) {
        if (!allowed.has(item['@type']))
          failures.push(`${path} unexpected JSON-LD ${item['@type']}`);
      }
      if (path === '/en/shop/seo-translated' || path === '/tienda/seo-translated') {
        const product = structured.find((item) => item['@type'] === 'Product');
        if (!product) failures.push(`${path} misses Product JSON-LD`);
        else {
          if (product.offers?.price !== '19.99')
            failures.push(`${path} Product price is not authoritative`);
          if (product.offers?.priceCurrency !== 'EUR')
            failures.push(`${path} Product currency is not EUR`);
          if (product.offers?.availability !== 'https://schema.org/InStock')
            failures.push(`${path} Product availability`);
        }
      }
    }
  };
  await Promise.all(Array.from({ length: concurrency }, worker));
  assert.deepEqual(failures, [], failures.join('\n'));

  // Private pages: noindex, correct language, no canonical or hreflang.
  for (const [path, lang] of [
    ['/carrito', 'es'],
    ['/en/cart', 'en'],
    ['/acceso', 'es'],
    ['/en/login', 'en'],
    ['/cuenta', 'es'],
    ['/en/account', 'en'],
  ]) {
    const response = await fetch(base + path);
    const markup = await response.text();
    assert.equal(response.status, 200);
    assert.match(markup, new RegExp(`<html lang="${lang}"`), `${path} lang`);
    assert.equal(
      response.headers.get('x-robots-tag'),
      'noindex, nofollow',
      `${path} noindex header`,
    );
    assert.doesNotMatch(markup, /rel="canonical"|hreflang=/, `${path} has no canonical/hreflang`);
  }

  const notFound = await fetch(base + '/en/no-existe');
  assert.equal(notFound.status, 404);
  assert.match(await notFound.text(), /name="robots" content="noindex/);

  console.log(
    `SEO checks passed: ${entries.length} sitemap URLs, canonical, reciprocal hreflang, JSON-LD and private noindex.`,
  );
}

try {
  await main();
} finally {
  if (server.exitCode === null && server.signalCode === null) {
    const exited = new Promise((resolvePromise) => server.once('exit', resolvePromise));
    server.kill();
    await exited;
  }
  if (!resolve(data).startsWith(resolve(tmpdir()) + sep))
    throw new Error('Unexpected temporary directory');
  await rm(data, { recursive: true, force: true });
}
