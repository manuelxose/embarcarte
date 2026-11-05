import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Isolated preview 404. No public route is reachable from this application. */
@Component({
  selector: 'marea-preview-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="not-found">
      <h1>404 · Internal preview</h1>
      <p>This internal preview only serves <code>/marea</code> and <code>/en/marea</code>.</p>
      <p lang="es">
        Esta previsualización interna solo sirve <code>/marea</code> y <code>/en/marea</code>.
      </p>
      <p><a href="/marea">Volver a la vista interna / Back to the internal view</a></p>
    </main>
  `,
  styles: `
    .not-found {
      max-inline-size: 60ch;
      margin: 10vh auto;
      padding: 2rem;
      font-family: 'DM Sans Variable', 'DM Sans', system-ui, sans-serif;
      color: #17365d;
    }
    h1 {
      font-family: 'Manrope Variable', Manrope, system-ui, sans-serif;
    }
  `,
})
export class LandingPreviewNotFound {}
