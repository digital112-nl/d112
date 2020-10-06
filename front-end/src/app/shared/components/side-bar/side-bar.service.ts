import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  public isClosed = false;

  constructor() {
    try {
      const item = window.localStorage.getItem('Sidebar.Closed');

      if (item !== undefined && item !== null) {
        const parsedItem = JSON.parse(item);

        if (_.isBoolean(parsedItem)) {
          this.isClosed = parsedItem;
        } else {
          window.localStorage.setItem('Sidebar.Closed', JSON.stringify(this.isClosed));
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Open or close the sidebar
   */
  public toggleSideBar() {
    this.isClosed = !this.isClosed;
    window.localStorage.setItem('Sidebar.Closed', JSON.stringify(this.isClosed));
  }
}
