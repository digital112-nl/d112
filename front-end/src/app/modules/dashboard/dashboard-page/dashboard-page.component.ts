import { Component } from '@angular/core';
import { TopBarService } from '../../../shared/components/top-bar/top-bar.service';
import { ReportSocketService } from '../../../shared/services/report-socket.service';

@Component({
  selector: 'di-server-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  private data: string;

  constructor(
    private reportSocketService: ReportSocketService,
    private topBarService: TopBarService
  ) {
    this.topBarService.pageTitle = 'Dashboard';
    this.reportSocketService.on('new-report')
      .subscribe((report) => console.log('!! NEW REPORT', report));
  }
}
