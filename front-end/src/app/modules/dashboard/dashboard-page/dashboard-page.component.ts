import { Component } from '@angular/core';
import { NotificationService } from '../../../shared/components/notification/notification.service';
import { TopBarService } from '../../../shared/components/top-bar/top-bar.service';
import { ReportSocketService } from '../../../shared/services/report-socket.service';

@Component({
  selector: 'di-server-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {

  constructor(
    private reportSocketService: ReportSocketService,
    private topBarService: TopBarService,
    private notificationService: NotificationService
  ) {
    this.topBarService.pageTitle = 'Dashboard';
    this.reportSocketService.on('new-report')
      .subscribe((report) => {
        console.log('!! NEW REPORT', report);
        this.notificationService.notify({
          icon: '☎️',
          header: 'New Scenario',
          message: 'Someone is calling',
          timeout: 5
        });
      });
  }
}
