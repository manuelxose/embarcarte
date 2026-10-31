# MC-09 — Independent evidence audit of market, competitive, buyer, pricing and channel research

| Field | Value |
| --- | --- |
| Document ID | MC-09 / D24 — INDEPENDENT-REVIEW |
| Reviewer | `agent-f-auditor` (independent evidence auditor; author of **no** MC-09 research deliverable) |
| Review state | Round 1 of 2 — initial audit of `566343e`; verdict **PARTIAL (conditional)**, one MAJOR and three MINOR corrections plus one integration step outstanding |
| Reviewed commit | `566343e493e392058bd1a662a6465e02ee4bccd0` ("docs(mc09): source-backed market, competitor, buyer, pricing and channel intelligence with MC-10 preparation") |
| Base | `65417bfa681d31cc655e2bc91cfcedcccc368675` (verified MC-08 HEAD) |
| Branch | `feature/marea-mc09-market-competitive-intelligence` |
| Review date | 2026-10-31 (Europe/Madrid), same day as the research retrieval session |
| Diff under review | `git diff 65417bf..566343e` — 51 files changed, 19,019 insertions(+), 3 deletions(-) |
| Audit target | The committed tree at `566343e` and that diff only. The Lead's summary and the delivery record were used only to locate artefacts, never as evidence. |
| Scope | D1–D26: 24 research documents, 22 JSON data files under `docs/marea/market-validation/data/`, the `check-marea-market` validator and its 43 negative-mutation tests, DECISION-LOG D-026/D-027, the registry row, and the `package.json` script wiring. Audits A–H of the brief. |
| Verdict | **PARTIAL — conditional**. All eight audit dimensions are substantively verified and no BLOCKING finding exists; PASS is withheld until F-01 (MAJOR scope overstatement), F-02/F-03/F-04 (MINOR consistency defects) and the manifest integration F-06 are closed and re-verified in round 2. |
| Commercial release status | **BLOCKED / NOT_FOR_SALE** — no price approved, 0 products for sale, 0 compatibility rows `TESTED`/`SUPPORTED`, brand `NOT_GRANTED`, source IP `NOT_CLEARED`, PILOT safety gate `BLOCKED`, profitability `NOT ESTABLISHED`, no publication, sale, deploy or outreach |
| Files written by this reviewer | `docs/marea/market-validation/review/MC-09-REVIEW.md` (this file) and `docs/marea/market-validation/data/review-findings.json` — **only** |

---

## 1. Independence statement and method

I am `agent-f-auditor`, the independent evidence auditor for MC-09. I authored none of the
research under review (the owners declared in the data files are `agent-a-market`,
`agent-b-competitors`, `agent-c-buyers`, `agent-d-economics`, `agent-e-channels`,
`agent-g-mc10` and `lead`). I did not edit any research file, did not run a Git write
command, did not commit, did not deploy, did not purchase anything and did not contact any
customer. This review did not accept the delivery summary as evidence: every number below was
reproduced from the files at `566343e`, and every re-opened source was checked against the
claim it is cited for.

Method:

1. Freeze the tree (`git status --porcelain` empty; branch and commit checked) and prove the diff scope.
2. Re-run the deterministic gates from the real tree and record exact commands, counts and exit codes.
3. Re-open 25 sources across the six workstreams with `web_fetch` on 2026-10-31; compare the page content
   with the registered claim, currency, tax basis and retrieval assumptions; record failures.
4. Recompose every arithmetic output: product scores, bundle scores, geographic scores, TAM/SAM/SOM,
   TCO partial sums, derived price compositions.
5. Scan the research for fabricated fieldwork, measured-WTP claims, testimonials, prevalence from
   anecdotes, purchase CTAs, approved prices, compatibility `TESTED`/`SUPPORTED`, NMEA certification,
   guaranteed WATCH alerts, fixed SAIL/COMPLETE turnkey prices and governance weakening.
6. Inspect the new scripts statically (network, writes, secrets, dependencies) and the diff scope.
7. Report each defect with file:line and a precise required correction; a BLOCKING/MAJOR defect
   keeps this task in progress until re-verified in a second round.

---

## 2. Baseline and diff scope — VERIFIED

| Check | Evidence |
| --- | --- |
| Working tree before the audit | `git status --porcelain` empty |
| Branch / commit | `feature/marea-mc09-market-competitive-intelligence` at `566343e493e392058bd1a662a6465e02ee4bccd0` |
| Parent | `65417bf` (MC-08 HEAD, matches the declared base) |
| Commit count / merges | one non-merge commit in `65417bf..566343e`; `git log --merges` empty |
| Product/bundle contracts untouched | `git diff 65417bf..566343e --stat -- docs/marea/products docs/marea/bundles` returns nothing |
| No application surface change | diff stat contains no `src/`, `deploy/`, `public/`, page, route or canonical-contract path |
| Script wiring only in `package.json` | diff adds `test:market` / `test:market:unit` and appends the two new files to `format`/`format:check`; 6 changed lines, no dependency change |
| New scripts | `scripts/check-marea-market.mjs` (1,465 lines) and `scripts/check-marea-market.test.mjs` (489 lines) |
| Execution records | `DECISION-LOG.md` adds D-026/D-027 only; `MASTER-PROMPT-REGISTRY.md` changes row 09 from `PLANNED` to `IN PROGRESS` only |

The declared implementation scope is accurate. No merge, force-push, tag, deployment,
publication, customer outreach or purchase is present in the commit or implied by the files.

---

## 3. Deterministic gates — exact commands and outcomes

Run from the repository root on 2026-10-31 with Node v24.18.0 / npm 12.0.1.

| Gate | Command | At `566343e`, clean tree | After this audit wrote `data/review-findings.json` |
| --- | --- | --- | --- |
| Market validator | `npm run test:market` | **PASS — 40/40 checks, exit 0** | **FAIL — 39/40, exit 1**; only `MK-03` ("data files missing from manifest: review-findings.json"). Expected integration step, not a research defect (F-06). |
| Negative-mutation suite | `npm run test:market:unit` | **PASS — 43/43 tests, 0 fail, exit 0** (≈14.2 s) | **FAIL — 42/43, exit 1**; single failing test `real tree fails: MK-03`, the same manifest dependency. Returns to 43/43 when F-06 is closed. |
| Product contract gate | `npm run test:products` | **PASS — 52/52 checks, 0 failed; 51/51 files scanned** | not affected by audit data |
| Bundle contract gate | `npm run test:bundles` | **PASS — 35/35 checks, 0 failed; 43/43 files; 60 assets; 6 bundles** | not affected |
| Brand gate | `npm run test:brand` | **PASS — 21/21 checks, 0 failed; 24 files** | not affected |
| Whitespace | `git diff --check` (working tree) and `git diff --check 65417bf..566343e` | **clean, exit 0** | clean apart from the two untracked audit files (no whitespace errors) |

The brief predicted only the `test:market` MK-03 consequence; the same root cause also trips the
"real tree passes" case in the unit suite. Both disappear with the one manifest entry described
in F-06, and neither is allowed to drive the verdict.

Static inspection of the new scripts: `check-marea-market.mjs` is plain Node (no dependency added),
imports only `node:fs`/`node:path`/`node:url`, makes **no network request**, reads **no** environment
variable, writes **no** repository file, contains no secret, and only reads `docs/` plus the canonical
product/bundle contracts. `check-marea-market.test.mjs` copies the tree into an OS temp directory
(`mkdtempSync`), mutates fixtures and deletes the temp directory; it does not write outside temp.
43 negative mutations are real CLI invocations that assert the specific failing check.

---

## 4. Audit A — Source integrity (sampled 25 sources across all six workstreams)

**Result: VERIFIED with notes.** The registry is internally coherent: 115 unique source IDs, 115
unique URLs, 136 unique claim IDs, no duplicate-page inflation, no claim referencing a missing
source (the six MC-10 methodology claims intentionally carry `sourceIds: []` and are marked
`UNKNOWN`/`HYPOTHESIS` under contract rule 3, not presented as facts). Source statuses are recorded
rather than hidden: 99 `OK`, 9 `INACCESSIBLE`, 5 `STALE`, 2 `CONTRADICTED`, and the claims resting on
non-OK sources either document the failure (e.g. CLM-CMP-024 "seven supplier pages were inaccessible")
or report the contradiction (CLM-MKT-016/CLM-MKT-014).

Pages re-opened on 2026-10-31 (all fetched successfully unless marked):

| Claim checked | URL | Result |
| --- | --- | --- |
| Spain 4,992 new recreational registrations in 2025, −0.9%; length bands 3,492/898/407/144/51; Pontevedra +41.4%, A Coruña −9.5% | `infopuertos.com/el-mercado-nautico-cierra-2025-con-estabilidad-y-un-ultimo-trimestre-favorable/` | **Matches** the article text and provincial table; the 4,992-vs-4,991 table note in MKT-IN-001 is accurate and 3,492+898+407+144+51 = 4,992 |
| Spain 5,027 registrations in 2024, −15.9% | `europapress.es/turismo/transportes/...-5027-...-20250107175518.html` | **Matches** |
| Rías Baixas >4,600 berths, "around twenty" facilities | `turismoriasbaixas.com/gl/.../o-paraiso-da-nautica-deportiva` | **Matches** |
| Galicia 73 sports ports / 10,500 berths | `europapress.es/galicia/...-simposio-clubs-nauticos-...-20250714190122.html` | **Matches** |
| Portugal ~85,000 registered craft, >90,000 licences | `dgrm.pt/destaques?articleId=764494` | **Matches** |
| Spain 133,400 berths in 289 ports | `forbes.es/turismo/694356/...` | **Matches** |
| Marina Coruña labour 59/76/47/65 EUR/h, electronics 61 EUR/h ex-VAT | `marinacoruna.es/wp-content/uploads/tarifas/TarifasMCvaradero-es.pdf` | **Matches exactly** ("IVA no incluido" table) |
| Siren 3 USD 299.99, service plan USD 225/yr, sensor USD 139.09 | `smartboats.org/guides/siren-vs-armit-vs-yacht-sentinel` | **Matches**; the primary Siren help page independently confirms "Service plans can be purchased for $225/year" |
| Van Westendorp price-sensitivity method reference | `search.r-project.org/CRAN/refmans/pricesensitivitymeter/html/pricesensitivitymeter.html` | **Matches** the method attribution |
| US installation guide 15–50% of hardware price (buyer evidence) | `marineelectronicinstallers.com/boat-electronics/marine-electronics-installation-cost-guide-2026/` | **Matches** the quoted range |

Two pages could not be re-opened in this environment: the Getxo varadero tariff PDF (two timeouts;
the 32.02 EUR/h claim is therefore **not re-verified** in round 1) and a Cruisers Forum thread
(SRC-BUY-002, one fetch failure). Both are recorded as residual risk (F-07), not as defects,
because the research recorded its own retrieval on the same date and neither carries a headline
conclusion. 62 of 115 sources have no `publishedAt` value; the contract shows the field but the
validator does not require it, so this limits date-plausibility checks but is not a violation (F-07c).

---

## 5. Audit B — Competitive comparability and price reproduction

**Result: VERIFIED with one MINOR correction (F-02).** I re-opened the original URLs and reproduced
every price used in the executive summary's comparison table. Currencies, tax treatments and
inclusion/exclusion bases are preserved; derived totals are separate `MODEL_DERIVED` records; the
manufacturer-list vs retailer vs promotional distinction is mostly declared.

| Item | Recorded | Re-opened source | Result |
| --- | --- | --- | --- |
| Orca Plus / Smart Navigation | EUR 49 / 149 per year | `help.getorca.com/en/articles/6541858-subscription-prices-and-functionality` | Matches; also states one year of Smart Navigation is included with a Core or Display (see F-02) |
| PredictWind Basic / Standard / Professional | USD 29 / 249 / 499 per year | `predictwind.com/pricing` | Matches; page confirms local taxes added at checkout |
| Raymarine Element 7 / 9 / 12 HV | EUR 659.45 / 901.45 / 1,506.45 incl. VAT | `raymarine.com/es-es/.../element-hv` | Matches; page confirms "El precio incluye el IVA" and that charts/transducer are separate for the bare SKU |
| Simrad NAC-2 / NAC-3 basic packs | EUR 2,100.56 / 3,083.08 incl. VAT | `simrad-yachting.com/es-es/simrad/serie/nac-autopilot-computers/list/` | Matches; both show `OutOfStock` as recorded |
| Victron SmartShunt 500A IP65 | EUR 90.21 incl. VAT | `cuencasolar.es/producto/monitor-de-baterias-victron-smartshunt-500a-ip65/` | Matches, in stock |
| Victron Cerbo GX MK2 | EUR 240.09 incl. VAT | `cuencasolar.es/producto/pack-victron-cerbo-gx-mk2-pantalla-gx-touch-50-flush/` | Matches; 240.09 is the Cerbo line inside a EUR 449.65 pack — the price record and observation disclose this, the executive table does not (noted, not a finding) |
| Raymarine EV-100 Wheel pack | EUR 2,050 incl. VAT | `latiendadelnavegante.com/producto_ampliado.asp?c=090800010112` | Matches; retailer states "IVA incluido, gastos de envío excluidos", "Bajo pedido" |
| Digital Yacht NavLink2 / iKonvert / AIS100 | EUR 300 / from 240 / 360, tax not stated | `digitalyacht.es/categoria-producto/sistemas-de-pc/accesorios-de-pc/?max_price=1380&orderby=price` | Matches; iKonvert is a "from" price as recorded |
| Orca Display 2 / Core 2 / mount / total | EUR 999 / 649 / 349 / 1,997 | `yacht.de/en/sailing-knowledge/navigation/navigation-orca-put-to-the-test...` | Matches; article states the total of individual prices is 1,997 and that Core 2 is "currently on offer" — the price record flags "promotional status not established" |
| Siren 3 + service plan (PROTECT composition) | USD 299.99 + 225/yr + 139.09 sensor = 664.08 | smartboats.org guide + sirenhelp.zendesk.com | Arithmetic and components match |
| Full Ahead Maritime Vessel plan | EUR 1,490/yr up to 5 ships; 149/mo; ~24.83/vessel/mo | `fullaheadmaritime.com/pricing` | Matches; "taxes may apply by location"; 1,490/5/12 = 24.83 |
| UOC Core / 2-vessel annual | EUR 259/vessel/mo; EUR 4,900/yr (≈204.17/vessel/mo) | `uocintl.com/platform/pricing` | Matches |
| Seafarers.pro Starter / Professional / Enterprise | EUR 150 / 240 / 360 per vessel/mo | `www.seafarers.pro/pricing` | Matches; page also runs a launch offer (40% first 12 months) not mentioned in the exec summary — list prices are the correct range anchor, noted only |
| Windy Premium | EUR 19 per year incl. all premium features | `yacht.de/it/conoscenza/.../passaggio...windy/` (Passage Planner article) | Matches the article's "19 euro all'anno (comprensivo di tutte le funzioni premium)" |
| Navionics Boating in-app charts | EUR 49.99–149.99 per item | `tuapppara.com/aplicaciones/navionics/` | Matches Google Play Spain range |

Composition methods are defensible: the bundle benchmark opens by stating that all totals are
compositions of separately sold components, mixes tax bases only where the component pages differ,
and excludes installation unless stated. Receiver vs transponder is explicitly separated
(Digital Yacht AIS100 receive-only vs 1,620–2,100 EUR transmit packs). The ONE comparability defect
is F-02: the START and PROTECT-Orca rows add a year-one Orca subscription although the cited Orca
page says the first year of Smart Navigation is included with the hardware — the document itself
counts that included year for CRUISE (line 55), so the treatment is internally inconsistent.

---

## 6. Audit C — Market sizing

**Result: VERIFIED.** Every multiplication in `market-inputs.json` and `MC09-MARKET-SIZING.md`
reproduces from the declared inputs; unknown inputs are declared `ASSUMED` with `sourceId: null`
and are never silently zeroed; no market-share percentage appears anywhere.

| Output | Reproduction | Stated |
| --- | --- | --- |
| TAM base | 133,400 Spanish berths + 85,000 Portuguese registered craft = 218,400 | 218,400 |
| TAM LOW / MID / HIGH | 218,400 × 0.35/0.50/0.65 × EUR 75/142/209 = 5,733,000 / 15,506,400 / 29,669,640 | same |
| SAM base | 10,500 Galician berths + 1,088 documented Northern-Portuguese berths = 11,588 | 11,588 |
| SAM LOW / MID / HIGH | 11,588 × shares × spend = 304,200 / 822,748 / 1,574,188 | same |
| Rías Baixas sub-SAM | 4,600 × 0.35/0.50/0.65 = 1,610/2,300/2,990 × EUR 75/142/209 = 120,750 / 326,600 / 624,910 | same |
| SOM units | 1×2×12 / 2×3×12 / 3×4×12 = 24 / 72 / 144 | same |
| SOM year-1 value | 24×275 / 72×542 / 144×808 = 6,600 / 39,024 / 116,352 | same |

The admitted weakness is the ES+PT base mixing a berth-capacity proxy with a registry proxy. That is
not hidden: MKT-IN-037 labels it "DIFFERENT proxies … order-of-magnitude base, not a fleet count",
the model is titled `PARTIAL_MODEL_LOW_CONFIDENCE`, and the narrative says explicitly that it is not
a forecast. Per-vessel spend is an `ASSUMED` anchored band, not a measured average, and the
"no arbitrary market-share" rule holds (SOM is capacity-bounded by installers × installs × 12). The
annual-flow cross-check (MKT-IN-056) applies a different 6 m+ assumption and the document itself flags
the resulting EUR 39k–199k vs EUR 34k–92k discrepancy as a warning; that transparency is a strength,
not a defect. No unknown was zeroed: `amount: null` is used for every missing TCO cost.

---

## 7. Audit D — Research methodology

**Result: VERIFIED.** There is no fieldwork and none is claimed:

- 0 interviews, 0 survey responses, 0 participants screened, 0 outreach, 0 advertising, 0 purchases
  (MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md status `PREPARATION_ONLY`; delivery §4 "No interviews,
  surveys, purchases or outreach data anywhere in the dataset").
- All 8 buyer segments are labelled `HYPOTHETICAL_ARCHETYPE` in `buyer-segments.json` and in the
  document body (8/8 "**Archetype status:** `HYPOTHETICAL_ARCHETYPE`"); the document says no archetype
  is a real buyer.
- 23 public signals are typed 9 `ANECDOTE`, 2 `REPEATED_OBSERVATION`, 10 `SUPPORT_DOC`, 2
  `PURCHASE_DEMAND`, each with an independence label and limitations; the evidence document states
  "there are zero SURVEY signals" and forbids using forum anecdotes as prevalence.
- All 15 WTP hypotheses are `NOT_MEASURED`; the pricing document states "No WTP value, no stated
  intent, no survey result" and forbids presenting a simulated survey as empirical.
- No testimonial, customer logo, quote, count or interview-based percentage is reused publicly.
- The one manifest wording defect — calling the segments "evidence-based" — is F-04, a metadata
  inconsistency, not fabricated evidence.

The validator mechanically enforces part of this (no fieldwork claims, WTP not measured, stale
sources not current facts) and its 43 negative mutations prove the rejection paths work.

---

## 8. Audit E — Commercial economics

**Result: VERIFIED.** The TCO layer does not conceal missing costs; it makes them explicit:

| Model | Partial sum reproduced | Missing costs |
| --- | --- | --- |
| START | 349 + 149 + 144 = **642** | installation, configuration, warranty — `null` |
| CRUISE | 99 + 349 + 249 + 699 + 144 = **1,540** | antenna/splitter, display mount, installation — `null` |
| SAIL | 149 + 349 + 1,290 = **1,788** | SENSE-WIND, vessel survey, installation/sea trial, warranty — `null` |
| PROTECT | 299 + 118.80 = **417.80** | SENSE-ESSENTIALS kit, installation, connectivity, warranty — `null` |
| COMPLETE | 149 + 499 + 699 + 299 + 118.80 + 1,290 = **3,054.80** | four SENSE modules, installation/training, warranty/multi-year — `null` |
| FLEET | 5 × 12 × 49 = **2,940** | onboarding, migration, training, support/SLA, optional hardware, VAT — `null` |

All six models carry `year1Total: null`, `recurringAnnual: null` and
`completeness: INCOMPLETE`; no component amount is 0 where evidence is missing; scenario bands
(installation only) use a declared Croatian rate (EUR 105/h, not Spanish) and are labelled
`SCENARIO_DERIVED`, explicitly "not a TCO and not a price". The PROTECT/SAIL arithmetic notes label
the EUR 99 SENSE figures as "non-attributable placeholders", not module prices. Hypotheses are kept
separate from observations, `PROFITABILITY_NOT_ESTABLISHED` is stated for every family and bundle,
and no margin, CAC, BOM or supplier quote is invented.

---

## 9. Audit F — Product governance

**Result: VERIFIED.** Nothing in this milestone weakens a canonical restriction:

- Canonical nine families and six bundles unchanged; `git diff` touches no file under
  `docs/marea/products` or `docs/marea/bundles`; validator `MK-34` asserts 9 products / 6 bundles and
  the global restrictions on every run; `test:products` 52/52 and `test:bundles` 35/35 pass.
- `governance-status.json` keeps `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`,
  `SOURCE_IP_CLEARANCE = NOT_CLEARED`, `PRODUCT_SALES = BLOCKED`, `COMMERCIAL_PUBLICATION = BLOCKED`,
  `PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED`, `productsForSale = 0`, `compatibilityRowsTested = 0`,
  `approvedBundlePrices = 0`, `hardwareIncludedInFleetByDefault = false`,
  `instantAlertGuarantee = false`, `nmea2000Certified = false`, `remoteHelmControl = PROHIBITED`.
- PILOT: safety gate `BLOCKED`, no sea trial, no E-stop/motor isolation found; no release-ranked
  product can override it (PILOT is ranked last on commercial score and explicitly deferred).
- WATCH: no guaranteed/instant alert, ingestion `NOT_VERIFIED`, connectivity dependence stated.
- FLEET: hardware optional, not included by default, no SLA, no price.
- SAIL/COMPLETE: "no fixed turnkey price permitted" carried from MC-08; the historical figures are
  `HYPOTHESIS_UNAPPROVED` / traceability-only and are never presented as purchasable.
- AIS: receive-only distinction preserved; no NMEA 2000 certification claim; GPL decoder licence
  listed as undecided.
- All nine families and six bundles remain `NOT_FOR_SALE`; no approved price, no compatibility
  `TESTED`/`SUPPORTED` row, no certification appears anywhere in the market-validation tree.

---

## 10. Audit G — Recommendation integrity

**Result: VERIFIED.** Weights are frozen (timestamp `2026-10-31`), identical across product and
bundle frameworks, sum exactly 1.0, and were applied before scoring. Every score recomputes:

- Products: NAV 4.2300, WEATHER 3.7700, WATCH 3.3800, HUB 3.3700, FLEET 3.2200, AIS 2.9000,
  SENSE 2.8400, PILOT 2.6400, DISPLAY 2.4700 — all equal the stored `commercialScore` to the
  published precision (max difference 0.0000).
- Bundles: PROTECT 3.3700, START 3.2700, FLEET 3.2200, CRUISE 2.9900, SAIL 2.6500, COMPLETE 2.3100 —
  all match.
- Rankings reproduce exactly (`NAV > WEATHER > WATCH > HUB > FLEET > AIS > SENSE > PILOT > DISPLAY`;
  `PROTECT > START > FLEET > CRUISE > SAIL > COMPLETE`) and match the executive report and the
  prioritisation document.
- Commercial attractiveness is a separate field from `releaseReadiness`; every family and bundle stays
  `BLOCKED` with named blockers, and the framework states that no legal/safety/licensing score can be
  offset by commercial attractiveness. The top commercial score (NAV) is still blocked by data,
  chart, IP and brand restrictions — no conflation.
- Nine geographic scores recompute (Rías Baixas 4.00 rank 1; Baleares 3.55; Catalonia 3.30; A Coruña
  3.15; Northern Portugal 2.75; Cantabria 2.50; Asturias 2.20; Basque Country 2.05; A Mariña 2.00).
- All 19 decisions in `decision-links.json` resolve to existing claim IDs; each carries an evidence
  threshold and a confidence label; none changes a lifecycle status or approves a price.

---

## 11. Audit H — Repository quality

**Result: VERIFIED.** Details in §2 and §3. Summary:

- All five required gates pass on the audited commit; `git diff --check` is clean; the full diff
  matches the declared scope (docs + validator/test + script wiring only).
- The new scripts are offline, read-only, dependency-free, contain no secret, make no network call
  and write nothing into the repository; the test suite writes only in an OS temp directory.
- No merge, deploy, publication, outreach, purchase, checkout activation or canonical-contract change.
- One integration consequence is expected and documented (F-06): the audit-data file must be added
  to the manifest before the market gate returns to 40/40 (and the unit suite to 43/43).

---

## 12. Findings register

| ID | Severity | File:line | Required correction | Status |
| --- | --- | --- | --- | --- |
| F-01 | **MAJOR** | `MC09-EXECUTIVE-REPORT.md:99` | Reword the absolute "Ningún competidor…" claim to the observed sample ("ningún competidor observado…", as `MC09-BUNDLE-BENCHMARKS.md:13` already does) and state that installation is sold as a separate channel service | OPEN |
| F-02 | MINOR | `MC09-BUNDLE-BENCHMARKS.md:36,96` | Use EUR 649 as the Orca year-one equivalent for START and guard mode (the first Smart Navigation year is included with Core/Display per SRC-CMP-001); keep 698/798 only as labelled year-two totals | OPEN |
| F-03 | MINOR | `MC09-EXECUTIVE-REPORT.md:273-275` | Change the economics source count from 6 to 5 (evidence-economics.json has SRC-ECO-001/002/003/005/006; breakdown currently sums to 116 vs the 115 total) | OPEN |
| F-04 | MINOR | `data/manifest.json:15` | Reword "Eight evidence-based buyer segments" to "Eight hypothetical buyer archetypes (HYPOTHETICAL_ARCHETYPE)" to match `buyer-segments.json` and `MC09-BUYER-SEGMENTS.md:14` | OPEN |
| F-05 | INFORMATIONAL | `MC09-EXECUTIVE-REPORT.md:271` | "26 documentos y 22 ficheros de datos" mixes deliverables with documents: 26 deliverables D1–D26, 25 Markdown documents after this review, 22 JSON data files | OPEN (non-blocking) |
| F-06 | INFORMATIONAL (integration) | `data/manifest.json` | Add `data/review-findings.json` with owner `agent-f-auditor`; re-run `test:market` (expect 40/40) and `test:market:unit` (expect 43/43) | OPEN — expected Lead step |
| F-07 | INFORMATIONAL | sources | Residual audit limits: Getxo PDF timed out twice (32.02 EUR/h not re-verified), one buyer-forum fetch failed, 62/115 sources lack `publishedAt`. No mandatory correction; may be accepted as residual risk | OPEN — residual |
| F-08 | INFORMATIONAL | `MC-09-DELIVERY.md:3-6`; exec report | Final status/wording must be set in the delivery-update commit after the review, and §6/§8 populated with exact gate results and the final SHA/PR URL | OPEN — delivery step |

### F-01 detail (MAJOR)

`MC09-EXECUTIVE-REPORT.md:99-101` states as fact that no competitor sells a complete installed and
commissioned solution, while the underlying benchmark document (`MC09-BUNDLE-BENCHMARKS.md:13`)
correctly says "**No observed** competitor sells a single installed, commissioned package" and its
method section explains the comparison is a composition of separately sold parts. The sampled
evidence base is 27 competitor sources / 48 observations, not a census; installation is a
dealer/installer service routinely sold separately in this market, which the executive report itself
says two lines later ("la instalación se factura aparte"). The universal negative is therefore not
established by the evidence and overstates a market gap in the decision document. This is fixable by
wording alone; no new evidence is needed. It is MAJOR because it is the summary's central competitive
conclusion, not a detail.

### F-02 detail (MINOR)

`help.getorca.com` (SRC-CMP-001) states: "A year of Smart Navigation is included in the purchase of an
Orca Core or an Orca Display." `MC09-BUNDLE-BENCHMARKS.md:36` nevertheless computes START-equivalent
year one as EUR 649 + 49 (Orca Plus) = EUR 698, and line 96 computes Orca guard mode as EUR 649 + 149
(Smart Navigation) = EUR 798. Line 55 of the same document correctly notes "+ one year Smart
Navigation included" for the CRUISE row. The inconsistency overstates the competitor's year-one cost
by EUR 49 and EUR 149; it is conservative against MAREA and does not change the direction of any
conclusion, but the comparison is not reproducible from the cited source as written.

### F-03 / F-04 / F-05 detail

- Source count: `20 + 27 + 20 + 6 + 38 + 5 = 116`, but the register and evidence files total 115;
  `evidence-economics.json` contains 5 sources (there is no SRC-ECO-004). Script count and
  `MC09-SOURCE-REGISTER.md:16` both give 115.
- Manifest purpose: all eight segments have `archetypeStatus: HYPOTHETICAL_ARCHETYPE`; the document
  says "Every segment is a HYPOTHETICAL_ARCHETYPE … No archetype is a real [buyer]". The manifest
  calls them "evidence-based".
- Document count: 24 `.md` files exist at `566343e` (including `data/README.md`); this review is the
  25th; the 22 data files are JSON. "26" is the count of deliverables D1–D26.

---

## 13. Round-2 re-verification list

1. F-01: confirm the executive report now scopes the competitor negative to observed evidence and
   does not imply the installation service is absent from the market.
2. F-02: confirm the Orca year-one totals in `MC09-BUNDLE-BENCHMARKS.md` are corrected or explicitly
   justified, and that CRUISE/START/PROTECT now treat the included Smart Navigation year consistently.
3. F-03: confirm the executive report says 5 economics sources and the breakdown sums to 115.
4. F-04: confirm `manifest.json` no longer calls the buyer segments "evidence-based".
5. F-05/F-08: confirm the delivery-update wording, exact gate results, final SHA and PR URL.
6. F-06: confirm `data/review-findings.json` is listed in the manifest and re-run
   `npm run test:market` (expect 40/40) and `npm run test:market:unit` (expect 43/43).
7. Re-run `test:products`, `test:bundles`, `test:brand` and `git diff --check`; confirm the diff scope
   of the correction commit contains only the intended documentation/data edits.

---

## 14. Verdict and honest limits

**Round-1 verdict: PARTIAL — conditional.** This is not a judgement that the research is weak; the
arithmetic, source handling, methodology, economics, governance, ranking and repository work are
substantially verified, and no BLOCKING finding exists. PASS is withheld only because the decision
document overstates one central competitive claim (F-01, MAJOR) and three small consistency defects
(F-02/F-03/F-04) remain open, with one known integration step (F-06) that currently reds the market
gate for a non-research reason. If the corrections above are made and re-verified in round 2, the
desk-research scope should be signed off as PASS.

What this audit does **not** establish, and what the research correctly does not claim:

- No customer demand, willingness to pay, prevalence, installation cost, BOM, supplier quote, channel
  margin or profitability has been measured; `PROFITABILITY_NOT_ESTABLISHED` and
  `customerDemandEmpiricallyValidated = NO` remain accurate.
- Competitor prices are observations at 2026-10-31, not offers or willingness to pay; several are
  secondary, out of stock, backordered, promotional or test-time (all declared).
- The TAM/SAM/SOM model is a partial, low-confidence scenario model with an admitted mixed proxy
  base — it is not a forecast, and MAREA has no measured installer network.
- MC-10 is not started: it requires real recruitment, consent and separate authorisation. No
  publication, sale, deploy, outreach or customer contact is authorised by this review, and the
  commercial status remains **BLOCKED / NOT_FOR_SALE**.

Residual audit limits: two source pages could not be re-opened in this environment (Getxo tariff PDF,
one buyer forum thread), 62 sources lack `publishedAt`, and the auditor did not re-verify every one of
the 115 sources — sampling was 25 across all six workstreams plus the full arithmetic reproduction
required by the brief.
