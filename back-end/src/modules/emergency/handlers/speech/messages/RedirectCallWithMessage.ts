import * as VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

const {
  TWILIO_REDIRECT_TO
} = process.env;

export default (message: string) => {
  const voice = new VoiceResponse();

  voice.say(message);
  voice.pause({
    length: 1
  });
  voice.dial(TWILIO_REDIRECT_TO);

  return voice;
};
