import React from 'react'
import {connect} from 'react-redux'
import {getGuestCartThunk, guestCheckoutThunk} from '../store/guestCart'

class GuestCheckout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {},
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.getGuestCart()
  }

  handleChange = event => {
    let fields = this.state.fields
    fields[event.target.name] = event.target.value
    this.setState({
      fields
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.validateForm()) {
      let fields = {}
      fields.firstName = ''
      fields.lastName = ''
      fields.email = ''
      fields.address = ''
      this.setState({fields: fields})
      this.props.checkout()
      this.props.history.push('/confirm')
    }
  }

  getTots() {
    const tots = this.props.products.cart.reduce(
      (acc, val) => acc + val.price * val.quantity,
      0
    )
    return tots
  }

  validateForm() {
    let fields = this.state.fields
    let errors = {}
    let formIsValid = true

    if (!fields.firstName) {
      formIsValid = false
      errors.firstName = 'First name is required'
    }

    if (!fields.lastName) {
      formIsValid = false
      errors.lastName = 'Last name is required'
    }

    if (!fields.email) {
      formIsValid = false
      errors.email = 'Email is required'
    }

    if (typeof fields.email !== 'undefined') {
      //regular expression for email validation
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      )
      if (!pattern.test(fields.email)) {
        formIsValid = false
        errors.email = 'Please enter a valid email address'
      }
    }

    if (!fields.address) {
      formIsValid = false
      errors.address = 'Address is required'
    }

    this.setState({
      errors: errors
    })

    return formIsValid
  }

  render() {
    const {products} = this.props

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
              <h2>Order Total: ${this.getTots()}.00</h2>
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
                className="form-input"
              />
              <div>{this.state.errors.firstName}</div>
              <label>Last Name:</label>
              <input
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.handleChange}
                className="form-input"
              />
              <div>{this.state.errors.lastName}</div>

              <label>Email:</label>
              <input
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
                className="form-input"
              />
              <div>{this.state.errors.email}</div>
              <label>Shipping Address:</label>
              <input
                name="address"
                type="text"
                value={this.state.address}
                onChange={this.handleChange}
                className="form-input"
              />
              <div>{this.state.errors.address}</div>
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
