# MAREA — Hardware CMF and marking direction (D-13)

| Field | Value |
| --- | --- |
| Document ID | `MC-04 / D-13 / HARDWARE-CMF-DIRECTION` |
| Deliverable | D-13 — hardware CMF (colour, material, finish) and marking direction (MR-BRD-010) |
| Status | **DIRECTION ONLY — no CAD, no material specification, no manufactured product, no certification** |
| Authority | `docs/marea/brand/MC-04-VISUAL-IDENTITY-BRIEF.md` §8 (lines 1232–1360), §9.3, §10.2 |
| Owner | AssetProduction |
| Reviewer | `PENDING_INDEPENDENT_REVIEW` (author ≠ reviewer; engineering review not performed) |
| Created | 2026-10-30 |
| Legal/commercial position | `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED` · `PUBLIC_MAREA_BRAND_USE = NO_GO` · hardware certifications `NOT_EVIDENCED` · products `NOT_FOR_SALE` |

> **Read this first.** MAREA hardware does not exist as a certified product. This document is
> **CMF/industrial-design direction only**. It is not a mechanical design, not a material
> specification, not a manufacturing instruction, not a certification, not a test result and not a
> promise of a physical product. Every "target" below is **to be proven** by engineering and by
> accredited test houses before any public statement. No CAD, tooling file, salt-spray result, IP
> rating or conformity mark exists. No competitor industrial design is copied, referenced or implied.

---

## 1. Family design language

One **bezel family** across DISPLAY, HUB, AIS, SENSE, WATCH and PILOT control heads. Recognition must
come from proportion, front-face geometry, control layout and the typographic plate — **not** from a
different logo per product, and not from decoration.

| Shared element | Direction (PROPOSED) |
| --- | --- |
| Front-face geometry | Uniform bezel width; one consistent corner treatment; one glass/polycarbonate inset plane; one gasket line |
| Control logic | Same minimum key set and the same rotary affordance where a rotary exists |
| Typographic plate | `MAREA` wordmark + family name + edition/model + serial + safety symbols, in that hierarchy (§5) |
| Rear connector field | Same labelling grammar and same cable-gland family across the family (§6) |
| Family consistency | One spacing/case rule applied to all nine family names (NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER, FLEET) |
| Exception | **PILOT**: its E-stop and takeover controls must be unmistakably different from every other control (§7) |

The identity assets that carry this direction are `assets/logo/marea-lockup-primary.svg`,
`marea-lockup-mono.svg`, `marea-lockup-reversed.svg`, `marea-mark-compact.svg` and
`logo/family/marea-family-<family>-lockup.svg` (PROPOSED, not cleared).

---

## 2. Colour, material and finish direction

**Direction, not specification.** None of these values is a material call-out. A future
engineering/supplier package must verify alloy, temper, process, tests and cost.

| Element | Direction (PROPOSED target) | Must be verified before any public statement |
| --- | --- | --- |
| Bezel | Bead-blasted, anodised aluminium in a dark graphite/charcoal tone; matte, low gloss | Alloy/temper, anodising process, corrosion and wear tests |
| Rear enclosure | Glass-filled polymer, UV-stabilised, matte, tooled for service access | UV/colour stability, impact, thermal cycling |
| Glass / screen cover | Chemically strengthened glass with anti-reflective treatment; flush with bezel | Optical/glare performance, impact and scratch tests |
| Gaskets / seals | EPDM or TPU compressed in a continuous channel | Ingress testing by a competent test house |
| Fasteners | A4/316 stainless, recessed or captive; no exposed sharp edges | Salt-spray/corrosion behaviour |
| Markings | Laser-etched or durably printed; backlit labels for night use | Abrasion, UV, salt and cleaning-agent resistance |
| Adhesives / labels | Marine-rated; **no paper labels on exterior surfaces** | Peel/aging tests |
| Surface touch | Matte, dry-grip texture; no gloss, no chrome, no faux carbon | Wet-hand grip, cleaning tests |
| Colour roles | One neutral family: dark graphite bezel, near-neutral enclosure, high-contrast symbol/marking ink | Colour stability, contrast measurement on the real substrate |

**Prohibited:** glossy black plastic as the default; chrome or polished metal; wood-effect; carbon-fibre
decals; metallic gold/bronze; RGB LEDs; exposed screws with decorative covers that hide serviceability;
"gamer" fins, ridges, RGB strips, glossy lacquer, fake brushed effects.

### 2.1 Readability and the marine environment (design constraints, not claims)

- Matte, low-glare front face; no mirror bezel elements around the display.
- Marking contrast designed for daylight and night: high ink/substrate contrast, no colour-only
  meaning. Quantitative contrast targets for printed labels are in the brief §5.5; a 1:1 print proof
  is `BLOCKED` until print authorisation.
- Type on the device is **language-neutral symbols + short labels**; localised safety text belongs in
  the manual. Any on-device text must survive ES/PT/EN/FR diacritics at small sizes (brief §4.6).
- Minimum marking size: **8 mm** for the primary wordmark on hardware, as a direction; no smaller
  marking is approved for production.
- No horizontal pockets or water-trapping grooves on the top face; drainage/weep paths where geometry
  creates a ledge; no vent path that admits water; heat managed by conduction/plate, not open vents.
- Flush glass with a continuous gasket channel; anti-glare hood compatible with designed-in mounting
  points, not taped on.
- Service access to connectors, fuse and battery (where applicable) without removing the unit in an
  emergency; recessed or captive fasteners; no fastener head used as a styling feature.
- Mounting: flush, bracket and gimbal variants are a **family-level question**. Panel-cutout tolerance,
  load and service clearance must come from engineering. **Do not assume or cite a third-party mount
  standard** as supported.

### 2.2 Environmental and ingress targets (claims discipline)

The table records **engineering targets to be proven**, not achievements. Nothing here may appear in
marketing, packaging or product pages until test evidence exists and the claims policy classifies it.

| Property | Target (PROPOSED) | Evidence that would be required | Public claim allowed? |
| --- | --- | --- | --- |
| Front-face ingress | IPX6 / IPX7 class target | Accredited IP test report for the exact enclosure | **No, until report** |
| Body ingress | IPX5 class target | Same | **No, until report** |
| Salt-spray corrosion | ISO 9227-class target | Test report + duration stated | **No, until report** |
| UV / colour stability | ISO 4892-2-class target | Test report | **No, until report** |
| Vibration / shock | Marine recreational target defined by engineering | Test report | **No, until report** |
| Thermal | Operating/storage envelope defined by engineering | Test report | **No, until report** |
| EMC / radio | Applicable conformity route defined by compliance; no marks before it | Declaration of conformity | **No, until conformity** |
| NMEA 2000 / NMEA 0183 / Signal K | Only tested message sets may be cited | Compatibility matrix + test evidence | **No, until matrix published** |

IEC 60945 and similar standards are **design references** for a marine environment only. Passing a
reference test is not a conformity assessment, and no standard-body mark may be reproduced.

---

## 3. Geometry direction (design-aware, engineering-owned)

- Thin, uniform front bezel; the screen is the dominant plane; no decorative ridges.
- One glass plane, one gasket line, one inset step.
- No water-trapping horizontal pockets; drainage/weep detail where a ledge is unavoidable.
- Fasteners recessed or captive; serviceable with standard tools.
- Screen anti-reflection; UV-stable colours; thermal paths that do not admit water; EMC/radio design;
  mounting load and vibration; salt-creep paths; cable keying; label durability.
- Recyclability considered but **no environmental claim without evidence**.
- MC-04 produces no CAD, no tooling file and no claim that any material is used.

---

## 4. Marking hierarchy on hardware

Markings are ranked so that a user under stress reads the right thing first. All are **direction**.

| Level | Marking | Placement (PROPOSED) | Size / form (PROPOSED) | Rules |
| --- | --- | --- | --- | --- |
| **L1 — Identity** | `MAREA` wordmark + family name + edition/model | Front-face typographic plate, lower-left or centred under the bezel | Wordmark ≥ 8 mm; family name secondary | Monochrome; no `®`/`™`; no tagline; must survive one-ink etching |
| **L2 — Safety** | Emergency stop / takeover markings; electrical hazard where applicable | Immediately at the control, never remote | Symbol + short localised word in the manual; on-device symbol language-neutral | Never icon-only safety action; never colour-only; never a certification-like shield |
| **L3 — Connector / port** | Port labels with function + type (+ direction where relevant) | Next to each connector on the rear face, reading order left→right, top→bottom | ≥ 7 pt equivalent; laser-etched; permanent | Labels must match the installation documentation exactly (§6) |
| **L4 — Serial / provenance** | Serial number, manufacturing date (only when true), lot, firmware label reference | Rear plate, secondary position | Legible, durable, unique | Format per §5; no invented data; no date before it exists |
| **L5 — Regulatory / disposal** | WEEE/battery/disposal symbols, conformity marks | Only where the product, jurisdiction and evidence require | Per applicable rules | **Only where true.** Never decorative. CE, NMEA, IP badges are prohibited until evidence and declaration exist |

Marking rules:

- All exterior markings must remain legible after salt, sun and cleaning; paper labels are prohibited
  on exterior surfaces.
- No marking may be designed to *look* like a certification, approval or safety guarantee.
- Marking durability tests (abrasion, UV, salt, cleaning agents) are **NOT_TESTED**.
- The wordmark/marking artwork is `PROPOSED`; no marking has been engraved, printed or produced.

---

## 5. Serial-label grammar (PROPOSED, not implemented)

A stable grammar lets installers and support read a label unambiguously without a lookup. It is a
**proposal**, not a format in use; no serial number exists for any MAREA product.

```
MR-<FAMILY>-<YY><WW>-<NNNN>-<REV>
```

| Field | Meaning | Rules (PROPOSED) |
| --- | --- | --- |
| `MR` | MAREA product prefix | Fixed; not a registration claim |
| `<FAMILY>` | 3-letter family code: `NAV`, `HUB`, `AIS`, `SEN`, `WAT`, `DIS`, `PIL`, `WEA`, `FLT` | Fixed list; unknown codes rejected |
| `<YY><WW>` | Year + ISO week of manufacture | Only ever printed when the value is true and recorded |
| `<NNNN>` | Sequential unit number within the lot | Unique per lot; no reuse |
| `<REV>` | Hardware revision letter | Engineering-owned; not a date and not a firmware version |

Additional rules:

- Firmware version is **not** part of the serial; it is a separate label/field (see the D-15 installer
  record) because it changes in the field.
- No checksum is defined yet. **Do not add a check digit** and do not claim one exists.
- No serial number, manufacture date or lot code has been generated or printed. The grammar must not
  be presented as an implemented system.
- The serial plate is level L4; it must not compete visually with the L1 identity or L2 safety marks.

Recommended example (illustrative only — **do not use as a real identifier**):
`MR-HUB-2604-0001-A` — `ILLUSTRATIVE FORMAT ONLY / NO UNIT EXISTS`.

---

## 6. Connector and port labelling

- Labelled ports use **meaningful, stable names**, not `IN1/OUT2` alone. The grammar is shared with the
  diagrams (`ICONOGRAPHY-SYSTEM.md`, `ILLUSTRATION-STANDARDS.md`) and the installer record.
- Proposed grammar: `<FUNCTION> <TYPE>` with an optional direction/role qualifier, e.g.
  `POWER 12–24 V DC`, `NETWORK BUS`, `GNSS ANTENNA`, `NMEA 2000` (only if that protocol is actually
  tested and declared — see §2.2).
- Keyed connectors; no force-to-connect; strain relief and cable-gland support; bend radius and gland
  orientation documented by engineering; no cable exit into the screen face.
- Service loops are designed, not improvised; installation instructions reference the same labels.
- **No port may imply compatibility** ("compatible with X") until compatibility evidence exists
  (`COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class C). Where a protocol is not yet verified, the label
  must stay generic and be marked illustrative in documentation.
- Every label in the diagrams must either match a tested/declared interface or be visibly marked
  illustrative; the illustration standards require a bilingual legend (ES/EN).

---

## 7. Control affordances and the E-stop distinction

| Control | Direction | Ergonomics / accessibility requirement (PROPOSED) |
| --- | --- | --- |
| Rotary encoder (where used) | 28–32 mm knurled knob, detented, low-profile | Operable with wet/gloved hands; ≥ 24 detents/revolution; tactile + audible feedback configurable |
| Sealed keys | 12–14 mm minimum, ≥ 8 mm gap, concave or raised | Tactile differentiation; backlit labels; no capacitive-only critical actions |
| Screen controls | Minimum 44×44 CSS px internal target in software | Wet/glove use; large hit areas; no gesture-only critical action |
| Power | Physical, clearly marked, not long-press-only | State perceivable without the display |
| **PILOT E-stop** | Mushroom head, **red**, guarded, latching, distinct shape and position | Reachable without looking; **not shareable** with any other function; documented in the manual and on the unit |
| **PILOT takeover** | Dedicated control physically distinct from the E-stop | Immediate manual authority; state displayed |
| Backlight | Day/night dimming; **no RGB**; no coloured status lighting as the only cue | Night mode preserves alert perceivability; no distraction glare |
| Labels | Etched/printed, high contrast, language-neutral symbols where standard | Localised text in the manual, not only on the device |

**E-stop marking distinction (hard rule).** The E-stop is a safety boundary, not a brand item:

- It must be unmistakably different from every other control in colour (red), shape (mushroom),
  guard/latch state and position; it must never be reused for another function.
- It carries a language-neutral stop symbol plus the localised word in the manual; it must never be
  icon-only or colour-only in documentation.
- It must not be styled with brand decoration, logo lockups, gradients or lighting effects.
- No claim may imply that the E-stop or takeover is certified, tested or fail-safe: that requires
  engineering and conformity evidence which does not exist.
- PILOT diagrams must show E-stop, manual takeover and the supervised boundary; they must never imply
  autonomous operation.

No control may be designed to *look* like a certification or safety guarantee.

---

## 8. What MC-04 must not do (and does not do here)

- No manufactured enclosure, IP rating, certification, salt-spray result or tested performance is
  designed, claimed or implied.
- No competitor's industrial design, bezel shape, control layout or trade dress is copied.
- No real hardware component is sourced or depicted as a MAREA part.
- "Marine-grade" is not used as a standard or certification.
- No third-party standard mark or certification symbol is reproduced.
- No packaging or hardware imagery is published as if a product exists.
- No CAD, 3D model, tooling file or supplier brief is produced by this milestone.

---

## 9. Open items and exact next actions (BLOCKED externally)

| Item | State | Exact unblock action |
| --- | --- | --- |
| Physical reference unit for ergonomics/photography | `BLOCKED` | Engineering builds a non-certified prototype; photography brief + release authorisation |
| Material/finish specification | `BLOCKED` | Engineering + supplier selection; material data sheets |
| IP / salt-spray / UV / vibration / EMC evidence | `NOT_TESTED` | Accredited test house reports for the exact enclosure |
| Serial-label implementation | `PROPOSED` | Engineering defines the numbering system, checksum and database of record |
| Connector/protocol declarations | `NOT_EVIDENCED` | Compatibility matrix + test evidence per interface |
| Marking legibility proof on substrate | `BLOCKED` | 1:1 marking proof on the proposed substrate after print/laser authorisation |
| CAD / tooling | out of scope | Separate authorised milestone |

## 10. Reviewer checklist

- [ ] No material, ingress, corrosion, UV, EMC or standard-body claim is stated as achieved.
- [ ] No `®`/`™`, CE, NMEA, IP or certification mark is designed or reproduced.
- [ ] Marking hierarchy L1–L5 is clear; L5 only where true.
- [ ] Serial grammar is labelled PROPOSED and contains no invented unit/date.
- [ ] E-stop is distinct in colour, shape, guard state and position; no sharing, no brand styling.
- [ ] Connector labels are meaningful, match documented interfaces, or are marked illustrative.
- [ ] No competitor design or trade dress reference; no CAD or tooling claim.
- [ ] Manifest/spec references point to real files or explicitly `PROPOSED`/`BLOCKED` items.
