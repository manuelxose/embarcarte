# MC-23 — Delivery record

**Milestone:** MC-23 — Bundle comparison and upgrade-path UI
**Branch:** `feature/marea-mc23-integration` (local only)
**HEAD:** `ad0ab43` · **Base:** `6ad4fec`
**Verdict:** **PARTIAL** — `MC23_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE`; `MC23_VERDICT = PARTIAL`

## 1. Worktrees (ENGINE-03, one writer each)

| Worktree id | Branch | Writer | Purpose |
|---|---|---|---|
| `mc23-a-domain` | `feature/marea-mc23-a-domain` | agent-domain (DeepSeek v4-pro) → captain | Domain model |
| `mc23-b-ui` | `feature/marea-mc23-b-ui` | agent-ui (GLM 5.3 Flash) | Angular components |
| `mc23-c-validator` | `feature/marea-mc23-c-validator` | agent-verify (MiniMax M3.1 Flash) | Adversarial tests |
| `mc23-d-e2e` | `feature/marea-mc23-d-e2e` | agent-content (MiniMax M3.1 Flash) | Bilingual content |
| `mc23-int` | `feature/marea-mc23-integration` | captain | Integration + verification |

All branched from `6ad4fec`; no two writers shared a tree; no writer ran git write commands.

## 2. Task DAG and outcomes

| Task | Owner (actual) | Route | Outcome |
|---|---|---|---|
| t1 domain | agent-domain (failed) → captain | deepseek-v4-pro / deepseek-flash | completed, attempt 2 |
| t2 UI | agent-ui | openrouter / z-ai/glm-5.3-flash | completed, attempt 2 |
| t3 content | agent-content | openrouter-minimax / minimax-m3.1-flash | completed, attempt 4, scope reduced |
| t4 tests | agent-verify | openrouter-minimax / minimax-m3.1-flash | completed, attempt 10, scope reduced |

Scope reductions for t3/t4 were made because the OpenRouter MiniMax route repeatedly exhausted context on multi-file deliverables. A direct write probe proved the route itself works; the limitation was task size, not routing.

## 3. Commits on the integration branch

```text
ad0ab43 fix(mc23): apply round-3 low-severity copy and import findings
292464d fix(mc23): close round-2 review findings and gate the real Angular build
e6abe1b test(mc23): make the unit stage assert the domain and actually fail when it breaks
a5f98ad feat(mc23): wire the comparison and selector into a real preview section
a3bfa93 fix(mc23): generate bundle data from the contract and close review findings
490932b test(mc23): bundle-comparison validator with twelve content-bound checks
6cfaaf0 Merge branch 'feature/marea-mc23-d-e2e'
0e7340d Merge branch 'feature/marea-mc23-c-validator'
12f4368 Merge branch 'feature/marea-mc23-b-ui'
5efcb8f Merge branch 'feature/marea-mc23-a-domain'
```

One merge conflict occurred, in `scripts/build-mc20-catalog-data.mjs` (each branch bootstrapped the confined runner independently). It was resolved by hand keeping `checkOutputs()`, not by taking ours/theirs blindly.

## 4. Gate results (executed)

| Gate | Result |
|---|---|
| `node scripts/test.mjs` | 5/5 stages green |
| MC-20/MC-22 catalogue validator | 56/56 PASS |
| MC-23 catalogue validator | 15/15 PASS |
| MC-23 unit tests | 16/16 |
| `node scripts/run-tsc.mjs` | PASS (both projects) |
| `npm run build` | complete |
| `npm run build:landing:preview` | complete |
| `node scripts/build-mc23-bundle-data.mjs --check` | up to date |

No test, typecheck, build or gate was skipped or reported as passing without execution.

## 5. Open findings

| ID | Severity | Where | Status |
|---|---|---|---|
| F-01 | medium | `scripts/mc20-catalog-guards.mjs` — bare availability claim | OPEN, inherited |
| F-02 | medium | `scripts/mc20-catalog-guards.mjs` — unqualified guarantee | OPEN, inherited |
| F-2 | low | upgrade-path comparison by id only | OPEN, recorded |
| F-15 | low | `inclusionFor` unknown edition → `NOT_INCLUDED` | OPEN, recorded |

## 6. Authorisation status

Nothing was merged into `main` or any feature branch, nothing was pushed, deployed or published, and MC-24 was not started. The integration branch remains local for the product owner's decision.
