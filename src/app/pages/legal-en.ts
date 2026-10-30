import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../core/seo.service';
import { SITE } from '../core/site.config';

const LEGAL: Record<string, { title: string; spanish: string }> = {
  'legal-notice': { title: 'Legal notice', spanish: 'aviso-legal' },
  privacy: { title: 'Privacy policy', spanish: 'privacidad' },
  cookies: { title: 'Cookie policy', spanish: 'cookies' },
  'terms-of-sale': { title: 'Terms of sale', spanish: 'condiciones-de-venta' },
};

@Component({ selector: 'app-legal-en', imports: [RouterLink], template: `
  <section class="page-hero"><div class="wrap"><p class="eyebrow">Legal</p><h1 class="display h-lg">{{ page.title }}</h1><a [routerLink]="'/' + page.spanish" hreflang="es">Leer en español</a></div></section><section class="section-pad"><div class="wrap-narrow prose">
    @switch (key) {
      @case ('legal-notice') { <p>In accordance with Spanish Law 34/2002 on Information Society Services and Electronic Commerce, the website owner is:</p><ul><li>Owner: {{ site.legal.owner }}</li>@if (site.legal.taxId) { <li>Tax ID: {{ site.legal.taxId }}</li> }@if (site.legal.address) { <li>Address: {{ site.legal.address }}</li> }@if (site.legal.registry) { <li>Registry: {{ site.legal.registry }}</li> }@if (!site.legal.taxId || !site.legal.address) { <li>Tax details and address: awaiting confirmation.</li> }<li>Email: {{ site.email }}</li></ul><h2>Terms of use</h2><p>Access to this site implies acceptance of these terms. Content is informational and is not a binding offer. Prices and specifications are confirmed in each quotation.</p><h2>Intellectual property</h2><p>Text, designs and trademarks belong to {{ site.legal.owner }} or its licensors. Open Marine software distributed as open source is governed by its own licence.</p><h2>Navigation safety</h2><p>Navigation aids do not replace a lookout, official charts or the skipper’s judgment. Users are responsible for the safe navigation of their vessels.</p> }
      @case ('privacy') { <p>Data controller: {{ site.legal.owner }}. Contact: {{ site.email }}.</p><h2>Data we process and why</h2><p>Contact form data (name, email, phone and message) is used to answer your enquiry and, where relevant, prepare a quotation.</p><p>If you create an account or place an order, account, shipping and order data is used to manage the purchase, delivery, invoicing and warranty. Stripe processes card payments; we do not store card details.</p><h2>Legal basis and retention</h2><p>The legal basis is your consent and pre-contractual measures requested by you. We retain data for as long as necessary to respond and for applicable legal periods.</p><h2>Recipients</h2><p>We do not disclose data to third parties except where legally required or to necessary technical providers, including hosting and email.</p><h2>Your rights</h2><p>You can request access, correction, erasure, objection, restriction and portability by writing to {{ site.email }}. You may also complain to the Spanish Data Protection Agency (aepd.es).</p> }
      @case ('cookies') { <p>This website does not use analytics, advertising or tracking cookies. It uses only strictly necessary technical storage:</p><ul><li><strong>emb_session</strong> (cookie): keeps you signed in; expires after 30 days or when you sign out.</li><li><strong>emb_cart</strong> (browser local storage): remembers items in your basket.</li></ul><p>Photographs are loaded from Unsplash, which may record your IP address when serving them.</p><p>If other types of cookies are introduced, this policy will be updated and consent requested.</p> }
      @case ('terms-of-sale') { <p>These terms govern purchases from embarcarte.com, whose seller is {{ site.legal.owner }}.</p><h2>Orders and prices</h2><p>Prices are in euros and include applicable VAT. An order is accepted when we send email confirmation. If an item is unavailable, we will notify you and refund the amount paid.</p><h2>Payment methods</h2><p>Card payment through Stripe or bank transfer. Transfer orders are prepared after payment is received.</p><h2>Shipping and timing</h2><p>We will advise you of shipping or installation costs and timing before preparing the order.</p><h2>Right of withdrawal</h2><p>Consumers have 14 calendar days from receipt to withdraw without giving a reason by writing to {{ site.email }}. We will refund within 14 days of receiving the product in its original condition. This does not apply to configured or custom-made products.</p><h2>Warranty</h2><p>Products have the three-year legal conformity warranty provided by consumer law.</p><h2>Dispute resolution</h2><p>Contact us at {{ site.email }} or the consumer services in your autonomous community.</p> }
    }
  </div></section>
` })
export class LegalEn {
  protected readonly key = inject(ActivatedRoute).snapshot.data['page'] as string;
  protected readonly page = LEGAL[this.key]; protected readonly site = SITE;
  constructor() { const path = `/en/${this.key}`; inject(SeoService).set({ title: this.page.title, description: `${this.page.title} of ${SITE.name}.`, path, language: 'en', alternates: [{ language: 'es', path: `/${this.page.spanish}` }, { language: 'en', path }] }); }
}
