import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ScenariosPageComponent } from './scenarios-page/scenarios-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ScenariosPageComponent
  ]
})
export class ScenariosModule {

}
