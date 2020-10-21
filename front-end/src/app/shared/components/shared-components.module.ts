import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ClickOutsideModule } from 'ng-click-outside';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { MapComponent } from './map/map.component';
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

        ClickOutsideModule,
        LeafletModule,
        SharedPipesModule
    ],
  declarations: [
    SideBarComponent,
    TopBarComponent,
    NotificationComponent,
    MapComponent
  ],
  exports: [
    SideBarComponent,
    TopBarComponent,
    NotificationComponent,
    MapComponent
  ],
  providers: [
    SideBarService,
    TopBarService,
    NotificationService
  ]
})
export class SharedComponentsModule {

}
