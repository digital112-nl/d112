/* tslint:disable */
import { QuestionnaireModel } from './questionnaire-model';
export interface DepartmentSettingModel {
  ambulance?: boolean;
  departmentName?: string;
  disable_location_required?: boolean;
  disable_services_message?: boolean;
  fire_department?: boolean;
  message?: string;
  name?: string;
  police?: boolean;
  questionnaire?: QuestionnaireModel;
  unhandled?: boolean;
}
