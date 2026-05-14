// src/app/iam/infrastructure/iam-api.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { UserRole } from '../domain/user.entity';
import { AuthenticationResponse } from './authentication-response';
import { IAM_API_ENDPOINTS } from './iam-api-endpoints';

// ---------------------------------------------------------------------------
// Fake in-memory users — remove once Spring Boot API is ready
// ---------------------------------------------------------------------------
const FAKE_USERS: Array<AuthenticationResponse['user'] & { password: string }> = [
  {
    userId: 'a1b2c3d4-0001-0000-0000-000000000001',
    name: 'Alberto Flores',
    email: 'admin@tankiq.com',
    password: 'admin123',
    role: UserRole.ADMINISTRATOR,
    phoneNumber: '999888777',
  },
  {
    userId: 'a1b2c3d4-0002-0000-0000-000000000002',
    name: 'Maritza Castro',
    email: 'resident@tankiq.com',
    password: 'resident123',
    role: UserRole.RESIDENT,
    apartmentNumber: '4B',
  },
];

@Injectable({ providedIn: 'root' })
export class IamApi {
  constructor(private readonly http: HttpClient) {}

  signIn(email: string, password: string): Observable<AuthenticationResponse> {
    // ── FAKE BACKEND ── swap this block for the real HTTP call below ──────
    const match = FAKE_USERS.find(u => u.email === email && u.password === password);

    if (!match) {
      return of(null).pipe(
        delay(600),
        switchMap(() => throwError(() => ({ error: { message: 'Invalid email or password.' } })))
      );
    }

    const { password: _pwd, ...userWithoutPassword } = match;
    const fakeResponse: AuthenticationResponse = {
      token: `fake-jwt-token-${match.userId}-${Date.now()}`,
      user: userWithoutPassword,
    };
    return of(fakeResponse).pipe(delay(800));
    // ── REAL BACKEND (uncomment when API is ready) ────────────────────────
    // return this.http.post<AuthenticationResponse>(IAM_API_ENDPOINTS.SIGN_IN, { email, password });
  }

  signUp(
    name: string,
    email: string,
    password: string,
    role: UserRole,
    phoneNumber?: string,
    apartmentNumber?: string
  ): Observable<void> {
    // ── FAKE BACKEND ──────────────────────────────────────────────────────
    const exists = FAKE_USERS.some(u => u.email === email);

    if (exists) {
      return of(null).pipe(
        delay(600),
        switchMap(() => throwError(() => ({ error: { message: 'Email is already registered.' } })))
      );
    }

    return of(undefined).pipe(delay(800));
    // ── REAL BACKEND (uncomment when API is ready) ────────────────────────
    // const body = { name, email, password, role, phoneNumber, apartmentNumber };
    // return this.http.post<void>(IAM_API_ENDPOINTS.SIGN_UP, body);
  }
}
