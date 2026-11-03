/**
 * MC-17 design system — presentation contracts.
 *
 * These types are the boundary between MC-16 domain data and the isolated
 * presentation components. They are intentionally narrower than the MC-16
 * datasets: no price amount, no stock quantity, no customer/vessel data and no
 * certification flag can enter a rendered MAREA specimen through this contract.
 */

export type MareaLocale = 'es' | 'en';

export type MareaMode = 'web-light' | 'instrument-day' | 'instrument-sunlight' | 'instrument-night';

export type MareaContext = 'corporate' | 'instrument';

/** Status tones are semantic; colour never carries the meaning on its own. */
export type MareaTone = 'critical' | 'warning' | 'safe' | 'stale' | 'info' | 'neutral';

/** MC-16 definition status. An edition is never a merchant SKU. */
export type MareaDefinitionStatus = 'DEFINED' | 'CONDITIONAL' | 'INSTALLATION_PACKAGE';

/** The five MC-16 CTA states. Derived, never authored as marketing copy. */
export type MareaCtaState = 'DISABLED' | 'COMING_SOON' | 'REQUEST_INFORMATION' | 'QUOTE_ONLY' | 'NOT_AVAILABLE';

/** Derived readiness label. Never promoted by a page render. */
export type MareaReadinessStatus = 'READY' | 'NOT_READY' | 'BLOCKED' | 'NOT_ASSESSED';

/** Gate-derived restriction categories used by permission notices. */
export type MareaRestrictionKind =
  | 'PUBLICATION_NOT_AUTHORIZED'
  | 'TRADEMARK_NOT_CLEARED'
  | 'SAFETY_GATE_BLOCKED'
  | 'LICENSING_NOT_CLEARED'
  | 'COMPATIBILITY_UNTESTED'
  | 'PRICE_NOT_APPROVED'
  | 'STOCK_NOT_VERIFIED'
  | 'BRAND_PROVISIONAL';

/** Data-quality labels. "Verified" is never inferred by a component. */
export type MareaDataStatus = 'VERIFIED' | 'PARTIAL' | 'UNVERIFIED' | 'STALE' | 'MISSING';

export type MareaFreshnessState = 'FRESH' | 'STALE' | 'OFFLINE' | 'NO_DATA';

export type MareaConnectivityState = 'ONLINE' | 'DEGRADED' | 'OFFLINE' | 'UNKNOWN';

export type MareaSensorState = 'NOT_INSTALLED' | 'NO_SIGNAL' | 'ERROR' | 'CALIBRATING' | 'UNLICENSED';

export type MareaInclusion = 'INCLUDED' | 'OPTIONAL' | 'CONDITIONAL' | 'QUOTATION_REQUIRED' | 'EXCLUDED' | 'CONTRACT_ONLY';

export type MareaDocumentationStatus = 'AVAILABLE' | 'PENDING';

/** Safe synthetic fixture classification. Any other value fails the design-system tests. */
export type MareaFixtureClass = 'SYNTHETIC_INTERNAL_FIXTURE';

/** Bilingual text with structurally enforced ES/EN parity. */
export interface MareaLocalizedText {
  readonly es: string;
  readonly en: string;
}

export interface MareaFamilySummary {
  readonly familyId: string;
  readonly displayName: string;
  readonly definitionStatus: MareaDefinitionStatus;
  readonly editionCount: number;
  readonly readiness: MareaReadinessStatus;
  readonly summary: MareaLocalizedText;
  readonly restrictions: readonly MareaRestrictionKind[];
}

export interface MareaEditionSummary {
  readonly editionId: string;
  readonly familyId: string;
  readonly displayName: string;
  readonly definitionStatus: MareaDefinitionStatus;
  readonly editionType: string;
  readonly readiness: MareaReadinessStatus;
  readonly requiresQuotation: boolean;
  readonly restrictions: readonly MareaRestrictionKind[];
}

export interface MareaReadinessDimension {
  readonly dimension: string;
  readonly label: string;
  readonly status: MareaReadinessStatus;
  readonly note: string | null;
}

export interface MareaReadinessSummary {
  readonly dimensions: readonly MareaReadinessDimension[];
  readonly overall: MareaReadinessStatus;
  readonly blockedGateIds: readonly string[];
}

export interface MareaBundleLine {
  readonly lineId: string;
  readonly editionId: string;
  readonly displayName: string;
  readonly inclusion: MareaInclusion;
  readonly required: boolean;
  readonly quantity: number;
  /** Kit expansions (for example SENSE-ESSENTIALS → POWER + BILGE). Never counted as extra lines. */
  readonly expandsTo: readonly string[];
}

export interface MareaBundleExclusion {
  readonly editionId: string;
  readonly displayName: string;
  readonly reason: string;
}

export interface MareaBundleSummary {
  readonly bundleId: string;
  readonly displayName: string;
  readonly components: readonly MareaBundleLine[];
  readonly optionalComponents: readonly MareaBundleLine[];
  readonly contractOnly: readonly MareaBundleExclusion[];
  readonly ineligible: readonly MareaBundleExclusion[];
  readonly externalRequirements: readonly string[];
  readonly contractedSolution: boolean;
  readonly hardwareIncludedByDefault: boolean;
  readonly slaEstablished: boolean;
  readonly restrictions: readonly MareaRestrictionKind[];
}

export interface MareaEntitlement {
  readonly entitlementId: string;
  readonly name: string;
  readonly term: string;
  /** Entitlements that share one ledger must never be presented as two separately billable rights. */
  readonly sharedLedgerKey: string | null;
  readonly localSafetyIndependent: boolean;
  readonly note: string | null;
}

export interface MareaDocumentationItem {
  readonly title: string;
  readonly kind: string;
  readonly status: MareaDocumentationStatus;
  readonly limitation: string | null;
}

/** Fail-closed commercial presentation input. */
export interface MareaCommercialInput {
  /** Global release gate. MC-17 always renders with this closed. */
  readonly releaseGateOpen: boolean;
  /** Upstream hint; a true value while the gate is closed is inverted by the adapter. */
  readonly buyCtaAllowed: boolean;
  readonly cartAllowed: boolean;
  readonly priceVisible: boolean;
  readonly availabilityVisible: boolean;
  readonly ctaState: MareaCtaState;
  readonly restrictions: readonly MareaRestrictionKind[];
}

export interface MareaCommercialPresentation {
  readonly ctaState: MareaCtaState;
  /** Always false in MC-17: no purchase action can be rendered. */
  readonly purchaseActionAllowed: boolean;
  readonly cartAllowed: boolean;
  /** Always false in MC-17: no price amount is representable. */
  readonly priceVisible: boolean;
  /** Always false in MC-17: no stock quantity is representable. */
  readonly availabilityVisible: boolean;
  readonly restrictions: readonly MareaRestrictionKind[];
  /** Non-empty when an unauthorised upstream signal was neutralised. */
  readonly blockedSignals: readonly MareaBlockedSignal[];
}

export type MareaBlockedSignal = 'BUY_CTA' | 'CART' | 'PRICE_VISIBILITY' | 'AVAILABILITY_VISIBILITY';

export interface MareaInstrumentReadout {
  /** Pre-formatted by the domain layer; components never locale-format numeric values. */
  readonly value: string | null;
  readonly unit: string;
  readonly label: string;
  readonly precisionNote: string | null;
  readonly freshness: MareaFreshnessState;
  readonly ageSeconds: number | null;
  readonly demo: true;
}

export interface MareaTelemetryItem {
  readonly id: string;
  readonly label: string;
  readonly value: string | null;
  readonly unit: string;
  readonly freshness: MareaFreshnessState;
  readonly ageSeconds: number | null;
}
