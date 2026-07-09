// src/app/iam/infrastructure/iam-api.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserRole } from '../domain/user.entity';
import { UserBuildingResponse } from './user-building-response';
import { AuthenticationResponse } from './authentication-response';
import { IAM_API_ENDPOINTS } from './iam-api-endpoints';

interface AuthenticatedUserResponse {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class IamApi {
  constructor(private readonly http: HttpClient) {}

  signIn(email: string, password: string): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticatedUserResponse>(IAM_API_ENDPOINTS.SIGN_IN, { email, password })
      .pipe(
        switchMap((authenticatedUser) => {
          const headers = new HttpHeaders({ Authorization: `Bearer ${authenticatedUser.token}` });
          return this.http
            .get<UserBuildingResponse[]>(IAM_API_ENDPOINTS.USER_BUILDINGS, { headers })
            .pipe(
              map((userBuildings) => {
                const userBuilding = userBuildings.find((ub) => ub.userId === authenticatedUser.id);
                const role =
                  userBuilding?.role === 'ADMIN' ? UserRole.ADMINISTRATOR : UserRole.RESIDENT;

                const response: AuthenticationResponse = {
                  token: authenticatedUser.token,
                  user: {
                    userId: authenticatedUser.id,
                    name: authenticatedUser.name,
                    email: authenticatedUser.email,
                    role: role,
                    phoneNumber: authenticatedUser.phoneNumber,
                    buildingId: userBuilding?.buildingId ?? null,
                    apartmentNumber: userBuilding?.apartmentNumber ?? '',
                  },
                };
                return response;
              }),
            );
        }),
      );
  }

  signUp(
    name: string,
    email: string,
    password: string,
    role: UserRole,
    phoneNumber?: string,
    apartmentNumber?: string,
  ): Observable<void> {
    const newUser = {
      name,
      email,
      password,
      phoneNumber: phoneNumber ?? '',
    };
    return this.http.post<void>(IAM_API_ENDPOINTS.SIGN_UP, newUser);
  }
}
