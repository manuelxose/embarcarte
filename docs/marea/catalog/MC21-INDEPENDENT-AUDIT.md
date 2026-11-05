# MC-21 — Independent audit and remediation log

| Field | Value |
| --- | --- |
| Milestone | MC-21/36 — WEATHER, SENSE, WATCH internal catalogue |
| Base | `115a1ac` — verified MC-20 delivery HEAD |
| Branch | `feature/marea-mc21-weather-sense-watch-catalog` |
| Implementation | `f2609a8` |
| External-audit remediation | `f7d3a3a` |
| Residual remediation | included in the documentation commit that carries this record |
| Method | independent internal verifier and reviewer, plus two external auditors on a different model family; findings classified; every fix re-measured by the Lead |

## 1. Independence and execution limits (stated, not hidden)

| Reviewer | Model | Execution | Limitation |
| --- | --- | --- | --- |
| Internal verifier (t5) | DeepSeek v4-pro, separate agent/context | **Executed** all 8 declared commands | Same host; did not implement |
| Internal reviewer (t7) | DeepSeek v4-pro, separate agent/context | **Executed** re-runs and mutation tests | Same host; did not implement |
| External auditor (Claude Code) | Claude Opus 5.5 | **Static only** — PowerShell denied in its session | No git/npm/mutations; findings verified by the Lead before repair; Opus 5.5 retired afterwards (D-088) |
| External re-auditor (Claude Code) | Claude Sonnet 5.5 | **Static only** — PowerShell denied in its session | Same limitation; its verdict is explicitly conditional on execution |

The external audits are genuinely a different model family and a separate context, but they **could
not execute**. Their verdicts are therefore static-analysis verdicts, and the execution evidence in
this record is the internal verifier's and the Lead's measured runs. This is a limitation of the
audit, not a basis for a stronger claim.

## 2. Internal findings

| ID | Severity | Finding | Disposition |
| --- | --- | --- | --- |
| F-1 | MEDIUM | Named-provider guard covered 2 of the 8 mandated providers; injected `Copernicus` passed MC21-04 | CLOSED — guard extended to 8 providers with word-boundary matching, 8 negative controls; reviewer reproduced rejection (`MC21-04 FAIL`, 49/50, exit 1) and byte-identical revert |

## 3. External findings (first audit — Opus 5.5, static)

Verdict returned: `NEEDS_REVISION` (4 MAJOR, 9 MINOR/INFO). The Lead verified each MAJOR against
canonical data before accepting it.

| ID | Severity | Finding | Disposition |
| --- | --- | --- | --- |
| XA-01 | MAJOR | Bundle inclusion used a first-match lookup: COMPLETE lost SENSE-BILGE/TANKS/ENV and PROTECT lost the conditional WATCH-PLUS; MC20-09 repeated the same bug | CLOSED — one projected row per canonical line (COMPLETE SENSE CP-05..08; PROTECT WATCH PR-01 + PR-05); MC20-09 compares the full tuple set; projection regenerated |
| XA-02 | MAJOR | Claim guard missed `149 euros`, `$149`, `±0,1 m/s`, `95% accuracy`, `IP67`, pre-order wording | CLOSED — currency, numeric-accuracy, IP-rating and ordering rules added with negative and positive controls |
| XA-03 | MAJOR | Fail-open: negation only on the first match; commas did not end clauses; a pair missing a locale was silently skipped | CLOSED — every match scanned, clauses end at commas/conjunctions, missing locale is a hard failure; tests added |
| XA-04 | MAJOR | Two WATCH statements labelled `VERIFIED_REPO` asserted unimplemented local behaviour | CLOSED — reclassified `OPEN` and reworded as untested design requirements |
| XA-05 | MINOR | MC21-08 checked that the validator contains its own constant (self-referential) | ACCEPTED RESIDUAL — gate strings are emitted from the canonical projection; a broader source comparison is future hardening |
| XA-06 | MINOR | Unused `inventoryParityProblems` helper; rendered parity relies on e2e | ACCEPTED RESIDUAL — rendered ES/EN parity is asserted by Playwright; dead-code cleanup deferred |
| XA-07 | MINOR | MC20-32 read only `git status`, so committed out-of-scope files would pass | CLOSED — now unions working tree with `git diff --name-only <base>` and checks both |
| XA-08 | MINOR | MC20-30 used 3 markers and passes when no build exists | PARTIALLY CLOSED — marker set extended to six (incl. family edition ids); build-presence requirement retained as a CI concern |
| XA-09 | MINOR | Provider negative coverage in e2e was only 2 names | CLOSED — e2e asserts absence of all eight mandated providers |
| XA-10 | MINOR | `allStrings` omitted `CATALOG_SHARED`, so shared copy escaped scans | CLOSED — shared strings included; MC20-38 reconciled to the real registry state |
| XA-11 | MINOR | WEATHER cited gate literals that do not exist in the canonical JSON | CLOSED — cites `providerRightsGranted:false` / `forecastAccuracyClaimed:false` |
| XA-12 | MINOR | Source references checked for file existence only, not fragment content | ACCEPTED RESIDUAL — `#fragment` resolution requires structured citations; documented as a known guard limitation |
| XA-13 | INFO | Copy/comments: constant banners, a two-viewport comment vs four, unused constants | ACCEPTED INFO — no claim or gate impact; mobile viewport breadth recorded as a testing gap |

## 4. External re-audit (Sonnet 5.5, static) — residuals and closure

Verdict returned: `NEEDS_REVISION (narrow)` — all seven repaired findings verified as closed by
reading, plus one residual of the XA-04 class and four small test-quality defects.

| ID | Severity | Finding | Disposition |
| --- | --- | --- | --- |
| R-1 | MINOR (must fix before acceptance) | `sense.comp.licence.calibration` was `VERIFIED_REPO` for an unimplemented hardware behaviour | CLOSED — reclassified `OPEN` and reworded as an untested design requirement |
| R-2 | MINOR | The "negation covers every match" test was vacuous (`±0,1` triggered a different rule) | CLOSED — test input changed to `Sin SLA garantizado, SLA garantizado` |
| R-3 | MINOR | A wholly absent localized field was skipped silently | CLOSED — required hero fields are now checked explicitly |
| R-4 | MINOR | Dead `continue` at the end of a loop in `bilingualTextProblems` | CLOSED — removed |
| R-5 | MINOR | MC20-32 inspected `git status` only | CLOSED — see XA-07 |

## 5. Final verification record (Lead-measured, unrestricted environment)

| Command | Result |
| --- | --- |
| `node scripts/build-mc20-catalog-data.mjs --check` | exit 0 — byte-stable, 3 generated files |
| `npm run test:mc20` | exit 0 — 50/50 PASS |
| `npm run test:mc20:unit` | exit 0 — 39/39 PASS |
| `npm run test:mc20:e2e` | exit 0 — 60/60 PASS (12 routes, axe clean, SSR/hydration) |
| `npm run build` | exit 0 — 96 prerendered routes, 168 browser files, 0 catalogue identifiers |
| `npm run test:landing:unit` | exit 0 — 45/45 PASS |
| `npm run test:design-system` | exit 0 — 38/38 PASS |
| `npm run format:check` | exit 0 — all matched files formatted |
| `npm run test:financial` | exit 1 — 76/77, only inherited `FINANCIAL_V18` |
| Adversarial injection (`Precio 149 euros`) | rejected — MC20-15 and MC21-05 fail, 48/50; reverted byte-identically |

## 6. Residuals and limits

```text
OPEN_BLOCKING = 0
OPEN_MAJOR = 0
ACCEPTED_MINOR = XA-05, XA-06, XA-08 (partial), XA-12
ACCEPTED_INFO = XA-13
AUDIT_EXECUTION = the two external audits were static-only; execution evidence is internal + Lead
RESIDUAL = professional English review; manual WCAG 2.2 AA / assistive-technology review;
           these are inherited external limitations, not MC-21 defects
```

## 7. Verdict

```text
MC21_INDEPENDENT_REVIEW = ACCEPT_INTERNAL_SCOPE
MC21_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE
MC21_VERDICT = PARTIAL
```

The external re-auditor's recommendation was expressly conditional on the R-1 relabelling and on the
commands passing; both are now satisfied and measured above. The internal scope is accepted. No
publication, indexation, commerce, deployment or MC-22 start is authorised by this verdict, and no
legal gate is cleared.
