import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SideBarService } from './side-bar/side-bar.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    SideBarComponent
  ],
  exports: [
    SideBarComponent
  ],
  providers: [
    SideBarService
  ]
})
export class SharedComponentsModule {

}
