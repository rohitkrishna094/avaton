import React, { Component } from 'react';
import './App.css';
import { isAuthenticated } from './util/jwtUtil';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Profile from './components/Profile/Profile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/login" render={() => (isAuthenticated() ? <Redirect to="/profile" /> : <Auth />)} />
            <Route exact path="/register" render={() => (isAuthenticated() ? <Redirect to="/profile" /> : <Auth />)} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/home" exact component={Home} />
            <Route path="/" component={Auth} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
