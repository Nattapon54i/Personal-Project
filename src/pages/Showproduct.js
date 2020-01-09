import React, { Component } from 'react'
import { Row, Col, Upload, Form, InputNumber } from 'antd'
import Axios from '../config/axios.setup'


export default class ShowProduct extends Component {
  state = {
    product: {},
    bigMedia: "",
    mediaUrl: [
      {
        mda: ""
      },
      {
        mda: ""
      },
      {
        mda: ""
      },
      {
        mda: ""
      }
    ]
  }

  componentDidMount = () => {
    const pathName = this.props.history.location.pathname
    const id = pathName.split("/").pop()
    Axios.get("/products")
      .then(result => {
        const targetProduct = result.data.filter(
          product => product.product_id === id
        )[0]
        console.log(targetProduct);
        this.setState({
          product: targetProduct,
          bigMedia: targetProduct.media.media_url_1,
          mediaUrl: [
            {
              mda: targetProduct.media.media_url_1
            },
            {
              mda: targetProduct.media.media_url_2
            },
            {
              mda: targetProduct.media.media_url_3
            },
          ]
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleBigMedia = idx => {
    this.setState({
      bigMedia: this.state.mediaUrl[idx].mda
    })

    this.setState({
      mediaUrl: this.state.mediaUrl.map((item, value) => {
        if (idx === value) {
          return {
            mda: item.mda,
          }
        } else {
          return {
            mda: item.mda,
          }
        }
      })
    })
  }

  render() {
    const chooseMda = this.state.mediaUrl.map((mda, idx) => {
      return (
        <div
          onClick={() => this.handleBigMedia(idx)}
          className="choose-mda"
        >
          <img src={mda.mda}></img>
        </div>
      )
    })

    return (
      <div>
        <Row className="row=product" type="flex" align="middle" justify="center">
          <Col span={12} >
            <div className="big-product-mda">
              <img src={this.state.bigMedia}></img>
            </div>
            <div className="all-mda">{chooseMda}</div>
          </Col>

          <Col span={14}>
            <div className="name-product-large">{this.state.product.product_name}</div>
            <div className="price-product-large">{this.state.product.price}.-</div>

            <div style={{ display: "flex" }}>
              <div className="amount-product-large">
                <InputNumber
                  className="input-number"
                  min={1}
                  defaultValue={1}
                />
              </div>
              <div className="add-product-large">
                <button>เพิ่มลงตะกร้า</button>
              </div>
            </div>

            <div className="detail-product-large">{this.state.product.detail}</div>
          </Col>
        </Row>
      </div>
    )
  }
}
