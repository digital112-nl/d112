import { Required } from '@tsed/common';

export class UserRegister {
  @Required()
  public firstName: string;
  @Required()
  public lastName: string;
  @Required()
  public email: string;
  @Required()
  public password: string;
}
