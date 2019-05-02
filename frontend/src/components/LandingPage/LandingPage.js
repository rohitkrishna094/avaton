import React, { Component } from 'react';
import './LandingPage.css';
import { Card, Input, Button } from 'antd';

const tabList = [
  {
    key: 'tab1',
    tab: 'Register'
  },
  {
    key: 'tab2',
    tab: 'Login'
  }
];

const content1 = (
  <React.Fragment>
    <Input placeholder="Name" />
    <br />
    <br />
    <Input placeholder="Username" />
    <br />
    <br />
    <Input placeholder="Email" />
    <br />
    <br />
    <Input.Password placeholder="Password" />
    <br />
    <br />
    <br />
    <Button type="primary" block>
      Register
    </Button>
  </React.Fragment>
);
const content2 = (
  <React.Fragment>
    <br />
    <br />
    <Input placeholder="Username" />
    <br />
    <br />
    <br />
    <Input.Password placeholder="Password" />
    <br />
    <br />
    <br />
    <Button type="primary" block style={{ marginTop: '43px' }}>
      Login
    </Button>
  </React.Fragment>
);

const contentList = {
  tab1: content1,
  tab2: content2
};

class LandingPage extends Component {
  state = {
    key: 'tab2',
    noTitleKey: 'app'
  };

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };
  render() {
    return (
      <div className="landingPage">
        <div className="landingPage_row">
          <div className="landingPage_header">
            <i class="fas fa-bolt" /> <span id="landingPage_text">Olympus</span>
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
              style={{ width: '60%', height: '380px', 'border-radius': '5px', 'box-shadow': '3px 5px #888888' }}
              // title=" "
              tabList={tabList}
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
