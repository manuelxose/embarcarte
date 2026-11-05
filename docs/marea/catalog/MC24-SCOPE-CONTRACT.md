# MC-24 — Scope contract

**Milestone:** MC-24 — Compatibility configurator and quotation triage
**Branch:** `feature/marea-mc24-configurator`
**Base:** `7ed6ae681eafe6fd36d0b48102c4c30efd09c568` (`feature/marea-mc23-integration`)
**Status:** `IN PROGRESS`

## 1. Authoritative scope

Source of truth: `docs/marea/execution/MASTER-PROMPT-REGISTRY.md`, registry row **24**.

| Field | Registry text |
| --- | --- |
| Objective | Compatibility configurator and quotation triage |
| Key dependencies | 23, 16 |
| Expected output | Configurator + quote workflow |
| Verification criteria | Only validated rules produce eligible configs; unknown → specialist assessment |

This milestone does **not** invent or redefine that scope. It implements exactly it.

## 2. Verified dependency evidence

| Dependency | Claim | Evidence (this session) |
| --- | --- | --- |
| MC-23 | Integration branch exists, HEAD `7ed6ae6` | `git log --oneline feature/marea-mc23-integration` → `7ed6ae6 docs(mc23): record delivery evidence…` |
| MC-23 | 22 commits over MC-22 `6ad4fec` | `git log --oneline feature/marea-mc22…feature/marea-mc23-integration` |
| MC-23 | Baseline gates green on real branch | `node scripts/test.mjs` → `PASS (5/5 stages green)`; `run-tsc` → `PASS` (both projects exit 0); `build:landing:preview` → exit 0 |
| MC-16 | Canonical commerce data model consumed, not duplicated | MC-16 `product-definitions` + `docs/marea/commerce-data/` present on base |
| MC-08 | Bundle contract supplies the canonical rule set | `docs/marea/bundles/bundle-definitions.json`: `eligibilityQuestionnaires` (13 GENERAL + 9 SAFETY_SENSITIVE + 10 B2B_FLEET), `configurationRules` (12), `conflictRules` (20) |
| MC-05 D5 §9.2 | The four outcome names are fixed | `docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md` §9.1/§9.2 |

**MC-23 is a verified dependency.** HEAD `7ed6ae6` is reproduced accurately (the session's initial
checkout was MC-22 `6ad4fec`; the MC-23 integration branch was verified separately and used as base).
MC-23 is **not** merged into `main`; MC-24 branches from it directly.

## 3. In scope

1. A **deterministic configuration engine** over the canonical MC-08 rule set and the four D5 §9.2 outcomes.
2. A **quotation triage** workflow that classifies a completed enquiry into internal handling outcomes.
3. **Bilingual (ES/EN) internal preview** at `internal/catalog/configurator` reused from the MC-20/21/22/23
   internal namespace pattern: one component tree, two locales, loopback-only, noindex, no canonical,
   no hreflang, no JSON-LD, no sitemap entry, no public route.
4. **Shared-safety remediation** of MC-23 F-01 and F-02 in `scripts/mc20-catalog-guards.mjs`, because the
   configurator introduces new customer-facing claim-bearing copy and therefore *depends on* that guard.
5. A **validator + adversarial suite** for the configurator, and the **real Angular build gate**.

## 4. Out of scope (explicit non-goals)

- No public route, no indexation, no sitemap, no canonical/hreflang, no structured data.
- No price, no approved price, no quotation amount, no offer, no `ORDERABLE` outcome.
- No lead capture, no form submission, no persistence, no network call, no email.
- No payment, no checkout, no stock, no SKU, no order.
- No NMEA 2000 / certification / compatibility guarantee claim.
- No new runtime dependency; no framework, design-system or routing change.
- No `ELIGIBLE_SELF_INSTALL` reachable today — the validated `TESTED` rule set is empty (see §6).
- No MC-25 start; no merge, deploy or publication.

## 5. Dependencies and DAG

```text
MC-23 (7ed6ae6)
  └─ t1 claim-guard remediation (F-01/F-02)        [L4 security, prerequisite]
       └─ t2 configurator domain engine            [L2]
            ├─ t3 bilingual preview UI             [L2]
            │    └─ t4 real-Angular build gate + negative template test [L2]
            ├─ t5 validator + adversarial suite    [L2]
            └─ t6 quotation triage workflow        [L2]
                 └─ t7 independent audit  → t8 delivery records
```

Write scopes are disjoint; one writer per path.

## 6. The governing fail-closed rule

D5 §9.2 states: *only validated deterministic rules may produce `ELIGIBLE_SELF_INSTALL`; at MC-05 the
validated rule set is empty because no matrix row is `TESTED`, so `ELIGIBLE_SELF_INSTALL` cannot be
returned today.*

MC-24 preserves this exactly. The engine therefore:

- computes `ELIGIBLE_SELF_INSTALL` **only** when a rule is present in the validated-rule registry **and**
  that registry is non-empty **and** every mandatory questionnaire field is resolved;
- today the validated-rule registry is **empty**, so the eligible outcome is **unreachable** — and that
  unreachability is asserted by a test rather than merely documented;
- rejects unknown input into `INSUFFICIENT_INFORMATION`, never into an eligible result;
- maps an excluded capability (steering/autopilot integration, NMEA 2000 requirement) to `NOT_SUPPORTED`;
- maps everything plausible-but-unvalidated to `INSTALLER_ASSESSMENT_REQUIRED`.

## 7. Acceptance criteria

| ID | Criterion |
| --- | --- |
| AC-01 | The four D5 §9.2 outcomes are the only outcomes the engine can return. |
| AC-02 | `ELIGIBLE_SELF_INSTALL` is unreachable while the validated-rule registry is empty (proved by test). |
| AC-03 | Unknown/untested input never yields an eligible configuration. |
| AC-04 | Missing mandatory fields yield `INSUFFICIENT_INFORMATION` naming the missing fields. |
| AC-05 | Excluded capabilities yield `NOT_SUPPORTED` without an implied workaround. |
| AC-06 | Quotation triage is deterministic and returns no price, no offer and no `ORDERABLE` state. |
| AC-07 | ES/EN parity: identical structure, both locales complete, no untranslated string. |
| AC-08 | The real Angular application builds and the preview compiles (template binding validated). |
| AC-09 | A deliberately invalid Angular template binding is rejected by the build gate (negative test). |
| AC-10 | SSR + hydration verified on the affected preview routes. |
| AC-11 | Browser accessibility (axe) and keyboard interaction verified on the real preview. |
| AC-12 | No public route, noindex enforced, 0 catalogue identifiers in the production bundle. |
| AC-13 | No price, purchase affordance, lead capture or ORDERABLE state anywhere in the delivered UI. |
| AC-14 | F-01 and F-02 reproduce before the fix and are rejected after it, with legitimate negations still allowed. |
| AC-15 | Typecheck, Angular build and preview build all pass; typecheck alone is not accepted as certification. |

## 8. Build, test and contract commands

| Command | Purpose |
| --- | --- |
| `node scripts/run-tsc.mjs` | TypeScript check, both projects (mandatory, insufficient alone) |
| `npm run build` | **Real Angular SSR/prerender build gate** (mandatory) |
| `npm run build:landing:preview` | **Preview compilation gate** (mandatory) |
| `npm run test:mc24` / `:unit` | MC-24 validator and adversarial suite |
| `npm run test:mc24:e2e` | Playwright: SSR, hydration, axe, keyboard, responsive |
| `node scripts/test.mjs` | Inherited MC-20..MC-23 confined stages (regression) |
| `npm run test:i18n` / `test:seo` / `test:commerce` | Inherited gates (regression) |
| `node scripts/build-mc20-catalog-data.mjs --check` | Canonical drift gate |

## 9. Release restrictions (unchanged by this milestone)

```text
TRADEMARK_LEGAL_CLEARANCE   = NOT_GRANTED
MAREA_PUBLIC_USE            = NO_GO
SOURCE_IP_CLEARANCE         = NOT_CLEARED
LICENSING_RIGHTS_GRANTED    = false
PRICE_APPROVED              = NONE
COMMERCIAL_AVAILABILITY     = NOT_FOR_SALE
PUBLICATION_AUTHORIZED      = false
INDEXATION_AUTHORIZED       = false
PRODUCTION_DEPLOYMENT       = NOT_AUTHORIZED
GATE-PRIVACY-DPA-DPIA       = BLOCKED
```

Internal engineering success is **not** external approval and does not change any of these gates.
