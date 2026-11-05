import { RenderMode, ServerRoute } from '@angular/ssr';
import { CATALOG_PREVIEW_ROUTES } from '../../src/app/marea-catalog/models/catalog-identity';
import { BUNDLE_PREVIEW_ROUTES } from '../../src/app/marea-catalog/models/bundle-identity';
import { CONFIGURATOR_PREVIEW_ROUTES } from '../../src/app/marea-catalog/models/configurator-identity';
import { GOVERNANCE_PREVIEW_ROUTES } from '../../src/app/marea-catalog/models/governance-identity';

/**
 * SSR is proved per request for both preview locales and every internal
 * catalogue path; unknown paths return 404. Nothing here is prerendered: the
 * preview is loopback-only and must not produce a static, indexable artefact.
 *
 * MC-25: the bundle comparison routes were registered in the client route table
 * but NOT here, so they fell into the `**` 404 server route and answered 404
 * while rendering. Every preview page now has an explicit Server entry, and the
 * validator compares the two route tables so a future page cannot repeat it.
 */
const catalogServerRoutes: ServerRoute[] = CATALOG_PREVIEW_ROUTES.map((route) => ({
  path: route.path,
  renderMode: RenderMode.Server,
}));

const bundleServerRoutes: ServerRoute[] = BUNDLE_PREVIEW_ROUTES.map((route) => ({
  path: route.path,
  renderMode: RenderMode.Server,
}));

const configuratorServerRoutes: ServerRoute[] = CONFIGURATOR_PREVIEW_ROUTES.map((route) => ({
  path: route.path,
  renderMode: RenderMode.Server,
}));

const governanceServerRoutes: ServerRoute[] = GOVERNANCE_PREVIEW_ROUTES.map((route) => ({
  path: route.path,
  renderMode: RenderMode.Server,
}));

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server },
  { path: 'marea', renderMode: RenderMode.Server },
  { path: 'en/marea', renderMode: RenderMode.Server },
  ...catalogServerRoutes,
  ...bundleServerRoutes,
  ...configuratorServerRoutes,
  ...governanceServerRoutes,
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
