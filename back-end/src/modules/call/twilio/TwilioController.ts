import { BodyParams, Controller, Inject, Post, Req, Use, $log } from '@tsed/common';
import { TwilioService } from './TwilioService';

const VoiceResponse = require('twilio/lib/twiml/VoiceResponse');

@Controller('/twilio')
export class TwilioController {
  @Inject(TwilioService)
  private twilioService: TwilioService;

  @Post('/')
  public incomingCall(
    @BodyParams() params: any
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
  public incomingCallback(
    @BodyParams() params: any
  ) {
    return {};
  }
}
