export class Refill {
  private _id: number;
  private _refillDate: string;
  private _liters: number;
  private _costSoles: number;
  private _supplierName: string;
  private _invoiceNumber: string;
  private _buildingId: number;
  private _registeredByUserId: number;

  constructor(
    id: number = 0,
    refillDate: string = '',
    liters: number = 0,
    costSoles: number = 0,
    supplierName: string = '',
    invoiceNumber: string = '',
    buildingId: number = 0,
    registeredByUserId: number = 0
  ) {
    this._id = id;
    this._refillDate = refillDate;
    this._liters = liters;
    this._costSoles = costSoles;
    this._supplierName = supplierName;
    this._invoiceNumber = invoiceNumber;
    this._buildingId = buildingId;
    this._registeredByUserId = registeredByUserId;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get refillDate(): string {
    return this._refillDate;
  }

  set refillDate(value: string) {
    this._refillDate = value;
  }

  get liters(): number {
    return this._liters;
  }

  set liters(value: number) {
    this._liters = value;
  }

  get costSoles(): number {
    return this._costSoles;
  }

  set costSoles(value: number) {
    this._costSoles = value;
  }

  get supplierName(): string {
    return this._supplierName;
  }

  set supplierName(value: string) {
    this._supplierName = value;
  }

  get invoiceNumber(): string {
    return this._invoiceNumber;
  }

  set invoiceNumber(value: string) {
    this._invoiceNumber = value;
  }

  get buildingId(): number {
    return this._buildingId;
  }

  set buildingId(value: number) {
    this._buildingId = value;
  }

  get registeredByUserId(): number {
    return this._registeredByUserId;
  }

  set registeredByUserId(value: number) {
    this._registeredByUserId = value;
  }

  get formattedDate(): string {
    if (!this._refillDate) return 'Not registered';
    return new Date(this._refillDate).toLocaleDateString();
  }

  get costPerLiter(): number {
    if (!this._liters) return 0;
    return this._costSoles / this._liters;
  }
}
