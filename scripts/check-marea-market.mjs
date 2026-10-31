#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Deterministic market-research evidence validator for MC-09 (MAREA).
 *
 * It validates the machine-readable research contract under
 * `docs/marea/market-validation/data/` and the research documents against the
 * canonical product/bundle contracts. It never makes a network request, never
 * scans `src/` and adds no dependency: plain node, offline, Windows/Linux.
 *
 * What it refuses:
 * - claims without resolvable sources, duplicate or broken IDs
 * - observed prices without currency/tax treatment, inferred prices labelled observed
 * - TCO totals that hide unknown costs or treat UNKNOWN as zero
 * - market-size figures without derivation/source and SOM without assumptions
 * - interview/fieldwork claims (MC-09 performs no fieldwork)
 * - hypotheses presented as empirical findings, stale sources as current facts
 * - non-canonical product/bundle IDs or weakened governance restrictions
 * - tested/supported compatibility claims, guaranteed alerts, remote helm control
 * - scores without frozen weights or that do not recompute
 *
 * Usage:
 *   node scripts/check-marea-market.mjs [--root <dir>] [--json]
 *
 * Exit code 0 = every check passed, 1 = at least one check failed.
 */

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = resolve(SCRIPT_DIR, '..');

const MV = 'docs/marea/market-validation';
const DATA = `${MV}/data`;

const CANONICAL_FAMILIES = [
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
const CANONICAL_BUNDLES = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'];
const CANONICAL_BUNDLE_LABEL = {
  START: 'START',
  CRUISE: 'CRUISE',
  SAIL: 'SAIL',
  PROTECT: 'PROTECT',
  COMPLETE: 'COMPLETE',
  FLEET: 'FLEET package',
};

const EVIDENCE_CLASSES = [
  'PRIMARY_OFFICIAL',
  'PRIMARY_RETAILER',
  'SECONDARY_INDEPENDENT',
  'PUBLIC_CUSTOMER_SIGNAL',
  'MODEL_DERIVED',
  'HYPOTHESIS',
  'UNKNOWN',
  'CONTRADICTED',
  'STALE',
  'INACCESSIBLE',
];
const SOURCE_TYPES = [
  'PRIMARY_OFFICIAL',
  'PRIMARY_RETAILER',
  'SECONDARY_INDEPENDENT',
  'PUBLIC_CUSTOMER_SIGNAL',
  'MODEL_DERIVED',
  'HYPOTHESIS',
  'UNKNOWN',
];
const CONFIDENCE = ['HIGH', 'MEDIUM', 'LOW', 'UNKNOWN'];
const SOURCE_STATUS = ['OK', 'STALE', 'INACCESSIBLE', 'CONTRADICTED'];
const DECISION_CATEGORIES = [
  'PRIORITIZE_FOR_CUSTOMER_VALIDATION',
  'FURTHER_RESEARCH_REQUIRED',
  'LONG_TERM_OPPORTUNITY',
  'DEFER',
  'RECONSIDER_PRODUCT_STRATEGY',
  'INSUFFICIENT_EVIDENCE',
];
const READINESS_STATES = ['NOT_READY', 'BLOCKED', 'INTERNAL_ONLY_DEFINED'];
const PRODUCT_SCOPE_ALLOWED = new Set([
  ...CANONICAL_FAMILIES,
  ...CANONICAL_BUNDLES,
  'GENERAL',
  'BUNDLES',
  'MARKET',
  'RESEARCH_METHOD',
]);

const REQUIRED_DOCS = [
  'MC09-RESEARCH-SCOPE.md',
  'MC09-SOURCE-REGISTER.md',
  'MC09-COMPETITIVE-POSITIONING.md',
  'MC09-PORTFOLIO-PRIORITIZATION.md',
  'MC09-VALIDATION-EXPERIMENTS.md',
  'MC09-DECISION-REGISTER.md',
  'MC-09-DELIVERY.md',
  'MC09-EXECUTIVE-REPORT.md',
  'market/MC09-MARINE-MARKET-ASSESSMENT.md',
  'market/MC09-GEOGRAPHIC-PRIORITIZATION.md',
  'market/MC09-MARKET-SIZING.md',
  'competitors/MC09-COMPETITOR-LANDSCAPE.md',
  'competitors/MC09-PRODUCT-BENCHMARKS.md',
  'competitors/MC09-BUNDLE-BENCHMARKS.md',
  'competitors/MC09-COMPETITOR-PRICING.md',
  'buyers/MC09-BUYER-SEGMENTS.md',
  'buyers/MC09-PUBLIC-CUSTOMER-EVIDENCE.md',
  'buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md',
  'channels/MC09-SEARCH-AND-DEMAND-SIGNALS.md',
  'channels/MC09-DISTRIBUTION-STRATEGY.md',
  'economics/MC09-PRICING-AND-WTP.md',
  'economics/MC09-CUSTOMER-TCO.md',
  'economics/MC09-COMMERCIAL-ECONOMICS.md',
];

const REQUIRED_DATA_FILES = [
  'governance-status.json',
  'manifest.json',
  'evidence-market.json',
  'evidence-competitors.json',
  'evidence-buyers.json',
  'evidence-economics.json',
  'evidence-channels.json',
  'evidence-mc10.json',
  'market-inputs.json',
  'geo-assessments.json',
  'competitor-observations.json',
  'price-observations.json',
  'buyer-segments.json',
  'public-signals.json',
  'tco-models.json',
  'wtp-hypotheses.json',
  'channel-assessments.json',
  'search-signals.json',
  'validation-experiments.json',
  'product-assessments.json',
  'bundle-assessments.json',
  'decision-links.json',
];

const GOVERNANCE_INVARIANTS = {
  trademarkLegalClearance: 'NOT_GRANTED',
  sourceIpClearance: 'NOT_CLEARED',
  customerDemandEmpiricallyValidated: 'NO',
  willingnessToPayEmpiricallyValidated: 'NO',
  productProfitabilityEstablished: 'NO',
  commercialPublication: 'BLOCKED',
  productSales: 'BLOCKED',
  productionDeployment: 'NOT_AUTHORIZED',
  customerOutreach: 'NOT_AUTHORIZED',
  paidResearch: 'NOT_AUTHORIZED',
  remoteHelmControl: 'PROHIBITED',
};

/** Positive commercialization/safety claims that MC-09 must never make. */
const PROHIBITED_CLAIMS = [
  {
    id: 'trademark-granted',
    re: /trademark (?:is )?(?:legally )?cleared|trademark clearance (?:=|is) (?:GRANTED|CLEARED)/i,
  },
  {
    id: 'source-ip-cleared',
    re: /source ip (?:is )?cleared|source ip clearance (?:=|is) (?:CLEARED|GRANTED)/i,
  },
  {
    id: 'nmea-certified',
    re: /(?:NMEA ?2000)[^.\n]{0,40}(?:is|are|be) certified|NMEA ?2000 certified/i,
    mareaScoped: true,
  },
  {
    id: 'remote-helm',
    re: /remote (?:helm|autonomous) (?:control|steering)|unattended PILOT operation/i,
  },
  { id: 'guaranteed-alert', re: /guaranteed (?:alert|delivery)|alert delivery is guaranteed/i },
  {
    id: 'ecdis',
    re: /ECDIS[- ]compliant|ECDIS compliance (?:is )?(?:met|achieved)/i,
    mareaScoped: true,
  },
  {
    id: 'for-sale',
    re: /(?:is|are) (?:now )?(?:available for sale|purchasable|orderable|on sale)/i,
  },
  {
    id: 'approved-price',
    re: /(?<!un)approved (?:bundle )?price[s]? (?:is|are|=)|price (?:is|was) approved/i,
  },
  {
    id: 'fieldwork',
    re: /\bwe (?:conducted|performed|ran) (?:\d+ )?interviews\b|\binterview count[:=]\s*\d+|respondents \(n=\d+/i,
  },
];
/** Negation tokens that make a prohibited phrase non-assertive within its clause. */
const NEGATION_TOKENS =
  /\b(?:no|not|never|none|nothing|nobody|without|cannot|can't|isn't|aren't|blocked|prohibited|unavailable|unauthori[sz]ed|neither|nor|n't)\b/i;

function buildRunner(root) {
  const checks = [];
  const jsonCache = new Map();

  const abs = (p) => resolve(root, p);
  const read = (p) => readFileSync(abs(p), 'utf8');
  const exists = (p) => existsSync(abs(p));

  function readJson(rel) {
    if (!jsonCache.has(rel)) {
      jsonCache.set(rel, JSON.parse(read(rel)));
    }
    return jsonCache.get(rel);
  }
  function tryJson(rel) {
    try {
      return { ok: true, value: readJson(rel) };
    } catch (error) {
      return { ok: false, error };
    }
  }
  function require(condition, message) {
    if (!condition) throw new Error(message);
  }
  function check(id, description, fn) {
    try {
      fn();
      checks.push({ id, description, status: 'PASS', detail: '' });
    } catch (error) {
      checks.push({ id, description, status: 'FAIL', detail: error.message });
    }
  }
  function isIsoDate(value) {
    return (
      typeof value === 'string' &&
      /^\d{4}-\d{2}-\d{2}$/.test(value) &&
      !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
    );
  }
  /** A publication date may be known only to the year; the access date may not. */
  function isKnownDate(value) {
    if (typeof value !== 'string') return false;
    if (/^\d{4}$/.test(value)) return true;
    if (/^\d{4}-\d{2}$/.test(value)) return !Number.isNaN(Date.parse(`${value}-01T00:00:00Z`));
    return isIsoDate(value);
  }
  function isHttpUrl(value) {
    if (typeof value !== 'string') return false;
    try {
      const url = new URL(value);
      return (url.protocol === 'http:' || url.protocol === 'https:') && url.hostname.includes('.');
    } catch {
      return false;
    }
  }
  function normUrl(value) {
    try {
      const url = new URL(value);
      url.hash = '';
      return `${url.origin}${url.pathname}`.replace(/\/+$/, '').toLowerCase();
    } catch {
      return String(value || '').toLowerCase();
    }
  }
  function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
  }
  /** A field is substantive if it is a non-empty string or a non-empty object. */
  function isSubstantive(value) {
    if (isNonEmptyString(value)) return true;
    return value !== null && typeof value === 'object' && Object.keys(value).length > 0;
  }
  function isNonEmptyArray(value) {
    return Array.isArray(value) && value.length > 0;
  }
  function isFiniteNumber(value) {
    return typeof value === 'number' && Number.isFinite(value);
  }
  function closeTo(a, b, tolerance = 0.011) {
    return isFiniteNumber(a) && isFiniteNumber(b) && Math.abs(a - b) <= tolerance;
  }

  // ---------------------------------------------------------------- loading
  const dataFiles = exists(DATA)
    ? readdirSync(abs(DATA))
        .filter((name) => name.endsWith('.json'))
        .sort()
    : [];
  const evidenceFiles = dataFiles.filter((name) => /^evidence-.*\.json$/.test(name));

  function loadEvidence() {
    const sources = new Map();
    const claims = new Map();
    const duplicates = { sourceIds: [], claimIds: [] };
    for (const file of evidenceFiles) {
      const result = tryJson(`${DATA}/${file}`);
      if (!result.ok) continue;
      const value = result.value;
      for (const source of value.sources || []) {
        if (sources.has(source.sourceId)) duplicates.sourceIds.push(source.sourceId);
        else sources.set(source.sourceId, { ...source, _file: file });
      }
      for (const claim of value.claims || []) {
        if (claims.has(claim.claimId)) duplicates.claimIds.push(claim.claimId);
        else claims.set(claim.claimId, { ...claim, _file: file });
      }
    }
    return { sources, claims, duplicates };
  }

  let evidenceCache = null;
  function evidence() {
    if (!evidenceCache) evidenceCache = loadEvidence();
    return evidenceCache;
  }

  function resolveClaims(ids, label) {
    const { claims } = evidence();
    require(isNonEmptyArray(ids), `${label}: evidenceClaimIds must be a non-empty array`);
    for (const id of ids) {
      require(claims.has(id), `${label}: unresolved claim reference ${id}`);
    }
  }

  // ---------------------------------------------------------------- checks
  check('MK-01', 'All required MC-09 research documents exist', () => {
    const missing = REQUIRED_DOCS.filter((doc) => !exists(`${MV}/${doc}`));
    require(missing.length === 0, `missing documents: ${missing.join(', ')}`);
  });

  check('MK-02', 'All required machine-readable data files exist and parse as JSON', () => {
    require(exists(DATA), 'data directory missing');
    const missing = REQUIRED_DATA_FILES.filter((file) => !exists(`${DATA}/${file}`));
    require(missing.length === 0, `missing data files: ${missing.join(', ')}`);
    const broken = [];
    for (const file of dataFiles) {
      const result = tryJson(`${DATA}/${file}`);
      if (!result.ok) broken.push(`${file}: ${result.error.message}`);
    }
    require(broken.length === 0, `unparsable JSON: ${broken.join('; ')}`);
  });

  check('MK-03', 'Data manifest lists every data file with an owner and scope', () => {
    const manifest = readJson(`${DATA}/manifest.json`);
    require(manifest.milestone === 'MC-09', 'manifest milestone must be MC-09');
    require(isNonEmptyArray(manifest.files), 'manifest.files must be a non-empty array');
    const listed = new Map();
    for (const entry of manifest.files) {
      require(isNonEmptyString(entry.path), 'manifest entry without path');
      const path = entry.path.replace(/^data\//, '');
      require(exists(`${DATA}/${path}`), `manifest lists missing file ${entry.path}`);
      require(isNonEmptyString(entry.owner), `manifest entry ${entry.path} lacks owner`);
      require(isNonEmptyString(entry.purpose), `manifest entry ${entry.path} lacks purpose`);
      require(!listed.has(path), `manifest duplicates ${entry.path}`);
      listed.set(path, entry);
    }
    const unlisted = dataFiles.filter((file) => file !== 'manifest.json' && !listed.has(file));
    require(unlisted.length === 0, `data files missing from manifest: ${unlisted.join(', ')}`);
    const authoritative = manifest.files.filter((entry) =>
      /^(governance-status|product-assessments|bundle-assessments|decision-links)\.json$/.test(
        entry.path.replace(/^data\//, ''),
      ),
    );
    require(authoritative.length >=
      4, 'manifest must mark governance, product/bundle assessments and decision links');
    for (const entry of authoritative) {
      require(entry.owner === 'lead', `authoritative file ${entry.path} must be owned by lead`);
    }
  });

  check('MK-04', 'Governance status invariant is intact', () => {
    const governance = readJson(`${DATA}/governance-status.json`);
    require(governance.milestone === 'MC-09', 'governance-status milestone must be MC-09');
    for (const [key, expected] of Object.entries(GOVERNANCE_INVARIANTS)) {
      require(governance.statuses[key] ===
        expected, `${key} must be ${expected}, found ${JSON.stringify(governance.statuses[key])}`);
    }
    require(governance.statuses.productsForSale === 0, 'productsForSale must be 0');
    require(governance.statuses.productsForSale !== undefined, 'productsForSale missing');
    for (const status of [
      'nmea2000Certified',
      'ecdisClaimed',
      'chartRightsGranted',
      'dataProviderRightsGranted',
      'slaEstablished',
      'instantAlertGuarantee',
      'sensorAccuracyClaimed',
      'hardwareIncludedInFleetByDefault',
    ]) {
      require(governance.statuses[status] === false, `${status} must be false`);
    }
    require(JSON.stringify(governance.canonicalProducts) ===
      JSON.stringify(CANONICAL_FAMILIES), 'canonicalProducts must be the canonical nine in order');
    require(JSON.stringify(governance.canonicalBundles) ===
      JSON.stringify(CANONICAL_BUNDLES), 'canonicalBundles must be the canonical six in order');
  });

  check(
    'MK-05',
    'Evidence files declare the MC-09 contract, a workstream and at least one source and claim',
    () => {
      require(evidenceFiles.length >=
        6, `expected at least six evidence files, found ${evidenceFiles.length}`);
      const workstreams = new Set();
      for (const file of evidenceFiles) {
        const value = readJson(`${DATA}/${file}`);
        require(value.contractId ===
          'MAREA-MC09-RESEARCH-CONTRACT', `${file}: contractId must be MAREA-MC09-RESEARCH-CONTRACT`);
        require(value.milestone === 'MC-09', `${file}: milestone must be MC-09`);
        require(isNonEmptyString(value.workstream), `${file}: workstream missing`);
        workstreams.add(value.workstream);
        require(isNonEmptyArray(value.sources), `${file}: sources must be a non-empty array`);
        require(isNonEmptyArray(value.claims), `${file}: claims must be a non-empty array`);
      }
      const expected = ['market', 'competitors', 'buyers', 'economics', 'channels', 'mc10'];
      const missing = expected.filter(
        (name) =>
          ![...workstreams].some(
            (worked) => worked === name || (name === 'mc10' && worked.startsWith('mc10')),
          ),
      );
      require(missing.length === 0, `missing workstreams: ${missing.join(', ')}`);
    },
  );

  check('MK-06', 'Evidence and claim IDs are unique and every URL is cited once', () => {
    const { sources, claims, duplicates } = evidence();
    require(duplicates.sourceIds.length ===
      0, `duplicate sourceIds: ${[...new Set(duplicates.sourceIds)].join(', ')}`);
    require(duplicates.claimIds.length ===
      0, `duplicate claimIds: ${[...new Set(duplicates.claimIds)].join(', ')}`);
    require(sources.size >= 20, `expected at least 20 distinct sources, found ${sources.size}`);
    const urlOwners = new Map();
    for (const source of sources.values()) {
      if (!isHttpUrl(source.url)) continue;
      const key = normUrl(source.url);
      if (urlOwners.has(key)) {
        throw new Error(
          `source URL cited more than once (inflates source count): ${source.url} used by ${urlOwners.get(key)} and ${source.sourceId}`,
        );
      }
      urlOwners.set(key, source.sourceId);
    }
    require(claims.size >= 20, `expected at least 20 distinct claims, found ${claims.size}`);
  });

  check('MK-07', 'Every source record has the mandatory auditable fields', () => {
    const { sources } = evidence();
    for (const source of sources.values()) {
      const where = `${source._file}:${source.sourceId}`;
      require(/^SRC-(MKT|CMP|BUY|ECO|CHN|MC10)-\d{3}$/.test(
        source.sourceId,
      ), `${where}: sourceId must match SRC-<scope>-###`);
      require(isNonEmptyString(source.title), `${where}: title missing`);
      require(isNonEmptyString(source.publisher), `${where}: publisher missing`);
      require(SOURCE_TYPES.includes(
        source.sourceType,
      ), `${where}: invalid sourceType ${source.sourceType}`);
      require(isHttpUrl(source.url), `${where}: url must be an absolute http(s) URL`);
      require(source.publishedAt === null ||
        isKnownDate(source.publishedAt), `${where}: publishedAt must be null, ISO date or a year`);
      require(isIsoDate(source.retrievedAt), `${where}: retrievedAt must be an ISO date`);
      require(isNonEmptyString(source.geographicScope), `${where}: geographicScope missing`);
      require(isNonEmptyString(source.language), `${where}: language missing`);
      require(EVIDENCE_CLASSES.includes(
        source.evidenceClass,
      ), `${where}: invalid evidenceClass ${source.evidenceClass}`);
      require(CONFIDENCE.includes(
        source.confidence,
      ), `${where}: invalid confidence ${source.confidence}`);
      require(SOURCE_STATUS.includes(source.status), `${where}: invalid status ${source.status}`);
      require(isNonEmptyString(
        source.limitations,
      ), `${where}: limitations must state what the source cannot establish`);
    }
  });

  check('MK-08', 'Every claim resolves to sources and uses canonical scopes', () => {
    const { claims } = evidence();
    for (const claim of claims.values()) {
      const where = `${claim._file}:${claim.claimId}`;
      require(/^CLM-(MKT|CMP|BUY|ECO|CHN|MC10)-\d{3}$/.test(
        claim.claimId,
      ), `${where}: claimId must match CLM-<scope>-###`);
      require(isNonEmptyString(claim.claimText) &&
        claim.claimText.length >= 15 &&
        claim.claimText.length <= 600, `${where}: claimText must be a bounded sentence`);
      require(Array.isArray(claim.sourceIds), `${where}: sourceIds missing`);
      if (claim.sourceIds.length === 0) {
        // A fact that does not exist cannot have a source: only UNKNOWN/HYPOTHESIS
        // records may declare it, and they must name the missing evidence.
        require(['UNKNOWN', 'HYPOTHESIS'].includes(
          claim.evidenceClass,
        ), `${where}: only UNKNOWN/HYPOTHESIS claims may have no source`);
        require(isNonEmptyString(
          claim.limitations,
        ), `${where}: a claim without a source must name the missing evidence`);
      }
      for (const id of claim.sourceIds) {
        require(evidence().sources.has(id), `${where}: unresolved source reference ${id}`);
      }
      require(EVIDENCE_CLASSES.includes(
        claim.evidenceClass,
      ), `${where}: invalid evidenceClass ${claim.evidenceClass}`);
      require(CONFIDENCE.includes(
        claim.confidence,
      ), `${where}: invalid confidence ${claim.confidence}`);
      require(isNonEmptyArray(claim.productScope), `${where}: productScope missing`);
      for (const scope of claim.productScope) {
        require(PRODUCT_SCOPE_ALLOWED.has(scope), `${where}: non-canonical product scope ${scope}`);
      }
      require(isNonEmptyString(claim.geographicScope), `${where}: geographicScope missing`);
      require(isNonEmptyString(claim.limitations), `${where}: limitations missing`);
    }
  });

  check('MK-09', 'Stale or inaccessible sources cannot support high-confidence claims', () => {
    const { sources, claims } = evidence();
    for (const claim of claims.values()) {
      if (claim.confidence !== 'HIGH') continue;
      for (const id of claim.sourceIds) {
        const source = sources.get(id);
        if (!source) continue;
        require(source.status ===
          'OK', `${claim.claimId}: HIGH confidence cites ${source.status} source ${id}`);
      }
    }
  });

  check('MK-10', 'Hypotheses are never presented as high-confidence empirical findings', () => {
    const { claims } = evidence();
    for (const claim of claims.values()) {
      if (claim.evidenceClass !== 'HYPOTHESIS') continue;
      require(['LOW', 'UNKNOWN'].includes(
        claim.confidence,
      ), `${claim.claimId}: HYPOTHESIS claim must carry LOW/UNKNOWN confidence, found ${claim.confidence}`);
      const unmeasured =
        claim.observedValue === null ||
        claim.observedValue === undefined ||
        /hypothes|assumption|unknown|not[ _]tested|not[ _]measured|n\/a/i.test(
          String(claim.observedValue),
        );
      require(unmeasured, `${claim.claimId}: HYPOTHESIS must not present an observedValue as measurement`);
    }
  });

  check('MK-11', 'Product benchmarks cover all nine canonical families', () => {
    const doc = read(`${MV}/competitors/MC09-PRODUCT-BENCHMARKS.md`);
    for (const family of CANONICAL_FAMILIES) {
      const heading = new RegExp(`(?:^|\\n)#{1,4}[^\\n]*\\b${family}\\b`);
      require(heading.test(doc), `product benchmarks missing a section for ${family}`);
    }
  });

  check('MK-12', 'Bundle benchmarks cover all six canonical bundles', () => {
    const doc = read(`${MV}/competitors/MC09-BUNDLE-BENCHMARKS.md`);
    for (const bundle of CANONICAL_BUNDLES) {
      const heading = new RegExp(`(?:^|\\n)#{1,4}[^\\n]*\\b${bundle}\\b`);
      require(heading.test(doc), `bundle benchmarks missing a section for ${bundle}`);
    }
  });

  check('MK-13', 'Competitor observations are complete, canonical and price-transparent', () => {
    const file = readJson(`${DATA}/competitor-observations.json`);
    require(isNonEmptyArray(file.observations), 'observations must be a non-empty array');
    require(file.observations.length >=
      27, `expected at least 27 observations, found ${file.observations.length}`);
    const familiesSeen = new Set();
    const ids = new Set();
    for (const observation of file.observations) {
      const where = `competitor ${observation.obsId}`;
      require(/^OBS-[A-Z0-9-]+-\d{3,4}$/.test(observation.obsId || ''), `${where}: invalid obsId`);
      require(!ids.has(observation.obsId), `${where}: duplicate obsId`);
      ids.add(observation.obsId);
      for (const field of [
        'vendor',
        'product',
        'category',
        'customerSegment',
        'market',
        'sourceType',
        'availability',
        'comparisonConfidence',
        'missingEvidence',
        'researcher',
        'lastVerifiedAt',
        'capturedAt',
      ]) {
        require(observation[field] !== undefined &&
          observation[field] !== null &&
          observation[field] !== '', `${where}: ${field} missing`);
      }
      require(isHttpUrl(observation.manufacturerUrl) ||
        isHttpUrl(observation.retailerUrl), `${where}: needs a manufacturer or retailer URL`);
      require(observation.retailerUrl === null ||
        observation.retailerUrl === '' ||
        isHttpUrl(observation.retailerUrl), `${where}: retailerUrl must be null or URL`);
      require(SOURCE_TYPES.includes(observation.sourceType), `${where}: invalid sourceType`);
      require(isNonEmptyArray(observation.mareaFamilies), `${where}: mareaFamilies missing`);
      for (const family of observation.mareaFamilies) {
        require(CANONICAL_FAMILIES.includes(family), `${where}: non-canonical family ${family}`);
        familiesSeen.add(family);
      }
      if (observation.observedPrice !== null && observation.observedPrice !== undefined) {
        require(isFiniteNumber(
          observation.observedPrice,
        ), `${where}: observedPrice must be numeric or null`);
        require(isNonEmptyString(
          observation.currency,
        ), `${where}: observed price requires currency`);
        require(isNonEmptyString(
          observation.vatTreatment,
        ), `${where}: observed price requires vatTreatment`);
      } else {
        require(observation.currency === null ||
          isNonEmptyString(observation.currency), `${where}: currency must be null or text`);
      }
    }
    const missing = CANONICAL_FAMILIES.filter((family) => !familiesSeen.has(family));
    require(missing.length ===
      0, `observations never mention families: ${missing.join(', ')} (record an explicit gap instead)`);
  });

  check('MK-14', 'Observed prices carry currency, tax treatment and observation status', () => {
    const file = readJson(`${DATA}/price-observations.json`);
    require(isNonEmptyArray(file.prices), 'prices must be a non-empty array');
    const ids = new Set();
    for (const price of file.prices) {
      const where = `price ${price.priceId}`;
      require(/^PRC-[A-Z0-9-]+-\d{3,4}$/.test(price.priceId || ''), `${where}: invalid priceId`);
      require(!ids.has(price.priceId), `${where}: duplicate priceId`);
      ids.add(price.priceId);
      if (price.amount !== null && price.amount !== undefined) {
        require(isFiniteNumber(price.amount) &&
          price.amount >= 0, `${where}: amount must be a non-negative number`);
        require(/^[A-Z]{3}$/.test(
          price.currency || '',
        ), `${where}: currency must be an ISO-4217 code`);
        require(isNonEmptyString(price.vatTreatment), `${where}: vatTreatment missing`);
      }
      require(typeof price.observed === 'boolean', `${where}: observed flag must be explicit`);
      require(isNonEmptyString(price.priceType), `${where}: priceType missing`);
      require(isNonEmptyString(price.territory), `${where}: territory missing`);
      require(isNonEmptyString(price.sourceUrl), `${where}: sourceUrl missing`);
      require(price.capturedAt !== null &&
        price.capturedAt !== undefined, `${where}: capturedAt missing`);
      if (price.observed) {
        require(price.obsId === null ||
          price.obsId === undefined ||
          isNonEmptyString(price.obsId), `${where}: obsId invalid`);
        require(isHttpUrl(price.sourceUrl), `${where}: observed price needs a real source URL`);
      } else {
        require(price.priceType !== 'MANUFACTURER_LIST_PRICE' &&
          price.priceType !==
            'RETAILER_OFFER', `${where}: non-observed price cannot be typed as an observed offer`);
      }
    }
  });

  check('MK-15', 'TCO models exist for all six bundles and never hide unknown costs', () => {
    const file = readJson(`${DATA}/tco-models.json`);
    require(isNonEmptyArray(file.models), 'models must be a non-empty array');
    const seen = new Set();
    for (const model of file.models) {
      const isBundle = CANONICAL_BUNDLES.includes(model.subject);
      require(isBundle ||
        CANONICAL_FAMILIES.includes(
          model.subject,
        ), `model ${model.modelId}: non-canonical subject ${model.subject}`);
      if (isBundle) seen.add(model.subject);
      require(Array.isArray(model.components) &&
        model.components.length > 0, `model ${model.modelId}: no components`);
      let unknown = 0;
      let sum = 0;
      for (const component of model.components) {
        require(['OBSERVED', 'ASSUMED', 'UNKNOWN'].includes(
          component.basis,
        ), `model ${model.modelId}: invalid basis ${component.basis}`);
        require(isNonEmptyString(component.item), `model ${model.modelId}: component without item`);
        if (component.basis === 'UNKNOWN') {
          unknown += 1;
          require(component.amount ===
            null, `model ${model.modelId}: UNKNOWN component ${component.item} must have amount null, not ${component.amount}`);
        } else {
          require(isFiniteNumber(
            component.amount,
          ), `model ${model.modelId}: component ${component.item} needs a numeric amount`);
          sum += component.amount;
        }
      }
      require(['COMPLETE', 'INCOMPLETE', 'SCENARIO_DERIVED'].includes(
        model.completeness,
      ), `model ${model.modelId}: invalid completeness`);
      if (unknown > 0) {
        require(model.completeness !==
          'COMPLETE', `model ${model.modelId}: ${unknown} unknown components cannot yield a COMPLETE total`);
        require(isNonEmptyArray(
          model.unknowns,
        ), `model ${model.modelId}: unknown components must be named in unknowns[]`);
        require(model.year1Total === null ||
          model.year1Total ===
            undefined, `model ${model.modelId}: incomplete TCO must not publish a definitive year1Total`);
      }
      if (model.completeness === 'COMPLETE') {
        require(isFiniteNumber(model.year1Total) &&
          closeTo(
            model.year1Total,
            sum,
            0.02,
          ), `model ${model.modelId}: year1Total ${model.year1Total} does not equal component sum ${sum.toFixed(2)}`);
      }
      if (model.recurringAnnual !== null && model.recurringAnnual !== undefined) {
        require(isFiniteNumber(
          model.recurringAnnual,
        ), `model ${model.modelId}: recurringAnnual must be numeric or null`);
      }
    }
    const missing = CANONICAL_BUNDLES.filter((bundle) => !seen.has(bundle));
    require(missing.length === 0, `missing TCO models for bundles: ${missing.join(', ')}`);
  });

  check('MK-16', 'WTP hypotheses remain explicitly unmeasured', () => {
    const file = readJson(`${DATA}/wtp-hypotheses.json`);
    require(isNonEmptyArray(file.hypotheses), 'hypotheses must be a non-empty array');
    const subjects = new Set();
    for (const hypothesis of file.hypotheses) {
      require(hypothesis.status ===
        'NOT_MEASURED', `${hypothesis.wtpId}: MC-09 cannot claim measured WTP (${hypothesis.status})`);
      require(isNonEmptyString(hypothesis.method), `${hypothesis.wtpId}: method missing`);
      require(isNonEmptyString(
        hypothesis.instrumentRef,
      ), `${hypothesis.wtpId}: instrumentRef missing`);
      require(isNonEmptyString(hypothesis.limitations), `${hypothesis.wtpId}: limitations missing`);
      subjects.add(hypothesis.subject);
    }
    const missing = CANONICAL_BUNDLES.filter((bundle) => !subjects.has(bundle));
    require(missing.length === 0, `WTP hypotheses missing for bundles: ${missing.join(', ')}`);
  });

  check(
    'MK-17',
    'Market inputs are sourced or explicitly assumed and do not fabricate a size',
    () => {
      const inputs = readJson(`${DATA}/market-inputs.json`);
      require(isNonEmptyArray(inputs.inputs), 'market inputs must be a non-empty array');
      let observed = 0;
      for (const input of inputs.inputs) {
        const where = `input ${input.inputId}`;
        require(isNonEmptyString(input.metric), `${where}: metric missing`);
        require(['OBSERVED', 'ASSUMED', 'DERIVED'].includes(
          input.derivation,
        ), `${where}: invalid derivation`);
        require(input.value !== undefined, `${where}: value missing`);
        require(isNonEmptyString(input.unit), `${where}: unit missing`);
        require(isNonEmptyString(input.geography), `${where}: geography missing`);
        if (input.derivation === 'OBSERVED' || input.derivation === 'DERIVED') {
          require(isNonEmptyString(
            input.sourceId,
          ), `${where}: ${input.derivation} input needs sourceId`);
          require(evidence().sources.has(
            input.sourceId,
          ), `${where}: unresolved sourceId ${input.sourceId}`);
          observed += 1;
        }
        if (input.derivation !== 'OBSERVED') {
          require(isNonEmptyString(
            input.notes,
          ), `${where}: non-observed input must document its derivation`);
        }
        require(CONFIDENCE.includes(input.confidence), `${where}: invalid confidence`);
      }
      require(observed >=
        5, `only ${observed} observed/derived market inputs; sizing would rest on assumptions alone`);
      const sizingDoc = read(`${MV}/market/MC09-MARKET-SIZING.md`);
      for (const token of ['TAM', 'SAM', 'SOM', 'unknown', 'assum']) {
        require(new RegExp(token, 'i').test(
          sizingDoc,
        ), `market sizing document must explicitly discuss ${token}`);
      }
      require(!/market share of \d+(?:\.\d+)?\s*%/i.test(
        sizingDoc,
      ), 'SOM may not be derived from an arbitrary market-share percentage');
    },
  );

  check('MK-18', 'Geographic prioritization is reproducible and evidence-linked', () => {
    const file = readJson(`${DATA}/geo-assessments.json`);
    require(isNonEmptyArray(file.regions), 'regions must be a non-empty array');
    require(file.regions.length >=
      5, `expected at least five regions, found ${file.regions.length}`);
    require(file.weights && Object.keys(file.weights).length >= 5, 'geo weights must be defined');
    const weightSum = Object.values(file.weights).reduce((total, weight) => total + weight, 0);
    require(closeTo(weightSum, 1), `geo weights must sum to 1, found ${weightSum}`);
    const ranks = [];
    for (const region of file.regions) {
      const where = `region ${region.regionId}`;
      require(isNonEmptyString(region.name), `${where}: name missing`);
      require(region.scores && typeof region.scores === 'object', `${where}: scores missing`);
      let total = 0;
      for (const [dimension, weight] of Object.entries(file.weights)) {
        const score = region.scores[dimension];
        require(isFiniteNumber(score) &&
          score >= 1 &&
          score <= 5, `${where}: score for ${dimension} must be 1-5`);
        total += weight * score;
      }
      require(closeTo(
        region.weightedScore,
        total,
        0.011,
      ), `${where}: weightedScore ${region.weightedScore} does not recompute to ${total.toFixed(3)}`);
      require(isFiniteNumber(region.rank), `${where}: rank missing`);
      ranks.push(region.rank);
      resolveClaims(region.evidenceClaimIds, where);
      require(isNonEmptyArray(region.evidenceGaps), `${where}: evidenceGaps must be explicit`);
      require(isNonEmptyString(region.recommendation), `${where}: recommendation missing`);
    }
    const sorted = [...ranks].sort((a, b) => a - b);
    require(JSON.stringify(sorted) ===
      JSON.stringify(
        ranks.map((_, index) => index + 1),
      ), `ranks must be sequential 1..n, found ${ranks.join(',')}`);
  });

  check('MK-19', 'All eight buyer segments are present with evidence and unknowns', () => {
    const file = readJson(`${DATA}/buyer-segments.json`);
    require(isNonEmptyArray(file.segments), 'segments must be a non-empty array');
    const requiredFields = [
      'problem',
      'existingSolutions',
      'urgency',
      'economicConsequence',
      'purchaseTrigger',
      'decisionMaker',
      'budgetOwner',
      'procurementPath',
      'installationRequirements',
      'potentialChannel',
    ];
    const ids = new Set();
    for (const segment of file.segments) {
      const where = `segment ${segment.segmentId}`;
      require(/^S[1-8]$/.test(segment.segmentId || ''), `${where}: segmentId must be S1..S8`);
      require(!ids.has(segment.segmentId), `${where}: duplicate segment`);
      ids.add(segment.segmentId);
      require(['HYPOTHETICAL_ARCHETYPE', 'EVIDENCE_BASED'].includes(
        segment.archetypeStatus,
      ), `${where}: invalid archetypeStatus`);
      for (const field of requiredFields)
        require(isNonEmptyString(segment[field]), `${where}: ${field} missing`);
      for (const field of [
        'influencers',
        'technicalConstraints',
        'trustBarriers',
        'regulatoryConsiderations',
        'subscriptionObjections',
        'criticalUnknowns',
        'mc10Questions',
      ]) {
        require(isNonEmptyArray(segment[field]), `${where}: ${field} missing`);
      }
      resolveClaims(segment.evidenceClaimIds, where);
    }
    const missing = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'].filter((id) => !ids.has(id));
    require(missing.length === 0, `missing segments: ${missing.join(', ')}`);
  });

  check('MK-20', 'Public customer signals declare evidence type and independence limits', () => {
    const file = readJson(`${DATA}/public-signals.json`);
    require(isNonEmptyArray(file.signals), 'signals must be a non-empty array');
    const types = ['ANECDOTE', 'REPEATED_OBSERVATION', 'SURVEY', 'SUPPORT_DOC', 'PURCHASE_DEMAND'];
    for (const signal of file.signals) {
      require(types.includes(
        signal.evidenceType,
      ), `signal ${signal.signalId}: invalid evidenceType`);
      require(isNonEmptyArray(signal.sourceIds), `signal ${signal.signalId}: sourceIds missing`);
      for (const id of signal.sourceIds)
        require(evidence().sources.has(id), `signal ${signal.signalId}: unresolved source ${id}`);
      require(isNonEmptyString(
        signal.independence,
      ), `signal ${signal.signalId}: independence statement missing`);
      require(isNonEmptyString(
        signal.limitations,
      ), `signal ${signal.signalId}: limitations missing`);
    }
    require(file.signals.some((signal) => signal.evidenceType === 'SURVEY') ||
      file.signals.some(
        (signal) => signal.evidenceType === 'REPEATED_OBSERVATION',
      ), 'public evidence must include at least survey or repeated-observation evidence');
  });

  check(
    'MK-21',
    'All six distribution channels are assessed with real evidence and no invented terms',
    () => {
      const file = readJson(`${DATA}/channel-assessments.json`);
      require(isNonEmptyArray(file.channels), 'channels must be a non-empty array');
      const ids = new Set();
      for (const channel of file.channels) {
        const where = `channel ${channel.channelId}`;
        require(/^(?:CH|CHN)-[A-F]$/.test(
          channel.channelId || '',
        ), `${where}: channelId must be CH-A..CH-F`);
        require(!ids.has(channel.channelId), `${where}: duplicate channel`);
        ids.add(channel.channelId);
        for (const field of [
          'name',
          'buyerSegment',
          'salesProcess',
          'commercialDependency',
          'implementationComplexity',
          'economicStructure',
          'validationExperiment',
        ]) {
          require(isSubstantive(channel[field]), `${where}: ${field} missing`);
        }
        for (const field of ['supportRequirements', 'barriers', 'unprovenAssumptions']) {
          require(isNonEmptyArray(channel[field]), `${where}: ${field} must be an array`);
        }
        resolveClaims(channel.evidenceClaimIds, where);
      }
      const missing = ['CH-A', 'CH-B', 'CH-C', 'CH-D', 'CH-E', 'CH-F'].filter(
        (id) => ![...ids].some((used) => used.endsWith(id.slice(2))),
      );
      require(missing.length === 0, `missing channels: ${missing.join(', ')}`);
    },
  );

  check('MK-22', 'Search and demand signals are typed and sourced', () => {
    const file = readJson(`${DATA}/search-signals.json`);
    require(isNonEmptyArray(file.terms), 'terms must be a non-empty array');
    const types = [
      'SEARCH_INTEREST',
      'ESTIMATED_VOLUME',
      'CONTENT_OPPORTUNITY',
      'COMMERCIAL_INTENT',
      'TRAFFIC_OPPORTUNITY',
    ];
    for (const term of file.terms) {
      require(types.includes(term.metricType), `term ${term.termId}: invalid metricType`);
      require(evidence().sources.has(
        term.sourceId,
      ), `term ${term.termId}: unresolved source ${term.sourceId}`);
      require(term.observedValue !== undefined &&
        term.observedValue !== null, `term ${term.termId}: observedValue missing`);
      require(isNonEmptyString(term.limitation), `term ${term.termId}: limitation missing`);
    }
  });

  check('MK-23', 'Validation experiments are prepared, not executed', () => {
    const file = readJson(`${DATA}/validation-experiments.json`);
    require(isNonEmptyArray(file.experiments), 'experiments must be a non-empty array');
    require(file.experiments.length >=
      5, `expected at least five experiments, found ${file.experiments.length}`);
    for (const experiment of file.experiments) {
      const where = `experiment ${experiment.experimentId}`;
      require(experiment.executed === false ||
        experiment.executed === undefined, `${where}: MC-09 must not claim execution`);
      for (const field of [
        'hypothesis',
        'segment',
        'recruitment',
        'minimumEvidence',
        'dataCapture',
        'decisionThreshold',
        'limitations',
        'ethics',
        'interpretation',
      ]) {
        require(isNonEmptyString(experiment[field]), `${where}: ${field} missing`);
      }
      require(isNonEmptyArray(experiment.confounders), `${where}: confounders missing`);
    }
  });

  check(
    'MK-24',
    'Product assessments cover all nine families with frozen weights that recompute',
    () => {
      const file = readJson(`${DATA}/product-assessments.json`);
      require(file.weights &&
        Object.keys(file.weights).length >=
          8, 'product weights must define at least eight dimensions');
      const weightSum = Object.values(file.weights).reduce((total, weight) => total + weight, 0);
      require(closeTo(weightSum, 1), `product weights must sum to 1, found ${weightSum}`);
      require(isNonEmptyString(file.frozenAt) &&
        isNonEmptyString(
          file.framework,
        ), 'product assessment framework and freeze date must be recorded');
      require(isNonEmptyArray(file.families), 'families must be a non-empty array');
      const ids = new Set();
      for (const family of file.families) {
        const where = `family ${family.familyId}`;
        require(CANONICAL_FAMILIES.includes(family.familyId), `${where}: non-canonical family`);
        require(!ids.has(family.familyId), `${where}: duplicate family`);
        ids.add(family.familyId);
        let total = 0;
        for (const dimension of Object.keys(file.weights)) {
          const score = family.scores?.[dimension];
          require(isFiniteNumber(score) &&
            score >= 1 &&
            score <= 5, `${where}: score for ${dimension} must be 1-5`);
          total += file.weights[dimension] * score;
        }
        require(closeTo(
          family.commercialScore,
          total,
          0.011,
        ), `${where}: commercialScore ${family.commercialScore} does not recompute to ${total.toFixed(3)}`);
        require(isNonEmptyString(
          family.commercialAttractiveness,
        ), `${where}: commercialAttractiveness missing`);
        require(family.releaseReadiness &&
          READINESS_STATES.includes(
            family.releaseReadiness.state,
          ), `${where}: releaseReadiness.state invalid`);
        require(isNonEmptyArray(
          family.releaseReadiness.blockers,
        ), `${where}: releaseReadiness.blockers must be explicit`);
        require(DECISION_CATEGORIES.includes(
          family.decision,
        ), `${where}: invalid decision category ${family.decision}`);
        resolveClaims(family.evidenceClaimIds, where);
        require(isNonEmptyString(family.rationale), `${where}: rationale missing`);
      }
      const missing = CANONICAL_FAMILIES.filter((family) => !ids.has(family));
      require(missing.length === 0, `missing product assessments: ${missing.join(', ')}`);
      const ordering = file.families.map((family) => family.commercialScore);
      require(ordering.every(
        (value, index) => index === 0 || ordering[index - 1] >= value,
      ), 'product families must be ordered by commercialScore descending');
    },
  );

  check(
    'MK-25',
    'Bundle assessments cover all six bundles and keep readiness separate from attractiveness',
    () => {
      const file = readJson(`${DATA}/bundle-assessments.json`);
      require(file.weights &&
        Object.keys(file.weights).length >=
          8, 'bundle weights must define at least eight dimensions');
      const weightSum = Object.values(file.weights).reduce((total, weight) => total + weight, 0);
      require(closeTo(weightSum, 1), `bundle weights must sum to 1, found ${weightSum}`);
      require(isNonEmptyArray(file.bundles), 'bundles must be a non-empty array');
      const ids = new Set();
      for (const bundle of file.bundles) {
        const where = `bundle ${bundle.bundleId}`;
        require(CANONICAL_BUNDLES.includes(bundle.bundleId), `${where}: non-canonical bundle`);
        require(!ids.has(bundle.bundleId), `${where}: duplicate bundle`);
        ids.add(bundle.bundleId);
        let total = 0;
        for (const dimension of Object.keys(file.weights)) {
          const score = bundle.scores?.[dimension];
          require(isFiniteNumber(score) &&
            score >= 1 &&
            score <= 5, `${where}: score for ${dimension} must be 1-5`);
          total += file.weights[dimension] * score;
        }
        require(closeTo(
          bundle.commercialScore,
          total,
          0.011,
        ), `${where}: commercialScore does not recompute`);
        require(isNonEmptyString(
          bundle.commercialAttractiveness,
        ), `${where}: commercialAttractiveness missing`);
        require(bundle.releaseReadiness &&
          READINESS_STATES.includes(
            bundle.releaseReadiness.state,
          ), `${where}: releaseReadiness.state invalid`);
        require(isNonEmptyArray(
          bundle.releaseReadiness.blockers,
        ), `${where}: releaseReadiness.blockers must be explicit`);
        require(DECISION_CATEGORIES.includes(
          bundle.decision,
        ), `${where}: invalid decision category`);
        resolveClaims(bundle.evidenceClaimIds, where);
        require(isNonEmptyString(bundle.rationale), `${where}: rationale missing`);
      }
      const missing = CANONICAL_BUNDLES.filter((bundle) => !ids.has(bundle));
      require(missing.length === 0, `missing bundle assessments: ${missing.join(', ')}`);
    },
  );

  check('MK-26', 'Every decision traces to evidence and uses a permitted category', () => {
    const file = readJson(`${DATA}/decision-links.json`);
    require(isNonEmptyArray(file.decisions), 'decisions must be a non-empty array');
    require(file.decisions.length >=
      10, `expected at least ten decisions, found ${file.decisions.length}`);
    const ids = new Set();
    for (const decision of file.decisions) {
      const where = `decision ${decision.decisionId}`;
      require(/^DEC-MC09-\d{2}$/.test(
        decision.decisionId || '',
      ), `${where}: decisionId must match DEC-MC09-##`);
      require(!ids.has(decision.decisionId), `${where}: duplicate decisionId`);
      ids.add(decision.decisionId);
      require(DECISION_CATEGORIES.includes(
        decision.category,
      ), `${where}: invalid category ${decision.category}`);
      require(isNonEmptyString(decision.subject), `${where}: subject missing`);
      require(isNonEmptyString(decision.title), `${where}: title missing`);
      require(isNonEmptyString(decision.rationale), `${where}: rationale missing`);
      require(isNonEmptyString(decision.evidenceThreshold), `${where}: evidenceThreshold missing`);
      require(CONFIDENCE.includes(decision.confidence), `${where}: invalid confidence`);
      resolveClaims(decision.claimIds, where);
    }
  });

  check('MK-27', 'Research documents make no prohibited commercial or safety claim', () => {
    const docs = [];
    const walk = (dir) => {
      for (const entry of readdirSync(abs(dir), { withFileTypes: true })) {
        const relativePath = `${dir}/${entry.name}`;
        if (entry.isDirectory()) walk(relativePath);
        else if (entry.name.endsWith('.md')) docs.push(relativePath);
      }
    };
    walk(MV);
    const violations = [];
    for (const doc of docs) {
      const text = read(doc);
      for (const rule of PROHIBITED_CLAIMS) {
        for (const match of text.matchAll(
          new RegExp(rule.re.source, `${rule.re.flags.replace('g', '')}g`),
        )) {
          const start = Math.max(0, match.index - 120);
          const context = text.slice(start, match.index + match[0].length + 30);
          const clauseStart = Math.max(
            context.lastIndexOf('.', match.index - start),
            context.lastIndexOf('\n', match.index - start),
          );
          const clause = context.slice(clauseStart + 1);
          if (NEGATION_TOKENS.test(clause)) continue;
          if (rule.mareaScoped && !/MAREA|EMBARCARTE/i.test(clause)) continue;
          violations.push(`${doc}: ${rule.id} -> "${clause.trim().slice(0, 110)}"`);
        }
      }
    }
    require(violations.length === 0, `prohibited claims: ${violations.slice(0, 5).join(' | ')}`);
  });

  check('MK-28', 'Source register references every evidence source ID', () => {
    const register = read(`${MV}/MC09-SOURCE-REGISTER.md`);
    const missing = [...evidence().sources.keys()].filter((id) => !register.includes(id));
    require(missing.length ===
      0, `source register omits: ${missing.slice(0, 8).join(', ')}${missing.length > 8 ? '…' : ''}`);
    const { sources } = evidence();
    const referenced = register.match(/SRC-(MKT|CMP|BUY|ECO|CHN|MC10)-\d{3}/g) || [];
    require(referenced.length ===
      sources.size, `source register mentions ${referenced.length} source IDs but the dataset holds ${sources.size} sources`);
    const unique = new Set(referenced);
    require(unique.size === referenced.length, 'source register repeats a source ID row');
  });

  check('MK-29', 'Positioning and prioritization documents cover every canonical subject', () => {
    const positioning = read(`${MV}/MC09-COMPETITIVE-POSITIONING.md`);
    const prioritization = read(`${MV}/MC09-PORTFOLIO-PRIORITIZATION.md`);
    for (const family of CANONICAL_FAMILIES) {
      require(positioning.includes(family), `positioning misses ${family}`);
      require(prioritization.includes(family), `prioritization misses ${family}`);
    }
    for (const bundle of CANONICAL_BUNDLES) {
      const label = CANONICAL_BUNDLE_LABEL[bundle];
      require(positioning.includes(label), `positioning misses bundle ${label}`);
      require(prioritization.includes(label), `prioritization misses bundle ${label}`);
    }
  });

  check(
    'MK-30',
    'Buyer segmentation document covers all eight segments and labels archetypes',
    () => {
      const doc = read(`${MV}/buyers/MC09-BUYER-SEGMENTS.md`);
      for (const segment of ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8']) {
        require(new RegExp(`\\b${segment}\\b`).test(
          doc,
        ), `buyer segments document misses ${segment}`);
      }
      require(/HYPOTHETICAL_ARCHETYPE/.test(
        doc,
      ), 'buyer segmentation must label hypothetical archetypes');
    },
  );

  check(
    'MK-31',
    'MC-10 package contains parallel ES/EN instruments and claims no execution',
    () => {
      const doc = read(`${MV}/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md`);
      for (const token of [
        'consentimiento',
        'consent',
        'gabor',
        'westendorp',
        'screening|filtro',
        'gdpr',
      ]) {
        require(new RegExp(token, 'i').test(doc), `MC-10 plan missing ${token}`);
      }
      require(!/\b(?:we|I) (?:interviewed|surveyed)\b/i.test(
        doc,
      ), 'MC-10 plan must not claim interviews were conducted');
    },
  );

  check('MK-32', 'Executive report is in Spanish with the mandated sections', () => {
    const doc = read(`${MV}/MC09-EXECUTIVE-REPORT.md`);
    require(/[áéíóúñ¿¡]/i.test(doc), 'executive report does not look Spanish');
    for (const heading of [
      'Veredicto',
      'Mercado',
      'Competencia',
      'Prioridades de producto',
      'Prioridades de bundle',
      'Precios',
      'Geograf',
      'Modelo de negocio',
      'Riesgos',
      'MC-10',
      'Evidencia y QA',
    ]) {
      require(new RegExp(heading, 'i').test(doc), `executive report missing section "${heading}"`);
    }
  });

  check(
    'MK-33',
    'Registry and delivery records reflect MC-09 without weakening earlier milestones',
    () => {
      const registry = read('docs/marea/execution/MASTER-PROMPT-REGISTRY.md');
      const row = registry.split('\n').find((line) => /^\|\s*09\s*\|/.test(line));
      require(row, 'registry row 09 missing');
      require(/MC-09/.test(row), 'registry row 09 must record MC-09');
      require(!/PLANNED/.test(row), 'registry row 09 must not remain PLANNED after delivery');
      const delivery = read(`${MV}/MC-09-DELIVERY.md`);
      require(/feature\/marea-mc09-market-competitive-intelligence/.test(
        delivery,
      ), 'delivery must name the MC-09 branch');
      require(/65417bf/.test(delivery), 'delivery must record the verified MC-08 base commit');
    },
  );

  check('MK-34', 'Canonical product and bundle contracts were not weakened', () => {
    const products = [
      'docs/marea/products/product-definitions.batch-01.json',
      'docs/marea/products/product-definitions.batch-02.json',
      'docs/marea/products/product-definitions.batch-03.json',
    ].flatMap((path) => readJson(path).products);
    require(products.length === 9, `expected nine canonical products, found ${products.length}`);
    for (const product of products) {
      require(product.lifecycleState ===
        'DEFINED', `${product.id}: lifecycleState changed from DEFINED`);
      const availability = product.readiness?.availability;
      const availabilityState =
        typeof availability === 'string' ? availability : availability?.status;
      require(availabilityState ===
        'NOT_FOR_SALE', `${product.id}: availability changed from NOT_FOR_SALE`);
    }
    const bundleContract = readJson('docs/marea/bundles/bundle-definitions.json');
    require(bundleContract.bundles.length === 6, 'expected six canonical bundles');
    for (const bundle of bundleContract.bundles) {
      require(bundle.definitionState ===
        'COMPLETE_TARGET_SPECIFICATION', `${bundle.id}: definitionState changed`);
      require(bundle.commercialAvailability ===
        'NOT_FOR_SALE', `${bundle.id}: commercialAvailability changed`);
    }
    const restrictions = bundleContract.globalRestrictions;
    require(restrictions.trademarkLegalClearance ===
      'NOT_GRANTED', 'trademarkLegalClearance weakened');
    require(restrictions.sourceIpClearance === 'NOT_CLEARED', 'sourceIpClearance weakened');
    require(restrictions.remoteHelmControl === 'PROHIBITED', 'remoteHelmControl weakened');
    require(restrictions.hardwareIncludedByDefault === false, 'hardwareIncludedByDefault weakened');
  });

  check('MK-35', 'Compatibility is never represented as tested or supported', () => {
    const scans = dataFiles.filter((name) => name !== 'manifest.json');
    for (const file of scans) {
      const text = read(`${DATA}/${file}`);
      const matches = text.match(
        /"(?:compatibilityStatus|testStatus|verificationStatus)"\s*:\s*"(?:TESTED|SUPPORTED|VERIFIED)"/g,
      );
      if (matches)
        throw new Error(
          `${file}: ${matches.join(', ')} claims tested/supported compatibility without evidence`,
        );
    }
  });

  check(
    'MK-36',
    'No fieldwork, interviews or simulated survey data exist in the research contract',
    () => {
      const entry = readJson(`${DATA}/governance-status.json`);
      require(entry.statuses.customerOutreach ===
        'NOT_AUTHORIZED', 'customerOutreach must remain NOT_AUTHORIZED');
      for (const file of dataFiles) {
        const value = readJson(`${DATA}/${file}`);
        const text = JSON.stringify(value);
        if (/"interviewCount"\s*:\s*[1-9]/.test(text))
          throw new Error(`${file}: interviewCount > 0 without real fieldwork`);
        if (
          /"surveyResponses"\s*:/.test(text) &&
          !/"simulated"\s*:\s*true/.test(text) &&
          !/"testingFixture"\s*:\s*true/.test(text)
        ) {
          throw new Error(
            `${file}: surveyResponses present without a simulated/testingFixture tag`,
          );
        }
      }
      const experiments = readJson(`${DATA}/validation-experiments.json`);
      for (const experiment of experiments.experiments) {
        require(experiment.executed !==
          true, `${experiment.experimentId}: experiment marked executed in MC-09`);
      }
    },
  );

  check(
    'MK-37',
    'Historical SAIL/COMPLETE prices stay labelled as unapproved traceability references',
    () => {
      const docs = [
        `${MV}/economics/MC09-PRICING-AND-WTP.md`,
        `${MV}/economics/MC09-CUSTOMER-TCO.md`,
        `${MV}/economics/MC09-COMMERCIAL-ECONOMICS.md`,
        `${MV}/MC09-COMPETITIVE-POSITIONING.md`,
      ];
      for (const doc of docs) {
        const text = read(doc);
        for (const match of text.matchAll(/[^\n]*\b(?:1[.,]990|3[.,]490)\b[^\n]*/g)) {
          const line = match[0];
          require(/HYPOTHESIS|traceability|historical|not a price|NOT_ESTABLISHED|no fixed|turnkey reference|unapproved/i.test(
            line,
          ), `${doc}: historical figure used without an unapproved-price label -> "${line.trim().slice(0, 120)}"`);
        }
      }
    },
  );

  check('MK-38', 'No price is presented as commercially approved', () => {
    const governance = readJson(`${DATA}/governance-status.json`);
    require(governance.statuses.approvedBundlePrices === 0, 'approvedBundlePrices must remain 0');
    require(governance.statuses.verifiedCommercialMargins ===
      0, 'verifiedCommercialMargins must remain 0');
    for (const file of dataFiles) {
      const text = read(`${DATA}/${file}`);
      const matches = text.match(
        /"(?:priceStatus|approvalStatus|priceApproved)"\s*:\s*"(?:APPROVED|AUTHORIZED|LIVE)"/g,
      );
      if (matches) throw new Error(`${file}: ${matches.join(', ')} presents an approved price`);
    }
    const products = readJson(`${DATA}/product-assessments.json`);
    for (const family of products.families) {
      require(family.priceApproved !==
        true, `${family.familyId}: no MC-09 price may be marked approved`);
    }
  });

  check('MK-39', 'Competitor rankings are traceable to observation IDs', () => {
    const observations = readJson(`${DATA}/competitor-observations.json`).observations.map(
      (entry) => entry.obsId,
    );
    const known = new Set(observations);
    const docs = [
      `${MV}/competitors/MC09-COMPETITOR-LANDSCAPE.md`,
      `${MV}/competitors/MC09-PRODUCT-BENCHMARKS.md`,
      `${MV}/competitors/MC09-BUNDLE-BENCHMARKS.md`,
      `${MV}/competitors/MC09-COMPETITOR-PRICING.md`,
      `${MV}/MC09-COMPETITIVE-POSITIONING.md`,
    ];
    let references = 0;
    for (const doc of docs) {
      const text = read(doc);
      for (const match of text.matchAll(/OBS-[A-Za-z0-9-]+-\d{3,4}/g)) {
        references += 1;
        require(known.has(match[0]), `${doc}: references unknown observation ${match[0]}`);
      }
    }
    require(references >=
      9, `expected rankings/comparisons to cite observation IDs traceably, found ${references}`);
  });

  check(
    'MK-40',
    'No unsupported certified-hardware or guarantee claim appears in research prose',
    () => {
      const docs = [];
      const walk = (dir) => {
        for (const entry of readdirSync(abs(dir), { withFileTypes: true })) {
          const relativePath = `${dir}/${entry.name}`;
          if (entry.isDirectory()) walk(relativePath);
          else if (entry.name.endsWith('.md')) docs.push(relativePath);
        }
      };
      walk(MV);
      const rules = [
        {
          id: 'certified-hardware',
          re: /MAREA[^.\n]{0,50}(?:is|are) (?:CE|RED|EMC|NMEA ?2000) certified/i,
        },
        {
          id: 'checkout',
          re: /(?:add to cart|buy now|checkout is (?:enabled|live)|activate checkout)/i,
        },
        { id: 'unlimited-fleet', re: /FLEET[^.\n]{0,40}unlimited (?:vessels|capabilities|data)/i },
      ];
      const violations = [];
      for (const doc of docs) {
        const text = read(doc);
        for (const rule of rules) {
          for (const match of text.matchAll(
            new RegExp(rule.re.source, `${rule.re.flags.replace('g', '')}g`),
          )) {
            const clause = text.slice(
              Math.max(0, match.index - 80),
              match.index + match[0].length + 10,
            );
            if (!NEGATION_TOKENS.test(clause)) violations.push(`${doc}: ${rule.id}`);
          }
        }
      }
      require(violations.length === 0, `unsupported claims: ${violations.slice(0, 5).join(', ')}`);
    },
  );

  return checks;
}

function main() {
  const args = process.argv.slice(2);
  let root = DEFAULT_ROOT;
  let jsonMode = false;
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--root') root = resolve(args[index + 1] || '');
    else if (args[index] === '--json') jsonMode = true;
  }
  const checks = buildRunner(root);
  const failed = checks.filter((entry) => entry.status === 'FAIL');
  if (jsonMode) {
    process.stdout.write(
      `${JSON.stringify({ milestone: 'MC-09', total: checks.length, passed: checks.length - failed.length, failed: failed.length, checks }, null, 2)}\n`,
    );
  } else {
    for (const entry of checks) {
      if (entry.status === 'FAIL')
        process.stderr.write(`FAIL ${entry.id} ${entry.description}\n     ${entry.detail}\n`);
    }
    const summary = `MC-09 market research validation: ${checks.length - failed.length}/${checks.length} checks passed`;
    process.stdout.write(`${summary}\n`);
    if (failed.length > 0) {
      process.stdout.write(`FAILED: ${failed.map((entry) => entry.id).join(', ')}\n`);
    }
  }
  process.exit(failed.length === 0 ? 0 : 1);
}

main();
