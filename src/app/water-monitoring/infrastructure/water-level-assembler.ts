import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { WaterLevel } from '../domain/model/water-level.entity';
import { WaterLevelResource, WaterLevelResponse } from './water-level-response';

export class WaterLevelAssembler implements BaseAssembler<WaterLevel, WaterLevelResource, WaterLevelResponse> {
  toEntityFromResource(resource: WaterLevelResource): WaterLevel {
    return new WaterLevel({
      id: resource.id,
      levelPercent: resource.levelPercent,
      volumeLiters: resource.volumeLiters,
      recordedAt: resource.recordedAt,
      sensorId: resource.sensorId,
    });
  }

  toResourceFromEntity(entity: WaterLevel): WaterLevelResource {
    return {
      id: entity.id,
      levelPercent: entity.levelPercent,
      volumeLiters: entity.volumeLiters,
      recordedAt: entity.recordedAt,
      sensorId: entity.sensorId,
    } as WaterLevelResource;
  }

  toEntitiesFromResponse(response: WaterLevelResponse): WaterLevel[] {
    return response.waterLevelReadings.map((r) => this.toEntityFromResource(r));
  }
}
