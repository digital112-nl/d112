import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../../shared/shared.module';
import { ScenariosModule } from '../scenarios/scenarios.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatTooltipModule,
    TimeagoModule.forRoot(),

    ScenariosModule
  ],
  declarations: [
    DashboardPageComponent
  ],
  providers: []
})
export class DashboardModule {

}
