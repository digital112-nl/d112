import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';
import { SharedModule } from '../../shared/shared.module';
import { ScenarioDetailActivityComponent } from './scenario-detail-page/scenario-detail-activity/scenario-detail-activity.component';
import { ScenarioDetailChatComponent } from './scenario-detail-page/scenario-detail-chat/scenario-detail-chat.component';
import { ScenarioDetailInfoComponent } from './scenario-detail-page/scenario-detail-info/scenario-detail-info.component';
import { ScenarioDetailPageComponent } from './scenario-detail-page/scenario-detail-page.component';
import { ScenarioDetailPageService } from './scenario-detail-page/scenario-detail-page.service';
import { FuseModule } from './scenario-grid/fuse/fuse.module';
import { ScenarioGridComponent } from './scenario-grid/scenario-grid.component';
import { ScenarioIconsPipe } from './scenario-list/scenario-icons.pipe';
import { ScenarioListComponent } from './scenario-list/scenario-list.component';
import { ScenariosPageComponent } from './scenarios-page/scenarios-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TimeagoModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    FuseModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ScenariosPageComponent,
    ScenarioListComponent,
    ScenarioDetailPageComponent,
    ScenarioDetailActivityComponent,
    ScenarioDetailChatComponent,
    ScenarioDetailInfoComponent,
    ScenarioGridComponent,
    ScenarioIconsPipe
  ],
  exports: [
    ScenarioListComponent
  ],
  providers: [
    ScenarioDetailPageService
  ]
})
export class ScenariosModule {

}
