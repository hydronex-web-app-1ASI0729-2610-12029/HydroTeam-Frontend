import { CommonModule } from '@angular/common';
import { Component, OnInit, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { RefillManagementStore } from '../../../application/refill-management.store';
import { Refill } from '../../../domain/model/refill.entity';

@Component({
  selector: 'app-refill-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule
  ],
  providers: [RefillManagementStore],
  templateUrl: './refill-form.html',
  styleUrl: './refill-form.css'
})
export class RefillForm implements OnInit {
readonly refillId: number;
readonly isEditMode = computed(() => this.refillId > 0);

refillForm!: ReturnType<FormBuilder['group']>;

constructor(
  private readonly formBuilder: FormBuilder,
  private readonly route: ActivatedRoute,
  private readonly router: Router,
  readonly store: RefillManagementStore
) {
  this.refillId = Number(this.route.snapshot.paramMap.get('id') ?? 0);

  this.refillForm = this.formBuilder.group({
    refillDate: [new Date(), Validators.required],
    liters: [0, [Validators.required, Validators.min(1)]],
    costSoles: [0, [Validators.required, Validators.min(1)]],
    supplierName: ['', Validators.required],
    invoiceNumber: ['', Validators.required],
    buildingId: [1, [Validators.required, Validators.min(1)]],
    registeredByUserId: [1, [Validators.required, Validators.min(1)]]
  });
}

  ngOnInit(): void {
    this.store.loadRefills();

    if (this.isEditMode()) {
      const refill = this.store.refills().find((item) => item.id === this.refillId);

      if (refill) {
        this.refillForm.patchValue({
          refillDate: new Date(refill.refillDate),
          liters: refill.liters,
          costSoles: refill.costSoles,
          supplierName: refill.supplierName,
          invoiceNumber: refill.invoiceNumber,
          buildingId: refill.buildingId,
          registeredByUserId: refill.registeredByUserId
        });
      }
    }
  }

  save(): void {
    if (this.refillForm.invalid) {
      this.refillForm.markAllAsTouched();
      return;
    }

    const value = this.refillForm.getRawValue();

    const refill = new Refill(
      this.refillId,
      value.refillDate?.toISOString() ?? new Date().toISOString(),
      Number(value.liters),
      Number(value.costSoles),
      value.supplierName ?? '',
      value.invoiceNumber ?? '',
      Number(value.buildingId),
      Number(value.registeredByUserId)
    );

    if (this.isEditMode()) {
      this.store.updateRefill(refill);
    } else {
      this.store.createRefill(refill);
    }

    this.router.navigate(['/dashboard/refill-management']);
  }

  cancel(): void {
    this.router.navigate(['/dashboard/refill-management']);
  }
}
