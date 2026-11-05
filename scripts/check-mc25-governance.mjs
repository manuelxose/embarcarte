#!/usr/bin/env node
/**
 * MC-25 SKU governance validator.
 *
 * Verifies the delivered governance surface against the authoritative contracts
 * and the milestone acceptance criteria. Read-only: no writes, no network, no
 * clock. Exits 1 when any check fails.
 *
 * Each check states what it proves. A green run is evidence for exactly those
 * statements and nothing more. A claimed PASS without a matching recorded
 * execution is not a result.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { register } from 'node:module';

import { fileAt } from './mc23-git-reader.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
register('./marea-landing-ts-loader.mjs', import.meta.url);

const checks = [];
function check(id, title, run) {
  try {
    const detail = run();
    checks.push({ id, title, pass: true, detail: detail ?? '' });
  } catch (error) {
    checks.push({
      id,
      title,
      pass: false,
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
function assert(condition, message) {
  if (!condition) throw new Error(message);
}
assert.throws = (fn, message) => {
  let threw = false;
  try {
    fn();
  } catch {
    threw = true;
  }
  if (!threw) throw new Error(message);
};

const readJson = (relative) => JSON.parse(readFileSync(resolve(root, relative), 'utf8'));
const readText = (relative) => readFileSync(resolve(root, relative), 'utf8');
const sha256 = (relative) =>
  createHash('sha256')
    .update(readFileSync(resolve(root, relative)))
    .digest('hex');

const identity = await import('../src/app/marea-catalog/governance/sku-identity.ts');
const lifecycle = await import('../src/app/marea-catalog/governance/sku-lifecycle.ts');
const readiness = await import('../src/app/marea-catalog/governance/sku-readiness.ts');
const facts = await import('../src/app/marea-catalog/governance/governance-facts.ts');
const authorization = await import('../src/app/marea-catalog/governance/admin-authorization.ts');
const reviewAdapter =
  await import('../src/app/marea-catalog/governance/review-workflow-adapter.ts');
const upgrade = await import('../src/app/marea-catalog/data/bundle-upgrade-paths.ts');
const previewIdentity = await import('../src/app/marea-catalog/models/governance-identity.ts');
const content = await import('../src/app/marea-catalog/content/governance.ts');
const guards = await import('./mc20-catalog-guards.mjs');
const projectionBuilder = await import('./build-mc25-governance-data.mjs');

const editionsContract = readJson('docs/marea/commerce-data/data/product-editions.json');
const familiesContract = readJson('docs/marea/commerce-data/data/product-families.json');
const candidatesContract = readJson('docs/marea/commerce-data/data/sku-candidates.json');
const blockersContract = readJson('docs/marea/commerce-data/data/blocker-register.json');
const provenanceContract = [
  'docs/marea/commerce-data/data/blocker-register.json',
  'docs/marea/commerce-data/data/lifecycle-policy.json',
  'docs/marea/commerce-data/data/readiness-dimensions.json',
  'docs/marea/commerce-data/data/product-families.json',
  'docs/marea/commerce-data/data/product-editions.json',
  'docs/marea/commerce-data/data/sku-candidates.json',
  'docs/marea/commerce-data/data/price-governance.json',
  'docs/marea/commerce-data/data/inventory-governance.json',
  'docs/marea/commerce-data/data/publication-eligibility.json',
  'docs/marea/commerce-data/data/release-gate-mapping.json',
  'docs/marea/bundles/bundle-definitions.json',
];

// ---------------------------------------------------------------------------
// AC-01 — six identity kinds, and an edition is never an approved SKU
// ---------------------------------------------------------------------------
check(
  'MC25-01',
  'canonical identity distinguishes family, edition, bundle, internal id, candidate and merchant SKU',
  () => {
    const expected = [
      'PRODUCT_FAMILY',
      'EDITION',
      'BUNDLE',
      'INTERNAL_CATALOGUE_IDENTITY',
      'CANDIDATE_COMMERCIAL_SKU',
      'APPROVED_MERCHANT_SKU',
    ];
    assert(
      JSON.stringify([...identity.SKU_IDENTITY_KINDS]) === JSON.stringify(expected),
      `unexpected identity vocabulary ${JSON.stringify(identity.SKU_IDENTITY_KINDS)}`,
    );
    const edition = identity.resolveEditionIdentity('NAV-ESSENTIAL');
    assert(edition.kind === 'EDITION', 'NAV-ESSENTIAL did not resolve as an edition');
    assert(edition.orderable === false, 'an edition resolved as orderable');
    assert(edition.candidateOnly === false, 'an edition resolved as a candidate SKU');
    assert(edition.merchantSkuCode === null, 'an edition carries a merchant SKU code');

    const candidate = identity.resolveCandidateIdentity('SKU-CAND-NAV-ESSENTIAL');
    assert(candidate.kind === 'CANDIDATE_COMMERCIAL_SKU', 'candidate id did not resolve');
    assert(candidate.candidateOnly === true, 'candidate is not marked candidate-only');
    assert(candidate.approvedMerchantSku === false, 'candidate resolved as approved');
    assert(candidate.merchantSkuCode === null, 'candidate carries a merchant SKU code');

    const merchant = identity.resolveMerchantSku('MAREA-NAV-ESSENTIAL-001');
    assert(merchant.kind === 'UNKNOWN_IDENTITY', 'a merchant SKU code resolved without a registry');
    assert(
      merchant.kind === 'UNKNOWN_IDENTITY' &&
        merchant.reason === 'NO_APPROVED_MERCHANT_SKU_REGISTRY',
      'merchant resolution failed for an unexpected reason',
    );

    for (const kind of [
      identity.resolveFamilyIdentity('NAV'),
      identity.resolveBundleIdentity('START'),
      identity.resolveInternalCatalogueIdentity('ENT-FAMILY-NAV'),
    ]) {
      assert(kind.orderable === false, `${kind.kind} resolved as orderable`);
    }
    assert(
      identity.resolveFamilyIdentity('NOT_A_FAMILY').kind === 'UNKNOWN_IDENTITY',
      'an unknown family resolved as canonical',
    );
    return '6 identity kinds; 0 editions/candidates resolve as approved SKUs; frozen empty merchant registry';
  },
);

// ---------------------------------------------------------------------------
// AC-02 — the governance lifecycle has no orderable/sellable/published state
// ---------------------------------------------------------------------------
check('MC25-02', 'the governance lifecycle vocabulary contains no commercial state', () => {
  const states = [...lifecycle.SKU_GOVERNANCE_STATES];
  const expected = ['DRAFT', 'INCOMPLETE', 'AWAITING_EVIDENCE', 'BLOCKED', 'READY_FOR_REVIEW'];
  assert(JSON.stringify(states) === JSON.stringify(expected), `unexpected states ${states}`);
  for (const prohibited of lifecycle.PROHIBITED_GOVERNANCE_STATE_NAMES) {
    assert(!states.includes(prohibited), `prohibited state ${prohibited} is in the vocabulary`);
  }
  const source = readText('src/app/marea-catalog/governance/sku-lifecycle.ts');
  assert(
    source.includes(`'READY_FOR_REVIEW',`) && source.includes('DRAFT'),
    'the lifecycle source does not declare the five states',
  );
  assert(
    lifecycle.SKU_LIFECYCLE_FACTS.orderableStates === 0,
    'the lifecycle publishes an orderable state count other than 0',
  );
  assert(
    lifecycle.SKU_LIFECYCLE_TRANSITIONS.length === 7,
    `expected 7 transitions, found ${lifecycle.SKU_LIFECYCLE_TRANSITIONS.length}`,
  );
  return `${states.length} states, ${lifecycle.SKU_LIFECYCLE_TRANSITIONS.length} transitions, 0 commercial states`;
});

// ---------------------------------------------------------------------------
// AC-03 — invalid transitions are rejected and no transition persists
// ---------------------------------------------------------------------------
check(
  'MC25-03',
  'invalid lifecycle transitions are rejected and every transition is non-persistent',
  () => {
    const invalid = lifecycle.transition('DRAFT', 'READY_FOR_REVIEW');
    assert(
      invalid.ok === false && invalid.code === 'INVALID_TRANSITION',
      'DRAFT→READY was not rejected',
    );
    const unknown = lifecycle.transition('NOWHERE', 'DRAFT');
    assert(
      unknown.ok === false && unknown.code === 'UNKNOWN_FROM_STATE',
      'unknown state was accepted',
    );
    const guarded = lifecycle.transition('AWAITING_EVIDENCE', 'READY_FOR_REVIEW');
    assert(
      guarded.ok === false && guarded.code === 'GUARD_REFUSED',
      'the evidence guard did not refuse',
    );
    assert(guarded.persisted === false, 'a refused transition claimed persistence');
    const open = lifecycle.transition('DRAFT', 'INCOMPLETE');
    assert(open.ok === true && open.persisted === false, 'an unguarded transition persisted');
    const blocked = lifecycle.transitionOptions('BLOCKED');
    assert(
      blocked.every((option) => option.permitted === false),
      'a blocked state offered a permitted transition',
    );
    assert(
      lifecycle.governanceStateOf({
        commercialOrderability: 'NOT_ORDERABLE',
        mc02BlockerIds: ['GATE-PRICING'],
        missingPrerequisites: ['PRICE_APPROVED'],
      }) === 'BLOCKED',
      'an open blocker did not derive BLOCKED',
    );
    return '1 invalid + 1 guarded + 1 unknown transition refused; 2 open transitions permitted but not persisted';
  },
);

// ---------------------------------------------------------------------------
// AC-04 — deterministic readiness matrix: 0 orderable editions
// ---------------------------------------------------------------------------
check('MC25-04', 'no canonical edition is orderable and the matrix is deterministic', () => {
  const matrix = readiness.readinessMatrix();
  assert(matrix.length === editionsContract.editions.length, 'matrix does not cover every edition');
  assert(
    matrix.every((decision) => decision.orderable === false),
    'an edition decision is orderable',
  );
  assert(
    matrix.every((decision) => decision.commercialOrderability === 'NOT_ORDERABLE'),
    'an edition claims commercial orderability',
  );
  assert(
    matrix.every((decision) => decision.missingPrerequisites.length > 0),
    'a decision lists no missing prerequisite',
  );
  assert(
    matrix.every((decision) => decision.refusalReasons.length > 0),
    'a decision returns no refusal reason',
  );
  const again = readiness.readinessMatrix();
  assert(
    matrix.every(
      (decision, index) => decision.evidenceFingerprint === again[index].evidenceFingerprint,
    ),
    'two evaluations produced different fingerprints',
  );
  for (const decision of matrix) readiness.assertNotOrderable(decision);
  return `${matrix.length} editions evaluated twice: 0 orderable, identical fingerprints, explicit reasons`;
});

// ---------------------------------------------------------------------------
// AC-04b — candidates and bundles are also never orderable
// ---------------------------------------------------------------------------
check('MC25-05', 'no candidate SKU and no bundle is orderable', () => {
  const candidates = candidatesContract.candidates.map((candidate) =>
    readiness.evaluateCandidateReadiness(candidate.skuCandidateId),
  );
  assert(
    candidates.length === candidatesContract.candidates.length,
    'not every candidate was evaluated',
  );
  assert(
    candidates.every((decision) => decision.orderable === false),
    'a candidate is orderable',
  );
  const bundles = readiness.bundleReadinessMatrix();
  assert(bundles.length === 6, 'not every bundle was evaluated');
  assert(
    bundles.every((decision) => decision.orderable === false),
    'a bundle is orderable',
  );
  assert(
    bundles.every((decision) => decision.refusalReasons.length > 0),
    'a bundle returns no refusal reason',
  );
  assert(
    readiness.READINESS_FACTS.orderableEditions === 0 &&
      readiness.READINESS_FACTS.orderableBundles === 0,
    'the published facts report an orderable item',
  );
  return `${candidates.length} candidates + ${bundles.length} bundles: 0 orderable`;
});

// ---------------------------------------------------------------------------
// AC-05 — MC-02 blockers are referenced per SKU from the register
// ---------------------------------------------------------------------------
check('MC25-06', 'every readiness decision references its MC-02 blockers from the register', () => {
  const gateIds = new Set(blockersContract.gates.map((gate) => gate.blockerId));
  const openGateIds = new Set(
    blockersContract.gates.filter((gate) => gate.open).map((gate) => gate.blockerId),
  );
  let referenced = 0;
  for (const decision of readiness.readinessMatrix()) {
    const edition = editionsContract.editions.find(
      (entry) => entry.editionId === decision.subject.editionId,
    );
    assert(edition, `decision for unknown edition ${decision.subject.editionId}`);
    for (const blockerId of decision.mc02BlockerIds) {
      assert(gateIds.has(blockerId), `decision references unknown blocker ${blockerId}`);
      assert(openGateIds.has(blockerId), `decision references a blocker the register calls closed`);
      referenced += 1;
    }
    const openExpected = edition.releaseGateDependencies.filter((gate) => openGateIds.has(gate));
    for (const gate of openExpected) {
      assert(
        decision.mc02BlockerIds.includes(gate),
        `${edition.editionId} does not reference open gate ${gate}`,
      );
    }
  }
  const pilot = readiness.evaluateSkuReadiness('PILOT-COASTAL');
  assert(
    pilot.mc02BlockerIds.includes('GATE-SAFETY-PILOT'),
    'a PILOT edition does not reference GATE-SAFETY-PILOT',
  );
  return `${referenced} blocker references across 26 editions, all present in the MC-16 register`;
});

// ---------------------------------------------------------------------------
// AC-06 — NOT_APPLICABLE is not approval
// ---------------------------------------------------------------------------
check('MC25-07', 'NOT_APPLICABLE never counts as approval unless the contract permits it', () => {
  const real = readiness.evaluateSkuReadiness('NAV-ESSENTIAL');
  const hardware = real.prerequisites.find((item) => item.id === 'HARDWARE_CERTIFIED');
  assert(hardware, 'the hardware prerequisite is missing');
  assert(hardware.status === 'NOT_APPLICABLE', `expected N/A, found ${hardware.status}`);
  assert(hardware.permittedNotApplicable === true, 'the software N/A is not marked permitted');

  const permitted = {
    ...hardware,
    status: 'NOT_APPLICABLE',
    permittedNotApplicable: true,
  };
  const forbidden = { ...permitted, permittedNotApplicable: false };
  const allPass = readiness.READINESS_PREREQUISITES.map((id) => ({
    id,
    status: 'PASSED',
    permittedNotApplicable: false,
    failureCode: null,
    detail: '',
    contractRef: '',
    mc02BlockerIds: [],
    requiredEvidenceIds: [],
  }));
  const withPermitted = allPass.map((item) =>
    item.id === 'HARDWARE_CERTIFIED' ? permitted : item,
  );
  const withForbidden = allPass.map((item) =>
    item.id === 'HARDWARE_CERTIFIED' ? forbidden : item,
  );
  assert(
    readiness.combinePrerequisites(withPermitted).orderable === true,
    'a contract-permitted N/A failed to satisfy its prerequisite',
  );
  const refused = readiness.combinePrerequisites(withForbidden);
  assert(refused.orderable === false, 'an unpermitted N/A was treated as approval');
  assert(
    refused.missing.includes('HARDWARE_CERTIFIED'),
    'an unpermitted N/A is not reported as missing',
  );
  return 'software N/A is NOT_APPLICABLE + permitted; a non-permitted N/A blocks and is reported missing';
});

// ---------------------------------------------------------------------------
// AC-07 — evidence provenance is content-bound
// ---------------------------------------------------------------------------
check('MC25-08', 'evidence provenance digests match the current contract bytes', () => {
  const provenance = facts.GOVERNANCE_SNAPSHOT.provenance;
  assert(
    provenance.length === provenanceContract.length,
    'provenance does not cover every contract',
  );
  for (const entry of provenance) {
    assert(provenanceContract.includes(entry.path), `unexpected provenance path ${entry.path}`);
    assert(entry.sha256 === sha256(entry.path), `digest drift for ${entry.path}`);
    assert(
      entry.contractId.length > 0 && entry.contractVersion.length > 0,
      `missing contract id for ${entry.path}`,
    );
  }
  const decision = readiness.evaluateSkuReadiness('NAV-ESSENTIAL');
  assert(decision.contractRefs.length >= 6, 'the decision is not bound to its contracts');
  assert(decision.evaluationVersion === 'mc25-readiness/1.0.0', 'unexpected evaluation version');
  const required = readText('src/app/marea-catalog/governance/sku-readiness.ts');
  assert(
    !/Date\.|Math\.random|performance\.now/u.test(required),
    'the engine reads a clock or randomness',
  );
  return `${provenance.length} contract digests verified against the current bytes`;
});

// ---------------------------------------------------------------------------
// AC-08 — no invented price, stock, SKU code or availability
// ---------------------------------------------------------------------------
check('MC25-09', 'no price, stock, merchant SKU code or availability is invented', () => {
  const snapshot = facts.GOVERNANCE_SNAPSHOT;
  assert(
    snapshot.skuCandidates.every((candidate) => candidate.merchantSkuCode === null),
    'a candidate carries a merchant SKU code',
  );
  assert(
    snapshot.skuCandidates.every((candidate) => candidate.merchantable === false),
    'a candidate is merchantable',
  );
  assert(Number(snapshot.priceState.approvedPrices) === 0, 'an approved price exists');
  assert(
    String(snapshot.inventoryState.verifiedMareaStock) === 'NONE',
    'verified MAREA stock exists',
  );
  assert(Number(snapshot.inventoryState.inventoryItemCount) === 0, 'inventory rows exist');
  assert(String(snapshot.externalEvidence.priceApproved) === 'NONE', 'priceApproved changed');
  const section = readText('src/app/marea-catalog/sections/section-sku-governance.ts');
  assert(!/[€£]|\bEUR\b|\bUSD\b/u.test(section), 'the governance screen renders a currency amount');
  assert(!/type="number"/u.test(section), 'the governance screen offers a numeric price input');
  assert(!/\bprice\s*[:=]\s*\d/u.test(section), 'the governance screen hard-codes a price');
  return '0 approved prices, 0 stock rows, 0 merchant SKU codes, no currency rendered';
});

// ---------------------------------------------------------------------------
// AC-09 — the admin boundary refuses every mutation, even direct invocation
// ---------------------------------------------------------------------------
check('MC25-10', 'administration actions are refused in the business logic, not the UI', () => {
  const inspection = authorization.authorizeAdminAction(
    'INSPECT_READINESS',
    authorization.CURRENT_PRINCIPAL,
  );
  assert(
    inspection.allowed === true && inspection.readOnly === true,
    'read-only inspection was refused',
  );

  const forged = {
    role: 'PROGRAMME_LEAD',
    authenticated: true,
    authorizationMechanism: 'VERIFIED_SESSION',
    principalRef: 'FORGED-PRINCIPAL',
  };
  for (const action of authorization.PROHIBITED_ADMIN_ACTIONS) {
    const decision = authorization.authorizeAdminAction(action, forged);
    assert(decision.allowed === false, `prohibited action ${action} was authorized`);
    assert(
      decision.code === 'ACTION_PROHIBITED_BY_INVARIANT',
      `prohibited action ${action} failed for the wrong reason: ${decision.code}`,
    );
  }
  const mutation = authorization.authorizeAdminAction('REQUEST_EVIDENCE', forged);
  assert(
    mutation.allowed === false,
    'a mutating action was authorized without a persistence contract',
  );
  assert(
    mutation.code === 'NO_AUTHORIZED_PERSISTENCE_CONTRACT',
    `mutation failed for the wrong reason: ${mutation.code}`,
  );
  const anonymous = authorization.authorizeAdminAction(
    'REQUEST_EVIDENCE',
    authorization.CURRENT_PRINCIPAL,
  );
  assert(anonymous.allowed === false, 'an anonymous principal was authorized');
  assert(
    anonymous.code === 'NO_VERIFIED_AUTHORIZATION_MECHANISM',
    'anonymous refusal used the wrong code',
  );
  assert(
    authorization.APPROVAL_PERSISTENCE_CONTRACT === 'ABSENT',
    'a persistence contract is declared',
  );
  assert(authorization.AUTHORIZATION_FACTS.verifiedMechanisms === 0, 'a verified mechanism exists');
  return 'read-only allowed; 3 prohibited actions + 1 mutation + 1 anonymous all refused with a named code';
});

// ---------------------------------------------------------------------------
// AC-10 — direct invocation of the review workflow applies nothing
// ---------------------------------------------------------------------------
check(
  'MC25-11',
  'direct invocation of every review action applies, persists and approves nothing',
  () => {
    const forged = {
      role: 'COMMERCIAL_DIRECTOR',
      authenticated: true,
      authorizationMechanism: 'VERIFIED_SESSION',
      principalRef: 'FORGED',
    };
    let invoked = 0;
    for (const action of authorization.ADMIN_ACTIONS) {
      for (const principal of [authorization.CURRENT_PRINCIPAL, forged]) {
        const outcome = authorization.submitReviewAction({
          action,
          editionId: 'NAV-ESSENTIAL',
          principal,
        });
        invoked += 1;
        assert(outcome.applied === false, `${action} applied for ${principal.principalRef}`);
        assert(outcome.persisted === false, `${action} persisted for ${principal.principalRef}`);
        assert(outcome.durableApproval === false, `${action} claimed a durable approval`);
        assert(
          outcome.auditDraft.includes('NOT_PERSISTED'),
          `${action} produced an audit draft that claims persistence`,
        );
      }
    }
    const adapterSource = readText('src/app/marea-catalog/governance/review-workflow-adapter.ts');
    assert(
      !/fetch\(|localStorage|sessionStorage|indexedDB|HttpClient/u.test(adapterSource),
      'the review adapter performs I/O',
    );
    const section = readText('src/app/marea-catalog/sections/section-sku-governance.ts');
    assert(
      !/fetch\(|localStorage|sessionStorage|indexedDB|HttpClient/u.test(section),
      'the screen performs I/O',
    );
    return `${invoked} direct invocations across 7 actions x 2 principals: 0 applied, 0 persisted, 0 durable approvals`;
  },
);

// ---------------------------------------------------------------------------
// AC-11 — preview route registration and isolation
// ---------------------------------------------------------------------------
check(
  'MC25-12',
  'the governance preview is registered in both route tables and nowhere public',
  () => {
    const clientRoutes = readText('preview/landing/app.routes.ts');
    const serverRoutes = readText('preview/landing/app.routes.server.ts');
    assert(
      clientRoutes.includes('GOVERNANCE_PREVIEW_ROUTES'),
      'client route table misses governance',
    );
    assert(
      serverRoutes.includes('GOVERNANCE_PREVIEW_ROUTES'),
      'server route table misses governance',
    );

    // Every preview route must also have a Server entry, or it answers 404 while
    // rendering (the inherited MC-23 bundle defect).
    const modules = ['catalog', 'bundle', 'configurator', 'governance'];
    for (const module of modules) {
      const upper = module.toUpperCase();
      assert(
        clientRoutes.includes(`${upper}_PREVIEW_ROUTES`),
        `${module} routes missing from the client table`,
      );
      assert(
        serverRoutes.includes(`${upper}_PREVIEW_ROUTES`),
        `${module} routes missing from the server table`,
      );
    }

    for (const route of previewIdentity.GOVERNANCE_PREVIEW_ROUTES) {
      assert(
        route.path.startsWith('internal/catalog/') || route.path.startsWith('en/internal/catalog/'),
        `preview path ${route.path} escapes the internal namespace`,
      );
      for (const publicFile of [
        'src/app/app.routes.ts',
        'src/app/app.routes.server.ts',
        'src/app/core/i18n/locale-routes.ts',
        'src/app/marea-landing/landing-page.ts',
      ]) {
        if (!existsSync(resolve(root, publicFile))) continue;
        assert(
          !readText(publicFile).includes(route.path),
          `${publicFile} registers the internal governance path`,
        );
      }
    }
    const identityFacts = previewIdentity.GOVERNANCE_PREVIEW_IDENTITY;
    assert(identityFacts.publicRouteRegistered === false, 'the preview claims a public route');
    assert(identityFacts.indexationAuthorized === false, 'the preview claims indexation');
    assert(identityFacts.sitemapEligible === false, 'the preview claims sitemap eligibility');
    assert(
      identityFacts.customerDataCollected === false,
      'the preview claims customer data collection',
    );
    return '4 preview route families registered in both tables; governance absent from every public surface';
  },
);

// ---------------------------------------------------------------------------
// AC-12 — noindex, loopback and no external calls
// ---------------------------------------------------------------------------
check(
  'MC25-13',
  'the governance screen is noindex, loopback-only and performs no external call',
  () => {
    const host = readText('preview/landing/governance-preview.ts');
    assert(
      /noindex, nofollow, noarchive/u.test(host),
      'the host does not set the robots noindex tag',
    );
    assert(/marea-publication/u.test(host), 'the host does not record the publication state');
    const server = readText('preview/landing/server.ts');
    assert(/const host = '127\.0\.0\.1'/u.test(server), 'the preview is not bound to loopback');
    assert(/ALLOWED_HOSTS/u.test(server), 'the preview has no host allow-list');
    assert(/403/u.test(server), 'the preview does not reject a non-loopback Host');
    assert(/X-Robots-Tag/u.test(server), 'the server does not send X-Robots-Tag');
    for (const file of [
      'src/app/marea-catalog/sections/section-sku-governance.ts',
      'src/app/marea-catalog/governance/sku-readiness.ts',
      'src/app/marea-catalog/governance/admin-authorization.ts',
    ]) {
      const source = readText(file);
      assert(
        !/fetch\(|HttpClient|XMLHttpRequest|navigator\.sendBeacon/u.test(source),
        `${file} performs a network call`,
      );
    }
    return 'noindex meta + X-Robots-Tag + loopback binding + 403 host allow-list; 0 network calls';
  },
);

// ---------------------------------------------------------------------------
// AC-13 — F-2 reproduced at the inherited revision and repaired now
// ---------------------------------------------------------------------------
check('MC25-14', 'F-2 upgrade-path relationship integrity is reproduced and repaired', () => {
  const inherited = fileAt(root, '8a4b5e0', 'src/app/marea-catalog/data/bundle-upgrade-paths.ts');
  assert(
    typeof inherited === 'string' && inherited.length > 0,
    'cannot read the inherited revision',
  );
  assert(
    !/validateUpgradePath|UpgradePathIntegrity|verifiedAdditions/u.test(inherited),
    'the inherited revision already validated the relationship, so F-2 was not reproducible there',
  );
  assert(
    /inclusionFor\(bundleId: string, editionId: string\): BundleInclusion \| undefined/u.test(
      inherited,
    ),
    'the inherited inclusionFor signature is not the recorded one',
  );

  const integrity = upgrade.allUpgradePathIntegrity();
  assert(integrity.length === 15, `expected 15 contract paths, found ${integrity.length}`);
  const invalid = integrity.filter((entry) => entry.status !== 'VALID');
  assert(
    invalid.length === 0,
    `legitimate paths rejected: ${invalid.map((entry) => entry.upgradeId).join(', ')}`,
  );
  const verified = integrity.reduce((total, entry) => total + entry.verifiedAdditions.length, 0);
  const textual = integrity.reduce((total, entry) => total + entry.textualAdditions.length, 0);
  assert(verified >= 30, `only ${verified} edition relationships were verified`);

  const fabricated = [
    [
      { upgradeId: 'X', path: 'START to CRUISE', fromBundleId: 'START', adds: ['NOT-AN-EDITION'] },
      'ADDED_EDITION_NOT_FOUND',
    ],
    [
      { upgradeId: 'X', path: 'START to CRUISE', fromBundleId: 'START', adds: ['FLEET-START'] },
      'ADDED_EDITION_NOT_IN_TARGET',
    ],
    [
      { upgradeId: 'X', path: 'START to CRUISE', fromBundleId: 'START', adds: ['HUB-STANDARD'] },
      'ADDITION_ALREADY_INCLUDED_IN_SOURCE',
    ],
    [
      { upgradeId: 'X', path: 'CRUISE to CRUISE', fromBundleId: 'CRUISE', adds: [] },
      'TARGET_EQUALS_SOURCE',
    ],
    [
      { upgradeId: 'X', path: 'START to NOWHERE', fromBundleId: 'START', adds: [] },
      'TARGET_UNRESOLVED',
    ],
    [
      { upgradeId: 'X', path: 'START to CRUISE', fromBundleId: 'NOPE', adds: [] },
      'UNKNOWN_FROM_BUNDLE',
    ],
  ];
  for (const [probe, expectedCode] of fabricated) {
    const result = upgrade.validateUpgradePath(probe);
    assert(
      result.status === 'INVALID',
      `fabricated path was not rejected: ${JSON.stringify(probe)}`,
    );
    assert(
      result.findings.some((finding) => finding.code === expectedCode),
      `fabricated path failed for the wrong reason: ${JSON.stringify(result.findings)}`,
    );
  }
  assert(
    upgrade.upgradePathIntegrity('NOPE').status === 'UNKNOWN_PATH',
    'an unknown path id resolved',
  );
  return `inherited revision has no validation; 15 paths VALID, ${verified} relationships verified, ${textual} textual, 6 fabricated rejected`;
});

// ---------------------------------------------------------------------------
// AC-14 — F-15 unknown edition is distinct from a commercial exclusion
// ---------------------------------------------------------------------------
check('MC25-15', 'F-15 distinguishes an unknown edition from an ordinary exclusion', () => {
  const unknownEdition = upgrade.inclusionFor('START', 'NOT-AN-EDITION');
  assert(
    unknownEdition.kind === 'UNKNOWN_EDITION',
    `unknown edition resolved as ${unknownEdition.kind}`,
  );
  const absent = upgrade.inclusionFor('START', 'FLEET-START');
  assert(absent.kind === 'NOT_INCLUDED', `a known absent edition resolved as ${absent.kind}`);
  const unknownBundle = upgrade.inclusionFor('NOT_A_BUNDLE', 'NAV-PRO');
  assert(
    unknownBundle.kind === 'UNKNOWN_BUNDLE',
    `unknown bundle resolved as ${unknownBundle.kind}`,
  );
  const included = upgrade.inclusionFor('START', 'HUB-STANDARD');
  assert(included.kind === 'INCLUDED_LINE', `an included edition resolved as ${included.kind}`);
  assert(
    included.kind === 'INCLUDED_LINE' && included.inclusion === 'INCLUDED',
    'inclusion value wrong',
  );

  const eligibility = upgrade.evaluateEligibility('START', ['NOT-AN-EDITION']);
  assert(
    eligibility.outcome !== 'CONFIGURATION_DEFINED_INTERNAL',
    'an unknown edition produced a permissive outcome',
  );
  assert(
    eligibility.reasons.includes('UNKNOWN_EDITION:NOT-AN-EDITION'),
    `unknown edition reason missing: ${JSON.stringify(eligibility.reasons)}`,
  );
  assert(
    !eligibility.reasons.some((reason) => reason === 'INELIGIBLE:NOT-AN-EDITION'),
    'an unknown edition was classified as an ordinary exclusion',
  );
  const notIncluded = upgrade.evaluateEligibility('START', ['FLEET-START']);
  assert(
    notIncluded.reasons.every((reason) => !reason.startsWith('UNKNOWN_EDITION')),
    'a known absent edition was reported as unknown',
  );
  const inherited = fileAt(root, '8a4b5e0', 'src/app/marea-catalog/data/bundle-upgrade-paths.ts');
  assert(
    /return match \? match\.inclusion : 'NOT_INCLUDED';/u.test(inherited),
    'the inherited defect line is not present at 8a4b5e0',
  );
  return 'unknown edition → UNKNOWN_EDITION and NOT_ELIGIBLE; known absent → NOT_INCLUDED; inherited line reproduced';
});

// ---------------------------------------------------------------------------
// AC-15 — the immutable fact snapshot cannot be mutated
// ---------------------------------------------------------------------------
check('MC25-16', 'the governance fact snapshot is frozen and cannot be mutated', () => {
  const snapshot = facts.GOVERNANCE_SNAPSHOT;
  assert(Object.isFrozen(snapshot), 'the snapshot is not frozen');
  assert(Object.isFrozen(snapshot.editions), 'the edition array is not frozen');
  assert(Object.isFrozen(snapshot.editions[0]), 'an edition record is not frozen');
  assert(
    Object.isFrozen(snapshot.skuCandidates[0].creationPreconditions),
    'a nested array is not frozen',
  );
  assert.throws(
    () => snapshot.editions.push({ editionId: 'FAKE' }),
    'the edition array accepted a push',
  );
  assert.throws(() => {
    snapshot.editions[0].merchantable = true;
  }, 'an edition record accepted a write');
  assert.throws(() => {
    snapshot.externalEvidence.priceApproved = 'APPROVED';
  }, 'the external evidence accepted a write');
  const source = readText('src/app/marea-catalog/governance/governance-facts.ts');
  assert(
    !/export const (?:EDITION|FAMILY|CANDIDATE|BLOCKER)_INDEX/u.test(source),
    'a mutable lookup map is exported',
  );
  return 'snapshot, arrays and records frozen; push and assignment throw; no index map exported';
});

// ---------------------------------------------------------------------------
// AC-16 — bilingual parity
// ---------------------------------------------------------------------------
check('MC25-17', 'every governance string is complete in both ES and EN', () => {
  const labels = content.GOVERNANCE_LABELS;
  const keys = Object.keys(labels);
  assert(keys.length >= 60, `only ${keys.length} label keys`);
  for (const key of keys) {
    const entry = labels[key];
    assert(typeof entry.es === 'string' && entry.es.trim().length > 0, `${key} has no ES text`);
    assert(typeof entry.en === 'string' && entry.en.trim().length > 0, `${key} has no EN text`);
  }
  for (const key of content.GOVERNANCE_NOTICE_KEYS) {
    assert(labels[key], `notice key ${key} has no label`);
  }
  for (const key of content.GOVERNANCE_LIMITATION_KEYS) {
    assert(labels[key], `limitation key ${key} has no label`);
  }
  for (const key of Object.values(content.GOVERNANCE_STATE_LABELS)) {
    assert(labels[key], `state label key ${key} has no label`);
  }
  return `${keys.length} bilingual pairs, parity checked`;
});

// ---------------------------------------------------------------------------
// AC-17 — claim discipline and no network/form on the delivered copy
// ---------------------------------------------------------------------------
check('MC25-18', 'the governance screen introduces no prohibited commercial claim', () => {
  const files = [
    'src/app/marea-catalog/content/governance.ts',
    'src/app/marea-catalog/sections/section-sku-governance.ts',
    'preview/landing/governance-preview.ts',
  ];
  let problems = 0;
  for (const file of files) {
    const source = readText(file);
    // The claims guard is a copy heuristic and false-positives on CSS values
    // such as `100%` (a recorded MC-22 limitation). Only the copy-bearing part
    // is scanned: everything before the component's `styles:` block.
    const copy = file.endsWith('.ts') ? source.split('  styles: `')[0] : source;
    const found = guards.catalogClaimProblems(copy);
    problems += found.length;
    assert(found.length === 0, `${file} triggers the claims guard: ${found.join(', ')}`);
    assert(!/<form[^>]+action=/iu.test(source), `${file} posts to an endpoint`);
    assert(!/type="email"/u.test(source), `${file} collects an email address`);
  }
  const segment = guards.catalogClaimProblems(
    'Disponible para compra. Precio de 1.999 EUR. Certificado CE.',
  );
  assert(segment.length > 0, 'the claims guard no longer rejects a commercial claim');
  return `${files.length} files clean; the guard still rejects a fabricated availability/price/CE claim`;
});

// ---------------------------------------------------------------------------
// AC-18 — the generator and its drift gate are wired
// ---------------------------------------------------------------------------
check('MC25-19', 'the governance projection is generated and the drift gate is wired', () => {
  const pkg = readJson('package.json');
  const scripts = pkg.scripts ?? {};
  for (const name of [
    'build:mc25:data',
    'check:mc25:data',
    'test:mc25',
    'test:mc25:unit',
    'test:mc25:build',
    'test:mc25:e2e',
  ]) {
    assert(typeof scripts[name] === 'string', `package script ${name} is missing`);
  }
  const generated = readText('src/app/marea-catalog/data/governance.generated.ts');
  assert(
    generated.includes('GENERATED FROM THE MC-16 / MC-08 CONTRACTS'),
    'the projection is not generated',
  );
  assert(
    generated.includes(`familyCount: ${familiesContract.families.length},`),
    'the projection family count is wrong',
  );
  assert(
    generated.includes(`editionCount: ${editionsContract.editions.length},`),
    'the projection edition count is wrong',
  );
  const builder = readText('scripts/build-mc25-governance-data.mjs');
  const refusalChecks = [
    'references unknown edition',
    'references unknown release gate',
    'carries a merchant SKU code',
    'priceApproved must be NONE',
    'testedCompatibilityRows must be 0',
  ];
  for (const phrase of refusalChecks) {
    assert(builder.includes(phrase), `the generator does not refuse: ${phrase}`);
  }
  const projected = projectionBuilder.buildProjection();
  assert(
    projected.text === generated,
    'the committed projection has drifted from the contracts; run build:mc25:data',
  );
  return '6 scripts wired; projection carries 9 families / 26 editions; drift re-derived in-process; 5 contract-contradiction refusals present';
});

// ---------------------------------------------------------------------------
// AC-19 — every decision carries the required traceability fields
// ---------------------------------------------------------------------------
check(
  'MC25-20',
  'every decision carries identity, contract, gates, blockers, evidence, result and version',
  () => {
    for (const decision of readiness.readinessMatrix()) {
      assert(decision.subject.editionId, 'decision has no edition identity');
      assert(decision.subject.familyId, 'decision has no family identity');
      assert(decision.contractRefs.length > 0, 'decision has no contract reference');
      assert(decision.prerequisites.length === 10, 'decision does not evaluate 10 prerequisites');
      assert(decision.mc02BlockerIds.length > 0, 'decision references no MC-02 blocker');
      assert(
        decision.prerequisites.every((item) => item.requiredEvidenceIds.length >= 0),
        'decision carries no evidence requirement',
      );
      assert(decision.missingPrerequisites.length > 0, 'decision lists no missing prerequisite');
      assert(
        decision.commercialOrderability === 'NOT_ORDERABLE',
        'decision result is not NOT_ORDERABLE',
      );
      assert(
        /^mc25-readiness\/\d+\.\d+\.\d+$/u.test(decision.evaluationVersion),
        'decision has no version',
      );
      assert(/^[0-9a-f]{8}$/u.test(decision.evidenceFingerprint), 'decision has no fingerprint');
    }
    return '26 decisions each carry identity, contracts, 10 gates, blockers, evidence, result, version and fingerprint';
  },
);

// ---------------------------------------------------------------------------
const failed = checks.filter((item) => !item.pass);
for (const item of checks) {
  console.log(`${item.pass ? 'PASS' : 'FAIL'} ${item.id} — ${item.title}`);
  if (item.detail) console.log(`     ${item.detail}`);
}
console.log(
  `\nMC-25 governance validator: ${checks.length - failed.length}/${checks.length} ${failed.length === 0 ? 'PASS' : 'FAIL'}`,
);
// `exitCode` rather than `process.exit()` so the confined ENGINE-03 runner can
// import this module in-process and still observe the failure. A successful run
// sets nothing: the runner treats any exitCode change as a stage failure.
if (failed.length > 0) process.exitCode = 1;
