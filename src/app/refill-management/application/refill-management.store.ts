import { Injectable, computed, signal } from '@angular/core';
import { Refill } from '../domain/model/refill.entity';
import { RefillManagementApi } from '../infrastructure/refill-management-api';
import { RefillAssembler } from '../infrastructure/refill-assembler';

@Injectable()
export class RefillManagementStore {
  private readonly _refills = signal<Refill[]>([]);
  private readonly _selectedRefill = signal<Refill | null>(null);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly refills = this._refills.asReadonly();
  readonly selectedRefill = this._selectedRefill.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly totalRefills = computed(() => this._refills().length);

  readonly totalLiters = computed(() =>
    this._refills().reduce((total, refill) => total + refill.liters, 0)
  );

  readonly totalCostSoles = computed(() =>
    this._refills().reduce((total, refill) => total + refill.costSoles, 0)
  );

  readonly averageCostSoles = computed(() => {
    const total = this.totalRefills();
    if (!total) return 0;
    return this.totalCostSoles() / total;
  });

  readonly currentMonthRefills = computed(() => {
    const now = new Date();
    return this._refills().filter((refill) => {
      const date = new Date(refill.refillDate);
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    });
  });

  readonly currentMonthCostSoles = computed(() =>
    this.currentMonthRefills().reduce((total, refill) => total + refill.costSoles, 0)
  );

  constructor(private readonly refillManagementApi: RefillManagementApi) {}

  loadRefills(): void {
    this._loading.set(true);
    this._error.set(null);

    this.refillManagementApi.getRefills().subscribe({
      next: (response) => {
        const refills = RefillAssembler.toEntitiesFromResponse(response);
        this._refills.set(refills);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('No se pudieron cargar las recargas.');
        this._loading.set(false);
      }
    });
  }

  selectRefill(refill: Refill | null): void {
    this._selectedRefill.set(refill);
  }

  createRefill(refill: Refill): void {
    this._loading.set(true);
    this.refillManagementApi.createRefill(RefillAssembler.toResourceFromEntity(refill)).subscribe({
      next: (response) => {
        const createdRefill = RefillAssembler.toEntityFromResource(response);
        this._refills.update((items) => [...items, createdRefill]);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('No se pudo registrar la recarga.');
        this._loading.set(false);
      }
    });
  }

  updateRefill(refill: Refill): void {
    this._loading.set(true);
    this.refillManagementApi
      .updateRefill(refill.id, RefillAssembler.toUpdateResourceFromEntity(refill))
      .subscribe({
        next: (response) => {
          const updatedRefill = RefillAssembler.toEntityFromResource(response);
          this._refills.update((items) =>
            items.map((item) => (item.id === updatedRefill.id ? updatedRefill : item))
          );
          this._loading.set(false);
        },
        error: () => {
          this._error.set('No se pudo actualizar la recarga.');
          this._loading.set(false);
        }
      });
  }

  deleteRefill(id: number): void {
    this._loading.set(true);
    this.refillManagementApi.deleteRefill(id).subscribe({
      next: () => {
        this._refills.update((items) => items.filter((item) => item.id !== id));
        this._loading.set(false);
      },
      error: () => {
        this._error.set('No se pudo eliminar la recarga.');
        this._loading.set(false);
      }
    });
  }
}
