const GET_GUEST_CART = 'GET_GUEST_CART'
const GUEST_CHECKOUT = 'CHECKOUT'
const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART'
const REMOVE = 'REMOVE'
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'

const getGuestCart = products => ({
  type: GET_GUEST_CART,
  products
})

export const getGuestCartThunk = () => {
  return async dispatch => {
    try {
      const products = await JSON.parse(localStorage.getItem('shoppingCart'))
      dispatch(getGuestCart(products))
    } catch (error) {
      console.log('Error with getting guest cart info!', error)
    }
  }
}

const addToGuestCart = newCart => ({
  type: ADD_TO_GUEST_CART,
  newCart
})

export const addToGuestCartThunk = product => {
  return dispatch => {
    try {
      let cart = JSON.parse(localStorage.getItem('shoppingCart'))
      if (cart) {
        const idArr = [...cart].map(item => item.id)
        if (!idArr.includes(product.id)) cart.push({...product, quantity: 1})
      } else {
        cart = []
        cart.push({...product, quantity: 1})
      }
      localStorage.setItem('shoppingCart', JSON.stringify(cart))
      dispatch(addToGuestCart(cart))
    } catch (error) {
      console.log('Error with adding to the cart', error)
    }
  }
}

const increaseQty = newCart => ({
  type: INCREASE,
  newCart
})

export const increaseQtyThunk = prodId => {
  return dispatch => {
    try {
      const cart = JSON.parse(localStorage.getItem('shoppingCart'))
      cart.filter(item => {
        if (item.id === prodId) return (item.quantity = item.quantity + 1)
      })
      localStorage.setItem('shoppingCart', JSON.stringify(cart))
      dispatch(increaseQty(cart))
    } catch (error) {
      console.log('Error with + Qty', error)
    }
  }
}

const decreaseQty = newCart => ({
  type: DECREASE,
  newCart
})

export const decreaseQtyThunk = prodId => {
  return dispatch => {
    try {
      const cart = JSON.parse(localStorage.getItem('shoppingCart'))
      cart.filter(item => {
        if (item.id === prodId) {
          if (item.quantity !== 1) {
            return (item.quantity = item.quantity - 1)
          }
        }
      })
      localStorage.setItem('shoppingCart', JSON.stringify(cart))
      dispatch(decreaseQty(cart))
    } catch (error) {
      console.log('Error with - Qty', error)
    }
  }
}

const removeFromGuestCart = newCart => ({
  type: REMOVE,
  newCart
})

export const removeFromGuestCartThunk = productId => {
  return dispatch => {
    try {
      const cart = JSON.parse(localStorage.getItem('shoppingCart'))
      const newCart = cart.filter(item => {
        if (item.id !== productId) return item
      })
      if (newCart.length === 0) localStorage.setItem('shoppingCart', 0)
      else localStorage.setItem('shoppingCart', JSON.stringify(newCart))
      dispatch(removeFromGuestCart(newCart))
    } catch (error) {
      console.log('Error with removing from cart!', error)
    }
  }
}

const guestCheckout = () => ({
  type: GUEST_CHECKOUT
})

export const guestCheckoutThunk = () => {
  return async dispatch => {
    try {
      await localStorage.setItem('shoppingCart', 0)
      dispatch(guestCheckout())
    } catch (error) {
      console.log('Error with guest checkout!', error)
    }
  }
}

const initialState = {
  cart: []
}

const guestCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GUEST_CART:
      return {...state, cart: action.products}
    case ADD_TO_GUEST_CART:
      return {...state, cart: action.newCart}
    case GUEST_CHECKOUT:
      return state
    case REMOVE:
      return {...state, cart: action.newCart}
    case INCREASE:
      return {...state, cart: action.newCart}
    case DECREASE:
      return {...state, cart: action.newCart}
    default:
      return state
  }
}

export default guestCartReducer
