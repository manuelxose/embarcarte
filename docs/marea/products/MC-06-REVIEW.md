# MC-06 — Independent review and final verdict (D14)

> **Final verdict: PASS — for the product-definition scope only.** MC-06 defines three complete products and does not release them. Every product remains `DEFINED` and `NOT_FOR_SALE`; `PILOT_SAFETY_GATE = BLOCKED`; no price is approved; nothing is certified, tested, installable, orderable or publishable. This review is not a commercial release, a safety case, an accuracy report, a delivery measurement, a conformity assessment, a brand clearance or a legal opinion.

| Field | Value |
| --- | --- |
| Document ID | MC-06 / D14-REVIEW |
| Milestone | MC-06 (Master Prompt 06/36) — product definitions batch 2: MAREA PILOT, MAREA SENSE, MAREA WATCH |
| Reviewer | Independent Reviewer (D14). Not an author of any MC-06 deliverable; this file is the reviewer's only write |
| Date | 2026-10-30 |
| Review type | Independent two-turn review: turn 1 full verification and findings; turn 2 re-verification of the corrections on a frozen commit |
| Commit under review | `45925064a7710c666320b5a569b2cae5c57eb2f5` — "docs(mc06): complete commercial definitions for MAREA PILOT, SENSE and WATCH" |
| Branch | `feature/marea-mc06-pilot-sense-watch-products` |
| Base | `906f74b` (MC-05 closing commit) |
| Tree state | `git status --short` empty at the start of turn-2 verification; only this review file was added afterwards |
| Scope | Completeness, honesty, traceability and internal consistency of the three product definitions, their editions, compatibility, pricing framework, journeys, copy, asset plans, safety/measurement/alert annexes, machine-readable contract and validator |
| Out of scope | Functional, physical, safety, accuracy, delivery, commercial, legal or certification verification. No hardware was built, energised, steered or tested; no vessel was used; no service was operated |
| Method | Read the actual files and the actual commit (not delivery summaries); inspect the commit's file set; run the repository gates myself; run my own adversarial mutations against the validator in throwaway `--root` trees; review as a marine-electronics buyer, a functional-safety reviewer and a claims/compliance reviewer |
| Verdict | **PASS (product-definition scope only)** |

The reviewer did not author, edit or "fix" any MC-06 deliverable, and ran no write Git commands. The corrections listed in §3 were made by the owning functions after the turn-1 findings; the reviewer re-verified them on the frozen commit.

---

## 0. The one thing this verdict does and does not mean

- **It means:** the three final-product definitions are complete to the 24-field standard, internally consistent across dossier / editions / compatibility / pricing / journeys / copy / asset plan / machine-readable contract / validator, honest about what does not exist, and defended by a validator whose negative tests reject the mutations it claims to reject.
- **It does not mean:** that MAREA PILOT is safe to install, that MAREA SENSE measures accurately, that MAREA WATCH delivers alerts, that any product is certified, that the brand is cleared, that a price is approved or that anything can be sold. Those are external blockers recorded in §5 and are unchanged by MC-06.

---

## 1. What was reviewed

### 1.1 The actual change set (commit `45925064…`)

`git show --stat HEAD` reports **22 files, 16,259 insertions, 693 deletions**:

| Status | File |
| --- | --- |
| M | `docs/marea/products/README.md` (32485→33114 bytes; MC-06 addendum + frozen-report edits) |
| M | `docs/marea/execution/DECISION-LOG.md` (D-008, D-009, D-010, D-011 added; +196 lines) |
| M | `scripts/check-marea-products.mjs` (single extended validator; MC-05 checks preserved and parameterised per batch) |
| M | `scripts/check-marea-products.test.mjs` (77 tests; the 38 MC-05 tests remain) |
| A | `docs/marea/products/MAREA-PILOT-COMMERCIAL-SPEC.md` |
| A | `docs/marea/products/MAREA-SENSE-COMMERCIAL-SPEC.md` |
| A | `docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` |
| A | `docs/marea/products/PILOT-SAFETY-CASE-OUTLINE.md` |
| A | `docs/marea/products/SENSE-MEASUREMENT-AND-CALIBRATION-PLAN.md` |
| A | `docs/marea/products/WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md` |
| A | `docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` |
| A | `docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` |
| A | `docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` |
| A | `docs/marea/products/CUSTOMER-JOURNEYS-PILOT-SENSE-WATCH.md` |
| A | `docs/marea/products/PRODUCT-ASSET-REQUIREMENTS-BATCH-02.md` |
| A | `docs/marea/products/copy/pilot.es.md`, `copy/pilot.en.md` |
| A | `docs/marea/products/copy/sense.es.md`, `copy/sense.en.md` |
| A | `docs/marea/products/copy/watch.es.md`, `copy/watch.en.md` |
| A | `docs/marea/products/product-definitions.batch-02.json` |

Commit scope check: **no `src/`, `public/`, `package.json`, `package-lock.json`, `.github/`, checkout, price, stock, payment, deployment or OPEN-MARINE file changed.** The files are exactly the internal product-definition scope authorised by README §23.

### 1.2 Files read and measured (frozen commit)

| File | Bytes | Lines |
| --- | ---: | ---: |
| `docs/marea/products/README.md` | 33,114 | 474 |
| `docs/marea/products/MAREA-PILOT-COMMERCIAL-SPEC.md` | 132,768 | 995 |
| `docs/marea/products/MAREA-SENSE-COMMERCIAL-SPEC.md` | 118,275 | 893 |
| `docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` | 101,373 | 691 |
| `docs/marea/products/PILOT-SAFETY-CASE-OUTLINE.md` | 129,845 | 1,134 |
| `docs/marea/products/SENSE-MEASUREMENT-AND-CALIBRATION-PLAN.md` | 53,486 | 776 |
| `docs/marea/products/WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md` | 57,773 | 721 |
| `docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` | 62,481 | 625 |
| `docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md` | 37,821 | 265 |
| `docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md` | 43,665 | 399 |
| `docs/marea/products/CUSTOMER-JOURNEYS-PILOT-SENSE-WATCH.md` | 65,455 | 506 |
| `docs/marea/products/PRODUCT-ASSET-REQUIREMENTS-BATCH-02.md` | 61,835 | 743 |
| `docs/marea/products/copy/pilot.es.md` | 29,426 | 251 |
| `docs/marea/products/copy/pilot.en.md` | 26,458 | 251 |
| `docs/marea/products/copy/sense.es.md` | 27,891 | 253 |
| `docs/marea/products/copy/sense.en.md` | 25,803 | 253 |
| `docs/marea/products/copy/watch.es.md` | 32,931 | 258 |
| `docs/marea/products/copy/watch.en.md` | 30,079 | 258 |
| `docs/marea/products/product-definitions.batch-02.json` | 104,756 | 2,514 |
| `scripts/check-marea-products.mjs` | 176,830 | 4,477 |
| `scripts/check-marea-products.test.mjs` | 41,733 | 1,380 |
| `docs/marea/execution/DECISION-LOG.md` | 37,228 | 488 |

Binding conventions also read in full: `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` (§1–§10, especially §4 safety language, §5 availability controls, §6 pricing, §8 empty claims register and §9 verbatim disclaimers), `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` (all 58 blocker rows and §7 decisions), and `docs/marea/execution/DECISION-LOG.md` D-007, D-008, D-009, D-010 and D-011.

### 1.3 Method, and why it is independent

1. Read the real dossiers and annexes end to end (not the delivery summary), including the parts that would embarrass the programme: the safety case's "not evidenced" register, the calibration plan's "not measured" rules, the alert contract's delivery-uncertainty states and the copy's limitations.
2. Ran the repository's real gates myself on the frozen commit, including the two script gates and Prettier.
3. Built throwaway copies of `docs/marea` under `%TEMP%` and applied prohibited mutations, then ran the real validator CLI with `--root` to see whether it actually rejects them. No repository file was edited by these probes.
4. Re-checked cross-document consistency mechanically where possible: the 24 fields and editions in the JSON; the 12/18 asset split against the D9 matrix; the six copy files' headings and the verbatim disclaimers against the claims policy; the four allowed price figures; `git show --name-only` for scope.
5. Turn-2 re-verification was limited to the changed items and the gates, as required, on the Lead-declared frozen commit.

---

## 2. Per-question verdicts (24 review questions)

| # | Review question | Verdict | Evidence |
| ---: | --- | --- | --- |
| 1 | 24 canonical fields substantive and traceable per product | **PASS** | Each dossier has F01–F24 with Definition/Evidence/Owner/Blockers/Commercial readiness (`MAREA-PILOT-COMMERCIAL-SPEC.md` etc.); the JSON has 24 fields per product with `status/evidenceClass/summary/evidenceRefs/ownerFunction/blockers/readinessDimension/readinessValue`; gate `json.fields`, `dossiers.fields`, `json.traceability` PASS (555 evidence references resolved) |
| 2 | Three offers complete | **PASS** | D1/D2/D3 (995/893/691 lines), D4 (625), D5 (265), D6 (399), D7 (506), D9 (743), three annexes, six copy files, JSON and validator are all present and complete; no heading-only or TBD field (`placeholders` check PASS) |
| 3 | Commercially distinguishable | **PASS** | PILOT = installed supervised steering, SENSE = local measurement modules/kits, WATCH = connected monitoring + subscription; D4 §5 cross-family table; the three do not overlap in capability or dependency |
| 4 | Editions meaningful and consistent with README §14/§18 | **PASS** | 13 edition objects; PILOT-COASTAL `DEFINED`, PILOT-SAIL `CONDITIONAL`, PILOT-PRO `INSTALLATION_PACKAGE`; five SENSE modules `DEFINED`, Essentials `DEFINED`, Sail/Systems `CONDITIONAL`; WATCH-CORE `DEFINED`, WATCH-PLUS `CONDITIONAL`; no fourth tier (`editions.comparison`, `batch02.editions` PASS) |
| 5 | Hardware items identified conceptually | **PASS** | PILOT PS-01–PS-18 subsystem register; SENSE A01–A21 per module; WATCH CD-01–CD-40 and four commercial layers; D9 30 asset plans; every item is described as an intended article, never as built |
| 6 | Unknown BOM explicitly OPEN | **PASS** | D1 F07/F13/F14 (`OPEN`/`BLOCKED` H-03/H-05/H-07), D2 F07/F09, D3 F07/F14, D6 §7 symbolic cost framework (every input `OPEN`/`BLOCKED`); no invented BOM, quote or figure |
| 7 | Price hypotheses honest — only EUR 1,290 / 99 / 299 / 9.90 and only as hypotheses | **PASS** | README §17 allows exactly those four; D1/D4/D6/JSON state them `HYPOTHESIS_UNAPPROVED` with "not an all-inclusive quotation" and quotation-required flags; no figure in any copy; six other extract/section figures (bundle EUR 1,990/3,490) appear only as labelled ecosystem context; D6's competitor prices are `VERIFIED_EXTERNAL` with URLs/dates and explicitly not benchmarks (`pricing` gate PASS) |
| 8 | PILOT safety gate unambiguously BLOCKED | **PASS** | `PILOT_SAFETY_GATE = BLOCKED` in D1 §1, the safety case §0.2/§17, JSON `safetyGate`, D4, D7 and the copy's limitations; E-stop/motor-isolation/rudder evidence `NOT_FOUND`, sea trials `NOT_PERFORMED` (`batch02.safety` PASS) |
| 9 | No remote steering implied anywhere | **PASS** | D1 §4.3/§5.2, D3 §5.2/§8, D5 (31 rows, 0 `SUPPORTED`), D7 §1.4/§9, the alert contract §1.2 and all six copy files state that no app/cloud/website/WATCH/NAV/HUB path can steer; my adversarial scan of 307 term hits found no affirmative autonomy/remote-helm/collision-avoidance claim; `batch02.prohibitions` PASS |
| 10 | OPEN-MARINE gaps accurately described | **PASS** | `WATCH_INGESTION = NOT_VERIFIED`; `WATCH_NOTIFICATION_PIPELINE`, `WATCH_DEVICE_IDENTITY`, `WATCH_SUBSCRIPTION_SERVICE`, `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND`; `PILOT_*_EVIDENCE = NOT_FOUND`; `PILOT_SEA_TRIALS = NOT_PERFORMED`; `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`; `SENSE_NMEA2000 = NOT_IMPLEMENTED`; JSON `safetyGates` and `batch02.evidenceStates` PASS; no absence was upgraded |
| 11 | SENSE calibration/accuracy bounded | **PASS** | Per-module A07/A08/A09 calibration requirements, PROPOSED acceptance criteria and `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`; D10b defines reference classes, TAR, records and recalibration basis (`OPEN`); README §16.4 now explicitly permits internal PROPOSED targets and forbids them in copy; no numeric accuracy claim in any copy |
| 12 | WATCH distinguishes event / alert / delivery / acknowledgement, and provider acceptance is not delivery | **PASS** | Canonical ten-state model and eight distinct timestamps (README §20, D3 §8, D10 contract §3–§5, JSON); provider acceptance never sets delivered, delivery never sets acknowledged, `DELIVERY_UNKNOWN` is a first-class state; D7 §8 shows stale/unknown display; `batch02.notification` PASS |
| 13 | Connectivity and subscription exclusions transparent | **PASS** | D3 F07/F12/F13 and §4/§7; D4 W16/W17; D6 §9; copy states hardware + subscription separation, no unlimited/worldwide coverage, no SIM included, local functions keep working without payment (design requirement, not tested behaviour) |
| 14 | Location/sharing rights scoped | **PASS** | D3 §7 and D10 §17: no public position by default, per-role invitations, immediate revocation, minimisation allow-list, retention/deletion/export/audit/DPIA items `OPEN`, lawful-basis assessment explicitly pending DPO; copy states "position not public by default" |
| 15 | Product interactions safe and coherent | **PASS** | README §19 authority matrix; D5 31-row compatibility contract with 0 `SUPPORTED` rows and exact README §21 columns; D7 §9 no-steering guarantee; subscription isolation stated as a design requirement everywhere; no cross-product write path to the actuator |
| 16 | Contract reuses the MC-05 model | **PASS** | `contractId` `MC-06-PRODUCT-DEFINITIONS-BATCH-02` v1.0.0; same 24 field keys, evidence classes, lifecycle, readiness dimensions as batch-01; `json.contract`, `json.products`, `json.editions`, `json.fields` PASS |
| 17 | Batch-01 still passes | **PASS** | The same validator run covers both contracts: `test:products` 38/38 PASS includes all MC-05 checks; `test:products:unit` 77/77 PASS includes the 38 MC-05 tests (baseline, `--json`, all mutation categories) with no MC-05 regression |
| 18 | Negative tests actually fail for prohibited mutations | **PASS** | 77/77 tests, including two new BLK-01 regressions; independently, my own temp-root mutations are all rejected: `EUR 299→EUR 349` on the F13 hypothesis line → `FAIL batch02.pricing`; prohibited NMEA/unattended claim + `HYPOTHESIS_UNAPPROVED` → `FAIL nmea`; `EUR 1,290→1,390` → `FAIL batch02.pricing`; WATCH-Plus price in JSON → `FAIL json.editions` + `FAIL batch02.editions`; SENSE module claiming direct remote alerts → `FAIL batch02.invariants` |
| 19 | Six ES/EN drafts polished and natural | **PASS** | All six files have exactly the 24 numbered headings, matching ES/EN structure; ES is natural Spain Spanish (tú) and EN natural international English; all 12 mandated disclaimer instances match the policy verbatim (checked mechanically, §4.4); no prices, purchase CTA, stock, review, certification or availability claim (gate PASS) |
| 20 | 30 asset plans honest | **PASS** | D9 has 30 requirements with ids, subject, format, rights/provenance, `CONCEPT`, ES/EN alt, safety labels and acceptance; 12 remain `BLOCKED_ON_IMAGE_GENERATION` (HERO/USE/INS/TMB per family) and 18 are `CONCEPT` (reused MC-04 vectors/briefs and authored specs); the JSON mirrors the 12/18 split with per-asset `classification`/`provenance`; no image file exists and none may be generated while X-03 is open |
| 21 | Legal/brand restrictions preserved | **PASS** | MAREA described as a proposed brand throughout; `BRAND_CLEARANCE = NOT_GRANTED`, `SOURCE_IP_CLEARANCE = NOT_CLEARED`; no `®`/`™`; claims register empty and no claims-policy text described as approved (SENSE/WATCH limitation wording labelled INTERNAL DRAFT); `test:brand` 21/21 and `test:brand:unit` 13/13 PASS |
| 22 | Git diff limited to authorised internal files | **PASS** | The frozen commit changes only `docs/marea/products/**`, `docs/marea/execution/DECISION-LOG.md` and `scripts/check-marea-products*.mjs`; README addendum documented; no unauthorised path in `git show --name-only` |
| 23 | No hardware, public site or production service altered | **PASS** | No `src/`, `public/`, commerce, payment, deployment or OPEN-MARINE change; no image generation, no chargeable API, no hardware/radio/steering test; the safety case records that no hardware was energised and no vessel was used |
| 24 | Next milestone ready | **PASS** | The definition set is a usable input for MC-07/MC-08/MC-11/MC-12/MC-13: edition objects frozen by D-008/D-011, compatibility rows with promotion rules, pricing evidence list, 17-stage journeys and asset plans; residual external blockers are explicitly listed in §5 rather than hidden |

---

## 3. Findings, corrections and closure (turn 1 → frozen commit)

All seven findings raised in turn 1 are **fixed and verified**. No finding remains open. Two residual observations (OBS-09/OBS-10) are recorded as accepted with rationale and are not defects.

| Id | Severity | Turn-1 finding (snapshot before freeze) | Closure on `45925064…` (verified) | State |
| --- | --- | --- | --- | --- |
| **BLK-01** | BLOCKING | Validator accepted prohibited prices/claims when the line also carried `HYPOTHESIS_UNAPPROVED` (status token was treated as negative context); the covering negative test had been rewritten around the hole, so `test:products:unit` was green while the original `EUR 299→EUR 349` mutation passed | `EXEMPT_CONTEXT` no longer contains `HYPOTHESIS_UNAPPROVED`/`NOT_*` (`scripts/check-marea-products.mjs:1306`); edition-verdict scan token-matches APPROVED (`:2518`); the pricing check judges the local clause around each figure and no longer exempts whole-line negation (`isProhibitedExampleContext` `:1504`, `:3908`); two regressions were added (`scripts/check-marea-products.test.mjs:1249`, `:1266`). My probes A/B/C now all fail as they must (see §4.3). `test:products` 38/38 and `test:products:unit` 77/77 PASS | **Fixed** |
| **MAJ-02** | MAJOR | `product-definitions.batch-02.json` marked all 30 assets `BLOCKED_ON_IMAGE_GENERATION`, contradicting D9's 12 blocked / 18 CONCEPT split and the batch-01 precedent (12/18) | Contract now has 12 `BLOCKED_ON_IMAGE_GENERATION` + 18 `CONCEPT`, each with `classification`/`provenance` (`product-definitions.batch-02.json:24`, `:312`); README §22 was clarified (`README.md:460`) and the validator parses the D9 coverage matrix and cross-checks the contract (`scripts/check-marea-products.mjs:770`, `:3034`–`:3126`); regressions at `test:1280`, `test:1294`; gate `assets`/`batch02.assets` PASS | **Fixed** |
| **MAJ-03** | MAJOR | SENSE customer copy described `SENSE-SYSTEMS` as "Power + Tanks + Environment" and omitted Bilge, contradicting D2 §7.3, D4 and the JSON kit composition | Both copy files now read "Power + Bilge + Tanks + Environment" (`copy/sense.es.md:85`, `copy/sense.en.md:85`); new `batch02.kits` check makes D2/D4/JSON/copy compositions agree (`scripts/check-marea-products.mjs:4215`); regressions at `test:1308`, `test:1322`; gate `batch02.kits` PASS | **Fixed** |
| **MIN-04** | MINOR | WATCH copy said "it is not a navigational aid" while the mandated navigation disclaimer says "This product is a navigational aid" | Both files reworded to "not a navigation or charting product" (`copy/watch.es.md:235`, `copy/watch.en.md:235`); the approved navigation disclaimer remains verbatim (`copy/watch.en.md:250`; mechanical verbatim check in §4.4); `disclaimers` gate PASS | **Fixed** |
| **MIN-05** | MINOR | SENSE numeric `PROPOSED` accuracy targets sat against README §16 rule 4's "no numerical accuracy figure" prohibition without an explicit carve-out in the binding convention | README §16.4 now authorises internal PROPOSED validation targets only in the SENSE dossier/D10b, always as future acceptance criteria, never achieved accuracy and never in copy (`README.md:351`–`354`); no copy contains a number; `batch02.sense` PASS | **Fixed** |
| **MIN-06** | MINOR | D4 asserted local indication `INCLUDED` for every module while D2 conditions it on design; JSON booleans `hubRequired`/`watchRequired` collapsed conditional dependencies | D4 S08 now reads "local indication where the module is designed with one … D2 §5.3 governs" (`PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md:274`); JSON now carries `dependencySemantics` and enumerated `hubDependency`/`watchDependency`/`displayDependency` (with booleans kept consistent); validator rejects a module claiming direct remote alerting or a contradictory enumeration (`test:1339`, `test:1352`) | **Fixed** |
| **MIN-07** | MINOR | WATCH copy step 1 was an imperative "Buy the device…" in a NOT_FOR_SALE draft; the CTA rule did not catch that phrasing | Both files reworded ("El dispositivo se compra y la edición se elige" / "The device is purchased and the edition is chosen", `copy/watch.es.md:133`, `copy/watch.en.md:133`); a narrow imperative-CTA rule and regression test were added (`test:1369`) | **Fixed** |
| **OBS-08** | OBSERVATION | The working tree moved during turn-1 verification (validator/test edits at 20:31–20:34, D-011 added at ~20:28); gate results were snapshot-dependent | Lead froze the commit `45925064…`, declared it clean and withheld further writes; all turn-2 gates and probes were run on that SHA with `git status --short` empty; the turn-1 failures are recorded as closure history in §4.2 | **Accepted — process resolved** |
| **OBS-09** | OBSERVATION | The validator's negative-context heuristic still tolerates a prohibited statement co-located with an ordinary negation word (e.g. an affirmative claim on a line containing "no"/"without"), and copy checks are tolerant by design | Not a defect in the current documents, none of which contains such a claim (adversarial scan §4.3); it is a residual limitation of a heuristic gate. Recommended for MC-34/MC-35: keep negative-context tolerance narrow and add adversarial mutations beyond the shipped regressions | **Accepted with rationale (residual limitation)** |
| **OBS-10** | OBSERVATION | External comparator prices and standards/EU-act scope citations (D6 §5, safety case §15) were not independently re-fetched by this reviewer | They are labelled `VERIFIED_EXTERNAL` with official URLs and the 2026-10-30 check date, and D6 itself requires re-checking before reuse; no external claim is used as MAREA evidence. Re-fetching is outside this milestone's acceptance and does not affect the definition-scope verdict | **Accepted with rationale (dated external evidence)** |

---

## 4. Gate evidence (run by the reviewer on the frozen commit)

### 4.1 Repository gates

All commands were executed from the repository root on `45925064a7710c666320b5a569b2cae5c57eb2f5` with a clean tree. `EXIT` is the shell exit code.

| Command | Result |
| --- | --- |
| `npm run test:products` | **PASS** — `Summary: 38 checks run, 38 passed, 0 failed; 33 of 33 scoped files read` / `RESULT: PASS` (EXIT 0). Included new check `batch02.kits`; both contracts validated |
| `npm run test:products:unit` | **PASS** — `tests 77`, `pass 77`, `fail 0` / EXIT 0 (includes the 38 MC-05 tests and 9 independent-review regressions) |
| `npm run format:check` | **PASS** — "All matched files use Prettier code style!" / EXIT 0 |
| `npm run test:brand` | **PASS** — `21 checks run, 21 passed, 0 failed; 24 files scanned, 0 skipped` / EXIT 0 |
| `npm run test:brand:unit` | **PASS** — `pass 13`, `fail 0` / EXIT 0 |
| `git diff --check` | **Clean** — no whitespace errors (EXIT 0) |

For transparency: at the **turn-1 snapshot** these gates were not green — `test:products:unit` failed 5 of 68 (including the price mutation and the negative-context test) and `format:check` failed 2 script files. Those conditions are the BLK-01 finding and were corrected in the frozen commit; the 77/77 and format-PASS evidence above is the post-correction state.

### 4.2 Commit scope evidence

`git show --name-only --format="" HEAD` lists only the 22 authorised files in §1.1. An explicit filter for `src/`, `public/`, `package*.json`, `.github/` and OPEN-MARINE returned nothing. `git status --short` was empty before the reviewer added this review file.

### 4.3 Reviewer's independent adversarial probes (real validator, throwaway `--root` trees)

Each probe copied `docs/marea` into `%TEMP%`, applied one prohibited mutation, and ran `node scripts/check-marea-products.mjs --root <temp>` (the real CLI, no repository edits).

| Probe | Mutation | Result on frozen commit |
| --- | --- | --- |
| A | First `EUR 299` on the WATCH F13 line (which says `HYPOTHESIS_UNAPPROVED`) changed to `EUR 349` | **Rejected**: `FAIL batch02.pricing` — `RESULT: FAIL` |
| B | Append to the PILOT dossier: "The steering unit is NMEA 2000 certified and certified for unattended use, offered as HYPOTHESIS_UNAPPROVED." | **Rejected**: `FAIL nmea` — `RESULT: FAIL` |
| C | First `EUR 1,290` changed to `EUR 1,390` | **Rejected**: `FAIL batch02.pricing` — `RESULT: FAIL` |
| D | Properly set `WATCH-PLUS.priceHypothesis` to a EUR 149 object in the JSON (valid JSON, no duplicate key) | **Rejected**: `FAIL json.editions` and `FAIL batch02.editions` — `RESULT: FAIL` |
| E | Set a SENSE module `directRemoteAlerts: true` and `watchDependency: "NONE"` | **Rejected**: `FAIL batch02.invariants` (2 failures) — `RESULT: FAIL` |

The same probes A and B **passed** the validator at the turn-1 snapshot; they are the BLK-01 evidence. Probes D and E exercise the corrected edition/asset and module-dependency invariants.

### 4.4 Copy and claim checks

- Six copy files: exactly **24 numbered headings** each; ES and EN structures match; 251/253/258 lines respectively (ES/EN equal per family).
- Mandated disclaimers: **12 of 12 instances verbatim** against `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9 / README §16 (PILOT supervised + navigation ×2 languages; SENSE navigation + limitation ×2; WATCH navigation + limitation ×2; brand attribution in all six). Mechanical normalised comparison: all match.
- Adversarial prohibition scan over all batch-02 dossiers/annexes/copy (307 term hits reviewed for autonomy, certification, collision avoidance, remote helm, theft prevention, distress service, unlimited connectivity, guaranteed/immediate delivery, stock/availability and `®`/`™`): no affirmative prohibited claim found; all hits are prohibitions, limitations or records of absence.
- Price figures found in the batch-02 set are exactly the four permitted hypotheses, the two explicitly labelled bundle-context figures, and dated external comparator prices; no figure appears in any copy.

---

## 5. Residual open blockers (external; unchanged by MC-06)

These are not defects of MC-06; they are the reasons a definition PASS is not a release. None was cleared by this milestone.

| Blocker | State after MC-06 | Effect |
| --- | --- | --- |
| Trademark / brand clearance | `X-01`, `BRAND_CLEARANCE = NOT_GRANTED` | MAREA is a proposed brand; no `®`/`™`, no publication |
| OPEN-MARINE ownership / software IP | `L-01`–`L-03`, `SOURCE_IP_CLEARANCE = NOT_CLEARED`; DEC-01 undecided | No inbound reuse right, no assignment, no outbound licence |
| PILOT safety | `PILOT_SAFETY_GATE = BLOCKED` (H-01, P-04); E-stop/motor-isolation/rudder `NOT_FOUND`; sea trials `NOT_PERFORMED`; H-02 (unauthenticated control plane), H-10 (no hardware watchdog/relay/end-stop), H-03 (contradictory motor link) | PILOT may not be sold, pre-sold, quoted, installed or used; no safety claim |
| SENSE measurement | `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED`, `SENSE_INGRESS_PROTECTION = NOT_VERIFIED`, `SENSE_NMEA2000 = NOT_IMPLEMENTED` (P-05, H-05, H-04) | No accuracy, range, IP rating, alarm or NMEA 2000 claim |
| WATCH implementation / connectivity | `WATCH_INGESTION = NOT_VERIFIED`; pipeline/identity/subscription/connectivity `NOT_FOUND` (P-06, H-12); delivery unmeasured | No delivery, coverage, identity, transfer or subscription claim |
| Hardware certification / conformity | `H-06`/H-13: no CE/EMC/RED/LVD/GPSR/RoHS/WEEE/CRA assessment, no DoC, no CRA vulnerability process | No market placement; no conformity claim |
| Supplier / BOM / unit economics | `H-05`, `H-07`, `H-11`, `X-05`, `X-06`: no BOM, quotes, supplier terms, channel terms or willingness-to-pay evidence | No price approval, no margin, no launch |
| Imagery | `X-03` open; 30 requirements remain `CONCEPT`; 12 `BLOCKED_ON_IMAGE_GENERATION`; no image file exists | No visual asset may be generated, substituted or published |
| Product release / operations | `X-02` (seller legal identity absent), `X-04` (release governance), no stock, fulfilment, installer network, support contract, warranty terms or approved SKU; claims register empty | Nothing is orderable, quotable, publishable or "available" |

---

## 6. What MC-06 does not prove (explicit non-conclusions)

1. **PILOT is not safe to install or operate.** No bench test, HIL run, independent review, supervised sea trial or conformity assessment exists. The physical E-stop, independent motor-power isolation and rudder feedback have no evidence (`NOT_FOUND`). The safety gate is `BLOCKED`, and the safety case is an outline written by an AI agent that states it cannot be signed.
2. **SENSE accuracy is not measured.** The only executed SENSE evidence is parser/IMU unit tests; no sensor hardware, reference equipment, calibration record, field accuracy or ingress test exists. A unit-tested parser is not sensor accuracy.
3. **WATCH delivery is not characterised.** Ingestion is `NOT_VERIFIED`; the notification pipeline, device identity, subscription service and connectivity contract are `NOT_FOUND`. No measured latency, delivery rate, acknowledgement rate or coverage exists; provider acceptance is still not delivery and delivery is still not acknowledgement.
4. **No certification, conformity or approval.** No CE marking, EU declaration of conformity, EMC/RED/LVD/GPSR/RoHS/WEEE/CRA evidence, type approval, class certificate, NMEA 2000 licence/certification, radio approval or installer certification exists.
5. **No brand or IP clearance.** MAREA is a proposed brand without trademark clearance; the source software has no documented inbound licence or assignment; the claims register is empty.
6. **Nothing is sellable, orderable, quotable, priced, in stock or available.** No approved price list, BOM, supplier quote, channel terms, legal identity, fulfilment, support contract, warranty terms, warranty period or delivery date exists; all four figures are internal hypotheses only.
7. **No hardware, manufacturing, connectivity or service exists.** No unit was built, no firmware was flashed, no image was generated, no vessel was used, no connectivity service was contracted and no alert was sent.
8. **This review does not re-verify external sources.** D6's comparator prices and the safety case's EU/ISO scope citations are dated `VERIFIED_EXTERNAL` observations; they must be re-checked before reuse and are not MAREA evidence.
9. **A definition PASS is not a commercial release.** PASS applies only to the completeness, honesty, traceability and internal consistency of the three product definitions on this commit. Every external blocker in §5 remains open and every product remains `DEFINED` / `NOT_FOR_SALE`.

---

## 7. Final verdict

**PASS — product-definition scope only.**

The verdict rests on: (a) the frozen commit `45925064a7710c666320b5a569b2cae5c57eb2f5` being the reviewed state; (b) all six required gates green on that state (`38/38` validator checks, `77/77` unit tests, Prettier, brand `21/21`, brand unit `13/13`, clean `git diff --check`); (c) all seven turn-1 findings fixed and re-verified, including independent adversarial probes that now reject the prohibited mutations; (d) the 24 review questions answered with evidence in §2; (e) the explicit non-conclusions in §6 and the open blockers in §5.

The verdict does **not** exceed the product-definition scope: MAREA PILOT remains `DEFINED` with a `BLOCKED` safety gate and is not safe to install; MAREA SENSE remains unmeasured; MAREA WATCH remains unimplemented and its delivery uncharacterised; MAREA is a proposed brand; no price is approved; nothing is for sale. Any later revision of these files invalidates this review until the gates and the affected claims are re-checked.

---

## 8. Independence and document status

- The reviewer is not an author of any MC-06 deliverable and did not edit any of them. The only file written by the reviewer is this `MC-06-REVIEW.md` file.
- No Git write command was executed by the reviewer (no commit, checkout, stash, push or reset).
- This review is `INTERNAL ONLY` and is not a certificate, approval, release note or legal opinion.
- Related: `docs/marea/products/README.md` (§1–§23), `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` (§4–§9), `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`, `docs/marea/execution/DECISION-LOG.md` (D-007–D-011).
