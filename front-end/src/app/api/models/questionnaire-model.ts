/* tslint:disable */
import { QuestionModel } from './question-model';
export interface QuestionnaireModel {
  activeQuestionKey?: string;
  key?: string;
  questions?: Array<QuestionModel>;
}
