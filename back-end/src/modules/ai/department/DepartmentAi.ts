import { Service } from '@tsed/di';
import { log, Wit } from 'node-wit';

const { AI_DEPARTMENT_ACCESS_TOKEN } = process.env;

export interface WitAiContext {
  reference_time?: string;
  timezone?: string;
  locale?: string;
  coords?: { lat: number, long: number };
}

interface WitAi {
  message(message: string, context: WitAiContext): Promise<any>;
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
