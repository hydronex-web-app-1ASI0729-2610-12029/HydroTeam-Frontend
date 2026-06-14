// src/app/iam/domain/user-building.entity.ts

export enum UserBuildingRole {
  ADMIN = 'ADMIN',
  RESIDENT = 'RESIDENT',
}

export interface UserBuildingProps {
  userId: number;
  buildingId: number;
  role: UserBuildingRole;
  apartmentNumber: string;
  associatedAt: string;
}

export class UserBuilding {
  readonly userId: number;
  readonly buildingId: number;
  readonly role: UserBuildingRole;
  readonly apartmentNumber: string;
  readonly associatedAt: string;

  constructor(props: UserBuildingProps) {
    this.userId = props.userId;
    this.buildingId = props.buildingId;
    this.role = props.role;
    this.apartmentNumber = props.apartmentNumber;
    this.associatedAt = props.associatedAt;
  }

  get isAdmin(): boolean {
    return this.role === UserBuildingRole.ADMIN;
  }

  get isResident(): boolean {
    return this.role === UserBuildingRole.RESIDENT;
  }
}
