# MC-10 — Research scope and verified baseline

| Field | Value |
| --- | --- |
| Document ID | MC-10 / D1 / MC10-RESEARCH-SCOPE |
| Milestone | MC-10 of 36 — primary customer discovery |
| Status | `BLOCKED — OUTREACH AUTHORIZATION NOT GRANTED`; Wave 0 preparation complete |
| Fieldwork | **none**: 0 participants identified, 0 contacted, 0 invited, 0 screened, 0 interviews, 0 price responses |
| WTP | `NOT_MEASURED` — no stated-preference evidence exists |
| Base | MC-09 branch `feature/marea-mc09-market-competitive-intelligence`, HEAD `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3` |
| Working branch | `feature/marea-mc10-primary-customer-discovery` |
| Date | 2026-11-01 |
| Owner | Lead (research programme director) |
| Commercial effect | None. No price, product, bundle, readiness or publication status changes. |

This is the scope of record for MC-10. It replaces no canonical product or bundle contract, no
MC-09 ranking and no commercial restriction. Its purpose is to define what MC-10 set out to
establish, what it actually established, and why the primary-research scope is **not** passed.

## 1. Why this milestone exists

MC-09 produced desk-research prioritisation of nine product families and six bundles from 115
public sources and 136 evidence-linked claims. Those scores are **prioritisation outcomes, not
measured demand**. MC-10 was mandated to replace the most important untested commercial
assumptions with documented evidence from actual market participants:

1. Which marine-electronics problems customers describe unprompted.
2. Which problems caused real expenditure, maintenance work, replacement decisions or operational loss.
3. What equipment and subscriptions participants actually bought, why, and what they rejected.
4. Whether recurring marine subscriptions are accepted and what must survive cancellation.
5. Whether remote monitoring matters to owners of unattended vessels and what would make it insufficient.
6. Which compatibility, warranty, liability and documentation conditions installers require.
7. Whether START, PROTECT, NAV and the integrated concepts are understood, including their exclusions.
8. Whether any stated-price direction is coherent enough to justify a later quantitative study.
9. Which concepts deserve quantitative validation, redesign, deferral or discontinuation.
10. What evidence is still missing before manufacturing or commercial-launch commitments.

The research had to challenge the portfolio, not confirm it.

## 2. Verified baseline before any change

| Check | Result | Evidence |
| --- | --- | --- |
| Repository path | `C:\Users\Admin\Documents\workspace\embarcarte` | `git rev-parse --show-toplevel` |
| Remote origin | `https://github.com/manuelxose/embarcarte.git` | `git remote -v` |
| Branch at start | `feature/marea-mc09-market-competitive-intelligence` | `git branch --show-current` |
| HEAD at start | `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3` | `git rev-parse HEAD` |
| Remote MC-09 HEAD | identical, `9d206cc2…` | `git fetch` + `git rev-parse origin/…` |
| Working tree | clean | `git status --porcelain` empty |
| PR #15 | `OPEN`, `draft`, base `feature/marea-mc08-bundles-commercial-architecture`, head `9d206cc2…`, `MERGEABLE` | `gh pr view 15 --json …` |
| GitHub auth | `manuelxose` authenticated (`repo`, `workflow` scopes) | `gh auth status` |
| Toolchain | Node `v24.18.0`, npm `12.0.1` | `node -v`, `npm -v` |
| MC-09 result | `PASS — INTERNAL DESK-RESEARCH AND MARKET-INTELLIGENCE SCOPE`, review round 2, 8/8 findings closed | `MC-09-DELIVERY.md`, `review/MC-09-REVIEW.md` |
| Existing MC-10 work | none; no `docs/marea/customer-discovery/` existed; registry row 10 `PLANNED` | registry, `git ls-files` |
| Authorities read | `AGENTS.md`, `AGENT-OPERATING-MODEL.md`, `MASTER-PROMPT-REGISTRY.md`, `DECISION-LOG.md`, MC-09 research authority, product/bundle contracts, brand/compliance restrictions | this document, §9 |

MC-09 is unmerged, so the branch policy of the Master Prompt applies: MC-10 was branched from the
verified MC-09 HEAD and the eventual draft PR targets `feature/marea-mc09-market-competitive-intelligence`.

## 3. Scope boundary

### 3.1 In scope

- Wave 0 research readiness: authorization record, ethics and privacy design, protocol,
  instrument freeze, recruitment plan and templates, data contract, capture and analysis planning,
  frozen thresholds and price ladders, research-integrity validator and negative tests.
- Honest classification of the ten pre-registered experiments.
- Honest product and bundle evidence assessment: all nine families and six bundles classified
  `NOT_TESTED` because no participant evidence exists.
- A stated-preference pricing design that cannot be mistaken for measured willingness to pay.
- An MC-11 handoff that separates customer questions from hardware, supplier and conformity questions.

### 3.2 Explicitly out of scope (and not performed)

- Any external contact, invitation, screening, interview, survey, advertising, paid research or
  participant recruitment.
- Any purchase, order, deposit, pre-order or commercial commitment.
- Any product, bundle, price, discount, availability, certification, warranty, compatibility or
  delivery promise.
- Any change to canonical product/bundle contracts, public pages, `src/`, `deploy/` or the indexable URL set.
- Any substitution of desk research, synthetic text or simulated dialogue for primary evidence.

## 4. Study population preserved from MC-09

| ID | Participant category | Planned completed interviews | Completed in MC-10 |
| --- | --- | ---: | ---: |
| SEG-01 | Recreational motorboat owners | 5–8 | 0 |
| SEG-02 | Sailing yacht owners | 5–8 | 0 |
| SEG-03 | Owners keeping boats unattended in marinas | 5–8 | 0 |
| SEG-04 | Marine electronics installers | 5–7 | 0 |
| SEG-05 | Marine retailers / chandlers | 5–7 | 0 |
| SEG-06 | Marina or shipyard operators | 3–5 | 0 |
| SEG-07 | Charter operators / sailing schools | 5–8 | 0 |
| SEG-08 | Fleet managers | 4–6 | 0 |
| — | **Total** | **40–80** | **0** |

Geography: Rías Baixas and Galicia were prepared; northern Portugal remains conditional because
Portuguese instruments are `NOT_PRODUCED` without qualified linguistic review. No geographic
distribution exists to report.

**Registered quota inconsistency (preserved, not silently fixed).** The per-segment quotas sum to
**37 minimum / 57 maximum**, while the MC-09 plan, the experiment registry and this milestone's
sample target state a **40–80** total. In addition, the plan summary says "minimum 5, target 8
(operators/retailers minimum 3)", the segment table gives SEG-04/05 a minimum of 5, and the registry
says "target 8–10" — three different readings. MC-10 does **not** change any quota; it records the
conflict and requires a dated plan amendment before fielding. It also follows that the pricing-module
minimum of n ≥ 8 per segment (EXP-MC10-04/05) is unreachable for SEG-04 (max 7), SEG-05 (max 7),
SEG-06 (max 5) and SEG-08 (max 6) under the preserved quotas, so any future pricing result for those
segments must be reported `BELOW_REGISTERED_MINIMUM` unless the quotas are formally amended. These
defects are listed in `data/research-status.json` → `planningInconsistencies`.

## 5. The ten pre-registered experiments

The hypotheses, minimum evidence, thresholds, confounders and interpretation rules are frozen from
`docs/marea/market-validation/data/validation-experiments.json` (MC-09 registry). MC-10 froze each
record by SHA-256 before any data could exist; see `MC10-EXPERIMENT-RESULTS.md` and
`data/experiments.json`. A change now requires a dated amendment, and historical results would
remain evaluated under the version in force when collected.

Status: **all ten `NOT_EXECUTED` / `BLOCKED`** by the authorization gate. No experiment received a
single response. None was re-scoped, weakened, deleted or silently reworded.

## 6. Wave plan and actual state

| Wave | Work | Planned experiments | Actual state |
| --- | --- | --- | --- |
| W0 | Internal readiness | — | **COMPLETE as preparation** (validators, freeze); 13 of 17 pre-fieldwork items are not complete (6 BLOCKED, 5 NOT_APPROVED, 1 PARTIAL, 1 NOT_PRODUCED) |
| W1 | Problems, installation, comprehension | EXP-MC10-01, 02, 06, 10 | `NOT_EXECUTED` — authorization absent |
| W2 | Subscription and price testing | EXP-MC10-03, 04, 05 | `NOT_EXECUTED` — authorization absent |
| W3 | Professional and B2B validation | EXP-MC10-07, 08, 09 | `NOT_EXECUTED` — authorization absent |
| W4 | Coding and reconciliation | all | `NOT_EXECUTED` — no real data exists to code |

## 7. The authorization gate

The MC-10 execution request states that customer outreach requires explicit separate authorization
and that the request itself does not authorize external contact. No later authorization record
exists. Therefore:

```
OUTREACH_AUTHORIZATION = NOT_GRANTED
FIELDWORK_STATUS        = BLOCKED
MILESTONE_STATUS        = BLOCKED
```

No candidate was identified, no invitation was drafted for a real recipient, no channel was
contacted, and no interview may ever be counted without a real eligible participant, valid consent
and a completed record. Section 4.2 of the Master Prompt required an authorization record naming the
authorizer, date, participant categories, geography, contact methods, volume limits, spend and
incentive status, duration and fieldwork lead. `MC10-FIELDWORK-AUTHORIZATION.md` records every
required field as absent.

## 8. Outcome definitions for this milestone

| Outcome | Meaning |
| --- | --- |
| `PASS — PRIMARY QUALITATIVE CUSTOMER DISCOVERY SCOPE` | Not available to MC-10. Requires real authorization, real eligible participants, valid consent, genuine records, coding, quality checks and an independent review. None exists. |
| `PARTIAL` | Verified work committed but required fieldwork incomplete or externally blocked. |
| `BLOCKED` | Essential permissions, infrastructure or access prevent real fieldwork. **This is the MC-10 outcome.** |
| `FAIL` | Research integrity, participant safeguards or mandatory criteria are violated. |

The milestone reports `BLOCKED` for the primary-research scope while the Wave 0 preparation
artifacts are present for independent verification. Preparation is not presented as customer research.

## 9. Authority map

| Authority | Use in MC-10 |
| --- | --- |
| `AGENTS.md` | Repository rules, truthfulness, agent write rules, delivery states |
| `docs/marea/execution/AGENT-OPERATING-MODEL.md` | Roles, delegation, review independence, milestone status rules |
| `docs/marea/execution/MASTER-PROMPT-REGISTRY.md` | Program shape and MC-09 closure evidence |
| `docs/marea/execution/DECISION-LOG.md` | D-026–D-028 and MC-10 entries D-029–D-033 |
| `docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` | Segments, instruments, schema, analysis plan, privacy design |
| `docs/marea/market-validation/data/validation-experiments.json` | Frozen experiment registry |
| `docs/marea/market-validation/MC09-PORTFOLIO-PRIORITIZATION.md` | MC-09 product/bundle priorities and evidence thresholds |
| `docs/marea/products/`, `docs/marea/bundles/` | Canonical concepts, compositions, exclusions, restrictions |
| `docs/marea/brand/`, `docs/marea/compliance/` | Brand, trademark, IP and publication restrictions |

## 10. What this milestone is not

It is not evidence that any customer problem is unimportant, that any product is unwanted, or that
the MC-09 ranking is wrong. Zero interviews are not a negative result; they are an absence of data.
The correct reading is: **MC-10 did not test the market, and therefore no commercial claim can be
strengthened, weakened or approved on its evidence.**

## 11. Next action

Execute the recorded unblock sequence in `MC10-FIELDWORK-AUTHORIZATION.md` §5: issue AUTH-MC10-001
with a real scope, designate the data controller and privacy contact, complete legal review of the
lawful basis and recruitment communications, provision secure Layer A/B storage, and assign trained
human interviewers. Until then, no external contact is permitted and no interview count may exist.
