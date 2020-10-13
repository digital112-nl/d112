import { Component } from '@angular/core';
import { TopBarService } from '../../../shared/components/top-bar/top-bar.service';

@Component({
  selector: 'di-scenario-detail-page',
  templateUrl: './scenario-detail-page.component.html',
  styleUrls: [ './scenario-detail-page.component.scss' ]
})
export class ScenarioDetailPageComponent {

  constructor(
    private topBarService: TopBarService
  ) {
    this.topBarService.pageTitle = 'Scenario';
  }
}
