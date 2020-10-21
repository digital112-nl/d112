import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'di-logout',
  template: ' logging out '
})
export class LogoutComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.deleteToken();
    this.router.navigateByUrl('/auth/login');
  }
}
