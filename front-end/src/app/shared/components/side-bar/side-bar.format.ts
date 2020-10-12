import { SideBarContainer } from './side-bar.models';

export const SideBarFormat: SideBarContainer[] = [
  {
    divider: true,
    items: [
      {
        icon: 'house-2',
        key: 'Dashboard',
        routerLink: [ '/app/dashboard' ]
      },
      {
        icon: 'world-2',
        key: 'Map',
        routerLink: [ '/app/map' ]
      },
      {
        icon: 'hierarchy-55-2',
        key: 'Scenarios',
        routerLink: [ '/app/scenarios' ]
      }
    ]
  },
  {
    items: [
      {
        icon: 'multiple-11-2',
        key: 'Accounts',
        routerLink: [ '/app/accounts' ]
      },
      {
        icon: 'gear-2',
        key: 'Settings',
        routerLink: [ '/app/settings' ]
      }
    ]
  }
];
