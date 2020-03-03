import axios from 'axios'

const SET_PRODUCT = 'SET_PRODUCT'

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

const initialState = {}

const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default singleProductReducer
