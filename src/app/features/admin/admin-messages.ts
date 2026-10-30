import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { formatDate } from '../../core/models';

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  read: number;
  created_at: string;
}

@Component({
  selector: 'app-admin-messages',
  template: `
    <h1 class="dash-title">Mensajes de contacto</h1>
    <div class="stack">
      @for (m of messages(); track m.id) {
        <article class="panel" [style.border-left]="m.read ? '' : '4px solid #65bce9'">
          <div class="dash-head" style="margin-bottom: 12px">
            <div>
              <strong>{{ m.name }}</strong> · <a class="text-link" [href]="'mailto:' + m.email + '?subject=Re: tu consulta en Embarcarte'">{{ m.email }}</a>
              @if (m.phone) { · {{ m.phone }} }
              <br /><span class="small muted">{{ date(m.created_at) }} · {{ m.topic || 'Sin tema' }}</span>
            </div>
            <div class="hero-actions" style="gap: 8px">
              <button class="button button-outline button-small" type="button" (click)="toggle(m)">{{ m.read ? 'Marcar no leído' : 'Marcar leído' }}</button>
              <button class="button button-ghost button-small" type="button" (click)="remove(m)">Eliminar</button>
            </div>
          </div>
          <p style="white-space: pre-line; margin: 0">{{ m.message }}</p>
        </article>
      } @empty {
        <p class="panel empty">No hay mensajes.</p>
      }
    </div>
  `,
})
export class AdminMessages {
  private readonly http = inject(HttpClient);
  protected readonly messages = signal<Message[]>([]);
  protected readonly date = formatDate;

  constructor() {
    this.http.get<Message[]>('/api/admin/messages').subscribe((m) => this.messages.set(m));
  }

  protected async toggle(m: Message): Promise<void> {
    await firstValueFrom(this.http.put(`/api/admin/messages/${m.id}`, { read: !m.read }));
    this.messages.update((list) => list.map((x) => (x.id === m.id ? { ...x, read: m.read ? 0 : 1 } : x)));
  }

  protected async remove(m: Message): Promise<void> {
    if (!confirm('¿Eliminar este mensaje?')) return;
    await firstValueFrom(this.http.delete(`/api/admin/messages/${m.id}`));
    this.messages.update((list) => list.filter((x) => x.id !== m.id));
  }
}
