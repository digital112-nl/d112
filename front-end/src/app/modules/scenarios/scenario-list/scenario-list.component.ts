import { Component, Input } from '@angular/core';
import { ReportModel } from '../../../api/models';

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
  @Input() reports: ReportModel[] = [];

  trackByIcon(
    index,
    { icon }
  ) {
    return `${index}-${icon}`;
  }

  trackByReport(
    index,
    { _id }
  ) {
    return `${index}-${_id}`;
  }

  public getIcon(report: ReportModel) {
    if ( report.department ) {
      switch (report.department.departmentName) {
        case 'fire_department':
          return '🚒';
        case 'police':
          return '🚓';
      }
    }

    return '🚨';
  }

  public getIconClass(report: ReportModel) {
    if ( report.department ) {
      switch (report.department.departmentName) {
        case 'fire_department':
          return 'scenario-list__item-icon--fire-department';
        case 'police':
          return 'scenario-list__item-icon--police';
      }
    }
  }
}
