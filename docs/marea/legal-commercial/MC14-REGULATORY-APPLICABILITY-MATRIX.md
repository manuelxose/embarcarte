# MC-14 — Regulatory applicability matrix

| Field | Value |
|---|---|
| Deliverable | D03 `MC14-REGULATORY-APPLICABILITY-MATRIX.md` |
| Milestone | MC-14/36 |
| Date | 2026-11-02 |
| Owner | Programme Lead |
| Machine data | `data/regulatory-applicability.json` |
| Scope | 9 families × 14 instruments = 126 assessments; 6 bundles × 14 = 84 bundle assessments |
| Status | INTERNAL_ASSESSMENT — applicability is not conformity |


## 1. Reading the matrix

`A` = APPLICABLE, `C` = CONDITIONALLY_APPLICABLE, `N` =
NOT_APPLICABLE_WITH_REASON, `U` = UNDETERMINED. Every `N` carries a legal
rationale in the machine data; every `C` carries the condition that changes
applicability. The matrix distinguishes recreational marine electronics from
regulated SOLAS/shipborne equipment and never treats IEC/ISO/NMEA references as
certifications. No CE, wheelmark, NMEA or marine approval is claimed.

| Family | EMC | RED | LVD | GPSR | CRA | ROHS | WEEE | BATTERIES | RCD | MED | PLD | CONSUMER_COMMERCIAL | RADIO_SPECTRUM | DATA_PROTECTION |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| NAV | C | N | N | C | A | N | N | N | N | N | A | A | N | A |
| HUB | A | C | C | A | A | A | A | C | N | N | A | A | C | A |
| AIS | N | A | C | A | C | A | A | N | N | N | A | A | A | C |
| PILOT | C | C | C | A | A | A | A | C | U | N | A | A | C | C |
| SENSE | A | C | C | A | C | A | A | C | N | N | A | A | C | C |
| WATCH | N | A | C | A | A | A | A | A | N | N | A | A | A | A |
| DISPLAY | A | C | C | A | A | A | A | C | U | N | A | A | C | C |
| WEATHER | N | N | N | N | C | N | N | N | N | N | A | A | N | A |
| FLEET | N | N | N | N | C | N | N | N | N | N | A | N | N | A |

Collated products: NAV A4/C2/N8/U0; HUB A8/C4/N2/U0; AIS A7/C3/N4/U0; PILOT A6/C6/N1/U1; SENSE A6/C6/N2/U0; WATCH A10/C1/N3/U0; DISPLAY A7/C5/N1/U1; WEATHER A3/C1/N10/U0; FLEET A2/C1/N11/U0.

## 2. Instrument vocabulary

- **EMC** — Electromagnetic Compatibility Directive 2014/30/EU (SRC-EU-EMC-2014-30)
- **RED** — Radio Equipment Directive 2014/53/EU (including delegated cybersecurity acts) (SRC-EU-RED-2014-53, SRC-EU-DELREG-2022-30, SRC-EU-DELREG-2026-339)
- **LVD** — Low Voltage Directive 2014/35/EU (SRC-EU-LVD-2014-35)
- **GPSR** — General Product Safety Regulation (EU) 2023/988 (SRC-EU-GPSR-2023-988)
- **CRA** — Cyber Resilience Act — Regulation (EU) 2024/2847 (SRC-EU-CRA-2024-2847)
- **ROHS** — RoHS Directive 2011/65/EU (SRC-EU-ROHS-2011-65)
- **WEEE** — WEEE Directive 2012/19/EU (SRC-EU-WEEE-2012-19)
- **BATTERIES** — Batteries Regulation (EU) 2023/1542 (SRC-EU-BATTERIES-2023-1542)
- **RCD** — Recreational Craft Directive 2013/53/EU (SRC-EU-RCD-2013-53)
- **MED** — Marine Equipment Directive 2014/90/EU (SRC-EU-MED-2014-90)
- **PLD** — Product Liability Directive (EU) 2024/2853 (SRC-EU-PLD-2024-2853)
- **CONSUMER_COMMERCIAL** — Consumer and commercial law (CRD, CSD, DCD, UCPD, Price Indication, TRLGDCU, LSSI, LCD, LGP) (SRC-EU-CRD-2011-83, SRC-EU-CSD-2019-771, SRC-EU-DCD-2019-770, SRC-EU-UCPD-2005-29, SRC-EU-PRICE-98-6, SRC-ES-TRLGDCU-RDL-1-2007, SRC-ES-LSSI-34-2002, SRC-ES-LCD-3-1991, SRC-ES-LGP-34-1988)
- **RADIO_SPECTRUM** — Radio spectrum and maritime radio rules (Ley 11/2022, ITU-R M.1371, AIS receive-only scope) (SRC-ES-LGT-11-2022, SRC-EU-RED-2014-53)
- **DATA_PROTECTION** — GDPR, LOPDGDD 3/2018 and ePrivacy/LSSI cookies (SRC-EU-GDPR-2016-679, SRC-ES-LOPDGDD-3-2018, SRC-EU-EPRIVACY-2002-58, SRC-ES-LSSI-34-2002)

## 3. Product-family detail

### NAV — MAREA NAV

Navigation software and licensed-data application, optionally bundled with hardware. Editions: NAV-ESSENTIAL, NAV-PRO.

| Instrument | Status | Rationale | Condition / evidence |
|---|---|---|---|
| EMC | CONDITIONALLY_APPLICABLE | Standalone NAV software is not apparatus placed on the market; an EMC assessment becomes necessary if NAV ships pre-installed on a HUB, DISPLAY or appliance supplied by EMBARCARTE. | NAV is supplied on or with electrical hardware placed on the market. |
| RED | NOT_APPLICABLE_WITH_REASON | NAV, as defined, performs no intentional radio transmission or reception; radio functions belong to HUB/AIS/WATCH hardware. If NAV is embedded in radio equipment, the RED applies to that equipment instead. | — |
| LVD | NOT_APPLICABLE_WITH_REASON | NAV is software/data and has no electrical equipment within the 50-1000 V AC / 75-1500 V DC scope; any bundled appliance is assessed as its own product. | — |
| GPSR | CONDITIONALLY_APPLICABLE | Software alone is not a GPSR product, but the general safety framework applies to any physical product supplied with NAV; the bundle is assessed as hardware. | NAV is sold with or pre-installed on a physical product. |
| CRA | APPLICABLE | NAV is a product with digital elements made available on the market, including subscription and cloud-connected editions; CRA essential requirements, vulnerability handling, support period and reporting apply. | CRA technical documentation, SBOM, Support-period decision, Incident-reporting runbook |
| ROHS | NOT_APPLICABLE_WITH_REASON | NAV software contains no electrical or electronic equipment unless it is supplied on hardware, in which case RoHS applies to that hardware. | — |
| WEEE | NOT_APPLICABLE_WITH_REASON | WEEE applies to electrical and electronic equipment; pure software is out of scope, and any bundled hardware is registered separately. | — |
| BATTERIES | NOT_APPLICABLE_WITH_REASON | NAV software contains no batteries; battery obligations attach to the hardware families that contain them. | — |
| RCD | NOT_APPLICABLE_WITH_REASON | NAV software is not a recreational craft or a component listed in the RCD scope; the RCD applies to the craft or covered components, not to navigation software. | — |
| MED | NOT_APPLICABLE_WITH_REASON | NAV is not shipborne marine equipment listed for MED wheelmark; no wheelmark claim is made. | — |
| PLD | APPLICABLE | The revised PLD covers software and digital products, so NAV and its update stream can fall within the liability regime even without physical hardware. | Liability assessment, Update and evidence-retention procedure |
| CONSUMER_COMMERCIAL | APPLICABLE | Consumer sales, subscriptions and claims are subject to CRD/CSD/DCD/UCPD, the Price Indication Directive and Spanish consumer and advertising law; B2B terms require a separate contract set. | Approved consumer terms, Claims evidence register |
| RADIO_SPECTRUM | NOT_APPLICABLE_WITH_REASON | NAV does not transmit or receive radio signals directly; AIS reception and radio conformity belong to the AIS/HUB hardware family. | — |
| DATA_PROTECTION | APPLICABLE | NAV processes account data, track history and location data, so GDPR/LOPDGDD transparency, lawful basis, retention and rights apply. | Privacy notice, Retention and export schedule |

### HUB — MAREA HUB

Networked marine data hub and appliance. Editions: HUB-STANDARD, HUB-PRO.

| Instrument | Status | Rationale | Condition / evidence |
|---|---|---|---|
| EMC | APPLICABLE | HUB is apparatus placed on the market with active electronics and networking; it must not cause or suffer electromagnetic disturbance beyond the essential requirements. If HUB is radio equipment, the RED carries the EMC requirement instead. | EMC test report, DoC |
| RED | CONDITIONALLY_APPLICABLE | HUB may include Wi-Fi/Bluetooth or cellular modules; intentional radio transmitters or receivers bring the product within the RED, which then carries the EMC requirement. | A radio module or antenna is integrated into the shipped HUB. |
| LVD | CONDITIONALLY_APPLICABLE | HUB is normally 12/24 V DC and outside the LVD voltage scope; a mains-powered variant within 50-1000 V AC would bring the LVD into scope. | A mains-voltage variant is placed on the market. |
| GPSR | APPLICABLE | HUB is a consumer product placed on the market; safety, traceability, warnings and incident duties apply. | Risk assessment, Traceability labels |
| CRA | APPLICABLE | HUB is a connected product with digital elements; CRA essential requirements, vulnerability handling, update support and incident reporting apply from the relevant dates. | CRA technical file, SBOM, Security update policy |
| ROHS | APPLICABLE | HUB is electrical and electronic equipment; restricted-substance compliance and DoC are required. | Material declarations, RoHS DoC |
| WEEE | APPLICABLE | HUB is EEE placed on the Spanish market; producer registration, take-back, marking and reporting apply. | Producer registration, Take-back agreement |
| BATTERIES | CONDITIONALLY_APPLICABLE | HUB may include a backup battery or be supplied with one; the Batteries Regulation applies to any battery placed on the market with the product. | A battery is included in the shipped product or packaging. |
| RCD | NOT_APPLICABLE_WITH_REASON | HUB is an electronics product, not a recreational craft or a listed RCD component; the craft's own RCD conformity is the builder's responsibility. | — |
| MED | NOT_APPLICABLE_WITH_REASON | HUB is not shipborne marine equipment placed on an EU ship and no wheelmark claim is made. | — |
| PLD | APPLICABLE | HUB is a product and its software can be defective; PLD liability covers hardware, firmware and connected-product updates. | Liability assessment, Insurance indication |
| CONSUMER_COMMERCIAL | APPLICABLE | Consumer sales of HUB are subject to CRD/CSD, the Spanish 3-year guarantee and fair-claims rules; B2B sales require separate terms. | Consumer terms, Warranty and RMA workflow |
| RADIO_SPECTRUM | CONDITIONALLY_APPLICABLE | Radio transmission by an integrated Wi-Fi/cellular module requires authorised spectrum use and radio conformity; receive-only operation remains subject to radio-equipment rules. | The shipped HUB transmits radio signals. |
| DATA_PROTECTION | APPLICABLE | HUB processes device identifiers, telemetry and potentially location data; GDPR/LOPDGDD transparency and security apply. | Privacy notice, Security measures description |

### AIS — MAREA AIS

Receive-only AIS receiver and connected edition. Editions: AIS-RECEIVER, AIS-CONNECTED.

| Instrument | Status | Rationale | Condition / evidence |
|---|---|---|---|
| EMC | NOT_APPLICABLE_WITH_REASON | AIS is radio equipment: the RED carries the EMC essential requirement, and the EMC Directive expressly does not additionally apply to radio equipment covered by the RED. | — |
| RED | APPLICABLE | The receiver intentionally receives radio waves (AIS VHF), so it is radio equipment under the RED; safety, EMC and spectrum requirements plus conformity assessment apply. | RED applicability analysis, Radio test report, DoC |
| LVD | CONDITIONALLY_APPLICABLE | AIS receiver hardware is typically 12/24 V DC and outside the LVD scope; a mains-powered variant or a power supply within the voltage limits would bring it into scope. | A mains-voltage variant or supplied power supply is placed on the market. |
| GPSR | APPLICABLE | AIS is a consumer product placed on the market; safety, traceability, warnings and incident duties apply, including antenna installation warnings. | Risk assessment, Installation warnings |
| CRA | CONDITIONALLY_APPLICABLE | AIS-CONNECTED is a product with digital elements and is in scope; a purely local receiver without network capability may be outside the CRA's connected-product scope, which must be confirmed. | The edition includes network connectivity or software updates. |
| ROHS | APPLICABLE | AIS is electrical and electronic equipment subject to RoHS. | Material declarations |
| WEEE | APPLICABLE | AIS is EEE placed on the Spanish market; producer responsibility applies. | Producer registration |
| BATTERIES | NOT_APPLICABLE_WITH_REASON | AIS receiver hardware is defined without a battery; if a backup battery is added, the Batteries Regulation would apply to it. | — |
| RCD | NOT_APPLICABLE_WITH_REASON | AIS is not a recreational craft or an RCD-listed component. | — |
| MED | NOT_APPLICABLE_WITH_REASON | AIS is not shipborne MED equipment and no wheelmark is claimed; a receiver for leisure craft does not become MED equipment by being installed on a yacht. | — |
| PLD | APPLICABLE | A defective receiver or misleading reception expectations can cause reliance loss; the PLD applies. | Liability assessment, Mandatory receive-only disclaimer |
| CONSUMER_COMMERCIAL | APPLICABLE | AIS consumer sales are subject to consumer terms, guarantee and fair-claims rules, including the prohibition on transponder/collision-avoidance claims. | Consumer terms, AIS disclaimer |
| RADIO_SPECTRUM | APPLICABLE | AIS reception uses maritime radio frequencies; the receiver must be authorised/conformant and no transmission may be offered. Transmission would require a maritime radio authorisation MAREA does not hold. | Receive-only no-transmit evidence, Receiver conformity |
| DATA_PROTECTION | CONDITIONALLY_APPLICABLE | A local receiver may process no personal data; AIS-CONNECTED or fleet-shared data can identify vessels and owners, bringing GDPR into scope. | AIS data is transmitted to EMBARCARTE or shared with other users. |

### PILOT — MAREA PILOT

Supervised steering controller and drive interface (safety gate BLOCKED). Editions: PILOT-COASTAL, PILOT-SAIL, PILOT-PRO.

| Instrument | Status | Rationale | Condition / evidence |
|---|---|---|---|
| EMC | CONDITIONALLY_APPLICABLE | PILOT includes active electronics and motor drive interfaces; if the product is radio equipment the RED carries the EMC requirement, otherwise the EMC Directive applies. | The shipped controller is not radio equipment. |
| RED | CONDITIONALLY_APPLICABLE | A remote control or wireless link would make PILOT radio equipment; a wired-only controller is not. | A wireless control or telemetry radio is integrated. |
| LVD | CONDITIONALLY_APPLICABLE | PILOT is normally 12/24 V DC; a mains-powered variant would fall within the LVD scope. | A mains-powered variant is placed on the market. |
| GPSR | APPLICABLE | PILOT is a consumer product with safety implications; GPSR safety, traceability and incident duties apply, and the safety gate must keep it off the market. | Safety case, Risk assessment |
| CRA | APPLICABLE | PILOT is a connected product with digital elements; CRA security, update and reporting duties apply alongside the safety gate. | CRA documentation, Security tests |
| ROHS | APPLICABLE | PILOT is electrical equipment subject to RoHS. | Material declarations |
| WEEE | APPLICABLE | PILOT is EEE placed on the Spanish market, if it were ever placed, and producer responsibility would apply. | Producer registration |
| BATTERIES | CONDITIONALLY_APPLICABLE | A backup battery in the controller would bring the Batteries Regulation into scope. | A battery is included in the product. |
| RCD | UNDETERMINED | Whether a steering controller is a 'component' under the RCD or an add-on outside its scope has not been determined; the answer changes the conformity route and cannot be assumed. | A product-scope legal analysis determines whether PILOT is RCD-covered. |
| MED | NOT_APPLICABLE_WITH_REASON | PILOT is not shipborne MED equipment and no wheelmark claim is made. | — |
| PLD | APPLICABLE | A steering product is a high-risk product; the PLD applies to hardware and software, and the safety gate must remain closed until the liability assessment is complete. | Safety case, Liability assessment, Insurance indication |
| CONSUMER_COMMERCIAL | APPLICABLE | Any consumer offer would be subject to consumer and fair-claims law; PILOT must not be offered while the safety gate is BLOCKED. | Consumer terms, Supervised-only disclaimers |
| RADIO_SPECTRUM | CONDITIONALLY_APPLICABLE | Any wireless link would require radio conformity and authorised spectrum use; a wired-only installation is not radio equipment. | A wireless remote or telemetry link is shipped. |
| DATA_PROTECTION | CONDITIONALLY_APPLICABLE | PILOT may process vessel position and control data; if linked to an account or cloud, GDPR applies. | Control/telemetry data is linked to an identified user or vessel owner. |

### SENSE — MAREA SENSE

Marine sensor modules and kits. Editions: SENSE-WIND, SENSE-POWER, SENSE-BILGE, SENSE-TANKS, SENSE-ENV, SENSE-ESSENTIALS, SENSE-SAIL, SENSE-SYSTEMS.

| Instrument | Status | Rationale | Condition / evidence |
|---|---|---|---|
| EMC | APPLICABLE | SENSE modules are active electronic apparatus placed on the market; EMC essential requirements apply unless a module is radio equipment covered by the RED. | EMC test report |
| RED | CONDITIONALLY_APPLICABLE | Wireless sensor variants (for example wireless wind or tank sensors) are radio equipment; wired variants are not. | The module intentionally transmits or receives radio waves. |
| LVD | CONDITIONALLY_APPLICABLE | SENSE modules are normally 12/24 V DC and outside the LVD scope; a mains-powered variant would be in scope. | A mains-powered variant is placed on the market. |
| GPSR | APPLICABLE | SENSE is a consumer product placed on the market; safety, installation warnings and traceability apply. | Risk assessment, Installation warnings |
| CRA | CONDITIONALLY_APPLICABLE | Network-connected SENSE modules shipped with firmware fall in scope; a dumb analogue sensor without digital elements may not. | The module ships firmware or network connectivity. |
| ROHS | APPLICABLE | SENSE is electrical and electronic equipment subject to RoHS. | Material declarations |
| WEEE | APPLICABLE | SENSE is EEE placed on the Spanish market; producer responsibility applies. | Producer registration |
| BATTERIES | CONDITIONALLY_APPLICABLE | Battery-powered sensor variants bring the Batteries Regulation into scope; wired variants do not contain batteries. | A battery is integrated or supplied. |
| RCD | NOT_APPLICABLE_WITH_REASON | SENSE modules are not recreational craft or RCD-listed components. | — |
| MED | NOT_APPLICABLE_WITH_REASON | SENSE is not shipborne MED equipment and no wheelmark is claimed. | — |
| PLD | APPLICABLE | Incorrect sensor measurements can cause reliance loss; the PLD applies to the hardware and firmware. | Accuracy evidence, Liability assessment |
| CONSUMER_COMMERCIAL | APPLICABLE | SENSE consumer sales are subject to consumer terms, guarantee and accurate measurement claims. | Consumer terms, Measurement limits |
| RADIO_SPECTRUM | CONDITIONALLY_APPLICABLE | Wireless sensors require radio conformity and authorised spectrum use. | The module uses a radio link. |
| DATA_PROTECTION | CONDITIONALLY_APPLICABLE | A local sensor may process no personal data; cloud-synced sensor data linked to a vessel or owner falls within GDPR. | Measurements are linked to an identified user or vessel. |

### WATCH — MAREA WATCH

Connected remote monitoring device and alert service. Editions: WATCH-CORE, WATCH-PLUS.

| Instrument | Status | Rationale | Condition / evidence |
|---|---|---|---|
| EMC | NOT_APPLICABLE_WITH_REASON | WATCH includes cellular radio equipment; the RED carries the EMC essential requirement and the EMC Directive does not additionally apply to radio equipment covered by the RED. | — |
| RED | APPLICABLE | WATCH intentionally transmits over cellular networks and is radio equipment; RED essential requirements and conformity assessment apply. | Radio test report, DoC |
| LVD | CONDITIONALLY_APPLICABLE | WATCH is battery-powered and normally outside the LVD scope; a supplied mains charger within the voltage limits would bring the charger into scope. | A mains charger or power supply is supplied with the product. |
| GPSR | APPLICABLE | WATCH is a consumer product with safety and monitoring implications; GPSR safety, traceability and incident duties apply. | Risk assessment, Battery and installation warnings |
| CRA | APPLICABLE | WATCH is a connected product with digital elements and a cloud service; CRA essential requirements, vulnerability handling, support period and reporting apply. | CRA documentation, Security update policy, Incident runbook |
| ROHS | APPLICABLE | WATCH is EEE subject to RoHS. | Material declarations |
| WEEE | APPLICABLE | WATCH is EEE placed on the Spanish market; producer responsibility applies. | Producer registration |
| BATTERIES | APPLICABLE | WATCH contains a battery placed on the market with the product; the Batteries Regulation applies. | Battery analysis, Labelling and take-back |
| RCD | NOT_APPLICABLE_WITH_REASON | WATCH is not a recreational craft or RCD-listed component. | — |
| MED | NOT_APPLICABLE_WITH_REASON | WATCH is not shipborne MED equipment and no wheelmark is claimed. | — |
| PLD | APPLICABLE | Missed or delayed alerts and device defects can cause reliance loss; the PLD applies to the device and service. | Delivery evidence, Liability assessment |
| CONSUMER_COMMERCIAL | APPLICABLE | WATCH hardware and subscription sales are subject to consumer terms, the 3-year guarantee and fair-claims rules; no guaranteed alert claim is allowed. | Consumer terms, Subscription terms |
| RADIO_SPECTRUM | APPLICABLE | Cellular transmission uses licensed spectrum through an operator; the device must be radio-conformant and the connectivity contract must exist. | Radio conformity, Connectivity contract |
| DATA_PROTECTION | APPLICABLE | WATCH processes location, vessel identity, account data and alert recipients; a DPIA is likely required. | DPIA, Privacy notice, DPA |

### DISPLAY — MAREA DISPLAY

Marine display and embedded runtime. Editions: DISPLAY-7, DISPLAY-LARGE-CONDITIONAL.

| Instrument | Status | Rationale | Condition / evidence |
|---|---|---|---|
| EMC | APPLICABLE | DISPLAY is active electronic apparatus; EMC essential requirements apply unless it is radio equipment covered by the RED. | EMC test report |
| RED | CONDITIONALLY_APPLICABLE | A DISPLAY with Wi-Fi/Bluetooth or cellular connectivity is radio equipment; a wired-only display is not. | A radio module is integrated into the shipped DISPLAY. |
| LVD | CONDITIONALLY_APPLICABLE | DISPLAY is normally 12/24 V DC and outside the LVD scope; a mains-powered variant or supplied power supply within the voltage limits is in scope. | A mains-voltage variant or power supply is placed on the market. |
| GPSR | APPLICABLE | DISPLAY is a consumer product placed on the market; safety, traceability and installation warnings apply. | Risk assessment, Installation warnings |
| CRA | APPLICABLE | DISPLAY ships firmware and network capability; CRA essential requirements and lifecycle duties apply. | CRA documentation, Update policy |
| ROHS | APPLICABLE | DISPLAY is EEE subject to RoHS. | Material declarations |
| WEEE | APPLICABLE | DISPLAY is EEE placed on the Spanish market; producer responsibility applies. | Producer registration |
| BATTERIES | CONDITIONALLY_APPLICABLE | A backup battery inside DISPLAY would bring the Batteries Regulation into scope. | A battery is integrated into the display. |
| RCD | UNDETERMINED | Whether a display installed as a fixed navigation instrument is an RCD-covered component has not been determined; a scope analysis is required before any conformity route is chosen. | A product-scope legal analysis determines RCD coverage. |
| MED | NOT_APPLICABLE_WITH_REASON | DISPLAY is not shipborne MED equipment and no wheelmark is claimed. | — |
| PLD | APPLICABLE | A defective display or runtime can mislead navigation; the PLD applies. | Liability assessment |
| CONSUMER_COMMERCIAL | APPLICABLE | DISPLAY consumer sales are subject to consumer terms and fair-claims rules. | Consumer terms |
| RADIO_SPECTRUM | CONDITIONALLY_APPLICABLE | Wireless display variants require radio conformity and authorised spectrum use. | The display uses a radio link. |
| DATA_PROTECTION | CONDITIONALLY_APPLICABLE | A local display may process no personal data; cloud-linked chart/track data can be personal data. | Display data is synced to an account or cloud service. |

### WEATHER — MAREA WEATHER

Weather forecast subscription service with licensed data. Editions: WEATHER-STANDARD, WEATHER-PRO.

| Instrument | Status | Rationale | Condition / evidence |
|---|---|---|---|
| EMC | NOT_APPLICABLE_WITH_REASON | WEATHER is a data service, not electrical apparatus placed on the market; any hardware that displays it is assessed as its own product. | — |
| RED | NOT_APPLICABLE_WITH_REASON | WEATHER performs no radio transmission or reception; connectivity belongs to the user's device or the WATCH/HUB hardware. | — |
| LVD | NOT_APPLICABLE_WITH_REASON | WEATHER is a service with no electrical equipment within the LVD scope. | — |
| GPSR | NOT_APPLICABLE_WITH_REASON | The GPSR applies to products, not to a forecast data service; if WEATHER is sold with a physical device, that device is assessed separately. | — |
| CRA | CONDITIONALLY_APPLICABLE | A remote data service alone is generally outside the CRA's 'product with digital elements' scope, but the CRA may apply where the service is integral to a product or the client software is placed on the market. | The CRA consolidated scope analysis concludes that the service or app is in scope. |
| ROHS | NOT_APPLICABLE_WITH_REASON | WEATHER software/data has no electrical equipment; RoHS applies to the hardware that displays it. | — |
| WEEE | NOT_APPLICABLE_WITH_REASON | WEEE applies to EEE, not to a subscription service; the hardware is registered separately. | — |
| BATTERIES | NOT_APPLICABLE_WITH_REASON | WEATHER contains no battery. | — |
| RCD | NOT_APPLICABLE_WITH_REASON | WEATHER is not a recreational craft or RCD component. | — |
| MED | NOT_APPLICABLE_WITH_REASON | WEATHER is not shipborne MED equipment and no wheelmark is claimed. | — |
| PLD | APPLICABLE | The revised PLD covers software and digital services; forecast errors presented as reliable can ground liability. | Disclaimer and limits, Liability assessment |
| CONSUMER_COMMERCIAL | APPLICABLE | Weather subscriptions are digital services subject to DCD, CRD and fair-claims rules, including probabilistic-forecast disclosures. | Subscription terms, Forecast disclaimers |
| RADIO_SPECTRUM | NOT_APPLICABLE_WITH_REASON | WEATHER does not transmit or receive radio signals itself. | — |
| DATA_PROTECTION | APPLICABLE | WEATHER processes account data and possibly location preferences, so GDPR transparency and lawful basis apply. | Privacy notice, Retention schedule |

### FLEET — MAREA FLEET

Multi-tenant B2B fleet monitoring SaaS. Editions: FLEET-START, FLEET-BUSINESS, FLEET-ENTERPRISE.

| Instrument | Status | Rationale | Condition / evidence |
|---|---|---|---|
| EMC | NOT_APPLICABLE_WITH_REASON | FLEET is a hosted B2B service; any hardware used with it is a separate product assessed in its own family. | — |
| RED | NOT_APPLICABLE_WITH_REASON | FLEET performs no radio transmission or reception itself. | — |
| LVD | NOT_APPLICABLE_WITH_REASON | FLEET is a software service with no electrical equipment. | — |
| GPSR | NOT_APPLICABLE_WITH_REASON | FLEET is not a product placed on the market; GPSR does not apply to a pure SaaS offering. | — |
| CRA | CONDITIONALLY_APPLICABLE | The CRA addresses products with digital elements; a pure SaaS service is generally outside its scope, but integrated clients or remote-processing features that are part of a product can bring obligations. | The CRA scope analysis concludes FLEET or its client software is in scope. |
| ROHS | NOT_APPLICABLE_WITH_REASON | FLEET is software and contains no EEE subject to RoHS. | — |
| WEEE | NOT_APPLICABLE_WITH_REASON | FLEET is not EEE placed on the market. | — |
| BATTERIES | NOT_APPLICABLE_WITH_REASON | FLEET contains no batteries. | — |
| RCD | NOT_APPLICABLE_WITH_REASON | FLEET is not a recreational craft or RCD component. | — |
| MED | NOT_APPLICABLE_WITH_REASON | FLEET is not shipborne MED equipment. | — |
| PLD | APPLICABLE | The revised PLD covers software; a defective fleet service can cause economic and safety-relevant loss. | Liability assessment, B2B contract |
| CONSUMER_COMMERCIAL | NOT_APPLICABLE_WITH_REASON | FLEET is defined as a B2B service sold to professional operators, so the consumer distance-selling rules (CRD) do not apply to that relationship; B2B terms and business-to-business fairness rules apply instead. | B2B terms and DPA |
| RADIO_SPECTRUM | NOT_APPLICABLE_WITH_REASON | FLEET does not transmit or receive radio signals; connectivity is provided by operators and devices. | — |
| DATA_PROTECTION | APPLICABLE | FLEET processes vessel and personnel data as processor/controller; GDPR, LOPDGDD and Article 28 DPA obligations apply, likely with a DPIA. | DPA, DPIA, Tenant isolation test |


## 4. Bundle detail

Bundles are mixed contracts of goods, software and services; instrument
applicability is inherited from the included products but the bundle must also
satisfy consumer, contract and data-protection duties in its own right.

### START — MAREA START

Included: NAV, HUB.

| Instrument | Status | Rationale |
|---|---|---|
| EMC | APPLICABLE | The bundle includes HUB apparatus, so the EMC Directive applies to the hardware component unless HUB is radio equipment under the RED. |
| RED | CONDITIONALLY_APPLICABLE | Applies if the bundled HUB includes a radio module. |
| LVD | CONDITIONALLY_APPLICABLE | Only a mains-powered variant or supplied power supply would fall within the LVD scope. |
| GPSR | APPLICABLE | The bundle includes products placed on the market, so GPSR safety and traceability duties apply. |
| CRA | APPLICABLE | NAV and HUB are products with digital elements and connected capabilities, so CRA duties apply to the bundle's software and firmware. |
| ROHS | APPLICABLE | HUB is EEE and subject to RoHS. |
| WEEE | APPLICABLE | HUB is EEE placed on the Spanish market; producer responsibility applies. |
| BATTERIES | CONDITIONALLY_APPLICABLE | Only if the shipped bundle includes a battery or battery-powered accessory. |
| RCD | NOT_APPLICABLE_WITH_REASON | The bundle contains electronics and software, not a recreational craft or an RCD-listed component. |
| MED | NOT_APPLICABLE_WITH_REASON | The bundle is not shipborne MED equipment and no wheelmark is claimed. |
| PLD | APPLICABLE | The bundle includes software and connected hardware within the revised PLD scope. |
| CONSUMER_COMMERCIAL | APPLICABLE | The bundle is offered to consumers, so CRD/CSD, Spanish guarantee rules and fair-claims law apply. |
| RADIO_SPECTRUM | CONDITIONALLY_APPLICABLE | Only if the shipped hardware transmits radio signals. |
| DATA_PROTECTION | APPLICABLE | NAV/HUB account and telemetry data are personal data, so GDPR duties apply. |

### CRUISE — MAREA CRUISE

Included: NAV, HUB, AIS, DISPLAY.

| Instrument | Status | Rationale |
|---|---|---|
| EMC | APPLICABLE | The bundle includes HUB and DISPLAY apparatus subject to the EMC Directive or, for radio equipment, the RED's EMC requirement. |
| RED | APPLICABLE | The bundle includes AIS radio receiver equipment; the RED applies to that equipment and to any radio-enabled HUB/DISPLAY. |
| LVD | CONDITIONALLY_APPLICABLE | Only a mains-powered variant or supplied power supply within the voltage limits would be in scope. |
| GPSR | APPLICABLE | The bundle includes products placed on the market; GPSR safety and traceability duties apply. |
| CRA | APPLICABLE | The bundle includes connected products with digital elements; CRA duties attach to those products and their updates. |
| ROHS | APPLICABLE | The bundle includes EEE subject to RoHS. |
| WEEE | APPLICABLE | The bundle includes EEE placed on the Spanish market; producer responsibility applies. |
| BATTERIES | CONDITIONALLY_APPLICABLE | Only if the shipped bundle includes a battery or battery-powered accessory. |
| RCD | NOT_APPLICABLE_WITH_REASON | The bundle is not a recreational craft or an RCD-listed component; the craft's own conformity remains the builder's responsibility. |
| MED | NOT_APPLICABLE_WITH_REASON | The bundle is not shipborne MED equipment and no wheelmark is claimed. |
| PLD | APPLICABLE | The bundle includes software and connected hardware within the revised PLD scope. |
| CONSUMER_COMMERCIAL | APPLICABLE | The bundle is offered to consumers and must satisfy consumer terms, guarantee and claims rules. |
| RADIO_SPECTRUM | APPLICABLE | The AIS receiver uses maritime radio frequencies in receive-only mode, which must be authorised and must not offer transmission. |
| DATA_PROTECTION | APPLICABLE | Account, location and AIS-derived data can identify users and vessels; GDPR applies. |

### SAIL — MAREA SAIL

Included: NAV, HUB, PILOT, SENSE.

| Instrument | Status | Rationale |
|---|---|---|
| EMC | CONDITIONALLY_APPLICABLE | The bundle includes HUB/SENSE/PILOT electronics; the EMC Directive applies unless the equipment is radio equipment covered by the RED. |
| RED | CONDITIONALLY_APPLICABLE | Applies if any bundled device includes a radio module or wireless link. |
| LVD | CONDITIONALLY_APPLICABLE | Only a mains-powered component would be in scope. |
| GPSR | APPLICABLE | The bundle includes products placed on the market, and PILOT raises safety duties that the GPSR reinforces. |
| CRA | APPLICABLE | The bundle includes connected products with digital elements, including PILOT's control software. |
| ROHS | APPLICABLE | The bundle includes EEE subject to RoHS. |
| WEEE | APPLICABLE | The bundle includes EEE placed on the Spanish market; producer responsibility applies. |
| BATTERIES | CONDITIONALLY_APPLICABLE | Only if the shipped bundle includes a battery. |
| RCD | UNDETERMINED | Whether PILOT is an RCD-covered component or an add-on outside the RCD scope has not been determined; the answer changes the conformity route for the bundle. |
| MED | NOT_APPLICABLE_WITH_REASON | The bundle is not shipborne MED equipment and no wheelmark is claimed. |
| PLD | APPLICABLE | The bundle includes software and a steering product within the revised PLD scope; the safety gate must keep PILOT off the market. |
| CONSUMER_COMMERCIAL | APPLICABLE | Consumer bundle sales are subject to consumer terms and fair-claims rules, and PILOT must not be sold while the gate is BLOCKED. |
| RADIO_SPECTRUM | CONDITIONALLY_APPLICABLE | Only if a wireless link is shipped with the bundled devices. |
| DATA_PROTECTION | APPLICABLE | The bundle processes account, vessel and control data linked to identified users; GDPR applies. |

### PROTECT — MAREA PROTECT

Included: WATCH, SENSE.

| Instrument | Status | Rationale |
|---|---|---|
| EMC | NOT_APPLICABLE_WITH_REASON | WATCH is radio equipment; the RED carries the EMC requirement and the EMC Directive does not additionally apply to radio equipment covered by the RED. |
| RED | APPLICABLE | WATCH is cellular radio equipment and the bundle includes SENSE wireless modules if those variants are shipped. |
| LVD | CONDITIONALLY_APPLICABLE | Only a mains charger or power supply within the voltage limits would be in scope. |
| GPSR | APPLICABLE | The bundle includes products placed on the market; GPSR safety, traceability and incident duties apply. |
| CRA | APPLICABLE | WATCH and bundled sensors are connected products with digital elements; CRA duties apply, including service incident reporting. |
| ROHS | APPLICABLE | The bundle includes EEE subject to RoHS. |
| WEEE | APPLICABLE | The bundle includes EEE placed on the Spanish market; producer responsibility applies. |
| BATTERIES | APPLICABLE | WATCH contains a battery placed on the market with the product. |
| RCD | NOT_APPLICABLE_WITH_REASON | The bundle contains electronics and a service, not a recreational craft or RCD component. |
| MED | NOT_APPLICABLE_WITH_REASON | The bundle is not shipborne MED equipment and no wheelmark is claimed. |
| PLD | APPLICABLE | Missed alerts or defective sensors can cause reliance loss; the revised PLD applies. |
| CONSUMER_COMMERCIAL | APPLICABLE | The bundle is offered to consumers with a subscription, so CRD/CSD/DCD and fair-claims rules apply. |
| RADIO_SPECTRUM | APPLICABLE | WATCH transmits over licensed cellular spectrum through an operator and must be radio-conformant. |
| DATA_PROTECTION | APPLICABLE | WATCH processes vessel location, owner identity and alert recipients; a DPIA is likely required. |

### COMPLETE — MAREA COMPLETE

Included: NAV, HUB, DISPLAY, WATCH, SENSE, PILOT.

| Instrument | Status | Rationale |
|---|---|---|
| EMC | APPLICABLE | The bundle includes multiple apparatuses; the EMC Directive applies except where the RED carries the requirement for radio equipment. |
| RED | APPLICABLE | The bundle includes WATCH cellular radio equipment and AIS receiver radio equipment. |
| LVD | CONDITIONALLY_APPLICABLE | Only a mains-powered component would be in scope. |
| GPSR | APPLICABLE | The bundle includes multiple products placed on the market, including safety-relevant steering hardware. |
| CRA | APPLICABLE | All connected components and their software fall within the CRA's product-with-digital-elements scope. |
| ROHS | APPLICABLE | The bundle includes EEE subject to RoHS. |
| WEEE | APPLICABLE | The bundle includes EEE placed on the Spanish market; producer responsibility applies. |
| BATTERIES | APPLICABLE | WATCH and possibly other bundled devices contain batteries. |
| RCD | UNDETERMINED | The RCD coverage of the display/steering components is undetermined and changes the bundle conformity route. |
| MED | NOT_APPLICABLE_WITH_REASON | The bundle is not shipborne MED equipment and no wheelmark is claimed. |
| PLD | APPLICABLE | The bundle includes software, sensors and a steering product, all within the revised PLD scope. |
| CONSUMER_COMMERCIAL | APPLICABLE | The bundle is offered to consumers; consumer, subscription and claims rules apply, and PILOT must remain unsellable. |
| RADIO_SPECTRUM | APPLICABLE | The bundle includes cellular radio equipment and an AIS receiver operating on maritime frequencies. |
| DATA_PROTECTION | APPLICABLE | The bundle processes location, vessel, owner and control data across multiple services; GDPR and DPIA duties apply. |

### FLEET — MAREA FLEET package

Included: FLEET, WATCH.

| Instrument | Status | Rationale |
|---|---|---|
| EMC | NOT_APPLICABLE_WITH_REASON | The FLEET SaaS itself is not apparatus; any WATCH hardware included is radio equipment assessed under the RED. |
| RED | APPLICABLE | The package includes WATCH cellular radio equipment, so RED duties apply to that hardware. |
| LVD | NOT_APPLICABLE_WITH_REASON | The SaaS has no electrical equipment within the LVD scope; a supplied charger would be assessed separately. |
| GPSR | CONDITIONALLY_APPLICABLE | GPSR applies to any physical product included in the package (for example WATCH), not to the SaaS itself. |
| CRA | CONDITIONALLY_APPLICABLE | WATCH hardware is in scope; the SaaS alone is generally outside the CRA, but integrated clients may be covered. |
| ROHS | CONDITIONALLY_APPLICABLE | Only the hardware component of the package is subject to RoHS. |
| WEEE | CONDITIONALLY_APPLICABLE | Only the hardware component is subject to WEEE producer responsibility. |
| BATTERIES | CONDITIONALLY_APPLICABLE | Only if battery-powered hardware is included. |
| RCD | NOT_APPLICABLE_WITH_REASON | FLEET is a B2B SaaS package, not a recreational craft or RCD component. |
| MED | NOT_APPLICABLE_WITH_REASON | FLEET is not shipborne MED equipment and no wheelmark is claimed. |
| PLD | APPLICABLE | The FLEET service is software within the revised PLD scope, and the included hardware adds product-liability exposure. |
| CONSUMER_COMMERCIAL | NOT_APPLICABLE_WITH_REASON | FLEET is a B2B package sold to professional fleet operators; consumer distance-selling rules do not apply to that relationship, and B2B terms govern instead. |
| RADIO_SPECTRUM | CONDITIONALLY_APPLICABLE | Applies to the WATCH hardware included in the package, not to the SaaS. |
| DATA_PROTECTION | APPLICABLE | FLEET processes vessel and personnel data as controller/processor; GDPR, LOPDGDD and DPA duties apply. |


## 5. What this matrix does not establish

It does not establish conformity, certification, admissibility of a claim or
commercial availability. It records which instruments may apply and which
evidence would close the question. Product-specific scope decisions that depend
on facts not yet frozen (PILOT/RCD component status, CRA classification, radio
freeze) are marked `UNDETERMINED` and escalated to counsel.
