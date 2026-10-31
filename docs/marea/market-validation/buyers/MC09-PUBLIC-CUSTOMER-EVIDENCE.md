# MC-09 — Public customer evidence

Status: `INTERNAL_RESEARCH_DATA_ONLY`. Milestone MC-09, workstream C (buyers).
Date: 2026-10-31. Owner: `agent-c-buyers`.
Companion data: `data/public-signals.json` (23 signals),
`data/evidence-buyers.json` (20 sources, 18 claims),
`data/buyer-segments.json` (8 segment archetypes).

## 1. Method, sources and access limits

This document classifies **publicly observable customer problems** relevant to
the MAREA product system. It is desk research: no interviews, no outreach, no
survey, no testimonials, no willingness-to-pay measurement and no private
personal data.

Access rules observed:

- Only publicly reachable pages were used; no login wall was bypassed, no
  protected content was scraped and no account was created.
- Three forum pages and two association PDFs could not be fetched directly
  (HTTP 404, JavaScript-only shell, timeout). They were reviewed only through
  search-result extracts and are marked accordingly in
  `data/evidence-buyers.json` under `limitations`. Their claim confidence is
  LOW or MEDIUM and they are not counted twice.
- The retrieval date recorded for every source is **2026-10-31**, the date the
  page was actually accessed in this research pass.
- Search-result snippets are treated as the publisher's own words, not as a
  full-text review. This is stated per source.

## 2. Evidence-type vocabulary used

| Type | Meaning in this workstream |
|---|---|
| `ANECDOTE` | One identifiable account, one thread or one complaint. Illustrates an objection or a failure mode; proves nothing about frequency. |
| `REPEATED_OBSERVATION` | The same problem is described by different authors on different, independent publications. Still self-selected; still not prevalence. |
| `SURVEY` | A defined-sample study with a published method. **No accessible independent buyer survey was found in this pass — there are zero SURVEY signals.** |
| `SUPPORT_DOC` | Official, institutional or vendor documentation that establishes how a system, programme or product works: safety investigation, certification body, installer guide, software product documentation. |
| `PURCHASE_DEMAND` | Public evidence that a paid market exists: retail listing with prices, or users describing sustained paid use. Does not establish size, conversion or churn. |

## 3. Ranked problem classification

Ranking is by **strength of qualitative evidence and consequence**, not by
market size.

| Rank | Problem | Strongest signal type | Sources | Strength | What would establish prevalence |
|---:|---|---|---|---|---|
| 1 | Navigation / electronics fragmentation on older boats; integration uncertainty drives brand lock-in advice | REPEATED_OBSERVATION | SRC-BUY-001/003/004 | STRONG qualitative: three independent forums | Defined-sample owner study; installer job logs; compatibility-matrix usage data |
| 2 | Installation complexity and installer dependence; installation is a large share of total cost | SUPPORT_DOC | SRC-BUY-007, SRC-BUY-006 | STRONG for cost structure, WEAK for prevalence | Itemised installer quotes from a defined vessel sample |
| 3 | Interoperability uncertainty and certification claims | SUPPORT_DOC | SRC-BUY-017, SRC-BUY-006 | MODERATE: official programme description, dated 2009 | Current certification data; recorded device-pair test results |
| 4 | Chart/weather subscription price and coverage objections | REPEATED_OBSERVATION (partial independence) | SRC-BUY-009, SRC-BUY-010 | MODERATE: self-selected reviews plus a motivated vendor | Independent price audit across providers/regions; stated-preference study |
| 5 | AIS hardware cost and receive-only versus transmitting value debate | PURCHASE_DEMAND + ANECDOTE | SRC-BUY-005, SRC-BUY-001 | MODERATE for price band, WEAK for demand | Sales data; a defined owner sample on AIS purchasing |
| 6 | Remote monitoring value, limited satisfaction with basic OEM monitoring, DIY substitutes | ANECDOTE | SRC-BUY-015, SRC-BUY-016 | WEAK: same owner ecosystem (Hanse/Cruisers Forum) | Owner survey on monitoring ownership and spend; alert-reliability test data |
| 7 | Autopilot feedback failure and unusable backup steering | SUPPORT_DOC | SRC-BUY-011 | HIGH for the failure mode, WEAK for recreational relevance | Recreational accident databases; controlled steering-failure tests |
| 8 | Warranty and after-sales trust friction | ANECDOTE | SRC-BUY-018 | WEAK: single unadjudicated complaint | Warranty-case statistics from distributors/retailers |
| 9 | Multi-vessel administration (schools, marinas, fleets) | SUPPORT_DOC | SRC-BUY-013/014/020 | WEAK: vendor pages only, supply-side | Operator interviews; procurement and contract evidence |
| 10 | Legacy analogue sensor sharing constraint | ANECDOTE | SRC-BUY-002 | WEAK: single extract | Device documentation review; bench tests |
| 11 | Touchscreen versus physical controls at the helm | ANECDOTE | SRC-BUY-001 | VERY WEAK: contradictory opinions in one thread | Usability testing with defined tasks |
| 12 | Ownership and maintenance cost pressure | Indirect only | SRC-BUY-007, SRC-BUY-012 | VERY WEAK | Owner cost study; yard invoice sample |

## 4. Independence assessment

Independence matters more than the number of links. The assessment below is the
one recorded per signal in `data/public-signals.json`.

| Signal topic | Independence | Notes |
|---|---|---|
| Fragmentation (SIG-BUY-001) | INDEPENDENT | Three forums, different publishers, different authors, no syndication detected. |
| Mixed-brand control limits (SIG-BUY-002) | PARTIALLY_INDEPENDENT | Two forums but both extracts are the same class of claim; not verified against vendor docs. |
| Analogue sensor constraint (SIG-BUY-003) | SINGLE_SOURCE | One thread; technical claim unverified. |
| AIS retail price band (SIG-BUY-004) | SINGLE_SOURCE | One retailer listing; retail offer is not sales evidence. |
| AIS value debate (SIG-BUY-005) | SINGLE_SOURCE | One thread with disagreeing contributors. |
| Chart/weather price objection (SIG-BUY-006) | PARTIALLY_INDEPENDENT | Multiple reviewers on one curated platform plus one vendor with a competing product. |
| Subscription fatigue (SIG-BUY-007) | PARTIALLY_INDEPENDENT | Vendor essay has a direct commercial interest in the conclusion. |
| Installation cost (SIG-BUY-008) | SINGLE_SOURCE | One installer's regional marketing guide. |
| Installer certification (SIG-BUY-009) | PARTIALLY_INDEPENDENT | Certification body plus certified installer; both benefit from emphasising certification. |
| Interoperability claims (SIG-BUY-010) | SINGLE_SOURCE | The certification body itself; voluntary programme. |
| Open-source integration (SIG-BUY-011) | SINGLE_SOURCE | The project's own site. |
| Monitoring and DIY (SIG-BUY-012) | PARTIALLY_INDEPENDENT | Two threads but one owner ecosystem; possible overlap. |
| Basic OEM monitoring (SIG-BUY-013) | SINGLE_SOURCE | One post, one product. |
| Warranty friction (SIG-BUY-014) | SINGLE_SOURCE | Unadjudicated complaint. |
| Autopilot failure (SIG-BUY-015) | SINGLE_SOURCE | Official investigation of one commercial occurrence. |
| School operations (SIG-BUY-016) | SINGLE_SOURCE | Vendor marketing page. |
| Marina maintenance (SIG-BUY-017) | SINGLE_SOURCE | Vendor marketing page. |
| Multi-vessel software (SIG-BUY-018) | PARTIALLY_INDEPENDENT | Three supply-side sources; no buyer evidence. |
| Spanish market (SIG-BUY-019) | SINGLE_SOURCE | One trade-press summary of ANEN/DGMM data. |
| EU fleet/marina scale (SIG-BUY-020) | SINGLE_SOURCE | Industry association. |
| Touchscreen usability (SIG-BUY-021) | SINGLE_SOURCE | One thread, contradictory opinions. |
| Paid chart subscriptions (SIG-BUY-022) | PARTIALLY_INDEPENDENT | Several reviewers on one curated platform. |
| Self-install budget (SIG-BUY-023) | SINGLE_SOURCE | Stated plan, not a purchase. |

**Duplication control.** A print-view forum page duplicates its live thread and
is counted once (SRC-BUY-016 vs the live thread it mirrors). No syndicated or
re-posted article was found among the cited set; if one had been found, it would
have been merged into a single observation.

## 5. Prevalence caveats (must travel with every citation)

1. **No survey exists in this dataset.** The only quantitative figures are
   Spanish registration counts (ANEN/DGMM via trade press) and EU aggregate
   association figures; neither measures buyer problems, demand for MAREA or
   willingness to pay.
2. **Forum complaints do not establish prevalence.** A repeated complaint across
   independent forums shows the problem is *articulated*, not how common it is.
   Owners who never experience the problem do not post about it.
3. **App-store reviews are self-selected and platform-curated.** They are useful
   for objection language and for showing a paid market exists, not for
   proportions or satisfaction levels.
4. **Retail listings prove an offer, not demand.** Prices and stock on a
   chandlery page say nothing about unit sales, margin or buyer preference.
5. **Vendor pages describe features sold, not measured pain.** Marina, school
   and yacht-management product pages are supply-side evidence.
6. **A commercial safety investigation is not recreational evidence.** The ATSB
   case establishes a failure mode in a large commercial ship; it cannot be used
   to claim anything about recreational autopilot or a MAREA steering product.
7. **No customer, fleet, school, marina or installer was contacted.** Every
   "decision maker" and "budget owner" field in the segment document is a
   hypothesis to be tested in MC-10.

## 6. Content opportunities (evidence-linked, no commercial claims)

These are content themes the public evidence supports. None requires or permits
a compatibility, safety or availability claim.

| # | Opportunity | Problem | Evidence | Guardrail |
|---:|---|---|---|---|
| 1 | "Inventory your boat's electronics before you buy anything" — worksheet of unit, protocol, firmware, connector | Fragmentation | SIG-BUY-001/002/003 | Must not promise a compatibility outcome. |
| 2 | "NMEA 0183 vs NMEA 2000 vs brand networks, in plain language" | Protocol confusion | SIG-BUY-001/010 | No certification claim for MAREA products. |
| 3 | "What an installer actually has to do" — scope, labour, commissioning, handover | Installation complexity | SIG-BUY-008/009 | No installation price or duration promise. |
| 4 | "What a receive-only AIS can and cannot tell you" | AIS value debate | SIG-BUY-004/005 | No collision-avoidance or detection-guarantee claim. |
| 5 | "The subscription checklist" — what pays for continuing work, what happens on cancellation | Subscription objection | SIG-BUY-006/007/022 | No double-billing promise before the entitlement model exists. |
| 6 | "Leaving the boat unattended: a winter checklist" | Monitoring and bilge/battery risk | SIG-BUY-012/013 | No theft-prevention, constant-connectivity or alert-delivery guarantee. |
| 7 | "Autopilot takeover: what a sea trial must prove" | Steering safety | SIG-BUY-015 | No claim that a MAREA steering product is available. |
| 8 | "What to ask an installer before you sign" — certification, RMA, warranty boundary | Installer trust | SIG-BUY-009/014 | Must not imply MAREA has a certified installer network. |
| 9 | "Scheduling, sign-off and fleet records for small schools" (informational only) | School admin | SIG-BUY-016 | No implication that MAREA FLEET is deployed. |
| 10 | "Marina maintenance records and multi-site reporting" (informational only) | Marina admin | SIG-BUY-017/018 | No security certification, SLA or integration claim. |

## 7. Source access status

- **Fetched in full (13):** SRC-BUY-001, 005, 006, 007, 008, 009, 010, 011,
  012, 013, 014, plus the certification/training pages behind 006 and the
  industry context behind 019. Exact per-source status is in the JSON.
- **Reviewed as search-result extract only (7):** SRC-BUY-002, 003, 004, 015,
  016, 017, 018, 019, 020. These carry LOW/MEDIUM confidence and are never used
  as the sole support for a HIGH-confidence claim.
- **No source is marked STALE, INACCESSIBLE or CONTRADICTED.** If a link dies
  later, the correct action is to change `status` to `INACCESSIBLE`, never to
  delete the record or invent a replacement.

## 8. What would upgrade the evidence

The following are research questions, not a plan (the MC-10 discovery plan is
owned by another workstream):

1. A defined-sample owner study covering vessel type, installed electronics,
   monitoring ownership, software spend and pain ranking — the single largest
   gap, because there is currently no SURVEY signal.
2. A recorded compatibility matrix built from real device pairs, which would
   convert fragmentation from a complaint into a measured specification.
3. Installer job logs or a defined sample of itemised quotations to replace the
   single regional installation-cost guide.
4. Operator interviews (schools, marinas, fleets) to convert supply-side vendor
   pages into demand evidence.
5. Alert-delivery and steering-failure test evidence before any safety-adjacent
   claim is made in public content.
