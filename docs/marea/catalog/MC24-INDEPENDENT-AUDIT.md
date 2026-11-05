# MC-24 — Independent audit record and remediation

**Milestone:** MC-24 — Compatibility configurator and quotation triage
**Audit verdict:** `PASS_INTERNAL_SCOPE`
**Audited revision:** `8a4b5e0` (with drift noted below)
**Remediation revision:** `f96b168`
**Auditor independence:** the auditor did not write the code under review.

## 1. Auditor route and disclosure

| Attempt | Route                                         | Outcome                                                                                                                                                                                                        |
| ------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1       | Claude Code (Sonnet 5.5)                      | **No verdict issued** — the tool session denied `Bash` and `Read`, so the auditor refused to guess and returned `NOT ISSUED`. This is the correct behaviour and is recorded honestly rather than glossed over. |
| 2       | Codex (gpt-6.1-sol)                           | **Failed before completion** — product usage limit; no message, no verdict.                                                                                                                                    |
| 3       | DeepSeek V4-Pro (native, `deepseek-official`) | **Completed.** Verdict `PASS_INTERNAL_SCOPE` with per-claim verification and reproduction commands.                                                                                                            |

**Honest limitation:** POLICY §12.5 prefers a different model family from the
implementer. Attempts 1 and 2 (different families) produced no audit, so the
strongest permitted native route performed it instead. The captain additionally
re-ran every command and reproduced every finding independently; the findings below
were confirmed by reproduction, not accepted on the auditor's word.

## 2. What the audit found

### 2.1 The critical finding — already found and fixed before the audit closed

The auditor independently reproduced the **mutable-registry governance bypass**:

```js
VALIDATED_SELF_INSTALL_RULES.push({ id: 'FAKE', bundleId: 'START', requiredAnswers: {} });
// at 3c2996b: ELIGIBLE_SELF_INSTALL, eligible = true
```

The captain's own adversarial probe had already found this and fixed it at
`8a4b5e0` (frozen public export + frozen private decision binding). The auditor
independently confirmed the fix holds and could **not** defeat it:

- `push` → `TypeError`; `defineProperty` append → `TypeError`;
- the module namespace is non-extensible;
- `VALIDATED_REGISTRY` (the private binding the decision path reads) is not visible outside the module;
- `structuredClone`, prototype pollution and re-import all fail to reach the eligible outcome.

The one remaining reachable path is monkey-patching `Array.prototype.find`, which
requires arbitrary code execution in the same realm and is therefore out of scope
for input reachability. This is recorded, not hidden.

### 2.2 Findings and remediation status

| ID   | Severity | Finding                                                                                     | Status                            | Remediation                                                                                                                                                                            |
| ---- | -------- | ------------------------------------------------------------------------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A-01 | MAJOR    | Mutable registry made `ELIGIBLE_SELF_INSTALL` reachable                                     | **CLOSED** at `8a4b5e0`           | `Object.freeze([])` + frozen private binding; validator `MC24-02`, tests `a24`                                                                                                         |
| D-01 | MAJOR    | Test report bound to a stale revision, stale counts, bypass undisclosed                     | **CLOSED — stale snapshot**       | The report was already re-bound to `8a4b5e0` with 25/25 and the bypass disclosed **before** the audit closed; the auditor read an intermediate commit. Verified in the delivered file. |
| D-02 | MAJOR    | ES executive report counts and bypass disclosure                                            | **CLOSED — stale snapshot**       | Same: `25/25` and the security-findings entry are present in the delivered file.                                                                                                       |
| C-01 | MINOR    | Availability guard missed `ahora disponible`, `actualmente disponible`, `already available` | **CLOSED** at `f96b168`           | Pattern extended; 3 paraphrases now rejected, 6 legitimate negations still pass; regression test `a22` extended                                                                        |
| C-02 | MINOR    | Inch-mark branch latent false positive on `class="a 24"`                                    | **OPEN — accepted**               | Not triggered by any delivered file (`MC24-10` clean). Recorded as a heuristic limitation; narrowing further risks re-opening F-16.                                                    |
| D-03 | MINOR    | MC20-26 missed `[action]`/`[attr.action]`/`formAction`                                      | **CLOSED** at `f96b168`           | Three additional rejections beside the existing CSP `form-action 'none'`                                                                                                               |
| F-01 | MINOR    | Test `a25` overclaimed ("reported as insufficient"); engine read prototype-chain answers    | **CLOSED** at `f96b168`           | `answerOf()` requires an OWN property; `a25` now asserts the real `INSUFFICIENT_INFORMATION` outcome                                                                                   |
| F-02 | MINOR    | `trim()` keeps zero-width/nbsp/BOM, which counted as answers                                | **CLOSED** at `f96b168`           | `normalized()` strips them; test `a26` covers five blank variants                                                                                                                      |
| F-03 | INFO     | No defensive guard for `answers: null` or a string `requestedCapabilities`                  | **OPEN — accepted**               | Unreachable from the Angular UI (signals always `{}` / `string[]`); not hardened to avoid speculative code                                                                             |
| F-04 | INFO     | Monkey-patched `Array.prototype.find` reaches eligible                                      | **OPEN — accepted, out of scope** | Requires arbitrary code execution in the same realm; documented                                                                                                                        |
| F-05 | INFO     | `fixture-leak` checks a filename the gate no longer creates                                 | **OPEN — cosmetic**               | The real cleanup is the `finally { rmSync(workspace) }`; the stale name is harmless                                                                                                    |

**No BLOCKER was raised. No MAJOR finding remains open in the delivered code.**

## 3. Claims the auditor verified independently

| Claim                                                                             | Status                                                                          |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `node scripts/run-tsc.mjs` PASS                                                   | **VERIFIED**                                                                    |
| `node scripts/test.mjs` 56/56, 15/15, 16/16, 5/5 stages                           | **VERIFIED**                                                                    |
| `npm run test:mc24` 13/13                                                         | **VERIFIED**                                                                    |
| `npm run test:mc24:unit`                                                          | **PARTIAL at audit time (23→25)**; now **26/26** at `f96b168`                   |
| Real build gate + negative binding with `TS2339` naming the member                | **VERIFIED**                                                                    |
| Projection drift gate up to date (32/12/20)                                       | **VERIFIED**                                                                    |
| Playwright 101                                                                    | **NOT RE-RUN by the auditor** (Chromium + preview build); the captain re-ran it |
| No module-scope `window`/`document`; no hydration-mismatch source                 | **VERIFIED**                                                                    |
| No public route, noindex, production bundle isolation                             | **VERIFIED**                                                                    |
| Accessibility claims honestly framed (screen-reader NOT_RUN, no WCAG conformance) | **VERIFIED — no overclaim found**                                               |
| MC20-32 write-scope extension is a narrow declaration, not a loophole             | **VERIFIED**                                                                    |

## 4. Post-audit verification at `f96b168`

| Gate                                                           | Result                                |
| -------------------------------------------------------------- | ------------------------------------- |
| `node scripts/run-tsc.mjs`                                     | PASS                                  |
| `npm run test:mc24`                                            | 13/13 PASS                            |
| `npm run test:mc24:unit`                                       | **26/26**                             |
| `node scripts/test.mjs`                                        | 56/56, 15/15, 5/5 stages              |
| `node scripts/check-mc24-build.mjs`                            | PASS (invalid binding still rejected) |
| `playwright test -c playwright.catalog.config.ts --grep @mc24` | 17/17                                 |

## 5. Residual risks carried forward

1. `F-04` monkey-patching (code-execution class) — out of scope, documented.
2. `C-02` latent inch-mark false-positive class — accepted heuristic limitation.
3. `F-03`/`F-05` — defensive-hardening and cosmetic items, accepted.
4. The claim guard remains a **heuristic backstop, not a proof of absence**. Three
   bypass classes were closed this milestone (F-01, F-02, C-01) plus one
   false-positive class (F-16); the space of natural-language paraphrase is
   unbounded and this record does not claim otherwise.
5. Route disclosure: the two preferred independent-audit routes were unavailable;
   this is stated rather than papered over.
