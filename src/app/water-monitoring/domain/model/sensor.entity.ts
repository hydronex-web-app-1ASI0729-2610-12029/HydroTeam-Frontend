import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class Sensor implements BaseEntity {
  private _id: number;
  private _hardwareId: string;
  private _type: string;
  private _status: string;
  private _lastSyncAt: string;
  private _cisternId: number;

  constructor(props: {
    id: number;
    hardwareId: string;
    type: string;
    status: string;
    lastSyncAt: string;
    cisternId: number;
  }) {
    this._id = props.id;
    this._hardwareId = props.hardwareId;
    this._type = props.type;
    this._status = props.status;
    this._lastSyncAt = props.lastSyncAt;
    this._cisternId = props.cisternId;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get hardwareId(): string { return this._hardwareId; }
  set hardwareId(value: string) { this._hardwareId = value; }

  get type(): string { return this._type; }
  set type(value: string) { this._type = value; }

  get status(): string { return this._status; }
  set status(value: string) { this._status = value; }

  get lastSyncAt(): string { return this._lastSyncAt; }
  set lastSyncAt(value: string) { this._lastSyncAt = value; }

  get cisternId(): number { return this._cisternId; }
  set cisternId(value: number) { this._cisternId = value; }

  isActive(): boolean { return this._status === 'ACTIVE'; }
  isOffline(): boolean { return this._status === 'OFFLINE'; }
  isInMaintenance(): boolean { return this._status === 'MAINTENANCE'; }
}
