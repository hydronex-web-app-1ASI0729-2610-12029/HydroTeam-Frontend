import { DashboardOverview } from '../domain/model/dashboard-overview.entity';
import { ConsumptionSeries } from '../domain/model/consumption-point.entity';
import { DashboardOverviewResponse } from './dashboard-overview-response';

export class DashboardOverviewAssembler {
  static toEntity(response: DashboardOverviewResponse): DashboardOverview {
    const buildSeries = (period: ConsumptionSeries['period'], values: number[]): ConsumptionSeries => {
      const points = values.map((liters, index) => ({ label: `${index + 1}`, liters }));
      const total = values.reduce((sum, value) => sum + value, 0);
      const peak = Math.max(...values);
      const average = Math.round(total / values.length);

      return { period, points, total, peak, average };
    };

    return {
      buildingName: response.buildingName,
      district: response.district,
      lastUpdated: response.lastUpdated,
      metrics: [
        {
          title: 'Current level',
          value: `${response.levelPercentage}%`,
          detail: `${response.availableLiters.toLocaleString()} liters available`,
          icon: 'water_drop',
          tone: 'success',
          progress: response.levelPercentage,
        },
        {
          title: 'Estimated days',
          value: `${response.estimatedDays} days`,
          detail: `Average consumption: ${response.averageConsumption} L/day`,
          icon: 'calendar_today',
          tone: 'primary',
        },
        {
          title: 'Last refill',
          value: response.lastRefillDate,
          detail: `S/. ${response.lastRefillCost} · ${response.lastRefillAmount.toLocaleString()} liters`,
          icon: 'local_shipping',
          tone: 'warning',
        },
      ],
      cisternStatus: {
        level: response.levelPercentage,
        status: 'Optimal status',
        temperature: response.sensorTemperature,
        signal: response.signal,
      },
      consumption: [
        buildSeries('7d', response.consumption7d),
        buildSeries('1m', response.consumption1m),
        buildSeries('3m', response.consumption3m),
      ],
      alerts: response.alerts.map((alert) => ({
        title: alert.title,
        description: alert.description,
        time: alert.time,
        tone: alert.type,
        icon: alert.type === 'warning' ? 'warning' : alert.type === 'success' ? 'check_circle' : 'info',
      })),
      insights: [
        { title: 'Sensor status', value: response.signal, helper: 'Last sync 3 min ago', icon: 'sensors' },
        { title: 'Average refill', value: '5,000 L', helper: 'Based on recent records', icon: 'opacity' },
        { title: 'Monthly usage', value: '13,500 L', helper: 'Current estimate', icon: 'analytics' },
      ],
    };
  }
}
