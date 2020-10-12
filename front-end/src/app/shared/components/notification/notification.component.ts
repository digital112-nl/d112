import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { Notification, NotificationButton, NotificationState } from './notification';
import { NotificationService } from './notification.service';

@Component({
  selector: 'di-notification',
  templateUrl: './notification.component.html',
  styleUrls: [ './notification.component.scss' ]
})
export class NotificationComponent implements OnDestroy {

  /**
   * Notifications Array
   */
  public notifications: Notification[] = [];

  /**
   * Subscription for Notifications
   */
  private subscription: Subscription = null;

  /**
   * Notification Constructor
   */
  constructor(
    private notificationService: NotificationService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.notifications = this.notificationService.notifications;

    this.subscription = this.notificationService
      .notifications$
      .subscribe((notifications: Notification[]) => {
        this.notifications = notifications;
        this.changeDetectorRef.detectChanges();
      });
  }

  /**
   * On Destroy Event
   */
  public ngOnDestroy() {
    if ( !_.isNil(this.subscription) ) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * When we click on a notification button.
   */
  onButtonClick(
    notification: Notification,
    button: NotificationButton
  ) {
    switch (button.behaviour) {
      case 'close':
        this.closeNotification(notification);
        break;
    }

    notification.buttonEvent.next(button);
  }

  /**
   * When we close the
   */
  onClose(notification: Notification) {
    this.closeNotification(notification);
  }

  /**
   * Close the notification
   */
  closeNotification(notification: Notification) {
    const originalNotification: Notification = this.notificationService.find(notification);

    originalNotification.state = NotificationState.FadeOut;
    originalNotification.stateEvent.next(originalNotification.state);
    originalNotification.hide = true;

    this.notificationService.publish();
  }

  /**
   * When we hover over the notification.
   */
  onHover(notification: Notification) {
    const originalNotification: Notification = this.notificationService.find(notification);

    if ( !_.isNil(originalNotification) ) {
      originalNotification.hovering = true;

      this.notificationService.publish();
    }
  }

  /**
   * When we hover out of the notification.
   */
  onHoverOut(notification: Notification) {
    const originalNotification: Notification = this.notificationService.find(notification);

    if ( !_.isNil(originalNotification) ) {
      originalNotification.hovering = false;

      this.notificationService.publish();
    }
  }
}
