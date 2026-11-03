import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { PreviewShell } from './preview-shell';
import { config } from './app.config.server';

const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(PreviewShell, config, context);

export default bootstrap;
