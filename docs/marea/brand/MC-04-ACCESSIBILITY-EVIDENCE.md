# MAREA — MC-04 accessibility evidence record (QA-01 … QA-28)

| Field | Value |
| --- | --- |
| Document ID | `MC-04 / D-17` |
| Status | `INTERNAL_PROPOSED` — evidence record, not an approval |
| Adoption | `NOT_ADOPTED` |
| Implementation | `NOT_APPLIED_TO_SRC` — MC-04 changed no live CSS, no `src/`, no `public/` |
| Owner | TypeColour (author of this evidence) |
| Independent review | `PENDING` — reviewer must be ≠ author (QA-28); no sign-off has been given |
| Authority | `docs/marea/brand/MC-04-VISUAL-IDENTITY-BRIEF.md` §11 (1624–1714), §5, §7.9, §10.2, §12.3–§12.5 |
| Evidence produced | `scripts/check-contrast.mjs`, `scripts/check-typography.mjs`, `docs/marea/brand/evidence/contrast/contrast-matrix.json`, `contrast-failures.json`, `cvd-simulation-board.html`, `greyscale-board.html`, `TYPOGRAPHY-SYSTEM.md`, `COLOUR-SYSTEM.md`, `tokens/marea-instrument-tokens.proposed.json` |

## 0. What this record is and is not

**It is** an honest disposition of WCAG-relevant checks that MC-04 could actually perform on the design
evidence it produced: measured colour contrast, measured font features and glyph coverage, authored
simulation boards, document-level review, and the limits of the existing automated gates.

**It is not** a WCAG 2.2 conformance claim, not a cockpit/hardware validation, not a sunlight or
night-photometry validation, not user testing, not a colour-blind certification, not a legal clearance and
not a brand adoption. Conformance is established per surface by evidence (tests, manual audit) after
implementation; MC-04 does not implement the instrument UI or change the live site. Where a check could not
be performed, the status is `NOT_TESTED` or `BLOCKED` **with the exact future test**, never `PASS`.

Automated gates were run and their limits stated in §3. An axe pass or a green build cannot prove identity
quality, contrast in a rendered cockpit, focus visibility, colour-only meaning, CVD usability, sunlight
legibility or the honesty of imagery.

---

## 1. Scope, method and evidence index

| Evidence | Path / command | What it proves |
| --- | --- | --- |
| Contrast matrix (190 pairs, 4 modes) | `node scripts/check-contrast.mjs` → `evidence/contrast/contrast-matrix.json` | WCAG 2.x relative-luminance ratios for every role pair actually used; thresholds from the token file; exit 0 with only the declared pre-existing baseline findings |
| Contrast failures / known findings | `evidence/contrast/contrast-failures.json` | Machine-readable breaches and recorded findings F-1…F-7 |
| Typography verification | `node scripts/check-typography.mjs` | Real WOFF2 licence, cmap coverage (68 required chars), GSUB/GPOS `tnum`, rendered digit advances and column alignment in installed Chromium |
| Colour-blind simulations | `evidence/contrast/cvd-simulation-board.html` | Deuteranopia, protanopia, tritanopia, achromatopsia boards (inline `feColorMatrix`), day/sunlight/night |
| Greyscale evidence | `evidence/contrast/greyscale-board.html` | Luminance-only rendering of every state; shapes + labels + patterns remain |
| Colour system | `docs/marea/brand/COLOUR-SYSTEM.md` | Role model, modes, focus resolution F-1, states, limits |
| Typography system | `docs/marea/brand/TYPOGRAPHY-SYSTEM.md` | Licence record T-1…T-10, numeric treatment, locale coverage, limits |
| Installed tokens | `docs/marea/brand/tokens/marea-instrument-tokens.proposed.json` | Machine-readable proposed roles and thresholds (PROPOSED, not applied) |
| Existing automated gates | `npm run test:brand` etc. (§3) | Baseline only; limits stated |

Status vocabulary used below: **PASS** = the named evidence exists and meets the stated criterion for the
MC-04 scope; **PARTIAL** = part verified, part named and not tested; **NOT_TESTED** = no test was run, the
exact future test is named; **BLOCKED** = an external dependency (hardware, print authorization, another
team's implementation or a separate reviewer) prevents the test.

**Design evidence ≠ implemented UI.** MC-04 produces specifications, measured palettes and simulations.
The instrument screens do not exist yet, so many QA items can only be `PARTIAL`/`NOT_TESTED` here; MC-06
must close them on the implemented surfaces.

---

## 2. QA-01 … QA-28 disposition

| ID | Check | Status | Evidence and reasoning | Exact future test (owner) |
| --- | --- | --- | --- | --- |
| **QA-01** | Text contrast, all surfaces/modes | `PARTIAL` | Every proposed instrument pair passes AA **and** the stricter internal target: day 54/54, sunlight 54/54, night 54/54 (`contrast-matrix.json`). Existing web tokens are AA-gated; the pre-existing focus-ring breach F-1 and internal misses F-4…F-7 are recorded, not hidden. **Rendered sampling of an implemented screen was not performed.** | MC-06: screenshot and pixel-sample the implemented UI per mode; re-run `check-contrast.mjs` after any value change (implementer + independent reviewer). |
| **QA-02** | Non-text contrast (controls, focus, graphics) | `PARTIAL` | Focus proposal `#0f5f8c` measures ≥6.34:1 on all day surfaces (≥9.32:1 sunlight, ≥8.01:1 night); `focusRingOnFill` ≥5.63:1 on action and ≥7.18:1 on critical fill. The **live site still fails F-1** (1.6529/1.5540/1.5149:1); **F-1 remains OPEN in MC-04** — only a compliant value is proposed, nothing is applied, and MC-06 must implement and verify it. Controls/graphics proposal measured (ui/ui-graphic/disabled ≥3:1); not implemented. | MC-06: implement focus ring + ≥3:1 control boundaries; screenshot focus against every adjacent surface; verify nothing obscured (QA-06); then F-1 can be closed with evidence. |
| **QA-03** | Colour-only meaning | `PARTIAL` | `greyscale-board.html` applies the WCAG luminance matrix to every state agent (day/sunlight/night). Every state keeps a shape, a text label and a pattern/age cue by construction. No implemented screen exists to convert; the greyscale judgement is a human visual review, not automated. | Independent reviewer converts/screenshots the implemented day+night screens to greyscale and confirms every state is still unambiguous; author ≠ reviewer. |
| **QA-04** | Colour-blind safety | `PARTIAL` | `cvd-simulation-board.html` applies deuteranopia, protanopia, tritanopia and achromatopsia matrices to the same specimens; critical/safe/warning/stale differ in luminance, shape, label and pattern. Simulations are approximations, not user tests; no human review yet. | Independent reviewer inspects the four simulations at day/night (QA-04); human-participant testing remains **NOT_TESTED** (future user research, not claimed). |
| **QA-05** | Keyboard operation | `NOT_TESTED` | MC-04 implements no interactive UI; keyboard behaviour of the existing site was not re-audited in this milestone. Axe cannot prove keyboard operability. | MC-06/E2E: Tab/Shift-Tab, Enter/Space/Esc, arrow keys in composite widgets; focus screenshots; no traps. |
| **QA-06** | Focus not obscured | `NOT_TESTED` | No implemented headers/overlays/alert banners to test in the instrument UI. | MC-06: tab through pages with sticky header/banner/overlays; screenshot focused element; verify 2.4.11. |
| **QA-07** | Target size | `PARTIAL` | Specification sets ≥24×24 CSS px (WCAG floor) and 44×44 internal wet/glove target in `tokens` + `TYPOGRAPHY-SYSTEM.md`. No components exist to measure. | MC-06: measure interactive elements at 390 px and instrument density; record table; verify ≥24 (≥44 internal). |
| **QA-08** | Reflow / zoom | `NOT_TESTED` | Identity documents and simulation boards are not the product surface. Existing site zoom/reflow was not re-audited by MC-04. | MC-06: 320 px width, 200%/400% zoom screenshots; no horizontal scroll except allowed data tables; no content loss. |
| **QA-09** | Text spacing | `NOT_TESTED` | No implemented instrument view to override. | MC-06: apply WCAG text-spacing overrides; screenshots; no clipping/overlap in labels/provenance/tables. |
| **QA-10** | Images of text | `PARTIAL` | MC-04 evidence boards and documents use DOM/vector text only (no raster with baked text). The cross-asset inventory (OG cards, packaging mock-ups, renders, diagrams) is owned by AssetProduction/InstrumentIcons and was **not** verified here. | AssetProduction/IndependentReviewer: inventory every visible text in imagery/OG/packaging; confirm all information text is real or authored SVG text. |
| **QA-11** | Alt text ES/EN | `PARTIAL` | The boards' chart SVG carries a descriptive `aria-label`; documents are internal. Full ES/EN alt text for MC-04 assets is owned by AssetProduction and is not verified by this file. | AssetProduction manifest + IndependentReviewer: review every content image/diagram alt ES/EN; descriptive, ≤125 chars. |
| **QA-12** | Chart alternatives | `PARTIAL` | Specification requires a data-table equivalent + text summary for every chart (§7.9); the boards are illustrative and do not ship a data table. | MC-06: for every chart, provide a DOM data table + text summary; screenshot + DOM evidence. |
| **QA-13** | Instrument accessible values | `PARTIAL` | Pattern specified: "Speed 6.4 knots, 2 seconds old"; units/age in tabular digits; continuous values `aria-live="off"` with on-demand summary; alarms announced by role. No implementation/screen-reader walkthrough exists. | MC-06 + assistive-technology walkthrough: value + unit + age + state; alarms announced; continuous values not spam-announced. |
| **QA-14** | Alert semantics | `PARTIAL` | Four-level ladder and acknowledgement-vs-resolution rule specified (§7.6, tokens `stateEncoding`); no DOM exists to test `role="alert"`/status usage. | MC-06: DOM + SR notes; alarm announced; acknowledgement does not remove the condition. |
| **QA-15** | Motion / reduced motion | `PARTIAL` | Token caps alert motion at ≤1 Hz (`motionAlertMaxHz`) and prohibits >3 Hz; night reduces/disables pulsing. Boards are static. | MC-06: toggle `prefers-reduced-motion`; audit all animation; no required motion; no >3 Hz flashing; night pulsing off. |
| **QA-16** | Language attributes | `PASS` | The MC-04 evidence HTML files declare `lang="en"`; the documents are single-language internal working documents. Mixed ES/EN page-level correctness is outside MC-04's authored files. | Existing site gate (Lead): verify `lang` on pages and mixed-language spans; not re-run in MC-04. |
| **QA-17** | Link/heading structure | `PARTIAL` | Delivered Markdown uses a single H1 and a semantic heading hierarchy; no HTML page structure was authored by MC-04. Existing `npm run test:e2e` axe gate covers selected live pages, not the identity documents. | Lead/reviewer: run axe/e2e gate after integration; confirm one H1, no skipped levels, descriptive links. |
| **QA-18** | Forms (future quote/installer flows) | `NOT_TESTED` | No forms are part of MC-04. | MC-06/later: labels, errors, redundant entry (3.3.7), consistent help (3.2.6) for quote/installer flows. |
| **QA-19** | Print legibility | `BLOCKED` | No print authorization; no PDF/proof pipeline run by MC-04. Type sizes specified (min 7 pt body / 9 pt critical labels) but not proven on substrate. | Print authorization + 1:1 proof: ink contrast ≥70 % reflectance contrast, minimum type sizes, no colour-only; inspect with a physical proof. |
| **QA-20** | Packaging accessibility | `BLOCKED` | Packaging exists only as a vector concept (other owner); print/procurement blocked. | After print authorization/BOM: proof review of label sizes, ES/PT/EN/FR panels, printed URL fallback for QR. |
| **QA-21** | Honesty labels | `PASS` | Every MC-04 evidence artefact is visibly marked `INTERNAL` / `PROPOSED` (and "ILLUSTRATIVE / NOT LIVE DATA" in the boards); the documents state non-adoption and no certification. Manifest classification of all assets is owned by AssetProduction. | IndependentReviewer: check every MC-04 asset carries its label and manifest classification; no certification imagery. |
| **QA-22** | Brand document validation | `PARTIAL` | `npm run test:brand` → **PASS**, 21 checks run, 21 passed, 0 failed; 11 governed files scanned. **The MC-04 documents are not yet listed in the contract's `governedPaths`**, so the validator does not scan them yet; a manual prohibited-pattern review of the MC-04 docs was performed (no `®`/`™` attached to MAREA, no clearance/availability/performance claim). | Lead: add MC-04 documents to `brand-identity.contract.json` `governedPaths` and re-run `npm run test:brand`; reviewer verifies the diff. |
| **QA-23** | Manifest completeness | `PARTIAL` | This file and the token/evidence files are not yet registered with SHA-256 in `docs/marea/assets/manifest/`; registration is owned by the Lead/AssetProduction. | Lead/AssetProduction: register every MC-04 file with real bytes/sha256; compare against `ASSET-MANIFEST.template.yaml`. |
| **QA-24** | SVG hygiene | `PARTIAL` | The only SVGs authored in this deliverable are inline in the boards: no `<script>` inside SVG, no external references, no embedded raster; the HTML wrapper's script builds DOM content only. Standalone SVGs are other agents' deliverables and were not audited here. | IndependentReviewer: parse every delivered SVG; check no scripts/external refs/embedded raster, `role`/`title` where content. |
| **QA-25** | Raster budgets | `PASS` | Nothing to measure: TypeColour's deliverables are Markdown, JSON, HTML and inline SVG only; no raster was created, so no byte budget applies. Raster budgets belong to AssetProduction. | AssetProduction/Lead: measure every raster (dimensions/bytes) against `ASSET-PIPELINE.md` §8.3. |
| **QA-26** | Day/night/sunlight simulation | `PARTIAL` | `cvd-simulation-board.html` contains day/sunlight/night specimens; palettes are measured (54/54 each). Sunlight and night are computational simulations, **not** hardware/photometric validation. | Hardware (blocked): photometric measurement in ambient sunlight and at night; else independent visual review of simulations with the limitation stated. |
| **QA-27** | Broken references | `PASS` | All paths referenced by this deliverable were checked to exist: `TYPOGRAPHY-SYSTEM.md`, `COLOUR-SYSTEM.md`, token JSON, matrix/failures JSON, both boards, both scripts, both font LICENSE files, `src/styles.scss` — 12/12 `OK`, 0 missing; no relative Markdown links in the MC-04 docs. | Lead: re-run the path/link check after integration. |
| **QA-28** | Independence | `BLOCKED` | Author ≠ reviewer is required. This record is authored by TypeColour; **no independent sign-off exists yet**. A green build/axe pass is not a substitute. | IndependentReviewer signs QA-01…QA-28 evidence and the visual/CVD/greyscale review; Lead records the verdict. |

**Disposition count:** `PASS` 4 · `PARTIAL` 16 · `NOT_TESTED` 5 · `BLOCKED` 3 · (4 + 16 + 5 + 3 = 28, QA-01…QA-28).
`PASS` in this table always means "the named MC-04 evidence exists and meets the stated criterion for
MC-04's scope"; it never means WCAG conformance of the site or software.

### 2.1 Real command output behind every PASS row

These commands were run on this working tree; the output is copied verbatim (short outputs).

**QA-16 — language attributes of the authored HTML:**

```
$ Select-String -Path docs/marea/brand/evidence/contrast/cvd-simulation-board.html,docs/marea/brand/evidence/contrast/greyscale-board.html -Pattern '<html lang='
cvd-simulation-board.html:2: <html lang="en">
greyscale-board.html:2: <html lang="en">
```

Scope: this proves `lang` on the two MC-04 HTML artefacts, not page-level correctness of the ES/EN site.

**QA-21 — honesty labels (counts per artefact):**

```
cvd-simulation-board.html: INTERNAL=3 PROPOSED=3 NOT_A_CERTIFICATION=1 ILLUSTRATIVE_LABELS=2
greyscale-board.html:      INTERNAL=3 PROPOSED=3 NOT_A_CERTIFICATION=1 ILLUSTRATIVE_LABELS=1
```

**QA-25 — raster files in the TypeColour deliverable scope:**

```
$ Get-ChildItem docs/marea/brand/tokens,docs/marea/brand/evidence/contrast -Recurse -Include *.png,*.jpg,*.jpeg,*.webp,*.avif,*.gif
0 raster files — deliverables are Markdown/JSON/HTML only
```

**QA-27 — referenced paths and links:**

```
OK     docs/marea/brand/TYPOGRAPHY-SYSTEM.md
OK     docs/marea/brand/COLOUR-SYSTEM.md
OK     docs/marea/brand/tokens/marea-instrument-tokens.proposed.json
OK     docs/marea/brand/evidence/contrast/contrast-matrix.json
OK     docs/marea/brand/evidence/contrast/contrast-failures.json
OK     docs/marea/brand/evidence/contrast/cvd-simulation-board.html
OK     docs/marea/brand/evidence/contrast/greyscale-board.html
OK     scripts/check-contrast.mjs
OK     scripts/check-typography.mjs
OK     node_modules/@fontsource-variable/dm-sans/LICENSE
OK     node_modules/@fontsource-variable/manrope/LICENSE
OK     src/styles.scss
(12/12 OK, 0 missing)
--- markdown relative links in my docs ---
none
```

**QA-22 — brand validator (scoped caveat in the row above):**

```
$ npm run test:brand
...
Summary: 21 checks run, 21 passed, 0 failed; 11 files scanned, 0 skipped.
RESULT: PASS
```

**QA-16/QA-21/QA-25/QA-27 fail closed if the files change:** if an artefact loses its label, its `lang`,
or a referenced path is renamed, the corresponding command above no longer produces the quoted output and
the PASS must be withdrawn. They are not general WCAG evidence.

---

## 3. Automated gates actually run and their limits

| Gate / command | Real result in MC-04 | What it does **not** prove |
| --- | --- | --- |
| `node scripts/check-contrast.mjs` | exit 0, `RESULT: PASS`; 190 pairs, 4 modes; 3 AA misses and 12 internal misses are the declared pre-existing findings F-1…F-7; token SHA-256 printed | Does not prove rendered anti-aliasing, translucency, focus visuals, CVD usability or sunlight legibility |
| `node scripts/check-typography.mjs` | exit 0, `RESULT: PASS`; 68/68 required glyphs both families; Manrope tabular figures proven in Chromium; DM Sans `tnum` absence documented | Does not prove visual accent clipping, cross-browser rendering, network transfer, CLS or FOIT |
| `npm run test:brand` | `PASS` — 21 checks run, 21 passed, 0 failed; 11 governed files scanned | Scans only `governedPaths`; MC-04 documents are not yet governed (QA-22); it is a text contract gate, not a design/accessibility audit |
| `npx prettier --check scripts/check-contrast.mjs scripts/check-typography.mjs` | `All matched files use Prettier code style!` (exit 0) | Formatting only; `format:check` does not cover Markdown brand documents (known scope gap, brief §11.4) |
| `npm run test:e2e` (axe, existing) | **Not run by MC-04** (no page implemented; Lead runs integration gates) | Axe cannot detect focus-ring contrast, colour-only meaning, CVD usability, sunlight legibility or image authenticity; pages must exist |
| Path / broken-reference check | 12/12 referenced paths exist; 0 broken; no relative Markdown links in MC-04 docs | Does not check the whole repo or other agents' deliverables |

**Explicit limitation statement:** no measure in this file establishes WCAG 2.2 AA conformance for
embarcarte.com or for MAREA software, and no automated gate can establish identity quality. The only
honest claim is: *the measured design evidence exists, its method is stated, its gaps are named.*

---

## 4. Residual accessibility risk register

| Risk | Why it remains | Mitigation / owner |
| --- | --- | --- |
| Live focus ring fails non-text contrast until MC-06 | F-1 is a pre-existing site issue; MC-04 may not change `src/` | MC-06 implements `#0f5f8c` + 2 px offset; QA-02 closes only after screenshots |
| Colour-only meaning in future implementation | States are specified with shape+label+pattern but not yet implemented | MC-06 implements the state components; QA-03/QA-04 reviewer confirms greyscale/CVD |
| Instrument values unreadable to screen readers | Pattern specified, no implementation | MC-06 uses `aria-live` rules, value+unit+age pattern, on-demand summary; QA-13 |
| Sunlight/night legibility unvalidated | No hardware/display exists | Marked `BLOCKED`; QA-26 remains open; never claim cockpit validation |
| Human colour-vision testing absent | No participant research authorised | Marked `NOT_TESTED`; simulations are approximations only |
| Print/packaging legibility unproven | No print authorization/BOM | QA-19/QA-20 `BLOCKED` until proof |
| CVD and greyscale boards not yet independently reviewed | Author = TypeColour | QA-28 `BLOCKED`; IndependentReviewer inspects the HTML boards/screenshots |
| MC-04 documents not yet governed by `test:brand` | Contract `governedPaths` not extended | Lead extends contract and re-runs (QA-22) |
| Manifest registration incomplete for these files | Different owner | Lead/AssetProduction registers SHA-256 (QA-23) |
| New yellow/amber warning on light backgrounds | Warning role is amber-brown by design; must never be the only cue | Shape + label + cause mandatory (§5.6/§7.6); contrast measured ≥5.43:1 day |
| Disabled states | Disabled is AA-exempt but must stay perceivable | Token target ≥3:1 measured (day 3.15:1, night 3.93:1); label retained |
| Locale/mixed-language labels | `lang` correctness is implementation-time | MC-06 sets `lang`; QA-16 |

---

## 5. Sign-off

| Role | Name | Status | Date |
| --- | --- | --- | --- |
| Author / evidence producer | TypeColour | `COMPLETED` (evidence submitted) | 2026-10-30 |
| Independent accessibility reviewer (≠ author) | — | `PENDING` / `BLOCKED` until assigned | — |
| Lead integration review (G6) | — | `PENDING` | — |
| Independent milestone verdict (G7) | — | `PENDING` | — |

MC-04 makes no adoption, certification, regulatory, availability or performance claim. `MAREA` remains a
proposed brand; `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`, `PUBLIC_MAREA_BRAND_USE = NO_GO`,
`FINAL_IDENTITY_ADOPTION = BLOCKED`, `PUBLICATION = BLOCKED`.
