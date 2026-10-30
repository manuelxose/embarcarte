import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService, breadcrumb } from '../core/seo.service';
import { SITE } from '../core/site.config';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const TOPICS = [
  { value: 'tecnologia', label: 'Electrónica y tecnología náutica' },
  { value: 'tienda', label: 'Pedido o producto de la tienda' },
  { value: 'experiencias', label: 'Experiencias y salidas al mar' },
  { value: 'traslados', label: 'Traslado de embarcaciones' },
  { value: 'otra', label: 'Otra consulta' },
];

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="section-pad">
      <div class="wrap contact-grid">
        <div>
          <p class="eyebrow">Hablemos</p>
          <h1 class="display h-lg">¿Tienes un proyecto<br />o un rumbo en mente?</h1>
          <p class="contact-copy">
            Cuéntanos qué necesitas. Tanto si buscas integrar un sensor como si estás preparando un traslado, estaremos
            encantados de escucharte. También puedes escribirnos a
            <a class="text-link" [href]="'mailto:' + site.email">{{ site.email }}</a>.
          </p>
          <div class="contact-note"><span class="contact-dot"></span> Respondemos en 48 horas laborables.</div>
        </div>

        @if (status() === 'sent') {
          <div class="panel notice" role="status">
            <h2 class="dash-title">¡Mensaje recibido!</h2>
            <p class="muted">Gracias. Te responderemos lo antes posible.</p>
          </div>
        } @else {
          <form class="form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
            <label for="name">Tu nombre</label>
            <input id="name" formControlName="name" autocomplete="name" placeholder="¿Cómo te llamas?" required />
            <label for="email">Correo electrónico</label>
            <input id="email" type="email" formControlName="email" autocomplete="email" placeholder="tu@correo.com" required />
            <label for="phone">Teléfono (opcional)</label>
            <input id="phone" type="tel" formControlName="phone" autocomplete="tel" />
            <label for="topic">¿En qué podemos ayudarte?</label>
            <select id="topic" formControlName="topic" required>
              <option value="" disabled>Selecciona una opción</option>
              @for (t of topics; track t.value) {
                <option [value]="t.value">{{ t.label }}</option>
              }
            </select>
            <label for="message">Cuéntanos un poco más</label>
            <textarea id="message" formControlName="message" rows="5" required
                      placeholder="Tu idea, embarcación, fechas aproximadas…"></textarea>
            <label class="hp" aria-hidden="true">Web <input formControlName="website" tabindex="-1" autocomplete="off" /></label>
            <label class="check">
              <input type="checkbox" formControlName="consent" required />
              <span>He leído y acepto la <a routerLink="/privacidad">política de privacidad</a>.</span>
            </label>
            @if (showErrors() && form.invalid) {
              <p class="error" role="alert">Revisa los campos: nombre, email válido, tema, mensaje y aceptación de la privacidad.</p>
            }
            @if (status() === 'error') {
              <p class="error" role="alert">No hemos podido enviar el mensaje. Escríbenos a {{ site.email }}.</p>
            }
            <button class="button button-dark" type="submit" [disabled]="status() === 'sending'">
              {{ status() === 'sending' ? 'Enviando…' : 'Enviar consulta' }} <span aria-hidden="true">↗</span>
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
  protected readonly topics = TOPICS;
  protected readonly status = signal<Status>('idle');
  protected readonly showErrors = signal(false);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    phone: ['', Validators.maxLength(40)],
    topic: ['', Validators.required],
    message: ['', [Validators.required, Validators.maxLength(5000)]],
    website: [''],
    consent: [false, Validators.requiredTrue],
  });

  constructor() {
    const params = inject(ActivatedRoute).snapshot.queryParamMap;
    const topic = params.get('tema');
    if (topic && TOPICS.some((t) => t.value === topic)) {
      this.form.controls.topic.setValue(topic);
    }
    const product = params.get('producto');
    if (product && product.length <= 120) this.form.controls.message.setValue(`Me gustaría consultar disponibilidad y presupuesto para: ${product}.`);
    inject(SeoService).set({
      title: 'Contacto',
      description:
        'Habla con Embarcarte sobre electrónica náutica, experiencias en el mar o traslados de embarcaciones.',
      path: '/contacto',
      alternates: [{ language: 'es', path: '/contacto' }, { language: 'en', path: '/en/contact' }],
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
    const value = this.form.getRawValue();
    const topic = TOPICS.find((t) => t.value === value.topic)?.label ?? value.topic;
    this.http.post('/api/contact', { ...value, topic }).subscribe({
      next: () => this.status.set('sent'),
      error: () => this.status.set('error'),
    });
  }
}
