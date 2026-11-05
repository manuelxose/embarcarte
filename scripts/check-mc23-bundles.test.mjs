/**
 * MC-23 bundle domain tests.
 *
 * These assert the DOMAIN, not just the claim guard: the earlier revision of
 * this suite only exercised catalogClaimProblems and two tautologies, which the
 * independent review correctly called out as not testing the MC-23 logic.
 *
 * Every assertion below is derived from the MC-08 contract
 * (docs/marea/bundles/bundle-definitions.json), which is also the source the
 * data module is generated from.
 *
 * Run with:
 *   node --import ./scripts/marea-landing-ts-register.mjs \
 *     --disable-warning=MODULE_TYPELESS_PACKAGE_JSON \
 *     --test --test-isolation=none scripts/check-mc23-bundles.test.mjs
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { catalogClaimProblems } from './mc20-catalog-guards.mjs';
/**
 * ENGINE-03 runner entry point.
 *
 * node:test's run() cannot reuse this process's registered TypeScript loader in
 * this Node build, and the ACL sandbox forbids spawning `node --test`. The
 * assertions are therefore plain functions held in CASES: the `both()`
 * registration drives `node --test` locally, and runConfined() drives the SAME
 * functions in-process for the confined runner. A thrown assertion resolves
 * false, so the stage cannot pass while an assertion fails.
 */
const CASES = [];

/** Register a test with node:test AND record it for the in-process runner. */
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
  console.log('MC-23 tests: ' + pass + '/' + CASES.length + ' passed');
  return fail === 0 && pass > 0 && pass === CASES.length;
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contract = JSON.parse(readFileSync(resolve(root, 'docs/marea/bundles/bundle-definitions.json'), 'utf8'));

const domain = await import(
  pathToFileURL(resolve(root, 'src/app/marea-catalog/data/bundle-upgrade-paths.ts')).href
);

const BUNDLE_IDS = contract.bundles.map((bundle) => bundle.id);

// ── identity and contract fidelity ──────────────────────────────────────────
both('r0 bundle order and identity match the contract', () => {
  assert.deepEqual([...domain.BUNDLE_ORDER], BUNDLE_IDS);
  for (const id of BUNDLE_IDS) {
    assert.ok(domain.isBundleId(id), `${id} must be a canonical bundle id`);
    assert.ok(domain.bundleRecord(id), `${id} must have a record`);
  }
  assert.equal(domain.isBundleId('NOT_A_BUNDLE'), false);
});

both('r0 every bundle reports NOT_FOR_SALE and nothing is purchasable', () => {
  for (const id of BUNDLE_IDS) {
    const record = domain.bundleRecord(id);
    assert.equal(record.commercialAvailability, 'NOT_FOR_SALE', `${id} must be NOT_FOR_SALE`);
    assert.equal(domain.isPurchasable(id), false, `${id} must not be purchasable`);
  }
  assert.equal(domain.isPurchasable('NOT_A_BUNDLE'), false);
});

both('r0 no ORDERABLE outcome exists anywhere', () => {
  assert.equal(domain.CONFIGURATION_OUTCOMES.includes('ORDERABLE'), false);
  assert.equal(domain.isConfigurationOutcome('ORDERABLE'), false);
  for (const id of BUNDLE_IDS) {
    for (const outcome of domain.bundleRecord(id).outcomes) {
      assert.ok(domain.isConfigurationOutcome(outcome), `${id} outcome ${outcome} must be a contract outcome`);
    }
  }
});

// ── safety truth ────────────────────────────────────────────────────────────
both('r1 SAIL and COMPLETE stay BLOCKED by the PILOT safety gate', () => {
  for (const id of ['SAIL', 'COMPLETE']) {
    assert.equal(domain.isBlocked(id), true, `${id} must be blocked`);
    assert.ok(
      domain.blockingGates(id).includes('PILOT_SAFETY_GATE_BLOCKED'),
      `${id} must carry PILOT_SAFETY_GATE_BLOCKED`,
    );
  }
  assert.equal(domain.isBlocked('START'), false);
});

both('r1 FLEET stays not implemented with no established SLA', () => {
  assert.equal(domain.isServiceNotImplemented('FLEET'), true);
  assert.equal(domain.hasNoEstablishedSla('FLEET'), true);
  assert.equal(domain.isServiceNotImplemented('START'), false);
});

// ── fail-closed eligibility ─────────────────────────────────────────────────
both('r2 no input yields CONFIGURATION_DEFINED_INTERNAL or a permissive result', () => {
  const probes = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET', 'NOT_A_BUNDLE'];
  for (const id of probes) {
    for (const requested of [[], ['PILOT-PRO'], ['DISPLAY-LARGE-CONDITIONAL'], ['PILOT-COASTAL'], ['NAV-PRO']]) {
      const result = domain.evaluateEligibility(id, requested);
      assert.notEqual(
        result.outcome,
        'CONFIGURATION_DEFINED_INTERNAL',
        `${id} + ${JSON.stringify(requested)} must not reach CONFIGURATION_DEFINED_INTERNAL`,
      );
      assert.ok(
        domain.isConfigurationOutcome(result.outcome),
        `${id} outcome must be a contract outcome`,
      );
      const record = domain.bundleRecord(id);
      if (record) {
        assert.ok(
          record.outcomes.includes(result.outcome),
          `${id} outcome ${result.outcome} must be one the contract permits`,
        );
      }
    }
  }
});

both('r2 an unknown bundle is NOT_ELIGIBLE', () => {
  const result = domain.evaluateEligibility('NOT_A_BUNDLE');
  assert.equal(result.outcome, 'NOT_ELIGIBLE');
  assert.deepEqual([...result.reasons], ['UNKNOWN_BUNDLE']);
});

both('r2 an ineligible line is rejected', () => {
  assert.equal(domain.inclusionFor('SAIL', 'PILOT-PRO'), 'INELIGIBLE');
  assert.equal(domain.evaluateEligibility('SAIL', ['PILOT-PRO']).outcome, 'NOT_ELIGIBLE');
  assert.equal(domain.evaluateEligibility('COMPLETE', ['DISPLAY-LARGE-CONDITIONAL']).outcome, 'NOT_ELIGIBLE');
});

both('r2 inclusionFor on an unknown bundle is undefined, never "not included"', () => {
  assert.equal(domain.inclusionFor('NOT_A_BUNDLE', 'NAV-PRO'), undefined);
  assert.equal(domain.inclusionFor('START', 'NOT_AN_EDITION'), 'NOT_INCLUDED');
});

// ── determinism ─────────────────────────────────────────────────────────────
both('r3 comparison and upgrade paths are deterministic', () => {
  assert.deepEqual(domain.compareBundles('START', 'CRUISE'), domain.compareBundles('START', 'CRUISE'));
  assert.deepEqual(domain.upgradePaths(), domain.upgradePaths());
  assert.deepEqual(domain.upgradePaths('START'), domain.upgradePaths('START'));
});

both('r3 every upgrade path comes from the contract and composes correctly', () => {
  const contractPaths = contract.bundles.flatMap((bundle) => bundle.upgradeMigration ?? []);
  assert.equal(domain.UPGRADE_PATHS.length, contractPaths.length, 'all contract paths must be present');
  for (const path of domain.UPGRADE_PATHS) {
    const source = contractPaths.find((entry) => entry.id === path.upgradeId);
    assert.ok(source, `${path.upgradeId} must exist in the contract`);
    assert.deepEqual([...path.adds], source.adds ?? []);
    assert.deepEqual([...path.preserves], source.preserves ?? []);
    assert.equal(path.requiresNewQuotation, source.requiresNewQuotation);
  }
});

both('r3 the unsupported downgrade path is not offered as an upgrade', () => {
  assert.equal(domain.isSupportedUpgradePath('UM-CR-03'), false);
  assert.equal(domain.isSupportedUpgradePath('UM-ST-01'), true);
  assert.equal(domain.isSupportedUpgradePath('NOT_A_PATH'), false);
});

// ── claim guard: must reject ────────────────────────────────────────────────
both('r1 must-reject smuggled price strings', () => {
  for (const text of ['EUR 499', 'desde 499 EUR', 'precio 199 euros']) {
    assert.notDeepEqual(catalogClaimProblems(text), [], `must reject price in "${text}"`);
  }
});

both('r1 must-reject stock claims', () => {
  assert.notDeepEqual(catalogClaimProblems('en stock'), []);
});

both('r1 must-reject invented inclusion vocabulary', () => {
  const legal = [...domain.INCLUSION_VOCABULARY];
  assert.equal(legal.includes('PURCHASABLE'), false);
  assert.equal(legal.includes('ORDERABLE'), false);
  assert.equal(legal.length, 7);
});

// ── claim guard: must allow honest disclaimers ──────────────────────────────
both('r3 must-allow honest disclaimers', () => {
  for (const text of ['No se vende', 'no disponible para compra', 'not for sale', 'NOT_FOR_SALE']) {
    assert.deepEqual(catalogClaimProblems(text), [], `must allow honest disclaimer "${text}"`);
  }
});


