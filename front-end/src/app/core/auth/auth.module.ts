import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthRoutes } from './auth.routes';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    AuthRoutes
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    VerifyComponent
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class AuthModule {
}
