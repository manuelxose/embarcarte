import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../core/seo.service';
import { SITE } from '../core/site.config';
import { GUIDES } from '../core/guides';
import { ENGLISH_GUIDES } from '../core/guides-en';

@Component({
  selector: 'app-home-en', imports: [RouterLink],
  template: `
    <section class="home-hero"><div class="home-hero-image"></div><div class="wrap home-hero-content"><p class="eyebrow">Technology · Experiences · Boat delivery</p><h1>Sail with<br />more possibilities</h1><p>We develop marine electronics and connect technology with the real experience of being at sea.</p><div class="hero-actions"><a class="button button-dark" routerLink="/en/technology">Explore technology →</a><a class="button button-outline" routerLink="/en/guides">Read our guides</a></div></div></section>
    <section class="home-services wrap" aria-label="Our services">
      @for (line of lines; track line.path) { <article class="home-service"><img [src]="line.image" alt="" /><div><h2>{{ line.title }}</h2><p>{{ line.text }}</p><a [routerLink]="line.path">{{ line.cta }} →</a></div></article> }
    </section>
    <section class="home-products"><div class="wrap"><p class="eyebrow">Open Marine</p><h2 class="display h-md">Open technology for your boat</h2><p>Connect navigation data, charts and instruments with a system designed around your vessel.</p><a class="button button-outline" routerLink="/en/guides">Explore marine guides →</a></div></section>
    <section class="section-tight bg-soft"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Knowledge on board</p><h2 class="display h-md">Guides for better navigation</h2></div><a class="button button-outline" routerLink="/en/guides">All guides →</a></div><div class="service-grid">@for (guide of guides; track guide.slug) { <article class="service-card"><div class="card-content"><h3>{{ guide.title }}</h3><p>{{ guide.description }}</p><a class="arrow-link stretched" [routerLink]="['/en/guides', guide.slug]">Read guide →</a></div></article> }</div></div></section>
  `,
})
export class HomeEn {
  protected readonly guides = GUIDES.slice(0, 3).map((guide) => ({ slug: guide.slug, ...ENGLISH_GUIDES[guide.slug] }));
  protected readonly lines = [
    { title: 'Marine technology', text: 'Sensors, instruments and autopilots using open systems and standard protocols.', cta: 'Explore technology', path: '/en/technology', image: '/images/home-tech.webp' },
    { title: 'Marine experiences', text: 'Trips at sea to enjoy the coast from another perspective.', cta: 'Explore experiences', path: '/en/experiences', image: '/images/home-experiences.webp' },
    { title: 'Boat delivery', text: 'Carefully planned vessel deliveries between ports.', cta: 'Request a quote', path: '/en/delivery', image: '/images/home-transfers.webp' },
  ];
  constructor() {
    inject(SeoService).set({ title: 'Open marine technology and boat services', description: 'Open marine electronics, experiences at sea and boat delivery with Embarcarte.', path: '/en', language: 'en', alternates: [{ language: 'es', path: '/' }, { language: 'en', path: '/en' }], jsonLd: [{ '@type': 'Organization', name: SITE.name, url: SITE.url }] });
  }
}
