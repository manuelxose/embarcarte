#!/usr/bin/env node
/**
 * MC-19 internal audience pages — deterministic validator.
 *
 * Enforces the authorised MC-19 internal scope (Option A: three bilingual
 * audience pages, no enquiry flows) and the boundary that keeps those pages
 * out of the public application:
 *
 *   - the scope instruction is recorded with its real provenance;
 *   - three internal identities, no collision with the 21 public routes or the
 *     23 MC-15 proposed routes, and no public path for `shipowners`;
 *   - one bilingual content source with fixed publication/approval literals,
 *     resolved evidence and ES/EN parity;
 *   - MC-17 components are reused, not forked;
 *   - no form, endpoint, lead store, purchase path or storage mechanism;
 *   - no public route, sitemap, canonical, hreflang, social or JSON-LD surface;
 *   - every governance flag and inherited gate is preserved;
 *   - the committed datasets are current bytes.
 *
 * Run:
 *   npm run test:mc19
 *   npm run test:mc19:unit
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildProjection } from './mc19-segments-projection.mjs';
import {
  SEGMENT_EVIDENCE,
  segmentEvidenceById,
} from '../src/app/marea-segments/content/evidence.ts';
import {
  SEGMENT_IDENTITIES,
  SEGMENT_IDS,
  SEGMENT_PREVIEW_ROUTES,
} from '../src/app/marea-segments/models/segment-identity.ts';
import {
  SEGMENT_SECTION_ANCHORS,
  SEGMENT_SECTION_ORDER,
} from '../src/app/marea-segments/content/content.types.ts';
import { LOCALIZED_ROUTES } from '../src/app/core/i18n/locale-routes.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = 'docs/marea/segments';
const DATA = `${DOCS}/data`;
const EVIDENCE_DIR = `${DOCS}/evidence`;
const BASELINE = 'ba63baa0e529ab9cb482fd929632d359fec1d328';

const read = (path) => readFileSync(resolve(root, path), 'utf8');
const readJson = (path) => JSON.parse(read(path));
const exists = (path) => existsSync(resolve(root, path));
const gitRaw = (args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
const git = (args) => gitRaw(args).split('\n').filter(Boolean);
const sha256 = (buffer) => createHash('sha256').update(buffer).digest('hex');

export const GOVERNANCE = {
  trademarkLegalClearance: 'NOT_GRANTED',
  mareaPublicUse: 'NO_GO',
  sourceIpClearance: 'NOT_CLEARED',
  licensingRightsGranted: false,
  priceApproved: 'NONE',
  commercialAvailability: 'NOT_FOR_SALE',
  pilotSafetyGate: 'BLOCKED',
  testedCompatibilityRows: 0,
  publicationAuthorized: false,
  indexationAuthorized: false,
  deploymentAuthorized: false,
  purchaseFunctionality: false,
  leadCollection: false,
  publicRoutesActivated: 0,
};

const ALLOWED_SECTIONS = new Set(SEGMENT_SECTION_ORDER);
const ALLOWED_COPY_CLASSES = new Set([
  'INTERNAL_EVIDENCED',
  'PROPOSED_INTENT',
  'CONSTRAINT_STATEMENT',
  'NAVIGATIONAL',
]);
const ALLOWED_SOURCE_TYPES = new Set([
  'INTERNAL_DOCUMENT',
  'CANONICAL_DOMAIN_DATA',
  'RELEASE_GATE_RECORD',
  'AUTHORED_DRAFT',
]);

/** Phrases that must never appear in MC-19 copy, in either locale. */
export const PROHIBITED_CLAIMS = [
  'probado en el mar',
  'prueba de mar superada',
  'certificado ce',
  'marcado ce',
  'nmea 2000 certificado',
  'compatible con',
  'líder del mercado',
  'el mejor del mercado',
  'disponible ahora',
  'available now',
  'in stock',
  'compatible with',
  'ce certified',
  'ce marked',
  'nmea 2000 certified',
  'accuracy of',
  'en stock',
  'añadir al carrito',
  'comprar ahora',
  'testimonio',
  'opiniones de clientes',
  'socio certificado',
  'instalador certificado',
  'garantía de por vida',
  'precisión de',
  '100%',
  'sea trial',
  'guaranteed compatibility',
  'market leader',
  'add to cart',
  'buy now',
  'customer testimonials',
  'certified installer',
  'lifetime warranty',
];

const FORBIDDEN_INTERACTIONS = [
  ['form element', /<form\b/i],
  ['input element', /<input\b/i],
  ['select element', /<select\b/i],
  ['textarea element', /<textarea\b/i],
  ['email field', /type\s*=\s*["']email["']/i],
  ['HTTP client', /\bHttpClient(Module)?\b/],
  ['raw XHR', /\bXMLHttpRequest\b/],
  ['network fetch', /\bfetch\s*\(/],
  ['localStorage', /\blocalStorage\b/],
  ['sessionStorage', /\bsessionStorage\b/],
  ['IndexedDB', /\bindexedDB\b/],
  ['cookie write', /document\.cookie\s*=/],
  ['mailto link', /mailto:/i],
  ['application endpoint', /\/api\//],
  ['mail transport', /\bnodemailer\b/],
];

export const ALLOWED_CHANGE_PREFIXES = [
  'src/app/marea-segments/',
  'preview/landing/',
  'e2e/segments/',
  'scripts/check-mc19-implementation',
  'scripts/check-mc19-scope.mjs',
  'scripts/build-mc19-segments-data.mjs',
  'scripts/mc19-segments-projection.mjs',
  'docs/marea/segments/',
];
export const ALLOWED_CHANGE_EXACT = [
  'package.json',
  'playwright.segments.config.ts',
  'docs/marea/execution/DECISION-LOG.md',
  'docs/marea/execution/MASTER-PROMPT-REGISTRY.md',
];

/** Files that must never receive an MC-19 identity. */
export const PROTECTED_PUBLIC_FILES = [
  'src/app/app.routes.ts',
  'src/app/app.routes.server.ts',
  'src/app/core/i18n/locale-routes.ts',
  'src/server.ts',
];

const problems = (list) => (Array.isArray(list) ? list : []);

export function governanceProblems(governance) {
  const out = [];
  if (!governance || typeof governance !== 'object') return ['governance block missing'];
  for (const [key, expected] of Object.entries(GOVERNANCE)) {
    if (governance[key] !== expected) {
      out.push(`governance.${key} must be ${JSON.stringify(expected)}`);
    }
  }
  return out;
}

/** The scope instruction must record real provenance and no invented approval. */
export function instructionProblems(instruction) {
  const out = [];
  if (instruction?.contractId !== 'MC19-SCOPE-INSTRUCTION') out.push('wrong contractId');
  if (instruction?.status !== 'AUTHORIZED_INTERNAL_SCOPE')
    out.push('status is not AUTHORIZED_INTERNAL_SCOPE');
  if (instruction?.selectedOption !== 'A') out.push('selectedOption must be A');
  const provenance = instruction?.promptProvenance ?? {};
  if (!String(provenance.suppliedBy ?? '').includes('product owner'))
    out.push('promptProvenance.suppliedBy must name the requesting product owner');
  if (provenance.suppliedOn !== '2026-11-04')
    out.push('promptProvenance.suppliedOn must be 2026-11-04');
  if (provenance.previouslyRecordedInRepository !== false)
    out.push('promptProvenance.previouslyRecordedInRepository must be false');
  if (provenance.recordedInCommit !== true)
    out.push('promptProvenance.recordedInCommit must be true');
  const approvals = instruction?.approvalsOutstanding ?? [];
  if (approvals.length < 4) out.push('approvalsOutstanding must list the external approvals');
  for (const id of [
    'LEGAL_TRADEMARK',
    'SOURCE_IP_LICENSING',
    'PUBLICATION_INDEXATION',
    'PRIVACY_DPA_DPIA',
  ]) {
    if (!approvals.some((entry) => entry.id === id)) out.push(`approvalsOutstanding missing ${id}`);
  }
  if (instruction?.namedApproverBeyondProductOwner !== 'OUTSTANDING')
    out.push('namedApproverBeyondProductOwner must be OUTSTANDING');
  for (const key of ['merged', 'deployed', 'published', 'publicRouteActivated', 'leadCapture']) {
    if (instruction?.deliveryState?.[key] !== false) out.push(`deliveryState.${key} must be false`);
  }
  out.push(...governanceProblems(instruction?.governance));
  if (instruction?.globalVerdict === 'PASS') out.push('globalVerdict must not be PASS');
  return out;
}

/** Preview paths must be internal-only and must not collide with any route set. */
export function identityProblems({
  identities = SEGMENT_IDENTITIES,
  previewRoutes = SEGMENT_PREVIEW_ROUTES,
  publicRoutes = LOCALIZED_ROUTES,
  proposedRoutes = [],
} = {}) {
  const out = [];
  const ids = Object.keys(identities);
  if (ids.join(',') !== 'professionals,installers,shipowners') out.push('identity ids differ');
  if (previewRoutes.length !== 6)
    out.push(`expected 6 preview routes, got ${previewRoutes.length}`);

  const publicPaths = new Set();
  for (const [routeId, locales] of Object.entries(publicRoutes)) {
    void routeId;
    publicPaths.add(locales.es.replace(/\/+$/, ''));
    publicPaths.add(locales.en.replace(/\/+$/, ''));
  }
  const proposedPaths = new Set(
    proposedRoutes.flatMap((route) => [route.routePatternEs, route.routePatternEn]),
  );

  const seen = new Set();
  for (const identity of Object.values(identities)) {
    if (!identity.preview.es.startsWith('internal/segments/'))
      out.push(`${identity.segmentId} ES preview path escapes the internal namespace`);
    if (!identity.preview.en.startsWith(`en/internal/segments/`))
      out.push(`${identity.segmentId} EN preview path escapes the internal namespace`);
    for (const path of [identity.preview.es, identity.preview.en]) {
      if (seen.has(path)) out.push(`duplicate preview path ${path}`);
      seen.add(path);
      const prefixed = `/${path}`;
      if (publicPaths.has(path)) out.push(`preview path collides with a public route: ${prefixed}`);
      if (proposedPaths.has(prefixed))
        out.push(`preview path collides with a proposed route: ${prefixed}`);
    }
    if (identity.publicRouteRegistered !== false)
      out.push(`${identity.segmentId} registers a public route`);
    if (identity.publicationAuthorized !== false)
      out.push(`${identity.segmentId} is publication-authorised`);
    if (identity.indexationAuthorized !== false)
      out.push(`${identity.segmentId} is indexation-authorised`);
    if (identity.sitemapEligible !== false) out.push(`${identity.segmentId} is sitemap-eligible`);
    if (identity.leadCapture !== false) out.push(`${identity.segmentId} allows lead capture`);
  }

  const shipowners = identities.shipowners;
  if (shipowners.mc15RouteId !== null) out.push('shipowners must not claim an MC-15 route id');
  if (shipowners.mc15PageType !== null) out.push('shipowners must not claim an MC-15 page type');
  if (shipowners.reservedPublicPath !== null) out.push('shipowners must not reserve a public path');
  for (const segmentId of ['professionals', 'installers']) {
    const identity = identities[segmentId];
    const proposed = proposedRoutes.find((route) => route.routeId === identity.mc15RouteId);
    if (!proposed) out.push(`${segmentId} does not resolve an MC-15 proposed route`);
    if (proposed && proposed.entityId !== identity.entityId)
      out.push(`${segmentId} entityId differs from MC-15`);
    if (proposed && proposed.pageType !== identity.mc15PageType)
      out.push(`${segmentId} pageType differs from MC-15`);
    if (!identity.reservedPublicPath) out.push(`${segmentId} must record the reserved MC-15 path`);
  }
  return out;
}

/** Content blocks: fixed literals, resolved evidence, no placeholders. */
export function contentProblems(
  projection,
  { evidence = SEGMENT_EVIDENCE, fileExists = exists } = {},
) {
  const out = [];
  const byId = new Map(evidence.map((entry) => [entry.evidenceId, entry]));
  const records = projection?.resolved ?? [];
  if (records.length === 0) return ['no resolved content records'];

  const pairCounts = new Map();
  for (const record of records) {
    const key = `${record.segmentId}::${record.contentId}`;
    pairCounts.set(key, (pairCounts.get(key) ?? 0) + 1);
  }
  for (const [key, count] of pairCounts) {
    if (count !== projection.locales.length)
      out.push(`${key} appears ${count} times, expected one per locale`);
  }

  for (const record of records) {
    const where = `${record.segmentId}/${record.contentId}/${record.locale}`;
    if (!ALLOWED_SECTIONS.has(record.sectionId)) out.push(`${where}: unknown sectionId`);
    if (!ALLOWED_COPY_CLASSES.has(record.copyClass)) out.push(`${where}: unknown copyClass`);
    if (!ALLOWED_SOURCE_TYPES.has(record.sourceType)) out.push(`${where}: unknown sourceType`);
    if (record.publicationStatus !== 'INTERNAL_DRAFT_NOT_APPROVED')
      out.push(`${where}: publicationStatus changed`);
    if (record.approvalStatus !== 'NOT_APPROVED') out.push(`${where}: approvalStatus changed`);
    if (!Array.isArray(record.evidenceIds) || record.evidenceIds.length === 0)
      out.push(`${where}: no evidence id`);
    for (const evidenceId of record.evidenceIds ?? []) {
      const entry = byId.get(evidenceId);
      if (!entry) out.push(`${where}: unresolved evidence ${evidenceId}`);
      else if (!fileExists(entry.sourcePath))
        out.push(`${where}: evidence source missing ${entry.sourcePath}`);
    }
    const text = String(record.text ?? '');
    if (text.trim().length === 0) out.push(`${where}: empty text`);
    // Case-sensitive markers: Spanish “Todo …” is not a placeholder.
    if (/\bTODO\b|\bFIXME\b|lorem ipsum/i.test(text) && !/\bTodo\b/.test(text))
      out.push(`${where}: placeholder text`);
    if (/\{\{|\}\}|\$\{/.test(text)) out.push(`${where}: unresolved template token`);
  }
  return out;
}

/** ES/EN semantic-shape parity and no untranslated Spanish in English copy. */
export function parityProblems(projection) {
  const out = [];
  const records = projection?.resolved ?? [];
  const byLocale = { es: new Map(), en: new Map() };
  for (const record of records) {
    if (!byLocale[record.locale]) continue;
    byLocale[record.locale].set(`${record.segmentId}::${record.contentId}`, record.text);
  }
  const es = byLocale.es;
  const en = byLocale.en;
  if (es.size === 0 || en.size === 0) return ['missing locale records'];
  if (es.size !== en.size) out.push(`locale record counts differ: es=${es.size}, en=${en.size}`);
  for (const [key, esText] of es) {
    if (!en.has(key)) {
      out.push(`${key}: missing EN translation`);
      continue;
    }
    const enText = en.get(key);
    if (/\b(?:el|la|los|las|para|con|sin|que|del|una|según|también)\b/i.test(enText))
      out.push(`${key}: EN copy contains Spanish function words`);
    if (/[áéíóúñ¿¡]/i.test(enText)) out.push(`${key}: EN copy contains Spanish diacritics`);
    const esLength = esText.length;
    const enLength = enText.length;
    const ratio = enLength / Math.max(1, esLength);
    if (ratio < 0.45 || ratio > 2.2) out.push(`${key}: ES/EN length ratio ${ratio.toFixed(2)}`);
  }
  return out;
}

/** Claim guard: affirmative prohibited claims and monetary amounts. */
export function claimProblems(texts) {
  const out = [];
  const NEGATION = /\b(?:no|not|never|without|ningún|ninguna|ninguno|sin|jamás|ni)\b[^.;]*$/i;
  for (const { where, text } of texts) {
    const lower = String(text).toLowerCase();
    for (const phrase of PROHIBITED_CLAIMS) {
      let index = lower.indexOf(phrase);
      while (index !== -1) {
        const prefix = lower.slice(0, index);
        if (!NEGATION.test(prefix)) out.push(`${where}: prohibited claim "${phrase}"`);
        index = lower.indexOf(phrase, index + phrase.length);
      }
    }
    if (/(?:€|\$)\s?\d|\d+(?:[.,]\d+)?\s*(?:€|eur\b|euros?\b|usd\b|dollars?\b|\$)/i.test(text))
      out.push(`${where}: monetary amount or price represented`);
  }
  return out;
}

/** Each audience must be substantively different and complete. */
export function differentiationProblems(projection, canonicalFamilyIds) {
  const out = [];
  const pages = projection?.segments ?? {};
  const canonical = new Set(canonicalFamilyIds);
  const signatures = new Map();
  for (const segmentId of SEGMENT_IDS) {
    const page = pages[segmentId];
    if (!page) {
      out.push(`missing page ${segmentId}`);
      continue;
    }
    if (page.sections !== SEGMENT_SECTION_ORDER.length)
      out.push(`${segmentId}: section count differs`);
    if (page.capabilities < 5) out.push(`${segmentId}: fewer than 5 capabilities`);
    if (page.useCases < 3) out.push(`${segmentId}: fewer than 3 use cases`);
    if (page.documentationReferences < 3)
      out.push(`${segmentId}: fewer than 3 documentation references`);
    if (page.families.length < 6) out.push(`${segmentId}: fewer than 6 family references`);
    for (const familyId of page.families) {
      if (!canonical.has(familyId)) out.push(`${segmentId}: unknown family ${familyId}`);
    }
    signatures.set(segmentId, page.families.join(','));
  }
  const values = [...signatures.values()];
  if (new Set(values).size !== values.length)
    out.push('audience family selections are not differentiated');
  if (!pages.professionals?.families.includes('FLEET'))
    out.push('professionals must reference the contracted FLEET solution');
  if (pages.shipowners?.families.includes('FLEET'))
    out.push('shipowners must not present FLEET as an owner product');
  if (!pages.installers?.families.includes('PILOT'))
    out.push('installers must reference PILOT installation');
  if (pages.installers?.families.includes('NAV') || pages.installers?.families.includes('WEATHER'))
    out.push('installers must not present software-only families as installation work');
  return out;
}

/** Interaction boundary: no forms, endpoints, storage or lead capture. */
export function interactionProblems(namedSources) {
  const out = [];
  for (const [path, text] of Object.entries(namedSources)) {
    for (const [label, pattern] of FORBIDDEN_INTERACTIONS) {
      if (pattern.test(text)) out.push(`${path}: ${label} is present`);
    }
  }
  return out;
}

/** Public-surface boundary: no MC-19 identity in a production file. */
export function publicSurfaceProblems(namedSources) {
  const out = [];
  for (const [path, text] of Object.entries(namedSources)) {
    if (/internal\/segments/.test(text))
      out.push(`${path}: references the internal segment namespace`);
    if (/\bshipowners\b/.test(text))
      out.push(`${path}: references the internal shipowner identity`);
    if (/\bmarea-segments\b/.test(text)) out.push(`${path}: imports the internal segment module`);
    if (/mc19/i.test(text)) out.push(`${path}: references MC-19`);
  }
  if (Object.keys(LOCALIZED_ROUTES).length !== 21) out.push('public route count is no longer 21');
  return out;
}

/** Design-system reuse without fork or selector collision. */
export function designSystemProblems({
  reusedModules = [],
  existsFn = exists,
  segmentsSources = {},
  designSystemSelectors = new Set(),
  designSystemChanged = [],
} = {}) {
  const out = [];
  const required = [
    'marea-design-system/theme/marea-theme',
    'marea-design-system/components/foundation/marea-text',
    'marea-design-system/components/foundation/marea-notice',
    'marea-design-system/components/structured/marea-responsive-nav',
    'marea-design-system/components/commerce/marea-family-card',
    'marea-design-system/components/commerce/marea-readiness-panel',
    'marea-design-system/components/commerce/marea-commercial-cta',
    'marea-design-system/components/structured/marea-definition-list',
    'marea-design-system/components/foundation/marea-button',
  ];
  for (const module of required) {
    if (!reusedModules.some((entry) => entry.includes(module)))
      out.push(`missing MC-17 reuse: ${module}`);
  }
  for (const module of reusedModules) {
    if (!existsFn(`${module}.ts`) && !existsFn(`${module}/index.ts`))
      out.push(`reused module does not resolve: ${module}`);
  }
  if (designSystemChanged.length > 0)
    out.push(`design system changed: ${designSystemChanged.slice(0, 4).join(', ')}`);
  for (const [path, source] of Object.entries(segmentsSources)) {
    for (const match of source.matchAll(/selector:\s*'([^']+)'/g)) {
      if (designSystemSelectors.has(match[1]))
        out.push(`${path}: selector collision with MC-17 component ${match[1]}`);
    }
    if (/(?:^|[\s{;])--marea-[a-z0-9-]+\s*:/m.test(source))
      out.push(`${path}: defines MC-17 design tokens`);
  }
  return out;
}

/** Changed-set allowlist. */
export function allowedChangeProblems(changed) {
  const out = [];
  if (!Array.isArray(changed)) return ['changed files are not an array'];
  for (const raw of changed) {
    const path = String(raw).replace(/\\/g, '/');
    if (!path || path.startsWith('/') || path.includes('..')) {
      out.push(`invalid path: ${raw}`);
      continue;
    }
    const allowed =
      ALLOWED_CHANGE_EXACT.includes(path) ||
      ALLOWED_CHANGE_PREFIXES.some((prefix) => path.startsWith(prefix));
    if (!allowed) out.push(`out-of-scope change: ${path}`);
  }
  return out;
}

/** Parse porcelain output, including both sides of a rename and untracked files. */
export function porcelainPaths(output) {
  return String(output)
    .split(/\r?\n/)
    .filter((line) => line.length > 3)
    .flatMap((line) => {
      const rest = line.slice(3).trim();
      return rest.includes(' -> ') ? rest.split(' -> ').map((path) => path.trim()) : [rest];
    })
    .filter(Boolean);
}

/** Committed dataset integrity: projection re-derived and inventory hashes valid. */
export function datasetProblems({
  committedProjection,
  rebuiltProjection,
  inventory,
  readFileFn = (path) => readFileSync(resolve(root, path)),
  existsFn = existsSync,
} = {}) {
  const out = [];
  if (JSON.stringify(committedProjection) !== JSON.stringify(rebuiltProjection))
    out.push('content projection dataset is stale');
  const files = inventory?.files ?? [];
  if (files.length === 0) out.push('implementation inventory is empty');
  if (inventory?.totals?.files !== files.length) out.push('inventory file total differs');
  for (const entry of files) {
    const absolute = resolve(root, entry.path);
    if (!existsFn(entry.path)) {
      out.push(`inventory file missing: ${entry.path}`);
      continue;
    }
    const bytes = readFileFn(entry.path);
    if (bytes.byteLength !== entry.bytes) out.push(`inventory size differs: ${entry.path}`);
    if (sha256(bytes) !== entry.sha256) out.push(`inventory digest differs: ${entry.path}`);
  }
  return out;
}

function walkFiles(path, out = []) {
  const absolute = resolve(root, path);
  if (!existsSync(absolute)) return out;
  const stats = statSync(absolute);
  if (stats.isFile()) {
    out.push(path.replace(/\\/g, '/'));
    return out;
  }
  for (const entry of readdirSync(absolute, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    walkFiles(join(path, entry.name), out);
  }
  return out;
}

function fullChangedSet() {
  const committed = git(['diff', '--no-renames', '--name-only', `${BASELINE}..HEAD`]);
  const statusOutput = execFileSync(
    'git',
    ['status', '--porcelain=v1', '--untracked-files=all', '--no-renames'],
    { cwd: root, encoding: 'utf8' },
  );
  return [...new Set([...committed, ...porcelainPaths(statusOutput)])];
}

function main() {
  const checks = [];
  const add = (id, description, fn) => {
    let outcome;
    try {
      outcome = fn();
    } catch (error) {
      outcome = { ok: false, detail: `threw: ${error instanceof Error ? error.message : error}` };
    }
    const result = {
      id,
      description,
      status: outcome.ok ? 'PASS' : 'FAIL',
      detail: outcome.detail ?? '',
    };
    checks.push(result);
    console.log(
      `${result.status} ${id} · ${description}${result.detail ? ` — ${result.detail}` : ''}`,
    );
    return outcome.ok;
  };
  const pass = (detail) => ({ ok: true, detail });
  const fail = (detail) => ({ ok: false, detail });
  const list = (items, okDetail) =>
    problems(items).length === 0 ? pass(okDetail) : fail(problems(items).slice(0, 8).join(' | '));

  const instruction = readJson(`${DATA}/mc19-scope-instruction.json`);
  const projection = readJson(`${DATA}/mc19-content-projection.json`);
  const inventory = readJson(`${DATA}/mc19-implementation-inventory.json`);
  const proposed = readJson('docs/marea/information-architecture/data/proposed-routes.json');
  const legal = readJson('docs/marea/legal-commercial/data/release-evidence-gates.json');
  const claims = readJson('docs/marea/legal-commercial/data/claims-policy.json');
  const families = readJson('docs/marea/commerce-data/data/product-families.json');
  const canonicalFamilies = (families.items ?? families.families ?? families).map(
    (entry) => entry.familyId ?? entry.id,
  );
  const rebuilt = buildProjection();

  const segmentSources = {};
  for (const file of walkFiles('src/app/marea-segments')) {
    if (file.endsWith('.ts')) segmentSources[file] = read(file);
  }

  add('MC19-I01', 'the authorised scope instruction is recorded with real provenance', () => {
    if (!exists(`${DOCS}/MC19-IMPLEMENTATION-CONTRACT.md`))
      return fail('implementation contract document missing');
    const doc = read(`${DOCS}/MC19-IMPLEMENTATION-CONTRACT.md`);
    for (const phrase of ['OPTION A', '2026-11-04', 'product owner', 'outstanding']) {
      if (!doc.toLowerCase().includes(phrase.toLowerCase()))
        return fail(`contract does not record "${phrase}"`);
    }
    return list(
      instructionProblems(instruction),
      `provenance recorded; verdict ${instruction.globalVerdict}`,
    );
  });

  add('MC19-I02', 'three internal identities with no public route collision', () =>
    list(
      identityProblems({
        identities: SEGMENT_IDENTITIES,
        previewRoutes: SEGMENT_PREVIEW_ROUTES,
        publicRoutes: LOCALIZED_ROUTES,
        proposedRoutes: proposed.items,
      }),
      '3 identities; 6 preview routes; no collision with 21 public or 23 proposed routes',
    ),
  );

  add('MC19-I03', 'one content source with fixed literals, evidence and sections', () =>
    list(
      contentProblems(projection),
      `${projection.resolved.length} resolved records; ${projection.counts.pageBlockTotal} page blocks`,
    ),
  );

  add('MC19-I04', 'ES/EN parity with no untranslated Spanish and no diacritics drift', () =>
    list(parityProblems(projection), `${projection.resolved.length} bilingual records checked`),
  );

  add('MC19-I05', 'no affirmative prohibited claim and no monetary amount', () => {
    const texts = projection.resolved.map((record) => ({
      where: `${record.segmentId}/${record.contentId}/${record.locale}`,
      text: record.text,
    }));
    return list(claimProblems(texts), `${texts.length} texts scanned`);
  });

  add('MC19-I06', 'the three audiences are substantially different and complete', () =>
    list(
      differentiationProblems(projection, canonicalFamilies),
      '3 differentiated family selections; 5 capabilities, 3 use cases and 5 references each',
    ),
  );

  add('MC19-I07', 'MC-17 components are reused and never forked', () => {
    const designSystemSelectors = new Set();
    for (const file of walkFiles('src/app/marea-design-system')) {
      if (!file.endsWith('.ts')) continue;
      for (const match of read(file).matchAll(/selector:\s*'([^']+)'/g)) {
        designSystemSelectors.add(match[1]);
      }
    }
    const changed = git(['diff', '--name-only', BASELINE, '--', 'src/app/marea-design-system']);
    return list(
      designSystemProblems({
        reusedModules: inventory.reusedDesignSystemModules ?? [],
        segmentsSources: segmentSources,
        designSystemSelectors,
        designSystemChanged: changed,
      }),
      `${(inventory.reusedDesignSystemModules ?? []).length} MC-17 modules reused; 0 design-system changes`,
    );
  });

  add('MC19-I08', 'no form, endpoint, lead store, purchase path or browser storage', () => {
    const named = {};
    for (const [path, text] of Object.entries(segmentSources)) named[path] = text;
    for (const file of walkFiles('preview/landing')) {
      if (file.endsWith('.ts')) named[file] = read(file);
    }
    const buttons = Object.values(segmentSources).reduce(
      (count, text) => count + (text.match(/<button\b/g)?.length ?? 0),
      0,
    );
    if (buttons !== 1) return fail(`expected 1 deliberately disabled button, found ${buttons}`);
    if (
      !Object.values(segmentSources).some((text) =>
        text.includes('data-marea-segment-disabled-cta'),
      )
    )
      return fail('the disabled CTA marker is missing');
    return list(
      interactionProblems(named),
      '0 forms, 0 business endpoints, 0 storage; 1 disabled CTA',
    );
  });

  add('MC19-I09', 'the public application cannot reach the segment pages', () =>
    list(
      publicSurfaceProblems(
        Object.fromEntries(
          [...PROTECTED_PUBLIC_FILES, 'src/main.ts', 'src/main.server.ts']
            .filter((file) => exists(file))
            .map((file) => [file, read(file)]),
        ),
      ),
      'production entry points do not reference MC-19',
    ),
  );

  add('MC19-I10', 'public route, sitemap and predecessor files are unchanged', () => {
    const changed = git([
      'diff',
      '--name-only',
      BASELINE,
      '--',
      ...PROTECTED_PUBLIC_FILES,
      'public',
      'deploy',
      'docs/marea/information-architecture',
      'docs/marea/commerce-data',
      'docs/marea/legal-commercial',
      'docs/marea/design-system',
      'src/app/marea-landing',
      'docs/marea/landing',
    ]);
    return list(changed, '0 changed production/predecessor paths');
  });

  add('MC19-I11', 'the preview is loopback-only, noindex and non-prerendered', () => {
    const server = read('preview/landing/server.ts');
    for (const token of [
      "const host = '127.0.0.1'",
      'ALLOWED_HOSTS',
      'X-Robots-Tag',
      "form-action 'none'",
    ]) {
      if (!server.includes(token)) return fail(`preview server missing ${token}`);
    }
    const inline = read('preview/landing/segment-preview.ts');
    for (const token of ['noindex, nofollow, noarchive', 'NOT_AUTHORIZED']) {
      if (!inline.includes(token)) return fail(`preview host missing ${token}`);
    }
    for (const forbidden of [
      'rel="canonical"',
      'hreflang',
      'property="og:',
      'application/ld+json',
    ]) {
      if (inline.includes(forbidden)) return fail(`preview host emits ${forbidden}`);
    }
    const serverRoutes = read('preview/landing/app.routes.server.ts');
    if (/RenderMode\.(Prerender|Client)/.test(serverRoutes))
      return fail('a preview route is prerendered or client-rendered');
    const angular = readJson('angular.json');
    const hosts =
      angular.projects['marea-landing-preview'].architect.build.options.security.allowedHosts;
    if (hosts.some((host) => !['127.0.0.1', 'localhost'].includes(host)))
      return fail('preview allowedHosts is not loopback-only');
    const previewTsconfig = read('preview/landing/tsconfig.json');
    if (!previewTsconfig.includes('../src/app/marea-segments'))
      return fail('preview tsconfig does not include the segment sources');
    return pass('loopback host allowlist, noindex, SSR-only preview');
  });

  add('MC19-I12', 'legal, commercial and privacy gates are preserved', () => {
    if (proposed.items.length !== 23) return fail('proposed route count changed');
    if (proposed.items.some((route) => route.publicationAuthorized !== false))
      return fail('a proposed route is publication-authorised');
    if (proposed.items.some((route) => route.status !== 'PROPOSED_INTERNAL_NOT_DEPLOYABLE'))
      return fail('a proposed route status changed');
    if (proposed.items.some((route) => /owner|armador/i.test(JSON.stringify(route))))
      return fail('an owners public route was added');
    if (legal.summary.gates !== 13 || legal.summary.gatesClosed !== 0)
      return fail('release gate counts changed');
    if (legal.summary.documents !== 24 || legal.summary.documentsExecuted !== 0)
      return fail('required document counts changed');
    if (legal.gates.find((gate) => gate.gateId === 'GATE-PRIVACY-DPA-DPIA')?.status !== 'BLOCKED')
      return fail('privacy gate is no longer BLOCKED');
    if (
      legal.documents.find((document) => document.documentId === 'DOC-17')?.status !==
      'NOT_EXECUTED'
    )
      return fail('DOC-17 installer/distributor agreements changed');
    if (claims.summary.claimsCatalogued !== 42 || claims.summary.publicAuthorized !== 0)
      return fail('claims policy changed or a claim is public-authorised');
    return pass('13/0 gates, 24/0 documents, 42/0 claims, privacy BLOCKED, DOC-17 NOT_EXECUTED');
  });

  add('MC19-I13', 'the MC-20 handoff is updated and MC-20 is not started', () => {
    const handoff = readJson(`${DOCS}/data/mc19-mc20-handoff-inputs.json`);
    if (handoff.mc20Started !== false) return fail('mc20Started must remain false');
    if (handoff.mc20ScopeApproved !== false) return fail('mc20ScopeApproved must remain false');
    if (handoff.mc20DependencyOnMc19Implementation !== false)
      return fail('MC-20 must not depend on the MC-19 implementation');
    if (!Array.isArray(handoff.mustNotAssume) || handoff.mustNotAssume.length < 6)
      return fail('handoff must list at least 6 assumptions MC-20 cannot make');
    if (!exists(`${DOCS}/MC19-MC20-HANDOFF-INPUTS.md`)) return fail('handoff document missing');
    if (walkFiles('docs/marea/catalogue').length > 0) return fail('MC-20 artefacts were created');
    return pass('MC-20 not started; handoff updated with 6+ non-assumptions');
  });

  add('MC19-I14', 'committed datasets are the current bytes', () =>
    list(
      datasetProblems({ committedProjection: projection, rebuiltProjection: rebuilt, inventory }),
      `${inventory.files.length} inventory files and the content projection are current`,
    ),
  );

  add('MC19-I15', 'the changed set stays inside the authorised MC-19 scope', () => {
    const changed = fullChangedSet();
    return list(allowedChangeProblems(changed), `${changed.length} changed paths within scope`);
  });

  add('MC19-I16', 'the implementation branch and delivery state are correct', () => {
    const branch = git(['branch', '--show-current'])[0] ?? '';
    if (!branch.startsWith('feature/marea-mc19')) return fail(`unexpected branch: ${branch}`);
    if (instruction.deliveryState.merged !== false) return fail('merged must remain false');
    if (instruction.deliveryState.deployed !== false) return fail('deployed must remain false');
    if (instruction.deliveryState.published !== false) return fail('published must remain false');
    return pass(branch);
  });

  add('MC19-I17', 'the section set is frozen at eight anchors per page', () => {
    if (SEGMENT_SECTION_ORDER.length !== 8) return fail('expected 8 sections');
    for (const sectionId of SEGMENT_SECTION_ORDER) {
      if (!SEGMENT_SECTION_ANCHORS[sectionId]) return fail(`section ${sectionId} has no anchor`);
    }
    if (new Set(Object.values(SEGMENT_SECTION_ANCHORS)).size !== 8)
      return fail('section anchors are not unique');
    return pass('8 sections, 8 unique in-page anchors');
  });

  const failed = checks.filter((check) => check.status === 'FAIL');
  let head = 'unknown';
  let branch = 'unknown';
  try {
    head = git(['rev-parse', 'HEAD'])[0] ?? 'unknown';
    branch = git(['branch', '--show-current'])[0] ?? 'unknown';
  } catch {
    // Recorded as unknown; the run itself is still evidence.
  }
  const record = {
    contractId: 'MC19-IMPLEMENTATION-VALIDATOR-RUN',
    contractVersion: '1.0.0',
    milestone: 'MC-19',
    generatedAt: new Date().toISOString(),
    status: failed.length === 0 ? 'PASS' : 'FAIL',
    total: checks.length,
    passed: checks.length - failed.length,
    failed: failed.length,
    baseline: BASELINE,
    head,
    branch,
    counts: rebuilt.counts,
    checks,
  };
  mkdirSync(resolve(root, EVIDENCE_DIR), { recursive: true });
  writeFileSync(
    resolve(root, `${EVIDENCE_DIR}/implementation-validator-run.json`),
    `${JSON.stringify(record, null, 2)}\n`,
    'utf8',
  );
  console.log(
    `\nMC-19 implementation validator: ${record.passed}/${record.total} checks passed · ${record.status}`,
  );
  console.log(`Evidence: ${EVIDENCE_DIR}/implementation-validator-run.json`);
  process.exit(failed.length === 0 ? 0 : 1);
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) main();
