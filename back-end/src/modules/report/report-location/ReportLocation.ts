import { Property } from '@tsed/common';
import { Model, PreHook } from '@tsed/mongoose';
import { isNil } from 'lodash';
import { v4 } from 'uuid';

@Model({
  schemaOptions: {
    timestamps: true
  }
})
export class ReportLocation {
  @Property()
  public _id: string;
  @Property()
  public lat: number;
  @Property()
  public lon: number;
  @Property()
  public accuracy: number;
  @Property()
  public report: string;
  @Property()
  public token: string;
  @Property()
  public createdAt: Date;
  @Property()
  public updatedAt: Date;

  @PreHook('save')
  static async preSave(
    reportLocation: ReportLocation,
    next
  ) {
    if ( isNil(reportLocation.token) ) {
      reportLocation.token = v4();
    }
    next();
  }
}
