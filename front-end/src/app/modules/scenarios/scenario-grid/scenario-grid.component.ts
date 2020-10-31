import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportModel } from '../../../api/models/report-model';

@Component({
  selector: 'di-scenario-grid',
  templateUrl: './scenario-grid.component.html',
  styleUrls: [ './scenario-grid.component.scss' ]
})
export class ScenarioGridComponent {
  @Input() reports: ReportModel[] = [];

  public formGroup: FormGroup = new FormGroup({
    search: new FormControl('')
  });

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
      switch (report.department.name) {
        case 'fire':
          return '🚒';
        case 'police':
          return '🚓';
      }
    }

    return '🚨';
  }
}
