import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PRODUCTS } from '../core/catalog';
import { SeoService, breadcrumb } from '../core/seo.service';
import { SITE } from '../core/site.config';

type Status = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="page-hero">
      <div class="container narrow">
        <p class="eyebrow">Contacto</p>
        <h1>Hablemos de tu embarcación</h1>
        <p class="lead">
          Cuéntanos qué necesitas y te enviaremos una propuesta. También puedes escribirnos a
          <a [href]="'mailto:' + site.email">{{ site.email }}</a>.
        </p>
      </div>
    </section>
    <section class="section">
      <div class="container narrow">
        @if (status() === 'sent') {
          <div class="card notice" role="status">
            <h2 class="h3">¡Mensaje recibido!</h2>
            <p>Gracias. Te responderemos en un plazo de 48 horas laborables.</p>
          </div>
        } @else {
          <form class="card form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
            <div class="form-row">
              <label>Nombre <input formControlName="name" autocomplete="name" required /></label>
              <label>Email <input type="email" formControlName="email" autocomplete="email" required /></label>
            </div>
            <div class="form-row">
              <label>Teléfono (opcional) <input type="tel" formControlName="phone" autocomplete="tel" /></label>
              <label>
                Interés
                <select formControlName="product">
                  <option value="">Sistema completo / no lo sé</option>
                  @for (p of products; track p.slug) {
                    <option [value]="p.slug">{{ p.name }}</option>
                  }
                  <option value="servicios">Instalación o desarrollo a medida</option>
                </select>
              </label>
            </div>
            <label>
              Tu embarcación y lo que necesitas
              <textarea formControlName="message" rows="6" required
                placeholder="Tipo y eslora del barco, electrónica actual, qué te gustaría conseguir..."></textarea>
            </label>
            <label class="hp" aria-hidden="true">Web <input formControlName="website" tabindex="-1" autocomplete="off" /></label>
            <label class="check">
              <input type="checkbox" formControlName="consent" required />
              <span>He leído y acepto la <a routerLink="/privacidad">política de privacidad</a>.</span>
            </label>
            @if (showErrors() && form.invalid) {
              <p class="error" role="alert">Revisa los campos: nombre, email válido, mensaje y aceptación de la privacidad.</p>
            }
            @if (status() === 'error') {
              <p class="error" role="alert">No hemos podido enviar el mensaje. Escríbenos a {{ site.email }}.</p>
            }
            <button class="btn" type="submit" [disabled]="status() === 'sending'">
              {{ status() === 'sending' ? 'Enviando…' : 'Enviar mensaje' }}
            </button>
          </form>
        }
      </div>
    </section>
  `,
})
export class Contact {
  private readonly http = inject(HttpClient);
  protected readonly site = SITE;
  protected readonly products = PRODUCTS;
  protected readonly status = signal<Status>('idle');
  protected readonly showErrors = signal(false);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    phone: ['', Validators.maxLength(40)],
    product: [''],
    message: ['', [Validators.required, Validators.maxLength(5000)]],
    website: [''],
    consent: [false, Validators.requiredTrue],
  });

  constructor() {
    const product = inject(ActivatedRoute).snapshot.queryParamMap.get('producto');
    if (product && PRODUCTS.some((p) => p.slug === product)) {
      this.form.controls.product.setValue(product);
    }
    inject(SeoService).set({
      title: 'Contacto y presupuestos',
      description:
        'Solicita presupuesto para la electrónica de navegación de tu embarcación: Open Marine, instalación e integración.',
      path: '/contacto',
      jsonLd: [breadcrumb([{ name: 'Contacto', path: '/contacto' }])],
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.showErrors.set(true);
      this.form.markAllAsTouched();
      return;
    }
    this.status.set('sending');
    this.http.post('/api/contact', this.form.getRawValue()).subscribe({
      next: () => this.status.set('sent'),
      error: () => this.status.set('error'),
    });
  }
}
