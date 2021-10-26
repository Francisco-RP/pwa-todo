import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import { createScheduledNotification, cancelScheduledNotification } from 'helpers/notifications';
import { updateSetting } from 'redux/settingsSlice';

export default function useCheckNotification() {
  const dispatch = useDispatch();

  useEffect(() => {
    /**
     * Testing whether we can use scheduled notifications by trying to create one. If successful
     * then we quickly cancel it
     */
    const tempTag = `test-reminder-${Date.now()}`;
    const timestamp = DateTime.now().plus({ minutes: 2 }).toMillis();
    createScheduledNotification(tempTag, 'test scheduled reminder', timestamp)
      .then(() => {
        cancelScheduledNotification(tempTag).catch(console.error);
        dispatch(updateSetting({ supportsNotifications: true, allowNotification: true }));
      })
      .catch((e) => {
        console.error('App.js createScheduledNotification:', e);
        // if permission is not granted then we don't know if notifications are not supported yet
        if (e.message.includes('permission')) {
          dispatch(updateSetting({ allowNotification: false }));
        } else {
          dispatch(updateSetting({ supportsNotifications: false }));
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
