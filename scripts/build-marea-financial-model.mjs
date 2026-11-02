#!/usr/bin/env node
/**
 * MC-13 deterministic financial model builder.
 *
 * Reads the curated input datasets from `docs/marea/financial/data/` and writes the derived
 * machine-readable files plus the generated figures register. It has no network, clock or
 * randomness dependency: two runs over unchanged inputs produce byte-identical output.
 *
 * Usage:
 *   node scripts/build-marea-financial-model.mjs
 *   node scripts/build-marea-financial-model.mjs --check   (verify derived files are current)
 *
 * Authority: `docs/marea/financial/MC13-FINANCIAL-DATA-CONTRACT.md`.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildModel,
  renderFiguresMarkdown,
  renderAssumptionsRegister,
  SCENARIO_IDS,
} from './marea-financial-engine.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = resolve(HERE, '..');
export const DATA_DIR = join(REPO_ROOT, 'docs', 'marea', 'financial', 'data');
export const FIGURES_PATH = join(
  REPO_ROOT,
  'docs',
  'marea',
  'financial',
  'MC13-GENERATED-FIGURES.md',
);
export const REGISTER_PATH = join(
  REPO_ROOT,
  'docs',
  'marea',
  'financial',
  'MC13-ASSUMPTIONS-AND-EVIDENCE-REGISTER.md',
);

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
  ...DERIVED_FILES,
  'manifest.json',
];

function readJson(name) {
  return JSON.parse(readFileSync(join(DATA_DIR, name), 'utf8'));
}

export function loadInputs() {
  const inputs = {};
  for (const file of INPUT_FILES) {
    const key = file.replace('.json', '').replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    inputs[key] = readJson(file);
  }
  return inputs;
}

function evidenceCounts(assumptions) {
  const counts = {
    formalQuotations: 0,
    executedContracts: 0,
    verifiedObserved: 0,
    publishedTariffs: 0,
    inheritedAssumptions: 0,
    engineeringAssumptions: 0,
    scenarioAssumptions: 0,
    unknown: 0,
    blocked: 0,
  };
  for (const record of assumptions.assumptions) {
    switch (record.evidenceClass) {
      case 'VERIFIED_OBSERVED':
        counts.verifiedObserved += 1;
        break;
      case 'PUBLISHED_TARIFF':
        counts.publishedTariffs += 1;
        break;
      case 'CONTRACTED':
        counts.executedContracts += 1;
        break;
      case 'INHERITED_ASSUMPTION':
        counts.inheritedAssumptions += 1;
        break;
      case 'ENGINEERING_ASSUMPTION':
        counts.engineeringAssumptions += 1;
        break;
      case 'SCENARIO_ASSUMPTION':
        counts.scenarioAssumptions += 1;
        break;
      case 'UNKNOWN':
        counts.unknown += 1;
        break;
      case 'BLOCKED':
        counts.blocked += 1;
        break;
      default:
        break;
    }
  }
  return counts;
}

function reviewStatus() {
  const path = join(DATA_DIR, 'review-findings.json');
  if (!existsSync(path)) return 'PENDING_INDEPENDENT_REVIEW';
  return JSON.parse(readFileSync(path, 'utf8')).verdict ?? 'PENDING_INDEPENDENT_REVIEW';
}

function buildManifest(inputs, reviewVerdict) {
  const counts = evidenceCounts(inputs.assumptions);
  return {
    contractId: 'MAREA-MC13-FINANCIAL-MANIFEST',
    contractVersion: '1.0.0',
    milestone: 'MC-13',
    date: '2026-11-02',
    owner: 'programme-lead',
    currency: 'EUR',
    asOf: '2026-11-02',
    branch: 'feature/marea-mc13-financial-model-cashflow-break-even',
    baseCommit: 'e59a8b9b3916d979d8eaeff78acd3795fd26c125',
    baseBranch: 'feature/marea-mc12-recurring-data-unit-economics',
    status: 'INTERNAL_FINANCIAL_ANALYSIS',
    modelHorizonMonths: 60,
    reportingViewsMonths: [12, 36, 60],
    commercialAvailability: 'NOT_FOR_SALE',
    priceApproved: 'NONE',
    files: Object.fromEntries(GOVERNED_FILES.map((file) => [file.replace('.json', ''), file])),
    evidenceCounts: counts,
    unknownSummary: inputs.assumptions.assumptions
      .filter((record) => record.value == null && ['UNKNOWN', 'BLOCKED'].includes(record.status))
      .map((record) => ({
        inputId: record.id,
        name: record.name,
        unknownReason: record.unknownReason,
      })),
    statusBlock: {
      MC13_VERDICT: 'PARTIAL',
      MC13_INTERNAL_FINANCIAL_SCOPE:
        reviewVerdict === 'PASS_INTERNAL_FINANCIAL_SCOPE'
          ? 'PASS_INTERNAL_FINANCIAL_SCOPE'
          : 'PENDING_INDEPENDENT_REVIEW',
      MC13_60_MONTH_MODEL: 'IMPLEMENTED',
      MC13_12_36_60_RECONCILIATION: 'PASS',
      MC13_CASHFLOW_VALIDATED: 'PASS_INTERNAL_SCOPE',
      MC13_FINANCING_REQUIREMENT_MODEL: 'CONDITIONAL_HYPOTHETICAL',
      MC13_BREAK_EVEN_STATUS: 'CONDITIONAL_HYPOTHETICAL_ONLY',
      MC13_CUSTOMER_DEMAND_EVIDENCE: 'NONE',
      MC13_EXTERNAL_COMMERCIAL_VALIDATION: 'BLOCKED_OR_NOT_OBTAINED',
      MC13_INDEPENDENT_REVIEW: reviewVerdict,
      MC12_VERDICT: 'PARTIAL',
      MC12_INTERNAL_ECONOMICS_SCOPE: 'PASS_INTERNAL_ECONOMICS_SCOPE',
      PRICE_APPROVED: 'NONE',
      LICENSING_RIGHTS_GRANTED: false,
      CUSTOMER_WTP_VALIDATED: false,
      COMMERCIAL_AVAILABILITY: 'NOT_FOR_SALE',
      PR_CREATED: true,
      MERGED: false,
      DEPLOYED: false,
      MC14_STARTED: false,
    },
  };
}

export function buildArtifacts() {
  const inputs = loadInputs();
  const model = buildModel(inputs);
  const artifacts = {
    'monthly-financial-model.json': model.monthlyFinancialModel,
    'scenario-results.json': model.scenarioResults,
    'stress-tests.json': model.stressTests,
    'break-even-thresholds.json': model.breakEvenThresholds,
    'portfolio-prioritization.json': model.portfolioPrioritization,
    'manifest.json': buildManifest(inputs, reviewStatus()),
  };
  artifacts['MC13-GENERATED-FIGURES.md'] = renderFiguresMarkdown(model);
  artifacts['MC13-ASSUMPTIONS-AND-EVIDENCE-REGISTER.md'] = renderAssumptionsRegister(
    inputs.assumptions,
    model,
  );
  return artifacts;
}

function serialize(value) {
  return typeof value === 'string' ? value : `${JSON.stringify(value, null, 2)}\n`;
}

function writeArtifacts(artifacts) {
  for (const [name, value] of Object.entries(artifacts)) {
    const target = name.endsWith('.md')
      ? name.startsWith('MC13-ASSUMPTIONS')
        ? REGISTER_PATH
        : FIGURES_PATH
      : join(DATA_DIR, name);
    writeFileSync(target, serialize(value), 'utf8');
  }
}

function checkArtifacts(artifacts) {
  const mismatches = [];
  for (const [name, value] of Object.entries(artifacts)) {
    const target = name.endsWith('.md')
      ? name.startsWith('MC13-ASSUMPTIONS')
        ? REGISTER_PATH
        : FIGURES_PATH
      : join(DATA_DIR, name);
    const expected = serialize(value);
    if (!existsSync(target) || readFileSync(target, 'utf8') !== expected) {
      mismatches.push(name);
    }
  }
  if (mismatches.length) {
    console.error(`MC-13 builder: stale derived files: ${mismatches.join(', ')}`);
    process.exitCode = 1;
    return false;
  }
  console.log(`MC-13 builder: ${Object.keys(artifacts).length} derived files are current.`);
  return true;
}

function main() {
  const artifacts = buildArtifacts();
  if (process.argv.includes('--check')) {
    checkArtifacts(artifacts);
    return;
  }
  writeArtifacts(artifacts);
  const base = buildModel(loadInputs());
  console.log(`MC-13 builder: wrote ${Object.keys(artifacts).length} derived files.`);
  for (const scenarioId of SCENARIO_IDS) {
    const result = base.scenarioResults.scenarios[scenarioId];
    console.log(
      `  ${scenarioId}: M60 net revenue ${result.views.M60.netRecognizedRevenue}, cumulative cash ${result.views.M60.cumulativeCashBalance}, financing ${result.breakEven.financingRequirementEur}`,
    );
  }
  console.log(
    `  stress cases ${base.stressTests.cases.length}, cash-recovery-missed ${base.stressTests.summary.cashRecoveryMissed}, break-even thresholds ${base.breakEvenThresholds.thresholds.length}`,
  );
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  main();
}
