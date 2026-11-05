# MC-09 / D4 — Geographic prioritization

| Field | Value |
|---|---|
| Document ID | MC-09 / D4 / MC09-GEOGRAPHIC-PRIORITIZATION |
| Workstream | A — Marine market analyst (`agent-a-market`) |
| Milestone | MC-09 |
| Date | 2026-10-31 |
| Status | `INTERNAL_DESK_RESEARCH` — not for publication |
| Machine-readable layer | `data/geo-assessments.json` (weights, scores, ranks, gaps) |
| Supporting evidence | `data/evidence-market.json`, `data/market-inputs.json` |

Purpose: decide **which geographic market EMBARCARTE should serve first with
MAREA**, and state plainly what the ranking does and does not measure.

The weights and the scoring rubric below were fixed **before** any region was
scored (`weightsFrozenAt: 2026-10-31`, `weightsFrozenBeforeScoring: true` in
`geo-assessments.json`). No weight was adjusted after seeing a result. Changing a
weight is a documented revision, not an edit.

## 1. Decision framing

Three separable questions are often conflated. They are answered separately here:

1. **Attractiveness** — how large and how addressable is the market in absolute
   terms? *Measured by the frozen weighted score.*
2. **Sequencing** — which region should be served in which order, given a small
   team based in Galicia? *A separate analyst overlay, labelled as judgement.*
3. **Evidence confidence** — how much of the above rests on published data rather
   than assumption? *An explicit criterion (10%) plus per-region evidence gaps.*

A region can rank high on attractiveness and still be sequenced late. The
Balearic Islands are exactly that case.

## 2. Criteria and frozen weights

| # | Criterion | Weight | What it measures | Why this weight |
|---|---|---:|---|---|
| C1 | `baseDensity` | 0.25 | Documented berth capacity and vessel population | Hardware needs a physically present installed base; best-evidenced criterion |
| C2 | `demandMomentum` | 0.15 | 2025 vs 2024 new registrations | New owners buy equipment; kept modest because a one-year provincial change is noisy |
| C3 | `addressableMix` | 0.15 | Plausible share of 6–16 m craft | Hard eligibility filter, but regionally unmeasured, so scored conservatively |
| C4 | `commercialOperators` | 0.15 | Charter, rental, school, small-professional operators | Only segment with plausible recurring per-vessel revenue (FLEET) |
| C5 | `seasonalityWindow` | 0.10 | Operating season and peak occupancy | Installation capacity is consumed in a short window |
| C6 | `channelEcosystem` | 0.10 | Installers, yards, chandlery | Hardware cannot sell without installation; evidence weak, so weight limited |
| C7 | `evidenceQuality` | 0.10 | Robustness of region-specific published data | Decision-risk criterion, deliberately not dominant |
| | **Total** | **1.00** | | |

Scoring: 1–5 per criterion. Weighted score = Σ(score × weight), range 1.00–5.00;
normalised = weighted / 5 × 100. Scores are analyst judgements anchored to cited
claims and carry the confidence of the weakest supporting claim.

## 3. Results

| Rank | Region | C1 | C2 | C3 | C4 | C5 | C6 | C7 | Weighted | Normalised | Recommendation |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | Rías Baixas (Pontevedra coast) | 5 | 5 | 3 | 3 | 4 | 3 | 4 | 4.00 | 80.0 | **ALLOCATE_NOW** |
| 2 | Balearic Islands | 4 | 2 | 4 | 5 | 3 | 3 | 3 | 3.55 | 71.0 | DEFER |
| 3 | Catalonia / Barcelona | 3 | 3 | 4 | 4 | 3 | 3 | 3 | 3.30 | 66.0 | DEFER |
| 4 | A Coruña / Costa da Morte | 4 | 2 | 3 | 2 | 4 | 3 | 4 | 3.15 | 63.0 | **PHASE_2** |
| 5 | Northern Portugal | 3 | 2 | 3 | 3 | 4 | 2 | 2 | 2.75 | 55.0 | **PHASE_2** |
| 6 | Cantabria | 2 | 4 | 2 | 2 | 3 | 2 | 3 | 2.50 | 50.0 | MONITOR |
| 7 | Asturias | 2 | 2 | 2 | 2 | 3 | 2 | 3 | 2.20 | 44.0 | MONITOR |
| 8 | Basque Country | 2 | 1 | 2 | 2 | 3 | 2 | 3 | 2.05 | 41.0 | MONITOR |
| 9 | A Mariña (Lugo) | 2 | 3 | 2 | 1 | 3 | 1 | 2 | 2.00 | 40.0 | MONITOR |

Scores and rationales per dimension are in `geo-assessments.json`; each dimension
carries its `evidenceClaimIds`. This table is a summary of that file, which is the
authority if they diverge.

## 4. Why Rías Baixas wins

Rías Baixas is the only region in the research area that combines **density** and
**momentum**:

- **4,600+ berths** on the Pontevedra coast across around twenty facilities
  (CLM-MKT-013), out of 10,500 Galician berths (CLM-MKT-011).
- **Pontevedra +41.4% registrations in 2025** (229 vs 162), the only coastal
  Galician province growing and the second-largest Galician flow overall
  (CLM-MKT-009).
- **A defined peak with a usable shoulder**: August 100% occupancy with a waiting
  list, July around 50% (CLM-MKT-020); 6,321 transit vessels in Galicia in 2024
  (CLM-MKT-012).
- **Reachable channel**: at least one documented yard/chandlery and one
  naval-electronics cooperative in Galicia (CLM-MKT-024/025), with Vigo's
  industrial marine cluster as the plausible anchor.

Its weaknesses are stated rather than hidden: the length and age mix of the
moored fleet is unknown (C3 scored 3), the charter fleet is unquantified (C4
scored 3), and installer density is not measured (C6 scored 3).

## 5. Why the two highest-value Spanish markets are deferred

The Balearics (rank 2) and Catalonia (rank 3) score well on attractiveness, and
the Balearics carry the strongest commercial-operator evidence in the set (59% of
2024 registrations were charter-market registrations, CLM-MKT-023). They are still
deferred because:

1. **Distance and logistics** from a Galician base: 1,000+ km, with service
   response measured in days not hours.
2. **Different channel structure**: charter brokers, local installer networks and
   a competitive density that is not evidenced in this session.
3. **Seasonality** already binds installation capacity in the region that wins; a
   second, more seasonal market would compete for the same scarce labour.
4. **No local evidence**: neither region has a retrieved berth count, installer
   mapping or occupancy series in this evidence set.

They are listed as `DEFER`, not `REJECT`: the evidence does not say they are bad
markets, only that they are bad *first* markets.

## 6. Sequencing overlay (analyst judgement, not score)

Applying the frozen score alone would produce the order *Rías Baixas → Balearics
→ Catalonia → A Coruña → Northern Portugal*. That order is not recommendable for
a small Galician team, so a separately labelled overlay changes the sequence:

| Phase | Region | Rationale |
|---|---|---|
| 1 | Rías Baixas | Rank 1 on attractiveness and home base |
| 2 | A Coruña / Costa da Morte | Rank 4, but contiguous, same regional administration (Xunta / Portos de Galicia), same language and VAT regime, second-largest Galician flow (209 in 2025), ~90% summer occupancy (CLM-MKT-019) |
| 2 | Northern Portugal | Rank 5, but the only contiguous non-Spanish market and the largest documented national fleet (about 85,000 craft); gated on a Portuguese-language installation and support partner |
| 3 | Deferred: Balearics, Catalonia | Attractive later expansion, not beachhead |
| — | Monitor: Cantabria, Asturias, Basque Country, A Mariña | No channel evidence and, except Cantabria, no positive momentum |

The overlay criteria are declared in `geo-assessments.json` →
`sequencingOverlay.criteria`: contiguity and shared administration, single-language
operations and VAT regime, travel and parts logistics, and avoiding a different
channel model in phase 1.

**Note on the A Coruña versus Northern Portugal order.** Both are phase 2. A
Coruña is the lower-risk second wave because it needs no new legal, language or
logistics capability. Northern Portugal is the higher-upside second wave because
the national fleet is nine times Galicia's documented berth base, but it requires
capability the programme does not yet have.

## 7. Sensitivity

What would change the ranking:

- **A measured Galician berth length/age distribution** showing most berths hold
  under-6 m or low-electronics craft would lower C3 in Rías Baixas and A Coruña
  and could lift Northern Portugal to rank 2–3 for phase 2.
- **An installer partner in Northern Portugal** would raise C6 from 2 and make it
  the clear second wave.
- **A second year of Pontevedra growth** would confirm C2 rather than one noisy
  year; a reversal would leave Rías Baixas ranked on C1 alone, still likely first
  but with a smaller margin.
- **A Balearic berth and installer dataset** would not move it into phase 1
  because distance and channel remain, but it would sharpen the later expansion
  case.

## 8. Evidence gaps behind this ranking

Consolidated from `geo-assessments.json`:

| Gap | Affects | Needed evidence |
|---|---|---|
| No regional length/age structure | C3 everywhere | Registry cohorts by region |
| No Galician charter-fleet count | C4 in Galicia | Xunta/ANEN rental data |
| No installer or yard register | C6 everywhere | Association/registry member lists |
| No Portuguese regional fleet or registration series | C2, C3, C4 in PT-N | DGRM statistical yearbook |
| No Portuguese berth inventory | C1 in PT-N | APICAN/DGRM inventory |
| Occupancy evidence is single-marina press | C5 | Marina occupancy series |
| No Balearic or Catalan berth/installer data | C1, C6 | Regional port data |

## 9. Recommendation

1. **Concentrate first on Rías Baixas.** One demonstration vessel, one or two
   installer partners, and a measured pilot are worth more than a wider footprint.
2. **Prepare A Coruña as the near-cost second wave** using the same team,
   language, administration and partners.
3. **Treat Northern Portugal as a gated phase-2 market**: open it only with a
   Portuguese-language installation and support capability, and only after the
   Galician pilot produces measured attachment and conversion.
4. **Do not enter the Balearics or Catalonia in this phase.** They are attractive
   but unevidenced locally and structurally harder to serve.
5. **Do not spend first-phase resource on Lugo, Asturias, Cantabria or the Basque
   Country.** Watch them; no channel evidence exists.
6. **Fix the data before fixing the plan:** the shortest path to a better
   geographic decision is a Regional fleet/berth dataset for Galicia and a DGRM
   regional extract for Portugal, both of which are desk obtainable in MC-10.
