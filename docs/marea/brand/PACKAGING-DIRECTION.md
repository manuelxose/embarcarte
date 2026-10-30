# MAREA — Packaging direction and provisional dieline concept (D-14)

| Field | Value |
| --- | --- |
| Document ID | `MC-04 / D-14 / PACKAGING-DIRECTION` |
| Deliverable | D-14 — packaging direction + vector dieline concept (MR-BRD-011) |
| Status | **PROVISIONAL PACKAGING CONCEPT — direction only. PRINT AND PROCUREMENT BLOCKED.** |
| Authority | `docs/marea/brand/MC-04-VISUAL-IDENTITY-BRIEF.md` §9.1, §9.3, §9.5, §10.2 (MR-BRD-011), §10.5, §10.6 |
| Owner | AssetProduction |
| Reviewer | `PENDING_INDEPENDENT_REVIEW` (author ≠ reviewer) |
| Created | 2026-10-30 |
| Legal position | `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED` · `PUBLIC_MAREA_BRAND_USE = NO_GO` · `PUBLICATION_BLOCKED` |

> **Read this first.** Nothing in this document is a packaging specification, a print order, a
> supplier brief, a certification or a promise that packaging exists. MAREA is a **proposed** brand.
> The six SVG files are internal concept artwork with **PROPOSED dimensions that do not come from a
> BOM, engineering or a supplier**. No packaging has been produced, printed, quoted or procured.

---

## 1. Status and scope

### 1.1 What exists (real files, measured)

Six 1:1 vector dielines were generated deterministically by `scripts/render-assets.mjs`
(job `packaging`) and probed from disk after writing. Measurements below are real file bytes and
real SVG `viewBox` sizes (1 user unit = 1 mm).

| File (`docs/marea/brand/assets/packaging/`) | viewBox (mm) | Bytes | SHA-256 (first 16) |
| --- | --- | ---: | --- |
| `marea-packaging-dieline-display.svg` | 799 × 314 | 12 024 | `5efe663ea71b096b` |
| `marea-packaging-dieline-hub.svg` | 719 × 274 | 11 996 | `b4336c2c8bd57552` |
| `marea-packaging-dieline-ais.svg` | 559 × 234 | 11 984 | `a2202f06f27dd3b0` |
| `marea-packaging-dieline-sense.svg` | 509 × 214 | 12 015 | `4c1ce0310ed6a301` |
| `marea-packaging-dieline-watch.svg` | 449 × 204 | 11 993 | `b85d08e2d1071fcb` |
| `marea-packaging-dieline-pilot.svg` | 779 × 294 | 12 010 | `83808ea9cbb6acc2` |

These are the measurements of the final `--job packaging` run (2026-10-30, after the IdentityVector wordmark revision). Full SHA-256 values, dimensions and per-file manifest records live in
`docs/marea/assets/manifest/MC-04-ASSETS.yaml` (entry `MR-BRD-011`). Reproduction command:

```powershell
node scripts/render-assets.mjs --job packaging
```

### 1.2 What does not exist

- No structural engineering, 3D model, tooling file or CAD.
- No material specification, grammage, board grade, supplier or quote.
- No printed proof, no die, no sample, no unboxing, no photograph.
- No certification, IP rating, disposal mark eligibility, "made in", FSC/recycled claim or
  environmental claim.
- No final product dimensions: every number marked `PROPUESTO / PROPOSED` is a **placeholder**.

### 1.3 Why print is blocked (external gates)

Print and procurement require, at minimum: trademark clearance and a public-use decision; a real BOM
with mounting dimensions and weights; a conformity/region plan; a named signatory authorisation;
supplier verification of substrate and ink compatibility. None exists. `PRINT/PROCUREMENT = BLOCKED`.

---

## 2. Structural direction

Direction inherited from the brief §9.1, not a structural design:

| Element | Direction (PROPOSED) | Verification required before use |
| --- | --- | --- |
| Structure | Rigid board carton, straight-tuck concept, moulded paper/pulp insert concept; no plastic window, no blister | Structural engineering, transit testing |
| Board | Uncoated or lightly coated board; recycled content **only after supplier verification** | Supplier certificate, grammage |
| Finish | Matte; no high-gloss lamination, no foil, no metallic ink, no decorative emboss | Print trial, scuff/humidity test |
| Print | One dark ink (navy `#17365d`) + paper white + at most one spot (`#1776ad`); no gradients | Ink drawdown, colour proof |
| Accessibility | Body ≥ 7 pt (≈2.47 mm cap-to-descender text size), critical labels ≥ 9 pt (≈3.18 mm) | 1:1 printed proof at reading distance |
| Honesty | No certification/CE/NMEA/IP mark, no "waterproof", no "made in", no performance badge, no competitor comparison | Claims review (G4) |

Front panel: `MAREA` wordmark + family name + edition line + an authored **line illustration**
labelled as a proposal (never a photograph, never a render pretending to be a product). Side panels:
language coverage and handling. Back panel: inclusions/exclusions, language panels ES/PT/EN/FR,
QR placeholder with printed URL fallback, serial/edition fields.

---

## 3. Dieline specification (concept)

### 3.1 Geometry conventions used by the generator

- 1:1 vector, units = millimetres; `viewBox` in mm; integer/short-decimal coordinates.
- **Bleed 3 mm** outside trim; **safe area 5 mm** inside each printed panel.
- **Fold lines** dashed; **glue area** hatched and labelled `ENCOLAR / GLUE`; trim contour solid.
- Flap family: front/back tuck flaps 18 mm, side dust flaps 12 mm, glue flap 15 mm. Adjacent flaps
  are separated by a die-cut slit (the net outline steps between flap tops).
- Annotation area outside the bleed is explicitly marked as technical notes and must not print as
  final artwork.
- Panel row order: glue flap · left side · front · right side · back.

### 3.2 Proposed box dimensions (placeholders)

| Family | Body W × H × D (mm, PROPOSED) | Basis |
| --- | --- | --- |
| DISPLAY | 300 × 220 × 70 | none — placeholder |
| HUB | 240 × 180 × 90 | none — placeholder |
| AIS | 190 × 140 × 60 | none — placeholder |
| SENSE | 170 × 120 × 55 | none — placeholder |
| WATCH | 150 × 110 × 45 | none — placeholder |
| PILOT | 280 × 200 × 80 | none — placeholder |

These are **not** product dimensions and **not** mount dimensions. Engineering must replace them with
BOM-derived figures before any print file is issued.

### 3.3 Dieline content map

| Panel | Content (PROPOSED) |
| --- | --- |
| Front | MAREA wordmark (inlined vector from `assets/logo/marea-wordmark.svg`), family name, edition/serial fields, `PROVISIONAL PACKAGING CONCEPT` label, authored line illustration with the label `ILUSTRACIÓN PROPUESTA — no es un producto real`, honesty line (no CE/NMEA/IP marks) |
| Left/right side | `MAREA <FAMILY>`, `PROVISIONAL CONCEPT · ES/PT/EN/FR` set vertically |
| Back | Language panels ES/PT/EN/FR, `INCLUYE / INCLUDES`, `NO INCLUYE / EXCLUDES`, QR placeholder with printed URL fallback, serial/lot field |
| Tuck flaps | `SOLAPA DE CIERRE / TUCK — PROPUESTA` |
| Glue flap | Hatch + `ENCOLAR / GLUE` |
| Outside bleed | Title block (document ID, scale, units, date), legend (trim/fold/safe/bleed/glue), dimension annotations marked PROPOSED, status statements |

### 3.4 Language panels

- ES, PT, EN, FR as required by the brief §9.1 and §10.2 (MR-BRD-011).
- Each panel states inclusions and that **actual contents are pending BOM**; no "what's in the box"
  beyond what is genuinely included.
- On-device/on-pack text must survive diacritics at small sizes (ES `ñ`, `¿`; PT `ã`, `õ`, `ç`;
  FR `œ`, `æ`, `ê`; brief §4.6).
- Language coverage is stated on the pack; the manual carries localised safety text.

### 3.5 QR placeholder rule

- The QR square in the dieline is an **empty placeholder**: it is not a scannable code and must not
  be printed as-is.
- A human-readable **printed URL fallback** is required and is shown as `pendiente de dominio
  definitivo` — the final domain/URL is not decided and must not be invented.
- No essential information may live only inside the QR.
- QR encoding, error correction, module size and print contrast require their own validation before
  print (not done).

---

## 4. Print specification (direction only)

| Item | Direction | Status |
| --- | --- | --- |
| Profile | ISO Coated v2 / uncoated equivalent, named in a future print spec after supplier selection | `PROPOSED` |
| Inks | One dark (navy `#17365d`), paper white, at most one spot (`#1776ad`); named in a future spec | `PROPOSED` |
| Data panel | Language coverage, revision, document ID, "not for print" state | Present in SVG |
| Barcode/QR | QR placeholder only; no barcode yet | Placeholder |
| Proofing | 1:1 contract proof required before print | `BLOCKED` |
| Supplier | None selected | `BLOCKED` |

No Pantone/spot code, ISO profile number, board grade or supplier is invented here; those require a
real procurement process.

---

## 5. Honesty and claims discipline

The packaging concept must not contain, and does not contain:

- `®` or `™`, "registered", "registrada", "marca registrada";
- CE, NMEA, NMEA 2000, IP, WEEE, FSC, recyclable, "marine-grade", "waterproof", "made in";
- performance, range, compatibility, availability, price or certification claims;
- official chart symbology, certification-style shields, flags, skull marks or marine clip-art;
- any text implying a product exists, is certified, is available or has been tested.

If any of these appears in a future revision, MC-04 fails (`MC-04-VISUAL-IDENTITY-BRIEF.md` §12.5).

---

## 6. Known limitations

- Dimensions are placeholders; geometry is a concept, not a manufacturable dieline.
- The net outline, flap proportions and glue area are illustrative and untested for board thickness,
  grain direction, carton strength or assembly.
- No paper/pulp insert geometry is drawn; the insert is direction only.
- The wordmark is inlined as vector from the identity set; final print artwork must be checked against
  the identity system and preflight (overprint, minimum line weights, ink limits) before print.
- Text in the dieline is authored SVG text set in a generic sans for technical annotations; final
  artwork must be typeset in the licensed families recorded in `TYPOGRAPHY-SYSTEM.md` before print.
- No accessibility validation of the printed pack has been performed; 1:1 print proof is `BLOCKED`.

## 7. Reviewer checklist

- [ ] Six SVGs parse as XML and keep the §10.5 hygiene rules (no script, no external refs, no raster).
- [ ] Bleed 3 mm and safe 5 mm are present and clearly distinguished; fold/glue lines are legible.
- [ ] Every dimension is visibly marked `PROPOSED` and no figure is presented as a product dimension.
- [ ] Language panels ES/PT/EN/FR present; no essential information only in the QR.
- [ ] No `®`/`™`, certification, IP, CE, NMEA or performance claim anywhere in the artwork.
- [ ] `PROVISIONAL PACKAGING CONCEPT` labelling is visible on the front panel and in the title block.
- [ ] Manifest entry `MR-BRD-011` lists all six files with real bytes/dimensions/SHA-256.
- [ ] Print/procurement remains recorded as `BLOCKED`.
