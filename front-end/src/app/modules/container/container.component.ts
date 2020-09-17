import { Component, OnDestroy, OnInit } from '@angular/core';
import { isNil } from 'lodash';
import { Subscription } from 'rxjs';

export interface SideBarContainer {
  text?: string;
  permission?: string;
  items: SideBarItem[];
}

/**
 * Sidebar item.
 */
export interface SideBarItem {
  text: string;
  icon: string;
  routerLink: string;
  disabled?: boolean;
}


@Component({
  selector: 'di-container',
  templateUrl: './container.component.html',
  styleUrls: [ './container.component.scss' ]
})
export class ContainerComponent {
}
