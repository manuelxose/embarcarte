import { RenderMode, ServerRoute } from '@angular/ssr';
import { SEGMENT_PREVIEW_ROUTES } from '../../src/app/marea-segments/models/segment-identity';

/**
 * SSR is proved per request for both preview locales and every internal segment
 * path; unknown paths return 404. Nothing here is prerendered: the preview is
 * loopback-only and must not produce a static, indexable artefact.
 */
const segmentServerRoutes: ServerRoute[] = SEGMENT_PREVIEW_ROUTES.map((route) => ({
  path: route.path,
  renderMode: RenderMode.Server,
}));

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server },
  { path: 'marea', renderMode: RenderMode.Server },
  { path: 'en/marea', renderMode: RenderMode.Server },
  ...segmentServerRoutes,
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
