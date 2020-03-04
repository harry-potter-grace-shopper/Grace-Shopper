import React from 'react'
import {connect} from 'react-redux'

class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <h3>Cart Item #1</h3>
      </div>
    )
  }
}

export default CartItem
