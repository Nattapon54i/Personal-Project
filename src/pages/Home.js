import React, { Component } from 'react'
import { Row, Col, Button } from 'antd'
import banner from '../image/Banner.jpg'
import Showproduct from '../pages/Showproduct'

export default class Home extends Component {


  render() {
    return (
      <Row type="flex" justify="center"  >
        <Col >

          <img src={banner} href={Showproduct} style={{ maxWidth: "100%" }}></img>

        </Col>
      </Row>
    )
  }
}
