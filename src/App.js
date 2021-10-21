import { useEffect } from 'react';
import { DateTime } from 'luxon';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './App.module.css';
import NetworkStatus from 'components/NetworkStatus';
import HomePage from 'pages/Home';
import SettingsPage from 'pages/Settings';
import { selectDarkMode, updateSimpleSetting } from 'redux/settingsSlice';
import Navbar from 'components/Navbar';
import { Container } from 'react-bootstrap';
import { createScheduledNotification, cancelScheduledNotification } from 'helpers/notifications';

/**
 * Note: using HashRouter instead of BrowserRouter because Github pages does not support pushState
 * https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing
 */

function App() {
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    /**
     * Testing whether we can use scheduled notifications by trying to create one. If successful
     * then we quickly cancel it
     */
    const tempTag = `test-reminder-${Date.now()}`;
    const timestamp = DateTime.now().plus({ minutes: 1 }).toMillis();
    createScheduledNotification(tempTag, 'test scheduled reminder', timestamp)
      .then(() => {
        cancelScheduledNotification(tempTag).catch(console.error);
        dispatch(updateSimpleSetting({ settingsKey: 'supportsNotifications', value: true }));
      })
      .catch((e) => {
        console.error(e);
        dispatch(updateSimpleSetting({ settingsKey: 'supportsNotifications', value: false }));
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
