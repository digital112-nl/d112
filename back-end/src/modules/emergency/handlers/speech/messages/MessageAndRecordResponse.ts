import * as VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

const {
  BASE_URL
} = process.env;

export default (message: string) => {
  const voice = new VoiceResponse();

  voice.say(message);
  voice.record({
    transcribe: true,
    transcribeCallback: `${BASE_URL}/api/v1/twilio/transcribe`,
    timeout: 2
  });

  return voice;
};
