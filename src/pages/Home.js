import React, { Component } from 'react'
import { Row, Col, Button, Upload } from 'antd'
import banner from '../image/Banner.jpg'
import Showproduct from '../pages/Showproduct'
import Axios from '../config/axios.setup'

export default class Home extends Component {


  handleHome = () => {
    let payload = new FormData()
    payload.append('photosHome', this.state.fileList[0])
    Axios.post('/create-uploadPic', payload)
  }


  render() {
    return (
      <Row type="flex" justify="center"  >
        <Col >
          <Upload />

        </Col>
      </Row>
    )
  }
}
