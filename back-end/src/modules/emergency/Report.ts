import { Enum, Property } from '@tsed/common';
import { Model } from '@tsed/mongoose';

export enum EmergencyResponseType {
  Text = 0,
  Call = 1
}

@Model()
export class Report {
  @Property()
  public _id: string;
  @Property()
  public identifier: string;
  @Enum(EmergencyResponseType)
  public responseType: EmergencyResponseType;
}
