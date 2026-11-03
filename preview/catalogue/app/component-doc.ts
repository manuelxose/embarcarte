import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { COMPONENT_REGISTRY, type MareaRegistryComponent } from './registry.generated';

/**
 * Renders the documented contract of one registered component beside its live
 * specimen. Preview-only: never part of the design-system package.
 */
@Component({
  selector: 'marea-component-doc',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'component-doc' },
  template: `
    @if (entry(); as doc) {
      <details open>
        <summary>
          <span class="name">{{ doc.componentId }}</span>
          <span class="status">{{ doc.status }}</span>
        </summary>
        <div class="body">
          <p class="purpose">{{ doc.purpose }}</p>
          <dl class="meta">
            <dt>Semántica</dt>
            <dd>{{ doc.semanticElement }}</dd>
            <dt>Selector</dt>
            <dd><code>{{ doc.selector }}</code></dd>
            <dt>Modos</dt>
            <dd>{{ doc.supportedModes.join(', ') }}</dd>
            <dt>Variantes</dt>
            <dd>{{ doc.visualVariants.join(' · ') }}</dd>
            <dt>Responsive</dt>
            <dd>{{ doc.responsiveRules }}</dd>
          </dl>

          <h4>Entradas</h4>
          @if (doc.inputs.length === 0) {
            <p class="none">Sin entradas.</p>
          } @else {
            <div class="table-scroll" role="region" tabindex="0" [attr.aria-label]="'Entradas de ' + doc.componentId">
              <table>
                <thead>
                  <tr><th scope="col">Nombre</th><th scope="col">Tipo</th><th scope="col">Obligatoria</th><th scope="col">Por defecto</th><th scope="col">Descripción</th></tr>
                </thead>
                <tbody>
                  @for (input of doc.inputs; track input.name) {
                    <tr>
                      <td><code>{{ input.name }}</code></td>
                      <td><code>{{ input.type }}</code></td>
                      <td>{{ input.required ? 'Sí' : 'No' }}</td>
                      <td><code>{{ input.defaultValue ?? '—' }}</code></td>
                      <td>{{ input.description }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }

          <h4>Salidas</h4>
          @if (doc.outputs.length === 0) {
            <p class="none">Sin salidas: el componente no emite eventos propios.</p>
          } @else {
            <ul>
              @for (output of doc.outputs; track output.name) {
                <li><code>{{ output.name }}</code> · <code>{{ output.type }}</code> — {{ output.description }}</li>
              }
            </ul>
          }

          <h4>Estados</h4>
          <ul class="states">
            @for (state of states(); track state[0]) {
              <li><strong>{{ state[0] }}</strong>: {{ state[1] }}</li>
            }
          </ul>

          <h4>Accesibilidad</h4>
          <dl class="meta">
            <dt>Teclado</dt><dd>{{ doc.keyboardContract }}</dd>
            <dt>Foco</dt><dd>{{ doc.focusContract }}</dd>
            <dt>ARIA y semántica</dt><dd>{{ doc.ariaContract }}</dd>
            <dt>Idioma</dt><dd>{{ doc.localizationRequirements }}</dd>
          </dl>

          <h4>Tokens</h4>
          <p class="tokens"><code>{{ doc.tokenDependencies.join(' · ') }}</code></p>

          <h4>Restricciones comerciales</h4>
          <ul>
            @for (restriction of doc.commercialRestrictions; track $index) {
              <li>{{ restriction }}</li>
            }
          </ul>

          <h4>Uso</h4>
          <pre><code>{{ doc.usage }}</code></pre>

          <h4>Limitaciones conocidas</h4>
          <ul>
            @for (limitation of doc.knownLimitations; track $index) {
              <li>{{ limitation }}</li>
            }
          </ul>

          <p class="tests">Pruebas: <code>{{ doc.testReferences.join(' · ') }}</code></p>
        </div>
      </details>
    } @else {
      <p class="missing">Componente no registrado: {{ componentId() }}</p>
    }
  `,
  styles: `
    :host { display: block; margin-block-start: 16px; color: var(--marea-text-primary); }
    details { border: 1px solid var(--marea-line); border-radius: 6px; background: var(--marea-surface); }
    summary { display: flex; gap: 12px; align-items: baseline; padding: 10px 14px; cursor: pointer; font-weight: 700; font-size: 13px; }
    summary:focus-visible { outline: 3px solid var(--marea-focus-ring); outline-offset: 2px; }
    .name { font-family: ui-monospace, SFMono-Regular, Consolas, monospace; }
    .status { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; color: var(--marea-state-info); }
    .body { padding: 4px 14px 16px; font-size: 13px; line-height: 1.55; }
    .purpose { margin: 0 0 10px; max-inline-size: 80ch; overflow-wrap: anywhere; }
    h4 { margin: 16px 0 6px; font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--marea-text-secondary); }
    dl.meta { display: grid; grid-template-columns: minmax(90px, 140px) minmax(0, 1fr); gap: 2px 12px; margin: 0; }
    dl.meta dt { font-weight: 700; overflow-wrap: anywhere; }
    dl.meta dd { margin: 0; min-inline-size: 0; overflow-wrap: anywhere; }
    .table-scroll { overflow-x: auto; max-inline-size: 100%; }
    table { inline-size: 100%; border-collapse: collapse; font-size: 12px; }
    th, td { text-align: start; padding: 6px 8px; border-block-end: 1px solid var(--marea-line); vertical-align: top; overflow-wrap: anywhere; }
    th { background: var(--marea-surface-raised); }
    ul { margin: 0; padding-inline-start: 18px; }
    .none { margin: 0; }
    .tokens code { overflow-wrap: anywhere; }
    .tests { color: var(--marea-text-secondary); }
    .missing { color: var(--marea-state-critical); font-weight: 700; }
  `,
})
export class MareaComponentDoc {
  readonly componentId = input.required<string>();

  readonly entry = computed<MareaRegistryComponent | undefined>(() => COMPONENT_REGISTRY.find((candidate) => candidate.componentId === this.componentId()));
  readonly states = computed<readonly [string, string][]>(() => Object.entries(this.entry()?.states ?? {}));
}
