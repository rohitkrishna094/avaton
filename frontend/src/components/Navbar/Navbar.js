import React, { Component } from 'react';
import './Navbar.css';
import logo from '../../assets/images/logo.png';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="title">Profile Page</div>
        <div className="search">
          <input type="text" placeholder="Search here for people or pages" />
          <i class="fas fa-search" />
        </div>
        <div className="find-friends">
          <span>Find Friends</span>
        </div>
        <div className="controls">
          <i class="far fa-plus-square" />
          <div className="bubble bg-blue">3</div>
          <i class="far fa-comment" />
          <div className="bubble bg-purple">4</div>
          <i class="far fa-bell" />
          <div className="bubble bg-primary">5</div>
        </div>
        <div className="profile-heading">
          <img src="https://html.crumina.net/html-olympus/img/author-page.jpg" alt="" />
          <span className="username">James Spiegel</span>
          <span className="avatar-name">Space Cowboy</span>
          <i class="fas fa-angle-down" />
        </div>
      </div>
    );
  }
}

export default Navbar;
