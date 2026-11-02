# D15 — Phased SEO migration plan (MC-15)

| Field | Value |
|---|---|
| Deliverable | D15 `MC15-PHASED-SEO-MIGRATION-PLAN.md` |
| Milestone | MC-15/36 — Bilingual information architecture and SEO migration |
| Owner | `seo-migration` |
| Machine data | `data/migration-phases.json` (`MAREA-MC15-MIGRATION-PHASES`) — **7 phases** |
| Base commit | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Date | 2026-11-02 |
| Status | `INTERNAL_PLANNING_ONLY` |
| Execution | `NOT_EXECUTED` (0 of 7 phases) |
| Authorization granted | `NONE` |
| Publication / deployment | `NOT_AUTHORIZED` |
| MC16_STARTED | `false` |

## 1. Boundary

This is a **plan**, not a schedule and not an execution. In MC-15:

- **Phases 1–6 are not executed.** Phase 0 is also not executed: only partial local observations
  exist (documented in D07/D08/D09 as evidence inputs), not the immutable snapshot the phase
  requires.
- **No authorization is granted** for any phase. Every phase has `authorizationRequired: true`,
  `authorizationStatus: NOT_GRANTED` and `executionStatus: NOT_EXECUTED`.
- **MC-16 has not started.** Nothing here opens it, and no date is promised.
- **No merge, deployment, publication, redirect activation, sitemap submission or Search Console
  action** occurs. No file outside this documentation package is written.

A completed phase is not a release. A release is Phase 5 and needs its own written authorisation.

## 2. Phase model at a glance

| Phase | Name | Objective in one line | Authorisation authority | Executed in MC-15 |
|---|---|---|---|---|
| 0 | Baseline preservation | Freeze the current URL surface as the immutable reference | `PROGRAMME_LEAD` | no |
| 1 | Approved corporate IA planning candidates | Turn the corporate IA into reviewed, unauthorised candidates | `COMMERCIAL_DIRECTOR` + `PROGRAMME_LEAD` | no |
| 2 | MAREA brand clearance prerequisite | Prove no MAREA page may be public before external clearance | `LEGAL_COUNSEL` + `COMMERCIAL_DIRECTOR` | no |
| 3 | Product and solution page implementation | Build pages in future milestones, each separately authorised | `PROGRAMME_LEAD` + `COMMERCIAL_DIRECTOR` | no |
| 4 | Controlled migration verification | Verify redirects, canonical, hreflang, structured data, sitemap | `PROGRAMME_LEAD` + independent reviewer | no |
| 5 | Authorized release | Release only with separate written authorisation | `COMMERCIAL_DIRECTOR` + `PROGRAMME_LEAD` + reviewer | no |
| 6 | Post-release monitoring | Measure, detect regression, trigger rollback | `PROGRAMME_LEAD` + `COMMERCIAL_DIRECTOR` | no |

## 3. Phase detail

### Phase 0 — Baseline preservation

| Aspect | Content |
|---|---|
| Objective | Freeze the current public URL surface as the reference every later phase must preserve: route/URL inventory, canonical and hreflang map, redirect map, sitemap output, robots.txt content, status per URL, structured-data inventory. Read-only. |
| In scope | Read-only crawl of a reproducible SSR run with disposable data and the inherited fixtures; per-URL record of status, canonical, hreflang, robots meta, `X-Robots-Tag`, sitemap membership, JSON-LD types and redirect location; verbatim sitemap URL set and robots.txt capture. |
| Out of scope | Any write to `src/`, `public/`, `package.json`, the sitemap generator or `robots.txt`; any deployment, DNS, CDN or Search Console action; any redirect creation. |
| Entry criteria | Frozen base `e0be1e4…` with no pending writer; D02/D03 inventories accepted; a reproducible SSR run available. |
| Exit criteria | An immutable snapshot artefact with the complete URL set and per-URL attributes; every difference from the registered inventories explained; the snapshot referenced by Phase 4 and D16 and never edited (corrections are append-only). |
| Blocking gates | `GATE-WEBSITE-REMEDIATION` |
| Prohibited | Publishing, deploying, redirecting, re-indexing, submitting a sitemap, and treating MC-15's partial probes as the formal snapshot. |
| Risks | `SEO-RISK-01`, `SEO-RISK-11`, `SEO-RISK-18`, `SEO-RISK-22` |

### Phase 1 — Approved corporate IA planning candidates

| Aspect | Content |
|---|---|
| Objective | Produce a reviewed candidate register for the corporate IA: page identity, entity, ES/EN path, collision status, canonical/hreflang consequence and a publication decision of `NOT_AUTHORIZED`. |
| In scope | Existing corporate pages treated as preserved; new corporate candidates (professionals, installers, support) recorded as candidates only; collision analysis against 21 current route ids, 7 admin ids and 3 legacy paths; per-candidate claims review. |
| Out of scope | MAREA product/family/bundle/solution pages; route registration in `src/`; any publication or indexation request; anything MAREA contains. |
| Entry criteria | Phase 0 accepted; D04–D06 accepted; D08/D09 accepted; D11 metadata available. |
| Exit criteria | Every candidate has entity, paths, collision status, canonical/hreflang plan and a `NOT_AUTHORIZED` publication decision; no candidate is marked published, indexable or sitemapped; claims outcome recorded per candidate. |
| Blocking gates | `GATE-COMMERCIAL-CLAIMS`, `GATE-LEGAL-ENTITY`, `GATE-WEBSITE-REMEDIATION` |
| Prohibited | Treating a candidate as pre-authorised; creating a route, page or sitemap entry; a MAREA reference inside a corporate candidate. |
| Risks | `SEO-RISK-05`, `SEO-RISK-06`, `SEO-RISK-19`, `SEO-RISK-21` |

### Phase 2 — MAREA brand clearance prerequisite

| Aspect | Content |
|---|---|
| Objective | Establish that **no MAREA page may become public** before external brand, IP, claims and market-placement gates open, and record what a granted decision would have to contain. |
| In scope | Restating `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED` and `MAREA_PUBLIC_USE = NO_GO` (D-003, D-059); the minimum external decision set; the forbidden-claim list that survives any clearance. |
| Out of scope | Filing, clearing, renaming or negotiating a trademark; creating, registering or publishing any MAREA URL; MAREA in titles, descriptions, navigation, breadcrumbs, JSON-LD or social previews. |
| Entry criteria | Phase 1 recorded; D-003 and D-059 binding; the 13 release gates register available with all gates open. |
| Exit criteria | Either a written external clearance decision recorded with its scope, or the phase remains `BLOCKED` and no MAREA page may be created; the forbidden-claim list restated; no crawler-reachable MAREA URL in any environment. |
| Blocking gates | `GATE-IP-CLEARANCE`, `GATE-COMMERCIAL-CLAIMS`, `GATE-MARKET-PLACEMENT` |
| Prohibited | Any public MAREA use while `NO_GO`, including og:image, footer attribution or JSON-LD brand; any agent-authored "clearance"; any MAREA page, redirect or sitemap entry. |
| Risks | `SEO-RISK-05`, `SEO-RISK-07`, `SEO-RISK-19`, `SEO-RISK-20` |

### Phase 3 — Product and solution page implementation (future milestones)

| Aspect | Content |
|---|---|
| Objective | Implement product, family, bundle and solution pages in **future implementation milestones**, each with independent publication, indexation and structured-data authorisation. This is engineering work, deliberately separate from SEO planning. |
| In scope | One component per page localised from `LOCALIZED_ROUTES`; per-page publication, indexation and structured-data decisions; per-family gates (PILOT safety, AIS receive-only, WATCH alert wording, WEATHER data licensing, FLEET tenancy, NAV navigational-aid boundary, DISPLAY/HUB conformity); concept and quote-only states expressed as content states. |
| Out of scope | Any price, stock, availability or checkout for MAREA; any MAREA `Product`/`Offer`/`AggregateRating`/`Review`; any SEO planning change. |
| Entry criteria | Phase 2 clearance for the scope; D05 registry frozen for the page; D10 structured-data authorisation per page type; D11 metadata approved in both locales; relevant family gates open. |
| Exit criteria | Implementation reviewed and tested with locale parity; publication, indexation and structured data each recorded as authorised or withheld; no page released by this phase. |
| Blocking gates | `GATE-MARKET-PLACEMENT`, `GATE-SAFETY-PILOT`, `GATE-DATA-LICENSING`, `GATE-COMMERCIAL-CLAIMS`, `GATE-PRICING`, `GATE-CRA-CYBERSECURITY`, `GATE-PRIVACY-DPA-DPIA` |
| Prohibited | Shipping a MAREA `Product`/`Offer` node, price, availability, rating or certification; turning a hypothesis into a purchasable SKU (D-007, D-009); publishing before Phase 5. |
| Risks | `SEO-RISK-05`, `SEO-RISK-08`, `SEO-RISK-12`, `SEO-RISK-20`, `SEO-RISK-21` |

### Phase 4 — Controlled migration verification

| Aspect | Content |
|---|---|
| Objective | Verify in a controlled non-public environment, against the Phase 0 snapshot, that redirects, canonical, hreflang, structured data and the sitemap behave exactly as decided — before any release decision. |
| In scope | Redirect verification (the three `EXISTING_ACTIVE` 301s unchanged and single-hop; no new redirect; no `PROPOSED_NOT_ACTIVE` record active); canonical/hreflang verification (self-referencing absolute canonical, reciprocal groups, single `x-default` on the Spanish home, no invented EN alternate); structured-data verification (parseable, whitelisted types, no MAREA `Product`/`Offer`, no price/availability/rating/certification); sitemap set equality; robots verification. |
| Out of scope | Any change to live routing, headers, sitemap or robots during verification; Search Console submission or re-indexing; release, DNS or CDN changes. |
| Entry criteria | Snapshot authoritative; a candidate artefact identified by git commit SHA and checksum (never by an invented deployment or release identifier); a disposable database of the same fixture class; D07–D10 frozen. |
| Exit criteria | Per-URL-family report showing status, canonical, hreflang and robots identical to the snapshot where preservation was decided and identical to plan where change was authorised; redirect set equality with zero chains, loops, cross-locale targets, blocked/private destinations; sitemap set equality; zero blocked URL indexable; zero structured-data restriction breach. Any failed check blocks the phase and can never be reported as PASS. |
| Blocking gates | `GATE-WEBSITE-REMEDIATION` |
| Prohibited | Verifying against a moving target or production traffic; editing the snapshot to match the candidate; reporting an unexecuted or environment-blocked check as PASS. |
| Risks | `SEO-RISK-02`, `SEO-RISK-03`, `SEO-RISK-04`, `SEO-RISK-06`, `SEO-RISK-08`, `SEO-RISK-09`, `SEO-RISK-10`, `SEO-RISK-12`, `SEO-RISK-13`, `SEO-RISK-14`, `SEO-RISK-15`, `SEO-RISK-16`, `SEO-RISK-17` |

### Phase 5 — Authorized release

| Aspect | Content |
|---|---|
| Objective | Release only with a **separate written authorisation** from the responsible human owner, after Phase 4 passes, with the rollback prerequisites verified before the release window. |
| In scope | Recording who authorised, the exact URL set and code SHA released, and what is explicitly excluded; confirming applicable gates and recording every gate that stays open with its consequence; confirming the D16 rollback prerequisites. |
| Out of scope | Any release performed by an autonomous agent; releasing a MAREA page before Phase 2/3 are satisfied for it; releasing a price, offer or stock state without approval. |
| Entry criteria | Phase 4 PASS with an independent reviewer; a written authorisation naming URL set, code SHA and excluded scope; at least one rollback rehearsal against the snapshot; a named incident owner and escalation channel for the window. |
| Exit criteria | The authorised human owner executes the release and a change record references the code SHA and authorisation; Phase 6 checks start immediately including redirect and canonical spot checks; any deviation from the authorised URL set is an incident. |
| Blocking gates | all 13 gates (see dataset), including `GATE-WEBSITE-REMEDIATION` |
| Prohibited | Releasing without written authorisation; releasing a larger URL set than authorised; releasing before rollback prerequisites are verified; any agent performing the release, merge or deployment. |
| Risks | `SEO-RISK-01`, `SEO-RISK-07`, `SEO-RISK-18`, `SEO-RISK-22` |

### Phase 6 — Post-release monitoring

| Aspect | Content |
|---|---|
| Objective | Monitor the released surface for crawl errors, redirect regressions, canonical/hreflang drift, sitemap coverage and indexation, and trigger the D16 rollback when a threshold is crossed. |
| In scope | Scheduled redirect verification with one-hop and destination checks; sitemap fetch and diff against the expected set; crawl-error and canonical/hreflang sampling; Search Console coverage once access exists; incident log with thresholds, decisions and evidence. |
| Out of scope | Changing content, routes, redirects or metadata to "fix" a metric without authorisation; claiming indexation or ranking evidence that was not measured. |
| Entry criteria | Phase 5 change record; monitoring access established, or a declared reduced mode without it; snapshot and authorised expected URL set available; D16 thresholds and incident owner agreed before the window. |
| Exit criteria | An agreed stable window with no threshold breach, recorded with its measurement source; **or** a rollback executed and verified against the snapshot with the incident closed and its cause recorded. Every reported metric traces to a measurement artefact; unmeasured metrics stay `UNVERIFIED`. |
| Blocking gates | `GATE-WEBSITE-REMEDIATION`, `GATE-PRIVACY-DPA-DPIA` |
| Prohibited | Inventing crawl, coverage or ranking numbers; declaring a stable window without measurements; silently reverting a change outside the D16 procedure. |
| Risks | `SEO-RISK-02`, `SEO-RISK-11`, `SEO-RISK-16`, `SEO-RISK-17`, `SEO-RISK-18`, `SEO-RISK-22` |

## 4. What no phase may ever do

1. Publish a MAREA page, name, brand token, price, availability, certification or rating while its
   gates are closed.
2. Move, merge, rename or retire an indexed Spanish URL; the D07 decision for every existing URL is
   `KEEP_AS_IS`.
3. Add a redirect for an existing Spanish URL. Only the three inherited 301s are active, and the one
   conditional proposal stays `PROPOSED_NOT_ACTIVE` with `authorizationRequired: true`.
4. Let an agent authorise its own phase, merge, deployment, release or PR state change.
5. Report a phase, check or gate as PASS without executed evidence.
6. Claim indexation, coverage, ranking or Search Console evidence that does not exist.
7. Modify `robots.txt`, the sitemap generator, `app.routes.ts`, `app.routes.server.ts`, `src/` or
   `public/` inside an SEO planning step.

## 5. Authorisation model

| Rule | Statement |
|---|---|
| Separation of duties | The author of a plan cannot authorise its execution; every phase names a human/role authority distinct from `seo-migration`. |
| Per-phase authorisation | Authorising Phase 2 does not authorise Phase 3, 4 or 5. Each phase is authorised separately, in writing, with its exact scope. |
| No programme-level shortcut | A milestone PASS (including MC-15 itself) is not an authorisation for any phase. |
| No agent authority | No autonomous agent may sign, approve, merge, deploy or release. Agents may prepare evidence only. |
| Irreversibility | An authorised change is treated as irreversible until the D16 rollback procedure has been rehearsed and its prerequisites verified. |
| Decisions as authority | D-003, D-004, D-007, D-009, D-059, D-060 and D-061 remain binding on every phase; a later decision can only tighten them. |

## 6. Evidence discipline per phase

| Evidence class | Meaning in this plan | Allowed as exit evidence |
|---|---|---|
| `REPOSITORY_VERIFIED` | Inspected in the frozen tree | yes, for code/config claims |
| `LOCAL_SSR_VERIFIED` | Observed from an isolated local SSR run with disposable data | yes, for behaviour of the frozen base |
| `PUBLIC_OBSERVATION` | Read-only observation of the live site | yes; 2026-11-03 sitemap and three URLs |
| `SEARCH_CONSOLE_VERIFIED` | Real Search Console read-only evidence | yes for the 24-URL sample captured 2026-11-02; not a full census |
| `ASSUMED` / `UNKNOWN` | Explicitly labelled | never as exit evidence |

Indexation state is `SEARCH_CONSOLE_VERIFIED_PARTIAL` for the 24 inspected URLs and
`INDEXATION_UNVERIFIED` for the rest. Phase 6 still requires a full measurement source; the
existing sample does not close that requirement.

## 7. Position in the roadmap

| Phase | Roadmap relationship (informational) | Not authorised by MC-15 |
|---|---|---|
| 0 | MC-15 D07–D10 define the expected state; the snapshot itself is pending | yes |
| 1 | Corporate IA work consumes D04–D06, D11, D12 | yes |
| 2 | Brand clearance consumes MC-03/MC-14 gates | yes |
| 3 | Page implementation corresponds to later catalogue/design milestones (MC-07A/MC-08A–C style work in the inherited roadmap) and to MC-16+ work | yes |
| 4 | Verification happens in an authorised non-public environment | yes |
| 5 | Release corresponds to an authorised launch-stage decision | yes |
| 6 | Monitoring follows a release and needs measurement access | yes |

## 8. Status summary

| Item | Value |
|---|---|
| Phases defined | 7 (`PHASE-0` … `PHASE-6`) |
| Phases with `executionStatus: NOT_EXECUTED` | 7 / 7 |
| Phases with `authorizationRequired: true` | 7 / 7 |
| Authorisations granted | 0 |
| Phases executed in MC-15 | 0 |
| Gates referenced | all 13 |
| `MC16_STARTED` | `false` |
| Merge / deployment / publication | none |

The plan is complete as a **plan**. Its readiness to be executed is deliberately zero: the
prerequisites in §3 and the rollback prerequisites in D16 are unmet, and several depend on external
human decisions that no agent can produce.
