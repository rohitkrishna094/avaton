import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import ProfileMain from './ProfileMain';

class Profile extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <ProfileMain />;
      </div>
    );
  }
}
export default Profile;
