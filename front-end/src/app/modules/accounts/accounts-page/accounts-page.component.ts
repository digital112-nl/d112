import { Component } from '@angular/core';
import { TopBarService } from '../../../shared/components/top-bar/top-bar.service';
import { ReportSocketService } from '../../../shared/services/report-socket.service';

@Component({
  selector: 'di-accounts-page',
  templateUrl: './accounts-page.component.html',
  styleUrls: ['./accounts-page.component.scss']
})
export class AccountsPageComponent {

  constructor(
    private topBarService: TopBarService
  ) {
    this.topBarService.pageTitle = 'Accounts';
  }
}
