import React, { Component } from 'react'
import { Row, Col, Upload, Form } from 'antd'


export default class Showproduct extends Component {
  render() {
    return (
      <Row>
        <Row type="flex" justify="center" >
          <Col md={8} sm={16} xs={24}>
            <Upload
            />
          </Col>
          <Col md={8} sm={16} xs={24}>

          </Col>
          <Col md={8} sm={16} xs={24}>

          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginTop: '300px' }} >
          <Col md={8} sm={16} xs={24} >

          </Col>
          <Col md={8} sm={16} xs={24}>

          </Col>
          <Col md={8} sm={16} xs={24}>

          </Col>
        </Row>
      </Row>
    )
  }
}
