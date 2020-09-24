import { Service } from '@tsed/di';
import { isNil } from 'lodash';
import { Twilio } from 'twilio';
import { EmergencyHandler } from '../../EmergencyHandler';

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN
} = process.env;

@Service()
export class TwilioEmergencyHandler extends EmergencyHandler {

  public isDisabled: boolean = isNil(TWILIO_ACCOUNT_SID) || isNil(TWILIO_AUTH_TOKEN);

  private client: Twilio = this.isDisabled ? null : new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

}
