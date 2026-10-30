# MAREA — Typography system and font licence verification record

| Field | Value |
| --- | --- |
| Document ID | `MC-04 / D-06 / MR-BRD-014` |
| Status | `INTERNAL_PROPOSED` |
| Adoption | `NOT_ADOPTED` |
| Implementation | `NOT_APPLIED_TO_SRC` — no CSS outside `src/` was changed; this document proposes only |
| Owner | TypeColour (typography and colour specialist) |
| Authority | `docs/marea/brand/MC-04-VISUAL-IDENTITY-BRIEF.md` §4 (lines 566–724), §7.5, §7.9, §10.2 MR-BRD-014, §11.1 |
| Deterministic evidence | `scripts/check-typography.mjs` (real WOFF2 parsing + installed Playwright Chromium measurement) |
| Related deliverables | `docs/marea/brand/tokens/marea-instrument-tokens.proposed.json`, `docs/marea/brand/COLOUR-SYSTEM.md`, `docs/marea/brand/MC-04-ACCESSIBILITY-EVIDENCE.md` |
| External gates | `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`; `PUBLIC_MAREA_BRAND_USE = NO_GO`; `FINAL_IDENTITY_ADOPTION = BLOCKED`; print/PDF procurement `BLOCKED` |

**MAREA is a proposed brand.** This document records verification work; it is not an adoption, a
clearance, a certification, a purchase, a publication approval or a claim that the live site already
implements the system. Every measurement below was produced by the script named in this document on
2026-10-30 in this repository; no expected or remembered number is pasted as evidence.

---

## 1. Decision summary

**PROPOSED: keep both installed families, add one numeric role, change nothing in `src/`.**

| Question | Decision | Basis |
| --- | --- | --- |
| Replace DM Sans / Manrope? | **No.** Keep both installed `@fontsource-variable` families. No new typeface, no purchase, no new dependency. | Both pass licence, coverage and self-hosting verification (§3, §5, §6). Replacing a self-hosted, already-licensed stack would add legal, supply-chain and byte cost with no demonstrated failure of the typefaces themselves. |
| Which family carries instrument numerics? | **Manrope 700 with tabular figures.** This is a documented deviation from the brief's §4.4 "DM Sans numeric" assumption. | Measured: **no DM Sans build shipped in `@fontsource-variable/dm-sans@5.3.0` exposes a `tnum` feature** and every DM Sans build renders proportional digits. Manrope's latin build exposes `tnum`; Chromium equalises its digit advances within the brief's sub-pixel tolerance. |
| Which family carries body text? | **DM Sans 400**, unchanged. Its proportional figures are correct for prose (N-3). | Measurement + brief §4.4 role table. |
| Which family carries display/headings/family labels? | **Manrope 500–800**, unchanged. | Brief §4.4; existing `.display`/`.brand-name`. |
| Is tabular figures behaviour proven? | **Yes for Manrope, empirically in Chromium.** | §4.2: digit advance spread 0.1563 px at 100 px (tolerance 0.2 px = 0.002 em), column delta 0.0000 px for `00:00`/`23:59`, `000°`/`359°`, `08.4 m`/`18.4 m`. |
| Is DM Sans still acceptable? | **Yes for body text and labels, no for mutable numerics.** | §4.2. The brief's N-1/N-2 requirement is non-negotiable; putting DM Sans on a live readout would make digits jitter by up to 34 px per digit at 100 px type. |
| Italics? | **Do not synthesise.** The imported `index.css` of both packages contains normal-style faces only; no italic file is loaded. Use upright or, if a future design needs italic, import the italic CSS entry (extra bytes; MC-06 decision). | Parsed `index.css` of both packages; brief §4.6 rule 3. |
| Wordmark lettering | If IdentityVector draws `MAREA` as artwork, that is original lettering, **not** a modified font. It must not be called or labelled "DM Sans"/"Manrope". | OFL §3/§4/§5; see T-10. |

**What MC-04 explicitly does not decide:** the wordmark case (uppercase vs title case) and whether the
wordmark is typeset or drawn — that remains an identity decision recorded in `IDENTITY-SYSTEM.md`
(IdentityVector). This document defines the type roles the identity may consume.

---

## 2. Installed fonts — verified facts

| Fact | DM Sans | Manrope |
| --- | --- | --- |
| npm package | `@fontsource-variable/dm-sans@5.3.0` | `@fontsource-variable/manrope@5.3.0` |
| Licence field (package.json) | `OFL-1.1` | `OFL-1.1` |
| Shipped licence file | `node_modules/@fontsource-variable/dm-sans/LICENSE` | `node_modules/@fontsource-variable/manrope/LICENSE` |
| Copyright line (first line of LICENSE) | `Copyright 2014 The DM Sans Project Authors (https://github.com/googlefonts/dm-fonts) DMSans-Italic[opsz,wght].ttf: Copyright 2014 The DM Sans Project Authors (https://github.com/googlefonts/dm-fonts)` | `Copyright 2019 The Manrope Project Authors (https://github.com/sharanda/manrope)` |
| Upstream font version (metadata.json) | `v17`, last modified `2025-09-11`, source `https://github.com/google/fonts` | `v20`, last modified `2025-09-05`, source `https://github.com/google/fonts` |
| Imported variable axes (parsed `fvar` of the latin build) | `wght 100–1000`, default 400 | `wght 200–800`, default 200 |
| Subsets shipped | `latin`, `latin-ext` | `latin`, `latin-ext`, `cyrillic`, `cyrillic-ext`, `greek`, `vietnamese` |
| `font-display` in shipped `@font-face` | `swap` (both faces) | `swap` (all six faces) |
| Shipped builds with a `tnum` feature | **0 of 12** | **1 of 6** (latin) |
| unitsPerEm (latin build) | 1000 | 2000 |
| Latin woff2 | `dm-sans-latin-wght-normal.woff2` — 36,932 B, sha256 `9fea608a947e6702…` | `manrope-latin-wght-normal.woff2` — 24,836 B, sha256 `a30ddcd349703aff…` |
| Latin-ext woff2 | 18,228 B, sha256 `a5d38fe99f930275…` | 15,120 B, sha256 `3911b66d9f2e005a…` |
| Embedded name-table copyright | `Copyright 2014 The DM Sans Project Authors (https://github.com/googlefonts/dm-fonts)` | `Copyright 2019 The Manrope Project Authors (https://github.com/sharanda/manrope)` |
| Embedded name-table version | `Version 4.004;gftools[0.9.30]` | `Version 4.504` |
| Embedded name-table licence URL | `https://scripts.sil.org/OFL` | `http://scripts.sil.org/OFL` |
| Embedded name-table licence text (name ID 13) | `null` (not embedded) | `null` (not embedded) |

Full SHA-256 values, table directories and per-face records: machine output of
`node scripts/check-typography.mjs` (JSON block) — reproduced in §9.

---

## 3. Licence verification record (T-1 … T-10, hard gate)

Status vocabulary: `PASS` = verified with real evidence; `PARTIAL` = verified in part and the missing
part is named; `BLOCKED` = cannot be completed in MC-04; `NOT_APPLICABLE`.

| # | Requirement | Evidence inspected | Result | Status |
| --- | --- | --- | --- | --- |
| **T-1** | Licence name and version and the exact shipped licence file | Both `LICENSE` files contain the full **SIL Open Font License 1.1, 26 February 2007** text. Script flags: `ofl11=true`, `oflPermission=true`, `oflBundling=true`, `oflDocumentExemption=true`, `RFN-clause=true`. | OFL-1.1, no separate purchase, no per-seat term. | `PASS` |
| **T-2** | Copyright holder and source; no "free" claim without reading the licence | Copyright holders as quoted above; source and packaging recorded; package `license` field `OFL-1.1`; licence read in full (93 lines each). | Attribution facts recorded; no claim beyond the licence text. | `PASS` |
| **T-3** | Installed package version and lockfile integrity | `package.json` `^5.3.0`; installed/lockfile `5.3.0`; `package-lock.json` integrity `sha512-BpUG5bqePiDFMBM4ZtLSlPdAIOM990uB1dlXzIf4aw21yQR7BmykedLXXXMqGWsR18aMLOsbWccwJNh3ztTQaA==` (DM Sans) and `sha512-6D5dgokHsWDDMtmXHznKa0hK229NN+1a4BLPmUCLqcO1Pw5EEhWY5RFt0AcXnVRAljFFPfRtLkJePQj6LSsV6g==` (Manrope). | Exact versions pinned by lockfile; no unrecorded upgrade in MC-04. | `PASS` |
| **T-4** | Self-hosting verified: no external font origin in the built output | `src/styles.scss` lines 1–2 use `@use '@fontsource-variable/manrope'` and `@use '@fontsource-variable/dm-sans'`; `src/index.html` has no font `<link>`; search of `src/` for `fonts.googleapis|fonts.gstatic|<link…font` → **0 matches**; built `dist/embarcarte/browser/styles-*.css` declares `@font-face` with **relative** `url("./media/…woff2")`; search of `dist/` for external font origins → **0 matches**; eight woff2 files are emitted by the build. | Fonts are build assets served from the same origin. | `PASS` |
| **T-5** | Glyph coverage for ES/PT/FR/EN (+GL review) at required sizes | Parsed the real WOFF2 `cmap` tables and the shipped `@font-face unicode-range` declarations. 68 required characters (all digits, `. , : ° % € − – — · × ÷ ª º`, ES/PT/FR accents `á é í ó ú ü ñ Á É Í Ó Ú Ü Ñ ¿ ¡ â ã à ê ë ô õ ç è î ï û ù œ æ`, space/NBSP, unit letters and `T M N W S E`) → **DM Sans 0 missing, Manrope 0 missing**; all 32 required/locale test strings fully covered. Optional probe `′`/`″` are **absent from both fonts**; they are not required (position uses degrees + decimal minutes; symbol-only units are prohibited, N-11) and are recorded, not gated. Visual accent clipping at 10 px/72 px is **NOT_TESTED** (needs rendered human review; §10). | Glyph inventory verified in the exact files that ship. | `PASS` (coverage) / `NOT_TESTED` (visual clipping) |
| **T-6** | Numeric features verified (`tnum`, optional `zero`) in the exact build | GSUB **and** GPOS FeatureList scan of every shipped woff2: DM Sans `tnum=false` (all 12 builds), `zero=false`; Manrope `tnum=true` (latin build), `zero=false`. Chromium measurement of digits at 48/72/100 px (below) proves the CSS declaration `font-variant-numeric: tabular-nums` and `font-feature-settings: 'tnum' 1` both equalise Manrope advances; both do nothing in DM Sans. | `tnum` proven for Manrope; DM Sans numeric role rejected. | `PASS` (Manrope) / `FAIL` (DM Sans as numeric family — recorded as deviation `TYPO-DEVIATION-01`) |
| **T-7** | Font transfer bytes and `font-display` behaviour against the performance budget | Eight woff2 emitted: DM Sans latin 36,932 B + latin-ext 18,228 B; Manrope latin 24,836 B + latin-ext 15,120 B + cyrillic 14,500 B + cyrillic-ext 2,552 B + greek 9,444 B + vietnamese 8,520 B ⇒ **130,132 B emitted in total**. Browsers download only subsets matching the page's characters: for ES/EN/PT/FR the `latin`-range declaration covers every character the brief requires, so the expected transfer for both families is **61,768 B** (DM Sans latin + Manrope latin); `latin-ext` (33,348 B) is the fallback for characters outside `U+0000–00FF`-range coverage and was not observed to be needed for the required strings. Every shipped face declares `font-display: swap`. Actual network transfer, CLS and FOIT/FOUT have **not** been measured here: `npm run test:performance` is the measuring gate (it records font transfer bytes; it applies no thresholds), and it is Lead-owned. | Bytes computed from real files; `font-display` verified; network measurement `NOT_TESTED`. | `PARTIAL` |
| **T-8** | Embedding permission for PDF/print reviewed before generating PDFs | OFL text contains: *"The requirement for fonts to remain under this license does not apply to any document created using the Font Software."* (verified `document-exemption=true`) and *"may be bundled, redistributed and/or sold with any software"* (verified `bundling=true`). No no-embedding clause exists. The fonts are **not** redistributed by MC-04; no PDF/print artefact was generated (print authorization absent). | Embedding in PDFs/documents is permitted by the licence; actual PDF/print production is not evidenced. | `PARTIAL` / print `BLOCKED` |
| **T-9** | If a new typeface is proposed: written licence record, no purchase without human authorization | No new typeface is proposed. No purchase initiated. | Not applicable in MC-04. | `NOT_APPLICABLE` |
| **T-10** | Reserved font names / modification clause respected | The shipped copyright notices contain **no `Reserved Font Name` declaration** (`RFN-declared=false` for both). MC-04 does not modify, subset for redistribution or rename the fonts. If the wordmark becomes drawn lettering it is original artwork, not a modified font, and may not be presented as "DM Sans" or "Manrope". | No RFN obligation triggered; no modification performed. | `PASS` |

### 3.1 Notice / attribution obligation (T-1/T-2 consequence)

OFL §2 requires that copies of the Font Software contain the copyright notice and the licence: as a
stand-alone text file, a human-readable header, or machine-readable metadata that can be viewed by the
user. Today the obligation is met at package level by the shipped `LICENSE` files (read in full) and by
the copyright string embedded in each woff2 `name` table (verified above). No on-page credit is
required by OFL for documents created with the fonts (OFL §5 document exemption). If MC-06 ever copies
font files out of `node_modules` into `public/` or a distribution package, it must keep the
`LICENSE`/copyright notice with them. This is a packaging rule, not a website footer requirement.

Residual legal question: whether serving subsetted woff2 files from the website counts as
"redistributing the Font Software" under OFL §2 in every jurisdiction is a legal question, not a design
one. Recorded as `LEGAL_REVIEW_PENDING`; no agent closes it.

---

## 4. Numeric treatment — measured proof

### 4.1 Measurement method

`scripts/check-typography.mjs` launches the installed Playwright Chromium (156.0.8078.4, headless),
writes a self-contained probe page that declares `@font-face` for the **real** `.woff2` files over
`file://`, waits for `document.fonts.ready`, then measures each digit/character/string with the
`getBoundingClientRect().width` of a `white-space: pre; letter-spacing: 0` inline span at 100 px
(weight 700), with three variants: no numeric feature, `font-variant-numeric: tabular-nums`, and
`font-feature-settings: 'tnum' 1`. Column alignment is measured as the maximum difference between
cumulative prefix widths of two same-length strings. Tolerance: **0.002 em** (0.2 px at 100 px,
0.096 px at 48 px). This is a rendered measurement, not a font editor assumption.

### 4.2 Tabular figures in Chromium (rendered)

Digit advance spread (max − min across `0–9`):

| Family | Size | normal | `font-variant-numeric: tabular-nums` | `font-feature-settings: 'tnum' 1` | Tolerance | Verdict |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| DM Sans | 48 px | 16.3125 px | 16.3125 px | 16.3125 px | 0.096 px | **FAIL** (no tnum) |
| DM Sans | 72 px | 24.4844 px | 24.4844 px | 24.4844 px | 0.144 px | **FAIL** |
| DM Sans | 100 px | 34.0000 px | 34.0000 px | 34.0000 px | 0.200 px | **FAIL** |
| Manrope | 48 px | 10.5625 px | **0.0781 px** | **0.0781 px** | 0.096 px | `PASS` |
| Manrope | 72 px | 15.8438 px | **0.1094 px** | **0.1094 px** | 0.144 px | `PASS` |
| Manrope | 100 px | 22.0000 px | **0.1563 px** | **0.1563 px** | 0.200 px | `PASS` |

The residual Manrope difference is the `6` glyph (62.16 px vs 62.00 px at 100 px = 0.0016 em): visible
in the trace only at 4–5 decimals, two orders of magnitude below a device pixel at instrument sizes.
Digits 0,1,2,3,4,5,7,8,9 are exactly equal under tabular figures.

Digit advances at 100 px (px, `0 1 2 3 4 5 6 7 8 9`):

```
DM Sans   normal       70.41 36.41 57.70 60.31 65.00 62.11 63.41 53.61 63.20 63.41
DM Sans   tabular-nums 70.41 36.41 57.70 60.31 65.00 62.11 63.41 53.61 63.20 63.41
Manrope   normal       65.81 43.81 59.56 58.16 60.86 58.61 62.16 53.36 61.25 62.16
Manrope   tabular-nums 62.00 62.00 62.00 62.00 62.00 62.00 62.16 62.00 62.00 62.00
```

Column alignment (max cumulative delta for same-length strings):

| Pair | DM Sans (all variants) | Manrope `tabular-nums` | Manrope `tnum` |
| --- | ---: | ---: | ---: |
| `00:00` vs `23:59` | **40.4688 px** | **0.0000 px** | **0.0000 px** |
| `000°` vs `359°` | **27.7656 px** | **0.0000 px** | **0.0000 px** |
| `08.4 m` vs `18.4 m` | **34.0000 px** | **0.0000 px** | **0.0000 px** |

Required numeric strings in Manrope, width before → after tabular figures (100 px):

| String | normal (px) | tabular (px) |
| --- | ---: | ---: |
| `00:00` | 297.45 | 282.25 |
| `23:59` | 272.70 | 282.25 |
| `000°` | 242.41 | 231.00 |
| `359°` | 223.91 | 231.00 |
| `6.4 kn` | 289.70 | 290.86 |
| `12.8 V` | 279.00 | 300.41 |
| `14.2 A` | 279.61 | 303.41 |
| `37.5° N` | 335.59 | 353.16 |
| `008° W` | 355.41 | 348.56 |
| `1013 hPa` | 414.22 | 450.67 |
| `24.6 °C` | 347.75 | 355.36 |

The important proof is the first four rows: a live clock whose values change from `00:00` to `23:59`
occupies **exactly the same width** under tabular figures and by design does not shift adjacent layout.

### 4.3 Minus sign and glyph distinction (N-8)

| Family | U+2212 minus (px) | U+002D hyphen (px) | `0` (px) |
| --- | ---: | ---: | ---: |
| DM Sans | 57.906 | 57.609 | 70.406 |
| Manrope | 54.000 | 42.000 | 65.813 |

U+2212 is present and measurably distinct from the hyphen (especially in Manrope). Rule: negative
values use **U+2212 `−`** in a separate span so its width can be reserved (`−0,5`), never a hyphen.

### 4.4 Proposed numeric CSS (documented only — **not applied**)

```css
/* PROPOSED for MC-06 — not present in src/; Manrope carries the numeric role because it is the
   only installed family with verified tabular figures. */
.instrument-value {
  font-family: var(--display); /* 'Manrope Variable', ... — the display role token */
  font-weight: 700;
  font-variant-numeric: tabular-nums; /* portable declaration (verified) */
  font-feature-settings: 'tnum' 1; /* low-level equivalent (verified; same result) */
  letter-spacing: 0; /* N-4: never track digits */
  line-height: 1;
}
.instrument-unit {
  font-family: var(--display);
  font-size: 0.6em;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.08em; /* units only — never inherited by the value */
  text-transform: uppercase;
}
.instrument-age,
.instrument-timestamp {
  font-family: var(--display);
  font-variant-numeric: tabular-nums;
  letter-spacing: 0;
}
```

Rules carried from §4.5 of the brief: N-1 (tabular for mutable values), N-2 (declare the CSS property;
raw feature settings only because verified), N-3 (proportional figures only in prose), N-4 (no tracking
on digits/units; reserve worst-case width), N-5 (`Intl.NumberFormat`; `1.234,5` ES/PT/FR, `1,234.5`
EN), N-6 (3-digit zero-padded bearings + `T`/`M` suffix), N-7 (unit in a separate span, NBSP,
0.6× size), N-8 (U+2212 minus), N-9 (precision per data class — engineering confirmation pending),
N-10 (24 h `HH:MM`, UTC/local labelled), N-11 (no scientific notation, no thousands separators or
symbol-only units in readouts), N-12 (age/state signal in tabular digits on every live value).

**Locale number formatting** is a data-layer rule, not a font rule: the type must render `,` and `.`
identically well (verified in coverage) and the separator choice comes from `Intl.NumberFormat` with
the document locale.

---

## 5. Typographic roles required by the brief

Sizes are the brief's; the family column is the MC-04 decision.

| Role | Family / weight | Size (web) | Size (instrument, PROPOSED) | Tracking | Notes |
| --- | --- | --- | --- | --- | --- |
| Corporate headline / hero | **Manrope** 500–700 | `clamp()` 42–72 px (existing) | n/a | −0.02 em, only ≥ 28 px | Never in instrument chrome |
| Section heading | **Manrope** 600 | 24–30 px | n/a | −0.01 to −0.02 em | Title case; sentence case preferred for ES |
| Product-family lockup (`MAREA NAV`, `MAREA HUB`, …) | **Manrope** 700–800 | 20–22 px | n/a | existing −0.9 px may be revisited by the identity owner | The wordmark lettering is governed by `IDENTITY-SYSTEM.md`; canonical family naming is `MAREA <FAMILY>` |
| Descriptions / product copy | **DM Sans** 400 | 15–16 px, line-height 1.6 | 16–18 px equivalent | 0 | ≤ 75 characters |
| Body / long copy | **DM Sans** 400 | 16–18 px, line-height 1.6 | 16–18 px equivalent | 0 | Measure ≤ 75 characters |
| Small UI label / control | **DM Sans** 500–600 | 12–14 px | 12–14 px equivalent | 0 | Sentence case preferred; no all-caps sentences |
| Micro-label / eyebrow | **DM Sans** 700 | 10–12 px | 11–13 px equivalent | +0.08 em, uppercase | Use sparingly; accents must remain legible at 10 px (visual review NOT_TESTED) |
| **Instrument value** | **Manrope** 700, tabular | 48–72 px primary; 28–40 px secondary | ≈ 18–24 mm primary, 8–14 mm secondary at 0.6–0.9 m (PROPOSED; hardware BLOCKED) | **0** | Tabular figures mandatory (verified) |
| Unit / suffix | **Manrope** 500 | 0.6 × value size | 0.6 × value size | +0.08 em, uppercase | Separate span; NBSP; never inherits numeral tracking |
| Timestamp / age | **Manrope** 500–600, tabular | 11–14 px | 11–14 px equivalent | 0 | `HH:MM` 24 h; age `s`/`mm:ss`; UTC/local labelled |
| Metadata / provenance | **DM Sans** 400–500 | 11–12 px | 10–12 px equivalent | 0 | Must meet the internal ≥5:1 target; timestamps inside metadata use the tabular numeric span |
| Alert label | **DM Sans** 600 | 14–16 px | 14–18 px equivalent | 0 | Sentence case, never all-caps, never colour-only; always cause + required action + source/age |
| Chart annotation / axis label | **DM Sans** 400–500 | 10–12 px | 10–12 px equivalent | 0 | Numeric annotations use the Manrope tabular span; axis labels use DM Sans |
| Installer documentation | **DM Sans** 400 body, **Manrope** 600 headings | 10–11 pt print body (min 7 pt; critical labels 9 pt) | — | 0 | Print/PDF BLOCKED; target sizes from §11.1 |
| Packaging labels | **Manrope** 700 family name, **DM Sans** 400 legal/body | min 7 pt body, 9 pt critical | — | 0 | ES/PT/EN/FR panels; print/procurement BLOCKED |

Two families, clearly distinct roles. The **numeric treatment — instrument value, unit/suffix and
timestamp/age spans (three roles in the §4.4 table) —** is the only part of the role table that moves
family relative to the brief's §4.4 proposal; it moves to a family that is already installed and already
carries the display role. The deviation scope is exactly `TYPO-DEVIATION-01` (numeric treatment carried by
Manrope); no other role changes family.

---

## 6. Locale coverage (ES / EN / PT / FR, GL review pending)

Coverage was verified against the real `cmap` tables, not against a screenshot.

| Locale | Verified glyphs | Representative strings checked | Result |
| --- | --- | --- | --- |
| ES | `á é í ó ú ü ñ Á É Í Ó Ú Ü Ñ ¿ ¡`, `º ª`, `°`, `€` | `Marea alta`, `Profundidad`, `Babor`, `Estribor`, `Rumbo 045°`, `6,4 kn`, `18,5 °C`, `¿Actualizar?`, `pingüino`, `ÁÉÍÓÚÑÜ`, `día`, `año`, `Ñandú` | `PASS` |
| PT | `á â ã à é ê í ó ô õ ú ç` | `Maré`, `Profundidade`, `Estibordo`, `Rumo`, `6,4 nós` | `PASS` |
| EN | ASCII + shared symbols | `Depth`, `Heading`, `6.4 kn`, numeric readout set | `PASS` |
| FR | `é è ê ë à â î ï ô û ù ç œ æ` | `Marée`, `Profondeur`, `Bâbord`, `Cap`, `6,4 nd` | `PASS` |
| GL (review requested) | same families as ES/PT | `Marea`, `Profundidade`, `Babor` | **glyphs present; copy review `PENDING`** — this document does not assert Galician copy correctness |

Rules carried from §4.6: test every role at 10/12/14/16/28/48/72 px with worst-case strings and check
**no clipped accents** (visual, `NOT_TESTED` — see §10); uppercase micro-labels keep their accents;
no `font-synthesis`; `lang` set on every document and mixed-language span; units/numbers never broken
across lines (NBSP); missing glyph fallback is the explicit stack `'<family>', system-ui, sans-serif`
(never a silent tofu box, never a network fetch — verified: no external origin).

**Fallback stack note.** The current `--display`/`--body` tokens already end in `system-ui, sans-serif`.
The numeric role proposal uses the same explicit stack. If a glyph were missing, the browser falls back
to `system-ui`; coverage evidence shows this is not expected for the required set, but it is not a
guarantee for arbitrary user-entered text (future character inventory required).

---

## 7. Performance notes (real bytes, not estimates)

| Item | Bytes | Notes |
| --- | ---: | --- |
| DM Sans latin woff2 | 36,932 | loaded for ES/EN/PT/FR body text |
| Manrope latin woff2 | 24,836 | loaded for display + numerics + units |
| **Expected latin-only transfer** | **61,768** | both families, all weights (variable `wght`), before HTTP compression; woff2 is already Brotli-compressed so transfer ≈ bytes |
| DM Sans latin-ext woff2 | 18,228 | needed only for characters outside the `latin` declared range; not required by the tested set |
| Manrope latin-ext woff2 | 15,120 | same |
| Manrope cyrillic-ext / cyrillic / greek / vietnamese | 2,552 / 14,500 / 9,444 / 8,520 | declared but never downloaded for ES/EN/PT/FR pages unless such characters appear |
| **Total woff2 emitted into `dist/`** | **130,132** | eight files; dist manifests all shipped subsets, transfer is subset-driven |
| **Total woff2 shipped in the two packages** | **612,860** (DM Sans 537,888 in 12 files; Manrope 74,972 in 6 files) | most DM Sans bytes are `opsz`/`italic` variants **not** imported by `index.css` |

Performance rules: keep self-hosting; never add a font CDN; do not import italic/`opsz` entries without
a measured need; keep `font-display: swap`; the latin-only transfer above is the number to compare when
`npm run test:performance` measures font bytes. **Measurement gap:** actual network transfer, CLS and
FOIT/FOUT were not measured in MC-04; `npm run test:performance` measures them (no thresholds, Lead
review) and is the future test that closes T-7 `PARTIAL`.

---

## 8. Token proposals (typography subset of D-08)

The full token file is `docs/marea/brand/tokens/marea-instrument-tokens.proposed.json`; the typography
group is:

```json
{
  "body": { "family": "DM Sans Variable", "package": "@fontsource-variable/dm-sans@5.3.0" },
  "displayNumeric": {
    "family": "Manrope Variable",
    "package": "@fontsource-variable/manrope@5.3.0",
    "numericCapable": true
  },
  "numeric": {
    "fontVariantNumeric": "tabular-nums",
    "fontFeatureSettings": "'tnum' 1",
    "letterSpacing": "0",
    "unitRatio": 0.6,
    "unitLetterSpacing": "0.08em",
    "unitTransform": "uppercase",
    "minusGlyph": "U+2212"
  }
}
```

Proposed custom properties (MC-06 implementation, **not applied**):

```css
--inst-font-body: 'DM Sans Variable', 'DM Sans', system-ui, sans-serif;
--inst-font-display: 'Manrope Variable', 'Manrope', system-ui, sans-serif;
--inst-font-numeric: 'Manrope Variable', 'Manrope', system-ui, sans-serif;
--inst-feature-numeric: 'tnum' 1;
--inst-size-readout-primary: 64px; /* range 48–72; display hardware BLOCKED */
--inst-size-readout-secondary: 34px; /* range 28–40 */
--inst-label-size: 13px;
--inst-unit-size: 0.6em;
```

The existing web roles `--display` and `--body` stay unchanged; MC-06 adds the numeric role rather than
mutating a web token.

---

## 9. Real command output (evidence appendix)

Command:

```
node scripts/check-typography.mjs
```

Exit code: **0** (`RESULT: PASS`). Environment printed by the script: node v24.18.0,
@playwright/test 1.64.1, chromium 156.0.8078.4, win32.

Key output lines, copied verbatim from the run (the script prints a full JSON block after these):

```
## dm-sans (body text and instrument numerics)
  package      : @fontsource-variable/dm-sans@5.3.0
  licence      : OFL-1.1 (Copyright 2014 The DM Sans Project Authors (https://github.com/googlefonts/dm-fonts) DMSans-Italic[opsz,wght].ttf: Copyright 2014 The DM Sans Project Authors (https://github.com/googlefonts/dm-fonts))
  OFL checks   : ofl11=true permission=true bundling=true document-exemption=true RFN-clause=true RFN-declared=false
  upstream     : v17 (2025-09-11) from https://github.com/google/fonts
  axes         : wght 100–1000 (default 400)
  feature tags : calt, ccmp, dnom, frac, kern, liga, locl, mark, mkmk, numr — tnum=false zero=false
  builds       : 12 woff2 shipped, 0 declare tnum

## manrope (display / headings / product-family lockup)
  package      : @fontsource-variable/manrope@5.3.0
  licence      : OFL-1.1 (Copyright 2019 The Manrope Project Authors (https://github.com/sharanda/manrope))
  OFL checks   : ofl11=true permission=true bundling=true document-exemption=true RFN-clause=true RFN-declared=false
  upstream     : v20 (2025-09-05) from https://github.com/google/fonts
  axes         : wght 200–800 (default 200)
  feature tags : calt, dnom, frac, kern, liga, locl, numr, pnum, tnum — tnum=true zero=false
  builds       : 6 woff2 shipped, 1 declare tnum

## Glyph coverage (cmap ∩ declared unicode-range)
  dm-sans: required=68 missing=0 strings-with-gaps=0
  manrope: required=68 missing=0 strings-with-gaps=0

## Chromium measurement (local woff2 over file://, weight 700)
  dm-sans: loaded=true numericRole=false tabularFiguresOk=false
     48 px: normal=16.3125 tabular-nums=16.3125 tnum=16.3125 tolerance=0.0960 px
     72 px: normal=24.4844 tabular-nums=24.4844 tnum=24.4844 tolerance=0.1440 px
    100 px: normal=34.0000 tabular-nums=34.0000 tnum=34.0000 tolerance=0.2000 px
  manrope: loaded=true numericRole=true tabularFiguresOk=true
     48 px: normal=10.5625 tabular-nums=0.0781 tnum=0.0781 tolerance=0.0960 px
     72 px: normal=15.8438 tabular-nums=0.1094 tnum=0.1094 tolerance=0.1440 px
    100 px: normal=22.0000 tabular-nums=0.1563 tnum=0.1563 tolerance=0.2000 px

DEVIATION TYPO-DEVIATION-01: Instrument numeric role carried by manrope instead of DM Sans (brief §4.4 proposal)
          reason: the installed DM Sans 5.3.0 builds expose no tnum feature and render proportional digits; the brief N-1/N-2 requirement is non-negotiable
WARN  dm-sans: no shipped woff2 build declares a GSUB/GPOS 'tnum' feature — tabular figures are unavailable in this package
WARN  dm-sans: display family is not fully tabular (spread 34.0000 px at 100 px); do not use it for mutable values, prices in tables or instrument numerics

RESULT: PASS
```

The script also reads and prints the `name`-table records (copyright, font version, OFL URL) used in
§2 and §3, and the full SHA-256 per woff2 file. It writes **no repo files**; the JSON block is the
machine-readable record.

### 9.1 Independent reproduction (external verification of these numbers)

The independent reviewer (author ≠ reviewer, Phase-1 review of 2026-10-30) **reproduced every number
quoted in this document with its own implementation**, including:

- digit advance spreads at 48/72/100 px and the tabular/`tnum` equality result (DM Sans 34.0000 px
  proportional; Manrope 0.1563 px tabular);
- column-alignment deltas for `00:00`/`23:59`, `000°`/`359°`, `08.4 m`/`18.4 m` (DM Sans 40.4688 /
  27.7656 / 34.0000 px; Manrope 0.0000 px), digit-width traces and string widths;
- woff2 file bytes and SHA-256 prefixes (DM Sans latin 36,932 B, latin-ext 18,228 B; Manrope latin
  24,836 B, latin-ext 15,120 B);
- the `tnum` build counts (**0 of 12** DM Sans builds vs **1 of 6** Manrope builds) and the
  `TYPO-DEVIATION-01` consequence;
- the licence facts (OFL-1.1, copyright holders, no Reserved Font Name declared) and the
  document-creation/embedding clause.

Recorded conclusion of that reproduction: **no discrepancy** with this document or with
`scripts/check-typography.mjs`. External verification does not turn the objective licence/feature facts
into a legal approval; `LEGAL_REVIEW_PENDING` and the print/PDF, hardware and visual-clipping
`NOT_TESTED`/`BLOCKED` items in §10 still stand.

---

## 10. Limitations, NOT_TESTED and BLOCKED items

| Item | Status | Exact future test |
| --- | --- | --- |
| Accent-clipping visual inspection at 10/12/48/72 px in every role | `NOT_TESTED` | Render worst-case ES/PT/FR strings at the required sizes on Windows/Android/iOS Chromium+WebKit, inspect cap-height and diacritic clearance, capture screenshots; reviewer ≠ author |
| Rendered screenshot proof of tnum on an implemented instrument view | `NOT_TESTED` | MC-06 implementation: live-updating readout (`00:00`→`23:59`, `000°`→`359°`) captured before/after; no layout shift allowed |
| Actual font network transfer, CLS, FOIT/FOUT | `NOT_TESTED` | `npm run test:performance` (records font bytes; no thresholds) run by the Lead on the built site; compare with the 61,768 B latin expectation |
| PDF/print embedding of the fonts (datasheets, installer records, packaging) | `BLOCKED` | Print authorization + PDF pipeline; generate a 1:1 proof, confirm licence notice retention policy and OFL §5 document exemption, inspect embedded subsets |
| Galician copy correctness | `PENDING` | Galician-speaker review in MC-06+; the brief does not assert GL copy |
| Sunlight/glare legibility of type sizes | `BLOCKED` | Physical display + photometric measurement in ambient sunlight; no display exists |
| Cross-platform (non-Chromium) font rendering and fallback | `NOT_TESTED` | WebKit/Firefox rendering matrix on the supported OS/browser list |
| Font delivery on slow connections / swap behaviour | `NOT_TESTED` | Throttled-network CLS/FOUT trace in the performance gate |
| Legal review of OFL redistribution edge cases | `LEGAL_REVIEW_PENDING` | Company/counsel review; no agent closes it |

No WCAG conformance, cockpit validation, brand adoption or legal clearance is claimed anywhere in this
document or implied by a `PASS` in §3.

---

## 11. Manifest requirements for MR-BRD-014 (owner: whoever registers files)

For every file this deliverable references, the manifest must record real values, not placeholders:

- `id: MR-BRD-014`, `category: brand`, `classification: BRAND`, `status: INTERNAL_PROPOSED`;
- `files[]` for this document and the two scripts, each with `path`, `format`, `bytes`, `sha256`
  (compute with Node/.NET; the typography script prints the woff2 SHA-256 values);
- `rights.license` per family: `OFL-1.1` with the copyright notice quoted in §2;
- `rights.provenance: EMBARCARTE-authored documentation (fonts are third-party OFL assets bundled via
  npm)`, `ai_generated: false`;
- `checks.license_verified`, `checks.coverage_verified`, `checks.tnum_verified` referencing the script
  and the run date;
- no `®`/`™`, no availability, price, certification or performance claim.
