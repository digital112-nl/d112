import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/dashboard',
    pathMatch: 'full',
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
