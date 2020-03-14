import Component from '@ember/component';
import { computed } from '@ember/object';

import {
  attribute,
  className,
  classNames,
  layout,
} from '@ember-decorators/component';
import { htmlSafe } from '@ember/string';
import { inject as service } from '@ember/service';

import template from './template';

@layout(template)
@classNames('ui-notification__container mx-auto fixed')
export default class NotificationContainer extends Component {
  position = 'top';
  maxWidth = '400';
  zIndex = '1060';

  @service() notifications;

  @className
  @computed('position')
  get computedPosition() {
    switch (this.position) {
      case 'top':
        return 'top-4 right-0 left-0';
      case 'top-left':
        return 'top-4 left-4 right-auto';
      case 'top-right':
        return 'top-4 right-4 left-auto';
      case 'bottom':
        return 'bottom-4 right-0 left-0';
      case 'bottom-left':
        return 'bottom-4 left-4 right-auto';
      case 'bottom-right':
        return 'bottom-4 right-4 left-auto';
    }

    return '';
  }

  @attribute('style')
  @computed('maxWidth', 'zIndex')
  get computedStyle() {
    return htmlSafe(`z-index: ${this.zIndex}; max-width: ${this.maxWidth}px`);
  }
}
