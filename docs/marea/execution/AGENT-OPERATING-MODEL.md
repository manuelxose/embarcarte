# MAREA — Agent operating model (MC-01)

Status: ACTIVE for the MC milestone series. Owner: EMBARCARTE / MAREA program.
Verified environment: DeepSeek Harness Desktop `0.2.1-rc.5`, profile `desktop`
(see `HARNESS-SETUP.md` for the full capability audit). Repo branch policy and
delivery rules are in `AGENTS.md` and the MC delivery reports.

This document defines how the agent organization executes future milestones:
who may decide, who may write, how work is delegated, how it is reviewed and
how failures are recovered. It is a process contract, not evidence that any
future milestone has passed.

## 1. Roles

| Role | Agent Teams target | Mandate | Typical write scope |
|---|---|---|---|
| Lead / Technical Program Director | `lead` | Plan, decompose, assign, own integration and Git, aggregate evidence, request independent review, report to the client | `AGENTS.md`, `docs/marea/execution/*` delivery/registry docs, final integration |
| Repository & Architecture Auditor (A) | `repo-auditor` | Map the real codebase, reusable features, debt, risks; recommend reuse over rewrites | its assigned audit document only |
| Harness & Tooling Engineer (B) | `harness-engineer` | Verify runtime, plugins, permissions, skills, tool access; own tooling configuration | harness/setup documents and tooling config only |
| Visual & Brand Systems Specialist (C) | `visual-specialist` | Asset requirements, image pipeline contracts, visual consistency, licensing of assets | asset pipeline documents and `docs/marea/assets/` |
| Skills Engineer (D′) | `skills-author` | Install audited third-party skills and author MAREA-specific skills; prove discovery | `.dsh/skills/` or `.agents/skills/` |
| QA & Independent Reviewer (D) | spawned per milestone | Review the actual diff and configuration, re-run gates, inspect supply chain, report defects | independent review report only |

Rule: the reviewer must never be the author of what it reviews. In MC-01 the
Lead authored integration artefacts and a separate `qa-reviewer` verified them.

## 2. Authority and ownership

- The Lead is the only agent allowed to run write Git commands
  (`add`, `commit`, `checkout`, `branch`, `push`, `merge`, `tag`). Teammates may
  run read-only Git (`status`, `log`, `diff`, `show`, `ls-files`).
- The Lead is the only agent allowed to create/modify `.github/`, `package.json`,
  `src/`, `scripts/`, `deploy/`, root config and `AGENTS.md`, unless a task
  explicitly assigns such a file with an exclusive write scope.
- Every write task declares an exclusive write scope (file or directory prefix)
  on the shared task board. Two agents never write the same path concurrently.
  Shared tasks are advisory, not a filesystem lock: the Lead re-checks
  `git status` and the final diff before committing.
- Read-only investigation may run in parallel without limit (within member caps).
- Integration is sequential: one writer at a time per scope, Lead reviews and
  commits after the writer reports completion.

## 3. Delegation protocol (Agent Teams)

The installed `@deepseek-ai/dsh-experimental-agent-team-profile` bundle provides
`spawn_teammate`, `send_message`, `interrupt_agent`, `list_agents`,
`wait_agent` and the shared task board. Verified limits from the bundle patch:
`maxMembers: 8`, `maxTasks: 256`, `maxMessageBytes: 65536`. All members share
one working checkout; the bundle provides **no worktree isolation and no
filesystem locking**, and it disables the top-level `subagent`/`subagent_fork`
tools (Workflow children remain available).

Standard delegation sequence:

1. `team_task_create` — subject, complete self-contained brief, exclusive
   `write_scopes`, and `blocked_by` for work that must wait.
2. `spawn_teammate` (fresh context by default) with: repo path, branch and base
   commit, environment facts, exact deliverable path, "do not touch" list, and
   the shared task id to claim.
3. Teammate claims the task via `team_task_get` + `team_task_update(claim)`,
   performs the work, completes the task and sends a concise `send_message` to
   the Lead.
4. Lead inspects the working tree (`git status`, `git diff`), verifies the
   deliverable against its brief, and only then integrates/commits.
5. For milestones needing independent verification, spawn `qa-reviewer` with
   `blocked_by` set to the implementation tasks, hand it the branch and commit
   scope, and require a PASS/PARTIAL/BLOCKED/FAIL verdict with evidence.

A teammate prompt must be self-contained: fresh teammates do not inherit the
Lead's conversation. Prefer fork context only for follow-up work that genuinely
builds on already-completed Lead turns. Never assume a spawned teammate has the
Lead's findings unless they are in its prompt or in a repository file.

## 4. Context management

- Keep delegation prompts complete but lean: point to repository files and
  evidence paths instead of pasting large excerpts.
- Teammates must not dump large logs into their context; write logs to files
  (for example under a temporary directory) and read only the relevant tail.
- Each role returns a short structured summary (what changed, evidence,
  blockers, next input needed), not its full reasoning or transcript.
- The Lead keeps the durable program state in repository documents (registry,
  baseline, delivery reports), not only in chat.
- Context compaction is provided by the installed `dsh-compaction*` packages;
  long sessions should rely on repository evidence as the source of truth.

## 5. Model selection

- Verified session/teammate model: `deepseek-flash` (team roster). The runtime
  exposes model-selection UI packages (`dsh-client-ui-model-selection`,
  `dsh-agent-default-model`) but the agent tool surface does not expose a
  per-task model override; do not invent model names or claim a stronger model
  was used.
- Consequence: quality assurance relies on **independent review, real command
  evidence and deterministic gates**, not on swapping in a stronger model.
- When a task is high-risk (security, payments, safety-related marine control,
  legal claims), require: narrower scope, explicit acceptance tests, two-person
  verification (author + independent reviewer) and fail-closed decisions.
  Escalate to the human if evidence is insufficient rather than guessing.

## 6. Concurrency limits

- Hard runtime cap: 8 members (Lead + 7 teammates), 256 shared tasks.
- Practical MC limit: Lead + 4–5 active specialists. More agents are only worth
  spawning when their write scopes and evidence are truly independent.
- Parallel pattern: read-only audits in parallel → sequential integrated writes
  → independent review after implementation.
- Never parallelize two agents over the same file/directory. Never let a
  teammate run a formatter, code generator or build that rewrites tracked files
  while another agent is editing the same scope.

## 7. Review and evidence rules

The independent reviewer must:

1. Inspect the actual diff and configuration files, not the delivery summary.
2. Re-run the relevant gates from the repository's own scripts.
3. Check claims inside documents against real files/commands (no fabricated
   plugin installation, no invented model/credential, no unverified screenshot).
4. Check secrets, supply chain (new dependencies/scripts), and permissions.
5. Return `PASS`, `PARTIAL`, `BLOCKED` or `FAIL` with per-criterion evidence and
   a defect list classified as blocking / non-blocking.

Milestone status rules:

- `PASS` — every criterion verified with evidence in the working tree.
- `PARTIAL` — verified work committed, but at least one criterion is BLOCKED by
  a concrete, recorded external condition (credentials, legal clearance,
  hardware, permissions).
- `BLOCKED` — work cannot proceed without an external unblock.
- `FAIL` — a required behaviour or quality gate is violated.

Documentation alone never PASSes a functionality milestone. Financial, legal,
RF/conformity, sea-trial and stock claims require their own evidence class.

## 8. Handoff and milestone closure

Every milestone closes with: updated `MASTER-PROMPT-REGISTRY.md` status,
`MC-XX-BASELINE`-style evidence where relevant, `MC-XX-DELIVERY.md`, a review
report from an independent reviewer, a reviewable branch and (when GitHub access
allows) a draft PR. The delivery report must list files changed, commands run,
test output, review findings, risks, missing approvals and the exact inputs the
next milestone needs.

No milestone may merge to `main`, deploy to production, spend on chargeable
APIs, change production secrets or publish unapproved commercial claims without
explicit human authorization.

## 9. Failure recovery

| Failure | Response |
|---|---|
| Teammate blocked or errors repeatedly | Lead interrupts/reassigns; task returns to board; record the blocker |
| Wrong or out-of-scope write | Lead stops the writer, restores the file from Git, documents the incident |
| Gate regression | Classify pre-existing vs new; fix critical regressions inside scope; rerun gates |
| Environmental limitation (e.g. Windows CRLF vs Prettier `lf`) | Record the environment cause and the CI-equivalent result; do not change application code to satisfy a local artifact |
| Missing capability/credential | Mark criterion BLOCKED with the exact variable/API name and next action |
| Conflicting concurrent edits | Lead serializes writes; rebase the intended change on the current content; never overwrite another agent's work silently |

## 10. Communication language

- Internal technical documentation and code: English.
- Customer-facing commercial content: Spanish and English, both required.
- Delivery reports to the client: Spanish, concise and evidence-rich.
