/* tslint:disable */
import { PossibilityModel } from './possibility-model';
export interface QuestionModel {
  answered?: boolean;
  asked?: boolean;
  key?: string;
  outcome?: PossibilityModel;
  possibilities?: Array<PossibilityModel>;
  question?: string;
  type?: string;
}
