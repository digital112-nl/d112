import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Report } from '../../../api/models';
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
  public reports: Array<Report>;
  private subscription: Subscription;

  constructor(
    private reportSocketService: ReportSocketService,
    private topBarService: TopBarService,
    private notificationService: NotificationService,
    private reportControllerService: ReportControllerService
  ) {
    this.topBarService.pageTitle = 'Dashboard';
    this.getReports();
    this.subscription = this.reportSocketService.on('new-report')
      .subscribe((report) => {
        console.log('!! NEW REPORT', report);
        this.notificationService.notify({
          icon: '☎️',
          header: 'New Scenario',
          message: 'Someone is calling',
          timeout: 5
        });
        this.getReports();
      });
  }

  public getReports() {
    this.reportControllerService.ReportControllerFindAll()
      .subscribe((reports) => this.reports = reports.slice(0, 5));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
