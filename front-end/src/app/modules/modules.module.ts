import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ContainerComponent } from './container/container.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ModulesRoutingModule } from './modules-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DashboardModule,
    ModulesRoutingModule,
    SharedModule
  ],
  declarations: [
    ContainerComponent
  ]
})
export class ModulesModule {

}
