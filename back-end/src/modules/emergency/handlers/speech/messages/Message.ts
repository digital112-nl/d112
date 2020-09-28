import * as VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

const {
  BASE_URL
} = process.env;

export default (message: string) => {
  const voice = new VoiceResponse();

  voice.say(message);
  voice.pause({
    length: 1
  });
  voice.redirect(`${BASE_URL}/api/v1/twilio/`);

  return voice;
};
