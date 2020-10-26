import { isNil } from '@tsed/core';
import { Inject } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { Emit, Input, IO, Nsp, SocketService } from '@tsed/socketio';
import { Document } from 'mongoose';
import { Namespace, Server } from 'socket.io';
import { DepartmentCategory, DepartmentSettingModel } from '../ai/department/Departments';
import { EmergencyResponseType, Report } from './Report';

@SocketService('/report')
export class ReportService {
  @Nsp nsp: Namespace;
  @Inject(Report)
  private reportModel: MongooseModel<Report>;

  constructor(@IO private io: Server) {
  }

  public newReport(
    report: Report & Document
  ) {
    this.nsp.emit('new-report', report);
  }

  public updateReport(
    report: Report & Document
  ) {
    this.nsp.emit('update-report', report);
  }

  public async createOrGetReport(
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
      report: await this.createReport(identifier, responseType)
    };
  }

  public async createReport(
    identifier: string,
    responseType: EmergencyResponseType
  ): Promise<Report & Document> {
    const report = new this.reportModel({
      identifier,
      responseType
    } as Report);

    await report.save();

    this.newReport(report);

    return report;
  }

  public async setDepartment(
    report: Report & Document,
    category: DepartmentCategory
  ) {
    report.department = category as DepartmentSettingModel;
    await report.save();
    this.updateReport(report);
  }

  @Input('auth')
  @Emit('on-auth')
  public onAuth() {
  }

  public async setCaller(
    report: Report & Document,
    caller: string,
    callStatus: string
  ) {
    report.caller = caller;
    report.callStatus = callStatus;
    await report.save();
    this.updateReport(report);
  }

  protected internalGetReport(identifier: string) {
    return this.reportModel.findOne({ identifier })
      .populate('callMessages')
      .exec();
  }
}