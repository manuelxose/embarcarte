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
    '--module', 'commonjs',
    '--moduleResolution', 'node10',
    '--target', 'es2022',
    '--skipLibCheck',
    '--rootDir', join(root, 'src'),
    '--outDir', out,
  ]);

  const require = createRequire(join(out, 'index.cjs'));
  const { DEFAULT_LOCALE, LOCALES, isLocale, localeFromUrl, otherLocale } = require(join(out, 'app/core/i18n/locale.types.js'));
  const { LOCALIZED_ROUTES, alternateUrl, localizedUrl, matchRoute } = require(join(out, 'app/core/i18n/locale-routes.js'));
  const { DICTIONARIES, translate } = require(join(out, 'app/i18n/dictionary.js'));

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
