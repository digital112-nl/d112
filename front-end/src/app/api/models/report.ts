/* tslint:disable */
export interface Report {
  _id?: string;
  callStatus?: string;
  caller?: string;
  createdAt?: string;
  identifier?: string;

  /**
   * Mongoose Ref ObjectId
   */
  messages?: Array<string>;
  reportMode?: 0 | 1;
  responseType?: 0 | 1;
  updatedAt?: string;
}
