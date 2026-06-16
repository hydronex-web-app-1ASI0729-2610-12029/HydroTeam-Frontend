import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CreateRefillResource, RefillResource, UpdateRefillResource } from './refill-response';
import { RefillsApiEndpoint } from './refills-api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class RefillManagementApi {
  constructor(private readonly http: HttpClient) {}

  getRefills(): Observable<RefillResource[] | { refills: RefillResource[] }> {
    return this.http
      .get<RefillResource[] | { refills: RefillResource[] }>(RefillsApiEndpoint.refills)
      .pipe(catchError(() => of(this.getFallbackRefills())));
  }

  getRefillById(id: number): Observable<RefillResource> {
    return this.http.get<RefillResource>(`${RefillsApiEndpoint.refills}/${id}`);
  }

  createRefill(resource: CreateRefillResource): Observable<RefillResource> {
    return this.http.post<RefillResource>(RefillsApiEndpoint.refills, resource);
  }

  updateRefill(id: number, resource: UpdateRefillResource): Observable<RefillResource> {
    return this.http.put<RefillResource>(`${RefillsApiEndpoint.refills}/${id}`, resource);
  }

  deleteRefill(id: number): Observable<void> {
    return this.http.delete<void>(`${RefillsApiEndpoint.refills}/${id}`);
  }

  private getFallbackRefills(): RefillResource[] {
    return [
      {
        id: 1,
        refill_date: '2026-05-10T10:00:00Z',
        liters: 5000,
        cost_soles: 120,
        supplier_name: 'Agua Express Lima',
        invoice_number: 'FT-001-2941',
        building_id: 1,
        registered_by_user_id: 1
      },
      {
        id: 2,
        refill_date: '2026-05-15T14:30:00Z',
        liters: 10000,
        cost_soles: 240,
        supplier_name: 'HydroTrans S.A.C.',
        invoice_number: 'FT-005-8812',
        building_id: 2,
        registered_by_user_id: 2
      },
      {
        id: 3,
        refill_date: '2026-05-28T08:15:00Z',
        liters: 5000,
        cost_soles: 130,
        supplier_name: 'Aquamax Peru',
        invoice_number: 'FT-012-0492',
        building_id: 3,
        registered_by_user_id: 3
      },
      {
        id: 4,
        refill_date: '2026-05-02T11:00:00Z',
        liters: 8000,
        cost_soles: 190,
        supplier_name: 'Agua Express Lima',
        invoice_number: 'FT-001-2810',
        building_id: 4,
        registered_by_user_id: 1
      },
      {
        id: 5,
        refill_date: '2026-05-22T16:45:00Z',
        liters: 6000,
        cost_soles: 150,
        supplier_name: 'Surco Water Supply',
        invoice_number: 'FT-002-3341',
        building_id: 5,
        registered_by_user_id: 2
      }
    ];
  }
}
