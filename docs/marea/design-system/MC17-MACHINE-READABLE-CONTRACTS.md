# MC-17 — Machine-readable contracts (D20)

| Field | Value |
|---|---|
| Deliverable | D20 `MC17-MACHINE-READABLE-CONTRACTS.md` |
| Milestone | MC-17/36 — MAREA premium design system (internal only) |
| Date | 2026-11-03 |
| Owner | documentation-specialist (MC-17/36) |
| Directory | `docs/marea/design-system/data/` |
| Contract set | 20 datasets declared by validator check `MC17-36` |
| Present at `4a9043b` | 20/20 files; `review-findings.json` is present and reviewer-owned |
| Governance | `INTERNAL_PROPOSED` / `NOT_ADOPTED` / public use `NO_GO` |

## 1. Why these datasets exist

The MC-17 documents are for human review; the JSON datasets are the contract a
machine can read and a later milestone can consume. They are deliberately
**fail-closed**: entity data carries restrictions, missing values stay missing, no
dataset invents a price, stock, certification, customer or approval, and generated
files are reproducible byte-for-byte.

Every dataset declares `contractId`, `contractVersion`, `status`, `owner`,
`generationMethod`, `scope`, `knownLimitations` and `sourceRefs` (validator
`MC17-36`). The validator is the enforcement, not this index: if a dataset loses its
governance metadata, the check fails.

## 2. Canonical source → generated artefact rules

| Rule | Detail |
|---|---|
| One source per domain | Tokens: `src/app/marea-design-system/tokens/marea-design-tokens.source.json`. Components: `docs/marea/design-system/data/component-registry.json`. Commerce facts: the MC-16 files under `docs/marea/commerce-data/data/`. |
| Generated files are never hand-edited | The generators compare committed bytes in `--check` mode and fail on drift. A hand edit is a defect even if it looks correct. |
| Deterministic output | No timestamps, no environment values, stable ordering. Identical input must produce identical bytes. |
| Evidence is regenerated, not patched | `contrast-evidence.json` is rewritten by the validator; `validator-run.json` is rewritten by every run. Historical runs are not edited to look better. |
| Authored datasets cite sources and limits | Authored files must name the files they describe and the limitations of the evidence; they do not generate themselves. |
| Change propagation | Change the source, run the generator, run the validator, then update the narrative document. The narrative never leads the artefact. |
| Status is not upgraded by documentation | A dataset's `status` describes the artefact; it does not authorise publication, adoption or a conformance claim. |

Generators and what they own:

| Script | Outputs |
|---|---|
| `scripts/build-marea-design-tokens.mjs` | generated CSS + TS; `token-source-map.json`, `color-roles.json`, `mode-contracts.json`, `typography-roles.json`, `layout-tokens.json` |
| `scripts/build-marea-design-system-fixtures.mjs` | `src/app/marea-design-system/data/fixtures/marea-fixtures.generated.ts` (not a JSON dataset, but a generated contract artefact) |
| `scripts/build-marea-design-system-baseline.mjs` | `legacy-ui-baseline.json` from the Git object database of commit `6d8287c8507038c4f90fd6e35471f78081ca4676` |
| `scripts/build-marea-design-system-catalogue-data.mjs` | `preview/catalogue/app/registry.generated.ts` and `component-states.json` |
| `scripts/check-marea-design-system.mjs` | `evidence/validator-run.json` and `data/contrast-evidence.json` |
| `npx playwright test -c playwright.design-system.config.ts` | `evidence/axe-summary.json` (the raw axe JSON and screenshots are under `test-results/`, gitignored) |

## 3. The 20-dataset index

Scope is abbreviated here; the file itself is authoritative. "Check" means the
validator check that reads or directly enforces the file; `—` means the file is
evidence or a contract mirrored in code and is enforced indirectly.

| # | File | contractId | Scope | Owner | Generation | Status | Check |
|---:|---|---|---|---|---|---|---|
| 1 | `manifest.json` | `MC17-MACHINE-READABLE-MANIFEST` | Index of datasets, documents, versions and governance | documentation-specialist | authored index | `INTERNAL_PROPOSED` | `MC17-36` |
| 2 | `token-source-map.json` | `MC17-TOKEN-SOURCE-MAP` | 262 flattened provenance rows (one per token per mode) | lead | generated (tokens) | `INTERNAL_PROPOSED` | `MC17-05` freshness |
| 3 | `color-roles.json` | `MC17-COLOR-ROLES` | 33 semantic colour roles × 4 modes, contrast pairs, status semantics | lead | generated (tokens) | `INTERNAL_PROPOSED` | `MC17-04` via source mirror |
| 4 | `mode-contracts.json` | `MC17-MODE-CONTRACTS` | Four visual modes, context and selector contract | lead | generated (tokens) | `INTERNAL_PROPOSED` | `MC17-02` via source |
| 5 | `typography-roles.json` | `MC17-TYPOGRAPHY-ROLES` | 2 families, 13 roles, numeric contract | lead | generated (tokens) | `INTERNAL_PROPOSED` | `MC17-16` / `MC17-05` |
| 6 | `layout-tokens.json` | `MC17-LAYOUT-TOKENS` | Spacing, size, grid, radius, border, elevation, opacity, focus, motion, breakpoints, z, icons | lead | generated (tokens) | `INTERNAL_PROPOSED` | `MC17-05` freshness |
| 7 | `component-registry.json` | `MC17-COMPONENT-REGISTRY` | 49 entries: API, selector, variants, modes, tokens, a11y and 11 states | lead | authored, machine-validated | `INTERNAL_PROPOSED` | `MC17-12`–`MC17-15` |
| 8 | `component-states.json` | `MC17-COMPONENT-STATES` | 49 × 11 state applicability; 386 explicit NOT_APPLICABLE reasons | lead | generated (catalogue data) | `INTERNAL_PROPOSED` | `MC17-14` |
| 9 | `accessibility-requirements.json` | `MC17-ACCESSIBILITY-REQUIREMENTS` | 17 applicable WCAG 2.2 criteria, evidence and gaps | programme-docs | authored | `INTERNAL_PROPOSED` | `MC17-38` |
| 10 | `contrast-evidence.json` | `MC17-CONTRAST-EVIDENCE` | 296 pair/mode contrast measurements on declared values | lead | generated (validator) | `PASS` (evidence) | produced by `MC17-04` |
| 11 | `responsive-evidence.json` | `MC17-RESPONSIVE-EVIDENCE` | Six widths, 200% scaling, defect, 6 screenshots, limits | documentation-specialist | authored from recorded run | `INTERNAL_PROPOSED` | `MC17-36` |
| 12 | `performance-evidence.json` | `MC17-PERFORMANCE-EVIDENCE` | Six lab measurements, build sizes, SSR limits | documentation-specialist | authored from measured output | `INTERNAL_PROPOSED` | `MC17-36` |
| 13 | `visual-regression-evidence.json` | `MC17-VISUAL-REGRESSION-EVIDENCE` | 26 baseline PNGs, settings, provenance, caveat | documentation-specialist | authored from recorded run | `INTERNAL_PROPOSED` | `MC17-36` |
| 14 | `commerce-presentation-policy.json` | `MC17-COMMERCE-PRESENTATION-POLICY` | Fail-closed CTA states, invariants, blocked signals, prohibited wording | programme-docs | authored | `INTERNAL_PROPOSED` | `MC17-19` / `MC17-20` (code mirror) |
| 15 | `locale-parity.json` | `MC17-LOCALE-PARITY` | 138 bilingual keys, routing and identity rules | programme-docs | authored | `INTERNAL_PROPOSED` | `MC17-25` / `MC17-26` |
| 16 | `asset-provenance.json` | `MC17-ASSET-PROVENANCE` | 10 asset families, rights and publication state, 0 public MAREA assets | documentation-specialist | authored | `INTERNAL_PROPOSED` | `MC17-34` |
| 17 | `legacy-ui-baseline.json` | `MC17-LEGACY-UI-BASELINE` | 35 watched files / 15 public files SHA-256 at the MC-16 commit | lead | generated (Git object DB) | `INTERNAL_PROPOSED` | `MC17-11`, `MC17-28`, `MC17-30` |
| 18 | `blocker-register.json` | `MC17-BLOCKER-REGISTER` | 17 inherited and MC-17 blockers; 3 MC-17-internal entries closed historical at `4a9043b`, inherited ones open | documentation-specialist | authored | `OPEN` | `MC17-32` |
| 19 | `mc18-handoff-inputs.json` | `MC17-MC18-HANDOFF-INPUTS` | Handoff contracts and `mc18Started: false` | documentation-specialist | authored | `READY_WITH_NAMED_GAPS` | `MC17-33` |
| 20 | `review-findings.json` | `MC17-REVIEW-FINDINGS` | Independent review findings, per-finding status and re-review record | independent reviewer (D22) | authored by reviewer | `PRESENT` | `MC17-36` |

**Present/absent at `4a9043b`:** all 20 files exist. `review-findings.json` is
owned by the independent review (D22), whose two rounds are recorded and whose
third round completed at `f2c9ec2` with PASS_INTERNAL_DESIGN_SYSTEM_SCOPE (see D22 section 11). No author of this document fabricated
review findings to make the check green.

### Count reconciliation

Validator `MC17-36` declares **20** datasets. The handoff also consumes the MC-16
contract `docs/marea/commerce-data/data/mc17-handoff-inputs.json`
(`MC16-MC17-HANDOFF-INPUTS`, 2,201 bytes), which is outside this directory and is an
**input**, not an MC-17 dataset. Counting that external input as well gives 21
machine-readable contracts in the wider MC-17 handoff, but only 20 are governed by
`MC17-36` and all 20 exist at `4a9043b`. The table above indexes the 20; the
external input is cited but not claimed as an MC-17 output.

## 4. Determinism and `--check` commands

Run from the repository root:

| Command | What it verifies | Expected success text |
|---|---|---|
| `node scripts/build-marea-design-tokens.mjs --check` | token CSS, TS and 5 datasets are byte-current | "Token outputs current: …" |
| `node scripts/build-marea-design-system-fixtures.mjs --check` | synthetic fixture module is byte-current | "Fixture module current: 9 families, 26 editions, 6 bundles, 12 entitlement definitions." |
| `node scripts/build-marea-design-system-baseline.mjs --check` | baseline matches the Git object database at the pinned commit | "Baseline current: …" |
| `node scripts/build-marea-design-system-catalogue-data.mjs --check` | `registry.generated.ts` and `component-states.json` are byte-current | "Catalogue metadata current: 49 registered components." |
| `node scripts/check-marea-design-system.mjs` | all 38 checks; rewrites validator + contrast evidence | `MC-17 design system validator: … passed` |
| `node --test --test-isolation=none scripts/check-marea-design-system.test.mjs scripts/check-marea-design-system-adversarial.test.mjs` | 41 unit/adversarial tests | `pass 27`, `fail 0` |

The first four exit non-zero and print `STALE`/`MISSING` when an artefact is not
current. The validator exits non-zero if any check fails. `--check` must be run
before any review that claims a generated artefact is current.

Observed on 2026-11-03: all four checks printed their "current" line and exited 0
("Token outputs current: 262 provenance rows across 4 modes.", "Fixture module
current: 9 families, 26 editions, 6 bundles, 12 entitlement definitions.", "Baseline
current: 35 watched files at 6d8287c…", "Catalogue metadata current: 49 registered
components.").

## 5. What the manifest adds

`manifest.json` is the first file a consumer should read. It carries:

- contract identity/version, milestone, status, owner, generation method, scope,
  `knownLimitations` and `sourceRefs`;
- a `datasets` array (20 entries) with contractId, path, owner, generation kind,
  status, consumed-by check and `exists` flag;
- a `documents` array of the 24 MC-17 deliverables with deliverable id, title,
  status (`PRESENT` / `PENDING`) and path; all 24, including D22–D24, are `PRESENT`
  at `4a9043b`;
- a `productionIsolation` summary and the governance flag block.

The manifest is an **index, not a new authority**: when it disagrees with a dataset
or the validator, the dataset/validator wins and the manifest is corrected.

## 6. Consumption rules for a future milestone

1. Read `manifest.json`, then the specific dataset; do not scrape Markdown tables.
2. Treat `component-registry.json` as the component API authority and
   `component-states.json` as the state-applicability authority.
3. Treat `legacy-ui-baseline.json` as a byte baseline, not a visual approval.
4. Treat `contrast-evidence.json` as declared-value evidence, not rendered-pixel
   proof.
5. Treat `review-findings.json` as the independent reviewer's record; read its
   per-finding status rather than a summary, and do not edit it as an author.
6. Never edit a generated file to change a contract; change the source and rerun the
   generator.
7. A dataset `PASS` status is scoped to that dataset. It is not a milestone verdict,
   a WCAG claim, a price approval or a publication authorisation.

## 7. Known limitations

- The index is only as good as the files; an absent dataset cannot be indexed as
  present.
- The validator's `MC17-36` checks governance metadata presence, not the semantic
  correctness of every field.
- Generated determinism proves reproducibility, not truth: a wrong source produces a
  consistently wrong output.
- The authored evidence datasets (responsive, performance, visual) cite recorded
  runs on the frozen implementation; they are not independently re-executed here.
- The 20/21 count depends on the scope chosen (MC-17 directory vs wider handoff);
  both are stated rather than hidden.
- This document does not create `review-findings.json` and does not convert the
  current validator result into a pass.

Source references: `docs/marea/design-system/data/*.json`,
`scripts/build-marea-design-tokens.mjs`,
`scripts/build-marea-design-system-fixtures.mjs`,
`scripts/build-marea-design-system-baseline.mjs`,
`scripts/build-marea-design-system-catalogue-data.mjs`,
`scripts/check-marea-design-system.mjs`,
`docs/marea/design-system/evidence/validator-run.json`,
`docs/marea/commerce-data/data/mc17-handoff-inputs.json`.
