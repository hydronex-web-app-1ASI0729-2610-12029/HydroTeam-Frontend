import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Sensor } from '../domain/model/sensor.entity';
import { SensorResource, SensorResponse } from './sensor-response';

export class SensorAssembler implements BaseAssembler<Sensor, SensorResource, SensorResponse> {
  toEntityFromResource(resource: SensorResource): Sensor {
    return new Sensor({
      id: resource.id,
      hardwareId: resource.hardwareId,
      type: resource.type,
      status: resource.status,
      lastSyncAt: resource.lastSyncAt,
      cisternId: resource.cisternId,
    });
  }

  toResourceFromEntity(entity: Sensor): SensorResource {
    return {
      id: entity.id,
      hardwareId: entity.hardwareId,
      type: entity.type,
      status: entity.status,
      lastSyncAt: entity.lastSyncAt,
      cisternId: entity.cisternId,
    } as SensorResource;
  }

  toEntitiesFromResponse(response: SensorResponse): Sensor[] {
    return response.sensors.map((r) => this.toEntityFromResource(r));
  }
}
