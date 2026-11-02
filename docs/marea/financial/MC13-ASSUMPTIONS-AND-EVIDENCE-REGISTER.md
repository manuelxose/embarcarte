# MC-13 assumptions and evidence register

Status: `GENERATED_DO_NOT_EDIT`. Produced deterministically by
`scripts/build-marea-financial-model.mjs` from `data/assumptions.json` and the model.
The validator re-generates it and rejects any divergence.

Every numeric model input resolves to a record below. `null` means unknown and is
never zero. A record is never upgraded because a later milestone consumes it.

## 1. Evidence classification

| Evidence class | Records |
|---|---|
| VERIFIED_OBSERVED | 1 |
| PUBLISHED_TARIFF | 7 |
| CONTRACTED | 0 |
| INHERITED_ASSUMPTION | 1 |
| ENGINEERING_ASSUMPTION | 11 |
| SCENARIO_ASSUMPTION | 125 |
| UNKNOWN | 7 |
| BLOCKED | 0 |

`FORMAL_PROVIDER_QUOTATION = 0` and `EXECUTED_CONTRACT = 0`. No input is contracted.

## 2. Unknown and blocked inputs

| ID | Name | Status | Reason |
|---|---|---|---|
| ASM-MC13-045 | EMBARCARTE current company cash and funding position | UNKNOWN | Unknown; no bank statement, funding commitment or capital authorization exists. |
| ASM-MC13-047 | Product liability insurance premium | UNKNOWN | No quotation, broker indication or public tariff exists; MC-12 forbids estimating it as a percentage of revenue. |
| ASM-MC13-048 | CRA/security-maintenance lifecycle cost | UNKNOWN | No scope, rate or support contract exists for the 5-year support / update period. |
| ASM-MC13-049 | Chart/weather data-licence cost | UNKNOWN | Rights are NOT_GRANTED and no price exists; the cost must not become zero by omission. |
| ASM-MC13-050 | Customer acquisition cost | UNKNOWN | CUSTOMER_EVIDENCE = NONE; CAC_VALIDATED = false. |
| ASM-MC13-051 | Validated churn and renewal rates | UNKNOWN | CHURN_VALIDATED = false and RENEWAL_RATE_VALIDATED = false; all rates in this model are illustrative scenario assumptions. |
| ASM-MC13-052 | Customer willingness to pay | UNKNOWN | CUSTOMER_WTP_VALIDATED = false; no price response exists. |

## 3. Full assumptions register

| ID | Name | Value | Unit | Evidence | Status | Source |
|---|---|---|---|---|---|---|
| ASM-MC13-001 | Spanish standard VAT rate applied to consumer price hypotheses | 21 | percent | INHERITED_ASSUMPTION | CONDITIONAL | ASM-MC12-001 |
| ASM-MC13-002 | VAT conversion factor net = gross / 1.21 | 1.21 | ratio | OFFICIAL_LICENSING_DOCUMENT | CONDITIONAL | ASM-MC12-002 |
| ASM-MC13-003 | Refund and withdrawal allowance as a percentage of gross invoiced revenue | 3 | percent | ENGINEERING_ASSUMPTION | CONDITIONAL | ASM-MC12-010 |
| ASM-MC13-004 | Published EEA card processing percentage fee | 1.5 | percent | PUBLISHED_TARIFF | CONDITIONAL | CH-DIRECT |
| ASM-MC13-005 | Published EEA card processing fixed fee per transaction | 0.25 | EUR per transaction | PUBLISHED_TARIFF | CONDITIONAL | CH-DIRECT |
| ASM-MC13-006 | App-store standard commission applied to the app-store subscription share | 30 | percent | PUBLISHED_TARIFF | CONDITIONAL | CH-APP-STORE |
| ASM-MC13-007 | Distributor/retail margin deduction on hardware revenue | 35 | percent | ENGINEERING_ASSUMPTION | CONDITIONAL | CH-DISTRIBUTOR |
| ASM-MC13-008 | Installer trade margin deduction on hardware revenue | 15 | percent | ENGINEERING_ASSUMPTION | CONDITIONAL | CH-INSTALLER |
| ASM-MC13-009 | VAT payment lag in months after invoicing | 1 | months | ENGINEERING_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-010 | Recoverable input VAT share on inventory purchases | 100 | percent | ENGINEERING_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-011 | Supplier deposit at order | 30 | percent | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-012 | Supplier balance due after receipt in months | 1 | months | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-013 | Component lead time in months | 2 | months | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-014 | Safety stock in months of forecast demand | 1 | months | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-015 | Minimum order quantity in units | 25 | units | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-016 | Inventory carrying cost per year | 2 | percent | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-017 | Obsolescence write-down per year on available inventory | 5 | percent | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-018 | Distributor customer payment term in days | 60 | days | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-019 | Direct consumer settlement in days | 2 | days | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-020 | Annual renewal rate — DOWNSIDE | 0.55 | ratio | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-021 | Annual renewal rate — BASE_HYPOTHETICAL | 0.75 | ratio | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-022 | Annual renewal rate — UPSIDE_HYPOTHETICAL | 0.85 | ratio | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-023 | Monthly churn rate — DOWNSIDE | 0.03 | ratio | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-024 | Monthly churn rate — BASE_HYPOTHETICAL | 0.015 | ratio | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-025 | Monthly churn rate — UPSIDE_HYPOTHETICAL | 0.008 | ratio | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-026 | Activation rate of new accounts — DOWNSIDE | 0.7 | ratio | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-027 | Activation rate of new accounts — BASE_HYPOTHETICAL | 0.85 | ratio | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-028 | Activation rate of new accounts — UPSIDE_HYPOTHETICAL | 0.95 | ratio | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-029 | Cloud/telemetry cost per device-month (BASE vendor subtotal) | 0.155 | EUR per device-month | PUBLISHED_TARIFF | CONDITIONAL | ASM-MC12-022 |
| ASM-MC13-030 | Cellular IoT cost per device-month (BASE PAYG) | 0.05 | EUR per device-month | PUBLISHED_TARIFF | CONDITIONAL | ASM-MC12-012 |
| ASM-MC13-031 | Alert notification cost per device-month (BASE mix) | 0.070714 | EUR per device-month | PUBLISHED_TARIFF | CONDITIONAL | ASM-MC12-013 |
| ASM-MC13-032 | Cloud cost per account-month | 0.02 | EUR per account-month | ENGINEERING_ASSUMPTION | CONDITIONAL | ASM-MC12-022 |
| ASM-MC13-033 | Cloud cost per FLEET vessel-month | 0.1 | EUR per vessel-month | ENGINEERING_ASSUMPTION | CONDITIONAL | ASM-MC12-022 |
| ASM-MC13-034 | Support cost per active account-year | 6 | EUR per account-year | ENGINEERING_ASSUMPTION | CONDITIONAL | ASM-MC12-009 |
| ASM-MC13-035 | Support cost per active device-year | 4 | EUR per device-year | ENGINEERING_ASSUMPTION | CONDITIONAL | ASM-MC12-009 |
| ASM-MC13-036 | Support cost per FLEET vessel-year | 24 | EUR per vessel-year | ENGINEERING_ASSUMPTION | CONDITIONAL | ASM-MC12-009 |
| ASM-MC13-037 | Retained inactive-device cost factor as a share of cloud cost | 0.2 | ratio | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-038 | Hardware device attrition per year | 2 | percent | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-039 | Capex envelope multiplier — DOWNSIDE | 1.25 | ratio | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-040 | Capex envelope multiplier — BASE_HYPOTHETICAL | 1 | ratio | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-041 | Capex envelope multiplier — UPSIDE_HYPOTHETICAL | 0.85 | ratio | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-042 | Operating-cost envelope inflation per year | 3 | percent | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-043 | Contingency reserve as a percentage of known capex | 15 | percent | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-044 | Opening cash analysis convention | 0 | EUR | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-045 | EMBARCARTE current company cash and funding position | UNKNOWN | EUR | UNKNOWN | UNKNOWN | docs/marea/economics/MC12-MC13-HANDOFF.md |
| ASM-MC13-046 | Illustrative analytical funding envelope | 2000000 | EUR | SCENARIO_ASSUMPTION | CONDITIONAL | docs/marea/economics/data/assumptions.json |
| ASM-MC13-047 | Product liability insurance premium | UNKNOWN | EUR per year | UNKNOWN | UNKNOWN | insurance.productLiabilityPremium |
| ASM-MC13-048 | CRA/security-maintenance lifecycle cost | UNKNOWN | EUR per year | UNKNOWN | UNKNOWN | cra.economicEffect |
| ASM-MC13-049 | Chart/weather data-licence cost | UNKNOWN | EUR per account-year | UNKNOWN | UNKNOWN | LR-CHART-001 |
| ASM-MC13-050 | Customer acquisition cost | UNKNOWN | EUR per customer | UNKNOWN | UNKNOWN | customerAcquisition.cacEur |
| ASM-MC13-051 | Validated churn and renewal rates | UNKNOWN | ratio | UNKNOWN | UNKNOWN | docs/marea/economics/data/mc13-handoff-inputs.json |
| ASM-MC13-052 | Customer willingness to pay | UNKNOWN | EUR | UNKNOWN | UNKNOWN | docs/marea/economics/data/mc13-handoff-inputs.json |
| ASM-MC13-053 | FORMAL_SUPPLIER_QUOTATIONS absence marker | 0 | count | VERIFIED_OBSERVED | KNOWN | docs/marea/economics/data/assumptions.json |
| ASM-MC13-054 | Model horizon | 60 | months | ENGINEERING_ASSUMPTION | KNOWN | docs/marea/economics/data/assumptions.json |
| ASM-MC13-055 | Illustrative new-demand profile DOWNSIDE / HUB-STANDARD | 16 | units per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-001 |
| ASM-MC13-056 | Illustrative new-demand profile BASE_HYPOTHETICAL / HUB-STANDARD | 40 | units per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-002 |
| ASM-MC13-057 | Illustrative new-demand profile UPSIDE_HYPOTHETICAL / HUB-STANDARD | 64 | units per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-003 |
| ASM-MC13-058 | Illustrative new-demand profile DOWNSIDE / HUB-PRO | 3 | units per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-004 |
| ASM-MC13-059 | Illustrative new-demand profile BASE_HYPOTHETICAL / HUB-PRO | 8 | units per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-005 |
| ASM-MC13-060 | Illustrative new-demand profile UPSIDE_HYPOTHETICAL / HUB-PRO | 13 | units per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-006 |
| ASM-MC13-061 | Illustrative new-demand profile DOWNSIDE / DISPLAY-7 | 8 | units per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-007 |
| ASM-MC13-062 | Illustrative new-demand profile BASE_HYPOTHETICAL / DISPLAY-7 | 20 | units per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-008 |
| ASM-MC13-063 | Illustrative new-demand profile UPSIDE_HYPOTHETICAL / DISPLAY-7 | 32 | units per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-009 |
| ASM-MC13-064 | Illustrative new-demand profile DOWNSIDE / AIS-RECEIVER | 5 | units per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-010 |
| ASM-MC13-065 | Illustrative new-demand profile BASE_HYPOTHETICAL / AIS-RECEIVER | 12 | units per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-011 |
| ASM-MC13-066 | Illustrative new-demand profile UPSIDE_HYPOTHETICAL / AIS-RECEIVER | 19 | units per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-012 |
| ASM-MC13-067 | Illustrative new-demand profile DOWNSIDE / SENSE-ENTRY-SYMBOLIC | 10 | units per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-013 |
| ASM-MC13-068 | Illustrative new-demand profile BASE_HYPOTHETICAL / SENSE-ENTRY-SYMBOLIC | 25 | units per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-014 |
| ASM-MC13-069 | Illustrative new-demand profile UPSIDE_HYPOTHETICAL / SENSE-ENTRY-SYMBOLIC | 40 | units per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-015 |
| ASM-MC13-070 | Illustrative new-demand profile DOWNSIDE / WATCH-CORE | 12 | units per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-016 |
| ASM-MC13-071 | Illustrative new-demand profile BASE_HYPOTHETICAL / WATCH-CORE | 30 | units per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-017 |
| ASM-MC13-072 | Illustrative new-demand profile UPSIDE_HYPOTHETICAL / WATCH-CORE | 48 | units per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-018 |
| ASM-MC13-073 | Illustrative new-demand profile DOWNSIDE / NAV-ESSENTIAL | 40 | new accounts per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-019 |
| ASM-MC13-074 | Illustrative new-demand profile BASE_HYPOTHETICAL / NAV-ESSENTIAL | 100 | new accounts per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-020 |
| ASM-MC13-075 | Illustrative new-demand profile UPSIDE_HYPOTHETICAL / NAV-ESSENTIAL | 160 | new accounts per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-021 |
| ASM-MC13-076 | Illustrative new-demand profile DOWNSIDE / NAV-PRO | 24 | new accounts per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-022 |
| ASM-MC13-077 | Illustrative new-demand profile BASE_HYPOTHETICAL / NAV-PRO | 60 | new accounts per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-023 |
| ASM-MC13-078 | Illustrative new-demand profile UPSIDE_HYPOTHETICAL / NAV-PRO | 96 | new accounts per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-024 |
| ASM-MC13-079 | Illustrative new-demand profile DOWNSIDE / WEATHER-STANDARD | 16 | new accounts per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-025 |
| ASM-MC13-080 | Illustrative new-demand profile BASE_HYPOTHETICAL / WEATHER-STANDARD | 40 | new accounts per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-026 |
| ASM-MC13-081 | Illustrative new-demand profile UPSIDE_HYPOTHETICAL / WEATHER-STANDARD | 64 | new accounts per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-027 |
| ASM-MC13-082 | Illustrative new-demand profile DOWNSIDE / WEATHER-PRO | 8 | new accounts per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-028 |
| ASM-MC13-083 | Illustrative new-demand profile BASE_HYPOTHETICAL / WEATHER-PRO | 20 | new accounts per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-029 |
| ASM-MC13-084 | Illustrative new-demand profile UPSIDE_HYPOTHETICAL / WEATHER-PRO | 32 | new accounts per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-030 |
| ASM-MC13-085 | Illustrative new-demand profile DOWNSIDE / WATCH-MONITORING | 8 | new accounts per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-031 |
| ASM-MC13-086 | Illustrative new-demand profile BASE_HYPOTHETICAL / WATCH-MONITORING | 20 | new accounts per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-032 |
| ASM-MC13-087 | Illustrative new-demand profile UPSIDE_HYPOTHETICAL / WATCH-MONITORING | 32 | new accounts per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-033 |
| ASM-MC13-088 | Illustrative new-demand profile DOWNSIDE / FLEET-START | 4 | new accounts per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-034 |
| ASM-MC13-089 | Illustrative new-demand profile BASE_HYPOTHETICAL / FLEET-START | 10 | new accounts per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-035 |
| ASM-MC13-090 | Illustrative new-demand profile UPSIDE_HYPOTHETICAL / FLEET-START | 16 | new accounts per month | SCENARIO_ASSUMPTION | CONDITIONAL | DMD-036 |
| ASM-MC13-091 | Hypothetical clearance month for NAV in RESTRICTED_CURRENT | UNKNOWN | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-RESTRICTED_CURRENT-NAV |
| ASM-MC13-092 | Hypothetical clearance month for HUB in RESTRICTED_CURRENT | UNKNOWN | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-RESTRICTED_CURRENT-HUB |
| ASM-MC13-093 | Hypothetical clearance month for AIS in RESTRICTED_CURRENT | UNKNOWN | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-RESTRICTED_CURRENT-AIS |
| ASM-MC13-094 | Hypothetical clearance month for PILOT in RESTRICTED_CURRENT | UNKNOWN | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-RESTRICTED_CURRENT-PILOT |
| ASM-MC13-095 | Hypothetical clearance month for SENSE in RESTRICTED_CURRENT | UNKNOWN | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-RESTRICTED_CURRENT-SENSE |
| ASM-MC13-096 | Hypothetical clearance month for WATCH in RESTRICTED_CURRENT | UNKNOWN | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-RESTRICTED_CURRENT-WATCH |
| ASM-MC13-097 | Hypothetical clearance month for DISPLAY in RESTRICTED_CURRENT | UNKNOWN | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-RESTRICTED_CURRENT-DISPLAY |
| ASM-MC13-098 | Hypothetical clearance month for WEATHER in RESTRICTED_CURRENT | UNKNOWN | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-RESTRICTED_CURRENT-WEATHER |
| ASM-MC13-099 | Hypothetical clearance month for FLEET in RESTRICTED_CURRENT | UNKNOWN | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-RESTRICTED_CURRENT-FLEET |
| ASM-MC13-100 | Illustrative hardware channel mix DOWNSIDE: DIRECT_TO_CONSUMER | 70 | percent channel share | SCENARIO_ASSUMPTION | CONDITIONAL | CHM-DOWNSIDE-HARDWARE-DIRECT_TO_CONSUMER |
| ASM-MC13-101 | Illustrative hardware channel mix DOWNSIDE: DISTRIBUTOR_RETAIL | 25 | percent channel share | SCENARIO_ASSUMPTION | CONDITIONAL | CHM-DOWNSIDE-HARDWARE-DISTRIBUTOR_RETAIL |
| ASM-MC13-102 | Illustrative hardware channel mix DOWNSIDE: PROFESSIONAL_INSTALLER | 5 | percent channel share | SCENARIO_ASSUMPTION | CONDITIONAL | CHM-DOWNSIDE-HARDWARE-PROFESSIONAL_INSTALLER |
| ASM-MC13-103 | Illustrative subscription channel mix DOWNSIDE: DIRECT_TO_CONSUMER | 80 | percent channel share | SCENARIO_ASSUMPTION | CONDITIONAL | CHM-DOWNSIDE-SUBSCRIPTION-DIRECT_TO_CONSUMER |
| ASM-MC13-104 | Illustrative subscription channel mix DOWNSIDE: APP_STORE | 20 | percent channel share | SCENARIO_ASSUMPTION | CONDITIONAL | CHM-DOWNSIDE-SUBSCRIPTION-APP_STORE |
| ASM-MC13-105 | Hypothetical clearance month for NAV in DOWNSIDE | 26 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-DOWNSIDE-NAV |
| ASM-MC13-106 | Hypothetical clearance month for HUB in DOWNSIDE | 16 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-DOWNSIDE-HUB |
| ASM-MC13-107 | Hypothetical clearance month for AIS in DOWNSIDE | 22 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-DOWNSIDE-AIS |
| ASM-MC13-108 | Hypothetical clearance month for PILOT in DOWNSIDE | UNKNOWN | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-DOWNSIDE-PILOT |
| ASM-MC13-109 | Hypothetical clearance month for SENSE in DOWNSIDE | 18 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-DOWNSIDE-SENSE |
| ASM-MC13-110 | Hypothetical clearance month for WATCH in DOWNSIDE | 16 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-DOWNSIDE-WATCH |
| ASM-MC13-111 | Hypothetical clearance month for DISPLAY in DOWNSIDE | 14 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-DOWNSIDE-DISPLAY |
| ASM-MC13-112 | Hypothetical clearance month for WEATHER in DOWNSIDE | 26 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-DOWNSIDE-WEATHER |
| ASM-MC13-113 | Hypothetical clearance month for FLEET in DOWNSIDE | 12 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-DOWNSIDE-FLEET |
| ASM-MC13-114 | Illustrative hardware channel mix BASE_HYPOTHETICAL: DIRECT_TO_CONSUMER | 70 | percent channel share | SCENARIO_ASSUMPTION | CONDITIONAL | CHM-BASE_HYPOTHETICAL-HARDWARE-DIRECT_TO_CONSUMER |
| ASM-MC13-115 | Illustrative hardware channel mix BASE_HYPOTHETICAL: DISTRIBUTOR_RETAIL | 25 | percent channel share | SCENARIO_ASSUMPTION | CONDITIONAL | CHM-BASE_HYPOTHETICAL-HARDWARE-DISTRIBUTOR_RETAIL |
| ASM-MC13-116 | Illustrative hardware channel mix BASE_HYPOTHETICAL: PROFESSIONAL_INSTALLER | 5 | percent channel share | SCENARIO_ASSUMPTION | CONDITIONAL | CHM-BASE_HYPOTHETICAL-HARDWARE-PROFESSIONAL_INSTALLER |
| ASM-MC13-117 | Illustrative subscription channel mix BASE_HYPOTHETICAL: DIRECT_TO_CONSUMER | 80 | percent channel share | SCENARIO_ASSUMPTION | CONDITIONAL | CHM-BASE_HYPOTHETICAL-SUBSCRIPTION-DIRECT_TO_CONSUMER |
| ASM-MC13-118 | Illustrative subscription channel mix BASE_HYPOTHETICAL: APP_STORE | 20 | percent channel share | SCENARIO_ASSUMPTION | CONDITIONAL | CHM-BASE_HYPOTHETICAL-SUBSCRIPTION-APP_STORE |
| ASM-MC13-119 | Hypothetical clearance month for NAV in BASE_HYPOTHETICAL | 13 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-BASE_HYPOTHETICAL-NAV |
| ASM-MC13-120 | Hypothetical clearance month for HUB in BASE_HYPOTHETICAL | 8 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-BASE_HYPOTHETICAL-HUB |
| ASM-MC13-121 | Hypothetical clearance month for AIS in BASE_HYPOTHETICAL | 11 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-BASE_HYPOTHETICAL-AIS |
| ASM-MC13-122 | Hypothetical clearance month for PILOT in BASE_HYPOTHETICAL | UNKNOWN | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-BASE_HYPOTHETICAL-PILOT |
| ASM-MC13-123 | Hypothetical clearance month for SENSE in BASE_HYPOTHETICAL | 9 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-BASE_HYPOTHETICAL-SENSE |
| ASM-MC13-124 | Hypothetical clearance month for WATCH in BASE_HYPOTHETICAL | 8 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-BASE_HYPOTHETICAL-WATCH |
| ASM-MC13-125 | Hypothetical clearance month for DISPLAY in BASE_HYPOTHETICAL | 7 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-BASE_HYPOTHETICAL-DISPLAY |
| ASM-MC13-126 | Hypothetical clearance month for WEATHER in BASE_HYPOTHETICAL | 12 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-BASE_HYPOTHETICAL-WEATHER |
| ASM-MC13-127 | Hypothetical clearance month for FLEET in BASE_HYPOTHETICAL | 6 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-BASE_HYPOTHETICAL-FLEET |
| ASM-MC13-128 | Illustrative hardware channel mix UPSIDE_HYPOTHETICAL: DIRECT_TO_CONSUMER | 70 | percent channel share | SCENARIO_ASSUMPTION | CONDITIONAL | CHM-UPSIDE_HYPOTHETICAL-HARDWARE-DIRECT_TO_CONSUMER |
| ASM-MC13-129 | Illustrative hardware channel mix UPSIDE_HYPOTHETICAL: DISTRIBUTOR_RETAIL | 25 | percent channel share | SCENARIO_ASSUMPTION | CONDITIONAL | CHM-UPSIDE_HYPOTHETICAL-HARDWARE-DISTRIBUTOR_RETAIL |
| ASM-MC13-130 | Illustrative hardware channel mix UPSIDE_HYPOTHETICAL: PROFESSIONAL_INSTALLER | 5 | percent channel share | SCENARIO_ASSUMPTION | CONDITIONAL | CHM-UPSIDE_HYPOTHETICAL-HARDWARE-PROFESSIONAL_INSTALLER |
| ASM-MC13-131 | Illustrative subscription channel mix UPSIDE_HYPOTHETICAL: DIRECT_TO_CONSUMER | 80 | percent channel share | SCENARIO_ASSUMPTION | CONDITIONAL | CHM-UPSIDE_HYPOTHETICAL-SUBSCRIPTION-DIRECT_TO_CONSUMER |
| ASM-MC13-132 | Illustrative subscription channel mix UPSIDE_HYPOTHETICAL: APP_STORE | 20 | percent channel share | SCENARIO_ASSUMPTION | CONDITIONAL | CHM-UPSIDE_HYPOTHETICAL-SUBSCRIPTION-APP_STORE |
| ASM-MC13-133 | Hypothetical clearance month for NAV in UPSIDE_HYPOTHETICAL | 10 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-UPSIDE_HYPOTHETICAL-NAV |
| ASM-MC13-134 | Hypothetical clearance month for HUB in UPSIDE_HYPOTHETICAL | 7 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-UPSIDE_HYPOTHETICAL-HUB |
| ASM-MC13-135 | Hypothetical clearance month for AIS in UPSIDE_HYPOTHETICAL | 9 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-UPSIDE_HYPOTHETICAL-AIS |
| ASM-MC13-136 | Hypothetical clearance month for PILOT in UPSIDE_HYPOTHETICAL | UNKNOWN | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-UPSIDE_HYPOTHETICAL-PILOT |
| ASM-MC13-137 | Hypothetical clearance month for SENSE in UPSIDE_HYPOTHETICAL | 8 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-UPSIDE_HYPOTHETICAL-SENSE |
| ASM-MC13-138 | Hypothetical clearance month for WATCH in UPSIDE_HYPOTHETICAL | 7 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-UPSIDE_HYPOTHETICAL-WATCH |
| ASM-MC13-139 | Hypothetical clearance month for DISPLAY in UPSIDE_HYPOTHETICAL | 6 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-UPSIDE_HYPOTHETICAL-DISPLAY |
| ASM-MC13-140 | Hypothetical clearance month for WEATHER in UPSIDE_HYPOTHETICAL | 10 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-UPSIDE_HYPOTHETICAL-WEATHER |
| ASM-MC13-141 | Hypothetical clearance month for FLEET in UPSIDE_HYPOTHETICAL | 5 | model month | SCENARIO_ASSUMPTION | CONDITIONAL | CLR-UPSIDE_HYPOTHETICAL-FLEET |
| ASM-MC13-142 | Illustrative monthly opex envelope for Hardware and firmware engineering capacity — OPEX-ENG | 16000 | EUR per month | SCENARIO_ASSUMPTION | CONDITIONAL | OPEX-ENG |
| ASM-MC13-143 | Illustrative monthly opex envelope for Customer and installer support capacity — OPEX-SUPPORT | 3500 | EUR per month | SCENARIO_ASSUMPTION | CONDITIONAL | OPEX-SUPPORT |
| ASM-MC13-144 | Illustrative monthly opex envelope for Operations and supply-chain coordination — OPEX-OPS | 2000 | EUR per month | SCENARIO_ASSUMPTION | CONDITIONAL | OPEX-OPS |
| ASM-MC13-145 | Illustrative monthly opex envelope for Cloud, identity and device-management operations — OPEX-INFRA | 1500 | EUR per month | SCENARIO_ASSUMPTION | CONDITIONAL | OPEX-INFRA |
| ASM-MC13-146 | Illustrative monthly opex envelope for Sales and marketing envelope (no validated CAC exists) — OPEX-SM | 4000 | EUR per month | SCENARIO_ASSUMPTION | CONDITIONAL | OPEX-SM |
| ASM-MC13-147 | Illustrative monthly opex envelope for Legal, accounting and trademark administration — OPEX-LEGAL | 1800 | EUR per month | SCENARIO_ASSUMPTION | CONDITIONAL | OPEX-LEGAL |
| ASM-MC13-148 | Illustrative monthly opex envelope for Product management and documentation — OPEX-PRODUCT | 2000 | EUR per month | SCENARIO_ASSUMPTION | CONDITIONAL | OPEX-PRODUCT |
| ASM-MC13-149 | Illustrative monthly opex envelope for Security updates and vulnerability response (CRA-related) — OPEX-CYBER | 2500 | EUR per month | SCENARIO_ASSUMPTION | CONDITIONAL | OPEX-CYBER |
| ASM-MC13-150 | Illustrative monthly opex envelope for Warranty administration (reserve is inside variable cost) — OPEX-WARRANTY | 800 | EUR per month | SCENARIO_ASSUMPTION | CONDITIONAL | OPEX-WARRANTY |
| ASM-MC13-151 | Illustrative monthly opex envelope for Conformity, documentation and market surveillance — OPEX-COMPLIANCE | 1500 | EUR per month | SCENARIO_ASSUMPTION | CONDITIONAL | OPEX-COMPLIANCE |
| ASM-MC13-152 | Illustrative monthly opex envelope for Cloud minimum commitment floor — OPEX-CLOUD-FLOOR | 600 | EUR per month | PUBLISHED_TARIFF | CONDITIONAL | OPEX-CLOUD-FLOOR |
| ASM-MC13-159 | Annual subscription revenue recognition method | 12 | months | SCENARIO_ASSUMPTION | CONDITIONAL | deferredRevenuePolicy |

## 4. Named unknowns excluded from the conditional result

- softwareDirectCosts: Excludes unknown chart/weather data-licence cost and FLEET onboarding/DPA/SLA cost. The amounts are not zero; they are absent.
- fixedOpexEnvelope: Excludes unknown product-liability insurance premium and CRA/security-maintenance lifecycle cost.
- financingRequirement: Excludes unknown capex/certification items and unknown recurring costs; the true financing requirement is higher than the conditional figure.
- opex:OPEX-INSURANCE: No quotation, broker indication or public tariff exists.
- opex:OPEX-CRA: No scope, rate or support contract exists.
