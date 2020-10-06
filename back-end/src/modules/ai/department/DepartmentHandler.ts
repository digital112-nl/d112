import { Inject, Service } from '@tsed/di';
import { Document } from 'mongoose';
import Message from '../../emergency/handlers/speech/messages/Message';
import UnknownPleaseTalkAgain from '../../emergency/handlers/speech/messages/UnknownPleaseTalkAgain';
import { Report } from '../../report/Report';
import { ReportMessageService } from '../../report/ReportMessageService';
import { WitContext } from '../WitContext';
import { DepartmentAi, WitAiIntent } from './DepartmentAi';
import { isNil, find } from 'lodash';
import { Department, Departments, DepartmentCategory } from './Departments';

@Service()
export class DepartmentHandler {
  @Inject(DepartmentAi)
  private ai: DepartmentAi;
  @Inject(ReportMessageService)
  private reportMessageService: ReportMessageService;

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
      await this.reportMessageService.sendMessage(report, UnknownPleaseTalkAgain().toString());
      return;
    }


    const firstResult = result.intents[ 0 ];
    const { department, category } = this.getDepartmentAndCategory(firstResult);

    const message = this.generateMessage(department, category);

    await this.reportMessageService.sendMessage(report, message.toString());
    console.log('message has been send');
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

        console.log({ matches, matchesWithDivider });

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

  private generateMessage(
    department: Department,
    category: DepartmentCategory
  ) {
    const messages = [ category.message ];

    if ( !category.disable_services_message ) {
      messages.push(this.generateServicesMessage(category));
    }

    if ( !category.disable_location_required ) {
      const multiple = [ category.fire_department, category.police, category.ambulance ]
        .filter(bool => bool)
        .length > 1;
      messages.push(`But before we can send the ${multiple ? 'services' : 'service'} to you, we are going to need your location.`);
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
