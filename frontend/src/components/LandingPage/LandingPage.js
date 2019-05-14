import React, { Component } from 'react';
import './LandingPage.css';
import { Card, Input, Button } from 'antd';

class LandingPage extends Component {
  state = {
    key: 'tab2',
    noTitleKey: 'app',
    register: {},
    login: {},
    tabList: [
      {
        key: 'tab1',
        tab: 'Register'
      },
      {
        key: 'tab2',
        tab: 'Login'
      }
    ]
  };

  registerChange = e => {
    this.setState({ register: { ...this.state.register, [e.target.name]: e.target.value } });
  };

  loginChange = e => {
    this.setState({ login: { ...this.state.login, [e.target.name]: e.target.value } });
  };

  onTabChange = (key, type) => {
    this.setState({ [type]: key, register: {}, login: {} });
  };
  render() {
    const registerContent = (
      <React.Fragment>
        <Input placeholder="Name" name="name" value={this.state.register.name} onChange={e => this.registerChange(e)} />
        <br />
        <br />
        <Input
          placeholder="Username"
          name="username"
          value={this.state.register.username}
          onChange={e => this.registerChange(e)}
        />
        <br />
        <br />
        <Input
          placeholder="Email"
          name="email"
          value={this.state.register.email}
          onChange={e => this.registerChange(e)}
        />
        <br />
        <br />
        <Input.Password
          placeholder="Password"
          name="password"
          value={this.state.register.password}
          onChange={e => this.registerChange(e)}
        />
        <br />
        <br />
        <br />
        <Button type="primary" block>
          Register
        </Button>
      </React.Fragment>
    );
    const loginContent = (
      <React.Fragment>
        <br />
        <br />
        <Input
          placeholder="Username"
          name="username"
          value={this.state.login.username}
          onChange={e => this.loginChange(e)}
        />
        <br />
        <br />
        <br />
        <Input.Password
          placeholder="Password"
          name="password"
          value={this.state.login.password}
          onChange={e => this.loginChange(e)}
        />
        <br />
        <br />
        <br />
        <Button type="primary" block style={{ marginTop: '43px' }}>
          Login
        </Button>
      </React.Fragment>
    );

    const contentList = {
      tab1: registerContent,
      tab2: loginContent
    };

    return (
      <div className="landingPage">
        <div className="landingPage_row">
          <div className="landingPage_header">
            <i className="fas fa-bolt" /> <span id="landingPage_text">Avaton</span>
          </div>
        </div>
        <div className="landingPage_row">
          <div className="landingPage_sider">
            <h1>Welcome to the Biggest Social Network in the World</h1>
            <p>
              We are the best and biggest social network with 5 billion active users all around the world. Share your
              thoughts, write blog postMessage, show your favorite music via Spotify, earn badges and much more
            </p>
          </div>
          <div className="landingPage_form">
            <Card
              style={{ height: '380px', borderRadius: '5px', boxShadow: '3px 5px #888888' }}
              // title=" "
              tabList={this.state.tabList}
              activeTabKey={this.state.key}
              onTabChange={key => {
                this.onTabChange(key, 'key');
              }}
            >
              {contentList[this.state.key]}
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
export default LandingPage;
