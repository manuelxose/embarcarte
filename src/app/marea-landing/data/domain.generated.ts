// GENERATED FILE - do not edit by hand.
// Source: docs/marea/commerce-data/data/{product-families,product-editions,bundle-compositions,readiness-dimensions}.json
//         docs/marea/legal-commercial/data/release-evidence-gates.json, claims-policy.json
// Generator: node scripts/build-marea-landing-data.mjs
// Projection: bounded internal presentation. No price, stock, SKU, customer or vessel data.
// Publication: NOT_AUTHORIZED. Every commercial state below is NOT_FOR_SALE.

export interface LandingFamilyReadiness {
  readonly definition: string;
  readonly engineering: string;
  readonly licensing: string;
  readonly hardware: string;
  readonly dataRights: string;
  readonly compliance: string;
  readonly pricing: string;
  readonly brandPublication: string;
  readonly availability: string;
  readonly safety: string;
  readonly operations: string;
}

export interface LandingFamilyRecord {
  readonly familyId: string;
  readonly displayName: string;
  readonly productType: string;
  readonly lifecycleState: string;
  readonly definitionStatus: 'DEFINED' | 'CONDITIONAL';
  readonly editionIds: readonly string[];
  readonly editionCount: number;
  readonly commercialAvailability: string;
  readonly publicationState: string;
  readonly brandPublicationStatus: string;
  readonly routeId: string;
  readonly readiness: LandingFamilyReadiness;
  readonly releaseGateIds: readonly string[];
}

export interface LandingEditionRecord {
  readonly editionId: string;
  readonly familyId: string;
  readonly definitionStatus: string;
  readonly editionType: string;
  readonly requiresQuotation: boolean;
  readonly merchantable: boolean;
  readonly priceApproved: boolean;
  readonly commercialAvailability: string;
  readonly publicationState: string;
  readonly featureCount: number;
  readonly expandsTo: readonly string[];
}

export interface LandingBundleLineRecord {
  readonly lineId: string;
  readonly editionId: string;
  readonly inclusion: string;
  readonly required: boolean;
  readonly quantity: number;
  readonly expandsTo: readonly string[];
}

export interface LandingBundleRecord {
  readonly bundleId: string;
  readonly displayName: string;
  readonly customerFacingName: string;
  readonly contractedSolution: boolean;
  readonly hardwareIncludedByDefault: boolean;
  readonly slaEstablished: boolean;
  readonly compatibilityStatus: string;
  readonly installationRequirement: string;
  readonly commercialAvailability: string;
  readonly publicationState: string;
  readonly priceApproved: boolean;
  readonly fixedPackagePriceEstablished: boolean;
  readonly publicationAuthorized: boolean;
  readonly indexationAuthorized: boolean;
  readonly checkoutAllowed: boolean;
  readonly orderable: boolean;
  readonly components: readonly LandingBundleLineRecord[];
  readonly optionalComponents: readonly LandingBundleLineRecord[];
  readonly contractOnlyEditions: readonly {
    readonly lineId: string;
    readonly editionId: string;
    readonly reason: string;
  }[];
  readonly ineligibleEditions: readonly {
    readonly lineId: string;
    readonly editionId: string;
    readonly reason: string;
  }[];
  readonly externalRequirements: readonly string[];
  readonly entitlementCapabilityIds: readonly string[];
}

export interface LandingReadinessDimensionRecord {
  readonly dimensionId: string;
  readonly readyValue: string;
  readonly failureCode: string;
  readonly currentStatus: string;
}

export interface LandingDomainFacts {
  readonly families: number;
  readonly editions: number;
  readonly bundles: number;
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
  readonly bundlesWithFixedPrice: number;
  readonly bundlesWithDefaultHardware: number;
  readonly bundlesWithSla: number;
}

export const LANDING_DOMAIN_SOURCE = {
  families: 'docs/marea/commerce-data/data/product-families.json',
  editions: 'docs/marea/commerce-data/data/product-editions.json',
  bundles: 'docs/marea/commerce-data/data/bundle-compositions.json',
  readiness: 'docs/marea/commerce-data/data/readiness-dimensions.json',
  gates: 'docs/marea/legal-commercial/data/release-evidence-gates.json',
  claims: 'docs/marea/legal-commercial/data/claims-policy.json',
  generationMethod: 'node scripts/build-marea-landing-data.mjs',
} as const;

export const LANDING_DOMAIN_FACTS: LandingDomainFacts = {
  "families": 9,
  "editions": 26,
  "bundles": 6,
  "readinessDimensions": 11,
  "releaseGates": 13,
  "releaseGatesClosed": 0,
  "requiredDocuments": 24,
  "documentsExecuted": 0,
  "cataloguedClaims": 42,
  "publicAuthorizedClaims": 0,
  "approvedPrices": 0,
  "merchantableEditions": 0,
  "merchantSkuCodes": 0,
  "verifiedStockRows": 0,
  "testedCompatibilityRows": 0,
  "bundlesWithFixedPrice": 0,
  "bundlesWithDefaultHardware": 0,
  "bundlesWithSla": 0
};

export const LANDING_READINESS_DIMENSIONS: readonly LandingReadinessDimensionRecord[] = [
  {
    "dimensionId": "definition",
    "readyValue": "COMPLETE_TARGET_SPECIFICATION",
    "failureCode": "DEFINITION_INCOMPLETE",
    "currentStatus": "NOT_READY"
  },
  {
    "dimensionId": "engineering",
    "readyValue": "ENGINEERING_VERIFIED",
    "failureCode": "ENGINEERING_NOT_VERIFIED",
    "currentStatus": "NOT_READY"
  },
  {
    "dimensionId": "licensing",
    "readyValue": "CLEARED",
    "failureCode": "LICENSING_NOT_CLEARED",
    "currentStatus": "NOT_READY"
  },
  {
    "dimensionId": "hardware",
    "readyValue": "CERTIFIED",
    "failureCode": "HARDWARE_NOT_CERTIFIED",
    "currentStatus": "NOT_READY"
  },
  {
    "dimensionId": "dataRights",
    "readyValue": "GRANTED_PER_TERRITORY",
    "failureCode": "DATA_RIGHTS_NOT_GRANTED",
    "currentStatus": "NOT_READY"
  },
  {
    "dimensionId": "compliance",
    "readyValue": "CONFORMITY_EVIDENCE_ON_FILE",
    "failureCode": "COMPLIANCE_NOT_READY",
    "currentStatus": "NOT_READY"
  },
  {
    "dimensionId": "safety",
    "readyValue": "SAFETY_APPROVED",
    "failureCode": "SAFETY_BLOCKED",
    "currentStatus": "NOT_READY"
  },
  {
    "dimensionId": "pricing",
    "readyValue": "APPROVED",
    "failureCode": "PRICE_NOT_APPROVED",
    "currentStatus": "NOT_READY"
  },
  {
    "dimensionId": "brandPublication",
    "readyValue": "PUBLICATION_APPROVED",
    "failureCode": "BRAND_NOT_CLEARED",
    "currentStatus": "NOT_READY"
  },
  {
    "dimensionId": "operations",
    "readyValue": "OPERATIONS_READY",
    "failureCode": "OPERATIONS_NOT_READY",
    "currentStatus": "NOT_READY"
  },
  {
    "dimensionId": "availability",
    "readyValue": "FOR_SALE",
    "failureCode": "NOT_FOR_SALE",
    "currentStatus": "NOT_READY"
  }
];

export const LANDING_FAMILIES: readonly LandingFamilyRecord[] = [
  {
    "familyId": "NAV",
    "displayName": "MAREA NAV",
    "productType": "SOFTWARE",
    "lifecycleState": "DEFINED",
    "definitionStatus": "DEFINED",
    "editionIds": [
      "NAV-ESSENTIAL",
      "NAV-PRO"
    ],
    "editionCount": 2,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "brandPublicationStatus": "NOT_GRANTED",
    "routeId": "mareaFamilyNav",
    "readiness": {
      "definition": "COMPLETE_TARGET_SPECIFICATION",
      "engineering": "PARTIALLY_VERIFIED",
      "licensing": "NOT_CLEARED",
      "hardware": "NOT_APPLICABLE_SOFTWARE_PRODUCT",
      "dataRights": "NOT_GRANTED",
      "compliance": "NOT_STARTED",
      "pricing": "HYPOTHESIS_UNAPPROVED",
      "brandPublication": "NOT_GRANTED",
      "availability": "NOT_FOR_SALE",
      "safety": "NOT_EVALUATED",
      "operations": "NOT_READY"
    },
    "releaseGateIds": [
      "GATE-COMMERCIAL-CLAIMS",
      "GATE-CONSUMER-TERMS",
      "GATE-CRA-CYBERSECURITY",
      "GATE-DATA-LICENSING",
      "GATE-INSURANCE",
      "GATE-IP-CLEARANCE",
      "GATE-LEGAL-ENTITY",
      "GATE-MARKET-PLACEMENT",
      "GATE-PAYMENTS",
      "GATE-PRICING",
      "GATE-PRIVACY-DPA-DPIA",
      "GATE-WEBSITE-REMEDIATION"
    ]
  },
  {
    "familyId": "HUB",
    "displayName": "MAREA HUB",
    "productType": "HARDWARE",
    "lifecycleState": "DEFINED",
    "definitionStatus": "DEFINED",
    "editionIds": [
      "HUB-STANDARD",
      "HUB-PRO"
    ],
    "editionCount": 2,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "brandPublicationStatus": "NOT_GRANTED",
    "routeId": "mareaFamilyHub",
    "readiness": {
      "definition": "COMPLETE_TARGET_SPECIFICATION",
      "engineering": "PARTIALLY_VERIFIED",
      "licensing": "NOT_CLEARED",
      "hardware": "NOT_SELECTED",
      "dataRights": "NOT_GRANTED",
      "compliance": "NOT_STARTED",
      "pricing": "HYPOTHESIS_UNAPPROVED",
      "brandPublication": "NOT_GRANTED",
      "availability": "NOT_FOR_SALE",
      "safety": "NOT_EVALUATED",
      "operations": "NOT_READY"
    },
    "releaseGateIds": [
      "GATE-COMMERCIAL-CLAIMS",
      "GATE-CONSUMER-TERMS",
      "GATE-CRA-CYBERSECURITY",
      "GATE-INSURANCE",
      "GATE-IP-CLEARANCE",
      "GATE-LEGAL-ENTITY",
      "GATE-MARKET-PLACEMENT",
      "GATE-PAYMENTS",
      "GATE-PRICING",
      "GATE-WEBSITE-REMEDIATION"
    ]
  },
  {
    "familyId": "AIS",
    "displayName": "MAREA AIS",
    "productType": "HARDWARE",
    "lifecycleState": "DEFINED",
    "definitionStatus": "DEFINED",
    "editionIds": [
      "AIS-RECEIVER",
      "AIS-CONNECTED"
    ],
    "editionCount": 2,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "brandPublicationStatus": "NOT_GRANTED",
    "routeId": "mareaFamilyAis",
    "readiness": {
      "definition": "COMPLETE_TARGET_SPECIFICATION",
      "engineering": "NOT_VERIFIED",
      "licensing": "NOT_CLEARED",
      "hardware": "NOT_SELECTED",
      "dataRights": "NOT_GRANTED",
      "compliance": "NOT_STARTED",
      "pricing": "HYPOTHESIS_UNAPPROVED",
      "brandPublication": "NOT_GRANTED",
      "availability": "NOT_FOR_SALE",
      "safety": "RECEIVE_ONLY_NO_TRANSMISSION",
      "operations": "NOT_READY"
    },
    "releaseGateIds": [
      "GATE-COMMERCIAL-CLAIMS",
      "GATE-CONSUMER-TERMS",
      "GATE-CRA-CYBERSECURITY",
      "GATE-DATA-LICENSING",
      "GATE-INSURANCE",
      "GATE-IP-CLEARANCE",
      "GATE-LEGAL-ENTITY",
      "GATE-MARKET-PLACEMENT",
      "GATE-PAYMENTS",
      "GATE-PRICING",
      "GATE-WEBSITE-REMEDIATION"
    ]
  },
  {
    "familyId": "PILOT",
    "displayName": "MAREA PILOT",
    "productType": "HARDWARE",
    "lifecycleState": "DEFINED",
    "definitionStatus": "DEFINED",
    "editionIds": [
      "PILOT-COASTAL",
      "PILOT-SAIL",
      "PILOT-PRO"
    ],
    "editionCount": 3,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "brandPublicationStatus": "NOT_GRANTED",
    "routeId": "mareaFamilyPilot",
    "readiness": {
      "definition": "COMPLETE_TARGET_SPECIFICATION",
      "engineering": "NOT_VERIFIED",
      "licensing": "NOT_CLEARED",
      "hardware": "NOT_SELECTED",
      "dataRights": "NOT_GRANTED",
      "compliance": "NOT_STARTED",
      "pricing": "HYPOTHESIS_UNAPPROVED",
      "brandPublication": "NOT_GRANTED",
      "availability": "NOT_FOR_SALE",
      "safety": "BLOCKED",
      "operations": "NOT_READY"
    },
    "releaseGateIds": [
      "GATE-COMMERCIAL-CLAIMS",
      "GATE-CONSUMER-TERMS",
      "GATE-CRA-CYBERSECURITY",
      "GATE-INSURANCE",
      "GATE-IP-CLEARANCE",
      "GATE-LEGAL-ENTITY",
      "GATE-MARKET-PLACEMENT",
      "GATE-PAYMENTS",
      "GATE-PRICING",
      "GATE-SAFETY-PILOT",
      "GATE-WEBSITE-REMEDIATION"
    ]
  },
  {
    "familyId": "SENSE",
    "displayName": "MAREA SENSE",
    "productType": "HARDWARE",
    "lifecycleState": "DEFINED",
    "definitionStatus": "DEFINED",
    "editionIds": [
      "SENSE-WIND",
      "SENSE-POWER",
      "SENSE-BILGE",
      "SENSE-TANKS",
      "SENSE-ENV",
      "SENSE-ESSENTIALS",
      "SENSE-SAIL",
      "SENSE-SYSTEMS"
    ],
    "editionCount": 8,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "brandPublicationStatus": "NOT_GRANTED",
    "routeId": "mareaFamilySense",
    "readiness": {
      "definition": "COMPLETE_TARGET_SPECIFICATION",
      "engineering": "PARTIALLY_VERIFIED",
      "licensing": "NOT_CLEARED",
      "hardware": "NOT_SELECTED",
      "dataRights": "NOT_GRANTED",
      "compliance": "NOT_STARTED",
      "pricing": "HYPOTHESIS_UNAPPROVED",
      "brandPublication": "NOT_GRANTED",
      "availability": "NOT_FOR_SALE",
      "safety": "LOCAL_ALARM_INDEPENDENT",
      "operations": "NOT_READY"
    },
    "releaseGateIds": [
      "GATE-COMMERCIAL-CLAIMS",
      "GATE-CONSUMER-TERMS",
      "GATE-CRA-CYBERSECURITY",
      "GATE-INSURANCE",
      "GATE-IP-CLEARANCE",
      "GATE-LEGAL-ENTITY",
      "GATE-MARKET-PLACEMENT",
      "GATE-PAYMENTS",
      "GATE-PRICING",
      "GATE-WEBSITE-REMEDIATION"
    ]
  },
  {
    "familyId": "WATCH",
    "displayName": "MAREA WATCH",
    "productType": "HARDWARE_SERVICE",
    "lifecycleState": "DEFINED",
    "definitionStatus": "DEFINED",
    "editionIds": [
      "WATCH-CORE",
      "WATCH-PLUS"
    ],
    "editionCount": 2,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "brandPublicationStatus": "NOT_GRANTED",
    "routeId": "mareaFamilyWatch",
    "readiness": {
      "definition": "COMPLETE_TARGET_SPECIFICATION",
      "engineering": "NOT_VERIFIED",
      "licensing": "NOT_CLEARED",
      "hardware": "NOT_SELECTED",
      "dataRights": "NOT_GRANTED",
      "compliance": "NOT_STARTED",
      "pricing": "HYPOTHESIS_UNAPPROVED",
      "brandPublication": "NOT_GRANTED",
      "availability": "NOT_FOR_SALE",
      "safety": "LOCAL_SAFETY_INDEPENDENT",
      "operations": "NOT_READY"
    },
    "releaseGateIds": [
      "GATE-COMMERCIAL-CLAIMS",
      "GATE-CONSUMER-TERMS",
      "GATE-CRA-CYBERSECURITY",
      "GATE-INSURANCE",
      "GATE-IP-CLEARANCE",
      "GATE-LEGAL-ENTITY",
      "GATE-MARKET-PLACEMENT",
      "GATE-PAYMENTS",
      "GATE-PRICING",
      "GATE-PRIVACY-DPA-DPIA",
      "GATE-WEBSITE-REMEDIATION"
    ]
  },
  {
    "familyId": "DISPLAY",
    "displayName": "MAREA DISPLAY",
    "productType": "HARDWARE",
    "lifecycleState": "DEFINED",
    "definitionStatus": "DEFINED",
    "editionIds": [
      "DISPLAY-7",
      "DISPLAY-LARGE-CONDITIONAL"
    ],
    "editionCount": 2,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "brandPublicationStatus": "NOT_GRANTED",
    "routeId": "mareaFamilyDisplay",
    "readiness": {
      "definition": "COMPLETE_TARGET_SPECIFICATION",
      "engineering": "NOT_VERIFIED",
      "licensing": "NOT_CLEARED",
      "hardware": "NOT_SELECTED",
      "dataRights": "NOT_GRANTED",
      "compliance": "NOT_STARTED",
      "pricing": "HYPOTHESIS_UNAPPROVED",
      "brandPublication": "NOT_GRANTED",
      "availability": "NOT_FOR_SALE",
      "safety": "NOT_EVALUATED",
      "operations": "NOT_READY"
    },
    "releaseGateIds": [
      "GATE-COMMERCIAL-CLAIMS",
      "GATE-CONSUMER-TERMS",
      "GATE-CRA-CYBERSECURITY",
      "GATE-DATA-LICENSING",
      "GATE-INSURANCE",
      "GATE-IP-CLEARANCE",
      "GATE-LEGAL-ENTITY",
      "GATE-MARKET-PLACEMENT",
      "GATE-PAYMENTS",
      "GATE-PRICING",
      "GATE-WEBSITE-REMEDIATION"
    ]
  },
  {
    "familyId": "WEATHER",
    "displayName": "MAREA WEATHER",
    "productType": "SOFTWARE",
    "lifecycleState": "DEFINED",
    "definitionStatus": "DEFINED",
    "editionIds": [
      "WEATHER-STANDARD",
      "WEATHER-PRO"
    ],
    "editionCount": 2,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "brandPublicationStatus": "NOT_GRANTED",
    "routeId": "mareaFamilyWeather",
    "readiness": {
      "definition": "COMPLETE_TARGET_SPECIFICATION",
      "engineering": "NOT_VERIFIED",
      "licensing": "NOT_CLEARED",
      "hardware": "NOT_APPLICABLE_SOFTWARE_PRODUCT",
      "dataRights": "NOT_GRANTED",
      "compliance": "NOT_STARTED",
      "pricing": "HYPOTHESIS_UNAPPROVED",
      "brandPublication": "NOT_GRANTED",
      "availability": "NOT_FOR_SALE",
      "safety": "NOT_EVALUATED",
      "operations": "NOT_READY"
    },
    "releaseGateIds": [
      "GATE-COMMERCIAL-CLAIMS",
      "GATE-CONSUMER-TERMS",
      "GATE-CRA-CYBERSECURITY",
      "GATE-DATA-LICENSING",
      "GATE-IP-CLEARANCE",
      "GATE-LEGAL-ENTITY",
      "GATE-MARKET-PLACEMENT",
      "GATE-PAYMENTS",
      "GATE-PRICING",
      "GATE-WEBSITE-REMEDIATION"
    ]
  },
  {
    "familyId": "FLEET",
    "displayName": "MAREA FLEET",
    "productType": "SAAS",
    "lifecycleState": "DEFINED",
    "definitionStatus": "DEFINED",
    "editionIds": [
      "FLEET-START",
      "FLEET-BUSINESS",
      "FLEET-ENTERPRISE"
    ],
    "editionCount": 3,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "brandPublicationStatus": "NOT_GRANTED",
    "routeId": "mareaFamilyFleet",
    "readiness": {
      "definition": "COMPLETE_TARGET_SPECIFICATION",
      "engineering": "NOT_VERIFIED",
      "licensing": "NOT_CLEARED",
      "hardware": "NOT_APPLICABLE_SOFTWARE_PRODUCT",
      "dataRights": "NOT_GRANTED",
      "compliance": "NOT_STARTED",
      "pricing": "HYPOTHESIS_UNAPPROVED",
      "brandPublication": "NOT_GRANTED",
      "availability": "NOT_FOR_SALE",
      "safety": "NOT_EVALUATED",
      "operations": "NOT_READY"
    },
    "releaseGateIds": [
      "GATE-COMMERCIAL-CLAIMS",
      "GATE-CONSUMER-TERMS",
      "GATE-CRA-CYBERSECURITY",
      "GATE-DATA-LICENSING",
      "GATE-IP-CLEARANCE",
      "GATE-LEGAL-ENTITY",
      "GATE-PAYMENTS",
      "GATE-PRICING",
      "GATE-PRIVACY-DPA-DPIA",
      "GATE-WEBSITE-REMEDIATION"
    ]
  }
];

export const LANDING_EDITIONS: readonly LandingEditionRecord[] = [
  {
    "editionId": "NAV-ESSENTIAL",
    "familyId": "NAV",
    "definitionStatus": "DEFINED",
    "editionType": "SOFTWARE_SUBSCRIPTION",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 4,
    "expandsTo": []
  },
  {
    "editionId": "NAV-PRO",
    "familyId": "NAV",
    "definitionStatus": "DEFINED",
    "editionType": "SOFTWARE_SUBSCRIPTION",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 4,
    "expandsTo": []
  },
  {
    "editionId": "HUB-STANDARD",
    "familyId": "HUB",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_DEVICE",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 3,
    "expandsTo": []
  },
  {
    "editionId": "HUB-PRO",
    "familyId": "HUB",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_DEVICE",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 3,
    "expandsTo": []
  },
  {
    "editionId": "AIS-RECEIVER",
    "familyId": "AIS",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_DEVICE",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 2,
    "expandsTo": []
  },
  {
    "editionId": "AIS-CONNECTED",
    "familyId": "AIS",
    "definitionStatus": "CONDITIONAL",
    "editionType": "HARDWARE_DEVICE",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 2,
    "expandsTo": []
  },
  {
    "editionId": "PILOT-COASTAL",
    "familyId": "PILOT",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_SYSTEM",
    "requiresQuotation": true,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 3,
    "expandsTo": []
  },
  {
    "editionId": "PILOT-SAIL",
    "familyId": "PILOT",
    "definitionStatus": "CONDITIONAL",
    "editionType": "HARDWARE_SYSTEM",
    "requiresQuotation": true,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 3,
    "expandsTo": []
  },
  {
    "editionId": "PILOT-PRO",
    "familyId": "PILOT",
    "definitionStatus": "INSTALLATION_PACKAGE",
    "editionType": "INSTALLATION_PACKAGE",
    "requiresQuotation": true,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 3,
    "expandsTo": []
  },
  {
    "editionId": "SENSE-WIND",
    "familyId": "SENSE",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_MODULE",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 2,
    "expandsTo": []
  },
  {
    "editionId": "SENSE-POWER",
    "familyId": "SENSE",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_MODULE",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 2,
    "expandsTo": []
  },
  {
    "editionId": "SENSE-BILGE",
    "familyId": "SENSE",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_MODULE",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 2,
    "expandsTo": []
  },
  {
    "editionId": "SENSE-TANKS",
    "familyId": "SENSE",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_MODULE",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 2,
    "expandsTo": []
  },
  {
    "editionId": "SENSE-ENV",
    "familyId": "SENSE",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_MODULE",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 2,
    "expandsTo": []
  },
  {
    "editionId": "SENSE-ESSENTIALS",
    "familyId": "SENSE",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_KIT",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 2,
    "expandsTo": [
      "SENSE-POWER",
      "SENSE-BILGE"
    ]
  },
  {
    "editionId": "SENSE-SAIL",
    "familyId": "SENSE",
    "definitionStatus": "CONDITIONAL",
    "editionType": "HARDWARE_KIT",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 2,
    "expandsTo": [
      "SENSE-WIND",
      "SENSE-ENV"
    ]
  },
  {
    "editionId": "SENSE-SYSTEMS",
    "familyId": "SENSE",
    "definitionStatus": "CONDITIONAL",
    "editionType": "HARDWARE_KIT",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 2,
    "expandsTo": [
      "SENSE-POWER",
      "SENSE-BILGE",
      "SENSE-TANKS",
      "SENSE-ENV"
    ]
  },
  {
    "editionId": "WATCH-CORE",
    "familyId": "WATCH",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_DEVICE",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 2,
    "expandsTo": []
  },
  {
    "editionId": "WATCH-PLUS",
    "familyId": "WATCH",
    "definitionStatus": "CONDITIONAL",
    "editionType": "HARDWARE_DEVICE",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 2,
    "expandsTo": []
  },
  {
    "editionId": "DISPLAY-7",
    "familyId": "DISPLAY",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_DEVICE",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 2,
    "expandsTo": []
  },
  {
    "editionId": "DISPLAY-LARGE-CONDITIONAL",
    "familyId": "DISPLAY",
    "definitionStatus": "CONDITIONAL",
    "editionType": "HARDWARE_DEVICE",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 2,
    "expandsTo": []
  },
  {
    "editionId": "WEATHER-STANDARD",
    "familyId": "WEATHER",
    "definitionStatus": "DEFINED",
    "editionType": "SOFTWARE_SUBSCRIPTION",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 2,
    "expandsTo": []
  },
  {
    "editionId": "WEATHER-PRO",
    "familyId": "WEATHER",
    "definitionStatus": "CONDITIONAL",
    "editionType": "SOFTWARE_SUBSCRIPTION",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 2,
    "expandsTo": []
  },
  {
    "editionId": "FLEET-START",
    "familyId": "FLEET",
    "definitionStatus": "DEFINED",
    "editionType": "CONTRACTED_SAAS",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 4,
    "expandsTo": []
  },
  {
    "editionId": "FLEET-BUSINESS",
    "familyId": "FLEET",
    "definitionStatus": "DEFINED",
    "editionType": "CONTRACTED_SAAS",
    "requiresQuotation": false,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 4,
    "expandsTo": []
  },
  {
    "editionId": "FLEET-ENTERPRISE",
    "familyId": "FLEET",
    "definitionStatus": "CONDITIONAL",
    "editionType": "CONTRACTED_SAAS",
    "requiresQuotation": true,
    "merchantable": false,
    "priceApproved": false,
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "featureCount": 4,
    "expandsTo": []
  }
];

export const LANDING_BUNDLES: readonly LandingBundleRecord[] = [
  {
    "bundleId": "START",
    "displayName": "MAREA START",
    "customerFacingName": "MAREA START",
    "contractedSolution": false,
    "hardwareIncludedByDefault": false,
    "slaEstablished": false,
    "compatibilityStatus": "UNTESTED",
    "installationRequirement": "INSTALLER_ASSISTED",
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "priceApproved": false,
    "fixedPackagePriceEstablished": false,
    "publicationAuthorized": false,
    "indexationAuthorized": false,
    "checkoutAllowed": false,
    "orderable": false,
    "components": [
      {
        "lineId": "ST-01",
        "editionId": "HUB-STANDARD",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "ST-02",
        "editionId": "NAV-PRO",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      }
    ],
    "optionalComponents": [
      {
        "lineId": "ST-03",
        "editionId": "HUB-PRO",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "ST-04",
        "editionId": "WEATHER-STANDARD",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      }
    ],
    "contractOnlyEditions": [],
    "ineligibleEditions": [],
    "externalRequirements": [
      "installation",
      "cabling",
      "commissioning",
      "licensed chart or weather data where applicable",
      "SIM/connectivity where applicable"
    ],
    "entitlementCapabilityIds": [
      "ENT-NAV-PRO",
      "ENT-WEATHER"
    ]
  },
  {
    "bundleId": "CRUISE",
    "displayName": "MAREA CRUISE",
    "customerFacingName": "MAREA CRUISE",
    "contractedSolution": false,
    "hardwareIncludedByDefault": false,
    "slaEstablished": false,
    "compatibilityStatus": "UNTESTED",
    "installationRequirement": "PROFESSIONAL_REQUIRED",
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "priceApproved": false,
    "fixedPackagePriceEstablished": false,
    "publicationAuthorized": false,
    "indexationAuthorized": false,
    "checkoutAllowed": false,
    "orderable": false,
    "components": [
      {
        "lineId": "CR-01",
        "editionId": "NAV-ESSENTIAL",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CR-02",
        "editionId": "HUB-STANDARD",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CR-03",
        "editionId": "AIS-RECEIVER",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CR-04",
        "editionId": "DISPLAY-7",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      }
    ],
    "optionalComponents": [
      {
        "lineId": "CR-06",
        "editionId": "AIS-CONNECTED",
        "inclusion": "CONDITIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CR-05",
        "editionId": "NAV-PRO",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CR-08",
        "editionId": "WEATHER-STANDARD",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      }
    ],
    "contractOnlyEditions": [],
    "ineligibleEditions": [
      {
        "lineId": "CR-07",
        "editionId": "DISPLAY-LARGE-CONDITIONAL",
        "reason": "CONDITIONAL_SIZE_NOT_SELECTABLE"
      }
    ],
    "externalRequirements": [
      "installation",
      "cabling",
      "commissioning",
      "licensed chart or weather data where applicable",
      "SIM/connectivity where applicable"
    ],
    "entitlementCapabilityIds": [
      "ENT-NAV-ESSENTIAL",
      "ENT-NAV-PRO",
      "ENT-WEATHER"
    ]
  },
  {
    "bundleId": "SAIL",
    "displayName": "MAREA SAIL",
    "customerFacingName": "MAREA SAIL",
    "contractedSolution": false,
    "hardwareIncludedByDefault": false,
    "slaEstablished": false,
    "compatibilityStatus": "UNTESTED",
    "installationRequirement": "QUOTATION_REQUIRED",
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "priceApproved": false,
    "fixedPackagePriceEstablished": false,
    "publicationAuthorized": false,
    "indexationAuthorized": false,
    "checkoutAllowed": false,
    "orderable": false,
    "components": [
      {
        "lineId": "SL-01",
        "editionId": "NAV-PRO",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "SL-02",
        "editionId": "HUB-STANDARD",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "SL-03",
        "editionId": "PILOT-COASTAL",
        "inclusion": "QUOTATION_REQUIRED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      }
    ],
    "optionalComponents": [
      {
        "lineId": "SL-04",
        "editionId": "SENSE-WIND",
        "inclusion": "CONDITIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "SL-05",
        "editionId": "PILOT-SAIL",
        "inclusion": "CONDITIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      }
    ],
    "contractOnlyEditions": [],
    "ineligibleEditions": [
      {
        "lineId": "SL-06",
        "editionId": "PILOT-PRO",
        "reason": "INSTALLATION_PACKAGE_NEVER_A_PRICED_SKU_OR_BUNDLE_LINE"
      }
    ],
    "externalRequirements": [
      "installation",
      "cabling",
      "commissioning",
      "licensed chart or weather data where applicable",
      "SIM/connectivity where applicable"
    ],
    "entitlementCapabilityIds": [
      "ENT-NAV-PRO"
    ]
  },
  {
    "bundleId": "PROTECT",
    "displayName": "MAREA PROTECT",
    "customerFacingName": "MAREA PROTECT",
    "contractedSolution": false,
    "hardwareIncludedByDefault": false,
    "slaEstablished": false,
    "compatibilityStatus": "UNTESTED",
    "installationRequirement": "INSTALLER_ASSISTED",
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "priceApproved": false,
    "fixedPackagePriceEstablished": false,
    "publicationAuthorized": false,
    "indexationAuthorized": false,
    "checkoutAllowed": false,
    "orderable": false,
    "components": [
      {
        "lineId": "PR-01",
        "editionId": "WATCH-CORE",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "PR-02",
        "editionId": "SENSE-ESSENTIALS",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": [
          "SENSE-POWER",
          "SENSE-BILGE"
        ]
      }
    ],
    "optionalComponents": [
      {
        "lineId": "PR-05",
        "editionId": "WATCH-PLUS",
        "inclusion": "CONDITIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "PR-04",
        "editionId": "HUB-STANDARD",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      }
    ],
    "contractOnlyEditions": [],
    "ineligibleEditions": [],
    "externalRequirements": [
      "installation",
      "cabling",
      "commissioning",
      "licensed chart or weather data where applicable",
      "SIM/connectivity where applicable"
    ],
    "entitlementCapabilityIds": [
      "ENT-WATCH"
    ]
  },
  {
    "bundleId": "COMPLETE",
    "displayName": "MAREA COMPLETE",
    "customerFacingName": "MAREA COMPLETE",
    "contractedSolution": false,
    "hardwareIncludedByDefault": false,
    "slaEstablished": false,
    "compatibilityStatus": "UNTESTED",
    "installationRequirement": "QUOTATION_REQUIRED",
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "priceApproved": false,
    "fixedPackagePriceEstablished": false,
    "publicationAuthorized": false,
    "indexationAuthorized": false,
    "checkoutAllowed": false,
    "orderable": false,
    "components": [
      {
        "lineId": "CP-01",
        "editionId": "NAV-PRO",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-02",
        "editionId": "HUB-PRO",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-03",
        "editionId": "DISPLAY-7",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-04",
        "editionId": "WATCH-CORE",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-05",
        "editionId": "SENSE-POWER",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-06",
        "editionId": "SENSE-BILGE",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-07",
        "editionId": "SENSE-TANKS",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-08",
        "editionId": "SENSE-ENV",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-09",
        "editionId": "PILOT-COASTAL",
        "inclusion": "QUOTATION_REQUIRED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      }
    ],
    "optionalComponents": [
      {
        "lineId": "CP-14",
        "editionId": "PILOT-SAIL",
        "inclusion": "CONDITIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-10",
        "editionId": "AIS-RECEIVER",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-11",
        "editionId": "WEATHER-PRO",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      }
    ],
    "contractOnlyEditions": [],
    "ineligibleEditions": [
      {
        "lineId": "CP-13",
        "editionId": "PILOT-PRO",
        "reason": "INSTALLATION_PACKAGE_NEVER_A_PRICED_SKU_OR_BUNDLE_LINE"
      },
      {
        "lineId": "CP-15",
        "editionId": "DISPLAY-LARGE-CONDITIONAL",
        "reason": "CONDITIONAL_SIZE_NOT_SELECTABLE"
      }
    ],
    "externalRequirements": [
      "installation",
      "cabling",
      "commissioning",
      "licensed chart or weather data where applicable",
      "SIM/connectivity where applicable"
    ],
    "entitlementCapabilityIds": [
      "ENT-NAV-PRO",
      "ENT-WATCH",
      "ENT-WEATHER"
    ]
  },
  {
    "bundleId": "FLEET",
    "displayName": "MAREA FLEET",
    "customerFacingName": "MAREA FLEET package",
    "contractedSolution": true,
    "hardwareIncludedByDefault": false,
    "slaEstablished": false,
    "compatibilityStatus": "UNTESTED",
    "installationRequirement": "QUOTATION_REQUIRED",
    "commercialAvailability": "NOT_FOR_SALE",
    "publicationState": "INTERNAL_ONLY",
    "priceApproved": false,
    "fixedPackagePriceEstablished": false,
    "publicationAuthorized": false,
    "indexationAuthorized": false,
    "checkoutAllowed": false,
    "orderable": false,
    "components": [
      {
        "lineId": "FP-01",
        "editionId": "FLEET-START",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      }
    ],
    "optionalComponents": [
      {
        "lineId": "FP-05",
        "editionId": "WATCH-CORE",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "FP-06",
        "editionId": "HUB-STANDARD",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "FP-12",
        "editionId": "FLEET-BUSINESS",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      }
    ],
    "contractOnlyEditions": [
      {
        "lineId": "FP-02",
        "editionId": "FLEET-ENTERPRISE",
        "reason": "CONTRACTED_B2B_TIER_NOT_SELF_SERVICE"
      }
    ],
    "ineligibleEditions": [],
    "externalRequirements": [
      "installation",
      "cabling",
      "commissioning",
      "licensed chart or weather data where applicable",
      "SIM/connectivity where applicable"
    ],
    "entitlementCapabilityIds": [
      "ENT-FLEET",
      "ENT-WATCH"
    ]
  }
];
