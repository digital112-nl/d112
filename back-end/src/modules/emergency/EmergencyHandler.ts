import { isNil } from '@tsed/core';
import { Inject } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { Document } from 'mongoose';
import { DepartmentHandler } from '../ai/department/DepartmentHandler';
import { QuestionnaireHandler } from '../ai/questionnaire/QuestionnaireHandler';
import { Report, ReportMode } from '../report/Report';
import { ReportService } from '../report/ReportService';


export class EmergencyHandler {
  @Inject(DepartmentHandler)
  private departmentHandler: DepartmentHandler;
  @Inject(QuestionnaireHandler)
  private questionnaireHandler: QuestionnaireHandler;

  protected async internalHandleIncomingTranscribe(
    text: string,
    report: Report & Document
  ) {
    switch (report.reportMode) {
      case ReportMode.Department:
        return this.departmentHandler.handleIncomingText(text, report);
      case ReportMode.Questionnaire:
        return this.questionnaireHandler.handleIncomingText(text, report);
    }
  }
}
