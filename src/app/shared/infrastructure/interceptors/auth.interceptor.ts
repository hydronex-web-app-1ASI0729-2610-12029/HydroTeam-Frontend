// src/app/shared/infrastructure/interceptors/auth.interceptor.ts

import { HttpInterceptorFn } from '@angular/common/http';

const TOKEN_KEY = 'tankiq-token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    console.log('Interceptando:', req.url);

  // No agregar el token a los endpoints públicos
  if (
    req.url.includes('/authentication/sign-in') ||
    req.url.includes('/authentication/sign-up')
  ) {
    console.log('Endpoint público, sin token');
    return next(req);
  }

  // Leer el token directamente del Local Storage
  const token = localStorage.getItem(TOKEN_KEY);
   console.log('Token:', token);

  // Si no existe token, continuar la petición
  if (!token) {
    return next(req);
  }

  // Clonar la petición agregando el header Authorization
  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authRequest);
};