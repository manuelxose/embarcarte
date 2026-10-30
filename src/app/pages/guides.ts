import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GUIDES } from '../core/guides';
import { ENGLISH_GUIDES } from '../core/guides-en';
import { GUIDE_EXTRAS } from '../core/guide-extras';
import { SeoService, breadcrumb } from '../core/seo.service';
import { absoluteUrl } from '../core/site.config';

@Component({
  selector: 'app-guides', imports: [RouterLink],
  template: `
    @if (guide; as article) {
      <section class="page-hero"><div class="wrap"><nav class="crumbs" [attr.aria-label]="english ? 'Breadcrumb' : 'Migas de pan'"><a [routerLink]="english ? '/en' : '/'">{{ english ? 'Home' : 'Inicio' }}</a> / <a [routerLink]="listPath">{{ english ? 'Guides' : 'Guías' }}</a></nav><p class="eyebrow">{{ english ? 'Marine guides' : 'Guías náuticas' }}</p><h1 class="display h-lg">{{ article.title }}</h1><p class="lead">{{ article.description }}</p><p><a [routerLink]="alternatePath" [attr.hreflang]="english ? 'es' : 'en'">{{ english ? 'Leer en español' : 'Read in English' }}</a></p></div></section>
      <section class="section-pad"><div class="wrap detail-grid"><article class="prose">@for (section of article.sections; track section[0]) { <h2>{{ section[0] }}</h2><p>{{ section[1] }}</p> } @if (extra) { @for (section of english ? extra.en : extra.es; track section[0]) { <h2>{{ section[0] }}</h2><p>{{ section[1] }}</p> } @if (extra.sources?.length) { <h2>{{ english ? 'Sources and further reading' : 'Fuentes y lecturas recomendadas' }}</h2><ul>@for (source of extra.sources; track source.url) { <li><a [href]="source.url" target="_blank" rel="noopener noreferrer">{{ source.label }}</a></li> }</ul> } }<p><a [routerLink]="listPath">← {{ english ? 'All guides' : 'Todas las guías' }}</a></p></article><aside class="panel"><h2 class="footer-title">{{ english ? 'Technology for your boat' : 'Tecnología para tu barco' }}</h2><p>{{ english ? 'Discover Open Marine modules and ask about a solution for your installation.' : 'Conoce los módulos de Open Marine y consulta una solución para tu instalación.' }}</p><a class="button button-dark" [routerLink]="english ? '/en/technology' : '/tecnologia'">{{ english ? 'Explore technology' : 'Ver tecnología' }} →</a></aside></div></section>
    } @else {
      <section class="page-hero"><div class="wrap"><p class="eyebrow">{{ english ? 'Learn with Embarcarte' : 'Aprende con Embarcarte' }}</p><h1 class="display h-xl">{{ english ? 'Marine technology and navigation guides' : 'Guías de tecnología y navegación náutica' }}</h1><p class="lead">{{ english ? 'Practical information to understand your instruments and plan onboard electronics.' : 'Ideas prácticas para entender tus instrumentos y planificar una electrónica adaptada a tu barco.' }}</p><p><a [routerLink]="alternatePath" [attr.hreflang]="english ? 'es' : 'en'">{{ english ? 'Leer en español' : 'Read in English' }}</a></p></div></section>
      <section class="section-pad"><div class="wrap service-grid">@for (item of guides; track item.slug) { <article class="service-card"><div class="card-content"><span class="card-number">{{ english ? 'Marine guide' : 'Guía náutica' }}</span><h2><a class="stretched" [routerLink]="[listPath, item.slug]">{{ item.title }}</a></h2><p>{{ item.description }}</p><span class="arrow-link">{{ english ? 'Read guide' : 'Leer guía' }} →</span></div></article> }</div></section>
    }
  `,
})
export class Guides {
  private readonly route = inject(ActivatedRoute);
  protected readonly english = this.route.snapshot.data['language'] === 'en';
  protected readonly listPath = this.english ? '/en/guides' : '/guias';
  protected readonly guides = GUIDES.map((item) => this.english ? { slug: item.slug, ...ENGLISH_GUIDES[item.slug] } : item);
  protected readonly guide = this.guides.find((item) => item.slug === this.route.snapshot.paramMap.get('slug'));
  protected readonly extra = this.guide ? GUIDE_EXTRAS[this.guide.slug] : undefined;
  protected readonly alternatePath = `${this.english ? '/guias' : '/en/guides'}${this.guide ? '/' + this.guide.slug : ''}`;
  constructor() {
    const guide = this.guide;
    const path = `${this.listPath}${guide ? '/' + guide.slug : ''}`;
    const title = guide?.title ?? (this.english ? 'Marine navigation and electronics guides' : 'Guías de navegación y electrónica náutica');
    const description = guide?.description ?? (this.english ? 'Practical guides to marine instruments, navigation and technology.' : 'Guías prácticas sobre instrumentos, navegación y tecnología náutica.');
    inject(SeoService).set({ title, description, path, language: this.english ? 'en' : 'es', alternates: [{ language: 'es', path: this.english ? this.alternatePath : path }, { language: 'en', path: this.english ? path : this.alternatePath }], type: guide ? 'article' : 'website', jsonLd: [breadcrumb([{ name: this.english ? 'Guides' : 'Guías', path: this.listPath }, ...(guide ? [{ name: guide.title, path }] : [])]), ...(guide ? [{ '@type': 'Article', headline: guide.title, description: guide.description, inLanguage: this.english ? 'en' : 'es', mainEntityOfPage: absoluteUrl(path), publisher: { '@type': 'Organization', name: 'Embarcarte' } }] : [])] });
  }
}
