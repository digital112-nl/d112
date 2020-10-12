import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { Notification, NotificationSettings, NotificationState } from './notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /**
   * Notifications
   */
  public notifications: Notification[] = [];

  /**
   * The Notification Subject
   */
  public notifications$: Subject<Notification[]> = new Subject();

  /**
   * Is the Interval Running or not.
   */
  private isIntervalRunning = false;

  /**
   * Timeout for the timer.
   */
  private timeout: any = null;

  /**
   * Cycle the notification.
   *
   * This essentially changes the state of a notification.
   * Decrements the current timeout.
   * Schedules notifications to be removed.
   * Set the Timer Percentage
   *
   */
  static cycleNotification(notification: Notification): Notification {

    // Switch to the current state.
    switch (notification.state) {

      // If the notification needs to fade out.
      case NotificationState.FadeOut:
        notification.state = NotificationState.Remove;
        notification.stateEvent.next(notification.state);
        break;

      // Default notification state
      default:

        // When hovering over the notification we don't want to do anything.
        if ( notification.hovering === true ) {
          return null;
        }

        // If the notification timeout is more than 0 make sure we decrement it.
        // Else we hide it and set the state to Fade Out. So that we can remove it
        // next time we cycle through everything.
        if ( notification.currentTimeout > 0 ) {
          notification.currentTimeout -= 0.5;
        } else {
          notification.hide = true;
          notification.state = NotificationState.FadeOut;
          notification.stateEvent.next(notification.state);
        }

        // Calculate the timer percentage
        const totalTime = notification.settings.timeout;
        const currentTime = notification.currentTimeout;
        const percentage = Math.ceil(currentTime / (totalTime / 100));

        // If the percentage is more than 100, we return 100
        // Bear in mind the percentage goes from 100 to 0.
        // So if the notification needs to display for 8 seconds and
        // the notification displayed for 2 seconds equals 75% of the timer.
        // As in 75% left of time.
        if ( percentage > 100 ) {
          notification.timerPercentage = 100;
        } else {
          notification.timerPercentage = percentage;
        }

        break;
    }
  }

  /**
   * Add a Notification
   */
  public notify(settings: NotificationSettings): Notification {
    if ( !_.isNil(settings.key) ) {
      this.remove(settings.key);
    }

    const id = this.generateId();
    const notification: Notification = {
      id,

      // Key for notification
      key: settings.key || id,

      // Is hidden
      hide: false,

      // Is hovering over
      hovering: false,

      // Current timeout is the timeout specified in the settings.
      currentTimeout: settings.timeout,

      // The current timer state in percentages
      timerPercentage: 100, // percentage

      // Current state
      state: NotificationState.Active,

      // Settings
      settings,

      // Subjects
      stateEvent: new Subject(),
      buttonEvent: new Subject()
    };

    // Add the notification
    this.notifications.push(notification);
    // Publish the new notification
    this.publish();

    // Check if the interval is running and if not start it.
    if ( this.isIntervalRunning === false ) {
      this.startInterval();
    }

    return notification;
  }

  /**
   * Find a notification.
   */
  public find(notification: Notification) {
    const i = this.notifications.indexOf(notification);

    return this.notifications[ i ];
  }

  /**
   * Remove by key
   */
  public remove(key: string) {
    const foundNotification = _.find(this.notifications, { key });

    if ( !_.isNil(foundNotification) ) {
      const index = this.notifications.indexOf(foundNotification);

      this.notifications.splice(index, 1);
    }

    this.publish();
  }

  /**
   * Publish everything to the subscribed components.
   */
  public publish() {
    this.notifications$.next(this.notifications);
  }

  /**
   * Start the interval
   */
  private startInterval() {
    this.isIntervalRunning = true;
    this.cycle();
  }

  /**
   * Stop the interval
   */
  private stopInterval(): void {
    this.isIntervalRunning = false;
    clearTimeout(this.timeout);
  }

  private cycle() {
    // Make sure the interval is running.
    if ( this.isIntervalRunning ) {

      // Make sure there is an notification and if not, stop the interval.
      if ( this.notifications.length > 0 ) {

        // Filter out removed states
        this.notifications = this.notifications.filter(
          notification => notification.state >= 0);

        // Make sure the next time we cycle through everything we remove the faded out notification.
        this.notifications.forEach((notification) => {
          const i = this.notifications.indexOf(notification);

          // Cycle the Notification
          const cycledNotification: Notification = NotificationService.cycleNotification(notification);

          if ( _.isNil(cycledNotification) === false ) {
            this.notifications[ i ] = cycledNotification;
          }
        });

        // Publish the changes
        this.publish();

        // Schedule the next cycle
        this.timeout = setTimeout(() => {
          this.cycle();
        }, 500);
      } else {
        this.stopInterval();
      }
    }
  }

  /**
   * Generate an id.
   */
  private generateId(): string {
    return Math.random().toString(36).substr(2, 5);
  }
}
