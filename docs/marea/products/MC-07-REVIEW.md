# MC-07 — Independent review of the MAREA DISPLAY / WEATHER / FLEET product definitions

| Field | Value |
| --- | --- |
| Document ID | MC-07 / INDEPENDENT-REVIEW |
| Milestone | MC-07 (Master Prompt 07/36) — product-definition batch 3 |
| Reviewer | `product-reviewer` (AGENT G) — Independent Product Quality Auditor; author of no MC-07 deliverable |
| Review state | **PHASE A COMPLETE — PENDING PHASE B. No verdict is expressed by this document.** |
| Baseline commit | `7867409066e83e4b432476903e61f5ebdcc1b554` (MC-06 HEAD) on `feature/marea-mc07-display-weather-fleet-products` |
| Audit target | the single MC-07 commit on `feature/marea-mc07-display-weather-fleet-products` (exact SHA supplied by the Lead); audit the **committed tree** and `git diff 7867409..<SHA>`, not the working tree |
| Baseline date | 2026-10-30 |
| Review scope | authoritative batch-03 deliverable set (§0.1): three dossiers, three annexes, the nine-product ecosystem overview, five supporting commercial/integration/asset documents, six copy files, machine contract, validator plus negative tests, delivery record, governance edits, and the real diff against MC-06 HEAD |
| Commercial release status | BLOCKED — all nine products `DEFINED` / `NOT_FOR_SALE` / `INTERNAL_ONLY`; publication `BLOCKED`; trademark `NOT_GRANTED`; OPEN-MARINE rights `NOT_CLEARED`; image generation `BLOCKED` (unchanged by any review) |
| Files written by this reviewer | this file only |

This document is a working audit framework. It records (a) the independent method, (b) the pre-MC-07
baseline evidence captured on the current branch before any batch-03 deliverable was audited, and (c) the
full checklist the reviewer will execute once the Lead supplies the MC-07 commit SHA. No deliverable has
been audited yet, so no PASS / PARTIAL / BLOCKED / FAIL verdict is stated, implied or pre-announced here.
Section 7 is intentionally `PENDING`.

---

## 0. Document state and audit phases

| Phase | Trigger | Content | State |
| --- | --- | --- | --- |
| A — baseline and framework | reviewer started (this turn) | read the binding brief and batch-02 precedent; capture pre-MC-07 baseline; write this framework | **DONE** |
| B — independent audit | Lead supplies the MC-07 commit SHA; all deliverables committed and the tree clean | read every batch-03 artifact at that commit and the real `git diff 7867409..<SHA>`; re-run validator, negative tests and repository gates; adversarial mutations; record findings | not started |
| C — verdict | Phase B complete | per-area evidence table; defect register; residual blockers; PASS / PARTIAL / BLOCKED / FAIL | not started |

### 0.1 Authoritative deliverable set (confirmed by the Lead)

Phase B audits the **committed** set below at the Lead-supplied MC-07 commit; no untracked file is part of the
deliverable. Each item receives its own evidence row and line count; each cross-reference must resolve.

| # | Deliverable | Role in the audit |
| ---: | --- | --- |
| 1 | `MAREA-DISPLAY-COMMERCIAL-SPEC.md`, `MAREA-WEATHER-COMMERCIAL-SPEC.md`, `MAREA-FLEET-COMMERCIAL-SPEC.md` | product dossiers: F01–F24 each |
| 2 | `DISPLAY-HARDWARE-AND-INTERACTION-REQUIREMENTS.md` | DISPLAY hardware/engineering annex |
| 3 | `WEATHER-DATA-RIGHTS-AND-FORECAST-CONTRACT.md` | WEATHER provider-rights, forecast-provenance and entitlement annex |
| 4 | `FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md` | FLEET tenancy, authorization, privacy and audit annex |
| 5 | `MAREA-NINE-PRODUCT-ECOSYSTEM.md` | nine-product overview: portfolio coherence and cross-family boundaries |
| 6 | `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` | editions and inclusion/exclusion authority |
| 7 | `PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` | integration status and authority matrix |
| 8 | `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` | price hypotheses and channel/cost framework |
| 9 | `CUSTOMER-JOURNEYS-DISPLAY-WEATHER-FLEET.md` | 17-stage journeys and failure/acceptance evidence |
| 10 | `PRODUCT-ASSET-REQUIREMENTS-BATCH-03.md` (D9) | 30-asset plan and status partition |
| 11 | `copy/{display,weather,fleet}.{es,en}.md` | six bilingual copy files |
| 12 | `product-definitions.batch-03.json` | machine contract |
| 13 | `scripts/check-marea-products.mjs`, `scripts/check-marea-products.test.mjs` | validator extension and negative tests |
| 14 | `MC-07-DELIVERY.md` | delivery record (read, never accepted as evidence of behaviour) |
| 15 | `MC-07-REVIEW.md` | this independent review |
| 16 | governance edits: `README.md`, `docs/marea/execution/MASTER-PROMPT-REGISTRY.md`, `docs/marea/execution/DECISION-LOG.md` | conventions/decisions consistency with batch 03 |
| 17 | the single MC-07 commit | audit `git diff 7867409..<SHA>`; committed tree, clean `git status` |

Rules the reviewer binds itself to: no Git write command (read-only `git status` / `git log` / `git diff` /
`git show` only); no edit of any deliverable; no `src/`, `public/`, OPEN-MARINE or external service touched;
no image generation, no chargeable API, no purchase, no publication; no review of the delivery summary as
substitute for the artifact.

---

## 1. Independence, method and vocabulary

### 1.1 Independence

- The reviewer authored none of the batch-03 deliverables and did not contribute text to them. The only file
  this reviewer writes is `docs/marea/products/MC-07-REVIEW.md`.
- The review is performed after the authors finish; a summary is never accepted as evidence. Every claim is
  checked against a file, a command output or an explicitly classified external observation.
- A definition PASS is never a release, certification, stock, availability or legal statement.

### 1.2 Method (executed in Phase B)

1. Freeze the state at the Lead-supplied MC-07 commit SHA (never the working tree): record `git rev-parse HEAD`,
   `git status --porcelain` (must be empty — all deliverables committed), `git log --oneline -3`, the full
   `git diff --stat 7867409..<SHA>` and `git show --name-only <SHA>`; confirm no untracked/modified file remains
   and no path outside the authored set changed.
2. Read the actual artifacts, not the delivery notes: the three dossiers, the three annexes, the nine-product
   ecosystem overview, six copy files, batch-03 JSON, editions/compatibility/pricing/journeys/asset documents,
   and the governance edits; read the `README` addendum and `DECISION-LOG` entries the Lead added.
3. Re-run the repository gates and the batch validator/negative tests myself (§5).
4. Independently probe the validator with throwaway `--root` copies of `docs/marea` (no repository edits): each
   prohibited mutation must be rejected by the real CLI.
5. Classify each reviewed claim as `VERIFIED` / `PARTIAL` / `NOT VERIFIED` / `BLOCKED` against the evidence classes
   of `docs/marea/products/README.md` §5, and label every defect with a severity, `file:line` (or command
   evidence), why it matters and the required correction.
6. Distinguish pre-existing failures from batch-03 regressions; both are reported.
7. Check that the frozen batch-03 values of the MC-07 brief (identities, editions, prices, readiness, blockers,
   integration statuses, entitlements, tenancy, asset partition, claim restrictions, machine contract) agree
   across every document.
8. Issue the verdict only when every area in §4 has an evidence row and every blocking defect is resolved or
   explicitly recorded as an external blocker.

### 1.3 Evidence classes (from README §5 — cannot be upgraded by this review)

| Class | Meaning |
| --- | --- |
| `VERIFIED_REPO` | verifiable in this repository's files (path cited) |
| `VERIFIED_EXTERNAL` | verifiable at a cited public source with a check date |
| `ASSUMPTION` | explicit planning assumption, stated as such |
| `HYPOTHESIS` | commercial/price assumption awaiting approval |
| `OPEN` | fact not established; intended customer experience still specified |
| `BLOCKED` | external condition (licence, certificate, quote, measurement, rights) prevents closure |

### 1.4 Severity vocabulary

| Severity | Meaning |
| --- | --- |
| **BLOCKING** | a false customer claim, an approved/purchasable state, a missing required deliverable or field, a prohibited price/claim, a dead negative test, or a gate regression caused by MC-07. Prevents PASS. |
| **MAJOR** | a substantive contradiction or missing evidence in a required area that makes a claim unverifiable or misstates the offer; does not by itself create a false sale but must be fixed. |
| **MINOR** | wording, consistency, coverage or process defect with no false customer-facing fact and no sale/publication effect. |
| **OBSERVATION** | residual limitation, accepted debt or out-of-scope issue recorded for transparency. |

### 1.5 Verdict rules

- **PASS** — every required area in §4 is evidenced, all repo gates pass on the frozen state, the validator and
  negative tests reject the prohibited mutations, no blocking defect remains, and the diff is within the
  authorised internal scope.
- **PARTIAL** — the definition work is committed and evidenced, but at least one criterion is blocked by a
  concrete external condition (e.g. a required external source cannot be verified); no false claim or gate
  regression is present.
- **BLOCKED** — the audit cannot be completed because of an external unblock (missing credentials, legal
  clearance, hardware, network, or the Lead's artifacts not being complete/frozen). Documentation alone never
  PASSes a functionality, physical, financial or legal milestone.
- **FAIL** — a required behaviour or quality gate is violated (false claim, prohibited state, missing field,
  dead negative test, unauthorised side effect).

---

## 2. Pre-MC-07 baseline evidence (captured before any batch-03 audit)

### 2.1 Environment and repository state

| Item | Value |
| --- | --- |
| Working directory | `C:\Users\Admin\Documents\workspace\embarcarte` |
| Branch | `feature/marea-mc07-display-weather-fleet-products` |
| HEAD | `7867409066e83e4b432476903e61f5ebdcc1b554` — `docs(mc06): delivery record, independent review PASS and registry update` (2026-10-30 20:51:16 +0100) |
| HEAD ancestry | MC-06 delivery commit; its parent `4592506` is the frozen MC-06 definition commit; MC-05 closing commit `906f74b` precedes it |
| Node.js | v24.18.0 |
| Git | 2.38.0.windows.1 |
| Batch-03 validator support at baseline | the batch validator is the MC-05/MC-06 build: contracts `1.0.0 / 1.0.0`, **6 products**, 33 scoped files; it contains **no batch-03 checks** yet |

### 2.2 Commands run and exact results

All commands were run by the reviewer from the repository root on the branch and commit above.

| # | Command | Exit | Result (exact) |
| ---: | --- | ---: | --- |
| 1 | `git log --oneline -3` | 0 | `7867409 docs(mc06): delivery record, independent review PASS and registry update`; `4592506 docs(mc06): complete commercial definitions for MAREA PILOT, SENSE and WATCH`; `906f74b docs(mc05): finalise independent-review addendum at the closing commit` |
| 2 | `git status --porcelain` | 0 | four untracked paths, no tracked modification: `?? tmp-introspect.mjs`, `?? tmp-introspect.txt`, `?? tmp-mc04.mjs`, `?? tmp-mc04.txt` |
| 3 | `node scripts/check-marea-products.mjs` | 0 | `Summary: 38 checks run, 38 passed, 0 failed; 33 of 33 scoped files read.` / `RESULT: PASS`; contracts `1.0.0 / 1.0.0`; `PASS json.products — 6 products`; `PASS json.traceability — 555 evidence references resolved` |
| 4 | `node --test scripts/check-marea-products.test.mjs` | 0 | `tests 77`, `pass 77`, `fail 0`, `cancelled 0`, `skipped 0`, `todo 0` (`duration_ms 63686.1`) |
| 5 | `git diff --stat` | 0 | empty output — no tracked file modified at first capture |
| 6 | `node --version` / `git --version` | 0 | `v24.18.0` / `git version 2.38.0.windows.1` |
| 7 | `node -e "require('./package.json').scripts"` | 0 | `test:products` and `test:products:unit` exist and point at the validator/test pair; `format:check` covers the repository script list incl. `check-marea-products.mjs` and `check-marea-products.test.mjs` (MC-06 correction) |

PowerShell printed a repeated `InvalidOperation: No se puede crear el tipo...` on stderr in every pwsh
invocation. It is environment/profile noise under the shell's language mode: it did not change an exit code
(all gates exited 0) and is recorded here so it is not mistaken for a test failure.

### 2.3 Baseline conclusions

- At the MC-07 starting point, batches 01 and 02 are **green**: 38/38 validator checks and 77/77 negative tests,
  exit 0, on HEAD `7867409`. This is the regression reference for Phase B: a batch-03 PASS must keep every
  baseline check and test passing and may only add checks/tests, never remove or weaken them.
- Batch-03 artifacts were **absent** at the start of Phase A: no `docs/marea/products/MC-07*` file, no
  `product-definitions.batch-03.json`, no `copy/display.*`, `copy/weather.*` or `copy/fleet.*` existed; the
  validator reported 6 products and only the batch-01/02 contracts.
- Work by other agents began concurrently with Phase A. A later `git status --porcelain` (about 21:33
  local) showed a fifth untracked path — `?? docs/marea/products/PRODUCT-ASSET-REQUIREMENTS-BATCH-03.md`
  (mtime 21:33:52) — while the four `tmp-*` files were unchanged. The Lead has since confirmed that the four
  `tmp-*` files were his own temporary inspection scripts and that they have been deleted; they were never
  MC-07 deliverables. Batch-03 files were still uncommitted at Phase A and are not audited here.
- Phase B audits only the Lead-supplied MC-07 commit: the committed tree must be clean (`git status --porcelain`
  empty) and every deliverable in §0.1 must be in it. Untracked working-tree files are outside the audit target
  and, if any remain, are recorded as a process finding rather than audited as deliverables.
- No untracked file existed in the MC-06 commit; the baseline gate results above are unaffected (the validator
  scopes only its fixed file list).

---

## 3. Frozen expectations register (from the binding MC-07 brief)

Phase B enforces these exact values; any document that disagrees fails the relevant area.

### 3.1 Product identity and status

| id | display name | type | lifecycle | availability | publication |
| --- | --- | --- | --- | --- | --- |
| `DISPLAY` | MAREA DISPLAY | `HARDWARE_SOFTWARE` | `DEFINED` | `NOT_FOR_SALE` | `INTERNAL_ONLY` |
| `WEATHER` | MAREA WEATHER | `SOFTWARE` | `DEFINED` | `NOT_FOR_SALE` | `INTERNAL_ONLY` |
| `FLEET` | MAREA FLEET | `SOFTWARE` | `DEFINED` | `NOT_FOR_SALE` | `INTERNAL_ONLY` |

All nine MAREA products stay `DEFINED` / `NOT_FOR_SALE` / `INTERNAL_ONLY`; publication `BLOCKED`.

### 3.2 Editions and price hypotheses (exact ids, names, amounts)

| edition id | display name | amount | period / basis | state | boundary |
| --- | --- | ---: | --- | --- | --- |
| `DISPLAY-7` | MAREA DISPLAY 7 | 699 | `ONE_OFF`, `VAT_INCLUDED_CONSUMER_RETAIL_HYPOTHESIS` | `HYPOTHESIS_UNAPPROVED` | 7-inch-class working designation; size not frozen; not an inclusive quotation; installation quoted separately |
| `DISPLAY-LARGE-CONDITIONAL` | MAREA DISPLAY Large (conditional) | — | — | `NOT_ESTABLISHED`, `CONDITIONAL` | future 10/12-inch family; `SIZE_NOT_FROZEN`, `HARDWARE_NOT_SELECTED`; never with measured size or price |
| `WEATHER-STANDARD` | MAREA WEATHER Standard | 49 | `YEAR`, consumer subscription | `HYPOTHESIS_UNAPPROVED` | standalone; coverage limited to licensed sources and declared area/horizon |
| `WEATHER-PRO` | MAREA WEATHER Pro | 89 | `YEAR`, consumer subscription | `HYPOTHESIS_UNAPPROVED` | multi-model comparison, advanced layers, route context, alerts; conditional on provider entitlements |
| `FLEET-START` | MAREA FLEET Start | 49 | `MONTH` per vessel, VAT excluded | `HYPOTHESIS_UNAPPROVED` | small operators; suggested 1–10 vessels; organisation fee not approved |
| `FLEET-BUSINESS` | MAREA FLEET Business | 79 | `MONTH` per vessel, VAT excluded | `HYPOTHESIS_UNAPPROVED` | richer permissions, workflows, reporting, integrations; suggested 11–50 vessels |
| `FLEET-ENTERPRISE` | MAREA FLEET Enterprise | — | contracted | `NOT_ESTABLISHED` | contracted service tier, not a standard checkout SKU; no fabricated SLA, no unlimited promises |

Additional frozen rules: FLEET pricing model must cover organisation fee (none in Start/Business hypothesis;
Enterprise negotiated), user seats (included, not per-seat, in Start/Business; Enterprise negotiated), onboarding
(separately quoted), telemetry/storage/API limits (explicit, never "unlimited"). No price in copy; every price
labelled hypothesis, not an offer, subject to provider rights, hardware cost, VAT and validation.

### 3.3 Readiness (nine dimensions, exact values)

All three: definition `COMPLETE_TARGET_SPECIFICATION`; engineering `NOT_VERIFIED`; licensing `NOT_CLEARED`;
dataRights `NOT_GRANTED`; compliance `NOT_STARTED`; pricing `HYPOTHESIS_UNAPPROVED`; brandPublication
`NOT_GRANTED`; availability `NOT_FOR_SALE`. Hardware: `DISPLAY = NOT_SELECTED`;
`WEATHER = FLEET = NOT_APPLICABLE_SOFTWARE_PRODUCT`.

### 3.4 Blocker ids (only these; never invented)

| Product | Frozen blocker ids |
| --- | --- |
| DISPLAY | `H-04 H-05 H-06 H-11 H-13 D-01 D-05 D-06 D-10 P-07 P-10 X-01 X-03 X-05 X-06 X-07` |
| WEATHER | `D-04 D-05 D-07 D-09 D-10 P-08 P-10 X-01 X-03 X-05 X-06` |
| FLEET | `D-09 D-10 H-12 H-13 P-09 P-10 X-01 X-03 X-05 X-06 X-07` |

### 3.5 Cross-product integration statuses (only `SUPPORTED` / `CONDITIONAL` / `PLANNED` / `UNKNOWN` / `BLOCKED`)

DISPLAY: HUB `CONDITIONAL`; NAV `PLANNED`; AIS `CONDITIONAL`; WEATHER `CONDITIONAL`; SENSE `CONDITIONAL`;
PILOT `UNKNOWN` (status/monitoring only, never steering authority); WATCH `UNKNOWN`.
WEATHER: NAV `PLANNED` (entitlement sharing); FLEET `CONDITIONAL` (only if provider agreement permits B2B
operational use); DISPLAY `CONDITIONAL`; HUB `CONDITIONAL`.
FLEET: WATCH `CONDITIONAL` read-only telemetry/alerts; HUB `CONDITIONAL` read-only installation/telemetry
health; SENSE `UNKNOWN`; PILOT `BLOCKED` for any control (at most read-only status after engineering/privacy
review); NAV `PLANNED` only with explicit customer permission; WEATHER `CONDITIONAL` per provider terms;
DISPLAY `UNKNOWN`; AIS `CONDITIONAL` read-only.

No integration may be `SUPPORTED` without recorded evidence.

### 3.6 WEATHER entitlement and FLEET tenancy freezes

- One customer account, one entitlement ledger; WEATHER may be bought standalone; NAV Pro may include
  WEATHER Standard-equivalent read access only where provider rights allow (`CONDITIONAL`); Standard → Pro
  prorated credit; the same entitlement never billed twice across NAV and WEATHER; cancelling NAV never deletes
  user-owned WEATHER records (read-only export for a defined window, hypothesis 30 days, legal review);
  provider-licence loss produces an honest "unavailable" state with attribution retained; an expired
  entitlement never renders a fabricated or frozen forecast as current; billing/entitlement services are not
  implemented in MC-07.
- FLEET: Organization → memberships → roles → vessel assignments; server-side authorization on every sensitive
  operation, never trusting a client-supplied tenant id; eight roles `ORGANIZATION_OWNER`, `ORGANIZATION_ADMIN`,
  `FLEET_MANAGER`, `MAINTENANCE_MANAGER`, `CREW_MEMBER`, `READ_ONLY_VIEWER`, `EXTERNAL_INSTALLER` (scoped,
  time-bound, vessel-level), `EMBARCARTE_SUPPORT` (explicitly scoped, audited, time-bound); organisation A can
  never read or modify B; removed members lose access immediately; external installer can never become org
  admin; exports/reports/search/cache/background jobs honour tenant scope; audit logs never leak cross-tenant
  data; vessel/device transfer authorised and auditable; support access documented and audited; telemetry
  read-only (no steering, motor or remote-control path); no fabricated uptime SLA — SLA figures only as
  contracted commitments with measurement evidence, otherwise `NO_SLA_ESTABLISHED`.

### 3.7 DISPLAY hardware boundary

Physical marine multifunction display: panel, compute module, storage, enclosure, mounting, power
conversion/protection, connectors, harness, dedicated operating environment, base software.
`SIZE_NOT_FROZEN`, `HARDWARE_NOT_SELECTED`, `BOM_NOT_ESTABLISHED`. Engineering targets labelled
`REQUIRED_TARGET` (sunlight legibility, night mode, thermal, ingress, vibration, EMC/RED applicability,
wet/glove input only if physically verified); MC-04 browser contrast evidence is design evidence only. PILOT on
DISPLAY = read-only status/alarms at most; no control head, no engagement, no remote/web authority. Base
included software = device OS, local dashboards, instrument/AIS/NAV presentation, configuration, backup,
updates during warranty; separate = charts (D-01), WEATHER entitlement, NAV subscription, HUB, AIS receiver,
adapters, extra mounts, installation labour.

### 3.8 Asset partition (must reconcile exactly)

30 ids (10 per product) with meanings `HERO`, `USE`, `OVR`, `EDN`, `ECO`, `INS`, `MOB`, `TMB`, `OG`, `TEC`.
Partition: 12 `BLOCKED_ON_IMAGE_GENERATION` (`HERO`, `USE`, `INS`, `TMB` per product); 15 `CONCEPT` reusing
existing MC-04 authored vectors/briefs (`OVR`, `EDN`, `ECO`, `OG`, `TEC`); 3 `CONCEPT` newly authored
specification (`MOB`). Totals: 30 planned; 15 reused; 3 authored; 12 blocked; 0 missing; 0 publicly approved.
No asset file created, no image generated. Only MC-04 reference ids that exist and match their real subject may
be cited.

### 3.9 Machine contract and invariants

Batch-03 JSON reuses the batch-02 schema exactly: same top-level meta keys plus `batch02Contract`;
`publicationControls` (`published:false`, `forSale:false`, `purchaseCtaAllowed:false`,
`pricesInCopyAllowed:false`, `pricesLabelled:"HYPOTHESIS_UNAPPROVED"`, `remoteSteeringAllowed:false`,
`certificationClaimAllowed:false`); `lifecycleVocabulary`; `readinessDimensions`; `evidenceClasses`;
`globalRestrictions`; `sourceDocuments`; `assets`; `products[]` with `id, displayName, type, lifecycleState,
readiness, availability, editions, fields` (24 keys → `{status, evidenceClass, summary, evidenceRefs,
ownerFunction, blockers, readinessDimension, readinessValue}`), `copy {es,en}`, `assets [{assetId}]`,
`mc02Blockers`; product invariants DISPLAY `screenSizesFrozen:false`, `hardwareSelected:false`,
`chartRightsGranted:false`, `pilotControlAuthority:false`; WEATHER `providerRightsGranted:false`,
`forecastAccuracyClaimed:false`, `redistributionAllowed:false`, `offlineAllowed:false`,
`navDoubleBillingAllowed:false`; FLEET `multiTenantProductionService:false`, `crossTenantAccessAllowed:false`,
`remoteSteeringAllowed:false`, `slaEstablished:false`, `customerProductionDataUsed:false`,
`securityCertificationClaimed:false`. Every `<FILE>#F01`-style evidenceRef must resolve to a dossier heading.

### 3.10 Claim restrictions (validator negative tests must reject violations)

DISPLAY: no measured screen size, brightness/nit figure, resolution-as-fact, IP rating, temperature range as
fact, "sunlight readable" claim, certified performance, "unlimited charts", PILOT control authority or
safety-system framing. WEATHER: forecasts are not guarantees; no accuracy percentages, "official warning
service", exclusive data rights, free-tier commercial rights, redistribution rights, offline rights; never a
forecast presented as observation; no coverage/resolution beyond the licence; never bill NAV + WEATHER twice.
FLEET: no fabricated SLA/uptime, "certified multi-tenant security", remote vessel control, guaranteed instant
alerts, unlimited vessels/users/storage/API, invented enterprise references, customer production data, or
cross-tenant read/modify. No `RELEASED`, `FOR_SALE`, `APPROVED`, `PUBLISHABLE`, `CERTIFIED` state for a product,
edition, price or feature; "certified" only inside an explicit non-assertion.

---

## 4. Audit checklist — 25 required review areas

Every area receives, in Phase B: a verdict (`PASS` / `PARTIAL` / `FAIL` / `BLOCKED`), the evidence class, the
exact file:line or command output, and any defect id. The checklist below is the enumeration in the reviewer's
assignment and covers master-prompt §23's required review areas; the Lead confirmed R01–R25 match the master
prompt's 25 areas closely enough and that coverage is identical, so R01–R25 are retained.

**Explicit additional coverage (confirmed by the Lead).** Phase B audits by name the three batch-03 annexes —
`DISPLAY-HARDWARE-AND-INTERACTION-REQUIREMENTS.md`, `WEATHER-DATA-RIGHTS-AND-FORECAST-CONTRACT.md`,
`FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md` — and the `MAREA-NINE-PRODUCT-ECOSYSTEM.md` overview. Their
findings are recorded under R09/R10 (WEATHER rights/forecast), R12/R13 (DISPLAY hardware and PILOT boundary),
R14–R17 (FLEET tenancy, privacy, WATCH, SaaS), R18 (assets) and R25 (ecosystem consistency); each annex and the
ecosystem overview also receives a line count, a structure check and a cross-reference resolution check.

### R01 — Three complete, distinguishable propositions and 72 field blocks
- **Question.** Do DISPLAY, WEATHER and FLEET each have F01–F24 with Definition / Evidence / Owner / Blockers /
  Commercial readiness, substantive (never heading-only), and is each proposition commercially distinct?
- **Method.** Count headings and labels per dossier; inspect every field for substance and an evidence class;
  count 24 fields per product in the JSON with all eight sub-keys; resolve every `evidenceRef`; check the
  three offers differ in capability and dependency (hardware+software device / consumer weather software /
  B2B fleet SaaS) and do not duplicate NAV/HUB/AIS/PILOT/SENSE/WATCH.
- **Status.** `PENDING` — not yet audited.

### R02 — Editions and their meaningful value differences
- **Question.** Are the seven frozen edition ids, display names, amounts, periods, bases and states reproduced
  exactly, with DISPLAY-LARGE-CONDITIONAL and FLEET-ENTERPRISE kept unpriced/non-checkout, and edition verdicts
  limited to the allowed vocabulary?
- **Method.** Compare every edition object and every dossier/editions-file/copy mention against §3.2; check
  `DISPLAY-7` starting-price wording and separate installation; WEATHER standalone subscription; FLEET per-vessel
  monthly model, organisation fee, seats, onboarding, explicit limits; no new edition/bundle; no figure outside
  the allow-list.
- **Status.** `PENDING`.

### R03 — Inclusions and exclusions (what the buyer would and would not receive)
- **Question.** Are included items and optional accessories explicit per product/edition, with charts, weather
  entitlements, NAV subscription, HUB, AIS receiver, adapters, mounts, connectivity and installation labour
  correctly excluded/separately priced?
- **Method.** Read F07/F08 plus copy included/excluded blocks and editions/compatibility tables; check DISPLAY
  base software vs separate data/services per §3.7; WEATHER entitlement boundaries; FLEET onboarding/telemetry
  limits; no item implied free, no "unlimited", no install labour inside a hardware hypothesis.
- **Status.** `PENDING`.

### R04 — Customer segmentation and problems
- **Question.** Are primary/secondary segments, buying contexts and problems specific to each product and
  distinct from the other six, without invented willingness-to-pay, customer counts, references or market
  research presented as fact?
- **Method.** Read F02/F03/F17 and matching copy sections; check evidence classes; confirm segment claims are
  `ASSUMPTION`/`HYPOTHESIS`/`OPEN` where not evidenced; no testimonial, logo, installed-base or survey claim.
- **Status.** `PENDING`.

### R05 — Price hypotheses and pricing/channel model
- **Question.** Is every figure an unapproved hypothesis, absent from customer copy and purchasable surfaces,
  and does the pricing/channel model avoid computed margins and invented BOM/channel terms?
- **Method.** Scan all batch-03 files for currency figures and compare against §3.2 allow-list; check
  `HYPOTHESIS_UNAPPROVED` context per figure (not merely line-level negation); check the pricing document's
  symbolic-input discipline and that every cost input is `OPEN`/`BLOCKED`; confirm no figure in copy; confirm
  no checkout/catalogue/price data touched.
- **Status.** `PENDING`.

### R06 — Competitor evidence and external-source discipline
- **Question.** Are competitor alternatives named with verifiable, dated evidence classified
  `VERIFIED_EXTERNAL`, used as context and never as MAREA performance evidence; are no market-share or
  benchmark claims invented?
- **Method.** Open the competitor table(s); check URL, access date, quoted figure/feature and that the cited
  external observation matches what it is used for; spot-check a sample with `web_fetch` where the milestone
  requires it; check no external claim is upgraded into a MAREA capability or price anchor presented as fact.
- **Status.** `PENDING`.

### R07 — Customer journeys
- **Question.** Do the 17 MC-05 stages appear in order for each product, with action/touchpoint/expected
  result/required information/failure mode/recovery/commercial opportunity/trust-safety requirement/acceptance
  evidence, plus cross-product, failure/recovery, trust and gap registers and acceptance ids?
- **Method.** Count stages and columns; check the stage wording is the frozen list; check every failure has a
  recovery; check journey touchpoints exist or are explicitly `OPEN`; check cross-product journeys respect the
  integration statuses and safety boundaries of §3.5/§3.6.
- **Status.** `PENDING`.

### R08 — Bilingual customer copy (ES/EN)
- **Question.** Do the six copy files have the exact 24 numbered headings from `copy/nav.*`, no `###`
  subheadings, a verbatim approved-disclaimer final section, true ES/EN counterparts, natural Spain Spanish /
  international English, no currency, no purchase CTA, no stock/launch/certification/review claim, product names
  untranslated, and the exact internal status line?
- **Method.** Mechanical heading extraction and ES/EN structure comparison; disclaimer verbatim comparison
  against `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9; currency/CTA/stock/availability/certification scan with
  adversarial review of each hit; read both languages for naturalness and factual parity; check the product's
  mandated limitation statements (forecast not guarantee; tenancy/privacy; DISPLAY hardware non-claims).
- **Status.** `PENDING`.

### R09 — Provider rights and data licensing
- **Question.** Are chart, weather, AIS-derived, position-derived and B2B data rights correctly `NOT_GRANTED` /
  `NOT_CLEARED`, with every dependent feature conditional and no free-tier, redistribution, offline or
  exclusive-rights claim?
- **Method.** Check blocker ids per product (§3.4), readiness and `globalRestrictions`; read provider/data
  sections and copy; verify no integration is `SUPPORTED` on unlicensed data; verify attribution-retention and
  honest "unavailable" states; check OPEN-MARINE is not used as a rights source.
- **Status.** `PENDING`.

### R10 — Forecast provenance and honesty (WEATHER)
- **Question.** Is forecast provenance explicit (provider/source and licence), are forecasts never presented as
  observations or guarantees, and are accuracy, official-warning, coverage, resolution, offline and
  redistribution claims absent?
- **Method.** Read WEATHER dossier fields/§s, copy and contract flags; check observation vs forecast vs model
  output vocabulary; check "no accuracy percentage" and no official-warning-service claim; check timestamps,
  freshness, expiry and licence-loss "unavailable" behaviour; check attribution retained and no frozen forecast
  shown as current.
- **Status.** `PENDING`.

### R11 — NAV / WEATHER entitlement model
- **Question.** Do all documents agree on the single account/entitlement ledger, standalone WEATHER, conditional
  NAV Pro read access, proration, no double billing, NAV cancellation export window and no fabricated forecast
  after entitlement loss, and is the model clearly unimplemented?
- **Method.** Compare WEATHER dossier F12, pricing model, compatibility, journeys, copy, JSON and any entitlement
  annex line by line against §3.6; search for double-billing, proration and export wording conflicts; confirm
  billing/entitlement services are stated `NOT` implemented, never implied live.
- **Status.** `PENDING`.

### R12 — DISPLAY hardware boundary
- **Question.** Is DISPLAY specified as an intended physical device with `SIZE_NOT_FROZEN`,
  `HARDWARE_NOT_SELECTED`, `BOM_NOT_ESTABLISHED`, engineering targets labelled `REQUIRED_TARGET`, no measured
  size/nits/resolution/IP/temperature claim, and correct included-vs-separate software/data boundary?
- **Method.** Read DISPLAY dossier hardware/engineering/warranty sections, editions, asset plan and copy; scan for
  measured physical figures and certification claims; verify MC-04 contrast evidence is described as design
  evidence only; verify the base/separate software split of §3.7.
- **Status.** `PENDING`.

### R13 — DISPLAY / PILOT safety boundary
- **Question.** Is PILOT on DISPLAY limited to read-only status/alarms at most, with no control head, no
  engagement, no remote/web steering authority and no steering path anywhere in dossiers, JSON, compatibility
  or assets?
- **Method.** Adversarial scan across all batch-03 files and the JSON for control/steer/engage/helm/autopilot
  terms; check every hit is a prohibition or explicit absence; verify the compatibility row is `UNKNOWN` and the
  data direction is read-only; check asset briefs do not depict control authority.
- **Status.** `PENDING`.

### R14 — FLEET tenant isolation and authorization
- **Question.** Is the organization → membership → role → vessel model complete, server-side authorized, with
  the eight frozen roles, immediate revocation, no client-supplied tenant trust, scoped/time-bound external
  installer and support access, tenant-scoped exports/reports/search/cache/jobs/audit logs, auditable transfer,
  and read-only telemetry?
- **Method.** Read FLEET dossier tenancy/security sections and any tenancy contract; check each of the frozen
  isolation guarantees appears as a stated design requirement with an evidence class (design requirement, not
  tested behaviour); check all eight role names and scopes; scan for remote-control/steering and cross-tenant
  read/write; verify JSON `crossTenantAccessAllowed:false`, `remoteSteeringAllowed:false`.
- **Status.** `PENDING`.

### R15 — FLEET privacy and data protection
- **Question.** Are location/telemetry/vessel/crew personal data handled with minimisation, lawful basis,
  retention/deletion/export, DPIA/DPO review, audit and breach-notification items explicitly `OPEN`; is
  customer production data excluded?
- **Method.** Read FLEET privacy sections, compatibility, journeys and copy; check no legal-basis, retention
  period, DPIA completion or certification is asserted as done; verify "position not public by default" and
  consent/role-scoped sharing; check JSON `customerProductionDataUsed:false`; compare with WATCH privacy
  contract precedent without importing its unimplemented service claims.
- **Status.** `PENDING`.

### R16 — FLEET versus WATCH
- **Question.** Is FLEET clearly a multi-vessel B2B platform consuming WATCH read-only telemetry/alerts, without
  claiming WATCH's unimplemented delivery pipeline as live and without turning WATCH into a fleet platform?
- **Method.** Compare the frozen FLEET-WATCH `CONDITIONAL` row, WATCH limits (ingestion `NOT_VERIFIED`; pipeline,
  identity, subscription, connectivity `NOT_FOUND`) and FLEET's evidence state; check copy and journeys do not
  promise instant/guaranteed alerts or imply a production integration; check no duplicated platform claim.
- **Status.** `PENDING`.

### R17 — FLEET SaaS model versus package/enterprise tier
- **Question.** Is FLEET modelled as a per-vessel subscription software service with a contracted Enterprise tier
  (not a checkout SKU), no fabricated SLA/uptime, no "certified multi-tenant security", no unlimited promises,
  and with onboarding/telemetry/storage/API limits explicit?
- **Method.** Read FLEET pricing/editions/contract; check organisation fee, seats, onboarding and limits against
  §3.2; search for SLA/uptime/nines/99.x/24×7/certified-security/unlimited; check `slaEstablished:false` and that
  any SLA phrasing is `NO_SLA_ESTABLISHED` or a contracted-commitment requirement; confirm Enterprise is quoted,
  not purchasable.
- **Status.** `PENDING`.

### R18 — Visual asset plan (30 requirements)
- **Question.** Are the 30 asset ids exact (10 per product, correct suffixes), the status partition exactly
  12/15/3 with totals 30 planned / 15 reused / 3 authored / 12 blocked / 0 missing / 0 publicly approved, MC-04
  ids existing and matching their real subject, bilingual alt text, and no asset file created?
- **Method.** Read the batch-03 asset document and JSON asset entries; count ids and statuses; cross-check D9's
  totals against the batch-03 JSON and against the validator's asset check (counts and statuses), reporting any
  inconsistency between the three as a finding; resolve every cited `MR-*` id in `MC-04-ASSETS.yaml` /
  `MC-04-BRIEFS.yaml` and check its subject; scan for any image file added to the tree; verify `CONCEPT` never
  claims a real device and `BLOCKED_ON_IMAGE_GENERATION` is not upgraded.
- **Status.** `PENDING`.

### R19 — Machine contract (batch-03 JSON)
- **Question.** Does `product-definitions.batch-03.json` reuse the batch-02 schema exactly, contain the three
  products with 72 complete field objects and the frozen product invariants, keep `publicationControls` all
  false, and resolve every evidenceRef to an existing dossier heading?
- **Method.** Parse the JSON; diff schema key sets against batch-02; validate 3 products × 24 fields × 8
  sub-keys; check every boolean invariant and `mc02Blockers`; resolve every `<FILE>#Fxx` reference; check no
  purchasable/sku/stock/orderable keys; check copy paths exist; confirm the validator's new checks read it.
- **Status.** `PENDING`.

### R20 — Validator extension and negative tests
- **Question.** Does the validator add batch-03 checks and mutation tests that actually fail when each frozen
  rule is broken, without weakening or deleting the batch-01/02 checks and without broadening the negative-
  context tolerance?
- **Method.** Run the validator and tests; inspect the new check list and test names; run independent
  throwaway-root probes: forbidden DISPLAY size/nit claim; PILOT control claim; WEATHER accuracy/exclusivity
  claim; FLEET fake SLA/unlimited/cross-tenant claim; price outside the allow-list; edition/pricing drift;
  asset status drift; JSON invariant flip; broken evidenceRef; prohibited lifecycle/availability state; copy
  price/CTA. Each must produce `RESULT: FAIL` and a non-zero exit. Also diff the existing checks/tests for
  deletions or relaxed assertions.
- **Status.** `PENDING`.

### R21 — Batch-01/02 regression and repository gates
- **Question.** Do the 38 baseline checks and 77 baseline tests still pass unchanged, do the repository gates
  stay green, and is there no regression caused by batch 03?
- **Method.** Re-run the baseline commands from §2.2 on the frozen state and compare counts and check names;
  run `npm run test:products`, `test:products:unit`, `format:check`, `test:brand`, `test:brand:unit`,
  `test:i18n`, `test:commerce`, `test:seo`, `test:backup`, `npm run build`, `npm run test:e2e`; report
  every command with exit code and tail, and mark any un-runnable gate `BLOCKED` with the exact cause (never
  PASS a test that was not run).
- **Status.** baseline recorded in §2.2; batch-03 re-run `PENDING`.

### R22 — IP, trademark and claim gates
- **Question.** Are the trademark and source-IP positions unchanged (`NOT_GRANTED` / `NOT_CLEARED`), is MAREA
  still presented as a proposed brand with no `®`/`™`, and are the per-product claim restrictions enforced?
- **Method.** Scan all batch-03 artifacts and JSON for `®`/`™`, certification claims (CE/EMC/RED/NMEA 2000/IP/
  sunlight/nit), approval/clearance upgrades and "certified" outside a non-assertion; check `globalRestrictions`;
  run `npm run test:brand`; confirm no OPEN-MARINE change and no brand-adoption change.
- **Status.** `PENDING`.

### R23 — No publication and no sale
- **Question.** Do all nine products remain `DEFINED` / `NOT_FOR_SALE` / `INTERNAL_ONLY`, with publication
  `BLOCKED`, no purchasable state, no price as an offer, no purchase CTA, no stock/availability/launch claim,
  and all `publicationControls` false?
- **Method.** Check lifecycle/availability/readiness across dossiers, copy, JSON and validator output; check
  publicationControls and claim restrictions; scan for purchase CTAs, "available", stock, lead time, launch
  date and orderable wording; confirm no commerce/catalogue/checkout file was touched.
- **Status.** `PENDING`.

### R24 — No side effects and authorised diff scope
- **Question.** Is the diff limited to the authorised internal documentation/validator files, with no `src/`,
  `public/`, `e2e/`, `.github/`, package dependency, payment, route, price, OPEN-MARINE or external-service
  change; no generated image or secret; a clean whitespace state; and positive evidence that no hardware was
  energised or tested, no production system or external service was touched, no paid API was called, no image
  was generated and no purchase/publication occurred?
- **Method.** `git diff --stat`, `git show --name-only`, explicit path filters, `git diff --check`, secrets scan
  of the diff, dependency-block comparison, and a scan for new binary/image files, network/API scripts,
  hardware/vessel test artifacts; record the no-side-effect statement explicitly (Lead attestation where it is
  not tree-evidenced, with that limitation stated).
- **Status.** `PENDING`.

### R25 — Cross-document consistency and acceptance evidence
- **Question.** Do the frozen values agree everywhere (identities, editions, prices, readiness, blocker ids,
  integration statuses, entitlement/tenancy rules, asset partition, invariants), do all cross-links point to
  existing files, do acceptance scenarios (`<CODE>-AC-01..`) exist and map to F24, and is the README/decision-log
  addendum consistent with the batch-03 files?
- **Method.** Build a cross-document matrix of every frozen value and diff dossier vs editions vs compatibility
  vs pricing vs journeys vs assets vs copy vs JSON vs README; resolve every relative link and asset id; count
  and read acceptance scenarios; check the batch-03 block ids match §3.4 exactly; confirm no document contradicts
  another on a customer-facing fact.
- **Status.** `PENDING`.

---

## 5. Gate and regression plan (Phase B)

| Gate / command | Baseline at MC-06 HEAD (this review) | Batch-03 target |
| --- | --- | --- |
| `node scripts/check-marea-products.mjs` | **PASS** — 38/38 checks, exit 0 | run; expect all baseline checks plus batch-03 checks; 0 failed |
| `node --test scripts/check-marea-products.test.mjs` | **PASS** — 77/77, exit 0 | run; expect all baseline tests plus batch-03 tests; 0 failed |
| `npm run test:products` / `test:products:unit` | not run at baseline (same commands) | run; exact counts recorded |
| `npm run format:check` | not run at baseline | run; exit 0 or defect |
| `npm run test:brand` / `test:brand:unit` | not run at baseline | run; 21/21 and 13/13 expected, exact output recorded |
| `npm run test:i18n` / `test:commerce` / `test:seo` / `test:backup` | not run at baseline | run; exit codes recorded |
| `npm run build` | not run at baseline | run; SSR/prerender build result recorded |
| `npm run test:e2e` | not run at baseline | run if Chromium is available; else `BLOCKED` with exact cause |
| `git diff --check` | clean (no tracked diff) | run; clean or defect |
| Diff scope filters (`src public e2e .github`), dependency diff, secrets scan | not run at baseline | run; empty/clean or blocking defect |
| Clean committed tree / audit target | at baseline: 4 untracked Lead `tmp-*` files (since deleted), no tracked modification | `git status --porcelain` empty at the MC-07 commit; committed tree contains every §0.1 deliverable |
| No-side-effect attestation: no hardware/vessel test, no production system, no external service, no paid API call, no image generation, no purchase or publication | none occurred in Phase A (read + local commands only) | verify from the commit/diff and record; session-only facts stated as Lead attestation with that limitation |
| Independent adversarial probes (throwaway `--root` copy) | none at baseline | one probe per frozen rule; each prohibited mutation must fail |

Counts are evidence only when paired with the exact command output; a specified-but-unrun test is never a pass.

---

## 6. Findings register (Phase B)

No finding exists yet: no batch-03 artifact, diff or validator extension has been audited. Findings will be
recorded here with: id (`BLK-` / `MAJ-` / `MIN-` / `OBS-`), severity, affected file:line (or exact command),
evidence class, why it matters, required correction, and **disposition** (`FIXED` after re-verification /
`ROUTED TO LEAD` / `ACCEPTED WITH RATIONALE` / `OPEN`). The reviewer does not edit any deliverable: every
finding is sent to the Lead, the Lead routes the fix, and the reviewer re-verifies the corrected commit. No
finding may be closed by a summary; closure requires the corrected artifact and a re-run gate. Any
inconsistency between D9's counts, the batch-03 JSON and the validator is reported here with severity.

| Id | Severity | Area | Evidence | State |
| --- | --- | --- | --- | --- |
| — | — | — | audit not started | — |

---

## 7. Verdict (Phase C) — intentionally PENDING

**No verdict is expressed by this document.** It becomes a verdict only after the Lead supplies the MC-07
commit SHA (committed tree, clean working tree) and after every area in §4 has an evidence row and §5's gates
have been run.

| Field | Value |
| --- | --- |
| Verdict | **PENDING** |
| Basis | audit not yet performed on batch-03 artifacts |
| Conditions for any PASS | every required area evidenced, including the three annexes and the nine-product ecosystem overview; all gates green on the frozen state; validator and negative tests reject prohibited mutations; D9 asset counts reconcile with the batch-03 JSON and the validator; findings reported with severity + file:line + disposition; no blocking defect; authorised diff scope; no hardware, production, external-service, paid-API or image-generation side effect |
| Conditions that force PARTIAL | verified definition work with a concrete external condition blocking a criterion |
| Conditions that force BLOCKED | audit cannot complete without an external unblock (missing artifacts/frozen state, credentials, legal clearance, hardware, network) |
| Conditions that force FAIL | a required behaviour or gate violated — false claim, prohibited state, missing required field, dead negative test, unauthorised side effect |

---

## 8. What even a future PASS will not prove

A batch-03 definition PASS will not prove, and must never be quoted as proving: that any product exists, is
manufactured, certified, compliant, safe, installable, supported, stocked, priced, orderable or available; that
charts/weather/AIS/fleet data rights are granted; that the DISPLAY hardware has a selected panel, BOM, size,
brightness, ingress or thermal evidence; that the WEATHER forecast has accuracy, coverage, official-warning or
redistribution rights; that FLEET is a production multi-tenant service with measured isolation, uptime or SLA;
that PILOT can be controlled from DISPLAY, FLEET or any remote surface (it cannot); that image generation is
unblocked (it is not); or that MAREA is a cleared trademark (it is not). All nine products remain `DEFINED`,
`NOT_FOR_SALE` and `INTERNAL_ONLY`, and publication remains `BLOCKED`, regardless of this review's verdict.

### 8.1 No-side-effect statement

During Phase A no hardware was energised or tested, no production system or external service was contacted, no
paid API was called, no image was generated, and no purchase or publication occurred; the reviewer's commands
were read-only Git plus local Node validator/test runs. The same statement will be independently verified
against the MC-07 commit and recorded for Phase B: if it can only be confirmed by Lead attestation rather than
the committed tree, that limitation is stated explicitly.

---

## 9. Document control

| Field | Value |
| --- | --- |
| Version | 0.2 — Phase A framework + pre-MC-07 baseline; Lead answers on audit target, deliverable set and R01–R25 coverage incorporated |
| Author | `product-reviewer` (AGENT G), independent of all MC-07 authors |
| Written | 2026-10-30 |
| Next update | Phase B audit evidence, findings, gates and Phase C verdict, after the Lead supplies the MC-07 commit SHA |
| Independence | the reviewer wrote no batch-03 deliverable; this is the only file written by the reviewer |
| Git | no Git write command was executed by the reviewer |
