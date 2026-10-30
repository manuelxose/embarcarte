# MAREA — Website, sales architecture and execution roadmap
Date: 2026-10-30
Status: PROPOSAL. Not evidence of working new routes, live payment, trademark availability or sales.

## 1. Commercial positioning
**Company:** EMBARCARTE. **Intended product family:** MAREA. **Technical origin:** OPEN-MARINE. Do not suggest the source project is a certified or purchasable finished product.

**Primary positioning:** coherent technology for modernising sailing and motor vessels, with useful interoperable instrumentation and marine navigation, practical local operation, fitting/support and a clear product upgrade path. The value proposition is *integration and ownership experience*, not an unproven claim of superior navigation safety or bargain pricing.

**First target buyers:** owners of older leisure boats in Galicia and north Portugal; compatible marine installers; secondarily charter schools/operators and small fleets. B2B and consumer buying journeys differ, and must have different quotation and VAT presentation.

## 2. Preserve current site structure and existing business
Current Angular 21 site includes brand homepage, technology, experiences, boat deliveries, services, guides, contact, store, login, account, legal pages and administration. These are real existing businesses and route identities. Do not delete them or redirect indexed pages wholesale. Use the existing typed `LOCALIZED_ROUTES` and ES/EN dictionaries. Continue to display factual availability only.

### Proposed localized website map
| Page identity | ES candidate | EN candidate | Main conversion |
|---|---|---|---|
| Corporate home | / | /en | Explore MAREA and existing EMBARCARTE services |
| MAREA family | /marea | /en/marea | Compare use cases |
| Product family | /marea/productos | /en/marea/products | Browse products |
| NAV | /marea/nav | /en/marea/nav | Explore subscription / prelaunch interest |
| HUB | /marea/hub | /en/marea/hub | Compatibility assessment |
| AIS | /marea/ais | /en/marea/ais | Receive-only AIS quote |
| PILOT | /marea/pilot | /en/marea/pilot | Installer survey |
| SENSE | /marea/sense | /en/marea/sense | Kit selector |
| WATCH | /marea/watch | /en/marea/watch | Device + plan overview |
| DISPLAY | /marea/display | /en/marea/display | Configuration request |
| WEATHER | /marea/weather | /en/marea/weather | Plan comparison |
| FLEET | /marea/fleet | /en/marea/fleet | B2B demo / proposal |
| Bundles | /marea/soluciones | /en/marea/solutions | Solution selector |
| Bundle detail | /marea/soluciones/:slug | /en/marea/solutions/:slug | Request quote |
| Compatibility selector | /marea/configurador | /en/marea/configurator | Qualified quote |
| For professionals | /profesionales | /en/professionals | Partner application |
| Installer program | /instaladores | /en/installers | Installer lead |
| Support | /soporte | /en/support | Documentation/support |
| Product help | /soporte/marea/:slug | /en/support/marea/:slug | Manuals/FAQ |

All paths are proposed NEW public addresses. Before implementation, validate collisions with existing routes and indexed URL history. Maintain canonical/hreflang reciprocity; do not publish missing English pages as translated alternates. Retain existing /tienda and /en/shop for actual purchasable inventory.

### Navigation model
Primary: MAREA (Products, Solutions, Configurator), Services (existing experiences, delivery), Professionals, Resources, Support, Shop, Account. Spanish and English vary only in copy/URL, not feature identity. Footer includes genuine company legal/contractual data once supplied.

### Page content contract
- Homepage: company value; ecosystem picture; user outcomes; three suggested packages; existing EMBARCARTE experience/service offerings; product compatibility explanation; installer/support availability; lead contact.
- All nine product pages: polished hero, real intended value, customer pains, capability categories, edition/inclusion/exclusion table, compatibility checks, real readiness status, support, technical documents and truthful purchase/quote CTA.
- Bundle pages: actual scope of included products, necessary add-ons (antenna, cabling, steering actuators, SIM, chart licences, installation), compatible vessel profiles, no arbitrary fixed quote for incompatible configurations.
- Product configurator: vessel type/length, current GPS/plotter/network/instruments, desired benefits, budget, location, installation preference. Only deterministic validated compatibility rules produce an eligible configuration. Otherwise display `requires specialist assessment` and create a quote request rather than asserting compatibility.
- Commerce: extend existing checkout; catalogue states `draft / quote / coming-soon / purchasable` are distinct; only real SKU stock/prices become orderable. Payments use hosted provider; financial/legal/return/recurring conditions presented honestly.
- Customer portal: existing orders; later vessel profiles, serial/device ownership, subscriptions, licences/entitlements, notifications and support tickets, all properly protected.

### Visual direction
Naval instrument credibility over generic SaaS. Deep navy and restrained turquoise, warm off-white backgrounds, generous hierarchy, precise data visualization, verified product photography or clearly labelled concept renders, no invented testimonial/claim. One consistent design system. Explicit day/night interaction for marine applications is distinct from website theme. Ship from mobile-first components with real accessibility and performance checks.

## 3. Product data contract and SEO
Represent each MAREA product with stable id, proposed brand family, localized text, customer segment, edition identifiers, compatibility conditions, included items, exclusions, legal notices, lifecycle/readiness, purchasable SKU refs (optional), pricing provenance, related bundles, service entitlements and support references. Keep product presentation independent from actual inventory. Never derive an offer or Product schema price from an unapproved price hypothesis. Keep content and SKUs auditable.

## 4. Financial operating model (pending supplier data)
Before approving a price, build a per-SKU ex-VAT contribution worksheet:
- Retail/list and distributor negotiated net prices; actual manufacturing/assembly/testing; enclosure/cabling/certification amortization; freight/packaging; provider fees; returns; warranty; technical support; installation labor; stock financing; acquisition costs.
- Recurring: chart/weather data rights, cloud/SIM, customer service, chargebacks, tax, subscription churn and acquisition.
- Package margin must include shared costs and installer discount. Show both direct and distributor channels.
- Required financial outputs: 12-month monthly cash flow, 36-month revenue and contribution forecast, 60-month expansion planning, inventory cash requirement, conservative/base/growth/stress assumptions, sensitivity and break-even.
- **No numerical financial forecast approved:** actual BOM, supplier quote, conversion/acquisition rate, channel discount, refunds, churn and launch dates are missing. Filling these with unlabelled invented numbers would be misleading.
- First testable unit economic thresholds and real supplier proposals must be recorded before turning any hypothetical price into checkout prices.

## 5. Commercial motion
### Phase A — Demand validation
Position MAREA as intended end-state solution. Talk to boat owners, marinas and installers; use 5–10 structured discovery conversations per segment as an initial learning target, not an asserted market size. Show the nine final products and route interested owners to clear `request specification/quote` workflows according to true readiness.
### Phase B — Demonstrable installations
One verified reference installation at a sailing yacht and one at a motorboat, if feasible. Track installation time, supported devices, real problems, customer perceived benefit and warranty exposure. Never invent partner endorsements.
### Phase C — Scaled commerce
Publish compliant SKUs with invoice, fulfilment, warranty, refund and support channels; later invite partners on recorded commercial terms. Drive NAV/WEATHER retention and WATCH recurring services; FLEET only after validated organization requirements.
### Phase D — Regional expansion
Galicia/Rías Baixas → Northern Portugal → rest of Spain/Portugal → EU. Translate regulated materials, warranty/support and distribution rules by market. Geographic expansion does not imply that weather/chart data are licensed in all jurisdictions.

## 6. Roadmap with small acceptance-gated deliverables
Historical EMBARCARTE M01–M04 are completed i18n/security work and must NOT be confused with this new prefix `MC-`.

| ID | Deliverable | Concrete acceptance conditions |
|---|---|---|
| MC-00A | Repository baseline | source refs, branch/PR status, product inventory, truth labels |
| MC-00B | Rights/dependencies baseline | licenses, chart/data permissions, NMEA relationships, redistributed components |
| MC-00C | Commercial risks | legal checklist, real hardware validation gaps, support/production constraints |
| MC-01A | MAREA brand policy | EMBARCARTE→MAREA architecture, legal clearance pending status, naming conventions |
| MC-01B | Identity system | original logo concepts, colors/typography/art direction, verified third-party asset rights |
| MC-02A | Nine product business definitions | 24-field end-state documentation per product; no unverified facts |
| MC-02B | Bundles and compatibility | inclusion/exclusion matrix and honest compatibility triage |
| MC-03A | Competitor matrix | verifiable official offer/price/feature snapshots with check dates |
| MC-03B | Customer research | primary interviews and validated positioning/objections |
| MC-04A | Hardware and recurring unit economics | sourced costs, ex-VAT margins, channel and install economics |
| MC-04B | Cash flow and scenarios | 12/36/60 month model with coherent assumptions and stress testing |
| MC-05A | Public IA & SEO | bilingual route/content registry + migration/redirect plan |
| MC-05B | Commerce data model | product vs SKUs vs readiness vs subscriptions, safe offers |
| MC-06A | Website design system | responsive/accessibility/performance design contract |
| MC-07A | Corporate MAREA landing | complete ES/EN factual pages and tested SEO |
| MC-07B | Marine solution pages | customer segment routes, sales CTAs and enquiry flows |
| MC-08A | Product catalog batch 1 | NAV/HUB/AIS/WEATHER final end-state offer pages |
| MC-08B | Product catalog batch 2 | WATCH/SENSE/DISPLAY pages |
| MC-08C | Product catalog batch 3 | PILOT/FLEET pages with extra cautions |
| MC-09A | Bundle comparison | end-to-end price/inclusion/upgrade UI |
| MC-09B | Compatibility and quotation | validated selection paths, out-of-scope specialist triage |
| MC-10A | Commerce SKU readiness | no sale without valid lifecycle, price, inventory and compliance |
| MC-10B | Commerce test checkout | verified amounts, consent, failure/expiry and webhook recovery |
| MC-11A | Customer vessels + products | secure accounts, registrations, entitlements, renewals |
| MC-11B | Support and operations | support tickets, RMA, warranty and commercial service system |
| MC-12A | OPEN-MARINE commercial contracts | isolate app/device/data layers, versioning and interoperability |
| MC-12B | Safety boundaries | physically independent PILOT/actuator safety controls and proof requirements |
| MC-13-NAV | Software product verification | feature matrix, legal charts, offline tests and acceptance |
| MC-13-HUB | Hardware gateway verification | protocol/device matrix plus physical/electrical evidence |
| MC-13-AIS | AIS verification | receiver-only RF/regulatory and traffic display tests |
| MC-13-PILOT | Pilot verification | formal hazard analysis, hardware failsafe, sea trials and conformity |
| MC-13-SENSE | Sensor verification | measurement/ingress/calibration tests |
| MC-13-WATCH | Remote monitoring verification | network-loss/alert/privacy and subscription reliability |
| MC-13-DISPLAY | Display verification | marine enclosure, daylight, electrical and acceptance |
| MC-13-WEATHER | Weather data verification | lawful sources, provenance, forecast quality evaluation |
| MC-13-FLEET | B2B SaaS verification | tenant isolation, operator workflows, billing and SLA |
| MC-14A | Professional sales | qualified leads, installer and distributor quote workflows |
| MC-15A | Organic growth | accurate multilingual SEO, comparison content, measurement and consent |
| MC-16A | Product regulatory gates | per-SKU conformity, traceability, licenses, warranty and support |
| MC-16B | Production release readiness | tested backups/restore, protection, environment approval and monitoring |
| MC-17A | Authorized launch | only approved SKU/locale/channel sells and fulfils real orders |
| MC-18A | Growth review | data-led conversion, retention, support, channel margin and expansion |

### Mandatory milestone evidence
Every gate records owner, base commit, specific scope, acceptance criteria, implementation files, tests actually run, real hardware evidence (if applicable), independent review, unresolved risks, PASS/PARTIAL/BLOCKED/FAIL. Documentation alone cannot PASS a functionality/physical validation milestone. Always protect working service and prevent uncontrolled merge/deploy.

### Immediate recommended sequence
1. Finish MC-00B license/data/source and actual hardware inventory.
2. Start formal MAREA trademark clearance before any public brand switchover.
3. Freeze commercial product data contract and first wave copy, keeping products unpurchasable while unverified.
4. Design multilingual information architecture using current Angular registries.
5. Prototype actual site changes only on separate branches after agreements on legal identity and priority.
6. Repair existing production release gates before authorization of any deployment.

## 7. Explicit exclusions and readiness
- This document does not claim that all nine products are manufactured, fully implemented, approved, available or competitively priced.
- No purchase flow for unverified devices; a complete commercial specification is independent of stock/readiness.
- Trademark clearance remains open, including an existing US vendor `Marea Marine` selling marine electronics (https://mareamarine.com/collections/electronics); this is a risk signal, not a legal infringement finding.
- No evidence of production rollout or live website readiness has been validated here.
