import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from './models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private loaded: Promise<User | null> | null = null;

  readonly user = signal<User | null>(null);
  readonly isAdmin = computed(() => this.user()?.role === 'admin');

  /** Carga la sesión una sola vez; las páginas privadas solo se renderizan en el navegador. */
  load(): Promise<User | null> {
    // En SSR no hay cookies del usuario: la sesión se resuelve siempre en el navegador.
    if (!isPlatformBrowser(this.platformId)) return Promise.resolve(null);
    this.loaded ??= firstValueFrom(this.http.get<User | null>('/api/auth/me'))
      .catch(() => null)
      .then((user) => {
        this.user.set(user);
        return user;
      });
    return this.loaded;
  }

  async login(email: string, password: string): Promise<User> {
    const user = await firstValueFrom(this.http.post<User>('/api/auth/login', { email, password }));
    this.setUser(user);
    return user;
  }

  async register(name: string, email: string, password: string): Promise<User> {
    const user = await firstValueFrom(this.http.post<User>('/api/auth/register', { name, email, password }));
    this.setUser(user);
    return user;
  }

  async logout(): Promise<void> {
    await firstValueFrom(this.http.post('/api/auth/logout', {}));
    this.setUser(null);
  }

  setUser(user: User | null): void {
    this.user.set(user);
    this.loaded = Promise.resolve(user);
  }
}
