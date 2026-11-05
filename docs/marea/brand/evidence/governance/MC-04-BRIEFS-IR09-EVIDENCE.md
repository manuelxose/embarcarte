# MC-04 — IR-09 closure evidence: Spanish accents in `MC-04-BRIEFS.yaml`

| Field | Value |
| --- | --- |
| Defect | **IR-09** — ES captions/alt strings accent-stripped in `docs/marea/assets/manifest/MC-04-BRIEFS.yaml` |
| Assigned to | Governance (manifest owner) |
| Status | **FIXED — awaiting independent re-check on the frozen tree** |
| Fix date | 2026-10-30, 18:41–18:42 (Europe/Madrid) |
| Gate impact | QA-11 (alt text / accessibility quality) — not cosmetic; corrected here |
| File changed | `docs/marea/assets/manifest/MC-04-BRIEFS.yaml` only (no other deliverable required a change; `PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md` and `ORIGINALITY-AND-PRIOR-ART-CHECK.md` audited clean of accent-stripped Spanish tokens) |
| Negative finding | No hash, path, `generated_at`, provider or status value was altered by this fix |

## 1. What was wrong (measured, not assumed)

The manifest's Spanish strings were written without diacritics: «Rias Baixas», «fotografia»,
«instalacion», «navegacion», «timon», «composicion»… while the human-readable D-12 document had correct
Spanish. Measured on the pre-fix file:

| Metric (pre-fix) | Value |
| --- | --- |
| File size | 87,498 B |
| ES caption/alt values | 68 |
| ES values wrapped in « » (house style used by D-12) | 0 |
| Non-ASCII characters inside ES values | **0** |
| Accent-stripped forms present in ES values | **present in 48 distinct strings** |

The reviewer counted "16 non-ASCII bytes missing"; this record reports what the audit itself measured
(0 non-ASCII characters inside the ES values, 48 accent-stripped strings). The difference in counting
method does not change the finding: the ES copy was wrong and is now correct.

## 2. What the fix did

`docs/marea/brand/evidence/governance/ir09-fix-accents.mjs` performs **exact-value replacement of 48
distinct ES strings** (captions, alts and the visible CONCEPT disclaimers), using correct Spanish
(á é í ó ú ü ñ) and the « » quotation used elsewhere in the milestone:

| Aspect | Before → after |
| --- | --- |
| ES strings | 68 → 68 (no string lost or added) |
| With « » | 0 → **68** |
| Non-ASCII chars inside ES values | 0 → **247** |
| Accent-stripped forms | 48 strings → **0** |
| File size | 87,498 B → 87,915 B (+417 B), then 87,917 B after the optional proper-noun fix in §4 |

The script is **fail-closed**: it aborts (exit 1) if a mapping target is missing, so a silent partial fix
is impossible, and it is **idempotent** — a re-run reports `already-correct entries: 48, replacements
applied: 0` instead of double-wrapping the four strings that only gained « ». That idempotency guard was
added after a dry run showed the naive version could wrap already-correct values twice.

Representative corrected strings (verbatim):

- `«Navegación de crucero en las Rías Baixas — imagen conceptual.»`
- `«Render conceptual — no representa un producto certificado / no es una fotografía de un producto real instalado.»`
- `«Pantalla dedicada en el puesto de timón — render conceptual; la interfaz es una composición web, no una captura real.»`
- `«Manos con guantes de navegación ajustando una escota en cubierta mojada.»`
- `«Ilustración técnica ilustrativa — no a escala salvo indicación; sujeta a revisión de ingeniería.»`

Note on plurals: `composición → composiciones`, `previsión → previsiones`, `embarcación → embarcaciones`
correctly **lose** the accent in the plural; the checker is word-bounded so those correct plural forms are
not flagged.

## 3. Real commands and real output (nothing pasted from expectation)

All three checks are also run together, with their real output captured UTF-8, by
`pwsh -NoProfile -File docs/marea/brand/evidence/governance/run-ir09-verification.ps1` →
`MC-04-BRIEFS-IR09-OUTPUT.txt` (64 lines, final line: `SUMMARY: check1=0 check2=0 check3=0 | ALL PASS`).

### 3.1 Dry run (fail-closed gate)

```powershell
node docs/marea/brand/evidence/governance/ir09-fix-accents.mjs --check-only
```

```
IR-09 accent restoration — docs/marea/assets/manifest/MC-04-BRIEFS.yaml
mapping entries            : 48
replacements applied       : 68 (across 48 distinct ES strings)
ES string values           : 68 total, 68 with « »
non-ASCII chars in ES vals : before 0 -> after 247
accent-stripped forms left : 0
```

### 3.2 Apply + formatter gate

```powershell
node docs/marea/brand/evidence/governance/ir09-fix-accents.mjs
npx prettier --write docs/marea/assets/manifest/MC-04-BRIEFS.yaml
npx prettier --check docs/marea/assets/manifest/MC-04-BRIEFS.yaml
```

```
RESULT: WRITTEN. Run prettier --write/--check and the 20-field structural check next.
docs/marea/assets/manifest/MC-04-BRIEFS.yaml 94ms (unchanged)
Checking formatting...
All matched files use Prettier code style!
```

`(unchanged)` means the corrected file already satisfied prettier — the strings changed, the YAML
structure did not.

### 3.3 Structural + Spanish-quality check (the acceptance gate)

```powershell
pwsh -NoProfile -File docs/marea/brand/evidence/governance/check-briefs-structure.ps1
```

```
MC-04-BRIEFS.yaml structural + Spanish-quality check
Run at  : 2026-10-30T18:41:28+01:00
File    : docs/marea/assets/manifest/MC-04-BRIEFS.yaml (87915 B, 1718 lines)
entries found: 17 (expected 17)
  MR-COR-001   status=BLOCKED_ON_IMAGE_GENERATION  fields=20/20 files_empty=True generated_at_null=True
  ... (all 17 entries: 16 blocked + MR-PRD-003 PRODUCIBLE_WITHOUT_GENERATION, every one 20/20 fields)
blocked entries: 16 (expected 16)
invented file paths: 0 (expected 0) | real sha256 values: 0 (expected 0) | generated_at dates: 0 (expected 0)
ES strings: 68 (expected 68) | with guillemets: 68 | non-ASCII chars: 247 | accent-stripped forms: 0
ES/EN key counts: 68 / 68

RESULT: PASS
```

Exit code **0**.

### 3.4 Idempotency re-run (proves the fix cannot be applied twice)

```powershell
node docs/marea/brand/evidence/governance/ir09-fix-accents.mjs --check-only
```

```
mapping entries            : 48
already-correct entries    : 48
replacements applied       : 0 (across 0 distinct ES strings)
ES string values           : 68 total, 68 with « »
non-ASCII chars in ES vals : before 247 -> after 247
accent-stripped forms left : 0
```

## 4. One optional extra fixed (proper noun in English copy)

The audit found the same proper noun still unaccented in **English** content of the manifest
(`subject` of `MR-COR-001` and its `caption_en`: "Rias Baixas"). The toponym is properly *Rías Baixas*
in both languages, so both were corrected (`Rías Baixas`), which is the final 87,917 B state. This does
not touch the ES strings metric (still 68/68, 247 non-ASCII inside ES values) and was re-validated by the
formatter and structural checks above.

## 5. What this evidence does and does not claim

- It claims the manifest's Spanish captions and alt text now use correct orthography and the house
  quotation style, with all 20 brief fields and all invariants intact.
- It does **not** claim that alt text has been reviewed against real rendered imagery — no image exists
  (image generation is BLOCKED), so alt-text adequacy can only be reviewed against the art-direction
  brief, not against a file. When assets exist, alts must be re-checked against what was actually
  produced.
- It does **not** close QA-11 by itself: QA-11 is the reviewer's gate. This is the author-side fix; the
  IndependentReviewer re-checks on the frozen tree.

## 6. Reproduction

```powershell
cd C:\Users\Admin\Documents\workspace\embarcarte
node docs/marea/brand/evidence/governance/ir09-fix-accents.mjs --check-only     # expect: 0 pending
pwsh -NoProfile -File docs/marea/brand/evidence/governance/check-briefs-structure.ps1  # expect: PASS, exit 0
npx prettier --check docs/marea/assets/manifest/MC-04-BRIEFS.yaml               # expect: code style OK
```

## 7. Change log

| Date | Change |
| --- | --- |
| 2026-10-30 18:41 | IR-09 fix created and applied: 48 ES strings / 68 replacements restored with correct accents and « »; fail-closed + idempotent script; verified 68/68 ES values, 247 non-ASCII chars, 0 stripped forms; prettier PASS; structural/20-field check PASS (exit 0). |
| 2026-10-30 18:42 | Optional proper-noun correction ("Rías Baixas") in the English `subject`/`caption_en`; re-validated. Final file 87,917 B; every check still PASS. |
