import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// inject() solo funciona antes del primer await: se capturan las dependencias al inicio.

export const authGuard: CanActivateFn = async (_route, state) => {
  const router = inject(Router);
  const user = await inject(AuthService).load();
  return user ? true : router.createUrlTree([state.url.startsWith('/en/') ? '/en/login' : '/acceso'], { queryParams: { volver: state.url } });
};

export const adminGuard: CanActivateFn = async (_route, state) => {
  const router = inject(Router);
  const user = await inject(AuthService).load();
  if (user?.role === 'admin') return true;
  return router.createUrlTree(user ? ['/cuenta'] : ['/acceso'], { queryParams: { volver: state.url } });
};
