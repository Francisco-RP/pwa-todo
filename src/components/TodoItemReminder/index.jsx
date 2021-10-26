import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';

import { addReminder, removeReminder } from 'features/Todo/todoSlice';
import { selectAllowNotifications, selectSupportsNotifications } from 'redux/settingsSlice';

import DatePicker from 'components/DatePicker';
import { createScheduledNotification, cancelScheduledNotification } from 'helpers/notifications';
import { Icon } from 'components/Utils';
import styles from 'components/TodoItemReminder/TodoItemReminder.module.css';

function TodoItemReminder({ todo, onClose }) {
  const { id, title, reminders = [] } = todo;
  const dispatch = useDispatch();
  const allowed = useSelector(selectAllowNotifications);
  const supported = useSelector(selectSupportsNotifications);

  const scheduleReminder = (time) => {
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
  };

  const deleteReminder = (tag) => {
    return () => {
      dispatch(removeReminder({ id, tag }));
      cancelScheduledNotification(tag).catch((e) => {
        console.error(e);
      });
    };
  };

  const closeBtn = (
    <button type="button" className={`btn-reset ${styles.close}`} onClick={onClose}>
      <Icon name="x-lg" />
      <span className="visually-hidden">close</span>
    </button>
  );

  if (!supported) {
    return (
      <div className={styles.settingsWrap}>
        {closeBtn}
        <p className="m-0">
          We're sorry, your platform does not currently support scheduled notifications
        </p>
      </div>
    );
  }

  if (!allowed || !supported) {
    return (
      <div className={styles.settingsWrap}>
        {closeBtn}
        <p className="m-0">
          Notifications have been disabled. Enable them in <Link to="/settings">settings</Link>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.settingsWrap}>
      {closeBtn}
      <DatePicker required onTimeAccepted={scheduleReminder} />
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
                  onClick={deleteReminder(r.tag)}
                >
                  <Icon name="x-lg" />
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
