import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { AlertType } from './alert-type.enum';
import { AlertStatus } from './alert-status.enum';

/**
 * Represents an Alert entity in the Notification context.
 */
export class Alert implements BaseEntity {
  private readonly _id: number;
  private readonly _type: AlertType;
  private readonly _message: string;
  private _status: AlertStatus;
  private readonly _triggeredAt: string;
  private _resolvedAt: string | null;
  private readonly _cisternId: string;

  constructor(props: {
    id: number;
    type: AlertType;
    message: string;
    status: AlertStatus;
    triggeredAt: string;
    resolvedAt: string | null;
    cisternId: string;
  }) {
    this._id = props.id;
    this._type = props.type;
    this._message = props.message;
    this._status = props.status;
    this._triggeredAt = props.triggeredAt;
    this._resolvedAt = props.resolvedAt;
    this._cisternId = props.cisternId;
  }

  /*
    Getters
  */
  get id(): number { return this._id; }

  get type(): AlertType { return this._type; }

  get message(): string { return this._message; }

  get status(): AlertStatus { return this._status; }

  get triggeredAt(): string { return this._triggeredAt; }

  get resolvedAt(): string | null { return this._resolvedAt; }

  get cisternId(): string { return this._cisternId; }

  /*
    Methods
  */
  resolve(): void {
    this._status = AlertStatus.resolved;
    this._resolvedAt = new Date().toISOString();
  }

  isResolved(): boolean {
    return this._status === AlertStatus.resolved;
  }
}