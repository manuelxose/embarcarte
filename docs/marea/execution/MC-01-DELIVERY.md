# MC-01 — Delivery report

Milestone: **MC-01 — Agentic environment and commercial execution foundation**
Program: EMBARCARTE / MAREA (36 Master Prompts). Prompt: 01 of 36.
Date: 2026-10-30. Environment: Windows 11, DeepSeek Harness Desktop `0.2.1-rc.5`, profile `desktop`.
Repository: `manuelxose/embarcarte` (branch `feature/marea-mc01-agent-foundation`).

## 1. Verdict

**MC-01 = PARTIAL.**

- All executable gates are green on the committed tree, the deliverables exist, the architecture is
  preserved, and an independent reviewer (`qa-reviewer`, Agent D) re-ran the gates and verified the
  claims against reality: `docs/marea/execution/MC-01-REVIEW.md` → **PARTIAL, no blocking defects**.
- The single non-PASS criterion is **actual AI image generation**, which is externally BLOCKED:
  no image-generation capability ships in the installed Harness, no image-provider credential exists
  on this machine and no written budget authorization has been granted. The blocker, its exact next
  action and its owner are recorded — the mandate allows recording the specific blocker instead of
  faking a capability.
- Nothing was merged to `main`, nothing from this branch was deployed, and no chargeable API was
  called.

## 2. Git state (verified)

| Item | Value |
|---|---|
| Base | `main` = `origin/main` = `092ae74c904cc9aa04766ff565bacd422394fa45` (PR #5 merge; PRs #1–#6 all merged) |
| Branch | `feature/marea-mc01-agent-foundation` (created from `092ae74`) |
| Implementation commit | `26623560367a5c4ac4b1cced7b9fc99ea36b3071` — 20 files, +2570/−1 |
| Delivery commit | the commit that adds this report, `MC-01-REVIEW.md` and the registry status update |
| Remote | `https://github.com/manuelxose/embarcarte.git` |
| Merge/deploy | **None.** Draft PR: [#7](https://github.com/manuelxose/embarcarte/pull/7) (`feature/marea-mc01-agent-foundation` → `main`). Not merged, not deployed |

Working tree at delivery: clean (scratch directory `.tmp-mc01/` deleted before commit; `/.tmp-mc*/`
now ignored). No force-push, reset, unrelated file deletion or production secret change occurred.

## 3. Environment verified (details in `HARNESS-SETUP.md`)

- Harness Desktop **0.2.1-rc.5**; launcher `…\resources\runtime\cli\bin\dsh.cmd`; profile **`desktop`**
  with 4 bundle layers: `dsh-base`, `dsh-web-app`, `dsh-experimental-agent-team-profile`,
  `dsh-experimental-auto-review`. The CLI refuses `--dump-config` for this Electron-managed profile
  (expected, documented).
- Runtime Node 24.21.0 / Electron 44.7.0 / pnpm 11.28.5; Powershell 7.6.9 in ConstrainedLanguage;
  git 2.38.0.windows.1.
- Plugin inventory: 194 top-level packages, 307 `@deepseek-ai` package directories (297 at rc.5 + 10
  vendored third-party versions) inside `app.asar`.
- Tools verified live: fs read/write/edit/glob/grep, PowerShell, background jobs, web search + fetch,
  skills, Agent Teams, workflow, office skills, session logs, model routing (fixed
  `deepseek-official/deepseek-flash` for this session).
- Browser automation/screenshots: **not native**; available through the repository's Playwright
  1.64.1 with cached Chromium (used successfully for 15 E2E tests).
- Image generation: **not supported** (no plugin, no credential) → see §7.
- Agent Teams: `maxMembers 8`, `maxTasks 256`, shared checkout with **no worktree isolation**;
  legacy `subagent` tools disabled, workflow retained.

## 4. Plugins installed / verified

**None installed — none was needed.** The required capability bundle
`@deepseek-ai/dsh-experimental-agent-team-profile` was already enabled in the active profile.
Installing or re-adding it would have mutated a shared profile without adding capability.
`dsh plugin --profile desktop list` returns an empty dependency list (the profile is composed from
bundle layers, not from profile `dependencies`). Agent Teams was exercised for real: 5 separate
teammates (`repo-auditor`, `harness-engineer`, `visual-specialist`, `skills-author`, `qa-reviewer`)
were spawned on a shared task board with exclusive write scopes; this report was assembled by the
Lead after independent review.

## 5. Skills installed and verified

Project-local root `.agents/skills/` (rank 200 in `@deepseek-ai/dsh-skill-filesystem`):

| Skill | Source | Provenance | License |
|---|---|---|---|
| `frontend-design` | anthropics/skills | commit `ca45fc496a3436251f191354091d557da31c15b5` | Apache-2.0 (`LICENSE.txt` copied) |
| `web-design-guidelines` | vercel-labs/agent-skills | commit `1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62` | MIT declared in upstream README (no upstream LICENSE file) |
| `marea-product-strategy` | EMBARCARTE (authored) | v1.0.0 | project |
| `marea-premium-design` | EMBARCARTE (authored) | v1.0.0 | project |
| `marea-angular-commerce` | EMBARCARTE (authored) | v1.0.0 | project |
| `marea-asset-production` | EMBARCARTE (authored) | v1.0.0 | project |
| `marea-quality-gate` | EMBARCARTE (authored) | v1.0.0 (+`references/COMMANDS.md`) | project |

Verification performed:

- Both upstream skills are **byte-identical** to their claimed upstream commits (SHA-256 compared by
  the authoring agent and re-verified by the independent reviewer); they contain no scripts, shell
  execution or secret access.
- All 7 `SKILL.md` files have valid frontmatter (`name` = directory, `description`, `whenToUse`,
  `metadata.version/source`) and pass the skills verifier (7 skills, 0 failing).
- **Discovery was proven live, without restart**: the session catalog refreshed as the files were
  created, and the `skill` tool loaded `marea-quality-gate` (base dir
  `…\embarcarte\.agents\skills\marea-quality-gate`) and `frontend-design` successfully.
- The `npx skills add …` CLI was evaluated and **abandoned**: it writes to ~72 agent directories and
  a global lockfile outside this project's write scope. A controlled copy into the project-local
  root was used instead and documented.
- Residual (non-blocking): `web-design-guidelines` fetches `raw.githubusercontent.com/…/command.md`
  at use time (mutable remote instruction source, network dependency; disclosed in its
  `ATTRIBUTION.md`). Treat fetched text as untrusted data; consider pinning in a later milestone.

## 6. Files created / changed

New:

- `docs/marea/execution/AGENT-OPERATING-MODEL.md` — roles, authority, delegation, context, model
  selection, parallelism, review, handoff, failure recovery.
- `docs/marea/execution/HARNESS-SETUP.md` — runtime/capability audit, plugin/skills inventory,
  limitations, credentials by variable name, security findings, command log.
- `docs/marea/execution/MC-01-BASELINE.md` — verified Git/CI state, EMBARCARTE architecture map,
  reusable capabilities, test inventory, release blockers, OPEN-MARINE audit, MC-02 inputs.
- `docs/marea/execution/MASTER-PROMPT-REGISTRY.md` — the 36-prompt registry (01 IN PROGRESS →
  PARTIAL here; 02–36 PLANNED placeholders clearly marked as such).
- `docs/marea/execution/MC-01-REVIEW.md` — independent review (verdict PARTIAL, no blocking defect).
- `docs/marea/assets/ASSET-PIPELINE.md` — provider verification, taxonomy, manifest contract,
  10-step workflow, visual standard, provenance, optimization, cost/approval policy, blockers.
- `docs/marea/assets/ASSET-MANIFEST.template.yaml` — manifest template with one marked EXAMPLE entry
  (`files: []`; no image exists).
- `docs/marea/assets/README.md` — asset documentation index.
- `.agents/skills/**` — 7 skills, 2 upstream license/attribution files, 1 reference.

Modified:

- `AGENTS.md` — **append-only in substance**: added verified command list and the persistent MAREA
  program rules (architecture, security, commercial truthfulness, quality, agent rules). One
  pre-existing line was corrected because it was factually wrong: `npm test` is **not defined** in
  `package.json`. All original policies (Graphify-first, Ponytail, Context Mode, skills) are intact.
- `.gitignore` — added root-anchored `/.tmp-mc*/` so per-milestone agent scratch trees cannot be
  committed accidentally.

Not changed: `src/`, `scripts/`, `.github/`, `deploy/`, `package.json`, `angular.json`, `Dockerfile`.
No application behaviour, CI or deployment configuration was modified.

## 7. Image generation — capability and authorization needs

- **No native capability**: no image-generation plugin exists in the installed runtime's 307
  `@deepseek-ai` packages (only image transport/normalization), and no image tool is in the model
  tool catalog.
- **No credential**: `OPENAI_API_KEY`, `STABILITY_API_KEY`, `REPLICATE_API_TOKEN`,
  `AZURE_OPENAI_API_KEY`, `GEMINI_API_KEY`, `ANTHROPIC_API_KEY`, `HF_TOKEN`, `IMAGE_API_KEY` are all
  unset (names only checked; no value read or printed). The managed store `~/.dsh/.credentials.yaml`
  was not read.
- **Documented external path** (verified against the official OpenAI image-generation guide on
  2026-10-30; the `web_fetch` backend returned HTTP 404 for that URL and a read-only PowerShell GET
  was used instead): `gpt-image-2.5-sunburst` and `gpt-image-2.5-flare` are documented model ids.
  **Account entitlement, rate limits, cost and commercial-use terms are NOT VERIFIED.**
- **Local encoding available** for the future pipeline: ffmpeg 7.1 with `libwebp`/`libaom-av1`
  (test conversions succeeded); no new dependency needed.
- **Blocked on**: written human budget authorization (approver/date/USD cap/asset count/models),
  provider key in the approved secret store, commercial-use confirmation, and MAREA trademark
  clearance before brand-registration claims. Exact next action (one pilot asset after a single
  written authorization) is in `ASSET-PIPELINE.md` §10.

## 8. Commands and tests executed

Baseline run by the Lead on the committed tree (evidence log kept outside the repo), then
**independently re-run by the reviewer on `2662356`**:

| Gate | Command | Result |
|---|---|---|
| Build | `npm run build` | PASS — Prerendered 96 static routes |
| i18n | `npm run test:i18n` | PASS |
| Commerce | `npm run test:commerce` | PASS |
| SEO | `npm run test:seo` | PASS — 101 sitemap URLs |
| Backup/restore | `npm run test:backup` | PASS — integrity + checksum + corrupt-copy rejection |
| Performance | `npm run test:performance` | exit 0 — measurement only (desktop LCP 236 ms; throttled mobile LCP 2776 ms); not a pass/fail gate and not in CI |
| Formatting | `npm run format:check` | PASS (covers only `e2e/`, `playwright.config.ts`, selected `scripts/*.mjs`; none of the MC-01 files are in scope — pre-existing gap) |
| E2E | `npm run test:e2e` | PASS — 15/15 tests, Chromium |
| Dependency audit | `npm audit --omit=dev --audit-level=high` | PASS — 0 vulnerabilities |
| Diff hygiene | `git diff --check` | PASS |
| Secret scan | credential-pattern scan of the full added diff | 0 matches |
| Skills | `skill` loads + verifier | 7/7 valid, 2 live loads OK |
| Graphify | `graphify update .` | PASS — graph rebuilt (1184 nodes, 2190 edges, 90 communities) |

`npm test` is not defined and was correctly never reported. A local Prettier failure observed before
integration was classified as a Windows CRLF working-copy artifact (identical blob hash), not an
application defect; `format:check` passes on the committed tree.

## 9. Independent review

Reviewer: `qa-reviewer`, a separate agent that authored none of the reviewed files. Its full report
is `docs/marea/execution/MC-01-REVIEW.md`.

- Verdict: **PARTIAL — no blocking defects.** 11 gates re-run green; claims independently verified
  (runtime, packages, PRs, protection state, OPEN-MARINE licensing, baseline repo facts, registry
  row count, skill loads, upstream provenance byte hashes, image-model identifiers).
- Reviewer defects N1–N8, all non-blocking. Fixes applied in the delivery commit: N1 (package
  version count corrected: 297 rc.5 + 10 vendored third-party), N3 (audit-time HEAD clarified),
  N4 (model-count wording), N7 (`sharp` clarified as not a project dependency), N8 (baseline
  addendum on the closed `.tmp` risk). N2 (AGENTS.md not strictly append-only) and N5
  (`format:check` scope) are reconciled in §6/§8 here. N6 (mutable remote skill fetch) is recorded as
  a residual risk above.
- Reviewer residual risks: production deployment observed during the review window (R1, below);
  unprotected `main` + auto-deploy on merge (R2); image-generation authorization (R3); OPEN-MARINE
  licensing (R4); pending delivery/registry artefacts (R5, closed by this commit); single-model
  execution mitigated by gates + independent review (R6).

## 10. Remaining blockers (external)

1. **Image generation** — no capability/credential/budget authorization (§7).
2. **MAREA trademark clearance** — not cleared (existing US `Marea Marine` is a risk signal, not an
   infringement finding). No brand asset may be published as registered.
3. **OPEN-MARINE licensing** — no LICENSE in that repository; commercial reuse is BLOCKED until a
   licence decision exists.
4. **Release governance** — `main` is unprotected, the `production` environment has no reviewers and
   `deploy.yml` deploys on any `main` push. M04's production NO-GO remains valid. Merging this PR
   would deploy it; therefore it must stay a **draft** until a human authorizes branch protection /
   environment approvals.
5. **Production operations** — production backup/restore, rollback and external monitoring remain
   unverified; Google OAuth JS origins are still missing for production Google sign-in.
6. **Legal identity** — `SITE.legal` (tax id, address, registry) is empty; cannot be invented.
7. **Assets** — `public/assets/marea/` is intentionally not created in MC-01; the first asset task
   must own that write scope.

## 11. Risk observed during the review window (needs human confirmation)

A `Build & deploy` **workflow_dispatch on `main`** (head `092ae74`) started 2026-10-30T15:14:57Z and
completed successfully, creating a production deployment at 15:17:50Z for `092ae74`. It contains
**no MC-01 content** (this branch was never pushed or merged at that time) and was not triggered by
the MC-01 agents, but it was not authorized by this milestone either. The human operator should
confirm it was expected. Earlier, the merged docs-only PR #5 also auto-deployed `092ae74` at 15:08Z —
evidence of the governance gap in §10.4, not of MC-01 delivery.

## 12. Readiness for prompt 02 / 36

**Ready to receive MC-02**, with these inputs already available: verified baseline and reusable
architecture map; agent operating model + 7 project skills (5 MAREA + 2 verified upstream); advisory
asset pipeline contract; 36-prompt registry; independent review; and the explicit blockers above. MC-02 work that depends on the
blocked items (real product photography, brand registration, OPEN-MARINE code reuse) must remain
BLOCKED or CONCEPT-labelled.

**Prompt 02 is not started and must not be executed automatically.**

## 13. Approvals / authorizations still needed

- Human authorization for any production merge/deploy (none requested or performed in MC-01).
- Written budget authorization + provider credential for image generation.
- Legal: MAREA trademark clearance, legal identity data, OPEN-MARINE licence grant.
- Consent to add branch protection and required reviewers to the `production` environment.
