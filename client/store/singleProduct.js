import axios from 'axios'

const SET_PRODUCT = 'SET_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

const setProduct = product => ({
  type: SET_PRODUCT,
  product
})

export const setProductThunk = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(setProduct(data))
    } catch (error) {
      console.log(`Failed to GET /api/products/${id}`, error)
    }
  }
}

const updateProduct = updatedProduct => ({
  type: UPDATE_PRODUCT,
  updatedProduct
})

export const updateProductThunk = (productId, updates) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/products/${productId}`, updates)
      dispatch(updateProduct(data))
    } catch (error) {
      console.log('Error with updating of the product!', error)
    }
  }
}

const initialState = {}

const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product
    case UPDATE_PRODUCT:
      return action.updatedProduct
    default:
      return state
  }
}

export default singleProductReducer
