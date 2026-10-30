# MC-07 — Independent review of the MAREA DISPLAY / WEATHER / FLEET product definitions

| Field | Value |
| --- | --- |
| Document ID | MC-07 / D15 — INDEPENDENT-REVIEW |
| Milestone | MC-07 (Master Prompt 07/36) — product-definition batch 3 |
| Reviewer | `product-reviewer` (AGENT G) — Independent Product Quality Auditor; author of no MC-07 deliverable |
| Review state | **PASS — product-definition scope** (closing-commit re-verification pending, §11) |
| Reviewed commit | `355cf00877f6be07cab26afd9e9ca30bf7964ca3` on `feature/marea-mc07-display-weather-fleet-products` |
| Previous audited commit | `64330faf6513de22dcced6ef70c1a6e8366490f0` (verdict FAIL; findings fixed in `355cf00` and re-verified here) |
| Base / MC-06 HEAD | `7867409066e83e4b432476903e61f5ebdcc1b554` |
| Review date | 2026-10-30 |
| Diff under review | `git diff 7867409..355cf00` = 24 files, 15,860 insertions, 55 deletions; fix delta `git diff 64330fa..355cf00` = 15 files, 388 insertions, 64 deletions |
| Scope | three dossiers, three annexes, nine-product ecosystem overview, editions, compatibility, pricing, journeys, assets, six copy files, machine contract, validator + negative tests, README §24–§32, DECISION-LOG D-012–D-017, and the real diff |
| Verdict | **PASS — product-definition scope only** |
| Commercial release status | **BLOCKED — `NOT_FOR_SALE`**; all nine products `DEFINED` / `NOT_FOR_SALE` / `INTERNAL_ONLY`; publication `BLOCKED`; trademark `NOT_GRANTED`; OPEN-MARINE rights `NOT_CLEARED`; image generation `BLOCKED` (X-03); prices `HYPOTHESIS_UNAPPROVED` |
| Files written by this reviewer | this file only |

This report verifies the real artefacts committed at `355cf00`, not a delivery summary. It is not a release,
certification, stock, availability, security, hardware or legal statement, and it must not be quoted as one.
A definition PASS is not a commercial release. The products remain completely specified and not for sale.

---

## 1. Audit target, independence and method

### 1.1 Independence

- The reviewer authored none of the MC-07 deliverables and did not edit them. The only file written by the
  reviewer is `docs/marea/products/MC-07-REVIEW.md`.
- The audit inspected the committed tree at `355cf00` and the real diff `7867409..355cf00`, never a delivery
  summary. The working tree contained only the withheld, untracked `MC-07-DELIVERY.md` (not part of either
  audited commit; §11).
- No Git write command was executed by the reviewer (read-only `git status`/`log`/`diff`/`show` only). No
  hardware, vessel, production system, external service, paid API, image generation or purchase was used.

### 1.2 Method

1. Freeze the state: `git rev-parse HEAD` = `355cf00`; `git log --oneline -3`; `git status --porcelain`;
   `git diff --stat 7867409..355cf00` and `64330fa..355cf00`.
2. Read the actual artefacts (dossiers, annexes, ecosystem overview, editions, compatibility, pricing, journeys,
   assets, copy, contract, validator, tests, README/DECISION-LOG) rather than the delivery record.
3. Re-run every repository gate and the batch validator/test suite on `355cf00` (§6).
4. Independently probe the validator with throwaway `--root` copies of `docs/marea` (no repository edits):
   40 prohibited mutations, each of which must be rejected by the real CLI (§7).
5. Classify every claim by evidence class and check the frozen batch-03 values across every document (§4).
6. Record findings with severity, `file:line` or exact command evidence, why it matters and disposition; the
   reviewer fixes nothing — findings were routed to the Lead and re-verified here.

### 1.3 Evidence classes used (README §5, not upgraded by this review)

`VERIFIED_REPO`, `VERIFIED_EXTERNAL`, `ASSUMPTION`, `HYPOTHESIS`, `OPEN`, `BLOCKED`. `OPEN` and `BLOCKED` are
legitimate field values; the prohibited placeholder token is not used anywhere in this review.

### 1.4 Verdict rules

PASS requires every required area evidenced, all gates green on the frozen commit, live negative tests that
reject prohibited mutations, no blocking defect, the authorised diff scope, and no hardware/production/
external-service/paid-API/image-generation side effect. PARTIAL is reserved for verified work blocked by an
external condition; BLOCKED for an audit that cannot proceed without an external unblock; FAIL for a violated
required behaviour or gate.

---

## 2. Audit history — `64330fa` FAIL → `355cf00` PASS

The first batch-03 commit (`64330fa`, 24 files, 15,544 insertions, 63 deletions) was audited and returned **FAIL**
for four blocking/major defects and eight minor/observation items. The Lead fixed them in `355cf00` (15 files,
+388/−64), and this review re-audited the corrected state. The fix commit does not remove or weaken any earlier
rule: `git diff 64330fa..355cf00 -- scripts` contains one replaced accuracy rule and additions only
(`+108/−0` in the test file); all 77 MC-05/06 tests and 38 baseline checks remain.

| Finding at `64330fa` | Severity | Fix in `355cf00` | Re-verified |
| --- | --- | --- | --- |
| BLK-01 — natural remote-control / PILOT-authority text passed the validator; tests only flipped JSON booleans | BLOCKING | four declarative/imperative claim rules added (`scripts/check-marea-products.mjs` steering/display block) and eight mutation tests added | **FIXED** — all six reported probe strings now `FAIL batch03.claims`; six regression tests present |
| BLK-02 — natural forecast-accuracy percentage passed the validator | BLOCKING | reverse `<n>% accurate/accuracy` rule + Spanish forms; regression test | **FIXED** — exact probe now fails |
| BLK-03 — natural cross-tenant text claim passed the validator | BLOCKING | modal and reverse cross-tenant rules; regression test | **FIXED** — exact probe now fails |
| MAJ-04 — WEATHER dossier body missing 4.3, 4.4, §5, §6 against its own TOC; dangling refs | MAJOR | WEATHER dossier restored to 648 lines: `### 4.3`, `### 4.4`, `## 5` (5.1–5.3), `## 6` (6.1–6.3), register rows 01–44, `PUBLICATION = BLOCKED`, `SOURCE_IP_CLEARANCE = NOT_CLEARED` | **FIXED** — TOC/body consistent, no dangling internal refs |
| MIN-05 — absolute host paths / brief cited as `VERIFIED_REPO` | MINOR | four files re-cite the programme brief as external to the repository; zero absolute host paths in deliverables | **FIXED** |
| MIN-06 — `openMarineSourceRights` attributed to `X-01` | MINOR | now `L-01`/`L-02`/`L-03` with a distinct reason (`product-definitions.batch-03.json`) | **FIXED** |
| MIN-07 — contract meta-key delta contradicted README §30/brief §15 | MINOR | README §30 corrected; explicit decision D-017 records the intentional meta-section delta; field/product/edition schema unchanged | **FIXED** |
| MIN-08 — customer copy said "approved mount" while no mount is approved | MINOR | dossier and ES/EN copy reworded to "specified mount family, subject to the installation assessment" + explicit no-approval statements | **FIXED in dossier/copy**; one residual internal annex label issue, MIN-10 |
| MIN-09 — ecosystem said "ten mandatory distinctions" while README/D-015 say nine | MINOR | ecosystem now says nine; entitlement sharing documented in §6/D-013 | **FIXED** |
| OBS-10 — FLEET copy lacked the approved AIS receive-only disclaimer | OBSERVATION | approved AIS disclaimer added verbatim to FLEET ES/EN copy and dossier §13.3 | **FIXED** |
| OBS-11 — FLEET status line used em dashes | OBSERVATION | status lines hyphen-normalised | **FIXED** |
| OBS-12 — untracked delivery draft asserted "MC-07 PASS" before the verdict | OBSERVATION | delivery record withheld from the fix commit and no longer asserts PASS | **FIXED** — remains untracked and is a closing-commit deliverable (§11) |

---

## 3. Verdict

**PASS — MC-07 product-definition scope.**

The third and final product-definition batch is complete, internally consistent, honest about every unverified
capability and price, and protected by a validator that rejects the prohibited mutations it now claims to cover.
The three products are defined to the same 24-field, six-evidence-class, nine-readiness-dimension standard as
MC-05/MC-06; the seven frozen editions and price hypotheses appear only as unapproved hypotheses; DISPLAY has no
PILOT authority and no measured hardware claim; WEATHER is provenance-first with every provider right
`NOT_GRANTED`/`UNRESOLVED` and never fabricates certainty; FLEET is a per-vessel multi-tenant SaaS design with no
deployed service, no SLA and no vessel-control path; the contract and validator prevent accidental sale; and the
diff is limited to the authorised internal documentation/tooling scope.

Two non-blocking residuals remain and are recorded, not hidden: the validator's text-claim rules still miss some
paraphrases (OBS-13), and one internal annex table still labels a mount family "approved" (MIN-10). Neither
affects a shipped customer-facing fact, a price, a sale state or the current copy, and both are routed for a
small follow-up.

**Commercial release: BLOCKED — `NOT_FOR_SALE`.** All nine products are `DEFINED` / `NOT_FOR_SALE` /
`INTERNAL_ONLY`; publication is `BLOCKED`; MAREA remains a proposed, uncleared brand; source IP is
`NOT_CLEARED`; no chart/weather/AIS/fleet data right is granted; no hardware, BOM, conformity, safety or
security evidence exists; no price is approved; nothing is orderable, publishable or available. This verdict does
not change any of that.

---

## 4. Per-area findings (25 required review areas)

| # | Area | Verdict | Evidence |
| ---: | --- | --- | --- |
| R01 | 72 fields and three distinguishable propositions | **PASS** | `MAREA-DISPLAY/WHEATHER/FLEET-COMMERCIAL-SPEC.md` each contain F01–F24 with Definition/Evidence/Owner/Blockers/Commercial readiness; the contract has 24 fields × 3 products with all eight sub-keys; every one of the 72 `<FILE>#Fxx` refs resolves; three distinct propositions (device+software / consumer data service / B2B SaaS), no duplication with the other six families |
| R02 | Editions and value differences | **PASS** | Seven frozen ids, names, amounts, periods, bases and states reproduced in dossier/editions/contract/copy cross-references; `DISPLAY-LARGE-CONDITIONAL` and `FLEET-ENTERPRISE` unpriced `NOT_ESTABLISHED`; edition verdicts limited to DEFINED/CONDITIONAL; no eighth object |
| R03 | Inclusions and exclusions | **PASS** | F07/F08 + copy + editions tables state charts, NAV, WEATHER, HUB, AIS hardware, adapters, extra mounts, installation labour and connectivity are separate; WEATHER subscription rights bounded; FLEET onboarding/limits explicit; no "unlimited" inclusion |
| R04 | Customer segmentation | **PASS** | F02/F03/F17 per product with primary/secondary segments, buying contexts and explicit non-segments; claims labelled `ASSUMPTION`/`OPEN`; no invented customer counts, references or willingness-to-pay |
| R05 | Price hypotheses and pricing/channel model | **PASS** | Only the five permitted figures (EUR 699 / 49 / 89 / 49 / 79) appear as `HYPOTHESIS_UNAPPROVED`; zero currency tokens in the six copy files; pricing document keeps every cost/channel input `OPEN`/`BLOCKED` and computes no margin; no BOM/quote invented |
| R06 | Competitor evidence | **PASS** (OBS-14) | DISPLAY/WEATHER/FLEET comparator tables and the pricing model cite the official URL, currency, tax basis, retrieved amount and `VERIFIED_EXTERNAL (checked 2026-10-30)`; vendor claims are marked "vendor claim, not verified"; no benchmark/market-share claim. The reviewer did not re-fetch the external pages (OBS-14) |
| R07 | Customer journeys | **PASS** | Three 17-stage blueprints (19 table lines each = header + separator + 17 rows, 10 columns), 28 product-specific journeys (7 DISPLAY, 9 WEATHER, 12 FLEET), 6 cross-product journeys, failure/recovery, acceptance criteria; no steering path in any stage |
| R08 | Bilingual copy | **PASS** | Six files, 24 numbered headings identical to `copy/nav.*`, zero `###`, identical ES/EN structure (247/247, 271/271, 242/242 lines; row/bullet parity 0 diffs), approved navigation/weather/AIS/brand disclaimers verbatim, batch-03 limitation statements verbatim, zero currency, zero purchase CTA, product names untranslated, internal status line present |
| R09 | Provider rights and data licensing | **PASS** | `providerRightsGranted = false`, `dataRights = NOT_GRANTED`; WEATHER annex analyses each provider (Copernicus/EMODnet/AEMET/Open-Meteo/OpenWeather/MeteoGalicia/Puertos) with per-dimension conditions, attribution strings and the honest `NOT_GRANTED` verdict; no free-tier commercial right, redistribution or coverage beyond licence |
| R10 | Forecast provenance and honesty | **PASS** | Six distinct timestamps, forecast/observation/historical/derived/user/unknown vocabulary, freshness/expiry rules, no accuracy percentage, no official-warning claim, provider-licence loss and expired entitlement produce honest "unavailable" states, attribution retained |
| R11 | NAV/WEATHER entitlement model | **PASS** | One account/one ledger, standalone WEATHER, NAV Pro read access `CONDITIONAL`, prorated upgrade, no double billing, cancellation preserves user-owned records with a read-only export window (hypothesis 30 days), billing unimplemented — identical across dossier §6, pricing, compatibility, journeys, copy and contract (`navDoubleBillingAllowed:false`) |
| R12 | DISPLAY hardware boundary | **PASS** | `SIZE_NOT_FROZEN`, `HARDWARE_NOT_SELECTED`, `BOM_NOT_ESTABLISHED`; every physical target labelled `REQUIRED_TARGET`/`NOT_ESTABLISHED`; no measured size, brightness, resolution, IP, temperature or sunlight claim; MC-04 contrast evidence labelled design evidence only; base vs separate software/data split exact. One internal annex label still says "approved mount family" (MIN-10) |
| R13 | DISPLAY/PILOT boundary | **PASS** (OBS-13) | Dossiers, compatibility, journeys, copy and contract state PILOT on DISPLAY is read-only status/alarms at most; contract `pilotControlAuthority:false`; the six reported control phrasings are rejected by the validator and tested. Some paraphrases still evade the text rules (OBS-13); shipped content contains no control claim |
| R14 | FLEET tenant isolation | **PASS** | 1,855-line tenancy annex: organization → membership → role → vessel, eight frozen roles, server-side authorization, `defaultRole = NO_ACCESS`, no client-supplied tenant trust, immediate revocation, scoped/time-bound `EXTERNAL_INSTALLER` and `EMBARCARTE_SUPPORT`, tenant-scoped export/search/cache/jobs/audit, auditable transfer; all stated as design requirements, not tested behaviour; `crossTenantAccessAllowed:false`, telemetry read-only |
| R15 | FLEET privacy | **PASS** | Data classification, retention/minimisation, export, deletion, controller/processor assessment, subprocessors/transfers, incident and location-privacy sections; lawful basis/DPIA/retention items `OPEN`; no customer production data used (`customerProductionDataUsed:false`); no public position by default |
| R16 | FLEET versus WATCH | **PASS** | FLEET-WATCH `CONDITIONAL` read-only telemetry/alerts; WATCH's unimplemented delivery pipeline is not claimed as live; no duplicated platform claim; copy respects conditional awareness |
| R17 | FLEET SaaS versus package/enterprise tier | **PASS** | Per-vessel monthly subscription; Enterprise is a contracted tier with no price/checkout; organisation fee, seats, onboarding and telemetry/storage/API limits explicit; `NO_SLA_ESTABLISHED`, `slaEstablished:false`, no unlimited or security-certification claim |
| R18 | Visual asset plan (30 requirements) | **PASS** | D9 has the exact 30 ids (10/family, correct suffixes); partition 12 `BLOCKED_ON_IMAGE_GENERATION` + 15 reused + 3 authored = 30; 0 missing; 0 publicly approved; 18 cited `MR-*` ids all exist in the MC-04 manifests; JSON mirrors 12/15/3 and the validator cross-checks D9; no asset file created and no image generated |
| R19 | Machine contract | **PASS** | `product-definitions.batch-03.json` reuses the field/product/edition schema, 24 fields × 3 products, frozen invariants all false/faithful, `publicationControls` all restrictive, 789 evidence references resolve, no purchasable/SKU/stock keys; the documented D-017 meta-section delta is explicit and README §30 matches |
| R20 | Negative tests | **PASS** (OBS-13) | Validator extended to 52 checks (38 baseline + 14 new) and tests to 106 (77 baseline retained + 29 added, including the eight reported probe strings); independently replaying 40 prohibited mutations, 29 are rejected (all reported BLK-01/02/03 strings, prices, statuses, assets, refs, invariants), 11 paraphrase variants still pass (OBS-13, not blocking; shipped content is clean) |
| R21 | Batch-01/02 regression | **PASS** | All 38 baseline checks and all 77 baseline tests retained and green; `json.products` = 9 products, `all.families` = 9 products/26 editions/3 contracts; all repository gates pass (§6); no dependency, route, commerce or price change |
| R22 | IP/trademark and claim gates | **PASS** | `BRAND_CLEARANCE = NOT_GRANTED`, `SOURCE_IP_CLEARANCE = NOT_CLEARED`; no `®`/`™` attached to MAREA; no certification claim (CE/EMC/RED/NMEA 2000/IP/sunlight) exists as fact; "certified" appears only in non-assertion/prohibition text; `test:brand` 21/21 and `test:brand:unit` 13/13 pass |
| R23 | No publication and no sale | **PASS** | All nine products `DEFINED`/`NOT_FOR_SALE`/`INTERNAL_ONLY`; publication `BLOCKED`; `publicationControls.published/forSale/purchaseCtaAllowed/pricesInCopyAllowed` false; eight publication gates `BLOCKED`; zero currency and zero purchase CTA in copy; no checkout/catalogue/route/price touched |
| R24 | No side effects and diff scope | **PASS** | Diff is 24 authorised internal files across the two commits; explicit filter for `src public e2e .github open-marine package*.json` is empty; no binary/image files; no secrets; no network/fetch additions in the scripts; `git diff --check` clean; `npm audit` 0 vulnerabilities. Repository evidence shows no hardware, production, external-service, paid-API or image-generation artifact; absence of physical/hardware activity is attested by the Lead (limitation recorded in §11) |
| R25 | Cross-document consistency and acceptance evidence | **PASS** | Frozen identities, editions, readiness, blocker ids (16/11/11), 19 integration statuses, entitlement and tenancy rules, asset partition and contract invariants agree across dossiers/annexes/editions/compatibility/pricing/journeys/assets/copy/JSON/README/D-012–D-017; all relative links resolve; acceptance scenarios are contiguous and complete (DISPLAY 20, WEATHER 35, FLEET 26); D9 ↔ JSON ↔ validator counts reconcile (30 = 12 + 15 + 3) |

---

## 5. Deliverables inspected at `355cf00`

| Deliverable | Lines | Evidence |
| --- | ---: | --- |
| `MAREA-DISPLAY-COMMERCIAL-SPEC.md` | 816 | F01–F24, status block, subsystem/editions/pricing/gates/AC/traceability/disclaimers |
| `MAREA-WEATHER-COMMERCIAL-SPEC.md` | 648 | F01–F24, restored §4.3/§4.4/§5/§6, 35 AC scenarios, rights verdict |
| `MAREA-FLEET-COMMERCIAL-SPEC.md` | 974 | F01–F24, 26 AC scenarios, tenancy/telemetry/pricing/traceability |
| `DISPLAY-HARDWARE-AND-INTERACTION-REQUIREMENTS.md` | 375 | hardware states, required targets, modes, power/thermal/EMC plan, non-assertions |
| `WEATHER-DATA-RIGHTS-AND-FORECAST-CONTRACT.md` | 508 | per-provider rights matrices, timestamps, freshness, attribution, verdict |
| `FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md` | 1,855 | tenants, eight roles, authorization, isolation, privacy, SLA evidence, acceptance |
| `MAREA-NINE-PRODUCT-ECOSYSTEM.md` | 185 | nine families, nine distinctions, boundaries, lifecycle roll-up |
| `PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` | 861 | seven editions, inclusion/exclusion, decisions CD-01.. |
| `PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` | 492 | 21 rows, 0 `SUPPORTED`, frozen baseline reconciliation, authority matrix |
| `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` | 501 | hypotheses, comparator evidence, symbolic cost/channel framework |
| `CUSTOMER-JOURNEYS-DISPLAY-WEATHER-FLEET.md` | 747 | 17 stages ×3, product-specific and cross-product journeys, acceptance |
| `PRODUCT-ASSET-REQUIREMENTS-BATCH-03.md` | 527 | 30 requirements, coverage matrix, reconciliation |
| `copy/display.{es,en}.md` | 247 / 247 | 24 sections + approved disclaimers |
| `copy/weather.{es,en}.md` | 271 / 271 | 24 sections + approved disclaimers |
| `copy/fleet.{es,en}.md` | 242 / 242 | 24 sections + approved disclaimers incl. AIS |
| `product-definitions.batch-03.json` | 2,407 | contract 1.0.0, 3 products, 72 fields, 30 assets, invariants, gates |
| `scripts/check-marea-products.mjs` / `.test.mjs` | 6,369 / 1,804 | 52 checks / 106 tests (38 + 77 baseline retained) |
| Governance | — | README §24–§32 (711 lines), DECISION-LOG D-012–D-017 (674 lines) |
| Diff | — | `7867409..355cf00`: 24 files, 15,860 insertions, 55 deletions; `64330fa..355cf00`: 15 files, +388/−64 |

---

## 6. Gate evidence (run by the reviewer on `355cf00`)

All commands were executed from the repository root on `355cf00877f6be07cab26afd9e9ca30bf7964ca3`; the tree was
clean except the withheld untracked `MC-07-DELIVERY.md`. `EXIT` is the shell exit code.

| # | Command | Result |
| ---: | --- | --- |
| 1 | `npm run format:check` | **PASS** — "All matched files use Prettier code style!" (EXIT 0) |
| 2 | `npm run build` | **PASS** — Angular SSR/prerender build, output `dist/embarcarte` (EXIT 0) |
| 3 | `npm run test:i18n` | **PASS** — server-rendering and i18n foundation checks (EXIT 0) |
| 4 | `npm run test:commerce` | **PASS** — bilingual catalogue, stock, cart, accounts, authorization, webhook and security checks (EXIT 0) |
| 5 | `npm run test:seo` | **PASS** — 101 sitemap URLs, canonical, reciprocal hreflang, JSON-LD, private noindex (EXIT 0) |
| 6 | `npm run test:backup` | **PASS** — snapshot/restore, checksums, integrity, foreign keys, counts (EXIT 0) |
| 7 | `npm run test:brand` | **PASS** — 21/21 checks, 24 files (EXIT 0) |
| 8 | `npm run test:brand:unit` | **PASS** — 13/13 (EXIT 0) |
| 9 | `npm run test:products` | **PASS** — "52 checks run, 52 passed, 0 failed; 51 of 51 scoped files read"; `RESULT: PASS`; contracts 1.0.0/1.0.0/1.0.0; 9 products; 789 references (EXIT 0) |
| 10 | `npm run test:products:unit` | **PASS** — tests 106, pass 106, fail 0, duration 133,066 ms (EXIT 0) |
| 11 | `npm run test:e2e` | **PASS** — 15 passed (Chromium) on an isolated run (EXIT 0) |
| 12 | `npm audit --omit=dev --audit-level=high` | **PASS** — found 0 vulnerabilities (EXIT 0) |
| 13 | `git diff --check 7867409..355cf00` | **PASS** — no whitespace errors (EXIT 0) |
| 14 | Diff scope filter for `src public e2e .github open-marine package*.json` | **PASS** — empty output |
| 15 | Binary/image/secret scan of the diff | **PASS** — no image/binary files, no keys/tokens/passwords |
| 16 | `git status --porcelain` | only `?? docs/marea/products/MC-07-DELIVERY.md` (withheld closing deliverable; not in the audited commit) |

---

## 7. Independent adversarial probes

Forty throwaway copies of `docs/marea` were mutated (one prohibited change each) and run through the real CLI
with `--root`, with no repository edit. Twenty-nine were rejected with non-zero exit and a named failing check;
eleven paraphrase variants still evade the text-claim rules (OBS-13). The probes that reproduce the previously
reported BLK-01/02/03 strings are now shipped as regression tests and fail as required.

| Probe group | Result |
| --- | --- |
| Previously reported BLK-01 strings (6): "You can control the vessel remotely from the app", "Control the vessel remotely from the app", "FLEET lets you steer your boat from your phone", "Engage PILOT from the display", "The display can steer the vessel", "PILOT can be controlled from the display" | **REJECTED** — `FAIL batch03.claims` (and `batch02.prohibitions` where the earlier batches' rules also apply) |
| BLK-02: "Forecasts are 95% accurate" | **REJECTED** — `FAIL batch03.claims` |
| BLK-03: "Organization administrators can access cross-tenant data" | **REJECTED** — `FAIL batch03.claims` |
| Prohibited price in copy, JSON price drift, provider-rights true, publicationControls true, an unauthorised sale lifecycle state, missing copy, broken evidenceRef, asset status drift, D9 total drift, DISPLAY size/nits claim, weather offline right, guaranteed SLA, certified sunlight | **REJECTED** — each exits 1 with the expected check |
| Paraphrase variants that still pass (OBS-13): "FLEET allows remote control of the vessel from any phone"; "FLEET enables remote control of vessels"; "FLEET offers remote steering"; "The display offers PILOT control"; "The display supports PILOT engagement"; "PILOT engagement is available on the display"; "95% of forecasts are accurate"; "Forecasts are accurate to 95%"; "Admins can read another organization's vessels"; "Admins can view other organisations' data"; "A user from Organisation A can read Organisation B's vessels" | **ACCEPTED AS RESIDUAL LIMITATION** — see OBS-13; no shipped document contains any of these claims, and the exact reported forms are covered by tests |

The copy files are clean: zero currency tokens, zero purchase CTA, zero unapproved availability/stock/review claim;
the dossiers contain no affirmative measured hardware, certification, accuracy, SLA, unlimited or cross-tenant
claim (all hits are non-assertions, targets or prohibitions).

---

## 8. Defect register

### 8.1 Fixed and re-verified (this review)

All twelve findings raised against `64330fa` were fixed in `355cf00` and re-verified as recorded in §2. The
reviewer re-ran the exact probes, the structural checks (WEATHER TOC/body, absolute paths, contract gate,
README/D-017, mount wording, ecosystem count, AIS disclaimer, status line) and all gates; no regression was
found. No fixing was done by the reviewer.

### 8.2 Open, non-blocking (routed to the Lead; do not affect the PASS)

| Id | Severity | Finding / evidence | Required correction | Disposition |
| --- | --- | --- | --- | --- |
| MIN-10 | MINOR | `DISPLAY-HARDWARE-AND-INTERACTION-REQUIREMENTS.md:108`, `:145`, `:154` still label requirements "approved mount family"/"approved mount", while `:162` of the same annex says "no mount is approved" and hardware is `NOT_SELECTED`. Dossier and ES/EN copy were correctly reworded; the annex labels were not | Rename to "specified mount family" / "mount family under installation assessment"; keep the "no mount is approved" statement | ROUTED TO LEAD — closing-commit fix recommended; internal-only terminology, no customer-facing claim |
| OBS-13 | OBSERVATION | The text-claim rules are phrase-specific: 11 natural paraphrases of the frozen remote-control/PILOT, forecast-accuracy and cross-tenant prohibitions still pass the validator (list in §7). The six reported BLK-01 strings, the accuracy string and the cross-tenant string are rejected and tested; shipped copy/dossiers contain none of the evading phrases | Broaden the control/accuracy/cross-tenant patterns (allow/enable/offer/support + control/steering/engagement; "<n>% ... accurate" with intervening words; "other organis[s]ation" and "A ... B" paraphrase) and add regression tests before MC-20–MC-24 copy work begins | ACCEPTED WITH RATIONALE — residual heuristic limitation; no false shipped claim; follow-up before the page/copy milestone |
| OBS-14 | OBSERVATION | External comparator prices/terms in the dossiers and pricing model were not independently re-fetched by this reviewer; they are labelled `VERIFIED_EXTERNAL (checked 2026-10-30)` with official URLs and "vendor claim, not verified" qualifiers, and are not MAREA evidence | Re-check before reuse in any public page, as the documents themselves require | ACCEPTED WITH RATIONALE — dated external evidence, outside the definition-scope gate |
| OBS-15 | OBSERVATION | The withheld `MC-07-DELIVERY.md` still cites `64330fa` for its gate evidence and contains one unresolved review-verdict marker; the closing commit must update it to `355cf00` and this verdict, and add the MASTER-PROMPT-REGISTRY MC-07 row | Update delivery record, registry row and this review's closing addendum; commit only the declared closing files | ROUTED TO LEAD — process item for the closing commit |

---

## 9. Residual open blockers (external; unchanged by MC-07)

These are not defects of this review: they are why a definition PASS is not a release. None was cleared.

| Blocker | State after MC-07 | Effect |
| --- | --- | --- |
| Trademark / brand clearance | `X-01`, `BRAND_CLEARANCE = NOT_GRANTED` | MAREA remains a proposed brand; no `®`/`™`; nothing publishable |
| OPEN-MARINE ownership / IP | `L-01`–`L-03`, `SOURCE_IP_CLEARANCE = NOT_CLEARED`, DEC-01 undecided | No inbound reuse right, assignment or outbound licence |
| Data provider rights | `providerRightsGranted = false`; WEATHER rights `NOT_GRANTED`/`UNRESOLVED` (D-04, D-05, D-07, D-09, D-10) | No coverage, accuracy, official-warning, redistribution or offline right |
| DISPLAY hardware | `H-05`, `H-11`, `P-07`; `HARDWARE_NOT_SELECTED`, `SIZE_NOT_FROZEN`, `BOM_NOT_ESTABLISHED` | No device, panel, mount, BOM, measurement or sunlight evidence |
| Compliance / conformity | `H-06`, `H-13`, `compliance = NOT_STARTED` | No CE/EMC/RED/LVD/GPSR/RoHS/WEEE/CRA evidence, no DoC; no market placement |
| FLEET service / connectivity / privacy | `P-09`, `H-12`, `X-07`; service `NOT_IMPLEMENTED`, `NO_SLA_ESTABLISHED` | No deployed multi-tenant service, no SLA, no security certification, no connectivity or DPA |
| Supplier / BOM / unit economics | `X-05`, `X-06` | No supplier quote, costed basis, channel term or willingness-to-pay evidence; prices remain hypotheses |
| Imagery | `X-03` open | 30 asset requirements in `CONCEPT`; 12 `BLOCKED_ON_IMAGE_GENERATION`; no image file exists or may be generated |
| Sales readiness | `P-10`, `X-02`, `X-04` | No seller legal identity, approved SKU, stock, fulfilment, installer network, support contract, warranty terms or release governance; claims register empty |

---

## 10. What this review does not prove (explicit non-conclusions)

1. **DISPLAY is not a built, measured or certified device.** No panel, compute module, enclosure, mount, BOM,
   photometric, thermal, ingress, vibration or EMC evidence exists; size is not frozen and no measured size,
   brightness, resolution, IP rating or temperature range may be claimed.
2. **WEATHER has no data right and no accuracy evidence.** No provider contract, no commercial display/caching/
   offline/redistribution right, no forecast evaluation in the pilot geography; forecasts are probabilistic and
   never a guarantee or an official warning service.
3. **FLEET is not a deployed service.** There is no multi-tenant production service, no measured isolation,
   uptime or SLA, no security certification, no connectivity contract, no customer data and no vessel-control
   path (telemetry is read-only by design).
4. **No certification, conformity or approval exists.** No CE marking, EU declaration of conformity,
   EMC/RED/LVD/GPSR/RoHS/WEEE/CRA evidence, NMEA 2000 licence/certification, type approval, class certificate,
   security certification or installer certification exists.
5. **No brand or IP clearance.** MAREA is a proposed brand without trademark clearance; the source software has
   no documented inbound licence or assignment.
6. **Nothing is sellable, orderable, quotable, priced, in stock or available.** All figures are internal
   hypotheses; no approved price list, BOM, supplier quote, channel term, legal identity, fulfilment, support
   contract or warranty exists.
7. **No hardware, manufacturing, connectivity or service was created, and no image was generated.**
8. **This review does not re-verify external sources.** Comparator prices/terms are dated external observations
   (OBS-14) and must be re-checked before reuse.
9. **A definition PASS is not a commercial release.** It covers completeness, honesty, traceability and internal
   consistency of the three definitions at `355cf00` only; every external blocker in §9 remains open and every
   product remains `DEFINED` / `NOT_FOR_SALE`.

---

## 11. Closing commit and re-verification

This review is issued against `355cf00877f6be07cab26afd9e9ca30bf7964ca3` and its diff from `7867409`. The
closing commit is expected to contain only: this final review text, the updated `MC-07-DELIVERY.md` (corrected to
cite `355cf00` and this verdict, replacing its remaining placeholder), and the `MASTER-PROMPT-REGISTRY.md` MC-07
row (plus any trivial whitespace normalisation). Any other path in the closing diff is outside this verdict and
requires re-verification.

After the Lead sends the closing-commit SHA, the reviewer will verify that diff is limited as above, re-run the
reviewed-state check, and append a short re-verification statement (with the closing SHA and any residual items)
to this section. Repository evidence shows no hardware, production, external-service, paid-API or
image-generation artifact was produced; the absence of physical hardware/vessel activity is attested by the
Lead, and that attestation — not a repository artefact — is the basis for that specific statement.

---

## 12. Independence and document status

- The reviewer is not an author of any MC-07 deliverable and edited none of them. The only file written by the
  reviewer is this `MC-07-REVIEW.md`.
- No Git write command was executed by the reviewer (no commit, checkout, stash, push or reset).
- This review is `INTERNAL ONLY` and is not a certificate, approval, release note or legal opinion.
- Related evidence: `docs/marea/products/README.md` §24–§32, `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md`
  §9, `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`, `docs/marea/execution/DECISION-LOG.md`
  D-012–D-017.
