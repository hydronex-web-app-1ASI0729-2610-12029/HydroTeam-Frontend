// src/app/iam/domain/user.entity.ts

export enum UserRole {
  ADMINISTRATOR = 'ADMINISTRATOR',
  RESIDENT = 'RESIDENT',
}

export interface UserProps {
  userId: number;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phoneNumber?: string;
  apartmentNumber?: string;
}

export class User {
  readonly userId: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: UserRole;

  constructor(props: UserProps) {
    this.userId = props.userId;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password ?? '';
    this.role = props.role;
  }

  get isAdministrator(): boolean {
    return this.role === UserRole.ADMINISTRATOR;
  }

  get isResident(): boolean {
    return this.role === UserRole.RESIDENT;
  }
}

export class Administrator extends User {
  readonly phoneNumber: string;

  constructor(props: UserProps & { phoneNumber: string }) {
    super({ ...props, role: UserRole.ADMINISTRATOR });
    this.phoneNumber = props.phoneNumber;
  }
}

export class Resident extends User {
  readonly apartmentNumber: string;

  constructor(props: UserProps & { apartmentNumber: string }) {
    super({ ...props, role: UserRole.RESIDENT });
    this.apartmentNumber = props.apartmentNumber;
  }
}
