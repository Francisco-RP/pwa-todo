import { useEffect } from 'react';
import styles from 'components/SnackBar/SnackBar.module.css';

function SnackBar({ title, actionTitle, action, onClose }) {
  useEffect(() => {
    const timeout = setTimeout(onClose, 5000);
    return function cleanup() {
      window.clearTimeout(timeout);
    };
  }, [onClose]);

  return (
    <div role="alert" className={styles.snackWrap}>
      <div className={styles.snackInner}>
        <div>{title}</div>
        <div className={styles.actionWrap}>
          {action && actionTitle && (
            <button className={styles.action} type="button" onClick={action}>
              {actionTitle}
            </button>
          )}

          <button type="button" className={styles.close} onClick={onClose}>
            <i className="bi bi-x-lg" />
            <span className="visually-hidden">close</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SnackBar;
