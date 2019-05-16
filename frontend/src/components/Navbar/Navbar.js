import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Footer } = Layout;

export default class Navbar extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '64px' }}>
            <Menu.Item key="1">Feed</Menu.Item>
            <Menu.Item key="2">Profile</Menu.Item>
            <Menu.Item key="3">Search</Menu.Item>

            <Menu.Item key="6" style={{ float: 'right' }}>
              <Icon type="logout" />
              {/* <span>logout</span> */}
            </Menu.Item>
            <Menu.Item key="7" style={{ float: 'right' }}>
              <Icon type="setting" />
              {/* <span>settings</span> */}
            </Menu.Item>
            <Menu.Item key="5" style={{ float: 'right' }}>
              <Icon type="bell" />
              {/* <span>notifications</span> */}
            </Menu.Item>
            <Menu.Item key="4" style={{ float: 'right' }}>
              <Icon type="message" />
              {/* <span>messages</span> */}
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    );
  }
}
