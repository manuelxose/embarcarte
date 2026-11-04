import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MareaSegmentPage } from '../../src/app/marea-segments/segment-page';
import { SEGMENT_CONTENT } from '../../src/app/marea-segments/content';
import { isSegmentId } from '../../src/app/marea-segments/models/segment-identity';
import type { SegmentId } from '../../src/app/marea-segments/models/segment-identity';

/**
 * Internal preview host for the three MC-19 audience pages.
 *
 * Applies non-indexable, non-public metadata and then renders the real segment
 * page. It emits NO canonical link, NO alternative-language links, NO Open Graph/Twitter tags and
 * NO JSON-LD: MC-19 has no publication or indexation authorisation.
 */
@Component({
  selector: 'marea-segment-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaSegmentPage],
  template: '<marea-segment-page [segment]="segment()" [locale]="locale()" />',
})
export class SegmentPreview {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  /** Route data is untrusted input: an unknown value falls back to the first identity. */
  readonly segment = computed<SegmentId>(() => {
    const value = this.route.snapshot.data['segment'];
    return isSegmentId(value) ? value : 'professionals';
  });

  readonly locale = computed<'es' | 'en'>(() =>
    this.route.snapshot.data['locale'] === 'en' ? 'en' : 'es',
  );

  constructor() {
    const locale = this.locale();
    const audience = SEGMENT_CONTENT.shared.audienceNav.find(
      (entry) => entry.segmentId === this.segment(),
    );
    const audienceLabel = audience?.label.text[locale] ?? 'MAREA';

    this.title.setTitle(`${audienceLabel} · ${SEGMENT_CONTENT.shared.previewLabel.text[locale]}`);
    this.document.documentElement.lang = locale === 'es' ? 'es-ES' : 'en';
    this.document.documentElement.setAttribute('data-marea-preview', 'internal-not-published');

    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow, noarchive' });
    this.meta.updateTag({
      name: 'description',
      content: SEGMENT_CONTENT.shared.classificationBanner.text[locale],
    });
    this.meta.updateTag({ name: 'marea-publication', content: 'NOT_AUTHORIZED' });
    // No canonical link, alternative-language link, social-card metadata or
    // structured-data script is added by this internal preview host.
  }
}
