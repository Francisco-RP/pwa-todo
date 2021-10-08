import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from 'pages/Home';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
        
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
