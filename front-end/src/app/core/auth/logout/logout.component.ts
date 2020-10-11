import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'di-logout',
  template: ' logging out '
})
export class LogoutComponent {
  constructor(
    private router: Router
  ) {
    this.router.navigateByUrl('/auth/login');
  }
}
