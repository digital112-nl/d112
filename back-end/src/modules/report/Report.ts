import { Default, Enum, Property } from '@tsed/common';
import { Model, Ref } from '@tsed/mongoose';
import { ReportMessage } from './ReportMessage';

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
  @Ref(ReportMessage)
  public messages: Ref<ReportMessage>[];
  @Property()
  public updatedAt: Date;
  @Property()
  public createdAt: Date;

  public hasPlayableMessages() {
    const messages: ReportMessage[] = this.messages as ReportMessage[];

    return messages.filter(message => !message.played).length > 0;
  }
}

