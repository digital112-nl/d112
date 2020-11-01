import { Default, Enum, Property } from '@tsed/common';
import { isNil } from '@tsed/core';
import { InternalServerError } from '@tsed/exceptions';
import { Model, Ref } from '@tsed/mongoose';
import { DepartmentSettingModel } from '../ai/department/Departments';
import { QuestionnaireModel } from '../ai/questionnaire/Questionnaire';
import { ReportCallMessage } from './report-call-message/ReportCallMessage';
import { ReportLocation } from './report-location/ReportLocation';
import { assign } from 'lodash';

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
  @Property()
  public department: DepartmentSettingModel;
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

