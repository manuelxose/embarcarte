/**
 * MC-23 bundle comparison and upgrade-path queries.
 *
 * Pure, deterministic functions over the canonical MC-08 composition declared in
 * `./bundle-comparison`. No clock, no randomness, no I/O, no Angular.
 *
 * Fail-closed rules encoded here:
 *  - an unknown bundle never yields "included" or "permitted" answers;
 *  - inclusion is a commercial classification, never a compatibility statement;
 *  - no function can produce `ORDERABLE`, a price, a stock position or a sale
 *    approval, because none of those exists in the MC-08 contract.
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
  INCLUSION_VOCABULARY,
} from './bundle-comparison';

export * from './bundle-comparison';

/** One upgrade path from the contract (`upgradeMigration[]`). */
export interface BundleUpgradePath {
  readonly upgradeId: string;
  /** Contract path label, e.g. "START to CRUISE". */
  readonly path: string;
  readonly fromBundleId: BundleId | null;
  readonly adds: readonly string[];
  readonly preserves: readonly string[];
  readonly condition: string;
  readonly requiresNewQuotation: boolean;
}

/** One cross-sell rule from the contract (`crossSellRules[]`). */
export interface BundleCrossSellRule {
  readonly ruleId: string;
  readonly fromBundleIds: readonly string[];
  readonly toBundleIds: readonly string[];
  readonly adds: readonly string[];
  readonly preserves: readonly string[];
  readonly condition: string;
  readonly prohibitsDoubleCharge: boolean;
}

/** Canonical upgrade paths, copied verbatim from `upgradeMigration[]`. */
export const UPGRADE_PATHS: readonly BundleUpgradePath[] = [
  {
    upgradeId: 'UM-ST-01',
    path: 'START to CRUISE',
    fromBundleId: 'START',
    adds: ['AIS-RECEIVER', 'DISPLAY-7'],
    preserves: ['HUB-STANDARD', 'NAV-PRO or documented NAV-ESSENTIAL variant'],
    condition: 'Compatibility evidence and installation assessment',
    requiresNewQuotation: true,
  },
  {
    upgradeId: 'UM-ST-02',
    path: 'START to SAIL',
    fromBundleId: 'START',
    adds: ['PILOT-COASTAL (quotation)', 'SENSE-WIND'],
    preserves: ['HUB-STANDARD', 'NAV-PRO'],
    condition: 'Vessel and steering survey; PILOT safety gate BLOCKED',
    requiresNewQuotation: true,
  },
  {
    upgradeId: 'UM-ST-03',
    path: 'START edition upgrades',
    fromBundleId: 'START',
    adds: ['HUB-PRO', 'NAV-PRO'],
    preserves: ['customer records and exports'],
    condition: 'Price and compatibility confirmation',
    requiresNewQuotation: false,
  },
];

/** Canonical cross-sell rules, copied verbatim from `crossSellRules[]`. */
export const CROSS_SELL_RULES: readonly BundleCrossSellRule[] = [
  {
    ruleId: 'CS-01',
    fromBundleIds: ['START'],
    toBundleIds: ['CRUISE'],
    adds: ['AIS-RECEIVER', 'DISPLAY-7'],
    preserves: ['HUB-STANDARD', 'NAV subscription'],
    condition: 'Customer needs a fixed helm display and receive-only AIS traffic',
    prohibitsDoubleCharge: true,
  },
];

/** True when `value` is a canonical bundle id. */
export function isBundleId(value: unknown): value is BundleId {
  return typeof value === 'string' && (BUNDLE_ORDER as readonly string[]).includes(value);
}

/** True when `value` is a documented MC-08 inclusion value. */
export function isInclusion(value: unknown): value is BundleInclusion {
  return typeof value === 'string' && (INCLUSION_VOCABULARY as readonly string[]).includes(value);
}

/** The canonical record for a bundle, or undefined for an unknown id. */
export function bundleRecord(bundleId: string): BundleRecord | undefined {
  return BUNDLES.find((bundle) => bundle.bundleId === bundleId);
}

/**
 * Inclusion of an edition inside a bundle, exactly as the contract encodes it.
 *
 * Returns `NOT_INCLUDED` when the bundle does not list the edition at all, and
 * `undefined` for an unknown bundle - the caller must fail closed rather than
 * assume a bundle contains or omits a line.
 */
export function inclusionFor(bundleId: string, editionId: string): BundleInclusion | undefined {
  const bundle = bundleRecord(bundleId);
  if (!bundle) return undefined;
  const match = bundle.lines.find((entry) => entry.editionId === editionId);
  return match ? match.inclusion : 'NOT_INCLUDED';
}

const editionsWith = (bundleId: string, inclusion: BundleInclusion): readonly string[] => {
  const bundle = bundleRecord(bundleId);
  if (!bundle) return [];
  return bundle.lines
    .filter((entry) => entry.inclusion === inclusion && entry.editionId !== null)
    .map((entry) => entry.editionId as string);
};

/** Edition ids a bundle actually includes (inclusion `INCLUDED` only). */
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

/** True when a bundle is held by a recorded safety gate (e.g. the PILOT gate). */
export function isBlocked(bundleId: string): boolean {
  const bundle = bundleRecord(bundleId);
  return bundle ? bundle.readinessState === 'BLOCKED' : true;
}

/** True only when a bundle is purchasable. Always false in MC-08 and MC-23. */
export function isPurchasable(bundleId: string): boolean {
  const bundle = bundleRecord(bundleId);
  return bundle ? bundle.commercialAvailability !== 'NOT_FOR_SALE' : false;
}

export interface BundleComparison {
  readonly fromBundleId: string;
  readonly toBundleId: string;
  /** Editions included by `to` and not by `from`, in `to` order. */
  readonly added: readonly string[];
  /** Editions included by both, in `from` order. */
  readonly retained: readonly string[];
  /** Editions included by `from` and not by `to`, in `from` order. */
  readonly removed: readonly string[];
}

/**
 * Compare the INCLUDED composition of two bundles.
 *
 * Only `INCLUDED` lines count: optional, conditional, ineligible and
 * quotation-only lines are commercial classifications rather than composition,
 * so they never register as an addition or a removal. Unknown ids yield empty
 * sets, which the caller must treat as "no comparison available".
 */
export function compareBundles(fromBundleId: string, toBundleId: string): BundleComparison {
  const from = includedEditionIds(fromBundleId);
  const to = includedEditionIds(toBundleId);
  const fromSet = new Set(from);
  const toSet = new Set(to);
  return {
    fromBundleId,
    toBundleId,
    added: to.filter((editionId) => !fromSet.has(editionId)),
    retained: from.filter((editionId) => toSet.has(editionId)),
    removed: from.filter((editionId) => !toSet.has(editionId)),
  };
}

/** Every upgrade path starting at a bundle (all paths when no id is given). */
export function upgradePaths(fromBundleId?: string): readonly BundleUpgradePath[] {
  if (fromBundleId === undefined) return UPGRADE_PATHS;
  return UPGRADE_PATHS.filter((entry) => entry.fromBundleId === fromBundleId);
}

/** Cross-sell rules whose origin includes this bundle. */
export function crossSellFrom(bundleId: string): readonly BundleCrossSellRule[] {
  return CROSS_SELL_RULES.filter((rule) => rule.fromBundleIds.includes(bundleId));
}

export interface BundleEligibility {
  /** Always an internal MC-08 outcome; never a sale approval. */
  readonly outcome: BundleConfigurationOutcome;
  /** Contract conditions that produced the outcome, in order. */
  readonly reasons: readonly string[];
}

/**
 * Evaluate configuration eligibility for a bundle.
 *
 * Fails closed on three counts: an unknown bundle is NOT_ELIGIBLE, a bundle
 * whose readiness is BLOCKED can never resolve to CONFIGURATION_DEFINED_INTERNAL,
 * and PUBLICATION_BLOCKED is the permanent terminal state because no publication
 * authorisation exists in MC-08. No input can make a bundle ORDERABLE: that
 * outcome does not exist.
 */
export function evaluateEligibility(
  bundleId: string,
  requestedEditionIds: readonly string[] = [],
): BundleEligibility {
  const bundle = bundleRecord(bundleId);
  if (!bundle) return { outcome: 'NOT_ELIGIBLE', reasons: ['UNKNOWN_BUNDLE'] };

  const ineligible = requestedEditionIds.filter(
    (editionId) => inclusionFor(bundleId, editionId) === 'INELIGIBLE',
  );
  if (ineligible.length > 0) {
    return { outcome: 'NOT_ELIGIBLE', reasons: ineligible.map((id) => `INELIGIBLE:${id}`) };
  }

  if (bundle.readinessState === 'BLOCKED') {
    return { outcome: 'NOT_ELIGIBLE', reasons: ['SAFETY_GATE_BLOCKED'] };
  }

  const quotation = requestedEditionIds.filter(
    (editionId) => inclusionFor(bundleId, editionId) === 'QUOTATION_REQUIRED',
  );
  if (quotation.length > 0) {
    return { outcome: 'QUOTATION_REQUIRED', reasons: quotation.map((id) => `QUOTATION:${id}`) };
  }

  return { outcome: 'PUBLICATION_BLOCKED', reasons: ['PUBLICATION_NOT_AUTHORIZED'] };
}

/** Families that appear in at least one bundle line, in canonical family order. */
export function comparisonFamilyIds(): readonly ComparisonFamilyId[] {
  const present = new Set<string>();
  for (const bundle of BUNDLES) {
    for (const entry of bundle.lines) {
      if (entry.familyId !== null) present.add(entry.familyId);
    }
  }
  return COMPARISON_FAMILY_ORDER.filter((familyId) => present.has(familyId));
}

/**
 * The strongest inclusion a bundle applies to a family, for one cell per family.
 *
 * Precedence runs from the strongest commercial scope to the weakest, and
 * `NOT_INCLUDED` is returned when the family does not appear at all.
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
