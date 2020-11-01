import { Component } from '@angular/core';
import { ScenarioDetailPageService } from '../scenario-detail-page.service';

@Component({
  selector: 'di-scenario-detail-activity',
  templateUrl: './scenario-detail-activity.component.html',
  styleUrls: [ './scenario-detail-activity.component.scss' ]
})
export class ScenarioDetailActivityComponent {

  constructor(
    public scenarioDetailPageService: ScenarioDetailPageService,
  ) {
  }
}
