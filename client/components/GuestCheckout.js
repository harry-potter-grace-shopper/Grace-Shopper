import React from 'react'
import {connect} from 'react-redux'
import {getGuestCartThunk, guestCheckoutThunk} from '../store/guestCart'

class GuestCheckout extends React.Component {
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
    this.props.getGuestCart()
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    this.props.checkout()
    this.props.history.push('/confirm')
  }

  render() {
    const {products} = this.props
    const tots = products.cart.reduce(
      (acc, val) => acc + val.price * val.quantity,
      0
    )
    return (
      <div className="checkout-page">
        <h1>Checkout</h1>

        <div className="checkout-container">
          <div className="checkout-section">
            <h2>Order Summary</h2>
            <div>
              {products.cart.map((product, j) => (
                <div className="cart-item" key={j}>
                  <div className="cart-image">
                    <img src={product.imageUrl} />
                  </div>

                  <div className="cart-details">
                    <h3>{product.name}</h3>
                    <p>Quantity: {product.quantity}</p>
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
  products: state.guestCart
})

const mapDispatchToProps = dispatch => ({
  getGuestCart: () => dispatch(getGuestCartThunk()),
  checkout: () => dispatch(guestCheckoutThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(GuestCheckout)
