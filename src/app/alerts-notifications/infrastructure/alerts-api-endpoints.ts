import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Alert } from '../domain/model/alert.entity';
import { AlertResource, AlertsResponse } from './alerts-response';
import { AlertAssembler } from './alert-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const baseUrl = environment.databaseProviderApiBaseUrl;
const alertsPath = environment.databaseProviderAlertsEndpointPath;

export class AlertsApiEndpoint extends BaseApiEndpoint<Alert, AlertResource, AlertsResponse, AlertAssembler> {
  constructor(http: HttpClient) {
    super(
      http,
      `${baseUrl}${alertsPath}`,
      new AlertAssembler()
    );
  }
}
