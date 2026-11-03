import { bootstrapApplication } from '@angular/platform-browser';
import { PreviewShell } from './preview-shell';
import { previewConfig } from './app.config';

bootstrapApplication(PreviewShell, previewConfig).catch((error: unknown) => {
  console.error('MC-18 internal landing preview failed to bootstrap', error);
});
