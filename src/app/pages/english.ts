import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../core/seo.service';

const PAGES: Record<string, { title: string; description: string; spanish: string; cards: { title: string; text: string; slug?: string }[] }> = {
  technology: { title: 'Open marine electronics for your boat', description: 'Open Marine connects navigation data, charts and instruments through an onboard network.', spanish: '/tecnologia', cards: [
    { title: 'Open Marine Navigator', slug: 'navegador', text: 'A browser-based navigation interface for charts, instruments and AIS on devices connected to the boat network.' },
    { title: 'Open Marine Charts', slug: 'cartografia', text: 'Manage and serve authorised local charts, including MBTiles and unencrypted S-57 import workflows.' },
    { title: 'Open Marine Hub', slug: 'hub', text: 'A compact onboard computer that brings navigation services and compatible instruments together.' },
    { title: 'Open Marine Autopilot', slug: 'piloto-automatico', text: 'An open autopilot controller with a dedicated controller and emergency-stop input; installation must be assessed for each vessel.' },
    { title: 'Sensor gateway', slug: 'pasarela-sensores', text: 'Custom integration of compatible onboard sensors and data sources using Signal K.' },
    { title: 'Simulation platform', slug: 'simulacion', text: 'Generate signals and scenarios for development, diagnostics and integration testing.' },
  ] },
  experiences: { title: 'Experience the sea from on board', description: 'Boat trips and marine experiences to explore the coast and learn about sailing.', spanish: '/experiencias', cards: [
    { title: 'Coastal trips', text: 'Explore the coast at a relaxed pace in small groups, by sail or motor.' },
    { title: 'Introduction to sailing', text: 'Learn about basic manoeuvres, the wind and onboard electronics.' },
    { title: 'Tailored trips', text: 'Discuss a special day, celebration or longer trip designed around your group and the weather.' },
  ] },
  delivery: { title: 'Your boat, on its way to the next port', description: 'Boat delivery by sea with careful planning and clear communication.', spanish: '/traslados', cards: [
    { title: 'Pre-departure review', text: 'Review the vessel’s condition, documents and safety equipment.' },
    { title: 'Passage planning', text: 'Plan the route, stops and a suitable weather window.' },
    { title: 'Delivery and handover', text: 'Follow the passage and receive a report of the journey and any issues.' },
  ] },
  services: { title: 'From the idea to your boat', description: 'Design, installation and support for onboard navigation systems.', spanish: '/servicios', cards: [
    { title: 'Onboard installation', text: 'Mounting, wiring, protected power and commissioning adapted to your boat.' },
    { title: 'Custom development', text: 'Displays, integrations and hardware for fleets, charter, schools and research projects.' },
    { title: 'Support and maintenance', text: 'Updates, diagnostics when connected and technical assistance.' },
  ] },
  about: { title: 'More connection with your boat', description: 'We combine technical development, a passion for the sea and services informed by life on board.', spanish: '/sobre-nosotros', cards: [
    { title: 'Open technology', text: 'We use open standards such as Signal K and NMEA to help integrate compatible equipment.' },
    { title: 'Built around the vessel', text: 'We plan, integrate and test solutions for the equipment and requirements of each boat.' },
    { title: 'Experience at sea', text: 'We also arrange marine experiences and boat deliveries with careful planning and clear communication.' },
  ] },
};

@Component({ selector: 'app-english-page', imports: [RouterLink], template: `
  <section class="page-hero"><div class="wrap"><p class="eyebrow">Embarcarte</p><h1 class="display h-xl">{{ page.title }}</h1><p class="lead">{{ page.description }}</p><p><a [routerLink]="page.spanish" hreflang="es">Leer en español</a></p></div></section>
  <section class="section-pad"><div class="wrap service-grid">@for (card of page.cards; track card.title) { <article class="service-card"><div class="card-content"><h2>{{ card.title }}</h2><p>{{ card.text }}</p>@if (card.slug) { <a class="arrow-link stretched" [routerLink]="['/en/technology', card.slug]">View details →</a> }</div></article> }</div></section>
  <section class="section-tight bg-soft"><div class="wrap"><h2 class="display h-md">Tell us about your boat</h2><p>Contact us to discuss your requirements and availability.</p><a class="button button-dark" routerLink="/en/contact">Contact us →</a></div></section>
` })
export class EnglishPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly page = PAGES[this.route.snapshot.data['page']];
  constructor() {
    const path = `/en/${this.route.snapshot.data['page']}`;
    inject(SeoService).set({ title: this.page.title, description: this.page.description, path, language: 'en', alternates: [{ language: 'es', path: this.page.spanish }, { language: 'en', path }] });
  }
}
