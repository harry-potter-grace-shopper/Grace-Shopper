import axios from 'axios'

const GET_CART = 'GET_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const CHECKOUT_CART = 'SUBMIT_CART'

const getCart = cart => ({
  type: GET_CART,
  cart
})

export const getCartThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/cart`)
      dispatch(getCart(data))
    } catch (error) {
      console.log('Failed to GET /users/:usersId/cart aka the cart', error)
    }
  }
}

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

export const addProductThunk = (productId, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/users/${userId}/cart`, {
        id: productId
      })
      dispatch(addProduct(data))
    } catch (error) {
      console.log('Problem with adding of product to the cart', error)
    }
  }
}

const checkoutCart = cart => ({
  type: CHECKOUT_CART,
  cart
})

export const checkoutCartThunk = (userId, shippingInfo) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/users/checkout/${userId}`,
        shippingInfo
      )
      dispatch(checkoutCart(data))
    } catch (error) {
      console.log('Problem with submitting order', error)
    }
  }
}

const initialState = {
  products: []
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {...state, products: [...action.cart]}
    case ADD_PRODUCT:
      return {...state, products: [...state.products, action.product]}
    case CHECKOUT_CART:
      return initialState
    default:
      return {...state}
  }
}

export default cartReducer
