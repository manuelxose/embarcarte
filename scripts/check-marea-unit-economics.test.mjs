#!/usr/bin/env node
/**
 * MC-12 unit-economics validator — adversarial tests.
 *
 * Proves two things:
 *   1. the real in-memory dataset loaded from disk passes every contract check;
 *   2. every mandated check (S-01..S-05, V-01..V-18, A-01..A-14, R-01..R-08, D-01..D-04)
 *      fails when its invariant is violated, i.e. the validator is not a rubber stamp.
 *
 * Fixtures are in-memory clones of `loadFromDisk()`: no data file is ever written or mutated on
 * disk (MC12-DATA-CONTRACT.md §6/§7).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  CHECKS,
  FILES,
  GOVERNANCE_INVARIANTS,
  loadFromDisk,
  validate,
} from './check-marea-unit-economics.mjs';

/* ------------------------------------------------------------------ fixture */

const REAL = loadFromDisk();
const clone = (value) => JSON.parse(JSON.stringify(value));
const fresh = () => clone(REAL.data);

const ueRecords = (data) => data.unitEconomics.records;
const findUe = (data, id) => ueRecords(data).find((record) => record.id === id);
const findProvider = (data, id) => data.providers.records.find((record) => record.id === id);
const subscribers = (data) =>
  ueRecords(data).filter((record) => record.objectType === 'SUBSCRIPTION');

function checkById(data, id) {
  return validate(data).checks.find((check) => check.id === id);
}

/** The named check must reject the mutated clone, with at least one recorded violation. */
function expectFailure(id, mutate, note) {
  const data = fresh();
  mutate(data);
  const report = validate(data);
  const check = report.checks.find((entry) => entry.id === id);
  assert.ok(check, `check ${id} must exist in the catalogue`);
  assert.equal(check.status, 'FAIL', `${id} must reject: ${note}`);
  assert.ok(check.violations.length > 0, `${id} must record at least one violation`);
  assert.ok(report.failures.includes(id), `${id} must appear in report.failures`);
}

/** Remove a retention period from every string that mentions retention (R-08 negative fixture). */
function scrubRetentionPeriods(data) {
  const visit = (node) => {
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    if (!node || typeof node !== 'object') return;
    for (const key of Object.keys(node)) {
      const value = node[key];
      if (typeof value === 'string' && /retention/i.test(value)) {
        node[key] = value.replace(/\b\d+\s*[- ]?\s*(month|year|day)s?\b/gi, 'some period');
      } else {
        visit(value);
      }
    }
  };
  visit(data);
}

/* ------------------------------------------------------------- valid fixture */

test('valid fixture: the real dataset passes every contract check', () => {
  const report = validate(fresh());
  assert.equal(
    report.ok,
    true,
    `expected a clean run, failures: ${report.failures.join(', ')}\nviolations:\n${report.violations
      .slice(0, 20)
      .join('\n')}`,
  );
  assert.equal(report.counts.failed, 0);
  assert.equal(report.counts.total, CHECKS.length);
  assert.equal(report.violations.length, 0);
});

test('loadFromDisk: every required data file is present and parsed', () => {
  assert.deepEqual(REAL.missing, []);
  for (const [key, file] of Object.entries(FILES)) {
    assert.ok(REAL.data[key], `${file} must be loaded under ${key}`);
  }
  assert.ok(REAL.data._external.bundleDefinitions, 'bundle-definitions.json must be loaded');
  assert.ok(
    REAL.data._external.hardwareCostScenarios.scenarios.length === 90,
    'MC-11 cost scenarios must be loaded',
  );
  assert.ok(REAL.data._mc11Baseline.aggregateSha256, 'MC-11 baseline must be recomputed');
});

test('catalogue: every contract check id is implemented', () => {
  const expected = [
    ...['01', '02', '03', '04', '05'].map((n) => `S-${n}`),
    ...Array.from({ length: 18 }, (_, i) => `V-${String(i + 1).padStart(2, '0')}`),
    ...Array.from({ length: 14 }, (_, i) => `A-${String(i + 1).padStart(2, '0')}`),
    ...Array.from({ length: 8 }, (_, i) => `R-${String(i + 1).padStart(2, '0')}`),
    ...['01', '02', '03', '04'].map((n) => `D-${n}`),
  ];
  assert.deepEqual(
    CHECKS.map((check) => check.id),
    expected,
  );
  assert.equal(CHECKS.length, 49);
});

test('governance invariants: inherited states are frozen', () => {
  assert.deepEqual(GOVERNANCE_INVARIANTS, {
    MC10_VERDICT: 'BLOCKED',
    MC11_VERDICT: 'PARTIAL',
    CUSTOMER_EVIDENCE: 'NONE',
    CUSTOMER_WTP_VALIDATED: false,
    PRICE_APPROVED: 'NONE',
    COMMERCIAL_AVAILABILITY: 'NOT_FOR_SALE',
    TRADEMARK_LEGAL_CLEARANCE: 'NOT_GRANTED',
    SOURCE_IP_CLEARANCE: 'NOT_CLEARED',
    NMEA2000_CERTIFIED: false,
    PILOT_SAFETY_GATE: 'BLOCKED',
    AIS_TRANSMISSION_OFFERED: false,
    FLEET_DEFAULT_HARDWARE: false,
  });
});

/* ------------------------------------------------------------------ S checks */

test('S-01 rejects a missing required data file', () => {
  expectFailure('S-01', (data) => data._missing.push('unit-economics.json'), 'missing file');
});

test('S-02 rejects a duplicate record identifier', () => {
  expectFailure(
    'S-02',
    (data) => {
      data.assumptions.assumptions[1].id = data.assumptions.assumptions[0].id;
    },
    'duplicate assumption id (U-03)',
  );
});

test('S-03 rejects an unresolved cross-file reference', () => {
  expectFailure(
    'S-03',
    (data) => {
      data.bundleEconomics.records[0].componentEconomicIds[0] = 'UE-MISSING-RECORD';
    },
    'bundle component id does not resolve',
  );
});

test('S-04 rejects an observation that post-dates asOf', () => {
  expectFailure(
    'S-04',
    (data) => {
      data.providers.records[0].retrievedOn = '2027-01-01';
    },
    'future retrieval date',
  );
});

test('S-05 rejects an enum value outside the amended vocabulary', () => {
  expectFailure(
    'S-05',
    (data) => {
      data.providers.records[0].priceStatus = 'APPROVED';
    },
    'priceStatus outside the provider register vocabulary',
  );
});

/* ------------------------------------------------------------------ V checks */

test('V-01 rejects an approved price', () => {
  expectFailure(
    'V-01',
    (data) => {
      ueRecords(data)[0].revenue.priceStatus = 'APPROVED';
    },
    'approved selling price',
  );
});

test('V-02 rejects a for-sale commercial availability', () => {
  expectFailure(
    'V-02',
    (data) => {
      data.manifest.commercialAvailability = 'FOR_SALE';
    },
    'commercialAvailability not NOT_FOR_SALE',
  );
});

test('V-03 rejects a purchasable PILOT', () => {
  expectFailure(
    'V-03',
    (data) => {
      const pilot = findUe(data, 'UE-PILOT-COASTAL-100-BASE');
      pilot.classification = 'CONDITIONAL_ECONOMIC_CASE';
      pilot.objectType = 'SUBSCRIPTION';
    },
    'PILOT no longer safety-blocked / quotation package',
  );
});

test('V-04 rejects an AIS transmission offering', () => {
  expectFailure(
    'V-04',
    (data) => {
      data.licensingRights.note = 'MAREA offers AIS transmission on VHF.';
    },
    'AIS transmit capability claimed',
  );
});

test('V-05 rejects FLEET default hardware', () => {
  expectFailure(
    'V-05',
    (data) => {
      const fleet = data.bundleEconomics.records.find((record) => record.bundleId === 'FLEET');
      fleet.componentCosts.push({
        componentId: 'UE-HUB-HUB-STANDARD-100-BASE',
        knownVariableCostEur: 281.13,
        basis: 'invented hardware line',
      });
    },
    'FLEET bundle carries a hardware component cost',
  );
});

test('V-06 rejects a subscription gating local safety', () => {
  expectFailure(
    'V-06',
    (data) => {
      ueRecords(data)[0].gatesLocalSafety = true;
    },
    'gatesLocalSafety true',
  );
});

test('V-07 rejects a changed inherited milestone verdict', () => {
  expectFailure(
    'V-07',
    (data) => {
      data.manifest.statusBlock.MC11_VERDICT = 'PASS';
    },
    'MC-11 verdict changed from PARTIAL',
  );
});

test('V-08 rejects a validated willingness to pay', () => {
  expectFailure(
    'V-08',
    (data) => {
      data.unitEconomics.method.customerEvidence = 'VALIDATED';
    },
    'customer evidence no longer NONE',
  );
});

test('V-09 rejects a formal provider quotation', () => {
  expectFailure(
    'V-09',
    (data) => {
      data.providers.records[0].evidenceClass = 'FORMAL_PROVIDER_QUOTATION';
    },
    'formal quotation claimed with no supplier negotiation',
  );
});

test('V-10 rejects an unclassified cost input', () => {
  expectFailure(
    'V-10',
    (data) => {
      delete data.recurringCostInputs.inputs[0].costBehaviour;
    },
    'cost input without costBehaviour',
  );
});

test('V-11 rejects a numeric price without a source date', () => {
  expectFailure(
    'V-11',
    (data) => {
      data.providers.records[0].sourceUrl = null;
    },
    'numeric price without sourceUrl',
  );
});

test('V-12 rejects a published price labelled as a quotation', () => {
  expectFailure(
    'V-12',
    (data) => {
      const published = data.providers.records.find(
        (record) => record.priceStatus === 'PUBLISHED' && record.price > 0,
      );
      published.evidenceClass = 'FORMAL_PROVIDER_QUOTATION';
    },
    'non-zero PUBLISHED price with a quotation evidence class',
  );
});

test('V-13 rejects chart rights presented as granted', () => {
  expectFailure(
    'V-13',
    (data) => {
      data.providers.records[0].rightsGranted = true;
    },
    'rightsGranted true',
  );
});

test('V-14 rejects a free non-commercial tier marked production eligible', () => {
  expectFailure(
    'V-14',
    (data) => {
      findProvider(data, 'PE-CW-009').productionEligible = 'YES';
    },
    'private-use-only source marked productionEligible YES',
  );
});

test('V-15 rejects evidence older than 180 days', () => {
  expectFailure(
    'V-15',
    (data) => {
      data.providers.records[0].retrievedOn = '2025-06-01';
    },
    'stale evidence reused',
  );
});

test('V-16 rejects an unknown cost treated as zero', () => {
  expectFailure(
    'V-16',
    (data) => {
      const unknown = data.recurringCostInputs.inputs.find((input) => input.status === 'UNKNOWN');
      unknown.valueEur = 0;
    },
    'UNKNOWN input represented as numeric zero',
  );
});

test('V-17 rejects a material unknown cost hidden behind a complete status', () => {
  expectFailure(
    'V-17',
    (data) => {
      const complete = ueRecords(data).find(
        (record) => record.contributionStatus === 'COMPLETE_UNDER_LABELLED_ASSUMPTIONS',
      );
      complete.unknownVariableCostCategories.push({
        category: 'MISSED_MATERIAL_UNKNOWN',
        reason: 'material unknown added by the adversarial fixture',
        materiality: 'MATERIAL',
      });
    },
    'material unknown without INCOMPLETE_UNKNOWN_COSTS',
  );
});

test('V-18 rejects an economicsEvidenced count above zero', () => {
  expectFailure(
    'V-18',
    (data) => {
      data.unitEconomics.summary.economicsEvidenced = 1;
    },
    'evidenced economics claimed with material unknowns',
  );
});

/* ------------------------------------------------------------------ A checks */

test('A-01 rejects net revenue that ignores the VAT rate', () => {
  expectFailure(
    'A-01',
    (data) => {
      ueRecords(data)[0].revenue.netRevenueEur = 300;
    },
    'net revenue not gross/(1+VAT)',
  );
});

test('A-02 rejects arithmetic drift in the variable cost total', () => {
  expectFailure(
    'A-02',
    (data) => {
      ueRecords(data)[0].costLines[0].amountEur += 0.01;
    },
    'knownVariableCostEur no longer matches the lines',
  );
});

test('A-03 rejects contribution drift of 0.01 EUR', () => {
  expectFailure(
    'A-03',
    (data) => {
      ueRecords(data)[0].contributionBeforeUnknownsEur += 0.01;
    },
    'contribution not net - variable cost',
  );
});

test('A-04 rejects headroom drift of 0.01 EUR', () => {
  expectFailure(
    'A-04',
    (data) => {
      ueRecords(data)[0].headroomEur += 0.01;
    },
    'headroom not net - variable cost',
  );
});

test('A-05 rejects a wrong recurring annualisation factor', () => {
  expectFailure(
    'A-05',
    (data) => {
      subscribers(data)[0].revenue.periodsPerYear += 1;
    },
    'monthly gross no longer annualises over the declared periods',
  );
});

test('A-06 rejects bundle component cost drift', () => {
  expectFailure(
    'A-06',
    (data) => {
      data.bundleEconomics.records[0].componentCosts[0].knownVariableCostEur += 0.01;
    },
    'component cost no longer sums to the bundle total',
  );
});

test('A-06 rejects a missing required bundle component', () => {
  expectFailure(
    'A-06',
    (data) => {
      const start = data.bundleEconomics.records.find((bundle) => bundle.bundleId === 'START');
      start.componentEconomicIds = start.componentEconomicIds.filter(
        (componentId) => !componentId.includes('NAV'),
      );
    },
    'START loses its required NAV component',
  );
});

test('A-06 rejects a conditional-only component presented as included', () => {
  expectFailure(
    'A-06',
    (data) => {
      const start = data.bundleEconomics.records.find((bundle) => bundle.bundleId === 'START');
      start.componentEconomicIds.push('UE-SENSE-MODULE-100-BASE');
    },
    'SENSE is CONDITIONAL in START and cannot be a priced component',
  );
});

test('A-06 rejects an invented bundle component line', () => {
  expectFailure(
    'A-06',
    (data) => {
      const start = data.bundleEconomics.records.find((bundle) => bundle.bundleId === 'START');
      start.componentInclusions.push({
        lineId: 'ST-99',
        familyId: 'SENSE',
        inclusion: 'INCLUDED',
      });
    },
    'ST-99 is not in bundle-definitions.json',
  );
});

test('A-07 rejects a sensitivity result that ignores its factor', () => {
  expectFailure(
    'A-07',
    (data) => {
      data.sensitivity.scenarios[0].resultContributionBeforeUnknownsEur += 0.01;
    },
    'sensitivity result not recomputable from base record',
  );
});

test('A-08 rejects a decision-matrix weighted score drift', () => {
  expectFailure(
    'A-08',
    (data) => {
      data.decisionMatrix.families[0].weightedScore += 0.01;
    },
    'weightedScore not recomputed from weights and scores',
  );
});

test('A-09 rejects tampering one MC-11 scenario line', () => {
  expectFailure(
    'A-09',
    (data) => {
      const scenario = data._external.hardwareCostScenarios.scenarios.find(
        (item) => item.scenarioId === 'SCN-HUB-1-LOW',
      );
      scenario.lines[0].amountEur += 1;
    },
    'line sum no longer equals knownSubtotalEur',
  );
});

test('A-09 rejects a tooling double count', () => {
  expectFailure(
    'A-09',
    (data) => {
      const scenario = data._external.hardwareCostScenarios.scenarios.find(
        (item) => item.scenarioId === 'SCN-HUB-1-LOW',
      );
      scenario.toolingAmortizationEur += 9600;
    },
    'toolingAmortizationEur no longer equals the COST-16 line',
  );
});

test('A-09 rejects a failed reconciliation invariant', () => {
  expectFailure(
    'A-09',
    (data) => {
      data.hardwareCostReconciliation.invariant.result = 'FAIL';
    },
    'reconciliation invariant is not PASS',
  );
});

test('A-10 rejects COST-16 counted as a variable unit cost', () => {
  expectFailure(
    'A-10',
    (data) => {
      ueRecords(data)[0].costLines.push({
        id: 'COST-16-TEST',
        categoryId: 'COST-16',
        amountEur: 1,
        status: 'KNOWN',
        evidenceClass: 'ENGINEERING_ASSUMPTION',
        variable: true,
        notes: 'tooling forced into the variable cost',
      });
    },
    'COST-16 tooling appears as a variable line',
  );
});

test('A-11 rejects a fixed cost not flagged variable:false', () => {
  expectFailure(
    'A-11',
    (data) => {
      ueRecords(data)[0].costLines.push({
        id: 'FIXED-TEST',
        category: 'TOOLING_NRE_AMORTISATION',
        amountEur: 1,
        status: 'KNOWN',
        evidenceClass: 'ENGINEERING_ASSUMPTION',
        variable: true,
        notes: 'fixed cost marked variable',
      });
    },
    'tooling/NRE line marked variable:true',
  );
});

test('A-12 rejects a record in a non-EUR currency', () => {
  expectFailure(
    'A-12',
    (data) => {
      ueRecords(data)[0].currency = 'USD';
    },
    'record currency is not EUR',
  );
});

test('A-13 rejects a VAT-inclusive figure used as net revenue', () => {
  expectFailure(
    'A-13',
    (data) => {
      const record = ueRecords(data).find(
        (item) =>
          item.revenue.vatBasis === 'VAT_INCLUDED' &&
          typeof item.revenue.grossHypothesisEur === 'number',
      );
      record.revenue.netRevenueEur = record.revenue.grossHypothesisEur;
    },
    'gross VAT-inclusive figure assigned to netRevenueEur',
  );
});

test('A-14 rejects an aggregate total with more than 2 decimals', () => {
  expectFailure(
    'A-14',
    (data) => {
      ueRecords(data)[0].headroomEur = Number((ueRecords(data)[0].headroomEur + 0.0012).toFixed(4));
    },
    'money value rounded to 4 decimals',
  );
});

/* ------------------------------------------------------------------ R checks */

test('R-01 rejects missing cloud recurring inputs for connected hardware', () => {
  expectFailure(
    'R-01',
    (data) => {
      data.recurringCostInputs.inputs = data.recurringCostInputs.inputs.filter(
        (input) => !(input.dependency === 'CLOUD_INFRA' && input.driver === 'PER_DEVICE_MONTH'),
      );
    },
    'no cloud per-device-month input left for HUB/DISPLAY/AIS',
  );
});

test('R-01 rejects one connected family without any recurring declaration while global cloud inputs remain', () => {
  expectFailure(
    'R-01',
    (data) => {
      for (const record of ueRecords(data).filter((item) => item.familyId === 'HUB')) {
        record.costLines = record.costLines.filter(
          (line) =>
            !/CLOUD|CELLULAR|CONNECTIVITY|TELEMETRY|NOTIFICATION/i.test(
              line.categoryId ?? line.category ?? '',
            ),
        );
        record.unknownVariableCostCategories = [];
        delete record.recurringCostExposure;
      }
    },
    'HUB loses every recurring declaration while the global cloud inputs stay intact',
  );
});

test('R-02 rejects WATCH without a cellular connectivity input', () => {
  expectFailure(
    'R-02',
    (data) => {
      for (const record of ueRecords(data).filter((item) => item.familyId === 'WATCH')) {
        record.costLines = record.costLines.filter(
          (line) => !/CELLULAR|CONNECTIVITY/i.test(line.categoryId ?? line.category ?? ''),
        );
        record.unknownVariableCostCategories = record.unknownVariableCostCategories.filter(
          (unknown) => !/CELLULAR|CONNECTIVITY/i.test(unknown.category),
        );
      }
    },
    'WATCH cellular cost removed from every WATCH record',
  );
});

test('R-03 rejects FLEET without cloud/telemetry exposure', () => {
  expectFailure(
    'R-03',
    (data) => {
      for (const record of ueRecords(data).filter((item) => item.familyId === 'FLEET')) {
        record.costLines = record.costLines.filter(
          (line) =>
            !/CLOUD|TELEMETRY|TENANCY|STORAGE/i.test(line.categoryId ?? line.category ?? ''),
        );
        record.unknownVariableCostCategories = record.unknownVariableCostCategories.filter(
          (unknown) => !/CLOUD|TELEMETRY|STORAGE/i.test(unknown.category),
        );
      }
    },
    'FLEET cloud lines and declared UNKNOWN removed',
  );
});

test('R-04 rejects a dataset that ignores inactive/suspended devices', () => {
  expectFailure(
    'R-04',
    (data) => {
      data.assumptions.assumptions = data.assumptions.assumptions.filter(
        (assumption) => assumption.id !== 'ASM-MC12-020',
      );
      for (const profile of Object.values(data.recurringCostInputs.usageProfiles)) {
        profile.rationale = profile.rationale.replace(/dormant|inactive|suspended/gi, 'nominal');
      }
    },
    'inactive/suspended device assumption and wording removed',
  );
});

test('R-05 rejects missing alert notification cost', () => {
  expectFailure(
    'R-05',
    (data) => {
      data.recurringCostInputs.inputs = data.recurringCostInputs.inputs.filter(
        (input) => input.dependency !== 'NOTIFICATIONS',
      );
    },
    'notification cost inputs removed',
  );
});

test('R-06 rejects a subscription without support cost or UNKNOWN', () => {
  expectFailure(
    'R-06',
    (data) => {
      for (const record of subscribers(data)) {
        record.costLines = record.costLines.filter(
          (line) => !/SUPPORT/i.test(line.categoryId ?? line.category ?? ''),
        );
        record.unknownVariableCostCategories = record.unknownVariableCostCategories.filter(
          (unknown) => !/SUPPORT/i.test(unknown.category),
        );
      }
    },
    'support cost removed from every subscription',
  );
});

test('R-07 rejects a subscription without security/CRA lifecycle cost', () => {
  expectFailure(
    'R-07',
    (data) => {
      for (const record of subscribers(data)) {
        record.fixedCostsExcluded = record.fixedCostsExcluded.filter(
          (fixed) => !/SECURITY_MAINTENANCE|SECURITY_SUPPORT|CRA|CYBER/i.test(fixed.category),
        );
      }
    },
    'security-maintenance cost removed from every subscription',
  );
});

test('R-08 rejects storage modelled without a retention period', () => {
  expectFailure(
    'R-08',
    (data) => {
      scrubRetentionPeriods(data);
    },
    'retention period removed from every retention statement',
  );
});

/* ------------------------------------------------------------------ D checks */

test('D-01 rejects an MC-13 forecast artefact', () => {
  expectFailure(
    'D-01',
    (data) => {
      data.manifest.forecastProduced = true;
    },
    'forecastProduced true',
  );
});

test('D-02 rejects a break-even claim', () => {
  expectFailure(
    'D-02',
    (data) => {
      data.manifest.breakEvenClaim = true;
    },
    'breakEvenClaim true',
  );
});

test('D-03 rejects a status block that does not match the delivery values', () => {
  expectFailure(
    'D-03',
    (data) => {
      data.manifest.statusBlock.MC12_VERDICT = 'PASS';
    },
    'MC12_VERDICT changed from PARTIAL',
  );
});

test('D-03 rejects a false PR_CREATED status now that PR #19 exists', () => {
  expectFailure(
    'D-03',
    (data) => {
      data.manifest.statusBlock.PR_CREATED = false;
    },
    'PR_CREATED false contradicts the open draft PR',
  );
});

test('D-04 rejects a modified MC-11 content baseline', () => {
  expectFailure(
    'D-04',
    (data) => {
      data._mc11Baseline.aggregateSha256 = 'deadbeef';
    },
    'MC-11 aggregate hash differs from the recorded baseline',
  );
});

/* ------------------------------------------------------- extra contract nuances */

test('A-08 rejects decision weight drift', () => {
  expectFailure(
    'A-08',
    (data) => {
      data.decisionMatrix.dimensions[0].weight += 1;
    },
    'registered weights no longer sum to 100 / weighted score drifts',
  );
});

test('A-02 rejects a declared total with a null variable line', () => {
  expectFailure(
    'A-02',
    (data) => {
      const record = ueRecords(data).find(
        (item) => item.knownVariableCostEur !== null && item.costLines.length > 0,
      );
      record.costLines.push({
        id: 'NULL-TEST',
        category: 'CLOUD_ACCOUNT',
        amountEur: null,
        status: 'KNOWN',
        evidenceClass: 'ENGINEERING_ASSUMPTION',
        variable: true,
        notes: 'null line silently dropped from the sum',
      });
    },
    'null amount in a KNOWN variable line is not a zero',
  );
});

test('V-02 rejects for-sale text outside the availability field', () => {
  expectFailure(
    'V-02',
    (data) => {
      data.manifest.status = 'AVAILABLE_FOR_SALE';
    },
    'for-sale text present in the dataset',
  );
});

test('V-15 accepts the real evidence window (positive control)', () => {
  const report = validate(fresh());
  const check = report.checks.find((entry) => entry.id === 'V-15');
  assert.equal(check.status, 'PASS');
});
