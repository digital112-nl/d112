import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportModel } from '../../../api/models/report-model';
import { ReportControllerService } from '../../../api/services/report-controller.service';

@Injectable()
export class ScenarioDetailPageService {
  public report: ReportModel;

  public formGroup: FormGroup = new FormGroup({
    scenarioName: new FormControl(''),
    status: new FormControl(''),
    department: new FormControl(''),
    createdAt: new FormControl(''),
    updatedAt: new FormControl('')
  });

  constructor(
    private reportControllerService: ReportControllerService
  ) {
  }

  public load(id: any) {
    this.formGroup.reset();
    this.reportControllerService
      .ReportControllerFindOne(id)
      .subscribe((report) => {
        this.report = report;

        this.formGroup.patchValue({
          scenarioName: report.caller,
          status: report.callStatus,
          department: report.department.name,
          createdAt: new Date(report.createdAt),
          updatedAt: new Date(report.updatedAt)
        });
      });
  }
}
