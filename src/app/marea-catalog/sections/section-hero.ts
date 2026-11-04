import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaContainer } from '../../marea-design-system/components/foundation/marea-container';
import { MareaGrid } from '../../marea-design-system/components/foundation/marea-grid';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { MareaStatusBadge } from '../../marea-design-system/components/foundation/marea-status-badge';
import { MareaSurface } from '../../marea-design-system/components/foundation/marea-surface';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { CATALOG_CONTENT, CATALOG_SHARED } from '../content';
import { catalogFamilyRecord, statusLabel } from '../data/catalog-domain';
import type { CatalogFamilyId } from '../data/catalog.generated';

/**
 * Section 00 — product hero.
 *
 * The mandatory restriction notice is part of the hero and is never removed
 * conditionally. Lifecycle, availability and edition count are canonical values,
 * not authored copy.
 */
@Component({
  selector: 'marea-catalog-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaContainer, MareaGrid, MareaNotice, MareaStatusBadge, MareaSurface, MareaText],
  host: { 'data-marea-catalog-section': 'hero' },
  template: `
    <section class="hero" id="inicio" [attr.aria-labelledby]="titleId()">
      <marea-container size="wide">
        <p marea-text variant="label" tone="action" class="kicker">
          {{ hero().kicker[locale()] }}
        </p>
        <h1 marea-text variant="display1" class="title" [id]="titleId()">
          {{ hero().heading[locale()] }}
        </h1>
        <p marea-text variant="body" class="lead">{{ hero().lead[locale()] }}</p>
        <p marea-text variant="label" class="category">{{ hero().category[locale()] }}</p>

        <ul class="badges">
          <li>
            <span
              marea-status-badge
              tone="info"
              [label]="label('lifecycle') + ': ' + statusLabel(record().lifecycleState, locale())"
            ></span>
          </li>
          <li>
            <span
              marea-status-badge
              tone="critical"
              [label]="
                label('availability') +
                ': ' +
                statusLabel(record().commercialAvailability, locale())
              "
            ></span>
          </li>
          <li>
            <span
              marea-status-badge
              tone="neutral"
              [label]="label('editions') + ': ' + record().editionIds.length"
            ></span>
          </li>
        </ul>

        <div class="mandatory">
          <marea-notice
            variant="critical"
            [heading]="label('limitations')"
            [body]="hero().mandatoryNotice.text[locale()]"
          />
        </div>

        <marea-grid minItem="260px" gap="compact" class="highlights">
          @for (highlight of hero().highlights; track highlight.contentId) {
            <marea-surface variant="outline" padding="roomy">
              <p marea-text variant="bodySmall" class="highlight">
                {{ highlight.text[locale()] }}
              </p>
              <p marea-text variant="meta" tone="meta" class="evidence">
                {{ evidence(highlight.evidenceClass) }}
              </p>
            </marea-surface>
          }
        </marea-grid>
      </marea-container>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .hero {
      padding-block: var(--marea-space-7) var(--marea-space-6);
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .kicker,
    .title,
    .lead,
    .category,
    .highlight,
    .evidence {
      margin: 0;
    }
    .title {
      margin-block-start: var(--marea-space-2);
    }
    .lead {
      margin-block-start: var(--marea-space-3);
      max-inline-size: 62ch;
    }
    .category {
      margin-block-start: var(--marea-space-2);
      color: var(--marea-text-secondary);
    }
    .badges {
      display: flex;
      flex-wrap: wrap;
      gap: var(--marea-space-2);
      margin: var(--marea-space-4) 0 0;
      padding: 0;
      list-style: none;
    }
    .mandatory {
      margin-block-start: var(--marea-space-4);
    }
    .highlights {
      margin-block-start: var(--marea-space-5);
    }
    .highlight {
      margin-block-end: var(--marea-space-2);
    }
    @media (min-width: 768px) {
      .hero {
        padding-block: var(--marea-space-9) var(--marea-space-7);
      }
    }
  `,
})
export class MareaCatalogHero {
  readonly family = input.required<CatalogFamilyId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly hero = computed(() => CATALOG_CONTENT[this.family()].hero);
  readonly record = computed(() => {
    const record = catalogFamilyRecord(this.family());
    if (!record) throw new Error(`MC-20 canonical family projection missing: ${this.family()}`);
    return record;
  });

  readonly titleId = computed(() => `catalog-${this.family().toLowerCase()}-title`);

  label(key: string): string {
    return CATALOG_SHARED.labels[key]?.[this.locale()] ?? key;
  }

  statusLabel(code: string, locale: 'es' | 'en'): string {
    return statusLabel(code, locale);
  }

  evidence(code: string): string {
    return CATALOG_SHARED.evidenceVocabulary[code]?.[this.locale()] ?? code;
  }
}
