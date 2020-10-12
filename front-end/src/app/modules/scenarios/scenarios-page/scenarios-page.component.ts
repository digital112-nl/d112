import { Component } from '@angular/core';
import { TopBarService } from '../../../shared/components/top-bar/top-bar.service';
import { ReportSocketService } from '../../../shared/services/report-socket.service';

@Component({
  selector: 'di-scenarios-page',
  templateUrl: './scenarios-page.component.html',
  styleUrls: ['./scenarios-page.component.scss']
})
export class ScenariosPageComponent {

  constructor(
    private topBarService: TopBarService
  ) {
    this.topBarService.pageTitle = 'Scenarios';
  }
}
