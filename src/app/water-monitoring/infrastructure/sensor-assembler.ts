import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Sensor } from '../domain/model/sensor.entity';
import { SensorResource, SensorResponse } from './sensor-response';

export class SensorAssembler
  implements BaseAssembler<Sensor, SensorResource, SensorResponse>
{
  toEntityFromResource(resource: SensorResource): Sensor {
    return new Sensor({
      id: resource.id,
      hardwareId: resource.hardware_id,
      type: resource.type,
      status: resource.status,
      lastSyncAt: resource.last_sync_at,
      cisternId: resource.cistern_id,
    });
  }

  toResourceFromEntity(entity: Sensor): SensorResource {
    return {
      id: entity.id,
      hardware_id: entity.hardwareId,
      type: entity.type,
      status: entity.status,
      last_sync_at: entity.lastSyncAt,
      cistern_id: entity.cisternId,
    } as SensorResource;
  }

  toEntitiesFromResponse(response: SensorResponse): Sensor[] {
    return response.sensors.map((r) => this.toEntityFromResource(r));
  }
}
