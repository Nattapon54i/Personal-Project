import React, { Component } from 'react'
import { Row, Col, Button, Input, Form, notification, Icon } from 'antd'
import logo from '../image/logoChokChai.png'
import Axios from '../config/axios.setup'
import { withRouter } from 'react-router-dom'

class Signup extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    name: ''
  }


  openSignupSuccessNotification = () => {
    notification.open({
      message: "Signup Successfully",
      description: "Signup Successfully",
      placement: "bottomRight",
      icon: <Icon type="check-circle" style={{ fontSize: 24, color: "green" }} />
    })
  }

  openSignupFailedNotification = () => {
    notification.open({
      message: "Signup Failed",
      description: "Signup Failed",
      placement: "bottomRight",
      icon: <Icon type="close-circle" style={{ fontSize: 24, color: "crimson" }} />
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('Password incorrect from Password')
    } else {
      callback()
    }
  }

  compareToSecondPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && this.state.isDirty) {
      form.validateFields(['Confirm'], { force: true });
    }
    callback()
  }

  submitForm = async (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll();
    try {
      const result = await Axios.post('/registerUser', {
        username: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        name: this.state.name
      })
      console.log('result', result)
      this.props.history.push('/')
      this.openSignupSuccessNotification()
    } catch (err) {
      console.error(err.response.data)
      this.openSignupFailedNotification()
    }
  }

  render() {
    const { form } = this.props;
    return (
      <Row type='flex' style={{ height: '100vh' }} align="middle">
        <Col span={24} >
          <Row type='flex' justify="center" align="middle" >
            <Col xs={24} sm={22} md={18} lg={14} type="flex" justify="center" align="middle">
              <img src={logo} alt="Logo Market" style={{ height: "100%", maxHeight: "300px" }}></img>
            </Col>
          </Row>
          <Row type="flex" justify="center" align="middle" style={{ marginTop: '40px' }}>
            <Col md={8} sm={12} xs={24} type="flex" justify="center" align="middle">
              <Form onSubmit={this.submitForm} className="login-form" style={{ maxWidth: "400px", width: "100%" }}>
                <Row>
                  <Form.Item label='Email'>
                    {form.getFieldDecorator('email', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Email'
                        }
                      ]
                    })(<Input type="email" onChange={(e) => this.setState({ email: e.target.value })} />)}
                  </Form.Item>
                  <Form.Item label='Password'>
                    {form.getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Password'
                        },
                        {
                          validator: this.compareToSecondPassword,
                        }
                      ]
                    })(<Input.Password onChange={(e) => this.setState({ password: e.target.value })} />)}
                  </Form.Item>
                  <Form.Item label='Confirm Password'>
                    {form.getFieldDecorator('confirmPassword', {
                      rules: [
                        {
                          required: true,
                          message: 'Please Confirm your Password'
                        },
                        {
                          validator: this.compareToFirstPassword,
                        }
                      ]
                    })(<Input.Password onChange={(e) => this.setState({ confirmPassword: e.target.value })} />)}
                  </Form.Item>
                  <Form.Item label='Name'>
                    {form.getFieldDecorator('Name', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your Name'
                        }
                      ]
                    })(<Input onChange={(e) => this.setState({ name: e.target.value })} />)}
                  </Form.Item>
                </Row>
                <Row type="flex" justify="center">
                  <Col md={8} sm={12} xs={24}>
                    <Form.Item>
                      <Button block type="primary" htmlType="submit" className="login=form=button">
                        Sign Up
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}


const signupForm = Form.create({ name: "signup" })(Signup);
export default withRouter(signupForm)

