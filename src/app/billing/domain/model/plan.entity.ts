import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represent Plan entity.
 */
export class Plan implements BaseEntity {
  private readonly _id: number;
  private readonly _name: string;
  private readonly _price: number;
  private readonly _features: string;
  private readonly _maxSensors: number;

  constructor(props: {
    id: number;
    name: string;
    price: number;
    features: string;
    maxSensors: number;
  }) {
    this._id = props.id;
    this._name = props.name;
    this._price = props.price;
    this._features = props.features;
    this._maxSensors = props.maxSensors;
  }

  /**
   * Getters.
   */
  get id(): number {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get price(): number {
    return this._price;
  }
  get features(): string {
    return this._features;
  }
  get maxSensors(): number {
    return this._maxSensors;
  }
}
