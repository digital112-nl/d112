/* tslint:disable */
export interface User {
  createdAt: string;
  email: string;
  firstName: string;

  /**
   * Mongoose ObjectId
   */
  id?: string;
  lastName: string;
  password: string;
  updatedAt: string;
}
