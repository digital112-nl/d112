import { BodyParams, Controller, Inject, Post, Req, Use } from '@tsed/common';
import * as VoiceResponse from 'twilio/lib/twiml/VoiceResponse';
import { ICallbackData } from './ICallbackData';
import { ICallData } from './ICallData';
import { ITranscriptionData } from './ITranscriptionData';
import HelloMessage from './messages/HelloMessage';
import KeepAliveMessage from './messages/KeepAliveMessage';
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
    @BodyParams() params: ICallData,
    @Req() req: Express.Request
  ) {
    const isAllowed = this.twilioEmergencyHandler.canCall(params);

    const voice = new VoiceResponse();

    if ( !isAllowed ) {
      voice.reject();
      return voice.toString();
    }

    // Update caller & call status
    const { report, created } = await this.twilioEmergencyHandler.getReport(params[ 'CallSid' ]);
    report.caller = params.Caller;
    report.callStatus = params.CallStatus;
    await report.save();

    // If we just created the call we would like to let them know this is the emergency number.
    if ( created ) {
      return HelloMessage()
        .toString();
    }

    // If it has playable messages
    if ( report.hasPlayableMessages() ) {
      return this.twilioEmergencyHandler
        .findAndPlayMessage(report);
    } else {
      return KeepAliveMessage()
        .toString();
    }
  }

  @Post('/callback')
  @Use(TwilioVoiceMiddleware)
  public async incomingCallback(
    @BodyParams() params: ICallbackData,
    @Req() req: Express.Request
  ) {
    const { report } = await this.twilioEmergencyHandler.getReport(params[ 'CallSid' ]);
    report.callStatus = params.CallStatus;
    await report.save();
    return {};
  }

  @Post('/transcribe')
  @Use(TwilioVoiceMiddleware)
  public async incomingTranscribe(
    @BodyParams() { CallSid, TranscriptionText }: ITranscriptionData,
    @Req() req: Express.Request
  ) {
    return this.twilioEmergencyHandler.handle(CallSid, TranscriptionText);
  }
}
