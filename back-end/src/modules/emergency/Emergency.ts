import { Enum, Property } from '@tsed/common';
import { Model } from '@tsed/mongoose';

enum EmergencyResponseType {
  Text = 0,
  Call = 1
}

@Model()
export class Emergency {
  @Property()
  public _id: string;
  @Property()
  public identifier: string;
  @Enum(EmergencyResponseType)
  public responseType: EmergencyResponseType;
}
