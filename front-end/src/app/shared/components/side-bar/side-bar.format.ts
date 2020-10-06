import { SideBarContainer } from './side-bar.models';

export const SideBarFormat: SideBarContainer[] = [
  {
    items: [
      {
        icon: 'dashboard-44-1',
        key: 'Dashboard',
        routerLink: [ '/app/dashboard' ]
      }
    ]
  },
  {
    items: [
      {
        icon: 'setting-1',
        key: 'Settings',
        routerLink: [ '/app/settings' ]
      }
    ]
  }
];
