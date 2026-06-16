import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild, computed, effect } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RefillManagementStore } from '../../../application/refill-management.store';
import { Refill } from '../../../domain/model/refill.entity';

@Component({
  selector: 'app-refill-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
  ],
  providers: [RefillManagementStore],
  templateUrl: './refill-list.html',
  styleUrl: './refill-list.css'
})
export class RefillList implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'refillDate',
    'liters',
    'costSoles',
    'supplierName',
    'invoiceNumber',
    'buildingId',
    'actions'
  ];

  dataSource = new MatTableDataSource<Refill>([]);

  readonly totalRefills = computed(() => this.store.totalRefills());
  readonly totalLiters = computed(() => this.store.totalLiters());
  readonly totalCostSoles = computed(() => this.store.totalCostSoles());

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    readonly store: RefillManagementStore,
    private readonly router: Router
  ) {
    effect(() => {
      this.dataSource.data = this.store.refills();
    });
  }

  ngOnInit(): void {
    this.store.loadRefills();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  goToEdit(refill: Refill): void {
    this.store.selectRefill(refill);
    this.router.navigate(['/dashboard/refill-management/edit', refill.id]);
  }

  deleteRefill(refill: Refill): void {
    this.store.deleteRefill(refill.id);
  }
}
