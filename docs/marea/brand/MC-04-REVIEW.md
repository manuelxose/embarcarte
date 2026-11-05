# MC-04 — Independent review record (D-19)

| Field | Value |
| --- | --- |
| Document ID | `MC-04 / D-19 / MC-04-REVIEW` |
| Status | **FINAL** — independent review of the frozen tree at commit `66b38dc` (branch `feature/marea-mc04-visual-identity`, base `b0b010dd0b45eec455951393e0dabf1f3df53eca`) |
| Reviewer | IndependentReviewer (AI agent) — did not author any MC-04 artifact |
| Author ≠ reviewer | Yes, for every reviewed artifact (QA-28 record in §1.3) |
| Verdict input | **PASS — INTERNAL DESIGN SCOPE.** The single documentation condition raised during the recheck (IR-19) has been corrected in `MC-04-DELIVERY.md` and verified; the external gates that remain BLOCKED (G3 legal/originality, G5 engineering, hardware, print, human research) are recorded in §7–§8. This is **not** a trademark clearance, originality opinion, accessibility certification, cockpit validation, hardware conformity or publication approval. |
| Method | Real files + real commands executed in this session; every quoted number re-derived from the artefact or re-measured independently. No author summary was trusted. |
| Write scope | `docs/marea/brand/MC-04-REVIEW.md`, `docs/marea/brand/evidence/review/**` only. No author file, no `src/`, no `public/`, no Git write command was executed. |
| Evidence | `docs/marea/brand/evidence/review/` (tooling + raw JSON/PNG/text outputs) — index in §9 |

> **THIS IS AN AI-AGENT REVIEW. IT IS NOT HUMAN USER RESEARCH, NOT A PROFESSIONAL
> CERTIFICATION, NOT LEGAL CLEARANCE, NOT A TRADEMARK/ORIGINALITY OPINION AND NOT A
> COLOUR-VISION-DEFICIENCY USABILITY TEST.** It cannot substitute for any of them. Gate G3
> (professional originality/prior-art/freedom-to-use) stays **BLOCKED/PENDING**; no agent can
> close it. Where an external fact could not be verified from this machine (URL resolution, live
> register status, external visual-similarity screening) it is recorded **NOT VERIFIED**, never PASS.

---

## 0. Verdict

**PASS — INTERNAL DESIGN SCOPE.** After the freeze-time corrections were verified, the MC-04
producible identity-system work is coherent, honestly labelled, reproducible and free of fabricated
files, hashes, measurements or claims. Nothing found in this review is a §12.5 failure condition.

What this verdict **does** cover: the identity construction rules, the nine family lockups, the
reissued master set built on the preferred **B** construction, the D-01…D-19 document set, the 57-icon
vocabulary and proof sheets, the three illustrative diagrams and specimens, typography/licence/feature
evidence, the measured colour/token system, packaging/print vectors and PDFs, the brief/manifest
honesty, the deterministic render pipeline and the produced-asset manifest, and the internal review
process itself (author ≠ reviewer).

What it **does not** cover, and cannot: trademark clearance; professional originality/prior-art search;
engineering sign-off of the diagrams; hardware, sunlight, night, salt-spray/IP/material performance;
physical print proofs; human five-second sort; human colour-vision testing; WCAG conformance of any
implemented surface; availability, price, certification or safety claims. All remain
`NOT_TESTED` / `BLOCKED` / `LEGAL_REVIEW_PENDING` exactly as the authors record them.

Milestone truth preserved throughout: `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`,
`PUBLIC_MAREA_BRAND_USE = NO_GO`, `ORIGINALITY_PROFESSIONAL_CHECK = PENDING`,
`FINAL_IDENTITY_ADOPTION = BLOCKED`, `PUBLICATION = BLOCKED`, `IMAGE_GENERATION = BLOCKED`,
hardware certifications `NOT_EVIDENCED`, products `NOT_FOR_SALE`.

Conditions and residual exceptions: **§8**.

---

## 1. Methodology, independence and evidence handling

### 1.1 Method

1. Read the authoritative brief for every gating section (§2.2, §2.4, §5.5–§5.7, §7.4–§7.7,
   §9.2–§9.4, §10.5, §11, §12, §13.2) and `MC-04-EXECUTION-PLAN.md`.
2. Inspected the actual working tree (`git status`, `git log`, file reads, byte-level inspection) —
   never the delivery summary.
3. Re-ran every repository gate that applies and captured exit codes and output.
4. Re-derived every arithmetic/measurement claim independently with reviewer-written tooling
   (different code path from the author scripts): WCAG ratios, font advances and glyph coverage,
   raster/ICO/PDF headers and SHA-256, strict SVG XML parsing, icon ink bounds/distinctness,
   identity `getBBox()` geometry and spacing, manifest↔disk reconciliation, decision arithmetic,
   diagram disclaimer text, package/binding hashes.
5. Verified the deterministic render pipeline by snapshotting 122 files, re-running
   `scripts/render-assets.mjs --all`, and comparing byte-for-byte.
6. Classified every claim `VERIFIED` / `PARTIAL` / `NOT VERIFIED` / `BLOCKED` and recorded the
   evidence; every defect was reported to the Lead with ID, severity, `file:line` and reproduction.

Severity definitions: **BLOCKING** = a §12.5 failure or a fabrication/scope violation; **MAJOR** = a
required deliverable/gate wrong or incomplete in a way that must be fixed before acceptance;
**MINOR** = a real defect that does not by itself block acceptance; **NIT** = wording/consistency.

### 1.2 Reviewer tooling (all under `docs/marea/brand/evidence/review/tools/`)

| Tool | Purpose |
| --- | --- |
| `icon-audit.mjs` / `icon-html-audit.mjs` | strict Chromium XML parse, hygiene, semantics of the 57 icons; index↔master geometry and byte claims |
| `icon-bounds.mjs` / `icon-iou.mjs` / `icon-pair-compare.mjs` | real ink bounding box; native-size distinctness via ink-mask IoU; reviewer visual proofs |
| `typography-independent.mjs` | own `@font-face` probe from the shipped woff2, notdef-mask glyph coverage, tnum measurement |
| `dist-font-audit.mjs` | built CSS font origins and emitted woff2 bytes |
| `contrast-independent.mjs` | independent WCAG recomputation of all 190 colour pairs |
| `board-audit.mjs` | renders the CVD/greyscale boards, console errors, honesty labels |
| `claims-audit.py` | recomputes 45 quoted numeric/arithmetic claims in D-06/D-07/D-17 |
| `reference-check.py` | QA-27 cross-document broken-reference check |
| `prohibited-pattern-scan.py` | independent claims-policy screening (130 files) |
| `briefs-audit.py` | PyYAML audit of `MC-04-BRIEFS.yaml` (20-field completeness, blocked honesty) |
| `manifest-audit.py` | `MC-04-ASSETS.yaml`↔disk reconciliation (bytes/SHA/dimensions/coverage) |
| `raster-audit.mjs` / `svg-all-audit.mjs` | independent container measurement (PNG/JPEG/ICO/PDF) and all-SVG hygiene |
| `diagram-audit.py` | §7.7 verbatim disclaimers, AIS receive-only, PILOT boundaries, ecosystem honesty |
| `identity-audit.mjs` | Chromium `getBBox()` geometry of lockups/marks; the nine-family one-rule proof |
| `territory-audit.py` | term-by-term weighted arithmetic, kill-criteria and decision-record checks |
| `originality-binding-audit.py` / `recheck-binding-and-evidence.py` | all 35 bound-file hashes/bytes/viewBoxes; regenerated decision evidence |
| `delivery-claims-audit.py` | D-18 counts, section structure and deliverable register |
| `render-snapshot.mjs` | before/after SHA-256 snapshot for the determinism test |

### 1.3 QA-28 independence record (author ≠ reviewer)

| Artifact group | Author (per execution plan) | Independent review |
| --- | --- | --- |
| D-01/D-02/D-03 identity, territories, lockups | IdentityVector | IndependentReviewer — nothing here authored by me |
| D-06/D-07/D-08/D-17 typography, colour, tokens, accessibility evidence | TypeColour | IndependentReviewer |
| D-09/D-10/D-11 icons, illustration standards, diagrams | InstrumentIcons | IndependentReviewer |
| D-04/D-05/D-12/D-13/D-14/D-15 app icons, OG, renders, CMF, packaging, print | AssetProduction | IndependentReviewer |
| D-12 briefs, D-16 originality, compliance evidence | Governance | IndependentReviewer |
| D-18 delivery record, execution plan, integration | Lead | IndependentReviewer |
| D-19 this record | IndependentReviewer | reviewer-owned; signed in §10 |

**QA-28 sign-off for the internal design/QA review:** signed by the independent reviewer for the
items actually verifiable from this machine (design geometry, evidence honesty, claims, manifests,
reproducibility, source cleanliness). **Not signed:** human accessibility review, human five-second
sort, colour-vision participant testing, physical print/hardware tests, professional legal/originality
review. An AI agent cannot give those sign-offs and does not claim to.

### 1.4 What this review cannot do

- It cannot establish WCAG 2.2 AA conformance, colour-blind safety, sunlight/night legibility, print
  legibility, salt-spray/IP/material performance, or that any product exists.
- It cannot perform the G3 professional originality/prior-art/freedom-to-use search.
- It cannot verify external URLs/registries or run an external visual-similarity screen (the web-fetch
  endpoint failed throughout this session). All externally sourced facts are `NOT VERIFIED` by me.
- It cannot replace a human visual/accessibility review. QA-03/QA-04 human sign-off and the I-1
  five-reviewer sort remain `NOT_TESTED (human)`.

---

## 2. Commands executed and real results (final frozen tree)

| # | Command | Real result |
| --- | --- | --- |
| C1 | `git status --short`; `git log -1 --oneline`; `git diff --name-status b0b010d..HEAD` | branch `feature/marea-mc04-visual-identity`, HEAD `66b38dc`; working tree clean; only 3 pre-existing MC-03/execution files modified vs base (`brand-identity.contract.json` +9 governedPaths, `DECISION-LOG.md`, `MASTER-PROMPT-REGISTRY.md`); **no `src/`, `public/`, `package.json`/lockfile or `angular.json` change** |
| C2 | `npm run test:brand` | **PASS** — 21 checks run, 21 passed, 0 failed; **24 governed files scanned** |
| C3 | `npm run test:brand:unit` | **PASS** — 13 tests, 13 pass |
| C4 | `node scripts/check-assets.mjs` | **PASS** — 12 passed / 0 failed / 2 warnings; 15 manifest entries ↔ 120 asset file records; SHA-256, bytes, dimensions, format, budgets, hygiene and ink bounds verified |
| C5 | `node scripts/check-contrast.mjs` | **PASS** — 190 pairs, 4 modes; proposed modes 54/54 each; 0 failures; F-1 remains OPEN on the live-site baseline |
| C6 | `node scripts/check-typography.mjs` | **PASS** — 68/68 glyphs per family; tnum proven for Manrope; `TYPO-DEVIATION-01` |
| C7 | `node scripts/render-assets.mjs --all` + before/after SHA snapshot | **PASS** — 7 jobs, exit 0; **122/122 files byte-identical** (0 added, 0 removed, 0 changed); PDF dates pinned |
| C8 | `npm run build` | **PASS** — exit 0 (Angular SSR/prerender) |
| C9 | `npm run test:e2e` | **PASS** — 15/15 Chromium tests |
| C10 | `npm run test:i18n` / `test:commerce` / `test:seo` / `test:backup` | **PASS** each (seo: 101 sitemap URLs) |
| C11 | `npx prettier --check` on the 4 new/changed scripts | **PASS** |
| C12 | `npm audit --omit=dev --audit-level=high` | **PASS** — 0 vulnerabilities |
| C13 | `git diff --check` | **PASS** — no whitespace errors |
| C14 | independent contrast recomputation | 190/190 ratios and classifications identical, max delta **0.0000** |
| C15 | independent typography measurement | DM Sans digit spread **34.0 px @100 px**, unchanged by `tabular-nums`/`tnum`; Manrope **0.1563 px** spread and **0.0000 px** column delta; 67/67 chars served in the notdef-mask test |
| C16 | independent identity geometry | lockups 704.83×200, ink 50,50 604.83×100, clear 50 all sides, symbol 98.86×99.99 top 50/bottom 149.99, wordmark 430.96×100, gap 75.01, no clipping; compact 32×32 ink 29.66×30.0; reduced-16 ink 15.47×15.3; 1 symbol + 1 wordmark + 9 distinct tokens, token 70.00, gap 26.00 |
| C17 | independent territory arithmetic | A 3.475→3.48, B 3.675→3.68, C 3.575→3.58; weights 1.00; ranking B>C>A; regenerated HTML now consistent with the Markdown |
| C18 | independent manifest↔disk audit | 15 entries, 120 records, 0 unregistered files, 0 byte/SHA/dimension mismatches; manifest 50,619 B SHA-256 `47814e62…` |
| C19 | independent raster/ICO/PDF measurement | OG exactly 1200×630 (65,244 B / 61,955 B ≤120 kB); ICO valid ICONDIR 16/32/48; app icon 1024×1024 (22,147 B ≤45 kB); PDFs `%PDF-1.4`, 2 pages, 595×842 pt, deterministic dates, no encryption/JS/embedded files |
| C20 | D-16 binding verification | 35/35 bound files exist; all 35 SHA-256/bytes and the SVG/HTML viewBoxes match the dossier; v1 C-based finding closed with history preserved; `ORIGINALITY_PROFESSIONAL_CHECK = PENDING` |
| C21 | diagram/specimen/claims/reference/prohibited audits | diagrams 0 flags; boards render with 0 console/page errors; 82 references with only 2 deliberate glob patterns unmatched; all ®/™ occurrences are prohibitions/honesty statements; no positive certification/availability/performance/ECDIS/collision-avoidance/autonomy claim |

Outputs are saved verbatim under `docs/marea/brand/evidence/review/raw/`.

---

## 3. G1–G7 disposition

| Gate | Reviewer (brief §12.3) | Disposition | Basis |
| --- | --- | --- | --- |
| **G1** Identity/design review | Independent design reviewer ≠ author | **PASS for the independent design-review scope** — construction rules, reissued B master geometry/spacing/clear-space, nine-family one-rule, 16 px/monochrome/reversed simulations and the three territories verified by measurement. The brief's **5-second five-reviewer human sort (I-1) and physical engraving/silkscreen samples remain `NOT_TESTED (human/physical)`** and are not claimed as passed. | §6.1, C16, C17 |
| **G2** Accessibility review | Independent accessibility reviewer ≠ author | **PASS for the evidence-and-honesty scope** — contrast/typographic evidence independently reproduced; boards render; QA-01…QA-28 dispositions are honest and conservatively classified (PASS 4 / PARTIAL 16 / NOT_TESTED 5 / BLOCKED 3 = 28). **Not a WCAG conformance claim**: hardware sunlight/night, print proof, human CVD testing, screen-reader walkthrough and an external audit remain `NOT_TESTED`/`BLOCKED`. | C5, C14, C15, board audit |
| **G3** Legal/originality gate | Company + professional counsel/trademark agent | **BLOCKED / PENDING — cannot be closed by any agent.** `ORIGINALITY_PROFESSIONAL_CHECK = PENDING`, `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`. The D-16 dossier is a preparation record; no clearance/originality assertion exists anywhere. External URL/registry/icon-library screening is `NOT VERIFIED` from this machine. | §7 |
| **G4** Claims/honesty review | Independent reviewer against the claims policy | **PASS** — no `®`/`™` attached to MAREA or any family/bundle; no certification, approval, availability, price, performance, ECDIS-equivalence, collision-avoidance, autonomous-steering or safety-guarantee claim; §7.7 disclaimers present verbatim (ES/EN) in diagrams, specimens, OG cards and installer records; packaging/print are PROPOSED and mark-free. | C21, §6.3 |
| **G5** Data/technical review | Engineering (product owner) | **BLOCKED on engineering** — diagrams are correctly labelled illustrative; engineering/safety sign-off of ports, protocols and PILOT boundaries is `PENDING` (B15). An AI reviewer cannot substitute for engineering sign-off. | C21, ILLUSTRATION-STANDARDS §10 |
| **G6** Integration review | Lead | **PASS** — write scopes respected; no `src/`/`public/` change; manifest 1:1 with disk; render determinism verified; contract extension additive and disclosed; no fabricated file/hash; counts and byte claims match reality. | C1, C4, C7, C18 |
| **G7** Independent milestone verdict | Reviewer ≠ author | **PASS — INTERNAL DESIGN SCOPE** with the external gates above recorded as BLOCKED and the residual exceptions in §8. | this document |

---

## 4. Findings

### 4.1 Phase-1 findings — final disposition

| ID | Initial severity | Finding (short) | Final status |
| --- | --- | --- | --- |
| IR-01 | MINOR | 13/57 icons exceeded the declared 2 px optical padding | **FIXED & verified** — nominal padding declared, exceptions documented (see IR-14 for a correction to that fix) |
| IR-02 | MINOR | Weak 16 px distinctness pairs not on the documented text-pairing list | **FIXED & verified** — ICONOGRAPHY §8 now lists the measured IoU pairs (0.909 / 0.875 / 0.813 / 0.788) with mandatory text pairing at 16 px |
| IR-03 | MINOR | index.html overstated "reduction variants" | **FIXED & verified** — index wording corrected; reduction-proof states it is not a 16 px redesign nor a 48 px proof |
| IR-04 | MINOR | typography script licence assertion was a false negative | **WITHDRAWN** — my first run predated the author's 18:31:40 fix; current script and D-06 state the correct OFL-1.1 facts (`document-exemption=true`, `bundling=true`) |
| IR-05 | MINOR | missing navigation/weather disclaimers on icon surfaces | **FIXED & verified** — index.html now carries both, ES/EN |
| IR-06 | NIT | reduction-proof missing LEGAL_REVIEW_PENDING flag | **FIXED & verified** |
| IR-07 | NIT | token role-naming statement broader than its content | **FIXED & verified** |
| IR-08 | NIT | token JSON said F-1 "resolves" | **FIXED & verified** — now "proposes … does NOT resolve F-1; F-1 remains open" |
| IR-09 | MINOR | ES diacritics stripped in BRIEFS.yaml | **FIXED & verified** — accents restored |
| IR-10 | MINOR | check-typography outside declared write scope | **FIXED by Lead** — execution plan §1 authorises it and cites IR-10 |
| IR-11 | MINOR | accessibility disposition counts wrong | **FIXED & verified** — 4 / 16 / 5 / 3 = 28 |
| IR-12 | MINOR | "only the numeric role moves family" inaccurate | **FIXED & verified** — scope now covers value + unit/suffix + timestamp/age |

### 4.2 Phase-2 findings — final disposition

| ID | Severity | Finding | Status |
| --- | --- | --- | --- |
| **IR-13** | **MAJOR** | Generated territory evidence was stale and contradicted the decision record: `territories/territory-comparison.html` said "C — SIGNAL TRUNK (PREFERRED_PROVISIONAL)" with obsolete totals 3.55/3.68/3.85; `territories/evidence/reading-test.html` still said C preferred; the rendered PNGs derived from them were stale too. | **FIXED & verified** — regenerated from the corrected generators: comparison now B preferred with 3.48/3.68/3.58, reading test "MASTER — Territory B", no obsolete score or C-preference string anywhere in the delivered evidence; PNGs re-rendered (comparison 1200×1842 168,902 B SHA `99c169f5…`; reading test 1200×1140 89,342 B SHA `f7d20c65…`) and manifest-rebound |
| IR-14 | MINOR | §6.1 exception table misclassified `alert-alarm` (padding 2.0) and `cellular` (2.8) as exceptions and stated the wrong count/range | **FIXED & verified** — now 48/57 meet nominal, nine exceptions with the exact measured values (1.34 / 1.50 ×6 / 1.00 / 1.47), and the two icons are explicitly noted as *not* exceptions |
| IR-15 | MINOR | D-18 had no "§5" heading (sections jumped 4→6) | **FIXED & verified** — all 16 sections present |
| IR-16 | MINOR | IDENTITY-SYSTEM claimed "all 32 SVGs … no `<text>`" | **FIXED & verified** — now 27 artwork files without `<text>`, the 5 working/construction files explicitly exempt |
| IR-17 | MINOR | "transform scale factors ≤ 3 decimals" contradicted by `scale(4.3048)`/`scale(3.4188)` | **FIXED & verified** — the three frozen scale factors are documented (`3.333`, `4.305`, `10`) with the ≤ 0.01-unit band accuracy rationale |
| IR-18 | NIT | D-18 "additive … only" while the contract gains governedPaths | **FIXED & verified** — §3 now states "additive … plus an extension of `governedPaths`" |
| IR-19 | MINOR | D-18 §13 said "22 governed files scanned"; the current validator scans **24** (`brand-identity.contract.json` has 24 governedPaths) | **FIXED & verified** — D-18 §13 now reads "24 governed files scanned" (equals my run and the Lead run); §14 was replaced with the real final findings/gate record |

**Totals: 19 finding IDs — 1 MAJOR (IR-13, fixed before delivery), 14 MINOR, 4 NIT. All 19 are CLOSED
and independently re-verified, including the document-only IR-19 after its correction in D-18.
No BLOCKING finding and no fabrication or scope violation was found at any stage.**

---

## 5. Claim-verification matrix

| Claim | Status | Evidence |
| --- | --- | --- |
| Master set is built on the preferred **B** construction | **VERIFIED** | `<desc>` of every lockup/mark says territory B; B arc/index geometry measured; app icon/favicon/OG rebuilt from the B compact mark (arc commands present); IDENTITY-SYSTEM §0/§4/§5/§6/§9 and TERRITORY-COMPARISON §8 updated |
| Lockup geometry/spacing/clear space | **VERIFIED** | 704.83×200 viewBox; ink 50,50 604.83×100; clear 50 all sides; symbol 98.86×99.99 on cap band (bottom 149.99 vs baseline 150); wordmark 430.96×100; ink gap 75.01 (0.75 cap ±0.01); no clipping |
| Nine family lockups are one rule, not nine logos | **VERIFIED** | identical symbol path hash (1 variant), identical wordmark hash (1), nine distinct family tokens, one token height 70.00, one word gap 26.00, 50 clear space and no clipping on all nine |
| Territory weighted arithmetic and kill criteria | **VERIFIED** | A 3.475, B 3.675, C 3.575, weights sum 1.00, ranking B>C>A; A dropped on the §3.3 wave/signal reading; C recorded as failing the bar-chart/equaliser reading; B preferred with the letter-C/seal risk recorded; human sort `NOT_TESTED` |
| Deterministic render/reproducibility | **VERIFIED** | snapshot of 122 files, `render-assets --all` (7 jobs, exit 0), re-snapshot → 0 changed/added/removed; PDF dates pinned |
| Manifest completeness and hashes | **VERIFIED** | 15 entries / 120 records / 5,391,691 B / SHA-256 `47814e62…`; every file has an entry and vice versa; every byte/SHA/dimension matches disk |
| Raster/ICO/PDF/OG claims | **VERIFIED** | OG exactly 1200×630 and ≤120 kB; ICO valid with 16/32/48; app icon 1024² and budget-compliant; PDFs 2 A4 pages, no encryption/JS/embedded files |
| Typography licence/feature claims | **VERIFIED** | OFL-1.1 both families, no Reserved Font Name, document-embedding clause present; DM Sans proportional (34.0 px spread @100 px, no tnum) and Manrope tabular (0.1563 px spread, 0.0000 px column delta); 68/68 glyphs per family; dist self-hosting verified (8 relative woff2 `@font-face`, 0 external origins, font-display swap) |
| Colour/token claims | **VERIFIED** | 190/190 ratios recomputed exactly; day/sunlight/night same 22-role sets; no #000/#fff at night; F-1 correctly recorded open (proposal only) |
| Diagrams/specimens honesty | **VERIFIED** | verbatim §7.7 disclaimers present (AIS: nav+AIS; PILOT: nav+PILOT; ecosystem: all eight ES/EN); PILOT E-stop/manual takeover/watchdog/supervised; AIS receive-only; no positive collision-avoidance/transponder/ECDIS/autonomy/certification claim; specimens labelled ILUSTRATIVO / NO DATOS REALES with non-operable controls and mode-toggle-only script |
| Packaging/print honesty | **VERIFIED** | six dielines PROPOSED, no CE/NMEA/IP/certification marks, bleed/safe language; installer records blank fields, "PROPUESTO, no certifica", no invented signatories/data; PDFs are real Chromium A4 output |
| D-16 originality dossier makes no clearance claim | **VERIFIED** | four status fields exact; preference B; v1 C-based finding closed with history preserved; 35/35 bound files' SHA-256/bytes/viewBox match disk (no invented hashes); the material earlier-right EUTM record is inherited from MC-03 |
| Briefs manifest honesty | **VERIFIED** | 16 blocked + 1 producible entry; 20 fields each; provider `NONE_YET`; `files: []`; `generated_at: null`; no invented path/URL/SHA; ES accents correct |
| Source/integration cleanliness | **VERIFIED** | no `src/`/`public/`/`package.json`/lockfile/`angular.json` change; contract extension additive and disclosed; branch/worktree clean at `66b38dc` |
| External sources / live registers | **NOT VERIFIED** | web-fetch endpoint failed in this session; the dossier's 20 public URLs and their classes/dates are recorded, not resolved by me |
| Human five-second sort, human CVD, hardware, sunlight/night, print proof, engineering sign-off, professional legal/originality | **NOT_TESTED / BLOCKED** | exactly as recorded by the authors; no agent can close them |

---

## 6. Frozen-tree verification detail

### 6.1 Identity (D-01/D-02/D-03)

- Reissued masters use the preferred B construction (arc + bearing index + square datum), not C.
- Primary/mono/reversed have **identical** symbol and wordmark path hashes; only the ink value differs
  (`#17365d` / `#101820` / `#f2f9fd`). All are 2,016 B (≤20 kB).
- Compact mark: 32×32 viewBox, ink 29.66×30.0, centred (1.17 / 1.0 margins); reduced-16: its own
  16-unit drawing, ink 15.47×15.3 (0.26/0.35 margins). No clipping.
- Nine family lockups: viewBox 853.66–1165.32 × 200, one symbol, one wordmark, nine distinct tokens,
  token cap 70.00, word space 26.00, clear space 50, baseline alignment error ≤0.01 — one rule.
- Symbol stroke weight was decided with evidence (3.2 u = 10.4 % of ink height; 8.6 % and 14.3 %
  rejected with rationale in IDENTITY-SYSTEM §2.2/§4.1). The C construction remains fully documented
  as the shortlisted strategic alternative that failed the small-size reading test.
- Misuse sheet, construction grid, wordmark-only master and case study are present and labelled;
  construction/working files are the only ones containing `<text>` and their status is stated.

### 6.2 Territories and shortlist

- All three constructions exist as construction-level SVGs with geometry reports (32 files, 0 failed)
  and native-pixel reading-test evidence.
- Weighted arithmetic recomputed term-by-term and matches the document exactly (3.475→3.48,
  3.675→3.68, 3.575→3.58; weights 1.00; B>C>A).
- Kill criteria genuinely applied: A dropped (signal/Wi-Fi/wave reading), C recorded as **failing**
  (bar chart/equaliser at 16–48 px), B preferred with the letter-C/compass-app/seal risk recorded.
- Shortlist is exactly two (B + C); C is the documented alternative, not the preference.
- Regenerated comparison and reading-test evidence now state B preferred and the corrected scores,
  with no obsolete score or C-preference strings; the two evidence PNGs re-rendered and rebound.
- Human five-second sort (`NOT_TESTED (human)`) and physical samples (`NOT_TESTED (physical)`) are
  recorded, not claimed.

### 6.3 Diagrams, specimens, packaging, print

- Three diagrams: verbatim §7.7 ES/EN disclaimers in every diagram where they apply (ecosystem has all
  eight), AIS receive-only with no transmit path, PILOT supervised boundary with physical E-stop,
  manual takeover and hardware watchdog shown as boundaries + non-operable specimen controls, missing
  hardware labelled "requisito de diseño", ecosystem boundaries and unverified connections labelled.
- Three specimens: ILUSTRATIVO / NO DATOS REALES; scripts only switch display mode; no forms, no
  `onclick`, no fabricated live values, no operable actuation; PILOT page shows the BLOCKED commercial
  gate and the mandatory human-authority and navigation disclaimers.
- Six packaging dielines: PROPOSED dimensions, bleed/safe language, explicit "sin marcas CE/NMEA/IP"
  and no ®/™; print/procurement BLOCKED.
- Installer records ES/EN: blank field-record, "PROPUESTO, no certifica", no certification/CE/NMEA/IP
  marks, no invented signatories or data; Chromium A4 PDFs (2 pages, 595×842 pt) with pinned dates.

### 6.4 Reproducibility, manifest and integration

- Full pipeline re-run reproduces **all 122 asset+manifest files byte-identically** (39 outputs per
  run, PDF dates pinned). This is stronger than the delivery's "39/39 byte-identical" claim.
- `MC-04-ASSETS.yaml`: 15 entries, 120 file records, 5,391,691 B, SHA-256 `47814e62…`; 1:1 coverage;
  every hash/byte/dimension/format matches; no unregistered file; no registered symbols.
- `check-assets.mjs` PASS 12/0/2 (the two warnings are a documented working-construction file and a
  prohibition statement in the icon catalogue).
- 24 governed brand files pass `test:brand` (21/21); unit tests 13/13; contract has 9 families and
  `trademarkLegalClearance = NOT_GRANTED`.
- Build, e2e (15/15), i18n, commerce, SEO, backup, prettier, `git diff --check` and `npm audit` all
  pass on this tree; the three modified-vs-base files are additive governance records
  (`governedPaths` extension, decision log, master registry).

---

## 7. External gates and agent limits

- **G3 is BLOCKED/PENDING.** The D-16 dossier is a preparation record; the professional act has not
  happened. This review cannot and does not declare MAREA, its marks, icon system or lockups original,
  distinctive, registrable, available or free of third-party rights.
- **External resemblance/URL checks: NOT VERIFIED.** No icon library is installed locally and the
  web-fetch endpoint failed; “no copied icon” and the cited public sources are not independently
  confirmed from this machine. The author statement that the artwork is authored remains an author
  attestation, not a clearance.
- **G5 engineering review of the diagrams is PENDING** (B15); the diagrams stay illustrative.
- **Hardware/sunlight/night/print/glove/human-CVD/human five-second sort:** no device, proof or
  authorised study exists; these remain BLOCKED/NOT_TESTED exactly as recorded.
- **This is an AI-agent review**, not human research, professional certification or legal advice.
- Milestone truth: `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`, `PUBLIC_MAREA_BRAND_USE = NO_GO`,
  `ORIGINALITY_PROFESSIONAL_CHECK = PENDING`, `FINAL_IDENTITY_ADOPTION = BLOCKED`,
  `PUBLICATION = BLOCKED`, `IMAGE_GENERATION = BLOCKED`, hardware `NOT_EVIDENCED`, products
  `NOT_FOR_SALE`.

---

## 8. Conditions and residual exceptions

1. **IR-19 (documentation only) — SATISFIED.** `MC-04-DELIVERY.md` §13 now reads **"24 governed files
   scanned"**, matching the validator run and the contract's 24 `governedPaths`; D-18 §14 was also
   replaced with the real final findings/gate record. Re-verified after the correction. No artifact,
   gate or claim was affected.
2. **G3 remains BLOCKED/PENDING** — external professional originality/prior-art/freedom-to-use act;
   no adoption or publication before it.
3. **External blocks recorded, not waived:** engineering sign-off of diagrams (G5/B15), hardware and
   sunlight/night validation, print/proofing, human five-second sort, human colour-vision testing,
   external accessibility audit, imagery generation. None is claimed as passed.
4. **Identity adoption/publication remain blocked** even though the internal design scope passes:
   `FINAL_IDENTITY_ADOPTION = BLOCKED`, `PUBLICATION = BLOCKED`, `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`.
5. The B masters and generated evidence are frozen at `66b38dc`; any future reissue invalidates the
   D-16 binding and requires another logged delete-and-rebind (D-16 §9.8 rule).

With condition 1 satisfied, nothing found in this review prevents accepting MC-04 for its **internal
design/QA scope**. The remaining items in this section are external gates that the programme cannot close
by itself; they are recorded, not waived.

---

## 9. Evidence index

| Path | Content |
| --- | --- |
| `evidence/review/PHASE1-INTERIM-FINDINGS.json` | Phase-1 finding records as reported to the Lead |
| `evidence/review/PHASE1-ADDENDUM.json` | D-06/D-07/D-17 addendum: closures, new findings, verified claims |
| `evidence/review/raw/*.json` | every reviewer measurement (icons, contrast, typography, identity, territory, manifest, raster, diagrams, references, claims, binding, boards) |
| `evidence/review/raw/*.png` | reviewer-rendered visual evidence (native-size icon harness, pair comparison, colour boards) |
| `evidence/review/raw/*-frozen.txt`, `raw/render-*.txt` | captured gate outputs and pipeline runs |
| `evidence/review/tools/*` | the independent, re-runnable audit tooling |

---

## 10. Signature

| Role | Name | Status | Date |
| --- | --- | --- | --- |
| Independent reviewer (author ≠ reviewer) | IndependentReviewer (AI agent) | **SIGNED** for internal design/QA scope, findings list and verdict input | 2026-10-30 |
| Human accessibility review (QA-03/QA-04) | — | `NOT_TESTED (human)` — not signed, cannot be signed by this agent | — |
| Professional originality/prior-art/legal (G3) | — | `BLOCKED/PENDING` — external, not signed | — |
| Engineering review of diagrams (G5) | — | `PENDING` — engineering-owned, not signed | — |
| Lead integration review (G6) / final verdict (G7) | Lead | Lead records the milestone decision using this verdict input | 2026-10-30 |

*This document records an AI-agent independent review. It is not human user research, not a
professional certification, not legal clearance and not a trademark/originality opinion, and it cannot
substitute for any of them.*
