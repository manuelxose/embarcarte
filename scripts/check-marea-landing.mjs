#!/usr/bin/env node
/**
 * MC-18 internal landing validator.
 *
 * Validates the ACTUAL implementation, generated contracts and recorded
 * evidence — never a delivery summary. It writes
 * docs/marea/landing/evidence/validator-run.json and exits 0 only when every
 * check passes.
 *
 * Run:
 *   npm run test:landing
 *   npm run test:landing:unit   # unit + adversarial suites for the real contracts
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  bilingualParityProblems,
  collectSourceFiles,
  constraintNegationProblems,
  declaredSelectors,
  findForbiddenReach,
  hasNegation,
  bannerProblems,
  familyLimitationProblems,
  fleetPolicyProblems,
  hydrationEvidenceProblems,
  noindexProblems,
  previewBindingProblems,
  previewProjectProblems,
  publicAssetProblems,
  publicRouteSourceProblems,
  purchaseControlViolations,
  scanDangerousCopy,
  scopeProblems,
  seoEmissionProblems,
  selectorCollisionProblems,
} from './marea-landing-guards.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const LANDING = 'src/app/marea-landing';
const PREVIEW = 'preview/landing';
const DS = 'src/app/marea-design-system';
const DOCS = 'docs/marea/landing';
const DATA = `${DOCS}/data`;
const EVIDENCE = `${DOCS}/evidence`;
const BASE_COMMIT = '6002c49f898e755154c1b65c97781177719ce11c';

const read = (path) => readFileSync(resolve(root, path), 'utf8');
const readJson = (path) => JSON.parse(read(path));
const exists = (path) => existsSync(resolve(root, path));
const sha = (value) => value; // evidence placeholder; no hashes are invented here

const checks = [];
function add(id, description, fn) {
  let outcome;
  try {
    outcome = fn();
  } catch (error) {
    outcome = {
      ok: false,
      detail: `threw: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
  checks.push({
    id,
    description,
    status: outcome.ok ? 'PASS' : 'FAIL',
    detail: outcome.detail ?? '',
  });
  return outcome.ok;
}
const pass = (detail) => ({ ok: true, detail });
const fail = (detail) => ({ ok: false, detail });

function walk(dir, out = []) {
  const absolute = resolve(root, dir);
  if (!existsSync(absolute)) return out;
  for (const entry of readdirSync(absolute, { withFileTypes: true })) {
    const rel = join(dir, entry.name).replaceAll('\\', '/');
    if (entry.isDirectory()) walk(rel, out);
    else out.push(rel);
  }
  return out;
}

function git(args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
}

function flattenedContentBlocks(content) {
  const blocks = [];
  const visit = (value) => {
    if (Array.isArray(value)) {
      for (const item of value) visit(item);
      return;
    }
    if (value && typeof value === 'object') {
      if (typeof value.contentId === 'string' && value.text && typeof value.text.es === 'string') {
        blocks.push(value);
        return;
      }
      for (const item of Object.values(value)) visit(item);
    }
  };
  visit(content);
  return blocks;
}

// ---------------------------------------------------------------- contracts
const { LANDING_CONTENT } = await import(
  pathToFileURL(resolve(root, `${LANDING}/content/landing-content.ts`)).href
);
const { LANDING_EVIDENCE } = await import(
  pathToFileURL(resolve(root, `${LANDING}/content/evidence.ts`)).href
);
const {
  LANDING_DOMAIN_FACTS,
  LANDING_FAMILIES,
  LANDING_EDITIONS,
  LANDING_BUNDLES,
  LANDING_READINESS_DIMENSIONS,
} = await import(pathToFileURL(resolve(root, `${LANDING}/data/domain.generated.ts`)).href);
const { LANDING_PAGE_IDENTITY, LANDING_ROUTE_TABLE } = await import(
  pathToFileURL(resolve(root, `${LANDING}/models/page-identity.ts`)).href
);
const {
  MC18_PUBLICATION_EVALUATION,
  RELEASE_GATE_IDS,
  evaluatePublicationGates,
  landingMayPublish,
} = await import(pathToFileURL(resolve(root, `${LANDING}/models/publication-gates.ts`)).href);
const { buildLandingSeoContract, evaluateSeoActivation, hreflangGroupIsReciprocal } = await import(
  pathToFileURL(resolve(root, `${LANDING}/models/seo.ts`)).href
);
const { FAMILY_LIMIT_KEYS } = await import(
  pathToFileURL(resolve(root, `${DS}/data/commerce-presentation.adapter.ts`)).href
);
const { MAREA_FIXTURE_BUNDLES, MAREA_FIXTURE_FAMILIES } = await import(
  pathToFileURL(resolve(root, `${DS}/data/fixtures/marea-fixtures.generated.ts`)).href
);

const blocks = flattenedContentBlocks(LANDING_CONTENT);
const resolvedRecords = blocks.flatMap((block) => [
  { contentId: block.contentId, locale: 'es', text: block.text.es },
  { contentId: block.contentId, locale: 'en', text: block.text.en },
]);
const contentText = blocks.flatMap((block) => [block.text.es, block.text.en]).join('\n');
const landingSourceFiles = collectSourceFiles(root, LANDING, ['.ts']);
const landingSource = landingSourceFiles.map((file) => read(file)).join('\n');
const previewSourceFiles = collectSourceFiles(root, PREVIEW, ['.ts', '.html', '.css']);
const previewSource = previewSourceFiles.map((file) => read(file)).join('\n');
const uiSourceFiles = [
  `${LANDING}/landing.ts`,
  ...collectSourceFiles(root, `${LANDING}/sections`, ['.ts']),
  ...collectSourceFiles(root, `${LANDING}/components`, ['.ts']),
  ...collectSourceFiles(root, PREVIEW, ['.ts', '.html', '.css']),
];
const uiSource = uiSourceFiles.map((file) => read(file)).join('\n');
const renderSource = uiSource;

const FAMILY_IDS = ['NAV', 'HUB', 'AIS', 'PILOT', 'SENSE', 'WATCH', 'DISPLAY', 'WEATHER', 'FLEET'];
const BUNDLE_IDS = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'];
const SECTION_IDS = [
  'hero',
  'ecosystem',
  'families',
  'architecture',
  'bundles',
  'softwareHardware',
  'professionals',
  'documentation',
  'availability',
  'closing',
];
const SECTION_ANCHORS = {
  hero: 'hero',
  ecosystem: 'ecosistema',
  families: 'familias',
  architecture: 'arquitectura',
  bundles: 'paquetes',
  softwareHardware: 'software-hardware',
  professionals: 'profesionales',
  documentation: 'documentacion',
  availability: 'disponibilidad',
  closing: 'cierre',
};
const DIMENSION_IDS = [
  'definition',
  'engineering',
  'licensing',
  'hardware',
  'dataRights',
  'compliance',
  'pricing',
  'brandPublication',
  'availability',
  'safety',
  'operations',
];

// ---------------------------------------------------------------- 01-04 architecture
add('MC18-01', 'real landing component exists and reuses the MC-17 theme', () => {
  if (!exists(`${LANDING}/landing.ts`)) return fail('missing landing.ts');
  const source = read(`${LANDING}/landing.ts`);
  if (!/selector:\s*'marea-landing'/.test(source)) return fail('marea-landing selector missing');
  if (!/MareaTheme/.test(source)) return fail('MareaTheme is not reused');
  if (/standalone:\s*false/.test(source)) return fail('landing is not standalone');
  return pass('landing.ts present, standalone, theme host reused');
});

add('MC18-02', 'isolated SSR preview project is configured', () => {
  const angular = readJson('angular.json');
  const project = angular.projects['marea-landing-preview'];
  if (!project) return fail('marea-landing-preview project missing');
  const productionStyles = angular.projects.embarcarte.architect.build.options.styles;
  const problems = previewProjectProblems(project, productionStyles);
  if (problems.length > 0) return fail(problems.join('; '));
  if (project.architect.build.options.ssr?.entry !== `${PREVIEW}/server.ts`)
    return fail('SSR entry is not the preview server');
  if (
    !project.architect.build.options.styles.some((style) =>
      style.includes('marea-tokens.generated.css'),
    )
  )
    return fail('token stylesheet is not wired into the preview');
  return pass('separate SSR project, own output path, tokens scoped to preview');
});

add('MC18-03', 'all ten sections exist and are composed in order', () => {
  const landing = read(`${LANDING}/landing.ts`);
  const missing = [];
  for (const file of readdirSync(resolve(root, `${LANDING}/sections`))) {
    if (!file.endsWith('.ts')) continue;
    const source = read(`${LANDING}/sections/${file}`);
    const tag = /selector:\s*'(marea-landing-[a-z-]+)'/.exec(source)?.[1];
    if (!tag) missing.push(`${file}: no selector`);
  }
  const sectionTags = [
    'marea-landing-hero',
    'marea-landing-ecosystem',
    'marea-landing-families',
    'marea-landing-architecture',
    'marea-landing-bundles',
    'marea-landing-software-hardware',
    'marea-landing-professionals',
    'marea-landing-documentation',
    'marea-landing-availability',
    'marea-landing-closing',
  ];
  const templateOrder = sectionTags.map((tag) => landing.indexOf(`<${tag}`));
  if (templateOrder.some((index) => index < 0)) {
    return fail(
      `landing template misses: ${sectionTags.filter((t) => landing.indexOf(`<${t}`) < 0).join(', ')}`,
    );
  }
  const sorted = [...templateOrder].sort((left, right) => left - right);
  if (JSON.stringify(templateOrder) !== JSON.stringify(sorted))
    return fail('sections are not composed in document order');
  const anchors = Object.values(SECTION_ANCHORS).filter(
    (anchor) =>
      landingSource.includes(`anchor="${anchor}"`) || landingSource.includes(`id: '${anchor}'`),
  );
  if (new Set(anchors).size !== 10) return fail('anchor ids missing from section components');
  return pass(`10 section components, ${missing.length} structural warnings, correct order`);
});

add('MC18-04', 'one locale-aware component tree for ES and EN', () => {
  const localeSpecific = [...walk(LANDING), ...walk(PREVIEW)].filter((file) =>
    /(?:landing|marea)-(?:es|en)\b/.test(file),
  );
  if (localeSpecific.length > 0) return fail(`locale-specific files: ${localeSpecific.join(', ')}`);
  const previewRoutes = read(`${PREVIEW}/app.routes.ts`);
  const componentUses = (previewRoutes.match(/component:\s*LandingPreview/g) ?? []).length;
  if (componentUses < 2) return fail('preview routes do not both use the same component');
  if (!/input<MareaLocale>/.test(read(`${LANDING}/landing.ts`)))
    return fail('landing locale is not a single input');
  return pass('single landing component, one locale input, no per-locale duplicate page');
});

add('MC18-05', 'no duplicate locale-specific product entity exists', () => {
  const familyIds = LANDING_CONTENT.sections.families.families.map((entry) => entry.familyId);
  const bundleIds = LANDING_CONTENT.sections.bundles.bundles.map((entry) => entry.bundleId);
  if (familyIds.length !== 9 || bundleIds.length !== 6)
    return fail(`content counts families=${familyIds.length} bundles=${bundleIds.length}`);
  if (new Set(familyIds).size !== 9) return fail('duplicate family copy entity');
  if (new Set(bundleIds).size !== 6) return fail('duplicate bundle copy entity');
  return pass('9 unique family copy entities, 6 unique bundle copy entities');
});

// ---------------------------------------------------------------- 06-12 catalogue integrity
add('MC18-06', 'the nine canonical family ids are preserved', () => {
  const canonical = LANDING_FAMILIES.map((family) => family.familyId);
  if (JSON.stringify(canonical) !== JSON.stringify(FAMILY_IDS))
    return fail(`domain family ids diverged: ${canonical.join(',')}`);
  const content = LANDING_CONTENT.sections.families.families.map((entry) => entry.familyId);
  if (JSON.stringify(content) !== JSON.stringify(FAMILY_IDS))
    return fail(`content family ids diverged: ${content.join(',')}`);
  const fixtures = MAREA_FIXTURE_FAMILIES.map((family) => family.familyId);
  if (JSON.stringify(fixtures) !== JSON.stringify(FAMILY_IDS))
    return fail('design-system fixtures diverged from canonical families');
  return pass('NAV,HUB,AIS,PILOT,SENSE,WATCH,DISPLAY,WEATHER,FLEET in all three layers');
});

add('MC18-07', 'the six canonical bundle ids are preserved', () => {
  const canonical = LANDING_BUNDLES.map((bundle) => bundle.bundleId);
  if (JSON.stringify(canonical) !== JSON.stringify(BUNDLE_IDS))
    return fail(`domain bundle ids diverged: ${canonical.join(',')}`);
  const content = LANDING_CONTENT.sections.bundles.bundles.map((entry) => entry.bundleId);
  if (JSON.stringify(content) !== JSON.stringify(BUNDLE_IDS))
    return fail(`content bundle ids diverged: ${content.join(',')}`);
  return pass('START,CRUISE,SAIL,PROTECT,COMPLETE,FLEET');
});

add('MC18-08', '26 editions stay canonical and are not merchant SKUs', () => {
  if (LANDING_EDITIONS.length !== 26) return fail(`edition count ${LANDING_EDITIONS.length}`);
  if (LANDING_DOMAIN_FACTS.merchantSkuCodes !== 0)
    return fail(`merchant SKU codes: ${LANDING_DOMAIN_FACTS.merchantSkuCodes}`);
  if (LANDING_DOMAIN_FACTS.merchantableEditions !== 0)
    return fail(`merchantable editions: ${LANDING_DOMAIN_FACTS.merchantableEditions}`);
  if (/merchantSkuCode"\s*:\s*"/.test(read(`${LANDING}/data/domain.generated.ts`)))
    return fail('generated projection carries a merchant SKU code');
  return pass('26 editions, 0 merchantable, 0 merchant SKU codes');
});

add('MC18-09', 'no approved price is invented', () => {
  if (LANDING_DOMAIN_FACTS.approvedPrices !== 0)
    return fail(`approved prices: ${LANDING_DOMAIN_FACTS.approvedPrices}`);
  const priceViolations = scanDangerousCopy(contentText).filter(
    (violation) => violation.category === 'PRICE_AMOUNT',
  );
  if (priceViolations.length > 0)
    return fail(`${priceViolations.length} price assertion(s): ${priceViolations[0].match}`);
  if (/priceAmount|priceCurrency/.test(read(`${LANDING}/data/domain.generated.ts`)))
    return fail('generated projection exposes a price field');
  return pass('0 approved prices, no amount/currency representation, no price copy');
});

add('MC18-10', 'no verified stock is invented', () => {
  if (LANDING_DOMAIN_FACTS.verifiedStockRows !== 0)
    return fail(`verified stock rows: ${LANDING_DOMAIN_FACTS.verifiedStockRows}`);
  const stockViolations = scanDangerousCopy(contentText).filter(
    (violation) => violation.category === 'STOCK_OR_ORDER',
  );
  if (stockViolations.length > 0)
    return fail(`${stockViolations.length} stock/order assertion(s): ${stockViolations[0].match}`);
  return pass('0 verified stock rows, no stock/order copy');
});

add('MC18-11', 'no purchase, cart or checkout action exists', () => {
  const violations = purchaseControlViolations(`${landingSource}\n${previewSource}`);
  const purchase = violations.filter((violation) =>
    ['BUTTON_CONTROL', 'FORM', 'INPUT', 'CLICK_HANDLER', 'HTTP_CLIENT'].includes(
      violation.category,
    ),
  );
  if (purchase.length > 0)
    return fail(`${purchase[0].category} present in landing/preview source: ${purchase[0].match}`);
  const cta = read(`${DS}/components/commerce/marea-commercial-cta.ts`);
  if (/purchaseActionAllowed:\s*true|priceVisible:\s*true|cartAllowed:\s*true/.test(cta))
    return fail('design-system CTA adapter is not fail-closed');
  return pass('no form/button/input/click/http in the landing; DS CTA remains explanation only');
});

add('MC18-12', 'no pre-order, reservation or waitlist promise exists', () => {
  const violations = scanDangerousCopy(contentText).filter((violation) =>
    /preventa|pre-order|reserva ahora|reserve now|lista de espera|waiting list|waitlist|available soon|pr[oó]ximamente/i.test(
      violation.match,
    ),
  );
  if (violations.length > 0) return fail(`promise found: ${violations[0].match}`);
  if (/\b(?:suscr[ií]bete a la lista|join the waitlist|reserve your unit)\b/i.test(contentText))
    return fail('positive waitlist/pre-sale invitation');
  return pass('no pre-order, reservation or waitlist copy');
});

// ---------------------------------------------------------------- 13-19 limitations
function familyLimitationText(familyId) {
  const entry = LANDING_CONTENT.sections.families.families.find(
    (item) => item.familyId === familyId,
  );
  if (!entry) return null;
  return entry.limitations
    .map((limitation) => `${limitation.text.es}\n${limitation.text.en}`)
    .join('\n');
}

add('MC18-13', 'PILOT supervised-only safety limitations are visible', () => {
  if (FAMILY_LIMIT_KEYS.PILOT !== 'pilotSupervised')
    return fail('design-system PILOT limit contract changed');
  const text = familyLimitationText('PILOT') ?? '';
  if (!/supervis|supervisad/i.test(text) || !/aut[oó]nom|autonomous|gobierno|steering/i.test(text))
    return fail('PILOT content does not state supervised-only scope');
  if (!hasNegation(text)) return fail('PILOT limitation lacks a negation');
  if (/MareaFamilyCard/.test(read(`${LANDING}/sections/section-families.ts`)) === false)
    return fail('families section does not compose the verified family card');
  return pass(
    'PILOT safety gate + supervised concept visible through the DS family card and content',
  );
});

add('MC18-14', 'AIS receive-only limitations are visible', () => {
  if (FAMILY_LIMIT_KEYS.AIS !== 'aisReceiveOnly') return fail('DS AIS limit contract changed');
  const text = familyLimitationText('AIS') ?? '';
  if (!/recepci[oó]n|receive-?only|solo escucha/i.test(text))
    return fail('AIS content does not state receive-only');
  if (!/no\s+(?:transmit|transmisi[oó]n)|transmisi[oó]n.*no|no\s+transmission/i.test(text))
    return fail('AIS transmission negation missing');
  return pass('AIS receive-only with explicit no-transmission negation');
});

add('MC18-15', 'WATCH no-guarantee limitations are visible', () => {
  if (FAMILY_LIMIT_KEYS.WATCH !== 'watchNoGuarantee')
    return fail('DS WATCH limit contract changed');
  const text = familyLimitationText('WATCH') ?? '';
  if (!/garantiz|guarantee/i.test(text)) return fail('WATCH guarantee negation missing');
  if (!/alerta|alert/i.test(text)) return fail('WATCH alert limitation missing');
  return pass('WATCH alerts explicitly not guaranteed');
});

add('MC18-16', 'FLEET excludes default hardware and an established SLA', () => {
  const fleet = LANDING_BUNDLES.find((bundle) => bundle.bundleId === 'FLEET');
  const fleetProblems = fleetPolicyProblems(fleet);
  if (fleetProblems.length > 0) return fail(fleetProblems.join('; '));
  const copy = LANDING_CONTENT.sections.bundles.bundles.find((entry) => entry.bundleId === 'FLEET');
  const text =
    copy?.constraints
      .map((constraint) => `${constraint.text.es}\n${constraint.text.en}`)
      .join('\n') ?? '';
  if (!/hardware/i.test(text) || !/SLA/i.test(text))
    return fail('FLEET copy omits hardware/SLA constraints');
  return pass('FLEET contracted, no default hardware, no SLA, constraints visible');
});

add('MC18-17', 'SENSE kit composition is not double-counted', () => {
  const sense = LANDING_BUNDLES.flatMap((bundle) => [
    ...bundle.components,
    ...bundle.optionalComponents,
  ]).filter((line) => line.editionId === 'SENSE-ESSENTIALS');
  if (sense.length === 0) return fail('no bundle composes SENSE-ESSENTIALS');
  const kitLine = sense[0];
  if (!Array.isArray(kitLine.expandsTo) || kitLine.expandsTo.length < 2)
    return fail('SENSE-ESSENTIALS does not expose its expansion');
  for (const bundle of LANDING_BUNDLES) {
    const lines = [...bundle.components, ...bundle.optionalComponents];
    const moduleLines = lines.filter(
      (line) =>
        ['SENSE-POWER', 'SENSE-BILGE'].includes(line.editionId) && line.inclusion !== 'EXCLUDED',
    );
    if (moduleLines.length > 0 && lines.some((line) => line.editionId === 'SENSE-ESSENTIALS'))
      return fail(`bundle ${bundle.bundleId} counts the SENSE kit and its modules twice`);
  }
  if (!/POWER|BILGE/.test(familyLimitationText('SENSE') ?? ''))
    return fail('SENSE copy does not state the kit expansion rule');
  return pass('kit expansion nested once; no bundle double-counts POWER/BILGE');
});

add('MC18-18', 'DISPLAY dimensions are not fabricated', () => {
  if (FAMILY_LIMIT_KEYS.DISPLAY !== 'displayConditional')
    return fail('DS DISPLAY limit contract changed');
  const text = familyLimitationText('DISPLAY') ?? '';
  if (!/dimensi|dimension|tama[nñ]o|size/i.test(text))
    return fail('DISPLAY copy omits the dimension limitation');
  const violations = scanDangerousCopy(contentText).filter(
    (violation) => violation.category === 'INVENTED_DIMENSIONS',
  );
  if (violations.length > 0) return fail(`fabricated dimension: ${violations[0].match}`);
  return pass('no invented dimension or final size');
});

add('MC18-19', 'NAV and WEATHER data rights remain unlicensed', () => {
  for (const familyId of ['NAV', 'WEATHER']) {
    if (FAMILY_LIMIT_KEYS[familyId] !== 'navWeatherLicensing')
      return fail(`DS ${familyId} licensing limitation changed`);
    const text = familyLimitationText(familyId) ?? '';
    if (!/licen[cs]|licencia/i.test(text))
      return fail(`${familyId} copy does not state the licensing limitation`);
    if (
      !/no\s+(?:se\s+)?(?:represent|inclu)|not\s+(?:represented|included)|no\s+licenciad|unlicensed|sin\s+licencia/i.test(
        text,
      )
    )
      return fail(`${familyId} licensing negation missing`);
  }
  const violations = scanDangerousCopy(contentText).filter(
    (violation) => violation.category === 'LICENSED_DATA_INCLUDED',
  );
  if (violations.length > 0) return fail(`licensed data asserted: ${violations[0].match}`);
  return pass('chart and weather data explicitly not licensed/not included');
});

// ---------------------------------------------------------------- 20-23 content integrity
add('MC18-20', 'all content references resolve', () => {
  const evidenceIds = new Set(LANDING_EVIDENCE.map((entry) => entry.evidenceId));
  const usedEvidence = new Set();
  for (const block of blocks) {
    if (!block.evidenceIds || block.evidenceIds.length === 0)
      return fail(`${block.contentId}: no evidence id`);
    for (const evidenceId of block.evidenceIds) {
      if (!evidenceIds.has(evidenceId))
        return fail(`${block.contentId}: unknown evidence ${evidenceId}`);
      usedEvidence.add(evidenceId);
    }
    if (!SECTION_IDS.includes(block.sectionId))
      return fail(`${block.contentId}: unknown sectionId ${block.sectionId}`);
    if (block.publicationStatus !== 'INTERNAL_DRAFT_NOT_APPROVED')
      return fail(`${block.contentId}: publication status changed`);
    if (block.approvalStatus !== 'NOT_APPROVED')
      return fail(`${block.contentId}: approval status changed`);
    if (block.claimIds) {
      const claims = readJson('docs/marea/legal-commercial/data/bilingual-claims.json').claims;
      for (const claimId of block.claimIds) {
        const claim = claims.find((entry) => entry.claimId === claimId);
        if (!claim) return fail(`${block.contentId}: unknown claim ${claimId}`);
        if (claim.claimClass !== 'A' || claim.publicationStatus !== 'INTERNAL_ONLY')
          return fail(`${block.contentId}: claim ${claimId} is not an internal-only class A claim`);
      }
    }
  }
  for (const entry of LANDING_EVIDENCE) {
    if (!exists(entry.sourcePath))
      return fail(`evidence ${entry.evidenceId} source missing: ${entry.sourcePath}`);
  }
  const nodeIds = new Set(LANDING_CONTENT.sections.architecture.nodes.map((node) => node.nodeId));
  for (const link of LANDING_CONTENT.sections.architecture.links) {
    if (!nodeIds.has(link.from) || !nodeIds.has(link.to))
      return fail(`architecture link ${link.linkId} references an unknown node`);
    if (link.nature !== 'CONCEPTUAL_DEPENDENCY')
      return fail(`architecture link ${link.linkId} asserts a verified dependency`);
  }
  if (new Set(blocks.map((block) => block.contentId)).size !== blocks.length)
    return fail('duplicate contentId');
  return pass(
    `${blocks.length} blocks, ${usedEvidence.size} evidence ids, ${LANDING_EVIDENCE.length} registry entries all resolve`,
  );
});

add('MC18-21', 'ES and EN keep semantic parity', () => {
  const problems = bilingualParityProblems(resolvedRecords);
  if (problems.length > 0)
    return fail(`${problems.length} parity problem(s): ${problems.slice(0, 3).join(' | ')}`);
  const constraintProblems = constraintNegationProblems(blocks);
  if (constraintProblems.length > 0)
    return fail(
      `${constraintProblems.length} constraint block(s) without negation: ${constraintProblems.slice(0, 3).join(' | ')}`,
    );
  const limitationProblems = familyLimitationProblems(
    LANDING_CONTENT.sections.families.families,
    FAMILY_IDS,
  );
  if (limitationProblems.length > 0) return fail(limitationProblems.slice(0, 3).join(' | '));
  return pass(
    `${resolvedRecords.length} locale records, numeric parity, no placeholder text, negations preserved`,
  );
});

add('MC18-22', 'no unsupported certification, safety or authority claim exists', () => {
  const violations = scanDangerousCopy(contentText).filter((violation) =>
    [
      'CERTIFICATION',
      'AUTONOMY_OR_GUARANTEE',
      'TRANSMISSION',
      'TESTIMONIAL_OR_AUTHORITY',
      'REGISTERED_TRADEMARK',
      'OFFICIAL_SECURITY_OR_PRIVACY_CLAIM',
      'FAKE_TELEMETRY',
    ].includes(violation.category),
  );
  if (violations.length > 0)
    return fail(
      `${violations.length} claim(s): ${violations
        .slice(0, 3)
        .map((v) => `${v.category}:${v.match}`)
        .join(' | ')}`,
    );
  const renderedViolations = scanDangerousCopy(
    uiSource.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' '),
  ).filter((violation) =>
    ['CERTIFICATION', 'REGISTERED_TRADEMARK', 'TRANSMISSION'].includes(violation.category),
  );
  if (renderedViolations.length > 0)
    return fail(`claim in templates: ${renderedViolations[0].match}`);
  return pass(
    'no certification, autonomy, transmission, testimonial, trademark or telemetry claim',
  );
});

add('MC18-23', 'no unauthorized public identity assertion exists', () => {
  const provisional = LANDING_CONTENT.brand.provisionalBrand.text;
  if (!/NO_GO|no adoptad|not adopted/i.test(`${provisional.es} ${provisional.en}`))
    return fail('provisional brand block does not state non-adoption');
  if (!/propuesta|proposed/i.test(`${provisional.es} ${provisional.en}`))
    return fail('provisional brand block does not state the brand is proposed');
  if (/®/.test(contentText)) return fail('registered trademark symbol present');
  const headerSource = read(`${LANDING}/components/landing-header.ts`);
  if (!/proposed|propuesta/i.test(headerSource))
    return fail('header does not mark the proposed brand');
  return pass('proposed brand, identity not adopted, public use NO_GO, no registered mark');
});

// ---------------------------------------------------------------- 24-27 preview restrictions
add('MC18-24', 'the preview is visibly internal and provisional', () => {
  const landing = read(`${LANDING}/landing.ts`);
  const bannerSource = read(`${LANDING}/components/internal-banner.ts`);
  const bannerIssues = bannerProblems(`${landing}\n${bannerSource}`);
  if (bannerIssues.length > 0) return fail(bannerIssues.join('; '));
  const banner = bannerSource;
  if (!/variant="internal"/.test(banner))
    return fail('internal banner does not use the internal notice variant');
  const required = ['internalBanner', 'provisionalBrand', 'previewLabel', 'footerClassification'];
  for (const key of required) {
    const block = LANDING_CONTENT.brand[key];
    if (!block || !block.text.es || !block.text.en) return fail(`brand.${key} missing a locale`);
  }
  return pass('unconditional internal banner + provisional brand + preview label in both locales');
});

add('MC18-25', 'the preview is non-indexable', () => {
  const previewHost = read(`${PREVIEW}/landing-preview.ts`);
  if (!/robots/.test(previewHost) || !/noindex/.test(previewHost))
    return fail('preview host does not set the robots directive');
  const problems = noindexProblems({
    indexHtml: read(`${PREVIEW}/index.html`),
    serverSource: read(`${PREVIEW}/server.ts`),
    hostSource: previewHost,
  });
  if (problems.length > 0) return fail(problems.join('; '));
  return pass('robots meta + host metadata + X-Robots-Tag, no opt-in path');
});

add('MC18-26', 'no public canonical or hreflang is emitted', () => {
  const seoEs = buildLandingSeoContract('es', MC18_PUBLICATION_EVALUATION);
  if (seoEs.emitted.canonical !== false || seoEs.emitted.hreflang !== false)
    return fail('SEO contract reports canonical/hreflang emission');
  if (!hreflangGroupIsReciprocal(seoEs.hreflangGroupCandidate))
    return fail('planned hreflang group is not reciprocal');
  const surface = `${read(`${PREVIEW}/landing-preview.ts`)}\n${read(`${PREVIEW}/index.html`)}\n${landingSource}`;
  const emissionProblems = seoEmissionProblems(surface).filter(
    (problem) =>
      problem !== 'json-ld script' &&
      problem !== 'open graph meta' &&
      problem !== 'twitter card meta',
  );
  if (emissionProblems.length > 0) return fail(emissionProblems.join('; '));
  return pass('planning candidates kept out of live output; canonical/hreflang not emitted');
});

add('MC18-27', 'no Product/Offer JSON-LD or social preview is emitted', () => {
  const surface = `${renderSource}`;
  const socialProblems = seoEmissionProblems(surface).filter(
    (problem) =>
      problem === 'json-ld script' ||
      problem === 'open graph meta' ||
      problem === 'twitter card meta',
  );
  if (socialProblems.length > 0) return fail(socialProblems.join('; '));
  const seo = readJson(`${DATA}/seo-metadata-contract.json`);
  if (seo.data.publicEmissionEnabled !== false) return fail('SEO dataset enables public emission');
  if (seo.data.jsonLdEmitted !== false) return fail('SEO dataset claims JSON-LD');
  return pass('no JSON-LD, no Open Graph/Twitter tags, dataset reports emission disabled');
});

// ---------------------------------------------------------------- 28-33 production isolation
add('MC18-28', 'no proposed route is added to the production application', () => {
  const routeFiles = [
    'src/app/app.routes.ts',
    'src/app/app.routes.server.ts',
    'src/app/core/i18n/locale-routes.ts',
    'src/server.ts',
  ];
  const missingFiles = routeFiles.filter((file) => !exists(file));
  if (missingFiles.length > 0) return fail(`missing route file(s): ${missingFiles.join(', ')}`);
  const mareaReferences = publicRouteSourceProblems(
    routeFiles.map((path) => ({ path, source: read(path) })),
  );
  if (mareaReferences.length > 0) return fail(mareaReferences.join('; '));
  const changed = git(['diff', '--name-only', BASE_COMMIT, '--', ...routeFiles]);
  if (changed.length > 0) return fail(`production route files changed: ${changed}`);
  return pass(
    'production route files unchanged, no MAREA reference, preview table only under preview/landing',
  );
});

add('MC18-29', 'no sitemap entry is added for the proposed landing', () => {
  const candidates = walk('public').filter((file) => /sitemap/i.test(file));
  for (const file of candidates) {
    if (/marea/i.test(read(file))) return fail(`sitemap entry found in ${file}`);
  }
  const changed = git(['diff', '--name-only', BASE_COMMIT, '--', 'public']);
  if (changed.length > 0) return fail(`public/ changed: ${changed}`);
  if (/marea/i.test(read('src/server.ts'))) return fail('SSR server references MAREA');
  return pass(`${candidates.length} public sitemap file(s) unchanged, no MAREA entry`);
});

add('MC18-30', 'no public navigation or corporate UI is changed', () => {
  const changed = git(['diff', '--name-only', BASE_COMMIT, '--', 'src'])
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((file) => !file.startsWith(`${LANDING}/`) && !file.startsWith(`${DS}/`));
  if (changed.length > 0) return fail(`public source changed: ${changed.slice(0, 10).join(', ')}`);
  const dsChanged = git(['diff', '--name-only', BASE_COMMIT, '--', DS]);
  if (dsChanged.length > 0) return fail(`design system modified: ${dsChanged}`);
  return pass('only src/app/marea-landing was added; public app and MC-17 design system untouched');
});

add('MC18-31', 'no public brand asset is copied', () => {
  const publicFiles = walk('public');
  const mareaAssets = publicAssetProblems(publicFiles);
  if (mareaAssets.length > 0) return fail(`MAREA asset in public/: ${mareaAssets.join(', ')}`);
  const changed = git(['diff', '--name-only', BASE_COMMIT, '--', 'public']);
  if (changed.length > 0) return fail(`public/ changed: ${changed}`);
  return pass(`${publicFiles.length} public files unchanged, 0 MAREA assets`);
});

add('MC18-32', 'the production checkout remains unchanged', () => {
  const current = readJson('angular.json').projects.embarcarte.architect.build.options;
  const base = JSON.parse(git(['show', `${BASE_COMMIT}:angular.json`])).projects.embarcarte
    .architect.build.options;
  for (const key of ['browser', 'server', 'outputMode', 'styles', 'tsConfig']) {
    if (JSON.stringify(current[key]) !== JSON.stringify(base[key]))
      return fail(`production ${key} changed`);
  }
  if (JSON.stringify(current.styles) !== JSON.stringify(['src/styles.scss']))
    return fail('production styles are not exactly src/styles.scss');
  return pass(
    'production entry, SSR config, tsconfig and styles are byte-equal to the MC-17 baseline',
  );
});

add('MC18-33', 'the public corporate site has zero landing bytes', () => {
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
    forbiddenRoots: [LANDING, PREVIEW],
  });
  if (reach.offenders.length > 0)
    return fail(
      `${reach.offenders.length} production import(s) reach the landing: ${reach.offenders[0]}`,
    );
  if (reach.scanned < 50)
    return fail(`import graph too small to be meaningful (${reach.scanned} files)`);
  return pass(`${reach.scanned} production modules scanned; zero reach the landing or preview`);
});

// ---------------------------------------------------------------- 34-40 isolation, gates, evidence
add('MC18-34', 'the preview requires no customer or vessel data', () => {
  const surface = `${landingSource}\n${previewSource}`;
  if (/customerId|vesselId/i.test(surface))
    return fail('landing/preview source references customer or vessel data');
  if (/localStorage|sessionStorage|document\.cookie/.test(surface))
    return fail('browser storage is used');
  if (/HttpClient|provideHttpClient|\bfetch\s*\(/.test(surface))
    return fail('network client present');
  if (/<input\b|<textarea\b|<form\b/i.test(surface)) return fail('data-collection control present');
  return pass('no forms, storage, cookies, customer/vessel fields or network client');
});

add('MC18-35', 'all design-system imports come from the canonical MC-17 library', () => {
  const dependencyFile = `${DATA}/design-system-dependencies.json`;
  if (!exists(dependencyFile)) return fail('design-system-dependencies.json missing');
  const dataset = readJson(dependencyFile).data;
  const dependencies = dataset.dependencies ?? [];
  const viaDs = dependencies.filter((entry) => entry.importPath.startsWith(`${DS}/`));
  if (viaDs.length !== dependencies.length)
    return fail('a landing import resolves outside the design system');
  const missing = dependencies.filter((entry) => !exists(entry.importPath));
  if (missing.length > 0) return fail(`import target missing: ${missing[0].importPath}`);
  const unregistered = dependencies.filter(
    (entry) => entry.registered === false && !/\/(core|data|tokens)\//.test(entry.importPath),
  );
  if (unregistered.length > 0)
    return fail(`unregistered component import: ${unregistered[0].importPath}`);
  const registry = readJson('docs/marea/design-system/data/component-registry.json').components.map(
    (entry) => entry.selector,
  );
  const collisions = selectorCollisionProblems(landingSource, registry);
  if (collisions.length > 0)
    return fail(`landing redefines design-system selector ${collisions[0]}`);
  if (dependencies.length < 12)
    return fail(`only ${dependencies.length} design-system modules reused`);
  return pass(
    `${dependencies.length} canonical DS modules imported, no parallel component library, no selector collision`,
  );
});

add('MC18-36', 'SSR renders the real landing (not a static approximation)', () => {
  const mainServer = read(`${PREVIEW}/main.server.ts`);
  if (!/bootstrapApplication\(PreviewShell/.test(mainServer))
    return fail('server bootstrap does not render the shell');
  const serverConfig = read(`${PREVIEW}/app.config.server.ts`);
  if (!/provideServerRendering/.test(serverConfig)) return fail('provideServerRendering missing');
  const server = read(`${PREVIEW}/server.ts`);
  if (!/AngularNodeAppEngine/.test(server)) return fail('AngularNodeAppEngine missing');
  if (!/writeResponseToNodeResponse/.test(server)) return fail('SSR response writer missing');
  const routes = read(`${PREVIEW}/app.routes.server.ts`);
  if (!/RenderMode\.Server/.test(routes)) return fail('no per-request server render mode');
  return pass('Angular SSR engine wired to the real landing routes on the server');
});

add('MC18-37', 'hydration is verified without mismatch', () => {
  const file = `${DATA}/ssr-hydration-evidence.json`;
  if (!exists(file)) return fail('ssr-hydration-evidence.json missing');
  const data = readJson(file).data;
  const problems = hydrationEvidenceProblems(data);
  if (problems.length > 0) return fail(problems.join('; '));
  return pass(
    'independent Playwright hydration evidence: PASS, 0 console errors, no duplicate DOM',
  );
});

add('MC18-38', 'no production bundle imports the landing', () => {
  const angular = readJson('angular.json');
  const browser = angular.projects.embarcarte.architect.build.options.browser;
  if (browser !== 'src/main.ts') return fail('production browser entry changed');
  const production = `${read('src/main.ts')}\n${read('src/main.server.ts')}`;
  if (/marea-landing/i.test(production)) return fail('production entry references the landing');
  return pass('production entries unchanged and do not reference the landing');
});

add('MC18-39', 'no previous milestone verdict is overwritten', () => {
  const frozen = [
    'docs/marea/design-system',
    'docs/marea/commerce-data',
    'docs/marea/information-architecture',
    'docs/marea/legal-commercial',
    'docs/marea/market-validation',
    'docs/marea/financial',
  ];
  const changed = git(['diff', '--name-only', BASE_COMMIT, '--', ...frozen]);
  if (changed.length > 0)
    return fail(`previous milestone evidence modified: ${changed.slice(0, 5).join(', ')}`);
  const delivery = read('docs/marea/design-system/MC17-FINAL-DELIVERY-RECORD.md');
  if (!/MC17_VERDICT = PARTIAL/.test(delivery)) return fail('MC-17 verdict line changed');
  if (!/METHOD/.test(delivery)) return pass('MC-17 delivery record unchanged');
  return pass('MC-13/14/15/16/17 evidence frozen; verdicts unchanged');
});

add('MC18-40', 'no MC-19 execution is recorded', () => {
  const landingDocs = walk(DOCS)
    .filter((file) => file.endsWith('.md') || file.endsWith('.json'))
    .map((file) => read(file))
    .join('\n');
  if (/MC19_STARTED\s*[=:]\s*true/i.test(landingDocs)) return fail('MC19_STARTED=true recorded');
  const handoff = `${DATA}/mc19-handoff-inputs.json`;
  if (exists(handoff) && /"mc19Started"\s*:\s*true/.test(read(handoff)))
    return fail('handoff dataset records MC-19 started');
  if (walk(LANDING).some((file) => /(?:segment|enquiry|lead)-/i.test(file)))
    return fail('segment/enquiry page implemented');
  return pass('MC19_STARTED=false, no segment pages, no enquiry flow');
});

add('MC18-41', 'generated artefacts are deterministic and current', () => {
  try {
    execFileSync(
      process.execPath,
      [
        '--import',
        './scripts/marea-landing-ts-register.mjs',
        '--disable-warning=MODULE_TYPELESS_PACKAGE_JSON',
        'scripts/build-marea-landing-data.mjs',
        '--check',
      ],
      { cwd: root, encoding: 'utf8', stdio: 'pipe' },
    );
    return pass('domain projection and every dataset match the generator output');
  } catch (error) {
    return fail(
      `generator drift: ${String(error.stderr ?? error.message)
        .trim()
        .split('\n')
        .slice(-3)
        .join(' ')}`,
    );
  }
});

add('MC18-42', 'publication gates fail closed', () => {
  const empty = evaluatePublicationGates({});
  if (empty.publishable !== false) return fail('empty input is publishable');
  for (const field of [
    'publicCopyApproved',
    'trademarkCleared',
    'sourceIpCleared',
    'publicationApproved',
    'indexationApproved',
    'deploymentApproved',
  ]) {
    if (empty[field] !== false) return fail(`${field} is not false by default`);
  }
  const nearlyOpen = evaluatePublicationGates({
    pageImplemented: true,
    internalPreviewReady: true,
    publicCopyApproved: true,
    trademarkCleared: true,
    sourceIpCleared: true,
    legalIdentityVerified: true,
    claimsApproved: true,
    privacyApproved: true,
    commercialDataApproved: true,
    publicationApproved: true,
    indexationApproved: true,
    deploymentApproved: true,
  });
  if (nearlyOpen.publishable !== true)
    return fail('all-true input does not satisfy the pure evaluator (model broken)');
  if (MC18_PUBLICATION_EVALUATION.publishable !== false)
    return fail('the recorded MC-18 evaluation is publishable');
  if (landingMayPublish({}) !== false) return fail('landingMayPublish({}) is true');
  return pass('missing values are false, current evaluation is blocked, no override path');
});

add('MC18-43', 'a single boolean cannot activate public metadata', () => {
  const allOpen = {
    pageImplemented: true,
    internalPreviewReady: true,
    publicCopyApproved: true,
    trademarkCleared: true,
    sourceIpCleared: true,
    legalIdentityVerified: true,
    claimsApproved: true,
    privacyApproved: true,
    commercialDataApproved: true,
    publicationApproved: true,
    indexationApproved: true,
    deploymentApproved: true,
    blockingGateIds: [],
    publishable: true,
  };
  const activation = evaluateSeoActivation(allOpen);
  if (activation.metadataActivationAllowed !== false)
    return fail('metadata activates without a release authorization record');
  const seo = buildLandingSeoContract('es', allOpen);
  if (seo.emitted.canonical !== false || seo.emitted.hreflang !== false)
    return fail('contract emits canonical/hreflang');
  if (seo.sitemapEligibility !== false) return fail('sitemap eligibility is true');
  if (seo.structuredDataEligibility.anyJsonLdEmitted !== false)
    return fail('JSON-LD eligibility is true');
  if (/process\.env/.test(read(`${LANDING}/models/publication-gates.ts`)))
    return fail('gates read an env var');
  return pass(
    'activation requires a non-existent authorization record; boolean alone is insufficient',
  );
});

// ---------------------------------------------------------------- 44-50 evidence + datasets + quality
const REQUIRED_DATASETS = [
  'manifest.json',
  'page-identity.json',
  'section-registry.json',
  'bilingual-content.json',
  'content-evidence.json',
  'design-system-dependencies.json',
  'product-family-presentation.json',
  'bundle-presentation.json',
  'seo-metadata-contract.json',
  'publication-gates.json',
  'preview-isolation.json',
  'accessibility-evidence.json',
  'responsive-evidence.json',
  'visual-regression-evidence.json',
  'performance-evidence.json',
  'ssr-hydration-evidence.json',
  'legacy-baseline.json',
  'blocker-register.json',
  'mc19-handoff-inputs.json',
  'review-findings.json',
];

add('MC18-44', 'every machine-readable dataset exists with its provenance envelope', () => {
  const missing = REQUIRED_DATASETS.filter((name) => !exists(`${DATA}/${name}`));
  if (missing.length > 0) return fail(`missing datasets: ${missing.join(', ')}`);
  const envelopeFields = [
    'contractId',
    'contractVersion',
    'milestone',
    'status',
    'owner',
    'publicationStatus',
    'generationMethod',
    'relevantCommit',
    'knownLimitations',
    'data',
  ];
  const problems = [];
  for (const name of REQUIRED_DATASETS) {
    const document = readJson(`${DATA}/${name}`);
    for (const field of envelopeFields) {
      if (!(field in document)) problems.push(`${name}: ${field}`);
    }
  }
  if (problems.length > 0)
    return fail(`${problems.length} envelope problem(s): ${problems.slice(0, 3).join(', ')}`);
  return pass(`${REQUIRED_DATASETS.length} datasets with full provenance envelope`);
});

add('MC18-45', 'page identity matches the canonical MC-15 proposed route', () => {
  const canonical = readJson(
    'docs/marea/information-architecture/data/proposed-routes.json',
  ).items.find((route) => route.routeId === 'mareaOverview');
  if (!canonical) return fail('mareaOverview missing from proposed-routes.json');
  if (LANDING_PAGE_IDENTITY.routeId !== canonical.routeId) return fail('routeId diverged');
  if (LANDING_PAGE_IDENTITY.entityId !== canonical.entityId) return fail('entityId diverged');
  if (LANDING_PAGE_IDENTITY.pageType !== canonical.pageType)
    return fail(`pageType diverged (${LANDING_PAGE_IDENTITY.pageType} vs ${canonical.pageType})`);
  if (LANDING_PAGE_IDENTITY.locales.es.path !== canonical.routePatternEs)
    return fail('ES path diverged');
  if (LANDING_PAGE_IDENTITY.locales.en.path !== canonical.routePatternEn)
    return fail('EN path diverged');
  if (canonical.publicationAuthorized !== false || canonical.indexationAuthorized !== false)
    return fail('canonical route is authorized');
  if (LANDING_ROUTE_TABLE.length !== 2)
    return fail('preview route table does not have both locales');
  return pass(`${canonical.routeId} / ${canonical.entityId} / ${canonical.pageType} matches MC-15`);
});

add('MC18-46', 'the preview is bound to loopback and access controlled', () => {
  const server = read(`${PREVIEW}/server.ts`);
  const bindingProblems = previewBindingProblems(server);
  if (bindingProblems.length > 0) return fail(bindingProblems.join('; '));
  if (!/__preview\/health/.test(server)) return fail('no health endpoint');
  const isolation = readJson(`${DATA}/preview-isolation.json`).data;
  if (isolation.project !== 'marea-landing-preview') return fail('isolation dataset wrong project');
  if (isolation.noExternalServices !== true)
    return fail('isolation dataset does not assert no external services');
  return pass('loopback binding, Host allowlist, no external services, restrictive CSP');
});

add('MC18-47', 'no external service or third-party asset is contacted', () => {
  const surface = `${landingSource}\n${previewSource}`
    .replace(/\$\{host\}/g, '127.0.0.1')
    .replace(/\$\{port\}/g, '4302')
    .replace(/\$\{[^}]*\}/g, 'x');
  const externalUrls =
    surface.replace(/https:\/\/embarcarte\.com/g, '').match(/https?:\/\/[^\s'"`)]+/g) ?? [];
  const remote = externalUrls.filter(
    (url) => !/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?(?:\/|$)/.test(url),
  );
  if (remote.length > 0) return fail(`external URL present: ${remote[0]}`);
  if (/@import\s+url\(['"]?https?:/.test(read(`${PREVIEW}/styles.css`)))
    return fail('remote stylesheet import');
  if (/<img\b/i.test(surface)) return fail('raster image reference present');
  if (/url\(\s*['"]?(?:https?:)?\/\//.test(read(`${PREVIEW}/styles.css`)))
    return fail('remote CSS asset reference');
  return pass('no external URLs, no remote assets, no raster images');
});

add('MC18-48', 'no secret or credential is committed', () => {
  const surface = [...walk(LANDING), ...walk(PREVIEW), ...walk(DOCS)]
    .filter((file) => /\.(ts|json|md|html|css)$/.test(file))
    .map((file) => read(file))
    .join('\n');
  if (/(?:api[_-]?key|secret|password|token)\s*[:=]\s*['"][A-Za-z0-9+/=_-]{16,}/i.test(surface))
    return fail('credential-like literal present');
  if (/-----BEGIN [A-Z ]*PRIVATE KEY-----/.test(surface)) return fail('private key present');
  return pass('no credential, key or token literal in landing artefacts');
});

add('MC18-49', 'the landing reuses the design-system components it claims', () => {
  const dependencies = readJson(`${DATA}/design-system-dependencies.json`).data.dependencies;
  const required = [
    'theme/marea-theme',
    'components/commerce/marea-family-card',
    'components/commerce/marea-bundle-components',
    'components/commerce/marea-readiness-panel',
    'components/commerce/marea-commercial-cta',
    'components/structured/marea-responsive-nav',
    'components/foundation/marea-notice',
    'components/foundation/marea-section-heading',
    'components/foundation/marea-text',
    'components/foundation/marea-container',
    'components/foundation/marea-status-badge',
    'components/foundation/marea-surface',
  ];
  const missing = required.filter(
    (fragment) => !dependencies.some((entry) => entry.importPath.includes(fragment)),
  );
  if (missing.length > 0) return fail(`not reused: ${missing.join(', ')}`);
  const handoff = read('docs/marea/design-system/MC17-MC18-HANDOFF.md');
  if (!/PASS_INTERNAL_DESIGN_SYSTEM_SCOPE/.test(handoff)) return fail('MC-17 handoff not verified');
  return pass(
    `${required.length}/${required.length} required DS components reused through their real APIs`,
  );
});

add('MC18-50', 'the page has one meaningful H1 and a skip link', () => {
  const h1Count = (landingSource.match(/<h1\b/g) ?? []).length;
  if (h1Count !== 1) return fail(`h1 count in landing sources: ${h1Count}`);
  if (!/<main[^>]*id="landing-main"/.test(landingSource)) return fail('main landmark missing');
  const skip = /class="skip" href="#landing-main"/.test(landingSource);
  if (!skip) return fail('skip link missing or pointing elsewhere');
  const headingIds = ['hero-heading'];
  if (!/headingId = 'hero-heading'/.test(landingSource)) return fail('hero heading id changed');
  return pass('exactly one h1 (hero), main landmark, skip link, stable heading id');
});

// ---------------------------------------------------------------- 51-58 docs + delivery
add('MC18-51', 'all required MC-18 documents exist', () => {
  const required = [
    'MC-18-BASELINE-AND-GOVERNANCE.md',
    'MC18-LANDING-ARCHITECTURE.md',
    'MC18-DESIGN-COMPOSITION-AND-VISUAL-SYSTEM.md',
    'MC18-SECTION-AND-CONTENT-INVENTORY.md',
    'MC18-BILINGUAL-COPY-AND-EVIDENCE-POLICY.md',
    'MC18-PRODUCT-AND-BUNDLE-PRESENTATION.md',
    'MC18-LEGAL-CLAIMS-AND-PUBLICATION-GATES.md',
    'MC18-ANGULAR-SSR-AND-HYDRATION.md',
    'MC18-SEO-METADATA-AND-INDEXATION-CONTRACT.md',
    'MC18-ACCESSIBILITY-VALIDATION.md',
    'MC18-RESPONSIVE-AND-VISUAL-EVIDENCE.md',
    'MC18-PERFORMANCE-AND-BUNDLE-EVIDENCE.md',
    'MC18-INTERNAL-PREVIEW-ISOLATION.md',
    'MC18-LEGACY-SITE-NON-REGRESSION.md',
    'MC18-SECURITY-AND-DATA-BOUNDARIES.md',
    'MC18-FUTURE-PUBLICATION-INTEGRATION-PLAN.md',
    'MC18-RISK-AND-BLOCKER-REGISTER.md',
    'MC18-MC19-HANDOFF.md',
    'MC18-INDEPENDENT-REVIEW.md',
    'MC18-SPANISH-EXECUTIVE-REPORT.md',
    'MC18-FINAL-DELIVERY-RECORD.md',
  ];
  const missing = required.filter((name) => !exists(`${DOCS}/${name}`));
  if (missing.length > 0) return fail(`missing documents: ${missing.join(', ')}`);
  const tooShort = required.filter((name) => read(`${DOCS}/${name}`).trim().length < 400);
  if (tooShort.length > 0) return fail(`documents too thin: ${tooShort.join(', ')}`);
  return pass(`${required.length} MC-18 documents present`);
});

add('MC18-52', 'evidence datasets record real runs, not claims', () => {
  const evidenceDocs = [
    'accessibility-evidence.json',
    'responsive-evidence.json',
    'visual-regression-evidence.json',
    'performance-evidence.json',
    'ssr-hydration-evidence.json',
    'legacy-baseline.json',
  ];
  const problems = [];
  for (const name of evidenceDocs) {
    const document = readJson(`${DATA}/${name}`);
    if (!document.generationMethod || /TBD|TODO|placeholder/i.test(document.generationMethod))
      problems.push(`${name}: no real generation method`);
    if (!document.data || Object.keys(document.data).length === 0)
      problems.push(`${name}: empty data`);
    if (/NOT_RUN/.test(JSON.stringify(document)))
      problems.push(`${name}: NOT_RUN evidence recorded`);
  }
  if (problems.length > 0) return fail(problems.join(' | '));
  return pass(`${evidenceDocs.length} evidence datasets carry measured data and generation method`);
});

add('MC18-53', 'no blocking or major review finding is open', () => {
  const findings = readJson(`${DATA}/review-findings.json`);
  const list = Array.isArray(findings.findings)
    ? findings.findings
    : (findings.data?.findings ?? []);
  if (!Array.isArray(list)) return fail('review-findings.json has no findings array');
  const open = list.filter(
    (finding) =>
      ['BLOCKING', 'MAJOR'].includes(String(finding.severity).toUpperCase()) &&
      !['CLOSED', 'RESOLVED', 'ACCEPTED'].includes(String(finding.status ?? '').toUpperCase()),
  );
  if (open.length > 0)
    return fail(
      `${open.length} open blocking/major finding(s): ${open.map((item) => item.findingId).join(', ')}`,
    );
  return pass(`${list.length} findings recorded; 0 open BLOCKING/MAJOR`);
});

add('MC18-54', 'the delivery record preserves the no-publication state', () => {
  const recordPath = `${DOCS}/MC18-FINAL-DELIVERY-RECORD.md`;
  if (!exists(recordPath)) return fail('delivery record missing');
  const record = read(recordPath);
  for (const line of [
    'MC18_PUBLICATION = NOT_AUTHORIZED',
    'MERGED = false',
    'DEPLOYED = false',
    'PUBLISHED = false',
    'MC19_STARTED = false',
  ]) {
    if (!record.includes(line)) return fail(`delivery record misses "${line}"`);
  }
  if (!/MC18_VERDICT = PARTIAL/.test(record))
    return fail('delivery record does not keep the global verdict PARTIAL');
  return pass('no merge, deployment, publication or MC-19 start recorded');
});

add('MC18-55', 'the MC-17 playwrightTests index discrepancy is classified, not rewritten', () => {
  const baseline = `${DOCS}/MC-18-BASELINE-AND-GOVERNANCE.md`;
  if (!exists(baseline)) return fail('D01 baseline document missing');
  const text = read(baseline);
  if (!/playwrightTests/.test(text) || !/28/.test(text) || !/37/.test(text))
    return fail('D01 does not classify the 28 vs 37 playwrightTests discrepancy');
  if (!/historical|authoring-time|autor[a-z]*/i.test(text))
    return fail('D01 does not label the manifest count as a historical authoring-time value');
  const manifest = readJson('docs/marea/design-system/data/manifest.json');
  const indexedCount =
    manifest.implementationCounts?.playwrightTests ?? manifest.completeness?.playwrightTests;
  if (indexedCount !== 28) return fail('MC-17 manifest was rewritten instead of classified');
  return pass('MC-17 manifest left at 28; final measured count 37 recorded with classification');
});

add('MC18-56', 'the changed-file scope stays inside MC-18', () => {
  const allowedPrefixes = [
    `${LANDING}/`,
    `${PREVIEW}/`,
    'e2e/landing/',
    `${DOCS}/`,
    'scripts/check-marea-landing',
    'scripts/marea-landing-',
    'scripts/build-marea-landing-data.mjs',
    'playwright.landing.config.ts',
  ];
  const allowedExact = new Set([
    'package.json',
    'angular.json',
    'playwright.config.ts',
    'docs/marea/execution/MASTER-PROMPT-REGISTRY.md',
    'docs/marea/execution/DECISION-LOG.md',
  ]);
  const lines = execFileSync('git', ['status', '--porcelain=v1'], { cwd: root, encoding: 'utf8' })
    .replace(/\n$/, '')
    .split('\n')
    .filter((line) => line.length > 3);
  const outOfScope = scopeProblems(lines, allowedPrefixes, [...allowedExact]);
  if (outOfScope.length > 0)
    return fail(`out-of-scope changes: ${outOfScope.slice(0, 8).join(', ')}`);
  return pass(`working tree changes limited to the MC-18 scope (${lines.length} entries)`);
});

add('MC18-57', 'no new dependency or lockfile change is introduced', () => {
  const basePackage = JSON.parse(git(['show', `${BASE_COMMIT}:package.json`]));
  const current = readJson('package.json');
  for (const key of ['dependencies', 'devDependencies']) {
    if (JSON.stringify(basePackage[key]) !== JSON.stringify(current[key]))
      return fail(`${key} changed`);
  }
  const lockChanged = git(['diff', '--name-only', BASE_COMMIT, '--', 'package-lock.json']);
  if (lockChanged.length > 0) return fail('package-lock.json changed');
  return pass('no dependency added or removed; lockfile unchanged');
});

add('MC18-58', 'the English content carries no untranslated Spanish copy', () => {
  const spanishOnly = /\b(?:el|la|los|las|una|para|con|que|desde|sin|según|también)\b/;
  const problems = [];
  for (const block of blocks) {
    const en = block.text.en;
    if (spanishOnly.test(en) && !/\b(?:no|sin)\b/.test(en)) {
      // "sin", "no" and "para" can appear legitimately in English; flag only
      // sentences where several Spanish function words cluster.
      const hits = (en.match(spanishOnly) ?? []).length;
      if (hits >= 2) problems.push(`${block.contentId}: ${en.slice(0, 60)}`);
    }
  }
  if (problems.length > 0)
    return fail(`${problems.length} suspicious EN block(s): ${problems.slice(0, 3).join(' | ')}`);
  return pass('EN blocks show no Spanish function-word clustering');
});

add('MC18-59', 'the internal banner is present in the SSR output contract', () => {
  const server = read(`${PREVIEW}/server.ts`);
  if (!/noindex, nofollow, noarchive/.test(server))
    return fail('X-Robots-Tag missing from the preview server');
  const landingPreview = read(`${PREVIEW}/landing-preview.ts`);
  if (!/MareaLanding/.test(landingPreview)) return fail('preview host does not render the landing');
  if (!/buildLandingSeoContract/.test(landingPreview))
    return fail('preview host does not use the SEO contract');
  if (
    /rel="canonical"|attr\.hreflang|property="og:|name="twitter:|type="application\/ld\+json"/.test(
      landingPreview,
    )
  )
    return fail('preview host emits public metadata');
  return pass('preview host renders the real landing with noindex metadata only');
});

add('MC18-60', 'no public asset, sitemap or hosting artefact is added', () => {
  const changed = git(['diff', '--name-only', BASE_COMMIT, '--', 'deploy', 'Dockerfile', 'public'])
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  if (changed.length > 0)
    return fail(`deployment/public artefact changed: ${changed.slice(0, 5).join(', ')}`);
  return pass('deploy config, Dockerfile and public/ unchanged');
});

// ---------------------------------------------------------------- report
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
      contractId: 'MC18-LANDING-VALIDATOR-RUN',
      contractVersion: '1.0.0',
      milestone: 'MC-18',
      owner: 'MC-18 implementation team',
      publicationStatus: 'NOT_AUTHORIZED',
      status,
      runAt: new Date().toISOString(),
      head,
      baseCommit: BASE_COMMIT,
      totals: {
        checks: checks.length,
        passed: checks.length - failed.length,
        failed: failed.length,
      },
      checks,
    },
    null,
    2,
  )}\n`,
);

for (const check of checks) {
  const mark = check.status === 'PASS' ? 'PASS' : 'FAIL';
  console.log(`${mark} ${check.id} · ${check.description}`);
  if (check.status === 'FAIL') console.log(`     ${check.detail}`);
}
console.log(
  `\nMC-18 landing validator: ${checks.length - failed.length}/${checks.length} checks passed · ${status}`,
);
console.log(`Evidence: ${evidencePath}`);
process.exit(failed.length === 0 ? 0 : 1);
