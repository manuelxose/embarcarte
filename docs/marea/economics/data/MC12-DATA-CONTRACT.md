# MC-12 D02 — Economic data contract

Status: `INTERNAL_ECONOMIC_DATA_CONTRACT`. Milestone MC-12. Date: 2026-11-02.
Owner: Data Contract and Validation Engineering.
Authority: this contract governs every file in `docs/marea/economics/data/`. The
executable gate is `scripts/check-marea-unit-economics.mjs`.

## 1. Purpose

The contract makes the economic model machine-checkable. It fixes identifiers,
units, currencies, VAT treatment, evidence classes, arithmetic rules and the
cross-file reconciliations that a deterministic validator must enforce. A model
that cannot satisfy this contract is not delivered.

## 2. Universal rules

| Rule | Requirement |
|---|---|
| `U-01` | UTF-8 JSON, no BOM, 2-space indentation. |
| `U-02` | Every file has `contractId`, `contractVersion`, `milestone: "MC-12"`, `date: "2026-11-02"`, `owner`, `currency: "EUR"`. |
| `U-03` | Every identifier is unique within its file and stable across releases. |
| `U-04` | Money is a JSON number rounded to 2 decimals (half-up) or `null`. `null` means unknown and is never `0`. |
| `U-05` | Percentages are numbers rounded to 1 decimal or `null`. |
| `U-06` | Dates are ISO `YYYY-MM-DD`. No observation may post-date `asOf` (`2026-11-02`). |
| `U-07` | Any non-EUR amount is accompanied by `conversion: {rate, rateSourceUrl, rateDate, evidenceClass}`. |
| `U-08` | No file may assert `APPROVED`, `FINAL`, `PURCHASABLE`, `AVAILABLE_FOR_SALE` or a validated demand. |
| `U-09` | Recomputable totals are declared and the validator recomputes them; tolerance ±0.005 EUR. |
| `U-10` | A file may reference an ID in another file only if that ID exists there. |

## 3. Vocabulary

### 3.1 Evidence class

```
FORMAL_PROVIDER_QUOTATION   negotiated quotation received by EMBARCARTE (MUST be absent in MC-12)
EXECUTED_CONTRACT           signed contract (MUST be absent in MC-12)
PUBLISHED_PROVIDER_TARIFF   public provider price list / pricing page
OFFICIAL_LICENSING_DOCUMENT law, official guidance, official licence text
PUBLIC_PRICE_OBSERVATION    single public listing (distributor, store, catalogue)
ENGINEERING_ASSUMPTION      internal, labelled, not evidenced
INACCESSIBLE                source exists but could not be retrieved
UNKNOWN                     no source and no defensible assumption
NOT_AUTHORIZED              obtaining the evidence requires an authorization not granted
```

### 3.2 Other enumerations

| Field | Allowed values |
|---|---|
| `priceStatus` | `PUBLISHED`, `ON_REQUEST`, `NOT_PUBLISHED`, `INACCESSIBLE`, `NOT_APPLICABLE`, `UNKNOWN` |
| `vatBasis` | `VAT_EXCLUDED`, `VAT_INCLUDED`, `VAT_UNKNOWN`, `VAT_NOT_APPLICABLE` |
| `rightsStatus` / `redistribution` | `PERMITTED`, `REQUIRES_CONTRACT`, `PROHIBITED`, `UNKNOWN`, `NOT_GRANTED`, `NOT_APPLICABLE` |
| `productionEligible` | `YES`, `NO`, `UNKNOWN`, `NOT_APPLICABLE` |
| `costStatus` | `KNOWN`, `ASSUMPTION`, `UNKNOWN`, `NOT_APPLICABLE`, `NOT_QUANTIFIABLE` |
| `costBehaviour` | `VARIABLE`, `STEPPED`, `CONTRACT_MINIMUM`, `ANNUAL_FIXED`, `ONE_TIME`, `UNCERTAIN` |
| `driver` | `PER_DEVICE_MONTH`, `PER_VESSEL_MONTH`, `PER_SUBSCRIPTION_MONTH`, `PER_ORGANIZATION_MONTH`, `PER_VESSEL_IN_TENANT`, `PER_MESSAGE_OR_ALERT`, `PER_GB`, `PER_TELEMETRY_EVENT`, `PER_CHART_ENTITLEMENT`, `PER_SUPPORT_INCIDENT`, `PER_ACCOUNT_YEAR`, `PER_TRANSACTION`, `PER_UNIT`, `ONE_OFF`, `ANNUAL_FIXED`, `CONTRACT_MINIMUM` |
| `classification` | `ECONOMICS_EVIDENCED`, `CONDITIONAL_ECONOMIC_CASE`, `COST_MODEL_INCOMPLETE`, `LICENSING_BLOCKED`, `SAFETY_BLOCKED`, `DEFER_RECOMMENDED` |
| `contributionStatus` | `COMPLETE_UNDER_LABELLED_ASSUMPTIONS`, `INCOMPLETE_UNKNOWN_COSTS` |
| `confidence` | `HIGH`, `MEDIUM`, `LOW`, `NONE` |
| `objectType` | `PHYSICAL_SKU`, `SOFTWARE_ENTITLEMENT`, `SUBSCRIPTION`, `OPTIONAL_ACCESSORY`, `INSTALLER_SERVICE`, `CONDITIONAL_EDITION`, `QUOTATION_PACKAGE` |
| `commercialAvailability` | `NOT_FOR_SALE` (only permitted value) |

`UNKNOWN` and `NOT_APPLICABLE` are terminal declarations, not aliases: `UNKNOWN`
means the value could not be established, `NOT_APPLICABLE` means the field does not
apply to that record. They are never silently mapped to a numeric zero.

## 4. File inventory and schemas

All paths are relative to `docs/marea/economics/data/`.

### 4.1 `manifest.json`

```json
{
  "contractId": "MAREA-MC12-ECONOMIC-MANIFEST",
  "contractVersion": "1.0.0",
  "milestone": "MC-12",
  "date": "2026-11-02",
  "owner": "…",
  "currency": "EUR",
  "asOf": "2026-11-02",
  "branch": "feature/marea-mc12-recurring-data-unit-economics",
  "baseCommit": "5b47a3d51fa875a08ed6f4ad8448a3e51a0f0499",
  "status": "INTERNAL_ECONOMICS_ANALYSIS",
  "commercialAvailability": "NOT_FOR_SALE",
  "priceApproved": "NONE",
  "files": { "assumptions": "assumptions.json", "…": "…" },
  "evidenceCounts": { "formalQuotations": 0, "executedContracts": 0, "publishedTariffs": 0, "publicPriceObservations": 0, "officialLicensingDocuments": 0, "engineeringAssumptions": 0, "unknown": 0 },
  "statusBlock": { "MC12_VERDICT": "PARTIAL", "…": "…" }
}
```

`statusBlock` must equal the final delivery status block, including
`MC12_INTERNAL_ECONOMICS_SCOPE`, `MC12_EXTERNAL_COMMERCIAL_EVIDENCE`,
`CUSTOMER_WTP_VALIDATED: false`, `PRICE_APPROVED: "NONE"`,
`LICENSING_RIGHTS_GRANTED: false`, `COMMERCIAL_AVAILABILITY: "NOT_FOR_SALE"`,
`INDEPENDENT_REVIEW`, `PR_CREATED`, `MERGED: false`, `DEPLOYED: false`,
`MC13_STARTED: false`.

### 4.2 `assumptions.json`

```json
{
  "contractId": "MAREA-MC12-ASSUMPTIONS", "contractVersion": "1.0.0", "milestone": "MC-12", "date": "2026-11-02", "owner": "…", "currency": "EUR",
  "decisionRules": {
    "weights": { "costEvidence": 25, "recurringCertainty": 15, "licensingReadiness": 20, "technicalReadiness": 10, "customerEvidence": 15, "regulatoryReadiness": 10, "contributionConfidence": 5 },
    "classificationOrder": ["SAFETY_BLOCKED", "LICENSING_BLOCKED", "COST_MODEL_INCOMPLETE", "ECONOMICS_EVIDENCED", "CONDITIONAL_ECONOMIC_CASE", "DEFER_RECOMMENDED"],
    "evidencedRequiresZeroMaterialUnknowns": true
  },
  "assumptions": [
    { "id": "ASM-MC12-001", "statement": "…", "value": 21, "unit": "percent", "evidenceClass": "OFFICIAL_LICENSING_DOCUMENT", "sensitivity": "HIGH", "usedBy": ["unit-economics"], "notes": "…" }
  ]
}
```

Every number used in the model that is not directly evidenced must appear here or
in `recurring-cost-inputs.json` / `legal-tax-inputs.json`.

### 4.3 `providers.json`

Merged, authoritative provider register. The two research files
(`provider-evidence.chart-weather.json`, `provider-evidence.connectivity-cloud.json`)
are the raw collection; `providers.json` is the reviewed union.

Record fields: `id`, `dependency`, `provider`, `product`, `territory`,
`licenceScope`, `redistribution`, `offlineCaching`, `perDeviceOrUser`,
`apiOrSdk`, `commercialUse`, `minimumCommitment`, `evidenceClass`, `priceStatus`,
`price`, `priceCurrency`, `priceUnit`, `vatBasis`, `rightsGranted`,
`productionEligible`, `quotationRequired`, `sourceUrl`, `sourceTitle`,
`retrievedOn`, `notes`.

Plus `quotationRegister: { "status": "EMPTY", "formalQuotations": 0, "executedContracts": 0, "rfqPackages": "NOT_SENT" }`.

### 4.4 `recurring-cost-inputs.json`

```json
{
  "contractId": "MAREA-MC12-RECURRING-COST-INPUTS", "contractVersion": "1.0.0", "milestone": "MC-12", "date": "2026-11-02", "owner": "…", "currency": "EUR",
  "usageProfiles": { "LOW": { "…": 0 }, "BASE": { "…": 0 }, "HIGH": { "…": 0 } },
  "inputs": [
    {
      "id": "RC-001", "dependency": "CLOUD_INFRA", "provider": "…", "item": "…",
      "driver": "PER_DEVICE_MONTH", "valueEur": 0.0833, "unit": "EUR per device-month",
      "status": "KNOWN", "evidenceClass": "PUBLISHED_PROVIDER_TARIFF",
      "costBehaviour": "VARIABLE", "sourceUrl": "…", "sourceTitle": "…",
      "retrievedOn": "2026-11-02", "vatBasis": "VAT_EXCLUDED",
      "calculation": "…", "notes": "…"
    }
  ]
}
```

### 4.5 `hardware-cost-reconciliation.json`

Produced by the hardware cost reconciliation, recomputed from
`docs/marea/hardware/data/cost-scenarios.json`. Required top-level keys:
`invariant`, `categoryBasis`, `families[]`, `totals`, `unknowns`, `conclusions`.
Each family scenario must expose `knownSubtotalEur`, `recomputedSubtotalEur`,
`sumCheckDeltaEur`, `cost16ToolingEur`, `toolingAmortizationFieldEur`,
`variableCostExcludingToolingEur`, `installationCostEur`,
`variableCostExcludingToolingAndInstallationEur`, `unknownCategories`,
`totalStatus`, `confidence`.

### 4.6 `licensing-rights.json`

```json
{
  "contractId": "MAREA-MC12-LICENSING-RIGHTS", "contractVersion": "1.0.0", "milestone": "MC-12", "date": "2026-11-02", "owner": "…", "currency": "EUR",
  "rights": [
    {
      "id": "LR-CHART-001", "dependency": "CHART_DATA", "rightRequired": "…",
      "rightsStatus": "NOT_GRANTED", "evidenceClass": "OFFICIAL_LICENSING_DOCUMENT",
      "sourceRecordIds": ["PE-CW-001"], "blocksProductIds": ["NAV"],
      "blockerId": "BLK-LIC-01", "notes": "…"
    }
  ],
  "summary": { "chartRightsGranted": false, "weatherRightsGranted": false, "nmeaCertified": false, "connectivityContract": false, "cloudContract": false }
}
```

### 4.7 `unit-economics.json`

```json
{
  "contractId": "MAREA-MC12-UNIT-ECONOMICS", "contractVersion": "1.0.0", "milestone": "MC-12", "date": "2026-11-02", "owner": "…", "currency": "EUR",
  "method": { "vatConversion": "net = gross / (1 + vatRatePct/100)", "variableCostExcludes": ["COST-16", "ENGINEERING_NRE", "CERTIFICATION_ONE_OFF"], "contributionDefinition": "Net revenue ex-VAT − known variable cost before fixed operating costs" },
  "records": [
    {
      "id": "UE-HUB-STANDARD-100-BASE",
      "skuId": "HUB-STANDARD", "familyId": "HUB", "objectType": "PHYSICAL_SKU",
      "configuration": "HARDWARE_ONLY_SELF_INSTALL", "volume": 100, "case": "BASE",
      "revenue": { "grossHypothesisEur": 349, "vatBasis": "VAT_INCLUDED", "vatRatePct": 21, "netRevenueEur": 288.43, "priceStatus": "HYPOTHESIS_UNAPPROVED", "basis": "…" },
      "costLines": [ { "id": "COST-01", "category": "…", "amountEur": 8.56, "status": "KNOWN", "evidenceClass": "PUBLIC_PRICE_OBSERVATION", "variable": true, "notes": "…" } ],
      "knownVariableCostEur": 281.13,
      "unknownCostCategories": [ { "category": "CERTIFICATION", "reason": "…", "materiality": "MATERIAL" } ],
      "contributionBeforeUnknownsEur": 7.3,
      "contributionStatus": "INCOMPLETE_UNKNOWN_COSTS",
      "contributionPct": null,
      "headroomEur": 7.3,
      "recurringContributionEurYear": 0,
      "classification": "COST_MODEL_INCOMPLETE",
      "confidence": "LOW", "notes": "…"
    }
  ],
  "summary": { "records": 0, "economicsEvidenced": 0 }
}
```

Rules: when `unknownCostCategories` contains a `MATERIAL` entry,
`contributionStatus` must be `INCOMPLETE_UNKNOWN_COSTS` and `contributionPct`
must be `null`. `headroomEur` is the maximum additional unknown cost that keeps
contribution at zero (i.e. `netRevenueEur − knownVariableCostEur`).

### 4.8 `bundle-economics.json`

One record per bundle (`START`, `CRUISE`, `SAIL`, `PROTECT`, `COMPLETE`, `FLEET`):
`id`, `bundleId`, `priceHypothesisId`, `grossHypothesisEur`, `vatBasis`,
`vatRatePct`, `netRevenueEur`, `componentEconomicIds[]`, `knownVariableCostEur`,
`unknownCostCategories[]`, `contributionBeforeUnknownsEur`,
`contributionStatus`, `contributionPct`, `classification`, `notes`.

Bundle component IDs must match `docs/marea/bundles/bundle-definitions.json`;
bundle `FLEET` must have no default hardware and no hardware cost line.

### 4.9 `channel-economics.json`

Channels: `DIRECT_TO_CONSUMER`, `PROFESSIONAL_INSTALLER`, `DISTRIBUTOR_RETAIL`,
`APP_STORE`, `QUOTATION_INSTALLATION`. Each record declares `revenueDeductionPct`,
`fixedFeeEur`, `status`, `evidenceClass`, `sourceUrl`, `appliesTo`.

### 4.10 `sensitivity-scenarios.json`

```json
{ "scenarios": [ { "id": "SEN-01", "label": "…", "baseRecordId": "UE-…", "lever": "HARDWARE_COST_INCREASE", "multiplier": 1.2, "resultContributionBeforeUnknownsEur": 0, "status": "CONDITIONAL", "notes": "…" } ] }
```

Levers: `HARDWARE_COST_INCREASE`, `YIELD_LOSS`, `FX_MOVEMENT`, `CLOUD_USAGE`,
`CELLULAR_OVERAGE`, `DATA_LICENCE_COST`, `RETURNS_WARRANTY`,
`PAYMENT_PROCESSING`, `DISTRIBUTOR_MARGIN`, `INSTALLER_MARGIN`, `SUPPORT_COST`,
`SUBSCRIPTION_ACTIVATION_RETENTION`.

### 4.11 `blocker-register.json`

Blockers with `id`, `domain`, `title`, `productIds`, `impact`, `severity`
(`BLOCKING`/`MAJOR`/`MINOR`), `status`, `owner`, `approvalRequired`,
`sourceRefs`, `requiredEvidence`, `external`.

### 4.12 `decision-matrix.json`

`dimensions[]` (id + weight summing to 100), `families[]` with per-dimension
scores 0–5 and a declared `weightedScore`, `classification`, `rationale`,
`blockerIds`; plus `priorityOrder[]`. The validator recomputes each weighted
score from the registered weights and the published scores.

### 4.13 `legal-tax-inputs.json`

Produced by the legal/tax research: `items[]`, `vatRules`, `consumerGuarantee`,
`cra`, `gdpr`, `insurance`, `hardBoundaries[]`. Every item has `sourceUrl` and
`retrievedOn` unless `evidenceClass` is `ENGINEERING_ASSUMPTION` or `UNKNOWN`.

### 4.14 `mc13-handoff-inputs.json`

Declared one-time investments, recurring costs, unknown inputs, capital and
working-capital needs, customer-acquisition status (`UNKNOWN`), and
`mc13Started: false`. No 12/36/60-month forecast and no break-even claim.

## 5. Mandatory validation checks

The executable gate must implement at least the following. Identifiers are stable.

### Structural

| ID | Check |
|---|---|
| `S-01` | All required files exist and parse as JSON. |
| `S-02` | Every file satisfies `U-02`; every ID satisfies `U-03`. |
| `S-03` | Every cross-file reference resolves (`U-10`). |
| `S-04` | Dates are ISO and not after `asOf`; every price/dependency observation has `sourceUrl` + `retrievedOn`. |
| `S-05` | Every enum value is in the vocabulary of §3. |

### Governance and truthfulness

| ID | Check |
|---|---|
| `V-01` | No approved price: no price status outside `HYPOTHESIS_UNAPPROVED` / `NOT_ESTABLISHED`. |
| `V-02` | `commercialAvailability` is `NOT_FOR_SALE` everywhere. |
| `V-03` | PILOT is never purchasable: classification `SAFETY_BLOCKED` or `QUOTATION_PACKAGE`; no approved PILOT price. |
| `V-04` | No AIS transmission offering; `AIS_TRANSMISSION_OFFERED` false; all AIS text is receive-only. |
| `V-05` | FLEET hardware-free by default; FLEET bundle has no hardware cost line. |
| `V-06` | No subscription gates local safety: every entitlement has `gatesLocalSafety: false`. |
| `V-07` | Inherited milestone verdicts unchanged against frozen expected strings. |
| `V-08` | `CUSTOMER_EVIDENCE = NONE`, `CUSTOMER_WTP_VALIDATED = false`; no record claims validated demand. |
| `V-09` | `FORMAL_PROVIDER_QUOTATION` and `EXECUTED_CONTRACT` absent; quotation register empty; RFQ `NOT_SENT`. |
| `V-10` | Every cost input has `evidenceClass` and `costBehaviour`; unclassified input fails. |
| `V-11` | A numeric price requires a source URL and retrieval date. |
| `V-12` | A published price is never labelled as a quotation. A `PUBLISHED` status with a non-zero price requires `PUBLISHED_PROVIDER_TARIFF` or `PUBLIC_PRICE_OBSERVATION`; a zero-fee public-domain or open-licence dataset may be `PUBLISHED` with `OFFICIAL_LICENSING_DOCUMENT`. |
| `V-13` | No chart/weather right is presented as granted; `rightsGranted` false where a contract does not exist. |
| `V-14` | A free/non-commercial tier is not `productionEligible: YES`. |
| `V-15` | Evidence older than 180 days relative to `asOf` is not silently reused (`retrievedOn` within window). |
| `V-16` | Unknown cost is `null`, never `0`; a `0` is allowed only as an evidenced zero for that category. |
| `V-17` | A material unknown **unit-variable** cost ⇒ `contributionStatus = INCOMPLETE_UNKNOWN_COSTS` and `contributionPct = null`. A fixed one-off unknown (tooling, certification, insurance, engineering NRE) is excluded from unit contribution, listed in `fixedCostsExcluded`, and does not by itself force the percentage to null. |
| `V-18` | `economicsEvidenced` count is 0 while any material unknown or missing quotation exists. |

### Arithmetic

| ID | Check |
|---|---|
| `A-01` | `netRevenueEur` recomputed from gross and VAT basis/rate. |
| `A-02` | `knownVariableCostEur` equals the sum of variable `KNOWN` cost lines. |
| `A-03` | `contributionBeforeUnknownsEur = netRevenueEur − knownVariableCostEur`, recomputed. |
| `A-04` | `headroomEur` recomputed. |
| `A-05` | Recurring totals: monthly × 12, per-vessel × vessels × 12, subscription × 12; recomputed. |
| `A-06` | Bundle `netRevenueEur` and `knownVariableCostEur` recomputed from components/price hypothesis. |
| `A-07` | Sensitivity results recomputed from the base record and the declared multiplier. |
| `A-08` | Decision-matrix weighted score recomputed from registered weights and scores. |
| `A-09` | Tooling invariant: for all 90 MC-11 scenarios, `Σ lines = knownSubtotalEur` and `toolingAmortizationEur = COST-16 line`; the hardware reconciliation declares `PASS` with delta 0. |
| `A-10` | Unit economics excludes `COST-16` from variable cost; installation (`COST-12`) is never counted twice. |
| `A-11` | Fixed costs (tooling, engineering NRE, certification one-off) are flagged `variable: false`. |
| `A-12` | Every currency is EUR; every conversion has a recorded rate and source. |
| `A-13` | No VAT-inclusive figure is used as net revenue. |
| `A-14` | Rounding: recomputation tolerance 0.005; percentages 1 dp. |

### Recurring exposure

| ID | Check |
|---|---|
| `R-01` | Every connected hardware SKU (HUB, WATCH, DISPLAY, AIS) carries recurring cost inputs or an explicit `UNKNOWN` entry. |
| `R-02` | WATCH carries a cellular connectivity input, `KNOWN` or `UNKNOWN`, never absent. |
| `R-03` | WATCH and FLEET carry cloud/telemetry per-device-month inputs. |
| `R-04` | Inactive/suspended device state is modelled. |
| `R-05` | Alert notification cost is modelled; no guaranteed-delivery claim. |
| `R-06` | Support cost per active subscription is present or explicitly `UNKNOWN`. |
| `R-07` | Security-support / CRA lifecycle cost is present or explicitly `UNKNOWN`. |
| `R-08` | Storage and retention are modelled with a retention period. |

### Delivery and no-regression

| ID | Check |
|---|---|
| `D-01` | No MC-13 artefact: `mc13Started: false`, no multi-period forecast file. |
| `D-02` | No break-even or profitability claim. |
| `D-03` | Status block exists in `manifest.json` and matches the delivery values. |
| `D-04` | MC-11 source files are read-only; their content hash is unchanged by MC-12 (recomputed against the recorded baseline). |

## 6. Adversarial testing policy

`scripts/check-marea-unit-economics.test.mjs` must prove that the validator
rejects invalid data, not merely that valid data passes. At minimum one negative
test per governance (`V-*`) and arithmetic (`A-*`) check, plus the recurring
(`R-*`) and delivery (`D-*`) families. Fixtures are in-memory clones; tests never
write business data. For every negative test the expected check ID must fail.

## 7. Change control

- A change to this contract requires a new `contractVersion` and a delivery note.
- Adding a check is non-breaking; removing or weakening one is breaking and must
  be recorded in the decision log.
- The validator is read-only with respect to business data: it never rewrites,
  repairs or migrates a dataset.
- Findings raised by the independent reviewer are closed only after the reviewer
  re-runs the gate against the corrected commit.
