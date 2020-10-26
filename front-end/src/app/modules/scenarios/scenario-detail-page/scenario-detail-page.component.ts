import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportModel } from '../../../api/models';
import { ReportControllerService } from '../../../api/services';
import { TopBarService } from '../../../shared/components/top-bar/top-bar.service';

@Component({
  selector: 'di-scenario-detail-page',
  templateUrl: './scenario-detail-page.component.html',
  styleUrls: [ './scenario-detail-page.component.scss' ]
})
export class ScenarioDetailPageComponent {
  public report: ReportModel;

  constructor(
    private topBarService: TopBarService,
    private reportControllerService: ReportControllerService,
    private activatedRoute: ActivatedRoute
  ) {
    this.topBarService.pageTitle = 'Scenario';
    this.activatedRoute.params.subscribe(({ scenarioId }) => this.load(scenarioId));
  }

  private load(id: any) {
    this.reportControllerService
      .ReportControllerFindOne(id)
      .subscribe((report) => this.report = report);
  }
}
