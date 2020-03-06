import axios from 'axios'

const GET_CART = 'GET_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const SUBMIT_CART = 'SUBMIT_CART'
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

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

const submitCart = (userId, address) => ({
  type: SUBMIT_CART,
  userId,
  address
})

export const submitCartThunk = (userId, address) => {
  return async dispatch => {
    console.log('userId', userId)
    console.log('address', address)
    try {
      console.log('we are in the try block')
      const {data} = await axios.put(`/api/users/checkout/${userId}`, {
        completed: true,
        shippingInfo: address
      })
      console.log('data', data)
      dispatch(submitCart(data))
    } catch (error) {
      console.log('Problem with submitting order', error)
    }
  }
}

const increment = quantityObj => ({
  type: INCREMENT,
  quantityObj
})

export const incrementThunk = (productId, orderId) => {
  return async dispatch => {
    console.log('helllllolo')
    try {
      console.log(
        'IN THE INCREMENT THUNK this  is the product',
        productId,
        'this is the ORDDDDDEERRRRRRRRRRR',
        orderId
      )
      const {quantity} = await axios.put(
        `/api/quantity/${productId}/${orderId}/add`
      )
      const quantityObj = {
        [productId]: quantity
      }
      dispatch(increment(quantityObj))
    } catch (e) {
      next(e)
    }
  }
}

const decrement = quantityObj => ({
  type: DECREMENT,
  quantityObj
})

export const decrementThunk = (productId, orderId) => {
  return async dispatch => {
    try {
      const {quantity} = await axios.put(
        `/api/quantity/${productId}/${orderId}/remove`
      )
      const quantityObj = {
        [productId]: quantity
      }
      dispatch(decrement(quantityObj))
    } catch (e) {
      next(e)
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
    case SUBMIT_CART:
      return {...state, products: []}
    case INCREMENT:
      return {...state, ...action.quantityObj}
    case DECREMENT:
      return {...state, ...action.quantityObj}
    default:
      return state
  }
}

export default cartReducer
