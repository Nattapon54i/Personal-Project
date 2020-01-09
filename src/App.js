import React from 'react';
import { Layout, Row, Col, Slider, Menu, Breadcrumb, Icon, Upload } from 'antd';
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Cartdetail from './pages/CartDetail'
import ShowAllProduct from './pages/ShowAllProduct'
import NavbarMenu from './components/NavbarMenu';
import LeftbarMenu from './components/LeftbarMenu';
import Uploadproduct from './pages/uploadProduct'
import Searchbar from './components/Searchbar'
import logo from './image/logoChokChai.png'
import NavbarMenu2 from './components/NavbarMenu2';



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
        <Header className="header" style={{ background: "#13c2c2", display: "flex", justifyContent: "flex-start" }}>
          <img className="logo" src={logo} style={{ width: "100px", height: "50px", display: "flex", alignItems: "center" }} />
          <NavbarMenu handdleMenu={this.handdleMenu} menuKey={this.state.currentMenu}  />
          {/* <NavbarMenu2 handdleMenu={this.handdleMenu} menuKey={this.state.currentMenu} /> */}
        </Header>
        <Layout>
          <Sider width={256} style={{ background: '#fff' }}>
            <LeftbarMenu handdleMenu={this.handdleMenu} menuKey={this.state.currentMenu} />
          </Sider>
          <Layout style={{ padding: '0 24px 400px', background: '#B9EEFF' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item></Breadcrumb.Item>
              <Breadcrumb.Item></Breadcrumb.Item>
              <Breadcrumb.Item></Breadcrumb.Item>
            </Breadcrumb> */}
            <Content
              style={{
                background: '#B9EEFF',
                padding: 60,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/cartdetail" component={Cartdetail} />
              <Route exact path="/showallproduct" component={ShowAllProduct} />
              <Route exact path="/uploadproduct" component={Uploadproduct} />

              {/* <Redirect to="/home" /> */}
            </Content>
          </Layout>
        </Layout>
      </Layout >
    );
  }
}