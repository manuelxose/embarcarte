# MC-09 — Market research scope and methodology

Status: `INTERNAL_DESK_RESEARCH`. Milestone MC-09 of the 36-prompt MAREA program.
Branch: `feature/marea-mc09-market-competitive-intelligence`.
Base: MC-08 HEAD `65417bfa681d31cc655e2bc91cfcedcccc368675`.
Research window: single desk-research session on **2026-10-31**; every retrieved
observation carries that access date. No primary fieldwork was performed.

Commercial publication: NOT AUTHORIZED. MAREA trademark use: INTERNAL ONLY.
Customer outreach: NOT AUTHORIZED. Paid research: NOT AUTHORIZED.
Sales: NOT AUTHORIZED. Production deployment: NOT AUTHORIZED.

## 1. Purpose

Decide where EMBARCARTE should invest its next development, validation and
commercial resources for the proposed MAREA portfolio, using source-backed
market, competitor, buyer and channel evidence, and prepare the MC-10 customer
discovery instruments. This is a desk-research decision package, not a business
plan and not a market forecast. It may recommend concentrating on fewer than the
nine canonical families or six canonical bundles.

## 2. Research questions

The 24 mandated questions are grouped into five clusters; the cluster owner is
the specialist lead, but every final claim is integrated and cited at Lead level.

| # | Cluster | Question | Primary deliverable |
|---|---|---|---|
| 1 | Demand | What problems are recreational and professional boat owners actively trying to solve? | D11, D10 |
| 2 | Demand | Which problems are frequent, expensive or operationally important? | D11 |
| 3 | Alternatives | How are these problems solved today? | D6, D11 |
| 4 | Competitors | Which established companies address them? | D6 |
| 5 | Competitors | What do their products actually include? | D7, D8 |
| 6 | Competitors | What prices, subscriptions and installation costs are observable? | D9 |
| 7 | Gaps | What problems or frustrations remain unresolved? | D11, D17 |
| 8 | Differentiation | Which MAREA capabilities could offer meaningful differentiation? | D17 |
| 9 | Differentiation | Which proposed differences are still technically unproven? | D17 |
| 10 | Geography | What geographic markets provide plausible opportunities? | D4 |
| 11 | Sizing | What is the addressable customer base, based on defensible sources? | D5 |
| 12 | Channels | What distribution channels control customer acquisition? | D13 |
| 13 | Channels | What role do installers, shipyards, marinas and dealers play? | D13 |
| 14 | Channels | Which products suit direct digital distribution? | D13, D17 |
| 15 | Channels | Which products require hardware manufacturing and professional installation? | D13, D17 |
| 16 | Revenue | Which opportunities offer recurring-revenue potential? | D14, D16 |
| 17 | Pricing | How sensitive might demand be to pricing and subscription costs? | D14, D15 |
| 18 | Pricing | Which historical MAREA prices appear commercially plausible? | D14, D15 |
| 19 | Pricing | Which prices remain unsupported by production economics? | D16 |
| 20 | Prioritization | Which product families deserve investment priority? | D18 |
| 21 | Prioritization | Which bundles deserve further commercial validation? | D18 |
| 22 | Prioritization | Which opportunities should be postponed or abandoned? | D18, D21 |
| 23 | Risk | What uncertainties could invalidate the business plan? | D21 |
| 24 | Handoff | What must be learned directly from customers in MC-10? | D19, D20 |

## 3. Methods

- **Desk research only.** Public official statistics, marine-industry association
  publications, manufacturer and retailer product pages, public support
  documentation, public owner-community discussions, published methodology
  references.
- **Source hierarchy.** `PRIMARY_OFFICIAL` > `PRIMARY_RETAILER` (for what is
  advertised and at what observed price) > `SECONDARY_INDEPENDENT` >
  `PUBLIC_CUSTOMER_SIGNAL` > `MODEL_DERIVED` > `HYPOTHESIS`. Authority must match
  the claim: a manufacturer establishes what it advertises and its list price; it
  does not establish real-world reliability or independent performance.
- **Market sizing.** Bottom-up where the population and filters are observable.
  Every input is classified OBSERVED, ASSUMED or DERIVED with a source or an
  explicit assumption label. A numeric SOM is never derived from an arbitrary
  market-share percentage. Missing inputs produce a partial model with ranges and
  a confidence label, not an invented forecast.
- **Competitive evidence.** Unique evidence and price IDs; original currency and
  tax treatment preserved; manufacturer list price, retailer offer, promotional
  price, VAT-exclusive price and non-EUR price kept distinct; inferred prices are
  `MODEL_DERIVED`, never observed.
- **Buyers.** Segmentation from public evidence and documented behaviours;
  illustrative personas are `HYPOTHETICAL_ARCHETYPE`; no invented interviews,
  quotes or testimonials; forum anecdotes are not prevalence evidence.
- **Pricing and WTP.** Historical MAREA figures remain `HYPOTHESIS_UNAPPROVED`.
  Total cost of ownership models mark unknown components UNKNOWN and cannot
  report them as zero. WTP is `NOT_MEASURED` in MC-09; instruments are prepared
  for MC-10.
- **Prioritization.** Weights are defined and frozen before scoring, applied
  identically to all nine families and six bundles, and separated into two
  independent conclusions: commercial attractiveness and release readiness.

## 4. Boundaries

In scope: Galicia / Rías Baixas, Northern Portugal, Spain, Portugal, selected EU
comparators. Regional relevance is assessed, not assumed.
Out of scope for MC-09: interviews, surveys, advertising experiments, purchases,
supplier quotations, BOM construction, certification work, legal clearance,
production deployment, commercial publication and sales. Anything requiring
those is recorded as a dependency or an MC-10/later-milestone action.

## 5. Integrity rules

1. Zero fabricated evidence: no invented price, statistic, interview, testimonial,
   purchase commitment, quotation, certification, penetration, adoption,
   conversion, search volume or willingness-to-pay measurement.
2. An assumption is always identifiable as an assumption and is never silently
   promoted to a finding.
3. A source that cannot be accessed is `INACCESSIBLE`; a source that is too old or
   out of scope is `STALE`; a claim contradicted by better evidence is
   `CONTRADICTED`. None of these may be presented as verified current fact.
4. Confidence (`HIGH`/`MEDIUM`/`LOW`/`UNKNOWN`) qualifies evidence but never
   replaces a citation.
5. Canonical definitions (nine families, six bundles, edition and lifecycle
   contracts) are not rewritten to fit newly found competitors.
6. Governance statuses in `data/governance-status.json` are invariant and may not
   be restated in a stronger form.

## 6. Deliverables

| ID | Deliverable | Path |
|---|---|---|
| D1 | Research scope (this document) | `MC09-RESEARCH-SCOPE.md` |
| D2 | Source register | `MC09-SOURCE-REGISTER.md` |
| D3 | Marine market assessment | `market/MC09-MARINE-MARKET-ASSESSMENT.md` |
| D4 | Geographic prioritization | `market/MC09-GEOGRAPHIC-PRIORITIZATION.md` |
| D5 | TAM/SAM/SOM model | `market/MC09-MARKET-SIZING.md` |
| D6 | Competitor landscape | `competitors/MC09-COMPETITOR-LANDSCAPE.md` |
| D7 | Product benchmarks (9 families) | `competitors/MC09-PRODUCT-BENCHMARKS.md` |
| D8 | Bundle benchmarks (6 bundles) | `competitors/MC09-BUNDLE-BENCHMARKS.md` |
| D9 | Competitor price register | `competitors/MC09-COMPETITOR-PRICING.md` |
| D10 | Buyer segmentation | `buyers/MC09-BUYER-SEGMENTS.md` |
| D11 | Public customer problems | `buyers/MC09-PUBLIC-CUSTOMER-EVIDENCE.md` |
| D12 | Search and digital demand | `channels/MC09-SEARCH-AND-DEMAND-SIGNALS.md` |
| D13 | Distribution and sales channels | `channels/MC09-DISTRIBUTION-STRATEGY.md` |
| D14 | Pricing and WTP hypotheses | `economics/MC09-PRICING-AND-WTP.md` |
| D15 | Customer TCO | `economics/MC09-CUSTOMER-TCO.md` |
| D16 | Conditional commercial economics | `economics/MC09-COMMERCIAL-ECONOMICS.md` |
| D17 | Positioning strategy | `MC09-COMPETITIVE-POSITIONING.md` |
| D18 | Product and bundle prioritization | `MC09-PORTFOLIO-PRIORITIZATION.md` |
| D19 | MC-10 discovery package | `buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md` |
| D20 | Validation experiment plan | `MC09-VALIDATION-EXPERIMENTS.md` |
| D21 | Decision and risk register | `MC09-DECISION-REGISTER.md` |
| D22 | Machine-readable research contract | `data/*.json` |
| D23 | Validator and tests | `scripts/check-marea-market.mjs`, `scripts/check-marea-market.test.mjs` |
| D24 | Independent review | `review/MC-09-REVIEW.md` |
| D25 | Executive report (Spanish) | `MC09-EXECUTIVE-REPORT.md` |
| D26 | Final delivery | `MC-09-DELIVERY.md` |

## 7. Known limitations of this research

- Single-session desk research: prices and availability change; competitor pages
  may be geo- or VAT-context specific.
- Public statistics lag and often count registrations, not active vessels.
- No customer interviews, so demand and WTP remain unvalidated.
- No supplier quotations or BOM, so profitability cannot be established.
- Search-interest evidence is relative, not absolute demand.
- Some pages may be inaccessible from this environment; those are recorded as
  such instead of replaced by inference.

## 8. Team and write scopes

| Member | Role | Exclusive write scope |
|---|---|---|
| `lead` | Chief Strategy Officer; Git; integration; final report | root validation docs, `data/manifest.json`, `data/governance-status.json`, assessments, script, registry, delivery |
| `agent-a-market` | Marine market analyst | `market/`, `data/evidence-market.json`, `data/market-inputs.json`, `data/geo-assessments.json` |
| `agent-b-competitors` | Competitive intelligence | `competitors/`, competitor and price data |
| `agent-c-buyers` | Buyer and customer research | two `buyers/` files, buyer and public-signal data |
| `agent-d-economics` | Pricing and commercial economics | `economics/`, TCO and WTP data |
| `agent-e-channels` | Channels and digital demand | `channels/`, channel and search data |
| `agent-g-mc10` | MC-10 methodology | MC-10 plan, validation experiments and their data |
| `agent-f-auditor` | Independent evidence auditor | `review/` only; does not author research |

Verification: `scripts/check-marea-market.mjs` (evidence integrity, references,
structure, governance restrictions) with a negative-mutation test suite, plus the
repository regression gates. The independent auditor rechecks primary sources and
the real diff and issues the verdict.
