import { CollectionOf, Property } from '@tsed/common';

export enum Outcome {
  AddAmbulance,
  AddPolice,
  AddFireDepartment
}

export interface QuestionPossibility {
  type: 'AiEntityPossibility' | 'AiIntentPossibility' | 'ScalePriorityPossibility';
  key: string;
  outcome?: Outcome | Outcome[];
}

export interface AiEntityPossibility extends QuestionPossibility {
  type: 'AiEntityPossibility';
  entity: string;
}

export interface AiIntentPossibility extends QuestionPossibility {
  type: 'AiIntentPossibility';
  intent: string;
}

export enum Priority {
  Emergency = 0,
  High = 1,
  Medium = 2,
  Low = 3,
}

export interface ScalePriorityPossibility extends QuestionPossibility {
  type: 'ScalePriorityPossibility';
  priority: Priority;
  forValue: number;
}

export type Possibility = AiEntityPossibility | AiIntentPossibility | ScalePriorityPossibility;

class PossibilityModel implements AiEntityPossibility, AiIntentPossibility, ScalePriorityPossibility {
  @Property()
  public type: string | any;
  @Property()
  public entity: string;
  @Property()
  public intent: string;
  @Property()
  public key: string;
  @Property()
  public priority: Priority;
  @Property()
  public forValue: number;
  @Property()
  public outcome?: Outcome | Outcome[];
}

export interface Question {
  key: string;
  question: string;
  type?: 'Possibility' | 'Scale';
  possibilities?: Possibility[];
  asked?: boolean;
  answered?: boolean;
  outcome?: Possibility;
}

export class QuestionModel implements Question {
  @Property()
  public key: string;
  @Property()
  public question: string;
  @Property()
  public type?: 'Possibility' | 'Scale';
  @CollectionOf(PossibilityModel)
  public possibilities?: Possibility[];
  @Property()
  public asked?: boolean;
  @Property()
  public answered?: boolean;
  @Property({ name: 'outcome', use: PossibilityModel })
  public outcome?: Possibility;
}

export interface Questionnaire {
  key: string;
  questions: Question[];
  activeQuestionKey?: string;
}

export class QuestionnaireModel implements Questionnaire {
  @Property()
  public key: string;
  @Property()
  public questions: QuestionModel[];
  @Property()
  public activeQuestionKey: string;
}
