# MC-16 — Existing commerce architecture audit (D02)

| Field | Value |
|---|---|
| Deliverable | D02 `MC16-EXISTING-COMMERCE-ARCHITECTURE-AUDIT.md` |
| Milestone | MC-16/36 — MAREA commerce and product data model |
| Date | 2026-11-03 |
| Owner | governance-docs |
| Baseline commit | `99212a41f5942a6fef4ede75815132c11fa4de50` |
| Evidence class | `REPOSITORY_VERIFIED` (source inspection) + `LOCAL_SCRATCH_VERIFIED` (read-only probes) |
| Audit verdict | **Legacy shop is fit for its current generic-commerce purpose and must not be used as the MAREA commerce substrate.** |

## 1. Scope and method

This audit describes the **real, existing** shop that serves `embarcarte.com`
today: a Node 24 / Express 5 server in `src/server.ts`, an API router in
`src/server/api.ts`, a SQLite database opened with `node:sqlite`, Stripe Checkout
for card payment, and an Angular 21 SSR front end.

Every statement below was read from the frozen baseline commit. No legacy file was
edited. The eight files that define legacy commerce are hash-bound in D14; the
hashes still match. The audit is deliberately *not* a redesign: its purpose is to
establish exactly what must be preserved and why it cannot be extended into MAREA
availability.

Files inspected:

| Area | Files |
|---|---|
| Server host | `src/server.ts` |
| API / commerce flow | `src/server/api.ts` |
| Database and schema | `src/server/db.ts` |
| Authentication | `src/server/auth.ts`, `src/server/google.ts` |
| Payments | `src/server/stripe.ts` |
| Shared client model | `src/app/core/models.ts`, `src/app/core/cart.service.ts` |
| Shop UI | `src/app/features/shop/shop-list.ts`, `shop-detail.ts`, `cart.ts` |
| Existing commerce gate | `scripts/check-commerce.mjs` |

## 2. Runtime and deployment architecture

- **Angular 21.2 SSR** with prerender and hydration; the Express app serves the
  prerendered browser output, the Angular server render and the API.
- **Express 5.1** in `src/server.ts`. Middleware order matters:
  1. request ID, security headers (CSP, `X-Content-Type-Options`, `X-Frame-Options`,
     `Referrer-Policy`, `Permissions-Policy`, HSTS in production) and structured
     request logging with method/path/status only — never cookies, bodies or
     customer data (`src/server.ts:85-119`);
  2. `/healthz` liveness and `/readyz` database readiness (`src/server.ts:121-134`);
  3. `/api` router (`src/server.ts:136`);
  4. `/uploads` static image serving (`src/server.ts:137`);
  5. dynamic `/sitemap.xml` (`src/server.ts:183-215`);
  6. static browser assets (`src/server.ts:220-232`);
  7. localized CSR shells for private routes (`/carrito`, `/cuenta`, `/admin`, …)
     marked `noindex, nofollow` (`src/server.ts:239-252`);
  8. Angular SSR handler and a generic error handler that logs no customer body
     (`src/server.ts:257-281`).
- **Startup side effects:** `ensureAdmin()`, `purgeExpiredSessions()` and a periodic
  session purge run when the server module is the entry point
  (`src/server.ts:287-300`).
- **No separate migration system.** Schema creation and in-place column additions
  happen when `src/server/db.ts` is imported (see §3).

## 3. Persistence architecture

`src/server/db.ts` creates a single SQLite database at
`$DATA_DIR/embarcarte.sqlite`, defaulting to `data/embarcarte.sqlite`, and enables
WAL and foreign keys (`src/server/db.ts:8-17`). The schema is executed inline with
`CREATE TABLE IF NOT EXISTS` on import (`src/server/db.ts:15-85`), followed by two
implicit migrations:

- four English copy columns are added to `products` if missing
  (`name_en`, `category_en`, `summary_en`, `description_en`) —
  `src/server/db.ts:87-90`;
- `users.google_id` is added if missing, with a partial unique index —
  `src/server/db.ts:93-95`.

Three sample products are seeded with `INSERT OR IGNORE` at price `0`, stock `0` and
`active = 0` (`src/server/db.ts:110-139`).

### 3.1 Tables and semantics

| Table | Columns (essential) | Constraints / notes |
|---|---|---|
| `users` | `id`, `email` (unique, NOCASE), `name`, `password_hash`, `role`, `phone`, `address`, `created_at`, `google_id` | `role IN ('customer','admin')`; `google_id` unique when not null |
| `sessions` | `token_hash` (PK), `user_id` FK, `expires_at` | Token is a SHA-256 hash; 30-day expiry; cascade delete with user |
| `products` | `id`, `slug` (unique), `name`, `category`, `summary`, `description`, `price_cents`, `stock`, `image`, `active`, timestamps, four `*_en` columns | `price_cents >= 0`, `stock >= 0`; integer minor units; **no VAT, currency, territory, channel, cost, approval, reservation or provenance column** |
| `orders` | `id`, `user_id` FK, `status`, `total_cents`, `payment_method`, shipping fields, `notes`, `stripe_session_id`, timestamps | `status IN ('pendiente','pagado','enviado','completado','cancelado')`; no currency or tax columns |
| `order_items` | `order_id` FK, `product_id` FK (`ON DELETE SET NULL`), `name`, `unit_cents`, `qty` | `qty > 0`; line name and unit price are **snapshotted** at order time |
| `messages` | `id`, `name`, `email`, `phone`, `topic`, `message`, `read`, `created_at` | Contact form only; no marketing consent ledger |

There is **no audit table, no price history, no stock-movement ledger, no
reservation table, no entitlement/subscription table, no organization/tenant table
and no release-gate/evidence table** in the legacy database.

### 3.2 Transactions

`transaction()` wraps work in `BEGIN IMMEDIATE` and rolls back on error
(`src/server/db.ts:98-108`). It serialises writers, which is why the legacy order
and cancellation paths cannot race each other on the same database file. It is not
a substitute for a reservation ledger with expiry or for an audit trail.

## 4. Public catalogue path

1. `GET /api/shop/products` returns only `active = 1` rows in `PUBLIC_PRODUCT`
   column order (`src/server/api.ts:313-317`).
2. `GET /api/shop/products/:slug` returns an `active = 1` row or `404`
   (`src/server/api.ts:319-326`).
3. `/tienda` and `/en/shop` are prerendered/SSR lists. `/tienda/:slug` and
   `/en/shop/:slug` render a detail page from the same API and transfer state for
   hydration (`shop-detail.ts:99-100, 183-212`).
4. The sitemap adds every `active = 1` product in Spanish, plus the English URL only
   when `name_en`, `category_en`, `summary_en` and `description_en` are all present
   (`src/server.ts:183-201`).
5. The detail page emits `Product` JSON-LD with `sku: product.slug`, an `Offer` with
   the admin `price_cents` and `availability` derived from admin `stock`
   (`shop-detail.ts:149-161`). This is the existing behaviour; it is also
   finding `WEB-014` / risk `CIT-02` because it turns admin-entered data into a
   public offer.

The client cart (`cart.service.ts`) is a `localStorage` list under `emb_cart` with a
client-side total. It is a convenience only: the order API re-reads every product
and recomputes the total.

## 5. `products.active` semantics (critical)

`products.active` is a **generic-catalogue switch**. It is the only field that
decides whether a row is exposed by the public list, the public detail endpoint and
the sitemap. It does **not** mean any of the following, and MC-16 must never treat
it as such:

| Claim | True? | Evidence |
|---|---|---|
| `active = 1` means the product is MAREA-ready | **No** | No readiness, lifecycle or gate field exists |
| `active = 1` means the price is approved | **No** | `price_cents` is free-form admin input, `>= 0`, no approver/evidence |
| `active = 1` means stock provenance exists | **No** | `stock` is a manually edited integer, no receipt or reservation record |
| `active = 1` means publication is authorized | **No** | No legal/market/claims gate is consulted anywhere |
| `active = 0` means the product is secret | **No** | Any DB reader or admin API can read it; "hidden" is not a security control |

The three seeded sample products (`open-marine-hub`, `open-marine-autopilot`,
`kit-ais-sdr`) are intentionally `active = 0`, `price_cents = 0`, `stock = 0`; they
are legacy samples, not MAREA products (D14).

## 6. Order and stock integrity

`POST /api/orders` (`src/server/api.ts:336-431`) requires a session, 1–50 items,
shipping name/address/phone, `terms === true` and a payment method of
`transferencia` or `tarjeta` (card only when Stripe is configured). Inside one
`BEGIN IMMEDIATE` transaction it:

1. re-reads each product by slug with `active = 1` and takes the server price and
   stock (`src/server/api.ts:357-359`);
2. rejects unknown products, quantities outside 1–99, duplicate product ids,
   insufficient stock and any client `price_cents` that differs from the server
   price (`src/server/api.ts:360-365`);
3. computes `total_cents` server-side from the authoritative unit prices
   (`src/server/api.ts:367`);
4. inserts the order and snapshotted line items, then decrements `products.stock`
   (`src/server/api.ts:368-384`).

Outside the transaction it emails the customer and the admin inbox, and for card
payment creates a Stripe Checkout session and stores its id
(`src/server/api.ts:395-430`). If Stripe fails, the pending order is cancelled and
stock restored (`src/server/api.ts:416-428`).

Cancellation and status changes are server-authoritative:
`admin.put('/orders/:id')` re-reads the order inside a transaction, restores stock
when moving to `cancelado`, and re-deducts stock when reactivating, refusing when
stock is insufficient (`src/server/api.ts:643-691`). The integration test proves two
concurrent cancellations restore stock exactly once
(`scripts/check-commerce.mjs:287-297`).

**What is genuinely server-authoritative:** price, total, stock decrement, order
ownership, payment state, admin authorization. **What is not modelled:** price
approval provenance, VAT basis, currency (always EUR), territory, sales channel,
stock provenance, reservation expiry, fulfilment capacity, audit history.

## 7. Stripe integration

`src/server/stripe.ts` uses hosted Stripe Checkout:

- enabled only when both `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` exist
  (`stripe.ts:3-4`);
- creates a `mode=payment` session with `client_reference_id` and
  `metadata[order_id]`, localized success/cancel URLs and dynamic
  `price_data` line items in **EUR** (`stripe.ts:13-45`);
- no card data is ever posted to or stored by the application; the card data stays
  inside Stripe Checkout;
- webhook verification is HMAC-SHA-256 over `${timestamp}.${rawBody}` with a
  300-second tolerance and `timingSafeEqual` (`stripe.ts:48-61`);
- the webhook is mounted **before** `express.json()` with `express.raw` so the
  signature is computed on the exact bytes (`api.ts:104-133`);
- only `checkout.session.completed` with `payment_status === 'paid'` marks an order
  `pagado`, and only when order id, stored `stripe_session_id`, `pendiente` status
  all match (`api.ts:118-124`);
- `checkout.session.expired` cancels the pending order and restores stock
  (`api.ts:125-131`).

Gaps relevant to any future MAREA use: no refund/chargeback handling, no Stripe
event log or idempotency table, no tax/VAT computation, no merchant-of-record or
invoice identity, no SCA analysis, no customer-facing payment-failure state machine.

## 8. Authentication and authorization

- Passwords: scrypt with per-user random salt, constant-time comparison
  (`auth.ts:21-32`); login verifies a dummy hash when the email does not exist to
  avoid a timing oracle (`api.ts:65-66, 172-186`).
- Sessions: 32 random bytes, stored only as SHA-256, `httpOnly`, `SameSite=Lax`,
  `Secure` in production, 30-day expiry (`auth.ts:36-51`).
- Authorization: `requireUser` returns 401, `requireAdmin` returns 401/403
  (`auth.ts:99-117`); `/api/admin` is mounted behind `requireAdmin`
  (`api.ts:494-496`); order reads return 404 for another user's order
  (`api.ts:449-456`).
- Google Identity Services: ID token verified server-side (signature, issuer,
  audience, expiry, `email_verified`); no automatic link to an unverified local
  account (`api.ts:193-266`).
- CSRF: `SameSite=Lax` plus an `Origin`-vs-`Host` check for non-GET requests
  (`api.ts:137-146`).
- Rate limiting: in-memory sliding window per IP and key (`api.ts:41-63`).

These controls are adequate for the current generic shop and are **not** a MAREA
authorization model: there is no role for price approver, gate closer, publication
approver, entitlement administrator or auditor, and no tenant dimension.

## 9. Preservation obligations

The following must remain functionally unchanged for the duration of MC-16 and
until a separately authorized integration milestone:

| Obligation | Evidence |
|---|---|
| Eight legacy commerce files unchanged | SHA-256 match against `data/legacy-commerce-mapping.json` (D14) |
| `products`, `orders`, `order_items`, `users`, `sessions`, `messages` unchanged | No MC-16 DDL/DML touches them; MC-16 tables have no FK into them |
| Existing orders not modified or deleted | No migration, no backfill, no status change |
| Checkout, Stripe keys, webhook verification unchanged | No change to `stripe.ts` or the order API |
| Cart semantics and localStorage key unchanged | No change to `cart.service.ts` |
| Public URLs, sitemap, robots, metadata unchanged | No route or SSR change |
| `tests:commerce`, `tests:seo`, `tests:i18n` remain valid | Legacy files untouched |
| Legacy database `data/embarcarte.sqlite` untouched | Isolated, git-ignored; MC-16 tooling must refuse it |

## 10. CIT risks (inherited and audit-discovered)

### 10.1 Inherited risks (MC-15 handoff §14)

| ID | Severity | Description | Gate(s) |
|---|---|---|---|
| CIT-01 | BLOCKING | Admin product row is the only offer source; activation would publish an unapproved price/stock. | PRC, CLM, MKT |
| CIT-02 | MAJOR | `Product`/`Offer` JSON-LD derives from admin price/stock and the "Open Marine" brand. | CLM, IPC |
| CIT-03 | MAJOR | Order email says "Gracias por tu pedido" before seller acceptance. | CON |
| CIT-04 | MAJOR | Registration consent is displayed but never stored. | PRI |
| CIT-05 | MAJOR | Shipping/installation is excluded from the cart total. | CON, PRC |
| CIT-06 | MAJOR | One checkbox bundles privacy acknowledgement with contractual acceptance; no model form. | CON, PRI |
| CIT-07 | MAJOR | Subscription/entitlement references are hypotheses; no ledger or billing exists. | CON, PRC, PAY |
| CIT-08 | MINOR | Sample catalogue must stay non-sale/noindex through any refactor. | — |
| CIT-09 | MINOR | Google Identity Services not disclosed in the cookie information. | LGE, PRI |
| CIT-10 | BLOCKING | Seller legal identity empty and publicly admitted as pending. | LGE |

### 10.2 Additional audit observations (this document)

| ID | Severity | Observation | Consequence | MC-16 treatment |
|---|---|---|---|---|
| AUD-CIT-11 | MAJOR | No audit trail for admin catalogue changes; `PUT /admin/products/:id` overwrites price, stock and `active` with no actor/reason/history (`api.ts:568-590`). | Price/stock changes are unattributable; cannot satisfy a commerce audit requirement. | MAREA schema adds append-only, hash-chained events (D12); legacy untouched. |
| AUD-CIT-12 | MAJOR | `POST /api/orders` has no idempotency key; a double submit creates two pending orders and reserves stock twice. | Duplicate orders and stock holds. | MAREA model separates reservation from order creation and requires correlation ids; legacy untouched. |
| AUD-CIT-13 | MAJOR | Bank-transfer orders stay `pendiente` indefinitely; nothing expires their stock reservation. Only Stripe session expiry restores stock. | Stock can be held forever by unpaid transfer orders. | MAREA reservations require expiry/state machine (D09); legacy untouched. |
| AUD-CIT-14 | MINOR | `price_cents >= 0` permits a zero-price active product that could be ordered for free. | Accidental free sale via admin error. | MAREA price approval requires a non-null integer approved amount plus evidence; unknown is null, not zero (D08). |
| AUD-CIT-15 | MINOR | `DELETE /admin/products/:id` deletes the row; `order_items.product_id` becomes NULL (name/price snapshot survives) and the public URL disappears immediately. | Catalogue identity is not durable; no soft delete or audit. | MAREA editions are never deleted while referenced; retired state instead (D06). |
| AUD-CIT-16 | MINOR | Stock decrement is not a reservation ledger: no quantity-on-hand vs reserved split, no movement history. | Cannot reconcile stock or prove fulfilment. | MAREA inventory ledger with movements (D09). |
| AUD-CIT-17 | MINOR | In-memory rate limiting resets on process restart and is per instance. | Weak abuse resistance under restart/scale-out. | Out of MC-16 scope; recorded as inherited operational debt (D16). |
| AUD-CIT-18 | MINOR | CSRF origin check is skipped when the `Origin` header is absent; protection then relies on `SameSite=Lax` only. | Residual cross-site risk for non-browser clients. | Out of MC-16 scope; legacy unchanged. |

None of these findings authorizes a change to the legacy shop in MC-16. They are
recorded so that a future integration milestone does not mistake the existing
implementation for a MAREA-grade commerce backend.

## 11. What must not be inferred

| Legacy fact | Invalid inference |
|---|---|
| `products.active = 1` | Product is ready, priced, stocked, compliant or publishable |
| `price_cents` value | Approved price, VAT-inclusive price, or an offer |
| `stock` value | Verified inventory, fulfilment capacity or a delivery promise |
| `orders.status = 'pagado'` | Money settled, invoice issued, or consumer withdrawal period handled |
| Product JSON-LD `Offer` | Authorized commercial offer |
| Seed sample products | MAREA products or a MAREA catalogue |
| Passing `npm run test:commerce` | External legal, safety, market or payment approval |

## 12. Audit conclusion

The legacy shop is a compact, mostly well-defended generic storefront: server-side
price and stock validation, hosted card payment, signed webhooks, ownership checks
and transactional stock changes are all present and tested. It has **no** readiness
model, gate evidence, approved-price provenance, inventory ledger, audit trail,
tenancy or entitlement model, and its publication switch (`products.active`) is
purely administrative.

MC-16 therefore treats the legacy shop as a **preserved, separate system**:

- it supplies no MAREA identity, price, stock or availability;
- it receives no MAREA schema, migration or seed;
- its eight defining files, its database and its public behaviour remain unchanged;
- a future integration must be additive, server-authoritative, gated by external
  evidence and reversible (D17).

Verdict: **LEGACY_COMMERCE_PRESERVED_SEPARATE_NOT_A_MAREA_SUBSTRATE**.
