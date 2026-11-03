import type { MareaCopyKey } from '../core/i18n';
import type {
  MareaBlockedSignal,
  MareaCommercialInput,
  MareaCommercialPresentation,
  MareaCtaState,
  MareaDefinitionStatus,
  MareaRestrictionKind,
} from '../core/types';

const CTA_STATES: readonly MareaCtaState[] = ['DISABLED', 'COMING_SOON', 'REQUEST_INFORMATION', 'QUOTE_ONLY', 'NOT_AVAILABLE'];

/**
 * MC-17 fail-closed commercial adapter.
 *
 * This is a presentation guard, not the authoritative commercial evaluator: the
 * server-side evaluator remains the final control. Its job is to make sure the
 * design system cannot render a purchase path, a price or a stock quantity even
 * when upstream data is malformed or contradicts the global release gate.
 */
export function deriveCommercialPresentation(input: MareaCommercialInput): MareaCommercialPresentation {
  const blockedSignals: MareaBlockedSignal[] = [];
  if (input.buyCtaAllowed !== false) blockedSignals.push('BUY_CTA');
  if (input.cartAllowed !== false) blockedSignals.push('CART');
  if (input.priceVisible !== false) blockedSignals.push('PRICE_VISIBILITY');
  if (input.availabilityVisible !== false) blockedSignals.push('AVAILABILITY_VISIBILITY');

  // A gate that is not explicitly open is closed. There is no MC-17 path that opens it.
  const gateOpen = input.releaseGateOpen === true;

  return {
    ctaState: sanitizeCtaState(input.ctaState),
    // Invariants: a presentation component can never enable a purchase or a cart.
    purchaseActionAllowed: false,
    cartAllowed: false,
    priceVisible: false,
    availabilityVisible: false,
    restrictions: [...new Set(input.restrictions)],
    blockedSignals: gateOpen ? [] : blockedSignals,
  };
}

/** Unknown, missing or non-string states resolve to the most restrictive state. */
export function sanitizeCtaState(state: unknown): MareaCtaState {
  return typeof state === 'string' && (CTA_STATES as readonly string[]).includes(state) ? (state as MareaCtaState) : 'NOT_AVAILABLE';
}

export interface MareaCtaSource {
  readonly definitionStatus: MareaDefinitionStatus;
  readonly editionType: string;
  readonly requiresQuotation: boolean;
  readonly familyId?: string;
  readonly contractedSolution?: boolean;
  readonly informational?: boolean;
}

/**
 * Derives the CTA category from MC-16 domain input. Documented precedence:
 * installation/contract-only or quotation-required entities are QUOTE_ONLY;
 * conditional definitions are COMING_SOON; informational surfaces are
 * REQUEST_INFORMATION; everything else is DISABLED (a defined entity with no
 * public action authorised). NOT_AVAILABLE is reserved for unknown/malformed
 * input or an explicitly retired/out-of-scope entity.
 *
 * Safety and legal restrictions never change this derivation into a purchase:
 * they are surfaced separately as restriction notices and readiness labels.
 */
export function deriveCtaState(source: MareaCtaSource): MareaCtaState {
  if (!source || typeof source !== 'object') return 'NOT_AVAILABLE';
  if (source.definitionStatus === 'INSTALLATION_PACKAGE') return 'QUOTE_ONLY';
  if (source.requiresQuotation || source.contractedSolution) return 'QUOTE_ONLY';
  if (source.definitionStatus === 'CONDITIONAL') return 'COMING_SOON';
  if (source.informational) return 'REQUEST_INFORMATION';
  if (source.definitionStatus === 'DEFINED') return 'DISABLED';
  return 'NOT_AVAILABLE';
}

const RESTRICTION_COPY: Readonly<Record<MareaRestrictionKind, MareaCopyKey>> = {
  PUBLICATION_NOT_AUTHORIZED: 'publicationNotAuthorized',
  TRADEMARK_NOT_CLEARED: 'provisionalBrand',
  SAFETY_GATE_BLOCKED: 'pilotSupervised',
  LICENSING_NOT_CLEARED: 'navWeatherLicensing',
  COMPATIBILITY_UNTESTED: 'compatibilityUnverified',
  PRICE_NOT_APPROVED: 'priceUnavailable',
  STOCK_NOT_VERIFIED: 'stockUnavailable',
  BRAND_PROVISIONAL: 'provisionalBrand',
};

export type MareaCopyKeyForRestriction = (typeof RESTRICTION_COPY)[MareaRestrictionKind];

export function restrictionCopyKey(kind: MareaRestrictionKind): MareaCopyKeyForRestriction {
  return RESTRICTION_COPY[kind] ?? 'permission';
}

/** Family-specific limits that must never be dropped from a rendered specimen. */
export const FAMILY_LIMIT_KEYS: Readonly<Record<string, MareaCopyKey>> = {
  PILOT: 'pilotSupervised',
  AIS: 'aisReceiveOnly',
  SENSE: 'localSafetyIndependent',
  WATCH: 'watchNoGuarantee',
  FLEET: 'fleetNoHardware',
  NAV: 'navWeatherLicensing',
  WEATHER: 'navWeatherLicensing',
  DISPLAY: 'displayConditional',
};
