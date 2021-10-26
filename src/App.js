import { useEffect } from 'react';
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
import useCheckNotification from 'hooks/useCheckNotification';
import { selectDarkMode } from 'redux/settingsSlice';
import { clearPastReminders } from 'features/Todo/todoSlice';
import styles from './App.module.css';

/**
 * Note: using HashRouter instead of BrowserRouter because Github pages does not support pushState
 * https://create-react-app.dev/docs/deployment/#notes-on-client-side-routing
 */

function App() {
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  useCheckNotification();

  useEffect(() => {
    dispatch(clearPastReminders());
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
