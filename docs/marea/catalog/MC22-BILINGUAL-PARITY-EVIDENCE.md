# MC-22 — Bilingual parity evidence (DISPLAY, PILOT, FLEET)

| Field | Value |
| --- | --- |
| Milestone | MC-22/36 — internal catalogue batch 3 |
| Kind | Measured ES/EN parity evidence |
| Method | `contentInventory` + `bilingualTextProblems` from `scripts/mc20-catalog-guards.mjs`, executed over `src/app/marea-catalog/content/index.ts` on the committed tree (`ae1e431` → `450441d`), plus the validator (MC20-16/17/18, MC21-02) and the Playwright bilingual-parity tests |

## 1. Measured per-family block counts (real check)

Executed `node --import ./scripts/marea-landing-ts-register.mjs` with a temp script that imported
`CATALOG_CONTENT` and called `contentBlocks`, `contentStrings`, `contentInventory` and
`bilingualTextProblems`. Measured values:

| Metric | DISPLAY | PILOT | FLEET |
| --- | --- | --- | --- |
| content blocks (evidence-bearing) | 40 | 40 | 40 |
| localized ES/EN strings | 274 (137 ES + 137 EN) | 286 (143 + 143) | 294 (147 + 147) |
| sections | 10 | 10 | 10 |
| capabilities | 6 | 6 | 6 |
| limitations | 7 | 8 | 7 |
| composition items | 8 | 8 | 8 |
| interfaces | 6 | 5 | 6 |
| editions | 2 | 3 | 3 |
| documentation entries | 6 | 6 | 6 |
| bundle notes | 2 | 2 | 1 |
| **parity problems** | **0** | **0** | **0** |

`parityProblems = 0` means: no missing locale, no empty locale value, no identical ES/EN text outside the
proper-noun invariant set, and every limitation carries a negation marker in both ES and EN.

## 2. How parity is checked

1. **Structural inventory** (`contentInventory` + `inventoryParityProblems`): the ES and EN trees expose the
   same sorted section/capability/limitation/composition/interface/edition/document/bundle ids. A locale
   that drops or reorders a block fails.
2. **Semantic pair check** (`bilingualTextProblems`): for every localized `{es, en}` pair — hero, section
   kicker/heading/lead, highlights, overview notes, capability label/description, composition label/heading/
   item, interface direction/transport/status/note, edition name/summary/note/feature label, limitation
   label/description, bundle note, documentation title/limitation, closing heading/body/governance/next —
   both locales must be non-empty and genuinely translated (identical ES=EN is rejected except for proper
   nouns). Every limitation must contain a negation marker in both languages.
3. **Validator checks**: `MC20-16` (non-empty, locale-specific values), `MC20-17` (structural inventory +
   bilingual pairs + limitation negation), `MC20-18` (no Spanish function-word clustering in EN),
   `MC21-02` (parity + content editions match the projection). The full validator run measured **56/56 PASS**.
4. **Renderer check**: the Playwright suite (`84 passed`) exercises all 18 preview routes (9 families ×
   ES/EN) and asserts the ES and EN pages of `display`, `pilot` and `fleet` render the same section
   structure, plus `data-marea-catalog-family` presence.

## 3. Result

**PASS** — 40 blocks per family, equal ES/EN string counts (137/143/147 per locale), 10 sections each,
0 parity problems, and the validator's parity checks (MC20-16/17/18, MC21-02) and the e2e bilingual tests
all pass. No untranslated block, no identical ES/EN pair outside proper nouns, no missing limitation
negation.

> Note: `shared.ts` and `catalog-domain.ts` status/evidence vocabulary are also bilingual and covered by
> `localizedStrings(CATALOG_SHARED)` in the validator; this file reports the per-family content contracts
> (the batch-3 families DISPLAY, PILOT, FLEET).
