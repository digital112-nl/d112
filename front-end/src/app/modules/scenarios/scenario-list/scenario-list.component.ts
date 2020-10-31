import { Component, Input } from '@angular/core';
import { ReportModel } from '../../../api/models';
import { ScenarioBaseComponent } from '../scenario-base/scenario-base.component';

export enum ScenarioPrio {
  Emergency = 0,
  High = 1,
  Medium = 2,
  Low = 3,
}

@Component({
  selector: 'di-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: [ './scenario-list.component.scss' ]
})
export class ScenarioListComponent extends ScenarioBaseComponent {
  @Input() reports: ReportModel[] = [];
}
