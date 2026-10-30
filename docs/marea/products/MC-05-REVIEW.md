# MC-05 — Independent review of the MAREA NAV / HUB / AIS product definitions

| Field | Value |
| --- | --- |
| Document ID | MC-05 / D13 — INDEPENDENT-REVIEW |
| Milestone | MC-05 (Master Prompt 05/36) — product-definition batch 1 |
| Reviewer | `qa-reviewer` — Independent Product Reviewer (not an author of any MC-05 deliverable) |
| Commit under review | `88c4300` on `feature/marea-mc05-nav-hub-ais-products`; base `8ac6d69` (MC-04 HEAD) |
| Post-verdict addendum | `71a0a41` (corrective commit for DEF-01..DEF-05) — see §11; original verdict and findings unchanged |
| Review date | 2026-10-30 |
| Review scope | 13 product-definition deliverables + validator/contract + decision D-007 + real diff vs `8ac6d69` |
| Verdict | **PASS** for the MC-05 product-definition scope (with 5 MINOR corrective actions, no BLOCKING defect) |
| Commercial release status | **BLOCKED — `NOT_FOR_SALE`**; brand/IP `NOT_GRANTED` / `NOT_CLEARED`; nothing released, certified, stocked or available |

This report verifies the real artefacts on disk at commit `88c4300`. It is not a release, certification,
stock or availability statement, and it must not be quoted as one. A definition PASS is not a commercial
release.

---

## 1. Scope and evidence inspected

Reviewed at `88c4300` (clean working tree at start of the final pass; `git status --porcelain` empty):

| Deliverable | File | Verified size |
| --- | --- | --- |
| Conventions | `docs/marea/products/README.md` | 234 lines |
| D1 NAV dossier | `docs/marea/products/MAREA-NAV-COMMERCIAL-SPEC.md` | 516 lines, F01–F24 |
| D2 HUB dossier | `docs/marea/products/MAREA-HUB-COMMERCIAL-SPEC.md` | 614 lines, F01–F24 |
| D3 AIS dossier | `docs/marea/products/MAREA-AIS-COMMERCIAL-SPEC.md` | 554 lines, F01–F24 |
| D4 editions | `docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md` | 322 lines |
| D5 compatibility | `docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` | 431 lines, 21 rows, 0 `TESTED` |
| D6 pricing/channel | `docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL.md` | 400 lines |
| D7 journeys | `docs/marea/products/CUSTOMER-JOURNEYS-NAV-HUB-AIS.md` | 401 lines, 17 stages × 3 products |
| D8 copy | `docs/marea/products/copy/{nav,hub,ais}.{es,en}.md` | 236/236, 238/238, 243/243 lines |
| D9 asset requirements | `docs/marea/products/PRODUCT-ASSET-REQUIREMENTS.md` | 541 lines, 30 requirements |
| D10 contract | `docs/marea/products/product-definitions.batch-01.json` | 2,064 lines, 3×24 fields, 30 assets |
| D11 validator | `scripts/check-marea-products.mjs` | 1,380 lines, 22 checks |
| D11 tests | `scripts/check-marea-products.test.mjs` | 684 lines, 37 tests |
| Decision | `docs/marea/execution/DECISION-LOG.md` D-007 (line 216) | +78 lines |
| Scripts wiring | `package.json` lines 16–17 (`test:products`, `test:products:unit`) | +2 lines only |

Method: read the artefacts (not the delivery summaries), re-ran every repo gate against `88c4300`, inspected
the real diff, independently mutated the contract to confirm the validator fails when rules break, and
re-fetched a sample of the externally cited comparator pages. Findings below carry `file:line` or command
output.

Real diff scope: `git diff --stat 8ac6d69..HEAD` = 20 files, 9,655 insertions, 0 deletions:
`docs/marea/execution/DECISION-LOG.md`, 17 files under `docs/marea/products/`, `package.json`,
`scripts/check-marea-products.mjs`, `scripts/check-marea-products.test.mjs`. `git diff 8ac6d69..HEAD --
src public e2e .github` is empty (exit 0). The package diff adds only the two test scripts; dependency blocks
are unchanged.

---

## 2. Verdict

**PASS — MC-05 product-definition scope.**

The three products are defined to the required 24-field standard, with separate evidence and readiness lines,
consistent edition authorities, honest AIS receive-only and NAV non-ECDIS discipline, unapproved prices kept
out of copy, a machine-readable contract that structurally prevents accidental sale, and a validator with a
37-test negative suite; every required repository gate passes at `88c4300`. I found no false claim, invented
fact, approved price, purchasable state, missing required field, unsolvable cross-document contradiction,
dead negative test or MC-05-caused gate regression. Five MINOR defects remain (formatting-gate coverage, a
bundle-price figure that conflicts with the README price rule, edition-verdict semantics in the JSON, CTA
vocabulary drift between two governance documents, and one over-broad HUB delivery sentence); none of them
blocks the definition scope, changes a customer-facing fact or makes any product sellable. They should be
corrected in the MC-05 follow-up commit or recorded as accepted debt.

**Commercial release: BLOCKED — `NOT_FOR_SALE`.** All three products are `DEFINED`, `PUBLICATION_STATE =
INTERNAL_ONLY`, `BRAND_CLEARANCE = NOT_GRANTED`, `SOURCE_IP_CLEARANCE = NOT_CLEARED`, `availability =
NOT_FOR_SALE`, `pricing = HYPOTHESIS_UNAPPROVED`. MAREA is a proposed, uncleared brand. No SKU is orderable,
no price is approved, no capacity is certified, no stock or lead time exists and no chart/weather/data right is
granted. This verdict does not change any of that.

---

## 3. Per-question findings (Q1–Q20)

| # | Question | Result | Evidence |
| --- | --- | --- | --- |
| 1 | All 24 fields complete for all three products (Definition/Evidence/Owner/Blockers/Commercial readiness, substantive) | **PASS** | F01–F24 headings in all dossiers (NAV `:94–319`, HUB `:88–254`, AIS `:79–289`); label count = 24 Definition / 24 Evidence / 24 Owner / 24 Blockers / 24 Readiness per dossier (command `Select-String`); `dossiers.fields` and `json.fields` PASS; D10 has 72 field summaries (`node` inspection: `total fields: 72`) |
| 2 | Three propositions commercially distinct (NAV software / HUB hardware integration / AIS receive-only hardware) | **PASS** | D4 `:266–273` comparison summary; dossiers F01/F05 (NAV `:96`, HUB `:89`/`:116–122`, AIS `:80`/`:139–142`); D4 §5 boundaries `:257–264` |
| 3 | Final features defined without pretending current implementation exists | **PASS** | README `:94–108` evidence classes; D4 `:49–51` "**No capability in MC-05 is `VERIFIED` as a sellable product feature**"; D5 `:79–82` 0 `TESTED`; every dossier F24 records `OPEN`/`BLOCKED` acceptance |
| 4 | Edition differences meaningful; AIS Connected conditional verdict honest | **PASS** | NAV split D4 `:84–108` (N10/N11/N12/N14–N19); HUB D4 `:150–173` (H04/H11/H12/H13/H19); AIS D4 `:214–231` (A04–A09); D4 `:65` `CONDITIONAL / NOT_YET_JUSTIFIED`; D3 `:293–321` echo; D10 `editionVerdict.verdict = NOT_YET_JUSTIFIED` (JSON `:1572`); AIS copy `ais.es.md:88` / `ais.en.md:88` disclose the condition |
| 5 | Inclusions explicit per product/edition; antenna/splitter/cabling/installation/NAV licence/HUB not implied free | **PASS** (with DEF-05 wording note) | Copy included/excluded blocks: NAV `nav.en.md:92–97` and `:107`, HUB §11 (`hub.en.md`), AIS §11 (`ais.en.md`); D4 `:257–264`; AIS `D3:152–165` says antenna/splitter/installation/NAV/HUB not included and accessory list separate; HUB `D2:131` installation only when purchased. Wording issue in D2 F04 recorded as DEF-05 |
| 6 | Prices correctly identified as unapproved hypotheses and absent from copy/purchasable surfaces | **PASS** | README `:184–196`; all edition `priceHypothesis.status = HYPOTHESIS_UNAPPROVED` (JSON, e.g. `:351–…`); copy scan for `€`/EUR/price numbers returned 0 matches in all six files; `pricing` check PASS; D6 `:384–388` "No approved price exists"; no price appears in checkout/catalogue (diff touches no commerce code) |
| 7 | Chart/data/weather/tide rights correctly restricted (licensed entitlement, not included; D-01..D-03) | **PASS** | README `:163–165`, `:176–177`; D1 domains 3/9/10 (`:132–…`), F12 `:219–225`; copy `nav.en.md:157–162`; D4 N04/N05 `:87–88`, N14/N16 `:97–99`; block `D-01` in every relevant traceability table |
| 8 | HUB compatibility conditional on real evidence (no invented models/firmware/tests; NMEA 2000 unresolved; Signal K not blanket) | **PASS** | D5 `:51–61` rules, `:79–82` status counts, `:163–193` all rows `NOT_VERIFIED` for model/version, `:323–339` blocked register and `:379–395` non-claims; D2 `:145` NMEA 2000 not implemented/not certified; copy `hub.en.md:113–121` |
| 9 | AIS receive-only consistently described; no transmission/transponder/collision-avoidance claim | **PASS** | D3 `:31–32`, `:80`, `:113`, `:238–240`, `:408–411`; D4 `:205–206`, A12 `:221`; copy `ais.es/en` disclaimers and FAQ; content scan matched only negations/prohibitions |
| 10 | Names exactly `MAREA NAV/HUB/AIS`; no hyphenation, no ®/™ | **PASS** | README `:46–48`; content regex over all product docs+copy returned only README's prohibition wording and file-path references; D10 `displayName` check; `names` validator check PASS |
| 11 | Copy genuinely bilingual (natural ES/EN, parity of claims/editions, no contradictions) | **PASS** | Line-count parity 236/236, 238/238, 243/243; identical numbered section structure 24/24; edition-table row parity 16/16 (NAV), 11/11 (HUB), 12/12 (AIS) — independently counted; ES uses `tú`, EN neutral professional "you" (sampled full NAV pair + HUB/AIS sections); disclaimers verbatim per claims policy §9; head-to-head table differences resolved during this review and re-verified |
| 12 | Subscription obligations clear (term, renewal, cancellation, exportable, no double billing for WEATHER) | **PASS** | NAV F12 `:219–225`; copy `nav.en.md:147–153`; D6 `:324–339` framework with every line `OPEN`/`HYPOTHESIS`; WEATHER sharing stated only as intended/not implemented (D6 `:336`, D7 `:197`, copy `nav.en.md:61`, `:140`) |
| 13 | Journeys complete (17 stages × 3 products, all required columns, cross-product, failure/recovery) | **PASS** | D7 `:66–88` NAV, `:92–114` HUB, `:118–140` AIS — independently counted 17/17/17 stage rows, 9 columns each; 8 cross-product journeys `XJ-1…XJ-8` `:150–218`; failure/recovery `FR-01…FR-09` `:237–247`; trust moments `TS-01…TS-08` `:253–262`; acceptance `AC-01…AC-17` `:296–314`; gaps `GAP-01…GAP-18` `:322–341` |
| 14 | Warranty/support claims safe and realistic (no invented SLA, warranty years, certification, service capability) | **PASS** | D1 F19 `:275–281`; D2 F19 `:214–219`; D3 F19 `:251–256`; copy `nav.en.md` §18 / `hub.en.md` / `ais.en.md` "terms defined at purchase"; content scan found only prohibitions of SLA/24-7/warranty length; no 24/7, response-time, warranty-year or certification claim exists |
| 15 | Installer economics bounded (no invented day rates, times, discounts, reseller terms) | **PASS** | D6 `:278–322` channel responsibilities all `OPEN`/`BLOCKED`, §10.4 "no percentage is published"; D2 F10 `:152` "No installation duration and no installation price are stated"; D7 `GAP-05` `:328`; copy says installation quoted separately |
| 16 | Future visual assets fully specified without fake generation (`BLOCKED_ON_IMAGE_GENERATION`, real MC-04 ids, valid paths) | **PASS** | D9 `:24–50` generation gate; 30 unique requirement blocks (10/10/10) independently counted; block statuses 12 `BLOCKED_ON_IMAGE_GENERATION` + 18 `CONCEPT`, 0 `REAL_PRODUCT`; 20 distinct `docs/marea/brand/assets/...` paths all exist; 25 cited `MR-*` ids all present in `MC-04-ASSETS.yaml`/`MC-04-BRIEFS.yaml`; no generated file created |
| 17 | Machine-readable contract prevents accidental sales; negative tests actually fail when rules break | **PASS** (with OBS-01 coverage gap) | D10: `lifecycleState = DEFINED`, `availability = NOT_FOR_SALE`, `pricing = HYPOTHESIS_UNAPPROVED`, `publicationState = INTERNAL_ONLY`, no `purchasable`/`sku`/`orderable`/`stock` keys anywhere; validator 22 checks incl. lifecycle/availability/pricing/clearance/nmea/charts/disclaimers; 37 tests pass; independent mutations by the reviewer: removing `#### F17` heading → `FAIL dossiers.fields` exit 1; broken `evidenceRefs` entry → `FAIL json.traceability` exit 1 |
| 18 | MC-02 blockers traceable from dossiers (ids present, correctly scoped per product) | **PASS** | README `:202–209` minimum sets; dossier traceability annexes (NAV `:452–480`, HUB `:486–535`, AIS `:456–476`); all required ids present per dossier (script check: ALL PRESENT for all three); D10 `mc02Blockers` exactly NAV 15 / HUB 11 / AIS 9 matching README |
| 19 | Source/ownership rights and trademark status still restricted (`NOT_CLEARED`/`NOT_GRANTED`) | **PASS** | README `:26–28`; status blocks in all dossiers; D10 `globalRestrictions` = `trademarkLegalClearance: NOT_GRANTED`, `sourceIpClearance: NOT_CLEARED`; no ®/™ attached to MAREA anywhere; `clearance` check PASS; D-007 records no clearance change |
| 20 | Final diff clean and limited to authorised scope | **PASS** | `git diff --stat 8ac6d69..HEAD` = 20 authorised files; `git diff 8ac6d69..HEAD -- src public e2e .github` empty (exit 0); `package.json` diff = two script lines only, no dependency change; secrets scan of the diff = no keys/credentials; `git diff --check` exit 0; no price/stock/checkout/OPEN-MARINE change |

No question is answered FAIL. Defects found are recorded in §5 and do not change the PASS above.

---

## 4. Commands actually run and results (at `88c4300`)

| # | Command | Exit | Result |
| --- | --- | --- | --- |
| 1 | `node scripts/check-marea-products.mjs` | 0 | `Summary: 22 checks run, 22 passed, 0 failed; 15 of 15 scoped files read.` / `RESULT: PASS` |
| 2 | `node --test scripts/check-marea-products.test.mjs` | 0 | `tests 37`, `pass 37`, `fail 0` |
| 3 | `npm run test:products` | 0 | 22/22 PASS, `RESULT: PASS` |
| 4 | `npm run test:products:unit` | 0 | 37/37 pass |
| 5 | `npm run format:check` | 0 | "All matched files use Prettier code style!" (see DEF-01: the new scripts are not in the checked list) |
| 6 | `npx prettier --check scripts/check-marea-products.mjs scripts/check-marea-products.test.mjs` | **1** | both files `[warn]` code-style issues (DEF-01). Not a repo gate; the repo's `format:check` list excludes them |
| 7 | `npm run test:brand` | 0 | `21 checks … 21 passed`, `RESULT: PASS`, 24 files scanned |
| 8 | `npm run test:brand:unit` | 0 | `tests 13`, `pass 13`, `fail 0` |
| 9 | `npm run test:i18n` | 0 | server-rendering and i18n foundation checks passed |
| 10 | `npm run test:commerce` | 0 | commerce integration checks passed |
| 11 | `npm run test:seo` | 0 | SEO checks passed, 101 sitemap URLs |
| 12 | `npm run test:backup` | 0 | backup/restore verified (snapshot, checksums, integrity, FKs, counts) |
| 13 | `npm run build` | 0 | Angular SSR/prerender build completed; `Output location: …\dist\embarcarte` |
| 14 | `npm run test:e2e` | 0 | `15 passed (41.0s)` |
| 15 | `npm audit --omit=dev --audit-level=high` | 0 | `found 0 vulnerabilities` |
| 16 | `git diff --check` | 0 | no whitespace errors |
| 17 | `git diff 8ac6d69..HEAD -- src public e2e .github` | 0 | empty output |
| 18 | `git status --porcelain` (before writing this report) | 0 | empty — clean tree at the reviewed commit |
| 19 | Independently verify D6 comparator sample (web) | — | Orca help page reproduced €49/yr Plus and €149/yr Smart Navigation; Digital Yacht EU receiver page reproduced AIS100 €300 and AIS100PRO €350; PredictWind reproduced USD 29/249/499 with tax added at checkout. See §7 for what this does and does not establish |
| 20 | Independent validator mutation A: remove `#### F17` heading | 1 | `FAIL dossiers.fields (1 failure)` — rule is live |
| 21 | Independent validator mutation B: break an `evidenceRefs` entry | 1 | `FAIL json.traceability (1 failure)` — rule is live |
| 22 | Secrets scan of `git diff 8ac6d69..HEAD` | — | no API keys, tokens, passwords or private keys found |
| 23 | Structural spot checks (independent script) | — | D7 stages 17/17/17; D9 30 unique requirements, 12 blocked + 18 concept; D5 21 rows = 16 `UNKNOWN — NOT_TESTED`, 4 `BLOCKED`, 1 `PROHIBITED`; copy edition-table parity 16/16, 11/11, 12/12 |

---

## 5. Defect register

No **BLOCKING** defect. Findings are MINOR or OBSERVATION; none makes a false customer claim, an approved
price, a purchasable SKU or a missing required field, and none is a gate regression caused by MC-05.

### MINOR

**DEF-01 — New validator/test scripts are outside the repository formatting gate and are not Prettier-formatted.**
- Evidence: `package.json:18–19` (`format`, `format:check`) still list only the pre-MC-05 file set; `npx prettier
  --check scripts/check-marea-products.mjs scripts/check-marea-products.test.mjs` exits 1 with `[warn]` on both
  files. `npm run format:check` exits 0 because it never sees them.
- Why it matters: MC-05 adds 2,064 lines of tooling that the repo's own formatting check silently skips, so a
  future edit can drift and the gate will stay green. This is consistent with a pre-existing pattern
  (`scripts/check-i18n.mjs` and `scripts/check-commerce.mjs` also fail Prettier and are outside the list), so it
  is not a regression, but MC-05 should not add to that debt.
- Required correction: add both new scripts to the `format` and `format:check` arrays in `package.json` and run
  `npx prettier --write scripts/check-marea-products.mjs scripts/check-marea-products.test.mjs`; or record an
  explicit decision that the format list is a curated subset. Inside MC-05 scope (`package.json` is authorised).
- Severity: MINOR. Not a definition or truthfulness defect.

**DEF-02 — D3 cites a bundle price figure that the README price allow-list does not permit.**
- Evidence: `MAREA-AIS-COMMERCIAL-SPEC.md:266` and `:533` cite the MAREA CRUISE hypothesis **EUR 1,399**;
  `README.md:186` says the six edition figures in §8 are "the only price figures allowed in the dossiers".
  The figure is traceable to `COMMERCIAL-PORTFOLIO.md:117`, is labelled "hypothesis" and "ecosystem context
  only", and is not in copy or any purchasable surface — so it is not a false claim.
- Why it matters: a dossier breaks the milestone's own binding price rule, and the validator does not catch it
  (its pricing check does not reject this figure). A later reader cannot tell whether the allow-list or the
  dossier is authoritative.
- Required correction: either amend `README.md` §8 to allow the portfolio's bundle hypothesis as quoted
  ecosystem context, or remove the EUR 1,399 figure from D3 F21/§12 and reference `COMMERCIAL-PORTFOLIO.md` by
  id only. Inside MC-05 scope.

**DEF-03 — D10 edition verdict uses `CONDITIONAL` for the five non-conditional editions.**
- Evidence: JSON `:352`, `:378`, `:972`, `:1000`, `:1542`, `:1571` give `editionVerdict.status =
  "CONDITIONAL"` to all six editions; only AIS-CONNECTED adds `"verdict": "NOT_YET_JUSTIFIED"` (`:1572`).
  D4 records NAV/HUB editions as `DEFINED — split retained` (`D4:60–64`) and reserves `CONDITIONAL /
  NOT_YET_JUSTIFIED` for AIS-CONNECTED (`D4:65`). The JSON rationale text explains the intent ("no edition is
  approved at MC-05; publication remains conditional on gates"), so the meaning is defensible but the field
  name collides with the AIS-only edition verdict.
- Why it matters: the machine-readable contract is the future catalogue source; reading `status = CONDITIONAL`
  for NAV-ESSENTIAL as "this edition may not exist" would misstate D4. No customer surface is affected today.
- Required correction: separate the two concepts — e.g. `status: "DEFINED"` plus `publicationConditional: true`
  for the five retained editions, keeping `CONDITIONAL` + `verdict: NOT_YET_JUSTIFIED` for AIS-CONNECTED; or
  rename the field to `publicationStatus` and document the vocabulary. Inside MC-05 scope (D10).

**DEF-04 — DEFINED call-to-action vocabulary differs between two brand-governance documents and one deliverable.**
- Evidence: `COMMERCIAL-BRAND-CLAIMS-POLICY.md:140` allows `"See the specification"` / `"Register interest where
  authorised"` at `DEFINED`; `BRAND-VOICE-ES-EN.md:184` prescribes «Ver la definición del producto» / "View the
  product definition"; `CUSTOMER-JOURNEYS-NAV-HUB-AIS.md:53` describes its CTA set as "the claims-policy §5
  equivalents" while quoting the brand-voice wording plus "Request a compatibility review". D8 copy and D1 F20
  use the claims-policy pair (`copy/nav.en.md:202` "See the specification"; `D1:285` now matches).
- Why it matters: three governance surfaces disagree about the exact permitted CTA at the only lifecycle state
  used in this milestone, and a future page team could cite the wrong one. There is **no purchase CTA
  anywhere** and the copy is `INTERNAL`/unpublished, so there is no current customer-facing risk.
- Required correction: designate one authority (claims policy §5 is the enforcement document), align
  `BRAND-VOICE-ES-EN.md` §9 and `D7:53`, and add the secondary compatibility-review CTA explicitly to the
  policy's DEFINED row if it is intended. Inside MC-05 scope (D7) plus a one-line brand-doc correction.

**DEF-05 — D2 F04 describes professional installation as the delivery route, while F07/F10/D4 treat it as optional.**
- Evidence: `MAREA-HUB-COMMERCIAL-SPEC.md:110` says the finished end state is "delivered through an EMBARCARTE
  professional installation service with handover, training and support"; `D2:131` says installation is included
  "only when the configuration is purchased as professionally installed"; `D2:152` permits self-install inside a
  documented low-risk set; `D4:170` (H21) marks professional installation `OPTIONAL (service)` in both editions.
- Why it matters: an inclusion-adjacent statement in F04 is broader than the edition authority and could be
  quoted as "installation included". It does not create a false price or availability claim and F07/F10/D4
  correct it elsewhere.
- Required correction: reword F04 to "delivery and commissioning are intended to be available through an
  EMBARCARTE professional installation service for every configuration outside the documented low-risk
  self-install set". Inside MC-05 scope (D2).

### OBSERVATION

**OBS-01 — Three validator checks have no dedicated negative test.**
22 checks are covered by 37 tests, but `files.scope` (`check-marea-products.mjs:619`), `json.contract`
(`:629`) and `json.traceability` (`:939`) have no corresponding mutation test in
`check-marea-products.test.mjs`. I independently confirmed `json.traceability` does fail when broken, so the
checks are live; the gap is test coverage, not a dead assertion. Recommend three mutation tests before the
validator is reused for batches 2/3.

**OBS-02 — Pre-existing formatting debt recorded so it is not misattributed.**
`scripts/check-i18n.mjs` and `scripts/check-commerce.mjs` (MC-01/MC-02 era, outside the `format:check` list)
also fail `npx prettier --check`. This predates MC-05 and is not counted against this milestone.

**OBS-03 — Two governance artefacts are intentionally produced after this verdict.**
`docs/marea/products/MC-05-DELIVERY.md` (D12) and the `MASTER-PROMPT-REGISTRY.md` row 05 status update (still
`PLANNED` / `—` at `88c4300`) do not exist yet. The Lead confirmed they follow this verdict; they are therefore
not treated as defects. The registry row must be updated with the delivered evidence and this verdict before
the milestone is declared closed, because D-007 itself says the status is set there.

---

## 6. Gate / regression table

| Gate | Status at `88c4300` | Evidence |
| --- | --- | --- |
| `node scripts/check-marea-products.mjs` | PASS | 22/22, exit 0 |
| `node --test scripts/check-marea-products.test.mjs` | PASS | 37/37, exit 0 |
| `npm run test:products` | PASS | 22/22, exit 0 |
| `npm run test:products:unit` | PASS | 37/37, exit 0 |
| `npm run format:check` | PASS (exit 0) — coverage caveat | checked list does not include the two new scripts (DEF-01) |
| `npm run test:brand` | PASS | 21/21, 24 files, exit 0 |
| `npm run test:brand:unit` | PASS | 13/13, exit 0 |
| `npm run test:i18n` | PASS | exit 0 |
| `npm run test:commerce` | PASS | exit 0 |
| `npm run test:seo` | PASS | exit 0, 101 sitemap URLs |
| `npm run test:backup` | PASS | exit 0 |
| `npm run build` | PASS | exit 0 |
| `npm run test:e2e` | PASS | 15 passed, exit 0 |
| `npm audit --omit=dev --audit-level=high` | PASS | 0 vulnerabilities |
| `git diff --check` | PASS | exit 0 |
| Diff scope (`src public e2e .github`) | PASS | empty diff, exit 0 |
| Secrets / credentials in diff | PASS | none found |
| Dependency block unchanged | PASS | `package.json` diff = 2 script lines only |
| Prettier on the two new scripts (not a repo gate) | **FAIL** | exit 1, both files `[warn]` — DEF-01 |

No gate regressed because of MC-05. The only failing command is the out-of-band Prettier check of the two new
scripts, which the repo's own `format:check` does not include (DEF-01).

---

## 7. Honest limitations of this review

- **External comparator evidence.** I re-fetched only three of D6's comparator rows (Orca, Digital Yacht,
  PredictWind), as required. They reproduced at the cited URLs on the review date. I did **not** re-verify the
  Savvy Navvy, Garmin, Raymarine, Yacht Devices (SVB), Orca Core, AISnet/AISnode or weatherdock/Comar rows.
  Web pages change and prices are date-stamped "checked 2026-10-30"; they are context only, never MAREA offers.
  The Spanish Digital Yacht product pages I fetched did not render a price server-side, so the EUR 360 ES-
  storefront figure could not be reproduced directly by me; I rely on D6's dated observation for that one, while
  the EU store page independently showed AIS100 EUR 300 and AIS100PRO EUR 350.
- **Hardware, RF, compliance, sea trial.** No hardware exists; no BOM, enclosure, EMC/RED/LVD/GPSR/CRA evidence,
  RF measurement, antenna test, range measurement, thermal/ingress result, firmware/update test or sea trial was
  verified — none is claimed by the dossiers either. Every such field is `OPEN`/`BLOCKED`. I did not verify
  physical presence, because it cannot exist at a definition milestone.
- **Legal / IP / data rights.** Trademark clearance, source-IP ownership, chart/ENC distribution, weather/tide
  provider terms and consumer-law advice were **not** verified and are not claimed. All remain
  `NOT_GRANTED`/`NOT_CLEARED`; MAREA remains a proposed brand.
- **Commercial evidence.** No supplier quote, BOM cost, channel agreement, installer day rate, measured
  installation time, willingness-to-pay evidence or stock/lead time was verified, because none exists. No
  margin, price approval or availability conclusion is drawn here.
- **Implementation evidence.** No product page, account, entitlement, checkout, configurator, support system or
  route exists; journeys and copy are drafts. I verified copy text and structure, not rendering, accessibility
  in a browser, or publication readiness. `npm run test:performance` was not run (it measures, applies no
  threshold and is not a CI gate, per `AGENTS.md`).
- **Negative-test authorship.** The 37 tests are authored by the same function that wrote the validator, not by
  me. I verified the suite runs green and independently mutated two rules (missing F17 heading, broken evidence
  reference) to confirm the validator fails; I did not independently write a full second test suite.
- **Asset files.** D9's cited MC-04 asset paths and ids were verified for existence and manifest registration
  programmatically (20/20 paths present, 25/25 ids found), not visually reviewed as design content.
- **Scope.** No `src/`, `public/`, `e2e/`, `.github/`, checkout, price, stock, payment, deployment or brand-
  adoption state was changed by the diff, so no runtime/product behaviour was re-verified beyond the full gate
  suite. A definition PASS is not a functionality, physical, financial or legal milestone.

---

## 8. Required corrective actions before merge (all MINOR; none blocks the definition verdict)

1. **DEF-01** — add `scripts/check-marea-products.mjs` and `scripts/check-marea-products.test.mjs` to
   `package.json` `format`/`format:check` and run `prettier --write`, or record the curated-list decision.
2. **DEF-02** — reconcile `README.md:186` with `MAREA-AIS-COMMERCIAL-SPEC.md:266,533` (allow the portfolio
   bundle hypothesis explicitly, or remove the EUR 1,399 figure from D3).
3. **DEF-03** — separate `CONDITIONAL` (AIS-CONNECTED only) from "publication conditional" in D10's
   `editionVerdict`, so the machine contract matches D4 `:60–65`.
4. **DEF-04** — align the DEFINED CTA wording across `COMMERCIAL-BRAND-CLAIMS-POLICY.md:140`,
   `BRAND-VOICE-ES-EN.md:184` and `CUSTOMER-JOURNEYS-NAV-HUB-AIS.md:53`; copy/D1 already match the policy.
5. **DEF-05** — reword `MAREA-HUB-COMMERCIAL-SPEC.md:110` so F04 does not imply professional installation is
   universal (F07 `:131`, F10 `:152` and D4 H21 `:170` say optional/conditional).
6. **OBS-01 (recommended, not required)** — add negative tests for `files.scope`, `json.contract` and
   `json.traceability`; update the `MASTER-PROMPT-REGISTRY.md` row 05 with the delivered evidence and this
   verdict as part of D12.

---

## 9. Author ≠ reviewer statement

I, `qa-reviewer`, am the Independent Product Reviewer for MC-05 and I authored none of the deliverables
reviewed here. The MC-05 artefacts were produced by the NAV, HUB and AIS Product Directors, the Commercial
Strategy and Pricing Specialist, the UX/Content/Localization Specialist, the Product Governance and QA
Engineer, and the Lead (editions, decision D-007, integration); I am none of those roles for MC-05. I did not
modify any reviewed file, did not fix any defect in place, and did not run any Git write command. The only file
I wrote is this report. Findings above were derived from the artefacts at `88c4300` and from commands I
executed, not from any author's summary.

---

## 10. Closing status line

**MC-05 product-definition scope: PASS (with MINOR corrective actions).** **Commercial release: BLOCKED —
`NOT_FOR_SALE`; brand/IP clearance `NOT_GRANTED`/`NOT_CLEARED`.** No MAREA product is released, certified,
stocked or commercially available, and nothing in this report may be read as such.

---

## 11. Post-verdict corrective-action verification (addendum at `71a0a41`)

**Context.** After the PASS above, the Lead fixed all five MINOR findings in commit `71a0a41` ("fix(mc05): close
independent-review findings DEF-01 to DEF-05"), on top of the reviewed `88c4300`. This addendum re-verifies the
fixes and records residuals. The original verdict and findings in §§1–10 stand unchanged: **PASS** for the
MC-05 product-definition scope, **commercial release BLOCKED — `NOT_FOR_SALE`**.

**Reviewed commit:** `71a0a41` on `feature/marea-mc05-nav-hub-ais-products`, parent `88c4300`, base `8ac6d69`.
Working tree clean before this addendum; the only file I wrote is this report.

### 11.1 Fix-by-fix verification

| Id | Fix claimed | Evidence inspected | Re-verification | Status |
| --- | --- | --- | --- | --- |
| DEF-01 | New scripts are Prettier-formatted and in the `format`/`format:check` lists | `package.json:18–19` now list `scripts/check-marea-products.mjs` and `scripts/check-marea-products.test.mjs`; `format:check` prints them in its command line | `npx prettier --check` on both files → exit 0 ("All matched files use Prettier code style!"); `npm run format:check` → exit 0 with the files actually in scope | **FIXED** |
| DEF-02 | README §8 now governs bundle-context hypotheses (START EUR 499, CRUISE EUR 1,399: context only, always `HYPOTHESIS_UNAPPROVED`, never in copy, never a sum of edition prices) | `README.md:202–207` new paragraph; D3 `:266`/`:533` remain labelled "hypothesis EUR 1,399" and "ecosystem context only" | Copy scan for `1,399` / bundle price → no price in any of the six copy files (only unpriced "CRUISE ... not presented as purchasable" sentences); contract and validator still PASS | **FIXED** |
| DEF-03 | Five retained editions `DEFINED` + `publicationConditional: true`; AIS-CONNECTED `CONDITIONAL` + `NOT_YET_JUSTIFIED`; validator enforces both | JSON `:352–353, :379–380, :974–975, :1003–1004, :1546–1547` (`DEFINED`/true) and `:1576–1578` (`CONDITIONAL`, true, `NOT_YET_JUSTIFIED`); validator rule `:1072–1121`; new test `check-marea-products.test.mjs:663` | Unit tests 38/38; **independent mutations**: retained `NAV-ESSENTIAL` set to `CONDITIONAL` → `FAIL json.editions` exit 1 ("must be \"DEFINED\" at MC-05"); AIS-CONNECTED set to `DEFINED` → `FAIL json.editions` (2 failures); `publicationConditional=false` → `FAIL json.editions` exit 1 | **FIXED** |
| DEF-04 | D7 §1.2 CTA pair aligned to the claims policy | `CUSTOMER-JOURNEYS-NAV-HUB-AIS.md:53` now quotes **"See the specification"** / «Ver la especificación» + **"Request a compatibility review"** / «Solicitar estudio de compatibilidad»; D1 F20 `:285` and D8 copy `nav.en.md:202` already matched | Text verified in place; no purchase CTA introduced anywhere; no other CTA wording changed in the diff | **FIXED within MC-05 scope** — see residual note 11.3 |
| DEF-05 | D2 F04 no longer implies universal professional installation | `MAREA-HUB-COMMERCIAL-SPEC.md:110` now says delivered "either as a documented self-install configuration or through the EMBARCARTE professional installation service ... according to the assessed configuration (professional installation is offered and, for configurations outside the documented low-risk set, required — it is never universally imposed or universally assumed)" | Wording now consistent with F07 `:131`, F10 `:152` and D4 H21 `:170`; no inclusion/price claim added | **FIXED** |

### 11.2 Commands re-run at `71a0a41` (targeted re-verification)

| Command | Exit | Result |
| --- | --- | --- |
| `node scripts/check-marea-products.mjs` | 0 | `Summary: 22 checks run, 22 passed, 0 failed; 15 of 15 scoped files read.` / `RESULT: PASS` |
| `node --test scripts/check-marea-products.test.mjs` | 0 | `tests 38`, `pass 38`, `fail 0` (was 37; the new retained-edition test is the 38th) |
| `npm run test:products` | 0 | 22/22 PASS, `RESULT: PASS` |
| `npm run test:products:unit` | 0 | 38/38 pass |
| `npm run format:check` | 0 | "All matched files use Prettier code style!"; both MC-05 scripts now printed in the checked set (DEF-01 coverage closed) |
| `npx prettier --check scripts/check-marea-products.mjs scripts/check-marea-products.test.mjs` | 0 | both files clean |
| `git diff --check` | 0 | no whitespace errors |
| `git diff 8ac6d69..HEAD -- src public e2e .github` | 0 | empty — scope unchanged |

Branch diff scope at `71a0a41`: `git diff --stat 8ac6d69..HEAD` = **21 files** (the 20 authorised files from
`88c4300` plus this review report, which the Lead committed in `71a0a41`; it is inside
`docs/marea/products/**`). No dependency change (`package.json` diff is still only the script/format lines), no
`src/`, `public/`, `e2e/`, `.github/` or commerce change. The commit additionally Prettier-reformats the
validator/test (formatting-only in the parts not covered by DEF-03) and adds extra affirmative price-approval
prohibition patterns (e.g. "PVP confirmado", "price is final"); the full 22-check/38-test suite passes, so no
behavioural regression was found.

I did **not** re-run `build`, `test:e2e`, `test:brand`, `test:i18n`, `test:commerce`, `test:seo` or `test:backup`
for this addendum: the diff touches only `docs/marea/products/**`, `scripts/check-marea-products*` and the
`format` lists in `package.json` — no input of those gates — and `git diff 8ac6d69..HEAD -- src public e2e
.github` is empty, so their PASS results recorded at `88c4300` remain valid and untouched. `npm audit` is
unaffected (no dependency change). This is a targeted re-verification, not a second full gate run.

### 11.3 Residual note on DEF-04 (not a new finding, not an MC-05 defect)

`docs/marea/brand/BRAND-VOICE-ES-EN.md:184` still prescribes «Ver la definición del producto» / "View the product
definition" for `CONCEPT / DEFINED`, while `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md:140` (the
enforcement document) allows "See the specification". This is an MC-03-era governance inconsistency in a file
outside MC-05's authorised write scope (the MC-05 diff correctly does not touch `docs/marea/brand/**`). DEF-04 is
therefore fixed for the MC-05 deliverables (D7, D1, D8), and the remaining brand-doc alignment is a
recommendation for a later brand-governance pass — not a reason to reopen this milestone.

### 11.4 Addendum conclusion

All five MINOR findings are verified fixed in `71a0a41` and no new defect or gate regression was introduced by
the corrective commit. The original verdict stands: **PASS (MC-05 product-definition scope)** with the residual
brand-doc wording note above; **commercial release remains BLOCKED — `NOT_FOR_SALE`, brand/IP
`NOT_GRANTED`/`NOT_CLEARED`**. Nothing here releases, certifies, stocks or offers any MAREA product for sale.
D12 (`MC-05-DELIVERY.md`) and the `MASTER-PROMPT-REGISTRY.md` row 05 update remain expected post-verdict
deliverables (OBS-03 unchanged).
