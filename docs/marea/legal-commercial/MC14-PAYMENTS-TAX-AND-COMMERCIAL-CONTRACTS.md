# MC-14 — Payments, tax and commercial contracts

| Field | Value |
|---|---|
| Deliverable | D11 `MC14-PAYMENTS-TAX-AND-COMMERCIAL-CONTRACTS.md` |
| Milestone | MC-14/36 |
| Date | 2026-11-02 |
| Owner | Programme Lead / Finance Lead (role, not a person) |
| Machine data | `data/release-evidence-gates.json`; risks `PAY-*`; MC-13 legal-tax inputs |
| Status | NO MERCHANT AGREEMENT, NO APPROVED CHECKOUT, NO TAX CONFIRMATION |

## 1. Payment model

The intended model is hosted/tokenised: the payment provider collects and
tokenises card data, and EMBARCARTE never stores card data. This reduces PCI scope
but does **not** remove the need to:

- execute a merchant agreement and complete onboarding;
- identify the payment-service role and the SCA treatment (PSD2/SCA RTS);
- configure refunds, chargebacks, reserves and fraud screening;
- test the checkout, webhook recovery and failure/expiry flows;
- align checkout and refund terms with the hosted model.

MC-13's 1.5% card fee and 30% app-store commission are **published tariffs /
planning inputs**, not executed merchant agreements.

## 2. Subscription billing

Before any subscription sale, the consumer must see renewal terms, price,
frequency, cancellation mechanics and consequences (including data access)
before being bound, and renewal notices must be implemented where required.
"Cancel anytime", "no commitment", "lifetime" and similar phrases are prohibited
unless the mechanics and terms match exactly. See `CONS-OB-10`.

## 3. Refunds, chargebacks and fraud

Refund timing, chargeback liability, reserves and fraud screening are not agreed
with any provider and are not modelled. Consumer law imposes refund deadlines the
current process cannot meet. The chargeback exposure is `UNKNOWN`.

## 4. VAT, OSS, customs and invoicing

- Spanish general VAT is 21%; the 21% assumption holds for Spanish consumers
  only.
- Cross-border B2C supplies are taxed at the consumer's Member State rate; OSS
  registration/evaluation is required for eligible supplies.
- B2B intra-EU services generally use the reverse-charge mechanism; the invoice
  must reflect it.
- Import VAT and customs treatment depend on the supply model and Incoterms,
  which do not exist.
- Invoice content and the legal identity of the seller must be verified.

These are tax conclusions that require individual business facts and
professional confirmation. The register flags them; it does not decide them
(`PAY-05`, `DEC-MC14-013`).

## 5. Contract set

| Contract | Purpose | Status |
|---|---|---|
| Consumer terms of sale | B2C distance sale, withdrawal, guarantee, returns | DRAFT_REQUIRED |
| B2B sales terms | Professional supply, risk, payment, liability | DRAFT_REQUIRED |
| Digital subscription terms | Service, renewal, termination, data export | DRAFT_REQUIRED |
| Installer agreement | Installation, commissioning, responsibility | DRAFT_REQUIRED |
| Distributor agreement | Territory, channel, conformity cooperation | DRAFT_REQUIRED |
| Merchant/payment agreement | Hosted/tokenised payments | NOT_EXECUTED |
| Supplier/manufacturing contracts | BOM, quotations, conformity representations | NOT_EXECUTED |

A single template for B2C and B2B is not acceptable. The contracts must preserve
mandatory consumer rights, define liability allocation, and not impose unlawful
restrictions.

## 6. Operational restrictions

- No checkout, price or subscription CTA may be enabled before
  `GATE-PAYMENTS`, `GATE-PRICING`, `GATE-CONSUMER-TERMS` and
  `GATE-LEGAL-ENTITY` are open.
- No card data may be stored; no client-side price/stock override.
- Refund, withdrawal and complaint information must be reachable before the
  order.
- The existing sample shop must be disabled or clearly separated from MAREA
  before any publication.

## 7. Unknowns

Merchant terms, chargeback exposure, fraud rate, tax treatment for each supply
model, invoice template, OSS decision and import VAT treatment are all
`UNKNOWN`. Nothing in this document authorises a payment flow or a price.
