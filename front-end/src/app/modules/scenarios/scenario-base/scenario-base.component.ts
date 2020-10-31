import { ReportModel } from '../../../api/models/report-model';


export class ScenarioBaseComponent {
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
