import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { WaterLevel } from '../domain/model/water-level.entity';
import { WaterLevelResource, WaterLevelResponse } from './water-level-response';

export class WaterLevelAssembler
  implements BaseAssembler<WaterLevel, WaterLevelResource, WaterLevelResponse>
{
  toEntityFromResource(resource: WaterLevelResource): WaterLevel {
    return new WaterLevel({
      id: resource.id,
      levelPercent: resource.level_percent,
      volumeLiters: resource.volume_liters,
      recordedAt: resource.recorded_at,
      sensorId: resource.sensor_id,
    });
  }

  toResourceFromEntity(entity: WaterLevel): WaterLevelResource {
    return {
      id: entity.id,
      level_percent: entity.levelPercent,
      volume_liters: entity.volumeLiters,
      recorded_at: entity.recordedAt,
      sensor_id: entity.sensorId,
    } as WaterLevelResource;
  }

  toEntitiesFromResponse(response: WaterLevelResponse): WaterLevel[] {
    return response.water_level_readings.map((r) => this.toEntityFromResource(r));
  }
}
