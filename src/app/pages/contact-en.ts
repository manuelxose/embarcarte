import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../core/seo.service';

@Component({ selector: 'app-contact-en', imports: [ReactiveFormsModule, RouterLink], template: `
  <section class="section-pad"><div class="wrap contact-grid"><div><p class="eyebrow">Get in touch</p><h1 class="display h-lg">Tell us about your boat</h1><p class="contact-copy">Ask about marine electronics, experiences or boat delivery. You can also email <a href="mailto:info&#64;embarcarte.com">info&#64;embarcarte.com</a>.</p></div>
  @if (status() === 'sent') { <div class="panel notice" role="status"><h2>Message received</h2><p>Thank you. We will reply as soon as possible.</p></div> } @else { <form class="form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
    <label for="name">Name</label><input id="name" formControlName="name" autocomplete="name" required />
    <label for="email">Email</label><input id="email" type="email" formControlName="email" autocomplete="email" required />
    <label for="phone">Phone (optional)</label><input id="phone" formControlName="phone" type="tel" autocomplete="tel" />
    <label for="topic">How can we help?</label><select id="topic" formControlName="topic" required><option value="" disabled>Select a topic</option><option value="Technology">Marine technology</option><option value="Shop">Shop product or order</option><option value="Experiences">Marine experiences</option><option value="Boat delivery">Boat delivery</option><option value="Other">Other enquiry</option></select>
    <label for="message">Message</label><textarea id="message" formControlName="message" rows="5" required></textarea><label class="hp" aria-hidden="true">Website<input formControlName="website" tabindex="-1" autocomplete="off" /></label>
    <label class="check"><input type="checkbox" formControlName="consent" required /><span>I accept the <a routerLink="/en/privacy">privacy policy</a>.</span></label>
    @if (invalid()) { <p class="error" role="alert">Complete the required fields and accept the privacy policy.</p> } @if (status() === 'error') { <p class="error" role="alert">We could not send your message. Please email info&#64;embarcarte.com.</p> }
    <button class="button button-dark" type="submit" [disabled]="status() === 'sending'">{{ status() === 'sending' ? 'Sending…' : 'Send enquiry' }} →</button></form> }</div></section>
` })
export class ContactEn {
  private readonly http = inject(HttpClient);
  protected readonly status = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');
  protected readonly invalid = signal(false);
  protected readonly form = inject(FormBuilder).nonNullable.group({ name: ['', [Validators.required, Validators.maxLength(120)]], email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]], phone: ['', Validators.maxLength(40)], topic: ['', Validators.required], message: ['', [Validators.required, Validators.maxLength(5000)]], website: [''], consent: [false, Validators.requiredTrue] });
  constructor() {
    const product = inject(ActivatedRoute).snapshot.queryParamMap.get('producto');
    if (product && product.length <= 120) this.form.patchValue({ topic: 'Shop', message: `I would like to enquire about availability and pricing for: ${product}.` });
    inject(SeoService).set({ title: 'Contact', description: 'Contact Embarcarte about marine electronics, experiences and boat delivery.', path: '/en/contact', language: 'en', alternates: [{ language: 'es', path: '/contacto' }, { language: 'en', path: '/en/contact' }] });
  }
  protected submit(): void {
    if (this.form.invalid) { this.invalid.set(true); this.form.markAllAsTouched(); return; }
    this.invalid.set(false); this.status.set('sending');
    this.http.post('/api/contact', this.form.getRawValue()).subscribe({ next: () => this.status.set('sent'), error: () => this.status.set('error') });
  }
}
