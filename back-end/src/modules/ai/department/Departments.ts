import { Property } from '@tsed/common';
import { Questionnaire, QuestionnaireModel } from '../questionnaire/Questionnaire';
import { AccidentQuestionnaire } from '../questionnaire/questionnaires/fire-department/AccidentQuestionnaire';
import { FireQuestionnaire } from '../questionnaire/questionnaires/fire-department/FireQuestionnaire';

export interface Department {
  name: string;
  default: DepartmentSettings;
  categories: DepartmentCategory[];
}

export class DepartmentSettingModel implements DepartmentCategory {
  @Property()
  public departmentName: string;
  @Property()
  public name: string;
  @Property()
  public message: string;
  @Property()
  public fire_department: boolean;
  @Property()
  public police: boolean;
  @Property()
  public ambulance: boolean;
  @Property()
  public questionnaire: QuestionnaireModel;
  @Property()
  public disable_location_required: boolean;
  @Property()
  public disable_services_message: boolean;
  @Property()
  public unhandled: boolean;
}

export interface DepartmentSettings {
  message: string;
  fire_department?: boolean;
  police?: boolean;
  ambulance?: boolean;
  questionnaire?: Questionnaire;
  disable_location_required?: boolean;
  disable_services_message?: boolean;
  unhandled?: boolean;
}

export interface DepartmentCategory extends DepartmentSettings {
  name: string;
}

export const Departments: Department[] = [
  {
    name: 'fire_department',
    default: {
      message: 'We have determined you need the fire department.',
      fire_department: true,
      disable_services_message: true
    },
    categories: [
      {
        name: 'fire',
        message: 'We understand that there is a fire going on at your location.',
        fire_department: true,
        disable_services_message: true,
        disable_location_required: true,
        questionnaire: FireQuestionnaire
      },
      {
        name: 'accident',
        message: 'We understand you have either seen or are in an accident.',
        fire_department: true,
        ambulance: true,
        police: true
      }
    ]
  },
  {
    name: 'police',
    default: {
      message: 'We have determined you need the police department.',
      police: true
    },
    categories: [
      {
        name: 'theft',
        message: 'You seem to have witnessed or been stolen from.',
        disable_location_required: true,
        police: true,
        unhandled: true
      }
    ]
  }
];
