import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Building } from '../domain/model/building.entity';
import { BuildingResource, BuildingResponse } from './building-response';

export class BuildingAssembler implements BaseAssembler<Building, BuildingResource, BuildingResponse> {
  toEntityFromResource(resource: BuildingResource): Building {
    return new Building({
      id: resource.id,
      name: resource.name,
      address: resource.address,
      district: resource.district,
    });
  }

  toResourceFromEntity(entity: Building): BuildingResource {
    return {
      id: entity.id,
      name: entity.name,
      address: entity.address,
      district: entity.district,
    } as BuildingResource;
  }

  toEntitiesFromResponse(response: BuildingResponse): Building[] {
    return response.buildings.map((r) => this.toEntityFromResource(r));
  }
}
