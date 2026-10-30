import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';

/**
 * Checks the i18n foundation: locale detection, localized route mapping,
 * translation lookup and the SSR markup it produces.
 *
 * The pure i18n modules are compiled to CommonJS in a temporary folder so the
 * assertions run against the real sources without adding a test framework.
 */
const root = process.cwd();
const out = await mkdtemp(join(tmpdir(), 'embarcarte-i18n-'));

function sh(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', ...options });
    child.once('error', reject);
    child.once('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`))));
  });
}

let server;
let base;
let data;

try {
  await sh(process.execPath, [
    join(root, 'node_modules/typescript/bin/tsc'),
    join(root, 'src/app/core/i18n/locale.types.ts'),
    join(root, 'src/app/core/i18n/locale.config.ts'),
    join(root, 'src/app/core/i18n/locale-routes.ts'),
    join(root, 'src/app/i18n/es.ts'),
    join(root, 'src/app/i18n/en.ts'),
    join(root, 'src/app/i18n/dictionary.ts'),
    // Content modules are pure TypeScript (no Angular imports), so the same
    // throwaway compile can assert their integrity.
    join(root, 'src/app/shared/models/localized.ts'),
    join(root, 'src/app/core/models.ts'),
    join(root, 'src/app/core/sample-products.ts'),
    join(root, 'src/app/features/shop/product-text.ts'),
    join(root, 'src/app/features/account/payment-label.ts'),
    join(root, 'src/app/features/technology/models/technology.ts'),
    join(root, 'src/app/features/technology/content/technology-page.content.ts'),
    join(root, 'src/app/features/technology/content/technology-detail.content.ts'),
    join(root, 'src/app/features/guides/models/guides.ts'),
    join(root, 'src/app/features/guides/content/guides-page.content.ts'),
    join(root, 'src/app/features/legal/models/legal.ts'),
    join(root, 'src/app/features/home/content/home.content.ts'),
    join(root, 'src/app/features/services/content/services.content.ts'),
    join(root, 'src/app/features/experiences/content/experiences.content.ts'),
    join(root, 'src/app/features/delivery/content/delivery.content.ts'),
    join(root, 'src/app/features/about/content/about.content.ts'),
    join(root, 'src/app/features/contact/content/contact.content.ts'),
    '--module', 'commonjs',
    '--moduleResolution', 'node10',
    '--target', 'es2022',
    '--strict',
    '--skipLibCheck',
    '--rootDir', join(root, 'src'),
    '--outDir', out,
  ]);

  const require = createRequire(join(out, 'index.cjs'));
  const { DEFAULT_LOCALE, LOCALES, isLocale, localeFromUrl, otherLocale } = require(join(out, 'app/core/i18n/locale.types.js'));
  const { LOCALIZED_ROUTES, alternateUrl, localizedUrl, matchRoute } = require(join(out, 'app/core/i18n/locale-routes.js'));
  const { DICTIONARIES, translate } = require(join(out, 'app/i18n/dictionary.js'));
  const { cartItemName, formatDate, formatPrice } = require(join(out, 'app/core/models.js'));
  const { SAMPLE_PRODUCTS, sampleText, searchSamples } = require(join(out, 'app/core/sample-products.js'));
  const { productText } = require(join(out, 'app/features/shop/product-text.js'));
  const { paymentLabel } = require(join(out, 'app/features/account/payment-label.js'));
  const { TECHNOLOGY } = require(join(out, 'app/features/technology/models/technology.js'));
  const { TECHNOLOGY_PAGE } = require(join(out, 'app/features/technology/content/technology-page.content.js'));
  const { GUIDES, GUIDE_SLUGS } = require(join(out, 'app/features/guides/models/guides.js'));
  const { GUIDES_PAGE } = require(join(out, 'app/features/guides/content/guides-page.content.js'));
  const { LEGAL_PAGES } = require(join(out, 'app/features/legal/models/legal.js'));
  const { HOME_CONTENT } = require(join(out, 'app/features/home/content/home.content.js'));
  const { SERVICES, SERVICES_PAGE } = require(join(out, 'app/features/services/content/services.content.js'));
  const { EXPERIENCES_PAGE } = require(join(out, 'app/features/experiences/content/experiences.content.js'));
  const { DELIVERY_PAGE } = require(join(out, 'app/features/delivery/content/delivery.content.js'));
  const { ABOUT_PAGE } = require(join(out, 'app/features/about/content/about.content.js'));
  const { CONTACT_PAGE } = require(join(out, 'app/features/contact/content/contact.content.js'));

  // --- Locale detection -----------------------------------------------------
  assert.deepEqual([...LOCALES], ['es', 'en']);
  assert.equal(DEFAULT_LOCALE, 'es');
  assert.equal(isLocale('en'), true);
  assert.equal(isLocale('fr'), false);
  assert.equal(isLocale(''), false);
  assert.equal(isLocale(undefined), false);
  assert.equal(otherLocale('es'), 'en');
  assert.equal(otherLocale('en'), 'es');

  assert.equal(localeFromUrl('/'), 'es', '/ is Spanish');
  assert.equal(localeFromUrl('/tecnologia'), 'es', '/tecnologia is Spanish');
  assert.equal(localeFromUrl('/tecnologia/navegador?ref=1#specs'), 'es', 'query and fragment are ignored');
  assert.equal(localeFromUrl('/en'), 'en', '/en is English');
  assert.equal(localeFromUrl('/en/technology'), 'en', '/en/technology is English');
  assert.equal(localeFromUrl('/en/technology/navegador'), 'en');
  assert.equal(localeFromUrl('/admin'), 'es', 'unprefixed paths stay Spanish');
  assert.equal(localeFromUrl('/english'), 'es', 'only the whole segment marks a locale');
  assert.equal(localeFromUrl('https://embarcarte.com/en/shop'), 'en', 'absolute request URLs work');

  // --- Route mapping --------------------------------------------------------
  assert.equal(localizedUrl('technology', 'en'), '/en/technology');
  assert.equal(localizedUrl('technology', 'es'), '/tecnologia');
  assert.equal(localizedUrl('contact', 'es'), '/contacto');
  assert.equal(localizedUrl('home', 'es'), '/');
  assert.equal(localizedUrl('home', 'en'), '/en');

  for (const id of Object.keys(LOCALIZED_ROUTES)) {
    // Parameterised ids round-trip with a real value, so the placeholder is replaced.
    const params = {
      technologyDetail: { slug: 'navegador' },
      guideDetail: { slug: 'navegador' },
      shopDetail: { slug: 'navegador' },
      shopSample: { slug: 'navegador' },
      orderDetail: { id: '7' },
    }[id] ?? {};
    for (const locale of LOCALES) {
      const url = localizedUrl(id, locale, params);
      const match = matchRoute(url);
      assert.ok(match, `${url} resolves back to a route`);
      assert.equal(match.id, id, `${url} round-trips to ${id}`);
      assert.equal(match.locale, locale, `${url} stays in ${locale}`);
      if (params.slug) assert.equal(match.params.slug, params.slug, `${url} keeps its slug`);
      if (params.id) assert.equal(match.params.id, params.id, `${url} keeps its id`);
    }
  }

  // Existing public URLs must not move.
  assert.equal(localizedUrl('technologyDetail', 'es', { slug: 'navegador' }), '/tecnologia/navegador');
  assert.equal(localizedUrl('technologyDetail', 'en', { slug: 'navegador' }), '/en/technology/navegador');
  assert.equal(localizedUrl('shopSample', 'es', { slug: 'anemometro' }), '/tienda/muestra/anemometro');
  assert.equal(localizedUrl('shopSample', 'en', { slug: 'anemometro' }), '/en/shop/sample/anemometro');
  assert.equal(localizedUrl('legalNotice', 'en'), '/en/legal-notice');
  assert.equal(localizedUrl('termsOfSale', 'es'), '/condiciones-de-venta');
  assert.equal(localizedUrl('guideDetail', 'en', { slug: 'gps-a-bordo' }), '/en/guides/gps-a-bordo');

  // Spanish to English and back, including parameters, query and fragment.
  assert.equal(alternateUrl('/tecnologia/navegador', 'en'), '/en/technology/navegador');
  assert.equal(alternateUrl('/en/technology/navegador', 'es'), '/tecnologia/navegador');
  assert.equal(alternateUrl('/en/technology?ref=mail#features', 'es'), '/tecnologia?ref=mail#features');
  assert.equal(alternateUrl('/', 'en'), '/en');
  assert.equal(alternateUrl('/en', 'es'), '/');
  assert.equal(alternateUrl('/tienda/muestra/anemometro', 'en'), '/en/shop/sample/anemometro');
  assert.equal(
    alternateUrl('/guias/que-es-signal-k?ref=1#fuentes', 'en'),
    '/en/guides/que-es-signal-k?ref=1#fuentes',
    'a guide detail keeps its slug, query string and fragment across locales',
  );

  // Protected pages keep their identifier across locales, so the switcher does not
  // drop a customer on the other home page.
  assert.equal(alternateUrl('/cuenta/pedidos/7', 'en'), '/en/account/orders/7');
  assert.equal(alternateUrl('/en/account/orders/7', 'es'), '/cuenta/pedidos/7');
  assert.equal(alternateUrl('/cuenta/pedidos/7?ref=mail', 'en'), '/en/account/orders/7?ref=mail');

  // Pages with no localized counterpart are reported, never silently redirected home.
  for (const url of ['/admin', '/admin/pedidos', '/open-marine', '/productos/navegador', '/no-existe']) {
    assert.equal(alternateUrl(url, 'en'), null, `${url} has no localized counterpart`);
  }

  // --- Translations ---------------------------------------------------------
  const esKeys = Object.keys(DICTIONARIES.es).sort();
  assert.ok(esKeys.length > 0);
  assert.deepEqual(Object.keys(DICTIONARIES.en).sort(), esKeys, 'both dictionaries expose the same keys');

  const placeholders = (value) => [...value.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
  for (const key of esKeys) {
    assert.equal(typeof DICTIONARIES.es[key], 'string', `es.${key} is a string`);
    assert.equal(typeof DICTIONARIES.en[key], 'string', `en.${key} is a string`);
    assert.ok(DICTIONARIES.es[key].trim(), `es.${key} is not empty`);
    assert.ok(DICTIONARIES.en[key].trim(), `en.${key} is not empty`);
    assert.deepEqual(placeholders(DICTIONARIES.en[key]), placeholders(DICTIONARIES.es[key]), `${key} uses the same placeholders`);
  }

  assert.equal(translate('es', 'nav.technology'), 'Tecnología');
  assert.equal(translate('en', 'nav.technology'), 'Technology');
  assert.equal(translate('es', 'a11y.switchLanguage', { language: 'English' }), 'Ver la web en English');
  assert.equal(translate('en', 'a11y.switchLanguage', { language: 'Español' }), 'View the site in Español');
  assert.equal(translate('en', 'a11y.switchLanguage'), 'View the site in {language}', 'a missing parameter keeps the placeholder');
  assert.equal(translate('en', 'does.not.exist'), 'does.not.exist', 'an unknown key falls back to the key itself');

  // --- Localized page content ----------------------------------------------
  const filled = (value) => typeof value === 'string' && value.trim().length > 0;
  const pages = {
    home: HOME_CONTENT,
    technology: TECHNOLOGY_PAGE,
    experiences: EXPERIENCES_PAGE,
    delivery: DELIVERY_PAGE,
    services: SERVICES_PAGE,
    about: ABOUT_PAGE,
    contact: CONTACT_PAGE,
    guides: GUIDES_PAGE,
  };

  // No empty string survives in any locale, so no paragraph renders blank.
  const walk = (value, path) => {
    if (typeof value === 'string') {
      assert.ok(value.trim(), `${path} is not empty`);
      return;
    }
    if (Array.isArray(value)) {
      assert.ok(value.length > 0, `${path} is not empty`);
      value.forEach((item, index) => walk(item, `${path}[${index}]`));
      return;
    }
    if (value && typeof value === 'object') {
      for (const [key, item] of Object.entries(value)) walk(item, `${path}.${key}`);
    }
  };

  for (const [name, page] of Object.entries(pages)) {
    for (const locale of LOCALES) {
      assert.ok(page[locale], `${name} is published in ${locale}`);
      const seo = page[locale].seo ?? page[locale].listSeo;
      assert.ok(filled(seo.title), `${name}.${locale} seo title is filled`);
      assert.ok(filled(seo.description), `${name}.${locale} seo description is filled`);
      walk(page[locale], `${name}.${locale}`);
    }
  }

  // Technology catalogue: identity is stable, text is per locale.
  assert.deepEqual(
    TECHNOLOGY.map((product) => product.slug),
    ['navegador', 'cartografia', 'hub', 'piloto-automatico', 'simulacion', 'pasarela-sensores'],
    'every published module keeps its identifier',
  );
  for (const product of TECHNOLOGY) {
    assert.ok(['Software', 'Hardware'].includes(product.kind), `${product.slug} keeps its kind`);
    for (const locale of LOCALES) {
      const text = product.content[locale];
      assert.ok(text, `${product.slug} has ${locale} content`);
      assert.ok(filled(text.name), `${product.slug}.${locale}.name is filled`);
      assert.ok(filled(text.description), `${product.slug}.${locale}.description is filled`);
      assert.ok(text.features.length > 0 && text.features.every(filled), `${product.slug}.${locale} keeps filled features`);
    }
    // Every block the Spanish page publishes is published in English too.
    const [es, en] = [product.content.es, product.content.en];
    assert.ok(filled(en.tagline), `${product.slug}.en.tagline is published`);
    assert.ok(filled(en.audience), `${product.slug}.en.audience is published`);
    assert.equal(en.specs?.length, es.specs?.length, `${product.slug} publishes the same spec rows in both locales`);
    for (const spec of en.specs ?? []) assert.ok(filled(spec.label) && filled(spec.value), `${product.slug}.en has no empty spec`);
    for (const spec of es.specs ?? []) assert.ok(filled(spec.label) && filled(spec.value), `${product.slug}.es has no empty spec`);
  }

  // Guides: same identifiers, same structure, both languages.
  assert.equal(GUIDES.length, 30, 'all 30 guides are published');
  assert.deepEqual(GUIDES.map((guide) => guide.slug), [...GUIDE_SLUGS], 'guides keep their published slugs');
  for (const guide of GUIDES) {
    for (const locale of LOCALES) {
      const text = guide.content[locale];
      assert.ok(filled(text.title), `${guide.slug}.${locale}.title is filled`);
      assert.ok(filled(text.description), `${guide.slug}.${locale}.description is filled`);
      assert.ok(text.sections.length > 0, `${guide.slug}.${locale} has sections`);
      for (const section of text.sections) assert.ok(filled(section[0]) && filled(section[1]), `${guide.slug}.${locale} has no empty section`);
    }
    assert.equal(
      guide.content.es.sections.length,
      guide.content.en.sections.length,
      `${guide.slug} keeps the same number of sections in both locales`,
    );
    assert.ok(guide.extra, `${guide.slug} keeps its closing sections`);
    for (const locale of LOCALES) {
      assert.ok(guide.extra[locale].length > 0, `${guide.slug}.${locale} has closing sections`);
      for (const section of guide.extra[locale]) assert.ok(filled(section[0]) && filled(section[1]));
    }
  }

  // Legal copy: locale-specific, structurally identical, never empty.
  for (const id of ['legalNotice', 'privacy', 'cookies', 'termsOfSale']) {
    for (const locale of LOCALES) {
      const page = LEGAL_PAGES[locale][id];
      assert.ok(filled(page.title), `legal.${id}.${locale} has a title`);
      assert.ok(page.blocks.length > 0, `legal.${id}.${locale} has blocks`);
      for (const block of page.blocks) {
        for (const paragraph of block.paragraphs ?? []) assert.ok(filled(paragraph), `legal.${id}.${locale} has no empty paragraph`);
        for (const item of block.list ?? []) assert.ok(filled(item.text), `legal.${id}.${locale} has no empty list item`);
      }
    }
    assert.equal(
      LEGAL_PAGES.es[id].blocks.length,
      LEGAL_PAGES.en[id].blocks.length,
      `legal.${id} keeps the same structure in both locales`,
    );
  }

  // Services list: the same four blocks in both locales, in the same order.
  assert.equal(SERVICES.en.length, SERVICES.es.length, 'services publish the same number of blocks in both locales');
  for (const locale of LOCALES) {
    assert.ok(SERVICES[locale].length > 0, `services.${locale} is published`);
    for (const service of SERVICES[locale]) assert.ok(filled(service.title) && filled(service.text));
  }

  // --- Commerce text helpers ------------------------------------------------
  // Product copy: identity never changes, English falls back to Spanish per field.
  const product = {
    id: 1,
    slug: 'anemometro',
    name: 'Anemómetro',
    category: 'Viento',
    summary: 'Resumen',
    description: 'Descripción',
    price_cents: 123456,
    stock: 3,
    image: '',
    name_en: 'Anemometer',
    category_en: 'Wind',
    summary_en: 'Summary',
    description_en: 'Description',
  };
  assert.equal(productText(product, 'es').name, 'Anemómetro', 'the Spanish page shows the Spanish name');
  assert.equal(productText(product, 'en').name, 'Anemometer', 'the English page shows the English name');
  assert.equal(productText(product, 'es').translated && productText(product, 'en').translated, true);
  const halfTranslated = { ...product, description_en: '' };
  assert.equal(productText(halfTranslated, 'en').description, 'Descripción', 'a missing field falls back to Spanish');
  assert.equal(productText(halfTranslated, 'en').translated, false, 'a product is translated only when all four fields exist');
  assert.equal(productText(halfTranslated, 'en').name, 'Anemometer', 'the fallback is per field, not all-or-nothing');
  assert.equal(
    productText({ ...product, category_en: '' }, 'en').translated,
    false,
    'the category counts towards the translation, because it is published',
  );

  // Money and dates: the amount is identical, only the formatting is localized.
  // (Spanish CLDR only groups numbers from five digits, so 1234,56 € is correct.)
  const plain = (value) => value.replace(/[\s\u00a0]/g, '');
  assert.equal(plain(formatPrice(123456, 'es')), '1234,56€');
  assert.equal(plain(formatPrice(123456, 'en')), '€1,234.56');
  assert.equal(
    formatPrice(123456, 'es').replace(/\D/g, ''),
    formatPrice(123456, 'en').replace(/\D/g, ''),
    'both locales show the same amount',
  );
  assert.equal(plain(formatPrice(1234567, 'es')), '12.345,67€', 'Spanish groups thousands from five digits');
  assert.notEqual(formatDate('2026-10-03 10:00:00', 'es'), formatDate('2026-10-03 10:00:00', 'en'));
  assert.match(formatDate('2026-10-03 10:00:00', 'es'), /2026/);

  // Basket names follow the locale without touching the stored item.
  const item = { slug: 'anemometro', name: 'Anemómetro', name_en: 'Anemometer', price_cents: 100, image: '', qty: 2 };
  assert.equal(cartItemName(item, 'es'), 'Anemómetro');
  assert.equal(cartItemName(item, 'en'), 'Anemometer');
  assert.equal(cartItemName({ ...item, name_en: '' }, 'en'), 'Anemómetro', 'a product without English name keeps the Spanish one');
  assert.equal(cartItemName({ slug: 'a', name: 'Anemómetro', price_cents: 1, image: '', qty: 1 }, 'en'), 'Anemómetro', 'baskets saved before M03 still render');

  // Order status and payment labels are translated from the stored identifiers.
  assert.equal(paymentLabel('transferencia', 'es'), 'Transferencia bancaria');
  assert.equal(paymentLabel('transferencia', 'en'), 'Bank transfer');
  assert.equal(paymentLabel('tarjeta', 'en'), 'Card');
  for (const status of ['pendiente', 'pagado', 'enviado', 'completado', 'cancelado']) {
    for (const locale of LOCALES) assert.ok(filled(translate(locale, `status.${status}`)), `status.${status} is translated in ${locale}`);
  }

  // Sample catalogue: every sample is published in both languages and search is locale-aware.
  for (const sample of SAMPLE_PRODUCTS) {
    for (const locale of LOCALES) {
      const text = sampleText(sample, locale);
      assert.ok(filled(text.name) && filled(text.category) && filled(text.summary), `${sample.slug}.${locale} is published`);
    }
  }
  assert.ok(searchSamples('viento', 'es').some((s) => s.slug === 'anemometro'), 'Spanish search uses the Spanish copy');
  assert.ok(searchSamples('wind', 'en').some((s) => s.slug === 'anemometro'), 'English search uses the English copy');
  assert.equal(searchSamples('wind', 'es').length, 0, 'English terms do not match the Spanish catalogue');
  assert.equal(searchSamples('', 'es').length, SAMPLE_PRODUCTS.length, 'an empty search lists every sample');

  // --- Commerce source audit ------------------------------------------------
  // No component decides the language by itself any more, and the public
  // commerce screens take every string from the dictionary.
  const commerceComponents = [
    'src/app/features/shop/shop-list.ts',
    'src/app/features/shop/shop-detail.ts',
    'src/app/features/shop/sample-detail.ts',
    'src/app/features/shop/cart.ts',
    'src/app/features/account/login.ts',
    'src/app/features/account/account.ts',
    'src/app/features/account/order-detail.ts',
  ];
  for (const relativePath of commerceComponents) {
    const source = await readFile(join(root, relativePath), 'utf8');
    assert.ok(!/english\s*\?/.test(source), `${relativePath} decides nothing with an "english ?" ternary`);
    assert.ok(!/data\['language'\]/.test(source), `${relativePath} does not read a route language flag`);
    assert.match(source, /TranslationService/, `${relativePath} takes its copy from the dictionary`);
    assert.match(source, /LocaleService/, `${relativePath} takes the locale from the URL`);
  }
  const routesSource = await readFile(join(root, 'src/app/app.routes.ts'), 'utf8');
  assert.ok(!/data:\s*\{\s*language:/.test(routesSource), 'no route carries a language flag');
  assert.ok(!/shop-en|commerce-en/.test(routesSource), 'the English duplicate components are gone');

  // --- Server rendering -----------------------------------------------------
  const build = join(root, process.env['EMBARCARTE_TEST_BUILD'] ?? 'dist/embarcarte', 'server/server.mjs');
  const hasBuild = await readFile(build, 'utf8').then(() => true, () => false);
  if (!hasBuild) {
    console.warn('\nSKIPPED server-rendering checks: build the app first (npm run build).');
  } else {
    data = await mkdtemp(join(tmpdir(), 'embarcarte-i18n-data-'));
    const probe = createServer();
    await new Promise((done) => probe.listen(0, '127.0.0.1', done));
    const port = probe.address().port;
    await new Promise((done) => probe.close(done));
    base = `http://127.0.0.1:${port}`;
    server = spawn(process.execPath, [build], {
      env: { ...process.env, PORT: String(port), DATA_DIR: data, ADMIN_EMAIL: 'admin@example.test', ADMIN_PASSWORD: 'test-password-123', STRIPE_SECRET_KEY: '', STRIPE_WEBHOOK_SECRET: '' },
      stdio: ['ignore', 'ignore', 'inherit'],
    });

    let ready = false;
    for (let i = 0; i < 100; i++) {
      try { if ((await fetch(`${base}/healthz`)).ok) { ready = true; break; } } catch {}
      await new Promise((done) => setTimeout(done, 200));
    }
    assert.ok(ready, 'server started');

    const html = async (path) => {
      const response = await fetch(base + path);
      assert.equal(response.status, 200, `${path} responds 200`);
      return response.text();
    };

    // Every prerendered public page keeps its URL, language, canonical and alternates.
    const siteUrl = 'https://embarcarte.com';
    const prerendered = [
      'home',
      'technology',
      'experiences',
      'delivery',
      'services',
      'about',
      'contact',
      'guides',
      'legalNotice',
      'privacy',
      'cookies',
      'termsOfSale',
    ];
    const publicPages = [
      ...prerendered.map((id) => ({ id, params: {} })),
      ...TECHNOLOGY.map((product) => ({ id: 'technologyDetail', params: { slug: product.slug } })),
      ...GUIDES.map((guide) => ({ id: 'guideDetail', params: { slug: guide.slug } })),
    ];
    let checked = 0;
    for (const page of publicPages) {
      for (const locale of LOCALES) {
        const url = localizedUrl(page.id, locale, page.params);
        const markup = await html(url);
        checked++;
        assert.match(markup, new RegExp(`<html lang="${locale}"`), `${url} declares lang="${locale}"`);
        assert.match(markup, /<title>[^<]{5,}<\/title>/, `${url} has a title`);
        assert.ok(
          markup.includes(`<link rel="canonical" href="${siteUrl}${url === '/' ? '/' : url}">`),
          `${url} keeps its canonical URL`,
        );
        assert.match(markup, /hreflang="es"/, `${url} keeps its Spanish alternate`);
        assert.match(markup, /hreflang="en"/, `${url} keeps its English alternate`);
        assert.equal((markup.match(/<footer/g) ?? []).length, 1, `${url} renders exactly one footer`);
        const foreign =
          locale === 'en'
            ? ['Saltar al contenido', 'Navegación principal', 'Desarrollado por', 'Qué hacemos']
            : ['Skip to content', 'Main navigation', 'Developed by', 'Open technology. Freedom at sea.'];
        for (const marker of foreign) assert.ok(!markup.includes(marker), `${url} does not leak ${JSON.stringify(marker)}`);
        for (const placeholder of ['{email}', '{owner}', '{title}', '{product}', 'undefined'])
          assert.ok(!markup.includes(placeholder), `${url} leaves no ${placeholder} unresolved`);
      }
    }
    assert.equal(checked, 96, 'the 96 prerendered routes respond in both locales');

    // One component behind both home URLs.
    const [spanishHome, englishHome] = await Promise.all([html('/'), html('/en')]);
    assert.ok(spanishHome.includes('class="home-hero"'), 'the Spanish home renders the shared home component');
    assert.ok(englishHome.includes('class="home-hero"'), 'the English home renders the shared home component');

    const english = await html('/en/technology');
    assert.match(english, /<html lang="en"/, 'English HTML declares lang="en"');
    assert.match(english, /Open technology\. Freedom at sea\./, 'English page renders the English footer');
    assert.match(english, /hreflang="es"/, 'English page keeps its Spanish alternate');
    assert.match(english, /hreflang="en"/, 'English page keeps its English alternate');

    const spanish = await html('/tecnologia');
    assert.match(spanish, /<html lang="es"/, 'Spanish HTML declares lang="es"');
    assert.doesNotMatch(spanish, /Open technology\. Freedom at sea\./, 'Spanish page does not render the English footer');

    const home = await html('/');
    assert.match(home, /<html lang="es"/, 'Spanish home declares lang="es"');
    assert.match((await html('/en')), /<html lang="en"/, 'English home declares lang="en"');

    // `x-default` exists only on the language-neutral entry point.
    assert.match(home, /hreflang="x-default" href="https:\/\/embarcarte\.com\/"/, 'the home declares x-default');
    assert.doesNotMatch(await html('/tecnologia'), /x-default/, 'a translated page declares no x-default');

    // Legacy addresses and unknown pages keep their status codes.
    for (const [legacy, target] of [
      ['/open-marine', '/tecnologia'],
      ['/productos', '/tecnologia'],
      ['/productos/navegador', '/tecnologia/navegador'],
    ]) {
      const response = await fetch(base + legacy, { redirect: 'manual' });
      assert.equal(response.status, 301, `${legacy} still redirects`);
      const location = response.headers.get('location');
      if (location) assert.equal(location, target, `${legacy} points at ${target}`);
    }
    // Unknown URLs are a real 404 in the language of the URL, with no canonical
    // and no alternate because the document has no address of its own.
    const notFound = async (path, locale, copy) => {
      const response = await fetch(base + path);
      assert.equal(response.status, 404, `${path} is a 404`);
      const markup = await response.text();
      assert.match(markup, new RegExp(`<html lang="${locale}"`), `${path} declares lang="${locale}"`);
      assert.ok(markup.includes(copy), `${path} renders its own copy`);
      assert.match(markup, /name="robots" content="noindex/, `${path} is not indexable`);
      assert.doesNotMatch(markup, /<link rel="canonical"/, `${path} publishes no false canonical`);
      assert.doesNotMatch(markup, /<link rel="alternate"/, `${path} publishes no alternate`);
      return markup;
    };
    const spanishNotFound = await notFound('/no-existe', 'es', 'se ha ido a la deriva');
    const englishNotFound = await notFound('/en/no-existe', 'en', 'has drifted away');
    assert.ok(!spanishNotFound.includes('has drifted away'), 'the Spanish 404 does not leak English copy');
    assert.ok(!englishNotFound.includes('se ha ido a la deriva'), 'the English 404 does not leak Spanish copy');
    assert.equal((await fetch(base + '/en/technology/no-existe')).status, 404, 'an unknown module is a 404');

    // The "other language" link names the target language, and the breadcrumb starts at
    // the home page of the current locale.
    assert.match(await html('/guias'), /Read in English/, 'the Spanish guide list links to English in English');
    assert.match(await html('/en/guides'), /Leer en español/, 'the English guide list links to Spanish in Spanish');
    assert.match(
      await html('/en/technology/navegador'),
      /"name":"Home","item":"https:\/\/embarcarte\.com\/en"/,
      'the English breadcrumb starts at the English home',
    );

    // Server-rendered (not prerendered) pages prove the locale is per request.
    const shopPairs = await Promise.all(
      Array.from({ length: 5 }, () => Promise.all([html('/en/shop'), html('/tienda')])),
    );
    for (const [englishShop, spanishShop] of shopPairs) {
      assert.match(englishShop, /<html lang="en"/, 'server-rendered English page declares lang="en"');
      assert.match(spanishShop, /<html lang="es"/, 'server-rendered Spanish page declares lang="es"');
      assert.match(englishShop, /Open technology\. Freedom at sea\./, 'concurrent English render keeps its own locale');
      assert.doesNotMatch(spanishShop, /Open technology\. Freedom at sea\./, 'concurrent Spanish render keeps its own locale');
    }

    console.log('Server-rendering checks passed: lang attributes, alternates and per-request locale isolation.');
  }

  console.log('i18n foundation checks passed: locale detection, route mapping and translations.');
} finally {
  if (server && server.exitCode === null && server.signalCode === null) {
    const exited = new Promise((done) => server.once('exit', done));
    server.kill();
    await exited;
  }
  if (!resolve(out).startsWith(resolve(tmpdir()) + sep)) throw new Error('Unexpected temporary directory');
  await rm(out, { recursive: true, force: true });
  if (data) await rm(data, { recursive: true, force: true });
}
