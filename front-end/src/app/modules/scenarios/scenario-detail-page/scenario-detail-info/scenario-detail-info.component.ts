import { Component } from '@angular/core';
import { ScenarioDetailPageService } from '../scenario-detail-page.service';

@Component({
  selector: 'di-scenario-detail-info',
  templateUrl: './scenario-detail-info.component.html',
  styleUrls: ['./scenario-detail-info.component.scss']
})
export class ScenarioDetailInfoComponent {

  constructor(
    public scenarioDetailPageService: ScenarioDetailPageService
  ) {

  }

  public updateScenario() {

  }
}
