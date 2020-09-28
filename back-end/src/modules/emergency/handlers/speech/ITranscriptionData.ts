import { ICallData } from './ICallData';

export interface ITranscriptionData extends ICallData {
  TranscriptionType: string;
  TranscriptionUrl: string;
  TranscriptionSid: string;
  RecordingSid: string;
  RecordingUrl: string;
  url: string;
  TranscriptionText: string;
  TranscriptionStatus: string;
}
