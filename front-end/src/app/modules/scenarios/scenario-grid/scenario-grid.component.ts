import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportModel } from '../../../api/models/report-model';
import { ScenarioBaseComponent } from '../scenario-base/scenario-base.component';

@Component({
  selector: 'di-scenario-grid',
  templateUrl: './scenario-grid.component.html',
  styleUrls: [ './scenario-grid.component.scss' ]
})
export class ScenarioGridComponent extends ScenarioBaseComponent {
  @Input() reports: ReportModel[] = [];

  public formGroup: FormGroup = new FormGroup({
    search: new FormControl('')
  });
}
