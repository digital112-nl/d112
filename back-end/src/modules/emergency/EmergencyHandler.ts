import { isNil } from '@tsed/core';
import { Inject } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { Document } from 'mongoose';
import { DepartmentHandler } from '../ai/department/DepartmentHandler';
import { EmergencyResponseType, Report, ReportMode } from '../report/Report';


export class EmergencyHandler {
  @Inject(DepartmentHandler)
  private departmentHandler: DepartmentHandler;
  @Inject(Report)
  private reportModel: MongooseModel<Report>;

  protected async internalCreateOrGetReport(
    identifier: string,
    responseType: EmergencyResponseType
  ): Promise<{ created: boolean, report: Report & Document }> {
    const report = await this.internalGetReport(identifier);

    if ( !isNil(report) ) {
      return {
        created: false,
        report
      };
    }

    return {
      created: true,
      report: await this.internalCreateReport(identifier, responseType)
    };
  }

  protected async internalCreateReport(
    identifier: string,
    responseType: EmergencyResponseType
  ): Promise<Report & Document> {
    const report = new this.reportModel({
      identifier,
      responseType
    } as Report);

    await report.save();

    return report;
  }

  protected async internalHandleIncomingText(
    text: string,
    report: Report & Document
  ) {
    switch (report.reportMode) {
      case ReportMode.Department:
        return this.departmentHandler.handleIncomingText(text, report);
      case ReportMode.Questionnaire:
        break;
    }
  }

  protected internalGetReport(identifier: string) {
    return this.reportModel.findOne({ identifier })
      .populate('messages')
      .exec();
  }
}
