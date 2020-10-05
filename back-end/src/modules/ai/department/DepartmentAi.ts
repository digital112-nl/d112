import { Service } from '@tsed/di';
import { log, Wit } from 'node-wit';

const { AI_DEPARTMENT_ACCESS_TOKEN } = process.env;

export interface WitAiContext {
  reference_time?: string;
  timezone?: string;
  locale?: string;
  coords?: { lat: number, long: number };
}

export interface WitAiIntent {
  id: string;
  name: string;
  confidence: number;
}

interface WitAiEntity {
}

interface WitAiEntities {
  [ key: string ]: WitAiEntity[];
}

interface WitAiMessageResponse {
  text: string;
  intents: WitAiIntent[];
  entities: WitAiEntities;
  traits: any;
}

interface WitAi {
  message(
    message: string,
    context: WitAiContext
  ): Promise<WitAiMessageResponse>;
}

export interface DepartmentAi extends WitAi {
}

@Service()
export class DepartmentAi extends Wit {
  constructor() {
    super({
      accessToken: AI_DEPARTMENT_ACCESS_TOKEN,
      logger: new log.Logger(log.DEBUG) // optional
    });
  }
}
