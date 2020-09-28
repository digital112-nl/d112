import * as VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

const {
  BASE_URL
} = process.env;

export default () => {
  const voice = new VoiceResponse();

  voice.pause({
    length: 3
  });
  voice.redirect(`${BASE_URL}/api/v1/twilio/`);

  return voice;
};
