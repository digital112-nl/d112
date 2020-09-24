import { BodyParams, Controller, Inject, Post, Req, Use } from '@tsed/common';
import * as VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import { ITranscriptionData } from './ITranscriptionData';
import { TwilioEmergencyHandler } from './TwilioEmergencyHandler';
import { TwilioVoiceMiddleware } from './TwilioVoiceMiddleware';

const { BASE_URL } = process.env;

@Controller('/twilio')
export class TwilioController {
  @Inject(TwilioEmergencyHandler)
  private twilioEmergencyHandler: TwilioEmergencyHandler;

  @Post('/')
  @Use(TwilioVoiceMiddleware)
  public async incomingCall(
    @BodyParams() params: any,
    @Req() req: Express.Request
  ) {
    const { report, created } = await this.twilioEmergencyHandler.getReport(params[ 'CallSid' ]);

    const voice = new VoiceResponse();
    if ( created ) {
      voice.say(
        `Hello you are calling the (TEST) emergency number! Please state your issue after the beep.`
      );

      voice.record({
        transcribe: true,
        transcribeCallback: `${BASE_URL}/api/v1/twilio/transcribe`
      });

      return voice.toString();
    }

    voice.pause({
      length: 5
    });
    voice.say('I just paused 5 seconds');

    return voice.toString();
  }

  @Post('/callback')
  @Use(TwilioVoiceMiddleware)
  public incomingCallback(
    @BodyParams() params: any,
    @Req() req: Express.Request
  ) {
    console.log({ callback: params });
    return {};
  }

  @Post('/transcribe')
  @Use(TwilioVoiceMiddleware)
  public async incomingTranscribe(
    @BodyParams() { TranscriptionText, CallSid }: ITranscriptionData,
    @Req() req: Express.Request
  ) {
    return this.twilioEmergencyHandler.handle(CallSid, TranscriptionText);
  }
}
