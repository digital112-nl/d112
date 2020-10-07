/**
 * Sidebar Header container
 */
export interface SideBarContainer {
  divider?: boolean;
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
