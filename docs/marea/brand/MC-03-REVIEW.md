# MC-03 — Independent review: brand architecture, trademark research, positioning and brand governance

| Field | Value |
|---|---|
| Document ID | MC-03 / REVIEW |
| Milestone | MC-03 — prompt 03 of 36 (brand architecture, trademark availability research, commercial positioning, brand governance) |
| Date | 2026-10-30, Europe/Madrid |
| Reviewer | `qa-reviewer` (Agent G), independent reviewer |
| Independence statement | I authored, co-authored and edited **none** of the reviewed files and did not participate in MC-03. I inspected the committed tree, re-fetched the registry records myself and re-ran the gates myself. I wrote only this review file; I fixed nothing and ran no write Git command. No delivery summary, registry row or previous review was accepted as evidence. |
| Repository | `C:\Users\Admin\Documents\workspace\embarcarte` |
| Branch / base / head | `feature/marea-mc03-brand-governance` · base `9631c6f52b20b20e85506b097615ca5eb1107a94` (MC-02 HEAD) · reviewed head `a718672192d975e962e6b2aa94f088d8e68aaae5` |
| Reviewed commits | `08bf8e2`, `6961558`, `9aebfcd`, `a1cdc87`, `a718672` |
| Reviewed diff | `git diff --stat 9631c6f..a718672` = **20 files, +7,472 / −1**; 16 added, 4 modified; no binary, no `src/`, no `public/` |
| Draft PR | [#9](https://github.com/manuelxose/embarcarte/pull/9) — OPEN, **draft**, `feature/marea-mc03-brand-governance` → `feature/marea-mc02-technology-audit` (stacked on PR #8 → PR #7; not `main`) |
| Nature | Documentation/evidence and governance verification. **Not a legal opinion, not a trademark clearance and not a product or brand approval.** |

## 1. Verdict summary

**MC-03 = PASS (brand-governance scope), conditional on closing two delivery-hygiene blockers in the
final delivery commit (B-1, B-2).** The substantive delivery is strong and independently reproducible:
the corporate/brand separation holds; no clearance is invented; the trademark provenance survived an
independent re-fetch of **all six** official records (not just the two required); the risk gate (OPTION B,
`NOT_GRANTED`) follows from that evidence; the claims policy gives operator rulings for every mandated
example; the governance validator really fails on clean violations and really does not scan `src/`; and
every functional gate I re-ran (format, brand, brand-unit, i18n, SEO, build, E2E) passes on the reviewed
head, with CI green on the exact commit.

The blockers are not content defects: **(B-1)** prompt 03 is recorded as `PASS` and cites
`MC-03-REVIEW.md`, but that file does not exist at the reviewed head — the registry's own rule forbids
this, and it repeats MC-02 B-1; **(B-2)** the delivery records `git diff --check` as PASS, but the same
command over the committed range **exits 2** on a real (new) trailing blank line in
`MC-04-VISUAL-IDENTITY-BRIEF.md`. Both are mechanical; the exact fixes are in §7. If they are not
closed, the delivery must not be cited as PASS (B-1 → prompt 03 returns to `IN PROGRESS`; B-2 → the
whitespace gate record is false).

Defect totals: **2 blocking** (delivery hygiene/accuracy; no substantive content or legal overreach) and
**10 non-blocking** (internal consistency, copy, data-transcription and validator false-negative items).
Three criteria are PARTIAL and one FAILED because of the whitespace gate; the remaining ten are VERIFIED.

## 2. Independence and method

1. Inspected branch, remotes, commit graph, commit-by-commit stats, full name-status of the range, PR
   state for #7/#8/#9 and the actual files — not the delivery summary.
2. Re-fetched the official registry records **myself** and compared every field with
   `TRADEMARK-CLEARANCE-RESEARCH.md` and `TRADEMARK-SEARCH-RESULTS.csv` (§5).
3. Re-ran the gates on the reviewed head, recording exact exit codes and output tails (§3).
4. Stress-tested `scripts/check-brand.mjs` from outside the repository: eleven throwaway fixture trees in
   `%TEMP%` driven through its own `--root` CLI (§6.3). No tracked file was modified.
5. Re-derived the migration-audit inventory counts (209 references, 7-way classification), the MC-04
   measured file sizes and contrast ratios, and spot-checked `file:line` citations in `src/` and the
   MC-02 blocker register (§6).
6. Independently scanned the governed documents for `®`/`™`, positive clearance language, fabricated
   certifications/awards/testimonials/customer figures, invented legal data and binary/asset additions.
7. Classified every finding as blocking or non-blocking with `file:line`/command evidence (§7).

## 3. Gate results — re-run by me on `a718672`

| # | Gate | Command | Result | Observed tail / note |
|---:|---|---|---|---|
| 1 | Formatting | `npm run format:check` | **PASS** (exit 0) | `All matched files use Prettier code style!` — scope is the pre-existing explicit file list; it does not cover Markdown/JSON or the new `scripts/check-brand*.mjs` (documented in the delivery; see §6.4) |
| 2 | Brand governance | `npm run test:brand` | **PASS** (exit 0) | `Summary: 21 checks run, 21 passed, 0 failed; 11 files scanned, 0 skipped.` / `RESULT: PASS` |
| 3 | Brand unit tests | `npm run test:brand:unit` | **PASS** (exit 0) | `tests 11 / pass 11 / fail 0` |
| 4 | Range whitespace | `git diff --check 9631c6f..a718672` | **FAIL** (exit 2) | `docs/marea/brand/MC-04-VISUAL-IDENTITY-BRIEF.md:2013: new blank line at EOF.` → defect **B-2** |
| 5 | i18n | `npm run test:i18n` | **PASS** (exit 0) | `Server-rendering checks passed …` + `i18n foundation checks passed …` |
| 6 | SEO | `npm run test:seo` | **PASS** (exit 0) | `SEO checks passed: 101 sitemap URLs, canonical, reciprocal hreflang, JSON-LD and private noindex.` |
| 7 | Build (Angular SSR/prerender) | `npm run build` | **PASS** (exit 0) | `Output location: …\dist\embarcarte` |
| 8 | E2E (Playwright/Chromium) | `npm run test:e2e` | **PASS** (exit 0) | `15 passed (39.8s)` — reproduces the delivery's `15 passed` (timing differs, count matches) |
| 9 | Prettier on the new scripts | `npx prettier --check scripts/check-brand.mjs scripts/check-brand.test.mjs` | **PASS** (exit 0) | `All matched files use Prettier code style!` — supports the delivery's scope note |
| 10 | CI on the reviewed head | `gh run view 41094579574` | **PASS** | run `headSha = a718672192d9…`, conclusion `success`; steps `format:check`, `build`, `i18n`, `commerce`, `seo`, `backup`, `test:brand`, `test:brand:unit`, Chromium install, `test:e2e`, dependency audit all `success` |
| 11 | `npm test` | — | **NOT DEFINED** | `package.json` has no `test` script; the delivery correctly reports no result for it |

Not independently re-run: `npm run test:commerce`, `npm run test:backup`, `npm run test:performance`,
`npm audit` (CI evidence on the exact head covers the first two and the audit). The diff touches no
`src/`, dependency or build configuration, so these cannot have regressed in MC-03.

## 4. Per-criterion verdicts (task-7 mandatory checks)

Status vocabulary: **VERIFIED** = independently confirmed with command/file evidence; **PARTIAL** =
materially verified with a stated limitation that does not invert the finding; **FAILED** = the criterion
does not hold as delivered. Blocking defects are identified in §7.

| # | Criterion | Status | Evidence |
|---:|---|---|---|
| 1 | Corporate/brand separation: EMBARCARTE seller/legal, MAREA proposed product brand, OPEN-MARINE internal only; no document presents OPEN-MARINE as the public brand or claims EMBARCARTE owns/cleared all software | **VERIFIED** | Contract `brand-identity.contract.json:6-48` (`company.role = SELLER_AND_LEGAL_COMMERCIAL_IDENTITY`, `productBrand.status = PROPOSED`, `technologyFoundation.publicUse = INTERNAL_ONLY`, `rightsClearance = NOT_CLEARED`); `BRAND-ARCHITECTURE.md:30-48,69`; `MAREA-BRAND-STRATEGY.md:339-357`; `BRAND-AND-IP-DECISION-PACKAGE.md:158-164` ("asserted no ownership claim"). `WEBSITE-BRAND-MIGRATION.md:406-448` records the *live site's* current Open Marine naming as an audit finding and required migration, not as an endorsement. Caveat: contract attribution wording **N-7** |
| 2 | No invented legal clearance; only state is proposed / `NOT_GRANTED` / not legal clearance; no `®`/`™` attached to MAREA | **VERIFIED** | `TRADEMARK-CLEARANCE-RESEARCH.md:16-22,587-593`; contract `:24-28`; delivery `:22-29`. Independent scan of every `docs/marea/brand/*.{md,json,csv}`: the only line where a symbol is attached (`MAREA®`) is `MC-03-DELIVERY.md:240`, inside backticks describing a **rejected negative test case**; every other `®`/`™` occurrence is a prohibition (e.g. `BRAND-ARCHITECTURE.md:137`, `COMMERCIAL-BRAND-CLAIMS-POLICY.md:88`). Independent grep found **no** positive "MAREA is registered/cleared" assertion; the only literal string is a forbidden example inside `brand-identity.contract.json:218` (`forbiddenStatements`). No clearance state other than `NOT_GRANTED` exists anywhere |
| 3 | Trademark provenance: independent re-verification of ≥2 registry records; no fabricated identifier/owner/date; official claims map to cited URLs; aggregator/snippet not upgraded; OEPM/TMview/WIPO success not claimed | **VERIFIED** | I fetched **all six** official records the research cites (four EUIPO `copla` JSON + two WIPO Madrid Monitor pages); number, mark name, proprietor, Nice classes, status and dates all match (see §5). CSV shape independently parsed: 30 lines = header + **29** data rows, 18 columns, classes `OFFICIAL_REGISTRY 6 / SECONDARY_AGGREGATOR 11 / SEARCH_ENGINE_SNIPPET 9 / UNAVAILABLE 3`, 29/29 rows carry an `https://` URL. Aggregator/snippet rows remain `SEARCH_ENGINE_SNIPPET`/`SECONDARY_AGGREGATOR` with `NOT VERIFIED` fields — never upgraded. Reload limits are recorded honestly: `TRADEMARK-CLEARANCE-RESEARCH.md:145-173,468-506`, `:114-118`; CSV rows 28–30 (`UNAVAILABLE`). The CSV is explicit that "absence of results is NOT evidence of availability". Defects **N-2, N-3, N-10** are transcription precision, not fabricated records |
| 4 | Risk interpretation: documented status/OPTION B follows from evidence; trading-use conflict ("Marea Marine") distinguished from registered rights; Nice classes 9/35/37/42 justified without mechanically claiming 12/38 | **VERIFIED** | `TRADEMARK-CLEARANCE-RESEARCH.md:52-118` (status calibration), `:224-242` (per-class justification; 12 and 38 explicitly **not** claimed and why), `:290-330` (structured similarity analysis), `:444-464` (what trading use/vessel name/company name are and are **not**), `:556-585` (Option A/B/C/D mapping: B is supported, A/C/D rejected). The verified class-9 wording and the same proprietor's live 35/37 rights do support "MATERIAL CONFLICT INDICATED — SPECIALIST REVIEW REQUIRED"; the document does not assert infringement, refusal or availability |
| 5 | Product naming coverage: all nine families + six bundles in naming + contract + architecture; FLEET product vs "MAREA FLEET package" consistent; no invented family | **PARTIAL** | Nine families and six bundles present and identical in `brand-identity.contract.json:49-143`, `BRAND-ARCHITECTURE.md:56-67`, `PRODUCT-NAMING-SYSTEM.md:249-263`, and no tenth family anywhere (contract `forbiddenFamilyNames:201`). The FLEET customer-facing form is correct where used (`contract:139` `customerFacingName: "MAREA FLEET package"`, `architecture:67,101-102`, `strategy:300`). However two governed documents still describe the **pre-fix** contract state: `PRODUCT-NAMING-SYSTEM.md:219` says the contract "currently records … 'MAREA FLEET bundle'" (it now records `MAREA FLEET package` + `customerFacingName`), and `MAREA-BRAND-STRATEGY.md:454` repeats it → defect **N-1** |
| 6 | Positioning quality: concrete, 13 mandated questions answered, no unverified superiority claim; competitive evidence labels HYPOTHESIS vs evidence and cites dates | **VERIFIED** | `MAREA-BRAND-STRATEGY.md:402-443` answers Q1–Q13 explicitly; segments/objectives are concrete (`:225-247`), differentiators carry `HYPOTHESIS`/proof-gate columns (`:151-167`), falsification tests (`:165-167`). `COMPETITIVE-POSITIONING-EVIDENCE.md` uses OBS/ATTR/SNIP/HYP/UNAV classes, a retrieval date for every source, and explicitly refuses unverified superiority/market-share/certification assertions (`:13-23,220-233,278-292`). Independent superlative scan: every superlative found is a quoted competitor self-claim (attributed) or inside a prohibition; none is asserted about MAREA |
| 7 | Bilingual copy quality: natural ES, correct diacritics, consistent tú/usted, product names untranslated, no machine-translation feel, contract ↔ document consistency | **PARTIAL** | ES strings read as authored Spanish (headlines, segment messages, disclaimers, claims policy §9 all natural; **0** hits for common unaccented Spanish words in an independent diacritic scan); brand tokens are invariant (`brand-identity.contract.json:240-264`). Defects: **N-5** `trustLine` — «Publicamos lo que el producto hace, lo que no hace y **qué versión lo hace**» / "…and **which version does it**" is an elliptical calque (the same document's correct pitch at `:89` says «qué versión lo soporta»); **N-4** `mareaExtendedDescription` differs between contract (`:244,256`) and `BRAND-VOICE-ES-EN.md:44`, and the voice version asserts "sin duplicar suscripciones ni cuentas" without the CONDITIONAL marking the strategy gives that same claim. The `usted` rule is stated but no canonical ES B2B string exercises it, so that half of the register decision is unverified |
| 8 | Claims policy usability: an operator decision for every mandated example; forbids NMEA 2000 certification, collision avoidance, autonomy, "most accurate", "100% reliable", immediate availability | **VERIFIED** | `COMMERCIAL-BRAND-CLAIMS-POLICY.md:97-113` gives rulings for every mandated example (`"Certified NMEA 2000"` → P; `"Guaranteed collision avoidance"` → P/X; `"Fully autonomous steering"` → P/X; `"The most accurate marine forecast"` → P/X; `"100% reliable monitoring"` → P/X; `"Immediately available"`/`"Available for immediate delivery"` → C with OPERATIONS READY + stock + approved price). Class A/C/P/X definitions, lifecycle→CTA matrix, empty claims register by design (`:177-183`), approved ES/EN disclaimers (`:185-223`), evidence/approval workflow (`:163-175`). Contract `prohibitedClaimPatterns` (`:222-230`) contains all six patterns and the validator checks the policy restates them |
| 9 | SEO preservation / no regression: no `src/`, `public/`, routes, dictionaries or SITE change; migration audit invents no corporate legal data; indexed URLs/canonical/hreflang preserved | **VERIFIED** | `git diff --name-status 9631c6f..a718672` = 16 added/4 modified, all under `docs/marea/brand/`, `docs/marea/execution/`, `scripts/check-brand*`, `package.json`, `.github/workflows/ci.yml` — no `src/`, `public/`, route/dictionary/SITE file. `npm run test:i18n`, `test:seo` and `build` pass; E2E 15/15. `WEBSITE-BRAND-MIGRATION.md:406-436` records `SITE.legal` empty and expressly forbids inventing a NIF/address/registry; `:516-519` records 98 static indexed URLs plus dynamic product URLs and the canonical/hreflang preservation requirements. No live URL or metadata was changed |
| 10 | Governance consistency (adversarial): validator fails on real violations; does not scan `src/`; cannot fail because of legacy pages | **PARTIAL** | Real tree: 21/21 checks, 11 governed files, 0 skipped; unit tests 11/11. My own `--root` fixtures: wrong casing, `MAREA®`, clearance/availability assertion, `trademarkLegalClearance = GRANTED`, missing `messages.es.trustLine`, eight families → **all exit 1**; violations placed only in `src/` and a non-governed `docs/marea/UNRELATED.md` → **exit 0** (scope proof). But I also demonstrated three false-negative surfaces: a line containing ordinary Spanish "no"/English "not" anywhere is exempt from **all** scan rules (`MAREA® es la marca; no hay otra.` → exit 0), a wrong family name inside any table cell is skipped (`| Marea Nav |` → exit 0), and the validator still returns PASS with **every** governed document absent, including the claims policy → defect **N-6**. The negatives are documented as heuristics in `BRAND-GOVERNANCE-IMPLEMENTATION.md:68-87`, but the delivery's robustness claim does not disclose them |
| 11 | No false commercial claims / fabricated assets: no invented certifications, awards, testimonials, customer counts, real prices, generated images; image-generation blocker preserved; no image/binary added | **VERIFIED** | No binary/image additions (`git diff --numstat` has no `-` rows; added-file list is 12 Markdown + CSV + JSON + 2 `.mjs`). Image blocker preserved: `MC-04-VISUAL-IDENTITY-BRIEF.md:19-34` ("NO IMAGE WAS GENERATED AND NO IMAGE FILE EXISTS"), `MC-03-DELIVERY.md:319-330` (X-03 BLOCKED unchanged). No MAREA price is presented as real: the only MAREA euro figures are labelled portfolio hypotheses (`strategy:450`, `naming:352,355`, `delivery:363`); external prices are dated context (`COMPETITIVE-POSITIONING-EVIDENCE.md:83,108,145`). No invented certification/award/testimonial/customer count for MAREA; certificates/awards found are competitor self-claims, attributed and flagged |
| 12 | No unauthorized changes: OPEN-MARINE untouched; no merge to `main`; no deploy; PR draft; base is MC-02 branch | **VERIFIED** | `..\open-marine` at `403941b886…` with `git status --porcelain` empty. `main` still `092ae74c904c…` (unchanged); no merge commits in `9631c6f..HEAD`; no tag contains HEAD; remote branch only `origin/feature/marea-mc03-brand-governance`. PR #7/#8/#9 all **OPEN, draft**, stacked #7(main) ← #8(MC-01) ← #9(MC-02 base). `deploy.yml` triggers only on `push: branches: [main]`; the branch cannot deploy. Diff contains no secrets, no dependency change (`package.json` only adds two scripts; `package-lock.json` untouched) |
| 13 | Re-run the gates and report real output; classify pre-existing vs MC-03-introduced | **FAILED** | §3: format/brand/brand-unit/i18n/SEO/build/E2E all pass (exit 0); **`git diff --check 9631c6f..a718672` exits 2** on a new blank line at EOF in the MC-03-added `MC-04-VISUAL-IDENTITY-BRIEF.md:2013` → **B-2**, introduced by MC-03, not pre-existing. The delivery records the same gate as PASS (`MC-03-DELIVERY.md:279,345`), because a bare `git diff --check` checks only the clean working tree |

## 5. Independent trademark record verification (critical criterion 3)

I fetched these URLs myself on 2026-10-30 (HTTP 200) and compared the returned official data with
`TRADEMARK-CLEARANCE-RESEARCH.md` §5 and `TRADEMARK-SEARCH-RESULTS.csv`. This covers **all six**
`OFFICIAL_REGISTRY` rows, not only the two required.

| Record | What I observed at the registry | Match to research + CSV |
|---|---|---|
| EUIPO EUTM **018135609** `https://euipo.europa.eu/copla/trademark/data/018135609` | Mark **M MAREA**, figurative; applicant **BRANDS 2020, S.L.** (Pere IV 110, Barcelona, ES); Nice **9**; status **Registered / currentStatus Valid**; filed **2019-10-10**; registered **2020-02-27**; expires **2029-10-10**; goods include *"Mobile apps; Application software for mobile phones; Software and applications for mobile devices; … Downloadable application software for smartphones and tablets"*; **no oppositions**; linked international registrations **1632684** and **1847368** | **MATCH** on number, mark name, proprietor, class, status, all three dates, goods overlap and no-opposition statement (research `:58-61,186`; CSV row 2) |
| EUIPO EUTM **015190655** `…/015190655` | **M MAREA**, figurative; **BRANDS 2020, S.L.**; Nice **35, 37**; **Registered / Valid**; filed **2016-03-07**; registered **2016-10-29**; renewal recordal **028261439** status *"Trade mark renewed"*, document dated **12/03/2026**, Bulletin **2026/049**; opposition **002736372** status **Withdrawn**, earlier right ES **1281774** class 35; class 37 wording is clock/watch repair | **MATCH** (research `:187`; CSV row 3 says exactly the renewed/live 35/37 shape) |
| EUIPO EUTM **018395967** `…/018395967` | **M MAREA**, figurative; **BRANDS 2020, S.L.**; Nice **3, 14, 18, 25**; **Registered / Valid**; filed **2021-02-11**; registered **2021-07-02**; expires **2031-02-11** | **MATCH** (research `:188`; CSV row 4) |
| EUIPO EUTM **009532771** `…/009532771` | Mark **MAREA** — **word** mark; proprietor **VIÑA LUIS FELIPE EDWARDS LTDA.** (Santiago, CL), representative **ISERN PATENTES Y MARCAS** (Barcelona); Nice **33** ("Wines."); **Registered / Valid**; filed **2010-11-18**; registered **2012-05-12**; renewal Bulletin **2020/153**; opposition **001798647** **Withdrawn**, earlier right ES **799617** class 33 | **MATCH** except the CSV drops the tilde: `TRADEMARK-SEARCH-RESULTS.csv:5` prints "**VINA** LUIS FELIPE EDWARDS LTDA." (official: **VIÑA**) → **N-3**. The research document spells it correctly (`:194`) |
| WIPO Madrid IR **1632684** `https://www3.wipo.int/madrid/monitor/en/showData.jsp?ID=1632684` | **M MAREA**, holder **BRANDS 2020, S.L.**; registration **05.10.2021**, expiry **05.10.2031**; Nice **9**; basic registration EM 018135609; designations **BR, CO, CU, MA, MX, NO, RS, RU, SE**; grants of protection recorded for MX/SE/CO/BR/CU/NO/MA/RS/RU; status **Active** | **MATCH** (research `:195`; CSV row 6). The WIPO page footer printed `2026-10-31 00:47` (Geneva), consistent with the research's explanation at `:140-143` that this is the WIPO system clock, not the retrieval date |
| WIPO Madrid IR **1847368** `…?ID=1847368` | **M MAREA**, holder **BRANDS 2020, S.L.**; registration **28.01.2025**, expiry **28.01.2035**; Nice **9, 14, 35**; basic applications EM 018135609 / 018395967 / 015190655; designations **AL, BA, KE, ME**; status **Active** | **MATCH** (research `:196`; CSV row 7) |

**What held up.** No fabricated identifier, proprietor, class, status or date was found among the six
official records. The two records the brief names (018135609, 015190655) fully support the research's
decisive findings: a live EU class-9 right whose only verbal element is MAREA and whose goods wording
literally includes mobile apps/mobile-device software, plus live 35/37 rights held by the same
proprietor. The research also correctly limits itself: it does not claim OEPM, TMview, WIPO Brand DB or
France/Portugal searches succeeded, and the CSV keeps those rows `UNAVAILABLE`. The `NOT_GRANTED`
state and the Option B gate are therefore evidence-supported, not asserted.

**Defects found in the verification itself (non-blocking):** the CSV owner diacritic (**N-3**); the
research document's evidence-base header says the CSV has "25 rows" when it has 29 (**N-2**); and the
research's WIPO translation quote "*MAREA — tide*" is a tidied rendering of WIPO IR 1632684's actual
"Marea: **tade**." (the other IR prints "MAREA-TIDE.") (**N-10**). None changes a class, owner, status,
date or the risk conclusion.

**Not verified by me:** the unverified leads (Spanish M-3663995, the French class-9/42 snippets, the UK
clone, the US class-42 mark) are correctly labelled `UNVERIFIED_LEAD`/`SEARCH_ENGINE_SNIPPET`; I did not
attempt to confirm them, and no conclusion rests on them. I did not re-attempt the OEPM/TMview/WIPO name
searches: I verified only that the documents **do not claim** they succeeded.

## 6. Additional independent checks

1. **Migration inventory re-derived.** Parsed the 209 numbered rows of `WEBSITE-BRAND-MIGRATION.md`:
   `KEEP 68 / EVENTUALLY_MIGRATE_TO_MAREA 50 / TECHNICAL_INTERNAL_ONLY 8 /
   REQUIRES_LEGAL_APPROVAL 13 / REQUIRES_PRODUCT_VALIDATION 25 / REQUIRES_COPY_CORRECTION 28 /
   REQUIRES_SEO_MIGRATION 17` — exactly the delivery §15 figures and sum 209. Spot-checked 5 cited
   `src/` lines (`technology.es.ts:17,59`, `site.config.ts:10,23`, `brand.ts:11`): all resolve to the
   quoted content.
2. **MC-04 measured claims sampled.** The six browser asset sizes in
   `MC-04-VISUAL-IDENTITY-BRIEF.md:1944` (favicon 15,086 B; favicon.svg 338 B; apple-touch 3,304 B;
   icon-192 3,512 B; icon-512 9,588 B; og-image 280,750 B) are **exactly** the files on disk. I
   recomputed the focus-ring contrast independently: `#8fd2f5` on `#ffffff` = **1.65:1**, on
   `#f2f9fd` = **1.55:1** — matches `:762-768` and the delivery; the focus ring does fail 3:1 (WCAG 2.2
   SC 1.4.11), as reported.
3. **Validator adversarial fixtures (11 trees, `%TEMP%`, `--root`; tracked tree untouched).** Clean
   fixture exit 0. Real violations exit 1: `MAREA®` attached (`brand.docs.trademarkSymbols`), wrong
   `Marea Nav` casing (`brand.docs.productNames`), "registered trademark / available for purchase now"
   (`brand.docs.clearanceClaims`, 3 failures), contract `trademarkLegalClearance = GRANTED`
   (`contract.productBrand`), missing `messages.es.trustLine` (`contract.messages`), eight families
   (`contract.productFamilies`). Scope: violations only in `src/app/example.ts` and
   `docs/marea/UNRELATED.md` → exit 0. False negatives: `MAREA® es la marca; no hay otra.` → exit 0;
   `Marea Nav no es el nombre correcto.` → exit 0; `MAREA is a registered trademark, not a proposal.` →
   exit 0; wrong name inside a normal table cell → exit 0; all governed documents (including the claims
   policy) absent → exit 0/PASS. See **N-6**.
4. **Supply chain / hygiene.** The two new scripts import only Node built-ins (`node:fs`, `node:path`,
   `node:url`, `node:child_process`, `node:os`, `node:assert`, `node:test`) — no dependency, no network
   call, no `eval`. `package.json` adds two scripts; `package-lock.json` unchanged. No credential/secret
   pattern in the new files. No binary/image file added by any of the five commits. `format:check`'s
   documented scope gap is real but harmless: `npx prettier --check scripts/check-brand*.mjs` passes
   (gate #9).
5. **MC-02 citation spot-check.** The MC-03 documents' recurring citations into
   `MC-02-BLOCKERS-AND-DECISIONS.md` resolve correctly: `:37-39` = L-01..L-03, `:80` = H-01, `:83` =
   H-04, `:103` = P-06 (WATCH `BUILD`), `:106` = P-09 (FLEET `BUILD`), `:113` = X-01, `:117` = X-05,
   `:118` = X-06. No contradiction with the MC-02 blocker register was found; MC-03 closes no blocker.
6. **CI on the exact reviewed SHA.** `gh run view 41094579574` reports `headSha =
   a718672192d975e962e6b2aa94f088d8e68aaae5`, conclusion `success`, with all sixteen useful steps green
   (including both brand commands, E2E and the dependency audit).

## 7. Defect register

### 7.1 Blocking

| ID | Defect | Evidence | Why it matters | Required fix |
|---|---|---|---|---|
| **B-1** | The delivery claims MC-03 `PASS` and cites `MC-03-REVIEW.md` as acceptance evidence, but that file **does not exist at the reviewed head**. The registry row simultaneously admits the review is pending, which the status vocabulary does not allow. | `git ls-tree -r --name-only a718672 -- docs/marea/brand` → **0 matches** for `MC-03-REVIEW`; `MASTER-PROMPT-REGISTRY.md:49` status *"PASS (pending independent-review confirmation; …)"* and evidence list includes `MC-03-REVIEW.md`; registry rule `:17-18` ("A prompt is **never** marked complete until its acceptance evidence exists in the repository and an independent reviewer has verified it"); `MC-03-DELIVERY.md:14` (status PASS), `:199` (lists the file as created), `:254` ("produced by a separate reviewer agent"), `:256` (promises the verdict summary in §14 — §14 is the test table) | Breaks a programme rule and repeats MC-02 B-1. A `PASS` without committed reviewer evidence is not acceptable and would make the delivery's own acceptance claim false. | **Lead:** commit `docs/marea/brand/MC-03-REVIEW.md` (this file) in the final delivery commit; update `MASTER-PROMPT-REGISTRY.md:49` to name that commit and drop "pending independent-review confirmation"; correct `MC-03-DELIVERY.md:199,252-256` to reference the committed review/commit. If the review is not committed, set prompt 03 back to `IN PROGRESS`. |
| **B-2** | The delivery records the whitespace gate as PASS, but the same check over the committed range fails on a new blank line at EOF in the MC-04 brief. | `git diff --check 9631c6f..a718672` → **exit 2**: `docs/marea/brand/MC-04-VISUAL-IDENTITY-BRIEF.md:2013: new blank line at EOF.` (content ends at line 2012; line 2013 is empty); `MC-03-DELIVERY.md:279` "Whitespace · `git diff --check` · PASS — no whitespace errors"; `:345` appendix "(no output; no whitespace errors)". The bare command the delivery ran checks the clean working tree, not the branch. | A recorded gate is not actually green and the delivery's claim is false on its own branch. MC-03-introduced (new file), not pre-existing. Low substantive severity, but the gate record is part of the evidence contract. | **Lead:** delete the extra trailing blank line in `MC-04-VISUAL-IDENTITY-BRIEF.md` so the file ends with a single newline after line 2012; re-run `git diff --check 9631c6f..<new-head>` (expect exit 0) and keep the recorded range command in the delivery report. |

### 7.2 Non-blocking

| ID | Defect | Evidence | Why it matters | Required fix |
|---|---|---|---|---|
| **N-1** | Stale reconciliation notes: two governed documents still describe the pre-fix contract state that the delivery claims (correctly, for the contract itself) to have fixed. | `MAREA-BRAND-STRATEGY.md:449` says the contract repeats "certified supervised pilot" (contract now has "supervised pilot (only once its safety gate is complete)"), `:454` says the contract offers "MAREA FLEET bundle" (contract now has `customerFacingName: "MAREA FLEET package"`, `:139`), `:455` says the contract still contains "Instala hoy"/"Install today" and cites `BRAND-VOICE-ES-EN.md:42` for a Spain/Portugal/EU sales statement that is no longer there; `PRODUCT-NAMING-SYSTEM.md:219` repeats the FLEET divergence. Delivery `:357-364` marks R-02/R-03/R-04 "Fixed". | The legal/governance set is internally contradictory: a reader (or counsel) sees the contract described as containing claims it no longer contains; the validator cannot detect it (the contract is text-exempt and no check compares documents). | Update the four open-point rows to "resolved in contract v1.0.0" (or delete them) and correct the stale citations. |
| **N-2** | `TRADEMARK-CLEARANCE-RESEARCH.md:12` says the evidence CSV has **25 rows**; the file has **29** data rows (30 lines). Delivery §4 correctly says 29. | CSV parsed: 30 lines, 18 columns, 29 rows, evidence classes 6/11/9/3. | A wrong evidence-base count undermines reproducibility of the research header (minor). | Change "25 rows" to "29 rows". |
| **N-3** | `TRADEMARK-SEARCH-RESULTS.csv:5` renders the EUTM 009532771 proprietor as **"VINA LUIS FELIPE EDWARDS LTDA."**; the official record says **"VIÑA …"**. | EUIPO `…/009532771` applicant `VIÑA LUIS FELIPE EDWARDS LTDA.`; CSV row 5; research `:194` spells it correctly. Only mismatch found in the six official records. | The official-registry table should reproduce the proprietor exactly; a missing diacritic is a data-accuracy defect in a legal-evidence dataset. | Correct the CSV cell to "VIÑA". |
| **N-4** | Canonical message key `mareaExtendedDescription` differs between contract and voice document, and the voice version contains an unverified capability claim that the contract version omits. | `brand-identity.contract.json:244,256` (short version, includes "Es una marca propuesta…"); `BRAND-VOICE-ES-EN.md:44` (long version, adds "Cada familia se puede adoptar por separado y combinarse **sin duplicar suscripciones ni cuentas**" / "without duplicating subscriptions or accounts"). `MAREA-BRAND-STRATEGY.md:158` labels the no-double-billing claim `HYPOTHESIS` (commerce model missing, P-09/P-10). The validator only checks key presence, not text equality. | Two "authoritative" copies of one key; the longer copy asserts an unbuilt product capability without CONDITIONAL marking. | Align the two strings (contract is the source of truth) and mark the shared-entitlement sentence `CONDITIONAL` or remove it from the canonical string until the commerce model exists. |
| **N-5** | Spanish/English `trustLine` is unnatural in both languages, and inconsistent with the voice document's own better wording. | `brand-identity.contract.json:248,260`; `BRAND-VOICE-ES-EN.md:48`: «…y **qué versión lo hace**.» / "…and **which version does it**."; the same voice document has the natural «qué versión lo soporta» at `:89`. | This is the one canonical customer-facing line that reads machine-translated; it would ship as-is if copied. | Replace with «…y con qué versión funciona.» / "…and which version supports it." (then update contract + voice + tests if text is asserted anywhere). |
| **N-6** | Validator false-negative surface: a line-wide negation exemption plus table/absence tolerance lets real violations pass. | `scripts/check-brand.mjs:64` (`EXEMPT_CONTEXT` contains `no`, `not`, `sin`, …) applied at `:491-497` to **all** rules; table rows skipped for `productNames` at `:631`; absent governed files skipped at `:644-646` and claims-policy absence only reported at `:665`. Real fixtures: `MAREA® es la marca; no hay otra.` → exit 0; `Marea Nav no es el nombre correcto.` → exit 0; `MAREA is a registered trademark, not a proposal.` → exit 0; wrong name in a normal table → exit 0; all governed docs absent → `RESULT: PASS`. Documented as heuristics at `BRAND-GOVERNANCE-IMPLEMENTATION.md:68-87`, but the delivery's "fails on …" claim does not disclose them. | A governance gate that ordinary Spanish "no" can silently defeat is weaker than its summary suggests; a deleted claims policy also produces PASS. | Narrow the negation exemption to the matched rule/clause (or per-rule markers), add regression tests for `MAREA® no …` and non-negative tables, and make the absence of the claims policy (or any governed deliverable) a failure rather than a skip. Update the implementation note accordingly. |
| **N-7** | The contract permits an authorship-adjacent statement that the architecture makes conditional. | `brand-identity.contract.json:12` and `:208`: "EMBARCARTE **diseña** y comercializa la familia de productos MAREA." vs `BRAND-ARCHITECTURE.md:125-133` (the "Developed by EMBARCARTE" pattern is **conditional** while the OPEN-MARINE authorship chain is unresolved) and delivery `:361` R-03 ("role-based wording only"). | The machine-readable contract is the source of truth; it should not carry a design/authorship claim the human-readable architecture gates. | Align to «EMBARCARTE comercializa e instala la gama MAREA.» or move the statement to a conditional list. |
| **N-8** | Delivery/report count and metadata slips. | `MC-03-DELIVERY.md:179` "11 documents + 3 code files" but the commit range added 12 Markdown + 1 CSV + 1 JSON + 2 `.mjs` (16 files; the table also lists the not-yet-existing `MC-03-REVIEW.md`); `:148` "defines 12 layers" while `PRODUCT-NAMING-SYSTEM.md:42` defines **ten** naming layers; `MASTER-PROMPT-REGISTRY.md:3` still says "Last updated: 2026-10-30 (MC-02)" although the MC-03 row was edited. | Small factual inconsistencies in an evidence document; no finding changes. | Correct the counts/labels and the registry header date. |
| **N-9** | The delivery report itself contains the literal string `MAREA®` (as a rejected negative test case). | `MC-03-DELIVERY.md:240`: "…clearance ≠ NOT_GRANTED, \`MAREA®\`, \`Marea Nav\` casing…". | Not a clearance claim and not a violation (it describes a test that must fail), but a naive symbol grep over the brand folder flags it, and it is the only attached symbol in the delivered set. | Optional hygiene: reword as "an attached registered-trademark symbol" and keep the literal only in the validator test fixture. |
| **N-10** | The WIPO translation quotation is tidied rather than verbatim. | Research `:249-251` says the WIPO record "carries the voluntary translation '*MAREA — tide*'"; IR 1632684 actually prints "Marea: **tade**." and IR 1847368 prints "MAREA-TIDE." | Minor quote precision in a research document; the point (the word means tide) is unaffected. | Quote the record as observed or cite the IR that reads "TIDE". |

## 8. The weakest part of the delivery

The study's **legal research is its strongest part** (the provenance held under a full independent
re-fetch), and its **internal documentation consistency is the weakest**. The Lead reconciled three
factual inconsistencies (`R-02`, `R-03`, `R-04`) in the machine-readable contract very late, and did not
propagate the correction to the governed specialist documents that record the old state
(`MAREA-BRAND-STRATEGY.md` §18.1, `PRODUCT-NAMING-SYSTEM.md` §11.2) — so the document set now says both
"the contract contains X" and "the contract no longer contains X". The second-weakest point is the
validator's false-negative surface: the governance story is materially better than the heuristics
actually implemented, and the delivery does not disclose that `no`/`not` anywhere on a line, or any
table cell, or a deleted claims policy, will not fail the gate. Neither weakness reverses any headline
finding, but both would let a later author believe a rule is enforced when it is not.

## 9. Final verdict and permitted use

### Verdict

**MC-03 = PASS (brand-governance scope), conditional on closing B-1 and B-2 before the review is cited
as acceptance evidence.**

Exact reasoning:

- **Ten of thirteen** mandatory criteria are VERIFIED with independent evidence, including the critical
  trademark-provenance check (all six official records match), the no-invented-clearance check, the
  claims policy, the SEO/no-`src/` preservation and the "no unauthorized change" check.
- Three criteria are PARTIAL for non-blocking reasons (documentation consistency **N-1**, copy
  **N-4/N-5**, validator false negatives **N-6**); no PARTIAL is caused by an external condition and none
  changes a legal or commercial conclusion.
- One criterion (13) is FAILED only because of the whitespace range check (**B-2**); every functional
  gate passes and CI is green on the exact reviewed SHA.
- The two blocking defects are **delivery-hygiene/accuracy**, not content: a missing committed reviewer
  evidence file (**B-1**) and a mis-recorded whitespace gate (**B-2**). Precedent from MC-02 is the same
  pattern (a blocking delivery-ordering defect closed by the final commit, with a `PASS (audit scope)`
  verdict). If B-1/B-2 are not closed, this verdict must be read as **FAIL for delivery acceptance**
  (prompt 03 → `IN PROGRESS`; whitespace gate false) even though the substantive work stands.

### What MC-03 may be used for

- Internal, non-public brand strategy, architecture, naming, ES/EN messaging and claims governance.
- A triage input to instructed trademark counsel for TM-01/TM-02 (TMview/OEPM/Portugal/France/WIPO
  searches and file histories still need to be commissioned).
- MC-04 concept and brief development in private, under the stated conditional GO and X-03 image block.
- Enforcement of the brand rules on `docs/marea/brand/` via `npm run test:brand` — with the limitations in
  **N-6** understood.
- The recorded programme decisions D-003/D-004 and the documented blockers.

### What MC-03 may **not** be used for

- **No public use of MAREA or any family/bundle name**, no packaging, advertising, domain purchase,
  pre-sale, filing or spend: `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`, public brand use **NO-GO**,
  OPTION B requires specialist counsel (`TRADEMARK-CLEARANCE-RESEARCH.md:587-593`;
  `BRAND-AND-IP-DECISION-PACKAGE.md:228-239`).
- **No statement that MAREA is registered, cleared, available, certified, safe or superior**; no
  certification, ECDIS/ENC, NMEA 2000, autonomous or collision-avoidance claim
  (`COMMERCIAL-BRAND-CLAIMS-POLICY.md:67-95`).
- **Not a legal opinion, clearance, freedom-to-operate opinion, availability opinion or registrability
  conclusion**; it does not close X-01, X-02, DEC-01, H-01/H-04/H-10, D-01/D-04 or X-03.
- **Not an ownership/licence conclusion** for OPEN-MARINE, and not an approval of any software reuse.
- **Not a visual identity** and not evidence that any image, hardware or product exists (MC-04 is a
  brief; X-03 remains BLOCKED).
- **Not authorisation to merge or deploy.** PR #9 stays draft and stacked; no merge to `main` while
  PRs #7/#8 are open; no retarget to `main` until the stack is re-verified.

### Exact next action

1. **Lead — close B-1:** commit `docs/marea/brand/MC-03-REVIEW.md` (this file) in the final delivery
   commit; update `MASTER-PROMPT-REGISTRY.md:49` to name that commit and remove the "pending
   independent-review confirmation" qualifier; correct `MC-03-DELIVERY.md:199,252-256`.
2. **Lead — close B-2:** remove the trailing blank line at
   `MC-04-VISUAL-IDENTITY-BRIEF.md:2013`, then re-run `git diff --check 9631c6f..<new-head>` (expect
   exit 0) and keep the range command in the record.
3. **Lead — optionally close N-1, N-4, N-5 before the next brand milestone** (documentation consistency
   and one canonical copy line), and schedule the N-6 validator hardening plus regression tests before
   the governance gate is relied on for any published copy.
4. **Keep PR #9 draft and stacked**; no merge, deploy, filing, spend, domain action or public MAREA use.
   Any public MAREA act waits on counsel (TM-01/TM-02) and remains NO-GO.

## 10. Verification limits

- I verified the six registry records at record level; I am not counsel and this review draws no legal
  conclusion beyond what those records and the documents state.
- I did not re-attempt the OEPM localiser, TMview, WIPO Brand DB or French/Portuguese national searches;
  I only verified that the documents report them as unavailable and do not claim success.
- The unverified leads in CSV rows 8–27 remain unverified exactly as labelled; no review finding depends
  on them.
- I did not re-run `test:commerce`, `test:backup` or the dependency audit directly (CI on the reviewed
  SHA covers them); I did not run `test:performance` (not a CI gate).
- Attestations I cannot independently observe (the Lead's statement that no chargeable API, spend or
  third-party contact occurred; the exact timestamp of the Lead's own EUIPO re-fetch) are accepted only
  as attestations, not as facts. My own re-fetch is the evidence used in §5.
- No `graphify update` was run from this review (read-only review scope); that remains the Lead's
  integration action.

## Appendix — commands executed by the reviewer (read-only; fixtures in `%TEMP%`)

```text
git status --short; git log --oneline 9631c6f..HEAD; git diff --stat/--name-status 9631c6f..a718672
git diff --check 9631c6f..a718672                       # exit 2 -> B-2
git ls-tree -r --name-only a718672 -- docs/marea/brand  # MC-03-REVIEW.md absent -> B-1
git rev-parse HEAD/main; git log --merges; git tag --contains HEAD; git branch -r --contains HEAD
gh pr view 7/8/9 --json …; gh run view 41094579574 --json headSha,conclusion,jobs
git -C ..\open-marine status --porcelain; git -C ..\open-marine rev-parse HEAD
npm run format:check; npm run test:brand; npm run test:brand:unit; npm run build
npm run test:i18n; npm run test:seo; npm run test:e2e
npx prettier --check scripts/check-brand.mjs scripts/check-brand.test.mjs
node scripts/check-brand.mjs --root <11 %TEMP% fixtures>          # §6.3
node -e "…" (independent diacritic scan; ®/™ scan; CSV parse; WCAG contrast; file sizes)
web_fetch (HTTP 200, 2026-10-30):
  https://euipo.europa.eu/copla/trademark/data/018135609
  https://euipo.europa.eu/copla/trademark/data/015190655
  https://euipo.europa.eu/copla/trademark/data/018395967
  https://euipo.europa.eu/copla/trademark/data/009532771
  https://www3.wipo.int/madrid/monitor/en/showData.jsp?ID=1632684
  https://www3.wipo.int/madrid/monitor/en/showData.jsp?ID=1847368
```

*End of review. Independent verdict: **PASS (brand-governance scope), conditional on closing B-1 and
B-2**; 10 VERIFIED / 3 PARTIAL / 1 FAILED criteria; 2 blocking delivery-hygiene defects; 10 non-blocking
defects. No trademark is cleared, no product is available, no merge/deploy/publication is authorised.*
