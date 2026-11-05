# MC-22 — Agent execution and model routing record

## 1. Member routes

Every AgentTeams member ran on `deepseek-official` / `deepseek-v4-pro` (reasoning high). No other
AgentTeams LLM route was used.

| Task | Owner (role) | Provider / model | Class | Reason |
| --- | --- | --- | --- | --- |
| t1 | architecture (A) | deepseek-official / deepseek-v4-pro | L3 | authoritative scope, DAG, architecture inventory and acceptance contract |
| t2 | product (B/G) | deepseek-official / deepseek-v4-pro | L3 | canonical product truth and safety limitations |
| t3 | assurance (E/F) | deepseek-official / deepseek-v4-pro | L3 | security, isolation and legal-gate analysis + guard hardening design |
| t4 | implementation (C/D) | deepseek-official / deepseek-v4-pro | L3 | nine-family catalogue extension, bilingual content, projection |
| t5 | assurance (E/F) | deepseek-official / deepseek-v4-pro | L3 | validator/guard hardening, adversarial suite, 18-route E2E |
| t6 | architecture (A) | deepseek-official / deepseek-v4-pro | L4 | independent verification (NON-BINDING — workspace drifted) |
| t7 | verifier (A) | deepseek-official / deepseek-v4-pro | L4 | independent product-truth and security review of a safety-sensitive catalogue |
| t9 | assurance (E/F) | deepseek-official / deepseek-v4-pro | L3 | repair r1 — negator re-scoping and content/validator defects |
| t10 | architecture (A) | deepseek-official / deepseek-v4-pro | L4 | re-verification r1 (NON-BINDING — workspace drifted) |
| t12 | assurance (E/F) | deepseek-official / deepseek-v4-pro | L3 | repair r2 — structural negation model rewrite |
| t13 | verifier (A) | deepseek-official / deepseek-v4-pro | L4 | re-verification r2 — final verification of a security-critical guard repair |
| t21 | assurance (E/F) | deepseek-official / deepseek-v4-pro | L3 | repair r3 (bounded) — predicate-scoped negation + known-limits doc |
| t22 | verifier (A) | deepseek-official / deepseek-v4-pro | L4 | verification r3 — final binding verification of the delivery bytes |
| t23 | reviewer (B/G) | deepseek-official / deepseek-v4-pro | L4 | review r2 — independent binding verdict on the delivery revision |
| t24 | reviewer (B/G) | deepseek-official / deepseek-v4-pro | L3 | canonical product mapping, technical facts, parity evidence, acceptance matrix |
| t25 | verifier (A) | deepseek-official / deepseek-v4-pro | L3 | milestone governance documentation requiring exact auditable reporting |

Classes L3/L4 above are the roles assigned by the captain for the corresponding task types (architecture
and security-critical review/verification → L4; governance/architecture documentation → L3). Route is
`deepseek-v4-pro` throughout.

## 2. External auditors (NOT AgentTeams routes)

All three external audits were run with the **`subagent_claude_code`** product at **`claude-sonnet-5-5`**
(the permitted Claude ceiling; Opus was never used — D-088).

- Each audit ran in a **separate context** with **`SHELL_ACCESS` denied**, i.e. **STATIC REVIEW** (reading
  the diff and module source), **not dynamic testing**. They must not be described as execution/testing.
- Audits are **subscription-backed** and therefore **`SUBSCRIPTION_UNPRICED`** — never zero cost, never
  free.
- Claude Opus (5.5 or higher) was never used; the external ceiling is Sonnet 5.5.

## 3. Cost

- **Monetary cost: UNKNOWN.** No provider billing metadata is available in this installation; never infer
  a monetary figure from the harness conversation counter.
- **Token counts: UNKNOWN** unless the provider reported a usage sample; none is recorded here.
- Claude Code / Codex executions are `SUBSCRIPTION_UNPRICED`, not zero.
