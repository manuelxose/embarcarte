# MC-20 — Acceptance matrix

Status vocabulary: `PASS` (verified evidence), `PARTIAL` (verified with a recorded gap),
`PENDING` (not yet verified). No criterion is pre-marked as passed.

| ID | Criterion | Status | Evidence |
| --- | --- | --- | --- |
| AC-01 | Contract and roadmap traceability | PASS | `MC20-SCOPE-CONTRACT.md` §2; registry row 20; MC-19 handoff non-dependency |
| AC-02 | Canonical NAV/HUB/AIS identity resolution | PASS | validator MC20-01/02/04/08; `catalog-projection.json` |
| AC-03 | Complete internal catalogue implementation | PASS | eleven sections × three families; E2E 35/35; production-independent preview build |
| AC-04 | ES/EN functional and semantic parity | PARTIAL | validator MC20-16/17/18; E2E 3/3 parity; professional EN review `OUTSTANDING` |
| AC-05 | MC-16 data reuse without duplication | PASS | single generated projection; validator MC20-09/13; generator asserts canonical invariants |
| AC-06 | MC-17 design-system reuse without fork | PASS | validator MC20-21; design system unchanged vs `3490c0f` |
| AC-07 | MC-18 and MC-19 non-regression | PASS | MC-18 validator 59/60 pre-commit (MC18-56) and 59/60 post-commit (MC18-30), one branch-scope check at a time (see test report); landing unit 45/45; landing E2E 44/44; MC-19 not a dependency (no MC-19 code inherited) |
| AC-08 | Accurate technical facts and product limitations | PASS | `MC20-TECHNICAL-FACTS-AND-LIMITATIONS.md`; validator MC20-02/03/04/09/12/15 |
| AC-09 | Safe handling of unknown commercial data | PASS | 0 prices, 0 SKUs, 0 stock, 0 tested compatibility rows, unknown declared explicitly |
| AC-10 | SSR and hydration | PASS | six Server-rendered routes; E2E SSR + hydration with no console error |
| AC-11 | Keyboard, accessibility and responsive behaviour | PARTIAL | E2E keyboard, 320/390/768/1440 overflow and axe 0 critical/serious; manual AT and full WCAG 2.2 AA review outstanding (MC19 AC08 inheritance) |
| AC-12 | Public route and bundle isolation | PASS | validator MC20-23/24/25/28/29/30/34/35; production build has 0 catalogue identifiers |
| AC-13 | Preservation of all legal and commercial gates | PASS | `MC20-RISK-AND-LEGAL-GATE-REGISTER.md`; validator MC20-36 |
| AC-14 | Independent review with zero open BLOCKING or MAJOR findings | PASS | `MC20-INDEPENDENT-AUDIT.md` — three independent reviewers, all BLOCKING/MAJOR findings remediated and re-verified; `OPEN_BLOCKING_OR_MAJOR = 0` |
| AC-15 | Draft PR with reproducible delivery evidence | PASS | draft PR https://github.com/manuelxose/embarcarte/pull/28 from `feature/marea-mc20-nav-hub-ais-catalog`; implementation commit `7cd8ed9f6982feeaf8f6c6f74592a88f8d1ecc93`; full evidence in `docs/marea/catalog/` |

## Outstanding gaps carried forward

- `PROFESSIONAL_EN_REVIEW` — professional English translation review.
- Manual assistive-technology and WCAG 2.2 AA review (MC19 AC08 partial).
- `FINANCIAL_V18` — inherited failing financial gate (MC-13 V-18 asserts "no MC-14 execution"; MC-14 is now `PARTIAL`). Preserved as an explicit failure, not bypassed.
- `MC16_FINAL_02` — open until re-verified.
- MC-13 F-05/F-11/F-14 and MC-15 GSC-01/GSC-02 remain open.
- AIS decoder licence (DEC-04), HUB hardware selection and compatibility measurement are external blockers.
