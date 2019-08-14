import React, { Component } from 'react';
import { isAuthenticated } from '../../util/jwtUtil';
import './Home.css';
import Navbar from '../Navbar/Navbar';
import HomeMain from './HomeMain';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Navbar />
        <HomeMain />
      </div>
    );
  }
}
export default Home;
