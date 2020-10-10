import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthRoutes } from './auth.routes';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    AuthRoutes
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class AuthModule {
}
