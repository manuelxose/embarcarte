// GENERATED FILE — do not edit by hand.
// Source: docs/marea/commerce-data/data/{product-families,product-editions,bundle-compositions,readiness-dimensions,entitlement-definitions}.json
// Generator: node scripts/build-marea-design-system-fixtures.mjs
// Fixture class: SYNTHETIC_INTERNAL_FIXTURE — internal presentation only.
// No price amount, stock quantity, merchant SKU, customer or vessel data is represented.
import type {
  MareaBundleSummary,
  MareaEditionSummary,
  MareaEntitlement,
  MareaFamilySummary,
  MareaReadinessSummary,
} from '../../core/types';

export const FIXTURE_CLASSIFICATION = 'SYNTHETIC_INTERNAL_FIXTURE' as const;

export interface MareaFixtureFamily extends MareaFamilySummary {
  readonly editions: readonly string[];
}

export interface MareaFixtureEdition extends MareaEditionSummary {
  readonly safetyStatus: string | null;
  readonly licensingStatus: string | null;
  readonly expandsTo: readonly string[];
  readonly dependencyIds: readonly string[];
  readonly subscriptionCapabilityIds: readonly string[];
}

export interface MareaFixtureBundle extends MareaBundleSummary {
  readonly compatibilityStatus: string;
}

export interface MareaFixtureEntitlement extends MareaEntitlement {
  readonly requiresLicensedData: boolean;
  readonly doubleBillingAllowed: boolean;
}

export const MAREA_FIXTURE_READINESS: MareaReadinessSummary = {
  "dimensions": [
    {
      "dimension": "definition",
      "label": "Definition",
      "status": "NOT_READY",
      "note": null
    },
    {
      "dimension": "engineering",
      "label": "Engineering",
      "status": "NOT_READY",
      "note": null
    },
    {
      "dimension": "licensing",
      "label": "Licensing",
      "status": "NOT_READY",
      "note": null
    },
    {
      "dimension": "hardware",
      "label": "Hardware",
      "status": "NOT_READY",
      "note": null
    },
    {
      "dimension": "dataRights",
      "label": "Data Rights",
      "status": "NOT_READY",
      "note": null
    },
    {
      "dimension": "compliance",
      "label": "Compliance",
      "status": "NOT_READY",
      "note": null
    },
    {
      "dimension": "safety",
      "label": "Safety",
      "status": "NOT_READY",
      "note": null
    },
    {
      "dimension": "pricing",
      "label": "Pricing",
      "status": "NOT_READY",
      "note": null
    },
    {
      "dimension": "brandPublication",
      "label": "Brand Publication",
      "status": "NOT_READY",
      "note": null
    },
    {
      "dimension": "operations",
      "label": "Operations",
      "status": "NOT_READY",
      "note": null
    },
    {
      "dimension": "availability",
      "label": "Availability",
      "status": "NOT_READY",
      "note": null
    }
  ],
  "overall": "NOT_READY",
  "blockedGateIds": [
    "PUBLICATION_NOT_AUTHORIZED"
  ]
};

export const MAREA_FIXTURE_FAMILIES: readonly MareaFixtureFamily[] = [
  {
    "familyId": "NAV",
    "displayName": "MAREA NAV",
    "definitionStatus": "DEFINED",
    "editionCount": 2,
    "readiness": "NOT_READY",
    "summary": {
      "es": "Definición interna de MAREA NAV. Sin disponibilidad pública, sin precio aprobado y sin autorización de publicación.",
      "en": "Internal definition of MAREA NAV. No public availability, no approved price and no publication authorisation."
    },
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "LICENSING_NOT_CLEARED"
    ],
    "editions": [
      "NAV-ESSENTIAL",
      "NAV-PRO"
    ]
  },
  {
    "familyId": "HUB",
    "displayName": "MAREA HUB",
    "definitionStatus": "DEFINED",
    "editionCount": 2,
    "readiness": "NOT_READY",
    "summary": {
      "es": "Definición interna de MAREA HUB. Sin disponibilidad pública, sin precio aprobado y sin autorización de publicación.",
      "en": "Internal definition of MAREA HUB. No public availability, no approved price and no publication authorisation."
    },
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED"
    ],
    "editions": [
      "HUB-STANDARD",
      "HUB-PRO"
    ]
  },
  {
    "familyId": "AIS",
    "displayName": "MAREA AIS",
    "definitionStatus": "DEFINED",
    "editionCount": 2,
    "readiness": "NOT_READY",
    "summary": {
      "es": "Definición interna de MAREA AIS. Sin disponibilidad pública, sin precio aprobado y sin autorización de publicación.",
      "en": "Internal definition of MAREA AIS. No public availability, no approved price and no publication authorisation."
    },
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "LICENSING_NOT_CLEARED"
    ],
    "editions": [
      "AIS-RECEIVER",
      "AIS-CONNECTED"
    ]
  },
  {
    "familyId": "PILOT",
    "displayName": "MAREA PILOT",
    "definitionStatus": "DEFINED",
    "editionCount": 3,
    "readiness": "NOT_READY",
    "summary": {
      "es": "Definición interna de MAREA PILOT. Sin disponibilidad pública, sin precio aprobado y sin autorización de publicación.",
      "en": "Internal definition of MAREA PILOT. No public availability, no approved price and no publication authorisation."
    },
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "SAFETY_GATE_BLOCKED"
    ],
    "editions": [
      "PILOT-COASTAL",
      "PILOT-SAIL",
      "PILOT-PRO"
    ]
  },
  {
    "familyId": "SENSE",
    "displayName": "MAREA SENSE",
    "definitionStatus": "DEFINED",
    "editionCount": 8,
    "readiness": "NOT_READY",
    "summary": {
      "es": "Definición interna de MAREA SENSE. Sin disponibilidad pública, sin precio aprobado y sin autorización de publicación.",
      "en": "Internal definition of MAREA SENSE. No public availability, no approved price and no publication authorisation."
    },
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "COMPATIBILITY_UNTESTED"
    ],
    "editions": [
      "SENSE-WIND",
      "SENSE-POWER",
      "SENSE-BILGE",
      "SENSE-TANKS",
      "SENSE-ENV",
      "SENSE-ESSENTIALS",
      "SENSE-SAIL",
      "SENSE-SYSTEMS"
    ]
  },
  {
    "familyId": "WATCH",
    "displayName": "MAREA WATCH",
    "definitionStatus": "DEFINED",
    "editionCount": 2,
    "readiness": "NOT_READY",
    "summary": {
      "es": "Definición interna de MAREA WATCH. Sin disponibilidad pública, sin precio aprobado y sin autorización de publicación.",
      "en": "Internal definition of MAREA WATCH. No public availability, no approved price and no publication authorisation."
    },
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "COMPATIBILITY_UNTESTED"
    ],
    "editions": [
      "WATCH-CORE",
      "WATCH-PLUS"
    ]
  },
  {
    "familyId": "DISPLAY",
    "displayName": "MAREA DISPLAY",
    "definitionStatus": "DEFINED",
    "editionCount": 2,
    "readiness": "NOT_READY",
    "summary": {
      "es": "Definición interna de MAREA DISPLAY. Sin disponibilidad pública, sin precio aprobado y sin autorización de publicación.",
      "en": "Internal definition of MAREA DISPLAY. No public availability, no approved price and no publication authorisation."
    },
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED"
    ],
    "editions": [
      "DISPLAY-7",
      "DISPLAY-LARGE-CONDITIONAL"
    ]
  },
  {
    "familyId": "WEATHER",
    "displayName": "MAREA WEATHER",
    "definitionStatus": "DEFINED",
    "editionCount": 2,
    "readiness": "NOT_READY",
    "summary": {
      "es": "Definición interna de MAREA WEATHER. Sin disponibilidad pública, sin precio aprobado y sin autorización de publicación.",
      "en": "Internal definition of MAREA WEATHER. No public availability, no approved price and no publication authorisation."
    },
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "LICENSING_NOT_CLEARED"
    ],
    "editions": [
      "WEATHER-STANDARD",
      "WEATHER-PRO"
    ]
  },
  {
    "familyId": "FLEET",
    "displayName": "MAREA FLEET",
    "definitionStatus": "DEFINED",
    "editionCount": 3,
    "readiness": "NOT_READY",
    "summary": {
      "es": "Definición interna de MAREA FLEET. Sin disponibilidad pública, sin precio aprobado y sin autorización de publicación.",
      "en": "Internal definition of MAREA FLEET. No public availability, no approved price and no publication authorisation."
    },
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "LICENSING_NOT_CLEARED"
    ],
    "editions": [
      "FLEET-START",
      "FLEET-BUSINESS",
      "FLEET-ENTERPRISE"
    ]
  }
];

export const MAREA_FIXTURE_EDITIONS: readonly MareaFixtureEdition[] = [
  {
    "editionId": "NAV-ESSENTIAL",
    "familyId": "NAV",
    "displayName": "MAREA NAV ESSENTIAL",
    "definitionStatus": "DEFINED",
    "editionType": "SOFTWARE_SUBSCRIPTION",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "LICENSING_NOT_CLEARED"
    ],
    "safetyStatus": "NOT_EVALUATED",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": [
      "ENT-NAV-ESSENTIAL"
    ]
  },
  {
    "editionId": "NAV-PRO",
    "familyId": "NAV",
    "displayName": "MAREA NAV PRO",
    "definitionStatus": "DEFINED",
    "editionType": "SOFTWARE_SUBSCRIPTION",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "LICENSING_NOT_CLEARED"
    ],
    "safetyStatus": "NOT_EVALUATED",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": [
      "ENT-NAV-PRO"
    ]
  },
  {
    "editionId": "HUB-STANDARD",
    "familyId": "HUB",
    "displayName": "MAREA HUB STANDARD",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_DEVICE",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED"
    ],
    "safetyStatus": "NOT_EVALUATED",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": []
  },
  {
    "editionId": "HUB-PRO",
    "familyId": "HUB",
    "displayName": "MAREA HUB PRO",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_DEVICE",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED"
    ],
    "safetyStatus": "NOT_EVALUATED",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": []
  },
  {
    "editionId": "AIS-RECEIVER",
    "familyId": "AIS",
    "displayName": "MAREA AIS RECEIVER",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_DEVICE",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED"
    ],
    "safetyStatus": "RECEIVE_ONLY_NO_TRANSMISSION",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": []
  },
  {
    "editionId": "AIS-CONNECTED",
    "familyId": "AIS",
    "displayName": "MAREA AIS CONNECTED",
    "definitionStatus": "CONDITIONAL",
    "editionType": "HARDWARE_DEVICE",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED"
    ],
    "safetyStatus": "RECEIVE_ONLY_NO_TRANSMISSION",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": []
  },
  {
    "editionId": "PILOT-COASTAL",
    "familyId": "PILOT",
    "displayName": "MAREA PILOT COASTAL",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_SYSTEM",
    "readiness": "NOT_READY",
    "requiresQuotation": true,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "SAFETY_GATE_BLOCKED"
    ],
    "safetyStatus": "BLOCKED",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": []
  },
  {
    "editionId": "PILOT-SAIL",
    "familyId": "PILOT",
    "displayName": "MAREA PILOT SAIL",
    "definitionStatus": "CONDITIONAL",
    "editionType": "HARDWARE_SYSTEM",
    "readiness": "NOT_READY",
    "requiresQuotation": true,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "SAFETY_GATE_BLOCKED"
    ],
    "safetyStatus": "BLOCKED",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": []
  },
  {
    "editionId": "PILOT-PRO",
    "familyId": "PILOT",
    "displayName": "MAREA PILOT PRO",
    "definitionStatus": "INSTALLATION_PACKAGE",
    "editionType": "INSTALLATION_PACKAGE",
    "readiness": "NOT_READY",
    "requiresQuotation": true,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "SAFETY_GATE_BLOCKED"
    ],
    "safetyStatus": "BLOCKED",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": []
  },
  {
    "editionId": "SENSE-WIND",
    "familyId": "SENSE",
    "displayName": "MAREA SENSE WIND",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_MODULE",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED"
    ],
    "safetyStatus": "LOCAL_ALARM_INDEPENDENT",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": []
  },
  {
    "editionId": "SENSE-POWER",
    "familyId": "SENSE",
    "displayName": "MAREA SENSE POWER",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_MODULE",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED"
    ],
    "safetyStatus": "LOCAL_ALARM_INDEPENDENT",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": []
  },
  {
    "editionId": "SENSE-BILGE",
    "familyId": "SENSE",
    "displayName": "MAREA SENSE BILGE",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_MODULE",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED"
    ],
    "safetyStatus": "LOCAL_ALARM_INDEPENDENT",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": []
  },
  {
    "editionId": "SENSE-TANKS",
    "familyId": "SENSE",
    "displayName": "MAREA SENSE TANKS",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_MODULE",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED"
    ],
    "safetyStatus": "LOCAL_ALARM_INDEPENDENT",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": []
  },
  {
    "editionId": "SENSE-ENV",
    "familyId": "SENSE",
    "displayName": "MAREA SENSE ENV",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_MODULE",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED"
    ],
    "safetyStatus": "LOCAL_ALARM_INDEPENDENT",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": []
  },
  {
    "editionId": "SENSE-ESSENTIALS",
    "familyId": "SENSE",
    "displayName": "MAREA SENSE ESSENTIALS",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_KIT",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED"
    ],
    "safetyStatus": "LOCAL_ALARM_INDEPENDENT",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [
      "SENSE-POWER",
      "SENSE-BILGE"
    ],
    "dependencyIds": [
      "SENSE-POWER",
      "SENSE-BILGE"
    ],
    "subscriptionCapabilityIds": []
  },
  {
    "editionId": "SENSE-SAIL",
    "familyId": "SENSE",
    "displayName": "MAREA SENSE SAIL",
    "definitionStatus": "CONDITIONAL",
    "editionType": "HARDWARE_KIT",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED"
    ],
    "safetyStatus": "LOCAL_ALARM_INDEPENDENT",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [
      "SENSE-WIND",
      "SENSE-ENV"
    ],
    "dependencyIds": [
      "SENSE-WIND",
      "SENSE-ENV"
    ],
    "subscriptionCapabilityIds": []
  },
  {
    "editionId": "SENSE-SYSTEMS",
    "familyId": "SENSE",
    "displayName": "MAREA SENSE SYSTEMS",
    "definitionStatus": "CONDITIONAL",
    "editionType": "HARDWARE_KIT",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED"
    ],
    "safetyStatus": "LOCAL_ALARM_INDEPENDENT",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [
      "SENSE-POWER",
      "SENSE-BILGE",
      "SENSE-TANKS",
      "SENSE-ENV"
    ],
    "dependencyIds": [
      "SENSE-POWER",
      "SENSE-BILGE",
      "SENSE-TANKS",
      "SENSE-ENV"
    ],
    "subscriptionCapabilityIds": []
  },
  {
    "editionId": "WATCH-CORE",
    "familyId": "WATCH",
    "displayName": "MAREA WATCH CORE",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_DEVICE",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED"
    ],
    "safetyStatus": "LOCAL_SAFETY_INDEPENDENT",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": [
      "ENT-WATCH"
    ]
  },
  {
    "editionId": "WATCH-PLUS",
    "familyId": "WATCH",
    "displayName": "MAREA WATCH PLUS",
    "definitionStatus": "CONDITIONAL",
    "editionType": "HARDWARE_DEVICE",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED"
    ],
    "safetyStatus": "LOCAL_SAFETY_INDEPENDENT",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": [
      "ENT-WATCH"
    ]
  },
  {
    "editionId": "DISPLAY-7",
    "familyId": "DISPLAY",
    "displayName": "MAREA DISPLAY 7",
    "definitionStatus": "DEFINED",
    "editionType": "HARDWARE_DEVICE",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED"
    ],
    "safetyStatus": "NOT_EVALUATED",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": []
  },
  {
    "editionId": "DISPLAY-LARGE-CONDITIONAL",
    "familyId": "DISPLAY",
    "displayName": "MAREA DISPLAY LARGE CONDITIONAL",
    "definitionStatus": "CONDITIONAL",
    "editionType": "HARDWARE_DEVICE",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED"
    ],
    "safetyStatus": "NOT_EVALUATED",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": []
  },
  {
    "editionId": "WEATHER-STANDARD",
    "familyId": "WEATHER",
    "displayName": "MAREA WEATHER STANDARD",
    "definitionStatus": "DEFINED",
    "editionType": "SOFTWARE_SUBSCRIPTION",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "LICENSING_NOT_CLEARED"
    ],
    "safetyStatus": "NOT_EVALUATED",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": [
      "ENT-WEATHER"
    ]
  },
  {
    "editionId": "WEATHER-PRO",
    "familyId": "WEATHER",
    "displayName": "MAREA WEATHER PRO",
    "definitionStatus": "CONDITIONAL",
    "editionType": "SOFTWARE_SUBSCRIPTION",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "LICENSING_NOT_CLEARED"
    ],
    "safetyStatus": "NOT_EVALUATED",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": [
      "ENT-WEATHER"
    ]
  },
  {
    "editionId": "FLEET-START",
    "familyId": "FLEET",
    "displayName": "MAREA FLEET START",
    "definitionStatus": "DEFINED",
    "editionType": "CONTRACTED_SAAS",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "LICENSING_NOT_CLEARED"
    ],
    "safetyStatus": "NOT_EVALUATED",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": [
      "ENT-FLEET"
    ]
  },
  {
    "editionId": "FLEET-BUSINESS",
    "familyId": "FLEET",
    "displayName": "MAREA FLEET BUSINESS",
    "definitionStatus": "DEFINED",
    "editionType": "CONTRACTED_SAAS",
    "readiness": "NOT_READY",
    "requiresQuotation": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "LICENSING_NOT_CLEARED"
    ],
    "safetyStatus": "NOT_EVALUATED",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": [
      "ENT-FLEET"
    ]
  },
  {
    "editionId": "FLEET-ENTERPRISE",
    "familyId": "FLEET",
    "displayName": "MAREA FLEET ENTERPRISE",
    "definitionStatus": "CONDITIONAL",
    "editionType": "CONTRACTED_SAAS",
    "readiness": "NOT_READY",
    "requiresQuotation": true,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "LICENSING_NOT_CLEARED"
    ],
    "safetyStatus": "NOT_EVALUATED",
    "licensingStatus": "NOT_CLEARED",
    "expandsTo": [],
    "dependencyIds": [],
    "subscriptionCapabilityIds": [
      "ENT-FLEET"
    ]
  }
];

export const MAREA_FIXTURE_BUNDLES: readonly MareaFixtureBundle[] = [
  {
    "bundleId": "START",
    "displayName": "MAREA START",
    "components": [
      {
        "lineId": "ST-01",
        "editionId": "HUB-STANDARD",
        "displayName": "MAREA HUB STANDARD",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "ST-02",
        "editionId": "NAV-PRO",
        "displayName": "MAREA NAV PRO",
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
        "displayName": "MAREA HUB PRO",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "ST-04",
        "editionId": "WEATHER-STANDARD",
        "displayName": "MAREA WEATHER STANDARD",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      }
    ],
    "contractOnly": [],
    "ineligible": [],
    "externalRequirements": [
      "installation",
      "cabling",
      "commissioning",
      "licensed chart or weather data where applicable",
      "SIM/connectivity where applicable"
    ],
    "contractedSolution": false,
    "hardwareIncludedByDefault": false,
    "slaEstablished": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "COMPATIBILITY_UNTESTED"
    ],
    "compatibilityStatus": "UNTESTED"
  },
  {
    "bundleId": "CRUISE",
    "displayName": "MAREA CRUISE",
    "components": [
      {
        "lineId": "CR-01",
        "editionId": "NAV-ESSENTIAL",
        "displayName": "MAREA NAV ESSENTIAL",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CR-02",
        "editionId": "HUB-STANDARD",
        "displayName": "MAREA HUB STANDARD",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CR-03",
        "editionId": "AIS-RECEIVER",
        "displayName": "MAREA AIS RECEIVER",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CR-04",
        "editionId": "DISPLAY-7",
        "displayName": "MAREA DISPLAY 7",
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
        "displayName": "MAREA AIS CONNECTED",
        "inclusion": "CONDITIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CR-05",
        "editionId": "NAV-PRO",
        "displayName": "MAREA NAV PRO",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CR-08",
        "editionId": "WEATHER-STANDARD",
        "displayName": "MAREA WEATHER STANDARD",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      }
    ],
    "contractOnly": [],
    "ineligible": [
      {
        "editionId": "DISPLAY-LARGE-CONDITIONAL",
        "displayName": "MAREA DISPLAY LARGE CONDITIONAL",
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
    "contractedSolution": false,
    "hardwareIncludedByDefault": false,
    "slaEstablished": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "COMPATIBILITY_UNTESTED"
    ],
    "compatibilityStatus": "UNTESTED"
  },
  {
    "bundleId": "SAIL",
    "displayName": "MAREA SAIL",
    "components": [
      {
        "lineId": "SL-01",
        "editionId": "NAV-PRO",
        "displayName": "MAREA NAV PRO",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "SL-02",
        "editionId": "HUB-STANDARD",
        "displayName": "MAREA HUB STANDARD",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "SL-03",
        "editionId": "PILOT-COASTAL",
        "displayName": "MAREA PILOT COASTAL",
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
        "displayName": "MAREA SENSE WIND",
        "inclusion": "CONDITIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "SL-05",
        "editionId": "PILOT-SAIL",
        "displayName": "MAREA PILOT SAIL",
        "inclusion": "CONDITIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      }
    ],
    "contractOnly": [],
    "ineligible": [
      {
        "editionId": "PILOT-PRO",
        "displayName": "MAREA PILOT PRO",
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
    "contractedSolution": false,
    "hardwareIncludedByDefault": false,
    "slaEstablished": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "COMPATIBILITY_UNTESTED"
    ],
    "compatibilityStatus": "UNTESTED"
  },
  {
    "bundleId": "PROTECT",
    "displayName": "MAREA PROTECT",
    "components": [
      {
        "lineId": "PR-01",
        "editionId": "WATCH-CORE",
        "displayName": "MAREA WATCH CORE",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "PR-02",
        "editionId": "SENSE-ESSENTIALS",
        "displayName": "MAREA SENSE ESSENTIALS",
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
        "displayName": "MAREA WATCH PLUS",
        "inclusion": "CONDITIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "PR-04",
        "editionId": "HUB-STANDARD",
        "displayName": "MAREA HUB STANDARD",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      }
    ],
    "contractOnly": [],
    "ineligible": [],
    "externalRequirements": [
      "installation",
      "cabling",
      "commissioning",
      "licensed chart or weather data where applicable",
      "SIM/connectivity where applicable"
    ],
    "contractedSolution": false,
    "hardwareIncludedByDefault": false,
    "slaEstablished": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "COMPATIBILITY_UNTESTED"
    ],
    "compatibilityStatus": "UNTESTED"
  },
  {
    "bundleId": "COMPLETE",
    "displayName": "MAREA COMPLETE",
    "components": [
      {
        "lineId": "CP-01",
        "editionId": "NAV-PRO",
        "displayName": "MAREA NAV PRO",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-02",
        "editionId": "HUB-PRO",
        "displayName": "MAREA HUB PRO",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-03",
        "editionId": "DISPLAY-7",
        "displayName": "MAREA DISPLAY 7",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-04",
        "editionId": "WATCH-CORE",
        "displayName": "MAREA WATCH CORE",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-05",
        "editionId": "SENSE-POWER",
        "displayName": "MAREA SENSE POWER",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-06",
        "editionId": "SENSE-BILGE",
        "displayName": "MAREA SENSE BILGE",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-07",
        "editionId": "SENSE-TANKS",
        "displayName": "MAREA SENSE TANKS",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-08",
        "editionId": "SENSE-ENV",
        "displayName": "MAREA SENSE ENV",
        "inclusion": "INCLUDED",
        "required": true,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-09",
        "editionId": "PILOT-COASTAL",
        "displayName": "MAREA PILOT COASTAL",
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
        "displayName": "MAREA PILOT SAIL",
        "inclusion": "CONDITIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-10",
        "editionId": "AIS-RECEIVER",
        "displayName": "MAREA AIS RECEIVER",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "CP-11",
        "editionId": "WEATHER-PRO",
        "displayName": "MAREA WEATHER PRO",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      }
    ],
    "contractOnly": [],
    "ineligible": [
      {
        "editionId": "PILOT-PRO",
        "displayName": "MAREA PILOT PRO",
        "reason": "INSTALLATION_PACKAGE_NEVER_A_PRICED_SKU_OR_BUNDLE_LINE"
      },
      {
        "editionId": "DISPLAY-LARGE-CONDITIONAL",
        "displayName": "MAREA DISPLAY LARGE CONDITIONAL",
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
    "contractedSolution": false,
    "hardwareIncludedByDefault": false,
    "slaEstablished": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "COMPATIBILITY_UNTESTED"
    ],
    "compatibilityStatus": "UNTESTED"
  },
  {
    "bundleId": "FLEET",
    "displayName": "MAREA FLEET",
    "components": [
      {
        "lineId": "FP-01",
        "editionId": "FLEET-START",
        "displayName": "MAREA FLEET START",
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
        "displayName": "MAREA WATCH CORE",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "FP-06",
        "editionId": "HUB-STANDARD",
        "displayName": "MAREA HUB STANDARD",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      },
      {
        "lineId": "FP-12",
        "editionId": "FLEET-BUSINESS",
        "displayName": "MAREA FLEET BUSINESS",
        "inclusion": "OPTIONAL",
        "required": false,
        "quantity": 1,
        "expandsTo": []
      }
    ],
    "contractOnly": [
      {
        "editionId": "FLEET-ENTERPRISE",
        "displayName": "MAREA FLEET ENTERPRISE",
        "reason": "CONTRACTED_B2B_TIER_NOT_SELF_SERVICE"
      }
    ],
    "ineligible": [],
    "externalRequirements": [
      "installation",
      "cabling",
      "commissioning",
      "licensed chart or weather data where applicable",
      "SIM/connectivity where applicable"
    ],
    "contractedSolution": true,
    "hardwareIncludedByDefault": false,
    "slaEstablished": false,
    "restrictions": [
      "PUBLICATION_NOT_AUTHORIZED",
      "TRADEMARK_NOT_CLEARED",
      "PRICE_NOT_APPROVED",
      "STOCK_NOT_VERIFIED",
      "COMPATIBILITY_UNTESTED",
      "LICENSING_NOT_CLEARED"
    ],
    "compatibilityStatus": "UNTESTED"
  }
];

export const MAREA_FIXTURE_ENTITLEMENTS: readonly MareaFixtureEntitlement[] = [
  {
    "entitlementId": "ENT-NAV-PRO",
    "name": "NAV PRO SUBSCRIPTION",
    "term": "YEAR",
    "sharedLedgerKey": "ACCOUNT:NAV_PRO",
    "localSafetyIndependent": true,
    "note": null,
    "requiresLicensedData": false,
    "doubleBillingAllowed": false
  },
  {
    "entitlementId": "ENT-NAV-ESSENTIAL",
    "name": "NAV ESSENTIAL SUBSCRIPTION",
    "term": "YEAR",
    "sharedLedgerKey": "ACCOUNT:NAV_ESSENTIAL",
    "localSafetyIndependent": true,
    "note": null,
    "requiresLicensedData": false,
    "doubleBillingAllowed": false
  },
  {
    "entitlementId": "ENT-WEATHER",
    "name": "WEATHER SUBSCRIPTION",
    "term": "YEAR",
    "sharedLedgerKey": "ACCOUNT:WEATHER",
    "localSafetyIndependent": true,
    "note": null,
    "requiresLicensedData": true,
    "doubleBillingAllowed": false
  },
  {
    "entitlementId": "ENT-WATCH",
    "name": "WATCH MONITORING SUBSCRIPTION",
    "term": "MONTH",
    "sharedLedgerKey": "ACCOUNT:WATCH_MONITORING",
    "localSafetyIndependent": true,
    "note": null,
    "requiresLicensedData": false,
    "doubleBillingAllowed": false
  },
  {
    "entitlementId": "ENT-FLEET",
    "name": "FLEET SAAS SUBSCRIPTION",
    "term": "MONTH",
    "sharedLedgerKey": "ORGANIZATION:FLEET_VESSEL",
    "localSafetyIndependent": true,
    "note": null,
    "requiresLicensedData": false,
    "doubleBillingAllowed": false
  },
  {
    "entitlementId": "ENT-DISPLAY",
    "name": "DISPLAY BASE SOFTWARE",
    "term": "NONE",
    "sharedLedgerKey": "DEVICE:DISPLAY",
    "localSafetyIndependent": true,
    "note": null,
    "requiresLicensedData": false,
    "doubleBillingAllowed": false
  },
  {
    "entitlementId": "ENT-PILOT-LOCAL",
    "name": "PILOT LOCAL SAFETY",
    "term": "NONE",
    "sharedLedgerKey": "LOCAL:SAFETY_NOT_BILLABLE",
    "localSafetyIndependent": true,
    "note": null,
    "requiresLicensedData": false,
    "doubleBillingAllowed": false
  },
  {
    "entitlementId": "ENT-SENSE-LOCAL",
    "name": "SENSE LOCAL SENSING",
    "term": "NONE",
    "sharedLedgerKey": "LOCAL:SAFETY_NOT_BILLABLE",
    "localSafetyIndependent": true,
    "note": null,
    "requiresLicensedData": false,
    "doubleBillingAllowed": false
  },
  {
    "entitlementId": "ENT-AIS",
    "name": "AIS RECEIVE ONLY",
    "term": "NONE",
    "sharedLedgerKey": "DEVICE:AIS_RECEIVE_ONLY",
    "localSafetyIndependent": true,
    "note": null,
    "requiresLicensedData": false,
    "doubleBillingAllowed": false
  },
  {
    "entitlementId": "ENT-CHART",
    "name": "CHART DATA LICENCE",
    "term": "YEAR",
    "sharedLedgerKey": "DATA_PROVIDER:CHARTS",
    "localSafetyIndependent": true,
    "note": null,
    "requiresLicensedData": true,
    "doubleBillingAllowed": false
  },
  {
    "entitlementId": "ENT-SIM",
    "name": "SIM DATA PLAN",
    "term": "MONTH",
    "sharedLedgerKey": "CONNECTIVITY_PROVIDER:SIM",
    "localSafetyIndependent": true,
    "note": null,
    "requiresLicensedData": false,
    "doubleBillingAllowed": false
  },
  {
    "entitlementId": "ENT-CLOUD-MONITORING",
    "name": "CLOUD MONITORING",
    "term": "MONTH",
    "sharedLedgerKey": "ACCOUNT:WATCH_MONITORING",
    "localSafetyIndependent": true,
    "note": null,
    "requiresLicensedData": false,
    "doubleBillingAllowed": false
  }
];
