/* tslint:disable */
import { User } from './user';
export interface UserSession {
  createdAt?: string;

  /**
   * Mongoose ObjectId
   */
  id?: string;
  token?: string;
  user: User;
  validUntil?: string;
}
