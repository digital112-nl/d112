import { BodyParams, Controller, Inject, Post, Req, Use, $log } from '@tsed/common';
import { TwilioEmergencyHandler } from './TwilioEmergencyHandler';
import { TwilioVoiceMiddleware } from './TwilioVoiceMiddleware';
import * as VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

@Controller('/twilio')
export class TwilioController {
  @Inject(TwilioEmergencyHandler)
  private twilioEmergencyHandler: TwilioEmergencyHandler;

  @Post('/')
  @Use(TwilioVoiceMiddleware)
  public incomingCall(
    @BodyParams() params: any,
    @Req() req: Express.Request
  ) {
    const voice = new VoiceResponse();

    voice.say(
      `Thanks for calling!
     Your phone number is ${params.From}. I got your call because of Twilio´s
     webhook. Goodbye!`
    );

    return voice.toString();
  }

  @Post('/callback')
  @Use(TwilioVoiceMiddleware)
  public incomingCallback(
    @BodyParams() params: any,
    @Req() req: Express.Request
  ) {
    return {};
  }
}
