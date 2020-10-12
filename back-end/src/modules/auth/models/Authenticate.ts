import { Property } from '@tsed/common';

export class Authenticate {
  @Property()
  public email: string;
  @Property()
  public password: string;
}
