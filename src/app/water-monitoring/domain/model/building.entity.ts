import { BaseEntity } from '../../../shared/domain/model/base-entity';

export class Building implements BaseEntity {
  private _id: number;
  private _name: string;
  private _address: string;
  private _district: string;

  constructor(props: { id: number; name: string; address: string; district: string }) {
    this._id = props.id;
    this._name = props.name;
    this._address = props.address;
    this._district = props.district;
  }

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }

  get address(): string { return this._address; }
  set address(value: string) { this._address = value; }

  get district(): string { return this._district; }
  set district(value: string) { this._district = value; }
}
