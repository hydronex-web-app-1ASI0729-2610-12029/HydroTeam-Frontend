import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class WaterLevel implements BaseEntity {
  private _id: number;
  private _levelPercent: number;
  private _recordedAt: string;

  constructor(props: { id: number; levelPercent: number; recordedAt: string }) {
    this._id = props.id;
    this._levelPercent = props.levelPercent;
    this._recordedAt = props.recordedAt;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get levelPercent(): number { return this._levelPercent; }
  set levelPercent(value: number) { this._levelPercent = value; }

  get recordedAt(): string { return this._recordedAt; }
  set recordedAt(value: string) { this._recordedAt = value; }


  isLow(): boolean {
    return this._levelPercent < 20;
  }

  isCritical(): boolean {
    return this._levelPercent < 10;
  }
}
