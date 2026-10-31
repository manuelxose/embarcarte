# MC-09 — Delivery record

Status: `PASS — INTERNAL DESK-RESEARCH AND MARKET-INTELLIGENCE SCOPE`, confirmed by
the independent review in `review/MC-09-REVIEW.md` (PASS, round 2, 8/8 findings
closed). Final evidence: implementation commit `566343e`, audit-correction commit
`d85733e`, draft PR [#15](https://github.com/manuelxose/embarcarte/pull/15) stacked
on `feature/marea-mc08-bundles-commercial-architecture`. The final delivery-update
commit is the branch head recorded on the PR.

This PASS is limited to the desk-research scope. It does not validate customer
demand, willingness to pay or profitability, and it does not clear any brand, IP,
data, conformity or safety blocker.

## 1. Baseline verification (before any change)

| Check | Result |
|---|---|
| Repository | `C:\Users\Admin\Documents\workspace\embarcarte`, remote `manuelxose/embarcarte` |
| Local branch at start | `feature/marea-mc08-bundles-commercial-architecture` |
| Local HEAD at start | `65417bfa681d31cc655e2bc91cfcedcccc368675` |
| Remote MC-08 HEAD | `65417bfa681d31cc655e2bc91cfcedcccc368675` (verified by `git fetch` + `git rev-parse`) |
| PR #14 | OPEN, draft, base `feature/marea-mc07-display-weather-fleet-products`, head SHA matches, `MERGEABLE` |
| Working tree | clean (`git status --porcelain` empty) |
| gh authentication | `manuelxose` authenticated |
| Toolchain | Node v24.18.0, npm 12.0.1; repository `package.json` scripts inspected |
| Authorities read | `AGENTS.md`, `AGENT-OPERATING-MODEL.md`, `MASTER-PROMPT-REGISTRY.md`, `MARKET-BENCHMARKS.md`, bundle/product contracts, brand/compliance restrictions |

MC-08 is unmerged, so the branch policy in §1.3 of the Master Prompt applies:
branch `feature/marea-mc09-market-competitive-intelligence` created from the
verified MC-08 HEAD; PR to be stacked on the MC-08 branch.

## 2. Team execution

| Member | Role | Deliverables |
|---|---|---|
| `lead` | Chief Strategy Officer; Git; integration; final report | scope, source register, positioning, prioritization, decision register, assessments, data contract, validator, delivery, Spanish report |
| `agent-a-market` | Marine market analyst | market assessment, geographic prioritization, TAM/SAM/SOM |
| `agent-b-competitors` | Competitive intelligence | competitor landscape, nine-family and six-bundle benchmarks, price register |
| `agent-c-buyers` | Buyer and customer research | buyer segments, public customer evidence |
| `agent-d-economics` | Pricing and commercial economics | pricing/WTP, customer TCO, conditional economics |
| `agent-e-channels` | Channels and digital demand | distribution strategy, search/demand signals |
| `agent-g-mc10` | MC-10 methodology | MC-10 discovery package, validation experiments |
| `agent-f-auditor` | Independent auditor | independent review (not an author of the research) |

Write scopes were exclusive per member; no two agents wrote the same file. The
Lead re-inspected `git status` and the full diff before committing. All members
shared one checkout (no worktree isolation), so writes were serialised by scope.

## 3. Deliverables (D1–D26)

| ID | Deliverable | Path |
|---|---|---|
| D1 | Research scope | `MC09-RESEARCH-SCOPE.md` |
| D2 | Source register (115 sources) | `MC09-SOURCE-REGISTER.md` |
| D3 | Marine market assessment | `market/MC09-MARINE-MARKET-ASSESSMENT.md` |
| D4 | Geographic prioritization | `market/MC09-GEOGRAPHIC-PRIORITIZATION.md` |
| D5 | TAM/SAM/SOM model | `market/MC09-MARKET-SIZING.md` |
| D6 | Competitor landscape | `competitors/MC09-COMPETITOR-LANDSCAPE.md` |
| D7 | Product benchmarks (9/9) | `competitors/MC09-PRODUCT-BENCHMARKS.md` |
| D8 | Bundle benchmarks (6/6) | `competitors/MC09-BUNDLE-BENCHMARKS.md` |
| D9 | Competitor price register | `competitors/MC09-COMPETITOR-PRICING.md` |
| D10 | Buyer segmentation (8/8) | `buyers/MC09-BUYER-SEGMENTS.md` |
| D11 | Public customer problems | `buyers/MC09-PUBLIC-CUSTOMER-EVIDENCE.md` |
| D12 | Search and digital demand | `channels/MC09-SEARCH-AND-DEMAND-SIGNALS.md` |
| D13 | Distribution and sales channels | `channels/MC09-DISTRIBUTION-STRATEGY.md` |
| D14 | Pricing and WTP hypotheses | `economics/MC09-PRICING-AND-WTP.md` |
| D15 | Customer TCO | `economics/MC09-CUSTOMER-TCO.md` |
| D16 | Conditional commercial economics | `economics/MC09-COMMERCIAL-ECONOMICS.md` |
| D17 | Competitive positioning | `MC09-COMPETITIVE-POSITIONING.md` |
| D18 | Product and bundle prioritization | `MC09-PORTFOLIO-PRIORITIZATION.md` |
| D19 | MC-10 discovery package (ES/EN) | `buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` |
| D20 | Validation experiment plan | `MC09-VALIDATION-EXPERIMENTS.md` |
| D21 | Decision and risk register | `MC09-DECISION-REGISTER.md` |
| D22 | Machine-readable research contract | `data/` (22 files, manifest + README contract) |
| D23 | Validator and negative tests | `scripts/check-marea-market.mjs`, `scripts/check-marea-market.test.mjs` |
| D24 | Independent review | `review/MC-09-REVIEW.md`, `data/review-findings.json` |
| D25 | Executive report (Spanish) | `MC09-EXECUTIVE-REPORT.md` |
| D26 | Delivery record | `MC-09-DELIVERY.md` |

## 4. Data contract summary

- 23 machine-readable files: governance status, manifest, six evidence files,
  market inputs, geo assessments, 48 competitor observations, 56 price records,
  8 buyer segments, 23 public signals, 6 TCO models, 15 WTP hypotheses, 6 channel
  assessments, 29 search signals, 10 validation experiments, product/bundle
  assessments, 19 decision links, audit findings.
- 115 sources, 136 claims; unique source IDs and unique URLs (no duplicate-page
  inflation); `INACCESSIBLE`/`STALE`/`CONTRADICTED` statuses recorded rather than
  deleted.
- Original currencies and tax treatments preserved; derived totals are separate
  `MODEL_DERIVED` records.
- No interviews, surveys, purchases or outreach data anywhere in the dataset.

## 5. Governance preserved

| Restriction | Status after MC-09 |
|---|---|
| Trademark legal clearance | `NOT_GRANTED` |
| Source IP clearance | `NOT_CLEARED` |
| Customer demand empirically validated | `NO` |
| Willingness to pay empirically validated | `NO` |
| Product profitability established | `NO` |
| Commercial publication | `BLOCKED` |
| Product sales | `BLOCKED` |
| Production deployment | `NOT_AUTHORIZED` |
| Products for sale | 0 |
| Compatibility rows tested | 0 |
| Approved prices | 0 |
| PILOT safety gate | `BLOCKED` |
| WATCH alert guarantee | not claimed |
| FLEET hardware included by default | false |
| Fixed SAIL/COMPLETE turnkey price | not permitted |

No canonical product or bundle contract was modified; the validator proves this
on every run (`MK-34`). No `src/`, `deploy/` or public-page change was made.

## 6. Commands and results

Executed on the reviewed tree (commit `d85733e`, clean working tree), Windows 11,
Node v24.18.0:

| Command | Result |
|---|---|
| `npm run test:market` | PASS — 40/40 checks |
| `npm run test:market:unit` | PASS — 43/43 tests |
| `npm run test:products` | PASS — 52/52 checks |
| `npm run test:products:unit` | PASS — 106/106 tests |
| `npm run test:bundles` | PASS — 35/35 checks |
| `npm run test:bundles:unit` | PASS — 60/60 tests |
| `npm run test:brand` | PASS — 21/21 checks, 24 governed files |
| `npm run test:brand:unit` | PASS — 13/13 tests |
| `npm run build` | PASS (Angular SSR production build) |
| `npm run test:i18n` | PASS |
| `npm run test:commerce` | PASS |
| `npm run test:seo` | PASS — 101 sitemap URLs |
| `npm run test:backup` | PASS |
| `npm run test:e2e` | PASS — 15/15 (a first run while the production build was executing concurrently timed out once at navigation and did not reproduce on an isolated rerun; both runs are recorded, the isolated run is the gate result) |
| `npm run format:check` | PASS — all matched files use Prettier |
| `npm audit --omit=dev --audit-level=high` | PASS — 0 vulnerabilities |
| `git diff --check` | PASS — no whitespace errors |

The independent reviewer re-ran `test:market`, `test:market:unit`,
`test:products`, `test:bundles`, `test:brand` and `git diff --check` at
`d85733e` and independently reproduced the rankings, TAM/SAM/SOM arithmetic, TCO
partial sums and 16 observed prices against their original URLs.

## 7. Independent review

`review/MC-09-REVIEW.md` — **PASS — INTERNAL DESK-RESEARCH AND MARKET-INTELLIGENCE
SCOPE**, round 2, no open BLOCKING/MAJOR/MINOR finding.

Round 1 found 1 MAJOR, 3 MINOR and 4 INFORMATIONAL findings. All eight are closed
with the reviewer's own re-verification:

- F-01 (MAJOR): the executive report's universal "no competitor sells an installed
  bundle" claim is now scoped to the 48 observed competitors / 27 sources, with a
  statement that the sample cannot speak for the rest of the market.
- F-02 (MINOR): Orca year-one totals corrected (one year of Smart Navigation is
  included with Core, so the START-equivalent is EUR 649 year one and EUR 698
  from year two; guard mode EUR 649 / EUR 798).
- F-03 (MINOR): Spanish source breakdown corrected to 5 economics sources (115
  total).
- F-04 (MINOR): manifest buyer-segment purpose corrected to HYPOTHETICAL_ARCHETYPE.
- F-05/F-06 (INFORMATIONAL): deliverable counts and manifest integration of
  `review-findings.json` completed; validator back to 40/40.
- F-07 (INFORMATIONAL): accepted residual — the Getxo tariff PDF could not be
  re-opened and 62/115 sources have no `publishedAt`; recorded, not filled in.
- F-08 (INFORMATIONAL): delivery-update fields completed in this commit.

## 8. Git and remote evidence

- Branch: `feature/marea-mc09-market-competitive-intelligence`
- Base: MC-08 HEAD `65417bfa681d31cc655e2bc91cfcedcccc368675`
- Implementation commit: `566343e493e392058bd1a662a6465e02ee4bccd0`
- Audit-correction commit: `d85733e49c7e78fa8cfa045ff440579c57ff6bb5`
- Draft PR: [#15](https://github.com/manuelxose/embarcarte/pull/15), base
  `feature/marea-mc08-bundles-commercial-architecture`, draft, `MERGEABLE`
- Remote head verified after push; no force-push
- No merge, no force-push, no tag, no deployment, no publication, no checkout, no
  outreach, no spend

## 9. Handoff to MC-10

MC-10 input: the MC-10 discovery package (`buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md`),
the pre-registered experiments (`MC09-VALIDATION-EXPERIMENTS.md`), the prioritised
cohorts (S3, S1, S5, S6 first) and the evidence thresholds in
`MC09-PORTFOLIO-PRIORITIZATION.md`. MC-10 remains **not started** and requires
authorisation for real customer contact.
