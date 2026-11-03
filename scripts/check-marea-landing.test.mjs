/**
 * MC-18 unit tests for the REAL landing contracts and guard functions.
 *
 * Run: npm run test:landing:unit
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));
const read = (path) => readFileSync(join(REPO_ROOT, path), 'utf8');
const readJson = (path) => JSON.parse(read(path));

const {
  bilingualParityProblems,
  constraintNegationProblems,
  duplicateIdentityProblems,
  familyLimitationProblems,
  fleetPolicyProblems,
  focusOutlineRemoval,
  hydrationEvidenceProblems,
  mobileDisclosureProblems,
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
  hasNegation,
} = await import('../scripts/marea-landing-guards.mjs');

const { LANDING_CONTENT } = await import('../src/app/marea-landing/content/landing-content.ts');
const { LANDING_EVIDENCE } = await import('../src/app/marea-landing/content/evidence.ts');
const { LANDING_DOMAIN_FACTS, LANDING_FAMILIES, LANDING_EDITIONS, LANDING_BUNDLES } =
  await import('../src/app/marea-landing/data/domain.generated.ts');
const publicationGates = await import('../src/app/marea-landing/models/publication-gates.ts');
const seo = await import('../src/app/marea-landing/models/seo.ts');
const pageIdentity = await import('../src/app/marea-landing/models/page-identity.ts');

const FAMILY_IDS = ['NAV', 'HUB', 'AIS', 'PILOT', 'SENSE', 'WATCH', 'DISPLAY', 'WEATHER', 'FLEET'];
const BUNDLE_IDS = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'];

function flattenBlocks(content) {
  const blocks = [];
  const visit = (value) => {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (value && typeof value === 'object') {
      if (typeof value.contentId === 'string' && value.text && typeof value.text.es === 'string') {
        blocks.push(value);
        return;
      }
      Object.values(value).forEach(visit);
    }
  };
  visit(content);
  return blocks;
}
const blocks = flattenBlocks(LANDING_CONTENT);

// ---------------------------------------------------------------- domain integrity
test('canonical domain projection preserves 9 families / 26 editions / 6 bundles', () => {
  assert.equal(LANDING_DOMAIN_FACTS.families, 9);
  assert.equal(LANDING_DOMAIN_FACTS.editions, 26);
  assert.equal(LANDING_DOMAIN_FACTS.bundles, 6);
  assert.equal(LANDING_FAMILIES.length, 9);
  assert.equal(LANDING_EDITIONS.length, 26);
  assert.equal(LANDING_BUNDLES.length, 6);
  assert.deepEqual(
    LANDING_FAMILIES.map((family) => family.familyId),
    FAMILY_IDS,
  );
  assert.deepEqual(
    LANDING_BUNDLES.map((bundle) => bundle.bundleId),
    BUNDLE_IDS,
  );
});

test('no commercial capability is representable in the domain projection', () => {
  assert.equal(LANDING_DOMAIN_FACTS.approvedPrices, 0);
  assert.equal(LANDING_DOMAIN_FACTS.merchantSkuCodes, 0);
  assert.equal(LANDING_DOMAIN_FACTS.merchantableEditions, 0);
  assert.equal(LANDING_DOMAIN_FACTS.verifiedStockRows, 0);
  assert.equal(LANDING_DOMAIN_FACTS.releaseGatesClosed, 0);
  const projection = read('src/app/marea-landing/data/domain.generated.ts');
  for (const forbidden of ['priceAmount', 'priceCurrency', 'stockQuantity', 'merchantSkuCode":']) {
    assert.equal(projection.includes(forbidden), false, `projection leaked ${forbidden}`);
  }
});

test('page identity matches the canonical MC-15 record', () => {
  const canonical = readJson(
    'docs/marea/information-architecture/data/proposed-routes.json',
  ).items.find((route) => route.routeId === 'mareaOverview');
  assert.ok(canonical);
  assert.equal(pageIdentity.LANDING_PAGE_IDENTITY.routeId, canonical.routeId);
  assert.equal(pageIdentity.LANDING_PAGE_IDENTITY.entityId, canonical.entityId);
  assert.equal(pageIdentity.LANDING_PAGE_IDENTITY.pageType, canonical.pageType);
  assert.equal(pageIdentity.LANDING_PAGE_IDENTITY.locales.es.path, canonical.routePatternEs);
  assert.equal(pageIdentity.LANDING_PAGE_IDENTITY.locales.en.path, canonical.routePatternEn);
  assert.equal(pageIdentity.LANDING_PAGE_IDENTITY.publicationAuthorized, false);
  assert.equal(pageIdentity.LANDING_PAGE_IDENTITY.indexationAuthorized, false);
});

// ---------------------------------------------------------------- content contract
test('content is bilingual, uniquely identified and fully evidenced', () => {
  assert.ok(blocks.length > 150, `expected a complete landing, found ${blocks.length} blocks`);
  const ids = blocks.map((block) => block.contentId);
  assert.equal(new Set(ids).size, ids.length, 'duplicate contentId');
  const evidenceIds = new Set(LANDING_EVIDENCE.map((entry) => entry.evidenceId));
  for (const block of blocks) {
    assert.ok(block.text.es && block.text.en, `${block.contentId} missing a locale`);
    assert.ok(block.evidenceIds.length > 0, `${block.contentId} has no evidence`);
    for (const evidenceId of block.evidenceIds) {
      assert.ok(evidenceIds.has(evidenceId), `${block.contentId} cites unknown ${evidenceId}`);
    }
    assert.equal(block.publicationStatus, 'INTERNAL_DRAFT_NOT_APPROVED');
    assert.equal(block.approvalStatus, 'NOT_APPROVED');
  }
  for (const entry of LANDING_EVIDENCE) {
    assert.ok(entry.sourcePath.length > 0, `evidence ${entry.evidenceId} has no source path`);
  }
});

test('all nine families and six bundles have visible limitation copy', () => {
  assert.equal(
    familyLimitationProblems(LANDING_CONTENT.sections.families.families, FAMILY_IDS).length,
    0,
  );
  for (const copy of LANDING_CONTENT.sections.bundles.bundles) {
    assert.ok(copy.constraints.length >= 1, `${copy.bundleId} has no constraint copy`);
  }
  const dimensionIds = LANDING_CONTENT.sections.availability.dimensions.map(
    (dimension) => dimension.dimensionId,
  );
  assert.deepEqual(dimensionIds, [
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
  ]);
});

test('ES/EN parity holds for the whole content contract', () => {
  const records = blocks.flatMap((block) => [
    { contentId: block.contentId, locale: 'es', text: block.text.es },
    { contentId: block.contentId, locale: 'en', text: block.text.en },
  ]);
  assert.deepEqual(bilingualParityProblems(records), []);
  assert.deepEqual(constraintNegationProblems(blocks), []);
});

test('safe constraint copy is not flagged and positive claims are', () => {
  assert.deepEqual(scanDangerousCopy('Sin precio aprobado ni disponibilidad comercial.'), []);
  assert.deepEqual(scanDangerousCopy('No AIS transmission; receive-only.'), []);
  assert.equal(
    scanDangerousCopy('Gobierno totalmente autónomo sin supervisión.').some(
      (violation) => violation.category === 'AUTONOMY_OR_GUARANTEE',
    ),
    true,
  );
  assert.equal(
    scanDangerousCopy('Sin navegación autónoma ni control de gobierno.').some(
      (violation) => violation.category === 'AUTONOMY_OR_GUARANTEE',
    ),
    false,
  );
});

// ---------------------------------------------------------------- gates + SEO
test('publication gates fail closed and the recorded evaluation is blocked', () => {
  const empty = publicationGates.evaluatePublicationGates({});
  assert.equal(empty.publishable, false);
  assert.equal(empty.publicationApproved, false);
  assert.equal(empty.deploymentApproved, false);
  assert.equal(publicationGates.MC18_PUBLICATION_EVALUATION.publishable, false);
  assert.ok(publicationGates.MC18_PUBLICATION_EVALUATION.blockingGateIds.length >= 10);
  const allOpen = publicationGates.evaluatePublicationGates({
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
  assert.equal(allOpen.publishable, true);
  // A deployment-only flag can never publish an unapproved page.
  const deploymentOnly = publicationGates.evaluatePublicationGates({
    pageImplemented: true,
    internalPreviewReady: true,
    deploymentApproved: true,
  });
  assert.equal(deploymentOnly.publishable, false);
});

test('SEO metadata stays a planning contract: no canonical, hreflang, OG or JSON-LD', () => {
  const contractEs = seo.buildLandingSeoContract(
    'es',
    publicationGates.MC18_PUBLICATION_EVALUATION,
  );
  const contractEn = seo.buildLandingSeoContract(
    'en',
    publicationGates.MC18_PUBLICATION_EVALUATION,
  );
  assert.equal(contractEs.emitted.canonical, false);
  assert.equal(contractEs.emitted.hreflang, false);
  assert.equal(contractEs.emitted.openGraph, false);
  assert.equal(contractEs.emitted.jsonLd, false);
  assert.equal(contractEs.emitted.robotsNoindex, true);
  assert.equal(contractEs.sitemapEligibility, false);
  assert.equal(contractEs.structuredDataEligibility.offer, false);
  assert.equal(contractEs.robotsPolicy, 'noindex,nofollow');
  assert.ok(seo.hreflangGroupIsReciprocal(contractEs.hreflangGroupCandidate));
  assert.notEqual(contractEs.pageTitle, contractEn.pageTitle);
  // Even with every gate open, the missing authorization record blocks metadata.
  const allOpen = publicationGates.evaluatePublicationGates({
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
  const activation = seo.evaluateSeoActivation(allOpen);
  assert.equal(activation.metadataActivationAllowed, false);
  assert.ok(activation.blockingReasons.includes('releaseAuthorizationMissing'));
});

// ---------------------------------------------------------------- guard positive controls
test('negative controls: clean surfaces pass every policy predicate', () => {
  assert.deepEqual(
    publicRouteSourceProblems([{ path: 'src/app/app.routes.ts', source: "path: 'home'" }]),
    [],
  );
  assert.deepEqual(
    scopeProblems([' M src/app/marea-landing/landing.ts'], ['src/app/marea-landing/'], []),
    [],
  );
  assert.deepEqual(seoEmissionProblems('<meta name="robots" content="noindex, nofollow">'), []);
  assert.deepEqual(
    noindexProblems({
      indexHtml: '<meta name="robots" content="noindex, nofollow">',
      serverSource: "res.setHeader('X-Robots-Tag', 'noindex, nofollow')",
    }),
    [],
  );
  assert.deepEqual(
    previewBindingProblems(
      "const host = '127.0.0.1'; ALLOWED_HOSTS; X-Robots-Tag; form-action 'none'",
    ),
    [],
  );
  assert.deepEqual(
    fleetPolicyProblems({
      contractedSolution: true,
      hardwareIncludedByDefault: false,
      slaEstablished: false,
      priceApproved: false,
      orderable: false,
    }),
    [],
  );
  assert.deepEqual(publicAssetProblems(['public/favicon.ico']), []);
  assert.deepEqual(
    previewProjectProblems(
      {
        architect: {
          build: {
            options: {
              outputPath: 'dist/marea-landing-preview',
              outputMode: 'server',
              ssr: { entry: 'preview/landing/server.ts' },
            },
          },
        },
      },
      ['src/styles.scss'],
    ),
    [],
  );
  assert.deepEqual(
    hydrationEvidenceProblems({
      ssr: {
        es: { status: 200 },
        en: { status: 200 },
        noCanonical: true,
        noHreflang: true,
        noJsonLd: true,
      },
      hydration: { status: 'PASS', consoleErrors: 0, duplicateDom: false },
    }),
    [],
  );
  assert.deepEqual(purchaseControlViolations('No purchase action is rendered.'), []);
  assert.deepEqual(
    focusOutlineRemoval('.link:focus-visible { outline: 3px solid var(--ring); }'),
    [],
  );
  assert.deepEqual(
    mobileDisclosureProblems('@media (max-width: 480px) { .grid { gap: 8px; } }'),
    [],
  );
  assert.deepEqual(
    selectorCollisionProblems("selector: 'marea-landing-hero'", ['marea-theme']),
    [],
  );
  assert.deepEqual(duplicateIdentityProblems(['NAV', 'HUB']), []);
  assert.equal(hasNegation('Sin precio'), true);
});
