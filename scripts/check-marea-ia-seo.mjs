#!/usr/bin/env node
/**
 * Deterministic validator for the MC-15 internal bilingual IA/SEO planning package.
 *
 * It validates the machine-readable datasets only. It does not prove Google
 * indexation, production behaviour or that a future route was implemented.
 * Run: node scripts/check-marea-ia-seo.mjs [--root <path>]
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const DATA_DIR = 'docs/marea/information-architecture/data';
const SOURCE_COMMIT = 'e0be1e457456a401a529e1912770e07ed9a863e4';

export const DATASETS = [
  'manifest',
  'current-routes',
  'current-urls',
  'url-evidence',
  'search-console-evidence',
  'proposed-ia',
  'proposed-routes',
  'slug-governance',
  'redirect-map',
  'canonical-hreflang',
  'indexation-policy',
  'structured-data-policy',
  'bilingual-metadata',
  'internal-link-graph',
  'publication-gates',
  'website-remediation',
  'migration-phases',
  'risk-register',
  'mc16-handoff-inputs',
  'review-findings',
];

export const CURRENT_ROUTES = {
  home: { es: '', en: 'en' },
  technology: { es: 'tecnologia', en: 'en/technology' },
  technologyDetail: { es: 'tecnologia/:slug', en: 'en/technology/:slug' },
  experiences: { es: 'experiencias', en: 'en/experiences' },
  delivery: { es: 'traslados', en: 'en/delivery' },
  services: { es: 'servicios', en: 'en/services' },
  about: { es: 'sobre-nosotros', en: 'en/about' },
  contact: { es: 'contacto', en: 'en/contact' },
  guides: { es: 'guias', en: 'en/guides' },
  guideDetail: { es: 'guias/:slug', en: 'en/guides/:slug' },
  shop: { es: 'tienda', en: 'en/shop' },
  shopDetail: { es: 'tienda/:slug', en: 'en/shop/:slug' },
  shopSample: { es: 'tienda/muestra/:slug', en: 'en/shop/sample/:slug' },
  cart: { es: 'carrito', en: 'en/cart' },
  login: { es: 'acceso', en: 'en/login' },
  account: { es: 'cuenta', en: 'en/account' },
  orderDetail: { es: 'cuenta/pedidos/:id', en: 'en/account/orders/:id' },
  legalNotice: { es: 'aviso-legal', en: 'en/legal-notice' },
  privacy: { es: 'privacidad', en: 'en/privacy' },
  cookies: { es: 'cookies', en: 'en/cookies' },
  termsOfSale: { es: 'condiciones-de-venta', en: 'en/terms-of-sale' },
};

export const CURRENT_ROUTE_IDS = Object.keys(CURRENT_ROUTES);
export const PRIVATE_ROUTE_IDS = ['cart', 'login', 'account', 'orderDetail'];
export const SAMPLE_ROUTE_ID = 'shopSample';
export const ADMIN_ROUTE_IDS = [
  'admin',
  'adminOrders',
  'adminOrderDetail',
  'adminProducts',
  'adminProductEdit',
  'adminCustomers',
  'adminMessages',
];
export const LEGACY_REDIRECTS = [
  { redirectId: 'legacyOpenMarine', sourcePath: '/open-marine', destinationPath: '/tecnologia' },
  { redirectId: 'legacyProductos', sourcePath: '/productos', destinationPath: '/tecnologia' },
  {
    redirectId: 'legacyProductoDetail',
    sourcePath: '/productos/:slug',
    destinationPath: '/tecnologia/:slug',
  },
];

export const FAMILY_IDS = [
  'NAV',
  'HUB',
  'AIS',
  'PILOT',
  'SENSE',
  'WATCH',
  'DISPLAY',
  'WEATHER',
  'FLEET',
];
export const BUNDLE_IDS = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'];
export const EDITION_IDS = [
  'NAV-ESSENTIAL',
  'NAV-PRO',
  'HUB-STANDARD',
  'HUB-PRO',
  'AIS-RECEIVER',
  'AIS-CONNECTED',
  'PILOT-COASTAL',
  'PILOT-SAIL',
  'PILOT-PRO',
  'SENSE-WIND',
  'SENSE-POWER',
  'SENSE-BILGE',
  'SENSE-TANKS',
  'SENSE-ENV',
  'SENSE-ESSENTIALS',
  'SENSE-SAIL',
  'SENSE-SYSTEMS',
  'WATCH-CORE',
  'WATCH-PLUS',
  'DISPLAY-7',
  'DISPLAY-LARGE-CONDITIONAL',
  'WEATHER-STANDARD',
  'WEATHER-PRO',
  'FLEET-START',
  'FLEET-BUSINESS',
  'FLEET-ENTERPRISE',
];
export const GATE_IDS = [
  'GATE-MARKET-PLACEMENT',
  'GATE-SAFETY-PILOT',
  'GATE-IP-CLEARANCE',
  'GATE-DATA-LICENSING',
  'GATE-PRIVACY-DPA-DPIA',
  'GATE-CRA-CYBERSECURITY',
  'GATE-CONSUMER-TERMS',
  'GATE-COMMERCIAL-CLAIMS',
  'GATE-PRICING',
  'GATE-PAYMENTS',
  'GATE-INSURANCE',
  'GATE-LEGAL-ENTITY',
  'GATE-WEBSITE-REMEDIATION',
];
export const DOCUMENT_IDS = Array.from(
  { length: 24 },
  (_, i) => `DOC-${String(i + 1).padStart(2, '0')}`,
);
export const FINDING_IDS = Array.from(
  { length: 34 },
  (_, i) => `WEB-${String(i + 1).padStart(3, '0')}`,
);

const PROPOSED = [
  ['mareaOverview', 'marea', 'en/marea', 'ENT-HUB-MAREA'],
  ['mareaProducts', 'marea/productos', 'en/marea/products', 'ENT-HUB-PRODUCTS'],
  ['mareaSolutions', 'marea/soluciones', 'en/marea/solutions', 'ENT-HUB-SOLUTIONS'],
  ['mareaFamilyNav', 'marea/nav', 'en/marea/nav', 'ENT-FAMILY-NAV'],
  ['mareaFamilyHub', 'marea/hub', 'en/marea/hub', 'ENT-FAMILY-HUB'],
  ['mareaFamilyAis', 'marea/ais', 'en/marea/ais', 'ENT-FAMILY-AIS'],
  ['mareaFamilyPilot', 'marea/pilot', 'en/marea/pilot', 'ENT-FAMILY-PILOT'],
  ['mareaFamilySense', 'marea/sense', 'en/marea/sense', 'ENT-FAMILY-SENSE'],
  ['mareaFamilyWatch', 'marea/watch', 'en/marea/watch', 'ENT-FAMILY-WATCH'],
  ['mareaFamilyDisplay', 'marea/display', 'en/marea/display', 'ENT-FAMILY-DISPLAY'],
  ['mareaFamilyWeather', 'marea/weather', 'en/marea/weather', 'ENT-FAMILY-WEATHER'],
  ['mareaFamilyFleet', 'marea/fleet', 'en/marea/fleet', 'ENT-FAMILY-FLEET'],
  ['mareaSolutionStart', 'marea/soluciones/start', 'en/marea/solutions/start', 'ENT-BUNDLE-START'],
  [
    'mareaSolutionCruise',
    'marea/soluciones/cruise',
    'en/marea/solutions/cruise',
    'ENT-BUNDLE-CRUISE',
  ],
  ['mareaSolutionSail', 'marea/soluciones/sail', 'en/marea/solutions/sail', 'ENT-BUNDLE-SAIL'],
  [
    'mareaSolutionProtect',
    'marea/soluciones/protect',
    'en/marea/solutions/protect',
    'ENT-BUNDLE-PROTECT',
  ],
  [
    'mareaSolutionComplete',
    'marea/soluciones/complete',
    'en/marea/solutions/complete',
    'ENT-BUNDLE-COMPLETE',
  ],
  ['mareaSolutionFleet', 'marea/soluciones/fleet', 'en/marea/solutions/fleet', 'ENT-BUNDLE-FLEET'],
  ['mareaConfigurator', 'marea/configurador', 'en/marea/configurator', 'ENT-TOOL-CONFIGURATOR'],
  ['professionals', 'profesionales', 'en/professionals', 'ENT-PAGE-PROFESSIONALS'],
  ['installers', 'instaladores', 'en/installers', 'ENT-PAGE-INSTALLERS'],
  ['support', 'soporte', 'en/support', 'ENT-PAGE-SUPPORT'],
  ['productDocumentation', 'soporte/marea/:slug', 'en/support/marea/:slug', 'ENT-DOC-PRODUCT'],
];

export const PROPOSED_ROUTES = Object.fromEntries(
  PROPOSED.map(([routeId, es, en, entityId]) => [routeId, { es, en, entityId }]),
);
export const PROPOSED_ROUTE_IDS = Object.keys(PROPOSED_ROUTES);
export const PROPOSED_STATUS = 'PROPOSED_INTERNAL_NOT_DEPLOYABLE';
export const ALL_ROUTE_IDS = [...CURRENT_ROUTE_IDS, ...PROPOSED_ROUTE_IDS];

const FORBIDDEN_PUBLIC_CLAIM =
  /\b(buy|order now|add to cart|checkout|pre-?order|in stock|available now|price|from €|€\s?\d|eur\s?\d|ce marked|certified|nmea\s?2000 certified|autonomous|self-steering|collision avoidance|guaranteed|official charts|official weather|gdpr compliant|best|leading)\b/i;
const FORBIDDEN_BRAND = /\bMAREA\b/i;
// Hard restrictions inherited from MC-14: no AIS transmission/transponder offer and no
// FLEET default/included hardware claim may pass the validators.
const AIS_TRANSMISSION_CLAIM =
  /\bAIS\b[^.\n]{0,120}\b(transmi(?:t|ts|tted|tter|ssion|tir|si[oó]n|sor)|transceiver|transceptor)\b/i;
const FLEET_DEFAULT_HARDWARE_CLAIM =
  /\bFLEET\b[^.\n]{0,120}\b(default hardware|hardware (?:is )?included|includes? hardware|hardware de serie|incluye hardware|equipo(?:s)? incluido(?:s)?)\b/i;

const nice = (value) => (value === undefined || value === null ? '' : String(value));
const asArray = (value) => (Array.isArray(value) ? value : []);
const itemsOf = (dataset, ...keys) => {
  for (const key of keys) if (Array.isArray(dataset?.[key])) return dataset[key];
  return [];
};
const idOf = (item, keys) =>
  keys.map((key) => item?.[key]).find((value) => typeof value === 'string' && value);
const pathOf = (item) => {
  const pattern = item?.es ?? item?.routePatternEs ?? item?.patternEs ?? item?.sourcePath;
  return nice(pattern).replace(/^\/+/, '').replace(/\/+$/, '');
};
const segments = (pattern) => nice(pattern).split('/').filter(Boolean);
const isDynamicSegment = (segment) => segment.startsWith(':');

function patternsOverlap(left, right) {
  const a = segments(left);
  const b = segments(right);
  if (a.length !== b.length) return false;
  return a.every(
    (segment, index) =>
      isDynamicSegment(segment) || isDynamicSegment(b[index]) || segment === b[index],
  );
}

function patternMatches(pattern, path) {
  const a = segments(pattern);
  const b = segments(path);
  if (a.length !== b.length) return false;
  return a.every((segment, index) => isDynamicSegment(segment) || segment === b[index]);
}

export function loadData(root = process.cwd()) {
  const data = {};
  const missing = [];
  for (const name of DATASETS) {
    const file = join(root, DATA_DIR, `${name}.json`);
    if (!existsSync(file)) {
      missing.push(`${name}.json`);
      continue;
    }
    data[name] = JSON.parse(readFileSync(file, 'utf8'));
  }
  if (missing.length) throw new Error(`Missing MC-15 datasets: ${missing.join(', ')}`);
  return data;
}

export function validateData(data, { root = process.cwd() } = {}) {
  const errors = [];
  const add = (code, message) => errors.push({ code, message });
  const byName = (name) => data[name] ?? {};
  const routeIds = new Set(ALL_ROUTE_IDS);
  const gateIds = new Set(GATE_IDS);

  // ---------------------------------------------------------------- envelope
  for (const name of DATASETS) {
    const dataset = byName(name);
    if (!dataset || Object.keys(dataset).length === 0) {
      add('IA-001', `${name}.json is empty or missing`);
      continue;
    }
    if (!dataset.contractId) add('IA-001', `${name}.json missing contractId`);
    if (dataset.contractVersion !== '1.0.0')
      add('IA-001', `${name}.json contractVersion must be 1.0.0`);
    if (dataset.milestone !== 'MC-15') add('IA-001', `${name}.json milestone must be MC-15`);
    if (dataset.sourceCommit !== SOURCE_COMMIT && name !== 'manifest') {
      add('IA-002', `${name}.json sourceCommit must be the frozen MC-14 HEAD`);
    }
    if (dataset.readOnly !== true) add('IA-003', `${name}.json readOnly must be true`);
    if (dataset.publicationAuthorized !== false) {
      add('IA-003', `${name}.json publicationAuthorized must be false`);
    }
    if (
      name !== 'search-console-evidence' &&
      name !== 'url-evidence' &&
      nice(dataset.evidenceState).includes('SEARCH_CONSOLE')
    ) {
      add('IA-018', `${name}.json claims Search Console evidence outside the evidence datasets`);
    }
    for (const reference of asArray(dataset.crossReferences)) {
      const target = nice(reference).split('#')[0];
      if (!target) continue;
      const candidates = [
        resolve(root, DATA_DIR, target),
        resolve(root, target),
        resolve(root, 'docs/marea/information-architecture', target),
      ];
      if (!candidates.some((candidate) => existsSync(candidate))) {
        add('IA-004', `${name}.json crossReference does not resolve: ${target}`);
      }
    }
  }

  // ------------------------------------------------------------ current routes
  const currentRoutes = byName('current-routes');
  const currentItems = itemsOf(currentRoutes, 'items', 'routes');
  const currentIds = new Set();
  for (const item of currentItems) {
    const routeId = item.routeId ?? item.id;
    if (!routeId) {
      add('IA-008', 'current-routes item without routeId');
      continue;
    }
    if (currentIds.has(routeId)) add('IA-007', `duplicate current routeId ${routeId}`);
    currentIds.add(routeId);
    const expected = CURRENT_ROUTES[routeId];
    const isAdmin = ADMIN_ROUTE_IDS.includes(routeId);
    if (!expected && !isAdmin) {
      add('IA-005', `unexpected current routeId ${routeId}`);
      continue;
    }
    if (expected) {
      const es = nice(item.es ?? item.routePatternEs ?? item.patternEs);
      const en = nice(item.en ?? item.routePatternEn ?? item.patternEn);
      if (es !== expected.es) add('IA-006', `${routeId} ES path changed: ${es} != ${expected.es}`);
      if (en !== expected.en) add('IA-006', `${routeId} EN path changed: ${en} != ${expected.en}`);
      for (const field of ['pageFamily', 'contentSource', 'renderMode', 'translationState']) {
        if (!item[field]) add('IA-008', `${routeId} missing ${field}`);
      }
      for (const field of ['dynamic', 'private', 'indexable', 'sitemapExpected']) {
        if (typeof item[field] !== 'boolean') add('IA-008', `${routeId} missing boolean ${field}`);
      }
      if (PRIVATE_ROUTE_IDS.includes(routeId) && item.private !== true) {
        add('IA-009', `${routeId} must be marked private`);
      }
      if (PRIVATE_ROUTE_IDS.includes(routeId) && item.indexable === true) {
        add('IA-009', `${routeId} private route marked indexable`);
      }
      if (routeId === SAMPLE_ROUTE_ID && item.indexable === true) {
        add('IA-009', `${routeId} sample route must be noindex`);
      }
    } else if (item.admin !== true) {
      add('IA-010', `admin route ${routeId} must be marked admin`);
    }
  }
  for (const routeId of CURRENT_ROUTE_IDS) {
    if (!currentIds.has(routeId)) add('IA-005', `current routeId not inventoried: ${routeId}`);
  }
  for (const routeId of ADMIN_ROUTE_IDS) {
    if (!currentIds.has(routeId)) add('IA-010', `admin routeId not inventoried: ${routeId}`);
  }
  const legacyFromCurrent = [
    ...itemsOf(currentRoutes, 'legacyRedirects', 'redirects'),
    ...itemsOf(byName('current-urls'), 'items', 'urls', 'records').filter(
      (item) => item.routeId === 'legacyRedirect',
    ),
  ];
  for (const legacy of LEGACY_REDIRECTS) {
    const found = legacyFromCurrent.find(
      (item) =>
        (item.redirectId ?? item.id) === legacy.redirectId ||
        item.sourcePath === legacy.sourcePath ||
        item.routePattern === legacy.sourcePath ||
        item.concreteUrl === legacy.sourcePath,
    );
    if (!found) add('IA-011', `legacy redirect not inventoried: ${legacy.sourcePath}`);
    else {
      const destination =
        found.destinationPath ?? found.redirectTarget ?? found.expectedDestinationPath;
      if (destination && nice(destination) !== legacy.destinationPath) {
        add('IA-011', `legacy redirect ${legacy.sourcePath} destination changed`);
      }
    }
  }

  // -------------------------------------------------------------- current URLs
  const currentUrls = byName('current-urls');
  const urlItems = itemsOf(currentUrls, 'items', 'urls', 'records');
  const urlIds = new Set();
  const concreteKeys = new Set();
  const urlRouteCounts = new Map();
  for (const item of urlItems) {
    const urlId = item.urlId ?? item.id;
    if (!urlId) {
      add('IA-012', 'current URL without urlId');
      continue;
    }
    if (urlIds.has(urlId)) add('IA-012', `duplicate urlId ${urlId}`);
    urlIds.add(urlId);
    const routeId = item.routeId;
    const extraSurface = ['legacyRedirect', 'unknownRoute', 'notFound', 'redirect'];
    if (
      routeId &&
      !CURRENT_ROUTE_IDS.includes(routeId) &&
      !ADMIN_ROUTE_IDS.includes(routeId) &&
      !extraSurface.includes(routeId)
    ) {
      add('IA-012', `current URL ${urlId} has unknown routeId ${routeId}`);
    }
    const locale = item.locale;
    if (locale !== 'es' && locale !== 'en') add('IA-012', `${urlId} invalid locale ${locale}`);
    const url = item.concreteUrl ?? item.url;
    if (typeof url !== 'string' || !url.startsWith('/')) {
      add('IA-012', `${urlId} concreteUrl must start with /`);
    } else {
      if (url.length > 1 && url.endsWith('/')) add('IA-012', `${urlId} has trailing slash`);
      if (/\s/.test(url)) add('IA-012', `${urlId} contains whitespace`);
      if (url.startsWith('/en') !== (locale === 'en') && url !== '/en') {
        add('IA-013', `${urlId} locale/path mismatch (${locale}, ${url})`);
      }
      const key = `${locale}:${url}`;
      if (concreteKeys.has(key)) add('IA-012', `duplicate concrete URL ${key}`);
      concreteKeys.add(key);
      if (url.startsWith('/marea') || url.includes('/marea/')) {
        add('IA-024', `current URL ${urlId} uses a proposed /marea namespace`);
      }
    }
    urlRouteCounts.set(routeId, (urlRouteCounts.get(routeId) ?? 0) + 1);
    if (!item.migrationDisposition) add('IA-014', `${urlId} missing migrationDisposition`);
    if (!item.preservationReason) add('IA-014', `${urlId} missing preservationReason`);
    if (!item.evidenceSource) add('IA-014', `${urlId} missing evidenceSource`);
    const privateRoute = PRIVATE_ROUTE_IDS.includes(routeId) || ADMIN_ROUTE_IDS.includes(routeId);
    if (privateRoute) {
      if (!/noindex/i.test(nice(item.robotsPolicy)))
        add('IA-015', `${urlId} private route must be noindex`);
      if (item.sitemapMembership === true || item.sitemapMembership === 'INCLUDED') {
        add('IA-015', `${urlId} private route must not be in the sitemap`);
      }
    }
    if (routeId === SAMPLE_ROUTE_ID && !/noindex/i.test(nice(item.robotsPolicy))) {
      add('IA-017', `${urlId} sample route must be noindex`);
    }
    if (
      locale === 'es' &&
      CURRENT_ROUTE_IDS.includes(routeId) &&
      !privateRoute &&
      routeId !== SAMPLE_ROUTE_ID
    ) {
      const disposition = nice(item.migrationDisposition);
      const dynamicException = routeId === 'shopDetail' && disposition === 'DYNAMIC_DB';
      if (!/^KEEP_/.test(disposition) && !dynamicException) {
        add(
          'IA-014',
          `${urlId} existing Spanish public URL must be preserved (${item.migrationDisposition})`,
        );
      }
    }
  }
  for (const routeId of CURRENT_ROUTE_IDS) {
    if (!urlRouteCounts.has(routeId)) add('IA-012', `no current URL record for routeId ${routeId}`);
  }
  for (const [routeId, minimum] of [
    ['technologyDetail', 12],
    ['guideDetail', 60],
    ['shopSample', 20],
  ]) {
    const count = urlRouteCounts.get(routeId) ?? 0;
    if (count < minimum) add('IA-016', `${routeId} concrete URL records ${count} < ${minimum}`);
  }
  for (const routeId of CURRENT_ROUTE_IDS) {
    const route = currentItems.find((item) => (item.routeId ?? item.id) === routeId);
    if (!route) continue;
    const memberships = urlItems
      .filter((item) => item.routeId === routeId)
      .map((item) => nice(item.sitemapMembership));
    if (
      memberships.some((membership) => /^MEMBER_|^INCLUDED/.test(membership)) &&
      route.sitemapExpected !== true
    ) {
      add('IA-070', `${routeId} has sitemap member URLs but sitemapExpected is not true`);
    }
  }

  // ------------------------------------------------------------ URL evidence
  const urlEvidence = byName('url-evidence');
  const evidenceItems = itemsOf(urlEvidence, 'items', 'evidence', 'records');
  const evidenceClasses = new Set([
    'REPOSITORY_VERIFIED',
    'LOCAL_SSR_VERIFIED',
    'PUBLIC_OBSERVATION',
    'SEARCH_CONSOLE_VERIFIED',
    'ASSUMED',
    'UNKNOWN',
  ]);
  if (evidenceItems.length === 0) add('IA-018', 'url-evidence has no records');
  for (const item of evidenceItems) {
    const evidenceId = item.evidenceId ?? item.id;
    if (!evidenceId) add('IA-018', 'evidence record without evidenceId');
    if (!evidenceClasses.has(item.evidenceClass)) {
      add('IA-018', `${evidenceId} invalid evidenceClass ${item.evidenceClass}`);
    }
    if (item.evidenceClass === 'SEARCH_CONSOLE_VERIFIED') {
      const gsc = byName('search-console-evidence');
      if (!gsc?.property?.siteUrl) {
        add('IA-018', `${evidenceId} claims Search Console evidence without the evidence dataset`);
      } else if (!/sc-domain:embarcarte\.com/.test(nice(item.evidenceSource))) {
        add('IA-018', `${evidenceId} does not name the verified Search Console property`);
      } else if (!item.observedAt || item.observedAt === 'NOT_OBSERVED') {
        add('IA-018', `${evidenceId} lacks a real capture timestamp`);
      }
    }
    for (const value of Object.values(item)) {
      if (typeof value === 'string' && /GOOGLE_INDEXED/i.test(value)) {
        add('IA-018', `${evidenceId} claims GOOGLE_INDEXED`);
      }
    }
  }

  const gscData = byName('search-console-evidence');
  if (!gscData || Object.keys(gscData).length === 0) {
    add('IA-071', 'search-console-evidence dataset is missing');
  } else {
    if (gscData.contractId !== 'MAREA-MC15-SEARCH-CONSOLE-EVIDENCE') {
      add('IA-071', 'search-console-evidence contractId is not the expected contract');
    }
    if (gscData.evidenceState !== 'SEARCH_CONSOLE_VERIFIED') {
      add('IA-071', 'search-console-evidence evidenceState must be SEARCH_CONSOLE_VERIFIED');
    }
    if (gscData.property?.siteUrl !== 'sc-domain:embarcarte.com') {
      add('IA-071', 'search-console-evidence property must be sc-domain:embarcarte.com');
    }
    if (gscData.property?.permissionLevel !== 'siteFullUser') {
      add('IA-071', 'search-console-evidence permissionLevel must be siteFullUser');
    }
    if (!gscData.property?.capturedAt) {
      add('IA-071', 'search-console-evidence missing capture timestamp');
    }
    const inspections = asArray(gscData.inspections);
    if (inspections.length !== 24) {
      add('IA-071', `search-console-evidence must contain 24 inspections (${inspections.length})`);
    }
    const inspectionUrls = new Set();
    for (const inspection of inspections) {
      const url = nice(inspection.inspectionUrl);
      if (!url.startsWith('https://embarcarte.com/')) {
        add('IA-071', `search-console-evidence invalid inspection URL ${url}`);
      }
      if (inspectionUrls.has(url)) add('IA-071', `duplicate inspection URL ${url}`);
      inspectionUrls.add(url);
      if (!['PASS', 'NEUTRAL', 'FAIL'].includes(inspection.verdict)) {
        add('IA-071', `${url} has invalid verdict ${inspection.verdict}`);
      }
      if (!inspection.coverageState) add('IA-071', `${url} lacks coverageState`);
    }
    const pass = inspections.filter((inspection) => inspection.verdict === 'PASS');
    const noindex = inspections.filter((inspection) =>
      /noindex/i.test(nice(inspection.coverageState)),
    );
    const notRecognized = inspections.filter(
      (inspection) => inspection.classification === 'NOT_RECOGNIZED',
    );
    const publicNotIndexed = inspections.filter(
      (inspection) => inspection.classification === 'PUBLIC_INDEXABLE_NOT_INDEXED',
    );
    const discovered = inspections.filter(
      (inspection) => inspection.classification === 'DISCOVERED_NOT_INDEXED',
    );
    if (gscData.summary?.inspectedUrls !== inspections.length) {
      add('IA-071', 'search-console-evidence summary inspectedUrls mismatch');
    }
    if (gscData.summary?.indexedConfirmed !== pass.length) {
      add('IA-071', 'search-console-evidence summary indexedConfirmed mismatch');
    }
    if (gscData.summary?.excludedNoindex !== noindex.length) {
      add('IA-071', 'search-console-evidence summary excludedNoindex mismatch');
    }
    if (gscData.summary?.notRecognized !== notRecognized.length) {
      add('IA-071', 'search-console-evidence summary notRecognized mismatch');
    }
    if (gscData.summary?.publicIndexableNotIndexed !== publicNotIndexed.length) {
      add('IA-071', 'search-console-evidence summary publicIndexableNotIndexed mismatch');
    }
    if (gscData.summary?.discoveredNotIndexed !== undefined) {
      if (gscData.summary.discoveredNotIndexed !== discovered.length) {
        add('IA-071', 'search-console-evidence summary discoveredNotIndexed mismatch');
      }
    }
    for (const inspection of pass) {
      const url = nice(inspection.inspectionUrl);
      if (inspection.googleCanonical !== url || inspection.userCanonical !== url) {
        add('IA-074', `${url} indexed inspection canonical is not the inspected URL`);
      }
    }
    if (gscData.summary?.mareaIndexed !== 0) {
      add('IA-071', 'search-console-evidence reports a MAREA URL as indexed');
    }
    if (gscData.summary?.sitemapSubmittedUrls !== 98) {
      add('IA-071', 'search-console-evidence sitemap submitted URL count must be 98');
    }
    if (gscData.summary?.sitemapErrors !== 0) {
      add('IA-071', 'search-console-evidence preferred sitemap must have 0 errors');
    }
    const mareaIndexed = pass.filter((inspection) =>
      /\/marea/.test(nice(inspection.inspectionUrl)),
    );
    if (mareaIndexed.length > 0) {
      add('IA-072', 'search-console-evidence marks a proposed MAREA URL as indexed');
    }
    const traslados = inspections.find((inspection) =>
      /\/traslados$/.test(nice(inspection.inspectionUrl)),
    );
    if (!traslados) {
      add('IA-073', 'search-console-evidence must record /traslados');
    } else if (
      traslados.verdict === 'PASS' ||
      !['PUBLIC_INDEXABLE_NOT_INDEXED', 'DISCOVERED_NOT_INDEXED', 'NOT_RECOGNIZED'].includes(
        traslados.classification,
      )
    ) {
      add('IA-073', '/traslados must be recorded as public/indexable but not indexed');
    }
    const sitemaps = asArray(gscData.sitemaps);
    const preferred = sitemaps.find(
      (sitemap) => sitemap.path === 'https://embarcarte.com/sitemap.xml',
    );
    if (!preferred) add('IA-071', 'search-console-evidence missing sitemap.xml entry');
    else if (preferred.submittedUrls !== 98 || preferred.errors !== '0') {
      add('IA-071', 'search-console-evidence sitemap.xml must be 98 URLs / 0 errors');
    }
    for (const findingId of ['GSC-01', 'GSC-02', 'GSC-03', 'GSC-04', 'GSC-05']) {
      if (!asArray(gscData.findings).some((finding) => finding.findingId === findingId)) {
        add('IA-071', `search-console-evidence missing ${findingId}`);
      }
    }
    if (JSON.stringify(gscData).includes('private_key')) {
      add('IA-071', 'search-console-evidence must not contain key material');
    }
    if (/GOOGLE_INDEXED/.test(JSON.stringify(gscData))) {
      add('IA-018', 'search-console-evidence uses the forbidden GOOGLE_INDEXED token');
    }
  }

  // ---------------------------------------------------------- proposed routes
  const proposedRoutes = byName('proposed-routes');
  const proposedItems = itemsOf(proposedRoutes, 'items', 'routes');
  const proposedIds = new Set();
  const proposedPaths = new Set();
  for (const item of proposedItems) {
    const routeId = item.routeId ?? item.id;
    if (!routeId) {
      add('IA-019', 'proposed route without routeId');
      continue;
    }
    if (proposedIds.has(routeId)) add('IA-019', `duplicate proposed routeId ${routeId}`);
    proposedIds.add(routeId);
    const expected = PROPOSED_ROUTES[routeId];
    if (!expected) {
      add('IA-019', `unexpected proposed routeId ${routeId}`);
      continue;
    }
    const es = nice(item.es ?? item.routePatternEs);
    const en = nice(item.en ?? item.routePatternEn);
    if (es !== expected.es) add('IA-020', `${routeId} ES pattern ${es} != ${expected.es}`);
    if (en !== expected.en) add('IA-020', `${routeId} EN pattern ${en} != ${expected.en}`);
    if (item.entityId !== expected.entityId) {
      add('IA-019', `${routeId} entityId ${item.entityId} != ${expected.entityId}`);
    }
    if (item.status !== PROPOSED_STATUS || item.publicationStatus !== PROPOSED_STATUS) {
      add('IA-021', `${routeId} must be ${PROPOSED_STATUS}`);
    }
    if (item.live === true || item.published === true || item.indexable === true) {
      add('IA-026', `${routeId} marked live/indexable`);
    }
    for (const field of [
      'implementationReady',
      'indexationAuthorized',
      'commercialTransactionAuthorized',
    ]) {
      if (item[field] !== false) add('IA-021', `${routeId} ${field} must be false`);
    }
    if (item.routeDefined !== true) add('IA-021', `${routeId} routeDefined must be true`);
    for (const gate of asArray(item.blockingGateIds)) {
      if (!gateIds.has(gate)) add('IA-022', `${routeId} unknown blocking gate ${gate}`);
    }
    if (asArray(item.blockingGateIds).length === 0)
      add('IA-022', `${routeId} has no blocking gate`);
    if (!/^NONE|CLEAR|NO_/i.test(nice(item.collisionStatus))) {
      add(
        'IA-023',
        `${routeId} collisionStatus must record no collision (${item.collisionStatus})`,
      );
    }
    if (asArray(item.collidesWith).length > 0)
      add('IA-023', `${routeId} collidesWith must be empty`);
    for (const pattern of [es, en]) {
      if (proposedPaths.has(pattern)) add('IA-025', `duplicate proposed pattern ${pattern}`);
      proposedPaths.add(pattern);
      for (const [currentId, current] of Object.entries(CURRENT_ROUTES)) {
        if (patternsOverlap(pattern, current.es) || patternsOverlap(pattern, current.en)) {
          add('IA-024', `${routeId} collides with current route ${currentId}`);
        }
      }
      if (pattern.startsWith('admin') || pattern.startsWith('en/admin')) {
        add('IA-024', `${routeId} uses the admin namespace`);
      }
      for (const legacy of LEGACY_REDIRECTS) {
        if (pattern === legacy.sourcePath.replace(/^\//, '')) {
          add('IA-024', `${routeId} collides with legacy redirect ${legacy.sourcePath}`);
        }
      }
    }
    if (routeId === 'productDocumentation' && item.dynamic !== true) {
      add('IA-019', 'productDocumentation must be dynamic');
    }
    if (routeId !== 'productDocumentation' && item.dynamic === true) {
      add('IA-019', `${routeId} must not be dynamic`);
    }
    if (item.sitemapEligible === true) add('IA-044', `${routeId} must not be sitemap eligible`);
  }
  for (const routeId of PROPOSED_ROUTE_IDS) {
    if (!proposedIds.has(routeId)) add('IA-019', `proposed route not registered: ${routeId}`);
  }

  // --------------------------------------------------------------- proposed IA
  const proposedIa = byName('proposed-ia');
  const iaNodes = itemsOf(proposedIa, 'items', 'nodes');
  const nodeIds = new Set();
  for (const node of iaNodes) {
    const nodeId = node.nodeId ?? node.id;
    if (!nodeId) {
      add('IA-027', 'IA node without nodeId');
      continue;
    }
    if (nodeIds.has(nodeId)) add('IA-027', `duplicate IA nodeId ${nodeId}`);
    nodeIds.add(nodeId);
    if (node.routeId && !routeIds.has(node.routeId))
      add('IA-027', `${nodeId} unknown routeId ${node.routeId}`);
    if (
      node.routeId &&
      PROPOSED_ROUTES[node.routeId] &&
      node.publicationStatus !== PROPOSED_STATUS
    ) {
      add('IA-021', `${nodeId} proposed node must remain ${PROPOSED_STATUS}`);
    }
  }
  for (const routeId of PROPOSED_ROUTE_IDS) {
    if (!iaNodes.some((node) => node.routeId === routeId)) {
      add('IA-027', `proposed route missing from proposed-ia: ${routeId}`);
    }
  }

  // ----------------------------------------------------------- slug governance
  const slugGovernance = byName('slug-governance');
  const slugRules = itemsOf(slugGovernance, 'items', 'rules');
  const ruleIds = new Set();
  for (const rule of slugRules) {
    const ruleId = rule.ruleId ?? rule.id;
    if (!ruleId) add('IA-028', 'slug rule without ruleId');
    else if (ruleIds.has(ruleId)) add('IA-028', `duplicate slug rule ${ruleId}`);
    else ruleIds.add(ruleId);
    if (!rule.rule || !rule.appliesTo) add('IA-028', `${ruleId} incomplete slug rule`);
  }
  if (slugRules.length < 8) add('IA-028', 'slug-governance needs at least 8 rules');
  const entitySlug = slugGovernance.entitySlug ?? slugGovernance.entities ?? [];
  const entityIds = new Set(asArray(entitySlug).map((item) => item.entityId));
  for (const family of FAMILY_IDS) {
    if (!entityIds.has(`ENT-FAMILY-${family}`))
      add('IA-028', `missing entity slug for family ${family}`);
  }
  for (const bundle of BUNDLE_IDS) {
    if (!entityIds.has(`ENT-BUNDLE-${bundle}`))
      add('IA-028', `missing entity slug for bundle ${bundle}`);
  }
  const reserved = new Set([
    'admin',
    'api',
    'en',
    'marea',
    'tienda',
    'guias',
    'tecnologia',
    'carrito',
    'cuenta',
    'acceso',
    'cookies',
  ]);
  for (const entity of asArray(entitySlug)) {
    for (const value of [entity.es ?? entity.esSlug, entity.en ?? entity.enSlug]) {
      if (!value) continue;
      const first = segments(value)[0];
      if (reserved.has(first) && !['marea', 'tienda', 'guias'].includes(first)) {
        add('IA-029', `${entity.entityId} uses reserved segment ${first}`);
      }
    }
  }

  // -------------------------------------------------------------- redirect map
  const redirectMap = byName('redirect-map');
  const redirects = itemsOf(redirectMap, 'items', 'redirects', 'records');
  const redirectIds = new Set();
  const redirectSources = new Map();
  const activeRedirects = [];
  for (const item of redirects) {
    const redirectId = item.redirectId ?? item.id;
    if (!redirectId) {
      add('IA-030', 'redirect record without redirectId');
      continue;
    }
    if (redirectIds.has(redirectId)) add('IA-030', `duplicate redirectId ${redirectId}`);
    redirectIds.add(redirectId);
    for (const field of ['sourcePath', 'reason', 'executionStatus', 'riskClassification']) {
      if (!item[field]) add('IA-030', `${redirectId} missing ${field}`);
    }
    if (!['301', '308', 301, 308, 200].includes(item.statusCode)) {
      add('IA-030', `${redirectId} invalid statusCode ${item.statusCode}`);
    }
    if (!item.queryHandling) add('IA-030', `${redirectId} missing queryHandling`);
    if (!item.fragmentHandling) add('IA-030', `${redirectId} missing fragmentHandling`);
    if (item.executionStatus === 'EXECUTED')
      add('IA-036', `${redirectId} must not be executed in MC-15`);
    if (item.active === true) activeRedirects.push(item);
    if (item.statusCode === 301 || item.statusCode === 308) {
      const source = nice(item.sourcePath);
      if (redirectSources.has(source)) add('IA-030', `duplicate redirect source ${source}`);
      redirectSources.set(source, item);
    }
  }
  for (const legacy of LEGACY_REDIRECTS) {
    const found = redirects.find((item) => (item.redirectId ?? item.id) === legacy.redirectId);
    const active = redirects.find(
      (item) =>
        nice(item.sourcePath) === legacy.sourcePath &&
        (item.statusCode === 301 || item.statusCode === 308),
    );
    if (!found && !active) add('IA-031', `active legacy redirect missing: ${legacy.redirectId}`);
    if (found && found.destinationPath !== legacy.destinationPath) {
      add('IA-031', `legacy redirect destination changed: ${legacy.redirectId}`);
    }
    if (found && found.executionStatus === 'EXECUTED') {
      add('IA-031', `legacy redirect ${legacy.redirectId} cannot be re-executed in MC-15`);
    }
    if (found && found.active !== true)
      add('IA-031', `legacy redirect ${legacy.redirectId} must remain active`);
  }
  for (const item of redirects) {
    if (item.active !== true) continue;
    const destination = nice(item.destinationPath);
    if (!destination) {
      add('IA-034', `${item.redirectId} active redirect without destination`);
      continue;
    }
    if (destination.startsWith('/marea') || destination.startsWith('/en/marea')) {
      add('IA-035', `${item.redirectId} redirects into unapproved MAREA surface`);
    }
    if (destination === '/') add('IA-035', `${item.redirectId} redirects to the home page`);
    if (item.sourceLocale !== item.destinationLocale) {
      add('IA-035', `${item.redirectId} cross-locale redirect`);
    }
    const destinationMatches =
      Object.values(CURRENT_ROUTES).some(
        (pattern) =>
          patternMatches(pattern.es, destination) || patternMatches(pattern.en, destination),
      ) ||
      Object.values(CURRENT_ROUTES).some(
        (pattern) =>
          patternMatches(pattern.es, destination.replace(/^\/en\//, '')) ||
          patternMatches(pattern.en, destination.replace(/^\/en\//, '')),
      );
    if (!destinationMatches && !destination.startsWith('/tecnologia')) {
      add('IA-034', `${item.redirectId} destination does not resolve: ${destination}`);
    }
  }
  for (const [source, item] of redirectSources) {
    const seen = new Set([source]);
    let current = item;
    let hops = 0;
    while (current && hops < 10) {
      const destination = nice(current.destinationPath).replace(/\/$/, '');
      if (!destination) break;
      if (seen.has(destination)) {
        add('IA-032', `redirect loop involving ${source}`);
        break;
      }
      const next = redirectSources.get(destination);
      if (!next) break;
      add('IA-033', `redirect chain ${source} -> ${destination}`);
      seen.add(destination);
      hops += 1;
      current = next;
    }
  }
  if (activeRedirects.length !== LEGACY_REDIRECTS.length) {
    add(
      'IA-031',
      `expected exactly ${LEGACY_REDIRECTS.length} active legacy redirects, found ${activeRedirects.length}`,
    );
  }

  // ------------------------------------------------------- canonical / hreflang
  const canonical = byName('canonical-hreflang');
  const canonicalItems = itemsOf(canonical, 'items', 'pages', 'records');
  const canonicalKeys = new Set();
  const pageLocales = new Map();
  for (const item of canonicalItems) {
    const pageId = item.pageId ?? item.routeId;
    const locale = item.locale;
    if (!pageId) continue;
    if (!pageLocales.has(pageId)) pageLocales.set(pageId, new Set());
    pageLocales.get(pageId).add(locale);
  }
  for (const item of canonicalItems) {
    const pageId = item.pageId ?? item.routeId;
    const locale = item.locale;
    if (!pageId || !routeIds.has(pageId)) {
      add('IA-037', `canonical item with unknown pageId ${pageId}`);
      continue;
    }
    if (locale !== 'es' && locale !== 'en') add('IA-037', `${pageId} canonical invalid locale`);
    const key = `${pageId}:${locale}`;
    if (canonicalKeys.has(key)) add('IA-037', `duplicate canonical item ${key}`);
    canonicalKeys.add(key);
    if (!pageLocales.has(pageId)) pageLocales.set(pageId, new Set());
    pageLocales.get(pageId).add(locale);
    const policy = nice(item.canonicalPolicy);
    if (!policy) add('IA-037', `${key} missing canonicalPolicy`);
    const expected = CURRENT_ROUTES[pageId] ?? PROPOSED_ROUTES[pageId];
    if (PROPOSED_ROUTES[pageId] && policy !== 'BLOCKED_NO_CANONICAL') {
      add('IA-039', `${key} proposed route canonical must be BLOCKED_NO_CANONICAL`);
    }
    if (CURRENT_ROUTES[pageId]) {
      const privateRoute = PRIVATE_ROUTE_IDS.includes(pageId);
      if (privateRoute && !/NONE|NO_CANONICAL/i.test(policy)) {
        add('IA-039', `${key} private route must not declare a canonical`);
      }
      if (!privateRoute && policy === 'SELF' && expected) {
        const pattern = locale === 'es' ? expected.es : expected.en;
        const canonicalPath = nice(item.canonicalUrlPattern ?? item.canonicalPath).replace(
          /^https?:\/\/[^/]+/,
          '',
        );
        if (canonicalPath && pathOf({ es: canonicalPath }) !== pattern) {
          add('IA-038', `${key} canonical ${canonicalPath} != /${pattern}`);
        }
      }
    }
    if (pageId === 'home') {
      if (locale === 'es' && !item.xDefault) add('IA-042', 'home ES must declare x-default');
      if (locale === 'en' && item.xDefault)
        add('IA-042', 'x-default may only be declared on home ES');
    } else if (item.xDefault) {
      add('IA-042', `${key} must not declare x-default`);
    }
    const group = item.hreflangGroup;
    const alternates = asArray(item.alternates);
    if (PRIVATE_ROUTE_IDS.includes(pageId) && alternates.length > 0) {
      add('IA-041', `${key} private page must not declare alternates`);
    }
    if (pageId === SAMPLE_ROUTE_ID && alternates.length > 0) {
      add('IA-041', `${key} sample page must not declare alternates`);
    }
    if (PROPOSED_ROUTES[pageId] && alternates.length > 0) {
      add('IA-041', `${key} proposed page must not declare published alternates`);
    }
    for (const alternate of alternates) {
      const targetId = alternate.pageId ?? alternate.routeId ?? pageId;
      const targetLocale = alternate.locale ?? alternate.language;
      if (!routeIds.has(targetId)) add('IA-041', `${key} alternate to unknown page ${targetId}`);
      if (targetLocale === 'en' && targetId === 'shopDetail') {
        add('IA-041', `${key} invented EN alternate for possibly untranslated shop detail`);
      }
    }
    if (group && !PROPOSED_ROUTES[pageId]) {
      const locales = pageLocales.get(pageId) ?? new Set();
      if (!locales.has('es') || !locales.has('en')) {
        add('IA-040', `${key} hreflang group without both locales`);
      }
    }
  }
  for (const pageId of ALL_ROUTE_IDS) {
    const locales = pageLocales.get(pageId) ?? new Set();
    if (!locales.has('es') || !locales.has('en')) {
      add('IA-037', `canonical/hreflang missing locale rows for ${pageId}`);
    }
  }
  const groups = new Map();
  for (const item of canonicalItems) {
    const group = item.hreflangGroup;
    if (!group) continue;
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(item);
  }
  for (const [group, members] of groups) {
    if (PROPOSED_ROUTE_IDS.some((routeId) => members.some((item) => item.pageId === routeId)))
      continue;
    const pageIds = new Set(members.map((item) => item.pageId ?? item.routeId));
    if (pageIds.size !== 1) add('IA-040', `hreflang group ${group} mixes entities`);
    const locales = new Set(members.map((item) => item.locale));
    if (!locales.has('es') || !locales.has('en'))
      add('IA-040', `hreflang group ${group} is not reciprocal`);
    for (const item of members) {
      const expectedLocale = item.locale === 'es' ? 'en' : 'es';
      const other = members.find((candidate) => candidate.locale === expectedLocale);
      if (!other) continue;
      const alternates = asArray(item.alternates).map(
        (alternate) => alternate.locale ?? alternate.language,
      );
      if (alternates.length > 0 && !alternates.includes(expectedLocale)) {
        add('IA-040', `${group} ${item.locale} does not reference ${expectedLocale}`);
      }
    }
  }

  // --------------------------------------------------------- indexation policy
  const indexation = byName('indexation-policy');
  const indexationClasses = itemsOf(indexation, 'items', 'classes', 'records');
  const classIds = new Set();
  for (const item of indexationClasses) {
    const classId = item.classId ?? item.id;
    if (!classId) add('IA-043', 'indexation class without classId');
    else if (classIds.has(classId)) add('IA-043', `duplicate indexation class ${classId}`);
    else classIds.add(classId);
    for (const field of [
      'httpStatus',
      'robotsMeta',
      'canonicalPolicy',
      'hreflangPolicy',
      'publicationGate',
    ]) {
      if (item[field] === undefined || item[field] === '')
        add('IA-043', `${classId} missing ${field}`);
    }
    if (typeof item.sitemapEligible !== 'boolean')
      add('IA-043', `${classId} missing boolean sitemapEligible`);
    if (typeof item.structuredDataEligible !== 'boolean') {
      add('IA-043', `${classId} missing boolean structuredDataEligible`);
    }
    if (nice(item.appliesTo).includes('MAREA') && item.sitemapEligible === true) {
      add('IA-044', `${classId} makes a blocked MAREA class sitemap eligible`);
    }
    if (
      /private|admin|cart|account|login/i.test(nice(item.appliesTo)) &&
      item.sitemapEligible === true
    ) {
      add('IA-045', `${classId} private class must not be sitemap eligible`);
    }
  }
  if (indexationClasses.length < 10) add('IA-043', 'indexation policy needs at least 10 classes');
  const status404 = indexationClasses.find((item) => /404/.test(nice(item.appliesTo)));
  if (status404 && Number(status404.httpStatus) !== 404)
    add('IA-043', '404 class must use httpStatus 404');

  // -------------------------------------------------------- structured data
  const structured = byName('structured-data-policy');
  const structuredItems = itemsOf(structured, 'items', 'pageTypes', 'records');
  if (structuredItems.length === 0) add('IA-046', 'structured-data-policy has no page types');
  const restrictionText = JSON.stringify(structured).toLowerCase();
  for (const token of ['product', 'offer', 'aggregaterating', 'review', 'price', 'availability']) {
    if (!restrictionText.includes(token))
      add('IA-047', `structured data policy does not address ${token}`);
  }
  for (const item of structuredItems) {
    const allowed = asArray(item.schemaTypesAllowed).map((value) => nice(value).toLowerCase());
    const isMarea =
      /marea|family|bundle|product_?family|solution/i.test(nice(item.pageTypeId ?? item.id)) ||
      /MAREA/i.test(nice(item.appliesTo));
    if (isMarea && (allowed.includes('product') || allowed.includes('offer'))) {
      add('IA-046', `${item.pageTypeId ?? item.id} allows Product/Offer for a blocked MAREA page`);
    }
    if (
      isMarea &&
      allowed.includes('softwareapplication') &&
      !/concept|internal/i.test(nice(item.restrictions))
    ) {
      add(
        'IA-046',
        `${item.pageTypeId ?? item.id} SoftwareApplication claim is not explicitly restricted`,
      );
    }
  }
  for (const row of asArray(structured.pageIdentityMatrix)) {
    if (!PROPOSED_ROUTES[row.pageId]) continue;
    const allowed = asArray(row.allowedTypes).map((value) => nice(value).toLowerCase());
    if (allowed.some((value) => value === 'product' || value === 'offer')) {
      add('IA-046', `${row.pageId} planning matrix allows Product/Offer on a blocked MAREA page`);
    }
    if (!row.forbiddenTypes || asArray(row.forbiddenTypes).length === 0) {
      add('IA-047', `${row.pageId} does not enumerate forbidden structured-data types`);
    }
  }

  // ----------------------------------------------------- bilingual metadata
  const metadata = byName('bilingual-metadata');
  const metadataItems = itemsOf(metadata, 'items', 'pages', 'records');
  const metadataKeys = new Set();
  const metadataPageLocales = new Map();
  for (const item of metadataItems) {
    const pageId = item.pageId ?? item.routeId;
    const locale = item.locale;
    if (!pageId || !routeIds.has(pageId)) {
      add('IA-048', `metadata item with unknown pageId ${pageId}`);
      continue;
    }
    if (locale !== 'es' && locale !== 'en') add('IA-048', `${pageId} metadata invalid locale`);
    const key = `${pageId}:${locale}`;
    if (metadataKeys.has(key)) add('IA-048', `duplicate metadata item ${key}`);
    metadataKeys.add(key);
    if (!metadataPageLocales.has(pageId)) metadataPageLocales.set(pageId, new Set());
    metadataPageLocales.get(pageId).add(locale);
    for (const field of [
      'titleTemplate',
      'descriptionTemplate',
      'robotsPolicy',
      'canonicalPolicy',
      'hreflangGroup',
      'breadcrumbParent',
      'publicationStatus',
    ]) {
      if (item[field] === undefined || item[field] === null || item[field] === '') {
        const rootBreadcrumb = pageId === 'home' && field === 'breadcrumbParent';
        if (!rootBreadcrumb) add('IA-048', `${key} missing ${field}`);
      }
    }
    for (const target of asArray(item.internalLinkTargets)) {
      if (!routeIds.has(target)) add('IA-050', `${key} internalLinkTarget unresolved: ${target}`);
    }
    if (item.breadcrumbParent && !routeIds.has(item.breadcrumbParent)) {
      add('IA-050', `${key} breadcrumbParent unresolved: ${item.breadcrumbParent}`);
    }
    if (PROPOSED_ROUTES[pageId]) {
      if (item.publicationStatus !== PROPOSED_STATUS) {
        add('IA-049', `${key} proposed metadata must be ${PROPOSED_STATUS}`);
      }
      if (!/noindex/i.test(nice(item.robotsPolicy)))
        add('IA-049', `${key} proposed metadata must be noindex`);
      const text = `${nice(item.titleTemplate)} ${nice(item.descriptionTemplate)}`;
      if (FORBIDDEN_BRAND.test(text))
        add('IA-049', `${key} uses the literal MAREA brand in public metadata`);
      if (FORBIDDEN_PUBLIC_CLAIM.test(text))
        add('IA-049', `${key} contains a forbidden public claim token`);
      if (/\d+\s?(€|eur)/i.test(text)) add('IA-049', `${key} contains a price`);
      if (/InStock|OutOfStock|aggregateRating|review/i.test(text)) {
        add('IA-049', `${key} contains availability/rating markup language`);
      }
      if (AIS_TRANSMISSION_CLAIM.test(text)) {
        add('IA-069', `${key} implies AIS transmission/transponder capability`);
      }
      if (FLEET_DEFAULT_HARDWARE_CLAIM.test(text)) {
        add('IA-069', `${key} implies FLEET default/included hardware`);
      }
    }
    for (const gate of asArray(item.commercialGate ? [item.commercialGate] : [])) {
      if (!gateIds.has(gate)) add('IA-050', `${key} unknown commercialGate ${gate}`);
    }
    for (const gate of asArray(item.requiredClaimEvidence)) {
      if (typeof gate !== 'string' || !gate)
        add('IA-050', `${key} invalid requiredClaimEvidence entry`);
    }
  }
  for (const pageId of ALL_ROUTE_IDS) {
    const locales = metadataPageLocales.get(pageId) ?? new Set();
    if (!locales.has('es') || !locales.has('en'))
      add('IA-048', `metadata missing locale rows for ${pageId}`);
  }
  const normalizeCanonical = (policy) => {
    const value = nice(policy).toUpperCase();
    if (value.startsWith('SELF')) return 'SELF';
    if (value.startsWith('BLOCKED') || value.startsWith('NONE_UNTIL_AUTHORIZED')) return 'BLOCKED';
    if (value.startsWith('NONE') || value.startsWith('NO_')) return 'NONE';
    return 'OTHER';
  };
  for (const item of metadataItems) {
    const pageId = item.pageId ?? item.routeId;
    const locale = item.locale;
    const canonicalRow = canonicalItems.find(
      (candidate) => candidate.pageId === pageId && candidate.locale === locale,
    );
    if (!canonicalRow) continue;
    const status = nice(item.hreflangGroupStatus);
    if (status === 'PUBLISHED_PAIR' && !canonicalRow.hreflangGroup) {
      add('IA-040', `${pageId}:${locale} metadata publishes a group absent from canonical data`);
    }
    if (status && status !== 'PUBLISHED_PAIR' && canonicalRow.hreflangGroup) {
      add(
        'IA-040',
        `${pageId}:${locale} canonical data emits a group while metadata says ${status}`,
      );
    }
    if (PROPOSED_ROUTES[pageId] && status !== 'PROPOSED_NOT_PUBLISHED') {
      add(
        'IA-040',
        `${pageId}:${locale} proposed metadata must not declare an emitted hreflang group`,
      );
    }
    if (PRIVATE_ROUTE_IDS.includes(pageId) && status === 'PUBLISHED_PAIR') {
      add('IA-040', `${pageId}:${locale} private page cannot be a published hreflang pair`);
    }
    if (
      normalizeCanonical(item.canonicalPolicy) !== normalizeCanonical(canonicalRow.canonicalPolicy)
    ) {
      add(
        'IA-067',
        `${pageId}:${locale} metadata canonical policy disagrees with the canonical dataset`,
      );
    }
  }

  // -------------------------------------------------------- internal link graph
  const graph = byName('internal-link-graph');
  const edges = itemsOf(graph, 'items', 'edges', 'records');
  const edgeIds = new Set();
  const outgoing = new Map();
  const incoming = new Map();
  for (const edge of edges) {
    const edgeId = edge.edgeId ?? edge.id;
    if (!edgeId) add('IA-051', 'link edge without edgeId');
    else if (edgeIds.has(edgeId)) add('IA-051', `duplicate edgeId ${edgeId}`);
    else edgeIds.add(edgeId);
    for (const routeId of [edge.fromRouteId, edge.toRouteId]) {
      if (!routeIds.has(routeId)) add('IA-051', `${edgeId} unknown route ${routeId}`);
    }
    if (!edge.linkType) add('IA-051', `${edgeId} missing linkType`);
    if (!outgoing.has(edge.fromRouteId)) outgoing.set(edge.fromRouteId, new Set());
    outgoing.get(edge.fromRouteId).add(edge.toRouteId);
    if (!incoming.has(edge.toRouteId)) incoming.set(edge.toRouteId, new Set());
    incoming.get(edge.toRouteId).add(edge.fromRouteId);
    const targetProposed = PROPOSED_ROUTES[edge.toRouteId];
    if (targetProposed) {
      if (edge.targetStatus !== PROPOSED_STATUS)
        add('IA-052', `${edgeId} proposed target must be ${PROPOSED_STATUS}`);
      if (edge.plannedNotLive !== true)
        add('IA-052', `${edgeId} link to blocked proposed route is marked live`);
      if (
        CURRENT_ROUTE_IDS.includes(edge.fromRouteId) &&
        ['PRIMARY_NAV', 'SECONDARY_NAV', 'FOOTER'].includes(edge.linkType)
      ) {
        add('IA-052', `${edgeId} live navigation must not expose a blocked proposed route`);
      }
    }
    if (!targetProposed && edge.targetStatus && edge.targetStatus !== 'LIVE_EXISTING') {
      add('IA-051', `${edgeId} unexpected targetStatus ${edge.targetStatus}`);
    }
  }
  const reachable = new Set(['mareaOverview']);
  const queue = ['mareaOverview'];
  while (queue.length) {
    const current = queue.shift();
    for (const next of outgoing.get(current) ?? []) {
      if (reachable.has(next)) continue;
      if (PROPOSED_ROUTES[next]) {
        reachable.add(next);
        queue.push(next);
      }
    }
  }
  for (const routeId of PROPOSED_ROUTE_IDS) {
    if (!reachable.has(routeId)) add('IA-053', `orphan proposed page ${routeId}`);
    if (!incoming.has(routeId)) add('IA-053', `proposed page ${routeId} has no incoming link`);
  }
  for (const routeId of CURRENT_ROUTE_IDS) {
    if (PRIVATE_ROUTE_IDS.includes(routeId)) continue;
    if (!incoming.has(routeId) && routeId !== 'home')
      add('IA-053', `existing page ${routeId} is orphaned`);
  }
  const parents = new Map();
  for (const item of metadataItems) {
    const pageId = item.pageId ?? item.routeId;
    if (item.breadcrumbParent) parents.set(pageId, item.breadcrumbParent);
  }
  for (const [pageId, parent] of parents) {
    const seen = new Set([pageId]);
    let current = parent;
    let depth = 1;
    while (current) {
      if (seen.has(current)) {
        add('IA-054', `breadcrumb cycle involving ${pageId}`);
        break;
      }
      seen.add(current);
      if (depth > 4) add('IA-054', `breadcrumb depth > 4 for ${pageId}`);
      current = parents.get(current);
      depth += 1;
    }
  }

  // ---------------------------------------------------------- publication gates
  const publication = byName('publication-gates');
  const gateItems = itemsOf(publication, 'items', 'gates');
  const seenGates = new Set();
  for (const gate of gateItems) {
    const gateId = gate.gateId ?? gate.id;
    if (!GATE_IDS.includes(gateId)) add('IA-055', `unknown publication gate ${gateId}`);
    else if (seenGates.has(gateId)) add('IA-055', `duplicate publication gate ${gateId}`);
    else seenGates.add(gateId);
    if (gate.sourceStatus === 'CLOSED_VERIFIED') {
      add('IA-056', `${gateId} cannot be closed in MC-15`);
    }
  }
  for (const gateId of GATE_IDS) {
    if (!seenGates.has(gateId)) add('IA-055', `publication gate not consumed: ${gateId}`);
  }
  try {
    const sourceGates = JSON.parse(
      readFileSync(
        join(root, 'docs/marea/legal-commercial/data/release-evidence-gates.json'),
        'utf8',
      ),
    );
    const sourceByGate = new Map(sourceGates.gates.map((gate) => [gate.gateId, gate]));
    for (const gate of gateItems) {
      const source = sourceByGate.get(gate.gateId ?? gate.id);
      if (source && gate.sourceStatus && gate.sourceStatus !== source.status) {
        add('IA-056', `${gate.gateId} source status changed from ${source.status}`);
      }
    }
  } catch {
    add('IA-056', 'could not verify gate statuses against the MC-14 source');
  }
  const documents = itemsOf(publication, 'documents', 'requiredDocuments');
  const documentIds = new Set(documents.map((document) => document.documentId ?? document.id));
  for (const documentId of DOCUMENT_IDS) {
    if (!documentIds.has(documentId))
      add('IA-055', `required legal document not consumed: ${documentId}`);
  }
  const matrix = itemsOf(publication, 'routeGateMatrix', 'matrix');
  const matrixIds = new Set();
  for (const row of matrix) {
    const routeId = row.routeId;
    if (!PROPOSED_ROUTES[routeId]) {
      if (!CURRENT_ROUTE_IDS.includes(routeId)) add('IA-057', `matrix unknown routeId ${routeId}`);
      continue;
    }
    matrixIds.add(routeId);
    if (row.routeDefined !== true) add('IA-057', `${routeId} routeDefined must be true`);
    for (const field of [
      'implementationReady',
      'publicationAuthorized',
      'indexationAuthorized',
      'commercialTransactionAuthorized',
    ]) {
      if (row[field] !== false) add('IA-057', `${routeId} ${field} must be false`);
    }
    if (asArray(row.blockingGateIds).length === 0)
      add('IA-057', `${routeId} has no blocking gates`);
    for (const gate of asArray(row.blockingGateIds)) {
      if (!GATE_IDS.includes(gate)) add('IA-057', `${routeId} unknown gate ${gate}`);
    }
  }
  for (const routeId of PROPOSED_ROUTE_IDS) {
    if (!matrixIds.has(routeId)) add('IA-057', `route gate matrix missing ${routeId}`);
  }
  const registryById = new Map(
    proposedItems.filter((item) => item.routeId).map((item) => [item.routeId, item]),
  );
  const iaByRoute = new Map(
    iaNodes.filter((node) => node.routeId).map((node) => [node.routeId, node]),
  );
  for (const row of matrix) {
    if (!PROPOSED_ROUTES[row.routeId]) continue;
    const registryRoute = registryById.get(row.routeId);
    const iaNode = iaByRoute.get(row.routeId);
    const canonical = [...asArray(row.blockingGateIds)].sort().join('|');
    if (!registryRoute) {
      add('IA-068', `proposed-routes lacks ${row.routeId}`);
      continue;
    }
    if ([...asArray(registryRoute.blockingGateIds)].sort().join('|') !== canonical) {
      add('IA-068', `${row.routeId} proposed-routes blocking gates diverge from the route matrix`);
    }
    if (iaNode && [...asArray(iaNode.blockingGateIds)].sort().join('|') !== canonical) {
      add('IA-068', `${row.routeId} proposed-ia blocking gates diverge from the route matrix`);
    }
  }

  // -------------------------------------------------------- website remediation
  const remediation = byName('website-remediation');
  const remediationItems = itemsOf(remediation, 'items', 'findings');
  const findingIds = new Set();
  for (const item of remediationItems) {
    const findingId = item.findingId ?? item.id;
    if (!FINDING_IDS.includes(findingId))
      add('IA-058', `unknown or duplicate finding ${findingId}`);
    else if (findingIds.has(findingId)) add('IA-058', `duplicate finding ${findingId}`);
    else findingIds.add(findingId);
    if (item.originalStatus !== 'NOT_REMEDIATED') {
      add('IA-059', `${findingId} originalStatus must stay NOT_REMEDIATED`);
    }
    if (!['PLANNED_NOT_REMEDIATED', 'OWNER_ASSIGNED_NOT_REMEDIATED'].includes(item.status)) {
      add('IA-059', `${findingId} may not be closed in MC-15 (${item.status})`);
    }
    for (const field of [
      'currentFile',
      'currentRoute',
      'severity',
      'recommendedAction',
      'futureImplementationOwner',
      'requiredEvidence',
      'publicationGate',
      'plannedMilestone',
    ]) {
      if (!item[field]) add('IA-058', `${findingId} missing ${field}`);
    }
    if (!GATE_IDS.includes(item.publicationGate)) {
      add('IA-058', `${findingId} unknown publicationGate ${item.publicationGate}`);
    }
  }
  for (const findingId of FINDING_IDS) {
    if (!findingIds.has(findingId)) add('IA-058', `finding not covered: ${findingId}`);
  }
  try {
    const sourceFindings = JSON.parse(
      readFileSync(join(root, 'docs/marea/legal-commercial/data/website-findings.json'), 'utf8'),
    );
    const sourceById = new Map(
      sourceFindings.findings.map((finding) => [finding.findingId, finding]),
    );
    for (const item of remediationItems) {
      const source = sourceById.get(item.findingId);
      if (!source) {
        add('IA-059', `${item.findingId} does not exist in the MC-14 source`);
        continue;
      }
      if (item.severity !== source.severity) {
        add('IA-059', `${item.findingId} severity changed from the MC-14 source`);
      }
      if (item.currentFile !== source.file) {
        add('IA-059', `${item.findingId} source file changed from the MC-14 source`);
      }
      if (item.currentRoute !== source.route) {
        add('IA-059', `${item.findingId} source route changed from the MC-14 source`);
      }
    }
  } catch {
    add('IA-059', 'could not verify findings against the MC-14 source');
  }

  // ----------------------------------------------------------- migration phases
  const phases = byName('migration-phases');
  const phaseItems = itemsOf(phases, 'items', 'phases');
  const phaseIds = new Set();
  for (const phase of phaseItems) {
    const phaseId = phase.phaseId ?? phase.id;
    if (!phaseId) add('IA-060', 'phase without phaseId');
    else if (phaseIds.has(phaseId)) add('IA-060', `duplicate phase ${phaseId}`);
    else phaseIds.add(phaseId);
    if (phase.executionStatus !== 'NOT_EXECUTED') add('IA-060', `${phaseId} must be NOT_EXECUTED`);
    if (phase.authorizationRequired !== true)
      add('IA-060', `${phaseId} authorizationRequired must be true`);
    for (const field of ['objective', 'entryCriteria', 'exitCriteria']) {
      if (!phase[field]) add('IA-060', `${phaseId} missing ${field}`);
    }
  }
  if (phaseItems.length < 7) add('IA-060', 'migration plan needs phases 0-6');

  // -------------------------------------------------------------- risk register
  const risk = byName('risk-register');
  const risks = itemsOf(risk, 'items', 'risks');
  const riskIds = new Set();
  for (const item of risks) {
    const riskId = item.riskId ?? item.id;
    if (!riskId) add('IA-061', 'risk without riskId');
    else if (riskIds.has(riskId)) add('IA-061', `duplicate risk ${riskId}`);
    else riskIds.add(riskId);
    for (const field of [
      'description',
      'likelihood',
      'impact',
      'severity',
      'mitigation',
      'rollbackTrigger',
      'owner',
    ]) {
      if (!item[field]) add('IA-061', `${riskId} missing ${field}`);
    }
    if (!['OPEN', 'PLANNED_MITIGATION', 'CLOSED'].includes(item.status)) {
      add('IA-061', `${riskId} invalid status ${item.status}`);
    }
    if (item.status === 'CLOSED' && !item.evidence)
      add('IA-061', `${riskId} closed without evidence`);
  }
  if (risks.length < 15) add('IA-061', 'risk register needs at least 15 risks');

  // ------------------------------------------------------------- MC-16 handoff
  const handoff = byName('mc16-handoff-inputs');
  if (handoff.MC16_STARTED !== false) add('IA-062', 'MC16_STARTED must be false');
  if (!/^READY|PARTIAL|BLOCKED/.test(nice(handoff.handoffStatus))) {
    add('IA-062', 'handoffStatus must be a truthful readiness state');
  }
  const familyIds = new Set(asArray(handoff.familyIds).map((value) => nice(value).toUpperCase()));
  for (const family of FAMILY_IDS)
    if (!familyIds.has(family)) add('IA-062', `handoff missing family ${family}`);
  const bundleIds = new Set(asArray(handoff.bundleIds).map((value) => nice(value).toUpperCase()));
  for (const bundle of BUNDLE_IDS)
    if (!bundleIds.has(bundle)) add('IA-062', `handoff missing bundle ${bundle}`);
  const editionIds = new Set(asArray(handoff.editionIds).map((value) => nice(value).toUpperCase()));
  for (const edition of EDITION_IDS)
    if (!editionIds.has(edition)) add('IA-062', `handoff missing edition ${edition}`);
  for (const field of [
    'routeIdentities',
    'localeAndSlugMappings',
    'pageVsSkuIdentity',
    'lifecycleFields',
    'commercialGates',
    'seoPublicationEligibility',
    'structuredDataRestrictions',
    'priceAndStockProvenance',
    'entitlementReferences',
    'openDependencies',
  ]) {
    const value = handoff[field];
    const empty =
      value === undefined ||
      value === null ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0);
    if (empty) add('IA-062', `handoff missing ${field}`);
  }
  if (/"price"\s*:\s*\d/.test(JSON.stringify(handoff)))
    add('IA-062', 'handoff contains a numeric price');

  // ------------------------------------------------------------------- manifest
  const manifest = byName('manifest');
  const manifestDatasets = itemsOf(manifest, 'datasets', 'items');
  const manifestNames = new Set(manifestDatasets.map((item) => item.name ?? item.file));
  for (const name of DATASETS) {
    if (name === 'manifest') continue;
    if (!manifestNames.has(name) && !manifestNames.has(`${name}.json`)) {
      add('IA-063', `manifest missing dataset ${name}`);
    }
  }
  if (manifest.sourceCommit !== SOURCE_COMMIT) add('IA-063', 'manifest sourceCommit mismatch');
  if (manifest.MC16_STARTED === true) add('IA-062', 'manifest records MC-16 as started');

  // --------------------------------------------------------- published-state use
  for (const item of currentItems) {
    if (!item.routeId) continue;
    const state = nice(item.publicationState ?? item.status).toUpperCase();
    if (state === 'PUBLISHED' && ADMIN_ROUTE_IDS.includes(item.routeId)) {
      add('IA-064', `admin route ${item.routeId} cannot be PUBLISHED`);
    }
  }
  for (const item of proposedItems) {
    const state = nice(item.publicationStatus ?? item.status).toUpperCase();
    if (state === 'PUBLISHED' || state === 'LIVE')
      add('IA-064', `${item.routeId} incorrectly published`);
  }

  // --------------------------------------------------- duplicate ES/EN components
  try {
    const routesSource = readFileSync(join(root, 'src/app/app.routes.ts'), 'utf8');
    if (/loadComponent:\s*\(\)\s*=>\s*import\([^)]*\.en['"]/.test(routesSource)) {
      add('IA-065', 'app.routes.ts imports a duplicate EN component implementation');
    }
  } catch {
    add('IA-065', 'app.routes.ts could not be read for duplicate-component check');
  }

  // ------------------------------------------- forbidden search-console claims
  // SEARCH_CONSOLE_VERIFIED is allowed only through the validated evidence dataset;
  // the forbidden token remains GOOGLE_INDEXED, which no dataset may use.
  const serialized = JSON.stringify(data);
  if (/GOOGLE_INDEXED/.test(serialized)) add('IA-018', 'dataset claims GOOGLE_INDEXED');

  return errors;
}

function main() {
  const rootIndex = process.argv.indexOf('--root');
  const root = rootIndex === -1 ? process.cwd() : resolve(process.argv[rootIndex + 1]);
  const data = loadData(root);
  const errors = validateData(data, { root });
  if (errors.length) {
    console.error(`MC-15 IA/SEO validation failed with ${errors.length} issue(s):`);
    for (const error of errors) console.error(`  ${error.code} ${error.message}`);
    process.exitCode = 1;
    return;
  }
  console.log(
    `MC-15 IA/SEO validation passed: ${DATASETS.length} datasets, ${CURRENT_ROUTE_IDS.length} current routes, ${PROPOSED_ROUTE_IDS.length} proposed routes, ${FINDING_IDS.length} findings, ${GATE_IDS.length} gates.`,
  );
}

if (
  import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}` ||
  process.argv[1]?.endsWith('check-marea-ia-seo.mjs')
) {
  main();
}
