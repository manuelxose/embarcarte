/**
 * MC-25 SKU governance — adversarial domain tests.
 *
 * These attack the DOMAIN, not the page: identity confusion, lifecycle bypass,
 * forged readiness, registry mutation, authorization bypass, F-2/F-15 edge
 * cases. Every expectation is independent of the module under test: the counts
 * and values come from the MC-16 contract files, not from the engine's own
 * published facts.
 *
 * Run with:
 *   node --import ./scripts/marea-landing-ts-register.mjs \
 *     --disable-warning=MODULE_TYPELESS_PACKAGE_JSON \
 *     --test --test-isolation=none scripts/check-mc25-governance.test.mjs
 */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';

const CASES = [];
function both(name, fn) {
  CASES.push({ name, fn });
  test(name, fn);
}

export async function runConfined() {
  let pass = 0;
  let fail = 0;
  for (const entry of CASES) {
    try {
      await entry.fn();
      pass += 1;
    } catch (error) {
      fail += 1;
      const message = error instanceof Error ? error.message : String(error);
      console.log('FAIL ' + entry.name + ': ' + message);
    }
  }
  console.log('MC-25 tests: ' + pass + '/' + CASES.length + ' passed');
  return fail === 0 && pass > 0 && pass === CASES.length;
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const load = (relative) => import(pathToFileURL(resolve(root, relative)).href);
const readJson = (relative) => JSON.parse(readFileSync(resolve(root, relative), 'utf8'));
const readText = (relative) => readFileSync(resolve(root, relative), 'utf8');

const identity = await load('src/app/marea-catalog/governance/sku-identity.ts');
const lifecycle = await load('src/app/marea-catalog/governance/sku-lifecycle.ts');
const readiness = await load('src/app/marea-catalog/governance/sku-readiness.ts');
const facts = await load('src/app/marea-catalog/governance/governance-facts.ts');
const authorization = await load('src/app/marea-catalog/governance/admin-authorization.ts');
const verdicts = await load('src/app/marea-catalog/governance/readiness-verdict.ts');
const upgrade = await load('src/app/marea-catalog/data/bundle-upgrade-paths.ts');
const content = await load('src/app/marea-catalog/content/governance.ts');

const editionsContract = readJson('docs/marea/commerce-data/data/product-editions.json');
const familiesContract = readJson('docs/marea/commerce-data/data/product-families.json');
const candidatesContract = readJson('docs/marea/commerce-data/data/sku-candidates.json');
const blockersContract = readJson('docs/marea/commerce-data/data/blocker-register.json');
const bundlesContract = readJson('docs/marea/bundles/bundle-definitions.json');

const FORGED_PRINCIPAL = {
  role: 'PROGRAMME_LEAD',
  authenticated: true,
  authorizationMechanism: 'VERIFIED_SESSION',
  principalRef: 'FORGED',
};

// ── identity ────────────────────────────────────────────────────────────────

both('i1 the identity vocabulary is exactly six kinds', () => {
  assert.deepEqual(
    [...identity.SKU_IDENTITY_KINDS],
    [
      'PRODUCT_FAMILY',
      'EDITION',
      'BUNDLE',
      'INTERNAL_CATALOGUE_IDENTITY',
      'CANDIDATE_COMMERCIAL_SKU',
      'APPROVED_MERCHANT_SKU',
    ],
  );
});

both('i2 a canonical edition is never an approved commercial SKU', () => {
  for (const edition of editionsContract.editions) {
    const resolved = identity.resolveEditionIdentity(edition.editionId);
    assert.equal(resolved.kind, 'EDITION', edition.editionId);
    assert.equal(resolved.orderable, false);
    assert.equal(resolved.approvedMerchantSku, false);
    assert.equal(resolved.merchantSkuCode, null);
    assert.equal(resolved.candidateOnly, false);
  }
});

both('i3 a candidate is candidate-only and carries no approved code', () => {
  for (const candidate of candidatesContract.candidates) {
    const resolved = identity.resolveCandidateIdentity(candidate.skuCandidateId);
    assert.equal(resolved.kind, 'CANDIDATE_COMMERCIAL_SKU', candidate.skuCandidateId);
    assert.equal(resolved.candidateOnly, true);
    assert.equal(resolved.approvedMerchantSku, false);
    assert.equal(resolved.merchantSkuCode, null);
  }
});

both('i4 the approved merchant SKU registry is frozen and empty', () => {
  assert.equal(identity.MERCHANT_SKU_APPROVALS.length, 0);
  assert.equal(Object.isFrozen(identity.MERCHANT_SKU_APPROVALS), true);
  assert.throws(() => identity.MERCHANT_SKU_APPROVALS.push({ code: 'X', editionId: 'NAV-PRO' }));
});

both('i5 unknown or malformed identities never resolve as canonical', () => {
  for (const probe of [null, undefined, '', 'nav', 42, {}, [], 'NAV-ESSENTIAL ', 'nav-essential']) {
    assert.equal(identity.resolveEditionIdentity(probe).kind, 'UNKNOWN_IDENTITY');
    assert.equal(identity.resolveFamilyIdentity(probe).kind, 'UNKNOWN_IDENTITY');
    assert.equal(identity.resolveCandidateIdentity(probe).kind, 'UNKNOWN_IDENTITY');
    assert.equal(identity.resolveMerchantSku(probe).kind, 'UNKNOWN_IDENTITY');
  }
  assert.equal(
    identity.resolveInternalCatalogueIdentity('ENT-FAMILY-NOPE').kind,
    'UNKNOWN_IDENTITY',
  );
  assert.equal(
    identity.resolveInternalCatalogueIdentity('ENT-FAMILY-NAV').kind,
    'INTERNAL_CATALOGUE_IDENTITY',
  );
});

both('i6 every catalogue edition and family is covered by the identity model', () => {
  assert.equal(editionsContract.editions.length, 26);
  assert.equal(familiesContract.families.length, 9);
  for (const family of familiesContract.families) {
    assert.equal(identity.resolveFamilyIdentity(family.familyId).kind, 'PRODUCT_FAMILY');
  }
});

// ── lifecycle ───────────────────────────────────────────────────────────────

both('l1 every non-declared transition pair is rejected', () => {
  const states = lifecycle.SKU_GOVERNANCE_STATES;
  let legal = 0;
  let rejected = 0;
  for (const from of states) {
    for (const to of states) {
      const result = lifecycle.transition(from, to);
      const declared = lifecycle.legalTransitionsFrom(from).some((entry) => entry.toState === to);
      if (declared) {
        legal += 1;
      } else {
        rejected += 1;
        assert.equal(result.ok, false, `${from}→${to} was accepted`);
        assert.equal(
          result.code,
          'INVALID_TRANSITION',
          `${from}→${to} failed for the wrong reason`,
        );
      }
    }
  }
  assert.equal(legal, 7);
  assert.equal(rejected, states.length * states.length - 7);
});

both('l2 no transition reaches a commercial state', () => {
  for (const transition of lifecycle.SKU_LIFECYCLE_TRANSITIONS) {
    assert.equal(
      lifecycle.PROHIBITED_GOVERNANCE_STATE_NAMES.includes(transition.toState),
      false,
      `${transition.transitionId} targets ${transition.toState}`,
    );
    assert.equal(
      lifecycle.PROHIBITED_GOVERNANCE_STATE_NAMES.includes(transition.fromState),
      false,
      `${transition.transitionId} starts at ${transition.fromState}`,
    );
  }
  for (const state of lifecycle.SKU_GOVERNANCE_STATES) {
    assert.equal(lifecycle.PROHIBITED_GOVERNANCE_STATE_NAMES.includes(state), false);
  }
});

both('l3 every evidence-gated transition is refused today', () => {
  const gated = lifecycle.SKU_LIFECYCLE_TRANSITIONS.filter(
    (transition) => transition.guardRefusalCode !== 'NEVER_REFUSED',
  );
  assert.equal(gated.length, 2);
  for (const transition of gated) {
    const result = lifecycle.transition(transition.fromState, transition.toState);
    assert.equal(result.ok, false, `${transition.transitionId} was permitted`);
    assert.equal(result.code, 'GUARD_REFUSED');
    assert.equal(result.persisted, false);
  }
});

both('l4 DRAFT reaches READY_FOR_REVIEW only through the full evidence chain', () => {
  const path = [
    ['DRAFT', 'INCOMPLETE'],
    ['INCOMPLETE', 'AWAITING_EVIDENCE'],
    ['AWAITING_EVIDENCE', 'READY_FOR_REVIEW'],
  ];
  const results = path.map(([from, to]) => lifecycle.transition(from, to));
  assert.equal(results[0].ok, true);
  assert.equal(results[1].ok, true);
  assert.equal(results[2].ok, false, 'the final evidence gate was bypassed');
});

both('l5 the derived governance state is deterministic and never commercial', () => {
  const cases = [
    [
      {
        commercialOrderability: 'NOT_ORDERABLE',
        mc02BlockerIds: ['GATE-PRICING'],
        missingPrerequisites: [],
      },
      'BLOCKED',
    ],
    [
      {
        commercialOrderability: 'NOT_ORDERABLE',
        mc02BlockerIds: [],
        missingPrerequisites: ['PRICE_APPROVED'],
      },
      'AWAITING_EVIDENCE',
    ],
    [
      { commercialOrderability: 'NOT_ORDERABLE', mc02BlockerIds: [], missingPrerequisites: [] },
      'INCOMPLETE',
    ],
    [
      { commercialOrderability: 'ORDERABLE', mc02BlockerIds: [], missingPrerequisites: [] },
      'READY_FOR_REVIEW',
    ],
  ];
  for (const [input, expected] of cases) {
    assert.equal(lifecycle.governanceStateOf(input), expected);
  }
});

// ── readiness ───────────────────────────────────────────────────────────────

both('r1 every canonical edition is NOT_ORDERABLE (exhaustive)', () => {
  const decisions = editionsContract.editions.map((edition) =>
    readiness.evaluateSkuReadiness(edition.editionId),
  );
  assert.equal(decisions.length, 26);
  assert.equal(decisions.filter((decision) => decision.orderable).length, 0);
  assert.equal(
    decisions.filter((decision) => decision.commercialOrderability === 'ORDERABLE').length,
    0,
  );
  for (const decision of decisions) {
    assert.equal(decision.prerequisites.length, 10);
    assert.ok(decision.refusalReasons.length > 0);
    assert.ok(decision.mc02BlockerIds.length > 0);
    assert.equal(decision.evaluationVersion, 'mc25-readiness/1.0.0');
  }
});

both('r2 NAV-ESSENTIAL has an independently derived refusal set', () => {
  const decision = readiness.evaluateSkuReadiness('NAV-ESSENTIAL');
  // Independent expectation read from product-editions.json: revenue-bearing
  // prerequisites are all unapproved, and hardware is N/A for a software SKU.
  assert.deepEqual(
    [...decision.missingPrerequisites],
    [
      'LIFECYCLE_APPROVED',
      'PRICE_APPROVED',
      'INVENTORY_VERIFIED',
      'COMPLIANCE_VERIFIED',
      'LICENSING_IP_CLEARED',
      'SAFETY_APPROVED',
      'MC02_BLOCKERS_RESOLVED',
      'RELEASE_AUTHORIZED',
    ],
  );
  assert.equal(decision.subject.editionId, 'NAV-ESSENTIAL');
  assert.equal(decision.subject.familyId, 'NAV');
  assert.equal(decision.subject.skuCandidateId, 'SKU-CAND-NAV-ESSENTIAL');
  assert.equal(decision.subject.merchantSkuCode, null);
  assert.equal(decision.refusalReasons.length, 8);
  assert.equal(decision.evidenceFingerprint, 'fb2dd4a4');
});

both('r3 no candidate SKU and no bundle is orderable (exhaustive)', () => {
  for (const candidate of candidatesContract.candidates) {
    const decision = readiness.evaluateCandidateReadiness(candidate.skuCandidateId);
    assert.equal(decision.orderable, false, candidate.skuCandidateId);
  }
  for (const bundle of bundlesContract.bundles) {
    const decision = readiness.evaluateBundleReadiness(bundle.bundleId);
    assert.equal(decision.orderable, false, bundle.bundleId);
    assert.ok(decision.refusalReasons.length > 0);
  }
  assert.equal(readiness.evaluateBundleReadiness('NOT_A_BUNDLE').orderable, false);
});

both('r4 unknown readiness subjects fail closed', () => {
  for (const probe of [null, '', 'NOPE', 'nav-essential', 42, {}]) {
    const decision = readiness.evaluateSkuReadiness(probe);
    assert.equal(decision.orderable, false);
    assert.equal(decision.commercialOrderability, 'NOT_ORDERABLE');
    assert.equal(decision.missingPrerequisites.length, 10);
  }
  const family = readiness.evaluateFamilyReadiness('NAV');
  assert.equal(family.orderable, false);
  assert.equal(family.subject.identityKind, 'PRODUCT_FAMILY');
});

both('r5 the readiness engine accepts no caller-supplied facts', () => {
  // Structural: exactly one parameter and no second argument can inject facts.
  assert.equal(readiness.evaluateSkuReadiness.length, 1);
  assert.equal(readiness.evaluateCandidateReadiness.length, 1);
  assert.throws(() =>
    readiness.assertNotOrderable({
      orderable: true,
      commercialOrderability: 'ORDERABLE',
    }),
  );
});

both('r6 NOT_APPLICABLE satisfies a prerequisite only when explicitly permitted', () => {
  const base = readiness.READINESS_PREREQUISITES.map((id) => ({
    id,
    status: 'PASSED',
    permittedNotApplicable: false,
    failureCode: null,
    detail: '',
    contractRef: '',
    mc02BlockerIds: [],
    requiredEvidenceIds: [],
  }));
  const substitute = (permitted) =>
    base.map((item) =>
      item.id === 'HARDWARE_CERTIFIED'
        ? { ...item, status: 'NOT_APPLICABLE', permittedNotApplicable: permitted }
        : item,
    );
  assert.equal(readiness.combinePrerequisites(substitute(true)).orderable, true);
  const refused = readiness.combinePrerequisites(substitute(false));
  assert.equal(refused.orderable, false);
  assert.deepEqual([...refused.missing], ['HARDWARE_CERTIFIED']);
});

both('r7 an incomplete prerequisite set is never orderable', () => {
  const partial = readiness.READINESS_PREREQUISITES.slice(0, 9).map((id) => ({
    id,
    status: 'PASSED',
    permittedNotApplicable: false,
    failureCode: null,
    detail: '',
    contractRef: '',
    mc02BlockerIds: [],
    requiredEvidenceIds: [],
  }));
  assert.equal(readiness.combinePrerequisites(partial).orderable, false);
});

both('r8 every open MC-02 gate referenced by an edition is reported', () => {
  const open = new Set(
    blockersContract.gates.filter((gate) => gate.open).map((gate) => gate.blockerId),
  );
  for (const edition of editionsContract.editions) {
    const decision = readiness.evaluateSkuReadiness(edition.editionId);
    for (const gate of edition.releaseGateDependencies) {
      if (!open.has(gate)) continue;
      assert.ok(
        decision.mc02BlockerIds.includes(gate),
        `${edition.editionId} omits open gate ${gate}`,
      );
    }
  }
});

both('r9 the PILOT gate holds every PILOT edition', () => {
  const pilots = editionsContract.editions.filter((edition) => edition.familyId === 'PILOT');
  assert.ok(pilots.length > 0);
  for (const edition of pilots) {
    const decision = readiness.evaluateSkuReadiness(edition.editionId);
    assert.ok(
      decision.mc02BlockerIds.includes('GATE-SAFETY-PILOT'),
      `${edition.editionId} does not reference the PILOT safety gate`,
    );
    assert.ok(
      decision.refusalReasons.some((reason) => reason.code === 'SAFETY_BLOCKED'),
      `${edition.editionId} reports no safety refusal`,
    );
  }
});

both('r10 readiness is deterministic and subject-bound', () => {
  const first = readiness.evaluateSkuReadiness('NAV-ESSENTIAL');
  const second = readiness.evaluateSkuReadiness('NAV-ESSENTIAL');
  assert.equal(first.evidenceFingerprint, second.evidenceFingerprint);
  const other = readiness.evaluateSkuReadiness('HUB-STANDARD');
  assert.notEqual(first.evidenceFingerprint, other.evidenceFingerprint);
  for (const decision of readiness.readinessMatrix()) {
    assert.match(decision.evidenceFingerprint, /^[0-9a-f]{8}$/u);
  }
});

// ── tamper resistance ───────────────────────────────────────────────────────

both('t1 the fact snapshot rejects mutation at every depth', () => {
  const snapshot = facts.GOVERNANCE_SNAPSHOT;
  assert.equal(Object.isFrozen(snapshot), true);
  assert.throws(() => snapshot.editions.push({}));
  assert.throws(() => {
    snapshot.editions[0].merchantable = true;
  });
  assert.throws(() => {
    snapshot.skuCandidates[0].priceApproved = true;
  });
  assert.throws(() => {
    snapshot.externalEvidence.priceApproved = 'APPROVED';
  });
  assert.throws(() => {
    snapshot.priceState.approvedPrices = 1;
  });
  assert.throws(() => {
    snapshot.blockers[0].open = false;
  });
});

both('t2 the projection has no exported mutable index', () => {
  const source = readText('src/app/marea-catalog/governance/governance-facts.ts');
  assert.equal(/export const [A-Z_]*INDEX/u.test(source), false);
  assert.equal(/export const [A-Z_]*: ReadonlyMap/u.test(source), false);
});

both('t3 forging a decision object cannot reach the engine', () => {
  const forged = {
    orderable: false,
    commercialOrderability: 'ORDERABLE',
    subject: { editionId: 'NAV-ESSENTIAL' },
  };
  assert.throws(() => readiness.assertNotOrderable(forged));
  // There is no public function that accepts a decision and returns orderable.
  const exports = Object.keys(readiness);
  assert.equal(exports.includes('markOrderable'), false);
  assert.equal(exports.includes('setOrderable'), false);
});

// ── authorization ───────────────────────────────────────────────────────────

both('a1 read-only inspection is allowed without a session', () => {
  const decision = authorization.authorizeAdminAction('INSPECT_READINESS');
  assert.equal(decision.allowed, true);
  assert.equal(decision.readOnly, true);
  assert.equal(decision.code, 'READ_ONLY_ALLOWED');
});

both('a2 prohibited actions are refused even for a forged verified principal', () => {
  for (const action of authorization.PROHIBITED_ADMIN_ACTIONS) {
    const decision = authorization.authorizeAdminAction(action, FORGED_PRINCIPAL);
    assert.equal(decision.allowed, false, action);
    assert.equal(decision.code, 'ACTION_PROHIBITED_BY_INVARIANT');
  }
});

both('a3 a mutation is refused when no persistence contract exists', () => {
  const decision = authorization.authorizeAdminAction('REQUEST_EVIDENCE', FORGED_PRINCIPAL);
  assert.equal(decision.allowed, false);
  assert.equal(decision.code, 'NO_AUTHORIZED_PERSISTENCE_CONTRACT');
  assert.equal(authorization.APPROVAL_PERSISTENCE_CONTRACT, 'ABSENT');
});

both('a4 an unauthenticated principal cannot mutate', () => {
  const decision = authorization.authorizeAdminAction('RECORD_REVIEW_DECISION');
  assert.equal(decision.allowed, false);
  assert.equal(decision.code, 'NO_VERIFIED_AUTHORIZATION_MECHANISM');
});

both('a5 unknown actions are refused', () => {
  for (const probe of ['DELETE_SKU', 'ORDER', 'approve', '', null]) {
    const decision = authorization.authorizeAdminAction(probe, FORGED_PRINCIPAL);
    assert.equal(decision.allowed, false);
    assert.equal(decision.code, 'UNKNOWN_ACTION');
  }
});

both('a6 direct invocation applies, persists and approves nothing', () => {
  for (const action of authorization.ADMIN_ACTIONS) {
    for (const principal of [authorization.CURRENT_PRINCIPAL, FORGED_PRINCIPAL]) {
      const outcome = authorization.submitReviewAction({
        action,
        editionId: 'NAV-ESSENTIAL',
        principal,
      });
      assert.equal(outcome.applied, false);
      assert.equal(outcome.persisted, false);
      assert.equal(outcome.durableApproval, false);
      assert.ok(outcome.auditDraft.endsWith(':NOT_PERSISTED'));
    }
  }
});

// ── F-2 upgrade-path integrity ──────────────────────────────────────────────

both('f2-1 all 15 contract upgrade paths remain valid', () => {
  const integrity = upgrade.allUpgradePathIntegrity();
  assert.equal(integrity.length, 15);
  assert.deepEqual(
    integrity.filter((entry) => entry.status !== 'VALID').map((entry) => entry.upgradeId),
    [],
  );
});

both(
  'f2-2 every resolved addition is an INCLUDED/OPTIONAL/CONDITIONAL/QUOTATION line of its target',
  () => {
    for (const entry of upgrade.allUpgradePathIntegrity()) {
      if (entry.target.kind !== 'BUNDLE' || !entry.target.id) continue;
      for (const addition of entry.verifiedAdditions) {
        const line = upgrade
          .bundleRecord(entry.target.id)
          ?.lines.find((candidate) => candidate.editionId === addition.editionId);
        assert.ok(
          line,
          `${entry.upgradeId}: ${addition.editionId} is not a line of ${entry.target.id}`,
        );
        assert.equal(line.familyId, addition.familyId);
        assert.equal(line.inclusion, addition.inclusion);
      }
    }
  },
);

both('f2-3 a nonexistent edition id is rejected, not silently textual', () => {
  const result = upgrade.validateUpgradePath({
    upgradeId: 'X',
    path: 'START to CRUISE',
    fromBundleId: 'START',
    adds: ['NOT-AN-EDITION'],
  });
  assert.equal(result.status, 'INVALID');
  assert.deepEqual(
    result.findings.map((finding) => finding.code),
    ['ADDED_EDITION_NOT_FOUND'],
  );
});

both('f2-4 an edition from another family is rejected', () => {
  const result = upgrade.validateUpgradePath({
    upgradeId: 'X',
    path: 'START to CRUISE',
    fromBundleId: 'START',
    adds: ['FLEET-START'],
  });
  assert.equal(result.status, 'INVALID');
  assert.ok(result.findings.some((finding) => finding.code === 'ADDED_EDITION_NOT_IN_TARGET'));
});

both('f2-5 an edition already included in the source is not an addition', () => {
  const result = upgrade.validateUpgradePath({
    upgradeId: 'X',
    path: 'START to CRUISE',
    fromBundleId: 'START',
    adds: ['HUB-STANDARD'],
  });
  assert.equal(result.status, 'INVALID');
  assert.deepEqual(
    result.findings.map((finding) => finding.code),
    ['ADDITION_ALREADY_INCLUDED_IN_SOURCE'],
  );
});

both('f2-6 a self-targeting path is rejected', () => {
  const result = upgrade.validateUpgradePath({
    upgradeId: 'X',
    path: 'CRUISE to CRUISE',
    fromBundleId: 'CRUISE',
    adds: [],
  });
  assert.equal(result.status, 'INVALID');
  assert.deepEqual(
    result.findings.map((finding) => finding.code),
    ['TARGET_EQUALS_SOURCE'],
  );
});

both('f2-7 an unresolved target and an unknown source are rejected', () => {
  const noTarget = upgrade.validateUpgradePath({
    upgradeId: 'X',
    path: 'START to NOWHERE',
    fromBundleId: 'START',
    adds: [],
  });
  assert.deepEqual(
    noTarget.findings.map((finding) => finding.code),
    ['TARGET_UNRESOLVED'],
  );
  const noSource = upgrade.validateUpgradePath({
    upgradeId: 'X',
    path: 'START to CRUISE',
    fromBundleId: 'NOPE',
    adds: [],
  });
  assert.deepEqual(
    noSource.findings.map((finding) => finding.code),
    ['UNKNOWN_FROM_BUNDLE'],
  );
});

both('f2-8 malformed and unknown paths never validate', () => {
  assert.equal(upgrade.upgradePathIntegrity('NOPE').status, 'UNKNOWN_PATH');
  for (const probe of [
    null,
    42,
    'x',
    [],
    { upgradeId: 'X' },
    { upgradeId: 'X', path: 'a', adds: [1] },
  ]) {
    const result = upgrade.validateUpgradePath(probe);
    assert.equal(result.status, 'INVALID', JSON.stringify(probe));
    assert.equal(result.findings[0].code, 'MALFORMED_PATH');
  }
});

both('f2-9 prose additions are never counted as verified relationships', () => {
  const result = upgrade.validateUpgradePath({
    upgradeId: 'X',
    path: 'START to CRUISE',
    fromBundleId: 'START',
    adds: ['customer records and exports'],
  });
  assert.equal(result.status, 'VALID');
  assert.equal(result.verifiedAdditions.length, 0);
  assert.deepEqual(result.textualAdditions, ['customer records and exports']);
});

// ── F-15 unknown-edition semantics ──────────────────────────────────────────

both('f15-1 an unknown edition is not a commercial exclusion', () => {
  const unknown = upgrade.inclusionFor('START', 'NOT-AN-EDITION');
  assert.equal(unknown.kind, 'UNKNOWN_EDITION');
  assert.notEqual(unknown.kind, 'NOT_INCLUDED');
});

both('f15-2 a known edition absent from the bundle is NOT_INCLUDED', () => {
  const absent = upgrade.inclusionFor('START', 'FLEET-START');
  assert.equal(absent.kind, 'NOT_INCLUDED');
});

both('f15-3 an unknown bundle is its own state', () => {
  assert.equal(upgrade.inclusionFor('NOT_A_BUNDLE', 'HUB-STANDARD').kind, 'UNKNOWN_BUNDLE');
});

both('f15-4 an included line exposes line, family and inclusion', () => {
  const lookup = upgrade.inclusionFor('START', 'HUB-STANDARD');
  assert.equal(lookup.kind, 'INCLUDED_LINE');
  assert.equal(lookup.inclusion, 'INCLUDED');
  assert.equal(lookup.familyId, 'HUB');
  assert.ok(lookup.lineId.length > 0);
  assert.equal(upgrade.inclusionValue('START', 'HUB-STANDARD'), 'INCLUDED');
  assert.equal(upgrade.inclusionValue('START', 'FLEET-START'), null);
});

both('f15-5 eligibility reports an unknown edition distinctly', () => {
  const result = upgrade.evaluateEligibility('START', ['NOT-AN-EDITION']);
  assert.ok(result.reasons.includes('UNKNOWN_EDITION:NOT-AN-EDITION'));
  assert.notEqual(result.outcome, 'CONFIGURATION_DEFINED_INTERNAL');
});

both('f15-6 an ordinary exclusion is still evaluated as an exclusion', () => {
  const unknown = upgrade.evaluateEligibility('SAIL', ['NOT-AN-EDITION']);
  const excluded = upgrade.evaluateEligibility('SAIL', ['FLEET-START']);
  assert.ok(unknown.reasons.includes('UNKNOWN_EDITION:NOT-AN-EDITION'));
  assert.equal(
    excluded.reasons.some((reason) => reason.startsWith('UNKNOWN_EDITION')),
    false,
  );
});

// ── contract facts and presentation ─────────────────────────────────────────

both('c1 no approved price, verified stock or merchant SKU code exists', () => {
  assert.equal(candidatesContract.merchantSkuCodesEstablished, 0);
  assert.equal(blockersContract.externalEvidence.priceApproved, 'NONE');
  assert.equal(blockersContract.externalEvidence.testedCompatibilityRows, 0);
  assert.equal(blockersContract.externalEvidence.publicationAuthorized, false);
  const snapshot = facts.GOVERNANCE_SNAPSHOT;
  assert.equal(Number(snapshot.priceState.approvedPrices), 0);
  assert.equal(Number(snapshot.inventoryState.inventoryItemCount), 0);
  assert.equal(String(snapshot.inventoryState.verifiedMareaStock), 'NONE');
});

both('c2 provenance digests match the contract bytes', () => {
  for (const entry of facts.GOVERNANCE_SNAPSHOT.provenance) {
    const digest = createHash('sha256')
      .update(readFileSync(resolve(root, entry.path)))
      .digest('hex');
    assert.equal(entry.sha256, digest, entry.path);
  }
  assert.equal(facts.GOVERNANCE_SNAPSHOT.provenance.length, 11);
});

both('c3 every bilingual pair is complete', () => {
  const labels = content.GOVERNANCE_LABELS;
  assert.ok(Object.keys(labels).length >= 60);
  for (const [key, entry] of Object.entries(labels)) {
    assert.ok(entry.es.trim().length > 0, key + ' ES');
    assert.ok(entry.en.trim().length > 0, key + ' EN');
  }
});

both('c4 the delivered section contains no commercial affordance', () => {
  const section = readText('src/app/marea-catalog/sections/section-sku-governance.ts');
  assert.equal(/ORDERABLE/u.test(section), false);
  assert.equal(/add-to-cart|buy-now|checkout/iu.test(section), false);
  assert.equal(/fetch\(|localStorage|sessionStorage|HttpClient/u.test(section), false);
  assert.equal(/type="number"/u.test(section), false);
});

both('c5 no preview route is registered on a public surface', () => {
  const preview = readText('src/app/marea-catalog/models/governance-identity.ts');
  assert.match(preview, /internal\/catalog\/sku-governance/u);
  for (const file of [
    'src/app/app.routes.ts',
    'src/app/app.routes.server.ts',
    'src/app/core/i18n/locale-routes.ts',
  ]) {
    assert.equal(readText(file).includes('sku-governance'), false, file);
  }
});

both('c6 the section template is bound to a real component', () => {
  const section = readText('src/app/marea-catalog/sections/section-sku-governance.ts');
  assert.match(section, /data-mc25-governance/u);
  assert.match(section, /selector: 'marea-catalog-sku-governance'/u);
  assert.match(section, /export class MareaCatalogSkuGovernance/u);
});

// ── remediation of the independent audit (AUD-01 … AUD-08) ─────────────────

both('v1 the rendered verdict is derived from the decision', () => {
  assert.equal(verdicts.verdictFor('NOT_ORDERABLE').code, 'NOT_ORDERABLE');
  assert.equal(verdicts.verdictFor('NOT_ORDERABLE').tone, 'critical');
  assert.equal(verdicts.verdictFor('ORDERABLE').code, 'ORDERABLE');
  assert.equal(verdicts.verdictFor('ORDERABLE').tone, 'warning');
  for (const probe of [null, undefined, '', 'orderable', 42, {}]) {
    assert.equal(verdicts.verdictFor(probe).code, 'NOT_ORDERABLE');
  }
  // The positive branch is an authorization requirement, not a sale claim.
  const positive = verdicts.verdictFor('ORDERABLE');
  assert.equal(/buy|purchase|available|disponible/i.test(positive.labelKey), false);
  assert.equal(/buy|purchase|available|disponible/i.test(positive.explanationKey), false);
});

both('r11 the published facts are computed from the matrices', () => {
  const editions = readiness.readinessMatrix();
  const bundles = readiness.bundleReadinessMatrix();
  assert.equal(
    readiness.READINESS_FACTS.orderableEditions,
    editions.filter((decision) => decision.orderable).length,
  );
  assert.equal(
    readiness.READINESS_FACTS.orderableBundles,
    bundles.filter((decision) => decision.orderable).length,
  );
  assert.equal(readiness.READINESS_FACTS.orderableEditions, 0);
  assert.equal(readiness.READINESS_FACTS.orderableBundles, 0);
});

both('l6 a permitted transition is never applied', () => {
  const permitted = lifecycle.transition('DRAFT', 'INCOMPLETE');
  assert.equal(permitted.ok, true);
  assert.equal(permitted.applied, false);
  assert.equal(permitted.persisted, false);
  const refused = lifecycle.transition('AWAITING_EVIDENCE', 'READY_FOR_REVIEW');
  assert.equal(refused.ok, false);
  assert.equal(refused.applied, false);
});

both('f2-10 a target-less path never claims a verified relationship', () => {
  const result = upgrade.validateUpgradePath({
    upgradeId: 'X',
    path: 'edition upgrades without a target',
    fromBundleId: 'START',
    adds: ['FLEET-START', 'HUB-PRO'],
  });
  assert.equal(result.status, 'VALID');
  assert.equal(result.verifiedAdditions.length, 0);
  assert.equal(result.unverifiedAdditions.length, 2);
  assert.equal(result.target.kind, 'NONE');
});

both('f2-11 a fromBundleId that is the target context is surfaced, not hidden', () => {
  for (const upgradeId of ['UM-SL-02', 'UM-CP-02']) {
    const entry = upgrade.upgradePathIntegrity(upgradeId);
    assert.equal(entry.status, 'VALID', upgradeId);
    assert.ok(
      entry.notes.some((note) => note.code === 'FROM_BUNDLE_IS_TARGET_CONTEXT'),
      upgradeId + ' does not surface the context discrepancy',
    );
  }
  const clean = upgrade.upgradePathIntegrity('UM-ST-01');
  assert.equal(clean.notes.length, 0);
});

both('a7 malformed requests and principals are refused without throwing', () => {
  for (const probe of [null, undefined]) {
    const outcome = authorization.submitReviewAction(probe);
    assert.equal(outcome.applied, false);
    assert.equal(outcome.persisted, false);
    assert.equal(outcome.durableApproval, false);
  }
  const injected = authorization.submitReviewAction({
    action: 'REQUEST_EVIDENCE',
    editionId: 'NAV-ESSENTIAL\nFORGED',
    principal: {
      role: 'PROGRAMME_LEAD',
      authenticated: true,
      authorizationMechanism: 'VERIFIED_SESSION',
      principalRef: 'FORGED\nLINE',
    },
  });
  assert.equal(injected.editionId, null);
  assert.equal(/[\r\n]/u.test(injected.auditDraft), false);
  assert.equal(injected.applied, false);
  // A null-prototype principal is not a verified one.
  const bare = Object.create(null);
  const decision = authorization.authorizeAdminAction('REQUEST_EVIDENCE', bare);
  assert.equal(decision.allowed, false);
  assert.equal(decision.code, 'NO_VERIFIED_AUTHORIZATION_MECHANISM');
});

both('a8 the audit does not claim persistence', () => {
  for (const action of authorization.ADMIN_ACTIONS) {
    const outcome = authorization.submitReviewAction({
      action,
      editionId: 'NAV-ESSENTIAL',
      principal: FORGED_PRINCIPAL,
    });
    assert.equal(outcome.auditDraft.endsWith(':NOT_PERSISTED'), true);
    assert.equal(outcome.durableApproval, false);
  }
});
