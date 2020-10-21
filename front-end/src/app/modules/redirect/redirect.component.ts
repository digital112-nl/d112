import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { SideBarFormat } from '../../shared/components/side-bar/side-bar.format';

@Component({
  selector: 'di-redirect',
  template: `
    <div class="loader loader--center">
      Loading
    </div>
  `
})
export class RedirectComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    const possibleRoutes = _.flatten(SideBarFormat.map(container => container.items));

    if ( possibleRoutes.length > 0 ) {
      this.router.navigate(possibleRoutes[ 0 ].routerLink as string[], { replaceUrl: true });
    }
  }
}
