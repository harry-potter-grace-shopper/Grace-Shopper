import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'

const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

export const getProductsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getProducts(data))
    } catch (error) {
      console.log('Failed to GET /api/products', error)
    }
  }
}

const createProduct = newProduct => ({
  type: CREATE_PRODUCT,
  newProduct
})

export const createProductThunk = product => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', product)
      console.log(data)
      dispatch(createProduct(data))
    } catch (error) {
      console.log('Error with creating of the new product!', error)
    }
  }
}

const initialState = []

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case CREATE_PRODUCT:
      return [...state, action.newProduct]
    default:
      return state
  }
}

export default productReducer
