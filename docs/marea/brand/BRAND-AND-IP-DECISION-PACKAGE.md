# EMBARCARTE / MAREA — Brand and IP decision package

| Field | Value |
| --- | --- |
| Document ID | MC-03 / BRAND-AND-IP-DECISION-PACKAGE |
| Milestone | MC-03 |
| Date | 2026-10-30 |
| Owner | Lead (Brand and Commercial Program Director) — document preparation only |
| Nature | Decision preparation package for the company's human decision-makers and their legal advisers. **Not a legal opinion, not an assignment, not a licence, not a signature** |
| Authorization fields | `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED` · `SOFTWARE_OWNERSHIP_CHAIN = NOT_ESTABLISHED` · `PUBLIC_BRAND_LAUNCH = NOT_AUTHORIZED` |

## 1. Purpose

MC-03 completes the brand strategy and governance layer. It cannot complete the legal layer. This
document isolates **every decision that an AI agent is not authorized to take**, states the evidence
each decision requires, and defines the exact go/no-go conditions the programme will use. It exists so
that a human, a lawyer or a company officer can close these items in one pass instead of re-reading the
programme.

Nothing in this document may be treated as: a trademark clearance, a legal opinion, a licence grant, an
ownership assignment, an authorization to publish, file, buy or spend.

## 2. Decision register

| ID | Decision | Type | Status at MC-03 | Source |
| --- | --- | --- | --- | --- |
| TM-01 | Trademark strategy for MAREA and the nine family names (file / defer / rename / defensive scope) | Legal-commercial | **OPEN — NO-GO. Research outcome: OPTION B (material conflict, specialist review required)** | §3 |
| TM-02 | Jurisdictions and Nice classes to file in, and the goods/services wording | Legal | **OPEN — NO-GO** | §3.3 |
| TM-03 | Handling of the "Marea Marine" conflict signal and other MAREA marks found in reviewed records | Legal-commercial | **OPEN — NO-GO** | §3.4 |
| BD-01 | Endorsed brand architecture (EMBARCARTE → MAREA → nine families) as the programme standard | Brand | **DECIDED (MC-03)** — see `DECISION-LOG.md` | `BRAND-ARCHITECTURE.md` |
| BD-02 | Domain and search-surface strategy (no MAREA domain purchase now) | Brand-commercial | **DECIDED (MC-03) as a plan; purchase NOT authorized** | §5 |
| BD-03 | Visual identity gate: nothing is designed as final until TM-01/TM-02 progress | Brand | **DECIDED (MC-03)** — CONDITIONAL GO for MC-04 | `MC-04-VISUAL-IDENTITY-BRIEF.md` |
| DEC-01 | OPEN-MARINE ownership and outbound licence (carried from MC-02) | Legal ownership | **BLOCKED — evidence request package prepared** | §4 |
| DEC-02..DEC-08 | Chart distribution, weather data, AIS decoder, NMEA 2000, PILOT safety programme, manufacturing model, launch order (carried from MC-02) | Product/legal | **BLOCKED / OPEN — unchanged by MC-03** | `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` §7 |
| X-02 | Corporate legal data for `SITE.legal` (tax id, address, registry) | Company | **BLOCKED — client input required** | §6 |

Rule: no agent closes any item in this table. Agents prepare evidence; humans decide.

## 3. Trademark decision package (TM-01, TM-02, TM-03)

### 3.1 What has been produced and what it is worth

`TRADEMARK-CLEARANCE-RESEARCH.md` and `TRADEMARK-SEARCH-RESULTS.csv` record every registry attempt,
every identified record and its evidence class. Their value is **triage**, not clearance: they tell
counsel where to look first and which records matter commercially. The research explicitly states its
own access limitations. `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED` remains in force.

### 3.2 Professional acts required before any filing or public brand use

1. A qualified trademark attorney or agent (EU/ES) performs a **freedom-to-use** search in the relevant
   jurisdictions and classes and issues a written opinion (scope, dates, classes, limitations stated).
2. The opinion addresses the **commercial** conflict signal (an existing marine-business use of
   "Marea") separately from **registered rights**; the two are different legal questions.
3. The opinion states whether the mark is **registrable** (distinctiveness, descriptiveness for marine
   goods, acquired distinctiveness) as distinct from whether it is **usable** (third-party rights).
4. If registrable and usable, a filing decision with scope, classes, territories, budget and owner
   entity is taken by the authorized signatories (§7) and executed by the appointed representative.
5. Filing is **not** performed by this programme. Until it is verified, no `®`, no `™`, and no
   "registered"/"registrada" wording is permitted anywhere (see `COMMERCIAL-BRAND-CLAIMS-POLICY.md`).

### 3.3 Inputs the adviser needs (already assembled)

| Input | Where | Notes |
| --- | --- | --- |
| Proposed mark wording | `brand-identity.contract.json` | MAREA plus nine family names and six bundle names |
| Actual goods and services | `docs/marea/COMMERCIAL-PORTFOLIO.md` | Products are CONCEPT/DEFINED, none available — the intended-use statement must be truthful |
| Class hypotheses for review | `TRADEMARK-CLEARANCE-RESEARCH.md` | 9 / 35 / 37 / 42 with justification; 12 / 38 only if the genuine offer supports them |
| Territory priorities | Spain and Portugal first, EU-wide next, international designations later | Primary markets are ES/PT/EU |
| Conflict records and evidence classes | `TRADEMARK-SEARCH-RESULTS.csv` | Includes records that could be verified and those that could not |
| Family-name risk | `PRODUCT-NAMING-SYSTEM.md` | Generic/sector words (NAV, AIS, DISPLAY, WEATHER, HUB, SENSE, WATCH) carry weak standalone distinctiveness — the adviser must decide whether standalone protection is realistic or whether protection rests on the composite/figurative mark |
| Visual direction (for a future figurative mark) | `MC-04-VISUAL-IDENTITY-BRIEF.md` | Not a filed representation; provisional only |

### 3.4 Questions the adviser must answer (TM-03)

1. Is "Marea Marine" earlier use, an earlier registered right, or neither, in each relevant jurisdiction?
2. What is the realistic opposition risk from MAREA marks in classes 9 / 35 / 37 / 42?
3. Does the ordinary meaning ("tide", ES/IT/PT) make the mark descriptive or merely suggestive for
   marine electronics, navigation software and SaaS?
4. Is a composite (word + figurative) filing materially safer than a word-only filing?
5. Should the nine family names be filed separately, defensively, or not at all?
6. Which jurisdictions must be secured before any public launch, and what is the latest safe filing date?
7. What wording may be used publicly while clearance is pending (a truthful "proposed brand" statement
   is already adopted — confirm it is sufficient).

### 3.5 Recorded outcome of the research gate and non-negotiables

**Recorded outcome: OPTION B — MATERIAL CONFLICT INDICATED, SPECIALIST REVIEW REQUIRED.**
`TRADEMARK-CLEARANCE-RESEARCH.md` §2 verifies a live EU trade mark `M MAREA` (EUTM 018135609, Nice
class 9, proprietor BRANDS 2020, S.L., registered 2020-02-27) whose goods include *mobile apps /
application software for mobile devices / smartwatches*, i.e. exactly what MAREA NAV would be; the same
proprietor holds live EUTMs in classes 35 and 37, two of the four classes the programme wants. This is
not a finding of infringement and it is not a prohibition, but it makes "continue and hope" indefensible
before a specialist has answered the class-9 similarity question.

Therefore:

- No filing, no filing budget committed by an agent, no instruction to an attorney by an agent.
- No `®` or `™`; no "registered", "registrada", "marca registrada", "trade mark" beside MAREA.
- No packaging artwork ordered, no printed material produced, no paid advertising, no public brand
  launch, no domain purchase.
- **Allowed while OPTION B is open:** continued non-public project work — internal strategy, the
  governance layer, MC-04 concept/brief development in private, product engineering and drafting under
  the "proposed brand" label. A rename is **not** automatic and must not be executed by an agent; it is
  one of the mitigation alternatives for human review (see `MC-03-DELIVERY.md` §Trademark verdict).
- The mitigation options to put to counsel: (a) proceed with a distinctive composite mark and a narrowed
  class-9 list; (b) proceed only for territories/classes without verified conflict (class 42 has no
  verified EU conflict in reviewed records); (c) adopt a different product brand; (d) drop the NAV app
  naming and keep MAREA for hardware-only families. None of these is decided in MC-03.

## 4. Ownership decision package — DEC-01 (OPEN-MARINE)

### 4.1 Why this is separate from trademarks

Brand rights and source-code rights are different legal questions. Clearing MAREA says nothing about
whether EMBARCARTE may distribute software built on the OPEN-MARINE codebase. MC-02 established that
the repository has **no licence file**, a **mixed authorship history** and **no assignment chain**;
therefore the current default position is that no inbound reuse right and no outbound distribution right
is documented. MC-03 does not change that, and does not copy or license any code.

### 4.2 Ownership evidence request package (to be sent by the company, not by an agent)

Each item must be obtained from the **actual rights holder(s)** and reviewed by counsel. An AI agent
must not draft signatures, fabricate assignments or contact any third party.

| # | Evidence item | Why it is needed | Who holds it | Status |
| --- | --- | --- | --- | --- |
| E-01 | Identification of every original author of the OPEN-MARINE code (individual names/handles, and the legal entity behind `oficina@tecnoriasl.com` and `mgonzalezv@eservicios.indra.es`) | Authorship is the root of the chain; ~48% and ~52% of current files are last touched by those two identities (MC-02 L-02, L-03) | Company + contributors | NOT OBTAINED |
| E-02 | Employment contracts, consultancy agreements or service agreements covering the periods in which the code was written (including any clause on IP assignment, works-for-hire, moral rights waiver and the right to reuse in a commercial product) | Employment or consultancy may vest rights in an employer/client rather than the individual (MC-02 L-02) | Company HR/legal + counterparties | NOT OBTAINED |
| E-03 | Scope-of-work and creation-date evidence for each contributor's work (what they were hired to do and when the relevant code was written) | Determines whether the work fell inside the contracted scope | Company + contributors | NOT OBTAINED |
| E-04 | Any existing client, employer or contractor rights over the code (including whether a third party owns part of it) | Prevents distributing code owned by a third party (MC-02 L-02, L-03) | Company + counsel | NOT OBTAINED |
| E-05 | List of additional contributors (including AI-agent commits and the third-party `Claude <noreply@anthropic.com>` commits) and their contribution scope | Authorship includes every contributor, including automated ones with a responsible operator | Engineering | PARTIAL (commit metadata exists) |
| E-06 | Provenance declaration for code written before import into the public repository (root commit already contained 204 files) | Pre-history provenance is undocumented (MC-02 L-04) | Engineering + contributors | NOT OBTAINED |
| E-07 | Disclosure of third-party/third-party-licensed code incorporated, with licences (AIS-catcher GPL-3.0, chart/weather clients, firmware dependencies) | Determines distribution obligations (MC-02 S-01, S-09) | Engineering | PARTIAL (MC-02 inventory) |
| E-08 | AI-tool usage policy and provenance register (which tools, which outputs, who is responsible, commercial-use terms) | AI-generated material provenance affects ownership and licensing (MC-02 L-05) | Engineering + counsel | NOT OBTAINED |
| E-09 | Written assignment or licence from each actual rights holder to EMBARCARTE, or a decision that EMBARCARTE is the owner | The core of DEC-01: without it there is no inbound right | Company + contributors + counsel | NOT OBTAINED — must not be fabricated |
| E-10 | Decision on the outbound licence position (proprietary baseline / permissive / source-available) and the authority to distribute products commercially | Required before any sale or distribution (MC-02 L-01, DEC-01) | Company owner + counsel | NOT DECIDED |
| E-11 | Contribution governance for the future (CLA/DCO, `Signed-off-by`, contributor licence) | Prevents repeating the current gap (MC-02 L-08) | Engineering + counsel | NOT ADOPTED |
| E-12 | Entity/asset structure decision: repository custody under an EMBARCARTE-controlled organisation | Custody is currently a personal GitHub account (MC-02 L-03) | Company owner | NOT DECIDED |

**Explicit warning for the reader of this table:** a commit authored with a company-domain email address
does **not**, by itself, establish employee ownership, employer ownership or a licence. Neither does a
public repository, a README statement, a `package.json` licence field, nor an agent's audit conclusion.
Only E-09/E-10 (reviewed by counsel) close the item.

### 4.3 Prioritized decision checklist for the rights holders and their advisers

1. **Establish the entity.** Which legal person owns the OPEN-MARINE code today? (EMBARCARTE / the
   individual / TECNORIA / an employer of a contributor / unclear.)
2. **Collect E-02 + E-03** for every contributor identity found in Git history. Without contracts, assume
   the individual owns their contribution.
3. **Obtain E-09** (assignment or licence to EMBARCARTE) from every actual rights holder, with a counsel
   review of scope, territory, duration and sublicensing.
4. **Confirm E-04** (no outstanding client/employer right) before spending on brand or manufacturing.
5. **Decide E-10** (outbound licence) and record it in the decision log; only then add licence files.
6. **Adopt E-11/E-12** (future contribution governance, entity custody) to avoid repeating the problem.
7. **Re-run the MC-02 IP audit** after steps 2–5 to re-close L-01..L-04, then close `DEC-01` formally.

### 4.4 What MC-03 did and did not do here

- **Did:** prepared this evidence request, kept the blocker open and traceable, kept the brand and IP
  workstreams separate, and asserted no ownership claim in any brand document.
- **Did not:** copy OPEN-MARINE code into EMBARCARTE, add a licence, contact any contributor, employer or
  client, or claim that EMBARCARTE developed or owns every component. Any statement of authorship must
  wait for E-09.

## 5. Domain and search-surface strategy (BD-02)

### 5.1 Decision

The programme will **not** acquire a separate MAREA domain now. The commercial surface remains
`embarcarte.com`, with product surfaces as sub-paths. A MAREA domain is a post-clearance, post-approval
option, not a prerequisite.

### 5.2 Rationale

- The brand is not cleared; buying domains for an uncleared mark creates spend with an unresolved
  trademark position.
- Domain availability has **not** been verified through an authoritative registrar in MC-03 and no
  availability claim is made (`TRADEMARK-CLEARANCE-RESEARCH.md` records only what was observed).
  Domain availability would not prove trademark availability in any case.
- A second root domain would create a second SEO surface, duplicate hreflang/canonical complexity and
  fragment the existing indexed URLs — directly against the migration constraints in
  `WEBSITE-BRAND-MIGRATION.md`.
- The endorsed architecture works with one domain: `embarcarte.com/marea` as the brand hub.

### 5.3 Target information architecture (future, not implemented in MC-03)

| Surface | URL shape (proposed) | Notes |
| --- | --- | --- |
| Brand hub | `/marea` (ES) · `/en/marea` | Additive page; must not replace or cannibalise indexed pages |
| Product families | `/marea/nav`, `/marea/hub`, `/marea/ais`, … | Must be registered in `LOCALIZED_ROUTES` with canonical/hreflang reciprocity |
| Bundles | `/marea/bundles/start` … | Commercial packages, not products |
| Corporate/seller | existing `/`, `/about`, `/services`, `/legal` | EMBARCARTE remains the seller surface |
| Support/RMA | existing support surface | Stays under EMBARCARTE |

### 5.4 Domain policy

- No purchase, no back-order, no broker contact without written authorization from the signatories in
  §7 and a cleared trademark position.
- If MAREA clearance succeeds and a domain is later acquired, it must **301 into
  `embarcarte.com/marea`** (or vice versa with a full redirect map) and must not create two competing
  brand roots.
- Defensive registrations (variants, misspellings) are a post-clearance decision with a stated budget;
  not part of this milestone.
- No social accounts are created in this milestone. No third-party trademark owner is contacted.

## 6. Corporate legal data (X-02) — required client input

`SITE.legal` in `src/app/core/site.config.ts` has an empty `taxId`, `address` and `registry`. These must
be supplied by the company and verified; they may not be inferred, invented or borrowed. Until then:
legal pages remain incomplete, invoices cannot be issued, and no "seller of record" statement with
full legal identification may be published. This is a **publication blocker**, not a documentation gap.

## 7. Authorized signatories (to be completed by the client)

Role-based; this programme must not invent names.

| Decision | Required signatory | Authority needed |
| --- | --- | --- |
| TM-01 / TM-02 filing and budget | Legal representative of the company + trademark counsel | Power to commit the company and incur cost |
| TM-03 conflict strategy | Legal representative + counsel | Litigation/settlement risk acceptance |
| BD-01 / BD-02 / BD-03 | Company owner (brand owner function) | Brand strategy authority |
| DEC-01 (E-09 assignment/licence, E-10 outbound licence) | Legal representative + each rights holder + counsel | IP assignment/licence execution |
| X-02 corporate data | Legal representative | Verified company registration data |
| Public brand launch / packaging spend / domain purchase / advertising | Company owner + finance | Budget and publication authorization |
| Claims approval for signed commercial documents | Company owner + product owner | Commercial commitment |

## 8. Go / no-go requirements

| Gate | GO requires | State at MC-03 |
| --- | --- | --- |
| Public use of MAREA on any surface | Written counsel opinion (TM-01/TM-02), clearance recorded, signatory authorization | **NO-GO** |
| Trademark filing | Opinion + scope decision + budget + appointed representative | **NO-GO** |
| Packaging / printed material procurement | Clearance + real BOM + conformity plan + signatory authorization | **NO-GO** |
| Domain / social acquisition | Clearance + budget + signatory authorization | **NO-GO** |
| Product page publication with commercial CTA | Product lifecycle OPERATIONS READY + approved price + claims register entry | **NO-GO** (nothing is available) |
| Distributing any product built on OPEN-MARINE | DEC-01 closed (E-09/E-10) + licence/notice gate | **NO-GO** |
| MC-04 identity design work (internal) | TM-01 filed/underway or explicitly deferred in writing; design remains provisional and unpublished | **CONDITIONAL GO** (internal only) |
| Advertising spend | Clearance + product readiness + budget | **NO-GO** |

## 9. Unresolved blockers carried by MC-03

| ID | Blocker | Severity | Owner | Next action |
| --- | --- | --- | --- | --- |
| X-01 | MAREA trademark clearance not performed; clearance NOT_GRANTED | HIGH | Company owner + counsel | Commission TM-01 (§3) |
| L-01..L-04 | OPEN-MARINE ownership/licence chain undocumented (DEC-01) | CRITICAL | Company owner + counsel | Collect E-01..E-09 (§4) |
| L-05 | AI-generated code/asset provenance policy absent | HIGH | Engineering + counsel | Adopt policy; register AI use |
| L-09 | OPEN-MARINE/OMI naming status undecided (internal codename vs commercial) | MEDIUM | Company owner | Keep internal; decide only if ever public |
| X-02 | Corporate legal identity data missing | HIGH | Company owner | Provide verified data; do not invent |
| X-03 | Image generation unavailable (no provider/credential/budget) | HIGH | Company owner | Authorize budget + credential (blocks MC-04 assets, not MC-04 design) |
| D-01/D-04 etc. | Chart/weather data rights (MC-02) | CRITICAL/HIGH | Product + counsel | Unchanged by MC-03 |

## 10. Sequencing recommendation

1. **Immediately:** provide X-02 corporate data (cheap, unblocks legal pages and seller statements).
2. **Next:** commission TM-01/TM-02 opinion (§3) — the critical path for every public brand act.
3. **In parallel:** start E-01/E-02/E-03 collection for DEC-01 (documents, not decisions).
4. **Then:** E-09/E-10 decision with counsel; only then licence files and distribution.
5. **Only after TM-01 is positive or explicitly risk-accepted:** MC-04 final identity, packaging,
   public MAREA surface, domain decision.
6. **Never before their gates:** product sales, certification claims, advertising, trademark filing by an
   agent, or any spend.

## 11. Evidence and traceability

| Decision area | Prepared evidence |
| --- | --- |
| Trademark | `TRADEMARK-CLEARANCE-RESEARCH.md`, `TRADEMARK-SEARCH-RESULTS.csv` |
| Brand architecture / naming | `BRAND-ARCHITECTURE.md`, `PRODUCT-NAMING-SYSTEM.md` |
| Copy and claims limits | `BRAND-VOICE-ES-EN.md`, `COMMERCIAL-BRAND-CLAIMS-POLICY.md` |
| Machine enforcement | `brand-identity.contract.json`, `scripts/check-brand.mjs` |
| Ownership chain | `docs/marea/compliance/INTELLECTUAL-PROPERTY-CHAIN.md`, `SOFTWARE-LICENSE-INVENTORY.csv`, `MC-02-BLOCKERS-AND-DECISIONS.md` |
| Corporate data gap | `src/app/core/site.config.ts` (`legal` block), MC-02 X-02 |
| Site surface | `WEBSITE-BRAND-MIGRATION.md` |
| Visual gate | `MC-04-VISUAL-IDENTITY-BRIEF.md` |

This package is complete when the client's signatories have recorded decisions, not when the document
is written.
