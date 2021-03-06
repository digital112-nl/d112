import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth/auth.guard';
import { AccountsPageComponent } from './accounts/accounts-page/accounts-page.component';
import { ContainerComponent } from './container/container.component';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';
import { MapPageComponent } from './map/map-page/map-page.component';
import { RedirectComponent } from './redirect/redirect.component';
import { ScenarioDetailPageComponent } from './scenarios/scenario-detail-page/scenario-detail-page.component';
import { ScenariosPageComponent } from './scenarios/scenarios-page/scenarios-page.component';
import { SettingsPageComponent } from './settings/settings-page/settings-page.component';

const routes: Routes = [
  {
    path: 'app',
    component: ContainerComponent,
    canActivate: [ AuthGuard ],
    canActivateChild: [ AuthGuard ],
    children: [
      {
        path: '',
        redirectTo: 'redirect',
        pathMatch: 'full'
      },
      {
        path: 'redirect',
        component: RedirectComponent
      },
      {
        path: 'dashboard',
        component: DashboardPageComponent
      },
      {
        path: 'map',
        component: MapPageComponent
      },
      {
        path: 'scenarios',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: ScenariosPageComponent
          },
          {
            path: ':scenarioId',
            component: ScenarioDetailPageComponent
          }
        ]
      },
      {
        path: 'accounts',
        component: AccountsPageComponent
      },
      {
        path: 'settings',
        component: SettingsPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule {
}
