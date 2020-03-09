import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store'
import {getCartThunk, checkoutCartThunk} from '../store/cart'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      address: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    await this.props.getUserInfo()
    const userId = this.props.user.id
    await this.props.getCart(userId)

    if (this.props.user.id) {
      this.setState({
        email: this.props.user.email
      })
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const shippingInfo = {
      address: this.state.address
    }
    this.props.checkoutCart(this.props.user.id, shippingInfo)
    this.props.history.push('/confirm')
  }

  render() {
    const products = this.props.products

    const tots = products.reduce(function tots(acc, val) {
      const quantity = val.orders[0].order_history.quantity
      return acc + val.price * quantity
    }, 0)
    return (
      <div className="checkout-page">
        <h1>Checkout</h1>

        <div className="checkout-container">
          <div className="checkout-section">
            <h2>Order Summary</h2>
            <div>
              {products.map(product => (
                <div className="cart-item" key={product.id}>
                  <div className="cart-image">
                    <img src={product.imageUrl} />
                  </div>

                  <div className="cart-details">
                    <h3>{product.name}</h3>
                    <p>Quantity: {product.orders[0].order_history.quantity}</p>
                    <p>Unit Price: ${product.price}.00</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h2>Order Total: ${tots}.00</h2>
            </div>
          </div>
        </div>
        <div className="checkout-container">
          <div className="checkout-section">
            <h2>Shipping Info</h2>
            <form onSubmit={this.handleSubmitShipping}>
              <label>First Name:</label>
              <input
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
              <label>Last Name:</label>
              <input
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
              <label>Email:</label>
              <input
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label>Shipping Address:</label>
              <input
                name="address"
                type="text"
                value={this.state.address}
                onChange={this.handleChange}
              />
            </form>
          </div>

          <div className="checkout-section">
            <h2>Payment Info</h2>
          </div>

          <div className="checkout-section">
            <button type="submit" onClick={this.handleSubmit}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  products: state.cart.products
})

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(me()),
  getCart: userId => {
    dispatch(getCartThunk(userId))
  },
  checkoutCart: (userId, shippingInfo) =>
    dispatch(checkoutCartThunk(userId, shippingInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
