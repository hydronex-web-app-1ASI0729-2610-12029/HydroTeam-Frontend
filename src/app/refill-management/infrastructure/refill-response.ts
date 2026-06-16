export interface RefillResource {
  id: number;
  refill_date: string;
  liters: number;
  cost_soles: number;
  supplier_name: string;
  invoice_number: string;
  building_id: number;
  registered_by_user_id: number;
}

export interface RefillsResponse {
  refills: RefillResource[];
}

export interface CreateRefillResource {
  refill_date: string;
  liters: number;
  cost_soles: number;
  supplier_name: string;
  invoice_number: string;
  building_id: number;
  registered_by_user_id: number;
}

export interface UpdateRefillResource {
  id: number;
  refill_date: string;
  liters: number;
  cost_soles: number;
  supplier_name: string;
  invoice_number: string;
  building_id: number;
  registered_by_user_id: number;
}
