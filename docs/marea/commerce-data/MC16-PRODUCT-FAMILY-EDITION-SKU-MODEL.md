# MC-16 — Product family, edition and merchant SKU model (D04)

| Field | Value |
|---|---|
| Families | 9 |
| Editions | 26 |
| Actual merchant SKUs | 0 |
| Merchant SKU codes established | none |
| Current commercial availability | `NOT_FOR_SALE` |
| Canonical data | `data/product-families.json`, `data/product-editions.json`, `data/sku-candidates.json` |

## 1. Product family

A `ProductFamily` is the stable, language-neutral identity of one MAREA product line. It
carries intended functionality, product type, eleven readiness dimensions, source
references, route identity, edition identities, evidence references and release-gate
dependencies.

A family is not a merchant SKU, an inventory item, a price, a page or a bundle. It never
creates stock and never authorizes publication or sale.

| Family | Type | Engineering | Licensing | Data rights | Safety | Editions |
|---|---|---|---|---|---|---|
| NAV | SOFTWARE | PARTIALLY_VERIFIED | NOT_CLEARED | NOT_GRANTED | NOT_EVALUATED | 2 |
| HUB | HARDWARE | PARTIALLY_VERIFIED | NOT_CLEARED | NOT_GRANTED | NOT_EVALUATED | 2 |
| AIS | HARDWARE | NOT_VERIFIED | NOT_CLEARED | NOT_GRANTED | RECEIVE_ONLY_NO_TRANSMISSION | 2 |
| PILOT | HARDWARE | NOT_VERIFIED | NOT_CLEARED | NOT_GRANTED | BLOCKED | 3 |
| SENSE | HARDWARE | PARTIALLY_VERIFIED | NOT_CLEARED | NOT_GRANTED | LOCAL_ALARM_INDEPENDENT | 8 |
| WATCH | HARDWARE_SERVICE | NOT_VERIFIED | NOT_CLEARED | NOT_GRANTED | LOCAL_SAFETY_INDEPENDENT | 2 |
| DISPLAY | HARDWARE | NOT_VERIFIED | NOT_CLEARED | NOT_GRANTED | NOT_EVALUATED | 2 |
| WEATHER | SOFTWARE | NOT_VERIFIED | NOT_CLEARED | NOT_GRANTED | NOT_EVALUATED | 2 |
| FLEET | SAAS | NOT_VERIFIED | NOT_CLEARED | NOT_GRANTED | NOT_EVALUATED | 3 |

All nine families are `DEFINED`, `INTERNAL_ONLY`, `NOT_FOR_SALE`. None is
`REGULATORY_READY`, `OPERATIONS_READY` or `COMMERCIALLY_AVAILABLE`. All have
`compliance = NOT_STARTED`, `brandPublication = NOT_GRANTED`, `operations = NOT_READY`
and `availability = NOT_FOR_SALE`.

## 2. Product edition

A `ProductEdition` is one of the 26 inherited edition definitions. It is the stable
candidate identity for a future SKU, not a merchant SKU. It records definition status,
edition type, family, engineering/licensing/hardware/data-rights/compliance/safety/price
status, commercial status, feature definitions, dependency ids and evidence ids.

### 2.1 Edition inventory (26)

| Edition | Family | Type | Definition | Price status |
|---|---|---|---|---|
| NAV-ESSENTIAL | NAV | SOFTWARE_SUBSCRIPTION | DEFINED | HYPOTHESIS_UNAPPROVED |
| NAV-PRO | NAV | SOFTWARE_SUBSCRIPTION | DEFINED | HYPOTHESIS_UNAPPROVED |
| HUB-STANDARD | HUB | HARDWARE_DEVICE | DEFINED | HYPOTHESIS_UNAPPROVED |
| HUB-PRO | HUB | HARDWARE_DEVICE | DEFINED | HYPOTHESIS_UNAPPROVED |
| AIS-RECEIVER | AIS | HARDWARE_DEVICE | DEFINED | HYPOTHESIS_UNAPPROVED |
| AIS-CONNECTED | AIS | HARDWARE_DEVICE | CONDITIONAL | HYPOTHESIS_UNAPPROVED |
| PILOT-COASTAL | PILOT | HARDWARE_SYSTEM | DEFINED | HYPOTHESIS_UNAPPROVED |
| PILOT-SAIL | PILOT | HARDWARE_SYSTEM | CONDITIONAL | NOT_ESTABLISHED |
| PILOT-PRO | PILOT | INSTALLATION_PACKAGE | INSTALLATION_PACKAGE | NOT_APPLICABLE |
| SENSE-WIND | SENSE | HARDWARE_MODULE | DEFINED | NOT_ESTABLISHED |
| SENSE-POWER | SENSE | HARDWARE_MODULE | DEFINED | NOT_ESTABLISHED |
| SENSE-BILGE | SENSE | HARDWARE_MODULE | DEFINED | NOT_ESTABLISHED |
| SENSE-TANKS | SENSE | HARDWARE_MODULE | DEFINED | NOT_ESTABLISHED |
| SENSE-ENV | SENSE | HARDWARE_MODULE | DEFINED | NOT_ESTABLISHED |
| SENSE-ESSENTIALS | SENSE | HARDWARE_KIT | DEFINED | NOT_ESTABLISHED |
| SENSE-SAIL | SENSE | HARDWARE_KIT | CONDITIONAL | NOT_ESTABLISHED |
| SENSE-SYSTEMS | SENSE | HARDWARE_KIT | CONDITIONAL | NOT_ESTABLISHED |
| WATCH-CORE | WATCH | HARDWARE_DEVICE | DEFINED | HYPOTHESIS_UNAPPROVED |
| WATCH-PLUS | WATCH | HARDWARE_DEVICE | CONDITIONAL | NOT_ESTABLISHED |
| DISPLAY-7 | DISPLAY | HARDWARE_DEVICE | DEFINED | HYPOTHESIS_UNAPPROVED |
| DISPLAY-LARGE-CONDITIONAL | DISPLAY | HARDWARE_DEVICE | CONDITIONAL | NOT_ESTABLISHED |
| WEATHER-STANDARD | WEATHER | SOFTWARE_SUBSCRIPTION | DEFINED | HYPOTHESIS_UNAPPROVED |
| WEATHER-PRO | WEATHER | SOFTWARE_SUBSCRIPTION | CONDITIONAL | HYPOTHESIS_UNAPPROVED |
| FLEET-START | FLEET | CONTRACTED_SAAS | DEFINED | HYPOTHESIS_UNAPPROVED |
| FLEET-BUSINESS | FLEET | CONTRACTED_SAAS | DEFINED | HYPOTHESIS_UNAPPROVED |
| FLEET-ENTERPRISE | FLEET | CONTRACTED_SAAS | CONDITIONAL | NOT_ESTABLISHED |

Every edition has `merchantable=false`, `priceApproved=false`, `merchantSkuCode=null`,
`commercialAvailability=NOT_FOR_SALE`, `commercialStatus=NOT_FOR_SALE`,
`publicationState=INTERNAL_ONLY` and `lifecycleState=DEFINED`.

### 2.2 No invented editions

No edition may be added to improve model completeness. The only permitted identities are
the 26 listed above. Conditional editions remain conditional; they are not silently
promoted to defined, available or priced.

## 3. Merchant SKU

A `MerchantSKU` is an actual commercially managed stock-keeping or billable unit. At
MC-16 no merchant SKU exists and no merchant SKU code has been established.

### 3.1 Candidate rule

Each edition is represented by one `skuCandidateId` (`SKU-CAND-<EDITION>`). Every
candidate has:

```
merchantSkuCode = null
merchantable = false
priceApproved = false
commercialAvailability = NOT_FOR_SALE
lifecycleState = CANDIDATE_ONLY
```

The edition id is the stable future candidate identity. A merchant SKU code may only be
created by an authorized workflow (`WF-MERCHANT-SKU-CREATION`) after all of the following
are real and recorded:

1. an existing edition and family;
2. an approved price with verified external evidence and an authorized approver;
3. verified inventory or an authorized contracted fulfilment basis;
4. all applicable release gates closed with external evidence;
5. legal entity, consumer/B2B terms and publication authorization;
6. authorized approver roles and an appended audit event.

A URL, price hypothesis, stock number, admin flag, bundle or page cannot create a SKU.

### 3.2 Persistence guard

`marea_merchant_skus` requires `sku_code <> edition_id`, an existing edition, and approval
evidence for `APPROVED`/`ACTIVE`. MC-16 triggers reject any `APPROVED` or `ACTIVE` row and
any `merchantable=1` or `price_approved=1`. The edition table likewise rejects
`merchantable=1`, `price_approved=1`, `PUBLISHED` and sale states.

## 4. Special restrictions

### PILOT-PRO

`PILOT-PRO` is an `INSTALLATION_PACKAGE`. It is never a standalone priced SKU, a checkout
line, a fixed-price bundle component or an automatically available product. In bundle
data it appears only in the `ineligibleEditions` list with reason
`INSTALLATION_PACKAGE_NEVER_A_PRICED_SKU_OR_BUNDLE_LINE`.

### DISPLAY-LARGE-CONDITIONAL

Remains conditional. No frozen hardware size, cost, price or selectable SKU is invented.
It is never included in a bundle composition and is not selectable in the configurator.

### FLEET-ENTERPRISE

A conditional contracted B2B tier, not self-service checkout. It appears only in
`contractOnlyEditions`. No SLA is established. FLEET hardware is never included by
default.

### AIS

Receive-only. No transmission capability, transponder licence, collision-avoidance claim
or AIS-derived data right is represented. `AIS_TRANSMISSION_OFFERED = false`.

### SENSE kits

`SENSE-ESSENTIALS` expands exactly to `SENSE-POWER` + `SENSE-BILGE`; `SENSE-SAIL` to
`SENSE-WIND` + `SENSE-ENV`; `SENSE-SYSTEMS` to `SENSE-POWER` + `SENSE-BILGE` +
`SENSE-TANKS` + `SENSE-ENV`. A kit is packaging, not a new capability. Its modules are
never counted twice in inventory, bundle contribution or entitlements.

### WATCH

Local safety-relevant functions do not depend on subscription status. Monitoring is a
separate recurring entitlement. No guaranteed alert delivery is represented.

### NAV and WEATHER

Shared capability and licensing restrictions are preserved. A shared entitlement is
resolved through one canonical ledger and never charged twice.

## 5. Current result

At MC-16:

```
merchantable MAREA SKUs      = 0
merchant SKU codes established = 0
editions merchantable        = 0/26
editions price approved      = 0/26
commercial availability      = NOT_FOR_SALE
```

A definition, an edition and a candidate are not a purchasable product.
