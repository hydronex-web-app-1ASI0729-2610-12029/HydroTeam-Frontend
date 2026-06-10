import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class WaterConsumption implements BaseEntity {
  private _id: number;
  private _avgDailyLiters: number;
  private _buildingId: number;

  constructor(props: { id: number; avgDailyLiters: number; buildingId: number }) {
    this._id = props.id;
    this._avgDailyLiters = props.avgDailyLiters;
    this._buildingId = props.buildingId;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get avgDailyLiters(): number { return this._avgDailyLiters; }
  set avgDailyLiters(value: number) { this._avgDailyLiters = value; }

  get buildingId(): number { return this._buildingId; }
  set buildingId(value: number) { this._buildingId = value; }
}
