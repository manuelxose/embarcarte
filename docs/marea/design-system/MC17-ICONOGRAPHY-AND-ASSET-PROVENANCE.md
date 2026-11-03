# MC-17 — Iconography and asset provenance (D07)

| Field | Value |
|---|---|
| Deliverable | D07 `MC17-ICONOGRAPHY-AND-ASSET-PROVENANCE.md` |
| Milestone | MC-17/36 — MAREA premium design system (internal only) |
| Date | 2026-11-03 |
| Owner | documentation-specialist (MC-17/36) |
| Status | `INTERNAL_PROPOSED`; identity `NOT_ADOPTED`; public use `NO_GO` |
| Machine-readable record | `docs/marea/design-system/data/asset-provenance.json` |
| Shipped glyph source | `src/app/marea-design-system/components/foundation/marea-icon-paths.ts` |
| MC-04 icon authority | `docs/marea/brand/ICONOGRAPHY-SYSTEM.md` |

## 1. Two separate icon populations

MC-17 involves two icon sets and they must not be confused:

| Population | Location | Count | Used by the design system? |
|---|---|---|---|
| MC-04 **candidate** asset library | `docs/marea/brand/assets/icons/ui/` | 59 files (57 `.svg` + `index.html` + `reduction-proof.html`) | **No** |
| MC-17 **shipped** glyphs | `src/app/marea-design-system/components/foundation/marea-icon-paths.ts` | 28 glyphs in 1 source file | **Yes** |

The MC-04 library is design evidence held under a proposed identity. It is **not
copied, imported, referenced or bundled** by the design system, the catalogue or
`public/`. MC-17 authored its own small geometric vocabulary instead, because the
candidate set was never adopted and its professional originality review is still
`PENDING`.

## 2. MC-04 candidate library — real filenames (57 SVG masters)

```text
acknowledge, ais-receive-only, ais-target-lost, ais-target-selected, ais-target,
alert-alarm, alert-caution, alert-warning, battery, bilge, brightness, calibration,
cellular, charger, connection, depth, device-control-head, device-display,
device-hub, fleet, fuse-breaker, gps-fix, gps-no-fix, ground, installation,
nav-bearing, nav-heading, nav-north, nav-waypoint, network-bus, no-data, offline,
position-marker, power, pressure, scale, sensor, service, settings, shore-power,
signal-strength, solar, speed, stale, status-info, support, tank-level,
temperature, unknown, update, watch-monitoring, weather-forecast, wifi,
wind-angle, wind-apparent, wind-sensor, wind-true
```

Recorded properties from `ICONOGRAPHY-SYSTEM.md` §2 and §13: 24×24 grid, base
stroke 2, monoline with square cuts, **24,648 B total** for 57 files, **max 845 B**
per file, structural self-check **57/57 passed** (author-run, not independent),
render proof in Playwright Chromium with **57 rows / 228 inline SVG instances** and
no console errors.

Status of that set, quoted: "57 SVG masters + catalogue + reduction proof exist;
structural self-checks run"; legal status `LEGAL_REVIEW_PENDING`;
`ORIGINALITY_PROFESSIONAL_CHECK = PENDING`; the document explicitly does not claim
`APPROVED_FOR_USE`, `CLEARED` or `CERTIFIED`, and states those statuses do not
exist in the programme vocabulary.

## 3. MC-17 shipped glyphs (28)

| Groups | Glyph names |
|---|---|
| Direction | `chevron-down`, `chevron-up`, `chevron-right`, `chevron-left`, `arrow-right`, `menu`, `external` |
| Action | `check`, `close`, `plus`, `minus`, `download`, `document`, `link`, `sliders` |
| Status / shape | `info`, `warning`, `critical`, `clock`, `offline`, `online`, `target`, `lock`, `shield-alert` |
| Markers | `dot`, `square`, `dash`, `gauge` |

All 28 are 24×24 `viewBox` stroke geometry with `stroke-width="2"`,
`stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"` and
`stroke="currentColor"`. The file header states, in the source itself:

> "drawn as simple 24×24 stroke geometry for this milestone. They are NOT copied,
> traced or adapted from a competitor icon set and they are NOT the proposed MAREA
> identity artwork held under `docs/marea/brand/assets`. No originality clearance is
> claimed."

That statement is the provenance record for this set; there is no hash manifest,
no independent review and no legal opinion behind it. **No originality clearance is
claimed by this document either.**

## 4. Public-asset state

| Check | Result | Evidence |
|---|---|---|
| MAREA assets in `public/` | **0** | check `MC17-11` PASS — "15 public files unchanged, zero MAREA assets" |
| MC-04 logo, wordmark, mark, family lockup exported | **0** | no file from `docs/marea/brand/assets/logo/**` exists under `public/` |
| MC-04 icon master copied | **0** | no file from `docs/marea/brand/assets/icons/ui/**` exists under `public/` |
| Public file count | 15, byte-identical to the baseline | `legacy-ui-baseline.json` `publicFileCount` 15 with per-file SHA-256 |
| Raster asset added by the catalogue | **0** | `angular.json` catalogue `assets: []`; no image file under `preview/` |

The design system renders icons as inline SVG paths from TypeScript, so even the
shipped glyphs have **no file in `public/`** and no network request.

## 5. Semantic usage rules (as implemented)

| Rule | Enforcement |
|---|---|
| An icon is decorative unless it has an accessible name | `marea-icon` sets `aria-hidden="true"` when no `label` is supplied; with `label` it sets `role="img"` and `aria-label` |
| Status is never icon-only | `marea-status-badge` has a **required** `label` input and always renders a shape icon **and** the text; check `MC17-18` PASS |
| Each tone has a distinct shape | `critical` → octagon, `warning` → triangle, `safe` → check, `stale` → clock, `info` → circled i, `neutral` → square |
| Status text accompanies colour | `dataStatusSemantics` declares `requiresText: true` for all six tones |
| Icon size comes from tokens | `size` input maps to `--marea-icon-size-sm/md/lg/xl` (16/20/24/32px) |
| Icons inherit ink | `stroke="currentColor"` — no baked colour in any glyph, so mode changes recolour them |
| Icon is not a brand mark | MC-04 rule carried: icons are role symbols, never the MAREA symbol |
| No emoji, no flags, no certification seals, no marine clip-art | prohibited by MC-04 §12 and not present in the 28 glyphs |
| Icons do not replace text in controls | `marea-button` keeps a text label in a `<span class="label">` and only adds an optional trailing icon |

Interaction states: icons have no independent hover/focus state; they inherit the
state of the control that contains them. There is no animated icon.

## 6. What the asset-provenance dataset records

`docs/marea/design-system/data/asset-provenance.json` lists 10 asset families.
Each entry carries `provenanceStatus`, `location`, `fileCount`, `publicUse: false`,
`licenceCleared: false` and `originalityClaim: false`, plus what MC-17 did with it.

| Family | Files | `provenanceStatus` | MC-17 action |
|---|---:|---|---|
| `MC04-UI-ICONS` | 59 | `INHERITED_MC04_CANDIDATE_LIBRARY_INTERNAL` | not copied |
| `MC17-SHIPPED-GLYPHS` | 1 file / 28 glyphs | `ORIGINAL_GEOMETRIC_AUTHORED_FOR_MC17` | shipped in source only |
| `MC04-LOGO-AND-LOCKUPS` | 16 | `INHERITED_MC04_PROVISIONAL_IDENTITY_LAYER_B` | not copied, not exported |
| `MC04-APP-ICONS` | 15 | `INHERITED_MC04_PROVISIONAL_IDENTITY_LAYER_B` | not copied |
| `MC04-DIAGRAMS` | 3 | `INHERITED_MC04_INTERNAL_SPECIMEN` | not copied |
| `MC04-PACKAGING` | 6 | `INHERITED_MC04_CONCEPT_ONLY` | not copied |
| `MC04-SOCIAL-AND-PRINT` | 8 | `INHERITED_MC04_INTERNAL_SPECIMEN` | not copied |
| `MC04-EVIDENCE-RENDERS` | 13 | `INHERITED_MC04_REVIEW_EVIDENCE` | not copied |
| `MC17-PREVIEW-CATALOGUE-ASSETS` | 0 | `NO_RASTER_ASSET` | none added |
| `PUBLIC-BASELINE` | 15 | `PRE_EXISTING_BASELINE_UNCHANGED` | unchanged |

Total MC-04 brand asset files enumerated: **120** (59 + 16 + 15 + 3 + 6 + 8 + 13).
This matches the count recorded for the MC-04 asset gate ("120 files / 15 entries")
in the master-prompt registry row 04.

`licenceCleared: false` and `originalityClaim: false` are **not** findings against
the artwork; they record that no licence review and no originality opinion were
performed. No asset here has been cleared and none is presented as cleared.

## 7. Expressly not claimed

| Non-claim | Status |
|---|---|
| Icon-set originality / freedom from third-party rights | `PENDING` — no professional resemblance opinion exists for either population |
| Independent visual review of the glyphs (reviewer ≠ author) | `PENDING` |
| Greyscale / CVD legibility of the MC-17 glyphs | **NOT TESTED** — MC-04 produced boards for its own set only |
| Legibility on a marine display in sunlight or at night | `BLOCKED` — no hardware |
| Print legibility of icons at label sizes | `BLOCKED` — no print authorisation |
| MAREA mark, lockup or logo publication | `NO_GO` — `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`, `FINAL_IDENTITY_ADOPTION = BLOCKED` |
| Manifest registration with SHA-256 for the shipped glyphs | **NOT DONE** — no hash registry exists for `marea-icon-paths.ts` |

## 8. Prohibited actions carried forward

1. Do not copy any MC-04 asset into `public/` or reference it from a component.
2. Do not use an icon as the MAREA brand symbol.
3. Do not imply certification, approval, availability or performance with iconography.
4. Do not mix the MC-04 library and the MC-17 glyph set in one surface — two
   stroke grammars in one row is a visual defect.
5. Do not describe the glyphs as "original", "cleared", "registered" or "certified".

Source references: `docs/marea/brand/ICONOGRAPHY-SYSTEM.md` §§0, 2, 11, 12, 13;
`docs/marea/brand/IDENTITY-SYSTEM.md` §0;
`src/app/marea-design-system/components/foundation/{marea-icon,marea-icon-paths,marea-status-badge}.ts`;
`docs/marea/design-system/data/asset-provenance.json`;
`docs/marea/design-system/evidence/validator-run.json` (checks MC17-11, MC17-18).
