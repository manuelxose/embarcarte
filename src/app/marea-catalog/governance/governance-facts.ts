/**
 * MC-25 SKU governance — authoritative fact snapshot.
 *
 * The generated projection (`../data/governance.generated`) is frozen deeply at
 * module load and indexed once. Nothing downstream may mutate it:
 *
 *  - the snapshot is frozen recursively, so a `push` throws and a property
 *    assignment is either rejected (strict mode) or ignored (sloppy mode); in
 *    both cases the data never changes;
 *  - the lookup `Map`s are module-private, so a consumer cannot swap an entry
 *    behind the readiness engine's back.
 *
 * The engine reads this snapshot only. There is no injection point through
 * which a caller can supply an alternative fact set, which is what makes the
 * current "nothing is orderable" state structural rather than a UI convention.
 */
import {
  GOVERNANCE_BLOCKERS,
  GOVERNANCE_EDITIONS,
  GOVERNANCE_EXTERNAL_EVIDENCE,
  GOVERNANCE_FAMILIES,
  GOVERNANCE_INVENTORY_SOURCES,
  GOVERNANCE_INVENTORY_STATE,
  GOVERNANCE_LIFECYCLE_STATES,
  GOVERNANCE_LIFECYCLE_TRANSITIONS,
  GOVERNANCE_PRECONDITIONS,
  GOVERNANCE_PRICE_APPROVAL_POLICY,
  GOVERNANCE_PRICE_STATE,
  GOVERNANCE_PROJECTION_META,
  GOVERNANCE_PROVENANCE,
  GOVERNANCE_PUBLICATION_STATE,
  GOVERNANCE_READINESS_DIMENSIONS,
  GOVERNANCE_RELEASE_GATE_SUMMARY,
  GOVERNANCE_SKU_CANDIDATES,
  GOVERNANCE_STRUCTURED_DATA_POLICY,
} from '../data/governance.generated';
import type {
  GovernanceBlocker,
  GovernanceEdition,
  GovernanceFamily,
  GovernanceSkuCandidate,
} from '../data/governance.generated';

/**
 * Recursively freeze an object graph. Returns the same reference.
 *
 * The generated projection already calls `Object.freeze` on its top-level
 * arrays, so a naive "skip if frozen" recursion would leave every record inside
 * mutable. The `WeakSet` prevents cycles without sacrificing depth.
 */
export function deepFreeze<T>(value: T, seen: WeakSet<object> = new WeakSet()): T {
  if (value !== null && typeof value === 'object') {
    if (seen.has(value)) return value;
    seen.add(value);
    Object.freeze(value);
    for (const key of Object.keys(value as Record<string, unknown>)) {
      deepFreeze((value as Record<string, unknown>)[key], seen);
    }
  }
  return value;
}

/** The complete, immutable governance fact base. */
export const GOVERNANCE_SNAPSHOT = deepFreeze({
  meta: GOVERNANCE_PROJECTION_META,
  provenance: GOVERNANCE_PROVENANCE,
  editions: GOVERNANCE_EDITIONS,
  families: GOVERNANCE_FAMILIES,
  skuCandidates: GOVERNANCE_SKU_CANDIDATES,
  blockers: GOVERNANCE_BLOCKERS,
  preconditions: GOVERNANCE_PRECONDITIONS,
  externalEvidence: GOVERNANCE_EXTERNAL_EVIDENCE,
  lifecycleStates: GOVERNANCE_LIFECYCLE_STATES,
  lifecycleTransitions: GOVERNANCE_LIFECYCLE_TRANSITIONS,
  readinessDimensions: GOVERNANCE_READINESS_DIMENSIONS,
  priceState: GOVERNANCE_PRICE_STATE,
  priceApprovalPolicy: GOVERNANCE_PRICE_APPROVAL_POLICY,
  inventoryState: GOVERNANCE_INVENTORY_STATE,
  inventorySources: GOVERNANCE_INVENTORY_SOURCES,
  publicationState: GOVERNANCE_PUBLICATION_STATE,
  structuredDataPolicy: GOVERNANCE_STRUCTURED_DATA_POLICY,
  releaseGateSummary: GOVERNANCE_RELEASE_GATE_SUMMARY,
});

// ---------------------------------------------------------------------------
// Private indexes. Never exported: a caller can read a fact, never replace it.
// ---------------------------------------------------------------------------
const EDITION_INDEX: ReadonlyMap<string, GovernanceEdition> = new Map(
  GOVERNANCE_EDITIONS.map((edition) => [edition.editionId, edition]),
);
const FAMILY_INDEX: ReadonlyMap<string, GovernanceFamily> = new Map(
  GOVERNANCE_FAMILIES.map((family) => [family.familyId, family]),
);
const CANDIDATE_INDEX: ReadonlyMap<string, GovernanceSkuCandidate> = new Map(
  GOVERNANCE_SKU_CANDIDATES.map((candidate) => [candidate.editionId, candidate]),
);
const CANDIDATE_BY_ID_INDEX: ReadonlyMap<string, GovernanceSkuCandidate> = new Map(
  GOVERNANCE_SKU_CANDIDATES.map((candidate) => [candidate.skuCandidateId, candidate]),
);
const BLOCKER_INDEX: ReadonlyMap<string, GovernanceBlocker> = new Map(
  GOVERNANCE_BLOCKERS.map((blocker) => [blocker.blockerId, blocker]),
);

export function editionById(editionId: string): GovernanceEdition | undefined {
  return typeof editionId === 'string' ? EDITION_INDEX.get(editionId) : undefined;
}

export function familyById(familyId: string): GovernanceFamily | undefined {
  return typeof familyId === 'string' ? FAMILY_INDEX.get(familyId) : undefined;
}

/** The candidate commercial SKU record for an edition, if the contract has one. */
export function skuCandidateForEdition(editionId: string): GovernanceSkuCandidate | undefined {
  return typeof editionId === 'string' ? CANDIDATE_INDEX.get(editionId) : undefined;
}

/** The candidate commercial SKU record for a candidate id, if it exists. */
export function skuCandidateById(skuCandidateId: string): GovernanceSkuCandidate | undefined {
  return typeof skuCandidateId === 'string' ? CANDIDATE_BY_ID_INDEX.get(skuCandidateId) : undefined;
}

export function blockerById(blockerId: string): GovernanceBlocker | undefined {
  return typeof blockerId === 'string' ? BLOCKER_INDEX.get(blockerId) : undefined;
}

/** Blockers an edition depends on, in contract order, deduplicated. */
export function blockersForEdition(edition: GovernanceEdition): readonly GovernanceBlocker[] {
  const seen = new Set<string>();
  const result: GovernanceBlocker[] = [];
  for (const blockerId of edition.releaseGateIds) {
    if (seen.has(blockerId)) continue;
    seen.add(blockerId);
    const blocker = BLOCKER_INDEX.get(blockerId);
    if (blocker) result.push(blocker);
  }
  return result;
}

/** Canonical edition ids in contract order. */
export function editionIds(): readonly string[] {
  return GOVERNANCE_EDITIONS.map((edition) => edition.editionId);
}

/** Canonical family ids in contract order. */
export function familyIds(): readonly string[] {
  return GOVERNANCE_FAMILIES.map((family) => family.familyId);
}

/** True when the id is a canonical product family of the MC-16 projection. */
export function isGovernanceFamilyId(value: unknown): value is string {
  return typeof value === 'string' && FAMILY_INDEX.has(value);
}

/** True when the id is a canonical edition of the MC-16 projection. */
export function isGovernanceEditionId(value: unknown): value is string {
  return typeof value === 'string' && EDITION_INDEX.has(value);
}
