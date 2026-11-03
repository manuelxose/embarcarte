# MC-17 — Typography, spacing and layout (D06)

| Field | Value |
|---|---|
| Deliverable | D06 `MC17-TYPOGRAPHY-SPACING-AND-LAYOUT.md` |
| Milestone | MC-17/36 — MAREA premium design system (internal only) |
| Date | 2026-11-03 |
| Owner | documentation-specialist (MC-17/36) |
| Status | `INTERNAL_PROPOSED`; MC-04 `TYPO-DEVIATION-01` carried |
| Datasets | `data/typography-roles.json`, `data/layout-tokens.json`, `data/token-source-map.json` |
| Generated artefacts | `tokens/generated/marea-tokens.generated.css` / `.ts` |
| Font facts authority | `docs/marea/brand/TYPOGRAPHY-SYSTEM.md` (measured, not re-measured here) |

## 1. Families

| Family token | Value | Status | Role |
|---|---|---|---|
| `--marea-font-display` | `'Manrope Variable', Manrope, system-ui, sans-serif` | `EXISTING_MEASURED_BASELINE` | Headings, display, family lockups, instrument numerics |
| `--marea-font-body` | `'DM Sans Variable', 'DM Sans', system-ui, sans-serif` | `EXISTING_MEASURED_BASELINE` | Body text, labels, instructions, prose |

Both families are already installed and self-hosted through
`@fontsource-variable/manrope` and `@fontsource-variable/dm-sans` (`src/styles.scss`
lines 1–2), under OFL-1.1, verified in MC-04 T-1…T-4. MC-17 adds no typeface,
purchase, CDN or subset. No italic face is loaded (neither package imports one)
and no `font-synthesis` is declared.

## 2. Typography roles (all 13)

| Role | Family | Size | Line height | Weight | Tracking | Purpose |
|---|---|---|---|---|---|---|
| `display1` | display | `clamp(2.5rem, 5vw, 4.5rem)` | 1.05 | 600 | −0.03em | Page display statement |
| `display2` | display | `clamp(2rem, 3.6vw, 3.25rem)` | 1.1 | 600 | −0.025em | Section display statement |
| `title1` | display | `clamp(1.5rem, 2.6vw, 2.25rem)` | 1.2 | 600 | −0.02em | Page section title |
| `title2` | display | `1.375rem` | 1.3 | 600 | −0.01em | Sub-section title |
| `heading` | display | `1.125rem` | 1.35 | 600 | 0 | Component heading in a panel |
| `body` | body | `1rem` | 1.65 | 400 | 0 | Default reading text |
| `bodySmall` | body | `0.875rem` | 1.6 | 400 | 0 | Dense supporting text |
| `label` | body | `0.75rem` | 1.4 | 700 | +0.02em | Form and control labels |
| `meta` | body | `0.6875rem` | 1.5 | 500 | +0.03em | Provenance, age, reference metadata |
| `numericPrimary` | display | `clamp(2.5rem, 6vw, 4.5rem)` | 1 | 700 | 0 | Primary instrument readout |
| `numericSecondary` | display | `clamp(1.5rem, 3vw, 2.25rem)` | 1.1 | 700 | 0 | Secondary numeric context |
| `numericTertiary` | display | `1.125rem` | 1.3 | 600 | 0 | Compact telemetry value |
| `unit` | body | `0.75rem` | 1.3 | 700 uppercase | +0.08em | Measurement unit label |

Custom-property pattern: `--marea-type-<role>-<field>` for
`family`, `size`, `line-height`, `weight`, `tracking` (plus `numeric` for the three
numeric roles and `transform` for `unit`). Fluid sizes are CSS expressions; no
pixel equivalent is asserted because it depends on the viewport.

`bodySmall` emits `--marea-type-body-small-*` (kebab-case) in the generated layer.
**Observed and corrected during authoring:** an earlier state of
`components/foundation/marea-text.ts` read `--marea-type-bodySmall-size` /
`-line-height` (camelCase), which does not resolve and silently falls back to the
inherited value. The file now uses the kebab-case names (verified by reading line 37
at 02:56 local), so the specific mismatch is no longer reproducible in the tree;
`npm run test:design-system` must still re-verify token resolution before this
finding can be called closed. The unsuffixed-CSS-variable failure mode is worth
stating because it fails silently: a mistyped `var()` never throws.

## 3. Numeric contract

| Rule | Value | Evidence |
|---|---|---|
| Numeric family | Manrope 700 (`--marea-font-display`) | `TYPOGRAPHY-SYSTEM.md` §4.2 |
| Tabular figures | `font-variant-numeric: tabular-nums` and `font-feature-settings: 'tnum' 1` | declared in `numericContract`; applied in the numeric components |
| Why Manrope, not DM Sans | **0 of 12** shipped DM Sans woff2 builds expose `tnum`; Manrope's latin build does | MC-04 T-6, `TYPO-DEVIATION-01` |
| Measured digit behaviour (100px, weight 700) | Manrope digit-advance spread **0.1563 px** (tolerance 0.2 px); column delta **0.0000 px** for `00:00`/`23:59`; DM Sans spread **34.0 px**, column delta **40.47 px** | `TYPOGRAPHY-SYSTEM.md` §4.2 (measured in installed Chromium) |
| Minus sign | **U+2212 `−`**, in its own span so width can be reserved | `numericContract.minusGlyph`; `marea-numeric-readout` normalises a leading ASCII `-` to `\u2212` |
| Unit ratio | **0.6 ×** the value size, separate span, NBSP, uppercase, `+0.08em` | `numericContract.unitRatio` = 0.6 |
| Tracking on digits | `0` — never tracked | role table |
| Null value | em dash `—`; never `0`, never a frozen last value | `marea-numeric-readout` `displayValue` |
| Locale formatting | data-layer responsibility (`Intl.NumberFormat`); components never format numbers | `types.ts` `MareaInstrumentReadout` comment |

## 4. Spacing scale

| Token | Value | Semantic role |
|---|---:|---|
| `--marea-space-1` | 4px | Hairline separation |
| `--marea-space-2` | 8px | Inline icon-to-label gap |
| `--marea-space-3` | 12px | Dense stack gap |
| `--marea-space-4` | 16px | Default control/panel gap |
| `--marea-space-5` | 24px | Panel padding |
| `--marea-space-6` | 32px | Section rhythm |
| `--marea-space-7` | 40px | Large block separation |
| `--marea-space-8` | 48px | Page section gap |
| `--marea-space-9` | 64px | Major section gap |
| `--marea-space-10` | 80px | Editorial section gap |
| `--marea-space-11` | 96px | Landing block gap |
| `--marea-space-12` | 128px | Maximum section gap |

Range 4→128px, 12 steps. 1–6 carry MC-04 density ids (`INTERNAL_PROPOSED`);
7–12 are `DERIVED_INTERNAL` extensions of the same 4/8 base. Components use only
these steps — no component declares a raw pixel gap except borders and the 3px/2px
focus geometry.

## 5. Sizing, targets and the normative question

| Token | Value | Status | Normative? |
|---|---:|---|---|
| `--marea-control-sm` | 32px | `DERIVED_INTERNAL` | No — a compact control that is still above the AA floor |
| `--marea-control-md` | 40px | `DERIVED_INTERNAL` | No — default control height |
| `--marea-control-lg` | 48px | `INTERNAL_PROPOSED` | No — preferred wet/glove height |
| `--marea-touch-target-min` | **24px** | `NORMATIVE_WCAG_22_AA` | **Yes** — WCAG 2.2 SC 2.5.8 minimum |
| `--marea-wet-target-preferred` | 44px | `INTERNAL_DESIGN_GOAL` | **No** — internal preference, explicitly not the AA minimum |
| `--marea-tile-min` | 160px | `DERIVED_INTERNAL` | No — minimum instrument tile width |

**Which is normative:** the **24px** target from SC 2.5.8. The 44px value is an
internal design goal for wet/glove use and must never be described as a WCAG
requirement. Components set `min-inline-size: var(--marea-touch-target-min)` and
`min-block-size: var(--marea-control-md)` (40px), i.e. they exceed the floor by
default but do not claim 44px everywhere.

## 6. Grid and containers

| Token | Value | Status | Role |
|---|---:|---|---|
| `--marea-container-narrow` | 800px | `DERIVED_INTERNAL` | Prose/documentation column (matches the existing `.wrap-narrow`) |
| `--marea-container-default` | 1160px | `EXISTING_MEASURED_BASELINE` | Default content width (matches the existing `.wrap`) |
| `--marea-container-wide` | 1360px | `DERIVED_INTERNAL` | Wide data tables and catalogues |
| `--marea-grid-columns` | 12 | `DERIVED_INTERNAL` | Documented reference grid |
| `--marea-gutter-sm` | 16px | `DERIVED_INTERNAL` | Gutter below 768px |
| `--marea-gutter-md` | 24px | `DERIVED_INTERNAL` | Gutter 768–1159px |
| `--marea-gutter-lg` | 32px | `DERIVED_INTERNAL` | Gutter ≥1160px |
| `--marea-measure` | 68ch | `DERIVED_INTERNAL` | Maximum reading line length |

Components do **not** implement a 12-column layout. `marea-grid` is an intrinsic,
content-driven grid: `grid-template-columns: repeat(auto-fit, minmax(var(--marea-grid-min), 1fr))`
with `minItem` defaulting to `240px` and a runtime `--marea-grid-min` binding.
`marea-container` maps the three container tokens; `marea-stack` / `marea-inline`
bind `--marea-stack-gap` / `--marea-inline-gap` to spacing steps. Interpretation:
the 12-column value exists for documentation and for future layouts, not as an
enforced implementation — the components are deliberately intrinsic so they reflow
at 320px without a column system.

## 7. Shape, border, elevation

| Token | Value | Status |
|---|---|---|
| `--marea-radius-none` | 0 | `DERIVED_INTERNAL` |
| `--marea-radius-control` | 3px | `INTERNAL_PROPOSED` (MC-04 range 2–4px) |
| `--marea-radius-surface` | 6px | `INTERNAL_PROPOSED` (MC-04 range 4–8px) |
| `--marea-radius-pill` | 999px | `INTERNAL_PROPOSED` — status chips with text only |
| `--marea-border-width-hairline` | 1px | `DERIVED_INTERNAL` |
| `--marea-border-width-strong` | 2px | `DERIVED_INTERNAL` |
| `--marea-border-width-focus` | 3px | `NORMATIVE_WCAG_22_AA` (SC 2.4.7 perceivability) |
| `--marea-icon-stroke` | 2px | `INTERNAL_PROPOSED` |
| `--marea-chart-stroke` | 2px | `INTERNAL_PROPOSED` |
| `--marea-elevation-none` | `none` | `INTERNAL_PROPOSED` — default, flat |
| `--marea-elevation-overlay` | `0 18px 40px rgba(11, 37, 64, 0.18)` | `INTERNAL_PROPOSED` — overlays only, **never cards** |
| `--marea-opacity-full` | 1 | `DERIVED_INTERNAL` |
| `--marea-opacity-decorative` | 0.6 | `DERIVED_INTERNAL` — never essential text/status |
| `--marea-opacity-muted-icon` | 0.85 | `DERIVED_INTERNAL` — icons only |

Two elevation values, one of them `none`: cards and panels are flat by design, in
deliberate contrast to the current site's `0 10px 34px` card shadow. The overlay
shadow is the only decorative depth, and its base colour `rgb(11,37,64)` is
`#0b2540` — the same literal the public document uses for `theme-color`
(observation; the two are not linked in code, and MC-04 F-3 records that
`theme-color` is outside the token system).

## 8. Focus

| Token | Value |
|---|---|
| `--marea-focus-width` | 3px (`NORMATIVE_WCAG_22_AA`) |
| `--marea-focus-offset` | 2px (outward ring on flat surfaces) |
| `--marea-focus-inset` | −3px (inward ring inside filled controls) |
| `--marea-focus-style` | `solid` |
| `--marea-focus-ring` | per mode: `#0f5f8c` / `#0f5f8c` / `#0a4568` / `#8fd3f5` |
| `--marea-focus-ring-on-fill` | per mode: `#ffffff` / `#ffffff` / `#ffffff` / `#0d1b26` |

Contract in components: `:focus-visible` only (never bare `:focus`), outline never
removed, `outline-offset` from the token, filled controls switch to
`focus-ring-on-fill` with the inset. Check `MC17-15` recorded PASS: "11
keyboard-operable components expose :focus-visible with focus tokens".

## 9. Motion

| Token | Value | Role |
|---|---|---|
| `--marea-motion-state` | 120ms | Hover/press state change |
| `--marea-motion-enter` | 180ms | Disclosure expansion |
| `--marea-motion-exit` | 200ms | Disclosure collapse |
| `--marea-ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Calm easing; no bounce, no spring |
| `--marea-alert-max-hz` | 1 | Maximum optional alert pulse |

Rules: no essential information is carried by animation; a state is always also
text, shape and `aria` state. Components that transition declare
`@media (prefers-reduced-motion: reduce)` and remove it (for example
`marea-button` sets `transition: none`). Nothing relies on a timer to become
understandable.

## 10. Breakpoints

| Token | Value | Note |
|---|---:|---|
| `--marea-bp-320` | 320px | `NORMATIVE_WCAG_22_AA` (SC 1.4.10 reflow floor) |
| `--marea-bp-360` | 360px | small phone |
| `--marea-bp-390` | 390px | modern phone |
| `--marea-bp-480` | 480px | large phone / small landscape |
| `--marea-bp-768` | 768px | tablet portrait, two columns |
| `--marea-bp-900` | 900px | wide tablet, sidebar |
| `--marea-bp-1024` | 1024px | desktop, full navigation |
| `--marea-bp-1160` | 1160px | default container reached |
| `--marea-bp-1440` | 1440px | large desktop reference |

These are **informational custom properties**: media queries cannot consume
`var()`, so components author their breakpoints in inline styles. `layout-tokens.json`
records that limitation explicitly. The values are not the same set as the live
site's ad-hoc breakpoints (1100/1020/950/900/650/580/480 — see D03 §4); the design
system deliberately starts from the reflow floor and a 768/1024 progression.

## 11. Z-index and icon sizes

| Token | Value | Role |
|---|---:|---|
| `--marea-z-base` | 0 | Normal flow |
| `--marea-z-raised` | 10 | Instrument tile overlays |
| `--marea-z-sticky` | 20 | Sticky section chrome |
| `--marea-z-nav` | 30 | Responsive navigation panel |
| `--marea-z-overlay` | 40 | Overlay scrim / explanatory panel |
| `--marea-z-skip` | 50 | Skip link |

| Token | Value | Role |
|---|---:|---|
| `--marea-icon-sm` / `--marea-icon-size-sm` | 16px | Inline metadata icon |
| `--marea-icon-md` / `--marea-icon-size-md` | 20px | Inline control icon |
| `--marea-icon-lg` / `--marea-icon-size-lg` | 24px | Status / section icon |
| `--marea-icon-xl` / `--marea-icon-size-xl` | 32px | Tile icon |

Icon geometry itself (24×24 viewBox, 2px stroke, currentColor, round caps) lives
in `components/foundation/marea-icon-paths.ts`; see D07.

## 12. What is not established

- No pixel measurement of rendered type was performed in MC-17. Fluid sizes are
  CSS expressions; browser measurement of the 13 roles is `NOT_TESTED`.
- Visual accent clipping at 10px/72px is `NOT_TESTED` (MC-04 T-5).
- Font network transfer, CLS and FOIT/FOUT are `NOT_TESTED`; `npm run test:performance`
  is the measuring gate and it applies no thresholds.
- No performance budget is enforced for the design system; the catalogue is built
  with `optimization: false` in development and has Angular default budgets in
  production.
- The camelCase `bodySmall` reference described in §2 was observed and corrected
  during authoring; token resolution still needs a validator re-run to be certified.

Source references: `docs/marea/brand/TYPOGRAPHY-SYSTEM.md` §§2–8,
`docs/marea/design-system/data/{typography-roles,layout-tokens,token-source-map}.json`,
`src/app/marea-design-system/tokens/generated/marea-tokens.generated.css`,
`src/app/marea-design-system/components/foundation/*.ts`,
`src/app/marea-design-system/components/{structured,instrument}/*.ts`,
`scripts/check-marea-design-system.mjs` (checks MC17-06, MC17-15, MC17-16).
