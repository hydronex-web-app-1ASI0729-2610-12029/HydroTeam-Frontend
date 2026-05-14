// src/app/iam/iam.routes.ts

import { Routes } from '@angular/router';

const login  = () => import('./presentation/views/login/login').then((m) => m.Login);
const signUp = () => import('./presentation/views/sign-up/sign-up').then((m) => m.SignUp);

export const iamRoutes: Routes = [
  { path: '',        redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',   loadComponent: login,  title: 'TankIQ - Login'   },
  { path: 'sign-up', loadComponent: signUp, title: 'TankIQ - Sign Up' },
];

