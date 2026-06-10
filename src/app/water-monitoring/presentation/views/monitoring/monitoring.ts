import { Component, computed, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { WaterMonitoringStore } from '../../../application/water-monitoring.store';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
  ],
  templateUrl: './monitoring.html',
  styleUrl: './monitoring.css',
})
export class Monitoring {
  protected readonly store = inject(WaterMonitoringStore);

  readonly chartWidth = 700;
  readonly chartHeight = 300;
  readonly chartPadding = { top: 20, right: 20, bottom: 32, left: 48 };
  chartShowBars = false;
  readonly barWidth = 14;

  readonly chartGridLines = [0, 20, 40, 60, 80, 100].map(v => ({
    label: v,
    pos: this.scaleY(v),
  }));

  readonly averageLevel = computed(() => {
    const levels = this.store.waterLevels();
    if (!levels.length) return 0;
    return Math.round(levels.reduce((sum, l) => sum + l.levelPercent, 0) / levels.length);
  });

  readonly chartPoints = computed(() => {
    const levels = this.store.waterLevels();
    if (!levels.length) return [];
    const usable = this.chartWidth - this.chartPadding.left - this.chartPadding.right;
    const step = levels.length > 1 ? usable / (levels.length - 1) : usable / 2;
    return levels.map((l, i) => ({
      x: this.chartPadding.left + i * step,
      y: this.scaleY(l.levelPercent),
      value: l.levelPercent,
      label: new Date(l.recordedAt).toLocaleDateString('es-PE', {
        day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
      }),
    }));
  });

  readonly chartXLabels = computed(() => {
    const points = this.chartPoints();
    if (points.length <= 8) return points;
    const step = Math.ceil(points.length / 7);
    return points.filter((_, i) => i % step === 0 || i === points.length - 1);
  });

  readonly linePoints = computed(() =>
    this.chartPoints().map(p => `${p.x},${p.y}`).join(' ')
  );

  readonly areaPoints = computed(() => {
    const pts = this.chartPoints();
    if (!pts.length) return '';
    const bottom = this.scaleY(0);
    return `${pts[0].x},${bottom} ` +
      pts.map(p => `${p.x},${p.y}`).join(' ') +
      ` ${pts[pts.length - 1].x},${bottom}`;
  });

  scaleY(value: number): number {
    const top = this.chartPadding.top;
    const bottom = this.chartHeight - this.chartPadding.bottom;
    return bottom - ((value / 100) * (bottom - top));
  }

  toggleChartView(): void {
    this.chartShowBars = !this.chartShowBars;
  }

  generateReport(): void {
    const levels = this.store.waterLevels();
    const cisterns = this.store.cisterns();
    const projected = this.store.projectedDays();
    const avg = this.averageLevel();

    const header = 'ID,Sensor ID,Fecha,Nivel (%),Volumen (L),Estado\n';
    const rows = levels.map(l => {
      const status = l.isCritical() ? 'CRITICO' : l.isLow() ? 'BAJO' : 'NORMAL';
      return `${l.id},${l.sensorId},${l.recordedAt},${l.levelPercent},${l.volumeLiters},${status}`;
    }).join('\n');

    const cisternInfo = cisterns.map(c =>
      `Cisterna ${c.id},Capacidad: ${c.capacityLiters}L,Actual: ${c.currentVolumeLiters}L (${c.currentLevelPercent}%),Umbral: ${c.alertThresholdPercent}%`
    ).join('\n');

    const summary = [
      '', '',
      'RESUMEN',
      `Total lecturas,${levels.length}`,
      `Promedio nivel,${avg}%`,
      `Volumen actual total,${this.store.totalCurrentLiters()}L`,
      `Dias proyectados,${projected ?? 'N/A'}`,
      `Generado,${new Date().toISOString()}`,
      '', 'CISTERNAS',
      cisternInfo,
    ].join('\n');

    const csv = header + rows + summary;
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tankiq-water-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
