// src/app/iam/infrastructure/user-building-assembler.ts

import { UserBuilding, UserBuildingRole } from '../domain/user-building.entity';
import { UserBuildingResponse } from './user-building-response';

export class UserBuildingAssembler {
  static toEntityFromResponse(response: UserBuildingResponse): UserBuilding {
    return new UserBuilding({
      userId: response.userId,
      buildingId: response.buildingId,
      role: response.role as UserBuildingRole,
      apartmentNumber: response.apartmentNumber,
      associatedAt: response.associatedAt,
    });
  }
}
