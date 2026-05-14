import { BaseEntity } from '../../../shared/domain/model/base-entity';

export type AlertType = 'LOW' | 'CRITICAL';

export class Alert implements BaseEntity {
  private _id: number;
  private _type: AlertType;
  private _message: string;
  private _timestamp: string;
  private _isResolved: boolean;
  private _cisternId: number;

  constructor(props: {
    id: number;
    type: AlertType;
    message: string;
    timestamp: string;
    isResolved: boolean;
    cisternId: number;
  }) {
    this._id = props.id;
    this._type = props.type;
    this._message = props.message;
    this._timestamp = props.timestamp;
    this._isResolved = props.isResolved;
    this._cisternId = props.cisternId;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get type(): AlertType { return this._type; }
  set type(value: AlertType) { this._type = value; }

  get message(): string { return this._message; }
  set message(value: string) { this._message = value; }

  get timestamp(): string { return this._timestamp; }
  set timestamp(value: string) { this._timestamp = value; }

  get isResolved(): boolean { return this._isResolved; }
  set isResolved(value: boolean) { this._isResolved = value; }

  get cisternId(): number { return this._cisternId; }
  set cisternId(value: number) { this._cisternId = value; }

  resolve(): void {
    this._isResolved = true;
  }
}
