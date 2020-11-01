import { isNil } from '@tsed/core';
import { Inject, Service } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { find, findIndex, assign } from 'lodash';
import EndCallWithMessage from '../../emergency/handlers/speech/messages/EndCallWithMessage';
import MessageAndRecordResponse from '../../emergency/handlers/speech/messages/MessageAndRecordResponse';
import UnknownPleaseTalkAgain from '../../emergency/handlers/speech/messages/UnknownPleaseTalkAgain';
import { Report, ReportMode } from '../../report/Report';
import { Document } from 'mongoose';
import { ReportCallMessageService } from '../../report/report-call-message/ReportCallMessageService';
import { ReportService } from '../../report/ReportService';
import { WitAiMessageResponse } from '../department/DepartmentAi';
import { WitContext } from '../WitContext';
import { Question, Questionnaire, ScalePriorityPossibility } from './Questionnaire';
import { QuestionnaireAi } from './QuestionnaireAi';

@Service()
export class QuestionnaireHandler {
  @Inject(Report)
  private reportModel: MongooseModel<Report>;
  @Inject(ReportCallMessageService)
  private reportCallMessageService: ReportCallMessageService;
  @Inject(QuestionnaireAi)
  private ai: QuestionnaireAi;

  constructor(
    private reportService: ReportService
  ) {
    this.reportService.on('report-mode-update', async ({ report, reportMode }) => this.onReportModeUpdated(await this.reportModel.findById(report._id), reportMode));
  }

  private static getQuestions(report: Report & Document): Question[] {
    return report.department?.questionnaire?.questions || [];
  }

  private static getQuestionnaire(report: Report & Document): Questionnaire {
    return report.department?.questionnaire;
  }

  private static hasQuestionnaire(report: Report & Document): boolean {
    return !isNil(report.department.questionnaire);
  }

  private static async askNextQuestion(report: Report & Document) {
    const questions = QuestionnaireHandler.getQuestions(report)
      .filter((question) => !question.asked);

    if ( questions.length > 0 ) {
      const nextQuestion = questions[ 0 ];
      const activeQuestionKey = nextQuestion.key;

      await QuestionnaireHandler.updateQuestionnaire(report, { questions, activeQuestionKey });

      return nextQuestion;
    }

    return null;
  }

  private static async updateQuestionnaire(
    report: Report & Document,
    questionnaire: Partial<Questionnaire>
  ) {
    report.department.questionnaire = assign({},
      report.department?.questionnaire,
      questionnaire);
    if ( !isNil(questionnaire.activeQuestionKey) ) {
      report.department.questionnaire.activeQuestionKey = questionnaire.activeQuestionKey;
    }
    await report.save();
  }

  public async handleIncomingText(
    text: string,
    report: Report & Document
  ) {
    const result = `${text}`.trim() !== '' ?
      await this.ai.message(text, WitContext.fromReport(report)) :
      null;

    // Unknown what was being said...
    if (
      isNil(result) ||
      (result.intents || []).length === 0 ||
      result.intents[ 0 ].name === 'unknown'
    ) {
      console.log('Unknown what was being said...');
      await this.reportCallMessageService.sendMessage(report, UnknownPleaseTalkAgain().toString());
      return;
    }

    let current = this.getCurrentQuestion(report);

    if ( isNil(current) ) {
      console.log('No active question...');
      return;
    }

    switch (current.type) {
      case 'Scale':
        await this.handleScale(current, result, report);
        break;
      case 'Possibility':
        this.handlePossibility(current, result);
        break;
    }
  }

  private async onReportModeUpdated(
    report: Report & Document,
    reportMode: ReportMode
  ) {
    switch (reportMode) {
      case ReportMode.Questionnaire:
        console.log('Waiting 5 seconds before asking theq eustion...');
        setTimeout(() => this.askNestQuestion(report), 5000);
        break;
    }
  }

  private async askNestQuestion(report: Report & Document) {
    console.log('Asking the next question....');
    console.log(JSON.stringify({ department: report.department }, null, 2));

    let questions = QuestionnaireHandler.getQuestions(report);
    const hasQuestions = questions.length > 0;
    const hasQuestionsLeft = questions.filter((question) => !question.asked && !question.answered);

    if ( !hasQuestions || !hasQuestionsLeft ) {
      await this.reportCallMessageService.sendMessage(
        report,
        EndCallWithMessage('We have received enough information for now. Help should be arriving soon.')
          .toString()
      );
    }

    let current = this.getCurrentQuestion(report);

    if ( isNil(current) ) {
      current = await QuestionnaireHandler.askNextQuestion(report);
      report = await this.reportModel.findById(report._id);
    }

    if ( !isNil(current) && !current.asked ) {
      await this.reportCallMessageService.sendMessage(
        report,
        MessageAndRecordResponse(current.question)
          .toString()
      );

      // Update asked
      const questions = QuestionnaireHandler.getQuestions(report);
      const index = findIndex(questions, { key: current.key });
      questions[ index ].asked = true;
      await QuestionnaireHandler.updateQuestionnaire(report, { questions });
    }
  }

  private getCurrentQuestion(report: Report & Document): Question | undefined {
    const questionnaire = QuestionnaireHandler.getQuestionnaire(report);
    const questions = QuestionnaireHandler.getQuestions(report);

    return find(questions, { key: questionnaire.activeQuestionKey });
  }

  private async handleScale(
    current: Question,
    result: WitAiMessageResponse,
    report: Report & Document
  ) {
    const isScale = result.intents.filter((intent) => intent.name === 'scale').length > 0 &&
      !isNil(result.entities[ 'wit$number:number' ]) &&
      result.entities['wit$number:number'].length > 0;

    if (!isScale) {
      await this.reportCallMessageService.sendMessage(report, UnknownPleaseTalkAgain().toString());
      return;
    }

    const entity = result.entities['wit$number:number'][0];
    const possibilities = (current.possibilities as ScalePriorityPossibility[]);

    const outcome = find(possibilities, { forValue: entity.value });

    const questions = QuestionnaireHandler.getQuestions(report);
    const index = findIndex(questions, { key: current.key });
    questions[ index ].outcome = outcome;
    questions[ index ].answered = true;
    await QuestionnaireHandler.updateQuestionnaire(report, { questions });
  }


  private handlePossibility(
    current: Question,
    result: WitAiMessageResponse
  ) {

  }
}
