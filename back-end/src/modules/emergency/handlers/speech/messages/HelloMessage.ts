import * as VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

const {
  BASE_URL
} = process.env;

export default () => {
  const voice = new VoiceResponse();

  voice.say(
    `Hello you are calling the (TEST) emergency number! Please state your issue after the beep.`
  );

  voice.record({
    transcribe: true,
    transcribeCallback: `${BASE_URL}/api/v1/twilio/transcribe`,
    timeout: 2
  });

  return voice;
};
