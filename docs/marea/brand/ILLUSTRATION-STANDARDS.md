# D-10 — MAREA illustration standards (vector diagrams)

| Field | Value |
| --- | --- |
| Document ID | `MC-04 / D-10 ILLUSTRATION-STANDARDS` |
| Milestone | MC-04 — MAREA visual identity system (internal, provisional) |
| Author | InstrumentIcons (AI agent) |
| Status | `PRODUCED` — standards + three authored diagrams exist; diagram engineering review **PENDING** |
| Classification | Applies to `DIAGRAM` assets (brief §9.3, §10.3–§10.4) |
| Brand status | MAREA is a **proposed** brand: `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`; `PUBLICATION = BLOCKED` |
| Authority | `MC-04-VISUAL-IDENTITY-BRIEF.md` §6.1–§6.2, §7.7, §9.3, §9.5, §10.3–§10.6, §11.2; `MAREA-COMMERCIAL-ARCHITECTURE.md` §7, §10; `OPEN-MARINE-CAPABILITY-INVENTORY.md` C-06/C-09, G1–G10; `HARDWARE-COMPLIANCE-MATRIX.md` §3 |
| Diagrams | `docs/marea/brand/assets/diagrams/marea-ais-receive-only.svg`, `marea-pilot-supervised-boundary.svg`, `marea-ecosystem-overview.svg` |
| Created | 2026-10-30 |

## 0. Truth statement

Every diagram governed by this document is an **authored vector illustration**, not a photograph, not a
render, not a certified drawing and not a measurement.

- Artwork is authored in SVG by us. No AI image generation, no third-party diagram, no raster base, no
  chart-symbology reproduction.
- Diagrams are classified `DIAGRAM` and are **illustrative until an engineering review references them**
  (brief §10.4). `ENGINEERING_REVIEW = PENDING` for all three current diagrams.
- No diagram implies certification, availability, compatibility, performance, a real installation,
  collision avoidance, autonomous steering or a safety guarantee.
- Professional originality/clearance review of the visual language is **PENDING** (external).
- Hardware validation (screen legibility, salt spray, sunlight, glove use) is **BLOCKED** — no hardware
  exists. Print proofs are **BLOCKED** — no print authorization.

## 1. Purpose and scope

**Purpose.** A single grammar for technical vector diagrams so they read as one MAREA system across
product pages, installer documentation, support material and internal review, and so an engineer can
see *what is claimed and what is not*.

**In scope.** System/architecture diagrams, boundary diagrams, receive-only chain diagrams, supervised
control diagrams, and the conventions for future product line illustrations authored by us.

**Out of scope.** Packaging dielines (AssetProduction), brand lockups (IdentityVector), chart/ENC
rendering, photography/CGI (BLOCKED), anything requiring a real measurement.

## 2. Diagram grammar

One diagram = **one idea** (brief §9.3). The current set uses a fixed anatomy:

```
┌─────────────────────────────────────────────────────────────┐
│ TITLE (ES) + subtitle (EN) + status chip + D-11 ID          │  header, never brand marketing
├─────────────────────────────────────────────────────────────┤
│ BODY — boxes / bands / symbols / real text labels (ES + EN)  │  the relationship being explained
│   boundaries: dashed red = safety-critical; dashed grey =    │
│   network/pending; solid = local; crossed arrow = prohibited │
├─────────────────────────────────────────────────────────────┤
│ LEGEND + "what this does NOT claim" + unverified-connection  │  honesty zone, inside the artwork
├─────────────────────────────────────────────────────────────┤
│ MANDATORY DISCLAIMERS (verbatim ES + EN) + provenance line   │  brief §7.7; never paraphrased
└─────────────────────────────────────────────────────────────┘
```

Rules:

1. **Title in Spanish first, English second** (programme working language ES; EN first class). Body
   labels are bilingual; a label may be ES/EN on consecutive lines, never only one language where the
   meaning is safety-relevant.
2. **Zone model:** header / body / honesty / disclaimers. Alerts and safety statements never sit on top
   of the relationship being drawn.
3. **Original symbols only.** Device, vessel, antenna, sensor, E-stop, watchdog and boundary symbols are
   authored by us (same grammar as the icon set). No official chart symbology (IHO S-52/ENC), no
   certification seals, no compass roses, no manufacturer iconography.
4. **No fake UI text** inside the figure (brief §9.3): no invented interface values, no fake screenshots.
   A diagram shows relationships, not a pretend working display.
5. **One scale per figure; not to scale unless true.** State `NOT TO SCALE / NO A ESCALA` when the
   drawing suggests physical dimensions it does not measure.
6. **Consistent within a figure set:** same box radius (6), same stroke system (§3), same label style,
   same legend vocabulary across all three D-11 diagrams.
7. **No transparency over data, no gradients, no drop shadows, no photographic effects.**

## 3. Line weights, strokes and arrows

### 3.1 Screen (SVG reference width 1200 units)

| Element | Width | Notes |
| --- | --- | --- |
| Primary outline (boxes, boundaries, vessels, main symbols) | **2 px** | box radius 6 |
| Internal detail / secondary connectors | **1.25 px** | sub-boxes use 1.5 |
| Dimension / legend rules | **1 px** | never below 1 px |
| Dashed network or pending rule | 2 px, `stroke-dasharray="6 4"` | grey `#5f6f7d` |
| Dashed safety boundary | 2.5 px, `stroke-dasharray="8 6"` | critical `#a32b22` |
| Prohibited path | 2 px dashed + crossed-circle barrier | never only a red line |
| Arrowhead | 9–10 units long, 10 units wide | explicit filled triangle; direction carries meaning |

**Reconciliation with the brief (honest deviation).** Brief §9.3 *proposes* outline 1.5 px, internal 1 px,
dimension 0.75 px on screen. At the 320 px card reduction those weights disappeared in the render
check; this system therefore uses **2 / 1.25 / 1 px** at the 1200-unit reference width. Print weights
follow the brief's millimetre values exactly (§7). Reviewers should confirm this one decision.

### 3.2 Arrows and connectors

- **Direction = meaning.** Receive-only chains point inward/forward only; there is no outward transmit
  arrow anywhere in an AIS diagram. A prohibited direction is drawn as a dashed arrow **plus** a crossed
  barrier, never a red line alone.
- **Solid line** = local, wired, present relationship.
- **Dashed line** = network relationship or pending/planned/unverified connection.
- **Red dashed** = safety-critical boundary, not a "danger" decoration.
- **Double-headed arrows** only where authority is genuinely shared *and* the label says who may act
  (e.g. supervised command/feedback in PILOT).
- An arrow **never implies compatibility**. Where a connection is not engineering-verified it is labelled
  `no verificado / unverified` or `ilustrativo / illustrative`.
- Connectors do not cross boxes; route around them with right-angle polylines.

## 4. Label conventions and font dependency

### 4.1 Labels

- **Real SVG `<text>` only.** Labels are never converted to outlines: they must remain selectable,
  searchable, translatable, screen-reader reachable and diff-able. (Wordmarks are the only outlined
  text in the identity system; diagrams are not wordmarks.)
- Label stack per node: **ES bold first line**, EN secondary line (`font-size` 12–13 / 9–10.5). Long
  descriptions wrap to short lines rather than shrinking below 9 px equivalent.
- **Units are always shown** on any numeric-looking label; no number without a unit or an explicit
  "illustrative" qualifier.
- Line length ≤ ~80 characters (brief typography rule) inside a box; if longer, split.
- Short uppercase headings are allowed for **diagram zone labels** (e.g. `DOMINIO DE SEGURIDAD`) because
  they function as structural signposts; body copy is sentence case.
- Avoid "safe", "clear", "collision-free", "approved", "certified", "EDCIS-class" as labels (brief §7.7).
- Every diagram has a `<title>` and `<desc>` carrying the ES/EN summary; labels are duplicated as
  accessible alternative when the diagram is used as content (brief §10.6).

### 4.2 Font stack and dependency (declared explicitly)

Diagrams use:

```
font-family="Manrope, 'Segoe UI', Arial, sans-serif"
```

- **Intended typeface:** Manrope Variable (`@fontsource-variable/manrope@5.3.0`, SIL Open Font License
  OFL-1.1) as proposed by the typography/token work for display and instrument numerics. The token file
  `marea-instrument-tokens.proposed.json` lists it for instrument numerics; licence verification is
  recorded by TypeColour in `TYPOGRAPHY-SYSTEM.md`.
- **Dependency:** the standalone SVG does **not** embed the font. On a machine without Manrope, the
  viewer falls back to installed **Segoe UI** then **Arial**, then the generic `sans-serif`. This is a
  rendering dependency, not a brand claim. Layout was authored and checked with the fallback present.
- **No external font references** are allowed in SVG hygiene (brief §10.5): no `@font-face`, no
  `href` to a font file, no `@import`. The diagram must render acceptably with fallback fonts.
- **Print/PDF:** the render pipeline (AssetProduction, `scripts/render-assets.mjs`) must **embed the
  fonts** in any PDF it produces and verify the embedding. Until that PDF exists, font embedding is
  `NOT_TESTED`; do not claim it.
- **Real `<text>` is required for translation and accessibility.** A future localisation may swap the
  text without touching geometry.

## 5. Colour roles

Diagrams reference the **role names** from the instrument token system (D-08), never colour names.
The values below are the **instrument-day** mode from
`docs/marea/brand/tokens/marea-instrument-tokens.proposed.json` (PROPOSED; not adopted, not implemented).

| Role | Day value | Diagram use |
| --- | --- | --- |
| `canvas` | `#f2f9fd` / panel white `#ffffff` | figure background |
| `textPrimary` | `#17365d` | titles, box titles, primary labels |
| `textSecondary` | `#4a6579` | EN lines, secondary labels |
| `textMeta` | `#52697f` | provenance/legend |
| `dataPrimary` | `#17365d` | vessel/own markers |
| `chartGrid` | `#748d9f` | non-essential rules only |
| `stateCritical` | `#a32b22` | safety boundary, E-stop, no-transmit, prohibited path |
| `stateWarning` | `#8a5a00` | design-requirement / pending / unverified |
| `stateSafe` | `#1f5f49` | "normal" signal states only (never a vessel guarantee) |
| `stateStale` | `#55646f` | isolation/offline/degraded |
| `stateInfo` | `#17365d` | neutral information |
| `action` | `#176ca6` | interactive demo controls in specimen pages only |
| `focusRing` | `#0f5f8c` | focus indicator in specimen pages |

Rules:

- **Never colour-only.** Every coloured element also has shape, pattern, label or position. Safety
  boundaries are dashed *and* red *and* labelled; design requirements are amber *and* dashed *and*
  tagged `REQ`.
- **No gradients, no glow, no hue decoration.** Flat fills only; the only fills are panel backgrounds.
- **Greyscale-safe:** the three diagrams were authored so boundaries and prohibited paths are still
  distinguishable in greyscale (dash pattern + label + barrier shape). A greyscale/CVD screenshot set is
  `NOT_TESTED` (evidence to be produced by the independent review, brief §5.10).
- **Contrast:** labels use text roles ≥ 4.5:1 on their surface (the token file records measured pairs;
  diagrams use its day values). Non-text marks that carry meaning are ≥ 3:1 (tokens `chartGrid` and
  `state*` values are measured for those pairs by TypeColour).
- **Night mode** is a software mode, not a diagram mode: printed/static diagrams use the day palette.
  If a night diagram is ever produced it uses the night role values and no `#000000`/`#ffffff`.

## 6. Safety-critical emphasis

Required for PILOT and any diagram involving control authority:

1. **Safety-critical domain** is enclosed in a red dashed boundary labelled in ES and EN.
2. **Physical E-stop** is drawn as a hardware control with an explicit power-cut label; software E-stop
   is never drawn as equivalent to the physical one.
3. **Watchdog, power relay/contactor, rudder feedback, manual-takeover detection, control-plane auth**
   are marked **`REQUISITO DE DISEÑO / DESIGN REQUIREMENT`** in amber dashed when not implemented. The
   current PILOT diagram marks all of these, citing `HARDWARE-COMPLIANCE-MATRIX.md`
   F-A20/F-A21/F-A23/F-A24/F-A25.
4. **Human authority** is explicit: continuous watchkeeping, manual takeover at all times, final
   authority is human. No diagram may suggest autonomous or unattended remote control.
5. **Isolation** from web/commerce/cloud is drawn as a boundary and labelled "no steering authority /
   no write path".
6. **No certification cue**: no seals, shields, checkmarks, standards logos, `CE`, IP-rating, NMEA, or
   ECDIS-equivalence.
7. **Mandatory disclaimers** appear verbatim (ES + EN) inside the artwork on any surface where AIS,
   PILOT, navigation or weather is shown (brief §7.7). The diagram never adds a claim that a disclaimer
   then has to negate.

## 7. Print variant guidance

Printing/procurement is **BLOCKED** (no authorization, no BOM, no proof). This section defines what a
future authorized print render must do; it is not evidence that one exists.

| Rule | Value |
| --- | --- |
| Format | SVG master → PDF A4 (landscape) for the three D-11 diagrams; A3 for large installer sheets |
| Line weights | outline **0.35 mm**, internal **0.25 mm**, dimension **0.18 mm** (brief §9.3), minimum printable gap 0.3 mm |
| Body type | minimum **7 pt**; **9 pt** for critical labels (brief §9.1) |
| Colour | one ink + one spot colour ideal; the diagrams are designed to survive **mono** (ink-only) printing: boundaries remain dashed + labelled |
| Background | paper white; no dark fills except the single navy authority panel (PILOT), which must print as a solid tint or be reversed to outline if ink coverage is a problem |
| Fonts | fonts must be **embedded** in the PDF; real text preserved for accessibility; no outlined labels |
| Scale | `NOT TO SCALE / NO A ESCALA` unless engineering dimensions are supplied |
| Proof | 1:1 print proof + ink contrast measurement required before use; currently `BLOCKED` |
| Accessibility | print carries the ES/EN disclaimers and a QR/URL fallback where a digital version exists (future) |

## 8. Illustrative labelling and provenance

Every diagram must answer three questions in one glance (brief §9.5): **what it is**, **what it is based
on**, **what it is not**.

1. Visible `ILUSTRATIVO / ILLUSTRATIVE` chip in the artwork, plus the status (`no certificado / not
   certified`, `revisión de ingeniería pendiente / engineering review pending`, `sin datos en vivo /
   no live data`).
2. `D-11 · MR-DIA-00x · v1` identifier in the artwork and a matching manifest entry (AssetProduction
   registers real SHA-256/bytes; this document does not invent hashes).
3. Source line: `brief §7.7`, `MAREA-COMMERCIAL-ARCHITECTURE §10`, `HARDWARE-COMPLIANCE-MATRIX §3`
   as applicable. No source, no claim.
4. Alt text ES/EN (≤ 125 chars) on the page that embeds the diagram; full explanation in real text next
   to the figure, not inside pixels (brief §11.2 1.4.5).
5. If the diagram is shown at 320 px, the page must provide the readable explanation; the SVG is not the
   only carrier of the information.

## 9. Diagram inventory (D-11)

| ID | File | Content | Honesty markers | Status |
| --- | --- | --- | --- | --- |
| MR-DIA-001 | `marea-ais-receive-only.svg` | antenna/splitter → VHF receiver → decoder (separate process) → HUB/NAV → AIS analysis → presentation/alerts; no TX path; no shore uplink | no-transmit barrier + label; receive-only; not collision-avoidance; not a transponder; not all vessels transmit; stale/degraded states; verbatim AIS + navigation disclaimers ES/EN | `PRODUCED`; engineering review PENDING |
| MR-DIA-002 | `marea-pilot-supervised-boundary.svg` | human operator, physical E-stop, local control head, motor controller, rudder/actuator, sensor dependencies, hardware watchdog, missing-hardware list, presentation domain, commerce domain isolation, human-authority panel | safety boundary; `REQ` markers for missing hardware (F-A20/F-A21/F-A23/F-A24/F-A25); supervised-only; no autonomous/remote; verbatim PILOT + navigation disclaimers ES/EN | `PRODUCED`; engineering + safety review PENDING |
| MR-DIA-003 | `marea-ecosystem-overview.svg` | EMBARCARTE commercial platform, WATCH/FLEET services, optional connectivity, MAREA software (NAV/DISPLAY/AIS analysis/WEATHER), onboard runtime (HUB), devices+sensors, separate PILOT safety domain, isolation gate | outbound-only/no inbound/no steering authority; unverified connections; products CONCEPT/DEFINED not for sale; no ECDIS; no distress service; no implied compatibility; verbatim AIS/PILOT/navigation/weather disclaimers ES/EN | `PRODUCED`; engineering review PENDING |

Engineering sources: `MAREA-COMMERCIAL-ARCHITECTURE.md` §10.1–10.2 (AIS pipeline), §7 and §11
(WATCH/FLEET, layer isolation, no write path), `OPEN-MARINE-CAPABILITY-INVENTORY.md` C-06/C-09/G1–G10,
`HARDWARE-COMPLIANCE-MATRIX.md` §3.2/§3.5 (PILOT missing hardware). Diagrams do not assert capability
beyond those sources.

## 10. QA and evidence (actually run)

- All three SVGs loaded in Playwright 1.64 Chromium from `file://` with no page/console errors; rendered
  content bounds equal their `viewBox` (1200×880, 1200×1020, 1200×1000) — no clipped or overflowing text
  after correction.
- Hygiene: `viewBox` present; no `<script>`; no external `href`/`url()`; no `<image>`; no filters; no
  `@import`; no embedded fonts. Text is real `<text>`.
- Byte sizes: 17.0 kB (AIS), 21.2 kB (PILOT), 22.1 kB (ecosystem). The brief sets no diagram byte budget (its budgets are for lockups/marks); these are kept under a 25 kB internal working ceiling. No rasterisation inside the SVG.
- **NOT_TESTED / PENDING:** independent engineering review; safety review; compatibility review;
  print/PDF render and font-embedding verification; 1:1 print proof; greyscale/CVD screenshots; marine
  display/sunlight/night hardware test; professional originality review.

## 11. Change control

- A diagram change requires re-render checks (§10) and a version note (`v1` → `v2`) in the artwork.
- Changing a claim, boundary, missing-hardware marker or disclaimer is a **content change** and requires
  a new engineering review reference; a diagram with an unreviewed content change is not publishable.
- Diagrams must never be edited by adding pixels or by re-drawing in a raster editor; the SVG master is
  the source of truth.
- No status in this document may be `APPROVED_FOR_USE`, `CLEARED` or `CERTIFIED`; the programme
  vocabulary is `PRODUCED`, `INTERNALLY_REVIEWED`, `PREFERRED_PROVISIONAL`, `LEGAL_REVIEW_PENDING`,
  `PUBLICATION_BLOCKED` (execution plan §2.2).
