import { Req } from '@tsed/common';
import { Document } from 'mongoose';
import { User } from '../user/User';
import { UserApiKey } from '../user/UserApiKey';

export interface RequestWithUser extends Req {
  user?: User & Document;
  apiKey?: UserApiKey & Document;
}
