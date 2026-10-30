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
    for (const locale of LOCALES) {
      const url = localizedUrl(id, locale, id === 'technologyDetail' || id === 'guideDetail' || id === 'shopDetail' || id === 'shopSample' ? { slug: 'navegador' } : {});
      const match = matchRoute(url);
      assert.ok(match, `${url} resolves back to a route`);
      assert.equal(match.id, id, `${url} round-trips to ${id}`);
      assert.equal(match.locale, locale, `${url} stays in ${locale}`);
      if (url.includes('navegador')) assert.equal(match.params.slug, 'navegador', `${url} keeps its slug`);
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

  // Pages with no localized counterpart are reported, never silently redirected home.
  for (const url of ['/admin', '/admin/pedidos', '/cuenta/pedidos/7', '/open-marine', '/productos/navegador', '/no-existe']) {
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

  // Services list: published as-is per locale (English currently has three blocks).
  for (const locale of LOCALES) {
    assert.ok(SERVICES[locale].length > 0, `services.${locale} is published`);
    for (const service of SERVICES[locale]) assert.ok(filled(service.title) && filled(service.text));
  }

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
    assert.equal((await fetch(base + '/en/technology/no-existe')).status, 404, 'an unknown module is a 404');
    assert.equal((await fetch(base + '/no-existe')).status, 404, 'an unknown page is a 404');

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
