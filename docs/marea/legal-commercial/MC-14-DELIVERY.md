# MC-14 — Delivery record

| Field | Value |
|---|---|
| Deliverable | D23 `MC-14-DELIVERY.md` |
| Milestone | MC-14/36 — Legal and commercial risk register, regulatory compliance, consumer rights and commercial claims governance |
| Date | 2026-11-02 |
| Owner | Programme Lead |
| Branch | `feature/marea-mc14-legal-commercial-risk-claims-policy` |
| Base branch | `feature/marea-mc13-financial-model-cashflow-break-even` |
| Base commit | `f80c0f02ac14803e9e1539393abbb225d7f49e16` (verified MC-13 HEAD; PR #20 open, draft, mergeable, unmerged) |
| PR | [#21](https://github.com/manuelxose/embarcarte/pull/21) — draft, base MC-13 branch, open, unmerged |
| Verdict | `PARTIAL` — internal scope `PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE`; external legal clearance `NOT_GRANTED` |
| Independent review | `PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE` on re-verified candidate `7f31db8`; 0 open BLOCKING/MAJOR/MINOR, 4 INFORMATIONAL by design |
| Merged / deployed | `false` / `false` |
| `MC15_STARTED` | `false` |

## 1. Scope delivered

The complete internal legal/commercial governance package for the nine MAREA
families and six bundles under `docs/marea/legal-commercial/`:

- D01 baseline and governance; D02 primary-source register (48 official sources,
  51 obligations); D03 applicability matrix (9×14 + 6×14); D04 economic-operator
  roles (11 roles, 9 scenarios); D05 risk register (95 risks, 134 inherited
  records mapped, 0 closed); D06 IP/trademark/licensing; D07 hardware conformity
  gates; D08 consumer rights/warranty/returns; D09 privacy/telemetry; D10 CRA
  cybersecurity; D11 payments/tax/contracts; D12 liability/insurance; D13 claims
  policy; D14 bilingual claims catalogue (42 pairs, 30 prohibited categories);
  D15 read-only website inventory (34 findings); D16 release evidence gates (13
  gates, 24 documents); D17 external decisions (20); D18 MC-15 handoff; D19 data
  contract; D20 validation and adversarial testing; D21 independent review; D22
  Spanish executive report; D23 this record.
- Machine-readable data: 18 datasets under `data/`; research dossier and 48-row
  source CSV under `research/`.
- Tooling: `scripts/check-marea-legal-commercial.mjs` (54 checks) and
  `scripts/check-marea-legal-commercial.test.mjs` (41 tests, 40 negative
  controls); package scripts `test:legal-commercial`,
  `test:legal-commercial:unit`.

## 2. Baseline verification

- Preflight branch was MC-13; HEAD `f80c0f0` local = remote; ancestry from MC-12
  head `e59a8b9` verified; PR #20 open, draft, mergeable, `mergedAt = null`,
  unmerged.
- New branch created from `f80c0f0` and stacked directly on the MC-13 branch;
  `main` was not used as base.
- Worktree clean before work; no pre-existing MC-14 branch.

## 3. Commits

| Commit | Purpose |
|---|---|
| `6fb22850aa7acdcea3e4959024d93ea5adc54842` | frozen implementation candidate |
| `e32673ea26fa1b115e57b02b9755d3149c3db1ea` | first correction commit (audit A-01…A-10) |
| `7f31db83797f9423bbd9d0b60764f8db22fe8bbf` | residual-fix commit; re-verified frozen candidate |
| record commit | manifest/status block, D23, registry, decision log, review record |
| final SHA commit | records `finalRecordCommit` in the manifest and review record |

The record commit is `2626853d1049b9b615b77d17a773dbdad6784cc6`; the final SHA commit records `finalRecordCommit = 2626853d1049b9b615b77d17a773dbdad6784cc6` in `data/manifest.json` and `data/review-findings.json`. No merge commit exists.

## 4. Validation evidence

| Command | Result |
|---|---|
| `npm run test:legal-commercial` | **54/54** checks pass, exit 0 |
| `npm run test:legal-commercial:unit` | **41/41** tests pass, exit 0 |
| `npm run test:products` / `:unit` | 52/52 / pass |
| `npm run test:bundles` / `:unit` | 35/35 / pass |
| `npm run test:brand` / `:unit` | 21/21 / pass |
| `npm run test:market` / `:unit` | 40/40 / pass |
| `npm run test:customer-research` / `:unit` | 62/62 / pass |
| `npm run test:customer-recovery` / `:unit` | 32/32 / pass |
| `npm run test:hardware` / `:unit` | 54/54 / pass |
| `npm run test:economics` / `:unit` | 49/49 / pass |
| `npm run test:financial` / `:unit` | 77/77 / pass |
| `npm run test:i18n` / `test:commerce` / `test:seo` / `test:backup` | PASS / PASS / PASS (101 sitemap URLs) / PASS |
| `npm run format:check` | PASS |
| `npm run build` | PASS |
| `npm run test:e2e` | 15/15 passed |
| `npm audit --omit=dev --audit-level=high` | 0 vulnerabilities |
| `git diff --check` | clean |

Note: the inherited unit scripts are invoked through `node --test`; in this
Windows DSH sandbox plain `node --test` child-process spawning is blocked by the
documented `EPERM` restriction, so the suites were executed with
`--test-isolation=none` (the MC-14 package script already uses this flag) and
the substitution is disclosed rather than hidden. CI does not run the MC-14
gate; it remains a manual gate at this milestone (same disclosure pattern as
MC-13 `F-14`).

## 5. Independent review

The independent auditor verified ancestry and changed-file scope, source
provenance and dates, applicability reasoning, inherited-blocker mapping,
economic-operator roles, GDPR/CRA treatment, consumer rights, claims
enforcement, bilingual parity, data/document reconciliation and its own
mutation harness (19 + 5 fresh mutations detected across rounds). Findings
A-01…A-17 were raised; all BLOCKING/MAJOR/MINOR were corrected and re-verified,
with 4 INFORMATIONAL observations open by design (validator coverage gaps, the
MC-11/MC-12 status sentinel, record artefacts, remote-state observability).
Final award: `PASS_INTERNAL_LEGAL_GOVERNANCE_SCOPE`, programme status `PARTIAL`.

## 6. Preserved hard restrictions

`COMMERCIAL_AVAILABILITY = NOT_FOR_SALE`; `PRICE_APPROVED = NONE`;
`TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`; `MAREA_PUBLIC_USE = NO_GO`;
`SOURCE_IP_CLEARANCE = NOT_CLEARED`; `LICENSING_RIGHTS_GRANTED = false`;
`CUSTOMER_WTP_VALIDATED = false`; `CUSTOMER_EVIDENCE = NONE`;
`PILOT_SAFETY_GATE = BLOCKED`; `AIS_TRANSMISSION_OFFERED = false`;
`FLEET_DEFAULT_HARDWARE = false`; `CE_MARKING_CLAIM = PROHIBITED`;
`NMEA2000_CERTIFIED = false`; `TESTED_COMPATIBILITY_ROWS = 0`;
`PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED`; `MC15_STARTED = false`.

No external provider, supplier, customer, regulator, insurer or lawyer was
contacted. No quotation, contract, certificate, insurance policy, licence, price
approval or customer evidence was invented or obtained. No website file, route,
metadata, price, checkout or deployment configuration was modified. No public
claim, product availability or trademark use was published.

## 7. Carried-forward debt and blockers

- MC-13 residual debt remains OPEN and unmodified: `F-05` (financial contract
  formula/check-ID mapping), `F-11` (per-unit contribution semantics and ST-17
  documentation), `F-14` (CI does not execute the financial gates). MC-14 did
  not edit MC-13 files.
- MC-14's own gate is also not executed in CI (disclosed above); wiring it is
  future work.
- External decisions remain PENDING (`DEC-MC14-001`…`019`) or
  `OUT_OF_SCOPE_FOR_MC14` (`DEC-MC14-020`): counsel, economic-operator model,
  OPEN-MARINE ownership/licence, MAREA trademark, chart/weather licences, AIS
  decoder, NMEA, PILOT safety programme, manufacturing, insurance, payments/tax,
  privacy/DPIA/DPA, CRA classification/support period, consumer/B2B/installer
  contracts, legal identity, claims/publication authorization, producer
  registration and launch authorization.
- Legal research remains partially external: 6 sources `NOT_RETRIEVED` and 4
  `INACCESSIBLE` in the governed register; the Spanish PLD transposition and
  parts of the Spanish environmental/RCD/MED texts were not retrieved. No
  positive compliance conclusion rests on them.

## 8. Next milestone

MC-15/36 — bilingual information architecture and SEO migration — receives the
handoff package (`MC14-MC15-HANDOFF.md`, `data/mc15-handoff-inputs.json`). It may
prepare the IA/SEO design and remediation backlog, but may not publish, re-index,
sell or present MAREA as a cleared brand. `MC15_STARTED = false`.

## 9. Record integrity

`data/manifest.json` records the branch, base, frozen candidate `7f31db8`, the
record commit and `finalRecordCommit`. `data/review-findings.json` records the
independent review, its rounds, corrections, re-verification and
`finalRecordCommit`. This delivery record and the registry/decision-log entries
are committed together in the record commit; a final SHA commit records the SHA
in the manifest and review file, as MC-13 did.

This milestone delivers internal governance only. It is not a legal opinion,
certification, insurance policy, licence or authorization to sell, and no
publication or market placement is authorised.
