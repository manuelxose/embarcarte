import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { landingPreviewRoutes } from './app.routes';

/** Preview-only application config. No HTTP, no auth, no external service. */
export const previewConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      landingPreviewRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' }),
    ),
    provideClientHydration(),
  ],
};
