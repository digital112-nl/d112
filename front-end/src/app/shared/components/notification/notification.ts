
import { Subject } from 'rxjs';

export interface Notification {
  id: string;
  key: string;
  hide: boolean;
  hovering: boolean;
  currentTimeout: number;
  timerPercentage: number;
  state: NotificationState;
  settings: NotificationSettings;
  stateEvent: Subject<NotificationState>;
  buttonEvent: Subject<NotificationButton>;
}

export interface NotificationSettings {
  icon: string;
  key?: string;
  header?: string;
  headerData?: any;
  message: string;
  messageData?: any;
  variation?: string;
  timeout: number;
  buttons?: NotificationButton[];
}

export interface NotificationButton {
  key: string;
  translationKey: string;
  color: string;
  behaviour?: string;
}

export enum NotificationState {
  Remove = -1,
  Active = 0,
  FadeOut = 1
}
