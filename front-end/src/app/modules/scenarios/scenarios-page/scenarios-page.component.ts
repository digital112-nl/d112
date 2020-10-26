import { Component } from '@angular/core';
import { ReportModel } from '../../../api/models';
import { ReportControllerService } from '../../../api/services';
import { TopBarService } from '../../../shared/components/top-bar/top-bar.service';

@Component({
  selector: 'di-scenarios-page',
  templateUrl: './scenarios-page.component.html',
  styleUrls: [ './scenarios-page.component.scss' ]
})
export class ScenariosPageComponent {
  public reports: Array<ReportModel>;

  constructor(
    private topBarService: TopBarService,
    private reportControllerService: ReportControllerService
  ) {
    this.topBarService.pageTitle = 'Scenarios';

    this.reportControllerService.ReportControllerFindAll()
      .subscribe((reports) => this.reports = reports);
  }
}
