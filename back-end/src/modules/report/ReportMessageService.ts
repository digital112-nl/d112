import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { Document } from 'mongoose';
import { Report } from './Report';
import { ReportMessage } from './ReportMessage';

@Service()
export class ReportMessageService {
  @Inject(ReportMessage)
  private reportMessageModel: MongooseModel<ReportMessage>;

  public async sendMessage(
    report: Report & Document,
    message: string
  ) {
    const newReportMessage = new this.reportMessageModel({
      message,
      played: false,
      reportId: report._id
    } as ReportMessage);
    report.messages.push(newReportMessage);

    await newReportMessage.save();
    await report.save();
  }
}
