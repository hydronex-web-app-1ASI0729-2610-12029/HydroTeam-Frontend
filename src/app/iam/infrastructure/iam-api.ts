// src/app/iam/infrastructure/iam-api.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserRole } from '../domain/user.entity';
import { AuthenticationResponse } from './authentication-response';
import { IAM_API_ENDPOINTS } from './iam-api-endpoints';

@Injectable({ providedIn: 'root' })
export class IamApi {
  constructor(private readonly http: HttpClient) {}

  signIn(email: string, password: string): Observable<AuthenticationResponse> {
    return this.http.get<any[]>(`${IAM_API_ENDPOINTS.USERS}?email=${email}`).pipe(
      switchMap(users => {
        const match = users.find(u => u.email === email && u.password_hash === password);
        if (!match) {
          return throwError(() => ({ error: { message: 'Invalid email or password.' } }));
        }
        const response: AuthenticationResponse = {
          token: `fake-jwt-token-${match.id}-${Date.now()}`,
          user: {
            userId: match.id,
            name: match.name,
            email: match.email,
            role: UserRole.ADMINISTRATOR,
            phoneNumber: match.phone_number,
          },
        };
        return [response];
      })
    );
  }

  signUp(
    name: string,
    email: string,
    password: string,
    role: UserRole,
    phoneNumber?: string,
    apartmentNumber?: string
  ): Observable<void> {
    return this.http.get<any[]>(`${IAM_API_ENDPOINTS.USERS}?email=${email}`).pipe(
      switchMap(users => {
        if (users.length > 0) {
          return throwError(() => ({ error: { message: 'Email is already registered.' } }));
        }
        const newUser = {
          name,
          email,
          password_hash: password,
          phone_number: phoneNumber ?? '',
          created_at: new Date().toISOString(),
        };
        return this.http.post<void>(IAM_API_ENDPOINTS.USERS, newUser);
      })
    );
  }
}
