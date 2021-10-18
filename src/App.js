import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from 'pages/Home';
import SettingsPage from 'pages/Settings';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
        
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/settings" exact>
            <SettingsPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
