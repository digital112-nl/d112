import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClickOutsideModule } from 'ng-click-outside';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SideBarService } from './side-bar/side-bar.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TopBarService } from './top-bar/top-bar.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    ClickOutsideModule
  ],
  declarations: [
    SideBarComponent,
    TopBarComponent
  ],
  exports: [
    SideBarComponent,
    TopBarComponent
  ],
  providers: [
    SideBarService,
    TopBarService
  ]
})
export class SharedComponentsModule {

}
