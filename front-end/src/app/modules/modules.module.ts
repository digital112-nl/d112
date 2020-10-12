import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AccountsModule } from './accounts/accounts.module';
import { ContainerComponent } from './container/container.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { MapModule } from './map/map.module';
import { ModulesRoutingModule } from './modules-routing.module';
import { ScenariosModule } from './scenarios/scenarios.module';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DashboardModule,
    MapModule,
    ScenariosModule,
    AccountsModule,
    SettingsModule,
    ModulesRoutingModule,
    SharedModule
  ],
  declarations: [
    ContainerComponent
  ]
})
export class ModulesModule {

}
