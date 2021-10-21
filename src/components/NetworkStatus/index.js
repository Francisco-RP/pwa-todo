import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from 'components/NetworkStatus/NetworkStatus.module.css';
import { getNetworkStatus } from './status';

function NetworkStatus({ className, ...props }) {
  const [status, setStatus] = useState(null);
  const textRef = useRef(null);

  useEffect(() => {
    // little "hack" to restart a CSS animation when the status changes
    // src: https://css-tricks.com/restart-css-animation/
    if (textRef.current) {
      textRef.current.classList.remove(styles.animate);
      void textRef.current.offsetWidth;
      textRef.current.classList.add(styles.animate);
    }
  }, [status]);

  useEffect(() => {
    const statusCheck = getNetworkStatus(setStatus);

    statusCheck.check().then(setStatus);

    return statusCheck.cleanup;
  }, []);

  if (status === null) return null;

  return (
    <div className="d-flex align-items-center">
      <span
        title={status}
        {...props}
        className={classNames(className, styles.status, styles[status])}
      />
      <span ref={textRef} className={styles.text}>
        {status}
      </span>
    </div>
  );
}

export default NetworkStatus;
