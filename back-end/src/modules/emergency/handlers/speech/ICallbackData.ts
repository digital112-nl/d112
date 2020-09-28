import { ICallData } from './ICallData';

export interface ICallbackData extends ICallData {
  ToState: string;
  CallerCountry: string;
  CallerState: string;
  ToZip: string;
  ToCountry: string;
  CallerZip: string;
  CalledZip: string;
  CalledCity: string;
  CalledCountry: string;
  CallerCity: string;
  ToCity: string;
  FromCountry: string;
  FromCity: string;
  CalledState: string;
  FromZip: string;
  FromState: string;
}
