/**
 * MC-25 administration authorization boundary.
 *
 * The internal governance screen is reachable only through the isolated preview
 * (loopback binding, host allow-list, noindex). Reachability is not authority:
 * the security control lives here, in the business logic, and it does not rely
 * on a hidden button, a disabled attribute or CSS.
 *
 * Three facts decide every action:
 *
 *  1. Is the action read-only? Inspection is allowed; it changes nothing.
 *  2. Are the action and the target permitted at all? Approving a merchant SKU,
 *     marking a SKU orderable and publishing a SKU have NO implementation in
 *     this milestone and no approval backend exists, so they are prohibited.
 *  3. Does a verified authorization mechanism AND an authorized persistence
 *     contract exist? Neither exists for MAREA SKUs. Every mutating request is
 *     therefore refused, including one made by a principal that claims the
 *     right role and a verified session.
 *
 * `submitReviewAction` is the single entry point the UI calls. It is pure: no
 * fetch, no storage, no clock. `applied` is false for every request today.
 */
import { isGovernanceEditionId } from './governance-facts';

/** Internal review actions the governance screen can offer. */
export const ADMIN_ACTIONS = [
  'INSPECT_READINESS',
  'EVALUATE_READINESS',
  'REQUEST_EVIDENCE',
  'RECORD_REVIEW_DECISION',
  'APPROVE_MERCHANT_SKU',
  'MARK_ORDERABLE',
  'PUBLISH_SKU',
] as const;

export type AdminAction = (typeof ADMIN_ACTIONS)[number];

/**
 * Actions with no implementation and no legal basis in this milestone. They are
 * refused for every principal, including a hypothetical fully authenticated one.
 */
export const PROHIBITED_ADMIN_ACTIONS: readonly AdminAction[] = Object.freeze([
  'APPROVE_MERCHANT_SKU',
  'MARK_ORDERABLE',
  'PUBLISH_SKU',
]);

/** Read-only actions: they compute, they never change a stored fact. */
export const READ_ONLY_ADMIN_ACTIONS: readonly AdminAction[] = Object.freeze([
  'INSPECT_READINESS',
  'EVALUATE_READINESS',
]);

export const ADMIN_ROLES = [
  'ANONYMOUS',
  'SKU_GOVERNANCE_REVIEWER',
  'COMMERCIAL_DIRECTOR',
  'PROGRAMME_LEAD',
] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

export type AuthorizationMechanism = 'VERIFIED_SESSION' | 'NONE';

export interface AdminPrincipal {
  readonly role: AdminRole;
  readonly authenticated: boolean;
  readonly authorizationMechanism: AuthorizationMechanism;
  readonly principalRef: string;
}

/**
 * The principal the isolated preview actually has: no session, no mechanism.
 * There is no login, no session store and no MAREA SKU approval backend.
 */
export const CURRENT_PRINCIPAL: AdminPrincipal = Object.freeze({
  role: 'ANONYMOUS',
  authenticated: false,
  authorizationMechanism: 'NONE',
  principalRef: 'INTERNAL_PREVIEW_UNVERIFIED',
});

/** The persistence contract for MAREA SKU approvals. It does not exist. */
export const APPROVAL_PERSISTENCE_CONTRACT: 'ABSENT' = 'ABSENT';

export type AuthorizationRefusalCode =
  | 'UNKNOWN_ACTION'
  | 'ACTION_PROHIBITED_BY_INVARIANT'
  | 'NO_VERIFIED_AUTHORIZATION_MECHANISM'
  | 'ROLE_NOT_AUTHORIZED'
  | 'NO_AUTHORIZED_PERSISTENCE_CONTRACT';

export interface AuthorizationDecision {
  readonly action: string;
  readonly allowed: boolean;
  readonly readOnly: boolean;
  readonly code: 'READ_ONLY_ALLOWED' | 'AUTHORIZED' | AuthorizationRefusalCode;
  readonly reasons: readonly string[];
  readonly principalRef: string;
}

/** Role → actions an authorized principal could perform, if a backend existed. */
const ROLE_ACTIONS: Readonly<Record<AdminRole, readonly AdminAction[]>> = Object.freeze({
  ANONYMOUS: [],
  SKU_GOVERNANCE_REVIEWER: ['REQUEST_EVIDENCE', 'RECORD_REVIEW_DECISION'],
  COMMERCIAL_DIRECTOR: ['REQUEST_EVIDENCE', 'RECORD_REVIEW_DECISION'],
  PROGRAMME_LEAD: ['REQUEST_EVIDENCE', 'RECORD_REVIEW_DECISION'],
});

function isAdminAction(value: unknown): value is AdminAction {
  return typeof value === 'string' && (ADMIN_ACTIONS as readonly string[]).includes(value);
}

function isAdminRole(value: unknown): value is AdminRole {
  return typeof value === 'string' && (ADMIN_ROLES as readonly string[]).includes(value);
}

/**
 * Decide whether an action may be performed.
 *
 * Fail-closed order: unknown action, prohibited invariant, read-only, mechanism,
 * role, persistence contract. Read-only inspection needs no role because it
 * cannot change anything; every mutation needs all of them.
 */
export function authorizeAdminAction(
  action: unknown,
  principal: AdminPrincipal = CURRENT_PRINCIPAL,
): AuthorizationDecision {
  // Total function: a null/malformed principal degrades to the anonymous one
  // instead of throwing (AUD-07).
  const actor = safePrincipal(principal);
  if (!isAdminAction(action)) {
    return {
      action: typeof action === 'string' ? action.slice(0, 120) : 'UNKNOWN_ACTION',
      allowed: false,
      readOnly: false,
      code: 'UNKNOWN_ACTION',
      reasons: ['the action is not part of the governance vocabulary'],
      principalRef: actor.principalRef,
    };
  }
  const readOnly = READ_ONLY_ADMIN_ACTIONS.includes(action);
  const base = { action, readOnly, principalRef: actor.principalRef };
  if (PROHIBITED_ADMIN_ACTIONS.includes(action)) {
    return {
      ...base,
      allowed: false,
      code: 'ACTION_PROHIBITED_BY_INVARIANT',
      reasons: [
        'no verified approval backend, merchant SKU registry or publication authority exists',
        'the milestone forbids inventing a commercial approval',
      ],
    };
  }
  if (readOnly) {
    return {
      ...base,
      allowed: true,
      code: 'READ_ONLY_ALLOWED',
      reasons: ['read-only inspection computes a decision and stores nothing'],
    };
  }
  if (actor.authorizationMechanism !== 'VERIFIED_SESSION' || !actor.authenticated) {
    return {
      ...base,
      allowed: false,
      code: 'NO_VERIFIED_AUTHORIZATION_MECHANISM',
      reasons: ['there is no verified session or administrative authentication mechanism'],
    };
  }
  if (!isAdminRole(actor.role) || !ROLE_ACTIONS[actor.role].includes(action)) {
    return {
      ...base,
      allowed: false,
      code: 'ROLE_NOT_AUTHORIZED',
      reasons: [`role ${actor.role} may not perform ${action}`],
    };
  }
  if (APPROVAL_PERSISTENCE_CONTRACT === 'ABSENT') {
    return {
      ...base,
      allowed: false,
      code: 'NO_AUTHORIZED_PERSISTENCE_CONTRACT',
      reasons: ['no authorized persistence contract exists for this action'],
    };
  }
  return { ...base, allowed: true, code: 'AUTHORIZED', reasons: [] };
}

export interface ReviewActionRequest {
  readonly action: string;
  readonly editionId?: string;
  readonly note?: string;
  readonly principal?: AdminPrincipal;
}

export interface ReviewActionOutcome {
  readonly action: string;
  readonly editionId: string | null;
  readonly applied: false;
  readonly persisted: false;
  readonly durableApproval: false;
  readonly authorization: AuthorizationDecision;
  /** What a governance system would record. Never written anywhere. */
  readonly auditDraft: string;
}

/**
 * Sanitise an untrusted string for the audit draft.
 *
 * Removes control characters (so a value cannot inject a newline into a log
 * line) and bounds the length. Non-strings become the fallback.
 */
function safeText(value: unknown, fallback: string): string {
  if (typeof value !== 'string') return fallback;
  const stripped = value.replace(/[\u0000-\u001f\u007f]/gu, ' ').trim();
  return stripped.length === 0 ? fallback : stripped.slice(0, 120);
}

function safePrincipal(value: unknown): AdminPrincipal {
  if (value === null || typeof value !== 'object') return CURRENT_PRINCIPAL;
  const candidate = value as Partial<AdminPrincipal>;
  return {
    role: isAdminRole(candidate.role) ? candidate.role : 'ANONYMOUS',
    authenticated: candidate.authenticated === true,
    authorizationMechanism:
      candidate.authorizationMechanism === 'VERIFIED_SESSION' ? 'VERIFIED_SESSION' : 'NONE',
    principalRef: safeText(candidate.principalRef, 'UNVERIFIED'),
  };
}

/**
 * The only mutation entry point. It CANNOT apply anything: no persistence
 * contract exists, so it reports the authorization decision and an audit draft.
 * Calling it directly — bypassing the UI entirely — is refused identically.
 *
 * Total function: a `null`/malformed request, a null-prototype principal or a
 * control-character subject is handled as a refusal, never as a crash.
 */
export function submitReviewAction(request?: ReviewActionRequest | null): ReviewActionOutcome {
  const input: Partial<ReviewActionRequest> =
    request !== null && typeof request === 'object' ? request : {};
  const action = safeText(input.action, 'UNKNOWN_ACTION');
  const principal = safePrincipal(input.principal);
  const authorization = authorizeAdminAction(action, principal);
  const rawEdition = safeText(input.editionId, '');
  // Only a canonical edition may appear in the draft; anything else is opaque.
  const editionId = isGovernanceEditionId(rawEdition) ? rawEdition : null;
  return Object.freeze({
    action,
    editionId,
    applied: false,
    persisted: false,
    durableApproval: false,
    authorization,
    auditDraft: `MC25-REVIEW:${action}:${editionId ?? 'NO-SUBJECT'}:${authorization.code}:NOT_PERSISTED`,
  });
}

/** Facts the authorization boundary publishes about itself. */
export const AUTHORIZATION_FACTS = Object.freeze({
  actionCount: ADMIN_ACTIONS.length,
  prohibitedActions: PROHIBITED_ADMIN_ACTIONS.length,
  readOnlyActions: READ_ONLY_ADMIN_ACTIONS.length,
  persistenceContract: APPROVAL_PERSISTENCE_CONTRACT,
  verifiedMechanisms: 0,
  currentPrincipalRole: CURRENT_PRINCIPAL.role,
});
