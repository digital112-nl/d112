import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopBarService } from '../../../shared/components/top-bar/top-bar.service';
import { ScenarioDetailPageService } from './scenario-detail-page.service';

@Component({
  selector: 'di-scenario-detail-page',
  templateUrl: './scenario-detail-page.component.html',
  styleUrls: ['./scenario-detail-page.component.scss']
})
export class ScenarioDetailPageComponent {

  constructor(
    private topBarService: TopBarService,
    public scenarioDetailPageService: ScenarioDetailPageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.topBarService.pageTitle = 'Scenario';
    this.activatedRoute.params.subscribe(({ scenarioId }) => this.scenarioDetailPageService.load(scenarioId));
  }
}
