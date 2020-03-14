import Component from '@ember/component';
import Ember from 'ember';

import { htmlSafe } from '@ember/string';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import {
  attribute,
  layout,
  className,
  classNames,
} from '@ember-decorators/component';
import template from './template';

@layout(template)
@classNames(
  'notification grid gap-4 grid-cols-a1a pl-4 pr-2 items-center relative overflow-hidden rounded text-white mb-4 translate-3d'
)
export default class NotificationMessage extends Component {
  @service() notifications;
  paused = false;

  @attribute('data-test-notification-message')
  @computed('notification.type')
  get testNotification() {
    return this.get('notification.type');
  }

  // @className
  // @computed("notification.cssClasses")
  // get cssClasses() {
  //   return this.get("notification.cssClasses");
  // }

  @className
  @computed('notification.dismiss')
  get dismissClass() {
    if (!this.get('notification.dismiss')) return 'dismiss-in';
    return false;
  }

  @className
  @computed('notification.onClick')
  get clickableClass() {
    if (this.get('notification.onClick')) return 'cursor-pointer';
    return false;
  }

  @computed('notification.type')
  get notificationSVGPath() {
    switch (this.get('notification.type')) {
      case 'error':
        return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z';
      case 'info':
        return 'M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z';
      case 'success':
        return 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z';
      case 'warning':
        return 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z';
    }

    return '';
  }

  @className
  @computed('notification.type')
  get processedType() {
    switch (this.notification.type) {
      case 'error':
        return 'bg-red-500';
      case 'info':
        return 'bg-blue-500';
      case 'success':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
    }

    return '';
  }

  @computed('paused', 'notification.clearDuration')
  get notificationClearDuration() {
    const duration = Ember.Handlebars.Utils.escapeExpression(
      this.get('notification.clearDuration')
    );
    const playState = this.get('paused') ? 'paused' : 'running';
    return htmlSafe(
      `animation-duration: ${duration}ms; -webkit-animation-duration: ${duration}ms; animation-play-state: ${playState}; -webkit-animation-play-state: ${playState}`
    );
  }

  @action
  handleOnClick() {
    if (this.get('notification.onClick')) {
      this.get('notification.onClick')(this.get('notification'));
    }
  }

  @action
  removeNotification() {
    this.get('notifications').removeNotification(this.get('notification'));
  }

  @action
  handleMouseEnter() {
    if (this.get('notification.autoClear')) {
      this.set('paused', true);
      this.notifications.pauseAutoClear(this.get('notification'));
    }
  }

  @action
  handleMouseLeave() {
    if (this.get('notification.autoClear')) {
      this.set('paused', false);
      this.notifications.setupAutoClear(this.get('notification'));
    }
  }
}
