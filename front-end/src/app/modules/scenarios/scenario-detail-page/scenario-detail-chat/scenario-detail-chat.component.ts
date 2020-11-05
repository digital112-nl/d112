import { Component, Input } from '@angular/core';
import { QuestionnaireModel } from '../../../../api/models';

@Component({
  selector: 'di-scenario-detail-chat',
  templateUrl: './scenario-detail-chat.component.html',
  styleUrls: ['./scenario-detail-chat.component.scss']
})
export class ScenarioDetailChatComponent {

  @Input()
  public questionnaire: QuestionnaireModel;
}
