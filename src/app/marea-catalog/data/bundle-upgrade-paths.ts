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
 * Returns `NOT_INCLUDED` when the bundle does not list that edition, and
 * `undefined` for an unknown bundle. A caller must treat `undefined` as
 * "cannot answer", never as "not included".
 */
export function inclusionFor(bundleId: string, editionId: string): BundleInclusion | undefined {
  const bundle = bundleRecord(bundleId);
  if (!bundle) return undefined;
  const match = bundle.lines.find((entry) => entry.editionId === editionId);
  return match ? match.inclusion : 'NOT_INCLUDED';
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

  const ineligible = requestedEditionIds.filter(
    (editionId) => inclusionFor(bundleId, editionId) === 'INELIGIBLE',
  );
  if (ineligible.length > 0) {
    return clamp('NOT_ELIGIBLE', ineligible.map((id) => `INELIGIBLE:${id}`));
  }

  if (isBlocked(bundleId)) {
    return clamp('NOT_ELIGIBLE', ['SAFETY_GATE_BLOCKED', ...bundle.gates.filter((g) => g === 'PILOT_SAFETY_GATE_BLOCKED')]);
  }

  const quotation = requestedEditionIds.filter(
    (editionId) => inclusionFor(bundleId, editionId) === 'QUOTATION_REQUIRED',
  );
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
