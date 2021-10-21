import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addReminder, removeReminder } from 'features/Todo/todoSlice';
import { selectAllowNotifications } from 'redux/settingsSlice';
import Button from 'react-bootstrap/Button';
import DatePicker from 'components/DatePicker/DatePicker';
import { createScheduledNotification, cancelScheduledNotification } from 'helpers/notifications';
import styles from 'components/TodoItemReminder/TodoItemReminder.module.css';

function TodoItemReminder({ todo }) {
  const { id, title, reminders = [] } = todo;
  const dispatch = useDispatch();
  const allowed = useSelector(selectAllowNotifications);

  if (!allowed) {
    return (
      <div className={styles.settingsWrap}>
        <p>
          Notifications have been disabled. Enable them in <Link to="/settings">settings</Link>
        </p>
      </div>
    );
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
            .then(() => {
              dispatch(
                addReminder({
                  id,
                  tag,
                  timestamp,
                })
              );
            })
            .catch((e) => {
              console.error(e);
              alert(`Error adding notification. ${e.message}`);
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
