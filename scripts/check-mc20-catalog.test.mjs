/**
 * MC-20 catalogue unit and adversarial tests.
 *
 * Run with:
 *   node --import ./scripts/marea-landing-ts-register.mjs \
 *     --disable-warning=MODULE_TYPELESS_PACKAGE_JSON \
 *     --test --test-isolation=none scripts/check-mc20-catalog.test.mjs
 *
 * The adversarial cases assert that the guards fail closed: a plausible but
 * prohibited commercial claim, a malformed status or an out-of-scope path must
 * be rejected, not accepted with a warning.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  catalogClaimProblems,
  contentBlocks,
  bilingualTextProblems,
  contentEnglishStrings,
  contentInventory,
  englishClusterProblem,
  findForbiddenReach,
  normaliseRoutePath,
  scopeProblems,
  sourceRefPath,
  walk,
} from './mc20-catalog-guards.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const importLocal = (path) => import(pathToFileURL(resolve(root, path)).href);

const projection = await importLocal('src/app/marea-catalog/data/catalog.generated.ts');
const content = await importLocal('src/app/marea-catalog/content/index.ts');
const identity = await importLocal('src/app/marea-catalog/models/catalog-identity.ts');
const domain = await importLocal('src/app/marea-catalog/data/catalog-domain.ts');

const FAMILIES = ['NAV', 'HUB', 'AIS'];

test('projection exposes the three canonical families and six editions', () => {
  assert.deepEqual(
    projection.CATALOG_FAMILIES.map((entry) => entry.familyId),
    FAMILIES,
  );
  assert.equal(projection.CATALOG_EDITIONS.length, 6);
  assert.deepEqual(
    projection.CATALOG_EDITIONS.map((entry) => entry.editionId),
    ['NAV-ESSENTIAL', 'NAV-PRO', 'HUB-STANDARD', 'HUB-PRO', 'AIS-RECEIVER', 'AIS-CONNECTED'],
  );
});

test('no commercial state is merchantable, priced or SKU-identified', () => {
  for (const edition of projection.CATALOG_EDITIONS) {
    assert.equal(edition.merchantable, false);
    assert.equal(edition.priceApproved, false);
    assert.equal(edition.merchantSkuCode, null);
  }
  assert.equal(projection.CATALOG_DOMAIN_FACTS.approvedPrices, 0);
  assert.equal(projection.CATALOG_DOMAIN_FACTS.merchantSkuCodes, 0);
});

test('unknown status codes fail closed to readable text and NOT_READY', () => {
  assert.equal(domain.statusLabel('SOMETHING_NEW', 'es'), 'SOMETHING_NEW');
  assert.equal(domain.readinessStatusOf('SOMETHING_NEW'), 'NOT_READY');
  assert.equal(domain.readinessStatusOf('READY'), 'READY');
  assert.equal(domain.readinessStatusOf('BLOCKED'), 'BLOCKED');
  assert.equal(domain.readinessStatusOf('COMPLETE_TARGET_SPECIFICATION'), 'READY');
  assert.equal(domain.readinessStatusOf('NOT_APPLICABLE_SOFTWARE_PRODUCT'), 'NOT_ASSESSED');
  assert.equal(domain.readinessStatusOf('NOT_CLEARED'), 'NOT_READY');
  assert.equal(domain.statusLabel('SOFTWARE', 'en'), 'Software');
  assert.equal(domain.statusLabel(undefined, 'es'), 'UNKNOWN');
});

test('readiness summary derives eleven dimensions with an explicit, lossy mapping', () => {
  for (const familyId of FAMILIES) {
    const summary = domain.catalogReadinessSummary(familyId, 'es');
    assert.equal(summary.dimensions.length, 11);
    assert.equal(summary.overall, 'NOT_READY');
    assert.equal(summary.blockedGateIds.length, 1);
    assert.ok(summary.dimensions.every((dimension) => typeof dimension.label === 'string'));
  }
});

test('family restrictions always include publication, trademark, price and stock', () => {
  for (const familyId of FAMILIES) {
    const record = domain.catalogFamilyRecord(familyId);
    const restrictions = domain.restrictionsFor(record);
    for (const required of [
      'PUBLICATION_NOT_AUTHORIZED',
      'TRADEMARK_NOT_CLEARED',
      'PRICE_NOT_APPROVED',
      'STOCK_NOT_VERIFIED',
    ]) {
      assert.ok(restrictions.includes(required), `${familyId} missing ${required}`);
    }
  }
});

test('the commercial presentation is fail-closed for every family', () => {
  const presentation = domain.CATALOG_COMMERCIAL_PRESENTATION;
  assert.equal(presentation.purchaseActionAllowed, false);
  assert.equal(presentation.cartAllowed, false);
  assert.equal(presentation.priceVisible, false);
  assert.equal(presentation.availabilityVisible, false);
  assert.equal(presentation.ctaState, 'DISABLED');
});

test('edition summaries preserve canonical identity and conditional status', () => {
  const record = projection.CATALOG_EDITIONS.find((entry) => entry.editionId === 'AIS-CONNECTED');
  const summary = domain.editionSummary(record, 'AIS Connected', 'NOT_READY', []);
  assert.equal(summary.editionId, 'AIS-CONNECTED');
  assert.equal(summary.displayName, 'AIS Connected');
  assert.equal(summary.definitionStatus, 'CONDITIONAL');
  assert.equal(summary.readiness, 'NOT_READY');
});

test('cross-family summaries come from the canonical fixture', () => {
  const summary = domain.familyCardSummary('HUB');
  assert.ok(summary);
  assert.equal(summary.familyId, 'HUB');
  assert.equal(summary.editionCount, 2);
  assert.ok(summary.restrictions.includes('PUBLICATION_NOT_AUTHORIZED'));
});

test('every family content contract exposes the ten frozen sections', () => {
  for (const familyId of FAMILIES) {
    const entry = content.CATALOG_CONTENT[familyId];
    assert.deepEqual(Object.keys(entry.sections).sort(), [...content.CATALOG_SECTION_IDS].sort());
    assert.equal(entry.capabilities.length >= 5, true);
    assert.equal(entry.limitations.length >= 5, true);
    assert.equal(entry.editionNote.es.length > 0, true);
  }
});

test('content ids are unique and every source reference exists', () => {
  const seen = new Set();
  for (const familyId of FAMILIES) {
    for (const block of contentBlocks(content.CATALOG_CONTENT[familyId])) {
      assert.equal(seen.has(block.contentId), false, `duplicate ${block.contentId}`);
      seen.add(block.contentId);
      assert.ok(block.sourceRefs.length > 0, `${block.contentId} has no source`);
      for (const ref of block.sourceRefs) {
        const path = sourceRefPath(ref);
        assert.ok(path && existsSync(resolve(root, path)), `missing ${ref}`);
      }
    }
  }
});

test('every localized pair is complete, translated and negation-bearing where required', () => {
  for (const familyId of FAMILIES) {
    const entry = content.CATALOG_CONTENT[familyId];
    const inventory = contentInventory(entry);
    assert.equal(inventory.sections.length, 10);
    assert.ok(inventory.capabilityIds.length >= 5);
    assert.ok(inventory.limitationIds.length >= 5);
    assert.deepEqual(bilingualTextProblems(entry), [], `${familyId} parity problems`);
  }
});

test('the bilingual guard rejects an empty locale and an untranslated pair', () => {
  const ais = content.CATALOG_CONTENT.AIS;
  const emptyEn = {
    ...ais,
    limitations: ais.limitations.map((entry, index) =>
      index === 0 ? { ...entry, description: { ...entry.description, en: '' } } : entry,
    ),
  };
  assert.ok(
    bilingualTextProblems(emptyEn).some((problem) => problem.includes('empty locale')),
    'empty EN limitation must be rejected',
  );
  const untranslated = {
    ...ais,
    hero: { ...ais.hero, lead: { es: ais.hero.lead.es, en: ais.hero.lead.es } },
  };
  assert.ok(
    bilingualTextProblems(untranslated).some((problem) => problem.includes('identical ES/EN')),
    'identical ES/EN lead must be rejected',
  );
});

test('the English content has no untranslated Spanish clustering', () => {
  for (const familyId of FAMILIES) {
    for (const text of contentEnglishStrings(content.CATALOG_CONTENT[familyId])) {
      assert.equal(englishClusterProblem(text), false, text.slice(0, 80));
    }
  }
});

test('AIS states receive-only and its use prohibitions in both locales', () => {
  const ais = content.CATALOG_CONTENT.AIS;
  const strings = [
    ais.hero.mandatoryNotice.text.es,
    ais.hero.mandatoryNotice.text.en,
    ...ais.limitations.flatMap((entry) => [entry.description.es, entry.description.en]),
  ].join('\n');
  for (const required of [
    'No es un transpondedor',
    'no transmite',
    'no es un dispositivo DSC',
    'no es un sistema anticolisión',
    'It is not a transponder',
    'it does not transmit',
    'it is not a DSC device',
    'it is not a collision-avoidance system',
  ]) {
    assert.ok(strings.includes(required), `missing: ${required}`);
  }
});

test('the claim guard rejects every prohibited commercial claim', () => {
  const cases = [
    'Precio: 249 €',
    'desde 249 EUR',
    'Añadir al carrito',
    'Add to cart',
    'Comprar ahora',
    'Buy now',
    'En stock y listo para enviar',
    'Garantizamos compatibilidad total',
    'Aprobado por NMEA',
    'Homologado CE',
    'Pruebas de mar completadas',
    'Entrega en 5 días',
    'Produce testimonios reales',
    'Producto certificado por NMEA',
    'Certified to NMEA 2000',
    'Compatible con NMEA 2000',
    'Garantía de 5 años',
    'Envío gratis en 48 horas',
    'Previene colisiones',
    'Transmite AIS y tu posición',
    'Compatible with NMEA 2000',
    'NMEA certified receiver',
    'Compatible con cualquier equipo',
    'Universalmente compatible',
    'Universal plug-and-play gateway included',
  ];
  for (const text of cases) {
    assert.ok(catalogClaimProblems(text).length > 0, `not rejected: ${text}`);
  }
});

test('the claim guard accepts honest negated limitations', () => {
  const cases = [
    'Sin precio aprobado y sin stock verificado',
    'No es un transpondedor y no transmite AIS',
    'Sin certificación NMEA 2000 ni garantía de interoperabilidad',
    'CPA/TCPA no garantizado',
    'No hay código de SKU de comercio ni pedido disponible',
    'No public route, no canonical, no indexation',
    'No es un sistema de navegación certificado',
    'It is not a collision-avoidance system',
    'Sin certificación NMEA 2000 ni compatibilidad universal',
    'No NMEA 2000 certification or interoperability guarantee',
    'No se ofrece una pasarela plug-and-play universal.',
    'No universal plug-and-play gateway is offered.',
    'Sin certificación NMEA 2000 ni compatibilidad universal',
  ];
  for (const text of cases) {
    assert.deepEqual(catalogClaimProblems(text), [], `wrongly rejected: ${text}`);
  }
});

test('malformed guards fail closed instead of throwing', () => {
  assert.deepEqual(catalogClaimProblems(null), ['not-a-string']);
  assert.equal(englishClusterProblem(undefined), false);
  assert.equal(sourceRefPath(null), null);
  assert.equal(sourceRefPath(''), null);
  assert.equal(domain.statusLabel(undefined, 'es'), 'UNKNOWN');
});

test('preview routing is internal, complete and unique', () => {
  assert.equal(identity.CATALOG_PREVIEW_ROUTES.length, 6);
  const paths = identity.CATALOG_PREVIEW_ROUTES.map((route) => route.path);
  assert.equal(new Set(paths).size, 6);
  for (const route of identity.CATALOG_PREVIEW_ROUTES) {
    assert.ok(route.path.includes('internal/catalog/'));
    assert.equal(route.renderMode, 'Server');
  }
  assert.equal(identity.isCatalogFamilyId('PILOT'), false);
  assert.equal(identity.isCatalogFamilyId('NAV'), true);
  assert.equal(normaliseRoutePath('/internal/catalog/nav/'), 'internal/catalog/nav');
});

test('the scope guard rejects an out-of-scope path and accepts an allowed one', () => {
  const lines = [' M src/app/marea-catalog/catalog-page.ts', ' M src/app/features/shop/cart.ts'];
  const problems = scopeProblems(lines, ['src/app/marea-catalog/'], ['package.json']);
  assert.deepEqual(problems, ['src/app/features/shop/cart.ts']);
});

test('no production module reaches the catalogue', () => {
  const reach = findForbiddenReach({
    root,
    entryFiles: ['src/main.ts', 'src/app/app.routes.ts', 'src/server.ts'],
    forbiddenRoots: ['src/app/marea-catalog', 'preview/landing'],
  });
  assert.deepEqual(reach.offenders, []);
  assert.ok(reach.scanned > 30);
});

test('the catalogue module contains no component fork of an MC-17 selector', () => {
  const selectors = new Set();
  for (const file of walk(root, 'src/app/marea-catalog').filter((path) => path.endsWith('.ts'))) {
    const source = readFileSync(resolve(root, file), 'utf8');
    for (const match of source.matchAll(/selector:\s*'([^']+)'/g)) selectors.add(match[1]);
  }
  for (const selector of selectors) {
    assert.ok(!selector.startsWith('marea-spec-'), `forked ${selector}`);
    assert.ok(!selector.startsWith('marea-feature-'), `forked ${selector}`);
    assert.ok(!selector.startsWith('marea-readiness-'), `forked ${selector}`);
  }
  assert.ok(selectors.has('marea-catalog-page'));
});
