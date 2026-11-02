#!/usr/bin/env node
/**
 * MC-12 unit-economics and economic data-contract validator.
 *
 * Authority: `docs/marea/economics/data/MC12-DATA-CONTRACT.md` — §2 universal rules, §3
 * vocabularies, §4 file schemas and §5 mandatory validation checks (S-01..S-05, V-01..V-18,
 * A-01..A-14, R-01..R-08, D-01..D-04). Every check below recomputes from source records; a
 * declared total is never compared with itself.
 *
 * Read-only with respect to business data: it loads docs/marea/economics/data/*.json (plus the
 * cross-file authorities listed below), validates, prints a report and exits non-zero on any
 * violation. It never writes, migrates or repairs data.
 *
 * Cross-file authorities:
 *   docs/marea/hardware/data/cost-scenarios.json          (A-09: 90 MC-11 scenarios)
 *   docs/marea/bundles/bundle-definitions.json            (A-06/V-05: bundle composition)
 *   docs/marea/hardware/data/*.json                       (D-04: frozen MC-11 content baseline)
 *
 * Recorded contract notes (reported, never silently ignored):
 *   - V-12 follows the contract wording exactly: a zero-fee public-domain/open-licence dataset
 *     may be PUBLISHED with OFFICIAL_LICENSING_DOCUMENT; a non-zero PUBLISHED price requires a
 *     tariff/observation class.
 *   - U-07 conversion scope: provider observations retain their source currency and the EUR
 *     conversion basis is declared centrally (recurring-cost-inputs fxBasis and ASM-MC12-021);
 *     every declared `conversion`/`fxBasis`/`fxRates` entry is still checked in A-12.
 *   - Legal-tax items preserve the original external blocker code in `externalBlockerCode`; that
 *     code is a note, never a cross-file model reference (the model `blockerId` must resolve).
 *
 * Usage:
 *   node scripts/check-marea-unit-economics.mjs            full gate
 *   node scripts/check-marea-unit-economics.mjs --json     machine-readable report
 *
 * Dependency-free on purpose (no runtime packages added).
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, '..');
const DATA_DIR = join(REPO_ROOT, 'docs', 'marea', 'economics', 'data');
const HARDWARE_DATA_DIR = join(REPO_ROOT, 'docs', 'marea', 'hardware', 'data');
const BUNDLE_DEFINITIONS_PATH = join(
  REPO_ROOT,
  'docs',
  'marea',
  'bundles',
  'bundle-definitions.json',
);

/* ------------------------------------------------------------------ constants */

export const TOLERANCE = 0.005;
const AS_OF = '2026-11-02';
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Every data file the contract governs, including the two raw provider collections. */
export const FILES = {
  manifest: 'manifest.json',
  assumptions: 'assumptions.json',
  providers: 'providers.json',
  providerEvidenceChartWeather: 'provider-evidence.chart-weather.json',
  providerEvidenceConnectivityCloud: 'provider-evidence.connectivity-cloud.json',
  recurringCostInputs: 'recurring-cost-inputs.json',
  hardwareCostReconciliation: 'hardware-cost-reconciliation.json',
  licensingRights: 'licensing-rights.json',
  legalTaxInputs: 'legal-tax-inputs.json',
  unitEconomics: 'unit-economics.json',
  bundleEconomics: 'bundle-economics.json',
  channelEconomics: 'channel-economics.json',
  sensitivity: 'sensitivity-scenarios.json',
  blockerRegister: 'blocker-register.json',
  decisionMatrix: 'decision-matrix.json',
  mc13Handoff: 'mc13-handoff-inputs.json',
};

/** Immutable inherited programme states (MC-10/MC-11 verdicts and governance gates). */
export const GOVERNANCE_INVARIANTS = {
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
};

/** Delivery values the manifest status block must carry verbatim (contract §4.1/D-03). */
const FROZEN_STATUS_BLOCK = {
  MC12_VERDICT: 'PARTIAL',
  MC12_INTERNAL_ECONOMICS_SCOPE: 'PASS_INTERNAL_ECONOMICS_SCOPE',
  MC12_EXTERNAL_COMMERCIAL_EVIDENCE: 'BLOCKED_OR_NOT_OBTAINED',
  CUSTOMER_WTP_VALIDATED: false,
  PRICE_APPROVED: 'NONE',
  LICENSING_RIGHTS_GRANTED: false,
  COMMERCIAL_AVAILABILITY: 'NOT_FOR_SALE',
  INDEPENDENT_REVIEW: 'PASS_INTERNAL_ECONOMICS_SCOPE',
  PR_CREATED: true,
  MERGED: false,
  DEPLOYED: false,
  MC13_STARTED: false,
};

export const CANONICAL_PRODUCTS = [
  'NAV',
  'HUB',
  'AIS',
  'PILOT',
  'SENSE',
  'WATCH',
  'DISPLAY',
  'WEATHER',
  'FLEET',
];
export const CANONICAL_BUNDLES = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'];
export const CONNECTED_HARDWARE_FAMILIES = ['HUB', 'WATCH', 'DISPLAY', 'AIS'];
export const SELLING_PRICE_STATUSES = ['HYPOTHESIS_UNAPPROVED', 'NOT_ESTABLISHED'];

/* §3.2 vocabularies. The frozen allowed sets are the contract values plus the declared
 * extensions below (recorded because the delivered dataset needs the states they express). */
const EVIDENCE_CLASSES = [
  'FORMAL_PROVIDER_QUOTATION',
  'EXECUTED_CONTRACT',
  'PUBLISHED_PROVIDER_TARIFF',
  'OFFICIAL_LICENSING_DOCUMENT',
  'PUBLIC_PRICE_OBSERVATION',
  'ENGINEERING_ASSUMPTION',
  'INACCESSIBLE',
  'UNKNOWN',
  'NOT_AUTHORIZED',
];
const PROVIDER_PRICE_STATUSES = [
  'PUBLISHED',
  'ON_REQUEST',
  'NOT_PUBLISHED',
  'INACCESSIBLE',
  'NOT_APPLICABLE',
  'UNKNOWN',
];
const VAT_BASES = ['VAT_EXCLUDED', 'VAT_INCLUDED', 'VAT_UNKNOWN', 'VAT_NOT_APPLICABLE'];
const RIGHTS_STATUSES = [
  'PERMITTED',
  'REQUIRES_CONTRACT',
  'PROHIBITED',
  'UNKNOWN',
  'NOT_GRANTED',
  'NOT_APPLICABLE',
];
const PRODUCTION_ELIGIBILITY = ['YES', 'NO', 'UNKNOWN', 'NOT_APPLICABLE'];
const COST_STATUSES = ['KNOWN', 'ASSUMPTION', 'UNKNOWN', 'NOT_APPLICABLE', 'NOT_QUANTIFIABLE'];
const COST_BEHAVIOURS = [
  'VARIABLE',
  'STEPPED',
  'CONTRACT_MINIMUM',
  'ANNUAL_FIXED',
  'ONE_TIME',
  'UNCERTAIN',
];
const DRIVERS = [
  'PER_DEVICE_MONTH',
  'PER_VESSEL_MONTH',
  'PER_SUBSCRIPTION_MONTH',
  'PER_ORGANIZATION_MONTH',
  'PER_VESSEL_IN_TENANT',
  'PER_MESSAGE_OR_ALERT',
  'PER_GB',
  'PER_TELEMETRY_EVENT',
  'PER_CHART_ENTITLEMENT',
  'PER_SUPPORT_INCIDENT',
  'PER_TRANSACTION',
  'PER_UNIT',
  'PER_ACCOUNT_YEAR',
  'ONE_OFF',
  'ANNUAL_FIXED',
  'CONTRACT_MINIMUM',
];
const CLASSIFICATIONS = [
  'ECONOMICS_EVIDENCED',
  'CONDITIONAL_ECONOMIC_CASE',
  'COST_MODEL_INCOMPLETE',
  'LICENSING_BLOCKED',
  'SAFETY_BLOCKED',
  'DEFER_RECOMMENDED',
];
const CONTRIBUTION_STATUSES = ['COMPLETE_UNDER_LABELLED_ASSUMPTIONS', 'INCOMPLETE_UNKNOWN_COSTS'];
const CONFIDENCES = ['HIGH', 'MEDIUM', 'LOW', 'NONE'];
const OBJECT_TYPES = [
  'PHYSICAL_SKU',
  'SOFTWARE_ENTITLEMENT',
  'SUBSCRIPTION',
  'OPTIONAL_ACCESSORY',
  'INSTALLER_SERVICE',
  'CONDITIONAL_EDITION',
  'QUOTATION_PACKAGE',
];
const COMMERCIAL_AVAILABILITIES = ['NOT_FOR_SALE'];
const SEVERITIES = ['BLOCKING', 'MAJOR', 'MINOR'];
const MATERIALITIES = ['MATERIAL', 'IMMATERIAL'];

/**
 * V-12 is implemented exactly as the amended contract states it: a zero-fee public-domain or
 * open-licence dataset may be `PUBLISHED` with `OFFICIAL_LICENSING_DOCUMENT`; any non-zero
 * `PUBLISHED` price still requires `PUBLISHED_PROVIDER_TARIFF` or `PUBLIC_PRICE_OBSERVATION`.
 */
const ZERO_FEE_PUBLICATION_CLASSES = ['OFFICIAL_LICENSING_DOCUMENT'];

/** Frozen aggregate SHA-256 of docs/marea/hardware/data/*.json, recorded for D-04 on 2026-11-02. */
export const MC11_FROZEN_BASELINE_SHA256 =
  'bc2ae455bab331acb8990e10d7851980f4df5994240e3ae1bdd1d267033e13aa';
export const MC11_FROZEN_FILES = [
  'architecture-options.json',
  'compatibility-requirements.json',
  'component-register.json',
  'conformity-applicability.json',
  'cost-scenarios.json',
  'decisions.json',
  'engineering-bom.json',
  'evidence-index.json',
  'governance-status.json',
  'hardware-families.json',
  'manifest.json',
  'manufacturing-bom.json',
  'nmea-status.json',
  'price-observations.json',
  'qualification-plan.json',
  'review-findings.json',
  'risks.json',
  'supplier-register.json',
];

const HARDWARE_COST_SCENARIOS_FILE = 'cost-scenarios.json';

/* Fixed versus variable cost categories (contract §5 A-10/A-11). */
const FIXED_COST_CATEGORY =
  /^(COST-16|COST-17)$|TOOLING|NRE|CERTIFICATION|SECURITY_MAINTENANCE|PRODUCT_LIABILITY/i;
const HARDWARE_COST_CATEGORY = /^COST-\d+$/;

/* -------------------------------------------------------------------- helpers */

const arr = (x) => (Array.isArray(x) ? x : []);
const obj = (x) => (x && typeof x === 'object' && !Array.isArray(x) ? x : {});
const isNum = (x) => typeof x === 'number' && Number.isFinite(x);
const isInt = (x) => isNum(x) && Number.isInteger(x);
const isStr = (x) => typeof x === 'string' && x.trim().length > 0;
const isUrl = (x) => isStr(x) && /^https?:\/\/[^\s]+$/i.test(x.trim());
const round2 = (x) => Math.round((x + Number.EPSILON) * 100) / 100;
const near = (a, b) => isNum(a) && isNum(b) && Math.abs(a - b) <= TOLERANCE;
const same = (a, b) => isNum(a) && isNum(b) && Math.abs(a - b) <= 1e-9;
const daysBetween = (later, earlier) =>
  Math.round((Date.parse(`${later}T00:00:00Z`) - Date.parse(`${earlier}T00:00:00Z`)) / 86_400_000);
const unique = (list) => [...new Set(list)];

function dupes(list) {
  const seen = new Set();
  const out = new Set();
  for (const item of list) {
    if (seen.has(item)) out.add(item);
    seen.add(item);
  }
  return [...out];
}

function indexBy(list, key) {
  const map = new Map();
  for (const item of arr(list)) {
    const id = obj(item)[key];
    if (isStr(id) && !map.has(id)) map.set(id, item);
  }
  return map;
}

export function walk(node, path, visit) {
  visit(node, path);
  if (Array.isArray(node)) {
    node.forEach((item, i) => walk(item, `${path}[${i}]`, visit));
  } else if (node && typeof node === 'object') {
    for (const key of Object.keys(node)) {
      walk(node[key], path ? `${path}.${key}` : key, visit);
    }
  }
}

/** Walk every business document (skips the validator's own `_` loader metadata). */
function forEachBusinessFile(data, visit) {
  for (const [key, value] of Object.entries(data)) {
    if (key.startsWith('_')) continue;
    walk(value, key, visit);
  }
}

function collectFieldEntries(data, predicate) {
  const found = [];
  forEachBusinessFile(data, (node, path) => {
    if (!node || typeof node !== 'object' || Array.isArray(node)) return;
    for (const key of Object.keys(node)) {
      if (predicate(key, node[key], path)) {
        found.push({ key, value: node[key], path: `${path}.${key}` });
      }
    }
  });
  return found;
}

function collectStrings(data, pattern) {
  const found = [];
  forEachBusinessFile(data, (node) => {
    if (typeof node === 'string' && pattern.test(node)) found.push(node);
  });
  return found;
}

const lineCategory = (line) => {
  const record = obj(line);
  if (isStr(record.categoryId)) return record.categoryId;
  if (isStr(record.category)) return record.category;
  return '';
};

/* -------------------------------------------------------------- data accessors */

const manifestOf = (d) => obj(d.manifest);
const ueRecords = (d) => arr(obj(d.unitEconomics).records);
const beRecords = (d) => arr(obj(d.bundleEconomics).records);
const rcInputs = (d) => arr(obj(d.recurringCostInputs).inputs);
const providerRecords = (d) => arr(obj(d.providers).records);
const rawProviderRecords = (d) => [
  ...arr(obj(d.providerEvidenceChartWeather).records),
  ...arr(obj(d.providerEvidenceConnectivityCloud).records),
];
const rightsRecords = (d) => arr(obj(d.licensingRights).rights);
const assumptions = (d) => arr(obj(d.assumptions).assumptions);
const legalItems = (d) => arr(obj(d.legalTaxInputs).items);
const hardBoundaries = (d) => arr(obj(d.legalTaxInputs).hardBoundaries);
const blockers = (d) => arr(obj(d.blockerRegister).blockers);
const scenarios = (d) => arr(obj(d.sensitivity).scenarios);
const decisionDimensions = (d) => arr(obj(d.decisionMatrix).dimensions);
const decisionFamilies = (d) => arr(obj(d.decisionMatrix).families);
const decisionBundles = (d) => arr(obj(d.decisionMatrix).bundles);
const reconFamilies = (d) => arr(obj(d.hardwareCostReconciliation).families);
const externalBundleDefinitions = (d) => obj(obj(d._external).bundleDefinitions);
const externalHardwareScenarios = (d) => arr(obj(obj(d._external).hardwareCostScenarios).scenarios);

const asOfOf = (d) => (isStr(manifestOf(d).asOf) ? manifestOf(d).asOf : AS_OF);
const allIds = (d) =>
  new Set(
    [
      ...ueRecords(d).map((r) => r.id),
      ...beRecords(d).map((r) => r.id),
      ...providerRecords(d).map((r) => r.id),
      ...rawProviderRecords(d).map((r) => r.id),
      ...rightsRecords(d).map((r) => r.id),
      ...blockers(d).map((r) => r.id),
      ...assumptions(d).map((r) => r.id),
      ...legalItems(d).map((r) => r.id),
      ...hardBoundaries(d).map((r) => r.id),
      ...scenarios(d).map((r) => r.id),
      ...arr(obj(d.sensitivity).stressCases).map((r) => r.id),
      ...decisionDimensions(d).map((r) => r.id),
      ...reconFamilies(d).flatMap((f) =>
        arr(f.scenarios).map((s) => `${f.familyId}-${s.volume}-${s.case}`),
      ),
      ...arr(obj(d.hardwareCostReconciliation).unknowns).map((r) => r.id),
    ].filter(isStr),
  );

function vocabularyFor(key, path) {
  if (key === 'priceStatus') {
    const providerRegister = /^(providers|providerEvidence)/.test(path);
    return providerRegister
      ? { name: 'provider register priceStatus', allowed: PROVIDER_PRICE_STATUSES }
      : { name: 'selling priceStatus', allowed: SELLING_PRICE_STATUSES };
  }
  const map = {
    evidenceClass: EVIDENCE_CLASSES,
    vatBasis: VAT_BASES,
    redistribution: RIGHTS_STATUSES,
    rightsStatus: RIGHTS_STATUSES,
    productionEligible: PRODUCTION_ELIGIBILITY,
    costStatus: COST_STATUSES,
    costBehaviour: COST_BEHAVIOURS,
    driver: DRIVERS,
    classification: CLASSIFICATIONS,
    contributionStatus: CONTRIBUTION_STATUSES,
    confidence: CONFIDENCES,
    objectType: OBJECT_TYPES,
    commercialAvailability: COMMERCIAL_AVAILABILITIES,
    severity: SEVERITIES,
    materiality: MATERIALITIES,
  };
  if (!Object.prototype.hasOwnProperty.call(map, key)) return null;
  return { name: key, allowed: map[key] };
}

function providerObservationErrors(d) {
  const out = [];
  const sets = [
    ['providers.json', providerRecords(d)],
    ['provider-evidence.chart-weather.json', arr(obj(d.providerEvidenceChartWeather).records)],
    [
      'provider-evidence.connectivity-cloud.json',
      arr(obj(d.providerEvidenceConnectivityCloud).records),
    ],
  ];
  for (const [file, records] of sets) {
    for (const record of records) {
      const evidenceClass = record.evidenceClass;
      if (
        !['ENGINEERING_ASSUMPTION', 'UNKNOWN'].includes(evidenceClass) &&
        (!isUrl(record.sourceUrl) || !ISO_DATE.test(String(record.retrievedOn ?? '')))
      ) {
        out.push(
          `${file}/${record.id}: dependency observation (${evidenceClass}) without sourceUrl+retrievedOn`,
        );
      }
    }
  }
  return out;
}

function guaranteedDeliveryClaims(d) {
  const out = [];
  const negation = /\b(not|no|never|without|cannot|non)\b|-?non-?$/i;
  for (const text of collectStrings(d, /guarantee/i)) {
    const lower = text.toLowerCase();
    const re = /guarantee/g;
    let match;
    let flagged = false;
    while (!flagged && (match = re.exec(lower)) !== null) {
      const before = lower.slice(Math.max(0, match.index - 40), match.index);
      if (negation.test(before)) continue;
      const around = lower.slice(match.index, match.index + 70);
      if (/alert|notification|delivery|message/i.test(around)) flagged = true;
    }
    if (flagged) out.push(`guaranteed alert delivery claimed: "${text.slice(0, 90)}"`);
  }
  return out;
}

/* ------------------------------------------------------------------ catalogue */

export const CHECKS = [
  /* ---------------------------------------------------------- structural (S) */
  {
    id: 'S-01',
    description: 'All required data files exist and parse as JSON',
    run(data) {
      const out = [];
      for (const file of arr(data._missing)) out.push(`required data file missing: ${file}`);
      for (const file of arr(data._readErrors))
        out.push(`required data file does not parse: ${file}`);
      for (const [key, file] of Object.entries(FILES)) {
        if (!(key in data)) {
          out.push(`${file}: not loaded`);
          continue;
        }
        if (!data[key] || typeof data[key] !== 'object' || Array.isArray(data[key])) {
          out.push(`${file}: root value is not a JSON object`);
        }
      }
      return out;
    },
  },
  {
    id: 'S-02',
    description: 'Every file satisfies U-02 and every record identifier satisfies U-03',
    run(data) {
      const out = [];
      const required = ['contractId', 'contractVersion', 'milestone', 'date', 'owner', 'currency'];
      for (const [key, file] of Object.entries(FILES)) {
        const doc = obj(data[key]);
        for (const field of required) {
          if (!isStr(doc[field])) out.push(`${file}: missing ${field} (U-02)`);
        }
        if (doc.milestone !== 'MC-12') {
          out.push(`${file}: milestone "${doc.milestone}" is not MC-12 (U-02)`);
        }
        if (doc.date !== AS_OF) out.push(`${file}: date "${doc.date}" is not ${AS_OF} (U-02)`);
        if (doc.currency !== 'EUR') {
          out.push(`${file}: currency "${doc.currency}" is not EUR (U-02)`);
        }
      }
      for (const [key, file] of Object.entries(FILES)) {
        const ids = [];
        for (const value of Object.values(obj(data[key]))) {
          if (!Array.isArray(value)) continue;
          for (const item of value) {
            if (isStr(obj(item).id)) ids.push(item.id);
          }
        }
        for (const duplicate of dupes(ids)) {
          out.push(`${file}: duplicate record id ${duplicate} (U-03)`);
        }
      }
      for (const [list, name] of [
        [decisionFamilies(data).map((f) => f.familyId), 'decision-matrix families'],
        [decisionBundles(data).map((b) => b.bundleId), 'decision-matrix bundles'],
        [reconFamilies(data).map((f) => f.familyId), 'hardware reconciliation families'],
      ]) {
        for (const duplicate of dupes(arr(list).filter(isStr))) {
          out.push(`${name}: duplicate identifier ${duplicate} (U-03)`);
        }
      }
      return out;
    },
  },
  {
    id: 'S-03',
    description: 'Every cross-file model reference resolves (U-10)',
    run(data) {
      const out = [];
      const ueIds = new Set(
        ueRecords(data)
          .map((r) => r.id)
          .filter(isStr),
      );
      const beIds = new Set(
        beRecords(data)
          .map((r) => r.id)
          .filter(isStr),
      );
      const providerIds = new Set(
        providerRecords(data)
          .map((r) => r.id)
          .filter(isStr),
      );
      const blockerIds = new Set(
        blockers(data)
          .map((r) => r.id)
          .filter(isStr),
      );
      const rightIds = new Set(
        rightsRecords(data)
          .map((r) => r.id)
          .filter(isStr),
      );
      const hardBoundaryIds = new Set(
        hardBoundaries(data)
          .map((r) => r.id)
          .filter(isStr),
      );
      const knowledge = allIds(data);
      const canonicalProducts = new Set(CANONICAL_PRODUCTS);
      const canonicalBundles = new Set(CANONICAL_BUNDLES);

      for (const right of rightsRecords(data)) {
        for (const recordId of arr(right.sourceRecordIds)) {
          if (!providerIds.has(recordId)) {
            out.push(`${right.id}: sourceRecordId ${recordId} does not resolve in providers.json`);
          }
        }
        if (isStr(right.blockerId) && !blockerIds.has(right.blockerId)) {
          out.push(`${right.id}: blockerId ${right.blockerId} does not resolve`);
        }
        for (const productId of arr(right.blocksProductIds)) {
          if (!canonicalProducts.has(productId) && !canonicalBundles.has(productId)) {
            out.push(
              `${right.id}: blocksProductIds "${productId}" is not a canonical product/bundle`,
            );
          }
        }
      }

      for (const blocker of blockers(data)) {
        for (const productId of arr(blocker.productIds)) {
          if (!canonicalProducts.has(productId)) {
            out.push(`${blocker.id}: productId "${productId}" is not a canonical product`);
          }
        }
        for (const ref of arr(blocker.sourceRefs)) {
          if (!/^(LR|PE|ASM|LT|UE|BE|BLK|HB|UNK-HW)-/.test(String(ref))) continue;
          if (!knowledge.has(ref)) out.push(`${blocker.id}: sourceRef ${ref} does not resolve`);
        }
      }

      for (const item of legalItems(data)) {
        if (!isStr(item.blockerId)) continue;
        if (!blockerIds.has(item.blockerId) && !hardBoundaryIds.has(item.blockerId)) {
          out.push(`${item.id}: blockerId ${item.blockerId} does not resolve`);
        }
      }

      const definitions = externalBundleDefinitions(data);
      const definitionIds = new Set(
        arr(definitions.bundles)
          .map((b) => obj(b).id)
          .filter(isStr),
      );
      const priceHypothesisIds = new Set(
        arr(definitions.priceHypothesisRegister)
          .map((p) => obj(p).id)
          .filter(isStr),
      );
      if (!definitionIds.size) {
        out.push('bundle-definitions.json not loaded: bundle composition cannot be resolved');
      }
      for (const bundle of beRecords(data)) {
        if (definitionIds.size && !definitionIds.has(bundle.bundleId)) {
          out.push(`${bundle.id}: bundleId "${bundle.bundleId}" is not in bundle-definitions.json`);
        }
        if (!isStr(bundle.priceHypothesisId)) {
          out.push(`${bundle.id}: missing priceHypothesisId`);
        } else if (priceHypothesisIds.size && !priceHypothesisIds.has(bundle.priceHypothesisId)) {
          out.push(
            `${bundle.id}: priceHypothesisId ${bundle.priceHypothesisId} does not resolve in bundle-definitions.json`,
          );
        }
        for (const componentId of arr(bundle.componentEconomicIds)) {
          if (!ueIds.has(componentId)) {
            out.push(
              `${bundle.id}: componentEconomicId ${componentId} does not resolve in unit-economics.json`,
            );
          }
        }
        for (const cost of arr(bundle.componentCosts)) {
          if (!ueIds.has(cost.componentId)) {
            out.push(
              `${bundle.id}: componentCosts ${cost.componentId} does not resolve in unit-economics.json`,
            );
          }
        }
      }

      for (const scenario of scenarios(data)) {
        if (!ueIds.has(scenario.baseRecordId) && !beIds.has(scenario.baseRecordId)) {
          out.push(`${scenario.id}: baseRecordId ${scenario.baseRecordId} does not resolve`);
        }
      }

      for (const family of decisionFamilies(data)) {
        if (!canonicalProducts.has(family.familyId)) {
          out.push(`decision-matrix: family "${family.familyId}" is not canonical`);
        }
        for (const blockerId of arr(family.blockerIds)) {
          if (!blockerIds.has(blockerId)) {
            out.push(
              `decision-matrix family ${family.familyId}: blocker ${blockerId} does not resolve`,
            );
          }
        }
      }
      for (const bundle of decisionBundles(data)) {
        if (!canonicalBundles.has(bundle.bundleId)) {
          out.push(`decision-matrix: bundle "${bundle.bundleId}" is not canonical`);
        }
        for (const blockerId of arr(bundle.blockerIds)) {
          if (!blockerIds.has(blockerId)) {
            out.push(
              `decision-matrix bundle ${bundle.bundleId}: blocker ${blockerId} does not resolve`,
            );
          }
        }
      }
      for (const familyId of arr(obj(data.decisionMatrix).priorityOrder)) {
        if (!decisionFamilies(data).some((f) => f.familyId === familyId)) {
          out.push(`decision-matrix: priorityOrder ${familyId} does not resolve`);
        }
      }

      const knownFiles = new Set([...Object.values(FILES), HARDWARE_COST_SCENARIOS_FILE]);
      for (const cost of arr(obj(data.mc13Handoff).recurringCosts)) {
        const source = String(cost.source ?? '')
          .split('#')[0]
          .trim();
        if (source && !knownFiles.has(source)) {
          out.push(`mc13-handoff ${cost.id}: source "${cost.source}" does not resolve`);
        }
      }
      return unique(out);
    },
  },
  {
    id: 'S-04',
    description: 'Dates are ISO and not after asOf; observations carry sourceUrl + retrievedOn',
    run(data) {
      const out = [];
      const asOf = asOfOf(data);
      const observationDateFields = new Set(['retrievedOn', 'observedOn', 'rateDate']);
      forEachBusinessFile(data, (node, path) => {
        if (!node || typeof node !== 'object' || Array.isArray(node)) return;
        for (const [key, value] of Object.entries(node)) {
          if (key === 'date' || key === 'asOf' || observationDateFields.has(key)) {
            if (!ISO_DATE.test(String(value))) {
              out.push(`${path}.${key}: "${value}" is not an ISO date`);
            } else if (value > asOf) {
              out.push(`${path}.${key}: "${value}" post-dates asOf ${asOf}`);
            }
          }
        }
      });
      out.push(...providerObservationErrors(data));
      for (const input of rcInputs(data)) {
        const exempt = ['ENGINEERING_ASSUMPTION', 'UNKNOWN'].includes(input.evidenceClass);
        if (
          !exempt &&
          (!isUrl(input.sourceUrl) || !ISO_DATE.test(String(input.retrievedOn ?? '')))
        ) {
          out.push(`${input.id}: cost input without sourceUrl+retrievedOn`);
        }
      }
      for (const item of legalItems(data)) {
        const exempt = ['ENGINEERING_ASSUMPTION', 'UNKNOWN'].includes(item.evidenceClass);
        if (!exempt && (!isUrl(item.sourceUrl) || !ISO_DATE.test(String(item.retrievedOn ?? '')))) {
          out.push(`${item.id}: legal/tax observation without sourceUrl+retrievedOn`);
        }
      }
      return unique(out);
    },
  },
  {
    id: 'S-05',
    description: 'Every enum value is in the frozen MC-12 vocabulary (§3)',
    run(data) {
      const out = [];
      forEachBusinessFile(data, (node, path) => {
        if (!node || typeof node !== 'object' || Array.isArray(node)) return;
        for (const [key, value] of Object.entries(node)) {
          if (!isStr(value)) continue;
          const rule = vocabularyFor(key, path);
          if (!rule) continue;
          if (rule.allowed.includes(value)) continue;
          out.push(`${path}.${key}: "${value}" is not in the MC-12 ${rule.name} vocabulary`);
        }
      });
      return unique(out);
    },
  },

  /* ------------------------------------------------ governance & truthfulness (V) */
  {
    id: 'V-01',
    description: 'No approved selling price (only HYPOTHESIS_UNAPPROVED / NOT_ESTABLISHED)',
    run(data) {
      const out = [];
      for (const record of ueRecords(data)) {
        const priceStatus = obj(record.revenue).priceStatus;
        if (!SELLING_PRICE_STATUSES.includes(priceStatus)) {
          out.push(
            `${record.id}: revenue.priceStatus "${priceStatus}" is not an unapproved hypothesis`,
          );
        }
      }
      const manifest = manifestOf(data);
      if (manifest.priceApproved !== 'NONE') {
        out.push(`manifest: priceApproved "${manifest.priceApproved}" is not NONE`);
      }
      for (const { key, value, path } of collectFieldEntries(data, (field) =>
        ['priceApproved', 'approvedPriceEur', 'retailPriceEur', 'salePriceEur', 'msrpEur'].includes(
          field,
        ),
      )) {
        if (value === true || isNum(value) || (isStr(value) && value !== 'NONE')) {
          out.push(`${path}.${key}: approved/retail price claimed (${JSON.stringify(value)})`);
        }
      }
      return out;
    },
  },
  {
    id: 'V-02',
    description: 'commercialAvailability is NOT_FOR_SALE everywhere',
    run(data) {
      const out = [];
      for (const { key, value, path } of collectFieldEntries(data, (field) =>
        ['commercialAvailability'].includes(field),
      )) {
        if (value !== 'NOT_FOR_SALE') {
          out.push(`${path}.${key}: "${value}" is not NOT_FOR_SALE`);
        }
      }
      const manifest = manifestOf(data);
      if (manifest.commercialAvailability !== 'NOT_FOR_SALE') {
        out.push(`manifest: commercialAvailability "${manifest.commercialAvailability}"`);
      }
      for (const text of collectStrings(data, /AVAILABLE_FOR_SALE|(^|[^_])FOR_SALE/)) {
        out.push(`for-sale text present: "${text.slice(0, 90)}"`);
      }
      return unique(out);
    },
  },
  {
    id: 'V-03',
    description: 'PILOT is never purchasable (SAFETY_BLOCKED or QUOTATION_PACKAGE)',
    run(data) {
      const out = [];
      const pilotRecords = ueRecords(data).filter((record) => record.familyId === 'PILOT');
      if (!pilotRecords.length) out.push('PILOT has no unit-economics record');
      for (const record of pilotRecords) {
        const safetyBlocked =
          record.classification === 'SAFETY_BLOCKED' || record.objectType === 'QUOTATION_PACKAGE';
        if (!safetyBlocked) {
          out.push(
            `${record.id}: PILOT classification "${record.classification}" / objectType "${record.objectType}" is not safety-blocked`,
          );
        }
        if (
          isNum(obj(record.revenue).grossHypothesisEur) &&
          !SELLING_PRICE_STATUSES.includes(obj(record.revenue).priceStatus)
        ) {
          out.push(`${record.id}: PILOT carries a purchasable price`);
        }
        if (record.objectType === 'QUOTATION_PACKAGE' && isNum(obj(record.revenue).netRevenueEur)) {
          out.push(`${record.id}: quotation package carries a net selling price`);
        }
      }
      if (GOVERNANCE_INVARIANTS.PILOT_SAFETY_GATE !== 'BLOCKED') {
        out.push('governance: PILOT_SAFETY_GATE is not BLOCKED');
      }
      for (const { key, value, path } of collectFieldEntries(data, (field) =>
        /pilot.*(purchas|approved|forSale)|safetyGate/i.test(field),
      )) {
        if (value === true || value === 'OPEN' || value === 'APPROVED') {
          out.push(`${path}.${key}: PILOT safety/purchasability weakened (${value})`);
        }
      }
      return out;
    },
  },
  {
    id: 'V-04',
    description: 'No AIS transmission offering; all AIS capability text is receive-only',
    run(data) {
      const out = [];
      if (GOVERNANCE_INVARIANTS.AIS_TRANSMISSION_OFFERED !== false) {
        out.push('governance: AIS_TRANSMISSION_OFFERED is not false');
      }
      for (const { key, value, path } of collectFieldEntries(data, (field) =>
        /^(aisTransmit|transmitCapability|transponderOffered|aisTransmission)$/i.test(field),
      )) {
        if (value === true || value === 'OFFERED') {
          out.push(`${path}.${key}: AIS transmit capability declared`);
        }
      }
      for (const text of collectStrings(data, /AIS/i)) {
        for (const sentence of text.split(/(?<=[.;:])\s+/)) {
          if (!/transmi\w*|transpond\w*/i.test(sentence)) continue;
          if (
            /\b(no|not|never|without|defer|blocked|prohibit|unauthori[sz]ed|receive-only|receives? only)\b/i.test(
              sentence,
            )
          ) {
            continue;
          }
          if (
            /\b(offers?|includes?|supports?|provides?|implements?|enables?|builds?|develops?|sells?)\b[^.]{0,25}\b(transmi\w*|transpond\w*)/i.test(
              sentence,
            ) ||
            /(transmi\w*|transpond\w*)[^.]{0,30}(capabilit|mode|function|support)/i.test(sentence)
          ) {
            out.push(`AIS transmission implied: "${sentence.slice(0, 90)}"`);
          }
        }
      }
      return unique(out);
    },
  },
  {
    id: 'V-05',
    description: 'FLEET is hardware-free by default (no hardware component or cost line)',
    run(data) {
      const out = [];
      if (GOVERNANCE_INVARIANTS.FLEET_DEFAULT_HARDWARE !== false) {
        out.push('governance: FLEET_DEFAULT_HARDWARE is not false');
      }
      const fleetBundle = beRecords(data).find((record) => record.bundleId === 'FLEET');
      if (!fleetBundle) {
        out.push('FLEET bundle-economics record missing');
      } else {
        const ueById = indexBy(ueRecords(data), 'id');
        const declaredComponentIds = new Set([
          ...arr(fleetBundle.componentEconomicIds),
          ...arr(fleetBundle.componentCosts).map((cost) => obj(cost).componentId),
        ]);
        for (const componentId of declaredComponentIds) {
          const component = ueById.get(componentId);
          const objectType = obj(component).objectType;
          if (['PHYSICAL_SKU', 'OPTIONAL_ACCESSORY'].includes(objectType)) {
            out.push(`FLEET: bundle includes hardware component ${componentId} (${objectType})`);
          }
        }
        for (const unknown of arr(fleetBundle.unknownVariableCostCategories)) {
          if (/HARDWARE|DEVICE|SENSOR|DISPLAY|WATCH|HUB|AIS/i.test(String(obj(unknown).category))) {
            out.push(`FLEET: unknown cost "${obj(unknown).category}" is hardware-related`);
          }
        }
      }
      for (const record of ueRecords(data).filter((item) => item.familyId === 'FLEET')) {
        for (const line of arr(record.costLines)) {
          if (HARDWARE_COST_CATEGORY.test(lineCategory(line))) {
            out.push(`${record.id}: FLEET carries a hardware cost line ${lineCategory(line)}`);
          }
        }
      }
      for (const { key, value, path } of collectFieldEntries(data, (field) =>
        /fleet.*hardware|hardwareIncludedByDefault|defaultHardware/i.test(field),
      )) {
        if (value === true) out.push(`${path}.${key}: FLEET default hardware declared`);
      }
      return out;
    },
  },
  {
    id: 'V-06',
    description: 'No subscription gates local safety (every entitlement gatesLocalSafety false)',
    run(data) {
      const out = [];
      for (const { key, value, path } of collectFieldEntries(data, (field) =>
        /^(gatesLocalSafety|localSafetyGated|requiresSubscriptionForSafety|safetyRequiresSubscription)$/.test(
          field,
        ),
      )) {
        if (value !== false)
          out.push(`${path}.${key}: local safety gated (${JSON.stringify(value)})`);
      }
      for (const record of ueRecords(data)) {
        if (record.objectType === 'SUBSCRIPTION' && record.gatesLocalSafety !== undefined) {
          if (record.gatesLocalSafety !== false) {
            out.push(`${record.id}: subscription gates local safety`);
          }
        }
      }
      for (const text of collectStrings(data, /subscription/i)) {
        if (
          /(subscription|entitlement)[^.]{0,40}(required|gates?|locks?)[^.]{0,20}(local )?safety/i.test(
            text,
          ) &&
          !/\b(no|not|never|without)\b/i.test(text)
        ) {
          out.push(`subscription-gated safety text: "${text.slice(0, 90)}"`);
        }
      }
      return unique(out);
    },
  },
  {
    id: 'V-07',
    description: 'Inherited milestone verdicts unchanged against frozen expected strings',
    run(data) {
      const out = [];
      for (const [key, expected] of [
        ['MC10_VERDICT', GOVERNANCE_INVARIANTS.MC10_VERDICT],
        ['MC11_VERDICT', GOVERNANCE_INVARIANTS.MC11_VERDICT],
      ]) {
        for (const { key: field, value, path } of collectFieldEntries(
          data,
          (field) => field === key,
        )) {
          if (value !== expected) {
            out.push(`${path}.${field}: inherited verdict "${value}" != frozen "${expected}"`);
          }
        }
        const block = obj(manifestOf(data).statusBlock);
        if (Object.prototype.hasOwnProperty.call(block, key) && block[key] !== expected) {
          out.push(`manifest.statusBlock.${key}: "${block[key]}" != frozen "${expected}"`);
        }
      }
      if (GOVERNANCE_INVARIANTS.MC10_VERDICT !== 'BLOCKED') {
        out.push('governance: MC10_VERDICT constant is not BLOCKED');
      }
      if (GOVERNANCE_INVARIANTS.MC11_VERDICT !== 'PARTIAL') {
        out.push('governance: MC11_VERDICT constant is not PARTIAL');
      }
      return out;
    },
  },
  {
    id: 'V-08',
    description: 'CUSTOMER_EVIDENCE NONE, WTP not validated, no validated-demand claim',
    run(data) {
      const out = [];
      if (GOVERNANCE_INVARIANTS.CUSTOMER_EVIDENCE !== 'NONE') {
        out.push('governance: CUSTOMER_EVIDENCE is not NONE');
      }
      if (GOVERNANCE_INVARIANTS.CUSTOMER_WTP_VALIDATED !== false) {
        out.push('governance: CUSTOMER_WTP_VALIDATED is not false');
      }
      if (obj(manifestOf(data).statusBlock).CUSTOMER_WTP_VALIDATED !== false) {
        out.push('manifest.statusBlock.CUSTOMER_WTP_VALIDATED is not false');
      }
      const method = obj(obj(data.unitEconomics).method);
      if (method.customerEvidence !== 'NONE') {
        out.push(`unit-economics method.customerEvidence "${method.customerEvidence}" is not NONE`);
      }
      const acquisition = obj(obj(data.mc13Handoff).customerAcquisition);
      if (acquisition.status !== 'UNKNOWN') {
        out.push(`mc13-handoff customerAcquisition.status "${acquisition.status}" is not UNKNOWN`);
      }
      for (const field of ['cacEur', 'churnPct', 'renewalPct']) {
        if (acquisition[field] !== null) {
          out.push(
            `mc13-handoff customerAcquisition.${field} must be null without customer evidence`,
          );
        }
      }
      for (const { key, value, path } of collectFieldEntries(data, (field) =>
        /^(customerValidated|demandValidated|wtpValidated|willingnessToPayValidated|validatedDemand)$/i.test(
          field,
        ),
      )) {
        if (value === true || value === 'VALIDATED' || value === 'MEASURED') {
          out.push(`${path}.${key}: validated demand/WTP claimed`);
        }
      }
      for (const { key, value, path } of collectFieldEntries(data, (field) =>
        /willingnessToPay|wtp/i.test(field),
      )) {
        if (value === true || (isNum(value) && value > 0) || value === 'VALIDATED') {
          out.push(`${path}.${key}: willingness to pay presented as validated`);
        }
      }
      return unique(out);
    },
  },
  {
    id: 'V-09',
    description: 'No formal quotation or executed contract; register empty; RFQ NOT_SENT',
    run(data) {
      const out = [];
      for (const forbidden of ['FORMAL_PROVIDER_QUOTATION', 'EXECUTED_CONTRACT']) {
        for (const { key, value, path } of collectFieldEntries(
          data,
          (field) => field === 'evidenceClass',
        )) {
          if (value === forbidden) {
            out.push(`${path}: forbidden evidence class ${forbidden}`);
          }
        }
      }
      for (const { key, value, path } of collectFieldEntries(data, (field) =>
        /^(quotationRef|quotationId|formalQuotation|executedContractRef|contractRef)$/.test(field),
      )) {
        if (value !== null && value !== false && value !== '' && value !== undefined) {
          out.push(`${path}.${key}: claims a quotation/contract (${JSON.stringify(value)})`);
        }
      }
      const register = obj(obj(data.providers).quotationRegister);
      if (register.status !== 'EMPTY')
        out.push(`quotationRegister.status "${register.status}" is not EMPTY`);
      if (register.formalQuotations !== 0) {
        out.push(`quotationRegister.formalQuotations ${register.formalQuotations} != 0`);
      }
      if (register.executedContracts !== 0) {
        out.push(`quotationRegister.executedContracts ${register.executedContracts} != 0`);
      }
      if (register.rfqPackages !== 'NOT_SENT') {
        out.push(`quotationRegister.rfqPackages "${register.rfqPackages}" is not NOT_SENT`);
      }
      const connectivitySummary = obj(obj(data.providerEvidenceConnectivityCloud).summary);
      for (const field of ['formalQuotations', 'executedContracts']) {
        if (isNum(connectivitySummary[field]) && connectivitySummary[field] !== 0) {
          out.push(`provider-evidence.connectivity-cloud summary.${field} > 0`);
        }
      }
      const counts = obj(manifestOf(data).evidenceCounts);
      for (const field of ['formalQuotations', 'executedContracts']) {
        if (isNum(counts[field]) && counts[field] !== 0) {
          out.push(`manifest evidenceCounts.${field} > 0`);
        }
      }
      return unique(out);
    },
  },
  {
    id: 'V-10',
    description: 'Every recurring cost input is classified with evidenceClass and costBehaviour',
    run(data) {
      const out = [];
      if (!rcInputs(data).length) out.push('recurring-cost-inputs register is empty');
      for (const input of rcInputs(data)) {
        if (!isStr(input.evidenceClass)) out.push(`${input.id}: cost input without evidenceClass`);
        if (!isStr(input.costBehaviour)) out.push(`${input.id}: cost input without costBehaviour`);
      }
      return out;
    },
  },
  {
    id: 'V-11',
    description: 'A numeric price requires a source URL and a retrieval date',
    run(data) {
      const out = [];
      for (const record of providerRecords(data)) {
        if (
          isNum(record.price) &&
          (!isUrl(record.sourceUrl) || !ISO_DATE.test(String(record.retrievedOn ?? '')))
        ) {
          out.push(`${record.id}: numeric price without sourceUrl+retrievedOn`);
        }
      }
      for (const input of rcInputs(data)) {
        if (
          (isNum(input.valueEur) || input.status === 'KNOWN') &&
          (!isUrl(input.sourceUrl) || !ISO_DATE.test(String(input.retrievedOn ?? '')))
        ) {
          out.push(`${input.id}: numeric tariff without sourceUrl+retrievedOn`);
        }
      }
      return out;
    },
  },
  {
    id: 'V-12',
    description: 'A published price is never a quotation; PUBLISHED needs tariff/observation class',
    run(data) {
      const out = [];
      for (const record of providerRecords(data)) {
        if (record.priceStatus !== 'PUBLISHED') continue;
        const observed = ['PUBLISHED_PROVIDER_TARIFF', 'PUBLIC_PRICE_OBSERVATION'].includes(
          record.evidenceClass,
        );
        const zeroFeePublicDomain =
          record.price === 0 && ZERO_FEE_PUBLICATION_CLASSES.includes(record.evidenceClass);
        if (!observed && !zeroFeePublicDomain) {
          out.push(
            `${record.id}: priceStatus PUBLISHED with evidenceClass "${record.evidenceClass}"`,
          );
        }
        if (['FORMAL_PROVIDER_QUOTATION', 'EXECUTED_CONTRACT'].includes(record.evidenceClass)) {
          out.push(`${record.id}: published price labelled as a quotation`);
        }
      }
      for (const { key, value, path } of collectFieldEntries(
        data,
        (field) => field === 'priceStatus',
      )) {
        if (value === 'PUBLISHED' && /quotation/i.test(path)) {
          out.push(`${path}.${key}: published price labelled as quotation`);
        }
      }
      return out;
    },
  },
  {
    id: 'V-13',
    description: 'No chart/weather right is presented as granted',
    run(data) {
      const out = [];
      for (const record of providerRecords(data)) {
        if (record.rightsGranted !== false) {
          out.push(`${record.id}: rightsGranted "${record.rightsGranted}" is not false`);
        }
      }
      const summary = obj(obj(data.licensingRights).summary);
      for (const field of [
        'chartRightsGranted',
        'weatherRightsGranted',
        'nmeaCertified',
        'connectivityContract',
        'cloudContract',
        'productionTileRight',
        'sourceIpCleared',
        'brandCleared',
      ]) {
        if (summary[field] !== false) {
          out.push(`licensing summary.${field} "${summary[field]}" is not false`);
        }
      }
      for (const right of rightsRecords(data)) {
        if (right.rightsStatus === 'GRANTED') {
          out.push(`${right.id}: rightsStatus GRANTED is not available in MC-12`);
        }
      }
      for (const { key, value, path } of collectFieldEntries(data, (field) =>
        /(rights?Granted|licen[cs]eGranted|clearanceGranted)/i.test(field),
      )) {
        if (value === true) out.push(`${path}.${key}: rights presented as granted`);
      }
      return unique(out);
    },
  },
  {
    id: 'V-14',
    description: 'A free/non-commercial tier is not productionEligible YES',
    run(data) {
      const out = [];
      const nonCommercial =
        /non.?commercial|personal use|private use|prohibited|not permitted|withdrawable|tolerated/i;
      for (const record of providerRecords(data)) {
        if (record.productionEligible !== 'YES') continue;
        const text = `${record.commercialUse ?? ''} ${record.notes ?? ''} ${record.licenceScope ?? ''}`;
        if (nonCommercial.test(text)) {
          out.push(`${record.id}: free/non-commercial tier marked productionEligible YES`);
        }
        if (['PROHIBITED', 'REQUIRES_CONTRACT'].includes(record.redistribution)) {
          out.push(
            `${record.id}: redistribution "${record.redistribution}" cannot be productionEligible YES`,
          );
        }
      }
      return out;
    },
  },
  {
    id: 'V-15',
    description: 'Evidence retrieved outside the 180-day window is not silently reused',
    run(data) {
      const out = [];
      const asOf = asOfOf(data);
      forEachBusinessFile(data, (node, path) => {
        if (!node || typeof node !== 'object' || Array.isArray(node)) return;
        for (const [key, value] of Object.entries(node)) {
          if (!['retrievedOn', 'rateDate'].includes(key)) continue;
          if (!ISO_DATE.test(String(value))) continue;
          const age = daysBetween(asOf, value);
          if (age > 180) {
            out.push(`${path}.${key}: evidence is ${age} days old (> 180)`);
          }
        }
      });
      return unique(out);
    },
  },
  {
    id: 'V-16',
    description: 'Unknown cost is null, never 0; zero is only an evidenced zero',
    run(data) {
      const out = [];
      for (const input of rcInputs(data)) {
        if (input.status === 'UNKNOWN' && input.valueEur !== null) {
          out.push(`${input.id}: UNKNOWN cost carries value ${input.valueEur} (must be null)`);
        }
      }
      for (const record of ueRecords(data)) {
        for (const fixed of arr(record.fixedCostsExcluded)) {
          if (!['KNOWN', 'ASSUMPTION', 'UNKNOWN', 'NOT_APPLICABLE'].includes(fixed.status)) {
            out.push(
              `${record.id}: fixed cost "${fixed.category}" has invalid status "${fixed.status}"`,
            );
          }
          if (
            !['KNOWN', 'ASSUMPTION', 'NOT_APPLICABLE'].includes(fixed.status) &&
            fixed.amountEur !== null
          ) {
            out.push(
              `${record.id}: ${fixed.status} fixed cost "${fixed.category}" carries ${fixed.amountEur} (must be null)`,
            );
          }
        }
        for (const line of arr(record.costLines)) {
          if (line.status === 'UNKNOWN' && line.amountEur !== null) {
            out.push(`${record.id}/${line.id}: UNKNOWN cost line carries ${line.amountEur}`);
          }
          if (line.amountEur === 0) {
            if (!isStr(line.evidenceClass)) {
              out.push(`${record.id}/${line.id}: zero cost without an evidence class`);
            }
          }
        }
      }
      return unique(out);
    },
  },
  {
    id: 'V-17',
    description: 'Material unknown cost forces INCOMPLETE_UNKNOWN_COSTS and null contributionPct',
    run(data) {
      const out = [];
      const datasets = [
        ['unit-economics', ueRecords(data)],
        ['bundle-economics', beRecords(data)],
      ];
      for (const [file, records] of datasets) {
        for (const record of records) {
          const material = arr(record.unknownVariableCostCategories).filter(
            (unknown) => obj(unknown).materiality === 'MATERIAL',
          );
          if (material.length) {
            if (record.contributionStatus !== 'INCOMPLETE_UNKNOWN_COSTS') {
              out.push(
                `${file}/${record.id}: material unknown cost without INCOMPLETE_UNKNOWN_COSTS (${record.contributionStatus})`,
              );
            }
            if (record.contributionPct !== null) {
              out.push(`${file}/${record.id}: material unknown cost with numeric contributionPct`);
            }
          }
        }
      }
      return out;
    },
  },
  {
    id: 'V-18',
    description: 'economicsEvidenced stays 0 while material unknowns or missing quotations exist',
    run(data) {
      const out = [];
      const summary = obj(obj(data.unitEconomics).summary);
      if (summary.economicsEvidenced !== 0) {
        out.push(`unit-economics summary.economicsEvidenced ${summary.economicsEvidenced} != 0`);
      }
      const evidenced = ueRecords(data).filter(
        (record) => record.classification === 'ECONOMICS_EVIDENCED',
      );
      if (evidenced.length) {
        out.push(
          `${evidenced.length} unit-economics records classified ECONOMICS_EVIDENCED: ${evidenced
            .map((r) => r.id)
            .join(', ')}`,
        );
      }
      if (isNum(summary.records) && summary.records !== ueRecords(data).length) {
        out.push(
          `unit-economics summary.records ${summary.records} != actual ${ueRecords(data).length}`,
        );
      }
      const register = obj(obj(data.providers).quotationRegister);
      const materialUnknowns = [...ueRecords(data), ...beRecords(data)].some((record) =>
        arr(record.unknownVariableCostCategories).some(
          (unknown) => obj(unknown).materiality === 'MATERIAL',
        ),
      );
      if (materialUnknowns && summary.economicsEvidenced === 0 && evidenced.length === 0) {
        // Expected: no evidenced economics while unknowns or a missing quotation exist.
        if (register.status !== 'EMPTY') {
          out.push('no evidenced economics but the quotation register is not empty');
        }
      }
      return out;
    },
  },

  /* -------------------------------------------------------------- arithmetic (A) */
  {
    id: 'A-01',
    description: 'netRevenueEur recomputed from gross and VAT basis/rate',
    run(data) {
      const out = [];
      const records = [
        ...ueRecords(data).map((record) => ({
          id: record.id,
          gross: obj(record.revenue).grossHypothesisEur,
          basis: obj(record.revenue).vatBasis,
          rate: obj(record.revenue).vatRatePct,
          net: obj(record.revenue).netRevenueEur,
        })),
        ...beRecords(data).map((record) => ({
          id: `bundle/${record.bundleId}`,
          gross: record.grossHypothesisEur,
          basis: record.vatBasis,
          rate: record.vatRatePct,
          net: record.netRevenueEur,
        })),
      ];
      for (const record of records) {
        if (record.basis === 'VAT_INCLUDED') {
          if (!isNum(record.gross)) {
            if (isNum(record.net)) out.push(`${record.id}: net revenue without a gross hypothesis`);
            continue;
          }
          if (!isNum(record.rate)) {
            out.push(`${record.id}: VAT-included revenue without vatRatePct`);
            continue;
          }
          const expected = record.gross / (1 + record.rate / 100);
          if (!near(record.net, expected)) {
            out.push(
              `${record.id}: netRevenueEur ${record.net} != gross/(1+vat) = ${round2(expected)}`,
            );
          }
        } else if (record.basis === 'VAT_EXCLUDED') {
          if (record.gross === null || record.gross === undefined) {
            if (record.net !== null)
              out.push(`${record.id}: net revenue declared with no price hypothesis`);
            continue;
          }
          if (!near(record.net, record.gross)) {
            out.push(
              `${record.id}: VAT-excluded net revenue ${record.net} != gross ${record.gross}`,
            );
          }
        } else if (isNum(record.net)) {
          out.push(`${record.id}: net revenue cannot be derived from vatBasis "${record.basis}"`);
        }
      }
      return out;
    },
  },
  {
    id: 'A-02',
    description: 'knownVariableCostEur equals the sum of variable KNOWN cost lines',
    run(data) {
      const out = [];
      for (const record of ueRecords(data)) {
        const lines = arr(record.costLines);
        for (const line of lines) {
          if (line.variable === true && line.status === 'KNOWN' && !isNum(line.amountEur)) {
            out.push(`${record.id}: KNOWN variable line ${line.id} has no numeric amount`);
          }
        }
        const variable = lines.filter(
          (line) => line.variable === true && line.status === 'KNOWN' && isNum(line.amountEur),
        );
        const sum = variable.reduce((total, line) => total + line.amountEur, 0);
        if (record.knownVariableCostEur === null || record.knownVariableCostEur === undefined) {
          if (variable.length) {
            out.push(`${record.id}: ${variable.length} known variable lines but total is null`);
          }
        } else if (!near(sum, record.knownVariableCostEur)) {
          out.push(
            `${record.id}: knownVariableCostEur ${record.knownVariableCostEur} != variable-line sum ${round2(sum)}`,
          );
        }
      }
      return out;
    },
  },
  {
    id: 'A-03',
    description: 'contributionBeforeUnknownsEur = netRevenueEur - knownVariableCostEur',
    run(data) {
      const out = [];
      for (const record of ueRecords(data)) {
        const net = obj(record.revenue).netRevenueEur;
        const cost = record.knownVariableCostEur;
        const expected = isNum(net) && isNum(cost) ? round2(net - cost) : null;
        if (expected === null) {
          if (record.contributionBeforeUnknownsEur !== null) {
            out.push(`${record.id}: contribution declared without net revenue or known cost`);
          }
        } else if (!near(record.contributionBeforeUnknownsEur, expected)) {
          out.push(
            `${record.id}: contributionBeforeUnknownsEur ${record.contributionBeforeUnknownsEur} != recomputed ${expected}`,
          );
        }
      }
      for (const bundle of beRecords(data)) {
        const expected =
          isNum(bundle.netRevenueEur) && isNum(bundle.knownVariableCostEur)
            ? round2(bundle.netRevenueEur - bundle.knownVariableCostEur)
            : null;
        if (expected === null) {
          if (bundle.contributionBeforeUnknownsEur !== null) {
            out.push(
              `bundle ${bundle.bundleId}: contribution declared without net revenue or known cost`,
            );
          }
        } else if (!near(bundle.contributionBeforeUnknownsEur, expected)) {
          out.push(
            `bundle ${bundle.bundleId}: contributionBeforeUnknownsEur ${bundle.contributionBeforeUnknownsEur} != recomputed ${expected}`,
          );
        }
      }
      return out;
    },
  },
  {
    id: 'A-04',
    description: 'headroomEur recomputed as netRevenueEur - knownVariableCostEur',
    run(data) {
      const out = [];
      for (const record of ueRecords(data)) {
        const net = obj(record.revenue).netRevenueEur;
        const cost = record.knownVariableCostEur;
        const expected = isNum(net) && isNum(cost) ? round2(net - cost) : null;
        if (expected === null) {
          if (record.headroomEur !== null) {
            out.push(`${record.id}: headroom declared without net revenue or known cost`);
          }
        } else if (!near(record.headroomEur, expected)) {
          out.push(`${record.id}: headroomEur ${record.headroomEur} != recomputed ${expected}`);
        }
      }
      return out;
    },
  },
  {
    id: 'A-05',
    description: 'Recurring totals annualised (monthly/yearly × periods, per-vessel × vessels)',
    run(data) {
      const out = [];
      for (const record of ueRecords(data)) {
        const revenue = obj(record.revenue);
        if (record.objectType === 'SUBSCRIPTION') {
          const periods = revenue.periodsPerYear;
          if (!isInt(periods) || periods <= 0) {
            out.push(`${record.id}: subscription without a valid periodsPerYear`);
            continue;
          }
          if (!isNum(revenue.grossPerPeriodEur)) {
            out.push(`${record.id}: subscription without grossPerPeriodEur`);
          } else {
            const annual = revenue.grossPerPeriodEur * periods;
            if (!near(annual, revenue.grossHypothesisEur)) {
              out.push(
                `${record.id}: grossHypothesisEur ${revenue.grossHypothesisEur} != per-period × ${periods} = ${round2(annual)}`,
              );
            }
          }
          if (isNum(revenue.netRevenuePerPeriodEur) && isNum(revenue.netRevenueEur)) {
            const drift = Math.abs(
              revenue.netRevenueEur - revenue.netRevenuePerPeriodEur * periods,
            );
            if (drift > periods * TOLERANCE) {
              out.push(
                `${record.id}: netRevenueEur ${revenue.netRevenueEur} is not consistent with netRevenuePerPeriodEur × ${periods}`,
              );
            }
          }
          if (!['MONTH', 'YEAR'].includes(revenue.period)) {
            out.push(`${record.id}: annualisation period "${revenue.period}" is not MONTH/YEAR`);
          }
        } else if (
          record.recurringContributionEurYear !== 0 &&
          record.recurringContributionEurYear !== null
        ) {
          out.push(
            `${record.id}: non-subscription record declares recurring contribution ${record.recurringContributionEurYear}`,
          );
        }
      }
      return out;
    },
  },
  {
    id: 'A-06',
    description:
      'Bundle net revenue and known variable cost recomputed from price hypothesis/components',
    run(data) {
      const out = [];
      const definitions = externalBundleDefinitions(data);
      const definitionById = new Map(
        arr(definitions.bundles)
          .map((bundle) => [obj(bundle).id, bundle])
          .filter(([id]) => isStr(id)),
      );
      const priceHypothesisIds = new Set(
        arr(definitions.priceHypothesisRegister)
          .map((p) => obj(p).id)
          .filter(isStr),
      );
      if (!definitionById.size) {
        out.push('bundle-definitions.json not loaded: bundle composition cannot be verified');
      }
      const ueById = indexBy(ueRecords(data), 'id');
      const seen = new Set();
      for (const bundle of beRecords(data)) {
        seen.add(bundle.bundleId);
        if (!CANONICAL_BUNDLES.includes(bundle.bundleId)) {
          out.push(`${bundle.id}: unknown bundleId "${bundle.bundleId}"`);
        }
        if (!isStr(bundle.priceHypothesisId)) {
          out.push(`${bundle.id}: missing priceHypothesisId`);
        } else if (priceHypothesisIds.size && !priceHypothesisIds.has(bundle.priceHypothesisId)) {
          out.push(
            `${bundle.id}: priceHypothesisId ${bundle.priceHypothesisId} is not registered in bundle-definitions.json`,
          );
        }
        const costIds = new Set();
        for (const cost of arr(bundle.componentCosts)) {
          costIds.add(cost.componentId);
          const unit = ueById.get(cost.componentId);
          if (!unit) {
            out.push(`${bundle.id}: component cost ${cost.componentId} does not resolve`);
            continue;
          }
          const unitCost = unit.knownVariableCostEur;
          if (isNum(unitCost) && isNum(cost.knownVariableCostEur)) {
            const ratio = cost.knownVariableCostEur / unitCost;
            if (Math.abs(ratio - Math.round(ratio)) > TOLERANCE || Math.round(ratio) < 1) {
              out.push(
                `${bundle.id}: component ${cost.componentId} cost ${cost.knownVariableCostEur} is not an integer multiple of the unit record ${unitCost}`,
              );
            }
          } else if (
            isNum(unitCost) !== isNum(cost.knownVariableCostEur) &&
            isNum(bundle.knownVariableCostEur)
          ) {
            out.push(
              `${bundle.id}: component ${cost.componentId} known/unknown cost disagrees with the unit record`,
            );
          }
        }
        for (const componentId of arr(bundle.componentEconomicIds)) {
          if (!ueById.has(componentId)) {
            out.push(`${bundle.id}: componentEconomicId ${componentId} does not resolve`);
          } else if (!costIds.has(componentId)) {
            out.push(`${bundle.id}: component ${componentId} has no declared component cost`);
          }
        }
        if (isNum(bundle.knownVariableCostEur)) {
          const unknownPriced = arr(bundle.componentCosts).some(
            (cost) => !isNum(cost.knownVariableCostEur),
          );
          const sum = arr(bundle.componentCosts).reduce(
            (total, cost) =>
              total + (isNum(cost.knownVariableCostEur) ? cost.knownVariableCostEur : 0),
            0,
          );
          if (!unknownPriced && !near(sum, bundle.knownVariableCostEur)) {
            out.push(
              `bundle ${bundle.bundleId}: knownVariableCostEur ${bundle.knownVariableCostEur} != component sum ${round2(sum)}`,
            );
          }
        }
        const definition = definitionById.get(bundle.bundleId);
        if (definition) {
          const definitionComponents = arr(definition.components).map(obj);
          const allowedFamilies = new Set();
          const requiredFamilies = new Set();
          for (const component of definitionComponents) {
            const families = [];
            if (isStr(component.familyId)) families.push(component.familyId);
            for (const expansion of arr(component.expandsTo)) {
              const match = /^([A-Z]+)-/.exec(String(expansion));
              if (match) families.push(match[1]);
            }
            const priced =
              component.inclusion === 'INCLUDED' ||
              (component.inclusion === 'QUOTATION_REQUIRED' &&
                component.requiredForOutcome === true);
            if (!priced) continue;
            for (const family of families) {
              allowedFamilies.add(family);
              if (component.requiredForOutcome === true) requiredFamilies.add(family);
            }
          }
          const actualFamilies = new Set();
          for (const componentId of arr(bundle.componentEconomicIds)) {
            const familyId = obj(ueById.get(componentId)).familyId;
            if (isStr(familyId)) actualFamilies.add(familyId);
          }
          if (arr(bundle.componentInclusions).length) {
            const lineIds = new Set(definitionComponents.map((component) => component.lineId));
            for (const inclusion of arr(bundle.componentInclusions)) {
              const row = obj(inclusion);
              if (!lineIds.has(row.lineId)) {
                out.push(
                  `bundle ${bundle.bundleId}: component line ${row.lineId} is not in bundle-definitions.json`,
                );
              }
              if (!['INCLUDED', 'QUOTATION_REQUIRED'].includes(String(row.inclusion))) {
                out.push(
                  `bundle ${bundle.bundleId}: line ${row.lineId} inclusion ${row.inclusion} cannot be a priced component`,
                );
              }
            }
          }
          for (const family of requiredFamilies) {
            if (!actualFamilies.has(family)) {
              out.push(
                `bundle ${bundle.bundleId}: required family ${family} missing from componentEconomicIds`,
              );
            }
          }
          for (const family of actualFamilies) {
            if (allowedFamilies.size && !allowedFamilies.has(family)) {
              out.push(
                `bundle ${bundle.bundleId}: component family ${family} is not an INCLUDED or QUOTATION_REQUIRED component`,
              );
            }
          }
        }
      }
      for (const bundleId of CANONICAL_BUNDLES) {
        if (!seen.has(bundleId)) out.push(`bundle economics missing bundle ${bundleId}`);
      }
      return unique(out);
    },
  },
  {
    id: 'A-07',
    description:
      'Sensitivity results recomputed from the base record and declared operation/factor',
    run(data) {
      const out = [];
      const ueById = indexBy(ueRecords(data), 'id');
      const beById = indexBy(beRecords(data), 'id');
      for (const scenario of scenarios(data)) {
        const base = ueById.get(scenario.baseRecordId) ?? beById.get(scenario.baseRecordId);
        if (!base) {
          out.push(`${scenario.id}: base record ${scenario.baseRecordId} does not resolve`);
          continue;
        }
        const net = isNum(obj(base.revenue).netRevenueEur)
          ? obj(base.revenue).netRevenueEur
          : base.netRevenueEur;
        const cost = base.knownVariableCostEur;
        const contribution = base.contributionBeforeUnknownsEur;
        const factor = scenario.factor;
        if (!isNum(net) || !isNum(cost) || !isNum(factor)) {
          out.push(
            `${scenario.id}: base record is not fully costed; a numeric result cannot be recomputed`,
          );
          continue;
        }
        let expected;
        switch (scenario.operation) {
          case 'MULTIPLY_COST':
            expected = net - cost * factor;
            break;
          case 'DEDUCT_REVENUE_PCT':
            expected = net * (1 - factor / 100) - cost;
            break;
          case 'ADD_COST':
            expected = contribution - factor;
            break;
          case 'MULTIPLY_REVENUE_PCT':
            expected = net * (factor / 100) - cost;
            break;
          default:
            out.push(`${scenario.id}: unsupported operation "${scenario.operation}"`);
            continue;
        }
        const expectedRounded = round2(expected);
        if (!near(scenario.resultContributionBeforeUnknownsEur, expectedRounded)) {
          out.push(
            `${scenario.id}: result ${scenario.resultContributionBeforeUnknownsEur} != recomputed ${expectedRounded} (${scenario.operation} × ${factor})`,
          );
        }
        if (!['CONDITIONAL', 'NEGATIVE', 'POSITIVE_CONDITIONAL'].includes(scenario.status)) {
          out.push(`${scenario.id}: invalid status "${scenario.status}"`);
        }
      }
      return out;
    },
  },
  {
    id: 'A-08',
    description: 'Decision-matrix weighted scores recomputed from registered weights and scores',
    run(data) {
      const out = [];
      const dimensions = decisionDimensions(data);
      const weights = new Map();
      for (const dimension of dimensions) {
        const id = obj(dimension).id;
        const weight = obj(dimension).weight;
        if (!isStr(id)) out.push('decision-matrix: dimension without id');
        else if (weights.has(id)) out.push(`decision-matrix: duplicate dimension ${id}`);
        else weights.set(id, weight);
        if (!isInt(weight) || weight < 0 || weight > 100) {
          out.push(`decision-matrix: dimension ${id} weight "${weight}" is not an integer 0-100`);
        }
      }
      const weightSum = [...weights.values()].reduce(
        (total, weight) => total + (isNum(weight) ? weight : 0),
        0,
      );
      if (weightSum !== 100) out.push(`decision-matrix: weights sum ${weightSum} != 100`);
      for (const family of decisionFamilies(data)) {
        const scores = obj(family.scores);
        let total = 0;
        for (const [dimensionId, weight] of weights) {
          const score = scores[dimensionId];
          if (!isInt(score) || score < 0 || score > 5) {
            out.push(
              `${family.familyId}: score for ${dimensionId} "${score}" is not an integer 0-5`,
            );
            continue;
          }
          total += score * weight;
        }
        const expected = round2(total / 100);
        if (!near(family.weightedScore, expected)) {
          out.push(
            `decision-matrix ${family.familyId}: weightedScore ${family.weightedScore} != recomputed ${expected}`,
          );
        }
      }
      return unique(out);
    },
  },
  {
    id: 'A-09',
    description:
      'All 90 MC-11 scenarios reconcile (line sum, COST-16 tooling) and the invariant is PASS',
    run(data) {
      const out = [];
      const sourceScenarios = externalHardwareScenarios(data);
      const reconciliation = obj(data.hardwareCostReconciliation);
      const invariant = obj(reconciliation.invariant);
      if (sourceScenarios.length !== 90) {
        out.push(`MC-11 cost-scenarios exposes ${sourceScenarios.length} scenarios, expected 90`);
      }
      if (invariant.result !== 'PASS') {
        out.push(`reconciliation invariant result "${invariant.result}" is not PASS`);
      }
      if (invariant.maxAbsSubtotalDeltaEur !== 0) {
        out.push(
          `reconciliation invariant maxAbsSubtotalDeltaEur ${invariant.maxAbsSubtotalDeltaEur} != 0`,
        );
      }
      if (invariant.toolingFieldMismatches !== 0) {
        out.push(
          `reconciliation invariant toolingFieldMismatches ${invariant.toolingFieldMismatches} != 0`,
        );
      }
      if (invariant.scenariosChecked !== 90) {
        out.push(`reconciliation invariant scenariosChecked ${invariant.scenariosChecked} != 90`);
      }
      if (invariant.toleranceEur !== TOLERANCE) {
        out.push(`reconciliation invariant toleranceEur ${invariant.toleranceEur} != ${TOLERANCE}`);
      }
      if (!sourceScenarios.length) {
        out.push(
          'MC-11 cost-scenarios.json not loaded: the tooling invariant cannot be recomputed',
        );
      }
      const reconByKey = new Map();
      for (const family of reconFamilies(data)) {
        for (const reconScenario of arr(family.scenarios)) {
          reconByKey.set(
            `${family.familyId}|${reconScenario.volume}|${reconScenario.case}`,
            reconScenario,
          );
        }
      }
      const seenKeys = new Set();
      for (const scenario of sourceScenarios) {
        const lines = arr(scenario.lines);
        const numericLines = lines.filter((line) => isNum(obj(line).amountEur));
        const hasNumericLines = numericLines.length > 0;
        const sum = numericLines.reduce((total, line) => total + obj(line).amountEur, 0);
        if (!near(sum, scenario.knownSubtotalEur)) {
          out.push(
            `${scenario.scenarioId}: line sum ${round2(sum)} != knownSubtotalEur ${scenario.knownSubtotalEur}`,
          );
        }
        const cost16 = lines.find((line) => obj(line).categoryId === 'COST-16');
        const cost16Amount = isNum(obj(cost16).amountEur) ? obj(cost16).amountEur : null;
        if (cost16Amount !== null) {
          if (!near(scenario.toolingAmortizationEur, cost16Amount)) {
            out.push(
              `${scenario.scenarioId}: toolingAmortizationEur != COST-16 line ${cost16Amount}`,
            );
          }
        } else if (scenario.toolingAmortizationEur !== null) {
          out.push(
            `${scenario.scenarioId}: tooling amortisation declared without a numeric COST-16 line`,
          );
        }
        const install = lines.find((line) => obj(line).categoryId === 'COST-12');
        const installAmount = isNum(obj(install).amountEur) ? obj(install).amountEur : null;
        const key = `${scenario.familyId}|${scenario.volume}|${scenario.case}`;
        const recon = reconByKey.get(key);
        if (!recon) {
          out.push(`${scenario.scenarioId}: no reconciliation entry for ${key}`);
          continue;
        }
        seenKeys.add(key);
        // When no numeric known line exists the derived values stay null (unknown is never
        // treated as zero); once a line is known every derived value must be numeric.
        const expectedFields = {
          knownSubtotalEur: hasNumericLines ? sum : 0,
          recomputedSubtotalEur: hasNumericLines ? sum : 0,
          sumCheckDeltaEur: 0,
          cost16ToolingEur: cost16Amount,
          toolingAmortizationFieldEur: hasNumericLines ? scenario.toolingAmortizationEur : null,
          variableCostExcludingToolingEur:
            hasNumericLines && cost16Amount !== null ? sum - cost16Amount : null,
          installationCostEur: hasNumericLines ? (installAmount ?? 0) : null,
          variableCostExcludingToolingAndInstallationEur:
            hasNumericLines && cost16Amount !== null
              ? sum - cost16Amount - (installAmount ?? 0)
              : null,
        };
        for (const [field, expected] of Object.entries(expectedFields)) {
          const actual = recon[field];
          if (expected === null) {
            if (actual !== null) {
              out.push(
                `${scenario.scenarioId}: reconciliation ${field} is ${actual} but the value is not computable from known lines`,
              );
            }
            continue;
          }
          if (actual === null) {
            out.push(
              `${scenario.scenarioId}: reconciliation ${field} is null despite numeric known lines`,
            );
            continue;
          }
          if (!near(actual, expected)) {
            out.push(
              `${scenario.scenarioId}: reconciliation ${field} ${actual} != recomputed ${round2(expected)}`,
            );
          }
        }
      }
      for (const key of reconByKey.keys()) {
        if (!seenKeys.has(key)) {
          out.push(`reconciliation declares a scenario with no MC-11 source: ${key}`);
        }
      }
      if (
        isNum(obj(reconciliation.totals).scenarios) &&
        obj(reconciliation.totals).scenarios !== 90
      ) {
        out.push(`reconciliation totals.scenarios ${obj(reconciliation.totals).scenarios} != 90`);
      }
      return out;
    },
  },
  {
    id: 'A-10',
    description:
      'COST-16/COST-17 are never variable lines; COST-12 installation is never counted twice',
    run(data) {
      const out = [];
      const method = obj(obj(data.unitEconomics).method);
      const excludes = arr(method.variableCostExcludes).join(' ');
      for (const category of ['COST-16', 'COST-17']) {
        if (!excludes.includes(category)) {
          out.push(`unit-economics method.variableCostExcludes omits ${category}`);
        }
      }
      for (const record of ueRecords(data)) {
        const categories = arr(record.costLines).map(lineCategory);
        for (const fixed of ['COST-16', 'COST-17']) {
          if (categories.includes(fixed)) {
            out.push(`${record.id}: ${fixed} appears as a variable unit cost line`);
          }
        }
        const installCount = categories.filter((category) => category === 'COST-12').length;
        if (record.configuration === 'HARDWARE_ONLY_SELF_INSTALL' && installCount > 0) {
          out.push(`${record.id}: self-install configuration counts COST-12 installation`);
        }
        if (record.configuration === 'INSTALLER_INCLUDED') {
          if (installCount !== 1) {
            out.push(
              `${record.id}: installer configuration must count COST-12 exactly once (found ${installCount})`,
            );
          }
        }
        if (installCount > 1) {
          out.push(`${record.id}: COST-12 installation counted ${installCount} times`);
        }
      }
      return unique(out);
    },
  },
  {
    id: 'A-11',
    description:
      'Fixed costs (tooling, engineering NRE, certification, security, insurance) are variable:false',
    run(data) {
      const out = [];
      for (const record of ueRecords(data)) {
        if (!Array.isArray(record.fixedCostsExcluded)) {
          out.push(`${record.id}: missing fixedCostsExcluded declaration`);
        }
        for (const line of arr(record.costLines)) {
          if (!FIXED_COST_CATEGORY.test(lineCategory(line))) continue;
          if (line.variable !== false) {
            out.push(
              `${record.id}/${line.id}: fixed cost "${lineCategory(line)}" is not flagged variable:false`,
            );
          }
        }
      }
      return out;
    },
  },
  {
    id: 'A-12',
    description: 'Every model currency is EUR and every conversion declares a rate and source',
    run(data) {
      const out = [];
      for (const [key, file] of Object.entries(FILES)) {
        const currency = obj(data[key]).currency;
        if (currency !== 'EUR') out.push(`${file}: model currency "${currency}" is not EUR`);
      }
      for (const record of ueRecords(data)) {
        if (record.currency !== 'EUR') {
          out.push(`${record.id}: record currency "${record.currency}" is not EUR`);
        }
      }
      const rateEntries = [];
      forEachBusinessFile(data, (node, path) => {
        if (!node || typeof node !== 'object' || Array.isArray(node)) return;
        if (path.endsWith('.fxBasis')) rateEntries.push({ label: `${path}`, entry: node });
        if (path.endsWith('.conversion')) rateEntries.push({ label: `${path}`, entry: node });
        if (node.fxRates !== undefined) {
          arr(node.fxRates).forEach((entry, index) =>
            rateEntries.push({ label: `${path}.fxRates[${index}]`, entry: obj(entry) }),
          );
        }
      });
      const declaredCurrencies = new Set();
      for (const { label, entry } of rateEntries) {
        const rate = entry.rate;
        if (!isStr(entry.from) || !isStr(entry.to) || !isNum(rate) || rate <= 0) {
          out.push(`${label}: conversion without a valid from/to/rate`);
        }
        if (!isUrl(entry.rateSourceUrl ?? entry.sourceUrl)) {
          out.push(`${label}: conversion without a source URL`);
        }
        if (!ISO_DATE.test(String(entry.rateDate ?? entry.retrievedOn ?? ''))) {
          out.push(`${label}: conversion without a rate date`);
        }
        if (!isStr(entry.evidenceClass)) out.push(`${label}: conversion without an evidence class`);
        if (isStr(entry.from)) declaredCurrencies.add(entry.from);
      }
      for (const record of providerRecords(data)) {
        if (!isNum(record.price) || record.price === 0) continue;
        const currency = record.priceCurrency;
        if (currency !== 'EUR' && !declaredCurrencies.has(currency)) {
          out.push(`${record.id}: ${currency} price has no declared EUR conversion basis`);
        }
      }
      return unique(out);
    },
  },
  {
    id: 'A-13',
    description: 'No VAT-inclusive figure is used as net revenue',
    run(data) {
      const out = [];
      const records = [
        ...ueRecords(data).map((record) => ({
          id: record.id,
          revenue: obj(record.revenue),
        })),
        ...beRecords(data).map((record) => ({
          id: `bundle/${record.bundleId}`,
          revenue: {
            grossHypothesisEur: record.grossHypothesisEur,
            vatBasis: record.vatBasis,
            vatRatePct: record.vatRatePct,
            netRevenueEur: record.netRevenueEur,
          },
        })),
      ];
      for (const { id, revenue } of records) {
        if (revenue.vatBasis !== 'VAT_INCLUDED') continue;
        if (isNum(revenue.grossHypothesisEur) && isNum(revenue.netRevenueEur)) {
          if (near(revenue.netRevenueEur, revenue.grossHypothesisEur)) {
            out.push(`${id}: VAT-inclusive gross hypothesis used as net revenue`);
          }
        }
        if (!isNum(revenue.vatRatePct) || revenue.vatRatePct <= 0) {
          out.push(`${id}: VAT-inclusive revenue without a positive VAT rate`);
        }
      }
      return out;
    },
  },
  {
    id: 'A-14',
    description: 'Rounding: recomputation tolerance 0.005, money 2 dp, percentages 1 dp',
    run(data) {
      const out = [];
      if (TOLERANCE !== 0.005) out.push(`recomputation tolerance ${TOLERANCE} is not 0.005`);
      const moneyKeys = new Set([
        'grossHypothesisEur',
        'netRevenueEur',
        'knownVariableCostEur',
        'contributionBeforeUnknownsEur',
        'headroomEur',
        'recurringContributionEurYear',
        'grossPerPeriodEur',
        'netRevenuePerPeriodEur',
        'resultContributionBeforeUnknownsEur',
      ]);
      forEachBusinessFile(data, (node, path) => {
        if (!node || typeof node !== 'object' || Array.isArray(node)) return;
        for (const [key, value] of Object.entries(node)) {
          if (moneyKeys.has(key) && isNum(value) && !same(round2(value), value)) {
            out.push(`${path}.${key}: aggregate money ${value} has more than 2 decimals`);
          }
          if (
            /(Pct|Percent)$/.test(key) &&
            isNum(value) &&
            !same(Math.round(value * 10) / 10, value)
          ) {
            out.push(`${path}.${key}: percentage ${value} has more than 1 decimal`);
          }
        }
      });
      return unique(out);
    },
  },

  /* --------------------------------------------------------- recurring exposure (R) */
  {
    id: 'R-01',
    description:
      'Every connected hardware SKU carries recurring cost inputs or an explicit UNKNOWN',
    run(data) {
      const out = [];
      const inputs = rcInputs(data);
      const cloudPerDevice = inputs.filter(
        (input) =>
          input.dependency === 'CLOUD_INFRA' &&
          input.driver === 'PER_DEVICE_MONTH' &&
          ['KNOWN', 'UNKNOWN', 'ASSUMPTION'].includes(input.status),
      );
      if (!cloudPerDevice.length) {
        out.push('recurring-cost-inputs has no cloud per-device-month input');
      }
      const ueRecords_ = ueRecords(data);
      for (const family of CONNECTED_HARDWARE_FAMILIES) {
        const familyRecords = ueRecords_.filter((record) => record.familyId === family);
        if (!familyRecords.length) {
          out.push(`connected hardware family ${family} has no unit-economics record`);
          continue;
        }
        const recurringCategories = familyRecords.flatMap((record) =>
          arr(record.costLines).map(lineCategory),
        );
        const hasRecurringLine = recurringCategories.some((category) =>
          /CLOUD|CELLULAR|CONNECTIVITY|TELEMETRY|NOTIFICATION/i.test(category),
        );
        const unknownCategories = familyRecords.flatMap((record) =>
          arr(record.unknownVariableCostCategories).map((unknown) => obj(unknown).category),
        );
        const declaredUnknown = unknownCategories.some((category) =>
          /CLOUD|CELLULAR|CONNECTIVITY|TELEMETRY|NOTIFICATION|LOCAL_DATA_PATH/i.test(
            String(category),
          ),
        );
        const declaredExposure = familyRecords.some((record) =>
          arr(record.recurringCostExposure).some((entry) => {
            const row = obj(entry);
            return (
              ['UNKNOWN', 'NOT_APPLICABLE'].includes(String(row.status)) &&
              /CLOUD|CELLULAR|CONNECTIVITY|TELEMETRY|NOTIFICATION|LOCAL_DATA_PATH|CUSTOMER_CONNECTIVITY/i.test(
                `${row.dependency} ${row.driver}`,
              )
            );
          }),
        );
        if (!hasRecurringLine && !declaredUnknown && !declaredExposure) {
          out.push(`${family}: no recurring cost input or explicit UNKNOWN entry`);
        }
      }
      return unique(out);
    },
  },
  {
    id: 'R-02',
    description: 'WATCH carries a cellular connectivity input, KNOWN or UNKNOWN, never absent',
    run(data) {
      const out = [];
      const cellular = rcInputs(data).filter(
        (input) =>
          input.dependency === 'CELLULAR_CONNECTIVITY' && input.driver === 'PER_DEVICE_MONTH',
      );
      if (!cellular.length) {
        out.push('recurring-cost-inputs has no cellular per-device-month input');
      }
      for (const input of cellular) {
        if (!['KNOWN', 'UNKNOWN', 'ASSUMPTION'].includes(input.status)) {
          out.push(`${input.id}: cellular input status "${input.status}" is not KNOWN/UNKNOWN`);
        }
        if (input.status === 'UNKNOWN' && input.valueEur !== null) {
          out.push(`${input.id}: UNKNOWN cellular input carries a numeric value`);
        }
      }
      const watchRecords = ueRecords(data).filter((record) => record.familyId === 'WATCH');
      if (!watchRecords.length) out.push('WATCH has no unit-economics record');
      const watchCellular = watchRecords.some(
        (record) =>
          arr(record.costLines).some((line) => /CELLULAR|CONNECTIVITY/i.test(lineCategory(line))) ||
          arr(record.unknownVariableCostCategories).some((unknown) =>
            /CELLULAR|CONNECTIVITY/i.test(String(obj(unknown).category)),
          ),
      );
      if (!watchCellular) {
        out.push('WATCH declares no cellular connectivity cost or explicit UNKNOWN');
      }
      return unique(out);
    },
  },
  {
    id: 'R-03',
    description: 'WATCH and FLEET carry cloud/telemetry per-device-month inputs',
    run(data) {
      const out = [];
      const cloud = rcInputs(data).filter(
        (input) => input.dependency === 'CLOUD_INFRA' && input.driver === 'PER_DEVICE_MONTH',
      );
      if (!cloud.length) {
        out.push('recurring-cost-inputs has no cloud/telemetry per-device-month input');
      }
      for (const family of ['WATCH', 'FLEET']) {
        const records = ueRecords(data).filter((record) => record.familyId === family);
        if (!records.length) {
          out.push(`${family} has no unit-economics record for recurring cloud exposure`);
          continue;
        }
        const hasCloud =
          records.some((record) =>
            arr(record.costLines).some((line) =>
              /CLOUD|TELEMETRY|TENANCY|STORAGE/i.test(lineCategory(line)),
            ),
          ) ||
          records.some((record) =>
            arr(record.unknownVariableCostCategories).some((unknown) =>
              /CLOUD|TELEMETRY|STORAGE/i.test(String(obj(unknown).category)),
            ),
          );
        if (!hasCloud) out.push(`${family}: no cloud/telemetry recurring cost or explicit UNKNOWN`);
      }
      return unique(out);
    },
  },
  {
    id: 'R-04',
    description: 'Inactive/suspended device state is modelled (as an assumption or input)',
    run(data) {
      const out = [];
      const texts = [
        ...assumptions(data).flatMap((assumption) => [assumption.statement, assumption.notes]),
        ...rcInputs(data).flatMap((input) => [input.item, input.notes, input.calculation]),
        ...Object.values(obj(obj(data.recurringCostInputs).usageProfiles)).map(
          (profile) => obj(profile).rationale,
        ),
      ].filter(isStr);
      const stateModelled = texts.some(
        (text) =>
          /inactive|suspended|dormant/i.test(text) &&
          /model|cost|retain|telemetry|storage|zero/i.test(text),
      );
      if (!stateModelled) {
        out.push(
          'inactive/suspended device state is not modelled in assumptions or recurring inputs',
        );
      }
      return out;
    },
  },
  {
    id: 'R-05',
    description: 'Alert notification cost is modelled and no guaranteed delivery is claimed',
    run(data) {
      const out = [];
      const notifications = rcInputs(data).filter((input) => input.dependency === 'NOTIFICATIONS');
      if (!notifications.length) {
        out.push('recurring-cost-inputs has no notification cost input');
      }
      const watchRecords = ueRecords(data).filter((record) => record.familyId === 'WATCH');
      const watchNotification = watchRecords.some(
        (record) =>
          arr(record.costLines).some((line) => /NOTIFICATION|ALERT/i.test(lineCategory(line))) ||
          arr(record.unknownVariableCostCategories).some((unknown) =>
            /NOTIFICATION|ALERT/i.test(String(obj(unknown).category)),
          ),
      );
      if (!watchNotification) {
        out.push('WATCH declares no alert notification cost or explicit UNKNOWN');
      }
      out.push(...guaranteedDeliveryClaims(data));
      return unique(out);
    },
  },
  {
    id: 'R-06',
    description: 'Support cost per active subscription is present or explicitly UNKNOWN',
    run(data) {
      const out = [];
      const subscribers = ueRecords(data).filter((record) => record.objectType === 'SUBSCRIPTION');
      if (!subscribers.length) out.push('no subscription records to check support exposure');
      for (const record of subscribers) {
        const supported =
          arr(record.costLines).some((line) => /SUPPORT/i.test(lineCategory(line))) ||
          arr(record.unknownVariableCostCategories).some((unknown) =>
            /SUPPORT/i.test(String(obj(unknown).category)),
          );
        if (!supported)
          out.push(`${record.id}: subscription has no support cost or explicit UNKNOWN`);
      }
      return unique(out);
    },
  },
  {
    id: 'R-07',
    description: 'Security-support / CRA lifecycle cost is present or explicitly UNKNOWN',
    run(data) {
      const out = [];
      const security = /SECURITY_MAINTENANCE|SECURITY_SUPPORT|CRA|CYBER/i;
      const subscribers = ueRecords(data).filter((record) => record.objectType === 'SUBSCRIPTION');
      for (const record of subscribers) {
        const declared =
          arr(record.fixedCostsExcluded).some((fixed) =>
            security.test(String(obj(fixed).category)),
          ) ||
          arr(record.unknownVariableCostCategories).some((unknown) =>
            security.test(String(obj(unknown).category)),
          );
        if (!declared) {
          out.push(`${record.id}: no security-maintenance/CRA lifecycle cost or explicit UNKNOWN`);
        }
      }
      const datasetLevel = [
        ...assumptions(data),
        ...legalItems(data),
        ...arr(obj(data.mc13Handoff).recurringCosts),
      ].some((entry) =>
        security.test(
          JSON.stringify([
            entry.statement,
            entry.item,
            entry.category,
            entry.requirement,
            entry.topic,
          ]),
        ),
      );
      if (!datasetLevel) {
        out.push('dataset declares no security-support/CRA lifecycle cost anywhere');
      }
      return unique(out);
    },
  },
  {
    id: 'R-08',
    description: 'Storage and retention are modelled with an explicit retention period',
    run(data) {
      const out = [];
      const texts = collectStrings(data, /retention/i);
      const structured = collectFieldEntries(data, (field) =>
        /retention(Months|Days|Years|Period)/i.test(field),
      );
      const periodPattern =
        /\b\d+\s*[- ]?\s*(month|year|day)s?\b|(one|two|three|six|twelve|twenty-four)\s+(month|year|day)s?/i;
      const modelled =
        texts.some((text) => periodPattern.test(text)) ||
        structured.some(({ value }) => isNum(value) || isStr(value));
      if (!modelled) {
        out.push('no retention period is declared for stored telemetry/data');
      }
      return out;
    },
  },

  /* ------------------------------------------------ delivery & no-regression (D) */
  {
    id: 'D-01',
    description: 'No MC-13 artefact: mc13Started false, no multi-period forecast file',
    run(data) {
      const out = [];
      const manifest = manifestOf(data);
      const handoff = obj(data.mc13Handoff);
      if (manifest.forecastProduced !== false) {
        out.push(`manifest.forecastProduced "${manifest.forecastProduced}" is not false`);
      }
      if (handoff.mc13Started !== false) {
        out.push(`mc13-handoff mc13Started "${handoff.mc13Started}" is not false`);
      }
      for (const file of Object.values(FILES)) {
        if (/forecast|projection/i.test(file)) out.push(`MC-13 forecast artefact present: ${file}`);
      }
      for (const { key, value, path } of collectFieldEntries(data, (field) =>
        /forecast(Months|Years|Periods)|projectionPeriods|twelveMonth|thirtySixMonth|sixtyMonth|12Month|36Month|60Month/i.test(
          field,
        ),
      )) {
        if (value !== false && value !== null) {
          out.push(`${path}.${key}: multi-period forecast artefact (${JSON.stringify(value)})`);
        }
      }
      return out;
    },
  },
  {
    id: 'D-02',
    description: 'No break-even or profitability claim',
    run(data) {
      const out = [];
      const manifest = manifestOf(data);
      if (manifest.breakEvenClaim !== false) {
        out.push(`manifest.breakEvenClaim "${manifest.breakEvenClaim}" is not false`);
      }
      if (manifest.profitability !== 'NONE') {
        out.push(`manifest.profitability "${manifest.profitability}" is not NONE`);
      }
      for (const { key, value, path } of collectFieldEntries(data, (field) =>
        /breakEven(Months|Years|Period|Timeline|Date)|payback(Months|Years)|netProfit|profitMargin|grossMarginPct/i.test(
          field,
        ),
      )) {
        if (value !== null && value !== false) {
          out.push(`${path}.${key}: break-even/profitability claim (${JSON.stringify(value)})`);
        }
      }
      for (const { value, path } of collectFieldEntries(
        data,
        (field) => field === 'profitability',
      )) {
        if (value !== 'NONE') out.push(`${path}: profitability "${value}" is not NONE`);
      }
      return unique(out);
    },
  },
  {
    id: 'D-03',
    description: 'Manifest status block matches the delivery values exactly',
    run(data) {
      const out = [];
      const statusBlock = obj(manifestOf(data).statusBlock);
      if (!Object.keys(statusBlock).length) {
        out.push('manifest.statusBlock is missing');
        return out;
      }
      for (const [key, expected] of Object.entries(FROZEN_STATUS_BLOCK)) {
        if (!Object.prototype.hasOwnProperty.call(statusBlock, key)) {
          out.push(`manifest.statusBlock.${key} is missing`);
        } else if (statusBlock[key] !== expected) {
          out.push(
            `manifest.statusBlock.${key} "${statusBlock[key]}" != delivery value "${expected}"`,
          );
        }
      }
      return out;
    },
  },
  {
    id: 'D-04',
    description: 'MC-11 source files unchanged against the recorded content baseline',
    run(data) {
      const out = [];
      const baseline = obj(data._mc11Baseline);
      const files = arr(baseline.files);
      if (!isStr(baseline.aggregateSha256)) {
        out.push('MC-11 content baseline was not recomputed by the loader');
      } else if (baseline.aggregateSha256 !== MC11_FROZEN_BASELINE_SHA256) {
        out.push(
          `MC-11 data aggregate ${baseline.aggregateSha256} != recorded baseline ${MC11_FROZEN_BASELINE_SHA256}`,
        );
      }
      const names = files
        .map((file) => obj(file).name)
        .filter(isStr)
        .sort();
      if (names.length !== MC11_FROZEN_FILES.length) {
        out.push(
          `MC-11 baseline covers ${names.length} files, expected ${MC11_FROZEN_FILES.length}`,
        );
      }
      for (const name of MC11_FROZEN_FILES) {
        if (!names.includes(name)) out.push(`MC-11 baseline missing ${name}`);
      }
      for (const file of files) {
        const record = obj(file);
        if (!/^[0-9a-f]{64}$/.test(String(record.sha256 ?? ''))) {
          out.push(`MC-11 baseline for ${record.name} has no SHA-256`);
        }
      }
      return unique(out);
    },
  },
];

/* ------------------------------------------------------------------ reporting */

/**
 * Implementation notes: rules the validator applies and provenance it wants stated explicitly in
 * the report. They are not violations.
 */
export function contractNotes(data) {
  const notes = [];
  try {
    const zeroFee = providerRecords(data).filter(
      (record) =>
        record.priceStatus === 'PUBLISHED' &&
        record.price === 0 &&
        ZERO_FEE_PUBLICATION_CLASSES.includes(record.evidenceClass),
    );
    notes.push(
      `V-12 implemented as amended: a zero-fee public-domain/open-licence dataset may be PUBLISHED with OFFICIAL_LICENSING_DOCUMENT (${zeroFee.length} records); any non-zero PUBLISHED price requires a tariff/observation class`,
    );
    const externalCodes = unique(
      legalItems(data)
        .map((item) => obj(item).externalBlockerCode)
        .filter(isStr),
    );
    if (externalCodes.length) {
      notes.push(
        `legal-tax items preserve original external blocker codes as externalBlockerCode (note only, not model references): ${externalCodes.join(', ')}`,
      );
    }
    notes.push(
      'conversion scope: non-EUR provider observations retain their source currency; the EUR conversion basis is declared centrally in recurring-cost-inputs.fxBasis and ASM-MC12-021, and every declared conversion block is checked by A-12',
    );
  } catch {
    notes.push('implementation notes could not be computed');
  }
  return notes;
}

export function validate(data) {
  const results = CHECKS.map((check) => {
    let violations;
    try {
      violations = unique(check.run(data) ?? []);
    } catch (error) {
      violations = [`check crashed: ${error instanceof Error ? error.message : String(error)}`];
    }
    return {
      id: check.id,
      description: check.description,
      status: violations.length === 0 ? 'PASS' : 'FAIL',
      violations,
    };
  });
  const passed = results.filter((check) => check.status === 'PASS').length;
  const counts = { total: results.length, passed, failed: results.length - passed };
  const failures = results.filter((check) => check.status === 'FAIL').map((check) => check.id);
  const violations = results.flatMap((check) =>
    check.violations.map((violation) => `${check.id}: ${violation}`),
  );
  return {
    ok: counts.failed === 0,
    checks: results,
    counts,
    failures,
    violations,
    notes: contractNotes(data),
  };
}

/* -------------------------------------------------------------------- loading */

function recomputeMc11Baseline() {
  const files = [];
  let names = [];
  try {
    names = readdirSync(HARDWARE_DATA_DIR)
      .filter((name) => name.endsWith('.json'))
      .sort();
  } catch {
    return { aggregateSha256: null, files: [] };
  }
  for (const name of names) {
    try {
      files.push({
        name,
        sha256: createHash('sha256')
          .update(readFileSync(join(HARDWARE_DATA_DIR, name)))
          .digest('hex'),
      });
    } catch {
      files.push({ name, sha256: null });
    }
  }
  const aggregateSha256 = createHash('sha256')
    .update(files.map((file) => `${file.name}:${file.sha256}`).join('\n') + '\n', 'utf8')
    .digest('hex');
  return { aggregateSha256, files };
}

export function loadFromDisk() {
  const data = {};
  const missing = [];
  const readErrors = [];
  for (const [key, file] of Object.entries(FILES)) {
    const path = join(DATA_DIR, file);
    if (!existsSync(path)) {
      missing.push(file);
      data[key] = {};
      continue;
    }
    try {
      data[key] = JSON.parse(readFileSync(path, 'utf8'));
    } catch {
      readErrors.push(file);
      data[key] = {};
    }
  }
  const external = {};
  try {
    external.hardwareCostScenarios = JSON.parse(
      readFileSync(join(HARDWARE_DATA_DIR, HARDWARE_COST_SCENARIOS_FILE), 'utf8'),
    );
  } catch {
    external.hardwareCostScenarios = {};
  }
  try {
    external.bundleDefinitions = JSON.parse(readFileSync(BUNDLE_DEFINITIONS_PATH, 'utf8'));
  } catch {
    external.bundleDefinitions = {};
  }
  data._external = external;
  data._missing = missing;
  data._readErrors = readErrors;
  data._mc11Baseline = recomputeMc11Baseline();
  return { data, missing };
}

function main() {
  const jsonMode = process.argv.includes('--json');
  const { data, missing } = loadFromDisk();
  if (missing.length) {
    console.error(`MC-12 unit-economics validator: missing data files: ${missing.join(', ')}`);
    process.exitCode = 1;
    return;
  }
  const report = validate(data);
  if (jsonMode) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log('MC-12 unit-economics validator');
    console.log(
      `${report.counts.total} checks — ${report.counts.passed} PASS / ${report.counts.failed} FAIL`,
    );
    for (const note of report.notes) console.log(`NOTE  ${note}`);
    for (const check of report.checks) {
      if (check.status === 'FAIL') {
        console.log(`FAIL ${check.id} — ${check.description}`);
        for (const violation of check.violations) console.log(`      ${violation}`);
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
