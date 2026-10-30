---
name: marea-angular-commerce
description: "Change or review the Angular 21 SSR commerce site without breaking prerender, hydration, typed localization routes, server-authoritative pricing or existing indexed URLs. Trigger for any route, i18n, SSR, shop, cart, checkout, account, admin, SEO or product-data change in the embarcarte repository."
whenToUse: "Use before touching src/app routes/components, src/server api, localization dictionaries, render modes, product data or SEO, and when reviewing MAREA page implementations on this branch."
metadata:
  version: "1.0.0"
  source: "src/app/core/i18n/locale-routes.ts"
---

# MAREA Angular Commerce

Preserve the existing Angular 21 SSR commerce architecture. This repo is the seller site;
MAREA catalog pages and the existing EMBARCARTE shop must coexist without breaking indexed URLs.

## Verified architecture to respect

- Angular `^21.2.0`, `@angular/ssr ^21.2.29`, `@angular/build` application builder, Express 5,
  `node:sqlite` (`src/server/db.ts`, `DatabaseSync`).
- Typed localization: `src/app/core/i18n/locale-routes.ts` (`LOCALIZED_ROUTES`, `RouteId`, `matchRoute`,
  `alternateUrl`) is the ONLY list of public URLs. ES paths are already indexed and must not move.
  Dictionaries: `src/app/i18n/es.ts`, `src/app/i18n/en.ts`, keys checked by `scripts/check-i18n.mjs`.
- Rendering: `src/app/app.routes.server.ts` assigns Prerender / Server / Client per route.
  Static content = Prerender; DB-backed shop = Server; private areas = Client; unknown = Server 404.
- Hydration pattern: `src/app/features/shop/shop-detail.ts` — TransferState key, `isPlatformServer`,
  `RESPONSE_INIT` status, hydrate without refetching.
- Server-authoritative commerce: `src/server/api.ts` (`/api/shop/products`, `/api/orders`, `/api/auth/*`,
  rate limits), stock/price validated server-side; Stripe hosted Checkout + webhook (`src/server/stripe.ts`);
  no card data stored.
- SEO: `src/app/core/seo.service.ts` + `scripts/check-seo.mjs`; canonical/hreflang reciprocity,
  no alternate advertised for unpublished translations.

## Procedure

1. Read the route registry, target feature and matching server route before editing.
2. Add a semantic `RouteId` plus ES/EN paths to `LOCALIZED_ROUTES`, then add both routes in
   `app.routes.ts` reusing ONE component for both locales.
3. Add the `serverRoutes` entry in `app.routes.server.ts` with the right RenderMode: Prerender for
   static MAREA pages, Server for DB-backed/purchasable pages, Client for private areas.
4. Keep presentation independent from inventory. New product data needs: stable id, localized text,
   editions, compatibility, inclusions/exclusions, legal notices, lifecycle/readiness, optional SKU
   references, pricing provenance — never derive a Product offer from an unapproved price hypothesis.
5. For commerce: validate price/stock/ownership on the server; hosted/tokenized payment only; keep
   order ownership checks and stock restoration intact.
6. Run the verified gates (see `AGENTS.md`): `npm run build`, `test:i18n`, `test:commerce`, `test:seo`,
   `test:e2e` (Playwright needs Chromium installed); `npm test` is NOT defined.
7. Record evidence: files changed, routes added, render mode chosen and why, commands run with results.

## Hard rules

- No duplicated ES/EN component implementations; one presentation component per page, localized by
  `LocaleService`/`TranslationService`.
- Never trust client-supplied prices, stock, totals or order states; never persist card data; never
  expose vessel operational controls through commerce endpoints.
- Do not delete, rename or redirect indexed pages wholesale; validate collisions and canonical/hreflang
  reciprocity before adding routes, and keep private (account/admin) routes separate from public ones.
- Keep SSR-safe: no direct `window`/`document`/`localStorage` at module scope or during server render.
- No speculative microservices; no new dependency without explicit justification and supply-chain audit.
- Do not change production secrets/configuration and do not deploy. Respect other agents' write scopes.

## Input/output contract

- Input: page/feature/route request, affected locale(s), purchasable vs quote/coming-soon state.
- Output: files changed, `RouteId`(s) + ES/EN paths, render-mode decision, server-side validation points,
  commands run with PASS/FAIL results, residual risks.
