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
  contentStrings,
  englishClusterProblem,
  findForbiddenReach,
  normaliseRoutePath,
  providerNameProblems,
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

const FAMILIES = ['NAV', 'HUB', 'AIS', 'SENSE', 'WATCH', 'WEATHER', 'DISPLAY', 'PILOT', 'FLEET'];

test('projection exposes the nine canonical families and twenty-six editions', () => {
  assert.deepEqual(
    [...projection.CATALOG_FAMILIES.map((entry) => entry.familyId)].sort(),
    [...FAMILIES].sort(),
  );
  assert.equal(projection.CATALOG_FAMILIES.length, 9);
  assert.equal(projection.CATALOG_EDITIONS.length, 26);
  assert.deepEqual(
    projection.CATALOG_EDITIONS.filter((entry) => entry.familyId === 'SENSE').map(
      (entry) => entry.editionId,
    ),
    [
      'SENSE-WIND',
      'SENSE-POWER',
      'SENSE-BILGE',
      'SENSE-TANKS',
      'SENSE-ENV',
      'SENSE-ESSENTIALS',
      'SENSE-SAIL',
      'SENSE-SYSTEMS',
    ],
  );
  assert.equal(projection.CATALOG_GOVERNANCE_GATES.length, 10);
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
    assert.ok(
      ['NOT_READY', 'BLOCKED'].includes(summary.overall),
      `${familyId} overall ${summary.overall} is not fail-closed`,
    );
    assert.equal(summary.blockedGateIds.length, 1);
    assert.ok(summary.dimensions.every((dimension) => typeof dimension.label === 'string'));
  }
  assert.equal(domain.catalogReadinessSummary('PILOT', 'es').overall, 'BLOCKED');
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

test('preview routing is internal, complete and unique across eighteen routes', () => {
  assert.equal(identity.CATALOG_PREVIEW_ROUTES.length, 18);
  const paths = identity.CATALOG_PREVIEW_ROUTES.map((route) => route.path);
  assert.equal(new Set(paths).size, 18);
  for (const route of identity.CATALOG_PREVIEW_ROUTES) {
    assert.ok(route.path.includes('internal/catalog/'));
    assert.equal(route.renderMode, 'Server');
  }
  assert.equal(identity.isCatalogFamilyId('PILOT'), true);
  assert.equal(identity.isCatalogFamilyId('DISPLAY'), true);
  assert.equal(identity.isCatalogFamilyId('FLEET'), true);
  assert.equal(identity.isCatalogFamilyId('NAV'), true);
  assert.equal(identity.isCatalogFamilyId('WEATHER'), true);
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

test('the cross-family summaries include the new families from the canonical fixture', () => {
  const sense = domain.familyCardSummary('SENSE');
  assert.ok(sense);
  assert.equal(sense.editionCount, 8);
  const watch = domain.familyCardSummary('WATCH');
  assert.ok(watch);
  assert.equal(watch.editionCount, 2);
  const weather = domain.familyCardSummary('WEATHER');
  assert.ok(weather);
  assert.equal(weather.editionCount, 2);
});

test('the WEATHER content names no data provider', () => {
  const weather = content.CATALOG_CONTENT.WEATHER;
  const strings = contentStrings(weather).join('\n');
  assert.deepEqual(providerNameProblems(strings), []);
  assert.ok(strings.includes('fuente externa no contratada'));
  assert.ok(strings.includes('no provider is named'));
});

test('a named provider inserted into the catalogue is rejected', () => {
  assert.ok(providerNameProblems('Datos de meteoblue con cobertura mundial').length > 0);
  assert.ok(providerNameProblems('Powered by PredictWind').length > 0);
});

test('all eight mandated data providers are rejected when injected into WEATHER content', () => {
  const base = contentStrings(content.CATALOG_CONTENT.WEATHER).join('\n');
  const providers = [
    'Copernicus',
    'EMODnet',
    'AEMET',
    'Open-Meteo',
    'MeteoGalicia',
    'Puertos del Estado',
    'OpenWeather',
    'IHM',
  ];
  for (const provider of providers) {
    const injected = `${base}\nDatos del proveedor ${provider} para esta previsión.`;
    assert.ok(
      providerNameProblems(injected).length > 0,
      `provider not rejected when injected: ${provider}`,
    );
  }
});

test('a legitimate provider-free sentence passes and substrings are not false positives', () => {
  assert.deepEqual(
    providerNameProblems('Fuente externa no contratada; no se nombra ningún proveedor de datos.'),
    [],
  );
  // Short markers match only as standalone tokens, never inside a longer word.
  assert.deepEqual(providerNameProblems('xihmx y aemetic'), []);
  assert.deepEqual(providerNameProblems('IHM'), ['ihm']);
  assert.deepEqual(providerNameProblems('AEMET'), ['aemet']);
});

test('fabricated forecast-accuracy, SLA and delivery claims are rejected', () => {
  for (const text of [
    'Previsión con un 95% de acierto garantizado',
    'Exactitud garantizada de ±0,1 m/s',
    'We guarantee a 99% hit rate',
    'SLA garantizado de 99,9%',
    'Guaranteed service level agreement included',
    'Entrega de avisos garantizada en 30 segundos',
    'Guaranteed alert delivery to your phone',
  ]) {
    assert.ok(catalogClaimProblems(text).length > 0, `not rejected: ${text}`);
  }
});

test('an availability claim above DEFINED is rejected', () => {
  for (const text of [
    'Disponible para la venta',
    'Available for sale now',
    'En venta ya',
    'Ready to buy',
    'Listo para comprar',
  ]) {
    assert.ok(catalogClaimProblems(text).length > 0, `not rejected: ${text}`);
  }
});

test('the honest negations remain accepted', () => {
  for (const text of [
    'No está a la venta ni disponible para la venta',
    'Not for sale and never presented as available',
    'Sin SLA y sin nivel de servicio garantizado',
    'No accuracy figure is announced',
    'No garantiza la entrega de avisos',
  ]) {
    assert.deepEqual(catalogClaimProblems(text), [], `wrongly rejected: ${text}`);
  }
});

test('a SENSE accuracy claim is rejected', () => {
  assert.ok(catalogClaimProblems('Precisión garantizada de ±0,1 m/s para el viento').length > 0);
});

test('a WATCH guaranteed-delivery claim is rejected', () => {
  assert.ok(catalogClaimProblems('Entrega de avisos garantizada al instante').length > 0);
});

test('currency words and symbols are rejected', () => {
  for (const text of [
    '149 euros',
    '149 dólares',
    '149 dollars',
    '$149',
    '149 USD',
    '149 EUR',
    'USD 149',
    'Precio: 149 €',
  ]) {
    assert.ok(catalogClaimProblems(text).length > 0, `not rejected: ${text}`);
  }
});

test('numeric accuracy, IP rating and ordering wording are rejected', () => {
  for (const text of [
    'Precisión de ±0,1 m/s',
    '±0,1 m/s',
    '95% accuracy',
    'hit-rate 95%',
    'IP67',
    'IP 67',
    'IPX7',
    'pre-order',
    'preorder',
    'preventa',
    'pre-venta',
  ]) {
    assert.ok(catalogClaimProblems(text).length > 0, `not rejected: ${text}`);
  }
});

test('honest negations of the new claim classes remain accepted', () => {
  for (const text of [
    'Sin precio aprobado y sin stock verificado',
    'No accuracy figure is announced',
    'Sin cifra de acierto ni porcentaje garantizado',
    'No IP67 rating is claimed',
    'Sin clasificación IP67',
    'Sin pre-order ni preventa',
  ]) {
    assert.deepEqual(catalogClaimProblems(text), [], `wrongly rejected: ${text}`);
  }
});

test('negation scanning covers every match, not only the first', () => {
  const text = 'Sin SLA garantizado, SLA garantizado';
  assert.ok(catalogClaimProblems(text).length > 0, 'later non-negated claim must be rejected');
});

test('a comma ends a clause so a later non-negated claim is rejected', () => {
  assert.ok(catalogClaimProblems('Sin permanencia, SLA garantizado').length > 0);
});

test('a content pair missing one locale is a hard failure', () => {
  const weather = content.CATALOG_CONTENT.WEATHER;
  const missingEn = {
    ...weather,
    hero: { ...weather.hero, lead: { es: weather.hero.lead.es } },
  };
  assert.ok(
    bilingualTextProblems(missingEn).some((problem) => problem.includes('missing locale')),
    'missing EN hero.lead must be reported as a missing locale',
  );
});

test('an ES/EN parity break in the new families is rejected', () => {
  const weather = content.CATALOG_CONTENT.WEATHER;
  const broken = {
    ...weather,
    limitations: weather.limitations.map((entry, index) =>
      index === 0 ? { ...entry, description: { ...entry.description, en: '' } } : entry,
    ),
  };
  assert.ok(
    bilingualTextProblems(broken).some((problem) => problem.includes('empty locale')),
    'empty EN WEATHER limitation must be rejected',
  );
});

test('every family block carries a non-empty evidence class and source', () => {
  for (const familyId of FAMILIES) {
    for (const block of contentBlocks(content.CATALOG_CONTENT[familyId])) {
      assert.ok(block.evidenceClass, `${block.contentId} has no evidence class`);
      assert.ok(block.sourceRefs.length > 0, `${block.contentId} has no source`);
    }
  }
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

// ------------------------------------------------------------------ MC-22 adversarial mutations
test('an invented DISPLAY screen dimension is rejected', () => {
  for (const text of [
    'Pantalla de 9 pulgadas de diagonal',
    '9 pulgadas de pantalla',
    'Pantalla de 10 pulgadas',
  ]) {
    assert.ok(
      catalogClaimProblems(text).some((id) => id.startsWith('display-')),
      `not rejected: ${text}`,
    );
  }
});

test('an invented DISPLAY resolution, brightness and power figure is rejected', () => {
  for (const text of ['Resolución 1920×1080', 'Brillo de 1000 nits', 'Consumo de 12 W']) {
    assert.ok(
      catalogClaimProblems(text).some((id) => id.startsWith('display-')),
      `not rejected: ${text}`,
    );
  }
});

test('an invented DISPLAY IP or environmental rating is rejected', () => {
  for (const text of ['IP67', 'IPX7', 'Estanco IP68', 'Impermeable']) {
    assert.ok(catalogClaimProblems(text).length > 0, `not rejected: ${text}`);
  }
});

test('an invented SLA and availability guarantee is rejected', () => {
  for (const text of [
    'SLA garantizado de 99,9%',
    'Disponibilidad garantizada del 99,9%',
    '99,9% de uptime',
    'Contrato de servicio firmado',
  ]) {
    assert.ok(catalogClaimProblems(text).length > 0, `not rejected: ${text}`);
  }
});

test('an autonomous-navigation and unsupervised claim is rejected', () => {
  for (const text of [
    'PILOT ofrece navegación autónoma sin supervisión',
    'Navegación autónoma sin supervisión',
    'Sin supervisión',
  ]) {
    assert.ok(
      catalogClaimProblems(text).some((id) => id.startsWith('pilot-')),
      `not rejected: ${text}`,
    );
  }
});

test('a certified autopilot, guaranteed reliability and regulatory approval are rejected', () => {
  for (const text of [
    'PILOT es un autopiloto certificado',
    'PILOT es un piloto automático certificado',
    'Fiabilidad garantizada',
    'Aprobación regulatoria obtenida',
  ]) {
    assert.ok(
      catalogClaimProblems(text).some((id) => id.startsWith('pilot-')),
      `not rejected: ${text}`,
    );
  }
});

test('a verified steering integration claim is rejected', () => {
  for (const text of ['Integración verificada con el timón', 'Verified steering integration']) {
    assert.ok(catalogClaimProblems(text).includes('pilot-helm-verified'), `not rejected: ${text}`);
  }
});

test('a named customer deployment and included hardware are rejected', () => {
  for (const text of ['Cliente desplegado en producción', 'Hardware incluido']) {
    assert.ok(
      catalogClaimProblems(text).some((id) => id.startsWith('fleet-')),
      `not rejected: ${text}`,
    );
  }
});

test('a security certification and commercial package claim is rejected', () => {
  for (const text of [
    'Certificación de seguridad SOC 2',
    'Certificación de seguridad obtenida',
    'Paquete comercial disponible',
  ]) {
    assert.ok(
      catalogClaimProblems(text).some((id) => id.startsWith('fleet-')),
      `not rejected: ${text}`,
    );
  }
});

test('a named supplier injected into the catalogue is rejected', () => {
  for (const text of ['Datos de meteoblue con cobertura mundial', 'Fuente: PredictWind']) {
    assert.ok(providerNameProblems(text).length > 0, `supplier not rejected: ${text}`);
  }
});

test('a weakened governance gate is rejected and the ten gates stay verbatim', () => {
  const gates = projection.CATALOG_GOVERNANCE_GATES;
  assert.equal(gates.length, 10);
  assert.deepEqual(gates, [
    'TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED',
    'MAREA_PUBLIC_USE = NO_GO',
    'SOURCE_IP_CLEARANCE = NOT_CLEARED',
    'LICENSING_RIGHTS_GRANTED = false',
    'PRICE_APPROVED = NONE',
    'COMMERCIAL_AVAILABILITY = NOT_FOR_SALE',
    'PUBLICATION_AUTHORIZED = false',
    'INDEXATION_AUTHORIZED = false',
    'PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED',
    'GATE-PRIVACY-DPA-DPIA = BLOCKED',
  ]);
  assert.ok(!gates.includes('COMMERCIAL_AVAILABILITY = FOR_SALE'));
  assert.ok(!gates.includes('PUBLICATION_AUTHORIZED = true'));
});

test('a hardcoded six-family list is rejected by the nine-family projection', () => {
  assert.equal(projection.CATALOG_FAMILIES.length, 9);
  assert.equal(projection.CATALOG_SCOPE_FAMILY_IDS.length, 9);
  assert.equal(Object.keys(content.CATALOG_CONTENT).length, 9);
  const hardcodedSix = ['NAV', 'HUB', 'AIS', 'SENSE', 'WATCH', 'WEATHER'];
  assert.notDeepEqual([...projection.CATALOG_SCOPE_FAMILY_IDS].sort(), [...hardcodedSix].sort());
});

test('every canonical edition is present and a dropped first row would be detected', () => {
  const canonical = JSON.parse(
    readFileSync(resolve(root, 'docs/marea/commerce-data/data/product-editions.json'), 'utf8'),
  ).editions;
  const projected = new Set(projection.CATALOG_EDITIONS.map((entry) => entry.editionId));
  const scope = new Set(projection.CATALOG_SCOPE_FAMILY_IDS);
  for (const edition of canonical) {
    if (scope.has(edition.familyId)) {
      assert.ok(projected.has(edition.editionId), `missing edition ${edition.editionId}`);
    }
  }
  assert.ok(projected.has('DISPLAY-7'));
  assert.ok(projected.has('PILOT-COASTAL'));
  assert.ok(projected.has('FLEET-START'));
});

test('a missing locale in a batch-3 family is a hard failure', () => {
  for (const familyId of ['DISPLAY', 'PILOT', 'FLEET']) {
    const entry = content.CATALOG_CONTENT[familyId];
    const missingEn = {
      ...entry,
      hero: { ...entry.hero, lead: { es: entry.hero.lead.es } },
    };
    assert.ok(
      bilingualTextProblems(missingEn).some((problem) => problem.includes('missing locale')),
      `missing EN hero.lead not reported for ${familyId}`,
    );
  }
});

test('honest batch-3 negations remain accepted', () => {
  for (const text of [
    'No es un piloto automático certificado, no gobierna sin supervisión y no ofrece mando remoto.',
    'Sin aprobación regulatoria ni homologación',
    'no SLA established',
    'Sin hardware incluido',
    'Sin certificación de seguridad',
    'Tamaño no congelado: la designación «DISPLAY 7» es una etiqueta comercial, no una dimensión medida.',
  ]) {
    assert.deepEqual(catalogClaimProblems(text), [], `wrongly rejected: ${text}`);
  }
});

test('the unsupervised claim does not fail open behind its own "sin" particle', () => {
  assert.ok(catalogClaimProblems('Sin supervisión').includes('pilot-unsupervised'));
  assert.deepEqual(catalogClaimProblems('no opera sin supervisión'), []);
});

// ------------------------------------------------------------------ MC-22 r1 negator-scoping regressions
test('non-negating idioms do not suppress a PILOT autonomy claim', () => {
  for (const text of [
    'Sin embargo funciona sin supervisión.',
    'Sin duda opera sin supervisión.',
    'Opera sin fallos sin supervisión.',
    'Works without issues unsupervised.',
  ]) {
    assert.ok(catalogClaimProblems(text).length > 0, `not rejected: ${text}`);
  }
});

test('a negator in an earlier sub-clause does not suppress a later claim', () => {
  for (const text of [
    'No es solo asistencia: funciona sin supervisión.',
    'No es un autopiloto — opera sin supervisión.',
    'No solo ayuda sino que funciona sin supervisión.',
  ]) {
    assert.ok(catalogClaimProblems(text).length > 0, `not rejected: ${text}`);
  }
});

test('an idiom inside a spread claim does not suppress the claim word', () => {
  for (const text of [
    'Las pruebas de mar sin fallos fueron completadas.',
    'Sea trials with no issues completed.',
    'Pantalla sin marco de 7 pulgadas.',
    'Resolución sin pérdida 1920x1080.',
  ]) {
    assert.ok(catalogClaimProblems(text).length > 0, `not rejected: ${text}`);
  }
});

test('the complete PILOT autonomy vocabulary is rejected', () => {
  for (const text of [
    'Es autónomo.',
    'Hands-free operation.',
    'Autonomous steering.',
    'Funciona de forma autónoma.',
    'Sin vigilancia.',
    'Sin supervisor.',
    'Without supervision.',
    'Unattended operation.',
  ]) {
    assert.ok(catalogClaimProblems(text).length > 0, `not rejected: ${text}`);
  }
});

test('the DISPLAY dimension guard rejects hyphen, quote, Full HD and 4K forms', () => {
  for (const text of [
    'Pantalla de 7-inch.',
    'Pantalla de 7".',
    'pantallas de 7 pulgadas',
    'Full HD',
    '4K',
  ]) {
    assert.ok(catalogClaimProblems(text).length > 0, `not rejected: ${text}`);
  }
});

test('the honest disclaimer corpus remains allowed after the repair', () => {
  for (const text of [
    'MAREA PILOT no funciona sin supervisión.',
    'MAREA PILOT nunca opera sin supervisión.',
    'No incluye navegación autónoma.',
    'Las pruebas de mar no se han realizado.',
    'No hay SLA establecido ni disponibilidad garantizada.',
    'No se publica ningún tamaño de pantalla.',
    'Sin hardware incluido.',
    'Sin certificación de seguridad.',
  ]) {
    assert.deepEqual(catalogClaimProblems(text), [], `wrongly rejected: ${text}`);
  }
});

// ------------------------------------------------------------------ MC-22 r2 hard acceptance matrix
test('r2 must-reject: autonomy, certification and approval claims', () => {
  for (const text of [
    'MAREA PILOT is fully autonomous.',
    'MAREA PILOT is certified.',
    'MAREA PILOT es certificado.',
    'A certified autopilot for your boat.',
    'PILOT ha obtenido la aprobación regulatoria.',
    'has received type approval.',
  ]) {
    assert.ok(catalogClaimProblems(text).length > 0, `not rejected: ${text}`);
  }
});

test('r2 must-reject: sea-trial claims in both word orders', () => {
  for (const text of [
    'Las pruebas de mar se completaron con éxito.',
    'PILOT has completed sea trials.',
    'Ha superado las pruebas de mar.',
    'Sea trials with no failures were completed.',
    'Las pruebas de mar se completaron.',
    'Se realizaron las pruebas de mar.',
  ]) {
    assert.ok(catalogClaimProblems(text).length > 0, `not rejected: ${text}`);
  }
});

test('r2 must-reject: subordinated and idiomatic autonomy claims', () => {
  for (const text of [
    'Unattended operation is supported. SLA is not offered.',
    'No hay duda de que opera de forma autónoma.',
    'No intervention needed because it provides autonomous operation.',
    'Not only does it offer autonomous navigation.',
    'Funciona sin cables de forma autónoma.',
    'Nunca fue tan fácil navegar de forma autónoma.',
  ]) {
    assert.ok(catalogClaimProblems(text).length > 0, `not rejected: ${text}`);
  }
});

test('r2 must-reject: spelled-out dimension and hardware-included forms', () => {
  for (const text of [
    'Pantalla de siete pulgadas.',
    'Pantalla de cinco pulgadas.',
    'Pantalla de veinte pulgadas.',
    'Pantalla de cincuenta pulgadas.',
    'five-inch display.',
    'fifty-inch display.',
    'twenty-inch screen.',
    'El hardware está incluido.',
    'El hardware viene incluido.',
    'Hardware is included by default.',
    'The hardware comes included.',
  ]) {
    assert.ok(catalogClaimProblems(text).length > 0, `not rejected: ${text}`);
  }
});

test('r2 must-allow: honest negated disclaimers', () => {
  for (const text of [
    'Does not offer remote or autonomous steering.',
    'No incluye navegación autónoma o funcionamiento desatendido.',
    'Autonomous navigation is not included.',
    'La navegación autónoma no está disponible.',
    'Ningún cliente desplegado en producción.',
    'MAREA PILOT no está homologado.',
    'No se promete una disponibilidad del 99,9 %.',
    'No se ha congelado el tamaño de 7 pulgadas.',
    'Autonomous steering — not offered.',
    'El hardware no está incluido.',
    'Las pruebas de mar no se han realizado.',
    'No se han completado las pruebas de mar.',
  ]) {
    assert.deepEqual(catalogClaimProblems(text), [], `wrongly rejected: ${text}`);
  }
});
