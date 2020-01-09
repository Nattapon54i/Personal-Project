import React, { Component } from 'react'
import { Menu, } from 'antd'
import Sider from 'antd/lib/layout/Sider'

export default class LeftbarMenu extends Component {
  handleClick = (e) => {
    localStorage.setItem('currentMenu', e.key)
  }

  render() {
    return (
      <Sider width={10} height={50}>
        <Menu
          mode="vertical-left"
          theme="light"
          selectedKeys={[localStorage.getItem('currentMenu')]}
          onClick={this.handleClick} style={{
            width: 256,
            height: '100%',
            borderRight: 0
          }}
        >
          <Menu.Item key="myprofile" >
          <a href="/profile">
              <span>My Profile</span>
            </a>
          </Menu.Item>
          <Menu.Item key="showallproduct">
            <a href="/showallproduct">
              <span>Show Product</span>
            </a>

          </Menu.Item>
          <Menu.Item key="myorder">
            <a href="/myorder">
              <span>My Order</span>
            </a>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}
