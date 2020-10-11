import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';
import { SharedModule } from '../../shared/shared.module';
import { ScenarioListComponent } from './scenario-list/scenario-list.component';
import { ScenariosPageComponent } from './scenarios-page/scenarios-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TimeagoModule
  ],
  declarations: [
    ScenariosPageComponent,
    ScenarioListComponent
  ],
  exports: [
    ScenarioListComponent
  ]
})
export class ScenariosModule {

}
