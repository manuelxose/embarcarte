/**
 * MC-25 internal SKU governance lifecycle.
 *
 * This is the ADMIN governance lifecycle, not the MC-16 product lifecycle
 * (`CONCEPT … COMMERCIALLY_AVAILABLE`). It describes how far an internal
 * reviewer may take a candidate commercial SKU through evidence collection.
 *
 * Five states, mirroring the milestone brief:
 *
 *   DRAFT              record created, nothing assessed
 *   INCOMPLETE         definition recorded, commercial prerequisites missing
 *   AWAITING_EVIDENCE  evidence requested from the responsible owner
 *   BLOCKED            a hard blocker prevents progress
 *   READY_FOR_REVIEW   every internal prerequisite is satisfied; review may start
 *
 * There is NO orderable, sellable, published or publicly available state. Not
 * "unreachable today": absent from the vocabulary. `ORDERABLE` cannot be reached
 * by a transition because no state or transition names it.
 *
 * Every transition is a guarded, auditable intent. `transition()` is pure: it
 * never persists, never calls a backend and returns `persisted: false`. With the
 * current fact base no guarded transition is permitted, so an admin screen
 * cannot promote anything by clicking.
 */
import { GOVERNANCE_SNAPSHOT } from './governance-facts';

/** The only governance lifecycle states. Order is the contract order. */
export const SKU_GOVERNANCE_STATES = [
  'DRAFT',
  'INCOMPLETE',
  'AWAITING_EVIDENCE',
  'BLOCKED',
  'READY_FOR_REVIEW',
] as const;

export type SkuGovernanceState = (typeof SKU_GOVERNANCE_STATES)[number];

/**
 * State names that must never appear in the governance vocabulary. A promotion
 * to any of them would be a commercial claim this milestone cannot support.
 */
export const PROHIBITED_GOVERNANCE_STATE_NAMES = [
  'ORDERABLE',
  'SELLABLE',
  'FOR_SALE',
  'COMMERCIALLY_AVAILABLE',
  'PUBLISHED',
  'AVAILABLE',
] as const;

/** READY_FOR_REVIEW is terminal because no verified approval backend exists. */
export const READY_FOR_REVIEW_TERMINAL_REASON = 'NO_VERIFIED_APPROVAL_BACKEND';

/** Guards that must all hold before an evidence-gated transition is permitted. */
export interface LifecycleGuardContext {
  /** Every prerequisite evidence item is present and content-bound. */
  readonly evidenceComplete: boolean;
  /** Every referenced MC-02 blocker is closed with external evidence. */
  readonly blockersResolved: boolean;
  /** An authorised reviewer approval exists in an approved store. */
  readonly reviewAuthorized: boolean;
  /** The approval/persistence backend has been verified. */
  readonly approvalBackendVerified: boolean;
}

/**
 * The current guard context. Every value is false because the corresponding
 * external fact does not exist: 0/13 release gates closed, 0 approved prices,
 * 0 verified stock rows, and no MAREA SKU approval backend.
 */
export const CURRENT_LIFECYCLE_CONTEXT: LifecycleGuardContext = Object.freeze({
  evidenceComplete: false,
  blockersResolved: false,
  reviewAuthorized: false,
  approvalBackendVerified: false,
});

export type LifecycleGuard = (context: LifecycleGuardContext) => boolean;

export interface SkuLifecycleTransition {
  readonly transitionId: string;
  readonly fromState: SkuGovernanceState;
  readonly toState: SkuGovernanceState;
  readonly trigger: string;
  /** Human-readable reason printed when the guard refuses. */
  readonly guardRefusalCode: string;
  readonly guard: LifecycleGuard;
}

const open: LifecycleGuard = () => true;

/** Every legal transition. Anything else is rejected by `transition`. */
export const SKU_LIFECYCLE_TRANSITIONS: readonly SkuLifecycleTransition[] = Object.freeze([
  {
    transitionId: 'T-DRAFT-INCOMPLETE',
    fromState: 'DRAFT',
    toState: 'INCOMPLETE',
    trigger: 'RECORD_DEFINITION',
    guardRefusalCode: 'NEVER_REFUSED',
    guard: open,
  },
  {
    transitionId: 'T-DRAFT-BLOCKED',
    fromState: 'DRAFT',
    toState: 'BLOCKED',
    trigger: 'RECORD_HARD_BLOCKER',
    guardRefusalCode: 'NEVER_REFUSED',
    guard: open,
  },
  {
    transitionId: 'T-INCOMPLETE-AWAITING',
    fromState: 'INCOMPLETE',
    toState: 'AWAITING_EVIDENCE',
    trigger: 'REQUEST_EVIDENCE',
    guardRefusalCode: 'NEVER_REFUSED',
    guard: open,
  },
  {
    transitionId: 'T-INCOMPLETE-BLOCKED',
    fromState: 'INCOMPLETE',
    toState: 'BLOCKED',
    trigger: 'RECORD_HARD_BLOCKER',
    guardRefusalCode: 'NEVER_REFUSED',
    guard: open,
  },
  {
    transitionId: 'T-AWAITING-INCOMPLETE',
    fromState: 'AWAITING_EVIDENCE',
    toState: 'INCOMPLETE',
    trigger: 'EVIDENCE_REJECTED',
    guardRefusalCode: 'NEVER_REFUSED',
    guard: open,
  },
  {
    transitionId: 'T-BLOCKED-AWAITING',
    fromState: 'BLOCKED',
    toState: 'AWAITING_EVIDENCE',
    trigger: 'BLOCKER_RESOLVED',
    guardRefusalCode: 'BLOCKERS_NOT_RESOLVED',
    guard: (context) => context.blockersResolved,
  },
  {
    transitionId: 'T-AWAITING-READY',
    fromState: 'AWAITING_EVIDENCE',
    toState: 'READY_FOR_REVIEW',
    trigger: 'EVIDENCE_ACCEPTED',
    guardRefusalCode: 'EVIDENCE_INCOMPLETE',
    guard: (context) =>
      context.evidenceComplete && context.blockersResolved && context.approvalBackendVerified,
  },
]);

export const TRANSITION_BY_ID: ReadonlyMap<string, SkuLifecycleTransition> = new Map(
  SKU_LIFECYCLE_TRANSITIONS.map((transition) => [transition.transitionId, transition]),
);

/** True when the value is one of the five governance states. */
export function isGovernanceState(value: unknown): value is SkuGovernanceState {
  return typeof value === 'string' && (SKU_GOVERNANCE_STATES as readonly string[]).includes(value);
}

/** Legal transitions out of a state, before guards are applied. */
export function legalTransitionsFrom(from: SkuGovernanceState): readonly SkuLifecycleTransition[] {
  return SKU_LIFECYCLE_TRANSITIONS.filter((transition) => transition.fromState === from);
}

export interface TransitionOption {
  readonly transitionId: string;
  readonly toState: SkuGovernanceState;
  readonly trigger: string;
  readonly permitted: boolean;
  readonly refusalCode: string | null;
}

/**
 * Lifecycle eligibility for one state, evaluated against the current context.
 * Every gated option is refused today; the UI prints `refusalCode`.
 */
export function transitionOptions(from: SkuGovernanceState): readonly TransitionOption[] {
  return legalTransitionsFrom(from).map((transition) => {
    const permitted = transition.guard(CURRENT_LIFECYCLE_CONTEXT);
    return {
      transitionId: transition.transitionId,
      toState: transition.toState,
      trigger: transition.trigger,
      permitted,
      refusalCode: permitted ? null : transition.guardRefusalCode,
    };
  });
}

export type TransitionResult =
  | {
      readonly ok: true;
      readonly transitionId: string;
      readonly fromState: SkuGovernanceState;
      readonly toState: SkuGovernanceState;
      readonly auditDraft: string;
      /** `ok` means "legal and permitted by the guard", not "applied". */
      /** Nothing is ever applied: there is no approval backend. */
      readonly applied: false;
      readonly persisted: false;
    }
  | {
      readonly ok: false;
      readonly code:
        'UNKNOWN_FROM_STATE' | 'UNKNOWN_TO_STATE' | 'INVALID_TRANSITION' | 'GUARD_REFUSED';
      readonly fromState: unknown;
      readonly toState: unknown;
      readonly refusalCode: string | null;
      readonly applied: false;
      readonly persisted: false;
    };

/**
 * Attempt one lifecycle transition.
 *
 * Pure and non-persistent by design: there is no approval backend to write to,
 * so the function reports what a governance system WOULD do and refuses every
 * guarded move while the external evidence is missing.
 */
export function transition(from: unknown, to: unknown): TransitionResult {
  if (!isGovernanceState(from)) {
    return {
      ok: false,
      code: 'UNKNOWN_FROM_STATE',
      fromState: from,
      toState: to,
      refusalCode: null,
      applied: false,
      persisted: false,
    };
  }
  if (!isGovernanceState(to)) {
    return {
      ok: false,
      code: 'UNKNOWN_TO_STATE',
      fromState: from,
      toState: to,
      refusalCode: null,
      applied: false,
      persisted: false,
    };
  }
  const match = SKU_LIFECYCLE_TRANSITIONS.find(
    (candidate) => candidate.fromState === from && candidate.toState === to,
  );
  if (!match) {
    return {
      ok: false,
      code: 'INVALID_TRANSITION',
      fromState: from,
      toState: to,
      refusalCode: null,
      applied: false,
      persisted: false,
    };
  }
  if (!match.guard(CURRENT_LIFECYCLE_CONTEXT)) {
    return {
      ok: false,
      code: 'GUARD_REFUSED',
      fromState: from,
      toState: to,
      refusalCode: match.guardRefusalCode,
      applied: false,
      persisted: false,
    };
  }
  return {
    ok: true,
    transitionId: match.transitionId,
    fromState: from,
    toState: to,
    auditDraft: `${match.transitionId}:${from}->${to}:NOT_PERSISTED`,
    applied: false,
    persisted: false,
  };
}

/**
 * The MC-16 product lifecycle states, kept READ-ONLY for reference. The
 * governance lifecycle never promotes into these states; the current contract
 * evidence reaches `DEFINED` only.
 */
export const MC16_PRODUCT_LIFECYCLE_STATES = GOVERNANCE_SNAPSHOT.lifecycleStates;

/** Facts the lifecycle publishes about itself. */
export const SKU_LIFECYCLE_FACTS = Object.freeze({
  stateCount: SKU_GOVERNANCE_STATES.length,
  transitionCount: SKU_LIFECYCLE_TRANSITIONS.length,
  terminalStates: Object.freeze(['READY_FOR_REVIEW'] as const),
  orderableStates: 0,
  persistedTransitions: 0,
});

/** The subset of a readiness decision the state derivation needs. */
export interface GovernanceStateInput {
  readonly commercialOrderability: 'ORDERABLE' | 'NOT_ORDERABLE';
  readonly mc02BlockerIds: readonly string[];
  readonly missingPrerequisites: readonly string[];
}

/**
 * Derive the internal governance state from a readiness decision.
 *
 * Determined, never authored: an open MC-02 blocker means BLOCKED; missing
 * evidence without a hard blocker means AWAITING_EVIDENCE; a complete but
 * unapproved record is INCOMPLETE. A commercially orderable decision still maps
 * to READY_FOR_REVIEW — never to a sale state, which does not exist.
 */
export function governanceStateOf(decision: GovernanceStateInput): SkuGovernanceState {
  if (decision.mc02BlockerIds.length > 0) return 'BLOCKED';
  if (decision.missingPrerequisites.length > 0) return 'AWAITING_EVIDENCE';
  if (decision.commercialOrderability === 'ORDERABLE') return 'READY_FOR_REVIEW';
  return 'INCOMPLETE';
}
