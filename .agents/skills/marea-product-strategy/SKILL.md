---
name: marea-product-strategy
description: "Route and answer MAREA product, edition, bundle, lifecycle and readiness questions truthfully. Trigger when defining, auditing or publishing any MAREA product (NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER, FLEET), edition, bundle, compatibility statement, product-page copy, price or availability claim."
whenToUse: "Use when a task mentions MAREA products, editions, bundles, pricing hypotheses, lifecycle/readiness labels, compatibility or product-page copy, or when an audit must decide whether a MAREA offer may be shown as purchasable."
metadata:
  version: "1.0.0"
  source: "docs/marea/COMMERCIAL-PORTFOLIO.md"
---

# MAREA Product Strategy

MAREA is the **proposed** commercial product family. EMBARCARTE is the seller and
contractual party; OPEN-MARINE is the technical origin and is **not** a certified or
purchasable finished product. No SKU may be ordered merely because it is described here.

## Source of truth (read before answering)

- `docs/marea/COMMERCIAL-PORTFOLIO.md` — end-state definitions, editions, bundles, lifecycle.
- `docs/marea/WEBSITE-AND-ROADMAP.md` — positioning, proposed routes, readiness gates.
- `docs/marea/M00-DISCOVERY-BASELINE.md` — verified baseline, truth model, legal blockers.
- `docs/marea/execution/MASTER-PROMPT-REGISTRY.md` — program status; a PLANNED prompt is not delivery evidence.
- Code reality: `src/app/features/technology/models/technology.ts` (current six technical modules)
  and `src/app/core/i18n/locale-routes.ts` (public route registry). The nine commercial products
  are NOT yet the same as the technical catalog.

## Nine-product taxonomy (codes are fixed)

| Code | Role | Relationship |
|---|---|---|
| NAV | marine navigation application | standalone software |
| HUB | onboard data gateway/connectivity | appliance; NAV standalone GPS/charts does not require it |
| AIS | receive-only traffic awareness | buying NAV does not imply radio hardware |
| PILOT | supervised steering control | installer-led, safety-critical; never internet-remote unattended |
| SENSE | sensors and monitoring | primarily through compatible HUB/WATCH |
| WATCH | shore/remote alerts service | distinct from HUB gateway and from remote helm control |
| DISPLAY | dedicated marine display device | hardware; NAV is software |
| WEATHER | forecast/data service | standalone; premium entitlements shared with NAV, no double billing |
| FLEET | multi-vessel organization SaaS | B2B operations, not a consumer monitoring clone |

Editions and bundles live only in the portfolio: per-product editions (e.g. NAV Essential/Pro,
HUB Standard/Pro) and the customer bundles START, CRUISE, SAIL, PROTECT, COMPLETE, FLEET.
Use those exact minimum-content tables; bundle price hypotheses are **not approved for publication**.

## Lifecycle scale (exact order)

CONCEPT -> DEFINED -> ENGINEERING VERIFIED -> REGULATORY READY -> OPERATIONS READY -> COMMERCIALLY AVAILABLE.
Portfolio today: conceptual/DEFINED, not commercially available; MAREA trademark is **NOT CLEARED**.

## Procedure

1. Read the portfolio entry for the product/bundle and list its required fields before writing.
2. Classify the object: product vs edition vs bundle vs purchasable SKU.
3. Fill only fields with evidence; keep unknown fields OPEN. Never invent a field value.
4. Separate "defined end-state" from "available now"; only an approved SKU with real price,
   stock, compliance and fulfilment can be purchasable.
5. Record the evidence class per claim: VERIFIED / OFFICIAL SOURCE / WORKING ASSUMPTION / NOT VERIFIED.
6. If evidence is missing for the request (BOM, certifications, sea trials, legal clearance),
   return BLOCKED with the exact missing evidence instead of guessing.

## Hard rules

- Never invent certifications (CE/EMC/RED/NMEA 2000), stock, prices, supplier quotes, sea trials,
  testimonials, partner approvals, market data or legal identifiers.
- Never claim "NMEA 2000 Certified", ECDIS equivalence or AIS transmission; AIS is receive-only.
- Never publish a price hypothesis as a purchasable offer; no fabricated tax ID/address in `site.config.ts`.
- Do not treat MAREA as a registered brand; do not assume brand approval or trademark clearance.
- Do not collapse evidence categories; documentation alone never PASSes a functionality/physical milestone.

## Input/output contract

- Input: product/bundle code, task (spec, page copy, claim check, audit), locale(s).
- Output: lifecycle label + evidence class + OPEN fields + source citations; for audits, a
  PASS/PARTIAL/BLOCKED/FAIL verdict with concrete evidence paths.
