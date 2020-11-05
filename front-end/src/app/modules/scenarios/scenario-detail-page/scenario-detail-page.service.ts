import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ReportModel } from '../../../api/models/report-model';
import { ReportControllerService } from '../../../api/services/report-controller.service';
import { ReportSocketService } from '../../../shared/services/report-socket.service';
import { isNil } from 'lodash';

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
  private reportGetSubscription: Subscription;
  private socketSubscription: Subscription;

  constructor(
    private reportControllerService: ReportControllerService,
    private reportSocketService: ReportSocketService
  ) {
  }

  public load(id: any) {
    this.formGroup.reset();
    this.getData(id);
    this.socketSubscription = this.reportSocketService.on('update-report')
      .subscribe(() => this.getData(id));
  }

  private getData(id: any) {
    if ( !isNil(this.reportGetSubscription) ) {
      this.reportGetSubscription.unsubscribe();
    }

    this.reportGetSubscription = this.reportControllerService
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
