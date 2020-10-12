import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthRoutes } from './auth.routes';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    AuthRoutes
  ],
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class AuthModule {
}
