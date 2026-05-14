// src/app/iam/application/authentication.store.ts

import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../domain/user.entity';
import { IamApi } from '../infrastructure/iam-api';
import { UserAssembler } from '../infrastructure/user-assembler';

const TOKEN_KEY = 'tankiq-token';
const USER_KEY  = 'tankiq-user';

@Injectable({ providedIn: 'root' })
export class AuthenticationStore {
  // Private signals
  private readonly currentUserSignal = signal<User | null>(this.restoreUser());
  private readonly tokenSignal       = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  private readonly loadingSignal     = signal<boolean>(false);
  private readonly errorSignal       = signal<string | null>(null);

  // Public readonly signals
  readonly currentUser    = this.currentUserSignal.asReadonly();
  readonly token          = this.tokenSignal.asReadonly();
  readonly loading        = this.loadingSignal.asReadonly();
  readonly error          = this.errorSignal.asReadonly();

  // Computed 
  readonly isAuthenticated = computed(() => !!this.tokenSignal());
  readonly isAdministrator = computed(() => this.currentUserSignal()?.role === UserRole.ADMINISTRATOR);
  readonly isResident      = computed(() => this.currentUserSignal()?.role === UserRole.RESIDENT);

  constructor(
    private readonly iamApi: IamApi,
    private readonly router: Router,
  ) {}

  // ── Actions

  signIn(email: string, password: string): Promise<void> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return new Promise((resolve, reject) => {
      this.iamApi.signIn(email, password).subscribe({
        next: (response) => {
          const user = UserAssembler.toEntityFromResponse(response);

          this.tokenSignal.set(response.token);
          this.currentUserSignal.set(user);

          localStorage.setItem(TOKEN_KEY, response.token);
          localStorage.setItem(USER_KEY, JSON.stringify(response.user));

          this.loadingSignal.set(false);
          this.router.navigate(['/dashboard']);
          resolve();
        },
        error: (err) => {
          const message = this.formatError(err, 'Sign in failed. Please check your credentials.');
          this.errorSignal.set(message);
          this.loadingSignal.set(false);
          reject(message);
        },
      });
    });
  }

  signUp(
    name: string,
    email: string,
    password: string,
    role: UserRole,
    phoneNumber?: string,
    apartmentNumber?: string,
  ): Promise<void> {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return new Promise((resolve, reject) => {
      this.iamApi.signUp(name, email, password, role, phoneNumber, apartmentNumber).subscribe({
        next: () => {
          this.loadingSignal.set(false);
          resolve();
        },
        error: (err) => {
          const message = this.formatError(err, 'Sign up failed. Please try again.');
          this.errorSignal.set(message);
          this.loadingSignal.set(false);
          reject(message);
        },
      });
    });
  }

  signOut(): void {
    this.currentUserSignal.set(null);
    this.tokenSignal.set(null);
    this.errorSignal.set(null);

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    this.router.navigate(['/iam/login']);
  }

  clearError(): void {
    this.errorSignal.set(null);
  }

  //  Private helpers 

  private restoreUser(): User | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return UserAssembler.toEntityFromResponse({ token: '', user: parsed });
    } catch {
      return null;
    }
  }

  private formatError(err: any, fallback: string): string {
    return err?.error?.message ?? err?.message ?? fallback;
  }
}
