import { Routes } from '@angular/router';
import { LandingPreview } from './landing-preview';
import { LandingPreviewNotFound } from './preview-not-found';
import { CatalogPreview } from './catalog-preview';
import { BundlePreview } from './bundle-preview';
import { CATALOG_PREVIEW_ROUTES } from '../../src/app/marea-catalog/models/catalog-identity';
import { BUNDLE_PREVIEW_ROUTES } from '../../src/app/marea-catalog/models/bundle-identity';

/**
 * Isolated preview routes.
 *
 * `/marea` and `/en/marea` emulate the future public paths, but only inside
 * this loopback-only application. The root alias exists for developer
 * convenience and is documented as a preview artefact. The MC-20..MC-22
 * catalogue pages and the MC-23 bundle comparison use the internal namespace
 * `internal/catalog/*` because no public route is approved for them: every
 * MC-15 proposed family route stays `PROPOSED_INTERNAL_NOT_DEPLOYABLE`.
 *
 * These routes are never mounted in the public application.
 */
const catalogRoutes: Routes = CATALOG_PREVIEW_ROUTES.map((route) => ({
  path: route.path,
  component: CatalogPreview,
  data: { family: route.familyId, locale: route.locale },
}));

const bundleRoutes: Routes = BUNDLE_PREVIEW_ROUTES.map((route) => ({
  path: route.path,
  component: BundlePreview,
  data: { locale: route.locale },
}));

export const landingPreviewRoutes: Routes = [
  { path: '', pathMatch: 'full', component: LandingPreview, data: { locale: 'es' } },
  { path: 'marea', component: LandingPreview, data: { locale: 'es' } },
  { path: 'en/marea', component: LandingPreview, data: { locale: 'en' } },
  ...catalogRoutes,
  ...bundleRoutes,
  { path: '**', component: LandingPreviewNotFound },
];
