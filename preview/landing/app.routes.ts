import { Routes } from '@angular/router';
import { LandingPreview } from './landing-preview';
import { LandingPreviewNotFound } from './preview-not-found';

/**
 * Isolated preview routes.
 *
 * `/marea` and `/en/marea` emulate the future public paths, but only inside
 * this loopback-only application. The root alias exists for developer
 * convenience and is documented as a preview artefact. These routes are never
 * mounted in the public application.
 */
export const landingPreviewRoutes: Routes = [
  { path: '', pathMatch: 'full', component: LandingPreview, data: { locale: 'es' } },
  { path: 'marea', component: LandingPreview, data: { locale: 'es' } },
  { path: 'en/marea', component: LandingPreview, data: { locale: 'en' } },
  { path: '**', component: LandingPreviewNotFound },
];
