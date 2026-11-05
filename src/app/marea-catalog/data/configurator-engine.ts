/**
 * MC-24 compatibility configurator and quotation triage — deterministic engine.
 *
 * Pure functions only: no clock, no randomness, no I/O, no Angular. The same
 * questions and answers always produce the same result.
 *
 * GOVERNING RULE (MC-05 D5 §9.2, inherited verbatim):
 *
 *   "Only validated deterministic rules may produce ELIGIBLE_SELF_INSTALL. At
 *    MC-05 the validated rule set is empty because no matrix row is TESTED, so
 *    ELIGIBLE_SELF_INSTALL cannot be returned today."
 *
 * This engine therefore CANNOT return `ELIGIBLE_SELF_INSTALL` while
 * `VALIDATED_SELF_INSTALL_RULES` is empty, and that unreachability is a tested
 * property, not a comment. The eligible outcome exists in the vocabulary because
 * D5 defines it; it is unreachable by construction.
 *
 * Fail-closed order of evaluation:
 *   1. excluded capability / failed safety prerequisite -> NOT_SUPPORTED
 *   2. missing or contradictory mandatory answers       -> INSUFFICIENT_INFORMATION
 *   3. no validated rule covers the configuration        -> INSTALLER_ASSESSMENT_REQUIRED
 *   4. a validated rule covers it                        -> ELIGIBLE_SELF_INSTALL
 *
 * Step 3 always wins over step 4 because step 4 requires a non-empty validated
 * registry. Nothing here returns a price, an offer, a stock position, a quote
 * amount or an orderable state.
 */
import type { ConfiguratorQuestionGroup } from './configurator.generated';
import {
  CONFIGURATOR_CONFLICT_RULES,
  CONFIGURATOR_PROJECTION_META,
  CONFIGURATOR_QUESTIONS,
  CONFIGURATOR_RULES,
} from './configurator.generated';

/** The four D5 §9.2 outcomes. This is the ONLY outcome vocabulary. */
export const CONFIGURATOR_OUTCOMES = [
  'ELIGIBLE_SELF_INSTALL',
  'INSTALLER_ASSESSMENT_REQUIRED',
  'NOT_SUPPORTED',
  'INSUFFICIENT_INFORMATION',
] as const;

export type ConfiguratorOutcome = (typeof CONFIGURATOR_OUTCOMES)[number];

/**
 * A validated deterministic self-install rule: an MC-05 D5 matrix row that has
 * actually been tested, plus the answers it requires. The registry is empty and
 * must stay empty until real `TESTED` rows exist; adding a fabricated entry
 * would be an invented compatibility claim.
 */
export interface ValidatedSelfInstallRule {
  readonly id: string;
  /** MC-05 D5 matrix row id that carries TESTED evidence. */
  readonly matrixRowId: string;
  readonly bundleId: string;
  /** Question id -> the single answer value the tested row requires. */
  readonly requiredAnswers: Readonly<Record<string, string>>;
}

/**
 * Empty by construction: zero D5 rows are TESTED (MC-05, MC-22, MC-24 re-verified).
 *
 * FROZEN on purpose. An earlier revision exported a mutable array, and a single
 * `VALIDATED_SELF_INSTALL_RULES.push({...})` made the eligible outcome reachable:
 * the governance invariant survived only by convention. Freezing makes the
 * mutation throw in this module's strict context, so the invariant is structural.
 * Test `a24` asserts the refusal.
 */
export const VALIDATED_SELF_INSTALL_RULES: readonly ValidatedSelfInstallRule[] = Object.freeze([]);

/**
 * The registry the engine actually consults. It is a separate, frozen, module-
 * private binding from the same empty literal, so the decision path never reads
 * a value a consumer could have swapped or mutated, even if the public export were
 * shadowed in a future refactor.
 */
const VALIDATED_REGISTRY: readonly ValidatedSelfInstallRule[] = Object.freeze([]);

/** Mandatory question ids per bundle, derived from the contract's own grouping. */
export const MANDATORY_QUESTION_IDS: Readonly<Record<string, readonly string[]>> = buildMandatory();

function buildMandatory(): Record<string, readonly string[]> {
  const bundles = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'];
  const result: Record<string, readonly string[]> = {};
  for (const bundleId of bundles) {
    result[bundleId] = CONFIGURATOR_QUESTIONS.filter(
      (question) => question.appliesTo === null || question.appliesTo.includes(bundleId),
    ).map((question) => question.id);
  }
  return result;
}

/** Answers are keyed by question id. An absent or empty answer is unresolved. */
export type ConfiguratorAnswers = Readonly<Record<string, string | undefined>>;

/**
 * Capability exclusions that are excluded by design, independent of any answer.
 * Steering/autopilot integration is excluded by MC-05 D5 §2 and MC-07; requesting
 * it is never a "probably works" case.
 */
export const EXCLUDED_CAPABILITIES = [
  'steering-integration',
  'autopilot-control',
  'nmea2000-certification',
] as const;
export type ExcludedCapability = (typeof EXCLUDED_CAPABILITIES)[number];

export interface ConfiguratorRequest {
  readonly bundleId: string;
  readonly answers: ConfiguratorAnswers;
  /** Capabilities the buyer asked for explicitly. */
  readonly requestedCapabilities?: readonly string[];
}

export interface ConfiguratorResult {
  readonly outcome: ConfiguratorOutcome;
  readonly bundleId: string;
  /** Question ids whose answers are missing or contradictory. */
  readonly unresolvedQuestionIds: readonly string[];
  /** Contract rule ids that fired, in contract order. */
  readonly ruleIds: readonly string[];
  /** Excluded capabilities that triggered NOT_SUPPORTED. */
  readonly excludedCapabilities: readonly string[];
  /** True only when a validated rule produced the eligible outcome. */
  readonly eligible: boolean;
  readonly purchasable: false;
  readonly priceProvided: false;
  readonly orderable: false;
}

const BUNDLE_IDS = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'] as const;

export function isKnownBundle(bundleId: unknown): bundleId is string {
  return typeof bundleId === 'string' && (BUNDLE_IDS as readonly string[]).includes(bundleId);
}

function normalized(value: string | undefined): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim().toLowerCase();
  return trimmed.length === 0 ? undefined : trimmed;
}

/**
 * Contradictory answers: the configuration asks to leave steering untouched while
 * also requesting control of it. Both cannot be true, so the pair is
 * contradictory and must not be silently resolved.
 */
function contradictionIds(
  bundleId: string,
  answers: ConfiguratorAnswers,
  requested: readonly string[],
): string[] {
  const unresolved: string[] = [];
  const untouched = normalized(answers['GQ-04']);
  if (untouched && /^(no|ninguno|none|sin autopiloto|no autopilot)/.test(untouched)) {
    if (requested.includes('steering-integration') || requested.includes('autopilot-control')) {
      unresolved.push('GQ-04');
    }
  }
  return unresolved;
}

/**
 * Resolve a configuration to exactly one D5 §9.2 outcome.
 *
 * Fail-closed: an unknown bundle id never yields an eligible outcome, and an
 * unknown capability request is ignored rather than treated as satisfied.
 */
export function resolveConfiguration(request: ConfiguratorRequest): ConfiguratorResult {
  const requested = request.requestedCapabilities ?? [];

  // 1. Excluded capability / failed safety prerequisite.
  const excluded = requested.filter((capability) =>
    (EXCLUDED_CAPABILITIES as readonly string[]).includes(capability),
  );
  if (excluded.length > 0) {
    return result('NOT_SUPPORTED', request.bundleId, {
      excludedCapabilities: excluded,
      ruleIds: ['CFG-10'],
    });
  }

  // An unknown bundle can never be configured into an eligible state.
  if (!isKnownBundle(request.bundleId)) {
    return result('INSUFFICIENT_INFORMATION', String(request.bundleId), {
      unresolvedQuestionIds: ['bundleId'],
    });
  }

  // 2. Missing or contradictory mandatory answers.
  const mandatory = MANDATORY_QUESTION_IDS[request.bundleId] ?? [];
  const contradictory = contradictionIds(request.bundleId, request.answers, requested);
  const unresolved = mandatory.filter(
    (id) => normalized(request.answers[id]) === undefined || contradictory.includes(id),
  );
  if (unresolved.length > 0) {
    return result('INSUFFICIENT_INFORMATION', request.bundleId, {
      unresolvedQuestionIds: unresolved,
    });
  }

  // 3./4. A validated rule may only promote to ELIGIBLE when it exists.
  // Reads the private frozen registry, never the public export.
  const matched = VALIDATED_REGISTRY.find(
    (rule) =>
      rule.bundleId === request.bundleId &&
      Object.entries(rule.requiredAnswers).every(
        ([id, value]) => normalized(request.answers[id]) === normalized(value),
      ),
  );
  if (matched) {
    return result('ELIGIBLE_SELF_INSTALL', request.bundleId, {
      ruleIds: [matched.id],
      eligible: true,
    });
  }

  return result('INSTALLER_ASSESSMENT_REQUIRED', request.bundleId, {
    ruleIds: ['CFG-05'],
  });
}

interface ResultExtras {
  readonly unresolvedQuestionIds?: readonly string[];
  readonly ruleIds?: readonly string[];
  readonly excludedCapabilities?: readonly string[];
  readonly eligible?: boolean;
}

function result(
  outcome: ConfiguratorOutcome,
  bundleId: string,
  extras: ResultExtras = {},
): ConfiguratorResult {
  return {
    outcome,
    bundleId,
    unresolvedQuestionIds: extras.unresolvedQuestionIds ?? [],
    ruleIds: extras.ruleIds ?? [],
    excludedCapabilities: extras.excludedCapabilities ?? [],
    eligible: extras.eligible === true,
    purchasable: false,
    priceProvided: false,
    orderable: false,
  };
}

/** True when the outcome vocabulary is exactly the four D5 outcomes. */
export function isConfiguratorOutcome(value: unknown): value is ConfiguratorOutcome {
  return typeof value === 'string' && (CONFIGURATOR_OUTCOMES as readonly string[]).includes(value);
}

/** Facts the engine is allowed to publish about itself. */
export const CONFIGURATOR_FACTS = {
  outcomeCount: CONFIGURATOR_OUTCOMES.length,
  questionCount: CONFIGURATOR_PROJECTION_META.questionCount,
  ruleCount: CONFIGURATOR_PROJECTION_META.ruleCount,
  conflictRuleCount: CONFIGURATOR_PROJECTION_META.conflictRuleCount,
  questionGroupCount: new Set(CONFIGURATOR_QUESTIONS.map((question) => question.group)).size,
  validatedSelfInstallRuleCount: VALIDATED_SELF_INSTALL_RULES.length,
  testedCompatibilityRows: 0,
  contractRuleIds: CONFIGURATOR_RULES.map((rule) => rule.id).length,
  contractConflictRuleIds: CONFIGURATOR_CONFLICT_RULES.map((rule) => rule.id).length,
} as const;

/** Groups in canonical order, for rendering the questionnaire. */
export const QUESTION_GROUP_ORDER: readonly ConfiguratorQuestionGroup[] = [
  'GENERAL',
  'SAFETY_SENSITIVE',
  'B2B_FLEET',
];
