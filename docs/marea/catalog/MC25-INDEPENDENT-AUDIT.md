# MC-25 independent audit and remediation

**Audited commit:** `c8eb23b` (branch `feature/marea-mc25-sku-governance`, baseline `c4d9d76`)
**Auditors:** two independent models, neither of them the implementation author.
**Remediation:** applied after the audits and re-verified on the final commit.

## 1. Auditor A — Claude Sonnet 5.5 (read-only static review)

**Constraint encountered:** the shell was denied in that session, so no command,
probe or test was executed. The auditor stated this explicitly and its verdict is
based on code reading only.

**Verdict:** `NEEDS_REVISION` (static), with 10 findings.

| ID | Severity | Finding | Disposition |
| --- | --- | --- | --- |
| AUD-01 | MAJOR | F-2 repair vacuous for target-less paths: additions with no `X to Y` target were put in `verifiedAdditions` with `lineId: NO_BUNDLE_TARGET`, so a fabricated path could look verified | **FIXED** — target-less edition tokens now go to `unverifiedAdditions`; a target-less path can never claim a verified relationship. Tests `f2-10`, validator `MC25-14` |
| AUD-02 | MINOR | `TARGET_EQUALS_SOURCE` only checked path text; `UM-SL-02`/`UM-CP-02` record the target in `fromBundleId` without comment | **FIXED** — `FROM_BUNDLE_IS_TARGET_CONTEXT` note surfaced; test `f2-11`, validator `MC25-14` |
| AUD-03 | MAJOR | Verdict badge was hardcoded (`tone="critical"`, `verdictNotOrderable`), not derived from `decision().commercialOrderability` | **FIXED** — `readiness-verdict.ts` derives the verdict; the component binds label/tone/code. Test `v1`, validator `MC25-20`, E2E asserts the derived code |
| AUD-04 | MINOR | `READINESS_FACTS.orderableEditions/orderableBundles` were literals `0`; bundle orderability was a literal `false` | **FIXED** — facts computed from the matrices; bundle orderability derived (editions + availability + safety gate). Test `r11`, validator `MC25-04`/`MC25-05` |
| AUD-05 | MAJOR | SHA-256 provenance could drift on a `core.autocrlf=true` checkout: `.gitattributes` did not pin the MC-16/MC-08 contract JSONs | **FIXED** — `text eol=lf` added for `docs/marea/commerce-data/data/*.json`, `docs/marea/bundles/*.json` and `governance.generated.ts` |
| AUD-06 | MINOR | MC-25 stages were registered `optional: true` in the confined runner | **FIXED** — both MC-25 stages are required; a missing control fails the runner |
| AUD-07 | MINOR | `submitReviewAction` threw on `null`; a control-character `editionId` could inject a second audit line | **FIXED** — total function: safe action/principal/edition parsing, canonical-edition check, control characters stripped. Tests `a7`, `a8`, validator `MC25-11` |
| AUD-08 | MINOR | `transition()` returned `ok: true` for permitted transitions, easy to misread as applied | **FIXED** — result now carries `applied: false` on every path; test `l6` |
| AUD-09 | NIT | Preview CSP allows `'unsafe-inline'` | **ACCEPTED** — inherited loopback-only preview CSP; replacing it needs a nonce infrastructure outside this milestone. Recorded as residual |
| AUD-10 | NIT | Source map present in `dist/...` | **NOT APPLICABLE** — `dist/` is gitignored and is not a delivered artefact; no source map is committed |

## 2. Auditor B — DeepSeek V4-Pro (executed attacks)

**Verdict:** `PASS_INTERNAL_SCOPE`. Every required attack was executed against the
loaded modules, not trusted from the suite. No BLOCKER, no MAJOR.

Verified dimensions (with real evidence): direct invocation of all 7 actions ×
{real, forged `VERIFIED_SESSION` principal}; mutation at depth (push throws,
assignment no-ops/throws depending on strict mode, values unchanged, `isFrozen`);
forgery (`assertNotOrderable` throws, arity 1, no facts injection); exhaustive
orderability (26+26+9+6 objects, 0 orderable); N/A (software permitted, hardware
system FAILED, non-permitted N/A blocks); unknown input (null, empty, lowercase,
trailing space, object, array, prototype pollution); F-15 (typed states, no
permissive outcome); F-2 (15/15 VALID, fabricated rejected with correct codes);
route/isolation (absent from public tables, both preview tables complete,
loopback + 403 + `X-Robots-Tag`); evidence drift (11/11 SHA-256 match,
`buildProjection().text` byte-identical).

| ID | Severity | Finding | Disposition |
| --- | --- | --- | --- |
| F-01 | NIT | "assignment throws in strict mode" is mode-dependent | **FIXED** — comment corrected; the freeze is the defence |
| F-02 | NIT | `combinePrerequisites` is exported and can return `orderable: true` for a hand-crafted array | **ACCEPTED** — documented test-only combinator, arity-1 engine, no facts injection; unit `r5`/`t3` prove it cannot forge a real decision |
| F-03 | NIT | verdict badge static (same as AUD-03) | **FIXED** by AUD-03 remediation |
| F-04 | NIT | bare `node scripts/check-mc20-catalog.mjs` needs the TS-register loader | **DOCUMENTED** — invocation contract recorded in the test evidence; supported invocations pass |
| F-05 | TRANSPARENCY | the validator/test commands rewrite the evidence JSON | **ACKNOWLEDGED** — evidence regeneration is the documented behaviour; no source file is modified by the audit |

The auditor also reported that the commanded `check-mc20-catalog.mjs` run wrote
`docs/marea/catalog/evidence/validator-run.json` (runAt/head/changed-path count).
That is the repository's evidence mechanism, not a source change.

## 3. Re-verification after remediation

All remediated findings were re-verified on the final commit with the full gate
set (typecheck, validator, adversarial unit, confined runner, Angular build gate,
catalog E2E, inherited suites). The exact results are in
`MC25-TEST-AND-BUILD-EVIDENCE.md` and the delivery record.

## 4. Author self-certification

The implementation author did not certify its own work: both audits were
performed by different models, and every finding above is either fixed with a
test or accepted with a stated reason. The residual items (AUD-09, F-02) are
recorded in `MC25-RISK-AND-REMEDIATION-REGISTER.md`.
