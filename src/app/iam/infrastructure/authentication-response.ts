// src/app/iam/infrastructure/authentication-response.ts

import { UserRole } from '../domain/user.entity';

export interface AuthenticationResponse {
  token: string;
  user: {
    userId: number;
    name: string;
    email: string;
    role: UserRole;
    phoneNumber?: string;
    buildingId?: number | null;
    apartmentNumber?: string;
  };
}
