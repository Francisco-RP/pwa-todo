import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';
import { useDispatch } from 'react-redux';
import { addReminder, removeReminder } from 'features/Todo/todoSlice';
import DatePicker from 'components/DatePicker/DatePicker';
import styles from 'components/TodoItemSetting/TodoItemSetting.module.css';
import { createScheduledNotification, cancelScheduledNotification } from 'helpers/notifications';

function TodoItemSetting({ todo }) {
  const { id, title, reminders = [] } = todo;
  const dispatch = useDispatch();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    Notification.requestPermission().then((permission) => setAllowed(permission === 'granted'));
  }, []);

  if (!allowed) {
    <div className={styles.settingsWrap}>
      <p>Notifications have been disabled</p>
    </div>;
  }

  return (
    <div className={styles.settingsWrap}>
      <DatePicker
        required
        onTimeAccepted={(time) => {
          if (!time) return;
          const tag = uuid();
          const timestamp = DateTime.fromISO(time).toMillis();
          createScheduledNotification(tag, title, timestamp)
            .then((result) => {
              if (result) {
                dispatch(
                  addReminder({
                    id,
                    tag,
                    timestamp,
                  })
                );
              } else {
                alert('Error setting up notification');
              }
            })
            .catch((e) => {
              console.error(e);
            });
        }}
      />
      {reminders.length > 0 && (
        <ul>
          {reminders.map((r) => (
            <li key={r.tag}>
              {r.timestamp}{' '}
              <button
                type="button"
                onClick={() => {
                  dispatch(removeReminder({ id, tag: r.tag }));
                  cancelScheduledNotification(r.tag).catch((e) => {
                    console.error(e);
                  });
                }}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoItemSetting;
