import { Component } from '@angular/core';
import { NotificationService } from '../../../shared/components/notification/notification.service';
import { TopBarService } from '../../../shared/components/top-bar/top-bar.service';

@Component({
  selector: 'di-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent {

  constructor(
    private topBarService: TopBarService,
    private notificationService: NotificationService
  ) {
    this.topBarService.pageTitle = 'Map';
    this.notificationService.notify({
      icon: '☎️',
      header: 'New Scenario',
      message: 'Someone is calling',
      timeout: 5
    });
  }
}
