import { useEffect } from 'react';
import { DateTime } from 'luxon';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

// components
import NetworkStatus from 'components/NetworkStatus';
import Navbar from 'components/Navbar/Navbar';

// pages
import HomePage from 'pages/Home';
import SettingsPage from 'pages/Settings';

// redux, helpers, styles, etc
import { selectDarkMode, updateSetting } from 'redux/settingsSlice';
import { clearPastReminders } from 'features/Todo/todoSlice';
import { createScheduledNotification, cancelScheduledNotification } from 'helpers/notifications';
import styles from './App.module.css';

/**
 * Note: using HashRouter instead of BrowserRouter because Github pages does not support pushState
 * https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing
 */

function App() {
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearPastReminders());

    /**
     * Testing whether we can use scheduled notifications by trying to create one. If successful
     * then we quickly cancel it
     */
    const tempTag = `test-reminder-${Date.now()}`;
    const timestamp = DateTime.now().plus({ minutes: 1 }).toMillis();
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

  useEffect(() => {
    if (darkMode === 'on') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else if (darkMode === 'off') {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.remove('light-theme');
    }
  }, [darkMode]);

  return (
    <Router>
      <Navbar darkMode={darkMode} />
      <main className="pb-4">
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/settings" exact>
            <SettingsPage />
          </Route>
        </Switch>
      </main>
      <footer className={`${styles.footer} bg-light`}>
        <Container>
          <NetworkStatus />
        </Container>
      </footer>
    </Router>
  );
}

export default App;
