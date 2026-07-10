import { Refill } from '../domain/model/refill.entity';
import { CreateRefillResource, RefillResource, UpdateRefillResource } from './refill-response';

export class RefillAssembler {
  static toEntityFromResource(resource: RefillResource): Refill {
    return new Refill(
      resource.id,
      //resource.refill_date,
      resource.refillDate,
      resource.liters,
      //resource.cost_soles,
      resource.costSoles,
      //resource.supplier_name,
      resource.supplierName,
      //resource.invoice_number,
      resource.invoiceNumber,
      //resource.building_id,
      resource.buildingId,
      //resource.registered_by_user_id
      resource.registeredByUserId
    );
  }

  static toEntitiesFromResponse(response: RefillResource[] | { refills: RefillResource[] }): Refill[] {
    const resources = Array.isArray(response) ? response : response.refills;
    return resources.map((resource) => this.toEntityFromResource(resource));
  }

  static toResourceFromEntity(entity: Refill): CreateRefillResource {
    return {
      refillDate: entity.refillDate,
      liters: entity.liters,
      costSoles: entity.costSoles,
      supplierName: entity.supplierName,
      invoiceNumber: entity.invoiceNumber,
      buildingId: entity.buildingId,
      registeredByUserId: entity.registeredByUserId
    };
  }

  static toUpdateResourceFromEntity(entity: Refill): UpdateRefillResource {
    return {
      id: entity.id,
      refillDate: entity.refillDate,
      liters: entity.liters,
      costSoles: entity.costSoles,
      supplierName: entity.supplierName,
      invoiceNumber: entity.invoiceNumber,
      buildingId: entity.buildingId,
      registeredByUserId: entity.registeredByUserId
    };
  }
}
