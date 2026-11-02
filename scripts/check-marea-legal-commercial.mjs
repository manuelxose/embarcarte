#!/usr/bin/env node
/**
 * MC-14 legal/commercial governance validator.
 *
 * Authority: `docs/marea/legal-commercial/MC14-MACHINE-READABLE-CONTRACTS.md`.
 * Deterministic, read-only and dependency-free. It verifies machine-checkable
 * conditions only; it does not prove legal compliance, does not contact any
 * network service and never writes, repairs or migrates a dataset.
 *
 * Usage:
 *   node scripts/check-marea-legal-commercial.mjs
 *   node scripts/check-marea-legal-commercial.mjs --json
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const HERE = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = resolve(HERE, '..');
export const PACKAGE_DIR = join(REPO_ROOT, 'docs', 'marea', 'legal-commercial');
export const DATA_DIR = join(PACKAGE_DIR, 'data');

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const AS_OF = '2026-11-02';
const PRODUCT_IDS = ['NAV', 'HUB', 'AIS', 'PILOT', 'SENSE', 'WATCH', 'DISPLAY', 'WEATHER', 'FLEET'];
const BUNDLE_IDS = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'];
const INSTRUMENT_IDS = [
  'EMC',
  'RED',
  'LVD',
  'GPSR',
  'CRA',
  'ROHS',
  'WEEE',
  'BATTERIES',
  'RCD',
  'MED',
  'PLD',
  'CONSUMER_COMMERCIAL',
  'RADIO_SPECTRUM',
  'DATA_PROTECTION',
];
const APPLICABILITY_STATUSES = [
  'APPLICABLE',
  'CONDITIONALLY_APPLICABLE',
  'NOT_APPLICABLE_WITH_REASON',
  'UNDETERMINED',
];
const RISK_SEVERITIES = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
const RISK_STATUSES = [
  'OPEN',
  'BLOCKED',
  'LEGAL_REVIEW_REQUIRED',
  'EVIDENCE_REQUIRED',
  'NOT_APPLICABLE',
  'CLOSED_VERIFIED',
];
const COMPLIANCE_STATUSES = [
  'NOT_ASSESSED',
  'UNDETERMINED',
  'NON_COMPLIANT_UNVERIFIED',
  'PARTIAL_UNVERIFIED',
  'COMPLIANT_VERIFIED',
];
const CLAIM_CLASSES = ['A', 'C', 'P', 'X'];
const CLAIM_STATUSES = [
  'INTERNAL_ONLY',
  'PUBLIC_PROHIBITED',
  'PUBLIC_CONDITIONAL',
  'PUBLIC_AUTHORIZED',
];
const EDITIOM_IDS = [
  'NAV-ESSENTIAL',
  'NAV-PRO',
  'HUB-STANDARD',
  'HUB-PRO',
  'AIS-RECEIVER',
  'AIS-CONNECTED',
  'PILOT-COASTAL',
  'PILOT-SAIL',
  'PILOT-PRO',
  'SENSE-WIND',
  'SENSE-POWER',
  'SENSE-BILGE',
  'SENSE-TANKS',
  'SENSE-ENV',
  'SENSE-ESSENTIALS',
  'SENSE-SAIL',
  'SENSE-SYSTEMS',
  'WATCH-CORE',
  'WATCH-PLUS',
  'DISPLAY-7',
  'DISPLAY-LARGE-CONDITIONAL',
  'WEATHER-STANDARD',
  'WEATHER-PRO',
  'FLEET-START',
  'FLEET-BUSINESS',
  'FLEET-ENTERPRISE',
];
const FINANCIAL_DEP_IDS = Array.from(
  { length: 10 },
  (_, i) => `MC14-DEP-${String(i + 1).padStart(2, '0')}`,
);
const FROZEN_FLAGS = {
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
  CE_MARKING_CLAIM: 'PROHIBITED',
  NMEA2000_CERTIFIED: false,
  TESTED_COMPATIBILITY_ROWS: 0,
  PRODUCTION_DEPLOYMENT: 'NOT_AUTHORIZED',
  MAREA_PUBLIC_USE: 'NO_GO',
};

export const DATA_FILES = [
  'manifest.json',
  'legal-sources.json',
  'regulatory-applicability.json',
  'economic-operator-roles.json',
  'risk-register.json',
  'predecessor-blocker-mapping.json',
  'consumer-rights.json',
  'privacy-obligations.json',
  'cybersecurity-obligations.json',
  'licensing-rights.json',
  'liability-insurance.json',
  'claims-policy.json',
  'bilingual-claims.json',
  'website-findings.json',
  'release-evidence-gates.json',
  'external-decisions.json',
  'mc15-handoff-inputs.json',
  'review-findings.json',
];

export const DOC_FILES = [
  'MC-14-BASELINE-AND-GOVERNANCE.md',
  'MC14-PRIMARY-LEGAL-SOURCE-REGISTER.md',
  'MC14-REGULATORY-APPLICABILITY-MATRIX.md',
  'MC14-ECONOMIC-OPERATOR-RESPONSIBILITIES.md',
  'MC14-LEGAL-COMMERCIAL-RISK-REGISTER.md',
  'MC14-IP-TRADEMARK-AND-LICENSING-RISKS.md',
  'MC14-MARINE-HARDWARE-CONFORMITY-GATES.md',
  'MC14-CONSUMER-RIGHTS-WARRANTY-RETURNS.md',
  'MC14-PRIVACY-AND-TELEMETRY-DATA-GOVERNANCE.md',
  'MC14-CRA-CYBERSECURITY-OBLIGATIONS.md',
  'MC14-PAYMENTS-TAX-AND-COMMERCIAL-CONTRACTS.md',
  'MC14-PRODUCT-LIABILITY-AND-INSURANCE.md',
  'MC14-COMMERCIAL-CLAIMS-POLICY.md',
  'MC14-BILINGUAL-CLAIMS-CATALOGUE.md',
  'MC14-WEBSITE-AND-COMMERCE-COMPLIANCE-INVENTORY.md',
  'MC14-LEGAL-RELEASE-EVIDENCE-GATES.md',
  'MC14-REQUIRED-EXTERNAL-DECISIONS.md',
  'MC14-MC15-HANDOFF.md',
  'MC14-MACHINE-READABLE-CONTRACTS.md',
  'MC14-VALIDATION-AND-ADVERSARIAL-TESTING.md',
  'MC14-EXECUTIVE-REPORT-ES.md',
  'MC-14-DELIVERY.md',
];

export function loadData(dataDir = DATA_DIR) {
  const data = {};
  for (const f of DATA_FILES) {
    const p = join(dataDir, f);
    data[f] = existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
  }
  return data;
}

export function loadPackage(packageDir = PACKAGE_DIR) {
  const data = loadData(join(packageDir, 'data'));
  const docs = {};
  for (const f of DOC_FILES) {
    const p = join(packageDir, f);
    docs[f] = existsSync(p) ? readFileSync(p, 'utf8') : null;
  }
  docs['review/MC-14-REVIEW.md'] = existsSync(join(packageDir, 'review/MC-14-REVIEW.md'))
    ? readFileSync(join(packageDir, 'review/MC-14-REVIEW.md'), 'utf8')
    : null;
  docs['research/MC14-LEGAL-RESEARCH-DOSSIER.md'] = existsSync(
    join(packageDir, 'research/MC14-LEGAL-RESEARCH-DOSSIER.md'),
  )
    ? readFileSync(join(packageDir, 'research/MC14-LEGAL-RESEARCH-DOSSIER.md'), 'utf8')
    : null;
  docs['research/mc14-legal-sources.csv'] = existsSync(
    join(packageDir, 'research/mc14-legal-sources.csv'),
  )
    ? readFileSync(join(packageDir, 'research/mc14-legal-sources.csv'), 'utf8')
    : null;
  return { data, docs };
}

const arr = (x) => (Array.isArray(x) ? x : []);
const has = (obj, k) => obj && Object.prototype.hasOwnProperty.call(obj, k);
const nonEmptyString = (x) => typeof x === 'string' && x.trim().length > 0;
const allStrings = (x) => Array.isArray(x) && x.length > 0 && x.every(nonEmptyString);

export function validateData(data, docs = {}) {
  const checks = [];
  const add = (id, description, fn) => {
    let ok = false;
    let detail = '';
    try {
      const r = fn();
      ok = r === true || (r && r.ok === true);
      detail = r && r.detail ? String(r.detail) : '';
    } catch (err) {
      ok = false;
      detail = `exception: ${err.message}`;
    }
    checks.push({ id, description, ok, detail });
  };

  const manifest = data['manifest.json'];
  const sources = arr(data['legal-sources.json']?.sources);
  const requirements = arr(data['legal-sources.json']?.requirements);
  const applicability = data['regulatory-applicability.json'];
  const operators = data['economic-operator-roles.json'];
  const risks = arr(data['risk-register.json']?.risks);
  const mapping = data['predecessor-blocker-mapping.json'];
  const consumer = data['consumer-rights.json'];
  const privacy = data['privacy-obligations.json'];
  const cyber = data['cybersecurity-obligations.json'];
  const licensing = data['licensing-rights.json'];
  const liability = data['liability-insurance.json'];
  const claimsPolicy = data['claims-policy.json'];
  const claims = arr(data['bilingual-claims.json']?.claims);
  const website = data['website-findings.json'];
  const gatesData = data['release-evidence-gates.json'];
  const decisions = arr(data['external-decisions.json']?.decisions);
  const mc15 = data['mc15-handoff-inputs.json'];
  const review = data['review-findings.json'];

  const sourceIds = new Set(sources.map((s) => s.sourceId));
  const requirementIds = new Set(requirements.map((r) => r.requirementId));
  const riskIds = new Set(risks.map((r) => r.riskId));
  const gateIds = new Set(arr(gatesData?.gates).map((g) => g.gateId));
  const decisionIds = new Set(decisions.map((d) => d.decisionId));
  const roleIds = new Set(arr(operators?.roleDefinitions).map((r) => r.roleId));
  const skuIds = new Set(EDITIOM_IDS);
  const refsToRisks = [];
  const refsToSources = [];

  // 01 — required data files present and parse
  add('MC14-001', 'All required machine-readable files exist and parse', () => {
    const missing = DATA_FILES.filter((f) => !data[f]);
    return { ok: missing.length === 0, detail: missing.join(', ') };
  });

  // 02 — required documents present (review, report and delivery record are record-commit artefacts)
  add('MC14-002', 'All required MC-14 documents exist', () => {
    const pendingReview = manifest?.review?.status === 'PENDING';
    const recordOnly = [
      'MC14-EXECUTIVE-REPORT-ES.md',
      'MC-14-DELIVERY.md',
      'review/MC-14-REVIEW.md',
    ];
    const required = DOC_FILES.filter((f) => !(pendingReview && recordOnly.includes(f)));
    const missing = required.filter((f) => !docs[f] || docs[f].trim().length < 400);
    if (!pendingReview && !docs['review/MC-14-REVIEW.md']) missing.push('review/MC-14-REVIEW.md');
    return { ok: missing.length === 0, detail: missing.join(', ') };
  });

  // 03 — nine canonical product families
  add('MC14-003', 'Exactly nine canonical product families', () => {
    const ids = arr(applicability?.productFamilies).map((p) => p.productFamilyId);
    const same =
      ids.length === 9 && PRODUCT_IDS.every((p) => ids.includes(p)) && new Set(ids).size === 9;
    return { ok: same, detail: ids.join(',') };
  });

  // 04 — six canonical bundles
  add('MC14-004', 'Exactly six canonical bundles', () => {
    const ids = arr(applicability?.bundleAssessments).map((b) => b.bundleId);
    const same =
      ids.length === 6 && BUNDLE_IDS.every((b) => ids.includes(b)) && new Set(ids).size === 6;
    return { ok: same, detail: ids.join(',') };
  });

  // 05 — source identifiers resolve everywhere
  add('MC14-005', 'Every source identifier reference resolves', () => {
    for (const r of risks) refsToSources.push(...arr(r.legalSourceIds));
    for (const r of requirements) refsToSources.push(...arr(r.legalSourceIds));
    for (const p of arr(applicability?.productFamilies))
      for (const a of arr(p.assessments)) refsToSources.push(...arr(a.legalSourceIds));
    for (const b of arr(applicability?.bundleAssessments))
      for (const a of arr(b.assessments)) refsToSources.push(...arr(a.legalSourceIds));
    for (const c of arr(consumer?.obligations)) refsToSources.push(...arr(c.legalSourceIds));
    for (const c of claims) refsToSources.push(...arr(c.legalSourceIds));
    for (const f of arr(website?.findings)) refsToSources.push(...arr(f.legalSourceIds));
    for (const d of decisions) refsToSources.push(...arr(d.legalSourceIds));
    for (const c of arr(consumer?.templates)) refsToSources.push(...arr(c.legalBasis));
    const bad = [...new Set(refsToSources.filter((s) => !sourceIds.has(s)))];
    return { ok: bad.length === 0, detail: bad.join(', ') };
  });

  // 06 — every legal requirement has a source and a retrieval date
  add('MC14-006', 'Every legal requirement cites a source with a retrieval date', () => {
    const bad = requirements.filter((r) => {
      if (!allStrings(r.legalSourceIds)) return true;
      const src = r.legalSourceIds
        .map((id) => sources.find((s) => s.sourceId === id))
        .filter(Boolean);
      if (src.length !== r.legalSourceIds.length) return true;
      return !src.every(
        (s) =>
          nonEmptyString(s.retrievedOn) &&
          (ISO_DATE.test(s.retrievedOn) || s.retrievedOn === AS_OF),
      );
    });
    return { ok: bad.length === 0, detail: bad.map((r) => r.requirementId).join(', ') };
  });

  // 07 — every risk has an accountable owner and an owner role
  add('MC14-007', 'Every risk has a non-empty owner role', () => {
    const bad = risks.filter((r) => !nonEmptyString(r.ownerRole));
    return { ok: bad.length === 0, detail: bad.map((r) => r.riskId).join(', ') };
  });

  // 08 — every blocking/critical risk enumerates required evidence
  add('MC14-008', 'Every blocking or critical risk enumerates required evidence', () => {
    const bad = risks.filter(
      (r) =>
        (r.severity === 'CRITICAL' || r.currentStatus === 'BLOCKED') &&
        !allStrings(r.requiredEvidence),
    );
    return { ok: bad.length === 0, detail: bad.map((r) => r.riskId).join(', ') };
  });

  // 09 — every product has an applicability assessment for all 14 instruments
  add('MC14-009', 'Every product family has all 14 applicability assessments', () => {
    const bad = [];
    for (const p of arr(applicability?.productFamilies)) {
      const ids = arr(p.assessments).map((a) => a.instrumentId);
      if (ids.length !== 14 || INSTRUMENT_IDS.some((i) => !ids.includes(i)))
        bad.push(p.productFamilyId);
    }
    return { ok: bad.length === 0, detail: bad.join(', ') };
  });

  // 10 — no unreasoned NOT_APPLICABLE
  add('MC14-010', 'Every NOT_APPLICABLE result has a cited rationale', () => {
    const bad = [];
    for (const p of arr(applicability?.productFamilies))
      for (const a of arr(p.assessments))
        if (
          a.status === 'NOT_APPLICABLE_WITH_REASON' &&
          (!nonEmptyString(a.rationale) || a.rationale.length < 30 || !allStrings(a.legalSourceIds))
        )
          bad.push(`${p.productFamilyId}/${a.instrumentId}`);
    for (const b of arr(applicability?.bundleAssessments))
      for (const a of arr(b.assessments))
        if (
          a.status === 'NOT_APPLICABLE_WITH_REASON' &&
          (!nonEmptyString(a.rationale) || a.rationale.length < 30)
        )
          bad.push(`${b.bundleId}/${a.instrumentId}`);
    return { ok: bad.length === 0, detail: bad.join(', ') };
  });

  // 11 — every conditional applicability has a condition
  add('MC14-011', 'Every CONDITIONALLY_APPLICABLE result states its condition', () => {
    const bad = [];
    for (const p of arr(applicability?.productFamilies))
      for (const a of arr(p.assessments))
        if (a.status === 'CONDITIONALLY_APPLICABLE' && !nonEmptyString(a.condition))
          bad.push(`${p.productFamilyId}/${a.instrumentId}`);
    for (const b of arr(applicability?.bundleAssessments))
      for (const a of arr(b.assessments))
        if (a.status === 'CONDITIONALLY_APPLICABLE' && !nonEmptyString(a.condition))
          bad.push(`${b.bundleId}/${a.instrumentId}`);
    return { ok: bad.length === 0, detail: bad.join(', ') };
  });

  // 12 — applicability enums valid and bundles complete
  add('MC14-012', 'Applicability statuses and bundle coverage are valid', () => {
    const bad = [];
    for (const p of arr(applicability?.productFamilies))
      for (const a of arr(p.assessments))
        if (!APPLICABILITY_STATUSES.includes(a.status))
          bad.push(`${p.productFamilyId}/${a.instrumentId}:${a.status}`);
    for (const b of arr(applicability?.bundleAssessments)) {
      const ids = arr(b.assessments).map((a) => a.instrumentId);
      if (ids.length !== 14 || INSTRUMENT_IDS.some((i) => !ids.includes(i)))
        bad.push(`${b.bundleId}:coverage`);
    }
    return { ok: bad.length === 0, detail: bad.join(', ') };
  });

  // 13 — every claim has a publication status
  add('MC14-013', 'Every claim has a valid class and publication status', () => {
    const bad = claims.filter(
      (c) => !CLAIM_CLASSES.includes(c.claimClass) || !CLAIM_STATUSES.includes(c.publicationStatus),
    );
    return { ok: bad.length === 0, detail: bad.map((c) => c.claimId).join(', ') };
  });

  // 14 — prohibited claims are blocked
  add('MC14-014', 'No P/X claim is PUBLIC_AUTHORIZED or PUBLIC_CONDITIONAL', () => {
    const bad = claims.filter(
      (c) =>
        ['P', 'X'].includes(c.claimClass) &&
        ['PUBLIC_AUTHORIZED', 'PUBLIC_CONDITIONAL'].includes(c.publicationStatus),
    );
    return { ok: bad.length === 0, detail: bad.map((c) => c.claimId).join(', ') };
  });

  // 15 — bilingual claims are semantically paired
  add('MC14-015', 'Every claim has ES/EN pairs with matching numeric tokens', () => {
    const bad = [];
    for (const c of claims) {
      const es = c.pairs?.es;
      const en = c.pairs?.en;
      if (!nonEmptyString(es) || !nonEmptyString(en)) {
        bad.push(`${c.claimId}:missing-pair`);
        continue;
      }
      const nums = (s) =>
        (s.match(/\d+(?:[.,]\d+)?/g) || []).map((n) => n.replace(',', '.')).sort();
      const a = nums(es).join('|');
      const b = nums(en).join('|');
      if (a !== b) bad.push(`${c.claimId}:numbers`);
      if (c.semanticChecks?.numbersConsistent !== true) bad.push(`${c.claimId}:flag`);
    }
    return { ok: bad.length === 0, detail: bad.join(', ') };
  });

  // 16 — publication approval requires evidence
  add('MC14-016', 'No claim is PUBLIC_AUTHORIZED without evidence', () => {
    const bad = claims.filter(
      (c) => c.publicationStatus === 'PUBLIC_AUTHORIZED' && !allStrings(c.evidencePresent),
    );
    return { ok: bad.length === 0, detail: bad.map((c) => c.claimId).join(', ') };
  });

  // 17 — publication authorization is NONE
  add('MC14-017', 'MC-14 publication authorization remains NONE', () => {
    const authorized = claims.filter((c) => c.publicationStatus === 'PUBLIC_AUTHORIZED');
    const none =
      claimsPolicy?.summary?.publicationAuthorization === 'NONE' &&
      claimsPolicy?.internalVsPublic?.publicationAuthorized === false &&
      manifest?.statusBlock?.MC14_COMMERCIAL_CLAIMS_PUBLICATION === 'NOT_AUTHORIZED' &&
      manifest?.publicationAuthorized === false &&
      authorized.length === 0;
    return { ok: none, detail: authorized.map((c) => c.claimId).join(', ') };
  });

  // 18 — frozen flags preserved
  add('MC14-018', 'All frozen hard restrictions preserve their exact values', () => {
    const bad = [];
    const flags = manifest?.frozenFlags || {};
    for (const [k, v] of Object.entries(FROZEN_FLAGS)) {
      if (JSON.stringify(flags[k]) !== JSON.stringify(v))
        bad.push(`${k}=${JSON.stringify(flags[k])}`);
    }
    return { ok: bad.length === 0, detail: bad.join(', ') };
  });

  // 19 — trademark status
  add('MC14-019', 'Trademark legal clearance remains NOT_GRANTED and public use NO_GO', () => {
    const ok =
      claimsPolicy?.brandState?.trademarkLegalClearance === 'NOT_GRANTED' &&
      claimsPolicy?.brandState?.mareaPublicUse === 'NO_GO' &&
      licensing?.summary?.trademarkCleared === false &&
      !claims.some((c) => c.publicationStatus === 'PUBLIC_AUTHORIZED');
    return { ok, detail: '' };
  });

  // 20 — source IP status
  add('MC14-020', 'Source IP remains NOT_CLEARED and no licence is invented', () => {
    const ok =
      licensing?.summary?.sourceIpCleared === false &&
      licensing?.summary?.rightsGranted === 0 &&
      arr(licensing?.rights).every(
        (r) => r.rightsStatus === 'NOT_GRANTED' && r.contractStatus === 'NONE',
      );
    return { ok, detail: '' };
  });

  // 21 — no certification fabricated
  add('MC14-021', 'No release document or gate is certified, signed, approved or closed', () => {
    const badDocs = arr(gatesData?.documents).filter((d) =>
      ['EXECUTED', 'SIGNED', 'CERTIFIED', 'APPROVED'].includes(d.status),
    );
    const badGates = arr(gatesData?.gates).filter((g) => g.status === 'CLOSED_VERIFIED');
    const ok =
      badDocs.length === 0 &&
      badGates.length === 0 &&
      licensing?.summary?.nmeaCertified === false &&
      licensing?.summary?.chartRightsGranted === false &&
      licensing?.summary?.weatherRightsGranted === false;
    return {
      ok,
      detail: [...badDocs.map((d) => d.documentId), ...badGates.map((g) => g.gateId)].join(', '),
    };
  });

  // 22 — PILOT safety gate
  add('MC14-022', 'PILOT remains safety-blocked and cannot be advertised as available', () => {
    const prd = risks.find((r) => r.riskId === 'PRD-01');
    const ok =
      manifest?.frozenFlags?.PILOT_SAFETY_GATE === 'BLOCKED' &&
      prd?.currentStatus === 'BLOCKED' &&
      !claims.some(
        (c) => c.productFamilyId === 'PILOT' && c.publicationStatus === 'PUBLIC_AUTHORIZED',
      );
    return { ok, detail: '' };
  });

  // 23 — AIS receive-only
  add('MC14-023', 'AIS remains receive-only and no transmission offer is authorised', () => {
    const bad = claims.filter(
      (c) =>
        c.publicationStatus === 'PUBLIC_AUTHORIZED' &&
        /transmi|transmit/i.test(`${c.pairs?.es} ${c.pairs?.en}`),
    );
    const ok = manifest?.frozenFlags?.AIS_TRANSMISSION_OFFERED === false && bad.length === 0;
    return { ok, detail: bad.map((c) => c.claimId).join(', ') };
  });

  // 24 — FLEET has no default hardware
  add('MC14-024', 'FLEET has no default hardware and no vessel-control path claim', () => {
    const ok = manifest?.frozenFlags?.FLEET_DEFAULT_HARDWARE === false;
    const bad = claims.filter(
      (c) => c.claimId === 'CLM-037' && c.publicationStatus !== 'PUBLIC_PROHIBITED',
    );
    return { ok: ok && bad.length === 0, detail: bad.map((c) => c.claimId).join(', ') };
  });

  // 25 — no unapproved price becomes publishable
  add('MC14-025', 'No price claim is authorised while PRICE_APPROVED is NONE', () => {
    const priceClaims = claims.filter(
      (c) =>
        ['CLM-007'].includes(c.claimId) ||
        /€|EUR|\bprecio\b|\bprice\b/i.test(`${c.pairs?.es} ${c.pairs?.en}`),
    );
    const bad = priceClaims.filter((c) => c.publicationStatus === 'PUBLIC_AUTHORIZED');
    const ok = manifest?.frozenFlags?.PRICE_APPROVED === 'NONE' && bad.length === 0;
    return { ok, detail: bad.map((c) => c.claimId).join(', ') };
  });

  // 26 — no financial scenario becomes a profitability claim
  add('MC14-026', 'No financial/profitability claim is authorised', () => {
    const financialRisk = new Set(['CLM-05']);
    const bad = claims.filter(
      (c) =>
        c.publicationStatus === 'PUBLIC_AUTHORIZED' &&
        arr(c.riskIds).some((r) => financialRisk.has(r)),
    );
    const cats = arr(claimsPolicy?.mandatoryProhibitedClaimCategories).map((c) => c.category);
    const covered = [
      'COMMERCIAL_PROFITABILITY',
      'BREAK_EVEN',
      'INVESTMENT_RETURNS',
      'FINANCING_COMMITMENTS',
    ].every((x) => cats.includes(x));
    return { ok: bad.length === 0 && covered, detail: bad.map((c) => c.claimId).join(', ') };
  });

  // 27 — no insurance assumed
  add('MC14-027', 'No insurance policy, premium or coverage is assumed', () => {
    const s = liability?.insuranceStatus || {};
    const ok =
      s.productLiabilityPolicy === 'NONE' &&
      s.premium === 'UNKNOWN' &&
      s.brokerContacted === false &&
      s.limits === 'UNKNOWN' &&
      claims
        .filter((c) => c.claimId === 'CLM-025')
        .every((c) => c.publicationStatus === 'PUBLIC_PROHIBITED');
    return { ok, detail: '' };
  });

  // 28 — consumer rights not replaced
  add('MC14-028', 'Consumer rights are not replaced by discretionary warranty terms', () => {
    const k = consumer?.keyFacts || {};
    const ok =
      k.legalGuaranteeYearsSpain === 3 &&
      k.presumptionOfNonConformityMonths === 24 &&
      k.withdrawalDays === 14 &&
      k.commercialWarrantyReplacesLegalGuarantee === false &&
      k.returnsAllowanceStatus === 'ILLUSTRATIVE_ASSUMPTION_NOT_MEASURED' &&
      arr(consumer?.obligations).some((o) => o.obligationId === 'CONS-OB-04');
    return { ok, detail: '' };
  });

  // 29 — unknown amounts remain unknown
  add('MC14-029', 'Unknown amounts stay unknown in the MC-13 handoff consumption', () => {
    const deps = arr(mapping?.mc13HandoffConsumption);
    const get = (id) => deps.find((d) => d.dependencyId === id);
    const ok =
      deps.length === 10 &&
      FINANCIAL_DEP_IDS.every((id) => !!get(id)) &&
      get('MC14-DEP-02')?.amountStatus === 'UNKNOWN' &&
      get('MC14-DEP-02')?.amountEur === null &&
      get('MC14-DEP-05')?.amountStatus === 'PARTIALLY_MODELLED_UNKNOWN' &&
      get('MC14-DEP-05')?.amountEur === null &&
      get('MC14-DEP-09')?.amountStatus === 'UNKNOWN' &&
      get('MC14-DEP-09')?.amountEur === null &&
      liability?.insuranceStatus?.premium === 'UNKNOWN' &&
      cyber?.costStatus?.supportPeriodEngineeringCost === 'UNKNOWN';
    return { ok, detail: '' };
  });

  // 30 — all MC-13 handoff dependencies consumed
  add('MC14-030', 'All ten MC-13 handoff dependencies are consumed', () => {
    const ids = arr(mapping?.mc13HandoffConsumption).map((d) => d.dependencyId);
    return {
      ok: ids.length === 10 && FINANCIAL_DEP_IDS.every((id) => ids.includes(id)),
      detail: ids.join(','),
    };
  });

  // 31 — all MC-02 L/D/H/X blockers mapped
  add('MC14-031', 'All MC-02 L/D/H/X blockers are mapped', () => {
    const counts = { L: 0, D: 0, H: 0, X: 0 };
    for (const m of arr(mapping?.mappings)) {
      if (m.register === 'MC-02' && counts[m.inheritedId[0]] !== undefined)
        counts[m.inheritedId[0]]++;
    }
    const ok = counts.L === 9 && counts.D === 10 && counts.H === 13 && counts.X === 7;
    return { ok, detail: JSON.stringify(counts) };
  });

  // 32 — predecessor registers mapped without status change
  add('MC14-032', 'All inherited registers are mapped and none is closed or deleted', () => {
    const counts = {};
    for (const m of arr(mapping?.mappings)) counts[m.register] = (counts[m.register] || 0) + 1;
    const sum = mapping?.summary || {};
    const ok =
      counts['MC-02'] === 58 &&
      counts['MC-11'] === 39 &&
      counts['MC-12'] === 23 &&
      counts['MC-13'] === 14 &&
      sum.closedByMc14 === 0 &&
      sum.deletions === 0 &&
      sum.statusChanges === 0 &&
      sum.totalMapped === 134;
    return { ok, detail: JSON.stringify(counts) };
  });

  // 33 — brand-claims conflict documented
  add(
    'MC14-033',
    'The inherited brand-claims conflict is documented with the stricter rule',
    () => {
      const c = claimsPolicy?.brandState?.inheritedPolicyConflict;
      const ok =
        c?.conflictId === 'MC14-BRAND-CONFLICT-01' &&
        /MC-03/.test(c?.sourceDocument || '') &&
        nonEmptyString(c?.resolution) &&
        risks.some((r) => r.riskId === 'IPR-14') &&
        risks.some((r) => r.riskId === 'CLM-01');
      return { ok, detail: '' };
    },
  );

  // 34 — predecessor verdicts unchanged
  add('MC14-034', 'Predecessor verdicts are preserved unchanged', () => {
    const s = manifest?.statusBlock || {};
    const ok =
      s.MC13_VERDICT === 'PARTIAL' &&
      s.MC13_INTERNAL_FINANCIAL_SCOPE === 'PASS_INTERNAL_FINANCIAL_SCOPE' &&
      s.MC13_EXTERNAL_COMMERCIAL_VALIDATION === 'BLOCKED_OR_NOT_OBTAINED' &&
      s.COMMERCIAL_AVAILABILITY === 'NOT_FOR_SALE' &&
      s.PRICE_APPROVED === 'NONE';
    return { ok, detail: '' };
  });

  // 35 — website untouched and MC-15 not started
  add('MC14-035', 'Website remains unmodified and MC-15 has not started', () => {
    const ok =
      website?.readOnly === true &&
      website?.websiteModified === false &&
      arr(website?.findings).every(
        (f) => f.publicChangeAuthorized === false && f.status === 'NOT_REMEDIATED',
      ) &&
      mc15?.MC15_STARTED === false &&
      manifest?.statusBlock?.MC15_STARTED === false &&
      manifest?.statusBlock?.MERGED === false &&
      manifest?.statusBlock?.DEPLOYED === false;
    return { ok, detail: '' };
  });

  // 36 — website findings have real file evidence
  add('MC14-036', 'Every website finding cites an existing file and valid line range', () => {
    const bad = [];
    for (const f of arr(website?.findings)) {
      const p = join(REPO_ROOT, f.file);
      if (!existsSync(p)) {
        bad.push(`${f.findingId}:missing-file`);
        continue;
      }
      const lines = readFileSync(p, 'utf8').split(/\r?\n/);
      if (!(
        Number.isInteger(f.lineStart) &&
        Number.isInteger(f.lineEnd) &&
        f.lineStart >= 1 &&
        f.lineEnd >= f.lineStart &&
        f.lineEnd <= lines.length + 1
      ))
        bad.push(`${f.findingId}:range`);
    }
    return { ok: bad.length === 0, detail: bad.join(', ') };
  });

  // 37 — every risk references valid decision and gate
  add('MC14-037', 'Every risk references an existing decision and release gate', () => {
    const bad = risks.filter((r) => !gateIds.has(r.releaseGate) || !decisionIds.has(r.decisionId));
    return { ok: bad.length === 0, detail: bad.map((r) => r.riskId).join(', ') };
  });

  // 38 — risk enums and product/bundle references valid
  add('MC14-038', 'Risk enums and product/bundle/SKU references are valid', () => {
    const bad = [];
    for (const r of risks) {
      if (!RISK_SEVERITIES.includes(r.severity)) bad.push(`${r.riskId}:severity`);
      if (!RISK_STATUSES.includes(r.currentStatus)) bad.push(`${r.riskId}:status`);
      if (!COMPLIANCE_STATUSES.includes(r.complianceStatus)) bad.push(`${r.riskId}:compliance`);
      for (const p of arr(r.productFamilyIds))
        if (!PRODUCT_IDS.includes(p)) bad.push(`${r.riskId}:product`);
      for (const b of arr(r.bundleIds)) if (!BUNDLE_IDS.includes(b)) bad.push(`${r.riskId}:bundle`);
      for (const s of arr(r.skuIds))
        if (!skuIds.has(s) && !PRODUCT_IDS.includes(s)) bad.push(`${r.riskId}:sku`);
    }
    return { ok: bad.length === 0, detail: bad.join(', ') };
  });

  // 39 — no risk is closed by MC-14
  add('MC14-039', 'No risk is marked CLOSED_VERIFIED by MC-14', () => {
    const bad = risks.filter((r) => r.currentStatus === 'CLOSED_VERIFIED');
    return { ok: bad.length === 0, detail: bad.map((r) => r.riskId).join(', ') };
  });

  // 40 — legal obligations have owners and statuses
  add('MC14-040', 'Every legal requirement has an owner and a non-certified status', () => {
    const bad = requirements.filter(
      (r) =>
        !nonEmptyString(r.reviewOwner) ||
        !nonEmptyString(r.complianceStatus) ||
        r.complianceStatus === 'COMPLIANT_VERIFIED',
    );
    return { ok: bad.length === 0, detail: bad.map((r) => r.requirementId).join(', ') };
  });

  // 41 — claims: no approved public claim at all
  add('MC14-041', 'No claim is approved for public publication', () => {
    const bad = claims.filter((c) => c.publicationStatus === 'PUBLIC_AUTHORIZED');
    return { ok: bad.length === 0, detail: bad.map((c) => c.claimId).join(', ') };
  });

  // 42 — claims evidence present implies not required-empty contradiction
  add('MC14-042', 'Conditional claims without evidence are not marked conditional-public', () => {
    const bad = claims.filter(
      (c) =>
        c.claimClass === 'C' &&
        c.publicationStatus === 'PUBLIC_CONDITIONAL' &&
        !allStrings(c.evidencePresent),
    );
    return { ok: bad.length === 0, detail: bad.map((c) => c.claimId).join(', ') };
  });

  // 43 — every risk/source reference in claims resolves
  add('MC14-043', 'Claim risk and source references resolve', () => {
    const bad = [];
    for (const c of claims) {
      for (const r of arr(c.riskIds)) if (!riskIds.has(r)) bad.push(`${c.claimId}:${r}`);
      for (const s of arr(c.legalSourceIds)) if (!sourceIds.has(s)) bad.push(`${c.claimId}:${s}`);
    }
    return { ok: bad.length === 0, detail: bad.join(', ') };
  });

  // 44 — economic-operator roles referenced by scenarios exist
  add('MC14-044', 'Every scenario references existing economic-operator roles', () => {
    const bad = [];
    for (const s of arr(operators?.scenarios))
      for (const r of arr(s.likelyRoles)) if (!roleIds.has(r)) bad.push(`${s.scenarioId}:${r}`);
    return { ok: bad.length === 0, detail: bad.join(', ') };
  });

  // 45 — liability scenarios and licensing rights references resolve
  add('MC14-045', 'Liability scenarios and licensing rights reference existing risks', () => {
    const bad = [];
    for (const s of arr(liability?.liabilityScenarios))
      for (const r of arr(s.riskIds)) if (!riskIds.has(r)) bad.push(`${s.scenarioId}:${r}`);
    for (const l of arr(licensing?.rights))
      for (const r of arr(l.riskIds)) if (!riskIds.has(r)) bad.push(`${l.rightId}:${r}`);
    return { ok: bad.length === 0, detail: bad.join(', ') };
  });

  // 46 — research evidence exists and the CSV is well formed
  add('MC14-046', 'Legal research dossier and source CSV are present and well formed', () => {
    const dossier = docs['research/MC14-LEGAL-RESEARCH-DOSSIER.md'];
    const csv = docs['research/mc14-legal-sources.csv'];
    if (!dossier || !csv) return { ok: false, detail: 'missing research files' };
    const lines = csv.trim().split(/\r?\n/);
    const header = lines[0].split(',');
    const expected = [
      'sourceId',
      'instrument',
      'shortRef',
      'celexOrBoer',
      'officialUrl',
      'jurisdiction',
      'publicationDate',
      'effectiveDate',
      'applicationDate',
      'transpositionStatus',
      'retrievedOn',
      'verificationStatus',
      'notes',
    ];
    const rows = lines.length - 1;
    const ok =
      header.length === 13 &&
      expected.every((h, i) => header[i] === h) &&
      rows >= 45 &&
      dossier.length > 2000;
    return { ok, detail: `rows=${rows}` };
  });

  // 47 — no contact and no quotation/contract invented
  add('MC14-047', 'No external contact, quotation or contract is recorded', () => {
    const c = manifest?.evidenceCounts || {};
    const ok =
      (c.providerContacts ?? 0) === 0 &&
      (c.customerContacts ?? 0) === 0 &&
      (c.lawyerContacts ?? 0) === 0 &&
      (c.insurerContacts ?? 0) === 0 &&
      (c.regulatorContacts ?? 0) === 0 &&
      (c.formalQuotations ?? 0) === 0 &&
      (c.executedContracts ?? 0) === 0;
    return { ok, detail: JSON.stringify(c) };
  });

  // 48 — manifest counts match the data
  add('MC14-048', 'Manifest evidence counts match the datasets', () => {
    const c = manifest?.evidenceCounts || {};
    const actual = {
      legalSources: sources.length,
      legalRequirements: requirements.length,
      risks: risks.length,
      claims: claims.length,
      websiteFindings: arr(website?.findings).length,
      releaseGates: arr(gatesData?.gates).length,
      releaseDocuments: arr(gatesData?.documents).length,
      externalDecisions: decisions.length,
      licensingRights: arr(licensing?.rights).length,
      consumerObligations: arr(consumer?.obligations).length,
      consumerTemplates: arr(consumer?.templates).length,
      privacyPurposes: arr(privacy?.processingPurposes).length,
      liabilityScenarios: arr(liability?.liabilityScenarios).length,
    };
    const bad = Object.entries(actual)
      .filter(([k, v]) => c[k] !== v)
      .map(([k, v]) => `${k}:${c[k]}!=${v}`);
    return { ok: bad.length === 0, detail: bad.join(', ') };
  });

  // 49 — external decisions remain pending
  add('MC14-049', 'No external decision is falsely recorded as closed', () => {
    const bad = decisions.filter((d) => !['PENDING', 'OUT_OF_SCOPE_FOR_MC14'].includes(d.status));
    return { ok: bad.length === 0, detail: bad.map((d) => d.decisionId).join(', ') };
  });

  // 50 — review status consistent with evidence
  add('MC14-050', 'Independent-review status matches the recorded evidence', () => {
    const reviewStatus = manifest?.review?.status;
    if (reviewStatus === 'PENDING') {
      const ok =
        !review ||
        review.verdict === undefined ||
        review.verdict === 'PENDING' ||
        review.verdict === 'PENDING_CORRECTION';
      return { ok, detail: review?.verdict };
    }
    if (!review) return { ok: false, detail: 'missing review-findings.json' };
    const blocking = arr(review.findings).filter(
      (f) => ['BLOCKING', 'MAJOR'].includes(f.classification) && f.status === 'OPEN',
    );
    const recordedVerdict = manifest?.statusBlock?.MC14_INTERNAL_LEGAL_GOVERNANCE_SCOPE;
    const ok =
      review.status === manifest?.review?.status &&
      review.verdict === recordedVerdict &&
      (review.programmeStatus ?? 'PARTIAL') === manifest?.statusBlock?.MC14_VERDICT &&
      manifest?.statusBlock?.MC14_INDEPENDENT_REVIEW === review.verdict &&
      blocking.length === 0;
    return {
      ok,
      detail: `${review.verdict}/${review.programmeStatus ?? ''}/${blocking.length} open`,
    };
  });

  // 51 — data contract covers every dataset
  add('MC14-051', 'Data contract documents every machine-readable dataset', () => {
    const doc = docs['MC14-MACHINE-READABLE-CONTRACTS.md'] || '';
    const missing = DATA_FILES.filter((f) => !doc.includes(f));
    return { ok: missing.length === 0, detail: missing.join(', ') };
  });

  // 52 — no public authorization conflicts with trademark NO_GO
  add('MC14-052', 'Public authorization cannot coexist with trademark NO_GO', () => {
    const authorized = claims.filter((c) => c.publicationStatus === 'PUBLIC_AUTHORIZED');
    const publicBrand = claims.filter(
      (c) =>
        c.publicationStatus === 'PUBLIC_AUTHORIZED' &&
        /MAREA|Open Marine|Open-Marine/i.test(`${c.pairs?.es} ${c.pairs?.en}`),
    );
    const ok =
      !(claimsPolicy?.brandState?.mareaPublicUse === 'NO_GO' && publicBrand.length > 0) &&
      !(claimsPolicy?.summary?.publicationAuthorization === 'NONE' && authorized.length > 0);
    return { ok, detail: publicBrand.map((c) => c.claimId).join(', ') };
  });

  // 53 — privacy controls are not falsely asserted
  add('MC14-053', 'Privacy DPIA, DPA and security controls are not falsely asserted', () => {
    const dpia = privacy?.dpiaScreening || {};
    const sec = privacy?.securityAndBreach || {};
    const tenancy = privacy?.fleetTenancy || {};
    const bad = [];
    if (dpia.screeningPerformed === true) bad.push('dpia.screeningPerformed');
    if (dpia.aepdConsultation && dpia.aepdConsultation !== 'NOT_PERFORMED') bad.push('aepd');
    if (
      sec.article32ControlsStatus === 'COMPLIANT_VERIFIED' ||
      sec.article32ControlsStatus === 'CERTIFIED'
    )
      bad.push('art32');
    if (sec.breachRunbook === 'IMPLEMENTED' || sec.breachRunbook === 'CERTIFIED')
      bad.push('breach');
    if (tenancy.dpaExists === true) bad.push('dpa');
    if (tenancy.tenantIsolationTested === true) bad.push('isolation');
    if (privacy?.evidenceStatus === 'COMPLIANT_VERIFIED') bad.push('evidence');
    return { ok: bad.length === 0, detail: bad.join(', ') };
  });

  // 54 — legal source dates are valid ISO dates or explicit markers
  add('MC14-054', 'Legal source dates are valid or explicitly unknown', () => {
    const markers = ['NOT_RETRIEVED', 'NOT_APPLICABLE', 'NOT_CELEX', 'NOT_APPLICABLE'];
    const bad = [];
    for (const s of sources) {
      for (const field of ['publicationDate', 'effectiveDate', 'applicationDate', 'retrievedOn']) {
        const v = s[field];
        if (v === null || v === undefined) {
          bad.push(`${s.sourceId}:${field}:missing`);
          continue;
        }
        if (ISO_DATE.test(v)) continue;
        if (
          markers.includes(v) ||
          /^CELEX|^OJ |^BOE-|^STANDARDS_BODY|^OFFICIAL|^COMMISSION|^NOT_/.test(v)
        )
          continue;
        bad.push(`${s.sourceId}:${field}:${v}`);
      }
    }
    return { ok: bad.length === 0, detail: bad.join(', ') };
  });

  const passed = checks.filter((c) => c.ok).length;
  return {
    checks,
    passed,
    failed: checks.length - passed,
    total: checks.length,
    ok: passed === checks.length,
  };
}

function runCli() {
  const json = process.argv.includes('--json');
  const { data, docs } = loadPackage();
  const report = validateData(data, docs);
  if (json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    for (const c of report.checks) {
      console.log(
        `${c.ok ? 'PASS' : 'FAIL'} ${c.id} — ${c.description}${c.detail ? ` [${c.detail}]` : ''}`,
      );
    }
    console.log(`\nMC-14 legal/commercial gate: ${report.passed}/${report.total} checks passed.`);
  }
  if (!report.ok) process.exitCode = 1;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) runCli();
