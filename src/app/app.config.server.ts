import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { API_ORIGIN } from './core/api-origin.interceptor';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    { provide: API_ORIGIN, useValue: `http://127.0.0.1:${process.env['PORT'] || 4000}` },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
