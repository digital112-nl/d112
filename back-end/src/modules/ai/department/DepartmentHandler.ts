import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { Document } from 'mongoose';
import Message from '../../emergency/handlers/speech/messages/Message';
import { Report } from '../../emergency/Report';
import { ReportMessage } from '../../emergency/ReportMessage';
import { WitContext } from '../WitContext';
import { DepartmentAi } from './DepartmentAi';

@Service()
export class DepartmentHandler {
  @Inject(DepartmentAi)
  private ai: DepartmentAi;
  @Inject(ReportMessage)
  private reportMessageModel: MongooseModel<ReportMessage>;

  constructor() {
  }

  public async handleIncomingText(
    text: string,
    report: Report & Document
  ) {
    const result = `${text}`.trim() !== '' ?
      await this.ai.message(text, WitContext.fromReport(report)) :
      null;

    const message = new this.reportMessageModel({
      message: Message('This is a message that should be played back!')
        .toString(),
      played: false,
      reportId: report._id
    } as ReportMessage);
    report.messages.push(message);

    await message.save();
    await report.save();

    console.log(result);
  }
}
