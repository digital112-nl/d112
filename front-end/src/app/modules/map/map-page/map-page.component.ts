import { Component } from '@angular/core';
import { ReportModel } from '../../../api/models';
import { ReportControllerService } from '../../../api/services';
import { TopBarService } from '../../../shared/components/top-bar/top-bar.service';

@Component({
  selector: 'di-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent {
  public reports: Array<ReportModel> = [];

  constructor(
    private topBarService: TopBarService,
    private reportControllerService: ReportControllerService
  ) {
    this.topBarService.pageTitle = 'Map';
    this.getReports();
  }

  public getReports() {
    this.reportControllerService.ReportControllerFindAllWithLocation()
      .subscribe((reports) => {
        this.reports = reports;
      });
  }
}
