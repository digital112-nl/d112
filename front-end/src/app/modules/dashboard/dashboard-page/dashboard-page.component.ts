import { Component } from '@angular/core';
import { TestControllerService } from '../../../api/services';

@Component({
  selector: 'di-server-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: [ './dashboard-page.component.scss' ]
})
export class DashboardPageComponent {
  private data: string;

  constructor(
    private testControllerService: TestControllerService
  ) {
    this.testControllerService.TestControllerExample()
      .subscribe((data) => this.data = data);
  }
}
