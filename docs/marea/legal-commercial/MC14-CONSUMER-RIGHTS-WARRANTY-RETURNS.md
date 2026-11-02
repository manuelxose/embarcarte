# MC-14 — Consumer rights, warranty and returns

| Field | Value |
|---|---|
| Deliverable | D08 `MC14-CONSUMER-RIGHTS-WARRANTY-RETURNS.md` |
| Milestone | MC-14/36 |
| Date | 2026-11-02 |
| Owner | Programme Lead / Legal Counsel (external, not engaged) |
| Machine data | `data/consumer-rights.json`; risks `CONS-*` |
| Status | INTERNAL OBLIGATIONS MATRIX — no consumer term is approved or published |

## 1. Spanish and EU baseline

For consumer sales in Spain, the mandatory floor is:

- **3-year legal guarantee** for goods, with a **24-month presumption** that a
  lack of conformity existed at delivery (EU floor is 2 years; Spain applies the
  longer rule).
- **14-day withdrawal right** for distance contracts, with defined exceptions
  (for example sealed goods unsealed after delivery, and digital content
  supplied immediately with prior express consent).
- **Precontractual information**: seller identity, total price including taxes
  and delivery costs, withdrawal information, guarantee, duration and complaint
  handling.
- **Unfair-terms control**: clauses excluding liability, denying returns or
  shortening the legal guarantee are void.
- **Digital content and services**: conformity, updates and remedies including
  termination and recovery of user data.

B2B contracts do not benefit from mandatory consumer rules; they require a
separate contract set with delivery, risk, payment, conformity, remedies,
liability caps, force majeure and applicable law. A single template for B2C and
B2B is not justified.

## 2. The 3% returns allowance is not a measurement

The financial model contains a 3% refund/withdrawal allowance. It is an
**illustrative assumption**, not a measured return rate and not evidence of
product reliability. No return-rate, failure-rate or "no-hassle returns" claim
may be published. Measured data must replace the assumption before it is used in
any external statement.

## 3. Commercial warranty vs legal guarantee

An optional commercial warranty may add to the legal guarantee but may not
replace, restrict or shorten it. Warranty wording must be provided in durable
form, distinguish the commercial warranty from statutory rights, and avoid
discretionary deductions that have no legal basis. A disclaimer does not
eliminate statutory liability.

## 4. Withdrawal and returns

Required before any distance sale: withdrawal information, model withdrawal
form, refund-timing and method, return-cost allocation, and a lawful policy for
sealed and digital goods. Suppressing the withdrawal right without a valid legal
exception is prohibited. A "no returns" or "final sale" statement is prohibited
where the statutory right applies.

## 5. Subscriptions and digital services

Subscription terms must state duration, renewal, price changes, cancellation
mechanics, support period, service termination, what becomes inaccessible after
expiry and what remains exportable. "Lifetime", "free forever", "cancel
anytime", "guaranteed updates" and similar phrases require matching mechanics
and evidence; none exists.

## 6. Bundles

Bundles combine goods, digital content and services. The applicable conformity
regime, withdrawal treatment, termination and refund allocation must be defined
per bundle. A bundle may not be presented as purchasable while any included
product is unavailable; PILOT-containing bundles can never be sold while the
safety gate is blocked.

## 7. Required internal templates

| Template | Purpose | Status |
|---|---|---|
| `TPL-01` | Consumer terms of sale ES/EN | DRAFT_REQUIRED |
| `TPL-02` | B2B sales terms ES/EN | DRAFT_REQUIRED |
| `TPL-03` | Digital subscription terms ES/EN | DRAFT_REQUIRED |
| `TPL-04` | Installer agreement and commissioning record | DRAFT_REQUIRED |
| `TPL-05` | Returns and cancellation policy | DRAFT_REQUIRED |
| `TPL-06` | Warranty and RMA workflow | DRAFT_REQUIRED |
| `TPL-07` | Service termination and data-export terms | DRAFT_REQUIRED |
| `TPL-08` | Distributor/reseller agreement | DRAFT_REQUIRED |

All templates are internal drafts. Nothing may be published or accepted
contractually without counsel review, the legal identity and commercial
authorisation (`DEC-MC14-016`).

## 8. Prohibited consumer practices

- Presenting a commercial warranty as a substitute for the legal guarantee.
- Suppressing or discouraging the withdrawal right without a valid exception.
- Using pre-ticked consent, dark patterns or hidden costs.
- Stating availability, delivery or price that does not exist.
- Using disclaimers to disguise unsupported factual claims.
- Relying on an installer or distributor agreement to reduce consumer rights.

## 9. Evidence status and unknown rates

No consumer terms, warranty, return policy, RMA workflow or approved price list
exists. The real return rate, failure rate and repair cost are `UNKNOWN`. The
consumer template set is a prerequisite for `GATE-CONSUMER-TERMS` and
`GATE-LEGAL-ENTITY`, both `BLOCKED`.
