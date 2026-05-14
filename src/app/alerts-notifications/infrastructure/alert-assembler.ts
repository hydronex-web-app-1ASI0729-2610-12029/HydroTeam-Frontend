import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Alert } from '../domain/model/alert.entity';
import { AlertResource, AlertsResponse } from './alerts-response';

export class AlertAssembler implements BaseAssembler<Alert, AlertResource, AlertsResponse> {

  toEntityFromResource(resource: AlertResource): Alert {
    return new Alert({
      id: resource.id,
      type: resource.type,
      message: resource.message,
      timestamp: resource.timestamp,
      isResolved: resource.isResolved,
      cisternId: resource.cisternId
    });
  }

  toResourceFromEntity(entity: Alert): AlertResource {
    return {
      id: entity.id,
      type: entity.type,
      message: entity.message,
      timestamp: entity.timestamp,
      isResolved: entity.isResolved,
      cisternId: entity.cisternId
    } as AlertResource;
  }

  toEntitiesFromResponse(response: AlertsResponse): Alert[] {
    return response.alerts.map(resource => this.toEntityFromResource(resource));
  }
}
