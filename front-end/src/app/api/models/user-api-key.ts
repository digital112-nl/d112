/* tslint:disable */
export interface UserApiKey {
  createdAt?: string;

  /**
   * Mongoose ObjectId
   */
  id?: string;
  token?: string;

  /**
   * Mongoose Ref ObjectId
   */
  user: string;
  validUntil?: string;
}
