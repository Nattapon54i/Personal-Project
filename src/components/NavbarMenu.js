import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import jwtDecode from "jwt-decode";

export default class NavbarMenu extends Component {
  state = {
    isLogin: false,
    modalVisible: false,
    username: "",
    password: ""
  };


  handleClick = (e) => {
    localStorage.setItem('currentMenu', e.key)
  }

  render() {
    return (
      <Menu
        selectedKeys={[localStorage.getItem('currentMenu')]}
        mode="horizontal"
        theme="light"
        onClick={this.handleClick}
      >
        <Menu.Item key="home" >
          <a href="/home">
            <span>Home</span>
          </a>
        </Menu.Item>
        <Menu.Item key="login">
          <a href="/login">
            <Icon type="login" />
            <span>Login</span>
          </a>
        </Menu.Item>
        <Menu.Item key="signup">
          <a href="/signup">
            <Icon type="plus-circle" />
            <span>Signup</span>
          </a>
        </Menu.Item>
      </Menu>
    )
  }
}
