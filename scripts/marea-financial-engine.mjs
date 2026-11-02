#!/usr/bin/env node
/**
 * MC-13 integrated 60-month financial engine.
 *
 * Deterministic, dependency-free computation of the whole MC-13 financial model from the curated
 * inputs in `docs/marea/financial/data/`. The engine has no network, clock or randomness: running
 * it twice over the same inputs produces byte-identical derived files.
 *
 * Authority: `docs/marea/financial/MC13-FINANCIAL-DATA-CONTRACT.md`.
 * The engine is shared by the generator (`scripts/build-marea-financial-model.mjs`) and the
 * validator (`scripts/check-marea-financial-model.mjs`). It never writes business data itself.
 *
 * Accounting treatment (fixed by the contract and MC-12 decision D-050):
 *   - tooling/NRE is capital expenditure and non-cash amortisation, never a variable unit cost;
 *   - certification, insurance and CRA lifecycle costs are fixed programme costs, kept unknown
 *     where no evidence exists and never zeroed;
 *   - unknown data-licence, insurance, CRA, onboarding/DPA and SLA costs are excluded from the
 *     conditional result and listed explicitly as named unknowns;
 *   - every monetary output column is rounded to 2 decimals; internal identities hold before
 *     output rounding and are re-checked by the validator against the stored columns.
 */

export const HORIZON = 60;
export const SCENARIO_IDS = [
  'RESTRICTED_CURRENT',
  'DOWNSIDE',
  'BASE_HYPOTHETICAL',
  'UPSIDE_HYPOTHETICAL',
];
export const HYPOTHETICAL_SCENARIOS = ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL'];

export const PERIODS = Array.from(
  { length: HORIZON },
  (_, i) => `M${String(i + 1).padStart(2, '0')}`,
);

const CONSUMER_VAT_BASIS = 'VAT_INCLUDED';
const round2 = (value) => (value == null ? null : Math.round((value + Number.EPSILON) * 100) / 100);
const round4 = (value) =>
  value == null ? null : Math.round((value + Number.EPSILON) * 10000) / 10000;
const sum = (values) => values.reduce((total, value) => total + (value ?? 0), 0);
const zeros = () => Array(HORIZON).fill(0);
const nulls = () => Array(HORIZON).fill(null);
const addMonths = (month, delta) => month + delta;

export function buildContext(inputs) {
  const assumptionsById = new Map(
    (inputs.assumptions?.assumptions ?? []).map((item) => [item.id, item]),
  );
  const assumption = (id) => {
    const record = assumptionsById.get(id);
    if (!record) throw new Error(`MC-13 engine: unknown assumption id ${id}`);
    return record;
  };
  const number = (id) => {
    const record = assumption(id);
    if (typeof record.value !== 'number') {
      throw new Error(`MC-13 engine: assumption ${id} is not numeric (status ${record.status})`);
    }
    return record.value;
  };
  const nullableNumber = (id) => {
    const record = assumption(id);
    if (record.value == null) return null;
    if (typeof record.value !== 'number') {
      throw new Error(`MC-13 engine: assumption ${id} is not numeric`);
    }
    return record.value;
  };
  const scenarioById = new Map(
    (inputs.scenarioDefinitions?.scenarios ?? []).map((item) => [
      item.id,
      { ...item, statusFlags: item.statusFlags ?? inputs.scenarioDefinitions?.statusFlags ?? {} },
    ]),
  );
  return {
    inputs,
    assumption,
    number,
    nullableNumber,
    scenarios: scenarioById,
    drivers: inputs.revenueDrivers ?? {},
    recurring: inputs.recurringRevenue ?? {},
    opex: inputs.operatingCosts ?? {},
    capex: inputs.capitalInvestments ?? {},
    workingCapital: inputs.workingCapital ?? {},
    scenarioDefinitions: inputs.scenarioDefinitions ?? {},
    stressCases: inputs.scenarioDefinitions?.stressCases ?? [],
  };
}

/* ------------------------------------------------------------------ helpers */

function allocateCents(totalEur, periods, startMonth) {
  // Exact 2-decimal split of a cohort amount across its recognition window. The remainder is
  // assigned to the first recognised month so the sum is exact to the cent.
  const out = zeros();
  if (!Number.isFinite(totalEur) || totalEur === 0) return out;
  const totalCents = Math.round(totalEur * 100);
  const base = Math.trunc(totalCents / periods);
  const remainder = totalCents - base * periods;
  for (let i = 0; i < periods; i += 1) {
    const month = startMonth + i;
    if (month < 1 || month > HORIZON) continue;
    out[month - 1] = (base + (i === 0 ? remainder : 0)) / 100;
  }
  return out;
}

function channelFactor(channelMix, appliesTo) {
  const rows = (channelMix ?? []).filter((row) => row.appliesTo === appliesTo);
  if (!rows.length) return 1;
  return rows.reduce(
    (factor, row) => factor + (row.sharePct / 100) * (1 - row.revenueDeductionPct / 100),
    0,
  );
}

function channelDeductionPct(channelMix, appliesTo, channel) {
  const row = (channelMix ?? []).find(
    (item) => item.appliesTo === appliesTo && item.channel === channel,
  );
  return row ? row.revenueDeductionPct : 0;
}

function channelShare(channelMix, appliesTo, channel) {
  const row = (channelMix ?? []).find(
    (item) => item.appliesTo === appliesTo && item.channel === channel,
  );
  return row ? row.sharePct / 100 : 0;
}

function clearanceStartMonth(scenario, familyId, overrides) {
  const entry = (scenario.clearanceSchedule ?? []).find((item) => item.familyId === familyId);
  if (!entry || entry.hypotheticalClearanceMonth == null) return Number.POSITIVE_INFINITY;
  let month = entry.hypotheticalClearanceMonth;
  if (overrides.certificationDelayMonths) {
    const delayed = ['RED_CERTIFICATION', 'EMC_CONFORMITY', 'NMEA_LICENCE'];
    if (delayed.includes(entry.gate)) month += overrides.certificationDelayMonths;
  }
  if (overrides.licensingDelayMonths) {
    const delayed = ['CHART_LICENCE', 'WEATHER_LICENCE'];
    if (delayed.includes(entry.gate)) month += overrides.licensingDelayMonths;
  }
  if (overrides.noLicensingClearance && ['CHART_LICENCE', 'WEATHER_LICENCE'].includes(entry.gate)) {
    return Number.POSITIVE_INFINITY;
  }
  return month + 1;
}

function applyScenarioOverrides(scenario, overrides) {
  const channelMix = (scenario.channelMix ?? []).map((row) => {
    if (row.channel === 'DISTRIBUTOR_RETAIL' && overrides.distributorMarginPct != null) {
      return { ...row, revenueDeductionPct: overrides.distributorMarginPct };
    }
    if (row.channel === 'PROFESSIONAL_INSTALLER' && overrides.installerMarginPct != null) {
      return { ...row, revenueDeductionPct: overrides.installerMarginPct };
    }
    return row;
  });
  return { ...scenario, channelMix };
}

/* ------------------------------------------------------------- scenario build */

function effectiveParams(ctx, scenario, overrides) {
  const vat = ctx.number('ASM-MC13-001');
  const refundPct = overrides.warrantyReturnsPct ?? ctx.number('ASM-MC13-003') / 100;
  return {
    vatPct: vat,
    refundPct,
    paymentFeePct: ctx.number('ASM-MC13-004'),
    paymentFeeFixedEur: ctx.number('ASM-MC13-005'),
    vatPaymentLagMonths: ctx.number('ASM-MC13-009'),
    inputVatRecoverablePct: ctx.number('ASM-MC13-010'),
    supplierDepositPct: ctx.number('ASM-MC13-011'),
    balanceDueAfterMonths: ctx.number('ASM-MC13-012'),
    leadTimeMonths: ctx.number('ASM-MC13-013'),
    safetyStockMonths: ctx.number('ASM-MC13-014'),
    moqUnits: ctx.number('ASM-MC13-015'),
    inventoryCarryingPctPerYear: ctx.number('ASM-MC13-016'),
    obsolescencePctPerYear: overrides.obsolescencePctPerYear ?? ctx.number('ASM-MC13-017'),
    distributorDays: overrides.distributorDays ?? ctx.number('ASM-MC13-018'),
    directSettlementDays: ctx.number('ASM-MC13-019'),
    cloudPerDeviceMonth: ctx.number('ASM-MC13-029') * (overrides.cloudMultiplier ?? 1),
    cellularPerDeviceMonth: overrides.cellularCostEurPerDeviceMonth ?? ctx.number('ASM-MC13-030'),
    notificationsPerDeviceMonth: ctx.number('ASM-MC13-031'),
    cloudPerAccountMonth: ctx.number('ASM-MC13-032') * (overrides.cloudMultiplier ?? 1),
    cloudPerVesselMonth: ctx.number('ASM-MC13-033') * (overrides.cloudMultiplier ?? 1),
    supportPerAccountYear: ctx.number('ASM-MC13-034'),
    supportPerDeviceYear: ctx.number('ASM-MC13-035'),
    supportPerVesselYear: ctx.number('ASM-MC13-036'),
    inactiveDeviceRetainedFactor: ctx.number('ASM-MC13-037'),
    opexInflationPctPerYear: ctx.number('ASM-MC13-042'),
    demandMultiplier: (scenario.demandMultiplier ?? 1) * (overrides.demandMultiplier ?? 1),
    hardwareCostMultiplier:
      (overrides.hardwareCostMultiplier ?? 1) *
      (overrides.materialInflationMultiplier ?? 1) *
      (overrides.fxCostMultiplier ?? 1),
    yieldPct: overrides.manufacturingYieldPct ?? 1,
    sellingPriceMultiplier: overrides.sellingPriceMultiplier ?? 1,
    appStoreCommissionPct: ctx.number('ASM-MC13-006'),
    renewalRate:
      overrides.annualRenewalRate ??
      ctx.number(
        scenario.id === 'DOWNSIDE'
          ? 'ASM-MC13-020'
          : scenario.id === 'UPSIDE_HYPOTHETICAL'
            ? 'ASM-MC13-022'
            : 'ASM-MC13-021',
      ),
    monthlyChurnRate:
      overrides.monthlyChurnRate ??
      ctx.number(
        scenario.id === 'DOWNSIDE'
          ? 'ASM-MC13-023'
          : scenario.id === 'UPSIDE_HYPOTHETICAL'
            ? 'ASM-MC13-025'
            : 'ASM-MC13-024',
      ),
    activationRate:
      overrides.activationRate ??
      ctx.number(
        scenario.id === 'DOWNSIDE'
          ? 'ASM-MC13-026'
          : scenario.id === 'UPSIDE_HYPOTHETICAL'
            ? 'ASM-MC13-028'
            : 'ASM-MC13-027',
      ),
  };
}

function buildRestrictedScenario(ctx, scenario) {
  const columns = {
    hardwareUnitsBySku: {},
    subscriptionNewAccountsBySku: {},
    subscriptionActiveAccountsBySku: {},
    fleetActiveVessels: zeros(),
    hardwareUnitsTotal: zeros(),
    grossInvoicedRevenue: zeros(),
    refundsAllowance: zeros(),
    vatOutput: zeros(),
    netRecognizedRevenue: zeros(),
    hardwareRevenueNet: zeros(),
    subscriptionRevenueNet: zeros(),
    cashReceiptsGross: zeros(),
    tradeReceivablesEnd: zeros(),
    cashCollectionsNetOfVat: nulls(),
    paymentFees: nulls(),
    cogsHardware: nulls(),
    softwareDirectCosts: nulls(),
    knownVariableContribution: nulls(),
    fixedOpexEnvelope: nulls(),
    ebitdaLikeConditional: nulls(),
    amortizationNonCash: nulls(),
    accountingOperatingResult: nulls(),
    inventoryUnitsBegin: nulls(),
    purchasesUnits: nulls(),
    receiptsUnits: nulls(),
    unitsSold: zeros(),
    writeOffsUnits: nulls(),
    inventoryUnitsEnd: nulls(),
    inventoryPurchasesCash: nulls(),
    inventoryAssetCost: nulls(),
    inventoryPrepayments: nulls(),
    inventoryPayables: nulls(),
    inventoryCarryingCost: nulls(),
    vatCollected: zeros(),
    vatPaid: nulls(),
    netVatCash: nulls(),
    capexCash: nulls(),
    operatingCashFlow: nulls(),
    investingCashFlow: nulls(),
    workingCapitalMovement: nulls(),
    netCashFlow: nulls(),
    cumulativeCashBalance: nulls(),
    cashBurn: nulls(),
    financingRequirement: nulls(),
    authorizedForSaleMask: zeros(),
    hypotheticalClearanceMask: zeros(),
    revenueSuppressedMask: Array(HORIZON).fill(1),
  };
  for (const sku of ctx.drivers.hardwareSkus ?? []) {
    columns.hardwareUnitsBySku[sku.id] = zeros();
  }
  for (const sku of ctx.drivers.subscriptionSkus ?? []) {
    columns.subscriptionNewAccountsBySku[sku.id] = zeros();
    columns.subscriptionActiveAccountsBySku[sku.id] = zeros();
  }
  return {
    scenarioId: scenario.id,
    eligibilityCase: scenario.eligibilityCase,
    statusFlags: scenario.statusFlags,
    columns,
    suppression: {
      reason:
        'RESTRICTED_CURRENT represents the current authorized commercial reality: every product is ' +
        'NOT_FOR_SALE, so no revenue can be authorized. Company cash, current expenses, financing and ' +
        'unknown cost inputs remain UNKNOWN and are stored as null, never as zero.',
      unknownColumns: [
        'cogsHardware',
        'softwareDirectCosts',
        'fixedOpexEnvelope',
        'ebitdaLikeConditional',
        'operatingCashFlow',
        'netCashFlow',
        'cumulativeCashBalance',
        'financingRequirement',
      ],
    },
    unknowns: [
      {
        column: 'companyOpeningCash',
        reason: 'Current company bank balance and funding are UNKNOWN.',
      },
      { column: 'fixedOpexEnvelope', reason: 'Current company expenses are UNKNOWN.' },
      { column: 'cogsHardware', reason: 'No authorized sales and no supplier quotation exist.' },
    ],
    deferredRevenueEnd: zeros(),
    namedUnknowns: [],
  };
}

function demandUnitsForSku(ctx, scenario, profile, params, overrides) {
  const units = zeros();
  if (!profile) return units;
  const start = clearanceStartMonth(
    scenario,
    profile.familyId,
    Object.assign({}, overrides, {
      certDelayApplied: true,
    }),
  );
  if (!Number.isFinite(start)) return units;
  const delay = overrides.launchDelayMonths ?? 0;
  const first = Math.max(start + delay, (profile.launchOffsetMonths ?? 0) + 1);
  if (overrides.noCustomerAcquisition) return units;
  const mature = (profile.matureMonthlyUnits ?? 0) * params.demandMultiplier;
  const ramp = Math.max(1, profile.rampMonths ?? 1);
  for (let month = first; month <= HORIZON; month += 1) {
    const fraction = Math.min(1, (month - first + 1) / ramp);
    units[month - 1] = Math.round(mature * fraction);
  }
  return units;
}

function buildHardwareBlock(ctx, scenario, params, overrides) {
  const skus = (ctx.drivers.hardwareSkus ?? []).filter((sku) => sku.modelEnabled !== false);
  const profiles = ctx.drivers.demandProfiles ?? [];
  const unitsBySku = {};
  const grossInvoiced = zeros();
  const refundsAllowance = zeros();
  const refundsCash = zeros();
  const vatOutput = zeros();
  const netRevenue = zeros();
  const receivables = zeros();
  const transactions = zeros();
  const perSku = {};
  for (const sku of skus) {
    const profile = profiles.find(
      (item) => item.scenarioId === scenario.id && item.skuId === sku.id,
    );
    const units = demandUnitsForSku(ctx, scenario, profile, params, overrides);
    unitsBySku[sku.id] = units;
    const grossPrice = (sku.priceHypothesis?.grossAmountEur ?? 0) * params.sellingPriceMultiplier;
    const factor = channelFactor(
      scenario.channelMix?.filter((row) => row.appliesTo === 'HARDWARE'),
      'HARDWARE',
    );
    const distributorShare = channelShare(scenario.channelMix, 'HARDWARE', 'DISTRIBUTOR_RETAIL');
    const distributorMarginPct = channelDeductionPct(
      scenario.channelMix,
      'HARDWARE',
      'DISTRIBUTOR_RETAIL',
    );
    const vatBasis = sku.priceHypothesis?.vatBasis ?? CONSUMER_VAT_BASIS;
    const skuGross = zeros();
    const skuRefund = zeros();
    const skuVat = zeros();
    const skuNet = zeros();
    const skuReceivable = zeros();
    for (let m = 0; m < HORIZON; m += 1) {
      const gross = round2(units[m] * grossPrice * factor);
      const refund = round2(gross * params.refundPct);
      const netSalesGross = gross - refund;
      let vat = 0;
      let net = netSalesGross;
      if (vatBasis === CONSUMER_VAT_BASIS) {
        net = netSalesGross / (1 + params.vatPct / 100);
        vat = netSalesGross - net;
      }
      skuGross[m] = gross;
      skuRefund[m] = refund;
      skuVat[m] = round2(vat);
      skuNet[m] = round2(net);
      skuReceivable[m] = round2(
        units[m] * grossPrice * distributorShare * (1 - distributorMarginPct / 100),
      );
      transactions[m] += units[m];
      const unitCost =
        sku.knownVariableCostEur == null
          ? null
          : (sku.knownVariableCostEur * params.hardwareCostMultiplier) / params.yieldPct;
      grossInvoiced[m] += skuGross[m];
      refundsAllowance[m] += skuRefund[m];
      vatOutput[m] += skuVat[m];
      netRevenue[m] += skuNet[m];
      refundsCash[m] += skuRefund[m];
    }
    // Distributor collections lag the invoice by the declared days; direct and installer settle
    // in the same month.
    const lagMonths = Math.ceil(params.distributorDays / 30);
    const direct = zeros();
    const distributorReceiptsForSku = zeros();
    for (let m = 0; m < HORIZON; m += 1) {
      const lagged = m - lagMonths;
      distributorReceiptsForSku[m] = lagged >= 0 ? skuReceivable[lagged] : 0;
      direct[m] = skuGross[m] - skuReceivable[m];
    }
    perSku[sku.id] = {
      units,
      grossInvoiced: skuGross,
      refundsAllowance: skuRefund,
      vatOutput: skuVat,
      netRevenue: skuNet,
      distributorReceivable: skuReceivable,
      distributorReceipts: distributorReceiptsForSku,
      directReceipts: direct,
      unitCost:
        sku.knownVariableCostEur == null
          ? null
          : round2((sku.knownVariableCostEur * params.hardwareCostMultiplier) / params.yieldPct),
      costCompleteness: sku.costCompleteness,
    };
    // Credit the opening receivable as collected only after the lag; the identity is maintained
    // in the aggregate tradeReceivablesEnd column below.
  }
  const receipts = zeros();
  let previousReceivable = 0;
  for (let m = 0; m < HORIZON; m += 1) {
    let invoiced = 0;
    let collected = 0;
    for (const sku of skus) {
      invoiced += perSku[sku.id].distributorReceivable[m];
      collected += perSku[sku.id].distributorReceipts[m];
    }
    receipts[m] = collected;
    receivables[m] = round2(previousReceivable + invoiced - collected);
    previousReceivable = receivables[m];
  }
  const distributorInvoicedGross = zeros();
  const directReceiptsGross = zeros();
  const distributorCollectionsGross = zeros();
  for (let m = 0; m < HORIZON; m += 1) {
    for (const sku of skus) {
      const row = perSku[sku.id];
      distributorInvoicedGross[m] += row.distributorReceivable[m];
      directReceiptsGross[m] += row.directReceipts[m];
      distributorCollectionsGross[m] += row.distributorReceipts[m];
    }
    distributorInvoicedGross[m] = round2(distributorInvoicedGross[m]);
    directReceiptsGross[m] = round2(directReceiptsGross[m]);
    distributorCollectionsGross[m] = round2(distributorCollectionsGross[m]);
  }
  return {
    unitsBySku,
    grossInvoiced,
    refundsAllowance,
    refundsCash: refundsCash.map(round2),
    vatOutput,
    netRevenue,
    distributorReceipts: receipts,
    distributorInvoicedGross,
    directReceiptsGross,
    distributorCollectionsGross,
    tradeReceivablesEnd: receivables,
    transactions,
    perSku,
  };
}

function buildSubscriptionBlock(ctx, scenario, params, overrides) {
  const skus = (ctx.drivers.subscriptionSkus ?? []).filter((sku) => sku.modelEnabled !== false);
  const profiles = ctx.drivers.demandProfiles ?? [];
  const newBySku = {};
  const activeBySku = {};
  const cashGrossBySku = {};
  const netRevenueBySku = {};
  const netCashBySku = {};
  const deferredBySku = {};
  const transactions = zeros();
  const fleetVessels = zeros();
  const fleetRevenueNet = zeros();
  const fleetCashNet = zeros();
  const vatOutput = zeros();
  const netRevenue = zeros();
  const cashGross = zeros();
  const netCash = zeros();
  const activeAccountsTotal = zeros();
  const renewalCount = zeros();
  for (const sku of skus) {
    const profile = profiles.find(
      (item) => item.scenarioId === scenario.id && item.skuId === sku.id,
    );
    const newAccounts = zeros();
    const active = zeros();
    const revenue = zeros();
    const skuCashGross = zeros();
    const skuNetCash = zeros();
    if (profile && sku.familyId !== 'FLEET') {
      const start = clearanceStartMonth(
        scenario,
        sku.familyId,
        Object.assign({}, overrides, { certDelayApplied: true }),
      );
      const delay = overrides.launchDelayMonths ?? 0;
      const first = Math.max(
        Number.isFinite(start) ? start + delay : Number.POSITIVE_INFINITY,
        (profile.launchOffsetMonths ?? 0) + 1,
      );
      const mature = (profile.matureMonthlyAccounts ?? 0) * params.demandMultiplier;
      const ramp = Math.max(1, profile.rampMonths ?? 1);
      const annualPriceGross = sku.priceHypothesis?.grossAmountEur ?? 0;
      const factor = channelFactor(
        scenario.channelMix?.filter((row) => row.appliesTo === 'SUBSCRIPTION'),
        'SUBSCRIPTION',
      );
      const vatBasis = sku.priceHypothesis?.vatBasis ?? CONSUMER_VAT_BASIS;
      const grossAnnual = annualPriceGross * params.sellingPriceMultiplier * factor;
      const netAnnual =
        vatBasis === CONSUMER_VAT_BASIS ? grossAnnual / (1 + params.vatPct / 100) : grossAnnual;
      const vatAnnual = grossAnnual - netAnnual;
      const annual = sku.billingPeriod === 'YEAR';
      if (annual) {
        // Cohort model: annual prepayment, straight-line recognition, renewal at each anniversary.
        const cohorts = [];
        for (let m = 1; m <= HORIZON; m += 1) {
          let newCount = 0;
          if (m >= first && !overrides.noCustomerAcquisition) {
            const fraction = Math.min(1, (m - first + 1) / ramp);
            newCount = Math.round(mature * fraction * params.activationRate);
          }
          if (newCount > 0) {
            cohorts.push({ start: m, accounts: newCount, nextRenewal: m + 12 });
            newAccounts[m - 1] = newCount;
          }
          for (const cohort of cohorts) {
            if (cohort.start <= m && m < cohort.start + 12) {
              active[m - 1] += cohort.accounts;
            }
            if (cohort.nextRenewal === m) {
              const renewed = Math.round(cohort.accounts * params.renewalRate);
              if (renewed > 0) {
                cohorts.push({ start: m, accounts: renewed, nextRenewal: m + 12 });
                newAccounts[m - 1] += renewed;
                renewalCount[m - 1] += renewed;
              }
              cohort.nextRenewal = Number.POSITIVE_INFINITY;
            }
          }
          // Cash is collected at each cohort start; recognition is spread over 12 months.
          const cashCohorts = cohorts.filter((cohort) => cohort.start === m);
          const cashAccounts = cashCohorts.reduce((total, cohort) => total + cohort.accounts, 0);
          if (cashAccounts > 0) {
            skuCashGross[m - 1] = round2(cashAccounts * grossAnnual);
            skuNetCash[m - 1] = round2(cashAccounts * netAnnual);
          }
        }
        // Recognition: build from cohort starts. Remainder cent goes to the first month.
        for (const cohort of cohorts) {
          if (!Number.isFinite(cohort.start)) continue;
          const recognised = allocateCents(cohort.accounts * netAnnual, 12, cohort.start);
          for (let i = 0; i < HORIZON; i += 1) revenue[i] += recognised[i];
        }
        // Recompute active accounts so a cohort stops being active exactly when it should.
        active.fill(0);
        for (const cohort of cohorts) {
          if (!Number.isFinite(cohort.start)) continue;
          for (let i = cohort.start; i < cohort.start + 12 && i <= HORIZON; i += 1) {
            active[i - 1] += cohort.accounts;
          }
        }
      } else {
        let balance = 0;
        for (let m = 1; m <= HORIZON; m += 1) {
          let newCount = 0;
          if (m >= first && !overrides.noCustomerAcquisition) {
            const fraction = Math.min(1, (m - first + 1) / ramp);
            newCount = Math.round(mature * fraction * params.activationRate);
          }
          newAccounts[m - 1] = newCount;
          if (m === 1) {
            balance = 0;
          }
          const churned = Math.round(balance * params.monthlyChurnRate);
          balance = balance - churned + newCount;
          active[m - 1] = balance;
          const monthlyGross = grossAnnual / 12;
          const monthlyNet = netAnnual / 12;
          skuCashGross[m - 1] = round2(balance * monthlyGross);
          skuNetCash[m - 1] = round2(balance * monthlyNet);
          revenue[m - 1] = round2(balance * monthlyNet);
        }
      }
      for (let m = 0; m < HORIZON; m += 1) {
        vatOutput[m] += skuCashGross[m] - skuNetCash[m];
      }
    }
    newBySku[sku.id] = newAccounts;
    activeBySku[sku.id] = active;
    cashGrossBySku[sku.id] = skuCashGross;
    netRevenueBySku[sku.id] = revenue;
    netCashBySku[sku.id] = skuNetCash;
    deferredBySku[sku.id] = zeros();
    for (let m = 0; m < HORIZON; m += 1) {
      cashGross[m] += skuCashGross[m];
      netCash[m] += skuNetCash[m];
      netRevenue[m] += revenue[m];
      activeAccountsTotal[m] += active[m] + (sku.familyId === 'FLEET' ? 0 : 0);
      transactions[m] += newAccounts[m];
    }
  }
  // FLEET is a hardware-free per-vessel SaaS: a separate vessel balance, never a device.
  const fleetSku = skus.find((sku) => sku.familyId === 'FLEET' && sku.modelEnabled !== false);
  if (fleetSku) {
    const profile = profiles.find(
      (item) => item.scenarioId === scenario.id && item.skuId === fleetSku.id,
    );
    if (profile && !overrides.noCustomerAcquisition) {
      const start =
        clearanceStartMonth(scenario, 'FLEET', overrides) + (overrides.launchDelayMonths ?? 0);
      const mature = (profile.matureMonthlyAccounts ?? 0) * params.demandMultiplier;
      const ramp = Math.max(1, profile.rampMonths ?? 1);
      const monthlyGross =
        (fleetSku.priceHypothesis?.grossAmountEur ?? 0) * params.sellingPriceMultiplier;
      // FLEET hypothesis is EUR/vessel-month, VAT-excluded B2B.
      let balance = 0;
      for (let m = 1; m <= HORIZON; m += 1) {
        let add = 0;
        if (m >= start) add = Math.round(mature * Math.min(1, (m - start + 1) / ramp));
        const churned = Math.round(balance * params.monthlyChurnRate);
        balance = balance - churned + add;
        fleetVessels[m - 1] = balance;
        fleetRevenueNet[m - 1] = round2(balance * monthlyGross);
        fleetCashNet[m - 1] = round2(balance * monthlyGross);
        transactions[m - 1] += add;
      }
    }
  }
  // FLEET revenue and cash are VAT-excluded B2B: they equal net revenue and are added once.
  for (let m = 0; m < HORIZON; m += 1) {
    netRevenue[m] += fleetRevenueNet[m];
    netCash[m] += fleetCashNet[m];
    cashGross[m] += fleetCashNet[m];
  }
  // Deferred revenue: cumulative net subscription cash minus cumulative recognised revenue.
  const deferredEnd = zeros();
  let deferred = 0;
  for (let m = 0; m < HORIZON; m += 1) {
    deferred = round2(deferred + netCash[m] - netRevenue[m]);
    deferredEnd[m] = deferred;
  }
  return {
    newBySku,
    activeBySku,
    cashGrossBySku,
    netRevenueBySku,
    netCashBySku,
    deferredEnd,
    transactions,
    activeAccountsTotal,
    fleetVessels,
    fleetRevenueNet,
    vatOutput,
    netRevenueTotal: netRevenue,
    cashGrossTotal: cashGross,
    netCashTotal: netCash,
    renewalCount,
  };
}

function buildInventory(ctx, scenario, params, unitsBySku, perSku, hardware, overrides) {
  const columns = {
    inventoryUnitsBegin: zeros(),
    purchasesUnits: zeros(),
    receiptsUnits: zeros(),
    unitsSold: zeros(),
    writeOffsUnits: zeros(),
    inventoryUnitsEnd: zeros(),
    inventoryPurchasesCash: zeros(),
    inventoryAssetCost: zeros(),
    inventoryPrepayments: zeros(),
    inventoryPayables: zeros(),
    inventoryCarryingCost: zeros(),
    inventoryWriteOffCost: zeros(),
    inventoryReceiptsCost: zeros(),
  };
  const perSkuInventory = {};
  const lead = Math.round(params.leadTimeMonths);
  const balanceLag = Math.round(params.balanceDueAfterMonths);
  for (const [skuId, units] of Object.entries(unitsBySku)) {
    const sku = (ctx.drivers.hardwareSkus ?? []).find((item) => item.id === skuId);
    const unitCost = perSku[skuId]?.unitCost;
    const orderUnits = zeros();
    const receipts = zeros();
    const begin = zeros();
    const end = zeros();
    const writeOffs = zeros();
    const writeOffCost = zeros();
    const depositPaid = zeros();
    const balancePaid = zeros();
    const prepayments = zeros();
    const payables = zeros();
    const orderCost = zeros();
    const receiptCost = zeros();
    const asset = zeros();
    const carrying = zeros();
    const expeditedCash = zeros();
    const expedited = zeros();
    const receiptCostPlanned = zeros();
    if (unitCost != null) {
      // Production plan: an order placed in month m is delivered after the declared lead time and
      // covers the forecast demand of the delivery month, rounded up to the declared MOQ.
      let plannedOnHand = 0;
      for (let deliveryMonth = 0; deliveryMonth < HORIZON; deliveryMonth += 1) {
        const demand = units[deliveryMonth] ?? 0;
        const targetBuffer =
          params.safetyStockMonths *
          (units[deliveryMonth + 1] ?? 0) *
          (overrides.inventoryOverstockMultiplier ?? 1);
        const needed = Math.max(0, demand + targetBuffer - plannedOnHand);
        const order = needed > 0 ? Math.ceil(needed / params.moqUnits) * params.moqUnits : 0;
        const orderMonth = deliveryMonth - lead;
        if (orderMonth >= 0) orderUnits[orderMonth] = order;
        receipts[deliveryMonth] = order;
        plannedOnHand = plannedOnHand + order - demand;
      }
      for (let m = 0; m < HORIZON; m += 1) {
        orderCost[m] = round2(orderUnits[m] * unitCost);
        depositPaid[m] = round2(orderCost[m] * (params.supplierDepositPct / 100));
      }
      let previousEnd = 0;
      for (let m = 0; m < HORIZON; m += 1) {
        begin[m] = previousEnd;
        const sold = units[m];
        // Never allow negative stock: an unplanned shortfall is expedited and paid on receipt.
        const shortfall = Math.max(0, sold - (previousEnd + receipts[m]));
        if (shortfall > 0) {
          receipts[m] += shortfall;
          expedited[m] = shortfall;
          expeditedCash[m] = round2(shortfall * unitCost);
        }
        const available = previousEnd + receipts[m];
        const writeOff = Math.min(
          Math.max(0, available - sold),
          Math.round(((params.obsolescencePctPerYear / 100) * available) / 12),
        );
        const ending = available - sold - writeOff;
        writeOffCost[m] = round2(writeOff * unitCost);
        end[m] = ending;
        writeOffs[m] = writeOff;
        receiptCost[m] = round2(receipts[m] * unitCost);
        receiptCostPlanned[m] = round2((receipts[m] - shortfall) * unitCost);
        const dueMonth = m - balanceLag;
        if (dueMonth >= 0) {
          balancePaid[m] = round2(
            receiptCostPlanned[dueMonth] * (1 - params.supplierDepositPct / 100),
          );
        }
        asset[m] = round2(ending * unitCost);
        carrying[m] = round2((asset[m] * params.inventoryCarryingPctPerYear) / 100 / 12);
        previousEnd = ending;
      }
      for (let m = 0; m < HORIZON; m += 1) {
        columns.inventoryUnitsBegin[m] += begin[m];
        columns.purchasesUnits[m] += orderUnits[m] + expedited[m];
        columns.receiptsUnits[m] += receipts[m];
        columns.unitsSold[m] += units[m];
        columns.writeOffsUnits[m] += writeOffs[m];
        columns.inventoryUnitsEnd[m] += end[m];
        columns.inventoryPurchasesCash[m] += depositPaid[m] + balancePaid[m] + expeditedCash[m];
        columns.inventoryAssetCost[m] += asset[m];
        columns.inventoryPrepayments[m] += prepayNowForMonth(
          orderUnits,
          lead,
          unitCost,
          params.supplierDepositPct,
          m,
        );
        columns.inventoryPayables[m] += payableForMonth(
          receiptCostPlanned,
          balanceLag,
          params.supplierDepositPct,
          m,
        );
        columns.inventoryCarryingCost[m] += carrying[m];
        columns.inventoryWriteOffCost[m] += writeOffCost[m];
        columns.inventoryReceiptsCost[m] += receiptCost[m];
      }
      perSkuInventory[skuId] = {
        begin,
        orderUnits,
        receipts,
        sold: units,
        writeOffs,
        end,
        unitCost,
        depositPaid,
        balancePaid,
        purchasesCash: depositPaid.map((value, m) =>
          round2(value + balancePaid[m] + expeditedCash[m]),
        ),
        asset,
        carrying,
      };
    } else {
      perSkuInventory[skuId] = null;
    }
  }
  // Aggregate COGS from sold units at the declared unit cost.
  const cogs = zeros();
  for (const sku of ctx.drivers.hardwareSkus ?? []) {
    const cost = perSku[sku.id]?.unitCost;
    if (cost == null) continue;
    for (let m = 0; m < HORIZON; m += 1) cogs[m] += (unitsBySku[sku.id]?.[m] ?? 0) * cost;
  }
  columns.cogsHardware = cogs.map(round2);
  return { columns, perSkuInventory };
}

function expeditedUnits(receipts, orderUnits, month) {
  // Units received above the planned order are expedited purchases, already counted in receipts.
  return Math.max(0, receipts[month] - orderUnits[month]);
}

function prepayNowForMonth(orderUnits, lead, unitCost, depositPct, month) {
  let unitsInTransit = 0;
  for (let orderMonth = 0; orderMonth <= month; orderMonth += 1) {
    const delivery = orderMonth + lead;
    if (delivery > month) unitsInTransit += orderUnits[orderMonth];
  }
  return round2(unitsInTransit * unitCost * (depositPct / 100));
}

function payableForMonth(receiptCostPlanned, balanceLag, depositPct, month) {
  let outstanding = 0;
  for (let delivery = 0; delivery <= month; delivery += 1) {
    if (delivery + balanceLag > month) {
      outstanding += receiptCostPlanned[delivery] * (1 - depositPct / 100);
    }
  }
  return round2(outstanding);
}

function buildOpex(ctx, scenario, params) {
  const lines = ctx.opex.costLines ?? [];
  const known = zeros();
  const unknownLines = [];
  for (const line of lines) {
    const amount =
      line.scenarioValues?.[scenario.id] ?? (line.scenarioValues ? null : line.monthlyAmountEur);
    if (amount == null) {
      unknownLines.push({
        id: line.id,
        category: line.category,
        reason: line.unknownReason ?? 'Unknown value; never treated as zero.',
      });
      continue;
    }
    const from = Math.max(1, line.appliesFromMonth ?? 1);
    const to = Math.min(HORIZON, line.appliesToMonth ?? HORIZON);
    for (let m = from; m <= to; m += 1) {
      const inflation = Math.pow(
        1 + params.opexInflationPctPerYear / 100,
        Math.floor((m - 1) / 12),
      );
      known[m - 1] += amount * inflation;
    }
  }
  // Stress-only lines: cybersecurity maintenance and similar named envelopes.
  return { fixedOpexEnvelope: known.map(round2), unknownLines };
}

function buildCapex(ctx, scenario, params, overrides) {
  const items = ctx.capex.items ?? [];
  const cash = zeros();
  const amortization = zeros();
  const unknownItems = [];
  const scenarioMultiplier = ctx.number(
    scenario.id === 'DOWNSIDE'
      ? 'ASM-MC13-039'
      : scenario.id === 'UPSIDE_HYPOTHETICAL'
        ? 'ASM-MC13-041'
        : 'ASM-MC13-040',
  );
  const delay = overrides.capexDelayMonths ?? 0;
  const fundingEnvelope = ctx.number('ASM-MC13-046');
  for (const item of items) {
    if (['WORKING_CAPITAL_NOT_CAPEX', 'RESERVE_NOT_SPENT'].includes(item.cashFlowTreatment)) {
      continue;
    }
    let amount = item.estimatedAmountEur;
    if (amount == null) {
      unknownItems.push({
        id: item.id,
        item: item.item,
        reason: item.blockingCondition ?? 'Unknown amount; not treated as zero.',
      });
      continue;
    }
    if (item.cashFlowTreatment === 'WORKING_CAPITAL_NOT_CAPEX') continue;
    amount = amount * scenarioMultiplier;
    if (overrides.capexMultiplier) amount *= overrides.capexMultiplier;
    const month = Math.max(1, (item.plannedMonth ?? 1) + delay);
    if (month <= HORIZON) cash[month - 1] += amount;
    const life = item.capitalizationMonths ?? 36;
    if (life > 0 && item.capitalizationTreatment !== 'EXPENSED') {
      const monthly = amount / life;
      for (let i = 0; i < life; i += 1) {
        const target = month + i;
        if (target > HORIZON) break;
        amortization[target - 1] += monthly;
      }
    }
  }
  for (const column of ['cash', 'amortization']) {
    void column;
  }
  // Contingency reserve is an analytical envelope, applied to known capex.
  const knownCapex = sum(cash);
  const contingencyPct = ctx.number('ASM-MC13-043');
  const contingency = round2((knownCapex * contingencyPct) / 100);
  return {
    capexCash: cash.map(round2),
    amortizationNonCash: amortization.map(round2),
    unknownItems,
    knownCapexTotalEur: round2(knownCapex),
    contingencyReserveEur: contingency,
    fundingEnvelopeEur: round2(fundingEnvelope * (overrides.fundingEnvelopeMultiplier ?? 1)),
  };
}

function buildHypotheticalScenario(ctx, scenario, overrides = {}) {
  scenario = applyScenarioOverrides(scenario, overrides);
  const params = effectiveParams(ctx, scenario, overrides);
  const hardware = buildHardwareBlock(ctx, scenario, params, overrides);
  const subscriptions = buildSubscriptionBlock(ctx, scenario, params, overrides);
  const inventory = buildInventory(
    ctx,
    scenario,
    params,
    hardware.unitsBySku,
    hardware.perSku,
    hardware,
    overrides,
  );
  const opex = buildOpex(ctx, scenario, params);
  const capex = buildCapex(ctx, scenario, params, overrides);
  // Devices in field and recurring direct costs.
  const deviceFamilies = ['HUB', 'AIS', 'SENSE', 'WATCH', 'DISPLAY'];
  const deviceCosts = zeros();
  const inactiveDeviceCosts = zeros();
  const devicesInField = {};
  for (const family of deviceFamilies) {
    devicesInField[family] = zeros();
  }
  const cumulativeSoldByFamily = {};
  for (const family of deviceFamilies) cumulativeSoldByFamily[family] = zeros();
  for (const sku of ctx.drivers.hardwareSkus ?? []) {
    if (sku.modelEnabled === false) continue;
    if (!deviceFamilies.includes(sku.familyId)) continue;
    const units = hardware.unitsBySku[sku.id] ?? zeros();
    let inField = 0;
    let cumulative = 0;
    const cellular = sku.familyId === 'WATCH' ? params.cellularPerDeviceMonth : 0;
    const notifications = sku.familyId === 'WATCH' ? params.notificationsPerDeviceMonth : 0;
    const perDevice = params.cloudPerDeviceMonth + cellular + notifications;
    for (let m = 0; m < HORIZON; m += 1) {
      inField = inField * (1 - ctx.number('ASM-MC13-038') / 100 / 12) + units[m];
      cumulative += units[m];
      devicesInField[sku.familyId][m] += inField;
      cumulativeSoldByFamily[sku.familyId][m] += cumulative;
      deviceCosts[m] += inField * perDevice;
      const inactive = cumulative - inField;
      inactiveDeviceCosts[m] +=
        inactive * params.cloudPerDeviceMonth * params.inactiveDeviceRetainedFactor;
    }
  }
  // Account and vessel recurring costs, support and retained inactive accounts.
  const accountCosts = zeros();
  const vesselCosts = zeros();
  const activeAccounts = subscriptions.activeAccountsTotal;
  const fleetVessels = subscriptions.fleetVessels;
  for (let m = 0; m < HORIZON; m += 1) {
    accountCosts[m] =
      activeAccounts[m] * params.cloudPerAccountMonth +
      (activeAccounts[m] * params.supportPerAccountYear) / 12;
    vesselCosts[m] =
      fleetVessels[m] * params.cloudPerVesselMonth +
      (fleetVessels[m] * params.supportPerVesselYear) / 12;
  }
  const softwareDirectCosts = zeros();
  for (let m = 0; m < HORIZON; m += 1) {
    softwareDirectCosts[m] = round2(
      deviceCosts[m] +
        inactiveDeviceCosts[m] +
        accountCosts[m] +
        vesselCosts[m] +
        (overrides.cybersecurityMaintenanceEurPerYear
          ? overrides.cybersecurityMaintenanceEurPerYear / 12
          : 0),
    );
  }
  // NAV and WEATHER share one data-licence entitlement ledger. The real licence cost is UNKNOWN;
  // a stress case may declare a hypothetical unit cost, which is charged once per licensed account.
  const navActive = (ctx.drivers.subscriptionSkus ?? [])
    .filter((sku) => sku.familyId === 'NAV')
    .reduce((total, sku) => {
      const row = subscriptions.activeBySku[sku.id] ?? zeros();
      return total.map((value, m) => value + row[m]);
    }, zeros());
  const weatherActive = (ctx.drivers.subscriptionSkus ?? [])
    .filter((sku) => sku.familyId === 'WEATHER')
    .reduce((total, sku) => {
      const row = subscriptions.activeBySku[sku.id] ?? zeros();
      return total.map((value, m) => value + row[m]);
    }, zeros());
  const sharedLicensedAccounts = navActive.map((value, m) => Math.max(value, weatherActive[m]));
  if (overrides.dataLicenceCostEurPerAccountYear != null) {
    for (let m = 0; m < HORIZON; m += 1) {
      softwareDirectCosts[m] = round2(
        softwareDirectCosts[m] +
          (sharedLicensedAccounts[m] * overrides.dataLicenceCostEurPerAccountYear) / 12,
      );
    }
  }
  // Payment fees on gross cash transactions. App-store commission already covers its share.
  const subscriptionDirectShare =
    channelShare(scenario.channelMix, 'SUBSCRIPTION', 'DIRECT_TO_CONSUMER') || 1;
  const paymentFees = zeros();
  const paymentTransactions = zeros();
  for (let m = 0; m < HORIZON; m += 1) {
    const grossCash =
      hardware.grossInvoiced[m] + subscriptions.cashGrossTotal[m] * subscriptionDirectShare;
    const count = hardware.transactions[m] + subscriptions.transactions[m];
    paymentTransactions[m] = count;
    let fee = (grossCash * params.paymentFeePct) / 100 + count * params.paymentFeeFixedEur;
    if (overrides.paymentFeeMultiplier) fee *= overrides.paymentFeeMultiplier;
    paymentFees[m] = round2(fee);
  }

  const inputVat = inventory.columns.inventoryReceiptsCost.map((value) =>
    round2((value * params.vatPct * params.inputVatRecoverablePct) / 10000),
  );
  const grossInvoicedRevenue = zeros();
  const refundsAllowance = zeros();
  const vatOutput = zeros();
  const netRecognizedRevenue = zeros();
  const cogsHardware = inventory.columns.cogsHardware;
  const inventoryCarryingCost = inventory.columns.inventoryCarryingCost;
  const inventoryWriteOffCost = inventory.columns.inventoryWriteOffCost;
  for (let m = 0; m < HORIZON; m += 1) {
    grossInvoicedRevenue[m] = round2(hardware.grossInvoiced[m] + subscriptions.cashGrossTotal[m]);
    refundsAllowance[m] = round2(hardware.refundsAllowance[m]);
    vatOutput[m] = round2(hardware.vatOutput[m] + subscriptions.vatOutput[m]);
    netRecognizedRevenue[m] = round2(hardware.netRevenue[m] + subscriptions.netRevenueTotal[m]);
  }
  const fixedOpexEnvelope = opex.fixedOpexEnvelope;
  const knownVariableContribution = zeros();
  const ebitdaLikeConditional = zeros();
  for (let m = 0; m < HORIZON; m += 1) {
    knownVariableContribution[m] = round2(
      netRecognizedRevenue[m] -
        cogsHardware[m] -
        softwareDirectCosts[m] -
        paymentFees[m] -
        inventoryCarryingCost[m] -
        inventoryWriteOffCost[m],
    );
    ebitdaLikeConditional[m] = round2(knownVariableContribution[m] - fixedOpexEnvelope[m]);
  }
  const capexCash = capex.capexCash;
  // VAT paid with the declared lag, net of recoverable input VAT, with credit carry-forward.
  const vatPaid = zeros();
  let vatCredit = 0;
  for (let m = 0; m < HORIZON; m += 1) {
    const lagged = m - Math.round(params.vatPaymentLagMonths);
    const outputDue = lagged >= 0 ? vatOutput[lagged] : 0;
    const inputRecoverable = lagged >= 0 ? inputVat[lagged] : 0;
    let due = outputDue - inputRecoverable + vatCredit;
    if (due < 0) {
      vatCredit = due;
      due = 0;
    } else {
      vatCredit = 0;
    }
    vatPaid[m] = round2(due);
  }
  // Cash receipts: direct/installer hardware in month, distributor after the lag; subscriptions as
  // collected. Distributor receipts already include VAT; direct receipts are gross of VAT.
  const cashReceiptsGross = zeros();
  for (let m = 0; m < HORIZON; m += 1) {
    let directHardware = 0;
    for (const sku of ctx.drivers.hardwareSkus ?? []) {
      const row = hardware.perSku[sku.id];
      if (!row) continue;
      directHardware += row.grossInvoiced[m] - row.distributorReceivable[m];
    }
    cashReceiptsGross[m] = round2(
      directHardware +
        hardware.distributorReceipts[m] +
        subscriptions.cashGrossTotal[m] -
        hardware.refundsCash[m],
    );
  }
  const cashCollectionsNetOfVat = zeros();
  const workingCapitalMovement = zeros();
  const operatingCashFlow = zeros();
  const investingCashFlow = zeros();
  const netCashFlow = zeros();
  const cumulativeCashBalance = zeros();
  const cashBurn = zeros();
  const financingRequirement = zeros();
  const inventoryPurchasesCash = inventory.columns.inventoryPurchasesCash;
  for (let m = 0; m < HORIZON; m += 1) {
    cashCollectionsNetOfVat[m] = round2(cashReceiptsGross[m] - vatPaid[m]);
    workingCapitalMovement[m] = round2(
      netRecognizedRevenue[m] -
        cashReceiptsGross[m] +
        vatPaid[m] +
        (inventoryPurchasesCash[m] - cogsHardware[m]) -
        inventoryWriteOffCost[m],
    );
    operatingCashFlow[m] = round2(ebitdaLikeConditional[m] - workingCapitalMovement[m]);
    investingCashFlow[m] = round2(-capexCash[m]);
    netCashFlow[m] = round2(operatingCashFlow[m] + investingCashFlow[m]);
    cumulativeCashBalance[m] = round2(
      (m === 0 ? 0 : cumulativeCashBalance[m - 1]) + netCashFlow[m],
    );
    cashBurn[m] = round2(Math.max(0, -cumulativeCashBalance[m]));
    financingRequirement[m] = round2(
      Math.max(m === 0 ? 0 : financingRequirement[m - 1], cashBurn[m]),
    );
  }
  const accountingOperatingResult = zeros();
  for (let m = 0; m < HORIZON; m += 1) {
    accountingOperatingResult[m] = round2(ebitdaLikeConditional[m] - capex.amortizationNonCash[m]);
  }
  const authorizedForSaleMask = zeros();
  const hypotheticalClearanceMask = zeros();
  for (let m = 0; m < HORIZON; m += 1) {
    const anyClearance = (scenario.clearanceSchedule ?? []).some(
      (entry) =>
        entry.hypotheticalClearanceMonth != null && m + 1 >= entry.hypotheticalClearanceMonth,
    );
    hypotheticalClearanceMask[m] = anyClearance ? 1 : 0;
  }
  const revenueSuppressedMask = zeros();
  // PILOT never generates demand: the safety gate never clears and no cost exists.
  const columns = {
    hardwareUnitsBySku: hardware.unitsBySku,
    subscriptionNewAccountsBySku: subscriptions.newBySku,
    subscriptionActiveAccountsBySku: subscriptions.activeBySku,
    fleetActiveVessels: subscriptions.fleetVessels,
    hardwareUnitsTotal: (() => {
      const total = zeros();
      for (const units of Object.values(hardware.unitsBySku)) {
        for (let m = 0; m < HORIZON; m += 1) total[m] += units[m];
      }
      return total;
    })(),
    grossInvoicedRevenue,
    refundsAllowance,
    vatOutput,
    hardwareVatOutput: hardware.vatOutput,
    subscriptionVatOutput: subscriptions.vatOutput,
    netRecognizedRevenue,
    hardwareRevenueNet: hardware.netRevenue.map(round2),
    subscriptionRevenueNet: subscriptions.netRevenueTotal.map(round2),
    cashReceiptsGross,
    refundsCash: hardware.refundsCash,
    directReceiptsGross: hardware.directReceiptsGross,
    distributorInvoicedGross: hardware.distributorInvoicedGross,
    distributorCollectionsGross: hardware.distributorCollectionsGross,
    subscriptionCashGross: subscriptions.cashGrossTotal,
    subscriptionCashNet: subscriptions.netCashTotal,
    deferredRevenueEnd: subscriptions.deferredEnd,
    sharedLicenceAccountMonths: sharedLicensedAccounts,
    tradeReceivablesEnd: hardware.tradeReceivablesEnd,
    cashCollectionsNetOfVat,
    paymentFees,
    paymentTransactions,
    cogsHardware,
    softwareDirectCosts,
    knownVariableContribution,
    fixedOpexEnvelope,
    ebitdaLikeConditional,
    amortizationNonCash: capex.amortizationNonCash,
    accountingOperatingResult,
    inventoryUnitsBegin: inventory.columns.inventoryUnitsBegin,
    purchasesUnits: inventory.columns.purchasesUnits,
    receiptsUnits: inventory.columns.receiptsUnits,
    unitsSold: inventory.columns.unitsSold,
    writeOffsUnits: inventory.columns.writeOffsUnits,
    inventoryUnitsEnd: inventory.columns.inventoryUnitsEnd,
    inventoryPurchasesCash,
    inventoryAssetCost: inventory.columns.inventoryAssetCost,
    inventoryPrepayments: inventory.columns.inventoryPrepayments,
    inventoryPayables: inventory.columns.inventoryPayables,
    inventoryCarryingCost,
    inventoryWriteOffCost,
    inventoryReceiptsCost: inventory.columns.inventoryReceiptsCost,
    inputVat,
    vatCollected: vatOutput,
    vatPaid,
    netVatCash: vatOutput.map((value, m) => round2(value - vatPaid[m])),
    capexCash,
    operatingCashFlow,
    investingCashFlow,
    workingCapitalMovement,
    netCashFlow,
    cumulativeCashBalance,
    cashBurn,
    financingRequirement,
    authorizedForSaleMask,
    hypotheticalClearanceMask,
    revenueSuppressedMask,
  };
  const namedUnknowns = [
    {
      column: 'softwareDirectCosts',
      reason:
        'Excludes unknown chart/weather data-licence cost and FLEET onboarding/DPA/SLA cost. The amounts are not zero; they are absent.',
    },
    {
      column: 'fixedOpexEnvelope',
      reason:
        'Excludes unknown product-liability insurance premium and CRA/security-maintenance lifecycle cost.',
    },
    {
      column: 'financingRequirement',
      reason:
        'Excludes unknown capex/certification items and unknown recurring costs; the true financing requirement is higher than the conditional figure.',
    },
    ...opex.unknownLines.map((line) => ({ column: `opex:${line.id}`, reason: line.reason })),
    ...capex.unknownItems.map((item) => ({ column: `capex:${item.id}`, reason: item.reason })),
  ];
  const inventoryUnknowns = Object.entries(inventory.perSkuInventory)
    .filter(([, value]) => value == null)
    .map(([skuId]) => ({
      column: `inventory:${skuId}`,
      reason:
        'No known variable unit cost; inventory cash cannot be modelled without inventing one.',
    }));
  return {
    scenarioId: scenario.id,
    eligibilityCase: scenario.eligibilityCase,
    statusFlags: scenario.statusFlags,
    columns,
    suppression: null,
    unknowns: [...namedUnknowns, ...inventoryUnknowns],
    deferredRevenueEnd: subscriptions.deferredEnd,
    unitCostBySku: Object.fromEntries(
      Object.entries(hardware.perSku).map(([skuId, row]) => [skuId, row.unitCost]),
    ),
    namedUnknowns,
    supporting: {
      devicesInField,
      cumulativeSoldByFamily,
      hardwarePerSku: hardware.perSku,
      inventoryPerSku: inventory.perSkuInventory,
      subscriptionCashNetBySku: subscriptions.netCashBySku,
      subscriptionRevenueNetBySku: subscriptions.netRevenueBySku,
      fleetRevenueNet: subscriptions.fleetRevenueNet,
      subscriptionActiveBySku: subscriptions.activeBySku,
      subscriptionNewBySku: subscriptions.newBySku,
      renewalCount: subscriptions.renewalCount,
      capexKnownTotalEur: capex.knownCapexTotalEur,
      contingencyReserveEur: capex.contingencyReserveEur,
      fundingEnvelopeEur: capex.fundingEnvelopeEur,
      unknownOpex: opex.unknownLines,
      unknownCapex: capex.unknownItems,
      deviceCosts: deviceCosts.map(round2),
      inactiveDeviceCosts: inactiveDeviceCosts.map(round2),
      sharedLicensedAccounts,
      renewalRate: params.renewalRate,
      monthlyChurnRate: params.monthlyChurnRate,
      activationRate: params.activationRate,
    },
  };
}

/* --------------------------------------------------------------- aggregation */

function viewTotals(monthly, throughMonth) {
  const columns = monthly.columns;
  const slice = (values) => (values == null ? null : values.slice(0, throughMonth));
  const total = (values) => {
    if (values == null) return null;
    const sliceValues = values.slice(0, throughMonth);
    return sliceValues.some((value) => value == null) ? null : round2(sum(sliceValues));
  };
  const periodValue = (values) => (values == null ? null : values[throughMonth - 1]);
  const result = {
    grossInvoicedRevenue: total(columns.grossInvoicedRevenue),
    vatOutput: total(columns.vatOutput),
    netRecognizedRevenue: total(columns.netRecognizedRevenue),
    cashCollectionsNetOfVat: total(columns.cashCollectionsNetOfVat),
    hardwareRevenueNet: total(columns.hardwareRevenueNet),
    subscriptionRevenueNet: total(columns.subscriptionRevenueNet),
    contribution: total(columns.knownVariableContribution),
    fixedOpexEnvelope: total(columns.fixedOpexEnvelope),
    ebitdaLikeConditional: total(columns.ebitdaLikeConditional),
    amortizationNonCash: total(columns.amortizationNonCash),
    accountingOperatingResult: total(columns.accountingOperatingResult),
    capexCash: total(columns.capexCash),
    netCashFlow: total(columns.netCashFlow),
    cumulativeCashBalance: periodValue(columns.cumulativeCashBalance),
    financingRequirement: periodValue(columns.financingRequirement),
    paymentFees: total(columns.paymentFees),
    cogsHardware: total(columns.cogsHardware),
    softwareDirectCosts: total(columns.softwareDirectCosts),
    inventoryCarryingCost: total(columns.inventoryCarryingCost),
    inventoryPurchasesCash: total(columns.inventoryPurchasesCash),
    cashReceiptsGross: total(columns.cashReceiptsGross),
    vatPaid: total(columns.vatPaid),
    operatingCashFlow: total(columns.operatingCashFlow),
    investingCashFlow: total(columns.investingCashFlow),
    workingCapitalMovement: total(columns.workingCapitalMovement),
    tradeReceivablesEnd: periodValue(columns.tradeReceivablesEnd),
    inventoryUnitsEnd: periodValue(columns.inventoryUnitsEnd),
    unitsTotal: (() => {
      const totalUnits = columns.hardwareUnitsTotal?.slice(0, throughMonth);
      return totalUnits ? totalUnits.reduce((value, item) => value + item, 0) : null;
    })(),
    activeSubscriptions: (() => {
      const map = columns.subscriptionActiveAccountsBySku ?? {};
      const values = Object.values(map);
      if (!values.length) return null;
      return Object.keys(map).reduce((aggregate, skuId) => {
        const active = map[skuId][throughMonth - 1] ?? 0;
        return aggregate + active;
      }, 0);
    })(),
    fleetActiveVessels: columns.fleetActiveVessels?.[throughMonth - 1] ?? null,
    recurringRevenueSharePct: (() => {
      const hardware = total(columns.hardwareRevenueNet);
      const net = total(columns.netRecognizedRevenue);
      const recurring = total(columns.subscriptionRevenueNet);
      if (hardware == null || net == null || recurring == null || net === 0) return null;
      return round2((recurring / net) * 100);
    })(),
    hardwareRevenueSharePct: (() => {
      const hardware = total(columns.hardwareRevenueNet);
      const net = total(columns.netRecognizedRevenue);
      if (hardware == null || net == null || net === 0) return null;
      return round2((hardware / net) * 100);
    })(),
    monthlyArrays: null,
  };
  void slice;
  return result;
}

function viewMonthly(monthly, throughMonth) {
  const columns = monthly.columns;
  const get = (column) => {
    const values = columns[column];
    if (!Array.isArray(values)) return null;
    return values[throughMonth - 1];
  };
  return {
    month: `M${String(throughMonth).padStart(2, '0')}`,
    grossInvoicedRevenue: get('grossInvoicedRevenue'),
    netRecognizedRevenue: get('netRecognizedRevenue'),
    cashCollectionsNetOfVat: get('cashCollectionsNetOfVat'),
    contribution: get('knownVariableContribution'),
    ebitdaLikeConditional: get('ebitdaLikeConditional'),
    operatingCashFlow: get('operatingCashFlow'),
    netCashFlow: get('netCashFlow'),
    cumulativeCashBalance: get('cumulativeCashBalance'),
    financingRequirement: get('financingRequirement'),
  };
}

function firstMonth(values, predicate) {
  if (!values) return null;
  for (let m = 0; m < HORIZON; m += 1) {
    if (values[m] != null && predicate(values[m], m)) return m + 1;
  }
  return null;
}

function breakEvenForScenario(monthly) {
  const columns = monthly.columns;
  if (monthly.eligibilityCase === 'RESTRICTED_CURRENT') {
    return {
      operatingBreakEvenMonth: null,
      cashFlowBreakEvenMonth: null,
      cumulativeCashRecoveryMonth: null,
      financingRequirementEur: null,
      minimumCashInvestmentEur: null,
      status: 'CONDITIONAL_RESTRICTED_ZERO',
      note: 'No authorized sale exists in the current restricted case; break-even is not applicable.',
    };
  }
  const operatingBreakEvenMonth = firstMonth(columns.ebitdaLikeConditional, (value) => value >= 0);
  const cashFlowBreakEvenMonth = firstMonth(columns.operatingCashFlow, (value) => value > 0);
  let cumulativeRecovery = null;
  let sawNegative = false;
  for (let m = 0; m < HORIZON; m += 1) {
    const value = columns.cumulativeCashBalance[m];
    if (value == null) continue;
    if (value < 0) sawNegative = true;
    if (sawNegative && value >= 0) {
      cumulativeRecovery = m + 1;
      break;
    }
  }
  return {
    operatingBreakEvenMonth,
    cashFlowBreakEvenMonth,
    cumulativeCashRecoveryMonth: cumulativeRecovery,
    financingRequirementEur: columns.financingRequirement[HORIZON - 1],
    minimumCashInvestmentEur: columns.financingRequirement[HORIZON - 1],
    status: 'CONDITIONAL_HYPOTHETICAL_THRESHOLD',
    note:
      'Conditional threshold under labelled SCENARIO_ASSUMPTION demand, costs and clearance schedule. ' +
      'It is not a verified company break-even and excludes named unknown costs.',
  };
}

/* -------------------------------------------------------------- break-even DSL */

function buildBreakEven(ctx, monthlyModel, scenarioResults) {
  const thresholds = [];
  const vat = ctx.number('ASM-MC13-001');
  const consumer = (gross) => gross / (1 + vat / 100);
  const hardwareSkus = (ctx.drivers.hardwareSkus ?? []).filter((sku) => sku.modelEnabled !== false);
  const subscriptionSkus = (ctx.drivers.subscriptionSkus ?? []).filter(
    (sku) => sku.modelEnabled !== false,
  );
  const restricted = scenarioResults.scenarios.RESTRICTED_CURRENT;
  thresholds.push({
    id: 'BE-RESTRICTED-OPERATING',
    scenarioId: 'RESTRICTED_CURRENT',
    subjectType: 'PORTFOLIO',
    subjectId: 'MAREA',
    breakEvenType: 'OPERATING_BREAK_EVEN',
    value: null,
    unit: 'month',
    status: 'NOT_DETERMINABLE',
    derivation: 'No authorized sale exists; company expenses and cash are unknown.',
    requiredUnknownInputs: ['company current expenses', 'company cash position'],
    inputAssumptionIds: ['ASM-MC13-045'],
    notes: 'The restricted operating case cannot produce a break-even.',
  });
  void restricted;
  for (const scenarioId of HYPOTHETICAL_SCENARIOS) {
    const monthly = monthlyModel.scenarios[scenarioId];
    const be = breakEvenForScenario(monthly);
    const results = scenarioResults.scenarios[scenarioId];
    const fixedMonthly = be.fixedMonthlyOpex ?? null;
    void fixedMonthly;
    thresholds.push({
      id: `BE-${scenarioId}-OPERATING`,
      scenarioId,
      subjectType: 'PORTFOLIO',
      subjectId: 'MAREA',
      breakEvenType: 'OPERATING_BREAK_EVEN',
      value: be.operatingBreakEvenMonth,
      unit: 'month',
      status:
        be.operatingBreakEvenMonth == null
          ? 'CONDITIONAL_HYPOTHETICAL_THRESHOLD'
          : 'CONDITIONAL_HYPOTHETICAL_THRESHOLD',
      derivation:
        'First month with ebitdaLikeConditional >= 0 under the scenario assumptions; excludes named unknown costs.',
      requiredUnknownInputs: [
        'data licence cost',
        'product liability insurance',
        'CRA/security maintenance cost',
        'FLEET onboarding/DPA/SLA cost',
      ],
      inputAssumptionIds:
        ctx.scenarioDefinitions.scenarios.find((item) => item.id === scenarioId)
          ?.scenarioAssumptionIds ?? [],
      notes:
        be.operatingBreakEvenMonth == null
          ? 'No operating break-even month occurs within 60 periods; the threshold is not reached.'
          : 'Conditional hypothetical threshold, not a verified break-even.',
    });
    thresholds.push({
      id: `BE-${scenarioId}-CASHFLOW`,
      scenarioId,
      subjectType: 'PORTFOLIO',
      subjectId: 'MAREA',
      breakEvenType: 'CASH_FLOW_BREAK_EVEN',
      value: be.cashFlowBreakEvenMonth,
      unit: 'month',
      status: 'CONDITIONAL_HYPOTHETICAL_THRESHOLD',
      derivation: 'First month with operatingCashFlow > 0.',
      requiredUnknownInputs: ['data licence cost', 'insurance', 'CRA lifecycle cost'],
      inputAssumptionIds:
        ctx.scenarioDefinitions.scenarios.find((item) => item.id === scenarioId)
          ?.scenarioAssumptionIds ?? [],
      notes: 'Operating cash flow excludes capex; investing outflows are reported separately.',
    });
    thresholds.push({
      id: `BE-${scenarioId}-CUMULATIVE-RECOVERY`,
      scenarioId,
      subjectType: 'PORTFOLIO',
      subjectId: 'MAREA',
      breakEvenType: 'CUMULATIVE_CASH_RECOVERY',
      value: be.cumulativeCashRecoveryMonth,
      unit: 'month',
      status: 'CONDITIONAL_HYPOTHETICAL_THRESHOLD',
      derivation:
        'First month with cumulativeCashBalance >= 0 after a negative balance, starting from the declared zero opening-cash analysis convention.',
      requiredUnknownInputs: [
        'current company cash',
        'unknown capex items',
        'unknown recurring costs',
      ],
      inputAssumptionIds: ['ASM-MC13-044'],
      notes:
        'Not a verified cash recovery; the opening balance is an analysis convention, not the real company balance.',
    });
    thresholds.push({
      id: `BE-${scenarioId}-FINANCING`,
      scenarioId,
      subjectType: 'PORTFOLIO',
      subjectId: 'MAREA',
      breakEvenType: 'FINANCING_REQUIREMENT',
      value: be.financingRequirementEur,
      unit: 'EUR',
      status: 'CONDITIONAL_HYPOTHETICAL_THRESHOLD',
      derivation: 'Running maximum of max(0, -cumulativeCashBalance) over the 60 periods.',
      requiredUnknownInputs: [
        'unknown capex items',
        'unknown recurring costs',
        'unknown insurance',
      ],
      inputAssumptionIds: ['ASM-MC13-044'],
      notes:
        'Conditional minimum external cash under the scenario. It is not an approved budget, financing offer or investment requirement.',
    });
    void results;
    for (const sku of hardwareSkus) {
      const cost = sku.knownVariableCostEur;
      const factor = channelFactor(
        (
          ctx.scenarioDefinitions.scenarios.find((item) => item.id === scenarioId)?.channelMix ?? []
        ).filter((row) => row.appliesTo === 'HARDWARE'),
        'HARDWARE',
      );
      const netPrice =
        sku.priceHypothesis?.vatBasis === 'VAT_EXCLUDED_B2B'
          ? (sku.priceHypothesis?.grossAmountEur ?? 0) * factor
          : consumer((sku.priceHypothesis?.grossAmountEur ?? 0) * factor);
      const contribution = cost == null ? null : round2(netPrice - cost);
      const licensingBlocked = ['NAV', 'WEATHER'].includes(sku.familyId);
      const safetyBlocked = sku.familyId === 'PILOT';
      const costIncomplete = sku.costCompleteness === 'INCOMPLETE_UNKNOWN_COSTS';
      let status = 'CONDITIONAL_HYPOTHETICAL_THRESHOLD';
      const requiredUnknownInputs = [];
      if (safetyBlocked) {
        status = 'NOT_DETERMINABLE';
        requiredUnknownInputs.push('PILOT safety case and cost scope');
      } else if (licensingBlocked) {
        status = 'NOT_DETERMINABLE';
        requiredUnknownInputs.push('chart/weather data licence cost');
      } else if (cost == null) {
        status = 'NOT_DETERMINABLE';
        requiredUnknownInputs.push('known variable unit cost');
      }
      if (costIncomplete && status !== 'NOT_DETERMINABLE') {
        requiredUnknownInputs.push(
          ...(sku.unknownCostCategories?.map((item) => item.category) ?? []),
        );
      }
      thresholds.push({
        id: `BE-${scenarioId}-UNIT-${sku.id}`,
        scenarioId,
        subjectType: 'SKU',
        subjectId: sku.id,
        breakEvenType: 'UNIT_CONTRIBUTION_ZERO',
        value: contribution,
        unit: 'EUR per unit',
        status,
        derivation:
          'net unit revenue ex-VAT after channel deductions minus the declared known variable unit cost. ' +
          'Fixed tooling/NRE and certification are excluded and never added back.',
        requiredUnknownInputs,
        inputAssumptionIds: [sku.costBasis?.sourceRecordId].filter(Boolean),
        notes: `${sku.notes ?? ''} Prices remain HYPOTHESIS_UNAPPROVED.`,
      });
      if (cost != null) {
        thresholds.push({
          id: `BE-${scenarioId}-PRICE-${sku.id}`,
          scenarioId,
          subjectType: 'SKU',
          subjectId: sku.id,
          breakEvenType: 'MINIMUM_GROSS_PRICE',
          value: round2(
            sku.priceHypothesis?.vatBasis === 'VAT_EXCLUDED_B2B'
              ? cost / Math.max(factor, 0.01)
              : (cost / Math.max(factor, 0.01)) * (1 + vat / 100),
          ),
          unit: 'EUR gross',
          status: costIncomplete
            ? 'CONDITIONAL_HYPOTHETICAL_THRESHOLD'
            : 'CONDITIONAL_HYPOTHETICAL_THRESHOLD',
          derivation:
            'Known variable unit cost divided by the channel factor, then grossed up for VAT where the hypothesis is VAT-inclusive. ' +
            'Excludes fixed costs and unknown costs.',
          requiredUnknownInputs: costIncomplete ? ['unsupported edition-specific cost'] : [],
          inputAssumptionIds: [sku.costBasis?.sourceRecordId].filter(Boolean),
          notes:
            'Minimum price to reach zero unit contribution on known costs; not a recommended price.',
        });
      }
    }
    for (const sku of subscriptionSkus) {
      if (sku.familyId === 'FLEET') continue;
      const annualGross = sku.priceHypothesis?.grossAmountEur ?? 0;
      const factor = channelFactor(
        (
          ctx.scenarioDefinitions.scenarios.find((item) => item.id === scenarioId)?.channelMix ?? []
        ).filter((row) => row.appliesTo === 'SUBSCRIPTION'),
        'SUBSCRIPTION',
      );
      const netAnnual =
        sku.priceHypothesis?.vatBasis === 'VAT_EXCLUDED_B2B'
          ? annualGross * factor
          : consumer(annualGross * factor);
      const directCost = sku.knownDirectCostEurPerYear;
      const contribution = directCost == null ? null : round2(netAnnual - directCost);
      const licensingBlocked = ['NAV', 'WEATHER'].includes(sku.familyId);
      const status =
        licensingBlocked || directCost == null
          ? 'NOT_DETERMINABLE'
          : 'CONDITIONAL_HYPOTHETICAL_THRESHOLD';
      const thresholdValue = licensingBlocked || directCost == null ? null : contribution;
      thresholds.push({
        id: `BE-${scenarioId}-SUB-${sku.id}`,
        scenarioId,
        subjectType: 'SUBSCRIPTION',
        subjectId: sku.id,
        breakEvenType: 'UNIT_CONTRIBUTION_ZERO',
        value: thresholdValue,
        unit: 'EUR per account-year',
        status,
        derivation:
          'net annual subscription revenue ex-VAT after channel deductions minus the known direct account cost. Unknown data licence excluded.',
        requiredUnknownInputs: licensingBlocked
          ? ['chart/weather data licence cost']
          : directCost == null
            ? ['known direct recurring cost']
            : [],
        inputAssumptionIds: [sku.costBasis?.sourceRecordId].filter(Boolean),
        notes: 'Excludes unknown data licence, onboarding, DPA and SLA costs.',
      });
    }
    // FLEET per-vessel threshold.
    const fleet = subscriptionSkus.find((sku) => sku.familyId === 'FLEET');
    if (fleet) {
      const netMonthly = fleet.priceHypothesis?.grossAmountEur ?? 0;
      const knownCostYear = fleet.knownDirectCostEurPerYear ?? 0;
      thresholds.push({
        id: `BE-${scenarioId}-FLEET-VESSELS`,
        scenarioId,
        subjectType: 'FLEET',
        subjectId: fleet.id,
        breakEvenType: 'UNIT_CONTRIBUTION_ZERO',
        value: round2(netMonthly - knownCostYear / 12),
        unit: 'EUR per vessel-month',
        status: 'CONDITIONAL_HYPOTHETICAL_THRESHOLD',
        derivation:
          'net per-vessel monthly revenue ex-VAT minus known monthly direct cost; excludes cloud tenancy beyond the declared driver and onboarding/SLA cost.',
        requiredUnknownInputs: [
          'FLEET onboarding/DPA/SLA cost',
          'telemetry volume above the declared driver',
        ],
        inputAssumptionIds: [fleet.costBasis?.sourceRecordId].filter(Boolean),
        notes: 'Conditional; no FLEET contract, SLA or hardware exists.',
      });
    }
    // Fixed-cost coverage on the BASE_HYPOTHETICAL cost envelope.
    if (scenarioId === 'BASE_HYPOTHETICAL') {
      const monthly = monthlyModel.scenarios[scenarioId];
      const fixedOpex = monthly.supporting.fixedOpexEnvelope;
      void fixedOpex;
      const averageFixed =
        monthly.columns.fixedOpexEnvelope[HORIZON - 1] ?? monthly.columns.fixedOpexEnvelope[11];
      const unitContributions = hardwareSkus
        .map((sku) => {
          const cost = sku.knownVariableCostEur;
          if (cost == null) return null;
          const factor = channelFactor(
            (
              ctx.scenarioDefinitions.scenarios.find((item) => item.id === scenarioId)
                ?.channelMix ?? []
            ).filter((row) => row.appliesTo === 'HARDWARE'),
            'HARDWARE',
          );
          const netPrice =
            sku.priceHypothesis?.vatBasis === 'VAT_EXCLUDED_B2B'
              ? (sku.priceHypothesis?.grossAmountEur ?? 0) * factor
              : consumer((sku.priceHypothesis?.grossAmountEur ?? 0) * factor);
          return netPrice - cost;
        })
        .filter((value) => value != null);
      const averageUnitContribution = round2(
        sum(unitContributions) / Math.max(1, unitContributions.length),
      );
      thresholds.push({
        id: 'BE-BASE-FIXED-COST-UNITS',
        scenarioId,
        subjectType: 'PORTFOLIO',
        subjectId: 'MIXED_HARDWARE_PORTFOLIO',
        breakEvenType: 'OPERATING_BREAK_EVEN',
        value:
          averageUnitContribution > 0 ? Math.ceil(averageFixed / averageUnitContribution) : null,
        unit: 'units per month',
        status:
          averageUnitContribution > 0 ? 'CONDITIONAL_HYPOTHETICAL_THRESHOLD' : 'NOT_DETERMINABLE',
        derivation:
          'average fixed monthly opex envelope divided by the simple average known hardware unit contribution. ' +
          'A mixed portfolio is used only as a conditional illustration, not a demand forecast.',
        requiredUnknownInputs: [
          'insurance',
          'CRA lifecycle cost',
          'data licence cost',
          'actual demand',
        ],
        inputAssumptionIds: (ctx.opex.costLines ?? [])
          .map((line) => line.assumptionId)
          .filter(Boolean),
        scenarioAssumptionIds: ['ASM-MC13-021', 'ASM-MC13-024', 'ASM-MC13-027'],
        notes: 'Fixed-cost coverage on known costs only; excludes named unknown fixed costs.',
      });
      thresholds.push({
        id: 'BE-BASE-SUBSCRIBERS',
        scenarioId,
        subjectType: 'SUBSCRIPTION',
        subjectId: 'MIXED_SUBSCRIPTION_PORTFOLIO',
        breakEvenType: 'OPERATING_BREAK_EVEN',
        value: null,
        unit: 'active paying subscriptions',
        status: 'NOT_DETERMINABLE',
        derivation:
          'A portfolio subscriber count cannot be derived while the NAV/WEATHER data-licence cost is unknown and the subscription mix/renewal is unvalidated.',
        requiredUnknownInputs: [
          'data licence cost',
          'validated subscription mix',
          'validated churn/renewal',
        ],
        inputAssumptionIds: ['ASM-MC13-020', 'ASM-MC13-021', 'ASM-MC13-022', 'ASM-MC13-049'],
        scenarioAssumptionIds: ['ASM-MC13-021', 'ASM-MC13-024', 'ASM-MC13-027'],
        notes: 'Reported as not determinable rather than inventing a subscriber number.',
      });
    }
  }
  // Minimum cash investment on the base hypothetical case is the base financing requirement.
  const baseBe = breakEvenForScenario(monthlyModel.scenarios.BASE_HYPOTHETICAL);
  thresholds.push({
    id: 'BE-BASE-MINIMUM-CASH-INVESTMENT',
    scenarioId: 'BASE_HYPOTHETICAL',
    subjectType: 'PORTFOLIO',
    subjectId: 'MAREA',
    breakEvenType: 'FINANCING_REQUIREMENT',
    value: baseBe.financingRequirementEur,
    unit: 'EUR',
    status: 'CONDITIONAL_HYPOTHETICAL_THRESHOLD',
    derivation: 'Base hypothetical maximum cash drawdown before cumulative recovery.',
    requiredUnknownInputs: [
      'unknown capex items',
      'insurance',
      'CRA lifecycle cost',
      'data licence cost',
    ],
    inputAssumptionIds: ['ASM-MC13-044'],
    notes:
      'Conditional minimum external cash; excludes named unknown costs and is not an approved budget.',
  });
  return {
    contractId: 'MAREA-MC13-BREAK-EVEN-THRESHOLDS',
    contractVersion: '1.0.0',
    milestone: 'MC-13',
    date: '2026-11-02',
    owner: 'financial-architecture',
    currency: 'EUR',
    asOf: '2026-11-02',
    thresholds,
    summary: {
      unitContributionZero: thresholds.filter(
        (item) => item.breakEvenType === 'UNIT_CONTRIBUTION_ZERO',
      ).length,
      operatingBreakEven: thresholds.filter((item) => item.breakEvenType === 'OPERATING_BREAK_EVEN')
        .length,
      cashFlowBreakEven: thresholds.filter((item) => item.breakEvenType === 'CASH_FLOW_BREAK_EVEN')
        .length,
      cumulativeCashRecovery: thresholds.filter(
        (item) => item.breakEvenType === 'CUMULATIVE_CASH_RECOVERY',
      ).length,
      financingRequirement: thresholds.filter(
        (item) => item.breakEvenType === 'FINANCING_REQUIREMENT',
      ).length,
      minimumGrossPrice: thresholds.filter((item) => item.breakEvenType === 'MINIMUM_GROSS_PRICE')
        .length,
      notDeterminable: thresholds.filter((item) => item.status === 'NOT_DETERMINABLE').length,
      conditional: thresholds.filter((item) => item.status === 'CONDITIONAL_HYPOTHETICAL_THRESHOLD')
        .length,
      verified: 0,
    },
  };
}

/* ------------------------------------------------------------------ scenarios */

function buildMonthlyModel(ctx) {
  const scenarios = {};
  for (const scenarioId of SCENARIO_IDS) {
    const scenario = ctx.scenarios.get(scenarioId);
    if (!scenario) throw new Error(`MC-13 engine: missing scenario ${scenarioId}`);
    scenarios[scenarioId] =
      scenario.eligibilityCase === 'RESTRICTED_CURRENT'
        ? buildRestrictedScenario(ctx, scenario)
        : buildHypotheticalScenario(ctx, scenario);
  }
  return {
    contractId: 'MAREA-MC13-MONTHLY-FINANCIAL-MODEL',
    contractVersion: '1.0.0',
    milestone: 'MC-13',
    date: '2026-11-02',
    owner: 'financial-architecture',
    currency: 'EUR',
    asOf: '2026-11-02',
    format: 'COLUMNAR_V1',
    horizonMonths: HORIZON,
    periods: PERIODS,
    openingCashConventionEur: ctx.number('ASM-MC13-044'),
    scenarios,
    lineage: buildLineage(ctx),
  };
}

function buildLineage(ctx) {
  const blocks = {
    demand: ['TRF-MC13-001'],
    revenue: ['TRF-MC13-002'],
    vat: ['TRF-MC13-003'],
    subscriptions: ['TRF-MC13-004'],
    cogs: ['TRF-MC13-005'],
    inventory: ['TRF-MC13-006'],
    opex: ['TRF-MC13-007'],
    capex: ['TRF-MC13-008'],
    cashFlow: ['TRF-MC13-009'],
    breakEven: ['TRF-MC13-010'],
    stress: ['TRF-MC13-011'],
    scenarios: ['TRF-MC13-012'],
  };
  void ctx;
  return { columnBlocks: blocks };
}

function buildScenarioResults(monthlyModel) {
  const scenarios = {};
  for (const scenarioId of SCENARIO_IDS) {
    const monthly = monthlyModel.scenarios[scenarioId];
    const views = {
      M12: viewTotals(monthly, 12),
      M36: viewTotals(monthly, 36),
      M60: viewTotals(monthly, 60),
    };
    const be = breakEvenForScenario(monthly);
    scenarios[scenarioId] = {
      scenarioId,
      eligibilityCase: monthly.eligibilityCase,
      statusFlags: monthly.statusFlags,
      views,
      monthly: Object.fromEntries(
        [12, 36, 60].map((month) => [`M${month}`, viewMonthly(monthly, month)]),
      ),
      breakEven: be,
      recurringRevenueExposurePct: views.M60.recurringRevenueSharePct,
      productMix: {
        hardwareRevenueNetM60: views.M60.hardwareRevenueNet,
        subscriptionRevenueNetM60: views.M60.subscriptionRevenueNet,
      },
      unknownCostsExcluded: monthly.unknowns,
      suppression: monthly.suppression,
    };
  }
  return {
    contractId: 'MAREA-MC13-SCENARIO-RESULTS',
    contractVersion: '1.0.0',
    milestone: 'MC-13',
    date: '2026-11-02',
    owner: 'financial-architecture',
    currency: 'EUR',
    asOf: '2026-11-02',
    viewsMonths: [12, 36, 60],
    scenarios,
  };
}

/* ------------------------------------------------------------------- stresses */

function runStressCase(ctx, definition) {
  const scenario = ctx.scenarios.get(definition.baseScenarioId ?? 'BASE_HYPOTHETICAL');
  const monthly = buildHypotheticalScenario(ctx, scenario, definition.overrides ?? {});
  const results = {
    M12: viewTotals(monthly, 12),
    M36: viewTotals(monthly, 36),
    M60: viewTotals(monthly, 60),
  };
  const be = breakEvenForScenario(monthly);
  const financing = be.financingRequirementEur;
  const fundingEnvelope = monthly.supporting.fundingEnvelopeEur;
  const cumulativeEnd = monthly.columns.cumulativeCashBalance[HORIZON - 1];
  const unitContribution = monthly.columns.knownVariableContribution[HORIZON - 1];
  const unitsSold = monthly.columns.hardwareUnitsTotal.reduce((total, value) => total + value, 0);
  const baseScenario = ctx.scenarios.get(definition.baseScenarioId ?? 'BASE_HYPOTHETICAL');
  const hardwareFactor = channelFactor(
    baseScenario?.channelMix?.filter((row) => row.appliesTo === 'HARDWARE'),
    'HARDWARE',
  );
  const vatPct = ctx.number('ASM-MC13-001');
  const unitContributions = (ctx.drivers.hardwareSkus ?? [])
    .filter((sku) => sku.modelEnabled !== false && sku.knownVariableCostEur != null)
    .map((sku) => {
      const gross = (sku.priceHypothesis?.grossAmountEur ?? 0) * hardwareFactor;
      const net =
        sku.priceHypothesis?.vatBasis === 'VAT_EXCLUDED_B2B' ? gross : gross / (1 + vatPct / 100);
      return net - sku.knownVariableCostEur;
    });
  const averageUnitContribution =
    unitContributions.length > 0 ? sum(unitContributions) / unitContributions.length : null;
  return {
    scenarioId: definition.baseScenarioId ?? 'BASE_HYPOTHETICAL',
    results,
    breakEvenMonths: {
      operating: be.operatingBreakEvenMonth,
      cashFlow: be.cashFlowBreakEvenMonth,
      cumulativeRecovery: be.cumulativeCashRecoveryMonth,
    },
    financingRequirementEur: financing,
    fundingEnvelopeEur: fundingEnvelope,
    fundingGapEur:
      financing != null && fundingEnvelope != null
        ? round2(Math.max(0, financing - fundingEnvelope))
        : null,
    cumulativeCashEndEur: cumulativeEnd,
    unitContributionEndEur: unitContribution,
    unitsSold,
    viabilityCollapsed: cumulativeEnd != null && cumulativeEnd < 0,
    cashRecoveryWithinHorizon: be.cumulativeCashRecoveryMonth != null,
    averageUnitContributionEur: round2(averageUnitContribution),
    unitContributionStillPositive: averageUnitContribution != null && averageUnitContribution > 0,
    aggregateContributionPositive: unitContribution != null && unitContribution > 0,
    insolventWithoutFunding:
      financing != null && fundingEnvelope != null && financing > fundingEnvelope,
  };
}

function buildStressTests(ctx) {
  const baseDefinition = {
    id: 'BASE_REFERENCE',
    baseScenarioId: 'BASE_HYPOTHETICAL',
    overrides: {},
  };
  const baseReference = runStressCase(ctx, baseDefinition);
  const cases = (ctx.stressCases ?? []).map((definition) => {
    const result = runStressCase(ctx, definition);
    return {
      id: definition.id,
      label: definition.label,
      baseScenarioId: definition.baseScenarioId ?? 'BASE_HYPOTHETICAL',
      rationale: definition.rationale,
      evidenceClass: definition.evidenceClass ?? 'SCENARIO_ASSUMPTION',
      overrides: definition.overrides ?? {},
      ...result,
      cumulativeCashDeltaVsBaseEur: round2(
        result.cumulativeCashEndEur - baseReference.cumulativeCashEndEur,
      ),
      financingRequirementDeltaVsBaseEur: round2(
        result.financingRequirementEur - baseReference.financingRequirementEur,
      ),
      relativeViability:
        result.cumulativeCashEndEur < baseReference.cumulativeCashEndEur - 0.005
          ? 'WORSE_THAN_BASE'
          : result.cumulativeCashEndEur > baseReference.cumulativeCashEndEur + 0.005
            ? 'BETTER_THAN_BASE'
            : 'EQUAL_TO_BASE',
      status: 'CONDITIONAL_HYPOTHETICAL',
    };
  });
  return {
    contractId: 'MAREA-MC13-STRESS-TESTS',
    contractVersion: '1.0.0',
    milestone: 'MC-13',
    date: '2026-11-02',
    owner: 'financial-architecture',
    currency: 'EUR',
    asOf: '2026-11-02',
    cases,
    summary: {
      cases: cases.length,
      cashRecoveryMissed: cases.filter((item) => !item.cashRecoveryWithinHorizon).length,
      unitContributionPositiveButCollapsed: cases.filter(
        (item) =>
          !item.cashRecoveryWithinHorizon &&
          item.unitContributionStillPositive &&
          item.aggregateContributionPositive,
      ).length,
      aggregateContributionPositiveButCashNeverRecovers: cases.filter(
        (item) => !item.cashRecoveryWithinHorizon && item.aggregateContributionPositive,
      ).length,
      fundingGap: cases.filter((item) => (item.fundingGapEur ?? 0) > 0).length,
      baseReference: {
        cumulativeCashEndEur: baseReference.cumulativeCashEndEur,
        financingRequirementEur: baseReference.financingRequirementEur,
        cashRecoveryWithinHorizon: baseReference.cashRecoveryWithinHorizon,
      },
    },
  };
}

/* ------------------------------------------------------------------ portfolio */

function buildPortfolioPrioritization(ctx, monthlyModel, scenarioResults) {
  const criteria = ctx.drivers.portfolioCriteria ?? {};
  const families = (ctx.drivers.productFamilies ?? []).map((family) => family.id);
  const base = monthlyModel.scenarios.BASE_HYPOTHETICAL;
  const downside = monthlyModel.scenarios.DOWNSIDE;
  const metrics = {};
  for (const familyId of families) {
    const hardwareSkus = (ctx.drivers.hardwareSkus ?? []).filter(
      (sku) => sku.familyId === familyId && sku.modelEnabled !== false,
    );
    const subSkus = (ctx.drivers.subscriptionSkus ?? []).filter(
      (sku) => sku.familyId === familyId && sku.modelEnabled !== false,
    );
    const vat = ctx.number('ASM-MC13-001');
    const best = { value: null, subjectId: null, type: null };
    const factorHardware = channelFactor(
      (
        ctx.scenarioDefinitions.scenarios.find((item) => item.id === 'BASE_HYPOTHETICAL')
          ?.channelMix ?? []
      ).filter((row) => row.appliesTo === 'HARDWARE'),
      'HARDWARE',
    );
    for (const sku of hardwareSkus) {
      if (sku.knownVariableCostEur == null || sku.priceHypothesis?.grossAmountEur == null) continue;
      const net =
        sku.priceHypothesis.vatBasis === 'VAT_EXCLUDED_B2B'
          ? sku.priceHypothesis.grossAmountEur * factorHardware
          : (sku.priceHypothesis.grossAmountEur * factorHardware) / (1 + vat / 100);
      const pct = ((net - sku.knownVariableCostEur) / net) * 100;
      if (best.value == null || pct > best.value) best.value = pct;
      best.subjectId = sku.id;
      best.type = 'HARDWARE_UNIT_CONTRIBUTION_PCT';
    }
    for (const sku of subSkus) {
      if (sku.knownDirectCostEurPerYear == null || sku.priceHypothesis?.grossAmountEur == null)
        continue;
      const net =
        sku.priceHypothesis.vatBasis === 'VAT_EXCLUDED_B2B'
          ? sku.priceHypothesis.grossAmountEur
          : sku.priceHypothesis.grossAmountEur / (1 + vat / 100);
      const pct = ((net - sku.knownDirectCostEurPerYear) / net) * 100;
      if (best.value == null || pct > best.value) {
        best.value = pct;
        best.subjectId = sku.id;
        best.type = 'SUBSCRIPTION_ANNUAL_CONTRIBUTION_PCT';
      }
    }
    const revenueByFamily = zeros();
    for (const sku of hardwareSkus) {
      const row = base.supporting.hardwarePerSku[sku.id];
      if (!row) continue;
      for (let m = 0; m < HORIZON; m += 1) revenueByFamily[m] += row.netRevenue[m];
    }
    for (const sku of subSkus) {
      const row = base.supporting.subscriptionRevenueNetBySku[sku.id];
      if (!row) continue;
      for (let m = 0; m < HORIZON; m += 1) revenueByFamily[m] += row[m];
    }
    if (familyId === 'FLEET' && base.supporting.fleetRevenueNet) {
      for (let m = 0; m < HORIZON; m += 1) revenueByFamily[m] += base.supporting.fleetRevenueNet[m];
    }
    const recurring =
      subSkus.reduce((total, sku) => {
        const row = base.supporting.subscriptionRevenueNetBySku[sku.id];
        return total + (row ? sum(row) : 0);
      }, 0) +
      (familyId === 'FLEET' && base.supporting.fleetRevenueNet
        ? sum(base.supporting.fleetRevenueNet)
        : 0);
    const downsideRevenue = (() => {
      let total = 0;
      for (const sku of hardwareSkus) {
        const row = downside.supporting.hardwarePerSku[sku.id];
        if (row) total += sum(row.netRevenue);
      }
      for (const sku of subSkus) {
        const row = downside.supporting.subscriptionRevenueNetBySku[sku.id];
        if (row) total += sum(row);
      }
      if (familyId === 'FLEET' && downside.supporting.fleetRevenueNet) {
        total += sum(downside.supporting.fleetRevenueNet);
      }
      return total;
    })();
    metrics[familyId] = {
      familyId,
      bestConditionalUnitContributionPct: best.value == null ? null : round2(best.value),
      bestConditionalUnitSubjectId: best.subjectId,
      bestConditionalUnitMetric: best.type,
      cumulativeRevenueNetM60Eur: round2(sum(revenueByFamily)),
      cumulativeRecurringRevenueNetM60Eur: round2(recurring),
      downsideCumulativeRevenueNetEur: round2(downsideRevenue),
      commercialAvailability: 'NOT_FOR_SALE',
      commercialAuthorization: criteria[familyId]?.commercialAuthorization ?? 'NOT_AUTHORIZED',
      licensingDependency: criteria[familyId]?.licensingDependency ?? null,
      evidenceReadinessScore: criteria[familyId]?.evidenceReadinessScore ?? null,
      implementationDependency: criteria[familyId]?.implementationDependency ?? null,
      capitalAllocationEur: criteria[familyId]?.capitalAllocationEur ?? null,
      inheritedMc12Classification: criteria[familyId]?.inheritedMc12Classification ?? null,
      inheritedMc12SourceId: criteria[familyId]?.inheritedMc12SourceId ?? null,
    };
  }
  const orderByDescending = (key) =>
    families
      .filter((familyId) => metrics[familyId][key] != null)
      .sort((a, b) => metrics[b][key] - metrics[a][key]);
  const orderByAscending = (key) =>
    families
      .filter((familyId) => metrics[familyId][key] != null)
      .sort((a, b) => metrics[a][key] - metrics[b][key]);
  const dimension = (id, label, direction, order, metric, notes) => ({
    id,
    label,
    direction,
    familyOrder: order,
    metricBasis: order.map((familyId) => ({
      familyId,
      value: metrics[familyId][metric],
      licensingBlocked: ['NAV', 'WEATHER'].includes(familyId),
      safetyBlocked: familyId === 'PILOT',
    })),
    notes,
  });
  const rankings = [
    dimension(
      'conditionalUnitEconomics',
      'Best conditional known unit economics',
      'DESCENDING',
      orderByDescending('bestConditionalUnitContributionPct'),
      'bestConditionalUnitContributionPct',
      'Known-cost contribution percentage before unknown licence cost. NAV and WEATHER are licensing-blocked: their figures are not actionable and must not be read as a launch ranking.',
    ),
    dimension(
      'initialCapitalRequirement',
      'Lowest hypothetical initial capital allocation',
      'ASCENDING',
      orderByAscending('capitalAllocationEur'),
      'capitalAllocationEur',
      'Analytical envelope allocation, not an approved budget or quotation.',
    ),
    dimension(
      'licensingDependency',
      'Lowest licensing/regulatory dependency',
      'ASCENDING',
      orderByAscending('licensingDependency'),
      'licensingDependency',
      'Curated 0-5 dependency score carried from MC-12 rights analysis.',
    ),
    dimension(
      'recurringRevenuePotential',
      'Strongest potential recurring revenue',
      'DESCENDING',
      orderByDescending('cumulativeRecurringRevenueNetM60Eur'),
      'cumulativeRecurringRevenueNetM60Eur',
      'Hypothetical cumulative subscription revenue over 60 periods under BASE_HYPOTHETICAL.',
    ),
    dimension(
      'downsideExposure',
      'Lowest downside revenue exposure',
      'DESCENDING',
      orderByDescending('downsideCumulativeRevenueNetEur'),
      'downsideCumulativeRevenueNetEur',
      'Higher retained downside revenue ranks first; the ranking is not a probability.',
    ),
    dimension(
      'evidenceAcquisitionPriority',
      'Highest evidence-acquisition priority (lowest evidence readiness first)',
      'ASCENDING',
      orderByAscending('evidenceReadinessScore'),
      'evidenceReadinessScore',
      'Families with the least complete evidence come first because acquiring that evidence is the cheapest way to change a decision.',
    ),
  ];
  return {
    contractId: 'MAREA-MC13-PORTFOLIO-PRIORITIZATION',
    contractVersion: '1.0.0',
    milestone: 'MC-13',
    date: '2026-11-02',
    owner: 'commercial-strategy',
    currency: 'EUR',
    asOf: '2026-11-02',
    note:
      'Six separate rankings are provided. They are never merged into a single launch-readiness score. ' +
      'Economic potential, evidence readiness, capital efficiency, implementation dependency and commercial ' +
      'authorization are distinct dimensions.',
    metrics,
    rankings,
    inheritedMc12Conclusions: ctx.drivers.inheritedMc12Conclusions ?? [],
    noCommercialAuthorization: true,
  };
}

/* -------------------------------------------------------------------- figures */

export function buildModel(inputs) {
  const ctx = buildContext(inputs);
  const monthlyFinancialModel = buildMonthlyModel(ctx);
  const scenarioResults = buildScenarioResults(monthlyFinancialModel);
  const breakEvenThresholds = buildBreakEven(ctx, monthlyFinancialModel, scenarioResults);
  const stressTests = buildStressTests(ctx);
  const portfolioPrioritization = buildPortfolioPrioritization(
    ctx,
    monthlyFinancialModel,
    scenarioResults,
  );
  return {
    monthlyFinancialModel,
    scenarioResults,
    breakEvenThresholds,
    stressTests,
    portfolioPrioritization,
  };
}

export { round2, round4 };

/* ----------------------------------------------------------------- figures */

function fmtEur(value) {
  if (value == null) return 'UNKNOWN';
  const sign = value < 0 ? '-' : '';
  const fixed = Math.abs(value).toFixed(2);
  const [whole, decimals] = fixed.split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${sign}EUR ${grouped}.${decimals}`;
}

function fmtNumber(value) {
  if (value == null) return 'UNKNOWN';
  return String(value);
}

export function renderFiguresMarkdown(model) {
  const lines = [];
  lines.push('# MC-13 generated figures register');
  lines.push('');
  lines.push('Status: `GENERATED_DO_NOT_EDIT`. This file is produced deterministically by');
  lines.push(
    '`scripts/build-marea-financial-model.mjs` from the validated datasets. The validator',
  );
  lines.push(
    're-generates it in memory and rejects any divergence. It is the reconciliation bridge',
  );
  lines.push('between the machine-readable model and the human-readable reports.');
  lines.push('');
  lines.push('All figures are conditional, hypothetical and pre-revenue. No figure is a price, a');
  lines.push('verified cost, a validated demand, a financing offer or a break-even claim.');
  lines.push('');
  lines.push('## 1. Scenario totals (single 60-period model, three reporting views)');
  lines.push('');
  lines.push(
    '| Scenario | View | Net revenue | Hardware net | Subscription net | Contribution | EBITDA-like | Net cash flow | Cumulative cash | Financing requirement |',
  );
  lines.push('|---|---|---|---|---|---|---|---|---|---|');
  for (const scenarioId of SCENARIO_IDS) {
    const scenario = model.scenarioResults.scenarios[scenarioId];
    for (const view of ['M12', 'M36', 'M60']) {
      const data = scenario.views[view];
      lines.push(
        `| ${scenarioId} | ${view} | ${fmtEur(data.netRecognizedRevenue)} | ${fmtEur(data.hardwareRevenueNet)} | ${fmtEur(data.subscriptionRevenueNet)} | ${fmtEur(data.contribution)} | ${fmtEur(data.ebitdaLikeConditional)} | ${fmtEur(data.netCashFlow)} | ${fmtEur(data.cumulativeCashBalance)} | ${fmtEur(data.financingRequirement)} |`,
      );
    }
  }
  lines.push('');
  lines.push('## 2. Conditional break-even status');
  lines.push('');
  lines.push('| Threshold | Scenario | Type | Value | Status |');
  lines.push('|---|---|---|---|---|');
  for (const threshold of model.breakEvenThresholds.thresholds) {
    lines.push(
      `| ${threshold.id} | ${threshold.scenarioId} | ${threshold.breakEvenType} | ${fmtNumber(threshold.value)} | ${threshold.status} |`,
    );
  }
  lines.push('');
  lines.push('## 3. Stress results (base hypothetical scenario with declared overrides)');
  lines.push('');
  lines.push(
    '| Case | M60 net revenue | Contribution | Cumulative cash | Financing requirement | Viability collapsed | Per-unit contribution positive | Aggregate contribution positive | Average unit contribution |',
  );
  lines.push('|---|---|---|---|---|---|---|');
  for (const testCase of model.stressTests.cases) {
    lines.push(
      `| ${testCase.id} | ${fmtEur(testCase.results.M60.netRecognizedRevenue)} | ${fmtEur(testCase.results.M60.contribution)} | ${fmtEur(testCase.cumulativeCashEndEur)} | ${fmtEur(testCase.financingRequirementEur)} | ${testCase.viabilityCollapsed} | ${testCase.unitContributionStillPositive} | ${testCase.aggregateContributionPositive} | ${fmtNumber(testCase.averageUnitContributionEur)} |`,
    );
  }
  lines.push('');
  lines.push('## 4. Separate portfolio rankings (never merged into one score)');
  lines.push('');
  for (const ranking of model.portfolioPrioritization.rankings) {
    lines.push(`### ${ranking.id}`);
    lines.push('');
    lines.push(ranking.familyOrder.join(' > '));
    lines.push('');
  }
  lines.push('## 5. Named unknowns excluded from the conditional result');
  lines.push('');
  const base = model.monthlyFinancialModel.scenarios.BASE_HYPOTHETICAL;
  for (const unknown of base.unknowns) {
    lines.push(`- ${unknown.column}: ${unknown.reason}`);
  }
  lines.push('');
  return `${lines.join('\n').trimEnd()}\n`;
}

/* ------------------------------------------------------- assumptions register */

export function renderAssumptionsRegister(assumptions, model) {
  const records = assumptions?.assumptions ?? [];
  const counts = {};
  for (const record of records) {
    counts[record.evidenceClass] = (counts[record.evidenceClass] ?? 0) + 1;
  }
  const unknownRecords = records.filter(
    (record) => record.value == null && ['UNKNOWN', 'BLOCKED'].includes(record.status),
  );
  const lines = [];
  lines.push('# MC-13 assumptions and evidence register');
  lines.push('');
  lines.push('Status: `GENERATED_DO_NOT_EDIT`. Produced deterministically by');
  lines.push(
    '`scripts/build-marea-financial-model.mjs` from `data/assumptions.json` and the model.',
  );
  lines.push('The validator re-generates it and rejects any divergence.');
  lines.push('');
  lines.push('Every numeric model input resolves to a record below. `null` means unknown and is');
  lines.push('never zero. A record is never upgraded because a later milestone consumes it.');
  lines.push('');
  lines.push('## 1. Evidence classification');
  lines.push('');
  lines.push('| Evidence class | Records |');
  lines.push('|---|---|');
  for (const key of [
    'VERIFIED_OBSERVED',
    'PUBLISHED_TARIFF',
    'CONTRACTED',
    'INHERITED_ASSUMPTION',
    'ENGINEERING_ASSUMPTION',
    'SCENARIO_ASSUMPTION',
    'UNKNOWN',
    'BLOCKED',
  ]) {
    lines.push(`| ${key} | ${counts[key] ?? 0} |`);
  }
  lines.push('');
  lines.push(
    '`FORMAL_PROVIDER_QUOTATION = 0` and `EXECUTED_CONTRACT = 0`. No input is contracted.',
  );
  lines.push('');
  lines.push('## 2. Unknown and blocked inputs');
  lines.push('');
  lines.push('| ID | Name | Status | Reason |');
  lines.push('|---|---|---|---|');
  for (const record of unknownRecords) {
    lines.push(
      `| ${record.id} | ${record.name} | ${record.status} | ${record.unknownReason ?? ''} |`,
    );
  }
  lines.push('');
  lines.push('## 3. Full assumptions register');
  lines.push('');
  lines.push('| ID | Name | Value | Unit | Evidence | Status | Source |');
  lines.push('|---|---|---|---|---|---|---|');
  for (const record of records) {
    const value = record.value == null ? 'UNKNOWN' : String(record.value);
    const source = record.sourceRecordId ?? record.sourcePath ?? '';
    lines.push(
      `| ${record.id} | ${record.name} | ${value} | ${record.unit} | ${record.evidenceClass} | ${record.status} | ${source} |`,
    );
  }
  lines.push('');
  lines.push('## 4. Named unknowns excluded from the conditional result');
  lines.push('');
  const base = model?.monthlyFinancialModel?.scenarios?.BASE_HYPOTHETICAL;
  for (const unknown of base?.unknowns ?? []) {
    lines.push(`- ${unknown.column}: ${unknown.reason}`);
  }
  lines.push('');
  return `${lines.join('\n').trimEnd()}\n`;
}
