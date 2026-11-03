import type { MareaCopyKey } from '../core/i18n';
import type {
  MareaBlockedSignal,
  MareaCommercialInput,
  MareaCommercialPresentation,
  MareaCtaState,
  MareaDefinitionStatus,
  MareaRestrictionKind,
} from '../core/types';

const CTA_STATES: readonly MareaCtaState[] = [
  'DISABLED',
  'COMING_SOON',
  'REQUEST_INFORMATION',
  'QUOTE_ONLY',
  'NOT_AVAILABLE',
];

/**
 * MC-17 fail-closed commercial adapter.
 *
 * This is a presentation guard, not the authoritative commercial evaluator: the
 * server-side evaluator remains the final control. Its job is to make sure the
 * design system cannot render a purchase path, a price or a stock quantity even
 * when upstream data is malformed or contradicts the global release gate.
 */
export function deriveCommercialPresentation(
  input: MareaCommercialInput,
): MareaCommercialPresentation {
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
  return typeof state === 'string' && (CTA_STATES as readonly string[]).includes(state)
    ? (state as MareaCtaState)
    : 'NOT_AVAILABLE';
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

/**
 * Family-specific limits that must never be dropped from a rendered specimen.
 * Covers the nine MC-16 families. HUB has no dedicated limitation copy, so it
 * uses the existing compatibility limitation (its integration with third-party
 * equipment is not verified).
 */
export const FAMILY_LIMIT_KEYS: Readonly<Record<string, MareaCopyKey>> = {
  PILOT: 'pilotSupervised',
  AIS: 'aisReceiveOnly',
  SENSE: 'localSafetyIndependent',
  WATCH: 'watchNoGuarantee',
  FLEET: 'fleetNoHardware',
  NAV: 'navWeatherLicensing',
  WEATHER: 'navWeatherLicensing',
  DISPLAY: 'displayConditional',
  HUB: 'compatibilityUnverified',
};

/** Material gates first; generic commercial gates last. Ties keep input order. */
const RESTRICTION_PRIORITY: Readonly<Record<string, number>> = {
  SAFETY_GATE_BLOCKED: 0,
  LICENSING_NOT_CLEARED: 1,
  COMPATIBILITY_UNTESTED: 2,
  TRADEMARK_NOT_CLEARED: 3,
  BRAND_PROVISIONAL: 3,
  PRICE_NOT_APPROVED: 4,
  STOCK_NOT_VERIFIED: 5,
  PUBLICATION_NOT_AUTHORIZED: 6,
};

const VISIBLE_RESTRICTION_LIMIT = 4;

/**
 * Deterministically selects at most four visible restriction kinds.
 *
 * Safety, licensing and compatibility are ranked before generic commercial
 * gates, so an adversarial upstream order can never push a material limitation
 * out of the visible chips. Duplicates are removed by resulting copy key, which
 * also collapses TRADEMARK_NOT_CLEARED and BRAND_PROVISIONAL into one chip.
 * Unknown runtime kinds fall back to the permission copy instead of crashing.
 */
export function selectVisibleRestrictions(
  kinds: readonly MareaRestrictionKind[] | null | undefined,
  toCopyKey: (kind: MareaRestrictionKind) => MareaCopyKey,
): readonly MareaRestrictionKind[] {
  const source: readonly unknown[] = Array.isArray(kinds) ? kinds : [];
  const ranked: {
    kind: MareaRestrictionKind;
    key: MareaCopyKey;
    priority: number;
    index: number;
  }[] = [];
  for (let index = 0; index < source.length; index++) {
    const value = source[index];
    if (typeof value !== 'string') continue;
    const kind = value as MareaRestrictionKind;
    let key: MareaCopyKey;
    try {
      key = toCopyKey(kind) ?? 'permission';
    } catch {
      key = 'permission';
    }
    ranked.push({
      kind,
      key,
      priority: RESTRICTION_PRIORITY[kind] ?? Number.MAX_SAFE_INTEGER,
      index,
    });
  }
  ranked.sort((left, right) => left.priority - right.priority || left.index - right.index);

  const seen = new Set<MareaCopyKey>();
  const visible: MareaRestrictionKind[] = [];
  for (const entry of ranked) {
    if (seen.has(entry.key)) continue;
    seen.add(entry.key);
    visible.push(entry.kind);
    if (visible.length === VISIBLE_RESTRICTION_LIMIT) break;
  }
  return visible;
}
