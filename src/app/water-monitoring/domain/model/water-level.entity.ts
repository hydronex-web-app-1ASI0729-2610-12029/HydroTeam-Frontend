import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class WaterLevel implements BaseEntity {
  private _id: number;
  private _levelPercent: number;
  private _volumeLiters: number;
  private _recordedAt: string;
  private _sensorId: number;

  constructor(props: { id: number; levelPercent: number; volumeLiters: number; recordedAt: string; sensorId: number }) {
    this._id = props.id;
    this._levelPercent = props.levelPercent;
    this._volumeLiters = props.volumeLiters;
    this._recordedAt = props.recordedAt;
    this._sensorId = props.sensorId;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get levelPercent(): number { return this._levelPercent; }
  set levelPercent(value: number) { this._levelPercent = value; }

  get volumeLiters(): number { return this._volumeLiters; }
  set volumeLiters(value: number) { this._volumeLiters = value; }

  get recordedAt(): string { return this._recordedAt; }
  set recordedAt(value: string) { this._recordedAt = value; }

  get sensorId(): number { return this._sensorId; }
  set sensorId(value: number) { this._sensorId = value; }

  isLow(): boolean { return this._levelPercent < 20; }
  isCritical(): boolean { return this._levelPercent < 10; }
}
