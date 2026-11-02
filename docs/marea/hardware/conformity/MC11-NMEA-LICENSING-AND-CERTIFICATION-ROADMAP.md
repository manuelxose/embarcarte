# MC-11 — NMEA licensing and certification roadmap (D25)

Status of this document: `INTERNAL_ENGINEERING_RESEARCH — PLANNING ONLY`.

```
NMEA MEMBERSHIP               = NOT_HELD
NMEA 2000 LICENCE             = NOT_HELD
NMEA 0183 STANDARD LICENCE    = NOT_HELD
MANUFACTURER CODE (MID)       = NOT_ASSIGNED
PRODUCT CODE                  = NOT_ASSIGNED
NMEA 2000 TECHNICAL IMPL.     = NOT_IMPLEMENTED
NMEA 2000 CERTIFICATION       = NOT_CERTIFIED
NMEA 0183 CONFORMANCE         = NOT_CLAIMED (sentence parsing only)
TESTED COMPATIBILITY ROWS     = 0
CERTIFIED LOGO / TERMINOLOGY  = PROHIBITED (not earned)
RETRIEVAL DATE                = 2026-11-02
```

Owner: `conformity-specialist`. Related: `data/nmea-status.json` (architecture workstream, read-only
reference for the technical-implementation facts), D23 §4, D24 §5, D26.

**Non-assertions.** No NMEA membership, licence, manufacturer code, product code, certification or logo
right exists or is claimed. No NMEA document was purchased. No MAREA product has been tested against any
NMEA device, message set or network. Nothing in this document authorises the words "NMEA 2000 certified",
"NMEA approved", "NMEA 2000 compatible" or any NMEA mark.

## 1. Why this is six separate questions

Programmes routinely collapse NMEA into one item ("do we need NMEA certification?"). It is at least six
independent questions, each with a different owner, cost and failure mode:

| # | Question | Answer today | Satisfied by? |
|---|---|---|---|
| 1 | Does the product technically implement the protocol? | **NO** — `NOT_IMPLEMENTED` | Engineering |
| 2 | Is NMEA membership held and the standard licensed? | **NO** — `NOT_HELD` | Commercial purchase |
| 3 | Is the manufacturer identified on the network? | **NO** — no manufacturer code, no product code | Purchase + assignment |
| 4 | Is the product certified by NMEA? | **NO** — `NOT_CERTIFIED` | NMEA validation |
| 5 | Is the terminology "approved"/permitted? | **NO** — prohibited terms withheld | Certification outcome |
| 6 | May the certified logo be used? | **NO** — `NOT_PERMITTED` | Certification outcome |

A technical implementation does not create a licence; a licence does not create a certification; a
certification is not implied by a manufacturer code. Each step below is stated with the official source it
came from and with the evidence state of its cost and timetable.

## 2. Q1 — Technical implementation: `NOT_IMPLEMENTED`

No MAREA product definition contains an NMEA 2000 stack: no CAN controller configuration, no PGN
encoder/decoder, no fast-packet handling, no address-claiming state machine, no class/function code
broadcast. The only legacy artefact is a TypeScript interface union and a no-op actuator stub, recorded by
the architecture workstream as `NO_ARTICLE` (`data/nmea-status.json`).

NMEA 0183 is a different position: the legacy stack parses a documented subset of NMEA 0183 sentence types
(GNSS and wind) with a bespoke parser. **Parsing sentences is not conformance to the NMEA 0183 standard**
and no conformance is claimed. There is no electrical-layer implementation (differential talker/listener
with isolation); USB-serial adapters were assumed. `TESTED_COMPATIBILITY_ROWS = 0`: not one device, message
set, firmware version or direction has been tested and recorded.

Consequence: any claim of NMEA 2000 capability is not merely unproven, it is unsupported by any code in the
repository. Any claim of NMEA 0183 conformance is unsupported by any test.

## 3. Q2 — Membership and standards licensing: `NOT_HELD`

### 3.1 What NMEA states (verified 2026-11-02)

From the official NMEA 2000 page (`EVD-MC11-319`):

- "All products that read and or transmit NMEA 2000 information must be certified by NMEA."
- NMEA 2000® is a **registered trademark** of the National Marine Electronics Association.
- The NMEA 2000 standard is a copyrighted work licensed under a licence agreement, with a tiered licensing
  fee system **based on industry group**; it is **not sold via an online store** — purchase is by email or
  telephone, and a secure download link is issued after payment and verification.
- NMEA does not issue memberships to non-marine entities, will verify the industry group, and **associate
  memberships do not qualify for the member discount** on NMEA 2000 licensing fees.
- Updates to the NMEA 2000 standard are provided at no cost to **marine manufacturer members only**, in good
  standing for the calendar year; non-members may purchase updates.
- The current published version named on the page is **NMEA 2000 Version 3.000 (with amendments)**.

From the official NMEA 0183 page (`EVD-MC11-320`):

- NMEA 0183 is a **copyrighted document**, available only from NMEA; NMEA states that other internet
  offerings "are not authorized and may constitute a copyright infringement".
- Current version named: **NMEA 0183 Version 4.30 (December 2023)**, replacing Version 4.11 (2018);
  NMEA 0183-HS (38.4 kbaud) is included as an appendix, the base bus being 4800 baud.
- Published price tiers: **USD 1,150** manufacturer member; **USD 7,500** government/industrial/testing;
  **USD 10,000** consumer electronics.
- Manufacturer mnemonic codes: **USD 200** administrative fee, plus purchase of the standard at the
  applicable industry-group price; codes are issued to companies, not individuals.

### 3.2 Consequence for MAREA

Three commercial facts, each uncomfortable:

1. **MAREA's category matters.** NMEA prices by industry group and verifies it; an entity that is not a
   marine manufacturer does not get the marine manufacturer price, and NMEA does not issue memberships to
   non-marine entities (`EVD-MC11-319`). The applicable tier for EMBARCARTE has not been determined and
   cannot be determined from public pages alone.
2. **The standards are not free documentation.** Both NMEA 2000 and NMEA 0183 are licensed documents; a
   protocol implementation written from public sentence examples is not a licence to implement the standard,
   and the 0183 page explicitly warns that unauthorised copies may infringe copyright (`EVD-MC11-320`).
3. **Membership is not certification.** Membership (even a paid manufacturer membership) is a prerequisite
   for purchasing/licensing and for free updates; it does not certify any product.

### 3.3 Cost and timetable evidence state

| Item | Evidence state | Amount | Timetable |
|---|---|---|---|
| NMEA 2000 standard licence | `UNKNOWN` | **not asserted** — the fee table did not render on the retrieved page | `UNKNOWN` |
| NMEA manufacturer membership | `UNKNOWN` | **not asserted** — membership pages were inaccessible (HTTP 404, `EVD-MC11-322`) | `UNKNOWN` |
| NMEA 0183 standard licence | `BUDGETARY_INDICATION` | USD 1,150 / 7,500 / 10,000 by industry group (published schedule) | `UNKNOWN` |
| NMEA 0183 manufacturer mnemonic code | `BUDGETARY_INDICATION` | USD 200 + standard purchase | `UNKNOWN` |
| NMEA 2000 manufacturer code (MID) | `UNKNOWN` | `null` | **up to 60 days for assignment** (verified) |
| NMEA 2000 product code, per certified product | `UNKNOWN` | `null` | `UNKNOWN` |
| NMEA 2000 Certification Tool access | `UNKNOWN` | `null` | `UNKNOWN` |
| NMEA validation / certification testing | `UNKNOWN` | `null` | `UNKNOWN` |

**No total is presented.** The only figures in this document are the NMEA 0183 published prices, which are
public price schedules — not quotations to MAREA, not negotiated, and not guaranteed to remain unchanged.

## 4. Q3 — Manufacturer identification: `NOT_ASSIGNED`

NMEA requires each manufacturer to purchase a **Manufacturer Code** which "uniquely identifies the
manufacturer on the NMEA 2000 network", and states that manufacturer code assignments take **up to 60
days** (`EVD-MC11-319`). For each certified product a unique **Product Code** must be purchased, and each
certified product must broadcast its **class and function code**; the list of published manufacturer and
product codes and the class/function codes are available on request by email.

Consequences:

- There is no manufacturer identity to encode. The MID/manufacturer code is *assigned to a company*, so the
  manufacturer designation (MC-11 `UNDETERMINED`, blocker CON-01) is a prerequisite — a company that has not
  decided whether it manufactures, contract-manufactures or white-labels cannot hold it.
- The 60-day assignment window is the only NMEA timetable element verified in this session, and it is a
  *minimum* lead-time element only: it says nothing about certification duration.
- Product codes are per certified product, so the count scales with the number of NMEA-2000-capable SKUs
  (HUB ×2, AIS ×2, DISPLAY ×2, and any wireless SENSE module the programme later proposes).

## 5. Q4 — Product certification: `NOT_CERTIFIED`

The NMEA 2000 page describes the process as follows (`EVD-MC11-319`):

1. All marine-industry NMEA 2000 products must be **certified based on the NMEA 2000 License Agreement**.
2. Certification may be performed by the manufacturer or by a third party.
3. The **NMEA 2000 Certification Tool** assists development and generates a **mandatory encrypted
   certification file**, which is sent to NMEA for validation.
4. **After NMEA validation**, certification is granted and use of the official NMEA 2000 logo and the term
   "NMEA 2000 Certified" is permitted on product marketing material.

What the programme would therefore have to obtain, in order:

| # | Step | Prerequisite that does not exist | Evidence of completion |
|---|---|---|---|
| 1 | Legal entity designated as manufacturer | Corporate identity, manufacturer model | Company registration + decision |
| 2 | NMEA membership at the correct industry group, if required | Commercial decision and payment | Membership record |
| 3 | NMEA 2000 standard licence | Payment; industry-group verification | Licence agreement |
| 4 | Manufacturer Code (MID) | Steps 1–3; up to 60 days for assignment | Code assignment confirmation |
| 5 | Product implementation, including class/function code broadcast | A frozen product design and firmware | Design freeze, test records |
| 6 | Certification Tool run against the implementation | Tool access (terms unknown) | Encrypted certification file |
| 7 | Submission to NMEA and validation | Steps 1–6 | NMEA validation |
| 8 | Product Code per certified product | Successful validation | Product code |
| 9 | Certification granted; logo and "NMEA 2000 Certified" permitted | Step 8 | NMEA certificate |
| 10 | Maintenance: re-certification on change, standard updates | Ongoing membership / update purchases | Update records |

No step has been taken. `nmea2000Certified = false`, `testedCompatibilityRows = 0`.

## 6. Q5 — Approved terminology: `PROHIBITED_TERMS_WITHHELD`

Permitted today (descriptive, factual, non-implying):

- "MAREA does not implement NMEA 2000 in any MC-11 product definition."
- "NMEA 2000 certification is required by NMEA for products that read and/or transmit NMEA 2000
  information."
- "A candidate NMEA 2000 interface would require the NMEA 2000 licence, a manufacturer code and per-product
  certification before any compatibility claim."
- For NMEA 0183: "parses a documented subset of NMEA 0183 sentence types; parsing is not conformance to the
  standard."

Prohibited until the corresponding certificate exists for that product code:

| Prohibited expression | Why |
|---|---|
| "NMEA 2000 certified" | Reserved by NMEA for certified products; certification follows validation (`EVD-MC11-319`) |
| "NMEA 2000 compatible" / "compatible with NMEA 2000" | Not a status NMEA recognises; certification is the only status the NMEA 2000 page describes, and the product is not certified |
| "NMEA 2000 approved" / "NMEA approved" | No approval relationship exists |
| "NMEA 2000 ready" / "NMEA 2000 upgradable to certified" | Implies a status the product does not have |
| "Plug and play with NMEA 2000 instruments" | Interoperability claim with zero tested rows |
| "NMEA 0183 compliant" / "certified" / "conforms to NMEA 0183" | No licence and no test; parsing is not conformance (`EVD-MC11-320`) |
| "Works with any NMEA 0183 device" | Untested and unlicenced |
| Any NMEA logo, wordmark, look-alike mark or standard-document extract | Trademark and copyright (`EVD-MC11-319`, `EVD-MC11-320`) |

Trademark position: "NMEA 2000® is a registered Trademark of the National Marine Electronics Association"
(`EVD-MC11-319`). Nominative, factual references to the standards are permissible; use of the mark as an
endorsement, and any logo, are not.

## 7. Q6 — Certified-logo usage: `NOT_PERMITTED`

The NMEA 2000 page ties official logo use to the validation outcome (`EVD-MC11-319`). No certification
exists, so no logo may be used — not in product photography, not in packaging, not in the manual, not in
compatibility tables, not as an "intended to be certified" placeholder. This is the same prohibition that
applies to the CE mark, the MED wheel mark and the WEEE bin: a mark is earned by an assessment, not by an
intention.

## 8. NMEA 0183 — a separate position, stated precisely

| Question | Position |
|---|---|
| Technical implementation | Sentence parsing only (GNSS and wind subsets); no electrical-layer implementation; `NOT_IMPLEMENTED` as an interface standard |
| Licence | `NOT_HELD`. NMEA 0183 is a copyrighted document sold by NMEA; published tiers USD 1,150 / 7,500 / 10,000 (`EVD-MC11-320`) |
| Manufacturer identification | No manufacturer mnemonic code; USD 200 administrative fee plus standard purchase; companies only (`EVD-MC11-320`) |
| Product certification | **No NMEA 0183 product-certification programme is evidenced** on the official NMEA 0183 page. Recorded as `NOT_EVIDENCED`, not as "there is no programme": the page is silent, and silence is not proof of absence |
| Approved terminology | "Parses documented NMEA 0183 sentence types" only, with the express statement that parsing is not conformance |
| Logo use | Not permitted |
| Tested compatibility | 0 rows |

The distinction matters commercially: NMEA 0183 has no evidenced per-product certification route, so the
honest position is a *documentation licence* plus a *published, tested compatibility matrix* — not a
certification claim.

## 9. Related standards bodies — IEC and ISO

The mission asks for the official IEC 61162-1/-3 and ISO 11783/CAN references "where relevant". The relevant
statement is a negative one: **these were not retrieved this session**, and the correspondence between them
and NMEA standards must be confirmed from the licensed standards rather than assumed. What can be said:

| Reference | What it is | Relevance to MAREA | Status in MC-11 |
|---|---|---|---|
| IEC 61162-1 | International standard for maritime digital interfaces (single talker / multiple listeners) — the IEC counterpart area of NMEA 0183 | Candidate reference for the electrical/protocol layer of a serial instrument interface | **NOT retrieved, NOT cited as a requirement.** Any use requires purchasing the standard |
| IEC 61162-3 | International standard for maritime serial-data instrument networks — the IEC counterpart area of NMEA 2000 | Candidate reference for CAN-based instrument networking | **NOT retrieved.** NMEA 2000 certification is the governing scheme for NMEA 2000 products (`EVD-MC11-319`) |
| ISO 11783 | Agricultural/forestry machinery CAN network built on the same J1939 base | Engineering reference for CAN physical-layer practice only; **not a legal requirement for a marine product** | **NOT retrieved.** Must never be used as a compliance claim |
| ISO 11898 (CAN) | Controller area network physical layer | Generic engineering reference | Not retrieved; not cited as a requirement |

Reducing this to one rule: **a NMEA claim cannot be founded on an IEC or ISO standard**, and an IEC/ISO
reference cannot substitute for NMEA licensing or certification. The two documentation regimes are separate
and both would have to be satisfied if the product claims either.

## 10. What the programme would have to obtain (single checklist)

| # | Item | Type | Evidence state of cost | Evidence state of timetable | Blocking dependency |
|---|---|---|---|---|---|
| 1 | Designated manufacturer legal entity | Corporate | n/a | n/a | CON-01 |
| 2 | NMEA membership at the correct industry group (if required by the chosen standard tier) | Commercial | `UNKNOWN` | `UNKNOWN` | Company decision |
| 3 | NMEA 2000 standard licence agreement | Commercial | `UNKNOWN` (table not rendered) | `UNKNOWN` | Membership/industry-group verification |
| 4 | Manufacturer Code (MID) | Assignment | `UNKNOWN` | **up to 60 days** (verified) | Steps 1–3 |
| 5 | Product Code(s) | Per product | `UNKNOWN` | `UNKNOWN` | Certification |
| 6 | Certification Tool access | Tooling | `UNKNOWN` | `UNKNOWN` | Licence |
| 7 | Certified product implementation (incl. class/function code broadcast) | Engineering | Development cost, not certification cost | `UNKNOWN` | Design freeze |
| 8 | NMEA validation and certification | Assessment | `UNKNOWN` | `UNKNOWN` | Steps 4–7 |
| 9 | NMEA 0183 standard licence (if 0183 is offered) | Commercial | `BUDGETARY_INDICATION`: USD 1,150 / 7,500 / 10,000 | `UNKNOWN` | Company decision |
| 10 | NMEA 0183 manufacturer mnemonic code (if 0183 is offered) | Assignment | `BUDGETARY_INDICATION`: USD 200 + standard | `UNKNOWN` | Step 9 |
| 11 | Published, tested compatibility matrix | Evidence | Internal test cost | `UNKNOWN` | Devices, test bench |
| 12 | Membership/standards maintenance (updates, re-certification) | Recurring | `UNKNOWN` | Annual | Ongoing |

**No certification timetable is asserted.** The only verified NMEA timing fact is the up-to-60-day
manufacturer-code assignment (`EVD-MC11-319`); certification duration, validation queue, tool access and
cost are all `UNKNOWN` because the relevant pages could not be read (see §11) and no contact was made.

## 11. Which NMEA pages were accessible, and which were not

| URL | Result | Use |
|---|---|---|
| `https://www.nmea.org/nmea-2000.html` | **HTTP 200, retrieved** (`EVD-MC11-319`) | Certification requirement, licence model, manufacturer/product codes, certification tool, logo/terminology rule, version 3.000 |
| `https://www.nmea.org/nmea-0183.html` | **HTTP 200, retrieved** (`EVD-MC11-320`) | Copyright/licence position, price tiers, manufacturer mnemonic codes, version 4.30 |
| `https://www.nmea.org/` | **HTTP 200, retrieved** (`EVD-MC11-321`) | Association identity and scope |
| `https://www.nmea.org/nmea-2000-certification.html` | **HTTP 404 — INACCESSIBLE** (`EVD-MC11-322`) | Would have contained certification-process detail; not read, not quoted |
| `https://www.nmea.org/product-certification.html` | **HTTP 404 — INACCESSIBLE** (`EVD-MC11-322`) | Not read, not quoted |
| `https://www.nmea.org/nmea-membership.html`, `/membership.html`, `/membership` | **HTTP 404 — INACCESSIBLE** (`EVD-MC11-322`) | Membership categories and fees **not asserted** |
| `https://web.nmea.org/External/WCPages/WCWebContent/webcontentpage.aspx?ContentID=238` (NMEA 2000 terminology page) | **HTTP 404 — INACCESSIBLE** (`EVD-MC11-322`) | Approved-terminology text not read; terminology rules in §6 derive from the 2000 page only |
| `https://www.nmea.org/Assets/…` PDF documents (membership application, standards guidance) | **HTTP 404 — INACCESSIBLE** (`EVD-MC11-322`) | Not read, not quoted |

A 404 records non-retrieval, not non-existence: the pages may exist under other paths. Anything that would
have come from those pages — membership fee, membership categories, certification-process document,
approved-terminology document — is recorded as `UNKNOWN` and is **not** filled in from memory or from
third-party summaries.

## 12. Interaction with the rest of MC-11

| Artefact | Interaction |
|---|---|
| D23 `RED` rows | A NMEA 2000 interface does not change RED applicability; it is a data interface, not a radio function. RED scope is decided by the radio set (`EVD-MC11-304`) |
| D23 `CRA` rows | An NMEA 2000 stack is firmware; a vulnerable or unauthenticated bus interface is CRA-relevant. Certification does not satisfy the CRA |
| D24 test programme | NMEA certification testing is **additional** to EMC/RED testing, not a substitute for it. A product can pass NMEA certification and still fail EMC |
| D26 blockers | CON-11 (NMEA certification) is a prerequisite, not a parallel task; CON-01/CON-02 (manufacturer and economic-operator roles) and CON-03 (technical file) are prerequisites for the licence-holder identity |
| Product copy | The prohibited-claims list in §6 is binding on every product page, manual, datasheet and compatibility table |

## 13. Closing statement

The NMEA position for MC-11 is unambiguous and must stay that way until real evidence exists:
**technical implementation `NOT_IMPLEMENTED`; membership `NOT_HELD`; manufacturer code `NOT_ASSIGNED`;
product certification `NOT_CERTIFIED`; approved terminology and certified logo `PROHIBITED`; tested
compatibility rows `0`.** The only figures that may be quoted are NMEA's published 0183 price schedule and
manufacturer-code fee, and they are `BUDGETARY_INDICATION` — never a MAREA price, never a commitment, and
never a substitute for the licence and certification the programme would have to buy.
