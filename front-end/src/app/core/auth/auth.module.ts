import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutes } from './auth.routes';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,

    AuthRoutes
  ],
  declarations: [
    LoginComponent
  ]
})
export class AuthModule {
}
