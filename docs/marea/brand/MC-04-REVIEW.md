# MC-04 — Independent review record (D-19)

| Field | Value |
| --- | --- |
| Document ID | `MC-04 / D-19 / MC-04-REVIEW` |
| Status | **DRAFT — PHASE 2 PENDING.** Phase-1 findings and evidence are final for the snapshot cited; the G1–G7 dispositions, verdict and Phase-2 sections are completed only against the frozen tree after the Lead's `FREEZE` signal. |
| Reviewer | IndependentReviewer (AI agent) — did not author any MC-04 artifact |
| Author ≠ reviewer | Yes for every reviewed artifact: authors are IdentityVector, TypeColour, InstrumentIcons, AssetProduction, Governance, Lead (see QA-28 record §1.3) |
| Milestone | MC-04 — MAREA visual identity system (internal, provisional) |
| Branch / base | `feature/marea-mc04-visual-identity` / `b0b010dd0b45eec455951393e0dabf1f3df53eca` (MC-03 HEAD) |
| Date | 2026-10-30 |
| Write scope | `docs/marea/brand/MC-04-REVIEW.md`, `docs/marea/brand/evidence/review/**` only. No author file, no `src/`, no `public/`, no Git write command was executed. |
| Authority | `MC-04-VISUAL-IDENTITY-BRIEF.md` §11–§12 (gates G1–G7, QA-01…QA-28, §12.4–§12.6); `MC-04-EXECUTION-PLAN.md`; `marea-quality-gate` skill method |
| Review method | Real files + real commands executed in this session; never the authors' summaries. Every quoted number was re-derived from the artefact or re-measured independently. |

> **THIS IS AN AI-AGENT REVIEW. IT IS NOT HUMAN USER RESEARCH, NOT A PROFESSIONAL
> CERTIFICATION, NOT LEGAL CLEARANCE, NOT A TRADEMARK/ORIGINALITY OPINION AND NOT A
> COLOUR-VISION-DEFICIENCY USABILITY TEST.** It cannot substitute for any of them. Gate G3
> (professional originality/prior-art/freedom-to-use) stays **BLOCKED/PENDING** and no agent
> may close it. Where an external fact could not be verified from this machine (URL resolution,
> live register status, icon-library visual similarity) it is recorded **NOT VERIFIED**, never
> PASS.

---

## 0. Verdict input (completed against the frozen tree)

<!-- PHASE2:VERDICT -->

| Item | Value |
| --- | --- |
| Independent verdict input (G7) | `PENDING FREEZE` |
| Scope of that verdict | Internal design/QA scope of MC-04 only |
| Conditions attached | see §8 |
| Milestone truth preserved | `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`; `PUBLIC_MAREA_BRAND_USE = NO_GO`; `ORIGINALITY_PROFESSIONAL_CHECK = PENDING`; `FINAL_IDENTITY_ADOPTION = BLOCKED`; `PUBLICATION = BLOCKED`; `IMAGE_GENERATION = BLOCKED`; hardware certifications `NOT_EVIDENCED`; products `NOT_FOR_SALE` |

---

## 1. Methodology, independence and evidence handling

### 1.1 Method

1. Read the authoritative brief in full for the sections that gate this milestone (§2.2, §2.4,
   §5.5–§5.7, §7.4–§7.7, §9.2–§9.4, §10.5, §11, §12, §13.2) and the execution plan.
2. Inspected the actual working tree (`git status`, file reads, byte-level inspection) — never a
   delivery summary.
3. Re-ran every repository gate that applies, captured the real exit code and output tail.
4. Re-derived every arithmetic/measurement claim independently with reviewer-written tooling
   (different code path from the author scripts): WCAG ratios, font digit advances and glyph
   coverage, raster/ICO/PDF headers and SHA-256, SVG strict XML parsing, icon ink bounds and
   distinctness, manifest↔file reconciliation, diagram disclaimer text.
5. Classified every claim `VERIFIED` / `PARTIAL` / `NOT VERIFIED` / `BLOCKED` with the evidence.
6. Reported defects with ID, severity, `file:line` and the exact command/reproduction.

Severity definitions used: **BLOCKING** = a §12.5 failure condition or a fabrication/scope
violation that makes the milestone un-salvageable; **MAJOR** = a required deliverable or gate is
wrong/incomplete in a way that must be fixed before acceptance; **MINOR** = a real defect that
does not by itself block acceptance but must be corrected or explicitly accepted; **NIT** =
wording/consistency.

### 1.2 Reviewer tooling (all under `docs/marea/brand/evidence/review/tools/`)

| Tool | Purpose |
| --- | --- |
| `icon-audit.mjs` | strict Chromium `DOMParser` (image/svg+xml) parse + hygiene + semantics of all 57 UI icons |
| `icon-html-audit.mjs` | index.html vs master geometry, ES/EN captions, byte claims, prohibited wording |
| `icon-bounds.mjs` | real ink bounding box via `SVGGraphicsElement.getBBox()` + stroke/2, padding claims |
| `icon-iou.mjs` | native 16/24/32 px rasterisation → pairwise ink-mask IoU (small-size distinctness) |
| `icon-screenshot.mjs`, `icon-pair-compare.mjs` | reviewer visual evidence at native sizes (DPR 4/8) |
| `typography-independent.mjs` | own `@font-face` probe from shipped woff2 + shipped unicode-ranges; notdef-mask glyph coverage; tnum measurement |
| `dist-font-audit.mjs` | built CSS `@font-face` origins / emitted woff2 byte count |
| `contrast-independent.mjs` | independent WCAG recomputation of all 190 pairs from raw colours |
| `board-audit.mjs` | renders the CVD/greyscale evidence boards, console errors, specimen counts, honesty labels |
| `claims-audit.py` | recomputes 45 quoted numeric/arithmetic claims in D-06/D-07/D-17 |
| `reference-check.py` | QA-27 cross-document broken-reference check |
| `prohibited-pattern-scan.py` | independent claims-policy screening (128 files) |
| `briefs-audit.py` | PyYAML parse of `MC-04-BRIEFS.yaml` (20-field completeness, blocked honesty) |
| `manifest-audit.py` | `MC-04-ASSETS.yaml`↔disk reconciliation (bytes, SHA-256, dimensions, coverage) |
| `raster-audit.mjs` | independent PNG/JPEG/ICO/PDF/WebP header measurement + SHA-256 |
| `svg-all-audit.mjs` | strict XML parse + hygiene of every authored SVG in the asset tree |
| `diagram-audit.py` | §7.7 verbatim disclaimers, AIS receive-only, PILOT E-stop/takeover/watchdog, ecosystem boundaries |

No tool writes to an author path; all outputs go to `docs/marea/brand/evidence/review/raw/`.

### 1.3 QA-28 independence record (author ≠ reviewer)

| Artifact group | Author (per execution plan) | Independent review performed by |
| --- | --- | --- |
| D-01/D-02/D-03 identity, territories, lockups | IdentityVector | IndependentReviewer (this file) — nothing in it was authored here |
| D-06/D-07/D-08/D-17 typography, colour, tokens, accessibility evidence | TypeColour | IndependentReviewer |
| D-09/D-10/D-11 icons, illustration standards, diagrams | InstrumentIcons | IndependentReviewer |
| D-04/D-05/D-12/D-13/D-14/D-15 app icons, OG, renders, CMF, packaging, print | AssetProduction | IndependentReviewer |
| D-12 briefs, D-16 originality, compliance evidence | Governance | IndependentReviewer |
| D-18 delivery record, execution plan, integration | Lead | IndependentReviewer |
| D-19 review record | IndependentReviewer (this file) | n/a — reviewer-owned; signed below |

**Author ≠ reviewer is satisfied for every artifact reviewed.** The author of D-19 is the
reviewer, which is the intended property of D-19 itself.

<!-- PHASE2:QA28SIGNOFF -->

### 1.4 What this review cannot do (stated up front)

- It cannot establish WCAG 2.2 AA conformance, colour-blind safety, sunlight/night legibility,
  print legibility, salt-spray/IP/material performance, or that any product exists.
- It cannot perform a professional originality / prior-art / freedom-to-use search (G3) and does not
  claim the identity or the icon system is original, distinctive or clear of third-party rights.
- It cannot verify external URLs, registries or web sources from this session (the web-fetch
  endpoint returned HTTP 404 throughout), so every externally-sourced fact is `NOT VERIFIED` by me.
- It cannot replace a human visual/accessibility review; QA-03/QA-04/QA-28 human sign-off remains
  open even where an AI visual inspection was performed.

---

## 2. Commands executed by the reviewer and their real results

<!-- PHASE2:COMMANDS -->

| # | Command | Real result (reviewer run) |
| --- | --- | --- |
| C1 | `git status --short` / `git branch --show-current` / `git log -1 --oneline` | branch `feature/marea-mc04-visual-identity`, HEAD `b0b010d`; no `src/` or `public/` change; only `docs/**` and `scripts/*.mjs` entries (Phase-1 snapshot) |
| C2 | `npm run test:brand` | PASS — 21 checks run, 21 passed, 0 failed; governed-file scan count changes as the Lead extends `governedPaths` (11 at first snapshot, 20 at the latest pre-freeze run) |
| C3 | `npm run test:brand:unit` | PASS — 13 tests, 13 pass, 0 fail |
| C4 | `node scripts/check-typography.mjs --json` (twice: 18:31 and after the author's 18:31:40 fix) | PASS exit 0; the current run reproduces TYPOGRAPHY-SYSTEM.md §9 exactly. Independent re-measurement: DM Sans digit spread 34.0 px @100 px unchanged by `tabular-nums`/`tnum`; Manrope 0.1563 px spread and 0.0000 px column delta; 67/67 chars served in the notdef-mask test |
| C5 | `node scripts/check-contrast.mjs` | PASS exit 0; 190 pairs / 4 modes; 3 AA misses and 12 internal misses are the declared pre-existing findings F-1…F-7. Independent recomputation of all 190 pairs: max delta 0.0000, identical classification/summary |
| C6 | `node docs/.../icon-audit.mjs` | 57 icons, 0 XML parse errors, 0 semantics failures, 0 out-of-canvas ink, no scripts/external refs/embedded raster/filters/text/ids |
| C7 | `node docs/.../icon-html-audit.mjs` | index.html 57/57 cards, 0 geometry mismatches, ES+EN present, declared 24,617 B = actual and max 845 B = actual |
| C8 | `node docs/.../icon-bounds.mjs` | 57/57 within the 24×24 canvas; 13/57 exceed the declared 2 px optical padding (IR-01) |
| C9 | `node docs/.../icon-iou.mjs` | 16 px ink-mask IoU ≥ 0.875 for the device-hub/device-display and ais-target/ais-target-lost pairs (IR-02) |
| C10 | `python docs/.../briefs-audit.py` | 17 assets × 20 brief fields complete; provider `NONE_YET`, `files: []`, `generated_at: null` for every blocked entry; no invented path/URL/SHA/provider |
| C11 | `python docs/.../prohibited-pattern-scan.py` | 128 files; all 26 ®/™ occurrences are prohibitions/honesty statements; every CE/NMEA/IP/waterproof/marine-grade/certified hit is negated or evidence-gated; no availability/price/performance/ECDIS/collision-avoidance/safety claim |
| C12 | `python docs/.../claims-audit.py` | 45 quoted claims recomputed; 2 mismatches, both the D-17 disposition-count line (IR-11) |
| C13 | `python docs/.../reference-check.py` | 47 references across 10 docs; only 2 unmatched, both deliberate globs; 0 real broken references |
| C14 | `node docs/.../board-audit.mjs` | both colour-evidence boards render with 0 console/page errors; 4 CVD `feColorMatrix` filters + WCAG luminance matrix; honesty labels present |
| C15 | `node docs/.../dist-font-audit.mjs` | built CSS: 8 `@font-face`, all relative `./media/*.woff2`, 0 external/data URLs, `font-display: swap`; 8 woff2 = 130,132 B |
| C16 | `node scripts/check-assets.mjs` | PASS at the latest pre-freeze run: 15 manifest entries, 119 asset files, 1:1 coverage, 119 SHA-256/bytes verified, 2 warnings (construction-grid clipped working file; index.html registration wording is a prohibition) |
| C17 | `python docs/.../manifest-audit.py` | 15 entries, 0 unregistered files, 0 hash/byte/dimension mismatches at the latest pre-freeze run (a mid-flight run had 2 stale hashes; the manifest was regenerated) |
| C18 | `node docs/.../raster-audit.mjs` | all raster/ICO/PDF containers valid; OG cards exactly 1200×630 and ≤ 67,585 B; ICO valid with 16/32/48 entries; PDFs `%PDF-1.4`, 2 pages, Skia/Chromium, no encryption/JS/embedded files |
| C19 | `node docs/.../svg-all-audit.mjs` | 104 authored SVGs, 0 XML parse errors, 0 script/image/filter/gradient/external-ref findings |
| C20 | `python docs/.../diagram-audit.py` | 3 diagrams: 0 flags — verbatim §7.7 disclaimers present (AIS: nav+AIS; PILOT: nav+PILOT; ecosystem: all 8), PILOT E-stop/takeover/watchdog/supervised present, AIS receive-only present, no positive collision-avoidance/transponder/ECDIS/certification claim |
| C21 | `node scripts/render-assets.mjs --list` / `--all` / re-hash | <!-- PHASE2:RENDER --> |

---

## 3. G1–G7 disposition

<!-- PHASE2:GATES -->

| Gate | Reviewer (per brief §12.3) | Disposition at this draft | Basis |
| --- | --- | --- | --- |
| **G1** Identity/design review | Independent design reviewer ≠ author | **PENDING FREEZE** (Phase-1 inputs: territory constructions exist, 9 family lockups exist, small-size/engraving evidence needs the independent judgement; IR-01/IR-02/IR-03 open) | §4–§6 below |
| **G2** Accessibility review | Independent accessibility reviewer ≠ author | **PARTIAL** — measured contrast/typography evidence independently verified; boards render; hardware/sunlight/night/human-CVD/print remain NOT_TESTED/BLOCKED; human sign-off cannot be given by an AI agent | C4, C5, C14; §4 |
| **G3** Legal/originality gate | Company + professional counsel/trademark agent | **BLOCKED / PENDING — cannot be closed by any agent** (B9; `ORIGINALITY_PROFESSIONAL_CHECK = PENDING`). The D-16 dossier makes no clearance claim. External resemblance/URL checks were NOT VERIFIED here. | §7 |
| **G4** Claims/honesty review | Independent reviewer | **PASS so far** for the Phase-1 artifact set, with IR-05 (disclaimer coverage), IR-09 (ES diacritics) and the Phase-2 packaging/print/delivery checks pending; no certification/registration/availability/performance implication found | C11 |
| **G5** Data/technical review | Engineering (product owner) | **BLOCKED on engineering** — `ENGINEERING_REVIEW = PENDING` for the diagrams and `NOT_EVIDENCED` for hardware; an AI reviewer cannot substitute for engineering sign-off | C20; ILLUSTRATION-STANDARDS.md |
| **G6** Integration review | Lead | **PENDING FREEZE** — write scopes, `src/`/`public/` cleanliness, manifest, reproducibility, no fabricated files; reviewer input §5–§6 | C1, C16, C17 |
| **G7** Independent milestone verdict | Reviewer ≠ author | **PENDING FREEZE** — final input in §0/§8 | all |

---

## 4. Findings

<!-- PHASE2:FINDINGS -->

### 4.1 Phase-1 findings (final against the cited snapshot)

| ID | Severity | Finding | File:line | Evidence | Disposition |
| --- | --- | --- | --- | --- | --- |
| IR-01 | MINOR | 13/57 icons exceed the declared «2 px optical padding» by up to 1.5 units | `ICONOGRAPHY-SYSTEM.md:194`, `assets/icons/ui/index.html` | `raw/icon-bounds.json` (Chromium `getBBox()`): alert-warning x[1,23], gps-fix x/y[1,23], nav-heading y[0.5,21], solar 0.9, weather-forecast 0.8, … | **OPEN** → InstrumentIcons (Lead-routed). Fix geometry or document the optical overshoot as an explicit exception. |
| IR-02 | MINOR | Small-size distinctness is weak for different-meaning pairs and the documented 16 px text-pairing list is incomplete | `ICONOGRAPHY-SYSTEM.md:312-315` | `raw/icon-iou-strict.json`: 16 px ink-mask IoU ais-target/ais-target-lost 0.909, device-hub/device-display 0.875, wind T/A 0.813, nav-heading/position-marker 0.788; `raw/icon-pair-compare-16px-dpr8.png` shows the cues are present but subtle | **OPEN** → InstrumentIcons. Add the pairs to the documented list or strengthen the cue before G1. Not duplicated art. |
| IR-03 | MINOR | index.html says «variantes de reducción 16/24/32» but the proof only scales the one 24 px master; no 48 px variant | `assets/icons/ui/index.html`, `reduction-proof.html:8`, `ICONOGRAPHY-SYSTEM.md:227-239` | `raw/icon-html-audit.json`: 57 distinct geometries, 57 identical to master, 0 simplified; ICONOGRAPHY §4/§8 disclose the limitation honestly | **OPEN** → InstrumentIcons. Fix index wording, record the missing variants as NOT_PRODUCED. |
| IR-05 | MINOR | Mandatory disclaimer coverage incomplete on icon-adjacent surfaces | `ICONOGRAPHY-SYSTEM.md:169-188`, `assets/icons/ui/index.html` | brief §7.7 mandates navigation/AIS/PILOT/weather; icon docs cover nav+AIS+PILOT but not weather; index.html carries AIS+PILOT only | **OPEN** → InstrumentIcons. Add weather (and nav) disclaimer or state non-applicability. |
| IR-06 | NIT | `reduction-proof.html` carries fewer honesty flags than `index.html` (no LEGAL_REVIEW_PENDING) | `assets/icons/ui/reduction-proof.html` | `raw/icon-html-audit.json` flag lists | **OPEN** → InstrumentIcons. |
| IR-07 | NIT (downgraded) | Token JSON claims role-only names but its web-light baseline block uses legacy colour names | `tokens/marea-instrument-tokens.proposed.json` | `document.roleNamesOnly` vs `modes.web-light.tokens` (navy2, sea*, badge*Bg); COLOUR-SYSTEM §1/§3/§12 clarifies the distinction | **PARTIALLY ADDRESSED** → TypeColour. Scope the statement to instrument roles. |
| IR-08 | NIT (downgraded) | Token JSON says the proposed focus ring “resolves F-1”; F-1 is only proposed | same file, `webTokenMapping.focusRing` | `raw/contrast-independent.json` §f1: web-light still #8fd2f5 at 1.6529:1/1.5540:1/1.5149:1; COLOUR-SYSTEM §7/§14 correctly says “resolved by proposal … MC-06 implements” | **PARTIALLY ADDRESSED** → TypeColour. Reword the JSON string. |
| IR-09 | MINOR | `MC-04-BRIEFS.yaml` ES captions/alt text are stripped of diacritics | `docs/marea/assets/manifest/MC-04-BRIEFS.yaml` | `raw/briefs-audit.json` + byte check: “fotografia”, “instalacion”, “Rias Baixas”; 16 non-ASCII bytes in 87 KB; PHOTOGRAPHY doc has correct accents | **OPEN** → Governance. Restore accents before any brief is consumed. |
| IR-11 | MINOR | `MC-04-ACCESSIBILITY-EVIDENCE.md` disposition-count arithmetic is wrong | `MC-04-ACCESSIBILITY-EVIDENCE.md` (Disposition count line) | `raw/claims-audit.json`: parsed 28 rows → PASS 4 / PARTIAL 16 / NOT_TESTED 5 / BLOCKED 3; the doc states 4/13/6/3 “(28 total)”, whose parts sum to 26 | **OPEN** → TypeColour. Correct to 4/16/5/3. |
| IR-12 | MINOR | D-06 says the numeric role is the only role that moves family, but units and timestamps also move to Manrope | `TYPOGRAPHY-SYSTEM.md:244-246` + §5 table | §4.4 of the brief assigns Unit/suffix and metadata/timestamps to DM Sans; the doc's own §5 assigns both to Manrope | **OPEN** → TypeColour. Reword the deviation scope. |

Closed findings (kept for the audit trail):

| ID | Was | Now | Reason |
| --- | --- | --- | --- |
| IR-04 | MINOR — typography script reported `oflDocumentExemption=false` despite the OFL-1.1 document clause | **RESOLVED (withdrawn)** | My first run predated the author's 18:31:40 fix; the current script reproduces the doc's §9 exactly (`document-exemption=true`, `bundling=true`). The clause is present verbatim in both shipped LICENSE files. |
| IR-10 | MINOR — `scripts/check-typography.mjs` outside every declared write scope | **RESOLVED by Lead** | `MC-04-EXECUTION-PLAN.md:45` now authorizes it and cites IR-10. |

### 4.2 Phase-2 findings

<!-- PHASE2:FINDINGS2 -->

*(To be completed against the frozen tree.)*

---

## 5. Claim-verification matrix (Phase 1, independent)

<!-- PHASE2:CLAIMS -->

| Claim | Status | Evidence |
| --- | --- | --- |
| 57 UI icons are well-formed, self-contained and accessible-semantic | **VERIFIED** | `raw/icon-audit.json`: 0 parse errors; 57/57 `viewBox="0 0 24 24"`, xmlns, `role="img"`, one bilingual `<title>`; no script/image/filter/text/external href/data URI/ids; no fixed width/height |
| index.html catalogue matches the masters and its byte claim | **VERIFIED** | `raw/icon-html-audit.json`: 57 cards, 0 geometry mismatches, ES+EN captions, 57 aria-hidden glyphs, total 24,617 B and max 845 B exactly as declared |
| Contrast matrix arithmetic and the F-1…F-7 findings | **VERIFIED** | `raw/contrast-independent.json`: 190/190 ratios identical (delta 0.0000), AA/internal classification identical; F-1 1.6529/1.5540/1.5149 and proposal 6.9173/6.5036/6.34 recomputed |
| Day/sunlight/night role parity; no pure black/white at night | **VERIFIED** | token JSON: identical 22-role sets in the three instrument modes; night canvas #0d1b26, no #000/#fff |
| DM Sans is proportional; Manrope has working tabular figures | **VERIFIED independently** | `raw/typography-independent.json`: DM Sans spread 34.0 px @100 px unchanged by CSS; Manrope 0.156 px spread, 0.0000 px column delta, both loaded from the shipped woff2 |
| Glyph coverage ES/PT/FR/EN | **VERIFIED** | 67/67 characters served per family via the notdef-mask test; 31 locale strings with no gaps |
| Fonts are OFL-1.1, no Reserved Font Name, document embedding permitted, self-hosted | **VERIFIED** | shipped LICENSE files read directly; `document-exemption` clause present verbatim; built CSS 8 relative `./media` `@font-face`, 0 external origins; `font-display: swap`; 130,132 B of woff2 in `dist/` |
| Colour evidence boards are real and render | **VERIFIED** | `raw/board-audit.json`: 0 console/page errors; 4 CVD matrices + luminance matrix; screenshots saved; labelled INTERNAL/PROPOSED/ILLUSTRATIVE/NOT LIVE DATA |
| D-16 originality dossier makes no clearance claim | **VERIFIED** | §0 status block PENDING/NOT_GRANTED/BLOCKED; no positive originality assertion; EUTM 018135609 / BRANDS 2020 S.L. matches MC-03 `TRADEMARK-CLEARANCE-RESEARCH.md` §2 verbatim (inherited, not invented) |
| D-12 briefs are honest: 20 fields, provider NONE_YET, files [] | **VERIFIED** | `raw/briefs-audit.json` (PyYAML): 17 entries, 0 missing fields, 0 invented path/SHA/URL/date |
| No prohibited claims across the Phase-1 artifacts | **VERIFIED** | `raw/prohibited-pattern-scan.json`: 128 files, all hits are negations/prohibitions/evidence-gated targets |
| No `src/` or `public/` change | **VERIFIED** | `git status --short`: none at the Phase-1 snapshot; re-checked for the frozen tree in §6 |
| External sources / registries | **NOT VERIFIED** | web-fetch endpoint returned HTTP 404 in this session; the dossier's URLs, classes and retrieval dates are recorded, not resolved |
| Human CVD / sunlight / night / print / hardware validation | **NOT_TESTED / BLOCKED** | no hardware, no print authorization, no authorized user research; the authors' own D-17 marks these NOT_TESTED/BLOCKED |

---

## 6. Phase 2 — frozen-tree verification

<!-- PHASE2:BODY -->

*(To be completed after the Lead's FREEZE signal: identity lockups and spacing table, scored
shortlist arithmetic and kill-criteria application, diagrams, render determinism, app icons / ICO /
OG / PDFs, packaging and print honesty, `MC-04-ASSETS.yaml` completeness, `MC-04-DELIVERY.md`
claims vs reality, contract change, git cleanliness, and the final re-run of every gate.)*

---

## 7. External gates and agent limits

- **G3 (professional originality/prior-art/freedom-to-use): BLOCKED/PENDING.** No agent can close it.
  The D-16 dossier is a preparation record; the professional act has not happened. This review
  cannot and does not declare MAREA, its marks, its icon system or its lockups original,
  distinctive, registrable, available or free of third-party rights.
- **External resemblance/URL checks: NOT VERIFIED.** No icon library is installed locally and the
  web-fetch endpoint failed; therefore “no copied icon” and the cited public sources are not
  independently confirmed from this machine. The author statement that the artwork is authored is
  recorded as an author attestation, not a verified clearance.
- **Hardware/sunlight/night/print/glove/human-CVD:** no device, proof or authorized study exists;
  these remain BLOCKED/NOT_TESTED, exactly as the authors record.
- **AI-agent review limits:** this record is not human research, not professional certification and
  not legal advice.
- **Milestone truth:** `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`, `PUBLIC_MAREA_BRAND_USE = NO_GO`,
  `ORIGINALITY_PROFESSIONAL_CHECK = PENDING`, `FINAL_IDENTITY_ADOPTION = BLOCKED`,
  `PUBLICATION = BLOCKED`, `IMAGE_GENERATION = BLOCKED`, hardware `NOT_EVIDENCED`, products
  `NOT_FOR_SALE`.

---

## 8. Conditions

<!-- PHASE2:CONDITIONS -->

*(Final conditions to be listed at FREEZE: each open finding, its owner, and whether it blocks the
internal PASS, permits PARTIAL, or is an external BLOCKED item.)*

---

## 9. Evidence index

| Path | Content |
| --- | --- |
| `evidence/review/PHASE1-INTERIM-FINDINGS.json` | full Phase-1 finding records (as reported to the Lead) |
| `evidence/review/PHASE1-ADDENDUM.json` | D-06/D-07/D-17 addendum: closures, new findings, newly verified claims |
| `evidence/review/raw/*.json` | every reviewer measurement (icons, contrast, typography, manifest, raster, diagrams, references, claims) |
| `evidence/review/raw/*.png` | reviewer-rendered visual evidence (native-size icon harness, pair comparison, boards) |
| `evidence/review/tools/*` | the reviewer's independent audit tooling (re-runnable) |
| `evidence/review/raw/typography-run2-full.txt` | full output of the typography script after the author fix |

<!-- PHASE2:SIGNATURE -->
