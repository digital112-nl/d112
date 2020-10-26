import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { Document } from 'mongoose';
import { Report } from '../Report';
import { ReportService } from '../ReportService';
import { ReportCallMessage } from './ReportCallMessage';

@Service()
export class ReportCallMessageService {
  @Inject(Report)
  private reportModel: MongooseModel<Report>;
  @Inject(ReportService)
  private reportService: ReportService;
  @Inject(ReportCallMessage)
  private reportCallMessageModel: MongooseModel<ReportCallMessage>;

  public async sendMessage(
    report: Report & Document,
    message: string
  ) {
    const newReportCallMessage = new this.reportCallMessageModel({
      message,
      played: false,
      reportId: report._id
    } as ReportCallMessage);
    report.callMessages.push(newReportCallMessage);

    await newReportCallMessage.save();
    await report.save();
  }

  public async sendMessageById(
    reportId: string,
    message: string
  ) {
    return this.sendMessage(
      await this.reportModel.findOne({ _id: reportId })
        .populate('callMessages')
        .exec(),
      message
    );
  }
}
