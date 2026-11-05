# MC-22 — Canonical product mapping (DISPLAY, PILOT, FLEET)

| Field | Value |
| --- | --- |
| Milestone | MC-22/36 — internal catalogue batch 3 (DISPLAY, PILOT, FLEET) ES/EN |
| Kind | Product-truth documentation — exact canonical traceability |
| Scope | 3 families (DISPLAY, PILOT, FLEET) and 8 new editions |
| Verdict context | Internal catalogue only; every record is `NOT_FOR_SALE`, `INTERNAL_ONLY` |
| Canonical sources read | `docs/marea/commerce-data/data/product-families.json`, `product-editions.json`, `bundle-compositions.json`, `readiness-dimensions.json`; `docs/marea/products/product-definitions.batch-03.json` (DISPLAY, FLEET) and `.batch-02.json` (PILOT) |

All values below are copied verbatim from the canonical datasets. No value is invented; a field that is
absent in canonical data is recorded as `ABSENT`. `NOT_FOR_SALE` / `BLOCKED` / `NOT_*` are the canonical
states, not marketing language.

## 1. Family records (from `product-families.json`)

| Field | DISPLAY | PILOT | FLEET |
| --- | --- | --- | --- |
| familyId | DISPLAY | PILOT | FLEET |
| displayName | MAREA DISPLAY | MAREA PILOT | MAREA FLEET |
| productType | HARDWARE | HARDWARE | SAAS |
| lifecycleState | DEFINED | DEFINED | DEFINED |
| publicationState | INTERNAL_ONLY | INTERNAL_ONLY | INTERNAL_ONLY |
| commercialAvailability | NOT_FOR_SALE | NOT_FOR_SALE | NOT_FOR_SALE |
| engineeringStatus | NOT_VERIFIED | NOT_VERIFIED | NOT_VERIFIED |
| licensingStatus | NOT_CLEARED | NOT_CLEARED | NOT_CLEARED |
| hardwareStatus | NOT_SELECTED | NOT_SELECTED | NOT_APPLICABLE_SOFTWARE_PRODUCT |
| dataRightsStatus | NOT_GRANTED | NOT_GRANTED | NOT_GRANTED |
| complianceStatus | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| safetyStatus | NOT_EVALUATED | BLOCKED | NOT_EVALUATED |
| operationsStatus | NOT_READY | NOT_READY | NOT_READY |
| priceStatus | HYPOTHESIS_UNAPPROVED | HYPOTHESIS_UNAPPROVED | HYPOTHESIS_UNAPPROVED |
| brandPublicationStatus | NOT_GRANTED | NOT_GRANTED | NOT_GRANTED |
| routeId | mareaFamilyDisplay | mareaFamilyPilot | mareaFamilyFleet |
| editionIds | DISPLAY-7, DISPLAY-LARGE-CONDITIONAL | PILOT-COASTAL, PILOT-SAIL, PILOT-PRO | FLEET-START, FLEET-BUSINESS, FLEET-ENTERPRISE |
| source | product-families.json#families[familyId=DISPLAY] | product-families.json#families[familyId=PILOT] | product-families.json#families[familyId=FLEET] |

Batch-3 safety/hardware anchors from the product-definition contracts (read verbatim):

- **DISPLAY** (`product-definitions.batch-03.json#products.DISPLAY`): `hardwareBoundary.sizeState = SIZE_NOT_FROZEN`,
  `hardwareBoundary.hardwareState = HARDWARE_NOT_SELECTED`, `hardwareBoundary.bomState = BOM_NOT_ESTABLISHED`,
  `hardwareBoundary.measuredPerformance = false`, `pilotControlAuthority = false`, `chartRightsGranted = false`.
- **PILOT** (`product-definitions.batch-02.json#products.PILOT`): `safetyGate = BLOCKED`, `seaTrialsCompleted = false`,
  `remoteHelmControl = PROHIBITED`, `physicalEstopEvidence = NOT_FOUND`, `motorIsolationEvidence = NOT_FOUND`,
  `rudderFeedbackEvidence = NOT_FOUND`; steering modes `HEADING_HOLD = NOT_VERIFIED`,
  `WIND_ANGLE = CONDITIONAL_ON_VERIFICATION`, `ROUTE_FOLLOW = CONDITIONAL_ON_VERIFICATION`.
- **FLEET** (`product-definitions.batch-03.json#products.FLEET`): `multiTenantProductionService = false`,
  `slaEstablished = false`, `securityCertificationClaimed = false`, `customerProductionDataUsed = false`,
  `tenancy.telemetryReadOnly = true`, `tenancy.remoteControlPath = false`, `tenancy.defaultRole = NO_ACCESS`,
  `tenancy.slaState = NO_SLA_ESTABLISHED`.

## 2. Readiness dimensions (11 dimensions × 3 families, from `product-families.json` readiness + `readiness-dimensions.json`)

| Dimension (canonical order) | DISPLAY | PILOT | FLEET |
| --- | --- | --- | --- |
| definition | COMPLETE_TARGET_SPECIFICATION | COMPLETE_TARGET_SPECIFICATION | COMPLETE_TARGET_SPECIFICATION |
| engineering | NOT_VERIFIED | NOT_VERIFIED | NOT_VERIFIED |
| licensing | NOT_CLEARED | NOT_CLEARED | NOT_CLEARED |
| hardware | NOT_SELECTED | NOT_SELECTED | NOT_APPLICABLE_SOFTWARE_PRODUCT |
| dataRights | NOT_GRANTED | NOT_GRANTED | NOT_GRANTED |
| compliance | NOT_STARTED | NOT_STARTED | NOT_STARTED |
| safety | NOT_EVALUATED | BLOCKED | NOT_EVALUATED |
| pricing | HYPOTHESIS_UNAPPROVED | HYPOTHESIS_UNAPPROVED | HYPOTHESIS_UNAPPROVED |
| brandPublication | NOT_GRANTED | NOT_GRANTED | NOT_GRANTED |
| operations | NOT_READY | NOT_READY | NOT_READY |
| availability | NOT_FOR_SALE | NOT_FOR_SALE | NOT_FOR_SALE |

The 11-dimension taxonomy and its fail-closed rule ("all dimensions ready before COMMERCIALLY_AVAILABLE")
come from `readiness-dimensions.json`; every dimension's current state is `NOT_READY`/blocked for all three
families.

## 3. The eight new editions (from `product-editions.json`)

Common to all eight: `merchantable = false`, `priceApproved = false`, `merchantSkuCode = null`,
`commercialAvailability = NOT_FOR_SALE`, `publicationState = INTERNAL_ONLY`, `lifecycleState = DEFINED`.

| Edition | familyId | editionType | definitionStatus | requiresQuotation | priceStatus | safetyStatus | skuIdentity | featureKeys |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DISPLAY-7 | DISPLAY | HARDWARE_DEVICE | DEFINED | false | HYPOTHESIS_UNAPPROVED | NOT_EVALUATED | EDITION_ID_IS_STABLE_IDENTITY | DISPLAY_CHART_VIEW, DISPLAY_INSTRUMENTS |
| DISPLAY-LARGE-CONDITIONAL | DISPLAY | HARDWARE_DEVICE | CONDITIONAL | false | NOT_ESTABLISHED | NOT_EVALUATED | EDITION_ID_IS_STABLE_IDENTITY | DISPLAY_CHART_VIEW, DISPLAY_INSTRUMENTS |
| PILOT-COASTAL | PILOT | HARDWARE_SYSTEM | DEFINED | true | HYPOTHESIS_UNAPPROVED | BLOCKED | EDITION_ID_IS_STABLE_IDENTITY | PILOT_SUPERVISED_STEERING, PILOT_MANUAL_TAKEOVER, PILOT_ESTOP |
| PILOT-SAIL | PILOT | HARDWARE_SYSTEM | CONDITIONAL | true | NOT_ESTABLISHED | BLOCKED | EDITION_ID_IS_STABLE_IDENTITY | PILOT_SUPERVISED_STEERING, PILOT_MANUAL_TAKEOVER, PILOT_ESTOP |
| PILOT-PRO | PILOT | INSTALLATION_PACKAGE | INSTALLATION_PACKAGE | true | NOT_APPLICABLE | BLOCKED | INSTALLATION_PACKAGE_NOT_A_SKU | PILOT_SUPERVISED_STEERING, PILOT_MANUAL_TAKEOVER, PILOT_ESTOP |
| FLEET-START | FLEET | CONTRACTED_SAAS | DEFINED | false | HYPOTHESIS_UNAPPROVED | NOT_EVALUATED | EDITION_ID_IS_STABLE_IDENTITY | FLEET_TENANCY, FLEET_VESSEL_REGISTRY, FLEET_ROLES, FLEET_AUDIT |
| FLEET-BUSINESS | FLEET | CONTRACTED_SAAS | DEFINED | false | HYPOTHESIS_UNAPPROVED | NOT_EVALUATED | EDITION_ID_IS_STABLE_IDENTITY | FLEET_TENANCY, FLEET_VESSEL_REGISTRY, FLEET_ROLES, FLEET_AUDIT |
| FLEET-ENTERPRISE | FLEET | CONTRACTED_SAAS | CONDITIONAL | true | NOT_ESTABLISHED | NOT_EVALUATED | CONTRACTED_TIER_NOT_A_CHECKOUT_SKU | FLEET_TENANCY, FLEET_VESSEL_REGISTRY, FLEET_ROLES, FLEET_AUDIT |

Edition source path: `product-editions.json#editions[editionId=<id>]`; feature definitions cite
`product-definitions.batch-02.json#products.PILOT` or `product-definitions.batch-03.json#products.<DISPLAY|FLEET>`
with status `DEFINED_INTERNAL_NOT_VERIFIED`.

`requiresQuotation = true` applies exactly to PILOT-COASTAL, PILOT-SAIL, PILOT-PRO (per-vessel survey and
quotation) and FLEET-ENTERPRISE (contracted tier). DISPLAY-7, DISPLAY-LARGE-CONDITIONAL, FLEET-START and
FLEET-BUSINESS carry `requiresQuotation = false`.

## 4. releaseGateDependencies

Family-level gates (from `product-families.json`) and edition-level gates (from `product-editions.json`) are
identical within each family:

- **DISPLAY** (11 gates): GATE-COMMERCIAL-CLAIMS, GATE-CONSUMER-TERMS, GATE-CRA-CYBERSECURITY,
  GATE-DATA-LICENSING, GATE-INSURANCE, GATE-IP-CLEARANCE, GATE-LEGAL-ENTITY, GATE-MARKET-PLACEMENT,
  GATE-PAYMENTS, GATE-PRICING, GATE-WEBSITE-REMEDIATION.
- **PILOT** (11 gates): GATE-COMMERCIAL-CLAIMS, GATE-CONSUMER-TERMS, GATE-CRA-CYBERSECURITY, GATE-INSURANCE,
  GATE-IP-CLEARANCE, GATE-LEGAL-ENTITY, GATE-MARKET-PLACEMENT, GATE-PAYMENTS, GATE-PRICING,
  **GATE-SAFETY-PILOT**, GATE-WEBSITE-REMEDIATION.
- **FLEET** (10 gates): GATE-COMMERCIAL-CLAIMS, GATE-CONSUMER-TERMS, GATE-CRA-CYBERSECURITY,
  GATE-DATA-LICENSING, GATE-IP-CLEARANCE, GATE-LEGAL-ENTITY, GATE-PAYMENTS, GATE-PRICING,
  GATE-PRIVACY-DPA-DPIA, GATE-WEBSITE-REMEDIATION.

The canonical release-gate register (`docs/marea/legal-commercial/data/release-evidence-gates.json`) holds
13 gates with `status` values `BLOCKED` ×12 and `EVIDENCE_REQUIRED` ×1; **0 CLOSED**.

## 5. Bundle references (from `bundle-compositions.json`)

| Bundle | Edition line | inclusion |
| --- | --- | --- |
| CRUISE | DISPLAY-7 (CR-04) | INCLUDED (required) |
| CRUISE | DISPLAY-LARGE-CONDITIONAL (CR-07) | ineligible — CONDITIONAL_SIZE_NOT_SELECTABLE |
| SAIL | PILOT-COASTAL (SL-03) | QUOTATION_REQUIRED (required) |
| SAIL | PILOT-SAIL (SL-05) | CONDITIONAL (optional) |
| SAIL | PILOT-PRO (SL-06) | ineligible — INSTALLATION_PACKAGE_NEVER_A_PRICED_SKU_OR_BUNDLE_LINE |
| COMPLETE | DISPLAY-7 | INCLUDED (required) |
| COMPLETE | PILOT-COASTAL (CP-09) | QUOTATION_REQUIRED (required) |
| COMPLETE | PILOT-SAIL (CP-14) | CONDITIONAL (optional) |
| COMPLETE | PILOT-PRO (CP-13) | ineligible — INSTALLATION_PACKAGE_NEVER_A_PRICED_SKU_OR_BUNDLE_LINE |
| COMPLETE | DISPLAY-LARGE-CONDITIONAL (CP-15) | ineligible — CONDITIONAL_SIZE_NOT_SELECTABLE |
| FLEET | FLEET-START (FP-01) | INCLUDED (required) |
| FLEET | FLEET-BUSINESS (FP-12) | OPTIONAL |
| FLEET | FLEET-ENTERPRISE (FP-02) | contract-only — CONTRACTED_B2B_TIER_NOT_SELF_SERVICE |

`FLEET` bundle carries `hardwareIncludedByDefault = false`, `slaEstablished = false`,
`contractedSolution = true`. All bundles carry `commercialAvailability = NOT_FOR_SALE`,
`priceApproved = false`, `checkoutAllowed = false`, `orderable = false`, `publicationAuthorized = false`,
`indexationAuthorized = false`.

## 6. Ten governance gates (external authorisations — BLOCKED, verbatim)

```text
TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE = NO_GO
SOURCE_IP_CLEARANCE = NOT_CLEARED
LICENSING_RIGHTS_GRANTED = false
PRICE_APPROVED = NONE
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
PUBLICATION_AUTHORIZED = false
INDEXATION_AUTHORIZED = false
PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED
GATE-PRIVACY-DPA-DPIA = BLOCKED
```

Source: `docs/marea/catalog/data/catalog-projection.json` (verbatim, byte-identical to base `1dc9aa0`) and
`docs/marea/legal-commercial/data/release-evidence-gates.json`. None is granted; these are external
authorisations and remain **BLOCKED**, not a software milestone PASS.
