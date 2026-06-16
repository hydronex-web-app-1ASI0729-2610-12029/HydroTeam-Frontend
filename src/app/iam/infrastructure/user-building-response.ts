// src/app/iam/infrastructure/user-building-response.ts

export interface UserBuildingResponse {
  user_id: number;
  building_id: number;
  role: string;
  apartment_number: string;
  associated_at: string;
}
