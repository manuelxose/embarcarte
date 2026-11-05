# MC-21 — Agent execution and model-routing report

Milestone MC-21/36, branch `feature/marea-mc21-weather-sense-watch-catalog`, base `115a1ac`,
implementation `f2609a8`. Coordinator: the Lead (captain) on the AgentTeams team `marea-mc21`.

Monetary cost is **UNKNOWN** in this installation: the provider does not report spend to the
harness. Token usage is recorded only where the provider reported a sample; otherwise UNKNOWN.
External Claude Code execution is `SUBSCRIPTION_UNPRICED`, never zero cost.

## 1. Roster and routes

| Member | Role | Route | Independence |
| --- | --- | --- | --- |
| architect | Architecture & roadmap | `deepseek-official` / `deepseek-v4-pro`, reasoning inherited (high) | Did not implement |
| product | Product & marine engineering | `deepseek-official` / `deepseek-v4-pro` | Read-only |
| implementer | Angular implementation | `deepseek-official` / `deepseek-v4-pro` | Sole writer |
| verifier | Independent QA & verification | `deepseek-official` / `deepseek-v4-pro` | Did not implement |
| security specialist | Security, legal & licensing (native subagent) | `deepseek-official` / `deepseek-v4-pro` | Separate context, read-only |
| external auditor | Independent audit (Claude Code) | `claude-opus-5-5` (historical, single static run) | Different model family; separate context |
| external re-auditor | Remediation re-audit (Claude Code) | `claude-sonnet-5-5` | Model ceiling imposed by the product owner (D-088) |

Discovery verified the routes before use: `deepseek-official` advertised `deepseek-flash` and
`deepseek-v4-pro`; Claude Code reported `claude-sonnet-5-5` on smoke test. The first external audit
used `subagent_claude_code_opus_55`; after the product owner's instruction of 2026-11-05, **no
further Opus 5.5 use is authorised** and the external ceiling is Sonnet 5.5 (decision D-088).

## 2. Task execution

| Task | Owner | Attempt | Result | Notes |
| --- | --- | --- | --- | --- |
| t1 scope contract, DAG, ownership, identity map | architect | `45a7f190` | completed | read-only; found the handoff batch imprecision and the order conflict |
| t2 product truth & limitation matrix | product | `c9ade7a6` | completed | read-only; no spec-vs-MC16 conflict |
| t3 six-family implementation | implementer | `c72d1e90` | completed | sole writer; all declared commands green |
| t4 acceptance & governance package | architect | `0b33e342` | completed | 25-row matrix, risk register, handoff |
| t5 independent verification | verifier | `03849a4e` | completed | PASS; 8/8 commands re-run; found F-1 (medium) |
| t6 repair F-1 | architect → captain | `dea458c0` (failed) → `b5bfced6` | completed | member session blocked by named-pipe EPERM; captain re-ran and closed |
| t7 independent review | verifier | `cd420af7` | completed | verdict `pass`, 0 findings |
| t8 record set | architect → captain → product | (quota failure) → `91b83ada` → `e88d1eb1` | completed | member route hit `Insufficient Balance`; the record set was completed by the captain and reconciled by the product member with no edits |
| t9 external-audit repair | implementer | `984fad3f` | completed | closed XA-01..04, XA-09..11; unit suite 33→39 |
| external audit | Claude Opus 5.5 (Claude Code) | static only | `NEEDS_REVISION` | PowerShell denied in the auditor session; 4 MAJOR + 9 MINOR/INFO findings, all dispositions in `MC21-INDEPENDENT-AUDIT.md` |
| external re-audit | Claude Sonnet 5.5 (Claude Code) | — | recorded in `MC21-INDEPENDENT-AUDIT.md` | model ceiling after the product owner's instruction (D-088) |

## 3. Failures and dispositions (not hidden)

| Failure | Cause | Disposition |
| --- | --- | --- |
| `npm run test:mc20` exit 1 with 9 `spawnSync git/node EPERM` | member session's Windows named-pipe sandbox boundary on the validator's `execFileSync` pipes | Captain re-ran in the unrestricted environment: 50/50. No code change; repair re-gated on measured evidence. |
| architect member turn failed mid-t8 (`Insufficient Balance`, code QUOTA) | provider account balance exhausted for that member route | Captain took over t8 and completed the documentation from the measured evidence; no code impact. |
| F-1 named-provider guard incomplete | guard covered 2 of 8 mandated providers | Repair t6 extended to all 8 with word-boundary matching + 8 negative controls; re-verified by t7 with injected names rejected. |
| External audit could not execute commands | PowerShell denied in the Claude Code audit session | Audit recorded as static-only with verdict `NEEDS_REVISION`; findings verified by the captain against canonical data and repaired in `f7d3a3a`; a Sonnet 5.5 re-audit followed. |
| XA-01 / XA-04 live inaccuracies escaped internal verification | the internal verifier and reviewer checked presence and consistency, not full-tuple bundle composition or evidence-class appropriateness | Repaired; MC20-09 strengthened to a full-tuple comparison; evidence-class mislabels corrected. Recorded as an internal-verification limitation, not hidden. |

## 4. Verification results

| Check | Result |
| --- | --- |
| `npm run test:mc20` | 50/50 PASS (captain, verifier and reviewer each re-ran) |
| `npm run test:mc20:unit` | 39/39 PASS (33/33 before the external-audit repair) |
| `npm run test:mc20:e2e` | 60/60 PASS (12 routes, axe clean, SSR/hydration) |
| `npm run build` | PASS; 96 prerendered routes; 0 catalogue identifiers |
| `npm run test:landing:unit` | 45/45 PASS |
| `npm run test:design-system` | 38/38 PASS |
| `npm run format:check` | PASS |
| `npm run test:financial` | FAIL 76/77 — inherited `FINANCIAL_V18`, preserved |
| Independent review | `pass`, 0 BLOCKING / 0 MAJOR / 0 MINOR / 0 INFO |
| External audit (Claude Opus 5.5, static) | `NEEDS_REVISION`: 4 MAJOR, 9 MINOR/INFO; dispositions in `MC21-INDEPENDENT-AUDIT.md` |
| External re-audit (Claude Sonnet 5.5) | recorded in `MC21-INDEPENDENT-AUDIT.md` |

## 5. Parallelism actually demonstrated

- t1 and t2 ran concurrently as independent read-only investigations.
- The security/legal specialist ran concurrently with t1/t2 in a separate context.
- t4 ran concurrently with the start of t3.
- The external Claude audit ran concurrently with the documentation phase.
- Concurrency was restricted to read-only work; the working tree had a single writer at any moment
  (implementer, then captain). No two agents wrote the same checkout concurrently.

## 6. Cost observations

| Item | Observation |
| --- | --- |
| Native routes (DeepSeek v4-pro) | token usage: UNKNOWN (no provider sample surfaced); monetary cost: UNKNOWN |
| Claude Code (Opus 5.5, static audit only) | SUBSCRIPTION_UNPRICED; not an AgentTeams route; retired after D-088 |
| Claude Code (Sonnet 5.5, re-audit) | SUBSCRIPTION_UNPRICED; current external ceiling |
| Repairs | 1 bounded repair (2 files); within the two-attempt cap |
