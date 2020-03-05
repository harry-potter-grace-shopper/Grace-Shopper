import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store'

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
    this.handleSubmitShipping = this.handleSubmitShipping.bind(this)
    this.handleSubmitOrder = this.handleSubmitOrder.bind(this)
  }

  async componentDidMount() {
    await this.props.getUserInfo()
    if (this.props.user.id) {
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        address: this.props.user.address
      })
    }
  }

  handleChange = event => {
    ;[event.target.name] = event.target.value
  }

  handleSubmitShipping = event => {
    event.preventDefault()
  }

  handleSubmitOrder = event => {
    event.preventDefault()

    // update order instance to completed="false"
    // pass in thunk middleware to cartReducer
  }

  render() {
    return (
      <div className="checkout-page">
        <h1>Checkout</h1>

        <div className="checkout-container">
          <div className="checkout-section">
            <h2>Order Summary</h2>
          </div>

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
              <button type="submit">Save Shipping Info</button>
            </form>
          </div>

          <div className="checkout-section">
            <h2>Payment Information</h2>
          </div>

          <div className="checkout-section">
            <button type="submit" onClick={this.handleSubmitOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(me())
  // submitOrder: (userId) => dispatch(submitOrderThunk(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)

/*



export const SUBMIT_ORDER = 'SUBMIT_ORDER'


export const submitOrder = order => ({
  type: SUBMIT_ORDER,
  order
})

export const submitOrderThunk = (userId) => {
  return async dispatch {
    try {
      const { data } = userId
      ? await axios.put()  USER API ROUTE, completed="true"
      : await axios.put()  GUEST API ROUTE, completed="true"
      dispatch(submitOrder(data))
    } catch (error) {
      console.log('Problem with submitting order', error)
    }
  }
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_ORDER:
      return {...state, action.order}
  }
}

export default orderReducer


*/
