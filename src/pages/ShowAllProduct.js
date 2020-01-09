import React, { Component } from 'react'
import Axios from '../config/axios.setup'

import { Card } from 'antd'
import { Link } from 'react-router-dom'
import _ from 'lodash'

export class ShowAllProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
  }

  componentDidMount = () => {
    Axios.get("/products")
      .then(result => {
        this.setState({
          products: result.data.filter(
            product => product.category === "dill"
          )
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  handleAddToCart = id => {
    // const selectedProduct = this.state.products.find(product => product.product_id == id)
    // let newSelectedProduct = Object.assign({}, selectedProduct, { quantity: 1 })
    // this.props.setTotalList(1)
    // this.props.setCartlist(newSelectedProduct)
    // this.setState({ dummy: "" })
  }


  render() {
    const { Meta } = Card
    return (
      <div className="container-show-product">
        {this.state.products.map(product => (
          <div className="card-product">
            <Card hoverable
              cover={
                <Link to={`/product/${product.product_id}`}>
                  <div className="plain-media-product">
                    <img className="hover-media"
                      alt={product.category}
                      src={product.medium.photo}
                      >
                    </img>
                  </div>
                </Link>
              }>
              <Meta title={
                <div className="name-product">{product.product_name}</div>
              }
              />
              <Meta title={
                <div className="price-product">{product.price}.-</div>
              } />
              <Meta title={
                <div className="add-product">
                  <button
                    onClick={() => this.handleAddToCart(product.product_id)}
                  >เพิ่มลงตะกร้า
                  </button>
                </div>
              } />
            </Card>
          </div>
        ))}
      </div>
    )
  }
}

// const mapStateToProps = ({ cart }) => ({

// })

// const mapDispatchToProps = {
//   ...cartAction,
//   ...totalAction
// }

export default ShowAllProduct;