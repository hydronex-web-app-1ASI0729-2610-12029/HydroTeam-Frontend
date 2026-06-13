// src/app/iam/infrastructure/iam-api-endpoints.ts

import { environment } from '../../../environments/environment';

export const IAM_API_ENDPOINTS = {
  USERS: `${environment.databaseProviderApiBaseUrl}${environment.databaseProviderUsersEndpointPath}`,
};
