import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/profile" exact component={Profile} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
