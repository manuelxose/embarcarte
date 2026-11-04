import { Routes } from '@angular/router';
import { LandingPreview } from './landing-preview';
import { LandingPreviewNotFound } from './preview-not-found';
import { SegmentPreview } from './segment-preview';
import { SEGMENT_PREVIEW_ROUTES } from '../../src/app/marea-segments/models/segment-identity';

/**
 * Isolated preview routes.
 *
 * `/marea` and `/en/marea` emulate the future public landing paths, but only
 * inside this loopback-only application. The three MC-19 audience pages use the
 * internal namespace `internal/segments/*` because no public route is approved
 * for them (and none exists for `shipowners`).
 *
 * These routes are never mounted in the public application.
 */
const segmentRoutes: Routes = SEGMENT_PREVIEW_ROUTES.map((route) => ({
  path: route.path,
  component: SegmentPreview,
  data: { segment: route.segmentId, locale: route.locale },
}));

export const landingPreviewRoutes: Routes = [
  { path: '', pathMatch: 'full', component: LandingPreview, data: { locale: 'es' } },
  { path: 'marea', component: LandingPreview, data: { locale: 'es' } },
  { path: 'en/marea', component: LandingPreview, data: { locale: 'en' } },
  ...segmentRoutes,
  { path: '**', component: LandingPreviewNotFound },
];
