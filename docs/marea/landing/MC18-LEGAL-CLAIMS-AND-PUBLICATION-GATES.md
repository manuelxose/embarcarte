# MC-18 — Legal claims and publication gates (D07)

| Field       | Value                                                                                                        |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| Deliverable | D07 `MC18-LEGAL-CLAIMS-AND-PUBLICATION-GATES.md`                                                             |
| Milestone   | MC-18/36 — internal MAREA corporate landing (EMBARCARTE)                                                     |
| Owner       | docs-a (documentation owner, documents group A)                                                              |
| Date        | 2026-11-03                                                                                                   |
| Status      | `INTERNAL_VERIFIED` for the fail-closed state described; **not a milestone verdict and not a legal opinion** |
| Publication | `NOT_AUTHORIZED`                                                                                             |

This document maps the MC-14 claims governance onto the landing, records the dangerous-copy
scanner behaviour and its limits, records the 13 release gates (0 closed) and 24 required
documents (0 executed), explains the typed fail-closed publication model, shows the current
evaluation, and lists the external approvals that remain absent. It also records the
`pageType` contract-label discrepancy as informational.

## 1. Claims governance

Source: `docs/marea/legal-commercial/data/claims-policy.json` (MC-14, binding internal policy)
and `docs/marea/legal-commercial/data/bilingual-claims.json` (42 ES/EN claim pairs).

| Fact                            | Value                                                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Claims catalogued               | **42**                                                                                                              |
| By class                        | A = 4, C = 3, P = 11, X = 24                                                                                        |
| Internal-only                   | 7                                                                                                                   |
| Public-prohibited               | 35                                                                                                                  |
| **Public-authorised**           | **0**                                                                                                               |
| Publication authorisation       | `NONE`                                                                                                              |
| Mandatory prohibited categories | **30**                                                                                                              |
| Status vocabulary               | `INTERNAL_ONLY`, `PUBLIC_PROHIBITED`, `PUBLIC_CONDITIONAL`, `PUBLIC_AUTHORIZED` (MC-14 uses no `PUBLIC_AUTHORIZED`) |

### 1.1 Class A reuse — internal draft only

Only **class A** claims with `publicationStatus = INTERNAL_ONLY` are reused, and only as
internal draft wording. Per `docs/marea/landing/MC18-BILINGUAL-COPY-AND-EVIDENCE-POLICY.md`
§5, four class A claims underpin landing sentences:

| Claim                                                                              | Class / status      | Landing use                                                                                |
| ---------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------ |
| `CLM-001` (NAV is a concept under definition; not available for purchase)          | A / `INTERNAL_ONLY` | `hero.supporting`, NAV commercial limitation                                               |
| `CLM-002` (NAV definition includes route planning, logbook, instrument display)    | A / `INTERNAL_ONLY` | `families.nav.summary`                                                                     |
| `CLM-003` (NAV defined in two editions)                                            | A / `INTERNAL_ONLY` | `families.nav.summary`, START and CRUISE composition                                       |
| `CLM-042` (navigation assistance; AIS receive-only; alerts may be delayed or lost) | A / `INTERNAL_ONLY` | `families.ais.material`, `families.watch.material`; regulatory/life-safety clauses omitted |

Important qualification: the current `ContentBlock` type has **no `claimIds` field**, so the
landing does not carry machine claim attribution per block. The reuse is documented in D05 and
reflected through `evidenceIds` (`EV-MC14-BILINGUAL-CLAIMS`). If `claimIds` is added to the
contract later, attribution can be added without changing text. This is a documentation-level
mapping, not a claim approval.

Every one of the 174 landing content blocks is fixed at
`publicationStatus = INTERNAL_DRAFT_NOT_APPROVED` and `approvalStatus = NOT_APPROVED`; the
validator rejects any change (`MC18-20`).

## 2. The 30 prohibited categories

From `claims-policy.json` → `mandatoryProhibitedClaimCategories` (30). All 30 are relevant to
what the landing may **not** say; the last column notes how the landing avoids or negates the
category.

| #   | Category                               | Landing handling                                                         |
| --- | -------------------------------------- | ------------------------------------------------------------------------ |
| 1   | `COMMERCIAL_AVAILABILITY`              | Every family/bundle states not for sale; no availability claim           |
| 2   | `STOCK`                                | No stock, inventory or "in stock" copy                                   |
| 3   | `DELIVERY_DATES`                       | No delivery date, lead time or "available soon"                          |
| 4   | `FINAL_PRICING`                        | No price, amount, currency or package price                              |
| 5   | `TRADEMARK_REGISTRATION`               | "Proposed brand, not adopted"; no ® or registered-trademark text         |
| 6   | `OWNERSHIP_OF_UNDERLYING_CODE`         | No ownership/licence assertion over third-party code                     |
| 7   | `OFFICIAL_OR_LICENSED_CHARTS`          | Charts explicitly not licensed/included                                  |
| 8   | `WEATHER_DATA_RIGHTS`                  | Weather data explicitly not licensed/included; probabilistic forecast    |
| 9   | `CE_RED_EMC_COMPLIANCE`                | No CE/RED/EMC conformity claim (`CE_MARKING_CLAIM = PROHIBITED`)         |
| 10  | `NMEA_CERTIFICATION`                   | No NMEA 2000 certification claim (`NMEA2000_CERTIFIED = false`)          |
| 11  | `MARINE_SAFETY_CERTIFICATION`          | No marine safety certification                                           |
| 12  | `UNIVERSAL_INTEROPERABILITY`           | Architecture is "conceptual dependencies, not verified interoperability" |
| 13  | `VALIDATED_INSTALLATION_COMPATIBILITY` | Compatibility `UNTESTED`; 0 tested rows                                  |
| 14  | `FULLY_AUTONOMOUS_STEERING`            | PILOT supervised-only; no autonomous steering                            |
| 15  | `COLLISION_PREVENTION`                 | AIS copy says it does not prevent collisions                             |
| 16  | `GUARANTEED_ALERT_DELIVERY`            | WATCH copy says alerts may be delayed or lost                            |
| 17  | `GUARANTEED_MONITORING_AVAILABILITY`   | No guaranteed continuous monitoring                                      |
| 18  | `GUARANTEED_FORECAST_ACCURACY`         | Forecasts described as probabilistic                                     |
| 19  | `INSURANCE_COVERAGE`                   | No insurance claim                                                       |
| 20  | `CUSTOMER_COUNTS`                      | No customer count                                                        |
| 21  | `TESTIMONIALS`                         | No testimonial                                                           |
| 22  | `MARKET_SHARE`                         | No market-share claim                                                    |
| 23  | `COMMERCIAL_PROFITABILITY`             | No profitability claim                                                   |
| 24  | `BREAK_EVEN`                           | No break-even claim                                                      |
| 25  | `INVESTMENT_RETURNS`                   | No return claim                                                          |
| 26  | `FINANCING_COMMITMENTS`                | No financing commitment                                                  |
| 27  | `CYBERSECURITY_CERTIFICATION`          | No cybersecurity certification claim                                     |
| 28  | `UNVERIFIED_SLA`                       | FLEET explicitly has no established SLA                                  |
| 29  | `GDPR_COMPLIANCE_ASSERTION`            | No GDPR-compliance assertion                                             |
| 30  | `SAFETY_OF_LIFE_OR_LIFE_SAVING`        | No life-safety claim; AIS/WATCH/PILOT limitations stated                 |

## 3. Dangerous-copy scanner behaviour

Implementation: `scripts/marea-landing-guards.mjs` (`DANGEROUS_COPY_PATTERNS`,
`hasNegation`, `sentences`, `negatedBefore`, `scanDangerousCopy`). The validator uses it in
`MC18-22` (certification/safety/authority) and `MC18-19` (licensed data); purchase controls
are scanned separately by `purchaseControlViolations` (`MC18-11`).

### 3.1 Rules

1. Text is split into sentence-like windows at `. ! ? ; :` followed by whitespace, or at
   newlines.
2. Each sentence is tested against 13 prohibited patterns:
   `PRICE_AMOUNT`, `STOCK_OR_ORDER`, `DELIVERY_DATE`, `CERTIFICATION`,
   `AUTONOMY_OR_GUARANTEE`, `TESTIMONIAL_OR_AUTHORITY`, `LICENSED_DATA_INCLUDED`,
   `TRANSMISSION`, `FAKE_TELEMETRY`, `INVENTED_DIMENSIONS`, `CONTACT_OR_LEAD_CAPTURE`,
   `REGISTERED_TRADEMARK`, `OFFICIAL_SECURITY_OR_PRIVACY_CLAIM`.
3. A match is allowed when the pattern is negation-exempt **and** either an explicit negation
   appears in the 80-character window immediately before the match, or the matched text
   itself contains a negation.
4. Negation vocabulary: ES `no, sin, nunca, ningún/ninguna/ningunos/ningunas, ni, cero, 0`;
   EN `no, not, without, never, none, nor, zero, 0, cannot, can't, n't`.
5. `REGISTERED_TRADEMARK` (`®`, "marca registrada", "registered trademark") is
   **not** negation-exempt: it is forbidden even inside a negation window.
6. Purchase controls (buttons, forms, inputs, click handlers, HTTP clients) are rejected
   regardless of copy.

This makes limitation statements such as "sin navegación autónoma" acceptable while rejecting
"gobierno totalmente autónomo sin supervisión", where the negation does not govern the risky
term.

### 3.2 What the scanner does NOT prove

- It is a **keyword heuristic**, not legal review; passing it is not a legal clearance,
  compliance opinion or publication approval.
- The 13 patterns are a subset of the 30 prohibited categories; categories 6, 19–30 are not
  all mechanically scanned and depend on human review.
- It does not understand grammar beyond the sentence/80-character heuristic; false negatives
  (paraphrase, implication, missing accent) and false positives are possible.
- It does not verify ES/EN semantic equivalence beyond numeric parity and structural checks
  (`bilingualParityProblems` compares structure and numeric tokens, not meaning).
- It cannot detect an omitted disclaimer, a misleading omission, or a claim made by imagery.
- The negation exemption is intentionally permissive for limitation copy; it must not be read
  as permission to state the prohibited claim in another form.

## 4. Release gates and required documents

Source: `docs/marea/legal-commercial/data/release-evidence-gates.json`, projected into
`docs/marea/landing/data/publication-gates.json`.

| Fact                    | Value  |
| ----------------------- | ------ |
| Release gates           | **13** |
| Gates closed            | **0**  |
| Gates blocked           | 12     |
| Gates evidence-required | 1      |
| Required documents      | **24** |
| Documents executed      | **0**  |

Open gate ids (all 13):

`GATE-MARKET-PLACEMENT`, `GATE-SAFETY-PILOT`, `GATE-IP-CLEARANCE`,
`GATE-DATA-LICENSING`, `GATE-PRIVACY-DPA-DPIA`, `GATE-CRA-CYBERSECURITY`,
`GATE-CONSUMER-TERMS`, `GATE-COMMERCIAL-CLAIMS`, `GATE-PRICING`, `GATE-PAYMENTS`,
`GATE-INSURANCE`, `GATE-LEGAL-ENTITY`, `GATE-WEBSITE-REMEDIATION`.

These are programme-level release gates; they are distinct from the **page-level publication
gate fields** in section 5. The page cannot publish while both layers are unsatisfied.

## 5. Typed gate model and fail-closed evaluation

Source: `src/app/marea-landing/models/publication-gates.ts`.

- `RELEASE_GATE_IDS` — the 13 MC-14 gate ids (type `ReleaseGateId`).
- `RELEASE_GATE_RECORD` — recorded 13 / 0 closed / 12 blocked / 1 evidence-required /
  24 documents / 0 executed.
- `PublicationGateInput` — optional booleans (`boolean | null`) for `pageImplemented`,
  `internalPreviewReady` and ten approval fields: `publicCopyApproved`, `trademarkCleared`,
  `sourceIpCleared`, `legalIdentityVerified`, `claimsApproved`, `privacyApproved`,
  `commercialDataApproved`, `publicationApproved`, `indexationApproved`,
  `deploymentApproved`.
- `satisfied(value)` returns `true` **only** for the boolean `true`; missing, `null` or
  non-boolean values are unsatisfied.
- `evaluatePublicationGates()` derives `blockingGateIds` from the same evaluation and sets
  `publishable = pageImplemented && internalPreviewReady && every approval gate === true`.
  There is no override parameter and no partial publication state.
- `MC18_GATE_INPUTS` records `pageImplemented: true`, `internalPreviewReady: true`, all ten
  approval gates `false`.

### 5.1 Why a single boolean or environment variable cannot publish

There is no code path that reads an environment variable, query parameter, cookie,
`localStorage`/`sessionStorage` or UI toggle to satisfy a page gate. A value must be exactly
`true` for every field, and the three approval ids are **records**, not booleans: the SEO
activation additionally requires a `ReleaseAuthorization` record, and
`LANDING_RELEASE_AUTHORIZATION` is typed `null` and is never computed.

Two independent locks therefore apply to metadata/indexation:

1. all page publication gates satisfied (`evaluatePublicationGates`);
2. a release authorization record exists (`evaluateSeoActivation`).

Because the authorization record does not exist, `canonicalEmissionAllowed`,
`hreflangEmissionAllowed`, `openGraphEmissionAllowed` and `indexationAllowed` are `false`, and
`buildLandingSeoContract()` marks `emitted.canonical/hreflang/openGraph/twitterCard/jsonLd`
`false` while `robotsNoindex: true`. Validator `MC18-43` and the adversarial unit suite assert
this, including a case where every gate boolean is forced `true` but the authorization record
is still `null`.

## 6. Current evaluation (observed)

From `docs/marea/landing/data/publication-gates.json` and the model:

| Field                    | Value                                                                                                                                                                                                                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pageImplemented`        | `true`                                                                                                                                                                                                                                                                                                     |
| `internalPreviewReady`   | `true`                                                                                                                                                                                                                                                                                                     |
| `publicCopyApproved`     | `false`                                                                                                                                                                                                                                                                                                    |
| `trademarkCleared`       | `false`                                                                                                                                                                                                                                                                                                    |
| `sourceIpCleared`        | `false`                                                                                                                                                                                                                                                                                                    |
| `legalIdentityVerified`  | `false`                                                                                                                                                                                                                                                                                                    |
| `claimsApproved`         | `false`                                                                                                                                                                                                                                                                                                    |
| `privacyApproved`        | `false`                                                                                                                                                                                                                                                                                                    |
| `commercialDataApproved` | `false`                                                                                                                                                                                                                                                                                                    |
| `publicationApproved`    | `false`                                                                                                                                                                                                                                                                                                    |
| `indexationApproved`     | `false`                                                                                                                                                                                                                                                                                                    |
| `deploymentApproved`     | `false`                                                                                                                                                                                                                                                                                                    |
| `blockingGateIds`        | 10 open page gates: `GATE-PUBLIC-COPY-APPROVED`, `GATE-TRADEMARK-CLEARED`, `GATE-SOURCE-IP-CLEARED`, `GATE-LEGAL-IDENTITY-VERIFIED`, `GATE-CLAIMS-APPROVED`, `GATE-PRIVACY-APPROVED`, `GATE-COMMERCIAL-DATA-APPROVED`, `GATE-PUBLICATION-APPROVED`, `GATE-INDEXATION-APPROVED`, `GATE-DEPLOYMENT-APPROVED` |
| `publishable`            | **`false`**                                                                                                                                                                                                                                                                                                |

Validator `MC18-42` asserts the empty input is `false`, each individual gate alone is
insufficient, and the recorded evaluation stays blocked.

## 7. External approvals that remain absent

No external approval exists for any of the following; each is a blocker, not a pending formality:

- trademark legal clearance (`NOT_GRANTED`) and MAREA public use (`NO_GO`);
- final identity adoption (`BLOCKED`);
- source IP clearance (`NOT_CLEARED`);
- public copy approval, claims approval, legal-identity verification;
- privacy/DPA/DPIA, CRA/cybersecurity, consumer terms, insurance, legal-entity gates;
- commercial data (price, stock, delivery) and payments;
- publication authorisation, indexation authorisation and production deployment;
- licensing rights for chart/weather data (`LICENSING_RIGHTS_GRANTED = false`);
- PILOT safety gate (`BLOCKED`), CE marking (`PROHIBITED`), NMEA 2000 (`false`),
  tested compatibility rows (`0`), customer evidence (`NONE`), customer WTP validated
  (`false`).

MC-18 implements an internal preview under those absences; it closes none of them.

## 8. `pageType` contract-label discrepancy — INFORMATIONAL

| Source                                                                                                                  | Label                          |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `docs/marea/information-architecture/data/proposed-routes.json` (`mareaOverview.pageType`)                              | `HUB_OVERVIEW` (**authority**) |
| MC-18 master-prompt narrative, MC-17 handoff and narrative copies, `content-evidence.json` `EV-MC15-ROUTES.establishes` | `PAGE_MAREA_OVERVIEW`          |
| MC-18 implementation (`models/page-identity.ts`, `models/seo.ts`)                                                       | `HUB_OVERVIEW`                 |

This is an **INFORMATIONAL contract-label mismatch**, not a route/identity or authorisation
change. The route id (`mareaOverview`), entity id (`ENT-HUB-MAREA`) and both preview paths are
identical across sources. The dataset is the authority; the differing narrative label is
recorded (also in D01 §7) and no predecessor file is edited.

## 9. Known limitations / non-claims

- This document is **not legal advice**, not a compliance certificate and not a publication
  approval. The claims policy itself states that a keyword scanner cannot prove legal
  compliance.
- The 30 prohibited categories are policy prohibitions; the scanner mechanically covers a
  subset (13 patterns). Human review remains necessary for the rest.
- No claims are public-authorised; class A reuse is internal draft only and the current
  contract lacks per-block `claimIds`.
- The gate evaluation is a **blocked** state. `publishable: false` is not a prediction of a
  future approval, and no external authority has been engaged.
- The 13 release gates / 24 documents are MC-14 programme records; they are not re-executed by
  MC-18 and their counts are cited, not re-measured.
- The `pageType` mismatch is informational only and does not assert that other narrative
  copies are otherwise correct.
- Nothing here authorises publication, indexation, deployment, sale or brand use.
