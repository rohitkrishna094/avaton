import React from 'react';
import './App.css';
import { isAuthenticated } from './util/jwtUtil';
import Auth from './components/Auth/Auth';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/login" render={() => (isAuthenticated() ? <Redirect to="/profile" /> : <Auth />)} />
            <Route exact path="/register" render={() => (isAuthenticated() ? <Redirect to="/profile" /> : <Auth />)} />
            <Route path="/" component={Auth} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
