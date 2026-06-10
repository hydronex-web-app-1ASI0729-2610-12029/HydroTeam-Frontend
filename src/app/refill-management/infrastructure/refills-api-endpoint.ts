import { environment } from '../../../environments/environment';

export class RefillsApiEndpoint {
  static readonly refills =
    `${environment.databaseProviderApiBaseUrl}${environment.databaseProviderRefillsEndpointPath}`;
}