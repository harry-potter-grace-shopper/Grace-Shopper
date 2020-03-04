import React from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'

class Cart extends React.Component {
  render() {
    return (
      <div>
        <h1>Your Cart</h1>
        <CartItem />
      </div>
    )
  }
}

export default Cart
