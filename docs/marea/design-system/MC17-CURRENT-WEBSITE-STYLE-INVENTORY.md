# MC-17 — Current website style inventory (D03)

| Field | Value |
|---|---|
| Deliverable | D03 `MC17-CURRENT-WEBSITE-STYLE-INVENTORY.md` |
| Milestone | MC-17/36 — MAREA premium design system (internal only) |
| Date | 2026-11-03 |
| Owner | documentation-specialist (MC-17/36) |
| Status | Read-only inventory. `readOnly = true`, `websiteModified = false` |
| Baseline commit | `6d8287c8507038c4f90fd6e35471f78081ca4676` |
| Method | Direct reading of the committed source files listed in §1 |
| Scope | The **actual** pre-MAREA EMBARCARTE website styles, compared with the MC-17 design system where the difference matters |

This document describes what the public website is styled with today. It is
descriptive, not prescriptive: MC-17 did not change any of it. Every value below
is quoted from a file; where a statement is an inference rather than a
measurement, it is marked **interpretation**.

## 1. Files inventoried

| File | What it holds |
|---|---|
| `src/styles.scss` (400 lines) | The single global stylesheet: `:root` tokens, layout primitives, every component pattern, 7 media queries |
| `src/app/layout/header/header.ts` | Sticky header markup; inline SVG icons; mobile menu toggle |
| `src/app/layout/footer/footer.ts` | Footer markup and column structure |
| `src/app/layout/brand.ts`, `language-switcher/` | Brand mark rendering, locale switch control |
| `src/app/features/home/**`, `features/shop/**`, `features/legal/**` | Templates only — **no component `styles` block exists in any of them** (verified by scan) |
| `src/index.html` | `theme-color` `#0b2540`, `color-scheme` `light` |
| `src/app/core/seo.service.ts`, `src/server.ts` | No style tokens; recorded here because they are part of the watched baseline |

Measured fact: no feature or layout component declares a `styles:` block. All
visual styling therefore lives in one global file, which is why the design
system had to introduce a scoped token layer to avoid touching it.

## 2. Reference tokens in `:root` (measured, `src/styles.scss` lines 5–21)

| Custom property | Value | Role as used |
|---|---|---|
| `--navy` | `#17365d` | Headings, strong text, icon ink |
| `--navy-2` | `#24517c` | Secondary dark |
| `--sea` | `#1776ad` | Accent text, eyebrow, links |
| `--sea-strong` | `#176ca6` | Link/CTA text, focus-adjacent ink |
| `--sea-button` | `#1b6f9f` | Filled button and cart-count background |
| `--mist` | `#f2f9fd` | Table head background, tab strip, hover fill |
| `--sky` | `#eaf7ff` | `nav-cta`, badge, hero background, active nav |
| `--paper` | `#fff` | Page background |
| `--ink` | `#17365d` | Body text |
| `--muted` | `#57708a` | Secondary/meta text |
| `--line` | `#e1edf5` | Dividers, card borders, table rules |
| `--danger` | `#b4423a` | Error/destructive text |
| `--ok` | `#27775c` | Success text |
| `--display` | `'Manrope Variable', 'Manrope', system-ui, sans-serif` | Display/heading family |
| `--body` | `'DM Sans Variable', 'DM Sans', system-ui, sans-serif` | Body family |

There is no spacing scale, no radius scale, no elevation scale, no motion scale
and no z-index scale. Measured counts in the same file: **82 hex colour
literals**, **44 `rgba()` calls**, **30 `border-radius` declarations** with **9
distinct values** (`50%`, `999px`, `22px`, `18px`, `16px`, `12px`, `10px`,
`7px`, `38% 22% 35% 25%`), **7 `clamp()`** uses. Interpretation: the visual
system is coherent by convention but not machine-enforced.

## 3. Typography in use

| Fact | Measured value | Source |
|---|---|---|
| Fonts are self-hosted | `@use '@fontsource-variable/manrope'` and `@use '@fontsource-variable/dm-sans'` as the first two lines of the stylesheet; `src/index.html` has no font `<link>` | `src/styles.scss` 1–2; `TYPOGRAPHY-SYSTEM.md` T-4 |
| Body | `font-family: var(--body)`, `line-height: 1.6`, colour `var(--ink)`, `-webkit-font-smoothing: antialiased` | line 25 |
| Headings | `h1,h2,h3 { color: var(--navy) }`; display classes set `font-family: var(--display)` | lines 30, 97 |
| Display class | `.display` `font-weight: 500`, `letter-spacing: -2.4px`, `line-height: 1.07` | line 97 |
| Fluid headings | `.h-xl clamp(46px, 5.4vw, 72px)`, `.h-lg clamp(36px, 4.4vw, 56px)`, `.h-md clamp(30px, 3.4vw, 42px)` | lines 99–101 |
| Home hero `h1` | `clamp(42px, 4vw, 58px)`, `-2px` tracking, weight 700 | line 374 |
| Body copy sizes | hero/page lead 16px/1.8; prose 15px/1.85; card copy 13px/1.8; footer 13px; micro-labels 9–11px | lines 122, 135, 171, 197, 289 |
| Small caps labels | `.eyebrow` 10px, `letter-spacing: 2px`, uppercase; `.card-number` 9px/1.7; `.footer-title` 10px/1.8; `table.data th` 10px/1.2 | lines 93, 169, 244, 288 |
| Numeric figures | `.price` Manrope 700 20px; `.stat b` Manrope 28px; no `tabular-nums` anywhere in the file | lines 178, 269 |

Interpretation: display type is Manrope, prose is DM Sans, and small uppercase
labels are used heavily. The site has **no tabular-figure treatment**, so live or
columnar numbers are rendered with proportional digits — the gap MC-04 measured
and MC-17 closes with the Manrope numeric role.

## 4. Layout and grid

| Pattern | Measured value | Source |
|---|---|---|
| Default container | `.wrap { width: min(1160px, calc(100% - 48px)); margin-inline: auto }` | line 32 |
| Narrow container | `.wrap-narrow { min(800px, calc(100% - 48px)) }` | line 33 |
| Header height | `76px` (72px below 1100px) | lines 55, 310 |
| Scroll padding | `scroll-padding-top: 88px`, smooth scrolling | line 24 |
| Section rhythm | `.section-pad { padding: 112px 0 }`, `.section-tight { 72px }`, mobile 80px / 67px | lines 140, 326, 354 |
| Two-column intro | `grid-template-columns: 0.8fr 1.2fr; gap: 8%` | line 143 |
| Card grid | `repeat(3, 1fr)` with `gap: 18px`, two-up variant, mobile 1fr | lines 157–158, 356 |
| Detail layout | `1.35fr 1fr` with sticky aside `top: 100px` | lines 207–208 |
| Dashboard | `220px 1fr` with sticky nav | line 256 |
| Stats | `repeat(auto-fit, minmax(170px, 1fr))` | line 267 |
| Footer | `1.4fr repeat(3, 1fr)`, `gap: 32px` | line 286 |
| Home services | `repeat(3, 1fr)`; image/body split `38% 1fr` | lines 376–377 |

Breakpoints actually used, in source order: **1100px, 1020px, 950px, 900px,
650px, 580px, 480px** (7 `@media` blocks). Each breakpoint's purpose:

| Breakpoint | What changes |
|---|---|
| 1100px | Header to 72px; nav collapses to a toggle panel; `.nav-cta` becomes block |
| 1020px | Nav link gap 28px → 20px |
| 950px | Home services stack; home products grid to `1fr 2fr`; products note hidden |
| 900px | Hero fixed height; section padding 80px; intro/contact/detail to one column; footer 2 columns; dashboard one column with horizontal nav |
| 650px | Home hero to 510px with bottom-anchored image; home service split `110px 1fr`; product grid one column |
| 580px | Containers to `100% - 32px`; header padding 16px; service grid one column; form rows one column; `.kv` one column; panel radius 18px |
| 480px | Header padding 12px; brand mark 36px; icon links 36px |

## 5. Component patterns as built today

| Pattern | Implementation | Notable measured detail |
|---|---|---|
| Button | `.button` + `-light`, `-dark`, `-outline`, `-ghost`, `-small`, `-block` | radius `999px`, padding `15px 21px`, 12px/700; hover `translateY(-2px)`; `:disabled { opacity: .6; cursor: progress }` |
| Card | `.service-card` | radius `22px`, border `rgba(171,211,237,.45)`, transition on transform/shadow; **a later rule resets `box-shadow: none`** (line 398) |
| Panel | `.panel` | radius `22px`, `1px solid var(--line)`, padding 28px, shadow `0 10px 34px rgba(42,104,150,.045)` |
| Badge | `.badge` + `warn/ok/off/danger` | 10px/700 uppercase, `letter-spacing: 1px`, radius 999px; `warn` `#fff4dc/#8a5a00`, `ok` `#e2f5ee/var(--ok)`, `off` `#f1f1f1/#555`, `danger` `#fbe9e7/var(--danger)` |
| Table | `.table-wrap` + `table.data` | wrapper radius 16px with horizontal scroll; `th` 10px uppercase on `var(--mist)`; cells 14px/16px, `border-top: 1px solid var(--line)` |
| Form | `.form` + `.form-row`, `.check`, `.hp`, `.form-hint` | inputs radius 12px, bg `#fbfdff`, 13px, padding 15px; focus `border-color: #65bce9` + `box-shadow: 0 0 0 4px rgba(74,174,228,.12)`; invalid border `#e2a59f` |
| Tabs | `.tabs` + `.on` | pill strip on `var(--mist)`, active pill white with small shadow |
| Quantity stepper | `.qty` | 32×32px buttons inside a pill |
| Empty state | `.empty` | centred, 56px/24px padding, `var(--muted)` |
| Steps | `.steps` | CSS counters, `decimal-leading-zero` in Manrope 700 |
| Notice | `.notice` | `border-left: 4px solid #65bce9` |

## 6. Header and footer

Header (`header.ts` + stylesheet lines 54–73): sticky, `z-index: 20`,
`backdrop-filter: blur(16px)`, background `rgba(255,255,255,.94)`, bottom border
`rgba(107,174,218,.16)`. Navigation links 13px/600 `#294a6c`, active/hover
`var(--sea)`. `nav-cta` is a pill (`var(--sky)` on `#c9eaff` border). Icon links
are 40×40 circles with 21×21 inline SVG. The cart count is an 18px pill on
`var(--sea-button)`. The mobile toggle is a two-bar button (`aria-expanded`,
`aria-controls="main-nav"`).

Footer (`footer.ts` + lines 285–292): background `#f1f9fe`, top border `#e0f0fa`,
four columns, 10px uppercase column titles in `var(--sea)`, bottom bar with
copyright, developer credit, locale switch and domain, 11px `#5d7489`.

**F-1, unchanged.** The only focus indicator in the file is line 29:

```css
:focus-visible { outline: 3px solid #8fd2f5; outline-offset: 2px; }
```

`#8fd2f5` on `#ffffff` measures **1.6529:1**, on `#f2f9fd` **1.5540:1** and on
`#eaf7ff` **1.5149:1** (MC-04 `COLOUR-SYSTEM.md` §7). That is below the WCAG 2.2
SC 1.4.11 floor of 3:1. **This was not changed on the live site by MC-17**, and
F-1 stays `OPEN`. The design system ships the compliant MC-04 proposal
`#0f5f8c` inside its own scoped token layer only.

## 7. Other measured facts

| Fact | Value |
|---|---|
| `prefers-reduced-motion` handling | **none** — 0 occurrences in `src/styles.scss`, while the file uses CSS transitions (0.2s–3s values) and a `translateY(-2px)` hover |
| `prefers-color-scheme` handling | **none** — the site is light-only and `src/index.html` declares `<meta name="color-scheme" content="light">` |
| `theme-color` | `#0b2540` (a literal, not a token) — MC-04 finding F-3 records that it is outside the token system |
| Skip link | `.skip-link` off-screen at `left: -999px`, visible at `:focus`; `z-index: 100` |
| Visually hidden utility | `.sr-only` with `clip: rect(0 0 0 0)` |
| Z-index values | `20` header, `100` skip link, `1`/`2` hero layers, `1` stretched-link overlay — no scale |
| Border radius scale | none; 9 distinct values, `999px` used for seven different controls |
| Shadow scale | none; five distinct `box-shadow` expressions plus hover copies |

## 8. Differences that motivated MC-17

| Dimension | Current site | MC-17 design system |
|---|---|---|
| Token delivery | `:root` literals, global cascade | scoped custom properties on `<marea-theme>`, no `:root` |
| Colour states | badge classes only | 33 semantic roles × 4 modes with declared contrast pairs |
| Typography | classes and literal sizes | 13 roles as tokens, Manrope `tabular-nums` for numerics |
| Spacing | ad-hoc per rule | 12-step scale 4→128px |
| Focus | one global `#8fd2f5` ring (F-1 open) | 3px ring, `2px` offset / `-3px` inset, 4 measured values |
| Motion | CSS transitions, no reduced-motion guard | 120/180/200ms tokens; `@media (prefers-reduced-motion: reduce)` in components |
| Modes | light only | 4 modes, instrument modes scoped to the catalogue |
| Components | global CSS classes | 49 typed Angular components with declared state contracts |

## 9. Measured facts vs interpretation

**Measured (quoted from files):** every colour literal, size, radius, shadow,
breakpoint and class name in §2–§7; the absence of component style blocks, of
`prefers-reduced-motion`, of `tabular-nums`, and of any token scale; the F-1
ratios (recomputed by MC-04's script from these exact values).

**Interpretation (not measured):** that the ad-hoc scales are a maintenance risk;
that the missing reduced-motion guard is a WCAG 2.2 SC 2.3.3 concern in practice;
that the single global stylesheet made a scoped design system necessary. These are
reasoned readings of the evidence, not test results.

**Not measured at all by this inventory:** rendered layout in a browser, computed
styles, effective contrast on the rendered page, performance, accessibility-tree
behaviour, or behaviour under zoom. No browser, Lighthouse or axe run was
performed for this document.

## 10. Non-regression

`docs/marea/design-system/data/legacy-ui-baseline.json` records SHA-256 for 35
watched files including `src/styles.scss` (`06cdf6900e…`), `src/index.html`
(`8dc370d2…`), `src/app/app.routes.ts` (`06dedea1…`) and the 15 public files, all
taken at `6d8287c8507038c4f90fd6e35471f78081ca4676`. The recorded validator run
re-hashes them and reports check `MC17-28` PASS ("35 watched files unchanged")
and `MC17-30` PASS for robots, manifest, OG image, favicon and `index.html`.

If any of those hashes change, this inventory is out of date and the baseline must
be regenerated with `node scripts/build-marea-design-system-baseline.mjs`; the
change itself is then a public-site change requiring authorisation, which MC-17
does not have.
