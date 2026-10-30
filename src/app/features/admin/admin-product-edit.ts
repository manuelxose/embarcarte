import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AdminProduct } from '../../core/models';
import { ProductImage } from '../../shared/ui/product-image';

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

@Component({
  selector: 'app-admin-product-edit',
  imports: [ReactiveFormsModule, RouterLink, ProductImage],
  template: `
    <nav class="crumbs"><a routerLink="/admin/productos">Productos</a> / {{ isNew() ? 'Nuevo' : form.controls.name.value }}</nav>
    <h1 class="dash-title">{{ isNew() ? 'Nuevo producto' : 'Editar producto' }}</h1>
    <form class="panel form" [formGroup]="form" (ngSubmit)="save()" novalidate>
      <div class="form-row">
        <div>
          <label for="name">Nombre</label>
          <input id="name" formControlName="name" (blur)="autoSlug()" />
        </div>
        <div>
          <label for="slug">URL (slug)</label>
          <input id="slug" formControlName="slug" placeholder="open-marine-hub" />
        </div>
      </div>
      <div class="form-row">
        <div>
          <label for="price">Precio con IVA (€)</label>
          <input id="price" type="number" min="0" step="0.01" formControlName="price" />
        </div>
        <div>
          <label for="stock">Stock (unidades)</label>
          <input id="stock" type="number" min="0" step="1" formControlName="stock" />
        </div>
      </div>
      <label for="category">Categoría</label>
      <input id="category" formControlName="category" />
      <label for="summary">Resumen (aparece en el catálogo y en Google)</label>
      <textarea id="summary" rows="2" maxlength="300" formControlName="summary"></textarea>
      <label for="description">Descripción</label>
      <textarea id="description" rows="8" formControlName="description"></textarea>
      <h2 class="footer-title">Traducción al inglés</h2>
      <label for="name_en">Nombre en inglés</label><input id="name_en" formControlName="name_en" />
      <label for="category_en">Categoría en inglés</label><input id="category_en" formControlName="category_en" />
      <label for="summary_en">Resumen en inglés</label><textarea id="summary_en" rows="2" maxlength="300" formControlName="summary_en"></textarea>
      <label for="description_en">Descripción en inglés</label><textarea id="description_en" rows="8" formControlName="description_en"></textarea>

      <span class="field-label">Imagen</span>
      <div class="hero-actions" style="gap: 16px; margin-bottom: 19px; align-items: center">
        <div class="thumb" style="width: 120px; height: 90px"><app-product-image [src]="form.controls.image.value" alt="Vista previa" /></div>
        <label class="button button-outline button-small" style="margin: 0">
          {{ uploading() ? 'Subiendo…' : 'Subir foto' }}
          <input type="file" accept="image/jpeg,image/png,image/webp" hidden (change)="upload($event)" />
        </label>
      </div>
      <label for="image">o URL de la imagen</label>
      <input id="image" formControlName="image" placeholder="https://… o /uploads/…" />

      <label class="check"><input type="checkbox" formControlName="active" /> <span>Publicado en la tienda</span></label>
      @if (message()) {
        <p [class]="message().startsWith('Guardado') ? 'success' : 'error'" role="status">{{ message() }}</p>
      }
      <div class="hero-actions" style="gap: 12px">
        <button class="button button-dark" type="submit" [disabled]="saving()">Guardar <span>↗</span></button>
        @if (!isNew()) {
          <button class="button button-ghost" type="button" (click)="remove()">Eliminar</button>
        }
      </div>
    </form>
  `,
})
export class AdminProductEdit {
  readonly id = input.required<string>();

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  protected readonly saving = signal(false);
  protected readonly uploading = signal(false);
  protected readonly message = signal('');

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)]],
    category: ['Tecnología'],
    summary: [''],
    description: [''],
    name_en: [''],
    category_en: [''],
    summary_en: [''],
    description_en: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    image: [''],
    active: [false],
  });

  protected isNew = () => this.id() === 'nuevo';

  ngOnInit(): void {
    if (this.isNew()) return;
    this.http.get<AdminProduct>(`/api/admin/products/${this.id()}`).subscribe((p) =>
      this.form.setValue({
        name: p.name,
        slug: p.slug,
        category: p.category,
        summary: p.summary,
        description: p.description,
        name_en: p.name_en,
        category_en: p.category_en,
        summary_en: p.summary_en,
        description_en: p.description_en,
        price: p.price_cents / 100,
        stock: p.stock,
        image: p.image,
        active: !!p.active,
      }),
    );
  }

  protected autoSlug(): void {
    if (!this.form.controls.slug.value) this.form.controls.slug.setValue(slugify(this.form.controls.name.value));
  }

  protected async upload(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploading.set(true);
    try {
      const res = await firstValueFrom(
        this.http.post<{ url: string }>('/api/admin/uploads', file, { headers: { 'Content-Type': file.type } }),
      );
      this.form.controls.image.setValue(res.url);
    } catch {
      this.message.set('No se ha podido subir la imagen (JPG, PNG o WebP de hasta 8 MB).');
    } finally {
      this.uploading.set(false);
    }
  }

  protected async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.message.set('Revisa nombre, slug (minúsculas y guiones), precio y stock.');
      return;
    }
    const { price, ...rest } = this.form.getRawValue();
    const body = { ...rest, price_cents: Math.round(price * 100), stock: Math.trunc(rest.stock) };
    this.saving.set(true);
    try {
      const saved = this.isNew()
        ? await firstValueFrom(this.http.post<AdminProduct>('/api/admin/products', body))
        : await firstValueFrom(this.http.put<AdminProduct>(`/api/admin/products/${this.id()}`, body));
      this.message.set('Guardado.');
      if (this.isNew()) await this.router.navigate(['/admin/productos', saved.id]);
    } catch (err) {
      this.message.set(
        err instanceof HttpErrorResponse && err.status === 409 ? 'Ya existe otro producto con ese slug.' : 'No se ha podido guardar.',
      );
    } finally {
      this.saving.set(false);
    }
  }

  protected async remove(): Promise<void> {
    if (!confirm('¿Eliminar este producto? Los pedidos existentes conservan su nombre y precio.')) return;
    await firstValueFrom(this.http.delete(`/api/admin/products/${this.id()}`));
    await this.router.navigateByUrl('/admin/productos');
  }
}
