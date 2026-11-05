# D-09 — MAREA iconography system

| Field | Value |
| --- | --- |
| Document ID | `MC-04 / D-09 ICONOGRAPHY-SYSTEM` |
| Milestone | MC-04 — MAREA visual identity system (internal, provisional) |
| Author | InstrumentIcons (AI agent) |
| Status | `PRODUCED` — 57 SVG masters + catalogue + reduction proof exist; structural self-checks run |
| Legal status | `LEGAL_REVIEW_PENDING` · `ORIGINALITY_PROFESSIONAL_CHECK = PENDING` |
| Brand status | MAREA is a **proposed** brand: `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`; `PUBLICATION = BLOCKED` |
| Authority | `MC-04-VISUAL-IDENTITY-BRIEF.md` §6.2, §7.8–§7.9, §9.2, §9.5, §10.5, §11.2; `MC-04-EXECUTION-PLAN.md` §0, §1, §2 |
| Masters | `docs/marea/brand/assets/icons/ui/*.svg` (57 files) |
| Specimens | `docs/marea/brand/assets/icons/ui/index.html` (catalogue), `docs/marea/brand/assets/icons/ui/reduction-proof.html` |
| Created | 2026-10-30 |
| Scope | Internal design system for future MC-06+ implementation. Not implemented in `src/`, not published, not adopted |

## 0. Truth statement

This document describes an **authored vector icon set** produced for an internal, proposed brand.
It is **not** an approved icon library, **not** a registered trade mark, **not** a certification, and
**not** a claim that MAREA hardware or software exists.

- The artwork was authored in SVG by the MC-04 InstrumentIcons agent. No third-party icon
  library was copied, traced, downloaded or bundled. No AI image generation was used.
- **The legal originality of the set has not been professionally reviewed.** A professional
  resemblance/clearance opinion is **PENDING** (programme constraint, cannot be closed by an agent).
  Generic symbols (gear, cloud, battery, arrow) are unprotectable in themselves; the *system* as a
  whole needs the professional check before any adoption.
- The icons use a separate role vocabulary from the MAREA brand mark. The final mark did not
  exist when this set was authored, so a direct visual comparison is **PENDING** and must be recorded
  by the reviewer once the identity asset lands.
- No icon implies certification, approval, availability, performance or a certified installation.
- No official chart symbology (IHO S-52 / ENC), no ECDIS cue, no certification seal, no transponder
  icon, no autonomous-steering icon.

## 1. Purpose and non-goals

**Purpose.** Give MAREA a small, consistent, semantically explicit icon vocabulary for marine
instrumentation and its adjacent surfaces (software, installer material, documentation specimens), so a
skipper, installer and screen reader user read the same meaning from the same shape.

**Non-goals.** This is not a general-purpose web icon library; not a chart-symbol set; not UI
implementation (MC-06+); not packaging artwork (AssetProduction); not a brand mark or lockup.

The set is authored to the brief's split between *marine software*, *corporate website* and
*installer material* (§6.1–§6.2): one grammar, mode-appropriate weight and colour, never a second
identity.

## 2. Inventory

57 files on the **24×24 grid**, grouped by domain. File names are the stable identifiers; meanings are
the semantic labels used in ES/EN UI copy. The catalogue page renders every icon with both labels.

### 2.1 Navigation and course (6)

| File | ES label | EN label | Semantic rule |
| --- | --- | --- | --- |
| `nav-heading` | Rumbo | Heading | Heading index; a north tick and a needle. Not a compass rose. |
| `nav-bearing` | Demora | Bearing | Radial bearing from own position. Not a heading. |
| `nav-waypoint` | Punto de ruta | Waypoint | Flag marker; route destination. |
| `nav-north` | Norte | North | North reference arrow. Never a chart north rose. |
| `scale` | Escala | Scale | Scale bar; always paired with a real unit label. |
| `speed` | Velocidad | Speed | Motion arrow; no dial, needle or instrument scale. |

### 2.2 Position and GPS (3)

| File | ES label | EN label | Semantic rule |
| --- | --- | --- | --- |
| `gps-fix` | Posición GPS fijada | GPS fix | Fix acquired; does not imply accuracy. |
| `gps-no-fix` | Sin posición GPS | No GPS fix | No fix; never rendered as a zero. |
| `position-marker` | Posición propia | Own position marker | Own vessel; solid marker as required by §5.9. |

### 2.3 Wind (4)

| File | ES label | EN label | Semantic rule |
| --- | --- | --- | --- |
| `wind-angle` | Ángulo de viento | Wind angle | Relative angle with reference line and arc. |
| `wind-true` | Viento real (T) | True wind (T) | One feather; **T/A by shape + label, never colour**. |
| `wind-apparent` | Viento aparente (A) | Apparent wind (A) | Two feathers; same non-colour rule. |
| `wind-sensor` | Sensor de palo | Masthead sensor | Masthead sensor/vane, not a wind rose. |

### 2.4 Depth (1)

| File | ES label | EN label | Semantic rule |
| --- | --- | --- | --- |
| `depth` | Sonda | Depth | Waterline + seabed + downward measure; no gauge. |

### 2.5 AIS — receive-only (4)

| File | ES label | EN label | Semantic rule |
| --- | --- | --- | --- |
| `ais-receive-only` | Recepción AIS (solo escucha) | AIS receive-only | Receive antenna + receiver. **No transmit/transponder icon exists in this set.** |
| `ais-target` | Objetivo AIS | AIS target | Own target marker; not official chart symbology. |
| `ais-target-selected` | Objetivo AIS seleccionado | Selected AIS target | Selection by outline brackets; never colour alone. |
| `ais-target-lost` | Objetivo AIS perdido | Lost AIS target | Dashed outline + state label. |

Every AIS surface must carry the mandatory receive-only disclaimer verbatim (§7.7 / claims policy §9) —
see §2.12.

### 2.6 Devices and sensors (4)

| File | ES label | EN label | Semantic rule |
| --- | --- | --- | --- |
| `device-hub` | Concentrador (HUB) | Device hub (HUB) | Appliance with ports; no certification cue. |
| `device-display` | Pantalla | Display | Display with stand; blank screen, never fake UI. |
| `device-control-head` | Mando local de piloto | Pilot control head | Local control head; does not imply autonomous steering. |
| `sensor` | Sensor | Sensor | Generic sensor/IC node; not a specific probe. |

### 2.7 Fleet, watch and weather (3)

| File | ES label | EN label | Semantic rule |
| --- | --- | --- | --- |
| `fleet` | Flota | Fleet | Several vessels; no remote-helm implication. |
| `watch-monitoring` | Vigilancia (WATCH) | Monitoring (WATCH) | Observation/monitoring; WATCH is not a distress service. |
| `weather-forecast` | Previsión meteorológica | Weather forecast | Probabilistic forecast; surface must show source + validity. |

### 2.8 Connectivity (5)

| File | ES label | EN label | Semantic rule |
| --- | --- | --- | --- |
| `connection` | Conexión | Connection | Link established. |
| `network-bus` | Bus de red | Network bus | Vessel data bus; generic, no protocol certification. |
| `signal-strength` | Intensidad de señal | Signal strength | Level bars; filled marks only. |
| `wifi` | Wi-Fi | Wi-Fi | Generic Wi-Fi; no carrier logo. |
| `cellular` | Red móvil | Cellular | Generic tower; no carrier logo. |

### 2.9 Alerts and acknowledgement (5)

| File | ES label | EN label | Semantic rule |
| --- | --- | --- | --- |
| `status-info` | Información | Info (advisory) | Level 1 advisory; no safety implication. |
| `alert-caution` | Precaución | Caution | Level 2; triangle + `!`; cause required. |
| `alert-warning` | Advertencia | Warning | Level 3; **double-bordered** triangle + `!`; cause + required action. |
| `alert-alarm` | Alarma | Alarm | Level 4; **solid octagon** with cut-out `!`; never auto-dismissed. |
| `acknowledge` | Acuse de recibo | Acknowledge | **Acknowledgement ≠ resolution**; condition stays visible. |

### 2.10 Data states (4)

| File | ES label | EN label | Semantic rule |
| --- | --- | --- | --- |
| `stale` | Dato obsoleto | Stale data | Clock + slash; dashed outline and age on the value. |
| `offline` | Sin conexión | Offline | Signal + slash; persistent banner, last-known values with age. |
| `no-data` | Sin datos | No data | Hollow square + em dash; never a zero. |
| `unknown` | Desconocido | Unknown | Dashed square + `?`; distinct from stale and no-data. |

### 2.11 System, electrical, monitoring, maintenance, support (18)

| File | ES label | EN label | Semantic rule |
| --- | --- | --- | --- |
| `settings` | Ajustes | Settings | Gear/teeth attached; not a sun. |
| `power` | Encendido | Power | Standard power symbol. |
| `brightness` | Brillo | Brightness | Sun with detached rays; distinct from `settings`. |
| `update` | Actualizar | Update | Download-to-device; software update, not a data trend. |
| `battery` | Batería | Battery | Level shape + separate `%` label required in UI. |
| `charger` | Cargador | Charger | AC/alternator source; no lightning-bolt decoration. |
| `solar` | Solar | Solar | Panel + sun. |
| `fuse-breaker` | Fusible | Fuse | Protective device; labels required. |
| `shore-power` | Toma de puerto | Shore power | Plug + socket. |
| `ground` | Masa | Ground | Protective ground. |
| `bilge` | Sentina | Bilge | Hull section + water. |
| `tank-level` | Nivel de tanque | Tank level | Tank + fill line; `%` label required. |
| `temperature` | Temperatura | Temperature | Thermometer; no colour-only hot/cold. |
| `pressure` | Presión | Pressure | Force against a surface. |
| `service` | Servicio | Service | Toolbox; repair/service. |
| `calibration` | Calibración | Calibration | Sliders; adjustment. |
| `installation` | Instalación | Installation | Panel + fasteners + connector. |
| `support` | Soporte | Support | Headset/help. |

### 2.12 Mandatory disclaimers for icon-adjacent surfaces

Where these icons appear on a surface that shows AIS, PILOT, navigation or weather data, that surface carries the
mandatory disclaimers **verbatim** (localised, not paraphrased; brief §7.7). Icons never replace them:

- **AIS (receive-only)** — ES: «La recepción AIS es únicamente de escucha: no todos los buques emiten
  AIS. No constituye un sistema de evitación de colisiones ni un transpondedor.» EN: “AIS reception is
  receive-only: not every vessel transmits AIS. It is not a collision-avoidance system and not a
  transponder.”
- **PILOT (supervised steering)** — ES: «El sistema de gobierno es asistido y supervisado: exige
  vigilancia y capacidad de toma de control manual en todo momento. No permite gobierno autónomo ni
  control remoto sin supervisión.» EN: “The steering system is assisted and supervised: it requires
  continuous watchkeeping and the ability to take manual control at all times. It does not provide
  autonomous steering or unattended remote control.”
- **Navigation/instruments** — ES: «Este producto es una ayuda a la navegación y no sustituye a la carta
  náutica oficial, al equipo reglamentario de la embarcación, a la vigilancia continuada ni al buen
  hacer marinero. La responsabilidad de la navegación corresponde siempre al patrón.» EN: “This product
  is a navigational aid. It does not replace official nautical charts, the vessel’s required equipment,
  continuous watchkeeping or good seamanship. Responsibility for navigation always rests with the
  skipper.”
- **Weather (forecast)** — ES: «Las previsiones son probabilísticas y pueden desviarse de las condiciones
  locales reales. Se muestra la fuente y la hora de cada dato.» EN: “Forecasts are probabilistic and may
  differ from actual local conditions. Source and timestamp are displayed for every data point.”

## 3. Grid and construction

| Rule | Specification |
| --- | --- |
| Base grid | **24 × 24** units; nominal content area **20 × 20** (2-unit optical padding). Measured effective ink padding (stroke included) is ≥ 2 units for 48/57 icons; 9 icons have a declared optical exception of 1.0–1.5 units, listed in §6.1. Padding is an optical target, not a claim that every file has exactly 2 units. |
| Reference sizes | 16 / 20 / 24 / 32 / 48 px; masters are resolution-independent SVG |
| Coordinate precision | integers or short decimals (≤ 2 dp). No long floating-point paths |
| Optical centring | Shapes are centred by eye within the 20×20 live area, not by bounding-box math |
| Enclosing circles | `r` 8 (with internal detail), 8.5–9 (badge/status); stroke adds 1 px each side |
| Counters (negative space) | Consistent: circle counters ≥ 2.5 r units; gaps between strokes ≥ 2 units at 24 px |
| Arrowheads | 2.5–3 units long, 1.4–1.8 wide; direction carries meaning (bearing, trend, wind); never mirrored arbitrarily |
| Text in icons | **none** — icons are geometry only. Meaning is carried by `<title>` and adjacent real UI text |

Optical corrections applied (documented, not mathematical):

1. Enclosing circles that carry internal detail use `r=8` (not 9), so the inner silhouette does not
   crowd the ring; bare status badges use `r=9` to use the full optical area.
2. The AIS target triangle is a simple bow-up form (no concave stern notch) to stay legible at 16 px;
   the notch that reads as an "A" was removed after the reduction proof.
3. Arrowheads are placed so their *visual* tip sits on the path end, not the mathematical tip, avoiding
   an apparent overshoot at small sizes.
4. The scale-bar ticks use three different lengths (tall/short/tall) rather than equal ticks, so the
   centre is read as the middle of a measurement, not as a letter "E".
5. Filled indicators (signal bars, marker dots, slider knobs) are inset from the outer stroke edge to
   compensate for the extra apparent weight of fill.
6. Wind true/apparent use a full crossbar (one vs two) rather than small ticks; the ticks disappeared at
   16 px in the first reduction proof.
7. The warning triangle adds an inner border instead of a thicker stroke, preserving the 2 px stroke
   system while remaining heavier than caution.
8. Fleet markers are a three-vessel formation whose sizes are optically balanced (centre raised, outer
   pair equal); the earlier "hull U" metaphor read as a level indicator in greyscale.

## 4. Stroke

| Mode | Stroke |
| --- | --- |
| UI icons (this set) | **2 px on the 24 px grid** — the 2 px-equivalent directive for D-09 |
| Small-size guidance | At 16 px use the same master scaled, but prefer 24/32 px for dense/double-detail icons (§8) |
| Technical diagrams | 1.5–2 px primary, 1–1.25 px detail, 1 px dimension (see `ILLUSTRATION-STANDARDS.md`) |
| Caps / joins | **round** caps and joins in all UI icons |
| Minimum | never below 1 px at the rendered size |
| Consistent weight | all 57 icons use the same base `stroke-width="2"`; exceptions are declared (warning inner border 1.25) and are not a second weight system |

**Reconciliation note for reviewers (honest deviation).** Brief §9.2 *proposes* 1.5 px at 24 px (and
2 px at 16 px). The MC-04 execution directive for D-09 specifies **2 px-equivalent**; that is what is
authored. This is a documented one-parameter decision, not an accident. If the programme prefers the
brief's 1.5 px master, the change is mechanical (one attribute per file) and must re-run the reduction
proof. At 16 px the brief's 2 px target is not met by simple scaling (2 × 16/24 = 1.33 px); the set
therefore treats 16 px as a *proof size*, and implementation should use the 24/32 px master sizes or
author a dedicated 16 px variant before any dense small-size UI relies on these icons.

## 5. Corners and joins

- Rectangular forms use `rx` 1.5–2 on a 24 grid (brief §9.2: 1.5 px logical radius).
- Round line joins mean every corner is visually softened; there are no razor joins at 16 px.
- Corner logic is consistent per family: device rectangles `rx=2`, monitor/display `rx=2`, tank `rx=2`,
  capsule fuse `rx=3` (a true capsule), panel `rx=2`.
- No mixed corner languages (no sharp/square rectangle in one icon and a heavily rounded one in the same
  family) except where the shape *is* the metaphor (octagon alarm, triangle warning, capsule fuse).

## 6. Fill rules

**Outline is the default.** `fill="none"` on every master group; `stroke="currentColor"` carries the
colour role.

Filled elements are allowed only where fill carries a **state or data meaning**:

| Filled use | Example | Why |
| --- | --- | --- |
| Solid alert shape | `alert-alarm` octagon with cut-out `!` | Level 4 must be the heaviest shape; brief §7.6 |
| Selected/active state | component CSS may fill the target marker or add an outer ring | Selected ≠ colour-only |
| Level/quantity marks | `signal-strength` bars, `battery` level, `tank-level` fill line | The fill *is* the quantity |
| Small solid anchors | position marker, connector dots, slider knobs, sensor pins | Readability at small size; not decoration |

Rules:

1. **Never mix filled and outlined icons within one row of the same family.** The alarm solid shape is
   the declared exception because it *is* the meaning.
2. **Never use fill decoratively** (no two-tone logo icons, no filled backgrounds inside the 24 grid).
3. Selected/active variants may be produced in two ways: (a) component CSS increases stroke or adds a
   ring; (b) a dedicated file where the selected state must be visually distinct (`ais-target-selected`).
   Do not create a separate file for every state if a documented component rule suffices.
4. `currentColor` only. No hard-coded hex in any icon.

### 6.1 Measured optical-padding exceptions (declared)

A Chromium `getBBox` measurement of all 57 masters — union of each element's geometry expanded by half
its stroke width (fill-only elements unexpanded) — gives the effective **ink** padding below.
**48/57 icons meet the nominal 2-unit padding.** Nine exceptions intentionally use more of the live area;
they are recorded here so the specification matches the real files instead of overstating it. No
statement in this document may be read as "all icons have exactly 2 px padding".

| Icon | Measured ink bounds (x, y → maxX, maxY) | Effective padding |
| --- | --- | ---: |
| `ais-receive-only` | 2, 1.34 → 15.01, 22 | 1.34 |
| `battery` | 1.5, 6 → 21.5, 18 | 1.50 |
| `connection` | 1.5, 7 → 22.5, 17 | 1.50 |
| `fuse-breaker` | 1.5, 8 → 22.5, 16 | 1.50 |
| `installation` | 2, 3 → 22, 22.5 | 1.50 |
| `settings` | 5.5, 1 → 18.5, 18.5 | 1.00 |
| `shore-power` | 1.5, 6 → 22.5, 18 | 1.50 |
| `watch-monitoring` | 1.5, 7 → 22.5, 17 | 1.50 |
| `weather-forecast` | 1.47, 2 → 21.65, 19 | 1.47 |

Notes: `settings` is full-bleed vertically by design (gear teeth), the horizontal device/connection
icons use the full width because their silhouette is a wide bar, and `ais-receive-only` is asymmetric
(antenna + receiver). These are optical decisions, not oversights; the safe area for *consuming*
surfaces still follows §12 (clear space). `alert-alarm` (solid octagon, fill 2→22) and `cellular`
(ink y2.8 → 21) meet the nominal padding and are **not** exceptions.

## 7. Colour role use

Icons inherit `currentColor`. The consuming surface sets the role:

| Role | Use | Brief §5.3 reference values (day) |
| --- | --- | --- |
| primary data ink | normal values, navigation icons | `#17365d` |
| secondary data ink | context, provenance | `#57708a` |
| action / interactive | links, controls | `#176ca6` |
| critical / alarm | alarm icon, critical values | `#a32b22` |
| warning / caution | caution and warning icons | `#8a5a00` |
| safe / normal | normal state (not a vessel claim) | `#1f5f49` |
| stale / offline / no-data | data-quality states | `#5f6f7d` |
| disabled | disabled controls (must remain ≥ 3:1) | `--muted`-class role |

Night values are mode variants of the same roles (`#8fd3f5`, `#93a6b5`, `#ff9b8f`, `#ffc46b`,
`#7bd8b0`, `#a9b7c4` on `#0d1b26`/`#132733`). **Icons are never multicolour and state is never encoded
by colour alone** (brief §5.6, WCAG 2.2 1.4.1).

**Dependency (recorded honestly).** The authoritative token JSON
`docs/marea/brand/tokens/marea-instrument-tokens.proposed.json` owned by TypeColour did **not exist** when
this document was written. The values above are the brief's documented §5.3 candidates; icon files
themselves contain no colour, so no icon needs to change when the token JSON lands — only consuming
surfaces map roles to the final token names (`--inst-state-*`, `--inst-data-*`, etc.).

## 8. Small-size reduction

Evidence: `docs/marea/brand/assets/icons/ui/reduction-proof.html` renders every icon at **16 / 24 / 32 px**.
**Honesty note:** the board scales the single 24 px master; it does **not** contain redesigned 16 px
variants, and 48 px is not in the proof. A genuinely simplified 16 px variant set is a known gap for
MC-06, not a hidden capability. The board is a browser render proof, not a marine-display test.
on the day surface, at 32 px in greyscale (`filter: grayscale(1)`), and a subset at 24 px on the proposed
night surface. This is a **browser render proof**, not a marine-display, sunlight, glove or print test.

| Size | Use | Guidance |
| --- | --- | --- |
| 16 px | dense lists, provenance strips, status rows | proof-only for this set; pair with text; avoid double-detail icons |
| 24 px | default UI size | all 57 icons intended to work here |
| 32 px | instrument headers, installer sheets | highest-confidence size |
| 48 px | documentation, large touch surfaces | scale cleanly; line weights remain legible |

**Text pairing is mandatory, not optional, for any icon whose 16 px silhouette is ambiguous.** The
independent icon audit measured silhouette overlap (IoU) for the set; every pair above **0.80** must
always be shown with a visible text label when used at 16 px (icon-only use is prohibited for these
pairs), while remaining distinguishable at 24/32 px by detail:

- `ais-target` ↔ `ais-target-lost` — IoU 0.909 (distinct at 24 px by dashed outline + "LOST" label)
- `device-hub` ↔ `device-display` — IoU 0.875 (distinct by stand vs ports)
- `wind-true` ↔ `wind-apparent` — IoU 0.813 (distinct by one vs two feathers + T/A label)
- `nav-heading` ↔ `position-marker` — IoU 0.788 (threshold example; distinct by ring + tick vs solid marker)

Additional text-pairing cases at 16 px (documented, not hidden): `alert-warning` (inner border),
`acknowledge` (bell + check), `fleet` (three markers), `installation` (panel + connector),
`ais-target-lost` (dashed outline), `service` (toolbox handle). At 16 px they remain **distinguishable
in greyscale**, but their precise metaphor benefits from the adjacent label required by brief §9.2.

## 9. Semantic labels (ES/EN) and naming convention

### 9.1 File naming grammar

```
<domain>-<object>[-<state>].svg
```

- lowercase ASCII kebab-case only; no accents, no spaces, no versions in the name;
- **domain** ∈ `nav`, `wind`, `ais`, `device`, `alert`, `gps` (as established), `position`, `speed` is
  its own domain noun, `network` (inside `network-bus`), or a plain noun when the object is unambiguous
  (`depth`, `sensor`, `fleet`, `scale`, `settings`, `power`, `brightness`, `update`, `battery`, …);
- existing names are **stable**; renaming requires a documented migration, never a silent change;
- state suffixes are only `-selected`, `-lost`, `-no-fix`; do not invent per-state files by default.

### 9.2 Label rules

- One icon = one meaning. `stale` and `offline` and `no-data` and `unknown` are **four** meanings, never
  merged; `caution` and `warning` are two alert levels, never merged.
- **Silhouette-overlap rule:** any icon pair with measured IoU > 0.80 (or a shared 16 px silhouette) must
  be paired with a visible text label; icon-only use is prohibited for those pairs.
- ES and EN are first class: every icon has both labels in `<title>` (`ES / EN`) and in the catalogue.
- Product family names (`NAV`, `HUB`, `AIS`, `PILOT`, `SENSE`, `WATCH`, `DISPLAY`, `WEATHER`, `FLEET`)
  are never translated; the ES/EN label around them can be.
- Labels describe the **user's meaning**, not the drawing ("Batería", not "rectángulo con línea").
- Critical controls are **always icon + text**; never icon-only alarm or icon-only safety action.
- A label is not a claim: "GPS fix" does not mean accurate; "normal" describes a signal, not the sea.

### 9.3 ES/EN semantic label table

The authoritative, per-icon ES/EN labels are generated into `index.html` from each master's `<title>`
(the table in §2 repeats them). Consumers must not invent alternative ES/EN copy for the same icon.

## 10. Interaction states

State rules apply to the *component* that hosts an icon (MC-06+), not to the icon file itself. The icon
system defines the rules; implementation evidence is a later milestone.

| State | Rule |
| --- | --- |
| Default | `currentColor` at the role ink; 24 px default |
| Hover | change must not be colour-only: add underline, border, surface step or stroke change; preserve contrast ≥ 3:1 |
| Focus | visible ring with ≥ 3:1 contrast against adjacent surfaces (internal target ≥ 4.5:1), not obscured by sticky banners; never remove outline |
| Active/pressed | state via fill or ring *and* label; no motion required |
| Selected | `-selected` file or documented component rule; selected must remain visible in greyscale |
| Disabled | still perceivable (≥ 3:1), label remains; do not rely on opacity alone |
| Loading/updating | `update` icon + text; no spinner-only meaning; respect `prefers-reduced-motion` |
| Stale/offline/no-data/unknown | use the dedicated data-state icon + age text + dashed/attenuated value; never a frozen "live-looking" value |
| Alarm acknowledged | show both "acknowledged" and "still active"; `acknowledge` icon + text; acknowledgement does not hide the condition |
| Icon-only buttons | ≥ 24×24 CSS px minimum (WCAG 2.5.8); internal 44×44 target for wet/glove use; accessible name mandatory |

No icon state may flash above 3 Hz (WCAG 2.3.1); no icon relies on animation to convey meaning.

## 11. SVG export and hygiene requirements

Each file must satisfy (verified 57/57 by the command in §13):

1. `viewBox="0 0 24 24"` present; no fixed `width`/`height` attributes (scales by CSS).
2. `role="img"` and a `<title>` with `ES / EN`; when inlined next to visible text, the consumer marks it
   `aria-hidden="true"` (decorative) so screen readers do not duplicate the label.
3. No `<script>`, no external references (`xlink:href`, `href="http…"`, `url(...)`), no embedded raster
   (`<image>`), no CSS `@import`, no filters/effects. No fonts embedded. No text elements.
4. No ids at all in this set (therefore no duplicate-id risk when inlined repeatedly). If a future icon
   needs an id, it must be namespaced per file and unique per page.
5. Coordinates are integers or short decimals; no scientific notation.
6. `fill="none"`, `stroke="currentColor"`, `stroke-width="2"`, round caps/joins on the base group.
7. Budget: ≤ 8 kB per icon (brief §10.5). Actual: 24,648 B total for 57 icons; maximum 845 B (measured after the review geometry fixes).
8. No `<?xml?>` declaration, no DOCTYPE, no comments in shipped masters.
9. Filenames follow §9.1; `git`-safe, URL-safe, lowercase.
10. Every file must be registered in the asset manifest by its owner (AssetProduction) with real
    SHA-256, bytes and dimensions before it ships (brief §10.4). This document does **not** invent
    hashes.

## 12. Usage rules

| Rule | Detail |
| --- | --- |
| Clear space | minimum 1/4 of the 24 px grid (6 px at 24) around an icon that sits alone |
| Pairing | critical controls: icon + text; alarms: shape + icon + label + cause + required action |
| Alignment | optical centring within its button/row; baseline-independent |
| Backgrounds | icons inherit role ink; surfaces must provide ≥ 3:1 non-text contrast (brief §5.5) |
| Brand distinction | icons are role symbols, not brand marks; never use an icon as the MAREA symbol |
| Greyscale | every icon remains identifiable in greyscale; if it does not, pair it with text |
| Direction | arrows point with the meaning (bearing, trend, wind); never arbitrarily mirrored |

**Do not:** mix filled and outlined icons in one row; use emoji; rotate a symbol to invent a new meaning;
use flags, skull-and-crossbones, life-rings or marine clip-art; use certification-like shields/seals;
present AIS as complete traffic awareness; present PILOT as autonomous or remote; present weather as
certain.

## 13. QA and evidence (what was actually run)

**Structural self-check (author-run, not independent):** a Node one-liner read all 57 masters and tested
`viewBox`, `<script>`, external references, `<image>`, filters, `@import`, base stroke `2`, `<title>`.
Result recorded in the generated page and reproducible by reading §11:

```
57/57 passed; total 24,648 B; max icon 845 B
```

**Render proof:** `reduction-proof.html` was loaded in Playwright 1.64 Chromium (`file://`), with no
page/console errors; 57 rows, 228 inline SVG instances. This proves the files parse and render in a
browser; it does **not** prove marine-display legibility.

**NOT_TESTED / PENDING (state these in any review):**

| Item | Status | Exact future test |
| --- | --- | --- |
| Professional originality / resemblance opinion | **PENDING** (external legal) | specialist prior-art/resemblance review of the set as a system |
| Independent visual review (reviewer ≠ author) | **PENDING** | IndependentReviewer compares rendered sheet against brief §9.2 |
| Greyscale and CVD simulation of the set on instrument surfaces | greyscale proof done; **CVD NOT_TESTED** | protan/deutan/tritan simulation screenshots (brief §5.7) |
| Marine display, sunlight, night halation | **BLOCKED** (no hardware) | on-device review when a display exists |
| 1:1 print proof at minimum label sizes | **BLOCKED** (print authorization) | printed proof with ink-contrast measurement |
| Hardware/glove target-size validation | **BLOCKED** (no hardware) | physical test with wet/glove targets |
| Manifest registration with hashes | asset-production owns | manifest entries with real SHA-256 |

## 14. Dependencies and hand-off

| Dependency | Owner | Effect on this set |
| --- | --- | --- |
| `marea-instrument-tokens.proposed.json` (role names/values) | TypeColour | none on SVG files (no colour embedded); specimen/diagram consuming surfaces map roles |
| Final MAREA mark | IdentityVector | distinctness comparison still PENDING; reviewer must check role confusion |
| Asset manifest + validator | AssetProduction / Lead | registration and `npm run test:brand`-class validation |
| Engineering review of diagrams | Lead / engineering | separate D-11 review; icons themselves are illustrative semantics |

## 15. Change control

- Icons are versioned by file name stability, not by embedded version numbers.
- Any change to grid, stroke, corner logic or naming is a **system change** and must re-run the
  structural check and the reduction proof, and be recorded here.
- Adding an icon requires: domain justification, one meaning, no duplicate with an existing icon, ES/EN
  labels, structural check, reduced-size proof, and manifest registration.
- This document does not claim `APPROVED_FOR_USE`, `CLEARED` or `CERTIFIED`; those statuses do not exist
  in the programme vocabulary (execution plan §2.2).
