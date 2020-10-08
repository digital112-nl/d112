import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { ClickOutsideModule } from 'ng-click-outside';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './notification/notification.service';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SideBarService } from './side-bar/side-bar.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TopBarService } from './top-bar/top-bar.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,

    ClickOutsideModule
  ],
  declarations: [
    SideBarComponent,
    TopBarComponent,
    NotificationComponent
  ],
  exports: [
    SideBarComponent,
    TopBarComponent,
    NotificationComponent
  ],
  providers: [
    SideBarService,
    TopBarService,
    NotificationService
  ]
})
export class SharedComponentsModule {

}
