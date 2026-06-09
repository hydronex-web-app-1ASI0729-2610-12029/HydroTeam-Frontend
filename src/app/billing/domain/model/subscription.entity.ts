import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {SubscriptionStatus} from './subscription-status.enum';

/**
 * Represent Subscription entity.
 */
export class Subscription implements BaseEntity {
  private readonly _id: number;
  private readonly _startDate: string;
  private readonly _endDate: string;
  private readonly _status: SubscriptionStatus;
  private readonly _buildingId: number;
  private readonly _planId: number;

  constructor(props: {
    id: number;
    startDate: string;
    endDate: string;
    status: SubscriptionStatus;
    buildingId: number;
    planId: number;
  }) {
    this._id = props.id;
    this._startDate = props.startDate;
    this._endDate = props.endDate;
    this._status = props.status;
    this._buildingId = props.buildingId;
    this._planId = props.planId;
  }

  /*
    Getters
   */
  get id(): number {
    return this._id;
  }
  get startDate(): string {
    return this._startDate;
  }
  get endDate(): string {
    return this._endDate;
  }
  get status(): SubscriptionStatus {
    return this._status;
  }
  get buildingId(): number {
    return this._buildingId;
  }
  get planId(): number {
    return this._planId;
  }
}
