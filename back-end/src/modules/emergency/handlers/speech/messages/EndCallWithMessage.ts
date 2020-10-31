import * as VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

export default (message: string) => {
  const voice = new VoiceResponse();

  voice.say(message);
  voice.pause({
    length: 1
  });
  voice.leave();

  return voice;
};
