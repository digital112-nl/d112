import { Service } from '@tsed/di';
import { log, Wit } from 'node-wit';
import { WitAi } from '../department/DepartmentAi';

const { AI_QUESTIONNAIRE_ACCESS_TOKEN } = process.env;

export interface QuestionnaireAi extends WitAi {
}

@Service()
export class QuestionnaireAi extends Wit {
  constructor() {
    super({
      accessToken: AI_QUESTIONNAIRE_ACCESS_TOKEN,
      logger: new log.Logger(log.DEBUG) // optional
    });
  }
}
