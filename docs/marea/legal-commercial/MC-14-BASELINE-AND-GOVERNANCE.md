# MC-14 — Baseline and governance

| Field | Value |
|---|---|
| Deliverable | D01 `MC-14-BASELINE-AND-GOVERNANCE.md` |
| Milestone | MC-14/36 — Legal and commercial risk register, regulatory compliance, consumer rights and commercial claims governance |
| Programme | EMBARCARTE / MAREA (36-prompt programme) |
| Date | 2026-11-02 |
| Owner | Programme Lead |
| Branch | `feature/marea-mc14-legal-commercial-risk-claims-policy` |
| Base branch | `feature/marea-mc13-financial-model-cashflow-break-even` |
| Base commit | `f80c0f02ac14803e9e1539393abbb225d7f49e16` (MC-13 HEAD, local = remote) |
| Status | `INTERNAL_LEGAL_COMMERCIAL_GOVERNANCE` |
| Nature | Internal governance system. Not a legal opinion, certification, insurance policy or authorization to sell |

## 1. Purpose and hard boundary

MC-14 builds the legal/commercial governance layer for the nine MAREA product
families and six commercial bundles. It establishes the applicable legal
landscape, product-specific obligations, potential economic-operator roles,
risks with owners, evidence requirements, consumer and contract obligations,
privacy and cybersecurity duties, licensing restrictions, liability and
insurance dependencies, and a bilingual claims-governance system.

MC-14 does **not** grant legal clearance. No autonomous agent may grant
clearance, certify a product, approve an insurance arrangement, authorise a
sale or replace qualified counsel or an accredited conformity-assessment body.
The whole package is designed to answer one operational question: *what must
EMBARCARTE obtain, demonstrate, contract or document before each MAREA product
may lawfully be offered?*

## 2. Verified predecessor baseline

The preflight verified:

- Active branch before work: `feature/marea-mc13-financial-model-cashflow-break-even`.
- HEAD: `f80c0f02ac14803e9e1539393abbb225d7f49e16`; remote branch at the same SHA.
- MC-13 PR #20: `OPEN`, draft, `MERGEABLE`, `mergedAt = null`, base
  `feature/marea-mc12-recurring-data-unit-economics`, 46 changed files.
- MC-13 ancestry: `e59a8b9b3916d979d8eaeff78acd3795fd26c125` (MC-12 head) is an
  ancestor of the MC-13 head.
- Working tree clean before branch creation; no MC-14 branch existed locally or
  remotely.
- `MC13_VERDICT = PARTIAL`, `MC13_INTERNAL_FINANCIAL_SCOPE =
  PASS_INTERNAL_FINANCIAL_SCOPE`, `MC13_EXTERNAL_COMMERCIAL_VALIDATION =
  BLOCKED_OR_NOT_OBTAINED`, `MC13_INDEPENDENT_REVIEW =
  PASS_INTERNAL_FINANCIAL_SCOPE` — preserved unchanged.

The new branch was created from this exact commit and stacked directly on the
MC-13 branch. `main` was not used as a base. No merge, deployment or
publication occurred.

## 3. Consumed governing material

- Programme governance: `MASTER-PROMPT-REGISTRY.md`, `DECISION-LOG.md`,
  `AGENT-OPERATING-MODEL.md`, `HARNESS-SETUP.md`.
- MC-02: `MC-02-BLOCKERS-AND-DECISIONS.md`, `INTELLECTUAL-PROPERTY-CHAIN.md`,
  `LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md`,
  `HARDWARE-COMPLIANCE-MATRIX.md`, `MARINE-DATA-RIGHTS-MATRIX.csv`,
  `SOFTWARE-LICENSE-INVENTORY.csv`.
- MC-03: `COMMERCIAL-BRAND-CLAIMS-POLICY.md`,
  `BRAND-AND-IP-DECISION-PACKAGE.md`, `brand-identity.contract.json`.
- MC-05–MC-08: nine product contracts, six bundle definitions, compatibility and
  safety contracts, ES/EN copy.
- MC-11: conformity research, EU applicability matrix, safety findings, supplier
  evidence, 52 device-security requirements, qualification-test records.
- MC-12: `licensing-rights.json`, `legal-tax-inputs.json`,
  `blocker-register.json`, provider and warranty documents.
- MC-13: `MC13-MC14-HANDOFF.md`, `mc14-handoff-inputs.json`,
  `blocker-register.json`, `manifest.json`, `review/MC-13-REVIEW.md`.

Predecessor records are immutable evidence. MC-14 maps and consumes them; it
does not rewrite their verdicts, close their blockers without new evidence or
double-count their records.

## 4. Preserved hard restrictions

| Flag | Value |
|---|---|
| `TRADEMARK_LEGAL_CLEARANCE` | `NOT_GRANTED` |
| `SOURCE_IP_CLEARANCE` | `NOT_CLEARED` |
| `COMMERCIAL_AVAILABILITY` | `NOT_FOR_SALE` |
| `PRICE_APPROVED` | `NONE` |
| `CUSTOMER_EVIDENCE` | `NONE` |
| `CUSTOMER_WTP_VALIDATED` | `false` |
| `FORMAL_SUPPLIER_QUOTATIONS` | `NONE` |
| `LICENSING_RIGHTS_GRANTED` | `false` |
| `PILOT_SAFETY_GATE` | `BLOCKED` |
| `AIS_TRANSMISSION_OFFERED` | `false` |
| `FLEET_DEFAULT_HARDWARE` | `false` |
| `CE_MARKING_CLAIM` | `PROHIBITED` |
| `NMEA2000_CERTIFIED` | `false` |
| `TESTED_COMPATIBILITY_ROWS` | `0` |
| `PRODUCTION_DEPLOYMENT` | `NOT_AUTHORIZED` |
| `MAREA_PUBLIC_USE` | `NO_GO` (MC-03) |

These values are validated mechanically in `scripts/check-marea-legal-commercial.mjs`.
No research finding, financial scenario or marketing draft may modify them.

## 5. Canonical inventory

- Product families (9): `NAV`, `HUB`, `AIS`, `PILOT`, `SENSE`, `WATCH`,
  `DISPLAY`, `WEATHER`, `FLEET`.
- Bundles (6): `START`, `CRUISE`, `SAIL`, `PROTECT`, `COMPLETE`, `FLEET`.
- Editions: the 26 edition records defined by the MC-05–MC-07 contracts
  (`NAV-ESSENTIAL`, `NAV-PRO`, `HUB-STANDARD`, `HUB-PRO`, `AIS-RECEIVER`,
  `AIS-CONNECTED`, `PILOT-COASTAL`, `PILOT-SAIL`, `PILOT-PRO`,
  `SENSE-WIND/POWER/BILGE/TANKS/ENV/ESSENTIALS/SAIL/SYSTEMS`,
  `WATCH-CORE`, `WATCH-PLUS`, `DISPLAY-7`, `DISPLAY-LARGE-CONDITIONAL`,
  `WEATHER-STANDARD`, `WEATHER-PRO`, `FLEET-START`, `FLEET-BUSINESS`,
  `FLEET-ENTERPRISE`).
- Legal sources: 48 official instruments/pages (31 EU, 14 Spanish, 3
  international/standards-body) in `data/legal-sources.json`.
- Legal requirements: 51 obligations with citation, owner, evidence and gate.
- Risks: 95 canonical risks in `data/risk-register.json`.
- Predecessor mappings: 134 records (58 MC-02, 39 MC-11, 23 MC-12, 14 MC-13),
  with 0 closed and 0 deleted by MC-14.
- Claims: 42 bilingual claim pairs; 30 mandatory prohibited categories.
- Website findings: 34 read-only findings (6 blocking, 20 major, 4 minor,
  4 informational).
- Release gates: 13; release documents: 24.
- External decisions: 20, all `PENDING` or `OUT_OF_SCOPE_FOR_MC14`.

## 6. Agent operating model

The milestone was executed as a multidisciplinary team with an independent
audit, under the Lead's integration control:

| Agent | Scope | Written output |
|---|---|---|
| Lead (integration) | Baseline, data model, risks, applicability, operators, consumer, privacy, cyber, licensing, liability, claims, gates, validator, tests, report | Core data and D01–D14, D16–D20, D22–D23 |
| Agent A — EU/Spain Regulatory Research | Primary-source research, dates, transpositions, escalation pack | `research/MC14-LEGAL-RESEARCH-DOSSIER.md`, `research/mc14-legal-sources.csv` |
| Agent F — Website/Commerce Governance | Read-only website and commerce inventory | D15 and `data/website-findings.json` |
| Agent G — Independent Compliance Auditor | Independent verification after freeze | D21 and `data/review-findings.json` |

Authoring agents do not approve their own legal or commercial conclusions. The
independent audit starts only after the implementation commit is frozen. Agent
A's research is integrated into `data/legal-sources.json` by the Lead; the
research dossier remains the primary-source trail.

## 7. Method and evidence standard

1. Research current official primary sources (EUR-Lex, Commission, BOE, Agencia
   Tributaria, AEPD, EUIPO/OEPM/WIPO, NMEA) and record retrieval dates.
2. Record each obligation with source, article, jurisdiction, dates,
   transposition status, product applicability, economic-operator role,
   evidence required, compliance status, uncertainty, owner and review gate.
3. Assess applicability per family, edition and bundle; never apply every
   instrument to every product; a `NOT_APPLICABLE` needs a cited rationale and a
   `CONDITIONALLY_APPLICABLE` needs the condition.
4. Convert findings into risks with accountable owners, required evidence and
   release gates; map inherited blockers without closing them.
5. Govern every commercial claim by class, audience, publication status,
   channel, evidence and approval.
6. Validate mechanically what is machine-verifiable and require human review
   for ambiguous legal questions.
7. Freeze the implementation, then obtain independent audit before recording a
   verdict.

The research date is 2026-11-02. Where a predecessor had already recorded a
source, the register says `CONSUMED_FROM_PREDECESSOR_EVIDENCE`; where this
session re-verified it, `VERIFIED_THIS_SESSION`; where retrieval failed,
`NOT_RETRIEVED`/`INACCESSIBLE`. No compliance conclusion rests on a
non-retrieved source.

## 8. Verdict criteria and honesty rules

The milestone may `PASS` only as an **internal governance scope** when the
deliverables are complete, applicability is reasoned, risks have owners and
evidence, claims are classified, bilingual parity holds, validators and
regressions pass, independent review signs off and commercial availability
remains blocked. It cannot `PASS` external legal clearance: that is
`NOT_GRANTED` by definition.

Rules applied throughout:

- An obligation being identified is not compliance.
- A product definition is not a tested product.
- An inherited certificate is not certification of a new integrated product.
- A commercial warranty does not replace mandatory consumer rights.
- A financial scenario does not authorise a launch or a profitability claim.
- No insurance, trademark, licence, certification or customer evidence is
  assumed.
- No provider, supplier, customer, regulator, insurer or lawyer was contacted.

## 9. Deliverable map

| ID | Document | Primary data |
|---|---|---|
| D01 | Baseline and governance | `manifest.json` |
| D02 | Primary legal source register | `legal-sources.json` |
| D03 | Regulatory applicability matrix | `regulatory-applicability.json` |
| D04 | Economic-operator responsibilities | `economic-operator-roles.json` |
| D05 | Legal/commercial risk register | `risk-register.json`, `predecessor-blocker-mapping.json` |
| D06 | IP, trademark and licensing risks | `licensing-rights.json` |
| D07 | Marine hardware conformity gates | `regulatory-applicability.json` |
| D08 | Consumer rights, warranty and returns | `consumer-rights.json` |
| D09 | Privacy and telemetry governance | `privacy-obligations.json` |
| D10 | CRA cybersecurity obligations | `cybersecurity-obligations.json` |
| D11 | Payments, tax and commercial contracts | `release-evidence-gates.json` |
| D12 | Product liability and insurance | `liability-insurance.json` |
| D13 | Commercial claims policy | `claims-policy.json` |
| D14 | Bilingual claims catalogue | `bilingual-claims.json` |
| D15 | Website and commerce inventory | `website-findings.json` |
| D16 | Legal release evidence gates | `release-evidence-gates.json` |
| D17 | Required external decisions | `external-decisions.json` |
| D18 | MC-15 handoff | `mc15-handoff-inputs.json` |
| D19 | Machine-readable contracts | data contract |
| D20 | Validation and adversarial testing | validator + tests |
| D21 | Independent review | `review-findings.json` |
| D22 | Spanish executive report | — |
| D23 | Final delivery record | — |

## 10. Limitations

The legal research is not a legal opinion. Several Spanish transpositions were
not retrieved in full and remain flagged. The applicability matrix is a
reasoned internal assessment, not a conformity file. The claims catalogue
contains no approved public claim. The website inventory is read-only and no
remediation was performed. The independent audit verifies internal consistency
and evidence handling; it does not replace counsel, a notified body, an insurer
or a market-surveillance authority.
