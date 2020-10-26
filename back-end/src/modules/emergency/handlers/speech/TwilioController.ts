import { BodyParams, Controller, Inject, Post, Req, Use } from '@tsed/common';
import { ICallbackData } from './ICallbackData';
import { ICallData } from './ICallData';
import { ITranscriptionData } from './ITranscriptionData';
import { TwilioEmergencyHandler } from './TwilioEmergencyHandler';
import { TwilioVoiceMiddleware } from './TwilioVoiceMiddleware';

@Controller('/twilio')
export class TwilioController {
  @Inject(TwilioEmergencyHandler)
  private twilioEmergencyHandler: TwilioEmergencyHandler;

  @Post('/')
  @Use(TwilioVoiceMiddleware)
  public async incomingCall(
    @BodyParams() params: ICallData,
  ) {
    return this.twilioEmergencyHandler.handleIncomingCall(params);
  }

  @Post('/callback')
  @Use(TwilioVoiceMiddleware)
  public async incomingCallback(
    @BodyParams() params: ICallbackData
  ) {
    return this.twilioEmergencyHandler.handleCallback(params);
  }

  @Post('/transcribe')
  @Use(TwilioVoiceMiddleware)
  public async incomingTranscribe(
    @BodyParams() { CallSid, TranscriptionText }: ITranscriptionData
  ) {
    return this.twilioEmergencyHandler.handleTranscribe(CallSid, TranscriptionText);
  }
}
