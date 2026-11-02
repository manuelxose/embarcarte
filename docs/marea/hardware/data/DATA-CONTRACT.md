# MC-11 — Machine-readable evidence data contract (D32, contract)

Status: `BINDING_INSIDE_MC-11`. Owner: Lead. Authority for every file in `docs/marea/hardware/data/`
and for `scripts/check-marea-hardware.mjs`. A field described here as required is required; a
specialist may add fields but may not omit one or invent a vocabulary value outside the enumerations.

## 1. Non-negotiable data rules

1. **No fabricated source.** Every externally observed figure (price, parameter, regulation deadline)
   resolves through `evidenceId` to `data/evidence-index.json`, which carries the real URL, publisher,
   retrieval date and the exact assertion the source supports.
2. **Unknown is not zero.** A missing amount is `null` with `status: "UNKNOWN"`. A total containing a
   missing amount is `totalStatus: "INCOMPLETE"` and must not carry a numeric `totalEur`.
3. **No quotation may be invented.** `FORMAL_SUPPLIER_QUOTATION` and `SUPPLIER_QUOTED` are
   **forbidden** in this milestone: no supplier has been contacted.
4. **No claim upgrade.** `TESTED`/`SUPPORTED` compatibility, NMEA certification, CE marking,
   IP/temperature/EMC ratings, sensor accuracy and guaranteed alert delivery are forbidden values.
5. **Quantities are integers.** `qtyPerUnit >= 1` for a `REQUIRED`/`OPTIONAL` material line.
6. **Currencies** are ISO-4217. Costs are `EUR`; a non-EUR observation converts only with a recorded
   `fxRates` entry (`from`, `to`, `rate`, `sourceUrl`, `retrievedOn`); otherwise the line is
   `COST_UNVERIFIED`.
7. **VAT never mixes.** Each price observation declares `vatTreatment`. A BOM/cost line whose input
   was `VAT_INCLUDED` must set `normalizationApplied: true` and `normalizationNote`. `VAT_UNKNOWN`
   forces the containing total to `INCOMPLETE`.
8. **Tier integrity.** A BOM line reuses the price observation's tier; a volume adjustment is allowed
   only through a named `ENGINEERING_ASSUMPTION` record (`volumeAdjustmentAssumptionId`).
9. **Dates are real.** `observedAt` / `retrievedOn` are the actual retrieval dates of this session
   (`2026-11-02` unless a specialist documents otherwise). No future dates, no invented revision dates.
10. **A record inherits the weakest evidence class of its inputs.** A `CALCULATED_ESTIMATE` derived
    from an `ENGINEERING_ASSUMPTION` is an estimate, not an observation.
11. **The validator is read-only.** It never writes business data; it exits non-zero on violation.
12. **No runtime dependencies.** Plain Node (`node:fs`, `node:path`, `node:assert`), matching the
    existing `scripts/check-marea-*.mjs` gates.

## 2. Identifiers (all unique inside their namespace)

| Namespace | Pattern | Owner |
|---|---|---|
| Evidence | `EVD-MC11-###` (3 digits) | every author; index is Lead-merged |
| Claim | `CLM-MC11-###` | every author |
| Component | `CMP-<BLOCK>-##` | sourcing (`sourcing-specialist`) |
| Price observation | `PO-<BLOCK>-###` | sourcing |
| Supplier | `SUP-<slug>-<##>` | sourcing |
| Architecture option | `ARCH-<FAMILY>-<A..E>` | architecture |
| BOM | `EBOM-<FAMILY>-<edition>` / `MBOM-…` | economics |
| BOM line | `<bomId>-L###` | economics |
| Cost scenario | `SCN-<FAMILY>-<vol>-<LOW|BASE|HIGH>` | economics |
| Assumption | `ASM-###` | economics |
| Cost category | `COST-##` | economics |
| Conformity row | `CONF-<FAMILY>-<EDITION>` | conformity |
| Legislation | `LEG-<short>` (e.g. `LEG-RED-2014-53-EU`) | conformity |
| Qualification test | `QUAL-<FAMILY>-##` | manufacturing |
| Compatibility row | `COMPAT-<FAMILY>-##` | architecture |
| Risk | `RISK-<DOMAIN>-##` | Lead (aggregates specialist risks) |
| Gate | `G1`…`G7` | Lead |
| Decision | `D-###` (continues the program log from `D-041`) | Lead |
| Review finding | `MC11-F##` | auditor only |

`BLOCK` values: `PROC`, `MCU`, `CAN`, `N183`, `ETH`, `WIFI`, `BLE`, `CELL`, `GNSS`, `SEC`, `PWR`,
`MEM`, `SENSE`, `DISP`, `MECH`, `RF`, `PCB`, `PCBA`, `TEST`, `PKG`, `LOG`.

## 3. Enumerations

- `evidenceClass`: `MANUFACTURER_PUBLIC_LIST_PRICE`, `AUTHORIZED_DISTRIBUTOR_PUBLIC_PRICE`,
  `THIRD_PARTY_RESELLER_PUBLIC_PRICE`, `HISTORICAL_OBSERVATION`, `CALCULATED_ESTIMATE`,
  `ENGINEERING_ASSUMPTION`, `BUDGETARY_INDICATION`, `UNKNOWN`.
  (`FORMAL_SUPPLIER_QUOTATION` is defined by the program but forbidden in MC-11 data.)
- `confidence`: `PUBLIC_PRICE_OBSERVED`, `MANUFACTURER_SPEC_VERIFIED`, `ENGINEERING_ESTIMATE`,
  `COST_UNVERIFIED`.
- `vatTreatment`: `VAT_INCLUDED`, `VAT_EXCLUDED`, `VAT_UNKNOWN`.
- `availabilityClaim`: `IN_STOCK_OBSERVED`, `LISTED_FOR_SALE`, `UNKNOWN`.
- `leadTimeClaim`: `"UNKNOWN"` unless `leadTimeEvidenceId` resolves.
- `lifecycleStatus`: `ACTIVE`, `NRND`, `EOL`, `UNKNOWN`.
- `datasheetStatus`: `RETRIEVED`, `LISTED_NOT_RETRIEVED`, `NOT_FOUND`.
- `criticality` / `riskRating`: `CRITICAL`, `MAJOR`, `MINOR`.
- `secondSourceStatus`: `AVAILABLE`, `SINGLE_SOURCE`, `UNKNOWN`.
- `compatibilityStatus`: `DOCUMENTED_INTERFACE`, `PROPOSED`, `ASSUMED`, `TEST_REQUIRED`, `BLOCKED`.
  (`TESTED`, `SUPPORTED` are rejected.)
- `contactStatus`: `NOT_CONTACTED` (only permitted value).
- `rfqStatus`: `RFQ_DRAFT_PREPARED`, `RFQ_APPROVAL_REQUIRED`, `RFQ_NOT_SENT`.
- `totalStatus`: `COMPLETE_TO_EVIDENCE`, `INCOMPLETE`.
- `testStatus`: `NOT_EXECUTED` (only permitted value in MC-11).
- `gateState`: `CANDIDATE_ONLY`, `NOT_AUTHORIZED`, `NOT_EXECUTED`, `NOT_STARTED`, `NOT_OBTAINED`.
- `safetyClassification`: `NON_SAFETY_RELATED`, `SAFETY_RELEVANT_BLOCKED`.
- `hardwareClass`: `PROPRIETARY_HARDWARE`, `THIRD_PARTY_HARDWARE_DEPENDENT`, `SOFTWARE_ONLY`,
  `LICENSED_DATA_SERVICE`, `SAFETY_BLOCKED`.

## 4. File schemas

All files share the envelope `{ "contractId": "MAREA-MC11-HARDWARE-EVIDENCE-CONTRACT",
"contractVersion": "1.0.0", "milestone": "MC-11", "date": "2026-11-02" }` and their own top-level
array or object as described. Every file lists its `owner` member name.

### 4.1 `manifest.json` (Lead)

`files[]` (`path` relative to `data/`, `owner`, `purpose`, `recordCount`), `deliverables[]`
(`id` D1–D37, `path`, `status`), `provenanceSummary` (`evidenceIds`, `claimIds`, `distinctUrls`,
`retrievedOn`), `baseCommit`, `branch`, `fixtureExclusion`.

### 4.2 `hardware-families.json` (architecture)

`families[9]`: `familyId`, `canonicalName`, `editions[]` (subset of D2 §3), `hardwareClass`,
`requiredPhysicalComponents[]` (capability statements, e.g. "isolated NMEA 2000 CAN interface" — not
component IDs, because component IDs are allocated by sourcing), `optionalPhysicalComponents[]`,
`softwareOnlyComponents[]`,
`externalDataDependencies[]`, `interfaceRequirements[]`, `powerRequirements{ nominalSupply, voltageRange,
typicalConsumptionW|null, standbyConsumptionW|null, evidenceStatus }`, `safetyClassification`,
`provisionalArchitectureId`, `alternativeArchitectureIds[]`, `verificationNeeded[]`,
`supplierEvidenceIds[]`, `preliminaryCost{ status, rangeEur|null }`, `conformityQuestions[]`,
`readiness`, `customerRequirementUncertainty` (must be `"UNVALIDATED"`), `commercialBlockers[]`,
`sharedPlatformBlocks[]`.
`bundles[6]`: `bundleId`, `canonicalName`, `componentLines[]` (`familyId`, `editionId`, `inclusion`,
`quantity`), `physicalHardwareFamilies[]`, `hardwareIncludedByDefault` (bool),
`fixedTurnkeyPrice` (bool, must be `false`), `exclusions[]`, `safetyGate`.

### 4.3 `architecture-options.json` (architecture)

`criteriaWeights` (exactly D2 §6 architecture table, each 1–100, sum 100), `hardGates`,
`options[]`: `architectureId`, `familyId`, `optionClass` (`A`…`E` — development board, compute
module/SOM, custom MCU/gateway, hybrid, software/service-first), `label`, `description`,
`buildingBlocks[]` (block names such as `PROC`, `MCU`, `CAN`, `N183`, `PWR`, `MECH` — not component
IDs), `scores` (all 11 criteria, integers 1–5), `weightedScore` (computed,
2 decimals), `status: "PROPOSED_NOT_APPROVED"`, `limitations[]`, `verificationNeeded[]`,
`conformityImplications[]`, `costImplication`, `evidenceIds[]`.
`recommendations[]`: `familyId`, `preferredArchitectureId`, `rationale`, `confidence`, `explicitlyUnfrozen`.

### 4.4 `component-register.json` (sourcing)

`components[]`: `componentId`, `block`, `name`, `manufacturer`, `mpn`, `function`,
`datasheetUrl`|null, `datasheetStatus`, `mpnEvidenceId`, `lifecycleStatus`, `criticality`,
`secondSourceStatus`, `alternateComponentIds[]`, `keyParameters{}`, `temperatureRange`|null,
`supplyVoltage`|null, `interfaces[]`, `sourcingChannelSupplierIds[]`, `evidenceIds[]`, `notes`,
`assessedOn`.

### 4.5 `supplier-register.json` (sourcing)

`suppliers[]`: `supplierId`, `legalName`, `tradingName`, `website`, `country`, `roles[]`
(`MANUFACTURER`, `AUTHORIZED_DISTRIBUTOR`, `THIRD_PARTY_RESELLER`, `PCB_FAB`, `EMS`, `ENCLOSURE`,
`TEST_LAB`, `LOGISTICS`, `PACKAGING`, `ENGINEERING_SERVICE`), `componentsOrServices[]`,
`manufacturerAuthorizationEvidence` (`UNKNOWN` allowed), `qualityCertStatements[]`,
`contactStatus: "NOT_CONTACTED"`, `rfqStatus`, `risks[]`, `alternativeSupplierIds[]`,
`evidenceIds[]`, `assessedOn`.

### 4.6 `price-observations.json` (sourcing)

`observations[]`: `observationId`, `componentId`|null, `serviceDescription`|null, `supplierId`,
`supplierSku`, `evidenceClass`, `observedUnitPrice` (number|null), `currency`, `vatTreatment`,
`unitQuantity`, `priceQuantityTier` (integer ≥ 1), `moqObserved` (integer|null),
`moqEvidenceId`|null, `observedAt`, `sourceUrl`, `publisher`, `availabilityClaim`,
`availabilityEvidenceId`|null, `leadTimeClaim`, `leadTimeEvidenceId`|null, `lifecycleStatus`,
`confidence`, `limitations`, `independentVerification` (`NOT_PERFORMED`|`VERIFIED_BY_AUDITOR`).

### 4.7 `engineering-bom.json` / 4.8 `manufacturing-bom.json` (economics)

Top level: `status: "ENGINEERING_BOM_NOT_APPROVED"` / `"MANUFACTURING_BOM_NOT_APPROVED"`,
`currency`, `vatTreatment: "VAT_EXCLUDED"`, `boms[]`, `volumeScenarios[]`.
Each BOM: `bomId`, `familyId`, `editionId`|null, `architectureVersion`, `volumeTier`, `lines[]`,
`totals{}`.
Each line: `lineId`, `category` (`ELECTRONIC`, `MECHANICAL`, `CABLE_CONNECTOR`, `PACKAGING`,
`CONSUMABLE`, `LABEL`, `SERVICE`, `TOOLING`, `TEST`), `componentId`|null, `componentName`,
`manufacturer`|null, `mpn`|null, `qtyPerUnit`, `requirement` (`REQUIRED`|`OPTIONAL`),
`candidateSubstitute`|null, `datasheetUrl`|null, `supplierRef`|null, `priceObservationId`|null,
`priceEvidenceClass`, `observedUnitPrice` (number|null), `currency`, `vatTreatment`,
`priceDate`|null, `priceQuantityTier`|null, `volumeAdjustmentAssumptionId`|null,
`availabilityStatus`, `riskRating`, `lifecycleStatus`, `evidenceSource`, `engineeringConfidence`,
`normalizationApplied`, `normalizationNote`|null, `verificationRequirement`.
`totals{}`: `knownLinesEur`, `unknownLineCount`, `knownLineCount`, `totalStatus`, `partialSubtotalEur`
(number|null), `totalEur` (number|null).

### 4.9 `cost-scenarios.json` (economics)

`fxRates[]`: `from`, `to`, `rate`, `sourceUrl`, `retrievedOn`.
`assumptions[]`: `assumptionId`, `statement`, `value`|null, `evidenceClass`, `sensitivity`.
`categories[]`: `categoryId`, `name`, `included`, `basis`.
`scenarios[]`: `scenarioId`, `familyId`, `editionId`|null, `volume`, `case` (`LOW`|`BASE`|`HIGH`),
`lines[]` (`categoryId`, `amountEur`|null, `status` (`KNOWN`|`UNKNOWN`), `basis`), `toolingAmortizationEur`
(number|null), `totalEur` (number|null), `totalStatus`, `missingCategories[]`, `note`.
`certificationCosts[]`: `item`, `amountEur`|null, `status` (`BUDGETARY_INDICATION`|`UNKNOWN`),
`guaranteed` (must be `false`), `source`.
`engineeringCosts[]`: `item`, `amountEur`|null, `status`, `basis`.
`recurringOperatingCosts[]`: `item`, `amountEur`|null, `status`, `basis`.

### 4.10 `conformity-applicability.json` (conformity)

`legislationRegister[]`: `legislationId`, `title`, `officialUrl`, `applicabilityPrinciple`,
`keyDeadlines[]` (`date`, `description`, `evidenceId`), `retrievedOn`, `verificationStatus`.
`products[]`: `productId`, `editionId`|null, `intendedUse`, `intendedMarket[]`,
`manufacturerOperatorStatus`, `radioFunctions[]`, `electricalSupply`, `applicable[]`, `notApplicable[]`.
`applicable[]`: `legislationId`, `rationale`, `candidateStandards[]`, `conformityAssessment`,
`notifiedBodyPotential` (bool), `technicalFileObligations[]`, `testEvidenceNeeded[]`,
`docRequirements[]`, `markingRequirements[]`, `languageRequirements[]`, `lifecycleObligations[]`,
`responsiblePerson`, `costConfidence`, `status`, `qualifiedReviewRequired` (bool), `evidenceIds[]`.
`notApplicable[]`: `legislationId`, `rationale`, `qualifiedReviewRequired`.

### 4.11 `qualification-plan.json` (manufacturing)

`tests[]`: `testId`, `familyId`, `purpose`, `requirementSource`, `acceptanceCriterion`, `testMethod`,
`equipment[]`, `independentLabRequired` (bool), `prototypeRequired` (bool),
`estimatedCost{ status, amountEur|null }`, `responsibleParty`, `status: "NOT_EXECUTED"`,
`evidenceIds[]`.

### 4.12 `nmea-status.json` (architecture)

`nmea2000` and `nmea0183`: `technicalImplementation`, `membership`, `manufacturerIdentification`,
`productCertification`, `approvedTerminology`, `logoUse`, `testedCompatibilityRows` (0),
`claimsPermitted[]`, `claimsProhibited[]`; plus `governanceSources[]` (URLs, retrievedOn).

### 4.13 `compatibility-requirements.json` (architecture)

`rows[]`: `rowId`, `familyId`, `candidateHardware`, `protocol`, `interface`, `dataDirection`,
`requiredMessages`, `thirdPartyAssumption`, `knownLimitations`, `verificationMethod`,
`requiredTestEquipment[]`, `certificationDependencies[]`, `evidence`, `status`,
`deviceTestRecorded` (must be `false`).

### 4.14 `risks.json` (Lead)

`risks[]`: `riskId`, `domain`, `title`, `description`, `likelihood`, `impact`, `evidenceStrength`
(`OBSERVED`|`DOCUMENTED`|`ASSUMED`), `owner`, `mitigation`, `mitigationStatus:
"PROPOSED_NOT_IMPLEMENTED"`, `blockerStatus` (`OPEN`|`BLOCKED`|`MONITORED`),
`nextVerificationAction`, `affectedFamilies[]`, `evidenceIds[]`.

### 4.15 `decisions.json` (Lead)

`decisions[]`: `decisionId`, `date`, `title`, `context`, `decision`, `rationale`, `consequences`,
`evidence[]`, `statusEffect`. `gates[]`: `gateId`, `name`, `state`, `requirementsNeeded[]`,
`authorized` (must be `false`).

### 4.16 `governance-status.json` (Lead)

`invariants{}` (D2 §4 keys and values, restated verbatim), `milestoneState{}`, `restrictions[]`
(`restrictionId`, `statement`, `status`), `asOf`, `authority`.

### 4.17 `review-findings.json` (auditor only)

`reviewId`, `reviewedCommit`, `verdict`, `findings[]` (`findingId`, `severity`, `file`, `line`,
`description`, `correction`, `status`, `verifiedByAuditor`, `evidence`), `sourceVerification[]`,
`calculationsRechecked[]`, `notVerified[]`.

### 4.18 `evidence-index.json` (Lead merges; each author writes its own shard)

To avoid concurrent writes to one shared file, each author writes its own shard
`data/evidence/<member>.json` (e.g. `data/evidence/architecture.json`) containing
`evidence[]` with the record schema below. The Lead merges all shards into
`data/evidence-index.json`; the validator validates the merged index and rejects any reference that
does not resolve in it. A shard is not a deliverable in its own right.

`evidence[]`: `evidenceId`, `claimId`, `url`, `publisher`, `retrievedOn`, `publishedOn`|null,
`evidenceType` (`MANUFACTURER_DATASHEET`, `MANUFACTURER_WEBPAGE`, `DISTRIBUTOR_WEBPAGE`,
`OFFICIAL_LEGAL_TEXT`, `OFFICIAL_STANDARDS_BODY`, `OFFICIAL_GOVERNMENT_GUIDE`,
`THIRD_PARTY_COMMENTARY`), `supportedAssertion`, `limitations`, `confidence`
(`HIGH`|`MEDIUM`|`LOW`|`UNKNOWN`), `affectedItems[]`, `independentVerification`
(`NOT_PERFORMED`|`VERIFIED_BY_AUDITOR`|`DISPUTED`).
Duplicate URLs are permitted only with a different `claimId` **and** a different
`supportedAssertion`; otherwise the record is a duplicate and must be merged.

## 5. Cross-file reconciliation (validator-enforced)

1. Every `componentId`, `supplierId`, `priceObservationId`, `assumptionId`, `legislationId`,
   `architectureId`, `evidenceId` referenced anywhere resolves in its home file.
2. All nine `familyId` values appear in `hardware-families.json`; all six `bundleId` values appear.
3. Every edition used is in the canonical edition list (D2 §3).
4. Every `criticality: "CRITICAL"` component has `secondSourceStatus` ≠ null and, if
   `SINGLE_SOURCE`, a recorded `RISK-SOURCING-*` mitigation in `risks.json`.
5. Bundle `FLEET` has `hardwareIncludedByDefault === false` and no non-optional hardware line.
6. No product or bundle record carries `FOR_SALE`, `APPROVED`, `CERTIFIED` or `TESTED`.
7. Every `status: "TESTED"`/`"SUPPORTED"` compatibility row, NMEA certification claim,
   IP/temperature rating claim, CE claim or guaranteed-alert claim is a hard failure.
8. BOM arithmetic: `knownLinesEur` equals Σ(qty × unit price) for known lines within ±0.01 EUR;
   `totalStatus` is `COMPLETE_TO_EVIDENCE` only when `unknownLineCount === 0`, every line has a
   price, `toolingAmortizationEur` is numeric and no `VAT_UNKNOWN` input exists.
9. `cost-scenarios` totals: `totalEur` present only when `totalStatus === "COMPLETE_TO_EVIDENCE"`;
   at least one LOW, one BASE and one HIGH scenario per hardware-bearing family.
10. `qualification-plan` tests are all `NOT_EXECUTED`; `conformity-applicability` rows never assert
    certification; gates in `decisions.json` are all `authorized: false`.

## 6. Validator check families (`scripts/check-marea-hardware.mjs`)

The mandated 50 integrity rules are implemented as named checks; the mapping must stay explicit in
the script and in `MC11-DECISION-AND-RISK-REGISTER.md`:

| Check | Mandated rule (Master Prompt §27) |
|---|---|
| V01 | Unknown product IDs rejected |
| V02 | Unknown bundle IDs rejected |
| V03 | Missing product coverage rejected (nine families) |
| V04 | Missing bundle coverage rejected (six bundles) |
| V05 | Duplicate component IDs rejected |
| V06 | One supplier identity presented as two suppliers rejected |
| V07 | Component claim without datasheet evidence rejected |
| V08 | Public price mislabelled as a formal quote rejected |
| V09 | Formal quote without genuine provenance rejected |
| V10 | Supplier contact claimed without evidence rejected |
| V11 | Purchased component without approval rejected |
| V12 | BOM quantity ≤ 0 rejected |
| V13 | Incomplete BOM total presented as complete rejected |
| V14 | Missing currency rejected |
| V15 | Mixed VAT bases without normalisation rejected |
| V16 | Price tier mismatch between observation and line rejected |
| V17 | Missing observation date rejected |
| V18 | Unsupported stock/lead-time claim rejected |
| V19 | Invented MOQ (no evidence) rejected |
| V20 | Currency conversion without rate provenance rejected |
| V21 | Unknown manufacturing cost treated as zero rejected |
| V22 | Complete cost claim omitting tooling rejected |
| V23 | Certification cost presented as guaranteed price rejected |
| V24 | Unapproved retail price rejected |
| V25 | Customer demand cited from MC-10 rejected |
| V26 | Customer WTP presented as validated rejected |
| V27 | Compatibility `TESTED` without evidence rejected |
| V28 | Compatibility `SUPPORTED` without authorisation rejected |
| V29 | NMEA certification claimed without evidence rejected |
| V30 | CE certification claimed from compliant components rejected |
| V31 | Applicable legislation without scope rationale rejected |
| V32 | Inapplicable legislation without evaluation rejected |
| V33 | Regulatory deadline without current source rejected |
| V34 | Compliance claimed from an unexecuted test plan rejected |
| V35 | Environmental rating claimed without test rejected |
| V36 | WATCH guaranteed alert delivery rejected |
| V37 | PILOT safety gate weakened rejected |
| V38 | AIS transmit capability added rejected |
| V39 | FLEET default hardware introduced rejected |
| V40 | SAIL/COMPLETE fixed turnkey price invented rejected |
| V41 | OPEN-MARINE source IP falsely cleared rejected |
| V42 | Trademark falsely cleared rejected |
| V43 | Product for-sale status enabled rejected |
| V44 | Public copy/checkout changed rejected (tree guard) |
| V45 | Production deployment authorised rejected |
| V46 | Source-only engineering assumption reported as fact rejected |
| V47 | Totals computed from inconsistent quantities rejected |
| V48 | Missing second-source risk for critical single-source component rejected |
| V49 | Design recommendation represented as final frozen approval rejected |
| V50 | Formal procurement declared complete with zero suppliers contacted rejected |

Each check must have at least one adversarial fixture in `scripts/check-marea-hardware.test.mjs`
that proves the check fails when the rule is violated, and the valid tree must pass.

## 7. Fixture exclusion and change control

- Test fixtures are in-memory objects inside the test file; **no mutated JSON is written to disk** and
  no `docs/marea/hardware/data/*.json` file is ever rewritten by a test.
- Contract changes require: a new `contractVersion`, a decision entry (`D-0xx`), a validator update
  and an auditor re-verification. A contract change may never be used to make a failing rule pass.
