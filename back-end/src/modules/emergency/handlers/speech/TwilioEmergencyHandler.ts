import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { isNil } from 'lodash';
import { Document } from 'mongoose';
import { Twilio } from 'twilio';
import * as VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import { EmergencyResponseType, Report } from '../../../report/Report';
import { ReportCallMessage } from '../../../report/report-call-message/ReportCallMessage';
import { ReportService } from '../../../report/ReportService';
import { EmergencyHandler } from '../../EmergencyHandler';
import { ICallbackData } from './ICallbackData';
import { ICallData } from './ICallData';
import HelloMessage from './messages/HelloMessage';
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
  @Inject(ReportService)
  private reportService: ReportService;
  @Inject(ReportCallMessage)
  private reportCallMessageModel: MongooseModel<ReportCallMessage>;

  public async handleTranscribe(
    callSid: string,
    text: string
  ) {
    const { report } = await this.getReport(callSid);

    await this.internalHandleIncomingTranscribe(text, report);
  }

  public async handleIncomingCall(params: ICallData) {
    const isAllowed = this.canCall(params);

    const voice = new VoiceResponse();

    if ( !isAllowed ) {
      voice.reject();
      return voice.toString();
    }

    // Update caller & call status
    const { report, created } = await this.getReport(params[ 'CallSid' ]);

    // Set caller information
    await this.reportService.setCaller(report, params['Caller'], params['CallStatus']);

    // If we just created the call we would like to let them know this is the emergency number.
    if ( created ) {
      return HelloMessage()
        .toString();
    }

    // If it has playable messages
    if ( report.hasPlayableMessages() ) {
      return this.findAndPlayMessage(report);
    } else {
      return KeepAliveMessage()
        .toString();
    }
  }

  public async handleCallback(params: ICallbackData) {
    const { report } = await this.getReport(params[ 'CallSid' ]);
    report.callStatus = params.CallStatus;
    await report.save();
    this.reportService.updateReport(report);
  }

  private async getReport(
    identifier: string
  ): Promise<{ created: boolean; report: Report & Document }> {
    return await this.reportService.createOrGetReport(identifier, EmergencyResponseType.Call);
  }

  private canCall(params: ICallData): boolean {
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

  private async findAndPlayMessage(report: Report & Document): Promise<string> {
    const callMessagesToBePlayed = (report.callMessages as ReportCallMessage[])
      .filter(message => !message.played)
      .sort((
        a: any,
        b: any
      ) => b.createdAt - a.createdAt);

    if ( callMessagesToBePlayed.length > 0 ) {
      const selectedMessage = callMessagesToBePlayed[ 0 ];

      const reportMessage = await this.reportCallMessageModel
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
