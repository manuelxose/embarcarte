#!/usr/bin/env node
/**
 * MC-25 SKU governance projection generator.
 *
 * Reads the authoritative MC-16 commerce contracts and the MC-08 bundle
 * contract, and writes `src/app/marea-catalog/data/governance.generated.ts`.
 *
 *   node scripts/build-mc25-governance-data.mjs           write
 *   node scripts/build-mc25-governance-data.mjs --check   fail on drift
 *
 * Nothing here is authored. Every identity, lifecycle state, gate, price fact
 * and stock fact is transcribed. The generator REFUSES to emit data when the
 * contracts contradict each other, so an inconsistent projection cannot reach
 * the application:
 *
 *   - every bundle line edition id must exist in the MC-16 edition catalogue;
 *   - every SKU candidate must reference a real edition of its own family;
 *   - no candidate may carry a merchant SKU code or be merchantable;
 *   - every gate referenced by an edition must exist in the blocker register;
 *   - the external-evidence block must state the current fail-closed values.
 *
 * Read-only with respect to the contracts. No network, no clock, no randomness.
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = 'docs/marea/commerce-data/data';
const CONTRACT_FILES = {
  blockerRegister: `${DATA}/blocker-register.json`,
  lifecyclePolicy: `${DATA}/lifecycle-policy.json`,
  readinessDimensions: `${DATA}/readiness-dimensions.json`,
  productFamilies: `${DATA}/product-families.json`,
  productEditions: `${DATA}/product-editions.json`,
  skuCandidates: `${DATA}/sku-candidates.json`,
  priceGovernance: `${DATA}/price-governance.json`,
  inventoryGovernance: `${DATA}/inventory-governance.json`,
  publicationEligibility: `${DATA}/publication-eligibility.json`,
  releaseGateMapping: `${DATA}/release-gate-mapping.json`,
  bundles: 'docs/marea/bundles/bundle-definitions.json',
};
const OUTPUT = resolve(root, 'src/app/marea-catalog/data/governance.generated.ts');

const lit = (value) => JSON.stringify(value);

function readJson(relative) {
  return JSON.parse(readFileSync(resolve(root, relative), 'utf8'));
}

/** SHA-256 of the exact contract bytes, so provenance is content-bound. */
function sha256(relative) {
  return createHash('sha256')
    .update(readFileSync(resolve(root, relative)))
    .digest('hex');
}

/** A contradiction in the source contracts is a hard failure, never a warning. */
function requireCondition(condition, message) {
  if (!condition) throw new Error(`contract inconsistency: ${message}`);
}

export function buildProjection() {
  const contract = Object.fromEntries(
    Object.entries(CONTRACT_FILES).map(([key, path]) => [key, readJson(path)]),
  );

  const editions = contract.productEditions.editions;
  const families = contract.productFamilies.families;
  const candidates = contract.skuCandidates.candidates;
  const gates = contract.blockerRegister.gates;
  const bundles = contract.bundles.bundles ?? [];

  requireCondition(editions.length > 0, 'no product editions');
  requireCondition(families.length > 0, 'no product families');
  requireCondition(gates.length > 0, 'no release gates');

  const editionIds = new Set(editions.map((edition) => edition.editionId));
  const familyIds = new Set(families.map((family) => family.familyId));
  const gateIds = new Set(gates.map((gate) => gate.blockerId));
  const editionFamily = new Map(editions.map((edition) => [edition.editionId, edition.familyId]));

  // --- contract integrity gates -------------------------------------------
  for (const bundle of bundles) {
    for (const line of bundle.lines ?? []) {
      if (line.editionId === null || line.editionId === undefined) continue;
      requireCondition(
        editionIds.has(line.editionId),
        `bundle ${bundle.bundleId} line ${line.lineId} references unknown edition ${line.editionId}`,
      );
      requireCondition(
        editionFamily.get(line.editionId) === line.familyId,
        `bundle ${bundle.bundleId} line ${line.lineId} pairs edition ${line.editionId} with family ${line.familyId} but the edition belongs to ${editionFamily.get(line.editionId)}`,
      );
    }
  }
  for (const candidate of candidates) {
    requireCondition(
      editionIds.has(candidate.editionId),
      `SKU candidate ${candidate.skuCandidateId} references unknown edition ${candidate.editionId}`,
    );
    requireCondition(
      editionFamily.get(candidate.editionId) === candidate.familyId,
      `SKU candidate ${candidate.skuCandidateId} family does not match its edition`,
    );
    requireCondition(
      candidate.merchantSkuCode === null,
      `SKU candidate ${candidate.skuCandidateId} carries a merchant SKU code; none may be fabricated`,
    );
    requireCondition(
      candidate.merchantable === false,
      `SKU candidate ${candidate.skuCandidateId} is merchantable; the contract forbids it`,
    );
  }
  for (const edition of editions) {
    requireCondition(
      familyIds.has(edition.familyId),
      `edition ${edition.editionId} references unknown family ${edition.familyId}`,
    );
    for (const gateId of edition.releaseGateDependencies ?? []) {
      requireCondition(
        gateIds.has(gateId),
        `edition ${edition.editionId} references unknown release gate ${gateId}`,
      );
    }
  }
  const external = contract.blockerRegister.externalEvidence ?? {};
  requireCondition(external.priceApproved === 'NONE', 'priceApproved must be NONE');
  requireCondition(external.testedCompatibilityRows === 0, 'testedCompatibilityRows must be 0');
  requireCondition(external.publicationAuthorized === false, 'publicationAuthorized must be false');
  requireCondition(
    contract.skuCandidates.merchantSkuCodesEstablished === 0,
    'merchant SKU codes must remain unestablished',
  );

  // --- projection ----------------------------------------------------------
  const lines = [];
  const push = (...values) => lines.push(...values);

  push('/**');
  push(' * MC-25 SKU governance projection - GENERATED FROM THE MC-16 / MC-08 CONTRACTS.');
  push(' *');
  push(' * Every identity, lifecycle state, release gate, price fact, stock fact and');
  push(' * publication fact below is transcribed from:');
  push(' *');
  for (const [key, path] of Object.entries(CONTRACT_FILES)) {
    push(` *   - ${path} (${key})`);
  }
  push(' *');
  push(' * Nothing is authored, inferred or invented. Regenerate with');
  push(' * `node scripts/build-mc25-governance-data.mjs`; `--check` fails when the two');
  push(' * drift, and the generator itself refuses contradictory input contracts. Do not');
  push(' * edit this file by hand.');
  push(' *');
  push(' * Two boundaries that must never be misread:');
  push(' *');
  push(' *  1. A candidate SKU is NOT an approved merchant SKU. `merchantSkuCode` is null');
  push(' *     for every candidate and no code may be fabricated here.');
  push(' *  2. Nothing in this projection grants commercial availability. It is the');
  push(' *     evidence base a readiness decision REFUSES on today.');
  push(' */');
  push('');

  push('export const GOVERNANCE_PROJECTION_META = {');
  push(`  contractId: ${lit('MC25-GOVERNANCE-PROJECTION')},`);
  push(`  projectionVersion: ${lit('1.0.0')},`);
  push(`  familyCount: ${families.length},`);
  push(`  editionCount: ${editions.length},`);
  push(`  candidateCount: ${candidates.length},`);
  push(`  releaseGateCount: ${gates.length},`);
  push(`  bundleCount: ${bundles.length},`);
  push('} as const;');
  push('');

  push('/** Provenance of every contract this projection transcribes. */');
  push('export const GOVERNANCE_PROVENANCE = Object.freeze([');
  for (const [key, path] of Object.entries(CONTRACT_FILES)) {
    const source = contract[key];
    push(
      `  { key: ${lit(key)}, path: ${lit(path)}, contractId: ${lit(source.contractId ?? 'MC08-BUNDLES')}, contractVersion: ${lit(source.contractVersion ?? '1.0.0')}, milestone: ${lit(source.milestone ?? 'MC-08')}, evidenceClass: ${lit(source.evidenceClass ?? 'REPOSITORY_VERIFIED')}, sha256: ${lit(sha256(path))} },`,
    );
  }
  push('] as const);');
  push('');

  push('export interface GovernanceEdition {');
  push('  readonly editionId: string;');
  push('  readonly familyId: string;');
  push('  readonly editionType: string;');
  push('  readonly definitionStatus: string;');
  push('  readonly lifecycleState: string;');
  push('  readonly engineeringStatus: string;');
  push('  readonly licensingStatus: string;');
  push('  readonly hardwareStatus: string;');
  push('  readonly dataRightsStatus: string;');
  push('  readonly complianceStatus: string;');
  push('  readonly safetyStatus: string;');
  push('  readonly priceStatus: string;');
  push('  readonly commercialStatus: string;');
  push('  readonly commercialAvailability: string;');
  push('  readonly publicationState: string;');
  push('  readonly merchantable: boolean;');
  push('  readonly priceApproved: boolean;');
  push('  readonly merchantSkuCode: string | null;');
  push('  readonly skuIdentity: string;');
  push('  readonly requiresQuotation: boolean;');
  push('  readonly releaseGateIds: readonly string[];');
  push('  readonly evidenceIds: readonly string[];');
  push('  readonly notes: string | null;');
  push('}');
  push('');
  push('export const GOVERNANCE_EDITIONS: readonly GovernanceEdition[] = Object.freeze([');
  for (const edition of editions) {
    push(
      `  { editionId: ${lit(edition.editionId)}, familyId: ${lit(edition.familyId)}, editionType: ${lit(edition.editionType)}, definitionStatus: ${lit(edition.definitionStatus)}, lifecycleState: ${lit(edition.lifecycleState)}, engineeringStatus: ${lit(edition.engineeringStatus)}, licensingStatus: ${lit(edition.licensingStatus)}, hardwareStatus: ${lit(edition.hardwareStatus)}, dataRightsStatus: ${lit(edition.dataRightsStatus)}, complianceStatus: ${lit(edition.complianceStatus)}, safetyStatus: ${lit(edition.safetyStatus)}, priceStatus: ${lit(edition.priceStatus)}, commercialStatus: ${lit(edition.commercialStatus)}, commercialAvailability: ${lit(edition.commercialAvailability)}, publicationState: ${lit(edition.publicationState)}, merchantable: ${edition.merchantable}, priceApproved: ${edition.priceApproved}, merchantSkuCode: ${edition.merchantSkuCode === null ? 'null' : lit(edition.merchantSkuCode)}, skuIdentity: ${lit(edition.skuIdentity)}, requiresQuotation: ${edition.requiresQuotation}, releaseGateIds: Object.freeze([${(edition.releaseGateDependencies ?? []).map(lit).join(',')}]), evidenceIds: Object.freeze([${(edition.evidenceIds ?? []).map(lit).join(',')}]), notes: ${edition.notes === null || edition.notes === undefined ? 'null' : lit(edition.notes)} },`,
    );
  }
  push('] as const);');
  push('');

  push('export interface GovernanceFamily {');
  push('  readonly familyId: string;');
  push('  readonly displayName: string;');
  push('  readonly lifecycleState: string;');
  push('  readonly publicationState: string;');
  push('  readonly commercialAvailability: string;');
  push('  readonly priceStatus: string;');
  push('  readonly licensingStatus: string;');
  push('  readonly hardwareStatus: string;');
  push('  readonly complianceStatus: string;');
  push('  readonly safetyStatus: string;');
  push('  readonly dataRightsStatus: string;');
  push('  readonly engineeringStatus: string;');
  push('  readonly operationsStatus: string;');
  push('  readonly brandPublicationStatus: string;');
  push('  readonly editionIds: readonly string[];');
  push('  readonly releaseGateIds: readonly string[];');
  push('  readonly evidenceIds: readonly string[];');
  push('}');
  push('');
  push('export const GOVERNANCE_FAMILIES: readonly GovernanceFamily[] = Object.freeze([');
  for (const family of families) {
    push(
      `  { familyId: ${lit(family.familyId)}, displayName: ${lit(family.displayName)}, lifecycleState: ${lit(family.lifecycleState)}, publicationState: ${lit(family.publicationState)}, commercialAvailability: ${lit(family.commercialAvailability)}, priceStatus: ${lit(family.priceStatus)}, licensingStatus: ${lit(family.licensingStatus)}, hardwareStatus: ${lit(family.hardwareStatus)}, complianceStatus: ${lit(family.complianceStatus)}, safetyStatus: ${lit(family.safetyStatus)}, dataRightsStatus: ${lit(family.dataRightsStatus)}, engineeringStatus: ${lit(family.engineeringStatus)}, operationsStatus: ${lit(family.operationsStatus)}, brandPublicationStatus: ${lit(family.brandPublicationStatus)}, editionIds: Object.freeze([${(family.editionIds ?? []).map(lit).join(',')}]), releaseGateIds: Object.freeze([${(family.releaseGateDependencies ?? []).map(lit).join(',')}]), evidenceIds: Object.freeze([${(family.evidenceIds ?? []).map(lit).join(',')}]) },`,
    );
  }
  push('] as const);');
  push('');

  push('export interface GovernanceSkuCandidate {');
  push('  readonly skuCandidateId: string;');
  push('  readonly editionId: string;');
  push('  readonly familyId: string;');
  push('  readonly merchantSkuCode: string | null;');
  push('  readonly merchantable: boolean;');
  push('  readonly priceApproved: boolean;');
  push('  readonly commercialAvailability: string;');
  push('  readonly lifecycleState: string;');
  push('  readonly eligibility: string;');
  push('  readonly creationWorkflowId: string;');
  push('  readonly creationPreconditions: readonly string[];');
  push('  readonly blockingGateIds: readonly string[];');
  push('  readonly requiredEvidenceIds: readonly string[];');
  push('  readonly notes: string | null;');
  push('}');
  push('');
  push(
    'export const GOVERNANCE_SKU_CANDIDATES: readonly GovernanceSkuCandidate[] = Object.freeze([',
  );
  for (const candidate of candidates) {
    push(
      `  { skuCandidateId: ${lit(candidate.skuCandidateId)}, editionId: ${lit(candidate.editionId)}, familyId: ${lit(candidate.familyId)}, merchantSkuCode: ${candidate.merchantSkuCode === null ? 'null' : lit(candidate.merchantSkuCode)}, merchantable: ${candidate.merchantable}, priceApproved: ${candidate.priceApproved}, commercialAvailability: ${lit(candidate.commercialAvailability)}, lifecycleState: ${lit(candidate.lifecycleState)}, eligibility: ${lit(candidate.eligibility)}, creationWorkflowId: ${lit(candidate.creationWorkflowId)}, creationPreconditions: Object.freeze([${(candidate.creationPreconditions ?? []).map(lit).join(',')}]), blockingGateIds: Object.freeze([${(candidate.blockingGateIds ?? []).map(lit).join(',')}]), requiredEvidenceIds: Object.freeze([${(candidate.requiredEvidenceIds ?? []).map(lit).join(',')}]), notes: ${candidate.notes === null || candidate.notes === undefined ? 'null' : lit(candidate.notes)} },`,
    );
  }
  push('] as const);');
  push('');

  push('export interface GovernanceBlocker {');
  push('  readonly blockerId: string;');
  push('  readonly type: string;');
  push('  readonly status: string;');
  push('  readonly open: boolean;');
  push('  readonly closureOwner: string;');
  push('  readonly evidenceRequired: readonly string[];');
  push('  readonly sourceRef: string;');
  push('}');
  push('');
  push('export const GOVERNANCE_BLOCKERS: readonly GovernanceBlocker[] = Object.freeze([');
  for (const gate of gates) {
    push(
      `  { blockerId: ${lit(gate.blockerId)}, type: ${lit(gate.type)}, status: ${lit(gate.status)}, open: ${gate.open}, closureOwner: ${lit(gate.closureOwner)}, evidenceRequired: Object.freeze([${(gate.evidenceRequired ?? []).map(lit).join(',')}]), sourceRef: ${lit(gate.sourceRef)} },`,
    );
  }
  push('] as const);');
  push('');

  push('export interface GovernancePrecondition {');
  push('  readonly preconditionId: string;');
  push('  readonly description: string;');
  push('  readonly status: string;');
  push('  readonly met: boolean;');
  push('}');
  push('');
  push(
    'export const GOVERNANCE_PRECONDITIONS: readonly GovernancePrecondition[] = Object.freeze([',
  );
  for (const precondition of contract.blockerRegister.preconditions ?? []) {
    push(
      `  { preconditionId: ${lit(precondition.preconditionId)}, description: ${lit(precondition.description)}, status: ${lit(precondition.status)}, met: ${precondition.met} },`,
    );
  }
  push('] as const);');
  push('');

  push('export const GOVERNANCE_EXTERNAL_EVIDENCE = Object.freeze({');
  for (const [key, value] of Object.entries(external)) {
    push(`  ${key}: ${lit(value)},`);
  }
  push('} as const);');
  push('');

  push('export interface GovernanceLifecycleTransition {');
  push('  readonly transitionId: string;');
  push('  readonly fromState: string;');
  push('  readonly toState: string;');
  push('  readonly requiredGateIds: readonly string[];');
  push('  readonly requiredEvidenceIds: readonly string[];');
  push('  readonly requiredApproverRoles: readonly string[];');
  push('  readonly mc16Allowed: boolean;');
  push('  readonly authorizationStatus: string;');
  push('  readonly failClosed: boolean;');
  push('}');
  push('');
  push('export const GOVERNANCE_LIFECYCLE_STATES: readonly string[] = Object.freeze([');
  for (const state of contract.lifecyclePolicy.states) push(`  ${lit(state)},`);
  push('] as const);');
  push('');
  push(
    'export const GOVERNANCE_LIFECYCLE_TRANSITIONS: readonly GovernanceLifecycleTransition[] = Object.freeze([',
  );
  for (const transition of contract.lifecyclePolicy.transitions) {
    push(
      `  { transitionId: ${lit(transition.transitionId)}, fromState: ${lit(transition.fromState)}, toState: ${lit(transition.toState)}, requiredGateIds: Object.freeze([${(transition.requiredGateIds ?? []).map(lit).join(',')}]), requiredEvidenceIds: Object.freeze([${(transition.requiredEvidenceIds ?? []).map(lit).join(',')}]), requiredApproverRoles: Object.freeze([${(transition.requiredApproverRoles ?? []).map(lit).join(',')}]), mc16Allowed: ${transition.mc16Allowed}, authorizationStatus: ${lit(transition.authorizationStatus)}, failClosed: ${transition.failClosed} },`,
    );
  }
  push('] as const);');
  push('');

  push('export interface GovernanceReadinessDimension {');
  push('  readonly dimension: string;');
  push('  readonly readyValue: string;');
  push('  readonly failureCode: string;');
  push('  readonly currentStatus: string;');
  push('  readonly requiredEvidence: string;');
  push('}');
  push('');
  push(
    'export const GOVERNANCE_READINESS_DIMENSIONS: readonly GovernanceReadinessDimension[] = Object.freeze([',
  );
  for (const dimension of contract.readinessDimensions.dimensions) {
    push(
      `  { dimension: ${lit(dimension.dimension)}, readyValue: ${lit(dimension.readyValue)}, failureCode: ${lit(dimension.failureCode)}, currentStatus: ${lit(dimension.currentStatus)}, requiredEvidence: ${lit(dimension.requiredEvidence)} },`,
    );
  }
  push('] as const);');
  push('');

  push('export const GOVERNANCE_PRICE_STATE = Object.freeze({');
  for (const [key, value] of Object.entries(contract.priceGovernance.currentState)) {
    push(`  ${key}: ${lit(value)},`);
  }
  push('} as const);');
  push('');
  push('export const GOVERNANCE_PRICE_APPROVAL_POLICY = Object.freeze(');
  push(JSON.stringify(contract.priceGovernance.approvalPolicy, null, 2));
  push(');');
  push('');

  push('export const GOVERNANCE_INVENTORY_STATE = Object.freeze({');
  for (const [key, value] of Object.entries(contract.inventoryGovernance.currentState)) {
    push(`  ${key}: ${lit(value)},`);
  }
  push('} as const);');
  push('');
  push('export const GOVERNANCE_INVENTORY_SOURCES = Object.freeze(');
  push(JSON.stringify(contract.inventoryGovernance.sources, null, 2));
  push(');');
  push('');

  push('export const GOVERNANCE_PUBLICATION_STATE = Object.freeze({');
  for (const [key, value] of Object.entries(contract.publicationEligibility.currentState)) {
    push(`  ${key}: ${lit(value)},`);
  }
  push('} as const);');
  push('');
  push('export const GOVERNANCE_STRUCTURED_DATA_POLICY = Object.freeze(');
  push(JSON.stringify(contract.publicationEligibility.structuredDataPolicy, null, 2));
  push(');');
  push('');

  push('export const GOVERNANCE_RELEASE_GATE_SUMMARY = Object.freeze({');
  for (const [key, value] of Object.entries(contract.releaseGateMapping.summary)) {
    push(`  ${key}: ${lit(value)},`);
  }
  push('} as const);');
  push('');

  return {
    text: `${lines.join('\n')}\n`,
    counts: {
      families: families.length,
      editions: editions.length,
      candidates: candidates.length,
      gates: gates.length,
    },
  };
}

/**
 * Write (default) or verify (--check) the projection.
 *
 * The script only acts when it IS the process entry point, so the validator can
 * import `buildProjection()` and compare it with the committed file in-process —
 * the confined ENGINE-03 runner may not spawn a child process.
 */
const isEntryPoint =
  typeof process.argv[1] === 'string' &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isEntryPoint) {
  const { text, counts } = buildProjection();

  if (process.argv.includes('--check')) {
    let current = '';
    try {
      current = readFileSync(OUTPUT, 'utf8');
    } catch {
      console.log(`FAIL mc25 governance data - ${OUTPUT} does not exist; run without --check`);
      process.exit(1);
    }
    if (current !== text) {
      console.log(
        'FAIL mc25 governance data - generated projection has drifted from the MC-16/MC-08 contracts',
      );
      process.exit(1);
    }
    console.log(
      `MC-25 governance data: up to date (${counts.families} families, ${counts.editions} editions, ${counts.candidates} SKU candidates, ${counts.gates} release gates)`,
    );
    process.exit(0);
  }

  writeFileSync(OUTPUT, text);
  console.log(
    `MC-25 governance data: wrote ${counts.families} families, ${counts.editions} editions, ${counts.candidates} SKU candidates, ${counts.gates} release gates`,
  );
}
