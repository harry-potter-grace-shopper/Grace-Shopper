import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'

class Cart extends React.Component {
  // componentDidMount() {
  //   const {data: {id} } = await axios.get(`/api/`)
  //   this.props.getCart(data.id)
  // }

  render() {
    const items = [
      {
        id: 1,
        name: 'Blue Tamagotchi',
        quantity: 1,
        price: 5,
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/61vT7Txan5L._AC_SX679_.jpg'
      },
      {
        id: 2,
        name: 'Green Tamagotchi',
        quantity: 1,
        price: 50,
        imageUrl:
          'https://images-na.ssl-images-amazon.com/images/I/61vT7Txan5L._AC_SX679_.jpg'
      }
    ]

    return (
      <div className="cart-page">
        <h1>My Cart</h1>
        <div className="cart-container">
          {items.map(item => (
            <div className="cart-item" key={item.id}>
              <div className="cart-image">
                <img src={item.imageUrl} />
              </div>

              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <button type="button">Increase Qty</button>
                <button type="button">Decrease Qty</button>
                <button type="button">Remove Item</button>
                <p>Price: ${item.price}.00</p>
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
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: userId => dispatch(getCartThunk(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
