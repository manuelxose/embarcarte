import { HttpInterceptorFn } from '@angular/common/http';
import { InjectionToken, inject } from '@angular/core';

/** En el servidor, origen interno para que el SSR llame a su propia API sin salir a Internet. */
export const API_ORIGIN = new InjectionToken<string>('API_ORIGIN');

export const apiOriginInterceptor: HttpInterceptorFn = (req, next) => {
  const origin = inject(API_ORIGIN, { optional: true });
  return origin && req.url.startsWith('/api/') ? next(req.clone({ url: origin + req.url })) : next(req);
};
