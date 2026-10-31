# MC-09 / D3 — Marine market assessment

| Field | Value |
|---|---|
| Document ID | MC-09 / D3 / MC09-MARINE-MARKET-ASSESSMENT |
| Workstream | A — Marine market analyst (`agent-a-market`) |
| Milestone | MC-09 |
| Date | 2026-10-31 |
| Status | `INTERNAL_DESK_RESEARCH` — not for publication |
| Research window | Single desk-research session, 2026-10-31. No fieldwork, no outreach, no purchases |
| Authority | `docs/marea/market-validation/MC09-RESEARCH-SCOPE.md`; `data/README.md` research contract |
| Machine-readable layer | `data/evidence-market.json`, `data/market-inputs.json` |

This document answers one question: **what does the recreational and
small-professional marine market relevant to EMBARCARTE/MAREA actually look like
in Galicia, Northern Portugal, Spain, Portugal and the EU comparators, and what
can be said about it without inventing anything?**

Every number below is traceable to a source in §11 or to an explicitly labelled
derivation in `data/market-inputs.json`. Where a fact could not be established,
it is listed as `UNKNOWN` in §10 with the evidence that is missing. Registration
counts are **flows** (new craft registered in a year); they are never presented
as the size of the fleet.

## 1. The populations that matter

### 1.1 Spain: a contracting new-registration flow

| Year | New recreational registrations in Spain (incl. personal watercraft) | Change |
|---|---:|---:|
| 2023 | 5,976 | — |
| 2024 | 5,027 | −15.9% |
| 2025 | 4,992 | −0.9% |

The 2023→2025 sequence (CLM-MKT-001/002/003) describes a market that fell
sharply in 2024 and stabilised in 2025. It is new registrations, not fleet size:
a boat can be re-registered, imported, exported or scrapped without appearing in
this series, and craft below the registration threshold are absent.

The 2024 figure is itself unstable: the contemporaneous ANEN balance reported
5,027 (SRC-MKT-002) while the 2024 column of the ANEN 2025 report prints 5,038
(1,000-unit scale aside, an 11-unit difference). This is consistent with a data
revision; it is recorded, not averaged.

### 1.2 Portugal: a large registered fleet with a soft reference value

The DGRM stated in June 2024 that Portugal has **about 85,000 registered
recreational craft** and more than 90,000 valid navigator licences
(CLM-MKT-015). A Portuguese public-consultation document attributes to APICAN a
figure of **73,765** registered recreational craft for May 2024 (CLM-MKT-016). The
two differ by 13% and neither definition is published. They are kept side by side
as an unreconciled contradiction; no third estimate is invented.

Both are registry counts, not active-vessel counts, and no regional breakdown for
northern Portugal exists in the evidence set (`UNAV-MKT-002`).

### 1.3 Galicia: the focus area

| Indicator | Value | Claim |
|---|---:|---|
| Nautical-sports ports in Galicia | 73 | CLM-MKT-011 |
| Recreational berths in Galicia | 10,500 | CLM-MKT-011 |
| Berths on the Pontevedra coast (Rías Baixas), "more than" | 4,600 | CLM-MKT-013 |
| Vessels in transit in Galicia, 2024 | 6,321 | CLM-MKT-012 |
| New registrations in the three coastal provinces, 2025 | 465 (9.3% of Spain) | CLM-MKT-029 |

Provincial registration flows in 2025: A Coruña 209 (−9.5%), Pontevedra 229
(+41.4%), Lugo 27 (+22.7%), Ourense 1 (CLM-MKT-009). Galicia in total registers
more new craft than the entire Cantabrian comparator coast — Asturias 129,
Cantabria 138, Guipúzcoa 34, Vizcaya 53 = 354 (CLM-MKT-030).

A conflicting Galician total exists for 2024: regional press reported 280
registrations (A Coruña 139, Pontevedra 128, Lugo 10, Ourense 3), while the 2024
column of the ANEN 2025 provincial table sums to 417 for the same provinces
(CLM-MKT-014). The most likely cause is different inclusion of personal
watercraft and/or rental registrations; the sources do not say, so the
discrepancy is recorded and the more recent, internally consistent 2025 table is
the one used for arithmetic.

### 1.4 National context

Spain: 289 recreational ports, about 133,400 berths, 67% of them Mediterranean,
462 berths per port on average (CLM-MKT-010). Galicia therefore holds roughly 8%
of Spanish berth capacity but is one of the least Mediterranean parts of the
Spanish coast.

Europe: an OSPAR document restating ICOMIA (2017) statistics reports approximately
6–6.5 million recreational vessels in European waters (CLM-MKT-022). This is
nine-year-old second-hand citation and is used only as an order-of-magnitude
backdrop, never as a model input.

## 2. Size and age structure

### 2.1 The market is overwhelmingly small craft

2025 Spanish registrations by length (CLM-MKT-004):

| Band | Units | Share |
|---|---:|---:|
| up to 6 m | 3,492 | 70.0% |
| 6–8 m | 898 | 18.0% |
| 8–12 m | 407 | 8.2% |
| 12–16 m | 144 | 2.9% |
| over 16 m | 51 | 1.0% |
| **total** | **4,992** | **100%** |

Exactly **1,500** of the 4,992 were 6 m or longer (CLM-MKT-027). The bands sum to
the published total, which is why 4,992 is preferred over the 4,991 in the same
article's provincial table.

By type, the named categories are motor boats 2,066 (41.4%), personal watercraft
1,394 (27.9%) and folding inflatables 664 (13.3%, +47.2%). The three do not cover
the whole market and must not be summed to 100% (CLM-MKT-005).

**Why this matters for MAREA.** A 6–16 m vessel is the plausible host for a HUB,
AIS receiver, DISPLAY, monitoring kit or pilot. Everything below 6 m is largely
trailer-launched, dry-stored or a personal watercraft, and is a poor fit for
fixed helm electronics. The addressable creation rate in Spain is therefore about
**1,500 vessels a year**, not 5,000 — and Galicia's share of that is a fraction
of 465 × (1,500/4,992) ≈ 140 vessels per year at best (derived, not a claim).

### 2.2 Fleet age is UNKNOWN

No retrieved source publishes an age distribution for the Spanish or Portuguese
recreational fleet (`UNAV-MKT-004`). The refit thesis — that an ageing Galician
fleet should be replacing electronics — is commercially plausible but **not
quantified anywhere in this evidence set**. Treat it as a hypothesis to test in
MC-10, not as a finding.

## 3. New build versus refit

The evidence supports three statements and no more:

1. **New build is a small flow.** 1,500 Spanish vessels a year at 6 m or more, of
   which only 195 are 12 m or more (CLM-MKT-004/027). A supplier that only sells
   into new builds has a very small addressable pool in Spain.
2. **Refit is structurally larger but unmeasured.** The existing fleet is far
   bigger than annual registrations, but no stock count exists for Spain
   (`UNAV-MKT-001`) and none for Galicia (`UNAV-MKT-003`). Every estimate of
   refit volume in this evidence set is therefore a modelled proxy.
3. **The chandlery/repair channel exists.** At least one Galician company
   operates a repair and maintenance workshop with a physical and online
   chandlery (CLM-MKT-025), and at least one Galician cooperative advertises
   on-board electronics installation and repair (CLM-MKT-024). This is
   existence evidence, not density evidence (`UNAV-MKT-006`).

## 4. Ownership structure and segments

Observable structure, with limits stated:

- **Private ownership dominates.** In 2025, 1,418 of 4,992 Spanish registrations
  (28.4%) were rental/charter registrations (CLM-MKT-006/028). Roughly seven in
  ten new craft are bought outside the rental market.
- **Rental is a normalising, not a growing, segment.** Rental registrations fell
  19.3% in 2025 after several years of strong growth (CLM-MKT-006); in 2024 the
  rental mix was 42% personal watercraft and 35% motor boats (CLM-MKT-007), which
  means a large part of the charter fleet is not the kind of vessel that buys
  navigation electronics.
- **Charter concentration is highly regional.** In the Balearics, 59% of 2024
  registrations were charter-market registrations (CLM-MKT-023). There is no
  equivalent Galician figure: the regional press report explicitly notes that no
  disaggregated rental data exist for Galicia (CLM-MKT-014), and this is recorded
  as `UNAV-MKT-007`.

Segment definitions (buyer archetypes) are the responsibility of Workstream C.
What Workstream A can supply is the size of the pools those archetypes sit in:
private owners of 6–16 m craft (majority), rental/charter operators (28.4% of
registrations nationally, unquantified in Galicia) and small-professional
operators such as sailing schools and marina-based services (no retrieved count).

## 5. Segment economics

What is observable:

| Economic indicator | Value | Claim |
|---|---|---|
| Average berths per Spanish recreational port | 462 | CLM-MKT-010 |
| Mediterranean share of Spanish berths | 67% | CLM-MKT-010 |
| Rental share of Spanish 2025 registrations | 28.4% | CLM-MKT-028 |
| Marine electronics market, global (vendor estimate) | USD 7,023.1M in 2025; 7,430.5M forecast for 2026 | CLM-MKT-021 |

What is **not** observable, and is therefore not asserted: Spanish or Portuguese
marine-electronics market value; equipment/accessories turnover; average
equipment spend per vessel; dealer or installer margins; berth pricing; vessel
price levels. The global vendor figure cannot be transferred to Galicia because
the retrieved excerpt does not publish the recreational share, the country split
or the methodology (CLM-MKT-021 limitation).

The one defensible economic conclusion is structural: with about 133,400 Spanish
berths and 10,500 in Galicia, and an addressable spend per vessel that is
unknown, the *local* annual electronics pool is small in absolute terms. §4 of
`MC09-MARKET-SIZING.md` puts an order-of-magnitude band on it and explains why
the band is wide.

## 6. Marine-electronics spend indicators

No official Spanish or Portuguese series for marine-electronics spend was found
(`UNAV-MKT-005`). The indicators that do exist are indirect:

1. **Registration flow as an equipment-attachment proxy.** New owners are the
   most likely buyers of navigation and connectivity equipment; 1,500 Spanish
   vessels a year at 6 m or more bound that proxy (CLM-MKT-027).
2. **Global category size.** A commercial vendor estimates the global marine
   electronics market at USD 7,023.1M in 2025 (CLM-MKT-021) — useful for context,
   useless for local sizing.
3. **Channel existence.** A Galician repair/chandlery business and a Galician
   naval-electronics cooperative demonstrate that an installation and
   after-sales channel exists (CLM-MKT-024/025). It does not measure its capacity.

**UNKNOWN:** spend per vessel, replacement cycle, and the share of owners who buy
electronics in any year. The sizing model therefore uses labelled `ASSUMED`
scenario bands, not a measured average.

## 7. Seasonality

Documented seasonality evidence is thin but consistent:

- A Coruña sports ports ran at about **90% berth occupancy in summer 2024** with
  waiting lists for crane and dry use (CLM-MKT-019).
- Sanxenxo's Puerto Juan Carlos I reported **August fully booked with a waiting
  list and July at about 50%**, with rental-berth demand up 40% (CLM-MKT-020).
- Galicia recorded **6,321 vessels in transit in 2024** (CLM-MKT-012), undefined
  but clearly a seasonal-visitor indicator.

Interpretation, labelled as interpretation: the Atlantic north-west has a real
but concentrated season. Installation and commissioning capacity is squeezed into
roughly May–September, while sales conversations and refit planning can run in the
winter. This is a scheduling constraint on any installer-led model, not evidence
of year-round demand.

## 8. Trends

Only trends with at least one citable observation are listed; the rest are
`HYPOTHESIS`.

| Trend | Evidence | Status |
|---|---|---|
| Market contraction then stabilisation (Spain) | 5,976 → 5,027 → 4,992 (CLM-MKT-001/002/003) | OBSERVED |
| Small-craft and folding-inflatable growth | Folding RIBs +47.2% in 2025 (CLM-MKT-005) | OBSERVED |
| Large-vessel segment shrinking and tiny | 51 units over 16 m in 2025 (CLM-MKT-004) | OBSERVED |
| Charter normalisation after expansion | Rental registrations −19.3% in 2025 (CLM-MKT-006) | OBSERVED |
| Regional shift towards Murcia/Alicante/Pontevedra | Murcia +85.3%, Alicante +19.3%, Pontevedra +41.4% (CLM-MKT-009) | OBSERVED |
| Connectivity, monitoring and SaaS adoption rising | No direct measurement retrieved | `HYPOTHESIS` |
| Electrification of small craft | No direct measurement retrieved | `HYPOTHESIS` |
| Owners trading down from installed plotters to tablets/phones | No direct measurement retrieved; the programme's price benchmark work records established software alternatives | `HYPOTHESIS` |

The honest position: the demand-side structural claims MAREA wants to make
(connectivity growth, electrification, subscription acceptance) are **not
evidenced by this workstream**. They must be tested, not asserted.

## 9. Findings

1. **The Spanish market is small, contracting and dominated by craft under 6 m.**
   4,992 new registrations in 2025, 70% under 6 m, only 1,500 craft at 6 m or
   more (CLM-MKT-001/004/027). Any MAREA volume plan that assumes a large Spanish
   hardware market is unsupported.
2. **Galicia is a real but modest beachhead.** 73 ports, 10,500 berths, 465 new
   coastal registrations in 2025 — more than the whole Cantabrian comparator
   coast (CLM-MKT-011/029/030) — but only ~9% of Spain and 8% of Spanish berths.
3. **Rías Baixas is the only part of the focus area with both density and
   momentum.** 4,600+ berths and Pontevedra +41.4% while A Coruña fell 9.5%
   (CLM-MKT-013/009).
4. **Portugal offers the largest documented fleet in the research area (about
   85,000 craft) with the weakest regional evidence.** No regional split, two
   contradictory national counts, and only 1,088 documented berths in the north
   (CLM-MKT-015/016/017).
5. **Refit is the only large-enough pool, and it cannot be sized from public
   sources.** No fleet stock and no age distribution exist in this evidence set
   (UNAV-MKT-001/004). The commercial model must therefore be validated on
   attachment and pricing, not on a claimed fleet size.
6. **The season is concentrated.** Peak occupancy approaching or reaching 100% in
   August with much lower July utilisation (CLM-MKT-019/020) makes installation
   capacity the binding constraint, not demand.
7. **Spend per vessel is unknown.** Every value in the sizing model that depends
   on it is a labelled scenario band, and the resulting ranges are wide for a
   reason (`MC09-MARKET-SIZING.md` §4).

## 10. Unknowns and unavailable facts

Recorded in `data/evidence-market.json` → `unavailableFacts` and in
`data/market-inputs.json` → `unknownInputs`.

| ID | Missing fact | Consequence |
|---|---|---|
| UNAV-MKT-001 | Spain's registered recreational fleet (stock) | Spanish base is proxied by berth capacity |
| UNAV-MKT-002 | Portuguese fleet by region | Northern Portugal cannot be sized from fleet data |
| UNAV-MKT-003 | Craft registered or moored in Galicia / Northern Portugal | Galicia base is proxied by berths |
| UNAV-MKT-004 | Fleet age distribution | Refit volume stays a hypothesis |
| UNAV-MKT-005 | Electronics spend per vessel | Whole SAM/TAM is an ASSUMED band |
| UNAV-MKT-006 | Installer/yard capacity by region | SOM is capacity-bounded by a planning assumption only |
| UNAV-MKT-007 | Galician charter/rental fleet | FLEET demand in Galicia is unquantified |
| UNAV-MKT-008 | Total Portuguese berth capacity | Portuguese base is a documented floor |

No source was `INACCESSIBLE`: every URL cited in §11 returned content to the
search or fetch tool on 2026-10-31, although in nine cases only the search-engine
excerpt of the page was read, and each of those sources states that limitation.
Two sources are recorded as `CONTRADICTED` (SRC-MKT-008, SRC-MKT-015) and two as
`STALE` (SRC-MKT-011 dated 2019, SRC-MKT-017 restating 2017 data).

## 11. Source register (retrieved 2026-10-31)

| ID | Publisher | Title | URL | Class | Status |
|---|---|---|---|---|---|
| SRC-MKT-001 | InfoPuertos (ANEN report) | El mercado náutico cierra 2025 con estabilidad… | https://infopuertos.com/el-mercado-nautico-cierra-2025-con-estabilidad-y-un-ultimo-trimestre-favorable/ | SECONDARY_INDEPENDENT | OK |
| SRC-MKT-002 | Europa Press (ANEN) | El mercado náutico español registra 5.027… | https://www.europapress.es/turismo/transportes/noticia-mercado-nautico-espanol-registra-5027-embarcaciones-recreo-2024-159-menos-20250107175518.html | SECONDARY_INDEPENDENT | OK |
| SRC-MKT-003 | Náutica Digital | El mercado náutico español cierra 2023 con 5.976… | https://www.nauticadigital.com/marina/el-mercado-nautico-espanol-cierra-2023-con-5-976-matriculaciones/ | SECONDARY_INDEPENDENT | OK |
| SRC-MKT-004 | DGRM (Portugal) | DGRM reúne com entidades da Náutica de Recreio | https://dgrm.pt/destaques?articleId=764494 | PRIMARY_OFFICIAL | OK |
| SRC-MKT-005 | Europa Press (Turismo de Galicia) | Galicia fomenta el turismo náutico… | https://www.europapress.es/galicia/turismo-00624/noticia-galicia-fomenta-turismo-nautico-simposio-clubs-nauticos-octubre-sanxenxo-20250714190122.html | SECONDARY_INDEPENDENT | OK |
| SRC-MKT-006 | Turismo Rías Baixas | O paraíso da náutica deportiva | https://www.turismoriasbaixas.com/gl/experiencias/experiencias-de-aventura/o-paraiso-da-nautica-deportiva | PRIMARY_OFFICIAL | OK |
| SRC-MKT-007 | Forbes España (DBK) | El sector de amarres en puertos deportivos… | https://forbes.es/turismo/694356/el-sector-de-amarres-en-puertos-deportivos-crece-tras-la-pandemia-y-mantiene-una-evolucion-positiva-en-2024-segun-dbk/ | SECONDARY_INDEPENDENT | OK |
| SRC-MKT-008 | La Voz de Galicia | Os galegos compran menos embarcacións recreativas | https://galego.lavozdegalicia.es/noticia/somosmar/2025/01/07/gallegos-compran-embarcaciones-recreativas/00031736274637558438205.htm | SECONDARY_INDEPENDENT | CONTRADICTED |
| SRC-MKT-009 | La Opinión A Coruña | Os portos deportivos da Coruña, a lume de biqueira… | https://galego.laopinioncoruna.es/coruna/2024/08/25/puertos-deportivos-tope-107332684.html | SECONDARY_INDEPENDENT | OK |
| SRC-MKT-010 | Diario de Pontevedra | La demanda de plazas de alquiler crece un 40%… | https://www.diariodepontevedra.es/articulo/sanxenxo/puerto-juan-carlos-i-crece-40/202406091007431355803.html | SECONDARY_INDEPENDENT | OK |
| SRC-MKT-011 | DGRM (Portugal) | Lista dos portos de abrigo para a náutica de recreio | https://www.dgrm.pt/documents/20143/58652/Lista+dos+portos+de+abrigo+para+a+n%C3%A1utica+de+recreio_11_10_2019.pdf/b0498cef-e443-e832-c4ef-ac9f31afd69a | PRIMARY_OFFICIAL | STALE |
| SRC-MKT-012 | VisitPortugal | Viana Marina — port of call page | https://www.visitportugal.com/de/print/poi/132981 | PRIMARY_OFFICIAL | OK |
| SRC-MKT-013 | VisitPortugal | Marina da Póvoa — port of call page | https://www.visitportugal.com/en/print/poi/132969 | PRIMARY_OFFICIAL | OK |
| SRC-MKT-014 | VisitPortugal | Marinas e Portos listing | https://visitportugal.com/pt-pt/encontre-tipo?context=285&order=1&f%5B0%5D=bm_field_ma_tem_far_is_de_orient%3Atrue | PRIMARY_OFFICIAL | OK |
| SRC-MKT-015 | SILIAMB / APA (citing APICAN) | Public consultation on recreational boating | https://siliamb.apambiente.pt/consultapublica/?file=true&code=8624c5ada1f0bc0cf884e2ee8f3055c8 | SECONDARY_INDEPENDENT | CONTRADICTED |
| SRC-MKT-016 | Grand View Research | Marine Electronics Market Size & Share Report | https://www.grandviewresearch.com/industry-analysis/marine-electronics-market-report | SECONDARY_INDEPENDENT | OK |
| SRC-MKT-017 | OSPAR Commission (citing ICOMIA 2017) | OSPAR recreational boating document | https://www.ospar.org/documents?v=57741 | SECONDARY_INDEPENDENT | STALE |
| SRC-MKT-018 | Gaceta Náutica | ANEN news index | https://www.gacetanautica.es/tag/anen/ | SECONDARY_INDEPENDENT | OK |
| SRC-MKT-019 | Espazo Coop | Navega, s. coop. galega — naval electronics services | https://directorio.espazo.coop/es/cooperativas/navega-s-coop-galega/ | PRIMARY_RETAILER | OK |
| SRC-MKT-020 | Marinas Betanzos | Cadenote Yacht, S.L. | https://turismo.marinasbetanzos.gal/empresas/cadenote/ | PRIMARY_RETAILER | OK |

## 12. What Workstream A cannot answer

- Whether boat owners in Rías Baixas will pay for MAREA: `NOT_MEASURED` — an MC-10
  task.
- Whether the installed base is old enough to need replacement electronics:
  `UNKNOWN` — no age data.
- Whether an installer network would distribute MAREA: `UNKNOWN` — two provider
  pages are existence evidence, not channel evidence.
- The size of the Spanish marine-electronics market: `UNKNOWN` — the only
  retrieved category figure is global and vendored.

Anything else in the MC-09 documents that depends on these facts is a hypothesis
and must be labelled as one.
