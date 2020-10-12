import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SettingsPageComponent } from './settings-page/settings-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    SettingsPageComponent
  ]
})
export class SettingsModule {

}
