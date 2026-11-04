# MC-20 — Independent audit and remediation log

| Field | Value |
| --- | --- |
| Milestone | MC-20/36 — NAV, HUB, AIS internal catalogue |
| Base | `3490c0f` (verified MC-18 delivery HEAD) |
| Branch | `feature/marea-mc20-nav-hub-ais-catalog` |
| Scope audited | MC-20 internal implementation only: `src/app/marea-catalog/`, `preview/landing/`, MC-20 scripts/E2E, `docs/marea/catalog/` |
| Method | Three independent agents that did not implement the work; findings classified BLOCKER/MAJOR/MINOR/INFO; remediation re-verified |

## 1. Independence and execution limits (stated, not hidden)

| Reviewer | Model family | Execution | Limitation |
| --- | --- | --- | --- |
| Reviewer A | Anthropic Claude (via Claude Code) | **Not available** — shell denied by its sandbox | File-level review only; 11 findings; no command results |
| Reviewer B | OpenAI Codex (gpt-6.1-terra) | Attempted — child-process spawn `EPERM` in its sandbox | Builds and validators that spawn children failed for environment reasons; partial results only |
| Reviewer C | DeepSeek v4-pro (independent verifier agent) | **Executed fully** | Same host but a separate agent, separate context, read-only instruction |

Reviewer C's first run found two MAJOR defects (IV-01, IV-02) that had been introduced or missed by
the implementer. After remediation, Reviewer C re-executed and confirmed `test:mc20` at **39/40**
with only MC20-40 failing because this audit file did not yet exist, plus 21/21 unit and 35/35
Playwright. This document is that missing artifact; the final 40/40 run follows it.

The reviewers are not the implementer. No reviewer was asked to certify its own work.

## 2. Findings and dispositions

### Reviewer A (file-level)

| ID | Severity | Finding | Disposition |
| --- | --- | --- | --- |
| IR-01 | MAJOR | Validator evidence recorded FAIL 36–37/40 against a report implying success; audit file missing | CLOSED — final run is 40/40 and this audit exists; report updated |
| IR-02 | MAJOR | MC20-17 compared the same inventory object to itself; parity check was self-fulfilling | CLOSED — MC20-17 now runs `bilingualTextProblems` over real localized pairs; unit tests reject empty and identical pairs |
| IR-03 | MINOR | Claim rules missed certification/NMEA/warranty/shipping/positive collision claims | CLOSED — rules added for certification, NMEA compatibility, warranty term, shipping, collision avoidance, transmission and universal compatibility, with clause-negation awareness and negative controls |
| IR-04 | MINOR | MC20-37 vacuous; MC20-33 rewrote the generated file; `statusLabel(undefined)` returned `undefined` | CLOSED — MC20-37 validates 15 rows/statuses; MC20-33 uses the non-writing `--check`; malformed input returns `UNKNOWN` |
| IR-05 | MINOR | Test order could make MC20-32 fail after landing evidence regeneration | CLOSED — test order and restore step documented in the test report; scope guard intentionally rejects un-restored evidence |
| IR-06 | MINOR | Readiness mapping was lossy and never reached BLOCKED; NAV hardware shown as NOT_READY | CLOSED — explicit mapping (`COMPLETE_TARGET_SPECIFICATION` → READY, N/A/not-started → NOT_ASSESSED, blocked → BLOCKED); raw code always shown |
| IR-07 | MINOR | `COMPATIBILITY_UNTESTED` was tied to compliance status; MC-18 frame dependency and fixture reuse undocumented | CLOSED — compatibility restriction is now the measured 0-row fact; architecture document records the MC-18 frame dependency and the MC-17 canonical fixture reuse |
| IR-08 | MINOR | AIS capabilities used present tense despite OPEN evidence | CLOSED — AIS and HUB capabilities now use intended/designed framing; each capability still carries its evidence class |
| IR-09 | INFO | Preview isolation controls consistent with the contract | RECORDED — no action |
| IR-10 | INFO | Projection consistent with canonical expectations (partial read) | RECORDED — full comparison is automated by MC20-02/03/04/09 |
| IR-11 | INFO | 59/60 MC-18 result not reproducible by Reviewer A | CLOSED — independently reproduced as 59/60 pre-commit (MC18-56 only), explained as branch scope |

### Reviewer B (attempted execution)

| ID | Severity | Finding | Disposition |
| --- | --- | --- | --- |
| IR2-01 | MAJOR | Validator evidence recorded FAIL 31/40 while the report claimed 40/40; child-process EPERM caused 8 environment failures | CLOSED — final run executed in the unrestricted environment is 40/40; report updated |
| IR2-02 | MINOR | Claim pattern missed "compatible with NMEA 2000" | CLOSED — ES/EN variants added and unit-tested |

### Reviewer C (executed)

| ID | Severity | Finding | Disposition |
| --- | --- | --- | --- |
| IV-01 | MAJOR | `universal-compatibility` rule false-positived on the legitimate negated HUB limitation, making MC20-15 fail | CLOSED — clause-local negation awareness (`NEGATABLE` + `isNegatedClause`); both real negated ES/EN strings added as controls; MC20-15 passes |
| IV-02 | MAJOR | Test report claimed 40/40 while the measured run was 38/40 | CLOSED — the report records the final measured run; this audit was the only missing check |
| IV-03 | MINOR | Negative controls omitted the real negated strings | CLOSED — both strings added |
| IV-04 | MINOR | English word order "universal plug-and-play" was not covered | CLOSED — alternative pattern added and a positive control asserts rejection |

Final independent re-execution after IV-01/IV-03: `test:mc20:unit` 21/21, `test:mc20` 39/40 with
MC20-40 as the only expected failure, Playwright 35/35. After the IV-04 fix, the full gate was
re-run in the implementation environment with the audit artifact present.

## 3. Final verification record

| Command | Result |
| --- | --- |
| `node scripts/build-mc20-catalog-data.mjs --check` | PASS — 3 generated files up to date |
| `npm run test:mc20` | PASS — 40/40; evidence `docs/marea/catalog/evidence/validator-run.json` |
| `npm run test:mc20:unit` | PASS — 21/21 |
| `npm run test:mc20:e2e` | PASS — 35/35 |
| `npm run build` | PASS — 96 prerendered routes, 0 catalogue identifiers |
| `npm run build:landing:preview` | PASS |
| `npm run test:landing:unit` | PASS — 45/45 |
| `npm run test:landing:e2e` | PASS — 44/44 |
| `npm run test:landing` | 59/60 pre-commit (MC18-56), 58/60 post-commit (MC18-30 + MC18-56) — branch-scope invariants only |
| `npm run test:financial` | FAIL 76/77 — inherited `FINANCIAL_V18`, preserved |
| `npm run format:check` | PASS |

## 4. Residual findings and external limits

No BLOCKING or MAJOR finding remains open.

```text
OPEN_BLOCKING_OR_MAJOR = 0
OPEN_MINOR = 0
RESIDUAL = professional English review; manual WCAG 2.2 AA / assistive-technology review;
           AIS decoder licence (DEC-04); HUB hardware selection; 0 measured compatibility rows;
           inherited FINANCIAL_V18 and MC16_FINAL_02
```

The claim guard is heuristic: it rejects the enumerated claim families and their tested variants,
not every possible paraphrase. This residual limitation is recorded, not hidden.

## 5. Verdict

```text
MC20_INDEPENDENT_REVIEW = ACCEPT_INTERNAL_SCOPE
MC20_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE
MC20_VERDICT = PARTIAL
```

The internal scope is accepted. No publication, indexation, commerce, deployment or MC-21 start is
authorised by this verdict.
