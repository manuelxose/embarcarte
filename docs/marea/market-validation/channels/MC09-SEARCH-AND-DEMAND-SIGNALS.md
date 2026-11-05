# MC-09 Workstream E — Search interest and digital demand signals

| Field | Value |
| --- | --- |
| Document ID | MC-09 / Workstream E — MC09-SEARCH-AND-DEMAND-SIGNALS |
| Milestone | MC-09 — market and competitive intelligence |
| Date | 2026-10-31 |
| Owner | agent-e-channels (Channel and Digital Demand Analyst) |
| Status | INTERNAL RESEARCH ONLY · NO PAGES PUBLISHED · NO VOLUMES ASSERTED |
| Branch / base | `feature/marea-mc09-market-competitive-intelligence`, base `65417bfa681d31cc655e2bc91cfcedcccc368675` |
| Evidence layer | `search-signals.json` (TRM-CHN-001…029), `evidence-channels.json` (SRC-CHN-036…038, CLM-CHN-025…036) |

**One sentence governs this document: search interest is not demand, and Google Trends does not measure demand.**
This workstream obtained **no absolute search volumes**, because no accessible source supplied them. Every
quantitative-sounding statement that a reader might expect here — monthly searches, growth percentages, market size —
is deliberately absent. What is present is real, date-stamped **query-language evidence**: the phrasings users
actually type, and the stage of the buying journey those phrasings encode.

## 1. The five things that are routinely conflated

| Concept | What it can mean | What was obtained here |
| --- | --- | --- |
| `SEARCH_INTEREST` | A *relative* index of how often a term is searched compared with another term or period (e.g. Google Trends). Never an absolute count, never a customer count. | **0 values.** 4 records attempted; all `INACCESSIBLE`. |
| `ESTIMATED_VOLUME` | An absolute or modelled monthly/periodic search count from a real, accessible source. | **0 records.** No accessible source supplied volumes; none invented. |
| `COMMERCIAL_INTENT` | A property of *phrasing*: the query encodes comparison, purchase, installation, troubleshooting or price. Inferred here from suggestion language only. | **Qualitative only**, inferred per term; not a metric. |
| `TRAFFIC_OPPORTUNITY` | The traffic a page could win if it ranked. Requires volume × expected position × click-through — none of which was measured. | **Not measured.** Cannot be computed. |
| `ACTUAL_CUSTOMER_DEMAND` | Orders, paid conversions, signed quotations, deposits. | **Zero observations.** Nothing was sold; no enquiries exist. |

Two consequences follow, and they bind every downstream document: (1) no revenue, market-size or traffic forecast may
cite this workstream; (2) the only defensible output is a **ranked set of commercial questions and content directions
to test**, with the test instrument specified in §6.

## 2. Access status, recorded honestly

| Source attempted | Result on 2026-10-31 | Record |
| --- | --- | --- |
| `https://trends.google.com/trends/explore?q=receptor%20AIS&geo=ES` | **HTTP 404** — no relative-interest series | `SRC-CHN-036`, `CLM-CHN-025` |
| `https://trends.google.com/` (root) | **HTTP 200 but a JavaScript shell** — no retrievable series without an interactive session | `SRC-CHN-036` |
| `https://suggestqueries.google.com/complete/search?...` (Google autocomplete) | **HTTP 404** | `SRC-CHN-037` |
| `https://api.bing.com/osjson.aspx` (Bing Autosuggest) | **HTTP 200** — live suggestion lists for `es-ES`, `pt-PT`, `en-GB` | `SRC-CHN-038`, `CLM-CHN-026` |

Recording rule applied: an inaccessible source is recorded `INACCESSIBLE`; its values are **not** estimated,
interpolated or borrowed from a secondary article. A suggestion list is **not** a volume: it proves that a phrasing is
typed by real users in that market and prefix, and nothing more. Suggestion order is not a demand ranking. Bing
suggestions are not Google data and are labelled as such wherever used.

## 3. Query-language evidence by family

Reading guide: the "observed completions" column reproduces the actually returned suggestion strings (short
extracts). A completion may be polluted by an unrelated sense of the word — those pollutions are findings, not noise
to be edited out, because they are the reason a naive keyword strategy would fail.

| # | Term (market) | Observed completions (extract) | Reading | Claim |
| --- | --- | --- | --- | --- |
| 1 | `receptor AIS` (ES) | `localizador de barcos por ais`, `rastreador de buques ais`, `receptor.ai` | The most obvious Spanish term is dominated by **vessel-tracking** intent (websites), not receiver purchase | `CLM-CHN-027` |
| 2 | `monitorizar barco` (ES) | `what is a barco monitor`, `barco monitor drivers`, `monitoreo de barcos en tiempo real`, `posicionamiento de barcos en directo` | Brand collision with a display manufacturer; the natural Spanish phrasing is the **noun** form | `CLM-CHN-028` |
| 3 | `piloto automático velero` (ES) | `piloto automatico barco segunda mano`, `piloto privado de avion`, `piloto automatico para moto` | **Second-hand** anchor plus aviation/motorcycle pollution | `CLM-CHN-031` |
| 4 | `NMEA 2000` (ES) | `nmea 2000 cable`, `starter kit`, `pinout`, `connector`, `backbone`, `pgn`, `gateway` | Technical/integrator space, largely English/German even in the Spanish market | `CLM-CHN-035` |
| 5 | `plotter nautico` (ES) | `que es un plotter marino`, `que es el plotter`, `plotter de corte automático`, `tiendas de cartuchos para plotters` | Awareness-stage plus **printing/cutting-plotter** pollution | `CLM-CHN-033` |
| 6 | `receptor ais` (PT) | `receptor assay`, `receptor airplay`, `receptor ads-b`, `receptor risk assessment` | Portuguese prefix is dominated by laboratory/AirPlay senses — **no marine intent visible** | `CLM-CHN-032` |
| 7 | `monitorização barco` (PT) | `monitorização barragens`, `barco monitor`, `site de monitoramento de navios`, `control de embarques y monitoreo` | Dams + display brand + Spanish leakage; no clean PT phrasing found | `CLM-CHN-032` |
| 8 | `piloto automático barco` (PT) | `piloto automático o que é`, `carteira de piloto de barco`, `licença para pilotar barco`, `piloto automatico barco segunda mano` | PT "piloto" collides with **skipper licensing** intent | `CLM-CHN-032` |
| 9 | `boat monitoring` (EN) | `boat monitoring system`, `remote boat monitoring system`, `best boat monitoring system`, `boat battery monitoring system`, `marine tank monitoring system`, `diy boat monitoring system` | Clearly **system-purchase** oriented; includes a DIY price ceiling and comparison stage | `CLM-CHN-029` |
| 10 | `ais receiver` (EN) | `ais receiver buying guide`, `ais receiver for boats`, `ais receiver usb`, `ais receiver range`, `ais receiver installation guide`, `ais receiver troubleshooting tips`, `ais receiver marine traffic` | The **richest commercial-intent pattern found**: buying-guide, range, installation and troubleshooting stages | `CLM-CHN-030` |
| 11 | `weather routing` (EN) | `weather routing for ships`, `weather routing company`, `weather routing service`, `weather routing sailing`, `weather routing inc …` | Space dominated by **commercial shipping** and one US vendor brand; leisure is a single phrasing | `CLM-CHN-034` |

## 4. Language-by-language findings

### Spanish (ES)
- **Tracking vocabulary hijacks product vocabulary.** "Receptor AIS" is not how Spanish speakers search for a receiver;
  the completions want to *see vessels*, which is a website use case, not an onboard box. Content that assumes
  purchase intent on this term would attract the wrong visitor.
- **Naming risk:** "monitorizar barco" collides with a display manufacturer called Barco. The Spanish phrasing that
  appeared is `monitoreo de barcos en tiempo real`, alongside `posicionamiento de barcos en directo`.
- **Technical space is international.** NMEA 2000 completions are English/German technical terms — so an English
  integration answer may serve Spanish users, while a Spanish translation alone may not rank.
- **Awareness gap on the display category.** `plotter nautico` produces definitional questions; the category word also
  means printing/cutting plotter.

### Portuguese (PT)
- **No usable Portuguese vocabulary was observed.** For all three prefixes tested, completions were dominated by
  unrelated senses (biological receptor, AirPlay, dams, boat licence) or Spanish leakage. The working hypotheses —
  `recetor AIS`, `monitorização de embarcações`, `piloto automático para barcos` — are **hypotheses, not observations**,
  and were therefore not recorded as observed terms.
- **Implication:** a PT strategy cannot be a translation of the ES strategy. It requires its own vocabulary test
  (interview or paid search data) before any PT content is commissioned.

### English (EN, GB market used)
- **The clearest commercial intent in the whole workstream** appears for receivers and monitoring systems: comparison
  (`buying guide`, `best`), installation (`installation guide`, `range`), and operation (`troubleshooting tips`) all
  appear as real completions.
- **System language beats product language** for monitoring: users ask for a *system*, and several completions name the
  measured variable (battery, tank) rather than the product. That maps to SENSE/WATCH scope claims that are not yet
  validated.
- **`diy` and `segunda mano` both appear.** Two price anchors — self-install and used equipment — sit beneath MAREA's
  premium hypotheses. This is a positioning risk, not a demand estimate.

## 5. What these signals do NOT establish

1. **No volume, growth, seasonality or geography split.** Zero `ESTIMATED_VOLUME` and zero `SEARCH_INTEREST` values exist.
2. **No traffic opportunity.** Without volume and expected ranking, opportunity cannot be computed.
3. **No purchase behaviour.** A typed query is not a buyer; "buying guide" completions often indicate research that ends
   in a different brand.
4. **No customer demand.** Demand in this programme means orders, paid conversions, quotations accepted or deposits —
   all zero.
5. **No market size.** Nothing here supports a market-sizing, revenue or forecast statement. Search interest is a
   relative index at best; a relative index is not a market.
6. **No causal claim.** Content does not create boat owners; it can only serve intent that already exists.

## 6. Ranked commercial questions and content directions (nothing published)

Ranking logic, stated explicitly: **stage proximity to a purchase decision** (comparison/installation > definition >
awareness), then **language evidence strength** (observed completions > translated assumption), then **strategic fit
with families whose claims are least blocked**. No rank claims volume.

| Rank | Commercial question to answer honestly | Families | Language | Evidence | Instrument |
| ---: | --- | --- | --- | --- | --- |
| 1 | What does an AIS receiver include, what does it not, and what does installation require? | AIS | EN (ES after vocabulary test) | `CLM-CHN-030` (buying-guide/installation/range completions) | Draft comparison + installation-requirements page, unpublished; measure enquiry-form completions with UTM |
| 2 | Which boat-monitoring system fits my vessel, and what does "remote" actually require? | WATCH, SENSE, HUB | EN; ES noun form | `CLM-CHN-029`, `CLM-CHN-028` | Unpublished explainer + compatibility questionnaire; instrument abandonment point |
| 3 | What is an NMEA 2000 gateway, and which devices will it actually support? | HUB, SENSE, AIS, DISPLAY | ES/EN | `CLM-CHN-035` (`nmea 2000 gateway`, `backbone`, `pgn`) | Internal compatibility matrix draft; count support questions by category |
| 4 | AIS: is this a receiver or am I looking for a vessel-tracking website? | AIS, NAV | ES | `CLM-CHN-027` | Disambiguation block on the AIS route; measure bounce vs enquiry |
| 5 | "Monitorización de barco": what does real-time monitoring require in Spain? | WATCH, FLEET | ES | `CLM-CHN-028` | ES terminology test (two phrasings, unpublished variants) |
| 6 | What is a marine plotter, and how does it differ from a tablet running navigation software? | DISPLAY, NAV | ES | `CLM-CHN-033` | Definitional explainer; count which follow-up question dominates |
| 7 | Autopilot: what is the real difference between new and second-hand, and what installation does it require? | PILOT | ES | `CLM-CHN-031` | Unpublished explainer that never quotes a price or promises suitability; measures safety-question volume |
| 8 | Weather routing for a sailing yacht versus for commercial shipping | WEATHER, NAV | EN | `CLM-CHN-034` | Editorial brief; measure which audience the page attracts |
| 9 | Battery and tank monitoring: what can be measured on an older boat? | SENSE, WATCH | EN | `CLM-CHN-029` | Compatibility questionnaire; count "can I measure X" enquiries |
| 10 | Portuguese terminology: which term do Portuguese boaters actually use? | All | PT | `CLM-CHN-032` (negative evidence) | Vocabulary test first; no PT content commissioned before it |

**Constraint:** none of these may be published, indexed or used to imply availability, price or certification. They are
briefs for the MC-10 decision, not pages. Content must not state a price, a stock status, a partnership or a
certification.

## 7. Measurement plan for MC-10 (how to turn interest into evidence)

| Measurement | Instrument | What it yields | Limitation |
| --- | --- | --- | --- |
| Search interest per term | Google Trends, live session (if access can be established) or an approved alternative | Relative index between terms | Still not demand; must never become a revenue input |
| Absolute volume | A real accessible keyword source, cited | `ESTIMATED_VOLUME` records | Paywalled tools are out of scope without authorisation |
| Query-to-enquiry conversion | Server-side event on existing routes, UTM-tagged, privacy-reviewed | Which question produces a qualified enquiry | Small early sample; no significance until traffic exists |
| Enquiry qualification | CRM/free-text tagging of vessel type, family, blocker | Segment-level demand signal | Self-selected sample |
| Content experiments | Unpublished variants, one variable at a time | Wording that prevents price/compatibility misreads | Must not state price or availability |
| Portuguese vocabulary | Interview + term test with PT boaters | A tested PT vocabulary | Not a volume measurement |

The decisive metric for MC-10 is **qualified enquiries per 1,000 sessions by family**, not rank, not traffic and not a
Trends index.

## 8. Gaps and next inputs

1. **Google Trends access** — blocked in this harness; needs a supported access path or an approved alternative source.
2. **Any absolute volume source** — none used; a paid or licensable source requires authorisation and budget.
3. **Portuguese vocabulary** — unresolved; the only honest conclusion is negative evidence.
4. **Spanish installer vocabulary** — no observed term for "installation price/quote" was found; the installer route's
   demand language is unknown.
5. **Balearic/Galician regional variation** — not measured; both ES and PT markets may fragment.
6. **Seasonality** — unmeasured; boating demand is seasonal and no time series was obtainable.
7. **No page, no campaign, no outreach was performed** — all findings are desk evidence, and any claim of "tested
   demand" would be false.

## 9. Traceability

- Structured evidence: `search-signals.json` — **29 terms**: 4 `SEARCH_INTEREST` (all `INACCESSIBLE`), **0
  `ESTIMATED_VOLUME`**, 25 `CONTENT_OPPORTUNITY` derived from observed suggestion strings. Sources `SRC-CHN-036`
  …`-038`; claims `CLM-CHN-025`…`-036`.
- Channel context: `MC09-DISTRIBUTION-STRATEGY.md`; `channel-assessments.json`.
- Governance: `docs/marea/market-validation/data/README.md` (metric vocabulary, "no invented volumes"),
  `docs/marea/COMMERCIAL-PORTFOLIO.md` (price and truthfulness rules), `AGENTS.md` (veracidad comercial).

## 10. Status statement

**Status: `PARTIAL` — desk research complete and fully documented; quantitative demand measurement BLOCKED by
inaccessible search-interest and volume sources.** 29 terms recorded across ES/PT/EN; 0 volumes asserted; 0 pages
published; 0 customer-demand observations; Google Trends and Google autocomplete `INACCESSIBLE`. The ranked list in §6
is the deliverable for MC-10 content and enquiry-instrumentation decisions, and it must not be presented as proof of
demand.
