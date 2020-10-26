/* tslint:disable */
import { DepartmentSettingModel } from './department-setting-model';
import { ReportLocation } from './report-location';
export interface ReportModel {
  _id?: string;

  /**
   * Mongoose Ref ObjectId
   */
  callMessages?: Array<string>;
  callStatus?: string;
  caller?: string;
  createdAt?: string;
  department?: DepartmentSettingModel;
  identifier?: string;
  location?: ReportLocation;
  reportMode?: 0 | 1;
  responseType?: 0 | 1;
  updatedAt?: string;
}
