# MC-09 machine-readable research contract

Status: `INTERNAL_RESEARCH_DATA_ONLY`. Milestone MC-09, base commit
`65417bfa681d31cc655e2bc91cfcedcccc368675` (MC-08 HEAD).

This directory is the structured evidence layer behind the MC-09 research
documents. It does not duplicate the canonical product and bundle contracts
(`docs/marea/products/product-definitions.batch-0*.json`,
`docs/marea/bundles/bundle-definitions.json`); it references their canonical
IDs.

## Rules

1. Every record carries a stable ID with a workstream prefix so IDs never
   collide across writers:
   - `SRC-MKT-###`, `CLM-MKT-###`, `SRC-CMP-###`, `CLM-CMP-###`,
     `SRC-BUY-###`, `CLM-BUY-###`, `SRC-ECO-###`, `CLM-ECO-###`,
     `SRC-CHN-###`, `CLM-CHN-###`, `SRC-MC10-###`, `CLM-MC10-###`.
2. `retrievedAt` is the real date the page was actually accessed. Do not invent
   access dates or "last verified" values.
3. A claim without at least one resolvable source is a defect. Unavailable
   facts must be recorded as `UNKNOWN` with the missing evidence named.
4. Observed prices keep the original currency and tax treatment. Conversions or
   normalisations are separate `MODEL_DERIVED` records, never edits to the
   observed value.
5. Hypotheses are `HYPOTHESIS`; they are never presented as measurements.
6. No copied pages: store short extracts and references only.
7. `docs/marea/market-validation/data/governance-status.json` is the
   Lead-owned status invariant. Research files never restate these statuses in
   a stronger form.

## File shapes

### `evidence-<scope>.json` (one per workstream)

```json
{
  "contractId": "MAREA-MC09-RESEARCH-CONTRACT",
  "contractVersion": "1.0.0",
  "milestone": "MC-09",
  "workstream": "market",
  "owner": "agent-a-market-analyst",
  "scopeNote": "One sentence on what this workstream covers.",
  "sources": [
    {
      "sourceId": "SRC-MKT-001",
      "title": "Exact page or publication title",
      "publisher": "Issuing organisation",
      "sourceType": "PRIMARY_OFFICIAL",
      "url": "https://example.eu/page",
      "publishedAt": "2025-01-31",
      "retrievedAt": "2026-10-31",
      "geographicScope": "ES",
      "language": "es",
      "evidenceClass": "PRIMARY_OFFICIAL",
      "confidence": "HIGH",
      "limitations": "What this source cannot establish.",
      "status": "OK"
    }
  ],
  "claims": [
    {
      "claimId": "CLM-MKT-001",
      "claimText": "Short, bounded factual statement.",
      "sourceIds": ["SRC-MKT-001"],
      "evidenceClass": "PRIMARY_OFFICIAL",
      "confidence": "HIGH",
      "productScope": ["MARKET"],
      "geographicScope": "ES",
      "observedValue": "5,027",
      "unit": "vessels registered (2024)",
      "limitations": "Registration counts, not active fleet."
    }
  ]
}
```

`sourceType` and `evidenceClass` vocabulary: `PRIMARY_OFFICIAL`,
`PRIMARY_RETAILER`, `SECONDARY_INDEPENDENT`, `PUBLIC_CUSTOMER_SIGNAL`,
`MODEL_DERIVED`, `HYPOTHESIS`, `UNKNOWN`.
`confidence`: `HIGH`, `MEDIUM`, `LOW`, `UNKNOWN`.
`status`: `OK`, `STALE`, `INACCESSIBLE`, `CONTRADICTED`.

### `market-inputs.json`

`inputs[]`: `inputId`, `metric`, `value`, `unit`, `geography`, `year`,
`sourceId`, `derivation` (`OBSERVED` | `ASSUMED` | `DERIVED`), `confidence`,
`notes`.

`regions[]` (in `geo-assessments.json`): `regionId`, `name`,
`dimensions` (object: criterion -> `{score, rationale, evidenceClaimIds}`),
`weightedScore`, `rank`, `recommendation`, `evidenceGaps[]`.

### `competitor-observations.json` / `price-observations.json`

`observations[]`: `obsId`, `vendor`, `product`, `category`, `mareaFamilies[]`,
`mareaBundles[]`, `customerSegment`, `market`, `manufacturerUrl`,
`retailerUrl`, `sourceType`, `capturedAt`, `observedPrice`, `currency`,
`vatTreatment`, `hardwareIncluded`, `softwareIncluded`, `installationIncluded`,
`subscription`, `dataLicense`, `connectivity`, `advertisedCapabilities[]`,
`relevantLimitations[]`, `availability`, `comparisonConfidence`,
`missingEvidence`, `researcher`, `lastVerifiedAt`.

`prices[]`: `priceId`, `obsId` (or `null` when the price is from a price list),
`vendor`, `product`, `amount`, `currency`, `vatTreatment`, `priceType`,
`territory`, `capturedAt`, `sourceUrl`, `notes`.

### `buyer-segments.json` / `public-signals.json`

`segments[]`: `segmentId`, `name`, `archetypeStatus`
(`HYPOTHETICAL_ARCHETYPE` | `EVIDENCE_BASED`), `problem`, `existingSolutions`,
`urgency`, `economicConsequence`, `purchaseTrigger`, `decisionMaker`,
`influencers[]`, `budgetOwner`, `procurementPath`, `technicalConstraints[]`,
`installationRequirements`, `trustBarriers[]`, `regulatoryConsiderations[]`,
`subscriptionObjections[]`, `potentialChannel`, `evidenceClaimIds[]`,
`criticalUnknowns[]`, `mc10Questions[]`.

`signals[]`: `signalId`, `topic`, `evidenceType` (`ANECDOTE` |
`REPEATED_OBSERVATION` | `SURVEY` | `SUPPORT_DOC` | `PURCHASE_DEMAND`),
`sourceIds[]`, `summary`, `independence`, `limitations`.

### `tco-models.json` / `wtp-hypotheses.json`

`models[]`: `modelId`, `subject` (canonical family/bundle ID),
`components[]`: `{item, amount, currency, taxTreatment, basis
(OBSERVED|ASSUMED|UNKNOWN), sourceId}`; `year1Total`, `recurringAnnual`,
`completeness` (`COMPLETE` | `INCOMPLETE` | `SCENARIO_DERIVED`),
`unknowns[]`, `notes`.

`hypotheses[]`: `wtpId`, `subject`, `method`, `status` (`NOT_MEASURED`),
`instrumentRef`, `limitations`.

### `channel-assessments.json` / `search-signals.json`

`channels[]`: `channelId`, `name`, `mareaFamilies[]`, `mareaBundles[]`,
`buyerSegment`, `salesProcess`, `commercialDependency`,
`implementationComplexity`, `evidenceClaimIds[]`, `unprovenAssumptions[]`,
`economicStructure`, `supportRequirements[]`, `barriers[]`,
`validationExperiment`.

`terms[]`: `termId`, `term`, `language`, `geography`, `metricType`
(`SEARCH_INTEREST` | `ESTIMATED_VOLUME` | `CONTENT_OPPORTUNITY`),
`sourceId`, `observedValue`, `limitation`.

### `validation-experiments.json`

`experiments[]`: `experimentId`, `hypothesis`, `segment`, `recruitment`,
`minimumEvidence`, `dataCapture`, `decisionThreshold`, `confounders[]`,
`limitations`, `ethics`, `interpretation`.

### Lead-owned files

`governance-status.json`, `manifest.json`, `product-assessments.json`,
`bundle-assessments.json`, `decision-links.json`.

## Validation

`npm run test:market` runs `scripts/check-marea-market.mjs`.
`npm run test:market:unit` runs the negative-mutation suite.
