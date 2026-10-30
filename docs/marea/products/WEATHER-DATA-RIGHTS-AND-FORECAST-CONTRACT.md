# MAREA WEATHER — data-rights and forecast contract annex (MC-07 / D10b)

Programme: EMBARCARTE / MAREA. Milestone MC-07, batch 03.
Product: **MAREA WEATHER** (code WEATHER, type SOFTWARE). Lifecycle DEFINED, availability NOT_FOR_SALE, publication INTERNAL_ONLY.
Companion dossier: docs/marea/products/MAREA-WEATHER-COMMERCIAL-SPEC.md. Copy: docs/marea/products/copy/weather.es.md, docs/marea/products/copy/weather.en.md.

**Data-rights position of this annex, stated once and never softened:** WEATHER.providerRightsGranted = false. No provider right is GRANTED. No dataset named here may be displayed commercially, cached server-side, packaged offline, redistributed, sublicensed or used to sell a derived product until the exact permission is obtained in writing and recorded in this annex. An upstream open licence is evidence about a dataset, not a MAREA commercial entitlement. Every row below therefore carries one of:

| Classification | Meaning in this annex |
| --- | --- |
| PERMITTED_CONDITIONAL | The upstream official licence text (retrieved 2026-10-30) appears to permit the intended use, subject to the stated conditions. It is not a signed contract, not a costed plan and not an approval to launch. |
| LEGAL_REVIEW_REQUIRED | The official terms are ambiguous, silent, contradictory or unreachable for the intended use; counsel must decide and, where needed, the provider must confirm in writing. |
| NOT_PERMITTED_FOR_PAID_SERVICE | The official terms expressly exclude commercial use of the applicable access route (typically a free tier). Using this route inside a paid MAREA service is prohibited. |
| UNRESOLVED | No official, retrievable term could be established on the check date. The default is **no use**. |
| BLOCKED | A named MC-02 blocker prevents closure regardless of the upstream licence text. |

Evidence classes are the binding ones of docs/marea/products/README.md §5: VERIFIED_REPO, VERIFIED_EXTERNAL, ASSUMPTION, HYPOTHESIS, OPEN, BLOCKED. Every external term below is VERIFIED_EXTERNAL with URL and check date **2026-10-30** unless explicitly marked otherwise. Where a term could not be retrieved, the row says so and does not infer permission from a third-party summary.

---

## 0. Contents

1. Scope, authority and the one-entitlement rule
2. The fifteen-dimension per-provider rights matrix: column definitions
3. Per-provider rights matrices (Copernicus Marine, EMODnet, Open-Meteo, MeteoGalicia, AEMET, Puertos del Estado, OpenWeather, tide/current providers)
4. Per-variable rights summary
5. Forecast timestamp semantics
6. Freshness, staleness and expiry rules
7. Multi-model comparison method — transparent comparison, never a fictional consensus
8. Missing-data, partial-coverage and unknown-source behaviour
9. Legally authorized caching and offline presentation
10. MAREA account, entitlement ledger and NAV/WEATHER sharing
11. Attribution, provider naming and branding rules
12. Classification counts and the honest data-rights verdict
13. Legal review items (LR-01..LR-14)
14. Supplier-negotiation checklist
15. Evidence that would change the verdict; non-assertions; document status

---

## 1. Scope, authority and the one-entitlement rule

### 1.1 What this annex governs

This annex is the binding data-rights and forecast contract for MAREA WEATHER. It governs, for every variable MAREA WEATHER may display: the access route, the display right, the subscription compatibility, caching, offline presentation, redistribution, attribution, derived outputs, call limits, variable scope, retention, geography, provider naming, modification/aggregation and cost. It also fixes the forecast timestamp semantics, freshness rules, multi-model comparison method and missing-data behaviour that the product must implement so that a forecast is never presented as an observation and a stale forecast is never presented as current.

### 1.2 The one-entitlement rule (binding, and identical in the dossier and both copy files)

There is **one customer account and one entitlement ledger**. WEATHER may be bought standalone. NAV Pro may include WEATHER Standard-equivalent read access **only where provider rights allow**, and that inclusion is CONDITIONAL. Upgrading Standard to Pro applies a prorated credit. **The same entitlement is never billed twice across NAV and WEATHER.** Cancelling NAV never deletes user-owned WEATHER records (saved locations, preferences); a read-only export is offered for a defined window (hypothesis 30 days, legal review). A provider-licence loss produces an honest "unavailable" state with attribution retained. An expired entitlement never renders a fabricated or frozen forecast as current. Billing and entitlement services are **not implemented** in MC-07: WEATHER_SUBSCRIPTION_SERVICE = NOT_FOUND, WEATHER_ENTITLEMENT_LEDGER = NOT_FOUND.

### 1.3 Why "the data is public" is not a right

A public endpoint, an open licence, a scientific citation or a third-party blog summary is not permission to operate a paid product. Three separate questions must each be answered in writing: (a) may the data be accessed commercially through the intended route; (b) may it be displayed inside a paid subscription product; (c) may it be cached, transformed, compared, stored or presented offline for as long as the product needs. This annex answers none of them by inference. Where any answer is missing, the feature stays BLOCKED or UNRESOLVED and the product shows an honest unavailable state rather than a guessed dataset.

---

## 2. The fifteen-dimension per-provider rights matrix: column definitions

Every provider matrix in §3 uses these **exactly fifteen dimensions**, in this order. They are the binding vocabulary; no provider section may add a sixteenth and call it a right.

| # | Dimension | What must be established |
| --- | --- | --- |
| R01 | Commercial API access | Is there a lawful route to obtain the data for a commercial service, at which tier, and does it require a contract? |
| R02 | Commercial display rights | May the values be displayed inside a paid MAREA subscription surface? |
| R03 | User-subscription compatibility | May display be tied to a recurring consumer subscription, or does the licence forbid subscription-gated access? |
| R04 | Server-side caching | May MAREA cache values on its own servers, for how long, and with what attribution? |
| R05 | Offline access | May values be packaged, stored on a device or presented without a live provider connection? |
| R06 | Data redistribution | May MAREA pass values to a third party (partner, FLEET organisation, DISPLAY device, NAV session) or republish them? |
| R07 | Attribution | Is a specific credit string, DOI citation, logo or notice required, and exactly where? |
| R08 | Derived outputs | May MAREA compute and sell derived products (route sampling, weather windows, comparisons, indices), and on what terms? |
| R09 | Call limits | Published rate/quota limits and the consequence of exceeding them. |
| R10 | Forecast-variable scope | Which variables, levels, horizons and products are covered by the right MAREA is relying on. |
| R11 | Retention | How long values may be stored, and whether history may be kept or offered. |
| R12 | Geographic limitations | Territorial or basin restrictions on access, display or redistribution. |
| R13 | Provider naming / branding rules | How the provider may be named, whether its marks may be used, and what endorsement may never be implied. |
| R14 | Modification / aggregation rights | May values be modified, re-gridded, averaged, combined with other models or aggregated? |
| R15 | Commercial cost and customer-facing contract terms | Price, currency, tax basis, billing period, SLA/uptime commitment, termination, and what MAREA may state to customers about the provider relationship. |

Status vocabulary inside each matrix: YES / CONDITIONAL / NO / UNRESOLVED / NOT_APPLICABLE, each with a one-line reason. YES never means "MAREA has the right today"; it means the upstream official text appears to allow the definition of R01–R15, subject to §1.3 and to the classification in §12.

---

## 3. Per-provider rights matrices

### 3.1 Copernicus Marine Service (Mercator Ocean International)

**Products of interest:** IBI (Iberia–Biscay–Ireland) regional physics analysis/forecast (currents, sea surface temperature, salinity, sea level) and IBI waves analysis/forecast (significant wave height, wave direction, wave period). Intended use: the sea-state and ocean-forecast backbone of MAREA WEATHER in the pilot geography.

**Official terms retrieved:** https://marine.copernicus.eu/user-corner/service-commitments-and-licence (checked 2026-10-30). Licence permissions §2.1–§2.2: granted free of charge; **worldwide, non-exclusive, royalty-free, perpetual** licence to make reasonable copies for internal use/backup, to **modify, adapt, develop, create and distribute Value Added Products or Derivative Work for any purpose**, and to **redistribute/disseminate the product in original form via any media**. Attribution §2.4 requires the recommended credit and DOI citation ("Generated using E.U. Copernicus Marine Service Information; insert DOIs"). Service commitments state the service and products are **free of charge until the end of the programme, planned 30 June 2028**.

**Classification:** PERMITTED_CONDITIONAL for the licence text; **product-level right remains NOT_GRANTED** because there is no MAREA contract, no recorded DOI set per dataset used, no costed continuity plan beyond the programme end, and D-10 remains open.

| Dim | Status | Reason / condition |
| --- | --- | --- |
| R01 Commercial API access | YES | Free account plus Copernicus Marine Toolbox/API; licence permits use for any purpose. |
| R02 Commercial display | CONDITIONAL | Permitted by the licence, but the credit and DOI citation must be visible on the access page and in derived works. |
| R03 Subscription compatibility | CONDITIONAL | Nothing in the retrieved licence forbids a paid subscription surface; MAREA must not present the free service as its own paid data. |
| R04 Server-side caching | YES | Copies for internal use/backup expressly permitted; cache duration must still be bounded by the freshness rule §6. |
| R05 Offline access | CONDITIONAL | Material may be copied and derivatives distributed; offline packaging is permitted by the licence but must retain credit, DOI, product version and the not-navigation-grade limitation. No offline package is built or verified. |
| R06 Data redistribution | CONDITIONAL | Redistribution of originals via any media is permitted with the required credit and DOIs; sharing to a FLEET organisation or DISPLAY device must keep the credit visible. |
| R07 Attribution | YES | Mandatory: credit "E.U. Copernicus Marine Service Information" plus DOIs; exact strings in §11. |
| R08 Derived outputs | YES | Derivative and value-added products may be created and distributed for any purpose, with credit and DOI citation. |
| R09 Call limits | CONDITIONAL | Service-managed sessions; no published per-user call quota in the retrieved terms. MAREA must still implement its own budget and back-off. |
| R10 Variable scope | CONDITIONAL | Only the products actually subscribed and version-pinned; IBI physics and IBI waves variables are the intended set. A variable not in the subscribed product is NOT_AVAILABLE. |
| R11 Retention | CONDITIONAL | The licence does not fix a retention period; MAREA's own retention must satisfy the product's history rules and any later agreement. |
| R12 Geography | CONDITIONAL | IBI coverage is the regional seas domain, not global; outside it the product must show OUT_OF_COVERAGE. |
| R13 Naming / branding | CONDITIONAL | Provider must be named accurately and credited; no Mercator Ocean, E.U. or Copernicus endorsement may be implied, and marks require their own permission. |
| R14 Modification / aggregation | YES | Modify/adapt and create derivative works expressly permitted. Re-gridding and route sampling are therefore permitted with credit retained. |
| R15 Cost and customer terms | CONDITIONAL | Free of charge until the planned programme end (30 June 2028) per the retrieved commitments; no continuity contract exists, so a paid-service dependency on this route is a continuity risk that must be disclosed. |

**Blockers:** D-10, D-07, P-08. **What is still missing:** per-dataset DOI list, product version pinning, a continuity plan after the programme end, and a written record that MAREA's commercial use of each subscribed product is intended.

### 3.2 EMODnet (bathymetry and contextual marine data)

**Products of interest:** EMODnet Bathymetry DTM/WMS/WCS for contextual depth shading and coastal context. EMODnet is a **context** provider, not a forecast provider: nothing from EMODnet is presented as a forecast, a tide or a navigation-grade chart.

**Official terms retrieved:** https://emodnet.ec.europa.eu/en/terms-use-emodnet-online-services-data-and-data-products (checked 2026-10-30). Unless indicated otherwise, EMODnet-created data products are owned by the EU and **licensed CC BY 4.0**; prescribed acknowledgement: "This data product was created by EMODnet (https://emodnet.ec.europa.eu/en/), and is owned by the EU and licensed under the Creative Commons Attribution 4.0 International (CC BY 4.0) license." Individual originator datasets may carry their own restrictions in metadata. CC BY 4.0 includes a warranty/liability disclaimer.

**Classification:** PERMITTED_CONDITIONAL for contextual use; **not a forecast, tide or chart right**, and product dataRights stays NOT_GRANTED until the per-dataset metadata check is recorded.

| Dim | Status | Reason / condition |
| --- | --- | --- |
| R01 Commercial API access | YES | Open WMS/WCS/DTM download; CC BY 4.0 permits commercial use. |
| R02 Commercial display | CONDITIONAL | CC BY 4.0 permits display with attribution; per-originator metadata must be checked for each dataset shown. |
| R03 Subscription compatibility | CONDITIONAL | No licence term found that forbids a paid surface; the dataset must not be described as official or navigation-grade. |
| R04 Server-side caching | YES | CC BY 4.0 permits reproduction and sharing; attribution and dataset version must be retained. |
| R05 Offline access | YES | CC BY 4.0 permits offline storage with attribution; however the product must still label it contextual, never a nautical chart. |
| R06 Data redistribution | YES | CC BY 4.0 permits redistribution with attribution; originator restrictions must be honoured where present. |
| R07 Attribution | YES | Mandatory: the prescribed EMODnet acknowledgement plus originator citation where the metadata names one. |
| R08 Derived outputs | CONDITIONAL | Derivatives are allowed under CC BY 4.0 with attribution; a derived product may not imply EMODnet/EU endorsement. |
| R09 Call limits | CONDITIONAL | No published limit on the retrieved terms; the service is best-effort with no SLA. |
| R10 Variable scope | CONDITIONAL | Bathymetry/depth context only. Not a tide, current or forecast source. |
| R11 Retention | YES | CC BY 4.0 has no expiry; the dataset version and attribution must be retained. |
| R12 Geography | CONDITIONAL | European seas coverage; outside it the layer is OUT_OF_COVERAGE. |
| R13 Naming / branding | CONDITIONAL | Name EMODnet accurately; never imply EU/EMODnet endorsement or navigation-grade status. |
| R14 Modification / aggregation | YES | CC BY 4.0 permits adaptation with attribution and a modification indication. |
| R15 Cost and customer terms | YES | No fee; no SLA; the CC BY 4.0 warranty disclaimer must be reflected in MAREA's limitations. |

**Blockers:** D-10, P-08. **Missing:** a recorded per-dataset metadata/originator check for every EMODnet layer actually displayed; removal of any implication of navigation use (D-08 family rule).

### 3.3 Open-Meteo (OpenMeteo GmbH)

**Products of interest:** free forecast, marine and wind APIs used for prototyping; the intended production route is a paid plan (customer-api.open-meteo.com with an API key).

**Official terms retrieved:** https://open-meteo.com/en/terms and https://open-meteo.com/en/pricing (checked 2026-10-30).
- Free API: **non-commercial use only**, defined by Creative Commons guidance; examples of commercial use expressly include "websites or apps that have subscriptions or display advertisements" and "commercial products". Free tier limits: fewer than 10,000 API calls/day, 5,000/hour, 600/minute. Data under **CC BY 4.0**; server code **AGPLv3**; no uptime guarantee.
- Paid API subscription grants a **commercial use licence** and an API key for the dedicated customer endpoint at customer-api.open-meteo.com; plan budgets: Standard 1M calls/month, Professional 5M, Enterprise 50M+; a **99.9% uptime target** is stated on the pricing page. The retrieved pricing page did not expose plan amounts in its retrievable text, so the plan price is UNRESOLVED in this annex and no figure is recorded.
- Historical, climate, ensemble and satellite-radiation APIs require the Professional plan or higher.

**Classification:** free tier = **NOT_PERMITTED_FOR_PAID_SERVICE** (recorded exactly as required: a free API with a non-commercial restriction **is not permitted for a paid MAREA service**). Paid plan route = PERMITTED_CONDITIONAL once a plan is purchased and the current terms are archived; product dataRights stays NOT_GRANTED.

| Dim | Status | Reason / condition |
| --- | --- | --- |
| R01 Commercial API access | CONDITIONAL | Only via a paid plan; the free tier is expressly non-commercial. |
| R02 Commercial display | CONDITIONAL | Permitted under the paid commercial-use licence, with CC BY 4.0 attribution for the data. |
| R03 Subscription compatibility | CONDITIONAL | A paid consumer subscription is commercial use; it therefore requires the paid plan, never the free tier. |
| R04 Server-side caching | CONDITIONAL | CC BY 4.0 permits reproduction; MAREA must still honour the freshness rules and must not mirror the service as a substitute API. |
| R05 Offline access | CONDITIONAL | CC BY 4.0 permits storage and distribution with attribution; offline packaging is permitted by the data licence but must be described as MAREA-cached, with source and age, and is not verified. |
| R06 Data redistribution | CONDITIONAL | CC BY 4.0 permits redistribution with attribution; supplying data to a third-party organisation must not be presented as resale of Open-Meteo's service. |
| R07 Attribution | YES | CC BY 4.0 attribution required, indicating modifications; Open-Meteo's own FAQ confirms attribution is required. |
| R08 Derived outputs | CONDITIONAL | CC BY 4.0 permits adaptation with attribution; the paid licence governs the service use. Derived comparisons and windows must name the underlying model. |
| R09 Call limits | CONDITIONAL | Paid plans: unlimited per-minute/hourly/daily, monthly budget 1M/5M/50M+; email alerts at 80/90/100%; no hard cut-off enforced while the usage dashboard is in development. MAREA must implement its own budget. |
| R10 Variable scope | CONDITIONAL | Covered only for the endpoints included in the purchased plan; historical/climate/ensemble need Professional or higher. |
| R11 Retention | CONDITIONAL | The CC BY 4.0 data licence has no expiry; retention must still respect freshness presentation and the purchased plan's service terms. |
| R12 Geography | CONDITIONAL | Global model coverage, but resolution and model selection vary by coordinate; declared geographic scope and resolution must be shown per source. |
| R13 Naming / branding | CONDITIONAL | Must name Open-Meteo and the upstream model; no endorsement implied; paid-plan customer terms must be quoted accurately. |
| R14 Modification / aggregation | CONDITIONAL | CC BY 4.0 permits modification with an indication; aggregation into a multi-model comparison must not fabricate a consensus (§7). |
| R15 Cost and customer terms | CONDITIONAL | Paid plan price amounts were not retrievable on 2026-10-30 (UNRESOLVED); the 99.9% uptime **target** is a provider target, not an SLA MAREA may quote to customers. |

**Blockers:** D-04, D-10, P-08, X-05. **Missing:** purchased plan, archived terms at purchase date, per-plan price evidence, and a written decision that the paid route (or a different licensed provider) is the production route.

### 3.4 MeteoGalicia (Xunta de Galicia)

**Products of interest:** regional WRF forecast fields and the tide RSS feed, intended as the Galicia-specific high-resolution contribution.

**Official terms retrieved:** the official legal-notice URL https://www.meteogalicia.gal/aviso-legal returned **HTTP 404** on 2026-10-30; the site root returned only a cookie notice shell. No retrievable statement of reuse, commercial display or redistribution rights was obtained.

**Classification:** **UNRESOLVED** — the default is no use. This matches MC-02 D-07 ("MeteoGalicia legal notice was unreachable during the audit"). No permission may be inferred from the fact that the endpoints are open, and no third-party summary may be substituted for the official notice.

| Dim | Status | Reason / condition |
| --- | --- | --- |
| R01 Commercial API access | UNRESOLVED | No retrievable terms; open endpoints are not a licence. |
| R02 Commercial display | UNRESOLVED | As above. |
| R03 Subscription compatibility | UNRESOLVED | As above. |
| R04 Server-side caching | UNRESOLVED | As above; caching would additionally need a freshness and attribution rule. |
| R05 Offline access | UNRESOLVED | No right established. |
| R06 Data redistribution | UNRESOLVED | No right established; regional public-sector data is not automatically redistributable. |
| R07 Attribution | UNRESOLVED | No official attribution string could be retrieved; a guessed string would be wrong. |
| R08 Derived outputs | UNRESOLVED | As above. |
| R09 Call limits | UNRESOLVED | No published limit located; the earlier audit recorded a catalogue HTTP 502. |
| R10 Variable scope | UNRESOLVED | WRF fields and tide RSS are the intended set, but no scope right exists. |
| R11 Retention | UNRESOLVED | As above. |
| R12 Geography | CONDITIONAL | Intended use is Galicia only; a Galicia-only display is the only defensible scope if terms arrive. |
| R13 Naming / branding | UNRESOLVED | Provider naming and Xunta marks require written rules. |
| R14 Modification / aggregation | UNRESOLVED | As above. |
| R15 Cost and customer terms | UNRESOLVED | No fee, SLA or contract term retrievable. |

**Blockers:** D-07, D-10, P-08. **Missing:** a reachable, archived official legal notice; a written reuse/commercial authorisation from the Xunta; a definite attribution string.

### 3.5 AEMET (Agencia Estatal de Meteorología)

**Products of interest:** AEMET OpenData observation and climatology datasets, and — separately — AEMET HARMONIE-AROME numerical weather prediction output. These are two different rights questions and must never be merged.

**Official terms retrieved:** https://www.aemet.es/es/nota_legal (checked 2026-10-30) states that the general conditions allow **reuse of the documents subject to them for commercial and non-commercial purposes**, with a free, non-exclusive assignment of the corresponding intellectual-property rights, under Spanish reuse law (Ley 18/2015 amending Ley 37/2007, and Real Decreto 1495/2011). The Nota Legal also carries exclusions and integrity/attribution conditions. Separately, MC-02 D-07 records that AEMET states that **numerical model outputs are not open data** and must be requested through AEMET channels (AEMET FAQ item 4.2).

**Classification:** OpenData observations/climatology = PERMITTED_CONDITIONAL (attribution, no distortion, update date). NWP/HARMONIE = **LEGAL_REVIEW_REQUIRED** and, absent a signed data-supply agreement, **not available to MAREA**.

| Dim | Status | Reason / condition |
| --- | --- | --- |
| R01 Commercial API access | CONDITIONAL | OpenData API with key and reuse authorisation for covered datasets; NWP requires a separate agreement. |
| R02 Commercial display | CONDITIONAL | Reuse authorisation covers commercial reuse of covered documents; NWP is excluded absent an agreement. |
| R03 Subscription compatibility | CONDITIONAL | Not excluded for covered datasets, but the reuse conditions and attribution must be met and the source never presented as an AEMET-endorsed product. |
| R04 Server-side caching | CONDITIONAL | Reuse permits reproduction of covered documents; NWP caching would require the agreement. |
| R05 Offline access | CONDITIONAL | Covered datasets may be reproduced; NWP has no offline right. |
| R06 Data redistribution | CONDITIONAL | Reuse authorisation permits distribution of covered documents with conditions; NWP redistribution is prohibited absent agreement. |
| R07 Attribution | YES | Credit as specified by AEMET ("© AEMET" / "Información elaborada por la Agencia Estatal de Meteorología") with update date; exact string required on the surface. |
| R08 Derived outputs | CONDITIONAL | Reuse with non-distortion and attribution; NWP-derived outputs are unavailable absent agreement. |
| R09 Call limits | CONDITIONAL | Per-OpenData limits; MAREA must implement its own budget. |
| R10 Variable scope | CONDITIONAL | Only datasets actually published as open data; NWP variables are out of scope until an agreement exists. |
| R11 Retention | CONDITIONAL | No period fixed in the retrieved notice; MAREA retention must remain within the reuse conditions. |
| R12 Geography | CONDITIONAL | Spain-wide open datasets; NWP would need explicit territorial scope. |
| R13 Naming / branding | CONDITIONAL | Name AEMET accurately; no sponsorship or endorsement implied; no AEMET mark use without permission. |
| R14 Modification / aggregation | CONDITIONAL | Reuse permits transformation while preserving integrity and attribution; NWP modification is out of scope. |
| R15 Cost and customer terms | CONDITIONAL | OpenData reuse is free; NWP would be a negotiated data-supply agreement with unstated cost. |

**Blockers:** D-07, D-10, P-08. **Missing:** a written AEMET NWP data-supply agreement (or permanent exclusion of NWP), and the exact attribution wording captured from AEMET for the specific datasets used.

### 3.6 Puertos del Estado (with Intecmar and IH Portugal)

**Products of interest:** HF-radar surface currents (THREDDS/OPeNDAP/WCS) and PORTUS/Portuscopia forecast products for Spanish ports and the Galicia coast.

**Official terms retrieved:** the legal-notice pages timed out on 2026-10-30 (two attempts, two URL variants) and returned no retrievable text. MC-02 D-07 records that Puertos del Estado **warns against third-party transfer without authorization**.

**Classification:** **UNRESOLVED**; the recorded warning against unauthorized third-party transfer means the default is no use, and no permission may be inferred from open THREDDS endpoints.

| Dim | Status | Reason / condition |
| --- | --- | --- |
| R01 Commercial API access | UNRESOLVED | No retrievable terms; open endpoints are not an authorisation. |
| R02 Commercial display | UNRESOLVED | As above. |
| R03 Subscription compatibility | UNRESOLVED | As above. |
| R04 Server-side caching | UNRESOLVED | As above. |
| R05 Offline access | UNRESOLVED | As above. |
| R06 Data redistribution | UNRESOLVED | Explicit recorded concern about third-party transfer without authorization. |
| R07 Attribution | UNRESOLVED | Required credit string for Puertos/Intecmar/IH not retrievable. |
| R08 Derived outputs | UNRESOLVED | As above. |
| R09 Call limits | UNRESOLVED | Recurrent downloads documented in the earlier audit; no published limit retrieved. |
| R10 Variable scope | UNRESOLVED | HF-radar currents and PORTUS forecast are the intended set; no scope right exists. |
| R11 Retention | UNRESOLVED | As above. |
| R12 Geography | CONDITIONAL | Spanish coast/ports only; any display must be bounded to the covered area. |
| R13 Naming / branding | UNRESOLVED | Provider naming rules not retrievable. |
| R14 Modification / aggregation | UNRESOLVED | As above. |
| R15 Cost and customer terms | UNRESOLVED | No fee, SLA or contract term retrievable. |

**Blockers:** D-07, D-10, P-08. **Missing:** archived official terms; written authorisation covering commercial display; explicit confirmation on redistribution to a FLEET organisation or DISPLAY device.

### 3.7 OpenWeather Ltd

**Products of interest:** current/forecast API and **Weather Maps 2.0 tile layers**. These are two separate commercial products; an ordinary API key does not cover the tile endpoints (MC-02 D-05).

**Official terms retrieved:** https://openweathermap.org/price (checked 2026-10-30) publishes self-service plans **Startup 30 GBP/month, Developer 140 GBP/month, Professional 370 GBP/month, Expert 1200 GBP/month**, with the plan tax basis not stated on the retrieved page, and a pay-per-call option at **0.0012 GBP per call** after the first 1,000 calls/day. https://openweathermap.org/terms returned **HTTP 404** on the check date, so the sublicensing/resale position could not be verified from the official page; the repository's prior audit row MD-20 records "no sublicense or resale" as LEGAL_REVIEW_REQUIRED.

**Classification:** price = VERIFIED_EXTERNAL; terms = **UNRESOLVED** for sublicensing/resale; the map-tile SKU remains **BLOCKED** under D-05 until the correct tier is purchased.

| Dim | Status | Reason / condition |
| --- | --- | --- |
| R01 Commercial API access | CONDITIONAL | Paid self-service plans published; purchase required. |
| R02 Commercial display | CONDITIONAL | Display under a paid plan; the tax basis and plan scope must be confirmed on the invoice. |
| R03 Subscription compatibility | CONDITIONAL | Paid plan required for a commercial subscription surface. |
| R04 Server-side caching | CONDITIONAL | Plan-dependent; the retrieved price page does not state caching terms, so LEGAL_REVIEW_REQUIRED. |
| R05 Offline access | UNRESOLVED | No offline right established. |
| R06 Data redistribution | UNRESOLVED | Terms page unreachable; prior audit records no sublicense/resale. |
| R07 Attribution | CONDITIONAL | "Weather data © OpenWeatherMap" style credit required under the paid plan per the prior audit; exact string must be re-verified. |
| R08 Derived outputs | UNRESOLVED | No verified derived-output right. |
| R09 Call limits | YES | Published per-plan call limits (600 to 100,000 calls/minute) and monthly call budgets. |
| R10 Variable scope | CONDITIONAL | API variables under the purchased plan; **Weather Maps 2.0 tiles are a separate paid SKU** and are not covered by an ordinary key. |
| R11 Retention | UNRESOLVED | Not stated on the retrievable pages. |
| R12 Geography | CONDITIONAL | Global API coverage; tile coverage and plan differ. |
| R13 Naming / branding | CONDITIONAL | Name OpenWeather accurately; no endorsement implied; no mark use without permission. |
| R14 Modification / aggregation | UNRESOLVED | No verified right to modify or aggregate for resale. |
| R15 Cost and customer terms | CONDITIONAL | Prices published in GBP; **tax basis not stated**; per-plan availability figures (95%–99.9%) are provider claims, not MAREA promises. |

**Blockers:** D-05, D-10, P-08, X-05. **Missing:** purchasable correct tier for tiles; archived terms at purchase date; written confirmation on caching and derived outputs.

### 3.8 Tide and current providers

Tides and currents are the highest-risk variables because a tide must be attributable to a station, a datum and a prediction basis, and because harmonic prediction from a constituent set is a **derived** output with its own rights question.

| Provider route | Variable | Status | Evidence / reason |
| --- | --- | --- | --- |
| MeteoGalicia tide RSS | Tide height (Galicia) | UNRESOLVED | Same unreachable legal notice as §3.4; no tide-display or commercial right established. |
| Puertos del Estado tide tables / PORTUS | Tide height, port-level forecast | UNRESOLVED | Same terms gap as §3.6; port tide tables are an official publication whose reuse is not established. |
| IHM (Instituto Hidrográfico de la Marina) tide tables | Official tide predictions (Spain) | UNRESOLVED | No official open-reuse term retrieved in this milestone; official tide tables are not automatically redistributable, and must not be presented as an official tide table without a written right. |
| IH Portugal tide/current publications | Tide height, currents (Portugal) | UNRESOLVED | No terms retrieved; pilot geography includes Atlantic Portugal, so this row must close before any Portuguese tide is shown. |
| HF radar currents (Puertos/Intecmar/IH) | Surface current speed/direction | UNRESOLVED | §3.6. |
| Commercial tide/current API candidates | Tide height, currents | OPEN | Candidate providers exist but no official terms, price or trial has been evaluated; this annex records no figure and no provider as approved. Any evaluation must capture the official URL and check date before use. |
| MAREA-computed harmonic prediction | Tide height (derived) | BLOCKED | Requires a licensed harmonic-constants dataset and a written right to create derived predictions; without it the product must not compute a tide. |

**Rule:** the product must never show a tide without all of: station or model identifier, datum, prediction basis, source, valid time and age. If any of these is missing, the tide is NOT_AVAILABLE, never interpolated from an unrelated source.

---

## 4. Per-variable rights summary

The dossier's capability register and this table must agree. "Best candidate route" is a candidate, not a granted right.

| Variable (product label) | Canonical unit | Data type | Best candidate route | Rights status | Blocking id |
| --- | --- | --- | --- | --- | --- |
| Wind speed (sustained) | kn, m/s | FORECAST | Copernicus IBI / Open-Meteo (paid) / MeteoGalicia / AEMET NWP | NOT_GRANTED (Copernicus and Open-Meteo paid are PERMITTED_CONDITIONAL; MeteoGalicia and NWP are UNRESOLVED) | D-04, D-07, D-10 |
| Wind direction (true) | degrees | FORECAST | same as wind speed | NOT_GRANTED | D-04, D-07, D-10 |
| Gust | kn, m/s | FORECAST | Open-Meteo (paid) / MeteoGalicia / AEMET NWP | NOT_GRANTED | D-04, D-07 |
| Wave height (significant) | m | FORECAST | Copernicus IBI waves / Open-Meteo marine (paid) | NOT_GRANTED (upstream PERMITTED_CONDITIONAL) | D-04, D-10 |
| Wave direction | degrees | FORECAST | Copernicus IBI waves / Open-Meteo marine | NOT_GRANTED | D-04, D-10 |
| Wave period | s | FORECAST | Copernicus IBI waves / Open-Meteo marine | NOT_GRANTED | D-04, D-10 |
| Swell height/direction/period | m, degrees, s | FORECAST | only where the licensed product documents a swell partition | UNRESOLVED | D-04, D-07 |
| Current speed/direction (surface) | kn, degrees | FORECAST / OBSERVATION | Copernicus IBI / HF radar (Puertos) | NOT_GRANTED; HF radar UNRESOLVED | D-07, D-10 |
| Tide height | m | FORECAST (predicted) | MeteoGalicia RSS / Puertos / IHM / IH Portugal | UNRESOLVED | D-07, D-10 |
| Sea surface temperature | °C | FORECAST / OBSERVATION | Copernicus IBI / Open-Meteo marine | NOT_GRANTED (upstream PERMITTED_CONDITIONAL) | D-04, D-10 |
| Air temperature | °C | FORECAST | Open-Meteo (paid) / AEMET OpenData / MeteoGalicia | NOT_GRANTED | D-04, D-07 |
| Atmospheric pressure (MSL) | hPa | FORECAST / OBSERVATION | Open-Meteo (paid) / AEMET OpenData | NOT_GRANTED | D-04, D-07 |
| Cloud cover | % | FORECAST | Open-Meteo (paid) / AEMET | NOT_GRANTED | D-04, D-07 |
| Precipitation | mm/h | FORECAST | Open-Meteo (paid) / AEMET | NOT_GRANTED | D-04, D-07 |
| Visibility | m, NM | FORECAST / OBSERVATION | only where a licensed product publishes it | UNRESOLVED | D-10 |
| Weather-map raster/vector layers | raster/vector | DERIVED (rendered) | OpenWeather Weather Maps 2.0 | BLOCKED | D-05 |
| Contextual bathymetry / coastal context | m | HISTORICAL / DERIVED context | EMODnet | PERMITTED_CONDITIONAL (contextual, never a chart) | D-08, D-10 |
| Forecast provenance record | metadata | DERIVED | internal | MAREA-owned, not a provider right | — |

**Reading of this table:** no row is GRANTED. The two PERMITTED_CONDITIONAL routes still sit under D-04/D-10 because no plan is purchased, no DOI set is recorded and no contract exists.

---

## 5. Forecast timestamp semantics

The product **must never conflate** these six timestamps. They are the core of the "never present a forecast as an observation" rule and of the "never present a stale forecast as current" rule.

| Field | Definition | Source of truth | Customer display |
| --- | --- | --- | --- |
| modelRunTime | The nominal run/cycle of the model that produced the forecast (for example the cycle start). | Provider metadata | Shown as "model run" |
| validTime | The instant or interval the forecast value describes. | Provider metadata | Shown as "valid for" |
| receiptTime | When MAREA's server actually received the response. | MAREA server clock | Shown as "received" |
| displayTime | When the value was rendered to the user. | Client clock | Never used to imply validity |
| observationTime | The instant a measured value was taken. | Provider/station metadata | Shown as "observed" |
| publicationTime | When a provider published an alert or bulletin. | Provider metadata | Only when a bulletin is licensed |

Rules: validTime is never substituted by receiptTime; a forecast whose modelRunTime is old relative to its validTime is flagged; receiptTime alone never proves freshness of the underlying model; an observation is never labelled as a forecast and a forecast is never labelled as an observation; clock skew between server and client is displayed, never silently corrected into a false "now".

**Data-type labels** (§7.4 vocabulary) that must accompany every displayed value: FORECAST, OBSERVATION, HISTORICAL, DERIVED, USER_ENTERED, UNKNOWN. A value whose origin cannot be established is UNKNOWN and must not be presented as a forecast.

**Per-variable display metadata** — the mandatory block accompanying any variable shown to a customer: source (provider + product + model), units, validTime, dataType, age (now minus validTime or now minus observationTime, labelled which), method (model/ensemble/observation/interpolation), license (classification + attribution string), limitations (for example "model grid of the declared resolution, not a local measurement", "not navigation-grade", "prediction basis: harmonic constituents").

---

## 6. Freshness, staleness and expiry rules

Staleness is a **product rule derived from the provider's declared cycle**, never a claim about accuracy.

| State | Rule | Display behaviour |
| --- | --- | --- |
| CURRENT | age is within the declared nominal update interval of that model, and validTime is inside the declared horizon. | Normal display with source, run time, valid time, receipt time and age. |
| AGING | age exceeds the nominal update interval but is not more than twice it. | Value stays visible, visibly marked AGING, with the age. |
| STALE | age exceeds twice the nominal update interval. | Marked STALE; never described as current; no reassuring styling. |
| EXPIRED | validTime is in the past, or the value is beyond the provider's declared horizon. | Not shown as a current value; shown as expired with the last known value and its age. |
| UNAVAILABLE | No value, provider error, licence lost, or entitlement expired. | Explicit UNAVAILABLE with the reason and attribution retained; never a frozen value presented as current. |
| OUT_OF_COVERAGE | Coordinate outside the source's declared geographic coverage. | Explicit OUT_OF_COVERAGE; no neighbour substitution without saying so. |

Rules: the nominal update interval and horizon are **declared per source and per variable** in the source registry; they are configuration, not a provider SLA. The interface must state the age of every value; a value with no age is not rendered as a forecast. When the entitlement expires, the surface shows UNAVAILABLE with the reason "entitlement expired", retains attribution and offers renewal — it never freezes the last forecast as if it were live.

---

## 7. Multi-model comparison method — transparent comparison, never a fictional consensus

Multi-model comparison is the principal **WEATHER Pro** outcome, and it is governed by four rules.

1. **Per-model attribution.** Each model's value is displayed with its own provider, model name, modelRunTime, validTime, receiptTime, resolution, horizon and licence. Models are never merged into an unlabelled series.
2. **No fictional consensus.** MAREA must not compute, display or market an "average forecast", a "consensus", a "best model" or a confidence percentage as if it were a forecast. It shows the **spread** between models explicitly labelled as a comparison, with the individual values that produced it. A mean may be shown only if labelled "arithmetic mean of the displayed models, not a forecast", and even then it never replaces the individual values.
3. **No ranking claim.** MAREA does not claim which model is more accurate. A "which model has been closest recently" view may exist only where a licensed historical archive exists, and must be limited to the displayed period with its method stated.
4. **No dataset mixing without a right.** Comparing models requires display rights for each model. If one model's right is not granted, the comparison shows the models that are granted and states explicitly which model is unavailable and why — it never fills the gap with a different source under the same label.

Where a provider publishes an ensemble or dispersion product, the product may show that dispersion **as the provider published it**, with its declared meaning and the provider's own limitations. Where no such product exists, the uncertainty field reads NOT_PROVIDED — no precision or probability figure is invented.

---

## 8. Missing-data, partial-coverage and unknown-source behaviour

1. **Never zero-fill.** A missing wind value is not 0 kn; a missing wave height is not 0 m; a missing current is not slack water. Missing values render as NO_DATA.
2. **No silent interpolation across a gap.** If a value is interpolated for display continuity, the method must be declared in the per-variable metadata; otherwise no interpolation.
3. **Partial variable sets are shown partially.** If a source provides wind but not gusts, gusts read NOT_AVAILABLE_FROM_SOURCE, not "no gusts".
4. **Coverage boundaries are explicit.** A coordinate outside a source's declared box yields OUT_OF_COVERAGE; the nearest valid grid point is never substituted without a visible "approximate, nearest valid point" statement.
5. **Unknown origin is UNKNOWN.** A value whose source, run time or licence cannot be established is displayed as UNKNOWN (or withheld) and never presented as a forecast.
6. **Provider outage is visible.** An outage shows an honest unavailable state with the last successful receipt time, the provider named, attribution retained, and no silent degradation into a different source.
7. **Rate-limit exhaustion is visible.** When MAREA's own call budget is exhausted, the surface shows a budget state and serves only cached values with their age, never a fabricated fresh value.

---

## 9. Legally authorized caching and offline presentation

Caching and offline are **separate rights** and are granted separately per provider. The product's caching design is bounded by these rules.

| Use | Allowed only when | Implementation rule |
| --- | --- | --- |
| Short-lived server-side response cache | The provider's terms permit reproduction/caching (Copernicus, EMODnet, Open-Meteo paid under CC BY 4.0) | Bounded TTL tied to the freshness rule; per-user authorisation checked before serving; attribution preserved in every response. |
| Derived server-side store (grid subset for the pilot area) | The provider permits derivative works and storage (Copernicus, EMODnet, Open-Meteo paid) | Store product version, model run, DOIs/credit and the derivation method; purge on licence loss. |
| Client-side session cache | The provider's terms permit browser/device storage | Never becomes a substitute offline product; cleared on entitlement expiry; labelled with age. |
| Offline package / pre-fetched area | Only where a written right permits offline storage **and** the product labels the package as MAREA-cached with source and age | Not built; WEATHER_OFFLINE_RIGHTS = NOT_GRANTED. Where no right exists, the offline state is UNAVAILABLE. |
| Open-Meteo free-tier cache | **Never for a paid service** | The free API is non-commercial only: NOT_PERMITTED_FOR_PAID_SERVICE. |
| Re-serving a third-party tile endpoint | Only with a tile-service licence | D-05 blocked; unlicensed tiles are removed, not proxied. |

The product rule: **no offline presentation is offered where the right does not exist.** An offline surface shows the last received timestamp and an explicit "OFFLINE — value not current" state; it never presents a frozen forecast as a live one.

---

## 10. MAREA account, entitlement ledger and NAV/WEATHER sharing

- **One account, one ledger.** Entitlement is held on the MAREA account, not on a device and not on a data provider's subscription. There is no second WEATHER entitlement inside NAV.
- **WEATHER standalone.** WEATHER Standard and WEATHER Pro are purchasable standalone (hypotheses, not offers). No purchase is required for a NAV licence.
- **NAV Pro inclusion.** NAV Pro may include WEATHER Standard-equivalent **read** access only where the provider rights allow; the status is CONDITIONAL, and the entitlement is recorded in the same ledger, marked as included rather than purchased.
- **No double billing.** If the customer already holds a WEATHER entitlement, adding NAV Pro must not charge for WEATHER again; if NAV Pro already includes WEATHER Standard-equivalent access, buying WEATHER Standard must not duplicate the charge. Upgrade Standard to Pro applies a prorated credit.
- **Cancelling NAV** never deletes user-owned WEATHER records (saved locations, preferences); read-only export is offered for a defined window (hypothesis 30 days, legal review). Cancelling WEATHER ends forecast access; it does not delete the account's user-entered data beyond the retention policy.
- **Provider-licence loss** produces an honest UNAVAILABLE state with attribution retained and a stated reason. It never silently swaps in an unlicensed or different source.
- **Expired entitlement** never renders a fabricated or frozen forecast as current.
- **Billing/entitlement services are not implemented in MC-07** (WEATHER_SUBSCRIPTION_SERVICE = NOT_FOUND, WEATHER_ENTITLEMENT_LEDGER = NOT_FOUND). This section defines the contract to be built, not behaviour that exists.

---

## 11. Attribution, provider naming and branding rules

| Provider | Required credit (verbatim where the provider prescribes it) | Rules |
| --- | --- | --- |
| Copernicus Marine | "Generated using E.U. Copernicus Marine Service Information; insert DOIs" (value-added/derived); "E.U. Copernicus Marine Service Information; insert DOIs" (redistribution) | Credit clearly visible on the home page or at least on the page giving access to the products; DOI links for each product used. |
| EMODnet | "This data product was created by EMODnet (https://emodnet.ec.europa.eu/en/), and is owned by the EU and licensed under the Creative Commons Attribution 4.0 International (CC BY 4.0) license." plus originator citation from metadata | Never imply EU/EMODnet endorsement or navigation-grade status. |
| Open-Meteo | CC BY 4.0 attribution, indicating modifications | Name Open-Meteo and the upstream model; no endorsement implied. |
| AEMET | AEMET credit per its reuse conditions, with update date ("© AEMET" / "Información elaborada por la Agencia Estatal de Meteorología") | No distortion; no sponsorship implied; no NWP unless agreed. |
| MeteoGalicia | UNRESOLVED | No guessed credit string; no display until a written string exists. |
| Puertos del Estado / Intecmar / IH | UNRESOLVED | No display until a written credit string exists. |
| OpenWeather | "Weather data © OpenWeatherMap" style credit under the paid plan (re-verify the exact wording) | No endorsement implied; tiles require the tile SKU. |

Branding rules: provider marks and logos are **not** used without written permission; the product never implies that a provider sponsors, endorses, certifies or partners with MAREA; provider names are written accurately and never abbreviated into a MAREA sub-brand; a provider's "free" or "open" description is never transferred to MAREA's paid product.

---

## 12. Classification counts and the honest data-rights verdict

| Classification | Providers/rows | Consequence |
| --- | ---: | --- |
| PERMITTED_CONDITIONAL | 3 (Copernicus Marine, EMODnet, AEMET OpenData) plus the Open-Meteo paid plan once purchased | May support the intended display **only** with conditions met, credit shown and classification recorded; not a launch approval. |
| LEGAL_REVIEW_REQUIRED | 3 (AEMET NWP, OpenWeather terms/sub-licensing, OpenWeather caching/derived) | Counsel decision required; no use until resolved. |
| NOT_PERMITTED_FOR_PAID_SERVICE | 1 (Open-Meteo free tier) | Prohibited inside any paid MAREA surface. |
| UNRESOLVED | MeteoGalicia, Puertos del Estado, all tide/current routes except the blocked derived route, OpenWeather offline/redistribution | Default **no use**; the feature shows unavailable. |
| BLOCKED | MAREA-computed harmonic tide (derived), map tile layers (D-05) | Cannot proceed until the named right exists. |

**Verdict:** WEATHER.providerRightsGranted = false; WEATHER.dataRights = NOT_GRANTED; WEATHER_OFFLINE_RIGHTS = NOT_GRANTED; WEATHER_HISTORICAL_RIGHTS = NOT_GRANTED; WEATHER_TIDE_RIGHTS = UNRESOLVED. The product definition is complete; the right to operate it is not obtained. Any statement that MAREA WEATHER "has coverage", "includes official data", "guarantees accuracy" or "works offline" is prohibited until the corresponding rows above change in writing.

---

## 13. Legal review items

| Id | Item | Why it needs counsel | Owner | Gate |
| --- | --- | --- | --- | --- |
| LR-01 | Copernicus Marine continuity after the planned programme end (30 June 2028) | The free-service commitment has an end date; a paid product must not depend on an unguaranteed continuation. | Product + legal | D-10 |
| LR-02 | Copernicus DOI obligation per product/variable | Missing DOIs are a licence breach, not a cosmetic omission. | Engineering + legal | D-10 |
| LR-03 | Open-Meteo paid-plan terms at purchase date | Terms may change; the archived version governs. | Legal | D-04 |
| LR-04 | Open-Meteo free-tier prohibition applied to every non-paid surface (marketing, demos, internal tools) | The non-commercial restriction applies to the whole paid-service path. | Legal + engineering | D-04 |
| LR-05 | MeteoGalicia reuse authorisation and required credit | Legal notice unreachable; no inferred permission. | Legal | D-07 |
| LR-06 | Puertos del Estado third-party transfer authorisation | Recorded warning against unauthorised transfer. | Legal | D-07 |
| LR-07 | AEMET NWP data-supply agreement | NWP is not open data. | Legal + product | D-07 |
| LR-08 | AEMET attribution wording per dataset | Wrong credit is a compliance defect. | Legal | D-07 |
| LR-09 | Tide/current provider rights, including IH Portugal | Pilot geography spans Portugal; no right retrieved. | Legal | D-07, D-10 |
| LR-10 | Harmonic-constants licence for any computed tide | A derived tide needs an explicit derived-output right. | Legal + engineering | D-10 |
| LR-11 | OpenWeather tile SKU and sub-licensing | Separate paid SKU; terms page unreachable. | Legal + finance | D-05 |
| LR-12 | Caching and retention durations per provider | Retention is a rights dimension, not a design preference. | Legal + engineering | D-10 |
| LR-13 | Multi-model comparison and "spread" presentation | Must not become a de facto accuracy claim or a redistributed model product. | Legal + product | D-10 |
| LR-14 | NAV/WEATHER single-ledger, prorated upgrade, 30-day export window | Consumer-law and billing correctness. | Legal + finance | X-05 |

---

## 14. Supplier-negotiation checklist

Use this checklist for every provider before any right is recorded as anything other than NOT_GRANTED. Each line is a question that must be answered **in writing** and archived.

1. **Identity and contracting party.** Exact legal entity, address and signatory; the terms URL archived with a dated snapshot.
2. **Access route and tier.** Which commercial tier/contract the intended volume uses; confirmation that the free/non-commercial route is excluded.
3. **Display right.** Explicit permission to display the data inside a paid consumer subscription and inside a B2B organisation surface.
4. **Subscription compatibility.** Confirmation that gating display behind a recurring subscription is permitted.
5. **Caching.** Written permission for server-side caching, with a maximum TTL and a required attribution string.
6. **Offline.** Written permission, or a written refusal, for offline/pre-fetched presentation.
7. **Redistribution.** Whether values may reach a DISPLAY device, a NAV session or a FLEET organisation, and whether that counts as redistribution.
8. **Derived outputs.** Permission for route sampling, weather windows, comparisons, spread and indices; whether derived products are jointly owned or restricted.
9. **Attribution.** Exact credit string(s), DOI obligations, logo rules and placement.
10. **Naming/branding.** Whether the provider may be named, how, and what endorsement wording is prohibited.
11. **Variable scope.** The definitive list of variables, levels, horizons and products covered, plus a change-notice procedure.
12. **Geography.** Territorial limits and any restriction on serving customers outside them.
13. **Retention.** Maximum storage period and what must be deleted on termination.
14. **Call limits.** Quotas, burst limits, overage policy and the consequence of exceeding them.
15. **Availability and SLA.** Actual commitment (not a target), credit/termination remedies, and what MAREA may state to customers.
16. **Price, currency, tax basis, billing period, renewal and termination.** Including any minimum commitment.
17. **Change of terms.** Notice period and the right to archive and rely on the version in force at purchase.
18. **Liability and disclaimers.** What the provider disclaims and what MAREA must pass through to customers.
19. **Data protection.** Whether any personal data could be processed (the coordinates of a vessel can be personal data of its owner); DPA and controller–processor position.
20. **Termination and continuity.** What happens to cached data and to customers if the provider ends the service or the contract.

---

## 15. Evidence that would change the verdict; non-assertions; document status

**The verdict changes only when all of the following exist in the repository:** a signed or accepted commercial tier for every provider actually used; an archived terms snapshot with the check date; the exact attribution strings implemented and tested; a recorded legal review of LR-01 to LR-14; a costed continuity plan for Copernicus after the programme end; and a source registry that pins product versions. Until then, providerRightsGranted stays false.

**Non-assertions.** This annex does not assert: that any provider has granted MAREA a right; that any dataset is legally cleared for commercial display; that MAREA has a contract, quote, trial or partnership with any provider named; that any forecast is accurate; that any provider endorses MAREA; that any tide or current table is official; that offline or historical features are permitted; that any price is approved.

**Document status:** DRAFT — INTERNAL ONLY — NOT PUBLISHED — PRODUCT DEFINITION COMPLETE, NOT FOR SALE — PRICES ARE HYPOTHESES, NOT APPROVED — DATA RIGHTS NOT GRANTED.
