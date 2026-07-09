// src/app/iam/infrastructure/user-building-response.ts

export interface UserBuildingResponse {
  id: number;
  userId: number;
  buildingId: number;
  role: string;
  apartmentNumber: string;
  associatedAt: string;
}
