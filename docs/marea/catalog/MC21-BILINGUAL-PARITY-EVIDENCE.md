# MC-21 — Bilingual parity evidence

## 1. Scope

Six families × two locales (ES/EN) × eleven sections (hero + ten numbered sections) rendered from
one locale-aware component tree. Parity is structural (same section inventory per family) and
semantic (every localized pair is non-empty, translated, and negation-bearing where a limitation
or prohibition is stated).

## 2. How parity is enforced

- `scripts/check-mc20-catalog.mjs`:
  - `MC20-10` — every family renders the frozen ten sections.
  - `MC20-16` — every sampled value is non-empty and locale-specific.
  - `MC20-17` — `bilingualTextProblems` + `contentInventory`: structural inventory equal, every
    localized pair non-empty/translated, every limitation carries a negation in both locales.
  - `MC20-18` — `englishClusterProblem`: zero English strings with Spanish function-word clustering.
  - `MC21-02` — SENSE/WATCH/WEATHER ES/EN structural parity (10 sections, editions match projection).
- `scripts/check-mc20-catalog.test.mjs` — the bilingual guard rejects an empty EN limitation and an
  identical ES/EN lead; ES/EN parity breaks in the new families are rejected.
- `e2e/catalog/catalog.spec.ts` — per-family ES/EN renders the same 11 section hosts and the same
  `h1` title, with a ≤2 paragraph delta.

## 3. Measured result

- `npm run test:mc20` → 50/50 PASS (evidence `docs/marea/catalog/evidence/validator-run.json`).
- `npm run test:mc20:unit` → 39/39 PASS.
- `npm run test:mc20:e2e` → 60/60 PASS (12 routes, ES/EN parity asserted per family).

## 4. Outstanding (not closed by MC-21)

- Professional English review of the three new families' EN copy: `OUTSTANDING` (inherited).
  Recorded, not marked complete.
- Manual WCAG 2.2 AA / assistive-technology review: outstanding (inherited from MC-19 AC08 /
  MC-20 AC-11). MC-21 proves automated axe coverage only.
