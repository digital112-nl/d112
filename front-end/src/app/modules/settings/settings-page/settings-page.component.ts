import { Component } from '@angular/core';
import { TopBarService } from '../../../shared/components/top-bar/top-bar.service';
import { ReportSocketService } from '../../../shared/services/report-socket.service';

@Component({
  selector: 'di-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {

  constructor(
    private topBarService: TopBarService
  ) {
    this.topBarService.pageTitle = 'Settings';
  }
}
