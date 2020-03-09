import axios from 'axios'

const GET_INSTOCK_PRODUCTS = 'GET_INSTOCK_PRODUCTS'

const getInStockProducts = inStockProducts => ({
  type: GET_INSTOCK_PRODUCTS,
  inStockProducts
})

export const getInStockProductsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products/instock')
      dispatch(getInStockProducts(data))
    } catch (error) {
      console.log('Failed to GET /api/products/instock', error)
    }
  }
}

const initialState = []

const inStockProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INSTOCK_PRODUCTS:
      return action.inStockProducts
    default:
      return state
  }
}

export default inStockProductsReducer
