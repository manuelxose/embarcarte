/**
 * MC-23 bundle comparison and upgrade-path queries.
 *
 * Pure, deterministic functions over the generated MC-08 composition in
 * `./bundle-comparison`. No clock, no randomness, no I/O, no Angular.
 *
 * Fail-closed rules encoded here:
 *  - an unknown bundle never yields an included, purchasable or permissive answer;
 *  - an eligibility result is always clamped to the bundle's own contract
 *    outcomes, so no code path can invent an outcome the contract does not allow;
 *  - inclusion is a commercial classification, never a compatibility statement;
 *  - no function returns `ORDERABLE`: the outcome does not exist in MC-08.
 */
import type {
  BundleConfigurationOutcome,
  BundleId,
  BundleInclusion,
  BundleRecord,
  ComparisonFamilyId,
} from './bundle-comparison';
import {
  BUNDLE_ORDER,
  BUNDLES,
  COMPARISON_FAMILY_ORDER,
  CONFIGURATION_OUTCOMES,
  CROSS_SELL_RULES,
  INCLUSION_VOCABULARY,
  UPGRADE_PATHS,
} from './bundle-comparison';
import type { BundleUpgradePath } from './bundle-comparison';
import { editionById, isGovernanceEditionId } from '../governance/governance-facts';

export * from './bundle-comparison';

/** True when `value` is a canonical bundle id. */
export function isBundleId(value: unknown): value is BundleId {
  return typeof value === 'string' && (BUNDLE_ORDER as readonly string[]).includes(value);
}

/** True when `value` is a documented MC-08 inclusion value. */
export function isInclusion(value: unknown): value is BundleInclusion {
  return typeof value === 'string' && (INCLUSION_VOCABULARY as readonly string[]).includes(value);
}

/** True when `value` is a documented MC-08 configuration outcome. */
export function isConfigurationOutcome(value: unknown): value is BundleConfigurationOutcome {
  return typeof value === 'string' && (CONFIGURATION_OUTCOMES as readonly string[]).includes(value);
}

/** The canonical record for a bundle, or undefined for an unknown id. */
export function bundleRecord(bundleId: string): BundleRecord | undefined {
  return BUNDLES.find((bundle) => bundle.bundleId === bundleId);
}

/**
 * Inclusion of an edition inside a bundle, exactly as the contract encodes it.
 *
 * MC-23 finding F-15 (remediated in MC-25): the previous signature returned
 * `NOT_INCLUDED` both for "this bundle does not list the edition" and for "this
 * edition id does not exist", so an unknown edition read as an ordinary
 * commercial exclusion. The result is now a discriminated union, and a caller
 * cannot collapse the two cases by accident.
 */
export type InclusionLookup =
  | {
      readonly kind: 'INCLUDED_LINE';
      readonly bundleId: string;
      readonly editionId: string;
      readonly lineId: string;
      readonly familyId: string;
      readonly inclusion: BundleInclusion;
    }
  | {
      readonly kind: 'NOT_INCLUDED';
      readonly bundleId: string;
      readonly editionId: string;
    }
  | {
      readonly kind: 'UNKNOWN_EDITION';
      readonly editionId: string;
    }
  | {
      readonly kind: 'UNKNOWN_BUNDLE';
      readonly bundleId: string;
    };

export function inclusionFor(bundleId: string, editionId: string): InclusionLookup {
  const bundle = bundleRecord(bundleId);
  if (!bundle) return { kind: 'UNKNOWN_BUNDLE', bundleId: String(bundleId) };
  // An id the contract does not know is never a commercial exclusion.
  if (!isGovernanceEditionId(editionId)) {
    return { kind: 'UNKNOWN_EDITION', editionId: String(editionId) };
  }
  const match = bundle.lines.find((entry) => entry.editionId === editionId);
  if (!match) return { kind: 'NOT_INCLUDED', bundleId, editionId };
  return {
    kind: 'INCLUDED_LINE',
    bundleId,
    editionId,
    lineId: match.lineId,
    familyId: match.familyId ?? '',
    inclusion: match.inclusion,
  };
}

/** The inclusion value of a line, or null when the line does not exist. */
export function inclusionValue(bundleId: string, editionId: string): BundleInclusion | null {
  const lookup = inclusionFor(bundleId, editionId);
  return lookup.kind === 'INCLUDED_LINE' ? lookup.inclusion : null;
}

/** True when the bundle declares this edition with this inclusion value. */
export function hasLine(bundleId: string, editionId: string, inclusion: BundleInclusion): boolean {
  const bundle = bundleRecord(bundleId);
  if (!bundle) return false;
  return bundle.lines.some((entry) => entry.editionId === editionId && entry.inclusion === inclusion);
}

const editionsWith = (bundleId: string, inclusion: BundleInclusion): readonly string[] => {
  const bundle = bundleRecord(bundleId);
  if (!bundle) return [];
  return bundle.lines
    .filter((entry) => entry.inclusion === inclusion && entry.editionId !== null)
    .map((entry) => entry.editionId as string);
};

/** Edition ids a bundle actually includes (`INCLUDED` only). */
export function includedEditionIds(bundleId: string): readonly string[] {
  return editionsWith(bundleId, 'INCLUDED');
}

/** Edition ids a bundle offers as `OPTIONAL`. */
export function optionalEditionIds(bundleId: string): readonly string[] {
  return editionsWith(bundleId, 'OPTIONAL');
}

/** Editions a bundle defers to a vessel-specific quotation. */
export function quotationEditionIds(bundleId: string): readonly string[] {
  return editionsWith(bundleId, 'QUOTATION_REQUIRED');
}

/** Every line of a bundle, optionally filtered to one family. */
export function bundleLines(bundleId: string, familyId?: string) {
  const bundle = bundleRecord(bundleId);
  if (!bundle) return [];
  return familyId === undefined
    ? bundle.lines
    : bundle.lines.filter((entry) => entry.familyId === familyId);
}

/** True when a bundle is held by a recorded safety gate (e.g. the PILOT gate). */
export function isBlocked(bundleId: string): boolean {
  const bundle = bundleRecord(bundleId);
  if (!bundle) return true;
  return (
    bundle.readinessState === 'BLOCKED' ||
    bundle.gates.includes('PILOT_SAFETY_GATE_BLOCKED')
  );
}

/** The contract gates that hold a bundle, in contract order. */
export function blockingGates(bundleId: string): readonly string[] {
  return bundleRecord(bundleId)?.gates ?? ['UNKNOWN_BUNDLE'];
}

/**
 * True only when a bundle is purchasable.
 *
 * Written as an allow-list rather than "not NOT_FOR_SALE", so a future
 * availability value cannot silently read as purchasable. Today it is always
 * false because every MC-08 bundle is `NOT_FOR_SALE`.
 */
export function isPurchasable(bundleId: string): boolean {
  const bundle = bundleRecord(bundleId);
  return bundle ? bundle.commercialAvailability === 'COMMERCIALLY_AVAILABLE' : false;
}

/** True when a bundle's service is not implemented (FLEET today). */
export function isServiceNotImplemented(bundleId: string): boolean {
  return blockingGates(bundleId).includes('FLEET_SERVICE_NOT_IMPLEMENTED');
}

/** True when a bundle has no established service level (FLEET today). */
export function hasNoEstablishedSla(bundleId: string): boolean {
  return blockingGates(bundleId).includes('SLA_NOT_ESTABLISHED');
}

export interface BundleComparison {
  readonly fromBundleId: string;
  readonly toBundleId: string;
  /** Editions included by `to` and not by `from`, in `to` order. */
  readonly added: readonly string[];
  /** Editions included by both, in `from` order. */
  readonly retained: readonly string[];
  /**
   * Editions included by `from` that `to` does NOT include.
   *
   * This is `absentFromTo`, not "removed from the vessel": the contract's own
   * `preserves` lists treat an edition that `to` merely makes OPTIONAL, or a
   * different edition of the same family, as retained scope. Callers that talk
   * to customers must use `preservedByContract` for that judgement.
   */
  readonly absentFromTo: readonly string[];
}

/**
 * Compare the INCLUDED composition of two bundles.
 *
 * Only `INCLUDED` lines count as composition; optional, conditional, ineligible
 * and quotation-only lines are commercial classifications, not composition.
 * Unknown ids yield empty arrays, which the caller must treat as
 * "no comparison available" rather than as an empty difference.
 */
export function compareBundles(fromBundleId: string, toBundleId: string): BundleComparison {
  const from = includedEditionIds(fromBundleId);
  const to = includedEditionIds(toBundleId);
  const toSet = new Set(to);
  const fromSet = new Set(from);
  return {
    fromBundleId,
    toBundleId,
    added: to.filter((editionId) => !fromSet.has(editionId)),
    retained: from.filter((editionId) => toSet.has(editionId)),
    absentFromTo: from.filter((editionId) => !toSet.has(editionId)),
  };
}

/** Every upgrade path starting at a bundle (all paths when no id is given). */
export function upgradePaths(fromBundleId?: string) {
  if (fromBundleId === undefined) return UPGRADE_PATHS;
  return UPGRADE_PATHS.filter((entry) => entry.fromBundleId === fromBundleId);
}

/** The upgrade path with this id, if it exists. */
export function upgradePathById(upgradeId: string) {
  return UPGRADE_PATHS.find((entry) => entry.upgradeId === upgradeId);
}

/**
 * True only when the contract marks this path as a supported customer path.
 *
 * `UM-CR-03` is recorded for internal comparison and explicitly is not a
 * supported downgrade, so it must never be presented as an upgrade.
 */
export function isSupportedUpgradePath(upgradeId: string): boolean {
  const entry = upgradePathById(upgradeId);
  if (!entry) return false;
  return !/not a supported/i.test(entry.condition);
}

/** Cross-sell rules whose origin includes this bundle. */
export function crossSellFrom(bundleId: string) {
  return CROSS_SELL_RULES.filter((rule) => rule.fromBundleIds.includes(bundleId));
}

export interface BundleEligibility {
  /** Always one of the bundle's own MC-08 outcomes; never a sale approval. */
  readonly outcome: BundleConfigurationOutcome;
  /** Contract conditions that produced the outcome, in order. */
  readonly reasons: readonly string[];
}

/**
 * Evaluate configuration eligibility for a bundle.
 *
 * The result is CLAMPED to `bundle.outcomes`: if the contract does not list the
 * derived outcome, the bundle's most restrictive listed outcome is returned
 * instead. `PUBLICATION_BLOCKED` is the terminal state because no publication
 * authorisation exists in MC-08, and an unknown bundle is `NOT_ELIGIBLE`.
 *
 * No input can produce `ORDERABLE`, because that outcome does not exist, and no
 * input can produce `CONFIGURATION_DEFINED_INTERNAL` either: every bundle is
 * still unapproved for publication.
 */
export function evaluateEligibility(
  bundleId: string,
  requestedEditionIds: readonly string[] = [],
): BundleEligibility {
  const bundle = bundleRecord(bundleId);
  if (!bundle) return { outcome: 'NOT_ELIGIBLE', reasons: ['UNKNOWN_BUNDLE'] };

  const clamp = (outcome: BundleConfigurationOutcome, reasons: readonly string[]): BundleEligibility => {
    if (bundle.outcomes.includes(outcome)) return { outcome, reasons };
    // The contract does not permit this outcome for this bundle. Fall back to a
    // restrictive one it does permit, never to a permissive one.
    for (const fallback of ['PUBLICATION_BLOCKED', 'NOT_ELIGIBLE'] as const) {
      if (bundle.outcomes.includes(fallback)) {
        return { outcome: fallback, reasons: [...reasons, `CLAMPED_FROM:${outcome}`] };
      }
    }
    return { outcome: 'NOT_ELIGIBLE', reasons: [...reasons, 'CONTRACT_HAS_NO_RESTRICTIVE_OUTCOME'] };
  };

  const lookups = requestedEditionIds.map(
    (editionId) => [editionId, inclusionFor(bundleId, editionId)] as const,
  );
  // F-15: an unknown edition is a refusal, never an ordinary exclusion.
  const unknown = lookups
    .filter(([, lookup]) => lookup.kind === 'UNKNOWN_EDITION')
    .map(([editionId]) => editionId);
  if (unknown.length > 0) {
    return clamp('NOT_ELIGIBLE', unknown.map((id) => `UNKNOWN_EDITION:${id}`));
  }

  const ineligible = lookups
    .filter(([, lookup]) => lookup.kind === 'INCLUDED_LINE' && lookup.inclusion === 'INELIGIBLE')
    .map(([editionId]) => editionId);
  if (ineligible.length > 0) {
    return clamp('NOT_ELIGIBLE', ineligible.map((id) => `INELIGIBLE:${id}`));
  }

  if (isBlocked(bundleId)) {
    return clamp('NOT_ELIGIBLE', ['SAFETY_GATE_BLOCKED', ...bundle.gates.filter((g) => g === 'PILOT_SAFETY_GATE_BLOCKED')]);
  }

  const quotation = lookups
    .filter(
      ([, lookup]) =>
        lookup.kind === 'INCLUDED_LINE' && lookup.inclusion === 'QUOTATION_REQUIRED',
    )
    .map(([editionId]) => editionId);
  if (quotation.length > 0) {
    return clamp('QUOTATION_REQUIRED', quotation.map((id) => `QUOTATION:${id}`));
  }

  return clamp('PUBLICATION_BLOCKED', ['PUBLICATION_NOT_AUTHORIZED']);
}

/** Families that appear in at least one bundle line, canonical family order. */
export function comparisonFamilyIds(): readonly ComparisonFamilyId[] {
  const present = new Set<string>();
  for (const bundle of BUNDLES) {
    for (const line of bundle.lines) {
      if (line.familyId !== null) present.add(line.familyId);
    }
  }
  return COMPARISON_FAMILY_ORDER.filter((familyId) => present.has(familyId));
}

/**
 * The strongest inclusion a bundle applies to a family, for one cell per family.
 *
 * Precedence runs from the strongest commercial scope to the weakest;
 * `NOT_INCLUDED` is returned when the family does not appear at all. Because a
 * family can hold several editions with different inclusions, a caller that
 * must show edition-level truth should read `bundleLines(bundleId, familyId)`
 * rather than this one-cell summary.
 */
export function familyInclusion(bundleId: string, familyId: string): BundleInclusion {
  const bundle = bundleRecord(bundleId);
  if (!bundle) return 'NOT_INCLUDED';
  const precedence: readonly BundleInclusion[] = [
    'INCLUDED',
    'QUOTATION_REQUIRED',
    'CONDITIONAL',
    'OPTIONAL',
    'REQUIRED_EXTERNAL',
    'INELIGIBLE',
  ];
  const values = bundle.lines
    .filter((entry) => entry.familyId === familyId)
    .map((entry) => entry.inclusion);
  for (const candidate of precedence) {
    if (values.includes(candidate)) return candidate;
  }
  return 'NOT_INCLUDED';
}

// ---------------------------------------------------------------------------
// MC-23 finding F-2 — upgrade-path relationship integrity (remediated in MC-25)
//
// The inherited code compared upgrade paths by id: `upgradePathById` returned a
// record and `upgradePaths(from)` filtered on `fromBundleId`, so a path whose
// additions did not exist, belonged to another family, were absent from the
// target bundle, or were already included in the source bundle was still
// presented as a valid upgrade. The check below validates the COMPLETE
// canonical relationship: path -> source bundle -> target bundle/edition ->
// edition -> family -> line inclusion.
//
// Free-text entries the contract writes in prose ("customer records and
// exports") cannot be resolved to an edition. They are reported as TEXTUAL and
// are never counted as a verified relationship.
// ---------------------------------------------------------------------------

/** Inclusions that can legitimately describe an upgrade addition. */
const ADDABLE_INCLUSIONS: readonly BundleInclusion[] = Object.freeze([
  'INCLUDED',
  'OPTIONAL',
  'CONDITIONAL',
  'QUOTATION_REQUIRED',
  'REQUIRED_EXTERNAL',
]);

export interface UpgradePathEditionAddition {
  /** The edition token as written in the contract. */
  readonly token: string;
  readonly editionId: string;
  readonly familyId: string;
  readonly inclusion: BundleInclusion;
  readonly lineId: string;
}

export interface UpgradePathFinding {
  readonly code:
    | 'MALFORMED_PATH'
    | 'UNKNOWN_FROM_BUNDLE'
    | 'TARGET_UNRESOLVED'
    | 'TARGET_EQUALS_SOURCE'
    | 'ADDED_EDITION_NOT_FOUND'
    | 'ADDED_EDITION_NOT_IN_TARGET'
    | 'ADDED_EDITION_FAMILY_MISMATCH'
    | 'ADDED_EDITION_NOT_ADDABLE'
    | 'ADDITION_ALREADY_INCLUDED_IN_SOURCE';
  readonly detail: string;
}

export type UpgradePathStatus = 'VALID' | 'INVALID' | 'UNKNOWN_PATH';

/** Informational note that does not invalidate a contract path. */
export interface UpgradePathNote {
  readonly code: 'FROM_BUNDLE_IS_TARGET_CONTEXT';
  readonly detail: string;
}

export interface UpgradePathIntegrity {
  readonly upgradeId: string;
  readonly status: UpgradePathStatus;
  readonly fromBundleId: string | null;
  readonly target: { readonly kind: 'BUNDLE' | 'EDITION' | 'NONE'; readonly id: string | null };
  /** Additions whose target relationship was validated end to end. */
  readonly verifiedAdditions: readonly UpgradePathEditionAddition[];
  /**
   * Edition tokens on a target-less path. They exist in the catalogue, but there
   * is no target to relate them to, so they are NOT verified relationships.
   */
  readonly unverifiedAdditions: readonly UpgradePathEditionAddition[];
  readonly textualAdditions: readonly string[];
  readonly findings: readonly UpgradePathFinding[];
  readonly notes: readonly UpgradePathNote[];
}

const QUALIFIER_SUFFIX = /\s+(?:optional|quotation|conditional|capabilities?|capability)$/iu;
const TARGET_PATTERN = /^(.+?)\s+to\s+([^\s(/]+)\s*(?:\([^)]*\))?\s*$/u;

function editionTokenOf(entry: string): string {
  return entry.replace(/\s*\([^)]*\)\s*$/u, '').replace(QUALIFIER_SUFFIX, '').trim();
}

function malformed(detail: string): UpgradePathIntegrity {
  return {
    upgradeId: '',
    status: 'INVALID',
    fromBundleId: null,
    target: { kind: 'NONE', id: null },
    verifiedAdditions: [],
    unverifiedAdditions: [],
    textualAdditions: [],
    findings: [{ code: 'MALFORMED_PATH', detail }],
    notes: [],
  };
}

/**
 * Validate one upgrade path against the complete canonical relationship.
 *
 * Pure and total: it accepts any value, so the adversarial tests can feed it a
 * fabricated path and require an INVALID result rather than a crash.
 */
export function validateUpgradePath(input: unknown): UpgradePathIntegrity {
  if (input === null || typeof input !== 'object') return malformed('path is not an object');
  const candidate = input as Partial<BundleUpgradePath>;
  if (typeof candidate.upgradeId !== 'string' || candidate.upgradeId.length === 0) {
    return malformed('upgradeId is missing');
  }
  if (typeof candidate.path !== 'string' || candidate.path.length === 0) {
    return malformed('path text is missing');
  }
  if (!Array.isArray(candidate.adds) || candidate.adds.some((entry) => typeof entry !== 'string')) {
    return malformed('adds is not an array of strings');
  }
  if (
    candidate.fromBundleId !== null &&
    candidate.fromBundleId !== undefined &&
    typeof candidate.fromBundleId !== 'string'
  ) {
    return malformed('fromBundleId is neither a string nor null');
  }

  const findings: UpgradePathFinding[] = [];
  const notes: UpgradePathNote[] = [];
  const verifiedAdditions: UpgradePathEditionAddition[] = [];
  const unverifiedAdditions: UpgradePathEditionAddition[] = [];
  const textualAdditions: string[] = [];
  const fromBundleId = candidate.fromBundleId ?? null;

  const targetMatch = TARGET_PATTERN.exec(candidate.path);
  let target: UpgradePathIntegrity['target'] = { kind: 'NONE', id: null };
  if (targetMatch) {
    const token = targetMatch[2];
    if (isBundleId(token)) target = { kind: 'BUNDLE', id: token };
    else if (isGovernanceEditionId(token)) target = { kind: 'EDITION', id: token };
    else {
      findings.push({
        code: 'TARGET_UNRESOLVED',
        detail: `target ${token} is neither a canonical bundle nor a canonical edition`,
      });
    }
  }

  if (fromBundleId !== null && !isBundleId(fromBundleId)) {
    findings.push({
      code: 'UNKNOWN_FROM_BUNDLE',
      detail: `fromBundleId ${fromBundleId} is not a canonical bundle`,
    });
  }
  // `fromBundleId` is the contract's commercial source-bundle context, which is
  // not always spelled out in the path text (e.g. "NAV-ESSENTIAL to NAV-PRO"
  // carries `CRUISE`). What must be impossible is a path that names the SAME
  // bundle on both sides of "to".
  if (
    targetMatch &&
    target.kind === 'BUNDLE' &&
    target.id !== null &&
    targetMatch[1]
      .split('/')
      .map((part) => part.trim())
      .includes(target.id)
  ) {
    findings.push({
      code: 'TARGET_EQUALS_SOURCE',
      detail: `path ${candidate.upgradeId} names ${target.id} as both source and target`,
    });
  }

  // AUD-02: the contract sometimes records the TARGET bundle in `fromBundleId`
  // (UM-SL-02, UM-CP-02) while the path text names the real sources. That is a
  // contract representation, not a self-upgrade; it is surfaced as a note so the
  // discrepancy is never silent, and it does not invalidate a legitimate path.
  if (target.kind === 'BUNDLE' && target.id !== null && fromBundleId === target.id) {
    notes.push({
      code: 'FROM_BUNDLE_IS_TARGET_CONTEXT',
      detail: `contract records ${target.id} as fromBundleId while the path text names ${targetMatch ? targetMatch[1] : 'other sources'}; treated as the target context, not a self-upgrade`,
    });
  }

  const targetBundle = target.kind === 'BUNDLE' && target.id ? bundleRecord(target.id) : undefined;
  const targetEdition = target.kind === 'EDITION' && target.id ? editionById(target.id) : undefined;

  for (const entry of candidate.adds as readonly string[]) {
    const token = editionTokenOf(entry);
    if (!isGovernanceEditionId(token)) {
      // An identifier-shaped token that resolves to no canonical edition is a
      // nonexistent relationship, not prose. Prose can never be validated and
      // is reported as textual.
      if (/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/u.test(token)) {
        findings.push({
          code: 'ADDED_EDITION_NOT_FOUND',
          detail: `${token} looks like an edition id but is not a canonical edition`,
        });
      } else {
        textualAdditions.push(entry);
      }
      continue;
    }
    const edition = editionById(token);
    if (!edition) {
      textualAdditions.push(entry);
      continue;
    }
    if (targetBundle && target.id) {
      const lookup = inclusionFor(target.id, token);
      if (lookup.kind === 'NOT_INCLUDED') {
        findings.push({
          code: 'ADDED_EDITION_NOT_IN_TARGET',
          detail: `${token} is not a line of target bundle ${target.id}`,
        });
        continue;
      }
      if (lookup.kind !== 'INCLUDED_LINE') {
        findings.push({
          code: 'ADDED_EDITION_NOT_IN_TARGET',
          detail: `${token} cannot be resolved inside target bundle ${target.id}`,
        });
        continue;
      }
      if (lookup.familyId !== edition.familyId) {
        findings.push({
          code: 'ADDED_EDITION_FAMILY_MISMATCH',
          detail: `${token} belongs to ${edition.familyId} but line ${lookup.lineId} declares ${lookup.familyId}`,
        });
        continue;
      }
      if (!ADDABLE_INCLUSIONS.includes(lookup.inclusion)) {
        findings.push({
          code: 'ADDED_EDITION_NOT_ADDABLE',
          detail: `${token} has inclusion ${lookup.inclusion} in ${target.id}`,
        });
        continue;
      }
      if (fromBundleId !== null && inclusionValue(fromBundleId, token) === 'INCLUDED') {
        findings.push({
          code: 'ADDITION_ALREADY_INCLUDED_IN_SOURCE',
          detail: `${token} is already INCLUDED in source bundle ${fromBundleId}; it is retained, not added`,
        });
        continue;
      }
      verifiedAdditions.push({
        token,
        editionId: token,
        familyId: edition.familyId,
        inclusion: lookup.inclusion,
        lineId: lookup.lineId,
      });
      continue;
    }
    if (targetEdition) {
      if (targetEdition.familyId !== edition.familyId) {
        findings.push({
          code: 'ADDED_EDITION_FAMILY_MISMATCH',
          detail: `${token} belongs to ${edition.familyId} but target edition ${targetEdition.editionId} belongs to ${targetEdition.familyId}`,
        });
        continue;
      }
    }
    // Target-less path (an edition upgrade or an expansion scoped by prose):
    // the edition exists, but there is no target to relate it to. It is reported
    // as UNVERIFIED, never as a verified relationship.
    unverifiedAdditions.push({
      token,
      editionId: token,
      familyId: edition.familyId,
      inclusion: 'INCLUDED',
      lineId: 'NO_BUNDLE_TARGET',
    });
  }

  return {
    upgradeId: candidate.upgradeId,
    status: findings.length === 0 ? 'VALID' : 'INVALID',
    fromBundleId,
    target,
    verifiedAdditions: Object.freeze(verifiedAdditions),
    unverifiedAdditions: Object.freeze(unverifiedAdditions),
    textualAdditions: Object.freeze(textualAdditions),
    findings: Object.freeze(findings),
    notes: Object.freeze(notes),
  };
}

/** Integrity of one contract upgrade path by id. Unknown ids never validate. */
export function upgradePathIntegrity(upgradeId: string): UpgradePathIntegrity {
  const path = upgradePathById(upgradeId);
  if (!path) {
    return {
      upgradeId: String(upgradeId),
      status: 'UNKNOWN_PATH',
      fromBundleId: null,
      target: { kind: 'NONE', id: null },
      verifiedAdditions: [],
      unverifiedAdditions: [],
      textualAdditions: [],
      findings: [],
      notes: [],
    };
  }
  return validateUpgradePath(path);
}

/** Integrity of every contract upgrade path, in contract order. */
export function allUpgradePathIntegrity(): readonly UpgradePathIntegrity[] {
  return Object.freeze(UPGRADE_PATHS.map((path) => validateUpgradePath(path)));
}
