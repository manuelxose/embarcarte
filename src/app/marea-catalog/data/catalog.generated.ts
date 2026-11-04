// GENERATED FILE - do not edit by hand.
// Source: docs/marea/commerce-data/data/{product-families,product-editions,bundle-compositions,readiness-dimensions}.json,
//         docs/marea/information-architecture/data/proposed-routes.json, docs/marea/legal-commercial/data/{release-evidence-gates,claims-policy}.json
// Generator: node scripts/build-mc20-catalog-data.mjs
// Projection: bounded internal MC-20 catalogue presentation (NAV, HUB, AIS).
// No price, stock, SKU, customer or vessel data. Publication: NOT_AUTHORIZED.
// Every commercial state below is NOT_FOR_SALE and every release gate is open.

export interface CatalogFamilyReadiness {
  readonly definition: string;
  readonly engineering: string;
  readonly licensing: string;
  readonly hardware: string;
  readonly dataRights: string;
  readonly compliance: string;
  readonly safety: string;
  readonly pricing: string;
  readonly brandPublication: string;
  readonly operations: string;
  readonly availability: string;
}

export interface CatalogBundleInclusion {
  readonly bundleId: string;
  readonly displayName: string;
  readonly routeId: string;
  readonly inclusion: string;
  readonly editionId: string;
}

export interface CatalogProposedRoute {
  readonly routeId: string;
  readonly pageType: string;
  readonly entityId: string;
  readonly es: string;
  readonly en: string;
  readonly status: string;
  readonly publicationStatus: string;
  readonly publicationAuthorized: false;
  readonly indexationAuthorized: false;
  readonly sitemapEligible: false;
  readonly collisionStatus: string;
}

export interface CatalogFamilyRecord {
  readonly familyId: string;
  readonly displayName: string;
  readonly productType: string;
  readonly lifecycleState: string;
  readonly definitionStatus: string;
  readonly publicationState: string;
  readonly commercialAvailability: string;
  readonly routeId: string;
  readonly editionIds: readonly string[];
  readonly engineeringStatus: string;
  readonly licensingStatus: string;
  readonly hardwareStatus: string;
  readonly dataRightsStatus: string;
  readonly complianceStatus: string;
  readonly safetyStatus: string;
  readonly operationsStatus: string;
  readonly priceStatus: string;
  readonly brandPublicationStatus: string;
  readonly readiness: CatalogFamilyReadiness;
  readonly releaseGateIds: readonly string[];
  readonly evidenceIds: readonly string[];
  readonly bundleInclusions: readonly CatalogBundleInclusion[];
  readonly proposedRoute: CatalogProposedRoute;
}

export interface CatalogEditionRecord {
  readonly editionId: string;
  readonly familyId: string;
  readonly editionType: string;
  readonly definitionStatus: string;
  readonly requiresQuotation: boolean;
  readonly merchantable: boolean;
  readonly priceApproved: boolean;
  readonly merchantSkuCode: string | null;
  readonly featureKeys: readonly string[];
  readonly notes: string | null;
}

export interface CatalogReadinessDimensionRecord {
  readonly dimension: string;
  readonly currentStatus: string;
}

export interface CatalogDomainFacts {
  readonly families: number;
  readonly editions: number;
  readonly bundlesReferencingScope: number;
  readonly readinessDimensions: number;
  readonly releaseGates: number;
  readonly releaseGatesClosed: number;
  readonly requiredDocuments: number;
  readonly documentsExecuted: number;
  readonly cataloguedClaims: number;
  readonly publicAuthorizedClaims: number;
  readonly approvedPrices: number;
  readonly merchantableEditions: number;
  readonly merchantSkuCodes: number;
  readonly verifiedStockRows: number;
  readonly testedCompatibilityRows: number;
}

export const CATALOG_SCOPE_FAMILY_IDS = ["NAV","HUB","AIS"] as const;
export type CatalogFamilyId = (typeof CATALOG_SCOPE_FAMILY_IDS)[number];

export const CATALOG_FAMILIES: readonly CatalogFamilyRecord[] = [
  {
    familyId: "NAV",
    displayName: "MAREA NAV",
    productType: "SOFTWARE",
    lifecycleState: "DEFINED",
    definitionStatus: "DEFINED",
    publicationState: "INTERNAL_ONLY",
    commercialAvailability: "NOT_FOR_SALE",
    routeId: "mareaFamilyNav",
    editionIds: ["NAV-ESSENTIAL","NAV-PRO"],
    engineeringStatus: "PARTIALLY_VERIFIED",
    licensingStatus: "NOT_CLEARED",
    hardwareStatus: "NOT_APPLICABLE_SOFTWARE_PRODUCT",
    dataRightsStatus: "NOT_GRANTED",
    complianceStatus: "NOT_STARTED",
    safetyStatus: "NOT_EVALUATED",
    operationsStatus: "NOT_READY",
    priceStatus: "HYPOTHESIS_UNAPPROVED",
    brandPublicationStatus: "NOT_GRANTED",
    readiness: {
      definition: "COMPLETE_TARGET_SPECIFICATION",
      engineering: "PARTIALLY_VERIFIED",
      licensing: "NOT_CLEARED",
      hardware: "NOT_APPLICABLE_SOFTWARE_PRODUCT",
      dataRights: "NOT_GRANTED",
      compliance: "NOT_STARTED",
      safety: "NOT_EVALUATED",
      pricing: "HYPOTHESIS_UNAPPROVED",
      brandPublication: "NOT_GRANTED",
      operations: "NOT_READY",
      availability: "NOT_FOR_SALE",
    },
    releaseGateIds: ["GATE-COMMERCIAL-CLAIMS","GATE-CONSUMER-TERMS","GATE-CRA-CYBERSECURITY","GATE-DATA-LICENSING","GATE-INSURANCE","GATE-IP-CLEARANCE","GATE-LEGAL-ENTITY","GATE-MARKET-PLACEMENT","GATE-PAYMENTS","GATE-PRICING","GATE-PRIVACY-DPA-DPIA","GATE-WEBSITE-REMEDIATION"],
    evidenceIds: ["EV-MC05-NAV","EV-MC15-HANDOFF","EV-MC14-GATES"],
    bundleInclusions: [
        { bundleId: "START", displayName: "MAREA START", routeId: "mareaSolutionStart", inclusion: "INCLUDED", editionId: "NAV-PRO" },
        { bundleId: "CRUISE", displayName: "MAREA CRUISE", routeId: "mareaSolutionCruise", inclusion: "INCLUDED", editionId: "NAV-ESSENTIAL" },
        { bundleId: "SAIL", displayName: "MAREA SAIL", routeId: "mareaSolutionSail", inclusion: "INCLUDED", editionId: "NAV-PRO" },
        { bundleId: "COMPLETE", displayName: "MAREA COMPLETE", routeId: "mareaSolutionComplete", inclusion: "INCLUDED", editionId: "NAV-PRO" },
    ],
    proposedRoute: {
      routeId: "mareaFamilyNav",
      pageType: "PRODUCT_FAMILY",
      entityId: "ENT-FAMILY-NAV",
      es: "marea/nav",
      en: "en/marea/nav",
      status: "PROPOSED_INTERNAL_NOT_DEPLOYABLE",
      publicationStatus: "PROPOSED_INTERNAL_NOT_DEPLOYABLE",
      publicationAuthorized: false,
      indexationAuthorized: false,
      sitemapEligible: false,
      collisionStatus: "NO_COLLISION",
    },
  },
  {
    familyId: "HUB",
    displayName: "MAREA HUB",
    productType: "HARDWARE",
    lifecycleState: "DEFINED",
    definitionStatus: "DEFINED",
    publicationState: "INTERNAL_ONLY",
    commercialAvailability: "NOT_FOR_SALE",
    routeId: "mareaFamilyHub",
    editionIds: ["HUB-STANDARD","HUB-PRO"],
    engineeringStatus: "PARTIALLY_VERIFIED",
    licensingStatus: "NOT_CLEARED",
    hardwareStatus: "NOT_SELECTED",
    dataRightsStatus: "NOT_GRANTED",
    complianceStatus: "NOT_STARTED",
    safetyStatus: "NOT_EVALUATED",
    operationsStatus: "NOT_READY",
    priceStatus: "HYPOTHESIS_UNAPPROVED",
    brandPublicationStatus: "NOT_GRANTED",
    readiness: {
      definition: "COMPLETE_TARGET_SPECIFICATION",
      engineering: "PARTIALLY_VERIFIED",
      licensing: "NOT_CLEARED",
      hardware: "NOT_SELECTED",
      dataRights: "NOT_GRANTED",
      compliance: "NOT_STARTED",
      safety: "NOT_EVALUATED",
      pricing: "HYPOTHESIS_UNAPPROVED",
      brandPublication: "NOT_GRANTED",
      operations: "NOT_READY",
      availability: "NOT_FOR_SALE",
    },
    releaseGateIds: ["GATE-COMMERCIAL-CLAIMS","GATE-CONSUMER-TERMS","GATE-CRA-CYBERSECURITY","GATE-INSURANCE","GATE-IP-CLEARANCE","GATE-LEGAL-ENTITY","GATE-MARKET-PLACEMENT","GATE-PAYMENTS","GATE-PRICING","GATE-WEBSITE-REMEDIATION"],
    evidenceIds: ["EV-MC05-HUB","EV-MC15-HANDOFF","EV-MC14-GATES"],
    bundleInclusions: [
        { bundleId: "START", displayName: "MAREA START", routeId: "mareaSolutionStart", inclusion: "INCLUDED", editionId: "HUB-STANDARD" },
        { bundleId: "CRUISE", displayName: "MAREA CRUISE", routeId: "mareaSolutionCruise", inclusion: "INCLUDED", editionId: "HUB-STANDARD" },
        { bundleId: "SAIL", displayName: "MAREA SAIL", routeId: "mareaSolutionSail", inclusion: "INCLUDED", editionId: "HUB-STANDARD" },
        { bundleId: "PROTECT", displayName: "MAREA PROTECT", routeId: "mareaSolutionProtect", inclusion: "OPTIONAL", editionId: "HUB-STANDARD" },
        { bundleId: "COMPLETE", displayName: "MAREA COMPLETE", routeId: "mareaSolutionComplete", inclusion: "INCLUDED", editionId: "HUB-PRO" },
        { bundleId: "FLEET", displayName: "MAREA FLEET", routeId: "mareaSolutionFleet", inclusion: "OPTIONAL", editionId: "HUB-STANDARD" },
    ],
    proposedRoute: {
      routeId: "mareaFamilyHub",
      pageType: "PRODUCT_FAMILY",
      entityId: "ENT-FAMILY-HUB",
      es: "marea/hub",
      en: "en/marea/hub",
      status: "PROPOSED_INTERNAL_NOT_DEPLOYABLE",
      publicationStatus: "PROPOSED_INTERNAL_NOT_DEPLOYABLE",
      publicationAuthorized: false,
      indexationAuthorized: false,
      sitemapEligible: false,
      collisionStatus: "NO_COLLISION",
    },
  },
  {
    familyId: "AIS",
    displayName: "MAREA AIS",
    productType: "HARDWARE",
    lifecycleState: "DEFINED",
    definitionStatus: "DEFINED",
    publicationState: "INTERNAL_ONLY",
    commercialAvailability: "NOT_FOR_SALE",
    routeId: "mareaFamilyAis",
    editionIds: ["AIS-RECEIVER","AIS-CONNECTED"],
    engineeringStatus: "NOT_VERIFIED",
    licensingStatus: "NOT_CLEARED",
    hardwareStatus: "NOT_SELECTED",
    dataRightsStatus: "NOT_GRANTED",
    complianceStatus: "NOT_STARTED",
    safetyStatus: "RECEIVE_ONLY_NO_TRANSMISSION",
    operationsStatus: "NOT_READY",
    priceStatus: "HYPOTHESIS_UNAPPROVED",
    brandPublicationStatus: "NOT_GRANTED",
    readiness: {
      definition: "COMPLETE_TARGET_SPECIFICATION",
      engineering: "NOT_VERIFIED",
      licensing: "NOT_CLEARED",
      hardware: "NOT_SELECTED",
      dataRights: "NOT_GRANTED",
      compliance: "NOT_STARTED",
      safety: "RECEIVE_ONLY_NO_TRANSMISSION",
      pricing: "HYPOTHESIS_UNAPPROVED",
      brandPublication: "NOT_GRANTED",
      operations: "NOT_READY",
      availability: "NOT_FOR_SALE",
    },
    releaseGateIds: ["GATE-COMMERCIAL-CLAIMS","GATE-CONSUMER-TERMS","GATE-CRA-CYBERSECURITY","GATE-DATA-LICENSING","GATE-INSURANCE","GATE-IP-CLEARANCE","GATE-LEGAL-ENTITY","GATE-MARKET-PLACEMENT","GATE-PAYMENTS","GATE-PRICING","GATE-WEBSITE-REMEDIATION"],
    evidenceIds: ["EV-MC05-AIS","EV-MC15-HANDOFF","EV-MC14-GATES"],
    bundleInclusions: [
        { bundleId: "CRUISE", displayName: "MAREA CRUISE", routeId: "mareaSolutionCruise", inclusion: "INCLUDED", editionId: "AIS-RECEIVER" },
        { bundleId: "COMPLETE", displayName: "MAREA COMPLETE", routeId: "mareaSolutionComplete", inclusion: "OPTIONAL", editionId: "AIS-RECEIVER" },
    ],
    proposedRoute: {
      routeId: "mareaFamilyAis",
      pageType: "PRODUCT_FAMILY",
      entityId: "ENT-FAMILY-AIS",
      es: "marea/ais",
      en: "en/marea/ais",
      status: "PROPOSED_INTERNAL_NOT_DEPLOYABLE",
      publicationStatus: "PROPOSED_INTERNAL_NOT_DEPLOYABLE",
      publicationAuthorized: false,
      indexationAuthorized: false,
      sitemapEligible: false,
      collisionStatus: "NO_COLLISION",
    },
  },
];

export const CATALOG_EDITIONS: readonly CatalogEditionRecord[] = [
  {
    editionId: "NAV-ESSENTIAL",
    familyId: "NAV",
    editionType: "SOFTWARE_SUBSCRIPTION",
    definitionStatus: "DEFINED",
    requiresQuotation: false,
    merchantable: false,
    priceApproved: false,
    merchantSkuCode: null,
    featureKeys: ["NAV_CHARTS","NAV_ROUTING","NAV_INSTRUMENTS","NAV_AIS_TARGETS"],
    notes: null,
  },
  {
    editionId: "NAV-PRO",
    familyId: "NAV",
    editionType: "SOFTWARE_SUBSCRIPTION",
    definitionStatus: "DEFINED",
    requiresQuotation: false,
    merchantable: false,
    priceApproved: false,
    merchantSkuCode: null,
    featureKeys: ["NAV_CHARTS","NAV_ROUTING","NAV_INSTRUMENTS","NAV_AIS_TARGETS"],
    notes: null,
  },
  {
    editionId: "HUB-STANDARD",
    familyId: "HUB",
    editionType: "HARDWARE_DEVICE",
    definitionStatus: "DEFINED",
    requiresQuotation: false,
    merchantable: false,
    priceApproved: false,
    merchantSkuCode: null,
    featureKeys: ["HUB_LOCAL_DATA","HUB_WIFI","HUB_NMEA_INTERFACE"],
    notes: null,
  },
  {
    editionId: "HUB-PRO",
    familyId: "HUB",
    editionType: "HARDWARE_DEVICE",
    definitionStatus: "DEFINED",
    requiresQuotation: false,
    merchantable: false,
    priceApproved: false,
    merchantSkuCode: null,
    featureKeys: ["HUB_LOCAL_DATA","HUB_WIFI","HUB_NMEA_INTERFACE"],
    notes: null,
  },
  {
    editionId: "AIS-RECEIVER",
    familyId: "AIS",
    editionType: "HARDWARE_DEVICE",
    definitionStatus: "DEFINED",
    requiresQuotation: false,
    merchantable: false,
    priceApproved: false,
    merchantSkuCode: null,
    featureKeys: ["AIS_RECEIVE_ONLY","AIS_TARGET_LIST"],
    notes: "Receive-only; AIS_TRANSMISSION_OFFERED=false.",
  },
  {
    editionId: "AIS-CONNECTED",
    familyId: "AIS",
    editionType: "HARDWARE_DEVICE",
    definitionStatus: "CONDITIONAL",
    requiresQuotation: false,
    merchantable: false,
    priceApproved: false,
    merchantSkuCode: null,
    featureKeys: ["AIS_RECEIVE_ONLY","AIS_TARGET_LIST"],
    notes: "Conditional on evidenced richer local networking and diagnostics; not selected by default.",
  },
];

export const CATALOG_READINESS_DIMENSIONS: readonly CatalogReadinessDimensionRecord[] = [
  { dimension: "definition", currentStatus: "NOT_READY" },
  { dimension: "engineering", currentStatus: "NOT_READY" },
  { dimension: "licensing", currentStatus: "NOT_READY" },
  { dimension: "hardware", currentStatus: "NOT_READY" },
  { dimension: "dataRights", currentStatus: "NOT_READY" },
  { dimension: "compliance", currentStatus: "NOT_READY" },
  { dimension: "safety", currentStatus: "NOT_READY" },
  { dimension: "pricing", currentStatus: "NOT_READY" },
  { dimension: "brandPublication", currentStatus: "NOT_READY" },
  { dimension: "operations", currentStatus: "NOT_READY" },
  { dimension: "availability", currentStatus: "NOT_READY" },
];

export const CATALOG_DOMAIN_FACTS: CatalogDomainFacts = {
  families: 3,
  editions: 6,
  bundlesReferencingScope: 6,
  readinessDimensions: 11,
  releaseGates: 13,
  releaseGatesClosed: 0,
  requiredDocuments: 24,
  documentsExecuted: 0,
  cataloguedClaims: 42,
  publicAuthorizedClaims: 0,
  approvedPrices: 0,
  merchantableEditions: 0,
  merchantSkuCodes: 0,
  verifiedStockRows: 0,
  testedCompatibilityRows: 0,
};
