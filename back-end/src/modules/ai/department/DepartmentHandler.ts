import { Inject, Service } from '@tsed/di';
import { Document } from 'mongoose';
import { Report } from '../../emergency/Report';
import { WitContext } from '../WitContext';
import { DepartmentAi } from './DepartmentAi';

@Service()
export class DepartmentHandler {
  @Inject(DepartmentAi)
  private ai: DepartmentAi;

  constructor() {
  }

  public async handleIncomingText(
    text: string,
    report: Report | Document
  ) {
    const result = await this.ai.message(text, WitContext.fromReport(report));

    console.log(result);
  }
}
