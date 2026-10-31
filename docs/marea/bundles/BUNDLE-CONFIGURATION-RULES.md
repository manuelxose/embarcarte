# MAREA — Bundle configuration rules (MC-08 / D9)

| Field | Value |
| --- | --- |
| Document ID | MC-08 / D9-BUNDLE-CONFIGURATION-RULES |
| Milestone | MC-08 (08/36) — bundles and commercial architecture |
| Date | 2026-10-30 |
| Owner function | Commerce Contracts and Configuration Engineer |
| Status | INTERNAL / NOT PUBLISHED / NOT FOR SALE / BUNDLE CONFIGURATION DEFINITION ONLY |
| Base commit | `80c66c70a1bab6f11c5ba5709baa4c1671f1d6da` (MC-07 HEAD) |
| Branch | `feature/marea-mc08-bundles-commercial-architecture` |
| Machine authority | `docs/marea/bundles/bundle-definitions.json` (D17, document type `BUNDLE_DEFINITION_CONTRACT`) |
| Human authorities | `docs/marea/bundles/BUNDLE-ARCHITECTURE.md` §3, §6, §8; `docs/marea/bundles/BUNDLE-COMPOSITION-AND-EXCLUSIONS.md`; the six `MAREA-*-COMMERCIAL-SPEC.md` specifications (D2–D7) |
| Product authority | `docs/marea/products/README.md` §1–§32; the three `product-definitions.batch-0*.json` contracts; `PRODUCT-EDITIONS-*.md`; `PRODUCT-COMPATIBILITY-*.md` |
| Is not | Not a catalogue, configurator, quotation, price list, compatibility certification, safety case, sales approval or public offer |

**The one thing that must never be misread.** These rules describe how six **internal** bundle
definitions are resolved, what makes a configuration ineligible, and what evidence would change a
decision. They do not make any bundle available, orderable, quotable or publishable. Every bundle is
`DEFINED`, `INTERNAL_ONLY`, `NOT_FOR_SALE`, and every product, price, compatibility statement, safety
state, right and clearance is unchanged by this document. The six configuration outcomes of §8 are
**internal results**, never sale approvals. There is no `ORDERABLE` outcome in MC-08 and no document in
this milestone creates a purchasable article.

## 1. Scope and what this document decides

1. The component record model shared by the machine contract and the six specs (§2).
2. The seven inclusion values and what each one means commercially (§3).
3. Kit expansion and the no-double-count rule (§4).
4. Edition resolution against the nine product contracts (§5).
5. Dependency resolution: subscriptions, data entitlements, surveys and quotation boundaries (§6).
6. Compatibility evaluation and the evidence promotion rules (§7).
7. The six internal configuration outcomes and the deterministic decision order (§8).
8. The three eligibility questionnaires and the deterministic rules that consume them (§9).
9. The 20 mandatory conflict rules (§10) and the 12 configuration rules (§11).
10. Worked internal configurations, one per bundle family, all `CONFIGURATION_DEFINED_INTERNAL` (§12).
11. Cross-sell rules (§13) and failure examples (§14).
12. The honest limit (§15).

The machine-readable contract `bundle-definitions.json` is the single machine authority. Every rule in
this document references an id that exists in that contract (`CFG-*` configuration rules, `CF-*` conflict
rules, `CS-*` cross-sell rules, `DR-*` dependency rules, `PH-*` price hypotheses, `ENT-*` entitlements).
Where this document and the contract differ, the contract is the tested artefact and the difference is a
defect to fix, not a second truth.

### 1.1 Identifier namespaces and the D8/D17 line-id mapping

Identifier prefixes are bundle-scoped and collision-free. `ST-`, `CR-`, `SL-`, `PR-`, `CP-` and `FP-` are
**component line ids** only (START, CRUISE, SAIL, PROTECT, COMPLETE and FLEET package respectively).
Configuration rules use the distinct `CFG-NN` prefix (renamed from `CR-NN` precisely so it can never be
confused with a CRUISE line id), conflict rules use `CF-`, cross-sell rules `CS-`, dependency rules `DR-`
and price hypotheses `PH-`.

The machine contract models the **includable and assessed lines** of the reference configuration plus the
explicit `INELIGIBLE` guard lines (PILOT-PRO, DISPLAY-LARGE-CONDITIONAL, loose kit modules). It does not
reproduce the human composition register D8 line by line: D8 keeps its own `NOT_INCLUDED` exclusion rows
(e.g. `ST-08` NAV-ESSENTIAL variant, `SL-07` SENSE-SAIL kit, `CP-12` SENSE-SYSTEMS kit) and models the
SAIL installed scope as one row `SL-08`, whereas the contract records that scope as three auditable lines
`SL-08` survey, `SL-09` drive/feedback/E-stop/mechanical/cabling and `SL-10` labour/commissioning/sea
trials/training/conformity. The mapping is: D8 `NOT_INCLUDED` rows → contract `exclusions[]`; D8 `SL-08`
installed scope → contract `SL-08`+`SL-09`+`SL-10`. No product, edition or inclusion decision differs
between the two registers.

### 1.2 Validation surfaces and the approved-disclaimer interpretation

`COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9 defines five approved texts. The D18 validator enforces them by
**surface**, not mechanically on all twelve files, because a disclaimer is required where its subject is
presented to the customer:

| Approved §9 text | Enforced by D18 on | Reason |
| --- | --- | --- |
| Navigation / instruments | all 12 copy files | every bundle surface presents position, charts, depth, traffic or weather context |
| AIS receive-only | CRUISE, COMPLETE and FLEET package copy | these are the bundle surfaces that include an AIS receiver or present received-traffic context |
| PILOT supervised steering | SAIL and COMPLETE copy | these are the bundles that include a quoted PILOT scope |
| Weather forecast | START and CRUISE copy | these are the two copy surfaces that present the WEATHER forecast service as a licensed option; SAIL/COMPLETE/FLEET mention WEATHER only as a separate excluded/optional product and do not present forecast data |
| Brand attribution | not duplicated in D18 | the brand gate (`scripts/check-brand.mjs` / `npm run test:brand`) owns brand identity, attribution and clearance enforcement; all 12 copy files nevertheless carry the approved attribution footer |

Adding a forecast surface to a copy file therefore requires the weather disclaimer: the check is not tied
to which products happen to be optional today.

## 2. Component record model

Every line of every bundle is a **component record**. The same 15 fields appear in
`bundle-definitions.json` (`bundles[].components[]` and `bundles[].optionalComponents[]`) and in the six
specifications (field B06/B07 and the composition table).

| # | Field | Type | Rule |
| --- | --- | --- | --- |
| 1 | `lineId` | string | Bundle-scoped and unique: `ST-`, `CR-`, `SL-`, `PR-`, `CP-`, `FP-` prefixes. Never reuses a compatibility row id. |
| 2 | `familyId` | string \| null | Must resolve to one of the nine product family ids (`NAV`,`HUB`,`AIS`,`PILOT`,`SENSE`,`WATCH`,`DISPLAY`,`WEATHER`,`FLEET`) or be `null` for a named external/service line. |
| 3 | `editionId` | string \| null | Must exist in the declared family's edition list. Kits are editions (`SENSE-*` kits) with `expandsTo` set. `null` only for external/service lines or an edition-less role. |
| 4 | `expandsTo` | string[] \| null | Set only for a kit line; the exact declared module editions. Never set on a module or product line. |
| 5 | `quantity` | number | `1` per reference configuration unit; FLEET lines may be `per vessel`/`per device`, stated in `role`. |
| 6 | `role` | string | Substantive commercial role of the line. Not a product-name repetition. |
| 7 | `inclusion` | enum | Exactly one of §3. |
| 8 | `requiredForOutcome` | boolean | `true` only when the promised customer outcome cannot exist without the line. |
| 9 | `dependencies` | string[] | Named prerequisites (data path, entitlement, survey, device, connector). |
| 10 | `subscriptionEntitlement` | string \| null | Exact entitlement id that must exist in `entitlementsMatrix`; `null` when no recurring entitlement is involved. |
| 11 | `compatibility` | object | `{integrationId, status, evidence, deviceTestRecorded, releaseGate}`. `integrationId` is a row id from the compatibility documents (`A-`, `B-`, `C-`, `I-`, `N-`); `status` is that row's status; `deviceTestRecorded` is `false` today everywhere. |
| 12 | `evidenceClass` | enum | One of the six evidence classes. `OPEN` and `BLOCKED` are legitimate; `TBD` is prohibited. |
| 13 | `priceStatus` | enum | One of `HYPOTHESIS_UNAPPROVED`, `NOT_ESTABLISHED`, `OPEN`, `BLOCKED`, `NOT_APPLICABLE`. Never an approved price. |
| 14 | `priceHypothesisRef` | string \| null | Edition id whose published price hypothesis is being referenced, or `null` when no figure exists. |
| 15 | `costStatus` | enum | `NOT_ESTABLISHED`/`OPEN`/`NOT_APPLICABLE`; no computed cost or margin is stored. |
| 16 | `installationClassification` | enum | `NOT_APPLICABLE`, `SELF_INSTALL_NOT_VERIFIED`, `INSTALLER_ASSISTED`, `PROFESSIONAL_REQUIRED`, `QUOTATION_REQUIRED`, `SPECIALIST_SURVEY_REQUIRED`. |
| 17 | `releaseBlockers` | string[] | Blocker ids (`H-*`, `D-*`, `P-*`, `X-*`, `DEC-*`, `CF-*`) that keep the line from release. |

`compatibility.integrationId` may be `null` only for `REQUIRED_EXTERNAL`, `QUOTATION_REQUIRED` and
`INELIGIBLE` lines with no canonical integration row. A product line that is `INCLUDED`, `OPTIONAL` or
`CONDITIONAL` must cite a real row.

## 3. Inclusion vocabulary (exact strings, component level)

| Value | Meaning | Never means |
| --- | --- | --- |
| `INCLUDED` | Part of the bundle's reference configuration and inside its commercial scope. | A tested compatibility, a built system or an approved price. |
| `REQUIRED_EXTERNAL` | Necessary for the promised outcome but not supplied as a MAREA component (customer device, licensed chart region, SIM/data plan, antenna, cabling, mounting, professional labour, survey). | Included in the bundle price or owned by MAREA. |
| `OPTIONAL` | Offered as an addition, not needed for the base outcome, separately priced. | Free, implied or required. |
| `CONDITIONAL` | Selectable only after a named external condition closes (e.g. `AIS-CONNECTED`, `WATCH-PLUS`, `SENSE-SAIL`, `SENSE-SYSTEMS`); never selected by default. | Available today. |
| `NOT_INCLUDED` | Explicitly out of scope for this bundle; the customer may buy it separately as its own product. | Technically incompatible. |
| `INELIGIBLE` | Cannot be selected in this bundle at all (`PILOT-PRO` as a priced retail line, `DISPLAY-LARGE-CONDITIONAL` as an available size). | A warning that could be waived. |
| `QUOTATION_REQUIRED` | Required component whose scope and price can only be established by a vessel-specific survey and itemised quotation (PILOT installations, survey/installation scope). | Priced at zero or included. |

The validator rejects any other value, and rejects `INCLUDED` lines whose edition set or kit expansion
cannot be resolved.

## 4. Kit expansion and the no-double-count rule

A SENSE kit is **packaging, not a capability**. The canonical expansion is:

| Kit | Expands exactly to | Verdict |
| --- | --- | --- |
| `SENSE-ESSENTIALS` | `SENSE-POWER` + `SENSE-BILGE` | `DEFINED` |
| `SENSE-SAIL` | `SENSE-WIND` + `SENSE-ENV` | `CONDITIONAL` |
| `SENSE-SYSTEMS` | `SENSE-POWER` + `SENSE-BILGE` + `SENSE-TANKS` + `SENSE-ENV` | `CONDITIONAL` |

Authority: `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §3.3, `product-definitions.batch-02.json`
(`products[SENSE].kits`), and `bundle-definitions.json.senseKitExpansion`. The kit carries no
measurement claim, accuracy, connectivity or remote-alert capability that its modules do not have.

**No-double-count rule.** If a kit is selected, the modules inside it are already counted once. A loose
module line for a module contained in a selected kit is a duplicate and must be rejected (`CF-03`,
`CFG-03`). The only permitted representation is an explicit `INELIGIBLE` marker line recording why the
loose module cannot be added (PROTECT line `PR-03`).

Worked PROTECT example: `WATCH-CORE` + `SENSE-ESSENTIALS` resolves to one WATCH unit and exactly two
sensor modules (power, bilge). Adding `SENSE-POWER` again — even labelled `OPTIONAL` — makes the
configuration `NOT_ELIGIBLE`; adding a fifth module silently changes the outcome and requires a new
configuration and cost sheet.

## 5. Edition resolution

1. The **only** edition registry is the union of `products[].editions[]` in
   `product-definitions.batch-01.json`, `-batch-02.json` and `-batch-03.json`. No parallel
   product-name or edition list may exist in a validator, spec, copy file or price sheet.
2. `familyId` + `editionId` must resolve together: an edition cannot be moved between families.
3. The six reference configurations are fixed (D-019). A deliverable may not silently substitute another
   edition:

   | Bundle | Fixed reference editions | Optional / conditional |
   | --- | --- | --- |
   | START | `HUB-STANDARD` + `NAV-PRO` | `HUB-PRO` (upgrade), `WEATHER-STANDARD`; `NAV-ESSENTIAL` is a documented variant, not the reference |
   | CRUISE | `NAV-ESSENTIAL` + `HUB-STANDARD` + `AIS-RECEIVER` + `DISPLAY-7` | `NAV-PRO`, `WEATHER-STANDARD`; `AIS-CONNECTED` conditional/not selected; `DISPLAY-LARGE-CONDITIONAL` ineligible |
   | SAIL | `NAV-PRO` + `HUB-STANDARD` + `PILOT-COASTAL` (quotation) + `SENSE-WIND` | `PILOT-SAIL` conditional; `SENSE-SAIL` not included; `PILOT-PRO` ineligible as a priced SKU |
   | PROTECT | `WATCH-CORE` + `SENSE-ESSENTIALS` (expands to `SENSE-POWER` + `SENSE-BILGE`) | `HUB-STANDARD` optional; `WATCH-PLUS` conditional/not selected |
   | COMPLETE | `NAV-PRO` + `HUB-PRO` + `DISPLAY-7` + `WATCH-CORE` + `SENSE-POWER` + `SENSE-BILGE` + `SENSE-TANKS` + `SENSE-ENV` + `PILOT-COASTAL` (quotation) | `AIS-RECEIVER`, `WEATHER-PRO`; `SENSE-SYSTEMS` conditional/not reference; `PILOT-PRO` and `DISPLAY-LARGE-CONDITIONAL` ineligible |
   | FLEET package | `FLEET-START` or `FLEET-BUSINESS` subscription + onboarding + registration/migration + training + support | `FLEET-ENTERPRISE` conditional contracted tier; `WATCH-CORE`, `HUB-STANDARD`, SENSE, connectivity, installation optional/quoted |

4. A `CONDITIONAL` edition must state its condition and is never selected by default or priced as a
   standard line (`CFG-11`).
5. `PILOT-PRO` is `INSTALLATION_PACKAGE`, never a retail SKU; `DISPLAY-LARGE-CONDITIONAL` is never
   selectable as an available size. Both are represented explicitly as `INELIGIBLE` lines so the
   validator can reject an inclusion attempt; neither appears in any orderable-looking scope.
6. An edition marked `DEFINED` does **not** mean sellable: every product is `NOT_FOR_SALE` and every
   bundle remains internal.

## 6. Dependency resolution

Dependencies are deterministic; the rule id and the outcome are recorded on the bundle as `DR-*` lines.

| Dependency | Trigger | Outcome | What would change it |
| --- | --- | --- | --- |
| Mandatory product missing | A fixed reference component is absent | `NOT_ELIGIBLE` (`CF-01`, `CFG-01`) | Nothing in MC-08; the composition is fixed (D-019) |
| Duplicate product / kit module | Same family+edition twice, or kit + loose module | `NOT_ELIGIBLE` (`CF-02`, `CF-03`, `CFG-03`) | Nothing; the duplicate is always wrong |
| WATCH without monitoring entitlement | A WATCH component without a declared monitoring subscription | `NOT_ELIGIBLE` (`CF-10`, `CFG-04`) | A defined entitlement and subscription service; none exists today |
| Remote monitoring without subscription | Cloud monitoring without an active WATCH subscription | `NOT_ELIGIBLE` (`CF-11`) | Never permitted; network/service evidence would not remove this rule |
| Missing chart/licensed-data entitlement | A navigation outcome without a `REQUIRED_EXTERNAL` chart line | `COMPATIBILITY_EVIDENCE_REQUIRED` (`CF-12`) | A signed per-region distribution right and an entitlement record |
| Missing survey before quotation | A PILOT/FLEET line without a documented survey | `SPECIALIST_SURVEY_REQUIRED` then `QUOTATION_REQUIRED` (`CFG-06`, `CFG-12`) | A completed survey and an itemised quotation |
| Quotation component in a fixed-price configuration | PILOT or FLEET scope inside a fixed turnkey price | `QUOTATION_REQUIRED` (`CF-09`, `CFG-12`) | D-009/D-022 remain binding; no evidence removes this |
| FLEET package without contract | No written contract, roles, data-protection terms | `QUOTATION_REQUIRED` (`CFG-07`) | A written contract scope and data-protection assessment |
| Local safety function gated by an entitlement | Any subscription gating steering, sensing or alarms | `NOT_ELIGIBLE` (`CF-18`, subscription isolation) | Never permitted; safety is not an edition feature |

The ordering is important: an unresolved safety prerequisite (`CFG-09`) is checked before a quotation
decision, because a vessel that cannot be safely equipped must not receive a quotation as if it could.

## 7. Compatibility evaluation and evidence promotion

1. A compatibility statement is only a **citation of a canonical row** from
   `PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` (batch 01 vocabulary `UNKNOWN — NOT_TESTED`, `BLOCKED`,
   `PROHIBITED`, `TESTED`), `PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` (31 rows `I-01`–`I-31`) or
   `PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` (21 rows `N-01`–`N-21`).
2. Batch-02/03 statuses are exactly `SUPPORTED`, `PLANNED`, `CONDITIONAL`, `UNKNOWN`, `BLOCKED`;
   batch-01 rows are normalised by the contract to `UNKNOWN_NOT_TESTED`, `BLOCKED`, `PROHIBITED`,
   `TESTED`. The contract's component `status` must equal the canonical row's status.
3. **Promotion rule.** A row may be `SUPPORTED`/`TESTED` only when `deviceTestRecorded` is `true` for
   the exact device, firmware/software version, direction, adapter and reviewer. A unit-tested parser,
   a code audit, a dossier promise, a supplier datasheet or a marketing statement never promotes a row.
4. **Current state.** `deviceTestRecorded` is `false` on every component of every bundle; therefore
   every bundle must reject a `SUPPORTED`/`TESTED` status, and the canonical registers record
   `0 SUPPORTED` / `0 TESTED`. A bundle that cites `SUPPORTED` today is a validator failure
   (`CF-15`, `BUNDLE-31`).
5. `UNKNOWN` is never read as `SUPPORTED`; it is an honest "not assessed" that routes to human
   assessment (`COMPATIBILITY_EVIDENCE_REQUIRED`).
6. The safety states that feed compatibility are equally fixed and must never be upgraded by a bundle:
   `PILOT_SAFETY_GATE = BLOCKED`; `PILOT_ESTOP`, `PILOT_MOTOR_ISOLATION`, `PILOT_RUDDER_FEEDBACK =
   NOT_FOUND`; `PILOT_SEA_TRIALS = NOT_PERFORMED`; `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`;
   `SENSE_NMEA2000 = NOT_IMPLEMENTED`; `WATCH_INGESTION = NOT_VERIFIED`; `WATCH_PIPELINE`,
   `WATCH_DEVICE_IDENTITY`, `WATCH_SUBSCRIPTION_SERVICE`, `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND`;
   `DISPLAY SIZE_NOT_FROZEN`; `WEATHER providerRightsGranted = false`; `FLEET NOT_IMPLEMENTED`,
   `NO_SLA_ESTABLISHED`.

## 8. Configuration outcomes (internal only)

The six permitted outcomes are exactly:

| Outcome | Meaning | Never |
| --- | --- | --- |
| `CONFIGURATION_DEFINED_INTERNAL` | The composition resolves against the fixed reference configuration and the product contracts; it is internally coherent and still not sellable. | Orderable, approved, publishable. |
| `COMPATIBILITY_EVIDENCE_REQUIRED` | At least one required integration row is unverified; a device test or documented assessment is missing. | A successful compatibility result. |
| `SPECIALIST_SURVEY_REQUIRED` | A vessel/organisation assessment must be completed before the scope can be determined. | A booked installation. |
| `QUOTATION_REQUIRED` | A required component or service can only exist inside a vessel-specific quotation. | A fixed price, checkout value or order. |
| `NOT_ELIGIBLE` | The configuration violates a structural or safety rule and cannot be offered in that form. | A sales rejection of the customer. |
| `PUBLICATION_BLOCKED` | The configuration may exist internally but no publication, compatibility statement, price or sale is allowed while named gates are open. | A publication approval. |

Decision order (deterministic):

1. Structural integrity (`CFG-01`–`CFG-03`): missing, duplicate, kit mismatch, contradictory editions →
   `NOT_ELIGIBLE`.
2. Safety prerequisites (`CFG-06`, `CFG-09`): failed E-stop/isolation/feedback/survey prerequisite →
   `NOT_ELIGIBLE`; survey not yet performed → `SPECIALIST_SURVEY_REQUIRED`.
3. Compatibility (`CFG-08`, `CFG-10`): no tested/supported row for a promised outcome → first
   `COMPATIBILITY_EVIDENCE_REQUIRED` for human assessment; if the promised outcome still has no
   supported integration, `NOT_ELIGIBLE` for that promise.
4. Quotation boundary (`CFG-12`): PILOT, FLEET and survey/installation scope → `QUOTATION_REQUIRED`.
5. Publication (`PUBLICATION_BLOCKED`) applies to every outcome while brand, IP, price, compatibility and
   safety gates are open.
6. `CONFIGURATION_DEFINED_INTERNAL` is the floor: it says the composition is coherent, nothing more.

There is **no** `ORDERABLE`, `FOR_SALE`, `PURCHASABLE` or `APPROVED` outcome. The validator rejects any
state token that would make a bundle look purchasable.

## 9. Eligibility questionnaires

The machine contract holds the three questionnaires (`eligibilityQuestionnaires`). Each bundle's
`eligibility.questionnaireRef` points here, and each answer set is consumed by deterministic rules —
never by a salesperson's judgement presented as a result.

**Why a general questionnaire.** It converts unknown facts into one of three honest outcomes: an
assessment request, a quotation request or a refusal of the promised outcome. It never converts an
unknown into compatibility.

### 9.1 General questionnaire — 13 questions (all bundles)

| Id | Question | If unknown / missing |
| --- | --- | --- |
| `GQ-01` | Vessel type and intended use | `COMPATIBILITY_EVIDENCE_REQUIRED` |
| `GQ-02` | Hull material, length overall, displacement class | `COMPATIBILITY_EVIDENCE_REQUIRED` |
| `GQ-03` | Existing instruments and their protocol/output | `COMPATIBILITY_EVIDENCE_REQUIRED` |
| `GQ-04` | Existing autopilot/steering control to remain untouched | `SPECIALIST_SURVEY_REQUIRED` for steering bundles; otherwise `COMPATIBILITY_EVIDENCE_REQUIRED` |
| `GQ-05` | Local network/bus/serial interfaces | `COMPATIBILITY_EVIDENCE_REQUIRED` |
| `GQ-06` | DC power, protection and helm circuits | `SPECIALIST_SURVEY_REQUIRED` |
| `GQ-07` | Engine/drive type and whether steering or motor circuit is touched | `SPECIALIST_SURVEY_REQUIRED` |
| `GQ-08` | Cruising region and chart coverage held or intended | `COMPATIBILITY_EVIDENCE_REQUIRED` |
| `GQ-09` | Connectivity at berth, mooring and underway | `COMPATIBILITY_EVIDENCE_REQUIRED` for WATCH/FLEET; otherwise `CONFIGURATION_DEFINED_INTERNAL` with honest limits |
| `GQ-10` | Customer device and operating-system version | `COMPATIBILITY_EVIDENCE_REQUIRED` |
| `GQ-11` | Preferred installation route and DIY capability | `SPECIALIST_SURVEY_REQUIRED` for professional routes |
| `GQ-12` | Account owner/administrator/support after handover | `QUOTATION_REQUIRED` (scope decision) |
| `GQ-13` | Classification, insurance, warranty or regulatory constraint | `SPECIALIST_SURVEY_REQUIRED`; never resolved by assumption |

### 9.2 Safety-sensitive questionnaire — 9 questions (SAIL and COMPLETE)

| Id | Question | Deterministic consequence if failed or unknown |
| --- | --- | --- |
| `SQ-01` | Exact steering system, drive/actuator family and manufacturer documentation | Failed → `NOT_ELIGIBLE`; unknown → `SPECIALIST_SURVEY_REQUIRED` |
| `SQ-02` | Independent rudder/steering feedback availability | `NOT_ELIGIBLE` while `PILOT_RUDDER_FEEDBACK = NOT_FOUND` cannot be closed for this vessel |
| `SQ-03` | Physical emergency stop location and helm reachability | Failed → `NOT_ELIGIBLE` |
| `SQ-04` | Independent motor-power isolation and verification | Failed → `NOT_ELIGIBLE` |
| `SQ-05` | Manual takeover possible at all times without tools or software | Failed → `NOT_ELIGIBLE` |
| `SQ-06` | Documented commissioning and supervised sea-trial slots | Unknown → `QUOTATION_REQUIRED`; absent → `NOT_ELIGIBLE` for a deliverable steering outcome |
| `SQ-07` | Qualified installer or surveyor accepts the vessel-specific safety plan | Unknown → `SPECIALIST_SURVEY_REQUIRED`; refused → `NOT_ELIGIBLE` |
| `SQ-08` | Owner accepts supervised, local-only, non-autonomous steering | Refused → `NOT_ELIGIBLE` |
| `SQ-09` | Classification, insurance or port-authority requirements | Unknown → `SPECIALIST_SURVEY_REQUIRED` |

The safety questionnaire can **never** produce a positive safety result in MC-08: the external safety
evidence does not exist, so the strongest possible result is `SPECIALIST_SURVEY_REQUIRED` or
`QUOTATION_REQUIRED`, both still `PUBLICATION_BLOCKED`.

### 9.3 B2B FLEET questionnaire — 10 questions (FLEET package)

| Id | Question | Deterministic consequence |
| --- | --- | --- |
| `FQ-01` | Organisation type and number of vessels | Missing → `QUOTATION_REQUIRED` |
| `FQ-02` | Ownership structure (owned/managed/charter/mixed) | Missing → `QUOTATION_REQUIRED` |
| `FQ-03` | Required roles, permissions, workflows and administrator | Missing → `QUOTATION_REQUIRED` |
| `FQ-04` | Telemetry sources per vessel and their ownership | Unknown → `COMPATIBILITY_EVIDENCE_REQUIRED` |
| `FQ-05` | Connectivity/SIM contract per vessel | Unknown → `COMPATIBILITY_EVIDENCE_REQUIRED`; no inclusion in the SaaS fee |
| `FQ-06` | Data-protection roles, retention, residency, deletion | Missing → `NOT_ELIGIBLE` until assessed; never assumed |
| `FQ-07` | Integration needs (maintenance/charter/accounting) | Present → `QUOTATION_REQUIRED` |
| `FQ-08` | Contractual SLA requirement and measurement evidence | No measurement → `NO_SLA_ESTABLISHED`; never an invented SLA |
| `FQ-09` | Procurement route, contract term, billing entity, VAT, currency | Missing → `QUOTATION_REQUIRED` |
| `FQ-10` | Training, onboarding and support expectations | Missing → `QUOTATION_REQUIRED`; onboarding price not established |

### 9.4 What evidence would change each decision

| Decision today | Evidence that would change it | Evidence that would never change it |
| --- | --- | --- |
| `COMPATIBILITY_EVIDENCE_REQUIRED` on a row | Device identity, firmware/version, direction, adapter, capture/record, reviewer and a recorded test (row section 11 of the compatibility doc) | A datasheet, a supplier promise, a dossier statement, a marketing claim, a unit-tested parser |
| `SPECIALIST_SURVEY_REQUIRED` | Completed vessel/organisation survey, installer acceptance, documented refusal if ineligible | A customer assurance that "the boat is standard" |
| `QUOTATION_REQUIRED` | Itemised quotation after survey, with inclusions/exclusions, VAT basis, payment milestones as a proposal | A headline figure, a bundle hypothesis, a discount |
| `NOT_ELIGIBLE` on a safety prerequisite | Bench evidence, E-stop and motor-isolation evidence, rudder feedback, supervised sea trials, independent review and conformity planning | Documentation, a specification promise, a software test |
| `PUBLICATION_BLOCKED` | X-01 trademark clearance, X-02 legal identity, price costing evidence (X-05), claims-register approvals, image-generation authorisation (X-03) | A validator pass or a milestone completion |
| `NOT_ELIGIBLE` for a duplicate or missing line | Nothing: the composition is fixed and the duplicate is always wrong | A customer request or a sales exception |

## 10. Conflict rules CF-01–CF-20

Each rule appears in `bundle-definitions.json.conflictRules` with `structuralCheck` and
`behaviouralIntegrationTestLater` flags. "Structural" rules are enforced by
`scripts/check-marea-bundles.mjs` today; "behavioural" rules also require a future integration test on a
real device, installation or service.

| Id | Name | Condition | Outcome | Enforcement |
| --- | --- | --- | --- | --- |
| CF-01 | Missing mandatory product | A mandatory base component is absent | `NOT_ELIGIBLE` | structural |
| CF-02 | Duplicate included product | Same family/edition appears twice | `NOT_ELIGIBLE` | structural |
| CF-03 | SENSE module counted twice via kit + loose module | A module of a selected kit also appears loose | `NOT_ELIGIBLE` | structural |
| CF-04 | Incompatible edition combination | Mutually exclusive editions both selected | `NOT_ELIGIBLE` | structural |
| CF-05 | AIS transmit functionality | AIS described as transmitting/transponder | `NOT_ELIGIBLE` | structural + behavioural |
| CF-06 | NMEA 2000 certification assumption | Certified NMEA 2000 assumed | `NOT_ELIGIBLE` | structural + behavioural |
| CF-07 | Unverified DISPLAY screen size presented as final | Measured size/brightness stated while size not frozen | `COMPATIBILITY_EVIDENCE_REQUIRED` | structural |
| CF-08 | PILOT Pro treated as retail SKU | `PILOT-PRO` priced or included as a retail line | `NOT_ELIGIBLE` | structural |
| CF-09 | PILOT inside fixed-price SAIL/COMPLETE checkout | PILOT resolved to a fixed priced inclusion | `QUOTATION_REQUIRED` | structural |
| CF-10 | WATCH without defined monitoring entitlement | WATCH present without a declared subscription | `NOT_ELIGIBLE` | structural + behavioural |
| CF-11 | Subscription-free cloud monitoring | Remote monitoring offered without subscription | `NOT_ELIGIBLE` | structural + behavioural |
| CF-12 | Missing chart/data entitlement | Navigation outcome without a licensed chart entitlement | `COMPATIBILITY_EVIDENCE_REQUIRED` | structural |
| CF-13 | NAV/WEATHER duplicated entitlement charge | Same entitlement billed twice | `NOT_ELIGIBLE` | structural + behavioural |
| CF-14 | Unverified sensor accuracy | Accuracy/resolution stated as achieved | `COMPATIBILITY_EVIDENCE_REQUIRED` | structural + behavioural |
| CF-15 | Unverified compatibility called SUPPORTED | `SUPPORTED`/`TESTED` without a device test record | `COMPATIBILITY_EVIDENCE_REQUIRED` | structural + behavioural |
| CF-16 | FLEET package confused with FLEET SaaS | Package = SaaS family, or hardware assumed in the fee | `COMPATIBILITY_EVIDENCE_REQUIRED` | structural |
| CF-17 | Cross-tenant access grant | Any cross-organisation access | `NOT_ELIGIBLE` | structural + behavioural |
| CF-18 | Remote PILOT command path | Any remote/web steering command | `NOT_ELIGIBLE` | structural + behavioural |
| CF-19 | Approved price without verified costs | Approved/final/checkout-ready price without costs | `PUBLICATION_BLOCKED` | structural |
| CF-20 | Blocked product promoted via a bundle | Bundle claims availability/approval/certification inherited from a blocked product | `PUBLICATION_BLOCKED` | structural + behavioural |

## 11. Configuration rules CFG-01–CFG-12

| Id | Rule | Outcome | Notes |
| --- | --- | --- | --- |
| `CFG-01` | Mandatory component presence | `NOT_ELIGIBLE` | Fixed composition; a missing line is always structural. |
| `CFG-02` | Edition resolution | `NOT_ELIGIBLE` | Only the nine product contracts build the registry. |
| `CFG-03` | Kit expansion | `NOT_ELIGIBLE` | Exact declared modules only; no invented capability. |
| `CFG-04` | Dependency resolution | `QUOTATION_REQUIRED` / `COMPATIBILITY_EVIDENCE_REQUIRED` | Subscriptions, entitlements and surveys resolve deterministically. |
| `CFG-05` | General questionnaire (13 questions) | `COMPATIBILITY_EVIDENCE_REQUIRED` | Unknown compatibility → human assessment, never assumed. |
| `CFG-06` | Safety-sensitive questionnaire (SAIL/COMPLETE) | `SPECIALIST_SURVEY_REQUIRED` / `NOT_ELIGIBLE` | Failed prerequisite → ineligible; pending survey → survey required. |
| `CFG-07` | B2B FLEET questionnaire | `QUOTATION_REQUIRED` | Every FLEET package is quoted and contracted. |
| `CFG-08` | Unknown compatibility | `COMPATIBILITY_EVIDENCE_REQUIRED` | Promotion only with a recorded device test. |
| `CFG-09` | Failed safety prerequisite | `NOT_ELIGIBLE` | E-stop, isolation, feedback, sea trials. |
| `CFG-10` | No supported integration for a promised outcome | `NOT_ELIGIBLE` | The bundle may stay internally defined but the promise is refused. |
| `CFG-11` | Unverified/conditional edition | `NOT_ELIGIBLE` | The edition is labelled conditional; it is never silently selected or priced as a standard line. |
| `CFG-12` | Quotation-required components | `QUOTATION_REQUIRED` | PILOT (D-009) and FLEET (D-022) boundaries. |

### 11.1 How the D18 validator enforces these rules

The machine gate is `scripts/check-marea-bundles.mjs` (D18). Its checks map to the rules above as
follows, and every mapping is covered by a negative fixture test in
`scripts/check-marea-bundles.test.mjs`:

| Rule area | Validator check |
| --- | --- |
| Mandatory base components present | `BUNDLE-09` (fixed reference components and required external scope) |
| Every reference line pinned to its one permitted inclusion class; no unpinned or hidden `INCLUDED` line | `BUNDLE-34` (conditional, ineligible, optional, required-external and quotation lines are pinned) |
| Line-level inclusion vocabulary; no sale/approval token in a component record | `BUNDLE-33` |
| Kit expansion exactly once, no loose duplicate module | `BUNDLE-07` (expansion authorities) and `BUNDLE-08` (duplicate counting) |
| DISPLAY-7 only; DISPLAY-LARGE-CONDITIONAL retained as an auditable `INELIGIBLE` guard line | `BUNDLE-13` |
| PILOT quotation boundary; PILOT-PRO never a priced retail line | `BUNDLE-10` |
| Subscriptions, entitlements and no double billing | `BUNDLE-11`, `BUNDLE-12`, `BUNDLE-28` |
| FLEET package/SaaS separation, hardware not included by default, tenancy boundary | `BUNDLE-16`, `BUNDLE-17` |
| No remote steering/helm path | `BUNDLE-18` |
| Price classification and the six historical hypotheses | `BUNDLE-19` |
| Prose claims: sale/orderable/purchasable, approval, clearance, certification, guaranteed delivery | `BUNDLE-26`, `BUNDLE-32` (documents and copy, including the subject-agnostic token detector for name/modal sale sentences) and `BUNDLE-15` (guaranteed/immediate alert delivery on specifications and the twelve copy files) |
| Stale rule references: a rule-reference position must never use the CR-NN line-id prefix | `BUNDLE-35` (configuration rules are `CFG-NN`; legitimate `CR-NN` CRUISE line ids remain valid in line-id positions) |
| Approved disclaimers by surface | `BUNDLE-23` (navigation on all twelve, AIS on CRUISE/COMPLETE/FLEET package, PILOT on SAIL/COMPLETE, weather on the START/CRUISE forecast surfaces) |
| Configuration-rule namespace `CFG-NN` never reused by a component line id | `BUNDLE-25` |

Prose scanning is case-insensitive and line-start safe, and it distinguishes an assertion from a quoted
example, a negated statement or an explicit exclusion list; the unit fixture suite injects real affirmative
sentences into a specification and into a customer copy file to prove the gate fails closed.

## 12. Example internal configurations

All six examples below are **CONFIGURATION_DEFINED_INTERNAL**. None is orderable, quotable,
publishable or purchasable; each remains `NOT_FOR_SALE` and `PUBLICATION_BLOCKED`.

### 12.1 START — internal reference resolution

```
START: HUB-STANDARD (ST-01, INCLUDED) + NAV-PRO (ST-02, INCLUDED)
required external: licensed chart region (ST-05), customer device + cabling/adapters (ST-06)
optional: HUB-PRO (ST-03), WEATHER-STANDARD (ST-04), installation (ST-07)
resolved outcomes: CONFIGURATION_DEFINED_INTERNAL, COMPATIBILITY_EVIDENCE_REQUIRED, PUBLICATION_BLOCKED
why not orderable: 0 tested compatibility rows; chart rights NOT granted; no BOM, cost or approved price; brand not cleared
```

### 12.2 CRUISE — internal reference resolution

```
CRUISE: NAV-ESSENTIAL (CR-01) + HUB-STANDARD (CR-02) + AIS-RECEIVER (CR-03) + DISPLAY-7 (CR-04)
conditional/not selected: AIS-CONNECTED (CR-06); ineligible: DISPLAY-LARGE-CONDITIONAL (CR-07)
required external: AIS antenna/splitter (CR-09), mounts/cabling/installation (CR-10), chart region/GNSS (CR-11)
optional: NAV-PRO (CR-05), WEATHER-STANDARD (CR-08)
resolved outcomes: CONFIGURATION_DEFINED_INTERNAL, COMPATIBILITY_EVIDENCE_REQUIRED, PUBLICATION_BLOCKED
why not orderable: AIS/DISPLAY/HUB untested; display size NOT frozen; AIS data rights open; no installation price
```

### 12.3 SAIL — internal reference resolution

```
SAIL: NAV-PRO (SL-01) + HUB-STANDARD (SL-02) + PILOT-COASTAL (SL-03, QUOTATION_REQUIRED) + SENSE-WIND (SL-04, CONDITIONAL)
conditional/not default: PILOT-SAIL (SL-05); ineligible as priced SKU: PILOT-PRO (SL-06)
quotation scope: vessel + steering survey (SL-08), drive/feedback/E-stop/cabling (SL-09), labour/commissioning/sea trials (SL-10)
resolved outcomes: CONFIGURATION_DEFINED_INTERNAL, SPECIALIST_SURVEY_REQUIRED, QUOTATION_REQUIRED, COMPATIBILITY_EVIDENCE_REQUIRED, PUBLICATION_BLOCKED
releaseReadiness.state: BLOCKED; verdict FULL_BUNDLE_PRICE_NOT_ESTABLISHED
why not orderable: PILOT_SAFETY_GATE BLOCKED; no fixed price (D-009); pilotSurveyRequired=true; no sea trials
```

### 12.4 PROTECT — internal reference resolution

```
PROTECT: WATCH-CORE (PR-01, INCLUDED, subscription) + SENSE-ESSENTIALS (PR-02, expands to SENSE-POWER + SENSE-BILGE)
ineligible duplicate: loose SENSE-POWER/SENSE-BILGE (PR-03)
required recurring: WATCH monitoring subscription (PR-07); required external: SIM/data (PR-06), installation (PR-08)
optional: HUB-STANDARD (PR-04); conditional/not selected: WATCH-PLUS (PR-05)
resolved outcomes: CONFIGURATION_DEFINED_INTERNAL, COMPATIBILITY_EVIDENCE_REQUIRED, PUBLICATION_BLOCKED
pricing verdict: HISTORIC_PRICE_NOT_COST_JUSTIFIED; final price OPEN
why not orderable: WATCH service NOT_FOUND; accuracy NOT_MEASURED; connectivity contract NOT_FOUND; 299 + 2 x 99 > 399
```

### 12.5 COMPLETE — internal reference resolution

```
COMPLETE: NAV-PRO + HUB-PRO + DISPLAY-7 + WATCH-CORE + SENSE-POWER + SENSE-BILGE + SENSE-TANKS + SENSE-ENV
          + PILOT-COASTAL (CP-09, QUOTATION_REQUIRED)
optional: AIS-RECEIVER (CP-10), WEATHER-PRO (CP-11)
conditional/not reference: PILOT-SAIL (CP-14); ineligible: PILOT-PRO (CP-13), DISPLAY-LARGE-CONDITIONAL (CP-15)
quotation scope: full survey (CP-16), installation/commissioning/training/conformity (CP-17)
resolved outcomes: CONFIGURATION_DEFINED_INTERNAL, SPECIALIST_SURVEY_REQUIRED, QUOTATION_REQUIRED, COMPATIBILITY_EVIDENCE_REQUIRED, PUBLICATION_BLOCKED
releaseReadiness.state: BLOCKED; verdict FULL_BUNDLE_PRICE_NOT_ESTABLISHED
why not orderable: multiple subsystem gates BLOCKED; fixed turnkey price not approved; no project quotation
```

### 12.6 FLEET package — internal contracted resolution

```
FLEET package: FLEET-START or FLEET-BUSINESS subscription (FP-01, INCLUDED per vessel/month)
               + onboarding (FP-03) + enrolment/migration (FP-04) + governance software (FP-11)
conditional contracted: FLEET-ENTERPRISE (FP-02), integrations/optional SLA (FP-10)
optional: WATCH-CORE (FP-05), HUB-STANDARD (FP-06), SENSE (FP-07), installation (FP-09)
required external: SIM/data per connected device (FP-08)
resolved outcomes: CONFIGURATION_DEFINED_INTERNAL, COMPATIBILITY_EVIDENCE_REQUIRED, QUOTATION_REQUIRED, PUBLICATION_BLOCKED
contractedSolution=true; hardwareIncludedByDefault=false; onboardingPricingEstablished=false
why not orderable: FLEET service NOT_IMPLEMENTED; NO_SLA_ESTABLISHED; bespoke quotation only; brand not cleared
```

## 13. Cross-sell rules CS-01–CS-08

| Id | Rule | What it permits | What it prohibits |
| --- | --- | --- | --- |
| `CS-01` | START → CRUISE | Add `AIS-RECEIVER` and `DISPLAY-7`, retain HUB/NAV scope | Re-billing the retained HUB/NAV entitlement |
| `CS-02` | CRUISE → COMPLETE | Add integration, monitoring and a quoted PILOT scope | A fixed-price upgrade replacing the quotation |
| `CS-03` | START/CRUISE → SAIL | Add a surveyed PILOT quotation and wind measurement | Converting the quoted steering scope into a fixed SKU; replacing functional hardware |
| `CS-04` | PROTECT → COMPLETE | Retain WATCH and monitoring; add navigation, display, integration and quoted PILOT | Re-billing the retained WATCH entitlement; double-counting sensors |
| `CS-05` | FLEET package ↔ FLEET SaaS | Package is opt-in and distinct; per-vessel subscription retained | Folding hardware into the SaaS fee; silently attaching the package to a hardware purchase |
| `CS-06` | NAV/WEATHER cross-sell | Recognise an already granted entitlement | A second charge for the same entitlement (D-013) |
| `CS-07` | WATCH/HUB as FLEET options | Separate purchase and subscription per vessel | Treating hardware or connectivity as included in the FLEET fee |
| `CS-08` | No cross-sell of ineligible items | Nothing | Selling `PILOT-PRO` as a priced SKU or `DISPLAY-LARGE-CONDITIONAL` as an available size |

## 14. Worked failure examples

1. **Duplicate kit module.** PROTECT with `SENSE-ESSENTIALS` + `SENSE-POWER` (INCLUDED) →
   `CF-03`/`CFG-03` → `NOT_ELIGIBLE`. The kit already counts power and bilge once.
2. **Missing mandatory product.** SAIL without `PILOT-COASTAL` (or with only `PILOT-PRO`) →
   `CF-01`/`CF-08` → `NOT_ELIGIBLE`; the steering outcome cannot exist as a fixed retail line.
3. **Compatibility invented.** Any bundle citing `SUPPORTED`/`TESTED` while `deviceTestRecorded=false`
   → `CF-15`/`BUNDLE-31` → `COMPATIBILITY_EVIDENCE_REQUIRED`; the contract must reject the claim.
4. **Fixed price around PILOT.** SAIL with `fixedTurnkeyPriceApproved=true` or a PILOT line outside
   `QUOTATION_REQUIRED` → `CF-09`/`CFG-12` → `QUOTATION_REQUIRED`; the validator fails the contract.
5. **Subscription-free monitoring.** PROTECT without the WATCH monitoring entitlement →
   `CF-10`/`CF-11` → `NOT_ELIGIBLE`; remote monitoring never exists without its subscription.
6. **Sale through packaging.** Any bundle whose commercial availability or publication state is set
   to a sale/approval state, or to a publication state other than `INTERNAL_ONLY`, → `CF-20`/`CF-19` →
   `PUBLICATION_BLOCKED` and a validator failure.

## 15. Honest limit

A JSON test is not evidence that a real installed system works safely. The validator and this
document prove only that the bundle objects are internally consistent with the nine product contracts,
the fixed reference configurations, the canonical compatibility registers, the approved disclaimer
wording and the MC-08 governance vocabulary. They do not prove that a HUB reads a real instrument, that
an AIS receiver hears a real transmitter, that a display is readable in sunlight, that a sensor is
accurate, that a WATCH alert reaches a person, that a FLEET tenant isolation test passed, that a PILOT
installation is safe, that a supplier quote is deliverable or that any vessel can be steered with any
configuration described here. Those are external engineering, measurement, legal and commercial
conditions recorded as `OPEN` or `BLOCKED`; they remain unproven at MC-08, and no bundle is for sale,
quotable or publishable.

## 16. References

- `docs/marea/bundles/bundle-definitions.json` (D17) — machine authority for components, rules,
  outcomes, entitlements, assets and the six bundles.
- `docs/marea/bundles/BUNDLE-ARCHITECTURE.md` (D1) — architecture, vocabulary, reference configurations.
- `docs/marea/bundles/BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` (D8) — line-item composition matrix.
- `MAREA-START-COMMERCIAL-SPEC.md`, `MAREA-CRUISE-COMMERCIAL-SPEC.md`,
  `MAREA-SAIL-COMMERCIAL-SPEC.md`, `MAREA-PROTECT-COMMERCIAL-SPEC.md`,
  `MAREA-COMPLETE-COMMERCIAL-SPEC.md`, `MAREA-FLEET-PACKAGE-COMMERCIAL-SPEC.md` (D2–D7) — the six
  24-field specifications and their B01–B24 evidence.
- `docs/marea/products/README.md` §1–§32; `docs/marea/products/product-definitions.batch-01/02/03.json`;
  `PRODUCT-EDITIONS-*.md`; `PRODUCT-COMPATIBILITY-*.md`; `PRODUCT-PRICING-AND-CHANNEL-MODEL*.md`.
- `docs/marea/execution/DECISION-LOG.md` — D-007 to D-024 (including the MC-08 decisions D-018–D-024).
- `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9 — approved disclaimers.
- `scripts/check-marea-bundles.mjs`, `scripts/check-marea-bundles.test.mjs` — the validator and its
  negative-mutation tests.

**Status statement.** Six internal bundle definitions are configured, one reference configuration per
bundle, with deterministic rules and explicit blockers. No bundle is orderable, quotable, publishable,
certified or for sale; no price is approved; no compatibility row is tested; no safety evidence exists;
the MAREA brand is a proposal, not a cleared trademark.
