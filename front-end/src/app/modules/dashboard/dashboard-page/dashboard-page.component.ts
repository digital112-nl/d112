import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportModel } from '../../../api/models';
import { ReportControllerService } from '../../../api/services';
import { NotificationService } from '../../../shared/components/notification/notification.service';
import { TopBarService } from '../../../shared/components/top-bar/top-bar.service';
import { ReportSocketService } from '../../../shared/services/report-socket.service';

@Component({
  selector: 'di-server-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: [ './dashboard-page.component.scss' ]
})
export class DashboardPageComponent implements OnDestroy {
  public reports: Array<ReportModel> = [];
  public locationReports: Array<ReportModel> = [];
  public totalReportCount = 0;
  private subscriptions: Subscription[] = [];
  public totalAccidentCount = 0;
  public totalFireCount = 0;

  constructor(
    private reportSocketService: ReportSocketService,
    private topBarService: TopBarService,
    private notificationService: NotificationService,
    private reportControllerService: ReportControllerService
  ) {
    this.topBarService.pageTitle = 'Dashboard';
    this.getReports();
    this.subscriptions = [ this.reportSocketService.on('new-report')
      .subscribe((report) => {
        console.log('!! NEW REPORT', report);
        this.notificationService.notify({
          icon: '☎️',
          header: 'New Scenario',
          message: 'Someone is calling',
          timeout: 5
        });
        this.getReports();
      }),
      this.reportSocketService.on('update-report')
        .subscribe(() => this.getReports())
    ];
  }

  public getReports() {
    this.reportControllerService.ReportControllerFindAll()
      .subscribe((reports) => {
        this.totalReportCount = reports.length;
        this.totalAccidentCount = reports.filter(({  department }) => department && department?.name === 'accident').length;
        this.totalFireCount = reports.filter(({  department }) => department && department?.name === 'fire').length;
        this.reports = reports.slice(0, 5);
      });
    this.reportControllerService.ReportControllerFindAllWithLocation()
      .subscribe((reports) => this.locationReports = reports);
  }

  public ngOnDestroy(): void {
    this.subscriptions.map((subscription) => subscription.unsubscribe());
  }
}
