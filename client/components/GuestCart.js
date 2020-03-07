import React from 'react'
import {
  getGuestCartThunk,
  guestCheckoutThunk,
  removeFromGuestCartThunk
} from '../store/guestCart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class GuestCart extends React.Component {
  async componentDidMount() {
    this.props.getGuestCart()
  }

  render() {
    const {products} = this.props
    if (products.cart === 0) {
      return (
        <div className="cart-page">
          <h1>Shopping Cart</h1>
          <p> Your Cart is empty</p>
        </div>
      )
    } else {
      const tots = products.cart.reduce((acc, val) => acc + val.price, 0)
      return (
        <div className="cart-page">
          <h1>My Cart</h1>
          <div className="cart-container">
            {products.cart.map((product, j) => (
              <div className="cart-item" key={j}>
                <div className="cart-image">
                  <img src={product.imageUrl} />
                </div>
                <div className="cart-details">
                  <h3>{product.name}</h3>
                  <p>Quantity:{product.quantity}</p>
                  <button type="button">Increase Qty</button>
                  <button type="button">Decrease Qty</button>
                  <button
                    type="button"
                    onClick={() => this.props.remove(product.id)}
                  >
                    Remove Item
                  </button>
                  <p>Price: ${product.price}.00</p>
                </div>
              </div>
            ))}
          </div>
          <h2>Total: ${tots}.00</h2>
          <Link to="/guest/cart/checkout">
            <button type="submit">Checkout</button>
          </Link>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  products: state.guestCart
})

const mapDispatchToProps = dispatch => ({
  getGuestCart: () => dispatch(getGuestCartThunk()),
  remove: id => dispatch(removeFromGuestCartThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(GuestCart)
