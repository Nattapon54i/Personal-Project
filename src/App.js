import React from 'react';
import { Layout, Row, Col, Slider, Menu, Breadcrumb, Icon } from 'antd';
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Order from './pages/Order'
import Wishlist from './pages/Wishlist'
import Showproduct from './pages/Showproduct'
import NavbarMenu from './components/NavbarMenu';
import LeftbarMenu from './components/LeftbarMenu';
import Searchbar from './components/Searchbar'
import logo from './image/logoChokChai.png'



const { Header, Content, Sider } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMenu: localStorage.getItem('currentMenu')
    }
  }

  handdleMenu = () => {
    this.setState({ currentMenu: localStorage.getItem('currentMenu') })
  }

  render() {
    return (
      <Layout>
        <Header className="header" style={{ background: "#13c2c2" }}>
          <img className="logo" src={logo} style={{ width: '100px' }} />
          <NavbarMenu handdleMenu={this.handdleMenu} menuKey={this.state.currentMenu} />
        </Header>
        <Layout>
          <Sider width={256} style={{ background: '#fff' }}>
            <LeftbarMenu handdleMenu={this.handdleMenu} menuKey={this.state.currentMenu} />
          </Sider>
          <Layout style={{ padding: '0 24px 24px', background: '#B9EEFF' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: '#B9EEFF',
                padding: 150,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/order" component={Order} />
              <Route exact path="/wishlist" component={Wishlist} />
              <Route exact path="/showpeoduct" component={Showproduct} />
            </Content>
          </Layout>
        </Layout>
      </Layout >
    );
  }
}