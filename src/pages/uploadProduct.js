import React, { Component } from "react";
import Axios from "../config/axios.setup";

import { Upload, Icon, message, InputNumber, Select, Button } from "antd";
import { Input, Row, Col, Form, Modal } from "antd";

function onSearch(val) {
  console.log("search:", val);
}

export class UploadProductDetail extends Component {
  componentDidMount = () => { };

  state = {
    confirmDirty: false,
    array: [
      { img: "", loading: false },
      { img: "", loading: false },
      { img: "", loading: false },

    ],
    product_name: "",
    price: "",
    detail: "",
    category: "",
    media_url_1: "",
    media_url_2: "",
    media_url_3: "",
    fileList: []
  };

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      alert("You can only upload JPG/PNG file.");
      return
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      alert("Image must smaller than 2MB.");
      return
    }
    this.setState({ fileList: [file] })
  }

  handleChange = e => {
    const { name, value } = e.target;
    // console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  handleChangeType = value => {
    this.setState({
      category: value
    });
  };

  handleChangePrice = value => {
    this.setState({
      price: value
    });
  };

  handleUploadImg = value => async info => {
    if (info.file.status === "uploading") {
      await this.setState(state => ({
        array: state.array.map((data, idx) => {
          if (idx === value) {
            return { loading: true, data: data.img };
          } else {
            return data;
          }
        })
      }));
      return;
    }
    if (info.file.status === "done") {
      console.log(info.file.response.data.name);
      this.setState(
        state => ({
          array: state.array.map((data, idx) => {
            if (idx === value) {
              return {
                img: "http://localhost:8080/" + info.file.response.data.name,
                loading: false
              };
            } else {
              return data;
            }
          })
        }),
        () => {
          console.log(this.state.array);
        }
      );
    }
    console.log(this.state.array);
  };

  uploadButton(loading) {
    return (
      <div>
        <Icon type={loading ? "loading" : "plus"} />
      </div>
    );
  }

  handleUploadProduct = e => {
    console.log(e);
    e.preventDefault();
    this.props.form.validateFields((errors, value) => {
      console.log(errors, value);
      if (!errors) {
        const {
          product_name,
          price,
          detail,
          category
        } = this.state;

        let payload = new FormData()

        payload.append('product_name', product_name)
        payload.append('photos', this.state.fileList[0])
        payload.append('price', price)
        payload.append('detail', detail)
        payload.append('category', category)
        payload.append('media_url_1', this.state.array[0].img)
        payload.append('media_url_2', this.state.array[1].img)
        payload.append('media_url_3', this.state.array[2].img)

        Axios.post("/upload", payload)
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.error(err.message);
          });
      }
    });
  };

  render() {
    const { TextArea } = Input;
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;
    const fileList = this.state.fileList

    const props = {
      onRemove: file => {
        this.setState(state => {
          return {
            fileList: [],
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div className="register-bg">
        <div>
          <div className="container-upload">
            <Row className="input-product-name">
              <Col span={4} className="input-title">
                ชื่อสินค้า : &nbsp;
              </Col>
              <Col span={20}>
                <Form.Item>
                  {getFieldDecorator("product_name", {
                    rules: [
                      {
                        required: true,
                        message: "กรุณากรอกชื่อสินค้า",
                        whitespace: true
                      }
                    ]
                  })(
                    <Input
                      allowClear
                      name="product_name"
                      onChange={e => this.handleChange(e)}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row className="input-product-img">
              <Col span={4} className="input-title-img">
                ภาพสินค้า : &nbsp;
              </Col>
              <Col span={20} className="upload-img">
                <div>
                  <Form.Item>
                    {getFieldDecorator("product_first_img", {
                      rules: [
                        {
                          validator: (rule, value, cb) => {
                            console.log(value);
                            if (!value || value.fileList.length === 0) {
                              cb("");
                            }
                            cb();
                          }
                        }
                      ]
                    })(
                      <Upload {...props}>
                        <Button>
                          <Icon type="upload" /> Select File
                        </Button>
                      </Upload>
                    )}
                  </Form.Item>
                </div>
                <div>
                  {/* <Upload
                    name="photo"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={true}
                    action="http://localhost:8080/upload-photo"
                    beforeUpload={beforeUpload}
                    onChange={this.handleUploadImg(1)}
                    onRemove={e => {
                      console.log(e);
                      let newArray = this.state.array.map((item, index) => {
                        if (index === 1) {
                          item.img = "";
                        }
                        return item;
                      });
                      this.setState({
                        array: newArray
                      });
                    }}
                  >
                    {this.state.array[1].img === "" && (
                      <div>
                        {this.uploadButton(this.state.array[1].loading)}
                        <div style={{ marginTop: "10px" }}>ภาพ 1</div>
                      </div>
                    )}
                  </Upload> */}
                </div>
                {/* <div>
                  <Upload
                    name="photo"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={true}
                    action="http://localhost:8080/upload-photo"
                    beforeUpload={beforeUpload}
                    onChange={this.handleUploadImg(2)}
                    onRemove={e => {
                      console.log(e);
                      let newArray = this.state.array.map((item, index) => {
                        if (index === 2) {
                          item.img = "";
                        }
                        return item;
                      });
                      this.setState({
                        array: newArray
                      });
                    }}
                  >
                    {this.state.array[2].img === "" && (
                      <div>
                        {this.uploadButton(this.state.array[2].loading)}
                        <div style={{ marginTop: "10px" }}>ภาพ 2</div>
                      </div>
                    )}
                  </Upload>
                </div> */}
                <div>
                  {/* <Upload
                    name="photo"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={true}
                    action="http://localhost:8080/upload-photo"
                    beforeUpload={beforeUpload}
                    onChange={this.handleUploadImg(3)}
                    onRemove={e => {
                      console.log(e);
                      let newArray = this.state.array.map((item, index) => {
                        if (index === 3) {
                          item.img = "";
                        }
                        return item;
                      });
                      this.setState({
                        array: newArray
                      });
                    }}
                  >
                    {this.state.array[3].img === "" && (
                      <div>
                        {this.uploadButton(this.state.array[3].loading)}
                        <div style={{ marginTop: "10px" }}>ภาพ 3</div>
                      </div>
                    )}
                  </Upload> */}
                  {/* <Upload
                    name="photo"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="http://localhost:8080/upload-photo"
                    beforeUpload={beforeUpload}
                    onChange={this.handleUploadImg(3)}
                  >
                    {this.state.array[3].img ? (
                      <img
                        src={this.state.array[3].img}
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <div>
                        {this.uploadButton(this.state.array[3].loading)}
                        <div style={{ marginTop: "10px" }}>ภาพ 3</div>
                      </div>
                    )}
                  </Upload> */}
                </div>
              </Col>
            </Row>

            <Row className="input-product-detail" type="flex" align="middle">
              <Col span={4} className="input-title">
                รายละเอียดสินค้า : &nbsp;
              </Col>
              <Col span={20} style={{ padding: "5px 0" }}>
                <TextArea
                  allowClear
                  rows={4}
                  name="detail"
                  onChange={e => this.handleChange(e)}
                />
              </Col>
            </Row>

            <Row className="input-product-cat">
              <Col span={4} className="input-title">
                ประเภท : &nbsp;
              </Col>
              <Col span={20}>
                <Form.Item>
                  {getFieldDecorator("product_type", {
                    rules: [
                      {
                        required: true,
                        message: "กรุณาเลือกประเภทสินค้า",
                        whitespace: true
                      }
                    ]
                  })(
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="เลือกประเภทสินค้า"
                      optionFilterProp="children"
                      onChange={this.handleChangeType}
                      onSearch={onSearch}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option name="category" value="dill">
                        สว่าน
                      </Option>
                      <Option name="category" value="dill">
                        เจียร์
                      </Option>
                      <Option name="category" value="dill">
                        กบ
                      </Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row className="input-product-price">
              <Col span={4} className="input-title">
                ราคา : &nbsp;
              </Col>
              <Col span={19}>
                <Form.Item>
                  {getFieldDecorator("product_price", {
                    rules: [
                      {
                        required: true,
                        message: "กรุณากรอกราคาสินค้า",
                        type: "number",
                        whitespace: true
                      }
                    ]
                  })(
                    <InputNumber
                      onChange={this.handleChangePrice}
                      className="input-price"
                      type="number"
                      min={1}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={1} className="input-title">
                &nbsp;บาท
              </Col>
            </Row>
          </div>

          <Row className="save-product" type="flex" align="middle">
            <Col span={15}></Col>
            <Col span={4}>
              <button className="btn-cc">ยกเลิก</button>
            </Col>
            <Col span={1}></Col>
            <Col span={4}>
              <button
                className="btn-save"
                onClick={e => this.handleUploadProduct(e)}
              >
                บันทึก
              </button>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const UploadProduct = Form.create()(UploadProductDetail);

export default UploadProduct;
