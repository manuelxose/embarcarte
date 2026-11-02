# MC-11 — Independent technical and evidence audit (D35)

| Field | Value |
|---|---|
| Reviewer | `qa-reviewer` (Agent G) — independent auditor; authored none of the audited material |
| Reviewed commit | `bef2f4b25e06205697bee4de9da908741c726621` (fixed audit commit) |
| Branch | `feature/marea-mc11-hardware-sourcing-conformity` |
| Verified base | MC-10R HEAD `67131782edaf8f3f8327ba79e5c5b4c554b137b0` (local = `origin/feature/marea-mc10r-fieldwork-recovery`) |
| Date | 2026-11-02 (Europe/Madrid) |
| Audit scope | Actual committed tree at `bef2f4b` (not the delivery summary): D1–D34, all 18 JSON files under `docs/marea/hardware/data/`, evidence shards, validator and its negative tests |
| Write scope of this audit | `docs/marea/hardware/review/` and `docs/marea/hardware/data/review-findings.json` only |

## 1. Verdict

**`PARTIAL` — internal hardware feasibility scope.**

- **Internal feasibility scope: `PARTIAL`.** Acceptance items 1–20 of
  `MC11-BASELINE-AND-GOVERNANCE.md` §10 are evidenced and independently re-checked. Item 21
  (auditor closes all `BLOCKING`/`MAJOR` findings) is **not yet true**: finding **MC11-F01** is
  `MAJOR` and `OPEN`. Item 22 (draft stacked PR, unmerged) is **not evidenced at the fixed commit**:
  the branch has not been pushed and no MC-11 PR exists.
- **Full MC-11: not `PASS` and not obtainable as `PASS`.** The authoritative registry requirement is
  *"Real quotes only"*. No supplier was contacted and no formal quotation exists
  (`MC11_FORMAL_PROCUREMENT_EVIDENCE = BLOCKED_OR_NOT_OBTAINED`; 0 suppliers contacted, 0 RFQs sent,
  0 quotations). That is an external evidence gap, **not a finding against the authors**, and the
  registry requirement is not rewritten.
- **No `FAIL` condition found.** No required gate is violated (`test:hardware` 54/54 and every
  regression gate passed), no fabrication was found: `FORMAL_SUPPLIER_QUOTATION` / `SUPPLIER_QUOTED`
  do not occur as data values, `TESTED`/`SUPPORTED` do not occur as compatibility values, no measured
  performance/power/thermal/EMC/ingress claim exists, and no certification, availability or price is
  asserted.
- **Recommended milestone statement (not weakened):**
  `PARTIAL — INTERNAL FEASIBILITY SUBSTANTIALLY EVIDENCED; FORMAL SUPPLIER QUOTATIONS NOT OBTAINED;`
  `ONE MAJOR DELIVERY FINDING AND ACCEPTANCE ITEM 22 OPEN.`

## 2. Method and independence

1. Read the committed tree at `bef2f4b`, not any summary. `git status` clean; `HEAD` = the fixed SHA.
2. Re-derived every number from the raw JSON with independent Node scripts (`qty × unitPriceEur`,
   totals, FX, tooling, scenarios, scoring, risk/conformity counts) rather than trusting the documents.
3. Re-fetched a representative sample of external URLs myself (11/13 verified; 2 inaccessible and
   recorded as such).
4. Ran every mandated gate myself and recorded exact exit codes and pass counts (§11).
5. Did not run the Angular build or Playwright e2e (Lead-owned; recorded as reviewed-by-Lead only).

**Independence statement.** The reviewer authored no audited file. The only files written by this
audit are this report and `data/review-findings.json` (which replaces the Lead's placeholder).

## 3. Baseline and scope (dimension A) — `VERIFIED` (item 22 `NOT EVIDENCED`)

| Check | Result | Evidence |
|---|---|---|
| Audit commit | local `HEAD` = `bef2f4b25e06205697bee4de9da908741c726621`; working tree clean | `git rev-parse HEAD`, `git status --porcelain` |
| Ancestry from `6713178` | `6713178` is an ancestor; 6 commits; no merge commits | `git merge-base --is-ancestor` exit 0; `git log --oneline 6713178..bef2f4b` |
| Verified base | `origin/feature/marea-mc10r-fieldwork-recovery` = `6713178`; local = remote | `git ls-remote origin` |
| Branch state | MC-11 branch is local only; **no remote ref**, no tag, no merge | `git ls-remote --heads origin` (only MC-01…MC-10R + `main`); `git tag --points-at bef2f4b` empty |
| PR state | Open PRs are #7–#17; #17 (MC-10R) is `isDraft: true`, **no MC-11 PR exists** | `gh pr list --json …` |
| Clean scope | 59 files changed: 56 new hardware docs/data, 1 modified `package.json`, 2 new scripts. **Zero** changes under `src/`, `public/`, `deploy/`, commerce, publication or product data | `git diff --name-status 6713178 bef2f4b` |
| `package.json` delta | only `test:hardware`, `test:hardware:unit` added and the two Prettier file lists extended; no dependency, engine or script-semantics change | `git diff … -- package.json` |
| OPEN-MARINE | sibling checkout clean (`git status --porcelain` empty), HEAD unchanged; no write by this milestone | `open-marine` repo status |
| Tooling claims of D2 | node `v24.18.0`, npm `12.0.1`, git `2.38.0.windows.1`, `engines.node >= 22` — reproduced exactly | commands run |

**Gap.** D2 §10 item 22 (*"PR verified draft, stacked on the verified base, unmerged"*) is not
evidenced: no branch is on `origin` and no MC-11 PR exists (`gh pr list` max #17). The manifest
correctly marks D35–D37 `PENDING`; the milestone must not be closed as complete before the Lead
pushes the branch, opens the draft PR against `feature/marea-mc10r-fieldwork-recovery`, and this
item is re-verified (finding MC11-F01).

## 4. Product and bundle coverage (dimension B) — `VERIFIED`

| Requirement | Result |
|---|---|
| Nine canonical families | `hardware-families.json` has exactly `NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER, FLEET`; all assessed with hardware applicability, power, interfaces, readiness and `customerRequirementUncertainty = UNVALIDATED` |
| Editions valid | Every edition used in `hardware-families.json` and `conformity-applicability.json` is in the canonical edition list of `product-definitions.batch-01/02/03.json` — **0 invalid editions** (independently recomputed) |
| Six bundles | Exactly `START, CRUISE, SAIL, PROTECT, COMPLETE, FLEET`; each component line matches `docs/marea/bundles/bundle-definitions.json` `components[]` by family/edition/inclusion — **0 mismatches** (external `REQUIRED_EXTERNAL`/`QUOTATION_REQUIRED` lines are represented as external dependencies, correctly) |
| No invented SKU | No bundle name creates a component; `physicalHardwareFamilies` derive only from canonical lines |
| FLEET | `hardwareIncludedByDefault = false`, `physicalHardwareFamilies = []`, no non-optional hardware line, hardware exclusions explicit |
| Kits | `SENSE-ESSENTIALS → SENSE-POWER + SENSE-BILGE`; canonical `senseKitExpansion` maps `SENSE-SAIL → WIND+ENV` and `SENSE-SYSTEMS → POWER+BILGE+TANKS+ENV`; no kit adds a module or capability |
| PROTECT sensors counted once | `SENSE-ESSENTIALS` `INCLUDED` qty 1 with `expandsTo[POWER,BILGE]`; the loose module line is `INELIGIBLE` "counted once" |
| SAIL/COMPLETE no fixed price | `fixedTurnkeyPrice = false` in all six bundles; PILOT present only as `QUOTATION_REQUIRED`/`CONDITIONAL`/`INELIGIBLE`, never a priced line |

## 5. Architecture (dimension C) — `VERIFIED` (two documentation inconsistencies, MINOR)

- **Frozen weights:** `architecture-options.json` `criteriaWeights` are exactly the 11 D2 §6 weights;
  sum = **100**. `S04` and this audit agree; no post-hoc change.
- **Weighted arithmetic:** independently recomputed `Σ(score × weight) / 100` for all **33** options —
  **0 mismatches** at 2 dp; options complete (scores 1–5, building blocks, limitations,
  verification, conformity implications, evidence, `PROPOSED_NOT_APPROVED`). `summaryTable` shows
  **0 drift** against `options[]`.
- **Portfolio scores (D29 §2):** all nine weighted rows independently recomputed against the frozen
  D2 §6 portfolio weights — **all 9 correct** (NAV 3.68, WEATHER 3.46, FLEET 3.14, SENSE 2.94, HUB
  2.74, WATCH 2.20, DISPLAY 2.00, AIS 1.58, PILOT 1.22).
- **No measured/unproven claim:** every power/thermal/EMC/ingress figure is `UNKNOWN`,
  `NOT_MEASURED`, candidate or hypothesis; family power records carry `null` consumption; no
  temperature/IP/EMC product rating exists anywhere (`ENVIRONMENTAL_RATING_CLAIM = PROHIBITED`).
- **Inconsistency (MC11-F04):** D3 calls `ARCH-AIS-B` and `ARCH-DISPLAY-B` "provisional", while
  D4 §3.3, D9 §1.7/§2.5 and `architecture-options.json recommendations[]` record `ARCH-AIS-E`
  (near term) and `ARCH-DISPLAY-D` as the engineering preference.

## 6. Sourcing (dimension D) — `VERIFIED WITH LIMITATIONS`

- **Component register:** 41 components; all have an MPN; datasheet status honest
  (`LISTED_NOT_RETRIEVED` 31, `NOT_FOUND` 10, **`RETRIEVED` 0**). Sampled MPNs were confirmed on
  manufacturer pages (TCAN1042HGVDR, STM32H743 family, ATECC608B, MAX-M10, Raspberry Pi 5).
- **Price observations:** 42; classes `MANUFACTURER_PUBLIC_LIST_PRICE` 37 /
  `AUTHORIZED_DISTRIBUTOR_PUBLIC_PRICE` 5; **0** third-party reseller; **0** quotation;
  **0** `SUPPLIER_QUOTED`. Currencies 36 USD / 6 EUR; VAT 37 `VAT_UNKNOWN` / 5 `VAT_EXCLUDED`.
  MOQ recorded only where published (5/10 pcs) and every MOQ/lead-time/stock evidence reference
  resolves. No catalogue price is labelled a quotation.
- **Independent source verification (this audit, 13 URLs):** 11 verified, 2 inaccessible.
  Full log in §10 and in `review-findings.json`. `TI TCAN1042 datasheet PDF` and the
  `RS Components` page could not be fetched from this environment (fetch endpoint HTTP 404), so they
  are **not proof the recorded claim is false** — but the RS EUR price series was not independently
  reproducible by the auditor.
- **Disclosed limitation:** 21 of 127 evidence records (16.5 %) are explicitly
  `INACCESSIBLE`/partial, including **both** datasheet records; this is honestly recorded in D11
  §0.2–0.3 and D23 §10 and is itself a finding about evidence strength (MC11-F08), not a hidden gap.

## 7. BOM arithmetic (dimension E) — `VERIFIED`

Independently recomputed from raw JSON (not from the documents):

| Check | Scope | Result |
|---|---|---|
| Engineering BOM | all **11** BOMs, **155** lines | `knownLinesEur`, `partialSubtotalEur`, `knownLineCount`, `unknownLineCount`, `totalStatus`, `totalEur` — **0 mismatches** (±0.01 EUR); all `INCOMPLETE`, `totalEur = null` |
| Manufacturing BOM | all **11** BOMs, **171** lines | same fields — **0 mismatches**; all `INCOMPLETE`, `totalEur = null` |
| EUR conversion | **34** USD lines across BOMs | `unitPriceEur = observedUnitPrice × 0.925925926` (FX-USD-EUR-01) — **0 mismatches**; `fxRateId` resolves; FX rate itself is the labelled `ENGINEERING_ASSUMPTION` ASM-001 (ECB retrieval failed and is documented) |
| Tier integrity | every BOM line with `priceObservationId` | `priceQuantityTier` equals the observation's tier — **0 mismatches** |
| Cost scenarios | all **90** (6 families × 5 volumes × LOW/BASE/HIGH) | known category sum + `toolingAmortizationEur` equals declared known subtotal; `missingCategories` equals the UNKNOWN set; `totalStatus = INCOMPLETE`, `totalEur = null` — **0 mismatches** |
| Tooling | all 90 scenarios | equals ASM-008 envelope × case multiplier ÷ volume (12 000/8 000/3 500/9 000/5 000) — **0 mismatches** |
| FX sensitivity | 10 family/volume pairs, COST-01 LOW/HIGH | matches ×0.947368 / ×1.048544 — **all correct** |
| Documented cross-checks | D31 §2 EBOM table (11 rows), MBOM subtotals, BASE scenario values; D22 shares | EBOM table and MBOM values exact; BASE scenario values equal scenario known subtotals **excluding** the separately-amortised tooling — D31's own parenthetical says otherwise (MC11-F03) |
| Line/record counts | EBOM 155, MBOM 171, 90 scenarios, 42 observations, 41 components, 39 risks, 45 qualification tests | all match D31/D30 claims |

## 8. Evidence integrity (dimension F) — `VERIFIED`

- Evidence classes and confidence values are from the permitted vocabularies; `UNKNOWN` is used as a
  value and never as `0`; every total containing an unknown is `INCOMPLETE` with `totalEur = null`.
- No `FORMAL_SUPPLIER_QUOTATION` / `SUPPLIER_QUOTED` data value exists (only prohibition text and a
  dataset note stating they never occur). No `TESTED`/`SUPPORTED` compatibility value exists
  (29 rows: 9 `TEST_REQUIRED`, 9 `PROPOSED`, 11 `BLOCKED`; `deviceTestRecorded = false` everywhere).
- No invented MOQ, lead time, stock, warranty duration or support period; no customer demand from
  MC-10 (independently confirmed: 0 interviews, 0 price responses, 10/10 experiments not executed);
  `CUSTOMER_WTP_VALIDATED = false`.
- Every evidence record has id/claim/url/publisher/retrievedOn/type/assertion (127/127); all
  retrieval dates are the real session date `2026-11-02`.

## 9. Regulations, NMEA, safety, security, commercial governance — `VERIFIED`

**EU regulatory (dimension G).**

- 11 acts and 22 configuration rows; **every** `applicable[]` and `notApplicable[]` entry carries a
  written rationale (0 missing); all 127 applicability rows are
  `APPLICABILITY_ASSESSED_NOT_CERTIFIED`; no certification is claimed.
- Independently recomputed applicable/excluded counts match D23 §4 exactly: RED 13/9, EMC 6,
  LVD 0, RoHS 19, WEEE 19, GPSR 19, CRA 20, Batteries 12 (9 conditional), MED 0, RCD 0,
  packaging 19.
- **CRA dates independently verified against official European Commission pages:** in force
  10 December 2024; **reporting obligations from 11 September 2026**; **main obligations from
  11 December 2027** (and 11 Sep 2026 / 11 Dec 2027 in the CRA legal text record). The red
  radio-cybersecurity hand-over date (11 Dec 2027) is consistent.
- LVD/MED/RCD exclusions have explicit reasons and re-assessment triggers (D23 §5.2, §7, §7.1).
- The **18 conformity blockers are all open** (`CON-01…CON-18`; 8 CRITICAL, 8 HIGH, 2 MEDIUM;
  closure record empty by design). None is presented as closed.

**NMEA (dimension H).** Technical implementation, membership/licence, manufacturer code, product
certification, approved terminology and logo use are separated in D25 and `nmea-status.json`;
`nmea2000Certified = false`, `testedCompatibilityRows = 0`, no certification and no logo right
claimed; NMEA 2000 fees and certification timetable remain `UNKNOWN` where the pages did not render;
only the published NMEA 0183 price schedule and the verified 60-day manufacturer-code assignment are
quoted, as `BUDGETARY_INDICATION`/verified timing — not a MAREA cost.

**Safety (dimension I).** `PILOT_SAFETY_GATE = BLOCKED` in governance, D2, D29, D30, bundles and the
machine data; no actuator/motor/steering design, no executable control path, no remote helm;
`AIS_TRANSMISSION_OFFERED = false` and transmission/prohibited wording everywhere; validator V37/V38
enforce both.

**Security (dimension J).** D27 provides a real threat model (assets, actors, entry points, abuse
cases, trust boundaries, candidate mechanisms); D28 covers firmware IP/supply chain and repeats that
no OPEN-MARINE code has been copied; `SOURCE_IP_CLEARANCE = NOT_CLEARED`; CRA mapped as a conformity
input only, `CRA_COMPLIANCE = NOT_ESTABLISHED`; no licence is declared reusable.

**Commercial governance (dimension K).** `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`,
`PRICE_APPROVED = NONE`, `COMMERCIAL_AVAILABILITY = NOT_FOR_SALE`, `PUBLICATION_CHANGE =
NOT_AUTHORIZED`, `CE_MARKING_CLAIM = PROHIBITED`, no guaranteed alert delivery, no IP/EMC/temperature
rating, no availability/sale/order path. The only price figures are hypothesis/public-catalogue
observations. `governance-status.json` milestone state is honestly `PENDING_INDEPENDENT_REVIEW`.

## 10. Independent source verification (dimension D)

| # | URL (source class) | Verified | Note |
|---|---|---|---|
| 1 | `https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act` (official government guide) | **YES** | Confirms CRA in force 10 Dec 2024, main obligations 11 Dec 2027, reporting from 11 Sep 2026 (EVD-MC11-301/417). |
| 2 | `https://digital-strategy.ec.europa.eu/en/policies/cra-reporting` (official government guide) | **YES** | Confirms reporting applies from 11 Sep 2026, 24 h / 72 h / 14-day / one-month mechanics (EVD-MC11-303). |
| 3 | `https://www.nmea.org/nmea-2000.html` (standards body) | **YES** | Confirms "all products that read and or transmit NMEA 2000 information must be certified by NMEA", licence model, manufacturer code "up to 60 days", product code, certification tool, logo/terminology rule (EVD-001/002/319). |
| 4 | `https://www.nmea.org/nmea-0183.html` (standards body) | **YES** | Confirms USD 1,150 / 7,500 / 10,000, USD 200 mnemonic fee, copyright/licence position, 4800 baud, v4.30 (EVD-003/004/320). |
| 5 | `https://www.ti.com/product/TCAN1042HGV/part-details/TCAN1042HGVDR` (manufacturer) | **YES** | Confirms USD 2.196/1.689/1.244/0.889 bands, -55…125 °C, Automotive rating, 8-pin SOIC (EVD-102). |
| 6 | `https://www.ti.com/lit/ds/symlink/tcan1042.pdf` (datasheet) | **NO** | Fetch endpoint returned HTTP 404 / no PDF content, reproducing the limitation recorded in EVD-MC11-131. Not evidence the claim is false; **no datasheet is retrieved anywhere (0/41)**. |
| 7 | `https://www.raspberrypi.com/news/introducing-raspberry-pi-5/` (manufacturer) | **YES** | Confirms USD 60/80, 2.4 GHz A76, 802.11ac, BT 5.0/BLE, GbE, PCIe 2.0 ×1, 40-pin GPIO, RTC, 5 V/5 A, ~12 W pathological peak, sole first-party OS (EVD-005/006/018). |
| 8 | `https://www.st.com/en/microcontrollers-microprocessors/stm32h743zi.html` (manufacturer) | **YES** | Confirms active/volume production, Cortex-M7 480 MHz, 2 MB flash / 1 MB RAM, 1.62–3.6 V, 2× CAN FD, watchdogs, RTC, 3× ADC, Ethernet MAC, 2.95 µA standby (EVD-111/012). |
| 9 | `https://www.u-blox.com/en/product/max-m10-series` (manufacturer) | **YES** | Confirms every listed MAX-M10 variant is marked "This product is not longer available" (EOL finding, EVD-116). |
| 10 | `https://www.microchip.com/en-us/product/ATECC608B` (manufacturer) | **YES** | Confirms status "Not Recommended for new designs", ECC-P256/SHA-256/AES-128-GCM, up to 16 keys, <150 nA sleep (EVD-112/014). |
| 11 | `https://jlcpcb.com/` (service manufacturer) | **YES** | Confirms "From $2.00 / 5 pcs", 24 h build, "$8.00" PCBA, "$3.00" stencil, ISO 27001/27701 + PCI DSS (EVD-124). |
| 12 | `https://aisler.net/` (service manufacturer) | **YES** | Confirms PCBs made in Europe "starting at just €14.20", one business day (EVD-126; the single EUR manufacturer-list price). |
| 13 | `https://es.rs-online.com/web/p/can-interface-ics/2528889` (authorised distributor) | **NO** | Fetch endpoint returned HTTP 404 on two attempts; EVD-109 could not be independently reproduced by the auditor. Recorded as inaccessible, not as false. This is the programme's only EUR distributor price series. |

Additional independent checks: TI / NMEA / u-blox / Microchip / RPi / ST / JLCPCB / AISLER page
assertions **match** the recorded `supportedAssertion` text and the data values. The evidence index
does not carry any inflated claim that the fetched pages do not support.

**Not verified:** the TI datasheet PDF, the RS distributor page, the Portuguese producer-registration
pages, and the URLs the authors themselves record as `INACCESSIBLE` (21 records, incl. Mouser,
Digi-Key, TME, Newark, Analog Devices, WIZnet, RECOM, Taoglas, Fibox product pages, NMEA
membership/certification pages). These are external-access limitations, disclosed by the authors.

## 11. Automated validation (dimension L) — all executed by the auditor

All commands run from the repository root at `bef2f4b`; `[exit code]` recorded exactly.

| Gate | Result |
|---|---|
| `npm run test:hardware` | **exit 0** — `MC-11 hardware evidence: 54/54 checks passed` (V01–V50 + S01–S04) |
| `npm run test:hardware:unit` | **exit 0** — 59 tests, 59 pass, 0 fail (adversarial fixtures for every check) |
| `npm run test:products` | **exit 0** — 52 checks, 52 passed, 51/51 files; `RESULT: PASS` |
| `npm run test:products:unit` | **exit 0** — 106 tests, 106 pass, 0 fail |
| `npm run test:bundles` | **exit 0** — 35 checks, 35 passed; 43/43 files; 60 assets; 6 bundles; `RESULT: PASS` |
| `npm run test:bundles:unit` | **exit 0** — 60 tests, 60 pass, 0 fail |
| `npm run test:brand` | **exit 0** — 21 checks, 21 passed; `RESULT: PASS` |
| `npm run test:brand:unit` | **exit 0** — 13 tests, 13 pass, 0 fail |
| `npm run test:market` | **exit 0** — 40/40 checks passed |
| `npm run test:market:unit` | **exit 0** — 43 tests, 43 pass, 0 fail |
| `npm run test:customer-research` | **exit 0** — 62/62 checks passed |
| `npm run test:customer-research:unit` | **exit 0** — 111 tests, 111 pass, 0 fail |
| `npm run test:customer-recovery` | **exit 0** — 32/32 checks passed |
| `npm run test:customer-recovery:unit` | **exit 0** — 82 tests, 82 pass, 0 fail |
| `npm run test:i18n` | **exit 0** — server-rendering + i18n foundation checks passed |
| `npm run test:commerce` | **exit 0** — commerce integration checks passed |
| `npm run test:seo` | **exit 0** — 101 sitemap URLs; canonical, reciprocal hreflang, JSON-LD, private noindex |
| `npm run test:backup` | **exit 0** — backup/restore verified (integrity, checksums, FKs, corrupt-copy rejection) |
| `npm run format:check` | **exit 0** — All matched files use Prettier code style |
| `npm audit --omit=dev --audit-level=high` | **exit 0** — `found 0 vulnerabilities` |
| `git diff --check` (working tree) | **exit 0** — no whitespace errors |
| `git diff --check 6713178 bef2f4b` | **exit 0** — no whitespace errors in the audited range |

**Not run by the auditor (Lead owns):** `npm run build` (Angular SSR/prerender) and
`npm run test:e2e` (Playwright). They are recorded as *reviewed-by-Lead only* and are **not**
claimed as auditor-verified here.

## 12. Findings

| ID | Severity | File:line | Status | Summary |
|---|---|---|---|---|
| MC11-F01 | **MAJOR** | `docs/marea/hardware/MC11-BASELINE-AND-GOVERNANCE.md:236` | OPEN | Acceptance item 22 not evidenced: MC-11 branch not on `origin`, no MC-11 draft PR |
| MC11-F02 | MINOR | `MC11-MC12-HANDOFF.md:17`, `:66` | OPEN | Currency composition of the price set misstated (37 "manufacturer list (USD)" vs actual 36 USD + 1 EUR; 5 EUR distributor) |
| MC11-F03 | MINOR | `MC11-MC12-HANDOFF.md:47` | OPEN | Scenario table heading says "includes … amortised tooling" but the figures exclude `toolingAmortizationEur` |
| MC11-F04 | MINOR | `MC11-PORTFOLIO-HARDWARE-MAP.md:160`, `:300` | OPEN | "Provisional" AIS/DISPLAY architectures contradict D4/D9/`recommendations[]` (AIS-E, DISPLAY-D) |
| MC11-F05 | MINOR | `engineering-bom.json:692`, `manufacturing-bom.json:567` | OPEN | HUB-PRO `architectureVersion` reads "MCU-11 engineering preference" instead of "MC-11" |
| MC11-F06 | INFORMATIONAL | `MC11-COST-UNCERTAINTY-AND-VOLUME-SCENARIOS.md:215` vs `:228`, `:100` | OPEN | Tooling share shown as 27.4 % in the table and 27.5 % in prose/D31 (120.00 / 437.13 = 27.45 %) |
| MC11-F07 | INFORMATIONAL | `docs/marea/hardware/data/manifest.json` (deliverables D36/D37) | OPEN | D36 executive report and D37 delivery record are absent at the fixed commit; manifest correctly says `PENDING` |
| MC11-F08 | INFORMATIONAL | `MC11-COMPONENT-AND-MANUFACTURER-LANDSCAPE.md:26-50` | OPEN | 21/127 evidence records are explicitly inaccessible/partial and **0/41 datasheets are retrieved**; disclosed limitation, limits BOM-freeze confidence |
| MC11-F09 | INFORMATIONAL | `docs/marea/hardware/data/evidence-index.json` | OPEN | All 127 `independentVerification` values remain `NOT_PERFORMED` even though this audit verified 11 sources; Lead should record the auditor verification (auditor cannot write outside its scope) |

**Required corrections (precise, applicable by a different agent).**

- **MC11-F01 (MAJOR).** Push `feature/marea-mc11-hardware-sourcing-conformity` to `origin` and open a
  **draft** PR whose base is `feature/marea-mc10r-fieldwork-recovery` (verified base
  `6713178`), then confirm the head SHA is the corrected audit commit and that the PR is
  `isDraft: true`, `MERGEABLE`, unmerged. Record the PR number in D2 §1 and in
  `manifest.json`/governance status; then request re-verification of §10 item 22. Do not merge, tag
  or deploy.
- **MC11-F02 (MINOR).** In `MC11-MC12-HANDOFF.md:17` replace
  `42 observations, 37 manufacturer list (USD, VAT_UNKNOWN), 5 authorised-distributor retail (EUR)`
  with `42 observations: 37 manufacturer-list-price observations (36 USD, 1 EUR) and 5
  authorised-distributor EUR observations; 37 observations have VAT_UNKNOWN and 5 VAT_EXCLUDED`.
  In `:66` replace `37 of 42 observations are USD list prices with unknown VAT basis` with
  `37 of 42 observations have an unknown VAT basis (36 of them USD list prices; one EUR
  manufacturer-list price; five EUR distributor prices are VAT-excluded)`.
- **MC11-F03 (MINOR).** In `MC11-MC12-HANDOFF.md:47` remove "and amortised tooling" from the heading
  and state: `known category subtotals; the separately amortised tooling envelope
  (toolingAmortizationEur: 12 000 / 1 200 / 120 / 24 / 12 EUR for HUB at 1/10/100/500/1 000 units) is
  excluded from these figures and shown in D22 §3`. Keep the 27.5 % sentence; it is consistent with
  the excluded-tooling figures.
- **MC11-F04 (MINOR).** In `MC11-PORTFOLIO-HARDWARE-MAP.md:160` replace `provisional `ARCH-AIS-B``
  with `provisional `ARCH-AIS-E` for the near term (D9 §1.7); `ARCH-AIS-D` only under a funded RF
  programme`; in `:300` replace `provisional `ARCH-DISPLAY-B`` with `provisional `ARCH-DISPLAY-D``
  (D9 §2.5) and keep the stated alternatives.
- **MC11-F05 (MINOR).** Replace the token `MCU-11 engineering preference` with
  `MC-11 engineering preference` in both:
  `docs/marea/hardware/data/engineering-bom.json` (HUB-PRO BOM `architectureVersion`) and
  `docs/marea/hardware/data/manufacturing-bom.json` (same BOM).
- **MC11-F06 (INFORMATIONAL).** In `MC11-COST-UNCERTAINTY-AND-VOLUME-SCENARIOS.md:215` change
  `120.00 (27.4%)` to `120.00 (27.5%)` (or state the rounding convention), so it matches `:100` and
  `:228`.
- **MC11-F07 (INFORMATIONAL).** Produce D36 `MC11-EXECUTIVE-REPORT.md` and D37 `MC-11-DELIVERY.md`
  before any milestone-complete claim, or state explicitly in D1/manifest that they are produced
  after the independent audit. Their manifest `status: PENDING` is honest and must not be quoted as
  `COMPLETE`.
- **MC11-F08 (INFORMATIONAL).** Before any BOM freeze (gate G2/G3), retrieve the component datasheets
  and at least one second EUR distributor price series; until then keep `datasheetStatus` and every
  cost line `INCOMPLETE`/`COST_UNVERIFIED`.
- **MC11-F09 (INFORMATIONAL).** After this audit, set `independentVerification` to
  `VERIFIED_BY_AUDITOR` for the 11 verified evidence ids (EVD-MC11-001/002/003/004/005/006/012/014/
  102/112/124/126/319/320 where fetched) — exactly the ones logged in §10 — and leave the rest
  `NOT_PERFORMED`/`DISPUTED`; update `manifest.files[]` `recordCount` for `review-findings.json`
  from `null` to the number of findings in the replacement file (9).

## 13. What a re-verification must check

A re-audit of the *corrections only* is required; it must verify, at the new fixed commit:

1. **MC11-F01:** `origin` has the branch; a **draft**, unmerged PR against
   `feature/marea-mc10r-fieldwork-recovery` exists and its head is the corrected commit — via
   `git ls-remote`, `gh pr view`.
2. **MC11-F02/F03:** the D31 sentences/table match the machine data as corrected; re-read
   `price-observations.json` currency/VAT counts and recompute the HUB/WATCH/SENSE/DISPLAY/AIS BASE
   subtotals **with and without** `toolingAmortizationEur` and confirm which one is published.
3. **MC11-F04:** D3 AIS/DISPLAY architecture lines match `architecture-options.json`
   `recommendations[]`; no new architecture inconsistency.
4. **MC11-F05:** `grep -n "MCU-11" docs/marea/hardware/data/*.json` returns nothing.
5. All previous gates re-run; `npm run test:hardware` must still be 54/54 and
   `test:hardware:unit` 59/59; `git diff --check` clean; `format:check` clean.
6. `manifest.json` `review-findings.json` recordCount equals the new findings count; D35 status
   updated; D36/D37 present or explicitly deferred in writing.
7. Evidence index: `independentVerification` updated only for the sources actually re-fetched; no
   source status is upgraded without a fetch; no `FORMAL_SUPPLIER_QUOTATION`/`SUPPLIER_QUOTED` or
   `TESTED`/`SUPPORTED` value was introduced by any correction.
8. No new claim was created: CE/NMEA/certification, price approval, availability, IP/EMC/temperature
   rating, guaranteed alert delivery and AIS transmit remain prohibited; `PILOT_SAFETY_GATE =
   BLOCKED`; `SOURCE_IP_CLEARANCE = NOT_CLEARED`.
9. A re-run must **not** treat this PARTIAL as PASS: the internal scope can only be reclassified
   after items 21 and 22 are evidenced, and the **full MC-11 remains `PARTIAL` until genuine
   supplier quotations exist** (external, authorisation-gated, `BLOCKED_OR_NOT_OBTAINED`).

**Closing rule.** No `BLOCKING`/`MAJOR` finding is closed by this report. It records the audit
evidence only; the representative findings above remain `OPEN` until the corrections are applied and
re-verified by a different pass.
