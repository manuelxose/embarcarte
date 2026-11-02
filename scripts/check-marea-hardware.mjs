#!/usr/bin/env node
/**
 * MC-11 hardware evidence validator.
 *
 * Authority: docs/marea/hardware/data/DATA-CONTRACT.md (§6 maps every V-check to the mandated
 * integrity rule of Master Prompt 11/36 §27).
 *
 * Read-only with respect to business data: it loads docs/marea/hardware/data/*.json, validates,
 * prints a report and exits non-zero on any violation. It never writes, migrates or repairs data.
 *
 * Usage:
 *   node scripts/check-marea-hardware.mjs            full gate
 *   node scripts/check-marea-hardware.mjs --json     machine-readable report
 *
 * Dependency-free on purpose (no runtime packages added).
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, '..');
const DATA_DIR = join(REPO_ROOT, 'docs', 'marea', 'hardware', 'data');

/* ------------------------------------------------------------------ constants */

export const CANONICAL_PRODUCTS = {
  NAV: ['NAV-ESSENTIAL', 'NAV-PRO'],
  HUB: ['HUB-STANDARD', 'HUB-PRO'],
  AIS: ['AIS-RECEIVER', 'AIS-CONNECTED'],
  PILOT: ['PILOT-COASTAL', 'PILOT-SAIL', 'PILOT-PRO'],
  SENSE: [
    'SENSE-WIND',
    'SENSE-POWER',
    'SENSE-BILGE',
    'SENSE-TANKS',
    'SENSE-ENV',
    'SENSE-ESSENTIALS',
    'SENSE-SAIL',
    'SENSE-SYSTEMS',
  ],
  WATCH: ['WATCH-CORE', 'WATCH-PLUS'],
  DISPLAY: ['DISPLAY-7', 'DISPLAY-LARGE-CONDITIONAL'],
  WEATHER: ['WEATHER-STANDARD', 'WEATHER-PRO'],
  FLEET: ['FLEET-START', 'FLEET-BUSINESS', 'FLEET-ENTERPRISE'],
};

export const CANONICAL_BUNDLES = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'];

export const HARDWARE_FREE_BUNDLES = ['FLEET'];
export const NO_TURNKEY_PRICE_BUNDLES = ['SAIL', 'COMPLETE'];

const PRICE_CLASSES = new Set([
  'MANUFACTURER_PUBLIC_LIST_PRICE',
  'AUTHORIZED_DISTRIBUTOR_PUBLIC_PRICE',
  'THIRD_PARTY_RESELLER_PUBLIC_PRICE',
  'HISTORICAL_OBSERVATION',
  'CALCULATED_ESTIMATE',
  'ENGINEERING_ASSUMPTION',
  'BUDGETARY_INDICATION',
  'UNKNOWN',
]);

const CONFIDENCE = new Set([
  'PUBLIC_PRICE_OBSERVED',
  'MANUFACTURER_SPEC_VERIFIED',
  'ENGINEERING_ESTIMATE',
  'COST_UNVERIFIED',
]);

const COMPAT_STATUSES = new Set([
  'DOCUMENTED_INTERFACE',
  'PROPOSED',
  'ASSUMED',
  'TEST_REQUIRED',
  'BLOCKED',
]);

const EVIDENCE_TYPES = new Set([
  'MANUFACTURER_DATASHEET',
  'MANUFACTURER_WEBPAGE',
  'DISTRIBUTOR_WEBPAGE',
  'OFFICIAL_LEGAL_TEXT',
  'OFFICIAL_STANDARDS_BODY',
  'OFFICIAL_GOVERNMENT_GUIDE',
  'THIRD_PARTY_COMMENTARY',
]);

export const GOVERNANCE_INVARIANTS = {
  COMMERCIAL_AVAILABILITY: 'NOT_FOR_SALE',
  PRICE_APPROVED: 'NONE',
  TRADEMARK_LEGAL_CLEARANCE: 'NOT_GRANTED',
  SOURCE_IP_CLEARANCE: 'NOT_CLEARED',
  OPEN_MARINE_WRITE: 'PROHIBITED',
  NMEA2000_CERTIFIED: false,
  TESTED_COMPATIBILITY_ROWS: 0,
  AIS_TRANSMISSION_OFFERED: false,
  PILOT_SAFETY_GATE: 'BLOCKED',
  REMOTE_HELM_CONTROL: false,
  CHART_RIGHTS_GRANTED: false,
  WEATHER_PROVIDER_RIGHTS: 'NOT_GRANTED',
  FLEET_DEFAULT_HARDWARE: false,
  GOVERNANCE_CONTROLLER_DESIGNATED: false,
  SUPPLIER_CONTACT: 'NOT_CONTACTED',
  RFQ_TRANSMISSION: 'NOT_AUTHORIZED',
  PURCHASES: 'NOT_AUTHORIZED',
  PROTOTYPE_PROCUREMENT: 'NOT_AUTHORIZED',
  PHYSICAL_TESTS: 'NOT_EXECUTED',
  CONFORMITY_CERTIFICATION: 'NOT_ESTABLISHED',
  CE_MARKING_CLAIM: 'PROHIBITED',
  ENVIRONMENTAL_RATING_CLAIM: 'PROHIBITED',
  PRODUCTION_DEPLOYMENT: 'NOT_AUTHORIZED',
  PUBLICATION_CHANGE: 'NOT_AUTHORIZED',
  CUSTOMER_EVIDENCE: 'NONE',
  CUSTOMER_WTP_VALIDATED: false,
};

export const CRITERIA_WEIGHTS = {
  technicalFeasibility: 15,
  componentAvailability: 10,
  supplierLongevity: 10,
  energyConsumption: 5,
  manufacturingCostUncertainty: 8,
  conformityComplexity: 12,
  maintainability: 8,
  connectivity: 6,
  security: 8,
  mechanicalIntegration: 8,
  fieldServiceRequirements: 10,
};

export const FILES = {
  manifest: 'manifest.json',
  family: 'hardware-families.json',
  arch: 'architecture-options.json',
  components: 'component-register.json',
  suppliers: 'supplier-register.json',
  prices: 'price-observations.json',
  ebom: 'engineering-bom.json',
  mbom: 'manufacturing-bom.json',
  costs: 'cost-scenarios.json',
  conformity: 'conformity-applicability.json',
  qualification: 'qualification-plan.json',
  nmea: 'nmea-status.json',
  compatibility: 'compatibility-requirements.json',
  risks: 'risks.json',
  decisions: 'decisions.json',
  governance: 'governance-status.json',
  review: 'review-findings.json',
  evidence: 'evidence-index.json',
};

/* ------------------------------------------------------------------ helpers */

const arr = (x) => (Array.isArray(x) ? x : []);
const obj = (x) => (x && typeof x === 'object' && !Array.isArray(x) ? x : {});
const isNum = (x) => typeof x === 'number' && Number.isFinite(x);
const isInt = (x) => isNum(x) && Number.isInteger(x);
const isStr = (x) => typeof x === 'string' && x.trim().length > 0;
const isUrl = (x) => isStr(x) && /^https?:\/\/[^\s]+$/i.test(x.trim());
const near = (a, b) => isNum(a) && isNum(b) && Math.abs(a - b) <= 0.01;
const lc = (x) => (isStr(x) ? x.trim().toLowerCase() : '');
const norm = (x) =>
  lc(x)
    .replace(/[^a-z0-9]/g, '')
    .replace(
      /\b(ltd|limited|gmbh|srl|sl|sa|sas|inc|corp|corporation|bv|nv|ag|plc|llc|oy|ab|as)\b/g,
      '',
    );

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

function collectStrings(root, pattern) {
  const found = [];
  walk(root, '', (node) => {
    if (typeof node === 'string' && pattern.test(node)) found.push(node);
  });
  return found;
}

function collectFields(root, keyPredicate) {
  const found = [];
  walk(root, '', (node, path) => {
    if (!node || typeof node !== 'object' || Array.isArray(node)) return;
    for (const key of Object.keys(node)) {
      if (keyPredicate(key)) found.push({ key, value: node[key], path: `${path}.${key}` });
    }
  });
  return found;
}

function unique(list) {
  return [...new Set(list)];
}

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

function evidenceIdsIn(root) {
  return unique(collectStrings(root, /^EVD-MC11-\d{3,}$/));
}

/* ------------------------------------------------------------------ checks */

/**
 * Each check: { id, rule, name, run(data) -> string[] }
 * `rule` is the corresponding mandated rule of Master Prompt §27.
 */
export const CHECKS = [
  {
    id: 'V01',
    rule: 'Unknown product IDs rejected',
    run(data) {
      const out = [];
      const canonical = new Set(Object.keys(CANONICAL_PRODUCTS));
      for (const f of arr(data.family?.families)) {
        const id = f.familyId;
        if (!canonical.has(id)) out.push(`hardware-families: unknown familyId "${id}"`);
      }
      for (const { key, value } of collectFields(
        data,
        (k) => k === 'familyId' || k === 'productId',
      )) {
        if (isStr(value) && !canonical.has(value))
          out.push(`${key}="${value}" is not a canonical product`);
      }
      return unique(out);
    },
  },
  {
    id: 'V02',
    rule: 'Unknown bundle IDs rejected',
    run(data) {
      const out = [];
      const canonical = new Set(CANONICAL_BUNDLES);
      for (const b of arr(data.family?.bundles)) {
        if (!canonical.has(b.bundleId))
          out.push(`hardware-families: unknown bundleId "${b.bundleId}"`);
      }
      for (const { key, value } of collectFields(data, (k) => k === 'bundleId')) {
        if (isStr(value) && !canonical.has(value))
          out.push(`${key}="${value}" is not a canonical bundle`);
      }
      return unique(out);
    },
  },
  {
    id: 'V03',
    rule: 'Missing product coverage rejected',
    run(data) {
      const present = new Set(arr(data.family?.families).map((f) => f.familyId));
      return Object.keys(CANONICAL_PRODUCTS)
        .filter((id) => !present.has(id))
        .map((id) => `missing product coverage for ${id}`);
    },
  },
  {
    id: 'V04',
    rule: 'Missing bundle coverage rejected',
    run(data) {
      const present = new Set(arr(data.family?.bundles).map((b) => b.bundleId));
      return CANONICAL_BUNDLES.filter((id) => !present.has(id)).map(
        (id) => `missing bundle coverage for ${id}`,
      );
    },
  },
  {
    id: 'V05',
    rule: 'Duplicate component IDs rejected',
    run(data) {
      const ids = arr(data.components?.components).map((c) => c.componentId);
      return dupes(ids.filter(isStr)).map((id) => `duplicate componentId ${id}`);
    },
  },
  {
    id: 'V06',
    rule: 'One supplier identity presented as two suppliers rejected',
    run(data) {
      const suppliers = arr(data.suppliers?.suppliers);
      const out = [];
      for (const key of ['legalName', 'tradingName']) {
        const byName = new Map();
        for (const s of suppliers) {
          const n = norm(s?.[key]);
          if (!n) continue;
          if (byName.has(n) && byName.get(n) !== s.supplierId) {
            out.push(
              `supplier identity "${s[key]}" used by both ${byName.get(n)} and ${s.supplierId}`,
            );
          } else if (!byName.has(n)) {
            byName.set(n, s.supplierId);
          }
        }
      }
      return unique(out);
    },
  },
  {
    id: 'V07',
    rule: 'Component claim without datasheet evidence rejected',
    run(data) {
      const out = [];
      const evIds = new Set(evidenceIdsIn(data.evidence ?? {}));
      for (const c of arr(data.components?.components)) {
        const id = c.componentId;
        if (!isStr(c.mpn)) out.push(`${id}: missing MPN`);
        if (c.datasheetStatus === 'RETRIEVED') {
          if (!isUrl(c.datasheetUrl))
            out.push(`${id}: datasheetStatus RETRIEVED without a datasheet URL`);
        } else if (!['LISTED_NOT_RETRIEVED', 'NOT_FOUND'].includes(c.datasheetStatus)) {
          out.push(`${id}: invalid datasheetStatus "${c.datasheetStatus}"`);
        }
        if (!isStr(c.mpnEvidenceId) || !evIds.has(c.mpnEvidenceId)) {
          out.push(
            `${id}: MPN claim without resolvable evidence id (${c.mpnEvidenceId ?? 'none'})`,
          );
        }
        for (const e of arr(c.evidenceIds)) {
          if (!evIds.has(e))
            out.push(`${id}: evidence ${e} does not resolve in the evidence index`);
        }
      }
      return out;
    },
  },
  {
    id: 'V08',
    rule: 'Public price mislabelled as a formal quote rejected',
    run(data) {
      const out = [];
      const forbiddenClasses = /FORMAL_SUPPLIER_QUOTATION|SUPPLIER_QUOTED/;
      for (const { key, value, path } of collectFields(data, (k) =>
        ['evidenceClass', 'priceEvidenceClass', 'confidence'].includes(k),
      )) {
        if (typeof value === 'string' && forbiddenClasses.test(value)) {
          out.push(`${path}: forbidden class "${value}" (no supplier was contacted)`);
        }
      }
      for (const obs of arr(data.prices?.observations)) {
        if (!PRICE_CLASSES.has(obs.evidenceClass)) {
          out.push(`${obs.observationId}: invalid evidenceClass "${obs.evidenceClass}"`);
        }
      }
      return out;
    },
  },
  {
    id: 'V09',
    rule: 'Formal quote without genuine provenance rejected',
    run(data) {
      const out = [];
      for (const { value, path } of collectFields(data, (k) =>
        ['quotationRef', 'quotationId', 'quotationDate', 'formalQuotation'].includes(k),
      )) {
        if (value !== null && value !== false && value !== undefined && value !== '') {
          out.push(`${path}: claims a formal quotation; MC-11 obtained none`);
        }
      }
      for (const obs of arr(data.prices?.observations)) {
        if (obs.quotationRef)
          out.push(`${obs.observationId}: catalogue observation carries a quotation ref`);
      }
      return out;
    },
  },
  {
    id: 'V10',
    rule: 'Supplier contact claimed without evidence rejected',
    run(data) {
      const out = [];
      for (const s of arr(data.suppliers?.suppliers)) {
        if (s.contactStatus !== 'NOT_CONTACTED') {
          out.push(
            `${s.supplierId}: contactStatus "${s.contactStatus}" — only NOT_CONTACTED is authorised`,
          );
        }
        if (s.contacted === true || isStr(s.contactEvidence) || isStr(s.contactName)) {
          out.push(`${s.supplierId}: claims contact evidence with no authorised contact`);
        }
      }
      return out;
    },
  },
  {
    id: 'V11',
    rule: 'Purchased component without approval rejected',
    run(data) {
      const out = [];
      for (const { key, value, path } of collectFields(data, (k) =>
        ['purchased', 'ordered', 'purchaseOrder', 'purchaseStatus', 'procured'].includes(k),
      )) {
        if (
          value === true ||
          (isStr(value) && value !== 'NOT_PURCHASED' && value !== 'NOT_AUTHORIZED')
        ) {
          out.push(`${path}: claims a purchase (${value}) with no purchasing authority`);
        }
      }
      const gov = obj(data.governance?.milestoneState);
      if (isNum(gov.purchasesMade) && gov.purchasesMade > 0)
        out.push('governance: purchasesMade > 0');
      // An evidence record may legitimately quote a legal text that mentions invoices or purchase
      // orders; only an assertion that this programme bought something is a violation.
      const purchaseEvidence = arr(data.evidence?.evidence).filter((e) =>
        /\b(we|marea|embarcarte)\b[^.]{0,30}\b(purchased|ordered|bought|procured)\b/i.test(
          String(e?.supportedAssertion ?? ''),
        ),
      );
      if (purchaseEvidence.length)
        out.push(`evidence index contains purchase claims (${purchaseEvidence[0].evidenceId})`);
      return out;
    },
  },
  {
    id: 'V12',
    rule: 'BOM quantity <= 0 rejected',
    run(data) {
      const out = [];
      for (const bom of [...arr(data.ebom?.boms), ...arr(data.mbom?.boms)]) {
        for (const line of arr(bom.lines)) {
          if (!isInt(line.qtyPerUnit) || line.qtyPerUnit <= 0) {
            out.push(`${line.lineId}: qtyPerUnit "${line.qtyPerUnit}" must be an integer >= 1`);
          }
        }
      }
      return out;
    },
  },
  {
    id: 'V13',
    rule: 'Incomplete BOM total presented as complete rejected',
    run(data) {
      const out = [];
      for (const bom of [...arr(data.ebom?.boms), ...arr(data.mbom?.boms)]) {
        const totals = obj(bom.totals);
        const lines = arr(bom.lines);
        const unknown = lines.filter((l) => !isNum(l.observedUnitPrice)).length;
        if (isNum(totals.unknownLineCount) && totals.unknownLineCount !== unknown) {
          out.push(
            `${bom.bomId}: unknownLineCount ${totals.unknownLineCount} != actual ${unknown}`,
          );
        }
        if (totals.totalStatus === 'COMPLETE_TO_EVIDENCE') {
          if (unknown > 0)
            out.push(`${bom.bomId}: COMPLETE_TO_EVIDENCE with ${unknown} unpriced lines`);
          if (!isNum(totals.totalEur))
            out.push(`${bom.bomId}: COMPLETE_TO_EVIDENCE without totalEur`);
        }
        if (totals.totalStatus === 'INCOMPLETE' && isNum(totals.totalEur)) {
          out.push(`${bom.bomId}: INCOMPLETE total carries a numeric totalEur`);
        }
      }
      return out;
    },
  },
  {
    id: 'V14',
    rule: 'Missing currency rejected',
    run(data) {
      const out = [];
      for (const obs of arr(data.prices?.observations)) {
        if (!isStr(obs.currency)) out.push(`${obs.observationId}: missing currency`);
      }
      for (const bom of [...arr(data.ebom?.boms), ...arr(data.mbom?.boms)]) {
        if (!isStr(bom.currency) && !isStr(data.ebom?.currency) && !isStr(data.mbom?.currency)) {
          out.push(`${bom.bomId}: missing currency`);
        }
        for (const line of arr(bom.lines)) {
          if (!isStr(line.currency)) out.push(`${line.lineId}: missing currency`);
        }
      }
      for (const scenario of arr(data.costs?.scenarios)) {
        if (!isStr(scenario.currency) && !isStr(data.costs?.currency)) {
          out.push(`${scenario.scenarioId}: missing currency`);
        }
      }
      return out;
    },
  },
  {
    id: 'V15',
    rule: 'Mixed VAT bases without normalisation rejected',
    run(data) {
      const out = [];
      for (const bom of [...arr(data.ebom?.boms), ...arr(data.mbom?.boms)]) {
        let hasVatUnknown = false;
        for (const line of arr(bom.lines)) {
          if (line.vatTreatment === 'VAT_INCLUDED' && line.normalizationApplied !== true) {
            out.push(`${line.lineId}: VAT_INCLUDED input used without normalizationApplied`);
          }
          if (line.vatTreatment === 'VAT_UNKNOWN') hasVatUnknown = true;
          if (!['VAT_INCLUDED', 'VAT_EXCLUDED', 'VAT_UNKNOWN'].includes(line.vatTreatment)) {
            out.push(`${line.lineId}: invalid vatTreatment "${line.vatTreatment}"`);
          }
        }
        if (hasVatUnknown && obj(bom.totals).totalStatus === 'COMPLETE_TO_EVIDENCE') {
          out.push(`${bom.bomId}: COMPLETE_TO_EVIDENCE declared with a VAT_UNKNOWN input`);
        }
      }
      return out;
    },
  },
  {
    id: 'V16',
    rule: 'Price tier mismatch between observation and line rejected',
    run(data) {
      const out = [];
      const obsById = indexBy(data.prices?.observations, 'observationId');
      for (const bom of [...arr(data.ebom?.boms), ...arr(data.mbom?.boms)]) {
        for (const line of arr(bom.lines)) {
          if (!line.priceObservationId) continue;
          const obs = obsById.get(line.priceObservationId);
          if (!obs) {
            out.push(
              `${line.lineId}: price observation ${line.priceObservationId} does not resolve`,
            );
            continue;
          }
          if (line.priceQuantityTier !== obs.priceQuantityTier) {
            out.push(
              `${line.lineId}: tier ${line.priceQuantityTier} != observation tier ${obs.priceQuantityTier}`,
            );
          }
          if (
            isNum(obs.observedUnitPrice) &&
            !near(line.observedUnitPrice, obs.observedUnitPrice)
          ) {
            out.push(`${line.lineId}: unit price differs from observation ${obs.observationId}`);
          }
        }
      }
      return out;
    },
  },
  {
    id: 'V17',
    rule: 'Missing observation date rejected',
    run(data) {
      const out = [];
      const today = new Date().toISOString().slice(0, 10);
      for (const obs of arr(data.prices?.observations)) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(String(obs.observedAt ?? ''))) {
          out.push(`${obs.observationId}: missing/invalid observedAt`);
        } else if (obs.observedAt > today) {
          out.push(`${obs.observationId}: observedAt "${obs.observedAt}" is in the future`);
        }
      }
      for (const { key, value, path } of collectFields(data, (k) => k === 'priceDate')) {
        if (value !== null && !/^\d{4}-\d{2}-\d{2}$/.test(String(value)))
          out.push(`${path}: invalid priceDate`);
      }
      return out;
    },
  },
  {
    id: 'V18',
    rule: 'Unsupported stock or lead-time claim rejected',
    run(data) {
      const out = [];
      const evIds = new Set(evidenceIdsIn(data.evidence ?? {}));
      for (const obs of arr(data.prices?.observations)) {
        if (!['IN_STOCK_OBSERVED', 'LISTED_FOR_SALE', 'UNKNOWN'].includes(obs.availabilityClaim)) {
          out.push(`${obs.observationId}: invalid availabilityClaim "${obs.availabilityClaim}"`);
        }
        if (obs.availabilityClaim !== 'UNKNOWN' && !evIds.has(obs.availabilityEvidenceId)) {
          out.push(`${obs.observationId}: availability claim without resolvable evidence`);
        }
        if (obs.leadTimeClaim !== 'UNKNOWN' && !evIds.has(obs.leadTimeEvidenceId)) {
          out.push(`${obs.observationId}: lead-time claim without resolvable evidence`);
        }
      }
      return out;
    },
  },
  {
    id: 'V19',
    rule: 'Invented MOQ rejected',
    run(data) {
      const out = [];
      const evIds = new Set(evidenceIdsIn(data.evidence ?? {}));
      for (const obs of arr(data.prices?.observations)) {
        if (obs.moqObserved !== null && obs.moqObserved !== undefined) {
          if (!isInt(obs.moqObserved) || obs.moqObserved <= 0)
            out.push(`${obs.observationId}: invalid moqObserved`);
          if (!evIds.has(obs.moqEvidenceId))
            out.push(`${obs.observationId}: MOQ without resolvable evidence`);
        }
        if (!isInt(obs.priceQuantityTier) || obs.priceQuantityTier < 1) {
          out.push(`${obs.observationId}: missing/invalid priceQuantityTier`);
        }
      }
      return out;
    },
  },
  {
    id: 'V20',
    rule: 'Currency conversion without rate provenance rejected',
    run(data) {
      const out = [];
      const rates = arr(data.costs?.fxRates);
      const assumptionIds = new Set(arr(data.costs?.assumptions).map((a) => a.assumptionId));
      for (const rate of rates) {
        if (!isStr(rate.from) || !isStr(rate.to) || !isNum(rate.rate) || rate.rate <= 0) {
          out.push(`fxRates: invalid rate entry ${JSON.stringify(rate)}`);
        }
        // A rate needs either a real observed source, or an explicitly labelled engineering
        // assumption that resolves to an ASM record. An invented "market" rate is neither.
        const observed =
          isUrl(rate.sourceUrl) && /^\d{4}-\d{2}-\d{2}$/.test(String(rate.retrievedOn ?? ''));
        const assumed =
          rate.evidenceClass === 'ENGINEERING_ASSUMPTION' &&
          isStr(rate.assumptionId) &&
          assumptionIds.has(rate.assumptionId);
        if (!observed && !assumed) {
          out.push(`fxRates ${rate.from}->${rate.to}: missing rate provenance`);
        }
      }
      const foreign = arr(data.prices?.observations).filter(
        (o) => isStr(o.currency) && o.currency !== 'EUR',
      );
      const usedObsIds = new Set();
      for (const bom of [...arr(data.ebom?.boms), ...arr(data.mbom?.boms)]) {
        for (const line of arr(bom.lines)) {
          if (isStr(line.priceObservationId)) usedObsIds.add(line.priceObservationId);
        }
      }
      for (const obs of foreign) {
        if (!usedObsIds.has(obs.observationId)) continue;
        const covered = rates.some((r) => r.from === obs.currency && r.to === 'EUR');
        if (!covered)
          out.push(
            `${obs.observationId}: non-EUR observation used in a BOM without a EUR conversion rate`,
          );
      }
      return out;
    },
  },
  {
    id: 'V21',
    rule: 'Unknown manufacturing cost treated as zero rejected',
    run(data) {
      const out = [];
      for (const scenario of arr(data.costs?.scenarios)) {
        for (const line of arr(scenario.lines)) {
          if (
            line.status === 'UNKNOWN' &&
            line.amountEur !== null &&
            line.amountEur !== undefined
          ) {
            out.push(
              `${scenario.scenarioId}/${line.categoryId}: UNKNOWN cost carries a numeric value`,
            );
          }
          if (line.status === 'UNKNOWN' && line.amountEur === 0) {
            out.push(`${scenario.scenarioId}/${line.categoryId}: unknown cost represented as zero`);
          }
        }
        if (scenario.totalStatus === 'COMPLETE_TO_EVIDENCE' && scenario.totalEur === null) {
          out.push(`${scenario.scenarioId}: complete scenario without total`);
        }
        if (scenario.totalStatus === 'INCOMPLETE' && isNum(scenario.totalEur)) {
          out.push(`${scenario.scenarioId}: incomplete scenario carries a totalEur`);
        }
      }
      return out;
    },
  },
  {
    id: 'V22',
    rule: 'Complete cost claim omitting tooling rejected',
    run(data) {
      const out = [];
      for (const scenario of arr(data.costs?.scenarios)) {
        if (scenario.totalStatus !== 'COMPLETE_TO_EVIDENCE') continue;
        if (!isNum(scenario.toolingAmortizationEur)) {
          out.push(`${scenario.scenarioId}: complete cost claim without tooling amortisation`);
        }
        if (arr(scenario.missingCategories).length > 0) {
          out.push(`${scenario.scenarioId}: complete cost claim lists missing categories`);
        }
      }
      return out;
    },
  },
  {
    id: 'V23',
    rule: 'Certification cost presented as guaranteed price rejected',
    run(data) {
      const out = [];
      for (const item of arr(data.costs?.certificationCosts)) {
        if (item.guaranteed === true)
          out.push(`certificationCosts "${item.item}": presented as guaranteed`);
        if (!['BUDGETARY_INDICATION', 'UNKNOWN'].includes(item.status)) {
          out.push(`certificationCosts "${item.item}": invalid status "${item.status}"`);
        }
        if (!isStr(item.source)) out.push(`certificationCosts "${item.item}": missing source note`);
      }
      for (const { value, path } of collectFields(data, (k) =>
        /certification.*(guaranteed|fixed)/i.test(k),
      )) {
        if (value === true) out.push(`${path}: certification cost guaranteed`);
      }
      return out;
    },
  },
  {
    id: 'V24',
    rule: 'Unapproved retail price rejected',
    run(data) {
      const out = [];
      for (const { key, value, path } of collectFields(data, (k) =>
        ['retailPriceEur', 'salePriceEur', 'approvedPriceEur', 'msrpEur'].includes(k),
      )) {
        if (isNum(value)) out.push(`${path}: retail price ${value} presented without approval`);
      }
      for (const { value, path } of collectFields(data, (k) => k === 'priceApproved')) {
        if (value === true) out.push(`${path}: price approval claimed`);
      }
      for (const f of arr(data.family?.families)) {
        const cost = obj(f.preliminaryCost);
        if (cost.status === 'APPROVED')
          out.push(`family ${f.familyId}: preliminary cost marked APPROVED`);
      }
      return out;
    },
  },
  {
    id: 'V25',
    rule: 'Customer demand cited from MC-10 rejected',
    run(data) {
      const out = [];
      const negated = /\b(no|none|zero|not|never|blocked|unexecuted|without)\b/i;
      const texts = collectStrings(data, /MC-?10/i);
      for (const text of texts) {
        if (negated.test(text)) continue;
        if (/demand|willingness to pay|interview|validated|price signal/i.test(text)) {
          out.push(`MC-10 cited as demand evidence: "${text.slice(0, 90)}"`);
        }
      }
      for (const { key, value, path } of collectFields(data, (k) =>
        ['customerValidated', 'demandValidated', 'customerEvidenceClass'].includes(k),
      )) {
        if (value === true || value === 'VALIDATED' || value === 'MEASURED') {
          out.push(`${path}: customer evidence claimed`);
        }
      }
      return out;
    },
  },
  {
    id: 'V26',
    rule: 'Customer willingness to pay presented as validated rejected',
    run(data) {
      const out = [];
      for (const { key, value, path } of collectFields(data, (k) =>
        /willingnessToPay|wtp/i.test(k),
      )) {
        if (value === true || (isNum(value) && value > 0) || value === 'VALIDATED') {
          out.push(`${path}: willingness to pay presented as validated`);
        }
      }
      for (const f of arr(data.family?.families)) {
        if (f.customerRequirementUncertainty !== 'UNVALIDATED') {
          out.push(`family ${f.familyId}: customerRequirementUncertainty must be UNVALIDATED`);
        }
      }
      return out;
    },
  },
  {
    id: 'V27',
    rule: 'Compatibility marked TESTED without evidence rejected',
    run(data) {
      const out = [];
      for (const row of arr(data.compatibility?.rows)) {
        if (!COMPAT_STATUSES.has(row.status)) {
          out.push(`${row.rowId}: status "${row.status}" is not permitted without executed tests`);
        }
        if (row.deviceTestRecorded !== false) {
          out.push(`${row.rowId}: deviceTestRecorded must be false in MC-11`);
        }
      }
      return out;
    },
  },
  {
    id: 'V28',
    rule: 'Compatibility marked SUPPORTED without authorisation rejected',
    run(data) {
      const out = [];
      for (const { value, path } of collectFields(
        data,
        (k) => k === 'compatibilityStatus' || k === 'status',
      )) {
        if (value === 'SUPPORTED') out.push(`${path}: SUPPORTED is not authorised`);
      }
      for (const row of arr(data.compatibility?.rows)) {
        if (row.supportedByAuthorisation === true)
          out.push(`${row.rowId}: support authorisation claimed`);
      }
      return out;
    },
  },
  {
    id: 'V29',
    rule: 'NMEA certification claimed without evidence rejected',
    run(data) {
      const out = [];
      const nmea = obj(data.nmea);
      const prefix = (value, token) => isStr(value) && value.trim().toUpperCase().startsWith(token);
      if (nmea.nmea2000) {
        const bus = obj(nmea.nmea2000);
        if (!prefix(bus.productCertification, 'NOT_CERTIFIED')) {
          out.push(`nmea2000: productCertification "${bus.productCertification}"`);
        }
        if (!prefix(bus.membership, 'NOT_A_MEMBER') && !prefix(bus.membership, 'NOT_HELD')) {
          out.push(`nmea2000: membership "${bus.membership}"`);
        }
        if (!prefix(bus.logoUse, 'NOT_PERMITTED') && !prefix(bus.logoUse, 'PROHIBITED')) {
          out.push(`nmea2000: logoUse "${bus.logoUse}"`);
        }
        if (isNum(bus.testedCompatibilityRows) && bus.testedCompatibilityRows !== 0) {
          out.push('nmea2000: testedCompatibilityRows must be 0');
        }
      }
      if (nmea.nmea0183 && !prefix(obj(nmea.nmea0183).productCertification, 'NOT_CERTIFIED')) {
        out.push(`nmea0183: productCertification "${obj(nmea.nmea0183).productCertification}"`);
      }
      for (const { value, path } of collectFields(data, (k) => /nmea.*certif/i.test(k))) {
        if (value === true || value === 'CERTIFIED')
          out.push(`${path}: NMEA certification claimed`);
      }
      // Narrow free-text heuristic: only an affirmative subject-verb assertion counts, never a
      // quoted prohibited claim or a requirement statement.
      walk(data, '', (node, path) => {
        if (typeof node !== 'string') return;
        if (/prohibit|claimsProhibited|limitations|nonAssertions/i.test(path)) return;
        if (!/NMEA\s*2000/i.test(node)) return;
        if (
          /\b(not|no|never|without|prohibit|required|requires|must|shall|only after|until)\b/i.test(
            node,
          )
        ) {
          return;
        }
        if (
          /(MAREA|product|device|gateway|hub|watch|display)[^.]{0,40}\b(is|are|has been)\b[^.]{0,30}(certified|approved)/i.test(
            node,
          )
        ) {
          out.push(`text claims NMEA 2000 certification: "${node.slice(0, 90)}"`);
        }
      });
      return out;
    },
  },
  {
    id: 'V30',
    rule: 'CE certification claimed from compliant components rejected',
    run(data) {
      const out = [];
      for (const { key, value, path } of collectFields(data, (k) =>
        ['ceMarked', 'ceCompliant', 'declarationOfConformity', 'ceCertified', 'docIssued'].includes(
          k,
        ),
      )) {
        if (value === true) out.push(`${path}: CE/DoC claim made from component compliance`);
      }
      for (const { value, path } of collectFields(data, (k) => k === 'ceMarking')) {
        if (value !== 'PROHIBITED' && value !== 'NOT_ESTABLISHED' && value !== 'NOT_APPLIED') {
          out.push(`${path}: ceMarking "${value}"`);
        }
      }
      return out;
    },
  },
  {
    id: 'V31',
    rule: 'Applicable legislation without scope rationale rejected',
    run(data) {
      const out = [];
      const register = new Set(
        arr(data.conformity?.legislationRegister).map((l) => l.legislationId),
      );
      for (const product of arr(data.conformity?.products)) {
        for (const row of arr(product.applicable)) {
          const label = `${product.productId}/${row.legislationId}`;
          if (!register.has(row.legislationId)) out.push(`${label}: not in legislation register`);
          if (!isStr(row.rationale) || row.rationale.trim().length < 40) {
            out.push(`${label}: applicability without a written scope rationale`);
          }
          if (row.status === 'CERTIFIED' || row.status === 'CONFORMITY_EVIDENCE_ON_FILE') {
            out.push(`${label}: conformity claimed`);
          }
        }
      }
      return out;
    },
  },
  {
    id: 'V32',
    rule: 'Inapplicable legislation included without evaluation rejected',
    run(data) {
      const out = [];
      const register = new Set(
        arr(data.conformity?.legislationRegister).map((l) => l.legislationId),
      );
      for (const product of arr(data.conformity?.products)) {
        for (const row of arr(product.notApplicable)) {
          const label = `${product.productId}/${row.legislationId}`;
          if (!register.has(row.legislationId)) out.push(`${label}: not in legislation register`);
          if (!isStr(row.rationale) || row.rationale.trim().length < 40) {
            out.push(`${label}: non-applicability without a written evaluation`);
          }
        }
      }
      for (const legislation of arr(data.conformity?.legislationRegister)) {
        const used = arr(data.conformity?.products).some(
          (p) =>
            arr(p.applicable).some((r) => r.legislationId === legislation.legislationId) ||
            arr(p.notApplicable).some((r) => r.legislationId === legislation.legislationId),
        );
        if (!used)
          out.push(`${legislation.legislationId}: registered but never evaluated per product`);
      }
      return out;
    },
  },
  {
    id: 'V33',
    rule: 'Regulatory deadline without current source rejected',
    run(data) {
      const out = [];
      const evIds = new Set(evidenceIdsIn(data.evidence ?? {}));
      for (const legislation of arr(data.conformity?.legislationRegister)) {
        if (!isUrl(legislation.officialUrl))
          out.push(`${legislation.legislationId}: missing official URL`);
        for (const deadline of arr(legislation.keyDeadlines)) {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(String(deadline.date ?? ''))) {
            out.push(`${legislation.legislationId}: invalid deadline date "${deadline.date}"`);
          }
          if (!evIds.has(deadline.evidenceId)) {
            out.push(
              `${legislation.legislationId}: deadline "${deadline.description}" without resolvable source`,
            );
          }
        }
      }
      return out;
    },
  },
  {
    id: 'V34',
    rule: 'Compliance claimed from an unexecuted test plan rejected',
    run(data) {
      const out = [];
      for (const test of arr(data.qualification?.tests)) {
        if (test.status !== 'NOT_EXECUTED')
          out.push(`${test.testId}: status "${test.status}" — no test was executed`);
        const cost = obj(test.estimatedCost);
        if (cost.status === 'FORMAL_QUOTATION')
          out.push(`${test.testId}: test cost presented as a formal quotation`);
      }
      for (const { key, value, path } of collectFields(data, (k) => k === 'complianceStatus')) {
        if (
          value === 'COMPLIANT' ||
          value === 'CERTIFIED' ||
          value === 'CONFORMITY_EVIDENCE_ON_FILE'
        ) {
          out.push(`${path}: compliance claimed`);
        }
      }
      return out;
    },
  },
  {
    id: 'V35',
    rule: 'Environmental rating claimed without tests rejected',
    run(data) {
      const out = [];
      for (const { key, value, path } of collectFields(data, (k) =>
        ['ipRating', 'ingressProtection', 'environmentalRating', 'temperatureRating'].includes(k),
      )) {
        if (
          isStr(value) &&
          !/^(NOT_VERIFIED|NOT_ESTABLISHED|UNKNOWN|CANDIDATE_REQUIREMENT)$/.test(value)
        ) {
          out.push(`${path}: environmental rating "${value}" claimed without test evidence`);
        }
      }
      return out;
    },
  },
  {
    id: 'V36',
    rule: 'WATCH guaranteed alert delivery rejected',
    run(data) {
      const out = [];
      for (const text of collectStrings(data, /guarantee/i)) {
        if (/\b(not|no|never|without|prohibit|unsupported|not guaranteed)\b/i.test(text)) continue;
        if (/alert|notification|delivery|message/i.test(text)) {
          out.push(`guaranteed alert delivery claimed: "${text.slice(0, 90)}"`);
        }
      }
      for (const { key, value, path } of collectFields(data, (k) =>
        /alertDeliveryGuarantee/i.test(k),
      )) {
        if (value === true) out.push(`${path}: guaranteed alert delivery`);
      }
      return out;
    },
  },
  {
    id: 'V37',
    rule: 'PILOT safety gate weakened rejected',
    run(data) {
      const out = [];
      const invariants = obj(data.governance?.invariants);
      if (invariants.PILOT_SAFETY_GATE !== 'BLOCKED')
        out.push('governance: PILOT_SAFETY_GATE is not BLOCKED');
      for (const f of arr(data.family?.families)) {
        if (f.familyId === 'PILOT' && f.safetyClassification !== 'SAFETY_RELEVANT_BLOCKED') {
          out.push(`family PILOT: safetyClassification "${f.safetyClassification}"`);
        }
        if (f.familyId === 'PILOT' && isStr(f.safetyGate) && f.safetyGate !== 'BLOCKED') {
          out.push(`family PILOT: safetyGate "${f.safetyGate}"`);
        }
      }
      for (const b of arr(data.family?.bundles)) {
        if (
          arr(b.componentLines).some((l) => l.familyId === 'PILOT') &&
          b.safetyGate !== 'BLOCKED'
        ) {
          out.push(`bundle ${b.bundleId}: contains PILOT without a BLOCKED safety gate`);
        }
      }
      for (const { value, path } of collectFields(data, (k) => k === 'safetyGate')) {
        if (value === 'APPROVED' || value === 'OPEN') out.push(`${path}: safety gate "${value}"`);
      }
      return out;
    },
  },
  {
    id: 'V38',
    rule: 'AIS transmit capability added rejected',
    run(data) {
      const out = [];
      const invariants = obj(data.governance?.invariants);
      if (invariants.AIS_TRANSMISSION_OFFERED !== false)
        out.push('governance: AIS transmission offered');
      for (const { key, value, path } of collectFields(data, (k) =>
        ['aisTransmit', 'transmitCapability', 'transponderOffered', 'aisTransmission'].includes(k),
      )) {
        if (value === true || value === 'OFFERED')
          out.push(`${path}: AIS transmit capability added`);
      }
      for (const text of collectStrings(data, /AIS/i)) {
        if (/\b(no|not|never|without|prohibit|defer|out of scope)\b/i.test(text)) continue;
        if (/transmit|transponder/i.test(text)) {
          out.push(`AIS transmission implied: "${text.slice(0, 90)}"`);
        }
      }
      return out;
    },
  },
  {
    id: 'V39',
    rule: 'FLEET default hardware introduced rejected',
    run(data) {
      const out = [];
      const fleetBundle = arr(data.family?.bundles).find((b) => b.bundleId === 'FLEET');
      if (!fleetBundle) out.push('FLEET bundle missing');
      else {
        if (fleetBundle.hardwareIncludedByDefault !== false)
          out.push('FLEET: hardwareIncludedByDefault must be false');
        for (const line of arr(fleetBundle.componentLines)) {
          if (!isStr(line.familyId) || line.familyId === 'FLEET') continue;
          if (!Object.prototype.hasOwnProperty.call(CANONICAL_PRODUCTS, line.familyId)) continue;
          if (line.inclusion !== 'CONDITIONAL' && line.inclusion !== 'EXCLUDED') {
            out.push(`FLEET: hardware line ${line.familyId}/${line.editionId} included by default`);
          }
        }
      }
      if (obj(data.governance?.invariants).FLEET_DEFAULT_HARDWARE !== false) {
        out.push('governance: FLEET_DEFAULT_HARDWARE must be false');
      }
      return out;
    },
  },
  {
    id: 'V40',
    rule: 'SAIL or COMPLETE fixed turnkey price invented rejected',
    run(data) {
      const out = [];
      for (const b of arr(data.family?.bundles)) {
        if (NO_TURNKEY_PRICE_BUNDLES.includes(b.bundleId)) {
          if (b.fixedTurnkeyPrice !== false)
            out.push(`bundle ${b.bundleId}: fixedTurnkeyPrice must be false`);
          for (const { value, path } of collectFields(b, (k) =>
            /fixedPrice|turnkeyPrice/i.test(k),
          )) {
            if (isNum(value)) out.push(`${b.bundleId}${path}: fixed turnkey price invented`);
          }
        }
      }
      return out;
    },
  },
  {
    id: 'V41',
    rule: 'OPEN-MARINE source IP falsely cleared rejected',
    run(data) {
      const out = [];
      const invariants = obj(data.governance?.invariants);
      if (invariants.SOURCE_IP_CLEARANCE !== 'NOT_CLEARED')
        out.push('governance: SOURCE_IP_CLEARANCE must be NOT_CLEARED');
      for (const { key, value, path } of collectFields(data, (k) =>
        /sourceIpClearance|openMarineCleared/i.test(k),
      )) {
        if (value === 'CLEARED' || value === true)
          out.push(`${path}: OPEN-MARINE IP falsely cleared`);
      }
      return out;
    },
  },
  {
    id: 'V42',
    rule: 'Trademark falsely cleared rejected',
    run(data) {
      const out = [];
      const invariants = obj(data.governance?.invariants);
      if (invariants.TRADEMARK_LEGAL_CLEARANCE !== 'NOT_GRANTED') {
        out.push('governance: TRADEMARK_LEGAL_CLEARANCE must be NOT_GRANTED');
      }
      for (const { key, value, path } of collectFields(data, (k) =>
        /trademark.*(clear|grant)/i.test(k),
      )) {
        if (value === 'GRANTED' || value === 'CLEARED' || value === true)
          out.push(`${path}: trademark clearance claimed`);
      }
      return out;
    },
  },
  {
    id: 'V43',
    rule: 'Product for-sale status enabled rejected',
    run(data) {
      const out = [];
      const invariants = obj(data.governance?.invariants);
      if (invariants.COMMERCIAL_AVAILABILITY !== 'NOT_FOR_SALE') {
        out.push('governance: COMMERCIAL_AVAILABILITY must be NOT_FOR_SALE');
      }
      for (const { key, value, path } of collectFields(data, (k) =>
        ['availability', 'commercialAvailability'].includes(k),
      )) {
        if (value === 'FOR_SALE' || value === 'AVAILABLE' || value === 'PREORDER') {
          out.push(`${path}: for-sale status "${value}"`);
        }
      }
      const commercial = [...arr(data.family?.families), ...arr(data.family?.bundles)];
      for (const record of commercial) {
        const label = record.familyId ?? record.bundleId ?? 'record';
        for (const key of ['status', 'commercialStatus', 'availabilityState', 'lifecycleState']) {
          if (['FOR_SALE', 'PREORDER', 'AVAILABLE'].includes(record[key])) {
            out.push(`${label}.${key}: for-sale status "${record[key]}"`);
          }
        }
      }
      return out;
    },
  },
  {
    id: 'V44',
    rule: 'Public copy or checkout changed rejected',
    run(data) {
      const out = [];
      const invariants = obj(data.governance?.invariants);
      if (invariants.PUBLICATION_CHANGE !== 'NOT_AUTHORIZED') {
        out.push('governance: PUBLICATION_CHANGE must be NOT_AUTHORIZED');
      }
      for (const { key, value, path } of collectFields(data, (k) =>
        [
          'publicationChange',
          'checkoutChanged',
          'publicCopyChanged',
          'publicationApproved',
        ].includes(k),
      )) {
        if (value === true) out.push(`${path}: public copy/checkout change claimed`);
      }
      const hasRestriction = arr(data.governance?.restrictions).some((r) =>
        /public page|checkout|publication/i.test(r.statement ?? ''),
      );
      if (!hasRestriction) out.push('governance: missing public-copy/checkout restriction');
      return out;
    },
  },
  {
    id: 'V45',
    rule: 'Production deployment authorised rejected',
    run(data) {
      const out = [];
      const invariants = obj(data.governance?.invariants);
      if (invariants.PRODUCTION_DEPLOYMENT !== 'NOT_AUTHORIZED') {
        out.push('governance: PRODUCTION_DEPLOYMENT must be NOT_AUTHORIZED');
      }
      for (const gate of arr(data.decisions?.gates)) {
        if (gate.authorized === true) out.push(`gate ${gate.gateId}: authorised=true`);
      }
      for (const { key, value, path } of collectFields(data, (k) =>
        /productionDeployed|deployed/i.test(k),
      )) {
        if (value === true) out.push(`${path}: deployment claimed`);
      }
      return out;
    },
  },
  {
    id: 'V46',
    rule: 'Source-only engineering assumption reported as fact rejected',
    run(data) {
      const out = [];
      for (const assumption of arr(data.costs?.assumptions)) {
        if (
          assumption.evidenceClass === 'ENGINEERING_ASSUMPTION' &&
          assumption.presentedAsFact === true
        ) {
          out.push(`${assumption.assumptionId}: assumption presented as fact`);
        }
      }
      for (const bom of [...arr(data.ebom?.boms), ...arr(data.mbom?.boms)]) {
        for (const line of arr(bom.lines)) {
          if (
            line.priceEvidenceClass === 'ENGINEERING_ASSUMPTION' &&
            line.engineeringConfidence === 'PUBLIC_PRICE_OBSERVED'
          ) {
            out.push(`${line.lineId}: assumption labelled PUBLIC_PRICE_OBSERVED`);
          }
          if (
            line.priceEvidenceClass === 'CALCULATED_ESTIMATE' &&
            line.engineeringConfidence === 'MANUFACTURER_SPEC_VERIFIED'
          ) {
            out.push(`${line.lineId}: estimate labelled MANUFACTURER_SPEC_VERIFIED`);
          }
        }
      }
      for (const component of arr(data.components?.components)) {
        if (
          component.engineeringConfidence === 'PRODUCTION_APPROVED' ||
          component.confidence === 'SUPPLIER_QUOTED'
        ) {
          out.push(`${component.componentId}: evidence class not available in MC-11`);
        }
      }
      return out;
    },
  },
  {
    id: 'V47',
    rule: 'Totals computed from inconsistent quantities rejected',
    run(data) {
      const out = [];
      for (const bom of [...arr(data.ebom?.boms), ...arr(data.mbom?.boms)]) {
        const totals = obj(bom.totals);
        const computed = arr(bom.lines)
          .filter((l) => isNum(l.observedUnitPrice) && isInt(l.qtyPerUnit))
          .reduce((sum, l) => sum + l.observedUnitPrice * l.qtyPerUnit, 0);
        if (isNum(totals.knownLinesEur) && !near(totals.knownLinesEur, computed)) {
          out.push(
            `${bom.bomId}: knownLinesEur ${totals.knownLinesEur} != recomputed ${computed.toFixed(2)}`,
          );
        }
        if (isNum(totals.partialSubtotalEur) && !near(totals.partialSubtotalEur, computed)) {
          out.push(
            `${bom.bomId}: partialSubtotalEur does not match recomputed ${computed.toFixed(2)}`,
          );
        }
      }
      return out;
    },
  },
  {
    id: 'V48',
    rule: 'Missing second-source risk for critical single-source component rejected',
    run(data) {
      const out = [];
      const sourced = new Set();
      for (const risk of arr(data.risks?.risks)) {
        if (risk.domain === 'SOURCING') {
          for (const id of arr(risk.affectedComponentIds)) sourced.add(id);
        }
      }
      for (const c of arr(data.components?.components)) {
        if (c.criticality === 'CRITICAL') {
          if (!isStr(c.secondSourceStatus))
            out.push(`${c.componentId}: CRITICAL without secondSourceStatus`);
          if (c.secondSourceStatus === 'SINGLE_SOURCE' && !sourced.has(c.componentId)) {
            out.push(`${c.componentId}: CRITICAL single source without a recorded sourcing risk`);
          }
        }
      }
      return out;
    },
  },
  {
    id: 'V49',
    rule: 'Design recommendation represented as frozen engineering approval rejected',
    run(data) {
      const out = [];
      for (const option of arr(data.arch?.options)) {
        if (option.status !== 'PROPOSED_NOT_APPROVED') {
          out.push(
            `${option.architectureId}: status "${option.status}" is not PROPOSED_NOT_APPROVED`,
          );
        }
      }
      for (const rec of arr(data.arch?.recommendations)) {
        // True, or a non-empty statement of what remains unfrozen: both mean "not frozen".
        if (rec.explicitlyUnfrozen !== true && !isStr(rec.explicitlyUnfrozen)) {
          out.push(`recommendation ${rec.familyId}: not marked explicitly unfrozen`);
        }
      }
      for (const { key, value, path } of collectFields(data, (k) =>
        ['architectureApproved', 'designFrozen', 'hardwareFrozen', 'bomApproved'].includes(k),
      )) {
        if (value === true) out.push(`${path}: design presented as frozen/approved`);
      }
      return out;
    },
  },
  {
    id: 'V50',
    rule: 'Formal procurement declared complete with zero suppliers contacted rejected',
    run(data) {
      const out = [];
      const gov = obj(data.governance?.milestoneState);
      const invariants = obj(data.governance?.invariants);
      if (invariants.SUPPLIER_CONTACT !== 'NOT_CONTACTED')
        out.push('governance: supplier contact claimed');
      if (isNum(gov.suppliersContacted) && gov.suppliersContacted !== 0)
        out.push('governance: suppliersContacted > 0');
      if (isNum(gov.formalSupplierQuotations) && gov.formalSupplierQuotations > 0) {
        out.push('governance: formal quotations claimed');
      }
      if (['OBTAINED', 'COMPLETE', 'PASS'].includes(gov.formalProcurementEvidence)) {
        out.push('governance: formal procurement declared complete without quotations');
      }
      for (const { key, value, path } of collectFields(data, (k) =>
        /procurementComplete|quotationsObtained/i.test(k),
      )) {
        if (value === true) out.push(`${path}: formal procurement declared complete`);
      }
      return out;
    },
  },
  /* ------------------------------------------------ structural cross-file checks */
  {
    id: 'S01',
    rule: 'Structural: every evidence reference resolves in the evidence index',
    run(data) {
      const out = [];
      const ids = new Set(evidenceIdsIn(data.evidence ?? {}));
      if (ids.size === 0) out.push('evidence index is empty');
      for (const ref of evidenceIdsIn(data)) {
        if (!ids.has(ref))
          out.push(`evidence ${ref} referenced but not present in evidence-index.json`);
      }
      for (const record of arr(data.evidence?.evidence)) {
        if (!isUrl(record.url)) out.push(`${record.evidenceId}: invalid URL`);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(String(record.retrievedOn ?? ''))) {
          out.push(`${record.evidenceId}: missing/invalid retrievedOn`);
        }
        if (!EVIDENCE_TYPES.has(record.evidenceType)) {
          out.push(`${record.evidenceId}: invalid evidenceType "${record.evidenceType}"`);
        }
        if (!isStr(record.supportedAssertion))
          out.push(`${record.evidenceId}: empty supportedAssertion`);
        if (!isStr(record.claimId)) out.push(`${record.evidenceId}: missing claimId`);
      }
      const urls = arr(data.evidence?.evidence).map((e) => `${e.url}|${e.claimId}`);
      for (const d of dupes(urls)) out.push(`duplicate evidence record for ${d}`);
      return out;
    },
  },
  {
    id: 'S02',
    rule: 'Structural: canonical editions and cross-reference integrity',
    run(data) {
      const out = [];
      const compIds = new Set(arr(data.components?.components).map((c) => c.componentId));
      const supIds = new Set(arr(data.suppliers?.suppliers).map((s) => s.supplierId));
      const obsIds = new Set(arr(data.prices?.observations).map((o) => o.observationId));
      for (const f of arr(data.family?.families)) {
        const canonical = CANONICAL_PRODUCTS[f.familyId] ?? [];
        for (const edition of arr(f.editions)) {
          if (!canonical.includes(edition)) out.push(`${f.familyId}: unknown edition "${edition}"`);
        }
      }
      for (const obs of arr(data.prices?.observations)) {
        if (obs.supplierId && !supIds.has(obs.supplierId))
          out.push(`${obs.observationId}: supplier does not resolve`);
        if (obs.componentId && !compIds.has(obs.componentId))
          out.push(`${obs.observationId}: component does not resolve`);
      }
      for (const bom of [...arr(data.ebom?.boms), ...arr(data.mbom?.boms)]) {
        for (const line of arr(bom.lines)) {
          if (line.componentId && !compIds.has(line.componentId))
            out.push(`${line.lineId}: component does not resolve`);
          if (line.priceObservationId && !obsIds.has(line.priceObservationId)) {
            out.push(`${line.lineId}: price observation does not resolve`);
          }
          if (
            line.supplierRef &&
            !supIds.has(line.supplierRef) &&
            !line.supplierRef.startsWith('UNKNOWN')
          ) {
            out.push(`${line.lineId}: supplier does not resolve`);
          }
        }
      }
      for (const c of arr(data.components?.components)) {
        for (const s of arr(c.sourcingChannelSupplierIds)) {
          if (!supIds.has(s)) out.push(`${c.componentId}: sourcing channel ${s} does not resolve`);
        }
        for (const alt of arr(c.alternateComponentIds)) {
          if (!compIds.has(alt)) out.push(`${c.componentId}: alternate ${alt} does not resolve`);
        }
      }
      return out;
    },
  },
  {
    id: 'S03',
    rule: 'Structural: manifest lists every data file with an accurate record count',
    run(data) {
      const out = [];
      const listed = new Map(arr(data.manifest?.files).map((f) => [f.path, f]));
      const expected = Object.values(FILES).filter((f) => f !== 'manifest.json');
      for (const file of expected) {
        if (!listed.has(file)) out.push(`manifest does not list ${file}`);
      }
      const countMap = {
        'hardware-families.json': () => arr(data.family?.families).length,
        'architecture-options.json': () => arr(data.arch?.options).length,
        'component-register.json': () => arr(data.components?.components).length,
        'supplier-register.json': () => arr(data.suppliers?.suppliers).length,
        'price-observations.json': () => arr(data.prices?.observations).length,
        'engineering-bom.json': () => arr(data.ebom?.boms).length,
        'manufacturing-bom.json': () => arr(data.mbom?.boms).length,
        'cost-scenarios.json': () => arr(data.costs?.scenarios).length,
        'conformity-applicability.json': () => arr(data.conformity?.products).length,
        'qualification-plan.json': () => arr(data.qualification?.tests).length,
        'compatibility-requirements.json': () => arr(data.compatibility?.rows).length,
        'risks.json': () => arr(data.risks?.risks).length,
        'decisions.json': () => arr(data.decisions?.decisions).length,
        'governance-status.json': () => arr(data.governance?.restrictions).length,
        'review-findings.json': () => arr(data.review?.findings).length,
        'evidence-index.json': () => arr(data.evidence?.evidence).length,
      };
      for (const [file, entry] of listed) {
        const count = countMap[file];
        if (!count) continue;
        const actual = count();
        if (isNum(entry.recordCount) && entry.recordCount !== actual) {
          out.push(`manifest ${file}: recordCount ${entry.recordCount} != actual ${actual}`);
        }
      }
      if (arr(data.manifest?.deliverables).length < 30) {
        out.push('manifest deliverables: fewer than 30 MC-11 deliverables recorded');
      }
      return out;
    },
  },
  {
    id: 'S04',
    rule: 'Structural: architecture criteria weights frozen and scores complete',
    run(data) {
      const out = [];
      const weights = obj(data.arch?.criteriaWeights);
      const sum = Object.values(weights).reduce((a, b) => a + (isNum(b) ? b : 0), 0);
      if (sum !== 100) out.push(`criteriaWeights sum ${sum} != 100`);
      for (const [criterion, weight] of Object.entries(CRITERIA_WEIGHTS)) {
        if (weights[criterion] !== weight)
          out.push(`criteriaWeights.${criterion} must be the frozen ${weight}`);
      }
      for (const option of arr(data.arch?.options)) {
        for (const criterion of Object.keys(CRITERIA_WEIGHTS)) {
          const score = obj(option.scores)[criterion];
          if (!isInt(score) || score < 1 || score > 5) {
            out.push(`${option.architectureId}: score for ${criterion} must be an integer 1-5`);
          }
        }
        const totalWeight = Object.values(CRITERIA_WEIGHTS).reduce((a, b) => a + b, 0);
        const computed = isNum(option.weightedScore)
          ? Object.entries(CRITERIA_WEIGHTS).reduce(
              (sum2, [criterion, weight]) =>
                sum2 + (obj(option.scores)[criterion] ?? 0) * (weight / totalWeight),
              0,
            )
          : null;
        if (computed !== null && Math.abs(computed - option.weightedScore) > 0.02) {
          out.push(`${option.architectureId}: weightedScore does not match the frozen weights`);
        }
      }
      return out;
    },
  },
];

/* ------------------------------------------------------------------ runner */

export function validate(data) {
  const results = CHECKS.map((check) => {
    let violations;
    try {
      violations = check.run(data) ?? [];
    } catch (error) {
      violations = [`check crashed: ${error instanceof Error ? error.message : String(error)}`];
    }
    return { id: check.id, rule: check.rule, ok: violations.length === 0, violations };
  });
  return {
    ok: results.every((r) => r.ok),
    checks: results,
    failures: results.filter((r) => !r.ok).flatMap((r) => r.violations.map((v) => `${r.id}: ${v}`)),
  };
}

export function loadFromDisk() {
  const data = {};
  const missing = [];
  for (const [key, file] of Object.entries(FILES)) {
    const path = join(DATA_DIR, file);
    if (!existsSync(path)) {
      missing.push(file);
      data[key] = {};
      continue;
    }
    data[key] = JSON.parse(readFileSync(path, 'utf8'));
  }
  return { data, missing };
}

function main() {
  const jsonMode = process.argv.includes('--json');
  const { data, missing } = loadFromDisk();
  if (missing.length) {
    console.error(`MC-11 hardware validator: missing data files: ${missing.join(', ')}`);
    process.exitCode = 1;
    return;
  }
  const report = validate(data);
  if (jsonMode) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    for (const check of report.checks) {
      console.log(`${check.ok ? 'PASS' : 'FAIL'} ${check.id} — ${check.rule}`);
      for (const violation of check.violations) console.log(`      ${violation}`);
    }
    const passed = report.checks.filter((c) => c.ok).length;
    console.log('');
    console.log(`MC-11 hardware evidence: ${passed}/${report.checks.length} checks passed`);
    if (!report.ok) console.log(`FAILURES: ${report.failures.length}`);
  }
  if (!report.ok) process.exitCode = 1;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  main();
}
