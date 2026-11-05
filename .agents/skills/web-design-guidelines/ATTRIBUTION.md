# Attribution — web-design-guidelines

- Upstream repository: https://github.com/vercel-labs/agent-skills
- Upstream path: `skills/web-design-guidelines`
- Upstream commit (shallow clone HEAD): `1a2c79d4e6c4a2283dc2c614b6538cbe1ed5ca62` (2026-10-27)
- License: MIT — declared in the upstream `README.md` section `## License`. The upstream repository does **not** ship a `LICENSE` file, so no license file could be copied; this note records the declared license and source.
- Installed: 2026-10-30 by MC-01 Agent D (`skills-author`) into the project-local skill root `.agents/skills/` (rank 200 of `@deepseek-ai/dsh-skill-filesystem`).
- Security audit: single `SKILL.md`; no scripts, no shell command execution, no secret/environment access. **Network dependency:** at review time the skill instructs the agent to fetch `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`; this requires `web_fetch` and network access. If fetching is unavailable, the gate must report BLOCKED instead of inventing rules.
- Modification: upstream `SKILL.md` copied byte-for-byte; this file is added only for provenance.
