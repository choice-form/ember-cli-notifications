import Component from "@ember/component";
import { htmlSafe } from "@ember/string";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

import Ember from "ember";

import layout from "../templates/components/notification-message";

export default Component.extend({
  layout,
  tagName: "",
  notifications: service(),

  paused: false,

  "close-icon": "glyph-i-remove-16",

  dismissClass: computed("notification.dismiss", function() {
    if (!this.get("notification.dismiss")) return "c-notification--in";

    return false;
  }),

  clickableClass: computed("notification.onClick", function() {
    if (this.get("notification.onClick")) return "c-notification--clickable";

    return false;
  }),

  // Set icon depending on notification type
  notificationIcon: computed("notification.type", "icons", function() {
    const icons = this.get("icons");

    switch (this.get("notification.type")) {
      case "info":
        return "glyph-c-info-e-16";
      case "success":
        return "glyph-f-check-16";
      case "warning":
        return "glyph-t-warning-16";
      case "error":
        return "glyph-c-warning-e-16";
    }

    return "";
  }),

  processedType: computed("notification.type", function() {
    if (
      this.get("notification.type") &&
      ["info", "success", "warning", "error"].indexOf(
        this.get("notification.type")
      ) !== -1
    ) {
      return `c-notification--${this.get("notification.type")}`;
    }

    return "";
  }),

  // Apply the clear animation duration rule inline
  notificationClearDuration: computed(
    "paused",
    "notification.clearDuration",
    function() {
      const duration = Ember.Handlebars.Utils.escapeExpression(
        this.get("notification.clearDuration")
      );
      const playState = this.get("paused") ? "paused" : "running";
      return htmlSafe(
        `animation-duration: ${duration}ms; -webkit-animation-duration: ${duration}ms; animation-play-state: ${playState}; -webkit-animation-play-state: ${playState}`
      );
    }
  ),

  actions: {
    handleOnClick() {
      if (this.get("notification.onClick")) {
        this.get("notification.onClick")(this.get("notification"));
      }
    },

    removeNotification() {
      this.get("notifications").removeNotification(this.get("notification"));
    },

    handleMouseEnter() {
      if (this.get("notification.autoClear")) {
        this.set("paused", true);
        this.notifications.pauseAutoClear(this.get("notification"));
      }
    },

    handleMouseLeave() {
      if (this.get("notification.autoClear")) {
        this.set("paused", false);
        this.notifications.setupAutoClear(this.get("notification"));
      }
    }
  }
});
