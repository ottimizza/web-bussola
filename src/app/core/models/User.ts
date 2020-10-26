import { TokenInfo } from '@app/models/TokenInfo';
import { TypeConversorUtils } from '@shared/utils/type-conversor.utils';
import { Organization } from './Organization';

export class UserAdditionalInformation {
  public role: string;
  public birthDate: string;
  public accountingDepartment: string;
}

export class User {

  static Type = class {
    static ADMINISTRATOR = 0;
    static ACCOUNTANT = 1;
    static CUSTOMER = 2;
  };

  id: number;
  username: string;
  password: string;

  active: boolean;
  activated: boolean;
  type: number;

  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;

  organization: Organization;

  additionalInformation: UserAdditionalInformation;

  static fromLocalStorage(): User {
    const storedUser = JSON.parse(localStorage.getItem('user-info') || '{}');
    return TypeConversorUtils.fromAny<User>(storedUser, new User());
  }

  public static allInfoFromLocalStorage(): User & TokenInfo {
    return Object.assign(this.fromLocalStorage(), TokenInfo.fromLocalStorage());
  }

  isCustomer = () => this.type === User.Type.CUSTOMER;

  isAccountant = () => this.type === User.Type.ACCOUNTANT;

  isAdministrator = () => this.type === User.Type.ADMINISTRATOR;

}
