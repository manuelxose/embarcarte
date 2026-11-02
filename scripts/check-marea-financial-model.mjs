#!/usr/bin/env node
/**
 * MC-13 financial-model and data-contract validator.
 *
 * Authority: `docs/marea/financial/MC13-FINANCIAL-DATA-CONTRACT.md`. Every check recomputes
 * from source records: a declared total is never compared with itself. The validator is
 * read-only with respect to business data; it never writes, repairs or migrates a dataset.
 *
 * Usage:
 *   node scripts/check-marea-financial-model.mjs            full gate
 *   node scripts/check-marea-financial-model.mjs --json     machine-readable report
 *   node scripts/check-marea-financial-model.mjs --allow-pending-review
 *
 * Dependency-free on purpose (no runtime packages added).
 */
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildModel,
  renderFiguresMarkdown,
  renderAssumptionsRegister,
  HORIZON,
  PERIODS,
  SCENARIO_IDS,
} from './marea-financial-engine.mjs';

export const HERE = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = resolve(HERE, '..');
export const DATA_DIR = join(REPO_ROOT, 'docs', 'marea', 'financial', 'data');
export const FINANCIAL_DIR = join(REPO_ROOT, 'docs', 'marea', 'financial');
export const FIGURES_PATH = join(FINANCIAL_DIR, 'MC13-GENERATED-FIGURES.md');
export const TOLERANCE = 0.02;

export const INPUT_FILES = [
  'assumptions.json',
  'source-ledger.json',
  'revenue-drivers.json',
  'recurring-revenue.json',
  'operating-costs.json',
  'capital-investments.json',
  'working-capital.json',
  'scenario-definitions.json',
  'mc13-handoff-consumption.json',
];
export const DERIVED_FILES = [
  'monthly-financial-model.json',
  'scenario-results.json',
  'stress-tests.json',
  'break-even-thresholds.json',
  'portfolio-prioritization.json',
];
export const GOVERNED_FILES = [
  ...INPUT_FILES,
  'blocker-register.json',
  'mc14-handoff-inputs.json',
  'review-findings.json',
  'predecessor-baseline.json',
  ...DERIVED_FILES,
  'manifest.json',
];
export const REQUIRED_DATA_FILES = [
  'manifest.json',
  'assumptions.json',
  'source-ledger.json',
  'revenue-drivers.json',
  'recurring-revenue.json',
  'operating-costs.json',
  'capital-investments.json',
  'working-capital.json',
  'monthly-financial-model.json',
  'scenario-definitions.json',
  'scenario-results.json',
  'stress-tests.json',
  'break-even-thresholds.json',
  'portfolio-prioritization.json',
  'blocker-register.json',
  'mc14-handoff-inputs.json',
  'review-findings.json',
];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const AS_OF = '2026-11-02';
const FAMILY_IDS = ['NAV', 'HUB', 'AIS', 'PILOT', 'SENSE', 'WATCH', 'DISPLAY', 'WEATHER', 'FLEET'];
const ALLOWED_PRICE_STATUS = ['HYPOTHESIS_UNAPPROVED', 'NOT_ESTABLISHED', 'NOT_FOR_SALE'];
const ALLOWED_VAT_BASIS = ['VAT_INCLUDED', 'VAT_EXCLUDED_B2B', 'VAT_UNKNOWN'];
const REQUIRED_SCENARIO_KEYS = ['statusFlags'];
const FROZEN_STATUS_FLAGS = {
  TRADEMARK_LEGAL_CLEARANCE: 'NOT_GRANTED',
  SOURCE_IP_CLEARANCE: 'NOT_CLEARED',
  COMMERCIAL_AVAILABILITY: 'NOT_FOR_SALE',
  PRICE_APPROVED: 'NONE',
  CUSTOMER_EVIDENCE: 'NONE',
  CUSTOMER_WTP_VALIDATED: false,
  FORMAL_SUPPLIER_QUOTATIONS: 'NONE',
  LICENSING_RIGHTS_GRANTED: false,
  PILOT_SAFETY_GATE: 'BLOCKED',
  AIS_TRANSMISSION_OFFERED: false,
  FLEET_DEFAULT_HARDWARE: false,
  NMEA2000_CERTIFIED: false,
  TESTED_COMPATIBILITY_ROWS: 0,
  CE_MARKING_CLAIM: 'PROHIBITED',
  MERGED: false,
  DEPLOYED: false,
  PRODUCTION_DEPLOYMENT: 'NOT_AUTHORIZED',
};
const REQUIRED_DOCS = {
  'MC-13-BASELINE-AND-GOVERNANCE.md': ['MC-13', 'Baseline', 'Governance'],
  'MC13-FINANCIAL-DATA-CONTRACT.md': ['MC-13', 'Financial data contract'],
  'MC13-ASSUMPTIONS-AND-EVIDENCE-REGISTER.md': ['Assumptions', 'Evidence'],
  'MC13-60-MONTH-INTEGRATED-FINANCIAL-MODEL.md': ['60', 'model'],
  'MC13-REVENUE-AND-COHORT-FORECASTS.md': ['Revenue', 'cohort'],
  'MC13-HARDWARE-PRODUCTION-AND-INVENTORY-CASHFLOW.md': ['Hardware', 'inventory'],
  'MC13-RECURRING-REVENUE-AND-SAAS-ECONOMICS.md': ['Recurring', 'SaaS'],
  'MC13-OPEX-AND-SECURITY-LIFECYCLE-COSTS.md': ['Operating', 'security'],
  'MC13-CAPEX-AND-FUNDING-REQUIREMENTS.md': ['Capital', 'funding'],
  'MC13-WORKING-CAPITAL-AND-CASHFLOW.md': ['Working capital', 'cash'],
  'MC13-SCENARIOS-12-36-60.md': ['12', '36', '60'],
  'MC13-CONDITIONAL-BREAK-EVEN-ANALYSIS.md': ['break-even', 'CONDITIONAL'],
  'MC13-SENSITIVITY-AND-STRESS-TESTS.md': ['stress', 'sensitivity'],
  'MC13-PORTFOLIO-AND-CAPITAL-PRIORITIZATION.md': ['portfolio', 'ranking'],
  'MC13-UNKNOWN-COSTS-AND-COMMERCIAL-BLOCKERS.md': ['UNKNOWN', 'blocker'],
  'MC13-MC14-HANDOFF.md': ['MC-14', 'handoff'],
  'MC13-EXECUTIVE-REPORT.md': ['MC-13', 'es'],
  'MC-13-DELIVERY.md': ['MC-13', 'Delivery'],
};

/* --------------------------------------------------------------------- load */

function readJsonFile(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

export function loadFromDisk(root = REPO_ROOT) {
  const dataDir = join(root, 'docs', 'marea', 'financial', 'data');
  const financialDir = join(root, 'docs', 'marea', 'financial');
  const missing = [];
  const readErrors = [];
  const data = {};
  for (const file of GOVERNED_FILES) {
    const target = join(dataDir, file);
    if (!existsSync(target)) {
      missing.push(file);
      data[file.replace('.json', '').replace(/-([a-z])/g, (_, l) => l.toUpperCase())] = {};
      continue;
    }
    try {
      data[file.replace('.json', '').replace(/-([a-z])/g, (_, l) => l.toUpperCase())] =
        readJsonFile(target);
    } catch {
      readErrors.push(file);
    }
  }
  const external = {};
  try {
    external.unitEconomics = readJsonFile(
      join(root, 'docs', 'marea', 'economics', 'data', 'unit-economics.json'),
    );
  } catch {
    external.unitEconomics = {};
  }
  try {
    external.hardwareCostScenarios = readJsonFile(
      join(root, 'docs', 'marea', 'hardware', 'data', 'cost-scenarios.json'),
    );
  } catch {
    external.hardwareCostScenarios = {};
  }
  try {
    external.hardwareReconciliation = readJsonFile(
      join(root, 'docs', 'marea', 'economics', 'data', 'hardware-cost-reconciliation.json'),
    );
  } catch {
    external.hardwareReconciliation = {};
  }
  try {
    external.bundleDefinitions = readJsonFile(
      join(root, 'docs', 'marea', 'bundles', 'bundle-definitions.json'),
    );
  } catch {
    external.bundleDefinitions = {};
  }
  external.products = [];
  for (const batch of ['01', '02', '03']) {
    try {
      external.products.push(
        readJsonFile(
          join(root, 'docs', 'marea', 'products', `product-definitions.batch-${batch}.json`),
        ),
      );
    } catch {
      external.products.push({});
    }
  }
  try {
    external.mc12Manifest = readJsonFile(
      join(root, 'docs', 'marea', 'economics', 'data', 'manifest.json'),
    );
  } catch {
    external.mc12Manifest = {};
  }
  try {
    external.mc12Blockers = readJsonFile(
      join(root, 'docs', 'marea', 'economics', 'data', 'blocker-register.json'),
    );
  } catch {
    external.mc12Blockers = {};
  }
  try {
    external.licensingRights = readJsonFile(
      join(root, 'docs', 'marea', 'economics', 'data', 'licensing-rights.json'),
    );
  } catch {
    external.licensingRights = {};
  }
  try {
    external.packageJson = readJsonFile(join(root, 'package.json'));
  } catch {
    external.packageJson = {};
  }
  try {
    external.registryText = readFileSync(
      join(root, 'docs', 'marea', 'execution', 'MASTER-PROMPT-REGISTRY.md'),
      'utf8',
    );
  } catch {
    external.registryText = '';
  }
  try {
    external.decisionLogText = readFileSync(
      join(root, 'docs', 'marea', 'execution', 'DECISION-LOG.md'),
      'utf8',
    );
  } catch {
    external.decisionLogText = '';
  }
  external.docs = {};
  for (const file of Object.keys(REQUIRED_DOCS)) {
    const target = join(financialDir, file);
    external.docs[file] = existsSync(target) ? readFileSync(target, 'utf8') : null;
  }
  let figuresText = null;
  if (existsSync(join(financialDir, 'MC13-GENERATED-FIGURES.md'))) {
    figuresText = readFileSync(join(financialDir, 'MC13-GENERATED-FIGURES.md'), 'utf8');
  }
  data.handoffConsumption = data.mc13HandoffConsumption;
  data.mc14Handoff = data.mc14HandoffInputs;
  data._missing = missing;
  data._readErrors = readErrors;
  data._external = external;
  data._figuresText = figuresText;
  data._raw = {};
  for (const file of DERIVED_FILES) {
    const target = join(dataDir, file);
    data._raw[file] = existsSync(target) ? readFileSync(target, 'utf8') : null;
  }
  return { data, missing };
}

function engineInputs(data) {
  return {
    assumptions: data.assumptions,
    sourceLedger: data.sourceLedger,
    revenueDrivers: data.revenueDrivers,
    recurringRevenue: data.recurringRevenue,
    operatingCosts: data.operatingCosts,
    capitalInvestments: data.capitalInvestments,
    workingCapital: data.workingCapital,
    scenarioDefinitions: data.scenarioDefinitions,
  };
}

/* ----------------------------------------------------------------- helpers */

const isPeriodArray = (value) =>
  Array.isArray(value) &&
  value.length === HORIZON &&
  value.every((item) => item === null || typeof item === 'number');

function approx(a, b, tolerance = TOLERANCE) {
  if (a == null || b == null) return false;
  return Math.abs(a - b) <= tolerance;
}

function ids(records, key = 'id') {
  return (records ?? []).map((record) => record[key]);
}

function duplicateIds(list) {
  const seen = new Set();
  const duplicates = new Set();
  for (const id of list) {
    if (seen.has(id)) duplicates.add(id);
    seen.add(id);
  }
  return [...duplicates];
}

function assumptionMap(data) {
  return new Map((data.assumptions?.assumptions ?? []).map((item) => [item.id, item]));
}

function totalOf(values, throughMonth = HORIZON) {
  if (!Array.isArray(values)) return null;
  const slice = values.slice(0, throughMonth);
  if (slice.some((value) => value == null)) return null;
  return slice.reduce((sum, value) => sum + value, 0);
}

function periodValue(values, month) {
  return Array.isArray(values) ? values[month - 1] : null;
}

function serialize(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function viewTotalsFromColumns(columns, throughMonth) {
  const total = (column) => totalOf(columns[column], throughMonth);
  return {
    grossInvoicedRevenue: total('grossInvoicedRevenue'),
    vatOutput: total('vatOutput'),
    netRecognizedRevenue: total('netRecognizedRevenue'),
    cashCollectionsNetOfVat: total('cashCollectionsNetOfVat'),
    hardwareRevenueNet: total('hardwareRevenueNet'),
    subscriptionRevenueNet: total('subscriptionRevenueNet'),
    contribution: total('knownVariableContribution'),
    fixedOpexEnvelope: total('fixedOpexEnvelope'),
    ebitdaLikeConditional: total('ebitdaLikeConditional'),
    amortizationNonCash: total('amortizationNonCash'),
    accountingOperatingResult: total('accountingOperatingResult'),
    capexCash: total('capexCash'),
    netCashFlow: total('netCashFlow'),
    cumulativeCashBalance: periodValue(columns.cumulativeCashBalance, throughMonth),
    financingRequirement: periodValue(columns.financingRequirement, throughMonth),
    paymentFees: total('paymentFees'),
    cogsHardware: total('cogsHardware'),
    softwareDirectCosts: total('softwareDirectCosts'),
    inventoryCarryingCost: total('inventoryCarryingCost'),
    inventoryPurchasesCash: total('inventoryPurchasesCash'),
    cashReceiptsGross: total('cashReceiptsGross'),
    vatPaid: total('vatPaid'),
    operatingCashFlow: total('operatingCashFlow'),
    investingCashFlow: total('investingCashFlow'),
    workingCapitalMovement: total('workingCapitalMovement'),
    tradeReceivablesEnd: periodValue(columns.tradeReceivablesEnd, throughMonth),
    inventoryUnitsEnd: periodValue(columns.inventoryUnitsEnd, throughMonth),
    unitsTotal: (columns.hardwareUnitsTotal ?? [])
      .slice(0, throughMonth)
      .reduce((sum, value) => sum + value, 0),
    activeSubscriptions: Object.values(columns.subscriptionActiveAccountsBySku ?? {}).reduce(
      (sum, values) => sum + (values[throughMonth - 1] ?? 0),
      0,
    ),
    fleetActiveVessels: periodValue(columns.fleetActiveVessels, throughMonth),
  };
}

/* ----------------------------------------------------------------- validate */

export function validate(data, options = {}) {
  const external = data._external ?? {};
  const checks = [];
  const add = (id, description, fn) => {
    let violations;
    try {
      violations = fn() ?? [];
    } catch (error) {
      violations = [`check crashed: ${error.message}`];
    }
    checks.push({ id, description, status: violations.length ? 'FAIL' : 'PASS', violations });
  };
  const A = assumptionMap(data);
  const number = (id) => A.get(id)?.value;
  const scenarioDefs = data.scenarioDefinitions?.scenarios ?? [];
  const scenarioById = new Map(scenarioDefs.map((scenario) => [scenario.id, scenario]));
  const hardwareSkus = data.revenueDrivers?.hardwareSkus ?? [];
  const subscriptionSkus = data.revenueDrivers?.subscriptionSkus ?? [];
  const families = data.revenueDrivers?.productFamilies ?? [];
  const model = (() => {
    try {
      return buildModel(engineInputs(data));
    } catch {
      return null;
    }
  })();
  const monthly = data.monthlyFinancialModel ?? {};
  const hypotheticalMonthly = (id) => monthly.scenarios?.[id];
  const pipelineFns = [];
  void pipelineFns;

  /* ------------------------------------------------------------- structural */

  add('S-01', 'All governed data files exist and parse as JSON', () => {
    const problems = [];
    if ((data._missing ?? []).length) problems.push(`missing: ${data._missing.join(', ')}`);
    if ((data._readErrors ?? []).length)
      problems.push(`parse errors: ${data._readErrors.join(', ')}`);
    for (const file of REQUIRED_DATA_FILES) {
      if (!existsSync(join(DATA_DIR, file))) problems.push(`required data file absent: ${file}`);
    }
    return problems;
  });

  add('S-02', 'Contract metadata and identifier uniqueness', () => {
    const problems = [];
    for (const file of GOVERNED_FILES) {
      const record =
        data[file.replace('.json', '').replace(/-([a-z])/g, (_, l) => l.toUpperCase())];
      if (!record) continue;
      if (record.milestone !== 'MC-13') problems.push(`${file}: milestone ${record.milestone}`);
      if (record.date !== AS_OF) problems.push(`${file}: date ${record.date}`);
      if (record.currency !== 'EUR') problems.push(`${file}: currency ${record.currency}`);
    }
    const groups = [
      ['assumptions', data.assumptions?.assumptions, 'id'],
      ['sources', data.sourceLedger?.sources, 'id'],
      ['transformations', data.sourceLedger?.transformations, 'id'],
      ['hardwareSkus', hardwareSkus, 'id'],
      ['subscriptionSkus', subscriptionSkus, 'id'],
      ['demandProfiles', data.revenueDrivers?.demandProfiles, 'id'],
      ['blockers', data.blockerRegister?.blockers, 'id'],
      ['stressCases', data.stressTests?.cases, 'id'],
      ['thresholds', data.breakEvenThresholds?.thresholds, 'id'],
      ['capitalItems', data.capitalInvestments?.items, 'id'],
    ];
    for (const [label, records, key] of groups) {
      const duplicates = duplicateIds(ids(records, key));
      if (duplicates.length) problems.push(`${label}: duplicate ids ${duplicates.join(', ')}`);
    }
    return problems;
  });

  add('S-03', 'Dates are ISO and not after asOf; sources carry retrieval evidence', () => {
    const problems = [];
    const checkDate = (value, label) => {
      if (value != null && (!ISO_DATE.test(value) || value > AS_OF))
        problems.push(`${label}: ${value}`);
    };
    for (const record of data.assumptions?.assumptions ?? []) {
      checkDate(record.validFrom, `${record.id}.validFrom`);
      checkDate(record.lastVerified, `${record.id}.lastVerified`);
    }
    for (const source of data.sourceLedger?.sources ?? []) {
      checkDate(source.retrievedOn, `${source.id}.retrievedOn`);
      if (!source.sourcePath && !source.url) problems.push(`${source.id}: no sourcePath or url`);
      if (source.url && !source.retrievedOn) problems.push(`${source.id}: url without retrievedOn`);
    }
    return problems;
  });

  add('S-04', 'Model periods, arrays and enumerations', () => {
    const problems = [];
    if (monthly.format !== 'COLUMNAR_V1') problems.push('monthly format not COLUMNAR_V1');
    if (JSON.stringify(monthly.periods) !== JSON.stringify(PERIODS))
      problems.push('periods not M01..M60');
    for (const scenarioId of SCENARIO_IDS) {
      const scenario = monthly.scenarios?.[scenarioId];
      if (!scenario) {
        problems.push(`missing scenario ${scenarioId}`);
        continue;
      }
      for (const [column, values] of Object.entries(scenario.columns ?? {})) {
        if (typeof values === 'object' && values !== null && !Array.isArray(values)) {
          for (const [sku, series] of Object.entries(values)) {
            if (!isPeriodArray(series))
              problems.push(`${scenarioId}.${column}.${sku} not 60 periods`);
          }
        } else if (!isPeriodArray(values)) {
          problems.push(`${scenarioId}.${column} not 60 periods`);
        }
      }
      for (const key of REQUIRED_SCENARIO_KEYS) {
        if (!(key in scenario)) problems.push(`${scenarioId}: missing ${key}`);
      }
    }
    for (const sku of [...hardwareSkus, ...subscriptionSkus]) {
      if (sku.priceHypothesis && !ALLOWED_PRICE_STATUS.includes(sku.priceHypothesis.status)) {
        problems.push(`${sku.id}: price status ${sku.priceHypothesis.status}`);
      }
      if (sku.priceHypothesis && !ALLOWED_VAT_BASIS.includes(sku.priceHypothesis.vatBasis)) {
        problems.push(`${sku.id}: vat basis ${sku.priceHypothesis.vatBasis}`);
      }
    }
    return problems;
  });

  add('S-05', 'Canonical data inventory and manifest file map', () => {
    const problems = [];
    for (const file of REQUIRED_DATA_FILES) {
      if (!(data.manifest?.files && Object.values(data.manifest.files).includes(file))) {
        problems.push(`manifest.files does not declare ${file}`);
      }
    }
    return problems;
  });

  add('S-06', 'Every assumption carries the mandatory evidence record fields', () => {
    const problems = [];
    const fields = [
      'id',
      'name',
      'value',
      'unit',
      'currency',
      'period',
      'sourcePath',
      'sourceRecordId',
      'sourceType',
      'evidenceClass',
      'confidence',
      'status',
      'scenarioApplicability',
      'validFrom',
      'lastVerified',
      'owner',
      'unknownReason',
      'dependencies',
    ];
    const evidenceClasses = data.assumptions?.evidenceClasses ?? [];
    const statuses = data.assumptions?.statusVocabulary ?? [];
    for (const record of data.assumptions?.assumptions ?? []) {
      for (const field of fields) {
        if (!(field in record)) problems.push(`${record.id}: missing ${field}`);
      }
      if (
        !evidenceClasses.includes(record.evidenceClass) &&
        record.evidenceClass !== 'OFFICIAL_LICENSING_DOCUMENT'
      ) {
        problems.push(`${record.id}: evidenceClass ${record.evidenceClass}`);
      }
      if (!statuses.includes(record.status) && record.status !== 'KNOWN') {
        problems.push(`${record.id}: status ${record.status}`);
      }
      if (record.value == null && !record.unknownReason) {
        problems.push(`${record.id}: null value without unknownReason`);
      }
      if (record.status === 'UNKNOWN' && record.value === 0) {
        problems.push(`${record.id}: unknown value stored as zero`);
      }
    }
    return problems;
  });

  add('S-07', 'Source and transformation lineage resolves; every result block has lineage', () => {
    const problems = [];
    const assumptionIds = new Set((data.assumptions?.assumptions ?? []).map((record) => record.id));
    const sourceIds = new Set((data.sourceLedger?.sources ?? []).map((record) => record.id));
    const transformationIds = new Set(
      (data.sourceLedger?.transformations ?? []).map((record) => record.id),
    );
    for (const record of data.assumptions?.assumptions ?? []) {
      if (record.sourceType === 'SCENARIO_ASSUMPTION' || record.status === 'UNKNOWN') continue;
      if (
        record.sourcePath &&
        !record.sourcePath.startsWith('http') &&
        !existsSync(join(REPO_ROOT, record.sourcePath))
      ) {
        problems.push(`${record.id}: sourcePath does not resolve: ${record.sourcePath}`);
      }
    }
    for (const transformation of data.sourceLedger?.transformations ?? []) {
      for (const input of transformation.inputs ?? []) {
        if (!assumptionIds.has(input) && !sourceIds.has(input)) {
          problems.push(`${transformation.id}: unresolved input ${input}`);
        }
      }
      if (!transformation.operation) problems.push(`${transformation.id}: empty operation`);
    }
    const blocks = monthly.lineage?.columnBlocks ?? {};
    if (!Object.keys(blocks).length) problems.push('monthly.lineage.columnBlocks empty');
    for (const [block, transformations] of Object.entries(blocks)) {
      if (!Array.isArray(transformations) || !transformations.length) {
        problems.push(`lineage block ${block} has no transformation`);
        continue;
      }
      for (const id of transformations) {
        if (!transformationIds.has(id))
          problems.push(`lineage block ${block}: unknown transformation ${id}`);
      }
    }
    return problems;
  });

  add('S-08', 'Illustrative demand profiles are labelled and cover modelled SKUs', () => {
    const problems = [];
    const profileIds = data.revenueDrivers?.demandProfiles ?? [];
    const skuIds = new Set([...hardwareSkus, ...subscriptionSkus].map((sku) => sku.id));
    const assumptionIdSet = new Set(
      (data.assumptions?.assumptions ?? []).map((record) => record.id),
    );
    for (const profile of profileIds) {
      if (
        !SCENARIO_IDS.includes(profile.scenarioId) ||
        profile.scenarioId === 'RESTRICTED_CURRENT'
      ) {
        problems.push(`${profile.id}: invalid scenarioId ${profile.scenarioId}`);
      }
      if (!skuIds.has(profile.skuId))
        problems.push(`${profile.id}: unknown skuId ${profile.skuId}`);
      if (profile.evidenceClass !== 'SCENARIO_ASSUMPTION') {
        problems.push(`${profile.id}: demand evidence class ${profile.evidenceClass}`);
      }
      if (!assumptionIdSet.has(profile.assumptionId)) {
        problems.push(`${profile.id}: assumptionId unresolved ${profile.assumptionId}`);
      }
      for (const forbidden of ['marketShare', 'conversionRate', 'validatedDemand', 'interviews']) {
        if (forbidden in profile) problems.push(`${profile.id}: forbidden field ${forbidden}`);
      }
    }
    for (const sku of [...hardwareSkus, ...subscriptionSkus]) {
      if (sku.modelEnabled === false) continue;
      for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
        if (
          !profileIds.some(
            (profile) => profile.scenarioId === scenarioId && profile.skuId === sku.id,
          )
        ) {
          problems.push(`missing demand profile ${scenarioId}/${sku.id}`);
        }
      }
    }
    return problems;
  });

  add('S-09', 'Clearance-dependency schedule covers all families in every scenario', () => {
    const problems = [];
    const assumptionIdSet = new Set(
      (data.assumptions?.assumptions ?? []).map((record) => record.id),
    );
    for (const scenario of scenarioDefs) {
      const familiesCovered = new Set(
        (scenario.clearanceSchedule ?? []).map((entry) => entry.familyId),
      );
      for (const familyId of FAMILY_IDS) {
        if (!familiesCovered.has(familyId)) problems.push(`${scenario.id}: missing ${familyId}`);
      }
      for (const entry of scenario.clearanceSchedule ?? []) {
        if (entry.statusFlagUnchanged !== true) {
          problems.push(`${scenario.id}/${entry.familyId}: statusFlagUnchanged false`);
        }
        if (!assumptionIdSet.has(entry.assumptionId)) {
          problems.push(`${scenario.id}/${entry.familyId}: assumptionId unresolved`);
        } else if (A.get(entry.assumptionId)?.evidenceClass !== 'SCENARIO_ASSUMPTION') {
          problems.push(
            `${scenario.id}/${entry.familyId}: clearance not labelled SCENARIO_ASSUMPTION`,
          );
        }
        if (entry.familyId === 'PILOT' && entry.hypotheticalClearanceMonth != null) {
          problems.push(`${scenario.id}: PILOT clearance must stay null`);
        }
        if (scenario.id === 'RESTRICTED_CURRENT' && entry.hypotheticalClearanceMonth != null) {
          problems.push(`RESTRICTED_CURRENT/${entry.familyId}: clearance must be null`);
        }
      }
    }
    return problems;
  });

  add('S-10', 'Package scripts expose the financial gate and formatting list', () => {
    const problems = [];
    const scripts = external.packageJson?.scripts ?? {};
    if (scripts['test:financial'] !== 'node scripts/check-marea-financial-model.mjs') {
      problems.push('package.json missing test:financial');
    }
    if (
      scripts['test:financial:unit'] !== 'node --test scripts/check-marea-financial-model.test.mjs'
    ) {
      problems.push('package.json missing test:financial:unit');
    }
    if (!String(scripts.format ?? '').includes('scripts/check-marea-financial-model.mjs')) {
      problems.push('format script omits the financial validator');
    }
    return problems;
  });

  add('S-11', 'Manufacturing volume tiers are the declared analytical tiers', () => {
    const problems = [];
    const tiers = [1, 10, 100, 500, 1000];
    for (const sku of hardwareSkus) {
      const tier = sku.costBasis?.volumeTier;
      if (tier != null && !tiers.includes(tier))
        problems.push(`${sku.id}: invalid volume tier ${tier}`);
    }
    if (JSON.stringify(data).includes('"volumeTier": 42')) problems.push('fabricated volume tier');
    return problems;
  });

  /* -------------------------------------------------------------- governance */

  add('V-01', 'No price is approved', () => {
    const problems = [];
    for (const sku of [...hardwareSkus, ...subscriptionSkus]) {
      if (sku.priceHypothesis && !ALLOWED_PRICE_STATUS.includes(sku.priceHypothesis.status)) {
        problems.push(`${sku.id}: unapproved price status ${sku.priceHypothesis.status}`);
      }
      const text = JSON.stringify(sku.priceHypothesis ?? {});
      if (/"status":"(APPROVED|FINAL|PURCHASABLE)"|\bPURCHASABLE\b/.test(text)) {
        problems.push(`${sku.id}: forbidden price claim`);
      }
    }
    for (const bundle of data.revenueDrivers?.bundles ?? []) {
      if (!ALLOWED_PRICE_STATUS.includes(bundle.priceHypothesis?.status)) {
        problems.push(`bundle ${bundle.id}: price status ${bundle.priceHypothesis?.status}`);
      }
    }
    return problems;
  });

  add('V-02', 'Commercial availability stays NOT_FOR_SALE', () => {
    const problems = [];
    if (data.manifest?.commercialAvailability !== 'NOT_FOR_SALE')
      problems.push('manifest availability');
    for (const family of families) {
      if (family.commercialAvailability !== 'NOT_FOR_SALE') problems.push(`family ${family.id}`);
    }
    for (const bundle of data.revenueDrivers?.bundles ?? []) {
      if (bundle.commercialAvailability !== 'NOT_FOR_SALE') problems.push(`bundle ${bundle.id}`);
    }
    for (const scenarioId of SCENARIO_IDS) {
      if (
        monthly.scenarios?.[scenarioId]?.statusFlags?.COMMERCIAL_AVAILABILITY !== 'NOT_FOR_SALE'
      ) {
        problems.push(`scenario ${scenarioId}: availability flag`);
      }
    }
    return problems;
  });

  add(
    'V-03',
    'PILOT safety gate never clears and PILOT generates no units, cost or revenue',
    () => {
      const problems = [];
      if (
        (data.revenueDrivers?.demandProfiles ?? []).some((profile) => profile.familyId === 'PILOT')
      ) {
        problems.push('PILOT demand profile present');
      }
      for (const sku of hardwareSkus.filter((item) => item.familyId === 'PILOT')) {
        if (sku.modelEnabled !== false) problems.push(`${sku.id}: PILOT modelEnabled`);
        if (sku.knownVariableCostEur != null) problems.push(`${sku.id}: PILOT cost fabricated`);
      }
      for (const scenario of scenarioDefs) {
        const pilot = (scenario.clearanceSchedule ?? []).find(
          (entry) => entry.familyId === 'PILOT',
        );
        if (!pilot || pilot.hypotheticalClearanceMonth != null)
          problems.push(`${scenario.id}: PILOT clearance`);
        if (
          (scenario.statusFlags ?? data.scenarioDefinitions?.statusFlags)?.PILOT_SAFETY_GATE !==
          'BLOCKED'
        )
          problems.push(`${scenario.id}: PILOT flag`);
      }
      for (const threshold of data.breakEvenThresholds?.thresholds ?? []) {
        if (
          String(threshold.subjectId).startsWith('PILOT') &&
          threshold.status !== 'NOT_DETERMINABLE'
        ) {
          problems.push(`${threshold.id}: PILOT threshold presented as ${threshold.status}`);
        }
      }
      return problems;
    },
  );

  add('V-04', 'AIS remains receive-only with no transmission offering', () => {
    const problems = [];
    for (const scenario of scenarioDefs) {
      if (
        (scenario.statusFlags ?? data.scenarioDefinitions?.statusFlags)
          ?.AIS_TRANSMISSION_OFFERED !== false
      ) {
        problems.push(`${scenario.id}: AIS transmission flag`);
      }
    }
    for (const sku of hardwareSkus.filter((item) => item.familyId === 'AIS')) {
      if (/transmit/i.test(JSON.stringify(sku)))
        problems.push(`${sku.id}: AIS transmission language`);
    }
    const aisSkuIds = new Set(
      hardwareSkus.filter((item) => item.familyId === 'AIS').map((item) => item.id),
    );
    for (const [skuId, units] of Object.entries(
      hypotheticalMonthly('BASE_HYPOTHETICAL')?.columns?.hardwareUnitsBySku ?? {},
    )) {
      if (units.some((value) => value > 0) && !aisSkuIds.has(skuId) && skuId.startsWith('AIS')) {
        problems.push(`${skuId}: unmodelled AIS revenue`);
      }
    }
    return problems;
  });

  add('V-05', 'FLEET has no default hardware', () => {
    const problems = [];
    const bundle = (data.revenueDrivers?.bundles ?? []).find((item) => item.id === 'FLEET');
    if (!bundle || bundle.hardwareByDefault !== false)
      problems.push('FLEET bundle hardwareByDefault');
    if (hardwareSkus.some((sku) => sku.familyId === 'FLEET'))
      problems.push('FLEET hardware SKU exists');
    for (const scenarioId of SCENARIO_IDS) {
      const units = monthly.scenarios?.[scenarioId]?.columns?.hardwareUnitsBySku ?? {};
      if (Object.keys(units).some((skuId) => skuId.startsWith('FLEET')))
        problems.push(`${scenarioId}: FLEET units`);
    }
    const base = hypotheticalMonthly('BASE_HYPOTHETICAL');
    if (base) {
      const fleetRevenue = Object.entries(base.supporting?.subscriptionRevenueNetBySku ?? {})
        .filter(([skuId]) => skuId.startsWith('FLEET'))
        .reduce((sum, [, values]) => sum + values.reduce((a, b) => a + b, 0), 0);
      const hardwareTotal = totalOf(base.columns.hardwareRevenueNet);
      if (fleetRevenue > 0 && hardwareTotal != null && fleetRevenue > hardwareTotal + 0.01) {
        problems.push('FLEET revenue exceeds hardware revenue, indicating hardware');
      }
    }
    return problems;
  });

  add('V-06', 'No subscription gates local safety', () => {
    const problems = [];
    for (const sku of subscriptionSkus) {
      if (sku.gatesLocalSafety !== false) problems.push(`${sku.id}: gatesLocalSafety not false`);
    }
    if (JSON.stringify(data.recurringRevenue ?? {}).includes('gatesLocalSafety":true')) {
      problems.push('a subscription gates local safety');
    }
    return problems;
  });

  add('V-07', 'Inherited milestone verdicts are unchanged', () => {
    const problems = [];
    const block = data.manifest?.statusBlock ?? {};
    if (block.MC12_VERDICT !== 'PARTIAL') problems.push('MC12_VERDICT changed');
    if (block.MC12_INTERNAL_ECONOMICS_SCOPE !== 'PASS_INTERNAL_ECONOMICS_SCOPE') {
      problems.push('MC12_INTERNAL_ECONOMICS_SCOPE changed');
    }
    if (external.mc12Manifest?.statusBlock?.MC12_VERDICT !== 'PARTIAL') {
      problems.push('MC-12 manifest verdict changed');
    }
    for (const [index, expected] of [
      [10, 'BLOCKED'],
      [11, 'PARTIAL'],
      [12, 'PARTIAL'],
    ]) {
      const row = (external.registryText ?? '')
        .split('\n')
        .find((line) => line.startsWith(`| ${index} |`));
      if (!row || !row.includes(expected))
        problems.push(`registry row ${index}: ${expected} not found`);
    }
    return problems;
  });

  add('V-08', 'Customer evidence is NONE and demand is never presented as validated', () => {
    const problems = [];
    for (const id of ['ASM-MC13-050', 'ASM-MC13-051', 'ASM-MC13-052']) {
      const record = A.get(id);
      if (!record || record.value != null || record.status !== 'UNKNOWN') {
        problems.push(`${id}: customer evidence not unknown`);
      }
    }
    if (data.manifest?.statusBlock?.CUSTOMER_WTP_VALIDATED !== false) problems.push('WTP flag');
    for (const profile of data.revenueDrivers?.demandProfiles ?? []) {
      if (profile.evidenceClass !== 'SCENARIO_ASSUMPTION')
        problems.push(`${profile.id}: evidence class`);
    }
    return problems;
  });

  add('V-09', 'No formal quotation, executed contract or RFQ evidence exists', () => {
    const problems = [];
    const counts = data.manifest?.evidenceCounts ?? {};
    if (counts.formalQuotations !== 0) problems.push('formal quotations > 0');
    if (counts.executedContracts !== 0) problems.push('executed contracts > 0');
    for (const record of data.assumptions?.assumptions ?? []) {
      if (record.evidenceClass === 'CONTRACTED') problems.push(`${record.id}: CONTRACTED evidence`);
    }
    return problems;
  });

  add('V-10', 'Every cost line has evidence class and behaviour; unknown is null', () => {
    const problems = [];
    for (const line of data.operatingCosts?.costLines ?? []) {
      if (!line.evidenceClass) problems.push(`${line.id}: no evidenceClass`);
      if (!line.behaviour) problems.push(`${line.id}: no behaviour`);
      if (line.monthlyAmountEur == null && !line.scenarioValues && !line.unknownReason) {
        problems.push(`${line.id}: null without unknownReason`);
      }
    }
    for (const item of data.capitalInvestments?.items ?? []) {
      if (!item.evidenceStatus) problems.push(`${item.id}: no evidenceStatus`);
      if (
        typeof item.estimatedAmountEur === 'number' &&
        ![
          'INHERITED_ASSUMPTION',
          'SCENARIO_ASSUMPTION',
          'ENGINEERING_ASSUMPTION',
          'PUBLISHED_TARIFF',
        ].includes(item.evidenceStatus)
      ) {
        problems.push(`${item.id}: numeric amount with evidenceStatus ${item.evidenceStatus}`);
      }
      if (
        typeof item.estimatedAmountEur === 'number' &&
        (item.notAQuote !== true || item.notABudget !== true)
      ) {
        problems.push(`${item.id}: numeric amount not labelled not-a-quote / not-a-budget`);
      }
      if (
        item.estimatedAmountEur == null &&
        !item.blockingCondition &&
        !item.cashFlowTreatment?.includes('NOT')
      ) {
        problems.push(`${item.id}: unknown amount without blocking condition`);
      }
    }
    return problems;
  });

  add('V-11', 'Every numeric price has a source path and record', () => {
    const problems = [];
    for (const sku of [...hardwareSkus, ...subscriptionSkus]) {
      const price = sku.priceHypothesis;
      if (price && price.grossAmountEur != null) {
        if (price.currency !== 'EUR') problems.push(`${sku.id}: non-EUR price without conversion`);
        if (!price.sourcePath) problems.push(`${sku.id}: numeric price without sourcePath`);
        if (!price.sourceRecordId) problems.push(`${sku.id}: numeric price without sourceRecordId`);
      }
    }
    for (const bundle of data.revenueDrivers?.bundles ?? []) {
      if (bundle.priceHypothesis?.amountEur != null && !bundle.priceHypothesis.sourceRecordId) {
        problems.push(`bundle ${bundle.id}: price without source`);
      }
    }
    return problems;
  });

  add('V-12', 'A missing data licence never becomes free', () => {
    const problems = [];
    const licence = (data.assumptions?.assumptions ?? []).find((record) =>
      /data-licence/i.test(record.name),
    );
    if (!licence || licence.value != null || licence.status !== 'UNKNOWN') {
      problems.push('data licence is not an explicit UNKNOWN');
    }
    for (const line of data.operatingCosts?.costLines ?? []) {
      if (line.category === 'DATA_LICENCE' && line.monthlyAmountEur === 0) {
        problems.push(`${line.id}: licence cost zeroed`);
      }
    }
    const base = hypotheticalMonthly('BASE_HYPOTHETICAL');
    const unknownText = JSON.stringify(base?.unknowns ?? []);
    if (!/licence/i.test(unknownText))
      problems.push('monthly model does not name the licence unknown');
    const stress = (data.stressTests?.cases ?? []).find(
      (item) => 'dataLicenceCostEurPerAccountYear' in (item.overrides ?? {}),
    );
    if (!stress) problems.push('no data-licence stress threshold');
    return problems;
  });

  add('V-13', 'The restricted current case generates no authorized revenue', () => {
    const problems = [];
    const restricted = hypotheticalMonthly('RESTRICTED_CURRENT');
    if (!restricted) return ['restricted scenario missing'];
    const columns = restricted.columns ?? {};
    for (const column of [
      'grossInvoicedRevenue',
      'netRecognizedRevenue',
      'hardwareRevenueNet',
      'subscriptionRevenueNet',
      'vatOutput',
      'refundsAllowance',
      'vatCollected',
    ]) {
      if ((columns[column] ?? []).some((value) => value !== 0)) problems.push(`${column} not zero`);
    }
    if ((columns.authorizedForSaleMask ?? []).some((value) => value !== 0))
      problems.push('authorized sale mask');
    for (const column of [
      'knownVariableContribution',
      'ebitdaLikeConditional',
      'operatingCashFlow',
      'cumulativeCashBalance',
      'financingRequirement',
    ]) {
      if ((columns[column] ?? []).some((value) => value !== null))
        problems.push(`${column} must be null`);
    }
    if ((columns.hardwareUnitsTotal ?? []).some((value) => value !== 0))
      problems.push('restricted units');
    return problems;
  });

  add('V-14', 'Hypothetical clearance switches never change a status flag', () => {
    const problems = [];
    const frozen = data.scenarioDefinitions?.statusFlags ?? {};
    for (const [key, value] of Object.entries(FROZEN_STATUS_FLAGS)) {
      if (frozen[key] !== value) problems.push(`top-level flag ${key}`);
    }
    for (const scenario of scenarioDefs) {
      for (const [key, value] of Object.entries(frozen)) {
        if ((scenario.statusFlags ?? frozen)[key] !== value)
          problems.push(`${scenario.id}: flag ${key}`);
      }
      for (const entry of scenario.clearanceSchedule ?? []) {
        if (entry.statusFlagUnchanged !== true)
          problems.push(`${scenario.id}: ${entry.familyId} flag switch`);
      }
    }
    return problems;
  });

  add('V-15', 'Tooling/NRE is never a variable cost and never counted twice', () => {
    const problems = [];
    const scenarios = external.hardwareReconciliation?.families ?? [];
    let scenarioCount = 0;
    for (const family of scenarios) {
      for (const scenario of family.scenarios ?? []) {
        scenarioCount += 1;
        if (scenario.sumCheckDeltaEur != null && Math.abs(scenario.sumCheckDeltaEur) > 0.005) {
          problems.push(`${family.familyId}/${scenario.volume}/${scenario.case}: sum delta`);
        }
        if (
          scenario.cost16ToolingEur != null &&
          scenario.toolingAmortizationFieldEur != null &&
          Math.abs(scenario.cost16ToolingEur - scenario.toolingAmortizationFieldEur) > 0.005
        ) {
          problems.push(
            `${family.familyId}/${scenario.volume}/${scenario.case}: tooling repeat field`,
          );
        }
        if (
          scenario.variableCostExcludingToolingEur != null &&
          scenario.knownSubtotalEur != null &&
          scenario.cost16ToolingEur != null &&
          Math.abs(
            scenario.knownSubtotalEur -
              scenario.cost16ToolingEur -
              scenario.variableCostExcludingToolingEur,
          ) > 0.005
        ) {
          problems.push(
            `${family.familyId}/${scenario.volume}/${scenario.case}: cost16 in variable cost`,
          );
        }
        if (scenario.cost16ToolingEur && scenario.cost16ToolingEur < 0) {
          problems.push('negative tooling');
        }
      }
    }
    if (scenarioCount !== 90) problems.push(`expected 90 MC-11 scenarios, found ${scenarioCount}`);
    const tooling = (data.capitalInvestments?.items ?? []).find((item) => item.id === 'INV-01');
    if (!tooling || tooling.notAQuote !== true || tooling.notABudget !== true) {
      problems.push('tooling envelope not labelled not-a-quote / not-a-budget');
    }
    // Contribution must exclude amortisation: recompute for every hypothetical month.
    for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
      const columns = hypotheticalMonthly(scenarioId)?.columns;
      if (!columns) continue;
      for (let m = 0; m < HORIZON; m += 1) {
        const expected =
          columns.netRecognizedRevenue[m] -
          columns.cogsHardware[m] -
          columns.softwareDirectCosts[m] -
          columns.paymentFees[m] -
          columns.inventoryCarryingCost[m] -
          columns.inventoryWriteOffCost[m];
        if (!approx(expected, columns.knownVariableContribution[m])) {
          problems.push(
            `${scenarioId} M${m + 1}: contribution includes amortisation or is inconsistent`,
          );
          break;
        }
      }
    }
    return problems;
  });

  add('V-16', 'Installation is excluded from the base unit cost and never double counted', () => {
    const problems = [];
    const unitEconomics = external.unitEconomics?.records ?? [];
    for (const sku of hardwareSkus) {
      if (sku.modelEnabled === false) continue;
      const sourceId = sku.costBasis?.sourceRecordId;
      if (!sourceId || sku.knownVariableCostEur == null) continue;
      const record = unitEconomics.find((item) => item.id === sourceId);
      if (!record) {
        problems.push(`${sku.id}: MC-12 record ${sourceId} not found`);
        continue;
      }
      if (Math.abs(record.knownVariableCostEur - sku.knownVariableCostEur) > 0.005) {
        problems.push(`${sku.id}: cost changed from MC-12`);
      }
      if (String(sourceId).includes('INSTALLER'))
        problems.push(`${sku.id}: installer configuration used`);
    }
    for (const scenarioId of ['BASE_HYPOTHETICAL']) {
      const columns = hypotheticalMonthly(scenarioId)?.columns ?? {};
      const installationRevenue = columns.installationRevenueNet;
      if (installationRevenue && installationRevenue.some((value) => (value ?? 0) !== 0)) {
        problems.push('installation revenue present without an applicable configuration');
      }
    }
    return problems;
  });

  add('V-17', 'Shared NAV/WEATHER entitlement is billed and costed once', () => {
    const problems = [];
    const ledger = (data.recurringRevenue?.sharedEntitlements ?? []).find(
      (entry) => entry.id === 'ENT-NAV-WEATHER',
    );
    if (!ledger) return ['shared entitlement missing'];
    if (ledger.doubleBillingAllowed !== false) problems.push('double billing allowed');
    if (ledger.doubleCostingAllowed !== false) problems.push('double costing allowed');
    const base = hypotheticalMonthly('BASE_HYPOTHETICAL')?.columns;
    if (base) {
      const nav = Object.entries(base.subscriptionActiveAccountsBySku ?? {})
        .filter(
          ([skuId]) =>
            (data.revenueDrivers?.subscriptionSkus ?? []).find((sku) => sku.id === skuId)
              ?.familyId === 'NAV',
        )
        .reduce((sum, [, values]) => sum + values[HORIZON - 1], 0);
      const weather = Object.entries(base.subscriptionActiveAccountsBySku ?? {})
        .filter(
          ([skuId]) =>
            (data.revenueDrivers?.subscriptionSkus ?? []).find((sku) => sku.id === skuId)
              ?.familyId === 'WEATHER',
        )
        .reduce((sum, [, values]) => sum + values[HORIZON - 1], 0);
      if (base.sharedLicenceAccountMonths?.[HORIZON - 1] !== Math.max(nav, weather)) {
        problems.push('shared licence account count is not max(NAV, WEATHER)');
      }
    }
    return problems;
  });

  add('V-18', 'No MC-14 execution', () => {
    const problems = [];
    if (data.mc14Handoff?.mc14Started !== false) problems.push('mc14Started not false');
    if (data.mc14Handoff?.mc14StartedByAnyAgent !== false)
      problems.push('mc14StartedByAnyAgent not false');
    const row = (external.registryText ?? '').split('\n').find((line) => line.startsWith('| 14 |'));
    if (!row || !row.includes('PLANNED')) problems.push('registry row 14 is not PLANNED');
    if (/MC14_STARTED = true|MC-14 started/i.test(external.decisionLogText ?? '')) {
      problems.push('decision log records MC-14 execution');
    }
    return problems;
  });

  add('V-19', 'Independent review exists and is not self-approved', () => {
    const problems = [];
    const review = data.reviewFindings ?? {};
    const verdict = review.verdict;
    const allowed = [
      'PENDING_INDEPENDENT_REVIEW',
      'PASS_INTERNAL_FINANCIAL_SCOPE',
      'PARTIAL',
      'FAIL',
    ];
    if (!allowed.includes(verdict)) problems.push(`review verdict ${verdict}`);
    for (const finding of review.findings ?? []) {
      if (finding.finalStatus === 'OPEN' && ['BLOCKING', 'MAJOR'].includes(finding.severity)) {
        problems.push(`${finding.id}: open ${finding.severity}`);
      }
    }
    if (data.manifest?.statusBlock?.MC13_INDEPENDENT_REVIEW !== verdict) {
      problems.push('manifest review verdict does not match review-findings.json');
    }
    if (!options.allowPendingReview && verdict === 'PENDING_INDEPENDENT_REVIEW') {
      problems.push('independent review still pending');
    }
    return problems;
  });

  add('V-20', 'No verified break-even or profitability claim where inputs are unknown', () => {
    const problems = [];
    const summary = data.breakEvenThresholds?.summary ?? {};
    if (summary.verified !== 0) problems.push('verified break-even count is not zero');
    for (const threshold of data.breakEvenThresholds?.thresholds ?? []) {
      if (threshold.status === 'VERIFIED') problems.push(`${threshold.id}: VERIFIED`);
      if (['NAV', 'WEATHER', 'PILOT'].includes(String(threshold.subjectId).split('-')[0])) {
        const unit = threshold.breakEvenType === 'UNIT_CONTRIBUTION_ZERO';
        const price = threshold.breakEvenType === 'MINIMUM_GROSS_PRICE';
        if ((unit || price) && threshold.status !== 'NOT_DETERMINABLE') {
          problems.push(
            `${threshold.id}: licensing/safety-blocked family cannot assert a ${threshold.status} threshold`,
          );
        }
        if ((unit || price) && threshold.value != null) {
          problems.push(
            `${threshold.id}: numeric value asserted while the required input is unknown`,
          );
        }
      }
    }
    for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
      const unknowns = hypotheticalMonthly(scenarioId)?.unknowns ?? [];
      if (!unknowns.length) problems.push(`${scenarioId}: no named unknowns`);
    }
    return problems;
  });

  add('V-21', 'Bundle component editions match the governing bundle contract', () => {
    const problems = [];
    const definitions = external.bundleDefinitions?.bundles ?? [];
    for (const bundle of data.revenueDrivers?.bundles ?? []) {
      if (bundle.id === 'FLEET') {
        if (bundle.hardwareByDefault !== false) problems.push('FLEET hardwareByDefault');
        if ((bundle.componentEditionIds ?? []).some((id) => id === 'HUB-STANDARD')) {
          problems.push('FLEET includes default hardware');
        }
      }
      const definition = definitions.find((item) => item.id === bundle.id);
      if (!definition) {
        problems.push(`bundle ${bundle.id}: no governing definition`);
        continue;
      }
      const expected = [
        ...new Set(
          (definition.components ?? []).map((component) => component.editionId).filter(Boolean),
        ),
      ].sort();
      const actual = [...(bundle.componentEditionIds ?? [])].sort();
      if (JSON.stringify(expected) !== JSON.stringify(actual)) {
        problems.push(
          `bundle ${bundle.id}: componentEditionIds differ from bundle-definitions.json`,
        );
      }
    }
    return problems;
  });

  /* --------------------------------------------------------------- arithmetic */

  add('A-01', 'Exactly 60 model periods per required scenario', () => {
    const problems = [];
    for (const scenarioId of SCENARIO_IDS) {
      const scenario = monthly.scenarios?.[scenarioId];
      if (!scenario) {
        problems.push(`missing ${scenarioId}`);
        continue;
      }
      for (const [column, values] of Object.entries(scenario.columns ?? {})) {
        if (typeof values === 'object' && values !== null && !Array.isArray(values)) {
          for (const [sku, series] of Object.entries(values)) {
            if (!isPeriodArray(series))
              problems.push(`${scenarioId}.${column}.${sku}: not 60 periods`);
          }
        } else if (!isPeriodArray(values)) {
          problems.push(`${scenarioId}.${column}: not 60 periods`);
        }
      }
    }
    return problems;
  });

  add('A-02', '12/36/60 views reconcile with the single monthly model', () => {
    const problems = [];
    for (const scenarioId of SCENARIO_IDS) {
      const stored = data.scenarioResults?.scenarios?.[scenarioId];
      const columns = monthly.scenarios?.[scenarioId]?.columns;
      if (!stored || !columns) {
        problems.push(`${scenarioId}: missing results or columns`);
        continue;
      }
      for (const month of [12, 36, 60]) {
        const expected = viewTotalsFromColumns(columns, month);
        const actual = stored.views?.[`M${month}`] ?? {};
        for (const key of [
          'grossInvoicedRevenue',
          'netRecognizedRevenue',
          'hardwareRevenueNet',
          'subscriptionRevenueNet',
          'contribution',
          'ebitdaLikeConditional',
          'netCashFlow',
          'cumulativeCashBalance',
          'financingRequirement',
        ]) {
          if (expected[key] == null && actual[key] == null) continue;
          if (!approx(expected[key], actual[key], 0.05)) {
            problems.push(`${scenarioId} M${month} ${key}: ${actual[key]} vs ${expected[key]}`);
          }
        }
      }
    }
    return problems;
  });

  add('A-03', 'Net recognised revenue equals hardware plus subscription net revenue', () => {
    const problems = [];
    for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
      const c = hypotheticalMonthly(scenarioId)?.columns;
      if (!c) continue;
      for (let m = 0; m < HORIZON; m += 1) {
        if ((c.hardwareRevenueNet[m] ?? 0) < 0)
          problems.push(`${scenarioId} M${m + 1}: negative hardware revenue`);
        if (
          !approx(c.netRecognizedRevenue[m], c.hardwareRevenueNet[m] + c.subscriptionRevenueNet[m])
        ) {
          problems.push(`${scenarioId} M${m + 1}: net revenue split`);
          break;
        }
      }
    }
    return problems;
  });

  add('A-04', 'VAT is never recognised as net revenue', () => {
    const problems = [];
    for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
      const c = hypotheticalMonthly(scenarioId)?.columns;
      if (!c) continue;
      for (let m = 0; m < HORIZON; m += 1) {
        const expected = c.hardwareVatOutput[m] + c.subscriptionVatOutput[m];
        if (!approx(c.vatOutput[m], expected, 0.05)) {
          problems.push(`${scenarioId} M${m + 1}: VAT does not reconcile with its components`);
          break;
        }
        const hardwareExpected =
          c.grossInvoicedRevenue[m] -
          c.subscriptionCashGross[m] -
          c.refundsAllowance[m] -
          c.hardwareRevenueNet[m];
        if (!approx(c.hardwareVatOutput[m], hardwareExpected, 0.05)) {
          problems.push(`${scenarioId} M${m + 1}: hardware VAT does not reconcile`);
          break;
        }
      }
    }
    return problems;
  });

  add('A-05', 'Monthly and annual subscription amounts reconcile', () => {
    const problems = [];
    const find = (id) => subscriptionSkus.find((sku) => sku.id === id);
    const watch = find('WATCH-MONITORING');
    if (!watch || Math.abs(watch.priceHypothesis.grossAmountEur - 118.8) > 0.005) {
      problems.push('WATCH monitoring annual amount is not 12 x 9.90');
    }
    for (const sku of subscriptionSkus) {
      if (sku.modelEnabled === false) continue;
      if (!['MONTH', 'YEAR'].includes(sku.billingPeriod))
        problems.push(`${sku.id}: billing period`);
      if (sku.priceHypothesis?.grossAmountEur == null)
        problems.push(`${sku.id}: no price hypothesis`);
    }
    const fleetStart = find('FLEET-START');
    if (
      !fleetStart ||
      fleetStart.billingPeriod !== 'MONTH' ||
      fleetStart.priceHypothesis.grossAmountEur !== 49
    ) {
      problems.push('FLEET START is not a 49 EUR/vessel-month hypothesis');
    }
    return problems;
  });

  add(
    'A-06',
    'Cash collections and recognised revenue are distinguished; receivables reconcile',
    () => {
      const problems = [];
      for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
        const c = hypotheticalMonthly(scenarioId)?.columns;
        if (!c) continue;
        let previous = 0;
        for (let m = 0; m < HORIZON; m += 1) {
          const expected =
            previous + c.distributorInvoicedGross[m] - c.distributorCollectionsGross[m];
          if (!approx(expected, c.tradeReceivablesEnd[m], 0.05)) {
            problems.push(`${scenarioId} M${m + 1}: receivables identity`);
            break;
          }
          previous = c.tradeReceivablesEnd[m];
          if (c.tradeReceivablesEnd[m] < 0) {
            problems.push(`${scenarioId} M${m + 1}: negative trade receivables`);
            break;
          }
          const lagMonths = 2;
          const expectedCollections =
            m - lagMonths >= 0 ? c.distributorInvoicedGross[m - lagMonths] : 0;
          if (!approx(c.distributorCollectionsGross[m], expectedCollections, 0.05)) {
            problems.push(
              `${scenarioId} M${m + 1}: distributor collections are not the lagged invoicing`,
            );
            break;
          }
          const receipts =
            c.directReceiptsGross[m] +
            c.distributorCollectionsGross[m] +
            c.subscriptionCashGross[m];
          if (!approx(receipts, c.cashReceiptsGross[m], 0.05)) {
            problems.push(`${scenarioId} M${m + 1}: cash receipts identity`);
            break;
          }
          if (!approx(c.cashCollectionsNetOfVat[m], c.cashReceiptsGross[m] - c.vatPaid[m], 0.05)) {
            problems.push(`${scenarioId} M${m + 1}: net cash collections`);
            break;
          }
        }
      }
      return problems;
    },
  );

  add('A-07', 'Payment fees recompute from the published tariff', () => {
    const problems = [];
    for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
      const c = hypotheticalMonthly(scenarioId)?.columns;
      const scenario = scenarioById.get(scenarioId);
      if (!c || !scenario) continue;
      const direct = (scenario.channelMix ?? []).find(
        (row) => row.appliesTo === 'SUBSCRIPTION' && row.channel === 'DIRECT_TO_CONSUMER',
      );
      const share = direct ? direct.sharePct / 100 : 1;
      for (let m = 0; m < HORIZON; m += 1) {
        const hardwareGross = c.grossInvoicedRevenue[m] - c.subscriptionCashGross[m];
        const expected =
          ((hardwareGross + c.subscriptionCashGross[m] * share) * 1.5) / 100 +
          c.paymentTransactions[m] * 0.25;
        if (!approx(c.paymentFees[m], expected, 0.05)) {
          problems.push(`${scenarioId} M${m + 1}: payment fee`);
          break;
        }
      }
    }
    return problems;
  });

  add(
    'A-08',
    'Annual prepayment is recognised straight-line and deferred revenue reconciles',
    () => {
      const problems = [];
      for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
        const c = hypotheticalMonthly(scenarioId)?.columns;
        if (!c) continue;
        let previous = 0;
        for (let m = 0; m < HORIZON; m += 1) {
          const expected = previous + c.subscriptionCashNet[m] - c.subscriptionRevenueNet[m];
          if (!approx(expected, c.deferredRevenueEnd[m], 0.05)) {
            problems.push(`${scenarioId} M${m + 1}: deferred revenue`);
            break;
          }
          previous = c.deferredRevenueEnd[m];
        }
      }
      return problems;
    },
  );

  add('A-09', 'COGS equals units sold multiplied by the declared unit cost', () => {
    const problems = [];
    for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
      const scenario = hypotheticalMonthly(scenarioId);
      if (!scenario) continue;
      const unitCost = scenario.unitCostBySku ?? {};
      for (let m = 0; m < HORIZON; m += 1) {
        let expected = 0;
        for (const [skuId, units] of Object.entries(scenario.columns.hardwareUnitsBySku ?? {})) {
          if (unitCost[skuId] == null) continue;
          expected += units[m] * unitCost[skuId];
        }
        if (!approx(scenario.columns.cogsHardware[m], expected, 0.05)) {
          problems.push(`${scenarioId} M${m + 1}: COGS`);
          break;
        }
      }
    }
    return problems;
  });

  add('A-10', 'Inventory unit identity holds and stock is never negative', () => {
    const problems = [];
    for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
      const c = hypotheticalMonthly(scenarioId)?.columns;
      if (!c) continue;
      for (let m = 0; m < HORIZON; m += 1) {
        const expected =
          c.inventoryUnitsBegin[m] + c.receiptsUnits[m] - c.unitsSold[m] - c.writeOffsUnits[m];
        if (!approx(expected, c.inventoryUnitsEnd[m])) {
          problems.push(`${scenarioId} M${m + 1}: inventory identity`);
          break;
        }
        if (c.inventoryUnitsEnd[m] < 0) {
          problems.push(`${scenarioId} M${m + 1}: negative inventory`);
          break;
        }
        if (m > 0 && c.inventoryUnitsBegin[m] !== c.inventoryUnitsEnd[m - 1]) {
          problems.push(`${scenarioId} M${m + 1}: opening inventory`);
          break;
        }
      }
    }
    return problems;
  });

  add('A-11', 'Inventory purchases cash, receipts cost, prepayments and payables reconcile', () => {
    const problems = [];
    for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
      const c = hypotheticalMonthly(scenarioId)?.columns;
      if (!c) continue;
      const cash = totalOf(c.inventoryPurchasesCash);
      const receipts = totalOf(c.inventoryReceiptsCost);
      if (cash == null || receipts == null) continue;
      const prepaymentsEnd = c.inventoryPrepayments[HORIZON - 1] ?? 0;
      const payablesEnd = c.inventoryPayables[HORIZON - 1] ?? 0;
      if (!approx(cash, receipts + prepaymentsEnd - payablesEnd, 5)) {
        problems.push(
          `${scenarioId}: purchases cash ${cash} vs receipts ${receipts} + prepayments ${prepaymentsEnd} - payables ${payablesEnd}`,
        );
      }
    }
    return problems;
  });

  add('A-12', 'VAT output and payment lag reconcile with recoverable input VAT', () => {
    const problems = [];
    for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
      const c = hypotheticalMonthly(scenarioId)?.columns;
      if (!c) continue;
      let credit = 0;
      for (let m = 0; m < HORIZON; m += 1) {
        const lagged = m - 1;
        const output = lagged >= 0 ? c.vatOutput[lagged] : 0;
        const input = lagged >= 0 ? c.inputVat[lagged] : 0;
        let due = output - input + credit;
        if (due < 0) {
          credit = due;
          due = 0;
        } else {
          credit = 0;
        }
        if (!approx(c.vatPaid[m], due, 0.05)) {
          problems.push(`${scenarioId} M${m + 1}: VAT payment`);
          break;
        }
      }
    }
    return problems;
  });

  add('A-13', 'Opening cash plus net cash flow equals the cumulative cash balance', () => {
    const problems = [];
    if (monthly.openingCashConventionEur !== 0)
      problems.push('opening cash convention is not zero');
    for (const scenarioId of SCENARIO_IDS) {
      const c = hypotheticalMonthly(scenarioId)?.columns;
      if (!c) continue;
      if (scenarioId === 'RESTRICTED_CURRENT') continue;
      let previous = 0;
      for (let m = 0; m < HORIZON; m += 1) {
        const expected = previous + c.netCashFlow[m];
        if (!approx(expected, c.cumulativeCashBalance[m], 0.05)) {
          problems.push(`${scenarioId} M${m + 1}: cumulative cash`);
          break;
        }
        previous = c.cumulativeCashBalance[m];
      }
    }
    return problems;
  });

  add(
    'A-14',
    'Operating cash flow equals conditional EBITDA minus working-capital movement',
    () => {
      const problems = [];
      for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
        const c = hypotheticalMonthly(scenarioId)?.columns;
        if (!c) continue;
        for (let m = 0; m < HORIZON; m += 1) {
          const expected = c.ebitdaLikeConditional[m] - c.workingCapitalMovement[m];
          if (!approx(c.operatingCashFlow[m], expected, 0.05)) {
            problems.push(`${scenarioId} M${m + 1}: operating cash identity`);
            break;
          }
          const wcExpected =
            c.netRecognizedRevenue[m] -
            c.cashReceiptsGross[m] +
            c.vatPaid[m] +
            (c.inventoryPurchasesCash[m] - c.cogsHardware[m]) -
            c.inventoryWriteOffCost[m];
          if (!approx(c.workingCapitalMovement[m], wcExpected, 0.05)) {
            problems.push(`${scenarioId} M${m + 1}: working capital definition`);
            break;
          }
        }
      }
      return problems;
    },
  );

  add('A-15', 'Net cash flow equals operating plus investing cash flow', () => {
    const problems = [];
    for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
      const c = hypotheticalMonthly(scenarioId)?.columns;
      if (!c) continue;
      for (let m = 0; m < HORIZON; m += 1) {
        if (!approx(c.netCashFlow[m], c.operatingCashFlow[m] + c.investingCashFlow[m], 0.05)) {
          problems.push(`${scenarioId} M${m + 1}: net cash`);
          break;
        }
        if (!approx(c.investingCashFlow[m], -c.capexCash[m], 0.05)) {
          problems.push(`${scenarioId} M${m + 1}: investing cash`);
          break;
        }
      }
    }
    return problems;
  });

  add('A-16', 'Financing requirement is the running maximum cash drawdown', () => {
    const problems = [];
    for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
      const c = hypotheticalMonthly(scenarioId)?.columns;
      if (!c) continue;
      let maximum = 0;
      for (let m = 0; m < HORIZON; m += 1) {
        maximum = Math.max(maximum, Math.max(0, -c.cumulativeCashBalance[m]));
        if (!approx(c.financingRequirement[m], maximum, 0.05)) {
          problems.push(`${scenarioId} M${m + 1}: financing requirement`);
          break;
        }
        if (!approx(c.cashBurn[m], Math.max(0, -c.cumulativeCashBalance[m]), 0.05)) {
          problems.push(`${scenarioId} M${m + 1}: cash burn`);
          break;
        }
      }
    }
    return problems;
  });

  add(
    'A-17',
    'Contribution and EBITDA-like result recompute without mixing fixed and variable costs',
    () => {
      const problems = [];
      for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
        const c = hypotheticalMonthly(scenarioId)?.columns;
        if (!c) continue;
        for (let m = 0; m < HORIZON; m += 1) {
          const contribution =
            c.netRecognizedRevenue[m] -
            c.cogsHardware[m] -
            c.softwareDirectCosts[m] -
            c.paymentFees[m] -
            c.inventoryCarryingCost[m] -
            c.inventoryWriteOffCost[m];
          const ebitda = contribution - c.fixedOpexEnvelope[m];
          if (!approx(contribution, c.knownVariableContribution[m], 0.05)) {
            problems.push(`${scenarioId} M${m + 1}: contribution`);
            break;
          }
          if (!approx(ebitda, c.ebitdaLikeConditional[m], 0.05)) {
            problems.push(`${scenarioId} M${m + 1}: EBITDA-like`);
            break;
          }
        }
      }
      return problems;
    },
  );

  add(
    'A-18',
    'Depreciation and amortisation are non-cash and appear only in the accounting result',
    () => {
      const problems = [];
      for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
        const c = hypotheticalMonthly(scenarioId)?.columns;
        if (!c) continue;
        for (let m = 0; m < HORIZON; m += 1) {
          if (
            !approx(
              c.accountingOperatingResult[m],
              c.ebitdaLikeConditional[m] - c.amortizationNonCash[m],
              0.05,
            )
          ) {
            problems.push(`${scenarioId} M${m + 1}: accounting result`);
            break;
          }
        }
        if ((c.amortizationNonCash ?? []).some((value) => value < 0))
          problems.push(`${scenarioId}: negative amortisation`);
      }
      return problems;
    },
  );

  add('A-19', 'Capex cash and non-cash amortisation reconcile to the capital schedule', () => {
    const problems = [];
    const items = data.capitalInvestments?.items ?? [];
    for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
      const c = hypotheticalMonthly(scenarioId)?.columns;
      if (!c) continue;
      const multiplierId =
        scenarioId === 'DOWNSIDE'
          ? 'ASM-MC13-039'
          : scenarioId === 'UPSIDE_HYPOTHETICAL'
            ? 'ASM-MC13-041'
            : 'ASM-MC13-040';
      const multiplier = number(multiplierId);
      const expectedCash = zerosLike();
      const expectedAmort = zerosLike();
      for (const item of items) {
        if (typeof item.estimatedAmountEur !== 'number') continue;
        if (['WORKING_CAPITAL_NOT_CAPEX', 'RESERVE_NOT_SPENT'].includes(item.cashFlowTreatment))
          continue;
        const amount = item.estimatedAmountEur * multiplier;
        const month = Math.max(1, item.plannedMonth ?? 1);
        if (month <= HORIZON) expectedCash[month - 1] += amount;
        const life = item.capitalizationMonths ?? 36;
        if (item.capitalizationTreatment !== 'EXPENSED' && life > 0) {
          for (let i = 0; i < life && month + i <= HORIZON; i += 1) {
            expectedAmort[month + i - 1] += amount / life;
          }
        }
      }
      for (let m = 0; m < HORIZON; m += 1) {
        if (!approx(c.capexCash[m], expectedCash[m], 0.05)) {
          problems.push(`${scenarioId} M${m + 1}: capex cash`);
          break;
        }
        if (!approx(c.amortizationNonCash[m], expectedAmort[m], 0.05)) {
          problems.push(`${scenarioId} M${m + 1}: amortisation`);
          break;
        }
      }
    }
    return problems;

    function zerosLike() {
      return Array(HORIZON).fill(0);
    }
  });

  add(
    'A-20',
    'Break-even thresholds recompute from the model; unknown inputs force NOT_DETERMINABLE',
    () => {
      const problems = [];
      const thresholds = data.breakEvenThresholds?.thresholds ?? [];
      for (const scenarioId of ['DOWNSIDE', 'BASE_HYPOTHETICAL', 'UPSIDE_HYPOTHETICAL']) {
        const c = monthly.scenarios?.[scenarioId]?.columns;
        if (!c) continue;
        const operating = findFirst(c.ebitdaLikeConditional, (value) => value >= 0);
        const cashFlow = findFirst(c.operatingCashFlow, (value) => value > 0);
        let recovery = null;
        let negative = false;
        for (let m = 0; m < HORIZON; m += 1) {
          if (c.cumulativeCashBalance[m] < 0) negative = true;
          if (negative && c.cumulativeCashBalance[m] >= 0) {
            recovery = m + 1;
            break;
          }
        }
        const stored = thresholds.filter((threshold) => threshold.scenarioId === scenarioId);
        const operatingThreshold = stored.find(
          (threshold) => threshold.breakEvenType === 'OPERATING_BREAK_EVEN',
        );
        if (operatingThreshold && operatingThreshold.value !== operating) {
          problems.push(`${scenarioId}: operating break-even month`);
        }
        const cashThreshold = stored.find(
          (threshold) => threshold.breakEvenType === 'CASH_FLOW_BREAK_EVEN',
        );
        if (cashThreshold && cashThreshold.value !== cashFlow)
          problems.push(`${scenarioId}: cash-flow month`);
        const recoveryThreshold = stored.find(
          (threshold) => threshold.breakEvenType === 'CUMULATIVE_CASH_RECOVERY',
        );
        if (recoveryThreshold && recoveryThreshold.value !== recovery)
          problems.push(`${scenarioId}: recovery month`);
        const financingThreshold = stored.find(
          (threshold) => threshold.breakEvenType === 'FINANCING_REQUIREMENT',
        );
        if (
          financingThreshold &&
          !approx(financingThreshold.value, c.financingRequirement[HORIZON - 1], 0.05)
        ) {
          problems.push(`${scenarioId}: financing requirement`);
        }
      }
      for (const sku of hardwareSkus) {
        if (sku.modelEnabled === false) continue;
        const threshold = thresholds.find(
          (item) => item.id === `BE-BASE_HYPOTHETICAL-UNIT-${sku.id}`,
        );
        if (!threshold) continue;
        if (sku.familyId === 'PILOT' || sku.familyId === 'NAV' || sku.familyId === 'WEATHER') {
          if (threshold.status !== 'NOT_DETERMINABLE')
            problems.push(`${sku.id}: licensing/safety threshold`);
          continue;
        }
        if (sku.knownVariableCostEur == null) continue;
        const factor = channelFactorFromScenario('BASE_HYPOTHETICAL', 'HARDWARE');
        const gross = (sku.priceHypothesis?.grossAmountEur ?? 0) * factor;
        const net = sku.priceHypothesis?.vatBasis === 'VAT_EXCLUDED_B2B' ? gross : gross / 1.21;
        const expected = net - sku.knownVariableCostEur;
        if (!approx(threshold.value, expected, 0.05))
          problems.push(`${sku.id}: unit contribution threshold`);
      }
      return problems;

      function findFirst(values, predicate) {
        for (let m = 0; m < HORIZON; m += 1) {
          if (values[m] != null && predicate(values[m])) return m + 1;
        }
        return null;
      }
      function channelFactorFromScenario(scenarioId, appliesTo) {
        const scenario = scenarioById.get(scenarioId);
        const rows = (scenario?.channelMix ?? []).filter((row) => row.appliesTo === appliesTo);
        if (!rows.length) return 1;
        return rows.reduce(
          (factor, row) => factor + (row.sharePct / 100) * (1 - row.revenueDeductionPct / 100),
          0,
        );
      }
    },
  );

  add('A-21', 'Stress results recompute from the base scenario and declared overrides', () => {
    if (!model) return ['engine recomputation failed'];
    const problems = [];
    const stored = data.stressTests?.cases ?? [];
    if (stored.length !== model.stressTests.cases.length)
      problems.push('stress case count differs');
    for (const baseline of model.stressTests.cases) {
      const record = stored.find((item) => item.id === baseline.id);
      if (!record) {
        problems.push(`${baseline.id}: missing from committed stress file`);
        continue;
      }
      if (!approx(record.financingRequirementEur, baseline.financingRequirementEur, 0.05)) {
        problems.push(`${baseline.id}: financing requirement`);
      }
      if (!approx(record.cumulativeCashEndEur, baseline.cumulativeCashEndEur, 0.05)) {
        problems.push(`${baseline.id}: cumulative cash`);
      }
      if (
        !approx(
          record.results?.M60?.netRecognizedRevenue,
          baseline.results.M60.netRecognizedRevenue,
          0.05,
        )
      ) {
        problems.push(`${baseline.id}: M60 net revenue`);
      }
    }
    return problems;
  });

  add('A-26', 'Every declared stress override changes at least one result', () => {
    if (!model) return ['engine recomputation failed'];
    const problems = [];
    const base = model.stressTests.summary.baseReference;
    const baseEnvelope =
      data.monthlyFinancialModel?.scenarios?.BASE_HYPOTHETICAL?.supporting?.fundingEnvelopeEur;
    for (const testCase of model.stressTests.cases) {
      if (!Object.keys(testCase.overrides ?? {}).length) continue;
      const unchanged =
        Math.abs((testCase.cumulativeCashEndEur ?? 0) - (base.cumulativeCashEndEur ?? 0)) < 0.005 &&
        Math.abs((testCase.financingRequirementEur ?? 0) - (base.financingRequirementEur ?? 0)) <
          0.005 &&
        Math.abs(
          (testCase.results?.M60?.contribution ?? 0) -
            (data.scenarioResults?.scenarios?.BASE_HYPOTHETICAL?.views?.M60?.contribution ?? 0),
        ) < 0.005 &&
        Math.abs((testCase.fundingEnvelopeEur ?? 0) - (baseEnvelope ?? 0)) < 0.005;
      if (unchanged) problems.push(`${testCase.id}: declared overrides are a no-op`);
    }
    return problems;
  });

  add('A-22', 'Scenario results and derived files are deterministically reproducible', () => {
    if (!model) return ['engine recomputation failed'];
    const problems = [];
    const expected = {
      'monthly-financial-model.json': model.monthlyFinancialModel,
      'scenario-results.json': model.scenarioResults,
      'stress-tests.json': model.stressTests,
      'break-even-thresholds.json': model.breakEvenThresholds,
      'portfolio-prioritization.json': model.portfolioPrioritization,
    };
    for (const [file, value] of Object.entries(expected)) {
      const raw = data._raw?.[file];
      if (raw == null) {
        problems.push(`${file}: missing committed file`);
        continue;
      }
      if (raw !== serialize(value))
        problems.push(`${file}: differs from deterministic regeneration`);
    }
    return problems;
  });

  add('A-23', 'Negative economics are retained, not clamped or suppressed', () => {
    const problems = [];
    const ais = (data.breakEvenThresholds?.thresholds ?? []).find(
      (threshold) => threshold.id === 'BE-BASE_HYPOTHETICAL-UNIT-AIS-RECEIVER',
    );
    if (!ais || !(ais.value < 0)) problems.push('AIS negative contribution suppressed');
    const hub = (data.breakEvenThresholds?.thresholds ?? []).find(
      (threshold) => threshold.id === 'BE-BASE_HYPOTHETICAL-UNIT-HUB-STANDARD',
    );
    if (!hub || hub.value == null) problems.push('HUB conditional contribution missing');
    const downside = data.scenarioResults?.scenarios?.DOWNSIDE?.views?.M60?.ebitdaLikeConditional;
    if (downside != null && downside >= 0) problems.push('downside result is not negative');
    const baseContribution =
      data.scenarioResults?.scenarios?.BASE_HYPOTHETICAL?.views?.M60?.contribution;
    const adverse = (data.stressTests?.cases ?? []).some(
      (item) =>
        item.results?.M60?.contribution != null &&
        baseContribution != null &&
        item.results.M60.contribution < baseContribution,
    );
    if (!adverse) problems.push('stress cases have no adverse contribution');
    return problems;
  });

  add('A-24', 'Predecessor unit economics are inherited without silent cost change', () => {
    const problems = [];
    const records = external.unitEconomics?.records ?? [];
    for (const sku of hardwareSkus) {
      if (sku.knownVariableCostEur == null) continue;
      const record = records.find((item) => item.id === sku.costBasis?.sourceRecordId);
      if (!record) {
        problems.push(`${sku.id}: source record missing`);
        continue;
      }
      if (!approx(record.knownVariableCostEur, sku.knownVariableCostEur, 0.005)) {
        problems.push(`${sku.id}: known cost changed`);
      }
    }
    for (const sku of subscriptionSkus) {
      if (sku.knownDirectCostEurPerYear == null) continue;
      const record = records.find((item) => item.id === sku.costBasis?.sourceRecordId);
      if (!record) {
        problems.push(`${sku.id}: source record missing`);
        continue;
      }
      if (!approx(record.knownVariableCostEur, sku.knownDirectCostEurPerYear, 0.005)) {
        problems.push(`${sku.id}: direct cost changed`);
      }
    }
    return problems;
  });

  /* ------------------------------------------------------- recurring / WC */

  add(
    'R-01',
    'Every subscription SKU declares billing periodicity and direct cost or unknown',
    () => {
      const problems = [];
      for (const sku of subscriptionSkus) {
        if (!['MONTH', 'YEAR'].includes(sku.billingPeriod))
          problems.push(`${sku.id}: billing period`);
        if (
          sku.knownDirectCostEurPerYear == null &&
          sku.modelEnabled !== false &&
          !sku.unknownCostCategories?.length
        ) {
          problems.push(`${sku.id}: no direct cost and no explicit unknown`);
        }
      }
      return problems;
    },
  );

  add('R-02', 'Churn, renewal and activation are labelled scenario assumptions', () => {
    const problems = [];
    for (const id of [
      'ASM-MC13-020',
      'ASM-MC13-021',
      'ASM-MC13-022',
      'ASM-MC13-023',
      'ASM-MC13-024',
      'ASM-MC13-025',
      'ASM-MC13-026',
      'ASM-MC13-027',
      'ASM-MC13-028',
    ]) {
      const record = A.get(id);
      if (!record || record.evidenceClass !== 'SCENARIO_ASSUMPTION')
        problems.push(`${id}: not labelled`);
    }
    for (const [, rates] of Object.entries(data.recurringRevenue?.cohortAssumptions ?? {})) {
      if (typeof rates === 'object' && rates !== null && 'annualRenewalRate' in rates) {
        if (typeof rates.annualRenewalRate !== 'number') problems.push('cohort rates not numeric');
      }
    }
    return problems;
  });

  add('R-03', 'Inactive accounts and devices retain a cost, not a silent zero', () => {
    const problems = [];
    const policy = data.recurringRevenue?.inactiveAccountPolicy;
    if (!policy) return ['inactive account policy missing'];
    if (policy.retainedIdentityAndStorageCost !== true) problems.push('inactive cost not retained');
    if (!(policy.retainedCostFactor > 0)) problems.push('retained cost factor not positive');
    if (!A.has(policy.assumptionId)) problems.push('inactive policy assumption unresolved');
    return problems;
  });

  add('R-04', 'FLEET per-vessel SaaS has a cloud cost driver and no hardware', () => {
    const problems = [];
    if (!(number('ASM-MC13-033') > 0)) problems.push('FLEET cloud per vessel not positive');
    if (!(number('ASM-MC13-036') > 0)) problems.push('FLEET support per vessel not positive');
    const base = hypotheticalMonthly('BASE_HYPOTHETICAL')?.columns;
    if (base && (base.fleetActiveVessels ?? []).some((value) => value < 0))
      problems.push('negative fleet vessels');
    return problems;
  });

  add('R-05', 'Deferred revenue policy is declared and reconciled', () => {
    const problems = [];
    if (data.recurringRevenue?.deferredRevenuePolicy?.method !== 'STRAIGHT_LINE_12_MONTHS') {
      problems.push('deferred revenue policy missing');
    }
    if (!A.has(data.recurringRevenue?.deferredRevenuePolicy?.assumptionId)) {
      problems.push('deferred revenue assumption unresolved');
    }
    return problems;
  });

  add('R-06', 'Inventory carrying and obsolescence costs are modelled', () => {
    const problems = [];
    if (!(number('ASM-MC13-016') > 0)) problems.push('carrying cost not positive');
    if (!(number('ASM-MC13-017') >= 0)) problems.push('obsolescence not declared');
    const base = hypotheticalMonthly('BASE_HYPOTHETICAL')?.columns;
    if (base && (base.inventoryCarryingCost ?? []).every((value) => value === 0)) {
      problems.push('carrying cost never applied');
    }
    return problems;
  });

  /* -------------------------------------------------------------- delivery */

  add('D-01', 'Manifest status block matches the delivered condition', () => {
    const problems = [];
    const block = data.manifest?.statusBlock ?? {};
    const required = [
      'MC13_VERDICT',
      'MC13_INTERNAL_FINANCIAL_SCOPE',
      'MC13_60_MONTH_MODEL',
      'MC13_12_36_60_RECONCILIATION',
      'MC13_CASHFLOW_VALIDATED',
      'MC13_FINANCING_REQUIREMENT_MODEL',
      'MC13_BREAK_EVEN_STATUS',
      'MC13_CUSTOMER_DEMAND_EVIDENCE',
      'MC13_EXTERNAL_COMMERCIAL_VALIDATION',
      'MC13_INDEPENDENT_REVIEW',
      'MC12_VERDICT',
      'PRICE_APPROVED',
      'LICENSING_RIGHTS_GRANTED',
      'CUSTOMER_WTP_VALIDATED',
      'COMMERCIAL_AVAILABILITY',
      'PR_CREATED',
      'MERGED',
      'DEPLOYED',
      'MC14_STARTED',
    ];
    for (const key of required) if (!(key in block)) problems.push(`status block missing ${key}`);
    if (block.MC13_VERDICT !== 'PARTIAL') problems.push('MC13_VERDICT must be PARTIAL');
    if (block.PRICE_APPROVED !== 'NONE') problems.push('PRICE_APPROVED');
    if (block.LICENSING_RIGHTS_GRANTED !== false) problems.push('LICENSING_RIGHTS_GRANTED');
    if (block.CUSTOMER_WTP_VALIDATED !== false) problems.push('CUSTOMER_WTP_VALIDATED');
    if (block.COMMERCIAL_AVAILABILITY !== 'NOT_FOR_SALE') problems.push('COMMERCIAL_AVAILABILITY');
    if (block.MERGED !== false || block.DEPLOYED !== false) problems.push('merge/deploy flag');
    if (block.MC14_STARTED !== false) problems.push('MC14_STARTED');
    if (block.MC13_EXTERNAL_COMMERCIAL_VALIDATION !== 'BLOCKED_OR_NOT_OBTAINED') {
      problems.push('external commercial validation status');
    }
    return problems;
  });

  add('D-02', 'Every required document exists with its mandated content', () => {
    const problems = [];
    for (const [file, keywords] of Object.entries(REQUIRED_DOCS)) {
      const text = external.docs?.[file];
      if (text == null) {
        problems.push(`${file}: missing`);
        continue;
      }
      for (const keyword of keywords) {
        if (!text.toLowerCase().includes(keyword.toLowerCase())) {
          problems.push(`${file}: missing "${keyword}"`);
        }
      }
    }
    return problems;
  });

  add('D-03', 'Generated figures register equals deterministic regeneration', () => {
    if (!model) return ['engine recomputation failed'];
    if (data._figuresText == null) return ['figures register missing'];
    if (data._figuresText !== renderFiguresMarkdown(model)) {
      return ['figures register differs from deterministic regeneration'];
    }
    return [];
  });

  add('D-04', 'Every generated result block declares source and transformation lineage', () => {
    const problems = [];
    const transformationIds = new Set(
      (data.sourceLedger?.transformations ?? []).map((item) => item.id),
    );
    const blocks = monthly.lineage?.columnBlocks ?? {};
    const requiredBlocks = [
      'demand',
      'revenue',
      'vat',
      'subscriptions',
      'cogs',
      'inventory',
      'opex',
      'capex',
      'cashFlow',
      'breakEven',
      'stress',
      'scenarios',
    ];
    for (const block of requiredBlocks) {
      if (!blocks[block]?.length) problems.push(`missing lineage block ${block}`);
      for (const id of blocks[block] ?? []) {
        if (!transformationIds.has(id)) problems.push(`${block}: unresolved transformation ${id}`);
      }
    }
    return problems;
  });

  add('D-05', 'MC-12 handoff inputs are consumed or explicitly unknown', () => {
    const problems = [];
    const consumed = new Set((data.handoffConsumption?.inputs ?? []).map((item) => item.inputId));
    for (const id of [
      'INV-01',
      'INV-02',
      'INV-03',
      'INV-04',
      'INV-05',
      'INV-06',
      'REC-01',
      'REC-02',
      'REC-03',
      'REC-04',
      'REC-05',
      'REC-06',
      'REC-07',
      'REC-08',
      'CAC',
      'CHURN',
      'WC',
    ]) {
      if (!consumed.has(id)) problems.push(`handoff input ${id} not consumed`);
    }
    for (const item of data.handoffConsumption?.inputs ?? []) {
      if (!['MODELLED', 'EXPLICIT_UNKNOWN', 'SUPPRESSED'].includes(item.treatment)) {
        problems.push(`${item.inputId}: treatment ${item.treatment}`);
      }
    }
    return problems;
  });

  add('D-06', 'Predecessor MC-11/MC-12 data files are unchanged', () => {
    const problems = [];
    const baseline = data.predecessorBaseline?.files ?? {};
    if (!Object.keys(baseline).length) return ['predecessor baseline missing'];
    for (const [path, expected] of Object.entries(baseline)) {
      const target = join(REPO_ROOT, path);
      if (!existsSync(target)) {
        problems.push(`${path}: missing`);
        continue;
      }
      const actual = createHash('sha256').update(readFileSync(target)).digest('hex');
      if (actual !== expected) problems.push(`${path}: content changed`);
    }
    return problems;
  });

  add('D-07', 'Independent review findings are tracked and closed', () => {
    const review = data.reviewFindings ?? {};
    const problems = [];
    const findings = review.findings ?? [];
    const counts = review.findingCounts ?? {};
    if (counts.total != null && counts.total !== findings.length)
      problems.push('finding count mismatch');
    for (const finding of findings) {
      for (const field of [
        'id',
        'severity',
        'status',
        'evidence',
        'requiredCorrection',
        'finalStatus',
      ]) {
        if (!(field in finding)) problems.push(`${finding.id ?? '?'}: missing ${field}`);
      }
    }
    if (!review.independentRecomputation) problems.push('independent recomputation not recorded');
    if (review.verdict === 'PENDING_INDEPENDENT_REVIEW') {
      problems.push('audit not completed');
    } else if (review.verdict === 'PASS_INTERNAL_FINANCIAL_SCOPE' || review.verdict === 'PARTIAL') {
      for (const finding of findings) {
        if (['BLOCKING', 'MAJOR'].includes(finding.severity) && finding.finalStatus === 'OPEN') {
          problems.push(`${finding.id}: open ${finding.severity}`);
        }
      }
    }
    return problems;
  });

  add('D-08', 'No merge, deployment, publication or MC-14 execution is asserted', () => {
    const problems = [];
    const block = data.manifest?.statusBlock ?? {};
    if (block.MERGED !== false) problems.push('MERGED');
    if (block.DEPLOYED !== false) problems.push('DEPLOYED');
    if (block.MC14_STARTED !== false) problems.push('MC14_STARTED');
    if (data.mc14Handoff?.mc14Started !== false) problems.push('handoff mc14Started');
    const financialTexts = Object.values(external.docs ?? {})
      .filter(Boolean)
      .join('\n');
    if (/MERGED = true|DEPLOYED = true|MC14_STARTED = true/.test(financialTexts)) {
      problems.push('a financial document asserts a prohibited completion flag');
    }
    return problems;
  });

  add('D-09', 'Human-readable reports reconcile with the generated figures/data', () => {
    const problems = [];
    const analyticalDocs = Object.keys(REQUIRED_DOCS).filter(
      (file) => !['MC-13-DELIVERY.md', 'MC13-EXECUTIVE-REPORT.md'].includes(file),
    );
    for (const file of analyticalDocs) {
      const text = external.docs?.[file];
      if (!text) continue;
      const referencesData =
        text.includes('MC13-GENERATED-FIGURES') ||
        text.includes('monthly-financial-model.json') ||
        text.includes('scenario-results.json') ||
        text.includes('break-even-thresholds.json') ||
        text.includes('stress-tests.json') ||
        text.includes('portfolio-prioritization.json') ||
        text.includes('assumptions.json') ||
        text.includes('mc14-handoff-inputs.json') ||
        text.includes('blocker-register.json');
      if (!referencesData) problems.push(`${file}: no data/figures reference`);
    }
    return problems;
  });

  add('D-10', 'Assumptions and evidence register equals deterministic regeneration', () => {
    if (!model) return ['engine recomputation failed'];
    const text = external.docs?.['MC13-ASSUMPTIONS-AND-EVIDENCE-REGISTER.md'];
    if (text == null) return ['assumptions register missing'];
    const expected = renderAssumptionsRegister(data.assumptions, model);
    if (text !== expected) return ['assumptions register differs from deterministic regeneration'];
    return [];
  });

  const passed = checks.filter((check) => check.status === 'PASS').length;
  const failedChecks = checks.filter((check) => check.status === 'FAIL');
  return {
    milestone: 'MC-13',
    generatedAt: AS_OF,
    counts: { total: checks.length, passed, failed: failedChecks.length },
    ok: failedChecks.length === 0,
    failures: failedChecks.map((check) => check.id),
    violations: failedChecks.flatMap((check) => check.violations),
    checks,
  };
}

function main() {
  const jsonMode = process.argv.includes('--json');
  const allowPendingReview = process.argv.includes('--allow-pending-review');
  const { data, missing } = loadFromDisk();
  if (missing.length) {
    console.error(`MC-13 financial validator: missing data files: ${missing.join(', ')}`);
    process.exitCode = 1;
    return;
  }
  const report = validate(data, { allowPendingReview });
  if (jsonMode) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log('MC-13 financial-model validator');
    console.log(
      `${report.counts.total} checks - ${report.counts.passed} PASS / ${report.counts.failed} FAIL`,
    );
    for (const check of report.checks) {
      if (check.status === 'FAIL') {
        console.log(`FAIL ${check.id} - ${check.description}`);
        for (const violation of check.violations.slice(0, 6)) console.log(`      ${violation}`);
      }
    }
    if (!report.ok) {
      console.log('');
      console.log(`FAILED CHECKS: ${report.failures.join(', ')}`);
      console.log(`VIOLATIONS: ${report.violations.length}`);
    }
  }
  if (!report.ok) process.exitCode = 1;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  main();
}
