import { Component } from '@angular/core';
import { TopBarService } from '../../../shared/components/top-bar/top-bar.service';
import { ReportSocketService } from '../../../shared/services/report-socket.service';

@Component({
  selector: 'di-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent {

  constructor(
    private topBarService: TopBarService
  ) {
    this.topBarService.pageTitle = 'Map';
  }
}
