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
        refillDate: '2026-05-10T10:00:00Z',
        liters: 5000,
        costSoles: 120,
        supplierName: 'Agua Express Lima',
        invoiceNumber: 'FT-001-2941',
        buildingId: 1,
        registeredByUserId: 1
      },
      {
        id: 2,
        refillDate: '2026-05-15T14:30:00Z',
        liters: 10000,
        costSoles: 240,
        supplierName: 'HydroTrans S.A.C.',
        invoiceNumber: 'FT-005-8812',
        buildingId: 2,
        registeredByUserId: 2
      },
      {
        id: 3,
        refillDate: '2026-05-28T08:15:00Z',
        liters: 5000,
        costSoles: 130,
        supplierName: 'Aquamax Peru',
        invoiceNumber: 'FT-012-0492',
        buildingId: 3,
        registeredByUserId: 3
      },
      {
        id: 4,
        refillDate: '2026-05-02T11:00:00Z',
        liters: 8000,
        costSoles: 190,
        supplierName: 'Agua Express Lima',
        invoiceNumber: 'FT-001-2810',
        buildingId: 4,
        registeredByUserId: 1
      },
      {
        id: 5,
        refillDate: '2026-05-22T16:45:00Z',
        liters: 6000,
        costSoles: 150,
        supplierName: 'Surco Water Supply',
        invoiceNumber: 'FT-002-3341',
        buildingId: 5,
        registeredByUserId: 2
      }
    ];
  }
}
