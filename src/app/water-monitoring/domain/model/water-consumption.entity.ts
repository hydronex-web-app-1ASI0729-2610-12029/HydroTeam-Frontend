import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class WaterConsumption implements BaseEntity {
  private _id: number;
  private _periodStart: string;
  private _periodEnd: string;
  private _avgDailyLiters: number;
  private _totalPeriodLiters: number;
  private _buildingId: number;

  constructor(props: {
    id: number;
    periodStart: string;
    periodEnd: string;
    avgDailyLiters: number;
    totalPeriodLiters: number;
    buildingId: number;
  }) {
    this._id = props.id;
    this._periodStart = props.periodStart;
    this._periodEnd = props.periodEnd;
    this._avgDailyLiters = props.avgDailyLiters;
    this._totalPeriodLiters = props.totalPeriodLiters;
    this._buildingId = props.buildingId;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get periodStart(): string { return this._periodStart; }
  set periodStart(value: string) { this._periodStart = value; }

  get periodEnd(): string { return this._periodEnd; }
  set periodEnd(value: string) { this._periodEnd = value; }

  get avgDailyLiters(): number { return this._avgDailyLiters; }
  set avgDailyLiters(value: number) { this._avgDailyLiters = value; }

  get totalPeriodLiters(): number { return this._totalPeriodLiters; }
  set totalPeriodLiters(value: number) { this._totalPeriodLiters = value; }

  get buildingId(): number { return this._buildingId; }
  set buildingId(value: number) { this._buildingId = value; }
}
