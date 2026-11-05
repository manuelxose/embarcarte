# MC-24 — Technical architecture and component inventory

**Milestone:** MC-24 — Compatibility configurator and quotation triage
**Branch:** `feature/marea-mc24-configurator`
**Base:** `7ed6ae6` (MC-23 integration)

## 1. Where MC-24 sits in the existing architecture

MC-24 adds **no new framework, no new dependency, no new route namespace and no new
data model**. It reuses the MC-20/MC-21/MC-22/MC-23 internal-preview architecture:

```text
docs/marea/bundles/bundle-definitions.json      (MC-08 canonical contract)
        │  scripts/build-mc24-configurator-data.mjs  (generator + --check drift gate)
        ▼
src/app/marea-catalog/data/configurator.generated.ts    (32 questions, 12 rules, 20 conflicts)
        │
        ├─► src/app/marea-catalog/data/configurator-engine.ts   (pure, deterministic)
        │        └─► src/app/marea-catalog/data/configurator-triage.ts  (pure, deterministic)
        │
        ├─► src/app/marea-catalog/content/configurator.ts       (ES/EN copy)
        │        └─► src/app/marea-catalog/sections/section-configurator.ts (Angular UI)
        │                 └─► preview/landing/configurator-preview.ts   (internal host)
        │                          └─► preview/landing/app.routes.ts + app.routes.server.ts
        ▼
scripts/check-mc24-configurator.mjs (13 checks) + .test.mjs (23 adversarial)
scripts/check-mc24-build.mjs        (real Angular build gate + negative binding test)
e2e/catalog/configurator.spec.ts    (17 Playwright: SSR, hydration, axe, keyboard, responsive)
```

## 2. Component inventory

| Component       | File                                      | Responsibility                                      | Reuse / new                                                              |
| --------------- | ----------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------ |
| Rule projection | `data/configurator.generated.ts`          | Verbatim MC-08 questions/rules, generated           | **New file, generated**; mirrors MC-23's `bundle-comparison.ts` approach |
| Engine          | `data/configurator-engine.ts`             | Resolve one configuration to exactly one D5 outcome | **New**, pure                                                            |
| Triage          | `data/configurator-triage.ts`             | Map outcome to an internal handling route           | **New**, pure                                                            |
| Content         | `content/configurator.ts`                 | ES/EN strings                                       | **New**, follows `content/bundles.ts` `Localized` pattern                |
| Section         | `sections/section-configurator.ts`        | The rendered questionnaire and result               | **New**, composed from MC-17 design-system components                    |
| Host            | `preview/landing/configurator-preview.ts` | noindex host page                                   | **New**, mirrors `bundle-preview.ts`                                     |
| Identity        | `models/configurator-identity.ts`         | Route + fail-closed identity facts                  | **New**, mirrors `bundle-identity.ts`                                    |

### Design-system components reused (no fork)

`MareaFormField`, `MareaButton`, `MareaInput` (directive), `MareaStatusBadge`,
`MareaSectionHeading`, `MareaTheme`. No design-system file was modified; no token,
component or theme was added.

## 3. The fail-closed decision function

```text
resolveConfiguration(bundleId, answers, requestedCapabilities)
  1. any requestedCapability ∈ EXCLUDED_CAPABILITIES   -> NOT_SUPPORTED
  2. bundleId not a canonical MC-08 id                 -> INSUFFICIENT_INFORMATION
  3. any mandatory answer blank OR contradictory       -> INSUFFICIENT_INFORMATION
  4. a VALIDATED_SELF_INSTALL_RULES entry matches      -> ELIGIBLE_SELF_INSTALL
  5. otherwise                                         -> INSTALLER_ASSESSMENT_REQUIRED
```

Step 4 can never fire because `VALIDATED_SELF_INSTALL_RULES` is empty and no
compatibility matrix row is `TESTED` (MC-05 D5). This is asserted by checks
`MC24-02` and tests `a1`/`a2`, not merely documented.

Mandatory questions are derived from the contract's own `appliesTo` groups:
START/CRUISE/PROTECT = 13 GENERAL; SAIL/COMPLETE = 22 (GENERAL + SAFETY_SENSITIVE);
FLEET = 23 (GENERAL + B2B_FLEET).

## 4. Route and render mode

| Locale | Path                               | Render mode            | Public | Indexable |
| ------ | ---------------------------------- | ---------------------- | ------ | --------- |
| ES     | `internal/catalog/configurator`    | `Server` (per request) | No     | No        |
| EN     | `en/internal/catalog/configurator` | `Server` (per request) | No     | No        |

Registered in `preview/landing/app.routes.ts` **and** `app.routes.server.ts`. The
second registration is required: without an explicit `ServerRoute` the path falls
into the `**` 404 route, which the E2E suite caught during development.

Nothing is prerendered, so no static indexable artefact is produced. The preview
server stays loopback-only, rejects non-loopback `Host`, sends
`X-Robots-Tag: noindex, nofollow, noarchive`, and sets `form-action 'none'` in CSP.

## 5. SSR and hydration

- No `window`, `document`, `localStorage` or clock access at module scope in any
  MC-24 module; the only `document` use is in the host component constructor, which
  Angular runs in the browser only for hydration-sensitive metadata.
- The engine and triage are pure, so server and client compute identical state for
  identical input; the initial view is `null` on both sides, so the first render
  agrees and hydration produces no mismatch (verified by the E2E console-error
  assertion).
- The questionnaire is genuinely server-rendered: the SSR HTML contains
  `data-mc24-configurator`, `<form` and `GQ-01`.

## 6. Verification architecture (the MC-23 lesson)

MC-23 shipped a TypeScript-only check that passed while an Angular template binding
was invalid (`NG8002`/`NG8008` surfaced only in the preview build). MC-24 makes the
real Angular build a first-class gate and **proves the gate can fail**:

`scripts/check-mc24-build.mjs`

1. POSITIVE — `ng build marea-landing-preview` and `ng build embarcarte` must exit 0.
2. NEGATIVE — a disposable copy of the real component gets one invalid property
   binding; the same builder must fail **and the diagnostic must name the injected
   member** (`mc24DeliberatelyMissingBinding`, `TS2339`). A build that fails for an
   unrelated reason is rejected as evidence.
3. CLEANUP — no fixture may remain in the source tree.

## 7. Security posture

| Control                                                        | Status                                                             |
| -------------------------------------------------------------- | ------------------------------------------------------------------ |
| Loopback-only preview, `Host` allowlist, DNS-rebinding defence | inherited, re-verified                                             |
| `X-Robots-Tag: noindex` on every response                      | inherited, re-verified                                             |
| CSP with `form-action 'none'`                                  | inherited, re-verified                                             |
| No network call, no storage, no cookie in catalogue modules    | inherited (MC20-26), re-verified with the new local-form exception |
| No price, no purchase, no lead capture                         | MC-24 checks 10 and E2E                                            |
| Public build isolation (0 catalogue identifiers)               | verified on the built bundle                                       |

## 8. Explicit limitations

1. The eligible outcome is implemented but unreachable; its behaviour is unit-tested
   for determinism but is not exercised end-to-end.
2. Triage classifies; it cannot produce a quotation, because no survey, term or
   seller identity exists.
3. The claim guard is a heuristic backstop, never a proof of absence.
4. Accessibility evidence is automated (axe + keyboard) plus a responsive check;
   screen-reader testing is **NOT_RUN** and no WCAG conformance is claimed.
