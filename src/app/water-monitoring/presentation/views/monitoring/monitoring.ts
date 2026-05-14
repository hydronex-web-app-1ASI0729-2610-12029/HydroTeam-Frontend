import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
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

  chartWidth = 700;
  chartHeight = 300;
  chartPadding = { top: 20, right: 20, bottom: 32, left: 48 };
  chartShowBars = false;
  barWidth = 14;

  chartGridLines = [0, 20, 40, 60, 80, 100].map(v => ({
    label: v,
    pos: this.scaleY(v),
  }));

  averageLevel = computed(() => {
    const levels = this.store.waterLevels();
    if (!levels.length) return 0;
    return Math.round(levels.reduce((sum, l) => sum + l.levelPercent, 0) / levels.length);
  });

  minLevel = computed(() => {
    const levels = this.store.waterLevels();
    if (!levels.length) return 0;
    return Math.min(...levels.map(l => l.levelPercent));
  });

  chartPoints = computed(() => {
    const levels = this.store.waterLevels();
    if (!levels.length) return [];
    const usable = this.chartWidth - this.chartPadding.left - this.chartPadding.right;
    const step = levels.length > 1 ? usable / (levels.length - 1) : usable / 2;
    return levels.map((l, i) => ({
      x: this.chartPadding.left + i * step,
      y: this.scaleY(l.levelPercent),
      value: l.levelPercent,
      label: new Date(l.recordedAt).toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
    }));
  });

  chartXLabels = computed(() => {
    const points = this.chartPoints();
    if (points.length <= 8) return points;
    const step = Math.ceil(points.length / 7);
    return points.filter((_, i) => i % step === 0 || i === points.length - 1);
  });

  linePoints = computed(() =>
    this.chartPoints().map(p => `${p.x},${p.y}`).join(' ')
  );

  areaPoints = computed(() => {
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
    const avg = this.averageLevel();
    const min = this.minLevel();
    const max = levels.length ? Math.max(...levels.map(l => l.levelPercent)) : 0;

    const header = 'ID,Fecha,Nivel (%),Estado\n';
    const rows = levels.map(l => {
      const status = l.isCritical() ? 'CRITICO' : l.isLow() ? 'BAJO' : 'NORMAL';
      return `${l.id},${l.recordedAt},${l.levelPercent},${status}`;
    }).join('\n');

    const summary = [
      '', '',
      'RESUMEN',
      `Total lecturas,${levels.length}`,
      `Promedio,${avg}%`,
      `Minimo,${min}%`,
      `Maximo,${max}%`,
      `Generado,${new Date().toISOString()}`,
    ].join('\n');

    const csv = header + rows + summary;
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tankiq-water-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
