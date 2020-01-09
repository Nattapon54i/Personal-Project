import React, { Component } from 'react'
import { Row, Col, Button, Upload, Carousel } from 'antd'

export default class Home extends Component {
  render() {
    return (
      <Row className="row-home"  >
        <Col style={{  }}>
          <Carousel autoplay>
            <div className="slide-pic" >
              <img src="https://uppicimg.com/file/XZeJhWrH.jpg" />
            </div>
            <div className="slide-pic">
              <img src="https://uppicimg.com/file/2h6wpA8G.jpg" />
            </div>
            <div className="slide-pic">
              <img src="https://uppicimg.com/file/KJY8W3hA.jpg" />
            </div>
          </Carousel>
        </Col>
      </Row >
    )
  }
}
