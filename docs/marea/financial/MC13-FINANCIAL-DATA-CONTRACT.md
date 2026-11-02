# MC-13 D02 — Financial data contract

| Field | Value |
|---|---|
| Deliverable | D02 `MC13-FINANCIAL-DATA-CONTRACT.md` |
| Status | `INTERNAL_FINANCIAL_DATA_CONTRACT` |
| Milestone | MC-13/36 — 60-month financial model, cash flow, investment requirements, scenario economics and conditional break-even |
| Date | 2026-11-02 |
| Owner | Financial Data Engineering |
| Authority | This contract governs every file in `docs/marea/financial/` and `docs/marea/financial/data/`. The executable gate is `scripts/check-marea-financial-model.mjs`. |
| Predecessor | MC-12 `e59a8b9b3916d979d8eaeff78acd3795fd26c125` (verified local = remote) |
| Boundary | Analysis only. No price approval, no commercial availability, no financing approval, no break-even claim, no MC-14 start. |

## 1. Purpose

The contract makes the financial model machine-checkable. It fixes the canonical file
inventory, identifiers, units, currencies, VAT and cash-flow treatment, evidence
classes, scenario switches, arithmetic rules and cross-file reconciliations that the
deterministic validator must enforce. A model that cannot satisfy this contract is not
delivered. Human-readable reports must reconcile with the machine data through the
generated figures register (§4.19).

## 2. Universal rules

| Rule | Requirement |
|---|---|
| `U-01` | UTF-8 JSON, no BOM, 2-space indentation. Markdown is UTF-8 without BOM. |
| `U-02` | Every governed JSON file has `contractId`, `contractVersion`, `milestone: "MC-13"`, `date: "2026-11-02"`, `owner`, `currency: "EUR"`, `asOf: "2026-11-02"`. Derived files may inherit `contractId` from `manifest.json`. |
| `U-03` | Every identifier is unique within its file and stable across releases. Derived-file identifiers are deterministic from the generation inputs. |
| `U-04` | Money is a JSON number rounded to 2 decimals (half-up) or `null`. `null` means unknown and is never `0`. |
| `U-05` | Percentages are numbers rounded to 2 decimals or `null`. Quantities are integers or `null`. |
| `U-06` | Dates are ISO `YYYY-MM-DD`. No observation may post-date `asOf` (`2026-11-02`). Model-relative periods are `M01`…`M60`; no calendar launch date is asserted. |
| `U-07` | Every non-EUR amount carries `conversion: {rate, rateSourceId, rateDate, evidenceClass}`. MC-13 inherits MC-11/MC-12 conversion bases; it does not re-base inherited BOM lines (decision D-051; MC-13 decision D-053). |
| `U-08` | No file may assert `APPROVED`, `FINAL`, `PURCHASABLE`, `AVAILABLE_FOR_SALE`, `VALIDATED_DEMAND`, `PROFITABLE`, `BREAK_EVEN_VERIFIED` or an equivalent. |
| `U-09` | Recomputable totals are declared and the validator recomputes them from inputs; tolerance ±0.005 EUR. A declared total is never compared with itself. |
| `U-10` | A file may reference an ID in another file only if that ID exists there. Every derived financial result declares lineage to assumptions and sources (§5). |
| `U-11` | Unknown inputs stay `null` with `unknownReason`; a missing cost is never converted to `0` by omission or by aggregation. |

## 3. Vocabulary

### 3.1 Evidence class

```
VERIFIED_OBSERVED           directly observed fact recorded with source and date
PUBLISHED_TARIFF            public provider price list / official rate, not a contract
OFFICIAL_LICENSING_DOCUMENT law, official guidance or official licence text
CONTRACTED                  signed contract (MUST be absent in MC-13)
INHERITED_ASSUMPTION        labelled assumption inherited from MC-11/MC-12
ENGINEERING_ASSUMPTION      internal engineering estimate, not evidenced
SCENARIO_ASSUMPTION         illustrative planning input with no external basis
UNKNOWN                     no source and no defensible assumption
BLOCKED                     obtaining the evidence requires an authorization not granted
```

`VERIFIED_OBSERVED` is reserved for arithmetic checks on inherited records, not for
prices, demand or quotations. No MC-13 input is `CONTRACTED`.

### 3.2 Enumerations

| Field | Allowed values |
|---|---|
| `status` (input) | `KNOWN`, `CONDITIONAL`, `UNKNOWN`, `BLOCKED`, `NOT_APPLICABLE` |
| `confidence` | `HIGH`, `MEDIUM`, `LOW`, `NONE` |
| `scenarioId` | `RESTRICTED_CURRENT`, `DOWNSIDE`, `BASE_HYPOTHETICAL`, `UPSIDE_HYPOTHETICAL` |
| `eligibilityCase` | `RESTRICTED_CURRENT`, `HYPOTHETICAL_POST_CLEARANCE` |
| `commercialAvailability` | `NOT_FOR_SALE` (only permitted value) |
| `priceStatus` | `HYPOTHESIS_UNAPPROVED`, `NOT_ESTABLISHED`, `NOT_FOR_SALE` |
| `vatBasis` | `VAT_INCLUDED`, `VAT_EXCLUDED_B2B`, `VAT_UNKNOWN` |
| `revenueType` | `HARDWARE`, `SUBSCRIPTION`, `INSTALLATION`, `NONE` |
| `costCategory` | `HARDWARE_COGS`, `CLOUD`, `CONNECTIVITY`, `NOTIFICATIONS`, `STORAGE`, `PAYMENT_PROCESSING`, `SUPPORT`, `DATA_LICENCE`, `SECURITY_MAINTENANCE`, `CRA_LIFECYCLE`, `INSURANCE`, `WARRANTY_RESERVE`, `ENGINEERING`, `OPERATIONS`, `SALES_MARKETING`, `LEGAL_ACCOUNTING`, `PRODUCT_MANAGEMENT`, `COMPLIANCE`, `INFRASTRUCTURE_MANAGEMENT` |
| `behaviour` | `FIXED`, `STEPPED`, `VARIABLE`, `ONE_TIME`, `CONTRACT_MINIMUM` |
| `clearanceGate` | `CHART_LICENCE`, `WEATHER_LICENCE`, `NMEA_LICENCE`, `RED_CERTIFICATION`, `EMC_CONFORMITY`, `SAFETY_GATE`, `NONE` |
| `breakEvenType` | `UNIT_CONTRIBUTION_ZERO`, `OPERATING_BREAK_EVEN`, `CASH_FLOW_BREAK_EVEN`, `CUMULATIVE_CASH_RECOVERY`, `FINANCING_REQUIREMENT`, `MINIMUM_GROSS_PRICE` |
| `breakEvenStatus` | `NOT_DETERMINABLE`, `CONDITIONAL_HYPOTHETICAL_THRESHOLD`, `CONDITIONAL_RESTRICTED_ZERO` |
| `findingSeverity` | `BLOCKING`, `MAJOR`, `MINOR`, `INFORMATIONAL` |
| `reviewStatus` | `PENDING_INDEPENDENT_REVIEW`, `PASS_INTERNAL_FINANCIAL_SCOPE`, `PARTIAL`, `FAIL` |

`UNKNOWN` and `NOT_APPLICABLE` are terminal declarations, never aliases for zero.

## 4. Canonical file inventory and schemas

All paths are relative to `docs/marea/financial/` unless stated.

### 4.0 Canonical deliverable inventory

| ID | File |
|---|---|
| D01 | `MC-13-BASELINE-AND-GOVERNANCE.md` |
| D02 | `MC13-FINANCIAL-DATA-CONTRACT.md` |
| D03 | `MC13-ASSUMPTIONS-AND-EVIDENCE-REGISTER.md` |
| D04 | `MC13-60-MONTH-INTEGRATED-FINANCIAL-MODEL.md` |
| D05 | `MC13-REVENUE-AND-COHORT-FORECASTS.md` |
| D06 | `MC13-HARDWARE-PRODUCTION-AND-INVENTORY-CASHFLOW.md` |
| D07 | `MC13-RECURRING-REVENUE-AND-SAAS-ECONOMICS.md` |
| D08 | `MC13-OPEX-AND-SECURITY-LIFECYCLE-COSTS.md` |
| D09 | `MC13-CAPEX-AND-FUNDING-REQUIREMENTS.md` |
| D10 | `MC13-WORKING-CAPITAL-AND-CASHFLOW.md` |
| D11 | `MC13-SCENARIOS-12-36-60.md` |
| D12 | `MC13-CONDITIONAL-BREAK-EVEN-ANALYSIS.md` |
| D13 | `MC13-SENSITIVITY-AND-STRESS-TESTS.md` |
| D14 | `MC13-PORTFOLIO-AND-CAPITAL-PRIORITIZATION.md` |
| D15 | `MC13-UNKNOWN-COSTS-AND-COMMERCIAL-BLOCKERS.md` |
| D16 | `MC13-MC14-HANDOFF.md` |
| D17 | `data/*.json` + `scripts/marea-financial-engine.mjs` + `scripts/build-marea-financial-model.mjs` |
| D18 | `scripts/check-marea-financial-model.mjs` + `scripts/check-marea-financial-model.test.mjs` |
| D19 | `review/MC-13-REVIEW.md` + `data/review-findings.json` |
| D20 | `MC13-EXECUTIVE-REPORT.md` (Spanish) |
| D21 | `MC-13-DELIVERY.md` |

Derived human-readable register: `MC13-GENERATED-FIGURES.md` (generated, never hand-edited).

### 4.1 `data/manifest.json`

```json
{
  "contractId": "MAREA-MC13-FINANCIAL-MANIFEST",
  "contractVersion": "1.0.0",
  "milestone": "MC-13",
  "date": "2026-11-02",
  "owner": "programme-lead",
  "currency": "EUR",
  "asOf": "2026-11-02",
  "branch": "feature/marea-mc13-financial-model-cashflow-break-even",
  "baseCommit": "e59a8b9b3916d979d8eaeff78acd3795fd26c125",
  "baseBranch": "feature/marea-mc12-recurring-data-unit-economics",
  "status": "INTERNAL_FINANCIAL_ANALYSIS",
  "modelHorizonMonths": 60,
  "reportingViewsMonths": [12, 36, 60],
  "commercialAvailability": "NOT_FOR_SALE",
  "priceApproved": "NONE",
  "files": { "assumptions": "assumptions.json", "...": "..." },
  "evidenceCounts": { "formalQuotations": 0, "executedContracts": 0, "verifiedObserved": 0, "publishedTariffs": 0, "inheritedAssumptions": 0, "engineeringAssumptions": 0, "scenarioAssumptions": 0, "unknown": 0, "blocked": 0 },
  "unknownSummary": [ { "inputId": "...", "unknownReason": "..." } ],
  "statusBlock": { "MC13_VERDICT": "PARTIAL", "...": "..." }
}
```

`statusBlock` must equal the final delivery status block and `data/review-findings.json`
must record the same independent-review verdict.

### 4.2 `data/assumptions.json`

One record per financial input, including every numeric scenario input. The mandatory
record shape is exactly the §6 contract of the Master Prompt:

```json
{
  "id": "ASM-MC13-001",
  "name": "Spanish standard VAT rate applied to consumer price hypotheses",
  "value": 21,
  "valueType": "NUMBER",
  "unit": "percent",
  "currency": "EUR",
  "period": "MODEL_HORIZON",
  "sourcePath": "docs/marea/economics/data/assumptions.json",
  "sourceRecordId": "ASM-MC12-001",
  "sourceType": "INHERITED_ASSUMPTION",
  "evidenceClass": "INHERITED_ASSUMPTION",
  "confidence": "MEDIUM",
  "status": "CONDITIONAL",
  "scenarioApplicability": ["BASE_HYPOTHETICAL", "DOWNSIDE", "UPSIDE_HYPOTHETICAL"],
  "validFrom": "2026-11-02",
  "lastVerified": "2026-11-02",
  "owner": "financial-architecture",
  "unknownReason": null,
  "dependencies": [],
  "notes": "..."
}
```

Rules: `UNKNOWN`/`BLOCKED` records carry `value: null` and a non-empty `unknownReason`.
Every numeric value used by the engine must resolve to an assumption or to a scenario
definition; the engine may not embed an undeclared constant.

### 4.3 `data/source-ledger.json`

```json
{
  "sources": [ { "id": "SRC-001", "title": "...", "publisher": "...", "url": "...", "retrievedOn": "2026-11-02", "evidenceClass": "INHERITED_ASSUMPTION", "usedBy": ["ASM-MC13-001"], "notes": "..." } ],
  "transformations": [ { "id": "TRF-001", "inputs": ["ASM-MC13-001"], "output": "monthly-financial-model#BASE_HYPOTHETICAL", "operation": "formula or description", "notes": "..." } ]
}
```

Every assumption's `sourcePath`/`sourceRecordId` must resolve to a ledger source or to
an inherited repository data record. Every generated result block must declare at least
one transformation.

### 4.4 `data/revenue-drivers.json`

- `productFamilies[]`: `id`, `editions[]`, `commercialAvailability: "NOT_FOR_SALE"`,
  `clearanceGate`, `clearanceDependencyId`, `safetyBlocked`, `notes`.
  Exactly the nine families NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER, FLEET.
- `hardwareSkus[]`: `id`, `familyId`, `editionId`, `productContractPath`,
  `priceHypothesis { grossAmountEur, vatBasis, period, status, sourcePath, sourceRecordId }`,
  `knownVariableCostEur|null`, `costBasis { sourcePath, sourceRecordId, volumeTier, case }`,
  `costCompleteness`, `unitContributionKnownEur|null`, `recurringCostDriverIds[]`,
  `notes`. SKU and edition IDs must exist in the governing product contracts.
- `subscriptionSkus[]`: same identity fields plus `billingPeriod` (`MONTH`/`YEAR`),
  `sharedEntitlementLedgerId|null`, `knownDirectCostEurPerYear|null`,
  `costCompleteness`, `gatesLocalSafety: false`.
- `bundles[]`: one per START, CRUISE, SAIL, PROTECT, COMPLETE, FLEET, with
  `priceHypothesis { amountEur|null, status, sourcePath }`, `componentEditionIds[]`
  (must match `bundle-definitions.json`), `hardwareByDefault: false` for FLEET.
- `channelMix` is declared per scenario in `scenario-definitions.json` (not in this file),
with `evidenceClass: "SCENARIO_ASSUMPTION"`.
- `demandProfiles[]`: per scenario and SKU, `{ id, scenarioId, skuId, launchOffsetMonths,
  rampMonths, matureMonthlyUnits, evidenceClass: "SCENARIO_ASSUMPTION" }`.
  No `marketShare` or `conversionRate` claim may appear.

### 4.5 `data/recurring-revenue.json`

- `billingModels[]`: annual upfront vs monthly cash, revenue-recognition rule.
- `cohortAssumptions`: per scenario `{ annualRenewalRate, monthlyChurnRate,
  activationRate, deferredRevenueRefundPct }`, all `SCENARIO_ASSUMPTION`.
- `sharedEntitlements[]`: `{ id, entitlement, skuIds[], doubleBillingAllowed: false,
  sharedCostDriverId, notes }`. NAV/WEATHER share one entitlement ledger.
- `paymentProcessing`: published tariff `{ percentage, fixedFeeEur, sourceId }`.
- `inactiveAccountPolicy`: retained identity/storage cost; zero telemetry only.
- `deferredRevenuePolicy`: annual prepayment recognised straight-line over 12 months
  (`ASM-MC13-159`); cash collected on invoice.

### 4.6 `data/operating-costs.json`

`costLines[]`: `id`, `category`, `description`, `behaviour`, `monthlyAmountEur|null`,
`scenarioValues { DOWNSIDE, BASE_HYPOTHETICAL, UPSIDE_HYPOTHETICAL }|null`,
`inflationPctPerYear|null`, `appliesFromMonth`, `appliesToMonth`,
`evidenceClass`, `status`, `sourcePath`, `sourceRecordId`, `unknownReason`,
`dependencies`. Unknown lines are `null`, never `0`. Certification, insurance and CRA
lifecycle costs stay explicit unknown or clearly labelled envelope; no envelope is a
quotation, budget approval or insurance contract.

### 4.7 `data/capital-investments.json`

`items[]` with the §10 fields: `id`, `item`, `estimatedAmountEur|null`,
`evidenceStatus`, `assumptionRange { lowEur, highEur }|null`, `plannedMonth`,
`requiredBeforeRevenue`, `capitalizationTreatment`, `cashFlowTreatment`,
`fundingDependency`, `blockingCondition`, `sourcePath`, `sourceRecordId`, `notes`.
Tooling/NRE is flagged `notAQuote: true` and `notABudget: true`. No amount is an
approved budget.

### 4.8 `data/working-capital.json`

Policy inputs: `safetyStockMonths`, `minimumOrderQuantityUnits`, `leadTimeMonths`,
`supplierPaymentTerms { depositPct, depositAtOrder, balanceDueAfterDays }`,
`customerCollection { directSettlementDays, distributorDays }`,
`inventoryCarryingCostPctPerYear`, `obsolescenceWriteDownPctPerYear`,
`initialInventoryUnits`, `fxHedgeExists: false`. Every value is labelled
`SCENARIO_ASSUMPTION` with `scenarioApplicability`. No MOQ, term or credit agreement
exists.

### 4.9 `data/monthly-financial-model.json`

One integrated model, 60 model-relative periods per scenario. Columnar format:

```json
{
  "contractId": "MAREA-MC13-MONTHLY-FINANCIAL-MODEL",
  "format": "COLUMNAR_V1",
  "milestone": "MC-13",
  "currency": "EUR",
  "horizonMonths": 60,
  "periods": ["M01", "…", "M60"],
  "scenarios": {
    "RESTRICTED_CURRENT": { "eligibilityCase": "RESTRICTED_CURRENT", "statusFlags": {}, "columns": {}, "suppression": {} },
    "DOWNSIDE": { "…": "…" },
    "BASE_HYPOTHETICAL": { "…": "…" },
    "UPSIDE_HYPOTHETICAL": { "…": "…" }
  },
  "lineage": { "columnBlocks": { "grossInvoicedRevenue": ["TRF-…"] } },
  "unknowns": [ { "column": "…", "scenarioId": "…", "reason": "…" } ]
}
```

Required columns per hypothetical scenario (each a 60-element array unless stated):

| Block | Columns |
|---|---|
| Demand | `hardwareUnitsBySku` (object sku→60), `subscriptionNewAccountsBySku`, `subscriptionActiveAccountsBySku`, `fleetActiveVessels`, `hardwareUnitsTotal` |
| Revenue | `grossInvoicedRevenue`, `refundsAllowance`, `vatOutput`, `netRecognizedRevenue`, `hardwareRevenueNet`, `subscriptionRevenueNet` |
| Collections | `cashReceiptsGross`, `tradeReceivablesEnd`, `cashCollectionsNetOfVat`, `paymentFees` |
| Cost | `cogsHardware`, `softwareDirectCosts`, `knownVariableContribution`, `fixedOpexEnvelope`, `ebitdaLikeConditional`, `amortizationNonCash`, `accountingOperatingResult` |
| Inventory | `inventoryUnitsBegin`, `purchasesUnits`, `receiptsUnits`, `unitsSold`, `writeOffsUnits`, `inventoryUnitsEnd`, `inventoryPurchasesCash`, `inventoryAssetCost`, `inventoryPrepayments`, `inventoryPayables`, `inventoryCarryingCost` |
| VAT | `vatCollected`, `vatPaid`, `netVatCash` |
| Capex | `capexCash`, `unknownCapexItems` (string[] at scenario level) |
| Cash flow | `operatingCashFlow`, `investingCashFlow`, `workingCapitalMovement`, `netCashFlow`, `cumulativeCashBalance`, `cashBurn`, `financingRequirement` |
| Governance | `authorizedForSaleMask` (0/1), `revenueSuppressedMask` (0/1) |

`RESTRICTED_CURRENT` has 60 periods with `authorizedForSaleMask` all `0`,
`grossInvoicedRevenue` all `0` (no authorized sale), and monetary
cost/cash columns all `null` with `suppression` reasons, because the current company
cash position and expenses are unknown. Its `knownVariableContribution` is `null`.

Transparency columns required for independent recomputation: `hardwareVatOutput`,
`subscriptionVatOutput`, `directReceiptsGross`, `distributorInvoicedGross`,
`distributorCollectionsGross`, `subscriptionCashGross`, `subscriptionCashNet`,
`deferredRevenueEnd`, `sharedLicenceAccountMonths`, `inventoryReceiptsCost`,
`inventoryWriteOffCost`, `hardwareVatOutput`, `subscriptionVatOutput`, `inputVat`,
`paymentTransactions`. The per-scenario object also declares
`unitCostBySku` so COGS can be recomputed independently.

Identities enforced: `openingCash + Σ netCashFlow = cumulativeCashBalance`;
`operatingCashFlow = ebitdaLikeConditional − workingCapitalMovement` (payment fees are already
inside the conditional contribution, so they must not be subtracted twice);
`inventoryUnitsEnd = inventoryUnitsBegin + receiptsUnits − unitsSold − writeOffsUnits`;
`netCashFlow = operatingCashFlow + investingCashFlow`; `financingRequirement` is the
running maximum of `max(0, −cumulativeCashBalance)`.

### 4.10 `data/scenario-definitions.json`

`scenarios[]`: `id`, `label`, `eligibilityCase`, `statusFlags` (frozen governance flags),
`commercialRevenueAuthorized` (`false` for restricted), `clearanceSchedule[]` with
`{ familyId, gate, hypotheticalClearanceMonth|null, statusFlagUnchanged: true,
conditional: true }`, `demandMultiplier`, `scenarioAssumptionIds[]`, `notes`.
`PILOT` clearance is `null` in every scenario and its safety gate never clears.
No scenario may change a governance status flag.

### 4.11 `data/scenario-results.json`

Aggregates the monthly model into the three required views. Per scenario:
`views: { "M12": {...}, "M36": {...}, "M60": {...} }`, each with `cumulative` totals
and `periodValue` (the value at the view month) for: `grossInvoicedRevenue`,
`netRecognizedRevenue`, `cashCollectionsNetOfVat`, `contribution`,
`ebitdaLikeConditional`, `netCashFlow`, `cumulativeCashBalance`, `capexCash`,
`financingRequirement`, `recurringRevenueSharePct`, `hardwareRevenueSharePct`,
`activeSubscriptions`, `fleetActiveVessels`, `unitsTotal`. Plus `monthlyArrays`
(reference to the monthly model) and `breakEvenMonth` fields.
Every view must be derivable from the single 60-month model; the validator recomputes
all three from `monthly-financial-model.json`.

### 4.12 `data/stress-tests.json`

`cases[]`: `id`, `label`, `baseScenarioId`, `overrides` (declared, typed),
`rationale`, `evidenceClass`, `results { M12, M36, M60 totals, breakEvenMonths,
financingRequirementEur, viabilityCollapsed: bool, unitContributionStillPositive: bool }`,
`status: "CONDITIONAL_HYPOTHETICAL"`. At least 20 single-variable stresses plus
compound adverse cases, including one case where unit contribution remains positive
while the company-level cash position never recovers.

### 4.13 `data/break-even-thresholds.json`

`thresholds[]`: `id`, `scenarioId`, `subjectType` (`SKU`, `FAMILY`, `PORTFOLIO`,
`FLEET`, `SUBSCRIPTION`), `subjectId`, `breakEvenType`, `value|null`, `unit`,
`status`, `derivation`, `requiredUnknownInputs[]`, `inputAssumptionIds[]`, `notes`.
Five types are distinguished and never merged. Any threshold depending on an unknown
cost, licence or demand input is `NOT_DETERMINABLE` and lists the missing input.

### 4.14 `data/portfolio-prioritization.json`

`dimensions[]` with separate, unmerged rankings: `conditionalUnitEconomics`,
`initialCapitalRequirement`, `licensingDependency`, `recurringRevenuePotential`,
`downsideExposure`, `evidenceAcquisitionPriority`. Each dimension:
`{ id, label, direction, familyOrder[], metricBasis[], notes }`. No composite
"launch-readiness" score is permitted. Inherited MC-12 classifications are carried
forward verbatim with `sourceId`.

### 4.15 `data/blocker-register.json`

Financial blockers with `id`, `domain`, `title`, `productIds`, `impact`, `severity`,
`status`, `owner`, `sourceRefs`, `requiredEvidence`, `external`, `inheritedBlockerId`.
Inherited MC-12 blockers are referenced, never silently removed or reclassified.

### 4.16 `data/mc14-handoff-inputs.json`

Financial dependencies MC-14 must consume: compliance cost, insurance exposure,
product liability, warranty and returns, cybersecurity maintenance, CRA implications,
privacy and data-processing cost, payment obligations, claims restrictions,
unresolved licensing and financial consequences of blocked launches.
`mc14Started: false` and `mc14StartedByAnyAgent: false` are mandatory.

### 4.17 `data/review-findings.json`

`reviewedCommit`, `reviewedBranch`, `baseCommit`, `verdict`, `findings[]`
(`id`, `title`, `severity`, `evidence`, `description`, `requiredCorrection`,
`correctionOwner`, `remediationEvidence`, `auditorReverification`, `finalStatus`),
`independentRecomputation`, `commands[]`, `negativeControlEvidence`,
`residualRisks`, `whatWouldChangeVerdict`. The validator rejects open
`BLOCKING`/`MAJOR` findings on the final record.

Additional governed files (declared in `manifest.files`):

- `data/predecessor-baseline.json` — SHA-256 of the 45 inherited MC-11/MC-12
  data and contract files, recomputed by check `D-06`.
- `data/mc13-handoff-consumption.json` — how every MC-12 handoff input was consumed.
- `MC13-GENERATED-FIGURES.md` — the generated figures reconciliation register.
- `MC13-ASSUMPTIONS-AND-EVIDENCE-REGISTER.md` — the generated assumptions and
  evidence register.

### 4.18 `data/mc13-handoff-consumption.json` (input-consumption register)

Records every MC-12 handoff input (`INV-01..06`, `REC-01..08`, customer acquisition,
working capital) and how MC-13 consumed it: `inputId`, `usedBy[]`,
`treatment` (`MODELLED`, `EXPLICIT_UNKNOWN`, `SUPPRESSED`), `notes`. Nothing may be
silently dropped.

### 4.19 `MC13-GENERATED-FIGURES.md`

Generated from the validated data by `scripts/build-marea-financial-model.mjs`. It is
the reconciliation bridge between machine data and human reports. The validator
re-generates it in memory and requires exact equality with the committed file. No
human edits.

## 5. Source and transformation lineage

Every generated result block in §4.9/4.11/4.12 declares lineage to the assumption IDs
and transformation IDs that produced it. The validator requires that each block has at
least one transformation, every transformation input resolves, and no monetary output
is produced by an assumption with `status: UNKNOWN` unless the affected column is
explicitly suppressed or `null`.

## 6. Mandatory validation checks

The executable gate implements at least the checks below. Identifiers are stable. The
implemented contract contains 71 checks; the count emerges from the contract, not from a
target number.

### Structural

| ID | Check |
|---|---|
| `S-01` | All required JSON files exist, parse and satisfy `U-02`. |
| `S-02` | IDs unique per file; cross-file references resolve (`U-10`). |
| `S-03` | Dates ISO and not after `asOf`; sources carry `url`/`retrievedOn` unless inherited/assumption. |
| `S-04` | Enumerations in §3.2; model periods exactly `M01`…`M60`. |
| `S-05` | Canonical deliverable inventory (§4.0) complete. |
| `S-06` | Every assumption record has all mandatory fields from §4.2. |
| `S-07` | Source and transformation lineage resolves; every result block declares lineage. |
| `S-08` | Demand profiles are labelled `SCENARIO_ASSUMPTION` and cover every modelled SKU in every hypothetical scenario. |
| `S-09` | Clearance-dependency schedule covers all nine families in every scenario; PILOT never clears. |
| `S-10` | Package scripts expose the financial gate and the formatting list. |
| `S-11` | Manufacturing volume tiers are the declared analytical tiers 1/10/100/500/1000. |


### Governance and truthfulness

| ID | Check |
|---|---|
| `V-01` | No approved price: every `priceStatus` is `HYPOTHESIS_UNAPPROVED`/`NOT_ESTABLISHED`/`NOT_FOR_SALE`. |
| `V-02` | `commercialAvailability` is `NOT_FOR_SALE` everywhere. |
| `V-03` | PILOT safety gate never clears; zero PILOT units and `null` PILOT cost/revenue in every scenario. |
| `V-04` | AIS is receive-only; no transmission offering or revenue. |
| `V-05` | FLEET has no default hardware; no FLEET hardware revenue/cost. |
| `V-06` | No subscription gates local safety. |
| `V-07` | Inherited milestone verdicts (`MC10..MC12`) frozen and unchanged. |
| `V-08` | `CUSTOMER_EVIDENCE = NONE`, `CUSTOMER_WTP_VALIDATED = false`; every demand input is `SCENARIO_ASSUMPTION`. |
| `V-09` | No `CONTRACTED`/quotation evidence, no executed contract, zero formal quotations. |
| `V-10` | Every cost input has `evidenceClass` and `behaviour`; unknown is `null`. |
| `V-11` | Every numeric price has a source path/record and retrieval basis. |
| `V-12` | Data/licensing costs remain unknown or explicitly labelled; never `0` by omission. |
| `V-13` | Restricted case generates no authorized revenue. |
| `V-14` | Hypothetical clearance switches do not change any status flag. |
| `V-15` | Tooling/NRE not counted twice: capex cash and amortization separated; no amortised tooling in unit variable cost. |
| `V-16` | Installation revenue/cost modelled only in applicable configurations; base case is self-install. |
| `V-17` | Shared NAV/WEATHER entitlement billed and costed once. |
| `V-18` | No MC-14 execution: `mc14Started: false`, registry row 14 `PLANNED`. |
| `V-19` | Review not self-approved: `review-findings.json` present, verdict consistent. |
| `V-20` | No profitability/break-even claim where a material input is unknown. |
| `V-21` | Bundle component editions match the governing bundle contract. |

### Arithmetic

| ID | Check |
|---|---|
| `A-01` | Exactly 60 periods per required scenario. |
| `A-02` | `M12`/`M36`/`M60` views recomputed from the monthly model. |
| `A-03` | Net revenue recomputed from gross, refunds and VAT basis. |
| `A-04` | VAT never recognised as net revenue. |
| `A-05` | Annual/monthly subscription amounts reconciled (12 × monthly = annual). |
| `A-06` | Cash collections and recognised revenue distinguished and reconciled. |
| `A-07` | Payment fees recomputed from published tariff. |
| `A-08` | Annual prepayment recognised straight-line; deferred balance reconciles. |
| `A-09` | COGS = units sold × declared unit cost. |
| `A-10` | Inventory unit identity holds; no negative inventory. |
| `A-11` | Inventory purchases cash, COGS and payables/prepayments reconcile. |
| `A-12` | Trade receivables identity holds. |
| `A-13` | VAT output/input and payment lag reconcile. |
| `A-14` | `openingCash + Σ netCashFlow = cumulativeCashBalance` (opening 0 convention declared). |
| `A-15` | `operatingCashFlow = ebitdaLike − workingCapitalMovement − paymentFees`. |
| `A-16` | `netCashFlow = operatingCashFlow + investingCashFlow`. |
| `A-17` | `financingRequirement` running maximum recomputed. |
| `A-18` | Contribution recomputed; fixed and variable costs never mixed. |
| `A-19` | D&A non-cash: excluded from operating cash flow and added back only in the accounting result. |
| `A-20` | Capex cash and amortization reconcile to the capital schedule; tooling counted once. |
| `A-21` | Break-even thresholds recomputed from model outputs; unknown inputs force `NOT_DETERMINABLE`. |
| `A-22` | Stress results recomputed from base scenario plus declared overrides. |
| `A-23` | Scenario results totals recomputed from monthly arrays. |
| `A-24` | Unit economics inherit MC-12 values exactly (no silent cost change). |
| `A-25` | Negative economics retained; no suppression of adverse results. |
| `A-26` | Stress overrides that are declared must change at least one result (including the funding envelope); a no-op override fails. |

### Recurring and working capital

| ID | Check |
|---|---|
| `R-01` | Every subscription SKU has billing periodicity, direct cost or explicit unknown. |
| `R-02` | Churn/renewal/activation assumptions labelled `SCENARIO_ASSUMPTION`. |
| `R-03` | Inactive/suspended account cost retained, not zeroed silently. |
| `R-04` | FLEET per-vessel SaaS modelled with cloud cost or explicit unknown. |
| `R-05` | Deferred revenue and cash timing reconciled. |
| `R-06` | Inventory carrying/obsolescence cost modelled or explicitly unknown. |

### Delivery and evidence

| ID | Check |
|---|---|
| `D-01` | Manifest status block equals delivery values; no unexecuted test claimed PASS. |
| `D-02` | Every required document exists and contains its mandated section headers. |
| `D-03` | `MC13-GENERATED-FIGURES.md` equals deterministic regeneration. |
| `D-04` | Every generated result block declares source and transformation lineage. |
| `D-05` | Every MC-12 handoff input is consumed or explicitly unknown. |
| `D-06` | Predecessor files unchanged (SHA-256 baseline for MC-11/MC-12 data and contracts). |
| `D-07` | Review findings tracked; no open BLOCKING/MAJOR at final record. |
| `D-08` | No merge/deploy/publication/MC-14 execution assertion. |
| `D-09` | Human-readable reports reference the generated figures or machine data. |
| `D-10` | The assumptions and evidence register equals deterministic regeneration. |

Adding a check is non-breaking; removing or weakening one is breaking and requires a
decision-log entry. The validator is read-only with respect to business data.

## 7. Generation and reproducibility

`node scripts/build-marea-financial-model.mjs` regenerates every derived file and
`MC13-GENERATED-FIGURES.md` from the curated inputs. Running it twice must produce
byte-identical output. The validator imports the engine and recomputes the derived
files in memory; it fails if a committed derived file differs. The engine contains no
network, clock or random dependency.

## 8. Change control

- A schema change requires a `contractVersion` bump and a delivery note.
- Findings raised by the independent reviewer are closed only after the reviewer
  re-runs the gate against the corrected commit.
- No MC-13 change may alter MC-11/MC-12 data, the application, production
  configuration, commerce, prices or public claims.
