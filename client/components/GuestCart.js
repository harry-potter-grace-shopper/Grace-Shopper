import React from 'react'
import {
  getGuestCartThunk,
  removeFromGuestCartThunk,
  increaseQtyThunk,
  decreaseQtyThunk
} from '../store/guestCart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class GuestCart extends React.Component {
  componentDidMount() {
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
      const tots = products.cart.reduce(
        (acc, val) => acc + val.price * val.quantity,
        0
      )
      return (
        <div className="cart-page">
          <h1>My Cart</h1>
          <div className="cart-container">
            {products.cart.map((product, j) => (
              <div className="cart-item" key={j}>
                <div className="cart-image">
                  <Link to={`/products/${product.id}`}>
                    <img src={product.imageUrl} />
                  </Link>
                </div>
                <div className="cart-details">
                  <h3>{product.name}</h3>
                  <p>Quantity: {product.quantity}</p>
                  <button
                    type="button"
                    onClick={() => this.props.increase(product.id)}
                  >
                    Increase Qty
                  </button>
                  <button
                    type="button"
                    onClick={() => this.props.decrease(product.id)}
                  >
                    Decrease Qty
                  </button>
                  <button
                    type="button"
                    onClick={() => this.props.remove(product.id)}
                  >
                    Remove Item
                  </button>
                  <p>Unit Price: ${product.price}.00</p>
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
  remove: id => dispatch(removeFromGuestCartThunk(id)),
  increase: id => dispatch(increaseQtyThunk(id)),
  decrease: id => dispatch(decreaseQtyThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(GuestCart)
