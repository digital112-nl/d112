import { Inject, Service } from '@tsed/di';
import { isNil } from 'lodash';
import { Document } from 'mongoose';
import { Twilio } from 'twilio';
import { EmergencyHandler } from '../../EmergencyHandler';
import { EmergencyResponseType, Report } from '../../Report';

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN
} = process.env;

@Service()
export class TwilioEmergencyHandler extends EmergencyHandler {

  public isDisabled: boolean = isNil(TWILIO_ACCOUNT_SID) || isNil(TWILIO_AUTH_TOKEN);

  private client: Twilio = this.isDisabled ? null : new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

  public async getReport(
    identifier: string
  ): Promise<{ created: boolean; report: Report & Document }> {
    return await this.internalCreateOrGetReport(identifier, EmergencyResponseType.Call);
  }

  public async handle(
    callSid: string,
    text: string
  ) {
    const { report, created } = await this.getReport(callSid);

    this.internalHandleIncomingText(text, report);
  }
}
