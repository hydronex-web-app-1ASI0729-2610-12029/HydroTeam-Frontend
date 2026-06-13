import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class Cistern implements BaseEntity {
  private _id: number;
  private _capacityLiters: number;
  private _currentLevelPercent: number;
  private _alertThresholdPercent: number;
  private _buildingId: number;

  constructor(props: {
    id: number;
    capacityLiters: number;
    currentLevelPercent: number;
    alertThresholdPercent: number;
    buildingId: number;
  }) {
    this._id = props.id;
    this._capacityLiters = props.capacityLiters;
    this._currentLevelPercent = props.currentLevelPercent;
    this._alertThresholdPercent = props.alertThresholdPercent;
    this._buildingId = props.buildingId;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get capacityLiters(): number { return this._capacityLiters; }
  set capacityLiters(value: number) { this._capacityLiters = value; }

  get currentLevelPercent(): number { return this._currentLevelPercent; }
  set currentLevelPercent(value: number) { this._currentLevelPercent = value; }

  get alertThresholdPercent(): number { return this._alertThresholdPercent; }
  set alertThresholdPercent(value: number) { this._alertThresholdPercent = value; }

  get buildingId(): number { return this._buildingId; }
  set buildingId(value: number) { this._buildingId = value; }

  get currentVolumeLiters(): number {
    return Math.round(this._capacityLiters * (this._currentLevelPercent / 100));
  }

  isLow(): boolean { return this._currentLevelPercent <= this._alertThresholdPercent; }
}
