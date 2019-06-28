import React, { Component } from 'react';
import './App.css';
import { isAuthenticated } from './util/jwtUtil';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="particles-js" />
        <Router>
          <div>
            <Switch>
              <Route exact path="/login" render={() => (isAuthenticated() ? <Redirect to="/profile" /> : <Auth />)} />
              <Route exact path="/register" render={() => (isAuthenticated() ? <Redirect to="/profile" /> : <Auth />)} />
              <Route path="/home" component={Home} />
              <Route path="/" component={Auth} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
