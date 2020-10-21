import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'di-verify',
  template: `
    <div class="loader loader--center">
    </div>
  `
})
export class VerifyComponent implements OnInit {
  private returnUrl = '/';

  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(({ returnUrl }) => {
      this.returnUrl = returnUrl || '/';
    });
  }

  async ngOnInit() {
    if ( !this.authService.hasToken() ) {
      this.navigate('/auth/login');
      return;
    }

    if ( this.authService.hasToken() && !this.authService.hasSession() ) {
      this.authService.load()
        .then(() => this.navigate(this.returnUrl));
    } else if ( this.authService.hasSession() ) {
      this.navigate(this.returnUrl);
    }
  }

  private navigate(url: string) {
    this.router.navigateByUrl(url, { replaceUrl: true });
  }
}
