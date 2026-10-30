# MAREA — M00 commercial discovery and baseline
Date: 2026-10-30
Status: PARTIAL — repository inventory and commercial risks recorded; no production deployment or hardware certification performed.
Owner: EMBARCARTE. Intended commercial brand: MAREA. Existing technical foundation: OPEN-MARINE.

## Decision and truth model
- EMBARCARTE is the seller, contractual party, support organization and owner of the customer relationship.
- MAREA is the **proposed** commercial marine product family. Its legal clearance and availability for protected use are NOT confirmed.
- OPEN-MARINE remains the existing development project, not a public product line.
- Product specifications represent intended final customer experiences, NOT evidence of present manufacturability, compliance, stock, connectivity, partner agreements or purchase availability.
- Evidence classes: **verified in repository**, **manufacturer/official public source**, **working assumption**, **not verified**. Do not collapse categories.

## Verified repositories on 2026-10-30
- EMBARCARTE: https://github.com/manuelxose/embarcarte ; default branch `main`, SHA `ed40ee906219b42a929659abebd4c1e9e80785e8`. PR #3 merged at 13:21 UTC; PR #4 merged at 13:22 UTC. These are historical i18n/security milestones, distinct from the *new* MAREA commercialization milestones.
- OPEN-MARINE: https://github.com/manuelxose/open-marine ; default branch `main` with verified browseable repository and modular workspaces, recent result at `403941b8860439115418b1786d8431284d2dae08`.
- No MAREA commercialization modifications on `main` are claimed by this document. This branch is documentation-only.

## Existing assets — verified by inspecting repository files
### EMBARCARTE
- Angular 21 / SSR / prerender, shared Spanish-English component architecture, 223 localized dictionary keys per locale according to M04 delivery report.
- Existing features: home, technology, experiences, delivery, services, about, contact, guides, legal, store, customer area and admin.
- Store: Express + node:sqlite, real server-authoritative prices/stock, bank-transfer orders, optional Stripe Checkout/webhook, order ownership, customer registration, account and admin management.
- Existing product/technology routing uses a typed locale registry in `src/app/core/i18n/locale-routes.ts`. Preserve its stable ES path approach and use analogous architecture for future MAREA routes.
- Existing technology catalog presents six **technical** modules: navegador, cartografia, hub, piloto-automatico, simulacion and pasarela-sensores, not the nine intended **commercial** MAREA products.
- `src/app/core/site.config.ts` still describes Open Marine as the public brand and has blank fiscal identifiers/registered address. These must be resolved before a legally complete commercial launch; do not overwrite with fabricated company details.
- M04 documented 96 prerendered routes, isolated tests, 14/14 Playwright tests, and engineering PASS. These are *recorded delivery claims*, not tests rerun in this document.
- M04 production NO-GO pending branch protection, approval gates, verified production restore, off-host retention and external monitoring. A merge to main alone does not prove a safe production rollout.

### OPEN-MARINE
- Workspaces: `marine-data-contract`, `marine-sensor-gateway`, `marine-simulation-platform`, `marine-instrumentation-ui`, `marine-autopilot-engine`, `marine-chart-engine`, `marine-tile-server`; plus `signalk-runtime` and scripts.
- README describes local/LAN navigation stack, Signal K, UI, autopilot engine, simulation bench and chart engine. Raspberry and workstations are development/runtime deployment targets, NOT commercial hardware certification.
- Chart-engine README documents legal MBTiles and unencrypted S-57 import, environmental overlays, EMODnet, Copernicus and local Vigo packages. It explicitly excludes S-63/oeSENC, DRM bypass and claims to ECDIS equivalence.
- Autopilot protocol document describes a high-level engine, UART microcontroller, heartbeat timeout, hardware E-stop and safety interlocks. This is a **design/documentation claim**, not proof of vessel-at-sea validation or approval.
- AIS integration includes AIS tools, data models, CPA calculator and stores; reception/visualization cannot be advertised as an approved commercial transponder.
- Source licenses, dependencies, redistributed nautical datasets, chart rights, signal providers and external tools require a per-component legal inventory before embedding them in commercial devices or SaaS.

## Competitive reference points (public pages consulted on 2026-10-30)
- Orca software: Plus EUR 49/year, Smart Navigation EUR 149/year, per https://help.getorca.com/en/articles/6541858-subscription-prices-and-functionality .
- Digital Yacht AIS100 receiver EUR 360 and AIS100 Pro EUR 420 official Spain site: https://digitalyacht.es/producto/ais100/ and https://digitalyacht.es/producto/receptor-ais/ .
- Digital Yacht iKonvert official Spain: EUR 240, https://digitalyacht.es/producto/ikonvert/ . Its narrower conversion scope must NOT be equated with the proposed MAREA HUB.
- Yacht Devices NMEA2000-WiFi gateway listed EUR 249.07 at Spanish SVB shop: https://www.svb-marine.es/es/yacht-devices-puerta-de-enlace-gateway-wifi-nmea2000.html .
- These are point-in-time listings and do not establish MAREA's manufacturing costs, product fit, market share or relative superiority.

## Legal and commercial blockers (high priority)
1. **MAREA naming conflict risk:** a separate business already operates `mareamarine.com` and sells marine electronics. This is not proof of conflicting registered rights in ES/EU, but demands professional trademark clearance before packaging, identity registration or domain commitments: https://mareamarine.com/collections/electronics .
2. Search EUIPO/TMview and Spanish OEPM for identical and similar signs in relevant goods/services and territories. Official EUIPO guidance: https://www.euipo.europa.eu/eu/trade-marks/before-applying/availability . Mark **NOT CLEARED** until verified.
3. Manufacturer-by-product CE / EMC / radio / electrical / mechanical / device traceability and installation requirements must be established for each hardware SKU. RED scope: https://single-market-economy.ec.europa.eu/sectors/electrical-and-electronic-engineering-industries-eei/radio-equipment-directive-red_en .
4. NMEA 2000 licensing, manufacturer code and product certification must be verified: https://www.nmea.org/nmea-2000.html . Do not claim NMEA 2000 Certified until authorization.
5. Cyber Resilience Act: EU reporting obligations commenced 2026-09-11 and most product obligations start 2027-12-11 (subject to scope/exclusions): https://commission.europa.eu/news-and-media/news/safer-and-more-secure-digital-products-2026-09-11_en .
6. Need real supplier quotations and BOM, physical prototypes, marine environment tests, safety hazard analysis, product traceability, maintenance/warranty reserve, installer training, licensed chart/data feeds and verified payment/live-commerce settings.
7. Website not externally verified from this review because public HTML retrieval failed; do not infer production contents from repository source.
8. No uploaded official certification, merchant credentials, actual production order, inventory or price confirmations have been checked.

## Strategic operating decision
- Prioritize integrated refit packages for existing leisure boats, along with paid applications/services. Launch sequence is investment/dependency ordering, not permission to sell incomplete systems.
- Bundle/value proposition is one installation experience + compatible onboard data + consistent navigation/monitoring workflows, rather than generic lower-price claims.
- Treat operational marine controls independently from marketing, CRM, commerce and remote web services.
- Preserve current EMBARCARTE offerings (experiences and boat delivery) until a separate commercial decision is made.

## Completion criteria for M00
- [x] Locate and read both GitHub repositories and record current baseline.
- [x] Inspect modular architecture, website framework and existing commercial features.
- [x] Inspect previous M03/M04 PR state rather than guessing.
- [x] Record preliminary competitor sources and critical naming risks.
- [ ] Full license and BOM/parts inventory including manufacturer permissions.
- [ ] Physical hardware and sea-test evidence review.
- [ ] Live website + actual production/backup/rollback audit.
- [ ] Formal trademark/brand availability review.
- [ ] Final financial and procurement assumptions.
M00 remains **PARTIAL** until these are addressed.

## Next safe milestone
M01: commercial brand architecture, commercial tone, product naming contract, compliance-safe product copy and SEO route mapping. Do not change live identities or announce purchasable products while brand clearance is pending.
