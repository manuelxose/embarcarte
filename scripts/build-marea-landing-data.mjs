#!/usr/bin/env node
/**
 * MC-18 internal landing data generator.
 *
 * Reads the authoritative MC-16 / MC-14 / MC-15 datasets and the MC-18 landing
 * source contracts, then emits:
 *   - src/app/marea-landing/data/domain.generated.ts   (bounded projection used by the UI)
 *   - docs/marea/landing/data/*.json                   (machine-readable contracts)
 *
 * It never invents product data: identities, composition and gate state are
 * copied from the canonical datasets, and the generated projection contains no
 * price amount, no stock quantity, no merchant SKU and no customer data.
 *
 * Usage:
 *   node scripts/build-marea-landing-data.mjs              # write
 *   node scripts/build-marea-landing-data.mjs --check      # verify committed output
 *   node scripts/build-marea-landing-data.mjs --domain-only  # domain projection only
 *
 * Deterministic: stable ordering from the canonical datasets, no timestamps.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MC16 = 'docs/marea/commerce-data/data';
const MC14 = 'docs/marea/legal-commercial/data';
const MC15 = 'docs/marea/information-architecture/data';
const LANDING = 'docs/marea/landing';
const DATA_OUT = `${LANDING}/data`;
const DOMAIN_OUT = 'src/app/marea-landing/data/domain.generated.ts';
const CHECK = process.argv.includes('--check');
const DOMAIN_ONLY = process.argv.includes('--domain-only');

const readText = (path) => readFileSync(resolve(root, path), 'utf8');
const readJson = (path) => JSON.parse(readText(path));
const problems = [];
const assert = (condition, message) => {
  if (!condition) problems.push(message);
};

// ---------------------------------------------------------------- canonical input
const familiesDoc = readJson(`${MC16}/product-families.json`);
const editionsDoc = readJson(`${MC16}/product-editions.json`);
const bundlesDoc = readJson(`${MC16}/bundle-compositions.json`);
const readinessDoc = readJson(`${MC16}/readiness-dimensions.json`);
const gatesDoc = readJson(`${MC14}/release-evidence-gates.json`);
const claimsDoc = readJson(`${MC14}/claims-policy.json`);
const bilingualClaimsDoc = readJson(`${MC14}/bilingual-claims.json`);
const proposedRoutesDoc = readJson(`${MC15}/proposed-routes.json`);

const FAMILY_IDS = ['NAV', 'HUB', 'AIS', 'PILOT', 'SENSE', 'WATCH', 'DISPLAY', 'WEATHER', 'FLEET'];
const BUNDLE_IDS = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'];
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

assert(familiesDoc.families?.length === 9, 'canonical data must expose 9 families');
assert(editionsDoc.editions?.length === 26, 'canonical data must expose 26 editions');
assert(bundlesDoc.bundles?.length === 6, 'canonical data must expose 6 bundles');
assert(
  readinessDoc.dimensions?.length === 11,
  'canonical data must expose 11 readiness dimensions',
);
assert(gatesDoc.gates?.length === 13, 'canonical data must expose 13 release gates');
assert(
  JSON.stringify(familiesDoc.families.map((entry) => entry.familyId)) ===
    JSON.stringify(FAMILY_IDS),
  'canonical family order/ids changed',
);
assert(
  JSON.stringify(bundlesDoc.bundles.map((entry) => entry.bundleId)) === JSON.stringify(BUNDLE_IDS),
  'canonical bundle order/ids changed',
);
assert(
  familiesDoc.families.every((entry) => entry.commercialAvailability === 'NOT_FOR_SALE'),
  'every family must be NOT_FOR_SALE',
);
assert(
  editionsDoc.editions.every(
    (entry) => entry.merchantable === false && entry.priceApproved === false,
  ),
  'no edition may be merchantable or price-approved',
);
assert(
  editionsDoc.editions.every((entry) => entry.merchantSkuCode === null),
  'no edition may carry a merchant SKU code',
);
assert(
  bundlesDoc.bundles.every(
    (entry) => entry.priceApproved === false && entry.fixedPackagePriceEstablished === false,
  ),
  'no bundle may have an approved or fixed price',
);
assert(
  gatesDoc.gates.every((entry) => entry.status !== 'CLOSED'),
  'no release gate may be closed',
);
assert(claimsDoc.summary?.publicAuthorized === 0, 'no claim may be public-authorized');
assert(
  bilingualClaimsDoc.claims?.every(
    (entry) =>
      entry.publicationStatus === 'INTERNAL_ONLY' ||
      entry.publicationStatus === 'PUBLIC_PROHIBITED',
  ) && bilingualClaimsDoc.claims.every((entry) => entry.publicationStatus !== 'PUBLIC_AUTHORIZED'),
  'no catalogued bilingual claim may be public-authorized',
);

// ---------------------------------------------------------------- domain projection
const definitionStatusOf = (lifecycleState) =>
  lifecycleState === 'DEFINED' ? 'DEFINED' : 'CONDITIONAL';

const domainFamilies = familiesDoc.families.map((family) => {
  const editions = editionsDoc.editions.filter((entry) => entry.familyId === family.familyId);
  return {
    familyId: family.familyId,
    displayName: family.displayName,
    productType: family.productType,
    lifecycleState: family.lifecycleState,
    definitionStatus: definitionStatusOf(family.lifecycleState),
    editionIds: editions.map((entry) => entry.editionId),
    editionCount: editions.length,
    commercialAvailability: family.commercialAvailability,
    publicationState: family.publicationState,
    brandPublicationStatus: family.brandPublicationStatus,
    routeId: family.routeId,
    readiness: {
      definition: family.readiness.definition,
      engineering: family.readiness.engineering,
      licensing: family.readiness.licensing,
      hardware: family.readiness.hardware,
      dataRights: family.readiness.dataRights,
      compliance: family.readiness.compliance,
      pricing: family.readiness.pricing,
      brandPublication: family.readiness.brandPublication,
      availability: family.readiness.availability,
      safety: family.readiness.safety,
      operations: family.readiness.operations,
    },
    releaseGateIds: family.releaseGateDependencies,
  };
});

const domainEditions = editionsDoc.editions.map((edition) => ({
  editionId: edition.editionId,
  familyId: edition.familyId,
  definitionStatus: edition.definitionStatus,
  editionType: edition.editionType,
  requiresQuotation: Boolean(edition.requiresQuotation),
  merchantable: edition.merchantable,
  priceApproved: edition.priceApproved,
  commercialAvailability: edition.commercialAvailability,
  publicationState: edition.publicationState,
  featureCount: Array.isArray(edition.featureDefinitions) ? edition.featureDefinitions.length : 0,
  expandsTo: edition.expandsTo ?? [],
}));

const projectLine = (line) => ({
  lineId: line.lineId,
  editionId: line.editionId,
  inclusion: line.inclusion,
  required: Boolean(line.required),
  quantity: line.quantity,
  expandsTo: line.expandsTo ?? [],
});

const domainBundles = bundlesDoc.bundles.map((bundle) => ({
  bundleId: bundle.bundleId,
  displayName: bundle.displayName,
  customerFacingName: bundle.customerFacingName,
  contractedSolution: Boolean(bundle.contractedSolution),
  hardwareIncludedByDefault: Boolean(bundle.hardwareIncludedByDefault),
  slaEstablished: Boolean(bundle.slaEstablished),
  compatibilityStatus: bundle.compatibilityStatus,
  installationRequirement: bundle.installationRequirement,
  commercialAvailability: bundle.commercialAvailability,
  publicationState: bundle.publicationState,
  priceApproved: Boolean(bundle.priceApproved),
  fixedPackagePriceEstablished: Boolean(bundle.fixedPackagePriceEstablished),
  publicationAuthorized: Boolean(bundle.publicationAuthorized),
  indexationAuthorized: Boolean(bundle.indexationAuthorized),
  checkoutAllowed: Boolean(bundle.checkoutAllowed),
  orderable: Boolean(bundle.orderable),
  components: bundle.components.map(projectLine),
  optionalComponents: (bundle.optionalComponents ?? []).map(projectLine),
  contractOnlyEditions: (bundle.contractOnlyEditions ?? []).map((line) => ({
    lineId: line.lineId,
    editionId: line.editionId,
    reason: line.reason,
  })),
  ineligibleEditions: (bundle.ineligibleEditions ?? []).map((line) => ({
    lineId: line.lineId,
    editionId: line.editionId,
    reason: line.reason ?? 'INELIGIBLE',
  })),
  externalRequirements: bundle.externalRequirements ?? [],
  entitlementCapabilityIds: bundle.entitlementCapabilityIds ?? [],
}));

const domainFacts = {
  families: domainFamilies.length,
  editions: domainEditions.length,
  bundles: domainBundles.length,
  readinessDimensions: readinessDoc.dimensions.length,
  releaseGates: gatesDoc.gates.length,
  releaseGatesClosed: gatesDoc.gates.filter((gate) => gate.status === 'CLOSED').length,
  requiredDocuments: gatesDoc.documents?.length ?? 0,
  documentsExecuted: gatesDoc.summary?.documentsExecuted ?? 0,
  cataloguedClaims: claimsDoc.summary?.claimsCatalogued ?? bilingualClaimsDoc.claims.length,
  publicAuthorizedClaims: claimsDoc.summary?.publicAuthorized ?? 0,
  approvedPrices: editionsDoc.editions.filter((edition) => edition.priceApproved === true).length,
  merchantableEditions: editionsDoc.editions.filter((edition) => edition.merchantable === true)
    .length,
  merchantSkuCodes: editionsDoc.editions.filter((edition) => edition.merchantSkuCode !== null)
    .length,
  verifiedStockRows: 0,
  testedCompatibilityRows: 0,
  bundlesWithFixedPrice: bundlesDoc.bundles.filter((bundle) => bundle.fixedPackagePriceEstablished)
    .length,
  bundlesWithDefaultHardware: bundlesDoc.bundles.filter(
    (bundle) => bundle.hardwareIncludedByDefault,
  ).length,
  bundlesWithSla: bundlesDoc.bundles.filter((bundle) => bundle.slaEstablished).length,
};

// Hard guard: the emitted projection must not carry commercial capability fields.
const projectionText = JSON.stringify({
  domainFamilies,
  domainEditions,
  domainBundles,
  domainFacts,
});
for (const forbidden of [
  '"priceAmount":',
  '"priceCurrency":',
  '"quantityAvailable":',
  '"stockQuantity":',
  '"merchantSkuCode":',
  '"customerId":',
  '"vesselId":',
  '"buyUrl":',
  '"checkoutUrl":',
]) {
  assert(
    !projectionText.includes(forbidden),
    `domain projection leaked forbidden field ${forbidden}`,
  );
}

if (problems.length) {
  console.error('MC-18 data generation failed:');
  for (const problem of problems) console.error(' - ' + problem);
  process.exit(1);
}

const domainSource = `// GENERATED FILE - do not edit by hand.
// Source: ${MC16}/{product-families,product-editions,bundle-compositions,readiness-dimensions}.json
//         ${MC14}/release-evidence-gates.json, claims-policy.json
// Generator: node scripts/build-marea-landing-data.mjs
// Projection: bounded internal presentation. No price, stock, SKU, customer or vessel data.
// Publication: NOT_AUTHORIZED. Every commercial state below is NOT_FOR_SALE.

export interface LandingFamilyReadiness {
  readonly definition: string;
  readonly engineering: string;
  readonly licensing: string;
  readonly hardware: string;
  readonly dataRights: string;
  readonly compliance: string;
  readonly pricing: string;
  readonly brandPublication: string;
  readonly availability: string;
  readonly safety: string;
  readonly operations: string;
}

export interface LandingFamilyRecord {
  readonly familyId: string;
  readonly displayName: string;
  readonly productType: string;
  readonly lifecycleState: string;
  readonly definitionStatus: 'DEFINED' | 'CONDITIONAL';
  readonly editionIds: readonly string[];
  readonly editionCount: number;
  readonly commercialAvailability: string;
  readonly publicationState: string;
  readonly brandPublicationStatus: string;
  readonly routeId: string;
  readonly readiness: LandingFamilyReadiness;
  readonly releaseGateIds: readonly string[];
}

export interface LandingEditionRecord {
  readonly editionId: string;
  readonly familyId: string;
  readonly definitionStatus: string;
  readonly editionType: string;
  readonly requiresQuotation: boolean;
  readonly merchantable: boolean;
  readonly priceApproved: boolean;
  readonly commercialAvailability: string;
  readonly publicationState: string;
  readonly featureCount: number;
  readonly expandsTo: readonly string[];
}

export interface LandingBundleLineRecord {
  readonly lineId: string;
  readonly editionId: string;
  readonly inclusion: string;
  readonly required: boolean;
  readonly quantity: number;
  readonly expandsTo: readonly string[];
}

export interface LandingBundleRecord {
  readonly bundleId: string;
  readonly displayName: string;
  readonly customerFacingName: string;
  readonly contractedSolution: boolean;
  readonly hardwareIncludedByDefault: boolean;
  readonly slaEstablished: boolean;
  readonly compatibilityStatus: string;
  readonly installationRequirement: string;
  readonly commercialAvailability: string;
  readonly publicationState: string;
  readonly priceApproved: boolean;
  readonly fixedPackagePriceEstablished: boolean;
  readonly publicationAuthorized: boolean;
  readonly indexationAuthorized: boolean;
  readonly checkoutAllowed: boolean;
  readonly orderable: boolean;
  readonly components: readonly LandingBundleLineRecord[];
  readonly optionalComponents: readonly LandingBundleLineRecord[];
  readonly contractOnlyEditions: readonly {
    readonly lineId: string;
    readonly editionId: string;
    readonly reason: string;
  }[];
  readonly ineligibleEditions: readonly {
    readonly lineId: string;
    readonly editionId: string;
    readonly reason: string;
  }[];
  readonly externalRequirements: readonly string[];
  readonly entitlementCapabilityIds: readonly string[];
}

export interface LandingReadinessDimensionRecord {
  readonly dimensionId: string;
  readonly readyValue: string;
  readonly failureCode: string;
  readonly currentStatus: string;
}

export interface LandingDomainFacts {
  readonly families: number;
  readonly editions: number;
  readonly bundles: number;
  readonly readinessDimensions: number;
  readonly releaseGates: number;
  readonly releaseGatesClosed: number;
  readonly requiredDocuments: number;
  readonly documentsExecuted: number;
  readonly cataloguedClaims: number;
  readonly publicAuthorizedClaims: number;
  readonly approvedPrices: number;
  readonly merchantableEditions: number;
  readonly merchantSkuCodes: number;
  readonly verifiedStockRows: number;
  readonly testedCompatibilityRows: number;
  readonly bundlesWithFixedPrice: number;
  readonly bundlesWithDefaultHardware: number;
  readonly bundlesWithSla: number;
}

export const LANDING_DOMAIN_SOURCE = {
  families: '${MC16}/product-families.json',
  editions: '${MC16}/product-editions.json',
  bundles: '${MC16}/bundle-compositions.json',
  readiness: '${MC16}/readiness-dimensions.json',
  gates: '${MC14}/release-evidence-gates.json',
  claims: '${MC14}/claims-policy.json',
  generationMethod: 'node scripts/build-marea-landing-data.mjs',
} as const;

export const LANDING_DOMAIN_FACTS: LandingDomainFacts = ${JSON.stringify(domainFacts, null, 2)};

export const LANDING_READINESS_DIMENSIONS: readonly LandingReadinessDimensionRecord[] = ${JSON.stringify(
  readinessDoc.dimensions.map((dimension) => ({
    dimensionId: dimension.dimension,
    readyValue: dimension.readyValue,
    failureCode: dimension.failureCode,
    currentStatus: dimension.currentStatus,
  })),
  null,
  2,
)};

export const LANDING_FAMILIES: readonly LandingFamilyRecord[] = ${JSON.stringify(domainFamilies, null, 2)};

export const LANDING_EDITIONS: readonly LandingEditionRecord[] = ${JSON.stringify(domainEditions, null, 2)};

export const LANDING_BUNDLES: readonly LandingBundleRecord[] = ${JSON.stringify(domainBundles, null, 2)};
`;

if (problems.length) {
  console.error('MC-18 data generation failed after emission:');
  for (const problem of problems) console.error(' - ' + problem);
  process.exit(1);
}

const emitted = new Map();
emitted.set(DOMAIN_OUT, domainSource);

if (!DOMAIN_ONLY) {
  // -------------------------------------------------------------- content contracts
  let contentFacts = null;
  const contentPath = 'src/app/marea-landing/content/landing-content.ts';
  const evidencePath = 'src/app/marea-landing/content/evidence.ts';
  if (existsSync(resolve(root, contentPath))) {
    const { LANDING_CONTENT } = await import(`../${contentPath}`);
    const { LANDING_EVIDENCE } = await import(`../${evidencePath}`);
    const blocks = [];
    const collect = (value) => {
      if (Array.isArray(value)) {
        for (const item of value) collect(item);
        return;
      }
      if (value && typeof value === 'object') {
        if (typeof value.contentId === 'string') {
          blocks.push(value);
          return;
        }
        for (const item of Object.values(value)) collect(item);
      }
    };
    collect(LANDING_CONTENT);

    const bilingual = [];
    for (const block of blocks) {
      for (const locale of ['es', 'en']) {
        bilingual.push({
          contentId: block.contentId,
          sectionId: block.sectionId,
          locale,
          sourceType: block.sourceType,
          copyClass: block.copyClass,
          evidenceIds: block.evidenceIds,
          publicationStatus: block.publicationStatus,
          approvalStatus: block.approvalStatus,
          text: block.text[locale],
        });
      }
    }
    const usedEvidenceIds = [...new Set(blocks.flatMap((block) => block.evidenceIds))].sort();
    const sectionOrder = [
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
    const sectionCounts = sectionOrder.map((sectionId) => ({
      sectionId,
      blocks: blocks.filter((block) => block.sectionId === sectionId).length,
    }));
    contentFacts = {
      blocks: blocks.length,
      locales: 2,
      resolvedRecords: bilingual.length,
      usedEvidenceIds,
      sectionCounts,
    };

    emitted.set(
      `${DATA_OUT}/bilingual-content.json`,
      jsonEnvelope({
        contractId: 'MC18-BILINGUAL-CONTENT',
        description:
          'Bilingual landing content resolved per locale. Every record is INTERNAL_DRAFT_NOT_APPROVED and NOT_APPROVED.',
        generationMethod: 'node scripts/build-marea-landing-data.mjs',
        knownLimitations: [
          'Internal draft copy only: no public copy authorization exists (0 of 42 claims public-authorized).',
          'No professional translator review has been performed.',
          'Text is generated from src/app/marea-landing/content/landing-content.ts; that file is the authority.',
        ],
        data: { records: bilingual },
      }),
    );
    emitted.set(
      `${DATA_OUT}/section-registry.json`,
      jsonEnvelope({
        contractId: 'MC18-SECTION-REGISTRY',
        description: 'Frozen order and identity of the ten internal landing sections.',
        generationMethod: 'node scripts/build-marea-landing-data.mjs',
        knownLimitations: [
          'Section ids are internal implementation identifiers, not public URLs.',
          'No section is published; all are rendered only in the isolated preview.',
        ],
        data: {
          sections: sectionOrder.map((sectionId, index) => ({
            sectionId,
            order: index + 1,
            blocks: blocks.filter((block) => block.sectionId === sectionId).length,
            anchor: undefined,
          })),
          totals: { blocks: blocks.length, locales: 2, resolvedRecords: bilingual.length },
        },
      }),
    );
    emitted.set(
      `${DATA_OUT}/content-evidence.json`,
      jsonEnvelope({
        contractId: 'MC18-CONTENT-EVIDENCE',
        description:
          'Evidence registry referenced by the landing content, with the sources it resolves to and the ids actually used.',
        generationMethod: 'node scripts/build-marea-landing-data.mjs',
        knownLimitations: [
          'Evidence records what a source establishes today; it is not an approval.',
          'No external legal, licensing or certification evidence exists.',
        ],
        data: {
          registry: LANDING_EVIDENCE,
          usedEvidenceIds,
          unusedEvidenceIds: LANDING_EVIDENCE.map((entry) => entry.evidenceId)
            .filter((evidenceId) => !usedEvidenceIds.includes(evidenceId))
            .sort(),
        },
      }),
    );
    emitted.set(
      `${DATA_OUT}/manifest.json`,
      jsonEnvelope({
        contractId: 'MC18-MACHINE-READABLE-MANIFEST',
        description:
          'Index of the MC-18 landing machine-readable datasets, their generator, status and provenance policy.',
        generationMethod: 'node scripts/build-marea-landing-data.mjs',
        knownLimitations: [
          'The manifest is an index: when it disagrees with a dataset or the validator, the dataset/validator wins.',
          'The relevant commit for every dataset is the MC-18 delivery record commit (D23); regeneration is deterministic.',
        ],
        data: {
          datasets: [
            'accessibility-evidence.json',
            'bilingual-content.json',
            'bundle-presentation.json',
            'blocker-register.json',
            'content-evidence.json',
            'design-system-dependencies.json',
            'legacy-baseline.json',
            'manifest.json',
            'mc19-handoff-inputs.json',
            'page-identity.json',
            'performance-evidence.json',
            'preview-isolation.json',
            'product-family-presentation.json',
            'publication-gates.json',
            'responsive-evidence.json',
            'review-findings.json',
            'section-registry.json',
            'seo-metadata-contract.json',
            'ssr-hydration-evidence.json',
            'visual-regression-evidence.json',
          ].map((dataset) => ({ dataset, generatedBy: 'see dataset generationMethod' })),
          authority: 'docs/marea/landing/data/*.json + scripts/check-marea-landing.mjs',
        },
      }),
    );
  } else {
    console.warn(`[landing-data] ${contentPath} not present yet: content datasets skipped.`);
  }

  // -------------------------------------------------------------- identity / gates / SEO
  const { LANDING_PAGE_IDENTITY, LANDING_PREVIEW_PATHS, LANDING_ROUTE_TABLE } =
    await import('../src/app/marea-landing/models/page-identity.ts');
  const { MC18_PUBLICATION_EVALUATION, RELEASE_GATE_RECORD } =
    await import('../src/app/marea-landing/models/publication-gates.ts');
  const { buildLandingSeoContract, hreflangGroupIsReciprocal } =
    await import('../src/app/marea-landing/models/seo.ts');

  assert(
    proposedRoutesDoc.items.some(
      (route) =>
        route.routeId === 'mareaOverview' &&
        route.entityId === 'ENT-HUB-MAREA' &&
        route.pageType === 'HUB_OVERVIEW',
    ),
    'MC-15 proposed route identity for mareaOverview is missing',
  );

  const seoEs = buildLandingSeoContract('es', MC18_PUBLICATION_EVALUATION);
  const seoEn = buildLandingSeoContract('en', MC18_PUBLICATION_EVALUATION);
  assert(seoEs.emitted.canonical === false, 'canonical must not be emitted in MC-18');
  assert(seoEs.sitemapEligibility === false, 'sitemap eligibility must be false in MC-18');
  assert(
    hreflangGroupIsReciprocal(seoEs.hreflangGroupCandidate),
    'planned hreflang group must be reciprocal',
  );

  emitted.set(
    `${DATA_OUT}/page-identity.json`,
    jsonEnvelope({
      contractId: 'MC18-PAGE-IDENTITY',
      description:
        'Frozen planning identity inherited from MC-15 for the future MAREA overview page, plus the internal preview paths.',
      generationMethod: 'node scripts/build-marea-landing-data.mjs',
      knownLimitations: [
        'The route is NOT registered in the public application, the sitemap or public navigation.',
        'Preview paths are served by an isolated loopback SSR application only.',
      ],
      data: {
        identity: LANDING_PAGE_IDENTITY,
        previewPaths: LANDING_PREVIEW_PATHS,
        routeTable: LANDING_ROUTE_TABLE,
      },
    }),
  );
  emitted.set(
    `${DATA_OUT}/publication-gates.json`,
    jsonEnvelope({
      contractId: 'MC18-PUBLICATION-GATES',
      description:
        'Fail-closed page publication evaluation with the recorded MC-14 release gate state.',
      generationMethod: 'node scripts/build-marea-landing-data.mjs',
      knownLimitations: [
        'No external approval exists: trademark, source IP, legal identity, copy, claims, privacy and commercial data are all unsatisfied.',
        'A UI boolean or environment variable cannot satisfy a gate; missing values are false.',
      ],
      data: {
        evaluation: MC18_PUBLICATION_EVALUATION,
        recordedReleaseGates: RELEASE_GATE_RECORD,
        canonicalGateState: {
          gates: gatesDoc.summary.gates,
          gatesClosed: gatesDoc.summary.gatesClosed,
          gatesBlocked: gatesDoc.summary.gatesBlocked,
          documents: gatesDoc.summary.documents,
          documentsExecuted: gatesDoc.summary.documentsExecuted,
        },
      },
    }),
  );
  emitted.set(
    `${DATA_OUT}/seo-metadata-contract.json`,
    jsonEnvelope({
      contractId: 'MC18-SEO-METADATA-CONTRACT',
      description:
        'Future metadata planning contract for mareaOverview (ES/EN). Public emission stays disabled.',
      generationMethod: 'node scripts/build-marea-landing-data.mjs',
      knownLimitations: [
        'Canonical, hreflang, Open Graph, Twitter card and JSON-LD are NOT emitted in MC-18.',
        'Activation requires all gates plus a release authorization record that does not exist.',
        'The preview is non-indexable: robots noindex,nofollow and X-Robots-Tag noindex.',
      ],
      data: {
        locales: { es: seoEs, en: seoEn },
        publicEmissionEnabled: false,
        canonicalEmitted: false,
        hreflangEmitted: false,
        jsonLdEmitted: false,
        sitemapEntryAdded: false,
      },
    }),
  );

  // -------------------------------------------------------------- presentation contracts
  const { MAREA_FIXTURE_FAMILIES, MAREA_FIXTURE_BUNDLES } =
    await import('../src/app/marea-design-system/data/fixtures/marea-fixtures.generated.ts');
  const familyPresentation = domainFamilies.map((family) => {
    const fixture = MAREA_FIXTURE_FAMILIES.find((entry) => entry.familyId === family.familyId);
    assert(Boolean(fixture), `missing design-system fixture for family ${family.familyId}`);
    assert(
      fixture.editionCount === family.editionCount,
      `fixture edition count diverges for ${family.familyId}`,
    );
    return {
      familyId: family.familyId,
      displayName: family.displayName,
      definitionStatus: family.definitionStatus,
      editionCount: family.editionCount,
      editionIds: family.editionIds,
      readiness: fixture.readiness,
      restrictions: fixture.restrictions,
      commercialAvailability: family.commercialAvailability,
      priceVisible: false,
      availabilityVisible: false,
      purchaseActionAllowed: false,
    };
  });
  const bundlePresentation = domainBundles.map((bundle) => {
    const fixture = MAREA_FIXTURE_BUNDLES.find((entry) => entry.bundleId === bundle.bundleId);
    assert(Boolean(fixture), `missing design-system fixture for bundle ${bundle.bundleId}`);
    return {
      bundleId: bundle.bundleId,
      displayName: bundle.displayName,
      contractedSolution: bundle.contractedSolution,
      hardwareIncludedByDefault: bundle.hardwareIncludedByDefault,
      slaEstablished: bundle.slaEstablished,
      compatibilityStatus: bundle.compatibilityStatus,
      publicationAuthorized: bundle.publicationAuthorized,
      indexationAuthorized: bundle.indexationAuthorized,
      checkoutAllowed: bundle.checkoutAllowed,
      orderable: bundle.orderable,
      priceVisible: false,
      availabilityVisible: false,
      packagePriceEstablished: bundle.fixedPackagePriceEstablished,
      components: bundle.components.map((line) => ({
        editionId: line.editionId,
        inclusion: line.inclusion,
        required: line.required,
        expandsTo: line.expandsTo,
      })),
      optionalComponents: bundle.optionalComponents.map((line) => ({
        editionId: line.editionId,
        inclusion: line.inclusion,
        required: line.required,
        expandsTo: line.expandsTo,
      })),
      contractOnlyEditions: bundle.contractOnlyEditions,
      ineligibleEditions: bundle.ineligibleEditions,
      externalRequirements: bundle.externalRequirements,
      presentationOnlyNote:
        'Derived read-only presentation contract. Internally defined solution concept; no price, stock, delivery or orderable state.',
    };
  });
  emitted.set(
    `${DATA_OUT}/product-family-presentation.json`,
    jsonEnvelope({
      contractId: 'MC18-PRODUCT-FAMILY-PRESENTATION',
      description: 'Read-only presentation projection of the nine canonical MC-16 families.',
      generationMethod: 'node scripts/build-marea-landing-data.mjs',
      knownLimitations: [
        'References the canonical MC-16 datasets; it does not duplicate the product database.',
        'No price, stock, purchase action or availability is representable.',
        'Restrictions come from the verified MC-17 presentation adapter fixtures.',
      ],
      data: { families: familyPresentation, totals: { families: familyPresentation.length } },
    }),
  );
  emitted.set(
    `${DATA_OUT}/bundle-presentation.json`,
    jsonEnvelope({
      contractId: 'MC18-BUNDLE-PRESENTATION',
      description:
        'Read-only presentation projection of the six canonical MC-16 bundle compositions.',
      generationMethod: 'node scripts/build-marea-landing-data.mjs',
      knownLimitations: [
        'Solution concepts are internally defined; no price, package price, stock or delivery exists.',
        'FLEET is a contracted solution with no default hardware and no established SLA.',
        'Kit expansions are nested on the kit line and never counted twice.',
      ],
      data: { bundles: bundlePresentation, totals: { bundles: bundlePresentation.length } },
    }),
  );

  // -------------------------------------------------------------- design-system dependencies
  const landingFiles = [];
  const walk = (dir) => {
    const abs = resolve(root, dir);
    if (!existsSync(abs)) return;
    for (const entry of readdirSync(abs, { withFileTypes: true })) {
      const rel = join(dir, entry.name).replaceAll('\\', '/');
      if (entry.isDirectory()) walk(rel);
      else if (rel.endsWith('.ts')) landingFiles.push(rel);
    }
  };
  walk('src/app/marea-landing');
  const dependencyMap = new Map();
  for (const file of landingFiles) {
    const text = readText(file);
    const importPattern =
      /import\s+(?:[^'"]*?\s+from\s+)?['"]([^'"]*marea-design-system\/[^'"]+)['"]/g;
    let match;
    while ((match = importPattern.exec(text)) !== null) {
      const source = match[1];
      const absolute = resolve(root, dirname(file), source);
      const resolved =
        [absolute, `${absolute}.ts`, `${absolute}/index.ts`].find((candidate) =>
          existsSync(candidate),
        ) ?? absolute;
      const importPath = relative(root, resolved).replaceAll('\\', '/');
      const entry = dependencyMap.get(importPath) ?? { importPath, importedBy: [] };
      entry.importedBy.push(file);
      dependencyMap.set(importPath, entry);
    }
  }
  const registry = readJson('docs/marea/design-system/data/component-registry.json');
  const dependencies = [...dependencyMap.values()]
    .map((entry) => {
      const component = (registry.components ?? []).find((item) =>
        entry.importPath.endsWith(item.implementationPath ?? ''),
      );
      return {
        importPath: entry.importPath,
        importedBy: [...new Set(entry.importedBy)].sort(),
        selector: component?.selector ?? null,
        registered: Boolean(component),
      };
    })
    .sort((left, right) => left.importPath.localeCompare(right.importPath));
  emitted.set(
    `${DATA_OUT}/design-system-dependencies.json`,
    jsonEnvelope({
      contractId: 'MC18-DESIGN-SYSTEM-DEPENDENCIES',
      description:
        'Every MC-17 design-system module imported by the landing, with locale/registry resolution status.',
      generationMethod: 'node scripts/build-marea-landing-data.mjs',
      knownLimitations: [
        'Only direct imports from src/app/marea-design-system are listed; template-only reuse is not detectable.',
        'Unregistered modules are allowed only for pure data/type contracts and are reported as such.',
      ],
      data: {
        dependencies,
        designSystemRoot: 'src/app/marea-design-system',
        parallelComponentLibrary: false,
      },
    }),
  );

  // -------------------------------------------------------------- preview isolation
  const angularJson = readJson('angular.json');
  const packageJson = readJson('package.json');
  const previewProject = angularJson.projects['marea-landing-preview'];
  assert(
    Boolean(previewProject),
    'angular.json must define the isolated marea-landing-preview project',
  );
  const productionStyles = angularJson.projects.embarcarte.architect.build.options.styles;
  assert(
    JSON.stringify(productionStyles) === JSON.stringify(['src/styles.scss']),
    'production styles must stay exactly ["src/styles.scss"]',
  );
  assert(
    angularJson.projects.embarcarte.architect.build.options.browser === 'src/main.ts',
    'production browser entry must not change',
  );
  emitted.set(
    `${DATA_OUT}/preview-isolation.json`,
    jsonEnvelope({
      contractId: 'MC18-PREVIEW-ISOLATION',
      description:
        'Isolation contract for the internal landing preview: separate Angular project, loopback binding, noindex headers, no production imports.',
      generationMethod: 'node scripts/build-marea-landing-data.mjs',
      knownLimitations: [
        'No publicly hosted preview is authorized.',
        'noindex headers are defence in depth, not a substitute for access control: the server binds to 127.0.0.1.',
      ],
      data: {
        project: 'marea-landing-preview',
        sourceRoot: previewProject.root,
        outputPath: previewProject.architect.build.options.outputPath,
        previewOnlyRoutes: LANDING_PREVIEW_PATHS,
        productionEntryPoints: [
          'src/main.ts',
          'src/main.server.ts',
          'src/app/app.routes.ts',
          'src/app/core/i18n/locale-routes.ts',
          'src/server.ts',
        ],
        productionStyles,
        productionBrowserEntry: angularJson.projects.embarcarte.architect.build.options.browser,
        loopbackHost: '127.0.0.1',
        previewPort: 4302,
        robotsHeader: 'noindex, nofollow, noarchive',
        noExternalServices: true,
        collectsPersonalData: false,
        scripts: Object.fromEntries(
          Object.entries(packageJson.scripts).filter(([name]) => /landing|preview/.test(name)),
        ),
      },
    }),
  );

  // -------------------------------------------------------------- write / verify
  if (CHECK) {
    const stale = [];
    for (const [path, value] of emitted) {
      if (!existsSync(resolve(root, path))) {
        stale.push(`${path} (missing)`);
        continue;
      }
      const current = readText(path);
      const next = typeof value === 'string' ? value : `${JSON.stringify(value, null, 2)}\n`;
      if (current !== next) stale.push(`${path} (out of date)`);
    }
    if (stale.length) {
      console.error('MC-18 generated artefacts are stale:');
      for (const entry of stale) console.error(' - ' + entry);
      process.exit(1);
    }
    console.log(`MC-18 generated artefacts are current (${emitted.size} files).`);
    process.exit(0);
  }

  mkdirSync(resolve(root, DATA_OUT), { recursive: true });
  for (const [path, value] of emitted) {
    mkdirSync(dirname(resolve(root, path)), { recursive: true });
    writeFileSync(
      resolve(root, path),
      typeof value === 'string' ? value : `${JSON.stringify(value, null, 2)}\n`,
    );
  }
  console.log(`MC-18 landing data generated: ${emitted.size} files.`);
  if (contentFacts)
    console.log(
      `Content: ${contentFacts.blocks} blocks / ${contentFacts.resolvedRecords} locale records / ${contentFacts.usedEvidenceIds.length} evidence ids.`,
    );
  process.exit(0);
}

mkdirSync(dirname(resolve(root, DOMAIN_OUT)), { recursive: true });
if (CHECK) {
  const current = existsSync(resolve(root, DOMAIN_OUT)) ? readText(DOMAIN_OUT) : '';
  if (current !== domainSource) {
    console.error(`${DOMAIN_OUT} (out of date)`);
    process.exit(1);
  }
  console.log('MC-18 domain projection is current.');
  process.exit(0);
}
writeFileSync(resolve(root, DOMAIN_OUT), domainSource);
console.log(`MC-18 domain projection generated: ${DOMAIN_OUT}`);

/** Stable envelope shared by every MC-18 dataset. */
function jsonEnvelope({ contractId, description, generationMethod, knownLimitations, data }) {
  return {
    contractId,
    contractVersion: '1.0.0',
    milestone: 'MC-18',
    owner: 'MC-18 implementation team',
    status: 'INTERNAL_PROPOSED',
    publicationStatus: 'NOT_AUTHORIZED',
    description,
    generationMethod,
    relevantCommit: 'docs/marea/landing/MC18-FINAL-DELIVERY-RECORD.md (D23)',
    knownLimitations,
    data,
  };
}
