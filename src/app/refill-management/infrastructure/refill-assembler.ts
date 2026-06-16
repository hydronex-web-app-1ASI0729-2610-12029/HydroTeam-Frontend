import { Refill } from '../domain/model/refill.entity';
import { CreateRefillResource, RefillResource, UpdateRefillResource } from './refill-response';

export class RefillAssembler {
  static toEntityFromResource(resource: RefillResource): Refill {
    return new Refill(
      resource.id,
      resource.refill_date,
      resource.liters,
      resource.cost_soles,
      resource.supplier_name,
      resource.invoice_number,
      resource.building_id,
      resource.registered_by_user_id
    );
  }

  static toEntitiesFromResponse(response: RefillResource[] | { refills: RefillResource[] }): Refill[] {
    const resources = Array.isArray(response) ? response : response.refills;
    return resources.map((resource) => this.toEntityFromResource(resource));
  }

  static toResourceFromEntity(entity: Refill): CreateRefillResource {
    return {
      refill_date: entity.refillDate,
      liters: entity.liters,
      cost_soles: entity.costSoles,
      supplier_name: entity.supplierName,
      invoice_number: entity.invoiceNumber,
      building_id: entity.buildingId,
      registered_by_user_id: entity.registeredByUserId
    };
  }

  static toUpdateResourceFromEntity(entity: Refill): UpdateRefillResource {
    return {
      id: entity.id,
      refill_date: entity.refillDate,
      liters: entity.liters,
      cost_soles: entity.costSoles,
      supplier_name: entity.supplierName,
      invoice_number: entity.invoiceNumber,
      building_id: entity.buildingId,
      registered_by_user_id: entity.registeredByUserId
    };
  }
}
