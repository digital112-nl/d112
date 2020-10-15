import { Component, Input } from '@angular/core';
import { Report } from '../../../api/models';

export enum ScenarioPrio {
  Emergency = 0,
  High = 1,
  Medium = 2,
  Low = 3,
}

export interface ScenarioListItem {
  category: string; // Make this an enum
  title: string;
  prio: ScenarioPrio;
  time: number;
}

@Component({
  selector: 'di-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: [ './scenario-list.component.scss' ]
})
export class ScenarioListComponent {
  @Input() reports: Report[] = [];
}
