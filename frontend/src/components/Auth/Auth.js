import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Auth.css';

const Login = props => {
  return (
    <div className="login">
      <input type="text" name="username" />
      <input type="password" name="password" />
    </div>
  );
};

const Register = props => {
  return (
    <div className="register">
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="text" name="username" />
      <input type="password" name="password" />
    </div>
  );
};

class Auth extends Component {
  render() {
    return (
      <div className="auth">
        <div className="info">
          <span className="title">Welcome to Avaton!!!!</span>
          <span className="description">We are the biggest social network with 5 billion active users all around the world. Go ahead and register now.</span>
        </div>
        <div className="auth-card">
          <div className="button-section">
            <span>
              <i className="fas fa-user-plus" />
            </span>
            <span>
              <i className="fas fa-sign-in-alt" />
            </span>
          </div>
          <div className="form-section">
            <Register />
            {/* <Login /> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Auth));
