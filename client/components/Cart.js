import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    const userId = this.props.user.id
    this.props.getCart(userId)
  }

  render() {
    const products = this.props.products
    if (products.length === 0)
      return (
        <div className="cart-page">
          <h1>My Cart</h1>
          <p> Your Cart is empty</p>
        </div>
      )
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
                <p>Quantity: {product.quantity}</p>
                <button type="button">Increase Qty</button>
                <button type="button">Decrease Qty</button>
                <button type="button">Remove Item</button>
                <p>Price: ${product.price}.00</p>
              </div>
            </div>
          ))}
        </div>
        <h2>Total: $X.00</h2>
        <button type="submit">Checkout</button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  products: state.cart.products
})

const mapDispatchToProps = dispatch => ({
  getCart: userId => {
    dispatch(getCartThunk(userId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
