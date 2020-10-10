import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const AUTH_ROUTING: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

export const AuthRoutes = RouterModule.forChild(AUTH_ROUTING);
