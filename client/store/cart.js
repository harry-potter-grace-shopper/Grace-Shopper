import axios from 'axios'

const GET_CART = 'GET_CART'

const getCart = cart => ({
  type: GET_CART,
  cart
})

export const getCartThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/checkout/${userId}`)
      dispatch(getCart(data))
    } catch (error) {
      console.log('Failed to GET /checkout/:usersId aka the cart', error)
    }
  }
}

const initialState = {
  cart: {},
  productQuantities: {}
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}

export default cartReducer
