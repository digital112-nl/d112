import { Inject, Service } from '@tsed/di';
import { find, isNil } from 'lodash';
import { Document } from 'mongoose';
import Message from '../../emergency/handlers/speech/messages/Message';
import EndCallWithMessage from '../../emergency/handlers/speech/messages/EndCallWithMessage';
import RedirectCallWithMessage from '../../emergency/handlers/speech/messages/RedirectCallWithMessage';
import UnknownPleaseTalkAgain from '../../emergency/handlers/speech/messages/UnknownPleaseTalkAgain';
import { Report, ReportMode } from '../../report/Report';
import { ReportCallMessageService } from '../../report/report-call-message/ReportCallMessageService';
import { ReportLocationService } from '../../report/report-location/ReportLocationService';
import { ReportService } from '../../report/ReportService';
import { WitContext } from '../WitContext';
import { DepartmentAi, WitAiIntent } from './DepartmentAi';
import { Department, DepartmentCategory, Departments } from './Departments';


const {
  TWILIO_REDIRECT_TO
} = process.env;

@Service()
export class DepartmentHandler {
  @Inject(DepartmentAi)
  private ai: DepartmentAi;
  @Inject(ReportService)
  private reportService: ReportService;
  @Inject(ReportCallMessageService)
  private reportCallMessageService: ReportCallMessageService;
  @Inject(ReportLocationService)
  private reportLocationService: ReportLocationService;

  constructor() {
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


    const firstResult = result.intents[ 0 ];
    const { department, category } = this.getDepartmentAndCategory(firstResult);

    await this.reportService.setDepartment(report, category, department.name);

    const message = await this.generateMessage(report, category);

    await this.reportCallMessageService.sendMessage(report, message.toString());
  }

  private getDepartmentAndCategory(intent: WitAiIntent): { department: Department, category: DepartmentCategory } {
    for (let department of Departments) {
      const matches = intent.name.startsWith(department.name);
      const nameWithDivider = `${department.name}_`;
      const matchesWithDivider = intent.name.startsWith(nameWithDivider);

      if ( matches || matchesWithDivider ) {
        // intent starts with name
        let category: DepartmentCategory = {
          name: 'default',
          ...department.default
        };

        // If it matches with the divider (e.g fire_department_) which likely means there is a category provided
        if ( matchesWithDivider ) {
          const categoryName = intent.name.replace(nameWithDivider, '');
          const foundCategory = find(department.categories, { name: categoryName });

          if ( !isNil(foundCategory) ) {
            category = foundCategory;
          }
        }

        return {
          category,
          department
        };
      }
    }
  }

  private async generateMessage(
    report: Report & Document,
    category: DepartmentCategory
  ) {
    const messages = [ category.message ];

    if ( !category.disable_services_message ) {
      messages.push(this.generateServicesMessage(category));
    }

    if ( category.unhandled ) {
      messages.push('The system does not know how to further handle this situation. We\'re redirecting you to a person.');
      return `${TWILIO_REDIRECT_TO || ''}`.trim() === '' ?
        EndCallWithMessage(messages.join('. ')) :
        RedirectCallWithMessage(messages.join('. '));
    }

    if ( !category.disable_location_required ) {
      const multiple = [ category.fire_department, category.police, category.ambulance ]
        .filter(bool => bool)
        .length > 1;
      messages.push(`But before we can send the ${multiple ? 'services' : 'service'} to you, we are going to need your location. Check your sms inbox for an sms message, click on the link that is provided.`);
      await this.reportLocationService.sendLocationMessage(report);
    } else {
      // Set report mode to questionnaire
      await this.reportService.setReportMode(report, ReportMode.Questionnaire);
    }

    return Message(messages.join('. '));
  }

  private generateServicesMessage(category: DepartmentCategory) {
    const { fire_department, police, ambulance } = category;
    const messages = [];
    const settings = {
      'fire_department': 'the fire department',
      'police': 'the police',
      'ambulance': 'an ambulance'
    };

    if ( fire_department ) {
      messages.push(settings[ 'fire_department' ]);
    }

    if ( police ) {
      messages.push(settings[ 'police' ]);
    }

    if ( ambulance ) {
      messages.push(settings[ 'ambulance' ]);
    }

    if ( messages.length > 1 ) {
      const allMessagesButLast = messages.slice(0, -1);
      const last = messages[ messages.length - 1 ];

      return `We are going to send ${allMessagesButLast.join(', ')} and ${last}`;
    } else {
      return `We are going to send ${messages[ 0 ]}`;
    }
  }
}
