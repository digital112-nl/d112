import { Default, Enum, Property } from '@tsed/common';
import { Model, Ref } from '@tsed/mongoose';
import { ReportCallMessage } from './ReportCallMessage';
import { ReportLocation } from './ReportLocation';

export enum EmergencyResponseType {
  Text = 0,
  Call = 1
}

export enum ReportMode {
  Department = 0,
  Questionnaire = 1
}

@Model({
  schemaOptions: {
    timestamps: true
  }
})
export class Report {
  @Property()
  public _id: string;
  @Property()
  public identifier: string;
  @Property()
  public caller: string;
  @Property()
  public callStatus: string;
  @Enum(EmergencyResponseType)
  public responseType: EmergencyResponseType;
  @Enum(ReportMode)
  @Default(ReportMode.Department)
  public reportMode: ReportMode = ReportMode.Department;
  @Ref(ReportCallMessage)
  public callMessages: Ref<ReportCallMessage>[];
  @Ref(ReportLocation)
  public location: Ref<ReportLocation>;
  @Property()
  public updatedAt: Date;
  @Property()
  public createdAt: Date;

  public hasPlayableMessages() {
    return (this.callMessages as ReportCallMessage[]).filter(message => !message.played).length > 0;
  }
}

