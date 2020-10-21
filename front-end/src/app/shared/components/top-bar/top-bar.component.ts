import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { TopBarService } from './top-bar.service';

@Component({
  selector: 'di-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  public isDropDownActive = false;

  constructor(
    public topBarService: TopBarService,
    public authService: AuthService
  ) {
  }
}
