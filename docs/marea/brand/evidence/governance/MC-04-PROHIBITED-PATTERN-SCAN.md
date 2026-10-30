# MC-04 — Prohibited-pattern and integrity compliance scan (evidence)

| Field | Value |
| --- | --- |
| Document ID | MC-04 / governance evidence / PROHIBITED-PATTERN-SCAN |
| Milestone | MC-04 — MAREA visual identity system (internal, provisional) |
| Owner | Governance |
| Final scan run | 2026-10-30, **18:35:21** (Europe/Madrid) — third run, after logo, territory, two diagram, print, social and iconography files landed; supersedes the 18:31 and 18:36-labelled runs |
| Host | `MSI-MANUEL`, PowerShell 7.6.9, Windows 11 |
| Scripts | `run-compliance-scan.ps1`, `run-governedpaths-trial.ps1` (both stored next to this record) |
| Raw output | `MC-04-COMPLIANCE-SCAN-OUTPUT.txt` (617 lines), `MC-04-GOVERNEDPATHS-TRIAL.txt` (two scenarios) |
| Scope | `docs/marea/brand/**` (documents + authored SVG/HTML) and `docs/marea/assets/manifest/*.yaml` |
| Verdict | **No MC-04 failure-level prohibited pattern found in the scanned set, including the final frozen-tree run (18:50:02).** Findings: **F-1 RESOLVED** (icon proof-sheet wording fixed; "originality-claim" pattern now 0 hits), **F-3 CLOSED** (§12/§13: all three diagrams and three specimens verified), **F-5 RESOLVED for shipped assets** (manifest registers 24 of 43 rasters; 19 internal evidence renders remain undeclared), **F-6 RESOLVED**; the only open item is **F-2** (pre-existing MC-03 quoted fixture, explicitly out of MC-04 scope). |

> Every number below is copied from `MC-04-COMPLIANCE-SCAN-OUTPUT.txt`. A scan is **not** a legal
> review, not a clearance and not proof that nothing is wrong: it covers only the listed files with the
> listed patterns. Semantic implications (e.g. a certification read carried by styling rather than
> words) are not detectable by grep and remain the independent reviewer's and counsel's responsibility.

## 1. Exact commands and results

| # | Command (exact) | Exit | Artifact |
| --- | --- | --- | --- |
| C-1 | `pwsh -NoProfile -File docs/marea/brand/evidence/governance/run-compliance-scan.ps1` | 0 | `MC-04-COMPLIANCE-SCAN-OUTPUT.txt` |
| C-2 | `pwsh -NoProfile -File docs/marea/brand/evidence/governance/run-governedpaths-trial.ps1` | 0 (script) / scenario A **0**, scenario B **0** (validator) | `MC-04-GOVERNEDPATHS-TRIAL.txt` |
| C-3 | `npm run test:brand` (real contract, **now 13 governedPaths** — the Lead added the two D-16/D-12 documents on 2026-10-30) | 0 | `21 checks run, 21 passed, 0 failed; 13 files scanned, 0 skipped. RESULT: PASS` |

Scope read by C-1 (18:35:21): **32 text files**, **103 SVG files**, **11 HTML files**, plus
`docs/marea/assets/manifest/*.yaml` (1 file).
`docs/marea/brand/evidence/**` is excluded by design (evidence quotes prohibited strings as data); the
exclusion is printed in the report header so it cannot be mistaken for an omission.

## 2. Result summary (18:35:21 run — authoritative)

| Scan | Pattern class | Files hit | Lines hit | Disposition |
| --- | --- | ---: | ---: | --- |
| 1 | `®` | 14 | 37 | Governance prose/prohibition only; nothing attached to the brand (§4.2). |
| 1 | `™` | 14 | 33 | Same. |
| 1 | "registered trademark" / "marca registrada" | 16 | 32 | Negative/policy/forbidden-example context (§4.3). |
| 2 | `CE` | 15 | 30 | All negative statements ("no CE"), LSSI-CE legal references, or policy text. |
| 2 | certified / certificación | 28 | 156 | Negative, conditional or policy context; diagrams state "not certified"; no positive claim found (§6.1–6.3). |
| 2 | NMEA | 22 | 76 | Policy/prohibition/competitive evidence only. |
| 2 | IP-rating (`IPxx`) | 1 | 2 | Brief prohibition only. |
| 2 | waterproof / marine-grade | 6 | 11 | Prohibitions only. |
| 3 | availability | 10 | 24 | Prohibitions / lifecycle tables. |
| 3 | price | 8 | 15 | Hypotheses explicitly labelled as hypotheses. |
| 3 | performance superlatives | 8 | 23 | Prohibited-claim lists. |
| 3 | collision avoidance | 11 | 17 | Denials ("not a collision-avoidance system"). |
| 4 | `CLEARED` — **case-sensitive** | 15 | 22 | Forbidden-vocabulary list, or "not cleared" assertions. (The earlier 178-line figure was a case-insensitivity artefact; corrected.) |
| 4 | `APPROVED_FOR_USE` — case-sensitive | 3 | 3 | Forbidden-vocabulary list only. |
| 4 | "approved for use" lower-case | 1 | 2 | One hit, and it is a **negation** (`og-marea-es-1200x630.html:9`: "no aprobada para uso público ni marca registrada"). |
| 4 | identity "adopted" lower-case | 0 | 0 | none |
| 4 | `ADOPTED` — case-sensitive | 2 | 2 | Negative/unadopted status ("NOT ADOPTED"). |
| 4 | originality claim | 1 | 4 | **FINDING F-1** (§5). |
| 5 | fabricated-image / provenance integrity | — | — | **22 raster files exist** — all deterministic renders/screenshots of our own authored SVG/HTML; none photographic or AI-generated (§7). Manifest: 17 `ai_generated: true` lines, **0** file entries, **0** SHA-256 values. |
| 6 | mandatory disclaimers in artwork | — | — | **Both existing diagrams carry the required disclaimers verbatim**: AIS diagram (AIS ES/EN + navigation ES/EN) and PILOT diagram (PILOT ES/EN + navigation ES/EN). Ecosystem diagram and specimens still absent → **F-3**. |
| 7 | ECDIS / autonomy / safety-instrument implication | — | — | All prohibitions/denials; the "Consolas"→"SOLAS" false positive is fixed with word boundaries (§6.2). |
| 8 | **symbol attached to MAREA / family / bundle** | 1 | 6 | All six inside `MC-03-REVIEW.md` (quoted negative test cases) — **F-2**; none in MC-04 files or artwork. |
| 10 | SVG hygiene (`<title>`, `viewBox`, no `<script>`, no external refs) | 0 | — | **PASS: 0 issues in 103 SVGs.** |

## 3. Files in scope at 18:35:21

- **32 text files**: brand documents (including this milestone's D-16/D-12 documents, `ICONOGRAPHY-SYSTEM.md`, `BRAND-GOVERNANCE-IMPLEMENTATION.md`), the contract, the trademark CSV, and `docs/marea/assets/manifest/MC-04-BRIEFS.yaml`.
- **103 SVGs**: 57+ UI icons, 6 packaging dielines, logo assets (lockups, mark, reduced variant, wordmark, construction grid, family lockups), 3 territory construction SVGs, the AIS and PILOT diagrams, plus assets written during the run.
- **11 HTML**: icon proof sheets, territory proof sheets, territory comparison/misuse sheets, print templates, case-study sheet, OG card templates.
- Per-file inventory with byte sizes: §11 of the raw output.

## 4. Trademarks and registration words

### 4.1 `®` / `™` occurrences

All are governance prose that **prohibits or discusses** the symbols — e.g.
`MC-04-EXECUTION-PLAN.md:19`, `COMMERCIAL-BRAND-CLAIMS-POLICY.md:88`,
`BRAND-AND-IP-DECISION-PACKAGE.md:98`, `BRAND-ARCHITECTURE.md:137`,
`BRAND-VOICE-ES-EN.md:109,229`, `MC-04-VISUAL-IDENTITY-BRIEF.md:32,289,559,1338,1803`,
`MC-03-REVIEW.md` (several), and the prohibition lines inside this milestone's own two documents.
No authored SVG or proof sheet contains either symbol.

**Disposition: no violation.** The rule is not "the symbol may never appear" (it must be discussable)
but "no symbol attached to MAREA / a family / a bundle", tested separately in §4.2.

### 4.2 Decisive test — symbol *attached* to the brand (Scan 8)

Pattern: `\bmarea(?:\s+(?:NAV|HUB|AIS|PILOT|SENSE|WATCH|DISPLAY|WEATHER|FLEET|START|CRUISE|SAIL|PROTECT|COMPLETE))*\s*[®™]`

Result: **6 lines, all in `docs/marea/brand/MC-03-REVIEW.md`** (85, 93, 147, 152, 188, 191), each quoting
the *rejected negative test case* `MAREA®` while documenting the validator's regression tests; finding
**N-9** in that same review already records the hygiene point.

**Disposition: no MC-04 violation; pre-existing MC-03 item F-2.** No MC-04 document, no authored SVG and
no proof sheet carries an attached symbol.

### 4.3 "registered trademark" / "marca registrada"

All hits are: a prohibition; the `forbiddenStatements` example inside the contract (which must contain
it); the approved negative message "no está registrada y no se presenta como marca registrada"; or a
third party's "registered address" in the trademark research/CSV. **Disposition: no violation.**

## 5. Findings that need an owner's action (Governance does not edit these)

| ID | Severity | File / line | Finding | Recommended wording | Owner |
| --- | --- | --- | --- | --- | --- |
| **F-1** | **RESOLVED (verified 18:50:02)** | `docs/marea/brand/assets/icons/ui/index.html` | The proof sheet previously said "**Conjunto original** / original set" and "**Marca original** de objetivo / **Original** target marker". **Verified fixed**: the strings are gone and the `originality-claim` scan pattern now returns **0 hits** across the whole frozen tree. The page still states `ORIGINALITY_PROFESSIONAL_CHECK = PENDING`. | Closed; the author's reworded text stands. | InstrumentIcons (resolved); IndependentReviewer to verify |
| **F-2** | LOW (pre-existing MC-03) | `docs/marea/brand/MC-03-REVIEW.md:85,93,147,152,188,191` | Six attached-symbol matches inside quoted fixtures. Harmless in context, but a naive grep flags it and adding this file to `governedPaths` would FAIL the validator. | Optional hygiene: say "an attached registered-trademark symbol" and keep the literal only in `scripts/check-brand.test.mjs`. | Lead / MC-03 author |
| **F-3** | **CLOSED — final frozen-tree verification (§13)** | `docs/marea/brand/assets/diagrams/` (3 files) and `docs/marea/brand/specimens/` (3 files, final per the Lead) | **All three diagrams and all three specimens carry the required disclaimers verbatim** in the final run: every diagram has its family clause + the navigation clause; specimens have their family clauses + navigation; the "alerts" specimen explicitly states it shows no AIS/PILOT data, so its `AIS-ABSENT` flag is correct by design. No ECDIS/certification/collision-avoidance/autonomy claim found — the only `ECDIS` text in the ecosystem diagram is the denial "no ECDIS". | Closed. No re-run needed unless a file changes after freeze; the binding hashes in D-16 §9.7 pin the verified artefacts. | Governance (closed) |
| **F-4** | INFO | `docs/marea/brand/evidence/**` | Evidence artefacts are excluded from the scan (they quote prohibited strings as data); printed in the report header. | Keep the exclusion. | Governance |
| **F-5** | **RESOLVED for shipped assets; residual INFO (§13)** | **43 raster files**; `docs/marea/assets/manifest/MC-04-ASSETS.yaml` exists and registers **24** of them (with real SHA-256, 0 `ai_generated: true`) | The deliverable rasters (app icons, favicons, OG cards) are registered with provenance — §9.5 satisfied for shipped assets. The **19 unregistered rasters are all internal evidence renders** (12 `territories/evidence/visual-check`, 2 `territories/evidence` reading-test images, 5 `evidence/review/raw`) — evidence artefacts, not page assets. | No change required for ships; optional hygiene: declare the 19 evidence renders as evidence artefacts (or register them) so no file is unaccounted for. Do not promote any to `public/` until a write scope exists (B23). | AssetProduction (optional hygiene) |
| **F-6** | **RESOLVED** (was ACTION FOR LEAD) | `docs/marea/brand/ICONOGRAPHY-SYSTEM.md` (purpose paragraph) | Adding that document to `governedPaths` **failed** on the false positive `invented family name "MAREA ONE"`, caused by the prose "Give MAREA one small, consistent…". **Verified fixed on 2026-10-30**: the author rewrote it as "Give MAREA a small, consistent…" and the full-proposal trial now returns **PASS (exit 0; 18 files scanned, 5 skipped)**. The validator was not changed. | Reword the sentence (done); if it recurs, fix the wording, never the validator. | Lead / InstrumentIcons (resolved) |

## 6. Disclaimers, ECDIS-equivalence, autonomy and safety implications

### 6.1 Mandatory disclaimer presence in authored artwork (claims policy §9, brief §7.7) — **verified for both existing diagrams**

| Disclaimer | SVG hits | HTML hits | Where observed |
| --- | ---: | ---: | --- |
| NAV ES «ayuda a la navegación» | **2** | 0 | `assets/diagrams/marea-ais-receive-only.svg`, `marea-pilot-supervised-boundary.svg` — verbatim |
| NAV EN "navigational aid" | **2** | 0 | same two diagrams — verbatim |
| AIS ES «únicamente de escucha» | **1** | 1 | AIS diagram body; also `index.html` |
| AIS EN "receive-only" | **2** | 2 | AIS diagram `<title>` + body; `index.html` |
| PILOT ES «asistido y supervisado» | **1** | 1 | `marea-pilot-supervised-boundary.svg` (3 occurrences); `index.html` |
| PILOT EN "assisted and supervised" | **1** | 1 | PILOT diagram; `index.html` |
| WEATHER ES «probabil» | 0 | 0 | no weather surface exists yet — correct |
| WEATHER EN "probabilistic" | 0 | 0 | same |

Verified by direct inspection: the AIS diagram also carries "ILUSTRATIVO / ILLUSTRATIVE · no certificado /
not certified · revisión de ingeniería", "sin transpondedor ni DSC · no transponder, no DSC · recepción
únicamente", and "It is not a collision-avoidance system." The PILOT diagram carries the supervised-steering
clause in ES and EN plus "not certified". The normative clauses are **present verbatim 8/8** in
`COMMERCIAL-BRAND-CLAIMS-POLICY.md`.

**Disposition.** Both diagrams that exist satisfy the requirement. The **ecosystem diagram** and the
**instrument specimens** remain unverified because absent (F-3).

### 6.2 ECDIS / certification-equivalence / autonomy implications (corrected patterns)

| Pattern | Files | Lines | Disposition |
| --- | ---: | ---: | --- |
| `\bECDIS\b` | 8 | 20 | All prohibitions ("no ECDIS-class claim"). |
| `\bSOLAS\b|\bGMDSS\b|\bdistress\b` | 5 | 7 | All prohibitions/negative clauses. (The earlier 83-line figure was a **false positive**: the substring "solas" inside the font stack `Consolas`. Word boundaries were added and the scan re-run — this record supersedes the earlier number.) |
| `\bautonomous steering\b` etc. | 9 | 23 | Approved PILOT denials and prohibitions; no positive claim. |
| remote helm | 5 | 9 | Prohibitions and the approved PILOT disclaimer. |
| safety guarantee | 1 | 1 | Claims-policy prohibition only. |

### 6.3 Packaging dielines

All six dielines carry explicit **negative** certification statements ("No contiene marcas CE, NMEA, IP
ni símbolos de certificación"; "Sin datos de rendimiento, certificación ni disponibilidad: no
verificados"; `<desc>` "Not certified, not produced, not printed"). `CE`/`NMEA`/`certificación` appear
**only as denials**. **Disposition: no violation.**

## 7. Fabricated-image / provenance integrity (Scan 5)

| Check | Result |
| --- | --- |
| Raster/video files under `docs/marea/**` | **22** — `assets/icons` (5), `assets/icons/app` (4 app-icon sizes), `assets/social` (2 OG cards), `territories/evidence/visual-check` (9), `evidence/review/raw` (2) |
| Nature of those files | deterministic renders of our own authored SVG/HTML (verified by inspection, e.g. `mark-compact.png` 1200×1202 flat navy construction); **none is a photograph, a stock image or an AI-generated image** |
| Manifest `ai_generated: true` lines | 17 (16 blocked briefs + 1 shared-defaults header; describes the *future* file only) |
| Manifest file-path entries / real SHA-256 / `generated_at` dates | **0 / 0 / 0** |
| Photographic or CGI asset files | **0** |

**Disposition:** no fabricated image and no invented provenance. The 22 rasters are honest deterministic
renders of authored artwork, but **none is yet in a manifest** → F-5 (owner: AssetProduction).

## 8. `scripts/check-brand.mjs` `governedPaths` — empirical recommendation (Lead decides)

### 8.1 Hard constraint discovered

`scripts/check-brand.mjs` rejects any `governedPaths` entry outside `docs/marea/brand/`. Therefore:

- ✅ MC-04 **documents** under `docs/marea/brand/` can be governed.
- ❌ `docs/marea/assets/manifest/MC-04-BRIEFS.yaml` **cannot**. Adding it would make `npm run test:brand`
  FAIL with "is outside docs/marea/brand/". Manifest governance needs a separate validator (MC-01 B8 open).
- ❌ `docs/marea/brand/MC-03-REVIEW.md` must **not** be added until F-2 is fixed (quoted `MAREA®`).
- ✅ `docs/marea/brand/ICONOGRAPHY-SYSTEM.md` **is now clean**: its author reworded the sentence that
  tripped the false positive ("Give MAREA a small, consistent…" instead of "Give MAREA one small…"), and
  the full-proposal trial below now PASSES. The validator was not weakened.

### 8.2 Proposed additions and what the trial proved

The trial copies the existing governed files plus the proposed additions into an isolated root, writes a
**trial copy** of the contract there (the real contract is **never** modified by the script — verified
after each run), and runs the **real validator**.

| Scenario | Proposed additions | Validator result (latest run) |
| --- | --- | --- |
| **A — full list (12)** | `ORIGINALITY-AND-PRIOR-ART-CHECK.md`, `PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md`, `IDENTITY-SYSTEM.md`, `TERRITORY-COMPARISON.md`, `TYPOGRAPHY-SYSTEM.md`, `COLOUR-SYSTEM.md`, `MC-04-ACCESSIBILITY-EVIDENCE.md`, `ICONOGRAPHY-SYSTEM.md`, `ILLUSTRATION-STANDARDS.md`, `HARDWARE-CMF-DIRECTION.md`, `PACKAGING-DIRECTION.md`, `BRAND-GOVERNANCE-IMPLEMENTATION.md` | **PASS (exit 0)** — `21 checks, 21 passed, 0 failed; 18 files scanned, 5 skipped` after the `ICONOGRAPHY-SYSTEM.md` rewording (**F-6 resolved**). Earlier the same scenario FAILED on that one line; the fix is the wording, not the validator. |
| **B — minimal (2)** | `ORIGINALITY-AND-PRIOR-ART-CHECK.md`, `PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md` | **PASS (exit 0)** — `21/21 checks, 13 files scanned, 0 skipped` (**D-16 and D-12 govern cleanly**). |

**Recommendation for the Lead (now confirmed twice by the real validator):** the two D-16/D-12 documents
are proven safe to govern and were added on 2026-10-30; the remaining MC-04 brand documents can be added
batch by batch as they land, re-running the trial after each addition. `MC-04-EXECUTION-PLAN.md`/
`MC-04-DELIVERY.md`/`MC-04-REVIEW.md` are optional additions after the review is final (review prose
quotes violations by design).

### 8.3 Current real-contract status (verified after the Lead's edits)

Rolling state at the last check (2026-10-30, 18:43): the Lead has expanded `governedPaths` to **20
entries** — the 11 original governed files plus **all nine MC-04 brand documents now present**
(`ORIGINALITY-AND-PRIOR-ART-CHECK.md` 662 lines, `PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md` 639,
`TYPOGRAPHY-SYSTEM.md` 431, `COLOUR-SYSTEM.md` 424, `ICONOGRAPHY-SYSTEM.md` 493,
`ILLUSTRATION-STANDARDS.md` 279, `HARDWARE-CMF-DIRECTION.md` 254, `PACKAGING-DIRECTION.md` 193,
`MC-04-ACCESSIBILITY-EVIDENCE.md` 205).

`npm run test:brand` → `PASS contract.governedPaths — 20 governed paths`; `21 checks run, 21 passed,
0 failed; 20 files scanned, 0 skipped. RESULT: PASS` (exit 0). Governance did **not** edit the contract
or the validator; the manifest (`docs/marea/assets/manifest/MC-04-BRIEFS.yaml`) remains outside this
validator by design.

## 9. Limitations (must travel with this evidence)

1. **Point-in-time snapshot.** Other MC-04 authors were writing files during all three runs (an early run
   even hit a file lock on `assets/diagrams/marea-ais-receive-only.svg`). Counts are true at 18:35:21 only;
   the Lead must re-run C-1 before sign-off.
2. **Pattern lists are finite.** A clean scan is not compliance. Semantic implications, styling that
   resembles a certification mark, and visual similarity are **not** grep-detectable.
3. **Two false positives were found and corrected during this task** (case-insensitive `CLEARED`;
   "Con**solas**" matching `SOLAS`). Both are recorded openly because the first run's numbers were
   reported to the Lead before correction — the corrected run supersedes it.
4. **Evidence folder excludes itself** from the scan (§2) — stated in the report header.
5. **Nothing here is a trademark clearance or an originality opinion**, and none of it may be cited as one.
6. **F-3 remains open**: PILOT diagram, ecosystem diagram and instrument specimens did not exist at scan
   time; their mandatory disclaimers are unverified, not absent-by-design.

## 10. Reproduction

```powershell
cd C:\Users\Admin\Documents\workspace\embarcarte
pwsh -NoProfile -File docs/marea/brand/evidence/governance/run-compliance-scan.ps1
pwsh -NoProfile -File docs/marea/brand/evidence/governance/run-governedpaths-trial.ps1
npm run test:brand
```

After the remaining diagrams/specimens land, re-run C-1 and expect: `DIR … diagrams = EXISTS (3 files)`,
`DIR … specimens = EXISTS`, and `AIS-OK / PILOT-OK / NAV-OK` flags per diagram.

## 11. Change log

| Date | Change |
| --- | --- |
| 2026-10-30 18:31 | First run (21 text / 63 SVG / 2 HTML). Reported to Lead: symbol attachment only in MC-03 quoted fixtures; no fabricated image; trial A (12 docs) PASS at that moment. |
| 2026-10-30 18:36 | Second run (30 text / 96 SVG / 9 HTML) after logo, territory, diagram, print and iconography files landed. Corrected two false-positive pattern sets (case-insensitive `CLEARED`; `SOLAS` inside "Consolas"); added the two-scenario governedPaths trial; found F-1…F-6; verified the AIS diagram's disclaimers; recorded 11 evidence rasters and the missing manifest entry (F-5). |
| 2026-10-30 18:35:21 (authoritative) | Third run (32 text / 103 SVG / 11 HTML / 22 rasters) after the PILOT diagram, social cards, app icons and territory comparison sheets landed. **PILOT diagram disclaimers now verified**; F-3 narrowed to "ecosystem diagram + specimens absent"; F-5 broadened to all 22 rasters; scenario A still FAIL on the `ICONOGRAPHY-SYSTEM.md` "MAREA one" false positive (F-6), scenario B still PASS, real contract still 11 governedPaths. |
| 2026-10-30 (late) | Fourth check after the Lead's contract edit: real `governedPaths` = **13** (D-16 + D-12 added) and `npm run test:brand` = `21/21 PASS; 13 files scanned, 0 skipped`. `ICONOGRAPHY-SYSTEM.md` reworded by its author; **Scenario A (full 12-document proposal) now PASSES** (18 scanned, 5 not-yet-produced skipped). **F-6 resolved.** No scan content changed, so the §2 pattern totals still describe the 18:35:21 content. |
| 2026-10-30 18:42 | **IR-09 fix (manifest; outside the brand-dir scanner):** the 68 Spanish captions/alt values in `docs/marea/assets/manifest/MC-04-BRIEFS.yaml` were accent-stripped; restored (48 distinct strings, 68 replacements) with correct Spanish and « »; 0 → 247 non-ASCII chars inside ES values, 0 stripped forms left; file 87,917 B. No prohibited-pattern content changed; the manifest is not scanned by `check-brand.mjs` (it lives outside `docs/marea/brand/`). Full evidence: `MC-04-BRIEFS-IR09-EVIDENCE.md` + `MC-04-BRIEFS-IR09-OUTPUT.txt`. |
| 2026-10-30 18:43:55 | **Fifth run — F-3 closure run** (44 text / 104 SVG / 14 HTML / 40 rasters / 2 manifests) after the ecosystem diagram and the three specimens landed. **F-3 CLOSED**: all three diagrams and all three specimens carry the required disclaimers verbatim (§12); no ECDIS/certification/collision-avoidance/autonomy claim. **F-5 largely resolved**: `MC-04-ASSETS.yaml` now exists with 119 files / 119 real SHA-256 / 0 `ai_generated: true`; residual = 17 internal evidence renders not declared. Symbol attachment still only in MC-03 quoted fixtures (6); SVG hygiene 0 issues in 104. Caveat: specimens may still be revised — final re-scan requested at FROZEN. |
| 2026-10-30 18:50:02 | **Sixth run — FINAL FROZEN-TREE run** (48 text / 104 SVG / 15 HTML / 43 rasters / 2 manifests), after the Lead's FROZEN signal and after Governance bound 21 files in D-16 §9.7. F-3 re-verified and **closed finally** against the frozen specimens (§13.1) — the bound hashes and the verified content are the same bytes. **F-1 RESOLVED** (originality-claim pattern 0 hits). **F-5 resolved for shipped assets** (manifest registers 24 of 43 rasters; 19 evidence renders undeclared, INFO). Only **F-2** remains open (MC-03 quoted fixture, out of MC-04 scope). `npm run test:brand`: 21/21 PASS, 20 files scanned, 20 governed paths. |

## 12. Addendum — F-3 closure run (2026-10-30 18:43:55)

Command (exact): `pwsh -NoProfile -File docs/marea/brand/evidence/governance/run-compliance-scan.ps1`
Raw output: `MC-04-COMPLIANCE-SCAN-OUTPUT.txt` (718 lines).

Scope: **44 text files, 104 SVG, 14 HTML**, 40 raster files under `docs/marea/**`, 2 manifests
(`MC-04-ASSETS.yaml`, `MC-04-BRIEFS.yaml`).

### 12.1 Mandatory disclaimer presence — per file (the Lead-requested F-3 check)

| Surface | AIS clause | PILOT clause | Navigation clause | Disposition |
| --- | --- | --- | --- | --- |
| `assets/diagrams/marea-ais-receive-only.svg` | **AIS-OK** (ES+EN) | AIS-ABSENT (correct — no pilot content) | **NAV-OK** (ES+EN) | PASS |
| `assets/diagrams/marea-ecosystem-overview.svg` | **AIS-OK** | **PILOT-OK** | **NAV-OK** | PASS |
| `assets/diagrams/marea-pilot-supervised-boundary.svg` | AIS-ABSENT (correct) | **PILOT-OK** (ES+EN) | **NAV-OK** | PASS |
| `specimens/alerts.html` | AIS-ABSENT — **correct by design**: the page states "esta página no muestra datos AIS ni PILOT; sus avisos están en sus propias superficies" | **PILOT-OK** | **NAV-OK** | PASS |
| `specimens/index.html` | **AIS-OK** | **PILOT-OK** | **NAV-OK** | PASS |
| `specimens/pilot.html` | AIS-ABSENT (correct) | **PILOT-OK** | **NAV-OK** | PASS |

Aggregate scan counters for the same run: NAV ES 3 SVG / 4 HTML; NAV EN 3 / 4; AIS ES 2 / 2; AIS EN 3 / 3;
PILOT ES 2 / 3; PILOT EN 2 / 3; WEATHER ES 1 / 1; WEATHER EN 1 / 1 (the ecosystem diagram/specimen
carry the weather clause). All eight normative clauses remain **PRESENT verbatim** in
`COMMERCIAL-BRAND-CLAIMS-POLICY.md`.

### 12.2 No certification / ECDIS-equivalence / collision-avoidance / autonomy claim in the new artwork

- The single `ECDIS` occurrence in the ecosystem diagram is the denial text **"no ECDIS"**
  (`marea-ecosystem-overview.svg:80`) — a prohibition, not a claim.
- `collision avoidance` occurrences in the ecosystem diagram and in `specimens/index.html` are the
  **approved AIS disclaimer** ("No constituye un sistema de evitación de colisiones ni un transpondedor").
- `autonomous steering` occurrences are the **approved PILOT disclaimer** and its specimen notes.
- No positive certification, availability, price or performance claim was found in the new artwork; the
  packaging dielines' negative certification statements are unchanged.

### 12.3 Integrity counters for the same run

| Check | Result |
| --- | --- |
| Symbol attached to MAREA / family / bundle | **6 lines, all in `MC-03-REVIEW.md`** quoted negative fixtures (F-2) — none in MC-04 files or artwork |
| SVG hygiene (`<title>`, `viewBox`, no script/external) | **0 issues in 104 SVGs** |
| Raster/video files under `docs/marea` | **40**, all deterministic renders/screenshots of authored SVG/HTML; none photographic |
| `MC-04-ASSETS.yaml` | 119 file paths, **119 real SHA-256**, **0** `ai_generated: true` |
| `MC-04-BRIEFS.yaml` | 17 `ai_generated: true` lines (describes future files only), **0** file paths, **0** SHA-256, **0** `generated_at` dates |
| Fabricated image | **none found** |

**F-3 disposition: CLOSED.** Final re-scan remains scheduled at the Lead's FROZEN signal because the
specimens may still be revised; the same script prints the per-file flags above and will show any
regression directly.

## 13. Addendum — FINAL frozen-tree run (2026-10-30 18:50:02), F-3/F-5 closure

Command (exact): `pwsh -NoProfile -File docs/marea/brand/evidence/governance/run-compliance-scan.ps1`
Raw output: `MC-04-COMPLIANCE-SCAN-OUTPUT.txt` (**736 lines**). Cross-check:
`npm run test:brand` → `PASS contract.governedPaths — 20 governed paths`,
`Summary: 21 checks run, 21 passed, 0 failed; 20 files scanned, 0 skipped. RESULT: PASS`.

Scope of the final run: **48 text files, 104 SVG, 15 HTML**, **43 raster** files under `docs/marea/**`,
2 manifests (`MC-04-ASSETS.yaml`, `MC-04-BRIEFS.yaml`).

### 13.1 F-3 — final disclaimer verification (FROZEN specimens)

| Surface | AIS | PILOT | Navigation | Disposition |
| --- | --- | --- | --- | --- |
| `assets/diagrams/marea-ais-receive-only.svg` | **AIS-OK** | AIS-ABSENT (correct) | **NAV-OK** | PASS |
| `assets/diagrams/marea-ecosystem-overview.svg` | **AIS-OK** | **PILOT-OK** | **NAV-OK** | PASS |
| `assets/diagrams/marea-pilot-supervised-boundary.svg` | AIS-ABSENT (correct) | **PILOT-OK** | **NAV-OK** | PASS |
| `specimens/alerts.html` | AIS-ABSENT — **correct by design** ("esta página no muestra datos AIS ni PILOT") | **PILOT-OK** | **NAV-OK** | PASS |
| `specimens/index.html` | **AIS-OK** | **PILOT-OK** | **NAV-OK** | PASS |
| `specimens/pilot.html` | AIS-ABSENT (correct) | **PILOT-OK** | **NAV-OK** | PASS |

The three diagrams and three specimens in this table are **exactly the ones bound by SHA-256 in D-16 §9.7**,
so the verified artefacts and the verified content are pinned to the same bytes. Aggregate counters: NAV
ES 3 SVG / 4 HTML; NAV EN 3 / 4; AIS ES 2 / 2; AIS EN 3 / 3; PILOT ES 2 / 3; PILOT EN 2 / 3; WEATHER
ES 1 / 1; WEATHER EN 1 / 1. **F-3 CLOSED at freeze.**

### 13.2 Integrity counters and finding status at freeze

| Check | Result |
| --- | --- |
| Symbol attached to MAREA / family / bundle | **6 lines, all in `MC-03-REVIEW.md`** quoted negative fixtures → **F-2 stays OPEN / out of MC-04 scope** |
| Originality-claim pattern (`original set`, `marca original`, …) | **0 hits** → **F-1 RESOLVED** |
| SVG hygiene (`<title>`, `viewBox`, no script/external) | **0 issues in 104 SVGs** |
| Raster/video files under `docs/marea` | **43**, all deterministic renders/screenshots of authored SVG/HTML; none photographic |
| `MC-04-ASSETS.yaml` | registers **24** of the 43 rasters, with real SHA-256 and **0** `ai_generated: true` → **F-5 resolved for shipped assets**; 19 internal evidence renders remain undeclared (INFO) |
| `MC-04-BRIEFS.yaml` | 17 `ai_generated: true` lines (future files only), **0** file paths, **0** SHA-256, **0** `generated_at` dates |
| Fabricated image / invented provenance | **none found** |
| ECDIS / certification-equivalence / collision-avoidance / autonomy claim | **none**; the only `ECDIS` text in the ecosystem diagram is the denial "no ECDIS" |

**Final disposition:** no MC-04 failure-level prohibited pattern in the frozen tree. Open items for other
owners: **F-2** only (pre-existing MC-03 quoted fixture, explicitly out of MC-04 scope). The evidence
record can be frozen with this run; any later file change reopens the scan.

## 14. Addendum — post-rebind (v2) frozen-tree run (2026-10-30 19:13:30)

Context: after this record's §13 run, the Lead ordered a **delete-and-rebind** because the master artwork was
reissued from construction B and AssetProduction re-rendered with `--all`. D-16 §9.7 was rebound (35 files,
2026-10-30T19:11:46+01:00; v1 archived) and this scan was re-run on the reissued tree.

Command (exact): `pwsh -NoProfile -File docs/marea/brand/evidence/governance/run-compliance-scan.ps1`
Raw output: `MC-04-COMPLIANCE-SCAN-OUTPUT.txt` (**740 lines**).
Cross-check: `npm run test:brand` → `Summary: 21 checks run, 21 passed, 0 failed; 24 files scanned, 0 skipped. RESULT: PASS`
(the governed list grew again; D-16 at 892 lines is scanned clean).

### 14.1 Scope and results

| Item | Result |
| --- | --- |
| Scope | **49 text files, 104 SVG, 15 HTML**, **43 raster**, 2 manifests |
| F-3 disclaimer flags (unchanged, re-verified) | diagrams: AIS→AIS-OK/PILOT-ABSENT/NAV-OK · ecosystem→AIS-OK/PILOT-OK/NAV-OK · PILOT→AIS-ABSENT/PILOT-OK/NAV-OK; specimens: alerts→AIS-ABSENT(correct by design)/PILOT-OK/NAV-OK · index→AIS-OK/PILOT-OK/NAV-OK · pilot→AIS-ABSENT(correct)/PILOT-OK/NAV-OK |
| Symbol attached to MAREA / family / bundle | **6 lines, all in `MC-03-REVIEW.md`** quoted fixtures → **F-2 stays OPEN / out of scope** |
| SVG hygiene | **0 issues in 104 SVGs** |
| Raster/video files | **43**, all deterministic renders/screenshots; none photographic |
| Manifests | `MC-04-ASSETS.yaml` present with real SHA-256 / 0 `ai_generated: true`; `MC-04-BRIEFS.yaml` still 0 file paths / 0 SHA-256 / 0 `generated_at` |
| Fabricated image / invented provenance | **none found** |
| ECDIS / certification / collision-avoidance / autonomy claim | **none** |

**Note on the rebind:** the three diagrams and three specimens kept **byte-identical SHA-256** across v1→v2
(they were not re-rendered), so their F-3 verification did not need redoing — but they were rebound anyway,
so the bound hashes and the verified content still refer to the same bytes. The master/logo files are the
ones that changed and were rebound.

**Disposition:** the post-rebind frozen tree shows no MC-04 failure-level prohibited pattern; the only open
warning remains **F-2** (out of MC-04 scope). Re-run this script if any file changes again.
