# MC-19/36 — Scope proposal (D01)

| Field                    | Value                                                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Deliverable              | D01 — `MC19-SCOPE-PROPOSAL.md`                                                                                              |
| Milestone                | MC-19/36 — Segment/solution pages and enquiry flows (owners, installers, professionals)                                     |
| Status                   | `BLOCKED_PENDING_SCOPE_APPROVAL` — proposal only, not an MC-19 plan or approval                                             |
| Baseline                 | MC-18 HEAD `3490c0f71eb6eaa89588b7a6d75bb3b6066cd094` (`feature/marea-mc18-bilingual-corporate-landing`)                    |
| MC-18 verdict             | `MC18_VERDICT = PARTIAL`; `MC18_INTERNAL_LANDING_SCOPE = PASS_INTERNAL_LANDING_SCOPE`                                        |
| MC-19 implementation     | **NOT STARTED**                                                                                                             |
| MC-19 verdict            | `BLOCKED` — the contractual scope is not sufficiently defined; implementation prerequisites are absent                       |
| Publication              | `NOT_AUTHORIZED`                                                                                                            |
| Machine-readable package | `docs/marea/segments/data/mc19-scope-proposal.json`, `mc19-source-verification.json`                                        |
| Companion documents      | D02 source verification · D03 dependencies/blockers · D04 acceptance criteria · D05 risk register · D06 MC-20 handoff · D07 |

## 0. Stop statement

This document is a **scope proposal**, not an implementation. No MC-19 code, route, page,
form, endpoint, dataset or public artefact has been created. The milestone is `BLOCKED`
because the programme has not issued the authoritative MC-19 Master Prompt and because the
enquiry-flow half of the declared scope is blocked by the open privacy gate.

The instruction for this milestone was explicit: do not invent the MC-19 scope; if the
roadmap or handoff does not define it sufficiently, produce a documented scope proposal and
stop implementation. That is the action taken. The proposal is complete and actionable; the
implementation is deliberately not started.

## 1. What the programme actually defines

| Source                                       | What it establishes                                                                                                                                                                                                                     |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MASTER-PROMPT-REGISTRY.md` row 19           | Objective: segment/solution pages and enquiry flows (owners, installers, professionals). Dependency: MC-18. Expected output: segment pages + lead flows. Verification theme: real CTAs only (quote/pre-registration/coming-soon per readiness). Status: `PLANNED`. |
| Registry header                              | Prompts 03–36 are planning placeholders; the client-issued Master Prompt is authoritative and may rebind, reorder or split the planned objective.                                                                                       |
| `WEBSITE-AND-ROADMAP.md` MC-07B              | The corresponding roadmap item is “Marine solution pages: customer segment routes, sales CTAs and enquiry flows”. The proposed site map names `/profesionales` and `/instaladores`; it does not name an owners page.                    |
| MC-18 handoff D18, section 6                 | The three reserved segment references are `OWNERS`, `INSTALLERS`, `PROFESSIONAL_FLEETS`. They exist as content only; an owner page is described as “possible”, not required.                                                              |
| MC-18 handoff D18, section 9                 | Six privacy/consent prerequisites must exist **before** any submission form: privacy approval and notices, DPA/DPIA, consent capture, data minimisation, server-authoritative anti-abuse and a security review, and no lead storage before them. |
| MC-18 handoff D18, section 17                 | Explicit non-goals: no publication, indexation, purchase, price, stock, certification, testimonial, sea-trial or licensing claim; no design-system fork; no weakening of the SEO activation locks.                                       |
| MC-15 proposed route registry                | `professionals` (`/profesionales`), `installers` (`/instaladores`), `mareaSolutions` (`/marea/soluciones`) and six bundle routes exist as `PROPOSED_INTERNAL_NOT_DEPLOYABLE`; there is **no** owners or professional-fleets route.       |
| MC-14 release-evidence gates                 | 13 gates, 0 closed; 24 required documents, 0 executed; 42 claims, 0 public-authorized; `GATE-PRIVACY-DPA-DPIA` is `BLOCKED`.                                                                                                           |

## 2. What is missing for an implementable scope

The MC-19 row is a milestone placeholder. It does not define the contract that a third party
could implement and verify. The gaps are material, not cosmetic:

| Gap                                             | Consequence                                                                                                      |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| No authoritative MC-19 Master Prompt            | The exact deliverables, page set, owners, dates and acceptance thresholds are not contractual.                  |
| No owners route/entity/page type                | Implementing an owners page would require inventing an IA identity that MC-15 never approved.                    |
| No decision between segment pages and solution pages | “Segment/solution pages” could mean 3 audience pages, 2 MC-15 professional pages, the solutions overview plus 6 bundle pages, or a subset. |
| No content contract or copy approval            | Section structure, copy ownership, evidence registry and ES/EN text are undefined; public copy approval is absent. |
| No CTA definition                               | “Real CTAs only” cannot be implemented as quote or pre-registration while lead capture is prohibited; “coming-soon” has no agreed design or test. |
| No enquiry-flow design                          | Lawful basis, consent, retention, anti-abuse, endpoint security and data minimisation do not exist.              |
| No measurable acceptance thresholds             | The one-line verification theme cannot gate a delivery.                                                          |
| No boundary against MC-20–23                    | Family pages and bundle comparison already have owners; MC-19 solution pages could duplicate them.                |

## 3. Why implementation must not start (fail-closed)

1. **No authority.** The registry says the client-issued Master Prompt is authoritative. It
   has not been issued, so any page set would be an invented requirement.
2. **No route for owners.** The authoritative IA registry has no owners page. Creating one
   would be a route-registry decision, not an implementation detail.
3. **No lawful enquiry flow.** `GATE-PRIVACY-DPA-DPIA` is blocked and 0 of 24 required
   documents are executed. Building a form, endpoint, lead store or registration would
   violate the governance the programme has preserved since MC-14.
4. **No publication authority.** `PUBLICATION_AUTHORIZED = false`; no release
   authorization record exists. Even a correct internal page must not be publicly activated,
   indexed or linked.
5. **No commercial facts.** `PRICE_APPROVED = NONE`, `COMMERCIAL_AVAILABILITY = NOT_FOR_SALE`,
   0 approved prices and 0 merchant SKUs. Any “real” sales CTA would be a false offer.
6. **Precedent.** MC-18 could implement because a Master Prompt and an explicit isolated
   landing brief existed. MC-19 has neither.

## 4. Scope options (for an owner decision)

### Option A — Internal audience pages without enquiry flows (recommended)

Three bilingual audience pages for `OWNERS`, `INSTALLERS` and `PROFESSIONAL_FLEETS`, one
locale-aware component tree, reusing the MC-17 design system and MC-18 patterns, rendered
only by the isolated loopback preview. Per-segment solution context is embedded (bundle and
family references) rather than creating separate bundle routes. CTAs are informational and
fail-closed; no form, quote, pre-registration, lead capture or installer registration.

- Requires: P01 (Master Prompt), P02 (IA/route decision), P10 (scope approval).
- Does not require the privacy gate, because no personal data is collected.
- Deliberately defers the enquiry-flow half of the roadmap row until P03/P06 close.

### Option B — MC-15-aligned professional and solution pages

Implement the two MC-15 professional pages plus the solutions overview and six bundle
solution pages (9 pages). This is closer to the literal “solution pages” wording but larger,
still lacks an owners route, and overlaps the page ownership already assigned to MC-20–23.

### Option C — Full MC-07B scope including enquiry and lead flows

Add quote, pre-registration and installer lead workflows with server-side handling. This is
not executable now: it requires P03, P04, P05, P06, P07, P08 and P09 in addition to P01,
P02 and P10. Building it now would introduce unauthorized customer data collection and
commercial claims.

**Recommendation:** approve Option A only, after P01/P02/P10, and record the deferred
enquiry-flow scope as `BLOCKED` with P03 as its reopening condition. Do not treat Option A
as approval of Option C.

## 5. Proposed acceptance criteria (summary)

The full matrix is in D04. In summary: scope approval; IA/route/entity decision with
collision check; one bilingual component tree per approved page with evidence-provenanced
content blocks; MC-17 reuse without fork; no public route/canonical/hreflang/JSON-LD/sitemap;
no enquiry/lead flow while P03 is blocked; SSR/hydration and accessibility/responsive
evidence; exact test counts; independent review with 0 open BLOCKING/MAJOR; draft PR only,
with all governance flags and inherited debt preserved.

## 6. Proposed task DAG (for a future authorized execution)

`T01 scope approval → T02 IA decision → T03 content contract → T04 implementation (and T05
datasets/validator in parallel) → T06 verification → T07 independent review → T08 delivery`.
`T09 enquiry/lead flow` is deferred and depends on P03/P06; it is not scheduled.

Quality kinds, owners, exact verification commands and write scopes must be bound in the
execution plan; this proposal does not assign them.

## 7. Dependencies and blockers (summary)

| ID  | Item                                                             | Status       | Blocks                     |
| --- | ---------------------------------------------------------------- | ------------ | -------------------------- |
| P01 | Authoritative MC-19 Master Prompt                                | ABSENT       | Implementation, approval   |
| P02 | IA/route/entity decision for segment and solution pages          | ABSENT       | Implementation             |
| P03 | Privacy/DPA/DPIA approval (B07)                                  | BLOCKED      | Enquiry/lead flows         |
| P04 | Public copy (B05) and claims (B06) authorization                 | ABSENT       | Publication                |
| P05 | Commercial data and pricing decision (B08)                       | ABSENT       | Public commercial CTAs     |
| P06 | Publication/indexation/deployment and release authorization (B09)| ABSENT       | Publication                |
| P07 | Trademark clearance and MAREA public use (B01/B02)               | NOT_GRANTED  | Public brand use           |
| P08 | Source IP and licensing clearance (B03)                          | NOT_CLEARED  | Publication/data claims    |
| P09 | MC-14 release-gate programme (B10)                               | 0/13 closed  | Publication                |
| P10 | Approval of this proposal and owner/write-scope assignment       | ABSENT       | Implementation             |

## 8. Legal and publication gates

```text
TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE = NO_GO
SOURCE_IP_CLEARANCE = NOT_CLEARED
LICENSING_RIGHTS_GRANTED = false
PRICE_APPROVED = NONE
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
PILOT_SAFETY_GATE = BLOCKED
TESTED_COMPATIBILITY_ROWS = 0
PUBLICATION_AUTHORIZED = false
INDEXATION_AUTHORIZED = false
PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED
```

The MC-14 release-gate programme remains at 13 gates / 0 closed; 24 required documents / 0
executed; 42 claims / 0 public-authorized. No internal MC-19 success may be interpreted as
external legal or commercial approval.

## 9. MC-20 handoff

MC-20 (product catalog batch 1: NAV, HUB, AIS) depends on MC-02/16/18, not on an
unimplemented MC-19. It must not assume MC-19 segment or solution pages exist. The available
and missing inputs are recorded in D06 and `data/mc19-mc20-handoff-inputs.json`.

## 10. Verdict

```text
MC19_VERDICT = BLOCKED
MC19_SCOPE_PROPOSAL = DELIVERED
MC19_IMPLEMENTATION_STARTED = false
MC19_IMPLEMENTATION_AUTHORIZED = false
MC19_MASTER_PROMPT = NOT_ISSUED
MC19_IA_ROUTE_DECISION = ABSENT
MC19_PRIVACY_GATE = BLOCKED
MC19_PUBLICATION = NOT_AUTHORIZED
MC19_LEAD_CAPTURE = false
MC19_PUBLIC_ROUTES_ACTIVATED = 0
MC19_MERGED = false
MC19_DEPLOYED = false
MC19_PUBLISHED = false
```

The milestone is `BLOCKED`, not `FAIL`: no required implementation was lost, and the
proposal removes the ambiguity that prevented a defensible implementation. The next action
is an owner decision on P01/P02/P10, not more code.
