import { Property } from '@tsed/common';
import { User } from './User';
import { UserApiKey } from './UserApiKey';

export class UserSession extends UserApiKey {
  @Property()
  public user: User;
}
