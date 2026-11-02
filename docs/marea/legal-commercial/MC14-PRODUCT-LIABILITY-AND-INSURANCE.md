# MC-14 — Product liability and insurance

| Field | Value |
|---|---|
| Deliverable | D12 `MC14-PRODUCT-LIABILITY-AND-INSURANCE.md` |
| Milestone | MC-14/36 |
| Date | 2026-11-02 |
| Owner | Programme Lead / Finance Lead (role, not a person) |
| Machine data | `data/liability-insurance.json`; risks `LIA-*` |
| Status | NO INSURANCE — premium, limits and exclusions `UNKNOWN`; no broker contacted |

## 1. Legal framework

The revised Product Liability Directive (EU) 2024/2853 covers software and
digital products, extends liable operators (including importers, authorised
representatives and fulfilment service providers) and introduces presumptions of
defect and causation for complex products. Transposition is due by 2026-12-09;
the May 2026 corrigendum corrects the temporal scope to products placed on the
market after 2026-12-08. The Spanish transposition instrument was not retrieved
and must be confirmed by counsel.

A disclaimer does not eliminate statutory liability. Contractual caps cannot
reduce consumer rights; they may allocate risk between businesses within legal
limits.

## 2. Liability scenarios (13 mapped)

Electrical fault/fire; installation defect; product malfunction; incorrect sensor
measurement; AIS reception limitation; chart/navigation data error; weather data
error; remote monitoring or missed/delayed alert; cybersecurity failure; unsafe
steering (PILOT); software-update regression; defective connected product; and
the absence of any insurance cover.

For each scenario the register records the legal responsibility, exposed
economic operator, product families, claim severity, control requirements,
evidence required, potential contract provisions, insurance category, residual
risk, release gate and linked risks.

## 3. Highest-severity exposures

| Scenario | Why severe | Control requirement |
|---|---|---|
| PILOT steering (`LIA-10`) | Catastrophic injury; uncapped no-fault liability; product cannot be sold | Safety case, E-stop, sea trials, independent verification, insurance |
| Chart/navigation error (`LIA-06`) | Grounding with injury/loss; safety expectations | Licensed data or explicit user-supplied-chart model, provenance, disclaimers |
| Remote monitoring/alert failure (`LIA-08`) | Safety-of-life expectations without any guarantee | Measured delivery, coverage limits, no-guarantee disclaimer |
| Cybersecurity failure (`LIA-09`) | Unauthorised control, data breach, regulatory action | Authentication, penetration test, incident response |
| Electrical fault (`LIA-01`) | Fire/shock injury | Electrical safety test, protection specification, installation limits |
| No cover (`LIA-13`) | Every exposure is retained by the company | Broker indication and explicit residual-risk acceptance |

## 4. Insurance status

- Product liability, cyber, professional indemnity and D&O: **no policy**.
- Premium, limits, deductibles, exclusions, territory and retroactive date:
  `UNKNOWN`.
- The broker has **not** been contacted. The requirements package in
  `liability-insurance.json` is prepared for a future authorised specialist
  review; it is not a request for cover.
- The MC-13 premium remains `UNKNOWN`; no premium may be estimated as a
  percentage of revenue.
- PILOT may be uninsurable before safety evidence exists; that is a residual
  risk, not a reason to sell.

## 5. Insurance requirements package

The package asks the future broker: whether software/SaaS is a covered product;
whether cover extends to recreational and professional vessels, including
offshore use; treatment of pure economic loss and contractual penalties;
exclusions for navigation/steering or safety-related products; worldwide
territory; retroactive date and claims-made trigger; regulatory defence costs and
insurability of GDPR fines; and the information required for PILOT.

## 6. Residual risk statement

With no insurance, every liability scenario is fully retained by EMBARCARTE.
Operating without cover requires an explicit, documented residual-risk
acceptance by the company owner after broker indications; it cannot be inferred
from this register, a financial model or a disclaimer. Until then
`GATE-INSURANCE` stays `BLOCKED` and products with material liability exposure
remain `NOT_FOR_SALE`.

## 7. Honest limitation

This document maps potential liability. It is not a legal opinion on
defectiveness, causation or damages, and it does not represent that any cover
exists or can be obtained.
