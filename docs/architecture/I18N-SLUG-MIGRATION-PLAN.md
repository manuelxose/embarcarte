# International slug migration — future plan (not executed in M03)

Status: **plan only**. M03 deliberately kept every published slug unchanged. This
document records what a translated-slug migration would involve and why it is not
free, so a later milestone can decide with the numbers in front of it.

## 1. Current model

A slug is the entity identity, identical in both languages:

| Entity | Spanish | English |
| --- | --- | --- |
| Technology module | `/tecnologia/navegador` | `/en/technology/navegador` |
| Guide | `/guias/que-es-signal-k` | `/en/guides/que-es-signal-k` |
| Shop product | `/tienda/:slug` | `/en/shop/:slug` |
| Sample | `/tienda/muestra/:slug` | `/en/shop/sample/:slug` |

`LOCALIZED_ROUTES` (`src/app/core/i18n/locale-routes.ts`) holds a single `:slug`
placeholder per detail route, so one parameter serves both locales:
`localizedUrl('technologyDetail', 'en', { slug })` reuses the same value.

Content models own the identity (`TECHNOLOGY_IDENTITY`, `GUIDE_SLUGS`) and the
localized text separately. `matchRoute()` and `alternateUrl()` translate the URL
by swapping the *route*, keeping the *parameters*.

## 2. What a translated-slug migration would change

The parameter would have to become locale-dependent. `LOCALIZED_ROUTES` would
need one slug per locale per entity, i.e. identity splits into `{ es: slugEs, en: slugEn }`
and every caller of `localizedUrl()`/`matchRoute()` follows: routes, prerender
parameter lists, breadcrumbs, structured data, the sitemap, and the language
switcher. The 30 guides and 6 technology modules already carry translated titles,
so English slugs exist editorially but are not published anywhere.

## 3. SEO risks

1. **Every English URL changes at once.** The 36 English detail URLs are already
   indexed and carry `hreflang` pairs; a silent rename turns them into 404s and
   loses the ranking of the English page.
2. **Split signals during the transition.** If both the old and the new English
   URL answer 200, Google sees two English documents with near-identical content
   and picks one arbitrarily.
3. **`hreflang` inside a redirect chain.** An alternate must point at a canonical
   200 URL, not at a 301 — so the sitemap and the link tags must be updated in the
   same release as the redirect, not before.
4. **Spanish URLs are the ones with accumulated authority.** Any mapping mistake
   that redirects a Spanish URL towards an English one moves equity across
   languages, which is worse than leaving the slug alone.
5. **Sitemap churn.** A single regenerated sitemap that drops the old URLs and
   adds the new ones gives search engines no chance to follow the mapping;
   keeping old loc entries temporarily alongside the 301s is safer.

## 4. Redirect strategy that would be required

1. Publish the new English slugs with a **permanent 301** from the old path to the
   new one, one hop, preserving the query string and the fragment.
2. Keep the redirect map as data (`{ old: '/en/guides/x', new: '/en/guides/x-en' }`)
   served by the Express layer *before* the SSR handler, and emit the redirect in
   `app.routes.server.ts` so prerendering also sees it.
3. Keep each old URL in the sitemap for one crawl cycle with the new URL as its
   `hreflang` target, then drop it.
4. Update `LOCALIZED_ROUTES` and the content models in the same commit as the
   redirect map, so `alternateUrl()` can never produce a path that 404s.
5. Verify with a crawl: no 301 target may itself be a redirect, and every
   `hreflang` target must be a 200 with a self-referencing canonical.

## 5. Preconditions before doing it

- A crawl of the current index (Search Console coverage + rankings) to quantify
  what is at risk.
- A redirect table reviewed by a human, not generated from translated titles.
- The same test suite extended with a "no redirect chains" assertion and a
  "every alternate is 200" assertion — both are cheap to add to
  `scripts/check-commerce.mjs` once the redirect map exists.

## 6. Decision for M03

Not performed. The milestone keeps the contract of §1: identity is
language-independent, so `alternateUrl()` always maps to a published page and no
SEO equity moves between languages.
