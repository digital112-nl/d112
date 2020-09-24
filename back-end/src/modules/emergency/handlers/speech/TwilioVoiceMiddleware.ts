import { EndpointInfo, Inject, Middleware, Next, Req, Res } from '@tsed/common';
import { validateExpressRequest } from 'twilio';
import { TwilioEmergencyHandler } from './TwilioEmergencyHandler';
import * as VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

const {
  TWILIO_AUTH_TOKEN,
  BASE_URL
} = process.env;

@Middleware()
export class TwilioVoiceMiddleware {
  @Inject(TwilioEmergencyHandler)
  private twilioEmergencyHandler: TwilioEmergencyHandler;

  use(
    @Req() req: Req,
    @Res() res: Res,
    @EndpointInfo() endpointInfo: EndpointInfo,
    @Next() next: Next
  ) {
    const voice = new VoiceResponse();

    if ( this.twilioEmergencyHandler.isDisabled ) {
      voice.say(
        `Sorry but calling is not configured on this server. Please check server settings.`
      );

      res.status(200).send(voice.toString());
      return;
    }

    const valid = validateExpressRequest(req, TWILIO_AUTH_TOKEN, { url: `${BASE_URL}${req.originalUrl}` });

    if ( !valid ) {
      voice.say(
        `Sorry but it seems like this request from Twilio is not valid. Please check server settings.`
      );

      res.status(200).send(voice.toString());
      return;
    }

    next();
  }
}
