// src/app/iam/infrastructure/user-assembler.ts

import { Administrator, Resident, User, UserRole } from '../domain/user.entity';
import { AuthenticationResponse } from './authentication-response';

export class UserAssembler {
  static toEntityFromResponse(response: AuthenticationResponse): User {
    const { user } = response;

    if (user.role === UserRole.ADMINISTRATOR) {
      return new Administrator({
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: UserRole.ADMINISTRATOR,
        phoneNumber: user.phoneNumber ?? '',
      });
    }

    if (user.role === UserRole.RESIDENT) {
      return new Resident({
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: UserRole.RESIDENT,
        apartmentNumber: user.apartmentNumber ?? '',
      });
    }

    return new User({
      userId: user.userId,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }
}
