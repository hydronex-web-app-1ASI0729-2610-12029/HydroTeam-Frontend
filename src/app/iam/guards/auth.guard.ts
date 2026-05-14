// src/app/iam/guards/auth.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('tankiq-token');

  if (token) {
    return true;
  }

  router.navigate(['/iam/login']);
  return false;
};
