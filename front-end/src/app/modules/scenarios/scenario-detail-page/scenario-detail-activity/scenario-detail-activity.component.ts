import { Component } from '@angular/core';

@Component({
  selector: 'di-scenario-detail-activity',
  templateUrl: './scenario-detail-activity.component.html',
  styleUrls: [ './scenario-detail-activity.component.scss' ]
})
export class ScenarioDetailActivityComponent {

  public activities = [
    {
      status: 'Finished',
      message: 'Fire has been put out',
      createdAt: Date.now()
    },
    {
      status: 'Action taken',
      message: 'Fire truck has been sent',
      createdAt: Date.now() - 50 * 5000
    },
    {
      status: 'Started',
      message: 'Fire in building',
      createdAt: Date.now() - 70 * 6500
    },
  ];
}
