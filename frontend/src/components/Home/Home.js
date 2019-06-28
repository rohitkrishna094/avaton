import React, { Component } from 'react';
import { isAuthenticated } from '../../util/jwtUtil';

class Home extends Component {
  render() {
    console.log(isAuthenticated());
    return (
      <div>
        <p>Home works</p>
      </div>
    );
  }
}
export default Home;
