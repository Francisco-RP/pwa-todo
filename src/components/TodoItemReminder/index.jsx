import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import { addReminder, removeReminder } from 'features/Todo/todoSlice';
import { updateSimpleSetting, selectAllowNotifications } from 'redux/settingsSlice';
import Button from 'react-bootstrap/Button';
import DatePicker from 'components/DatePicker/DatePicker';
import { createScheduledNotification, cancelScheduledNotification } from 'helpers/notifications';
import styles from 'components/TodoItemReminder/TodoItemReminder.module.css';

function TodoItemReminder({ todo }) {
  const { id, title, reminders = [] } = todo;
  const dispatch = useDispatch();
  const allowed = useSelector(selectAllowNotifications);

  useEffect(() => {
    Notification.requestPermission()
      .then((permission) => {
        dispatch(
          updateSimpleSetting({
            settingsKey: 'allowNotification',
            value: permission === 'granted',
          })
        );
      })
      .catch(console.error);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div>
          <p className="mb-0 mt-4 fw-bold">Scheduled reminders:</p>
          <ul className={styles.list}>
            {reminders.map((r) => (
              <li key={r.tag}>
                {DateTime.fromMillis(r.timestamp).toLocaleString(DateTime.DATETIME_MED)}{' '}
                <Button
                  variant="secondary"
                  className="rounded-circle"
                  onClick={() => {
                    dispatch(removeReminder({ id, tag: r.tag }));
                    cancelScheduledNotification(r.tag).catch((e) => {
                      console.error(e);
                    });
                  }}
                >
                  <i className="bi bi-x-lg" />
                  <span className="visually-hidden">delete this reminder</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TodoItemReminder;
