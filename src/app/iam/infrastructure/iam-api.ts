// src/app/iam/infrastructure/iam-api.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { UserRole } from '../domain/user.entity';
import { UserBuildingResponse } from './user-building-response';
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
        return this.http.get<UserBuildingResponse[]>(
          `${IAM_API_ENDPOINTS.USER_BUILDINGS}?user_id=${match.id}`
        ).pipe(
          map(userBuildings => {
            const userBuilding = userBuildings[0];
            const role = userBuilding?.role === 'ADMIN'
              ? UserRole.ADMINISTRATOR
              : UserRole.RESIDENT;

            const response: AuthenticationResponse = {
              token: `fake-jwt-token-${match.id}-${Date.now()}`,
              user: {
                userId: match.id,
                name: match.name,
                email: match.email,
                role: role,
                phoneNumber: match.phone_number,
                buildingId: userBuilding?.building_id ?? null,
                apartmentNumber: userBuilding?.apartment_number ?? '',
              },
            };
            return response;
          })
        );
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
