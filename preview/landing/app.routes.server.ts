import { RenderMode, ServerRoute } from '@angular/ssr';

/** SSR is proved per request for both preview locales; unknown paths return 404. */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server },
  { path: 'marea', renderMode: RenderMode.Server },
  { path: 'en/marea', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
