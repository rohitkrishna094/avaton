import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Auth.css';

const Login = props => {
  const { onChange } = props;
  return (
    <div className="login">
      <span>Login</span>
      <input type="text" name="username" placeholder="Username" onChange={onChange} />
      <input type="password" name="password" placeholder="Password" onChange={onChange} />
      <button>Login</button>
    </div>
  );
};

const Register = props => {
  const { onChange } = props;
  return (
    <div className="register">
      <span>Register</span>
      <input type="text" name="name" placeholder="Name" onChange={onChange} />
      <input type="email" name="email" placeholder="Email" onChange={onChange} />
      <input type="text" name="username" placeholder="Username" onChange={onChange} />
      <input type="password" name="password" placeholder="Password" onChange={onChange} />
      <button>Register</button>
    </div>
  );
};

class Auth extends Component {
  state = { active: 'register', registerCreds: { name: '', email: '', username: '', password: '' }, loginCreds: { username: '', password: '' } };

  onClick = (e, active) => {
    this.setState({ active });
  };

  onChange = e => {
    const active = this.state.active;
    this.setState({
      [`${active}Creds`]: {
        ...this.state[`${active}Creds`],
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    const mapping = {
      register: <Register onChange={e => this.onChange(e)} />,
      login: <Login onChange={e => this.onChange(e)} />
    };

    const colorCondition = this.state.active === 'login';

    return (
      <div className="auth">
        <div className="info">
          <span className="title">Welcome to Avaton!!!!</span>
          <span className="description">We are the biggest social network with 5 billion active users all around the world. Go ahead and register now.</span>
        </div>
        <div className="auth-card">
          <div className="button-section">
            <span onClick={e => this.onClick(e, 'register')}>
              <i className="fas fa-user-plus" style={!colorCondition ? { color: 'var(--primary-background-color)' } : undefined} />
            </span>
            <span onClick={e => this.onClick(e, 'login')}>
              <i className="fas fa-sign-in-alt" style={colorCondition ? { color: 'var(--primary-background-color)' } : undefined} />
            </span>
          </div>
          <div className="form-section">{mapping[this.state.active]}</div>
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
