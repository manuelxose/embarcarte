# HARNESS-SETUP — DeepSeek Harness Runtime & Tooling Audit (MC-01)

**Author:** Agent B (Harness and tooling engineer) · **Date:** 2026-10-30
**Repo:** `C:\Users\Admin\Documents\workspace\embarcarte` · **Branch:** `feature/marea-mc01-agent-foundation` @ base `092ae74`
**Method:** read-only audit of the installed DeepSeek Harness Desktop runtime and this session's
effective tool catalog. No application code, configuration, plugin, deployment or credential was
modified. Unknowns are marked **NOT VERIFIED** with the blocker; they are not guessed.

**Status vocabulary:** VERIFIED / PARTIAL / NOT VERIFIED / BLOCKED. **Capability vocabulary:**
AVAILABLE / AVAILABLE-DISABLED / INSTALLABLE / REQUIRES CREDENTIALS / REQUIRES APPROVAL / NOT SUPPORTED.

---

## 1. Runtime, profile and platform

| Fact | Value | Evidence |
|---|---|---|
| Product | DeepSeek Harness Desktop (Electron) | `%LOCALAPPDATA%\Programs\DeepSeek Harness` |
| Runtime version | **0.2.1-rc.5** | `dsh --version` → `0.2.1-rc.5`; `desktop-runtime.json.release.version` |
| Launcher | `C:\Users\Admin\AppData\Local\Programs\DeepSeek Harness\resources\runtime\cli\bin\dsh.cmd` | invoked |
| Host protocol | 4 | `desktop-runtime.json.release.hostProtocolVersion` |
| Profile / dir | `desktop` / `C:\Users\Admin\.dsh\profiles\desktop` | `DSH_PROFILE`, `DSH_PROFILE_DIR` |
| Harness home | `C:\Users\Admin\.dsh` | `DSH_HOME` |
| Web GUI | `http://127.0.0.1:55752` | `DSH_WEB_URL` |
| OS | Windows 11 Home 10.0.26300 64-bit | `Get-CimInstance Win32_OperatingSystem` |
| Node / npm (system) | v24.18.0 / 12.0.1 | `node --version`, `npm --version` |
| Runtime Node / Electron | v24.21.0 / 44.7.0 | `desktop-runtime.json`; `process.version` under `ELECTRON_RUN_AS_NODE=1` |
| Runtime pnpm | 11.28.5 | `desktop-runtime.json.release.pnpmVersion` |
| PowerShell | 7.6.9, **ConstrainedLanguage** | `$PSVersionTable`, `$ExecutionContext.SessionState.LanguageMode` |
| Git | 2.38.0.windows.1 | `git --version` |
| Repo | branch `feature/marea-mc01-agent-foundation`, HEAD `092ae74`, origin `manuelxose/embarcarte` | `git status/rev-parse/remote -v` |

**Profile and CLI.** The desktop profile is managed exclusively by the Electron app:
`dsh --profile desktop --dump-config` → `error: profile "desktop" is managed exclusively by the
Electron application` (exit 1 — expected, not a defect). `dsh --help` documents
`dsh [--profile] <name> [options] [app-args...]` and `dsh plugin --profile <name> <pnpm-args...>`.
A profile is a layered patch stack: `package.json` → `dsh.profile.bundles`, then `cordis.patch.yml`
(user layer), then `--patch` overlays. This profile's bundles (read from
`C:\Users\Admin\.dsh\profiles\desktop\package.json`): `@deepseek-ai/dsh-base`,
`@deepseek-ai/dsh-web-app`, `@deepseek-ai/dsh-experimental-agent-team-profile`,
`@deepseek-ai/dsh-experimental-auto-review`.

**Runtime packaging.** `resources/app.asar` is 182,766,714 bytes; `app.asar/dsh/node_modules` holds
**194 top-level package entries** and **307 `@deepseek-ai/*` packages**, all `0.2.1-rc.5` — verified
by running the Electron binary as Node (`ELECTRON_RUN_AS_NODE=1 "<DeepSeek Harness.exe>"`) on a
script that reads `package.json` through Electron's asar-aware `fs`. `desktop-runtime.json` pins
`platform: win32`, `arch: x64`, `sharedPackages: 305`, `files: 17187`, `nodeVersion: 24.21.0`,
`pnpmVersion: 11.28.5`. The whole plugin ecosystem is vendored inside the app; no network install
is needed for the capabilities below.

**Current session.** Teammate `harness-engineer` in Team Lead session (roster: `lead`,
`repo-auditor`, `harness-engineer`, `visual-specialist`, `skills-author`). Route is
**`deepseek-official` / `deepseek-flash`** — roster reports `model: deepseek-flash`; session
projection cache records `"provider": "deepseek-official", "model": "deepseek-flash"`; the
`standard` preset persona is `You are a coding agent powered by the {{model}} model.` This delegated
session has **danger-full-access file policy**, **approval prompts disabled** (rejected
automatically), and cannot widen its permission scope.

---

## 2. Capability matrix

"Registered" means mounted in this session's tool catalog (confirmed by the tools this session can
call) and in the composition patches read from the asar.

| Capability | Status | Scope / evidence |
|---|---|---|
| File read/write/edit/glob/grep | **AVAILABLE** | `read`, `write`, `edit`, `glob`, `grep` registered and exercised (`dsh-tool-fs`, `dsh-tool-fs-search`). |
| Working-directory control | **AVAILABLE** | `working_directory` tool (`dsh-tool-working-directory`). |
| PowerShell shell | **AVAILABLE** | `pwsh` tool; Windows-only stack (`dsh-tool-pwsh` + `dsh-pwsh-sandbox`); `tool-bash` platform-disabled on win32. See §6.1. |
| Background jobs | **AVAILABLE** | `job_*` tools; smoke test: background `pwsh` job started, completed exit 0, output collected via `job_output` (`dsh-tool-jobs` + `dsh-jobs-local`). |
| Git | **AVAILABLE (via shell, no native tool)** | read-only `git status/branch/rev-parse/log/remote` executed. Write commands are prohibited by program rules, not by the harness. |
| Browser automation | **NOT SUPPORTED natively / via repo Playwright** | No browser tool in catalog; repo has `@playwright/test` 1.64.1 installed and cached Chromium (`ms-playwright/chromium-1234`, `chromium-1248`). |
| Screenshots / visual verification | **NOT SUPPORTED natively / Playwright only** | No screenshot tool; use repo Playwright. |
| Skill discovery + loading | **AVAILABLE** | `skill` tool + `dsh-skill-filesystem`; catalog changed live three times this session; two live loads succeeded (§4.3). |
| Subagents (`subagent`, `subagent_fork`) | **AVAILABLE-DISABLED** | Packages present (`dsh-tool-subagent`, `dsh-subagent-*`) but the Agent Teams bundle disables `tool-subagent`, `tool-subagent-fork`, `tool-subagent-control`, `tool-subagent-list-agents`; neither tool is in this catalog. |
| Agent Teams (roster, messaging, task board) | **AVAILABLE** | Bundle `dsh-experimental-agent-team-profile` active; tools `spawn_teammate`, `list_agents`, `send_message`, `interrupt_agent`, `wait_agent`, `team_task_*`; limits `maxMembers 8`, `maxTasks 256`, `maxMessageBytes 65536`. This audit runs on the board (task-2). |
| Workflow (`workflow`, JS orchestration) | **AVAILABLE** | `tool-workflow` registered, provider `workflow-ptc → spawn`; Team bundle keeps it. Not executed (would spawn parallel children in a shared checkout). |
| Compaction / context management | **AVAILABLE** | `compaction-basic`, `/compact` (`dsh-command-compact`), `compaction-tool-result-pruner` (8,192-char threshold), `compaction-image-offload`; spill policy `maxInlineTokens: 12500`. |
| Persistent memory store | **NOT SUPPORTED** | No memory plugin in the 307-package set, none mounted; durable state is session log/projections + profile config only. |
| Web search | **AVAILABLE** | `web_search` (`dsh-tool-web` + `dsh-web-search-deepseek`); profile patch selects `deepseek-search-api`; live query returned a source list. |
| Web fetch | **AVAILABLE** | `web_fetch` (`dsh-web-fetch-http`; profile patch selects `deepseek-fetch-api`); live `GET https://example.com/` → HTTP 200. Public HTTP(S) only; provider resolves and validates destinations. |
| MCP client | **AVAILABLE — unconfigured** | `dsh-mcp-client`, `dsh-mcp-resources`, `@modelcontextprotocol/sdk` present; **no server configured** in the desktop profile, so no `mcp__*` tools or prompt text. README: "No server is enabled by default." |
| Image generation | **NOT SUPPORTED** | No image-generation plugin in the 307 packages; only image processing (`sharp` for `dsh-attachment-local`) and image transport (`dsh-compaction-image-offload`, Files API); no image tool in catalog; no image API credentials. Blocker in §6.2. |
| Office documents (docx/xlsx/pptx/pdf) | **AVAILABLE** | Bundled skills `office`, `office-docx`, `office-xlsx`, `office-pptx`, `office-export-pdf`, `office-recalculate`, `office-render`; `libreoffice-kit` + `libreoffice-kit-win32-x64`; `dsh-office-to-pdf`; bundled Python 3 with numpy 2.3.5, pandas 3.0.1, python-docx 1.2.0, python-pptx 1.0.2, openpyxl 3.1.5, Pillow 12.3.0, lxml 6.1.3, XlsxWriter 3.2.9. No conversion executed here. |
| Session logs / observability | **AVAILABLE** | Durable zstd JSONL under `~/.dsh/sessions/<slug>/<session-id>/session.v4.jsonl.zstd`; `dsh-session-log-deepseek`; Web `Download session log` ZIP + `/export` (`dsh-session-log-export`); session stats/turn outline/feedback rows. |
| Session full-text search | **AVAILABLE-DISABLED** | `session-query-sqlite` mounts `:memory:` with `openAt: never` → content search disabled; sidebar search matches titles/workspaces only. |
| Telemetry (OTel) | **AVAILABLE-DISABLED (feedback-only)** | `dsh-otel` + `session-telemetry-otel`, default `FEEDBACK_ONLY` (`DSH_TELEMETRY_MODE`, `DSH_TELEMETRY_DISABLED`); anonymous id `~/.dsh/.anonymous-user-id`. |
| Model routing / inventory | **AVAILABLE (constrained)** | See §2.1. Default `deepseek-official` / `deepseek-flash`; per-session `/model` picker; Settings → Models; dormant multi-provider adapter. |
| Jobs & schedules | **AVAILABLE** | `job_*` (exercised) and `schedule_*` (`dsh-tool-schedule`, `dsh-schedule`) registered. Schedules not exercised (would create side effects). |
| `present`, goal, todo, ask-user, plan mode | **AVAILABLE** | Tools `present`, `create_goal/get_goal/update_goal`, `todo_write`, `ask_user_question`, `exit_plan_mode` all registered; not exercised (deliverable is a repo file; task pre-scoped). |
| Human approvals / risk gating | **AVAILABLE-DISABLED for teammates** | `dsh-user-approval` + `dsh-permission-presets` mounted; base policy `danger-full-access → never`, else `ask`; this teammate session pins `never`. |
| Auto-review preset | **AVAILABLE (bundle enabled)** | `auto-review` row inserted; README: selects `ask` approval policy and pre-reviews supported calls; a delegated child pins `never`, so denials are final. Not exercisable from here. |
| Plugin manager / market (GUI) | **AVAILABLE (not used)** | `dsh-plugin-manager`, `ui-plugin-manager`, `dsh-plugin-market`, `ui-plugin-market`, `host-plugin-inventory` present; model-facing `tool-plugin-manager`/`tool-plugin-market` disabled in the `standard` preset. **No plugin installed by this task.** |
| Git worktrees | **AVAILABLE-DISABLED** | `dsh-experimental-worktree` + `tool-worktree` packaged; off in shipped profiles and not enabled here; `working_directory` remains the supported checkout switch. |
| Terminal UI | **AVAILABLE (not exercised)** | web-app rows `terminal-controller`, `ui-sidebar-terminal`, `dsh-terminal`; not opened in this audit. |
| Speech-to-text / voice | **INSTALLABLE (not enabled)** | Experimental packages present, not in this profile's bundle list. |

### 2.1 Model routing — configurable vs not

- **Default is configuration:** `dsh-agent-default-model` configured by the base layer as
  `provider: deepseek-official`, `model: deepseek-flash`; provider/model/`reasoningEffort` are live
  Config fields persisted through the profile patch. Live sessions confirm this route.
- **Catalog (`dsh-llm-deepseek` README):** `deepseek-flash` (text- and image-input capable) and
  `deepseek-v4-pro` (text-only), both advertised at 1,048,576-token context; model ids pass through
  to the wire, so new DeepSeek ids need no re-registration, but GUI selection needs a catalog entry.
- **Reasoning effort:** `off | low | high | max`, default `high`, thinking on by default;
  `maxTokens` default 256,000.
- **Per-session selection:** `/model` command and composer picker over one per-session directory
  (`dsh-client-ui-model-selection`). **No choice at session creation**; addressed subagent sessions
  deliberately expose no independent model-selection contract (README).
- **Extra providers:** `dsh-llm-pi-ai` is mounted **dormant** — zero routes until a `llm-pi-ai:`
  settings section supplies provider profiles (written by Settings → Models), keys resolved per
  request via `apiKeyEnv`.
- **This session** is fixed to `deepseek-flash` by the Lead's spawn; teammates cannot switch route.
  An end-to-end non-DeepSeek provider switch is **NOT VERIFIED** (no provider profile/credential).

---

## 3. Installed bundles/plugins and what is active

| Layer | Bundle | Role (from its patch/README) |
|---|---|---|
| 1 | `dsh-base` | core: LLM + DeepSeek adapter, sessions/persistence, tool registry, fs + pwsh + jobs, skills, goals, plan mode, compaction, subagents, workflow, web search/fetch, MCP resources, sandbox/approval, telemetry — **96 inserted rows** in its `cordis.patch.yml` |
| 2 | `dsh-web-app` | Web/Desktop surface: server + browser client, agent-preset realm, model selection UI, settings pages, session export, terminal/workspace sidebars |
| 3 | `dsh-experimental-agent-team-profile` | team domain + 9 team tools + Team UI; disables the four legacy subagent tool rows; limits 8 members / 256 tasks |
| 4 | `dsh-experimental-auto-review` | inserts the `auto-review` row (LLM pre-execution reviewer + Auto permission preset) |

User patch `~/.dsh/profiles/desktop/cordis.patch.yml` overrides only UI/config rows: `ui-chat`
(transcript `standard`, usage `detailed`), `ui-settings`, `ui-settings-account`, and `web`
(`searchProvider: deepseek-search-api`, `fetchProvider: deepseek-fetch-api`).

**Effective composition.** The Web layer is a preset realm: host-plane rows (`tool-pwsh`, `tool-fs`,
`tool-fs-search`, `tool-jobs`, `tool-skill`, `tool-goal`, `tool-todo`, `tool-web`, `tool-subagent*`,
`tool-workflow`, `compaction-*`, `plan-mode`) are disabled there and the
`standard` preset (default: `agent-preset-registry.default: standard`) re-mounts them per session.
That preset adds persona, agent instructions, time context, pwsh/bash, fs+search, jobs, schedule,
skills, goal, plan mode, compaction, delegation (subagent+workflow), ask-user, todo, web, present.
The Agent Teams bundle then disables `subagent`/`subagent_fork` and adds the team tools — exactly
the catalog this session sees. **"Installed" ≠ "mounted for this session"; the preset is the
effective surface.**

**Nothing was installed by this task.** Agent Teams was already enabled by the profile bundle list,
so no `dsh plugin add` was needed or run. `.plugin-manager/logs/*/pnpm.log` exist but are empty; the
Electron app owns profile mutation.

---

## 4. Skills: roots, inventory and discovery verification

**Roots and rules** (`@deepseek-ai/dsh-skill-filesystem`): scanned in rank order —
100 `<project>/.dsh/skills`, 200 `<project>/.agents/skills`, 300 custom dirs, 400 `<dshHome>/skills`,
500 `<agentsHome>/skills` (here `C:\Users\Admin\.agents\skills`), 600 bundled
(`resources/runtime/office-skills`, plugin `assets/`). A skill is `<name>/SKILL.md` or `<name>.md`
**at the top level of a scanned root**; nested `**/SKILL.md` is deliberately not discovered.
Frontmatter requires `name` + `description`; optional `whenToUse`, `metadata`,
`disable-model-invocation`, `user-invocable`. The provider watches roots and refreshes the catalog
without restart. Project root = nearest ancestor containing `.git`; this repo uses `.agents/skills`
(rank 200).

**Installed inventory (verified on disk):** 7 project skills in `.agents/skills` —
`frontend-design` (71 lines), `web-design-guidelines` (39), `marea-product-strategy` (73),
`marea-premium-design` (60), `marea-angular-commerce` (64), `marea-asset-production` (57),
`marea-quality-gate` (69) — plus user `ui-ux-pro-max` (rank 500) and bundled
`office`, `office-docx`, `office-xlsx`, `office-pptx`, `office-export-pdf`, `office-recalculate`,
`office-render`, `diagnose-windows-sandbox-acl`. Session catalog after task-4 completed =
**16 skills** (7 project + 1 user + 8 bundled). Provenance is task-4's record (not re-verified here
beyond presence + frontmatter): `frontend-design` ← anthropics/skills @ `ca45fc49` (Apache-2.0,
LICENSE.txt copied); `web-design-guidelines` ← vercel-labs/agent-skills @ `1a2c79d4` (MIT declared
in the repo README, no LICENSE file; its SKILL.md fetches a remote command.md at use time).

**Discovery verification (VERIFIED).** (a) Live catalog refresh observed three times with no restart
while `.agents/skills/*/SKILL.md` files appeared (dirs without `SKILL.md` are not catalogued — matching
the documented format): initial → `frontend-design`, `marea-product-strategy`,
`web-design-guidelines` → plus `marea-angular-commerce`, `marea-premium-design` → plus
`marea-asset-production`, `marea-quality-gate`. (b) Live loads: `skill` with
`diagnose-windows-sandbox-acl` → loaded (base dir under `%TEMP%`), and `skill` with
`marea-product-strategy` → loaded (base dir `.agents/skills/marea-product-strategy`, confirming
project-root discovery). The Lead's independent live load test PASSED: same runtime/profile/cwd, the
catalog refreshed without restart and lists all 7 project skills; `skill` for `marea-quality-gate`
returned full `skill_instructions` with base dir `...\.agents\skills\marea-quality-gate`, no error.

---

## 5. Agent/Team architecture supported

Verified from the active bundle patch, the team tool README and the live roster/tools.

- **Roles:** one `lead`, up to `maxMembers: 8`; `spawn_teammate` is Lead-only and supports `fresh`
  and `fork` context; `interrupt_agent` is Lead-only; any member may `send_message`.
- **Shared board:** `team_task_create/list/get/update`; `maxTasks: 256`; compare-and-set revisions
  (stale edits rejected), `blocked_by` dependencies, `ready` flag, advisory `write_scopes`.
- **Messaging:** `send_message` steers a running member at its nearest step boundary and
  starts/resumes an inactive one; success means inbox acceptance, not recipient processing.
  `wait_agent` returns `noProgress` immediately when no other member is running/provisioning.
- **Isolation:** **shared checkout** — every teammate sees the same working directory; this bundle
  adds **no worktree isolation and no filesystem locking**. Parallel writers must be partitioned by
  write scope; write scopes are advisory, not locks.
- **Delegation removed:** `subagent`/`subagent_fork` disabled; Team tools replace legacy global child
  controls. `workflow` remains and its `agent()` calls create fresh one-shot children via `spawn`.
- **Teammate context:** fresh receives only its prompt; fork inherits the Lead's completed turns.
  Teammates cannot widen their own permission scope.

---

## 6. Limitations, approvals and credentials

**6.1 Approvals and sandbox.** The base patch encodes: `sandbox-policy.mode` =
`$DSH_PERMISSION_MODE` ?? `workspace-write`; `approval.policy` = `never` when
`danger-full-access`, else `ask`; presets read-only/workspace-write/danger-full-access. This
delegated session reports danger-full-access file policy and disabled approval prompts; a delegated
in-process child pins `never`, so its tool decisions are final. High-risk/irreversible operations
must go to the Lead or the human, not be attempted here. On Windows there is one shell stack — the
sandboxed PowerShell executor (`dsh-pwsh-sandbox`, ACL restricted-token runner). Observed
consequences: `LanguageMode = ConstrainedLanguage`; .NET static calls/`Add-Type` fail ("only core
types are allowed"), so `pwsh` is less capable than a normal terminal (cmdlets still work); every
`pwsh` call emits two such startup errors on stderr (noise, not a failed command). Cause was not
isolated (full-access file policy + confined shell coexist) — treat as a **tool limitation**, not a
workspace ACL denial.

**6.2 Image generation — exact blocker (BLOCKED).**
1. **No capability ships.** No image-generation tool in the session catalog; no `@deepseek-ai`
   package provides image synthesis. Verified by the 307-package inventory, a name filter for
   image/vision/generation packages (only `dsh-compaction-image-offload` matched — image
   *transport*), a dependency scan (only `dsh-attachment-local` → `sharp`, image
   normalization/encoding, not synthesis), and the model tool catalog.
2. **No image-API credential.** Process environment has no `OPENAI_API_KEY`, `STABILITY_API_KEY` or
   `REPLICATE_API_TOKEN` (checked by variable **name** only). The managed credential store
   `C:\Users\Admin\.dsh\.credentials.yaml` exists (478 bytes) but was **not read**; it is sufficient
   for current DeepSeek inference (this session is live), not evidence of an image-provider key.
3. **No install authorized.** Enabling generation would need a third-party plugin (not installed,
   none verified here) plus a paid key and explicit budget authorization — out of MC-01 scope.
   Task-3 owns the external pipeline; in-Harness generation must be reported **BLOCKED**, never
   faked with placeholders.
4. **External path (task-3, outside this runtime):** the official OpenAI guide documents model ids
   `gpt-image-2.5-sunburst` and `gpt-image-2.5-flare` per the visual-specialist's independent check
   (2026-10-30, read-only GET); account entitlement and cost remain NOT VERIFIED, and no generation
   was attempted here.

**6.3 Environment variables (names only — no values printed).** Set: `DSH_HOME`, `DSH_PROFILE`,
`DSH_PROFILE_DIR`, `DSH_SESSION_ID`, `DSH_SHELL`, `DSH_WEB_URL`. Referenced by config but not set in
the process environment: `DEEPSEEK_API_KEY` (resolved per request from the managed store; also used
by DeepSeek search/fetch), `DEEPSEEK_BASE_URL`. Absent: `DSH_PERMISSION_MODE`,
`DSH_TELEMETRY_MODE`/`DSH_TELEMETRY_DISABLED`/`DSH_TELEMETRY_OTLP_URL`, and the three image keys
above. No credential value appears in this document.

---

## 7. Security findings

- **No secrets in docs.** Only profile YAML/JSON, package metadata and READMEs were read; the
  credential store was listed but never read. Pre-merge, grep staged docs for secret-like strings.
- **Profile is app-managed.** The `--dump-config` refusal is a feature: Electron owns composition and
  persistence. Hand-editing `profiles/desktop/package.json` or bypassing the Plugin Manager risks
  divergence; the supported user surface is `cordis.patch.yml` + GUI settings.
- **Shell confinement.** PowerShell runs through the sandboxed executor even with a full-access file
  policy; ConstrainedLanguage blocks arbitrary .NET code. Defense in depth, not a defect.
- **Approval policy is environment-dependent.** A human `workspace-write` session gets `ask`;
  `danger-full-access` and every delegated teammate get `never`. Safety comes from task scoping and
  Lead review, not from approval prompts.
- **Web access is bounded.** Anonymous public HTTP(S) fetch; destinations resolved/validated;
  non-public rejected. Search/fetch results are external untrusted data (prompt-injection hygiene).
- **MCP children are scrubbed.** `dsh-mcp-client` drops ambient `/KEY|PASSWORD|SECRET|TOKEN/i` and
  `DSH_*` names from child env; no servers configured here.
- **Telemetry defaults to feedback-only** (anonymous id file); `DSH_TELEMETRY_DISABLED` opts out.
  Session logs hold full history and attachments in `%USERPROFILE%\.dsh\sessions` — sensitive.
- **Supply chain.** No plugin installation occurred; bundles are shipped and version-pinned. Two
  upstream skills are vendored as files under `.agents/skills`; their license/SHA audit (task-4) must
  be complete before merge.

---

## 8. Reproducible command log (appendix)

All commands ran as PowerShell 7.6.9. No secrets printed; outputs summarized where noted.

1. `dsh --version` → `0.2.1-rc.5`
2. `dsh --help` → usage: `dsh [--profile] <name> [options] [app-args...]`,
   `dsh plugin --profile <name> <pnpm-args...>`; options `--profile`, `--from-default-profile`,
   `--patch`, `--dump-config`, `--dump-config-schema`, `--dump-default-config`
3. `dsh --profile desktop --dump-config` → `error: profile "desktop" is managed exclusively by the
   Electron application` (exit 1, expected)
4. Read `~/.dsh/profiles/desktop/package.json` (bundle list, §1) and `cordis.patch.yml` (user overrides)
5. `Get-ChildItem C:\Users\Admin\.dsh` → `attachments/`, `llm-deepseek/`, `profiles/`, `sessions/`,
   `storages/`, `.anonymous-user-id`, `.credentials.yaml` (not read)
6. Asar inventory: `$env:ELECTRON_RUN_AS_NODE='1'; & "<DeepSeek Harness.exe>" asar-inventory.js` →
   `node=v24.21.0`, `electron=44.7.0`, `topLevelCount=194`, `@deepseek-ai` packages `=307` (all rc.5)
7. Read `app.asar/dsh/desktop-runtime.json` → release `0.2.1-rc.5`, hostProtocolVersion 4,
   nodeVersion 24.21.0, pnpmVersion 11.28.5, win32/x64, sharedPackages 305, files 17187
8. Read `dsh-base/cordis.patch.yml` (529 lines, 96 inserted rows), `dsh-web-app/cordis.patch.yml`,
   `dsh-web-app/presets/standard.patch.yml`, `dsh-experimental-agent-team-profile/cordis.patch.yml`,
   `dsh-experimental-auto-review/cordis.patch.yml`
9. Read asar READMEs: agent-team-profile, tool-agent-team, auto-review, skill-filesystem, mcp-client,
   llm-deepseek, agent-default-model, client-ui-model-selection, session-log-export, base, web-app,
   tool-workflow, tool-subagent, experimental-tool-worktree
10. `Get-ChildItem env: | Where-Object Name -match 'OPENAI|STABILITY|REPLICATE|DEEPSEEK|DSH|API_KEY|TOKEN|SECRET|MCP'`
    → only the six `DSH_*` runtime facts (§6.3)
11. `$ExecutionContext.SessionState.LanguageMode` → `ConstrainedLanguage`; .NET static call fails
12. `Get-CimInstance Win32_OperatingSystem` → Windows 11 Home 10.0.26300 64-bit; `node --version` →
    v24.18.0; `npm --version` → 12.0.1; `git --version` → 2.38.0.windows.1
13. `npx --yes skills --version` → `1.7.4`; `npx playwright --version` → `1.64.1`; cached Chromium dirs
14. `skill diagnose-windows-sandbox-acl` → loaded OK; `skill marea-product-strategy` → loaded OK
    (project root)
15. Live catalog refresh: session availability list changed 3 times as project `SKILL.md` files
    appeared (skill dir without `SKILL.md` not catalogued) — no restart
16. `web_fetch https://example.com/` → HTTP 200; `web_search` → returned source list
17. Background job: `run_in_background` pwsh `Start-Sleep` → completed exit 0; `job_output` read it
18. `load_workspace_dependencies` → bundled Python/node/pnpm paths; python packages listed in §2
19. `Get-ChildItem .agents/skills/*/SKILL.md` → 7 project skills, line counts in §4

---

## 9. What was NOT verified, and why

| Item | Status | Blocker |
|---|---|---|
| Full final desktop composition tree | **NOT VERIFIED** | `--dump-config` refused by design for the Electron-managed profile; evidence is bundle patches + effective tool catalog, not a dump. |
| GUI plugin list / Plugins page state | **NOT VERIFIED** | No DOM/screenshot access from a teammate session; state inferred from profile + asar + empty `.plugin-manager` logs. |
| Image generation end-to-end | **BLOCKED** (§6.2) | No image plugin, no image API credential, no budget authorization. |
| Third-party image plugin availability | **NOT VERIFIED** | Market packages exist, but querying the market was not attempted and installation is prohibited. |
| Non-DeepSeek model provider routing | **NOT VERIFIED** | `llm-pi-ai` dormant, zero provider profiles; adding credentials violates rules. |
| Workflow / subagent execution | **NOT VERIFIED / DISABLED** | Workflow not run (shared checkout, parallel writers); subagent tools disabled by the Team bundle. |
| MCP integration | **NOT VERIFIED** | No server configured; adding one is outside this write scope. |
| Auto-review decision path | **NOT VERIFIED** | Needs `ask` policy; delegated teammates pin `never`. |
| Worktree isolation | **NOT VERIFIED** | Tool bundle disabled; no worktree created (git writes prohibited). |
| Schedule reminders | **NOT VERIFIED** | Registered but not exercised (delayed side effects). |
| Office conversion execution | **NOT VERIFIED** | Skills, LibreOffice kit and Python libs exist; nothing was converted. |
| Lead's independent skill load test | **VERIFIED** | Lead session: catalog refreshed without restart with all 7 project skills; `marea-quality-gate` loaded with project base dir, no error. |
| Upstream skill provenance (URLs/SHAs/licenses) | **VERIFIED (task-4 record)** | anthropics/skills @ ca45fc49 (Apache-2.0); vercel-labs/agent-skills @ 1a2c79d4 (MIT); this audit verified presence + frontmatter only. |
| External image-model identifiers | **VERIFIED (task-3)** | Official OpenAI guide documents gpt-image-2.5-sunburst / gpt-image-2.5-flare (task-3's read-only check); entitlement/cost NOT VERIFIED. |
| Provider quota / token accounting | **NOT VERIFIED** | Not exposed to this session beyond the token meter UI. |

---

## 10. RESULT_NEEDED / open items for the Lead

1. **Skill load test — DONE:** the Lead's independent test PASSED (all 7 project skills discovered
   without restart; `marea-quality-gate` loaded).
2. **Image generation (decision):** confirm the external-provider path and budget authorization; no
   in-Harness generation exists and none may be installed during MC-01.
3. **Secret scan before commit:** grep staged docs (including this file) for credential patterns;
   this file intentionally contains variable names only.
4. **Decide on optional bundles** (worktree, terminal, speech) — all AVAILABLE-DISABLED or
   INSTALLABLE and left untouched.
5. **Trust boundary:** Agent Teams shares one checkout with no filesystem locks; parallel agents'
   writes are coordinated only by the task board and Lead review. `.tmp-mc01` is scratch, not isolation.

*Evidence captured 2026-10-30 from the live 0.2.1-rc.5 desktop runtime; unknowns are labeled, not guessed.*
