#!/usr/bin/env node
/**
 * MC-20 internal catalogue validator.
 *
 * Deterministic, read-only gate over the MC-20 NAV/HUB/AIS catalogue:
 * canonical identity and readiness, content provenance, ES/EN parity, claim
 * safety, public isolation, design-system reuse, route definition and
 * governance. It writes only its own evidence file.
 *
 * Usage:
 *   node --import ./scripts/marea-landing-ts-register.mjs \
 *     --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/check-mc20-catalog.mjs
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  bilingualTextProblems,
  catalogClaimProblems,
  contentBlocks,
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
const BASE_COMMIT = '3490c0f'; // verified MC-18 delivery HEAD; MC-20 base
const CATALOG = 'src/app/marea-catalog';
const PREVIEW = 'preview/landing';
const DS = 'src/app/marea-design-system';
const LANDING = 'src/app/marea-landing';
const EVIDENCE = 'docs/marea/catalog/evidence';

const read = (path) => readFileSync(resolve(root, path), 'utf8');
const readJson = (path) => JSON.parse(read(path));
const exists = (path) => existsSync(resolve(root, path));
const git = (args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
const changedSinceBase = (paths = []) =>
  git(['diff', '--name-only', BASE_COMMIT, '--', ...paths])
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

// ------------------------------------------------------------------ modules
const projection = await import(
  pathToFileURL(resolve(root, `${CATALOG}/data/catalog.generated.ts`)).href
);
const content = await import(pathToFileURL(resolve(root, `${CATALOG}/content/index.ts`)).href);
const identity = await import(
  pathToFileURL(resolve(root, `${CATALOG}/models/catalog-identity.ts`)).href
);
const domain = await import(pathToFileURL(resolve(root, `${CATALOG}/data/catalog-domain.ts`)).href);

const canonical = {
  families: readJson('docs/marea/commerce-data/data/product-families.json').families,
  editions: readJson('docs/marea/commerce-data/data/product-editions.json').editions,
  bundles: readJson('docs/marea/commerce-data/data/bundle-compositions.json').bundles,
  readiness: readJson('docs/marea/commerce-data/data/readiness-dimensions.json').dimensions,
  routes: readJson('docs/marea/information-architecture/data/proposed-routes.json').items,
  gates: readJson('docs/marea/legal-commercial/data/release-evidence-gates.json').gates,
  claims: readJson('docs/marea/legal-commercial/data/claims-policy.json').summary,
  definitions: readJson('docs/marea/products/product-definitions.batch-01.json'),
  definitions02: readJson('docs/marea/products/product-definitions.batch-02.json'),
  definitions03: readJson('docs/marea/products/product-definitions.batch-03.json'),
};

const SCOPE = ['NAV', 'HUB', 'AIS', 'SENSE', 'WATCH', 'WEATHER'];
const familyContents = SCOPE.map((familyId) => content.CATALOG_CONTENT[familyId]);
const allStrings = familyContents.flatMap((entry) => contentStrings(entry));
const englishStrings = familyContents.flatMap((entry) => contentEnglishStrings(entry));
const allCanonicalDefinitions = [
  ...canonical.definitions.products,
  ...canonical.definitions02.products,
  ...canonical.definitions03.products,
];

// ------------------------------------------------------------------ harness
const checks = [];
const add = (id, title, fn) => {
  try {
    const result = fn();
    checks.push({
      id,
      title,
      status: result.status,
      detail: result.detail,
    });
  } catch (error) {
    checks.push({
      id,
      title,
      status: 'FAIL',
      detail: `threw: ${error instanceof Error ? error.message : String(error)}`,
    });
  }
};
const pass = (detail) => ({ status: 'PASS', detail });
const fail = (detail) => ({ status: 'FAIL', detail });

// ------------------------------------------------------------------ 01-09 canonical identity
add('MC20-01', 'the projection exposes exactly the six canonical families in order', () => {
  const ids = projection.CATALOG_FAMILIES.map((entry) => entry.familyId);
  if (JSON.stringify(ids) !== JSON.stringify(SCOPE)) return fail(`ids: ${ids.join(', ')}`);
  const canonicalIds = canonical.families
    .map((entry) => entry.familyId)
    .filter((id) => SCOPE.includes(id));
  if (JSON.stringify(ids) !== JSON.stringify(canonicalIds))
    return fail(`projection ${ids} differs from canonical ${canonicalIds}`);
  return pass('NAV, HUB, AIS, SENSE, WATCH, WEATHER in canonical MC-16 order');
});

add('MC20-02', 'family type/lifecycle/publication/availability match the canonical record', () => {
  for (const record of projection.CATALOG_FAMILIES) {
    const source = canonical.families.find((entry) => entry.familyId === record.familyId);
    if (!source) return fail(`missing canonical family ${record.familyId}`);
    for (const key of [
      'productType',
      'lifecycleState',
      'publicationState',
      'commercialAvailability',
      'routeId',
    ]) {
      if (record[key] !== source[key])
        return fail(`${record.familyId}.${key}: ${record[key]} != ${source[key]}`);
    }
    if (record.commercialAvailability !== 'NOT_FOR_SALE')
      return fail(`${record.familyId} is not NOT_FOR_SALE`);
  }
  return pass('6 families copy product type, lifecycle, publication and availability');
});

add('MC20-03', 'all eleven readiness dimensions equal the canonical values', () => {
  for (const record of projection.CATALOG_FAMILIES) {
    const source = canonical.families.find((entry) => entry.familyId === record.familyId);
    for (const dimension of canonical.readiness) {
      if (record.readiness[dimension.dimension] !== source.readiness[dimension.dimension])
        return fail(
          `${record.familyId}.${dimension.dimension}: ${record.readiness[dimension.dimension]} != ${source.readiness[dimension.dimension]}`,
        );
    }
  }
  if (projection.CATALOG_READINESS_DIMENSIONS.length !== 11)
    return fail('projection does not expose 11 readiness dimensions');
  return pass('6 families × 11 dimensions copied byte-for-byte');
});

add('MC20-04', 'eighteen canonical editions keep their ids, family, type and feature keys', () => {
  if (projection.CATALOG_EDITIONS.length !== 18)
    return fail(`projection editions: ${projection.CATALOG_EDITIONS.length}`);
  for (const edition of projection.CATALOG_EDITIONS) {
    const source = canonical.editions.find((entry) => entry.editionId === edition.editionId);
    if (!source) return fail(`missing canonical edition ${edition.editionId}`);
    for (const key of ['familyId', 'editionType', 'definitionStatus', 'requiresQuotation']) {
      if (edition[key] !== source[key]) return fail(`${edition.editionId}.${key} differs`);
    }
    const sourceFeatures = source.featureDefinitions.map((entry) => entry.featureKey);
    if (JSON.stringify(edition.featureKeys) !== JSON.stringify(sourceFeatures))
      return fail(`${edition.editionId} feature keys differ from canonical`);
  }
  return pass('18 editions across NAV/HUB/AIS/SENSE/WATCH/WEATHER (SENSE carries 8)');
});

add('MC20-05', 'AIS transmission is false in the canonical data and in the catalogue copy', () => {
  if (canonical.definitions.globalRestrictions.aisTransmissionOffered !== false)
    return fail('canonical AIS transmission flag is not false');
  const ais = content.CATALOG_CONTENT.AIS;
  const strings = contentStrings(ais).join('\n');
  for (const required of [
    'SOLO RECEPCIÓN',
    'No es un transpondedor',
    'no transmite',
    'no es un dispositivo DSC',
    'no es un sistema anticolisión',
    'no es un sistema de navegación',
    'RECEIVE-ONLY',
    'It is not a transponder',
    'it does not transmit',
    'it is not a DSC device',
    'it is not a collision-avoidance system',
    'it is not a navigation system',
  ]) {
    if (!strings.includes(required)) return fail(`missing AIS receive-only statement: ${required}`);
  }
  return pass('receive-only framing present in ES and EN hero and limitations');
});

add('MC20-06', 'no edition is merchantable, priced or assigned a merchant SKU', () => {
  for (const edition of projection.CATALOG_EDITIONS) {
    if (edition.merchantable !== false) return fail(`${edition.editionId} merchantable`);
    if (edition.priceApproved !== false) return fail(`${edition.editionId} price approved`);
    if (edition.merchantSkuCode !== null) return fail(`${edition.editionId} has a SKU code`);
  }
  const facts = projection.CATALOG_DOMAIN_FACTS;
  if (
    facts.approvedPrices !== 0 ||
    facts.merchantableEditions !== 0 ||
    facts.merchantSkuCodes !== 0
  )
    return fail('projection facts report a merchantable state');
  return pass('0 approved prices, 0 merchantable editions, 0 merchant SKUs');
});

add('MC20-07', 'every MC-15 proposed family route stays internal and not deployable', () => {
  for (const record of projection.CATALOG_FAMILIES) {
    const source = canonical.routes.find((entry) => entry.routeId === record.routeId);
    if (!source) return fail(`missing canonical route ${record.routeId}`);
    if (source.status !== 'PROPOSED_INTERNAL_NOT_DEPLOYABLE')
      return fail(`${record.routeId} status ${source.status}`);
    if (source.publicationAuthorized !== false || source.indexationAuthorized !== false)
      return fail(`${record.routeId} authorises publication or indexation`);
    if (source.implementationReady !== false)
      return fail(`${record.routeId} is implementation-ready`);
    if (record.proposedRoute.publicationAuthorized !== false)
      return fail(`${record.routeId} projection authorises publication`);
    if (record.proposedRoute.collisionStatus !== 'NO_COLLISION')
      return fail(`${record.routeId} collision status changed`);
  }
  return pass('6 routes: proposed internal, not deployable, no collision, no publication');
});

add('MC20-08', 'NAV/WEATHER are software, HUB/AIS/SENSE hardware, WATCH hardware+service', () => {
  const byId = (id) => projection.CATALOG_FAMILIES.find((entry) => entry.familyId === id);
  for (const id of ['NAV', 'WEATHER']) {
    if (byId(id).productType !== 'SOFTWARE') return fail(`${id} is not SOFTWARE`);
    if (byId(id).hardwareStatus !== 'NOT_APPLICABLE_SOFTWARE_PRODUCT')
      return fail(`${id} hardware status changed`);
  }
  for (const id of ['HUB', 'AIS', 'SENSE']) {
    if (byId(id).productType !== 'HARDWARE') return fail(`${id} is not HARDWARE`);
    if (byId(id).hardwareStatus !== 'NOT_SELECTED') return fail(`${id} hardware is selected`);
  }
  if (byId('WATCH').productType !== 'HARDWARE_SERVICE')
    return fail('WATCH is not HARDWARE_SERVICE');
  if (byId('WATCH').hardwareStatus !== 'NOT_SELECTED') return fail('WATCH hardware is selected');
  if (byId('AIS').readiness.availability !== 'NOT_FOR_SALE')
    return fail('AIS availability changed');
  return pass(
    'NAV/WEATHER software; HUB/AIS/SENSE hardware; WATCH hardware+service; all NOT_FOR_SALE',
  );
});

add('MC20-09', 'bundle inclusions match the canonical bundle composition', () => {
  for (const record of projection.CATALOG_FAMILIES) {
    const expected = [];
    for (const bundle of canonical.bundles) {
      const lines = [...(bundle.components ?? []), ...(bundle.optionalComponents ?? [])];
      const match = lines.find((line) => line.familyId === record.familyId);
      if (match)
        expected.push({
          bundleId: bundle.bundleId,
          editionId: match.editionId,
          inclusion: match.inclusion,
        });
    }
    const actual = record.bundleInclusions.map((row) => ({
      bundleId: row.bundleId,
      editionId: row.editionId,
      inclusion: row.inclusion,
    }));
    if (JSON.stringify(actual) !== JSON.stringify(expected))
      return fail(`${record.familyId} bundle inclusions differ from canonical`);
  }
  return pass('NAV 4 included, HUB 4 included + 2 optional, AIS 1 included + 1 optional');
});

// ------------------------------------------------------------------ 10-18 content integrity
add('MC20-10', 'every family renders the frozen ten sections', () => {
  for (const familyId of SCOPE) {
    const entry = content.CATALOG_CONTENT[familyId];
    const keys = Object.keys(entry.sections).sort();
    const expected = [...content.CATALOG_SECTION_IDS].sort();
    if (JSON.stringify(keys) !== JSON.stringify(expected))
      return fail(`${familyId} sections: ${keys.join(', ')}`);
  }
  return pass('6 families × 10 frozen sections');
});

add('MC20-11', 'content ids are unique across the whole catalogue', () => {
  const ids = familyContents.flatMap((entry) =>
    contentBlocks(entry).map((block) => block.contentId),
  );
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length > 0)
    return fail(`duplicate content ids: ${[...new Set(duplicates)].join(', ')}`);
  if (ids.length < 90) return fail(`only ${ids.length} content blocks`);
  return pass(`${ids.length} unique content blocks`);
});

add('MC20-12', 'every content block declares an evidence class and existing sources', () => {
  const allowed = [
    'VERIFIED_REPO',
    'VERIFIED_EXTERNAL',
    'ASSUMPTION',
    'HYPOTHESIS',
    'OPEN',
    'BLOCKED',
  ];
  const missing = [];
  const realMissing = [];
  for (const familyId of SCOPE) {
    for (const block of contentBlocks(content.CATALOG_CONTENT[familyId])) {
      if (!allowed.includes(block.evidenceClass))
        missing.push(`${block.contentId}:${block.evidenceClass}`);
      if (!Array.isArray(block.sourceRefs) || block.sourceRefs.length === 0)
        missing.push(`${block.contentId}:no-source`);
      for (const ref of block.sourceRefs ?? []) {
        const path = sourceRefPath(ref);
        if (!path || !exists(path)) realMissing.push(`${block.contentId}:${ref}`);
      }
    }
  }
  for (const document of familyContents.flatMap((entry) => entry.documentation)) {
    const path = sourceRefPath(document.sourceRef);
    if (!path || !exists(path)) realMissing.push(`${document.documentId}:${document.sourceRef}`);
  }
  if (missing.length > 0)
    return fail(`invalid evidence metadata: ${missing.slice(0, 5).join(', ')}`);
  if (realMissing.length > 0)
    return fail(`missing source files: ${realMissing.slice(0, 5).join(', ')}`);
  return pass('all blocks carry an evidence class and only existing source files');
});

add('MC20-13', 'the committed projection is up to date with the canonical datasets', () => {
  execFileSync('node', ['scripts/build-mc20-catalog-data.mjs', '--check'], {
    cwd: root,
    stdio: 'pipe',
  });
  return pass('scripts/build-mc20-catalog-data.mjs --check exits 0');
});

add('MC20-14', 'the generated projection carries no price, stock or SKU field', () => {
  const source = read(`${CATALOG}/data/catalog.generated.ts`);
  for (const forbidden of ['priceAmount', 'stockQuantity', 'merchantSkuCode: "', 'inventory']) {
    if (forbidden === 'merchantSkuCode: "' && !/merchantSkuCode: "/.test(source)) continue;
    if (forbidden !== 'merchantSkuCode: "' && source.includes(forbidden))
      return fail(`generated projection contains ${forbidden}`);
  }
  if (!/merchantSkuCode: null/.test(source)) return fail('merchantSkuCode is not null');
  return pass('no amount, quantity or SKU value in the projection');
});

add('MC20-15', 'the six families of copy avoid prohibited commercial claims', () => {
  const problems = [];
  for (const text of allStrings) {
    for (const id of catalogClaimProblems(text)) {
      if (id === 'not-a-string') continue;
      problems.push(`${id}: ${text.slice(0, 70)}`);
    }
  }
  if (problems.length > 0)
    return fail(`${problems.length} prohibited claim(s): ${problems.slice(0, 4).join(' | ')}`);
  return pass(`${allStrings.length} bilingual strings scanned, 0 prohibited claims`);
});

add('MC20-16', 'every string has a non-empty, distinct ES and EN value', () => {
  let count = 0;
  for (const familyId of SCOPE) {
    const strings = [];
    const collect = (value) => {
      if (value && typeof value === 'object' && 'es' in value && 'en' in value) strings.push(value);
    };
    const entry = content.CATALOG_CONTENT[familyId];
    collect(entry.hero.lead);
    collect(entry.editionNote);
    for (const capability of entry.capabilities) collect(capability.description);
    for (const limitation of entry.limitations) collect(limitation.description);
    for (const string of strings) {
      count += 1;
      if (!string.es.trim() || !string.en.trim()) return fail(`${familyId}: empty locale value`);
      if (string.es.trim() === string.en.trim())
        return fail(`${familyId}: ES equals EN: ${string.es.slice(0, 40)}`);
    }
  }
  return pass(`${count} sampled bilingual values are non-empty and locale-specific`);
});

add('MC20-17', 'ES and EN expose the same inventory and every pair is genuinely bilingual', () => {
  for (const familyId of SCOPE) {
    const inventory = contentInventory(content.CATALOG_CONTENT[familyId]);
    if (inventory.sections.length !== 10)
      return fail(`${familyId}: section inventory is incomplete`);
    const problems = bilingualTextProblems(content.CATALOG_CONTENT[familyId]);
    if (problems.length > 0) return fail(`${familyId}: ${problems.slice(0, 3).join('; ')}`);
  }
  return pass(
    'structural inventory plus every localized pair: non-empty, translated, limitations negated',
  );
});

add('MC20-18', 'the English copy shows no untranslated Spanish clustering', () => {
  const problems = englishStrings.filter((text) => englishClusterProblem(text));
  if (problems.length > 0)
    return fail(`${problems.length} suspicious EN strings: ${problems[0].slice(0, 70)}`);
  return pass('0 English strings with Spanish function-word clustering');
});

// ------------------------------------------------------------------ 19-27 implementation and reuse
add('MC20-19', 'the page composes all ten sections in the frozen order', () => {
  const source = read(`${CATALOG}/catalog-page.ts`);
  const order = [
    'marea-catalog-hero',
    'marea-catalog-overview',
    'marea-catalog-capabilities',
    'marea-catalog-specifications',
    'marea-catalog-composition',
    'marea-catalog-editions',
    'marea-catalog-limitations',
    'marea-catalog-ecosystem',
    'marea-catalog-readiness',
    'marea-catalog-documentation',
    'marea-catalog-closing',
  ];
  let cursor = -1;
  for (const tag of order) {
    const index = source.indexOf(`<${tag}`);
    if (index < 0) return fail(`missing section ${tag}`);
    if (index < cursor) return fail(`section ${tag} is out of order`);
    cursor = index;
  }
  return pass('10 sections plus the closing section rendered in order');
});

add('MC20-20', 'section components contain no per-family presentation branch', () => {
  for (const file of walk(root, `${CATALOG}/sections`).filter((path) => path.endsWith('.ts'))) {
    const source = read(file);
    if (/===\s*['"](?:NAV|HUB|AIS|SENSE|WATCH|WEATHER)['"]/.test(source))
      return fail(`family branch in ${file}`);
  }
  return pass('sections are driven by the canonical record and the content contract');
});

add('MC20-21', 'the catalogue reuses MC-17 components and does not fork the design system', () => {
  const changed = changedSinceBase([DS]);
  if (changed.length > 0) return fail(`design system modified: ${changed.slice(0, 5).join(', ')}`);
  const sectionSources = walk(root, `${CATALOG}/sections`).map((path) => read(path));
  const reused = [
    'marea-landing-section',
    'marea-spec-table',
    'marea-definition-list',
    'marea-edition-card',
    'marea-feature-comparison',
    'marea-readiness-panel',
    'marea-commercial-cta',
    'marea-documentation-panel',
    'marea-compatibility-notice',
    'marea-family-card',
  ];
  const surface = sectionSources.join('\n');
  for (const selector of reused) {
    if (!surface.includes(selector)) return fail(`MC-17 component not reused: ${selector}`);
  }
  const newComponents = walk(root, `${CATALOG}/components`);
  if (newComponents.length > 1)
    return fail(`unexpected catalogue component count: ${newComponents.length}`);
  return pass(
    '10 verified MC-17 components reused; design system byte-identical to the MC-18 base',
  );
});

add('MC20-22', 'the MC-18 landing module is unchanged', () => {
  const changed = changedSinceBase([LANDING]);
  if (changed.length > 0) return fail(`landing modified: ${changed.slice(0, 5).join(', ')}`);
  return pass('src/app/marea-landing is unchanged from the MC-18 base');
});

add('MC20-23', 'the preview route table defines twelve family/locale routes', () => {
  if (identity.CATALOG_PREVIEW_ROUTES.length !== 12)
    return fail(`routes: ${identity.CATALOG_PREVIEW_ROUTES.length}`);
  for (const route of identity.CATALOG_PREVIEW_ROUTES) {
    if (route.renderMode !== 'Server') return fail(`${route.path} is not server-rendered`);
    if (
      !route.path.startsWith('internal/catalog/') &&
      !route.path.startsWith('en/internal/catalog/')
    )
      return fail(`${route.path} is outside the internal namespace`);
    if (normaliseRoutePath(route.path).includes('marea/'))
      return fail(`${route.path} uses a public path`);
  }
  return pass('6 families × 2 locales, all Server-rendered, all under internal/catalog');
});

add('MC20-24', 'the preview host emits no public metadata', () => {
  const source = read(`${PREVIEW}/catalog-preview.ts`);
  for (const forbidden of [
    'rel="canonical"',
    'hreflang',
    'property="og:',
    'name="twitter:',
    'ld+json',
  ]) {
    if (source.includes(forbidden)) return fail(`preview host contains ${forbidden}`);
  }
  if (!source.includes('noindex, nofollow, noarchive')) return fail('preview host lacks noindex');
  if (!source.includes("name: 'marea-publication', content: 'NOT_AUTHORIZED'"))
    return fail('preview host lacks the publication marker');
  return pass('noindex + NOT_AUTHORIZED only; no canonical, hreflang, OG, Twitter or JSON-LD');
});

add('MC20-25', 'the preview server stays loopback-only with a noindex header', () => {
  const source = read(`${PREVIEW}/server.ts`);
  for (const required of [
    "const host = '127.0.0.1'",
    'ALLOWED_HOSTS',
    'noindex, nofollow, noarchive',
    "form-action 'none'",
    'MAREA_LANDING_PREVIEW_PORT',
  ]) {
    if (!source.includes(required)) return fail(`preview server lacks ${required}`);
  }
  if (/0\.0\.0\.0/.test(source)) return fail('preview server binds to all interfaces');
  return pass('127.0.0.1 bind, host allowlist, noindex, CSP form-action none');
});

add('MC20-26', 'the catalogue defines no form, input, storage or network call', () => {
  const files = walk(root, CATALOG).filter((path) => path.endsWith('.ts'));
  for (const file of files) {
    const source = read(file);
    for (const forbidden of [
      '<form',
      'HttpClient',
      'fetch(',
      'localStorage',
      'sessionStorage',
      'document.cookie',
      'XMLHttpRequest',
    ]) {
      if (source.includes(forbidden)) return fail(`${file} contains ${forbidden}`);
    }
  }
  return pass(`${files.length} catalogue modules: 0 form, 0 storage, 0 network call`);
});

add('MC20-27', 'no purchase path can be rendered', () => {
  const source = read(`${CATALOG}/data/catalog-domain.ts`);
  if (
    !source.includes('purchaseActionAllowed: false') &&
    !source.includes('deriveCommercialPresentation')
  )
    return fail('catalogue does not use the fail-closed adapter');
  for (const forbidden of [
    'buyCtaAllowed: true',
    'cartAllowed: true',
    'priceVisible: true',
    'releaseGateOpen: true',
  ]) {
    if (source.includes(forbidden)) return fail(`adapter input opens ${forbidden}`);
  }
  return pass('MC-17 fail-closed adapter; release gate closed; no purchase, cart or price');
});

// ------------------------------------------------------------------ 28-36 isolation and governance
add('MC20-28', 'the production application and design system are untouched', () => {
  const protectedPaths = [
    'src/app/app.routes.ts',
    'src/app/app.routes.server.ts',
    'src/app/core',
    'src/server.ts',
    'src/main.ts',
    'src/main.server.ts',
    'public',
    'deploy',
    'Dockerfile',
  ];
  const changed = changedSinceBase(protectedPaths);
  if (changed.length > 0) return fail(`protected path changed: ${changed.slice(0, 5).join(', ')}`);
  return pass('public routes, SSR entry, public assets and deployment config unchanged');
});

add('MC20-29', 'no production module reaches the catalogue or the preview', () => {
  const reach = findForbiddenReach({
    root,
    entryFiles: [
      'src/main.ts',
      'src/main.server.ts',
      'src/app/app.routes.ts',
      'src/app/app.config.ts',
      'src/app/app.config.server.ts',
      'src/server.ts',
    ],
    forbiddenRoots: [CATALOG, PREVIEW, LANDING],
  });
  if (reach.offenders.length > 0) return fail(`reachable: ${reach.offenders[0]}`);
  if (reach.scanned < 50) return fail(`import graph too small (${reach.scanned})`);
  return pass(
    `${reach.scanned} production modules scanned; 0 reach the catalogue, preview or landing`,
  );
});

add('MC20-30', 'no catalogue identifier appears in a production bundle if one exists', () => {
  const browser = 'dist/embarcarte/browser';
  if (!exists(browser))
    return pass('no production build present; import-graph check MC20-29 applies');
  const files = walk(root, browser);
  const offenders = [];
  for (const file of files) {
    if (!file.endsWith('.js')) continue;
    const source = read(file);
    for (const marker of ['internal/catalog', 'data-marea-catalog', 'marea-catalog-page']) {
      if (source.includes(marker)) offenders.push(`${file}:${marker}`);
    }
  }
  if (offenders.length > 0)
    return fail(`${offenders.length} bundle occurrence(s): ${offenders[0]}`);
  return pass(`${files.length} production bundle files carry 0 catalogue identifiers`);
});

add('MC20-31', 'no dependency or lockfile change is introduced', () => {
  const basePackage = JSON.parse(git(['show', `${BASE_COMMIT}:package.json`]));
  const current = readJson('package.json');
  for (const key of ['dependencies', 'devDependencies']) {
    if (JSON.stringify(basePackage[key]) !== JSON.stringify(current[key]))
      return fail(`${key} changed`);
  }
  if (changedSinceBase(['package-lock.json']).length > 0) return fail('package-lock.json changed');
  return pass('dependencies and lockfile unchanged');
});

add('MC20-32', 'every changed path is inside the MC-20 write scope', () => {
  const lines = git(['status', '--porcelain=v1'])
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const allowedPrefixes = [
    `${CATALOG}/`,
    `${PREVIEW}/`,
    'scripts/build-mc20-catalog-data.mjs',
    'scripts/check-mc20-catalog.mjs',
    'scripts/check-mc20-catalog.test.mjs',
    'scripts/mc20-catalog-guards.mjs',
    'e2e/catalog/',
    'playwright.catalog.config.ts',
    'docs/marea/catalog/',
  ];
  const allowedExact = [
    'package.json',
    'docs/marea/execution/DECISION-LOG.md',
    'docs/marea/execution/MASTER-PROMPT-REGISTRY.md',
  ];
  const outOfScope = scopeProblems(lines, allowedPrefixes, allowedExact);
  if (outOfScope.length > 0) return fail(`out of scope: ${outOfScope.slice(0, 8).join(', ')}`);
  return pass(`${lines.length} working-tree entries inside the MC-20 scope`);
});

add('MC20-33', 'the generated projection is deterministic', () => {
  // `--check` regenerates in memory and compares bytes; it never writes. This is
  // the determinism proof and does not mutate the reviewed file.
  execFileSync('node', ['scripts/build-mc20-catalog-data.mjs', '--check'], {
    cwd: root,
    stdio: 'pipe',
  });
  return pass('regeneration matches the committed bytes exactly (--check exits 0)');
});

add('MC20-34', 'catalogue pages expose no link to a proposed public route', () => {
  const files = walk(root, CATALOG).filter((path) => path.endsWith('.ts'));
  for (const file of files) {
    const source = read(file);
    if (/href=["'`]\/marea\/(?:nav|hub|ais|sense|watch|weather)/.test(source))
      return fail(`${file} links a proposed public route`);
    if (/href=["'`]\/en\/marea\/(?:nav|hub|ais|sense|watch|weather)/.test(source))
      return fail(`${file} links a proposed public route`);
  }
  const routes = read(`${PREVIEW}/app.routes.ts`);
  if (!routes.includes('CATALOG_PREVIEW_ROUTES'))
    return fail('preview routes are not derived from the frozen identity table');
  return pass('only internal/catalog paths are referenced');
});

add('MC20-35', 'the public sitemap and robots files are unchanged', () => {
  const changed = changedSinceBase(['public']);
  if (changed.length > 0) return fail(`public/ changed: ${changed.slice(0, 5).join(', ')}`);
  const candidates = walk(root, 'public').filter((file) => /sitemap/i.test(file));
  for (const file of candidates) {
    if (/internal\/catalog|marea/i.test(read(file))) return fail(`sitemap entry in ${file}`);
  }
  return pass(`${candidates.length} public sitemap file(s) unchanged, no catalogue entry`);
});

add('MC20-36', 'the delivery record preserves the governance gates', () => {
  const record = 'docs/marea/catalog/MC20-DELIVERY-RECORD.md';
  if (!exists(record)) return fail('delivery record missing');
  const source = read(record);
  for (const gate of [
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
  ]) {
    if (!source.includes(gate)) return fail(`delivery record lacks ${gate}`);
  }
  return pass('10 governance gates recorded verbatim');
});

add('MC20-37', 'the acceptance matrix uses only real statuses and evidence-bound PASS rows', () => {
  const matrix = 'docs/marea/catalog/MC20-ACCEPTANCE-MATRIX.md';
  if (!exists(matrix)) return fail('acceptance matrix missing');
  const source = read(matrix);
  const rows = source.split('\n').filter((line) => /^\|\s*AC-\d\d\s*\|/.test(line));
  if (rows.length !== 15) return fail(`expected 15 acceptance rows, found ${rows.length}`);
  const allowed = new Set(['PASS', 'PARTIAL', 'PENDING']);
  for (const row of rows) {
    const cells = row.split('|').map((cell) => cell.trim());
    const id = cells[1];
    const status = cells[3];
    if (!allowed.has(status)) return fail(`${id}: invalid status "${status}"`);
    if (status === 'PASS' && cells[4].length < 8) return fail(`${id}: PASS without evidence`);
  }
  const ac14 = rows.find((row) => row.includes('AC-14')) ?? '';
  const ac15 = rows.find((row) => row.includes('AC-15')) ?? '';
  if (ac14.includes('| PASS |')) {
    const audit = 'docs/marea/catalog/MC20-INDEPENDENT-AUDIT.md';
    if (!exists(audit)) return fail('AC-14 is PASS but the audit file is missing');
    const auditSource = read(audit);
    if (!/ACCEPT_INTERNAL_SCOPE/.test(auditSource))
      return fail('AC-14 is PASS but the audit verdict is not ACCEPT_INTERNAL_SCOPE');
    if (!/OPEN_BLOCKING_OR_MAJOR = 0/.test(auditSource))
      return fail('AC-14 is PASS but the audit does not record zero open BLOCKING/MAJOR');
  }
  if (ac15.includes('| PASS |')) {
    const delivery = read('docs/marea/catalog/MC20-DELIVERY-RECORD.md');
    if (!/https:\/\/github\.com\/manuelxose\/embarcarte\/pull\/\d+/.test(delivery))
      return fail('AC-15 is PASS but the delivery record has no draft PR URL');
  }
  return pass('15 rows with PASS/PARTIAL/PENDING only; PASS rows carry evidence conditions');
});

add('MC20-38', 'MC-21 is not started and no later milestone is activated', () => {
  const registry = read('docs/marea/execution/MASTER-PROMPT-REGISTRY.md');
  const row21 = registry.split('\n').find((line) => /^\|\s*21\s*\|/.test(line)) ?? '';
  if (!row21.includes('PLANNED')) return fail('MC-21 is not PLANNED');
  const record = 'docs/marea/catalog/MC20-DELIVERY-RECORD.md';
  if (
    exists(record) &&
    !/MC-21[^\n]*NOT[ _]STARTED/i.test(read(record)) &&
    !/NOT_STARTED/.test(read(record))
  )
    return fail('delivery record does not state MC-21 not started');
  return pass('MC-21 PLANNED; no automatic start');
});

add('MC20-39', 'the roadmap row for MC-20 is updated and not marked PASS', () => {
  const registry = read('docs/marea/execution/MASTER-PROMPT-REGISTRY.md');
  const row = registry.split('\n').find((line) => /^\|\s*20\s*\|/.test(line)) ?? '';
  if (!row) return fail('MC-20 row not found');
  if (!/PARTIAL|PASS_INTERNAL|IN PROGRESS/.test(row)) return fail('MC-20 row was not updated');
  if (/\|\s*PASS\s*\|/.test(row)) return fail('MC-20 row claims a global PASS');
  return pass('MC-20 row records internal evidence and keeps the verdict partial');
});

add('MC20-40', 'the test report and independent audit are evidence-bound', () => {
  for (const file of [
    'docs/marea/catalog/MC20-TEST-REPORT.md',
    'docs/marea/catalog/MC20-INDEPENDENT-AUDIT.md',
    'docs/marea/catalog/MC20-EXECUTIVE-REPORT-ES.md',
    'docs/marea/catalog/MC20-MC21-HANDOFF.md',
  ]) {
    if (!exists(file)) return fail(`missing ${file}`);
    const source = read(file);
    if (source.length < 800) return fail(`${file} is too short to be evidence`);
  }
  const audit = read('docs/marea/catalog/MC20-INDEPENDENT-AUDIT.md');
  if (!/BLOCKING|MAJOR|MINOR|INFORMATIONAL/.test(audit))
    return fail('audit does not classify findings');
  return pass('test report, audit, ES executive report and MC-21 handoff present');
});

// ------------------------------------------------------------------ MC21-01..10 six-family scope
const GOVERNANCE_GATES = [
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
];

add('MC21-01', 'six families and eighteen editions in canonical MC-16 order', () => {
  const ids = projection.CATALOG_SCOPE_FAMILY_IDS;
  if (JSON.stringify(ids) !== JSON.stringify(SCOPE)) return fail(`scope ids: ${ids.join(', ')}`);
  if (projection.CATALOG_FAMILIES.length !== 6) return fail('families != 6');
  if (projection.CATALOG_EDITIONS.length !== 18) return fail('editions != 18');
  if (projection.CATALOG_GOVERNANCE_GATES.length !== 10) return fail('governance gates != 10');
  const identityIds = Object.keys(identity.CATALOG_IDENTITIES);
  if (JSON.stringify(identityIds) !== JSON.stringify(SCOPE))
    return fail(`identity ids: ${identityIds.join(', ')}`);
  return pass('NAV, HUB, AIS, SENSE, WATCH, WEATHER · 18 editions · 10 governance gates');
});

add('MC21-02', 'SENSE/WATCH/WEATHER content has ES/EN structural parity', () => {
  for (const familyId of ['SENSE', 'WATCH', 'WEATHER']) {
    const entry = content.CATALOG_CONTENT[familyId];
    if (!entry) return fail(`missing ${familyId} content`);
    const problems = bilingualTextProblems(entry);
    if (problems.length > 0) return fail(`${familyId}: ${problems.slice(0, 3).join('; ')}`);
    if (contentInventory(entry).sections.length !== 10)
      return fail(`${familyId}: section inventory incomplete`);
    const contentEditionIds = entry.editions.map((edition) => edition.editionId).sort();
    const projectionEditionIds = projection.CATALOG_EDITIONS.filter(
      (edition) => edition.familyId === familyId,
    )
      .map((edition) => edition.editionId)
      .sort();
    if (JSON.stringify(contentEditionIds) !== JSON.stringify(projectionEditionIds))
      return fail(`${familyId}: content editions differ from projection`);
  }
  return pass('three new families: 10 sections, editions match projection, bilingual parity');
});

add('MC21-03', 'every new-family block carries an evidence class and a real source', () => {
  const allowed = [
    'VERIFIED_REPO',
    'VERIFIED_EXTERNAL',
    'ASSUMPTION',
    'HYPOTHESIS',
    'OPEN',
    'BLOCKED',
  ];
  for (const familyId of ['SENSE', 'WATCH', 'WEATHER']) {
    for (const block of contentBlocks(content.CATALOG_CONTENT[familyId])) {
      if (!allowed.includes(block.evidenceClass))
        return fail(`${block.contentId}:${block.evidenceClass}`);
      if (!Array.isArray(block.sourceRefs) || block.sourceRefs.length === 0)
        return fail(`${block.contentId}:no-source`);
      for (const ref of block.sourceRefs) {
        const path = sourceRefPath(ref);
        if (!path || !exists(path)) return fail(`${block.contentId}:${ref}`);
      }
    }
  }
  return pass('every SENSE/WATCH/WEATHER block cites an evidence class and an existing source');
});

add('MC21-04', 'WEATHER names no data provider and states provenance not contracted', () => {
  const weather = contentStrings(content.CATALOG_CONTENT.WEATHER).join('\n');
  for (const required of [
    'fuente externa no contratada',
    'no se nombra ningún proveedor',
    'external uncontracted source',
    'no provider is named',
    'WEATHER_PROVIDER_RIGHTS = NOT_GRANTED',
  ]) {
    if (!weather.includes(required)) return fail(`missing WEATHER provenance notice: ${required}`);
  }
  const providerNames = providerNameProblems(allStrings.join('\n'));
  if (providerNames.length > 0) return fail(`named provider appears: ${providerNames.join(', ')}`);
  if (
    /(?:previsión|forecast).{0,40}(?:exactitud garantizada|guaranteed accuracy|% de acierto|hit rate)/.test(
      weather,
    )
  )
    return fail('forecast-accuracy claim detected');
  return pass('no named provider, explicit provenance notice, no forecast-accuracy claim');
});

add(
  'MC21-05',
  'availability stays DEFINED / INTERNAL_ONLY / NOT_FOR_SALE with no commerce language',
  () => {
    for (const record of projection.CATALOG_FAMILIES) {
      if (record.lifecycleState !== 'DEFINED') return fail(`${record.familyId} lifecycle`);
      if (record.publicationState !== 'INTERNAL_ONLY')
        return fail(`${record.familyId} publication`);
      if (record.commercialAvailability !== 'NOT_FOR_SALE')
        return fail(`${record.familyId} availability`);
    }
    for (const text of allStrings) {
      for (const id of catalogClaimProblems(text)) {
        if (id === 'not-a-string') continue;
        return fail(`commerce claim ${id}: ${text.slice(0, 70)}`);
      }
    }
    return pass('6 families DEFINED/INTERNAL_ONLY/NOT_FOR_SALE; 0 availability or commerce claims');
  },
);

add('MC21-06', 'SENSE limitations render NOT_MEASURED, NOT_VERIFIED, NOT_IMPLEMENTED', () => {
  const sense = contentStrings(content.CATALOG_CONTENT.SENSE).join('\n').toLowerCase();
  for (const required of [
    'not_measured',
    'exactitud de medición no está medida',
    'measurement accuracy has not been measured',
    'not_verified',
    'estanqueidad',
    'ingress',
    'not_implemented',
    'nmea 2000 no está implementado',
    'nmea 2000 is not implemented',
  ]) {
    if (!sense.includes(required)) return fail(`missing SENSE limitation: ${required}`);
  }
  return pass('SENSE accuracy NOT_MEASURED, ingress NOT_VERIFIED, NMEA 2000 NOT_IMPLEMENTED');
});

add('MC21-07', 'WATCH limitations render NOT_VERIFIED, NOT_FOUND and privacy BLOCKED', () => {
  const watch = contentStrings(content.CATALOG_CONTENT.WATCH).join('\n').toLowerCase();
  for (const required of [
    'not_verified',
    'not_found',
    'gate-privacy-dpa-dpia = blocked',
    'no garantiza la entrega',
    'does not guarantee alert delivery',
    'no es un servicio de socorro',
    'not a certified distress service',
    'no existe ninguna ruta de mando',
    'no steering, rudder, heading or engine command path',
  ]) {
    if (!watch.includes(required)) return fail(`missing WATCH limitation: ${required}`);
  }
  return pass(
    'WATCH ingestion NOT_VERIFIED, connectivity/notification/identity NOT_FOUND, privacy BLOCKED',
  );
});

add('MC21-08', 'the ten governance gates are preserved verbatim', () => {
  const shared = read(`${CATALOG}/content/shared.ts`);
  const projectionJson = read('docs/marea/catalog/data/catalog-projection.json');
  const validator = read('scripts/check-mc20-catalog.mjs');
  for (const gate of GOVERNANCE_GATES) {
    if (!shared.includes(gate)) return fail(`shared.ts lacks ${gate}`);
    if (!projectionJson.includes(gate)) return fail(`projection lacks ${gate}`);
    if (!validator.includes(gate)) return fail(`validator lacks ${gate}`);
  }
  return pass('10 gates verbatim in content, projection and validator');
});

add('MC21-09', 'production isolation: no production path reaches the catalogue', () => {
  const reach = findForbiddenReach({
    root,
    entryFiles: [
      'src/main.ts',
      'src/main.server.ts',
      'src/app/app.routes.ts',
      'src/app/app.config.ts',
      'src/app/app.config.server.ts',
      'src/server.ts',
    ],
    forbiddenRoots: [CATALOG, PREVIEW, LANDING],
  });
  if (reach.offenders.length > 0) return fail(`reachable: ${reach.offenders[0]}`);
  if (changedSinceBase(['public']).length > 0) return fail('public/ changed');
  const routes = read('src/app/app.routes.ts');
  if (/internal\/catalog|marea-catalog/.test(routes))
    return fail('production routes reference the catalogue');
  return pass(`${reach.scanned} production modules scanned; public/ and app.routes unchanged`);
});

add('MC21-10', 'all twelve preview routes are loopback-only and Server-rendered', () => {
  if (identity.CATALOG_PREVIEW_ROUTES.length !== 12) return fail('routes != 12');
  for (const route of identity.CATALOG_PREVIEW_ROUTES) {
    if (route.renderMode !== 'Server') return fail(`${route.path} not Server`);
    if (
      !route.path.startsWith('internal/catalog/') &&
      !route.path.startsWith('en/internal/catalog/')
    )
      return fail(`${route.path} outside internal namespace`);
    if (route.path.includes('marea/')) return fail(`${route.path} uses public path`);
  }
  const server = read(`${PREVIEW}/server.ts`);
  if (!server.includes("const host = '127.0.0.1'")) return fail('preview server not loopback');
  if (!server.includes('noindex, nofollow, noarchive')) return fail('noindex header missing');
  return pass('12 loopback Server routes; preview server bound to 127.0.0.1');
});

// ------------------------------------------------------------------ report
const failed = checks.filter((check) => check.status === 'FAIL');
const status = failed.length === 0 ? 'PASS' : 'FAIL';
const head = (() => {
  try {
    return git(['rev-parse', 'HEAD']);
  } catch {
    return null;
  }
})();

const evidencePath = `${EVIDENCE}/validator-run.json`;
mkdirSync(resolve(root, EVIDENCE), { recursive: true });
writeFileSync(
  resolve(root, evidencePath),
  `${JSON.stringify(
    {
      contractId: 'MC20-CATALOG-VALIDATOR-RUN',
      contractVersion: '1.0.0',
      milestone: 'MC-20',
      owner: 'MC-20 implementation team',
      baseCommit: BASE_COMMIT,
      publicationStatus: 'NOT_AUTHORIZED',
      status,
      total: checks.length,
      passed: checks.length - failed.length,
      failed: failed.length,
      runAt: new Date().toISOString(),
      head,
      checks,
    },
    null,
    2,
  )}\n`,
);

for (const check of checks) {
  console.log(`${check.status === 'PASS' ? 'PASS' : 'FAIL'} ${check.id} — ${check.title}`);
  console.log(`     ${check.detail}`);
}
console.log(
  `\nMC-20 catalogue validator: ${checks.length - failed.length}/${checks.length} PASS (${status})`,
);
console.log(`evidence: ${evidencePath}`);
if (failed.length > 0) process.exit(1);
