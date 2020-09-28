import { Document } from 'mongoose';
import { Report } from '../emergency/Report';
import { WitAiContext } from './department/DepartmentAi';

export class WitContext {
  public static fromReport(report: Report & Document): WitAiContext {
    return {
      timezone: 'Europe/Amsterdam',
      locale: 'nl_NL'
    };
  }
}
