#!/usr/bin/env node
/**
 * MC-13 adversarial unit suite for the financial-model validator.
 *
 * Every test applies exactly one mutation to an in-memory `structuredClone` of the governed
 * data and asserts that `validate()` fails *and* reports the intended check id. The repository
 * data, documents and derived files are never written: the suite is read-only on disk.
 *
 * Run with:
 *   node --test scripts/check-marea-financial-model.test.mjs          (npm run test:financial:unit)
 *   node --test --test-isolation=none scripts/check-marea-financial-model.test.mjs
 *
 * The second form is authoritative when the Node sandbox blocks worker spawning.
 */
import assert from 'node:assert/strict';
import { before, describe, test } from 'node:test';
import { loadFromDisk, validate } from './check-marea-financial-model.mjs';

const OPTIONS = { allowPendingReview: true };
const HORIZON = 60;

let pristine;

before(() => {
  const { data, missing } = loadFromDisk();
  assert.deepEqual(missing, [], 'governed financial data files are missing');
  pristine = data;
});

/* ---------------------------------------------------------------- helpers */

const clone = () => structuredClone(pristine);

const baseColumns = (data) => data.monthlyFinancialModel.scenarios.BASE_HYPOTHETICAL.columns;

function assumption(data, id) {
  const record = (data.assumptions?.assumptions ?? []).find((item) => item.id === id);
  assert.ok(record, `assumption ${id} is not declared`);
  return record;
}

function scenarioDefinition(data, id) {
  const scenario = (data.scenarioDefinitions?.scenarios ?? []).find((item) => item.id === id);
  assert.ok(scenario, `scenario definition ${id} is not declared`);
  return scenario;
}

function hardwareSku(data, predicate = () => true) {
  const sku = (data.revenueDrivers?.hardwareSkus ?? []).find(predicate);
  assert.ok(sku, 'the required hardware SKU is not declared');
  return sku;
}

function firstIndexWhere(values, predicate) {
  const index = (values ?? []).findIndex((value) => value != null && predicate(value));
  assert.ok(index >= 0, 'expected at least one non-zero value in the modelled column');
  return index;
}

function run(mutate) {
  const data = clone();
  mutate(data);
  return validate(data, OPTIONS);
}

function assertFlagged(report, ids) {
  assert.equal(report.ok, false, 'the mutation must make the validator fail');
  assert.ok(
    ids.some((id) => report.failures.includes(id)),
    `expected one of [${ids.join(', ')}] in report.failures, got [${report.failures.join(', ')}]`,
  );
}

/* ------------------------------------------------------------- mutations */

describe('adversarial mutations (one mutation per test)', () => {
  test('01 duplicate tooling/NRE expenditure in monthly non-cash amortisation', () => {
    const report = run((data) => {
      baseColumns(data).amortizationNonCash[0] += 1000;
    });
    assertFlagged(report, ['A-18', 'A-19']);
  });

  test('02 VAT incorrectly included in net recognised revenue', () => {
    const report = run((data) => {
      const columns = baseColumns(data);
      const month = firstIndexWhere(columns.vatOutput, (value) => value !== 0);
      columns.netRecognizedRevenue[month] += columns.vatOutput[month];
    });
    assertFlagged(report, ['A-03', 'A-04']);
  });

  test('03 unknown data-licence cost replaced by zero', () => {
    const report = run((data) => {
      const licence = (data.assumptions?.assumptions ?? []).find((item) =>
        /data-licence/i.test(item.name),
      );
      assert.ok(licence, 'data-licence assumption is not declared');
      assert.equal(licence.status, 'UNKNOWN', 'control: the licence cost starts as UNKNOWN');
      licence.value = 0;
      licence.status = 'KNOWN';
    });
    assertFlagged(report, ['V-12']);
  });

  test('04 price hypothesis artificially approved', () => {
    const report = run((data) => {
      const sku = hardwareSku(data, (item) => item.priceHypothesis);
      sku.priceHypothesis.status = 'APPROVED';
    });
    assertFlagged(report, ['V-01']);
  });

  test('05 hypothetical revenue recognised in the restricted case', () => {
    const report = run((data) => {
      const restricted = data.monthlyFinancialModel.scenarios.RESTRICTED_CURRENT.columns;
      restricted.grossInvoicedRevenue[0] = 1000;
    });
    assertFlagged(report, ['V-13']);
  });

  test('06 PILOT safety-gate bypass via a hypothetical clearance month', () => {
    const report = run((data) => {
      const pilot = scenarioDefinition(data, 'BASE_HYPOTHETICAL').clearanceSchedule.find(
        (entry) => entry.familyId === 'PILOT',
      );
      assert.ok(pilot, 'PILOT clearance entry is not declared');
      pilot.hypotheticalClearanceMonth = 5;
    });
    assertFlagged(report, ['V-03', 'S-09']);
  });

  test('07 FLEET hardware inserted by default', () => {
    const report = run((data) => {
      const bundle = (data.revenueDrivers?.bundles ?? []).find((item) => item.id === 'FLEET');
      assert.ok(bundle, 'FLEET bundle is not declared');
      assert.equal(bundle.hardwareByDefault, false, 'control: FLEET starts without hardware');
      bundle.hardwareByDefault = true;
      const fleetHardware = structuredClone(hardwareSku(data));
      fleetHardware.id = 'FLEET-HUB-HW';
      fleetHardware.familyId = 'FLEET';
      data.revenueDrivers.hardwareSkus.push(fleetHardware);
    });
    assertFlagged(report, ['V-05']);
  });

  test('08 subscription revenue recognised twice', () => {
    const report = run((data) => {
      const columns = baseColumns(data);
      const month = firstIndexWhere(columns.subscriptionRevenueNet, (value) => value !== 0);
      columns.subscriptionRevenueNet[month] *= 2;
    });
    assertFlagged(report, ['A-08', 'A-03']);
  });

  test('09 shared NAV/WEATHER entitlement double billed', () => {
    const report = run((data) => {
      const columns = baseColumns(data);
      let nav = 0;
      let weather = 0;
      for (const [skuId, series] of Object.entries(columns.subscriptionActiveAccountsBySku ?? {})) {
        const familyId = (data.revenueDrivers?.subscriptionSkus ?? []).find(
          (sku) => sku.id === skuId,
        )?.familyId;
        if (familyId === 'NAV') nav += series[HORIZON - 1];
        if (familyId === 'WEATHER') weather += series[HORIZON - 1];
      }
      assert.ok(nav > 0 && weather > 0, 'control: NAV and WEATHER are both billed');
      assert.equal(
        columns.sharedLicenceAccountMonths[HORIZON - 1],
        Math.max(nav, weather),
        'control: the shared entitlement is billed once before the mutation',
      );
      columns.sharedLicenceAccountMonths[HORIZON - 1] = nav + weather;
    });
    assertFlagged(report, ['V-17']);
  });

  test('10 missing month in a 60-period column', () => {
    const report = run((data) => {
      data.monthlyFinancialModel.scenarios.DOWNSIDE.columns.hardwareUnitsTotal.splice(0, 1);
    });
    assertFlagged(report, ['A-01']);
  });

  test('11 duplicate month label in the model periods', () => {
    const report = run((data) => {
      const periods = data.monthlyFinancialModel.periods;
      assert.equal(periods.length, HORIZON, 'control: the model declares 60 periods');
      periods[HORIZON - 1] = periods[HORIZON - 2];
    });
    assertFlagged(report, ['S-04', 'A-01']);
  });

  test('12 broken 12/36/60 rollup in scenario-results M36 net revenue', () => {
    const report = run((data) => {
      const view = data.scenarioResults.scenarios.BASE_HYPOTHETICAL.views.M36;
      assert.equal(typeof view.netRecognizedRevenue, 'number', 'control: M36 net revenue exists');
      view.netRecognizedRevenue += 1000;
    });
    assertFlagged(report, ['A-02']);
  });

  test('13 broken opening-to-closing cash reconciliation', () => {
    const report = run((data) => {
      baseColumns(data).cumulativeCashBalance[0] += 100;
    });
    assertFlagged(report, ['A-13']);
  });

  test('14 negative inventory at period end', () => {
    const report = run((data) => {
      baseColumns(data).inventoryUnitsEnd[5] = -1;
    });
    assertFlagged(report, ['A-10']);
  });

  test('15 invalid manufacturing-volume tier', () => {
    const report = run((data) => {
      hardwareSku(data).costBasis.volumeTier = 42;
    });
    assertFlagged(report, ['S-11']);
  });

  test('16 unsourced customer conversion/churn demand profile', () => {
    const report = run((data) => {
      const profile = data.revenueDrivers.demandProfiles[0];
      assert.equal(
        profile.evidenceClass,
        'SCENARIO_ASSUMPTION',
        'control: demand profiles start labelled as scenario assumptions',
      );
      profile.evidenceClass = 'ENGINEERING_ASSUMPTION';
    });
    assertFlagged(report, ['S-08']);
  });

  test('17 unlabelled churn assumption', () => {
    const report = run((data) => {
      const churn = assumption(data, 'ASM-MC13-020');
      assert.equal(churn.evidenceClass, 'SCENARIO_ASSUMPTION', 'control: churn starts labelled');
      churn.evidenceClass = 'ENGINEERING_ASSUMPTION';
    });
    assertFlagged(report, ['R-02']);
  });

  test('18 falsified customer willingness-to-pay evidence', () => {
    const report = run((data) => {
      const wtp = assumption(data, 'ASM-MC13-052');
      assert.equal(wtp.value, null, 'control: customer WTP starts unknown');
      wtp.value = 100;
    });
    assertFlagged(report, ['V-08', 'S-06']);
  });

  test('19 unsupported certification/supplier quotation evidence', () => {
    const report = run((data) => {
      const item = (data.capitalInvestments?.items ?? []).find((record) => record.id === 'INV-02');
      assert.ok(item, 'INV-02 is not declared');
      assert.equal(typeof item.estimatedAmountEur, 'number', 'control: INV-02 carries an amount');
      item.evidenceStatus = 'FORMAL_QUOTATION';
    });
    assertFlagged(report, ['V-10']);
  });

  test('20 fixed cost omitted from the operating result', () => {
    const report = run((data) => {
      const columns = baseColumns(data);
      assert.ok(
        columns.fixedOpexEnvelope.some((value) => value !== 0),
        'control: the fixed-cost envelope starts non-zero',
      );
      columns.fixedOpexEnvelope = columns.fixedOpexEnvelope.map(() => 0);
    });
    assertFlagged(report, ['A-17']);
  });

  test('21 inventory cash payments double counted in operating cash flow', () => {
    const report = run((data) => {
      const columns = baseColumns(data);
      columns.operatingCashFlow = columns.operatingCashFlow.map(
        (value, month) => value - columns.inventoryPurchasesCash[month],
      );
    });
    assertFlagged(report, ['A-14']);
  });

  test('22 inconsistent currency on a numeric price hypothesis', () => {
    const report = run((data) => {
      const sku = hardwareSku(data, (item) => item.priceHypothesis?.grossAmountEur != null);
      assert.equal(sku.priceHypothesis.currency, 'EUR', 'control: the price starts in EUR');
      sku.priceHypothesis.currency = 'USD';
    });
    assertFlagged(report, ['V-11']);
  });

  test('23 unsourced launch timing on a clearance assumption', () => {
    const report = run((data) => {
      const entry = scenarioDefinition(data, 'BASE_HYPOTHETICAL').clearanceSchedule[0];
      const clearance = assumption(data, entry.assumptionId);
      assert.equal(
        clearance.evidenceClass,
        'SCENARIO_ASSUMPTION',
        'control: launch timing starts labelled as a scenario assumption',
      );
      clearance.evidenceClass = 'ENGINEERING_ASSUMPTION';
    });
    assertFlagged(report, ['S-09']);
  });

  test('24 fabricated supplier price/source record', () => {
    const report = run((data) => {
      const sku = hardwareSku(data, (item) => item.knownVariableCostEur != null && item.costBasis);
      assert.ok(sku.costBasis.sourceRecordId, 'control: the cost basis starts sourced');
      sku.costBasis.sourceRecordId = 'UE-FAKE';
    });
    assertFlagged(report, ['A-24']);
  });

  test('25 asserted break-even where the input is unknown', () => {
    const report = run((data) => {
      const threshold = (data.breakEvenThresholds?.thresholds ?? []).find(
        (item) => item.id === 'BE-BASE_HYPOTHETICAL-SUB-NAV-ESSENTIAL',
      );
      assert.ok(threshold, 'the NAV subscription break-even threshold is not declared');
      assert.equal(threshold.status, 'NOT_DETERMINABLE', 'control: the threshold starts unknown');
      assert.equal(threshold.value, null, 'control: the threshold starts without a value');
      // A NAV subscription threshold may not claim a conditional numeric break-even while the
      // licensing input is unknown: no value and NOT_DETERMINABLE are both mandatory.
      threshold.value = 100;
      threshold.status = 'CONDITIONAL_HYPOTHETICAL_THRESHOLD';
    });
    assertFlagged(report, ['V-20']);
  });

  test('26 changed predecessor cost source', () => {
    const report = run((data) => {
      const sku = hardwareSku(data, (item) => item.knownVariableCostEur != null && item.costBasis);
      sku.knownVariableCostEur = Math.round((sku.knownVariableCostEur + 123.45) * 100) / 100;
    });
    assertFlagged(report, ['A-24', 'V-16']);
  });

  test('27 reviewer PASS asserted while a blocking finding is open and recomputation is missing', () => {
    const report = run((data) => {
      const review = data.reviewFindings;
      review.verdict = 'PASS';
      review.independentRecomputation = null;
      review.findings = [
        {
          id: 'F-ADV-027',
          severity: 'BLOCKING',
          status: 'OPEN',
          evidence: 'adversarial mutation is still open',
          requiredCorrection: 'close the finding before asserting PASS',
          finalStatus: 'OPEN',
        },
      ];
    });
    assertFlagged(report, ['V-19']);
  });
});

/* --------------------------------------------------------------- controls */

describe('controls', () => {
  test('positive control: a fully recorded final state passes the gate', () => {
    const data = clone();
    data.reviewFindings.verdict = 'PASS_INTERNAL_FINANCIAL_SCOPE';
    data.reviewFindings.independentRecomputation = {
      method: 'synthetic positive-control record',
      mismatches: 0,
    };
    data.reviewFindings.findings = [];
    data.reviewFindings.findingCounts = {
      total: 0,
      blocking: 0,
      major: 0,
      minor: 0,
      informational: 0,
      open: 0,
    };
    data.manifest.statusBlock.MC13_INDEPENDENT_REVIEW = 'PASS_INTERNAL_FINANCIAL_SCOPE';
    data._external.docs['MC-13-DELIVERY.md'] = '# MC-13 — Delivery\n\nDelivery record.\n';
    const report = validate(data, OPTIONS);
    assert.equal(
      report.ok,
      true,
      `unmutated data should pass but failed: ${report.failures.join(', ')}`,
    );
    assert.deepEqual(report.failures, []);
    assert.ok(report.counts.total > 0, 'the validator must execute its checks');
  });

  test('regression control: removing one period from the monthly model fails A-01', () => {
    const report = run((data) => {
      const column = baseColumns(data).grossInvoicedRevenue;
      assert.equal(column.length, HORIZON, 'control: the column starts with 60 periods');
      column.splice(HORIZON - 1, 1);
    });
    assertFlagged(report, ['A-01']);
  });
});
