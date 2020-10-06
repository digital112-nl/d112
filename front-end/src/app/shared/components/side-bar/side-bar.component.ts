import { Component } from '@angular/core';
import { SideBarFormat } from './side-bar.format';
import { SideBarService } from './side-bar.service';

@Component({
  selector: 'di-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  public sideBarFormat = SideBarFormat;

  constructor(
    public sideBarService: SideBarService
  ) {
  }

  public trackByFn(
    index,
    item
  ) {
    return item.translationKey;
  }
}
