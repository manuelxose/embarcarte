/**
 * MC-24 quotation triage — deterministic internal handling classification.
 *
 * Turns a resolved configuration into an INTERNAL handling queue. This is a
 * triage classification, never a quotation: it produces no amount, no currency,
 * no validity date, no offer and no orderable state. A real quotation is a
 * vessel-specific document produced by a survey, and no survey exists.
 *
 * Pure functions only: no clock, no randomness, no I/O, no Angular.
 */
import type { ConfiguratorOutcome, ConfiguratorResult } from './configurator-engine';

/** Internal handling routes. None of these is a commercial offer. */
export const TRIAGE_ROUTES = [
  'SELF_INSTALL_REVIEW',
  'INSTALLER_SURVEY',
  'SPECIALIST_ASSESSMENT',
  'INFORMATION_REQUEST',
] as const;

export type TriageRoute = (typeof TRIAGE_ROUTES)[number];

/** Priority is an internal queue ordering only. */
export const TRIAGE_PRIORITIES = ['STANDARD', 'ELEVATED', 'SAFETY_REVIEW'] as const;

export type TriagePriority = (typeof TRIAGE_PRIORITIES)[number];

export interface TriageRecord {
  readonly route: TriageRoute;
  readonly priority: TriagePriority;
  /** True when a human must assess the vessel before any compatibility statement. */
  readonly requiresVesselSurvey: boolean;
  /** True when safety-critical evidence must exist before any progression. */
  readonly requiresSafetyEvidence: boolean;
  /** Question ids the buyer must complete first; empty when nothing is missing. */
  readonly pendingQuestionIds: readonly string[];
  readonly quotationProvided: false;
  readonly priceProvided: false;
  readonly orderable: false;
}

const SAFETY_SENSITIVE_BUNDLES = new Set(['SAIL', 'COMPLETE']);

/**
 * Map an outcome to its internal route.
 *
 * The eligible route is reachable only for a genuine `ELIGIBLE_SELF_INSTALL`
 * result, which the engine cannot produce while the validated rule set is empty.
 * An unrecognised outcome fails closed to the most conservative route.
 */
export function triageFor(result: ConfiguratorResult): TriageRecord {
  const safetySensitive = SAFETY_SENSITIVE_BUNDLES.has(result.bundleId);

  switch (result.outcome as ConfiguratorOutcome) {
    case 'INSUFFICIENT_INFORMATION':
      return record('INFORMATION_REQUEST', 'STANDARD', {
        pendingQuestionIds: result.unresolvedQuestionIds,
      });
    case 'NOT_SUPPORTED':
      return record('SPECIALIST_ASSESSMENT', safetySensitive ? 'SAFETY_REVIEW' : 'ELEVATED', {
        requiresVesselSurvey: true,
        requiresSafetyEvidence: safetySensitive,
      });
    case 'INSTALLER_ASSESSMENT_REQUIRED':
      return record('INSTALLER_SURVEY', safetySensitive ? 'SAFETY_REVIEW' : 'ELEVATED', {
        requiresVesselSurvey: true,
        requiresSafetyEvidence: safetySensitive,
      });
    case 'ELIGIBLE_SELF_INSTALL':
      return record('SELF_INSTALL_REVIEW', 'STANDARD', {
        requiresVesselSurvey: false,
        requiresSafetyEvidence: safetySensitive,
      });
    default:
      return record('SPECIALIST_ASSESSMENT', 'SAFETY_REVIEW', {
        requiresVesselSurvey: true,
        requiresSafetyEvidence: true,
      });
  }
}

interface TriageExtras {
  readonly requiresVesselSurvey?: boolean;
  readonly requiresSafetyEvidence?: boolean;
  readonly pendingQuestionIds?: readonly string[];
}

function record(route: TriageRoute, priority: TriagePriority, extras: TriageExtras = {}): TriageRecord {
  return {
    route,
    priority,
    requiresVesselSurvey: extras.requiresVesselSurvey ?? false,
    requiresSafetyEvidence: extras.requiresSafetyEvidence ?? false,
    pendingQuestionIds: extras.pendingQuestionIds ?? [],
    quotationProvided: false,
    priceProvided: false,
    orderable: false,
  };
}

/**
 * The next action a buyer may be offered. There is no purchase step and no
 * "request a quote" action that would imply a price can be produced today.
 */
export function nextActionFor(outcome: ConfiguratorOutcome): string {
  switch (outcome) {
    case 'INSUFFICIENT_INFORMATION':
      return 'COMPLETE_REMAINING_FIELDS';
    case 'NOT_SUPPORTED':
      return 'READ_EXCLUSION_NOTICE';
    case 'INSTALLER_ASSESSMENT_REQUIRED':
      return 'REQUEST_INSTALLER_ASSESSMENT';
    case 'ELIGIBLE_SELF_INSTALL':
      return 'REVIEW_DOCUMENTED_STEPS';
    default:
      return 'CONTACT_SPECIALIST';
  }
}

/** Fail-closed: any value outside the vocabulary is not a known outcome. */
export function isTriageRoute(value: unknown): value is TriageRoute {
  return typeof value === 'string' && (TRIAGE_ROUTES as readonly string[]).includes(value);
}
