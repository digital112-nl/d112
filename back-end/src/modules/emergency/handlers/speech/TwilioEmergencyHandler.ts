import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { isNil } from 'lodash';
import { Document } from 'mongoose';
import { Twilio } from 'twilio';
import { EmergencyHandler } from '../../EmergencyHandler';
import { EmergencyResponseType, Report } from '../../Report';
import { ReportMessage } from '../../ReportMessage';
import { ICallData } from './ICallData';
import KeepAliveMessage from './messages/KeepAliveMessage';

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBERS,
  TWILIO_ALLOWED_ANONYMOUS
} = process.env;

@Service()
export class TwilioEmergencyHandler extends EmergencyHandler {

  public isDisabled: boolean = isNil(TWILIO_ACCOUNT_SID) || isNil(TWILIO_AUTH_TOKEN);

  private client: Twilio = this.isDisabled ? null : new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  @Inject(ReportMessage)
  private reportMessageModel: MongooseModel<ReportMessage>;

  public async getReport(
    identifier: string
  ): Promise<{ created: boolean; report: Report & Document }> {
    return await this.internalCreateOrGetReport(identifier, EmergencyResponseType.Call);
  }

  public async handle(
    callSid: string,
    text: string
  ) {
    const { report } = await this.getReport(callSid);

    this.internalHandleIncomingText(text, report);
  }

  public canCall(params: ICallData): boolean {
    // The phone number that is calling
    const caller = params[ 'Caller' ];

    // Is anonymous allowed?
    const allowedAnonymous = (TWILIO_ALLOWED_ANONYMOUS || 'false') === 'true';

    // If the phone that is calling is anonymous (e.g Twilio client in the dashboard)
    if ( allowedAnonymous && caller === 'client:Anonymous' ) {
      return true;
    }

    // Phone numbers that are currently allowed
    const allowedPhoneNumbers = (TWILIO_PHONE_NUMBERS || '')
      .split(',');

    // If all the phone numbers are currently allowed
    const allPhoneNumbersAllowed = allowedPhoneNumbers.indexOf('*') > -1;

    // All phone numbers allowed yes or no
    if ( allPhoneNumbersAllowed ) {
      return true;
    }

    return allowedPhoneNumbers.indexOf(caller) > -1;
  }

  public async findAndPlayMessage(report: Report & Document): Promise<string> {
    const messagesToBePlayed = (report.messages as ReportMessage[])
      .filter(message => !message.played)
      .sort((
        a: any,
        b: any
      ) => b.createdAt - a.createdAt);

    if ( messagesToBePlayed.length > 0 ) {
      const selectedMessage = messagesToBePlayed[ 0 ];

      const reportMessage = await this.reportMessageModel
        .findOne({ _id: selectedMessage._id });

      reportMessage.played = true;
      await reportMessage.save();
      return reportMessage.message;
    } else {
      return KeepAliveMessage()
        .toString();
    }
  }
}
