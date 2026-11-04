// GENERATED FILE - do not edit by hand.
// Source: docs/marea/commerce-data/data/{product-families,product-editions,bundle-compositions,readiness-dimensions}.json,
//         docs/marea/information-architecture/data/proposed-routes.json, docs/marea/legal-commercial/data/{release-evidence-gates,claims-policy}.json
// Generator: node scripts/build-mc20-catalog-data.mjs
// Projection: bounded internal six-family catalogue presentation
//             (NAV, HUB, AIS, SENSE, WATCH, WEATHER).
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
  readonly lineId: string;
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

export const CATALOG_SCOPE_FAMILY_IDS = ["NAV","HUB","AIS","SENSE","WATCH","WEATHER"] as const;
export type CatalogFamilyId = (typeof CATALOG_SCOPE_FAMILY_IDS)[number];

/** The ten governance gates, preserved verbatim from MC-14/MC-16. */
export const CATALOG_GOVERNANCE_GATES = ["TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED","MAREA_PUBLIC_USE = NO_GO","SOURCE_IP_CLEARANCE = NOT_CLEARED","LICENSING_RIGHTS_GRANTED = false","PRICE_APPROVED = NONE","COMMERCIAL_AVAILABILITY = NOT_FOR_SALE","PUBLICATION_AUTHORIZED = false","INDEXATION_AUTHORIZED = false","PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED","GATE-PRIVACY-DPA-DPIA = BLOCKED"] as const;

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
        { bundleId: "START", displayName: "MAREA START", routeId: "mareaSolutionStart", inclusion: "INCLUDED", lineId: "ST-02", editionId: "NAV-PRO" },
        { bundleId: "CRUISE", displayName: "MAREA CRUISE", routeId: "mareaSolutionCruise", inclusion: "INCLUDED", lineId: "CR-01", editionId: "NAV-ESSENTIAL" },
        { bundleId: "CRUISE", displayName: "MAREA CRUISE", routeId: "mareaSolutionCruise", inclusion: "OPTIONAL", lineId: "CR-05", editionId: "NAV-PRO" },
        { bundleId: "SAIL", displayName: "MAREA SAIL", routeId: "mareaSolutionSail", inclusion: "INCLUDED", lineId: "SL-01", editionId: "NAV-PRO" },
        { bundleId: "COMPLETE", displayName: "MAREA COMPLETE", routeId: "mareaSolutionComplete", inclusion: "INCLUDED", lineId: "CP-01", editionId: "NAV-PRO" },
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
        { bundleId: "START", displayName: "MAREA START", routeId: "mareaSolutionStart", inclusion: "INCLUDED", lineId: "ST-01", editionId: "HUB-STANDARD" },
        { bundleId: "START", displayName: "MAREA START", routeId: "mareaSolutionStart", inclusion: "OPTIONAL", lineId: "ST-03", editionId: "HUB-PRO" },
        { bundleId: "CRUISE", displayName: "MAREA CRUISE", routeId: "mareaSolutionCruise", inclusion: "INCLUDED", lineId: "CR-02", editionId: "HUB-STANDARD" },
        { bundleId: "SAIL", displayName: "MAREA SAIL", routeId: "mareaSolutionSail", inclusion: "INCLUDED", lineId: "SL-02", editionId: "HUB-STANDARD" },
        { bundleId: "PROTECT", displayName: "MAREA PROTECT", routeId: "mareaSolutionProtect", inclusion: "OPTIONAL", lineId: "PR-04", editionId: "HUB-STANDARD" },
        { bundleId: "COMPLETE", displayName: "MAREA COMPLETE", routeId: "mareaSolutionComplete", inclusion: "INCLUDED", lineId: "CP-02", editionId: "HUB-PRO" },
        { bundleId: "FLEET", displayName: "MAREA FLEET", routeId: "mareaSolutionFleet", inclusion: "OPTIONAL", lineId: "FP-06", editionId: "HUB-STANDARD" },
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
        { bundleId: "CRUISE", displayName: "MAREA CRUISE", routeId: "mareaSolutionCruise", inclusion: "INCLUDED", lineId: "CR-03", editionId: "AIS-RECEIVER" },
        { bundleId: "CRUISE", displayName: "MAREA CRUISE", routeId: "mareaSolutionCruise", inclusion: "CONDITIONAL", lineId: "CR-06", editionId: "AIS-CONNECTED" },
        { bundleId: "COMPLETE", displayName: "MAREA COMPLETE", routeId: "mareaSolutionComplete", inclusion: "OPTIONAL", lineId: "CP-10", editionId: "AIS-RECEIVER" },
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
  {
    familyId: "SENSE",
    displayName: "MAREA SENSE",
    productType: "HARDWARE",
    lifecycleState: "DEFINED",
    definitionStatus: "DEFINED",
    publicationState: "INTERNAL_ONLY",
    commercialAvailability: "NOT_FOR_SALE",
    routeId: "mareaFamilySense",
    editionIds: ["SENSE-WIND","SENSE-POWER","SENSE-BILGE","SENSE-TANKS","SENSE-ENV","SENSE-ESSENTIALS","SENSE-SAIL","SENSE-SYSTEMS"],
    engineeringStatus: "PARTIALLY_VERIFIED",
    licensingStatus: "NOT_CLEARED",
    hardwareStatus: "NOT_SELECTED",
    dataRightsStatus: "NOT_GRANTED",
    complianceStatus: "NOT_STARTED",
    safetyStatus: "LOCAL_ALARM_INDEPENDENT",
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
      safety: "LOCAL_ALARM_INDEPENDENT",
      pricing: "HYPOTHESIS_UNAPPROVED",
      brandPublication: "NOT_GRANTED",
      operations: "NOT_READY",
      availability: "NOT_FOR_SALE",
    },
    releaseGateIds: ["GATE-COMMERCIAL-CLAIMS","GATE-CONSUMER-TERMS","GATE-CRA-CYBERSECURITY","GATE-INSURANCE","GATE-IP-CLEARANCE","GATE-LEGAL-ENTITY","GATE-MARKET-PLACEMENT","GATE-PAYMENTS","GATE-PRICING","GATE-WEBSITE-REMEDIATION"],
    evidenceIds: ["EV-MC05-SENSE","EV-MC15-HANDOFF","EV-MC14-GATES"],
    bundleInclusions: [
        { bundleId: "SAIL", displayName: "MAREA SAIL", routeId: "mareaSolutionSail", inclusion: "CONDITIONAL", lineId: "SL-04", editionId: "SENSE-WIND" },
        { bundleId: "PROTECT", displayName: "MAREA PROTECT", routeId: "mareaSolutionProtect", inclusion: "INCLUDED", lineId: "PR-02", editionId: "SENSE-ESSENTIALS" },
        { bundleId: "COMPLETE", displayName: "MAREA COMPLETE", routeId: "mareaSolutionComplete", inclusion: "INCLUDED", lineId: "CP-05", editionId: "SENSE-POWER" },
        { bundleId: "COMPLETE", displayName: "MAREA COMPLETE", routeId: "mareaSolutionComplete", inclusion: "INCLUDED", lineId: "CP-06", editionId: "SENSE-BILGE" },
        { bundleId: "COMPLETE", displayName: "MAREA COMPLETE", routeId: "mareaSolutionComplete", inclusion: "INCLUDED", lineId: "CP-07", editionId: "SENSE-TANKS" },
        { bundleId: "COMPLETE", displayName: "MAREA COMPLETE", routeId: "mareaSolutionComplete", inclusion: "INCLUDED", lineId: "CP-08", editionId: "SENSE-ENV" },
    ],
    proposedRoute: {
      routeId: "mareaFamilySense",
      pageType: "PRODUCT_FAMILY",
      entityId: "ENT-FAMILY-SENSE",
      es: "marea/sense",
      en: "en/marea/sense",
      status: "PROPOSED_INTERNAL_NOT_DEPLOYABLE",
      publicationStatus: "PROPOSED_INTERNAL_NOT_DEPLOYABLE",
      publicationAuthorized: false,
      indexationAuthorized: false,
      sitemapEligible: false,
      collisionStatus: "NO_COLLISION",
    },
  },
  {
    familyId: "WATCH",
    displayName: "MAREA WATCH",
    productType: "HARDWARE_SERVICE",
    lifecycleState: "DEFINED",
    definitionStatus: "DEFINED",
    publicationState: "INTERNAL_ONLY",
    commercialAvailability: "NOT_FOR_SALE",
    routeId: "mareaFamilyWatch",
    editionIds: ["WATCH-CORE","WATCH-PLUS"],
    engineeringStatus: "NOT_VERIFIED",
    licensingStatus: "NOT_CLEARED",
    hardwareStatus: "NOT_SELECTED",
    dataRightsStatus: "NOT_GRANTED",
    complianceStatus: "NOT_STARTED",
    safetyStatus: "LOCAL_SAFETY_INDEPENDENT",
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
      safety: "LOCAL_SAFETY_INDEPENDENT",
      pricing: "HYPOTHESIS_UNAPPROVED",
      brandPublication: "NOT_GRANTED",
      operations: "NOT_READY",
      availability: "NOT_FOR_SALE",
    },
    releaseGateIds: ["GATE-COMMERCIAL-CLAIMS","GATE-CONSUMER-TERMS","GATE-CRA-CYBERSECURITY","GATE-INSURANCE","GATE-IP-CLEARANCE","GATE-LEGAL-ENTITY","GATE-MARKET-PLACEMENT","GATE-PAYMENTS","GATE-PRICING","GATE-PRIVACY-DPA-DPIA","GATE-WEBSITE-REMEDIATION"],
    evidenceIds: ["EV-MC05-WATCH","EV-MC15-HANDOFF","EV-MC14-GATES"],
    bundleInclusions: [
        { bundleId: "PROTECT", displayName: "MAREA PROTECT", routeId: "mareaSolutionProtect", inclusion: "INCLUDED", lineId: "PR-01", editionId: "WATCH-CORE" },
        { bundleId: "PROTECT", displayName: "MAREA PROTECT", routeId: "mareaSolutionProtect", inclusion: "CONDITIONAL", lineId: "PR-05", editionId: "WATCH-PLUS" },
        { bundleId: "COMPLETE", displayName: "MAREA COMPLETE", routeId: "mareaSolutionComplete", inclusion: "INCLUDED", lineId: "CP-04", editionId: "WATCH-CORE" },
        { bundleId: "FLEET", displayName: "MAREA FLEET", routeId: "mareaSolutionFleet", inclusion: "OPTIONAL", lineId: "FP-05", editionId: "WATCH-CORE" },
    ],
    proposedRoute: {
      routeId: "mareaFamilyWatch",
      pageType: "PRODUCT_FAMILY",
      entityId: "ENT-FAMILY-WATCH",
      es: "marea/watch",
      en: "en/marea/watch",
      status: "PROPOSED_INTERNAL_NOT_DEPLOYABLE",
      publicationStatus: "PROPOSED_INTERNAL_NOT_DEPLOYABLE",
      publicationAuthorized: false,
      indexationAuthorized: false,
      sitemapEligible: false,
      collisionStatus: "NO_COLLISION",
    },
  },
  {
    familyId: "WEATHER",
    displayName: "MAREA WEATHER",
    productType: "SOFTWARE",
    lifecycleState: "DEFINED",
    definitionStatus: "DEFINED",
    publicationState: "INTERNAL_ONLY",
    commercialAvailability: "NOT_FOR_SALE",
    routeId: "mareaFamilyWeather",
    editionIds: ["WEATHER-STANDARD","WEATHER-PRO"],
    engineeringStatus: "NOT_VERIFIED",
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
      engineering: "NOT_VERIFIED",
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
    releaseGateIds: ["GATE-COMMERCIAL-CLAIMS","GATE-CONSUMER-TERMS","GATE-CRA-CYBERSECURITY","GATE-DATA-LICENSING","GATE-IP-CLEARANCE","GATE-LEGAL-ENTITY","GATE-MARKET-PLACEMENT","GATE-PAYMENTS","GATE-PRICING","GATE-WEBSITE-REMEDIATION"],
    evidenceIds: ["EV-MC05-WEATHER","EV-MC15-HANDOFF","EV-MC14-GATES"],
    bundleInclusions: [
        { bundleId: "START", displayName: "MAREA START", routeId: "mareaSolutionStart", inclusion: "OPTIONAL", lineId: "ST-04", editionId: "WEATHER-STANDARD" },
        { bundleId: "CRUISE", displayName: "MAREA CRUISE", routeId: "mareaSolutionCruise", inclusion: "OPTIONAL", lineId: "CR-08", editionId: "WEATHER-STANDARD" },
        { bundleId: "COMPLETE", displayName: "MAREA COMPLETE", routeId: "mareaSolutionComplete", inclusion: "OPTIONAL", lineId: "CP-11", editionId: "WEATHER-PRO" },
    ],
    proposedRoute: {
      routeId: "mareaFamilyWeather",
      pageType: "PRODUCT_FAMILY",
      entityId: "ENT-FAMILY-WEATHER",
      es: "marea/weather",
      en: "en/marea/weather",
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
  {
    editionId: "SENSE-WIND",
    familyId: "SENSE",
    editionType: "HARDWARE_MODULE",
    definitionStatus: "DEFINED",
    requiresQuotation: false,
    merchantable: false,
    priceApproved: false,
    merchantSkuCode: null,
    featureKeys: ["SENSE_LOCAL_MEASUREMENT","SENSE_LOCAL_ALARM"],
    notes: null,
  },
  {
    editionId: "SENSE-POWER",
    familyId: "SENSE",
    editionType: "HARDWARE_MODULE",
    definitionStatus: "DEFINED",
    requiresQuotation: false,
    merchantable: false,
    priceApproved: false,
    merchantSkuCode: null,
    featureKeys: ["SENSE_LOCAL_MEASUREMENT","SENSE_LOCAL_ALARM"],
    notes: null,
  },
  {
    editionId: "SENSE-BILGE",
    familyId: "SENSE",
    editionType: "HARDWARE_MODULE",
    definitionStatus: "DEFINED",
    requiresQuotation: false,
    merchantable: false,
    priceApproved: false,
    merchantSkuCode: null,
    featureKeys: ["SENSE_LOCAL_MEASUREMENT","SENSE_LOCAL_ALARM"],
    notes: null,
  },
  {
    editionId: "SENSE-TANKS",
    familyId: "SENSE",
    editionType: "HARDWARE_MODULE",
    definitionStatus: "DEFINED",
    requiresQuotation: false,
    merchantable: false,
    priceApproved: false,
    merchantSkuCode: null,
    featureKeys: ["SENSE_LOCAL_MEASUREMENT","SENSE_LOCAL_ALARM"],
    notes: null,
  },
  {
    editionId: "SENSE-ENV",
    familyId: "SENSE",
    editionType: "HARDWARE_MODULE",
    definitionStatus: "DEFINED",
    requiresQuotation: false,
    merchantable: false,
    priceApproved: false,
    merchantSkuCode: null,
    featureKeys: ["SENSE_LOCAL_MEASUREMENT","SENSE_LOCAL_ALARM"],
    notes: null,
  },
  {
    editionId: "SENSE-ESSENTIALS",
    familyId: "SENSE",
    editionType: "HARDWARE_KIT",
    definitionStatus: "DEFINED",
    requiresQuotation: false,
    merchantable: false,
    priceApproved: false,
    merchantSkuCode: null,
    featureKeys: ["SENSE_LOCAL_MEASUREMENT","SENSE_LOCAL_ALARM"],
    notes: "Kit that expands exactly to SENSE-POWER + SENSE-BILGE; a kit is packaging, not a new capability.",
  },
  {
    editionId: "SENSE-SAIL",
    familyId: "SENSE",
    editionType: "HARDWARE_KIT",
    definitionStatus: "CONDITIONAL",
    requiresQuotation: false,
    merchantable: false,
    priceApproved: false,
    merchantSkuCode: null,
    featureKeys: ["SENSE_LOCAL_MEASUREMENT","SENSE_LOCAL_ALARM"],
    notes: null,
  },
  {
    editionId: "SENSE-SYSTEMS",
    familyId: "SENSE",
    editionType: "HARDWARE_KIT",
    definitionStatus: "CONDITIONAL",
    requiresQuotation: false,
    merchantable: false,
    priceApproved: false,
    merchantSkuCode: null,
    featureKeys: ["SENSE_LOCAL_MEASUREMENT","SENSE_LOCAL_ALARM"],
    notes: null,
  },
  {
    editionId: "WATCH-CORE",
    familyId: "WATCH",
    editionType: "HARDWARE_DEVICE",
    definitionStatus: "DEFINED",
    requiresQuotation: false,
    merchantable: false,
    priceApproved: false,
    merchantSkuCode: null,
    featureKeys: ["WATCH_LOCAL_ALARM","WATCH_REMOTE_MONITORING"],
    notes: "Monitoring subscription entitlement is required for remote monitoring.",
  },
  {
    editionId: "WATCH-PLUS",
    familyId: "WATCH",
    editionType: "HARDWARE_DEVICE",
    definitionStatus: "CONDITIONAL",
    requiresQuotation: false,
    merchantable: false,
    priceApproved: false,
    merchantSkuCode: null,
    featureKeys: ["WATCH_LOCAL_ALARM","WATCH_REMOTE_MONITORING"],
    notes: null,
  },
  {
    editionId: "WEATHER-STANDARD",
    familyId: "WEATHER",
    editionType: "SOFTWARE_SUBSCRIPTION",
    definitionStatus: "DEFINED",
    requiresQuotation: false,
    merchantable: false,
    priceApproved: false,
    merchantSkuCode: null,
    featureKeys: ["WEATHER_FORECAST","WEATHER_LAYERS"],
    notes: "One entitlement ledger with WEATHER-PRO; double billing is prohibited.",
  },
  {
    editionId: "WEATHER-PRO",
    familyId: "WEATHER",
    editionType: "SOFTWARE_SUBSCRIPTION",
    definitionStatus: "CONDITIONAL",
    requiresQuotation: false,
    merchantable: false,
    priceApproved: false,
    merchantSkuCode: null,
    featureKeys: ["WEATHER_FORECAST","WEATHER_LAYERS"],
    notes: "Conditional; one entitlement ledger with WEATHER-STANDARD.",
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
  families: 6,
  editions: 18,
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
