import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {
  getCartThunk,
  incrementThunk,
  decrementThunk,
  removeItem
} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    const userId = this.props.user.id
    const {getCart} = this.props
    getCart(userId)
  }
  handleClick(event, product) {
    const orderId = product.orders[0].id
    const action = event.target.value
    const userId = this.props.user.id
    event.preventDefault()
    if (action === 'increment') {
      this.props.incrementThunk(product.id, orderId, userId)
    }
    if (
      action === 'decrement' &&
      product.orders[0].order_history.quantity > 1
    ) {
      this.props.decrementThunk(product.id, orderId, userId)
    }
  }

  getTots() {
    const tots = this.props.products.reduce(function total(acc, val) {
      const quantity = val.orders[0].order_history.quantity
      return acc + val.price * quantity
    }, 0)
    return tots
  }

  render() {
    const products = this.props.products
    console.log(products)
    if (products.length === 0)
      return (
        <div className="cart-page">
          <h1>Shopping Cart</h1>
          <p> Your Cart is empty</p>
        </div>
      )
    else {
      return (
        <div className="cart-page">
          <h1>My Cart</h1>
          <div className="cart-container">
            {products.map(product => (
              <div className="cart-item" key={product.id}>
                <div className="cart-image">
                  <Link to={`/products/${product.id}`}>
                    <img src={product.imageUrl} />
                  </Link>
                </div>
                <div className="cart-details">
                  <h3>{product.name}</h3>
                  <p>Quantity: {product.orders[0].order_history.quantity}</p>
                  <button
                    type="button"
                    value="increment"
                    onClick={() => {
                      this.handleClick(event, product)
                    }}
                  >
                    Increase Qty
                  </button>
                  <button
                    type="button"
                    value="decrement"
                    onClick={() => {
                      this.handleClick(event, product)
                    }}
                  >
                    Decrease Qty
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      await this.props.removeItem(product, this.props.user.id)
                    }}
                  >
                    Remove Item
                  </button>
                  <p>Unit Price: ${product.price}.00</p>
                </div>
              </div>
            ))}
          </div>
          <h2>Total: ${this.getTots()}.00</h2>
          <Link to={`/${this.props.user.id}/cart/checkout`}>
            <button type="submit">Checkout</button>
          </Link>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  products: state.cart.products
})

const mapDispatchToProps = dispatch => ({
  getCart: userId => {
    dispatch(getCartThunk(userId))
  },
  incrementThunk: (productId, orderId, userId) => {
    dispatch(incrementThunk(productId, orderId, userId))
  },
  decrementThunk: (productId, orderId, userId) => {
    dispatch(decrementThunk(productId, orderId, userId))
  },
  removeItem: (product, userId) => {
    dispatch(removeItem(product, userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
