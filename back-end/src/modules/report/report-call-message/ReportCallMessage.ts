import { Default, Property } from '@tsed/common';
import { Model, VirtualRef } from '@tsed/mongoose';
import { Report } from './Report';

@Model({
  schemaOptions: {
    timestamps: true
  }
})
export class ReportCallMessage {
  @Property()
  public _id: string;
  @VirtualRef('Report')
  public reportId: VirtualRef<Report>;
  @Property()
  public message: string;
  @Property()
  @Default(false)
  public played: boolean = false;
  @Property()
  public updatedAt: Date;
  @Property()
  public createdAt: Date;
}
