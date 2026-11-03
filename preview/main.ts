import { bootstrapApplication } from '@angular/platform-browser';
import { CatalogueApp } from './catalogue/app/catalogue';

bootstrapApplication(CatalogueApp).catch((error: unknown) => {
  // The catalogue is an internal development tool: surface the failure instead of failing silently.
  console.error('MC-17 internal catalogue failed to bootstrap', error);
});
