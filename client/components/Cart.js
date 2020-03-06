import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {getCartThunk, incrementThunk, decrementThunk} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    const userId = this.props.user.id
    const {getCart} = this.props
    getCart(userId)
  }
  handleClick(event, product) {
    const orderId = product.orders[0].id
    const action = event.target.value
    console.log(action)
    event.preventDefault()
    if (action === 'increment') {
      this.props.incrementThunk(product.id, orderId)
    }
    if (action === 'decrement') {
      this.props.decrementThunk(product.id, orderId)
    }
    const userId = this.props.user.id
    const {getCart} = this.props
    getCart(userId)
  }

  render() {
    const products = this.props.products
    if (products.length === 0)
      return (
        <div className="cart-page">
          <h1>Shopping Cart</h1>
          <p> Your Cart is empty</p>
        </div>
      )
    else {
      const tots = products.reduce((acc, val) => acc + val.price, 0)
      return (
        <div className="cart-page">
          <h1>My Cart</h1>
          <div className="cart-container">
            {products.map(product => (
              <div className="cart-item" key={product.id}>
                <div className="cart-image">
                  <img src={product.imageUrl} />
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
                  <button type="button">Remove Item</button>
                  <p>Price: ${product.price}.00</p>
                </div>
              </div>
            ))}
          </div>
          <h2>Total: ${tots}.00</h2>
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
  incrementThunk: (productId, orderId) => {
    dispatch(incrementThunk(productId, orderId))
  },
  decrementThunk: (productId, orderId) => {
    dispatch(decrementThunk(productId, orderId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
