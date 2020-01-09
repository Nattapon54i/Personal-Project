import React, { Component } from 'react'
import Axios from "../config/axios.setup"
import { Button, Icon } from 'antd'

function onBlur() {
  console.log("blur")
}

function onFocus() {
  console.log("focus")
}

function onSearch(val) {
  console.log("search", val)
}

export default class CartDetail extends Component {
  state = {
    shipping: "",
    payment: ""
  }

  handleChangeShipping = value => {
    this.setState({
      shippinh: value
    })
  }

  handleConfirmCard = e => {
    console.log(e);
    require.preventDefault();
    this.props.form.validateFielda((errors, value) => {
      console.log(errors, value);
      if (!errors) {
        const { payment, shipping } = this.state;

        Axios.post("/upload", {
        })
          .then(result => {
            console.log(`result : ${result}`);
          })
          .catch(err => {
            console.error(err.message);
          })
      }
    })
  }

  render() {
    // const { Option } = Select;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: "รายการสินค้า",
        dataIndex: "product",
        key: "product",
        render: text => (
          <div>
            <img src={text[0]} /> &nbsp;
            <span>
              <b>{text[1]}</b>
            </span>
          </div>
        )
      },
      {
        title: "รายการสินค้าชิ้น (บาท)",
        dataIndex: "price",
        key: "price",
        width: 160,
        className: "title-table"
      },
      {
        title: "จำนวน (ชิ้น)",
        dataIndex: "amount",
        key: "amount",
        width: 160,
        className: "title-table"
      },
      {
        title: "ราคารวม (บาท)",
        dataIndex: "total",
        key: "total",
        width: 220,
        className: "title-table"
      },
      {
        title: "",
        dataIndex: "delete",
        key: "delete",
        width: 80,
        className: "title-table",
        render: text => (
          <div style={{ textAlign: "center" }} >
            <Button type="danger">
              <Icon type="delete" />
            </Button>
          </div>
        )
      },
    ]
    // 
    // 
    // 
    // 
    // 
    // 
    // 
    // 
    // 
    //     
    return (
      <div>

      </div>
    )
  }
}
