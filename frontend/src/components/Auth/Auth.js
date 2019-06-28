import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { register, removeRegisterError, login } from '../../store/actions/authActions';
import './Auth.css';

const Login = props => {
  const { onChange, onSubmit, onEnter } = props;
  return (
    <div className="login">
      <span>Login</span>
      <input type="text" name="username" placeholder="Username" onChange={onChange} onKeyDown={onEnter} />
      <input type="password" name="password" placeholder="Password" onChange={onChange} onKeyDown={onEnter} />
      <button onClick={onSubmit} onKeyDown={onEnter}>
        Login
      </button>
    </div>
  );
};

const Register = props => {
  const { onChange, onSubmit, onEnter } = props;
  return (
    <div className="register">
      <span>Register</span>
      <input type="text" name="name" placeholder="Name" onChange={onChange} onKeyDown={onEnter} />
      <input type="email" name="email" placeholder="Email" onChange={onChange} onKeyDown={onEnter} />
      <input type="text" name="username" placeholder="Username" onChange={onChange} onKeyDown={onEnter} />
      <input type="password" name="password" placeholder="Password" onChange={onChange} onKeyDown={onEnter} />
      <button onClick={onSubmit}>Register</button>
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

  onSubmit = e => {
    const { active } = this.state;
    this.props[active](this.state[`${active}Creds`]);
  };

  onEnter = e => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  };

  render() {
    const mapping = {
      register: <Register onChange={e => this.onChange(e)} onSubmit={e => this.onSubmit(e)} onEnter={e => this.onEnter(e)} />,
      login: <Login onChange={e => this.onChange(e)} onSubmit={e => this.onSubmit(e)} onEnter={e => this.onEnter(e)} />
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

const mapStateToProps = state => ({
  signedUp: state.auth.signedUp,
  error: state.auth.error,
  loginError: state.auth.error,
  loggedIn: state.auth.loggedIn,
  token: state.auth.token
});
const mapDispatchToProps = dispatch => ({
  register: registerCreds => dispatch(register(registerCreds)),
  removeSignUpError: () => dispatch(removeRegisterError()),
  login: loginCreds => dispatch(login(loginCreds))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Auth));
