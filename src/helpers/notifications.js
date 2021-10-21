/**
 * @param {string} tag a unique id
 * @param {string} title what the notification will say
 * @param {number} timestamp Date.now()
 */
export const createScheduledNotification = async (tag, title, timestamp) => {
  if ('showTrigger' in Notification.prototype) {
    const registration = await navigator.serviceWorker.getRegistration();
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      registration.showNotification(title, {
        tag: tag,
        body: 'This notification was scheduled 30 seconds ago',
        showTrigger: new window.TimestampTrigger(timestamp + 30 * 1000),

        data: {
          url: window.location.href, // pass the current url to the notification
        },
        badge: 'logo192.png',
        icon: 'logo192.png',
        actions: [
          {
            action: 'open',
            title: 'Open app',
          },
          {
            action: 'close',
            title: 'Close notification',
          },
        ],
      });
    } else {
      throw new Error('Notification permission denied');
    }
  }
  throw new Error('Notification.showTrigger not supported');
};

/**
 * @param {string} tag the id of the notification to remove
 */
export const cancelScheduledNotification = async (tag) => {
  if ('showTrigger' in Notification.prototype) {
    const registration = await navigator.serviceWorker.getRegistration();
    const notifications = await registration.getNotifications({
      tag: tag,
      includeTriggered: true,
    });
    notifications.forEach((notification) => notification.close());
  } else {
    throw new Error('Notification.showTrigger not supported');
  }
};
