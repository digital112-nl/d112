import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AccountsPageComponent } from './accounts-page/accounts-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    AccountsPageComponent
  ]
})
export class AccountsModule {

}
