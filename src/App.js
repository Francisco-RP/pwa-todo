import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './App.module.css';
import NetworkStatus from 'components/NetworkStatus';
import HomePage from 'pages/Home';
import SettingsPage from 'pages/Settings';
import { selectDarkMode } from 'redux/settingsSlice';
import Navbar from 'components/Navbar';
import { Container } from 'react-bootstrap';

function App() {
  const darkMode = useSelector(selectDarkMode);

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
