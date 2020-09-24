import { Service } from '@tsed/di';
import { log, Wit } from 'node-wit';

const { AI_QUESTIONNAIRE_ACCESS_TOKEN } = process.env;

@Service()
export class QuestionnaireAi extends Wit {
  constructor() {
    super({
      accessToken: AI_QUESTIONNAIRE_ACCESS_TOKEN,
      logger: new log.Logger(log.DEBUG) // optional
    });
  }
}
