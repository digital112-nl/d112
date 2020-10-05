import * as VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

const {
  BASE_URL
} = process.env;

export default () => {
  const voice = new VoiceResponse();

  voice.say(
    `Did not understand what you were saying. Please state your issue again after the beep.`
  );

  voice.record({
    transcribe: true,
    transcribeCallback: `${BASE_URL}/api/v1/twilio/transcribe`,
    timeout: 2
  });

  return voice;
};
