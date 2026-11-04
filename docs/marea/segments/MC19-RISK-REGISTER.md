# MC-19/36 — Risk register (D05)

| Field       | Value                                                                                  |
| ----------- | -------------------------------------------------------------------------------------- |
| Deliverable | D05 — `MC19-RISK-REGISTER.md`                                                          |
| Milestone   | MC-19/36                                                                               |
| Status      | `ACTIVE` — risks of the proposal and of a future authorized implementation             |
| Baseline    | `3490c0f71eb6eaa89588b7a6d75bb3b6066cd094`                                             |
| Companion   | `docs/marea/segments/data/mc19-risk-register.json`                                     |

## 1. Risk table

| ID  | Risk                                                                                          | Likelihood | Impact   | Mitigation                                                                                                                                     | Owner                     | Status |
| --- | --------------------------------------------------------------------------------------------- | ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------ |
| R01 | The scope is invented from a one-line placeholder and does not match the owner's intent.       | HIGH       | HIGH     | Stop implementation until P01/P10; bind the exact Master Prompt to the scope revision.                                                          | Programme lead            | OPEN   |
| R02 | The owners/professional-fleets pages create route or entity collisions, or contradict MC-15.   | HIGH       | HIGH     | Record an IA/route decision (P02) with a collision check before any code; do not touch `LOCALIZED_ROUTES` in the internal milestone.            | Architecture owner        | OPEN   |
| R03 | A form, endpoint or lead store is introduced without a lawful privacy basis.                  | MEDIUM     | BLOCKER  | Hard gate: no form/input/endpoint/lead store while `GATE-PRIVACY-DPA-DPIA` is blocked; adversarial tests and independent review.               | Privacy owner + Lead      | BLOCKED|
| R04 | A segment page is accidentally registered in the public router, sitemap or navigation.        | MEDIUM     | BLOCKER  | Preview-only routes; no production import; build-scan and 404 probes; route-diff check.                                                        | Implementation owner      | OPEN   |
| R05 | Price, stock, purchase, certification or availability claims leak into segment copy or CTAs.  | MEDIUM     | BLOCKER  | Claims guard, copy-class constraints, fail-closed CTA component, adversarial mutations.                                                        | Content owner + Lead      | OPEN   |
| R06 | The design system is forked or a second bilingual component tree is created.                  | LOW        | HIGH     | Reuse MC-17 components; import-graph check; empty design-system diff; independent review.                                                      | Implementation owner      | OPEN   |
| R07 | ES/EN parity or translation quality is claimed without evidence.                             | MEDIUM     | MEDIUM   | Deterministic parity checks; evidence-provenanced blocks; no claim of professional translation review.                                         | Content owner             | OPEN   |
| R08 | MC-19 solution pages duplicate MC-20–23 family or bundle pages.                               | HIGH       | MEDIUM   | Decide page ownership in P02; Option A embeds solution context instead of creating bundle routes.                                              | Programme lead            | OPEN   |
| R09 | Evidence drifts or counts are prefixed before execution.                                      | MEDIUM     | MEDIUM   | Single deterministic validator; regenerate datasets; record real command output; independent re-run.                                            | Verification owner        | OPEN   |
| R10 | The inherited `V-18` financial gate is hidden or reported as green.                           | LOW        | MEDIUM   | Keep `FINANCIAL_V18 = INHERITED_OPEN`; run `test:financial` and report the real result.                                                        | Programme lead            | OPEN   |
| R11 | Automated axe results are overstated as WCAG 2.2 AA conformance.                              | MEDIUM     | MEDIUM   | State the automated, Chromium-only limits; no conformance claim without manual/screen-reader review.                                           | Accessibility reviewer    | OPEN   |
| R12 | The loopback preview isolation is weakened (public bind, Host allowlist removed, noindex lost).| LOW        | BLOCKER  | Keep the MC-18 server controls; isolation probes and adversarial mutations; independent review.                                                 | Implementation owner      | OPEN   |
| R13 | A late Master Prompt rebinds the scope after implementation starts.                           | MEDIUM     | HIGH     | Do not start before P01 is frozen; bind the prompt to a scope revision; re-plan if it changes.                                                  | Programme lead            | OPEN   |
| R14 | The stacked draft PR is merged or deployed by mistake.                                        | LOW        | HIGH     | Draft PR only; no merge/deploy; explicit base/head; delivery record states the state.                                                          | Programme lead            | OPEN   |

## 2. Residual risks accepted by this proposal

- The proposal may be superseded by the issued Master Prompt. That is expected and recorded
  as R13; it is not a reason to implement early.
- The IA decision may choose Option B or C. The acceptance matrix in D04 then needs the
  additional criteria listed there; this proposal does not pre-approve them.

## 3. Risks explicitly not accepted

- Any lead capture, form, contact endpoint or installer registration before P03.
- Any public route, canonical, hreflang, JSON-LD or sitemap entry before P06/P07/P08/P09.
- Any price, stock, purchase, certification or availability claim.
- Any design-system fork or second bilingual component tree.
- Any merge, deployment or publication in this milestone.

## 4. Review status

The register is authored with the proposal and is subject to the independent review in D07
and `data/mc19-review-findings.json`. No risk is marked closed by the proposal.
