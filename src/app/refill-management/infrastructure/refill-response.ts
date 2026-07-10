export interface RefillResource {
  id: number;
  //refill_date: string;
  refillDate: string;
  liters: number;
  //cost_soles: number;
  costSoles: number;
  //supplier_name: string;
  supplierName: string;
  //invoice_number: string;
  invoiceNumber: string;
  //building_id: number;
  buildingId: number;
  //registered_by_user_id: number;
  registeredByUserId: number;
}

export interface RefillsResponse {
  refills: RefillResource[];
}

export interface CreateRefillResource {
  refillDate: string;
  liters: number;
  costSoles: number;
  supplierName: string;
  invoiceNumber: string;
  buildingId: number;
  registeredByUserId: number;
}

export interface UpdateRefillResource {
  id: number;
  refillDate: string;
  liters: number;
  costSoles: number;
  supplierName: string;
  invoiceNumber: string;
  buildingId: number;
  registeredByUserId: number;
}
