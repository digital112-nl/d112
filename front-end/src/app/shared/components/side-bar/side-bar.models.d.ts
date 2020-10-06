/**
 * Sidebar Header container
 */
export interface SideBarContainer {
  items: SideBarItem[];
}

/**
 * Sidebar item.
 */
export interface SideBarItem {
  key: string;
  icon: string;
  routerLink: any[] | string;
  disabled?: boolean;
}
